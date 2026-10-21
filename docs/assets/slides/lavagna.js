/*
 * PSILavagna — Lavagna Real-Time & Remote Control da iPad
 *
 * Consente al docente di annotare a mano libera sulle slide Reveal.js
 * da iPad con Apple Pencil (palm rejection, modulazione pressione)
 * e di sincronizzare in tempo reale sia i tratti sia il cambio slide
 * sul videoproiettore via Supabase Realtime Broadcast.
 *
 * Utilizzo:
 *   - Proiettore / PC: URL standard (es. .../slides/)
 *   - iPad / Speaker:  URL con parametro ?pen (es. .../slides/?pen o ?pen=PIN)
 *
 * I tratti scritti su una slide restano con quella slide. La lavagna scura
 * ha tratti propri ed è una sola per tutto il mazzo: si allarga con il pinch
 * a due dita (zoom e spostamento), o con trackpad e rotellina sul PC.
 */
(function () {
  'use strict';

  var PSILavagna = {
    bind: function (deck, options) {
      if (/print-pdf/.test(window.location.search)) return;

      options = options || {};
      var params = new URLSearchParams(window.location.search);
      var isSpeaker = params.has('pen') || params.get('mode') === 'pen';

      // PIN / Token di sicurezza
      var penVal = params.get('pen');
      var token = 'psi2627';
      if (penVal && penVal !== 'true' && penVal !== '1') {
        token = penVal;
      } else if (params.get('pin')) {
        token = params.get('pin');
      }

      // Identificativo univoco del mazzo di slide
      function getDeckId() {
        if (params.get('deck')) return params.get('deck');
        var m = window.location.pathname.match(/settimana[_-][0-9]+/i);
        if (m) return m[0].toLowerCase();
        var parts = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '').split('/').filter(Boolean);
        return parts.slice(-2).join('-') || 'default';
      }
      var deckId = getDeckId();

      // Credenziali Supabase (da sondaggi.js o fallback pubblico)
      var CFG = window.PSI_SONDAGGI || {
        api: 'https://kmfpuqswhgslmhvekphl.supabase.co',
        key: 'sb_publishable_thNJG8ZyPLtdkCOxmc2NWA_LRSimqps'
      };

      // ── Struttura DOM del Canvas all'interno di .reveal .slides ──
      var slidesContainer = document.querySelector('.reveal .slides');
      if (!slidesContainer) return;

      var boardOverlay = document.createElement('div');
      boardOverlay.className = 'psi-lavagna-board-overlay';
      slidesContainer.appendChild(boardOverlay);

      var canvas = document.createElement('canvas');
      canvas.className = 'psi-lavagna-canvas';
      canvas.width = 1280;
      canvas.height = 720;
      slidesContainer.appendChild(canvas);

      var ctx = canvas.getContext('2d');

      // ── Stato Locale ──
      // I tratti stanno in strati: uno per slide (chiave 'h_v') e uno per la lavagna,
      // unica per tutto il mazzo. I tratti della lavagna sono in coordinate «mondo»,
      // che la vista (zoom e spostamento) proietta sul canvas.
      var BOARD_KEY = 'board';
      var MIN_ZOOM = 0.2;
      var MAX_ZOOM = 5;
      var strokesBySlide = {}; // slideKey o BOARD_KEY -> [{ id, color, width, mode, points }]
      var view = { s: 1, x: 0, y: 0 }; // canvas = mondo * s + (x, y)
      var remoteStrokes = {};  // strokeId -> { lastPoint, stroke }
      var currentSlideKey = '0_0';
      var currentColor = '#ff3b30';
      var currentWidth = 4;
      var currentMode = 'pen'; // 'pen' | 'eraser'
      var isBoardActive = false;

      var channel = null;
      var isConnected = false;

      // Gestione disegno attivo
      var activeStroke = null;
      var activePointerId = null;
      var lastLocalPoint = null;
      var batchBuffer = [];
      var batchTimer = null;

      // Gesti con le dita: swipe con un dito sulle slide, pinch a due dita sulla lavagna
      var touchPoints = {}; // pointerId -> punto del canvas
      var touchStartX = 0;
      var touchStartY = 0;
      var swipeOk = false;  // lo swipe conta solo se il dito è rimasto da solo
      var pinch = null;     // { d0, s0, wx, wy }: distanza e zoom iniziali, punto del mondo tra le dita

      if (isSpeaker) {
        document.documentElement.classList.add('psi-lavagna-pen-mode');
        // Previene double-tap zoom e gesture delay nativi di Safari su iPad
        try {
          var vp = document.querySelector('meta[name="viewport"]');
          if (vp) {
            vp.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
          }
        } catch (_) {}
      }

      function getSlideKey() {
        var indices = deck.getIndices();
        return indices.h + '_' + indices.v;
      }
      currentSlideKey = getSlideKey();

      // Strato su cui si disegna e che si vede: la lavagna se è attiva, altrimenti la slide
      function layerKey() {
        return isBoardActive ? BOARD_KEY : currentSlideKey;
      }

      // Coordinate normalizzate relative al canvas 1280x720
      function getCoords(e) {
        var rect = canvas.getBoundingClientRect();
        var scaleX = canvas.width / rect.width;
        var scaleY = canvas.height / rect.height;
        var p = (typeof e.pressure === 'number' && e.pressure > 0) ? e.pressure : 0.5;
        return {
          x: Math.round((e.clientX - rect.left) * scaleX * 10) / 10,
          y: Math.round((e.clientY - rect.top) * scaleY * 10) / 10,
          p: Math.round(p * 100) / 100
        };
      }

      // Punto del canvas -> coordinate dello strato corrente (il mondo, sulla lavagna)
      function toLayer(pt) {
        if (!isBoardActive) return pt;
        return {
          x: Math.round((pt.x - view.x) / view.s * 100) / 100,
          y: Math.round((pt.y - view.y) / view.s * 100) / 100,
          p: pt.p
        };
      }

      function clampZoom(s) {
        return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, s));
      }

      function setStrokeStyle(targetCtx, color, mode) {
        targetCtx.lineCap = 'round';
        targetCtx.lineJoin = 'round';
        if (mode === 'eraser') {
          targetCtx.globalCompositeOperation = 'destination-out';
          targetCtx.strokeStyle = 'rgba(0,0,0,1)';
        } else {
          targetCtx.globalCompositeOperation = 'source-over';
          targetCtx.strokeStyle = color;
        }
      }

      // Spessore di un segmento, modulato dalla pressione; a passi di 0.25 così
      // i segmenti vicini di un tratto hanno lo stesso spessore e si disegnano insieme
      function segmentWidth(width, mode, press) {
        if (mode === 'eraser') return width * 5.5;
        var w = Math.max(1.5, width * (0.35 + (press != null ? press : 0.5) * 0.9));
        return Math.round(w * 4) / 4;
      }

      // Disegno di un singolo segmento fluido
      function drawSegment(targetCtx, p0, p1, color, width, mode) {
        targetCtx.save();
        setStrokeStyle(targetCtx, color, mode);
        targetCtx.lineWidth = segmentWidth(width, mode, p1.p);
        targetCtx.beginPath();
        targetCtx.moveTo(p0.x, p0.y);
        targetCtx.lineTo(p1.x, p1.y);
        targetCtx.stroke();
        targetCtx.restore();
      }

      // Geometria di un tratto: un Path2D per spessore e il riquadro che lo contiene.
      // Si calcola una volta e si rifà solo se il tratto cresce (i tratti remoti arrivano a pezzi):
      // così il ridisegno costa meno anche con una lavagna piena.
      function strokeGeometry(stroke) {
        var pts = stroke.points;
        if (stroke.cache && stroke.cache.n === pts.length) return stroke.cache;
        var paths = {};
        var path = null;
        var lastW = null;
        var maxW = 0;
        var box = { x0: pts[0].x, y0: pts[0].y, x1: pts[0].x, y1: pts[0].y };
        var segs = pts.length > 1 ? pts : [pts[0], { x: pts[0].x + 0.1, y: pts[0].y + 0.1, p: pts[0].p }];
        for (var i = 1; i < segs.length; i++) {
          var w = segmentWidth(stroke.width, stroke.mode, segs[i].p);
          if (w !== lastW) {
            path = paths[w] || (paths[w] = new Path2D());
            path.moveTo(segs[i - 1].x, segs[i - 1].y);
            lastW = w;
            maxW = Math.max(maxW, w);
          }
          path.lineTo(segs[i].x, segs[i].y);
          box.x0 = Math.min(box.x0, segs[i].x);
          box.y0 = Math.min(box.y0, segs[i].y);
          box.x1 = Math.max(box.x1, segs[i].x);
          box.y1 = Math.max(box.y1, segs[i].y);
        }
        box.x0 -= maxW; box.y0 -= maxW; box.x1 += maxW; box.y1 += maxW;
        stroke.cache = { n: pts.length, paths: paths, box: box };
        return stroke.cache;
      }

      // Ridisegno di un tratto completo (area: riquadro visibile, per saltare i tratti fuori vista)
      function renderFullStroke(targetCtx, stroke, area) {
        if (!stroke || !stroke.points || stroke.points.length === 0) return;
        var geo = strokeGeometry(stroke);
        if (area && (geo.box.x1 < area.x0 || geo.box.x0 > area.x1 || geo.box.y1 < area.y0 || geo.box.y0 > area.y1)) return;
        targetCtx.save();
        setStrokeStyle(targetCtx, stroke.color, stroke.mode);
        for (var w in geo.paths) {
          targetCtx.lineWidth = +w;
          targetCtx.stroke(geo.paths[w]);
        }
        targetCtx.restore();
      }

      // Ridisegno dello strato visibile. Sulla lavagna il contesto resta con la
      // trasformazione della vista, così anche i segmenti disegnati dopo sono al posto giusto.
      function redraw() {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var area = null;
        if (isBoardActive) {
          ctx.setTransform(view.s, 0, 0, view.s, view.x, view.y);
          area = {
            x0: -view.x / view.s,
            y0: -view.y / view.s,
            x1: (canvas.width - view.x) / view.s,
            y1: (canvas.height - view.y) / view.s
          };
        }
        var key = layerKey();
        var strokes = strokesBySlide[key] || [];
        for (var i = 0; i < strokes.length; i++) {
          renderFullStroke(ctx, strokes[i], area);
        }
        if (activeStroke && activeStroke.layer === key) renderFullStroke(ctx, activeStroke, area);
      }

      // ── Vista della Lavagna (zoom e spostamento) ──
      // Ridisegnare tutti i tratti a ogni fotogramma del pinch non regge una lavagna piena.
      // Durante il gesto si sposta e si scala un'istantanea del canvas (un'immagine sola);
      // i tratti si ridisegnano davvero, nitidi e completi, quando la vista si ferma.
      var snapshot = document.createElement('canvas');
      snapshot.width = canvas.width;
      snapshot.height = canvas.height;
      var snapCtx = snapshot.getContext('2d');
      var snapView = null; // vista al momento dell'istantanea; null = nessun gesto in corso
      var settleTimer = null;
      var redrawFrame = 0;
      var lastViewSend = 0;
      var viewSendTimer = null;

      function drawSnapshot() {
        var k = view.s / snapView.s;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.setTransform(k, 0, 0, k, view.x - snapView.x * k, view.y - snapView.y * k);
        ctx.drawImage(snapshot, 0, 0);
        // Il contesto torna alla vista: i segmenti disegnati nel frattempo vanno al posto giusto
        ctx.setTransform(view.s, 0, 0, view.s, view.x, view.y);
      }

      function settleView() {
        clearTimeout(settleTimer);
        snapView = null;
      }

      function setView(s, x, y, broadcast) {
        if (!isFinite(s) || !isFinite(x) || !isFinite(y)) return;
        if (isBoardActive && !snapView) {
          snapCtx.clearRect(0, 0, snapshot.width, snapshot.height);
          snapCtx.drawImage(canvas, 0, 0);
          snapView = view;
        }
        view = { s: clampZoom(s), x: x, y: y };

        // Griglia di puntini sullo sfondo: si muove con la vista e fa vedere lo zoom anche dove non c'è scritto nulla
        var grid = 40 * view.s;
        while (grid < 16) grid *= 2;
        boardOverlay.style.setProperty('--psi-grid', grid + 'px');
        boardOverlay.style.setProperty('--psi-grid-x', (view.x - grid / 2) + 'px');
        boardOverlay.style.setProperty('--psi-grid-y', (view.y - grid / 2) + 'px');

        var zoomBtn = document.querySelector('.psi-tb-zoom-btn');
        if (zoomBtn) zoomBtn.textContent = Math.round(view.s * 100) + '%';

        // Durante il pinch arrivano più eventi per fotogramma: un solo disegno per fotogramma
        if (!redrawFrame) {
          redrawFrame = requestAnimationFrame(function () {
            redrawFrame = 0;
            if (snapView && isBoardActive) drawSnapshot();
            else redraw();
          });
        }
        if (snapView) {
          clearTimeout(settleTimer);
          settleTimer = setTimeout(function () {
            settleView();
            redraw();
          }, 150);
        }
        if (broadcast && isSpeaker) sendView();
      }

      // Invio della vista al proiettore al massimo ogni 40 ms, sempre con l'ultima vista
      function sendView() {
        clearTimeout(viewSendTimer);
        var wait = 40 - (Date.now() - lastViewSend);
        if (wait <= 0) {
          lastViewSend = Date.now();
          sendBroadcast('view', { token: token, s: view.s, x: view.x, y: view.y });
        } else {
          viewSendTimer = setTimeout(sendView, wait);
        }
      }

      // ── Supabase Realtime Broadcast ──
      function sendBroadcast(event, payload) {
        if (!channel || !isConnected) return;
        try {
          channel.send({
            type: 'broadcast',
            event: event,
            payload: payload
          });
        } catch (err) {
          console.warn('PSILavagna: errore invio broadcast:', err);
        }
      }

      function flushBatch(isEnd) {
        if (batchTimer) {
          clearTimeout(batchTimer);
          batchTimer = null;
        }
        if (!activeStroke) return;
        if (batchBuffer.length === 0 && !isEnd) return;

        var payload = {
          token: token,
          slideId: activeStroke.layer,
          strokeId: activeStroke.id,
          color: activeStroke.color,
          width: activeStroke.width,
          mode: activeStroke.mode,
          points: batchBuffer,
          isEnd: !!isEnd
        };
        batchBuffer = [];
        sendBroadcast('stroke', payload);
      }

      function finalizeActiveStroke() {
        if (!activeStroke) return;
        flushBatch(true);
        var key = activeStroke.layer;
        if (!strokesBySlide[key]) strokesBySlide[key] = [];
        strokesBySlide[key].push(activeStroke);
        activeStroke = null;
        lastLocalPoint = null;
        batchBuffer = [];
      }

      // ── Ricezione Remota (Proiettore) ──
      function handleRemoteStroke(payload) {
        if (payload.token !== token) return;
        var sId = payload.slideId;
        if (!strokesBySlide[sId]) strokesBySlide[sId] = [];

        var entry = remoteStrokes[payload.strokeId];
        if (!entry) {
          entry = {
            lastPoint: null,
            stroke: {
              id: payload.strokeId,
              color: payload.color,
              width: payload.width,
              mode: payload.mode,
              points: []
            }
          };
          remoteStrokes[payload.strokeId] = entry;
          strokesBySlide[sId].push(entry.stroke);
        }

        var pts = payload.points || [];
        for (var i = 0; i < pts.length; i++) {
          var p = pts[i];
          entry.stroke.points.push(p);
          if (sId === layerKey()) {
            if (entry.lastPoint) {
              drawSegment(ctx, entry.lastPoint, p, entry.stroke.color, entry.stroke.width, entry.stroke.mode);
            } else {
              drawSegment(ctx, p, { x: p.x + 0.1, y: p.y + 0.1, p: p.p }, entry.stroke.color, entry.stroke.width, entry.stroke.mode);
            }
          }
          entry.lastPoint = p;
        }

        if (payload.isEnd) {
          delete remoteStrokes[payload.strokeId];
        }
      }

      function handleRemoteClear(payload) {
        if (payload.token !== token) return;
        strokesBySlide[payload.slideId] = [];
        if (payload.slideId === layerKey()) {
          redraw();
        }
      }

      function handleRemoteUndo(payload) {
        if (payload.token !== token) return;
        var list = strokesBySlide[payload.slideId];
        if (list && list.length > 0) {
          list.pop();
          if (payload.slideId === layerKey()) {
            redraw();
          }
        }
      }

      function handleRemoteNav(payload) {
        if (payload.token !== token) return;
        var cur = deck.getIndices();
        var curF = typeof cur.f === 'number' ? cur.f : -1;
        var targetF = typeof payload.indexf === 'number' ? payload.indexf : -1;
        if (cur.h !== payload.indexh || cur.v !== payload.indexv || curF !== targetF) {
          deck.slide(payload.indexh, payload.indexv, targetF);
        }
      }

      // ── Puntatore Laser Sincronizzato ──
      var laserDot = document.querySelector('.psi-laser-dot');
      if (!laserDot) {
        laserDot = document.createElement('div');
        laserDot.className = 'psi-laser-dot';
        document.body.appendChild(laserDot);
      }
      var laserHideTimer = null;
      var lastLaserSend = 0;
      var laserSendTimer = null;

      function sendLaserPos(pt, on) {
        if (!isSpeaker) return;
        if (!on) {
          clearTimeout(laserSendTimer);
          sendBroadcast('laser', { token: token, on: false });
          return;
        }
        var now = Date.now();
        if (now - lastLaserSend > 28) {
          lastLaserSend = now;
          sendBroadcast('laser', { token: token, x: pt.x, y: pt.y, on: true });
        } else {
          clearTimeout(laserSendTimer);
          laserSendTimer = setTimeout(function () {
            lastLaserSend = Date.now();
            sendBroadcast('laser', { token: token, x: pt.x, y: pt.y, on: true });
          }, 28);
        }
      }

      function handleRemoteLaser(payload) {
        if (payload.token !== token) return;
        if (!payload.on) {
          laserDot.classList.remove('on');
          return;
        }
        var rect = canvas.getBoundingClientRect();
        var clientX = rect.left + (payload.x / 1280) * rect.width;
        var clientY = rect.top + (payload.y / 720) * rect.height;
        laserDot.style.transform = 'translate(' + clientX + 'px,' + clientY + 'px)';
        laserDot.classList.add('on');

        clearTimeout(laserHideTimer);
        laserHideTimer = setTimeout(function () {
          laserDot.classList.remove('on');
        }, 1500);
      }

      function handleRemoteBoard(payload) {
        if (payload.token !== token) return;
        if (payload.view) setView(payload.view.s, payload.view.x, payload.view.y, false);
        setBoardActive(payload.active, false);
      }

      function handleRemoteView(payload) {
        if (payload.token !== token) return;
        setView(payload.s, payload.x, payload.y, false);
      }

      function setBoardActive(active, broadcast) {
        if (activeStroke) finalizeActiveStroke();
        pinch = null;
        settleView();
        isBoardActive = active;
        slidesContainer.classList.toggle('psi-board-active', active);
        var btn = document.querySelector('.psi-tb-board-btn');
        if (btn) btn.classList.toggle('psi-active', active);
        var zoomBtn = document.querySelector('.psi-tb-zoom-btn');
        if (zoomBtn) zoomBtn.hidden = !active;
        var clearBtn = document.querySelector('.psi-tb-clear-btn');
        if (clearBtn) clearBtn.title = active ? 'Pulisci lavagna' : 'Pulisci slide';
        redraw();
        if (broadcast && isSpeaker) {
          sendBroadcast('board', { token: token, active: isBoardActive, view: view });
        }
      }

      // ── Pinch sulla lavagna: zoom e spostamento insieme ──
      function pinchGeometry() {
        var ids = Object.keys(touchPoints);
        var a = touchPoints[ids[0]];
        var b = touchPoints[ids[1]];
        return {
          mx: (a.x + b.x) / 2,
          my: (a.y + b.y) / 2,
          d: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y))
        };
      }

      // (Ri)parte da zero a ogni dito che si aggiunge o si toglie, così la vista non salta
      function startPinch() {
        pinch = null;
        if (!isBoardActive || activeStroke || Object.keys(touchPoints).length < 2) return;
        var g = pinchGeometry();
        pinch = { d0: g.d, s0: view.s, wx: (g.mx - view.x) / view.s, wy: (g.my - view.y) / view.s };
      }

      // Il punto del mondo che stava tra le dita resta tra le dita
      function movePinch() {
        var g = pinchGeometry();
        var s = clampZoom(pinch.s0 * g.d / pinch.d0);
        setView(s, g.mx - pinch.wx * s, g.my - pinch.wy * s, true);
      }

      // ── Eventi Pointer per Apple Pencil & Palm Rejection ──
      if (isSpeaker) {
        // Le dita sul canvas le gestisce solo la lavagna: lo swipe di reveal farebbe
        // girare slide in più a ogni swipe e durante il pinch
        canvas.setAttribute('data-prevent-swipe', '');
        // Safari iPad: niente zoom della pagina quando si fa pinch sulla lavagna
        document.addEventListener('gesturestart', function (e) { e.preventDefault(); });

        // Disabilita categoricamente qualsiasi tentativo di selezione testo dal canvas
        canvas.addEventListener('selectstart', function (e) { e.preventDefault(); });
        canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });
        window.addEventListener('contextmenu', function (e) {
          if (!e.target.closest('.psi-tb-item')) {
            e.preventDefault();
          }
        });
        document.addEventListener('selectstart', function (e) {
          if (!e.target.closest('.psi-tb-item')) {
            e.preventDefault();
          }
        });

        // Previene gesti touch nativi di iOS e Reveal.js sul canvas
        ['touchstart', 'touchmove', 'touchend', 'touchcancel'].forEach(function (evtName) {
          canvas.addEventListener(evtName, function (e) {
            e.preventDefault();
          }, { passive: false });
        });

        canvas.addEventListener('pointerdown', function (e) {
          e.preventDefault();

          if (currentMode === 'laser') {
            var ptLaser = getCoords(e);
            laserDot.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
            laserDot.classList.add('on');
            sendLaserPos(ptLaser, true);
            return;
          }

          // Palm Rejection: tocco con le dita ignorato per il disegno
          if (e.pointerType === 'touch') {
            // Primo dito di un nuovo tocco: via le dita rimaste appese senza pointerup
            if (e.isPrimary) touchPoints = {};
            touchPoints[e.pointerId] = getCoords(e);
            var fingers = Object.keys(touchPoints).length;
            if (fingers === 1) {
              touchStartX = e.clientX;
              touchStartY = e.clientY;
            }
            // Sulla lavagna lo swipe non gira le slide: cambierebbero di nascosto, sotto lo sfondo
            swipeOk = fingers === 1 && !isBoardActive;
            startPinch();
            return;
          }

          // La penna ha la precedenza sulle dita: con il palmo appoggiato niente pinch né swipe
          pinch = null;
          swipeOk = false;

          // Se un tratto precedente non è stato chiuso (es. sequenza rapidissima o pen lift volante),
          // finalizzalo immediatamente prima di iniziare quello nuovo!
          if (activeStroke) {
            finalizeActiveStroke();
          }

          // Sulla lavagna il tratto è nel mondo: lo spessore scelto vale per lo zoom attuale
          var pt = toLayer(getCoords(e));
          var strokeId = 's_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
          activePointerId = e.pointerId;
          activeStroke = {
            id: strokeId,
            layer: layerKey(),
            color: currentColor,
            width: isBoardActive ? currentWidth / view.s : currentWidth,
            mode: currentMode,
            points: [pt],
            pointerId: e.pointerId
          };
          lastLocalPoint = pt;
          batchBuffer = [pt];

          // Cattura esplicita del puntatore per garantire che tutti gli eventi ad alta velocità
          // appartengano a questo tratto e non vengano intercettati dal browser
          try {
            if (canvas.setPointerCapture && e.pointerId != null) {
              canvas.setPointerCapture(e.pointerId);
            }
          } catch (_) {}

          // Disegna subito punto iniziale
          drawSegment(ctx, pt, { x: pt.x + 0.1, y: pt.y + 0.1, p: pt.p }, activeStroke.color, activeStroke.width, activeStroke.mode);

          // Flush temporizzato ogni ~35ms
          batchTimer = setTimeout(function () { flushBatch(false); }, 35);
        });

        canvas.addEventListener('pointermove', function (e) {
          e.preventDefault();

          if (currentMode === 'laser') {
            var ptLaser = getCoords(e);
            laserDot.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
            laserDot.classList.add('on');
            sendLaserPos(ptLaser, true);
            return;
          }

          if (e.pointerType === 'touch') {
            if (touchPoints[e.pointerId]) {
              touchPoints[e.pointerId] = getCoords(e);
              if (pinch) movePinch();
            }
            return;
          }
          if (!activeStroke) return;

          // Se l'evento non appartiene al puntatore attivo di disegno, ignoralo (evita interferenze da palmo)
          if (activePointerId !== null && e.pointerId !== undefined && e.pointerId !== activePointerId) {
            return;
          }

          // Supporto eventi coalesced per Apple Pencil ad alta frequenza (120/240Hz)
          var events = (e.getCoalescedEvents && e.getCoalescedEvents().length > 0)
            ? e.getCoalescedEvents()
            : [e];

          for (var i = 0; i < events.length; i++) {
            var ev = events[i];
            var pt = toLayer(getCoords(ev));
            drawSegment(ctx, lastLocalPoint, pt, activeStroke.color, activeStroke.width, activeStroke.mode);
            lastLocalPoint = pt;
            activeStroke.points.push(pt);
            batchBuffer.push(pt);
          }

          if (!batchTimer) {
            batchTimer = setTimeout(function () { flushBatch(false); }, 35);
          }
        });

        // Fine di un tocco con il dito. Conta solo una volta per dito: endStroke ascolta
        // sia il canvas sia window, e i tocchi sulla toolbar non devono girare slide.
        function endTouch(e) {
          delete touchPoints[e.pointerId];
          if (pinch) {
            startPinch(); // continua con le dita rimaste, o si chiude
            return;
          }
          if (!swipeOk || e.type === 'pointercancel') return;
          swipeOk = false;
          // Rilevamento swipe orizzontale con le dita per girare le slide
          var dx = e.clientX - touchStartX;
          var dy = e.clientY - touchStartY;
          if (Math.abs(dx) > 75 && Math.abs(dy) < 55) {
            if (dx < 0) deck.next();
            else deck.prev();
          }
        }

        function endStroke(e) {
          if (e && e.preventDefault) e.preventDefault();

          if (e && e.pointerType === 'touch' && touchPoints[e.pointerId]) {
            endTouch(e);
            return;
          }

          if (currentMode === 'laser') {
            laserDot.classList.remove('on');
            sendLaserPos(null, false);
            return;
          }

          if (e && e.pointerType === 'touch') return;

          // Se l'evento proviene da un pointer diverso da quello attivo che disegna, ignoralo
          if (activePointerId !== null && e && e.pointerId !== undefined && e.pointerId !== activePointerId) {
            return;
          }

          // Rilascio esplicito del pointer capture
          if (activePointerId !== null) {
            try {
              if (canvas.releasePointerCapture && canvas.hasPointerCapture && canvas.hasPointerCapture(activePointerId)) {
                canvas.releasePointerCapture(activePointerId);
              }
            } catch (_) {}
            activePointerId = null;
          }

          finalizeActiveStroke();
        }

        canvas.addEventListener('pointerup', endStroke);
        canvas.addEventListener('pointercancel', endStroke);
        window.addEventListener('pointerup', endStroke);
        window.addEventListener('pointercancel', endStroke);

        // Trackpad o rotellina sulla lavagna (PC): ctrl + rotellina, o pinch sul trackpad, zooma; altrimenti sposta
        canvas.addEventListener('wheel', function (e) {
          if (!isBoardActive) return;
          e.preventDefault();
          var unit = e.deltaMode === 1 ? 16 : 1;
          if (e.ctrlKey) {
            var pt = getCoords(e);
            // Il pinch del trackpad manda passi piccoli; uno scatto della rotellina vale al massimo x1.28
            var dz = Math.max(-25, Math.min(25, e.deltaY * unit));
            var s = clampZoom(view.s * Math.exp(-dz * 0.01));
            setView(s, pt.x - (pt.x - view.x) * s / view.s, pt.y - (pt.y - view.y) * s / view.s, true);
          } else {
            var k = canvas.width / canvas.getBoundingClientRect().width * unit;
            setView(view.s, view.x - e.deltaX * k, view.y - e.deltaY * k, true);
          }
        }, { passive: false });
      }

      // ── Sincronizzazione Navigazione & Animazioni Frammenti ──
      function syncSpeakerNav() {
        if (!isSpeaker) return;
        var ind = deck.getIndices();
        sendBroadcast('nav', {
          token: token,
          indexh: ind.h,
          indexv: ind.v,
          indexf: typeof ind.f === 'number' ? ind.f : -1
        });
      }

      // I tratti restano con la loro slide; se la lavagna è attiva resta in vista lei
      deck.on('slidechanged', function () {
        if (activeStroke) finalizeActiveStroke();
        currentSlideKey = getSlideKey();
        redraw();
        updateToolbarSlideCounter();
        syncSpeakerNav();
      });

      deck.on('fragmentshown', function () {
        updateToolbarSlideCounter();
        syncSpeakerNav();
      });

      deck.on('fragmenthidden', function () {
        updateToolbarSlideCounter();
        syncSpeakerNav();
      });

      // ── Azioni Locali: Clear, Undo ──
      function localClear() {
        var key = layerKey();
        // La lavagna raccoglie tutta la lezione: prima di svuotarla si chiede conferma
        if (key === BOARD_KEY && (strokesBySlide[key] || []).length > 0 &&
            !window.confirm('Cancellare tutta la lavagna?')) return;
        strokesBySlide[key] = [];
        redraw();
        if (isSpeaker) {
          sendBroadcast('clear', { token: token, slideId: key });
        }
      }

      function localUndo() {
        var key = layerKey();
        var list = strokesBySlide[key];
        if (list && list.length > 0) {
          list.pop();
          redraw();
          if (isSpeaker) {
            sendBroadcast('undo', { token: token, slideId: key });
          }
        }
      }

      // ── Creazione Toolbar Fluttuante per iPad ──
      function updateToolbarSlideCounter() {
        var el = document.querySelector('.psi-tb-slide-info');
        if (!el) return;
        var indices = deck.getIndices();
        var total = deck.getTotalSlides ? deck.getTotalSlides() : '?';
        var txt = (indices.h + 1) + ' / ' + total;
        if (typeof indices.f === 'number' && indices.f >= 0) {
          txt += '·s' + (indices.f + 1);
        }
        el.textContent = txt;
      }

      function updateStatus(connected) {
        isConnected = connected;
        var statusEl = document.querySelector('.psi-tb-status');
        if (!statusEl) return;
        statusEl.classList.toggle('psi-connected', connected);
        var txt = statusEl.querySelector('.psi-tb-status-text');
        if (txt) txt.textContent = connected ? 'Live' : 'Off';
      }

      function buildToolbar() {
        var bar = document.createElement('div');
        bar.className = 'psi-lavagna-toolbar';

        // 1. Stato connessione
        var statusBox = document.createElement('div');
        statusBox.className = 'psi-tb-status psi-tb-item';
        statusBox.title = 'Stato canale Supabase Realtime: ' + deckId;
        statusBox.innerHTML = '<span class="psi-tb-status-dot"></span><span class="psi-tb-status-text">Off</span>';
        bar.appendChild(statusBox);

        var d1 = document.createElement('div');
        d1.className = 'psi-tb-divider psi-tb-item';
        bar.appendChild(d1);

        // 2. Telecomando Slide
        var navGroup = document.createElement('div');
        navGroup.className = 'psi-tb-group psi-tb-item';

        var prevBtn = document.createElement('button');
        prevBtn.className = 'psi-tb-btn psi-tb-nav-btn';
        prevBtn.textContent = '◀';
        prevBtn.title = 'Slide / animazione precedente';
        prevBtn.addEventListener('click', function () { deck.prev(); });
        navGroup.appendChild(prevBtn);

        var slideInfo = document.createElement('span');
        slideInfo.className = 'psi-tb-slide-info';
        slideInfo.textContent = '1 / ?';
        navGroup.appendChild(slideInfo);

        var nextBtn = document.createElement('button');
        nextBtn.className = 'psi-tb-btn psi-tb-nav-btn';
        nextBtn.textContent = '▶';
        nextBtn.title = 'Slide / animazione successiva';
        nextBtn.addEventListener('click', function () { deck.next(); });
        navGroup.appendChild(nextBtn);

        bar.appendChild(navGroup);

        var d2 = document.createElement('div');
        d2.className = 'psi-tb-divider psi-tb-item';
        bar.appendChild(d2);

        // 3. Strumenti (Penna, Gomma, Laser, Lavagna)
        var toolsGroup = document.createElement('div');
        toolsGroup.className = 'psi-tb-group psi-tb-item';

        var penBtn = document.createElement('button');
        penBtn.className = 'psi-tb-btn psi-active';
        penBtn.textContent = '✏️';
        penBtn.title = 'Penna / Annotazioni';
        toolsGroup.appendChild(penBtn);

        var eraserBtn = document.createElement('button');
        eraserBtn.className = 'psi-tb-btn';
        eraserBtn.textContent = '🧹';
        eraserBtn.title = 'Gomma per cancellare';
        toolsGroup.appendChild(eraserBtn);

        var laserBtn = document.createElement('button');
        laserBtn.className = 'psi-tb-btn psi-tb-laser-btn';
        laserBtn.textContent = '🔴';
        laserBtn.title = 'Puntatore Laser (tocca o muovi la penna per puntare sul proiettore)';
        toolsGroup.appendChild(laserBtn);

        var boardBtn = document.createElement('button');
        boardBtn.className = 'psi-tb-btn psi-tb-board-btn';
        boardBtn.textContent = '🔳';
        boardBtn.title = 'Attiva/disattiva sfondo lavagna scura';
        boardBtn.addEventListener('click', function () {
          setBoardActive(!isBoardActive, true);
        });
        toolsGroup.appendChild(boardBtn);

        // Zoom della lavagna (visibile solo sulla lavagna): tocco = torna alla vista iniziale
        var zoomBtn = document.createElement('button');
        zoomBtn.className = 'psi-tb-btn psi-tb-zoom-btn';
        zoomBtn.textContent = '100%';
        zoomBtn.title = 'Zoom della lavagna: tocca per tornare alla vista iniziale';
        zoomBtn.hidden = true;
        zoomBtn.addEventListener('click', function () {
          setView(1, 0, 0, true);
        });
        toolsGroup.appendChild(zoomBtn);

        penBtn.addEventListener('click', function () {
          currentMode = 'pen';
          penBtn.classList.add('psi-active');
          eraserBtn.classList.remove('psi-active');
          laserBtn.classList.remove('psi-active');
        });

        eraserBtn.addEventListener('click', function () {
          currentMode = 'eraser';
          eraserBtn.classList.add('psi-active');
          penBtn.classList.remove('psi-active');
          laserBtn.classList.remove('psi-active');
        });

        laserBtn.addEventListener('click', function () {
          currentMode = 'laser';
          laserBtn.classList.add('psi-active');
          penBtn.classList.remove('psi-active');
          eraserBtn.classList.remove('psi-active');
        });

        bar.appendChild(toolsGroup);

        var d3 = document.createElement('div');
        d3.className = 'psi-tb-divider psi-tb-item';
        bar.appendChild(d3);

        // 4. Palette Colori
        var colorGroup = document.createElement('div');
        colorGroup.className = 'psi-tb-group psi-tb-item';
        var colors = [
          { hex: '#ff3b30', name: 'Rosso' },
          { hex: '#30d158', name: 'Verde' },
          { hex: '#ffd60a', name: 'Giallo' },
          { hex: '#ffffff', name: 'Bianco' }
        ];
        colors.forEach(function (c, idx) {
          var cBtn = document.createElement('button');
          cBtn.className = 'psi-tb-color-btn' + (idx === 0 ? ' psi-active' : '');
          cBtn.style.setProperty('--btn-color', c.hex);
          cBtn.title = c.name;
          cBtn.addEventListener('click', function () {
            currentColor = c.hex;
            currentMode = 'pen';
            penBtn.classList.add('psi-active');
            eraserBtn.classList.remove('psi-active');
            laserBtn.classList.remove('psi-active');
            colorGroup.querySelectorAll('.psi-tb-color-btn').forEach(function (b) { b.classList.remove('psi-active'); });
            cBtn.classList.add('psi-active');
          });
          colorGroup.appendChild(cBtn);
        });
        bar.appendChild(colorGroup);

        var d4 = document.createElement('div');
        d4.className = 'psi-tb-divider psi-tb-item';
        bar.appendChild(d4);

        // 5. Spessore Tratto
        var sizeGroup = document.createElement('div');
        sizeGroup.className = 'psi-tb-group psi-tb-item';
        var sizes = [
          { px: 2.5, dot: 4, name: 'Fine' },
          { px: 5, dot: 8, name: 'Medio' },
          { px: 11, dot: 13, name: 'Spesso' }
        ];
        sizes.forEach(function (s, idx) {
          var sBtn = document.createElement('button');
          sBtn.className = 'psi-tb-btn psi-tb-size-btn' + (idx === 1 ? ' psi-active' : '');
          sBtn.title = 'Tratto ' + s.name;
          sBtn.innerHTML = '<span class="psi-tb-size-dot" style="width:' + s.dot + 'px;height:' + s.dot + 'px;"></span>';
          sBtn.addEventListener('click', function () {
            currentWidth = s.px;
            sizeGroup.querySelectorAll('.psi-tb-size-btn').forEach(function (b) { b.classList.remove('psi-active'); });
            sBtn.classList.add('psi-active');
          });
          sizeGroup.appendChild(sBtn);
        });
        bar.appendChild(sizeGroup);

        var d5 = document.createElement('div');
        d5.className = 'psi-tb-divider psi-tb-item';
        bar.appendChild(d5);

        // 6. Undo & Clear
        var actGroup = document.createElement('div');
        actGroup.className = 'psi-tb-group psi-tb-item';

        var undoBtn = document.createElement('button');
        undoBtn.className = 'psi-tb-btn';
        undoBtn.textContent = '↩️';
        undoBtn.title = 'Annulla ultimo tratto';
        undoBtn.addEventListener('click', localUndo);
        actGroup.appendChild(undoBtn);

        var clearBtn = document.createElement('button');
        clearBtn.className = 'psi-tb-btn psi-tb-clear-btn';
        clearBtn.textContent = '🗑️';
        clearBtn.title = 'Pulisci slide';
        clearBtn.addEventListener('click', localClear);
        actGroup.appendChild(clearBtn);

        bar.appendChild(actGroup);

        // 7. Pulsante Riduci a icona
        var collapseBtn = document.createElement('button');
        collapseBtn.className = 'psi-tb-collapse-btn';
        collapseBtn.textContent = '✕';
        collapseBtn.title = 'Riduci / espandi barra';
        collapseBtn.addEventListener('click', function () {
          var collapsed = bar.classList.toggle('psi-collapsed');
          collapseBtn.textContent = collapsed ? '✏️' : '✕';
        });
        bar.appendChild(collapseBtn);

        document.body.appendChild(bar);
        updateToolbarSlideCounter();
      }

      if (isSpeaker) {
        buildToolbar();
      }

      // Scorciatoie da tastiera (funzionano anche su proiettore):
      // W -> Toggle lavagna scura
      // C -> Clear slide corrente (o lavagna, se attiva)
      // U -> Undo ultimo tratto
      deck.addKeyBinding({ keyCode: 87, key: 'W', description: 'Attiva/disattiva lavagna a mano libera' }, function () {
        setBoardActive(!isBoardActive, true);
      });
      deck.addKeyBinding({ keyCode: 67, key: 'C', description: 'Pulisci i disegni della slide' }, localClear);
      deck.addKeyBinding({ keyCode: 85, key: 'U', description: 'Annulla ultimo tratto di penna' }, localUndo);

      // ── Inizializzazione Supabase Realtime ──
      function initSupabase() {
        if (!window.supabase || !window.supabase.createClient) {
          console.warn('PSILavagna: Supabase client non disponibile.');
          updateStatus(false);
          return;
        }

        try {
          var client = window.supabase.createClient(CFG.api, CFG.key, {
            auth: { persistSession: false }
          });
          var channelName = 'psi-deck-' + deckId;
          channel = client.channel(channelName, {
            config: {
              broadcast: { self: false, ack: false }
            }
          });

          channel
            .on('broadcast', { event: 'stroke' }, function (msg) { handleRemoteStroke(msg.payload); })
            .on('broadcast', { event: 'clear' }, function (msg) { handleRemoteClear(msg.payload); })
            .on('broadcast', { event: 'undo' }, function (msg) { handleRemoteUndo(msg.payload); })
            .on('broadcast', { event: 'nav' }, function (msg) { handleRemoteNav(msg.payload); })
            .on('broadcast', { event: 'board' }, function (msg) { handleRemoteBoard(msg.payload); })
            .on('broadcast', { event: 'view' }, function (msg) { handleRemoteView(msg.payload); })
            .on('broadcast', { event: 'laser' }, function (msg) { handleRemoteLaser(msg.payload); })
            .subscribe(function (status) {
              if (status === 'SUBSCRIBED') {
                updateStatus(true);
              } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
                updateStatus(false);
              }
            });
        } catch (e) {
          console.warn('PSILavagna: errore connessione Supabase:', e);
          updateStatus(false);
        }
      }

      initSupabase();
    }
  };

  window.PSILavagna = PSILavagna;
})();

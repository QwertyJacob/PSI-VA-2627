/**
 * PSI mascot — an animated Greek Psi with eyes and a smile.
 *
 * Lives in the header logo slot (overrides/partials/logo.html), on every page.
 * - spins in when a page loads;
 * - its pupils and head follow the pointer;
 * - blinks, breathes and hops on hover;
 * - spins away before internal navigation, so page changes feel animated.
 *
 * Three.js is vendored under javascripts/vendor/ and imported lazily: the
 * static SVG logo is visible immediately and remains the fallback when
 * WebGL is unavailable or the user asks for reduced motion.
 */

const THREE_URL = new URL('./vendor/three.module.min.js', import.meta.url).href;
const EXIT_MS = 320;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t, strength = 1.7) => {
  const c = strength + 1;
  return 1 + c * Math.pow(t - 1, 3) + strength * Math.pow(t - 1, 2);
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function init(THREE, host) {
  const canvas = host.querySelector('.psi-pet__canvas');
  if (!canvas) return;

  // Probe WebGL2 before instantiating the renderer: on unsupported browsers
  // Three.js logs a scary (but harmless) error, and the static SVG is enough.
  const probe = document.createElement('canvas');
  const probeContext = probe.getContext('webgl2');
  if (!probeContext) {
    host.classList.add('is-static');
    return;
  }
  probeContext.getExtension('WEBGL_lose_context')?.loseContext();

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
  } catch (error) {
    host.classList.add('is-static');
    return;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
  camera.position.set(0, -0.08, 6.15);
  camera.lookAt(0, -0.08, 0);

  const pet = new THREE.Group();
  const head = new THREE.Group();
  pet.add(head);
  scene.add(pet);

  /* ---------------------------------------------------------------- lights */

  scene.add(new THREE.HemisphereLight(0xfff6e2, 0x6b4c1e, 1.6));

  const key = new THREE.DirectionalLight(0xfff1d6, 3.2);
  key.position.set(2.4, 3.4, 4);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x9fb8ff, 2.6);
  rim.position.set(-3, 1.4, -2.6);
  scene.add(rim);

  const fill = new THREE.PointLight(0xffd9a0, 10, 12);
  fill.position.set(-2.2, -1.2, 3);
  scene.add(fill);

  // Soft studio environment: gives the amber body its glossy highlights.
  const envCanvas = document.createElement('canvas');
  envCanvas.width = 32;
  envCanvas.height = 64;
  const envContext = envCanvas.getContext('2d');
  const envGradient = envContext.createLinearGradient(0, 0, 0, 64);
  envGradient.addColorStop(0, '#fff8e8');
  envGradient.addColorStop(0.55, '#ffdda0');
  envGradient.addColorStop(1, '#2a2c55');
  envContext.fillStyle = envGradient;
  envContext.fillRect(0, 0, 32, 64);
  const envTexture = new THREE.CanvasTexture(envCanvas);
  envTexture.mapping = THREE.EquirectangularReflectionMapping;
  envTexture.colorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromEquirectangular(envTexture).texture;
  envTexture.dispose();
  pmrem.dispose();
  scene.environmentIntensity = 0.85;

  /* ---------------------------------------------------------------- model */

  const amber = new THREE.MeshPhysicalMaterial({
    color: 0xf4b544,
    roughness: 0.32,
    metalness: 0.02,
    clearcoat: 0.8,
    clearcoatRoughness: 0.24,
    envMapIntensity: 1.1,
  });
  const ink = new THREE.MeshPhysicalMaterial({
    color: 0x1b2233,
    roughness: 0.28,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
  });
  const porcelain = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    envMapIntensity: 1.35,
  });

  const TUBE = 0.155;
  const ARM_X = 0.6;

  // The two arms of the Psi.
  const armGeometry = new THREE.CapsuleGeometry(TUBE, 0.78, 10, 28);
  for (const x of [-ARM_X, ARM_X]) {
    const arm = new THREE.Mesh(armGeometry, amber);
    arm.position.set(x, 0.55, 0);
    head.add(arm);
  }

  // The rounded bowl that joins the arms at the bottom.
  const bowl = new THREE.Mesh(
    new THREE.TorusGeometry(0.6, TUBE, 20, 96, Math.PI),
    amber,
  );
  bowl.position.y = 0.18;
  bowl.rotation.z = Math.PI;
  head.add(bowl);

  // The centre stroke: in a Psi it rises through the cup up to the level of
  // the arms, then continues below the bowl. It sits slightly behind the
  // smile so the mouth stays readable from the front.
  const stem = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.15, 2.05, 10, 28),
    amber,
  );
  stem.position.set(0, -0.125, -0.04);
  head.add(stem);

  // Eyes: white spheres sitting on top of the arms, with mobile pupils.
  const eyeGeometry = new THREE.SphereGeometry(0.235, 32, 24);
  const pupilGeometry = new THREE.SphereGeometry(0.09, 20, 16);
  const glintGeometry = new THREE.SphereGeometry(0.026, 10, 8);
  const glintMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const eyes = [];

  for (const x of [-ARM_X, ARM_X]) {
    const eye = new THREE.Group();
    eye.position.set(x, 0.755, 0.105);

    const white = new THREE.Mesh(eyeGeometry, porcelain);
    white.scale.set(1, 1, 0.9);
    eye.add(white);

    const pupil = new THREE.Mesh(pupilGeometry, ink);
    pupil.position.set(0, 0, 0.19);
    eye.add(pupil);

    const glint = new THREE.Mesh(glintGeometry, glintMaterial);
    glint.position.set(-0.03, 0.034, 0.072);
    pupil.add(glint);

    head.add(eye);
    eyes.push({ eye, pupil });
  }

  // The smile, stretched across the open cup.
  const smileCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.445, 0.34, 0.12),
    new THREE.Vector3(0, 0.02, 0.29),
    new THREE.Vector3(0.445, 0.34, 0.12),
  );
  const smile = new THREE.Mesh(
    new THREE.TubeGeometry(smileCurve, 40, 0.058, 12, false),
    ink,
  );
  head.add(smile);

  /* ------------------------------------------------------------- animation */

  const state = {
    introStart: 0,
    intro: !reduceMotion.matches,
    hover: 0,
    hoverTarget: 0,
    gazeX: 0,
    gazeY: 0,
    gazeTargetX: 0,
    gazeTargetY: 0,
    lastPointerMove: 0,
    blinkAt: performance.now() + 2400,
    blinkStart: -1,
    exiting: false,
    exitStart: 0,
    exitProgress: 0,
    boopStart: -1,
    lastFrame: performance.now(),
  };

  const pointer = (clientX, clientY) => {
    const rect = host.getBoundingClientRect();
    const spread = Math.max(420, Math.min(window.innerWidth, 1600) * 0.62);
    state.gazeTargetX = clamp((clientX - (rect.left + rect.width / 2)) / spread, -1, 1);
    state.gazeTargetY = clamp(-(clientY - (rect.top + rect.height / 2)) / spread, -1, 1);
    state.lastPointerMove = performance.now();
  };

  window.addEventListener(
    'pointermove',
    (event) => pointer(event.clientX, event.clientY),
    { passive: true },
  );
  document.addEventListener('pointerleave', () => {
    state.gazeTargetX = 0;
    state.gazeTargetY = 0;
  });

  const link = host.closest('a') || host;
  const setHover = (value) => {
    state.hoverTarget = value;
  };
  link.addEventListener('pointerenter', () => setHover(1));
  link.addEventListener('pointerleave', () => setHover(0));
  link.addEventListener('focus', () => setHover(1));
  link.addEventListener('blur', () => setHover(0));
  // The pointer may already be resting on the logo when Three.js finishes
  // loading, after the pointerenter event has fired.
  state.hoverTarget = link.matches(':hover') || link === document.activeElement ? 1 : 0;

  // Clicking the mascot while already on the home page: a little spin
  // instead of a pointless reload.
  link.addEventListener('click', (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    const target = new URL(link.href, location.href);
    if (target.pathname !== location.pathname || target.search !== location.search) return;
    if (location.hash) return;
    event.preventDefault();
    if (!reduceMotion.matches) state.boopStart = performance.now();
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  });

  const finishExit = () => {
    state.exiting = false;
    state.exitStart = 0;
    exitPromise = null;
  };

  let exitPromise = null;
  const playExit = () => {
    if (reduceMotion.matches) return Promise.resolve();
    if (exitPromise) return exitPromise;
    exitPromise = new Promise((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        finishExit();
        resolve();
      };
      state.exiting = true;
      state.exitStart = performance.now();
      // If the browser throttles animation frames, never trap the navigation.
      window.setTimeout(finish, EXIT_MS + 260);
    });
    return exitPromise;
  };

  const resize = () => {
    const rect = host.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.5));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const update = (now) => {
    const dt = Math.min(0.05, Math.max(0.001, (now - state.lastFrame) / 1000));
    state.lastFrame = now;
    const time = now * 0.001;

    const easing = 1 - Math.exp(-8 * dt);

    // Hover state.
    state.hover += (state.hoverTarget - state.hover) * easing;

    // Pointer tracking (with a gentle wander when the pointer rests).
    const idle = (now - state.lastPointerMove) / 1000;
    const wander = !reduceMotion.matches && idle > 4 ? Math.min(1, (idle - 4) / 2) : 0;
    const targetX = clamp(state.gazeTargetX + Math.sin(time * 0.9) * 0.35 * wander, -1, 1);
    const targetY = clamp(state.gazeTargetY + Math.cos(time * 0.7) * 0.18 * wander, -1, 1);
    state.gazeX += (targetX - state.gazeX) * easing;
    state.gazeY += (targetY - state.gazeY) * easing;

    // Intro spin: one full turn and a small overshoot.
    let introSpin = 0;
    let introScale = 1;
    let introLift = 0;
    if (state.intro) {
      const t = clamp((now - state.introStart) / 1050, 0, 1);
      const eased = easeOutCubic(t);
      introSpin = -Math.PI * 2 * (1 - eased);
      introScale = 0.35 + 0.65 * easeOutBack(t, 1.8);
      introLift = (1 - eased) * 0.32 + Math.sin(t * Math.PI) * 0.08;
      if (t >= 1) state.intro = false;
    }

    // Exit spin before navigating away.
    if (state.exiting) {
      const t = clamp((now - state.exitStart) / EXIT_MS, 0, 1);
      state.exitProgress = t * t;
      if (t >= 1) finishExit();
    } else {
      state.exitProgress += (0 - state.exitProgress) * Math.min(1, dt * 12);
    }
    const exitProgress = state.exitProgress;

    // Optional click spin on the current page.
    let boopSpin = 0;
    let boopLift = 0;
    if (state.boopStart >= 0) {
      const t = clamp((now - state.boopStart) / 620, 0, 1);
      boopSpin = Math.PI * 2 * easeOutCubic(t);
      boopLift = Math.sin(t * Math.PI) * 0.1;
      if (t >= 1) state.boopStart = -1;
    }

    // Idle life.
    const breathe = reduceMotion.matches ? 0 : Math.sin(time * 1.7) * 0.012;
    const sway = reduceMotion.matches ? 0 : Math.sin(time * 0.85) * 0.022;

    head.rotation.y = state.gazeX * 0.4 + introSpin + boopSpin + exitProgress * Math.PI * 2;
    head.rotation.x = -state.gazeY * 0.26 - breathe * 0.4;
    head.rotation.z = sway * (1 - exitProgress);

    const scale = introScale * (1 + state.hover * 0.06) * (1 - 0.55 * exitProgress);
    pet.scale.setScalar(scale);
    pet.position.y =
      introLift +
      boopLift +
      state.hover * 0.045 +
      breathe +
      exitProgress * 0.5;
    pet.position.x = 0;

    // Pupils: look where the head looks, a little more strongly.
    const pupilX = state.gazeX * 0.09;
    const pupilY = state.gazeY * 0.075;
    const pupilScale = 1 + state.hover * 0.08;

    // Blink.
    let blink = 1;
    if (!reduceMotion.matches) {
      if (state.blinkStart < 0 && now >= state.blinkAt) {
        state.blinkStart = now;
      }
      if (state.blinkStart >= 0) {
        const t = (now - state.blinkStart) / 165;
        if (t >= 1) {
          state.blinkStart = -1;
          state.blinkAt = now + 2400 + Math.random() * 3600;
        } else {
          blink = 1 - 0.94 * Math.sin(Math.PI * t);
        }
      }
    }

    for (const { eye, pupil } of eyes) {
      eye.scale.set(1 + state.hover * 0.04, blink, 1);
      pupil.position.x = pupilX;
      pupil.position.y = pupilY;
      pupil.scale.setScalar(pupilScale);
    }

    renderer.render(scene, camera);
  };

  let frame = 0;
  const tick = (now) => {
    frame = requestAnimationFrame(tick);
    if (document.hidden) return;
    update(now);
  };

  resize();
  // Start the entrance clock only now: building the scene (and compiling
  // shaders) can take long enough to swallow the whole animation.
  state.introStart = performance.now();
  state.lastFrame = state.introStart;
  state.blinkAt = state.introStart + 2600;
  update(state.introStart);
  host.classList.add('is-live');
  frame = requestAnimationFrame(tick);

  // If the GPU drops the context, fall back to the static SVG instead of
  // leaving a frozen frame in the header.
  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    cancelAnimationFrame(frame);
    host.classList.remove('is-live');
    host.classList.add('is-static');
  });

  const replayIntro = () => {
    state.intro = !reduceMotion.matches;
    state.introStart = performance.now();
    state.blinkAt = state.introStart + 2600;
    state.hover = 0;
    state.hoverTarget = 0;
    state.exiting = false;
    state.exitProgress = 0;
    state.boopStart = -1;
  };

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) replayIntro();
  });

  /* ------------------------------------------------------- page transitions */

  if (!reduceMotion.matches) {
    document.addEventListener(
      'click',
      (event) => {
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const anchor = event.target.closest?.('a[href]');
        if (!anchor) return;
        if (anchor.target && anchor.target !== '_self') return;
        if (anchor.hasAttribute('download')) return;

        const href = anchor.getAttribute('href');
        if (!href || href.startsWith('#')) return;

        const url = new URL(anchor.href, location.href);
        if (url.origin !== location.origin) return;
        if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
        if (url.pathname === location.pathname && url.search === location.search) return;

        event.preventDefault();
        playExit().then(() => {
          location.href = url.href;
        });
      },
      true,
    );
  }

  // Drop the frame loop when the page is frozen (bfcache); replayIntro()
  // restarts it on restore.
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(frame);
  });
  window.addEventListener('pageshow', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(tick);
  });
}

/* -------------------------------------------------------------------- boot */

const host = document.querySelector('[data-psi-pet]');
if (host) {
  const boot = () =>
    import(THREE_URL)
      .then((THREE) => init(THREE, host))
      .catch(() => {
        // Keep the static SVG: no WebGL, no broken layout.
        host.classList.add('is-static');
      });

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(boot, { timeout: 1200 });
  } else {
    window.setTimeout(boot, 200);
  }
}

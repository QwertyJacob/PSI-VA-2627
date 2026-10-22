# Animazione del paradosso di Bertrand

## Avvio

Estrai l'archivio e apri `index.html` nel browser. Non serve installare un server.

## Sorgenti

- `sorgente.html`: sorgente originale dell'animazione, con HTML, CSS e JavaScript leggibili e modificabili.
- `index.html`: versione esportata, pronta da aprire nel browser.
- `strumenti/`: script Python e risorse di stile usati per ricreare la versione esportata.

L'animazione usa JavaScript e SVG e funziona anche senza connessione: l'esportazione include stili e script, senza caricare librerie da CDN.

## Rigenerare dopo una modifica

Con Python 3.10 o successivo, dalla cartella estratta:

```bash
python3 strumenti/scripts/render.py sorgente.html index.html --force --title "Paradosso di Bertrand"
```

## Modello matematico

Le rette sono generate una volta rispetto al cerchio iniziale di raggio 1. Le trasformazioni muovono soltanto il cerchio osservato, che resta contenuto in quello iniziale:

- **Scala:** raggio da 0,25 a 1, con centro nell'origine.
- **Traslazione:** raggio 0,42 e centro da (0; 0) a (0,58; 0).
- **Rotazione:** raggio 0,42 e centro (0,40 cos θ; 0,40 sin θ), con θ da 0° a 360°. Il cerchio percorre un'orbita visibile; le rette restano fisse. Ruotare un cerchio concentrico non produrrebbe un cambiamento visibile.

Una corda è lunga quando supera il lato del triangolo equilatero inscritto nel cerchio osservato: L > sqrt(3) R, equivalentemente distanza della retta dal centro < R/2.

Le tre distribuzioni iniziali sono:

- Due estremi uniformi sulla circonferenza: probabilità iniziale 1/3.
- Punto medio uniforme nel disco: probabilità iniziale 1/4.
- Distanza dal centro uniforme e orientazione uniforme: probabilità iniziale 1/2.

Le tre leggi sono tutte isotrope: l'orientazione della normale alla retta è uniforme in [0, π), indipendentemente dalla sua distanza orientata p dall'origine. Per p in [-1, 1], le rispettive funzioni di ripartizione sono:

- estremi: F(p) = 1/2 + arcsin(p)/π;
- punto medio nel disco: F(p) = (1 + p |p|)/2;
- distanza uniforme: F(p) = (p + 1)/2.

Una retta di normale unitaria n interseca il cerchio di centro c e raggio R se |p − n·c| < R; la corda è lunga se |p − n·c| < R/2. Le percentuali visualizzate sono probabilità teoriche condizionate all'intersezione del cerchio osservato: il rapporto fra l'integrale di F(n·c + R/2) − F(n·c − R/2) e quello di F(n·c + R) − F(n·c − R), calcolati sulle orientazioni con 2048 punti medi. Le funzioni F sono prolungate a 0 e 1 fuori da [-1, 1].

Per isotropia, questi integrali dipendono dalla distanza |c| e non dall'angolo del centro. Il calcolo usa direttamente |c| per evitare variazioni numeriche spurie durante la rotazione. **Le rotazioni da sole non distinguono le tre leggi:** per ciascun metodo, la probabilità resta costante lungo l'orbita, anche se le probabilità dei tre metodi possono essere diverse. L'esempio è circoscritto a rette campionate nel cerchio iniziale: non simula una distribuzione uniforme su tutte le rette del piano.

Le 460 rette disegnate sono un campione illustrativo riproducibile (seme 28317); le loro frequenze possono fluttuare mentre il cerchio ruota. Il pulsante completa un giro in sei secondi e consente di metterlo in pausa; con la preferenza di sistema per movimento ridotto, salta invece di 90° senza animazione. Lo slider è utilizzabile anche da tastiera.

Non esiste una risposta universale senza specificare la procedura casuale. Il confronto qui implementato è quello delle rette fisse e del cerchio mobile.

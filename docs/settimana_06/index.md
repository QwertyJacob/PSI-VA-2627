# Settimana 6 — Bertrand, Gauss e l’asteroide Cerere: variabili aleatorie continue e distribuzione normale

<style>
@media screen {
  .md-typeset .md-typeset__scrollwrap { overflow-x: auto; max-width: 100%; }
  .md-typeset div.arithmatex { overflow-x: auto; max-width: 100%; }
  .md-typeset mjx-assistive-mml { max-width: 100%; }
  .psi-bertrand-frame { display: block; width: 100%; height: 820px; border: 1px solid var(--md-default-fg-color--lightest); border-radius: 8px; }
}
@media screen and (max-width: 600px) {
  .psi-bertrand-frame { height: 920px; }
}
@media print {
  .psi-bertrand-frame { display: none; }
}
</style>

*Che cosa vuol dire scegliere un numero «a caso» quando i valori possibili sono infiniti e non si possono elencare? Da un autobus che passa dopo le due a un asteroide perduto dietro il Sole.*

[:material-presentation: Apri Slide della Lezione](slides/index.html){ .md-button .md-button--primary target="_blank" }

## Il percorso e ciò che è richiesto all’esame {: #esame }

Fino a oggi tutte le nostre variabili aleatorie contavano qualcosa: le facce di un dado, i successi in $n$ prove, i tentativi fino al primo successo, i soldati uccisi in un anno dai calci dei cavalli. I loro valori si potevano mettere in fila, uno dopo l’altro. Questa settimana incontriamo grandezze che non si contano ma si **misurano**: il tempo che passa prima che arrivi un autobus, il tempo tra due richieste a un server, l’altezza di una persona, l’errore di uno strumento. Una misura può cadere in un "punto" qualsiasi di un intervallo, e i valori possibili non si possono più elencare. Ci servono quindi idee nuove per dire come si distribuisce la probabilità.

Il lavoro è diviso in due parti, che corrispondono alle due lezioni. Nella prima parte costruiamo gli strumenti: che cos’è una **variabile aleatoria continua**, perché la sua probabilità si descrive con una **densità** e si calcola come un’area, che cosa misura la **funzione di ripartizione**. Li mettiamo subito alla prova con due distribuzioni: la **distribuzione uniforme**, la più semplice di tutte, e la **distribuzione esponenziale**, che descrive il tempo di attesa tra due eventi e nasce direttamente dalla distribuzione di Poisson della settimana scorsa. Nella seconda parte studiamo la **distribuzione normale**, la celebre curva a campana: impariamo a leggerne i due parametri e a calcolarne le probabilità con una sola tabella, quella della normale standard.

Due storie accompagnano il percorso. La prima è un paradosso che il matematico francese Joseph Bertrand propose nel 1889: una domanda semplicissima, la probabilità che una corda tracciata a caso in un cerchio sia lunga, ammette tre risposte diverse, tutte ragionate. La seconda è la caccia all’asteroide Cerere, avvistato a Palermo la notte di Capodanno del 1801 e perso dopo poche settimane: per ritrovarlo, il giovane Carl Friedrich Gauss dovette chiedersi come si distribuiscono gli errori di una misura, e la risposta fu la campana che oggi porta il suo nome. Non devi ricordare date e nomi: le storie servono a capire perché le idee della settimana sono nate e quale problema risolvono.

All’esame devi saper spiegare perché, per una variabile continua, la probabilità di un singolo valore è zero e perché la probabilità di un intervallo è un’area sotto la densità; devi saper usare la densità e la funzione di ripartizione per calcolare la probabilità che una variabile cada sotto una soglia, sopra una soglia o tra due soglie. Della distribuzione uniforme devi conoscere densità, media e varianza, e saperla usare. Della distribuzione esponenziale devi saper ricavare la coda $P(T>t)=e^{-\lambda t}$ dalla distribuzione di Poisson, conoscere densità, funzione di ripartizione, media e varianza, e dimostrare la proprietà di assenza di memoria. Della distribuzione normale devi conoscere il significato dei parametri $\mu$ e $\sigma$, saper standardizzare una variabile, calcolare probabilità con la tabella di $\Phi$ e con la sua simmetria, usare la regola 68–95–99,7 e risolvere il problema inverso, cioè trovare la soglia che corrisponde a una probabilità assegnata.

Sono invece **facoltative e non richieste all’esame** le tre letture in fondo alla dispensa (il paradosso di Bertrand con i conti completi, l’argomento di Jaynes sulle invarianze, e il metodo dei minimi quadrati di Gauss). Sono facoltativi anche i riquadri intitolati «Approfondimento facoltativo», che contengono soprattutto le dimostrazioni di medie e varianze con gli integrali. Le formule delle medie e delle varianze sono richieste; le loro dimostrazioni con gli integrali no. Per codice, widget e fonti valgono le [indicazioni generali per lo studio](../index.md#esame).

Una parola sugli integrali, che compariranno in questa settimana. Il simbolo di integrale indicherà sempre un’area sotto una curva. Chi ha già seguito Analisi lo riconoscerà; chi non lo ha ancora fatto può leggerlo come il nome di quell’area. Nel percorso principale le aree da calcolare a mano sono rettangoli; tutte le altre si ottengono da una formula già pronta oppure si leggono in una tabella.

## Da dove ripartiamo {: #prima-di-cominciare }

Ripercorriamo in breve ciò che ci serve delle settimane passate.

Una variabile aleatoria discreta assume valori che si possono elencare. La sua distribuzione è descritta dalla **PMF**, la funzione di massa di probabilità $p_X(x)=P(X=x)$, che assegna un peso a ogni valore: i pesi non sono negativi e la loro somma è 1. Il **valore atteso** $\mathbb{E}[X]=\sum_x x\,p_X(x)$ è il baricentro di questi pesi, cioè il punto in cui l’asta su cui li appoggiamo starebbe in equilibrio ([Settimana 4](../settimana_04/index.md#baricentro)). La **varianza** $\operatorname{Var}(X)=\mathbb{E}[(X-\mu)^2]$ misura quanto i valori si allontanano da quel centro, e la sua radice quadrata, la deviazione standard $\sigma$, misura la stessa dispersione nelle unità della variabile ([Settimana 5](../settimana_05/index.md#varianza)).

Dalla Settimana 5 ci portiamo anche due distribuzioni. La **distribuzione geometrica** conta i tentativi fino al primo successo: la probabilità che non bastino $k$ tentativi è $P(X>k)=(1-p)^k$, e l’attesa non ha memoria, cioè i fallimenti già osservati non avvicinano il successo ([§5](../settimana_05/index.md#assenza-memoria)). La **distribuzione di Poisson** conta gli eventi che cadono in un intervallo, quando gli eventi sono indipendenti e arrivano con un ritmo medio costante. Se in media in un intervallo cadono $\lambda$ eventi, la probabilità di non vederne nessuno è

$$
P(X=0)=e^{-\lambda}
$$

([§12](../settimana_05/index.md#numero-e)). Ricordiamo anche che $\lambda$ dipende dalla lunghezza dell’intervallo: se in media arrivano 3 richieste al secondo, in $t$ secondi ne arrivano in media $3t$ ([§17](../settimana_05/index.md#tasso)). Useremo questi due fatti, insieme, per costruire la distribuzione esponenziale.

## Atto I — Una corda tracciata a caso {: #bertrand }

Nel 1889 il matematico francese **Joseph Bertrand** apre il suo trattato *Calcul des probabilités* con alcuni piccoli problemi che sembrano innocui. Uno di questi è diventato famoso:

> «Si traccia a caso una corda in un cerchio. Qual è la probabilità che sia più piccola del lato del triangolo equilatero inscritto?»
> — J. Bertrand, *Calcul des probabilités*, 1889, cap. I, § 5, p. 4 (tradotto dal francese)

Una corda è un segmento che unisce due punti della circonferenza. Il triangolo equilatero inscritto ha i tre vertici sulla circonferenza e i tre lati uguali. Noi, come fa lo stesso Bertrand nei conti, guardiamo il caso opposto: con quale probabilità la corda è **più lunga** del lato del triangolo?

La domanda sembra avere una sola risposta. Bertrand ne propone tre, ciascuna con un ragionamento pulito.

<figure markdown="0">
<svg viewBox="0 0 580 265" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Tre cerchi con il triangolo equilatero inscritto. Nel primo una corda parte da un vertice fissato e la zona favorevole è un angolo di 60 gradi su 180: probabilità un terzo. Nel secondo la corda è perpendicolare a un raggio e la zona favorevole è la metà del raggio vicina al centro: un mezzo. Nel terzo il punto medio cade nel cerchio di raggio metà: un quarto.">
<text x="290" y="18" text-anchor="middle" fill="currentColor" font-weight="bold">Tre modi di «scegliere una corda a caso»</text>
<circle cx="100" cy="120" r="70" fill="none" stroke="currentColor" stroke-width="2"/>
<polygon points="100,50 39.4,155 160.6,155" fill="none" stroke="currentColor" stroke-dasharray="4 3" opacity="0.6"/>
<text x="100" y="212" text-anchor="middle" fill="currentColor">1. due estremi a caso</text>
<text x="100" y="232" text-anchor="middle" fill="#e07a1f" font-weight="bold">corda lunga: 1/3</text>
<circle cx="290" cy="120" r="70" fill="none" stroke="currentColor" stroke-width="2"/>
<polygon points="290,50 229.4,155 350.6,155" fill="none" stroke="currentColor" stroke-dasharray="4 3" opacity="0.6"/>
<text x="290" y="212" text-anchor="middle" fill="currentColor">2. distanza dal centro a caso</text>
<text x="290" y="232" text-anchor="middle" fill="#e07a1f" font-weight="bold">corda lunga: 1/2</text>
<circle cx="480" cy="120" r="70" fill="none" stroke="currentColor" stroke-width="2"/>
<polygon points="480,50 419.4,155 540.6,155" fill="none" stroke="currentColor" stroke-dasharray="4 3" opacity="0.6"/>
<text x="480" y="212" text-anchor="middle" fill="currentColor">3. punto medio a caso</text>
<text x="480" y="232" text-anchor="middle" fill="#e07a1f" font-weight="bold">corda lunga: 1/4</text>
<path d="M100 50 L39.4 155 A70 70 0 0 0 160.6 155 Z" fill="#4051b5" opacity="0.25"/>
<line x1="100" y1="50" x2="87.8" y2="188.9" stroke="#4051b5" stroke-width="3"/>
<circle cx="100" cy="50" r="4" fill="currentColor"/>
<line x1="290" y1="120" x2="290" y2="190" stroke="currentColor" stroke-width="1.5"/>
<line x1="290" y1="120" x2="290" y2="155" stroke="#4051b5" stroke-width="6" opacity="0.5"/>
<line x1="223.2" y1="141" x2="356.8" y2="141" stroke="#4051b5" stroke-width="3"/>
<circle cx="290" cy="120" r="3" fill="currentColor"/>
<circle cx="480" cy="120" r="35.0" fill="#4051b5" opacity="0.25"/>
<line x1="534.7" y1="163.7" x2="453.3" y2="55.3" stroke="#4051b5" stroke-width="3"/>
<circle cx="494" cy="109.5" r="4" fill="#e07a1f"/>
<text x="290" y="252" text-anchor="middle" fill="currentColor">Stessa domanda, tre risposte: la parola «a caso» non dice quale misura usare.</text>
</svg>
<figcaption>Paradosso di Bertrand (1889): tre procedure ragionevoli per scegliere una corda «a caso» danno tre probabilità diverse che la corda superi il lato del triangolo.</figcaption>
</figure>

Il primo ragionamento sceglie a caso i due estremi della corda sulla circonferenza. Per la simmetria del cerchio non importa dove cade il primo estremo, quindi lo fissiamo e mettiamo lì un vertice del triangolo. Le direzioni in cui può partire la corda formano un angolo di 180 gradi, che i due lati del triangolo dividono in tre angoli uguali da 60 gradi. La corda è più lunga del lato solo se parte nell’angolo centrale: la probabilità è $1/3$.

Il secondo ragionamento sceglie a caso la distanza della corda dal centro. Anche qui la direzione non conta, per simmetria, e basta guardare un raggio: la corda è perpendicolare al raggio e lo taglia in un punto scelto a caso. Si può verificare che la corda è più lunga del lato quando quel punto cade nella metà del raggio più vicina al centro: la probabilità è $1/2$.

Il terzo ragionamento sceglie a caso il punto medio della corda, in un punto qualsiasi del disco. La corda è più lunga del lato quando il punto medio cade nel cerchio concentrico di raggio metà, che ha un quarto dell’area del disco: la probabilità è $1/4$.

Tre ragionamenti, tre numeri. Quale è giusto? La risposta di Bertrand è netta:

> «Tra queste tre risposte, qual è la vera? Nessuna delle tre è falsa, nessuna è esatta: la domanda è mal posta.»
> — J. Bertrand, *Calcul des probabilités*, 1889, p. 5 (tradotto dal francese)

I conti sono corretti tutti e tre. Il problema sta nelle parole «a caso». Con un dado, assegnare sei pesi uguali significa assumere che sia equilibrato. Con le corde, «a caso» può voler dire cose diverse: due estremi scelti indipendentemente e uniformemente sulla circonferenza, distanza uniforme dal centro, punto medio uniforme nel disco. Ciascuna di queste è una **procedura** diversa per produrre corde, e le tre procedure assegnano probabilità diverse allo stesso evento: «la corda è più lunga del lato del triangolo». Se le facciamo eseguire a un computer, come nella [Lettura A](#bertrand-esteso), le tre frequenze tornano: circa 0,333, 0,500 e 0,250.

La lezione riguarda **tutte le variabili aleatorie, discrete e continue**: conoscere i valori possibili non basta a determinarne la distribuzione. Qui, per esempio, possiamo chiamare $L$ la lunghezza della corda; i tre procedimenti assegnano a $L$ tre distribuzioni diverse. Nel continuo c’è una difficoltà ulteriore: una grandezza uniforme può smettere di esserlo dopo una trasformazione, anche biunivoca, come il passaggio da un numero positivo al suo quadrato. Su un insieme finito di $n$ esiti equiprobabili, invece, una rietichettatura biunivoca conserva i pesi $1/n$. Il problema generale è dunque giustificare la distribuzione scelta; la [Lettura B](#jaynes-invarianze) mostra come Jaynes usi le simmetrie per farlo. Nel prossimo atto studieremo come descrivere le distribuzioni continue del nostro percorso mediante una **densità di probabilità**.

## Atto II — Dal contare al misurare: la densità di probabilità {: #continuo }

### L’autobus delle due {: #autobus }

Partiamo da una situazione quotidiana, presa dal corso di Chris Piech a Stanford. Aspettiamo un autobus che deve passare dopo le 14:00, senza sapere con precisione quando. Chiamiamo $T$ il numero di minuti dopo le 14:00 in cui l’autobus arriva. Vogliamo sapere, per esempio, con quale probabilità l’autobus passa **tra le 14:15 e le 14:20**.

Con gli strumenti che già conosciamo possiamo fare così: dividiamo il tempo in intervalli di 5 minuti (dalle 14:00 alle 14:05, dalle 14:05 alle 14:10, e così via) e assegniamo una probabilità a ciascun intervallo, magari guardando che cosa è successo nei giorni passati. Otteniamo un istogramma, come nel primo grafico della figura qui sotto. La probabilità che ci interessa, $P(15<T\le20)$, è l’altezza di una sola barra, quella verde. In questo modo abbiamo di fatto trasformato il tempo in una variabile discreta, con sei valori possibili.

Che cosa succede se vogliamo più precisione? Possiamo dividere il tempo in intervalli di 2,5 minuti. Le barre diventano dodici, e la probabilità di arrivare tra le 14:15 e le 14:20 si ottiene sommando due barre:

$$
P(15<T\le20)=P(15<T\le17{,}5)+P(17{,}5<T\le20).
$$

Il tempo, però, scorre in modo continuo. Con intervalli di 5 minuti, o di 2,5, non sappiamo rispondere a domande come «con quale probabilità l’autobus passa tra le 14:12 e le 14:13?», oppure «tra le 14:12:00 e le 14:14:36?». Per rispondere dovremmo continuare a stringere gli intervalli: un minuto, un secondo, un millesimo di secondo, sempre più piccoli, come si fa in Analisi quando si costruisce un integrale. Al limite, con intervalli infinitamente piccoli, l’istogramma diventa una **curva**: è il terzo grafico della figura.

<figure markdown="0">
<svg viewBox="0 0 580 262" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Tre grafici dell’arrivo dell’autobus tra le 14:00 e le 14:30. Nel primo sei barre da 5 minuti; la barra tra 15 e 20 minuti, in verde, è la probabilità di arrivo in quell’intervallo. Nel secondo dodici barre da 2,5 minuti, alte circa la metà: la stessa probabilità è la somma di due barre verdi. Nel terzo una curva arancione, la densità, e l’area verde sotto la curva tra 15 e 20 minuti.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">L’arrivo dell’autobus dopo le 14:00, con una precisione sempre maggiore</text>
<rect x="20.0" y="119.9" width="26.7" height="70.1" fill="#4051b5" opacity="0.45" stroke="#4051b5" stroke-width="0.6"/>
<rect x="46.7" y="67.6" width="26.7" height="122.4" fill="#4051b5" opacity="0.45" stroke="#4051b5" stroke-width="0.6"/>
<rect x="73.3" y="92.4" width="26.7" height="97.6" fill="#4051b5" opacity="0.45" stroke="#4051b5" stroke-width="0.6"/>
<rect x="100.0" y="139.2" width="26.7" height="50.8" fill="#2e9e5b" opacity="0.75" stroke="#2e9e5b" stroke-width="0.6"/>
<rect x="126.7" y="175.0" width="26.7" height="15.0" fill="#4051b5" opacity="0.45" stroke="#4051b5" stroke-width="0.6"/>
<rect x="153.3" y="188.8" width="26.7" height="1.2" fill="#4051b5" opacity="0.45" stroke="#4051b5" stroke-width="0.6"/>
<text x="26.0" y="52.0" text-anchor="start" fill="currentColor" font-size="11">probabilità</text>
<line x1="20" y1="190" x2="20" y2="45" stroke="currentColor"/>
<line x1="20" y1="190" x2="180" y2="190" stroke="currentColor"/>
<line x1="20.0" y1="190" x2="20.0" y2="194" stroke="currentColor"/><text x="20.0" y="206" text-anchor="middle" fill="currentColor" font-size="10">14:00</text>
<line x1="100.0" y1="190" x2="100.0" y2="194" stroke="currentColor"/><text x="100.0" y="206" text-anchor="middle" fill="currentColor" font-size="10">15</text>
<line x1="126.7" y1="190" x2="126.7" y2="194" stroke="currentColor"/><text x="126.7" y="206" text-anchor="middle" fill="currentColor" font-size="10">20</text>
<line x1="180.0" y1="190" x2="180.0" y2="194" stroke="currentColor"/><text x="180.0" y="206" text-anchor="middle" fill="currentColor" font-size="10">30</text>
<text x="100.0" y="228.0" text-anchor="middle" fill="currentColor" font-size="12">intervalli di 5 minuti</text>
<rect x="210.0" y="169.1" width="13.3" height="20.9" fill="#4051b5" opacity="0.45" stroke="#4051b5" stroke-width="0.6"/>
<rect x="223.3" y="140.8" width="13.3" height="49.2" fill="#4051b5" opacity="0.45" stroke="#4051b5" stroke-width="0.6"/>
<rect x="236.7" y="128.9" width="13.3" height="61.1" fill="#4051b5" opacity="0.45" stroke="#4051b5" stroke-width="0.6"/>
<rect x="250.0" y="128.6" width="13.3" height="61.4" fill="#4051b5" opacity="0.45" stroke="#4051b5" stroke-width="0.6"/>
<rect x="263.3" y="135.7" width="13.3" height="54.3" fill="#4051b5" opacity="0.45" stroke="#4051b5" stroke-width="0.6"/>
<rect x="276.7" y="146.7" width="13.3" height="43.3" fill="#4051b5" opacity="0.45" stroke="#4051b5" stroke-width="0.6"/>
<rect x="290.0" y="158.9" width="13.3" height="31.1" fill="#2e9e5b" opacity="0.75" stroke="#2e9e5b" stroke-width="0.6"/>
<rect x="303.3" y="170.3" width="13.3" height="19.7" fill="#2e9e5b" opacity="0.75" stroke="#2e9e5b" stroke-width="0.6"/>
<rect x="316.7" y="179.4" width="13.3" height="10.6" fill="#4051b5" opacity="0.45" stroke="#4051b5" stroke-width="0.6"/>
<rect x="330.0" y="185.6" width="13.3" height="4.4" fill="#4051b5" opacity="0.45" stroke="#4051b5" stroke-width="0.6"/>
<rect x="343.3" y="188.9" width="13.3" height="1.1" fill="#4051b5" opacity="0.45" stroke="#4051b5" stroke-width="0.6"/>
<rect x="356.7" y="189.9" width="13.3" height="0.1" fill="#4051b5" opacity="0.45" stroke="#4051b5" stroke-width="0.6"/>
<text x="216.0" y="52.0" text-anchor="start" fill="currentColor" font-size="11">probabilità</text>
<line x1="210" y1="190" x2="210" y2="45" stroke="currentColor"/>
<line x1="210" y1="190" x2="370" y2="190" stroke="currentColor"/>
<line x1="210.0" y1="190" x2="210.0" y2="194" stroke="currentColor"/><text x="210.0" y="206" text-anchor="middle" fill="currentColor" font-size="10">14:00</text>
<line x1="290.0" y1="190" x2="290.0" y2="194" stroke="currentColor"/><text x="290.0" y="206" text-anchor="middle" fill="currentColor" font-size="10">15</text>
<line x1="316.7" y1="190" x2="316.7" y2="194" stroke="currentColor"/><text x="316.7" y="206" text-anchor="middle" fill="currentColor" font-size="10">20</text>
<line x1="370.0" y1="190" x2="370.0" y2="194" stroke="currentColor"/><text x="370.0" y="206" text-anchor="middle" fill="currentColor" font-size="10">30</text>
<text x="290.0" y="228.0" text-anchor="middle" fill="currentColor" font-size="12">intervalli di 2,5 minuti</text>
<polygon points="480.0,190 480.0,117.8 480.3,118.4 480.7,119.0 481.0,119.6 481.3,120.2 481.7,120.8 482.0,121.4 482.3,122.0 482.7,122.6 483.0,123.2 483.3,123.8 483.7,124.4 484.0,125.0 484.3,125.6 484.7,126.2 485.0,126.8 485.3,127.4 485.7,128.0 486.0,128.6 486.3,129.1 486.7,129.7 487.0,130.3 487.3,130.9 487.7,131.5 488.0,132.1 488.3,132.7 488.7,133.3 489.0,133.8 489.3,134.4 489.7,135.0 490.0,135.6 490.3,136.1 490.7,136.7 491.0,137.3 491.3,137.9 491.7,138.4 492.0,139.0 492.3,139.6 492.7,140.1 493.0,140.7 493.3,141.2 493.7,141.8 494.0,142.3 494.3,142.9 494.7,143.5 495.0,144.0 495.3,144.5 495.7,145.1 496.0,145.6 496.3,146.2 496.7,146.7 497.0,147.2 497.3,147.8 497.7,148.3 498.0,148.8 498.3,149.3 498.7,149.9 499.0,150.4 499.3,150.9 499.7,151.4 500.0,151.9 500.3,152.4 500.7,152.9 501.0,153.4 501.3,153.9 501.7,154.4 502.0,154.9 502.3,155.4 502.7,155.9 503.0,156.4 503.3,156.8 503.7,157.3 504.0,157.8 504.3,158.3 504.7,158.7 505.0,159.2 505.3,159.7 505.7,160.1 506.0,160.6 506.3,161.0 506.7,161.5 506.7,190" fill="#2e9e5b" opacity="0.55"/>
<polyline points="400.0,190.0 401.0,182.9 402.0,176.1 403.0,169.5 404.0,163.2 405.0,157.2 406.0,151.4 407.0,145.8 408.0,140.5 409.0,135.4 410.0,130.5 411.0,125.8 412.0,121.4 413.0,117.2 414.0,113.2 415.0,109.4 416.0,105.8 417.0,102.3 418.0,99.1 419.0,96.1 420.0,93.2 421.0,90.6 422.0,88.1 423.0,85.7 424.0,83.6 425.0,81.5 426.0,79.7 427.0,78.0 428.0,76.4 429.0,75.0 430.0,73.8 431.0,72.7 432.0,71.7 433.0,70.8 434.0,70.1 435.0,69.5 436.0,69.0 437.0,68.6 438.0,68.3 439.0,68.2 440.0,68.1 441.0,68.2 442.0,68.3 443.0,68.6 444.0,68.9 445.0,69.3 446.0,69.8 447.0,70.4 448.0,71.1 449.0,71.8 450.0,72.7 451.0,73.5 452.0,74.5 453.0,75.5 454.0,76.6 455.0,77.7 456.0,78.9 457.0,80.2 458.0,81.5 459.0,82.8 460.0,84.2 461.0,85.6 462.0,87.1 463.0,88.6 464.0,90.2 465.0,91.7 466.0,93.3 467.0,95.0 468.0,96.6 469.0,98.3 470.0,100.0 471.0,101.7 472.0,103.5 473.0,105.2 474.0,107.0 475.0,108.8 476.0,110.6 477.0,112.4 478.0,114.2 479.0,116.0 480.0,117.8 481.0,119.6 482.0,121.4 483.0,123.2 484.0,125.0 485.0,126.8 486.0,128.6 487.0,130.3 488.0,132.1 489.0,133.8 490.0,135.6 491.0,137.3 492.0,139.0 493.0,140.7 494.0,142.3 495.0,144.0 496.0,145.6 497.0,147.2 498.0,148.8 499.0,150.4 500.0,151.9 501.0,153.4 502.0,154.9 503.0,156.4 504.0,157.8 505.0,159.2 506.0,160.6 507.0,161.9 508.0,163.2 509.0,164.5 510.0,165.8 511.0,167.0 512.0,168.2 513.0,169.3 514.0,170.4 515.0,171.5 516.0,172.6 517.0,173.6 518.0,174.6 519.0,175.5 520.0,176.5 521.0,177.3 522.0,178.2 523.0,179.0 524.0,179.8 525.0,180.6 526.0,181.3 527.0,182.0 528.0,182.6 529.0,183.2 530.0,183.8 531.0,184.4 532.0,184.9 533.0,185.4 534.0,185.8 535.0,186.3 536.0,186.7 537.0,187.1 538.0,187.4 539.0,187.7 540.0,188.0 541.0,188.3 542.0,188.5 543.0,188.8 544.0,189.0 545.0,189.1 546.0,189.3 547.0,189.4 548.0,189.5 549.0,189.7 550.0,189.7 551.0,189.8 552.0,189.9 553.0,189.9 554.0,189.9 555.0,190.0 556.0,190.0 557.0,190.0 558.0,190.0 559.0,190.0 560.0,190.0" fill="none" stroke="#e07a1f" stroke-width="2.5"/>
<text x="406.0" y="52.0" text-anchor="start" fill="currentColor" font-size="11">densità f(t)</text>
<line x1="400" y1="190" x2="400" y2="45" stroke="currentColor"/>
<line x1="400" y1="190" x2="560" y2="190" stroke="currentColor"/>
<line x1="400.0" y1="190" x2="400.0" y2="194" stroke="currentColor"/><text x="400.0" y="206" text-anchor="middle" fill="currentColor" font-size="10">14:00</text>
<line x1="480.0" y1="190" x2="480.0" y2="194" stroke="currentColor"/><text x="480.0" y="206" text-anchor="middle" fill="currentColor" font-size="10">15</text>
<line x1="506.7" y1="190" x2="506.7" y2="194" stroke="currentColor"/><text x="506.7" y="206" text-anchor="middle" fill="currentColor" font-size="10">20</text>
<line x1="560.0" y1="190" x2="560.0" y2="194" stroke="currentColor"/><text x="560.0" y="206" text-anchor="middle" fill="currentColor" font-size="10">30</text>
<text x="480.0" y="228.0" text-anchor="middle" fill="currentColor" font-size="12">intervalli infinitesimi</text>
<text x="110.0" y="248.0" text-anchor="middle" fill="#2e9e5b" font-size="12">P(15 &lt; T ≤ 20): una barra</text>
<text x="300.0" y="248.0" text-anchor="middle" fill="#2e9e5b" font-size="12">la somma di due barre</text>
<text x="490.0" y="248.0" text-anchor="middle" fill="#2e9e5b" font-size="12">un’area sotto la curva</text>
</svg>
<figcaption>Dall’istogramma alla densità. Con intervalli sempre più piccoli le barre si moltiplicano e si abbassano; al limite resta una curva, e la probabilità di arrivare tra le 14:15 e le 14:20 diventa l’area verde sotto di essa.</figcaption>
</figure>

Guardiamo bene che cosa succede alle barre mentre le stringiamo. Ogni barra contiene meno probabilità di prima: dimezzando la larghezza, la probabilità di ciascuna barra all’incirca si dimezza. Se continuassimo così, tutte le barre si schiaccerebbero verso lo zero, e il disegno sparirebbe. C’è però un modo semplice per non perderlo: come altezza della barra non usiamo la sua probabilità, ma la sua probabilità **divisa per la sua larghezza**,

$$
\text{altezza della barra}=\frac{\text{probabilità della barra}}{\text{larghezza della barra}}.
$$

È una «probabilità per minuto», così come la densità di popolazione di una regione è un numero di abitanti per chilometro quadrato. Se dimezziamo la larghezza, la probabilità si dimezza anch’essa e il rapporto resta più o meno lo stesso: le barre non si abbassano più. La figura seguente mostra tre istogrammi disegnati in questo modo, con barre da 5 minuti, da 2,5 minuti e da un minuto: i loro gradini quasi coincidono e si avvicinano tutti alla stessa curva.

<figure markdown="0">
<svg viewBox="0 0 580 262" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Tre istogrammi sovrapposti dell’arrivo dell’autobus, con barre da 5, 2,5 e 1 minuto. L’altezza di ogni barra è la sua probabilità divisa per la larghezza, cioè una probabilità per minuto. I tre profili a gradini quasi coincidono e si avvicinano alla curva arancione della densità, il cui massimo vale circa 0,07.">
<text x="290.0" y="20.0" text-anchor="middle" fill="currentColor" font-weight="bold">Altezza della barra = probabilità della barra ÷ larghezza</text>
<polyline points="70.0,200 70.0,121.5 148.3,121.5 148.3,62.9 226.7,62.9 226.7,90.6 305.0,90.6 305.0,143.1 383.3,143.1 383.3,183.2 461.7,183.2 461.7,198.7 540.0,198.7 540.0,200" fill="#4051b5" fill-opacity="0.11" stroke="#4051b5" stroke-opacity="0.52" stroke-width="1.2"/>
<polyline points="70.0,200 70.0,153.1 109.2,153.1 109.2,89.9 148.3,89.9 148.3,63.2 187.5,63.2 187.5,62.5 226.7,62.5 226.7,78.3 265.8,78.3 265.8,103.0 305.0,103.0 305.0,130.4 344.2,130.4 344.2,155.8 383.3,155.8 383.3,176.3 422.5,176.3 422.5,190.2 461.7,190.2 461.7,197.5 500.8,197.5 500.8,199.8 540.0,199.8 540.0,200" fill="#4051b5" fill-opacity="0.15" stroke="#4051b5" stroke-opacity="0.60" stroke-width="1.2"/>
<polyline points="70.0,200 70.0,179.2 85.7,179.2 85.7,143.2 101.3,143.2 101.3,114.7 117.0,114.7 117.0,93.0 132.7,93.0 132.7,77.4 148.3,77.4 148.3,67.0 164.0,67.0 164.0,61.3 179.7,61.3 179.7,59.5 195.3,59.5 195.3,61.1 211.0,61.1 211.0,65.4 226.7,65.4 226.7,71.9 242.3,71.9 242.3,80.2 258.0,80.2 258.0,89.8 273.7,89.8 273.7,100.2 289.3,100.2 289.3,111.1 305.0,111.1 305.0,122.2 320.7,122.2 320.7,133.2 336.3,133.2 336.3,143.7 352.0,143.7 352.0,153.7 367.7,153.7 367.7,162.8 383.3,162.8 383.3,171.0 399.0,171.0 399.0,178.2 414.7,178.2 414.7,184.3 430.3,184.3 430.3,189.3 446.0,189.3 446.0,193.2 461.7,193.2 461.7,196.1 477.3,196.1 477.3,198.1 493.0,198.1 493.0,199.3 508.7,199.3 508.7,199.8 524.3,199.8 524.3,200.0 540.0,200.0 540.0,200" fill="#4051b5" fill-opacity="0.20" stroke="#4051b5" stroke-opacity="0.70" stroke-width="1.2"/>
<polyline points="70.0,200.0 72.9,191.8 75.9,184.0 78.8,176.4 81.8,169.1 84.7,162.1 87.6,155.4 90.6,149.0 93.5,142.8 96.4,137.0 99.4,131.3 102.3,126.0 105.2,120.9 108.2,116.0 111.1,111.4 114.1,107.0 117.0,102.8 119.9,98.9 122.9,95.1 125.8,91.6 128.8,88.3 131.7,85.3 134.6,82.4 137.6,79.7 140.5,77.2 143.4,74.9 146.4,72.7 149.3,70.8 152.2,69.0 155.2,67.4 158.1,65.9 161.1,64.6 164.0,63.5 166.9,62.5 169.9,61.6 172.8,60.9 175.8,60.4 178.7,59.9 181.6,59.6 184.6,59.4 187.5,59.4 190.4,59.4 193.4,59.6 196.3,59.9 199.2,60.3 202.2,60.8 205.1,61.3 208.1,62.0 211.0,62.8 213.9,63.7 216.9,64.6 219.8,65.6 222.8,66.7 225.7,67.9 228.6,69.2 231.6,70.5 234.5,71.8 237.4,73.3 240.4,74.8 243.3,76.3 246.2,77.9 249.2,79.6 252.1,81.3 255.1,83.0 258.0,84.8 260.9,86.6 263.9,88.5 266.8,90.4 269.8,92.3 272.7,94.2 275.6,96.2 278.6,98.2 281.5,100.2 284.4,102.2 287.4,104.2 290.3,106.3 293.2,108.4 296.2,110.4 299.1,112.5 302.1,114.6 305.0,116.7 307.9,118.7 310.9,120.8 313.8,122.9 316.8,125.0 319.7,127.0 322.6,129.1 325.6,131.1 328.5,133.2 331.4,135.2 334.4,137.2 337.3,139.2 340.2,141.1 343.2,143.1 346.1,145.0 349.1,146.9 352.0,148.8 354.9,150.7 357.9,152.5 360.8,154.3 363.8,156.1 366.7,157.8 369.6,159.5 372.6,161.2 375.5,162.8 378.4,164.5 381.4,166.0 384.3,167.6 387.2,169.1 390.2,170.6 393.1,172.0 396.1,173.4 399.0,174.8 401.9,176.1 404.9,177.4 407.8,178.7 410.8,179.9 413.7,181.1 416.6,182.2 419.6,183.3 422.5,184.4 425.4,185.4 428.4,186.4 431.3,187.3 434.2,188.2 437.2,189.1 440.1,189.9 443.1,190.7 446.0,191.5 448.9,192.2 451.9,192.9 454.8,193.5 457.8,194.1 460.7,194.7 463.6,195.2 466.6,195.7 469.5,196.2 472.4,196.6 475.4,197.0 478.3,197.4 481.2,197.7 484.2,198.0 487.1,198.3 490.1,198.6 493.0,198.8 495.9,199.0 498.9,199.2 501.8,199.3 504.8,199.5 507.7,199.6 510.6,199.7 513.6,199.8 516.5,199.8 519.4,199.9 522.4,199.9 525.3,200.0 528.2,200.0 531.2,200.0 534.1,200.0 537.1,200.0 540.0,200.0" fill="none" stroke="#e07a1f" stroke-width="3"/>
<line x1="70" y1="200" x2="70" y2="40" stroke="currentColor"/>
<line x1="70" y1="200" x2="540" y2="200" stroke="currentColor"/>
<line x1="70.0" y1="200" x2="70.0" y2="204" stroke="currentColor"/><text x="70.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">14:00</text>
<line x1="148.3" y1="200" x2="148.3" y2="204" stroke="currentColor"/><text x="148.3" y="216" text-anchor="middle" fill="currentColor" font-size="11">5</text>
<line x1="226.7" y1="200" x2="226.7" y2="204" stroke="currentColor"/><text x="226.7" y="216" text-anchor="middle" fill="currentColor" font-size="11">10</text>
<line x1="305.0" y1="200" x2="305.0" y2="204" stroke="currentColor"/><text x="305.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">15</text>
<line x1="383.3" y1="200" x2="383.3" y2="204" stroke="currentColor"/><text x="383.3" y="216" text-anchor="middle" fill="currentColor" font-size="11">20</text>
<line x1="461.7" y1="200" x2="461.7" y2="204" stroke="currentColor"/><text x="461.7" y="216" text-anchor="middle" fill="currentColor" font-size="11">25</text>
<line x1="540.0" y1="200" x2="540.0" y2="204" stroke="currentColor"/><text x="540.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">30</text>
<line x1="66" y1="160.0" x2="70" y2="160.0" stroke="currentColor"/><text x="62.0" y="164.0" text-anchor="end" fill="currentColor" font-size="11">0,02</text>
<line x1="66" y1="120.0" x2="70" y2="120.0" stroke="currentColor"/><text x="62.0" y="124.0" text-anchor="end" fill="currentColor" font-size="11">0,04</text>
<line x1="66" y1="80.0" x2="70" y2="80.0" stroke="currentColor"/><text x="62.0" y="84.0" text-anchor="end" fill="currentColor" font-size="11">0,06</text>
<text x="76.0" y="44.0" text-anchor="start" fill="currentColor" font-size="11">probabilità per minuto</text>
<text x="540.0" y="232.0" text-anchor="end" fill="currentColor" font-size="11">minuti dopo le 14:00</text>
<text x="336.3" y="80.0" text-anchor="start" fill="#e07a1f" font-weight="bold">la densità f(t)</text>
<text x="290.0" y="252.0" text-anchor="middle" fill="currentColor" font-size="12">Con le barre sempre più strette, i gradini si avvicinano alla curva.</text>
</svg>
<figcaption>Se l’altezza di una barra è «probabilità per minuto», gli istogrammi con barre di larghezza diversa si possono confrontare: non si abbassano più, e i loro gradini si avvicinano alla curva della densità.</figcaption>
</figure>

Quella curva si chiama **funzione di densità di probabilità**, o più brevemente **densità**, e si indica con la lettera minuscola $f$; in inglese è la *probability density function*, abbreviata in PDF. Quando vogliamo ricordare a quale variabile si riferisce, scriviamo $f_T(t)$. La lettera minuscola non è un dettaglio: segnala un **cambio di concetto**. La PMF di una variabile discreta restituiva una probabilità: $p_X(3)$ era la probabilità che $X$ valesse 3. La densità no. Il valore $f(t)$ non è la probabilità che l’autobus arrivi esattamente al minuto $t$: è una probabilità **per unità di tempo**, che dice quanto rapidamente si accumula la probabilità nei dintorni di $t$. Chi conosce le derivate può dirlo così: la densità è la derivata della probabilità. Per un intervallo piccolo di larghezza $\Delta t$ (si legge «delta t») vicino a $t$ vale l’approssimazione

$$
P(t<T<t+\Delta t)\approx f(t)\cdot\Delta t,
$$

che è proprio la formula della barra letta al contrario: probabilità uguale ad altezza per larghezza.

### Un istante esatto ha probabilità zero {: #punto-zero }

Proviamo ora a chiederci la probabilità che l’autobus arrivi **esattamente** alle 14:18:30, cioè al trentesimo secondo del diciottesimo minuto. Prima di rispondere dobbiamo chiarire che cosa intendiamo. Se intendiamo «durante quel secondo», cioè dall’istante in cui comincia il secondo fino a quello in cui finisce, stiamo parlando di un intervallo lungo un secondo, e la sua probabilità è piccola ma non nulla. Con la densità della figura, che alle 14:18:30 vale circa 0,023 per minuto, e con un secondo pari a $1/60$ di minuto, otteniamo

$$
P(\text{l’autobus arriva in quel secondo})\approx0{,}023\cdot\frac1{60}\approx0{,}0004.
$$

Se invece intendiamo il preciso istante in cui «scatta» quel secondo, dobbiamo dire con quale precisione lo misuriamo. Con un millisecondo l’intervallo diventa mille volte più corto, e la probabilità scende a circa $0{,}0000004$. Con un milionesimo di secondo scende ancora di mille volte, con un femtosecondo, un milionesimo di miliardesimo di secondo, ancora di più. Un istante **esatto** ha una precisione infinita: la sua probabilità è più piccola di qualunque numero positivo, e quindi è zero. Lo stesso vale per qualunque istante e per qualunque variabile continua:

$$
P(T=t)=0\qquad\text{per ogni valore } t.
$$

Questo non vuol dire che l’autobus non arrivi mai: a un certo istante arriva di sicuro. Vuol dire che, quando i valori possibili formano un continuo, la probabilità non sta nei singoli punti ma negli intervalli. Per questo una PMF, che assegna un peso a ogni valore, per una variabile continua non ha senso: varrebbe zero dappertutto.

Da qui in avanti, quindi, quando parleremo di probabilità di una variabile continua ci riferiremo sempre a eventi in cui la variabile cade **in un intervallo**. Gli intervalli potranno essere più o meno piccoli, ma saranno sempre intervalli.

### La probabilità è un’area {: #area }

Se la densità è una probabilità per unità di misura, la probabilità di un intervallo si ottiene come per le barre dell’istogramma: altezza per larghezza, cioè un’area. Quando le barre diventano infinitamente sottili, la somma delle loro aree tra due valori $a$ e $b$ diventa l’**area sotto la curva** della densità tra $a$ e $b$. In matematica quest’area si scrive con il simbolo di integrale:

$$
P(a<X<b)=\int_a^b f(x)\,dx=\text{area sotto } f \text{ tra } a \text{ e } b.
$$

Il simbolo $\int_a^b f(x)\,dx$ si legge «integrale da $a$ a $b$ di $f(x)$ in $dx$». La $\int$ è una S allungata, la S di «somma», e ricorda le barre sottilissime che stiamo sommando; il $dx$ ricorda la loro larghezza. Nella figura dell’autobus, $P(15<T\le20)$ è l’area verde del terzo grafico, e vale circa 0,14.

Una conseguenza immediata riguarda i bordi dell’intervallo. Con le variabili discrete bisognava fare attenzione a scrivere «minore» oppure «minore o uguale»: $P(X\le3)$ e $P(X<3)$ differivano di $P(X=3)$. Con le variabili continue la differenza è proprio $P(X=3)$, che vale zero. Quindi

$$
P(a<X<b)=P(a\le X<b)=P(a<X\le b)=P(a\le X\le b),
$$

e ha poco senso discutere se nella formula vada il «minore» o il «minore o uguale»: un punto non ha area.

Quali funzioni possono fare da densità? Ricordiamo gli assiomi della probabilità. Per una variabile discreta i pesi non dovevano essere negativi e la loro somma doveva essere 1. Per una variabile continua le richieste diventano due. La densità non è mai negativa, $f(x)\ge0$ per ogni $x$, perché un’area negativa darebbe una probabilità negativa. E l’area totale sotto la curva vale 1, perché la variabile deve pur cadere da qualche parte:

$$
\int_{-\infty}^{+\infty}f(x)\,dx=1.
$$

Gli estremi $-\infty$ e $+\infty$ vogliono dire «su tutta la retta». Per l’autobus la densità vale zero prima delle 14:00 e dopo le 14:30, quindi l’area totale coincide con l’area tra 0 e 30. Vedremo però variabili continue che possono assumere valori grandi a piacere, con probabilità sempre più piccole ma mai nulle: anche per loro l’area totale, estesa all’infinito, vale 1. Da queste due richieste segue che l’area tra due valori qualsiasi è sempre compresa tra 0 e 1, come deve essere per una probabilità.

Una conseguenza meno ovvia: **la densità può valere più di 1**. Supponiamo che un tempo cada senza preferenze tra 0 e mezzo minuto. La densità è allora costante su un intervallo largo 0,5, e la sua area, base per altezza, deve essere 1: l’altezza è quindi 2. Non c’è nessuna contraddizione, perché 2 non è una probabilità. Vuol dire soltanto che la probabilità è concentrata in un intervallo corto: un intervallo di un centesimo di minuto ha probabilità $2\cdot0{,}01=0{,}02$, un numero perfettamente ragionevole.

Anche se i valori della densità non sono probabilità, guardare la sua forma è utile. Dove la densità è alta, un intervallo di una certa larghezza contiene molta probabilità; dove è bassa, un intervallo della stessa larghezza ne contiene poca. Per l’autobus, la densità è alta tra le 14:05 e le 14:10 e quasi nulla dopo le 14:25: un intervallo di un minuto attorno alle 14:07 è molto più probabile di un intervallo di un minuto attorno alle 14:27.

!!! example "Sosta di verifica"
    Una variabile continua $X$ ha una densità che nel punto 2 vale $f(2)=3$. È un errore, visto che una probabilità non può superare 1? Quanto vale $P(X=2)$? E quanto vale, all’incirca, $P(2<X<2{,}01)$?

    ??? esempio-svolto "Risposta"
        Non è un errore: $f(2)=3$ non è una probabilità, ma una probabilità per unità di misura. Vuol dire che vicino a 2 la probabilità è molto concentrata. La probabilità di un singolo punto è zero, quindi $P(X=2)=0$. Per l’intervallo stretto usiamo l’approssimazione «altezza per larghezza»: $P(2<X<2{,}01)\approx3\cdot0{,}01=0{,}03$.

### Dal discreto al continuo: le stesse idee, con l’integrale al posto della somma {: #discreto-continuo }

Le idee che abbiamo costruito per le variabili discrete passano quasi tutte al caso continuo con una sola sostituzione: la PMF $p(x)$ diventa la densità $f(x)$, e la somma sui valori diventa l’integrale, cioè l’area. La tabella riassume la corrispondenza.

| | Variabile discreta | Variabile continua |
|---|---|---|
| Che cosa descrive la distribuzione | la PMF $p(x)=P(X=x)$ | la densità $f(x)$ |
| Probabilità di un insieme di valori | somma dei pesi $p(x)$ | area sotto $f$ |
| Condizione di normalizzazione | $\sum_x p(x)=1$ | $\int_{-\infty}^{+\infty}f(x)\,dx=1$ |
| Valore atteso | $\mathbb{E}[X]=\sum_x x\,p(x)$ | $\mathbb{E}[X]=\int_{-\infty}^{+\infty}x\,f(x)\,dx$ |
| Varianza | $\mathbb{E}[(X-\mu)^2]=\sum_x(x-\mu)^2p(x)$ | $\mathbb{E}[(X-\mu)^2]=\int_{-\infty}^{+\infty}(x-\mu)^2f(x)\,dx$ |

Il valore atteso conserva il suo significato di baricentro. Immaginiamo di ritagliare da una tavola di legno la regione sotto la curva della densità: il valore atteso è il punto in cui la sagoma starebbe in equilibrio su un fulcro. Anche la varianza e la deviazione standard conservano il loro significato di dispersione attorno al centro, e le loro proprietà restano le stesse: per esempio, la linearità del valore atteso e la regola $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$ valgono anche nel continuo. Per le distribuzioni di questa settimana non dovrai calcolare questi integrali: media e varianza le troverai già pronte, e le loro dimostrazioni sono negli approfondimenti facoltativi.

## Atto III — La densità più semplice: la distribuzione uniforme {: #uniforme }

Torniamo all’autobus, ma questa volta supponiamo di non sapere proprio nulla sul momento in cui passerà, se non che passerà tra le 14:00 e le 14:30. Nessun istante di quella mezz’ora è privilegiato rispetto agli altri. Come deve essere la densità?

Se nessun istante è privilegiato, la densità deve avere la stessa altezza in tutti i punti dell’intervallo, e zero fuori: il suo grafico è un **rettangolo**. Quanto deve essere alto? L’area totale deve essere 1, e l’area di un rettangolo è base per altezza. La base è lunga 30 minuti, quindi l’altezza è $1/30$.

In generale, una variabile aleatoria continua che assume valori tra un limite inferiore $a$ e un limite superiore $b$, senza preferenze per nessuna zona dell’intervallo, ha **distribuzione uniforme** su $[a,b]$. Scriviamo $X\sim\operatorname{Uni}(a,b)$, e la sua densità è

$$
f(x)=\frac{1}{b-a}\quad\text{per } a\le x\le b,\qquad f(x)=0\ \text{altrove}.
$$

L’altezza $1/(b-a)$ è il valore della densità in tutti i punti dell’intervallo. Come ogni valore di una densità, **non è una probabilità**: è l’altezza che rende l’area totale uguale a 1.

Le probabilità sono aree di rettangoli più piccoli. Per un intervallo $[c,d]$ contenuto in $[a,b]$ la base è $d-c$ e l’altezza è $1/(b-a)$, quindi

$$
P(c\le X\le d)=(d-c)\cdot\frac{1}{b-a}=\frac{d-c}{b-a}.
$$

La probabilità è la lunghezza dell’intervallo divisa per la lunghezza totale, e **non dipende da dove l’intervallo si trova**: due intervalli della stessa lunghezza hanno la stessa probabilità. È la traduzione precisa dell’idea «nessuna zona è privilegiata», e viene chiamata proprietà uniforme. Si noti anche che l’intervallo $[a,b]$ deve avere lunghezza finita: non esiste una distribuzione uniforme su tutta la retta, perché un rettangolo di base infinita non può avere area 1. Non si può scegliere «uniformemente a caso» un numero reale qualsiasi.

Per l’autobus, $T\sim\operatorname{Uni}(0,30)$. La probabilità che passi tra le 14:15 e le 14:20 è l’area del rettangolo verde nella figura. Scritta con l’integrale, come area sotto la densità, il conto è questo:

$$
P(15<T<20)=\int_{15}^{20}\frac{1}{30}\,dx=\left[\frac{x}{30}\right]_{15}^{20}=\frac{20}{30}-\frac{15}{30}=\frac{5}{30}=\frac16.
$$

Chi non ha dimestichezza con gli integrali può ignorare la scrittura con le parentesi quadre: il risultato è base per altezza, $5\cdot\frac1{30}$, l’area di un rettangolo.

<figure markdown="0">
<svg viewBox="0 0 580 240" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Densità uniforme dell’arrivo dell’autobus: un rettangolo arancione alto un trentesimo tra 0 e 30 minuti, nullo fuori. La parte tra 15 e 20 minuti, in verde, è un rettangolo di base 5 e altezza un trentesimo: la sua area, un sesto, è la probabilità che l’autobus passi tra le 14:15 e le 14:20.">
<text x="290.0" y="20.0" text-anchor="middle" fill="currentColor" font-weight="bold">T ∼ Uni(0, 30): l’autobus passa in un istante qualsiasi tra le 14:00 e le 14:30</text>
<rect x="300.0" y="70" width="66.7" height="110" fill="#2e9e5b" opacity="0.5"/>
<polyline points="60.0,180 100.0,180 100.0,70 500.0,70 500.0,180 540.0,180" fill="none" stroke="#e07a1f" stroke-width="3"/>
<line x1="60" y1="180" x2="540" y2="180" stroke="currentColor"/>
<line x1="100.0" y1="180" x2="100.0" y2="184" stroke="currentColor"/><text x="100.0" y="196" text-anchor="middle" fill="currentColor" font-size="11">14:00</text>
<line x1="233.3" y1="180" x2="233.3" y2="184" stroke="currentColor"/><text x="233.3" y="196" text-anchor="middle" fill="currentColor" font-size="11">10</text>
<line x1="300.0" y1="180" x2="300.0" y2="184" stroke="currentColor"/><text x="300.0" y="196" text-anchor="middle" fill="currentColor" font-size="11">15</text>
<line x1="366.7" y1="180" x2="366.7" y2="184" stroke="currentColor"/><text x="366.7" y="196" text-anchor="middle" fill="currentColor" font-size="11">20</text>
<line x1="500.0" y1="180" x2="500.0" y2="184" stroke="currentColor"/><text x="500.0" y="196" text-anchor="middle" fill="currentColor" font-size="11">30</text>
<line x1="100.0" y1="180" x2="100.0" y2="45" stroke="currentColor"/>
<text x="92.0" y="74.0" text-anchor="end" fill="currentColor" font-size="12">1/30</text>
<text x="106.0" y="50.0" text-anchor="start" fill="currentColor" font-size="11">densità f(t)</text>
<text x="333.3" y="119.0" text-anchor="#2e9e5b" fill="currentColor" font-weight="bold">area</text>
<text x="333.3" y="137.0" text-anchor="#2e9e5b" fill="currentColor" font-size="12">5 · 1/30</text>
<text x="290.0" y="225.0" text-anchor="#2e9e5b" fill="currentColor" font-weight="bold">P(15 &lt; T &lt; 20) = base × altezza = 5 × 1/30 = 1/6</text>
</svg>
<figcaption>La densità uniforme è un rettangolo. Ogni probabilità è l’area di un rettangolo più piccolo, e dipende solo dalla lunghezza dell’intervallo: qualunque finestra di 5 minuti ha probabilità 5/30.</figcaption>
</figure>

La probabilità sarebbe cambiata se ci fossimo chiesti dell’intervallo tra le 14:10 e le 14:15? No: anche quell’intervallo è lungo 5 minuti, e con la distribuzione uniforme ogni finestra di 5 minuti ha probabilità $5/30$. Attenzione però a un dettaglio. Queste probabilità sono valutate alle 14:00, prima di sapere qualunque cosa. Se arriviamo alla fermata alle 14:15 e qualcuno ci dice che l’autobus non è ancora passato, abbiamo un’informazione nuova, e la probabilità che passi nei prossimi 5 minuti cambia: è una probabilità condizionata, e la calcoleremo quando parleremo di memoria, alla fine dell’Atto V.

Il **valore atteso** della distribuzione uniforme è il centro dell’intervallo. Lo si capisce senza conti: una lastra rettangolare omogenea sta in equilibrio sul suo punto di mezzo. La **varianza** si ricava con un integrale, ed è proporzionale al quadrato della lunghezza dell’intervallo:

$$
\mathbb{E}[X]=\frac{a+b}{2},\qquad \operatorname{Var}(X)=\frac{(b-a)^2}{12},\qquad \sigma=\frac{b-a}{\sqrt{12}}.
$$

Per l’autobus uniforme, l’attesa media è di 15 minuti dopo le 14:00, e la deviazione standard è $30/\sqrt{12}\approx8{,}7$ minuti. Che la varianza dipenda dal quadrato della lunghezza non deve sorprendere: la varianza si misura in unità al quadrato, minuti al quadrato in questo caso, mentre la deviazione standard torna nelle unità della variabile.

??? note "Approfondimento facoltativo — Media e varianza della distribuzione uniforme, con gli integrali"
    Questo riquadro non fa parte del programma: mostra da dove vengono le due formule, usando le definizioni della tabella dell’Atto II.

    Conviene partire dalla **uniforme standard**, cioè la distribuzione uniforme su $[0,1]$, che ha densità $f(y)=1$ tra 0 e 1. Per una variabile $Y\sim\operatorname{Uni}(0,1)$:

    $$
    \mathbb{E}[Y]=\int_0^1 y\cdot1\,dy=\left[\frac{y^2}{2}\right]_0^1=\frac12,
    \qquad
    \mathbb{E}[Y^2]=\int_0^1 y^2\,dy=\left[\frac{y^3}{3}\right]_0^1=\frac13.
    $$

    Con la formula «media dei quadrati meno quadrato della media» (la trovi nella [Lettura C della Settimana 5](../settimana_05/index.md#formula-varianza)) otteniamo

    $$
    \operatorname{Var}(Y)=\mathbb{E}[Y^2]-\big(\mathbb{E}[Y]\big)^2=\frac13-\frac14=\frac1{12}.
    $$

    Ora passiamo a un intervallo qualsiasi. Se $Y$ è uniforme su $[0,1]$, la variabile $X=a+(b-a)Y$ è uniforme su $[a,b]$: quando $Y$ percorre $[0,1]$, $X$ percorre $[a,b]$. La trasformazione moltiplica ogni lunghezza per $b-a$ (un intervallo di lunghezza $\ell$ diventa uno di lunghezza $(b-a)\ell$), quindi due intervalli di uguale lunghezza presi da $Y$ restano di uguale lunghezza tra loro dopo la trasformazione: la probabilità continua a dipendere solo dalla lunghezza, e $X$ è uniforme. Per la linearità del valore atteso e per la regola $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$:

    $$
    \mathbb{E}[X]=a+(b-a)\cdot\frac12=\frac{a+b}{2},
    \qquad
    \operatorname{Var}(X)=(b-a)^2\cdot\frac1{12}=\frac{(b-a)^2}{12}.
    $$

    Il numero 12, che sembra piovuto dal cielo, viene dunque da $\frac13-\frac14$.

La distribuzione uniforme ha un ruolo speciale per chi programma. Quasi tutti i linguaggi hanno una funzione che genera numeri pseudocasuali uniformi tra 0 e 1: in Python è `random.random()`. A partire da quel numero si costruiscono tutte le altre variabili aleatorie di una simulazione. Con una trasformazione lineare, $a+(b-a)\cdot$`random.random()`, si ottiene una variabile uniforme su un intervallo qualsiasi $[a,b]$; con trasformazioni non lineari si ottengono distribuzioni di altre famiglie, come vedremo nel laboratorio dell’Atto V. La lezione di Bertrand vale anche qui: quando un programma sceglie qualcosa «a caso», chi lo scrive deve sapere da quale distribuzione sta campionando.

!!! example "Sosta di verifica"
    La funzione `random.random()` restituisce un numero $U$ uniforme tra 0 e 1. Qual è la probabilità che $U$ cada tra 0,2 e 0,5? E quella che superi 0,9? Quanto valgono $\mathbb{E}[U]$ e la deviazione standard di $U$?

    ??? esempio-svolto "Risposta"
        Con $a=0$ e $b=1$ la densità vale 1, e la probabilità di un intervallo è la sua lunghezza: $P(0{,}2<U<0{,}5)=0{,}3$ e $P(U>0{,}9)=0{,}1$. La media è il centro, $\mathbb{E}[U]=1/2$; la varianza è $1/12$ e la deviazione standard $1/\sqrt{12}\approx0{,}29$.

## Atto IV — La funzione di ripartizione {: #ripartizione }

Molte domande di probabilità hanno la stessa forma: con quale probabilità la variabile è **minore** di una soglia, **maggiore** di una soglia, oppure **compresa** tra due soglie? Con una variabile discreta, per rispondere dobbiamo sommare molti pesi della PMF; con una variabile continua, calcolare un’area. Sarebbe comodo avere una formula che dia subito la risposta. È esattamente il compito della funzione di ripartizione.

La **funzione di ripartizione** di una variabile aleatoria $X$, che si indica con la lettera maiuscola $F$, è la funzione che a ogni numero $x$ associa la probabilità che la variabile non lo superi:

$$
F(x)=P(X\le x).
$$

In inglese si chiama *cumulative distribution function*, abbreviata in CDF, perché accumula la probabilità da sinistra verso destra. La definizione è la stessa per le variabili discrete e per quelle continue; cambia soltanto il modo di calcolarla. Per una variabile discreta si sommano i pesi della PMF di tutti i valori che non superano $x$; per una variabile continua si prende l’area sotto la densità a sinistra di $x$:

$$
F(x)=\sum_{k\le x}p(k)\quad\text{(discreta)},\qquad\qquad F(x)=\int_{-\infty}^{x}f(t)\,dt\quad\text{(continua)}.
$$

Nell’integrale abbiamo chiamato $t$ la variabile che scorre sotto il segno di integrale, per non confonderla con l’estremo $x$, che è fisso: l’area va da $-\infty$ fino al punto $x$.

La vera utilità di questa definizione è pratica. Quando si studia una distribuzione nota, di solito se ne conosce anche la funzione di ripartizione, già pronta da usare negli esercizi. Prendiamo la distribuzione geometrica della settimana scorsa, con PMF $P(X=k)=(1-p)^{k-1}p$. Sappiamo che la probabilità che non bastino $k$ tentativi è $(1-p)^k$; la funzione di ripartizione è il suo complemento:

$$
F(k)=P(X\le k)=1-(1-p)^k.
$$

Con $p=0{,}2$, la probabilità di riuscire entro 5 tentativi è $1-0{,}8^5\approx0{,}67$, senza sommare cinque termini. Il grafico di una funzione di ripartizione discreta ha la forma di una **scala**: resta ferma tra un valore possibile e l’altro, e in ciascun valore $k$ fa un salto alto esattamente $P(X=k)$. Lo stesso accade per la distribuzione di Poisson, anche se per lei la funzione di ripartizione non ha una formula semplice e si ottiene sommando i termini della PMF.

<figure markdown="0">
<svg viewBox="0 0 580 234" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="A sinistra le barre della PMF della distribuzione geometrica con p uguale a 0,2, decrescenti da 0,2. A destra la funzione di ripartizione, una scala che sale a gradini: in ogni intero k salta della probabilità P(X = k) e si avvicina a 1.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">Distribuzione geometrica con p = 0,2: PMF e funzione di ripartizione</text>
<rect x="43.4" y="78.0" width="12.3" height="112.0" fill="#4051b5" opacity="0.6"/>
<rect x="62.6" y="100.4" width="12.3" height="89.6" fill="#4051b5" opacity="0.6"/>
<rect x="81.8" y="118.3" width="12.3" height="71.7" fill="#4051b5" opacity="0.6"/>
<rect x="101.0" y="132.7" width="12.3" height="57.3" fill="#4051b5" opacity="0.6"/>
<rect x="120.1" y="144.1" width="12.3" height="45.9" fill="#4051b5" opacity="0.6"/>
<rect x="139.3" y="153.3" width="12.3" height="36.7" fill="#4051b5" opacity="0.6"/>
<rect x="158.4" y="160.6" width="12.3" height="29.4" fill="#4051b5" opacity="0.6"/>
<rect x="177.6" y="166.5" width="12.3" height="23.5" fill="#4051b5" opacity="0.6"/>
<rect x="196.8" y="171.2" width="12.3" height="18.8" fill="#4051b5" opacity="0.6"/>
<rect x="216.0" y="175.0" width="12.3" height="15.0" fill="#4051b5" opacity="0.6"/>
<rect x="235.1" y="178.0" width="12.3" height="12.0" fill="#4051b5" opacity="0.6"/>
<rect x="254.3" y="180.4" width="12.3" height="9.6" fill="#4051b5" opacity="0.6"/>
<line x1="40" y1="190" x2="40" y2="40" stroke="currentColor"/>
<line x1="40" y1="190" x2="270" y2="190" stroke="currentColor"/>
<line x1="49.6" y1="190" x2="49.6" y2="194" stroke="currentColor"/><text x="49.6" y="206" text-anchor="middle" fill="currentColor" font-size="11">1</text>
<line x1="107.1" y1="190" x2="107.1" y2="194" stroke="currentColor"/><text x="107.1" y="206" text-anchor="middle" fill="currentColor" font-size="11">4</text>
<line x1="183.8" y1="190" x2="183.8" y2="194" stroke="currentColor"/><text x="183.8" y="206" text-anchor="middle" fill="currentColor" font-size="11">8</text>
<line x1="260.4" y1="190" x2="260.4" y2="194" stroke="currentColor"/><text x="260.4" y="206" text-anchor="middle" fill="currentColor" font-size="11">12</text>
<text x="46.0" y="46.0" text-anchor="start" fill="currentColor" font-size="11">P(X = k)</text>
<line x1="329.6" y1="162.0" x2="348.8" y2="162.0" stroke="#4051b5" stroke-width="2.5"/><circle cx="329.6" cy="162.0" r="3.5" fill="#4051b5"/>
<line x1="348.8" y1="139.6" x2="367.9" y2="139.6" stroke="#4051b5" stroke-width="2.5"/><circle cx="348.8" cy="139.6" r="3.5" fill="#4051b5"/>
<line x1="367.9" y1="121.7" x2="387.1" y2="121.7" stroke="#4051b5" stroke-width="2.5"/><circle cx="367.9" cy="121.7" r="3.5" fill="#4051b5"/>
<line x1="387.1" y1="107.3" x2="406.2" y2="107.3" stroke="#4051b5" stroke-width="2.5"/><circle cx="387.1" cy="107.3" r="3.5" fill="#4051b5"/>
<line x1="406.2" y1="95.9" x2="425.4" y2="95.9" stroke="#4051b5" stroke-width="2.5"/><circle cx="406.2" cy="95.9" r="3.5" fill="#4051b5"/>
<line x1="425.4" y1="86.7" x2="444.6" y2="86.7" stroke="#4051b5" stroke-width="2.5"/><circle cx="425.4" cy="86.7" r="3.5" fill="#4051b5"/>
<line x1="444.6" y1="79.4" x2="463.8" y2="79.4" stroke="#4051b5" stroke-width="2.5"/><circle cx="444.6" cy="79.4" r="3.5" fill="#4051b5"/>
<line x1="463.8" y1="73.5" x2="482.9" y2="73.5" stroke="#4051b5" stroke-width="2.5"/><circle cx="463.8" cy="73.5" r="3.5" fill="#4051b5"/>
<line x1="482.9" y1="68.8" x2="502.1" y2="68.8" stroke="#4051b5" stroke-width="2.5"/><circle cx="482.9" cy="68.8" r="3.5" fill="#4051b5"/>
<line x1="502.1" y1="65.0" x2="521.2" y2="65.0" stroke="#4051b5" stroke-width="2.5"/><circle cx="502.1" cy="65.0" r="3.5" fill="#4051b5"/>
<line x1="521.2" y1="62.0" x2="540.4" y2="62.0" stroke="#4051b5" stroke-width="2.5"/><circle cx="521.2" cy="62.0" r="3.5" fill="#4051b5"/>
<line x1="540.4" y1="59.6" x2="550.0" y2="59.6" stroke="#4051b5" stroke-width="2.5"/><circle cx="540.4" cy="59.6" r="3.5" fill="#4051b5"/>
<line x1="320.0" y1="190" x2="329.6" y2="190" stroke="#4051b5" stroke-width="2.5"/>
<line x1="320" y1="190" x2="320" y2="40" stroke="currentColor"/>
<line x1="320" y1="190" x2="550" y2="190" stroke="currentColor"/>
<line x1="329.6" y1="190" x2="329.6" y2="194" stroke="currentColor"/><text x="329.6" y="206" text-anchor="middle" fill="currentColor" font-size="11">1</text>
<line x1="387.1" y1="190" x2="387.1" y2="194" stroke="currentColor"/><text x="387.1" y="206" text-anchor="middle" fill="currentColor" font-size="11">4</text>
<line x1="463.8" y1="190" x2="463.8" y2="194" stroke="currentColor"/><text x="463.8" y="206" text-anchor="middle" fill="currentColor" font-size="11">8</text>
<line x1="540.4" y1="190" x2="540.4" y2="194" stroke="currentColor"/><text x="540.4" y="206" text-anchor="middle" fill="currentColor" font-size="11">12</text>
<line x1="316" y1="50.0" x2="550" y2="50.0" stroke="currentColor" stroke-dasharray="2 4" opacity="0.5"/><text x="312.0" y="54.0" text-anchor="end" fill="currentColor" font-size="11">1</text>
<text x="326.0" y="46.0" text-anchor="start" fill="currentColor" font-size="11">F(k) = 1 − 0,8ᵏ</text>
<text x="155.0" y="222.0" text-anchor="middle" fill="currentColor" font-size="12">pesi: si sommano…</text>
<text x="435.0" y="222.0" text-anchor="middle" fill="currentColor" font-size="12">…e la somma cresce a gradini fino a 1</text>
</svg>
<figcaption>Per una variabile discreta la funzione di ripartizione è una scala: tra un valore e l’altro resta ferma, in ogni valore possibile salta di quanto pesa quel valore.</figcaption>
</figure>

Per una variabile continua i salti scompaiono, perché ogni punto ha probabilità zero. La funzione di ripartizione è allora una curva continua che parte da 0 a sinistra, cresce man mano che accumula area e arriva a 1 a destra. Non scende mai, perché l’area si può soltanto aggiungere. Sale in fretta dove la densità è alta e quasi non si muove dove la densità è bassa. Il legame tra le due funzioni si vede bene nella figura seguente, disegnata per l’autobus: l’altezza della funzione di ripartizione in un punto è l’area della densità a sinistra di quel punto. Chi conosce le derivate riconoscerà la stessa idea dall’altra parte: la densità è la derivata della funzione di ripartizione, $f(x)=F'(x)$. È ciò che intendevamo quando abbiamo detto che la densità è la «derivata della probabilità».

<figure markdown="0">
<svg viewBox="0 0 580 332" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Sopra, la densità dell’arrivo dell’autobus con l’area a sinistra di 10 minuti colorata in blu: vale circa 0,54. Sotto, la funzione di ripartizione, una curva a forma di S che sale da 0 a 1; nel punto 10 la sua altezza è proprio 0,54.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">La funzione di ripartizione accumula l’area della densità</text>
<polygon points="70.0,120 70.0,120.0 72.0,116.9 73.9,113.9 75.9,110.9 77.8,108.0 79.8,105.2 81.8,102.5 83.7,99.8 85.7,97.3 87.6,94.7 89.6,92.3 91.5,89.9 93.5,87.6 95.5,85.4 97.4,83.2 99.4,81.1 101.3,79.0 103.3,77.1 105.2,75.2 107.2,73.3 109.2,71.5 111.1,69.8 113.1,68.1 115.0,66.5 117.0,64.9 119.0,63.4 120.9,62.0 122.9,60.6 124.8,59.2 126.8,58.0 128.8,56.7 130.7,55.6 132.7,54.4 134.6,53.3 136.6,52.3 138.5,51.3 140.5,50.4 142.5,49.5 144.4,48.7 146.4,47.9 148.3,47.1 150.3,46.4 152.2,45.8 154.2,45.1 156.2,44.6 158.1,44.0 160.1,43.5 162.0,43.1 164.0,42.6 166.0,42.2 167.9,41.9 169.9,41.6 171.8,41.3 173.8,41.1 175.8,40.9 177.7,40.7 179.7,40.6 181.6,40.4 183.6,40.4 185.5,40.3 187.5,40.3 189.5,40.3 191.4,40.4 193.4,40.4 195.3,40.5 197.3,40.7 199.2,40.8 201.2,41.0 203.2,41.2 205.1,41.4 207.1,41.7 209.0,42.0 211.0,42.3 213.0,42.6 214.9,42.9 216.9,43.3 218.8,43.7 220.8,44.1 222.8,44.5 224.7,44.9 226.7,45.4 226.7,120" fill="#4051b5" opacity="0.4"/>
<polyline points="70.0,120.0 72.9,115.4 75.9,110.9 78.8,106.6 81.8,102.5 84.7,98.5 87.6,94.7 90.6,91.1 93.5,87.6 96.4,84.3 99.4,81.1 102.3,78.0 105.2,75.2 108.2,72.4 111.1,69.8 114.1,67.3 117.0,64.9 119.9,62.7 122.9,60.6 125.8,58.6 128.8,56.7 131.7,55.0 134.6,53.3 137.6,51.8 140.5,50.4 143.4,49.1 146.4,47.9 149.3,46.8 152.2,45.8 155.2,44.8 158.1,44.0 161.1,43.3 164.0,42.6 166.9,42.1 169.9,41.6 172.8,41.2 175.8,40.9 178.7,40.6 181.6,40.4 184.6,40.3 187.5,40.3 190.4,40.3 193.4,40.4 196.3,40.6 199.2,40.8 202.2,41.1 205.1,41.4 208.1,41.8 211.0,42.3 213.9,42.7 216.9,43.3 219.8,43.9 222.8,44.5 225.7,45.1 228.6,45.9 231.6,46.6 234.5,47.4 237.4,48.2 240.4,49.0 243.3,49.9 246.2,50.8 249.2,51.8 252.1,52.7 255.1,53.7 258.0,54.7 260.9,55.8 263.9,56.8 266.8,57.9 269.8,59.0 272.7,60.1 275.6,61.2 278.6,62.3 281.5,63.4 284.4,64.6 287.4,65.7 290.3,66.9 293.2,68.1 296.2,69.2 299.1,70.4 302.1,71.6 305.0,72.8 307.9,74.0 310.9,75.1 313.8,76.3 316.8,77.5 319.7,78.7 322.6,79.8 325.6,81.0 328.5,82.1 331.4,83.3 334.4,84.4 337.3,85.5 340.2,86.6 343.2,87.8 346.1,88.8 349.1,89.9 352.0,91.0 354.9,92.0 357.9,93.1 360.8,94.1 363.8,95.1 366.7,96.1 369.6,97.1 372.6,98.0 375.5,98.9 378.4,99.9 381.4,100.8 384.3,101.6 387.2,102.5 390.2,103.3 393.1,104.1 396.1,104.9 399.0,105.7 401.9,106.5 404.9,107.2 407.8,107.9 410.8,108.6 413.7,109.3 416.6,109.9 419.6,110.5 422.5,111.1 425.4,111.7 428.4,112.3 431.3,112.8 434.2,113.3 437.2,113.8 440.1,114.3 443.1,114.7 446.0,115.2 448.9,115.6 451.9,116.0 454.8,116.3 457.8,116.7 460.7,117.0 463.6,117.3 466.6,117.6 469.5,117.8 472.4,118.1 475.4,118.3 478.3,118.5 481.2,118.7 484.2,118.9 487.1,119.0 490.1,119.2 493.0,119.3 495.9,119.4 498.9,119.5 501.8,119.6 504.8,119.7 507.7,119.8 510.6,119.8 513.6,119.9 516.5,119.9 519.4,119.9 522.4,120.0 525.3,120.0 528.2,120.0 531.2,120.0 534.1,120.0 537.1,120.0 540.0,120.0" fill="none" stroke="#e07a1f" stroke-width="2.5"/>
<line x1="70" y1="120" x2="70" y2="30" stroke="currentColor"/>
<line x1="70" y1="120" x2="540" y2="120" stroke="currentColor"/>
<line x1="70.0" y1="120" x2="70.0" y2="124" stroke="currentColor"/><text x="70.0" y="136" text-anchor="middle" fill="currentColor" font-size="11">14:00</text>
<line x1="226.7" y1="120" x2="226.7" y2="124" stroke="currentColor"/><text x="226.7" y="136" text-anchor="middle" fill="currentColor" font-size="11">10</text>
<line x1="383.3" y1="120" x2="383.3" y2="124" stroke="currentColor"/><text x="383.3" y="136" text-anchor="middle" fill="currentColor" font-size="11">20</text>
<line x1="540.0" y1="120" x2="540.0" y2="124" stroke="currentColor"/><text x="540.0" y="136" text-anchor="middle" fill="currentColor" font-size="11">30</text>
<text x="76.0" y="36.0" text-anchor="start" fill="currentColor" font-size="11">densità f(t)</text>
<text x="148.3" y="97.3" text-anchor="#4051b5" fill="currentColor" font-weight="bold">0,54</text>
<polyline points="70.0,290.0 72.9,290.0 75.9,289.8 78.8,289.6 81.8,289.3 84.7,288.9 87.6,288.4 90.6,287.9 93.5,287.3 96.4,286.6 99.4,285.9 102.3,285.1 105.2,284.2 108.2,283.3 111.1,282.3 114.1,281.3 117.0,280.2 119.9,279.1 122.9,278.0 125.8,276.8 128.8,275.5 131.7,274.2 134.6,272.9 137.6,271.6 140.5,270.2 143.4,268.8 146.4,267.4 149.3,266.0 152.2,264.5 155.2,263.0 158.1,261.5 161.1,260.0 164.0,258.5 166.9,256.9 169.9,255.4 172.8,253.8 175.8,252.3 178.7,250.7 181.6,249.1 184.6,247.5 187.5,245.9 190.4,244.4 193.4,242.8 196.3,241.2 199.2,239.6 202.2,238.1 205.1,236.5 208.1,234.9 211.0,233.4 213.9,231.8 216.9,230.3 219.8,228.8 222.8,227.3 225.7,225.8 228.6,224.3 231.6,222.9 234.5,221.4 237.4,220.0 240.4,218.6 243.3,217.2 246.2,215.8 249.2,214.4 252.1,213.1 255.1,211.7 258.0,210.4 260.9,209.1 263.9,207.9 266.8,206.6 269.8,205.4 272.7,204.2 275.6,203.0 278.6,201.9 281.5,200.7 284.4,199.6 287.4,198.5 290.3,197.5 293.2,196.4 296.2,195.4 299.1,194.4 302.1,193.4 305.0,192.5 307.9,191.6 310.9,190.7 313.8,189.8 316.8,188.9 319.7,188.1 322.6,187.3 325.6,186.5 328.5,185.7 331.4,185.0 334.4,184.3 337.3,183.6 340.2,182.9 343.2,182.3 346.1,181.6 349.1,181.0 352.0,180.4 354.9,179.9 357.9,179.3 360.8,178.8 363.8,178.3 366.7,177.8 369.6,177.4 372.6,176.9 375.5,176.5 378.4,176.1 381.4,175.7 384.3,175.3 387.2,175.0 390.2,174.6 393.1,174.3 396.1,174.0 399.0,173.7 401.9,173.4 404.9,173.2 407.8,172.9 410.8,172.7 413.7,172.5 416.6,172.3 419.6,172.1 422.5,171.9 425.4,171.7 428.4,171.5 431.3,171.4 434.2,171.3 437.2,171.1 440.1,171.0 443.1,170.9 446.0,170.8 448.9,170.7 451.9,170.6 454.8,170.6 457.8,170.5 460.7,170.4 463.6,170.4 466.6,170.3 469.5,170.3 472.4,170.2 475.4,170.2 478.3,170.2 481.2,170.1 484.2,170.1 487.1,170.1 490.1,170.1 493.0,170.1 495.9,170.0 498.9,170.0 501.8,170.0 504.8,170.0 507.7,170.0 510.6,170.0 513.6,170.0 516.5,170.0 519.4,170.0 522.4,170.0 525.3,170.0 528.2,170.0 531.2,170.0 534.1,170.0 537.1,170.0 540.0,170.0" fill="none" stroke="#4051b5" stroke-width="3"/>
<line x1="70" y1="290" x2="70" y2="160" stroke="currentColor"/>
<line x1="70" y1="290" x2="540" y2="290" stroke="currentColor"/>
<line x1="70.0" y1="290" x2="70.0" y2="294" stroke="currentColor"/><text x="70.0" y="306" text-anchor="middle" fill="currentColor" font-size="11">14:00</text>
<line x1="226.7" y1="290" x2="226.7" y2="294" stroke="currentColor"/><text x="226.7" y="306" text-anchor="middle" fill="currentColor" font-size="11">10</text>
<line x1="383.3" y1="290" x2="383.3" y2="294" stroke="currentColor"/><text x="383.3" y="306" text-anchor="middle" fill="currentColor" font-size="11">20</text>
<line x1="540.0" y1="290" x2="540.0" y2="294" stroke="currentColor"/><text x="540.0" y="306" text-anchor="middle" fill="currentColor" font-size="11">30</text>
<line x1="66" y1="230.0" x2="540" y2="230.0" stroke="currentColor" stroke-dasharray="2 4" opacity="0.5"/><text x="62.0" y="234.0" text-anchor="end" fill="currentColor" font-size="11">0,5</text>
<line x1="66" y1="170.0" x2="540" y2="170.0" stroke="currentColor" stroke-dasharray="2 4" opacity="0.5"/><text x="62.0" y="174.0" text-anchor="end" fill="currentColor" font-size="11">1,0</text>
<line x1="226.7" y1="120" x2="226.7" y2="290" stroke="#4051b5" stroke-dasharray="4 3"/>
<circle cx="226.7" cy="225.3" r="5" fill="#4051b5"/>
<text x="236.7" y="243.3" text-anchor="start" fill="#4051b5" font-weight="bold">F(10) ≈ 0,54</text>
<text x="76.0" y="166.0" text-anchor="start" fill="currentColor" font-size="11">funzione di ripartizione F(t)</text>
<text x="540.0" y="322.0" text-anchor="end" fill="currentColor" font-size="11">minuti dopo le 14:00</text>
</svg>
<figcaption>Il valore della funzione di ripartizione in un punto è l’area della densità a sinistra di quel punto: F(10) ≈ 0,54 è la probabilità che l’autobus passi entro le 14:10. Dove la densità è alta, F sale in fretta.</figcaption>
</figure>

Ecco come si usa la funzione di ripartizione. Le domande del tipo «entro», «tra» e «oltre» si traducono in tre letture:

$$
P(X\le a)=F(a),\qquad P(a<X\le b)=F(b)-F(a),\qquad P(X>b)=1-F(b).
$$

La prima è la definizione. La seconda si capisce guardando le aree: l’area a sinistra di $b$ meno l’area a sinistra di $a$ è proprio l’area tra $a$ e $b$. La terza viene dalla regola del complemento: la probabilità di superare $b$ è ciò che resta dell’area totale, che vale 1. Per l’autobus della figura, con $F(10)\approx0{,}54$ e $F(20)\approx0{,}95$, la probabilità che passi entro le 14:10 è circa 0,54, quella che passi tra le 14:10 e le 14:20 è circa $0{,}95-0{,}54=0{,}41$, quella che passi dopo le 14:20 è circa $1-0{,}95=0{,}05$.

<figure markdown="0">
<svg viewBox="0 0 580 222" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Tre copie della densità dell’arrivo dell’autobus. Nella prima è colorata l’area a sinistra di 10 minuti, che vale F(10), circa 0,54. Nella seconda l’area tra 10 e 20, che vale F(20) meno F(10), circa 0,41. Nella terza l’area a destra di 20, che vale 1 meno F(20), circa 0,05.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">Tre domande, tre letture della funzione di ripartizione</text>
<polygon points="20.0,150 20.0,150.0 20.7,146.5 21.3,143.1 22.0,139.8 22.7,136.6 23.3,133.5 24.0,130.4 24.7,127.5 25.3,124.6 26.0,121.8 26.7,119.0 27.3,116.4 28.0,113.8 28.7,111.3 29.3,108.9 30.0,106.5 30.7,104.2 31.3,102.0 32.0,99.9 32.7,97.8 33.3,95.8 34.0,93.9 34.7,92.0 35.3,90.2 36.0,88.4 36.7,86.8 37.3,85.1 38.0,83.6 38.7,82.1 39.3,80.7 40.0,79.3 40.7,78.0 41.3,76.7 42.0,75.5 42.7,74.4 43.3,73.3 44.0,72.2 44.7,71.2 45.3,70.3 46.0,69.4 46.7,68.6 47.3,67.8 48.0,67.0 48.7,66.3 49.3,65.7 50.0,65.1 50.7,64.5 51.3,64.0 52.0,63.5 52.7,63.1 53.3,62.7 54.0,62.4 54.7,62.1 55.3,61.8 56.0,61.6 56.7,61.4 57.3,61.2 58.0,61.1 58.7,61.0 59.3,61.0 60.0,60.9 60.7,61.0 61.3,61.0 62.0,61.1 62.7,61.2 63.3,61.3 64.0,61.5 64.7,61.7 65.3,61.9 66.0,62.2 66.7,62.5 67.3,62.8 68.0,63.1 68.7,63.5 69.3,63.8 70.0,64.2 70.7,64.7 71.3,65.1 72.0,65.6 72.7,66.1 73.3,66.6 73.3,150" fill="#2e9e5b" opacity="0.55"/>
<polyline points="20.0,150.0 21.0,144.8 22.0,139.8 23.0,135.0 24.0,130.4 25.0,126.0 26.0,121.8 27.0,117.7 28.0,113.8 29.0,110.1 30.0,106.5 31.0,103.1 32.0,99.9 33.0,96.8 34.0,93.9 35.0,91.1 36.0,88.4 37.0,85.9 38.0,83.6 39.0,81.4 40.0,79.3 41.0,77.3 42.0,75.5 43.0,73.8 44.0,72.2 45.0,70.7 46.0,69.4 47.0,68.2 48.0,67.0 49.0,66.0 50.0,65.1 51.0,64.3 52.0,63.5 53.0,62.9 54.0,62.4 55.0,61.9 56.0,61.6 57.0,61.3 58.0,61.1 59.0,61.0 60.0,60.9 61.0,61.0 62.0,61.1 63.0,61.3 64.0,61.5 65.0,61.8 66.0,62.2 67.0,62.6 68.0,63.1 69.0,63.7 70.0,64.2 71.0,64.9 72.0,65.6 73.0,66.3 74.0,67.1 75.0,68.0 76.0,68.8 77.0,69.7 78.0,70.7 79.0,71.7 80.0,72.7 81.0,73.7 82.0,74.8 83.0,75.9 84.0,77.0 85.0,78.2 86.0,79.4 87.0,80.6 88.0,81.8 89.0,83.0 90.0,84.2 91.0,85.5 92.0,86.8 93.0,88.1 94.0,89.4 95.0,90.7 96.0,92.0 97.0,93.3 98.0,94.6 99.0,95.9 100.0,97.2 101.0,98.5 102.0,99.9 103.0,101.2 104.0,102.5 105.0,103.8 106.0,105.1 107.0,106.4 108.0,107.7 109.0,109.0 110.0,110.2 111.0,111.5 112.0,112.7 113.0,114.0 114.0,115.2 115.0,116.4 116.0,117.6 117.0,118.7 118.0,119.9 119.0,121.0 120.0,122.2 121.0,123.3 122.0,124.4 123.0,125.4 124.0,126.5 125.0,127.5 126.0,128.5 127.0,129.5 128.0,130.4 129.0,131.4 130.0,132.3 131.0,133.2 132.0,134.0 133.0,134.9 134.0,135.7 135.0,136.5 136.0,137.3 137.0,138.0 138.0,138.7 139.0,139.4 140.0,140.1 141.0,140.8 142.0,141.4 143.0,142.0 144.0,142.5 145.0,143.1 146.0,143.6 147.0,144.1 148.0,144.6 149.0,145.0 150.0,145.5 151.0,145.9 152.0,146.3 153.0,146.6 154.0,147.0 155.0,147.3 156.0,147.6 157.0,147.9 158.0,148.1 159.0,148.3 160.0,148.6 161.0,148.8 162.0,148.9 163.0,149.1 164.0,149.2 165.0,149.4 166.0,149.5 167.0,149.6 168.0,149.7 169.0,149.7 170.0,149.8 171.0,149.9 172.0,149.9 173.0,149.9 174.0,150.0 175.0,150.0 176.0,150.0 177.0,150.0 178.0,150.0 179.0,150.0 180.0,150.0" fill="none" stroke="#e07a1f" stroke-width="2.2"/>
<line x1="20" y1="150" x2="180" y2="150" stroke="currentColor"/>
<line x1="20.0" y1="150" x2="20.0" y2="154" stroke="currentColor"/><text x="20.0" y="166" text-anchor="middle" fill="currentColor" font-size="10">14</text>
<line x1="73.3" y1="150" x2="73.3" y2="154" stroke="currentColor"/><text x="73.3" y="166" text-anchor="middle" fill="currentColor" font-size="10">10</text>
<line x1="126.7" y1="150" x2="126.7" y2="154" stroke="currentColor"/><text x="126.7" y="166" text-anchor="middle" fill="currentColor" font-size="10">20</text>
<line x1="180.0" y1="150" x2="180.0" y2="154" stroke="currentColor"/><text x="180.0" y="166" text-anchor="middle" fill="currentColor" font-size="10">30</text>
<text x="100.0" y="190.0" text-anchor="middle" fill="#2e9e5b" font-size="11" font-weight="bold">P(T ≤ 10) = F(10)</text>
<polygon points="263.3,150 263.3,66.6 264.0,67.1 264.7,67.7 265.3,68.2 266.0,68.8 266.7,69.4 267.3,70.1 268.0,70.7 268.7,71.3 269.3,72.0 270.0,72.7 270.7,73.4 271.3,74.1 272.0,74.8 272.7,75.5 273.3,76.3 274.0,77.0 274.7,77.8 275.3,78.6 276.0,79.4 276.7,80.2 277.3,81.0 278.0,81.8 278.7,82.6 279.3,83.4 280.0,84.2 280.7,85.1 281.3,85.9 282.0,86.8 282.7,87.6 283.3,88.5 284.0,89.4 284.7,90.2 285.3,91.1 286.0,92.0 286.7,92.8 287.3,93.7 288.0,94.6 288.7,95.5 289.3,96.3 290.0,97.2 290.7,98.1 291.3,99.0 292.0,99.9 292.7,100.7 293.3,101.6 294.0,102.5 294.7,103.4 295.3,104.2 296.0,105.1 296.7,106.0 297.3,106.8 298.0,107.7 298.7,108.5 299.3,109.4 300.0,110.2 300.7,111.1 301.3,111.9 302.0,112.7 302.7,113.5 303.3,114.4 304.0,115.2 304.7,116.0 305.3,116.8 306.0,117.6 306.7,118.4 307.3,119.1 308.0,119.9 308.7,120.7 309.3,121.4 310.0,122.2 310.7,122.9 311.3,123.6 312.0,124.4 312.7,125.1 313.3,125.8 314.0,126.5 314.7,127.2 315.3,127.8 316.0,128.5 316.7,129.1 316.7,150" fill="#2e9e5b" opacity="0.55"/>
<polyline points="210.0,150.0 211.0,144.8 212.0,139.8 213.0,135.0 214.0,130.4 215.0,126.0 216.0,121.8 217.0,117.7 218.0,113.8 219.0,110.1 220.0,106.5 221.0,103.1 222.0,99.9 223.0,96.8 224.0,93.9 225.0,91.1 226.0,88.4 227.0,85.9 228.0,83.6 229.0,81.4 230.0,79.3 231.0,77.3 232.0,75.5 233.0,73.8 234.0,72.2 235.0,70.7 236.0,69.4 237.0,68.2 238.0,67.0 239.0,66.0 240.0,65.1 241.0,64.3 242.0,63.5 243.0,62.9 244.0,62.4 245.0,61.9 246.0,61.6 247.0,61.3 248.0,61.1 249.0,61.0 250.0,60.9 251.0,61.0 252.0,61.1 253.0,61.3 254.0,61.5 255.0,61.8 256.0,62.2 257.0,62.6 258.0,63.1 259.0,63.7 260.0,64.2 261.0,64.9 262.0,65.6 263.0,66.3 264.0,67.1 265.0,68.0 266.0,68.8 267.0,69.7 268.0,70.7 269.0,71.7 270.0,72.7 271.0,73.7 272.0,74.8 273.0,75.9 274.0,77.0 275.0,78.2 276.0,79.4 277.0,80.6 278.0,81.8 279.0,83.0 280.0,84.2 281.0,85.5 282.0,86.8 283.0,88.1 284.0,89.4 285.0,90.7 286.0,92.0 287.0,93.3 288.0,94.6 289.0,95.9 290.0,97.2 291.0,98.5 292.0,99.9 293.0,101.2 294.0,102.5 295.0,103.8 296.0,105.1 297.0,106.4 298.0,107.7 299.0,109.0 300.0,110.2 301.0,111.5 302.0,112.7 303.0,114.0 304.0,115.2 305.0,116.4 306.0,117.6 307.0,118.7 308.0,119.9 309.0,121.0 310.0,122.2 311.0,123.3 312.0,124.4 313.0,125.4 314.0,126.5 315.0,127.5 316.0,128.5 317.0,129.5 318.0,130.4 319.0,131.4 320.0,132.3 321.0,133.2 322.0,134.0 323.0,134.9 324.0,135.7 325.0,136.5 326.0,137.3 327.0,138.0 328.0,138.7 329.0,139.4 330.0,140.1 331.0,140.8 332.0,141.4 333.0,142.0 334.0,142.5 335.0,143.1 336.0,143.6 337.0,144.1 338.0,144.6 339.0,145.0 340.0,145.5 341.0,145.9 342.0,146.3 343.0,146.6 344.0,147.0 345.0,147.3 346.0,147.6 347.0,147.9 348.0,148.1 349.0,148.3 350.0,148.6 351.0,148.8 352.0,148.9 353.0,149.1 354.0,149.2 355.0,149.4 356.0,149.5 357.0,149.6 358.0,149.7 359.0,149.7 360.0,149.8 361.0,149.9 362.0,149.9 363.0,149.9 364.0,150.0 365.0,150.0 366.0,150.0 367.0,150.0 368.0,150.0 369.0,150.0 370.0,150.0" fill="none" stroke="#e07a1f" stroke-width="2.2"/>
<line x1="210" y1="150" x2="370" y2="150" stroke="currentColor"/>
<line x1="210.0" y1="150" x2="210.0" y2="154" stroke="currentColor"/><text x="210.0" y="166" text-anchor="middle" fill="currentColor" font-size="10">14</text>
<line x1="263.3" y1="150" x2="263.3" y2="154" stroke="currentColor"/><text x="263.3" y="166" text-anchor="middle" fill="currentColor" font-size="10">10</text>
<line x1="316.7" y1="150" x2="316.7" y2="154" stroke="currentColor"/><text x="316.7" y="166" text-anchor="middle" fill="currentColor" font-size="10">20</text>
<line x1="370.0" y1="150" x2="370.0" y2="154" stroke="currentColor"/><text x="370.0" y="166" text-anchor="middle" fill="currentColor" font-size="10">30</text>
<text x="290.0" y="190.0" text-anchor="middle" fill="#2e9e5b" font-size="11" font-weight="bold">P(10 &lt; T ≤ 20) = F(20) − F(10)</text>
<polygon points="506.7,150 506.7,129.1 507.3,129.8 508.0,130.4 508.7,131.1 509.3,131.7 510.0,132.3 510.7,132.9 511.3,133.5 512.0,134.0 512.7,134.6 513.3,135.2 514.0,135.7 514.7,136.2 515.3,136.8 516.0,137.3 516.7,137.8 517.3,138.3 518.0,138.7 518.7,139.2 519.3,139.7 520.0,140.1 520.7,140.5 521.3,141.0 522.0,141.4 522.7,141.8 523.3,142.2 524.0,142.5 524.7,142.9 525.3,143.3 526.0,143.6 526.7,144.0 527.3,144.3 528.0,144.6 528.7,144.9 529.3,145.2 530.0,145.5 530.7,145.8 531.3,146.0 532.0,146.3 532.7,146.5 533.3,146.7 534.0,147.0 534.7,147.2 535.3,147.4 536.0,147.6 536.7,147.8 537.3,147.9 538.0,148.1 538.7,148.3 539.3,148.4 540.0,148.6 540.7,148.7 541.3,148.8 542.0,148.9 542.7,149.0 543.3,149.1 544.0,149.2 544.7,149.3 545.3,149.4 546.0,149.5 546.7,149.6 547.3,149.6 548.0,149.7 548.7,149.7 549.3,149.8 550.0,149.8 550.7,149.8 551.3,149.9 552.0,149.9 552.7,149.9 553.3,149.9 554.0,150.0 554.7,150.0 555.3,150.0 556.0,150.0 556.7,150.0 557.3,150.0 558.0,150.0 558.7,150.0 559.3,150.0 560.0,150.0 560.0,150" fill="#2e9e5b" opacity="0.55"/>
<polyline points="400.0,150.0 401.0,144.8 402.0,139.8 403.0,135.0 404.0,130.4 405.0,126.0 406.0,121.8 407.0,117.7 408.0,113.8 409.0,110.1 410.0,106.5 411.0,103.1 412.0,99.9 413.0,96.8 414.0,93.9 415.0,91.1 416.0,88.4 417.0,85.9 418.0,83.6 419.0,81.4 420.0,79.3 421.0,77.3 422.0,75.5 423.0,73.8 424.0,72.2 425.0,70.7 426.0,69.4 427.0,68.2 428.0,67.0 429.0,66.0 430.0,65.1 431.0,64.3 432.0,63.5 433.0,62.9 434.0,62.4 435.0,61.9 436.0,61.6 437.0,61.3 438.0,61.1 439.0,61.0 440.0,60.9 441.0,61.0 442.0,61.1 443.0,61.3 444.0,61.5 445.0,61.8 446.0,62.2 447.0,62.6 448.0,63.1 449.0,63.7 450.0,64.2 451.0,64.9 452.0,65.6 453.0,66.3 454.0,67.1 455.0,68.0 456.0,68.8 457.0,69.7 458.0,70.7 459.0,71.7 460.0,72.7 461.0,73.7 462.0,74.8 463.0,75.9 464.0,77.0 465.0,78.2 466.0,79.4 467.0,80.6 468.0,81.8 469.0,83.0 470.0,84.2 471.0,85.5 472.0,86.8 473.0,88.1 474.0,89.4 475.0,90.7 476.0,92.0 477.0,93.3 478.0,94.6 479.0,95.9 480.0,97.2 481.0,98.5 482.0,99.9 483.0,101.2 484.0,102.5 485.0,103.8 486.0,105.1 487.0,106.4 488.0,107.7 489.0,109.0 490.0,110.2 491.0,111.5 492.0,112.7 493.0,114.0 494.0,115.2 495.0,116.4 496.0,117.6 497.0,118.7 498.0,119.9 499.0,121.0 500.0,122.2 501.0,123.3 502.0,124.4 503.0,125.4 504.0,126.5 505.0,127.5 506.0,128.5 507.0,129.5 508.0,130.4 509.0,131.4 510.0,132.3 511.0,133.2 512.0,134.0 513.0,134.9 514.0,135.7 515.0,136.5 516.0,137.3 517.0,138.0 518.0,138.7 519.0,139.4 520.0,140.1 521.0,140.8 522.0,141.4 523.0,142.0 524.0,142.5 525.0,143.1 526.0,143.6 527.0,144.1 528.0,144.6 529.0,145.0 530.0,145.5 531.0,145.9 532.0,146.3 533.0,146.6 534.0,147.0 535.0,147.3 536.0,147.6 537.0,147.9 538.0,148.1 539.0,148.3 540.0,148.6 541.0,148.8 542.0,148.9 543.0,149.1 544.0,149.2 545.0,149.4 546.0,149.5 547.0,149.6 548.0,149.7 549.0,149.7 550.0,149.8 551.0,149.9 552.0,149.9 553.0,149.9 554.0,150.0 555.0,150.0 556.0,150.0 557.0,150.0 558.0,150.0 559.0,150.0 560.0,150.0" fill="none" stroke="#e07a1f" stroke-width="2.2"/>
<line x1="400" y1="150" x2="560" y2="150" stroke="currentColor"/>
<line x1="400.0" y1="150" x2="400.0" y2="154" stroke="currentColor"/><text x="400.0" y="166" text-anchor="middle" fill="currentColor" font-size="10">14</text>
<line x1="453.3" y1="150" x2="453.3" y2="154" stroke="currentColor"/><text x="453.3" y="166" text-anchor="middle" fill="currentColor" font-size="10">10</text>
<line x1="506.7" y1="150" x2="506.7" y2="154" stroke="currentColor"/><text x="506.7" y="166" text-anchor="middle" fill="currentColor" font-size="10">20</text>
<line x1="560.0" y1="150" x2="560.0" y2="154" stroke="currentColor"/><text x="560.0" y="166" text-anchor="middle" fill="currentColor" font-size="10">30</text>
<text x="480.0" y="190.0" text-anchor="middle" fill="#2e9e5b" font-size="11" font-weight="bold">P(T &gt; 20) = 1 − F(20)</text>
<text x="100.0" y="210.0" text-anchor="middle" fill="currentColor" font-size="12">≈ 0,54</text>
<text x="290.0" y="210.0" text-anchor="middle" fill="currentColor" font-size="12">≈ 0,95 − 0,54 = 0,41</text>
<text x="480.0" y="210.0" text-anchor="middle" fill="currentColor" font-size="12">≈ 1 − 0,95 = 0,05</text>
</svg>
<figcaption>Con la funzione di ripartizione non serve calcolare aree: «entro», «tra» e «oltre» diventano una lettura, una differenza e un complemento.</figcaption>
</figure>

Per una variabile continua, ancora una volta, non importa se scriviamo $<$ oppure $\le$. Per una variabile discreta invece importa, e bisogna ragionare sui valori possibili: per la distribuzione geometrica, $P(X<5)=P(X\le4)=F(4)$, non $F(5)$.

Anche la distribuzione uniforme ha una funzione di ripartizione semplice. L’area a sinistra di $x$, per $x$ tra $a$ e $b$, è un rettangolo di base $x-a$ e altezza $1/(b-a)$; prima di $a$ l’area è zero, dopo $b$ è tutta l’area, cioè 1:

$$
F(x)=0\ \text{ per } x<a,\qquad F(x)=\frac{x-a}{b-a}\ \text{ per } a\le x\le b,\qquad F(x)=1\ \text{ per } x>b.
$$

Il grafico è una rampa che sale in linea retta da 0 a 1. Per l’autobus uniforme, $F(t)=t/30$ tra 0 e 30.

!!! example "Sosta di verifica"
    L’autobus passa in un istante uniforme tra le 14:00 e le 14:30, quindi $F(t)=t/30$. Usa soltanto la funzione di ripartizione per calcolare la probabilità che passi entro le 14:12, quella che passi dopo le 14:25 e quella che passi tra le 14:12 e le 14:25.

    ??? esempio-svolto "Risposta"
        Entro le 14:12: $F(12)=12/30=0{,}4$. Dopo le 14:25: $1-F(25)=1-25/30=1/6\approx0{,}17$. Tra le 14:12 e le 14:25: $F(25)-F(12)=25/30-12/30=13/30\approx0{,}43$. Le tre probabilità sommano a 1, come devono: i tre eventi coprono tutti i casi senza sovrapporsi.

## Atto V — Il tempo tra due eventi: la distribuzione esponenziale {: #esponenziale }

### Dalla distribuzione di Poisson al tempo di attesa {: #poisson-esponenziale }

Quando abbiamo studiato la distribuzione di Poisson, l’abbiamo usata per contare quante volte un evento si verifica in un intervallo, quando le occorrenze sono indipendenti l’una dall’altra e arrivano con un ritmo medio costante. Ora cambiamo domanda. Invece di chiederci **quanti** eventi cadono in un intervallo, ci chiediamo **quanto tempo** dobbiamo aspettare il prossimo. Questa seconda grandezza è un tempo, e può assumere qualunque valore positivo: è una variabile continua.

Gli esempi sono a coppie, e ogni coppia nasce da un’ipotesi. Prendiamo gli attacchi a un sito web. **Se assumiamo** che arrivino uno alla volta, indipendentemente l’uno dall’altro e con un ritmo medio costante, cioè con le ipotesi da cui nella [Settimana 5](../settimana_05/index.md#pezzetti) abbiamo costruito la distribuzione di Poisson, **allora** il numero di attacchi in un giorno è una variabile aleatoria poissoniana, e il tempo che separa due attacchi ha la distribuzione che stiamo per introdurre. Non è un fatto garantito: se gli attacchi arrivassero a ondate, per esempio da una rete di computer infetti che colpisce per qualche minuto e poi tace, il modello non descriverebbe bene né il conteggio né l’attesa. La stessa ipotesi forma anche le altre coppie: il numero di operazioni su un grande database nei prossimi 10 millisecondi e il tempo fino alla prossima operazione; il numero di utenti che cliccano su un annuncio nei prossimi 5 minuti e il tempo tra due clic; le stampe inviate a una stampante condivisa in un’ora e il tempo tra due stampe. In ogni coppia il primo numero conta, il secondo misura un’attesa.

Per collegare le due grandezze fissiamo il **tasso** $\lambda$: il numero medio di eventi per unità di tempo. Per esempio, una stampante riceve in media $\lambda=3$ lavori all’ora. Chiamiamo $X_t$ il numero di eventi in un intervallo lungo $t$ ore. Sotto le ipotesi appena richiamate, come abbiamo visto nella [Settimana 5](../settimana_05/index.md#tasso), $X_t$ ha distribuzione di Poisson con media $\lambda t$, e questo vale per **ogni** durata $t$, non solo per un’ora: in $t$ ore la stampante riceve in media $3t$ lavori.

Chiamiamo poi $T$ il tempo, misurato in ore a partire da adesso, fino al prossimo evento. Vogliamo la sua distribuzione, e la otteniamo collegandola a $X_t$, che conosciamo già. Cominciamo dalla probabilità di dover aspettare **più** di $t$ ore. L’osservazione decisiva è che le due frasi

$$
\{T>t\}\qquad\text{«il prossimo evento arriva dopo l’istante } t\text{»}
$$

$$
\{X_t=0\}\qquad\text{«nell’intervallo da 0 a } t \text{ non arriva nessun evento»}
$$

descrivono **lo stesso evento**. Se il prossimo evento arriva dopo $t$, nell’intervallo $[0,t]$ non ne è arrivato nessuno; e se nell’intervallo non ne è arrivato nessuno, il prossimo arriverà dopo $t$. Due eventi uguali hanno la stessa probabilità, e la probabilità di zero eventi in una distribuzione di Poisson di media $\lambda t$ la conosciamo:

$$
P(T>t)=P(X_t=0)=e^{-\lambda t}\,\frac{(\lambda t)^0}{0!}=e^{-\lambda t}.
$$

Nel conto abbiamo usato $(\lambda t)^0=1$ e $0!=1$.

<figure markdown="0">
<svg viewBox="0 0 580 195" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Una linea del tempo da 0 in poi. Tra 0 e t c è una striscia verde senza arrivi; il primo arrivo, un pallino arancione, cade dopo t. Il tratto blu da 0 al primo arrivo è il tempo di attesa T.">
<defs><marker id="s06-tempo-freccia" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="currentColor"/></marker></defs>
<text x="290" y="20" text-anchor="middle" fill="currentColor" font-weight="bold">«Aspetto più di t» = «nessun arrivo in [0, t]»</text>
<rect x="60" y="55" width="250" height="40" fill="#2e9e5b" opacity="0.18"/>
<path d="M40 75H545" stroke="currentColor" stroke-width="2" marker-end="url(#s06-tempo-freccia)"/>
<line x1="60" y1="62" x2="60" y2="88" stroke="currentColor" stroke-width="2"/><text x="60" y="112" text-anchor="middle" fill="currentColor">0</text>
<line x1="310" y1="62" x2="310" y2="88" stroke="#2e9e5b" stroke-width="2" stroke-dasharray="4 3"/><text x="310" y="112" text-anchor="middle" fill="#2e9e5b" font-weight="bold">t</text>
<text x="185" y="50" text-anchor="middle" fill="#2e9e5b">nessun arrivo qui: probabilità e^(−λt)</text>
<circle cx="370" cy="75" r="7" fill="#e07a1f"/>
<circle cx="455" cy="75" r="7" fill="#e07a1f"/>
<circle cx="500" cy="75" r="7" fill="#e07a1f"/>
<text x="370" y="112" text-anchor="middle" fill="#e07a1f">primo arrivo</text>
<path d="M60 135H370" stroke="#4051b5" stroke-width="2"/><line x1="60" y1="128" x2="60" y2="142" stroke="#4051b5" stroke-width="2"/><line x1="370" y1="128" x2="370" y2="142" stroke="#4051b5" stroke-width="2"/>
<text x="215" y="155" text-anchor="middle" fill="#4051b5" font-weight="bold">T = tempo fino al primo arrivo</text>
<text x="290" y="182" text-anchor="middle" fill="currentColor">Arrivi in [0, t]: distribuzione di Poisson di media λt.</text>
</svg>
<figcaption>L’evento «T > t» coincide con «zero arrivi tra 0 e t». La probabilità di zero arrivi la conosciamo già dalla distribuzione di Poisson della Settimana 5.</figcaption>
</figure>

Dalla probabilità di aspettare più di $t$ ricaviamo subito la funzione di ripartizione di $T$, perché i due eventi $\{T\le t\}$ e $\{T>t\}$ sono complementari:

$$
F(t)=P(T\le t)=1-P(T>t)=1-e^{-\lambda t}\qquad\text{per } t\ge0,
$$

e $F(t)=0$ per $t<0$, perché un tempo di attesa non può essere negativo. Nota che abbiamo ottenuto la funzione di ripartizione senza calcolare nessuna area: ci è bastata la distribuzione di Poisson.

E la densità? Abbiamo detto che la densità è la derivata della funzione di ripartizione. Chi conosce le derivate può calcolarla: la derivata di 1 è zero, e la derivata di $e^{-\lambda t}$ è $-\lambda e^{-\lambda t}$, quindi

$$
f(t)=\frac{d}{dt}\Big(1-e^{-\lambda t}\Big)=0-\big(-\lambda e^{-\lambda t}\big)=\lambda e^{-\lambda t}\qquad\text{per } t\ge0,
$$

e $f(t)=0$ per $t<0$. Chi non conosce ancora le derivate può arrivare allo stesso risultato con l’approssimazione «altezza per larghezza». Perché il primo evento cada in un intervallino di durata $\Delta t$ subito dopo l’istante $t$, devono succedere due cose: fino a $t$ non deve arrivare nessun evento, e questo accade con probabilità $e^{-\lambda t}$; poi nell’intervallino deve arrivarne uno, e in un tempo così breve questo accade con probabilità circa $\lambda\,\Delta t$, cioè il tasso per la durata. Moltiplicando, la probabilità è circa $e^{-\lambda t}\cdot\lambda\,\Delta t$, e confrontando con $f(t)\cdot\Delta t$ l’altezza della densità è proprio $\lambda e^{-\lambda t}$.

Ebbene sì: la variabile continua che misura il tempo tra due eventi di Poisson ha un nome, e la sua distribuzione è la **distribuzione esponenziale** di parametro $\lambda$. Scriviamo $T\sim\operatorname{Exp}(\lambda)$. Riassumendo:

$$
f(t)=\begin{cases}\lambda e^{-\lambda t} & t\ge0\\ 0 & t<0\end{cases}
\qquad
F(t)=1-e^{-\lambda t}\ \ (t\ge0)
\qquad
P(T>t)=e^{-\lambda t}.
$$

Il parametro $\lambda$ è lo stesso della distribuzione di Poisson: il numero medio di eventi per unità di tempo.

<figure markdown="0">
<svg viewBox="0 0 580 225" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="A sinistra le densità esponenziali con lambda uguale a 0,5, 1 e 1,5: partono da altezza lambda e scendono; con lambda più grande la curva parte più in alto e scende più in fretta. A destra le funzioni di ripartizione: salgono da 0 verso 1, più rapidamente quando lambda è più grande.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">La distribuzione esponenziale per tre valori di λ</text>
<polyline points="45.0,153.1 46.4,153.9 47.8,154.6 49.2,155.3 50.6,156.0 52.0,156.6 53.4,157.3 54.8,158.0 56.2,158.6 57.7,159.3 59.1,159.9 60.5,160.5 61.9,161.1 63.3,161.7 64.7,162.3 66.1,162.9 67.5,163.5 68.9,164.1 70.3,164.6 71.7,165.2 73.1,165.7 74.5,166.2 75.9,166.8 77.3,167.3 78.8,167.8 80.2,168.3 81.6,168.8 83.0,169.3 84.4,169.7 85.8,170.2 87.2,170.7 88.6,171.1 90.0,171.6 91.4,172.0 92.8,172.4 94.2,172.9 95.6,173.3 97.0,173.7 98.4,174.1 99.8,174.5 101.2,174.9 102.7,175.3 104.1,175.7 105.5,176.1 106.9,176.4 108.3,176.8 109.7,177.2 111.1,177.5 112.5,177.9 113.9,178.2 115.3,178.5 116.7,178.9 118.1,179.2 119.5,179.5 120.9,179.8 122.3,180.2 123.8,180.5 125.2,180.8 126.6,181.1 128.0,181.4 129.4,181.6 130.8,181.9 132.2,182.2 133.6,182.5 135.0,182.8 136.4,183.0 137.8,183.3 139.2,183.5 140.6,183.8 142.0,184.1 143.4,184.3 144.8,184.5 146.2,184.8 147.7,185.0 149.1,185.3 150.5,185.5 151.9,185.7 153.3,185.9 154.7,186.1 156.1,186.4 157.5,186.6 158.9,186.8 160.3,187.0 161.7,187.2 163.1,187.4 164.5,187.6 165.9,187.8 167.3,188.0 168.8,188.1 170.2,188.3 171.6,188.5 173.0,188.7 174.4,188.9 175.8,189.0 177.2,189.2 178.6,189.4 180.0,189.5 181.4,189.7 182.8,189.9 184.2,190.0 185.6,190.2 187.0,190.3 188.4,190.5 189.8,190.6 191.2,190.8 192.7,190.9 194.1,191.1 195.5,191.2 196.9,191.3 198.3,191.5 199.7,191.6 201.1,191.7 202.5,191.9 203.9,192.0 205.3,192.1 206.7,192.2 208.1,192.3 209.5,192.5 210.9,192.6 212.3,192.7 213.8,192.8 215.2,192.9 216.6,193.0 218.0,193.1 219.4,193.2 220.8,193.4 222.2,193.5 223.6,193.6 225.0,193.7 226.4,193.8 227.8,193.9 229.2,193.9 230.6,194.0 232.0,194.1 233.4,194.2 234.8,194.3 236.2,194.4 237.7,194.5 239.1,194.6 240.5,194.7 241.9,194.7 243.3,194.8 244.7,194.9 246.1,195.0 247.5,195.1 248.9,195.1 250.3,195.2 251.7,195.3 253.1,195.4 254.5,195.4 255.9,195.5 257.3,195.6 258.8,195.6 260.2,195.7 261.6,195.8 263.0,195.8 264.4,195.9 265.8,196.0 267.2,196.0 268.6,196.1 270.0,196.2" fill="none" stroke="#e07a1f" stroke-width="2.5"/>
<polyline points="330.0,200.0 331.4,197.7 332.8,195.4 334.2,193.1 335.6,190.9 337.0,188.7 338.4,186.6 339.8,184.5 341.2,182.4 342.7,180.3 344.1,178.3 345.5,176.3 346.9,174.4 348.3,172.4 349.7,170.5 351.1,168.7 352.5,166.8 353.9,165.0 355.3,163.2 356.7,161.5 358.1,159.7 359.5,158.0 360.9,156.4 362.3,154.7 363.8,153.1 365.2,151.5 366.6,149.9 368.0,148.4 369.4,146.8 370.8,145.3 372.2,143.9 373.6,142.4 375.0,141.0 376.4,139.6 377.8,138.2 379.2,136.8 380.6,135.5 382.0,134.1 383.4,132.8 384.8,131.6 386.2,130.3 387.7,129.0 389.1,127.8 390.5,126.6 391.9,125.4 393.3,124.3 394.7,123.1 396.1,122.0 397.5,120.9 398.9,119.8 400.3,118.7 401.7,117.6 403.1,116.6 404.5,115.5 405.9,114.5 407.3,113.5 408.8,112.5 410.2,111.6 411.6,110.6 413.0,109.7 414.4,108.7 415.8,107.8 417.2,106.9 418.6,106.1 420.0,105.2 421.4,104.3 422.8,103.5 424.2,102.7 425.6,101.8 427.0,101.0 428.4,100.2 429.8,99.5 431.2,98.7 432.7,97.9 434.1,97.2 435.5,96.5 436.9,95.7 438.3,95.0 439.7,94.3 441.1,93.7 442.5,93.0 443.9,92.3 445.3,91.7 446.7,91.0 448.1,90.4 449.5,89.7 450.9,89.1 452.3,88.5 453.8,87.9 455.2,87.3 456.6,86.8 458.0,86.2 459.4,85.6 460.8,85.1 462.2,84.5 463.6,84.0 465.0,83.5 466.4,83.0 467.8,82.4 469.2,81.9 470.6,81.4 472.0,81.0 473.4,80.5 474.8,80.0 476.2,79.5 477.7,79.1 479.1,78.6 480.5,78.2 481.9,77.7 483.3,77.3 484.7,76.9 486.1,76.5 487.5,76.1 488.9,75.7 490.3,75.3 491.7,74.9 493.1,74.5 494.5,74.1 495.9,73.7 497.3,73.4 498.8,73.0 500.2,72.6 501.6,72.3 503.0,71.9 504.4,71.6 505.8,71.3 507.2,70.9 508.6,70.6 510.0,70.3 511.4,70.0 512.8,69.7 514.2,69.4 515.6,69.1 517.0,68.8 518.4,68.5 519.8,68.2 521.2,67.9 522.7,67.6 524.1,67.4 525.5,67.1 526.9,66.8 528.3,66.6 529.7,66.3 531.1,66.1 532.5,65.8 533.9,65.6 535.3,65.3 536.7,65.1 538.1,64.9 539.5,64.6 540.9,64.4 542.3,64.2 543.8,64.0 545.2,63.7 546.6,63.5 548.0,63.3 549.4,63.1 550.8,62.9 552.2,62.7 553.6,62.5 555.0,62.3" fill="none" stroke="#e07a1f" stroke-width="2.5"/>
<polyline points="45.0,106.2 46.4,109.1 47.8,111.9 49.2,114.6 50.6,117.3 52.0,119.8 53.4,122.3 54.8,124.7 56.2,127.0 57.7,129.2 59.1,131.4 60.5,133.5 61.9,135.6 63.3,137.5 64.7,139.5 66.1,141.3 67.5,143.1 68.9,144.9 70.3,146.6 71.7,148.2 73.1,149.8 74.5,151.4 75.9,152.9 77.3,154.3 78.8,155.7 80.2,157.1 81.6,158.4 83.0,159.7 84.4,160.9 85.8,162.1 87.2,163.3 88.6,164.4 90.0,165.5 91.4,166.6 92.8,167.6 94.2,168.6 95.6,169.6 97.0,170.5 98.4,171.4 99.8,172.3 101.2,173.1 102.7,174.0 104.1,174.8 105.5,175.5 106.9,176.3 108.3,177.0 109.7,177.7 111.1,178.4 112.5,179.1 113.9,179.7 115.3,180.3 116.7,181.0 118.1,181.5 119.5,182.1 120.9,182.7 122.3,183.2 123.8,183.7 125.2,184.2 126.6,184.7 128.0,185.2 129.4,185.6 130.8,186.1 132.2,186.5 133.6,186.9 135.0,187.3 136.4,187.7 137.8,188.1 139.2,188.4 140.6,188.8 142.0,189.1 143.4,189.5 144.8,189.8 146.2,190.1 147.7,190.4 149.1,190.7 150.5,191.0 151.9,191.3 153.3,191.5 154.7,191.8 156.1,192.1 157.5,192.3 158.9,192.5 160.3,192.8 161.7,193.0 163.1,193.2 164.5,193.4 165.9,193.6 167.3,193.8 168.8,194.0 170.2,194.2 171.6,194.4 173.0,194.5 174.4,194.7 175.8,194.9 177.2,195.0 178.6,195.2 180.0,195.3 181.4,195.5 182.8,195.6 184.2,195.8 185.6,195.9 187.0,196.0 188.4,196.1 189.8,196.2 191.2,196.4 192.7,196.5 194.1,196.6 195.5,196.7 196.9,196.8 198.3,196.9 199.7,197.0 201.1,197.1 202.5,197.2 203.9,197.3 205.3,197.3 206.7,197.4 208.1,197.5 209.5,197.6 210.9,197.7 212.3,197.7 213.8,197.8 215.2,197.9 216.6,197.9 218.0,198.0 219.4,198.1 220.8,198.1 222.2,198.2 223.6,198.2 225.0,198.3 226.4,198.3 227.8,198.4 229.2,198.4 230.6,198.5 232.0,198.5 233.4,198.6 234.8,198.6 236.2,198.7 237.7,198.7 239.1,198.7 240.5,198.8 241.9,198.8 243.3,198.9 244.7,198.9 246.1,198.9 247.5,199.0 248.9,199.0 250.3,199.0 251.7,199.1 253.1,199.1 254.5,199.1 255.9,199.1 257.3,199.2 258.8,199.2 260.2,199.2 261.6,199.2 263.0,199.3 264.4,199.3 265.8,199.3 267.2,199.3 268.6,199.3 270.0,199.4" fill="none" stroke="#8e44ad" stroke-width="2.5"/>
<polyline points="330.0,200.0 331.4,195.4 332.8,190.9 334.2,186.6 335.6,182.4 337.0,178.3 338.4,174.4 339.8,170.5 341.2,166.8 342.7,163.2 344.1,159.7 345.5,156.4 346.9,153.1 348.3,149.9 349.7,146.8 351.1,143.9 352.5,141.0 353.9,138.2 355.3,135.5 356.7,132.8 358.1,130.3 359.5,127.8 360.9,125.4 362.3,123.1 363.8,120.9 365.2,118.7 366.6,116.6 368.0,114.5 369.4,112.5 370.8,110.6 372.2,108.7 373.6,106.9 375.0,105.2 376.4,103.5 377.8,101.8 379.2,100.2 380.6,98.7 382.0,97.2 383.4,95.7 384.8,94.3 386.2,93.0 387.7,91.7 389.1,90.4 390.5,89.1 391.9,87.9 393.3,86.8 394.7,85.6 396.1,84.5 397.5,83.5 398.9,82.4 400.3,81.4 401.7,80.5 403.1,79.5 404.5,78.6 405.9,77.7 407.3,76.9 408.8,76.1 410.2,75.3 411.6,74.5 413.0,73.7 414.4,73.0 415.8,72.3 417.2,71.6 418.6,70.9 420.0,70.3 421.4,69.7 422.8,69.1 424.2,68.5 425.6,67.9 427.0,67.4 428.4,66.8 429.8,66.3 431.2,65.8 432.7,65.3 434.1,64.9 435.5,64.4 436.9,64.0 438.3,63.5 439.7,63.1 441.1,62.7 442.5,62.3 443.9,61.9 445.3,61.6 446.7,61.2 448.1,60.9 449.5,60.5 450.9,60.2 452.3,59.9 453.8,59.6 455.2,59.3 456.6,59.0 458.0,58.7 459.4,58.5 460.8,58.2 462.2,57.9 463.6,57.7 465.0,57.5 466.4,57.2 467.8,57.0 469.2,56.8 470.6,56.6 472.0,56.4 473.4,56.2 474.8,56.0 476.2,55.8 477.7,55.6 479.1,55.5 480.5,55.3 481.9,55.1 483.3,55.0 484.7,54.8 486.1,54.7 487.5,54.5 488.9,54.4 490.3,54.3 491.7,54.1 493.1,54.0 494.5,53.9 495.9,53.8 497.3,53.6 498.8,53.5 500.2,53.4 501.6,53.3 503.0,53.2 504.4,53.1 505.8,53.0 507.2,52.9 508.6,52.8 510.0,52.7 511.4,52.7 512.8,52.6 514.2,52.5 515.6,52.4 517.0,52.3 518.4,52.3 519.8,52.2 521.2,52.1 522.7,52.1 524.1,52.0 525.5,51.9 526.9,51.9 528.3,51.8 529.7,51.8 531.1,51.7 532.5,51.7 533.9,51.6 535.3,51.6 536.7,51.5 538.1,51.5 539.5,51.4 540.9,51.4 542.3,51.3 543.8,51.3 545.2,51.3 546.6,51.2 548.0,51.2 549.4,51.1 550.8,51.1 552.2,51.1 553.6,51.0 555.0,51.0" fill="none" stroke="#8e44ad" stroke-width="2.5"/>
<polyline points="45.0,59.4 46.4,65.8 47.8,72.0 49.2,77.8 50.6,83.4 52.0,88.8 53.4,93.9 54.8,98.7 56.2,103.3 57.7,107.8 59.1,112.0 60.5,116.0 61.9,119.9 63.3,123.5 64.7,127.0 66.1,130.4 67.5,133.6 68.9,136.6 70.3,139.5 71.7,142.3 73.1,144.9 74.5,147.5 75.9,149.9 77.3,152.2 78.8,154.3 80.2,156.4 81.6,158.4 83.0,160.3 84.4,162.2 85.8,163.9 87.2,165.5 88.6,167.1 90.0,168.6 91.4,170.1 92.8,171.4 94.2,172.7 95.6,174.0 97.0,175.2 98.4,176.3 99.8,177.4 101.2,178.4 102.7,179.4 104.1,180.4 105.5,181.3 106.9,182.1 108.3,182.9 109.7,183.7 111.1,184.5 112.5,185.2 113.9,185.9 115.3,186.5 116.7,187.1 118.1,187.7 119.5,188.3 120.9,188.8 122.3,189.3 123.8,189.8 125.2,190.3 126.6,190.7 128.0,191.1 129.4,191.6 130.8,191.9 132.2,192.3 133.6,192.7 135.0,193.0 136.4,193.3 137.8,193.6 139.2,193.9 140.6,194.2 142.0,194.5 143.4,194.7 144.8,195.0 146.2,195.2 147.7,195.4 149.1,195.6 150.5,195.8 151.9,196.0 153.3,196.2 154.7,196.4 156.1,196.5 157.5,196.7 158.9,196.8 160.3,197.0 161.7,197.1 163.1,197.3 164.5,197.4 165.9,197.5 167.3,197.6 168.8,197.7 170.2,197.8 171.6,197.9 173.0,198.0 174.4,198.1 175.8,198.2 177.2,198.3 178.6,198.4 180.0,198.4 181.4,198.5 182.8,198.6 184.2,198.6 185.6,198.7 187.0,198.8 188.4,198.8 189.8,198.9 191.2,198.9 192.7,199.0 194.1,199.0 195.5,199.1 196.9,199.1 198.3,199.2 199.7,199.2 201.1,199.2 202.5,199.3 203.9,199.3 205.3,199.3 206.7,199.4 208.1,199.4 209.5,199.4 210.9,199.4 212.3,199.5 213.8,199.5 215.2,199.5 216.6,199.5 218.0,199.6 219.4,199.6 220.8,199.6 222.2,199.6 223.6,199.6 225.0,199.7 226.4,199.7 227.8,199.7 229.2,199.7 230.6,199.7 232.0,199.7 233.4,199.7 234.8,199.7 236.2,199.8 237.7,199.8 239.1,199.8 240.5,199.8 241.9,199.8 243.3,199.8 244.7,199.8 246.1,199.8 247.5,199.8 248.9,199.8 250.3,199.9 251.7,199.9 253.1,199.9 254.5,199.9 255.9,199.9 257.3,199.9 258.8,199.9 260.2,199.9 261.6,199.9 263.0,199.9 264.4,199.9 265.8,199.9 267.2,199.9 268.6,199.9 270.0,199.9" fill="none" stroke="#4051b5" stroke-width="2.5"/>
<polyline points="330.0,200.0 331.4,193.1 332.8,186.6 334.2,180.3 335.6,174.4 337.0,168.7 338.4,163.2 339.8,158.0 341.2,153.1 342.7,148.4 344.1,143.9 345.5,139.6 346.9,135.5 348.3,131.6 349.7,127.8 351.1,124.3 352.5,120.9 353.9,117.6 355.3,114.5 356.7,111.6 358.1,108.7 359.5,106.1 360.9,103.5 362.3,101.0 363.8,98.7 365.2,96.5 366.6,94.3 368.0,92.3 369.4,90.4 370.8,88.5 372.2,86.8 373.6,85.1 375.0,83.5 376.4,81.9 377.8,80.5 379.2,79.1 380.6,77.7 382.0,76.5 383.4,75.3 384.8,74.1 386.2,73.0 387.7,71.9 389.1,70.9 390.5,70.0 391.9,69.1 393.3,68.2 394.7,67.4 396.1,66.6 397.5,65.8 398.9,65.1 400.3,64.4 401.7,63.7 403.1,63.1 404.5,62.5 405.9,61.9 407.3,61.4 408.8,60.9 410.2,60.4 411.6,59.9 413.0,59.4 414.4,59.0 415.8,58.6 417.2,58.2 418.6,57.8 420.0,57.5 421.4,57.1 422.8,56.8 424.2,56.5 425.6,56.2 427.0,55.9 428.4,55.6 429.8,55.4 431.2,55.1 432.7,54.9 434.1,54.7 435.5,54.5 436.9,54.3 438.3,54.1 439.7,53.9 441.1,53.7 442.5,53.5 443.9,53.4 445.3,53.2 446.7,53.1 448.1,52.9 449.5,52.8 450.9,52.7 452.3,52.5 453.8,52.4 455.2,52.3 456.6,52.2 458.0,52.1 459.4,52.0 460.8,51.9 462.2,51.8 463.6,51.7 465.0,51.7 466.4,51.6 467.8,51.5 469.2,51.4 470.6,51.4 472.0,51.3 473.4,51.3 474.8,51.2 476.2,51.1 477.7,51.1 479.1,51.0 480.5,51.0 481.9,50.9 483.3,50.9 484.7,50.9 486.1,50.8 487.5,50.8 488.9,50.8 490.3,50.7 491.7,50.7 493.1,50.7 494.5,50.6 495.9,50.6 497.3,50.6 498.8,50.5 500.2,50.5 501.6,50.5 503.0,50.5 504.4,50.4 505.8,50.4 507.2,50.4 508.6,50.4 510.0,50.4 511.4,50.4 512.8,50.3 514.2,50.3 515.6,50.3 517.0,50.3 518.4,50.3 519.8,50.3 521.2,50.3 522.7,50.2 524.1,50.2 525.5,50.2 526.9,50.2 528.3,50.2 529.7,50.2 531.1,50.2 532.5,50.2 533.9,50.2 535.3,50.2 536.7,50.2 538.1,50.1 539.5,50.1 540.9,50.1 542.3,50.1 543.8,50.1 545.2,50.1 546.6,50.1 548.0,50.1 549.4,50.1 550.8,50.1 552.2,50.1 553.6,50.1 555.0,50.1" fill="none" stroke="#4051b5" stroke-width="2.5"/>
<line x1="45" y1="200" x2="45" y2="40" stroke="currentColor"/>
<line x1="45" y1="200" x2="270" y2="200" stroke="currentColor"/>
<line x1="45.0" y1="200" x2="45.0" y2="204" stroke="currentColor"/><text x="45.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">0</text>
<line x1="90.0" y1="200" x2="90.0" y2="204" stroke="currentColor"/><text x="90.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">1</text>
<line x1="135.0" y1="200" x2="135.0" y2="204" stroke="currentColor"/><text x="135.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">2</text>
<line x1="180.0" y1="200" x2="180.0" y2="204" stroke="currentColor"/><text x="180.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">3</text>
<line x1="225.0" y1="200" x2="225.0" y2="204" stroke="currentColor"/><text x="225.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">4</text>
<line x1="270.0" y1="200" x2="270.0" y2="204" stroke="currentColor"/><text x="270.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">5</text>
<line x1="330" y1="200" x2="330" y2="40" stroke="currentColor"/>
<line x1="330" y1="200" x2="555" y2="200" stroke="currentColor"/>
<line x1="330.0" y1="200" x2="330.0" y2="204" stroke="currentColor"/><text x="330.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">0</text>
<line x1="375.0" y1="200" x2="375.0" y2="204" stroke="currentColor"/><text x="375.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">1</text>
<line x1="420.0" y1="200" x2="420.0" y2="204" stroke="currentColor"/><text x="420.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">2</text>
<line x1="465.0" y1="200" x2="465.0" y2="204" stroke="currentColor"/><text x="465.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">3</text>
<line x1="510.0" y1="200" x2="510.0" y2="204" stroke="currentColor"/><text x="510.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">4</text>
<line x1="555.0" y1="200" x2="555.0" y2="204" stroke="currentColor"/><text x="555.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">5</text>
<line x1="41" y1="153.1" x2="45" y2="153.1" stroke="currentColor"/><text x="38.0" y="157.1" text-anchor="end" fill="currentColor" font-size="10">0,5</text>
<line x1="41" y1="106.2" x2="45" y2="106.2" stroke="currentColor"/><text x="38.0" y="110.2" text-anchor="end" fill="currentColor" font-size="10">1,0</text>
<line x1="41" y1="59.4" x2="45" y2="59.4" stroke="currentColor"/><text x="38.0" y="63.4" text-anchor="end" fill="currentColor" font-size="10">1,5</text>
<line x1="326" y1="125.0" x2="555" y2="125.0" stroke="currentColor" stroke-dasharray="2 4" opacity="0.5"/><text x="323.0" y="129.0" text-anchor="end" fill="currentColor" font-size="10">0,5</text>
<line x1="326" y1="50.0" x2="555" y2="50.0" stroke="currentColor" stroke-dasharray="2 4" opacity="0.5"/><text x="323.0" y="54.0" text-anchor="end" fill="currentColor" font-size="10">1,0</text>
<text x="53.0" y="46.0" text-anchor="start" fill="currentColor" font-size="11">densità f(x) = λe<tspan baseline-shift="super" font-size="9">−λx</tspan></text>
<text x="338.0" y="46.0" text-anchor="start" fill="currentColor" font-size="11">ripartizione F(x) = 1 − e<tspan baseline-shift="super" font-size="9">−λx</tspan></text>
<text x="200.0" y="90.0" text-anchor="start" fill="#e07a1f" font-size="12" font-weight="bold">λ = 0,5</text>
<text x="200.0" y="108.0" text-anchor="start" fill="#8e44ad" font-size="12" font-weight="bold">λ = 1,0</text>
<text x="200.0" y="126.0" text-anchor="start" fill="#4051b5" font-size="12" font-weight="bold">λ = 1,5</text>
</svg>
<figcaption>Con λ più grande gli eventi sono più frequenti: la densità parte più in alto e scende più in fretta, e la funzione di ripartizione raggiunge prima valori vicini a 1. L’area sotto ogni densità resta 1.</figcaption>
</figure>

Guardiamo i grafici. La densità parte dal suo valore massimo, che è proprio $\lambda$, e scende: le attese brevi sono le più frequenti, quelle lunghe sono rare ma possibili. Con $\lambda$ più grande gli eventi sono più frequenti, la massa di probabilità si concentra vicino all’origine, la curva parte più in alto e scende più in fretta. La funzione di ripartizione parte da 0 e cresce verso 1, sempre più lentamente; con $\lambda$ grande la salita è più rapida. Il nome della distribuzione viene dalla forma di queste curve, entrambe costruite con la funzione esponenziale.

??? note "Approfondimento facoltativo — L’area sotto la densità esponenziale vale 1"
    Una buona verifica è controllare che la densità che abbiamo trovato abbia area totale 1, come deve essere per qualsiasi densità. Una primitiva di $\lambda e^{-\lambda t}$ è $-e^{-\lambda t}$, perché la sua derivata è $-(-\lambda)e^{-\lambda t}=\lambda e^{-\lambda t}$. Quindi

    $$
    \int_0^{+\infty}\lambda e^{-\lambda t}\,dt=\Big[-e^{-\lambda t}\Big]_0^{+\infty}=0-(-1)=1.
    $$

    Al limite superiore $e^{-\lambda t}$ tende a 0, perché $t$ cresce senza limite; al limite inferiore vale $e^0=1$. La verifica è positiva. Si può leggere anche senza integrali: l’area a sinistra di $t$ è $F(t)=1-e^{-\lambda t}$, che si avvicina a 1 quando $t$ diventa grande.

### Media e varianza {: #media-esponenziale }

Se una stampante riceve in media 3 lavori all’ora, quanto tempo passa in media tra un lavoro e il successivo? L’intuizione suggerisce un terzo d’ora, cioè 20 minuti, ed è corretta. In generale, la media e la varianza della distribuzione esponenziale sono

$$
\mathbb{E}[T]=\frac1\lambda,\qquad \operatorname{Var}(T)=\frac1{\lambda^2},\qquad \sigma=\frac1\lambda.
$$

Questa relazione chiarisce il significato di $\lambda$. Se $T$ è un tempo misurato in minuti, $\lambda$ è una **frequenza**, misurata in eventi al minuto. Se gli eventi arrivano in media ogni mezzo minuto, allora $\mathbb{E}[T]=0{,}5$ minuti e $\lambda=2$ eventi al minuto. Più il tasso è alto, più l’attesa media è breve. Curiosamente, nella distribuzione esponenziale la deviazione standard coincide con la media.

Come per la distribuzione geometrica, la media non è una scadenza. La probabilità di aspettare più della media è

$$
P\Big(T>\frac1\lambda\Big)=e^{-\lambda\cdot\frac1\lambda}=e^{-1}\approx0{,}37,
$$

più di una volta su tre, qualunque sia $\lambda$. Se la stampante riceve in media un lavoro ogni 20 minuti, in più di un caso su tre il lavoro successivo si fa attendere più di 20 minuti.

??? note "Approfondimento facoltativo — Perché la media è $1/\lambda$ e la varianza $1/\lambda^2$"
    Questo riquadro non fa parte del programma. Mostriamo due strade: la prima non usa integrali e si appoggia alla distribuzione geometrica; la seconda usa la definizione di valore atteso e l’integrazione per parti.

    **1. I pezzetti di tempo.** Come nella costruzione della distribuzione di Poisson ([Settimana 5, §11](../settimana_05/index.md#pezzetti)), dividiamo ogni unità di tempo in $n$ pezzetti di durata $1/n$, e supponiamo che in ciascun pezzetto arrivi un evento con probabilità $p=\lambda/n$, indipendentemente dagli altri. Il numero di pezzetti da aspettare fino al primo evento è allora una variabile geometrica di parametro $p=\lambda/n$, con media $1/p=n/\lambda$ pezzetti ([Settimana 5, §4](../settimana_05/index.md#media-geometrica)). Ogni pezzetto dura $1/n$, quindi il tempo medio è

    $$
    \frac{n}{\lambda}\cdot\frac1n=\frac1\lambda,
    $$

    qualunque sia $n$. Facendo crescere $n$ i pezzetti diventano infinitamente fitti e il tempo diventa continuo, ma la media resta $1/\lambda$. In questo senso la distribuzione esponenziale è la distribuzione geometrica vista con una lente d’ingrandimento infinita.

    **2. Con gli integrali.** Per definizione $\mathbb{E}[T]=\int_0^{\infty}t\,\lambda e^{-\lambda t}\,dt$. Usiamo l’integrazione per parti, $\int u\,dv=uv-\int v\,du$, con $u=t$ (quindi $du=dt$) e $dv=\lambda e^{-\lambda t}dt$ (quindi $v=-e^{-\lambda t}$):

    $$
    \mathbb{E}[T]=\Big[-t\,e^{-\lambda t}\Big]_0^{\infty}+\int_0^{\infty}e^{-\lambda t}\,dt.
    $$

    Il primo termine vale zero a entrambi gli estremi: in $t=0$ c’è il fattore $t$, e per $t\to\infty$ l’esponenziale decresce più in fretta di quanto $t$ cresca. Il secondo termine vale $\big[-\frac1\lambda e^{-\lambda t}\big]_0^{\infty}=\frac1\lambda$. Quindi $\mathbb{E}[T]=1/\lambda$.

    Per la varianza calcoliamo $\mathbb{E}[T^2]=\int_0^{\infty}t^2\lambda e^{-\lambda t}\,dt$, di nuovo per parti, con $u=t^2$ e $dv=\lambda e^{-\lambda t}dt$:

    $$
    \mathbb{E}[T^2]=\Big[-t^2e^{-\lambda t}\Big]_0^{\infty}+2\int_0^{\infty}t\,e^{-\lambda t}\,dt=0+\frac2\lambda\int_0^{\infty}t\,\lambda e^{-\lambda t}\,dt=\frac2\lambda\cdot\frac1\lambda=\frac2{\lambda^2}.
    $$

    Nel penultimo passaggio abbiamo moltiplicato e diviso per $\lambda$ per riconoscere l’integrale della media. Infine

    $$
    \operatorname{Var}(T)=\mathbb{E}[T^2]-\big(\mathbb{E}[T]\big)^2=\frac2{\lambda^2}-\frac1{\lambda^2}=\frac1{\lambda^2}.
    $$

Vediamo un esempio completo, ripreso dal libro di Michael Baron. A una stampante condivisa arrivano in media 3 lavori all’ora, in modo indipendente. Qual è il tempo medio tra un lavoro e il successivo, e qual è la probabilità che il prossimo lavoro arrivi entro 5 minuti?

Gli arrivi dei lavori sono eventi di Poisson, quindi il tempo $T$ fino al prossimo lavoro ha distribuzione esponenziale con $\lambda=3$ lavori all’ora. Il tempo medio è $\mathbb{E}[T]=1/3$ di ora, cioè 20 minuti. Per la seconda domanda bisogna fare attenzione alle unità di misura: il tasso è espresso in lavori all’ora, quindi anche il tempo va espresso in ore. Cinque minuti sono $5/60=1/12$ di ora, e

$$
P\Big(T\le\frac1{12}\Big)=F\Big(\frac1{12}\Big)=1-e^{-3\cdot\frac1{12}}=1-e^{-0{,}25}\approx0{,}221.
$$

L’errore tipico è scrivere $1-e^{-3\cdot5}$, mescolando un tasso all’ora con un tempo in minuti: il risultato sarebbe quasi 1, e direbbe che il lavoro arriva quasi certamente entro 5 minuti, mentre in media se ne aspettano 20.

#### Esplora: la forma di un’attesa {: #widget-esponenziale }

Nel widget $\lambda$ è il numero medio di eventi per unità di tempo; la curva tratteggiata è la stampante, con $\lambda=3$ lavori all’ora e il tempo in ore. Prima di muovere il cursore, prevedi: se il traffico raddoppia, che cosa succede all’altezza iniziale della curva e all’attesa media? Ricorda che l’area sotto la curva resta sempre 1.

<div class="psi-widget" id="s06-esponenziale"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  PSIWidget.mount('s06-esponenziale', {
    type: 'line', xLabel: 'Tempo di attesa t (ore)', yLabel: 'densità f(t)',
    xDomain: [0, 2], xSamples: 201, liveLabel: 'distribuzione esponenziale corrente',
    fn: function (t, p) { return p.lam * Math.exp(-p.lam * t); },
    params: [{key: 'lam', label: 'λ (eventi per ora)',
      min: 0.5, max: 8, step: 0.1, value: 3}],
    reference: {label: 'stampante: λ = 3', params: {lam: 3}},
    stats: function (p) { return [
      {label: 'E[T] = 1/λ (ore)', value: (1 / p.lam).toFixed(3)},
      {label: 'P(T ≤ 1/12) = 1 − e^(−λ/12)', value: (1 - Math.exp(-p.lam / 12)).toFixed(3)},
      {label: 'P(T > E[T]) = e^(−1)', value: Math.exp(-1).toFixed(3)}
    ]; },
    caption: 'Più eventi per ora: la curva parte più in alto e scende più in fretta, l\'attesa media si accorcia. L\'area resta 1.'
  });
});
</script>

Con $\lambda=6$ la curva parte da altezza 6 e l’attesa media si dimezza, da 20 a 10 minuti. Nota l’ultima riga: la probabilità di aspettare più della media è sempre $e^{-1}\approx0{,}368$, qualunque sia $\lambda$. Cambiare $\lambda$ cambia la **scala** del tempo, non la forma della curva.

### L’assenza di memoria {: #memoria }

Torniamo per un momento all’autobus uniforme. Alle 14:00 la probabilità che passi tra le 14:15 e le 14:20 era $5/30=1/6$. Ma se arriviamo alla fermata alle 14:15 e sappiamo che l’autobus non è ancora passato, la situazione è cambiata: restano soltanto 15 minuti possibili, e la probabilità che passi nei prossimi 5 è una probabilità condizionata,

$$
P(T\le20\mid T>15)=\frac{P(15<T\le20)}{P(T>15)}=\frac{5/30}{15/30}=\frac13.
$$

L’attesa già trascorsa conta: più aspettiamo senza vedere l’autobus, più il suo arrivo si avvicina. L’autobus uniforme ha **memoria**.

La distribuzione esponenziale si comporta in modo completamente diverso. Gode della proprietà di **assenza di memoria** (in inglese *memoryless property*): se il tempo di attesa ha già superato $t$, la probabilità di dover aspettare ancora almeno $u$ è la stessa che avevamo all’inizio, come se l’attesa fosse appena cominciata. In formula, una variabile $T\ge0$ è senza memoria se, per ogni $t,u>0$,

$$
P(T>t+u\mid T>t)=P(T>u).
$$

Qui $t$ è il tempo già trascorso e $u$ il tempo aggiuntivo. Se ti suona strano, guarda che cosa significa in termini di conti: diventa quasi ovvio.

Per comodità diamo un nome alla probabilità di superare una soglia: la funzione $S(t)=P(T>t)=1-F(t)$ si chiama **funzione di sopravvivenza**, perché, se $T$ è la durata di un componente, $S(t)$ è la probabilità che il componente sia ancora in funzione all’istante $t$. Per la distribuzione esponenziale $S(t)=e^{-\lambda t}$.

Partiamo dalla definizione di probabilità condizionata:

$$
P(T>t+u\mid T>t)=\frac{P\big(\{T>t+u\}\cap\{T>t\}\big)}{P(T>t)}.
$$

Al numeratore c’è l’intersezione di due eventi. Ma se il tempo di attesa supera $t+u$, a maggior ragione supera $t$: l’evento $\{T>t+u\}$ è contenuto nell’evento $\{T>t\}$, e la loro intersezione è semplicemente $\{T>t+u\}$. Quindi

$$
P(T>t+u\mid T>t)=\frac{P(T>t+u)}{P(T>t)}=\frac{S(t+u)}{S(t)}.
$$

Fin qui non abbiamo usato nessuna proprietà dell’esponenziale: il conto vale per ogni tempo di attesa. Per la distribuzione esponenziale inseriamo $S(t)=e^{-\lambda t}$ e usiamo la regola delle potenze $e^{a}/e^{b}=e^{a-b}$:

$$
\frac{S(t+u)}{S(t)}=\frac{e^{-\lambda(t+u)}}{e^{-\lambda t}}=e^{-\lambda(t+u)+\lambda t}=e^{-\lambda u}=S(u)=P(T>u).
$$

Il tempo già trascorso $t$ è sparito dal conto. La probabilità condizionata che il tempo di attesa superi $t+u$, sapendo che ha già superato $t$, non dipende da quanto si è già atteso.

Il motivo profondo è lo stesso che abbiamo visto con la distribuzione geometrica nella Settimana 5: gli eventi che arriveranno nei prossimi istanti sono indipendenti da quelli passati, quindi un lungo silenzio non rende il prossimo evento «più vicino». La distribuzione esponenziale è l’analogo continuo della distribuzione geometrica, e come lei è speciale: si può dimostrare che è l’**unica** distribuzione continua di tempi positivi senza memoria. La distribuzione uniforme dell’autobus, come abbiamo appena visto, la memoria ce l’ha.

Ecco un esempio d’esame. Il signor Rossi pensa che la durata di vita di un’automobile, misurata in migliaia di chilometri, sia una variabile aleatoria esponenziale di parametro $\lambda=1/20$. Decide di acquistare un’auto usata che ha già percorso 10 000 km. Con quale probabilità potrà percorrere altri 20 000 km prima che l’auto sia da buttare?

Chiamiamo $X$ la durata dell’auto in migliaia di chilometri, con $X\sim\operatorname{Exp}(1/20)$, e quindi $S(x)=e^{-x/20}$. Ci viene chiesta la probabilità condizionata che l’auto superi i 30 000 km sapendo che ha superato i 10 000. Per l’assenza di memoria,

$$
P(X>30\mid X>10)=P(X>20)=S(20)=e^{-20/20}=e^{-1}\approx0{,}37.
$$

I 10 000 km già percorsi non contano: per il signor Rossi l’auto usata vale quanto un’auto nuova. È una conclusione che dovrebbe insospettirci. Un’auto reale si usura, e un’auto con molti chilometri si guasta più facilmente di una nuova: ha memoria. Il risultato non è sbagliato come conto, ma ci dice che il modello esponenziale, per un oggetto che invecchia, è probabilmente il modello sbagliato. Prima di usare $e^{-\lambda t}$ conviene sempre chiedersi se il sistema che stiamo descrivendo invecchia.

!!! example "Sosta di verifica"
    Il tempo, in ore, necessario per riparare un macchinario è una variabile aleatoria esponenziale di parametro $\lambda=1$. Qual è la probabilità che la riparazione superi le due ore? Qual è la probabilità che richieda almeno tre ore, sapendo che ne richiede più di due?

    ??? esempio-svolto "Risposta"
        Chiamiamo $Z$ il tempo di riparazione, con $Z\sim\operatorname{Exp}(1)$ e $S(z)=e^{-z}$. La prima probabilità è $P(Z>2)=S(2)=e^{-2}\approx0{,}135$. Per la seconda, l’assenza di memoria dà $P(Z>3\mid Z>2)=P(Z>1)=S(1)=e^{-1}\approx0{,}368$. Le due ore già trascorse non accorciano né allungano il lavoro che resta.

### La distribuzione esponenziale nei sistemi informatici {: #esponenziale-informatica }

La distribuzione esponenziale compare ogni volta che si aspetta un evento che arriva senza preavviso e senza invecchiamento. Nella **teoria delle code**, che studia server, sportelli e sistemi di prenotazione, il tempo tra due richieste di molti client indipendenti si modella con una distribuzione esponenziale: è il compagno naturale della distribuzione di Poisson che conta le richieste. Nell’**affidabilità** dei sistemi, il tempo fino al guasto di un componente che non si usura, come certi circuiti elettronici durante la loro vita utile, è descritto bene dalla distribuzione esponenziale. Nelle **simulazioni**, infine, i tempi tra eventi casuali, come gli arrivi di pacchetti in una rete, si generano proprio campionando da una distribuzione esponenziale.

La stessa distribuzione aiuta a ragionare sui timeout. Se il tempo di risposta di un servizio segue una distribuzione esponenziale con $\lambda=3$ al secondo, cioè con una media di un terzo di secondo, un client che aspetta al massimo un secondo resta a mani vuote con probabilità $P(T>1)=e^{-3}\approx0{,}05$, una volta su venti. Per scendere sotto l’1% serve un timeout $t$ con $e^{-3t}<0{,}01$, cioè $t>\ln(100)/3\approx1{,}54$ secondi; qui $\ln$ è il logaritmo naturale, l’operazione inversa dell’esponenziale.

Valgono anche gli stessi avvertimenti dell’auto del signor Rossi. Un disco meccanico si usura, e dopo cinque anni di lavoro è più probabile che si guasti nel mese successivo rispetto a un disco nuovo; il traffico di un sito spesso arriva a raffiche, non con un ritmo costante. In questi casi le ipotesi da cui abbiamo ricavato la distribuzione esponenziale, cioè eventi indipendenti e tasso costante, non valgono più, e il modello va cambiato.

### Laboratorio: attese simulate {: #lab-esponenziale }

Il primo script genera molte attese esponenziali e le confronta con la teoria. Una nota su NumPy: la funzione `rng.exponential` non riceve il tasso $\lambda$ ma la **scala**, cioè la media $1/\lambda$; è un errore frequente passarle $\lambda$. Lo script calcola la media delle attese, controlla la coda $e^{-\lambda t}$ per qualche soglia, verifica l’assenza di memoria e disegna l’istogramma delle attese con l’opzione `density=True`, che usa come altezza delle barre proprio «frequenza diviso larghezza», come nell’Atto II. Sopra l’istogramma disegna la densità $\lambda e^{-\lambda t}$.

<div class="psi-exec" markdown="1">
```python
import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(2026)

LAMBDA = 3.0          # lavori all'ora, in media
N = 100_000           # attese simulate

# Attenzione: NumPy vuole la scala 1/lambda, non il tasso lambda.
attese = rng.exponential(scale=1 / LAMBDA, size=N)
print(f"Attesa media: {attese.mean():.4f} ore   (1/lambda = {1 / LAMBDA:.4f})")

print("  t     P(T > t) simulata   e^(-lambda t)")
for t in [1 / 12, 1 / 3, 1.0]:
    print(f"{t:5.3f}   {np.mean(attese > t):17.4f}   {np.exp(-LAMBDA * t):13.4f}")

# Assenza di memoria: tra le attese già oltre mezz'ora, quante
# superano mezz'ora + 20 minuti? Deve somigliare a P(T > 20 minuti).
lunghe = attese[attese > 0.5]
print(f"P(T > 0,5 + 1/3 | T > 0,5) = {np.mean(lunghe > 0.5 + 1 / 3):.4f}")
print(f"P(T > 1/3)                 = {np.mean(attese > 1 / 3):.4f}")

# Istogramma con altezza = frequenza / larghezza, e la densità teorica.
t = np.linspace(0, 2, 300)
plt.hist(attese, bins=80, range=(0, 2), density=True, alpha=0.6,
         label="Attese simulate")
plt.plot(t, LAMBDA * np.exp(-LAMBDA * t), label="densità λe^(−λt)")
plt.xlabel("Tempo di attesa (ore)")
plt.ylabel("Densità")
plt.legend()
plt.tight_layout()
plt.show()
```
</div>

Con il seme fissato, la media delle attese è vicinissima a $1/3$ di ora, le code simulate sono vicine a 0,779 (il complemento dello 0,221 trovato per la stampante), a 0,368 e a 0,050, e le due righe sull’assenza di memoria danno lo stesso numero, circa 0,37: le attese che sono già durate mezz’ora si comportano come attese appena cominciate. L’istogramma segue la curva della densità. Prova a cambiare `LAMBDA` in `6.0`: l’attesa media si dimezza e la curva parte da altezza 6.

## Atto VI — L’asteroide perduto {: #cerere }

La notte del primo gennaio 1801, all’osservatorio di Palermo, l’astronomo **Giuseppe Piazzi** nota un puntino luminoso che non compare nei cataloghi delle stelle e che, notte dopo notte, si sposta. È un corpo celeste nuovo, che verrà chiamato **Cerere**: oggi sappiamo che è il più grande oggetto della fascia degli asteroidi, tra Marte e Giove.

Piazzi lo segue fino all’11 febbraio. Poi Cerere si avvicina, nel cielo, alla direzione del Sole, e il bagliore del Sole lo nasconde. Per ritrovarlo bisogna sapere dove puntare il telescopio quando riemergerà, mesi dopo, in una zona di cielo lontana da quella in cui era stato visto per l’ultima volta. Ma le osservazioni coprono appena 41 giorni, e ogni misura di posizione contiene un piccolo **errore**: lo strumento, l’orologio, l’aria, l’occhio dell’osservatore. Gli astronomi d’Europa provano a calcolarne l’orbita, senza successo.

Il giovane **Carl Friedrich Gauss**, che ha 24 anni, racconta nella prefazione della sua *Theoria motus* (1809) perché il problema lo appassionò:

> «[…] l’orbita del pianeta Cerere, che in questi quarantuno giorni aveva descritto un arco geocentrico di soli tre gradi, e che dopo un anno doveva essere cercato in una regione del cielo molto lontana da quella in cui era stato visto per l’ultima volta.»
> — C. F. Gauss, *Theoria motus corporum coelestium*, 1809, prefazione, p. xv della traduzione inglese di C. H. Davis (1857), tradotto dall’inglese

Gauss calcola l’orbita nell’autunno del 1801 con un metodo nuovo, pensato per mettere d’accordo molte osservazioni imprecise. E, scrive, «la prima notte serena in cui il pianeta fu cercato seguendo i numeri ricavati» lo restituì all’osservazione. In una nota indica chi lo cercò e quando: l’astronomo **Franz Xaver von Zach**, il 7 dicembre 1801.

Il cuore del metodo di Gauss è una domanda di probabilità: con quale probabilità una misura sbaglia di una certa quantità? Che gli errori piccoli siano frequenti e quelli grandi rari, e che gli errori in eccesso e in difetto siano ugualmente probabili, lo pensavano tutti. Ma con quale curva, esattamente, si distribuiscono? Gauss non la ricava dalla fisica del telescopio. Parte da un’abitudine che tutti gli astronomi già seguivano: quando si misura più volte la stessa grandezza, si prende la **media aritmetica** delle misure. Nella *Theoria motus* lo dice così:

> «È consuetudine considerare come un assioma l’ipotesi che, se una grandezza è stata determinata con più osservazioni dirette, fatte nelle stesse circostanze e con uguale cura, la media aritmetica dei valori osservati fornisca il valore più probabile, se non rigorosamente, almeno con grande approssimazione.»
> — C. F. Gauss, *Theoria motus*, 1809, libro II, sezione III, art. 177 (pp. 258–259 della traduzione di Davis, tradotto dall’inglese)

Poi si chiede: quale curva degli errori rende la media aritmetica, sempre, il valore più probabile? La risposta, con un conto che lasciamo ai libri, è una sola: una curva a forma di campana, simmetrica attorno all’errore zero, proporzionale a $e^{-h^2x^2}$, dove $x$ è l’errore e $h$ una costante che Gauss chiama «misura della precisione». È la curva che oggi porta il suo nome. Dalla stessa curva Gauss ricava il **metodo dei minimi quadrati**, con cui calcola le orbite; lo ricostruiamo nella [Lettura C](#minimi-quadrati). Gauss è anche onesto sui limiti del suo modello: nell’articolo successivo osserva che questa curva non può descrivere rigorosamente gli errori reali, che non sono mai infinitamente grandi. È un modello, e funziona straordinariamente bene.

??? note "Approfondimento facoltativo — Prima di Gauss: De Moivre e le monete"
    La stessa curva era già apparsa quasi settant’anni prima, in un contesto del tutto diverso. Nel 1733 **Abraham De Moivre**, un matematico francese emigrato a Londra, cercava un modo per approssimare le probabilità della distribuzione binomiale quando il numero di lanci di una moneta è enorme e i conti esatti sono impraticabili. Lo considerava

    > «il problema più difficile che si possa proporre in materia di probabilità»
    > — A. De Moivre, *The Doctrine of Chances*, 3ª ed., 1756, p. 242 (tradotto dall’inglese)

    e la sua soluzione, stampata il 12 novembre 1733 e ripubblicata nel libro, contiene un fattore della forma $e^{-x^2/2}$. Gli istogrammi della distribuzione binomiale con $n$ grande, che hai visto nel [widget della Settimana 4](../settimana_04/index.md#widget-binomiale), hanno proprio questa forma a campana.

    Due strade indipendenti, i lanci di moneta di De Moivre e gli errori di misura di Gauss, arrivano alla stessa curva. Non è un caso: in entrambe le situazioni il risultato è la **somma di tanti piccoli contributi indipendenti**, i singoli lanci in un caso, i singoli disturbi nell’altro. Perché una somma di questo tipo produca sempre una campana lo spiegherà il Teorema del Limite Centrale, nella Settimana 9.

## Atto VII — La distribuzione normale {: #normale }

### La campana e i suoi due parametri {: #densita-normale }

La distribuzione che descrive gli errori di Gauss si chiama oggi **distribuzione normale**, o **gaussiana**. Gauss aveva notato che gli errori di misura, pur essendo casuali, tendono a distribuirsi in modo simmetrico attorno al valore corretto; la distribuzione normale descrive in generale le grandezze che si concentrano attorno a un valore medio e se ne allontanano sempre più di rado. È una distribuzione continua, che può assumere qualsiasi valore reale; la sua densità ha la forma di una campana simmetrica, con la cima al centro e due code che si estendono all’infinito da entrambi i lati, sempre più basse ma mai nulle. Oltre agli errori di misura, si usa come prima approssimazione per molte grandezze fisiche: l’altezza delle persone, il peso, la temperatura media di una città, la tensione di un circuito.

La distribuzione normale dipende da due parametri: il valore atteso, indicato con la lettera greca $\mu$ («mu»), e la varianza, indicata con $\sigma^2$ («sigma quadro»). Si scrive

$$
X\sim\mathcal{N}(\mu,\sigma^2),
$$

dove la $\mathcal{N}$ sta per «normale». Attenzione alla notazione: molti testi, molte librerie e anche alcune slide scrivono $\mathcal{N}(\mu,\sigma)$, mettendo al secondo posto la **deviazione standard** invece della varianza. Per non sbagliare, negli esercizi conviene scrivere sempre il nome del parametro, per esempio $X\sim\mathcal{N}(\mu=170,\ \sigma=10)$, oppure $\mathcal{N}(\mu=3,\ \sigma^2=16)$.

Ecco il nostro esempio per tutta la seconda parte. L’altezza degli esseri umani adulti di una certa popolazione è approssimativamente normale, con media 170 cm e deviazione standard 10 cm: $X\sim\mathcal{N}(\mu=170,\ \sigma=10)$, cioè con varianza $\sigma^2=100\ \text{cm}^2$. Questo significa, come vedremo, che la maggior parte delle persone ha un’altezza compresa tra 160 e 180 cm.

La densità della distribuzione normale è

$$
f(x)=\frac{1}{\sigma\sqrt{2\pi}}\;e^{-\frac{(x-\mu)^2}{2\sigma^2}}\qquad\text{per ogni } x \text{ reale.}
$$

La formula sembra minacciosa, ma si legge un pezzo alla volta, partendo dall’esponente. La quantità $x-\mu$ è la distanza del punto $x$ dal centro $\mu$. Elevata al quadrato diventa positiva e prende lo stesso valore per due punti alla stessa distanza dal centro, uno a destra e uno a sinistra: per questo la curva è **simmetrica** attorno a $\mu$. Il segno meno davanti fa sì che, più $x$ è lontano da $\mu$, più l’esponente è negativo e più $e^{(\cdots)}$ è piccolo: la curva ha il suo massimo in $x=\mu$ e scende ai lati, e scende in fretta, perché nell’esponente c’è il quadrato della distanza. Il denominatore $2\sigma^2$ fissa la scala: misura le distanze in unità di $\sigma$, così che con $\sigma$ grande bisogna allontanarsi molto prima che la curva cali. Infine la costante davanti, $1/(\sigma\sqrt{2\pi})$, serve soltanto a rendere l’area totale uguale a 1. Per ricordare la forma basta tenere a mente la parte che conta:

$$
f(x)\;\propto\;\frac1\sigma\cdot\exp\!\left[-\frac{(x-\mu)^2}{2\sigma^2}\right],
$$

dove il simbolo $\propto$ si legge «è proporzionale a» e $\exp[\cdots]$ è un altro modo di scrivere $e^{(\cdots)}$.

I due parametri hanno un significato geometrico preciso. **$\mu$ è il centro**: è la posizione del vertice della campana e, per la simmetria, anche il suo baricentro, quindi $\mathbb{E}[X]=\mu$. Cambiare $\mu$ trasla la campana a destra o a sinistra, senza deformarla. **$\sigma$ è la larghezza**: è la deviazione standard, quindi $\operatorname{Var}(X)=\sigma^2$, e si misura nelle stesse unità di $X$, centimetri nel nostro esempio. C’è anche un segno visibile di $\sigma$ sul grafico: nei punti $\mu-\sigma$ e $\mu+\sigma$ la campana smette di curvarsi verso il basso e comincia a curvarsi verso l’alto. Sono i suoi **punti di flesso**, e a occhio $\sigma$ è la distanza dal centro di questi due «gomiti». Se $\sigma$ cresce la campana si allarga; ma l’area deve restare 1, quindi allargandosi **si abbassa**. L’altezza del picco è $1/(\sigma\sqrt{2\pi})$: circa 0,40 con $\sigma=1$, circa 0,040 con $\sigma=10$.

<figure markdown="0">
<svg viewBox="0 0 580 232" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="A sinistra tre campane identiche centrate in mu uno, mu due, mu tre: cambiare mu sposta la curva senza deformarla. A destra tre campane con lo stesso centro e sigma crescente: la più stretta è la più alta, la più larga la più bassa.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">Che cosa fanno μ e σ alla campana</text>
<polyline points="25.0,189.7 26.6,189.6 28.2,189.5 29.8,189.4 31.4,189.2 33.0,189.0 34.6,188.7 36.2,188.4 37.7,188.0 39.3,187.5 40.9,187.0 42.5,186.3 44.1,185.5 45.7,184.5 47.3,183.4 48.9,182.1 50.5,180.6 52.1,178.8 53.7,176.8 55.3,174.6 56.9,172.0 58.5,169.1 60.1,166.0 61.7,162.5 63.2,158.7 64.8,154.5 66.4,150.0 68.0,145.2 69.6,140.1 71.2,134.7 72.8,129.1 74.4,123.3 76.0,117.4 77.6,111.4 79.2,105.3 80.8,99.3 82.4,93.4 84.0,87.8 85.6,82.3 87.2,77.3 88.8,72.6 90.3,68.5 91.9,64.9 93.5,62.0 95.1,59.7 96.7,58.1 98.3,57.2 99.9,57.1 101.5,57.7 103.1,59.0 104.7,61.1 106.3,63.9 107.9,67.2 109.5,71.2 111.1,75.7 112.7,80.6 114.2,85.9 115.8,91.5 117.4,97.3 119.0,103.3 120.6,109.3 122.2,115.4 123.8,121.4 125.4,127.2 127.0,132.9 128.6,138.3 130.2,143.5 131.8,148.4 133.4,153.0 135.0,157.3 136.6,161.2 138.2,164.8 139.8,168.1 141.3,171.1 142.9,173.7 144.5,176.1 146.1,178.2 147.7,180.0 149.3,181.6 150.9,183.0 152.5,184.2 154.1,185.2 155.7,186.0 157.3,186.8 158.9,187.4 160.5,187.9 162.1,188.3 163.7,188.6 165.2,188.9 166.8,189.1 168.4,189.3 170.0,189.5 171.6,189.6 173.2,189.7 174.8,189.8 176.4,189.8 178.0,189.9 179.6,189.9 181.2,189.9 182.8,189.9 184.4,190.0 186.0,190.0 187.6,190.0 189.2,190.0 190.8,190.0 192.3,190.0 193.9,190.0 195.5,190.0 197.1,190.0 198.7,190.0 200.3,190.0 201.9,190.0 203.5,190.0 205.1,190.0 206.7,190.0 208.3,190.0 209.9,190.0 211.5,190.0 213.1,190.0 214.7,190.0 216.2,190.0 217.8,190.0 219.4,190.0 221.0,190.0 222.6,190.0 224.2,190.0 225.8,190.0 227.4,190.0 229.0,190.0 230.6,190.0 232.2,190.0 233.8,190.0 235.4,190.0 237.0,190.0 238.6,190.0 240.2,190.0 241.8,190.0 243.3,190.0 244.9,190.0 246.5,190.0 248.1,190.0 249.7,190.0 251.3,190.0 252.9,190.0 254.5,190.0 256.1,190.0 257.7,190.0 259.3,190.0 260.9,190.0 262.5,190.0 264.1,190.0 265.7,190.0 267.2,190.0 268.8,190.0 270.4,190.0 272.0,190.0 273.6,190.0 275.2,190.0 276.8,190.0 278.4,190.0 280.0,190.0" fill="none" stroke="#4051b5" stroke-width="2.3"/>
<line x1="99.4" y1="190" x2="99.4" y2="57.0" stroke="currentColor" stroke-dasharray="3 3" opacity="0.6"/>
<polyline points="25.0,190.0 26.6,190.0 28.2,190.0 29.8,190.0 31.4,190.0 33.0,190.0 34.6,190.0 36.2,190.0 37.7,190.0 39.3,190.0 40.9,190.0 42.5,190.0 44.1,190.0 45.7,190.0 47.3,190.0 48.9,190.0 50.5,190.0 52.1,190.0 53.7,190.0 55.3,190.0 56.9,190.0 58.5,190.0 60.1,190.0 61.7,190.0 63.2,190.0 64.8,190.0 66.4,190.0 68.0,190.0 69.6,189.9 71.2,189.9 72.8,189.9 74.4,189.8 76.0,189.8 77.6,189.7 79.2,189.7 80.8,189.6 82.4,189.4 84.0,189.3 85.6,189.1 87.2,188.8 88.8,188.5 90.3,188.2 91.9,187.7 93.5,187.2 95.1,186.5 96.7,185.8 98.3,184.9 99.9,183.8 101.5,182.5 103.1,181.1 104.7,179.4 106.3,177.5 107.9,175.3 109.5,172.9 111.1,170.1 112.7,167.1 114.2,163.7 115.8,160.0 117.4,155.9 119.0,151.5 120.6,146.8 122.2,141.8 123.8,136.5 125.4,131.0 127.0,125.3 128.6,119.4 130.2,113.4 131.8,107.3 133.4,101.3 135.0,95.4 136.6,89.6 138.2,84.1 139.8,78.9 141.3,74.1 142.9,69.8 144.5,66.0 146.1,62.9 147.7,60.3 149.3,58.5 150.9,57.4 152.5,57.0 154.1,57.4 155.7,58.5 157.3,60.3 158.9,62.9 160.5,66.0 162.1,69.8 163.7,74.1 165.2,78.9 166.8,84.1 168.4,89.6 170.0,95.4 171.6,101.3 173.2,107.3 174.8,113.4 176.4,119.4 178.0,125.3 179.6,131.0 181.2,136.5 182.8,141.8 184.4,146.8 186.0,151.5 187.6,155.9 189.2,160.0 190.8,163.7 192.3,167.1 193.9,170.1 195.5,172.9 197.1,175.3 198.7,177.5 200.3,179.4 201.9,181.1 203.5,182.5 205.1,183.8 206.7,184.9 208.3,185.8 209.9,186.5 211.5,187.2 213.1,187.7 214.7,188.2 216.2,188.5 217.8,188.8 219.4,189.1 221.0,189.3 222.6,189.4 224.2,189.6 225.8,189.7 227.4,189.7 229.0,189.8 230.6,189.8 232.2,189.9 233.8,189.9 235.4,189.9 237.0,190.0 238.6,190.0 240.2,190.0 241.8,190.0 243.3,190.0 244.9,190.0 246.5,190.0 248.1,190.0 249.7,190.0 251.3,190.0 252.9,190.0 254.5,190.0 256.1,190.0 257.7,190.0 259.3,190.0 260.9,190.0 262.5,190.0 264.1,190.0 265.7,190.0 267.2,190.0 268.8,190.0 270.4,190.0 272.0,190.0 273.6,190.0 275.2,190.0 276.8,190.0 278.4,190.0 280.0,190.0" fill="none" stroke="#4051b5" stroke-width="2.3"/>
<line x1="152.5" y1="190" x2="152.5" y2="57.0" stroke="currentColor" stroke-dasharray="3 3" opacity="0.6"/>
<polyline points="25.0,190.0 26.6,190.0 28.2,190.0 29.8,190.0 31.4,190.0 33.0,190.0 34.6,190.0 36.2,190.0 37.7,190.0 39.3,190.0 40.9,190.0 42.5,190.0 44.1,190.0 45.7,190.0 47.3,190.0 48.9,190.0 50.5,190.0 52.1,190.0 53.7,190.0 55.3,190.0 56.9,190.0 58.5,190.0 60.1,190.0 61.7,190.0 63.2,190.0 64.8,190.0 66.4,190.0 68.0,190.0 69.6,190.0 71.2,190.0 72.8,190.0 74.4,190.0 76.0,190.0 77.6,190.0 79.2,190.0 80.8,190.0 82.4,190.0 84.0,190.0 85.6,190.0 87.2,190.0 88.8,190.0 90.3,190.0 91.9,190.0 93.5,190.0 95.1,190.0 96.7,190.0 98.3,190.0 99.9,190.0 101.5,190.0 103.1,190.0 104.7,190.0 106.3,190.0 107.9,190.0 109.5,190.0 111.1,190.0 112.7,190.0 114.2,190.0 115.8,190.0 117.4,190.0 119.0,190.0 120.6,190.0 122.2,189.9 123.8,189.9 125.4,189.9 127.0,189.9 128.6,189.8 130.2,189.8 131.8,189.7 133.4,189.6 135.0,189.5 136.6,189.3 138.2,189.1 139.8,188.9 141.3,188.6 142.9,188.3 144.5,187.9 146.1,187.4 147.7,186.8 149.3,186.0 150.9,185.2 152.5,184.2 154.1,183.0 155.7,181.6 157.3,180.0 158.9,178.2 160.5,176.1 162.1,173.7 163.7,171.1 165.2,168.1 166.8,164.8 168.4,161.2 170.0,157.3 171.6,153.0 173.2,148.4 174.8,143.5 176.4,138.3 178.0,132.9 179.6,127.2 181.2,121.4 182.8,115.4 184.4,109.3 186.0,103.3 187.6,97.3 189.2,91.5 190.8,85.9 192.3,80.6 193.9,75.7 195.5,71.2 197.1,67.2 198.7,63.9 200.3,61.1 201.9,59.0 203.5,57.7 205.1,57.1 206.7,57.2 208.3,58.1 209.9,59.7 211.5,62.0 213.1,64.9 214.7,68.5 216.2,72.6 217.8,77.3 219.4,82.3 221.0,87.8 222.6,93.4 224.2,99.3 225.8,105.3 227.4,111.4 229.0,117.4 230.6,123.3 232.2,129.1 233.8,134.7 235.4,140.1 237.0,145.2 238.6,150.0 240.2,154.5 241.8,158.7 243.3,162.5 244.9,166.0 246.5,169.1 248.1,172.0 249.7,174.6 251.3,176.8 252.9,178.8 254.5,180.6 256.1,182.1 257.7,183.4 259.3,184.5 260.9,185.5 262.5,186.3 264.1,187.0 265.7,187.5 267.2,188.0 268.8,188.4 270.4,188.7 272.0,189.0 273.6,189.2 275.2,189.4 276.8,189.5 278.4,189.6 280.0,189.7" fill="none" stroke="#4051b5" stroke-width="2.3"/>
<line x1="205.6" y1="190" x2="205.6" y2="57.0" stroke="currentColor" stroke-dasharray="3 3" opacity="0.6"/>
<line x1="25" y1="190" x2="280" y2="190" stroke="currentColor"/>
<line x1="99.4" y1="190" x2="99.4" y2="194" stroke="currentColor"/><text x="99.4" y="206" text-anchor="middle" fill="currentColor" font-size="12">μ₁</text>
<line x1="152.5" y1="190" x2="152.5" y2="194" stroke="currentColor"/><text x="152.5" y="206" text-anchor="middle" fill="currentColor" font-size="12">μ₂</text>
<line x1="205.6" y1="190" x2="205.6" y2="194" stroke="currentColor"/><text x="205.6" y="206" text-anchor="middle" fill="currentColor" font-size="12">μ₃</text>
<text x="152.0" y="222.0" text-anchor="middle" fill="currentColor" font-size="12">μ₁ &lt; μ₂ &lt; μ₃, stessa σ: la campana trasla</text>
<polyline points="305.0,190.0 306.6,190.0 308.2,190.0 309.8,190.0 311.4,190.0 313.0,190.0 314.6,190.0 316.2,190.0 317.8,190.0 319.3,190.0 320.9,190.0 322.5,190.0 324.1,190.0 325.7,190.0 327.3,190.0 328.9,190.0 330.5,190.0 332.1,190.0 333.7,190.0 335.3,190.0 336.9,190.0 338.5,190.0 340.1,190.0 341.7,190.0 343.2,190.0 344.8,190.0 346.4,190.0 348.0,190.0 349.6,190.0 351.2,190.0 352.8,190.0 354.4,190.0 356.0,190.0 357.6,190.0 359.2,190.0 360.8,190.0 362.4,190.0 364.0,190.0 365.6,190.0 367.2,190.0 368.8,190.0 370.3,190.0 371.9,190.0 373.5,190.0 375.1,190.0 376.7,190.0 378.3,189.9 379.9,189.9 381.5,189.8 383.1,189.8 384.7,189.7 386.3,189.5 387.9,189.2 389.5,188.9 391.1,188.5 392.7,187.8 394.2,187.0 395.8,185.9 397.4,184.5 399.0,182.6 400.6,180.3 402.2,177.5 403.8,174.0 405.4,169.8 407.0,164.8 408.6,159.0 410.2,152.4 411.8,145.0 413.4,136.9 415.0,128.1 416.6,118.8 418.2,109.2 419.8,99.5 421.3,90.0 422.9,80.9 424.5,72.7 426.1,65.4 427.7,59.5 429.3,55.1 430.9,52.3 432.5,51.4 434.1,52.3 435.7,55.1 437.3,59.5 438.9,65.4 440.5,72.7 442.1,80.9 443.7,90.0 445.2,99.5 446.8,109.2 448.4,118.8 450.0,128.1 451.6,136.9 453.2,145.0 454.8,152.4 456.4,159.0 458.0,164.8 459.6,169.8 461.2,174.0 462.8,177.5 464.4,180.3 466.0,182.6 467.6,184.5 469.2,185.9 470.8,187.0 472.3,187.8 473.9,188.5 475.5,188.9 477.1,189.2 478.7,189.5 480.3,189.7 481.9,189.8 483.5,189.8 485.1,189.9 486.7,189.9 488.3,190.0 489.9,190.0 491.5,190.0 493.1,190.0 494.7,190.0 496.2,190.0 497.8,190.0 499.4,190.0 501.0,190.0 502.6,190.0 504.2,190.0 505.8,190.0 507.4,190.0 509.0,190.0 510.6,190.0 512.2,190.0 513.8,190.0 515.4,190.0 517.0,190.0 518.6,190.0 520.2,190.0 521.8,190.0 523.3,190.0 524.9,190.0 526.5,190.0 528.1,190.0 529.7,190.0 531.3,190.0 532.9,190.0 534.5,190.0 536.1,190.0 537.7,190.0 539.3,190.0 540.9,190.0 542.5,190.0 544.1,190.0 545.7,190.0 547.2,190.0 548.8,190.0 550.4,190.0 552.0,190.0 553.6,190.0 555.2,190.0 556.8,190.0 558.4,190.0 560.0,190.0" fill="none" stroke="#e07a1f" stroke-width="2.3"/>
<polyline points="305.0,190.0 306.6,190.0 308.2,190.0 309.8,190.0 311.4,190.0 313.0,190.0 314.6,190.0 316.2,190.0 317.8,190.0 319.3,190.0 320.9,190.0 322.5,190.0 324.1,190.0 325.7,190.0 327.3,190.0 328.9,190.0 330.5,190.0 332.1,190.0 333.7,190.0 335.3,189.9 336.9,189.9 338.5,189.9 340.1,189.9 341.7,189.9 343.2,189.8 344.8,189.8 346.4,189.7 348.0,189.7 349.6,189.6 351.2,189.5 352.8,189.4 354.4,189.3 356.0,189.2 357.6,189.0 359.2,188.8 360.8,188.6 362.4,188.3 364.0,188.0 365.6,187.6 367.2,187.2 368.8,186.7 370.3,186.2 371.9,185.5 373.5,184.8 375.1,184.0 376.7,183.1 378.3,182.1 379.9,181.1 381.5,179.8 383.1,178.5 384.7,177.1 386.3,175.5 387.9,173.8 389.5,171.9 391.1,170.0 392.7,167.9 394.2,165.6 395.8,163.3 397.4,160.8 399.0,158.3 400.6,155.6 402.2,152.9 403.8,150.1 405.4,147.3 407.0,144.5 408.6,141.6 410.2,138.8 411.8,136.0 413.4,133.3 415.0,130.7 416.6,128.2 418.2,125.9 419.8,123.8 421.3,121.8 422.9,120.0 424.5,118.5 426.1,117.2 427.7,116.2 429.3,115.5 430.9,115.1 432.5,114.9 434.1,115.1 435.7,115.5 437.3,116.2 438.9,117.2 440.5,118.5 442.1,120.0 443.7,121.8 445.2,123.8 446.8,125.9 448.4,128.2 450.0,130.7 451.6,133.3 453.2,136.0 454.8,138.8 456.4,141.6 458.0,144.5 459.6,147.3 461.2,150.1 462.8,152.9 464.4,155.6 466.0,158.3 467.6,160.8 469.2,163.3 470.8,165.6 472.3,167.9 473.9,170.0 475.5,171.9 477.1,173.8 478.7,175.5 480.3,177.1 481.9,178.5 483.5,179.8 485.1,181.1 486.7,182.1 488.3,183.1 489.9,184.0 491.5,184.8 493.1,185.5 494.7,186.2 496.2,186.7 497.8,187.2 499.4,187.6 501.0,188.0 502.6,188.3 504.2,188.6 505.8,188.8 507.4,189.0 509.0,189.2 510.6,189.3 512.2,189.4 513.8,189.5 515.4,189.6 517.0,189.7 518.6,189.7 520.2,189.8 521.8,189.8 523.3,189.9 524.9,189.9 526.5,189.9 528.1,189.9 529.7,189.9 531.3,190.0 532.9,190.0 534.5,190.0 536.1,190.0 537.7,190.0 539.3,190.0 540.9,190.0 542.5,190.0 544.1,190.0 545.7,190.0 547.2,190.0 548.8,190.0 550.4,190.0 552.0,190.0 553.6,190.0 555.2,190.0 556.8,190.0 558.4,190.0 560.0,190.0" fill="none" stroke="#8e44ad" stroke-width="2.3"/>
<polyline points="305.0,189.0 306.6,188.9 308.2,188.8 309.8,188.7 311.4,188.6 313.0,188.4 314.6,188.3 316.2,188.1 317.8,188.0 319.3,187.8 320.9,187.6 322.5,187.4 324.1,187.2 325.7,187.0 327.3,186.7 328.9,186.5 330.5,186.2 332.1,185.9 333.7,185.6 335.3,185.3 336.9,184.9 338.5,184.6 340.1,184.2 341.7,183.8 343.2,183.4 344.8,182.9 346.4,182.5 348.0,182.0 349.6,181.5 351.2,181.0 352.8,180.4 354.4,179.9 356.0,179.3 357.6,178.7 359.2,178.0 360.8,177.4 362.4,176.7 364.0,176.0 365.6,175.3 367.2,174.6 368.8,173.8 370.3,173.1 371.9,172.3 373.5,171.5 375.1,170.7 376.7,169.9 378.3,169.1 379.9,168.3 381.5,167.4 383.1,166.6 384.7,165.7 386.3,164.9 387.9,164.0 389.5,163.2 391.1,162.4 392.7,161.5 394.2,160.7 395.8,159.9 397.4,159.1 399.0,158.3 400.6,157.5 402.2,156.8 403.8,156.1 405.4,155.4 407.0,154.7 408.6,154.1 410.2,153.5 411.8,152.9 413.4,152.3 415.0,151.8 416.6,151.4 418.2,150.9 419.8,150.5 421.3,150.2 422.9,149.9 424.5,149.6 426.1,149.4 427.7,149.3 429.3,149.1 430.9,149.1 432.5,149.1 434.1,149.1 435.7,149.1 437.3,149.3 438.9,149.4 440.5,149.6 442.1,149.9 443.7,150.2 445.2,150.5 446.8,150.9 448.4,151.4 450.0,151.8 451.6,152.3 453.2,152.9 454.8,153.5 456.4,154.1 458.0,154.7 459.6,155.4 461.2,156.1 462.8,156.8 464.4,157.5 466.0,158.3 467.6,159.1 469.2,159.9 470.8,160.7 472.3,161.5 473.9,162.4 475.5,163.2 477.1,164.0 478.7,164.9 480.3,165.7 481.9,166.6 483.5,167.4 485.1,168.3 486.7,169.1 488.3,169.9 489.9,170.7 491.5,171.5 493.1,172.3 494.7,173.1 496.2,173.8 497.8,174.6 499.4,175.3 501.0,176.0 502.6,176.7 504.2,177.4 505.8,178.0 507.4,178.7 509.0,179.3 510.6,179.9 512.2,180.4 513.8,181.0 515.4,181.5 517.0,182.0 518.6,182.5 520.2,182.9 521.8,183.4 523.3,183.8 524.9,184.2 526.5,184.6 528.1,184.9 529.7,185.3 531.3,185.6 532.9,185.9 534.5,186.2 536.1,186.5 537.7,186.7 539.3,187.0 540.9,187.2 542.5,187.4 544.1,187.6 545.7,187.8 547.2,188.0 548.8,188.1 550.4,188.3 552.0,188.4 553.6,188.6 555.2,188.7 556.8,188.8 558.4,188.9 560.0,189.0" fill="none" stroke="#4051b5" stroke-width="2.3"/>
<line x1="432.5" y1="190" x2="432.5" y2="51.4" stroke="currentColor" stroke-dasharray="3 3" opacity="0.6"/>
<line x1="305" y1="190" x2="560" y2="190" stroke="currentColor"/>
<line x1="432.5" y1="190" x2="432.5" y2="194" stroke="currentColor"/><text x="432.5" y="206" text-anchor="middle" fill="currentColor" font-size="12">μ</text>
<text x="448.4" y="57.4" text-anchor="start" fill="#e07a1f" font-size="12" font-weight="bold">σ₁</text>
<text x="458.0" y="116.9" text-anchor="start" fill="#8e44ad" font-size="12" font-weight="bold">σ₂</text>
<text x="481.4" y="147.1" text-anchor="start" fill="#4051b5" font-size="12" font-weight="bold">σ₃</text>
<text x="432.0" y="222.0" text-anchor="middle" fill="currentColor" font-size="12">σ₁ &lt; σ₂ &lt; σ₃, stessa μ: si allarga e si abbassa</text>
</svg>
<figcaption>μ è la posizione del vertice: cambiarlo sposta la campana. σ è la larghezza: aumentandolo la campana si allarga e, perché l’area resti 1, si abbassa.</figcaption>
</figure>

#### Esplora: stringere e allargare la campana {: #widget-normale }

La curva tratteggiata è l’altezza della popolazione, con $\mu=170$ cm e $\sigma=10$ cm. Muovi $\mu$: la campana scivola senza cambiare forma. Muovi $\sigma$: si allarga e si abbassa, oppure si stringe e si alza, ma l’area resta 1. Prima di muovere $\sigma$, prevedi: la probabilità di stare entro una deviazione standard dal centro cambierà?

<div class="psi-widget" id="s06-normale"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  function erf(x) {
    // Approssimazione di Abramowitz e Stegun (7.1.26): errore < 1,5e-7.
    var s = x < 0 ? -1 : 1, a = Math.abs(x), t = 1 / (1 + 0.3275911 * a);
    var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t
      - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
    return s * y;
  }
  function Phi(z) { return 0.5 * (1 + erf(z / Math.SQRT2)); }
  PSIWidget.mount('s06-normale', {
    type: 'line', xLabel: 'Altezza x (cm)', yLabel: 'densità f(x)',
    xDomain: [120, 220], xSamples: 201, yDomain: [0, 0.09],
    liveLabel: 'distribuzione normale corrente',
    fn: function (x, p) {
      var z = (x - p.mu) / p.sigma;
      return Math.exp(-0.5 * z * z) / (p.sigma * Math.sqrt(2 * Math.PI));
    },
    params: [
      {key: 'mu', label: 'μ (centro, cm)', min: 150, max: 190, step: 1, value: 170},
      {key: 'sigma', label: 'σ (deviazione standard, cm)', min: 5, max: 20, step: 0.5, value: 10}
    ],
    reference: {label: 'altezze: μ = 170, σ = 10', params: {mu: 170, sigma: 10}},
    stats: function (p) { return [
      {label: 'altezza del picco 1/(σ√2π)', value: (1 / (p.sigma * Math.sqrt(2 * Math.PI))).toFixed(4)},
      {label: 'P(μ − σ < X < μ + σ)', value: (Phi(1) - Phi(-1)).toFixed(3)},
      {label: 'P(X > 180 cm)', value: (1 - Phi((180 - p.mu) / p.sigma)).toFixed(3)}
    ]; },
    caption: 'μ sposta la campana, σ la allarga e la abbassa. L\'area entro una σ dal centro resta sempre circa 0,683.'
  });
});
</script>

La risposta è no. Qualunque siano $\mu$ e $\sigma$, la probabilità di stare entro una deviazione standard dal centro resta circa 0,683. Cambia invece $P(X>180)$, perché 180 cm è una soglia fissa: con $\sigma=10$ dista una deviazione standard dal centro, con $\sigma=5$ ne dista due, e la probabilità di superarla crolla. Per una distribuzione normale, quello che conta è la distanza dal centro **misurata in deviazioni standard**. È l’idea su cui si regge tutto il resto della settimana.

### La normale standard e la tabella di Φ {: #standard }

Tra tutte le distribuzioni normali ce n’è una speciale: quella con media 0 e deviazione standard 1. Si chiama **distribuzione normale standard**, e la variabile che la segue si indica di solito con la lettera $Z$:

$$
Z\sim\mathcal{N}(0,1).
$$

Per la sua densità e la sua funzione di ripartizione si usano due lettere greche: $\varphi(z)$ («fi» minuscola) per la densità, $\Phi(z)$ («fi» maiuscola) per la funzione di ripartizione. Con $\mu=0$ e $\sigma=1$ la densità si semplifica in

$$
\varphi(z)=\frac{1}{\sqrt{2\pi}}\,e^{-z^2/2},\qquad\qquad \Phi(z)=P(Z\le z)=\int_{-\infty}^{z}\varphi(t)\,dt.
$$

<figure markdown="0">
<svg viewBox="0 0 580 244" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Campana normale standard centrata in 0, con il massimo poco sotto 0,4. L’area tra meno 1 e 1, colorata, vale circa il 68,3 per cento. In z uguale a 1 la curva cambia concavità: è un punto di flesso.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">La distribuzione normale standard: μ = 0, σ = 1</text>
<polygon points="230.0,200 230.0,113.6 231.5,111.4 233.0,109.3 234.5,107.1 236.0,105.0 237.5,102.8 239.0,100.7 240.5,98.6 242.0,96.5 243.5,94.5 245.0,92.5 246.5,90.4 248.0,88.5 249.5,86.5 251.0,84.7 252.5,82.8 254.0,81.0 255.5,79.2 257.0,77.5 258.5,75.9 260.0,74.3 261.5,72.7 263.0,71.2 264.5,69.8 266.0,68.5 267.5,67.2 269.0,66.0 270.5,64.9 272.0,63.8 273.5,62.8 275.0,61.9 276.5,61.1 278.0,60.3 279.5,59.7 281.0,59.1 282.5,58.6 284.0,58.2 285.5,57.9 287.0,57.7 288.5,57.6 290.0,57.5 291.5,57.6 293.0,57.7 294.5,57.9 296.0,58.2 297.5,58.6 299.0,59.1 300.5,59.7 302.0,60.3 303.5,61.1 305.0,61.9 306.5,62.8 308.0,63.8 309.5,64.9 311.0,66.0 312.5,67.2 314.0,68.5 315.5,69.8 317.0,71.2 318.5,72.7 320.0,74.3 321.5,75.9 323.0,77.5 324.5,79.2 326.0,81.0 327.5,82.8 329.0,84.7 330.5,86.5 332.0,88.5 333.5,90.4 335.0,92.5 336.5,94.5 338.0,96.5 339.5,98.6 341.0,100.7 342.5,102.8 344.0,105.0 345.5,107.1 347.0,109.3 348.5,111.4 350.0,113.6 350.0,200" fill="#2e9e5b" opacity="0.45"/>
<polyline points="50.0,200.0 53.0,199.9 56.0,199.9 59.0,199.9 62.0,199.9 65.0,199.9 68.0,199.8 71.0,199.8 74.0,199.8 77.0,199.7 80.0,199.7 83.0,199.6 86.0,199.6 89.0,199.5 92.0,199.4 95.0,199.3 98.0,199.1 101.0,199.0 104.0,198.8 107.0,198.6 110.0,198.4 113.0,198.2 116.0,197.9 119.0,197.5 122.0,197.2 125.0,196.8 128.0,196.3 131.0,195.7 134.0,195.1 137.0,194.5 140.0,193.7 143.0,192.9 146.0,192.0 149.0,191.0 152.0,189.9 155.0,188.7 158.0,187.3 161.0,185.9 164.0,184.3 167.0,182.6 170.0,180.7 173.0,178.7 176.0,176.6 179.0,174.3 182.0,171.8 185.0,169.2 188.0,166.4 191.0,163.5 194.0,160.4 197.0,157.1 200.0,153.7 203.0,150.2 206.0,146.5 209.0,142.7 212.0,138.8 215.0,134.8 218.0,130.6 221.0,126.5 224.0,122.2 227.0,117.9 230.0,113.6 233.0,109.3 236.0,105.0 239.0,100.7 242.0,96.5 245.0,92.5 248.0,88.5 251.0,84.7 254.0,81.0 257.0,77.5 260.0,74.3 263.0,71.2 266.0,68.5 269.0,66.0 272.0,63.8 275.0,61.9 278.0,60.3 281.0,59.1 284.0,58.2 287.0,57.7 290.0,57.5 293.0,57.7 296.0,58.2 299.0,59.1 302.0,60.3 305.0,61.9 308.0,63.8 311.0,66.0 314.0,68.5 317.0,71.2 320.0,74.3 323.0,77.5 326.0,81.0 329.0,84.7 332.0,88.5 335.0,92.5 338.0,96.5 341.0,100.7 344.0,105.0 347.0,109.3 350.0,113.6 353.0,117.9 356.0,122.2 359.0,126.5 362.0,130.6 365.0,134.8 368.0,138.8 371.0,142.7 374.0,146.5 377.0,150.2 380.0,153.7 383.0,157.1 386.0,160.4 389.0,163.5 392.0,166.4 395.0,169.2 398.0,171.8 401.0,174.3 404.0,176.6 407.0,178.7 410.0,180.7 413.0,182.6 416.0,184.3 419.0,185.9 422.0,187.3 425.0,188.7 428.0,189.9 431.0,191.0 434.0,192.0 437.0,192.9 440.0,193.7 443.0,194.5 446.0,195.1 449.0,195.7 452.0,196.3 455.0,196.8 458.0,197.2 461.0,197.5 464.0,197.9 467.0,198.2 470.0,198.4 473.0,198.6 476.0,198.8 479.0,199.0 482.0,199.1 485.0,199.3 488.0,199.4 491.0,199.5 494.0,199.6 497.0,199.6 500.0,199.7 503.0,199.7 506.0,199.8 509.0,199.8 512.0,199.8 515.0,199.9 518.0,199.9 521.0,199.9 524.0,199.9 527.0,199.9 530.0,200.0" fill="none" stroke="#e07a1f" stroke-width="3"/>
<line x1="50" y1="200" x2="530" y2="200" stroke="currentColor"/>
<line x1="50.0" y1="200" x2="50.0" y2="204" stroke="currentColor"/><text x="50.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">−4</text>
<line x1="110.0" y1="200" x2="110.0" y2="204" stroke="currentColor"/><text x="110.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">−3</text>
<line x1="170.0" y1="200" x2="170.0" y2="204" stroke="currentColor"/><text x="170.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">−2</text>
<line x1="230.0" y1="200" x2="230.0" y2="204" stroke="currentColor"/><text x="230.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">−1</text>
<line x1="290.0" y1="200" x2="290.0" y2="204" stroke="currentColor"/><text x="290.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">0</text>
<line x1="350.0" y1="200" x2="350.0" y2="204" stroke="currentColor"/><text x="350.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">1</text>
<line x1="410.0" y1="200" x2="410.0" y2="204" stroke="currentColor"/><text x="410.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">2</text>
<line x1="470.0" y1="200" x2="470.0" y2="204" stroke="currentColor"/><text x="470.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">3</text>
<line x1="530.0" y1="200" x2="530.0" y2="204" stroke="currentColor"/><text x="530.0" y="216" text-anchor="middle" fill="currentColor" font-size="11">4</text>
<line x1="50" y1="200" x2="50" y2="36" stroke="currentColor"/>
<line x1="46.0" y1="164.3" x2="50.0" y2="164.3" stroke="currentColor"/><text x="43.0" y="168.3" text-anchor="end" fill="currentColor" font-size="10">0,1</text>
<line x1="46.0" y1="128.6" x2="50.0" y2="128.6" stroke="currentColor"/><text x="43.0" y="132.6" text-anchor="end" fill="currentColor" font-size="10">0,2</text>
<line x1="46.0" y1="92.9" x2="50.0" y2="92.9" stroke="currentColor"/><text x="43.0" y="96.9" text-anchor="end" fill="currentColor" font-size="10">0,3</text>
<line x1="46.0" y1="57.1" x2="50.0" y2="57.1" stroke="currentColor"/><text x="43.0" y="61.1" text-anchor="end" fill="currentColor" font-size="10">0,4</text>
<text x="56.0" y="40.0" text-anchor="start" fill="currentColor" font-size="11">densità φ(z)</text>
<text x="320.0" y="146.4" text-anchor="start" fill="#2e9e5b" font-size="13" font-weight="bold">68,3%</text>
<text x="359.0" y="105.6" text-anchor="start" fill="currentColor" font-size="11">flesso in z = 1</text>
<text x="530.0" y="232.0" text-anchor="end" fill="currentColor" font-size="12">z</text>
</svg>
<figcaption>La normale standard Z ha media 0 e deviazione standard 1. La sua densità si indica con φ (fi minuscola), la sua funzione di ripartizione con Φ (fi maiuscola). Tra −1 e 1 c’è circa il 68,3% dell’area.</figcaption>
</figure>

Proviamo ora a rispondere a una domanda concreta. Con le altezze $X\sim\mathcal{N}(\mu=170,\ \sigma=10)$: qual è la probabilità che una persona scelta a caso sia più alta di 180 cm?

La strada diretta è chiara. La probabilità di superare 180 è il complemento della funzione di ripartizione in 180, e la funzione di ripartizione è l’area sotto la densità a sinistra di 180:

$$
P(X>180)=1-F(180)=1-\int_{-\infty}^{180}\frac{1}{10\sqrt{2\pi}}\;e^{-\frac{(x-170)^2}{200}}\,dx.
$$

Qui però ci fermiamo. Questo integrale **non si può calcolare in forma chiusa**: non esiste una formula costruita con le funzioni elementari (potenze, esponenziali, logaritmi, funzioni trigonometriche) che dia l’area sotto la campana. E non è un problema di questo esercizio: la funzione di ripartizione della distribuzione normale, in generale, non ha un’espressione in forma chiusa, a differenza di quella dell’esponenziale, $1-e^{-\lambda t}$. I valori si ottengono con il **calcolo numerico**, cioè con metodi di approssimazione eseguiti da un calcolatore, con tutta la precisione che serve.

Come si fa, allora, a un esame senza calcolatore? I valori della funzione di ripartizione della normale **standard**, $\Phi(z)$, sono stati calcolati una volta per tutte e raccolti in una tabella, la **tabella Z**, che si trova in ogni manuale di statistica e che potrai portare all’esame. Per leggere $\Phi(z)$ si cerca la riga che corrisponde alla parte intera e alla prima cifra decimale di $z$, poi la colonna che corrisponde alla seconda cifra decimale; il valore all’incrocio è la probabilità. Per esempio, $\Phi(1{,}31)$ si trova nella riga 1,3 e nella colonna 0,01, e vale 0,9049.

??? info "La tabella Z: i valori di $\Phi(z)=P(Z\le z)$ per $z$ da 0 a 3,09"
    Riga: parte intera e prima cifra decimale di $z$. Colonna: seconda cifra decimale. Per $z>3{,}09$ si può usare $\Phi(z)\approx1$; per i valori negativi si usa la simmetria $\Phi(-z)=1-\Phi(z)$.

    | $z$ | 0,00 | 0,01 | 0,02 | 0,03 | 0,04 | 0,05 | 0,06 | 0,07 | 0,08 | 0,09 |
    |---|---|---|---|---|---|---|---|---|---|---|
    | **0,0** | 0,5000 | 0,5040 | 0,5080 | 0,5120 | 0,5160 | 0,5199 | 0,5239 | 0,5279 | 0,5319 | 0,5359 |
    | **0,1** | 0,5398 | 0,5438 | 0,5478 | 0,5517 | 0,5557 | 0,5596 | 0,5636 | 0,5675 | 0,5714 | 0,5753 |
    | **0,2** | 0,5793 | 0,5832 | 0,5871 | 0,5910 | 0,5948 | 0,5987 | 0,6026 | 0,6064 | 0,6103 | 0,6141 |
    | **0,3** | 0,6179 | 0,6217 | 0,6255 | 0,6293 | 0,6331 | 0,6368 | 0,6406 | 0,6443 | 0,6480 | 0,6517 |
    | **0,4** | 0,6554 | 0,6591 | 0,6628 | 0,6664 | 0,6700 | 0,6736 | 0,6772 | 0,6808 | 0,6844 | 0,6879 |
    | **0,5** | 0,6915 | 0,6950 | 0,6985 | 0,7019 | 0,7054 | 0,7088 | 0,7123 | 0,7157 | 0,7190 | 0,7224 |
    | **0,6** | 0,7257 | 0,7291 | 0,7324 | 0,7357 | 0,7389 | 0,7422 | 0,7454 | 0,7486 | 0,7517 | 0,7549 |
    | **0,7** | 0,7580 | 0,7611 | 0,7642 | 0,7673 | 0,7704 | 0,7734 | 0,7764 | 0,7794 | 0,7823 | 0,7852 |
    | **0,8** | 0,7881 | 0,7910 | 0,7939 | 0,7967 | 0,7995 | 0,8023 | 0,8051 | 0,8078 | 0,8106 | 0,8133 |
    | **0,9** | 0,8159 | 0,8186 | 0,8212 | 0,8238 | 0,8264 | 0,8289 | 0,8315 | 0,8340 | 0,8365 | 0,8389 |
    | **1,0** | 0,8413 | 0,8438 | 0,8461 | 0,8485 | 0,8508 | 0,8531 | 0,8554 | 0,8577 | 0,8599 | 0,8621 |
    | **1,1** | 0,8643 | 0,8665 | 0,8686 | 0,8708 | 0,8729 | 0,8749 | 0,8770 | 0,8790 | 0,8810 | 0,8830 |
    | **1,2** | 0,8849 | 0,8869 | 0,8888 | 0,8907 | 0,8925 | 0,8944 | 0,8962 | 0,8980 | 0,8997 | 0,9015 |
    | **1,3** | 0,9032 | 0,9049 | 0,9066 | 0,9082 | 0,9099 | 0,9115 | 0,9131 | 0,9147 | 0,9162 | 0,9177 |
    | **1,4** | 0,9192 | 0,9207 | 0,9222 | 0,9236 | 0,9251 | 0,9265 | 0,9279 | 0,9292 | 0,9306 | 0,9319 |
    | **1,5** | 0,9332 | 0,9345 | 0,9357 | 0,9370 | 0,9382 | 0,9394 | 0,9406 | 0,9418 | 0,9429 | 0,9441 |
    | **1,6** | 0,9452 | 0,9463 | 0,9474 | 0,9484 | 0,9495 | 0,9505 | 0,9515 | 0,9525 | 0,9535 | 0,9545 |
    | **1,7** | 0,9554 | 0,9564 | 0,9573 | 0,9582 | 0,9591 | 0,9599 | 0,9608 | 0,9616 | 0,9625 | 0,9633 |
    | **1,8** | 0,9641 | 0,9649 | 0,9656 | 0,9664 | 0,9671 | 0,9678 | 0,9686 | 0,9693 | 0,9699 | 0,9706 |
    | **1,9** | 0,9713 | 0,9719 | 0,9726 | 0,9732 | 0,9738 | 0,9744 | 0,9750 | 0,9756 | 0,9761 | 0,9767 |
    | **2,0** | 0,9772 | 0,9778 | 0,9783 | 0,9788 | 0,9793 | 0,9798 | 0,9803 | 0,9808 | 0,9812 | 0,9817 |
    | **2,1** | 0,9821 | 0,9826 | 0,9830 | 0,9834 | 0,9838 | 0,9842 | 0,9846 | 0,9850 | 0,9854 | 0,9857 |
    | **2,2** | 0,9861 | 0,9864 | 0,9868 | 0,9871 | 0,9875 | 0,9878 | 0,9881 | 0,9884 | 0,9887 | 0,9890 |
    | **2,3** | 0,9893 | 0,9896 | 0,9898 | 0,9901 | 0,9904 | 0,9906 | 0,9909 | 0,9911 | 0,9913 | 0,9916 |
    | **2,4** | 0,9918 | 0,9920 | 0,9922 | 0,9925 | 0,9927 | 0,9929 | 0,9931 | 0,9932 | 0,9934 | 0,9936 |
    | **2,5** | 0,9938 | 0,9940 | 0,9941 | 0,9943 | 0,9945 | 0,9946 | 0,9948 | 0,9949 | 0,9951 | 0,9952 |
    | **2,6** | 0,9953 | 0,9955 | 0,9956 | 0,9957 | 0,9959 | 0,9960 | 0,9961 | 0,9962 | 0,9963 | 0,9964 |
    | **2,7** | 0,9965 | 0,9966 | 0,9967 | 0,9968 | 0,9969 | 0,9970 | 0,9971 | 0,9972 | 0,9973 | 0,9974 |
    | **2,8** | 0,9974 | 0,9975 | 0,9976 | 0,9977 | 0,9977 | 0,9978 | 0,9979 | 0,9979 | 0,9980 | 0,9981 |
    | **2,9** | 0,9981 | 0,9982 | 0,9982 | 0,9983 | 0,9984 | 0,9984 | 0,9985 | 0,9985 | 0,9986 | 0,9986 |
    | **3,0** | 0,9987 | 0,9987 | 0,9987 | 0,9988 | 0,9988 | 0,9989 | 0,9989 | 0,9989 | 0,9990 | 0,9990 |

La tabella contiene soltanto i valori di $z$ positivi. Per quelli negativi si usa la **simmetria** della campana attorno allo zero: l’area a sinistra di $-z$ è uguale all’area a destra di $+z$. L’area a destra di $z$ è $1-\Phi(z)$, quindi

$$
\Phi(-z)=1-\Phi(z).
$$

Per esempio, $\Phi(-1)=1-\Phi(1)=1-0{,}8413=0{,}1587$. Con la tabella e la simmetria possiamo calcolare qualunque probabilità della normale standard. Ecco tre esempi, presi dal libro di Baron:

$$
P(Z<1{,}35)=\Phi(1{,}35)=0{,}9115,\qquad P(Z>1{,}35)=1-\Phi(1{,}35)=0{,}0885,
$$

$$
P(-0{,}77<Z<1{,}35)=\Phi(1{,}35)-\Phi(-0{,}77)=0{,}9115-(1-0{,}7794)=0{,}9115-0{,}2206=0{,}6909.
$$

Nell’ultimo conto abbiamo usato la regola $F(b)-F(a)$ dell’Atto IV e poi la simmetria per $\Phi(-0{,}77)$.

Resta un problema: la tabella è per la normale **standard**, e le altezze hanno media 170 e deviazione standard 10. Servirebbe una tabella diversa per ogni coppia di parametri, cioè infinite tabelle. Il prossimo paragrafo mostra che non è necessario: una tabella sola basta per tutte.

### Standardizzare {: #standardizzazione }

La chiave è una proprietà della distribuzione normale: **una trasformazione lineare di una variabile normale è ancora normale**. Se $X\sim\mathcal{N}(\mu,\sigma^2)$ e costruiamo la nuova variabile $Y=aX+b$, con $a$ e $b$ numeri fissati e $a\ne0$, allora

$$
Y=aX+b\sim\mathcal{N}\big(a\mu+b,\ a^2\sigma^2\big).
$$

Due parti di questo enunciato le conosciamo già. La media di $Y$ viene dalla linearità del valore atteso ([Settimana 4](../settimana_04/index.md#linearita)): $\mathbb{E}[aX+b]=a\,\mathbb{E}[X]+b=a\mu+b$. La varianza viene dalla regola $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)=a^2\sigma^2$, che abbiamo visto a lezione nella Settimana 5 e che si capisce così: aggiungere $b$ sposta tutti i valori e la loro media della stessa quantità, quindi le distanze dalla media non cambiano; moltiplicare per $a$ moltiplica ogni distanza per $a$, e il suo quadrato per $a^2$. La parte nuova, che non dimostriamo, è che la forma resta quella di una campana: spostare e cambiare scala a una distribuzione normale dà ancora una distribuzione normale.

Ora usiamo la proprietà con una trasformazione lineare scelta apposta. Partiamo da $X\sim\mathcal{N}(\mu,\sigma^2)$ e prendiamo

$$
a=\frac1\sigma,\qquad b=-\frac{\mu}{\sigma},\qquad\text{cioè}\qquad Z=aX+b=\frac{X-\mu}{\sigma}.
$$

Per la proprietà appena vista, $Z$ è normale, con media $a\mu+b=\frac{\mu}{\sigma}-\frac{\mu}{\sigma}=0$ e varianza $a^2\sigma^2=\frac{\sigma^2}{\sigma^2}=1$:

$$
X\sim\mathcal{N}(\mu,\sigma^2)\quad\Longrightarrow\quad Z=\frac{X-\mu}{\sigma}\sim\mathcal{N}(0,1).
$$

È proprio la normale standard. Questa operazione si chiama **standardizzazione**, e ha un significato semplice. Sottrarre $\mu$ sposta il centro in zero; dividere per $\sigma$ cambia l’unità di misura, come passare dai centimetri ai «metri» di una nuova scala in cui una deviazione standard vale 1. Il numero

$$
z=\frac{x-\mu}{\sigma}
$$

dice di quante deviazioni standard il valore $x$ si trova sopra la media (se $z>0$) o sotto (se $z<0$). Per le altezze, 180 cm corrisponde a $z=(180-170)/10=1$, una deviazione standard sopra la media; 150 cm a $z=-2$, due deviazioni standard sotto; 170 cm a $z=0$.

Ora trasferiamo le probabilità. Vogliamo $P(X<x)$ per una soglia $x$ qualsiasi. Una disuguaglianza resta vera se sottraiamo lo stesso numero da entrambi i lati, e resta vera se dividiamo entrambi i lati per lo stesso numero positivo. Quindi prima sottraiamo $\mu$, poi dividiamo per $\sigma$, che è positivo:

$$
P(X<x)=P(X-\mu<x-\mu)=P\left(\frac{X-\mu}{\sigma}<\frac{x-\mu}{\sigma}\right)=P\left(Z<\frac{x-\mu}{\sigma}\right).
$$

L’evento «$X<x$» e l’evento «$Z<(x-\mu)/\sigma$» sono lo stesso evento scritto in due unità di misura diverse, quindi hanno la stessa probabilità. E quest’ultima è un valore della funzione di ripartizione della normale standard, che leggiamo nella tabella:

$$
\boxed{F(x)=P(X\le x)=\Phi\left(\frac{x-\mu}{\sigma}\right).}
$$

Riassumiamo il ragionamento, perché è il cuore della seconda parte. Con una trasformazione lineare opportuna possiamo trasformare qualsiasi variabile normale nella normale standard. Le probabilità della variabile originale si trasferiscono immutate ai valori corrispondenti della variabile standardizzata. Quindi basta applicare la trasformazione alle soglie e leggere le probabilità nella tabella di $\Phi$, calcolata una volta per tutte.

<figure markdown="0">
<svg viewBox="0 0 580 268" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Campana delle altezze con media 170 centimetri e deviazione standard 10. Sotto l’asse in centimetri, da 140 a 200, c’è un secondo asse in deviazioni standard, da meno 3 a più 3: 180 centimetri corrisponde a z uguale a 1. L’area a destra di 180, colorata, vale 1 meno Phi di 1, circa 0,1587.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">Standardizzare: lo stesso punto su due righelli</text>
<polygon points="361.4,170 361.4,91.4 363.7,93.8 365.9,96.3 368.1,98.7 370.4,101.1 372.6,103.6 374.8,105.9 377.1,108.3 379.3,110.6 381.5,112.9 383.8,115.2 386.0,117.4 388.2,119.6 390.4,121.8 392.7,123.9 394.9,125.9 397.1,127.9 399.4,129.9 401.6,131.7 403.8,133.6 406.1,135.4 408.3,137.1 410.5,138.8 412.8,140.4 415.0,142.0 417.2,143.5 419.5,144.9 421.7,146.3 423.9,147.6 426.2,148.9 428.4,150.2 430.6,151.3 432.9,152.5 435.1,153.5 437.3,154.5 439.6,155.5 441.8,156.4 444.0,157.3 446.2,158.2 448.5,158.9 450.7,159.7 452.9,160.4 455.2,161.1 457.4,161.7 459.6,162.3 461.9,162.8 464.1,163.4 466.3,163.8 468.6,164.3 470.8,164.7 473.0,165.1 475.3,165.5 477.5,165.9 479.7,166.2 482.0,166.5 484.2,166.8 486.4,167.0 488.7,167.3 490.9,167.5 493.1,167.7 495.4,167.9 497.6,168.1 499.8,168.3 502.1,168.4 504.3,168.6 506.5,168.7 508.8,168.8 511.0,168.9 513.2,169.0 515.4,169.1 517.7,169.2 519.9,169.3 522.1,169.3 524.4,169.4 526.6,169.5 528.8,169.5 531.1,169.6 533.3,169.6 535.5,169.6 537.8,169.7 540.0,169.7 540.0,170" fill="#2e9e5b" opacity="0.5"/>
<polyline points="40.0,169.7 43.1,169.7 46.2,169.6 49.4,169.6 52.5,169.5 55.6,169.4 58.8,169.3 61.9,169.2 65.0,169.1 68.1,169.0 71.2,168.8 74.4,168.6 77.5,168.4 80.6,168.2 83.8,168.0 86.9,167.7 90.0,167.4 93.1,167.1 96.2,166.7 99.4,166.3 102.5,165.9 105.6,165.4 108.8,164.8 111.9,164.2 115.0,163.6 118.1,162.8 121.2,162.0 124.4,161.2 127.5,160.3 130.6,159.2 133.8,158.2 136.9,157.0 140.0,155.7 143.1,154.3 146.2,152.9 149.4,151.3 152.5,149.7 155.6,147.9 158.8,146.0 161.9,144.1 165.0,142.0 168.1,139.8 171.2,137.4 174.4,135.0 177.5,132.5 180.6,129.9 183.8,127.1 186.9,124.3 190.0,121.3 193.1,118.3 196.2,115.2 199.4,112.0 202.5,108.8 205.6,105.5 208.8,102.1 211.9,98.7 215.0,95.3 218.1,91.9 221.2,88.4 224.4,85.0 227.5,81.6 230.6,78.2 233.8,74.9 236.9,71.7 240.0,68.5 243.1,65.5 246.2,62.5 249.4,59.7 252.5,57.0 255.6,54.5 258.8,52.2 261.9,50.0 265.0,48.0 268.1,46.3 271.2,44.7 274.4,43.4 277.5,42.3 280.6,41.5 283.8,40.8 286.9,40.5 290.0,40.3 293.1,40.5 296.2,40.8 299.4,41.5 302.5,42.3 305.6,43.4 308.8,44.7 311.9,46.3 315.0,48.0 318.1,50.0 321.2,52.2 324.4,54.5 327.5,57.0 330.6,59.7 333.8,62.5 336.9,65.5 340.0,68.5 343.1,71.7 346.2,74.9 349.4,78.2 352.5,81.6 355.6,85.0 358.8,88.4 361.9,91.9 365.0,95.3 368.1,98.7 371.2,102.1 374.4,105.5 377.5,108.8 380.6,112.0 383.8,115.2 386.9,118.3 390.0,121.3 393.1,124.3 396.2,127.1 399.4,129.9 402.5,132.5 405.6,135.0 408.8,137.4 411.9,139.8 415.0,142.0 418.1,144.1 421.2,146.0 424.4,147.9 427.5,149.7 430.6,151.3 433.8,152.9 436.9,154.3 440.0,155.7 443.1,157.0 446.2,158.2 449.4,159.2 452.5,160.3 455.6,161.2 458.8,162.0 461.9,162.8 465.0,163.6 468.1,164.2 471.2,164.8 474.4,165.4 477.5,165.9 480.6,166.3 483.8,166.7 486.9,167.1 490.0,167.4 493.1,167.7 496.2,168.0 499.4,168.2 502.5,168.4 505.6,168.6 508.8,168.8 511.9,169.0 515.0,169.1 518.1,169.2 521.2,169.3 524.4,169.4 527.5,169.5 530.6,169.6 533.8,169.6 536.9,169.7 540.0,169.7" fill="none" stroke="#e07a1f" stroke-width="3"/>
<line x1="40" y1="170" x2="540" y2="170" stroke="currentColor"/>
<line x1="75.7" y1="170" x2="75.7" y2="174" stroke="currentColor"/><text x="75.7" y="187" text-anchor="middle" fill="currentColor" font-size="11">140</text>
<line x1="147.1" y1="170" x2="147.1" y2="174" stroke="currentColor"/><text x="147.1" y="187" text-anchor="middle" fill="currentColor" font-size="11">150</text>
<line x1="218.6" y1="170" x2="218.6" y2="174" stroke="currentColor"/><text x="218.6" y="187" text-anchor="middle" fill="currentColor" font-size="11">160</text>
<line x1="290.0" y1="170" x2="290.0" y2="174" stroke="currentColor"/><text x="290.0" y="187" text-anchor="middle" fill="currentColor" font-size="11">170</text>
<line x1="361.4" y1="170" x2="361.4" y2="174" stroke="currentColor"/><text x="361.4" y="187" text-anchor="middle" fill="currentColor" font-size="11">180</text>
<line x1="432.9" y1="170" x2="432.9" y2="174" stroke="currentColor"/><text x="432.9" y="187" text-anchor="middle" fill="currentColor" font-size="11">190</text>
<line x1="504.3" y1="170" x2="504.3" y2="174" stroke="currentColor"/><text x="504.3" y="187" text-anchor="middle" fill="currentColor" font-size="11">200</text>
<text x="540.0" y="205.0" text-anchor="end" fill="currentColor" font-size="11">altezza x (cm)</text>
<line x1="40" y1="232" x2="540" y2="232" stroke="#4051b5"/>
<line x1="75.7" y1="232" x2="75.7" y2="236" stroke="#4051b5"/><text x="75.7" y="249.0" text-anchor="middle" fill="#4051b5" font-size="11">−3</text>
<line x1="75.7" y1="192" x2="75.7" y2="229" stroke="currentColor" stroke-dasharray="1 3" opacity="0.5"/>
<line x1="147.1" y1="232" x2="147.1" y2="236" stroke="#4051b5"/><text x="147.1" y="249.0" text-anchor="middle" fill="#4051b5" font-size="11">−2</text>
<line x1="147.1" y1="192" x2="147.1" y2="229" stroke="currentColor" stroke-dasharray="1 3" opacity="0.5"/>
<line x1="218.6" y1="232" x2="218.6" y2="236" stroke="#4051b5"/><text x="218.6" y="249.0" text-anchor="middle" fill="#4051b5" font-size="11">−1</text>
<line x1="218.6" y1="192" x2="218.6" y2="229" stroke="currentColor" stroke-dasharray="1 3" opacity="0.5"/>
<line x1="290.0" y1="232" x2="290.0" y2="236" stroke="#4051b5"/><text x="290.0" y="249.0" text-anchor="middle" fill="#4051b5" font-size="11">0</text>
<line x1="290.0" y1="192" x2="290.0" y2="229" stroke="currentColor" stroke-dasharray="1 3" opacity="0.5"/>
<line x1="361.4" y1="232" x2="361.4" y2="236" stroke="#4051b5"/><text x="361.4" y="249.0" text-anchor="middle" fill="#4051b5" font-size="11">1</text>
<line x1="361.4" y1="192" x2="361.4" y2="229" stroke="currentColor" stroke-dasharray="1 3" opacity="0.5"/>
<line x1="432.9" y1="232" x2="432.9" y2="236" stroke="#4051b5"/><text x="432.9" y="249.0" text-anchor="middle" fill="#4051b5" font-size="11">2</text>
<line x1="432.9" y1="192" x2="432.9" y2="229" stroke="currentColor" stroke-dasharray="1 3" opacity="0.5"/>
<line x1="504.3" y1="232" x2="504.3" y2="236" stroke="#4051b5"/><text x="504.3" y="249.0" text-anchor="middle" fill="#4051b5" font-size="11">3</text>
<line x1="504.3" y1="192" x2="504.3" y2="229" stroke="currentColor" stroke-dasharray="1 3" opacity="0.5"/>
<text x="540.0" y="264.0" text-anchor="end" fill="#4051b5" font-size="11">z = (x − 170)/10</text>
<line x1="361.4" y1="61.4" x2="361.4" y2="232" stroke="#2e9e5b" stroke-width="2"/>
<text x="369.4" y="61.4" text-anchor="start" fill="#2e9e5b" font-size="12" font-weight="bold">180 cm ↔ z = 1</text>
<text x="432.9" y="150.5" text-anchor="start" fill="#2e9e5b" font-size="12" font-weight="bold">1 − Φ(1) ≈ 0,1587</text>
</svg>
<figcaption>Il secondo righello misura le distanze dalla media in deviazioni standard. 180 cm sta una deviazione standard sopra la media, e l’area a destra è la stessa nei due righelli: 1 − Φ(1) ≈ 0,1587.</figcaption>
</figure>

Torniamo alla domanda delle altezze. Il modo non conveniente era calcolare l’integrale della densità con $\mu=170$ e $\sigma=10$. Il modo conveniente è standardizzare la soglia:

$$
P(X>180)=1-P(X\le180)=1-\Phi\left(\frac{180-170}{10}\right)=1-\Phi(1)=1-0{,}8413=0{,}1587.
$$

Circa una persona su sei è più alta di 180 cm. Il procedimento ha sempre gli stessi tre passi: **standardizzare le soglie, leggere $\Phi$ nella tabella, usare il complemento o la differenza se serve**.

Vediamo un secondo esempio con un intervallo, ripreso dal libro di Baron. Il reddito medio delle famiglie di un certo paese è di 900 monete, con deviazione standard di 200 monete, e supponiamo che i redditi seguano una distribuzione normale. Quale frazione delle famiglie appartiene alla «classe media», cioè ha un reddito compreso tra 600 e 1200 monete? Standardizziamo le due soglie, $(600-900)/200=-1{,}5$ e $(1200-900)/200=1{,}5$, e usiamo la differenza e poi la simmetria:

$$
P(600<X<1200)=\Phi(1{,}5)-\Phi(-1{,}5)=0{,}9332-(1-0{,}9332)=0{,}9332-0{,}0668=0{,}8664.
$$

Circa l’87% delle famiglie appartiene alla classe media.

!!! example "Sosta di verifica"
    Con le altezze $X\sim\mathcal{N}(\mu=170,\ \sigma=10)$, calcola la probabilità che una persona sia più bassa di 155 cm e quella che sia alta tra 165 e 185 cm.

    ??? esempio-svolto "Risposta"
        Per la prima, $z=(155-170)/10=-1{,}5$, quindi $P(X<155)=\Phi(-1{,}5)=1-\Phi(1{,}5)=1-0{,}9332=0{,}0668$. Per la seconda le soglie diventano $z=-0{,}5$ e $z=1{,}5$: $P(165<X<185)=\Phi(1{,}5)-\Phi(-0{,}5)=0{,}9332-(1-0{,}6915)=0{,}9332-0{,}3085=0{,}6247$.

### La regola 68–95–99,7 {: #regola-empirica }

Tre aree della normale standard vale la pena ricordarle, perché danno un’idea immediata di qualunque distribuzione normale. Standardizzando, il punto $\mu+k\sigma$ diventa $z=k$ e il punto $\mu-k\sigma$ diventa $z=-k$, quindi per ogni distribuzione normale

$$
\begin{aligned}
P(\mu-\sigma<X<\mu+\sigma)&=\Phi(1)-\Phi(-1)\approx0{,}683,\\
P(\mu-2\sigma<X<\mu+2\sigma)&=\Phi(2)-\Phi(-2)\approx0{,}954,\\
P(\mu-3\sigma<X<\mu+3\sigma)&=\Phi(3)-\Phi(-3)\approx0{,}997.
\end{aligned}
$$

Circa il 68% dei valori cade entro una deviazione standard dalla media, circa il 95% entro due, quasi tutti, il 99,7%, entro tre. Per questo la regola si chiama 68–95–99,7.

<figure markdown="0">
<svg viewBox="0 0 580 272" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Campana normale con fasce colorate. Tra mu meno sigma e mu più sigma c’è il 68,27 per cento dell’area (34,13 per cento per lato); tra mu meno 2 sigma e mu più 2 sigma il 95,45 per cento; tra mu meno 3 sigma e mu più 3 sigma il 99,73 per cento. Le fasce esterne valgono 13,59 e 2,14 per cento per lato.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">Quanta area sta a 1, 2 e 3 deviazioni standard dal centro</text>
<polygon points="81.7,230 81.7,228.3 82.5,228.3 83.4,228.2 84.3,228.1 85.1,228.1 86.0,228.0 86.9,227.9 87.7,227.8 88.6,227.8 89.5,227.7 90.3,227.6 91.2,227.5 92.1,227.4 93.0,227.3 93.8,227.2 94.7,227.1 95.6,227.0 96.4,226.9 97.3,226.8 98.2,226.7 99.0,226.6 99.9,226.5 100.8,226.3 101.6,226.2 102.5,226.1 103.4,226.0 104.2,225.8 105.1,225.7 106.0,225.5 106.8,225.4 107.7,225.2 108.6,225.1 109.4,224.9 110.3,224.7 111.2,224.6 112.0,224.4 112.9,224.2 113.8,224.0 114.7,223.8 115.5,223.6 116.4,223.4 117.3,223.2 118.1,223.0 119.0,222.8 119.9,222.6 120.7,222.3 121.6,222.1 122.5,221.9 123.3,221.6 124.2,221.3 125.1,221.1 125.9,220.8 126.8,220.5 127.7,220.3 128.5,220.0 129.4,219.7 130.3,219.4 131.1,219.1 132.0,218.8 132.9,218.4 133.8,218.1 134.6,217.8 135.5,217.4 136.4,217.1 137.2,216.7 138.1,216.3 139.0,215.9 139.8,215.6 140.7,215.2 141.6,214.8 142.4,214.4 143.3,213.9 144.2,213.5 145.0,213.1 145.9,212.6 146.8,212.2 147.6,211.7 148.5,211.2 149.4,210.7 150.2,210.3 151.1,209.8 151.1,230" fill="#4051b5" opacity="0.18"/>
<polygon points="151.1,230 151.1,209.8 152.0,209.2 152.8,208.7 153.7,208.2 154.6,207.7 155.5,207.1 156.3,206.5 157.2,206.0 158.1,205.4 158.9,204.8 159.8,204.2 160.7,203.6 161.5,203.0 162.4,202.3 163.3,201.7 164.1,201.1 165.0,200.4 165.9,199.7 166.7,199.0 167.6,198.3 168.5,197.6 169.3,196.9 170.2,196.2 171.1,195.5 171.9,194.7 172.8,194.0 173.7,193.2 174.5,192.4 175.4,191.7 176.3,190.9 177.2,190.0 178.0,189.2 178.9,188.4 179.8,187.6 180.6,186.7 181.5,185.9 182.4,185.0 183.2,184.1 184.1,183.2 185.0,182.3 185.8,181.4 186.7,180.5 187.6,179.6 188.4,178.7 189.3,177.7 190.2,176.8 191.0,175.8 191.9,174.8 192.8,173.9 193.6,172.9 194.5,171.9 195.4,170.9 196.2,169.9 197.1,168.8 198.0,167.8 198.9,166.8 199.7,165.7 200.6,164.7 201.5,163.6 202.3,162.6 203.2,161.5 204.1,160.4 204.9,159.4 205.8,158.3 206.7,157.2 207.5,156.1 208.4,155.0 209.3,153.9 210.1,152.8 211.0,151.7 211.9,150.5 212.7,149.4 213.6,148.3 214.5,147.2 215.3,146.1 216.2,144.9 217.1,143.8 218.0,142.7 218.8,141.5 219.7,140.4 220.6,139.3 220.6,230" fill="#4051b5" opacity="0.32"/>
<polygon points="220.6,230 220.6,139.3 221.4,138.1 222.3,137.0 223.2,135.9 224.0,134.7 224.9,133.6 225.8,132.5 226.6,131.3 227.5,130.2 228.4,129.1 229.2,128.0 230.1,126.9 231.0,125.8 231.8,124.7 232.7,123.6 233.6,122.5 234.4,121.4 235.3,120.3 236.2,119.2 237.0,118.1 237.9,117.1 238.8,116.0 239.7,115.0 240.5,113.9 241.4,112.9 242.3,111.9 243.1,110.9 244.0,109.9 244.9,108.9 245.7,107.9 246.6,106.9 247.5,106.0 248.3,105.0 249.2,104.1 250.1,103.2 250.9,102.3 251.8,101.4 252.7,100.5 253.5,99.7 254.4,98.8 255.3,98.0 256.1,97.2 257.0,96.4 257.9,95.6 258.8,94.8 259.6,94.1 260.5,93.3 261.4,92.6 262.2,91.9 263.1,91.2 264.0,90.6 264.8,89.9 265.7,89.3 266.6,88.7 267.4,88.1 268.3,87.5 269.2,87.0 270.0,86.5 270.9,85.9 271.8,85.5 272.6,85.0 273.5,84.6 274.4,84.1 275.2,83.7 276.1,83.4 277.0,83.0 277.8,82.7 278.7,82.4 279.6,82.1 280.5,81.8 281.3,81.6 282.2,81.3 283.1,81.1 283.9,81.0 284.8,80.8 285.7,80.7 286.5,80.6 287.4,80.5 288.3,80.4 289.1,80.4 290.0,80.4 290.0,230" fill="#4051b5" opacity="0.55"/>
<polygon points="290.0,230 290.0,80.4 290.9,80.4 291.7,80.4 292.6,80.5 293.5,80.6 294.3,80.7 295.2,80.8 296.1,81.0 296.9,81.1 297.8,81.3 298.7,81.6 299.5,81.8 300.4,82.1 301.3,82.4 302.2,82.7 303.0,83.0 303.9,83.4 304.8,83.7 305.6,84.1 306.5,84.6 307.4,85.0 308.2,85.5 309.1,85.9 310.0,86.5 310.8,87.0 311.7,87.5 312.6,88.1 313.4,88.7 314.3,89.3 315.2,89.9 316.0,90.6 316.9,91.2 317.8,91.9 318.6,92.6 319.5,93.3 320.4,94.1 321.2,94.8 322.1,95.6 323.0,96.4 323.9,97.2 324.7,98.0 325.6,98.8 326.5,99.7 327.3,100.5 328.2,101.4 329.1,102.3 329.9,103.2 330.8,104.1 331.7,105.0 332.5,106.0 333.4,106.9 334.3,107.9 335.1,108.9 336.0,109.9 336.9,110.9 337.7,111.9 338.6,112.9 339.5,113.9 340.3,115.0 341.2,116.0 342.1,117.1 343.0,118.1 343.8,119.2 344.7,120.3 345.6,121.4 346.4,122.5 347.3,123.6 348.2,124.7 349.0,125.8 349.9,126.9 350.8,128.0 351.6,129.1 352.5,130.2 353.4,131.3 354.2,132.5 355.1,133.6 356.0,134.7 356.8,135.9 357.7,137.0 358.6,138.1 359.4,139.3 359.4,230" fill="#4051b5" opacity="0.55"/>
<polygon points="359.4,230 359.4,139.3 360.3,140.4 361.2,141.5 362.0,142.7 362.9,143.8 363.8,144.9 364.7,146.1 365.5,147.2 366.4,148.3 367.3,149.4 368.1,150.5 369.0,151.7 369.9,152.8 370.7,153.9 371.6,155.0 372.5,156.1 373.3,157.2 374.2,158.3 375.1,159.4 375.9,160.4 376.8,161.5 377.7,162.6 378.5,163.6 379.4,164.7 380.3,165.7 381.1,166.8 382.0,167.8 382.9,168.8 383.8,169.9 384.6,170.9 385.5,171.9 386.4,172.9 387.2,173.9 388.1,174.8 389.0,175.8 389.8,176.8 390.7,177.7 391.6,178.7 392.4,179.6 393.3,180.5 394.2,181.4 395.0,182.3 395.9,183.2 396.8,184.1 397.6,185.0 398.5,185.9 399.4,186.7 400.2,187.6 401.1,188.4 402.0,189.2 402.8,190.0 403.7,190.9 404.6,191.7 405.5,192.4 406.3,193.2 407.2,194.0 408.1,194.7 408.9,195.5 409.8,196.2 410.7,196.9 411.5,197.6 412.4,198.3 413.3,199.0 414.1,199.7 415.0,200.4 415.9,201.1 416.7,201.7 417.6,202.3 418.5,203.0 419.3,203.6 420.2,204.2 421.1,204.8 421.9,205.4 422.8,206.0 423.7,206.5 424.5,207.1 425.4,207.7 426.3,208.2 427.2,208.7 428.0,209.2 428.9,209.8 428.9,230" fill="#4051b5" opacity="0.32"/>
<polygon points="428.9,230 428.9,209.8 429.8,210.3 430.6,210.7 431.5,211.2 432.4,211.7 433.2,212.2 434.1,212.6 435.0,213.1 435.8,213.5 436.7,213.9 437.6,214.4 438.4,214.8 439.3,215.2 440.2,215.6 441.0,215.9 441.9,216.3 442.8,216.7 443.6,217.1 444.5,217.4 445.4,217.8 446.2,218.1 447.1,218.4 448.0,218.8 448.9,219.1 449.7,219.4 450.6,219.7 451.5,220.0 452.3,220.3 453.2,220.5 454.1,220.8 454.9,221.1 455.8,221.3 456.7,221.6 457.5,221.9 458.4,222.1 459.3,222.3 460.1,222.6 461.0,222.8 461.9,223.0 462.7,223.2 463.6,223.4 464.5,223.6 465.3,223.8 466.2,224.0 467.1,224.2 468.0,224.4 468.8,224.6 469.7,224.7 470.6,224.9 471.4,225.1 472.3,225.2 473.2,225.4 474.0,225.5 474.9,225.7 475.8,225.8 476.6,226.0 477.5,226.1 478.4,226.2 479.2,226.3 480.1,226.5 481.0,226.6 481.8,226.7 482.7,226.8 483.6,226.9 484.4,227.0 485.3,227.1 486.2,227.2 487.0,227.3 487.9,227.4 488.8,227.5 489.7,227.6 490.5,227.7 491.4,227.8 492.3,227.8 493.1,227.9 494.0,228.0 494.9,228.1 495.7,228.1 496.6,228.2 497.5,228.3 498.3,228.3 498.3,230" fill="#4051b5" opacity="0.18"/>
<polyline points="40.0,229.8 43.1,229.7 46.2,229.7 49.4,229.6 52.5,229.6 55.6,229.5 58.8,229.4 61.9,229.3 65.0,229.2 68.1,229.1 71.3,229.0 74.4,228.8 77.5,228.6 80.6,228.4 83.8,228.2 86.9,227.9 90.0,227.6 93.1,227.3 96.2,226.9 99.4,226.5 102.5,226.1 105.6,225.6 108.7,225.0 111.9,224.4 115.0,223.7 118.1,223.0 121.3,222.2 124.4,221.3 127.5,220.3 130.6,219.3 133.8,218.1 136.9,216.8 140.0,215.5 143.1,214.0 146.2,212.4 149.4,210.7 152.5,208.9 155.6,207.0 158.8,204.9 161.9,202.7 165.0,200.4 168.1,197.9 171.2,195.3 174.4,192.6 177.5,189.7 180.6,186.7 183.8,183.6 186.9,180.3 190.0,177.0 193.1,173.5 196.2,169.9 199.4,166.2 202.5,162.4 205.6,158.5 208.8,154.5 211.9,150.5 215.0,146.5 218.1,142.4 221.3,138.4 224.4,134.3 227.5,130.2 230.6,126.2 233.8,122.2 236.9,118.3 240.0,114.6 243.1,110.9 246.2,107.3 249.4,103.9 252.5,100.7 255.6,97.6 258.8,94.8 261.9,92.2 265.0,89.8 268.1,87.6 271.2,85.8 274.4,84.1 277.5,82.8 280.6,81.8 283.8,81.0 286.9,80.5 290.0,80.4 293.1,80.5 296.2,81.0 299.4,81.8 302.5,82.8 305.6,84.1 308.8,85.8 311.9,87.6 315.0,89.8 318.1,92.2 321.2,94.8 324.4,97.6 327.5,100.7 330.6,103.9 333.8,107.3 336.9,110.9 340.0,114.6 343.1,118.3 346.2,122.2 349.4,126.2 352.5,130.2 355.6,134.3 358.8,138.4 361.9,142.4 365.0,146.5 368.1,150.5 371.3,154.5 374.4,158.5 377.5,162.4 380.6,166.2 383.8,169.9 386.9,173.5 390.0,177.0 393.1,180.3 396.3,183.6 399.4,186.7 402.5,189.7 405.6,192.6 408.8,195.3 411.9,197.9 415.0,200.4 418.1,202.7 421.2,204.9 424.4,207.0 427.5,208.9 430.6,210.7 433.8,212.4 436.9,214.0 440.0,215.5 443.1,216.8 446.2,218.1 449.4,219.3 452.5,220.3 455.6,221.3 458.8,222.2 461.9,223.0 465.0,223.7 468.1,224.4 471.2,225.0 474.4,225.6 477.5,226.1 480.6,226.5 483.8,226.9 486.9,227.3 490.0,227.6 493.1,227.9 496.2,228.2 499.4,228.4 502.5,228.6 505.6,228.8 508.8,229.0 511.9,229.1 515.0,229.2 518.1,229.3 521.2,229.4 524.4,229.5 527.5,229.6 530.6,229.6 533.8,229.7 536.9,229.7 540.0,229.8" fill="none" stroke="#e07a1f" stroke-width="3"/>
<text x="116.4" y="262.0" text-anchor="middle" fill="currentColor" font-size="11">2,14%</text>
<text x="185.8" y="262.0" text-anchor="middle" fill="currentColor" font-size="11">13,59%</text>
<text x="255.3" y="262.0" text-anchor="middle" fill="currentColor" font-size="11">34,13%</text>
<text x="324.7" y="262.0" text-anchor="middle" fill="currentColor" font-size="11">34,13%</text>
<text x="394.2" y="262.0" text-anchor="middle" fill="currentColor" font-size="11">13,59%</text>
<text x="463.6" y="262.0" text-anchor="middle" fill="currentColor" font-size="11">2,14%</text>
<line x1="40" y1="230" x2="540" y2="230" stroke="currentColor"/>
<line x1="81.7" y1="230" x2="81.7" y2="234" stroke="currentColor"/><text x="81.7" y="246" text-anchor="middle" fill="currentColor" font-size="11">μ − 3σ</text>
<line x1="151.1" y1="230" x2="151.1" y2="234" stroke="currentColor"/><text x="151.1" y="246" text-anchor="middle" fill="currentColor" font-size="11">μ − 2σ</text>
<line x1="220.6" y1="230" x2="220.6" y2="234" stroke="currentColor"/><text x="220.6" y="246" text-anchor="middle" fill="currentColor" font-size="11">μ − σ</text>
<line x1="290.0" y1="230" x2="290.0" y2="234" stroke="currentColor"/><text x="290.0" y="246" text-anchor="middle" fill="currentColor" font-size="11">μ</text>
<line x1="359.4" y1="230" x2="359.4" y2="234" stroke="currentColor"/><text x="359.4" y="246" text-anchor="middle" fill="currentColor" font-size="11">μ + σ</text>
<line x1="428.9" y1="230" x2="428.9" y2="234" stroke="currentColor"/><text x="428.9" y="246" text-anchor="middle" fill="currentColor" font-size="11">μ + 2σ</text>
<line x1="498.3" y1="230" x2="498.3" y2="234" stroke="currentColor"/><text x="498.3" y="246" text-anchor="middle" fill="currentColor" font-size="11">μ + 3σ</text>
<line x1="220.6" y1="112" x2="359.4" y2="112" stroke="currentColor" stroke-width="1.3"/><line x1="220.6" y1="107" x2="220.6" y2="230" stroke="currentColor" stroke-dasharray="3 3" opacity="0.5"/><line x1="359.4" y1="107" x2="359.4" y2="230" stroke="currentColor" stroke-dasharray="3 3" opacity="0.5"/>
<text x="290.0" y="106.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">68,27%</text>
<line x1="151.1" y1="82" x2="428.9" y2="82" stroke="currentColor" stroke-width="1.3"/><line x1="151.1" y1="77" x2="151.1" y2="230" stroke="currentColor" stroke-dasharray="3 3" opacity="0.5"/><line x1="428.9" y1="77" x2="428.9" y2="230" stroke="currentColor" stroke-dasharray="3 3" opacity="0.5"/>
<text x="290.0" y="76.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">95,45%</text>
<line x1="81.7" y1="52" x2="498.3" y2="52" stroke="currentColor" stroke-width="1.3"/><line x1="81.7" y1="47" x2="81.7" y2="230" stroke="currentColor" stroke-dasharray="3 3" opacity="0.5"/><line x1="498.3" y1="47" x2="498.3" y2="230" stroke="currentColor" stroke-dasharray="3 3" opacity="0.5"/>
<text x="290.0" y="46.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">99,73%</text>
</svg>
<figcaption>La regola 68–95–99,7. Vale per ogni distribuzione normale, qualunque siano μ e σ, perché dipende solo da quante deviazioni standard ci si allontana dal centro.</figcaption>
</figure>

Per le altezze: circa due persone su tre sono alte tra 160 e 180 cm, il 95% tra 150 e 190 cm, quasi tutte tra 140 e 200 cm. La regola funziona anche al contrario, come strumento di controllo. Un valore che dista più di tre deviazioni standard dalla media, in una distribuzione normale, capita circa 3 volte su mille. Se lo vediamo spesso, o se vediamo valori a cinque deviazioni standard, che in una normale capitano circa 3 volte su 10 milioni, le spiegazioni possibili sono due: è successo un evento rarissimo, oppure **il modello è sbagliato**. Nella pratica, la seconda è molto più frequente.

### Il problema inverso: da una probabilità a una soglia {: #quantili }

Finora siamo partiti da una soglia e abbiamo cercato una probabilità. Sono problemi diretti. Molte applicazioni chiedono il contrario: data una probabilità, trovare la soglia corrispondente.

Riprendiamo l’esempio dei redditi, sempre dal libro di Baron. Il governo decide di assegnare dei buoni alimentari al 3% delle famiglie più povere. Al di sotto di quale reddito le famiglie riceveranno i buoni? Dobbiamo trovare un reddito $x$ tale che $P(X<x)=0{,}03$. Standardizziamo come sempre:

$$
P(X<x)=\Phi\left(\frac{x-\mu}{\sigma}\right)=0{,}03.
$$

Ora leggiamo la tabella al contrario: cerchiamo il valore di $z$ per cui $\Phi(z)=0{,}03$. Poiché 0,03 è minore di 0,5, quel $z$ è negativo, e la tabella contiene solo i positivi; per simmetria cerchiamo allora il $z$ positivo con $\Phi(z)=1-0{,}03=0{,}97$, e troviamo $z\approx1{,}88$. Quindi $\Phi(-1{,}88)\approx0{,}03$. Infine torniamo nelle unità del reddito invertendo la standardizzazione: da $z=(x-\mu)/\sigma$ si ricava

$$
x=\mu+z\,\sigma=900+(-1{,}88)\cdot200=900-376=524\ \text{monete}.
$$

Le famiglie con un reddito inferiore a 524 monete riceveranno i buoni. Il procedimento è quello dei problemi diretti percorso all’indietro: prima si trova nella tabella il valore standard $z$, poi si destandardizza con $x=\mu+z\sigma$.

La soglia che lascia sotto di sé una certa frazione dei valori si chiama **quantile**: 524 monete è il quantile al 3% della distribuzione dei redditi. Chi gestisce un servizio informatico fa lo stesso conto quando si chiede quale tempo di risposta viene superato solo dall’1% delle richieste: è il quantile al 99%, che nel gergo dei sistemi si chiama **p99**. Se il tempo di risposta fosse normale con media 200 ms e deviazione standard 20 ms, il p99 sarebbe $200+2{,}326\cdot20\approx246{,}5$ ms, perché $\Phi(2{,}326)\approx0{,}99$.

Con il computer i conti diretti e inversi si fanno in una riga. In Python la libreria standard contiene già la distribuzione normale:

```python
from statistics import NormalDist

altezze = NormalDist(mu=170, sigma=10)   # attenzione: sigma, non sigma^2
print(1 - altezze.cdf(180))              # P(X > 180) = 0.1586...
redditi = NormalDist(mu=900, sigma=200)
print(redditi.inv_cdf(0.03))             # quantile al 3%: 523.8...
```

Lo stesso si fa con la libreria scientifica SciPy, con `scipy.stats.norm.cdf(180, loc=170, scale=10)` e `scipy.stats.norm.ppf(0.03, loc=900, scale=200)`. In tutti questi casi il secondo parametro è la deviazione standard, non la varianza.

### Quando la campana descrive bene i dati {: #normale-informatica }

Perché la distribuzione normale compare così spesso? Gauss e De Moivre ci hanno lasciato un indizio: in entrambe le loro situazioni il risultato era la somma di tanti piccoli contributi indipendenti. È questa la situazione in cui la campana descrive bene i dati: una grandezza che nasce dalla **somma di molti piccoli disturbi indipendenti**, nessuno dei quali domina gli altri. L’errore di un sensore, il tempo di un benchmark ripetuto, l’errore di un orologio di sistema sono di questo tipo. In questi casi la regola 68–95–99,7 diventa un linguaggio comune: un benchmark con media 120 ms e $\sigma=3$ ms che un giorno dà 135 ms è a cinque deviazioni standard dalla media, e vale la pena cercarne la causa invece di archiviarlo come sfortuna.

Non tutto, però, è normale. I tempi di risposta reali dei servizi web, per esempio, non sono mai negativi, sono asimmetrici e ogni tanto presentano valori molto grandi, per una pausa del garbage collector, un disco lento, una ritrasmissione. Una distribuzione normale con la stessa media e la stessa deviazione standard direbbe che quei valori sono praticamente impossibili, e prometterebbe tempi migliori di quelli veri. Per questo chi gestisce sistemi in produzione misura i quantili direttamente sui dati, invece di calcolarli con $\mu+z\sigma$. Come per la distribuzione di Poisson ([Settimana 5, §19](../settimana_05/index.md#sovradispersione)), il modello va controllato sui dati: un istogramma, o il conteggio dei valori oltre $3\sigma$, dice subito se la campana è credibile.

C’è una battuta che il matematico Henri Poincaré riporta nel suo *Calcul des probabilités* e attribuisce al fisico Gabriel Lippmann: tutti credono nella legge normale degli errori, «gli sperimentatori perché pensano che sia un teorema di matematica, i matematici perché pensano che sia un fatto sperimentale». La battuta coglie un punto serio: la campana è un modello, giustificato dalla matematica quando la grandezza è una somma di tanti piccoli effetti, e da controllare sui dati in tutti gli altri casi.

### Laboratorio: la campana nasce dagli errori {: #lab-normale }

Il secondo script ripete in piccolo l’idea di Gauss e di De Moivre. Ogni misura è disturbata da **50 piccoli errori indipendenti**, ciascuno distribuito uniformemente tra $-0{,}1$ e $+0{,}1$: nessuno di loro, da solo, ha la forma di una campana. L’errore totale è la loro somma. Lo script disegna l’istogramma di 20 000 errori totali, ci sovrappone la distribuzione normale con la stessa media e la stessa deviazione standard, controlla la regola 68–95–99,7 e infine rifà con `NormalDist` i conti delle altezze e dei redditi.

<div class="psi-exec" markdown="1">
```python
from statistics import NormalDist

import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(1801)   # l'anno di Cerere

# Ogni misura = valore vero + 50 piccoli errori indipendenti,
# ciascuno uniforme tra -0,1 e +0,1 (vibrazioni, lettura, aria...).
N_MISURE, N_ERRORI = 20_000, 50
errori = rng.uniform(-0.1, 0.1, size=(N_MISURE, N_ERRORI))
scarto = errori.sum(axis=1)          # errore totale di ogni misura

mu, sigma = scarto.mean(), scarto.std()
print(f"media degli errori: {mu:+.4f}   sigma: {sigma:.4f}")
for k in [1, 2, 3]:
    dentro = np.mean(np.abs(scarto - mu) < k * sigma)
    print(f"entro {k} sigma: {dentro:.3f}")

# La campana con la stessa media e la stessa sigma.
x = np.linspace(-1.6, 1.6, 400)
campana = [NormalDist(mu, sigma).pdf(v) for v in x]
plt.hist(scarto, bins=60, density=True, alpha=0.6,
         label="Errori simulati")
plt.plot(x, campana, label="Normale con stessa media e sigma")
plt.xlabel("Errore totale di una misura")
plt.ylabel("Densità")
plt.legend()
plt.tight_layout()
plt.show()

# Calcoli con la distribuzione normale.
altezze = NormalDist(mu=170, sigma=10)
redditi = NormalDist(mu=900, sigma=200)
print(f"P(altezza > 180 cm)       = {1 - altezze.cdf(180):.4f}")
print(f"P(600 < reddito < 1200)   = {redditi.cdf(1200) - redditi.cdf(600):.4f}")
print(f"soglia dei buoni (3%)     = {redditi.inv_cdf(0.03):.1f} monete")
```
</div>

Lo script trova una deviazione standard di circa 0,41 e frazioni entro una, due e tre deviazioni standard vicine a 0,68, 0,95 e 0,997: la regola della campana, anche se nessun singolo errore era a campana. Poi stampa 0,1587, 0,8664 e circa 523,8 monete; la differenza con il 524 del conto a mano viene dall’aver arrotondato $z$ a $-1{,}88$. Prova a sostituire `N_ERRORI = 50` con `N_ERRORI = 2`: l’istogramma diventa un triangolo, e la campana lo descrive male. Servono **tanti** piccoli contributi. Il perché lo vedremo con il Teorema del Limite Centrale, nella Settimana 9.

## Lettura A — Il paradosso di Bertrand, con i conti {: #bertrand-esteso .psi-facoltativo }

Questa lettura è facoltativa. Riprende i tre ragionamenti dell’Atto I con i conti completi e li verifica con una simulazione.

Prendiamo un cerchio di raggio 1. Il triangolo equilatero inscritto ha lato $\sqrt3\approx1{,}732$, e la distanza dei suoi lati dal centro, cioè il raggio del cerchio inscritto nel triangolo, è $1/2$.

Un fatto geometrico unisce i tre metodi. Una corda che dista $d$ dal centro ha lunghezza $2\sqrt{1-d^2}$. Infatti metà corda, la distanza $d$ e il raggio formano un triangolo rettangolo, con il raggio come ipotenusa, e il teorema di Pitagora dà $(\text{metà corda})^2=1-d^2$. La corda è più lunga del lato quando $2\sqrt{1-d^2}>\sqrt3$, cioè quando $1-d^2>3/4$, cioè quando $d<1/2$. In tutti e tre i metodi la corda è lunga esattamente quando il suo punto medio dista dal centro meno di $1/2$; ciò che cambia è la distribuzione di quella distanza.

Nel primo metodo fissiamo il primo estremo $A$, e il secondo cade in un punto uniforme della circonferenza. Il triangolo con un vertice in $A$ ha gli altri due vertici che, insieme ad $A$, dividono la circonferenza in tre archi uguali. La corda supera il lato solo se il secondo estremo cade nell’arco opposto ad $A$, che è un terzo della circonferenza: la probabilità è $1/3$.

Nel secondo metodo, fissata la direzione, la distanza $d$ del punto medio dal centro è uniforme tra 0 e 1. Serve $d<1/2$, e per la distribuzione uniforme dell’Atto III la probabilità è $(1/2-0)/(1-0)=1/2$.

Nel terzo metodo il punto medio è uniforme nel disco, cioè la probabilità di una regione è proporzionale alla sua area. Serve $d<1/2$: il punto medio deve cadere nel disco di raggio $1/2$, che ha area $\pi/4$ contro l’area $\pi$ del disco intero. La probabilità è $1/4$.

Prima della corda, Bertrand propone un esempio ancora più semplice (p. 4). Scegliamo «a caso» un numero tra 0 e 100: la probabilità che superi 50 sembra $1/2$. Ma scegliere il numero equivale a sceglierne il quadrato, tra 0 e 10 000; e il numero supera 50 esattamente quando il quadrato supera 2500. Se è il **quadrato** a essere uniforme, la probabilità è $7500/10\,000=3/4$. «I due problemi sono identici», scrive Bertrand. «Da dove viene la differenza delle risposte? Gli enunciati mancano di precisione.» Dire «uniforme» richiede di dire su quale grandezza.

Lo script seguente genera 50 000 corde con ciascun metodo e conta quelle più lunghe di $\sqrt3$.

<div class="psi-exec" markdown="1">
```python
import random
from math import cos, pi, sin, sqrt

random.seed(1889)            # l'anno del libro di Bertrand
N = 50_000                   # corde per ciascun metodo
LATO = sqrt(3)               # lato del triangolo inscritto (raggio 1)


def corda_estremi():
    """Metodo 1: due punti scelti a caso sulla circonferenza."""
    a = random.uniform(0, 2 * pi)
    b = random.uniform(0, 2 * pi)
    # Distanza tra due punti del cerchio di raggio 1.
    return sqrt((cos(a) - cos(b)) ** 2 + (sin(a) - sin(b)) ** 2)


def corda_raggio():
    """Metodo 2: distanza del punto medio dal centro, uniforme su [0, 1]."""
    d = random.uniform(0, 1)
    return 2 * sqrt(1 - d * d)  # Pitagora: metà corda = sqrt(1 - d^2)


def corda_punto_medio():
    """Metodo 3: punto medio uniforme dentro il disco."""
    while True:
        # Punto uniforme nel quadrato; teniamo solo quelli nel disco.
        x, y = random.uniform(-1, 1), random.uniform(-1, 1)
        if x * x + y * y <= 1:
            return 2 * sqrt(1 - (x * x + y * y))


for nome, metodo, teoria in [("estremi a caso", corda_estremi, 1 / 3),
                             ("raggio a caso", corda_raggio, 1 / 2),
                             ("punto medio a caso", corda_punto_medio,
                              1 / 4)]:
    lunghe = sum(metodo() > LATO for _ in range(N))
    print(f"{nome:20s} frequenza {lunghe / N:.3f}"
          f"   teoria {teoria:.3f}")
```
</div>

Le tre frequenze sono vicine a 0,333, 0,500 e 0,250. Nessuno dei tre generatori sbaglia: producono tre distribuzioni diverse di corde. In un programma la domanda di Bertrand si traduce così: quale procedura di campionamento sto usando? Chi genera punti «a caso» in un cerchio scegliendo raggio e angolo uniformi, per esempio, li addensa vicino al centro senza volerlo: è lo stesso scarto che separa il secondo metodo dal terzo.

## Lettura B — Jaynes: quali trasformazioni lasciano lo stesso problema? {: #jaynes-invarianze .psi-facoltativo }

Questa lettura è facoltativa. Riprende l’argomento di E. T. Jaynes nell’articolo [*The Well-Posed Problem* (1973)](https://bayes.wustl.edu/etj/articles/well.pdf), soprattutto §§ 2–6: rotazioni, cambiamenti di scala e traslazioni. La domanda è come tradurre le simmetrie di un problema in vincoli sulla distribuzione di probabilità.

### La stessa informazione richiede la stessa assegnazione

L’idea di Jaynes è una richiesta di coerenza: **se una trasformazione lascia invariata l’informazione disponibile, i due problemi devono ricevere assegnazioni di probabilità equivalenti**. Cambiare coordinate comporta sempre una trasformazione della distribuzione. Chiedere che la distribuzione trasformata abbia anche la stessa forma richiede una ragione in più: una simmetria delle informazioni con cui descriviamo l’esperimento.

Questo principio opera anche nel discreto. Per un dado che supponiamo equilibrato, scambiare le etichette delle facce non introduce alcuna distinzione probabilistica: l’assegnazione deve restare la stessa sotto tutte le permutazioni, e quindi ogni faccia ha probabilità $1/6$. Jaynes sviluppa questo ragionamento sul finito nel capitolo 2, «Numerical Values», della versione preliminare del suo libro (pp. 34–36). Nel problema delle corde, le trasformazioni da esaminare sono geometriche.

### Uno stesso insieme di rette, cerchi diversi

Jaynes immagina di lanciare sul piano cannucce molto lunghe e di considerare quelle che intersecano un cerchio. Idealizziamo le cannucce come **rette**: la corda è la parte di una retta interna al cerchio. Possiamo allora tenere ferme le rette e cambiare il cerchio attraverso cui le osserviamo. Ogni volta consideriamo soltanto le rette che lo intersecano: stiamo confrontando distribuzioni **condizionate all’intersezione**.

Il requisito da esaminare è che uno stesso processo di rette, privo di un luogo o di una direzione privilegiati, dia distribuzioni compatibili nei diversi cerchi. Rigenerare da capo le corde secondo una ricetta legata a ciascun nuovo cerchio risponderebbe a un’altra domanda: per esempio, scegliere ogni volta due estremi uniformi restituisce sempre $1/3$, ma non verifica che le stesse rette conservino quella legge passando da un cerchio all’altro.

### Rotazione: nessuna direzione privilegiata

Se l’informazione non distingue il nord dall’est, ruotare il sistema di osservazione deve dare una descrizione equivalente. L’orientazione delle rette è quindi uniforme. **Tutti e tre i metodi di Bertrand rispettano questa simmetria**: le rotazioni da sole lasciano ancora aperta la scelta della distribuzione delle distanze dal centro, e dunque della lunghezza delle corde.

Nell’animazione qui sotto la rotazione è resa visibile facendo girare il centro di un cerchio decentrato intorno al centro iniziale. Il raggio e la distanza fra i centri restano fissi. Le probabilità teoriche restano uguali al variare dell’angolo per tutti e tre i metodi; il campione finito di rette disegnate può avere un aspetto diverso nelle varie posizioni.

### Scala: osservare le stesse rette in un cerchio più piccolo

Consideriamo un cerchio più piccolo, concentrico al primo, e teniamo soltanto le rette che lo attraversano. Chiediamo che, misurando le lunghezze in unità del nuovo raggio, la distribuzione sia la stessa. In questo confronto il metodo dei due estremi uniformi perde la sua proprietà: gli estremi delle nuove corde sul cerchio piccolo non sono più due punti indipendenti e uniformi. Restano compatibili sia il metodo della distanza uniforme sia quello del punto medio uniforme nel disco. Jaynes mostra quindi che **l’invarianza di scala non basta ancora a scegliere tra $1/2$ e $1/4$**.

### Traslazione: nessun centro privilegiato

Spostiamo ora il cerchio rispetto alle rette, senza cambiarne il raggio. Il punto medio della porzione interna a un cerchio cambia quando passiamo all’altro cerchio. Una distribuzione uniforme dei punti medi nell’area del primo disco non resta uniforme nell’area del secondo: quel modello privilegia il centro usato per costruirlo. Nell’argomento di Jaynes è questa richiesta di compatibilità sotto traslazione a selezionare la legge che dà $1/2$.

Possiamo vedere il risultato descrivendo una retta con l’orientazione $\theta\in[0,\pi)$ della sua normale e la distanza **con segno** $p$ da un’origine, misurata lungo quella normale. Senza direzioni privilegiate, per ogni distanza uguali intervalli di $\theta$ ricevono uguale peso; senza posizioni privilegiate, per ogni orientazione uguali intervalli di $p$ ricevono uguale peso. La misura delle rette è quindi proporzionale a $dp\,d\theta$. Sul piano intero questa misura è infinita; otteniamo una probabilità normalizzata quando ci limitiamo alle rette che intersecano un cerchio fissato.

Scegliamo il centro di quel cerchio come origine e chiamiamo $R$ il suo raggio. Per ciascuna orientazione, una retta interseca il cerchio quando $-R<p<R$: l’intervallo ha ampiezza $2R$. La corda è lunga quando $-R/2<p<R/2$: l’intervallo ha ampiezza $R$. Dunque

$$
P\!\left(L>\sqrt3\,R\mid\text{la retta interseca il cerchio}\right)
=\frac{R}{2R}=\frac12.
$$

È la distribuzione ottenuta dal secondo metodo di Bertrand: orientazione uniforme e distanza dal centro uniforme. Questa conclusione dipende dalle ipotesi sul processo di rette e dalle invarianze richieste. I tre conti iniziali restano corretti per i tre esperimenti che descrivono. Lo stesso Jaynes, nel § 6, distingue la distribuzione ricavata dalle informazioni disponibili dalle frequenze di un apparato reale, che può essere costruito per produrre leggi diverse.

### Esplora le tre trasformazioni

Nell’animazione le rette sono generate rispetto al cerchio iniziale e poi restano ferme. Il cerchio osservato resta contenuto in quello iniziale: così tutte le rette che lo attraversano sono già rappresentate dal modello. Le percentuali sono probabilità teoriche condizionate all’intersezione; il disegno è un campione riproducibile.

<iframe class="psi-bertrand-frame" src="bertrand/index.html" title="Paradosso di Bertrand: invarianza per rotazione, scala e traslazione" loading="lazy"></iframe>

[Apri l’animazione in una pagina dedicata](bertrand/index.html){ target="_blank" rel="noopener" }

Prova prima **Ruota** con ciascun metodo: confronta gli angoli mantenendo fissi raggio e distanza fra i centri. Poi prova **Cambia scala**, e infine **Trasla** a raggio fisso. Il valore «Cerchio iniziale» riguarda sempre il disco di partenza; in modalità rotazione il cerchio osservato è già più piccolo e decentrato, quindi un eventuale scarto da quel valore precede la rotazione.

| Metodo iniziale | Rotazione | Riduzione concentrica e condizionamento | Traslazione e condizionamento |
|---|---|---|---|
| Due estremi uniformi sulla circonferenza | Conserva la legge | Cambia la legge | Cambia la legge |
| Distanza dal centro uniforme | Conserva la legge | Conserva la legge | Conserva la legge |
| Punto medio uniforme nel disco | Conserva la legge | Conserva la legge | Cambia la legge |

Le tre simmetrie hanno quindi ruoli diversi. Nell’argomento di Jaynes la condizione di traslazione è già sufficiente, nel contesto isotropo considerato, a determinare il risultato; la scala resta una verifica di compatibilità. Il criterio comune al discreto e al continuo è dichiarare quali trasformazioni rappresentano davvero la stessa informazione e giustificare con esse l’assegnazione di probabilità.

## Lettura C — Gauss e i minimi quadrati {: #minimi-quadrati .psi-facoltativo }

Questa lettura è facoltativa. Mostra, con un esempio piccolo, il legame tra la media aritmetica e il metodo dei minimi quadrati di cui parla Gauss.

Supponiamo di misurare quattro volte la stessa distanza e di ottenere 10, 12, 11 e 13, in qualche unità. Quale numero $c$ riassume meglio le misure? Un criterio naturale è scegliere $c$ in modo che gli scarti $x_i-c$ siano, nel complesso, piccoli. Gauss propone di rendere minima la **somma dei quadrati degli scarti**:

$$
S(c)=\sum_{i=1}^{n}(x_i-c)^2.
$$

Qui $x_1,\dots,x_n$ sono le misure e $n$ il loro numero; il simbolo $\sum_{i=1}^n$ indica la somma su tutte le misure. Mostriamo, senza derivate, che il minimo si ha quando $c$ è la media aritmetica $\bar x=(x_1+\dots+x_n)/n$.

Scriviamo ogni scarto passando per la media, $x_i-c=(x_i-\bar x)+(\bar x-c)$, ed eleviamo al quadrato:

$$
(x_i-c)^2=(x_i-\bar x)^2+2(x_i-\bar x)(\bar x-c)+(\bar x-c)^2.
$$

Sommiamo su tutte le misure. Il termine centrale contiene la somma degli scarti dalla media, $\sum_i(x_i-\bar x)$, che vale zero: poiché $\sum_i x_i=n\bar x$, gli scarti positivi e quelli negativi dalla media si compensano esattamente. Restano

$$
S(c)=\sum_{i=1}^{n}(x_i-\bar x)^2+n(\bar x-c)^2.
$$

Il primo pezzo non dipende da $c$. Il secondo è un quadrato moltiplicato per $n$, quindi non è mai negativo, e vale zero solo per $c=\bar x$. Dunque $S(c)$ è minima quando $c=\bar x$.

Con le nostre misure, $\bar x=(10+12+11+13)/4=11{,}5$. È il collegamento che Gauss sfrutta nell’articolo 179 della *Theoria motus*: se gli errori seguono la sua curva, il valore più probabile è quello che rende minima la somma dei quadrati degli scarti, e per una sola grandezza misurata più volte è proprio la media. Gauss scrive di usare questo principio dal 1795, e riconosce nel testo che a pubblicarlo per primo era stato **Adrien-Marie Legendre**, nelle sue *Nouvelles méthodes pour la détermination des orbites des comètes* (art. 186). Per un’orbita le incognite sono più di una e i conti più lunghi, ma il principio è identico. È lo stesso principio che oggi addestra una regressione lineare, quando si rende minimo l’errore quadratico medio.

## Esercizi: prima prova, poi apri la soluzione {: #esercizi }

Per ogni esercizio scrivi prima, in una frase, che cosa misura la variabile, quale distribuzione ha e con quali parametri, e quale evento ti viene chiesto. Poi fai il conto. I risultati numerici servono a controllare il procedimento; all’esame conta il ragionamento.

### Esercizio 1 — L’autobus ogni dodici minuti {: #esercizio-1 }

Un autobus passa ogni 12 minuti esatti, e tu arrivi alla fermata in un momento qualsiasi, senza conoscere l’orario. Il tuo tempo di attesa $X$, in minuti, è uniforme tra 0 e 12. (a) Scrivi la densità e la funzione di ripartizione di $X$. (b) Qual è la probabilità di aspettare meno di 3 minuti? E più di 10? (c) Qual è l’attesa media? Quanto vale la deviazione standard? (d) Quanto vale $P(X=6)$?

??? esempio-svolto "Soluzione ragionata"
    (a) La densità è $f(x)=1/12$ tra 0 e 12 e zero fuori; la funzione di ripartizione è $F(x)=x/12$ tra 0 e 12, zero prima e 1 dopo. (b) $P(X<3)=F(3)=3/12=0{,}25$; $P(X>10)=1-F(10)=2/12\approx0{,}17$. (c) La media è il centro dell’intervallo, 6 minuti; la varianza è $12^2/12=12$ minuti², e la deviazione standard $\sqrt{12}\approx3{,}46$ minuti. (d) $P(X=6)=0$: per una variabile continua un singolo valore ha probabilità zero. Non è un evento impossibile, ma ha area nulla.

### Esercizio 2 — Aree a gradini {: #esercizio-2 }

Il tempo di risposta $T$ di un servizio, in secondi, ha densità $f(t)=0{,}75$ tra 0 e 1, $f(t)=0{,}25$ tra 1 e 2, e zero altrove. (a) Controlla che sia una densità. (b) Calcola $P(T\le1)$, $P(0{,}5<T<1{,}5)$ e $P(T=1)$. (c) Il valore $f(0{,}2)=0{,}75$ è la probabilità che il tempo sia 0,2 secondi? (d) Disegna la funzione di ripartizione.

??? esempio-svolto "Soluzione ragionata"
    (a) Non è mai negativa, e l’area è la somma di due rettangoli: $0{,}75\cdot1+0{,}25\cdot1=1$. (b) $P(T\le1)=0{,}75\cdot1=0{,}75$. L’intervallo tra 0,5 e 1,5 scavalca il gradino, quindi lo spezziamo dove cambia l’altezza: $0{,}75\cdot0{,}5+0{,}25\cdot0{,}5=0{,}375+0{,}125=0{,}5$. $P(T=1)=0$, perché un punto non ha area. (c) No: $P(T=0{,}2)=0$. Il valore 0,75 è una probabilità per secondo; per esempio, un intervallo di un centesimo di secondo vicino a 0,2 ha probabilità circa $0{,}75\cdot0{,}01=0{,}0075$. (d) La funzione di ripartizione vale 0 prima di 0, sale in linea retta da 0 a 0,75 tra $t=0$ e $t=1$, poi sale più lentamente, sempre in linea retta, fino a 1 in $t=2$, e da lì resta uguale a 1. Sale più in fretta dove la densità è più alta.

### Esercizio 3 — La radio {: #esercizio-3 }

Il numero di anni di funzionamento di una radio ha distribuzione esponenziale di parametro $\lambda=1/8$. (a) Qual è la durata media della radio? (b) Qual è la probabilità che la radio funzioni per più di dieci anni? (c) La radio funziona già da 5 anni: qual è la probabilità che funzioni per almeno altri dieci?

??? esempio-svolto "Soluzione ragionata"
    Chiamiamo $Y$ gli anni di funzionamento, con $Y\sim\operatorname{Exp}(1/8)$, $F(y)=1-e^{-y/8}$ e $S(y)=P(Y>y)=e^{-y/8}$. (a) $\mathbb{E}[Y]=1/\lambda=8$ anni. (b) $P(Y>10)=S(10)=e^{-10/8}=e^{-1{,}25}\approx0{,}29$. (c) Per l’assenza di memoria, $P(Y>15\mid Y>5)=P(Y>10)\approx0{,}29$: i cinque anni già trascorsi non cambiano nulla. Come per l’auto del signor Rossi, è il modello a dirlo; una radio vera, che si usura, potrebbe non seguirlo.

### Esercizio 4 — La stampante e la distribuzione di Poisson {: #esercizio-4 }

A una stampante condivisa arrivano in media 3 lavori all’ora, in modo indipendente. (a) Qual è la probabilità che in un’ora non arrivi nessun lavoro? Risolvi in due modi: con la distribuzione esponenziale e con la distribuzione di Poisson. (b) Qual è la probabilità che il prossimo lavoro arrivi tra 10 e 30 minuti da adesso? (c) Il server di stampa non riceve lavori da 40 minuti: qual è la probabilità che ne arrivi uno nei prossimi 5 minuti?

??? esempio-svolto "Soluzione ragionata"
    Il tempo $T$ fino al prossimo lavoro, in ore, è esponenziale con $\lambda=3$. (a) Con la distribuzione esponenziale: $P(T>1)=e^{-3}\approx0{,}050$. Con la distribuzione di Poisson: il numero di lavori in un’ora ha media 3, e $P(X=0)=e^{-3}$. Stesso numero, perché è lo stesso evento: è il ragionamento con cui abbiamo costruito la distribuzione esponenziale. (b) Dieci minuti sono $1/6$ di ora e trenta minuti $1/2$ ora; con la funzione di ripartizione, $F(1/2)-F(1/6)=e^{-3/6}-e^{-3/2}=e^{-0{,}5}-e^{-1{,}5}\approx0{,}607-0{,}223=0{,}384$. (c) Per l’assenza di memoria i 40 minuti di silenzio non contano: la probabilità è $P(T\le1/12)=1-e^{-0{,}25}\approx0{,}221$, la stessa dell’esempio nel testo. L’errore tipico è pensare che dopo un lungo silenzio un lavoro sia ormai «dovuto».

### Esercizio 5 — Le altezze {: #esercizio-5 }

L’altezza delle persone adulte di una popolazione è $X\sim\mathcal{N}(\mu=170,\ \sigma=10)$, in centimetri. (a) Qual è la probabilità che una persona sia più bassa di 180 cm? (b) E che sia alta tra 150 e 175 cm? (c) Su 1000 persone, quante ti aspetti più alte di 190 cm?

??? esempio-svolto "Soluzione ragionata"
    (a) $z=(180-170)/10=1$, quindi $P(X<180)=\Phi(1)=0{,}8413$. (b) Le soglie diventano $z=-2$ e $z=0{,}5$: $\Phi(0{,}5)-\Phi(-2)=0{,}6915-(1-0{,}9772)=0{,}6915-0{,}0228=0{,}6687$. (c) $z=2$, quindi $P(X>190)=1-\Phi(2)=0{,}0228$. Per la linearità del valore atteso, su 1000 persone ce ne aspettiamo circa $1000\cdot0{,}0228\approx23$.

### Esercizio 6 — Tre probabilità da una normale {: #esercizio-6 }

Sia $X\sim\mathcal{N}(\mu=3,\ \sigma^2=16)$. Calcola $P(X>0)$, $P(2<X<5)$ e $P(|X-3|>6)$.

??? esempio-svolto "Soluzione ragionata"
    Prima di tutto, la deviazione standard: $\sigma=\sqrt{16}=4$. È il primo errore da evitare, cioè dividere per 16 invece che per 4.

    $P(X>0)=1-\Phi\big((0-3)/4\big)=1-\Phi(-0{,}75)=1-(1-\Phi(0{,}75))=\Phi(0{,}75)=0{,}7734$.

    $P(2<X<5)=\Phi\big((5-3)/4\big)-\Phi\big((2-3)/4\big)=\Phi(0{,}5)-\Phi(-0{,}25)=0{,}6915-(1-0{,}5987)=0{,}6915-0{,}4013=0{,}2902$.

    Per l’ultima, $|X-3|>6$ vuol dire che $X$ dista dalla media più di 6, cioè $X>9$ oppure $X<-3$. I due eventi sono incompatibili, quindi sommiamo: $P(X>9)+P(X<-3)=\big(1-\Phi(1{,}5)\big)+\Phi(-1{,}5)=2\big(1-\Phi(1{,}5)\big)=2\cdot0{,}0668=0{,}1336$. Nota che 6 è uguale a $1{,}5\sigma$: la domanda chiede la probabilità di allontanarsi dalla media più di una deviazione standard e mezza.

### Esercizio 7 — Quante deviazioni standard? {: #esercizio-7 }

Il servizio A ha un tempo di risposta normale con media 200 ms e $\sigma=20$ ms; il servizio B con media 50 ms e $\sigma=5$ ms. Una richiesta impiega 250 ms su A, un’altra 65 ms su B. In millisecondi la prima supera la media di 50, la seconda di 15. (a) Quale delle due è più anomala? (b) Calcola $P(X>250)$ per A e $P(Y>65)$ per B.

??? esempio-svolto "Soluzione ragionata"
    (a) Su A: $z=(250-200)/20=2{,}5$. Su B: $z=(65-50)/5=3$. È più anomala la seconda, anche se lo scarto in millisecondi è più piccolo: conta lo scarto misurato in deviazioni standard. (b) $1-\Phi(2{,}5)=1-0{,}9938=0{,}0062$; $1-\Phi(3)=1-0{,}9987=0{,}0013$.

### Esercizio 8 — I redditi più alti {: #esercizio-8 }

Con i redditi $X\sim\mathcal{N}(\mu=900,\ \sigma=200)$ dell’esempio nel testo: (a) quale reddito supera solo il 5% delle famiglie? (b) Quale frazione delle famiglie ha un reddito superiore a 1300 monete?

??? esempio-svolto "Soluzione ragionata"
    (a) Cerchiamo $x$ con $P(X>x)=0{,}05$, cioè $\Phi\big((x-900)/200\big)=0{,}95$. Nella tabella $\Phi(1{,}64)=0{,}9495$ e $\Phi(1{,}65)=0{,}9505$, quindi $z\approx1{,}645$. Destandardizziamo: $x=900+1{,}645\cdot200=1229$ monete. (b) $z=(1300-900)/200=2$, quindi $P(X>1300)=1-\Phi(2)=0{,}0228$, circa il 2,3% delle famiglie.

## Errori da evitare {: #errori }

Molti errori di questa settimana nascono dal confondere la densità con una probabilità. Il valore $f(x)$ non è la probabilità che la variabile valga $x$: quella vale zero, e la densità diventa una probabilità solo dopo averla moltiplicata per una larghezza, o meglio dopo averne preso l’area. Se in un tuo conto compare una probabilità maggiore di 1, chiediti se hai preso un’altezza al posto di un’area.

Un secondo gruppo di errori riguarda le unità di misura. Un tasso espresso in eventi all’ora va usato con tempi espressi in ore: con la stampante, $1-e^{-3\cdot5}$ mescola ore e minuti. Allo stesso modo, nella distribuzione normale va sempre controllato se il secondo parametro è la varianza o la deviazione standard: con $\mathcal{N}(\mu=3,\ \sigma^2=16)$ si standardizza dividendo per 4, non per 16. Per lo stesso motivo, quando si usano le librerie di Python conviene ricordare che `NormalDist`, `scipy.stats.norm` e `rng.exponential` vogliono la deviazione standard, o la scala $1/\lambda$, e non la varianza o il tasso.

Un terzo gruppo riguarda la lettura degli eventi. «Entro» si traduce in $F(a)$, «oltre» in $1-F(b)$, «tra» in una differenza: scambiare la coda $e^{-\lambda t}$ con la funzione di ripartizione $1-e^{-\lambda t}$ è un errore frequente. E la tabella di $\Phi$ contiene soltanto valori positivi di $z$: per quelli negativi serve la simmetria $\Phi(-z)=1-\Phi(z)$, non il segno meno davanti al numero letto.

Infine, gli errori di modello. Credere che dopo una lunga attesa un evento esponenziale sia «imminente» è la fallacia del giocatore in versione continua. Usare la distribuzione esponenziale per un oggetto che invecchia, o la distribuzione normale per dati asimmetrici con valori estremi frequenti, porta a conti corretti su un modello sbagliato. Prima di scegliere una formula, conviene chiedersi se le ipotesi del modello valgono.

## Riepilogo per lo studio {: #riepilogo }

Una variabile aleatoria continua può assumere qualunque valore di un intervallo. Per lei un singolo valore ha probabilità zero, e la probabilità sta negli intervalli: è l’area sotto la **densità** $f$, una funzione mai negativa con area totale 1, che dice dove la probabilità è concentrata ma non è essa stessa una probabilità. La **funzione di ripartizione** $F(x)=P(X\le x)$ accumula quell’area da sinistra verso destra, e permette di calcolare le probabilità di «entro», «tra» e «oltre» con una lettura, una differenza o un complemento. La lezione di Bertrand riguarda sia il discreto sia il continuo: i valori possibili di una variabile non ne determinano la distribuzione, che va giustificata attraverso le ipotesi del modello.

La **distribuzione uniforme** su $[a,b]$ ha una densità costante, un rettangolo alto $1/(b-a)$; la probabilità di un intervallo è la sua lunghezza relativa, la media è il centro $(a+b)/2$ e la varianza è $(b-a)^2/12$. La **distribuzione esponenziale** misura il tempo di attesa del prossimo evento in un flusso di Poisson di tasso $\lambda$: dalla probabilità di zero eventi si ricava $P(T>t)=e^{-\lambda t}$, e da lì la funzione di ripartizione $1-e^{-\lambda t}$ e la densità $\lambda e^{-\lambda t}$. La media è $1/\lambda$, la varianza $1/\lambda^2$, e la distribuzione non ha memoria: il tempo già atteso non cambia la probabilità del tempo che resta.

La **distribuzione normale** $\mathcal{N}(\mu,\sigma^2)$ è la campana degli errori di Gauss: $\mu$ è il centro, $\sigma$ la larghezza. La sua funzione di ripartizione non ha una forma chiusa, ma standardizzando, $z=(x-\mu)/\sigma$, ogni distribuzione normale si riporta alla normale standard, i cui valori $\Phi(z)$ stanno in una tabella; per i valori negativi si usa $\Phi(-z)=1-\Phi(z)$. Entro una, due e tre deviazioni standard dalla media cadono circa il 68%, il 95% e il 99,7% dei valori. Il problema inverso si risolve percorrendo gli stessi passi all’indietro: si cerca $z$ nella tabella e si torna alle unità originali con $x=\mu+z\sigma$.

!!! tip "Prova a raccontarlo senza il formulario"
    Spiega a un compagno perché l’autobus non arriva mai «esattamente» alle 14:18:30 e però arriva di sicuro. Racconta come si passa dalla distribuzione di Poisson alla coda $e^{-\lambda t}$, e perché il signor Rossi dovrebbe diffidare del suo modello. Poi prendi una domanda sulle altezze e risolvila ad alta voce con i tre passi: standardizzare, leggere la tabella, usare complemento o differenza. Se riesci a farlo, le formule della settimana sono diventate strumenti di ragionamento.

## Riferimenti e letture {: #riferimenti }

La dispensa riprende le slide e i notebook del corso degli anni precedenti, che a loro volta adattano due testi presenti nella bibliografia. Le citazioni storiche sono tradotte; le fonti sono letture facoltative.

- **Chris Piech**, *Probability for Computer Scientists*, materiale del corso Stanford CS109: voci «Continuous Distribution», «Exponential Distribution» e «Normal Distribution». L’esempio dell’autobus e gli istogrammi che si raffinano vengono da qui. [Portale del testo](https://chrispiech.github.io/probabilityForComputerScientists/).
- **Michael Baron**, *Probability and Statistics for Computer Scientists*, 2ª ed., CRC Press, 2014, cap. 4, §4.1 (densità) e §4.2 (distribuzioni uniforme, esponenziale e normale), compresi gli esempi della stampante (Esempio 4.5) e dei redditi (Esempi 4.11 e 4.12). [Scheda dell’editore](https://doi.org/10.1201/b14800).
- **Mario Abundo**, note sulla proprietà di mancanza di memoria per variabili aleatorie continue, Università di Roma Tor Vergata, [memlessprcont.pdf](https://www.mat.uniroma2.it/~abundo/memlessprcont.pdf): la dimostrazione con la funzione di sopravvivenza dell’Atto V.
- **Joseph Bertrand**, *Calcul des probabilités*, Parigi, Gauthier-Villars, 1889, cap. I, §§ 4–5, pp. 4–5 (il numero e il suo quadrato; la corda). [Scansione su Internet Archive](https://archive.org/details/calculdesprobab00bertgoog). Alcuni storici datano la prima tiratura al 1888.
- **Edwin T. Jaynes**, *The Well-Posed Problem*, *Foundations of Physics* 3 (1973), §§ 2–6: rotazione, scala, traslazione e distinzione fra assegnazione di probabilità e frequenze sperimentali. [Testo nell’archivio della Washington University](https://bayes.wustl.edu/etj/articles/well.pdf).
- **Edwin T. Jaynes**, *Probability Theory: The Logic of Science*, a cura di G. Larry Bretthorst, Cambridge University Press, 2003, cap. 2, «The Quantitative Rules», paragrafo «Numerical Values»: simmetrie e permutazioni sul finito. Il capitolo 12 dello stesso libro torna sul paradosso di Bertrand. [Scheda dell’editore](https://doi.org/10.1017/CBO9780511790423).
- **Carl Friedrich Gauss**, *Theoria motus corporum coelestium in sectionibus conicis solem ambientium*, Amburgo, 1809. Traduzione inglese di Charles Henry Davis, *Theory of the Motion of the Heavenly Bodies Moving about the Sun in Conic Sections*, Boston, Little, Brown and Co., 1857: prefazione (Cerere, pp. xiv–xv), libro II, sezione III, artt. 175–186 (curva degli errori e minimi quadrati). [Scansione su Internet Archive](https://archive.org/details/theoryofmotionof00gaus); [la prefazione su MacTutor](https://mathshistory.st-andrews.ac.uk/Extras/Gauss_preface/).
- **Abraham De Moivre**, *The Doctrine of Chances*, 3ª edizione, Londra, A. Millar, 1756, pp. 242–254: «A Method of approximating the Sum of the Terms of the Binomial $(a+b)^n$ expanded into a Series», datato 12 novembre 1733. [Scansione su Internet Archive](https://archive.org/details/doctrineofchance00moiv).
- **Henri Poincaré**, *Calcul des probabilités*, Parigi, Gauthier-Villars, 1896 (2ª ed. 1912): la battuta di Gabriel Lippmann sulla legge normale degli errori.
- Documentazione Python: [`statistics.NormalDist`](https://docs.python.org/3/library/statistics.html#statistics.NormalDist), [`scipy.stats.norm`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.norm.html) e [`numpy.random.Generator.exponential`](https://numpy.org/doc/stable/reference/random/generated/numpy.random.Generator.exponential.html).

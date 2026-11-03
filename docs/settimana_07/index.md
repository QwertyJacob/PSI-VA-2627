# Settimana 7 — Galton e le altezze di genitori e figli: distribuzioni congiunte, covarianza e correlazione

<style>
@media screen {
  .md-typeset .md-typeset__scrollwrap { overflow-x: auto; max-width: 100%; }
  .md-typeset div.arithmatex { overflow-x: auto; max-width: 100%; }
  .md-typeset mjx-assistive-mml { max-width: 100%; }
}
.s07-box { border: 1px solid var(--md-default-fg-color--lighter, #bbb); border-radius: 8px; padding: 12px 16px; margin: 1em 0; }
.s07-box label { display: inline-block; margin: 4px 18px 4px 0; }
.s07-box input[type=range] { vertical-align: middle; width: 140px; }
.s07-tab { border-collapse: collapse; margin: 10px auto; }
.s07-tab th, .s07-tab td { border: 1px solid var(--md-default-fg-color--lighter, #bbb); padding: 6px 14px; text-align: center; min-width: 64px; }
.s07-tab .s07-marg { color: #2e9e5b; font-weight: bold; }
.s07-out { font-size: 0.95em; line-height: 1.55; }
.s07-out b.s07-si { color: #2e9e5b; }
.s07-out b.s07-no { color: #e03a3a; }
.s07-svg { width: 100%; max-width: 420px; display: block; margin: 8px auto; font-family: sans-serif; font-size: 13px; }
</style>

*Come si descrivono due grandezze aleatorie che cambiano insieme? Che cosa vuol dire che una «va con» l’altra, e quanto forte è il legame? Da una tabella di studenti universitari alle altezze di genitori e figli raccolte da Francis Galton.*

[:material-presentation: Apri Slide della Lezione](slides/index.html){ .md-button .md-button--primary target="_blank" }

!!! note "Seconda parte in arrivo"
    Per ora è pubblicata la prima parte della settimana, quella della Lezione 1: la distribuzione congiunta, le distribuzioni marginali e l’indipendenza (Atti I–IV), con gli esercizi 1–4. La seconda parte, con la covarianza, il coefficiente di correlazione e le due letture facoltative, sarà pubblicata con la Lezione 2.

## Il percorso e ciò che è richiesto all’esame {: #esame }

Fino a oggi abbiamo studiato una variabile aleatoria alla volta: il numero di teste, il tempo di attesa di un autobus, l’altezza di una persona. Nel mondo reale, però, le grandezze che ci interessano arrivano quasi sempre in coppia, o in gruppi più numerosi. Di uno studente conosciamo l’anno di corso e anche la situazione sentimentale; di un programma, gli errori in un modulo e gli errori in un altro; di una famiglia, l’altezza dei genitori e quella dei figli. La domanda nuova di questa settimana è come descrivere **due variabili aleatorie insieme**, e come misurare quanto l’una «va d’accordo» con l’altra.

Il lavoro è diviso in due parti, che corrispondono alle due lezioni. Nella prima parte impariamo a scrivere e a leggere una **distribuzione congiunta**: una tabella che assegna una probabilità a ogni coppia di valori. Da quella tabella ricaviamo le **distribuzioni marginali**, cioè le distribuzioni di ciascuna variabile presa da sola, e scopriamo che cosa vuol dire, per due variabili, essere **indipendenti**. Nella seconda parte costruiamo due numeri che riassumono il legame tra due variabili: la **covarianza**, che dice se tendono a stare insieme sopra o sotto la loro media, e il **coefficiente di correlazione**, che misura la stessa cosa su una scala fissa da $-1$ a $1$. Chiudiamo con due avvertimenti che ogni informatico che lavora con i dati deve conoscere: due variabili possono essere legate strettamente e avere correlazione zero, e due variabili correlate non sono per questo una la causa dell’altra.

Una sola storia accompagna le due lezioni, quella di **Francis Galton**, un gentiluomo inglese dell’Ottocento, cugino di Charles Darwin, ossessionato dalla misura delle caratteristiche umane. Nella prima lezione lo incontriamo con la sua tavola di chiodi e con una domanda sulle altezze: perché, generazione dopo generazione, gli esseri umani non diventano sempre più giganti o sempre più piccoli? Per rispondere, Galton raccolse le altezze di genitori e figli in una tabella a doppia entrata, proprio come quelle che studieremo. Nella seconda lezione lo ritroviamo riparato sotto una roccia durante un acquazzone, nel momento in cui capì come misurare il legame tra due grandezze: è la nascita della correlazione. Non devi ricordare date e nomi: le storie servono a capire perché le idee della settimana sono nate e quale problema risolvono.

All’esame devi saper leggere una tabella congiunta di due variabili discrete, controllare che sia una distribuzione di probabilità e calcolare con essa la probabilità di un evento qualsiasi, sommando le caselle giuste. Devi saper ricavare le distribuzioni marginali sommando lungo le righe e lungo le colonne, e spiegare perché le marginali da sole non bastano a ricostruire la congiunta. Devi conoscere la definizione di variabili indipendenti, saperla verificare su una tabella e saper mostrare la dipendenza con un controesempio. Devi saper calcolare il valore atteso di una funzione di due variabili, in particolare di $X+Y$ e di $XY$, e sapere che per variabili indipendenti $\mathbb{E}[XY]=\mathbb{E}[X]\,\mathbb{E}[Y]$. Della covarianza devi conoscere la definizione, la formula di calcolo e la lettura geometrica con i quattro quadranti; del coefficiente di correlazione la definizione, il fatto che stia sempre tra $-1$ e $1$ e il significato dei valori estremi. Devi saper spiegare perché variabili indipendenti hanno covarianza nulla e perché il contrario non vale, con un esempio, e perché una correlazione non dimostra un rapporto di causa ed effetto.

Sono invece **facoltative e non richieste all’esame** le due letture in fondo alla dispensa: la prima racconta la retta di Galton e la regressione verso la media, e contiene la dimostrazione del fatto che la correlazione sta tra $-1$ e $1$; la seconda mostra come si descrivono due variabili continue con una densità congiunta e gli integrali doppi. Sono facoltativi anche i riquadri intitolati «Approfondimento facoltativo», che contengono soprattutto dimostrazioni: le formule che dimostrano sono richieste, le dimostrazioni no. Per codice, widget e fonti valgono le [indicazioni generali per lo studio](../index.md#esame).

## Da dove ripartiamo {: #prima-di-cominciare }

Ripercorriamo in breve ciò che ci serve delle settimane passate.

Una variabile aleatoria è una regola che assegna un numero a ogni esito di un esperimento ([Settimana 4](../settimana_04/index.md#definizione-variabile)). Quando scriviamo $X=3$ non stiamo scrivendo un numero, ma un **evento**: l’insieme degli esiti in cui la regola $X$ restituisce 3 ([Settimana 4](../settimana_04/index.md#eventi-valori)). Questa osservazione, che può sembrare un dettaglio, sarà il cuore di tutta la settimana: con due variabili $X$ e $Y$ avremo due famiglie di eventi, $\{X=x\}$ e $\{Y=y\}$, e potremo intersecarli. La distribuzione di una variabile discreta è descritta dalla **PMF** $p_X(x)=P(X=x)$, una tabella di pesi non negativi che sommano a 1 ([Settimana 4](../settimana_04/index.md#pmf)).

Il **valore atteso** $\mathbb{E}[X]=\sum_x x\,p_X(x)$ è il baricentro dei pesi, e lo indicheremo spesso con $\mu_X$ ([Settimana 4](../settimana_04/index.md#baricentro)). Per calcolare la media di una funzione $g(X)$ non serve costruire la distribuzione di $g(X)$: basta la regola LOTUS, $\mathbb{E}[g(X)]=\sum_x g(x)\,p_X(x)$ ([Settimana 4](../settimana_04/index.md#lotus)). E il valore atteso è **lineare**: $\mathbb{E}[aX+b]=a\,\mathbb{E}[X]+b$ e $\mathbb{E}[X+Y]=\mathbb{E}[X]+\mathbb{E}[Y]$, anche quando $X$ e $Y$ dipendono l’una dall’altra ([Settimana 4](../settimana_04/index.md#linearita-dipendenza)). La **varianza** $\operatorname{Var}(X)=\mathbb{E}[(X-\mu_X)^2]$ è la media degli scarti al quadrato dalla media, e la **deviazione standard** $\sigma_X=\sqrt{\operatorname{Var}(X)}$ misura la stessa dispersione nelle unità della variabile ([Settimana 5](../settimana_05/index.md#varianza)). Ricordiamo anche la regola $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$.

Dalla Settimana 2 ci serve il **teorema della probabilità totale**: se gli eventi $B_1,B_2,\dots$ formano una partizione, cioè sono incompatibili a due a due e coprono tutto lo spazio campionario, allora $P(A)=\sum_i P(A\cap B_i)$ ([Settimana 2, §4](../settimana_02/index.md#4-il-teorema-della-probabilita-totale)). Dalla Settimana 1 ci serve la definizione di eventi **indipendenti**: $A$ e $B$ sono indipendenti se $P(A\cap B)=P(A)\,P(B)$, cioè se sapere che uno si è verificato non cambia la probabilità dell’altro ([Settimana 1, §9](../settimana_01/index.md#9-indipendenza-stocastica-e-il-trabocchetto-fondamentale)).

Infine, dalla Settimana 6 ci portiamo la **standardizzazione**: se $X$ ha media $\mu$ e deviazione standard $\sigma$, il numero $z=(x-\mu)/\sigma$ dice di quante deviazioni standard il valore $x$ si allontana dalla media ([Settimana 6](../settimana_06/index.md#standardizzazione)). Un valore con $z=2$ sta due deviazioni standard sopra la media, qualunque sia l’unità di misura di partenza. Ci servirà nella seconda lezione, quando Galton capirà che il legame tra due grandezze si misura proprio così, in unità di deviazione standard.

## Atto I — Una tavola di chiodi e le altezze che non esplodono {: #galton }

**Francis Galton** (1822–1911) era un gentiluomo inglese con una passione quasi maniacale per la misura. Esploratore in Africa da giovane, poi meteorologo, inventore delle prime mappe del tempo e di un metodo per classificare le impronte digitali, nella seconda metà della vita si dedicò a un problema che lo aveva colpito leggendo *L’origine delle specie* di suo cugino Charles Darwin: come si trasmettono le caratteristiche da una generazione all’altra?

Per ragionare sul caso, Galton costruì un apparecchio che oggi chiamiamo **tavola di Galton**, e che lui chiamava *quincunx*: è il nome latino della disposizione a cinque punti, quattro agli angoli e uno al centro, come il cinque sulla faccia di un dado, e i chiodi sono piantati proprio così, ogni fila sfalsata rispetto alla precedente. Lo descrive così nel suo libro *Natural Inheritance* del 1889:

> «I pallini passano attraverso l’imbuto e, uscendo dalla sua estremità stretta, scendono tortuosamente tra i chiodi in un modo curioso e interessante; ciascuno di essi scarta di un passo a destra o a sinistra, a seconda dei casi, ogni volta che urta un chiodo.»
> — F. Galton, *Natural Inheritance*, 1889, cap. V, p. 64 (tradotto dall’inglese)

<figure markdown="0">
<svg viewBox="0 0 580 385" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Schema della tavola di Galton: un imbuto, otto file di chiodi disposti a triangolo e nove colonne in fondo. Un pallino arancione rimbalza a destra o a sinistra a ogni chiodo. Le colonne, alte 1, 8, 28, 56, 70, 56, 28, 8, 1 su 256, seguono una curva a campana tratteggiata.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">La tavola di Galton (quincunx)</text>
<path d="M230 26 L282 50 L282 56 M350 26 L298 50 L298 56" fill="none" stroke="currentColor" stroke-width="2"/>
<circle cx="290.0" cy="62.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="275.0" cy="84.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="305.0" cy="84.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="260.0" cy="106.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="290.0" cy="106.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="320.0" cy="106.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="245.0" cy="128.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="275.0" cy="128.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="305.0" cy="128.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="335.0" cy="128.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="230.0" cy="150.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="260.0" cy="150.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="290.0" cy="150.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="320.0" cy="150.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="350.0" cy="150.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="215.0" cy="172.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="245.0" cy="172.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="275.0" cy="172.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="305.0" cy="172.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="335.0" cy="172.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="365.0" cy="172.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="200.0" cy="194.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="230.0" cy="194.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="260.0" cy="194.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="290.0" cy="194.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="320.0" cy="194.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="350.0" cy="194.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="380.0" cy="194.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="185.0" cy="216.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="215.0" cy="216.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="245.0" cy="216.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="275.0" cy="216.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="305.0" cy="216.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="335.0" cy="216.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="365.0" cy="216.0" r="3" fill="currentColor" opacity="0.75"/>
<circle cx="395.0" cy="216.0" r="3" fill="currentColor" opacity="0.75"/>
<polyline points="290.0,48.0 298.2,68.0 296.8,90.0 298.2,112.0 313.2,134.0 311.8,156.0 313.2,178.0 311.8,200.0 313.2,222.0 320.0,246.0" fill="none" stroke="#e07a1f" stroke-width="2.5"/>
<circle cx="290.0" cy="48.0" r="5" fill="#e07a1f"/>
<line x1="155.0" y1="242.0" x2="155.0" y2="330" stroke="currentColor" opacity="0.35"/>
<rect x="158.0" y="329.2" width="24" height="0.8" fill="#4051b5" opacity="0.55"/>
<text x="170.0" y="344.0" text-anchor="middle" fill="currentColor" font-size="11">1</text>
<line x1="185.0" y1="242.0" x2="185.0" y2="330" stroke="currentColor" opacity="0.35"/>
<rect x="188.0" y="323.4" width="24" height="6.6" fill="#4051b5" opacity="0.55"/>
<text x="200.0" y="344.0" text-anchor="middle" fill="currentColor" font-size="11">8</text>
<line x1="215.0" y1="242.0" x2="215.0" y2="330" stroke="currentColor" opacity="0.35"/>
<rect x="218.0" y="306.8" width="24" height="23.2" fill="#4051b5" opacity="0.55"/>
<text x="230.0" y="344.0" text-anchor="middle" fill="currentColor" font-size="11">28</text>
<line x1="245.0" y1="242.0" x2="245.0" y2="330" stroke="currentColor" opacity="0.35"/>
<rect x="248.0" y="283.6" width="24" height="46.4" fill="#4051b5" opacity="0.55"/>
<text x="260.0" y="344.0" text-anchor="middle" fill="currentColor" font-size="11">56</text>
<line x1="275.0" y1="242.0" x2="275.0" y2="330" stroke="currentColor" opacity="0.35"/>
<rect x="278.0" y="272.0" width="24" height="58.0" fill="#4051b5" opacity="0.55"/>
<text x="290.0" y="344.0" text-anchor="middle" fill="currentColor" font-size="11">70</text>
<line x1="305.0" y1="242.0" x2="305.0" y2="330" stroke="currentColor" opacity="0.35"/>
<rect x="308.0" y="283.6" width="24" height="46.4" fill="#4051b5" opacity="0.55"/>
<text x="320.0" y="344.0" text-anchor="middle" fill="currentColor" font-size="11">56</text>
<line x1="335.0" y1="242.0" x2="335.0" y2="330" stroke="currentColor" opacity="0.35"/>
<rect x="338.0" y="306.8" width="24" height="23.2" fill="#4051b5" opacity="0.55"/>
<text x="350.0" y="344.0" text-anchor="middle" fill="currentColor" font-size="11">28</text>
<line x1="365.0" y1="242.0" x2="365.0" y2="330" stroke="currentColor" opacity="0.35"/>
<rect x="368.0" y="323.4" width="24" height="6.6" fill="#4051b5" opacity="0.55"/>
<text x="380.0" y="344.0" text-anchor="middle" fill="currentColor" font-size="11">8</text>
<line x1="395.0" y1="242.0" x2="395.0" y2="330" stroke="currentColor" opacity="0.35"/>
<rect x="398.0" y="329.2" width="24" height="0.8" fill="#4051b5" opacity="0.55"/>
<text x="410.0" y="344.0" text-anchor="middle" fill="currentColor" font-size="11">1</text>
<line x1="425.0" y1="242.0" x2="425.0" y2="330" stroke="currentColor" opacity="0.35"/>
<line x1="155.0" y1="330" x2="425.0" y2="330" stroke="currentColor"/>
<polyline points="155.0,329.6 156.3,329.6 157.7,329.6 159.0,329.5 160.4,329.5 161.8,329.4 163.1,329.3 164.5,329.3 165.8,329.2 167.2,329.1 168.5,329.0 169.9,328.9 171.2,328.8 172.6,328.7 173.9,328.6 175.2,328.5 176.6,328.4 177.9,328.2 179.3,328.1 180.7,327.9 182.0,327.7 183.3,327.5 184.7,327.3 186.1,327.1 187.4,326.9 188.8,326.6 190.1,326.4 191.4,326.1 192.8,325.8 194.1,325.5 195.5,325.1 196.8,324.8 198.2,324.4 199.6,324.0 200.9,323.6 202.2,323.2 203.6,322.7 204.9,322.2 206.3,321.7 207.6,321.2 209.0,320.6 210.3,320.0 211.7,319.4 213.1,318.8 214.4,318.1 215.8,317.5 217.1,316.7 218.4,316.0 219.8,315.2 221.2,314.5 222.5,313.6 223.8,312.8 225.2,311.9 226.6,311.0 227.9,310.1 229.2,309.2 230.6,308.2 231.9,307.3 233.3,306.3 234.6,305.2 236.0,304.2 237.3,303.1 238.7,302.1 240.1,301.0 241.4,299.9 242.8,298.8 244.1,297.7 245.4,296.6 246.8,295.5 248.2,294.3 249.5,293.2 250.8,292.1 252.2,291.0 253.6,289.9 254.9,288.8 256.2,287.7 257.6,286.7 258.9,285.6 260.3,284.6 261.6,283.6 263.0,282.6 264.4,281.7 265.7,280.8 267.1,279.9 268.4,279.1 269.8,278.2 271.1,277.5 272.4,276.8 273.8,276.1 275.1,275.4 276.5,274.9 277.8,274.3 279.2,273.8 280.6,273.4 281.9,273.0 283.2,272.7 284.6,272.5 285.9,272.3 287.3,272.1 288.6,272.0 290.0,272.0 291.4,272.0 292.7,272.1 294.1,272.3 295.4,272.5 296.8,272.7 298.1,273.0 299.4,273.4 300.8,273.8 302.2,274.3 303.5,274.9 304.9,275.4 306.2,276.1 307.6,276.8 308.9,277.5 310.2,278.2 311.6,279.1 312.9,279.9 314.3,280.8 315.7,281.7 317.0,282.6 318.4,283.6 319.7,284.6 321.1,285.6 322.4,286.7 323.8,287.7 325.1,288.8 326.4,289.9 327.8,291.0 329.1,292.1 330.5,293.2 331.8,294.3 333.2,295.5 334.6,296.6 335.9,297.7 337.2,298.8 338.6,299.9 339.9,301.0 341.3,302.1 342.6,303.1 344.0,304.2 345.4,305.2 346.7,306.3 348.1,307.3 349.4,308.2 350.8,309.2 352.1,310.1 353.4,311.0 354.8,311.9 356.1,312.8 357.5,313.6 358.9,314.5 360.2,315.2 361.6,316.0 362.9,316.7 364.2,317.5 365.6,318.1 367.0,318.8 368.3,319.4 369.6,320.0 371.0,320.6 372.4,321.2 373.7,321.7 375.1,322.2 376.4,322.7 377.8,323.2 379.1,323.6 380.4,324.0 381.8,324.4 383.1,324.8 384.5,325.1 385.9,325.5 387.2,325.8 388.6,326.1 389.9,326.4 391.2,326.6 392.6,326.9 393.9,327.1 395.3,327.3 396.6,327.5 398.0,327.7 399.4,327.9 400.7,328.1 402.0,328.2 403.4,328.4 404.8,328.5 406.1,328.6 407.4,328.7 408.8,328.8 410.2,328.9 411.5,329.0 412.9,329.1 414.2,329.2 415.6,329.3 416.9,329.3 418.2,329.4 419.6,329.5 421.0,329.5 422.3,329.6 423.6,329.6 425.0,329.6" fill="none" stroke="#e07a1f" stroke-width="2" stroke-dasharray="5 3"/>
<text x="445.0" y="70.0" text-anchor="start" fill="currentColor" font-size="12">a ogni chiodo il pallino</text>
<text x="445.0" y="86.0" text-anchor="start" fill="currentColor" font-size="12">va a destra o a sinistra,</text>
<text x="445.0" y="102.0" text-anchor="start" fill="currentColor" font-size="12">con probabilità 1/2</text>
<text x="70.0" y="200.0" text-anchor="start" fill="currentColor" font-size="12">pallini in ciascuna</text>
<text x="70.0" y="216.0" text-anchor="start" fill="currentColor" font-size="12">colonna, su 256:</text>
<text x="70.0" y="232.0" text-anchor="start" fill="currentColor" font-size="12">1, 8, 28, 56, 70, …</text>
<text x="290.0" y="372.0" text-anchor="middle" fill="currentColor" font-size="12">Molti piccoli urti indipendenti: le colonne disegnano la campana.</text>
</svg>
<figcaption>La tavola di Galton con otto file di chiodi. Le altezze delle colonne sono le probabilità della distribuzione binomiale con n = 8 e p = 1/2, moltiplicate per 256; la curva tratteggiata è la campana di Gauss della Settimana 6.</figcaption>
</figure>

Ogni pallino, a ogni fila di chiodi, va a destra o a sinistra come se lanciasse una moneta. Alla fine finisce in una delle colonne in fondo, e il numero della colonna conta quante volte è andato a destra: è una variabile con distribuzione binomiale. Con otto file di chiodi, su 256 percorsi possibili ugualmente probabili, uno solo finisce nella colonna più a sinistra (sempre a sinistra), mentre 70 finiscono in quella centrale (quattro volte a destra e quattro a sinistra, in un ordine qualsiasi). Quando i pallini sono tanti, le colonne disegnano la stessa campana che abbiamo incontrato nella Settimana 6. Galton ne dà la spiegazione con parole che conosciamo già:

> «Il principio su cui si basa il funzionamento dell’apparecchio è che a ogni pallino, lungo il suo percorso, capita un gran numero di piccoli incidenti indipendenti.»
> — F. Galton, *Natural Inheritance*, 1889, cap. V, pp. 64–65 (tradotto dall’inglese)

È la stessa idea del [laboratorio della Settimana 6](../settimana_06/index.md#lab-normale), in cui ogni misura era il valore vero più cinquanta piccoli errori indipendenti: la somma di tanti piccoli contributi indipendenti produce una campana. Galton pensava che l’altezza di una persona funzionasse allo stesso modo, come la somma di moltissime piccole influenze ereditarie e ambientali, e infatti le altezze di una popolazione hanno quasi la forma di una campana.

Ma proprio qui Galton si accorse di un problema. Se l’altezza si eredita, i figli di genitori molto alti dovrebbero essere molto alti, e alcuni di loro, per le solite piccole variazioni, ancora più alti dei genitori. Generazione dopo generazione, la campana dovrebbe allargarsi: dovremmo vedere sempre più giganti e sempre più persone minuscole. Invece la distribuzione delle altezze resta più o meno la stessa nel tempo. Galton racconta la domanda nella sua autobiografia:

> «Come è possibile che una popolazione resti simile nei suoi tratti, nel complesso, per molte generazioni successive, se la discendenza media di ogni coppia somiglia ai genitori? […] Ma da quanto avevo potuto scoprire fino a quel momento, i genitori avevano figli meno eccezionali di loro.»
> — F. Galton, *Memories of My Life*, 1908, cap. XX, p. 300 (tradotto dall’inglese)

Per capire che cosa succedeva, Galton fece la cosa più semplice e più faticosa: raccolse dati. A metà degli anni Ottanta dell’Ottocento offrì perfino premi in denaro alle famiglie che gli mandavano le misure dei propri componenti, e mise insieme, tra l’altro, le altezze di 928 figli adulti di 205 coppie di genitori. Per mettere sullo stesso piano uomini e donne moltiplicò le altezze femminili per 1,08, e per ogni coppia calcolò il **genitore medio**, la media tra il padre e la madre così corretta. Poi dispose i dati in una **tabella a doppia entrata**: in ogni riga una classe di altezza del genitore medio, in ogni colonna una classe di altezza del figlio, e in ogni casella il numero di figli che cadevano in quella coppia di classi. Galton chiamava questi prospetti *tables of correlations*, tabelle di correlazione.

Guardando la tabella, Galton vide ciò che sospettava. I figli dei genitori alti erano in media alti, ma meno dei loro genitori; i figli dei genitori bassi erano in media bassi, ma meno dei loro genitori. In entrambi i casi i figli stavano, in media, più vicini all’altezza media della popolazione:

> «Per quanto possa sembrare paradossale a prima vista, è un fatto teoricamente necessario, e chiaramente confermato dall’osservazione, che la statura dei figli adulti debba essere nel complesso più mediocre di quella dei genitori; cioè più vicina alla media della popolazione.»
> — F. Galton, *Natural Inheritance*, 1889, cap. VII, p. 95 (tradotto dall’inglese)

Qui «mediocre» non è un giudizio: per Galton vuol dire semplicemente «vicino alla media». Il fenomeno prese il nome di **regressione verso la mediocrità**, che oggi chiamiamo **regressione verso la media**, e spiega perché la campana delle altezze non si allarga: ogni generazione produce nuove variazioni, ma i figli degli estremi tornano in parte verso il centro.

Per capire davvero la scoperta di Galton, e per misurare quanto i figli «tornano verso il centro», dobbiamo prima imparare a leggere una tabella come la sua. Una tabella a doppia entrata descrive due variabili alla volta, l’altezza del genitore medio e quella del figlio, e la probabilità che le due cadano insieme in una certa coppia di valori. È il lavoro della prima lezione. Alla seconda lezione torneremo da Galton, ai suoi dati e alla misura del legame che stava cercando.

## Atto II — Due variabili insieme: la distribuzione congiunta {: #congiunta }

Cominciamo, come nelle slide del corso, dal caso più semplice. Lanciamo un dado a sei facce e chiamiamo $X$ il risultato. Ricordiamo tre oggetti diversi che abbiamo imparato a distinguere. $X$ è la variabile aleatoria, cioè la regola che legge il risultato del lancio. $X=1$ è un evento, «il dado mostra 1», e $P(X=1)=1/6$ è la sua probabilità, un numero. Infine $P(X=k)$, pensata al variare di $k$ tra 1 e 6, è una funzione: la funzione di massa di probabilità, o PMF, di $X$.

Ora lanciamo due dadi, uno rosso e uno blu, e chiamiamo $X$ il risultato del rosso e $Y$ quello del blu. Possiamo chiederci la probabilità che il rosso mostri 4 e il blu mostri 3. L’evento è l’intersezione di due eventi, $\{X=4\}\cap\{Y=3\}$, e per brevità la sua probabilità si scrive con una virgola al posto del simbolo di intersezione:

$$
P(X=4,\;Y=3)=P\big(\{X=4\}\cap\{Y=3\}\big).
$$

La virgola, in questa notazione, si legge sempre «e». Quanto vale? Le coppie di risultati possibili sono $6\cdot6=36$, tutte ugualmente probabili se i dadi sono equilibrati e lanciati indipendentemente, e una sola di esse è la coppia (4, 3): la probabilità è $1/36$.

Possiamo fare lo stesso conto per ogni coppia di valori $(x,y)$ e disporre i risultati in una tabella con sei colonne, una per ogni valore di $X$, e sei righe, una per ogni valore di $Y$. Nella casella all’incrocio della colonna $x$ e della riga $y$ scriviamo $P(X=x,\,Y=y)$.

<figure markdown="0">
<svg viewBox="0 0 580 350" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Griglia sei per sei: le colonne sono i valori del primo dado X, le righe i valori del secondo dado Y. Ogni casella contiene 1/36. La casella con X uguale a 4 e Y uguale a 3 è evidenziata in blu.">
<text x="290.0" y="20.0" text-anchor="middle" fill="currentColor" font-weight="bold">Due dadi: la tabella delle 36 coppie</text>
<text x="322.0" y="44.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">X = primo dado</text>
<text x="156.0" y="192.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold" transform="rotate(-90 156 192)">Y = secondo dado</text>
<text x="212.0" y="56.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">1</text>
<text x="180.0" y="86.0" text-anchor="end" fill="currentColor" font-size="12" font-weight="bold">1</text>
<text x="256.0" y="56.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">2</text>
<text x="180.0" y="130.0" text-anchor="end" fill="currentColor" font-size="12" font-weight="bold">2</text>
<text x="300.0" y="56.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">3</text>
<text x="180.0" y="174.0" text-anchor="end" fill="currentColor" font-size="12" font-weight="bold">3</text>
<text x="344.0" y="56.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">4</text>
<text x="180.0" y="218.0" text-anchor="end" fill="currentColor" font-size="12" font-weight="bold">4</text>
<text x="388.0" y="56.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">5</text>
<text x="180.0" y="262.0" text-anchor="end" fill="currentColor" font-size="12" font-weight="bold">5</text>
<text x="432.0" y="56.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">6</text>
<text x="180.0" y="306.0" text-anchor="end" fill="currentColor" font-size="12" font-weight="bold">6</text>
<rect x="190" y="60" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="212.0" y="86.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="234" y="60" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="256.0" y="86.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="278" y="60" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="300.0" y="86.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="322" y="60" width="44" height="44" fill="#4051b5" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
<text x="344.0" y="86.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="366" y="60" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="388.0" y="86.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="410" y="60" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="432.0" y="86.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="190" y="104" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="212.0" y="130.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="234" y="104" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="256.0" y="130.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="278" y="104" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="300.0" y="130.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="322" y="104" width="44" height="44" fill="#4051b5" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
<text x="344.0" y="130.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="366" y="104" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="388.0" y="130.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="410" y="104" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="432.0" y="130.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="190" y="148" width="44" height="44" fill="#4051b5" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
<text x="212.0" y="174.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="234" y="148" width="44" height="44" fill="#4051b5" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
<text x="256.0" y="174.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="278" y="148" width="44" height="44" fill="#4051b5" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
<text x="300.0" y="174.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="322" y="148" width="44" height="44" fill="#4051b5" stroke="currentColor" stroke-opacity="0.5"/>
<text x="344.0" y="174.0" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">1/36</text>
<rect x="366" y="148" width="44" height="44" fill="#4051b5" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
<text x="388.0" y="174.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="410" y="148" width="44" height="44" fill="#4051b5" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
<text x="432.0" y="174.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="190" y="192" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="212.0" y="218.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="234" y="192" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="256.0" y="218.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="278" y="192" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="300.0" y="218.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="322" y="192" width="44" height="44" fill="#4051b5" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
<text x="344.0" y="218.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="366" y="192" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="388.0" y="218.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="410" y="192" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="432.0" y="218.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="190" y="236" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="212.0" y="262.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="234" y="236" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="256.0" y="262.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="278" y="236" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="300.0" y="262.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="322" y="236" width="44" height="44" fill="#4051b5" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
<text x="344.0" y="262.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="366" y="236" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="388.0" y="262.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="410" y="236" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="432.0" y="262.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="190" y="280" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="212.0" y="306.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="234" y="280" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="256.0" y="306.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="278" y="280" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="300.0" y="306.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="322" y="280" width="44" height="44" fill="#4051b5" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
<text x="344.0" y="306.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="366" y="280" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="388.0" y="306.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<rect x="410" y="280" width="44" height="44" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
<text x="432.0" y="306.0" text-anchor="middle" fill="currentColor" font-size="11">1/36</text>
<path d="M466 170.0 L456 170.0" stroke="#4051b5" stroke-width="2" marker-end="url(#f2a)"/>
<defs><marker id="f2a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#4051b5"/></marker></defs>
<text x="470.0" y="162.0" text-anchor="start" fill="#4051b5" font-weight="bold">P(X = 4, Y = 3)</text>
<text x="470.0" y="180.0" text-anchor="start" fill="#4051b5" font-weight="bold">= 1/36</text>
<text x="290.0" y="348.0" text-anchor="middle" fill="currentColor" font-size="12">Una casella per ogni coppia di valori; le 36 caselle insieme sommano 1.</text>
</svg>
<figcaption>La distribuzione congiunta di due dadi equilibrati lanciati indipendentemente. Ogni casella è l’evento «X vale x e Y vale y»; quella blu, all’incrocio della colonna X = 4 e della riga Y = 3, è P(X = 4, Y = 3) = 1/36.</figcaption>
</figure>

Questa tabella si chiama **tabella di probabilità congiunta**. La funzione che a ogni coppia di valori associa la probabilità della coppia,

$$
p_{X,Y}(x,y)=P(X=x,\;Y=y),
$$

si chiama **funzione di massa di probabilità congiunta**, o PMF congiunta, di $X$ e $Y$. La coppia $(X,Y)$, pensata come un unico oggetto aleatorio con due componenti, si chiama **vettore aleatorio**, e la sua distribuzione si chiama **distribuzione congiunta** di $X$ e $Y$. Nelle slide e in molti libri troverai anche la notazione abbreviata $P(x,y)$, in cui la lettera minuscola $x$ sta per l’evento $X=x$: è la stessa cosa scritta più in fretta.

Con i dadi la tabella è noiosa, perché tutte le caselle contengono lo stesso numero. Ma ha già una proprietà importante: contiene le probabilità di tutte le coppie di valori possibili, e quindi, come vedremo subito, permette di rispondere a qualsiasi domanda che riguardi i due dadi insieme.

### Una tabella di studenti {: #tabella-studenti }

Passiamo a una tabella più interessante, che viene dalle lezioni di Chris Piech a Stanford ed è nelle slide del corso. Descrive gli studenti di un’università secondo due caratteristiche: la **situazione sentimentale**, che chiamiamo $X$, e l’**anno di corso**, che chiamiamo $Y$. La situazione sentimentale ha tre valori possibili, che codifichiamo con dei numeri: $X=0$ per «single», $X=1$ per «in una relazione», $X=2$ per «è complicato». L’anno di corso ne ha cinque: $Y=0$ per il primo anno, $Y=1$ per il secondo, e così via fino a $Y=4$ per chi è oltre il quarto anno. I numeri, qui, sono soltanto etichette: avremmo potuto usare lettere o parole.

| | single ($X=0$) | in una relazione ($X=1$) | è complicato ($X=2$) |
|---|:---:|:---:|:---:|
| primo anno ($Y=0$) | 0,21 | 0,00 | 0,00 |
| secondo anno ($Y=1$) | 0,24 | 0,06 | 0,00 |
| terzo anno ($Y=2$) | 0,00 | 0,21 | 0,00 |
| quarto anno ($Y=3$) | 0,00 | 0,11 | 0,00 |
| oltre il quarto ($Y=4$) | 0,00 | 0,02 | 0,15 |

Ogni casella è la probabilità di un evento congiunto. Per esempio, scegliendo a caso uno studente di questa università, la probabilità che sia al secondo anno e single è

$$
P(X=0,\;Y=1)=0{,}24,
$$

mentre la probabilità che sia al primo anno e in una relazione è $P(X=1,\;Y=0)=0$: in questa popolazione non ci sono matricole fidanzate.

Guardiamo ora la tabella nel suo insieme. Ogni casella rappresenta un evento **incompatibile** con tutte le altre: uno studente non può essere contemporaneamente single e in una relazione, né essere contemporaneamente al primo e al secondo anno. Ogni studente, d’altra parte, cade in qualche casella. Le quindici caselle formano dunque una partizione di tutti i casi possibili, e per gli assiomi della probabilità la loro somma deve valere 1:

$$
\sum_{x}\sum_{y}p_{X,Y}(x,y)=1.
$$

Il simbolo con le due sommatorie si legge così: per ogni valore $x$ sommiamo su tutti i valori $y$, e poi sommiamo i risultati su tutti i valori $x$. In pratica vuol dire sommare tutte le caselle della tabella, colonna per colonna oppure riga per riga, come preferiamo. Facciamolo per righe. La riga del primo anno somma a $0{,}21$, quella del secondo a $0{,}24+0{,}06=0{,}30$, quella del terzo a $0{,}21$, quella del quarto a $0{,}11$ e l’ultima a $0{,}02+0{,}15=0{,}17$; in tutto $0{,}21+0{,}30+0{,}21+0{,}11+0{,}17=1{,}00$. La tabella è davvero una distribuzione di probabilità.

C’è una conseguenza che rende le tabelle congiunte così utili. Ogni domanda che riguardi $X$ e $Y$ descrive un evento, e ogni evento di questo tipo è un insieme di caselle. Per rispondere basta individuare le caselle giuste e sommarle, perché sono incompatibili. Qual è la probabilità che uno studente sia single e al più al secondo anno? Le caselle sono due, (single, primo anno) e (single, secondo anno), e la risposta è $0{,}21+0{,}24=0{,}45$. Qual è la probabilità che uno studente sia oltre il secondo anno e non sia single? Le caselle sono sei, quelle delle righe dal terzo anno in poi nelle due colonne di destra: $0{,}21+0{,}00+0{,}11+0{,}00+0{,}02+0{,}15=0{,}49$. Per questo si dice che la tabella congiunta contiene l’**informazione completa** sulle due variabili.

!!! example "Sosta di verifica"
    Con la tabella degli studenti: qual è la probabilità che uno studente sia al quarto anno e in una relazione? Qual è la probabilità che la sua situazione sia complicata e che sia al terzo anno o oltre? Che cosa vuol dire la casella con 0,00 nella riga del terzo anno e nella colonna «è complicato»?

    ??? esempio-svolto "Risposta"
        La prima è una sola casella: $P(X=1,\;Y=3)=0{,}11$. La seconda è un insieme di tre caselle, quelle della colonna «è complicato» nelle righe del terzo anno, del quarto e di chi è oltre: $0{,}00+0{,}00+0{,}15=0{,}15$. La casella vuota dice che, in questa popolazione, nessuno studente del terzo anno descrive la propria situazione come complicata: l’evento congiunto ha probabilità zero.

Abbiamo così il primo strumento della settimana: una tabella che descrive due variabili insieme, con una casella per ogni coppia di valori, caselle non negative che sommano a 1, e la regola «per un evento, somma le sue caselle». Ma spesso la domanda riguarda una sola delle due variabili: per esempio, quanti studenti sono in una relazione, qualunque sia il loro anno? La tabella non ha una casella per questo. È il tema del prossimo atto.

## Atto III — Le distribuzioni marginali {: #marginali }

Chiediamoci, come nelle slide, qual è la probabilità che uno studente sia in una relazione, cioè $P(X=1)$. Nella tabella non c’è una casella con questo evento, perché ogni casella specifica anche l’anno di corso. Però l’evento «in una relazione» si può scomporre secondo l’anno: uno studente in una relazione è in una relazione e al primo anno, oppure in una relazione e al secondo anno, e così via. Questi pezzi sono incompatibili, perché un anno esclude gli altri, e insieme ricostruiscono tutto l’evento. Quindi la probabilità di $X=1$ è la somma delle probabilità dei pezzi, cioè la somma della colonna «in una relazione»:

$$
P(X=1)=\sum_{y}P(X=1,\;Y=y)=0{,}00+0{,}06+0{,}21+0{,}11+0{,}02=0{,}40.
$$

Questo ragionamento lo conosciamo già: è il **teorema della probabilità totale** della [Settimana 2](../settimana_02/index.md#4-il-teorema-della-probabilita-totale). Gli eventi $\{Y=0\},\{Y=1\},\dots,\{Y=4\}$ formano una partizione, perché ogni studente è in uno e un solo anno, e la probabilità di $\{X=1\}$ si ottiene sommando le sue intersezioni con i pezzi della partizione. Nella tabella questa operazione ha una forma molto concreta: si somma lungo una colonna.

Allo stesso modo, la probabilità che uno studente sia al secondo anno, $P(Y=1)$, si ottiene sommando lungo la riga del secondo anno, cioè sulla partizione data dai valori di $X$:

$$
P(Y=1)=\sum_{x}P(X=x,\;Y=1)=0{,}24+0{,}06+0{,}00=0{,}30.
$$

Se facciamo lo stesso conto per ogni colonna e per ogni riga, e scriviamo i risultati ai bordi della tabella, otteniamo la figura seguente.

<figure markdown="0">
<svg viewBox="0 0 580 330" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Tabella della situazione sentimentale degli studenti per anno di corso. La colonna «in una relazione» è evidenziata in blu e la sua somma, 0,40, è scritta nel margine in basso. La riga «secondo anno» è evidenziata in arancione e la sua somma, 0,30, è scritta nel margine a destra.">
<text x="290.0" y="20.0" text-anchor="middle" fill="currentColor" font-weight="bold">Marginali: sommare lungo una colonna o lungo una riga</text>
<text x="318.0" y="46.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">X = situazione sentimentale</text>
<rect x="262" y="66" width="112" height="180" fill="#4051b5" opacity="0.14"/>
<rect x="20" y="126" width="466" height="30" fill="#e07a1f" opacity="0.16"/>
<text x="206.0" y="86.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">single</text>
<text x="318.0" y="86.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">in una relazione</text>
<text x="430.0" y="86.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">è complicato</text>
<text x="526.0" y="86.0" text-anchor="middle" fill="#e07a1f" font-size="12" font-weight="bold">P(Y = y)</text>
<text x="26.0" y="116.0" text-anchor="start" fill="currentColor" font-size="12">primo anno</text>
<text x="206.0" y="116.0" text-anchor="middle" fill="currentColor" font-size="13">0,21</text>
<text x="318.0" y="116.0" text-anchor="middle" fill="currentColor" font-size="13">0,00</text>
<text x="430.0" y="116.0" text-anchor="middle" fill="currentColor" font-size="13">0,00</text>
<text x="526.0" y="116.0" text-anchor="middle" fill="currentColor" font-size="13">0,21</text>
<text x="26.0" y="146.0" text-anchor="start" fill="currentColor" font-size="12">secondo anno</text>
<text x="206.0" y="146.0" text-anchor="middle" fill="currentColor" font-size="13">0,24</text>
<text x="318.0" y="146.0" text-anchor="middle" fill="currentColor" font-size="13">0,06</text>
<text x="430.0" y="146.0" text-anchor="middle" fill="currentColor" font-size="13">0,00</text>
<text x="526.0" y="146.0" text-anchor="middle" fill="#e07a1f" font-size="13" font-weight="bold">0,30</text>
<text x="26.0" y="176.0" text-anchor="start" fill="currentColor" font-size="12">terzo anno</text>
<text x="206.0" y="176.0" text-anchor="middle" fill="currentColor" font-size="13">0,00</text>
<text x="318.0" y="176.0" text-anchor="middle" fill="currentColor" font-size="13">0,21</text>
<text x="430.0" y="176.0" text-anchor="middle" fill="currentColor" font-size="13">0,00</text>
<text x="526.0" y="176.0" text-anchor="middle" fill="currentColor" font-size="13">0,21</text>
<text x="26.0" y="206.0" text-anchor="start" fill="currentColor" font-size="12">quarto anno</text>
<text x="206.0" y="206.0" text-anchor="middle" fill="currentColor" font-size="13">0,00</text>
<text x="318.0" y="206.0" text-anchor="middle" fill="currentColor" font-size="13">0,11</text>
<text x="430.0" y="206.0" text-anchor="middle" fill="currentColor" font-size="13">0,00</text>
<text x="526.0" y="206.0" text-anchor="middle" fill="currentColor" font-size="13">0,11</text>
<text x="26.0" y="236.0" text-anchor="start" fill="currentColor" font-size="12">oltre il quarto</text>
<text x="206.0" y="236.0" text-anchor="middle" fill="currentColor" font-size="13">0,00</text>
<text x="318.0" y="236.0" text-anchor="middle" fill="currentColor" font-size="13">0,02</text>
<text x="430.0" y="236.0" text-anchor="middle" fill="currentColor" font-size="13">0,15</text>
<text x="526.0" y="236.0" text-anchor="middle" fill="currentColor" font-size="13">0,17</text>
<text x="26.0" y="266.0" text-anchor="start" fill="#4051b5" font-size="12" font-weight="bold">P(X = x)</text>
<text x="206.0" y="266.0" text-anchor="middle" fill="currentColor" font-size="13">0,45</text>
<text x="318.0" y="266.0" text-anchor="middle" fill="#4051b5" font-size="13" font-weight="bold">0,40</text>
<text x="430.0" y="266.0" text-anchor="middle" fill="currentColor" font-size="13">0,15</text>
<text x="526.0" y="266.0" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">1,00</text>
<line x1="20" y1="96" x2="566" y2="96" stroke="currentColor"/>
<line x1="20" y1="246" x2="566" y2="246" stroke="currentColor"/>
<line x1="486" y1="66" x2="486" y2="276" stroke="currentColor"/>
<line x1="150" y1="66" x2="150" y2="276" stroke="currentColor" opacity="0.5"/>
<text x="290.0" y="302.0" text-anchor="middle" fill="#4051b5" font-size="12">colonna blu: 0 + 0,06 + 0,21 + 0,11 + 0,02 = 0,40 = P(X = in una relazione)</text>
<text x="290.0" y="322.0" text-anchor="middle" fill="#e07a1f" font-size="12">riga arancione: 0,24 + 0,06 + 0 = 0,30 = P(Y = secondo anno)</text>
</svg>
<figcaption>Le probabilità marginali si scrivono nei margini della tabella: sotto, quelle di X (somme delle colonne); a destra, quelle di Y (somme delle righe). Dati dal corso CS109 di Stanford, ripresi nelle slide del corso.</figcaption>
</figure>

In generale, per due variabili discrete con PMF congiunta $p_{X,Y}$, le **distribuzioni marginali** sono

$$
p_X(x)=\sum_{y}p_{X,Y}(x,y),\qquad p_Y(y)=\sum_{x}p_{X,Y}(x,y).
$$

A parole: per la marginale di $X$ fissiamo il valore $x$ e sommiamo su tutti i valori dell’altra variabile; per la marginale di $Y$ facciamo il contrario. Il nome viene proprio dalla posizione in cui le scriviamo, nei **margini** della tabella. L’operazione si chiama **marginalizzazione**, e si dice che «si marginalizza rispetto a $Y$» quando si somma su tutti i valori di $Y$ per farla sparire.

Il risultato è una distribuzione di una sola variabile a tutti gli effetti. Nella riga in basso della figura ci sono le probabilità di $X$: 0,45 per single, 0,40 per in una relazione, 0,15 per è complicato. Sono non negative e sommano a 1, e sono la PMF di $X$ che abbiamo imparato a usare nelle settimane scorse. Partendo dalla congiunta di due variabili, la marginalizzazione ci restituisce una variabile aleatoria «a una dimensione», con cui sappiamo già lavorare.

Vediamo un secondo esempio delle slide, preso dalle note di Stefania Boffa. A un analista di marketing viene chiesto un modello della relazione tra la vendita di un prodotto e l’età degli acquirenti. L’analista intervista un campione di volontari e registra la loro età e la loro intenzione di acquisto. Chiamiamo $X$ la fascia d’età, con $X=1$ tra i 16 e i 25 anni, $X=2$ tra i 26 e i 45, $X=3$ tra i 46 e gli 85, e chiamiamo $Y$ l’intenzione di acquisto, con $Y=1$ se la persona compra e $Y=2$ se non compra. Le frequenze osservate, usate come probabilità, sono queste:

| | $X=1$ | $X=2$ | $X=3$ | margine |
|---|:---:|:---:|:---:|:---:|
| $Y=1$ (compra) | 0,10 | 0,20 | 0,10 | 0,40 |
| $Y=2$ (non compra) | 0,25 | 0,25 | 0,10 | 0,60 |
| margine | 0,35 | 0,45 | 0,20 | 1 |

Qui le fasce d’età sono sulle colonne e l’intenzione di acquisto sulle righe. Il margine a destra somma lungo le righe: nella riga $Y=1$ la variabile $Y$ è fissata e sommiamo su tutte le età, quindi $0{,}10+0{,}20+0{,}10=0{,}40$ è $P(Y=1)$, la probabilità che una persona compri. Il margine in basso somma lungo le colonne: $0{,}10+0{,}25=0{,}35$ è $P(X=1)$, la probabilità che una persona abbia tra i 16 e i 25 anni. In formule,

$$
P(X=x)=P(X=x,\;Y=1)+P(X=x,\;Y=2)\quad\text{per } x\in\{1,2,3\},
$$

$$
P(Y=y)=P(X=1,\;Y=y)+P(X=2,\;Y=y)+P(X=3,\;Y=y)\quad\text{per } y\in\{1,2\}.
$$

È facile scambiare le etichette dei due margini, perciò conviene ragionare ogni volta come abbiamo appena fatto: lungo quale direzione sto sommando, e quale variabile resta fissa? La variabile che resta fissa è quella di cui sto calcolando la marginale.

!!! example "Sosta di verifica"
    Nella tabella del marketing, qual è la probabilità che una persona abbia più di 25 anni? Qual è la probabilità che abbia al massimo 45 anni e compri?

    ??? esempio-svolto "Risposta"
        «Più di 25 anni» vuol dire $X=2$ oppure $X=3$: dalla marginale di $X$, $0{,}45+0{,}20=0{,}65$, che è anche $1-P(X=1)=1-0{,}35$. «Al massimo 45 anni e compra» è un evento congiunto formato da due caselle, $(X=1,\,Y=1)$ e $(X=2,\,Y=1)$: $0{,}10+0{,}20=0{,}30$.

### Le marginali non bastano {: #marginali-non-bastano }

Abbiamo visto che dalla congiunta si ricavano le marginali. Si può fare il cammino al contrario, cioè ricostruire la tabella congiunta conoscendo soltanto le due marginali? In generale no, e capire perché è importante.

Prendiamo due monete equilibrate e chiamiamo $X$ e $Y$ i loro risultati, con 1 per testa e 0 per croce. Nel primo scenario le lanciamo indipendentemente: le quattro coppie (0, 0), (0, 1), (1, 0) e (1, 1) hanno tutte probabilità $1/4$. Nel secondo scenario lanciamo solo la prima moneta, e poi appoggiamo la seconda sul tavolo mostrando la stessa faccia: ora le coppie possibili sono soltanto (0, 0) e (1, 1), ciascuna con probabilità $1/2$, mentre le coppie miste hanno probabilità zero.

Nel primo scenario, con le due monete lanciate indipendentemente, la tabella congiunta è questa:

| | $Y=0$ | $Y=1$ | margine |
|---|:---:|:---:|:---:|
| $X=0$ | 0,25 | 0,25 | 0,50 |
| $X=1$ | 0,25 | 0,25 | 0,50 |
| margine | 0,50 | 0,50 | 1 |

Nel secondo scenario, con la seconda moneta che copia la prima, la tabella congiunta diventa:

| | $Y=0$ | $Y=1$ | margine |
|---|:---:|:---:|:---:|
| $X=0$ | 0,50 | 0,00 | 0,50 |
| $X=1$ | 0,00 | 0,50 | 0,50 |
| margine | 0,50 | 0,50 | 1 |

Confrontiamo le due tabelle. I margini sono identici: in entrambi gli scenari ciascuna moneta, guardata da sola, dà testa con probabilità $1/2$. Ma le due situazioni sono completamente diverse: nella prima conoscere $X$ non dice nulla su $Y$, nella seconda conoscere $X$ dice esattamente quanto vale $Y$. Le marginali descrivono ciascuna variabile da sola e perdono proprio l’informazione sul legame tra le due, che sta tutta nel modo in cui la probabilità è distribuita dentro la tabella. Marginalizzare è un’operazione che butta via informazione: si può fare in un senso solo.

È la ragione per cui Galton ebbe bisogno di una tabella a doppia entrata. La distribuzione delle altezze dei genitori e quella delle altezze dei figli, ciascuna per conto suo, sono due campane quasi uguali, e non dicono nulla su quanto i figli somiglino ai genitori. Quell’informazione sta solo nella congiunta.

### Tre variabili e oltre {: #tre-variabili }

Tutto ciò che abbiamo detto vale anche per più di due variabili. Nelle slide c’è un esempio, ripreso ancora da Piech, con tre variabili che descrivono una persona: $D$ vale 1 se la persona ha una certa malattia e 0 altrimenti, $S$ vale 1 se sente gli odori e 0 se ha perso l’olfatto, e $F$ descrive la febbre, con tre valori: assente, bassa o alta. La distribuzione congiunta non sta più in una tabella sola: servono due tabelle, una per $D=0$ e una per $D=1$.

| $D=0$ | $S=0$ | $S=1$ | | $D=1$ | $S=0$ | $S=1$ |
|---|:---:|:---:|---|---|:---:|:---:|
| febbre assente | 0,024 | 0,783 | | febbre assente | 0,006 | 0,014 |
| febbre bassa | 0,003 | 0,092 | | febbre bassa | 0,005 | 0,011 |
| febbre alta | 0,001 | 0,046 | | febbre alta | 0,004 | 0,011 |

Ogni casella è la probabilità di un evento congiunto con tre condizioni: per esempio, la probabilità che una persona sia malata, abbia perso l’olfatto e abbia la febbre bassa è $P(D=1,\;S=0,\;F=\text{bassa})=0{,}005$. Attenzione: è una probabilità congiunta, non la probabilità di avere la febbre bassa *sapendo* di essere malati.

La marginalizzazione funziona come prima, ma ora si somma su due variabili. La probabilità di essere malati è la somma di tutte le caselle con $D=1$, cioè di tutta la seconda tabella:

$$
P(D=1)=\sum_{f}\sum_{s}P(D=1,\;F=f,\;S=s)=0{,}006+0{,}014+0{,}005+0{,}011+0{,}004+0{,}011=0{,}051.
$$

Con $D$ il conto è comodo, perché è proprio la variabile che separa le due tabelle. Con le altre variabili bisogna fare più attenzione. Prendiamo la probabilità di aver perso l’olfatto, $P(S=0)$. Con due variabili sarebbe bastato sommare una colonna; qui invece le caselle con $S=0$ stanno in tutte e due le tabelle, perché si può aver perso l’olfatto sia da malati sia da sani. Bisogna quindi sommare due colonne: la colonna $S=0$ della tabella con $D=0$ e la colonna $S=0$ della tabella con $D=1$.

$$
P(S=0)=\sum_{d}\sum_{f}P(D=d,\;F=f,\;S=0)=\underbrace{0{,}024+0{,}003+0{,}001}_{D=0}+\underbrace{0{,}006+0{,}005+0{,}004}_{D=1}=0{,}043.
$$

Se dimenticassimo la seconda tabella otterremmo $0{,}028$, cioè $P(D=0,\;S=0)$: una probabilità congiunta, non la marginale di $S$.

Le caselle, qui, sono $2\cdot2\cdot3=12$: due valori di $D$, per due valori di $S$, per tre valori di $F$. Aggiungere una variabile con due valori ha raddoppiato il numero di caselle. La regola generale è il principio di moltiplicazione della [Settimana 3](../settimana_03/index.md#moltiplicazione): il numero di caselle è il prodotto dei numeri di valori delle singole variabili. Questo prodotto cresce in fretta. Con 10 variabili, ciascuna con 5 valori possibili, le caselle sono

$$
5^{10}=9\,765\,625,
$$

quasi dieci milioni di probabilità da stimare, conservare e sommare. Con le decine o centinaia di variabili di un problema reale, una tabella congiunta completa è semplicemente impossibile da scrivere.

Per questo, quando le variabili sono molte, la distribuzione congiunta non si scrive come una tabella ma come una funzione che calcola la probabilità di una casella a partire dai suoi valori. Un esempio è la distribuzione multinomiale, descritta nel riquadro qui sotto. Un altro, che vedremo nella Settimana 12, è il classificatore Naive Bayes: per decidere se un’email è spam a partire da migliaia di parole, invece di una tabella con un numero astronomico di caselle userà un’ipotesi che spezza la congiunta in tanti pezzi piccoli.

??? note "Approfondimento facoltativo — La distribuzione multinomiale: una tabella scritta come formula"
    Questo riquadro non fa parte del programma d’esame. Ripetiamo $n$ volte, in modo indipendente, un esperimento che ha $m$ esiti possibili, con probabilità $p_1,p_2,\dots,p_m$ che sommano a 1. Per esempio lanciamo un dado $n$ volte, e gli esiti sono le $m=6$ facce. Chiamiamo $X_1$ il numero di volte in cui esce il primo esito, $X_2$ il numero di volte del secondo, e così via fino a $X_m$. Il vettore aleatorio $(X_1,\dots,X_m)$ ha una distribuzione congiunta con moltissime caselle, ma ciascuna si calcola con una formula:

    $$
    P(X_1=c_1,\;X_2=c_2,\;\dots,\;X_m=c_m)=\frac{n!}{c_1!\,c_2!\cdots c_m!}\,p_1^{c_1}p_2^{c_2}\cdots p_m^{c_m},
    $$

    dove i conteggi $c_1,\dots,c_m$ sommano a $n$. Il ragionamento è quello della distribuzione binomiale. Una particolare sequenza di $n$ esiti con $c_1$ volte il primo, $c_2$ volte il secondo e così via ha probabilità $p_1^{c_1}\cdots p_m^{c_m}$, per l’indipendenza delle prove. Le sequenze con gli stessi conteggi sono $n!/(c_1!\cdots c_m!)$: è la generalizzazione del coefficiente binomiale $\binom{n}{k}=n!/\big(k!\,(n-k)!\big)$ della [Settimana 3](../settimana_03/index.md#combinazioni), che contava in quanti modi si scelgono le posizioni dei $k$ successi in una sequenza di $n$ prove. Con $m=2$ si ritrova esattamente la distribuzione binomiale.

    Un esempio: lanciando un dado equilibrato 6 volte, qual è la probabilità che esca ogni faccia una volta? Qui $n=6$, $m=6$, tutti i $c_i$ valgono 1 e tutti i $p_i$ valgono $1/6$:

    $$
    \frac{6!}{1!\cdots1!}\Big(\frac16\Big)^6=\frac{720}{46\,656}\approx0{,}0154.
    $$

    La formula sostituisce una tabella con tutte le combinazioni possibili di conteggi: è il senso della frase delle slide «distribuzioni multidimensionali: funzioni e non tabelle».

Riassumiamo il secondo strumento della settimana. Dalla tabella congiunta si ricava la distribuzione di una sola variabile sommando sull’altra, lungo una riga o una colonna; è la probabilità totale scritta in forma di tabella. Il cammino inverso in generale non si può fare, perché il legame tra le variabili sta dentro la tabella e non nei suoi margini. C’è però un caso speciale in cui le marginali bastano: quando il legame non c’è. È il caso delle variabili indipendenti.

## Atto IV — Variabili aleatorie indipendenti {: #indipendenza }

Nella Settimana 1 abbiamo detto che due eventi $A$ e $B$ sono indipendenti se $P(A\cap B)=P(A)\,P(B)$, cioè se sapere che uno dei due si è verificato non cambia la probabilità dell’altro. Con due variabili aleatorie abbiamo non due eventi, ma due intere famiglie di eventi: tutti gli eventi $\{X=x\}$ e tutti gli eventi $\{Y=y\}$. Diciamo che le variabili sono indipendenti quando ogni evento della prima famiglia è indipendente da ogni evento della seconda.

Due variabili aleatorie discrete $X$ e $Y$ si dicono **indipendenti** se

$$
p_{X,Y}(x,y)=p_X(x)\,p_Y(y)\qquad\text{per tutti i valori } x \text{ e } y.
$$

A parole: ogni casella della tabella congiunta è il prodotto dei due margini che le stanno di fronte, quello della sua colonna e quello della sua riga. Quando questo accade, le marginali bastano davvero a ricostruire la congiunta: basta moltiplicarle.

I due dadi sono indipendenti: ogni casella vale $1/36$, ogni margine vale $1/6$, e $1/36=1/6\cdot1/6$ per tutte le 36 caselle. Anche le due monete lanciate separatamente, nel primo scenario dell’atto precedente, sono indipendenti: $1/4=1/2\cdot1/2$ in ogni casella. Le monete del secondo scenario, in cui la seconda copia la prima, non lo sono: la casella (1, 1) vale $1/2$, mentre il prodotto dei margini è $1/4$.

Che cosa vuol dire l’indipendenza, nei termini che conosciamo dalla Settimana 2? Ricordiamo che la probabilità condizionata di $\{X=x\}$ dato $\{Y=y\}$ è il rapporto

$$
P(X=x\mid Y=y)=\frac{P(X=x,\;Y=y)}{P(Y=y)}.
$$

Nella tabella vuol dire prendere la riga di $y$ e dividerla per il suo margine: si ottiene la distribuzione di $X$ tra i soli casi con $Y=y$. Se le variabili sono indipendenti, al numeratore c’è $P(X=x)\,P(Y=y)$, il fattore $P(Y=y)$ si semplifica e resta $P(X=x)$: sapere quanto vale $Y$ non cambia nulla della distribuzione di $X$. Ogni riga della tabella, divisa per il suo totale, ha lo stesso profilo della marginale di $X$.

Applichiamo la definizione agli studenti. La casella (single, primo anno) vale 0,21, mentre il prodotto dei margini è $0{,}45\cdot0{,}21\approx0{,}095$: già questa casella basta per concludere che situazione sentimentale e anno di corso non sono indipendenti. C’è anche un modo ancora più rapido. La casella (in una relazione, primo anno) vale zero, ma i suoi due margini, 0,40 e 0,21, sono positivi, e il loro prodotto 0,084 non è zero. Una casella vuota con entrambi i margini pieni è sempre un segno di dipendenza. In termini di condizionate: tra le matricole la probabilità di essere single è $0{,}21/0{,}21=1$, mentre nella popolazione intera è 0,45. Sapere l’anno cambia molto la situazione sentimentale che ci aspettiamo.

C’è un’asimmetria importante tra i due verdetti. Per dimostrare che due variabili sono indipendenti bisogna controllare la condizione in tutte le caselle. Per dimostrare che sono dipendenti basta trovarne una in cui la condizione non vale: un solo controesempio.

### Un programma con due moduli {: #due-moduli }

Il notebook degli anni passati sulle distribuzioni congiunte, [«4.3 Distribuzioni congiunte»](https://colab.research.google.com/github/QwertyJacob/colab_handouts_PSI/blob/main/4.3_Distribuzioni_Congiunte.ipynb), propone un esempio dal libro di Michael Baron che mostra perché serve controllare tutte le caselle. Un programma è composto da due moduli. Chiamiamo $X$ il numero di errori nel primo modulo e $Y$ il numero di errori nel secondo. La loro distribuzione congiunta è data così:

$$
P(0,0)=P(0,1)=P(1,0)=0{,}20,\quad P(1,1)=P(1,2)=P(1,3)=0{,}10,\quad P(0,2)=P(0,3)=0{,}05,
$$

dove, come nelle slide, $P(x,y)$ sta per $P(X=x,\;Y=y)$. Tutte le altre coppie hanno probabilità zero. La prima cosa da fare, quando i dati arrivano in questa forma, è metterli in una tabella e sommarne le righe e le colonne:

| | $y=0$ | $y=1$ | $y=2$ | $y=3$ | $P(X=x)$ |
|---|:---:|:---:|:---:|:---:|:---:|
| $x=0$ | 0,20 | 0,20 | 0,05 | 0,05 | 0,50 |
| $x=1$ | 0,20 | 0,10 | 0,10 | 0,10 | 0,50 |
| $P(Y=y)$ | 0,40 | 0,30 | 0,15 | 0,15 | 1 |

Le marginali si leggono subito: il primo modulo è senza errori con probabilità $P(X=0)=0{,}50$, il secondo con probabilità $P(Y=0)=0{,}40$.

Gli errori nei due moduli sono indipendenti? Proviamo la prima casella: $P(0,0)=0{,}20$, e il prodotto dei margini è $0{,}50\cdot0{,}40=0{,}20$. Coincidono. Sarebbe un errore fermarsi qui e concludere che le variabili sono indipendenti: una casella che rispetta la condizione non dimostra nulla. Proviamo la seconda: $P(0,1)=0{,}20$, mentre $0{,}50\cdot0{,}30=0{,}15$. Non coincidono, quindi le variabili sono dipendenti. Non serve guardare altro.

La tabella permette anche di studiare grandezze nuove costruite a partire da $X$ e $Y$. Per esempio, il numero totale di errori nel programma è $Z=X+Y$, e può valere da 0 a 4. Per trovarne la distribuzione usiamo la regola dell’atto II: ogni evento è un insieme di caselle. L’evento $Z=1$ è formato dalle caselle in cui $x+y=1$, cioè (0, 1) e (1, 0), quindi $P(Z=1)=0{,}20+0{,}20=0{,}40$. Le caselle con lo stesso totale stanno sulle diagonali della tabella.

<figure markdown="0">
<svg viewBox="0 0 640 250" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Tabella della distribuzione congiunta degli errori nei due moduli, con X sulle righe e Y sulle colonne. Le caselle con lo stesso valore di X più Y hanno lo stesso colore. A destra la distribuzione del totale Z: 0,20, 0,40, 0,15, 0,15, 0,10.">
<text x="320.0" y="20.0" text-anchor="middle" fill="currentColor" font-weight="bold">Il numero totale di errori Z = X + Y</text>
<text x="300.0" y="50.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">Y = errori nel secondo modulo</text>
<text x="195.0" y="96.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">y = 0</text>
<text x="265.0" y="96.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">y = 1</text>
<text x="335.0" y="96.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">y = 2</text>
<text x="405.0" y="96.0" text-anchor="middle" fill="currentColor" font-size="12" font-weight="bold">y = 3</text>
<text x="46.0" y="135.0" text-anchor="start" fill="currentColor" font-size="12" font-weight="bold">x = 0</text>
<rect x="163" y="113" width="64" height="34" rx="5" fill="#4051b5" opacity="0.22" stroke="#4051b5" stroke-width="2"/>
<text x="195.0" y="135.0" text-anchor="middle" fill="currentColor" font-size="13">0,20</text>
<rect x="233" y="113" width="64" height="34" rx="5" fill="#e07a1f" opacity="0.22" stroke="#e07a1f" stroke-width="2"/>
<text x="265.0" y="135.0" text-anchor="middle" fill="currentColor" font-size="13">0,20</text>
<rect x="303" y="113" width="64" height="34" rx="5" fill="#2e9e5b" opacity="0.22" stroke="#2e9e5b" stroke-width="2"/>
<text x="335.0" y="135.0" text-anchor="middle" fill="currentColor" font-size="13">0,05</text>
<rect x="373" y="113" width="64" height="34" rx="5" fill="#8a4fbf" opacity="0.22" stroke="#8a4fbf" stroke-width="2"/>
<text x="405.0" y="135.0" text-anchor="middle" fill="currentColor" font-size="13">0,05</text>
<text x="46.0" y="175.0" text-anchor="start" fill="currentColor" font-size="12" font-weight="bold">x = 1</text>
<rect x="163" y="153" width="64" height="34" rx="5" fill="#e07a1f" opacity="0.22" stroke="#e07a1f" stroke-width="2"/>
<text x="195.0" y="175.0" text-anchor="middle" fill="currentColor" font-size="13">0,20</text>
<rect x="233" y="153" width="64" height="34" rx="5" fill="#2e9e5b" opacity="0.22" stroke="#2e9e5b" stroke-width="2"/>
<text x="265.0" y="175.0" text-anchor="middle" fill="currentColor" font-size="13">0,10</text>
<rect x="303" y="153" width="64" height="34" rx="5" fill="#8a4fbf" opacity="0.22" stroke="#8a4fbf" stroke-width="2"/>
<text x="335.0" y="175.0" text-anchor="middle" fill="currentColor" font-size="13">0,10</text>
<rect x="373" y="153" width="64" height="34" rx="5" fill="#e03a3a" opacity="0.22" stroke="#e03a3a" stroke-width="2"/>
<text x="405.0" y="175.0" text-anchor="middle" fill="currentColor" font-size="13">0,10</text>
<text x="46.0" y="96.0" text-anchor="start" fill="currentColor" font-size="12">X \ Y</text>
<text x="46.0" y="212.0" text-anchor="start" fill="currentColor" font-size="12" font-weight="bold">X = errori nel primo modulo</text>
<text x="470.0" y="76.0" text-anchor="start" fill="currentColor" font-size="12" font-weight="bold">P(Z = z)</text>
<rect x="470" y="92" width="14" height="14" rx="3" fill="#4051b5" opacity="0.5" stroke="#4051b5"/>
<text x="490.0" y="104.0" text-anchor="start" fill="currentColor" font-size="12">z = 0: 0,20 = 0,20</text>
<rect x="470" y="116" width="14" height="14" rx="3" fill="#e07a1f" opacity="0.5" stroke="#e07a1f"/>
<text x="490.0" y="128.0" text-anchor="start" fill="currentColor" font-size="12">z = 1: 0,20 + 0,20 = 0,40</text>
<rect x="470" y="140" width="14" height="14" rx="3" fill="#2e9e5b" opacity="0.5" stroke="#2e9e5b"/>
<text x="490.0" y="152.0" text-anchor="start" fill="currentColor" font-size="12">z = 2: 0,05 + 0,10 = 0,15</text>
<rect x="470" y="164" width="14" height="14" rx="3" fill="#8a4fbf" opacity="0.5" stroke="#8a4fbf"/>
<text x="490.0" y="176.0" text-anchor="start" fill="currentColor" font-size="12">z = 3: 0,05 + 0,10 = 0,15</text>
<rect x="470" y="188" width="14" height="14" rx="3" fill="#e03a3a" opacity="0.5" stroke="#e03a3a"/>
<text x="490.0" y="200.0" text-anchor="start" fill="currentColor" font-size="12">z = 4: 0,10 = 0,10</text>
<text x="320.0" y="236.0" text-anchor="middle" fill="currentColor" font-size="12">Le caselle dello stesso colore danno lo stesso totale: si sommano.</text>
</svg>
<figcaption>Dalla tabella congiunta alla distribuzione di Z = X + Y: per ogni valore z si sommano le caselle con x + y = z, che formano le diagonali della tabella. Esempio dal libro di Baron, ripreso nel notebook 4.3 degli anni passati.</figcaption>
</figure>

Facendo lo stesso conto per ogni valore otteniamo $P(Z=0)=0{,}20$, $P(Z=1)=0{,}40$, $P(Z=2)=0{,}05+0{,}10=0{,}15$, $P(Z=3)=0{,}05+0{,}10=0{,}15$ e $P(Z=4)=0{,}10$. Per controllo, la somma è $0{,}20+0{,}40+0{,}15+0{,}15+0{,}10=1$.

### Il valore atteso di una funzione di due variabili {: #lotus-due }

Quanti errori ha in media il programma? Con la distribuzione di $Z$ appena trovata è un valore atteso come quelli della Settimana 4:

$$
\mathbb{E}[Z]=0\cdot0{,}20+1\cdot0{,}40+2\cdot0{,}15+3\cdot0{,}15+4\cdot0{,}10=0+0{,}40+0{,}30+0{,}45+0{,}40=1{,}55.
$$

Il programma non avrà mai 1,55 errori, naturalmente: il numero di errori è sempre intero. Ma la media, come il baricentro, non deve essere uno dei valori possibili, e non va arrotondata.

Avremmo potuto evitare di costruire la distribuzione di $Z$. Nella Settimana 4 la regola LOTUS ci permetteva di calcolare la media di $g(X)$ pesando ogni valore $g(x)$ con la probabilità di $x$. Con due variabili vale la stessa cosa, con le caselle della tabella al posto dei valori: per una funzione $g$ di due variabili,

$$
\mathbb{E}[g(X,Y)]=\sum_{x}\sum_{y}g(x,y)\,p_{X,Y}(x,y).
$$

A parole: in ogni casella calcoliamo il valore $g(x,y)$, lo moltiplichiamo per la probabilità della casella e sommiamo su tutte le caselle. Con $g(x,y)=x+y$ ritroviamo $\mathbb{E}[X+Y]=1{,}55$, e lo stesso numero si ottiene anche per la linearità del valore atteso, senza guardare la tabella congiunta: dalle marginali, $\mathbb{E}[X]=0\cdot0{,}5+1\cdot0{,}5=0{,}5$ e $\mathbb{E}[Y]=0\cdot0{,}40+1\cdot0{,}30+2\cdot0{,}15+3\cdot0{,}15=1{,}05$, quindi $\mathbb{E}[X+Y]=0{,}5+1{,}05=1{,}55$. La linearità vale sempre, anche per variabili dipendenti come queste.

La funzione che ci interesserà di più, nella seconda lezione, è il prodotto $g(x,y)=xy$. Con la regola appena vista,

$$
\mathbb{E}[XY]=\sum_{x}\sum_{y}xy\,p_{X,Y}(x,y).
$$

Nella tabella dei due moduli il prodotto $xy$ vale zero in tutte le caselle con $x=0$ o con $y=0$, quindi contribuiscono solo le tre caselle con $x=1$ e $y$ uguale a 1, 2 o 3:

$$
\mathbb{E}[XY]=1\cdot1\cdot0{,}10+1\cdot2\cdot0{,}10+1\cdot3\cdot0{,}10=0{,}10+0{,}20+0{,}30=0{,}60.
$$

Per la media del prodotto non c’è una regola semplice come la linearità: in generale non è il prodotto delle medie. Qui, per esempio, $\mathbb{E}[X]\,\mathbb{E}[Y]=0{,}5\cdot1{,}05=0{,}525$, che non è 0,60.

### Se sono indipendenti, la media del prodotto si spezza {: #prodotto }

C’è però un caso in cui la media del prodotto è il prodotto delle medie: quello delle variabili indipendenti. Vediamolo prima con i due dadi. Ogni casella ha probabilità $1/36$, e

$$
\mathbb{E}[XY]=\sum_{x=1}^{6}\sum_{y=1}^{6}x\,y\,\frac1{36}.
$$

Scriviamo $1/36$ come $1/6\cdot1/6$ e raccogliamo: per ogni $x$ fissato, il fattore $x/6$ è lo stesso in tutta la somma interna, e la somma interna dà $\sum_y y/6=3{,}5$, la media di un dado. Resta $\sum_x (x/6)\cdot3{,}5=3{,}5\cdot3{,}5=12{,}25$. La media del prodotto è proprio il prodotto delle due medie.

Lo stesso ragionamento funziona per tutte le variabili indipendenti, e porta a un risultato che useremo molto:

$$
X \text{ e } Y \text{ indipendenti}\quad\Longrightarrow\quad\mathbb{E}[XY]=\mathbb{E}[X]\,\mathbb{E}[Y].
$$

??? note "Approfondimento facoltativo — Perché la media del prodotto si spezza"
    Se $X$ e $Y$ sono indipendenti, ogni casella è il prodotto dei margini, $p_{X,Y}(x,y)=p_X(x)\,p_Y(y)$. Sostituiamo nella regola per $\mathbb{E}[XY]$:

    $$
    \mathbb{E}[XY]=\sum_{x}\sum_{y}x\,y\,p_X(x)\,p_Y(y)=\sum_{x}x\,p_X(x)\Big(\sum_{y}y\,p_Y(y)\Big).
    $$

    Nel secondo passaggio abbiamo portato fuori dalla somma interna il fattore $x\,p_X(x)$, che non dipende da $y$: per la somma interna è una costante. La somma tra parentesi è $\mathbb{E}[Y]$, un numero che non dipende da $x$, e quindi esce anche dalla somma esterna:

    $$
    \mathbb{E}[XY]=\mathbb{E}[Y]\sum_{x}x\,p_X(x)=\mathbb{E}[Y]\,\mathbb{E}[X].
    $$

    Il punto essenziale è il primo passaggio: senza indipendenza la probabilità della casella non si spezza in un pezzo che dipende solo da $x$ e uno che dipende solo da $y$, e la somma doppia non si separa.

Nei due moduli $\mathbb{E}[XY]=0{,}60$ è diverso da $\mathbb{E}[X]\,\mathbb{E}[Y]=0{,}525$, e questo è coerente con quanto abbiamo trovato: le variabili sono dipendenti. Ma attenzione al verso della freccia. La regola dice che l’indipendenza garantisce l’uguaglianza; non dice che l’uguaglianza garantisca l’indipendenza. Esistono variabili dipendenti per cui la media del prodotto coincide lo stesso con il prodotto delle medie, e le incontreremo nella seconda lezione. Per verificare l’indipendenza resta una sola strada: controllare le caselle.

!!! example "Sosta di verifica"
    Lanciamo due dadi equilibrati e indipendenti. Chiamiamo $X$ il risultato del primo, $Y$ quello del secondo e $S=X+Y$ la loro somma. La tabella congiunta di $X$ e $S$, con le marginali, è questa: ogni numero va diviso per 36 per ottenere la probabilità corrispondente.

    | $X \backslash S$ | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | Totale |
    |:---------------:|--:|--:|--:|--:|--:|--:|--:|--:|---:|---:|---:|-------:|
    | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 6 |
    | 2 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 6 |
    | 3 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 6 |
    | 4 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 6 |
    | 5 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 6 |
    | 6 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 6 |
    | Totale | 1 | 2 | 3 | 4 | 5 | 6 | 5 | 4 | 3 | 2 | 1 | 36 |

    Per esempio, la casella $X=1$, $S=2$ vale $1/36$: corrisponde all’unico esito $(1,1)$ dei due dadi. $X$ e $S$ sono indipendenti? Cerca una casella che risponda alla domanda.

    ??? esempio-svolto "Risposta"
        No. Prendiamo la casella $X=1$, $S=12$: se il primo dado mostra 1, la somma non può essere 12, quindi $P(X=1,\;S=12)=0$. I margini sono invece positivi: $P(X=1)=1/6$ e $P(S=12)=1/36$, con prodotto $1/216\neq0$. Una casella vuota con i margini pieni basta a dimostrare la dipendenza, ed è intuitivo: sapere quanto vale il primo dado cambia ciò che ci aspettiamo dalla somma.

#### Esplora: stesse marginali, tabelle diverse {: #widget-tabella }

Il widget mostra una tabella 2×2 per due variabili che valgono 0 o 1. Con i primi due cursori scegli le marginali, $p=P(X=1)$ e $q=P(Y=1)$; con il terzo scegli $a=P(X=1,\,Y=1)$, la casella in basso a destra. Le altre tre caselle sono costrette dai margini: per esempio, la riga $X=1$ deve sommare a $p$, quindi la casella accanto vale $p-a$. Prima di muovere i cursori, prevedi: per quale valore di $a$ le variabili sono indipendenti? Poi prova a spostare $a$ lasciando fermi $p$ e $q$, e osserva che i margini non cambiano mentre il legame tra le variabili cambia completamente.

<div class="s07-box" id="s07-tabella">
  <label>p = P(X = 1): <input type="range" id="s07-p" min="0.1" max="0.9" step="0.05" value="0.4"> <b id="s07-pv">0,40</b></label>
  <label>q = P(Y = 1): <input type="range" id="s07-q" min="0.1" max="0.9" step="0.05" value="0.5"> <b id="s07-qv">0,50</b></label>
  <label>a = P(X = 1, Y = 1): <input type="range" id="s07-a" min="0" max="0.4" step="0.01" value="0.3"> <b id="s07-av">0,30</b></label>
  <table class="s07-tab" id="s07-t"></table>
  <div class="s07-out" id="s07-tout"></div>
</div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  var sp = document.getElementById('s07-p'), sq = document.getElementById('s07-q'), sa = document.getElementById('s07-a');
  var tab = document.getElementById('s07-t'), out = document.getElementById('s07-tout');
  function f(v) { return (Math.abs(v) < 1e-6 ? 0 : v).toFixed(2).replace('.', ','); }
  function cell(v) { return '<td style="background: rgba(64, 81, 181, ' + (0.08 + 0.6 * v).toFixed(2) + ')">' + f(v) + '</td>'; }
  function render() {
    var p = +sp.value, q = +sq.value;
    var lo = Math.max(0, p + q - 1), hi = Math.min(p, q);
    sa.min = lo.toFixed(2); sa.max = hi.toFixed(2);
    var a = Math.min(Math.max(+sa.value, lo), hi);
    sa.value = a;
    document.getElementById('s07-pv').textContent = f(p);
    document.getElementById('s07-qv').textContent = f(q);
    document.getElementById('s07-av').textContent = f(a);
    var c00 = 1 - p - q + a, c01 = q - a, c10 = p - a, c11 = a;
    tab.innerHTML = '<tr><th></th><th>Y = 0</th><th>Y = 1</th><th>P(X = x)</th></tr>' +
      '<tr><th>X = 0</th>' + cell(c00) + cell(c01) + '<td class="s07-marg">' + f(1 - p) + '</td></tr>' +
      '<tr><th>X = 1</th>' + cell(c10) + cell(c11) + '<td class="s07-marg">' + f(p) + '</td></tr>' +
      '<tr><th>P(Y = y)</th><td class="s07-marg">' + f(1 - q) + '</td><td class="s07-marg">' + f(q) + '</td><td>1</td></tr>';
    var prod = p * q, d = a - prod, indep = Math.abs(d) < 0.005;
    out.innerHTML = 'Se X e Y fossero indipendenti, la casella (1, 1) varrebbe p·q = ' + f(p) + ' · ' + f(q) + ' = <b>' + prod.toFixed(3).replace('.', ',') + '</b>; qui vale a = <b>' + f(a) + '</b>.<br>' +
      'Differenza a − p·q = <b>' + (Math.abs(d) < 5e-4 ? '0,000' : d.toFixed(3).replace('.', ',')) + '</b>: ' +
      (indep ? '<b class="s07-si">indipendenti</b>, ogni casella è il prodotto dei suoi margini.'
             : (d > 0 ? '<b class="s07-no">dipendenti</b>: X = 1 e Y = 1 capitano insieme più spesso di quanto farebbe il caso.'
                      : '<b class="s07-no">dipendenti</b>: X = 1 e Y = 1 capitano insieme meno spesso di quanto farebbe il caso.')) +
      '<br>Il cursore di a va da ' + f(lo) + ' a ' + f(hi) + ': fuori da questo intervallo qualche casella diventerebbe negativa.';
  }
  [sp, sq, sa].forEach(function (s) { s.addEventListener('input', render); });
  render();
});
</script>

Con $p=0{,}40$ e $q=0{,}50$ le variabili sono indipendenti solo per $a=0{,}20$: è l’unico valore per cui la casella (1, 1), e con lei tutte le altre, è il prodotto dei margini. Spostando $a$ verso l’alto le due variabili tendono a valere 1 insieme; spostandolo verso il basso tendono a escludersi. Tieni d’occhio la differenza $a-p\,q$ nell’ultima riga: nella seconda lezione le daremo un nome.

### Laboratorio: dalla tabella alle marginali {: #lab-tabella }

Il primo script rifà con NumPy tutti i conti dei due moduli. La tabella congiunta è una matrice: le marginali sono le somme lungo le righe (`axis=1`) e lungo le colonne (`axis=0`). Per controllare l’indipendenza costruisce la tabella dei prodotti dei margini con `np.outer`, che moltiplica ogni elemento del primo vettore per ogni elemento del secondo, e la confronta casella per casella con la congiunta. Poi calcola la distribuzione di $Z=X+Y$ e i valori attesi con la regola LOTUS a due variabili. In fondo riprende un esempio del notebook 4.3: con tre variabili, marginalizzare vuol dire sommare su tutte le combinazioni delle altre due.

<div class="psi-exec" markdown="1">
```python
import numpy as np

# Errori nei due moduli (Baron, Esempio 3.6).
# Righe: x = errori nel primo modulo (0, 1).
# Colonne: y = errori nel secondo modulo (0, 1, 2, 3).
P = np.array([[0.20, 0.20, 0.05, 0.05],
              [0.20, 0.10, 0.10, 0.10]])
xs = np.array([0, 1])
ys = np.array([0, 1, 2, 3])
print("Somma di tutte le caselle:", round(P.sum(), 10))

# Marginali: somme lungo le righe e lungo le colonne.
p_x = P.sum(axis=1)   # ogni riga ha x fisso   -> P(X = x)
p_y = P.sum(axis=0)   # ogni colonna ha y fisso -> P(Y = y)
print("P(X = x):", p_x)
print("P(Y = y):", p_y)

# Indipendenza: la congiunta deve coincidere, casella per
# casella, con la tabella dei prodotti dei margini.
prodotti = np.outer(p_x, p_y)
print("Prodotti dei margini:\n", prodotti)
print("Indipendenti?", np.allclose(P, prodotti))

# Z = X + Y: si sommano le caselle con lo stesso x + y.
p_z = np.zeros(len(xs) + len(ys) - 1)
for i, x in enumerate(xs):
    for j, y in enumerate(ys):
        p_z[x + y] += P[i, j]
print("P(Z = z) per z = 0, ..., 4:", p_z.round(2))

# Valori attesi con la regola LOTUS a due variabili.
e_x = (xs * p_x).sum()
e_y = (ys * p_y).sum()
e_xy = sum(x * y * P[i, j]
           for i, x in enumerate(xs)
           for j, y in enumerate(ys))
print(f"E[X] = {e_x:.3f}   E[Y] = {e_y:.3f}   "
      f"E[X + Y] = {(np.arange(5) * p_z).sum():.3f}")
print(f"E[XY] = {e_xy:.3f}   E[X] E[Y] = {e_x * e_y:.3f}")


# Dal notebook 4.3: tre variabili con 5 valori ciascuna.
def joint(x, y, z):
    return 1 / 125   # 5 * 5 * 5 caselle equiprobabili


def marginal_x(x):
    return sum(joint(x, y, z) for y in range(5) for z in range(5))


print("P(X = 0) =", round(marginal_x(0), 10))
print("Caselle con 10 variabili da 5 valori:", 5 ** 10)
```
</div>

L’output conferma i conti del testo: le marginali (0,5; 0,5) e (0,4; 0,3; 0,15; 0,15), la risposta `False` alla domanda sull’indipendenza, la distribuzione di $Z$ con media 1,55, e $\mathbb{E}[XY]=0{,}6$ contro $\mathbb{E}[X]\,\mathbb{E}[Y]=0{,}525$. Prova a cambiare la prima riga della matrice in `[0.20, 0.15, 0.075, 0.075]` e la seconda nello stesso modo: le marginali restano quelle di prima, ma ora ogni casella è il prodotto dei margini, la risposta diventa `True` e la media del prodotto diventa uguale al prodotto delle medie.

### Le tabelle congiunte nei sistemi informatici {: #congiunte-informatica }

Una tabella congiunta è il modo naturale di riassumere dati in cui ogni osservazione ha due attributi. Pensiamo ai log di un server web: ogni richiesta ha un endpoint, per esempio `/login` o `/search`, e un codice di risposta, per esempio 200, 404 o 500. Contando le richieste per ogni coppia (endpoint, codice) e dividendo per il totale si ottiene una tabella congiunta di frequenze, che in Python si costruisce con una sola riga, `pandas.crosstab(log.endpoint, log.status, normalize="all", margins=True)`; l’opzione `margins=True` aggiunge proprio le marginali. La marginale dei codici dice quante richieste falliscono in tutto; la marginale degli endpoint dice come si distribuisce il traffico.

La domanda di indipendenza diventa allora una domanda di debugging. Se codice di risposta ed endpoint fossero indipendenti, la frazione di errori 500 sarebbe la stessa per tutti gli endpoint, e gli errori sarebbero probabilmente dovuti a un problema generale, come il database o la rete. Se invece una riga della tabella ha una frazione di errori molto più alta delle altre, la dipendenza indica dove guardare. Infine, l’esplosione del numero di caselle spiega perché nessun sistema reale conserva la tabella congiunta di decine di attributi: i modelli probabilistici usati in informatica, dalle reti bayesiane al classificatore Naive Bayes della Settimana 12, sono modi di scrivere una congiunta enorme come prodotto di pezzi piccoli, sfruttando le indipendenze.

Chiudiamo così la prima lezione. Una distribuzione congiunta descrive due variabili insieme, casella per casella; le marginali descrivono ciascuna variabile da sola e si ottengono sommando; l’indipendenza è il caso speciale in cui la congiunta è il prodotto delle marginali, e in quel caso anche la media del prodotto è il prodotto delle medie. Quando le variabili non sono indipendenti, però, la tabella contiene un legame tra di esse, e abbiamo bisogno di un modo per misurarlo con un numero. È ciò che cercava Galton.

## Atti V–IX — Covarianza e correlazione {: #naworth }

*Seconda parte in arrivo…* Questa parte della dispensa sarà pubblicata con la Lezione 2. Torneremo da Galton e dalla sua tabella delle altezze per misurare il legame tra due variabili con un numero: la covarianza e il coefficiente di correlazione. Vedremo poi perché due variabili incorrelate non sono per forza indipendenti, e perché una correlazione non dimostra un rapporto di causa ed effetto.

## Lettura A — Galton, la retta e la regressione verso la media {: #regressione .psi-facoltativo }

*In arrivo…*

## Lettura B — Due variabili continue: la densità congiunta {: #congiunte-continue .psi-facoltativo }

*In arrivo…*

## Esercizi: prima prova, poi apri la soluzione {: #esercizi }

Per ogni esercizio comincia scrivendo, in una frase, quali sono le due variabili, quali valori possono assumere e in quale casella o insieme di caselle cade l’evento che ti viene chiesto. Poi fai il conto. Gli esercizi di questa prima parte vengono dalle slide del corso. I risultati numerici servono a controllare il procedimento; all’esame conta il ragionamento.

### Esercizio 1 — Due dadi {: #esercizio-1 }

Si lanciano due dadi equilibrati a sei facce, e si chiamano $X$ e $Y$ i due risultati. (a) Quanto vale $P(X=2,\;Y=5)$? Che cosa contiene la tabella congiunta? (b) Ricava $P(X=2)$ dalla tabella, sommando le caselle giuste. (c) Calcola $P(X+Y=7)$ e $P(X>Y)$. (d) Verifica che $X$ e $Y$ sono indipendenti e calcola $\mathbb{E}[XY]$.

??? esempio-svolto "Soluzione ragionata"
    (a) Le coppie sono 36, tutte equiprobabili, quindi $P(X=2,\;Y=5)=1/36$. La tabella ha 36 caselle, una per ogni coppia di valori, e ciascuna contiene $1/36$. (b) $P(X=2)$ è la somma della colonna $X=2$, che ha sei caselle: $6\cdot1/36=1/6$. (c) $X+Y=7$ per le sei coppie (1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1), che stanno su una diagonale della tabella: $6/36=1/6$. $X>Y$ per le caselle sotto la diagonale principale: tolte le 6 caselle con $X=Y$, le 30 rimanenti si dividono a metà tra $X>Y$ e $X<Y$, quindi $15/36\approx0{,}417$. (d) Ogni casella vale $1/36$ e ogni margine $1/6$: $1/36=1/6\cdot1/6$ in tutte le caselle, quindi le variabili sono indipendenti. Allora $\mathbb{E}[XY]=\mathbb{E}[X]\,\mathbb{E}[Y]=3{,}5\cdot3{,}5=12{,}25$.

### Esercizio 2 — La situazione sentimentale degli studenti {: #esercizio-2 }

Con la [tabella degli studenti](#tabella-studenti): (a) verifica che sia una distribuzione di probabilità. (b) Ricava le due distribuzioni marginali. (c) Qual è la probabilità che uno studente sia al terzo anno o oltre? E che non sia single? (d) Situazione sentimentale e anno di corso sono indipendenti? Trova l’argomento più rapido.

??? esempio-svolto "Soluzione ragionata"
    (a) Le caselle non sono negative e la loro somma, riga per riga, è $0{,}21+0{,}30+0{,}21+0{,}11+0{,}17=1$. (b) Sommando le colonne: $P(X=0)=0{,}45$, $P(X=1)=0{,}40$, $P(X=2)=0{,}15$. Sommando le righe: $P(Y=0)=0{,}21$, $P(Y=1)=0{,}30$, $P(Y=2)=0{,}21$, $P(Y=3)=0{,}11$, $P(Y=4)=0{,}17$. (c) «Terzo anno o oltre» è $Y\ge2$: dalla marginale di $Y$, $0{,}21+0{,}11+0{,}17=0{,}49$. «Non single» è $X\neq0$: $1-0{,}45=0{,}55$. (d) Non sono indipendenti. L’argomento più rapido è una casella vuota con i margini pieni: $P(X=1,\;Y=0)=0$, mentre $P(X=1)\,P(Y=0)=0{,}40\cdot0{,}21=0{,}084$.

### Esercizio 3 — Il marketing {: #esercizio-3 }

Con la [tabella del marketing](#marginali) ($X$ fascia d’età, $Y=1$ se la persona compra e $Y=2$ se non compra): (a) scrivi le due marginali e spiega quale margine appartiene a quale variabile. (b) Qual è la probabilità che una persona scelta a caso abbia tra i 16 e i 25 anni e, insieme, compri, cioè $P(X=1,\;Y=1)$? E la probabilità che una persona compri? (c) Età e intenzione di acquisto sono indipendenti? (d) Tra le persone di 46–85 anni, quale frazione compra? E tra quelle di 16–25 anni?

??? esempio-svolto "Soluzione ragionata"
    (a) Il margine a destra somma lungo le righe, dove $Y$ è fissata: è la marginale di $Y$, $P(Y=1)=0{,}40$ e $P(Y=2)=0{,}60$. Il margine in basso somma lungo le colonne, dove $X$ è fissata: è la marginale di $X$, $P(X=1)=0{,}35$, $P(X=2)=0{,}45$, $P(X=3)=0{,}20$. (b) La prima è una casella: $0{,}10$. La seconda è un margine: $P(Y=1)=0{,}40$. (c) No: $P(X=1,\;Y=1)=0{,}10$, mentre $P(X=1)\,P(Y=1)=0{,}35\cdot0{,}40=0{,}14$. (d) Sono probabilità condizionate, come nella Settimana 2: si divide la casella per il margine della colonna. Tra i 46–85 anni, $0{,}10/0{,}20=0{,}50$; tra i 16–25 anni, $0{,}10/0{,}35\approx0{,}29$. Le due frazioni sono diverse, e questo è un altro modo di vedere che le variabili sono dipendenti.

### Esercizio 4 — Malattia, olfatto e febbre {: #esercizio-4 }

Con le [due tabelle](#tre-variabili) di $D$ (malattia), $S$ ($S=0$ se la persona ha perso l’olfatto) e $F$ (febbre): (a) quante caselle ha la distribuzione congiunta? Verifica che la somma sia 1. (b) Calcola $P(D=1)$, $P(S=0)$ e $P(F=\text{alta})$. (c) Calcola $P(D=1,\;S=0)$ e poi, con la definizione di probabilità condizionata della Settimana 2, la probabilità di essere malati tra chi ha perso l’olfatto. (d) Se le variabili fossero 20, tutte con due valori, quante caselle servirebbero?

??? esempio-svolto "Soluzione ragionata"
    (a) Le caselle sono $2\cdot2\cdot3=12$. Le sei della prima tabella sommano a 0,949 e le sei della seconda a 0,051, in tutto 1. (b) $P(D=1)$ è la somma della seconda tabella, $0{,}051$. $P(S=0)$ è la somma delle due colonne $S=0$: $0{,}024+0{,}003+0{,}001+0{,}006+0{,}005+0{,}004=0{,}043$. $P(F=\text{alta})$ è la somma delle due righe della febbre alta: $0{,}001+0{,}046+0{,}004+0{,}011=0{,}062$. (c) $P(D=1,\;S=0)=0{,}006+0{,}005+0{,}004=0{,}015$, e quindi $P(D=1\mid S=0)=0{,}015/0{,}043\approx0{,}35$. Perdere l’olfatto fa salire la probabilità della malattia dal 5% circa a circa il 35%. (d) $2^{20}=1\,048\,576$ caselle: più di un milione di probabilità.

Gli esercizi su covarianza e correlazione arriveranno con la seconda parte, insieme alla Lezione 2.

## Errori da evitare {: #errori }

Molti errori di questa settimana nascono dalla lettura delle tabelle. Una casella della tabella congiunta è la probabilità che succedano insieme due cose, non la probabilità di una sapendo l’altra: $P(D=1,\;S=0)=0{,}015$ non è la probabilità di essere malati tra chi ha perso l’olfatto, che è circa 0,35. Quando si calcolano le marginali, è facile scambiare i due margini: conviene chiedersi ogni volta lungo quale direzione si sta sommando e quale variabile resta fissa. E se le caselle non sommano a 1, la tabella non è una distribuzione di probabilità, e qualcosa nei dati o nei conti va controllato.

Un secondo gruppo di errori riguarda l’indipendenza. Una casella in cui la probabilità è il prodotto dei margini non dimostra nulla: nei due moduli la prima casella rispettava la condizione e la seconda no. Per l’indipendenza bisogna controllare tutte le caselle; per la dipendenza basta un controesempio, e una casella vuota con i margini pieni è il controesempio più rapido. Nemmeno l’uguaglianza $\mathbb{E}[XY]=\mathbb{E}[X]\,\mathbb{E}[Y]$ dimostra l’indipendenza.

## Riepilogo per lo studio {: #riepilogo }

Due variabili aleatorie discrete studiate insieme sono descritte dalla loro **distribuzione congiunta**, la tabella delle probabilità $p_{X,Y}(x,y)=P(X=x,\;Y=y)$: una casella per ogni coppia di valori, caselle non negative che sommano a 1. Ogni domanda su $X$ e $Y$ è un insieme di caselle, e la sua probabilità è la somma delle caselle. Le **distribuzioni marginali** si ottengono sommando lungo le righe o le colonne, $p_X(x)=\sum_y p_{X,Y}(x,y)$: è il teorema della probabilità totale. Dalla congiunta si ottengono le marginali, ma non viceversa, perché il legame tra le variabili sta dentro la tabella. Con molte variabili la tabella esplode, perché il numero di caselle è il prodotto dei numeri di valori.

Le variabili sono **indipendenti** quando ogni casella è il prodotto dei suoi margini, $p_{X,Y}(x,y)=p_X(x)\,p_Y(y)$; per dimostrarlo servono tutte le caselle, per smentirlo ne basta una. La media di una funzione di due variabili si calcola pesando i valori della funzione con le caselle, $\mathbb{E}[g(X,Y)]=\sum_x\sum_y g(x,y)\,p_{X,Y}(x,y)$; per variabili indipendenti la media del prodotto è il prodotto delle medie.

!!! tip "Prova a raccontarlo senza il formulario"
    Prendi la tabella degli studenti e spiega a un compagno come si trova la probabilità di essere in una relazione, e perché quel conto è la probabilità totale della Settimana 2. Spiegagli perché la prima casella dei due moduli non bastava a dire che gli errori sono indipendenti. Poi racconta, con le due monete, perché le marginali da sole non bastano a ricostruire la tabella congiunta. Se riesci a farlo, le formule di questa prima parte sono diventate strumenti di ragionamento.

## Riferimenti e letture {: #riferimenti }

La dispensa riprende le slide e il notebook degli anni passati, che a loro volta adattano due testi presenti nella bibliografia. Covarianza e correlazione sono nuove quest’anno e sono costruite sugli stessi testi. Le citazioni storiche sono tradotte dall’inglese; le fonti sono letture facoltative.

- **Chris Piech**, *Probability for Computer Scientists*, materiale del corso Stanford CS109: voci [«Joint Probability»](https://chrispiech.github.io/probabilityForComputerScientists/en/part3/joint/), [«Marginalization»](https://chrispiech.github.io/probabilityForComputerScientists/en/part3/marginalization/), [«Independence in Variables»](https://chrispiech.github.io/probabilityForComputerScientists/en/part3/independent_vars/) e [«Correlation»](https://chrispiech.github.io/probabilityForComputerScientists/en/part3/correlation/). Da qui vengono le tabelle degli studenti e di malattia, olfatto e febbre.
- **Michael Baron**, *Probability and Statistics for Computer Scientists*, 2ª ed., CRC Press, 2014, cap. 3, § 3.2 (distribuzione congiunta, marginali e indipendenza, Esempio 3.6 dei due moduli) e § 3.3 (valore atteso, covarianza e correlazione, Esempi 3.9 e 3.11). [Scheda dell’editore](https://doi.org/10.1201/b14800).
- **Notebook Colab degli anni passati**: [«4.3 Distribuzioni congiunte»](https://colab.research.google.com/github/QwertyJacob/colab_handouts_PSI/blob/main/4.3_Distribuzioni_Congiunte.ipynb). Da qui vengono l’esempio dei due moduli, l’esempio con tre variabili del laboratorio e il quinto esercizio. Sono materiale degli anni passati e non sostituiscono la dispensa: come usarli è spiegato nella pagina [Notebook degli anni passati](../notebook.md).
- **Stefania Boffa**, note del corso di probabilità dell’Università dell’Insubria: l’esempio del marketing, ripreso nelle slide.
- **Francis Galton**, *Natural Inheritance*, Londra, Macmillan, 1889: cap. V (il quincunx, pp. 63–65) e cap. VII (la regressione, pp. 95 e 104). [Testo su galton.org](https://galton.org/books/natural-inheritance/).
- **Francis Galton**, «Regression towards mediocrity in hereditary stature», *Journal of the Anthropological Institute* 15 (1886), pp. 246–263: la tabella delle altezze dei 928 figli. [PDF su galton.org](https://galton.org/essays/1880-1889/galton-1886-jaigi-regression-stature.pdf).
- **Francis Galton**, «Co-relations and their measurement, chiefly from anthropometric data», *Proceedings of the Royal Society of London* 45 (1888), pp. 135–145: la definizione di co-relazione e la misura 0,8 per avambraccio e statura. [Testo su galton.org](https://galton.org/essays/1880-1889/galton-1888-co-relations-royal-soc/galton_corr.html).
- **Francis Galton**, *Memories of My Life*, Londra, Methuen, 1908, cap. XX, pp. 300–301: Naworth Castle, la domanda sulle generazioni e le ellissi della stazione di Ramsgate. [Testo su Project Gutenberg](https://www.gutenberg.org/ebooks/78669).
- **Stephen M. Stigler**, «Francis Galton’s account of the invention of correlation», *Statistical Science* 4 (1989), pp. 73–79: la storia dell’invenzione della correlazione e i racconti di Galton. [Articolo su Project Euclid](https://projecteuclid.org/euclid.ss/1177012580).
- **Karl Pearson**, «Mathematical contributions to the theory of evolution. III. Regression, heredity, and panmixia», *Philosophical Transactions of the Royal Society A* 187 (1896), pp. 253–318: la formula del coefficiente di correlazione. [DOI](https://doi.org/10.1098/rsta.1896.0007).
- **Karl Pearson**, «On a form of spurious correlation which may arise when indices are used in the measurement of organs», *Proceedings of the Royal Society of London* 60 (1897), pp. 489–498: la correlazione spuria. [DOI](https://doi.org/10.1098/rspl.1896.0076).
- **Karl Pearson**, *The Grammar of Science*, 2ª ed., Londra, A. and C. Black, 1900, cap. X, § 7, pp. 392–397: correlazione, retta di regressione e causazione. [Scansione su Internet Archive](https://archive.org/details/grammarofscience00pearuoft).
- **Carl Friedrich Gauss**, *Theory of the Motion of the Heavenly Bodies Moving about the Sun in Conic Sections*, traduzione di C. H. Davis, Boston, 1857, artt. 179–186: i minimi quadrati della Lettura A. [Scansione su Internet Archive](https://archive.org/details/theoryofmotionof00gaus).
- **Franz H. Messerli**, «Chocolate consumption, cognitive function, and Nobel laureates», *New England Journal of Medicine* 367 (2012), pp. 1562–1564. [DOI](https://doi.org/10.1056/NEJMon1211064).
- **Daniel Kahneman**, *Pensieri lenti e veloci*, Milano, Mondadori, 2012 (ed. orig. *Thinking, Fast and Slow*, 2011), cap. 17: gli istruttori di volo e la regressione verso la media.
- I dati di Galton usati nelle figure e nel laboratorio sono quelli della tabella del 1886, nella versione del pacchetto R [HistData](https://cran.r-project.org/package=HistData) di Michael Friendly; le altezze sono convertite da pollici a centimetri.
- Documentazione Python: [`numpy.outer`](https://numpy.org/doc/stable/reference/generated/numpy.outer.html), [`numpy.corrcoef`](https://numpy.org/doc/stable/reference/generated/numpy.corrcoef.html) e [`pandas.crosstab`](https://pandas.pydata.org/docs/reference/api/pandas.crosstab.html).

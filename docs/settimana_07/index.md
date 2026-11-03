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

## Atto V — Naworth Castle: le deviazioni in unità statistiche {: #naworth }

Torniamo a Galton, che abbiamo lasciato davanti alla sua tabella delle altezze. Nella figura seguente la tabella è disegnata come un grafico: ogni casella è una bolla, tanto più grande quanti più figli contiene; in orizzontale c’è l’altezza del genitore medio, in verticale quella del figlio, entrambe in centimetri.

<figure markdown="0">
<svg viewBox="0 0 580 390" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Grafico a bolle dei dati di Galton: in orizzontale l’altezza del genitore medio, in verticale quella del figlio, in centimetri. Le bolle blu sono più grandi dove le coppie sono più numerose. La linea arancione unisce le altezze medie dei figli per ogni classe di genitori: è meno ripida della diagonale tratteggiata, dove il figlio sarebbe alto come il genitore, e più ripida della linea verde orizzontale della media generale.">
<text x="300.0" y="20.0" text-anchor="middle" fill="currentColor" font-weight="bold">La tabella di Galton: 928 figli adulti e i loro genitori</text>
<line x1="80" y1="340" x2="520" y2="340" stroke="currentColor"/>
<line x1="80" y1="40" x2="80" y2="340" stroke="currentColor"/>
<line x1="80.0" y1="340" x2="80.0" y2="344" stroke="currentColor"/>
<text x="80.0" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">160</text>
<line x1="153.3" y1="340" x2="153.3" y2="344" stroke="currentColor"/>
<text x="153.3" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">165</text>
<line x1="226.7" y1="340" x2="226.7" y2="344" stroke="currentColor"/>
<text x="226.7" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">170</text>
<line x1="300.0" y1="340" x2="300.0" y2="344" stroke="currentColor"/>
<text x="300.0" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">175</text>
<line x1="373.3" y1="340" x2="373.3" y2="344" stroke="currentColor"/>
<text x="373.3" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">180</text>
<line x1="446.7" y1="340" x2="446.7" y2="344" stroke="currentColor"/>
<text x="446.7" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">185</text>
<line x1="520.0" y1="340" x2="520.0" y2="344" stroke="currentColor"/>
<text x="520.0" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">190</text>
<line x1="76" y1="331.7" x2="80" y2="331.7" stroke="currentColor"/>
<text x="73.0" y="335.7" text-anchor="end" fill="currentColor" font-size="11">155</text>
<line x1="76" y1="290.0" x2="80" y2="290.0" stroke="currentColor"/>
<text x="73.0" y="294.0" text-anchor="end" fill="currentColor" font-size="11">160</text>
<line x1="76" y1="248.3" x2="80" y2="248.3" stroke="currentColor"/>
<text x="73.0" y="252.3" text-anchor="end" fill="currentColor" font-size="11">165</text>
<line x1="76" y1="206.7" x2="80" y2="206.7" stroke="currentColor"/>
<text x="73.0" y="210.7" text-anchor="end" fill="currentColor" font-size="11">170</text>
<line x1="76" y1="165.0" x2="80" y2="165.0" stroke="currentColor"/>
<text x="73.0" y="169.0" text-anchor="end" fill="currentColor" font-size="11">175</text>
<line x1="76" y1="123.3" x2="80" y2="123.3" stroke="currentColor"/>
<text x="73.0" y="127.3" text-anchor="end" fill="currentColor" font-size="11">180</text>
<line x1="76" y1="81.7" x2="80" y2="81.7" stroke="currentColor"/>
<text x="73.0" y="85.7" text-anchor="end" fill="currentColor" font-size="11">185</text>
<line x1="76" y1="40.0" x2="80" y2="40.0" stroke="currentColor"/>
<text x="73.0" y="44.0" text-anchor="end" fill="currentColor" font-size="11">190</text>
<text x="300.0" y="374.0" text-anchor="middle" fill="currentColor" font-size="12">altezza del genitore medio (cm)</text>
<text x="42.0" y="190.0" text-anchor="middle" fill="currentColor" font-size="12" transform="rotate(-90 42 190.0)">altezza del figlio (cm)</text>
<g fill="#4051b5" fill-opacity="0.35"><circle cx="117.5" cy="317.3" r="1.6"/><circle cx="117.5" cy="285.6" r="2.3"/><circle cx="117.5" cy="264.4" r="3.2"/><circle cx="117.5" cy="243.3" r="1.6"/><circle cx="117.5" cy="222.1" r="2.3"/><circle cx="117.5" cy="200.9" r="2.3"/><circle cx="117.5" cy="179.8" r="1.6"/><circle cx="117.5" cy="158.6" r="1.6"/><circle cx="136.2" cy="317.3" r="1.6"/><circle cx="136.2" cy="306.8" r="1.6"/><circle cx="136.2" cy="285.6" r="3.2"/><circle cx="136.2" cy="264.4" r="3.2"/><circle cx="136.2" cy="243.3" r="1.6"/><circle cx="136.2" cy="222.1" r="3.6"/><circle cx="136.2" cy="200.9" r="3.6"/><circle cx="136.2" cy="158.6" r="2.3"/><circle cx="173.4" cy="317.3" r="1.6"/><circle cx="173.4" cy="285.6" r="4.8"/><circle cx="173.4" cy="264.4" r="3.6"/><circle cx="173.4" cy="243.3" r="4.2"/><circle cx="173.4" cy="222.1" r="5.3"/><circle cx="173.4" cy="200.9" r="5.3"/><circle cx="173.4" cy="179.8" r="4.2"/><circle cx="173.4" cy="158.6" r="4.2"/><circle cx="173.4" cy="137.4" r="3.6"/><circle cx="173.4" cy="116.3" r="2.3"/><circle cx="173.4" cy="95.1" r="1.6"/><circle cx="210.7" cy="306.8" r="2.8"/><circle cx="210.7" cy="285.6" r="2.8"/><circle cx="210.7" cy="264.4" r="3.6"/><circle cx="210.7" cy="243.3" r="2.3"/><circle cx="210.7" cy="222.1" r="6.6"/><circle cx="210.7" cy="200.9" r="6.6"/><circle cx="210.7" cy="179.8" r="6.0"/><circle cx="210.7" cy="158.6" r="5.8"/><circle cx="210.7" cy="137.4" r="3.2"/><circle cx="247.9" cy="306.8" r="2.8"/><circle cx="247.9" cy="285.6" r="3.6"/><circle cx="247.9" cy="264.4" r="6.0"/><circle cx="247.9" cy="243.3" r="6.2"/><circle cx="247.9" cy="222.1" r="9.6"/><circle cx="247.9" cy="200.9" r="9.9"/><circle cx="247.9" cy="179.8" r="8.5"/><circle cx="247.9" cy="158.6" r="9.9"/><circle cx="247.9" cy="137.4" r="7.0"/><circle cx="247.9" cy="116.3" r="5.3"/><circle cx="247.9" cy="95.1" r="3.2"/><circle cx="285.2" cy="317.3" r="1.6"/><circle cx="285.2" cy="285.6" r="4.2"/><circle cx="285.2" cy="264.4" r="5.3"/><circle cx="285.2" cy="243.3" r="6.4"/><circle cx="285.2" cy="222.1" r="8.0"/><circle cx="285.2" cy="200.9" r="8.9"/><circle cx="285.2" cy="179.8" r="9.3"/><circle cx="285.2" cy="158.6" r="11.1"/><circle cx="285.2" cy="137.4" r="7.3"/><circle cx="285.2" cy="116.3" r="6.8"/><circle cx="285.2" cy="95.1" r="3.2"/><circle cx="285.2" cy="73.9" r="2.8"/><circle cx="322.4" cy="285.6" r="1.6"/><circle cx="322.4" cy="264.4" r="6.4"/><circle cx="322.4" cy="243.3" r="3.2"/><circle cx="322.4" cy="222.1" r="6.6"/><circle cx="322.4" cy="200.9" r="8.3"/><circle cx="322.4" cy="179.8" r="7.2"/><circle cx="322.4" cy="158.6" r="9.2"/><circle cx="322.4" cy="137.4" r="8.0"/><circle cx="322.4" cy="116.3" r="7.2"/><circle cx="322.4" cy="95.1" r="5.3"/><circle cx="322.4" cy="73.9" r="3.2"/><circle cx="322.4" cy="63.3" r="3.6"/><circle cx="359.7" cy="317.3" r="1.6"/><circle cx="359.7" cy="285.6" r="1.6"/><circle cx="359.7" cy="243.3" r="1.6"/><circle cx="359.7" cy="222.1" r="1.6"/><circle cx="359.7" cy="200.9" r="2.8"/><circle cx="359.7" cy="179.8" r="5.5"/><circle cx="359.7" cy="158.6" r="6.8"/><circle cx="359.7" cy="137.4" r="6.0"/><circle cx="359.7" cy="116.3" r="4.2"/><circle cx="359.7" cy="95.1" r="3.2"/><circle cx="359.7" cy="73.9" r="2.8"/><circle cx="359.7" cy="63.3" r="2.8"/><circle cx="396.9" cy="243.3" r="1.6"/><circle cx="396.9" cy="222.1" r="2.8"/><circle cx="396.9" cy="200.9" r="3.2"/><circle cx="396.9" cy="179.8" r="2.8"/><circle cx="396.9" cy="158.6" r="3.6"/><circle cx="396.9" cy="137.4" r="5.1"/><circle cx="396.9" cy="116.3" r="3.2"/><circle cx="396.9" cy="95.1" r="4.8"/><circle cx="396.9" cy="73.9" r="2.3"/><circle cx="396.9" cy="63.3" r="2.3"/><circle cx="434.2" cy="179.8" r="1.6"/><circle cx="434.2" cy="158.6" r="2.3"/><circle cx="434.2" cy="137.4" r="1.6"/><circle cx="434.2" cy="116.3" r="2.3"/><circle cx="434.2" cy="95.1" r="4.2"/><circle cx="434.2" cy="73.9" r="2.3"/><circle cx="434.2" cy="63.3" r="3.2"/><circle cx="452.8" cy="95.1" r="1.6"/><circle cx="452.8" cy="73.9" r="2.8"/></g>
<line x1="80.0" y1="290.0" x2="520.0" y2="40.0" stroke="currentColor" stroke-dasharray="6 4" opacity="0.8"/>
<line x1="80.0" y1="182.1" x2="520.0" y2="182.1" stroke="#2e9e5b" stroke-dasharray="3 3" stroke-width="1.5"/>
<polyline points="117.5,241.0 136.2,239.1 173.4,211.4 210.7,203.9 247.9,192.7 285.2,183.6 322.4,169.1 359.7,150.2 396.9,139.9 434.2,101.8" fill="none" stroke="#e07a1f" stroke-width="2.5"/>
<circle cx="117.5" cy="241.0" r="4" fill="#e07a1f"/>
<circle cx="136.2" cy="239.1" r="4" fill="#e07a1f"/>
<circle cx="173.4" cy="211.4" r="4" fill="#e07a1f"/>
<circle cx="210.7" cy="203.9" r="4" fill="#e07a1f"/>
<circle cx="247.9" cy="192.7" r="4" fill="#e07a1f"/>
<circle cx="285.2" cy="183.6" r="4" fill="#e07a1f"/>
<circle cx="322.4" cy="169.1" r="4" fill="#e07a1f"/>
<circle cx="359.7" cy="150.2" r="4" fill="#e07a1f"/>
<circle cx="396.9" cy="139.9" r="4" fill="#e07a1f"/>
<circle cx="434.2" cy="101.8" r="4" fill="#e07a1f"/>
<text x="468.7" y="52.5" text-anchor="end" fill="currentColor" font-size="12">figlio alto</text>
<text x="468.7" y="66.7" text-anchor="end" fill="currentColor" font-size="12">come il genitore</text>
<text x="124.0" y="176.1" text-anchor="start" fill="#2e9e5b" font-size="12">media di tutti i figli</text>
<text x="395.3" y="152.5" text-anchor="start" fill="#e07a1f" font-size="12" font-weight="bold">media dei figli</text>
<text x="395.3" y="165.0" text-anchor="start" fill="#e07a1f" font-size="12" font-weight="bold">per ogni classe</text>
</svg>
<figcaption>I dati di Galton (1886) in centimetri: ogni bolla è una casella della sua tabella, con area proporzionale al numero di figli. Per i genitori alti la media dei figli (arancione) sta sotto la diagonale, per i genitori bassi sta sopra: è la regressione verso la media. Le altezze delle figlie sono moltiplicate per 1,08, come fece Galton.</figcaption>
</figure>

Seguiamo la linea arancione, che unisce le altezze medie dei figli per ogni classe di genitori. Se i figli fossero alti esattamente come il loro genitore medio, la linea seguirebbe la diagonale tratteggiata. Se l’altezza dei genitori non contasse nulla, la linea sarebbe piatta, alla quota della media di tutti i figli. La linea vera sta in mezzo. I genitori alti, quelli delle classi dai 179 cm in su, hanno un’altezza media di 180,8 cm, e i loro figli una media di 178,3 cm: alti, ma più vicini alla media generale di circa 173 cm. I genitori bassi, quelli delle classi fino ai 166 cm, hanno una media di 165,3 cm, e i loro figli di 168,2 cm: bassi, ma anche loro più vicini al centro. È la regressione verso la media dell’Atto I, vista nei dati.

Galton voleva di più di una figura: voleva un **numero** che misurasse quanto i figli somigliano ai genitori, e che si potesse usare anche per altre coppie di grandezze, come la lunghezza del braccio e la statura, o le caratteristiche di due fratelli. Ma c’era un ostacolo. Le due grandezze di una coppia possono avere unità di misura diverse, e anche quando l’unità è la stessa possono variare in modo diverso: nei dati di Galton le altezze dei genitori medi sono meno disperse di quelle dei figli, perché la media di due persone oscilla meno di una persona sola. Come si confrontano le deviazioni dalla media di due grandezze così diverse?

La risposta gli venne, racconta, durante un acquazzone:

> «Mentre scrivo queste righe, mi torna vivida alla memoria la circostanza in cui afferrai per la prima volta con chiarezza l’importante generalizzazione che le leggi dell’ereditarietà riguardano soltanto le deviazioni espresse in unità statistiche. Fu nel parco di Naworth Castle, dove ero stato invitato a passeggiare liberamente. Un acquazzone improvviso mi costrinse a cercare riparo in una rientranza rossastra della roccia a lato del sentiero. Lì l’idea mi balenò, e per un momento dimenticai ogni altra cosa per la grande gioia.»
> — F. Galton, *Memories of My Life*, 1908, cap. XX, p. 300 (tradotto dall’inglese)

Le «deviazioni espresse in unità statistiche» sono ciò che nella Settimana 6 abbiamo chiamato **standardizzazione**. Invece di dire che un padre è 10 cm sopra la media, diciamo che è un certo numero di deviazioni standard sopra la media della sua grandezza: $z=(x-\mu)/\sigma$. In queste unità tutte le grandezze diventano confrontabili, qualunque sia la loro unità di misura e la loro dispersione.

Nel dicembre del 1888 Galton presentò alla Royal Society un breve articolo intitolato *Co-relations and their measurement*, «Le co-relazioni e la loro misura», che si apre con una definizione:

> «Due organi variabili si dicono co-relati quando la variazione dell’uno è accompagnata, in media, da una variazione più o meno grande dell’altro, e nello stesso verso.»
> — F. Galton, *Co-relations and their measurement, chiefly from anthropometric data*, Proceedings of the Royal Society of London 45, 1888, p. 135 (tradotto dall’inglese)

Galton prende come esempio la lunghezza dell’avambraccio, misurata dal gomito alla punta del dito medio (il *cubito*), e la statura. Misurando le deviazioni in unità statistiche, trova che a una deviazione di 1 in una delle due grandezze corrisponde, in media, una deviazione di 0,8 nell’altra, e conclude: «l’esistenza della co-relazione è stabilita, e la sua misura risulta essere 0,8». Quel numero, la deviazione media di una grandezza per ogni unità di deviazione dell’altra, entrambe misurate in deviazioni standard, è il primo **coefficiente di correlazione** della storia. Pochi anni dopo, nel 1896, il matematico Karl Pearson, collaboratore di Galton e poi suo biografo, gli diede la forma che usiamo ancora oggi, e che per questo porta il nome di Pearson.

Arriveremo al numero di Galton in due passi. Prima costruiremo la **covarianza**, che misura se due variabili tendono ad allontanarsi dalla propria media insieme, nello stesso verso o in versi opposti. Poi la misureremo «in unità statistiche», come voleva Galton, e otterremo il **coefficiente di correlazione**.

## Atto VI — La covarianza {: #covarianza }

Guardiamo i dati di Galton in un altro modo: ogni figlio è un punto, con l’altezza del suo genitore medio in orizzontale e la sua in verticale. Tracciamo poi due linee, una verticale alla media dei genitori e una orizzontale alla media dei figli. Le due linee dividono il piano in quattro **quadranti**.

<figure markdown="0">
<svg viewBox="0 0 580 390" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Nuvola di 928 punti, uno per figlio, con l’altezza del genitore medio in orizzontale e quella del figlio in verticale. Due linee tratteggiate passano per le due medie e dividono il piano in quattro quadranti. I punti blu, circa il 63 per cento, stanno nei quadranti in alto a destra e in basso a sinistra; quelli arancioni negli altri due.">
<text x="300.0" y="20.0" text-anchor="middle" fill="currentColor" font-weight="bold">I quattro quadranti attorno alle medie</text>
<line x1="80" y1="340" x2="520" y2="340" stroke="currentColor"/>
<line x1="80" y1="40" x2="80" y2="340" stroke="currentColor"/>
<line x1="105.9" y1="340" x2="105.9" y2="344" stroke="currentColor"/>
<text x="105.9" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">160</text>
<line x1="170.6" y1="340" x2="170.6" y2="344" stroke="currentColor"/>
<text x="170.6" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">165</text>
<line x1="235.3" y1="340" x2="235.3" y2="344" stroke="currentColor"/>
<text x="235.3" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">170</text>
<line x1="300.0" y1="340" x2="300.0" y2="344" stroke="currentColor"/>
<text x="300.0" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">175</text>
<line x1="364.7" y1="340" x2="364.7" y2="344" stroke="currentColor"/>
<text x="364.7" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">180</text>
<line x1="429.4" y1="340" x2="429.4" y2="344" stroke="currentColor"/>
<text x="429.4" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">185</text>
<line x1="494.1" y1="340" x2="494.1" y2="344" stroke="currentColor"/>
<text x="494.1" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">190</text>
<line x1="76" y1="317.5" x2="80" y2="317.5" stroke="currentColor"/>
<text x="73.0" y="321.5" text-anchor="end" fill="currentColor" font-size="11">155</text>
<line x1="76" y1="280.0" x2="80" y2="280.0" stroke="currentColor"/>
<text x="73.0" y="284.0" text-anchor="end" fill="currentColor" font-size="11">160</text>
<line x1="76" y1="242.5" x2="80" y2="242.5" stroke="currentColor"/>
<text x="73.0" y="246.5" text-anchor="end" fill="currentColor" font-size="11">165</text>
<line x1="76" y1="205.0" x2="80" y2="205.0" stroke="currentColor"/>
<text x="73.0" y="209.0" text-anchor="end" fill="currentColor" font-size="11">170</text>
<line x1="76" y1="167.5" x2="80" y2="167.5" stroke="currentColor"/>
<text x="73.0" y="171.5" text-anchor="end" fill="currentColor" font-size="11">175</text>
<line x1="76" y1="130.0" x2="80" y2="130.0" stroke="currentColor"/>
<text x="73.0" y="134.0" text-anchor="end" fill="currentColor" font-size="11">180</text>
<line x1="76" y1="92.5" x2="80" y2="92.5" stroke="currentColor"/>
<text x="73.0" y="96.5" text-anchor="end" fill="currentColor" font-size="11">185</text>
<line x1="76" y1="55.0" x2="80" y2="55.0" stroke="currentColor"/>
<text x="73.0" y="59.0" text-anchor="end" fill="currentColor" font-size="11">190</text>
<text x="300.0" y="374.0" text-anchor="middle" fill="currentColor" font-size="12">altezza del genitore medio (cm)</text>
<text x="42.0" y="190.0" text-anchor="middle" fill="currentColor" font-size="12" transform="rotate(-90 42 190.0)">altezza del figlio (cm)</text>
<g fill="#e07a1f" fill-opacity="0.6"><circle cx="356.8" cy="297.6" r="2.2"/><circle cx="300.0" cy="297.1" r="2.2"/><circle cx="344.6" cy="276.0" r="2.2"/><circle cx="318.0" cy="277.3" r="2.2"/><circle cx="287.1" cy="267.4" r="2.2"/><circle cx="288.7" cy="267.5" r="2.2"/><circle cx="303.2" cy="283.2" r="2.2"/><circle cx="296.5" cy="282.7" r="2.2"/><circle cx="290.9" cy="277.8" r="2.2"/><circle cx="303.0" cy="269.7" r="2.2"/><circle cx="324.4" cy="248.2" r="2.2"/><circle cx="327.7" cy="257.1" r="2.2"/><circle cx="306.4" cy="257.6" r="2.2"/><circle cx="321.2" cy="250.1" r="2.2"/><circle cx="320.1" cy="261.0" r="2.2"/><circle cx="332.0" cy="251.2" r="2.2"/><circle cx="315.2" cy="261.0" r="2.2"/><circle cx="323.0" cy="252.8" r="2.2"/><circle cx="305.3" cy="260.2" r="2.2"/><circle cx="316.1" cy="255.0" r="2.2"/><circle cx="314.0" cy="248.9" r="2.2"/><circle cx="308.3" cy="265.5" r="2.2"/><circle cx="330.2" cy="251.1" r="2.2"/><circle cx="315.8" cy="256.2" r="2.2"/><circle cx="335.5" cy="259.3" r="2.2"/><circle cx="322.8" cy="259.8" r="2.2"/><circle cx="290.4" cy="265.2" r="2.2"/><circle cx="291.5" cy="261.6" r="2.2"/><circle cx="292.7" cy="254.6" r="2.2"/><circle cx="285.0" cy="253.8" r="2.2"/><circle cx="283.7" cy="247.8" r="2.2"/><circle cx="302.3" cy="251.1" r="2.2"/><circle cx="292.6" cy="248.0" r="2.2"/><circle cx="386.3" cy="230.8" r="2.2"/><circle cx="364.9" cy="234.6" r="2.2"/><circle cx="314.7" cy="245.7" r="2.2"/><circle cx="322.8" cy="244.9" r="2.2"/><circle cx="325.8" cy="228.6" r="2.2"/><circle cx="315.0" cy="246.9" r="2.2"/><circle cx="287.6" cy="241.7" r="2.2"/><circle cx="295.6" cy="229.2" r="2.2"/><circle cx="300.4" cy="247.2" r="2.2"/><circle cx="301.2" cy="243.4" r="2.2"/><circle cx="295.2" cy="238.5" r="2.2"/><circle cx="297.1" cy="236.2" r="2.2"/><circle cx="284.3" cy="245.4" r="2.2"/><circle cx="297.3" cy="232.0" r="2.2"/><circle cx="291.2" cy="236.8" r="2.2"/><circle cx="296.6" cy="244.8" r="2.2"/><circle cx="287.4" cy="237.1" r="2.2"/><circle cx="294.4" cy="235.5" r="2.2"/><circle cx="395.6" cy="210.6" r="2.2"/><circle cx="391.3" cy="210.4" r="2.2"/><circle cx="392.7" cy="227.8" r="2.2"/><circle cx="356.9" cy="209.5" r="2.2"/><circle cx="335.3" cy="216.9" r="2.2"/><circle cx="314.3" cy="227.0" r="2.2"/><circle cx="316.5" cy="218.9" r="2.2"/><circle cx="310.0" cy="227.5" r="2.2"/><circle cx="305.0" cy="218.0" r="2.2"/><circle cx="310.4" cy="224.9" r="2.2"/><circle cx="333.5" cy="221.4" r="2.2"/><circle cx="331.0" cy="222.6" r="2.2"/><circle cx="307.1" cy="216.9" r="2.2"/><circle cx="323.2" cy="212.7" r="2.2"/><circle cx="319.1" cy="210.6" r="2.2"/><circle cx="322.9" cy="222.2" r="2.2"/><circle cx="325.0" cy="217.6" r="2.2"/><circle cx="313.4" cy="228.3" r="2.2"/><circle cx="335.0" cy="221.3" r="2.2"/><circle cx="318.7" cy="210.1" r="2.2"/><circle cx="324.0" cy="226.2" r="2.2"/><circle cx="291.4" cy="211.8" r="2.2"/><circle cx="284.0" cy="213.6" r="2.2"/><circle cx="295.6" cy="222.9" r="2.2"/><circle cx="297.3" cy="211.4" r="2.2"/><circle cx="294.5" cy="226.8" r="2.2"/><circle cx="300.5" cy="214.1" r="2.2"/><circle cx="296.9" cy="219.9" r="2.2"/><circle cx="299.3" cy="225.6" r="2.2"/><circle cx="287.7" cy="218.6" r="2.2"/><circle cx="300.6" cy="222.8" r="2.2"/><circle cx="289.1" cy="219.7" r="2.2"/><circle cx="289.9" cy="226.6" r="2.2"/><circle cx="292.8" cy="217.3" r="2.2"/><circle cx="379.2" cy="203.3" r="2.2"/><circle cx="396.5" cy="191.7" r="2.2"/><circle cx="389.5" cy="207.7" r="2.2"/><circle cx="375.3" cy="205.4" r="2.2"/><circle cx="350.5" cy="207.8" r="2.2"/><circle cx="365.3" cy="195.8" r="2.2"/><circle cx="348.6" cy="203.8" r="2.2"/><circle cx="326.7" cy="192.2" r="2.2"/><circle cx="306.5" cy="192.3" r="2.2"/><circle cx="327.3" cy="191.5" r="2.2"/><circle cx="328.9" cy="204.5" r="2.2"/><circle cx="330.5" cy="209.4" r="2.2"/><circle cx="325.5" cy="202.0" r="2.2"/><circle cx="315.6" cy="191.0" r="2.2"/><circle cx="305.5" cy="194.8" r="2.2"/><circle cx="320.4" cy="208.2" r="2.2"/><circle cx="328.3" cy="196.0" r="2.2"/><circle cx="309.6" cy="191.9" r="2.2"/><circle cx="312.1" cy="190.9" r="2.2"/><circle cx="321.0" cy="195.7" r="2.2"/><circle cx="328.0" cy="192.9" r="2.2"/><circle cx="332.8" cy="193.3" r="2.2"/><circle cx="307.5" cy="202.5" r="2.2"/><circle cx="309.4" cy="207.5" r="2.2"/><circle cx="329.6" cy="195.5" r="2.2"/><circle cx="324.6" cy="206.8" r="2.2"/><circle cx="327.1" cy="202.0" r="2.2"/><circle cx="336.1" cy="190.4" r="2.2"/><circle cx="334.2" cy="198.7" r="2.2"/><circle cx="331.1" cy="199.4" r="2.2"/><circle cx="328.9" cy="191.3" r="2.2"/><circle cx="316.3" cy="204.0" r="2.2"/><circle cx="324.4" cy="190.3" r="2.2"/><circle cx="309.4" cy="192.0" r="2.2"/><circle cx="295.5" cy="202.4" r="2.2"/><circle cx="295.4" cy="203.1" r="2.2"/><circle cx="294.2" cy="207.0" r="2.2"/><circle cx="285.1" cy="191.9" r="2.2"/><circle cx="282.9" cy="205.8" r="2.2"/><circle cx="284.3" cy="209.2" r="2.2"/><circle cx="298.2" cy="198.0" r="2.2"/><circle cx="288.3" cy="196.6" r="2.2"/><circle cx="283.2" cy="195.4" r="2.2"/><circle cx="288.5" cy="208.6" r="2.2"/><circle cx="294.2" cy="207.6" r="2.2"/><circle cx="283.0" cy="199.8" r="2.2"/><circle cx="297.8" cy="208.4" r="2.2"/><circle cx="300.7" cy="199.8" r="2.2"/><circle cx="283.2" cy="195.3" r="2.2"/><circle cx="295.5" cy="197.6" r="2.2"/><circle cx="303.1" cy="208.5" r="2.2"/><circle cx="293.9" cy="192.3" r="2.2"/><circle cx="297.6" cy="207.0" r="2.2"/><circle cx="300.8" cy="199.2" r="2.2"/><circle cx="303.0" cy="206.1" r="2.2"/><circle cx="289.4" cy="195.7" r="2.2"/><circle cx="285.2" cy="191.5" r="2.2"/><circle cx="295.2" cy="195.3" r="2.2"/><circle cx="359.3" cy="183.0" r="2.2"/><circle cx="367.5" cy="183.7" r="2.2"/><circle cx="363.7" cy="190.0" r="2.2"/><circle cx="358.2" cy="186.1" r="2.2"/><circle cx="343.1" cy="183.0" r="2.2"/><circle cx="354.4" cy="188.9" r="2.2"/><circle cx="327.3" cy="183.6" r="2.2"/><circle cx="303.9" cy="188.3" r="2.2"/><circle cx="318.8" cy="187.9" r="2.2"/><circle cx="327.0" cy="188.0" r="2.2"/><circle cx="320.6" cy="183.4" r="2.2"/><circle cx="306.2" cy="188.1" r="2.2"/><circle cx="321.9" cy="184.2" r="2.2"/><circle cx="321.7" cy="185.1" r="2.2"/><circle cx="318.2" cy="183.4" r="2.2"/><circle cx="321.5" cy="187.6" r="2.2"/><circle cx="310.7" cy="184.8" r="2.2"/><circle cx="276.9" cy="174.7" r="2.2"/><circle cx="285.4" cy="184.7" r="2.2"/><circle cx="292.8" cy="186.1" r="2.2"/><circle cx="291.6" cy="183.3" r="2.2"/><circle cx="283.5" cy="184.6" r="2.2"/><circle cx="283.0" cy="189.9" r="2.2"/><circle cx="281.6" cy="185.9" r="2.2"/><circle cx="296.3" cy="186.7" r="2.2"/><circle cx="283.3" cy="188.6" r="2.2"/><circle cx="289.5" cy="185.8" r="2.2"/><circle cx="259.9" cy="172.3" r="2.2"/><circle cx="256.8" cy="174.3" r="2.2"/><circle cx="251.4" cy="178.0" r="2.2"/><circle cx="247.2" cy="174.6" r="2.2"/><circle cx="247.3" cy="176.4" r="2.2"/><circle cx="251.8" cy="176.1" r="2.2"/><circle cx="270.5" cy="177.0" r="2.2"/><circle cx="249.2" cy="174.5" r="2.2"/><circle cx="249.8" cy="177.5" r="2.2"/><circle cx="256.7" cy="180.5" r="2.2"/><circle cx="246.4" cy="181.0" r="2.2"/><circle cx="253.9" cy="182.3" r="2.2"/><circle cx="260.2" cy="174.1" r="2.2"/><circle cx="240.0" cy="177.3" r="2.2"/><circle cx="266.1" cy="177.4" r="2.2"/><circle cx="247.9" cy="171.6" r="2.2"/><circle cx="244.1" cy="180.6" r="2.2"/><circle cx="264.8" cy="182.8" r="2.2"/><circle cx="264.8" cy="172.2" r="2.2"/><circle cx="230.0" cy="175.9" r="2.2"/><circle cx="219.8" cy="173.8" r="2.2"/><circle cx="217.0" cy="180.6" r="2.2"/><circle cx="222.7" cy="175.1" r="2.2"/><circle cx="211.4" cy="181.9" r="2.2"/><circle cx="228.0" cy="180.7" r="2.2"/><circle cx="231.6" cy="171.5" r="2.2"/><circle cx="227.2" cy="172.4" r="2.2"/><circle cx="193.0" cy="171.9" r="2.2"/><circle cx="184.3" cy="174.1" r="2.2"/><circle cx="192.8" cy="178.0" r="2.2"/><circle cx="180.4" cy="182.2" r="2.2"/><circle cx="271.6" cy="153.7" r="2.2"/><circle cx="271.1" cy="152.4" r="2.2"/><circle cx="273.0" cy="159.1" r="2.2"/><circle cx="274.8" cy="158.2" r="2.2"/><circle cx="276.6" cy="162.7" r="2.2"/><circle cx="280.5" cy="167.7" r="2.2"/><circle cx="279.6" cy="157.6" r="2.2"/><circle cx="270.6" cy="167.6" r="2.2"/><circle cx="278.6" cy="163.4" r="2.2"/><circle cx="275.2" cy="165.1" r="2.2"/><circle cx="277.5" cy="170.9" r="2.2"/><circle cx="279.3" cy="169.3" r="2.2"/><circle cx="279.3" cy="161.1" r="2.2"/><circle cx="274.8" cy="166.2" r="2.2"/><circle cx="274.4" cy="167.0" r="2.2"/><circle cx="271.7" cy="155.6" r="2.2"/><circle cx="240.4" cy="154.4" r="2.2"/><circle cx="246.6" cy="165.6" r="2.2"/><circle cx="262.8" cy="158.8" r="2.2"/><circle cx="257.6" cy="154.9" r="2.2"/><circle cx="247.9" cy="156.1" r="2.2"/><circle cx="258.3" cy="154.8" r="2.2"/><circle cx="252.6" cy="161.9" r="2.2"/><circle cx="266.0" cy="155.2" r="2.2"/><circle cx="247.3" cy="162.5" r="2.2"/><circle cx="262.5" cy="166.2" r="2.2"/><circle cx="258.5" cy="162.1" r="2.2"/><circle cx="262.0" cy="164.9" r="2.2"/><circle cx="250.1" cy="156.7" r="2.2"/><circle cx="261.5" cy="155.4" r="2.2"/><circle cx="260.6" cy="168.6" r="2.2"/><circle cx="250.4" cy="168.1" r="2.2"/><circle cx="238.5" cy="164.0" r="2.2"/><circle cx="269.3" cy="162.4" r="2.2"/><circle cx="261.1" cy="153.0" r="2.2"/><circle cx="244.4" cy="153.3" r="2.2"/><circle cx="261.6" cy="152.8" r="2.2"/><circle cx="246.8" cy="157.4" r="2.2"/><circle cx="253.0" cy="158.4" r="2.2"/><circle cx="265.9" cy="166.1" r="2.2"/><circle cx="252.4" cy="164.2" r="2.2"/><circle cx="247.1" cy="171.2" r="2.2"/><circle cx="247.7" cy="155.4" r="2.2"/><circle cx="240.2" cy="166.0" r="2.2"/><circle cx="244.8" cy="169.8" r="2.2"/><circle cx="246.5" cy="165.3" r="2.2"/><circle cx="243.3" cy="165.1" r="2.2"/><circle cx="239.7" cy="157.5" r="2.2"/><circle cx="252.9" cy="171.2" r="2.2"/><circle cx="244.7" cy="166.9" r="2.2"/><circle cx="261.9" cy="154.2" r="2.2"/><circle cx="267.9" cy="155.0" r="2.2"/><circle cx="246.6" cy="159.3" r="2.2"/><circle cx="256.4" cy="160.6" r="2.2"/><circle cx="221.4" cy="167.0" r="2.2"/><circle cx="207.2" cy="154.6" r="2.2"/><circle cx="208.9" cy="156.8" r="2.2"/><circle cx="233.8" cy="161.5" r="2.2"/><circle cx="220.3" cy="168.2" r="2.2"/><circle cx="231.2" cy="167.2" r="2.2"/><circle cx="206.9" cy="164.0" r="2.2"/><circle cx="224.3" cy="165.0" r="2.2"/><circle cx="233.2" cy="170.1" r="2.2"/><circle cx="233.3" cy="163.5" r="2.2"/><circle cx="204.9" cy="162.7" r="2.2"/><circle cx="221.9" cy="165.8" r="2.2"/><circle cx="216.9" cy="163.9" r="2.2"/><circle cx="196.9" cy="164.9" r="2.2"/><circle cx="174.3" cy="164.1" r="2.2"/><circle cx="180.6" cy="159.5" r="2.2"/><circle cx="198.6" cy="161.8" r="2.2"/><circle cx="187.3" cy="167.5" r="2.2"/><circle cx="186.8" cy="156.1" r="2.2"/><circle cx="203.7" cy="161.5" r="2.2"/><circle cx="149.5" cy="162.5" r="2.2"/><circle cx="140.4" cy="157.7" r="2.2"/><circle cx="135.5" cy="156.9" r="2.2"/><circle cx="274.3" cy="145.4" r="2.2"/><circle cx="270.9" cy="148.7" r="2.2"/><circle cx="275.8" cy="145.1" r="2.2"/><circle cx="275.9" cy="137.7" r="2.2"/><circle cx="275.1" cy="139.4" r="2.2"/><circle cx="279.8" cy="151.9" r="2.2"/><circle cx="272.2" cy="147.8" r="2.2"/><circle cx="277.6" cy="142.4" r="2.2"/><circle cx="274.8" cy="138.8" r="2.2"/><circle cx="279.7" cy="151.8" r="2.2"/><circle cx="271.6" cy="147.1" r="2.2"/><circle cx="248.5" cy="146.7" r="2.2"/><circle cx="262.4" cy="133.3" r="2.2"/><circle cx="246.0" cy="147.9" r="2.2"/><circle cx="250.9" cy="151.3" r="2.2"/><circle cx="262.4" cy="144.3" r="2.2"/><circle cx="251.0" cy="139.8" r="2.2"/><circle cx="266.8" cy="149.3" r="2.2"/><circle cx="267.8" cy="136.2" r="2.2"/><circle cx="247.8" cy="148.5" r="2.2"/><circle cx="261.8" cy="138.8" r="2.2"/><circle cx="245.9" cy="149.1" r="2.2"/><circle cx="242.2" cy="135.4" r="2.2"/><circle cx="252.0" cy="148.4" r="2.2"/><circle cx="257.4" cy="138.3" r="2.2"/><circle cx="268.4" cy="136.2" r="2.2"/><circle cx="242.4" cy="147.4" r="2.2"/><circle cx="261.0" cy="150.4" r="2.2"/><circle cx="253.3" cy="141.0" r="2.2"/><circle cx="242.0" cy="142.7" r="2.2"/><circle cx="236.7" cy="143.1" r="2.2"/><circle cx="227.6" cy="137.3" r="2.2"/><circle cx="209.0" cy="143.4" r="2.2"/><circle cx="234.5" cy="142.7" r="2.2"/><circle cx="175.3" cy="142.9" r="2.2"/><circle cx="174.9" cy="143.6" r="2.2"/><circle cx="182.8" cy="144.5" r="2.2"/><circle cx="202.7" cy="149.1" r="2.2"/><circle cx="173.0" cy="146.6" r="2.2"/><circle cx="278.1" cy="128.7" r="2.2"/><circle cx="278.2" cy="132.6" r="2.2"/><circle cx="279.6" cy="124.6" r="2.2"/><circle cx="280.5" cy="132.0" r="2.2"/><circle cx="276.6" cy="132.9" r="2.2"/><circle cx="274.0" cy="123.7" r="2.2"/><circle cx="280.2" cy="120.1" r="2.2"/><circle cx="271.6" cy="117.1" r="2.2"/><circle cx="246.0" cy="117.0" r="2.2"/><circle cx="249.1" cy="115.5" r="2.2"/><circle cx="257.7" cy="121.4" r="2.2"/><circle cx="257.0" cy="126.5" r="2.2"/><circle cx="242.7" cy="116.0" r="2.2"/><circle cx="260.8" cy="115.2" r="2.2"/><circle cx="240.3" cy="126.5" r="2.2"/><circle cx="269.5" cy="131.5" r="2.2"/><circle cx="244.3" cy="116.6" r="2.2"/><circle cx="246.0" cy="120.5" r="2.2"/><circle cx="244.2" cy="128.7" r="2.2"/><circle cx="204.5" cy="122.4" r="2.2"/><circle cx="181.3" cy="127.3" r="2.2"/><circle cx="273.8" cy="103.1" r="2.2"/><circle cx="275.6" cy="96.1" r="2.2"/><circle cx="248.7" cy="98.7" r="2.2"/><circle cx="248.6" cy="111.9" r="2.2"/><circle cx="240.5" cy="100.1" r="2.2"/><circle cx="263.8" cy="98.7" r="2.2"/><circle cx="194.1" cy="98.2" r="2.2"/></g>
<g fill="#4051b5" fill-opacity="0.6"><circle cx="197.4" cy="308.1" r="2.2"/><circle cx="146.4" cy="308.8" r="2.2"/><circle cx="132.4" cy="296.2" r="2.2"/><circle cx="266.3" cy="295.0" r="2.2"/><circle cx="237.8" cy="302.8" r="2.2"/><circle cx="264.6" cy="303.7" r="2.2"/><circle cx="231.0" cy="285.7" r="2.2"/><circle cx="220.1" cy="293.6" r="2.2"/><circle cx="214.7" cy="303.6" r="2.2"/><circle cx="148.2" cy="294.9" r="2.2"/><circle cx="277.6" cy="273.7" r="2.2"/><circle cx="242.9" cy="271.7" r="2.2"/><circle cx="257.8" cy="274.6" r="2.2"/><circle cx="239.1" cy="281.6" r="2.2"/><circle cx="238.8" cy="270.0" r="2.2"/><circle cx="254.5" cy="285.3" r="2.2"/><circle cx="220.1" cy="272.3" r="2.2"/><circle cx="234.9" cy="281.9" r="2.2"/><circle cx="225.4" cy="276.6" r="2.2"/><circle cx="188.8" cy="267.0" r="2.2"/><circle cx="188.2" cy="275.3" r="2.2"/><circle cx="180.0" cy="284.5" r="2.2"/><circle cx="172.3" cy="277.4" r="2.2"/><circle cx="178.2" cy="273.0" r="2.2"/><circle cx="194.6" cy="284.5" r="2.2"/><circle cx="178.5" cy="280.8" r="2.2"/><circle cx="184.0" cy="285.2" r="2.2"/><circle cx="172.0" cy="275.3" r="2.2"/><circle cx="166.3" cy="278.3" r="2.2"/><circle cx="144.1" cy="276.0" r="2.2"/><circle cx="147.8" cy="279.9" r="2.2"/><circle cx="167.9" cy="273.1" r="2.2"/><circle cx="139.3" cy="282.3" r="2.2"/><circle cx="150.4" cy="268.3" r="2.2"/><circle cx="275.5" cy="264.7" r="2.2"/><circle cx="278.4" cy="248.2" r="2.2"/><circle cx="273.7" cy="249.6" r="2.2"/><circle cx="277.6" cy="263.1" r="2.2"/><circle cx="247.5" cy="262.7" r="2.2"/><circle cx="266.4" cy="250.0" r="2.2"/><circle cx="259.4" cy="249.8" r="2.2"/><circle cx="241.9" cy="254.7" r="2.2"/><circle cx="265.4" cy="256.6" r="2.2"/><circle cx="268.7" cy="262.7" r="2.2"/><circle cx="267.3" cy="256.6" r="2.2"/><circle cx="256.4" cy="261.0" r="2.2"/><circle cx="242.4" cy="264.1" r="2.2"/><circle cx="243.9" cy="264.1" r="2.2"/><circle cx="268.1" cy="251.3" r="2.2"/><circle cx="255.8" cy="248.9" r="2.2"/><circle cx="243.6" cy="263.8" r="2.2"/><circle cx="266.7" cy="266.3" r="2.2"/><circle cx="225.8" cy="261.5" r="2.2"/><circle cx="223.5" cy="264.0" r="2.2"/><circle cx="217.1" cy="262.9" r="2.2"/><circle cx="218.3" cy="255.4" r="2.2"/><circle cx="212.6" cy="258.5" r="2.2"/><circle cx="173.1" cy="258.3" r="2.2"/><circle cx="200.7" cy="262.6" r="2.2"/><circle cx="187.3" cy="253.9" r="2.2"/><circle cx="189.9" cy="261.0" r="2.2"/><circle cx="182.5" cy="258.9" r="2.2"/><circle cx="163.7" cy="257.7" r="2.2"/><circle cx="139.8" cy="249.3" r="2.2"/><circle cx="151.2" cy="261.8" r="2.2"/><circle cx="140.0" cy="252.8" r="2.2"/><circle cx="126.6" cy="260.6" r="2.2"/><circle cx="154.4" cy="249.5" r="2.2"/><circle cx="144.2" cy="259.0" r="2.2"/><circle cx="136.7" cy="256.9" r="2.2"/><circle cx="275.5" cy="244.4" r="2.2"/><circle cx="270.7" cy="245.8" r="2.2"/><circle cx="275.0" cy="241.4" r="2.2"/><circle cx="271.0" cy="232.1" r="2.2"/><circle cx="245.1" cy="239.3" r="2.2"/><circle cx="244.1" cy="231.0" r="2.2"/><circle cx="249.6" cy="240.0" r="2.2"/><circle cx="243.5" cy="237.7" r="2.2"/><circle cx="249.0" cy="245.3" r="2.2"/><circle cx="268.8" cy="236.7" r="2.2"/><circle cx="256.5" cy="232.9" r="2.2"/><circle cx="248.8" cy="233.5" r="2.2"/><circle cx="246.5" cy="242.6" r="2.2"/><circle cx="268.9" cy="228.6" r="2.2"/><circle cx="252.2" cy="233.8" r="2.2"/><circle cx="269.8" cy="239.4" r="2.2"/><circle cx="254.6" cy="239.6" r="2.2"/><circle cx="254.8" cy="232.6" r="2.2"/><circle cx="267.1" cy="244.1" r="2.2"/><circle cx="229.2" cy="235.3" r="2.2"/><circle cx="223.8" cy="233.8" r="2.2"/><circle cx="185.9" cy="237.6" r="2.2"/><circle cx="200.7" cy="230.8" r="2.2"/><circle cx="185.4" cy="238.5" r="2.2"/><circle cx="202.2" cy="238.6" r="2.2"/><circle cx="174.1" cy="242.0" r="2.2"/><circle cx="186.0" cy="230.0" r="2.2"/><circle cx="189.0" cy="241.4" r="2.2"/><circle cx="170.3" cy="234.2" r="2.2"/><circle cx="130.8" cy="239.7" r="2.2"/><circle cx="276.5" cy="216.0" r="2.2"/><circle cx="272.5" cy="222.8" r="2.2"/><circle cx="274.2" cy="226.1" r="2.2"/><circle cx="272.0" cy="218.0" r="2.2"/><circle cx="271.5" cy="214.2" r="2.2"/><circle cx="271.2" cy="212.1" r="2.2"/><circle cx="278.8" cy="227.3" r="2.2"/><circle cx="278.7" cy="217.1" r="2.2"/><circle cx="276.7" cy="209.7" r="2.2"/><circle cx="271.8" cy="213.8" r="2.2"/><circle cx="276.0" cy="211.8" r="2.2"/><circle cx="271.2" cy="211.5" r="2.2"/><circle cx="247.8" cy="213.4" r="2.2"/><circle cx="268.5" cy="211.9" r="2.2"/><circle cx="255.3" cy="227.3" r="2.2"/><circle cx="264.3" cy="214.8" r="2.2"/><circle cx="259.3" cy="224.7" r="2.2"/><circle cx="257.7" cy="223.4" r="2.2"/><circle cx="243.9" cy="222.2" r="2.2"/><circle cx="256.5" cy="217.2" r="2.2"/><circle cx="238.9" cy="216.5" r="2.2"/><circle cx="264.0" cy="210.7" r="2.2"/><circle cx="269.2" cy="228.2" r="2.2"/><circle cx="265.7" cy="224.7" r="2.2"/><circle cx="239.3" cy="221.5" r="2.2"/><circle cx="248.8" cy="212.8" r="2.2"/><circle cx="248.1" cy="217.9" r="2.2"/><circle cx="241.3" cy="218.7" r="2.2"/><circle cx="258.2" cy="213.9" r="2.2"/><circle cx="263.8" cy="215.9" r="2.2"/><circle cx="247.9" cy="222.9" r="2.2"/><circle cx="266.0" cy="226.8" r="2.2"/><circle cx="263.8" cy="219.6" r="2.2"/><circle cx="241.9" cy="211.6" r="2.2"/><circle cx="262.8" cy="217.0" r="2.2"/><circle cx="266.6" cy="227.4" r="2.2"/><circle cx="244.1" cy="220.0" r="2.2"/><circle cx="256.5" cy="221.1" r="2.2"/><circle cx="258.6" cy="217.3" r="2.2"/><circle cx="257.7" cy="217.2" r="2.2"/><circle cx="240.8" cy="210.3" r="2.2"/><circle cx="259.4" cy="222.0" r="2.2"/><circle cx="258.4" cy="220.6" r="2.2"/><circle cx="264.7" cy="216.7" r="2.2"/><circle cx="264.0" cy="211.5" r="2.2"/><circle cx="248.4" cy="215.0" r="2.2"/><circle cx="261.4" cy="219.4" r="2.2"/><circle cx="266.1" cy="212.9" r="2.2"/><circle cx="234.1" cy="219.2" r="2.2"/><circle cx="210.1" cy="210.1" r="2.2"/><circle cx="205.6" cy="223.0" r="2.2"/><circle cx="226.1" cy="226.0" r="2.2"/><circle cx="211.8" cy="212.6" r="2.2"/><circle cx="223.3" cy="222.8" r="2.2"/><circle cx="235.8" cy="212.3" r="2.2"/><circle cx="217.2" cy="216.8" r="2.2"/><circle cx="213.1" cy="218.7" r="2.2"/><circle cx="219.8" cy="226.8" r="2.2"/><circle cx="226.4" cy="213.4" r="2.2"/><circle cx="208.1" cy="227.2" r="2.2"/><circle cx="217.3" cy="210.0" r="2.2"/><circle cx="209.1" cy="211.7" r="2.2"/><circle cx="226.5" cy="222.6" r="2.2"/><circle cx="232.1" cy="226.0" r="2.2"/><circle cx="217.1" cy="211.5" r="2.2"/><circle cx="184.1" cy="219.3" r="2.2"/><circle cx="189.6" cy="226.0" r="2.2"/><circle cx="179.0" cy="218.9" r="2.2"/><circle cx="180.0" cy="223.7" r="2.2"/><circle cx="182.7" cy="220.6" r="2.2"/><circle cx="186.9" cy="216.2" r="2.2"/><circle cx="174.6" cy="211.0" r="2.2"/><circle cx="196.6" cy="213.2" r="2.2"/><circle cx="190.9" cy="225.3" r="2.2"/><circle cx="181.7" cy="219.3" r="2.2"/><circle cx="174.4" cy="219.0" r="2.2"/><circle cx="164.1" cy="209.6" r="2.2"/><circle cx="143.3" cy="226.8" r="2.2"/><circle cx="143.4" cy="218.7" r="2.2"/><circle cx="143.3" cy="211.0" r="2.2"/><circle cx="141.7" cy="220.8" r="2.2"/><circle cx="152.4" cy="223.4" r="2.2"/><circle cx="131.4" cy="217.8" r="2.2"/><circle cx="271.6" cy="192.4" r="2.2"/><circle cx="275.0" cy="196.8" r="2.2"/><circle cx="275.4" cy="204.9" r="2.2"/><circle cx="274.5" cy="208.4" r="2.2"/><circle cx="273.5" cy="191.5" r="2.2"/><circle cx="274.3" cy="201.6" r="2.2"/><circle cx="276.3" cy="198.9" r="2.2"/><circle cx="243.9" cy="202.7" r="2.2"/><circle cx="267.7" cy="207.9" r="2.2"/><circle cx="244.8" cy="195.9" r="2.2"/><circle cx="262.9" cy="190.8" r="2.2"/><circle cx="239.8" cy="209.0" r="2.2"/><circle cx="253.2" cy="194.6" r="2.2"/><circle cx="238.7" cy="206.0" r="2.2"/><circle cx="247.9" cy="200.6" r="2.2"/><circle cx="247.9" cy="199.4" r="2.2"/><circle cx="261.3" cy="197.7" r="2.2"/><circle cx="252.6" cy="190.5" r="2.2"/><circle cx="239.5" cy="196.3" r="2.2"/><circle cx="270.3" cy="201.9" r="2.2"/><circle cx="266.8" cy="195.7" r="2.2"/><circle cx="267.7" cy="200.5" r="2.2"/><circle cx="245.7" cy="201.5" r="2.2"/><circle cx="250.6" cy="202.4" r="2.2"/><circle cx="245.1" cy="200.0" r="2.2"/><circle cx="241.7" cy="204.0" r="2.2"/><circle cx="238.7" cy="204.8" r="2.2"/><circle cx="254.2" cy="206.5" r="2.2"/><circle cx="241.7" cy="201.0" r="2.2"/><circle cx="243.4" cy="203.8" r="2.2"/><circle cx="265.9" cy="193.4" r="2.2"/><circle cx="253.5" cy="193.2" r="2.2"/><circle cx="243.7" cy="202.8" r="2.2"/><circle cx="259.6" cy="197.6" r="2.2"/><circle cx="246.4" cy="192.2" r="2.2"/><circle cx="254.9" cy="202.5" r="2.2"/><circle cx="246.9" cy="198.8" r="2.2"/><circle cx="254.6" cy="200.9" r="2.2"/><circle cx="258.3" cy="197.0" r="2.2"/><circle cx="255.2" cy="191.1" r="2.2"/><circle cx="250.6" cy="206.7" r="2.2"/><circle cx="263.6" cy="191.0" r="2.2"/><circle cx="266.3" cy="196.7" r="2.2"/><circle cx="243.5" cy="194.2" r="2.2"/><circle cx="242.1" cy="197.3" r="2.2"/><circle cx="208.5" cy="192.8" r="2.2"/><circle cx="237.0" cy="203.2" r="2.2"/><circle cx="235.7" cy="195.9" r="2.2"/><circle cx="212.3" cy="204.3" r="2.2"/><circle cx="236.6" cy="199.7" r="2.2"/><circle cx="211.6" cy="196.4" r="2.2"/><circle cx="221.4" cy="205.5" r="2.2"/><circle cx="221.1" cy="208.2" r="2.2"/><circle cx="234.8" cy="194.3" r="2.2"/><circle cx="206.1" cy="194.0" r="2.2"/><circle cx="215.1" cy="196.7" r="2.2"/><circle cx="224.5" cy="203.2" r="2.2"/><circle cx="206.9" cy="196.8" r="2.2"/><circle cx="212.5" cy="207.8" r="2.2"/><circle cx="220.0" cy="196.7" r="2.2"/><circle cx="233.7" cy="198.4" r="2.2"/><circle cx="229.8" cy="197.6" r="2.2"/><circle cx="199.1" cy="200.8" r="2.2"/><circle cx="196.9" cy="205.1" r="2.2"/><circle cx="195.1" cy="195.5" r="2.2"/><circle cx="199.8" cy="200.5" r="2.2"/><circle cx="194.3" cy="195.2" r="2.2"/><circle cx="196.1" cy="202.4" r="2.2"/><circle cx="181.8" cy="207.7" r="2.2"/><circle cx="177.4" cy="199.0" r="2.2"/><circle cx="196.7" cy="197.5" r="2.2"/><circle cx="177.3" cy="191.8" r="2.2"/><circle cx="202.1" cy="192.5" r="2.2"/><circle cx="158.6" cy="208.3" r="2.2"/><circle cx="149.8" cy="194.7" r="2.2"/><circle cx="169.8" cy="204.4" r="2.2"/><circle cx="144.1" cy="196.1" r="2.2"/><circle cx="155.9" cy="202.1" r="2.2"/><circle cx="125.6" cy="203.2" r="2.2"/><circle cx="154.3" cy="200.1" r="2.2"/><circle cx="420.9" cy="180.2" r="2.2"/><circle cx="395.5" cy="177.1" r="2.2"/><circle cx="378.4" cy="178.2" r="2.2"/><circle cx="395.5" cy="177.4" r="2.2"/><circle cx="357.4" cy="177.4" r="2.2"/><circle cx="350.5" cy="178.7" r="2.2"/><circle cx="349.9" cy="181.6" r="2.2"/><circle cx="359.0" cy="179.6" r="2.2"/><circle cx="347.2" cy="180.8" r="2.2"/><circle cx="361.5" cy="177.8" r="2.2"/><circle cx="305.5" cy="173.3" r="2.2"/><circle cx="334.9" cy="178.5" r="2.2"/><circle cx="316.8" cy="173.3" r="2.2"/><circle cx="327.4" cy="180.9" r="2.2"/><circle cx="334.0" cy="176.7" r="2.2"/><circle cx="304.7" cy="171.5" r="2.2"/><circle cx="324.1" cy="175.3" r="2.2"/><circle cx="305.8" cy="179.3" r="2.2"/><circle cx="322.9" cy="182.1" r="2.2"/><circle cx="299.4" cy="176.1" r="2.2"/><circle cx="277.0" cy="187.8" r="2.2"/><circle cx="295.2" cy="174.7" r="2.2"/><circle cx="293.7" cy="171.4" r="2.2"/><circle cx="288.7" cy="178.7" r="2.2"/><circle cx="297.0" cy="173.7" r="2.2"/><circle cx="285.8" cy="171.6" r="2.2"/><circle cx="290.9" cy="176.2" r="2.2"/><circle cx="297.4" cy="178.0" r="2.2"/><circle cx="283.8" cy="178.4" r="2.2"/><circle cx="288.8" cy="172.7" r="2.2"/><circle cx="295.0" cy="182.8" r="2.2"/><circle cx="285.8" cy="177.0" r="2.2"/><circle cx="295.3" cy="181.9" r="2.2"/><circle cx="287.0" cy="175.1" r="2.2"/><circle cx="297.7" cy="177.7" r="2.2"/><circle cx="283.0" cy="177.5" r="2.2"/><circle cx="298.3" cy="181.5" r="2.2"/><circle cx="285.2" cy="182.6" r="2.2"/><circle cx="293.9" cy="176.1" r="2.2"/><circle cx="271.6" cy="186.7" r="2.2"/><circle cx="298.8" cy="181.5" r="2.2"/><circle cx="288.8" cy="175.1" r="2.2"/><circle cx="292.3" cy="174.7" r="2.2"/><circle cx="243.7" cy="186.8" r="2.2"/><circle cx="252.3" cy="184.6" r="2.2"/><circle cx="268.8" cy="183.9" r="2.2"/><circle cx="266.8" cy="184.1" r="2.2"/><circle cx="250.0" cy="187.4" r="2.2"/><circle cx="266.7" cy="183.3" r="2.2"/><circle cx="253.9" cy="186.2" r="2.2"/><circle cx="251.4" cy="188.6" r="2.2"/><circle cx="253.2" cy="188.7" r="2.2"/><circle cx="215.2" cy="183.6" r="2.2"/><circle cx="230.1" cy="186.6" r="2.2"/><circle cx="206.6" cy="184.5" r="2.2"/><circle cx="228.8" cy="184.5" r="2.2"/><circle cx="219.4" cy="183.9" r="2.2"/><circle cx="206.8" cy="186.0" r="2.2"/><circle cx="180.0" cy="187.7" r="2.2"/><circle cx="187.5" cy="186.6" r="2.2"/><circle cx="189.1" cy="188.3" r="2.2"/><circle cx="143.3" cy="188.3" r="2.2"/><circle cx="408.7" cy="164.6" r="2.2"/><circle cx="433.6" cy="163.5" r="2.2"/><circle cx="378.6" cy="153.7" r="2.2"/><circle cx="379.2" cy="161.0" r="2.2"/><circle cx="377.5" cy="152.4" r="2.2"/><circle cx="371.3" cy="157.5" r="2.2"/><circle cx="383.0" cy="168.5" r="2.2"/><circle cx="361.6" cy="160.7" r="2.2"/><circle cx="359.6" cy="168.2" r="2.2"/><circle cx="342.7" cy="170.5" r="2.2"/><circle cx="340.7" cy="153.3" r="2.2"/><circle cx="346.8" cy="164.8" r="2.2"/><circle cx="361.5" cy="167.7" r="2.2"/><circle cx="352.3" cy="169.3" r="2.2"/><circle cx="366.6" cy="158.8" r="2.2"/><circle cx="357.8" cy="162.5" r="2.2"/><circle cx="356.6" cy="171.0" r="2.2"/><circle cx="361.5" cy="157.6" r="2.2"/><circle cx="360.9" cy="166.4" r="2.2"/><circle cx="347.5" cy="156.4" r="2.2"/><circle cx="344.7" cy="162.0" r="2.2"/><circle cx="350.6" cy="161.1" r="2.2"/><circle cx="352.3" cy="162.6" r="2.2"/><circle cx="340.9" cy="158.4" r="2.2"/><circle cx="350.7" cy="152.4" r="2.2"/><circle cx="324.4" cy="156.1" r="2.2"/><circle cx="307.8" cy="169.9" r="2.2"/><circle cx="307.9" cy="161.8" r="2.2"/><circle cx="309.1" cy="166.8" r="2.2"/><circle cx="312.7" cy="169.3" r="2.2"/><circle cx="335.0" cy="167.5" r="2.2"/><circle cx="304.2" cy="166.5" r="2.2"/><circle cx="309.4" cy="153.0" r="2.2"/><circle cx="308.8" cy="157.1" r="2.2"/><circle cx="319.0" cy="155.0" r="2.2"/><circle cx="303.9" cy="158.0" r="2.2"/><circle cx="318.4" cy="165.3" r="2.2"/><circle cx="308.7" cy="163.8" r="2.2"/><circle cx="312.2" cy="162.9" r="2.2"/><circle cx="329.4" cy="165.7" r="2.2"/><circle cx="309.4" cy="163.2" r="2.2"/><circle cx="323.7" cy="156.6" r="2.2"/><circle cx="316.7" cy="169.8" r="2.2"/><circle cx="317.1" cy="166.0" r="2.2"/><circle cx="330.2" cy="162.1" r="2.2"/><circle cx="308.7" cy="158.4" r="2.2"/><circle cx="333.7" cy="159.0" r="2.2"/><circle cx="332.7" cy="157.5" r="2.2"/><circle cx="325.3" cy="169.3" r="2.2"/><circle cx="305.0" cy="167.8" r="2.2"/><circle cx="325.2" cy="165.4" r="2.2"/><circle cx="323.1" cy="165.9" r="2.2"/><circle cx="328.7" cy="156.9" r="2.2"/><circle cx="310.4" cy="152.3" r="2.2"/><circle cx="334.7" cy="158.3" r="2.2"/><circle cx="332.5" cy="170.6" r="2.2"/><circle cx="307.1" cy="165.6" r="2.2"/><circle cx="313.7" cy="156.0" r="2.2"/><circle cx="297.8" cy="159.9" r="2.2"/><circle cx="300.6" cy="164.6" r="2.2"/><circle cx="303.0" cy="164.5" r="2.2"/><circle cx="290.6" cy="159.2" r="2.2"/><circle cx="292.4" cy="154.8" r="2.2"/><circle cx="292.8" cy="164.8" r="2.2"/><circle cx="289.2" cy="167.6" r="2.2"/><circle cx="301.8" cy="171.2" r="2.2"/><circle cx="290.5" cy="168.6" r="2.2"/><circle cx="281.5" cy="155.0" r="2.2"/><circle cx="287.4" cy="159.4" r="2.2"/><circle cx="294.3" cy="169.9" r="2.2"/><circle cx="293.3" cy="164.3" r="2.2"/><circle cx="284.3" cy="156.1" r="2.2"/><circle cx="298.5" cy="158.7" r="2.2"/><circle cx="295.3" cy="170.0" r="2.2"/><circle cx="281.6" cy="163.6" r="2.2"/><circle cx="285.2" cy="152.9" r="2.2"/><circle cx="301.0" cy="162.4" r="2.2"/><circle cx="300.0" cy="161.1" r="2.2"/><circle cx="292.9" cy="169.7" r="2.2"/><circle cx="298.5" cy="166.8" r="2.2"/><circle cx="283.7" cy="170.1" r="2.2"/><circle cx="296.4" cy="167.5" r="2.2"/><circle cx="296.8" cy="164.4" r="2.2"/><circle cx="293.1" cy="155.7" r="2.2"/><circle cx="301.4" cy="155.9" r="2.2"/><circle cx="293.6" cy="162.9" r="2.2"/><circle cx="297.3" cy="160.9" r="2.2"/><circle cx="287.5" cy="154.9" r="2.2"/><circle cx="288.6" cy="165.1" r="2.2"/><circle cx="298.3" cy="170.8" r="2.2"/><circle cx="407.0" cy="136.0" r="2.2"/><circle cx="371.8" cy="136.8" r="2.2"/><circle cx="387.8" cy="139.5" r="2.2"/><circle cx="400.5" cy="138.5" r="2.2"/><circle cx="388.2" cy="149.2" r="2.2"/><circle cx="390.4" cy="138.9" r="2.2"/><circle cx="379.7" cy="147.4" r="2.2"/><circle cx="387.9" cy="147.3" r="2.2"/><circle cx="393.8" cy="149.9" r="2.2"/><circle cx="388.5" cy="144.7" r="2.2"/><circle cx="395.5" cy="151.8" r="2.2"/><circle cx="354.3" cy="139.7" r="2.2"/><circle cx="342.7" cy="138.0" r="2.2"/><circle cx="355.4" cy="137.4" r="2.2"/><circle cx="352.4" cy="149.8" r="2.2"/><circle cx="341.7" cy="140.0" r="2.2"/><circle cx="356.6" cy="136.2" r="2.2"/><circle cx="363.1" cy="151.5" r="2.2"/><circle cx="340.7" cy="148.5" r="2.2"/><circle cx="354.1" cy="147.1" r="2.2"/><circle cx="360.4" cy="143.4" r="2.2"/><circle cx="349.5" cy="148.9" r="2.2"/><circle cx="345.1" cy="141.9" r="2.2"/><circle cx="348.5" cy="145.7" r="2.2"/><circle cx="354.0" cy="139.7" r="2.2"/><circle cx="325.9" cy="142.1" r="2.2"/><circle cx="321.7" cy="139.1" r="2.2"/><circle cx="306.9" cy="147.5" r="2.2"/><circle cx="330.2" cy="138.7" r="2.2"/><circle cx="333.7" cy="138.2" r="2.2"/><circle cx="306.7" cy="138.5" r="2.2"/><circle cx="311.6" cy="150.9" r="2.2"/><circle cx="309.1" cy="134.2" r="2.2"/><circle cx="331.3" cy="141.2" r="2.2"/><circle cx="333.3" cy="147.0" r="2.2"/><circle cx="304.8" cy="143.9" r="2.2"/><circle cx="314.3" cy="142.4" r="2.2"/><circle cx="309.7" cy="142.4" r="2.2"/><circle cx="318.8" cy="147.5" r="2.2"/><circle cx="333.7" cy="147.2" r="2.2"/><circle cx="305.7" cy="145.3" r="2.2"/><circle cx="309.0" cy="137.3" r="2.2"/><circle cx="319.4" cy="143.9" r="2.2"/><circle cx="320.6" cy="151.5" r="2.2"/><circle cx="327.9" cy="143.6" r="2.2"/><circle cx="317.8" cy="148.4" r="2.2"/><circle cx="308.0" cy="152.0" r="2.2"/><circle cx="315.0" cy="133.6" r="2.2"/><circle cx="335.6" cy="146.6" r="2.2"/><circle cx="328.0" cy="142.0" r="2.2"/><circle cx="297.1" cy="151.2" r="2.2"/><circle cx="280.7" cy="135.1" r="2.2"/><circle cx="296.2" cy="134.4" r="2.2"/><circle cx="299.1" cy="144.3" r="2.2"/><circle cx="285.5" cy="149.0" r="2.2"/><circle cx="292.2" cy="139.6" r="2.2"/><circle cx="287.2" cy="137.3" r="2.2"/><circle cx="285.8" cy="144.9" r="2.2"/><circle cx="282.2" cy="143.7" r="2.2"/><circle cx="289.8" cy="136.2" r="2.2"/><circle cx="432.2" cy="128.1" r="2.2"/><circle cx="422.1" cy="128.4" r="2.2"/><circle cx="371.3" cy="118.3" r="2.2"/><circle cx="387.8" cy="131.0" r="2.2"/><circle cx="384.2" cy="129.3" r="2.2"/><circle cx="387.6" cy="123.1" r="2.2"/><circle cx="360.5" cy="127.2" r="2.2"/><circle cx="358.5" cy="128.6" r="2.2"/><circle cx="369.0" cy="126.1" r="2.2"/><circle cx="341.4" cy="123.6" r="2.2"/><circle cx="363.0" cy="120.3" r="2.2"/><circle cx="349.7" cy="114.6" r="2.2"/><circle cx="362.0" cy="116.9" r="2.2"/><circle cx="332.7" cy="125.0" r="2.2"/><circle cx="336.0" cy="124.6" r="2.2"/><circle cx="312.1" cy="125.2" r="2.2"/><circle cx="318.3" cy="128.6" r="2.2"/><circle cx="334.4" cy="115.0" r="2.2"/><circle cx="334.5" cy="131.9" r="2.2"/><circle cx="315.6" cy="129.3" r="2.2"/><circle cx="334.3" cy="120.6" r="2.2"/><circle cx="316.7" cy="121.9" r="2.2"/><circle cx="315.7" cy="127.9" r="2.2"/><circle cx="328.2" cy="115.3" r="2.2"/><circle cx="318.9" cy="125.4" r="2.2"/><circle cx="318.1" cy="121.8" r="2.2"/><circle cx="316.1" cy="131.4" r="2.2"/><circle cx="317.6" cy="116.2" r="2.2"/><circle cx="308.0" cy="131.2" r="2.2"/><circle cx="305.4" cy="125.7" r="2.2"/><circle cx="328.1" cy="116.3" r="2.2"/><circle cx="321.9" cy="115.2" r="2.2"/><circle cx="325.5" cy="115.9" r="2.2"/><circle cx="296.9" cy="117.4" r="2.2"/><circle cx="295.5" cy="114.9" r="2.2"/><circle cx="282.8" cy="133.0" r="2.2"/><circle cx="281.1" cy="127.0" r="2.2"/><circle cx="291.4" cy="129.3" r="2.2"/><circle cx="293.4" cy="131.7" r="2.2"/><circle cx="295.4" cy="116.0" r="2.2"/><circle cx="291.4" cy="126.1" r="2.2"/><circle cx="283.8" cy="118.0" r="2.2"/><circle cx="289.5" cy="126.9" r="2.2"/><circle cx="438.3" cy="96.6" r="2.2"/><circle cx="434.5" cy="107.6" r="2.2"/><circle cx="433.2" cy="110.4" r="2.2"/><circle cx="403.4" cy="113.3" r="2.2"/><circle cx="419.1" cy="107.6" r="2.2"/><circle cx="421.7" cy="95.3" r="2.2"/><circle cx="425.1" cy="110.0" r="2.2"/><circle cx="413.0" cy="105.4" r="2.2"/><circle cx="379.9" cy="95.6" r="2.2"/><circle cx="369.2" cy="114.0" r="2.2"/><circle cx="370.3" cy="108.5" r="2.2"/><circle cx="387.2" cy="98.5" r="2.2"/><circle cx="371.6" cy="112.3" r="2.2"/><circle cx="375.8" cy="96.4" r="2.2"/><circle cx="380.1" cy="98.2" r="2.2"/><circle cx="371.4" cy="111.4" r="2.2"/><circle cx="370.1" cy="102.8" r="2.2"/><circle cx="366.7" cy="103.5" r="2.2"/><circle cx="350.5" cy="100.9" r="2.2"/><circle cx="343.0" cy="108.3" r="2.2"/><circle cx="359.5" cy="106.8" r="2.2"/><circle cx="303.7" cy="109.5" r="2.2"/><circle cx="311.4" cy="108.6" r="2.2"/><circle cx="334.9" cy="110.8" r="2.2"/><circle cx="332.9" cy="96.9" r="2.2"/><circle cx="324.3" cy="97.2" r="2.2"/><circle cx="306.4" cy="107.3" r="2.2"/><circle cx="313.8" cy="100.9" r="2.2"/><circle cx="304.3" cy="104.8" r="2.2"/><circle cx="310.6" cy="108.8" r="2.2"/><circle cx="304.2" cy="107.5" r="2.2"/><circle cx="307.5" cy="95.7" r="2.2"/><circle cx="291.3" cy="107.6" r="2.2"/><circle cx="300.2" cy="108.4" r="2.2"/><circle cx="436.4" cy="76.5" r="2.2"/><circle cx="438.7" cy="81.5" r="2.2"/><circle cx="421.7" cy="76.4" r="2.2"/><circle cx="410.5" cy="89.8" r="2.2"/><circle cx="421.2" cy="85.1" r="2.2"/><circle cx="400.4" cy="91.0" r="2.2"/><circle cx="396.0" cy="93.5" r="2.2"/><circle cx="357.3" cy="86.7" r="2.2"/><circle cx="353.3" cy="81.4" r="2.2"/><circle cx="336.7" cy="80.2" r="2.2"/><circle cx="332.6" cy="94.7" r="2.2"/><circle cx="305.6" cy="77.1" r="2.2"/><circle cx="307.6" cy="90.4" r="2.2"/><circle cx="326.1" cy="89.5" r="2.2"/><circle cx="297.2" cy="79.2" r="2.2"/><circle cx="296.3" cy="78.0" r="2.2"/><circle cx="285.4" cy="81.0" r="2.2"/><circle cx="407.8" cy="79.2" r="2.2"/><circle cx="403.1" cy="76.7" r="2.2"/><circle cx="430.0" cy="69.6" r="2.2"/><circle cx="434.1" cy="78.7" r="2.2"/><circle cx="377.1" cy="70.2" r="2.2"/><circle cx="397.6" cy="70.6" r="2.2"/><circle cx="349.5" cy="76.6" r="2.2"/><circle cx="346.5" cy="68.5" r="2.2"/><circle cx="352.8" cy="78.2" r="2.2"/><circle cx="303.6" cy="71.3" r="2.2"/><circle cx="317.9" cy="73.4" r="2.2"/><circle cx="309.9" cy="79.2" r="2.2"/><circle cx="326.8" cy="75.4" r="2.2"/><circle cx="319.9" cy="74.0" r="2.2"/></g>
<line x1="280.6" y1="40" x2="280.6" y2="340" stroke="currentColor" stroke-dasharray="5 4"/>
<line x1="80" y1="182.9" x2="520" y2="182.9" stroke="currentColor" stroke-dasharray="5 4"/>
<text x="286.6" y="52.0" text-anchor="start" fill="currentColor" font-size="11">media dei genitori</text>
<text x="516.0" y="196.9" text-anchor="end" fill="currentColor" font-size="11">media dei figli</text>
<text x="514.0" y="72.0" text-anchor="end" fill="#4051b5" font-size="12" font-weight="bold">sopra e sopra: prodotto +</text>
<text x="88.0" y="330.0" text-anchor="start" fill="#4051b5" font-size="12" font-weight="bold">sotto e sotto: prodotto +</text>
<text x="88.0" y="72.0" text-anchor="start" fill="#e07a1f" font-size="12" font-weight="bold">sotto e sopra: prodotto −</text>
<text x="514.0" y="330.0" text-anchor="end" fill="#e07a1f" font-size="12" font-weight="bold">sopra e sotto: prodotto −</text>
</svg>
<figcaption>I dati di Galton come nuvola di punti. Blu: genitore e figlio dalla stessa parte delle rispettive medie, quindi prodotto degli scarti positivo; arancione: da parti opposte, prodotto negativo. I blu sono circa il 63%. I dati sono raggruppati in classi di un pollice: dentro la sua classe ogni punto è spostato un poco a caso, per vederli tutti.</figcaption>
</figure>

Per ogni punto guardiamo due scarti: quanto il genitore si allontana dalla media dei genitori, $x-\mu_X$, e quanto il figlio si allontana dalla media dei figli, $y-\mu_Y$. Nel quadrante in alto a destra entrambi gli scarti sono positivi: genitore e figlio sono tutti e due sopra la media. Nel quadrante in basso a sinistra sono entrambi negativi: tutti e due sotto la media. In questi due quadranti il prodotto degli scarti, $(x-\mu_X)(y-\mu_Y)$, è positivo, perché è il prodotto di due numeri con lo stesso segno. Negli altri due quadranti uno scarto è positivo e l’altro negativo, e il prodotto è negativo.

Nei dati di Galton quasi due punti su tre sono blu, cioè nei quadranti con prodotto positivo. È il segno che le due altezze tendono a stare dalla stessa parte delle rispettive medie: genitori alti con figli alti, genitori bassi con figli bassi. Per trasformare questa osservazione in un numero facciamo la media dei prodotti degli scarti, pesando ogni coppia con la sua probabilità. Questo numero si chiama **covarianza** di $X$ e $Y$:

$$
\operatorname{Cov}(X,Y)=\mathbb{E}\big[(X-\mu_X)(Y-\mu_Y)\big].
$$

Per due variabili discrete la media si calcola con la regola LOTUS a due variabili dell’Atto IV, con $g(x,y)=(x-\mu_X)(y-\mu_Y)$: in ogni casella si moltiplicano i due scarti, si pesa il prodotto con la probabilità della casella e si somma su tutte le caselle,

$$
\operatorname{Cov}(X,Y)=\sum_{x}\sum_{y}(x-\mu_X)(y-\mu_Y)\,p_{X,Y}(x,y).
$$

La lettura con i quadranti dice subito che cosa significa il segno. Se la covarianza è positiva, la probabilità pesa di più sui quadranti in cui le due variabili sono dalla stessa parte delle loro medie: a valori grandi di $X$ tendono a corrispondere valori grandi di $Y$, e a valori piccoli valori piccoli. Se è negativa, pesa di più sugli altri due quadranti: a valori grandi di $X$ tendono a corrispondere valori piccoli di $Y$, come il prezzo di un prodotto e la quantità venduta. Se è zero, i contributi positivi e quelli negativi si bilanciano, e si dice che le variabili sono **incorrelate**.

Un’avvertenza prima di cominciare a calcolare. La covarianza usa le differenze $x-\mu_X$ e i prodotti dei valori, quindi ha senso solo quando i valori sono numeri veri, che misurano una quantità. Nella tabella degli studenti avevamo codificato «single» con 0, «in una relazione» con 1 ed «è complicato» con 2, ma quei numeri erano soltanto etichette: cambiandole, cambierebbe la covarianza senza che cambi nulla nei dati. Per le variabili di quel tipo valgono la tabella congiunta, le marginali e l’indipendenza, ma non la covarianza.

### Un primo calcolo, casella per casella {: #covarianza-calcolo }

Prendiamo un esempio piccolo, costruito per la dispensa, con i numeri del widget dell’Atto IV. Due server, A e B, condividono lo stesso bilanciatore di carico. In un istante scelto a caso, $X=1$ se il server A è sovraccarico e $X=0$ altrimenti; $Y=1$ se lo è il server B e $Y=0$ altrimenti. La distribuzione congiunta è questa:

| | $Y=0$ | $Y=1$ | $P(X=x)$ |
|---|:---:|:---:|:---:|
| $X=0$ | 0,50 | 0,10 | 0,60 |
| $X=1$ | 0,10 | 0,30 | 0,40 |
| $P(Y=y)$ | 0,60 | 0,40 | 1 |

Per una variabile che vale 0 o 1 la media è la probabilità di valere 1, come per ogni variabile bernoulliana ([Settimana 4](../settimana_04/index.md#indicatrici)): quindi $\mu_X=0{,}40$ e $\mu_Y=0{,}40$. Gli scarti possibili sono $0-0{,}40=-0{,}40$ e $1-0{,}40=0{,}60$, per entrambe le variabili. Ora, casella per casella, moltiplichiamo i due scarti e pesiamo il prodotto con la probabilità della casella:

| casella $(x,y)$ | probabilità | $x-\mu_X$ | $y-\mu_Y$ | prodotto degli scarti | prodotto × probabilità |
|:---:|:---:|:---:|:---:|:---:|:---:|
| (0, 0) | 0,50 | −0,40 | −0,40 | +0,16 | +0,080 |
| (0, 1) | 0,10 | −0,40 | +0,60 | −0,24 | −0,024 |
| (1, 0) | 0,10 | +0,60 | −0,40 | −0,24 | −0,024 |
| (1, 1) | 0,30 | +0,60 | +0,60 | +0,36 | +0,108 |

Sommando l’ultima colonna,

$$
\operatorname{Cov}(X,Y)=0{,}080-0{,}024-0{,}024+0{,}108=0{,}14.
$$

La covarianza è positiva, e la tabella dei conti dice perché. Le due caselle in cui i server «sono d’accordo», entrambi tranquilli o entrambi sovraccarichi, hanno prodotto positivo e insieme portano l’80% della probabilità; le due caselle in cui sono in disaccordo hanno prodotto negativo e portano solo il 20%. I due server tendono a essere sovraccarichi insieme, come ci si aspetta se il carico arriva dallo stesso bilanciatore.

### Una formula più comoda {: #formula-covarianza }

Il calcolo con la definizione è istruttivo, ma con tabelle più grandi diventa lungo. Esiste una formula equivalente, che si ricava dalla linearità del valore atteso e che di solito è più rapida:

$$
\operatorname{Cov}(X,Y)=\mathbb{E}[XY]-\mu_X\,\mu_Y.
$$

A parole: la covarianza è la media del prodotto meno il prodotto delle medie. Verifichiamola sui due server. Il prodotto $XY$ vale 1 solo nella casella (1, 1) e zero altrove, quindi $\mathbb{E}[XY]=0{,}30$; il prodotto delle medie è $0{,}40\cdot0{,}40=0{,}16$; e infatti $0{,}30-0{,}16=0{,}14$, come prima. Per due variabili che valgono 0 o 1 la formula diventa semplicissima: $\mathbb{E}[XY]=P(X=1,\,Y=1)$, e la covarianza è $a-p\,q$, proprio la differenza che il widget dell’Atto IV mostrava nell’ultima riga. Quella differenza misurava di quanto la casella (1, 1) si allontana dal valore che avrebbe se le variabili fossero indipendenti: ora sappiamo che si chiama covarianza.

??? note "Approfondimento facoltativo — Da dove viene la formula $\mathbb{E}[XY]-\mu_X\mu_Y$"
    Sviluppiamo il prodotto dentro la definizione, come si fa con $(a-b)(c-d)=ac-ad-bc+bd$:

    $$
    (X-\mu_X)(Y-\mu_Y)=XY-\mu_Y\,X-\mu_X\,Y+\mu_X\mu_Y.
    $$

    Ora prendiamo il valore atteso di entrambi i lati. Per la linearità, la media di una somma è la somma delle medie, e le costanti $\mu_X$ e $\mu_Y$ escono dalla media:

    $$
    \operatorname{Cov}(X,Y)=\mathbb{E}[XY]-\mu_Y\,\mathbb{E}[X]-\mu_X\,\mathbb{E}[Y]+\mu_X\mu_Y=\mathbb{E}[XY]-\mu_Y\mu_X-\mu_X\mu_Y+\mu_X\mu_Y.
    $$

    Nell’ultimo passaggio abbiamo sostituito $\mathbb{E}[X]=\mu_X$ e $\mathbb{E}[Y]=\mu_Y$. Dei tre termini con il prodotto delle medie, due si cancellano con il segno opposto e ne resta uno con il segno meno: $\operatorname{Cov}(X,Y)=\mathbb{E}[XY]-\mu_X\mu_Y$. Se prendiamo $Y=X$, la stessa formula dà $\operatorname{Var}(X)=\mathbb{E}[X^2]-\mu_X^2$, la formula della varianza che avevamo visto nella [Lettura C della Settimana 5](../settimana_05/index.md#formula-varianza).

Torniamo ai due moduli del programma. Nell’Atto IV abbiamo già calcolato tutti gli ingredienti: $\mathbb{E}[XY]=0{,}60$, $\mu_X=0{,}5$ e $\mu_Y=1{,}05$. Quindi

$$
\operatorname{Cov}(X,Y)=0{,}60-0{,}5\cdot1{,}05=0{,}60-0{,}525=0{,}075.
$$

La covarianza è positiva: quando il primo modulo ha un errore, il secondo tende ad averne di più. Puoi verificare con la definizione, moltiplicando gli scarti casella per casella come abbiamo fatto con i server, che si ottiene lo stesso numero: sono otto caselle invece di quattro, ed è un buon esercizio.

Ma 0,075 è tanto o poco? Il legame è forte o debole? Con la sola covarianza non possiamo dirlo, e il motivo è il prossimo punto.

### La covarianza dipende dalle unità di misura {: #unita }

Notiamo prima di tutto che la covarianza è una generalizzazione della varianza. Se nella definizione prendiamo $Y=X$, otteniamo

$$
\operatorname{Cov}(X,X)=\mathbb{E}\big[(X-\mu_X)(X-\mu_X)\big]=\mathbb{E}\big[(X-\mu_X)^2\big]=\operatorname{Var}(X):
$$

la varianza è la covarianza di una variabile con sé stessa. Notiamo anche che la definizione è simmetrica, $\operatorname{Cov}(X,Y)=\operatorname{Cov}(Y,X)$, perché il prodotto non dipende dall’ordine dei fattori.

Come la varianza, la covarianza ha un’unità di misura: il prodotto delle unità di $X$ e di $Y$. Nei dati di Galton, con le altezze in centimetri, la covarianza vale circa $13{,}3\ \text{cm}^2$. Ma Galton misurava in pollici, e in pollici la stessa covarianza vale circa $2{,}06$ pollici quadrati. I dati sono gli stessi, il legame tra genitori e figli è lo stesso, eppure il numero è sei volte e mezzo più grande in centimetri. Il motivo è semplice: un pollice è 2,54 cm, quindi passando ai centimetri ogni scarto di $X$ viene moltiplicato per 2,54, ogni scarto di $Y$ anche, e ogni prodotto di scarti per $2{,}54^2\approx6{,}45$.

In generale, se cambiamo l’unità di misura di $X$ passando a $aX+b$, la covarianza diventa

$$
\operatorname{Cov}(aX+b,\;Y)=a\,\operatorname{Cov}(X,Y).
$$

Il termine $b$ sparisce perché spostare tutti i valori di $b$ sposta anche la media di $b$, e gli scarti dalla media restano gli stessi. Il fattore $a$ invece resta, perché moltiplica ogni scarto. È la stessa ragione per cui $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$, solo che qui viene moltiplicato uno solo dei due fattori.

La conseguenza è che il valore della covarianza non dice quanto è forte il legame: dipende da quanto sono disperse le variabili e da come le misuriamo. Il segno, invece, non dipende dalle unità (con $a>0$), ed è un’informazione affidabile. Per avere una misura della forza del legame dobbiamo eliminare le unità di misura. È esattamente l’idea di Naworth Castle.

!!! example "Sosta di verifica"
    Due variabili $X$ e $Y$ hanno $\operatorname{Cov}(X,Y)=5$. Quanto vale la covarianza tra $X$ e $-Y$? E tra $3X+7$ e $Y$? Che cosa puoi dire, in ciascun caso, sulla tendenza delle due variabili a muoversi insieme?

    ??? esempio-svolto "Risposta"
        Con $a=-1$: $\operatorname{Cov}(X,-Y)=-5$. Cambiare il segno di una variabile scambia «grande» con «piccolo», e la tendenza a muoversi nello stesso verso diventa una tendenza a muoversi in versi opposti. Con $a=3$ e $b=7$: $\operatorname{Cov}(3X+7,\,Y)=3\cdot5=15$. Il legame è lo stesso di prima, perché abbiamo solo cambiato unità e origine di $X$, ma il numero è tre volte più grande: per questo il valore della covarianza non misura la forza del legame.

## Atto VII — Il coefficiente di correlazione {: #correlazione }

Per eliminare le unità di misura dividiamo la covarianza per le due deviazioni standard. Il risultato si chiama **coefficiente di correlazione** di $X$ e $Y$, o semplicemente **correlazione**, e si indica con la lettera greca $\rho$ («rho»):

$$
\rho(X,Y)=\frac{\operatorname{Cov}(X,Y)}{\sigma_X\,\sigma_Y}.
$$

Le unità si cancellano: al numeratore ci sono, per esempio, centimetri per centimetri, e al denominatore anche. La correlazione è un numero puro. Ma la definizione ha un significato più profondo, che è proprio l’idea di Galton. Standardizziamo le due variabili, come nella Settimana 6:

$$
Z_X=\frac{X-\mu_X}{\sigma_X},\qquad Z_Y=\frac{Y-\mu_Y}{\sigma_Y}.
$$

$Z_X$ dice di quante deviazioni standard $X$ si allontana dalla sua media, e $Z_Y$ lo stesso per $Y$: sono le deviazioni «in unità statistiche». Le variabili standardizzate hanno media zero, quindi la loro covarianza è la media del loro prodotto, e

$$
\operatorname{Cov}(Z_X,Z_Y)=\mathbb{E}\big[Z_X\,Z_Y\big]=\mathbb{E}\Big[\frac{(X-\mu_X)(Y-\mu_Y)}{\sigma_X\,\sigma_Y}\Big]=\frac{\mathbb{E}\big[(X-\mu_X)(Y-\mu_Y)\big]}{\sigma_X\,\sigma_Y}=\rho(X,Y).
$$

Nel terzo passaggio abbiamo portato fuori dal valore atteso le costanti $\sigma_X$ e $\sigma_Y$, per la linearità. La correlazione è dunque la covarianza delle deviazioni misurate in unità statistiche: ciò che Galton aveva intuito sotto la roccia di Naworth.

Applichiamola agli esempi che conosciamo. Per i due server ci servono le varianze. Con la definizione, $X$ vale 0 con probabilità 0,60 e 1 con probabilità 0,40, e la sua media è 0,40, quindi $\operatorname{Var}(X)=0{,}60\cdot(0-0{,}40)^2+0{,}40\cdot(1-0{,}40)^2=0{,}096+0{,}144=0{,}24$; per $Y$ il conto è identico. È il valore $p(1-p)$ di ogni variabile bernoulliana, qui con $p=0{,}40$. Quindi

$$
\rho(X,Y)=\frac{0{,}14}{\sqrt{0{,}24}\cdot\sqrt{0{,}24}}=\frac{0{,}14}{0{,}24}\approx0{,}58.
$$

Per i due moduli del programma calcoliamo le varianze dalle marginali, sempre con la definizione. Per $X$, che vale 0 o 1 con probabilità 0,5 e ha media 0,5, $\operatorname{Var}(X)=0{,}5\cdot0{,}25+0{,}5\cdot0{,}25=0{,}25$ e $\sigma_X=0{,}5$. Per $Y$, con media 1,05,

$$
\operatorname{Var}(Y)=0{,}40\cdot(0-1{,}05)^2+0{,}30\cdot(1-1{,}05)^2+0{,}15\cdot(2-1{,}05)^2+0{,}15\cdot(3-1{,}05)^2=0{,}441+0{,}00075+0{,}135375+0{,}570375=1{,}1475,
$$

e $\sigma_Y=\sqrt{1{,}1475}\approx1{,}071$. Quindi

$$
\rho(X,Y)=\frac{0{,}075}{0{,}5\cdot1{,}071}\approx0{,}14:
$$

i numeri di errori nei due moduli sono correlati positivamente, ma debolmente. Per le altezze di Galton, infine, con $\operatorname{Cov}\approx13{,}3\ \text{cm}^2$, $\sigma_X\approx4{,}54$ cm per i genitori medi e $\sigma_Y\approx6{,}39$ cm per i figli,

$$
\rho\approx\frac{13{,}31}{4{,}54\cdot6{,}39}\approx0{,}46,
$$

e in pollici si ottiene esattamente lo stesso numero, $2{,}062/(1{,}786\cdot2{,}517)\approx0{,}46$. Cambiando unità di misura la covarianza cambiava, la correlazione no: in generale $\rho(aX+b,\;cY+d)=\rho(X,Y)$ se $a$ e $c$ sono positivi, mentre il segno si inverte se uno dei due è negativo.

### Tra −1 e 1 {: #intervallo-rho }

La correlazione ha una proprietà che la covarianza non ha: sta sempre in un intervallo fisso,

$$
-1\le\rho(X,Y)\le1.
$$

I valori estremi hanno un significato preciso. Vale $\rho=1$ quando, e solo quando, $Y$ è una funzione lineare crescente di $X$, cioè $Y=aX+b$ con $a>0$: tutti i punti stanno su una retta che sale. Vale $\rho=-1$ quando $Y=aX+b$ con $a<0$: tutti i punti stanno su una retta che scende. Quando $\rho$ è vicino a zero, i punti non mostrano una tendenza a disporsi lungo una retta.

Verifichiamo il primo caso con un conto piccolo. Prendiamo $Y=2X+3$. Per la regola del cambio di unità dell’atto precedente, applicata alla seconda variabile (la covarianza è simmetrica, quindi la regola vale per entrambe), $\operatorname{Cov}(X,\,2X+3)=2\operatorname{Cov}(X,X)=2\operatorname{Var}(X)=2\sigma_X^2$. La deviazione standard di $Y$ è $\sigma_Y=2\sigma_X$, perché $\operatorname{Var}(2X+3)=4\operatorname{Var}(X)$. Quindi

$$
\rho(X,\,2X+3)=\frac{2\sigma_X^2}{\sigma_X\cdot2\sigma_X}=1.
$$

La dimostrazione che $\rho$ non può mai uscire dall’intervallo tra $-1$ e $1$ è nella [Lettura A](#regressione), che è facoltativa; all’esame è richiesto il fatto, con il significato dei valori estremi.

<figure markdown="0">
<svg viewBox="0 0 580 222" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Quattro nuvole di 200 punti. Con rho uguale a 0,9 i punti stanno stretti attorno a una retta che sale; con 0,5 la nuvola sale ma è più larga; con 0 è una macchia rotonda senza direzione; con meno 0,7 la nuvola scende.">
<text x="290.0" y="20.0" text-anchor="middle" fill="currentColor" font-weight="bold">Che aspetto ha ρ</text>
<rect x="20" y="40" width="122" height="122" fill="none" stroke="currentColor" opacity="0.6"/>
<g fill="#4051b5" fill-opacity="0.65"><circle cx="81.7" cy="95.9" r="2.2"/><circle cx="106.9" cy="89.7" r="2.2"/><circle cx="104.3" cy="77.5" r="2.2"/><circle cx="71.3" cy="101.5" r="2.2"/><circle cx="75.3" cy="102.2" r="2.2"/><circle cx="70.9" cy="107.9" r="2.2"/><circle cx="91.9" cy="83.3" r="2.2"/><circle cx="79.9" cy="100.6" r="2.2"/><circle cx="95.2" cy="85.4" r="2.2"/><circle cx="45.8" cy="133.7" r="2.2"/><circle cx="110.9" cy="68.9" r="2.2"/><circle cx="79.2" cy="110.5" r="2.2"/><circle cx="94.0" cy="82.7" r="2.2"/><circle cx="78.4" cy="107.5" r="2.2"/><circle cx="73.8" cy="116.6" r="2.2"/><circle cx="89.8" cy="90.0" r="2.2"/><circle cx="96.7" cy="72.8" r="2.2"/><circle cx="77.1" cy="96.5" r="2.2"/><circle cx="78.1" cy="107.9" r="2.2"/><circle cx="94.1" cy="83.4" r="2.2"/><circle cx="64.4" cy="119.7" r="2.2"/><circle cx="52.1" cy="128.0" r="2.2"/><circle cx="88.5" cy="93.5" r="2.2"/><circle cx="68.2" cy="131.8" r="2.2"/><circle cx="44.4" cy="132.4" r="2.2"/><circle cx="65.5" cy="123.5" r="2.2"/><circle cx="72.1" cy="114.8" r="2.2"/><circle cx="58.3" cy="133.7" r="2.2"/><circle cx="52.5" cy="139.2" r="2.2"/><circle cx="81.7" cy="108.2" r="2.2"/><circle cx="98.1" cy="78.7" r="2.2"/><circle cx="76.6" cy="91.2" r="2.2"/><circle cx="66.8" cy="114.0" r="2.2"/><circle cx="88.3" cy="85.3" r="2.2"/><circle cx="94.7" cy="90.9" r="2.2"/><circle cx="75.3" cy="122.0" r="2.2"/><circle cx="91.4" cy="90.4" r="2.2"/><circle cx="100.9" cy="79.4" r="2.2"/><circle cx="77.1" cy="108.1" r="2.2"/><circle cx="65.5" cy="112.4" r="2.2"/><circle cx="87.6" cy="90.3" r="2.2"/><circle cx="85.7" cy="103.9" r="2.2"/><circle cx="101.9" cy="94.4" r="2.2"/><circle cx="56.5" cy="124.9" r="2.2"/><circle cx="68.4" cy="114.1" r="2.2"/><circle cx="65.0" cy="118.3" r="2.2"/><circle cx="47.9" cy="122.5" r="2.2"/><circle cx="83.4" cy="84.5" r="2.2"/><circle cx="91.1" cy="95.4" r="2.2"/><circle cx="66.9" cy="107.9" r="2.2"/><circle cx="107.4" cy="69.4" r="2.2"/><circle cx="96.7" cy="81.0" r="2.2"/><circle cx="93.0" cy="81.5" r="2.2"/><circle cx="88.7" cy="97.3" r="2.2"/><circle cx="99.2" cy="78.5" r="2.2"/><circle cx="55.6" cy="107.0" r="2.2"/><circle cx="92.7" cy="83.8" r="2.2"/><circle cx="92.5" cy="95.8" r="2.2"/><circle cx="47.3" cy="126.3" r="2.2"/><circle cx="87.6" cy="84.6" r="2.2"/><circle cx="76.2" cy="102.2" r="2.2"/><circle cx="95.9" cy="92.3" r="2.2"/><circle cx="72.6" cy="95.7" r="2.2"/><circle cx="80.7" cy="111.7" r="2.2"/><circle cx="87.5" cy="90.9" r="2.2"/><circle cx="64.3" cy="116.2" r="2.2"/><circle cx="92.4" cy="100.6" r="2.2"/><circle cx="79.0" cy="92.7" r="2.2"/><circle cx="90.4" cy="89.7" r="2.2"/><circle cx="71.1" cy="119.6" r="2.2"/><circle cx="101.7" cy="77.4" r="2.2"/><circle cx="92.5" cy="94.2" r="2.2"/><circle cx="77.6" cy="119.9" r="2.2"/><circle cx="93.0" cy="95.9" r="2.2"/><circle cx="105.0" cy="77.2" r="2.2"/><circle cx="115.1" cy="65.0" r="2.2"/><circle cx="51.0" cy="126.6" r="2.2"/><circle cx="97.8" cy="85.5" r="2.2"/><circle cx="89.9" cy="89.1" r="2.2"/><circle cx="79.2" cy="104.4" r="2.2"/><circle cx="61.8" cy="108.5" r="2.2"/><circle cx="105.0" cy="78.2" r="2.2"/><circle cx="56.9" cy="120.2" r="2.2"/><circle cx="91.8" cy="86.8" r="2.2"/><circle cx="105.8" cy="87.4" r="2.2"/><circle cx="50.5" cy="134.3" r="2.2"/><circle cx="75.2" cy="93.5" r="2.2"/><circle cx="56.0" cy="120.7" r="2.2"/><circle cx="85.7" cy="99.2" r="2.2"/><circle cx="109.9" cy="72.2" r="2.2"/><circle cx="119.6" cy="70.3" r="2.2"/><circle cx="47.1" cy="129.2" r="2.2"/><circle cx="70.0" cy="116.4" r="2.2"/><circle cx="94.4" cy="86.6" r="2.2"/><circle cx="111.1" cy="87.0" r="2.2"/><circle cx="89.0" cy="82.7" r="2.2"/><circle cx="66.8" cy="118.1" r="2.2"/><circle cx="86.7" cy="109.0" r="2.2"/><circle cx="80.7" cy="103.1" r="2.2"/><circle cx="77.1" cy="107.6" r="2.2"/><circle cx="67.0" cy="112.3" r="2.2"/><circle cx="88.4" cy="103.9" r="2.2"/><circle cx="86.9" cy="92.4" r="2.2"/><circle cx="79.2" cy="72.5" r="2.2"/><circle cx="76.8" cy="115.4" r="2.2"/><circle cx="56.5" cy="120.2" r="2.2"/><circle cx="71.7" cy="111.9" r="2.2"/><circle cx="104.0" cy="78.7" r="2.2"/><circle cx="77.4" cy="119.3" r="2.2"/><circle cx="53.6" cy="135.3" r="2.2"/><circle cx="106.4" cy="74.3" r="2.2"/><circle cx="91.1" cy="92.2" r="2.2"/><circle cx="121.2" cy="51.2" r="2.2"/><circle cx="82.2" cy="105.8" r="2.2"/><circle cx="72.2" cy="107.5" r="2.2"/><circle cx="53.4" cy="101.6" r="2.2"/><circle cx="106.2" cy="84.6" r="2.2"/><circle cx="130.0" cy="64.4" r="2.2"/><circle cx="65.4" cy="115.4" r="2.2"/><circle cx="68.7" cy="112.5" r="2.2"/><circle cx="92.4" cy="83.8" r="2.2"/><circle cx="65.2" cy="114.2" r="2.2"/><circle cx="75.8" cy="111.9" r="2.2"/><circle cx="74.3" cy="105.2" r="2.2"/><circle cx="84.7" cy="75.8" r="2.2"/><circle cx="101.9" cy="71.6" r="2.2"/><circle cx="81.4" cy="123.7" r="2.2"/><circle cx="98.5" cy="86.4" r="2.2"/><circle cx="73.0" cy="115.5" r="2.2"/><circle cx="87.2" cy="90.2" r="2.2"/><circle cx="40.2" cy="139.1" r="2.2"/><circle cx="53.4" cy="109.8" r="2.2"/><circle cx="96.2" cy="79.6" r="2.2"/><circle cx="69.8" cy="103.7" r="2.2"/><circle cx="92.1" cy="89.5" r="2.2"/><circle cx="91.3" cy="92.0" r="2.2"/><circle cx="106.2" cy="75.5" r="2.2"/><circle cx="96.5" cy="76.3" r="2.2"/><circle cx="100.4" cy="79.1" r="2.2"/><circle cx="78.9" cy="105.8" r="2.2"/><circle cx="67.7" cy="102.4" r="2.2"/><circle cx="67.1" cy="112.0" r="2.2"/><circle cx="71.7" cy="110.0" r="2.2"/><circle cx="59.5" cy="127.0" r="2.2"/><circle cx="70.6" cy="115.1" r="2.2"/><circle cx="79.2" cy="107.9" r="2.2"/><circle cx="85.8" cy="119.9" r="2.2"/><circle cx="74.5" cy="98.4" r="2.2"/><circle cx="44.3" cy="129.3" r="2.2"/><circle cx="79.6" cy="104.0" r="2.2"/><circle cx="85.3" cy="88.4" r="2.2"/><circle cx="101.7" cy="78.8" r="2.2"/><circle cx="92.0" cy="88.0" r="2.2"/><circle cx="68.7" cy="132.6" r="2.2"/><circle cx="67.2" cy="115.4" r="2.2"/><circle cx="119.3" cy="62.1" r="2.2"/><circle cx="95.4" cy="74.6" r="2.2"/><circle cx="115.9" cy="54.3" r="2.2"/><circle cx="121.6" cy="52.6" r="2.2"/><circle cx="65.4" cy="124.7" r="2.2"/><circle cx="88.3" cy="112.7" r="2.2"/><circle cx="89.7" cy="88.4" r="2.2"/><circle cx="91.7" cy="91.2" r="2.2"/><circle cx="91.3" cy="83.7" r="2.2"/><circle cx="84.9" cy="98.6" r="2.2"/><circle cx="84.3" cy="96.2" r="2.2"/><circle cx="52.4" cy="139.2" r="2.2"/><circle cx="77.8" cy="100.1" r="2.2"/><circle cx="66.7" cy="117.5" r="2.2"/><circle cx="83.4" cy="95.9" r="2.2"/><circle cx="72.1" cy="105.2" r="2.2"/><circle cx="92.8" cy="91.4" r="2.2"/><circle cx="96.6" cy="84.3" r="2.2"/><circle cx="86.9" cy="95.8" r="2.2"/><circle cx="87.0" cy="89.3" r="2.2"/><circle cx="82.8" cy="95.2" r="2.2"/><circle cx="72.5" cy="113.2" r="2.2"/><circle cx="77.9" cy="108.7" r="2.2"/><circle cx="71.6" cy="95.0" r="2.2"/><circle cx="88.4" cy="95.2" r="2.2"/><circle cx="81.3" cy="92.5" r="2.2"/><circle cx="92.1" cy="87.8" r="2.2"/><circle cx="55.7" cy="128.5" r="2.2"/><circle cx="97.9" cy="92.0" r="2.2"/><circle cx="66.5" cy="113.1" r="2.2"/><circle cx="67.0" cy="111.5" r="2.2"/><circle cx="77.2" cy="99.3" r="2.2"/><circle cx="70.3" cy="121.2" r="2.2"/><circle cx="86.5" cy="100.9" r="2.2"/><circle cx="70.1" cy="111.6" r="2.2"/><circle cx="60.6" cy="106.0" r="2.2"/><circle cx="64.9" cy="135.1" r="2.2"/><circle cx="106.0" cy="74.8" r="2.2"/><circle cx="81.8" cy="104.7" r="2.2"/><circle cx="58.7" cy="117.4" r="2.2"/><circle cx="81.2" cy="104.9" r="2.2"/><circle cx="51.3" cy="124.7" r="2.2"/><circle cx="115.1" cy="57.3" r="2.2"/><circle cx="51.9" cy="124.2" r="2.2"/><circle cx="90.1" cy="89.2" r="2.2"/><circle cx="220.9" cy="128.7" r="2.2"/><circle cx="240.9" cy="111.9" r="2.2"/><circle cx="235.1" cy="68.7" r="2.2"/><circle cx="234.8" cy="112.9" r="2.2"/><circle cx="251.9" cy="78.5" r="2.2"/><circle cx="198.0" cy="118.6" r="2.2"/><circle cx="209.0" cy="98.5" r="2.2"/><circle cx="195.8" cy="103.6" r="2.2"/><circle cx="218.9" cy="114.8" r="2.2"/><circle cx="240.0" cy="96.3" r="2.2"/><circle cx="220.6" cy="99.6" r="2.2"/><circle cx="230.5" cy="94.4" r="2.2"/><circle cx="184.6" cy="119.7" r="2.2"/><circle cx="223.8" cy="104.8" r="2.2"/><circle cx="203.7" cy="99.3" r="2.2"/><circle cx="254.8" cy="62.3" r="2.2"/><circle cx="237.9" cy="83.6" r="2.2"/><circle cx="239.1" cy="104.2" r="2.2"/><circle cx="219.9" cy="95.0" r="2.2"/><circle cx="232.7" cy="94.1" r="2.2"/><circle cx="233.5" cy="87.1" r="2.2"/><circle cx="214.4" cy="73.8" r="2.2"/><circle cx="211.5" cy="109.3" r="2.2"/><circle cx="218.8" cy="102.3" r="2.2"/><circle cx="209.5" cy="121.4" r="2.2"/><circle cx="209.7" cy="111.4" r="2.2"/><circle cx="215.6" cy="113.1" r="2.2"/><circle cx="207.1" cy="81.5" r="2.2"/><circle cx="235.6" cy="88.7" r="2.2"/><circle cx="190.6" cy="125.7" r="2.2"/><circle cx="236.7" cy="61.3" r="2.2"/><circle cx="209.1" cy="128.9" r="2.2"/><circle cx="210.6" cy="92.0" r="2.2"/><circle cx="195.2" cy="97.1" r="2.2"/><circle cx="218.3" cy="92.9" r="2.2"/><circle cx="216.3" cy="107.7" r="2.2"/><circle cx="224.6" cy="101.3" r="2.2"/><circle cx="210.8" cy="111.8" r="2.2"/><circle cx="222.8" cy="87.1" r="2.2"/><circle cx="255.7" cy="122.1" r="2.2"/><circle cx="228.8" cy="105.5" r="2.2"/><circle cx="210.1" cy="104.0" r="2.2"/><circle cx="239.2" cy="101.5" r="2.2"/><circle cx="218.5" cy="132.2" r="2.2"/><circle cx="232.3" cy="99.3" r="2.2"/><circle cx="232.7" cy="107.6" r="2.2"/><circle cx="213.5" cy="91.5" r="2.2"/><circle cx="184.2" cy="96.3" r="2.2"/><circle cx="214.4" cy="103.2" r="2.2"/><circle cx="231.5" cy="127.7" r="2.2"/><circle cx="213.8" cy="107.9" r="2.2"/><circle cx="229.4" cy="112.1" r="2.2"/><circle cx="239.7" cy="80.4" r="2.2"/><circle cx="210.6" cy="78.3" r="2.2"/><circle cx="244.5" cy="84.0" r="2.2"/><circle cx="251.9" cy="51.9" r="2.2"/><circle cx="241.6" cy="65.7" r="2.2"/><circle cx="243.2" cy="78.4" r="2.2"/><circle cx="241.9" cy="104.7" r="2.2"/><circle cx="264.0" cy="76.1" r="2.2"/><circle cx="224.5" cy="121.3" r="2.2"/><circle cx="221.0" cy="82.0" r="2.2"/><circle cx="232.5" cy="91.3" r="2.2"/><circle cx="203.7" cy="84.9" r="2.2"/><circle cx="191.4" cy="108.9" r="2.2"/><circle cx="204.2" cy="139.2" r="2.2"/><circle cx="228.1" cy="84.4" r="2.2"/><circle cx="230.0" cy="78.8" r="2.2"/><circle cx="191.7" cy="85.8" r="2.2"/><circle cx="185.1" cy="132.6" r="2.2"/><circle cx="215.0" cy="116.8" r="2.2"/><circle cx="217.4" cy="99.3" r="2.2"/><circle cx="220.1" cy="116.5" r="2.2"/><circle cx="233.8" cy="114.9" r="2.2"/><circle cx="244.4" cy="105.0" r="2.2"/><circle cx="225.4" cy="53.7" r="2.2"/><circle cx="232.7" cy="103.4" r="2.2"/><circle cx="200.1" cy="126.1" r="2.2"/><circle cx="198.6" cy="117.7" r="2.2"/><circle cx="225.5" cy="96.9" r="2.2"/><circle cx="233.7" cy="71.6" r="2.2"/><circle cx="234.8" cy="76.7" r="2.2"/><circle cx="232.3" cy="80.6" r="2.2"/><circle cx="235.9" cy="91.1" r="2.2"/><circle cx="236.4" cy="89.0" r="2.2"/><circle cx="187.6" cy="126.6" r="2.2"/><circle cx="207.0" cy="131.2" r="2.2"/><circle cx="229.7" cy="61.3" r="2.2"/><circle cx="232.4" cy="101.2" r="2.2"/><circle cx="192.2" cy="97.0" r="2.2"/><circle cx="243.4" cy="93.4" r="2.2"/><circle cx="212.6" cy="105.1" r="2.2"/><circle cx="216.6" cy="104.2" r="2.2"/><circle cx="226.2" cy="119.5" r="2.2"/><circle cx="235.3" cy="93.6" r="2.2"/><circle cx="193.7" cy="106.8" r="2.2"/><circle cx="239.9" cy="76.3" r="2.2"/><circle cx="222.5" cy="90.6" r="2.2"/><circle cx="206.3" cy="90.0" r="2.2"/><circle cx="215.8" cy="97.3" r="2.2"/><circle cx="179.3" cy="120.4" r="2.2"/><circle cx="208.7" cy="138.2" r="2.2"/><circle cx="224.5" cy="106.7" r="2.2"/><circle cx="207.5" cy="80.7" r="2.2"/><circle cx="214.7" cy="100.7" r="2.2"/><circle cx="218.2" cy="87.8" r="2.2"/><circle cx="221.9" cy="102.6" r="2.2"/><circle cx="240.5" cy="101.0" r="2.2"/><circle cx="220.5" cy="66.0" r="2.2"/><circle cx="216.0" cy="96.2" r="2.2"/><circle cx="231.3" cy="69.8" r="2.2"/><circle cx="260.6" cy="71.1" r="2.2"/><circle cx="214.5" cy="107.8" r="2.2"/><circle cx="230.8" cy="131.8" r="2.2"/><circle cx="190.9" cy="113.2" r="2.2"/><circle cx="246.6" cy="112.7" r="2.2"/><circle cx="233.6" cy="130.0" r="2.2"/><circle cx="246.4" cy="66.5" r="2.2"/><circle cx="219.9" cy="88.3" r="2.2"/><circle cx="201.1" cy="99.0" r="2.2"/><circle cx="237.9" cy="90.4" r="2.2"/><circle cx="235.4" cy="93.1" r="2.2"/><circle cx="204.5" cy="100.9" r="2.2"/><circle cx="192.9" cy="111.1" r="2.2"/><circle cx="229.6" cy="94.2" r="2.2"/><circle cx="217.7" cy="89.1" r="2.2"/><circle cx="270.8" cy="115.4" r="2.2"/><circle cx="209.3" cy="90.8" r="2.2"/><circle cx="210.9" cy="115.2" r="2.2"/><circle cx="218.9" cy="86.7" r="2.2"/><circle cx="189.3" cy="96.3" r="2.2"/><circle cx="204.1" cy="122.2" r="2.2"/><circle cx="252.3" cy="71.1" r="2.2"/><circle cx="218.5" cy="88.3" r="2.2"/><circle cx="209.4" cy="117.6" r="2.2"/><circle cx="196.8" cy="121.2" r="2.2"/><circle cx="232.1" cy="93.0" r="2.2"/><circle cx="233.5" cy="131.1" r="2.2"/><circle cx="225.9" cy="105.6" r="2.2"/><circle cx="213.6" cy="101.3" r="2.2"/><circle cx="226.8" cy="105.2" r="2.2"/><circle cx="228.3" cy="123.6" r="2.2"/><circle cx="208.0" cy="113.8" r="2.2"/><circle cx="232.9" cy="69.8" r="2.2"/><circle cx="180.7" cy="99.1" r="2.2"/><circle cx="196.4" cy="115.1" r="2.2"/><circle cx="215.2" cy="117.1" r="2.2"/><circle cx="218.9" cy="102.2" r="2.2"/><circle cx="198.8" cy="111.7" r="2.2"/><circle cx="227.3" cy="109.0" r="2.2"/><circle cx="241.1" cy="96.4" r="2.2"/><circle cx="229.6" cy="86.3" r="2.2"/><circle cx="225.3" cy="83.3" r="2.2"/><circle cx="236.8" cy="133.3" r="2.2"/><circle cx="228.7" cy="80.9" r="2.2"/><circle cx="199.2" cy="109.6" r="2.2"/><circle cx="217.1" cy="83.9" r="2.2"/><circle cx="245.6" cy="88.9" r="2.2"/><circle cx="199.3" cy="104.5" r="2.2"/><circle cx="222.2" cy="73.2" r="2.2"/><circle cx="213.6" cy="153.7" r="2.2"/><circle cx="203.9" cy="83.2" r="2.2"/><circle cx="201.7" cy="107.4" r="2.2"/><circle cx="222.9" cy="130.1" r="2.2"/><circle cx="227.0" cy="142.0" r="2.2"/><circle cx="226.9" cy="92.8" r="2.2"/><circle cx="193.4" cy="131.7" r="2.2"/><circle cx="215.5" cy="87.1" r="2.2"/><circle cx="227.6" cy="94.1" r="2.2"/><circle cx="239.0" cy="94.1" r="2.2"/><circle cx="233.8" cy="78.1" r="2.2"/><circle cx="236.9" cy="89.8" r="2.2"/><circle cx="241.9" cy="78.2" r="2.2"/><circle cx="236.7" cy="79.4" r="2.2"/><circle cx="205.5" cy="103.4" r="2.2"/><circle cx="222.1" cy="87.4" r="2.2"/><circle cx="207.4" cy="94.7" r="2.2"/><circle cx="175.6" cy="146.3" r="2.2"/><circle cx="189.0" cy="121.5" r="2.2"/><circle cx="260.8" cy="83.1" r="2.2"/><circle cx="199.7" cy="117.9" r="2.2"/><circle cx="178.3" cy="148.6" r="2.2"/><circle cx="209.9" cy="115.9" r="2.2"/><circle cx="250.0" cy="80.9" r="2.2"/><circle cx="220.1" cy="98.2" r="2.2"/><circle cx="228.8" cy="71.9" r="2.2"/><circle cx="215.8" cy="113.6" r="2.2"/><circle cx="219.4" cy="108.9" r="2.2"/><circle cx="245.1" cy="98.4" r="2.2"/><circle cx="236.2" cy="98.6" r="2.2"/><circle cx="219.4" cy="111.8" r="2.2"/><circle cx="238.0" cy="123.4" r="2.2"/><circle cx="241.5" cy="85.0" r="2.2"/><circle cx="216.8" cy="86.7" r="2.2"/><circle cx="226.1" cy="79.9" r="2.2"/><circle cx="225.8" cy="116.5" r="2.2"/><circle cx="208.3" cy="110.5" r="2.2"/><circle cx="242.9" cy="59.5" r="2.2"/><circle cx="217.8" cy="104.4" r="2.2"/><circle cx="209.2" cy="101.1" r="2.2"/><circle cx="395.8" cy="99.3" r="2.2"/><circle cx="302.3" cy="115.4" r="2.2"/><circle cx="379.3" cy="125.5" r="2.2"/><circle cx="362.3" cy="103.2" r="2.2"/><circle cx="386.1" cy="104.0" r="2.2"/><circle cx="368.4" cy="111.7" r="2.2"/><circle cx="395.8" cy="105.7" r="2.2"/><circle cx="361.6" cy="115.5" r="2.2"/><circle cx="351.2" cy="66.6" r="2.2"/><circle cx="372.1" cy="146.1" r="2.2"/><circle cx="369.2" cy="98.7" r="2.2"/><circle cx="354.2" cy="120.3" r="2.2"/><circle cx="356.3" cy="87.5" r="2.2"/><circle cx="374.7" cy="105.5" r="2.2"/><circle cx="374.4" cy="94.0" r="2.2"/><circle cx="351.6" cy="90.9" r="2.2"/><circle cx="354.0" cy="97.1" r="2.2"/><circle cx="326.6" cy="82.1" r="2.2"/><circle cx="393.0" cy="127.5" r="2.2"/><circle cx="356.7" cy="82.9" r="2.2"/><circle cx="386.5" cy="105.2" r="2.2"/><circle cx="369.0" cy="93.7" r="2.2"/><circle cx="398.1" cy="71.3" r="2.2"/><circle cx="390.3" cy="79.6" r="2.2"/><circle cx="367.1" cy="63.2" r="2.2"/><circle cx="389.2" cy="143.9" r="2.2"/><circle cx="342.9" cy="119.2" r="2.2"/><circle cx="385.0" cy="82.6" r="2.2"/><circle cx="332.8" cy="122.6" r="2.2"/><circle cx="367.5" cy="104.5" r="2.2"/><circle cx="381.3" cy="68.4" r="2.2"/><circle cx="365.3" cy="84.3" r="2.2"/><circle cx="354.0" cy="119.3" r="2.2"/><circle cx="345.6" cy="92.3" r="2.2"/><circle cx="354.5" cy="88.7" r="2.2"/><circle cx="381.0" cy="99.7" r="2.2"/><circle cx="378.0" cy="102.9" r="2.2"/><circle cx="356.0" cy="98.3" r="2.2"/><circle cx="337.2" cy="129.6" r="2.2"/><circle cx="373.8" cy="98.6" r="2.2"/><circle cx="333.4" cy="119.4" r="2.2"/><circle cx="350.9" cy="93.5" r="2.2"/><circle cx="347.0" cy="92.8" r="2.2"/><circle cx="375.2" cy="118.0" r="2.2"/><circle cx="365.5" cy="89.3" r="2.2"/><circle cx="369.8" cy="94.2" r="2.2"/><circle cx="366.2" cy="101.8" r="2.2"/><circle cx="348.1" cy="87.2" r="2.2"/><circle cx="371.2" cy="107.0" r="2.2"/><circle cx="387.9" cy="106.4" r="2.2"/><circle cx="360.3" cy="99.5" r="2.2"/><circle cx="373.1" cy="102.1" r="2.2"/><circle cx="358.6" cy="79.2" r="2.2"/><circle cx="380.6" cy="146.3" r="2.2"/><circle cx="373.7" cy="106.9" r="2.2"/><circle cx="377.7" cy="139.4" r="2.2"/><circle cx="367.6" cy="111.0" r="2.2"/><circle cx="392.3" cy="96.6" r="2.2"/><circle cx="354.1" cy="101.4" r="2.2"/><circle cx="354.6" cy="83.1" r="2.2"/><circle cx="349.7" cy="95.5" r="2.2"/><circle cx="372.6" cy="153.9" r="2.2"/><circle cx="349.1" cy="123.1" r="2.2"/><circle cx="348.7" cy="72.1" r="2.2"/><circle cx="374.9" cy="72.1" r="2.2"/><circle cx="383.2" cy="100.0" r="2.2"/><circle cx="371.9" cy="131.5" r="2.2"/><circle cx="309.9" cy="60.6" r="2.2"/><circle cx="342.8" cy="142.0" r="2.2"/><circle cx="340.5" cy="96.2" r="2.2"/><circle cx="338.0" cy="103.1" r="2.2"/><circle cx="353.2" cy="97.6" r="2.2"/><circle cx="395.6" cy="124.7" r="2.2"/><circle cx="355.1" cy="110.0" r="2.2"/><circle cx="347.0" cy="81.9" r="2.2"/><circle cx="374.3" cy="111.8" r="2.2"/><circle cx="362.3" cy="128.9" r="2.2"/><circle cx="363.3" cy="102.8" r="2.2"/><circle cx="347.9" cy="100.9" r="2.2"/><circle cx="361.0" cy="105.2" r="2.2"/><circle cx="369.3" cy="117.7" r="2.2"/><circle cx="324.6" cy="92.3" r="2.2"/><circle cx="330.3" cy="105.1" r="2.2"/><circle cx="381.7" cy="125.1" r="2.2"/><circle cx="377.1" cy="98.5" r="2.2"/><circle cx="351.3" cy="103.2" r="2.2"/><circle cx="341.6" cy="99.9" r="2.2"/><circle cx="357.5" cy="135.2" r="2.2"/><circle cx="338.2" cy="117.4" r="2.2"/><circle cx="354.5" cy="93.9" r="2.2"/><circle cx="392.5" cy="84.8" r="2.2"/><circle cx="363.5" cy="95.9" r="2.2"/><circle cx="383.2" cy="99.4" r="2.2"/><circle cx="356.8" cy="88.5" r="2.2"/><circle cx="368.0" cy="83.5" r="2.2"/><circle cx="387.4" cy="68.4" r="2.2"/><circle cx="335.5" cy="93.1" r="2.2"/><circle cx="354.4" cy="112.8" r="2.2"/><circle cx="358.0" cy="92.7" r="2.2"/><circle cx="366.4" cy="139.0" r="2.2"/><circle cx="390.6" cy="100.6" r="2.2"/><circle cx="374.1" cy="110.1" r="2.2"/><circle cx="332.5" cy="102.0" r="2.2"/><circle cx="355.8" cy="92.1" r="2.2"/><circle cx="344.0" cy="100.5" r="2.2"/><circle cx="343.5" cy="129.1" r="2.2"/><circle cx="399.6" cy="108.2" r="2.2"/><circle cx="340.7" cy="116.6" r="2.2"/><circle cx="365.5" cy="101.7" r="2.2"/><circle cx="347.4" cy="94.4" r="2.2"/><circle cx="377.4" cy="119.6" r="2.2"/><circle cx="367.7" cy="87.2" r="2.2"/><circle cx="363.4" cy="76.3" r="2.2"/><circle cx="359.5" cy="106.3" r="2.2"/><circle cx="382.7" cy="87.2" r="2.2"/><circle cx="343.2" cy="129.4" r="2.2"/><circle cx="347.1" cy="111.4" r="2.2"/><circle cx="339.7" cy="82.7" r="2.2"/><circle cx="386.4" cy="134.8" r="2.2"/><circle cx="355.4" cy="110.8" r="2.2"/><circle cx="341.2" cy="118.2" r="2.2"/><circle cx="353.0" cy="79.2" r="2.2"/><circle cx="408.6" cy="79.3" r="2.2"/><circle cx="359.0" cy="113.0" r="2.2"/><circle cx="377.2" cy="98.7" r="2.2"/><circle cx="369.9" cy="150.9" r="2.2"/><circle cx="360.8" cy="84.9" r="2.2"/><circle cx="347.8" cy="94.4" r="2.2"/><circle cx="354.6" cy="75.8" r="2.2"/><circle cx="354.2" cy="146.6" r="2.2"/><circle cx="318.9" cy="94.5" r="2.2"/><circle cx="410.4" cy="107.8" r="2.2"/><circle cx="378.6" cy="150.9" r="2.2"/><circle cx="363.2" cy="114.3" r="2.2"/><circle cx="357.1" cy="102.6" r="2.2"/><circle cx="345.9" cy="85.8" r="2.2"/><circle cx="379.1" cy="97.4" r="2.2"/><circle cx="357.4" cy="111.0" r="2.2"/><circle cx="370.1" cy="92.6" r="2.2"/><circle cx="334.6" cy="103.2" r="2.2"/><circle cx="368.2" cy="113.5" r="2.2"/><circle cx="399.1" cy="120.6" r="2.2"/><circle cx="355.5" cy="98.3" r="2.2"/><circle cx="376.2" cy="98.1" r="2.2"/><circle cx="361.7" cy="66.0" r="2.2"/><circle cx="382.1" cy="109.7" r="2.2"/><circle cx="381.3" cy="70.5" r="2.2"/><circle cx="362.2" cy="94.4" r="2.2"/><circle cx="350.3" cy="78.6" r="2.2"/><circle cx="366.5" cy="118.4" r="2.2"/><circle cx="361.8" cy="117.7" r="2.2"/><circle cx="349.2" cy="107.0" r="2.2"/><circle cx="369.7" cy="84.0" r="2.2"/><circle cx="369.2" cy="97.7" r="2.2"/><circle cx="344.1" cy="86.7" r="2.2"/><circle cx="358.9" cy="95.0" r="2.2"/><circle cx="416.7" cy="81.4" r="2.2"/><circle cx="376.6" cy="97.2" r="2.2"/><circle cx="362.9" cy="111.0" r="2.2"/><circle cx="408.9" cy="91.2" r="2.2"/><circle cx="352.3" cy="99.3" r="2.2"/><circle cx="313.8" cy="67.7" r="2.2"/><circle cx="324.6" cy="104.0" r="2.2"/><circle cx="332.0" cy="98.9" r="2.2"/><circle cx="366.0" cy="106.8" r="2.2"/><circle cx="379.6" cy="79.0" r="2.2"/><circle cx="319.6" cy="84.3" r="2.2"/><circle cx="382.3" cy="88.6" r="2.2"/><circle cx="337.6" cy="124.8" r="2.2"/><circle cx="365.9" cy="129.9" r="2.2"/><circle cx="369.8" cy="96.0" r="2.2"/><circle cx="369.2" cy="87.2" r="2.2"/><circle cx="361.1" cy="72.8" r="2.2"/><circle cx="364.3" cy="135.2" r="2.2"/><circle cx="339.3" cy="104.2" r="2.2"/><circle cx="366.3" cy="133.2" r="2.2"/><circle cx="379.7" cy="119.3" r="2.2"/><circle cx="378.7" cy="105.2" r="2.2"/><circle cx="410.8" cy="82.6" r="2.2"/><circle cx="381.6" cy="111.0" r="2.2"/><circle cx="374.8" cy="114.7" r="2.2"/><circle cx="392.7" cy="107.1" r="2.2"/><circle cx="365.6" cy="77.0" r="2.2"/><circle cx="336.4" cy="54.9" r="2.2"/><circle cx="318.3" cy="130.4" r="2.2"/><circle cx="385.3" cy="106.2" r="2.2"/><circle cx="371.8" cy="109.2" r="2.2"/><circle cx="377.2" cy="78.7" r="2.2"/><circle cx="354.7" cy="92.7" r="2.2"/><circle cx="367.6" cy="71.6" r="2.2"/><circle cx="396.9" cy="120.3" r="2.2"/><circle cx="367.4" cy="100.7" r="2.2"/><circle cx="339.7" cy="109.7" r="2.2"/><circle cx="352.8" cy="121.9" r="2.2"/><circle cx="387.4" cy="104.0" r="2.2"/><circle cx="340.2" cy="123.6" r="2.2"/><circle cx="311.8" cy="59.6" r="2.2"/><circle cx="317.3" cy="93.0" r="2.2"/><circle cx="335.5" cy="120.4" r="2.2"/><circle cx="376.2" cy="112.6" r="2.2"/><circle cx="514.3" cy="114.2" r="2.2"/><circle cx="482.3" cy="56.6" r="2.2"/><circle cx="471.0" cy="79.6" r="2.2"/><circle cx="445.2" cy="78.5" r="2.2"/><circle cx="494.3" cy="124.0" r="2.2"/><circle cx="524.8" cy="119.6" r="2.2"/><circle cx="501.6" cy="97.1" r="2.2"/><circle cx="510.8" cy="115.8" r="2.2"/><circle cx="520.5" cy="109.7" r="2.2"/><circle cx="484.2" cy="73.0" r="2.2"/><circle cx="551.6" cy="137.2" r="2.2"/><circle cx="484.3" cy="77.8" r="2.2"/><circle cx="508.1" cy="83.3" r="2.2"/><circle cx="553.2" cy="130.8" r="2.2"/><circle cx="498.8" cy="107.4" r="2.2"/><circle cx="503.2" cy="96.6" r="2.2"/><circle cx="491.2" cy="86.9" r="2.2"/><circle cx="507.4" cy="76.4" r="2.2"/><circle cx="460.5" cy="78.5" r="2.2"/><circle cx="488.7" cy="113.5" r="2.2"/><circle cx="533.3" cy="119.5" r="2.2"/><circle cx="505.0" cy="99.4" r="2.2"/><circle cx="496.4" cy="103.5" r="2.2"/><circle cx="508.1" cy="98.3" r="2.2"/><circle cx="508.9" cy="102.2" r="2.2"/><circle cx="503.9" cy="86.5" r="2.2"/><circle cx="512.0" cy="120.1" r="2.2"/><circle cx="469.4" cy="88.4" r="2.2"/><circle cx="512.3" cy="109.2" r="2.2"/><circle cx="488.2" cy="98.9" r="2.2"/><circle cx="516.0" cy="94.2" r="2.2"/><circle cx="500.6" cy="92.8" r="2.2"/><circle cx="482.0" cy="88.0" r="2.2"/><circle cx="499.6" cy="79.2" r="2.2"/><circle cx="481.8" cy="80.7" r="2.2"/><circle cx="520.3" cy="100.9" r="2.2"/><circle cx="500.5" cy="89.7" r="2.2"/><circle cx="517.3" cy="114.4" r="2.2"/><circle cx="479.7" cy="88.0" r="2.2"/><circle cx="531.9" cy="122.5" r="2.2"/><circle cx="495.3" cy="111.8" r="2.2"/><circle cx="527.0" cy="123.9" r="2.2"/><circle cx="517.3" cy="100.8" r="2.2"/><circle cx="480.0" cy="82.1" r="2.2"/><circle cx="507.2" cy="118.2" r="2.2"/><circle cx="490.7" cy="61.6" r="2.2"/><circle cx="508.8" cy="120.5" r="2.2"/><circle cx="528.3" cy="111.6" r="2.2"/><circle cx="514.1" cy="100.3" r="2.2"/><circle cx="521.4" cy="97.9" r="2.2"/><circle cx="478.7" cy="97.1" r="2.2"/><circle cx="504.9" cy="103.4" r="2.2"/><circle cx="507.8" cy="108.4" r="2.2"/><circle cx="521.8" cy="99.9" r="2.2"/><circle cx="489.2" cy="87.4" r="2.2"/><circle cx="511.8" cy="102.8" r="2.2"/><circle cx="509.2" cy="99.2" r="2.2"/><circle cx="471.9" cy="53.8" r="2.2"/><circle cx="481.2" cy="77.7" r="2.2"/><circle cx="509.5" cy="94.6" r="2.2"/><circle cx="478.6" cy="97.6" r="2.2"/><circle cx="477.6" cy="74.8" r="2.2"/><circle cx="518.1" cy="129.5" r="2.2"/><circle cx="506.4" cy="91.4" r="2.2"/><circle cx="496.5" cy="95.3" r="2.2"/><circle cx="503.0" cy="113.8" r="2.2"/><circle cx="493.3" cy="110.6" r="2.2"/><circle cx="490.8" cy="94.4" r="2.2"/><circle cx="492.2" cy="92.4" r="2.2"/><circle cx="508.4" cy="113.0" r="2.2"/><circle cx="526.2" cy="122.3" r="2.2"/><circle cx="492.0" cy="98.1" r="2.2"/><circle cx="499.7" cy="106.4" r="2.2"/><circle cx="496.8" cy="99.8" r="2.2"/><circle cx="477.0" cy="79.6" r="2.2"/><circle cx="505.8" cy="85.7" r="2.2"/><circle cx="517.5" cy="102.9" r="2.2"/><circle cx="484.9" cy="96.4" r="2.2"/><circle cx="516.9" cy="89.0" r="2.2"/><circle cx="490.1" cy="76.1" r="2.2"/><circle cx="522.9" cy="118.6" r="2.2"/><circle cx="524.2" cy="102.1" r="2.2"/><circle cx="493.7" cy="101.9" r="2.2"/><circle cx="462.9" cy="83.2" r="2.2"/><circle cx="494.4" cy="104.8" r="2.2"/><circle cx="474.5" cy="59.0" r="2.2"/><circle cx="475.9" cy="80.1" r="2.2"/><circle cx="496.2" cy="91.9" r="2.2"/><circle cx="526.9" cy="116.7" r="2.2"/><circle cx="499.2" cy="103.7" r="2.2"/><circle cx="496.8" cy="89.9" r="2.2"/><circle cx="465.7" cy="65.5" r="2.2"/><circle cx="489.4" cy="64.6" r="2.2"/><circle cx="474.4" cy="92.2" r="2.2"/><circle cx="510.9" cy="85.4" r="2.2"/><circle cx="490.9" cy="83.1" r="2.2"/><circle cx="500.2" cy="122.1" r="2.2"/><circle cx="500.7" cy="85.7" r="2.2"/><circle cx="497.4" cy="74.7" r="2.2"/><circle cx="519.2" cy="97.0" r="2.2"/><circle cx="510.3" cy="102.3" r="2.2"/><circle cx="494.9" cy="92.7" r="2.2"/><circle cx="503.9" cy="128.1" r="2.2"/><circle cx="511.5" cy="102.1" r="2.2"/><circle cx="527.1" cy="114.9" r="2.2"/><circle cx="503.5" cy="113.5" r="2.2"/><circle cx="528.6" cy="115.7" r="2.2"/><circle cx="489.7" cy="100.2" r="2.2"/><circle cx="496.5" cy="65.3" r="2.2"/><circle cx="472.7" cy="95.9" r="2.2"/><circle cx="516.7" cy="122.5" r="2.2"/><circle cx="481.3" cy="114.9" r="2.2"/><circle cx="481.3" cy="91.1" r="2.2"/><circle cx="517.1" cy="109.2" r="2.2"/><circle cx="490.8" cy="92.4" r="2.2"/><circle cx="486.6" cy="98.4" r="2.2"/><circle cx="519.2" cy="100.6" r="2.2"/><circle cx="497.5" cy="94.1" r="2.2"/><circle cx="518.5" cy="96.0" r="2.2"/><circle cx="493.3" cy="96.0" r="2.2"/><circle cx="514.9" cy="133.5" r="2.2"/><circle cx="521.6" cy="116.3" r="2.2"/><circle cx="502.6" cy="114.8" r="2.2"/><circle cx="535.3" cy="112.8" r="2.2"/><circle cx="493.4" cy="103.1" r="2.2"/><circle cx="497.0" cy="100.7" r="2.2"/><circle cx="502.5" cy="101.5" r="2.2"/><circle cx="520.2" cy="134.4" r="2.2"/><circle cx="495.5" cy="101.7" r="2.2"/><circle cx="492.7" cy="82.7" r="2.2"/><circle cx="505.8" cy="111.5" r="2.2"/><circle cx="524.8" cy="119.4" r="2.2"/><circle cx="493.1" cy="92.7" r="2.2"/><circle cx="476.6" cy="92.6" r="2.2"/><circle cx="498.5" cy="102.8" r="2.2"/><circle cx="512.9" cy="102.9" r="2.2"/><circle cx="490.7" cy="98.5" r="2.2"/><circle cx="503.4" cy="101.6" r="2.2"/><circle cx="465.4" cy="77.7" r="2.2"/><circle cx="501.4" cy="115.2" r="2.2"/><circle cx="503.0" cy="119.7" r="2.2"/><circle cx="512.9" cy="82.1" r="2.2"/><circle cx="506.9" cy="86.2" r="2.2"/><circle cx="515.7" cy="112.7" r="2.2"/><circle cx="482.0" cy="74.6" r="2.2"/><circle cx="513.6" cy="94.6" r="2.2"/><circle cx="469.5" cy="65.7" r="2.2"/><circle cx="489.6" cy="97.8" r="2.2"/><circle cx="522.1" cy="135.0" r="2.2"/><circle cx="517.2" cy="129.3" r="2.2"/><circle cx="465.7" cy="79.3" r="2.2"/><circle cx="512.2" cy="90.3" r="2.2"/><circle cx="492.8" cy="73.8" r="2.2"/><circle cx="486.2" cy="93.6" r="2.2"/><circle cx="504.9" cy="108.0" r="2.2"/><circle cx="503.5" cy="86.1" r="2.2"/><circle cx="527.6" cy="91.3" r="2.2"/><circle cx="473.5" cy="94.0" r="2.2"/><circle cx="492.8" cy="88.6" r="2.2"/><circle cx="498.3" cy="96.8" r="2.2"/><circle cx="465.9" cy="80.5" r="2.2"/><circle cx="523.4" cy="120.6" r="2.2"/><circle cx="534.5" cy="128.6" r="2.2"/><circle cx="489.1" cy="92.4" r="2.2"/><circle cx="508.3" cy="126.6" r="2.2"/><circle cx="495.9" cy="97.1" r="2.2"/><circle cx="506.2" cy="93.5" r="2.2"/><circle cx="488.1" cy="81.4" r="2.2"/><circle cx="516.9" cy="101.0" r="2.2"/><circle cx="478.8" cy="80.6" r="2.2"/><circle cx="527.0" cy="116.2" r="2.2"/><circle cx="507.8" cy="78.9" r="2.2"/><circle cx="547.2" cy="135.4" r="2.2"/><circle cx="469.5" cy="76.4" r="2.2"/><circle cx="499.2" cy="82.4" r="2.2"/><circle cx="476.5" cy="82.9" r="2.2"/><circle cx="498.3" cy="116.3" r="2.2"/><circle cx="509.3" cy="113.9" r="2.2"/><circle cx="483.5" cy="94.1" r="2.2"/><circle cx="473.6" cy="83.5" r="2.2"/><circle cx="468.0" cy="83.5" r="2.2"/><circle cx="505.2" cy="90.1" r="2.2"/><circle cx="525.3" cy="108.0" r="2.2"/><circle cx="523.3" cy="109.6" r="2.2"/><circle cx="501.6" cy="106.4" r="2.2"/><circle cx="482.7" cy="73.8" r="2.2"/><circle cx="494.1" cy="82.2" r="2.2"/><circle cx="472.3" cy="50.7" r="2.2"/><circle cx="471.0" cy="87.7" r="2.2"/><circle cx="521.3" cy="116.2" r="2.2"/><circle cx="495.7" cy="78.0" r="2.2"/><circle cx="507.0" cy="119.3" r="2.2"/><circle cx="495.8" cy="93.2" r="2.2"/><circle cx="526.3" cy="115.1" r="2.2"/><circle cx="528.4" cy="118.8" r="2.2"/><circle cx="486.2" cy="102.8" r="2.2"/><circle cx="494.0" cy="95.0" r="2.2"/><circle cx="488.1" cy="111.5" r="2.2"/><circle cx="526.1" cy="101.8" r="2.2"/><circle cx="524.8" cy="123.6" r="2.2"/></g>
<text x="81.0" y="180.0" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">ρ = 0,9</text>
<rect x="160" y="40" width="122" height="122" fill="none" stroke="currentColor" opacity="0.6"/>
<text x="221.0" y="180.0" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">ρ = 0,5</text>
<rect x="300" y="40" width="122" height="122" fill="none" stroke="currentColor" opacity="0.6"/>
<text x="361.0" y="180.0" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">ρ = 0,0</text>
<rect x="440" y="40" width="122" height="122" fill="none" stroke="currentColor" opacity="0.6"/>
<text x="501.0" y="180.0" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">ρ = -0,7</text>
<text x="290.0" y="210.0" text-anchor="middle" fill="currentColor" font-size="12">Più ρ è vicino a ±1, più la nuvola si stringe attorno a una retta; il segno dice se sale o scende.</text>
</svg>
<figcaption>Nuvole di punti simulate con quattro valori di ρ. La correlazione misura quanto i punti si dispongono attorno a una retta, e se la retta sale (ρ positivo) o scende (ρ negativo).</figcaption>
</figure>

Tra gli estremi, il valore di $\rho$ descrive quanto la nuvola di punti è stretta attorno a una retta. Con $\rho=0{,}9$ i punti formano un sigaro sottile; con $\rho=0{,}5$ la nuvola sale ancora, ma è larga; con $\rho=0$ non ha nessuna direzione; con un valore negativo scende. Non esistono soglie universali per dire quando una correlazione è «forte»: dipende dal campo. Come orientamento, un valore attorno a 0,1 o 0,2 indica un legame debole, uno attorno a 0,5 un legame moderato e uno oltre 0,8 un legame forte. Attenzione anche a una lettura sbagliata frequente: $\rho=0{,}5$ non vuol dire che «metà dei punti» segue la retta, né che una variabile spieghi il 50% dell’altra. È un numero su una scala, non una percentuale.

!!! example "Sosta di verifica"
    Due variabili hanno $\sigma_X=2$, $\sigma_Y=5$ e $\operatorname{Cov}(X,Y)=-6$. Quanto vale la correlazione, e che cosa dice? Un collega sostiene di aver misurato, per le stesse due variabili, una covarianza di 12: è possibile?

    ??? esempio-svolto "Risposta"
        $\rho=-6/(2\cdot5)=-0{,}6$: un legame lineare moderato e negativo, cioè a valori di $X$ sopra la media tendono a corrispondere valori di $Y$ sotto la media. Una covarianza di 12 non è possibile: darebbe $\rho=12/10=1{,}2$, fuori dall’intervallo tra $-1$ e $1$. In generale la covarianza non può superare, in valore assoluto, il prodotto $\sigma_X\sigma_Y$, qui uguale a 10.

### La correlazione calcolata dai dati {: #correlazione-dati }

Finora abbiamo calcolato covarianza e correlazione a partire da una distribuzione di probabilità. Galton, invece, aveva dei dati: 928 coppie di altezze. Come si passa dall’una agli altri? Esattamente come abbiamo fatto con il marketing nell’Atto III: si usano le frequenze dei dati al posto delle probabilità. Se abbiamo $n$ coppie $(x_1,y_1),(x_2,y_2),\dots,(x_n,y_n)$, ciascuna pesa $1/n$, e le formule diventano medie aritmetiche. Le medie sono $\bar x=\frac1n\sum_i x_i$ e $\bar y=\frac1n\sum_i y_i$, la covarianza dei dati è

$$
\frac1n\sum_{i=1}^{n}(x_i-\bar x)(y_i-\bar y),
$$

e la correlazione dei dati, che di solito si indica con la lettera $r$, è

$$
r=\frac{\sum_{i}(x_i-\bar x)(y_i-\bar y)}{\sqrt{\sum_{i}(x_i-\bar x)^2}\;\sqrt{\sum_{i}(y_i-\bar y)^2}}.
$$

Nella formula di $r$ il fattore $1/n$ non compare più, perché c’era sia al numeratore, nella covarianza, sia al denominatore, nelle due deviazioni standard, e si è semplificato. Per la stessa ragione, se un programma calcola covarianza e varianze dividendo per $n-1$ invece che per $n$, come fanno molte librerie, il valore di $r$ non cambia.

Facciamo un esempio piccolo, con numeri inventati per l’occasione. Misuriamo il carico della CPU di quattro server, in percentuale, e il loro tempo di risposta medio, in millisecondi: (20, 100), (40, 140), (60, 150), (80, 210). Le medie sono $\bar x=50$ e $\bar y=150$. Gli scarti di $x$ sono $-30$, $-10$, $10$, $30$; quelli di $y$ sono $-50$, $-10$, $0$, $60$. I prodotti degli scarti sono $1500$, $100$, $0$ e $1800$, con somma $3400$. Le somme dei quadrati degli scarti sono $900+100+100+900=2000$ per $x$ e $2500+100+0+3600=6200$ per $y$. Quindi

$$
r=\frac{3400}{\sqrt{2000}\cdot\sqrt{6200}}=\frac{3400}{\sqrt{12\,400\,000}}\approx\frac{3400}{3521}\approx0{,}97.
$$

Una correlazione molto alta: i quattro punti stanno quasi su una retta che sale. La covarianza dei dati è $3400/4=850$, misurata in punti percentuali moltiplicati per millisecondi: un numero che, da solo, non dice niente sulla forza del legame.

Con i dati di Galton lo stesso conto, fatto dallo script del laboratorio qui sotto, dà $r\approx0{,}46$: una correlazione positiva moderata. Le altezze dei figli seguono quelle dei genitori, ma con molta variabilità attorno alla tendenza, come si vede dalla nuvola larga della figura dei quadranti.

#### Esplora: la nuvola e il suo ρ {: #widget-nuvola }

Il widget disegna 200 punti generati con un valore di $\rho$ che scegli tu, e colora ciascuno secondo il segno del prodotto dei suoi scarti, come nella figura dei quadranti: blu se positivo, arancione se negativo. Sotto il grafico trovi il valore di $r$ calcolato sui 200 punti, la covarianza e la percentuale di punti blu. Prima di muovere il cursore, prevedi: che cosa succede alla nuvola e ai colori quando $\rho$ si avvicina a 1? E a $-1$? Poi prova il menu «unità di Y», che moltiplica tutti i valori di $Y$ per 10 o per 100, come un cambio di unità di misura: guarda che cosa succede alla covarianza e che cosa succede a $r$. Infine, la casella «forma a U» la useremo nell’atto successivo.

<div class="s07-box" id="s07-nuvola">
  <label>ρ del modello: <input type="range" id="s07-rho" min="-1" max="1" step="0.05" value="0.5"> <b id="s07-rhov">0,50</b></label>
  <label>unità di Y: <select id="s07-k"><option value="1">× 1</option><option value="10">× 10</option><option value="100">× 100</option></select></label>
  <label><input type="checkbox" id="s07-u"> forma a U</label>
  <svg class="s07-svg" id="s07-svg" viewBox="0 0 400 400" role="img" aria-label="Nuvola di 200 punti con le due medie tratteggiate; i punti sono blu se il prodotto degli scarti è positivo, arancioni se è negativo."></svg>
  <div class="s07-out" id="s07-nout"></div>
</div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  // 200 coppie normali standard indipendenti, sempre le stesse (seme fisso).
  var seed = 9;
  function rnd() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
  var n = 200, z1 = [], z2 = [];
  for (var i = 0; i < n; i++) {
    var u = rnd() || 1e-12, v = rnd(), rr = Math.sqrt(-2 * Math.log(u));
    z1.push(rr * Math.cos(2 * Math.PI * v)); z2.push(rr * Math.sin(2 * Math.PI * v));
  }
  var srho = document.getElementById('s07-rho'), sk = document.getElementById('s07-k');
  var su = document.getElementById('s07-u'), svg = document.getElementById('s07-svg'), out = document.getElementById('s07-nout');
  function f(v, d) { return v.toFixed(d).replace('.', ',').replace('-', '−'); }
  function render() {
    var rho = +srho.value, k = +sk.value, U = su.checked;
    srho.disabled = U;
    document.getElementById('s07-rhov').textContent = f(rho, 2);
    var xs = [], ys = [], i;
    for (i = 0; i < n; i++) {
      // Nella forma a U i valori di X sono simmetrici attorno a zero (metà sono i negativi dell'altra metà).
      var x = U ? (i < n / 2 ? z1[i] : -z1[i - n / 2]) : z1[i];
      var y = U ? (x * x - 1 + 0.25 * z2[i]) : (rho * x + Math.sqrt(Math.max(0, 1 - rho * rho)) * z2[i]);
      xs.push(x); ys.push(k * y);
    }
    var mx = 0, my = 0;
    for (i = 0; i < n; i++) { mx += xs[i]; my += ys[i]; }
    mx /= n; my /= n;
    var sxy = 0, sxx = 0, syy = 0;
    for (i = 0; i < n; i++) { var dx = xs[i] - mx, dy = ys[i] - my; sxy += dx * dy; sxx += dx * dx; syy += dy * dy; }
    var cov = sxy / n, r = sxy / Math.sqrt(sxx * syy);
    var xmin = -3.6, xmax = 3.6, ymin = Math.min.apply(null, ys), ymax = Math.max.apply(null, ys);
    var pad = 0.06 * (ymax - ymin); ymin -= pad; ymax += pad;
    function sx(x) { return 50 + (x - xmin) / (xmax - xmin) * 330; }
    function sy(y) { return 360 - (y - ymin) / (ymax - ymin) * 330; }
    var h = '<rect x="50" y="30" width="330" height="330" fill="none" stroke="currentColor" stroke-opacity="0.5"/>';
    h += '<line x1="' + sx(mx).toFixed(1) + '" y1="30" x2="' + sx(mx).toFixed(1) + '" y2="360" stroke="currentColor" stroke-dasharray="5 4"/>';
    h += '<line x1="50" y1="' + sy(my).toFixed(1) + '" x2="380" y2="' + sy(my).toFixed(1) + '" stroke="currentColor" stroke-dasharray="5 4"/>';
    var pos = 0;
    for (i = 0; i < n; i++) {
      var p = (xs[i] - mx) * (ys[i] - my) > 0; if (p) pos++;
      h += '<circle cx="' + sx(xs[i]).toFixed(1) + '" cy="' + sy(ys[i]).toFixed(1) + '" r="3.3" fill="' + (p ? '#4051b5' : '#e07a1f') + '" fill-opacity="0.75"/>';
    }
    h += '<text x="215" y="388" text-anchor="middle" fill="currentColor">X</text>';
    h += '<text x="44" y="38" text-anchor="end" fill="currentColor" font-size="11">' + f(ymax, 1) + '</text>';
    h += '<text x="44" y="360" text-anchor="end" fill="currentColor" font-size="11">' + f(ymin, 1) + '</text>';
    h += '<text x="20" y="200" text-anchor="middle" fill="currentColor" transform="rotate(-90 20 200)">Y</text>';
    svg.innerHTML = h;
    out.innerHTML = 'r calcolato sui 200 punti: <b>' + f(r, 2) + '</b> · Cov = <b>' + f(cov, k > 1 ? 1 : 2) + '</b> · punti blu: <b>' + Math.round(100 * pos / n) + '%</b>' +
      (k > 1 ? '<br>Y è moltiplicata per ' + k + ': la covarianza è ' + k + ' volte quella con Y × 1, mentre r non cambia.' : '') +
      (U ? '<br>Forma a U: Y dipende quasi completamente da X, eppure r è vicino a zero.' : '');
  }
  [srho, sk, su].forEach(function (s) { s.addEventListener('input', render); s.addEventListener('change', render); });
  render();
});
</script>

Con $\rho=1$ tutti i punti cadono su una retta che sale e sono tutti blu; con $\rho=-1$ su una retta che scende e sono tutti arancioni; con $\rho=0$ i colori si dividono più o meno a metà. Nota anche che il valore di $r$ calcolato sui punti non coincide esattamente con il $\rho$ scelto: 200 punti sono un campione finito, e la correlazione dei dati oscilla attorno a quella del modello, come la media dei dati oscillava attorno alla media teorica. Quando moltiplichi $Y$ per 100, la nuvola resta identica, cambia solo la scala dell’asse verticale: la covarianza diventa cento volte più grande, $r$ resta uguale.

### Laboratorio: la tabella di Galton {: #lab-galton }

Il secondo script riparte dalla tabella originale di Galton, con le altezze in pollici: una matrice con una riga per ogni classe di altezza del genitore medio e una colonna per ogni classe di altezza del figlio, che contiene il numero di figli in ogni casella. Dividendo per il totale ottiene la tabella congiunta delle frequenze; sommando lungo righe e colonne, le marginali. La funzione `riassunto` calcola medie, deviazioni standard, covarianza e correlazione con le formule di questa settimana: la covarianza, in particolare, moltiplica in ogni casella i due scarti, con `np.outer`, pesa con la frequenza della casella e somma. Lo script ripete il calcolo in pollici e in centimetri, poi stampa l’altezza media dei figli per ogni classe di genitori e disegna la nuvola di punti.

<div class="psi-exec" markdown="1">
```python
import matplotlib.pyplot as plt
import numpy as np

# La tabella di Galton (1886): altezze in pollici.
# Righe: genitore medio; colonne: figlio adulto.
# Le classi estreme sono aperte ("meno di", "più di").
genitore = np.array([64.0, 64.5, 65.5, 66.5, 67.5, 68.5,
                     69.5, 70.5, 71.5, 72.5, 73.0])
figlio = np.array([61.7, 62.2, 63.2, 64.2, 65.2, 66.2, 67.2,
                   68.2, 69.2, 70.2, 71.2, 72.2, 73.2, 73.7])
N = np.array([
    [1, 0, 2, 4, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 4, 4, 1, 5, 5, 0, 2, 0, 0, 0, 0, 0],
    [1, 0, 9, 5, 7, 11, 11, 7, 7, 5, 2, 1, 0, 0],
    [0, 3, 3, 5, 2, 17, 17, 14, 13, 4, 0, 0, 0, 0],
    [0, 3, 5, 14, 15, 36, 38, 28, 38, 19, 11, 4, 0, 0],
    [1, 0, 7, 11, 16, 25, 31, 34, 48, 21, 18, 4, 3, 0],
    [0, 0, 1, 16, 4, 17, 27, 20, 33, 25, 20, 11, 4, 5],
    [1, 0, 1, 0, 1, 1, 3, 12, 18, 14, 7, 4, 3, 3],
    [0, 0, 0, 0, 1, 3, 4, 3, 5, 10, 4, 9, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 7, 2, 4],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0]])
print("Figli in tutto:", N.sum())

P = N / N.sum()           # frequenze relative: la congiunta
p_gen = P.sum(axis=1)     # marginale del genitore medio
p_fig = P.sum(axis=0)     # marginale del figlio


def riassunto(g, f):
    """Medie, deviazioni standard, covarianza e correlazione."""
    mu_g = (g * p_gen).sum()
    mu_f = (f * p_fig).sum()
    sd_g = np.sqrt(((g - mu_g) ** 2 * p_gen).sum())
    sd_f = np.sqrt(((f - mu_f) ** 2 * p_fig).sum())
    # Covarianza: in ogni casella il prodotto degli scarti,
    # pesato con la frequenza della casella, poi la somma.
    cov = (np.outer(g - mu_g, f - mu_f) * P).sum()
    return mu_g, mu_f, sd_g, sd_f, cov, cov / (sd_g * sd_f)


for nome, k in [("pollici", 1.0), ("centimetri", 2.54)]:
    mu_g, mu_f, sd_g, sd_f, cov, r = riassunto(k * genitore,
                                               k * figlio)
    print(f"In {nome}: medie {mu_g:.1f} e {mu_f:.1f}, "
          f"sigma {sd_g:.2f} e {sd_f:.2f}")
    print(f"    Cov = {cov:.3f}    r = {r:.3f}")

# Regressione verso la media: per ogni classe di genitori,
# l'altezza media dei figli (in centimetri).
print("genitore (cm)  media dei figli (cm)  figli")
for g, riga in zip(genitore, N):
    media = (riga * figlio).sum() / riga.sum()
    print(f"{2.54 * g:13.1f}  {2.54 * media:20.1f}  {riga.sum():5d}")

# Nuvola di punti: un punto per figlio, spostato a caso
# dentro la sua classe di un pollice per non sovrapporsi.
rng = np.random.default_rng(1886)
righe, colonne = np.nonzero(N)
quanti = N[righe, colonne]
x = np.repeat(genitore[righe], quanti)
y = np.repeat(figlio[colonne], quanti)
x = 2.54 * (x + rng.uniform(-0.5, 0.5, x.size))
y = 2.54 * (y + rng.uniform(-0.5, 0.5, y.size))
plt.scatter(x, y, s=6, alpha=0.4)
plt.axvline(x.mean(), ls="--", c="gray")
plt.axhline(y.mean(), ls="--", c="gray")
plt.xlabel("Genitore medio (cm)")
plt.ylabel("Figlio (cm)")
plt.title(f"r dei punti = {np.corrcoef(x, y)[0, 1]:.2f}")
plt.tight_layout()
plt.show()
```
</div>

Le due righe con la covarianza mostrano 2,062 in pollici e 13,306 in centimetri, mentre la correlazione è 0,459 in entrambi i casi: è il conto dell’atto precedente. La tabella delle medie per classe è la linea arancione della figura dell’Atto V: i figli dei genitori più alti stanno sotto l’altezza dei genitori, quelli dei genitori più bassi sopra. Prova a cambiare unità a una sola delle due variabili, scrivendo per esempio `riassunto(2.54 * genitore, figlio)`: la covarianza viene moltiplicata per 2,54, mentre la correlazione resta 0,459.

## Atto VIII — Incorrelate non vuol dire indipendenti {: #incorrelazione }

Mettiamo insieme due risultati che già conosciamo. Dall’Atto IV sappiamo che, se $X$ e $Y$ sono indipendenti, la media del prodotto è il prodotto delle medie: $\mathbb{E}[XY]=\mu_X\mu_Y$. Dall’Atto VI sappiamo che la covarianza è proprio la differenza tra queste due quantità: $\operatorname{Cov}(X,Y)=\mathbb{E}[XY]-\mu_X\mu_Y$. Quindi, per variabili indipendenti, la differenza è zero:

$$
X \text{ e } Y \text{ indipendenti}\quad\Longrightarrow\quad\operatorname{Cov}(X,Y)=0\quad\text{e quindi}\quad\rho(X,Y)=0.
$$

Con i due dadi, per esempio, $\operatorname{Cov}(X,Y)=12{,}25-3{,}5\cdot3{,}5=0$. Variabili indipendenti sono sempre incorrelate. È naturale chiedersi se valga anche il contrario: se la covarianza è zero, le variabili sono indipendenti? La risposta è no, ed è uno degli errori più comuni nell’analisi dei dati.

Costruiamo un controesempio piccolo. Sia $X$ una variabile che vale $-1$, $0$ o $1$, ciascuno con probabilità $1/3$, e sia $Y=X^2$. Quando $X$ vale $-1$ o $1$, $Y$ vale 1; quando $X$ vale 0, $Y$ vale 0. La tabella congiunta è questa:

| | $X=-1$ | $X=0$ | $X=1$ | $P(Y=y)$ |
|---|:---:|:---:|:---:|:---:|
| $Y=0$ | 0 | 1/3 | 0 | 1/3 |
| $Y=1$ | 1/3 | 0 | 1/3 | 2/3 |
| $P(X=x)$ | 1/3 | 1/3 | 1/3 | 1 |

Le due variabili sono legate nel modo più stretto possibile: conoscendo $X$, conosciamo $Y$ con certezza. Infatti non sono indipendenti: la casella $(X=0,\,Y=0)$ vale $1/3$, mentre il prodotto dei margini è $1/3\cdot1/3=1/9$.

Calcoliamo ora la covarianza con la formula comoda. La media di $X$ è $\mu_X=(-1)\cdot\frac13+0\cdot\frac13+1\cdot\frac13=0$. Il prodotto $XY=X\cdot X^2=X^3$ vale $-1$, $0$ o $1$, ciascuno con probabilità $1/3$, quindi anche $\mathbb{E}[XY]=0$. Allora

$$
\operatorname{Cov}(X,Y)=\mathbb{E}[XY]-\mu_X\mu_Y=0-0\cdot\tfrac23=0.
$$

La covarianza è zero, e le variabili sono incorrelate, pur essendo una funzione dell’altra. Il motivo si vede con i quadranti. La media di $Y$ è $2/3$. Il punto $(1,\,1)$ sta a destra e sopra le medie e dà un contributo positivo; il punto $(-1,\,1)$ sta a sinistra e sopra, e dà un contributo negativo della stessa grandezza; il punto $(0,\,0)$ sta esattamente sulla linea verticale della media di $X$, e il suo contributo è zero. Per la simmetria della U, i contributi positivi e negativi si cancellano.

Lo stesso accade con relazioni non lineari più generali. Nella figura seguente $Y$ è, a meno di un piccolo rumore, una funzione di $X$: a sinistra con la forma di una U, a destra con la forma di una campana. Conoscere $X$ permette di prevedere $Y$ quasi esattamente, eppure la correlazione è praticamente zero. Puoi vedere lo stesso fenomeno nel widget dell’atto precedente, spuntando la casella «forma a U».

<figure markdown="0">
<svg viewBox="0 0 580 302" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Due nuvole di 200 punti. A sinistra i punti formano una U, a destra una campana. In entrambi i casi Y è quasi una funzione di X, ma il coefficiente di correlazione è vicino a zero: -0,05 e 0,00.">
<text x="290.0" y="20.0" text-anchor="middle" fill="currentColor" font-weight="bold">Dipendenza fortissima, correlazione quasi nulla</text>
<rect x="60" y="40" width="200" height="200" fill="none" stroke="currentColor" opacity="0.6"/>
<g fill="#8a4fbf" fill-opacity="0.65"><circle cx="218.1" cy="148.5" r="2.4"/><circle cx="218.7" cy="162.7" r="2.4"/><circle cx="162.9" cy="233.0" r="2.4"/><circle cx="119.2" cy="193.2" r="2.4"/><circle cx="75.0" cy="94.5" r="2.4"/><circle cx="137.8" cy="199.4" r="2.4"/><circle cx="142.6" cy="219.6" r="2.4"/><circle cx="73.4" cy="84.5" r="2.4"/><circle cx="74.0" cy="85.5" r="2.4"/><circle cx="255.1" cy="69.0" r="2.4"/><circle cx="189.0" cy="204.1" r="2.4"/><circle cx="109.4" cy="159.9" r="2.4"/><circle cx="147.6" cy="201.1" r="2.4"/><circle cx="250.3" cy="72.0" r="2.4"/><circle cx="235.7" cy="117.0" r="2.4"/><circle cx="225.6" cy="135.2" r="2.4"/><circle cx="139.5" cy="210.9" r="2.4"/><circle cx="158.7" cy="217.6" r="2.4"/><circle cx="193.7" cy="204.3" r="2.4"/><circle cx="76.3" cy="98.2" r="2.4"/><circle cx="170.6" cy="215.7" r="2.4"/><circle cx="116.5" cy="163.4" r="2.4"/><circle cx="232.3" cy="129.7" r="2.4"/><circle cx="77.0" cy="90.3" r="2.4"/><circle cx="194.1" cy="187.0" r="2.4"/><circle cx="230.5" cy="134.1" r="2.4"/><circle cx="108.1" cy="162.2" r="2.4"/><circle cx="235.3" cy="137.4" r="2.4"/><circle cx="230.9" cy="130.9" r="2.4"/><circle cx="68.3" cy="67.7" r="2.4"/><circle cx="199.5" cy="208.9" r="2.4"/><circle cx="65.0" cy="72.7" r="2.4"/><circle cx="160.6" cy="208.8" r="2.4"/><circle cx="147.9" cy="216.4" r="2.4"/><circle cx="103.5" cy="171.2" r="2.4"/><circle cx="126.7" cy="200.9" r="2.4"/><circle cx="218.3" cy="163.4" r="2.4"/><circle cx="125.0" cy="190.6" r="2.4"/><circle cx="93.2" cy="137.6" r="2.4"/><circle cx="197.8" cy="194.8" r="2.4"/><circle cx="150.2" cy="220.4" r="2.4"/><circle cx="216.9" cy="162.3" r="2.4"/><circle cx="109.6" cy="163.7" r="2.4"/><circle cx="125.7" cy="194.3" r="2.4"/><circle cx="217.1" cy="156.7" r="2.4"/><circle cx="161.3" cy="218.1" r="2.4"/><circle cx="161.2" cy="226.8" r="2.4"/><circle cx="109.8" cy="179.6" r="2.4"/><circle cx="67.5" cy="66.9" r="2.4"/><circle cx="242.5" cy="100.6" r="2.4"/><circle cx="81.1" cy="118.3" r="2.4"/><circle cx="225.7" cy="156.2" r="2.4"/><circle cx="134.8" cy="205.3" r="2.4"/><circle cx="245.9" cy="94.4" r="2.4"/><circle cx="140.8" cy="213.4" r="2.4"/><circle cx="243.1" cy="102.2" r="2.4"/><circle cx="170.7" cy="212.8" r="2.4"/><circle cx="110.5" cy="173.1" r="2.4"/><circle cx="206.0" cy="173.7" r="2.4"/><circle cx="193.2" cy="191.1" r="2.4"/><circle cx="195.1" cy="185.8" r="2.4"/><circle cx="153.1" cy="209.9" r="2.4"/><circle cx="107.0" cy="171.9" r="2.4"/><circle cx="186.8" cy="205.1" r="2.4"/><circle cx="85.2" cy="118.1" r="2.4"/><circle cx="196.6" cy="196.6" r="2.4"/><circle cx="185.8" cy="201.4" r="2.4"/><circle cx="136.5" cy="198.7" r="2.4"/><circle cx="216.9" cy="168.2" r="2.4"/><circle cx="101.7" cy="172.9" r="2.4"/><circle cx="139.1" cy="200.4" r="2.4"/><circle cx="216.7" cy="162.2" r="2.4"/><circle cx="137.2" cy="202.7" r="2.4"/><circle cx="200.6" cy="199.2" r="2.4"/><circle cx="181.4" cy="195.8" r="2.4"/><circle cx="244.0" cy="91.6" r="2.4"/><circle cx="253.7" cy="69.1" r="2.4"/><circle cx="202.6" cy="188.8" r="2.4"/><circle cx="218.8" cy="157.3" r="2.4"/><circle cx="93.9" cy="144.1" r="2.4"/><circle cx="200.6" cy="191.2" r="2.4"/><circle cx="226.2" cy="151.2" r="2.4"/><circle cx="141.2" cy="201.2" r="2.4"/><circle cx="170.1" cy="215.5" r="2.4"/><circle cx="156.1" cy="216.1" r="2.4"/><circle cx="247.3" cy="86.8" r="2.4"/><circle cx="125.2" cy="214.5" r="2.4"/><circle cx="141.3" cy="207.0" r="2.4"/><circle cx="64.9" cy="66.2" r="2.4"/><circle cx="144.8" cy="215.2" r="2.4"/><circle cx="185.0" cy="205.8" r="2.4"/><circle cx="242.8" cy="108.0" r="2.4"/><circle cx="240.7" cy="100.0" r="2.4"/><circle cx="127.1" cy="203.9" r="2.4"/><circle cx="253.1" cy="76.8" r="2.4"/><circle cx="100.5" cy="163.5" r="2.4"/><circle cx="221.6" cy="151.4" r="2.4"/><circle cx="94.7" cy="138.9" r="2.4"/><circle cx="141.9" cy="216.0" r="2.4"/><circle cx="78.8" cy="116.6" r="2.4"/><circle cx="228.2" cy="129.9" r="2.4"/><circle cx="222.6" cy="158.6" r="2.4"/><circle cx="91.4" cy="127.9" r="2.4"/><circle cx="165.2" cy="216.9" r="2.4"/><circle cx="113.9" cy="186.3" r="2.4"/><circle cx="158.4" cy="221.8" r="2.4"/><circle cx="170.1" cy="211.6" r="2.4"/><circle cx="85.0" cy="114.7" r="2.4"/><circle cx="229.4" cy="136.7" r="2.4"/><circle cx="117.8" cy="179.5" r="2.4"/><circle cx="149.9" cy="199.1" r="2.4"/><circle cx="75.7" cy="97.9" r="2.4"/><circle cx="65.3" cy="73.6" r="2.4"/><circle cx="101.9" cy="167.8" r="2.4"/><circle cx="129.8" cy="212.2" r="2.4"/><circle cx="241.5" cy="109.1" r="2.4"/><circle cx="234.2" cy="129.0" r="2.4"/><circle cx="156.3" cy="226.9" r="2.4"/><circle cx="151.4" cy="211.6" r="2.4"/><circle cx="191.8" cy="219.8" r="2.4"/><circle cx="228.3" cy="147.9" r="2.4"/><circle cx="129.0" cy="185.1" r="2.4"/><circle cx="215.9" cy="155.9" r="2.4"/><circle cx="140.8" cy="206.6" r="2.4"/><circle cx="177.9" cy="208.0" r="2.4"/><circle cx="205.2" cy="168.6" r="2.4"/><circle cx="160.3" cy="212.8" r="2.4"/><circle cx="196.3" cy="193.9" r="2.4"/><circle cx="197.6" cy="202.4" r="2.4"/><circle cx="65.9" cy="67.1" r="2.4"/><circle cx="72.2" cy="91.8" r="2.4"/><circle cx="93.2" cy="146.6" r="2.4"/><circle cx="105.5" cy="172.0" r="2.4"/><circle cx="103.5" cy="163.1" r="2.4"/><circle cx="74.1" cy="94.3" r="2.4"/><circle cx="106.1" cy="161.0" r="2.4"/><circle cx="179.2" cy="220.9" r="2.4"/><circle cx="233.5" cy="126.5" r="2.4"/><circle cx="131.3" cy="188.7" r="2.4"/><circle cx="134.6" cy="205.6" r="2.4"/><circle cx="144.1" cy="203.4" r="2.4"/><circle cx="194.4" cy="188.2" r="2.4"/><circle cx="214.3" cy="156.7" r="2.4"/><circle cx="244.0" cy="91.6" r="2.4"/><circle cx="136.3" cy="218.0" r="2.4"/><circle cx="199.4" cy="192.7" r="2.4"/><circle cx="129.8" cy="204.4" r="2.4"/><circle cx="221.7" cy="164.2" r="2.4"/><circle cx="108.7" cy="175.8" r="2.4"/><circle cx="230.7" cy="141.8" r="2.4"/><circle cx="161.0" cy="229.7" r="2.4"/><circle cx="202.9" cy="184.1" r="2.4"/><circle cx="166.7" cy="216.5" r="2.4"/><circle cx="125.0" cy="201.4" r="2.4"/><circle cx="158.9" cy="224.2" r="2.4"/><circle cx="74.4" cy="96.7" r="2.4"/><circle cx="73.0" cy="91.4" r="2.4"/><circle cx="165.7" cy="219.5" r="2.4"/><circle cx="155.7" cy="217.0" r="2.4"/><circle cx="223.5" cy="152.0" r="2.4"/><circle cx="68.6" cy="72.2" r="2.4"/><circle cx="170.8" cy="210.9" r="2.4"/><circle cx="158.2" cy="214.1" r="2.4"/><circle cx="178.7" cy="216.1" r="2.4"/><circle cx="203.7" cy="189.2" r="2.4"/><circle cx="164.7" cy="213.2" r="2.4"/><circle cx="172.0" cy="216.0" r="2.4"/><circle cx="158.4" cy="217.2" r="2.4"/><circle cx="181.9" cy="227.9" r="2.4"/><circle cx="112.0" cy="198.7" r="2.4"/><circle cx="170.0" cy="212.6" r="2.4"/><circle cx="192.8" cy="196.1" r="2.4"/><circle cx="101.2" cy="147.5" r="2.4"/><circle cx="253.4" cy="63.4" r="2.4"/><circle cx="206.9" cy="177.8" r="2.4"/><circle cx="246.7" cy="89.2" r="2.4"/><circle cx="120.8" cy="201.8" r="2.4"/><circle cx="149.2" cy="208.2" r="2.4"/><circle cx="114.6" cy="186.5" r="2.4"/><circle cx="73.7" cy="86.6" r="2.4"/><circle cx="67.9" cy="71.6" r="2.4"/><circle cx="111.8" cy="175.4" r="2.4"/><circle cx="228.8" cy="129.7" r="2.4"/><circle cx="95.9" cy="151.1" r="2.4"/><circle cx="196.1" cy="197.8" r="2.4"/><circle cx="112.3" cy="184.9" r="2.4"/><circle cx="77.3" cy="103.7" r="2.4"/><circle cx="101.4" cy="145.9" r="2.4"/><circle cx="193.9" cy="200.2" r="2.4"/><circle cx="160.3" cy="207.8" r="2.4"/><circle cx="169.3" cy="209.1" r="2.4"/><circle cx="151.1" cy="210.0" r="2.4"/><circle cx="117.0" cy="179.4" r="2.4"/><circle cx="157.8" cy="224.6" r="2.4"/><circle cx="240.5" cy="104.2" r="2.4"/><circle cx="103.1" cy="149.9" r="2.4"/><circle cx="204.3" cy="188.9" r="2.4"/><circle cx="112.6" cy="179.2" r="2.4"/><circle cx="101.6" cy="164.4" r="2.4"/><circle cx="126.4" cy="195.4" r="2.4"/></g>
<text x="160.0" y="260.0" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">forma a U: r = -0,05</text>
<rect x="330" y="40" width="200" height="200" fill="none" stroke="currentColor" opacity="0.6"/>
<g fill="#8a4fbf" fill-opacity="0.65"><circle cx="488.1" cy="205.8" r="2.4"/><circle cx="488.7" cy="185.8" r="2.4"/><circle cx="432.9" cy="66.8" r="2.4"/><circle cx="389.2" cy="173.3" r="2.4"/><circle cx="345.0" cy="201.3" r="2.4"/><circle cx="407.8" cy="95.7" r="2.4"/><circle cx="412.6" cy="85.2" r="2.4"/><circle cx="343.4" cy="211.3" r="2.4"/><circle cx="344.0" cy="218.0" r="2.4"/><circle cx="525.1" cy="218.0" r="2.4"/><circle cx="459.0" cy="119.5" r="2.4"/><circle cx="379.4" cy="177.7" r="2.4"/><circle cx="417.6" cy="69.7" r="2.4"/><circle cx="520.3" cy="214.2" r="2.4"/><circle cx="505.7" cy="215.9" r="2.4"/><circle cx="495.6" cy="207.3" r="2.4"/><circle cx="409.5" cy="89.4" r="2.4"/><circle cx="428.7" cy="52.2" r="2.4"/><circle cx="463.7" cy="142.7" r="2.4"/><circle cx="346.3" cy="218.5" r="2.4"/><circle cx="440.6" cy="63.7" r="2.4"/><circle cx="386.5" cy="163.2" r="2.4"/><circle cx="502.3" cy="205.3" r="2.4"/><circle cx="347.0" cy="224.8" r="2.4"/><circle cx="464.1" cy="144.4" r="2.4"/><circle cx="500.5" cy="213.6" r="2.4"/><circle cx="378.1" cy="185.8" r="2.4"/><circle cx="505.3" cy="225.1" r="2.4"/><circle cx="500.9" cy="200.1" r="2.4"/><circle cx="338.3" cy="213.7" r="2.4"/><circle cx="469.5" cy="154.5" r="2.4"/><circle cx="335.0" cy="225.4" r="2.4"/><circle cx="430.6" cy="63.3" r="2.4"/><circle cx="417.9" cy="65.9" r="2.4"/><circle cx="373.5" cy="207.3" r="2.4"/><circle cx="396.7" cy="136.7" r="2.4"/><circle cx="488.3" cy="192.4" r="2.4"/><circle cx="395.0" cy="149.5" r="2.4"/><circle cx="363.2" cy="200.7" r="2.4"/><circle cx="467.8" cy="155.4" r="2.4"/><circle cx="420.2" cy="62.4" r="2.4"/><circle cx="486.9" cy="191.7" r="2.4"/><circle cx="379.6" cy="182.7" r="2.4"/><circle cx="395.7" cy="126.7" r="2.4"/><circle cx="487.1" cy="189.7" r="2.4"/><circle cx="431.3" cy="53.2" r="2.4"/><circle cx="431.2" cy="72.4" r="2.4"/><circle cx="379.8" cy="189.1" r="2.4"/><circle cx="337.5" cy="209.7" r="2.4"/><circle cx="512.5" cy="207.6" r="2.4"/><circle cx="351.1" cy="214.0" r="2.4"/><circle cx="495.7" cy="200.0" r="2.4"/><circle cx="404.8" cy="120.7" r="2.4"/><circle cx="515.9" cy="213.6" r="2.4"/><circle cx="410.8" cy="102.9" r="2.4"/><circle cx="513.1" cy="212.1" r="2.4"/><circle cx="440.7" cy="77.2" r="2.4"/><circle cx="380.5" cy="187.5" r="2.4"/><circle cx="476.0" cy="174.4" r="2.4"/><circle cx="463.2" cy="124.7" r="2.4"/><circle cx="465.1" cy="152.3" r="2.4"/><circle cx="423.1" cy="72.1" r="2.4"/><circle cx="377.0" cy="181.1" r="2.4"/><circle cx="456.8" cy="121.2" r="2.4"/><circle cx="355.2" cy="198.3" r="2.4"/><circle cx="466.6" cy="147.5" r="2.4"/><circle cx="455.8" cy="113.9" r="2.4"/><circle cx="406.5" cy="104.6" r="2.4"/><circle cx="486.9" cy="182.3" r="2.4"/><circle cx="371.7" cy="192.7" r="2.4"/><circle cx="409.1" cy="95.1" r="2.4"/><circle cx="486.7" cy="193.6" r="2.4"/><circle cx="407.2" cy="116.9" r="2.4"/><circle cx="470.6" cy="167.7" r="2.4"/><circle cx="451.4" cy="89.4" r="2.4"/><circle cx="514.0" cy="208.6" r="2.4"/><circle cx="523.7" cy="212.3" r="2.4"/><circle cx="472.6" cy="161.4" r="2.4"/><circle cx="488.8" cy="202.6" r="2.4"/><circle cx="363.9" cy="203.8" r="2.4"/><circle cx="470.6" cy="167.7" r="2.4"/><circle cx="496.2" cy="203.4" r="2.4"/><circle cx="411.2" cy="98.6" r="2.4"/><circle cx="440.1" cy="74.1" r="2.4"/><circle cx="426.1" cy="61.0" r="2.4"/><circle cx="517.3" cy="218.0" r="2.4"/><circle cx="395.2" cy="138.7" r="2.4"/><circle cx="411.3" cy="89.1" r="2.4"/><circle cx="334.9" cy="213.6" r="2.4"/><circle cx="414.8" cy="73.2" r="2.4"/><circle cx="455.0" cy="123.5" r="2.4"/><circle cx="512.8" cy="226.9" r="2.4"/><circle cx="510.7" cy="209.3" r="2.4"/><circle cx="397.1" cy="130.4" r="2.4"/><circle cx="523.1" cy="200.7" r="2.4"/><circle cx="370.5" cy="193.5" r="2.4"/><circle cx="491.6" cy="195.4" r="2.4"/><circle cx="364.7" cy="212.4" r="2.4"/><circle cx="411.9" cy="85.2" r="2.4"/><circle cx="348.8" cy="209.0" r="2.4"/><circle cx="498.2" cy="216.1" r="2.4"/><circle cx="492.6" cy="209.9" r="2.4"/><circle cx="361.4" cy="209.2" r="2.4"/><circle cx="435.2" cy="63.4" r="2.4"/><circle cx="383.9" cy="197.6" r="2.4"/><circle cx="428.4" cy="62.8" r="2.4"/><circle cx="440.1" cy="70.7" r="2.4"/><circle cx="355.0" cy="213.4" r="2.4"/><circle cx="499.4" cy="206.8" r="2.4"/><circle cx="387.8" cy="161.6" r="2.4"/><circle cx="419.9" cy="80.1" r="2.4"/><circle cx="345.7" cy="211.7" r="2.4"/><circle cx="335.3" cy="218.2" r="2.4"/><circle cx="371.9" cy="204.7" r="2.4"/><circle cx="399.8" cy="127.2" r="2.4"/><circle cx="511.5" cy="202.9" r="2.4"/><circle cx="504.2" cy="222.9" r="2.4"/><circle cx="426.3" cy="77.1" r="2.4"/><circle cx="421.4" cy="82.6" r="2.4"/><circle cx="461.8" cy="118.9" r="2.4"/><circle cx="498.3" cy="210.0" r="2.4"/><circle cx="399.0" cy="132.0" r="2.4"/><circle cx="485.9" cy="200.3" r="2.4"/><circle cx="410.8" cy="101.5" r="2.4"/><circle cx="447.9" cy="106.1" r="2.4"/><circle cx="475.2" cy="171.7" r="2.4"/><circle cx="430.3" cy="61.1" r="2.4"/><circle cx="466.3" cy="163.6" r="2.4"/><circle cx="467.6" cy="160.2" r="2.4"/><circle cx="335.9" cy="222.0" r="2.4"/><circle cx="342.2" cy="215.8" r="2.4"/><circle cx="363.2" cy="205.1" r="2.4"/><circle cx="375.5" cy="183.4" r="2.4"/><circle cx="373.5" cy="184.7" r="2.4"/><circle cx="344.1" cy="207.0" r="2.4"/><circle cx="376.1" cy="180.6" r="2.4"/><circle cx="449.2" cy="103.2" r="2.4"/><circle cx="503.5" cy="215.6" r="2.4"/><circle cx="401.3" cy="115.1" r="2.4"/><circle cx="404.6" cy="111.2" r="2.4"/><circle cx="414.1" cy="84.9" r="2.4"/><circle cx="464.4" cy="157.5" r="2.4"/><circle cx="484.3" cy="206.0" r="2.4"/><circle cx="514.0" cy="209.3" r="2.4"/><circle cx="406.3" cy="105.2" r="2.4"/><circle cx="469.4" cy="159.7" r="2.4"/><circle cx="399.8" cy="132.0" r="2.4"/><circle cx="491.7" cy="215.3" r="2.4"/><circle cx="378.7" cy="183.4" r="2.4"/><circle cx="500.7" cy="201.7" r="2.4"/><circle cx="431.0" cy="50.5" r="2.4"/><circle cx="472.9" cy="166.8" r="2.4"/><circle cx="436.7" cy="68.8" r="2.4"/><circle cx="395.0" cy="152.8" r="2.4"/><circle cx="428.9" cy="53.8" r="2.4"/><circle cx="344.4" cy="202.1" r="2.4"/><circle cx="343.0" cy="220.2" r="2.4"/><circle cx="435.7" cy="63.9" r="2.4"/><circle cx="425.7" cy="64.2" r="2.4"/><circle cx="493.5" cy="208.3" r="2.4"/><circle cx="338.6" cy="235.2" r="2.4"/><circle cx="440.8" cy="76.6" r="2.4"/><circle cx="428.2" cy="58.7" r="2.4"/><circle cx="448.7" cy="103.7" r="2.4"/><circle cx="473.7" cy="175.7" r="2.4"/><circle cx="434.7" cy="90.4" r="2.4"/><circle cx="442.0" cy="66.2" r="2.4"/><circle cx="428.4" cy="59.5" r="2.4"/><circle cx="451.9" cy="102.0" r="2.4"/><circle cx="382.0" cy="181.4" r="2.4"/><circle cx="440.0" cy="77.2" r="2.4"/><circle cx="462.8" cy="138.0" r="2.4"/><circle cx="371.2" cy="200.8" r="2.4"/><circle cx="523.4" cy="218.1" r="2.4"/><circle cx="476.9" cy="177.3" r="2.4"/><circle cx="516.7" cy="214.4" r="2.4"/><circle cx="390.8" cy="145.1" r="2.4"/><circle cx="419.2" cy="84.8" r="2.4"/><circle cx="384.6" cy="171.5" r="2.4"/><circle cx="343.7" cy="220.1" r="2.4"/><circle cx="337.9" cy="224.8" r="2.4"/><circle cx="381.8" cy="198.1" r="2.4"/><circle cx="498.8" cy="203.8" r="2.4"/><circle cx="365.9" cy="212.1" r="2.4"/><circle cx="466.1" cy="153.6" r="2.4"/><circle cx="382.3" cy="175.3" r="2.4"/><circle cx="347.3" cy="223.0" r="2.4"/><circle cx="371.4" cy="198.0" r="2.4"/><circle cx="463.9" cy="141.4" r="2.4"/><circle cx="430.3" cy="57.0" r="2.4"/><circle cx="439.3" cy="63.4" r="2.4"/><circle cx="421.1" cy="77.1" r="2.4"/><circle cx="387.0" cy="160.3" r="2.4"/><circle cx="427.8" cy="64.4" r="2.4"/><circle cx="510.5" cy="213.1" r="2.4"/><circle cx="373.1" cy="197.4" r="2.4"/><circle cx="474.3" cy="164.9" r="2.4"/><circle cx="382.6" cy="187.5" r="2.4"/><circle cx="371.6" cy="195.9" r="2.4"/><circle cx="396.4" cy="130.8" r="2.4"/></g>
<text x="430.0" y="260.0" text-anchor="middle" fill="currentColor" font-size="13" font-weight="bold">forma a campana: r = 0,00</text>
<text x="290.0" y="290.0" text-anchor="middle" fill="currentColor" font-size="12">Y dipende da X quasi senza rumore, ma nessuna retta descrive la nuvola.</text>
</svg>
<figcaption>Due relazioni non lineari: conoscendo X si prevede Y quasi esattamente, eppure la correlazione è circa zero. La correlazione misura soltanto la tendenza a disporsi attorno a una retta.</figcaption>
</figure>

La lezione è questa: la covarianza e la correlazione misurano soltanto la tendenza delle variabili a disporsi attorno a una retta. Una correlazione vicina a 1 o a $-1$ dice che c’è un forte legame lineare; una correlazione vicina a zero dice che non c’è un legame lineare, ma non dice che non c’è un legame. Per sapere se due variabili sono indipendenti bisogna guardare l’intera distribuzione congiunta, o almeno disegnare la nuvola dei punti, e non soltanto un numero che la riassume.

Questo avvertimento ha conseguenze pratiche. Pensiamo alla latenza di un servizio in funzione del numero di thread che lo servono. Con pochi thread la latenza è alta, perché le richieste aspettano in coda; con troppi è di nuovo alta, perché i thread si contendono la CPU e la memoria; nel mezzo è bassa. È una U: la correlazione tra numero di thread e latenza può risultare vicina a zero, eppure il numero di thread è proprio la leva decisiva. Un analista che scartasse questa variabile «perché non correlata» sbaglierebbe di grosso. Lo stesso vale nel machine learning, quando si scelgono le variabili da dare a un modello guardando solo la loro correlazione con ciò che si vuole prevedere.

!!! example "Sosta di verifica"
    Vero o falso? (a) Se $\rho(X,Y)=0$, allora $X$ e $Y$ sono indipendenti. (b) Se $X$ e $Y$ sono indipendenti, allora $\rho(X,Y)=0$. (c) Se $\rho(X,Y)=0$, conoscere $X$ non aiuta a prevedere $Y$.

    ??? esempio-svolto "Risposta"
        (a) Falso: con $Y=X^2$ e $X$ simmetrica attorno a zero la correlazione è zero, ma le variabili sono strettamente dipendenti. (b) Vero: per variabili indipendenti $\mathbb{E}[XY]=\mathbb{E}[X]\,\mathbb{E}[Y]$, quindi la covarianza, e con lei la correlazione, è zero. (c) Falso, per lo stesso controesempio di (a): conoscere $X$ dice esattamente quanto vale $Y$. Una correlazione nulla dice solo che una retta non aiuta a prevedere $Y$.

## Atto IX — Correlazione non vuol dire causa {: #causazione }

Il secondo avvertimento riguarda il caso opposto: due variabili con una correlazione alta. Supponiamo di scoprire che, nei moduli di un grande progetto software, il numero di commenti `TODO` lasciati nel codice e il numero di bug segnalati hanno una correlazione di 0,6. Possiamo concludere che i `TODO` causano i bug, e che basta toglierli per avere meno errori?

No, e il motivo è generale. Una correlazione tra $X$ e $Y$ può nascere in modi molto diversi. Può darsi che $X$ influenzi davvero $Y$. Può darsi che sia $Y$ a influenzare $X$: magari sono i bug a far nascere i `TODO`, perché chi corregge un errore lascia una nota sul lavoro che resta da fare. Può darsi che una terza variabile influenzi entrambe: un modulo più grande ha più righe di codice, quindi più occasioni per scrivere `TODO` e più occasioni per sbagliare. Può darsi, infine, che la correlazione sia una coincidenza, soprattutto quando i dati sono pochi o quando si confrontano moltissime coppie di variabili e se ne sceglie quella più correlata. La correlazione, da sola, non distingue tra queste spiegazioni.

<figure markdown="0">
<svg viewBox="0 0 580 266" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Schema con tre riquadri. In alto Z, la dimensione del modulo; frecce da Z verso X, i commenti TODO, e verso Y, i bug segnalati. Tra X e Y una linea rossa tratteggiata senza freccia: sono correlati ma nessuno dei due causa l’altro.">
<defs><marker id="f9a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<text x="290.0" y="20.0" text-anchor="middle" fill="currentColor" font-weight="bold">Una terza variabile che muove le altre due</text>
<rect x="200" y="40" width="180" height="54" rx="8" fill="#8a4fbf" opacity="0.9"/>
<text x="290.0" y="64.0" text-anchor="middle" fill="#fff" font-weight="bold">Z: dimensione</text>
<text x="290.0" y="81.0" text-anchor="middle" fill="#fff" font-size="12">del modulo (righe)</text>
<rect x="40" y="170" width="180" height="54" rx="8" fill="#4051b5" opacity="0.9"/>
<text x="130.0" y="194.0" text-anchor="middle" fill="#fff" font-weight="bold">X: commenti TODO</text>
<text x="130.0" y="211.0" text-anchor="middle" fill="#fff" font-size="12">nel modulo</text>
<rect x="360" y="170" width="180" height="54" rx="8" fill="#e07a1f" opacity="0.9"/>
<text x="450.0" y="194.0" text-anchor="middle" fill="#fff" font-weight="bold">Y: bug segnalati</text>
<text x="450.0" y="211.0" text-anchor="middle" fill="#fff" font-size="12">nel modulo</text>
<line x1="250" y1="94" x2="150" y2="166" stroke="currentColor" stroke-width="2" marker-end="url(#f9a)"/>
<line x1="330" y1="94" x2="430" y2="166" stroke="currentColor" stroke-width="2" marker-end="url(#f9a)"/>
<line x1="222" y1="197" x2="358" y2="197" stroke="#e03a3a" stroke-width="2" stroke-dasharray="6 4"/>
<text x="290.0" y="189.0" text-anchor="middle" fill="#e03a3a" font-size="12" font-weight="bold">correlati</text>
<text x="290.0" y="214.0" text-anchor="middle" fill="#e03a3a" font-size="12">ma nessuna freccia</text>
<text x="290.0" y="252.0" text-anchor="middle" fill="currentColor" font-size="12">Togliere i TODO non toglie i bug: entrambi crescono con la dimensione del modulo.</text>
</svg>
<figcaption>Un confondente: la dimensione del modulo fa crescere sia i commenti TODO sia i bug, che risultano correlati anche se nessuno dei due causa l’altro. Esempio costruito per la dispensa.</figcaption>
</figure>

La terza variabile si chiama **confondente**. Nel nostro esempio la dimensione del modulo fa crescere sia $X$ sia $Y$, e le due risultano correlate anche se non c’è nessuna freccia dall’una all’altra. Un modo per smascherare un confondente è confrontare solo casi in cui il confondente è quasi lo stesso: se tra moduli di dimensione simile la correlazione sparisce, era la dimensione a produrla. Lo fa il terzo script del laboratorio qui sotto.

Gli esempi famosi sono moltissimi. Nei mesi estivi si vendono più gelati e ci sono più annegamenti, ma i gelati non fanno annegare nessuno: il caldo porta le persone sia a comprare gelati sia a fare il bagno. Nel 2012 il cardiologo Franz Messerli pubblicò, in tono semiserio, sul *New England Journal of Medicine* un grafico con il consumo di cioccolato per abitante e il numero di premi Nobel per abitante in 23 paesi: la correlazione era $r\approx0{,}79$. Lo stesso Messerli osservava che il dato non dimostra un rapporto di causa, e il candidato confondente è evidente: i paesi più ricchi consumano più cioccolato e investono di più nella ricerca.

Il problema era chiaro già ai fondatori della correlazione. Karl Pearson, che nel 1897 introdusse l’espressione *correlazione spuria* per un caso in cui una correlazione nasce soltanto dal modo in cui si costruiscono gli indici, vedeva la correlazione come un concetto più ampio della causalità:

> «La causazione ci dice che B accompagnerà A; la correlazione ci dice in quale proporzione di casi B accompagna A, e quando $r$ si avvicina all’unità questa proporzione si avvicina sempre più al 100 per cento.»
> — K. Pearson, *The Grammar of Science*, 2ª ed., 1900, cap. X, § 7, p. 397 (tradotto dall’inglese)

Per Pearson, dunque, la correlazione misura quanto spesso due fatti vanno insieme, e la causa è il caso limite in cui vanno insieme sempre. Ma anche una correlazione perfetta non dice quale dei due fatti produce l’altro, né se entrambi siano prodotti da un terzo. Per stabilire una causa serve qualcosa di più dei dati osservati. Il metodo più solido è l’**esperimento**: si interviene sulla variabile sospettata di essere la causa, assegnando i casi a caso ai due gruppi, e si guarda se l’altra cambia. L’assegnazione casuale fa sì che i confondenti, noti o ignoti, si distribuiscano in modo simile nei due gruppi. Nel software è ciò che si fa con un **test A/B**: invece di confrontare gli utenti che hanno scelto la nuova versione di una pagina con quelli che non l’hanno scelta, si assegna a caso la versione e si confrontano i risultati.

### Laboratorio: quando la correlazione inganna {: #lab-inganni }

Il terzo script mette alla prova i due avvertimenti con dati simulati. Nella prima parte genera 10 000 punti con $X$ uniforme tra $-1$ e $1$ e $Y=X^2$ più un piccolo rumore: la correlazione è quasi zero, ma la media di $Y$ cambia moltissimo a seconda di $X$. Nella seconda parte simula 10 000 moduli software. La dimensione di ciascun modulo, in migliaia di righe, è scelta a caso tra 1 e 20; il numero di `TODO` e il numero di bug sono generati, ciascuno per conto suo, con una distribuzione di Poisson il cui parametro cresce con la dimensione. Nel modello i `TODO` non hanno alcun effetto sui bug: l’unica cosa che li lega è la dimensione. Lo script calcola la correlazione tra `TODO` e bug su tutti i moduli e poi solo su quelli di dimensione quasi uguale.

<div class="psi-exec" markdown="1">
```python
import numpy as np

rng = np.random.default_rng(7)
N = 10_000

# 1) Forma a U: Y dipende da X quasi senza rumore.
x = rng.uniform(-1, 1, N)
y = x ** 2 + rng.normal(0, 0.05, N)
print(f"Forma a U: r = {np.corrcoef(x, y)[0, 1]:+.3f}")
# Eppure conoscere X dice moltissimo su Y.
print(f"  media di Y quando |X| < 0,2: {y[np.abs(x) < 0.2].mean():.3f}")
print(f"  media di Y quando |X| > 0,8: {y[np.abs(x) > 0.8].mean():.3f}")

# 2) Un confondente. La dimensione di un modulo (in migliaia
# di righe) fa crescere sia i commenti TODO sia i bug, ma i
# TODO non causano bug: nel modello i bug dipendono solo
# dalla dimensione.
righe = rng.uniform(1, 20, N)
todo = rng.poisson(0.8 * righe)
bug = rng.poisson(0.5 * righe)
r_tutti = np.corrcoef(todo, bug)[0, 1]
print(f"TODO e bug, tutti i moduli:       r = {r_tutti:+.3f}")

# Confrontiamo solo moduli di dimensione quasi uguale:
# la dimensione è (quasi) fissa e il legame sparisce.
simili = (righe > 9.5) & (righe < 10.5)
r_simili = np.corrcoef(todo[simili], bug[simili])[0, 1]
print(f"TODO e bug, moduli da circa 10 mila righe "
      f"({simili.sum()} moduli): r = {r_simili:+.3f}")
```
</div>

Nella prima parte $r$ è circa $+0{,}01$, eppure la media di $Y$ passa da circa 0,01, quando $X$ è vicino a zero, a circa 0,81 quando $X$ è vicino agli estremi: un legame fortissimo che la correlazione non vede. Nella seconda parte, su tutti i moduli, la correlazione tra `TODO` e bug è circa 0,63, un valore che molti leggerebbero come un legame robusto. Tra i circa 500 moduli con dimensione vicina a 10 000 righe, però, la correlazione scende quasi a zero: confrontando moduli simili, i `TODO` non dicono nulla sui bug. Prova a stringere o allargare la finestra delle dimensioni, cambiando i numeri 9.5 e 10.5: più la finestra è larga, più la dimensione torna a variare e più la correlazione riappare.

### Covarianza e correlazione nei dati dell’informatica {: #correlazione-informatica }

Nei dati dell’informatica covarianza e correlazione compaiono continuamente. Nel machine learning, i dati sono tabelle con una riga per ogni esempio e una colonna per ogni caratteristica, o *feature*. La matrice delle correlazioni tra le colonne è uno dei primi oggetti che si calcolano: due feature con correlazione vicina a $\pm1$ portano quasi la stessa informazione, come la dimensione di un file in byte e in kilobyte, o il numero di righe e il numero di caratteri di un sorgente, e spesso conviene tenerne una sola. Due feature incorrelate, invece, portano informazioni diverse almeno dal punto di vista lineare, con l’avvertenza dell’Atto VIII.

Nel monitoraggio dei sistemi si calcolano le correlazioni tra metriche, come il carico della CPU, la latenza e la lunghezza delle code, per capire quali segnali si muovono insieme. Durante un incidente, però, quasi tutte le metriche si muovono insieme, perché hanno una causa comune: la correlazione indica dove guardare, non quale metrica sia la causa. È l’avvertimento dell’Atto IX applicato al lavoro quotidiano.

Infine, la covarianza tornerà la settimana prossima. Nella [Settimana 1](../settimana_01/index.md#a-collegamento-in-parallelo-ridondanza-e-tolleranza-ai-guasti) abbiamo calcolato l’affidabilità di un sistema ridondante supponendo che i guasti dei componenti fossero indipendenti. Nella Settimana 8 studieremo la varianza di una somma di variabili e vedremo che, per variabili indipendenti, le varianze si sommano. Quando le variabili non sono indipendenti, nella formula compare un termine in più, e quel termine è proprio la covarianza: due server che tendono a guastarsi insieme, perché condividono l’alimentazione o lo stesso bug, rendono il sistema molto meno affidabile di quanto direbbe il calcolo con l’indipendenza.

Riassumiamo la seconda lezione. La covarianza è la media del prodotto degli scarti dalle medie: il suo segno dice se le variabili tendono a stare dalla stessa parte delle loro medie o da parti opposte, ma il suo valore dipende dalle unità di misura. La correlazione è la covarianza misurata in unità statistiche, come voleva Galton: sta sempre tra $-1$ e $1$, vale $\pm1$ solo per una relazione lineare esatta e non cambia con le unità di misura. Variabili indipendenti hanno correlazione zero, ma correlazione zero non vuol dire indipendenza; e una correlazione, anche alta, non dice quale variabile sia la causa dell’altra.

## Lettura A — Galton, la retta e la regressione verso la media {: #regressione .psi-facoltativo }

Questa lettura è facoltativa e non è richiesta all’esame. Mostra da dove viene la retta che Galton e Pearson tracciavano tra le nuvole di punti, perché la correlazione non può uscire dall’intervallo tra $-1$ e $1$, e perché la regressione verso la media non è una legge della biologia ma una conseguenza di ogni correlazione minore di 1.

Il primo passo è un ricordo della Settimana 6, dove abbiamo visto Gauss calcolare l’orbita di Cerere a partire da misure piene di errori. Il criterio che usava, il **metodo dei minimi quadrati**, si capisce bene con l’esempio più piccolo possibile. Supponiamo di misurare quattro volte la stessa distanza e di ottenere 10, 12, 11 e 13. Quale numero $c$ riassume meglio le misure? Un criterio naturale è scegliere $c$ in modo che gli scarti $x_i-c$ siano, nel complesso, piccoli. Gauss propone di rendere minima la **somma dei quadrati degli scarti**,

$$
S(c)=\sum_{i=1}^{n}(x_i-c)^2.
$$

Mostriamo, senza derivate, che il minimo si ha quando $c$ è la media aritmetica $\bar x$. Scriviamo ogni scarto passando per la media, $x_i-c=(x_i-\bar x)+(\bar x-c)$, ed eleviamo al quadrato:

$$
(x_i-c)^2=(x_i-\bar x)^2+2(x_i-\bar x)(\bar x-c)+(\bar x-c)^2.
$$

Sommiamo su tutte le misure. Il termine centrale contiene la somma degli scarti dalla media, $\sum_i(x_i-\bar x)$, che vale zero, perché gli scarti positivi e quelli negativi dalla media si compensano esattamente. Restano

$$
S(c)=\sum_{i=1}^{n}(x_i-\bar x)^2+n(\bar x-c)^2.
$$

Il primo pezzo non dipende da $c$. Il secondo è un quadrato moltiplicato per $n$, quindi non è mai negativo, e vale zero solo per $c=\bar x$. Dunque $S(c)$ è minima quando $c=\bar x$; con le nostre misure, $\bar x=(10+12+11+13)/4=11{,}5$. Gauss scrive nella *Theoria motus* (1809, art. 186) di usare questo principio dal 1795, e riconosce che a pubblicarlo per primo era stato Adrien-Marie Legendre, nel 1805.

### La retta migliore, in unità statistiche {: #retta-regressione }

Ora non vogliamo più riassumere una sola grandezza con un numero, ma prevedere una grandezza a partire da un’altra: l’altezza del figlio a partire da quella del genitore. Lavoriamo in unità statistiche, come Galton a Naworth, con le variabili standardizzate $Z_X$ e $Z_Y$, che hanno media 0 e varianza 1. Cerchiamo la retta per l’origine $\hat z_Y=b\,z_X$ che sbaglia di meno, e misuriamo l’errore come Gauss, con la media del quadrato della differenza:

$$
E(b)=\mathbb{E}\big[(Z_Y-b\,Z_X)^2\big].
$$

Sviluppiamo il quadrato e usiamo la linearità del valore atteso:

$$
E(b)=\mathbb{E}[Z_Y^2]-2b\,\mathbb{E}[Z_X Z_Y]+b^2\,\mathbb{E}[Z_X^2]=1-2b\rho+b^2.
$$

Abbiamo usato tre fatti: $\mathbb{E}[Z_Y^2]=\operatorname{Var}(Z_Y)=1$ e $\mathbb{E}[Z_X^2]=1$, perché le variabili standardizzate hanno media 0 e varianza 1, e $\mathbb{E}[Z_XZ_Y]=\rho$, che è il risultato dell’Atto VII. Ora completiamo il quadrato, come nel passo di Gauss: $b^2-2b\rho=(b-\rho)^2-\rho^2$, e quindi

$$
E(b)=(b-\rho)^2+\big(1-\rho^2\big).
$$

Il primo pezzo è un quadrato, mai negativo, e vale zero solo per $b=\rho$. Il secondo non dipende da $b$. La retta migliore ha dunque pendenza uguale alla correlazione, $\hat z_Y=\rho\,z_X$, e il suo errore quadratico medio è $1-\rho^2$. In unità statistiche, dunque, la correlazione è la pendenza della retta di regressione. È proprio così che Pearson la presentava ai lettori della *Grammar of Science*: tracciava la retta tra i punti e chiamava correlazione la sua pendenza, quando le due grandezze sono misurate sulla stessa scala.

> «Il matematico ci mostra come tracciare una retta che si adatti il più possibile a un tale sistema di punti […]. Lo fa rendendo la somma dei quadrati delle distanze dei punti dalla retta la più piccola possibile.»
> — K. Pearson, *The Grammar of Science*, 2ª ed., 1900, cap. X, § 7, p. 396 (tradotto dall’inglese)

Dal conto precedente segue, quasi gratis, il fatto che nell’Atto VII abbiamo dato senza dimostrazione: la correlazione non può uscire dall’intervallo tra $-1$ e $1$. L’errore $E(\rho)=1-\rho^2$ è la media di un quadrato, quindi non può essere negativo: $1-\rho^2\ge0$, cioè $\rho^2\le1$, cioè $-1\le\rho\le1$. Inoltre $\rho^2=1$ solo se l’errore è zero, cioè se $Z_Y=\rho\,Z_X$ esattamente, senza nessuno scarto: $Y$ è allora una funzione lineare di $X$, crescente se $\rho=1$ e decrescente se $\rho=-1$.

### La regressione verso la media {: #regressione-media }

Torniamo ai dati di Galton, in unità statistiche. La retta migliore è $\hat z_{\text{figlio}}=0{,}46\cdot z_{\text{genitore}}$.

<figure markdown="0">
<svg viewBox="0 0 580 390" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Nuvola dei dati di Galton in unità standard. La diagonale tratteggiata rappresenta figli che ripetono la deviazione del genitore; la retta arancione, con pendenza 0,46, passa vicino ai punti arancioni che indicano la media dei figli in ogni classe. Un genitore a più 2 deviazioni standard ha figli previsti a più 0,92.">
<text x="300.0" y="20.0" text-anchor="middle" fill="currentColor" font-weight="bold">Le altezze in unità di deviazione standard</text>
<line x1="70" y1="340" x2="510" y2="340" stroke="currentColor"/>
<line x1="70" y1="40" x2="70" y2="340" stroke="currentColor"/>
<line x1="70.0" y1="340" x2="70.0" y2="344" stroke="currentColor"/>
<text x="70.0" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">-3</text>
<line x1="143.3" y1="340" x2="143.3" y2="344" stroke="currentColor"/>
<text x="143.3" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">-2</text>
<line x1="216.7" y1="340" x2="216.7" y2="344" stroke="currentColor"/>
<text x="216.7" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">-1</text>
<line x1="290.0" y1="340" x2="290.0" y2="344" stroke="currentColor"/>
<text x="290.0" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">0</text>
<line x1="363.3" y1="340" x2="363.3" y2="344" stroke="currentColor"/>
<text x="363.3" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">1</text>
<line x1="436.7" y1="340" x2="436.7" y2="344" stroke="currentColor"/>
<text x="436.7" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">2</text>
<line x1="510.0" y1="340" x2="510.0" y2="344" stroke="currentColor"/>
<text x="510.0" y="356.0" text-anchor="middle" fill="currentColor" font-size="11">3</text>
<line x1="66" y1="340.0" x2="70" y2="340.0" stroke="currentColor"/>
<text x="63.0" y="344.0" text-anchor="end" fill="currentColor" font-size="11">-3</text>
<line x1="66" y1="290.0" x2="70" y2="290.0" stroke="currentColor"/>
<text x="63.0" y="294.0" text-anchor="end" fill="currentColor" font-size="11">-2</text>
<line x1="66" y1="240.0" x2="70" y2="240.0" stroke="currentColor"/>
<text x="63.0" y="244.0" text-anchor="end" fill="currentColor" font-size="11">-1</text>
<line x1="66" y1="190.0" x2="70" y2="190.0" stroke="currentColor"/>
<text x="63.0" y="194.0" text-anchor="end" fill="currentColor" font-size="11">0</text>
<line x1="66" y1="140.0" x2="70" y2="140.0" stroke="currentColor"/>
<text x="63.0" y="144.0" text-anchor="end" fill="currentColor" font-size="11">1</text>
<line x1="66" y1="90.0" x2="70" y2="90.0" stroke="currentColor"/>
<text x="63.0" y="94.0" text-anchor="end" fill="currentColor" font-size="11">2</text>
<line x1="66" y1="40.0" x2="70" y2="40.0" stroke="currentColor"/>
<text x="63.0" y="44.0" text-anchor="end" fill="currentColor" font-size="11">3</text>
<text x="290.0" y="374.0" text-anchor="middle" fill="currentColor" font-size="12">genitore medio: z = (x − media) / σ</text>
<text x="32.0" y="190.0" text-anchor="middle" fill="currentColor" font-size="12" transform="rotate(-90 32 190.0)">figlio: z</text>
<g fill="#4051b5" fill-opacity="0.3"><circle cx="385.1" cy="309.6" r="1.8"/><circle cx="314.2" cy="309.0" r="1.8"/><circle cx="186.0" cy="320.6" r="1.8"/><circle cx="122.4" cy="321.3" r="1.8"/><circle cx="104.9" cy="308.2" r="1.8"/><circle cx="272.2" cy="306.9" r="1.8"/><circle cx="236.5" cy="315.0" r="1.8"/><circle cx="270.0" cy="316.0" r="1.8"/><circle cx="228.0" cy="297.2" r="1.8"/><circle cx="214.5" cy="305.4" r="1.8"/><circle cx="207.7" cy="315.8" r="1.8"/><circle cx="124.6" cy="306.8" r="1.8"/><circle cx="369.9" cy="287.0" r="1.8"/><circle cx="336.7" cy="288.4" r="1.8"/><circle cx="298.1" cy="278.2" r="1.8"/><circle cx="300.1" cy="278.2" r="1.8"/><circle cx="318.2" cy="294.6" r="1.8"/><circle cx="309.9" cy="294.0" r="1.8"/><circle cx="302.9" cy="289.0" r="1.8"/><circle cx="317.9" cy="280.5" r="1.8"/><circle cx="286.2" cy="284.7" r="1.8"/><circle cx="242.9" cy="282.6" r="1.8"/><circle cx="261.4" cy="285.6" r="1.8"/><circle cx="238.1" cy="292.9" r="1.8"/><circle cx="237.8" cy="280.8" r="1.8"/><circle cx="257.4" cy="296.8" r="1.8"/><circle cx="214.4" cy="283.2" r="1.8"/><circle cx="232.9" cy="293.2" r="1.8"/><circle cx="221.1" cy="287.7" r="1.8"/><circle cx="175.3" cy="277.7" r="1.8"/><circle cx="174.6" cy="286.3" r="1.8"/><circle cx="164.4" cy="295.9" r="1.8"/><circle cx="154.7" cy="288.5" r="1.8"/><circle cx="162.1" cy="283.9" r="1.8"/><circle cx="182.6" cy="295.9" r="1.8"/><circle cx="162.4" cy="292.0" r="1.8"/><circle cx="169.4" cy="296.7" r="1.8"/><circle cx="154.3" cy="286.3" r="1.8"/><circle cx="147.2" cy="289.5" r="1.8"/><circle cx="119.5" cy="287.1" r="1.8"/><circle cx="124.1" cy="291.2" r="1.8"/><circle cx="149.3" cy="284.0" r="1.8"/><circle cx="113.5" cy="293.6" r="1.8"/><circle cx="127.4" cy="279.0" r="1.8"/><circle cx="344.7" cy="258.1" r="1.8"/><circle cx="348.9" cy="267.4" r="1.8"/><circle cx="322.2" cy="267.9" r="1.8"/><circle cx="340.6" cy="260.1" r="1.8"/><circle cx="339.2" cy="271.4" r="1.8"/><circle cx="354.2" cy="261.2" r="1.8"/><circle cx="333.2" cy="271.5" r="1.8"/><circle cx="343.0" cy="262.9" r="1.8"/><circle cx="320.8" cy="270.6" r="1.8"/><circle cx="334.3" cy="265.2" r="1.8"/><circle cx="331.7" cy="258.8" r="1.8"/><circle cx="324.6" cy="276.1" r="1.8"/><circle cx="351.9" cy="261.2" r="1.8"/><circle cx="334.0" cy="266.4" r="1.8"/><circle cx="358.6" cy="269.7" r="1.8"/><circle cx="342.6" cy="270.2" r="1.8"/><circle cx="302.2" cy="275.8" r="1.8"/><circle cx="303.5" cy="272.1" r="1.8"/><circle cx="305.1" cy="264.8" r="1.8"/><circle cx="283.5" cy="275.3" r="1.8"/><circle cx="295.4" cy="263.9" r="1.8"/><circle cx="287.2" cy="258.1" r="1.8"/><circle cx="293.9" cy="257.7" r="1.8"/><circle cx="281.3" cy="259.5" r="1.8"/><circle cx="317.1" cy="261.2" r="1.8"/><circle cx="286.2" cy="273.7" r="1.8"/><circle cx="304.9" cy="257.9" r="1.8"/><circle cx="248.6" cy="273.2" r="1.8"/><circle cx="272.2" cy="259.9" r="1.8"/><circle cx="263.5" cy="259.7" r="1.8"/><circle cx="241.7" cy="264.8" r="1.8"/><circle cx="271.0" cy="266.8" r="1.8"/><circle cx="275.1" cy="273.2" r="1.8"/><circle cx="273.4" cy="266.9" r="1.8"/><circle cx="259.7" cy="271.4" r="1.8"/><circle cx="242.3" cy="274.7" r="1.8"/><circle cx="244.2" cy="274.6" r="1.8"/><circle cx="274.4" cy="261.3" r="1.8"/><circle cx="259.0" cy="258.9" r="1.8"/><circle cx="243.7" cy="274.4" r="1.8"/><circle cx="272.6" cy="276.9" r="1.8"/><circle cx="221.6" cy="272.0" r="1.8"/><circle cx="218.6" cy="274.5" r="1.8"/><circle cx="210.7" cy="273.4" r="1.8"/><circle cx="212.1" cy="265.6" r="1.8"/><circle cx="205.1" cy="268.8" r="1.8"/><circle cx="155.8" cy="268.7" r="1.8"/><circle cx="190.2" cy="273.1" r="1.8"/><circle cx="173.4" cy="264.0" r="1.8"/><circle cx="176.7" cy="271.4" r="1.8"/><circle cx="167.4" cy="269.3" r="1.8"/><circle cx="144.0" cy="268.0" r="1.8"/><circle cx="114.2" cy="259.2" r="1.8"/><circle cx="128.4" cy="272.3" r="1.8"/><circle cx="114.4" cy="262.9" r="1.8"/><circle cx="97.7" cy="271.0" r="1.8"/><circle cx="132.3" cy="259.4" r="1.8"/><circle cx="119.6" cy="269.4" r="1.8"/><circle cx="110.2" cy="267.2" r="1.8"/><circle cx="422.0" cy="239.9" r="1.8"/><circle cx="395.3" cy="244.0" r="1.8"/><circle cx="332.5" cy="255.4" r="1.8"/><circle cx="342.6" cy="254.6" r="1.8"/><circle cx="346.5" cy="237.6" r="1.8"/><circle cx="333.0" cy="256.7" r="1.8"/><circle cx="298.7" cy="251.3" r="1.8"/><circle cx="308.8" cy="238.3" r="1.8"/><circle cx="314.7" cy="257.0" r="1.8"/><circle cx="283.5" cy="254.1" r="1.8"/><circle cx="315.7" cy="253.1" r="1.8"/><circle cx="277.6" cy="255.6" r="1.8"/><circle cx="308.3" cy="247.9" r="1.8"/><circle cx="310.6" cy="245.6" r="1.8"/><circle cx="283.0" cy="251.0" r="1.8"/><circle cx="294.5" cy="255.2" r="1.8"/><circle cx="310.8" cy="241.2" r="1.8"/><circle cx="277.9" cy="241.3" r="1.8"/><circle cx="303.1" cy="246.2" r="1.8"/><circle cx="309.9" cy="254.6" r="1.8"/><circle cx="298.4" cy="246.6" r="1.8"/><circle cx="307.1" cy="244.8" r="1.8"/><circle cx="245.6" cy="248.8" r="1.8"/><circle cx="244.4" cy="240.2" r="1.8"/><circle cx="251.2" cy="249.6" r="1.8"/><circle cx="243.7" cy="247.2" r="1.8"/><circle cx="250.5" cy="255.1" r="1.8"/><circle cx="275.2" cy="246.1" r="1.8"/><circle cx="259.8" cy="242.1" r="1.8"/><circle cx="250.3" cy="242.8" r="1.8"/><circle cx="247.4" cy="252.2" r="1.8"/><circle cx="275.4" cy="237.6" r="1.8"/><circle cx="254.5" cy="243.0" r="1.8"/><circle cx="276.5" cy="248.9" r="1.8"/><circle cx="257.5" cy="249.1" r="1.8"/><circle cx="257.7" cy="241.8" r="1.8"/><circle cx="273.1" cy="253.8" r="1.8"/><circle cx="225.7" cy="244.6" r="1.8"/><circle cx="219.1" cy="243.0" r="1.8"/><circle cx="171.7" cy="247.1" r="1.8"/><circle cx="190.2" cy="240.0" r="1.8"/><circle cx="171.1" cy="248.0" r="1.8"/><circle cx="192.1" cy="248.1" r="1.8"/><circle cx="157.0" cy="251.7" r="1.8"/><circle cx="171.8" cy="239.1" r="1.8"/><circle cx="175.5" cy="251.0" r="1.8"/><circle cx="152.2" cy="243.5" r="1.8"/><circle cx="102.9" cy="249.2" r="1.8"/><circle cx="433.6" cy="218.9" r="1.8"/><circle cx="428.3" cy="218.6" r="1.8"/><circle cx="429.9" cy="236.9" r="1.8"/><circle cx="385.3" cy="217.7" r="1.8"/><circle cx="358.3" cy="225.4" r="1.8"/><circle cx="332.1" cy="236.0" r="1.8"/><circle cx="334.7" cy="227.6" r="1.8"/><circle cx="326.7" cy="236.5" r="1.8"/><circle cx="320.5" cy="226.5" r="1.8"/><circle cx="327.1" cy="233.8" r="1.8"/><circle cx="356.0" cy="230.1" r="1.8"/><circle cx="352.9" cy="231.4" r="1.8"/><circle cx="323.0" cy="225.5" r="1.8"/><circle cx="343.2" cy="221.1" r="1.8"/><circle cx="338.1" cy="218.8" r="1.8"/><circle cx="342.8" cy="230.9" r="1.8"/><circle cx="345.5" cy="226.1" r="1.8"/><circle cx="331.0" cy="237.3" r="1.8"/><circle cx="357.9" cy="230.1" r="1.8"/><circle cx="337.5" cy="218.4" r="1.8"/><circle cx="344.2" cy="235.1" r="1.8"/><circle cx="303.4" cy="220.2" r="1.8"/><circle cx="284.9" cy="224.5" r="1.8"/><circle cx="279.9" cy="231.6" r="1.8"/><circle cx="294.2" cy="222.0" r="1.8"/><circle cx="308.7" cy="231.7" r="1.8"/><circle cx="310.8" cy="219.7" r="1.8"/><circle cx="307.3" cy="235.8" r="1.8"/><circle cx="282.0" cy="235.1" r="1.8"/><circle cx="314.8" cy="222.6" r="1.8"/><circle cx="310.3" cy="228.5" r="1.8"/><circle cx="313.4" cy="234.5" r="1.8"/><circle cx="298.8" cy="227.3" r="1.8"/><circle cx="314.9" cy="231.6" r="1.8"/><circle cx="279.3" cy="226.5" r="1.8"/><circle cx="278.6" cy="222.7" r="1.8"/><circle cx="278.2" cy="220.4" r="1.8"/><circle cx="287.7" cy="236.3" r="1.8"/><circle cx="287.6" cy="225.7" r="1.8"/><circle cx="285.0" cy="217.9" r="1.8"/><circle cx="300.6" cy="228.3" r="1.8"/><circle cx="278.9" cy="222.2" r="1.8"/><circle cx="301.6" cy="235.5" r="1.8"/><circle cx="284.2" cy="220.1" r="1.8"/><circle cx="305.2" cy="225.9" r="1.8"/><circle cx="278.2" cy="219.8" r="1.8"/><circle cx="249.0" cy="221.8" r="1.8"/><circle cx="274.8" cy="220.2" r="1.8"/><circle cx="258.4" cy="236.3" r="1.8"/><circle cx="269.6" cy="223.2" r="1.8"/><circle cx="263.3" cy="233.5" r="1.8"/><circle cx="261.4" cy="232.2" r="1.8"/><circle cx="244.1" cy="231.0" r="1.8"/><circle cx="259.9" cy="225.7" r="1.8"/><circle cx="237.9" cy="225.0" r="1.8"/><circle cx="269.2" cy="218.9" r="1.8"/><circle cx="275.7" cy="237.2" r="1.8"/><circle cx="271.4" cy="233.6" r="1.8"/><circle cx="238.4" cy="230.3" r="1.8"/><circle cx="250.2" cy="221.2" r="1.8"/><circle cx="249.4" cy="226.5" r="1.8"/><circle cx="240.9" cy="227.3" r="1.8"/><circle cx="262.0" cy="222.4" r="1.8"/><circle cx="269.0" cy="224.4" r="1.8"/><circle cx="249.2" cy="231.7" r="1.8"/><circle cx="271.7" cy="235.7" r="1.8"/><circle cx="269.0" cy="228.3" r="1.8"/><circle cx="241.6" cy="220.0" r="1.8"/><circle cx="267.8" cy="225.6" r="1.8"/><circle cx="272.5" cy="236.4" r="1.8"/><circle cx="244.4" cy="228.7" r="1.8"/><circle cx="259.8" cy="229.8" r="1.8"/><circle cx="262.5" cy="225.9" r="1.8"/><circle cx="261.3" cy="225.8" r="1.8"/><circle cx="240.2" cy="218.6" r="1.8"/><circle cx="263.4" cy="230.7" r="1.8"/><circle cx="262.2" cy="229.3" r="1.8"/><circle cx="270.1" cy="225.3" r="1.8"/><circle cx="269.3" cy="219.8" r="1.8"/><circle cx="249.7" cy="223.4" r="1.8"/><circle cx="265.9" cy="228.1" r="1.8"/><circle cx="271.9" cy="221.3" r="1.8"/><circle cx="231.9" cy="227.8" r="1.8"/><circle cx="201.9" cy="218.3" r="1.8"/><circle cx="196.3" cy="231.8" r="1.8"/><circle cx="222.0" cy="234.9" r="1.8"/><circle cx="204.1" cy="221.0" r="1.8"/><circle cx="218.4" cy="231.5" r="1.8"/><circle cx="234.0" cy="220.6" r="1.8"/><circle cx="210.8" cy="225.3" r="1.8"/><circle cx="205.6" cy="227.3" r="1.8"/><circle cx="214.0" cy="235.7" r="1.8"/><circle cx="222.2" cy="221.8" r="1.8"/><circle cx="199.4" cy="236.1" r="1.8"/><circle cx="210.9" cy="218.3" r="1.8"/><circle cx="200.7" cy="220.0" r="1.8"/><circle cx="222.4" cy="231.4" r="1.8"/><circle cx="229.3" cy="234.9" r="1.8"/><circle cx="210.7" cy="219.9" r="1.8"/><circle cx="169.5" cy="227.9" r="1.8"/><circle cx="176.3" cy="235.0" r="1.8"/><circle cx="163.0" cy="227.5" r="1.8"/><circle cx="164.4" cy="232.6" r="1.8"/><circle cx="167.7" cy="229.4" r="1.8"/><circle cx="173.0" cy="224.7" r="1.8"/><circle cx="157.5" cy="219.3" r="1.8"/><circle cx="185.1" cy="221.5" r="1.8"/><circle cx="178.0" cy="234.3" r="1.8"/><circle cx="166.5" cy="228.0" r="1.8"/><circle cx="157.4" cy="227.7" r="1.8"/><circle cx="144.5" cy="217.8" r="1.8"/><circle cx="118.5" cy="235.7" r="1.8"/><circle cx="118.6" cy="227.3" r="1.8"/><circle cx="118.5" cy="219.3" r="1.8"/><circle cx="116.5" cy="229.5" r="1.8"/><circle cx="129.8" cy="232.3" r="1.8"/><circle cx="103.7" cy="226.4" r="1.8"/><circle cx="413.1" cy="211.2" r="1.8"/><circle cx="434.7" cy="199.2" r="1.8"/><circle cx="426.0" cy="215.9" r="1.8"/><circle cx="408.2" cy="213.5" r="1.8"/><circle cx="377.3" cy="215.9" r="1.8"/><circle cx="395.7" cy="203.4" r="1.8"/><circle cx="374.9" cy="211.8" r="1.8"/><circle cx="347.6" cy="199.7" r="1.8"/><circle cx="322.4" cy="199.8" r="1.8"/><circle cx="348.3" cy="199.0" r="1.8"/><circle cx="350.3" cy="212.5" r="1.8"/><circle cx="352.3" cy="217.6" r="1.8"/><circle cx="346.1" cy="209.9" r="1.8"/><circle cx="333.6" cy="198.5" r="1.8"/><circle cx="321.0" cy="202.4" r="1.8"/><circle cx="339.7" cy="216.4" r="1.8"/><circle cx="349.5" cy="203.6" r="1.8"/><circle cx="326.2" cy="199.4" r="1.8"/><circle cx="329.3" cy="198.4" r="1.8"/><circle cx="340.4" cy="203.4" r="1.8"/><circle cx="349.1" cy="200.4" r="1.8"/><circle cx="355.2" cy="200.9" r="1.8"/><circle cx="323.6" cy="210.5" r="1.8"/><circle cx="326.0" cy="215.6" r="1.8"/><circle cx="351.2" cy="203.1" r="1.8"/><circle cx="344.9" cy="214.9" r="1.8"/><circle cx="348.0" cy="210.0" r="1.8"/><circle cx="359.3" cy="197.8" r="1.8"/><circle cx="357.0" cy="206.5" r="1.8"/><circle cx="353.0" cy="207.2" r="1.8"/><circle cx="350.3" cy="198.8" r="1.8"/><circle cx="334.6" cy="211.9" r="1.8"/><circle cx="344.7" cy="197.7" r="1.8"/><circle cx="326.0" cy="199.5" r="1.8"/><circle cx="308.5" cy="210.4" r="1.8"/><circle cx="308.5" cy="211.1" r="1.8"/><circle cx="307.0" cy="215.1" r="1.8"/><circle cx="295.6" cy="199.4" r="1.8"/><circle cx="292.9" cy="213.9" r="1.8"/><circle cx="294.6" cy="217.4" r="1.8"/><circle cx="278.7" cy="199.9" r="1.8"/><circle cx="312.0" cy="205.7" r="1.8"/><circle cx="299.6" cy="204.2" r="1.8"/><circle cx="293.3" cy="203.0" r="1.8"/><circle cx="299.8" cy="216.7" r="1.8"/><circle cx="307.0" cy="215.8" r="1.8"/><circle cx="293.0" cy="207.7" r="1.8"/><circle cx="311.4" cy="216.6" r="1.8"/><circle cx="315.1" cy="207.6" r="1.8"/><circle cx="293.3" cy="203.0" r="1.8"/><circle cx="283.0" cy="204.5" r="1.8"/><circle cx="308.6" cy="205.3" r="1.8"/><circle cx="318.1" cy="216.7" r="1.8"/><circle cx="283.4" cy="212.9" r="1.8"/><circle cx="306.6" cy="199.8" r="1.8"/><circle cx="311.2" cy="215.1" r="1.8"/><circle cx="315.1" cy="207.0" r="1.8"/><circle cx="282.4" cy="216.6" r="1.8"/><circle cx="281.1" cy="198.9" r="1.8"/><circle cx="317.9" cy="214.2" r="1.8"/><circle cx="282.1" cy="209.4" r="1.8"/><circle cx="284.6" cy="206.7" r="1.8"/><circle cx="301.0" cy="203.3" r="1.8"/><circle cx="295.7" cy="199.0" r="1.8"/><circle cx="308.2" cy="203.0" r="1.8"/><circle cx="244.1" cy="210.7" r="1.8"/><circle cx="273.8" cy="216.1" r="1.8"/><circle cx="245.2" cy="203.5" r="1.8"/><circle cx="267.9" cy="198.3" r="1.8"/><circle cx="239.1" cy="217.2" r="1.8"/><circle cx="255.7" cy="202.2" r="1.8"/><circle cx="237.6" cy="214.1" r="1.8"/><circle cx="249.2" cy="208.4" r="1.8"/><circle cx="249.1" cy="207.2" r="1.8"/><circle cx="265.8" cy="205.4" r="1.8"/><circle cx="255.0" cy="197.9" r="1.8"/><circle cx="238.6" cy="203.9" r="1.8"/><circle cx="277.2" cy="209.8" r="1.8"/><circle cx="272.8" cy="203.4" r="1.8"/><circle cx="273.9" cy="208.3" r="1.8"/><circle cx="246.4" cy="209.4" r="1.8"/><circle cx="252.5" cy="210.3" r="1.8"/><circle cx="245.6" cy="207.8" r="1.8"/><circle cx="241.4" cy="212.0" r="1.8"/><circle cx="237.7" cy="212.8" r="1.8"/><circle cx="257.0" cy="214.6" r="1.8"/><circle cx="241.4" cy="208.8" r="1.8"/><circle cx="243.5" cy="211.8" r="1.8"/><circle cx="271.6" cy="201.0" r="1.8"/><circle cx="256.2" cy="200.7" r="1.8"/><circle cx="243.8" cy="210.8" r="1.8"/><circle cx="263.8" cy="205.3" r="1.8"/><circle cx="247.2" cy="199.7" r="1.8"/><circle cx="257.9" cy="210.5" r="1.8"/><circle cx="247.9" cy="206.6" r="1.8"/><circle cx="257.5" cy="208.8" r="1.8"/><circle cx="262.1" cy="204.7" r="1.8"/><circle cx="258.3" cy="198.5" r="1.8"/><circle cx="252.5" cy="214.8" r="1.8"/><circle cx="268.8" cy="198.4" r="1.8"/><circle cx="272.2" cy="204.4" r="1.8"/><circle cx="243.7" cy="201.8" r="1.8"/><circle cx="241.9" cy="205.0" r="1.8"/><circle cx="199.9" cy="200.3" r="1.8"/><circle cx="235.5" cy="211.1" r="1.8"/><circle cx="233.9" cy="203.5" r="1.8"/><circle cx="204.7" cy="212.3" r="1.8"/><circle cx="235.1" cy="207.5" r="1.8"/><circle cx="203.8" cy="204.0" r="1.8"/><circle cx="216.0" cy="213.6" r="1.8"/><circle cx="215.7" cy="216.4" r="1.8"/><circle cx="232.8" cy="201.9" r="1.8"/><circle cx="196.9" cy="201.5" r="1.8"/><circle cx="208.2" cy="204.4" r="1.8"/><circle cx="219.9" cy="211.2" r="1.8"/><circle cx="198.0" cy="204.5" r="1.8"/><circle cx="205.0" cy="215.9" r="1.8"/><circle cx="214.3" cy="204.4" r="1.8"/><circle cx="231.4" cy="206.1" r="1.8"/><circle cx="226.5" cy="205.3" r="1.8"/><circle cx="188.2" cy="208.7" r="1.8"/><circle cx="185.4" cy="213.1" r="1.8"/><circle cx="183.2" cy="203.2" r="1.8"/><circle cx="189.1" cy="208.4" r="1.8"/><circle cx="182.2" cy="202.8" r="1.8"/><circle cx="184.4" cy="210.4" r="1.8"/><circle cx="166.6" cy="215.8" r="1.8"/><circle cx="161.1" cy="206.8" r="1.8"/><circle cx="185.3" cy="205.2" r="1.8"/><circle cx="161.0" cy="199.3" r="1.8"/><circle cx="191.9" cy="199.9" r="1.8"/><circle cx="137.6" cy="216.5" r="1.8"/><circle cx="126.7" cy="202.3" r="1.8"/><circle cx="151.6" cy="212.4" r="1.8"/><circle cx="119.5" cy="203.7" r="1.8"/><circle cx="134.3" cy="210.0" r="1.8"/><circle cx="96.4" cy="211.2" r="1.8"/><circle cx="132.2" cy="207.9" r="1.8"/><circle cx="465.2" cy="187.2" r="1.8"/><circle cx="433.5" cy="183.9" r="1.8"/><circle cx="412.1" cy="185.0" r="1.8"/><circle cx="433.4" cy="184.2" r="1.8"/><circle cx="388.3" cy="190.1" r="1.8"/><circle cx="385.9" cy="184.3" r="1.8"/><circle cx="398.5" cy="190.9" r="1.8"/><circle cx="377.2" cy="185.6" r="1.8"/><circle cx="376.5" cy="188.6" r="1.8"/><circle cx="387.9" cy="186.5" r="1.8"/><circle cx="393.7" cy="197.4" r="1.8"/><circle cx="373.2" cy="187.8" r="1.8"/><circle cx="386.9" cy="193.3" r="1.8"/><circle cx="368.0" cy="190.1" r="1.8"/><circle cx="382.1" cy="196.3" r="1.8"/><circle cx="391.0" cy="184.7" r="1.8"/><circle cx="321.1" cy="180.0" r="1.8"/><circle cx="348.3" cy="190.7" r="1.8"/><circle cx="319.0" cy="195.6" r="1.8"/><circle cx="357.7" cy="185.4" r="1.8"/><circle cx="337.6" cy="195.2" r="1.8"/><circle cx="335.2" cy="180.0" r="1.8"/><circle cx="348.0" cy="195.3" r="1.8"/><circle cx="339.9" cy="190.5" r="1.8"/><circle cx="348.4" cy="187.9" r="1.8"/><circle cx="321.9" cy="195.4" r="1.8"/><circle cx="341.5" cy="191.4" r="1.8"/><circle cx="341.3" cy="192.2" r="1.8"/><circle cx="356.7" cy="183.5" r="1.8"/><circle cx="320.0" cy="178.1" r="1.8"/><circle cx="337.0" cy="190.5" r="1.8"/><circle cx="344.3" cy="182.0" r="1.8"/><circle cx="341.0" cy="194.9" r="1.8"/><circle cx="321.4" cy="186.2" r="1.8"/><circle cx="342.8" cy="189.1" r="1.8"/><circle cx="327.5" cy="192.0" r="1.8"/><circle cx="285.4" cy="181.4" r="1.8"/><circle cx="313.4" cy="182.9" r="1.8"/><circle cx="285.5" cy="195.1" r="1.8"/><circle cx="296.0" cy="191.9" r="1.8"/><circle cx="308.1" cy="181.4" r="1.8"/><circle cx="306.4" cy="178.0" r="1.8"/><circle cx="300.1" cy="185.6" r="1.8"/><circle cx="310.5" cy="180.4" r="1.8"/><circle cx="296.5" cy="178.2" r="1.8"/><circle cx="302.8" cy="183.0" r="1.8"/><circle cx="311.0" cy="184.9" r="1.8"/><circle cx="305.2" cy="193.3" r="1.8"/><circle cx="303.7" cy="190.4" r="1.8"/><circle cx="294.0" cy="185.3" r="1.8"/><circle cx="300.3" cy="179.3" r="1.8"/><circle cx="293.6" cy="191.7" r="1.8"/><circle cx="307.9" cy="189.9" r="1.8"/><circle cx="293.0" cy="197.3" r="1.8"/><circle cx="296.5" cy="183.9" r="1.8"/><circle cx="308.4" cy="188.9" r="1.8"/><circle cx="298.0" cy="181.9" r="1.8"/><circle cx="291.2" cy="193.1" r="1.8"/><circle cx="311.3" cy="184.6" r="1.8"/><circle cx="293.0" cy="184.3" r="1.8"/><circle cx="312.0" cy="188.5" r="1.8"/><circle cx="309.6" cy="194.0" r="1.8"/><circle cx="295.7" cy="189.7" r="1.8"/><circle cx="306.6" cy="182.9" r="1.8"/><circle cx="278.8" cy="194.0" r="1.8"/><circle cx="293.4" cy="195.9" r="1.8"/><circle cx="312.7" cy="188.5" r="1.8"/><circle cx="301.1" cy="193.1" r="1.8"/><circle cx="300.2" cy="181.8" r="1.8"/><circle cx="304.6" cy="181.5" r="1.8"/><circle cx="264.1" cy="178.9" r="1.8"/><circle cx="260.3" cy="181.0" r="1.8"/><circle cx="253.6" cy="184.9" r="1.8"/><circle cx="243.8" cy="194.0" r="1.8"/><circle cx="248.3" cy="181.4" r="1.8"/><circle cx="248.3" cy="183.3" r="1.8"/><circle cx="254.0" cy="182.9" r="1.8"/><circle cx="277.3" cy="183.9" r="1.8"/><circle cx="250.8" cy="181.2" r="1.8"/><circle cx="254.7" cy="191.8" r="1.8"/><circle cx="251.6" cy="184.4" r="1.8"/><circle cx="260.2" cy="187.4" r="1.8"/><circle cx="275.2" cy="191.0" r="1.8"/><circle cx="272.8" cy="191.2" r="1.8"/><circle cx="251.8" cy="194.6" r="1.8"/><circle cx="247.3" cy="188.0" r="1.8"/><circle cx="272.6" cy="190.4" r="1.8"/><circle cx="256.6" cy="189.3" r="1.8"/><circle cx="264.4" cy="180.8" r="1.8"/><circle cx="239.3" cy="184.2" r="1.8"/><circle cx="271.9" cy="184.2" r="1.8"/><circle cx="249.1" cy="178.2" r="1.8"/><circle cx="256.6" cy="193.4" r="1.8"/><circle cx="244.4" cy="187.6" r="1.8"/><circle cx="253.5" cy="195.9" r="1.8"/><circle cx="270.3" cy="189.9" r="1.8"/><circle cx="270.3" cy="178.8" r="1.8"/><circle cx="255.7" cy="196.0" r="1.8"/><circle cx="226.8" cy="182.7" r="1.8"/><circle cx="214.0" cy="180.5" r="1.8"/><circle cx="210.6" cy="187.6" r="1.8"/><circle cx="217.7" cy="181.9" r="1.8"/><circle cx="203.5" cy="189.0" r="1.8"/><circle cx="208.2" cy="190.7" r="1.8"/><circle cx="224.2" cy="187.7" r="1.8"/><circle cx="226.9" cy="193.8" r="1.8"/><circle cx="197.6" cy="191.6" r="1.8"/><circle cx="225.3" cy="191.7" r="1.8"/><circle cx="228.8" cy="178.1" r="1.8"/><circle cx="213.5" cy="191.1" r="1.8"/><circle cx="197.8" cy="193.2" r="1.8"/><circle cx="223.3" cy="179.0" r="1.8"/><circle cx="164.3" cy="195.0" r="1.8"/><circle cx="180.6" cy="178.5" r="1.8"/><circle cx="169.7" cy="180.8" r="1.8"/><circle cx="180.4" cy="184.9" r="1.8"/><circle cx="164.8" cy="189.2" r="1.8"/><circle cx="173.8" cy="193.8" r="1.8"/><circle cx="175.7" cy="195.6" r="1.8"/><circle cx="118.5" cy="195.7" r="1.8"/><circle cx="449.9" cy="170.9" r="1.8"/><circle cx="481.0" cy="169.8" r="1.8"/><circle cx="412.4" cy="159.5" r="1.8"/><circle cx="413.1" cy="167.2" r="1.8"/><circle cx="411.0" cy="158.2" r="1.8"/><circle cx="403.3" cy="163.5" r="1.8"/><circle cx="417.9" cy="174.9" r="1.8"/><circle cx="391.1" cy="166.9" r="1.8"/><circle cx="388.6" cy="174.7" r="1.8"/><circle cx="367.5" cy="177.1" r="1.8"/><circle cx="365.1" cy="159.1" r="1.8"/><circle cx="372.6" cy="171.1" r="1.8"/><circle cx="391.0" cy="174.1" r="1.8"/><circle cx="379.5" cy="175.8" r="1.8"/><circle cx="397.3" cy="164.9" r="1.8"/><circle cx="386.4" cy="168.7" r="1.8"/><circle cx="384.9" cy="177.6" r="1.8"/><circle cx="391.0" cy="163.6" r="1.8"/><circle cx="390.3" cy="172.8" r="1.8"/><circle cx="373.6" cy="162.3" r="1.8"/><circle cx="370.0" cy="168.1" r="1.8"/><circle cx="377.4" cy="167.2" r="1.8"/><circle cx="379.5" cy="168.8" r="1.8"/><circle cx="365.3" cy="164.4" r="1.8"/><circle cx="377.6" cy="158.2" r="1.8"/><circle cx="344.7" cy="162.0" r="1.8"/><circle cx="324.0" cy="176.5" r="1.8"/><circle cx="324.1" cy="168.0" r="1.8"/><circle cx="325.5" cy="173.2" r="1.8"/><circle cx="330.0" cy="175.8" r="1.8"/><circle cx="357.9" cy="174.0" r="1.8"/><circle cx="319.5" cy="172.9" r="1.8"/><circle cx="325.9" cy="158.8" r="1.8"/><circle cx="325.2" cy="163.1" r="1.8"/><circle cx="337.9" cy="160.9" r="1.8"/><circle cx="319.0" cy="164.0" r="1.8"/><circle cx="337.2" cy="171.6" r="1.8"/><circle cx="325.1" cy="170.1" r="1.8"/><circle cx="329.5" cy="169.1" r="1.8"/><circle cx="350.9" cy="172.0" r="1.8"/><circle cx="326.0" cy="169.5" r="1.8"/><circle cx="343.7" cy="162.5" r="1.8"/><circle cx="335.1" cy="176.3" r="1.8"/><circle cx="335.5" cy="172.4" r="1.8"/><circle cx="351.9" cy="168.3" r="1.8"/><circle cx="325.0" cy="164.4" r="1.8"/><circle cx="356.3" cy="165.0" r="1.8"/><circle cx="355.1" cy="163.4" r="1.8"/><circle cx="345.8" cy="175.8" r="1.8"/><circle cx="320.4" cy="174.3" r="1.8"/><circle cx="345.6" cy="171.7" r="1.8"/><circle cx="343.0" cy="172.3" r="1.8"/><circle cx="350.1" cy="162.8" r="1.8"/><circle cx="327.2" cy="158.1" r="1.8"/><circle cx="357.5" cy="164.3" r="1.8"/><circle cx="354.8" cy="177.2" r="1.8"/><circle cx="323.1" cy="171.9" r="1.8"/><circle cx="331.3" cy="161.9" r="1.8"/><circle cx="278.7" cy="159.5" r="1.8"/><circle cx="311.5" cy="166.0" r="1.8"/><circle cx="314.9" cy="170.9" r="1.8"/><circle cx="318.0" cy="170.8" r="1.8"/><circle cx="302.5" cy="165.3" r="1.8"/><circle cx="304.7" cy="160.7" r="1.8"/><circle cx="305.2" cy="171.1" r="1.8"/><circle cx="300.8" cy="174.1" r="1.8"/><circle cx="316.4" cy="177.8" r="1.8"/><circle cx="302.3" cy="175.1" r="1.8"/><circle cx="291.1" cy="160.9" r="1.8"/><circle cx="298.4" cy="165.4" r="1.8"/><circle cx="278.1" cy="158.2" r="1.8"/><circle cx="307.1" cy="176.5" r="1.8"/><circle cx="305.8" cy="170.6" r="1.8"/><circle cx="294.6" cy="162.0" r="1.8"/><circle cx="312.3" cy="164.7" r="1.8"/><circle cx="308.4" cy="176.5" r="1.8"/><circle cx="291.2" cy="169.9" r="1.8"/><circle cx="280.5" cy="165.2" r="1.8"/><circle cx="282.8" cy="164.2" r="1.8"/><circle cx="284.9" cy="168.9" r="1.8"/><circle cx="289.8" cy="174.1" r="1.8"/><circle cx="295.7" cy="158.7" r="1.8"/><circle cx="315.4" cy="168.6" r="1.8"/><circle cx="288.8" cy="163.6" r="1.8"/><circle cx="314.2" cy="167.2" r="1.8"/><circle cx="305.3" cy="176.2" r="1.8"/><circle cx="312.4" cy="173.1" r="1.8"/><circle cx="293.9" cy="176.6" r="1.8"/><circle cx="277.5" cy="174.1" r="1.8"/><circle cx="309.7" cy="173.9" r="1.8"/><circle cx="287.4" cy="169.6" r="1.8"/><circle cx="283.2" cy="171.5" r="1.8"/><circle cx="310.2" cy="170.6" r="1.8"/><circle cx="305.5" cy="161.6" r="1.8"/><circle cx="286.1" cy="177.4" r="1.8"/><circle cx="288.3" cy="175.8" r="1.8"/><circle cx="315.9" cy="161.8" r="1.8"/><circle cx="288.4" cy="167.2" r="1.8"/><circle cx="306.2" cy="169.1" r="1.8"/><circle cx="282.7" cy="172.5" r="1.8"/><circle cx="310.8" cy="167.1" r="1.8"/><circle cx="282.2" cy="173.4" r="1.8"/><circle cx="298.5" cy="160.8" r="1.8"/><circle cx="278.8" cy="161.5" r="1.8"/><circle cx="299.9" cy="171.5" r="1.8"/><circle cx="312.1" cy="177.4" r="1.8"/><circle cx="239.8" cy="160.2" r="1.8"/><circle cx="247.6" cy="171.9" r="1.8"/><circle cx="267.7" cy="164.8" r="1.8"/><circle cx="261.3" cy="160.8" r="1.8"/><circle cx="249.1" cy="162.0" r="1.8"/><circle cx="262.1" cy="160.7" r="1.8"/><circle cx="255.0" cy="168.1" r="1.8"/><circle cx="271.7" cy="161.1" r="1.8"/><circle cx="248.3" cy="168.7" r="1.8"/><circle cx="267.4" cy="172.6" r="1.8"/><circle cx="262.4" cy="168.3" r="1.8"/><circle cx="266.7" cy="171.2" r="1.8"/><circle cx="251.8" cy="162.6" r="1.8"/><circle cx="266.1" cy="161.3" r="1.8"/><circle cx="265.0" cy="175.0" r="1.8"/><circle cx="252.2" cy="174.6" r="1.8"/><circle cx="237.4" cy="170.2" r="1.8"/><circle cx="275.8" cy="168.6" r="1.8"/><circle cx="265.6" cy="158.8" r="1.8"/><circle cx="244.7" cy="159.1" r="1.8"/><circle cx="266.3" cy="158.6" r="1.8"/><circle cx="247.7" cy="163.4" r="1.8"/><circle cx="255.6" cy="164.4" r="1.8"/><circle cx="271.6" cy="172.5" r="1.8"/><circle cx="254.7" cy="170.4" r="1.8"/><circle cx="248.1" cy="177.8" r="1.8"/><circle cx="248.8" cy="161.3" r="1.8"/><circle cx="239.5" cy="172.4" r="1.8"/><circle cx="245.3" cy="176.3" r="1.8"/><circle cx="247.4" cy="171.6" r="1.8"/><circle cx="243.4" cy="171.4" r="1.8"/><circle cx="238.9" cy="163.5" r="1.8"/><circle cx="255.4" cy="177.7" r="1.8"/><circle cx="245.1" cy="173.3" r="1.8"/><circle cx="266.6" cy="160.0" r="1.8"/><circle cx="274.2" cy="160.9" r="1.8"/><circle cx="247.5" cy="165.4" r="1.8"/><circle cx="259.8" cy="166.7" r="1.8"/><circle cx="216.0" cy="173.4" r="1.8"/><circle cx="198.3" cy="160.5" r="1.8"/><circle cx="200.4" cy="162.7" r="1.8"/><circle cx="231.6" cy="167.7" r="1.8"/><circle cx="214.7" cy="174.7" r="1.8"/><circle cx="228.3" cy="173.6" r="1.8"/><circle cx="198.0" cy="170.3" r="1.8"/><circle cx="219.7" cy="171.3" r="1.8"/><circle cx="230.8" cy="176.6" r="1.8"/><circle cx="230.8" cy="169.8" r="1.8"/><circle cx="195.5" cy="168.9" r="1.8"/><circle cx="216.7" cy="172.1" r="1.8"/><circle cx="210.4" cy="170.2" r="1.8"/><circle cx="185.4" cy="171.2" r="1.8"/><circle cx="157.2" cy="170.4" r="1.8"/><circle cx="165.1" cy="165.6" r="1.8"/><circle cx="187.6" cy="168.0" r="1.8"/><circle cx="173.5" cy="173.9" r="1.8"/><circle cx="172.8" cy="162.0" r="1.8"/><circle cx="194.0" cy="167.7" r="1.8"/><circle cx="126.3" cy="168.7" r="1.8"/><circle cx="114.9" cy="163.7" r="1.8"/><circle cx="108.7" cy="162.9" r="1.8"/><circle cx="447.9" cy="141.1" r="1.8"/><circle cx="403.9" cy="141.9" r="1.8"/><circle cx="423.8" cy="144.7" r="1.8"/><circle cx="439.6" cy="143.7" r="1.8"/><circle cx="424.3" cy="154.9" r="1.8"/><circle cx="427.1" cy="144.1" r="1.8"/><circle cx="413.8" cy="152.9" r="1.8"/><circle cx="423.9" cy="152.9" r="1.8"/><circle cx="431.4" cy="155.6" r="1.8"/><circle cx="424.7" cy="150.1" r="1.8"/><circle cx="433.5" cy="157.6" r="1.8"/><circle cx="382.0" cy="144.9" r="1.8"/><circle cx="367.6" cy="143.1" r="1.8"/><circle cx="383.4" cy="142.6" r="1.8"/><circle cx="379.6" cy="155.4" r="1.8"/><circle cx="366.3" cy="145.2" r="1.8"/><circle cx="384.9" cy="141.3" r="1.8"/><circle cx="393.0" cy="157.3" r="1.8"/><circle cx="365.0" cy="154.1" r="1.8"/><circle cx="381.8" cy="152.7" r="1.8"/><circle cx="389.6" cy="148.8" r="1.8"/><circle cx="376.0" cy="154.6" r="1.8"/><circle cx="370.5" cy="147.3" r="1.8"/><circle cx="374.7" cy="151.1" r="1.8"/><circle cx="381.7" cy="145.0" r="1.8"/><circle cx="346.6" cy="147.4" r="1.8"/><circle cx="341.4" cy="144.3" r="1.8"/><circle cx="322.8" cy="153.1" r="1.8"/><circle cx="352.0" cy="143.9" r="1.8"/><circle cx="356.3" cy="143.4" r="1.8"/><circle cx="322.6" cy="143.6" r="1.8"/><circle cx="328.6" cy="156.6" r="1.8"/><circle cx="325.5" cy="139.2" r="1.8"/><circle cx="353.3" cy="146.5" r="1.8"/><circle cx="355.8" cy="152.6" r="1.8"/><circle cx="320.2" cy="149.4" r="1.8"/><circle cx="332.0" cy="147.7" r="1.8"/><circle cx="326.3" cy="147.7" r="1.8"/><circle cx="337.7" cy="153.1" r="1.8"/><circle cx="356.2" cy="152.7" r="1.8"/><circle cx="321.3" cy="150.8" r="1.8"/><circle cx="325.4" cy="142.5" r="1.8"/><circle cx="338.4" cy="149.3" r="1.8"/><circle cx="339.9" cy="157.2" r="1.8"/><circle cx="349.0" cy="149.0" r="1.8"/><circle cx="336.4" cy="154.0" r="1.8"/><circle cx="324.2" cy="157.7" r="1.8"/><circle cx="332.9" cy="138.6" r="1.8"/><circle cx="358.7" cy="152.1" r="1.8"/><circle cx="349.2" cy="147.3" r="1.8"/><circle cx="282.1" cy="150.9" r="1.8"/><circle cx="310.5" cy="156.9" r="1.8"/><circle cx="290.1" cy="140.1" r="1.8"/><circle cx="309.4" cy="139.4" r="1.8"/><circle cx="277.9" cy="154.3" r="1.8"/><circle cx="313.1" cy="149.7" r="1.8"/><circle cx="284.0" cy="150.6" r="1.8"/><circle cx="296.1" cy="154.7" r="1.8"/><circle cx="304.5" cy="144.8" r="1.8"/><circle cx="298.2" cy="142.4" r="1.8"/><circle cx="284.1" cy="142.9" r="1.8"/><circle cx="283.1" cy="144.6" r="1.8"/><circle cx="289.0" cy="157.6" r="1.8"/><circle cx="279.5" cy="153.4" r="1.8"/><circle cx="286.2" cy="147.8" r="1.8"/><circle cx="282.7" cy="144.0" r="1.8"/><circle cx="296.4" cy="150.3" r="1.8"/><circle cx="292.0" cy="149.1" r="1.8"/><circle cx="301.4" cy="141.3" r="1.8"/><circle cx="288.9" cy="157.5" r="1.8"/><circle cx="278.7" cy="152.6" r="1.8"/><circle cx="249.9" cy="152.2" r="1.8"/><circle cx="267.3" cy="138.3" r="1.8"/><circle cx="246.8" cy="153.5" r="1.8"/><circle cx="252.9" cy="157.0" r="1.8"/><circle cx="267.3" cy="149.7" r="1.8"/><circle cx="253.0" cy="145.1" r="1.8"/><circle cx="272.7" cy="154.9" r="1.8"/><circle cx="274.0" cy="141.3" r="1.8"/><circle cx="249.0" cy="154.1" r="1.8"/><circle cx="266.5" cy="144.0" r="1.8"/><circle cx="246.7" cy="154.8" r="1.8"/><circle cx="242.0" cy="140.5" r="1.8"/><circle cx="254.3" cy="154.0" r="1.8"/><circle cx="261.0" cy="143.5" r="1.8"/><circle cx="274.7" cy="141.3" r="1.8"/><circle cx="242.3" cy="152.9" r="1.8"/><circle cx="265.5" cy="156.1" r="1.8"/><circle cx="255.8" cy="146.3" r="1.8"/><circle cx="241.7" cy="148.1" r="1.8"/><circle cx="235.2" cy="148.5" r="1.8"/><circle cx="223.8" cy="142.5" r="1.8"/><circle cx="200.5" cy="148.8" r="1.8"/><circle cx="232.4" cy="148.1" r="1.8"/><circle cx="158.4" cy="148.3" r="1.8"/><circle cx="158.0" cy="148.9" r="1.8"/><circle cx="167.8" cy="149.9" r="1.8"/><circle cx="192.7" cy="154.8" r="1.8"/><circle cx="155.5" cy="152.1" r="1.8"/><circle cx="479.2" cy="132.9" r="1.8"/><circle cx="466.7" cy="133.2" r="1.8"/><circle cx="403.3" cy="122.6" r="1.8"/><circle cx="423.8" cy="135.8" r="1.8"/><circle cx="419.3" cy="134.0" r="1.8"/><circle cx="423.7" cy="127.7" r="1.8"/><circle cx="389.7" cy="131.9" r="1.8"/><circle cx="387.3" cy="133.3" r="1.8"/><circle cx="400.4" cy="130.7" r="1.8"/><circle cx="365.9" cy="128.1" r="1.8"/><circle cx="392.8" cy="124.7" r="1.8"/><circle cx="376.3" cy="118.8" r="1.8"/><circle cx="391.6" cy="121.2" r="1.8"/><circle cx="355.0" cy="129.6" r="1.8"/><circle cx="359.1" cy="129.1" r="1.8"/><circle cx="329.3" cy="129.9" r="1.8"/><circle cx="337.0" cy="133.4" r="1.8"/><circle cx="357.1" cy="119.2" r="1.8"/><circle cx="357.2" cy="136.7" r="1.8"/><circle cx="333.7" cy="134.0" r="1.8"/><circle cx="357.0" cy="125.0" r="1.8"/><circle cx="335.1" cy="126.4" r="1.8"/><circle cx="333.8" cy="132.6" r="1.8"/><circle cx="349.5" cy="119.5" r="1.8"/><circle cx="337.7" cy="130.0" r="1.8"/><circle cx="336.8" cy="126.3" r="1.8"/><circle cx="334.3" cy="136.3" r="1.8"/><circle cx="336.2" cy="120.4" r="1.8"/><circle cx="324.1" cy="136.1" r="1.8"/><circle cx="320.9" cy="130.3" r="1.8"/><circle cx="349.4" cy="120.5" r="1.8"/><circle cx="341.6" cy="119.3" r="1.8"/><circle cx="346.0" cy="120.2" r="1.8"/><circle cx="310.3" cy="121.7" r="1.8"/><circle cx="286.8" cy="133.5" r="1.8"/><circle cx="286.9" cy="137.5" r="1.8"/><circle cx="288.8" cy="129.1" r="1.8"/><circle cx="289.8" cy="136.9" r="1.8"/><circle cx="308.6" cy="119.0" r="1.8"/><circle cx="292.7" cy="138.0" r="1.8"/><circle cx="290.6" cy="131.6" r="1.8"/><circle cx="303.5" cy="134.1" r="1.8"/><circle cx="285.0" cy="137.8" r="1.8"/><circle cx="281.7" cy="128.2" r="1.8"/><circle cx="306.0" cy="136.6" r="1.8"/><circle cx="308.4" cy="120.2" r="1.8"/><circle cx="289.5" cy="124.5" r="1.8"/><circle cx="303.5" cy="130.8" r="1.8"/><circle cx="278.7" cy="121.4" r="1.8"/><circle cx="293.9" cy="122.3" r="1.8"/><circle cx="301.1" cy="131.6" r="1.8"/><circle cx="246.7" cy="121.3" r="1.8"/><circle cx="250.6" cy="119.6" r="1.8"/><circle cx="261.3" cy="125.8" r="1.8"/><circle cx="260.5" cy="131.1" r="1.8"/><circle cx="242.6" cy="120.2" r="1.8"/><circle cx="265.3" cy="119.4" r="1.8"/><circle cx="239.6" cy="131.2" r="1.8"/><circle cx="276.1" cy="136.4" r="1.8"/><circle cx="244.6" cy="120.9" r="1.8"/><circle cx="246.7" cy="124.9" r="1.8"/><circle cx="244.5" cy="133.5" r="1.8"/><circle cx="194.9" cy="126.8" r="1.8"/><circle cx="166.0" cy="132.0" r="1.8"/><circle cx="486.9" cy="100.0" r="1.8"/><circle cx="482.2" cy="111.4" r="1.8"/><circle cx="480.6" cy="114.3" r="1.8"/><circle cx="443.3" cy="117.4" r="1.8"/><circle cx="463.0" cy="111.4" r="1.8"/><circle cx="466.2" cy="98.6" r="1.8"/><circle cx="470.4" cy="113.9" r="1.8"/><circle cx="455.3" cy="109.1" r="1.8"/><circle cx="414.0" cy="98.9" r="1.8"/><circle cx="400.7" cy="118.1" r="1.8"/><circle cx="401.9" cy="112.4" r="1.8"/><circle cx="423.1" cy="101.9" r="1.8"/><circle cx="403.6" cy="116.3" r="1.8"/><circle cx="408.8" cy="99.8" r="1.8"/><circle cx="414.2" cy="101.7" r="1.8"/><circle cx="403.4" cy="115.4" r="1.8"/><circle cx="401.8" cy="106.5" r="1.8"/><circle cx="397.5" cy="107.2" r="1.8"/><circle cx="377.3" cy="104.5" r="1.8"/><circle cx="367.9" cy="112.1" r="1.8"/><circle cx="388.5" cy="110.6" r="1.8"/><circle cx="318.8" cy="113.5" r="1.8"/><circle cx="328.5" cy="112.4" r="1.8"/><circle cx="357.8" cy="114.8" r="1.8"/><circle cx="355.3" cy="100.3" r="1.8"/><circle cx="344.5" cy="100.6" r="1.8"/><circle cx="322.2" cy="111.1" r="1.8"/><circle cx="331.5" cy="104.5" r="1.8"/><circle cx="319.5" cy="108.5" r="1.8"/><circle cx="327.4" cy="112.7" r="1.8"/><circle cx="319.4" cy="111.3" r="1.8"/><circle cx="323.6" cy="99.1" r="1.8"/><circle cx="303.3" cy="111.5" r="1.8"/><circle cx="281.5" cy="106.7" r="1.8"/><circle cx="283.7" cy="99.5" r="1.8"/><circle cx="314.4" cy="112.3" r="1.8"/><circle cx="250.1" cy="102.2" r="1.8"/><circle cx="250.0" cy="116.0" r="1.8"/><circle cx="239.8" cy="103.7" r="1.8"/><circle cx="269.0" cy="102.2" r="1.8"/><circle cx="182.0" cy="101.6" r="1.8"/><circle cx="484.5" cy="79.0" r="1.8"/><circle cx="487.4" cy="84.3" r="1.8"/><circle cx="466.2" cy="79.0" r="1.8"/><circle cx="452.2" cy="92.8" r="1.8"/><circle cx="465.5" cy="88.0" r="1.8"/><circle cx="439.6" cy="94.1" r="1.8"/><circle cx="434.0" cy="96.7" r="1.8"/><circle cx="385.8" cy="89.7" r="1.8"/><circle cx="380.7" cy="84.1" r="1.8"/><circle cx="360.1" cy="82.9" r="1.8"/><circle cx="355.0" cy="98.0" r="1.8"/><circle cx="321.1" cy="79.7" r="1.8"/><circle cx="323.7" cy="93.5" r="1.8"/><circle cx="346.9" cy="92.6" r="1.8"/><circle cx="310.7" cy="81.8" r="1.8"/><circle cx="309.6" cy="80.6" r="1.8"/><circle cx="295.9" cy="83.7" r="1.8"/><circle cx="448.8" cy="81.8" r="1.8"/><circle cx="443.0" cy="79.2" r="1.8"/><circle cx="476.5" cy="71.9" r="1.8"/><circle cx="481.7" cy="81.3" r="1.8"/><circle cx="410.5" cy="72.4" r="1.8"/><circle cx="436.1" cy="72.9" r="1.8"/><circle cx="376.0" cy="79.1" r="1.8"/><circle cx="372.2" cy="70.6" r="1.8"/><circle cx="380.2" cy="80.8" r="1.8"/><circle cx="318.7" cy="73.5" r="1.8"/><circle cx="336.6" cy="75.7" r="1.8"/><circle cx="326.6" cy="81.9" r="1.8"/><circle cx="347.6" cy="77.9" r="1.8"/><circle cx="339.0" cy="76.4" r="1.8"/></g>
<line x1="70.0" y1="340.0" x2="510.0" y2="40.0" stroke="currentColor" stroke-dasharray="6 4"/>
<line x1="70.0" y1="258.8" x2="510.0" y2="121.2" stroke="#e07a1f" stroke-width="3"/>
<circle cx="113.1" cy="245.3" r="4.5" fill="#e07a1f" stroke="#fff"/>
<circle cx="133.7" cy="243.5" r="4.5" fill="#e07a1f" stroke="#fff"/>
<circle cx="174.7" cy="217.4" r="4.5" fill="#e07a1f" stroke="#fff"/>
<circle cx="215.8" cy="210.5" r="4.5" fill="#e07a1f" stroke="#fff"/>
<circle cx="256.8" cy="199.9" r="4.5" fill="#e07a1f" stroke="#fff"/>
<circle cx="297.9" cy="191.4" r="4.5" fill="#e07a1f" stroke="#fff"/>
<circle cx="338.9" cy="177.7" r="4.5" fill="#e07a1f" stroke="#fff"/>
<circle cx="380.0" cy="160.0" r="4.5" fill="#e07a1f" stroke="#fff"/>
<circle cx="421.0" cy="150.4" r="4.5" fill="#e07a1f" stroke="#fff"/>
<circle cx="462.1" cy="114.6" r="4.5" fill="#e07a1f" stroke="#fff"/>
<text x="502.7" y="62.5" text-anchor="end" fill="currentColor" font-size="12">z figlio = z genitore</text>
<text x="502.7" y="300.0" text-anchor="end" fill="#e07a1f" font-size="12" font-weight="bold">retta arancione: z figlio = 0,46 · z genitore</text>
<line x1="436.7" y1="190.0" x2="436.7" y2="90.0" stroke="#2e9e5b" stroke-width="1.5"/>
<circle cx="436.7" cy="144.1" r="5" fill="#2e9e5b"/>
<text x="428.7" y="162.1" text-anchor="end" fill="#2e9e5b" font-size="12" font-weight="bold">+0,92</text>
</svg>
<figcaption>In unità standard la retta che meglio prevede il figlio dal genitore ha pendenza r = 0,46: un genitore a +2σ ha figli, in media, a circa +0,9σ. Poiché r è minore di 1, la previsione è sempre più vicina alla media del dato di partenza.</figcaption>
</figure>

Un genitore medio che sta 2 deviazioni standard sopra la media ha figli che, in media, stanno circa $0{,}46\cdot2\approx0{,}9$ deviazioni standard sopra la media: ancora alti, ma meno. Un genitore a $-2$ ha figli, in media, a circa $-0{,}9$. Poiché $|\rho|<1$, la previsione è sempre più vicina alla media del valore di partenza, misurata in unità statistiche: questa è la **regressione verso la media**, e ora vediamo che non ha niente di misterioso. Non è una forza che tira i figli verso il centro: è la conseguenza del fatto che le due grandezze sono legate solo in parte. La parte dell’altezza del figlio che non dipende dai genitori, la fortuna nella lotteria dei tanti piccoli fattori, non ha motivo di ripetere l’eccezionalità dei genitori.

Nelle unità originali la retta diventa $\hat y=\mu_Y+\rho\,\frac{\sigma_Y}{\sigma_X}(x-\mu_X)$. Con i dati di Galton la pendenza in centimetri è $0{,}459\cdot6{,}39/4{,}54\approx0{,}65$: per ogni centimetro di scarto del genitore medio dalla media, i figli si scostano in media di circa due terzi di centimetro. È la frazione «due terzi» che Galton leggeva nella sua tabella. È più grande di $\rho$ perché i figli sono più dispersi dei genitori medi, ma resta minore di 1.

C’è anche un modo di leggere l’errore $1-\rho^2$. In unità originali, lo scarto tipico dei figli attorno alla retta è $\sigma_Y\sqrt{1-\rho^2}=6{,}39\cdot\sqrt{1-0{,}46^2}\approx5{,}7$ cm, contro i 6,4 cm di chi non conosce i genitori. Conoscere l’altezza dei genitori riduce l’incertezza sull’altezza del figlio, ma di poco: con una correlazione di 0,46 la nuvola resta larga.

La regressione verso la media compare ovunque ci siano misure ripetute con una correlazione minore di 1, e ignorarla porta a conclusioni sbagliate. Supponiamo di misurare oggi i tempi di risposta di cento servizi e di scegliere i dieci più lenti per ottimizzarli. Quei dieci sono lenti in parte perché sono davvero lenti e in parte perché oggi sono stati sfortunati. Se domani li misuriamo di nuovo, anche senza toccarli, saranno in media un po’ più veloci, perché la sfortuna non si ripete. Se nel frattempo abbiamo applicato un’ottimizzazione, rischiamo di attribuirle un miglioramento che è soltanto regressione verso la media. Daniel Kahneman racconta un episodio simile con gli istruttori di volo: dopo un atterraggio eccezionale e una lode, l’atterraggio successivo tendeva a essere peggiore, e dopo uno pessimo e un rimprovero tendeva a essere migliore; gli istruttori ne concludevano che le lodi fanno male e i rimproveri fanno bene, mentre stavano osservando soltanto la regressione verso la media.

## Lettura B — Due variabili continue: la densità congiunta {: #congiunte-continue .psi-facoltativo }

Questa lettura è facoltativa e non è richiesta all’esame. Mostra come le idee della settimana passano dalle variabili discrete a quelle continue, come nella Settimana 6 eravamo passati dalla PMF alla densità.

Per una variabile continua la probabilità di un singolo valore è zero, e la distribuzione si descrive con una densità $f(x)$: la probabilità di un intervallo è l’area sotto la curva ([Settimana 6](../settimana_06/index.md#area)). Per due variabili continue $X$ e $Y$ si fa lo stesso salto, con una dimensione in più. Al posto delle caselle della tabella ci sono i punti del piano, e la distribuzione è descritta da una **densità congiunta** $f(x,y)$, una funzione mai negativa che possiamo immaginare come una superficie sopra il piano. La probabilità che il punto $(X,Y)$ cada in una regione $A$ è il **volume** sotto la superficie, sopra la regione:

$$
P\big((X,Y)\in A\big)=\iint_A f(x,y)\,dx\,dy.
$$

Il doppio simbolo di integrale si legge come quello della Settimana 6: è il nome di un volume, la somma di tanti parallelepipedi sottilissimi. Per un rettangolino piccolo di lati $\Delta x$ e $\Delta y$ attorno a $(x,y)$ vale l’approssimazione $P\approx f(x,y)\,\Delta x\,\Delta y$, l’analogo della casella della tabella. Il volume totale sotto la superficie vale 1.

Le marginali si ottengono come nel discreto, con l’integrale al posto della somma: la densità di $X$ si ottiene «sommando» lungo $y$ tutta la densità che sta sopra la retta verticale di ascissa $x$,

$$
f_X(x)=\int_{-\infty}^{+\infty}f(x,y)\,dy,\qquad f_Y(y)=\int_{-\infty}^{+\infty}f(x,y)\,dx.
$$

Le variabili sono indipendenti quando la densità congiunta è il prodotto delle marginali, $f(x,y)=f_X(x)\,f_Y(y)$; il valore atteso di una funzione di due variabili è $\mathbb{E}[g(X,Y)]=\iint g(x,y)\,f(x,y)\,dx\,dy$; e covarianza e correlazione si definiscono con le stesse formule della settimana.

Vediamo un esempio in cui tutti i conti si fanno con aree e volumi di figure semplici. Scegliamo un punto a caso, uniformemente, nel triangolo $T$ in cui $0\le y\le x\le1$: la metà del quadrato unitario sotto la diagonale. L’area del triangolo è $1/2$, quindi perché il volume totale sia 1 la densità deve valere 2 sul triangolo e 0 fuori.

<figure markdown="0">
<svg viewBox="0 0 580 312" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="A sinistra un quadrato unitario con il triangolo sotto la diagonale colorato: lì la densità congiunta vale 2, altrove 0. Un segmento verticale arancione all’ascissa x attraversa il triangolo e ha lunghezza x. A destra la densità marginale di X, la retta 2x da 0 a 1.">
<text x="290.0" y="20.0" text-anchor="middle" fill="currentColor" font-weight="bold">Un punto a caso nel triangolo sotto la diagonale</text>
<rect x="50" y="50" width="200" height="200" fill="none" stroke="currentColor" opacity="0.6"/>
<polygon points="50,250 250,250 250,50" fill="#4051b5" opacity="0.3" stroke="#4051b5"/>
<line x1="150.0" y1="250" x2="150.0" y2="150.0" stroke="#e07a1f" stroke-width="3"/>
<text x="210.0" y="230.0" text-anchor="middle" fill="#4051b5" font-weight="bold">f(x, y) = 2</text>
<text x="100.0" y="120.0" text-anchor="middle" fill="currentColor" font-size="12">f = 0</text>
<text x="50.0" y="266.0" text-anchor="middle" fill="currentColor" font-size="11">0</text>
<text x="250.0" y="266.0" text-anchor="middle" fill="currentColor" font-size="11">1</text>
<text x="42.0" y="54.0" text-anchor="end" fill="currentColor" font-size="11">1</text>
<text x="150.0" y="284.0" text-anchor="middle" fill="currentColor" font-size="12">x</text>
<text x="30.0" y="150.0" text-anchor="middle" fill="currentColor" font-size="12">y</text>
<text x="156.0" y="174.0" text-anchor="start" fill="#e07a1f" font-size="11">segmento lungo x</text>
<line x1="340" y1="250" x2="540" y2="250" stroke="currentColor"/>
<line x1="340" y1="50" x2="340" y2="250" stroke="currentColor"/>
<polygon points="340,250 540,250 540,50" fill="#e07a1f" opacity="0.2"/>
<line x1="340" y1="250" x2="540" y2="50" stroke="#e07a1f" stroke-width="3"/>
<text x="430.0" y="120.0" text-anchor="end" fill="#e07a1f" font-weight="bold">f_X(x) = 2x</text>
<text x="340.0" y="266.0" text-anchor="middle" fill="currentColor" font-size="11">0</text>
<text x="540.0" y="266.0" text-anchor="middle" fill="currentColor" font-size="11">1</text>
<text x="332.0" y="54.0" text-anchor="end" fill="currentColor" font-size="11">2</text>
<text x="440.0" y="284.0" text-anchor="middle" fill="currentColor" font-size="12">x</text>
<text x="290.0" y="300.0" text-anchor="middle" fill="currentColor" font-size="12">Densità congiunta a sinistra; densità marginale di X a destra.</text>
</svg>
<figcaption>La densità congiunta vale 2 sul triangolo dove 0 ≤ y ≤ x ≤ 1. Integrando in y lungo il segmento arancione, che è lungo x, si ottiene la densità marginale f_X(x) = 2·x: è l’analogo continuo di sommare una colonna della tabella.</figcaption>
</figure>

La probabilità che $X$ sia al massimo $1/2$ è il volume sopra il triangolino con $x\le1/2$, che ha area $1/8$: $P(X\le1/2)=2\cdot1/8=1/4$. La densità marginale di $X$ si ottiene integrando lungo la verticale di ascissa $x$: la densità vale 2 su un segmento lungo $x$, da $y=0$ a $y=x$, quindi $f_X(x)=2x$ tra 0 e 1. Allo stesso modo, sulla orizzontale di quota $y$ il segmento va da $x=y$ a $x=1$, e $f_Y(y)=2(1-y)$. Le variabili non sono indipendenti: nel punto $(0{,}1;\;0{,}5)$ la densità congiunta è zero, perché il punto sta fuori dal triangolo, mentre il prodotto delle marginali è $0{,}2\cdot1=0{,}2$. È la versione continua della casella vuota con i margini pieni: se sappiamo che $X=0{,}1$, sappiamo anche che $Y$ non supera 0,1.

Con gli integrali si trovano $\mathbb{E}[X]=2/3$, $\mathbb{E}[Y]=1/3$, $\mathbb{E}[XY]=1/4$ e $\operatorname{Var}(X)=\operatorname{Var}(Y)=1/18$, quindi

$$
\operatorname{Cov}(X,Y)=\frac14-\frac23\cdot\frac13=\frac1{36},\qquad\rho(X,Y)=\frac{1/36}{1/18}=\frac12.
$$

L’esempio continuo più importante è quello che Galton intuì nei suoi dati. Racconta nell’autobiografia che, aspettando un treno in una piccola stazione vicino a Ramsgate e studiando il diagramma delle altezze nel suo taccuino, si accorse che le linee lungo le quali le frequenze erano uguali formavano ellissi concentriche. Quella superficie, una campana a due dimensioni con sezioni ellittiche, è la **distribuzione normale bivariata**: è descritta da cinque numeri, le due medie, le due deviazioni standard e la correlazione $\rho$, che dice quanto le ellissi sono allungate e inclinate. Tagliando la superficie con un piano verticale, cioè fissando il valore di $X$, si ottiene una curva a campana: è la distribuzione di $Y$ tra i casi con quel valore di $X$. Le slide del corso mostrano questo taglio, che riprenderemo nella Settimana 12 quando useremo le distribuzioni condizionate per fare inferenza.

## Esercizi: prima prova, poi apri la soluzione {: #esercizi }

Per ogni esercizio comincia scrivendo, in una frase, quali sono le due variabili, quali valori possono assumere e in quale casella o insieme di caselle cade l’evento che ti viene chiesto. Poi fai il conto. I primi quattro esercizi vengono dalle slide del corso, il quinto dal notebook 4.3; gli altri sono nuovi. I risultati numerici servono a controllare il procedimento; all’esame conta il ragionamento.

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

### Esercizio 5 — I due moduli, rivisti {: #esercizio-5 }

Con la [tabella dei due moduli](#due-moduli): (a) calcola $\operatorname{Cov}(X,Y)$ con la definizione, casella per casella, e controlla che dia 0,075. (b) Costruisci una nuova tabella con le stesse marginali in cui gli errori nei due moduli siano indipendenti. (c) Per la nuova tabella calcola $\mathbb{E}[XY]$ e la covarianza.

??? esempio-svolto "Soluzione ragionata"
    (a) Le medie sono $\mu_X=0{,}5$ e $\mu_Y=1{,}05$. Nella riga $x=0$ lo scarto di $X$ è $-0{,}5$, e gli scarti di $Y$ sono $-1{,}05$, $-0{,}05$, $0{,}95$, $1{,}95$: i prodotti sono $0{,}525$, $0{,}025$, $-0{,}475$, $-0{,}975$, e pesati con le caselle $0{,}20$, $0{,}20$, $0{,}05$, $0{,}05$ danno $0{,}105+0{,}005-0{,}02375-0{,}04875=0{,}0375$. Nella riga $x=1$ lo scarto di $X$ è $+0{,}5$ e i prodotti cambiano segno: $-0{,}525$, $-0{,}025$, $0{,}475$, $0{,}975$, pesati con $0{,}20$, $0{,}10$, $0{,}10$, $0{,}10$ danno $-0{,}105-0{,}0025+0{,}0475+0{,}0975=0{,}0375$. In tutto $0{,}075$, come con la formula comoda. (b) Ogni casella deve essere il prodotto dei margini: entrambe le righe diventano $0{,}5\cdot(0{,}40;\,0{,}30;\,0{,}15;\,0{,}15)=(0{,}20;\,0{,}15;\,0{,}075;\,0{,}075)$. (c) Contribuiscono solo le caselle con $x=1$: $\mathbb{E}[XY]=1\cdot0{,}15+2\cdot0{,}075+3\cdot0{,}075=0{,}525$, che è proprio $\mu_X\mu_Y=0{,}5\cdot1{,}05$. Quindi $\operatorname{Cov}(X,Y)=0$.

### Esercizio 6 — Commit grandi e build fallite {: #esercizio-6 }

In un sistema di integrazione continua si osservano molti commit. Per un commit scelto a caso, $X=1$ se la build fallisce e $X=0$ altrimenti; $Y=1$ se il commit modifica più di 10 file e $Y=0$ altrimenti. La distribuzione congiunta è $P(0,0)=0{,}60$, $P(0,1)=0{,}15$, $P(1,0)=0{,}10$, $P(1,1)=0{,}15$. (a) Ricava le marginali e le medie. (b) Calcola la covarianza e la correlazione. (c) Che cosa dicono questi numeri? Che cosa non dicono?

??? esempio-svolto "Soluzione ragionata"
    (a) $P(X=1)=0{,}10+0{,}15=0{,}25$ e $P(Y=1)=0{,}15+0{,}15=0{,}30$; per variabili che valgono 0 o 1 le medie sono queste probabilità, $\mu_X=0{,}25$ e $\mu_Y=0{,}30$. (b) $\mathbb{E}[XY]=P(1,1)=0{,}15$, quindi $\operatorname{Cov}(X,Y)=0{,}15-0{,}25\cdot0{,}30=0{,}075$. Le varianze, con la definizione, sono $\operatorname{Var}(X)=0{,}75\cdot0{,}25^2+0{,}25\cdot0{,}75^2=0{,}1875$ e $\operatorname{Var}(Y)=0{,}70\cdot0{,}30^2+0{,}30\cdot0{,}70^2=0{,}21$, quindi $\rho=0{,}075/\sqrt{0{,}1875\cdot0{,}21}\approx0{,}075/0{,}198\approx0{,}38$. (c) I commit grandi e le build fallite tendono ad andare insieme, con un legame moderato: tra i commit grandi la build fallisce nel $0{,}15/0{,}30=0{,}50$ dei casi, cioè una volta su due, tra quelli piccoli nel $0{,}10/0{,}70\approx0{,}14$ dei casi. I numeri non dicono che modificare molti file *causi* il fallimento: potrebbe esserci un confondente, per esempio le funzionalità più complesse, che richiedono commit grandi e sono anche più difficili da far funzionare.

### Esercizio 7 — Altezza e peso, in unità diverse {: #esercizio-7 }

In una popolazione l’altezza $X$, in metri, ha deviazione standard $0{,}07$ m; il peso $Y$, in kg, ha deviazione standard 10 kg; la covarianza è $0{,}42$ m·kg. (a) Calcola la correlazione. (b) Ripeti i conti con l’altezza in centimetri. (c) E con l’altezza in centimetri e il peso in grammi?

??? esempio-svolto "Soluzione ragionata"
    (a) $\rho=0{,}42/(0{,}07\cdot10)=0{,}42/0{,}7=0{,}6$. (b) In centimetri l’altezza è $100X$: la covarianza si moltiplica per 100 e diventa 42 cm·kg, la deviazione standard diventa 7 cm, e $\rho=42/(7\cdot10)=0{,}6$. (c) Il peso in grammi è $1000\,Y$: la covarianza diventa $42\,000$ cm·g e la deviazione standard del peso $10\,000$ g, quindi $\rho=42\,000/(7\cdot10\,000)=0{,}6$. La covarianza cambia a ogni cambio di unità, la correlazione no.

### Esercizio 8 — Il segno dipende dalla codifica {: #esercizio-8 }

Torna alla tabella del marketing, con le fasce d’età codificate 1, 2, 3 e l’intenzione di acquisto codificata $Y=1$ (compra) e $Y=2$ (non compra). (a) Calcola $\operatorname{Cov}(X,Y)$ e $\rho(X,Y)$. (b) Ora codifica l’acquisto con $B=1$ se la persona compra e $B=0$ se non compra. Quanto valgono $\operatorname{Cov}(X,B)$ e $\rho(X,B)$? (c) Come si interpreta il segno?

??? esempio-svolto "Soluzione ragionata"
    (a) Dalle marginali, $\mu_X=1\cdot0{,}35+2\cdot0{,}45+3\cdot0{,}20=1{,}85$ e $\mu_Y=1\cdot0{,}40+2\cdot0{,}60=1{,}60$. Con la regola LOTUS, $\mathbb{E}[XY]=1\cdot0{,}10+2\cdot0{,}20+3\cdot0{,}10+2\cdot0{,}25+4\cdot0{,}25+6\cdot0{,}10=2{,}90$, quindi $\operatorname{Cov}(X,Y)=2{,}90-1{,}85\cdot1{,}60=-0{,}06$. Le varianze sono $\operatorname{Var}(X)=0{,}35\cdot0{,}85^2+0{,}45\cdot0{,}15^2+0{,}20\cdot1{,}15^2=0{,}5275$ e $\operatorname{Var}(Y)=0{,}40\cdot0{,}6^2+0{,}60\cdot0{,}4^2=0{,}24$, e $\rho=-0{,}06/\sqrt{0{,}5275\cdot0{,}24}\approx-0{,}17$. (b) $B=2-Y$: è un cambio di unità con $a=-1$, quindi $\operatorname{Cov}(X,B)=-\operatorname{Cov}(X,Y)=+0{,}06$ e $\rho(X,B)\approx+0{,}17$. (c) Con la codifica $B$ il segno positivo dice che nelle fasce d’età più alte si compra di più, come confermano le condizionate dell’esercizio 3: compra circa il 29% delle persone tra i 16 e i 25 anni, circa il 44% tra i 26 e i 45 ($0{,}20/0{,}45$) e il 50% tra i 46 e gli 85. Con la codifica $Y$ il segno è negativo, ma dice la stessa cosa. Il segno di una covarianza si interpreta solo sapendo come sono codificate le variabili; e poiché le fasce d’età sono numerate 1, 2, 3 per comodità, anche il valore di $\rho$ dipende da questa scelta, mentre la tabella congiunta no.

### Esercizio 9 — Incorrelate ma dipendenti {: #esercizio-9 }

Sia $X$ uniforme sui valori $-2$, $-1$, $0$, $1$, $2$, e sia $Y=|X|$, il valore assoluto. (a) Scrivi la tabella congiunta di $X$ e $Y$ con le marginali. (b) Calcola $\operatorname{Cov}(X,Y)$. (c) Le variabili sono indipendenti?

??? esempio-svolto "Soluzione ragionata"
    (a) $Y$ vale 0 se $X=0$, 1 se $X=\pm1$, 2 se $X=\pm2$. La tabella ha le colonne $X=-2,-1,0,1,2$ e le righe $Y=0,1,2$; le caselle non vuote sono $(0,0)$, $(-1,1)$, $(1,1)$, $(-2,2)$, $(2,2)$, ciascuna con probabilità $1/5$. Le marginali sono $1/5$ per ogni valore di $X$ e $P(Y=0)=1/5$, $P(Y=1)=2/5$, $P(Y=2)=2/5$. (b) $\mu_X=0$ per simmetria. Il prodotto $XY=X|X|$ vale $-4$, $-1$, $0$, $1$, $4$, ciascuno con probabilità $1/5$, quindi $\mathbb{E}[XY]=0$ e $\operatorname{Cov}(X,Y)=0-0\cdot\mu_Y=0$. (c) No: $P(X=0,\;Y=2)=0$, mentre $P(X=0)\,P(Y=2)=1/5\cdot2/5=2/25$. Le variabili sono incorrelate ma dipendenti, anzi $Y$ è una funzione di $X$: è la forma a V, cugina della forma a U dell’Atto VIII.

### Esercizio 10 — Più test, più bug? {: #esercizio-10 }

In un’azienda si osserva che i team che scrivono più test automatici hanno anche più bug aperti nel sistema di tracciamento, con una correlazione di 0,6. Un dirigente propone di ridurre i test, «visto che portano bug». (a) Proponi almeno tre spiegazioni diverse della correlazione. (b) Come si potrebbe capire quale spiegazione è giusta?

??? esempio-svolto "Soluzione ragionata"
    (a) Prima spiegazione, un confondente: i team che lavorano su prodotti grandi o complessi scrivono più test e hanno anche più bug, perché il codice è di più e più difficile. Seconda spiegazione, la causa al contrario: i team che hanno avuto molti bug reagiscono scrivendo più test. Terza spiegazione, la misura: più test trovano più bug, che vengono registrati, mentre un team senza test ha bug che nessuno ha ancora scoperto. In nessuna delle tre i test producono errori. (b) Si possono confrontare team con prodotti di dimensione e complessità simili, per vedere se la correlazione resta, come nel terzo laboratorio. La strada più solida è un esperimento: assegnare a caso a quali componenti aggiungere test e confrontare dopo qualche mese i bug segnalati dagli utenti, che non dipendono dal numero di test.

## Errori da evitare {: #errori }

Molti errori di questa settimana nascono dalla lettura delle tabelle. Una casella della tabella congiunta è la probabilità che succedano insieme due cose, non la probabilità di una sapendo l’altra: $P(D=1,\;S=0)=0{,}015$ non è la probabilità di essere malati tra chi ha perso l’olfatto, che è circa 0,35. Quando si calcolano le marginali, è facile scambiare i due margini: conviene chiedersi ogni volta lungo quale direzione si sta sommando e quale variabile resta fissa. E se le caselle non sommano a 1, la tabella non è una distribuzione di probabilità, e qualcosa nei dati o nei conti va controllato.

Un secondo gruppo di errori riguarda l’indipendenza. Una casella in cui la probabilità è il prodotto dei margini non dimostra nulla: nei due moduli la prima casella rispettava la condizione e la seconda no. Per l’indipendenza bisogna controllare tutte le caselle; per la dipendenza basta un controesempio, e una casella vuota con i margini pieni è il controesempio più rapido. Nemmeno l’uguaglianza $\mathbb{E}[XY]=\mathbb{E}[X]\,\mathbb{E}[Y]$, o una covarianza nulla, dimostra l’indipendenza.

Un terzo gruppo riguarda la covarianza. Il suo valore dipende dalle unità di misura e non dice se un legame è forte o debole: per questo serve la correlazione. La covarianza ha senso solo per variabili numeriche; calcolarla su codici che sono semplici etichette, come «single = 0, in una relazione = 1», produce numeri senza significato. Nel calcolo con la formula comoda, ricorda che si sottrae il prodotto delle medie, non la media del prodotto due volte; e nel calcolo con la definizione, che ogni prodotto di scarti va pesato con la probabilità della sua casella.

Infine, gli errori di interpretazione. Una correlazione vicina a zero non vuol dire che le variabili non siano legate, ma solo che non sono legate lungo una retta: guarda sempre la nuvola dei punti. Una correlazione alta non vuol dire che una variabile sia la causa dell’altra: prima di concludere, chiediti se la causa possa andare nel verso opposto o se un confondente muova entrambe. E $\rho=0{,}5$ non vuol dire «metà»: è un valore su una scala tra $-1$ e $1$, non una percentuale.

## Riepilogo per lo studio {: #riepilogo }

Due variabili aleatorie discrete studiate insieme sono descritte dalla loro **distribuzione congiunta**, la tabella delle probabilità $p_{X,Y}(x,y)=P(X=x,\;Y=y)$: una casella per ogni coppia di valori, caselle non negative che sommano a 1. Ogni domanda su $X$ e $Y$ è un insieme di caselle, e la sua probabilità è la somma delle caselle. Le **distribuzioni marginali** si ottengono sommando lungo le righe o le colonne, $p_X(x)=\sum_y p_{X,Y}(x,y)$: è il teorema della probabilità totale. Dalla congiunta si ottengono le marginali, ma non viceversa, perché il legame tra le variabili sta dentro la tabella. Con molte variabili la tabella esplode, perché il numero di caselle è il prodotto dei numeri di valori.

Le variabili sono **indipendenti** quando ogni casella è il prodotto dei suoi margini, $p_{X,Y}(x,y)=p_X(x)\,p_Y(y)$; per dimostrarlo servono tutte le caselle, per smentirlo ne basta una. La media di una funzione di due variabili si calcola pesando i valori della funzione con le caselle, $\mathbb{E}[g(X,Y)]=\sum_x\sum_y g(x,y)\,p_{X,Y}(x,y)$; per variabili indipendenti la media del prodotto è il prodotto delle medie.

La **covarianza** $\operatorname{Cov}(X,Y)=\mathbb{E}[(X-\mu_X)(Y-\mu_Y)]=\mathbb{E}[XY]-\mu_X\mu_Y$ è la media del prodotto degli scarti: è positiva quando la probabilità pesa sui quadranti in cui le variabili stanno dalla stessa parte delle loro medie, negativa nel caso opposto. La covarianza di una variabile con sé stessa è la varianza, e il suo valore cambia con le unità di misura. La **correlazione** $\rho=\operatorname{Cov}(X,Y)/(\sigma_X\sigma_Y)$ è la covarianza delle variabili standardizzate, cioè misurate in unità statistiche come voleva Galton: non dipende dalle unità, sta tra $-1$ e $1$, e vale $\pm1$ solo per una relazione lineare esatta. Variabili indipendenti hanno correlazione zero, ma correlazione zero non vuol dire indipendenza, perché la correlazione vede solo i legami lineari. E una correlazione, anche alta, non dice quale variabile sia la causa: può esserci la causa inversa, un confondente o il caso.

!!! tip "Prova a raccontarlo senza il formulario"
    Prendi la tabella degli studenti e spiega a un compagno come si trova la probabilità di essere in una relazione, e perché quel conto è la probabilità totale della Settimana 2. Spiegagli perché la prima casella dei due moduli non bastava a dire che gli errori sono indipendenti. Poi disegna una nuvola di punti con i quattro quadranti e racconta che cosa misura la covarianza, perché Galton aveva bisogno delle «unità statistiche» e che cosa vuol dire $\rho=0{,}46$ per le altezze dei suoi figli. Chiudi con due esempi: una coppia di variabili dipendenti con correlazione zero, e una coppia correlata senza che una sia la causa dell’altra. Se riesci a farlo, le formule della settimana sono diventate strumenti di ragionamento.

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

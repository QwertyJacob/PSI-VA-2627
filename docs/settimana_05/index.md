# Settimana 5 — Bortkiewicz e i calci di cavallo: distribuzione geometrica e distribuzione di Poisson

<style>
@media screen {
  .md-typeset .md-typeset__scrollwrap { overflow-x: auto; max-width: 100%; }
  .md-typeset div.arithmatex { overflow-x: auto; max-width: 100%; }
  .md-typeset mjx-assistive-mml { max-width: 100%; }
}
</style>

*Quante prove servono prima che qualcosa riesca? Quanti eventi capitano mentre osserviamo un sistema? Due domande vicine, due modi diversi di costruire una variabile aleatoria.*

[:material-presentation: Apri Slide della Lezione](slides/index.html){ .md-button .md-button--primary target="_blank" }

## Il percorso e ciò che è richiesto all’esame {: #esame }

Questa settimana impariamo a descrivere due situazioni che incontriamo continuamente quando osserviamo un sistema:

- **un’attesa**: «quante volte devo riprovare prima che vada bene?»;
- **un conteggio in un intervallo**: «quanti eventi si verificano mentre guardo?».

Per ciascuna costruiremo un [modello probabilistico](#modello-probabilistico): dichiareremo le ipotesi con cui rappresentiamo la situazione e ricaveremo la distribuzione della variabile che ci interessa. Prima, però, ci serve un nuovo strumento da affiancare al valore atteso: la **varianza**, che misura quanto i risultati si disperdono attorno alla media. Ne avremo bisogno più volte, e in particolare per capire la distribuzione di Poisson.

Durante la lettura incontrerai tre tipi di pause:

- le **soste di verifica**, con la risposta nascosta: prova a rispondere da solo e poi apri la soluzione;
- le **domande in apertura** di alcune sezioni: servono a mettere alla prova le tue intuizioni *prima* del calcolo, e non importa se all’inizio sbagli;
- i **riquadri «Che cosa abbiamo ottenuto»**, che riassumono in poche righe il punto raggiunto.

Non occorre memorizzare i dati storici né i valori decimali degli esempi: contano il ragionamento e la capacità di rifarlo.

La mappa è questa; ogni tappa si appoggia alla precedente.

| Tappa | Domanda guida | Strumento che ne esce |
|---|---|---|
| La varianza | Due variabili con la stessa media possono comportarsi in modo diverso? Come lo misuriamo? | Varianza e deviazione standard |
| Atto I | Un numero che non esce da molto tempo diventa «più dovuto»? | Il problema, e un primo modello per una singola estrazione |
| Atto II | Quante prove servono per il primo successo? | Distribuzione **Geometrica**, assenza di memoria |
| Atto III | Come si distribuiscono i conteggi di eventi rari nei dati reali? | Il caso dei calci di cavallo |
| Atto IV | Quale modello produce quei conteggi? | Distribuzione di **Poisson** |
| Atto V | Come usiamo questi modelli nei sistemi informatici? | Capacità di un server, retry, limiti del modello |

Il percorso principale comprende la sezione iniziale sulla varianza e gli Atti I–V.

### Che cosa devi saper fare all’esame

Alla fine della settimana devi saper:

- spiegare il significato della **varianza**, scriverne la definizione come media degli scarti al quadrato e calcolarla su una semplice distribuzione discreta;
- riconoscere il modello **Geometrico**, dichiararne le ipotesi e la convenzione di conteggio, ricavare e usare PMF e coda, calcolare la media $1/p$ e interpretarla;
- spiegare e ricostruire la proprietà di **assenza di memoria**, distinguendo un’attesa futura da una sequenza osservata fin dall’inizio;
- spiegare l’idea dei **pezzetti di tempo** che porta dalla distribuzione binomiale alla distribuzione di Poisson, compreso il conto per zero eventi;
- usare la **PMF della distribuzione di Poisson**, sapere che $\mathbb{E}[X]=\operatorname{Var}(X)=\lambda$ e scegliere il parametro relativo all’intervallo della domanda;
- scegliere il modello in un’applicazione semplice e discutere le ipotesi, soprattutto indipendenza e stabilità del tasso.

### Che cosa è facoltativo

**Sono facoltativi e non richiesti all’esame:**

- il filtro di Bloom (Lettura A);
- la derivazione completa del limite binomiale e dei momenti della distribuzione di Poisson (Lettura B);
- l’identità del secondo momento e le derivazioni delle varianze delle distribuzioni di Bernoulli e binomiale (Lettura C).

Una precisazione importante: la **proprietà** $\operatorname{Var}(X)=\lambda$ per la distribuzione di Poisson è richiesta; è la sua *dimostrazione* a essere facoltativa. L’esercizio sul campionamento senza reinserimento richiama un approfondimento facoltativo della Settimana 4.

Per codice, widget e fonti valgono le [indicazioni generali per lo studio](../index.md#esame). I laboratori servono a mettere alla prova le previsioni: una simulazione ci fa *vedere* che una proprietà vale, mentre la spiegazione matematica ci dice *perché* vale. Le due cose si completano.

## Prima di cominciare: che cosa sappiamo già {: #prima-di-cominciare }

Useremo gli esiti e le probabilità della Settimana 1, insieme alle variabili aleatorie e al valore atteso della Settimana 4. Riprendiamoli attraverso un esempio che ritroveremo nello studio delle attese.

### Che cos’è un modello probabilistico {: #modello-probabilistico }

Supponiamo di voler descrivere una richiesta inviata a un server. Consideriamo due esiti: la richiesta riesce oppure fallisce. Assegniamo probabilità $0{,}2$ al successo e $0{,}8$ al fallimento. Abbiamo costruito un primo **modello probabilistico**: una rappresentazione matematica di una situazione incerta, nella quale specifichiamo **gli esiti possibili, gli eventi e le loro probabilità**.

Nella [Settimana 1, §5](../settimana_01/index.md#5-gli-assiomi-di-kolmogorov-1933) abbiamo chiamato la struttura matematica di base *spazio di probabilità*, $(\Omega,\mathcal F,P)$. Per usarla come modello di un fenomeno reale, dobbiamo anche dire come gli esiti matematici rappresentano ciò che osserviamo e quali ipotesi facciamo. Qui, per esempio, stiamo riassumendo tutti i possibili problemi della richiesta in un solo esito, «fallimento»; il valore $0{,}2$ è una scelta del modello, da giustificare nell’applicazione.

Ora immaginiamo di riprovare dopo un fallimento. Avere descritto una richiesta non basta a descrivere l’intera sequenza: dobbiamo aggiungere ipotesi sui rapporti fra i tentativi. Possiamo assumere che siano **indipendenti** e che la probabilità di successo resti **sempre $0{,}2$**. Sono ipotesi che ci permetteranno di fare i calcoli, e che dovremo confrontare con il funzionamento del servizio.

Solo a questo punto scegliamo che cosa misurare: per esempio, chiamiamo $X$ il numero di tentativi fino al primo successo. La **distribuzione di $X$** dice quali valori può assumere questo numero e con quali probabilità. La ricaveremo dalle ipotesi appena dichiarate. Dunque il modello comprende la descrizione della situazione e dei legami fra i tentativi; la distribuzione di $X$ descrive la particolare grandezza che abbiamo scelto di osservare.

### Variabili aleatorie e valore atteso

Nella Settimana 4 abbiamo imparato a leggere l’esito di un esperimento attraverso una **variabile aleatoria**. Se ci interessa il numero di richieste fallite, la variabile $X$ restituisce quel numero; la **distribuzione** descrive quali valori $X$ può assumere e con quali probabilità.

Per una variabile discreta, la distribuzione si scrive con la **PMF** (*probability mass function*, funzione di massa di probabilità):

$$
p_X(x)=P(X=x).
$$

A sinistra c’è il nome della funzione, che prende un valore $x$; a destra c’è la probabilità che la variabile $X$ assuma proprio quel valore. I valori della PMF sono **pesi**: ciascuno è non negativo e la loro somma è 1.

La media pesata dei risultati, dove i pesi sono le probabilità, è il **valore atteso**:

$$
\mathbb{E}[X]=\sum_x x\,p_X(x).
$$

La lettera $x$ percorre tutti i valori possibili di $X$. In ciascun termine moltiplichiamo un valore per la probabilità di osservarlo, poi sommiamo tutti i contributi.

Un esempio minimo: un dado equo. I valori sono $1,2,\ldots,6$, ciascuno con peso $1/6$, quindi

$$
\mathbb{E}[X]=\frac16(1+2+3+4+5+6)=\frac{21}{6}=3{,}5.
$$

Nessun lancio produce 3,5: il valore atteso è un **centro di massa** della distribuzione, e non deve essere un risultato che l’esperimento può dare. È il punto in cui, immaginando i pesi come masse sistemate sull’asse, la distribuzione starebbe in equilibrio.

Dal numero di tentativi possiamo passare ad altre grandezze, per esempio al tempo impiegato. Quando la trasformazione è lineare, anche il valore atteso si trasforma nello stesso modo: è la proprietà di **linearità**. Se una durata è $T=aX+b$, allora

$$
\mathbb{E}[T]=a\,\mathbb{E}[X]+b.
$$

Per esempio, se ogni tentativo dura 0,3 secondi e $X$ conta i tentativi, la durata è $T=0{,}3X$ e la sua media è $0{,}3\,\mathbb{E}[X]$. In più, se un conteggio è una somma di indicatrici, la sua media è la somma delle probabilità degli eventi contati. Questa proprietà è notevole perché **non richiede indipendenza**: vale anche quando le variabili sono legate fra loro.

Infine conosciamo la **distribuzione binomiale**. Fissiamo $n$ prove indipendenti, ognuna con la stessa probabilità di successo $p$, e contiamo i successi. La media del conteggio è $np$.

In questo caso la domanda è:

> **«Quanti successi in un numero fissato di prove?»**

Nota che qui il numero di prove è *deciso in anticipo*, mentre il numero di successi è ciò che *osserviamo*. In questa settimana cambieremo proprio ciò che è fissato e ciò che è osservato. Se fissiamo il numero di successi (uno solo) e osserviamo il numero di prove, otterremo la Geometrica. Se fissiamo un intervallo di tempo e osserviamo quanti eventi vi cadono, otterremo la distribuzione di Poisson.

Il passaggio da una distribuzione all’altra nasce dunque da una scelta: *che cosa teniamo fermo e che cosa contiamo*. Ci torneremo spesso.

## Prima di proseguire — Stessa media, dispersione diversa: la varianza {: #varianza }

Cominciamo da una domanda semplice. La media riassume una distribuzione con un solo numero: è sufficiente? Per vedere che non lo è, bastano due piccole storie.

### Due pagamenti con lo stesso centro {: #definizione-varianza }

Ripartiamo da dove ci eravamo fermati nella [Settimana 4](../settimana_04/index.md#huygens). Con Christiaan Huygens abbiamo dato un prezzo a una possibilità di guadagno: una moneta onesta decide il pagamento, 10 euro se esce testa e 0 euro se esce croce. Il **valore equo** di questo biglietto è il pagamento medio:

$$
0\cdot\frac12+10\cdot\frac12=5\text{ euro}.
$$

Ora immagina che qualcuno ti offra una scelta:

- **A**: 5 euro in mano, subito;
- **B**: il biglietto di Huygens, cioè 10 euro con testa e 0 euro con croce.

Quale sceglieresti? Prova a rispondere prima di proseguire.

Per il criterio di Huygens le due offerte valgono lo stesso: 5 euro ciascuna. Eppure, messe davanti a questa scelta, le persone non sono indifferenti. Molte prendono i 5 euro sicuri; altre preferiscono tentare la sorte. Nessuna delle due scelte è un errore di calcolo: è una preferenza personale, e la probabilità non la impone. Lo avevamo già notato nella Settimana 4: chi teme di perdere denaro può preferire una somma certa.

Fermiamoci su questo fatto. Se due offerte con lo stesso valore equo non sono indifferenti, devono differire in qualcosa che il valore equo non vede. Che cosa? Per scoprirlo, trattiamo le due offerte come due variabili aleatorie: $A$ vale sempre 5 euro; $B$ vale 0 oppure 10 euro, con probabilità $1/2$ ciascuno.

| Pagamento | Valori e probabilità | Valore atteso |
|---|---|---|
| Certo, $A$ | 5 con probabilità 1 | 5 euro |
| Incerto, $B$ | 0 e 10, ciascuno con probabilità $1/2$ | $0\cdot\frac12+10\cdot\frac12=5$ euro |

Il centro è lo stesso. Eppure i pagamenti si comportano in modo molto diverso: $A$ coincide sempre con la propria media; $B$ se ne allontana sempre di 5 euro, ora in su e ora in giù. **La media, da sola, non descrive questa differenza.** Ci serve un secondo numero, che dica *quanto ci si allontana dal centro*.

### Dagli scarti alla varianza

Per costruire questo numero cominciamo dall’idea più naturale: guardare quanto ogni risultato dista dalla media. Indichiamo la media con la lettera greca $\mu$, letta «mu»:

$$
\mu=\mathbb{E}[X].
$$

Se osserviamo il valore $x$, il suo **scarto dalla media** è $x-\mu$. Nel pagamento $B$ gli scarti sono

$$
0-5=-5
\qquad\text{e}\qquad
10-5=5.
$$

Il segno ci dice da che parte del centro ci troviamo: negativo sotto, positivo sopra. Il valore assoluto ci dice la distanza.

La mossa più semplice sarebbe fare la media degli scarti. Proviamo, per $B$:

$$
(-5)\cdot\frac12+5\cdot\frac12=0.
$$

Otteniamo zero. E zero otterremmo anche per il pagamento certo, che non si disperde affatto. Gli scarti positivi e negativi **si cancellano**, e nascondono la differenza che volevamo descrivere.

Non è un caso fortuito del nostro esempio. Succede sempre, quando la media è finita. Per linearità:

$$
\mathbb{E}[X-\mu]=\mathbb{E}[X]-\mu=\mu-\mu=0.
$$

La media degli scarti è dunque *sempre* zero: come misura di dispersione è inutile. Dobbiamo trovare un modo per impedire che i segni si compensino.

Ci sono due modi comuni per eliminare il segno: prendere il valore assoluto, oppure elevare al quadrato. Scegliamo il **quadrato**. Sia $-5$ sia $5$ diventano 25, quindi niente si cancella. Il quadrato ha anche due vantaggi:

- attribuisce un peso maggiore agli scarti grandi: raddoppiare la distanza quadruplica il suo contributo;
- si presta bene al calcolo algebrico, come vedremo nella Lettura C. Il valore assoluto, invece, rende i conti molto più scomodi.

Facciamo ora la media degli scarti al quadrato. Questa quantità è la **varianza**:

$$
\boxed{\operatorname{Var}(X)
=\mathbb{E}[(X-\mu)^2]
=\sum_x (x-\mu)^2p_X(x).}
$$

Osserviamo che la varianza è a sua volta un valore atteso: quello della quantità $(X-\mu)^2$, che è una funzione di $X$. Per calcolarlo si pesa ogni valore *trasformato* con la PMF di $X$, secondo la regola che abbiamo visto nella [Settimana 4](../settimana_04/index.md#lotus).

Per calcolare la varianza seguiamo quindi quattro passaggi:

1. trova la media $\mu$;
2. sottraila a ogni valore possibile, ottenendo gli scarti;
3. eleva al quadrato ciascuno scarto;
4. pesa i quadrati con le probabilità e somma.

Un errore frequente da evitare subito: eleviamo al quadrato **gli scarti**, non le probabilità.

Applichiamo la procedura al pagamento $B$. La tabella mette in colonna i quattro passaggi:

| Valore $x$ | Probabilità $p_B(x)$ | Scarto $x-5$ | Quadrato $(x-5)^2$ | Contributo pesato |
|---|---|---|---|---|
| 0 | $1/2$ | $-5$ | 25 | $25/2$ |
| 10 | $1/2$ | 5 | 25 | $25/2$ |

Sommando l’ultima colonna troviamo:

$$
\operatorname{Var}(B)=\frac{25}{2}+\frac{25}{2}=25.
$$

Per $A$, invece, ogni scarto è $5-5=0$, quindi $\operatorname{Var}(A)=0$. La varianza distingue finalmente i due pagamenti, pur lasciando uguale la media. Era proprio ciò che cercavamo.

Due proprietà si leggono direttamente dalla definizione.

**La varianza non è mai negativa.** È una media di quantità non negative: ogni quadrato è maggiore o uguale a zero, e i pesi sono non negativi.

**Vale zero soltanto quando non c’è dispersione.** La varianza è nulla se e solo se $X$ coincide con la propria media con probabilità 1. Su una distribuzione finita il motivo è semplice: basta che un solo valore di probabilità positiva sia diverso dalla media perché il suo contributo sia strettamente positivo, e nessun altro contributo può compensarlo.

### Le unità di misura: la deviazione standard

Il quadrato cambia anche l’unità di misura. Se $X$ è in euro, gli scarti sono in euro e i loro quadrati in *euro al quadrato*. Il 25 appena trovato non è un pagamento di 25 euro: ha un’unità di misura diversa da quella della variabile. Per tornare alle unità di partenza prendiamo la radice quadrata:

$$
\sigma_X=\sqrt{\operatorname{Var}(X)}.
$$

Questa è la **deviazione standard**; la lettera $\sigma$ si legge «sigma». Per $B$ vale $\sqrt{25}=5$ euro.

In questo esempio ogni pagamento dista proprio 5 euro dalla media, quindi la deviazione standard coincide con la distanza tipica. In generale non è così: la deviazione standard misura una *scala* della dispersione, e non coincide necessariamente con la media delle distanze. Quando le distanze sono tutte diverse, i valori più lontani contano di più, per via del quadrato.

Finora le probabilità erano uguali. Vediamo che cosa succede quando non lo sono. Sia $W$ una variabile che vale 0 con probabilità $0{,}9$ e 10 con probabilità $0{,}1$.

- La media è $\mu=0\cdot0{,}9+10\cdot0{,}1=1$.
- Gli scarti sono $0-1=-1$ e $10-1=9$.
- I quadrati sono 1 e 81.

Pesiamo con le probabilità:

$$
\operatorname{Var}(W)=1\cdot0{,}9+81\cdot0{,}1=0{,}9+8{,}1=9,
\qquad
\sigma_W=3.
$$

Guarda il peso dei due contributi: il valore raro, che capita una volta su dieci, genera quasi tutta la varianza (8,1 su 9). Questo accade perché il suo scarto è grande e il quadrato lo amplifica. È un fatto da ricordare: **gli eventi rari ma grandi possono dominare la dispersione**.

!!! example "Sosta di verifica"
    Una variabile $Y$ vale 1 oppure 3, con probabilità $1/2$ ciascuno. Calcola media e varianza prima di aprire la risposta.

    ??? esempio-svolto "Risposta"
        La media è $1\cdot\frac12+3\cdot\frac12=2$. Gli scarti sono $-1$ e $1$, perciò la varianza è $1\cdot\frac12+1\cdot\frac12=1$.

        Il valore atteso 2 non viene mai osservato, ma resta il centro rispetto al quale misuriamo gli scarti.

!!! example "Sosta di verifica"
    Per un dado equo, la media è 3,5. Calcola la varianza con la definizione.

    ??? esempio-svolto "Risposta"
        Gli scarti dei sei valori sono $-2{,}5;\,-1{,}5;\,-0{,}5;\,0{,}5;\,1{,}5;\,2{,}5$, e i loro quadrati sono $6{,}25;\,2{,}25;\,0{,}25;\,0{,}25;\,2{,}25;\,6{,}25$. La somma è $17{,}5$. Con peso $1/6$ ciascuno:

        $$
        \operatorname{Var}=\frac{17{,}5}{6}=\frac{35}{12}\approx2{,}92,
        \qquad
        \sigma\approx1{,}71.
        $$

        La deviazione standard è circa 1,7: un lancio tipico dista un paio di punti dal 3,5.

!!! example "Sosta di verifica"
    Tre variabili assumono i valori da 1 a 5 con queste probabilità:

    | Valore | 1 | 2 | 3 | 4 | 5 |
    |---|---|---|---|---|---|
    | $X_1$ | 0,2 | 0,2 | 0,2 | 0,2 | 0,2 |
    | $X_2$ | 0,1 | 0,2 | 0,4 | 0,2 | 0,1 |
    | $X_3$ | 0 | 0,2 | 0,6 | 0,2 | 0 |

    Senza fare conti, perché hanno tutte media 3? Ordinale a occhio dalla più dispersa alla meno dispersa, poi controlla calcolando le tre varianze.

    ??? esempio-svolto "Risposta"
        Le tre distribuzioni sono simmetriche attorno a 3: ogni valore sotto il 3 ha un compagno alla stessa distanza sopra, con lo stesso peso. Il baricentro è quindi 3 per tutte e tre.

        Gli scarti dei valori da 1 a 5 sono $-2,-1,0,1,2$ e i loro quadrati $4,1,0,1,4$, uguali per le tre variabili. Cambiano soltanto i pesi:

        $$
        \begin{aligned}
        \operatorname{Var}(X_1)&=0{,}2\,(4+1+0+1+4)=2,\\
        \operatorname{Var}(X_2)&=4\cdot0{,}1+1\cdot0{,}2+0+1\cdot0{,}2+4\cdot0{,}1=1{,}2,\\
        \operatorname{Var}(X_3)&=1\cdot0{,}2+1\cdot0{,}2=0{,}4.
        \end{aligned}
        $$

        Le deviazioni standard sono circa 1,41, 1,10 e 0,63. Più massa lontano dal centro significa più varianza: $X_1$ mette peso 0,4 sugli estremi 1 e 5, $X_3$ nessuno.

!!! note "Che cosa abbiamo ottenuto"
    La media dice *dove* sta il centro; la varianza dice *quanto ci si allontana* da esso. La si calcola con gli scarti al quadrato, perché gli scarti con segno si cancellano. La sua radice, la deviazione standard, ha le stesse unità della variabile.

Per il percorso principale basta questo metodo, cioè la definizione. Nella [Lettura C](#lettura-varianza) ricaveremo una formula alternativa e la applicheremo alla distribuzione binomiale.

Una avvertenza per le variabili con infiniti valori possibili: una media finita non assicura una varianza finita. Occorre controllare anche la convergenza della somma degli scarti al quadrato. Per le distribuzioni di questa settimana tutto va bene, ma non è automatico in generale.

## Atto I — Il 53 che non usciva {: #ritardatari }

Nel gioco del Lotto, ogni settimana si estraggono numeri su più «ruote», che sono come urne separate. Il caso più celebre è quello del **53 di Venezia**: nel periodo 2003–2005 il 53 rimase assente dalla ruota di Venezia per **182 estrazioni consecutive**. Molti giocatori puntarono su quel numero con una convinzione crescente: dopo tanta attesa, *doveva* uscire.

Fermiamoci un momento e facciamo una previsione, prima di qualunque calcolo. Il 53 è assente da 100 estrazioni. Alla prossima:

- è **più probabile** del solito che esca?
- è **meno probabile**?
- ha **la stessa probabilità** di sempre?

Annota la tua risposta, e magari anche quanto ne sei sicuro. Alla fine dell’Atto II torneremo qui. Non serve sapere nulla dei dettagli delle puntate: serve capire che cosa il modello ci dice sulle estrazioni *future*.

Per studiare questa attesa consideriamo una ruota fissata, per esempio Venezia, e descriviamo come avvengono le estrazioni.

- A ogni estrazione vengono scelti **5 numeri distinti fra 1 e 90**.
- All’interno della stessa estrazione i numeri sono scelti **senza reinserimento**: un numero estratto non rientra nell’urna.
- Tra un’estrazione e la successiva si riparte con tutti i 90 numeri.
- I sorteggi successivi sono **indipendenti** ed equi.

L’ultima ipotesi è il cuore del modello: l’urna non «ricorda» che cosa è uscito prima.

Queste ipotesi permettono di calcolare la probabilità che il 53 compaia in una singola estrazione.

**Primo ragionamento (per simmetria).** Fra i 90 numeri non ce n’è uno privilegiato. Se immaginiamo di disporre i 90 numeri in un ordine casuale e di prendere i primi 5, ciascun numero ha la stessa probabilità di trovarsi fra i primi 5. Il 53 viene estratto se occupa una delle prime 5 posizioni su 90, quindi:

$$
p=P(\text{esce il 53})=\frac5{90}=\frac1{18}.
$$

**Secondo ragionamento (conto diretto).** Le cinquine possibili sono $\binom{90}{5}$. Quelle che contengono il 53 sono tante quante i modi di scegliere gli altri quattro numeri fra gli 89 rimasti, cioè $\binom{89}{4}$. Il rapporto dà

$$
\frac{\binom{89}{4}}{\binom{90}{5}}=\frac{5}{90}=\frac1{18},
$$

perché $\binom{90}{5}=\frac{90}{5}\binom{89}{4}$. I due ragionamenti concordano, come devono.

La probabilità che il 53 **non** esca è il complementare:

$$
1-p=1-\frac1{18}=\frac{17}{18}.
$$

Attenzione a che cosa stiamo calcolando: non la probabilità di ottenere una particolare cinquina, ma soltanto la probabilità che **un numero fissato** compaia fra i cinque estratti. Sono domande diverse, con risposte molto diverse.

Ora cambiamo prospettiva. Scegliamo il punto da cui cominciare a osservare e *contiamo le estrazioni fino alla prima comparsa del 53*. Questo numero non è fissato in anticipo: potrebbe bastare una sola estrazione, potrebbero servirne cento.

Qui nasce la novità. Nella distribuzione binomiale decidevamo il numero di prove e contavamo i successi. Adesso decidiamo che cosa vogliamo ottenere (un successo) e contiamo **quante prove servono**.

Se abbiamo già osservato 100 assenze, conosciamo una parte di questa attesa. Per sapere quanto resta da aspettare dovremo tener conto di quell’informazione, attraverso la probabilità condizionata.

## Atto II — Aspettare il primo successo: la Geometrica {: #geometrica }

### 1. Prima decidiamo che cosa contiamo {: #modello-geometrico }

Per studiare un’attesa di questo tipo partiamo da una moneta. La lanciamo finché esce la prima testa e chiamiamo $X$ il **numero totale di lanci effettuati, compreso quello riuscito**. Le prime sequenze possibili mostrano come funziona il conteggio:

| Inizio della sequenza | Valore di $X$ | Perché |
|---|---|---|
| Testa | 1 | La prima prova riesce |
| Croce, testa | 2 | Un fallimento, poi il successo |
| Croce, croce, testa | 3 | Due fallimenti, poi il successo |

Le prove successive al primo successo non interessano: l’esperimento si ferma lì.

La costruzione generale richiede tre ingredienti:

1. prove con **due esiti**, chiamati successo e fallimento;
2. la **stessa probabilità di successo $p$** a ogni prova;
3. **indipendenza** fra tutte le prove.

Supponiamo prima $0<p<1$. La parola «successo» identifica semplicemente l’esito che stiamo aspettando: non esprime un giudizio sul suo valore. Per esempio, in un controllo di qualità il «successo» potrebbe essere trovare un pezzo difettoso.

Con queste ipotesi, $X$ ha distribuzione **Geometrica di parametro $p$**:

$$
X\sim\operatorname{Geometrica}(p).
$$

Il simbolo $\sim$ si legge «ha distribuzione». I valori possibili sono $1,2,3,\ldots$: non c’è un massimo, ma li possiamo elencare uno dopo l’altro. Una variabile con infiniti valori elencabili è ancora **discreta**.

Confrontiamo la costruzione con quella della distribuzione binomiale, per fissare bene la differenza:

| | Che cosa è fissato in anticipo | Che cosa osserviamo |
|---|---|---|
| Distribuzione binomiale | il numero di prove $n$ | il numero di successi |
| Geometrica | il traguardo: **un** successo | il numero di prove necessarie |

Una convenzione da tenere ben presente: qui contiamo **tutte** le prove, compresa quella riuscita. Per questo **$X$ parte da 1**.

I casi limite si trattano a parte. Se $p=1$, la prima prova riesce certamente: $X=1$ con probabilità 1. Se $p=0$, il successo non arriva mai, e non otteniamo una Geometrica finita con questa convenzione.

### 2. La PMF: tradurre un valore in una storia {: #pmf-geometrica }

Per assegnare una probabilità ai valori di $X$ dobbiamo capire quali esiti delle singole prove li producono. Se il primo successo arriva alla seconda prova, per esempio, sappiamo anche che cosa è accaduto alla prima: deve essere fallita. Ogni valore di $X$ determina così una precisa sequenza. Consideriamo i primi tre casi.

**$X=1$.** La prima prova riesce: la storia è «S». Probabilità $p$.

**$X=2$.** La prima prova fallisce, la seconda riesce: la storia è «F, S». Per indipendenza moltiplichiamo: $(1-p)\cdot p$.

**$X=3$.** Due fallimenti e poi il successo: «F, F, S». Probabilità $(1-p)(1-p)p=(1-p)^2p$.

Chiediamo ora $P(X=4)$. Per avere il primo successo alla quarta prova devono accadere, nell’ordine, tre fallimenti e un successo. Se la seconda prova riuscisse, ci saremmo già fermati: non sarebbe più $X=4$. L’ordine non è libero.

<figure markdown="0">
<svg viewBox="0 0 560 190" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Quattro prove in fila: le prime tre fallite, ciascuna con probabilità uno meno p, la quarta riuscita con probabilità p. Il prodotto dà P di X uguale a 4.">
<defs><marker id="s05-fila-freccia" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="currentColor"/></marker></defs>
<text x="280" y="20" text-anchor="middle" fill="currentColor" font-weight="bold">X = 4: tre fallimenti, poi il primo successo</text>
<g fill="none" stroke="currentColor" stroke-width="2"><rect x="40" y="40" width="95" height="50" rx="6"/><rect x="155" y="40" width="95" height="50" rx="6"/><rect x="270" y="40" width="95" height="50" rx="6"/></g>
<rect x="385" y="40" width="95" height="50" rx="6" fill="#2e9e5b"/>
<g text-anchor="middle" fill="currentColor"><text x="87" y="62">prova 1</text><text x="87" y="80">fallisce</text><text x="202" y="62">prova 2</text><text x="202" y="80">fallisce</text><text x="317" y="62">prova 3</text><text x="317" y="80">fallisce</text></g>
<g text-anchor="middle" fill="#fff" font-weight="bold"><text x="432" y="62">prova 4</text><text x="432" y="80">riesce</text></g>
<g text-anchor="middle" fill="currentColor"><text x="87" y="115">1 − p</text><text x="202" y="115">1 − p</text><text x="317" y="115">1 − p</text></g>
<text x="432" y="115" text-anchor="middle" fill="#2e9e5b" font-weight="bold">p</text>
<path d="M40 135H500" stroke="currentColor" marker-end="url(#s05-fila-freccia)"/>
<text x="505" y="139" fill="currentColor">tempo</text>
<text x="280" y="175" text-anchor="middle" fill="currentColor">Prove indipendenti: si moltiplica. P(X = 4) = (1 − p)·(1 − p)·(1 − p)·p = (1 − p)³·p</text>
</svg>
<figcaption>Il valore X = 4 corrisponde a una sola storia: tre fallimenti seguiti da un successo.</figcaption>
</figure>

Ciascun fallimento ha probabilità $1-p$; il successo ha probabilità $p$. **L’indipendenza** ci permette di moltiplicare:

$$
P(X=4)=(1-p)\cdot(1-p)\cdot(1-p)\cdot p=(1-p)^3p.
$$

Con una moneta onesta, $p=1/2$, quindi $P(X=4)=(1/2)^4=1/16$. Nota che **non compare un coefficiente binomiale**. Nella distribuzione binomiale dovevamo scegliere *quali* prove fossero riuscite; qui l’unica storia compatibile con $X=4$ ha il successo in ultima posizione, e tutte le posizioni precedenti sono già determinate.

Lo schema è chiaro: per avere $X=k$ servono esattamente $k-1$ fallimenti prima dell’unico successo finale. Abbiamo così costruito la PMF:

$$
\boxed{P(X=k)=(1-p)^{k-1}p,\qquad k=1,2,3,\ldots}
$$

L’esponente di $(1-p)$ è il numero di fallimenti *prima* del successo; il fattore $p$ finale è il successo che chiude la storia.

!!! warning "La convenzione fa parte del modello"
    Se un libro o una libreria conta soltanto i fallimenti prima del successo, usa invece $Y=X-1$, che parte da 0. Per avere $Y=j$ servono $j$ fallimenti e poi un successo: quindi $P(Y=j)=(1-p)^jp$ per $j=0,1,\ldots$. In un esercizio, prima di usare una formula, controlla che cosa conta la variabile. Questa dispensa conta sempre anche la prova riuscita.

Applichiamo la formula con $p=0{,}2$ e guardiamo i primi valori:

| $k$ | Storia richiesta | Probabilità |
|---|---|---|
| 1 | Successo | $0{,}2$ |
| 2 | Fallimento, successo | $0{,}8\cdot0{,}2=0{,}16$ |
| 3 | Due fallimenti, successo | $0{,}8^2\cdot0{,}2=0{,}128$ |
| 4 | Tre fallimenti, successo | $0{,}8^3\cdot0{,}2=0{,}1024$ |

Osserva come procede la colonna: ogni passo moltiplica il peso precedente per $1-p=0{,}8$, un numero minore di 1. I pesi decrescono quindi di continuo, e la barra più alta è la prima.

Questo merita una riflessione. Il primo tentativo è **il singolo valore più probabile**, anche quando $p$ è piccolo. Ma non concludere troppo in fretta che «il successo arriva di solito subito»: le molte altre possibilità, considerate *insieme*, possono avere un peso complessivo molto maggiore. Con $p=0{,}2$, per esempio, $P(X=1)=0{,}2$ ma $P(X>1)=0{,}8$.

### 3. La coda: superare una soglia {: #coda-geometrica }

Sapere la probabilità di un singolo valore non risponde ancora a una domanda come «basteranno tre tentativi?». Per rispondere dobbiamo considerare insieme tutte le attese che superano quella soglia: è la **coda** della distribuzione. Cerchiamo quindi la probabilità che **non bastino le prime tre prove**.

L’evento è $X>3$. Si verifica se e solo se le prime tre prove falliscono. Notiamo bene che *non imponiamo* un successo alla quarta: potrebbe arrivare alla quarta, alla quinta o molto dopo, e a noi va bene qualunque di questi casi. Quindi:

$$
P(X>3)=(1-p)^3.
$$

In generale, per un intero $k\ge0$:

$$
\boxed{P(X>k)=(1-p)^k.}
$$

Superare la soglia $k$ significa fallire le prime $k$ prove; di che cosa succede dopo non ci occupiamo.

Con $p=0{,}2$ otteniamo $P(X>3)=0{,}8^3=0{,}512$. Confrontiamolo con $P(X=4)=0{,}1024$ della tabella: il primo evento *include* tutti i possibili successi dopo la terza prova (alla quarta, alla quinta, e così via), il secondo ne specifica uno solo. È per questo che le due probabilità sono diverse: la seconda è la prima moltiplicata per $p$, perché, dopo tre fallimenti, chiediamo anche che la quarta prova riesca.

Usando il complementare otteniamo la probabilità di riuscire **entro** $k$ prove:

$$
\boxed{P(X\le k)=1-(1-p)^k.}
$$

Nel nostro esempio con $k=3$ vale $1-0{,}512=0{,}488$. Possiamo ritrovarla sommando i primi tre pesi della tabella, come controllo: $0{,}2+0{,}16+0{,}128=0{,}488$. I due conti concordano.

??? note "Approfondimento facoltativo — La stessa formula sommando la PMF, per ogni $k$"
    Il controllo appena fatto suggerisce una seconda strada. L’evento «riuscire entro $k$ prove» è l’unione degli eventi disgiunti $\{X=1\},\{X=2\},\dots,\{X=k\}$, quindi possiamo sommare i pesi della PMF invece di ragionare sui fallimenti. Mostriamo che le due strade danno **sempre** lo stesso risultato, per qualunque $k\ge1$ e qualunque $0<p\le1$.

    Scriviamo $q=1-p$ per alleggerire la notazione. Per l’additività,

    $$
    P(X\le k)=\sum_{j=1}^{k}P(X=j)=\sum_{j=1}^{k}q^{\,j-1}p=p\left(1+q+q^2+\cdots+q^{k-1}\right).
    $$

    Il fattore $p$ è comune a tutti i termini e lo abbiamo raccolto. Resta da calcolare la somma tra parentesi, che chiamiamo $S_k$.

    Per calcolare $S_k$ moltiplichiamo per $1-q$ e distribuiamo:

    $$
    \begin{aligned}
    (1-q)\,S_k
    &=\left(1+q+q^2+\cdots+q^{k-1}\right)-\left(q+q^2+\cdots+q^{k-1}+q^{k}\right)\\
    &=1-q^{k}.
    \end{aligned}
    $$

    Nella prima parentesi ci sono le potenze da $q^0$ a $q^{k-1}$; nella seconda, ottenuta moltiplicando per $q$, quelle da $q^1$ a $q^k$. Tutte le potenze intermedie compaiono una volta con il segno più e una volta con il segno meno, e si cancellano: restano solo il primo termine della prima parentesi e l’ultimo della seconda.

    Attenzione: non abbiamo ancora trovato $S_k$. Abbiamo trovato quanto vale $S_k$ **moltiplicato per** $1-q$.

    Per isolare $S_k$ dividiamo **entrambi i lati** dell’uguaglianza per $1-q$. Possiamo farlo perché $1-q=p$ non è zero:

    $$
    S_k=\frac{1-q^k}{1-q}.
    $$

    Ora ricordiamo che $1-q=p$ e riscriviamo soltanto il denominatore:

    $$
    S_k=\frac{1-q^k}{p}.
    $$

    Quindi $S_k$ non è $1-q^k$: è $1-q^k$ **diviso per** $p$. Con $p=0{,}2$, $q=0{,}8$ e $k=3$: direttamente $S_3=1+0{,}8+0{,}64=2{,}44$, e con la formula $(1-0{,}512)/0{,}2=0{,}488/0{,}2=2{,}44$.

    Torniamo a $P(X\le k)=p\cdot S_k$ e sostituiamo il valore appena trovato. Il $p$ davanti e il $p$ al denominatore si semplificano:

    $$
    P(X\le k)=p\cdot S_k=p\cdot\frac{1-q^k}{p}=1-q^k=1-(1-p)^k,
    $$

    e, passando al complementare,

    $$
    P(X>k)=1-P(X\le k)=(1-p)^k.
    $$

    È esattamente la formula trovata contando i fallimenti. Il fattore $p$ davanti alla somma si semplifica con il denominatore: è il motivo per cui nel risultato finale compare soltanto la probabilità di fallire.

    Con $p=0{,}2$ e $k=3$ abbiamo trovato $S_3=2{,}44$, quindi $P(X\le3)=0{,}2\cdot2{,}44=0{,}488$. La formula dà $1-0{,}8^3=1-0{,}512=0{,}488$.

    Le due strade rispondono alla stessa domanda in modi diversi. Contare i fallimenti è più rapido, perché guarda solo le prime $k$ prove. Sommare la PMF è più lungo, ma è un controllo indipendente: se le due strade non coincidessero, avremmo sbagliato la PMF o la lettura dell’evento. Infine, quando $k$ cresce, $(1-p)^k$ tende a 0 e quindi $P(X\le k)$ tende a 1: i pesi della PMF sommano a 1, come vedremo tra poco.

Un’ultima attenzione alle parole, che sono una fonte frequente di errori. «Servono **più di** $k$ prove» significa $X>k$. «Servono **almeno** $k$ prove» significa $X\ge k$: in questo caso bastano $k-1$ fallimenti, perché la prova $k$ può anche riuscire. Perciò:

$$
P(X\ge k)=P(X>k-1)=(1-p)^{k-1},\qquad k\ge1.
$$

!!! example "Sosta di verifica"
    Con $p=0{,}2$, calcola la probabilità che «servano più di 3 prove» e quella che «servano almeno 3 prove». Perché i due esponenti differiscono di uno?

    ??? esempio-svolto "Risposta"
        «Più di 3 prove» significa $X>3$: servono 3 fallimenti, quindi $0{,}8^3=0{,}512$.

        «Almeno 3 prove» significa $X\ge3$: bastano 2 fallimenti, perché la terza prova può riuscire o no. La probabilità è $0{,}8^2=0{,}64$.

        La differenza di un esponente è la differenza di un fallimento richiesto: nel primo caso la terza prova *deve* fallire, nel secondo è libera.

Ogni attesa finita può essere superata: nessuna soglia $k$ è «garantita». Tuttavia, poiché $0<1-p<1$, la quantità $(1-p)^k$ **tende a zero** quando $k$ cresce. La probabilità di *non riuscire mai* è dunque zero. Diciamo che il successo arriva **con probabilità 1**. Attenzione: questo non fornisce un numero finito di prove entro cui il successo sia garantito. Dice soltanto che l’attesa infinita ha probabilità nulla.

Possiamo anche controllare direttamente che la PMF sommi a 1, senza calcolare una serie infinita. Gli eventi $X\le K$ e $X>K$ sono complementari, quindi:

$$
\sum_{k=1}^{K}P(X=k)=1-(1-p)^K\ \longrightarrow\ 1.
$$

Leggiamo: sommando i primi $K$ pesi otteniamo tutto tranne la coda $(1-p)^K$. Aumentando $K$ includiamo sempre più valori possibili e il peso ancora escluso tende a zero. In altre parole, la somma di tutti i pesi è 1: ecco la verifica che quella che abbiamo scritto è davvero una PMF.

### 4. La media: quante prove servono in media? {: #media-geometrica }

Se ogni prova riesce con probabilità $1/5$, ci aspettiamo che su molte prove circa una su cinque sia un successo. Questo suggerisce un’attesa media di cinque prove fra un successo e il successivo. Per $p=1/2$ lo stesso ragionamento suggerisce due prove. L’intuizione porta quindi al reciproco di $p$.

Il risultato, dimostrato nel riquadro facoltativo qui sotto, è che il valore atteso della Geometrica vale

$$
\boxed{\mathbb{E}[X]=\frac1p.}
$$

Con una moneta onesta, 2 lanci. Per il 53 del Lotto, $1/(1/18)=18$ estrazioni. Per un tentativo che riesce con probabilità $0{,}2$, la media è 5.

??? note "Approfondimento facoltativo — Perché la media è $1/p$"
    Questa dimostrazione non fa parte del programma. Serve a chi vuole vedere da dove viene il risultato: la facciamo prima guardando solo il primo tentativo, poi con la definizione di valore atteso.

    **1. Il ragionamento sul primo tentativo.**

    Chiamiamo $\mu=\mathbb{E}[X]$. Per il momento supponiamo che questa media sia finita; subito dopo verificheremo che lo è davvero. Alla prima prova ci sono due possibilità:

    - con probabilità $p$ riusciamo subito: abbiamo usato **una** prova, e l’attesa è finita;
    - con probabilità $1-p$ falliamo: abbiamo usato **una** prova e dobbiamo aspettare ancora. Chiamiamo $X'$ il numero di prove *ancora necessarie* dopo il fallimento. Il totale è allora $1+X'$.

    Il secondo punto è quello che richiede più attenzione, e usa sia l’indipendenza sia la costanza di $p$: dopo un fallimento, il problema che resta ha *esattamente la stessa distribuzione* del problema iniziale, cioè $X'$ si comporta come $X$. È come ricominciare da capo, con una prova già spesa in più. Poiché il valore atteso dipende soltanto dalla distribuzione, $\mathbb{E}[X']=\mu$ e quindi, nel caso «ho fallito», la media del totale è $1+\mu$.

    Per combinare le due medie useremo la **legge della probabilità totale per il valore atteso**. Se $A_1,\dots,A_n$ sono eventi a due a due disgiunti, di probabilità positiva, la cui unione è tutto lo spazio (ad ogni esito se ne verifica esattamente uno), allora

    $$
    \mathbb{E}[X]=\sum_{i=1}^{n}\mathbb{E}[X\mid A_i]\,P(A_i).
    $$

    Qui $\mathbb{E}[X\mid A_i]$ è la media di $X$ calcolata *solo* nel caso in cui $A_i$ si verifica, cioè $\sum_k k\,P(X=k\mid A_i)$. La regola dice che la media totale è la media delle medie parziali, pesate con la probabilità di ciascun caso: come il voto medio di una classe, ottenuto dalle medie dei sottogruppi pesate con la loro numerosità. Segue dalla legge della probabilità totale $P(X=k)=\sum_i P(X=k\mid A_i)P(A_i)$: basta moltiplicare per $k$ e sommare su $k$.

    Nel nostro caso i due eventi sono «la prima prova riesce» e «la prima prova fallisce», con $\mathbb{E}[X\mid\text{riesce}]=1$ e $\mathbb{E}[X\mid\text{fallisce}]=1+\mu$. Pesiamo dunque le due medie con le probabilità dei casi:

    $$
    \mu=p\cdot1+(1-p)(1+\mu).
    $$

    Con probabilità $p$ il costo medio è 1; con probabilità $1-p$ il costo medio è $1+\mu$. La media totale tiene conto delle due possibilità con i rispettivi pesi.

    Sviluppando la parentesi e raccogliendo i termini otteniamo:

    $$
    \begin{aligned}
    \mu&=p+(1-p)+(1-p)\mu\\
    &=1+(1-p)\mu,\\
    \mu-(1-p)\mu&=1,\\
    p\mu&=1.
    \end{aligned}
    $$

    Nell’ultimo passaggio abbiamo portato a sinistra il termine con $\mu$ e raccolto: $\mu-(1-p)\mu=\mu\,[1-(1-p)]=p\mu$. Poiché $p>0$, possiamo dividere per $p$:

    $$
    \mu=\frac1p.
    $$

    **2. Perché la media è davvero finita.**

    Il ragionamento precedente non basterebbe se $\mu$ fosse infinita: non potremmo sottrarre termini infiniti, e il ragionamento non starebbe in piedi. Controlliamo dunque la finitezza, usando le code che già conosciamo.

    Un’attesa di quattro prove può essere contata come $4=1+1+1+1$: una prima unità sempre presente, una seconda se l’attesa supera 1, una terza se supera 2, una quarta se supera 3. Lo stesso ragionamento vale per ogni attesa intera positiva. Facendo la media di questi contributi, ciascuno non negativo, otteniamo:

    $$
    \mathbb{E}[X]=P(X>0)+P(X>1)+P(X>2)+\cdots.
    $$

    La media di un’attesa è quindi la somma delle probabilità di superare ogni soglia: $0$, poi $1$, poi $2$, e così via.

    Per una Geometrica le code sono $1,(1-p),(1-p)^2,\ldots$. Poniamo $q=1-p$ per alleggerire la scrittura. La somma dei primi $K$ termini è

    $$
    S_K=1+q+q^2+\cdots+q^{K-1}.
    $$

    Moltiplicarla per $q$ sposta tutti i termini di una posizione. Sottraendo le due espressioni, i termini intermedi si cancellano e restano soltanto il primo e l’ultimo:

    $$
    S_K-qS_K=1-q^K,
    \qquad
    S_K=\frac{1-q^K}{1-q}.
    $$

    Poiché $q^K\to0$ e $1-q=p>0$, la somma tende a $1/p$, che è finito. La somma delle code conferma dunque *sia* la finitezza *sia* il valore della media, e questo secondo argomento non usa l’ipotesi che $\mu$ fosse finita. Il passaggio alle somme infinite è lecito perché tutti i contributi sono non negativi.

    **3. Lo stesso risultato dalla definizione di valore atteso.**

    Se preferisci partire dalla definizione, con $q=1-p$ e $P(X=k)=q^{k-1}p$ si ha

    $$
    \mu=\sum_{k=1}^{\infty}k\,q^{k-1}p.
    $$

    Il primo termine, $k=1$, vale $1\cdot p=p$: è il caso «riesco subito». Scriviamo a parte gli altri:

    $$
    \mu=p+\sum_{k=2}^{\infty}k\,q^{k-1}p.
    $$

    Nella somma poniamo $k=j+1$, con $j\ge1$. Estraiamo un fattore $q$ e spezziamo $j+1$ in $j$ più $1$:

    $$
    \sum_{j=1}^{\infty}(j+1)\,q^{j}p
    =q\left[\sum_{j=1}^{\infty}j\,q^{j-1}p+\sum_{j=1}^{\infty}q^{j-1}p\right]
    =q\,(\mu+1).
    $$

    La prima somma tra parentesi è, per definizione, $\mu$. La seconda è la somma di tutti i pesi della PMF, quindi vale 1. Rimettendo insieme:

    $$
    \mu=p+q\,(1+\mu).
    $$

    È esattamente l’equazione del ragionamento sul primo tentativo, con $q=1-p$. I due modi di procedere sono lo stesso conto: il termine $p\cdot1$ raccoglie il caso $k=1$, il termine $(1-p)(1+\mu)$ raccoglie tutti i casi $k\ge2$ in un colpo solo.

C’è un fraintendimento diffuso sulla media. Diciotto estrazioni in media **non** significa «entro diciotto estrazioni». Per il Lotto:

$$
P(X>18)=\left(\frac{17}{18}\right)^{18}\approx0{,}357.
$$

Più di un terzo delle attese supera la media. Visto dall’altro lato, quasi due attese su tre si chiudono entro 18 estrazioni, e metà già entro 13. Come può allora la media valere 18? La distribuzione ha una coda lunga a destra: le attese oltre 18 sono poco più di un terzo dei casi, ma da sole forniscono circa 12,9 dei 18 punti della media, oltre il 70%. Un’attesa di 60 estrazioni è rara, ma sposta la media quanto molte attese brevi messe insieme. È lo stesso fenomeno del secondo esempio della varianza: pochi valori lontani dal centro possono spostare molto un valore atteso.

!!! note "Che cosa abbiamo ottenuto"
    La Geometrica conta le prove fino al primo successo. Ha PMF $(1-p)^{k-1}p$, coda $P(X>k)=(1-p)^k$ e media $1/p$. La PMF richiede un successo in una posizione precisa; la coda richiede soltanto dei fallimenti.

#### Esplora: la forma di un’attesa {: #widget-geometrica }

Usa lo strumento con un’idea precisa in mente. Parti da $p=0{,}2$: la media vale 5. Prima di spostare il cursore a $p=0{,}5$, prevedi la nuova media e la probabilità di superare 10 prove; poi verifica. Infine avvicinati al riferimento del Lotto, $p=1/18$: la coda si allunga e la media sale a 18. Il grafico mostra soltanto le prime 30 barre; i valori oltre il bordo conservano probabilità positiva.

<div class="psi-widget" id="s05-geometrica"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  PSIWidget.mount('s05-geometrica', {
    type: 'bar', xLabel: 'Prova k del primo successo', yLabel: 'P(X = k)',
    xDomain: [1, 30], liveLabel: 'Geometrica corrente',
    fn: function (k, p) { return Math.pow(1 - p.p, k - 1) * p.p; },
    params: [{key: 'p', label: 'p (probabilità di successo per prova)',
      min: 0.02, max: 0.9, step: 0.01, value: 0.2}],
    reference: {label: 'Lotto: p = 1/18', params: {p: 1 / 18}},
    stats: function (p) { return [
      {label: 'E[X] = 1/p', value: (1 / p.p).toFixed(2)},
      {label: 'P(X > 10) = (1 − p)^10', value: Math.pow(1 - p.p, 10).toFixed(3)}
    ]; },
    caption: 'La barra più alta è sempre la prima. La media 1/p cresce quando p diminuisce, e la coda si allunga.'
  });
});
</script>

### 5. L’assenza di memoria: quanto resta da aspettare? {: #assenza-memoria }

Torniamo al 53 e supponiamo di aver osservato 100 assenze. Sappiamo dunque che $X>100$: una parte della sequenza è ormai nota. Ci interessa la probabilità di *altre* 18 assenze, cioè che $X>118$, **dato** ciò che sappiamo già. Per calcolarla dobbiamo restringere l’attenzione alle attese che hanno superato 100.

Ricordiamo la definizione di probabilità condizionata: la probabilità di $A$ sapendo che si è verificato $B$ è

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}.
$$

Qui $A=\{X>118\}$ e $B=\{X>100\}$, quindi:

$$
P(X>118\mid X>100)
=\frac{P(\{X>118\}\cap\{X>100\})}{P(X>100)}.
$$

L’intersezione si semplifica. Se il successo arriva dopo la prova 118, arriva certamente anche dopo la prova 100: l’evento $\{X>118\}$ è *contenuto* in $\{X>100\}$. Perciò l’intersezione coincide con $\{X>118\}$ e il numeratore è $P(X>118)$. Sostituiamo le code, che conosciamo:

$$
\begin{aligned}
P(X>118\mid X>100)
&=\frac{(17/18)^{118}}{(17/18)^{100}}\\
&=\left(\frac{17}{18}\right)^{118-100}\\
&=\left(\frac{17}{18}\right)^{18}.
\end{aligned}
$$

Nel secondo passaggio abbiamo usato la regola delle potenze: dividere potenze con la stessa base sottrae gli esponenti. Il risultato coincide con $P(X>18)$, la probabilità di 18 assenze quando *iniziamo* a osservare. **I 100 fallimenti non hanno modificato la distribuzione dell’attesa futura.**

Il fatto non dipende dai numeri scelti. Generalizziamo con due interi $s,t\ge0$ e $0<p<1$. Qui $s$ è il tempo già trascorso e $t$ è l’attesa ulteriore che ci interessa. L’evento condizionante ha probabilità $(1-p)^s>0$, quindi possiamo dividere:

$$
\begin{aligned}
P(X>s+t\mid X>s)
&=\frac{P(X>s+t)}{P(X>s)}\\
&=\frac{(1-p)^{s+t}}{(1-p)^s}\\
&=(1-p)^t=P(X>t).
\end{aligned}
$$

Abbiamo ottenuto l’**assenza di memoria**:

$$
\boxed{P(X>s+t\mid X>s)=P(X>t).}
$$

A sinistra abbiamo già aspettato $s$ prove senza successo e guardiamo l’attesa *residua*. A destra partiamo da zero e guardiamo un’attesa *nuova*. Le due probabilità coincidono per ogni soglia futura $t$.

<figure markdown="0">
<svg viewBox="0 0 560 205" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Due righe. Nella prima si osservano tre prove future da subito. Nella seconda cinque prove sono già fallite, e le tre prove future sono identiche. In entrambi i casi la probabilità che tutte e tre falliscano è uno meno p alla terza.">
<text x="20" y="45" fill="currentColor" font-weight="bold">Da subito</text>
<g fill="#4051b5"><rect x="300" y="25" width="60" height="32" rx="5"/><rect x="370" y="25" width="60" height="32" rx="5"/><rect x="440" y="25" width="60" height="32" rx="5"/></g>
<g fill="#fff" text-anchor="middle" font-weight="bold"><text x="330" y="46">?</text><text x="400" y="46">?</text><text x="470" y="46">?</text></g>
<text x="20" y="125" fill="currentColor" font-weight="bold">Dopo 5 fallimenti</text>
<g fill="none" stroke="currentColor" stroke-dasharray="4 3"><rect x="20" y="140" width="46" height="32" rx="5"/><rect x="74" y="140" width="46" height="32" rx="5"/><rect x="128" y="140" width="46" height="32" rx="5"/><rect x="182" y="140" width="46" height="32" rx="5"/><rect x="236" y="140" width="46" height="32" rx="5"/></g>
<g fill="currentColor" text-anchor="middle"><text x="43" y="161">no</text><text x="97" y="161">no</text><text x="151" y="161">no</text><text x="205" y="161">no</text><text x="259" y="161">no</text></g>
<g fill="#4051b5"><rect x="300" y="140" width="60" height="32" rx="5"/><rect x="370" y="140" width="60" height="32" rx="5"/><rect x="440" y="140" width="60" height="32" rx="5"/></g>
<g fill="#fff" text-anchor="middle" font-weight="bold"><text x="330" y="161">?</text><text x="400" y="161">?</text><text x="470" y="161">?</text></g>
<text x="400" y="88" text-anchor="middle" fill="#2e9e5b" font-weight="bold">tutte e tre falliscono: (1 − p)³</text>
<text x="400" y="106" text-anchor="middle" fill="#2e9e5b" font-weight="bold">in entrambe le righe</text>
<text x="151" y="196" text-anchor="middle" fill="currentColor">già visti: non cambiano il futuro</text>
</svg>
<figcaption>Le prove future sono le stesse, con le stesse probabilità, con o senza un passato di fallimenti.</figcaption>
</figure>

Una precisazione per non fraintendere. L’«orologio del totale» continua a contare: i tentativi già spesi restano spesi, e il totale sarà comunque maggiore di $s$. È la **distribuzione del numero di prove ancora necessarie** a essere uguale a quella iniziale. Dopo 100 fallimenti al Lotto restano, in media, altre 18 prove: il totale medio, *condizionato* a quelle 100 assenze, è 118.

Il caso $p=1$ richiede attenzione: dopo una prova non possiamo aver osservato un fallimento, quindi non ha senso condizionare su quell’evento impossibile.

??? note "Approfondimento facoltativo — Dall’assenza di memoria alla proprietà di Markov"
    L’assenza di memoria dice che il passato non conta: dopo $s$ fallimenti, il futuro dell’attesa è lo stesso dell’inizio. Molti fenomeni non sono così semplici, ma soddisfano una versione più debole e molto più utile della stessa idea: il passato conta, ma **solo attraverso il presente**.

    **La proprietà di Markov.** Immaginiamo un sistema che a ogni passo $n$ si trova in uno *stato* $X_n$: il meteo di oggi, la casella di una pedina, la pagina web che stiamo guardando. Diciamo che il sistema è **markoviano** se, per prevedere il passo successivo, basta conoscere lo stato attuale:

    $$
    P(X_{n+1}=j\mid X_n=i,\,X_{n-1},\dots,X_0)=P(X_{n+1}=j\mid X_n=i).
    $$

    Il resto della storia si può dimenticare: ciò che serve del passato è già contenuto nello stato presente. Le prove ripetute della Geometrica sono un caso estremo. Finché aspettiamo, lo stato è sempre lo stesso, «non è ancora successo», e quindi il futuro non dipende nemmeno da quanto abbiamo già aspettato.

    **Un esempio.** Un modello giocattolo del meteo: se oggi piove, domani pioverà con probabilità $0{,}6$; se oggi è sereno, con probabilità $0{,}2$. Il modello non chiede se ha piovuto anche ieri. È una semplificazione, ed è proprio questo il punto: con due soli numeri possiamo calcolare la probabilità di qualunque sequenza di giorni, moltiplicando una probabilità condizionata dopo l’altra, come negli alberi della Settimana 2. Se oggi piove, la probabilità che piova anche domani e dopodomani è $0{,}6\cdot0{,}6=0{,}36$.

    **Perché è così importante.** Andrej Markov introdusse queste *catene* nel 1906; è lo stesso Markov della disuguaglianza della Settimana 8. L’idea si è diffusa ovunque perché trasforma un problema con una memoria lunghissima in uno in cui basta guardare un passo alla volta. Due esempi:

    - **Simulazione.** I metodi *Monte Carlo a catena di Markov* (MCMC) costruiscono apposta una catena che, camminando a lungo, produce campioni da distribuzioni troppo complicate per essere calcolate direttamente.
    - **Web.** Il PageRank di Google immagina un navigatore che salta a caso da un link all’altro. L’importanza di una pagina è la frazione di tempo che il navigatore, alla lunga, vi trascorre.

    **E nell’intelligenza artificiale.**

    - **Modelli del linguaggio.** Un modello linguistico genera un token alla volta, e la scelta del prossimo dipende solo dal contesto che ha davanti. Con una finestra di contesto finita è, formalmente, una catena di Markov il cui stato è l’intero contesto. Shannon, nel 1948, faceva lo stesso con uno stato di una sola parola.
    - **Apprendimento per rinforzo.** Un agente che gioca o guida un robot si modella con un *processo decisionale di Markov*: stato attuale e azione scelta determinano le probabilità dello stato successivo.
    - **Modelli di diffusione.** I generatori di immagini imparano a percorrere all’indietro una catena di Markov che aggiunge rumore passo dopo passo: partono da puro rumore e la risalgono fino a un’immagine nuova.

    **La lezione per chi costruisce modelli.** La proprietà di Markov dipende da come **scegliamo lo stato**. Se il meteo di domani dipende da oggi e da ieri, basta prendere come stato la coppia (ieri, oggi); il prezzo è uno stato più grande. Se invece lo stato trascura qualcosa che conta, come un guasto persistente nei retry della §8, il modello sbaglia.

??? note "Approfondimento facoltativo — Il legame con la media $1/p$"
    Se hai letto l’approfondimento facoltativo della §4 sulla media, riconoscerai l’idea. Il ragionamento sul primo tentativo, «dopo un fallimento il problema ricomincia identico», era già un’applicazione dell’assenza di memoria. Qui la rendiamo esplicita e la formuliamo come proprietà della distribuzione.

!!! example "Sosta di verifica"
    Con $p=1/18$, qual è la probabilità di altre 18 assenze dopo 30 assenze già osservate? E dopo 500? Prova a rispondere senza fare nessuna divisione.

    ??? esempio-svolto "Risposta"
        In entrambi i casi vale $(17/18)^{18}\approx0{,}357$. L’assenza di memoria dice che la probabilità non dipende dal passato $s$, che sia 30 o 500.

### 6. Il ritardatario e la fallacia del giocatore {: #fallacia-giocatore }

La probabilità che il 53 esca alla prossima estrazione rimane **$1/18$**, anche dopo 100 assenze. Né più alta, né più bassa. Credere che sia diventato «dovuto» è la **fallacia del giocatore**.

L’intuizione sbagliata nasce da un’idea ragionevole in apparenza: «alla lunga le frequenze si compensano». È vero che, su moltissime estrazioni, la frequenza del 53 si avvicina a $1/18$. Ma non si avvicina perché l’urna «recupera» il ritardo. Il ritardo non viene recuperato: viene **diluito**. Dopo 100 assenze, le prossime 1000 estrazioni produrranno ancora circa $1000/18$ comparse, come se nulla fosse successo; le 100 assenze iniziali pesano sempre meno nella frequenza complessiva, ma non vengono compensate.

Per vedere l’errore, confrontiamo due domande simili che hanno risposte molto diverse:

| Informazione disponibile | Domanda | Probabilità |
|---|---|---|
| Non abbiamo ancora osservato la sequenza | Mancherà per tutte le prossime 118 estrazioni? | $(17/18)^{118}\approx0{,}00118$ |
| Abbiamo già osservato 100 assenze | Mancherà per altre 18 estrazioni? | $(17/18)^{18}\approx0{,}357$ |

Nella prima domanda tutte le 118 assenze sono ancora incerte, e la loro congiunzione è molto rara. Nella seconda le prime 100 sono già note: la probabilità condizionata riguarda soltanto ciò che resta da osservare. La rarità dell’*intera* sequenza non rende meno probabili i suoi possibili proseguimenti. Una sequenza di 118 assenze è rara *prima* di cominciare; dopo le prime 100, quella rarità è già stata «spesa».

Finora ci siamo chiesti che cosa succede **dopo** un ritardo. Resta un’altra domanda, che spiega perché i ritardi vistosi ci colpiscono tanto: **quanto deve stupirci** un ritardo così lungo? La risposta dipende da come lo abbiamo trovato.

- **Scelgo prima.** Oggi decido di seguire il 53 sulla ruota di Venezia, da questa estrazione in avanti. La probabilità che manchi per 100 estrazioni di fila è $(17/18)^{100}\approx0{,}0033$, circa 1 su 300. Se succede, è davvero sorprendente.
- **Cerco dopo.** Apro le statistiche del Lotto e cerco il numero più in ritardo. Sto guardando 90 numeri su una decina di ruote, cioè circa 900 coppie (numero, ruota). Ciascuna ha la stessa probabilità $(17/18)^{100}\approx0{,}0033$ di avere alle spalle almeno 100 assenze, quindi in media ne troverò $900\cdot0{,}0033\approx3$.

L’evento è lo stesso, «un numero assente da 100 estrazioni», ma nel secondo caso abbiamo avuto centinaia di occasioni per vederlo. In questo caso, trovarne uno è normale; strano sarebbe non trovarne nessuno. Anche il 53 di Venezia non era stato scelto in anticipo: è diventato famoso proprio perché, fra tutti, era il più in ritardo. È come cercare la persona più alta in uno stadio: che superi i due metri non ci stupisce, perché l’abbiamo scelta proprio per la sua altezza.

Questo è un secondo errore, diverso dalla fallacia del giocatore, e spesso la alimenta:

| Errore | Che cosa pensiamo | Perché è sbagliato |
|---|---|---|
| Di previsione | «È in ritardo, quindi uscirà» | La probabilità resta $1/18$ |
| Di valutazione | «Un ritardo così è incredibile, deve voler dire qualcosa» | L’abbiamo trovato cercando fra centinaia di candidati |

La regola generale è che, prima di giudicare sorprendente un risultato, bisogna dichiarare **quante possibilità abbiamo esaminato**. In statistica si parla di problema dei **confronti multipli**.

??? note "Approfondimento facoltativo — E se le attese non sono indipendenti?"
    Sulla stessa ruota escono 5 numeri senza reinserimento: se esce il 53, resta un posto in meno per gli altri. Le attese di numeri diversi quindi non sono del tutto indipendenti. Il conto della media però non ne risente. Il numero di coppie in ritardo è una somma di 900 indicatrici, e la media di una somma è la somma delle medie anche per variabili dipendenti.

    La dipendenza cambia invece la probabilità di trovarne *almeno una*. Vediamolo con i numeri: una coppia fissata ha probabilità $q=(17/18)^{100}\approx0{,}003293$ di avere almeno 100 assenze. Se i ritardi dei 90 numeri di una ruota fossero indipendenti, la probabilità che nessuno abbia quel ritardo sarebbe $(1-q)^{90}$; quella di trovarne almeno uno sarebbe quindi $1-(1-q)^{90}\approx25{,}69\%$. Tenendo conto della dipendenza, si ottiene invece circa **$25{,}90\%$**. Il calcolo usa l’inclusione-esclusione: sommiamo le probabilità dei singoli ritardi, sottraiamo quelle dei ritardi simultanei di due numeri, aggiungiamo quelle dei ritardi simultanei di tre, e così via, per evitare conteggi multipli.

    Su 10 ruote indipendenti tra loro, la probabilità di trovarne almeno uno diventa $1-(1-0{,}258987)^{10}\approx95{,}01\%$. La dipendenza modifica il valore preciso, ma resta il punto: cercando fra più numeri e più ruote, abbiamo più occasioni di incontrare un ritardo estremo.

!!! note "Da portare con sé"
    Il modello Geometrico descrive prove nuove, indipendenti, con la stessa $p$. L’assenza di memoria deriva direttamente da queste ipotesi. Un passato di fallimenti non crea un credito da riscuotere: l’urna non sa nulla.

### 7. Laboratorio: osservare molte attese {: #lab-geometrica }

Una simulazione permette di osservare come le proprietà appena ricavate si riflettono in un insieme di attese: possiamo confrontare la media e le frequenze del campione con le previsioni teoriche.

Prima di eseguire il codice, scrivi tre previsioni per $p=1/18$:

1. la media dell’attesa;
2. la probabilità di superare 18 prove;
3. la probabilità di altre 18 assenze dopo averne già osservate 30.

Le ultime due, per l’assenza di memoria, dovrebbero coincidere.

Il codice genera 50.000 attese complete. `generatore.random()` produce un numero uniforme fra 0 e 1: confrontarlo con $p$ realizza una prova con probabilità di successo $p$. Ogni ciclo del `while` conta una nuova prova, fino al primo successo.

<div class="psi-exec" markdown="1">
```python
from random import Random

generatore = Random(42)
p = 1 / 18          # il 53 è uno dei 5 numeri estratti su 90
prove = 50000       # quante attese complete simuliamo


def attesa(p):
    """Numero dell'estrazione in cui arriva il primo successo."""
    k = 1
    # Ogni estrazione è nuova: la probabilità non dipende dal passato.
    while generatore.random() >= p:
        k += 1
    return k


attese = [attesa(p) for _ in range(prove)]
print(f"Media teorica 1/p: {1 / p:.2f}")
print(f"Media simulata: {sum(attese) / prove:.2f}")

# Coda: più di 18 estrazioni significa 18 fallimenti di fila.
oltre_18 = sum(x > 18 for x in attese) / prove
print(f"P(X > 18) teorica: {(1 - p) ** 18:.4f}")
print(f"P(X > 18) simulata: {oltre_18:.4f}")

# Assenza di memoria: guardiamo solo le attese già oltre 30.
lunghe = [x for x in attese if x > 30]
ancora = sum(x > 30 + 18 for x in lunghe) / len(lunghe)
print(f"Attese già oltre 30: {len(lunghe)}")
print(f"Tra queste, ancora 18 fallimenti: {ancora:.4f}")
```
</div>

Un punto da leggere con attenzione: il denominatore dell’ultima frazione è `len(lunghe)`. Stiamo guardando soltanto le attese che hanno già superato 30. Dividere per tutte le 50.000 attese risponderebbe a un’altra domanda, la probabilità *non condizionata* di superare 48.

La media simulata sarà vicina a 18 e le due frequenze vicine a 0,357. Non devono coincidere esattamente con la teoria: una simulazione finita fluttua sempre un po’.

**Un esperimento in più.** Prova a sostituire la soglia 30 con 60 in entrambe le righe interessate. Il gruppo condizionante si restringe, quindi la stima diventa più variabile. Se un esperimento producesse un gruppo vuoto, quella frequenza non sarebbe calcolabile: questo non significherebbe che la probabilità teorica è zero, ma soltanto che non abbiamo osservato abbastanza casi.

### 8. Tentativi, timeout e limite ai retry {: #retry }

Un client invia una richiesta e, se fallisce, riprova. Per progettare questa procedura ci interessano sia il numero di tentativi necessari sia il tempo che richiedono.

Supponiamo che ogni tentativo riesca con probabilità $p=0{,}2$, indipendentemente dagli altri. Il numero $X$ di tentativi fino al primo successo è Geometrico e ha media 5.

Se **ogni tentativo dura esattamente 0,3 secondi**, il tempo totale è $T=0{,}3X$. Per linearità:

$$
\mathbb{E}[T]=0{,}3\,\mathbb{E}[X]=0{,}3\cdot5=1{,}5\text{ secondi}.
$$

L’ipotesi sulla durata conta. Se inseriamo pause crescenti, oppure se i tentativi riusciti e quelli falliti hanno durate diverse, il tempo totale deve includere quelle durate e il conto cambia.

Una durata media di 1,5 secondi non dice ancora quando convenga interrompere i tentativi. Per scegliere un limite serve stabilire quale probabilità di insuccesso siamo disposti ad accettare. Se vogliamo una probabilità di successo **almeno del 99% entro $r$ tentativi**, traduciamo la richiesta in una disuguaglianza sulla funzione cumulativa:

$$
P(X\le r)\ge0{,}99
\quad\Longleftrightarrow\quad
1-0{,}8^r\ge0{,}99
\quad\Longleftrightarrow\quad
0{,}8^r\le0{,}01.
$$

Cerchiamo il più piccolo intero $r$ che soddisfa l’ultima condizione. Proviamo qualche valore:

| $r$ | 5 | 10 | 20 | 21 |
|---|---|---|---|---|
| $0{,}8^r$ | 0,328 | 0,107 | 0,0115 | 0,0092 |

La soglia 0,01 viene superata verso il basso proprio fra 20 e 21: $0{,}8^{20}\approx0{,}0115>0{,}01$, mentre $0{,}8^{21}\approx0{,}00922<0{,}01$. Servono quindi **21 tentativi**. Cinque è la media dell’attesa senza limite; ventuno è un limite che lascia meno dell’1% di probabilità di non riuscire. Sono due domande diverse, con due risposte molto diverse.

Un client che si ferma dopo $r$ prove non esegue più il numero illimitato $X$: esegue $\min(X,r)$ prove e può terminare senza successo. La Geometrica ci aiuta comunque, perché la probabilità di esaurire il budget è proprio la coda $P(X>r)=0{,}8^r$.

Controlliamo infine l’ipotesi più delicata. Durante un guasto persistente, sapere che un tentativo è fallito può rendere più probabile un altro fallimento. In quel caso le prove non sono indipendenti, e il modello Geometrico non descrive più la situazione.

Quando una richiesta fallisce, il client può riprovare: questo nuovo tentativo si chiama *retry*. Riprovare subito, però, può servire a poco: se il server è ancora sovraccarico, anche la nuova richiesta rischia di fallire e aggiunge altro lavoro da smaltire.

Una possibile strategia è aspettare sempre di più fra un tentativo e il successivo. Per esempio: dopo il primo fallimento aspettiamo 1 secondo, dopo il secondo 2 secondi, poi 4, poi 8. Poiché la pausa raddoppia ogni volta, questa strategia si chiama *exponential backoff*. Le pause danno al servizio tempo per riprendersi e riducono la frequenza delle richieste.

Questo aiuta a gestire il guasto, ma basta per poter usare la Geometrica? Dobbiamo ancora controllare le sue due ipotesi: **tentativi indipendenti** e **stessa probabilità di successo $p$ a ogni tentativo**. Se il guasto persiste, gli esiti possono restare legati tra loro; se nel frattempo il servizio si riprende, la probabilità di successo può cambiare. Allungare le pause, da solo, non garantisce nessuna delle due ipotesi. La Geometrica può descrivere il **numero di tentativi fino al primo successo** soltanto se queste ipotesi sono ragionevoli; il tempo totale di attesa dipende anche dalle pause scelte.

!!! note "Che cosa abbiamo ottenuto"
    La Geometrica ci permette di rispondere a due domande diverse: quanti tentativi servono in media ($1/p$) e quanti tentativi concedere per raggiungere almeno una probabilità di successo prefissata (usando la coda). La seconda domanda è essenziale quando progettiamo i retry, per esempio nella consegna di messaggi: permette di scegliere il limite ai tentativi in funzione dell’affidabilità richiesta, sotto le ipotesi del modello.

## Atto III — I calci di cavallo dell’esercito prussiano {: #bortkiewicz }

### 9. Prima del modello: che cosa misura la tabella? {: #dati-bortkiewicz }

Finora fissavamo il traguardo del primo successo e contavamo le prove necessarie per raggiungerlo. Nei dati che stiamo per leggere è fissato invece il periodo di osservazione, un anno, e contiamo **quanti eventi vi accadono**. Il caso dei militari morti per il calcio di un cavallo ci permetterà di studiare questa diversa domanda a partire da una tabella storica.

La distribuzione che useremo per descrivere questi conteggi nasce però sessant’anni prima della loro analisi, e lontano dalle caserme: in uno studio sui giudizi dei tribunali.

Nel 1837 il matematico francese **Siméon-Denis Poisson** pubblicò un libro dal titolo lungo: *Recherches sur la probabilité des jugements en matière criminelle et en matière civile*, cioè «Ricerche sulla probabilità dei giudizi in materia penale e civile». La domanda che lo muoveva era concreta: quanto è probabile che una giuria sbagli, condannando un innocente o assolvendo un colpevole?

Dentro il libro, in poche pagine, Poisson studia un caso particolare della distribuzione binomiale: **moltissime prove, ciascuna con una probabilità di successo piccolissima**. In questo caso il conto esatto della distribuzione binomiale è scomodo, e Poisson ne ricava una formula più semplice, che dipende da un solo numero: la media $np$. È la formula che oggi porta il suo nome. Nel libro, però, resta un risultato di calcolo, un passaggio tecnico: non viene confrontata con conteggi osservati. Come accade spesso nella storia della scienza, l’idea non era del tutto nuova: Abraham de Moivre aveva ottenuto un’approssimazione simile già nel 1711.

Poisson è ricordato anche per un nome. Negli stessi anni chiamò **legge dei grandi numeri** un’idea che studieremo nella Settimana 8: se ripetiamo una prova moltissime volte, la frequenza di un evento si stabilizza vicino alla sua probabilità. Ne abbiamo già visto un esempio nell’[Atto II](#fallacia-giocatore): su moltissime estrazioni la frequenza del 53 si avvicina a $1/18$, senza che l’urna «recuperi» nulla.

Sessantuno anni dopo, nel 1898, l’economista e statistico Ladislaus von Bortkiewicz pubblicò *Das Gesetz der kleinen Zahlen*, «La legge dei piccoli numeri». Il titolo richiama la legge di Poisson. I «grandi numeri» sono le moltissime ripetizioni che rendono stabili le frequenze. I «piccoli numeri» sono i conteggi piccoli degli eventi rari: zero, uno, due incidenti in un anno. Anche questi conteggi, raccolti su molte unità, mostrano una regolarità, e nel libro Bortkiewicz li confronta proprio con la formula di Poisson.

Il quarto esempio del libro riguarda i militari dell’esercito prussiano morti per il calcio di un cavallo. È un caso particolarmente istruttivo, perché ci permette di confrontare una distribuzione teorica con dati registrati molto prima del nostro calcolo.

Seguiremo la stessa strada, ma in un ordine diverso da quello della storia. Prima guardiamo i dati, senza formule (§9 e §10). Poi costruiamo noi la formula di Poisson, un passo alla volta ([Atto IV](#poisson)). Infine la mettiamo alla prova sulla tabella di Bortkiewicz ([§14](#confronto-dati)), come fece lui.

Il libro considera 20 anni, dal 1875 al 1894, e 14 corpi d’armata. Qui usiamo la tabella relativa ai **10 corpi comparabili** del confronto principale. Il punto metodologico è scegliere unità con esposizioni al rischio abbastanza simili: mescolare unità molto diverse (per esempio un corpo con molti più cavalli degli altri) può cambiare la dispersione dei conteggi.

L’unità osservata è un **corpo-anno**: un corpo d’armata seguito per un anno. Le osservazioni sono quindi $10\cdot20=200$. Per ciascuna registriamo un conteggio, cioè il numero di morti di quel corpo in quell’anno:

| Morti in un corpo-anno | 0 | 1 | 2 | 3 | 4 | 5 o più |
|---|---|---|---|---|---|---|
| Numero di corpi-anno | 109 | 65 | 22 | 3 | 1 | 0 |

Leggiamo una colonna con attenzione. Il 22 sotto il 2 significa che **22 corpi-anno hanno avuto due morti ciascuno**. Non significa che i morti totali siano 22. La riga in basso conta *corpi-anno*; la riga in alto indica *quanti morti* ciascuno di essi ha avuto. Confondere le due righe è l’errore più comune con le tabelle di frequenza.

Prima di fare qualunque calcolo, controlliamo che le frequenze sommino a 200:

$$
109+65+22+3+1=200.
$$

Il controllo torna: ogni corpo-anno compare esattamente in una colonna.

Per trovare il numero **totale** di morti, moltiplichiamo invece ogni conteggio per la sua frequenza (22 corpi-anno con 2 morti ciascuno danno $2\cdot22=44$ morti, e così via):

$$
0\cdot109+1\cdot65+2\cdot22+3\cdot3+4\cdot1
=65+44+9+4=122.
$$

Dividendo il totale dei morti per il numero di osservazioni otteniamo la media:

$$
\overline{x}=\frac{122}{200}=0{,}61\text{ morti per corpo-anno}.
$$

Nessun corpo-anno ha avuto 0,61 morti: ogni dato è un intero. La media riassume le 200 osservazioni ed è un numero di sintesi, non un risultato possibile.

Nota bene: Il simbolo $\overline{x}$ indica la media di questi dati; $\mathbb{E}[X]$ indica invece la media teorica di una distribuzione. Nelle settimane successive chiariremo il legame fra questi due numeri. Per ora ci limitiamo ad usare il valore 0,61 per costruire il modello probabilistico e confrontarne le probabilità con la tabella.

### 10. Possiamo prevedere la forma del conteggio? {: #legge-piccoli-numeri }

La media 0,61 riassume il numero di morti per corpo-anno, ma da sola non dice come quel totale si distribuisca fra le unità osservate. La tabella mostra anche molti zeri e pochi conteggi superiori a due. Vorremmo spiegare questa forma attraverso il meccanismo degli incidenti: **esiste un modello che, usando soltanto la media 0,61, produca probabilità credibili per zero, uno, due e più morti?**

Pensiamo alle *occasioni* di incidente: molte persone, molti giorni, molti contatti con i cavalli. Ogni singola occasione ha una probabilità piccolissima di produrre l’evento contato, ma le occasioni sono moltissime. È proprio la situazione in cui la distribuzione binomiale ci dà un primo schema: tante prove, ciascuna con probabilità $p$ molto piccola.

Qui però incontriamo un ostacolo pratico. Non conosciamo un numero preciso di prove $n$, né una probabilità $p$ per occasione. Una giornata potrebbe contenere un numero diverso di contatti con i cavalli. Il dato disponibile suggerisce piuttosto il valore del prodotto $np$, cioè il **numero medio di eventi** nell’unità osservata, che qui è 0,61.

La _distribuzione di Poisson_ nasce da un’idealizzazione: lasciamo crescere il numero di occasioni, facciamo diminuire la probabilità di ciascuna, e **teniamo fissata la media totale**. Nel limite non ci serve più sapere né $n$ né $p$: ci basta la media. Questo è il motivo per cui la distribuzione di Poisson è così utile nella pratica.

La rarità, da sola, non assicura però che questo modello sia adatto. Contano anche l’**indipendenza** delle occasioni e l’**uniformità** dell’esposizione: sono le ipotesi che dovremo rendere precise nella costruzione.

Prima di costruire la formula, torna alla media 0,61. Essa è inferiore a 1: ti aspetti molti corpi-anno senza morti? Quale frazione dei 200 prevedi con zero morti: circa la metà, oppure quasi tutti? Annota la tua stima, la confronteremo con il conto del §12.

## Atto IV — Costruire la distribuzione di Poisson {: #poisson }

### 11. Dividere l’intervallo in pezzetti {: #pezzetti }

Fissiamo un corpo e un anno. Chiamiamo $\lambda$, «lambda», il **numero medio di eventi nell’intero intervallo**. Per il modello dei dati scegliamo $\lambda=0{,}61$: è una *media* riferita all’intervallo scelto (qui un anno), e non una probabilità.

Partiamo da una semplificazione: consideriamo l’anno come un unico pezzetto e ammettiamo soltanto l’assenza di eventi oppure un evento. Il conteggio vale quindi 0 oppure 1, ed è una variabile bernoulliana. La media di una variabile bernoulliana è la sua probabilità, e deve valere $\lambda$: dunque $p=\lambda=0{,}61$. La probabilità di zero eventi è $1-0{,}61=0{,}39$.

Questo primo modello esclude però conteggi che compaiono nella tabella: un anno può contenere due o tre morti. Dividendo l’anno in due metà e ammettendo un evento in ciascuna potremmo già arrivare a un totale di due. Suddivisioni più fini permetterebbero conteggi ancora maggiori, mantenendo semplice la descrizione di ciascun pezzetto.

Dividiamo l’anno in $n$ pezzetti uguali. In un primo modello semplificato ciascun pezzetto può contenere un evento oppure nessuno. Se vogliamo che la media totale resti $\lambda$, la probabilità di un evento in ciascun pezzetto deve essere

$$
p_n=\frac{\lambda}{n},
\qquad\text{perché}\qquad
np_n=n\frac{\lambda}{n}=\lambda.
$$

Il pedice $n$ ricorda che la probabilità cambia quando cambia la suddivisione. Con più pezzetti, ciascuno dura meno e la sua probabilità diminuisce. Un punto da fissare bene: **non stiamo aumentando la durata totale dell’osservazione**, ma soltanto tagliandola in parti più fini. Quando $n$ cresce, la media totale rimane $\lambda$.

<figure markdown="0">
<svg viewBox="0 0 560 200" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Un anno diviso in dieci pezzetti uguali. In due pezzetti c'è un evento, segnato in arancione. Ogni pezzetto ha probabilità lambda su n di contenere un evento.">
<text x="280" y="22" text-anchor="middle" fill="currentColor" font-weight="bold">Un corpo-anno diviso in n = 10 pezzetti</text>
<g fill="none" stroke="currentColor" stroke-width="2"><rect x="30" y="45" width="50" height="45"/><rect x="80" y="45" width="50" height="45"/><rect x="130" y="45" width="50" height="45"/><rect x="180" y="45" width="50" height="45"/><rect x="230" y="45" width="50" height="45"/><rect x="280" y="45" width="50" height="45"/><rect x="330" y="45" width="50" height="45"/><rect x="380" y="45" width="50" height="45"/><rect x="430" y="45" width="50" height="45"/><rect x="480" y="45" width="50" height="45"/></g>
<g fill="#e07a1f"><circle cx="155" cy="67" r="10"/><circle cx="405" cy="67" r="10"/></g>
<g fill="currentColor" text-anchor="middle"><text x="55" y="108">1</text><text x="105" y="108">2</text><text x="155" y="108">3</text><text x="205" y="108">4</text><text x="255" y="108">5</text><text x="305" y="108">6</text><text x="355" y="108">7</text><text x="405" y="108">8</text><text x="455" y="108">9</text><text x="505" y="108">10</text></g>
<text x="280" y="138" text-anchor="middle" fill="currentColor">Ogni pezzetto: un evento con probabilità λ/n, oppure niente; pezzetti indipendenti.</text>
<text x="280" y="160" text-anchor="middle" fill="currentColor">Distribuzione binomiale(n, λ/n): media λ per ogni n.</text>
<text x="280" y="187" text-anchor="middle" fill="#e07a1f" font-weight="bold">In questo corpo-anno: 2 eventi</text>
</svg>
<figcaption>Più pezzetti significa pezzetti più corti, ciascuno con un evento ancora più raro; la media totale resta la stessa.</figcaption>
</figure>

Assumiamo che i pezzetti abbiano la stessa probabilità di evento e siano indipendenti. Il conteggio del modello a $n$ pezzetti, che chiamiamo $X_n$, segue allora una distribuzione binomiale:

$$
X_n\sim\operatorname{Binomiale}\left(n,\frac{\lambda}{n}\right),
\qquad n>\lambda.
$$

La condizione $n>\lambda$ assicura che $\lambda/n<1$, cioè che $\lambda/n$ sia davvero una probabilità. Con $\lambda=0{,}61$ basta già $n=1$.

La restrizione a un solo evento per pezzetto rende questo un **modello approssimato**: nella realtà un intervallo finito può contenere più eventi. L’idea è di rendere i pezzetti sempre più corti, così che la probabilità di eventi multipli nello stesso pezzetto diventi trascurabile nel conteggio complessivo.

Questo funziona soltanto sotto un’ipotesi sul fenomeno: gli eventi non devono arrivare in **gruppi simultanei** che restano indivisibili, per quanto accorciamo il pezzetto. Dividere il tempo, da solo, non crea indipendenza né elimina le raffiche. Stiamo costruendo un modello per eventi che:

- arrivano **singolarmente**;
- con un **tasso stabile**;
- e con **conteggi indipendenti** in intervalli che non si sovrappongono.

Teniamo a mente questa lista: ci tornerà utile quando discuteremo i limiti del modello.

### 12. Zero eventi: il primo limite {: #numero-e }

Il conteggio totale è zero soltanto se tutti gli $n$ pezzetti sono vuoti. Questo caso permette di seguire il passaggio a suddivisioni sempre più fini senza dover scegliere le posizioni degli eventi. La probabilità di un pezzetto vuoto è $1-\lambda/n$; per indipendenza moltiplichiamo $n$ volte lo stesso fattore:

$$
P(X_n=0)=\left(1-\frac{\lambda}{n}\right)^n.
$$

Con $\lambda=0{,}61$ calcoliamo questa probabilità per suddivisioni sempre più fini.

!!! example "Sosta di verifica"
    Un corpo-anno è diviso in $n$ pezzetti; in ciascuno capita un morto con probabilità $0{,}61/n$, indipendentemente dagli altri. Con la calcolatrice, trova la probabilità di nessun morto in un anno per $n=1$, 2, 10, 100 e 365. Che cosa succede ai valori quando $n$ cresce?

    ??? esempio-svolto "Risposta"
        Si calcola $\left(1-0{,}61/n\right)^n$ per ciascun $n$; per confronto aggiungiamo anche $n=1000$:

        | Pezzetti $n$ | 1 | 2 | 10 | 100 | 365 | 1000 |
        |---|---|---|---|---|---|---|
        | Probabilità di zero eventi in un anno | 0,3900 | 0,4830 | 0,5329 | 0,5423 | 0,5431 | 0,5432 |

        Per esempio, con $n=2$: $(1-0{,}305)^2=0{,}695^2\approx0{,}4830$. Un errore comune è calcolare $(1-0{,}61)^n$: così ogni pezzetto avrebbe probabilità 0,61, e il numero medio di morti crescerebbe con $n$ invece di restare 0,61.

Il primo valore della tabella è quello che avevamo trovato prima, con un solo pezzetto: $1-0{,}61=0{,}39$. Poi i valori crescono sempre più lentamente e **sembrano stabilizzarsi** attorno a 0,543. Questo è il comportamento che ci interessa spiegare.

Nell’espressione cambiano *due cose insieme*: il numero di fattori $n$ aumenta, e ciascun fattore $1-\lambda/n$ si avvicina a 1. Se guardiamo soltanto la base potremmo essere tentati di dire che il risultato sia 1, perché $1^n=1$. Ma la base non è esattamente 1: è un po’ più piccola, e questo scarto viene elevato a una potenza sempre più grande.

Le due variazioni si bilanciano e producono un limite diverso da 1. Un modo per intuire quale sia: per $x$ piccolo vale $\ln(1-x)\approx-x$, quindi

$$
\ln\left(1-\frac{\lambda}{n}\right)^n=n\ln\left(1-\frac{\lambda}{n}\right)\approx n\cdot\left(-\frac{\lambda}{n}\right)=-\lambda.
$$

Il logaritmo del risultato si avvicina a $-\lambda$, e il risultato stesso a $e^{-\lambda}$. Questo è un argomento di *intuizione*; il risultato preciso è un teorema di analisi matematica.

$$
\boxed{\left(1-\frac{\lambda}{n}\right)^n\longrightarrow e^{-\lambda}.}
$$

La freccia significa che i valori si avvicinano al numero a destra quando $n$ cresce senza limite, mantenendo $\lambda$ fissato. Il numero $e\approx2{,}71828$ è la base dell’esponenziale naturale; un esponente negativo indica il reciproco, quindi $e^{-\lambda}=1/e^\lambda$.

Un chiarimento sul ruolo della tabella: qui usiamo questo risultato dell’analisi per capire il modello, ma non lo stiamo dimostrando attraverso i numeri. La tabella mostra, in un caso, il comportamento che il teorema garantisce in generale.

Applicando il limite al nostro corpo-anno, con $\lambda=0{,}61$, otteniamo:

$$
P(X=0)=e^{-0{,}61}\approx0{,}54335.
$$

Fermiamoci a distinguere due cose che si confondono facilmente. Il parametro $\lambda=0{,}61$ **non è una probabilità**: è una *media*, un numero di eventi. Il valore $0{,}54335$ è invece la probabilità di un conteggio preciso, zero.

Su 200 corpi-anno il numero atteso di unità con zero morti è la probabilità moltiplicata per 200:

$$
200\cdot e^{-0{,}61}\approx108{,}67.
$$

Ne osserviamo 109. Abbiamo trovato la prima colonna della tabella usando **soltanto la media**. E guarda la tua previsione di prima: la frazione di corpi-anno senza morti è circa 54%, poco più della metà.

### 13. Da zero eventi alla PMF completa {: #pmf-poisson }

Per avere esattamente un evento dobbiamo lasciare vuoti tutti i pezzetti tranne uno. Rispetto al caso di zero eventi compare quindi una scelta: *quale* dei $n$ pezzetti contiene l’evento? Le possibilità sono $n$ e sono incompatibili fra loro, perciò sommiamo le loro probabilità. Ciascuna richiede un evento nel pezzetto scelto e zero eventi negli altri $n-1$:

$$
\begin{aligned}
P(X_n=1)
&=n\cdot\frac{\lambda}{n}\left(1-\frac{\lambda}{n}\right)^{n-1}\\
&=\lambda\left(1-\frac{\lambda}{n}\right)^{n-1}.
\end{aligned}
$$

Il fattore $n$ si semplifica con il denominatore di $\lambda/n$. Per trovare il limite, riscriviamo la potenza come

$$
\left(1-\frac{\lambda}{n}\right)^{n-1}=\frac{(1-\lambda/n)^n}{1-\lambda/n}.
$$

Il numeratore tende a $e^{-\lambda}$ per il limite del §12; il denominatore tende a 1. Quindi

$$
P(X_n=1)\longrightarrow\lambda e^{-\lambda}.
$$

Per $k$ eventi scegliamo $k$ pezzetti pieni. Il numero delle scelte è $\binom nk$, mentre una configurazione fissata ha probabilità $(\lambda/n)^k(1-\lambda/n)^{n-k}$. Ritroviamo così la PMF della distribuzione binomiale con $p=\lambda/n$:

$$
P(X_n=k)=\binom nk\left(\frac\lambda n\right)^k\left(1-\frac\lambda n\right)^{n-k}.
$$

Che cosa succede quando $n$ cresce, con **$k$ fissato**? Guardiamo i pezzi della formula uno alla volta.

- **Il coefficiente binomiale e le potenze di $n$.** Scriviamo $\binom nk=\dfrac{n(n-1)\cdots(n-k+1)}{k!}$. Quando $n$ è molto più grande di $k$, i $k$ fattori del numeratore sono tutti quasi uguali a $n$, e il loro prodotto è quasi $n^k$. Moltiplicando per $(\lambda/n)^k=\lambda^k/n^k$, le $n^k$ si semplificano e resta $\lambda^k/k!$.
- **I pezzetti vuoti.** Come nel caso di un evento, scriviamo $(1-\lambda/n)^{n-k}=\dfrac{(1-\lambda/n)^n}{(1-\lambda/n)^k}$. Il numeratore tende a $e^{-\lambda}$, per il limite del §12.
- **Il denominatore** $(1-\lambda/n)^k$ tende a 1: la base tende a 1 e l’esponente $k$ resta fisso.

Rimettendo insieme i pezzi otteniamo la distribuzione di **Poisson**:

$$
\boxed{P(X=k)=\frac{\lambda^k e^{-\lambda}}{k!},
\qquad k=0,1,2,\ldots,\quad\lambda>0.}
$$

Scriviamo $X\sim\operatorname{Poisson}(\lambda)$. I passaggi del limite, scritti per intero, sono nella [Lettura B](#derivazione-limite): qui impariamo a leggere e usare il risultato, che è ciò che serve all’esame.

Nella formula compaiono due numeri che hanno ruoli molto diversi:

- $k$ è il **conteggio di cui chiediamo la probabilità**: quanti eventi vogliamo vedere;
- $\lambda$ è il **numero medio di eventi nell’intervallo fissato**: è il parametro del modello.

Non devono coincidere. Con $\lambda=0{,}61$ possiamo chiedere $P(X=3)$; con $\lambda=3$ possiamo chiedere $P(X=0)$. Prima di calcolare, chiediti sempre quale dei due numeri hai davanti.

Il fattoriale $k!$ è il prodotto degli interi da 1 a $k$, con la convenzione $0!=1$. Scriviamo i primi casi:

$$
\begin{aligned}
P(X=0)&=\frac{\lambda^0e^{-\lambda}}{0!}=e^{-\lambda},\\
P(X=1)&=\lambda e^{-\lambda},\\
P(X=2)&=\frac{\lambda^2e^{-\lambda}}2,\\
P(X=3)&=\frac{\lambda^3e^{-\lambda}}6.
\end{aligned}
$$

Con $\lambda=0{,}61$ e $e^{-0{,}61}\approx0{,}54335$ avremmo ad esempio $P(X=2)=\frac{0{,}61^2}{2}\cdot0{,}54335=\frac{0{,}3721}{2}\cdot0{,}54335\approx0{,}10109$.

La distribuzione di Poisson ammette zero eventi e **non ha un massimo**: il modello attribuisce probabilità positiva a ogni intero non negativo. La distribuzione binomiale con $n$ prove, invece, non può superare $n$: per $n$ finito le due distribuzioni sono diverse. Alla fine del paragrafo vedremo quanto sono vicine.

Se dobbiamo costruire una tabella, possiamo evitare di ricalcolare ogni volta potenze e fattoriali. Per $k\ge1$ facciamo il rapporto fra due pesi consecutivi:

$$
\frac{P(X=k)}{P(X=k-1)}
=\frac{\lambda^ke^{-\lambda}}{k!}
\cdot\frac{(k-1)!}{\lambda^{k-1}e^{-\lambda}}
=\frac{\lambda}{k}.
$$

Vediamo perché. Il fattore esponenziale $e^{-\lambda}$ compare sopra e sotto e si cancella; il rapporto delle potenze $\lambda^k/\lambda^{k-1}$ dà $\lambda$; e poiché $k!=k\cdot(k-1)!$, il rapporto dei fattoriali dà $1/k$. Otteniamo la **ricorrenza**:

$$
\boxed{P(X=k)=P(X=k-1)\cdot\frac{\lambda}{k}.}
$$

Per passare da un peso al successivo si moltiplica quindi per $\lambda/k$. Finché $k<\lambda$ questo fattore è maggiore di 1 e i pesi crescono; quando $k>\lambda$ il fattore è minore di 1 e i pesi decrescono. Il picco della distribuzione si trova quindi attorno a $\lambda$.

Con $\lambda=0{,}61$ partiamo da $P(X=0)\approx0{,}54335$. Per arrivare a $k=1$ moltiplichiamo per $0{,}61$; per arrivare a $k=2$ moltiplichiamo per $0{,}61/2$. Troviamo circa 0,33144 e 0,10109. Nei calcoli a più passaggi conviene conservare qualche cifra in più e arrotondare soltanto il risultato finale.

Perché la formula sia una PMF, i pesi devono essere non negativi e sommare a 1. La non negatività è evidente. Per la somma usiamo un’identità dell’esponenziale, che qui accettiamo come risultato dell'analisi matematica:

$$
e^\lambda=1+\lambda+\frac{\lambda^2}{2!}+\frac{\lambda^3}{3!}+\cdots.
$$

Ogni peso della distribuzione di Poisson contiene il fattore comune $e^{-\lambda}$, che possiamo portare fuori dalla somma:

$$
\sum_{k=0}^{\infty}P(X=k)
=e^{-\lambda}\sum_{k=0}^{\infty}\frac{\lambda^k}{k!}
=e^{-\lambda}e^\lambda=1.
$$

La formula assegna così tutto il peso ai conteggi possibili: è davvero una PMF.

#### La distribuzione di Poisson come approssimazione della distribuzione binomiale {: #approssimazione-binomiale }

Abbiamo ottenuto la distribuzione di Poisson come limite, con infiniti pezzetti. Nella pratica la usiamo anche quando $n$ è finito: se $n$ è grande e $p$ è piccolo, una distribuzione binomiale$(n,p)$ è molto vicina alla distribuzione di Poisson con **la stessa media**, $\lambda=np$. Il grafico confronta due distribuzioni binomiali con media 3 e la distribuzione di Poisson$(3)$.

<figure markdown="0">
<svg viewBox="0 0 560 262" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Grafico a barre affiancate dei pesi per k da 0 a 8 di tre distribuzioni con media 3. La distribuzione binomiale con n uguale a 10 e p uguale a 0,3 è più concentrata attorno a 3: per esempio vale 0,267 in 3 contro 0,224 della distribuzione di Poisson. La distribuzione binomiale con n uguale a 100 e p uguale a 0,03 quasi coincide con la distribuzione di Poisson con lambda uguale a 3.">
<style>.s05-ap-b10{fill:#2e9e5b}.s05-ap-b100{fill:#4051b5}.s05-ap-poi{fill:#d06a14}[data-md-color-scheme="slate"] .s05-ap-b10{fill:#2fa565}[data-md-color-scheme="slate"] .s05-ap-b100{fill:#7385ea}</style>
<g stroke="currentColor" stroke-opacity="0.15"><path d="M52 165.0H540"/><path d="M52 115.0H540"/><path d="M52 65.0H540"/></g>
<path d="M52 215H540" stroke="currentColor"/>
<g fill="currentColor" text-anchor="end" font-size="11"><text x="48" y="219.0">0,0</text><text x="48" y="169.0">0,1</text><text x="48" y="119.0">0,2</text><text x="48" y="69.0">0,3</text></g>
<text x="14" y="140" fill="currentColor" font-size="12" text-anchor="middle" transform="rotate(-90 14 140)">P(X = k)</text>
<g class="s05-ap-b10"><path d="M58.0 215V203.9Q58.0 200.9 61.0 200.9H69.0Q72.0 200.9 72.0 203.9V215Z"><title>distribuzione binomiale, n = 10, p = 0,3: P(X = 0) = 0,0282</title></path><path d="M111.0 215V157.5Q111.0 154.5 114.0 154.5H122.0Q125.0 154.5 125.0 157.5V215Z"><title>distribuzione binomiale, n = 10, p = 0,3: P(X = 1) = 0,1211</title></path><path d="M164.0 215V101.3Q164.0 98.3 167.0 98.3H175.0Q178.0 98.3 178.0 101.3V215Z"><title>distribuzione binomiale, n = 10, p = 0,3: P(X = 2) = 0,2335</title></path><path d="M217.0 215V84.6Q217.0 81.6 220.0 81.6H228.0Q231.0 81.6 231.0 84.6V215Z"><title>distribuzione binomiale, n = 10, p = 0,3: P(X = 3) = 0,2668</title></path><path d="M270.0 215V117.9Q270.0 114.9 273.0 114.9H281.0Q284.0 114.9 284.0 117.9V215Z"><title>distribuzione binomiale, n = 10, p = 0,3: P(X = 4) = 0,2001</title></path><path d="M323.0 215V166.5Q323.0 163.5 326.0 163.5H334.0Q337.0 163.5 337.0 166.5V215Z"><title>distribuzione binomiale, n = 10, p = 0,3: P(X = 5) = 0,1029</title></path><path d="M376.0 215V199.6Q376.0 196.6 379.0 196.6H387.0Q390.0 196.6 390.0 199.6V215Z"><title>distribuzione binomiale, n = 10, p = 0,3: P(X = 6) = 0,0368</title></path><path d="M429.0 215V213.5Q429.0 210.5 432.0 210.5H440.0Q443.0 210.5 443.0 213.5V215Z"><title>distribuzione binomiale, n = 10, p = 0,3: P(X = 7) = 0,0090</title></path><path d="M482.0 215V215.0Q482.0 214.3 482.7 214.3H495.3Q496.0 214.3 496.0 215.0V215Z"><title>distribuzione binomiale, n = 10, p = 0,3: P(X = 8) = 0,0014</title></path></g>
<g class="s05-ap-b100"><path d="M74.0 215V194.2Q74.0 191.2 77.0 191.2H85.0Q88.0 191.2 88.0 194.2V215Z"><title>distribuzione binomiale, n = 100, p = 0,03: P(X = 0) = 0,0476</title></path><path d="M127.0 215V144.5Q127.0 141.5 130.0 141.5H138.0Q141.0 141.5 141.0 144.5V215Z"><title>distribuzione binomiale, n = 100, p = 0,03: P(X = 1) = 0,1471</title></path><path d="M180.0 215V105.4Q180.0 102.4 183.0 102.4H191.0Q194.0 102.4 194.0 105.4V215Z"><title>distribuzione binomiale, n = 100, p = 0,03: P(X = 2) = 0,2252</title></path><path d="M233.0 215V104.3Q233.0 101.3 236.0 101.3H244.0Q247.0 101.3 247.0 104.3V215Z"><title>distribuzione binomiale, n = 100, p = 0,03: P(X = 3) = 0,2275</title></path><path d="M286.0 215V132.7Q286.0 129.7 289.0 129.7H297.0Q300.0 129.7 300.0 132.7V215Z"><title>distribuzione binomiale, n = 100, p = 0,03: P(X = 4) = 0,1706</title></path><path d="M339.0 215V167.3Q339.0 164.3 342.0 164.3H350.0Q353.0 164.3 353.0 167.3V215Z"><title>distribuzione binomiale, n = 100, p = 0,03: P(X = 5) = 0,1013</title></path><path d="M392.0 215V193.2Q392.0 190.2 395.0 190.2H403.0Q406.0 190.2 406.0 193.2V215Z"><title>distribuzione binomiale, n = 100, p = 0,03: P(X = 6) = 0,0496</title></path><path d="M445.0 215V207.7Q445.0 204.7 448.0 204.7H456.0Q459.0 204.7 459.0 207.7V215Z"><title>distribuzione binomiale, n = 100, p = 0,03: P(X = 7) = 0,0206</title></path><path d="M498.0 215V214.3Q498.0 211.3 501.0 211.3H509.0Q512.0 211.3 512.0 214.3V215Z"><title>distribuzione binomiale, n = 100, p = 0,03: P(X = 8) = 0,0074</title></path></g>
<g class="s05-ap-poi"><path d="M90.0 215V193.1Q90.0 190.1 93.0 190.1H101.0Q104.0 190.1 104.0 193.1V215Z"><title>distribuzione di Poisson, λ = 3: P(X = 0) = 0,0498</title></path><path d="M143.0 215V143.3Q143.0 140.3 146.0 140.3H154.0Q157.0 140.3 157.0 143.3V215Z"><title>distribuzione di Poisson, λ = 3: P(X = 1) = 0,1494</title></path><path d="M196.0 215V106.0Q196.0 103.0 199.0 103.0H207.0Q210.0 103.0 210.0 106.0V215Z"><title>distribuzione di Poisson, λ = 3: P(X = 2) = 0,2240</title></path><path d="M249.0 215V106.0Q249.0 103.0 252.0 103.0H260.0Q263.0 103.0 263.0 106.0V215Z"><title>distribuzione di Poisson, λ = 3: P(X = 3) = 0,2240</title></path><path d="M302.0 215V134.0Q302.0 131.0 305.0 131.0H313.0Q316.0 131.0 316.0 134.0V215Z"><title>distribuzione di Poisson, λ = 3: P(X = 4) = 0,1680</title></path><path d="M355.0 215V167.6Q355.0 164.6 358.0 164.6H366.0Q369.0 164.6 369.0 167.6V215Z"><title>distribuzione di Poisson, λ = 3: P(X = 5) = 0,1008</title></path><path d="M408.0 215V192.8Q408.0 189.8 411.0 189.8H419.0Q422.0 189.8 422.0 192.8V215Z"><title>distribuzione di Poisson, λ = 3: P(X = 6) = 0,0504</title></path><path d="M461.0 215V207.2Q461.0 204.2 464.0 204.2H472.0Q475.0 204.2 475.0 207.2V215Z"><title>distribuzione di Poisson, λ = 3: P(X = 7) = 0,0216</title></path><path d="M514.0 215V213.9Q514.0 210.9 517.0 210.9H525.0Q528.0 210.9 528.0 213.9V215Z"><title>distribuzione di Poisson, λ = 3: P(X = 8) = 0,0081</title></path></g>
<g fill="currentColor" text-anchor="middle" font-weight="bold"><text x="81" y="232">0</text><text x="134" y="232">1</text><text x="187" y="232">2</text><text x="240" y="232">3</text><text x="293" y="232">4</text><text x="346" y="232">5</text><text x="399" y="232">6</text><text x="452" y="232">7</text><text x="505" y="232">8</text></g>
<text x="299" y="253" text-anchor="middle" fill="currentColor">k, numero di eventi</text>
<rect class="s05-ap-b10" x="250" y="14" width="14" height="14" rx="2"/><text x="270" y="26" fill="currentColor">distribuzione binomiale, n = 10, p = 0,3</text><rect class="s05-ap-b100" x="250" y="34" width="14" height="14" rx="2"/><text x="270" y="46" fill="currentColor">distribuzione binomiale, n = 100, p = 0,03</text><rect class="s05-ap-poi" x="250" y="54" width="14" height="14" rx="2"/><text x="270" y="66" fill="currentColor">distribuzione di Poisson, λ = 3</text>
</svg>
<figcaption>Stessa media 3, n sempre più grande: la distribuzione binomiale con n = 100 e p = 0,03 è già quasi indistinguibile dalla distribuzione di Poisson con λ = 3.</figcaption>
</figure>

Con $n=10$ e $p=0{,}3$ la distribuzione binomiale è ancora lontana: è più concentrata attorno a 3 e non può superare 10. Con $n=100$ e $p=0{,}03$ le barre quasi coincidono. La probabilità di zero eventi, per esempio, vale 0,028 con $n=10$, 0,048 con $n=100$ e 0,050 con la distribuzione di Poisson. A parità di media, più $n$ è grande, migliore è l’approssimazione. Lo confermano le varianze: $np(1-p)$ vale 2,1 con $n=10$ e 2,91 con $n=100$, e si avvicina a $\lambda=3$ man mano che $1-p$ si avvicina a 1.

A che cosa serve l’approssimazione? Prima di tutto a evitare conti scomodi. Supponiamo che una persona veda 10.000 annunci in un mese e clicchi su ciascuno con probabilità $10^{-6}$, indipendentemente dagli altri. Il numero di clic ha distribuzione binomiale$(10^4,10^{-6})$, ma la sua PMF richiede coefficienti come $\binom{10^4}{3}$ e potenze come $(1-10^{-6})^{9997}$. Con la distribuzione di Poisson di media $\lambda=10^4\cdot10^{-6}=0{,}01$ basta invece

$$
P(X=3)\approx\frac{0{,}01^3\,e^{-0{,}01}}{3!}\approx1{,}65\cdot10^{-7}.
$$

C’è poi un vantaggio più profondo: non serve conoscere $n$ e $p$ separatamente, basta la media. È proprio la situazione dei dati di Bortkiewicz, dove nessuno sa quante «occasioni di incidente» contenga un anno. Useremo di nuovo l’approssimazione per le richieste a un server, nel [§18](#richieste).

!!! note "Che cosa abbiamo ottenuto"
    Dividendo l’intervallo in pezzetti e lasciandoli diventare infiniti, con media totale $\lambda$ fissata, la distribuzione binomiale si trasforma nella distribuzione di Poisson. La sua PMF è $\lambda^ke^{-\lambda}/k!$ e può essere calcolata un peso alla volta con la ricorrenza $\lambda/k$. Per $n$ grande e $p$ piccolo, la distribuzione di Poisson$(np)$ approssima bene la distribuzione binomiale$(n,p)$.

### 14. Tornare ai dati: probabilità e frequenze attese {: #confronto-dati }

La formula appena ricavata riguarda il conteggio di un **singolo** corpo-anno e fornisce la probabilità $P(X=k)$. Per confrontarla con la tabella storica dobbiamo esprimerla nella stessa scala dei dati, che riportano **quanti dei 200 corpi-anno** presentano quel valore. Passiamo quindi dalla probabilità al numero atteso di unità moltiplicando per 200:

$$
\text{numero atteso di corpi-anno con }k\text{ morti}=200\cdot P(X=k).
$$

Possiamo giustificare questa regola con le indicatrici, che conosciamo bene. Per ogni corpo-anno $i$, poniamo $J_i=1$ se il conteggio è $k$ e $J_i=0$ altrimenti. Il numero di unità nella colonna è la somma $J_1+\cdots+J_{200}$. Se tutte le unità hanno la stessa distribuzione, ogni indicatrice ha media $P(X=k)$; per linearità la media della somma è $200P(X=k)$. Ricordiamo che per questa media **non occorre indipendenza fra le 200 indicatrici**: la linearità vale comunque.

Con $\lambda=0{,}61$ calcoliamo i numeri attesi e affianchiamoli ai dati:

| Morti nel corpo-anno $k$ | 0 | 1 | 2 | 3 | 4 | 5 o più |
|---|---|---|---|---|---|---|
| Corpi-anno osservati | 109 | 65 | 22 | 3 | 1 | 0 |
| Corpi-anno attesi con la distribuzione di Poisson$(0{,}61)$ | 108,7 | 66,3 | 20,2 | 4,1 | 0,6 | 0,1 |

L’ultima colonna raggruppa tutti i valori da 5 in poi: si calcola come $200[1-P(X=0)-\cdots-P(X=4)]$. Non è soltanto la probabilità di esattamente cinque eventi.

<figure markdown="0">
<svg viewBox="0 0 560 240" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Grafico a barre affiancate. Per zero morti: 109 osservati e 108,7 attesi. Per un morto: 65 e 66,3. Per due: 22 e 20,2. Per tre: 3 e 4,1. Per quattro: 1 e 0,6. Le coppie di barre quasi coincidono.">
<path d="M50 190H530" stroke="currentColor"/>
<g fill="#4051b5"><rect x="80" y="70" width="30" height="120"/><rect x="175" y="118.5" width="30" height="71.5"/><rect x="270" y="165.8" width="30" height="24.2"/><rect x="365" y="186.7" width="30" height="3.3"/><rect x="460" y="188.9" width="30" height="1.1"/></g>
<g fill="#e07a1f"><rect x="112" y="70.4" width="30" height="119.6"/><rect x="207" y="117.1" width="30" height="72.9"/><rect x="302" y="167.8" width="30" height="22.2"/><rect x="397" y="185.5" width="30" height="4.5"/><rect x="492" y="189.3" width="30" height="0.7"/></g>
<g fill="currentColor" text-anchor="middle"><text x="95" y="64">109</text><text x="127" y="50">108,7</text><text x="190" y="112">65</text><text x="222" y="98">66,3</text><text x="285" y="160">22</text><text x="317" y="146">20,2</text><text x="380" y="180">3</text><text x="412" y="166">4,1</text><text x="475" y="183">1</text><text x="507" y="169">0,6</text></g>
<g fill="currentColor" text-anchor="middle" font-weight="bold"><text x="111" y="208">0</text><text x="206" y="208">1</text><text x="301" y="208">2</text><text x="396" y="208">3</text><text x="491" y="208">4</text></g>
<text x="290" y="230" text-anchor="middle" fill="currentColor">morti nel corpo-anno</text>
<rect x="300" y="18" width="14" height="14" fill="#4051b5"/><text x="320" y="30" fill="currentColor">osservati</text>
<rect x="300" y="40" width="14" height="14" fill="#e07a1f"/><text x="320" y="52" fill="currentColor">distribuzione di Poisson</text>
</svg>
<figcaption>Dati di Bortkiewicz (1898) e previsione della distribuzione di Poisson con λ = 0,61: ogni coppia di barre quasi coincide.</figcaption>
</figure>

Questa è la tabella di confronto pubblicata da Bortkiewicz a pagina 25. La formula che Poisson aveva lasciato come risultato di calcolo nel 1837 incontra qui, sessantuno anni dopo, dei dati reali. Il risultato è notevole: **un solo parametro**, ricavato da una sola media, produce una forma vicina a quella osservata.

Il numero atteso 4,1 non significa che un campione debba contenere una frazione di corpo-anno. Una frequenza osservata è sempre intera; la sua media teorica può non esserlo, come il valore atteso di un dado vale 3,5. Inoltre, anche con un modello perfettamente corretto, campioni diversi produrrebbero tabelle diverse. Piccole differenze come 22 contro 20,2 sono del tutto normali.

Una tabella vicina sostiene l’utilità del modello; non dimostra tutte le sue ipotesi.

### 15. Media e varianza della distribuzione di Poisson {: #media-varianza-poisson }

Nella costruzione a pezzetti abbiamo mantenuto fissa la media $\lambda$. La PMF permette ora di studiare anche quanto i conteggi si disperdano attorno a quel centro. In questa distribuzione il parametro che fissa la media determina anche la varianza.

Per $X\sim\operatorname{Poisson}(\lambda)$ valgono due proprietà molto semplici:

$$
\boxed{\mathbb{E}[X]=\lambda,
\qquad\operatorname{Var}(X)=\lambda.}
$$

Sono proprietà esatte della **distribuzione teorica**. Con $\lambda=2$, per esempio, la media del conteggio è 2, la varianza è 2 e la deviazione standard è $\sqrt2\approx1{,}414$.

L’uguaglianza fra media e varianza riguarda i loro *valori numerici*, e non il loro significato. Le interpretazioni restano diverse: la media descrive il centro, la varianza è una media di scarti al quadrato. La deviazione standard, che ha le stesse unità del conteggio, è $\sqrt\lambda$.

Questa coincidenza è una peculiarità della distribuzione di Poisson. Nella distribuzione binomiale, per confronto, la varianza è $np(1-p)$, che è più piccola della media $np$; la distribuzione di Poisson si ottiene quando $p$ è così piccolo che il fattore $1-p$ è praticamente 1. È un'altra faccia del limite dei pezzetti.

Che la media sia $\lambda$ non sorprende: nel modello a pezzetti valeva $\lambda$ per ogni $n$. Non possiamo però darlo per scontato. Le probabilità dei singoli valori si avvicinano a quelle della distribuzione di Poisson, ma questo da solo non garantisce che si avvicini anche la media: un po’ di probabilità su valori molto grandi può spostare molto un valore atteso, come abbiamo visto con la Geometrica nel §4. Conviene quindi ricalcolarla sulla nuova PMF.

Possiamo calcolarla direttamente usando la ricorrenza del §13. Moltiplicando per $k$ entrambi i membri di $P(X=k)=P(X=k-1)\,\lambda/k$ otteniamo, per $k\ge1$,

$$
k\,P(X=k)=\lambda\,P(X=k-1).
$$

Sommiamo su tutti i $k\ge1$. A sinistra compare la media (il termine $k=0$ vale zero); a destra, spostando l’indice di una posizione, compare $\lambda$ per la somma di *tutti* i pesi, che è 1:

$$
\mathbb{E}[X]=\sum_{k=1}^{\infty}k\,P(X=k)
=\lambda\sum_{k=1}^{\infty}P(X=k-1)=\lambda\cdot1=\lambda.
$$

Per la varianza il calcolo è un poco più lungo: lo trovi nella [Lettura B](#media-varianza-diretta). Le dimostrazioni sono facoltative; **proprietà e significato sono richiesti all’esame**.

L’uguaglianza fra media e varianza offre anche un controllo sulla dispersione dei dati di Bortkiewicz. La loro media è $\overline{x}=0{,}61$; se la distribuzione di Poisson è un buon modello, ci aspettiamo una varianza osservata vicina a quel valore. Per calcolarla usiamo gli scarti al quadrato, con la stessa procedura della sezione iniziale, ma pesando con le frequenze relative dei 200 dati.

| Conteggio $k$ | Frequenza $f_k$ | $(k-0{,}61)^2$ | $f_k(k-0{,}61)^2$ |
|---|---|---|---|
| 0 | 109 | 0,3721 | 40,5589 |
| 1 | 65 | 0,1521 | 9,8865 |
| 2 | 22 | 1,9321 | 42,5062 |
| 3 | 3 | 5,7121 | 17,1363 |
| 4 | 1 | 11,4921 | 11,4921 |

Leggiamo le colonne: nella terza c’è il quadrato dello scarto dalla media; nella quarta lo scarto al quadrato viene ripetuto $f_k$ volte, perché $f_k$ corpi-anno hanno quel conteggio. L’ultima colonna somma a 121,58. Dividiamo per il numero di osservazioni:

$$
v_{\mathrm{dati}}=\frac{121{,}58}{200}=0{,}6079.
$$

Stiamo descrivendo *questi* 200 valori, perciò usiamo il divisore **200**.

La varianza osservata 0,6079 è vicina alla media osservata 0,61: il confronto è coerente con una distribuzione di Poisson. Attenzione però al *verso* del ragionamento.

- Per una distribuzione di Poisson, media e varianza coincidono.
- Ma **una distribuzione con media e varianza uguali non è necessariamente una distribuzione di Poisson**. Ne vedrai un controesempio nell’esercizio 6.
- Inoltre, un campione finito non deve riprodurre esattamente l’uguaglianza teorica.

È un controllo utile, non una certificazione del modello.

#### Esplora: centro, dispersione e probabilità dello zero {: #widget-poisson }

Il riferimento è la distribuzione di Poisson$(0{,}61)$. Aumenta $\lambda$ e osserva come la massa si sposta a destra e si allarga. La probabilità di zero eventi diminuisce. Prima di usare il cursore, prova a confrontare $e^{-1}$, $e^{-2}$ ed $e^{-3}$: in quale di questi casi la probabilità di zero scende sotto il 5%?

<div class="psi-widget" id="s05-poisson"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  function massa(k, p) {
    // P(X = 0) = e^(-λ), poi ogni passo moltiplica per λ / j.
    var valore = Math.exp(-p.lam);
    for (var j = 1; j <= k; j++) valore *= p.lam / j;
    return valore;
  }
  PSIWidget.mount('s05-poisson', {
    type: 'bar', xLabel: 'Numero di eventi k', yLabel: 'P(X = k)',
    xDomain: [0, 15], liveLabel: 'Distribuzione di Poisson corrente', fn: massa,
    params: [{key: 'lam', label: 'λ (numero medio di eventi)',
      min: 0.1, max: 10, step: 0.01, value: 0.61}],
    reference: {label: 'Bortkiewicz: λ = 0,61', params: {lam: 0.61}},
    stats: function (p) { return [
      {label: 'E[X] = λ', value: p.lam.toFixed(2)},
      {label: 'Var(X) = λ', value: p.lam.toFixed(2)},
      {label: 'P(X = 0) = e^(−λ)', value: Math.exp(-p.lam).toFixed(4)},
      {label: 'corpi-anno attesi con 0 eventi su 200',
       value: (200 * Math.exp(-p.lam)).toFixed(1)}
    ]; },
    caption: 'Un solo cursore governa tutto: posizione, larghezza e probabilità dello zero.'
  });
});
</script>

Con $\lambda=3$, $e^{-3}\approx0{,}0498$: meno di un intervallo su venti è vuoto, secondo il modello. Il grafico si ferma a 15; con $\lambda$ grande una parte del peso è oltre il bordo, e non scompare dalla distribuzione.

### 16. Laboratorio: ricostruire tabella e dispersione {: #lab-bortkiewicz }

I conti dei §9–15 si possono ripetere a partire dalle sole frequenze osservate. Nel programma qui sotto, ogni conteggio e la sua frequenza sono registrati nel dizionario `osservati`: modificandolo possiamo studiare un altro insieme di dati con lo stesso procedimento.

Il codice calcola la media e la usa come parametro della distribuzione di Poisson. Poi ricostruisce i numeri attesi e calcola la varianza con **gli scarti al quadrato**, come nella tabella. I commenti collegano le istruzioni ai passaggi svolti a mano.

<div class="psi-exec" markdown="1">
```python
from math import exp, factorial

import matplotlib.pyplot as plt

# Bortkiewicz (1898), § 12: 10 corpi d'armata per 20 anni.
osservati = {0: 109, 1: 65, 2: 22, 3: 3, 4: 1}
corpi_anno = sum(osservati.values())
morti = sum(k * f for k, f in osservati.items())
lam = morti / corpi_anno   # numero medio di morti per corpo-anno
assert corpi_anno == 200 and morti == 122


def poisson(k, lam):
    return exp(-lam) * lam ** k / factorial(k)


print(f"lambda = {morti}/{corpi_anno} = {lam:.2f}")
print(" k  osservati  attesi")
for k, f in osservati.items():
    # Conteggio atteso = numero di corpi-anno x probabilità.
    print(f"{k:2d}  {f:9d}  {corpi_anno * poisson(k, lam):6.1f}")

# Dispersione descrittiva: la varianza usa qui il divisore 200.
media = morti / corpi_anno
varianza = sum((k - media) ** 2 * f
               for k, f in osservati.items()) / corpi_anno
print(f"Media dei dati: {media:.3f}")
print(f"Varianza dei dati: {varianza:.3f}")

k = list(osservati)
plt.bar([x - 0.2 for x in k], list(osservati.values()), width=0.4,
        label="Osservati (Bortkiewicz)")
plt.bar([x + 0.2 for x in k],
        [corpi_anno * poisson(x, lam) for x in k], width=0.4,
        label="Attesi con la distribuzione di Poisson(0,61)")
plt.xticks(k)
plt.xlabel("Morti in un corpo-anno")
plt.ylabel("Numero di corpi-anno")
plt.legend()
plt.tight_layout()
plt.show()
```
</div>

Il grafico confronta le colonne da 0 a 4. La distribuzione di Poisson assegna anche un piccolo peso a «5 o più»: quelle barre non sono disegnate. L’assenza di valori oltre 4 nel campione non rende impossibili quei conteggi nel modello.

??? note "Esplorazione facoltativa — Dai 10 corpi comparabili a tutti e 14"
    Come spiegato nel [§9](#dati-bortkiewicz), i dati storici riguardano 14 corpi d’armata osservati per 20 anni, dal 1875 al 1894. Nel confronto principale abbiamo usato soltanto i **10 corpi con esposizioni al rischio più simili**, per un totale di $10\cdot20=200$ corpi-anno. Possiamo ripetere il calcolo includendo anche gli altri quattro: le osservazioni diventano $14\cdot20=280$.

    La scelta dei 10 corpi tiene conto della loro composizione e, in particolare, della consistenza della cavalleria. Bortkiewicz esclude dal confronto principale la Guardia e i corpi I, VI e XI; nella nota a p. 24 ricorda, per esempio, che la Guardia aveva **40 squadroni di cavalleria contro i 20 della dotazione normale**. Un corpo con più cavalleria può avere più cavalli e più occasioni di contatto fra uomini e animali, quindi più occasioni di incidente. Due corpi osservati per un anno rappresentano la stessa durata, ma **non necessariamente la stessa esposizione al rischio**: anche a parità di rischio per singolo contatto, il numero medio annuo di incidenti può essere diverso.

    Per includere tutti i corpi, sostituisci il blocco iniziale del laboratorio, dal commento su Bortkiewicz fino all’`assert`, con:

    ```python
    # Bortkiewicz (1898): tutti i 14 corpi d'armata per 20 anni.
    osservati = {0: 144, 1: 91, 2: 32, 3: 11, 4: 2}
    corpi_anno = sum(osservati.values())
    morti = sum(k * f for k, f in osservati.items())
    lam = morti / corpi_anno
    assert corpi_anno == 280 and morti == 196
    ```

    Le chiavi del dizionario sono i conteggi di morti; i valori sono le loro frequenze. Per esempio, `0: 144` significa che **144 corpi-anno non registrarono alcun morto**, mentre `2: 32` significa che 32 corpi-anno registrarono due morti ciascuno. Le frequenze sommano a 280; i morti complessivi sono 196. L’`assert` verifica questi nuovi totali: quello precedente, riferito ai 10 corpi, non sarebbe più soddisfatto.

    Aggiorna anche l’etichetta della seconda serie del grafico, da `"Attesi con la distribuzione di Poisson(0,61)"` a `"Attesi con la distribuzione di Poisson(0,70)"`, e il commento sul divisore della varianza, ora **280**. Il programma ricalcola automaticamente media, varianza e frequenze attese a partire dai nuovi dati.

    Eseguendo di nuovo il codice, ottieni:

    | Dati inclusi | Corpi-anno | Media | Varianza descrittiva |
    |---|---|---|---|
    | 10 corpi comparabili | 200 | 0,61 | 0,6079 |
    | Tutti i 14 corpi | 280 | 0,70 | 0,7600 |

    Nei 10 corpi media e varianza sono quasi uguali; includendo tutti e 14, la varianza supera la media. La maggiore dispersione è compatibile con esposizioni al rischio meno omogenee: corpi con medie diverse, riuniti nello stesso insieme, possono produrre più variabilità di quella prevista da una distribuzione di Poisson con media comune. Questo confronto, da solo, non dimostra la causa della differenza, ma suggerisce di riesaminare l’ipotesi di omogeneità.

### 17. Tasso e parametro: fissare le unità {: #tasso }

Il valore 0,61 si riferisce a un corpo osservato per un anno. Se il periodo fosse di due anni, a parità di condizioni ci aspetteremmo il doppio degli eventi. Anche nelle applicazioni informatiche la finestra può cambiare: una domanda riguarda gli arrivi in un secondo, un’altra quelli in un minuto. Per scegliere il parametro dobbiamo distinguere la frequenza degli arrivi dalla durata dell’osservazione.

Un **tasso** indica quanti eventi arrivano in media *per unità di tempo*. Il **parametro** della distribuzione di Poisson indica invece quanti eventi attendiamo *nell’intervallo scelto*. Per evitare confusione chiamiamo il tasso $r$ e la durata $t$:

$$
\boxed{\lambda=rt.}
$$

Se $r$ è in richieste al secondo, $t$ deve essere in secondi. Le unità di tempo si semplificano e otteniamo il numero medio di richieste nell’intervallo, che non ha dimensioni di tempo: è un conteggio.

Supponiamo un flusso con tasso costante $r=3$ richieste al secondo e con le ipotesi del modello di Poisson valide su tutti gli intervalli considerati.

| Durata $t$ | Media nell’intervallo $\lambda=rt$ | Distribuzione del conteggio |
|---|---|---|
| Mezzo secondo | $3\cdot0{,}5=1{,}5$ | Distribuzione di Poisson$(1{,}5)$ |
| Un secondo | $3\cdot1=3$ | Distribuzione di Poisson$(3)$ |
| Dieci secondi | $3\cdot10=30$ | Distribuzione di Poisson$(30)$ |
| Un minuto | $3\cdot60=180$ | Distribuzione di Poisson$(180)$ |

Per zero richieste, in mezzo secondo la probabilità è $e^{-1{,}5}\approx0{,}2231$; in un secondo è $e^{-3}\approx0{,}0498$. Un intervallo più lungo offre più occasioni di arrivo, quindi è meno probabile che resti vuoto.

Attenzione: la tabella non si ottiene soltanto moltiplicando la media per la durata. Che il conteggio in mezzo secondo o in un minuto abbia ancora una distribuzione di Poisson dipende dalle ipotesi sul flusso degli arrivi, le stesse della costruzione a pezzetti: tasso costante e conteggi indipendenti in intervalli che non si sovrappongono. Se invece gli arrivi venissero a raffiche lunghe parecchi secondi, i 60 secondi di un minuto sarebbero legati fra loro, e il conteggio del minuto non avrebbe più una distribuzione di Poisson$(180)$, anche se la sua media restasse 180.

L’intervallo non deve per forza essere temporale. Può essere spaziale: refusi per pagina, difetti per metro di cavo, errori per megabyte. Il ragionamento è identico, con le unità appropriate. Prima di inserire $\lambda$ nella formula, scrivi sempre **a quale unità di osservazione si riferisce**. È la domanda che previene più errori in questo capitolo.

## Atto V — Usare i modelli nei sistemi {: #informatica }

### 18. Richieste a un server: calcolare un picco {: #richieste }

Supponiamo di voler dimensionare un server per accettare fino a cinque richieste al secondo. La media degli arrivi non basta a valutare questa scelta: dobbiamo sapere quanto spesso il conteggio supera la soglia di cinque.

Immaginiamo 10.000 utenti. In un secondo ciascuno può inviare una richiesta con probabilità $0{,}0003$, indipendentemente dagli altri. In questo modello il conteggio segue esattamente una distribuzione binomiale e la sua media è:

$$
10000\cdot0{,}0003=3.
$$

Il numero elevato di prove e la piccola probabilità di invio permettono di [approssimare](#approssimazione-binomiale) il conteggio con una distribuzione di Poisson$(3)$. Indichiamo con $X$ il conteggio in questo modello approssimato.

La soglia viene superata quando arrivano **più di cinque richieste in un secondo**: l’evento è $X>5$, cioè $X\ge6$. Per calcolarne la probabilità conviene passare dal complementare, che comprende soltanto i sei valori da 0 a 5:

$$
\begin{aligned}
P(X>5)
&=1-P(X\le5)\\
&=1-\sum_{k=0}^{5}\frac{3^ke^{-3}}{k!}\\
&=1-e^{-3}\left(1+3+\frac92+\frac{27}6+\frac{81}{24}+\frac{243}{120}\right)\\
&\approx0{,}0839.
\end{aligned}
$$

Controlliamo la somma tra parentesi: $1+3+4{,}5+4{,}5+3{,}375+2{,}025=18{,}4$. Moltiplicata per $e^{-3}\approx0{,}0498$ dà circa $0{,}916$, e il complementare è $0{,}084$. Il conto esatto con la distribuzione binomiale, molto più pesante, darebbe $0{,}08389$ invece di $0{,}08392$: la differenza compare solo alla quinta cifra decimale.

Nel modello, circa l’8,4% degli intervalli di un secondo supera cinque arrivi. Se una regola di capacità accetta al massimo cinque arrivi per intervallo, questa è la probabilità di superare quella soglia.

Per valutare le prestazioni effettive del server occorre conoscere anche i tempi di servizio, le regole della coda e la distribuzione degli arrivi all’interno del secondo. Il conteggio ci ha permesso di valutare la soglia di cinque arrivi; queste altre informazioni servono a capire come il sistema riesca a smaltirli.

### 19. Quando il modello perde credibilità {: #sovradispersione }

La stima appena ottenuta dipende dalle ipotesi sugli utenti: ciascuno invia indipendentemente dagli altri, con una probabilità che resta la stessa. Un gran numero di utenti, da solo, non assicura queste condizioni. Nella costruzione a pezzetti avevamo richiesto eventi singoli, un tasso stabile e indipendenza dei conteggi in intervalli disgiunti; nei sistemi reali possiamo invece incontrare:

- **attività a raffiche**, con molti client influenzati dallo stesso evento;
- **tassi variabili**, per esempio differenze fra notte e giorno;
- **effetti a catena**, nei quali una richiesta fallita genera altri tentativi;
- **cause comuni**, come un problema elettrico che guasta più componenti insieme.

Questi meccanismi possono produrre conteggi **più dispersi** di una distribuzione di Poisson con la stessa media. Si parla di **sovradispersione** quando la varianza supera la media. Nei dati, una differenza consistente fra varianza e media invita a cercare eterogeneità, dipendenza o altri aspetti mancanti nel modello.

Un tasso variabile non esclude ogni possibile uso della distribuzione di Poisson. Intervalli omogenei possono avere ciascuno un modello adatto, ma con parametri diversi: per esempio una distribuzione di Poisson di media 1 di notte e una di media 5 di giorno. Mescolare quei conteggi e attribuire a tutti un unico parametro può invece nascondere proprio la variabilità che ci interessa.

Il confronto tra media e varianza va interpretato con misura:

- piccole differenze sono normali nei campioni finiti;
- una differenza grande richiede un’indagine;
- un’uguaglianza non basta a identificare la distribuzione.

Può capitare anche il contrario: conteggi **meno** dispersi di una distribuzione di Poisson con la stessa media, cioè con varianza minore della media. Succede quando un evento rende meno probabile il successivo, come un contatore che dopo ogni rilevazione resta «cieco» per un istante, oppure quando gli arrivi seguono un calendario, come pazienti prenotati ogni venti minuti. Nel caso estremo, tre arrivi esatti ogni ora, la varianza è zero.

### 20. Laboratorio: traffico regolare e traffico a raffiche {: #lab-richieste }

Riprendiamo i 10.000 utenti dell’esempio del server e simuliamo 20.000 secondi. Il programma permette di confrontare una probabilità di invio costante con una che aumenta, per tutti gli utenti insieme, in alcuni secondi. Possiamo così osservare quanto cambia la dispersione quando introduciamo una causa comune di maggiore attività.

Partiamo da `raffica = False`: ogni secondo ha la stessa probabilità di invio per utente. Prima di eseguire, prevedi la media e chiediti se la varianza sarà vicina a quella della distribuzione di Poisson$(3)$.

<div class="psi-exec" markdown="1">
```python
from math import exp, factorial

import numpy as np

rng = np.random.default_rng(42)
utenti = 10000      # client che possono inviare una richiesta
p = 0.0003          # probabilità che uno di loro la invii in 1 secondo
secondi = 20000     # quanti secondi osserviamo
raffica = False     # prova True: a volte tutti diventano più attivi

lam = utenti * p    # richieste attese al secondo
p_secondo = np.full(secondi, p)
if raffica:
    # Nel 10% dei secondi ogni client è 5 volte più attivo.
    p_secondo[rng.random(secondi) < 0.1] = 5 * p
# Ogni secondo: quanti dei 10000 client inviano (una distribuzione binomiale).
richieste = rng.binomial(utenti, p_secondo)

media = richieste.mean()
print(f"Media di base n * p: {lam:.1f}")
media_teorica = lam * (1.4 if raffica else 1)
print(f"Media teorica del modello scelto: {media_teorica:.1f}")
print(f"Media osservata: {media:.3f}")
print(f"Varianza osservata: {richieste.var():.3f}")
# Confronto con la distribuzione di Poisson che ha la stessa media dei dati.
print(" k  frequenza  distribuzione di Poisson")
for k in range(9):
    freq = np.mean(richieste == k)
    teoria = exp(-media) * media ** k / factorial(k)
    print(f"{k:2d}  {freq:9.4f}  {teoria:7.4f}")
```
</div>

La simulazione genera conteggi binomiali; il confronto con la distribuzione di Poisson è una previsione approssimata. Con `raffica = False`, media e varianza sono vicine a 3 e le frequenze sono vicine ai pesi teorici, con le oscillazioni che ci aspettiamo da un campionamento.

Ora imposta `raffica = True`. Nel 10% dei secondi la probabilità di invio di **tutti** gli utenti diventa cinque volte maggiore. Un secondo tranquillo ha media 3; un secondo attivo ha media 15. Prima di guardare l’output, calcola a mano la nuova media pesando i due tipi di secondo:

$$
0{,}9\cdot3+0{,}1\cdot15=4{,}2.
$$

Poi prevedi la varianza. Sarà vicina a 17, molto maggiore di 4,2. Il programma confronta i pesi osservati con una distribuzione di Poisson che usa la **nuova media osservata**, quindi la differenza non nasce dall’aver dimenticato di aggiornare $\lambda$. Nasce dalla *mescolanza* di secondi con attività diverse.

Un ultimo punto, sottile ma importante. Nel codice, dentro un singolo secondo, gli utenti decidono ancora in modo indipendente l’uno dall’altro. Ma chi osserva il traffico non sa se un secondo è tranquillo o attivo, e questa incertezza comune li lega: se vediamo molti utenti inviare, probabilmente il secondo è attivo, e allora anche gli altri invieranno più del solito. Per questo i secondi con molte richieste sono più frequenti di quanto preveda una distribuzione di Poisson con la stessa media: un modello che tratta tutti i secondi come uguali sottostima la probabilità dei picchi.

### 21. Quale distribuzione: geometrica, binomiale o di Poisson? {: #geometrica-o-poisson }

Gli esempi dei retry e degli arrivi parlano entrambi di richieste, ma contano grandezze diverse. Per scegliere una distribuzione conviene quindi precisare la domanda, completando la frase **«La variabile conta…»**, e dichiarare ciò che teniamo fissato e le ipotesi che facciamo. La tabella raccoglie le tre possibilità incontrate fin qui:

| | Geometrica$(p)$ | Distribuzione binomiale$(n,p)$ | Distribuzione di Poisson$(\lambda)$ |
|---|---|---|---|
| Domanda | Quante prove fino al primo successo? | Quanti successi in $n$ prove? | Quanti eventi in un intervallo? |
| Che cosa è fissato | Probabilità per prova e traguardo del primo successo | Numero di prove e probabilità per prova | Intervallo e media del conteggio |
| Valori | $1,2,3,\ldots$ | $0,1,\ldots,n$ | $0,1,2,\ldots$ |
| PMF | $(1-p)^{k-1}p$ | $\binom nkp^k(1-p)^{n-k}$ | $\lambda^ke^{-\lambda}/k!$ |
| Media | $1/p$ | $np$ | $\lambda$ |
| Esempio | Tentativi fino alla prima risposta | Richieste riuscite fra 10 tentativi | Arrivi in un secondo |

La Geometrica conta un’attesa in **prove discrete**, non una durata continua in secondi. Possiamo tradurla in durata se conosciamo i tempi delle prove, come abbiamo fatto nel §8.

La distribuzione di Poisson conta eventi in una finestra: **non** è la distribuzione del tempo fino all’evento successivo. Quel tempo avrà un modello continuo proprio, che incontreremo più avanti.

Per una richiesta che riesce con probabilità 0,9:

- il numero di tentativi fino al successo è **Geometrico**;
- il numero di successi in dieci tentativi indipendenti ha **distribuzione binomiale**;
- il numero di richieste in arrivo in un secondo può seguire una **distribuzione di Poisson**, se il meccanismo degli arrivi lo giustifica.

Il fatto che tutti e tre gli esempi parlino di richieste non determina il modello: lo determinano *la domanda e le ipotesi*.

!!! example "Sosta di verifica"
    Per ciascuna situazione, completa la frase «La variabile conta…» e indica il modello: (a) i pacchetti persi in un minuto su un collegamento stabile; (b) il numero di lanci di un dado fino al primo 6; (c) i 6 ottenuti in 20 lanci di un dado.

    ??? esempio-svolto "Risposta"
        (a) Conta eventi in un intervallo, con tasso stabile: **distribuzione di Poisson**, con parametro uguale alla media dei pacchetti persi in un minuto.

        (b) Conta prove fino al primo successo, con $p=1/6$: **Geometrica$(1/6)$**, media 6.

        (c) Conta successi in un numero fissato di prove: **distribuzione binomiale$(20,1/6)$**, media $20/6\approx3{,}33$.

!!! note "Che cosa abbiamo ottenuto"
    Abbiamo imparato a riconoscere tre domande diverse sugli stessi eventi: *quanto aspetto?* (Geometrica), *quanti successi in $n$ prove?* (distribuzione binomiale), *quanti eventi in un intervallo?* (distribuzione di Poisson). La scelta del modello dipende da ciò che è fissato e da ciò che osserviamo, e non dalla parola «richieste».

## Lettura A — Il filtro di Bloom: quanto costa rispondere «forse»? {: #bloom .psi-facoltativo }

*Approfondimento facoltativo, fuori dal nucleo d’esame orale.*

Immagina un servizio che deve controllare se un indirizzo web compare in una lista molto lunga, per esempio un elenco di siti pericolosi. La lista completa sta in una struttura costosa da interrogare, come un database remoto o un disco lento, e quasi tutti gli indirizzi che arrivano *non* vi compaiono: interrogarla ogni volta soltanto per sentirsi rispondere «no» sarebbe uno spreco. Il **filtro di Bloom** è un controllo preliminare, piccolo e veloce, che scarta subito la maggior parte di questi casi. Il prezzo da pagare è che non risponde mai «sì, è presente», ma soltanto «sicuramente assente» oppure «forse presente». Quando dice «assente» ci fermiamo lì; quando dice «forse» andiamo a verificare nella struttura costosa.

Vediamo come funziona. Il filtro è una fila di $m$ bit, all’inizio tutti a 0, accompagnata da $k$ funzioni hash come quelle delle [tabelle hash della Settimana 3](../settimana_03/index.md#hash): ciascuna associa a un elemento una posizione fra 0 e $m-1$. Per inserire un elemento calcoliamo le sue $k$ posizioni e mettiamo a 1 i bit corrispondenti. Per interrogarlo calcoliamo di nuovo le sue $k$ posizioni e guardiamo quei bit. Se anche uno solo vale 0, l’elemento non può essere stato inserito, perché l’inserimento avrebbe acceso quel bit: la risposta è «assente». Se invece sono tutti a 1, la risposta è «forse presente».

<figure markdown="0">
<svg viewBox="0 0 560 225" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Un vettore di 12 bit. gatto mette a uno i bit 2 e 7, cane i bit 4 e 9. topo, mai inserito, cade sui bit 2 e 9, entrambi a uno: il filtro risponde forse, ed è un falso positivo.">
<defs><marker id="s05-bloom-freccia" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="currentColor"/></marker><marker id="s05-bloom-rossa" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#e03a3a"/></marker></defs>
<g fill="currentColor" font-weight="bold" text-anchor="middle"><text x="180" y="22">gatto</text><text x="380" y="22">cane</text></g>
<g stroke="currentColor" fill="none" marker-end="url(#s05-bloom-freccia)"><path d="M172 28L142 82"/><path d="M190 28L338 82"/><path d="M370 28L222 82"/><path d="M388 28L418 82"/></g>
<g stroke="currentColor" fill="none"><rect x="40" y="88" width="40" height="40"/><rect x="80" y="88" width="40" height="40"/><rect x="160" y="88" width="40" height="40"/><rect x="240" y="88" width="40" height="40"/><rect x="280" y="88" width="40" height="40"/><rect x="360" y="88" width="40" height="40"/><rect x="440" y="88" width="40" height="40"/><rect x="480" y="88" width="40" height="40"/></g>
<g fill="#4051b5"><rect x="120" y="88" width="40" height="40"/><rect x="200" y="88" width="40" height="40"/><rect x="320" y="88" width="40" height="40"/><rect x="400" y="88" width="40" height="40"/></g>
<g fill="currentColor" text-anchor="middle"><text x="60" y="113">0</text><text x="100" y="113">0</text><text x="180" y="113">0</text><text x="260" y="113">0</text><text x="300" y="113">0</text><text x="380" y="113">0</text><text x="460" y="113">0</text><text x="500" y="113">0</text></g>
<g fill="#fff" text-anchor="middle" font-weight="bold"><text x="140" y="113">1</text><text x="220" y="113">1</text><text x="340" y="113">1</text><text x="420" y="113">1</text></g>
<g fill="currentColor" text-anchor="middle" font-size="11"><text x="60" y="143">0</text><text x="100" y="143">1</text><text x="140" y="143">2</text><text x="180" y="143">3</text><text x="220" y="143">4</text><text x="260" y="143">5</text><text x="300" y="143">6</text><text x="340" y="143">7</text><text x="380" y="143">8</text><text x="420" y="143">9</text><text x="460" y="143">10</text><text x="500" y="143">11</text></g>
<text x="280" y="205" text-anchor="middle" fill="#e03a3a" font-weight="bold">topo</text>
<g stroke="#e03a3a" fill="none" marker-end="url(#s05-bloom-rossa)"><path d="M266 192L142 152"/><path d="M294 192L418 152"/></g>
<text x="280" y="222" text-anchor="middle" fill="#e03a3a">bit 2 e 9 già a 1: «forse sì», ma topo non è mai stato inserito</text>
</svg>
<figcaption>Due elementi inseriti con due funzioni hash ciascuno; un terzo elemento, mai inserito, trova accesi tutti i suoi bit: falso positivo.</figcaption>
</figure>

La figura mostra un filtro di 12 bit con due funzioni hash. L’elemento *gatto* ha acceso i bit 2 e 7, l’elemento *cane* i bit 4 e 9. Ora interroghiamo *topo*, che non è mai stato inserito. Le sue due funzioni hash indicano i bit 2 e 9: per pura coincidenza, sono proprio due bit già accesi dagli altri elementi. Il filtro trova tutto a 1 e risponde «forse», ma sbaglia. Questo errore si chiama **falso positivo**.

L’errore opposto, invece, non può capitare. Nel filtro standard i bit si accendono e non si spengono mai, quindi un elemento inserito ritrova sempre accesi i propri bit: **non ci sono falsi negativi**. Resta da capire con che frequenza capitano i falsi positivi.

### La probabilità di un falso positivo

Per rispondere ci serve un modello. Inseriamo $n$ elementi e supponiamo, come per le [collisioni della Settimana 4](../settimana_04/index.md#collisioni), che ogni funzione hash scelga la posizione in modo uniforme e indipendente da tutte le altre scelte. Ogni elemento produce $k$ scelte di posizione, quindi dopo $n$ inserimenti le scelte sono in tutto $kn$.

Affrontiamo il problema in due passi. Il primo riguarda **un solo bit**, fissato in anticipo: quanto è probabile che, dopo tutti gli inserimenti, sia ancora a 0? Ogni scelta di posizione cade su quel bit con probabilità $1/m$ e lo evita con probabilità $1-1/m$. Il bit resta a 0 soltanto se viene evitato da tutte le $kn$ scelte; poiché le scelte sono indipendenti, moltiplichiamo $kn$ volte lo stesso fattore:

$$
P(\text{bit a zero})=\left(1-\frac1m\right)^{kn}.
$$

Questa espressione ha una forma che conosciamo. Il numero di colpi sul nostro bit ha distribuzione binomiale: $kn$ prove indipendenti, ciascuna con probabilità $1/m$, per una media di $kn/m$. Le prove sono molte e ciascuna è poco probabile, proprio come i pezzetti del §12. Lì la probabilità di zero eventi si avvicinava a $e^{-\lambda}$; qui, con $\lambda=kn/m$, otteniamo

$$
P(\text{bit a zero})\approx e^{-kn/m},
\qquad
P(\text{bit a uno})\approx1-e^{-kn/m}.
$$

Il secondo passo riguarda l’elemento che interroghiamo. Supponiamo che non sia mai stato inserito: il filtro sbaglia se tutti i suoi $k$ bit risultano accesi. Ciascuno di essi è acceso con probabilità circa $1-e^{-kn/m}$. Se trattiamo i $k$ bit come indipendenti, la probabilità che siano accesi tutti è il prodotto delle $k$ probabilità:

$$
P(\text{falso positivo})\approx\left(1-e^{-kn/m}\right)^k.
$$

Questa è una **seconda approssimazione**, ed è giusto dichiararla: i bit del filtro non sono davvero indipendenti, perché li hanno accesi gli stessi inserimenti. Quando il filtro ha molti bit, però, il legame è debole e la formula resta una buona descrizione.

Mettiamo i numeri, un passo alla volta. Prendiamo $n=100$ elementi, $m=1000$ bit e $k=7$ funzioni hash. Il numero medio di colpi su un bit è $kn/m=700/1000=0{,}7$. Un bit fissato resta a 0 con probabilità circa $e^{-0{,}7}\approx0{,}4966$, quindi è acceso con probabilità circa $1-0{,}4966=0{,}5034$: dopo gli inserimenti, circa metà del filtro è accesa. Infine i sette bit dell’elemento interrogato devono essere accesi tutti:

$$
(0{,}5034)^7\approx0{,}0082.
$$

Circa lo 0,8% delle interrogazioni di elementi **assenti** riceve dunque un «forse» sbagliato; il restante 99,2% riceve subito la risposta corretta «assente», senza toccare la struttura costosa. Il tutto con 1000 bit per 100 elementi, cioè 10 bit per elemento: molto meno di quanto servirebbe per memorizzare gli indirizzi stessi.

Attenzione a come leggi questo 0,8%: è la probabilità di un «forse» *sapendo che* l’elemento è assente, non la probabilità che un «forse» sia sbagliato. Per quest’ultima, come con il teorema di Bayes nella [Settimana 2](../settimana_02/index.md), servirebbe sapere anche quanto spesso interroghiamo elementi presenti.

## Lettura B — Perché il limite e i momenti hanno proprio quella forma {: #derivazione-limite .psi-facoltativo }

*Approfondimento facoltativo. Nel percorso d’esame sono richiesti l’idea dei pezzetti, il caso di zero eventi e le proprietà finali della distribuzione di Poisson.*

Nel §13 abbiamo visto, pezzo per pezzo, perché la PMF della distribuzione binomiale con $p=\lambda/n$ si avvicina a quella della distribuzione di Poisson. In un punto, però, ci siamo accontentati di un «quasi»: abbiamo detto che il prodotto $n(n-1)\cdots(n-k+1)$ è «quasi $n^k$». In questa lettura rendiamo preciso quel passaggio. Poi useremo la PMF ottenuta per calcolare la varianza, che nel §15 avevamo soltanto enunciato.

### B.1. Il limite binomiale, un fattore alla volta

Fissiamo un numero $\lambda>0$ e un conteggio $k\ge0$, per esempio $k=3$. Per ogni $n$ consideriamo il conteggio del modello a $n$ pezzetti, $X_n\sim\operatorname{Binomiale}(n,\lambda/n)$. Il punto da non perdere mai di vista è questo: **$n$ cresce, mentre $k$ e $\lambda$ restano fissi**. Chiediamo sempre la probabilità di *tre* eventi, in suddivisioni sempre più fini dello stesso intervallo.

Partiamo dalla PMF della distribuzione binomiale:

$$
P(X_n=k)=\binom nk\left(\frac\lambda n\right)^k\left(1-\frac\lambda n\right)^{n-k}.
$$

L’idea è riorganizzare questa espressione in fattori più semplici, ciascuno con un limite facile da trovare. Cominciamo dal coefficiente binomiale, che possiamo scrivere come

$$
\binom nk=\frac{n(n-1)\cdots(n-k+1)}{k!}.
$$

Al numeratore ci sono esattamente $k$ fattori: per $k=3$ sono $n$, $n-1$ e $n-2$. Anche la potenza $(\lambda/n)^k=\lambda^k/n^k$ contiene $k$ copie di $n$, questa volta al denominatore. Conviene metterle insieme, dividendo ogni fattore del numeratore per una copia di $n$. Quanto all’ultima potenza, separiamo l’esponente $n-k$ nelle due parti $n$ e $-k$, cioè scriviamo $(1-\lambda/n)^{n-k}=(1-\lambda/n)^n\cdot(1-\lambda/n)^{-k}$. Riordinando i pezzi otteniamo

$$
P(X_n=k)=
\underbrace{\frac{n(n-1)\cdots(n-k+1)}{n^k}}_{A_n}
\cdot\frac{\lambda^k}{k!}
\cdot\underbrace{\left(1-\frac\lambda n\right)^n}_{B_n}
\cdot\underbrace{\left(1-\frac\lambda n\right)^{-k}}_{C_n}.
$$

Non abbiamo cambiato nulla: è la stessa probabilità, scritta come prodotto di quattro fattori. Il secondo, $\lambda^k/k!$, non contiene $n$ e quindi non cambia quando $n$ cresce. Studiamo gli altri tre uno alla volta.

Il fattore $A_n$ è quello del «quasi $n^k$». Dividendo ciascun fattore del numeratore per un $n$ otteniamo

$$
A_n=\frac nn\cdot\frac{n-1}n\cdots\frac{n-k+1}n
=1\cdot\left(1-\frac1n\right)\cdots\left(1-\frac{k-1}n\right).
$$

Per $k=3$ e $n=100$, per esempio, $A_{100}=1\cdot0{,}99\cdot0{,}98\approx0{,}970$; per $n=1000$ diventa $1\cdot0{,}999\cdot0{,}998\approx0{,}997$. Ogni fattore si avvicina a 1, e il prodotto con loro. Qui conta un dettaglio: i fattori sono sempre $k$, cioè tre, qualunque sia $n$. Un prodotto di un numero **fisso** di quantità che tendono a 1 tende a 1, quindi $A_n\to1$. Nel caso $k=0$ il prodotto non ha fattori e vale 1 per convenzione, e la conclusione non cambia.

Il dettaglio non è una pignoleria. Anche $B_n=(1-\lambda/n)^n$ è un prodotto di quantità che tendono a 1, ma il numero dei suoi fattori è $n$ e cresce insieme a $n$. Nel §12 abbiamo visto che in quel caso il risultato **non** tende a 1: tende a $e^{-\lambda}$. Le piccole differenze da 1, moltiplicate un numero sempre maggiore di volte, si accumulano; se i fattori restano sempre gli stessi tre, questo non succede.

Resta $C_n=(1-\lambda/n)^{-k}$. La base si avvicina a 1 e l’esponente $-k$ resta fisso, quindi, come per $A_n$, la potenza si avvicina a $1^{-k}=1$.

Rimettiamo insieme i quattro limiti:

$$
P(X_n=k)\longrightarrow
1\cdot\frac{\lambda^k}{k!}\cdot e^{-\lambda}\cdot1
=\frac{\lambda^ke^{-\lambda}}{k!}.
$$

È la PMF della distribuzione di Poisson, e possiamo riconoscere da dove viene ciascun pezzo. Il $k!$ è ciò che resta del coefficiente binomiale, cioè della scelta *senza ordine* dei $k$ pezzetti pieni; l’esponenziale $e^{-\lambda}$ è il contributo di tutti gli altri pezzetti, quelli vuoti, che sono moltissimi.

### B.2. La varianza dalla PMF {: #media-varianza-diretta }

Nel §15 abbiamo ricavato la media $\mathbb{E}[X]=\lambda$ con la ricorrenza, ma abbiamo soltanto enunciato che anche la varianza vale $\lambda$. Per calcolarla useremo l’identità $\operatorname{Var}(X)=\mathbb{E}[X^2]-(\mathbb{E}[X])^2$, ricavata nella [Lettura C](#formula-varianza), che conviene leggere prima. Il problema si riduce così a trovare $\mathbb{E}[X^2]$, la media dei quadrati.

Cominciamo però dalla media, ricalcolata direttamente dalla definizione: il risultato lo conosciamo già, ma il conto mostra un trucco che fra poco useremo di nuovo. Per definizione

$$
\mathbb{E}[X]=\sum_{k=0}^{\infty}k\,\frac{\lambda^ke^{-\lambda}}{k!}.
$$

Il termine con $k=0$ è moltiplicato per 0 e possiamo toglierlo: la somma parte da $k=1$. Per $k\ge1$ vale $k!=k\cdot(k-1)!$, quindi il $k$ davanti si semplifica: $k/k!=1/(k-1)!$. Portiamo poi fuori dalla somma il fattore comune $e^{-\lambda}$ e un fattore $\lambda$ preso dalla potenza:

$$
\mathbb{E}[X]=\lambda e^{-\lambda}\sum_{k=1}^{\infty}\frac{\lambda^{k-1}}{(k-1)!}.
$$

Chiamiamo $j=k-1$: quando $k$ va da 1 all’infinito, $j$ va da 0 all’infinito, e la somma rimasta diventa $\sum_{j=0}^{\infty}\lambda^j/j!$. È la serie dell’esponenziale del §13, quella che ci ha mostrato che i pesi sommano a 1, e vale $e^\lambda$. Quindi $\mathbb{E}[X]=\lambda e^{-\lambda}e^\lambda=\lambda$.

Il trucco è che il fattore $k$ si semplifica con il fattoriale. Con $k^2$ funziona male, perché dopo aver semplificato un $k$ ne resta un altro. Conviene allora calcolare la media di una quantità un po’ diversa, $X(X-1)$: il prodotto $k(k-1)$ si semplifica con il fattoriale in un colpo solo, perché per $k\ge2$ vale $k!=k(k-1)\cdot(k-2)!$. I termini con $k=0$ e $k=1$ sono nulli, quindi la somma parte da 2. Ripetiamo gli stessi passi di prima, portando fuori questa volta $\lambda^2$:

$$
\begin{aligned}
\mathbb{E}[X(X-1)]
&=\sum_{k=2}^{\infty}k(k-1)\frac{\lambda^ke^{-\lambda}}{k!}\\
&=\lambda^2e^{-\lambda}\sum_{k=2}^{\infty}\frac{\lambda^{k-2}}{(k-2)!}\\
&=\lambda^2e^{-\lambda}e^\lambda=\lambda^2.
\end{aligned}
$$

Nell’ultimo passaggio abbiamo posto $j=k-2$ e riconosciuto ancora la serie dell’esponenziale.

Ora torniamo da $X(X-1)$ a $X^2$. Sviluppando il prodotto si ha $X(X-1)=X^2-X$, cioè $X^2=X(X-1)+X$. Per linearità la media di una somma è la somma delle medie:

$$
\mathbb{E}[X^2]=\mathbb{E}[X(X-1)]+\mathbb{E}[X]=\lambda^2+\lambda.
$$

Resta da sottrarre il quadrato della media:

$$
\operatorname{Var}(X)=\mathbb{E}[X^2]-(\mathbb{E}[X])^2
=(\lambda^2+\lambda)-\lambda^2=\lambda.
$$

Il termine $\lambda^2$ si cancella e resta proprio $\lambda$: media e varianza della distribuzione di Poisson coincidono, come avevamo anticipato nel §15.

## Lettura C — Due strumenti ulteriori per la varianza {: #lettura-varianza .psi-facoltativo }

*Approfondimento facoltativo, non richiesto all’esame. Per il percorso principale si usa la definizione con gli scarti al quadrato.*

La definizione della varianza come media degli scarti al quadrato spiega bene *che cosa* misuriamo, ma per fare i conti non è sempre la strada più comoda. Ricaviamo prima una formula alternativa, poi la usiamo per trovare la varianza della distribuzione binomiale, vedendo con precisione in quale passaggio entra l’indipendenza.

### C.1. La media dei quadrati e il quadrato della media {: #formula-varianza }

Ripartiamo dallo scarto al quadrato $(X-\mu)^2$ che compare nella definizione. La media $\mu=\mathbb{E}[X]$ è un numero fissato dal modello: non cambia da un esito all’altro, come invece fa $X$. Possiamo quindi trattarla come una costante e sviluppare il quadrato come un normale quadrato di binomio:

$$
(X-\mu)^2=X^2-2\mu X+\mu^2.
$$

Facciamo la media di entrambi i lati. A sinistra, per definizione, troviamo la varianza. A destra la linearità ci permette di procedere un termine alla volta. Il primo diventa $\mathbb{E}[X^2]$. Nel secondo la costante $-2\mu$ esce dalla media, e resta $-2\mu\,\mathbb{E}[X]=-2\mu\cdot\mu=-2\mu^2$. Il terzo, $\mu^2$, è una costante, e la media di una costante è la costante stessa. Mettendo insieme i tre pezzi:

$$
\operatorname{Var}(X)=\mathbb{E}[X^2]-2\mu^2+\mu^2,
$$

e sommando gli ultimi due termini

$$
\boxed{\operatorname{Var}(X)=\mathbb{E}[X^2]-\mu^2.}
$$

A parole: la varianza è la media dei quadrati meno il quadrato della media. I due termini si somigliano, ma differiscono per l’ordine delle operazioni. Per $\mathbb{E}[X^2]$ prima eleviamo al quadrato ciascun valore possibile e poi facciamo la media, con gli stessi pesi della PMF di $X$ (è la [regola LOTUS](../settimana_04/index.md#lotus): $\mathbb{E}[X^2]=\sum_x x^2p_X(x)$). Per $\mu^2$, invece, prima facciamo la media e poi eleviamo al quadrato quel singolo numero. In generale i due risultati sono diversi, e la loro differenza è proprio la varianza.

Proviamo con il pagamento $B$ della sezione iniziale, che vale 0 oppure 10 euro con probabilità $1/2$ ciascuno. Per la media dei quadrati trasformiamo i valori in $0^2=0$ e $10^2=100$, lasciando invariate le probabilità: $\mathbb{E}[B^2]=0\cdot\frac12+100\cdot\frac12=50$. Per il quadrato della media partiamo dalla media, 5, e la eleviamo al quadrato: 25. La differenza è $50-25=25$, lo stesso valore che avevamo trovato con la tabella degli scarti.

La formula è particolarmente comoda per una variabile bernoulliana $I$ di parametro $p$, che ci servirà fra poco. La sua media è $p$. Per la media del quadrato osserviamo che $I$ vale soltanto 0 oppure 1, e che $0^2=0$ e $1^2=1$: elevare al quadrato non cambia nulla. Dunque $I^2=I$, e anche $\mathbb{E}[I^2]=p$. Sostituendo nella formula:

$$
\operatorname{Var}(I)=p-p^2=p(1-p).
$$

Il risultato ha un significato intuitivo. La varianza è nulla per $p=0$ e per $p=1$, quando la variabile vale sempre lo stesso numero e non c’è nulla di incerto; è massima per $p=1/2$, quando i due valori sono ugualmente probabili, e lì vale $1/4$.

### C.2. La varianza della distribuzione binomiale: dove serve l’indipendenza {: #varianza-binomiale }

Consideriamo $n$ prove indipendenti, ciascuna con probabilità di successo $p$. Indichiamo con $I_i$ l’indicatrice della prova $i$, che vale 1 se la prova riesce e 0 altrimenti. Il numero di successi è la somma

$$
X=I_1+I_2+\cdots+I_n,
$$

e sappiamo già che ha distribuzione binomiale con media $\mathbb{E}[X]=np$. Nella formula $\operatorname{Var}(X)=\mathbb{E}[X^2]-(\mathbb{E}[X])^2$ il secondo termine è facile, $(np)^2$; il lavoro vero sta nel primo, la media del quadrato del numero di successi.

Per capire che aspetto ha $X^2$, prendiamo prima soltanto tre prove. Elevare al quadrato una somma significa moltiplicarla per sé stessa, cioè moltiplicare ogni termine della prima parentesi per ogni termine della seconda. Si ottengono $3\cdot3=9$ prodotti:

$$
\begin{aligned}
(I_1+I_2+I_3)^2
&=I_1^2+I_1I_2+I_1I_3\\
&\quad+I_2I_1+I_2^2+I_2I_3\\
&\quad+I_3I_1+I_3I_2+I_3^2.
\end{aligned}
$$

Sulla diagonale compaiono i tre quadrati $I_1^2$, $I_2^2$ e $I_3^2$. Gli altri sei prodotti vanno a coppie uguali, perché l’ordine dei fattori non conta: $I_1I_2=I_2I_1$, e così via. Raccogliendoli:

$$
(I_1+I_2+I_3)^2=I_1^2+I_2^2+I_3^2+2I_1I_2+2I_1I_3+2I_2I_3.
$$

Con $n$ prove succede esattamente la stessa cosa: c’è un quadrato per ogni prova e un doppio prodotto per ogni coppia di prove diverse. In forma compatta,

$$
X^2=\sum_{i=1}^n I_i^2+2\sum_{i<j}I_iI_j,
$$

dove la condizione $i<j$ serve a elencare ogni coppia una volta sola. Per linearità, la media di $X^2$ è la somma delle medie di tutti questi termini. Ci restano quindi da capire due cose: quanto vale in media un quadrato e quanto vale in media un prodotto.

I quadrati sono facili, perché li abbiamo già incontrati con la variabile bernoulliana: $I_i^2=I_i$, quindi $\mathbb{E}[I_i^2]=p$. Questo passaggio guarda una prova alla volta, e non ha bisogno di nessuna ipotesi sui rapporti fra le prove.

I prodotti richiedono un po’ più di attenzione. Il prodotto $I_iI_j$ moltiplica due numeri che valgono 0 oppure 1: basta che uno dei due sia 0 per annullarlo, e vale 1 soltanto quando entrambi valgono 1. In altre parole, $I_iI_j$ è l’indicatrice dell’evento «la prova $i$ e la prova $j$ riescono entrambe», e la sua media è la probabilità di quell’evento:

$$
\mathbb{E}[I_iI_j]=P(I_i=1,\ I_j=1).
$$

**È in questo punto, e soltanto qui, che serve l’indipendenza.** Sapere che ciascuna prova riesce con probabilità $p$ non basta a dire quanto spesso due prove riescono *insieme*. Se le prove sono indipendenti, però, la probabilità che riescano entrambe è il prodotto delle due probabilità:

$$
P(I_i=1,\ I_j=1)=P(I_i=1)\,P(I_j=1)=p\cdot p=p^2.
$$

Ora possiamo contare. I quadrati sono $n$, ciascuno con media $p$, e contribuiscono $np$. Le coppie di prove diverse sono $\binom n2=n(n-1)/2$, ciascuna con media $p^2$ e con il fattore 2 davanti; il 2 si semplifica con il denominatore del coefficiente binomiale:

$$
\mathbb{E}[X^2]=np+2\cdot\frac{n(n-1)}{2}\,p^2=np+n(n-1)p^2.
$$

Sottraiamo infine il quadrato della media, $(np)^2=n^2p^2$, e svolgiamo l’algebra una riga alla volta:

$$
\begin{aligned}
\operatorname{Var}(X)
&=np+n(n-1)p^2-n^2p^2\\
&=np+n^2p^2-np^2-n^2p^2\\
&=np-np^2\\
&=\boxed{np(1-p)}.
\end{aligned}
$$

Nella seconda riga abbiamo sviluppato $n(n-1)p^2$; nella terza i due termini $n^2p^2$ si sono cancellati; nell’ultima abbiamo raccolto $np$.

Il risultato è $n$ volte la varianza $p(1-p)$ di una singola prova: la varianza del totale è la somma delle varianze delle prove. Ma ci siamo arrivati usando l’indipendenza nel calcolo dei prodotti, e senza di essa la conclusione può cadere.

Per vederlo, riprendiamo i due servizi del [laboratorio della Settimana 4](../settimana_04/index.md#lab-binomiale). Entrambi eseguono quattro operazioni, ciascuna delle quali fallisce con probabilità $0{,}2$, e $X$ conta i fallimenti. Nel primo servizio le operazioni falliscono in modo indipendente. Nel secondo un unico guasto comune, di probabilità $0{,}2$, le fa fallire tutte insieme; altrimenti riescono tutte. La media è la stessa, $4\cdot0{,}2=0{,}8$, perché la linearità non richiede indipendenza.

Ripetiamo il calcolo nei due servizi. La parte dei quadrati è identica: quattro quadrati con media $0{,}2$, per un totale di $0{,}8$. Le coppie di operazioni sono $\binom42=6$, e con il fattore 2 danno 12 prodotti: è qui che i due servizi si separano. Nel servizio indipendente due operazioni falliscono insieme con probabilità $0{,}2\cdot0{,}2=0{,}04$, quindi

$$
\mathbb{E}[X^2]=0{,}8+12\cdot0{,}04=1{,}28,
\qquad
\operatorname{Var}(X)=1{,}28-0{,}8^2=0{,}64,
$$

che è proprio $np(1-p)=4\cdot0{,}2\cdot0{,}8$. Nel servizio con il guasto comune, invece, due operazioni falliscono insieme ogni volta che si verifica il guasto, cioè con probabilità $0{,}2$ e non $0{,}04$:

$$
\mathbb{E}[X^2]=0{,}8+12\cdot0{,}2=3{,}2,
\qquad
\operatorname{Var}(X)=3{,}2-0{,}64=2{,}56.
$$

La definizione dà lo stesso valore: $(0-0{,}8)^2\cdot0{,}8+(4-0{,}8)^2\cdot0{,}2=0{,}512+2{,}048=2{,}56$.

La media è la stessa, ma la varianza del guasto comune è quattro volte maggiore. Il grafico del laboratorio mostra il perché: il conteggio salta da 0 a 4 senza valori intermedi, e si allontana molto di più dalla media. Nel calcolo, l’unica cosa cambiata è la probabilità che due operazioni falliscano insieme.

**La linearità del valore atteso vale anche per variabili dipendenti; per sommare le varianze servono invece ulteriori condizioni, come l’indipendenza.**

## Esercizi: formula la domanda prima di scegliere la formula {: #esercizi }

Prima di cominciare, un metodo che vale per tutti gli esercizi. Per ognuno, scrivi **prima** tre cose:

1. che cosa conta la variabile;
2. quali valori può assumere;
3. quali ipotesi rendono adatto il modello.

Prova il calcolo prima di aprire la soluzione: un errore che hai fatto e capito insegna molto più di una soluzione letta. I risultati numerici servono a controllare il procedimento.

### Esercizio 1 — Esattamente, entro, oltre {: #esercizio-1 }

Ogni tentativo di una richiesta riesce con probabilità 0,2, indipendentemente dagli altri. $X$ conta i tentativi fino al primo successo. Calcola $P(X=1)$, $P(X=2)$ e $P(X=3)$. Trova poi $P(X>3)$, $P(X\le3)$ e $P(X\ge3)$, spiegando ciascun evento con una frase.

??? esempio-svolto "Soluzione ragionata"
    **Le probabilità puntuali.** Prima del successo alla prova $k$ ci sono $k-1$ fallimenti, quindi i primi tre pesi sono $0{,}2$, $0{,}8\cdot0{,}2=0{,}16$ e $0{,}8^2\cdot0{,}2=0{,}128$.

    **Gli eventi con disuguaglianze.** Traduciamo ciascuna frase in una richiesta sui fallimenti.

    - «Più di tre» ($X>3$) richiede che le prime tre prove falliscano: $P(X>3)=0{,}8^3=0{,}512$.
    - «Entro tre» ($X\le3$) è il complementare del precedente: $P(X\le3)=1-0{,}512=0{,}488$.
    - «Almeno tre» ($X\ge3$) richiede soltanto che falliscano le prime due, perché la terza è libera: $P(X\ge3)=0{,}8^2=0{,}64$.

    **Controllo.** $P(X\le3)=0{,}2+0{,}16+0{,}128=0{,}488$, come sopra. Un errore comune sarebbe aggiungere un fattore $0{,}2$ a $P(X>3)$: imporrebbe un successo alla quarta prova e cambierebbe la domanda.

    **Con $k$ tentativi.** Lo stesso ragionamento vale per qualunque soglia: «non bastano $k$ tentativi» significa che i primi $k$ falliscono, quindi $P(X>k)=0{,}8^k$ e $P(X\le k)=1-0{,}8^k$.

### Esercizio 2 — La media e il budget dei tentativi {: #esercizio-2 }

Con i dati dell’esercizio 1, ciascun tentativo dura esattamente 300 millisecondi. Trova il numero medio di tentativi e il tempo medio senza limite ai retry. Come cambiano con $p=0{,}5$? Con $p=0{,}2$, cinque tentativi bastano per raggiungere una probabilità di successo del 99%?

??? esempio-svolto "Soluzione ragionata"
    **La media.** Con $p=0{,}2$, $\mathbb{E}[X]=1/0{,}2=5$ tentativi.

    **Il tempo.** Prima convertiamo le unità: 300 millisecondi sono 0,3 secondi. Il tempo totale è $T=0{,}3X$, quindi per linearità $\mathbb{E}[T]=0{,}3\cdot5=1{,}5$ secondi.

    **Con $p=0{,}5$.** Servono in media $1/0{,}5=2$ tentativi e $0{,}3\cdot2=0{,}6$ secondi. Passando da $p=0{,}2$ a $p=0{,}5$ la probabilità di successo per prova viene moltiplicata per 2,5 e la media dei tentativi viene divisa per 2,5.

    **Il 99%.** Cinque è una media, non il budget per il 99%. Infatti $P(X\le5)=1-0{,}8^5=1-0{,}32768=0{,}67232$, circa il 67,2%. Per il 99% occorrono 21 tentativi, come nel conto del [§8](#retry).

### Esercizio 3 — Il numero già in ritardo {: #esercizio-3 }

Assumi estrazioni indipendenti e probabilità $1/18$ di comparsa del 53 a ogni estrazione. Quanto vale l’attesa media? Qual è la probabilità di 18 assenze consecutive a partire da oggi? Dopo 50 assenze già osservate, qual è la probabilità di altre 18 assenze? E la probabilità di uscita alla prossima?

??? esempio-svolto "Soluzione ragionata"
    **La media.** $1/(1/18)=18$ estrazioni.

    **Diciotto assenze da oggi.** Significa $X>18$, quindi la probabilità è $(17/18)^{18}\approx0{,}3574$.

    **Dopo 50 assenze.** Chiediamo $P(X>68\mid X>50)$, perché 50 assenze già osservate più 18 nuove fanno 68. Il rapporto delle code è $(17/18)^{68}/(17/18)^{50}=(17/18)^{18}$: lo stesso valore di prima, per l’assenza di memoria.

    **L’uscita alla prossima.** Rimane $1/18$. L’attesa futura non cambia; il tempo totale già trascorso (50) resta trascorso.

### Esercizio 4 — Convertire l’intervallo {: #esercizio-4 }

Le richieste seguono il modello di arrivi di Poisson a tasso costante di 3 al secondo. Trova la probabilità di zero richieste in un secondo, in mezzo secondo e in un minuto. Perché non possiamo usare lo stesso $\lambda$ nei tre conti?

??? esempio-svolto "Soluzione ragionata"
    **Il parametro per ciascun intervallo.** Usiamo $\lambda=rt$ con $r=3$ al secondo. Le tre durate danno $\lambda=3\cdot1=3$, $\lambda=3\cdot0{,}5=1{,}5$ e $\lambda=3\cdot60=180$.

    **Zero eventi.** Per zero eventi la formula è $e^{-\lambda}$. Otteniamo circa $0{,}0498$ in un secondo, $0{,}2231$ in mezzo secondo e $6{,}71\cdot10^{-79}$ in un minuto.

    **Perché non lo stesso $\lambda$.** Il *tasso* resta uguale, ma il *numero medio di richieste* cambia con la durata dell’intervallo. Un minuto senza arrivi è enormemente meno probabile di un secondo senza arrivi. La notazione scientifica rende leggibile il terzo risultato senza scrivere decine di zeri.

### Esercizio 5 — Dalla probabilità alla colonna attesa {: #esercizio-5 }

Con $\lambda=0{,}61$, parti da $P(X=0)=e^{-0{,}61}$ e calcola i pesi per 1, 2 e 3 eventi usando la ricorrenza. Quanti corpi-anno con quei conteggi prevedi su 200? Perché il risultato può non essere intero?

??? esempio-svolto "Soluzione ragionata"
    **I pesi.** Partiamo da circa $0{,}543351$. La ricorrenza dice di moltiplicare per $\lambda/k$ a ogni passo: per $k=1$ per $0{,}61$, per $k=2$ per $0{,}61/2$, per $k=3$ per $0{,}61/3$. Otteniamo circa $0{,}331444$, $0{,}101090$ e $0{,}020555$.

    **I numeri attesi.** Moltiplichiamo per 200: circa 66,3, 20,2 e 4,1. Le frequenze osservate erano 65, 22 e 3.

    **Perché non sono interi.** I valori attesi sono *medie teoriche* di conteggi interi e non devono essere interi, come il 3,5 del dado. Neppure un modello esatto imporrebbe al campione di coincidere con le proprie frequenze attese.

### Esercizio 6 — Calcolare e interpretare una varianza {: #esercizio-6 }

Una variabile $Y$ vale 0 con probabilità $1/4$, 2 con probabilità $1/2$ e 4 con probabilità $1/4$. Calcola media e varianza **con la definizione degli scarti**. Può avere distribuzione di Poisson? Usa poi lo stesso procedimento per verificare la varianza 0,6079 della tabella di Bortkiewicz.

??? esempio-svolto "Soluzione ragionata"
    **La media.** $0\cdot\frac14+2\cdot\frac12+4\cdot\frac14=0+1+1=2$.

    **Gli scarti e la varianza.** Gli scarti dalla media sono $-2$, $0$ e $2$. Elevati al quadrato e pesati:

    $$
    \operatorname{Var}(Y)=(-2)^2\frac14+0^2\frac12+2^2\frac14=1+0+1=2.
    $$

    **Può avere distribuzione di Poisson?** Media e varianza coincidono, ma $Y$ **non ha distribuzione di Poisson**: per esempio $P(Y=1)=0$, mentre una distribuzione di Poisson di parametro 2 assegna a 1 probabilità $2e^{-2}>0$. Abbiamo così un controesempio all’idea che l’uguaglianza fra media e varianza identifichi il modello.

    **Bortkiewicz.** I pesi sono le frequenze divise per 200 e la media è 0,61. La somma pesata degli scarti al quadrato è:

    $$
    \frac{109(0-0{,}61)^2+65(1-0{,}61)^2+22(2-0{,}61)^2+3(3-0{,}61)^2+(4-0{,}61)^2}{200}
    =0{,}6079.
    $$

    Il valore vicino alla media è coerente con il modello, ma non ne prova tutte le ipotesi.

### Esercizio 7 — Scegliere il modello e dichiarare le ipotesi {: #esercizio-7 }

Per ciascuna situazione indica un modello naturale e trova la probabilità richiesta. Quando il testo fornisce soltanto una media, precisa quali ipotesi aggiungi per usare la distribuzione di Poisson.

1. Un collegamento perde in media 0,5 pacchetti al minuto: probabilità di almeno una perdita in un minuto.
2. Ogni connessione riesce con probabilità 0,9, indipendentemente dalle altre: probabilità di dover fare più di un tentativo.
3. Un testo contiene in media 2 refusi per pagina: probabilità di esattamente 2 refusi in una pagina.
4. Fra 10 operazioni indipendenti, ciascuna riesce con probabilità 0,9: probabilità che riescano tutte.
5. **Richiamo facoltativo:** quanti numeri pari ci sono fra i 5 estratti senza reinserimento da 1 a 90? Trova la media e spiega perché il conteggio non segue una distribuzione binomiale.

??? esempio-svolto "Soluzione ragionata"
    1. **Pacchetti persi.** Se le perdite sono eventi singoli, a tasso stabile e senza dipendenza fra intervalli disgiunti, usiamo la distribuzione di Poisson$(0{,}5)$. «Almeno una perdita» ha come complementare «zero perdite», quindi $P(X\ge1)=1-e^{-0{,}5}\approx0{,}3935$. La sola media non assicura queste ipotesi: le stiamo aggiungendo noi.
    2. **Connessioni.** Il numero di tentativi fino al successo è Geometrica$(0{,}9)$. «Più di un tentativo» significa che il primo fallisce: $P(X>1)=0{,}1$.
    3. **Refusi.** Se adottiamo il modello con distribuzione di Poisson, con esposizione omogenea per pagina e refusi non raggruppati, $P(X=2)=2^2e^{-2}/2!=2e^{-2}\approx0{,}2707$. Conoscere la media 2 non basta, da solo, a identificare la distribuzione.
    4. **Dieci operazioni.** Il numero di riuscite ha distribuzione binomiale$(10,0{,}9)$; riescono tutte con probabilità $0{,}9^{10}\approx0{,}3487$.
    5. **Numeri pari.** Il modello è [Ipergeometrico](../settimana_04/index.md#ipergeometrica). Ci sono 45 pari su 90; dopo ogni estrazione cambia la composizione dei numeri rimasti, quindi le cinque indicatrici non sono indipendenti. Ciascuna ha però media $45/90$. Per linearità, che non richiede indipendenza, la media del totale è $5\cdot45/90=2{,}5$.

### Esercizio 8 — Un picco oltre la soglia {: #esercizio-8 }

Un conteggio ha distribuzione di Poisson con $\lambda=2$. Trova la probabilità di almeno tre eventi. Quali proprietà hanno media e varianza? Se una serie di intervalli comparabili avesse media osservata circa 2 e varianza circa 9, che cosa controlleresti?

??? esempio-svolto "Soluzione ragionata"
    **Almeno tre eventi.** Significa $X\ge3$, il cui complementare è $X\in\{0,1,2\}$. Togliamo da 1 i pesi di 0, 1 e 2:

    $$
    P(X\ge3)=1-e^{-2}\left(1+2+\frac{2^2}{2}\right)
    =1-5e^{-2}\approx0{,}3233.
    $$

    **Media e varianza.** Nel modello valgono entrambe 2.

    **Una varianza osservata di 9.** Suggerirebbe sovradispersione rispetto alla distribuzione di Poisson con media 2. Controllerei se abbiamo mescolato intervalli con tassi diversi, se ci sono raffiche o cause comuni, e quanto è grande il campione. Non basta sostituire $\lambda$ con 9: in una distribuzione di Poisson quello cambierebbe anche la media.

## Errori da evitare: tornare al significato {: #errori }

Ogni errore frequente ha una domanda che lo previene. Quando nel tuo conto compare qualcosa che ti insospettisce, fermati e chiediti la domanda corrispondente.

| Se nel conto compare… | Torna a questa domanda |
|---|---|
| $(1-p)^kp$ per $P(X=k)$ nella nostra Geometrica | Prima del successo alla prova $k$, quanti fallimenti servono? |
| Lo stesso esponente per $X>k$ e $X\ge k$ | Devo fallire anche la prova $k$, oppure soltanto le precedenti? |
| Un fattore $p$ nella coda geometrica | Sto imponendo un successo in una prova precisa? |
| L’idea che il ritardatario sia dovuto | Sto calcolando una probabilità futura condizionata o quella dell’intera sequenza? |
| La media trattata come una scadenza | Quale probabilità attribuisce la coda al superamento della media? |
| $\lambda$ copiato dal testo senza unità | A quale durata o esposizione si riferisce la domanda? |
| Una probabilità della distribuzione di Poisson maggiore di 1 | Ho distinto il numero medio $\lambda$ da $P(X=k)$? Ho incluso $e^{-\lambda}$ e $k!$? |
| «Media uguale a varianza, dunque distribuzione di Poisson» | Ho controllato il meccanismo e le altre probabilità della distribuzione? |
| «La media osservata deve essere esattamente $\lambda$» | Sto distinguendo i dati osservati dalla media del modello? |
| Una varianza calcolata con scarti che si cancellano | Ho elevato al quadrato ogni scarto prima di fare la media? |

## Riepilogo per lo studio {: #riepilogo }

Rileggiamo il percorso in poche righe, nell’ordine in cui l’abbiamo fatto.

**La varianza.** Aggiunge al centro della distribuzione una misura della dispersione. Per calcolarla dalla definizione troviamo la media, gli scarti, i quadrati degli scarti e infine la loro media pesata. La radice della varianza è la deviazione standard, che ha le stesse unità della variabile.

**La Geometrica.** Nasce quando ripetiamo prove indipendenti con probabilità di successo costante e contiamo tutte le prove fino al primo successo. La PMF $(1-p)^{k-1}p$ descrive una sequenza di $k-1$ fallimenti chiusa da un successo. La coda $(1-p)^k$ richiede soltanto $k$ fallimenti. La media è $1/p$; l’assenza di memoria riguarda la distribuzione dell’attesa che resta dopo i fallimenti già osservati.

**La distribuzione di Poisson.** Descrive un conteggio in un intervallo. Il modello a pezzetti la costruisce come limite di distribuzioni binomiali con sempre più prove, probabilità per prova sempre più piccola e media totale $\lambda$ fissata. La sua PMF è $\lambda^ke^{-\lambda}/k!$; media e varianza valgono entrambe $\lambda$. Con un tasso costante $r$ e una durata $t$, il parametro dell’intervallo è $\lambda=rt$.

**Le applicazioni.** Gli esempi informatici mostrano perché conta formulare la domanda. Per scegliere un budget di retry serve una coda dell’attesa; per stimare quanti intervalli superano una soglia di arrivi serve una coda del conteggio. In entrambi i casi la formula dipende dal modello: indipendenza, stabilità delle probabilità e corretta unità di osservazione devono avere un significato nel sistema studiato.

!!! tip "Prova a raccontarlo senza il formulario"
    Descrivi che cosa conta la variabile. Costruisci l’evento richiesto con una frase o una sequenza. Spiega dove usi l’indipendenza. Poi scrivi la formula, fai il conto e interpreta il risultato con le unità giuste. Se riesci a ricostruire questi passaggi, stai usando la distribuzione come uno strumento di ragionamento, e non come una formula da ricordare.

## Riferimenti e letture {: #riferimenti }

La costruzione della dispensa segue i testi disponibili nella bibliografia del corso. I rimandi alle sezioni permettono di ritrovare i passaggi anche in edizioni con una diversa numerazione delle pagine.

- **Ladislaus von Bortkiewicz**, *Das Gesetz der kleinen Zahlen*, Teubner, 1898, cap. II, §12, pp. 23–25. È la fonte dei dati dei corpi d’armata e della tabella osservati–attesi. Copia di lavoro: `bibs/classics/Bortkiewicz_1898_Das_Gesetz_der_kleinen_Zahlen.pdf`; [scansione pubblica](https://archive.org/details/dasgesetzderklei00bortrich).
- **Siméon-Denis Poisson**, *Recherches sur la probabilité des jugements en matière criminelle et en matière civile*, Bachelier, Parigi, 1837. È l’opera in cui compare l’approssimazione che oggi porta il suo nome; qui serve come motivazione storica. [Scansione pubblica](https://archive.org/details/recherchessurlap00pois). Che il titolo di Bortkiewicz richiami la legge dei grandi numeri di Poisson, senza contrapporvisi, è indicato nella voce [«Bortkiewicz, Ladislaus von»](https://encyclopediaofmath.org/wiki/Bortkiewicz,_Ladislaus_von) dell’*Encyclopedia of Mathematics*.
- **Michael Baron**, *Probability and Statistics for Computer Scientists*, 2ª ed., CRC Press, 2014, §3.4.3, «Geometric distribution», e §3.4.5, «Poisson distribution»; per la varianza, §3.3.4. Copia di lavoro: `bibs/tech/baron2014probabilityforcs.pdf`. Il testo usa la convenzione geometrica che conta anche la prova riuscita.
- **Chris Piech**, *Probability for Computer Scientists*, materiale del corso Stanford CS109, copia in `bibs/tech/Piech2023ProbabilityForCSs.pdf`: voci «Variance», «Geometric Random Variable», «Poisson Distribution» e «Binomial Approximation». La costruzione attraverso suddivisioni dell’intervallo è ripresa con spiegazioni autonome in questa dispensa. [Portale del testo](https://chrispiech.github.io/probabilityForComputerScientists/).
- **Burton H. Bloom**, «Space/time trade-offs in hash coding with allowable errors», *Communications of the ACM*, 13(7), 1970, pp. 422–426. Riferimento originale dell’approfondimento sul filtro; [scheda dell’articolo](https://dl.acm.org/doi/10.1145/362686.362692).
- **Il 53 di Venezia:** l’episodio è una motivazione storica, non un dato necessario ai calcoli. Per la cronaca del ritardo di 182 estrazioni, si veda [*l’Unità*, 12 giugno 2005, p. 10](https://archivio.unita.news/assets/main/2005/06/12/page_010.pdf), già indicata nella bibliografia della lezione. Il modello probabilistico è dichiarato nel testo e non dipende dalle interpretazioni giornalistiche dell’episodio.

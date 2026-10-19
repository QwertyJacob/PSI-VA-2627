# Settimana 5 — Bortkiewicz e i calci di cavallo: Geometrica e Poisson

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

### Dove stiamo andando

Questa settimana impariamo a descrivere due situazioni che incontriamo continuamente quando osserviamo un sistema:

- **un’attesa**: «quante volte devo riprovare prima che vada bene?»;
- **un conteggio in un intervallo**: «quanti eventi si verificano mentre guardo?».

Per ciascuna costruiremo un modello probabilistico, cioè una distribuzione. Prima, però, ci serve un nuovo strumento da affiancare al valore atteso: la **varianza**, che misura quanto i risultati si disperdono attorno alla media. Ne avremo bisogno più volte, e in particolare per capire la Poisson.

### Come leggere questa dispensa

Il testo procede con calma e non ha fretta di arrivare alle formule. Ogni formula viene preceduta dalla domanda a cui risponde e da un esempio piccolo, che si può seguire con carta e penna. Dopo le formule più importanti troverai una breve «lettura in parole» di ciò che dicono.

Incontrerai tre tipi di pause:

- le **soste di verifica**, con la risposta nascosta: prova a rispondere da solo e poi apri la soluzione;
- le **domande in apertura** di alcune sezioni: servono a mettere alla prova le tue intuizioni *prima* del calcolo, e non importa se all’inizio sbagli;
- i **riquadri «Che cosa abbiamo ottenuto»**, che riassumono in poche righe il punto raggiunto.

Gli esempi preparano le definizioni, e non il contrario. Non occorre memorizzare i dati storici né i valori decimali degli esempi: contano il ragionamento e la capacità di rifarlo.

### Il percorso principale

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
- spiegare l’idea dei **pezzetti di tempo** che porta dalla Binomiale alla Poisson, compreso il conto per zero eventi;
- usare la **PMF di Poisson**, sapere che $\mathbb{E}[X]=\operatorname{Var}(X)=\lambda$ e scegliere il parametro relativo all’intervallo della domanda;
- scegliere il modello in un’applicazione semplice e discutere le ipotesi, soprattutto indipendenza e stabilità del tasso.

### Che cosa è facoltativo

**Sono facoltativi e non richiesti all’esame:**

- il filtro di Bloom (Lettura A);
- la derivazione completa del limite binomiale e dei momenti della Poisson (Lettura B);
- l’identità del secondo momento e le derivazioni delle varianze di Bernoulli e Binomiale (Lettura C).

Una precisazione importante: la **proprietà** $\operatorname{Var}(X)=\lambda$ per la Poisson è richiesta; è la sua *dimostrazione* a essere facoltativa. L’esercizio sul campionamento senza reinserimento richiama un approfondimento facoltativo della Settimana 4.

Per codice, widget e fonti valgono le [indicazioni generali per lo studio](../index.md#esame). I laboratori servono a mettere alla prova le previsioni: una simulazione ci fa *vedere* che una proprietà vale, mentre la spiegazione matematica ci dice *perché* vale. Le due cose si completano.

## Prima di cominciare: che cosa sappiamo già {: #prima-di-cominciare }

Prima di avventurarci in terreno nuovo, richiamiamo con calma gli strumenti che useremo. Se qualcosa ti sembra poco chiaro, rileggi la Settimana 4: qui ci limitiamo a un ripasso essenziale.

### La variabile aleatoria e la sua PMF

Nella Settimana 4 abbiamo imparato a leggere l’esito di un esperimento attraverso una **variabile aleatoria**. Se ci interessa il numero di richieste fallite, la variabile $X$ restituisce quel numero; la **distribuzione** descrive quali valori $X$ può assumere e con quali probabilità.

Per una variabile discreta, la distribuzione si scrive con la **PMF** (*probability mass function*, funzione di massa di probabilità):

$$
p_X(x)=P(X=x).
$$

Leggiamo il simbolo con calma: a sinistra c’è il nome della funzione, che prende un valore $x$; a destra c’è la probabilità che la variabile $X$ assuma proprio quel valore. I valori della PMF sono **pesi**: ciascuno è non negativo e la loro somma è 1.

### Il valore atteso come media pesata

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

### La linearità

Useremo spesso anche la **linearità**. Se una durata è $T=aX+b$, allora

$$
\mathbb{E}[T]=a\,\mathbb{E}[X]+b.
$$

Per esempio, se ogni tentativo dura 0,3 secondi e $X$ conta i tentativi, la durata è $T=0{,}3X$ e la sua media è $0{,}3\,\mathbb{E}[X]$. In più, se un conteggio è una somma di indicatrici, la sua media è la somma delle probabilità degli eventi contati. Questa proprietà è notevole perché **non richiede indipendenza**: vale anche quando le variabili sono legate fra loro.

### La Binomiale

Infine conosciamo la **Binomiale**. Fissiamo $n$ prove indipendenti, ognuna con la stessa probabilità di successo $p$, e contiamo i successi. La media del conteggio è $np$.

### Una domanda da tenere a mente

La Binomiale risponde a una domanda precisa:

> **«Quanti successi in un numero fissato di prove?»**

Nota che qui il numero di prove è *deciso in anticipo*, mentre il numero di successi è ciò che *osserviamo*. In questa settimana cambieremo proprio ciò che è fissato e ciò che è osservato. Se fissiamo il numero di successi (uno solo) e osserviamo il numero di prove, otterremo la Geometrica. Se fissiamo un intervallo di tempo e osserviamo quanti eventi vi cadono, otterremo la Poisson.

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

Ecco che cosa non vedeva il valore equo. Il prezzo di Huygens guarda soltanto il centro. Chi sceglie fra $A$ e $B$ guarda anche *quanto il pagamento può allontanarsi da quel centro*: $B$ non paga mai 5 euro, così come il dado della Settimana 4 non mostra mai 3,5. Nei prossimi passi daremo un numero proprio a questa distanza.

### Passo 1 — Misurare la distanza dalla media

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

### Passo 2 — Perché la media degli scarti non funziona

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

### Passo 3 — Eliminare il segno: il quadrato

Ci sono due modi comuni per eliminare il segno: prendere il valore assoluto, oppure elevare al quadrato. Scegliamo il **quadrato**. Sia $-5$ sia $5$ diventano 25, quindi niente si cancella. Il quadrato ha anche due vantaggi:

- attribuisce un peso maggiore agli scarti grandi: raddoppiare la distanza quadruplica il suo contributo;
- si presta bene al calcolo algebrico, come vedremo nella Lettura C. Il valore assoluto, invece, rende i conti molto più scomodi.

### Passo 4 — La definizione

Facciamo ora la media degli scarti al quadrato. Questa quantità è la **varianza**:

$$
\boxed{\operatorname{Var}(X)
=\mathbb{E}[(X-\mu)^2]
=\sum_x (x-\mu)^2p_X(x).}
$$

Osserviamo che la varianza è a sua volta un valore atteso: quello della quantità $(X-\mu)^2$, che è una funzione di $X$. Per calcolarlo si pesa ogni valore *trasformato* con la PMF di $X$, secondo la regola che abbiamo visto nella [Settimana 4](../settimana_04/index.md#lotus).

**Leggiamo la formula come una procedura in quattro passaggi:**

1. trova la media $\mu$;
2. sottraila a ogni valore possibile, ottenendo gli scarti;
3. eleva al quadrato ciascuno scarto;
4. pesa i quadrati con le probabilità e somma.

Un errore frequente da evitare subito: eleviamo al quadrato **gli scarti**, non le probabilità.

### Un calcolo completo, riga per riga

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

### Che cosa possiamo dire di una varianza

Due proprietà si leggono direttamente dalla definizione.

**La varianza non è mai negativa.** È una media di quantità non negative: ogni quadrato è maggiore o uguale a zero, e i pesi sono non negativi.

**Vale zero soltanto quando non c’è dispersione.** La varianza è nulla se e solo se $X$ coincide con la propria media con probabilità 1. Su una distribuzione finita il motivo è semplice: basta che un solo valore di probabilità positiva sia diverso dalla media perché il suo contributo sia strettamente positivo, e nessun altro contributo può compensarlo.

### Le unità di misura: la deviazione standard

C’è un dettaglio che conviene notare subito. Se $X$ è in euro, gli scarti sono in euro e i loro quadrati in *euro al quadrato*. Il 25 appena trovato non è un pagamento di 25 euro: ha un’unità di misura diversa da quella della variabile. Per tornare alle unità di partenza prendiamo la radice quadrata:

$$
\sigma_X=\sqrt{\operatorname{Var}(X)}.
$$

Questa è la **deviazione standard**; la lettera $\sigma$ si legge «sigma». Per $B$ vale $\sqrt{25}=5$ euro.

In questo esempio ogni pagamento dista proprio 5 euro dalla media, quindi la deviazione standard coincide con la distanza tipica. In generale non è così: la deviazione standard misura una *scala* della dispersione, e non coincide necessariamente con la media delle distanze. Quando le distanze sono tutte diverse, i valori più lontani contano di più, per via del quadrato.

### Un secondo esempio, con pesi diversi

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

### Quanto serve per il percorso principale

Per il percorso principale basta questo metodo, cioè la definizione. Nella [Lettura C](#lettura-varianza) ricaveremo una formula alternativa e la applicheremo alla Binomiale.

Una avvertenza per le variabili con infiniti valori possibili: una media finita non assicura una varianza finita. Occorre controllare anche la convergenza della somma degli scarti al quadrato. Per le distribuzioni di questa settimana tutto va bene, ma non è automatico in generale.

## Atto I — Il 53 che non usciva {: #ritardatari }

### Una storia e una domanda

Nel gioco del Lotto, ogni settimana si estraggono numeri su più «ruote», che sono come urne separate. Il caso più celebre è quello del **53 di Venezia**: nel periodo 2003–2005 il 53 rimase assente dalla ruota di Venezia per **182 estrazioni consecutive**. Molti giocatori puntarono su quel numero con una convinzione crescente: dopo tanta attesa, *doveva* uscire.

Fermiamoci un momento e facciamo una previsione, prima di qualunque calcolo. Il 53 è assente da 100 estrazioni. Alla prossima:

- è **più probabile** del solito che esca?
- è **meno probabile**?
- ha **la stessa probabilità** di sempre?

Annota la tua risposta, e magari anche quanto ne sei sicuro. Alla fine dell’Atto II torneremo qui. Non serve sapere nulla dei dettagli delle puntate: serve capire che cosa il modello ci dice sulle estrazioni *future*.

### Il modello di una ruota

Per ragionare in modo preciso dobbiamo dichiarare le ipotesi. Consideriamo una ruota fissata, per esempio Venezia.

- A ogni estrazione vengono scelti **5 numeri distinti fra 1 e 90**.
- All’interno della stessa estrazione i numeri sono scelti **senza reinserimento**: un numero estratto non rientra nell’urna.
- Tra un’estrazione e la successiva si riparte con tutti i 90 numeri.
- I sorteggi successivi sono **indipendenti** ed equi.

L’ultima ipotesi è il cuore del modello: l’urna non «ricorda» che cosa è uscito prima.

### La probabilità in una singola estrazione

Cominciamo dal passo più piccolo: una sola estrazione. Qual è la probabilità che esca il 53?

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

### Dall’estrazione singola all’attesa

Ora cambiamo prospettiva. Scegliamo il punto da cui cominciare a osservare e *contiamo le estrazioni fino alla prima comparsa del 53*. Questo numero non è fissato in anticipo: potrebbe bastare una sola estrazione, potrebbero servirne cento.

Qui nasce la novità. Nella Binomiale decidevamo il numero di prove e contavamo i successi. Adesso decidiamo che cosa vogliamo ottenere (un successo) e contiamo **quante prove servono**.

**La domanda guida dell’Atto II:** se abbiamo già osservato 100 assenze, quanto dobbiamo ancora aspettare? La risposta è un calcolo di probabilità condizionata, che faremo con tutta la calma necessaria.

## Atto II — Aspettare il primo successo: la Geometrica {: #geometrica }

### 1. Prima decidiamo che cosa contiamo {: #modello-geometrico }

**Dove siamo.** Vogliamo un modello per «il numero di prove fino al primo successo». Prima di scrivere formule costruiamolo con un esempio semplice.

Partiamo da una moneta. La lanciamo finché esce la prima testa e chiamiamo $X$ il **numero totale di lanci effettuati, compreso quello riuscito**. Guardiamo le prime sequenze possibili:

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

Confrontiamo la costruzione con quella della Binomiale, per fissare bene la differenza:

| | Che cosa è fissato in anticipo | Che cosa osserviamo |
|---|---|---|
| Binomiale | il numero di prove $n$ | il numero di successi |
| Geometrica | il traguardo: **un** successo | il numero di prove necessarie |

Una convenzione da tenere ben presente: qui contiamo **tutte** le prove, compresa quella riuscita. Per questo **$X$ parte da 1**.

I casi limite si trattano a parte. Se $p=1$, la prima prova riesce certamente: $X=1$ con probabilità 1. Se $p=0$, il successo non arriva mai, e non otteniamo una Geometrica finita con questa convenzione.

### 2. La PMF: tradurre un valore in una storia {: #pmf-geometrica }

**Dove siamo.** Ora vogliamo la distribuzione di $X$: la probabilità $P(X=k)$ per ogni $k$. L’idea è di tradurre ciascun valore in una *storia* di successi e fallimenti, e poi moltiplicare le probabilità lungo la storia.

Facciamo tre casi, uno alla volta.

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

Con una moneta onesta, $p=1/2$, quindi $P(X=4)=(1/2)^4=1/16$. Nota che **non compare un coefficiente binomiale**. Nella Binomiale dovevamo scegliere *quali* prove fossero riuscite; qui l’unica storia compatibile con $X=4$ ha il successo in ultima posizione, e tutte le posizioni precedenti sono già determinate.

Lo schema è chiaro: per avere $X=k$ servono esattamente $k-1$ fallimenti prima dell’unico successo finale. Abbiamo così costruito la PMF:

$$
\boxed{P(X=k)=(1-p)^{k-1}p,\qquad k=1,2,3,\ldots}
$$

**Lettura in parole.** L’esponente di $(1-p)$ è il numero di fallimenti *prima* del successo; il fattore $p$ finale è il successo che chiude la storia.

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

**Dove siamo.** Finora abbiamo chiesto «il successo arriva *esattamente* alla prova $k$». Spesso la domanda utile è un’altra: «non è ancora arrivato dopo $k$ prove?». È una domanda sulla **coda** della distribuzione.

Cambiamo dunque domanda: qual è la probabilità che **non bastino le prime tre prove**? Non chiediamo più dove arrivi il primo successo; chiediamo se sia ancora assente dopo tre prove.

L’evento è $X>3$. Si verifica se e solo se le prime tre prove falliscono. Notiamo bene che *non imponiamo* un successo alla quarta: potrebbe arrivare alla quarta, alla quinta o molto dopo, e a noi va bene qualunque di questi casi. Quindi:

$$
P(X>3)=(1-p)^3.
$$

In generale, per un intero $k\ge0$:

$$
\boxed{P(X>k)=(1-p)^k.}
$$

**Lettura in parole.** Superare la soglia $k$ significa fallire le prime $k$ prove; di che cosa succede dopo non ci occupiamo.

Con $p=0{,}2$ otteniamo $P(X>3)=0{,}8^3=0{,}512$. Confrontiamolo con $P(X=4)=0{,}1024$ della tabella: il primo evento *include* tutti i possibili successi dopo la terza prova (alla quarta, alla quinta, e così via), il secondo ne specifica uno solo. È per questo che le due probabilità sono diverse: la seconda è la prima moltiplicata per $p$, perché, dopo tre fallimenti, chiediamo anche che la quarta prova riesca.

Usando il complementare otteniamo la probabilità di riuscire **entro** $k$ prove:

$$
\boxed{P(X\le k)=1-(1-p)^k.}
$$

Nel nostro esempio con $k=3$ vale $1-0{,}512=0{,}488$. Possiamo ritrovarla sommando i primi tre pesi della tabella, come controllo: $0{,}2+0{,}16+0{,}128=0{,}488$. I due conti concordano.

??? note "Approfondimento facoltativo — La stessa formula sommando la PMF, per ogni $k$"
    Il controllo appena fatto suggerisce una seconda strada. L’evento «riuscire entro $k$ prove» è l’unione degli eventi disgiunti $\{X=1\},\{X=2\},\dots,\{X=k\}$, quindi possiamo sommare i pesi della PMF invece di ragionare sui fallimenti. Mostriamo che le due strade danno **sempre** lo stesso risultato, per qualunque $k\ge1$ e qualunque $0<p\le1$.

    **Impostare la somma.** Scriviamo $q=1-p$ per alleggerire la notazione. Per l’additività,

    $$
    P(X\le k)=\sum_{j=1}^{k}P(X=j)=\sum_{j=1}^{k}q^{\,j-1}p=p\left(1+q+q^2+\cdots+q^{k-1}\right).
    $$

    Il fattore $p$ è comune a tutti i termini e lo abbiamo raccolto. Resta da calcolare la somma tra parentesi, che chiamiamo $S_k$.

    **Il trucco del telescopio.** Moltiplichiamo $S_k$ per $1-q$ e distribuiamo:

    $$
    \begin{aligned}
    (1-q)\,S_k
    &=\left(1+q+q^2+\cdots+q^{k-1}\right)-\left(q+q^2+\cdots+q^{k-1}+q^{k}\right)\\
    &=1-q^{k}.
    \end{aligned}
    $$

    Nella prima parentesi ci sono le potenze da $q^0$ a $q^{k-1}$; nella seconda, ottenuta moltiplicando per $q$, quelle da $q^1$ a $q^k$. Tutte le potenze intermedie compaiono una volta con il segno più e una volta con il segno meno, e si cancellano: restano solo il primo termine della prima parentesi e l’ultimo della seconda.

    Attenzione: non abbiamo ancora trovato $S_k$. Abbiamo trovato quanto vale $S_k$ **moltiplicato per** $1-q$.

    **Ricavare $S_k$.** Per isolare $S_k$ dividiamo **entrambi i lati** dell’uguaglianza per $1-q$. Possiamo farlo perché $1-q=p$ non è zero:

    $$
    S_k=\frac{1-q^k}{1-q}.
    $$

    Ora ricordiamo che $1-q=p$ e riscriviamo soltanto il denominatore:

    $$
    S_k=\frac{1-q^k}{p}.
    $$

    Quindi $S_k$ non è $1-q^k$: è $1-q^k$ **diviso per** $p$. Con $p=0{,}2$, $q=0{,}8$ e $k=3$: direttamente $S_3=1+0{,}8+0{,}64=2{,}44$, e con la formula $(1-0{,}512)/0{,}2=0{,}488/0{,}2=2{,}44$.

    **Concludere.** Torniamo a $P(X\le k)=p\cdot S_k$ e sostituiamo il valore appena trovato. Il $p$ davanti e il $p$ al denominatore si semplificano:

    $$
    P(X\le k)=p\cdot S_k=p\cdot\frac{1-q^k}{p}=1-q^k=1-(1-p)^k,
    $$

    e, passando al complementare,

    $$
    P(X>k)=1-P(X\le k)=(1-p)^k.
    $$

    È esattamente la formula trovata contando i fallimenti. Il fattore $p$ davanti alla somma si semplifica con il denominatore: è il motivo per cui nel risultato finale compare soltanto la probabilità di fallire.

    **Controllo con i numeri.** Con $p=0{,}2$ e $k=3$ abbiamo trovato $S_3=2{,}44$, quindi $P(X\le3)=0{,}2\cdot2{,}44=0{,}488$. La formula dà $1-0{,}8^3=1-0{,}512=0{,}488$.

    **Che cosa ci insegna.** Le due strade rispondono alla stessa domanda in modi diversi. Contare i fallimenti è più rapido, perché guarda solo le prime $k$ prove. Sommare la PMF è più lungo, ma è un controllo indipendente: se le due strade non coincidessero, avremmo sbagliato la PMF o la lettura dell’evento. Infine, quando $k$ cresce, $(1-p)^k$ tende a 0 e quindi $P(X\le k)$ tende a 1: i pesi della PMF sommano a 1, come vedremo tra poco.

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

#### Il successo arriva prima o poi?

Ogni attesa finita può essere superata: nessuna soglia $k$ è «garantita». Tuttavia, poiché $0<1-p<1$, la quantità $(1-p)^k$ **tende a zero** quando $k$ cresce. La probabilità di *non riuscire mai* è dunque zero. Diciamo che il successo arriva **con probabilità 1**. Attenzione: questo non fornisce un numero finito di prove entro cui il successo sia garantito. Dice soltanto che l’attesa infinita ha probabilità nulla.

Possiamo anche controllare direttamente che la PMF sommi a 1, senza calcolare una serie infinita. Gli eventi $X\le K$ e $X>K$ sono complementari, quindi:

$$
\sum_{k=1}^{K}P(X=k)=1-(1-p)^K\ \longrightarrow\ 1.
$$

Leggiamo: sommando i primi $K$ pesi otteniamo tutto tranne la coda $(1-p)^K$. Aumentando $K$ includiamo sempre più valori possibili e il peso ancora escluso tende a zero. In altre parole, la somma di tutti i pesi è 1: ecco la verifica che quella che abbiamo scritto è davvero una PMF.

### 4. La media: quante prove servono in media? {: #media-geometrica }

**Dove siamo.** Vogliamo il valore atteso di $X$: quante prove servono, in media, per il primo successo?

Cominciamo dall’intuizione. Se ogni prova riesce con probabilità $1/5$, cioè «una volta su cinque», ci aspettiamo di dover attendere in media cinque prove. Lo stesso per $p=1/2$: due lanci di moneta. L’idea è che $1/p$ sia l’intervallo tipico fra due successi.

Il valore atteso della Geometrica è dunque

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

    **Leggiamo l’equazione.** Con probabilità $p$ il costo medio è 1; con probabilità $1-p$ il costo medio è $1+\mu$. È una media pesata, di quelle che conosciamo.

    Ora la risolviamo con calma, una riga alla volta. Sviluppiamo la parentesi e raccogliamo:

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

    **Lettura in parole.** La media di un’attesa è la somma delle probabilità di superare ogni soglia: $0$, poi $1$, poi $2$, e così via.

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

#### Una media non è una scadenza

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

**Dove siamo.** Abbiamo la distribuzione dell’attesa. Ora possiamo finalmente rispondere alla domanda che ci eravamo posti con il 53: se abbiamo già osservato molte assenze, che cosa cambia per il futuro?

#### Il calcolo con numeri concreti

Torniamo al 53. Abbiamo osservato 100 assenze: sappiamo che $X>100$. Chiediamo la probabilità di *altre* 18 assenze, cioè che $X>118$, **dato** ciò che sappiamo già.

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

#### La stessa cosa con lettere

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

**Lettura in parole.** A sinistra abbiamo già aspettato $s$ prove senza successo e guardiamo l’attesa *residua*. A destra partiamo da zero e guardiamo un’attesa *nuova*. Le due probabilità coincidono per ogni soglia futura $t$.

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

**Dove siamo.** Possiamo ora tornare alla domanda con cui abbiamo aperto l’Atto I. Se hai fatto una previsione, è il momento di confrontarla con il calcolo.

La probabilità che il 53 esca alla prossima estrazione rimane **$1/18$**, anche dopo 100 assenze. Né più alta, né più bassa. Credere che sia diventato «dovuto» è la **fallacia del giocatore**.

#### Perché l’intuizione inganna

L’intuizione sbagliata nasce da un’idea ragionevole in apparenza: «alla lunga le frequenze si compensano». È vero che, su moltissime estrazioni, la frequenza del 53 si avvicina a $1/18$. Ma non si avvicina perché l’urna «recupera» il ritardo. Il ritardo non viene recuperato: viene **diluito**. Dopo 100 assenze, le prossime 1000 estrazioni produrranno ancora circa $1000/18$ comparse, come se nulla fosse successo; le 100 assenze iniziali pesano sempre meno nella frequenza complessiva, ma non vengono compensate.

#### Due domande che sembrano la stessa

Per vedere l’errore, confrontiamo due domande simili che hanno risposte molto diverse:

| Informazione disponibile | Domanda | Probabilità |
|---|---|---|
| Non abbiamo ancora osservato la sequenza | Mancherà per tutte le prossime 118 estrazioni? | $(17/18)^{118}\approx0{,}00118$ |
| Abbiamo già osservato 100 assenze | Mancherà per altre 18 estrazioni? | $(17/18)^{18}\approx0{,}357$ |

Nella prima domanda tutte le 118 assenze sono ancora incerte, e la loro congiunzione è molto rara. Nella seconda le prime 100 sono già note: la probabilità condizionata riguarda soltanto ciò che resta da osservare. La rarità dell’*intera* sequenza non rende meno probabili i suoi possibili proseguimenti. Una sequenza di 118 assenze è rara *prima* di cominciare; dopo le prime 100, quella rarità è già stata «spesa».

#### Scegliere prima o cercare dopo

C’è poi un’ultima sottigliezza, che spiega perché i ritardi vistosi ci colpiscono tanto. Una cosa è scegliere **prima** un numero e un punto di partenza, e poi osservare. Un’altra è cercare **dopo** il ritardo più vistoso fra moltissimi numeri, ruote e periodi.

Nel secondo caso abbiamo avuto molte occasioni di trovare un’attesa estrema, quindi trovarne una non è sorprendente. È come cercare la persona più alta in una grande folla: ce ne sarà sempre una molto alta. Le attese possono essere dipendenti fra loro, ma rimane essenziale dichiarare *quante possibilità abbiamo esaminato* prima di giudicare sorprendente un risultato.

!!! note "Da portare con sé"
    Il modello Geometrico descrive prove nuove, indipendenti, con la stessa $p$. L’assenza di memoria deriva direttamente da queste ipotesi. Un passato di fallimenti non crea un credito da riscuotere: l’urna non sa nulla.

### 7. Laboratorio: osservare molte attese {: #lab-geometrica }

**Dove siamo.** Finora abbiamo ragionato con le formule. Ora facciamo una verifica empirica: simuliamo molte attese e controlliamo che le frequenze si avvicinino ai valori che abbiamo calcolato.

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

**Dove siamo.** Applichiamo la Geometrica a un problema ingegneristico concreto: un client che riprova una richiesta finché non riesce.

Supponiamo che ogni tentativo riesca con probabilità $p=0{,}2$, indipendentemente dagli altri. Il numero $X$ di tentativi fino al primo successo è Geometrico e ha media 5.

#### Dal numero di tentativi al tempo

Se **ogni tentativo dura esattamente 0,3 secondi**, il tempo totale è $T=0{,}3X$. Per linearità:

$$
\mathbb{E}[T]=0{,}3\,\mathbb{E}[X]=0{,}3\cdot5=1{,}5\text{ secondi}.
$$

L’ipotesi sulla durata conta. Se inseriamo pause crescenti, oppure se i tentativi riusciti e quelli falliti hanno durate diverse, il tempo totale deve includere quelle durate e il conto cambia.

#### Un limite ai tentativi: la media non basta

La media dice quanto aspettiamo *in media*, ma non basta per scegliere un limite ai tentativi. Se vogliamo una probabilità di successo **almeno del 99% entro $r$ tentativi**, traduciamo la richiesta in una disuguaglianza sulla funzione cumulativa che conosciamo:

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

#### Che cosa fa davvero un client con un limite

Un client che si ferma dopo $r$ prove non esegue più il numero illimitato $X$: esegue $\min(X,r)$ prove e può terminare senza successo. La Geometrica ci aiuta comunque, perché la probabilità di esaurire il budget è proprio la coda $P(X>r)=0{,}8^r$.

#### Quando l’ipotesi di indipendenza fallisce

Controlliamo infine l’ipotesi più delicata. Durante un guasto persistente, sapere che un tentativo è fallito può rendere più probabile un altro fallimento. In quel caso le prove non sono indipendenti, e il modello Geometrico non descrive più la situazione.

Le pause crescenti fra retry, chiamate *exponential backoff*, possono essere utili nella gestione dei guasti. La loro presenza non garantisce però da sola che i tentativi diventino Geometrici: è una scelta di progetto, non una proprietà probabilistica.

!!! note "Che cosa abbiamo ottenuto"
    La Geometrica ci permette di rispondere a due domande diverse: quanto aspettiamo *in media* ($1/p$) e quale limite ai tentativi garantisce una probabilità di successo fissata (dalla coda). La seconda è quasi sempre quella utile per un progetto.

## Atto III — I calci di cavallo dell’esercito prussiano {: #bortkiewicz }

### 9. Prima del modello: che cosa misura la tabella? {: #dati-bortkiewicz }

**Dove siamo.** Cambiamo scenario. Con la Geometrica contavamo prove fino a un successo. Ora vogliamo descrivere un altro tipo di grandezza: il **numero di eventi** che capitano in un intervallo. Cominciamo, come nella buona statistica, guardando i dati *prima* di avere un modello.

#### Una formula che aspettava i dati

Questa storia comincia sessant’anni prima dei dati, e lontano dalle caserme: in un tribunale.

Nel 1837 il matematico francese **Siméon-Denis Poisson** pubblicò un libro dal titolo lungo: *Recherches sur la probabilité des jugements en matière criminelle et en matière civile*, cioè «Ricerche sulla probabilità dei giudizi in materia penale e civile». La domanda che lo muoveva era concreta: quanto è probabile che una giuria sbagli, condannando un innocente o assolvendo un colpevole?

Dentro il libro, in poche pagine, Poisson studia un caso particolare della Binomiale: **moltissime prove, ciascuna con una probabilità di successo piccolissima**. In questo caso il conto esatto della Binomiale è scomodo, e Poisson ne ricava una formula più semplice, che dipende da un solo numero: la media $np$. È la formula che oggi porta il suo nome. Nel libro, però, resta un risultato di calcolo, un passaggio tecnico: non viene confrontata con conteggi osservati. Come accade spesso nella storia della scienza, l’idea non era del tutto nuova: Abraham de Moivre aveva ottenuto un’approssimazione simile già nel 1711.

Poisson è ricordato anche per un nome. Negli stessi anni chiamò **legge dei grandi numeri** un’idea che studieremo nella Settimana 8: se ripetiamo una prova moltissime volte, la frequenza di un evento si stabilizza vicino alla sua probabilità. Ne abbiamo già visto un esempio nell’[Atto II](#fallacia-giocatore): su moltissime estrazioni la frequenza del 53 si avvicina a $1/18$, senza che l’urna «recuperi» nulla.

Sessantuno anni dopo, nel 1898, l’economista e statistico Ladislaus von Bortkiewicz pubblicò *Das Gesetz der kleinen Zahlen*, «La legge dei piccoli numeri». Il titolo richiama la legge di Poisson. I «grandi numeri» sono le moltissime ripetizioni che rendono stabili le frequenze. I «piccoli numeri» sono i conteggi piccoli degli eventi rari: zero, uno, due incidenti in un anno. Anche questi conteggi, raccolti su molte unità, mostrano una regolarità, e nel libro Bortkiewicz li confronta proprio con la formula di Poisson.

Il quarto esempio del libro riguarda i militari dell’esercito prussiano morti per il calcio di un cavallo. È un caso particolarmente istruttivo, perché ci permette di confrontare una distribuzione teorica con dati registrati molto prima del nostro calcolo.

Seguiremo la stessa strada, ma in un ordine diverso da quello della storia. Prima guardiamo i dati, senza formule (§9 e §10). Poi costruiamo noi la formula di Poisson, un passo alla volta ([Atto IV](#poisson)). Infine la mettiamo alla prova sulla tabella di Bortkiewicz ([§14](#confronto-dati)), come fece lui.

#### Che cosa è stato osservato

Il libro considera 20 anni, dal 1875 al 1894, e 14 corpi d’armata. Qui usiamo la tabella relativa ai **10 corpi comparabili** del confronto principale. Il punto metodologico è scegliere unità con esposizioni al rischio abbastanza simili: mescolare unità molto diverse (per esempio un corpo con molti più cavalli degli altri) può cambiare la dispersione dei conteggi.

L’unità osservata è un **corpo-anno**: un corpo d’armata seguito per un anno. Le osservazioni sono quindi $10\cdot20=200$. Per ciascuna registriamo un conteggio, cioè il numero di morti di quel corpo in quell’anno:

| Morti in un corpo-anno | 0 | 1 | 2 | 3 | 4 | 5 o più |
|---|---|---|---|---|---|---|
| Numero di corpi-anno | 109 | 65 | 22 | 3 | 1 | 0 |

#### Come leggere la tabella

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

#### La media osservata

Dividendo il totale dei morti per il numero di osservazioni otteniamo la media:

$$
\overline{x}=\frac{122}{200}=0{,}61\text{ morti per corpo-anno}.
$$

Il simbolo $\overline{x}$ indica una **media dei dati**, da non confondere con la media teorica $\mathbb{E}[X]$ di una distribuzione: la prima si calcola da un campione osservato, la seconda da una PMF. Più avanti useremo la media dei dati per scegliere il parametro del modello.

Nessun corpo-anno ha avuto 0,61 morti: ogni dato è un intero. La media riassume le 200 osservazioni ed è un numero di sintesi, non un risultato possibile.

### 10. Possiamo prevedere la forma del conteggio? {: #legge-piccoli-numeri }

**Dove siamo.** Abbiamo una tabella e una media. Ora vogliamo capire se un modello semplice sia in grado di *produrre* quella tabella.

La domanda è questa: **esiste un modello che, usando soltanto la media 0,61, produca probabilità credibili per zero, uno, due e più morti?**

#### Pensare per occasioni

Pensiamo alle *occasioni* di incidente: molte persone, molti giorni, molti contatti con i cavalli. Ogni singola occasione ha una probabilità piccolissima di produrre l’evento contato, ma le occasioni sono moltissime. È proprio la situazione in cui la Binomiale ci dà un primo schema: tante prove, ciascuna con probabilità $p$ molto piccola.

Qui però incontriamo un ostacolo pratico. Non conosciamo un numero preciso di prove $n$, né una probabilità $p$ per occasione. Una giornata potrebbe contenere un numero diverso di contatti con i cavalli. Il dato disponibile suggerisce piuttosto il valore del prodotto $np$, cioè il **numero medio di eventi** nell’unità osservata, che qui è 0,61.

#### L’idea della Poisson

La Poisson nasce da un’idealizzazione: lasciamo crescere il numero di occasioni, facciamo diminuire la probabilità di ciascuna, e **teniamo fissata la media totale**. Nel limite non ci serve più sapere né $n$ né $p$: ci basta la media. Questo è il motivo per cui la Poisson è così utile nella pratica.

Una precisazione prima di partire. Non basta che un evento sia raro perché valga il modello. Dovremo anche formulare ipotesi sull’**indipendenza** delle occasioni e sull’**uniformità** dell’esposizione. Le richiameremo con cura.

#### Una previsione da annotare

Prima di costruire la formula, torna alla media 0,61. Essa è inferiore a 1: ti aspetti molti corpi-anno senza morti? Quale frazione dei 200 prevedi con zero morti: circa la metà, oppure quasi tutti? Annota la tua stima, la confronteremo con il conto del §12.

## Atto IV — Costruire la distribuzione di Poisson {: #poisson }

### 11. Dividere l’intervallo in pezzetti {: #pezzetti }

**Dove siamo.** Costruiamo il modello con un trucco semplice: tagliamo l’intervallo in tanti pezzetti, così piccoli che in ciascuno al massimo un evento può capitare. Il conteggio complessivo diventa allora una Binomiale, che sappiamo trattare.

#### La scelta dei simboli

Fissiamo un corpo e un anno. Chiamiamo $\lambda$, «lambda», il **numero medio di eventi nell’intero intervallo**. Per il modello dei dati scegliamo $\lambda=0{,}61$. Mettiamo in rilievo ciò che $\lambda$ rappresenta: è una *media* riferita all’intervallo scelto (qui un anno), e non una probabilità.

#### Il caso più semplice: un solo pezzetto

Partiamo dal caso estremo, in cui non dividiamo affatto l’anno: lo consideriamo un unico pezzetto. In un solo pezzetto possiamo avere al più un evento, quindi il conteggio vale 0 oppure 1, ed è una Bernoulli. La media di una Bernoulli è la sua probabilità, e deve valere $\lambda$: dunque $p=\lambda=0{,}61$. La probabilità di zero eventi è $1-0{,}61=0{,}39$.

Il modello è però rozzo: nella realtà un anno può contenere due o tre morti, e questo modello non può dar loro un posto. Miglioriamolo dividendo l’anno in due metà.

#### Dividere in $n$ pezzetti

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
<text x="280" y="160" text-anchor="middle" fill="currentColor">Totale degli eventi: Binomiale(n, λ/n), con media n·(λ/n) = λ per ogni n.</text>
<text x="280" y="187" text-anchor="middle" fill="#e07a1f" font-weight="bold">In questo corpo-anno: 2 eventi</text>
</svg>
<figcaption>Più pezzetti significa pezzetti più corti, ciascuno con un evento ancora più raro; la media totale resta la stessa.</figcaption>
</figure>

#### Il conteggio come Binomiale

Assumiamo che i pezzetti abbiano la stessa probabilità di evento e siano indipendenti. Il conteggio del modello a $n$ pezzetti, che chiamiamo $X_n$, è allora una Binomiale:

$$
X_n\sim\operatorname{Binomiale}\left(n,\frac{\lambda}{n}\right),
\qquad n>\lambda.
$$

La condizione $n>\lambda$ assicura che $\lambda/n<1$, cioè che $\lambda/n$ sia davvero una probabilità. Con $\lambda=0{,}61$ basta già $n=1$.

#### Un modello approssimato, con una condizione sul fenomeno

È importante ricordare che si tratta di un **modello approssimato**: nella realtà un intervallo finito può contenere più eventi nello stesso pezzetto. L’idea è di rendere i pezzetti sempre più corti, così che la probabilità di eventi multipli nello stesso pezzetto diventi trascurabile nel conteggio complessivo.

Questo funziona soltanto sotto un’ipotesi sul fenomeno: gli eventi non devono arrivare in **gruppi simultanei** che restano indivisibili, per quanto accorciamo il pezzetto. Dividere il tempo, da solo, non crea indipendenza né elimina le raffiche. Stiamo costruendo un modello per eventi che:

- arrivano **singolarmente**;
- con un **tasso stabile**;
- e con **conteggi indipendenti** in intervalli che non si sovrappongono.

Teniamo a mente questa lista: ci tornerà utile quando discuteremo i limiti del modello.

### 12. Zero eventi: il primo limite {: #numero-e }

**Dove siamo.** Il caso più semplice del conteggio è «nessun evento». Calcolarlo ci mostra come nasce la funzione esponenziale.

Nel modello a pezzetti, avere zero eventi significa che tutti gli $n$ pezzetti sono vuoti. La probabilità di un pezzetto vuoto è $1-\lambda/n$; per indipendenza moltiplichiamo $n$ volte lo stesso fattore:

$$
P(X_n=0)=\left(1-\frac{\lambda}{n}\right)^n.
$$

#### Guardare i numeri

Con $\lambda=0{,}61$ calcoliamo questa probabilità per suddivisioni sempre più fini.

!!! example "Sosta di verifica"
    Un corpo-anno è diviso in $n$ pezzetti; in ciascuno capita un morto con probabilità $0{,}61/n$, indipendentemente dagli altri. Con la calcolatrice, trova la probabilità di nessun morto per $n=1$, 2, 10, 100 e 365. Che cosa succede ai valori quando $n$ cresce?

    ??? esempio-svolto "Risposta"
        Si calcola $\left(1-0{,}61/n\right)^n$ per ciascun $n$; per confronto aggiungiamo anche $n=1000$:

        | Pezzetti $n$ | 1 | 2 | 10 | 100 | 365 | 1000 |
        |---|---|---|---|---|---|---|
        | Probabilità di zero eventi | 0,3900 | 0,4830 | 0,5329 | 0,5423 | 0,5431 | 0,5432 |

        Per esempio, con $n=2$: $(1-0{,}305)^2=0{,}695^2\approx0{,}4830$. Un errore comune è calcolare $(1-0{,}61)^n$: così ogni pezzetto avrebbe probabilità 0,61, e il numero medio di morti crescerebbe con $n$ invece di restare 0,61.

Il primo valore della tabella è quello che avevamo trovato prima, con un solo pezzetto: $1-0{,}61=0{,}39$. Poi i valori crescono sempre più lentamente e **sembrano stabilizzarsi** attorno a 0,543. Questo è il comportamento che ci interessa spiegare.

#### Perché non possiamo dire «tende a 1»

Nella riga cambiano *due cose insieme*: il numero di fattori $n$ aumenta, e ciascun fattore $1-\lambda/n$ si avvicina a 1. Se guardiamo soltanto la base potremmo essere tentati di dire che il risultato sia 1, perché $1^n=1$. Ma la base non è esattamente 1: è un po’ più piccola, e questo scarto viene elevato a una potenza sempre più grande.

Le due variazioni si bilanciano e producono un limite diverso da 1. Un modo per intuire quale sia: per $x$ piccolo vale $\ln(1-x)\approx-x$, quindi

$$
\ln\left(1-\frac{\lambda}{n}\right)^n=n\ln\left(1-\frac{\lambda}{n}\right)\approx n\cdot\left(-\frac{\lambda}{n}\right)=-\lambda.
$$

Il logaritmo del risultato si avvicina a $-\lambda$, e il risultato stesso a $e^{-\lambda}$. Questo è un argomento di *intuizione*; il risultato preciso è un teorema dell’analisi:

$$
\boxed{\left(1-\frac{\lambda}{n}\right)^n\longrightarrow e^{-\lambda}.}
$$

La freccia significa che i valori si avvicinano al numero a destra quando $n$ cresce senza limite, mantenendo $\lambda$ fissato. Il numero $e\approx2{,}71828$ è la base dell’esponenziale naturale; un esponente negativo indica il reciproco, quindi $e^{-\lambda}=1/e^\lambda$.

Un chiarimento sul ruolo della tabella: qui usiamo questo risultato dell’analisi per capire il modello, ma non lo stiamo dimostrando attraverso i numeri. La tabella mostra, in un caso, il comportamento che il teorema garantisce in generale.

#### Il conto per il corpo-anno

Per il corpo-anno otteniamo:

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

**Dove siamo.** Sappiamo calcolare la probabilità di zero eventi. Estendiamo il ragionamento a un numero qualunque di eventi. Procediamo per gradi: zero, uno, e poi il caso generale.

#### Esattamente un evento

Nel modello binomiale dobbiamo scegliere *quale* dei $n$ pezzetti contiene l’unico evento. Ci sono $n$ scelte. Per ciascuna, la probabilità è quella di un evento nel pezzetto scelto e di zero eventi negli altri $n-1$:

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

#### Il caso generale

Per $k$ eventi scegliamo $k$ pezzetti pieni. Il numero delle scelte è $\binom nk$, mentre una configurazione fissata ha probabilità $(\lambda/n)^k(1-\lambda/n)^{n-k}$. Passando al limite per **$k$ fissato** e $n\to\infty$ si ottiene la distribuzione di **Poisson**:

$$
\boxed{P(X=k)=\frac{\lambda^k e^{-\lambda}}{k!},
\qquad k=0,1,2,\ldots,\quad\lambda>0.}
$$

Scriviamo $X\sim\operatorname{Poisson}(\lambda)$. Il conto completo del limite è nella [Lettura B](#derivazione-limite): qui impariamo a leggere e usare il risultato, che è ciò che serve all’esame.

#### I due simboli da non confondere

Nella formula compaiono due numeri che hanno ruoli molto diversi:

- $k$ è il **conteggio di cui chiediamo la probabilità**: quanti eventi vogliamo vedere;
- $\lambda$ è il **numero medio di eventi nell’intervallo fissato**: è il parametro del modello.

Non devono coincidere. Con $\lambda=0{,}61$ possiamo chiedere $P(X=3)$; con $\lambda=3$ possiamo chiedere $P(X=0)$. Prima di calcolare, chiediti sempre quale dei due numeri hai davanti.

#### I primi valori

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

#### Un confronto con la Binomiale

La Poisson ammette zero eventi e **non ha un massimo**: il modello attribuisce probabilità positiva a ogni intero non negativo. La Binomiale con $n$ prove, invece, non può superare $n$. La Poisson può approssimare bene la Binomiale nel regime di eventi rari, ma le due distribuzioni non sono identiche per un $n$ finito.

#### Calcolare un peso a partire dal precedente

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

**Lettura in parole.** Per passare da un peso al successivo si moltiplica per $\lambda/k$. Finché $k<\lambda$ questo fattore è maggiore di 1 e i pesi crescono; quando $k>\lambda$ il fattore è minore di 1 e i pesi decrescono. Il picco della distribuzione si trova quindi attorno a $\lambda$.

Con $\lambda=0{,}61$ partiamo da $P(X=0)\approx0{,}54335$. Per arrivare a $k=1$ moltiplichiamo per $0{,}61$; per arrivare a $k=2$ moltiplichiamo per $0{,}61/2$. Troviamo circa 0,33144 e 0,10109. Nei calcoli a più passaggi conviene conservare qualche cifra in più e arrotondare soltanto il risultato finale.

#### Perché i pesi sommano a 1

Perché la formula sia una PMF, i pesi devono essere non negativi e sommare a 1. La non negatività è evidente. Per la somma usiamo un’identità dell’esponenziale, che qui accettiamo come risultato dell’analisi:

$$
e^\lambda=1+\lambda+\frac{\lambda^2}{2!}+\frac{\lambda^3}{3!}+\cdots.
$$

Ogni peso della Poisson contiene il fattore comune $e^{-\lambda}$, che possiamo portare fuori dalla somma:

$$
\sum_{k=0}^{\infty}P(X=k)
=e^{-\lambda}\sum_{k=0}^{\infty}\frac{\lambda^k}{k!}
=e^{-\lambda}e^\lambda=1.
$$

La formula assegna così tutto il peso ai conteggi possibili: è davvero una PMF.

!!! note "Che cosa abbiamo ottenuto"
    Dividendo l’intervallo in pezzetti e lasciandoli diventare infiniti, con media totale $\lambda$ fissata, la Binomiale si trasforma nella Poisson. La sua PMF è $\lambda^ke^{-\lambda}/k!$ e può essere calcolata un peso alla volta con la ricorrenza $\lambda/k$.

### 14. Tornare ai dati: probabilità e frequenze attese {: #confronto-dati }

**Dove siamo.** Abbiamo un modello e abbiamo i dati. Mettiamoli a confronto.

#### Dalla probabilità al numero di unità

La distribuzione di un **singolo** corpo-anno fornisce la probabilità $P(X=k)$. La tabella storica conta invece **quanti dei 200 corpi-anno** presentano quel valore. Per passare da una probabilità a un numero atteso di unità, moltiplichiamo per 200:

$$
\text{numero atteso di corpi-anno con }k\text{ morti}=200\cdot P(X=k).
$$

Possiamo giustificare questa regola con le indicatrici, che conosciamo bene. Per ogni corpo-anno $i$, poniamo $J_i=1$ se il conteggio è $k$ e $J_i=0$ altrimenti. Il numero di unità nella colonna è la somma $J_1+\cdots+J_{200}$. Se tutte le unità hanno la stessa distribuzione, ogni indicatrice ha media $P(X=k)$; per linearità la media della somma è $200P(X=k)$. Ricordiamo che per questa media **non occorre indipendenza fra le 200 indicatrici**: la linearità vale comunque.

#### La tabella di confronto

Con $\lambda=0{,}61$ calcoliamo i numeri attesi e affianchiamoli ai dati:

| Morti nel corpo-anno $k$ | 0 | 1 | 2 | 3 | 4 | 5 o più |
|---|---|---|---|---|---|---|
| Corpi-anno osservati | 109 | 65 | 22 | 3 | 1 | 0 |
| Corpi-anno attesi con Poisson$(0{,}61)$ | 108,7 | 66,3 | 20,2 | 4,1 | 0,6 | 0,1 |

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
<rect x="400" y="18" width="14" height="14" fill="#e07a1f"/><text x="420" y="30" fill="currentColor">attesi (Poisson)</text>
</svg>
<figcaption>Dati di Bortkiewicz (1898) e previsione Poisson con λ = 0,61: ogni coppia di barre quasi coincide.</figcaption>
</figure>

Questa è la tabella di confronto pubblicata da Bortkiewicz a pagina 25. La formula che Poisson aveva lasciato come risultato di calcolo nel 1837 incontra qui, sessantuno anni dopo, dei dati reali. Il risultato è notevole: **un solo parametro**, ricavato da una sola media, produce una forma vicina a quella osservata.

#### Come interpretare le differenze

Alcune osservazioni per leggere bene il confronto.

- Il numero atteso 4,1 non significa che un campione debba contenere una frazione di corpo-anno. Una frequenza osservata è sempre intera; la sua media teorica può non esserlo, come il valore atteso di un dado vale 3,5.
- Anche con un modello perfettamente corretto, campioni diversi produrrebbero tabelle diverse. Piccole differenze come 22 contro 20,2 sono del tutto normali.
- Abbiamo **stimato** $\lambda$ usando la stessa tabella: l’accordo sulla media è quindi *costruito* nella scelta del parametro. Ciò che stiamo davvero confrontando è la **forma restante** della distribuzione, e non una previsione indipendente della media.

Una tabella vicina sostiene l’utilità del modello; non dimostra tutte le sue ipotesi.

### 15. Media e varianza della Poisson {: #media-varianza-poisson }

**Dove siamo.** Conosciamo la PMF. Ora vogliamo riassumere la distribuzione con i due numeri che abbiamo imparato a usare: il centro e la dispersione.

Per $X\sim\operatorname{Poisson}(\lambda)$ valgono due proprietà molto semplici:

$$
\boxed{\mathbb{E}[X]=\lambda,
\qquad\operatorname{Var}(X)=\lambda.}
$$

Sono proprietà esatte della **distribuzione teorica**. Con $\lambda=2$, per esempio, la media del conteggio è 2, la varianza è 2 e la deviazione standard è $\sqrt2\approx1{,}414$.

#### Che cosa significa che media e varianza coincidono

L’uguaglianza fra media e varianza riguarda i loro *valori numerici*, e non il loro significato. Le interpretazioni restano diverse: la media descrive il centro, la varianza è una media di scarti al quadrato. La deviazione standard, che ha le stesse unità del conteggio, è $\sqrt\lambda$.

Questa coincidenza è una peculiarità della Poisson. Nella Binomiale, per confronto, la varianza è $np(1-p)$, che è più piccola della media $np$; la Poisson si ottiene quando $p$ è così piccolo che il fattore $1-p$ è praticamente 1. È un'altra faccia del limite dei pezzetti.

#### Perché la media è $\lambda$

Per la media abbiamo già due buone ragioni. La prima: nel modello binomiale a pezzetti la media vale $\lambda$ per ogni $n$, e questo motiva il risultato. Però non è una dimostrazione sufficiente: in generale non possiamo trasferire una media al limite soltanto perché convergono le probabilità dei singoli valori.

La seconda ragione è un calcolo diretto, che usa la ricorrenza del §13. Moltiplicando per $k$ entrambi i membri di $P(X=k)=P(X=k-1)\,\lambda/k$ otteniamo, per $k\ge1$,

$$
k\,P(X=k)=\lambda\,P(X=k-1).
$$

Sommiamo su tutti i $k\ge1$. A sinistra compare la media (il termine $k=0$ vale zero); a destra, spostando l’indice di una posizione, compare $\lambda$ per la somma di *tutti* i pesi, che è 1:

$$
\mathbb{E}[X]=\sum_{k=1}^{\infty}k\,P(X=k)
=\lambda\sum_{k=1}^{\infty}P(X=k-1)=\lambda\cdot1=\lambda.
$$

Per la varianza il calcolo è un poco più lungo, e lo facciamo con cura nella [Lettura B](#media-varianza-diretta). Le dimostrazioni sono facoltative; **proprietà e significato sono richiesti all’esame**.

### Controllare la dispersione dei dati

Per i 200 dati di Bortkiewicz conosciamo già $\overline{x}=0{,}61$. Se la Poisson è un buon modello, anche la varianza dei dati dovrebbe essere vicina a 0,61. Verifichiamolo calcolando la varianza descrittiva: applichiamo la definizione, con la stessa procedura in quattro passaggi della sezione sulla varianza, ma con le frequenze al posto delle probabilità.

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

Stiamo descrivendo *questi* 200 valori, perciò usiamo il divisore **200**. Il divisore 199 che potresti incontrare in statistica serve a un diverso scopo di stima, che qui non stiamo affrontando.

#### Come leggere il risultato, con prudenza

La varianza osservata 0,6079 è vicina alla media osservata 0,61: il confronto è coerente con una Poisson. Attenzione però al *verso* del ragionamento.

- Per una Poisson, media e varianza coincidono.
- Ma **una distribuzione con media e varianza uguali non è necessariamente Poisson**. Ne vedrai un controesempio nell’esercizio 6.
- Inoltre, un campione finito non deve riprodurre esattamente l’uguaglianza teorica.

È un controllo utile, non una certificazione del modello.

#### Dispersione assoluta e relativa

Infine, distinguiamo la dispersione assoluta da quella relativa alla media. Con $\lambda=100$, la deviazione standard è 10; con $\lambda=1$, è 1. L’oscillazione assoluta è maggiore nel primo caso, ma il suo rapporto con la media è minore:

$$
\frac{\sqrt\lambda}{\lambda}=\frac1{\sqrt\lambda}.
$$

Una fluttuazione sulla scala di 10 eventi pesa meno rispetto a 100 di quanto una fluttuazione sulla scala di 1 pesi rispetto a 1. Più il conteggio medio è alto, più la distribuzione è «stretta» in proporzione. Questa scala, però, è soltanto un ordine di grandezza e non un limite garantito alle oscillazioni.

#### Esplora: centro, dispersione e probabilità dello zero {: #widget-poisson }

Il riferimento è Poisson$(0{,}61)$. Aumenta $\lambda$ e osserva come la massa si sposta a destra e si allarga. La probabilità di zero eventi diminuisce. Prima di usare il cursore, prova a confrontare $e^{-1}$, $e^{-2}$ ed $e^{-3}$: in quale di questi casi la probabilità di zero scende sotto il 5%?

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
    xDomain: [0, 15], liveLabel: 'Poisson corrente', fn: massa,
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

**Dove siamo.** Rifacciamo con il computer tutto ciò che abbiamo fatto a mano nei §9–15, per verificare i numeri e per poter variare i dati.

Il codice parte dalle frequenze osservate, calcola la media e la usa come parametro della Poisson. Poi ricostruisce i numeri attesi e calcola la varianza con **gli scarti al quadrato**, come abbiamo fatto nella tabella. Leggi i commenti del codice mentre procedi: seguono gli stessi passaggi della dispensa.

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
        label="Attesi con Poisson(0,61)")
plt.xticks(k)
plt.xlabel("Morti in un corpo-anno")
plt.ylabel("Numero di corpi-anno")
plt.legend()
plt.tight_layout()
plt.show()
```
</div>

Il grafico confronta le colonne da 0 a 4. La Poisson assegna anche un piccolo peso a «5 o più»: quelle barre non sono disegnate. L’assenza di valori oltre 4 nel campione non rende impossibili quei conteggi nel modello.

#### Un’esplorazione facoltativa

Dopo aver ritrovato media 0,61 e varianza 0,608, puoi fare un secondo esperimento. Sostituisci la tabella con quella dei 14 corpi: `{0: 144, 1: 91, 2: 32, 3: 11, 4: 2}`. Aggiorna o togli l’`assert`, che verifica i totali del primo insieme, e aggiorna l’etichetta del grafico. Troverai 280 corpi-anno, media 0,70 e varianza circa 0,760.

La maggiore dispersione è compatibile con unità meno omogenee; questo confronto, da solo, non stabilisce la causa della differenza. È un buon esempio di come un controllo sulla varianza possa segnalare che qualcosa nel modello va riesaminato.

### 17. Tasso e parametro: fissare le unità {: #tasso }

**Dove siamo.** Finora l’intervallo era sempre «un corpo-anno». Nelle applicazioni gli intervalli cambiano: un secondo, un minuto, una pagina. Serve una regola per convertire il parametro.

#### Tasso e parametro non sono la stessa cosa

Un **tasso** indica quanti eventi arrivano in media *per unità di tempo*. Il **parametro** della Poisson indica invece quanti eventi attendiamo *nell’intervallo scelto*. Per evitare confusione chiamiamo il tasso $r$ e la durata $t$:

$$
\boxed{\lambda=rt.}
$$

Se $r$ è in richieste al secondo, $t$ deve essere in secondi. Le unità di tempo si semplificano e otteniamo il numero medio di richieste nell’intervallo, che non ha dimensioni di tempo: è un conteggio.

#### Un esempio con quattro durate

Supponiamo un flusso con tasso costante $r=3$ richieste al secondo e con le ipotesi del modello di Poisson valide su tutti gli intervalli considerati.

| Durata $t$ | Media nell’intervallo $\lambda=rt$ | Distribuzione del conteggio |
|---|---|---|
| Mezzo secondo | $3\cdot0{,}5=1{,}5$ | Poisson$(1{,}5)$ |
| Un secondo | $3\cdot1=3$ | Poisson$(3)$ |
| Dieci secondi | $3\cdot10=30$ | Poisson$(30)$ |
| Un minuto | $3\cdot60=180$ | Poisson$(180)$ |

Per zero richieste, in mezzo secondo la probabilità è $e^{-1{,}5}\approx0{,}2231$; in un secondo è $e^{-3}\approx0{,}0498$. Un intervallo più lungo offre più occasioni di arrivo, quindi è meno probabile che resti vuoto.

#### Un’ipotesi che spesso dimentichiamo

Conoscere soltanto la distribuzione del conteggio in un secondo **non basta** a dedurre quella in ogni altra durata. Stiamo assumendo un unico modello di arrivi, con tasso stabile e incrementi indipendenti. È questa ipotesi sul flusso a giustificare la conversione del modello, oltre alla semplice conversione della media.

#### Intervalli di tempo e di spazio

L’intervallo non deve per forza essere temporale. Può essere spaziale: refusi per pagina, difetti per metro di cavo, errori per megabyte. Il ragionamento è identico, con le unità appropriate. Prima di inserire $\lambda$ nella formula, scrivi sempre **a quale unità di osservazione si riferisce**. È la domanda che previene più errori in questo capitolo.

## Atto V — Usare i modelli nei sistemi {: #informatica }

### 18. Richieste a un server: calcolare un picco {: #richieste }

**Dove siamo.** Mettiamo la Poisson al servizio di un problema di capacità: con quale frequenza un server riceve più richieste di quante ne può gestire in un secondo?

#### Il modello

Immaginiamo 10.000 utenti. In un secondo ciascuno può inviare una richiesta con probabilità $0{,}0003$, indipendentemente dagli altri. In questo modello il conteggio è esattamente Binomiale e la sua media è:

$$
10000\cdot0{,}0003=3.
$$

Siamo nel regime che conosciamo: molte prove, probabilità piccola, media moderata. La Poisson$(3)$ offre dunque un’approssimazione utile. Un traffico reale deve comunque essere controllato rispetto alle ipotesi: un gran numero di utenti, da solo, non le garantisce.

#### Il calcolo

Chiediamo la probabilità di **più di cinque richieste in un secondo**. L’evento è $X>5$, cioè $X\ge6$. Conviene usare il complementare, perché l’evento originale ha infiniti valori mentre il complementare ne ha soltanto sei:

$$
\begin{aligned}
P(X>5)
&=1-P(X\le5)\\
&=1-\sum_{k=0}^{5}\frac{3^ke^{-3}}{k!}\\
&=1-e^{-3}\left(1+3+\frac92+\frac{27}6+\frac{81}{24}+\frac{243}{120}\right)\\
&\approx0{,}0839.
\end{aligned}
$$

Controlliamo la somma tra parentesi: $1+3+4{,}5+4{,}5+3{,}375+2{,}025=18{,}4$. Moltiplicata per $e^{-3}\approx0{,}0498$ dà circa $0{,}916$, e il complementare è $0{,}084$.

#### Come interpretare il risultato

Nel modello, circa l’8,4% degli intervalli di un secondo supera cinque arrivi. Se una regola di capacità accetta al massimo cinque arrivi per intervallo, questa è la probabilità di superare quella soglia.

Attenzione a non chiedere al conteggio più di quanto può dire. Il comportamento effettivo di un server dipende anche dai tempi di servizio, dalle code e da come gli arrivi si distribuiscono dentro il secondo. Il solo conteggio non descrive tutta la prestazione.

### 19. Quando il modello perde credibilità {: #sovradispersione }

**Dove siamo.** Un modello è utile quando sappiamo anche dire *quando non funziona*. Ripassiamo le ipotesi e vediamo come si violano nei sistemi reali.

Per costruire la Poisson abbiamo richiesto eventi singoli, un tasso stabile e indipendenza dei conteggi in intervalli disgiunti. Nei sistemi possiamo incontrare:

- **attività a raffiche**, con molti client influenzati dallo stesso evento;
- **tassi variabili**, per esempio differenze fra notte e giorno;
- **effetti a catena**, nei quali una richiesta fallita genera altri tentativi;
- **cause comuni**, come un problema elettrico che guasta più componenti insieme.

Questi meccanismi possono produrre conteggi **più dispersi** di una Poisson con la stessa media. Si parla di **sovradispersione** quando la varianza supera la media. Nei dati, una differenza consistente fra varianza e media invita a cercare eterogeneità, dipendenza o altri aspetti mancanti nel modello.

#### Un tasso variabile non esclude la Poisson

Un tasso variabile non esclude ogni possibile uso della Poisson. Intervalli omogenei possono avere ciascuno un modello adatto, ma con parametri diversi: per esempio una Poisson di media 1 di notte e una di media 5 di giorno. Mescolare quei conteggi e attribuire a tutti un unico parametro può invece nascondere proprio la variabilità che ci interessa.

#### Usare il confronto con prudenza

Il confronto tra media e varianza va interpretato con misura:

- piccole differenze sono normali nei campioni finiti;
- una differenza grande richiede un’indagine;
- un’uguaglianza non basta a identificare la distribuzione.

Esistono anche conteggi **meno** dispersi della Poisson, per esempio quando gli eventi si ostacolano o vengono regolati.

### 20. Laboratorio: traffico regolare e traffico a raffiche {: #lab-richieste }

**Dove siamo.** Vediamo la sovradispersione con i nostri occhi, costruendo noi stessi un traffico a raffiche.

Simuliamo 20.000 secondi nel modello dei 10.000 utenti. Con `raffica = False`, ogni secondo ha la stessa probabilità di invio per utente. Prima di eseguire, prevedi la media e chiediti se la varianza sarà vicina a quella di Poisson$(3)$.

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
# Ogni secondo: quanti dei 10000 client inviano (una Binomiale).
richieste = rng.binomial(utenti, p_secondo)

media = richieste.mean()
print(f"Media di base n * p: {lam:.1f}")
media_teorica = lam * (1.4 if raffica else 1)
print(f"Media teorica del modello scelto: {media_teorica:.1f}")
print(f"Media osservata: {media:.3f}")
print(f"Varianza osservata: {richieste.var():.3f}")
# Confronto con la Poisson che ha la stessa media dei dati.
print(" k  frequenza  Poisson")
for k in range(9):
    freq = np.mean(richieste == k)
    teoria = exp(-media) * media ** k / factorial(k)
    print(f"{k:2d}  {freq:9.4f}  {teoria:7.4f}")
```
</div>

La simulazione genera conteggi binomiali; il confronto Poisson è una previsione approssimata. Con `raffica = False`, media e varianza sono vicine a 3 e le frequenze sono vicine ai pesi teorici, con le oscillazioni che ci aspettiamo da un campionamento.

#### Il traffico a raffiche

Ora imposta `raffica = True`. Nel 10% dei secondi la probabilità di invio di **tutti** gli utenti diventa cinque volte maggiore. Un secondo tranquillo ha media 3; un secondo attivo ha media 15. Prima di guardare l’output, calcola a mano la nuova media pesando i due tipi di secondo:

$$
0{,}9\cdot3+0{,}1\cdot15=4{,}2.
$$

Poi prevedi la varianza. Sarà vicina a 17, molto maggiore di 4,2. Il programma confronta i pesi osservati con una Poisson che usa la **nuova media osservata**, quindi la differenza non nasce dall’aver dimenticato di aggiornare $\lambda$. Nasce dalla *mescolanza* di secondi con attività diverse.

#### Dove si perde l’indipendenza

Un ultimo punto, sottile ma importante. Condizionatamente al tipo di secondo, gli utenti restano indipendenti nel codice. Ma se non conosciamo quel tipo, l’attività comune li collega: osservare molte richieste da un gruppo di utenti è un indizio che anche gli altri siano nel regime attivo. Il modello che tratta ogni secondo come identico agli altri perde questa informazione, e per questo sottostima le code.

### 21. Geometrica, Binomiale o Poisson? {: #geometrica-o-poisson }

**Dove siamo.** Abbiamo incontrato tre distribuzioni. L’abilità più importante, a questo punto, è scegliere quella giusta davanti a un problema nuovo.

Prima di scegliere una formula, completa la frase **«La variabile conta…»**. Poi dichiara ciò che tieni fissato e quali ipotesi fai. La tabella confronta le tre distribuzioni su queste domande:

| | Geometrica$(p)$ | Binomiale$(n,p)$ | Poisson$(\lambda)$ |
|---|---|---|---|
| Domanda | Quante prove fino al primo successo? | Quanti successi in $n$ prove? | Quanti eventi in un intervallo? |
| Che cosa è fissato | Probabilità per prova e traguardo del primo successo | Numero di prove e probabilità per prova | Intervallo e media del conteggio |
| Valori | $1,2,3,\ldots$ | $0,1,\ldots,n$ | $0,1,2,\ldots$ |
| PMF | $(1-p)^{k-1}p$ | $\binom nkp^k(1-p)^{n-k}$ | $\lambda^ke^{-\lambda}/k!$ |
| Media | $1/p$ | $np$ | $\lambda$ |
| Esempio | Tentativi fino alla prima risposta | Richieste riuscite fra 10 tentativi | Arrivi in un secondo |

#### Due distinzioni da tenere ferme

La Geometrica conta un’attesa in **prove discrete**, non una durata continua in secondi. Possiamo tradurla in durata se conosciamo i tempi delle prove, come abbiamo fatto nel §8.

La Poisson conta eventi in una finestra: **non** è la distribuzione del tempo fino all’evento successivo. Quel tempo avrà un modello continuo proprio, che incontreremo più avanti.

#### Sosta finale del percorso principale

Per una richiesta che riesce con probabilità 0,9:

- il numero di tentativi fino al successo è **Geometrico**;
- il numero di successi in dieci tentativi indipendenti è **Binomiale**;
- il numero di richieste in arrivo in un secondo può essere **Poisson**, se il meccanismo degli arrivi lo giustifica.

Il fatto che tutti e tre gli esempi parlino di richieste non determina il modello: lo determinano *la domanda e le ipotesi*.

!!! example "Sosta di verifica"
    Per ciascuna situazione, completa la frase «La variabile conta…» e indica il modello: (a) i pacchetti persi in un minuto su un collegamento stabile; (b) il numero di lanci di un dado fino al primo 6; (c) i 6 ottenuti in 20 lanci di un dado.

    ??? esempio-svolto "Risposta"
        (a) Conta eventi in un intervallo, con tasso stabile: **Poisson**, con parametro uguale alla media dei pacchetti persi in un minuto.

        (b) Conta prove fino al primo successo, con $p=1/6$: **Geometrica$(1/6)$**, media 6.

        (c) Conta successi in un numero fissato di prove: **Binomiale$(20,1/6)$**, media $20/6\approx3{,}33$.

!!! note "Che cosa abbiamo ottenuto"
    Abbiamo imparato a riconoscere tre domande diverse sugli stessi eventi: *quanto aspetto?* (Geometrica), *quanti successi in $n$ prove?* (Binomiale), *quanti eventi in un intervallo?* (Poisson). La scelta del modello dipende da ciò che è fissato e da ciò che osserviamo, e non dalla parola «richieste».

## Lettura A — Il filtro di Bloom: quanto costa rispondere «forse»? {: #bloom }

*Approfondimento facoltativo, fuori dal nucleo d’esame orale.*

**Perché questa lettura.** È un esempio in cui lo stesso meccanismo della Poisson (molte occasioni, ciascuna con piccola probabilità) governa la progettazione di una struttura dati reale. Se leggi con calma, vedrai ricomparire il limite $(1-\lambda/n)^n\to e^{-\lambda}$.

### Il problema e l’idea

Supponi di mantenere una lista molto grande di indirizzi web. Prima di consultare una struttura costosa (un database, un disco lento), vorresti un controllo rapido che dica se un indirizzo *può* essere presente. Un **filtro di Bloom** scambia un po’ di precisione con un grande risparmio di memoria: risponde «sicuramente assente» oppure «forse presente».

### Come funziona

Il filtro usa $m$ bit, inizialmente tutti a 0, e $k$ funzioni hash. Ciascuna funzione associa un elemento a una posizione fra 0 e $m-1$.

- Per **inserire** un elemento, mettiamo a 1 i suoi $k$ bit.
- Per **interrogarlo**, guardiamo quei $k$ bit. Se anche uno solo è 0, rispondiamo «assente». Se sono tutti 1, rispondiamo «forse presente».

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

Guarda la figura con attenzione: *gatto* e *cane* accendono ciascuno due bit. L’elemento *topo*, mai inserito, ha per caso proprio i bit 2 e 9, già accesi dagli altri due. Il filtro risponde «forse», ma la risposta è sbagliata.

### Quali errori sono possibili

Nel filtro standard, senza cancellazioni, nessuno spegne un bit già acceso. Ne seguono due fatti:

- un elemento inserito trova sempre tutti i propri bit a 1: **non ci sono falsi negativi**;
- un elemento mai inserito può trovare i propri bit accesi da altri elementi: è un **falso positivo**.

La domanda quantitativa è dunque: *con che frequenza capita un falso positivo?* La risolviamo in due passi.

### Primo conto: un bit rimasto a zero

Supponiamo di inserire $n$ elementi distinti e modelliamo tutti i risultati hash come indipendenti e uniformi. Gli inserimenti producono $kn$ scelte di posizione. Fissiamo un bit: ogni scelta lo colpisce con probabilità $1/m$ e lo manca con probabilità $1-1/m$.

Per restare a zero, il bit deve essere mancato tutte le $kn$ volte. Per indipendenza moltiplichiamo:

$$
P(\text{bit a zero})=\left(1-\frac1m\right)^{kn}.
$$

Riconosci la struttura? È proprio la forma $(1-\lambda/N)^N$ del §12, con $N=kn$ occasioni. Il numero di colpi su quel bit è Binomiale con media $kn/m$. Quando l’approssimazione Poisson è adatta, la probabilità di zero colpi è circa $e^{-kn/m}$. Quindi:

$$
P(\text{bit a uno})=1-\left(1-\frac1m\right)^{kn}
\approx1-e^{-kn/m}.
$$

Ritroviamo il medesimo meccanismo della Poisson: molte occasioni, ciascuna con una piccola probabilità di colpire una posizione fissata.

### Secondo conto: tutti i bit dell’interrogazione a uno

Un falso positivo richiede che tutte le $k$ posizioni di un elemento assente risultino accese. Per moltiplicare le $k$ probabilità dobbiamo trattare questi stati come indipendenti. È **un’ulteriore approssimazione**: i bit condividono gli stessi inserimenti e le posizioni interrogate possono coincidere. Con questa approssimazione otteniamo:

$$
P(\text{falso positivo})\approx\left(1-e^{-kn/m}\right)^k.
$$

### Un esempio numerico

Con $n=100$ elementi, $m=1000$ bit e $k=7$ funzioni hash, procediamo per passi:

$$
\frac{kn}{m}=0{,}7,
\qquad
1-e^{-0{,}7}\approx0{,}5034,
\qquad
(0{,}5034)^7\approx0{,}0082.
$$

Il valore è circa lo 0,82% **fra le interrogazioni di elementi assenti**, nel modello. Fai attenzione a non leggerlo diversamente: non è la probabilità che un «forse presente» sia sbagliato. Per quella domanda servirebbe sapere anche quanto spesso interroghiamo elementi presenti e assenti.

### Il guadagno pratico

Il vettore occupa 1000 bit per 100 elementi, cioè 10 bit per elemento, oltre alla gestione delle funzioni hash. Dopo un «forse» consultiamo la struttura che conosce la risposta esatta. Il filtro serve a evitare molti controlli costosi, non a sostituire sempre quel controllo. Con una frequenza di falsi positivi dello 0,8%, circa 99 «assente» su 100 interrogazioni di elementi assenti vengono risolti subito, senza toccare il disco.

## Lettura B — Perché il limite e i momenti hanno proprio quella forma {: #derivazione-limite }

*Approfondimento facoltativo. Nel percorso d’esame sono richiesti l’idea dei pezzetti, il caso di zero eventi e le proprietà finali della Poisson.*

**Perché questa lettura.** Nel §13 abbiamo enunciato la PMF di Poisson «passando al limite». Qui facciamo quel passaggio per intero, un fattore alla volta, e poi calcoliamo media e varianza direttamente dalla PMF. Prendiamo il tempo di nominare ciascun pezzo.

### B.1. Il limite binomiale, un fattore alla volta

Fissiamo $\lambda>0$ e un intero $k\ge0$. Consideriamo $X_n\sim\operatorname{Binomiale}(n,\lambda/n)$ con $n>\lambda$ e $n\ge k$. Il punto essenziale, da non perdere di vista, è che **$n$ cresce, mentre $k$ e $\lambda$ restano fissi**.

La PMF binomiale è:

$$
P(X_n=k)=\binom nk\left(\frac\lambda n\right)^k
\left(1-\frac\lambda n\right)^{n-k}.
$$

#### Passo 1 — Aprire il coefficiente binomiale

Il coefficiente si scrive $\binom nk=\dfrac{n(n-1)\cdots(n-k+1)}{k!}$: al numeratore ci sono $k$ fattori. Anche $(\lambda/n)^k$ contiene $k$ copie di $n$ al denominatore. Possiamo quindi abbinare ciascun fattore del numeratore a una copia di $n$. Separiamo inoltre la potenza $n-k$ in due parti, $n$ e $-k$:

$$
P(X_n=k)=
\underbrace{\frac{n(n-1)\cdots(n-k+1)}{n^k}}_{A_n}
\cdot\frac{\lambda^k}{k!}
\cdot\underbrace{\left(1-\frac\lambda n\right)^n}_{B_n}
\cdot\underbrace{\left(1-\frac\lambda n\right)^{-k}}_{C_n}.
$$

Abbiamo spezzato un’espressione complicata in quattro pezzi. Uno ($\lambda^k/k!$) non dipende da $n$. Degli altri tre studiamo il limite separatamente.

#### Passo 2 — Il primo gruppo, $A_n$

Per $k=0$ il prodotto in $A_n$ è vuoto e vale 1. Per $k\ge1$ dividiamo ciascun fattore del numeratore per un $n$:

$$
A_n=1\cdot\left(1-\frac1n\right)\cdots
\left(1-\frac{k-1}{n}\right)\longrightarrow1.
$$

Ogni fattore tende a 1 e il **numero di fattori è fisso** ($k$, che non cresce con $n$). Un prodotto di un numero fisso di quantità che tendono a 1 tende a 1.

#### Passo 3 — Il secondo e il terzo gruppo, $B_n$ e $C_n$

Il gruppo $B_n$ tende a $e^{-\lambda}$ per il limite già usato nel §12. Il gruppo $C_n$ tende a 1: la base $1-\lambda/n$ tende a 1 e l’esponente $-k$ è fissato, quindi la potenza tende a $1^{-k}=1$.

#### Passo 4 — Riunire i limiti

Moltiplicando i limiti otteniamo:

$$
P(X_n=k)\longrightarrow
1\cdot\frac{\lambda^k}{k!}\cdot e^{-\lambda}\cdot1
=\frac{\lambda^ke^{-\lambda}}{k!}.
$$

#### Che cosa abbiamo imparato

Possiamo leggere il significato di ciascun pezzo. Il fattoriale rimasto al denominatore viene dalla scelta dei pezzetti: scegliere $k$ posizioni *senza ordine* divide per i $k!$ ordinamenti dello stesso insieme. L’esponenziale deriva invece dal prodotto delle probabilità dei moltissimi pezzetti vuoti.

Per una Binomiale concreta usiamo Poisson$(np)$ come **approssimazione** quando il regime lo consente. «$n$ grande e $p$ piccolo» descrive il meccanismo, ma non è una garanzia universale sulla precisione di ogni domanda: anche la probabilità richiesta e l’accuratezza necessaria contano. Se il modello esatto è disponibile e la differenza è rilevante, possiamo confrontare direttamente le due probabilità.

### B.2. Media e varianza dalla PMF {: #media-varianza-diretta }

Per verificare i momenti non trasferiamo automaticamente al limite quelli della Binomiale: li calcoliamo dalla distribuzione di Poisson stessa. È un controllo diretto, senza scambi di limite.

#### La media

Per definizione:

$$
\mathbb{E}[X]=\sum_{k=0}^{\infty}k\frac{\lambda^ke^{-\lambda}}{k!}
=\sum_{k=1}^{\infty}k\frac{\lambda^ke^{-\lambda}}{k!}.
$$

Il termine $k=0$ non contribuisce (è moltiplicato per 0), quindi la somma parte da 1. Per $k\ge1$ vale $k!=k\,(k-1)!$, quindi $k/k!=1/(k-1)!$. Raccogliamo inoltre un fattore $\lambda$ dalla potenza e il fattore comune $e^{-\lambda}$:

$$
\mathbb{E}[X]=\lambda e^{-\lambda}
\sum_{k=1}^{\infty}\frac{\lambda^{k-1}}{(k-1)!}.
$$

Poniamo $j=k-1$. Il nuovo indice comincia da 0, e la somma diventa $\sum_{j=0}^{\infty}\lambda^j/j!=e^\lambda$. Perciò:

$$
\mathbb{E}[X]=\lambda e^{-\lambda}e^\lambda=\lambda.
$$

#### Il secondo momento

Per la varianza ci serve la media di $X^2$. Il calcolo diretto di $\sum k^2P(X=k)$ è scomodo. Conviene invece calcolare $\mathbb{E}[X(X-1)]$, perché il fattoriale contiene già il prodotto $k(k-1)$ che si semplifica bene. I termini con $k=0$ e $k=1$ sono nulli, quindi la somma parte da 2:

$$
\begin{aligned}
\mathbb{E}[X(X-1)]
&=\sum_{k=2}^{\infty}k(k-1)\frac{\lambda^ke^{-\lambda}}{k!}\\
&=\lambda^2e^{-\lambda}\sum_{k=2}^{\infty}
\frac{\lambda^{k-2}}{(k-2)!}\\
&=\lambda^2e^{-\lambda}e^\lambda=\lambda^2.
\end{aligned}
$$

Nella seconda riga abbiamo usato $k!=k(k-1)(k-2)!$ e raccolto $\lambda^2$. Nella terza abbiamo cambiato indice con $j=k-2$. Le somme sono di termini non negativi e i risultati sono finiti.

Ora torniamo a $X^2$ con l’identità $X^2=X(X-1)+X$, che si verifica sviluppando. Per linearità:

$$
\mathbb{E}[X^2]=\mathbb{E}[X(X-1)]+\mathbb{E}[X]=\lambda^2+\lambda.
$$

#### La varianza

Usando l’identità della varianza ricavata nella [Lettura C](#formula-varianza), troviamo:

$$
\operatorname{Var}(X)=\mathbb{E}[X^2]-(\mathbb{E}[X])^2
=(\lambda^2+\lambda)-\lambda^2=\lambda.
$$

Abbiamo verificato entrambe le proprietà senza dover scambiare un limite di distribuzioni con un valore atteso. Il risultato conferma che una Poisson ha media e varianza entrambe uguali a $\lambda$.

## Lettura C — Due strumenti ulteriori per la varianza {: #lettura-varianza }

*Approfondimento facoltativo, non richiesto all’esame. Per il percorso principale si usa la definizione con gli scarti al quadrato.*

Questa lettura riparte dalla definizione iniziale. Prima ricava un’identità utile nei calcoli; poi la applica a una somma di indicatrici, mostrando esattamente dove l’indipendenza interviene nella varianza binomiale.

### C.1. La media dei quadrati e il quadrato della media {: #formula-varianza }

La definizione con gli scarti spiega il significato della varianza. Per fare i conti, però, è spesso comodo disporre di una formula che usi la media di $X$ e la media di $X^2$. Ricaviamola senza saltare i passaggi.

Partiamo dallo scarto al quadrato che compare nella definizione. La quantità $\mu$ è la media di $X$: una volta fissato il modello, è un numero determinato. Il valore di $X$ cambia con l'esito dell'esperimento, mentre $\mu$ rimane lo stesso. Possiamo perciò trattare $\mu$ come una costante e applicare l'identità algebrica del quadrato di una differenza:

$$
(X-\mu)^2=X^2-2\mu X+\mu^2.
$$

Ora facciamo la media dei due lati. A sinistra troviamo, per definizione, la varianza. A destra usiamo la linearità per separare i tre termini: il coefficiente costante del termine centrale esce dal valore atteso, mentre l'ultimo termine, essendo costante, ha media uguale a sé stesso:

$$
\operatorname{Var}(X)=\mathbb{E}[X^2]-2\mu\mathbb{E}[X]+\mu^2.
$$

Poiché $\mathbb{E}[X]=\mu$, il secondo termine è $-2\mu^2$. Sommandolo all'ultimo resta $-\mu^2$:

$$
\boxed{\operatorname{Var}(X)=\mathbb{E}[X^2]-\mu^2.}
$$

La formula è spesso comoda nei calcoli, ma richiede attenzione all'ordine delle operazioni. $\mathbb{E}[X^2]$ significa: **prima eleva al quadrato ciascun risultato, poi fai la media**. Il termine $\mu^2=(\mathbb{E}[X])^2$ significa invece: **prima fai la media dei risultati, poi eleva al quadrato quel numero**.

Le parentesi indicano dunque due procedimenti diversi. Non possiamo scambiarli: in generale producono numeri diversi, e la formula ci dice che la loro differenza è proprio la varianza.

Per calcolare $\mathbb{E}[X^2]$ applichiamo la [regola LOTUS](../settimana_04/index.md#lotus) con $g(x)=x^2$: non serve ricostruire da zero la distribuzione del quadrato. Usiamo gli stessi pesi della PMF di $X$, applicandoli ai valori elevati al quadrato:

$$
\mathbb{E}[X^2]=\sum_x x^2p_X(x).
$$

Seguiamo entrambi i procedimenti nel pagamento che vale 0 oppure 10. Per trovare $\mathbb{E}[X^2]$, trasformiamo i pagamenti in $0^2=0$ e $10^2=100$, mantenendo probabilità $1/2$ e $1/2$. La media dei quadrati è quindi $\mathbb{E}[X^2]=0^2\cdot1/2+10^2\cdot1/2=50$.

Per trovare il quadrato della media, partiamo invece dalla media dei pagamenti, che è 5, ed eleviamo quel numero al quadrato: otteniamo 25. Sottraendo troviamo $50-25=25$, lo stesso valore già ricavato con gli scarti. In particolare, nel primo conto abbiamo elevato al quadrato i **valori**, lasciando inalterati i loro pesi probabilistici.

Applichiamo lo stesso procedimento a una Bernoulli $I$ di parametro $p$, perché ci servirà per il conteggio binomiale. La sua media è $p$, come per ogni indicatrice. Per usare la nuova formula dobbiamo trovare anche la media di $I^2$.

Qui il quadrato è particolarmente semplice: i soli valori possibili sono 0 e 1, e valgono $0^2=0$ e $1^2=1$. Qualunque sia l'esito dell'esperimento, il quadrato del bit è dunque uguale al bit stesso: $I^2=I$. Di conseguenza, anche le loro medie coincidono: $\mathbb{E}[I^2]=\mathbb{E}[I]=p$.

Sostituendo la media $p$ e la media del quadrato $p$ nella formula della varianza, otteniamo:

$$
\operatorname{Var}(I)=p-p^2=p(1-p).
$$

### C.2. La varianza binomiale: dove serve l’indipendenza {: #varianza-binomiale }

Consideriamo $n$ prove indipendenti, ciascuna con probabilità di successo $p$. L'indicatrice $I_i$ vale 1 se la prova $i$ ha successo e 0 altrimenti. Il numero totale di successi è quindi:

$$
X=I_1+I_2+\cdots+I_n.
$$

Sappiamo già che $X$ è binomiale e ha media $\mathbb{E}[X]=np$. Ora vogliamo misurare quanto il conteggio si disperde attorno a questa media.

Nella sezione precedente abbiamo trovato la formula:

$$
\operatorname{Var}(X)=\mathbb{E}[X^2]-(\mathbb{E}[X])^2.
$$

Il secondo termine è già noto: basta elevare al quadrato la media $np$. Il primo termine, invece, richiede un nuovo conto. Dobbiamo trovare **la media del quadrato del numero di successi**.

#### Passo 1 — Capire che cosa compare nel quadrato

Prima di usare le sommatorie, prendiamo soltanto tre indicatrici. Moltiplicare la somma per sé stessa significa moltiplicare ogni termine della prima parentesi per ogni termine della seconda:

$$
\begin{aligned}
(I_1+I_2+I_3)^2
&=(I_1+I_2+I_3)(I_1+I_2+I_3)\\
&=I_1^2+I_1I_2+I_1I_3\\
&\quad+I_2I_1+I_2^2+I_2I_3\\
&\quad+I_3I_1+I_3I_2+I_3^2.
\end{aligned}
$$

Ci sono tre quadrati, uno per ogni indicatrice. Gli altri termini si possono raccogliere a due a due: $I_1I_2=I_2I_1$, e lo stesso vale per le altre coppie. Otteniamo:

$$
(I_1+I_2+I_3)^2
=I_1^2+I_2^2+I_3^2+2I_1I_2+2I_1I_3+2I_2I_3.
$$

Con $n$ indicatrici succede la stessa cosa: abbiamo $n$ quadrati e due copie del prodotto per ogni coppia distinta. La scrittura compatta è:

$$
X^2=\sum_{i=1}^n I_i^2+2\sum_{1\le i<j\le n}I_iI_j.
$$

Il vincolo $i<j$ elenca ogni coppia una volta sola; il fattore 2 tiene conto dei due prodotti che abbiamo raccolto. Per trovare la media di $X^2$ studieremo separatamente i quadrati e i prodotti.

#### Passo 2 — Trovare la media di ciascun quadrato

Un'indicatrice assume soltanto i valori 0 e 1. Elevandoli al quadrato otteniamo ancora 0 e 1: per ogni esito vale dunque $I_i^2=I_i$.

Di conseguenza:

$$
\mathbb{E}[I_i^2]=\mathbb{E}[I_i]=p.
$$

Questo passaggio non richiede indipendenza: riguarda una sola indicatrice alla volta. Poiché i quadrati sono $n$ e ciascuno ha media $p$, il loro contributo complessivo sarà $np$.

#### Passo 3 — Trovare la media di ciascun prodotto

Prendiamo due prove diverse, $i$ e $j$. Che cosa registra il prodotto $I_iI_j$? Possiamo verificarlo su tutti i valori dei due bit:

| $I_i$ | $I_j$ | $I_iI_j$ |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

Il prodotto vale 1 soltanto quando **entrambe le prove hanno successo**. È quindi l'indicatrice di quell'evento, e la sua media è la probabilità dell'evento stesso:

$$
\mathbb{E}[I_iI_j]=P(I_i=1,\ I_j=1).
$$

**È ora che usiamo l'indipendenza.** Nel modello binomiale, conoscere il successo della prova $i$ non cambia la probabilità di successo della prova $j$. Possiamo quindi moltiplicare le due probabilità:

$$
\begin{aligned}
P(I_i=1,\ I_j=1)
&=P(I_i=1)\,P(I_j=1)\\
&=p\cdot p\\
&=p^2.
\end{aligned}
$$

Abbiamo così trovato $\mathbb{E}[I_iI_j]=p^2$ per ogni coppia distinta. Sapere soltanto che ciascuna prova ha probabilità di successo $p$ non basterebbe: serve anche conoscere la probabilità dei due successi insieme.

#### Passo 4 — Riunire i contributi e sottrarre il quadrato della media

Torniamo all'espansione di $X^2$ e facciamo la media. La linearità permette di separare tutti gli addendi:

$$
\mathbb{E}[X^2]
=\sum_{i=1}^n\mathbb{E}[I_i^2]
+2\sum_{1\le i<j\le n}\mathbb{E}[I_iI_j].
$$

Nella prima somma ci sono $n$ termini, tutti uguali a $p$. Nella seconda ci sono $\binom n2$ termini, tutti uguali a $p^2$. Sostituendo:

$$
\mathbb{E}[X^2]=np+2\binom n2p^2.
$$

Ora usiamo $\binom n2=n(n-1)/2$. Il fattore 2 davanti alla somma si semplifica con il denominatore 2:

$$
\mathbb{E}[X^2]
=np+2\cdot\frac{n(n-1)}2\,p^2
=np+n(n-1)p^2.
$$

Questo è il primo dei due termini necessari per la varianza. Per il secondo, eleviamo al quadrato la media:

$$
(\mathbb{E}[X])^2=(np)^2=n^2p^2.
$$

Sottraiamo e svolgiamo l'algebra una riga alla volta:

$$
\begin{aligned}
\operatorname{Var}(X)
&=\mathbb{E}[X^2]-(\mathbb{E}[X])^2\\
&=np+n(n-1)p^2-n^2p^2\\
&=np+(n^2-n)p^2-n^2p^2\\
&=np+n^2p^2-np^2-n^2p^2\\
&=np-np^2\\
&=\boxed{np(1-p)}.
\end{aligned}
$$

I due termini $n^2p^2$ si cancellano. Nei due termini rimasti raccogliamo $np$, ottenendo la formula finale. Poiché la varianza di ogni singolo bit è $p(1-p)$, il risultato è anche la somma delle $n$ varianze dei bit. Lo abbiamo però ricavato usando l'indipendenza: non possiamo applicare questa conclusione a qualunque somma di indicatrici.

#### Passo 5 — Confrontare prove indipendenti e guasto comune

Torniamo ai due modelli del laboratorio. In entrambi contiamo i fallimenti di quattro operazioni, ciascuna con probabilità di fallimento $p=0{,}2$. La media del conteggio è la stessa:

$$
\mathbb{E}[X]=4\cdot0{,}2=0{,}8.
$$

**Nel modello con operazioni indipendenti**, $X$ è binomiale. Possiamo usare la formula appena dimostrata. Prima calcoliamo $1-p=1-0{,}2=0{,}8$, poi moltiplichiamo:

$$
\begin{aligned}
\operatorname{Var}(X)
&=4\cdot0{,}2\cdot0{,}8\\
&=0{,}8\cdot0{,}8\\
&=0{,}64.
\end{aligned}
$$

**Nel modello del guasto comune**, invece, tutte e quattro le operazioni falliscono insieme con probabilità $0{,}2$; altrimenti riescono tutte. Il conteggio può valere soltanto 0 oppure 4:

| Fallimenti $x$ | 0 | 4 |
|---|---|---|
| $P(X=x)$ | $0{,}8$ | $0{,}2$ |

Questo conteggio non è binomiale. Per trovarne la varianza torniamo alla definizione, usando la media $0{,}8$. Calcoliamo prima gli scarti e i loro quadrati:

$$
\begin{aligned}
(0-0{,}8)^2&=(-0{,}8)^2=0{,}64,\\
(4-0{,}8)^2&=(3{,}2)^2=10{,}24.
\end{aligned}
$$

Ora pesiamo ciascuno scarto al quadrato con la probabilità del corrispondente conteggio:

$$
\begin{aligned}
\operatorname{Var}(X)
&=(0-0{,}8)^2\cdot0{,}8+(4-0{,}8)^2\cdot0{,}2\\
&=0{,}64\cdot0{,}8+10{,}24\cdot0{,}2\\
&=0{,}512+2{,}048\\
&=2{,}56.
\end{aligned}
$$

La varianza del guasto comune è quattro volte quella del modello indipendente: $2{,}56/0{,}64=4$. La media è rimasta $0{,}8$, ma nel guasto comune il conteggio salta direttamente da 0 a 4: mancano tutti i valori intermedi. Il grafico del [laboratorio della Settimana 4](../settimana_04/index.md#lab-binomiale) mostra proprio questa concentrazione agli estremi, e la varianza ne misura la maggiore dispersione attorno alla media.

Possiamo anche individuare il passaggio della dimostrazione che qui cambia. Due operazioni fissate falliscono insieme con probabilità $0{,}2$, perché basta che avvenga il guasto comune. Nel modello indipendente, invece, la probabilità dei due fallimenti insieme è $0{,}2\cdot0{,}2=0{,}04$. Le probabilità singole coincidono, ma quelle congiunte sono diverse: cambiano quindi le medie dei prodotti $I_iI_j$ e, di conseguenza, la varianza del totale.

**La linearità del valore atteso vale anche per variabili dipendenti; la somma delle varianze richiede ulteriori condizioni.** Per la Binomiale l'indipendenza giustifica il calcolo dei prodotti e porta a $np(1-p)$. Nel modello del guasto comune dobbiamo invece tenere conto del legame tra le operazioni.

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

Una variabile $Y$ vale 0 con probabilità $1/4$, 2 con probabilità $1/2$ e 4 con probabilità $1/4$. Calcola media e varianza **con la definizione degli scarti**. Può essere Poisson? Usa poi lo stesso procedimento per verificare la varianza 0,6079 della tabella di Bortkiewicz.

??? esempio-svolto "Soluzione ragionata"
    **La media.** $0\cdot\frac14+2\cdot\frac12+4\cdot\frac14=0+1+1=2$.

    **Gli scarti e la varianza.** Gli scarti dalla media sono $-2$, $0$ e $2$. Elevati al quadrato e pesati:

    $$
    \operatorname{Var}(Y)=(-2)^2\frac14+0^2\frac12+2^2\frac14=1+0+1=2.
    $$

    **Può essere Poisson?** Media e varianza coincidono, ma $Y$ **non è Poisson**: per esempio $P(Y=1)=0$, mentre una Poisson di parametro 2 assegna a 1 probabilità $2e^{-2}>0$. Abbiamo così un controesempio all’idea che l’uguaglianza fra media e varianza identifichi il modello.

    **Bortkiewicz.** I pesi sono le frequenze divise per 200 e la media è 0,61. La somma pesata degli scarti al quadrato è:

    $$
    \frac{109(0-0{,}61)^2+65(1-0{,}61)^2+22(2-0{,}61)^2+3(3-0{,}61)^2+(4-0{,}61)^2}{200}
    =0{,}6079.
    $$

    Il valore vicino alla media è coerente con il modello, ma non ne prova tutte le ipotesi.

### Esercizio 7 — Scegliere il modello e dichiarare le ipotesi {: #esercizio-7 }

Per ciascuna situazione indica un modello naturale e trova la probabilità richiesta. Quando il testo fornisce soltanto una media, precisa quali ipotesi aggiungi per usare la Poisson.

1. Un collegamento perde in media 0,5 pacchetti al minuto: probabilità di almeno una perdita in un minuto.
2. Ogni connessione riesce con probabilità 0,9, indipendentemente dalle altre: probabilità di dover fare più di un tentativo.
3. Un testo contiene in media 2 refusi per pagina: probabilità di esattamente 2 refusi in una pagina.
4. Fra 10 operazioni indipendenti, ciascuna riesce con probabilità 0,9: probabilità che riescano tutte.
5. **Richiamo facoltativo:** quanti numeri pari ci sono fra i 5 estratti senza reinserimento da 1 a 90? Trova la media e spiega perché il conteggio non è binomiale.

??? esempio-svolto "Soluzione ragionata"
    1. **Pacchetti persi.** Se le perdite sono eventi singoli, a tasso stabile e senza dipendenza fra intervalli disgiunti, usiamo Poisson$(0{,}5)$. «Almeno una perdita» ha come complementare «zero perdite», quindi $P(X\ge1)=1-e^{-0{,}5}\approx0{,}3935$. La sola media non assicura queste ipotesi: le stiamo aggiungendo noi.
    2. **Connessioni.** Il numero di tentativi fino al successo è Geometrica$(0{,}9)$. «Più di un tentativo» significa che il primo fallisce: $P(X>1)=0{,}1$.
    3. **Refusi.** Se adottiamo il modello Poisson, con esposizione omogenea per pagina e refusi non raggruppati, $P(X=2)=2^2e^{-2}/2!=2e^{-2}\approx0{,}2707$. Conoscere la media 2 non basta, da solo, a identificare la distribuzione.
    4. **Dieci operazioni.** Il numero di riuscite è Binomiale$(10,0{,}9)$; riescono tutte con probabilità $0{,}9^{10}\approx0{,}3487$.
    5. **Numeri pari.** Il modello è [Ipergeometrico](../settimana_04/index.md#ipergeometrica). Ci sono 45 pari su 90; dopo ogni estrazione cambia la composizione dei numeri rimasti, quindi le cinque indicatrici non sono indipendenti. Ciascuna ha però media $45/90$. Per linearità, che non richiede indipendenza, la media del totale è $5\cdot45/90=2{,}5$.

### Esercizio 8 — Un picco oltre la soglia {: #esercizio-8 }

Un conteggio è Poisson con $\lambda=2$. Trova la probabilità di almeno tre eventi. Quali proprietà hanno media e varianza? Se una serie di intervalli comparabili avesse media osservata circa 2 e varianza circa 9, che cosa controlleresti?

??? esempio-svolto "Soluzione ragionata"
    **Almeno tre eventi.** Significa $X\ge3$, il cui complementare è $X\in\{0,1,2\}$. Togliamo da 1 i pesi di 0, 1 e 2:

    $$
    P(X\ge3)=1-e^{-2}\left(1+2+\frac{2^2}{2}\right)
    =1-5e^{-2}\approx0{,}3233.
    $$

    **Media e varianza.** Nel modello valgono entrambe 2.

    **Una varianza osservata di 9.** Suggerirebbe sovradispersione rispetto alla Poisson con media 2. Controllerei se abbiamo mescolato intervalli con tassi diversi, se ci sono raffiche o cause comuni, e quanto è grande il campione. Non basta sostituire $\lambda$ con 9: in una Poisson quello cambierebbe anche la media.

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
| Una probabilità Poisson maggiore di 1 | Ho distinto il numero medio $\lambda$ da $P(X=k)$? Ho incluso $e^{-\lambda}$ e $k!$? |
| «Media uguale a varianza, dunque Poisson» | Ho controllato il meccanismo e le altre probabilità della distribuzione? |
| «La media del campione deve essere esattamente $\lambda$» | Sto confondendo un parametro teorico con un risultato campionario? |
| Una varianza calcolata con scarti che si cancellano | Ho elevato al quadrato ogni scarto prima di fare la media? |

## Riepilogo per lo studio {: #riepilogo }

Rileggiamo il percorso in poche righe, nell’ordine in cui l’abbiamo fatto.

**La varianza.** Aggiunge al centro della distribuzione una misura della dispersione. Per calcolarla dalla definizione troviamo la media, gli scarti, i quadrati degli scarti e infine la loro media pesata. La radice della varianza è la deviazione standard, che ha le stesse unità della variabile.

**La Geometrica.** Nasce quando ripetiamo prove indipendenti con probabilità di successo costante e contiamo tutte le prove fino al primo successo. La PMF $(1-p)^{k-1}p$ descrive una sequenza di $k-1$ fallimenti chiusa da un successo. La coda $(1-p)^k$ richiede soltanto $k$ fallimenti. La media è $1/p$; l’assenza di memoria riguarda la distribuzione dell’attesa che resta dopo i fallimenti già osservati.

**La Poisson.** Descrive un conteggio in un intervallo. Il modello a pezzetti la costruisce come limite di Binomiali con sempre più prove, probabilità per prova sempre più piccola e media totale $\lambda$ fissata. La sua PMF è $\lambda^ke^{-\lambda}/k!$; media e varianza valgono entrambe $\lambda$. Con un tasso costante $r$ e una durata $t$, il parametro dell’intervallo è $\lambda=rt$.

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

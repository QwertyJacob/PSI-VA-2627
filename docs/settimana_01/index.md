[:material-presentation: Apri Slide della Lezione](slides/index.html){ .md-button .md-button--primary target="_blank" }

# Settimana 1 — Che cos'è la probabilità?
*Un viaggio attraverso la storia, la filosofia, i paradossi e il codice della disciplina che misura l'incertezza.*

---

## Prologo: La moneta a mezz'aria e il supercomputer

Immagina di avere una moneta d'ottone tra le mani. Infili il pollice sotto il bordo, dai un colpo verso l'alto e la lanci a roteare nell'aria.

Mentre volteggia luccicando nella stanza, ti viene spontaneo porti la classica domanda: **qual è la probabilità che esca testa?**

Quasi chiunque, senza esitare, risponderebbe: *"Il 50%"*. Sembra la cosa più ovvia, evidente e indiscutibile del mondo. Ma ora fermiamo l'immagine a mezz'aria e immaginiamo un osservatore diverso: un supercomputer dotato di sensori ambientali e telecamere ad altissima velocità puntate sulla moneta. In pochi millisecondi, questa macchina misura con precisione assoluta la forza impartita dal pollice, l'angolo di lancio, la distribuzione di massa dell'ottone, l'attrito dell'aria, la pressione atmosferica e l'accelerazione di gravità.

Per quel supercomputer, la probabilità non è affatto del 50%. È del **100% testa** oppure del **100% croce**. Conoscendo le equazioni deterministiche della meccanica classica di Newton, la macchina sa già con certezza infallibile come atterrerà la moneta sul tavolo molto prima che tocchi terra.

Questo contrasto svela il paradosso fondativo dell'intera teoria della probabilità:

!!! question "La Domanda Guida"
    **Quel "50%" è davvero una proprietà fisica scolpita nella materia della moneta, oppure è solo un numero che inventiamo per mascherare la nostra totale ignoranza delle variabili fisiche in gioco?**

Se è soltanto ignoranza, allora la probabilità è un artefatto della mente umana (**approccio epistemico**). Se invece è una proprietà oggettiva del mondo esterno (**approccio ontico**), dov'è racchiusa? Come può un disco inanimato di metallo contenere al proprio interno una "tendenza intrinseca" a mostrare una faccia la metà delle volte?

Da oltre tre secoli, matematici, fisici e filosofi si affrontano in scontri accademici feroci e appassionati su questo dilemma. Quella che segue è la storia di questa avventura intellettuale: un *Erlebnis*, un'esperienza vissuta attraverso le scoperte, le crisi e i paradossi che hanno dato forma al modo in cui oggi comprendiamo il caso e progettiamo il software.

---

## Atto I: La grammatica senza vocabolario — Il miracolo di Kolmogorov (1933)

Per capire perché la probabilità sia un terreno filosoficamente lacerato, dobbiamo partire dal 1933. In quell'anno, il matematico sovietico **Andrej Nikolaevič Kolmogorov** diede alle stampe una breve monografia in lingua tedesca: *Grundbegriffe der Wahrscheinlichkeitsrechnung* (*Fondamenti del calcolo delle probabilità*, consultabile liberamente nell'edizione inglese su [Internet Archive](https://archive.org/details/foundationsofthe00kolm)).

Prima di Kolmogorov, la probabilità era un pantano concettuale. Si poggiava su definizioni circolari, come quella di "casi ugualmente probabili" (che definisce la probabilità usando la probabilità stessa). Kolmogorov compì quello che all'epoca apparve come un miracolo matematico: inquadrò l'intera teoria all'interno della **teoria della misura** (la branca dell'analisi che formalizza le lunghezze, le aree e i volumi geometrici).

Kolmogorov fissò tre assiomi categorici. Dato uno spazio campionario $\Omega$ di tutti gli esiti possibili e una $\sigma$-algebra $\mathcal{F}$ di eventi:

1. **Non-negatività:** Per qualsiasi evento $A \in \mathcal{F}$, la probabilità è non negativa: $P(A) \ge 0$.
2. **Normalizzazione:** La probabilità dell'evento certo è pari a uno: $P(\Omega) = 1$.
3. **$\sigma$-additività (Additività numerabile):** Se una sequenza di eventi $A_1, A_2, A_3, \dots$ è disgiunta a due a due ($A_i \cap A_j = \emptyset$ per ogni $i \neq j$), allora la probabilità dell'unione è la somma delle probabilità:

    $$
    P\left(\bigcup_{i=1}^\infty A_i\right) = \sum_{i=1}^\infty P(A_i)
    $$

La comunità matematica tirò un respiro di sollievo. Finalmente la probabilità possedeva assiomi rigorosi quanto la geometria di Euclide. Si potevano dimostrare teoremi sui limiti, integrare, formalizzare le catene di Markov e la Legge Forte dei Grandi Numeri senza il rischio di incoerenze logiche.

### Il vuoto semantico

Eppure, nel trionfo di Kolmogorov si annidava un'omissione gigantesca e deliberata. Kolmogorov aveva costruito un **contenitore sintatticamente inattaccabile**, ma **semanticamente del tutto vuoto**.

I suoi assiomi spiegano con chirurgica precisione *come* le probabilità si sommano, si moltiplicano e si condizionano tra loro, ma non dicono una sola parola su **cosa quei numeri misurino nel mondo reale**. È come ricevere la grammatica definitiva di una lingua antica sconosciuta — con tutte le regole per le declinazioni, i verbi e i pronomi — senza avere a disposizione un dizionario. Si possono comporre frasi grammaticalmente perfette, ma non si ha la minima idea di cosa si stia dicendo.

Quando un bollettino meteorologico annuncia una *"probabilità di pioggia del 70% per domani a Varese"*, che cos'è esattamente $\Omega$? Cosa rappresenta fisicamente lo 0,70? Domani o pioverà o non pioverà; la giornata non può bagnarsi per il 70% del suo esistere.

```
                  ┌────────────────────────────────────────┐
                  │      GLI ASSIOMI DI KOLMOGOROV         │
                  │   Contenitore Sintattico Perfetto      │
                  │   P(A) >= 0,  P(Ω) = 1,  P(∪Ai) = ΣP   │
                  └───────────────────┬────────────────────┘
                                      │
                   COME RIEMPIRE QUESTO CONTENITORE?
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            ▼                                                   ▼
 ┌──────────────────────┐                            ┌──────────────────────┐
 │   POLO EPISTEMICO    │                            │     POLO ONTICO      │
 │  (Stato della Mente) │                            │ (Proprietà del Mondo)│
 │  • Laplace (1814)    │                            │  • Venn (1866)       │
 │  • de Finetti (1937) │                            │  • von Mises (1928)  │
 │  • Carnap (1950)     │                            │  • Popper (1959)     │
 └──────────────────────┘                            └──────────────────────┘
```

### I tre criteri implacabili di Wesley Salmon (1966)

Nel saggio *The Foundations of Scientific Inference* (si veda l'approfondimento della [Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/probability-interpret/)), il filosofo della scienza **Wesley C. Salmon** dimostrò che qualsiasi tentativo di dare un significato reale alla probabilità deve superare tre esami spietati:

1. **Ammissibilità:** L'interpretazione deve rispettare rigorosamente gli assiomi matematici di Kolmogorov (non può generare valori negativi o somme diverse da 1).
2. **Accertabilità:** I valori di probabilità devono poter essere empiricamente misurati o verificati dagli esseri umani.
3. **Applicabilità:** I valori devono servire come "guida per la vita" — ovvero costituire una base razionale per agire e prendere decisioni pratiche in condizioni di incertezza (riprendendo la celebre massima del vescovo Joseph Butler nel Settecento: *"La probabilità è la vera guida della vita"*).

Il dramma conoscitivo è vertiginoso: **nessuna interpretazione pura nota soddisfa simultaneamente tutti e tre i criteri!**

---

## Atto II: La genesi — Dalla virtù morale ai debiti di gioco (1654)

### Quando la probabilità non aveva numeri
Per capire la frattura moderna, bisogna ricordare che per secoli la parola *probabile* non ha avuto nulla a che fare con la matematica o con i conteggi. Derivata dal latino *probabilis*, indicava un'opinione degna di approvazione morale (*probata* da persone sagge, autorevoli o virtuose). 

Nel Medioevo vigeva una rigida separazione epistemologica:
* Da una parte c'era la **Scientia**: la conoscenza certa, dimostrativa, dedotta da principi primi immutabili (come la geometria euclidea o la teologia).
* Dall'altra c'era l'**Opinio**: il regno dell'incertezza, delle vicende umane, del commercio e del diritto, dove la verità assoluta era inaccessibile e ci si doveva accontentare di argomenti "probabili" (plausibili, credibili).

Nessuno studioso medievale avrebbe mai pensato di applicare i numeri o l'algebra a una scommessa: il caso era considerato espressione imperscrutabile della Provvidenza divina, e tentare di calcolarlo era quasi un atto sacrilego o un passatempo volgare per bettole.

### Il problema della partita interrotta (1654)
La frattura avvenne nell'estate del 1654. Un nobile parigino, Antoine Gombaud — noto come il *Cavaliere de Méré* —, giocatore d'azzardo professionista ma uomo di fine ingegno letterario, pose al matematico e filosofo **Blaise Pascal** una questione che toglieva il sonno agli scommettitori fin dai tempi di Luca Pacioli (1494): il **problema della divisione della posta** (*problème des partis*).

> Due gentiluomini scommettono ciascuno 32 pistole d'oro a un gioco di dadi. Vincerà l'intera posta (64 pistole) chi per primo totalizzerà 3 punti. La partita viene però interrotta bruscamente quando il Giocatore A ha 2 punti e il Giocatore B ha 1 punto. Come deve essere diviso il piatto in modo rigorosamente equo tra i due giocatori?

Se si divide la posta in proporzione ai punti fatti ($2$ contro $1$, ovvero $2/3$ ad A e $1/3$ a B), si commette un'ingiustizia: si ignora il fatto che ad A mancava un solo punto per vincere tutto, mentre a B ne mancavano due. Se si restituiscono le 32 pistole a ciascuno, si premia indebitamente B che stava perdendo.

Pascal avviò un fitto scambio epistolare con il giurista e matematico di Tolosa **Pierre de Fermat**. La loro corrispondenza nell'estate del 1654 segna l'atto di nascita della teoria matematica della probabilità.

L'intuizione folgorante di Pascal e Fermat fu di ribaltare la prospettiva: la divisione del denaro **non doveva guardare al passato (i punti già conquistati), ma pesare geometricamente i rami dei futuri possibili**.
* Se si fosse giocata una manche successiva:
  * Con probabilità $1/2$ avrebbe vinto A, raggiungendo 3 punti e intascando tutte le 64 pistole.
  * Con probabilità $1/2$ avrebbe vinto B, portando la partita sul 2 a 2 (patta). In questo scenario di parità, a ciascuno sarebbero spettate di diritto 32 pistole.
Il valore equo dell'aspettativa di vincita (il *valore atteso*) prima di giocare quella manche è dunque il valore garantito (32 pistole) più la metà del piatto conteso:

$$
\text{Spettanza di A} = 32 + \frac{1}{2}(32) = 48 \text{ pistole} \quad (3/4 \text{ del totale})
$$

$$
\text{Spettanza di B} = \frac{1}{2}(32) = 16 \text{ pistole} \quad (1/4 \text{ del totale})
$$

Per la prima volta nella storia, l'incertezza del futuro veniva domata dal calcolo esatto. Ma questo trionfo aprì una voragine filosofica che non si è mai più richiusa: cosa stiamo calcolando esattamente quando pesiamo quei rami futuri?

---

## Atto III: Il regno epistemico — La mente che lotta con l'ignoranza

I pensatori del **Polo Epistemico** sostengono una tesi radicale: la probabilità non appartiene al mondo fisico esterno, ma è la misura del nostro **stato di informazione o credenza** di fronte a una realtà che non conosciamo completamente.

### Scena 1: Pierre-Simon Laplace e il Principio di Indifferenza (1814)

Nel 1814, nel suo celebre *Essai philosophique sur les probabilités* ([Internet Archive](https://archive.org/details/philosophicaless00laplrich)), il marchese **Pierre-Simon de Laplace** formulò la più limpida apologia del determinismo universale:

> «Dobbiamo considerare lo stato presente dell'universo come l'effetto del suo stato anteriore e come la causa di quello futuro. Un'Intelligenza che per un dato istante conoscesse tutte le forze da cui la natura è animata e la situazione rispettiva degli esseri che la compongono, se per di più fosse abbastanza vasta da sottoporre questi dati ad analisi, abbraccerebbe nella stessa formula i movimenti dei più grandi corpi dell'universo e quelli del più leggero atomo: nulla sarebbe incerto per essa, e l'avvenire come il passato sarebbe presente ai suoi occhi.»

Cosa direbbe Laplace se potesse parlarci direttamente per difendere la propria visione? Ci direbbe qualcosa del genere:

> «Signori, sgombriamo subito il campo da un equivoco infantile: la Natura non conosce dadi, non conosce roulette e non conosce il caso. Se l'universo è retto dalle leggi immutabili della meccanica che Newton e io stesso abbiamo descritto nella *Mécanique Céleste*, allora ogni atomo della creazione percorre una traiettoria determinata con rigore infallibile. Un'Intelligenza suprema che abbracciasse la totalità delle forze e le posizioni iniziali di ogni corpo non scriverebbe mai un trattato sulle probabilità: per essa il futuro sarebbe presente con la medesima evidenza geometrica del passato.
>
> Ma noi non siamo quell'Intelligenza. La nostra mente è confinata entro orizzonti sensoriali ristretti. È qui che interviene la mia massima: *la teoria della probabilità non è in fondo che il buon senso ridotto a calcolo*. Essa misura con rigore matematico non una qualità misteriosa della materia, bensì lo stato della nostra informazione.
>
> Quando dichiariamo che una faccia del dado ha probabilità $1/6$, non stiamo affermando di aver misurato una forza ontologica all'interno del piombo o dell'avorio: stiamo affermando che, in virtù delle simmetrie visibili dell'oggetto e della nostra totale assenza di ragioni contrarie, la ragione ci impone di trattare i sei esiti come equivalenti. È il Principio di Indifferenza: una pietra angolare di razionalità pura. Chi cerca la probabilità nelle viscere fisiche della moneta scambia la mappa con il territorio; la probabilità è la migliore guida razionale che un intelletto finito possa concepire per navigare un mare di cui non vede i fondali.»

Per assegnare valori numerici all'ignoranza, Laplace formalizzò il **Principio di Indifferenza** (o di Ragion Sufficiente): se abbiamo davanti $N$ esiti possibili, mutualmente esclusivi e congiuntamente esaustivi, e non possediamo alcun indizio o ragione particolare per ritenere uno di essi più probabile degli altri, la ragione ci impone di assegnare a ciascuno la probabilità $1/N$:

$$
P(A) = \frac{\text{Numero di casi favorevoli ad } A}{\text{Numero totale di casi possibili}}
$$

#### La crisi di Bertrand (1889)

L'approccio di Laplace sembrava perfetto finché si giocava a dadi o con mazzi di carte da gioco. Ma cosa succede quando gli esiti possibili sono infiniti e continui, come nella geometria?

Nel 1889, il matematico francese **Joseph Bertrand**, nella sua opera *Calcul des probabilités* ([Gallica BnF](https://gallica.bnf.fr/ark:/12148/bpt6k290089)), inferse un colpo mortale all'illusione laplaciana formulando il suo celeberrimo paradosso:

> Sia dato un cerchio di raggio $R$ con un triangolo equilatero inscritto (il cui lato misura $\ell = R\sqrt{3}$). Si tracci "a caso" una corda nel cerchio. Qual è la probabilità che la corda sia più lunga del lato del triangolo?

Bertrand dimostrò che, a seconda di come si interpreta l'espressione "tracciare a caso", si ottengono tre risposte geometricamente ineccepibili, ma del tutto discordanti:

```
      METODO 1: ESTREMI                    METODO 2: RAGGIO                  METODO 3: PUNTO MEDIO
     (Uniformi sulla circonferenza)       (Distanza uniforme dal centro)     (Uniforme all'interno del disco)
              ▲                                    ▲                                    ▲
             / \                                  /│\                                  /│\
            /   \                                / │ \                                / │ \
           /     \                              /  │  \                              /  │  \
          /───────\                            /───┼───\                            /───┼───\
         /  Arc=1/3\                          /  r < R/2\                          / (R/2)²  \
        ─────────────                        ─────────────                        ─────────────
         P = 1/3 ≈ 0.333                      P = 1/2 = 0.500                      P = 1/4 = 0.250
```

1. **Metodo degli estremi casuali:** Fissiamo un estremo della corda su un vertice del triangolo. L'altro estremo viene scelto uniformemente sulla circonferenza. Affinché la corda sia più lunga del lato del triangolo, il secondo estremo deve cadere sull'arco opposto compreso tra gli altri due vertici. Tale arco misura esattamente $1/3$ della circonferenza totale.  
   **Risultato: $P_1 = 1/3 \approx 0,333$**.
2. **Metodo del raggio casuale:** Per ragioni di simmetria, fissiamo l'orientamento del raggio perpendicolare alla corda e scegliamo uniformemente la distanza $r$ del punto medio della corda dal centro ($0 \le r \le R$). Geometricamente, una corda è più lunga del lato del triangolo se e solo se il suo punto medio dista dal centro meno dell'apotema del triangolo, ovvero $r < R/2$. Poiché $R/2$ è la metà del raggio:  
   **Risultato: $P_2 = 1/2 = 0,500$**.
3. **Metodo del punto medio nel disco:** Scegliamo a caso un punto qualsiasi all'interno del cerchio come punto medio della corda. Affinché la corda sia più lunga del lato del triangolo, il suo punto medio deve cadere all'interno di un cerchio concentrico di raggio $R/2$. L'area di questo cerchio interno è $\pi (R/2)^2 = \frac{1}{4}\pi R^2$, ovvero un quarto dell'area del cerchio originario.  
   **Risultato: $P_3 = 1/4 = 0,250$**.

Tre risposte rigorose, tre valori completamente diversi. Il Principio di Indifferenza di Laplace collassò: la pura ignoranza non è in grado di specificare una distribuzione di probabilità univoca nel continuo, perché non esiste un modo naturale e neutrale di definire cosa significhi "equiprobabile" senza imporre una parametrizzazione arbitraria dello spazio.

---

### Scena 2: Bruno de Finetti e il coraggio della soggettività (1937)

Nel 1937, negli *Annales de l'Institut Henri Poincaré*, il matematico italiano **Bruno de Finetti** pubblicò una memoria che scosse le fondamenta della comunità scientifica: *La prévision: ses lois logiques, ses sources subjectives* ([NUMDAM](http://www.numdam.org/item/AIHP_1937__7_1_1_0.pdf)).

De Finetti aprì il suo saggio con una provocazione rimasta leggendaria:
> **«LA PROBABILITÀ NON ESISTE»**

Cosa replicherebbe Bruno de Finetti a chi cerca ostinatamente la probabilità nella materia? Ci direbbe qualcosa del genere:

> «Permettetemi di ribadire la tesi che per cinquant'anni ho gridato nelle aule di mezza Europa: **LA PROBABILITÀ NON ESISTE.**
>
> Non esiste come il peso, la carica elettrica o la statura. I colleghi frequentisti credono di averla trovata nelle loro "serie infinite", ma le serie infinite di eventi identici nel mondo fisico sono un miraggio metafisico. Nessuna moneta può essere lanciata all'infinito senza consumarsi, nessun paziente è la copia esatta di un altro, nessun evento storico si ripete mai identico a se stesso. Parlare di un limite per $n \to \infty$ significa basare la scienza empirica su un'operazione che nessun essere umano potrà mai completare.
>
> E allora cos'è la probabilità? È semplicemente il **grado di fiducia** che un individuo razionale attribuisce all'avverarsi di un fatto incerto. E non è affatto un'opinione arbitraria o fluttuante: la rendiamo rigorosa e oggettivamente misurabile mettendola alla prova dell'azione economica, della scommessa. Se affermi che $P(E) = p$, significa che sei pronto a considerare equo uno scambio a quel prezzo. Se le tue valutazioni violassero le regole del calcolo probabilistico, cadresti in una plateale contraddizione logica e autodistruttiva. Il calcolo delle probabilità non è la descrizione di atomi o di frequenze immaginarie: è il codice formale della coerenza logico-economica del pensiero umano.»

Ma come evitare che questa visione soggettivista sprofondi nell'anarchia e nell'arbitrio totale, rendendo impossibile la scienza? De Finetti rispose ancorando la probabilità a un atto operativo, misurabile e razionale: **il principio di coerenza decisionale**.

#### Il prezzo di scommessa e la coerenza operativa

Supponiamo che tu dichiari che la probabilità che domani piova a Varese sia $P(\text{Pioggia}) = p$. Cosa significa concretamente questo numero?
Significa che tu valuti equo impegnare una somma pari a $p \cdot S$ euro per acquistare il diritto a riscuotere la somma $S$ nel caso in cui domani piova davvero (e zero se non piove). Il numero $p \in [0, 1]$ non è una proprietà della pioggia, ma il tuo **prezzo di riserva operativo**: la quota soggettiva a cui ritieni equo scambiare risorse in condizioni di incertezza.

De Finetti dimostrò che questo sistema di valutazioni non può essere arbitrario: affinché le decisioni di un individuo siano razionali, esse devono essere **internamente coerenti**. Se un individuo assegnasse quote disordinate (ad esempio dichiarando probabilità $0,6$ per l'uscita di Testa e $0,6$ per l'uscita di Croce su un singolo lancio), cadrebbe in una plateale contraddizione logica e autodistruttiva, valutando equo sborsare somme complessive superiori alla vincita massima garantita.

Da questo requisito discende il grande teorema fondativo di de Finetti:
> **Le valutazioni di probabilità e le quote di un agente razionale sono internamente coerenti se e solo se obbediscono rigorosamente agli assiomi matematici di Kolmogorov.**

La matematica della probabilità non piove dunque dal cielo né scaturisce dalla materia fisica: per de Finetti è il codice operativo formale che impone la non-contraddittorietà alle decisioni umane di fronte all'ignoto.

#### Il tallone d'Achille del soggettivismo
Se da un lato de Finetti fornisce una solida base operativa agli assiomi di Kolmogorov, dall'altro apre una frattura inquietante per la scienza: se la probabilità è solo un'opinione personale internamente coerente, allora due medici o due ricercatori che esaminano la medesima cartella clinica possono legittimamente assegnare probabilità di guarigione diverse (ad esempio 0,10 e 0,90). Finché entrambi mantengono la propria coerenza interna, nessuno dei due può essere accusato di errore logico. La scienza rischia di perdere la propria pretesa di oggettività univoca e impersonale.

---

### Scena 3: Rudolf Carnap e l'illusione della macchina logica (1950)

Per salvare l'oggettività della conoscenza senza cadere nella fisica empirica dei dadi, il filosofo del Circolo di Vienna **Rudolf Carnap** tentò una via titanica nel suo trattato *Logical Foundations of Probability* (1950): trasformare la probabilità in una pura **relazione logico-sintattica oggettiva** tra enunciati.

!!! note "Carnap: Un progetto ontico-formale (fallito, ma ontico)"
    Rudolf Carnap viene talvolta frettolosamente classificato come autore "epistemico" solo perché la sua teoria valuta il grado di conferma di ipotesi empiriche. In realtà, **il progetto di Carnap è profondamente ontico-formale**: egli rifiuta categoricamente il soggettivismo di de Finetti e l'idea che la probabilità sia uno stato d'animo o una propensione psicologica della mente. Per Carnap, la probabilità è una **proprietà oggettiva e impersonale della struttura logica del mondo e del linguaggio**, esattamente come la deduzione logica ($e \implies h$) è oggettivamente vera o falsa indipendentemente da chi la pensa. Si tratta di un'autentica ontologia delle relazioni logiche nel mondo formale: un progetto grandioso, ma infine **fallito**, perché la sintassi da sola non è in grado di selezionare una funzione induttiva unica.

Carnap sosteneva che, esattamente come la logica deduttiva stabilisce a priori se un enunciato $h$ segue necessariamente dalla premessa $e$ ($e \implies h$), così una logica induttiva deve stabilire un numero razionale univoco $c(h, e) \in [0, 1]$ che misura il "grado di conferma" che l'evidenza empirica $e$ conferisce oggettivamente all'ipotesi $h$.

#### La meccanica formale: Descrizioni di Stato e Descrizioni di Struttura
Carnap costruì un micromondo formale:
* Consideriamo un universo con $N = 3$ oggetti ($a, b, c$) e una proprietà binaria $B$ (ad esempio "essere blu").
* Una **Descrizione di Stato** è un elenco esaustivo che specifica per ogni individuo se possiede o meno la proprietà (ci sono $2^3 = 8$ descrizioni di stato possibili: tutti blu, solo $a$ e $b$ blu, solo $c$ blu, nessuno blu, ecc.).
* Se applichiamo il principio di indifferenza alle descrizioni di stato, ciascuna riceve peso $1/8$. Ma Carnap scoprì una catastrofe logica: se facciamo così, **l'apprendimento dall'esperienza diventa impossibile!** Se osserviamo che i primi due oggetti sono blu, la probabilità che anche il terzo sia blu rimane ferma a $1/2$. L'universo non impara nulla dal passato.
* Per consentire l'induzione scientifica, Carnap raggruppò le descrizioni di stato in **Descrizioni di Struttura** (classi di equivalenza che ignorano le etichette individuali e contano solo quanti oggetti sono blu). Assegnando pesi uguali alle descrizioni di struttura (la misura $m^*$), l'osservazione di oggetti blu aumenta la probabilità che i futuri oggetti siano blu: la macchina impara.

#### Il collasso: Il continuo delle funzioni induttive e l'arbitrio del linguaggio
L'edificio logico di Carnap crollò tuttavia su se stesso. Estendendo l'analisi, Carnap scoprì che $m^*$ era solo una tra infinite funzioni induttive possibili, parametrizzate da una costante libera $\lambda \in [0, \infty)$:

$$
c(h_{n+1}, e_n) = \frac{s_n + \lambda / k}{n + \lambda}
$$

* Se $\lambda = 0$, siamo iper-induttivi (basta un cigno nero per decretare che tutti i cigni futuri saranno neri).
* Se $\lambda \to \infty$, siamo impermeabili all'esperienza (il passato non conta nulla).

Quale valore di $\lambda$ deve scegliere la scienza? La logica sintattica tace. Inoltre, il celebre paradosso del filosofo Nelson Goodman (*l'enigma del verde e dell'indaco*) dimostrò che il grado di conferma dipende interamente dalla scelta arbitraria del vocabolario primitivo adottato. La grande macchina della probabilità logica si spense nel silenzio della formalizzazione fine a se stessa.

---

## Atto IV: Il regno ontico — La probabilità incisa nella materia

Delusi dalle ambiguità della mente, del linguaggio e delle scommesse soggettive, i pensatori del **Polo Ontico** decisero di espellere completamente l'osservatore umano dall'equazione, radicando la probabilità nella natura fisica oggettiva.

### Scena 1: John Venn e la nascita del frequentismo empirico (1866)

Nel 1866, il logico e filosofo britannico **John Venn** diede alle stampe *The Logic of Chance* ([Internet Archive](https://archive.org/details/logicofchance00venn)). Venn non sopportava l'idealismo continentale di chi fondava la scienza su dubbi o ignoranza soggettiva.

Cosa direbbe John Venn se potesse difendere la propria posizione? Ci direbbe qualcosa del genere:

> «Ascolto l'eleganza algebrica dei teorici della mente con ammirazione, ma con totale sgomento filosofico. Ci si invita a fondare una scienza quantitativa su che cosa? Sull'assenza di conoscenza! Ma dal nulla non nasce nulla: dall'ignoranza non si possono dedurre certezze matematiche né leggi fisiche per la società.
>
> Se entro in un laboratorio o negli uffici di una compagnia di assicurazioni marittime dei Lloyd's a Londra, a nessuno interessa cosa "pensa" la mia mente o quanto sia profondo il mio dubbio interiore. Ciò che conta è un dato brutale, materiale, osservabile: su centomila navi che hanno salpato dai porti britannici negli ultimi cinquant'anni, quante sono colate a picco? Questa proporzione numerica, osservata nel lungo andare di una serie uniforme di eventi, è un **fatto naturale**. È la frequenza relativa empirica.
>
> La probabilità non appartiene alle nostre credenze interiori: è incisa nella serie materiale degli eventi del mondo. E questo comporta un corollario che molti trovano scomodo ma che è ineludibile: **la probabilità del caso singolo non ha senso alcuno**. Chiedersi quale sia la probabilità che il sig. John Smith muoia all'età di 45 anni è una domanda priva di statuto logico; l'individuo o muore o sopravvive. Ha senso parlare di probabilità solo quando consideriamo il sig. Smith come membro intercambiabile di una classe di riferimento ampia e reale. Togliete l'uomo e i suoi dubbi; lasciate scorrere le serie empiriche: la probabilità è il limite materiale a cui convergono le cose.»

Per Venn, la probabilità è dunque una proprietà empirica delle serie storiche, analoga alla densità dell'acqua o al punto di fusione del piombo.

---

### Scena 2: Richard von Mises e il Collettivo infinito (1928)

Nel 1928, il matematico e ingegnere aerospaziale **Richard von Mises** portò l'intuizione di Venn al massimo vertice di rigore con il volume *Wahrscheinlichkeit, Statistik und Wahrheit* (*Probabilità, statistica e verità*).

Von Mises stabilì che ha senso parlare di probabilità solo ed esclusivamente all'interno di una classe ideale di eventi ripetibili chiamata **Kollektiv**: una successione infinita di prove empiriche $\omega = (x_1, x_2, x_3, \dots)$ caratterizzata da due assiomi inflessibili:
1. **Esistenza del limite:** La frequenza relativa con cui compare l'esito $A$ deve convergere a un limite numerico finito quando il numero di lanci tende all'infinito: $P(A) = \lim_{N \to \infty} \frac{N(A)}{N}$.

2. **Assioma di casualità (*Regellosigkeit*):** Tale limite deve rimanere identico per qualsiasi sottosuccessione infinita estratta applicando una "regola di selezione" che non guardi al futuro (ad esempio estraendo solo i lanci con indice pari, o solo i lanci con indice primo).

#### Il problema del caso singolo: L'esperimento della moneta fusa

Il frequentismo di von Mises ha dominato per quasi un secolo la pratica scientifica nei laboratori, ma presenta un tallone d'Achille epistemologico devastante: **il rifiuto assoluto del caso singolo**.

Immaginiamo questo esperimento mentale:
Prendiamo una moneta d'oro appena coniata dalla zecca. La posizioniamo su un dispositivo meccanico di lancio. Premiamo il pulsante: la moneta si alza, compie tre rotazioni e atterra mostrando **Testa**. Immediatamente dopo, raccogliamo la moneta con una pinza e la lasciamo cadere in un crogiolo d'acido nitrico bollente, dissolvendola per sempre in polvere liquida.

Ora poniamoci la domanda fondamentale: **qual era la probabilità che quella specifica moneta mostrasse testa in quell'unico lancio?**

Per Richard von Mises, la risposta è categorica e disarmante:
> «La domanda non ha alcun senso scientifico. Per una moneta distrutta non esiste alcun collettivo, non esiste alcuna sequenza infinita di prove. Parlare della probabilità di un singolo evento è un non-senso linguistico, analogo a chiedere quale sia la temperatura di una singola molecola isolata.»

Fermiamoci a riflettere: ciascuno di noi, ogni giorno, deve prendere decisioni capitali su **eventi singoli e irripetibili**:
* Qual è la probabilità che domani esploda la caldera vulcanica dei Campi Flegrei?
* Qual è la probabilità che una specifica startup informatica fallisca entro due anni?
* Qual è la probabilità che un paziente superi un'operazione al cuore a cui si sottopone una sola volta nella vita?

Se abbracciamo il frequentismo ortodosso, dobbiamo dichiarare che la probabilità non può guidare nessuna di queste scelte vitali, perché nessuno di questi eventi forma un collettivo infinito.

---

### Scena 3: Karl Popper e lo spettro della propensione (1959)

Scontento dell'incapacità del frequentismo di dare risposta al caso singolo, il celebre filosofo della scienza **Karl Popper** formulò nel 1959 l'**interpretazione propensionale** della probabilità:
> La probabilità non è un limite di frequenze su sequenze infinite, ma una **tendenza fisica reale**, una "disposizione o forza intrinseca" celata all'interno dell'assetto materiale dell'esperimento (la moneta, la gravità, il tavolo).

Per Popper, quando diciamo che la moneta ha una probabilità del 50% di mostrare testa, stiamo descrivendo una "propensione" reale della moneta a cadere in quel modo, esattamente come diciamo che il vetro ha la propensione fisica a frantumarsi se colpito con un martello.

#### Il paradosso di Humphreys (1985): La freccia del tempo spezzata

La proposta di Popper sembrava la quadratura del cerchio: salvare la realtà materiale della probabilità applicandola al caso singolo. Ma nel 1985, il filosofo della scienza **Paul W. Humphreys** inferse un colpo di grazia logico alla teoria delle propensioni.

Humphreys mise in luce una contraddizione strutturale insanabile tra la simmetria della matematica e l'asimmetria della fisica:
1. **La causalità fisica è asimmetrica nel tempo:** Le cause precedono sempre gli effetti. Una pietra lanciata contro una finestra ($C$) possiede una forte propensione a mandare in frantumi il vetro ($E$). Non ha invece alcun senso fisico sostenere che i cocci di vetro frantumati sul pavimento abbiano la propensione causale a viaggiare all'indietro nel tempo per costringere la mano del lanciatore a scagliare la pietra!
2. **La probabilità condizionata matematica è intrinsecamente simmetrica e reversibile:** Negli assiomi di Kolmogorov e nel Teorema di Bayes, se esiste la probabilità condizionata $P(E \mid C) > 0$, deve tassativamente esistere ed essere calcolabile la probabilità inversa: $P(\text{Causa} \mid \text{Effetto}) = \frac{P(\text{Effetto} \mid \text{Causa}) P(\text{Causa})}{P(\text{Effetto})}$.

Se le probabilità fossero propensioni fisiche causali, allora la probabilità condizionata inversa $P(\text{Causa} \mid \text{Effetto})$ dovrebbe rappresentare la *"propensione dell'effetto di generare retroattivamente la propria causa"*. Nel paradosso di Humphreys, significherebbe che il guscio d'uovo rotto sul pavimento possiede una misteriosa forza causale che scorre all'indietro nel tempo per farsi cadere dalle tue mani!

Poiché la matematica della probabilità può scorrere a ritroso come un filmato mentre le cause della fisica viaggiano a senso unico, **le propensioni causali non possono obbedire agli assiomi del calcolo delle probabilità**.

---

## Atto V: Guerra civile nei laboratori — Statistica Classica contro Statistica Bayesiana

Mentre i filosofi disputavano nelle accademie, gli scienziati nei laboratori dovevano prendere decisioni vitali: stabilire se un vaccino funzionasse o se una particella fosse stata scoperta. Tra gli anni Venti e Trenta del Novecento, queste tensioni teoriche sfociarono in una vera e propria guerra civile metodologica tra **Statistica Frequentista (Classica)** e **Statistica Bayesiana**.

### La fortezza ortodossa: Fisher, Neyman e Pearson
Guidata dal formidabile genetista britannico **Sir Ronald A. Fisher**, e in seguito formalizzata da **Jerzy Neyman** ed **Egon Pearson**, la statistica classica si prefisse di espellere dal metodo scientifico ogni traccia di credenza a priori soggettiva.

Il loro postulato di partenza era categorico: *Un'ipotesi scientifica non è una variabile aleatoria.* La teoria della relatività o è vera o è falsa; un algoritmo o scala in $O(n \log n)$ o non lo fa. Non ha alcun senso scientifico attribuire una probabilità a un'ipotesi: non si può scrivere $P(\text{Ipotesi})$.

L'unica cosa che si può calcolare matematicamente è la probabilità di ottenere i dati osservati presumendo che la nostra ipotesi non abbia alcun effetto (la cosiddetta **Ipotesi Nulla** $H_0$):

$$
\text{p-value} = P(\text{Dati uguali o più estremi di quelli osservati} \mid H_0)
$$

Se questo p-value risulta inferiore alla soglia convenzionale di 0,05, si respinge l'ipotesi nulla e si dichiara la scoperta "statisticamente significativa".

---

### Lo scandalo dell'Optional Stopping: Il paradosso di Alice e Bob

L'impianto frequentista sembra all'apparenza oggettivo e incorruttibile. Eppure cela un segreto inquietante: **la significatività scientifica non dipende soltanto dai dati fisici raccolti, ma dalle intenzioni mentali invisibili del ricercatore che ha condotto l'esperimento.**

Questo paradosso è splendidamente illustrato dall'enigma dell'**Optional Stopping** (formulato originariamente da Dennis Lindley nel 1957 e divulgato da Berger & Berry, 1988):

> Due ricercatori, Alice e Bob, vogliono verificare se una moneta sia truccata a favore di testa ($H_0: p = 0,5$ contro $H_1: p > 0,5$). Lavorando in modo indipendente, utilizzano la stessa moneta ed eseguono i lanci. Per una bizzarra coincidenza del destino, entrambi si ritrovano sul banco di laboratorio con lo **stesso identico dato empirico**:
> <p style="text-align: center; font-weight: bold; font-size: 1.1em; margin: 1em 0;">9 Teste, 3 Croci (12 lanci complessivi)</p>

Entrambi si siedono alla scrivania per calcolare il p-value e decidere se respingere l'ipotesi nulla alla soglia convenzionale di $\alpha = 0,05$.

#### Il calcolo di Alice (Fissa $N = 12$)
* Alice aveva deciso prima di iniziare: *"Eseguirò esattamente 12 lanci e poi mi fermerò."*
* Il suo modello probabilistico è una **distribuzione binomiale** ($N = 12$, con $k = 9$ teste osservate).
* La probabilità ad una coda di ottenere 9 o più teste su 12 lanci con una moneta equa ($p=0,5$) è la somma dei dati osservati e di quelli più estremi: $p\text{-value} = \sum_{k=9}^{12} \binom{12}{k} (0,5)^{12} = \frac{220 + 66 + 12 + 1}{4096} = \frac{299}{4096} \approx \mathbf{0,0730}$.

* Poiché $0,0730 > 0,05$, Alice conclude: **Risultato non significativo.** Non vi è evidenza sufficiente per respingere l'equità della moneta. Alice archivia i dati.

#### Il calcolo di Bob (Fissa $r = 3$ croci)
* Bob aveva invece deciso prima di iniziare: *"Continuerò a lanciare la moneta finché non vedrò comparire esattamente 3 croci, e a quel punto mi fermerò subito."*
* Il suo modello probabilistico è una **distribuzione binomiale negativa** (il numero di lanci $N$ necessari per osservare $r = 3$ croci).
* L'evento "sono necessari 12 o più lanci per osservare 3 croci" è matematicamente equivalente all'evento "osservare al massimo 2 croci nei primi 11 lanci": $p\text{-value} = \sum_{j=0}^{2} \binom{11}{j} (0,5)^{11} = \frac{1 + 11 + 55}{2048} = \frac{67}{2048} \approx \mathbf{0,0327}$.

* Poiché $0,0327 < 0,05$, Bob conclude: **Risultato statisticamente significativo!** Si respinge l'ipotesi nulla: la moneta è truccata ($p < 0,05$). Bob scrive un articolo e lo invia per la pubblicazione!

#### La vertigine metodologica
Fermiamoci un istante a riflettere sulla gravità di questo esito:

```
  Dati Fisici Reali sul Tavolo: [ T T T C T T C T T T C T ] (9 Teste, 3 Croci)

  ALICE (Fissa N = 12):
  Spazio degli esiti possibili: Tutte le sequenze di lunghezza 12.
  Dati osservati: 9 Teste.
  Dati PIÙ ESTREMI (fantasma): 10, 11, 12 Teste.
  p-value = P(9T) + P(10T) + P(11T) + P(12T) = 0.0730  ───► [NON SIGNIFICATIVO (p > 0.05)]

  BOB (Fissa r = 3 Croci):
  Spazio degli esiti possibili: Sequenze di lunghezza variabile N >= 3 che terminano alla 3ª Croce.
  Dati osservati: Fermo al lancio N = 12 con 3 croci.
  Dati PIÙ ESTREMI (fantasma): Fermo al lancio N = 13, 14, 15, ... (ovvero <= 2 croci nei primi 11 lanci).
  p-value = P(<= 2 Croci su 11 lanci) = 0.0327  ───────────► [SIGNIFICATIVO (p < 0.05)!]
```

Le evidenze fisiche sul tavolo — 9 teste e 3 croci — sono **identiche atomo per atomo**. Eppure Alice afferma che non c'è prova di trucco, mentre Bob afferma con rigore accademico che la moneta è truccata.

Perché accade questo? Perché nella statistica classica il p-value somma la probabilità di dati che **non si sono mai verificati nel mondo reale**:

$$
\text{p-value} = P(\text{Dati osservati } \mathbf{\cup \text{ Dati PIÙ ESTREMI di quelli osservati}} \mid H_0)
$$

I casi di 10, 11 e 12 teste sono "dati fantasma". E questi esiti ipotetici dipendono esclusivamente da **cosa passava per la testa del ricercatore prima di cominciare**! Se Bob fosse stato colto da amnesia subito dopo il dodicesimo lancio, nessun comitato scientifico al mondo avrebbe potuto decidere se la moneta fosse truccata senza riuscire a leggere il suo pensiero retrospettivo!

Come scrisse con ironia sferzante Harold Jeffreys:
> *"La statistica classica rifiuta un'ipotesi perché i dati osservati non si accordano con essa, basandosi sulla probabilità di cose che **avrebbero potuto accadere ma non sono accadute**."*

---

### Il contrattacco bayesiano: Il Principio di Verosimiglianza

Per i pensatori bayesiani, tra cui **Harold Jeffreys** ed **Edwin T. Jaynes** (*Probability Theory: The Logic of Science*, 2003; consultabile su [Bayes.wustl.edu](https://bayes.wustl.edu)), questo modo di procedere era una capitolazione razionale.

È come se sentissimo dire a Jaynes:

> «De Finetti ha visto giusto nel denunciare il mito delle "frequenze all'infinito" di Venn e von Mises: non possiamo osservare l'infinito. Ma ha sbagliato nel rifugiarsi in un soggettivismo arbitrario dove ognuno ha i suoi numeri personali e "tutto è lecito purché internamente coerente". Se due ingegneri analizzano lo stesso identico circuito o due fisici esaminano lo stesso fascio di particelle con le stesse identiche premesse, non devono avere opinioni divergenti: devono giungere alla **stessa identica assegnazione di probabilità**.
>
> La probabilità è l'estensione naturale della logica aristotelica al caso dell'informazione parziale. Dove Aristotele stabilisce la verità o falsità deduttiva ($0$ o $1$), la logica induttiva assegna un grado di plausibilità reale condizionato allo stato di conoscenza iniziale $I$: scriviamo sempre $P(A \mid I)$.
>
> E quando diciamo di "non sapere nulla", questo non è un vago sentimento di ignoranza: è un vincolo geometrico rigoroso di invarianza e massima entropia! Chi cerca la probabilità nella materia o nelle intenzioni segrete dello sperimentatore commette quella che ho battezzato la *Mind Projection Fallacy*: scambia la propria ignoranza o i propri modelli matematici con una proprietà fisica del mondo esterno. Il bayesianesimo oggettivo è la scienza rigorosa del ragionamento in condizioni di incompletezza.»

I bayesiani difendono con intransigenza il **Principio di Verosimiglianza**:
> *Tutta l'evidenza empirica che i dati forniscono sui parametri incogniti del modello è interamente contenuta nella funzione di verosimiglianza calcolata sui soli dati effettivamente osservati.*

Nel Teorema di Bayes, la **funzione di verosimiglianza** $P(\text{Dati} \mid \theta)$ per 9 teste e 3 croci è proporzionale a $\theta^{9}(1-\theta)^3$ sia sotto la regola di Alice sia sotto quella di Bob. I coefficienti binomiali diversi $\binom{12}{9}$ e $\binom{11}{2}$ non dipendono dal parametro $\theta$ e si elidono esattamente a denominatore durante la normalizzazione! 

Un ricercatore bayesiano aggiorna la propria convinzione a priori moltiplicandola per la verosimiglianza:

$$
P(\theta \mid \text{Dati}) \propto P(\theta) \cdot P(\text{Dati} \mid \theta)
$$

Per un bayesiano, Alice e Bob ottengono l'**identica distribuzione a posteriori**: se partono da una prior uniforme $\text{Beta}(1, 1)$, entrambi approdano a $\text{Beta}(10, 4)$. Le intenzioni nascoste dello sperimentatore sul momento in cui avrebbe preferito fermarsi non hanno alcun potere di alterare l'evidenza empirica della moneta.

---

## Atto VI: L'abisso subatomico — Il dilemma quantistico e il QBism

Proprio quando matematici e statistici ritenevano di aver esaurito ogni argomento di scontro tra epistemico e ontico, la fisica del Novecento fece crollare le certezze di entrambi i campi.

### Max Born e l'onda di probabilità (1926)
Nella meccanica quantistica, un elettrone è descritto da una funzione d'onda complessa e continua $\psi(x, t)$, che evolve nel tempo secondo l'equazione deterministica di Schrödinger. Ma quando un fisico inserisce un rilevatore per misurare dove si trovi l'elettrone, non osserva mai un'onda sparpagliata nello spazio: registra un lampo secco, puntiforme e discreto in una posizione precisa.

Nel 1926, **Max Born** formulò la sua celebre regola:
> *La funzione d'onda non è un'onda di materia fisica; il suo modulo quadro $|\psi(x, t)|^2$ rappresenta la densità di probabilità di trovare la particella nel punto $x$ all'istante $t$.*

La probabilità entrava per la prima volta nel cuore della materia fondamentale.

### I guanti di Einstein e la difesa del realismo locale (1935)
Albert Einstein rifiutò visceralmente questa conclusione (*"Dio non gioca a dadi con l'universo"*). 

Cosa direbbe Einstein? Ci direbbe qualcosa del genere:

> «Io non posso credere che la teoria fondamentale dell'universo sia basata sul puro azzardo ontico. Non posso credere che una particella scelga dove manifestarsi nel momento stesso in cui un fisico guarda dentro un cannocchiale, come se la Luna esistesse soltanto quando io decido di volgere lo sguardo al cielo!
>
> La meccanica quantistica formulata da Bohr e Born è senza dubbio un trionfo ingegneristico straordinario: le sue previsioni numeriche sono impeccabili. Ma confondere una teoria statisticamente utile con una descrizione ontologicamente completa della realtà è una resa epistemologica che non posso accettare. Quando Born scrive $P(x) = |\psi(x)|^2$, egli sta usando uno strumento epistemico eccellente per descrivere la nostra incapacità momentanea di penetrare le variabili subatomiche più profonde.
>
> Ricordate l'argomento che ho formulato nel 1935 con Podolsky e Rosen (il paradosso EPR), e l'analogia dei due guanti riposti in due scatole separate e spedite a grande distanza: se apro la mia scatola a Ginevra e vi trovo un guanto sinistro, so istantaneamente che a Tokyo c'è il guanto destro. Non vi è alcuna trasmissione misteriosa o telepatica più veloce della luce! Il guanto a Tokyo era destro fin dal momento in cui è stato chiuso nella scatola. La probabilità misurava soltanto la nostra ignoranza temporanea prima di aprire il coperchio, non la dissoluzione della realtà fisica oggettiva. Rinunciare al realismo locale significa trasformare la fisica in magia.»

Einstein voleva disperatamente che la probabilità quantistica fosse **epistemica**: una misura provvisoria dell'ignoranza umana su **variabili nascoste locali** che determinavano lo stato prima della misura.

### Il bivio fondamentale: Realtà fisica oggettiva o informazione dell'osservatore?

Il confronto tra Born ed Einstein evidenzia come persino la fisica subatomica non possa sfuggire alla contesa tra polo ontico e polo epistemico. Se la probabilità descrive i costituenti ultimi della materia, ci troviamo di fronte a due visioni inconciliabili del cosmo:

1. **La via ontica (L'indeterminismo intrinseco della natura):** Se la funzione d'onda $\psi$ descrive uno stato oggettivo del mondo fisico esterno, dobbiamo accettare che a livello fondamentale la natura sia autenticamente casuale. La probabilità non è una maschera della nostra ignoranza, ma una proprietà primaria, irriducibile e permanente della materia stessa.
2. **La via epistemica radicale (QBism — Quantum Bayesianism):** Elaborato da Christopher Fuchs, Rüdiger Schack e David Mermin ([arXiv:1311.5253](https://arxiv.org/abs/1311.5253)), il QBism porta il soggettivismo di de Finetti direttamente nel cuore della meccanica quantistica:
   > La funzione d'onda $|\psi\rangle$ non è un'onda materiale che fluttua nello spazio; è un catalogo personale dello sperimentatore, una regola razionale per aggiornare le proprie scommesse personali sui risultati delle future interazioni di laboratorio.

Per il QBism, il cosiddetto "collasso della funzione d'onda" non è una misteriosa catastrofe fisica che avviene all'esterno: è semplicemente un ordinario aggiornamento bayesiano della nostra mente all'arrivo di una nuova evidenza sperimentale. La probabilità rimane fedele al suo statuto epistemico: misura la nostra informazione, non la sostanza delle cose.

---

## Atto VII: Oltre la dicotomia — Il Terzo Asse: Metafisica contro Teoria

La controversia sulla probabilità non è solo semantica (mente vs mondo) o metodologica (soggettivo vs oggettivo). C'è una frattura ancora più radicale: **il Terzo Asse Metateorico**, ovvero la **confusione tra Mappa e Territorio**.

```
                      [ASSE 3: STATUTO METATEORICO]
                       Mappa vs Territorio
                                │
                                ▲
                   REIFICAZIONE / ESSENZIALISMO
                   (Il modello È la realtà fisica)
                   • Propensioni di Popper (1959)
                   • Kollektiv infiniti di von Mises (1928)
                   • Interpretazioni ψ-ontiche (Everett, Bohm)
                                │
                                │
      [ASSE 1: SEMANTICA]       │        [ASSE 2: METODOLOGIA]
  Epistemico ◄──────────────────┼──────────────────► Ontico
 (Stato della Mente)            │                  (Proprietà del Mondo)
                                │
                   STRUMENTALISMO / PRAGMATISMO
                   (Il modello è un'interfaccia cognitiva)
                   • Soggettivismo di de Finetti ("La probabilità non esiste")
                   • Logicismo di Jaynes ("Mind Projection Fallacy")
                   • QBism in Meccanica Quantistica
                                ▼
```

Come ha insegnato Edwin T. Jaynes con la sua celebre **Mind Projection Fallacy**:
> L'errore fondamentale consiste nell'attribuire la nostra ignoranza alla natura come se fosse una proprietà fisica, oppure nel proiettare i nostri costrutti matematici sul mondo come se fossero oggetti materiali.

La scienza entra in crisi non quando inventa modelli matematici astratti, ma **quando dimentica che sono modelli e pretende che la natura sia fatta della loro stessa stoffa**.

### Tavola Sinottica sui Tre Assi

| Scuola di Pensiero | Asse 1: Semantica *(Cos'è $P$?)* | Asse 2: Metodologia *(Come si assegna?)* | Asse 3: Statuto *(Mappa o Territorio?)* | Destino Metafisico del Modello |
| :--- | :--- | :--- | :--- | :--- |
| **Frequentismo Puro** *(von Mises)* | **Ontico:** Frequenza empirica asintotica. | **Oggettivo:** Misurabile empiricamente da campioni. | **Reificato (Metafisico):** Confonde la serie finita con il limite all'infinito. | Ipostatizza i *Kollektiv* infiniti non osservabili. |
| **Propensionismo** *(Popper)* | **Ontico:** Tendenza fisica causale della materia. | **Oggettivo:** Proprietà dell'assetto sperimentale. | **Iper-Reificato:** Attribuisce la probabilità alle cose. | Ricade nel paradosso di Humphreys e nella *virtus dormitiva*. |
| **$\psi$-ontica Quantistica** *(Everett, Bohm)* | **Ontico:** Onda materiale / stato fisico reale. | **Oggettivo:** Evoluzione deterministica di Schrödinger. | **Reificato Radicale:** L'equazione è la materia stessa. | Moltiplicazione esponenziale di universi paralleli. |
| **Probabilità Logica** *(Carnap)* | **Ontico-Formale (Fallito):** Proprietà logica oggettiva delle relazioni formali. | **Oggettivo:** Fissato a priori dalla sintassi linguistica. | **Formalista Astratto:** Chiuso nell'ontologia della semantica. | Paralizzato dall'arbitrio del parametro induttivo $\lambda$ e dal paradosso di Goodman. |
| **Bayesiano Oggettivo** *(Jaynes)* | **Epistemico:** Logica induttiva con info parziale. | **Oggettivo:** Vincolato da simmetrie e Massima Entropia. | **Strumentale:** Riconosce la *Mind Projection Fallacy*. | Separa il mondo fisico dal modello mentale di inferenza. |
| **Soggettivismo** *(de Finetti)* | **Epistemico:** Grado di fiducia (scommessa). | **Soggettivo:** Libero, vincolato dalla coerenza interna. | **Pragmatico Radicale:** *"La probabilità non esiste nel mondo."* | Rifiuta qualsiasi ontologia: la probabilità è interfaccia decisionale. |
| **QBism Quantistico** *(Fuchs, Mermin)* | **Epistemico:** Scommessa sulle esperienze future. | **Soggettivo:** Assegnazione bayesiana del ricercatore. | **Pragmatico / Strumentale:** Nessun collasso ontico nello spazio. | Salva la località relativistica dissolvendo l'onda materiale. |

---

## Laboratorio Computazionale: Sperimenta l'Optional Stopping

Tocca con mano nel tuo browser l'esperimento di Alice e Bob. Premi il pulsante **▶ Esegui** per verificare come gli stessi identici dati empirici ($9\text{T}, 3\text{C}$) producano p-value frequentisti divergenti a causa della regola di arresto, e come l'approccio bayesiano ristabilisca la coerenza dei dati:

<div class="psi-exec" data-packages="scipy" markdown="1">
```python
import numpy as np
from scipy import stats

# Dati sperimentali identici sul tavolo
teste = 9
croci = 3
totale = teste + croci
p0 = 0.5  # Ipotesi nulla: moneta non truccata

# 1. Calcolo di Alice (Fissa N = 12 lanci - Modello Binomiale)
# p-value = P(K >= 9 | N=12, p=0.5)
p_val_alice = 1.0 - stats.binom.cdf(teste - 1, totale, p0)

# 2. Calcolo di Bob (Fissa r = 3 croci - Modello Binomiale Negativa)
# p-value = P(N >= 12 | r=3, p=0.5) = P(croci <= 2 nei primi 11 lanci)
p_val_bob = stats.binom.cdf(croci - 1, totale - 1, p0)

print(f"===========================================================")
print(f"DATI SPERIMENTALI OSSERVATI: {teste} Teste, {croci} Croci (12 lanci)")
print(f"===========================================================")
print(f"\n[ANALISI FREQUENTISTA CLASSICA]")
print(f"Alice (N=12 fisso):  p-value = {p_val_alice:.4f}")
print(f"  -> Verdetto (alpha=0.05): {'Rifiuta H0 (Truccata!)' if p_val_alice < 0.05 else 'Accetta H0 (Nessuna prova di trucco)'}")
print(f"Bob   (r=3 fisse):   p-value = {p_val_bob:.4f}")
print(f"  -> Verdetto (alpha=0.05): {'Rifiuta H0 (Truccata!)' if p_val_bob < 0.05 else 'Accetta H0 (Nessuna prova di trucco)'}")

# 3. Analisi Bayesiana (Principio di Verosimiglianza)
# Con prior uniforme Beta(1, 1), la posterior è Beta(1 + 9, 1 + 3) = Beta(10, 4)
alpha_post = 1 + teste
beta_post = 1 + croci
media_post = alpha_post / (alpha_post + beta_post)
ci_low = stats.beta.ppf(0.025, alpha_post, beta_post)
ci_high = stats.beta.ppf(0.975, alpha_post, beta_post)

print(f"\n[ANALISI BAYESIANA (Principio di Verosimiglianza)]")
print("La funzione di verosimiglianza (P invertita) P(Dati|p) e' proporzionale a p^9 * (1-p)^3 per ENTRAMBI!")
print("Nessun dato fantasma viene sommato.")
print(f"Distribuzione a posteriori congiunta: Beta({alpha_post}, {beta_post})")
print(f"Stima di p (media a posteriori): {media_post:.3f}")
print(f"Intervallo di credibilità al 95%: [{ci_low:.3f}, {ci_high:.3f}]")
```
</div>

---

## Sintesi: Il Tribunale di Wesley Salmon

Mettiamo alla prova le quattro interpretazioni storiche secondo i tre criteri di adeguatezza formulati da Wesley Salmon:

| Teoria | Polo | 1. Ammissibilità *(Matematica)* | 2. Accertabilità *(Misura empirica)* | 3. Applicabilità *(Guida all'azione)* | Il Vicolo Cieco Concettuale |
|---|:---:|:---:|:---:|:---:|---|
| **Classica (Laplace)** | Epistemico | ✅ Negli insiemi finiti | ⚠️ Solo se c'è perfetta simmetria | ✅ Utile nei giochi equi | Collassa negli spazi continui (Paradosso di Bertrand). |
| **Frequentista (von Mises)** | Ontico | ✅ Assiomatizzata su Kollektiv | ✅ Misurabile empiricamente | ❌ Muta sul caso singolo | Nega la probabilità agli eventi irripetibili (Moneta fusa). |
| **Propensionale (Popper)** | Ontico | ❌ Viola gli assiomi di Bayes | ⚠️ Difficile da isolare | ⚠️ Ambigua per decidere | Paradosso di Humphreys (inversione temporale causale). |
| **Soggettiva (de Finetti)** | Epistemico | ✅ Garantita dal principio di coerenza | ⚠️ Tramite quote di scommessa | ✅ La guida universale alla scelta | Rischio di arbitrio totale nelle credenze a priori. |

---

## Il Takeaway per l'Ingegnere del Software

Come informatici, programmatori e futuri architetti di sistemi intelligenti, cosa impariamo da questa vertigine epistemologica?

### 1. Il Pluralismo Pragmatico
La probabilità non è un dogma di fede, ma un prisma concettuale che dobbiamo saper orientare a seconda del problema ingegneristico:
* **Nei Big Data, nei server distribuiti e nel monitoraggio di rete**, dove fluiscono miliardi di pacchetti e log, il **frequentismo** è lo strumento principe: le medie empiriche convergono con straordinaria stabilità ai limiti asintotici.
* **Nella Cybersecurity, nell'affidabilità di sistemi critici e nel Machine Learning**, dove affrontiamo attacchi informatici inediti o decisioni mediche ad alto rischio in condizioni di scarsità di dati, l'approccio **bayesiano** è l'unico capace di guidare razionalmente l'aggiornamento della credenza.

### 2. Cos'è un A/B Test e il "Peeking Problem" moderno

#### Cos'è un A/B Test?
Nell'ingegneria del software, nello sviluppo web e nei sistemi digitali ad alto traffico, un **A/B test** è un **esperimento controllato e randomizzato** (*Randomized Controlled Trial*) condotto direttamente in produzione su utenti reali.

Il principio operativo è strutturato in tre pilastri:
1. **Suddivisione casuale del traffico (Traffic Splitting):** Quando un utente accede all'applicazione o al sito, un meccanismo di instradamento deterministico (spesso basato su una funzione di hash del suo identificativo utente) lo assegna in modo casuale e trasparente a una di due varianti:
   - **Gruppo A (Controllo):** visualizza la versione attualmente in uso (*baseline*, ad esempio il layout corrente di una pagina, il colore originario di un pulsante di acquisto o l'algoritmo di ricerca standard).
   - **Gruppo B (Trattamento):** visualizza una variante modificata del sistema (ad esempio una nuova interfaccia grafica, una procedura di checkout snellita o una strategia di raccomandazione alternativa).
2. **Misurazione della metrica obiettivo (KPI):** Durante la navigazione, il sistema traccia le interazioni per misurare una o più metriche chiave di prestazione (*Key Performance Indicators*), come il **tasso di conversione** (*conversion rate*, la percentuale di utenti che compie l'azione desiderata: acquisto, iscrizione, clic), il tempo di permanenza o la latenza percepita.
3. **Inferenza statistica formale:** L'obiettivo scientifico è determinare se la variante B apporta un reale miglioramento misurabile rispetto alla variante A, oppure se le discrepanze registrate siano compatibili con il puro rumore statistico.

Formalmente, si imposta un test di ipotesi frequentista:
- **Ipotesi Nulla ($H_0$):** La variante B non apporta alcun beneficio rispetto alla versione A ($p_B \le p_A$).
- **Ipotesi Alternativa ($H_1$):** La variante B produce un incremento significativo delle prestazioni ($p_B > p_A$).

Il protocollo statistico classico impone di determinare a priori la **dimensione campionaria fissa $N$** (tramite un'analisi di potenza, stabilendo ad esempio che servono $N = 10.000$ visite per gruppo per avere una potenza dell'80% a un livello di significatività $\alpha = 0,05$) e di **attendere la conclusione dell'intero esperimento prima di calcolare il p-value**.

#### Il vizio del "Peeking" (Optional Stopping)
Nelle aziende tecnologiche accade tuttavia quotidianamente una distorsione metodologica gravissima:
Il team rilascia l'A/B test e il manager consulta la dashboard di monitoraggio in tempo reale più volte al giorno (*data peeking*). Non appena vede che il p-value scende temporaneamente sotto $0,05$ (magari al terzo giorno, dopo appena 1.200 visite), esulta, proclama la superiorità della variante B e **interrompe immediatamente l'esperimento in anticipo** per rilasciare la nuova versione a tutti gli utenti.

Comportandosi così, il team ha replicato alla perfezione la condotta di **Bob** nell'esperimento della moneta:
- Interrompere la raccolta dei dati al primo momento in cui si osserva un esito favorevole trasforma la procedura in un **Optional Stopping**.
- Questa pratica annienta il livello di significatività nominale del 5%: la probabilità reale di incorrere in un **falso positivo** (credere che la variante B sia migliore quando invece è identica o persino peggiore di A) **esplode al 30-40% o più**!
- Innumerevoli linee di codice o modifiche di design vengono così celebrate e messe in produzione aziendale sulla base di pure fluttuazioni casuali scambiate per verità scientifiche.

### 3. La Mappa non è il Territorio
Quando addestriamo un classificatore di Deep Learning e il modello restituisce in output `confidence = 0.98` per una previsione, quel numero misura lo stato di attivazione interna dei pesi della rete (la mappa), non una proprietà metafisica oggettiva del mondo reale (il territorio). Dimenticarlo significa cadere nella *Mind Projection Fallacy* e costruire sistemi automatizzati ciechi di fronte alle proprie allucinazioni.

---

## Epilogo: Lo specchio della nostra miopia

Siamo partiti dal contenitore vuoto e perfetto di Kolmogorov. Quando abbiamo provato a riempirlo con il disordine del mondo reale, quel contenitore si è fratturato in mille pezzi: dalle quote dei bookmaker londinesi alla moneta fusa nella fornace, dalla freccia del tempo infranta di Humphreys alla disputa di Alice e Bob fino all'abisso del mondo subatomico e al dilemma quantistico.

Questa è la bellezza vertiginosa della probabilità: **la disciplina più esatta della scienza contemporanea poggia su un mistero filosofico irrisolto**.

Se torniamo con la mente al demone di Laplace — a quell'intelletto supremo capace di conoscere la traiettoria di ogni atomo dell'universo —, ci rendiamo conto che per quell'entità la probabilità svanirebbe all'istante nel nulla.
È possibile che per secoli abbiamo costruito la nostra matematica più raffinata, le nostre equazioni più belle e i nostri algoritmi più potenti non su una proprietà fisica del cosmo, ma unicamente sull'**infinita, feconda e inevitabile misura della nostra ignoranza umana**.

---

## Riferimenti e Fonti Primarie (Open Access Online)

Tutti i testi storici ed epistemologici citati sono liberamente consultabili attraverso archivi aperti e repository accademici:

* **Andrej N. Kolmogorov (1933)** — *Grundbegriffe der Wahrscheinlichkeitsrechnung* (trad. ingl. *Foundations of the Theory of Probability*, Chelsea, 1950/1956). Testo fondativo accessibile su [Internet Archive](https://archive.org/details/foundationsofthe00kolm).
* **Pierre-Simon Laplace (1814)** — *Essai philosophique sur les probabilités* (trad. ingl. *A Philosophical Essay on Probabilities*, 1902). Disponibile su [Internet Archive](https://archive.org/details/philosophicaless00laplrich).
* **Joseph Bertrand (1889)** — *Calcul des probabilités*, Gauthier-Villars, Parigi. Testo originale custodito presso la [Biblioteca Nazionale di Francia (Gallica BnF)](https://gallica.bnf.fr/ark:/12148/bpt6k290089).
* **Bruno de Finetti (1937)** — *La prévision: ses lois logiques, ses sources subjectives*, Annales de l'Institut Henri Poincaré. Testo completo ad accesso aperto su [NUMDAM](http://www.numdam.org/item/AIHP_1937__7_1_1_0.pdf).
* **Thomas Bayes & Richard Price (1763)** — *An Essay towards solving a Problem in the Doctrine of Chances*, Philosophical Transactions of the Royal Society of London. Disponibile su [The Royal Society Publishing](https://doi.org/10.1098/rstl.1763.0053).
* **John Venn (1888, 3ª ed.)** — *The Logic of Chance*, Macmillan, Londra. Conservato su [Internet Archive](https://archive.org/details/logicofchance00venn).
* **Edwin T. Jaynes (2003)** — *Probability Theory: The Logic of Science*, Cambridge University Press. Risorse, capitoli storici e manoscritti d'autore liberamente consultabili presso il [Washington University Open Repository (bayes.wustl.edu)](https://bayes.wustl.edu).
* **Christopher A. Fuchs, N. David Mermin, Rüdiger Schack (2014)** — *An Introduction to QBism with an Application to the Locality of Quantum States*, American Journal of Physics. Articolo e preprint liberamente scaricabili da [arXiv:1311.5253](https://arxiv.org/abs/1311.5253).
* **Paul W. Humphreys (1985)** — *Why Propensities Cannot Be Probabilities*, The Philosophical Review, 94(4), 557–570.
* **James O. Berger & Donald A. Berry (1988)** — *Statistical Analysis and the Illusion of Objectivity*, American Scientist, 76(2), 159–165.
* **Wesley C. Salmon (1966)** — *The Foundations of Scientific Inference*, University of Pittsburgh Press. Si veda l'ampia sintesi critica di Alan Hájek su *Interpretations of Probability* nella [Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/probability-interpret/).

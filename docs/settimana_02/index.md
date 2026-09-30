[:material-presentation: Apri Slide della Lezione](slides/index.html){ .md-button .md-button--primary target="_blank" } [:material-presentation-play: Slide estese (con ripasso)](slides/extended.html){ .md-button target="_blank" }

# Settimana 2 — Dall'effetto alla causa: alberi di probabilità e Teorema di Bayes
*Come si torna indietro da ciò che vediamo (un allarme, un test positivo, un crash) a ciò che non vediamo (un attacco, una malattia, un bug), e perché quasi tutti, medici compresi, sbagliano questo conto.*

---

## Prima di cominciare: che cosa ci serve dalla Settimana 1

Questa settimana useremo continuamente pochi strumenti che abbiamo costruito nella [Settimana 1](../settimana_01/index.md). Li ripassiamo qui, con calma, così che nessun simbolo delle prossime pagine arrivi di sorpresa. Se uno di questi punti ti sembra poco chiaro, vale la pena rileggere la sezione indicata prima di andare avanti.

* **Esperimento, esito, spazio campionario $\Omega$.** Un *esperimento* è qualunque processo dal risultato incerto (lanciare un dado, ricevere una connessione di rete, eseguire un programma). Ogni risultato possibile è un *esito*. L'insieme di tutti gli esiti possibili si chiama **spazio campionario** e si indica con la lettera greca $\Omega$ (omega).
* **Evento.** Un *evento* è un sottoinsieme di $\Omega$, cioè un gruppo di esiti di cui ci interessa sapere se si verifica. Gli eventi si indicano con lettere maiuscole: $A$, $B$, $H$, $E$…
* **Complementare $A^c$.** L'evento «$A$ **non** si verifica». Contiene tutti gli esiti di $\Omega$ che non stanno in $A$. Vale sempre $P(A^c) = 1 - P(A)$.
* **Intersezione $A \cap B$.** L'evento «si verificano **sia** $A$ **sia** $B$».
* **Eventi disgiunti.** Due eventi che non possono verificarsi insieme: $A \cap B = \emptyset$ (l'insieme vuoto).
* **Gli assiomi di Kolmogorov.** Ogni probabilità è un numero tra 0 e 1; l'evento certo $\Omega$ ha probabilità 1; se due (o più) eventi sono disgiunti, la probabilità che se ne verifichi uno è la somma delle loro probabilità.
* **Probabilità condizionata** ([Settimana 1, §7](../settimana_01/index.md#7-larrivo-dellinformazione-il-condizionamento-come-zoom-nello-spazio-campionario)). Se sappiamo che $B$ si è verificato, la probabilità di $A$ diventa

    $$
    P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \qquad \text{purché } P(B) > 0.
    $$

    Si legge «probabilità di $A$ **dato** $B$». L'immagine da ricordare è lo **zoom**: $B$ diventa il nostro nuovo universo, e dentro di esso misuriamo quanta parte è occupata da $A$.
* **Regola del prodotto** ([Settimana 1, §8](../settimana_01/index.md#8-la-regola-del-prodotto-e-la-scomposizione-sequenziale)). Rigirando la formula precedente:

    $$
    P(A \cap B) = P(B) \cdot P(A \mid B) = P(A) \cdot P(B \mid A).
    $$

* **Indipendenza** ([Settimana 1, §9](../settimana_01/index.md#9-indipendenza-stocastica-e-il-trabocchetto-fondamentale)). $A$ e $B$ sono indipendenti se sapere che uno si è verificato non cambia la probabilità dell'altro: $P(A \mid B) = P(A)$, cioè $P(A \cap B) = P(A)\,P(B)$.

    *Esempio.* Lanciamo due dadi. Qual è la probabilità di avere 6 sul primo **e** un numero pari sul secondo? I due dadi non si influenzano, quindi il secondo fattore della regola del prodotto non cambia: $\frac{1}{6} \cdot \frac{3}{6} = \frac{1}{12}$. Controllo contando: su 36 coppie equiprobabili le favorevoli sono $(6,2)$, $(6,4)$, $(6,6)$, cioè $3/36 = 1/12$.

* **Indipendenza di tre o più eventi.** Per tre eventi $A$, $B$, $C$ non basta controllare le coppie. Sono **mutuamente indipendenti** solo se valgono tutte e quattro le condizioni:

    $$
    P(A \cap B) = P(A)P(B), \quad P(A \cap C) = P(A)P(C), \quad P(B \cap C) = P(B)P(C), \quad P(A \cap B \cap C) = P(A)P(B)P(C).
    $$

    Perché serve anche l'ultima? Lanciamo due monete. $A$ = «testa sulla prima», $B$ = «testa sulla seconda», $C$ = «le due monete danno lo stesso risultato». Ogni coppia è indipendente (controlla: ogni evento vale $\frac12$, ogni intersezione a due vale $\frac14$). Ma se sappiamo che valgono $A$ e $B$, allora $C$ è certo: infatti $P(A \cap B \cap C) = \frac14$ e non $\frac18$. Con più di tre eventi vale la stessa regola: il prodotto deve funzionare per **ogni** gruppo di almeno due eventi.

!!! tip "Un'abitudine da prendere subito: leggere ad alta voce la barra verticale"
    Il simbolo $P(A \mid B)$ va sempre letto per intero: «probabilità di $A$ **sapendo che** è accaduto $B$». Tutto ciò che sta **a destra** della barra è l'informazione che abbiamo già; ciò che sta **a sinistra** è quello di cui ci chiediamo la probabilità. Questa settimana l'intero problema nasce dallo scambiare ciò che sta a destra con ciò che sta a sinistra.

---

## Prologo: scatta un allarme

Immagina di lavorare nel gruppo di sicurezza di un'azienda. Sulla rete aziendale è installato un **IDS** (*Intrusion Detection System*, «sistema di rilevamento delle intrusioni»): un software che osserva ogni connessione in arrivo e fa scattare un allarme quando la connessione gli sembra un attacco.

Il produttore dell'IDS ti fornisce due numeri:

* quando una connessione **è** un attacco, l'IDS lo riconosce e fa scattare l'allarme nel **99%** dei casi;
* quando una connessione **è** traffico legittimo (cioè innocuo), l'IDS sbaglia e fa scattare l'allarme solo nell'**1%** dei casi.

Sai inoltre, dai dati degli anni passati, che l'**1%** delle connessioni che arrivano alla tua rete è malevolo.

Sono le tre di notte. Sul tuo telefono arriva la notifica: **è scattato un allarme.**

!!! question "La Domanda Guida"
    **Qual è la probabilità che si tratti davvero di un attacco?**

    Prima di proseguire, scegli una risposta e scrivila da qualche parte:

    * (a) circa il 99%
    * (b) circa il 90%
    * (c) circa il 50%
    * (d) meno del 10%

Se hai scelto (a), sei in ottima compagnia: è la risposta che dà la maggior parte delle persone, anche esperte, come vedremo tra poco. Non riveliamo ancora la risposta giusta. La troveremo insieme, e il percorso per arrivarci è il vero contenuto di questa settimana.

Per ora fissiamo un punto. Diamo un nome agli eventi:

* $H$ = «la connessione è un attacco» (la lettera $H$ sta per *ipotesi*, in inglese *hypothesis*: è la cosa nascosta che vorremmo conoscere);
* $E$ = «è scattato l'allarme» (la lettera $E$ sta per *evidenza*: è la cosa che osserviamo).

Il produttore ci ha dato $P(E \mid H) = 0.99$: la probabilità dell'**allarme** sapendo che c'è un **attacco**. La domanda chiede invece $P(H \mid E)$: la probabilità dell'**attacco** sapendo che c'è un **allarme**. Sono due numeri diversi: gli stessi due eventi compaiono in posizioni invertite rispetto alla barra.

Scambiare l'uno per l'altro è un errore così comune da avere un nome: **confusione dell'inverso**. Nella Settimana 1 abbiamo visto che $P(A \mid B)$ e $P(B \mid A)$ hanno lo **stesso numeratore**, $P(A \cap B)$, ma **denominatori diversi**, $P(B)$ e $P(A)$. Questa settimana scopriremo che la differenza tra quei due denominatori può essere enorme.

!!! note "Due direzioni del ragionamento"
    * **In avanti (dalla causa all'effetto):** «*Se* c'è un attacco, con che probabilità scatta l'allarme?» È $P(E \mid H)$. È la domanda che si pone chi **costruisce** il rilevatore, e la risposta di solito la conosciamo.
    * **All'indietro (dall'effetto alla causa):** «È scattato l'allarme: con che probabilità c'è un attacco?» È $P(H \mid E)$. È la domanda che si pone chi **usa** il rilevatore, e la risposta va calcolata.

    Nella Settimana 1 abbiamo usato il condizionamento quasi sempre in avanti. Questa settimana impariamo a percorrerlo all'indietro.

---

## Atto I: Il dramma storico — la formula rimasta nel cassetto

### Tunbridge Wells, 1761: un manoscritto mai pubblicato

Il reverendo **Thomas Bayes** era un ministro presbiteriano inglese «dissenziente», cioè appartenente a una chiesa protestante separata dalla Chiesa d'Inghilterra ufficiale. Si occupava anche di matematica ed era membro della *Royal Society*, la più antica accademia scientifica britannica. Morì a Tunbridge Wells, nel sud dell'Inghilterra, nel 1761. Tra le sue carte c'era un lavoro matematico che non aveva mai pubblicato.

Lo trovò l'amico **Richard Price**, anch'egli ministro dissenziente, filosofo e matematico. Price lo rielaborò, gli aggiunse un'introduzione, delle note e un'appendice di esempi numerici, e lo spedì a **John Canton**, membro della Royal Society, con una lettera datata *Newington-Green, 10 novembre 1763*. Il saggio fu letto alla Society il 23 dicembre 1763 e pubblicato nella rivista della Society, le *Philosophical Transactions* (vol. 53, pp. 370–418), con il titolo *An Essay towards solving a Problem in the Doctrine of Chances* («Saggio per risolvere un problema nella dottrina delle probabilità»). Puoi sfogliare la scansione originale su [Internet Archive](https://archive.org/details/philtrans09948070).

**Perché Bayes non lo pubblicò?** La risposta onesta è: *non lo sappiamo*. Abbiamo però due indizi.

1. Nella lettera a Canton, Price racconta che Bayes aveva risolto il problema partendo da un **postulato**, cioè da un'ipotesi di partenza accettata senza dimostrazione: all'inizio, prima di osservare qualunque dato, tutti i valori possibili della probabilità sconosciuta vanno considerati ugualmente plausibili. Price aggiunge che Bayes *«afterwards considered, that the postulate on which he had argued might not perhaps be looked upon by all as reasonable»* («in seguito considerò che il postulato su cui aveva ragionato forse non sarebbe stato ritenuto ragionevole da tutti»). Per questo Bayes presentò il risultato in un'altra forma e lo giustificò in una nota a parte (uno *Scholium*).
2. Lo storico della statistica Stephen Stigler ([2013](https://arxiv.org/abs/1310.0173)) avanza l'ipotesi che Bayes abbia messo da parte il lavoro *«possibly because he did not regard his solution as mathematically fully satisfactory»* («forse perché non considerava la sua soluzione matematicamente del tutto soddisfacente»): il metodo con cui approssimava un certo calcolo non lo convinceva.

Tieni a mente il primo indizio, perché è il cuore del dramma: **il dubbio di Bayes riguardava il punto di partenza**, cioè quanto credere alle varie ipotesi *prima* di vedere i dati. Tra poco daremo a questo punto di partenza un nome, *prior*, e vedremo che è esattamente l'ingrediente che fa sbagliare quasi tutti nella domanda dell'allarme. Nella Settimana 1 lo abbiamo già incontrato sotto un'altra veste: il *principio di indifferenza* di Laplace («se non so nulla, assegno a tutti i casi la stessa probabilità») e le sue crisi.

### Dentro il saggio: una piccola grammatica, 170 anni prima di Kolmogorov

La prima sezione del saggio è sorprendente per chi ha appena studiato gli assiomi di Kolmogorov (1933). Bayes definisce, con parole sue, quasi tutti gli oggetti che conosciamo:

* eventi **inconsistent** (oggi diremmo *disgiunti*): *«when if one of them happens, none of the rest can»* («quando, se uno di essi accade, nessuno degli altri può accadere»);
* la **probabilità** definita come rapporto tra il valore di un'aspettativa e il valore della posta, cioè in termini di **scommessa**: è parente stretta del «prezzo equo» di de Finetti che abbiamo visto nella Settimana 1;
* eventi **independent**, quando *«the happening of any one of them does neither increase nor abate the probability of the rest»* («il verificarsi di uno di essi non aumenta né diminuisce la probabilità degli altri»): è la nostra definizione $P(A \mid B) = P(A)$;
* l'**additività** per eventi disgiunti (il terzo assioma di Kolmogorov);
* la **regola del prodotto**: la probabilità che due eventi accadano entrambi si ottiene dalla probabilità del primo e dalla probabilità del secondo *supponendo* che il primo sia accaduto;
* e infine (Proposizione 5) il passo decisivo: se si scopre che il **secondo** evento è accaduto, la probabilità che sia accaduto **anche il primo** si ottiene dividendo la probabilità di «entrambi» per la probabilità del secondo. In simboli moderni è $P(A \mid B) = P(A \cap B)/P(B)$, usata però **all'indietro**: dall'evento che abbiamo osservato all'evento che non vediamo.

Una curiosità importante: **la formula che oggi chiamiamo «Teorema di Bayes» non compare nel saggio nella forma in cui la scriviamo noi.** C'è la Proposizione 5, che ne è il nucleo, applicata a un problema molto più difficile, quello del tavolo.

### Il tavolo quadrato

Il problema centrale del saggio è descritto con un esperimento mentale. C'è un **tavolo quadrato**, costruito e livellato con cura, in modo che una palla lanciata su di esso abbia la stessa probabilità di fermarsi in qualunque zona di uguale area.

1. Si lancia una prima palla, chiamata **W**. Nel punto in cui si ferma si traccia una linea parallela a un lato del tavolo. Questa linea divide il tavolo in due parti.
2. Poi si lancia una seconda palla, **O**, molte volte. Ogni volta si annota se O si è fermata dalla parte «di qua» della linea di W (Bayes chiama questo fatto *evento M*) oppure no.
3. **Il problema:** sapendo soltanto *quante volte* M è accaduto e quante no, che cosa possiamo dire su **dove si trova la linea di W**?

La posizione di W è la **causa nascosta**; i conteggi dei lanci di O sono l'**evidenza** che osserviamo. Ogni nuovo lancio di O ci dice qualcosa in più su W: se O cade spesso «di qua», la linea deve essere lontana, dall'altra parte del tavolo. È esattamente lo schema di questa settimana: *credenza iniziale → osservazione → credenza aggiornata*. Nel laboratorio in fondo alla pagina simuleremo proprio questo tavolo.

!!! warning "Attenzione alla leggenda"
    In molti libri e video divulgativi si racconta che Bayes stesse **di spalle** al tavolo mentre un assistente lanciava le palle e gli riferiva i risultati. È una bella drammatizzazione, ma **nel saggio non c'è**: nel testo originale ci sono solo un tavolo, due palle e un conteggio. Si può usare l'immagine per ricordare il problema, purché si sappia che è un'aggiunta moderna.

### Price, il sole che sorge e l'ombra di Hume

Nell'appendice scritta da Price compare l'esempio che rese celebre il saggio. Immagina una persona appena venuta al mondo (*«a person just brought forth into this world»*) che vede sorgere il Sole per la prima volta. Quando il Sole tramonta, non sa se lo rivedrà. Quando lo vede tornare, secondo Price avrebbe già una scommessa di **3 contro 1** a favore di un nuovo ritorno, e la sua fiducia crescerebbe a ogni alba osservata, senza però diventare mai certezza assoluta. (Nel laboratorio verificheremo da dove viene quel «3 contro 1».)

Il tema di fondo è l'**induzione**: il ragionamento che dal ripetersi di qualcosa nel passato ricava attese sul futuro. Pochi anni prima il filosofo scozzese **David Hume** (*An Enquiry concerning Human Understanding*, 1748, su [Project Gutenberg](https://www.gutenberg.org/ebooks/9662)) aveva sostenuto che questo passaggio non si può giustificare con la sola logica: perché il fatto che il Sole sia sempre sorto dovrebbe autorizzarci ad aspettarci che sorga domani?

Nella lettera a Canton, Price dichiara uno scopo **teologico**: mostrare che nel mondo esistono *«fixt laws»* («leggi fisse») e così *«confirm the argument taken from final causes for the existence of the Deity»* («confermare l'argomento tratto dalle cause finali a favore dell'esistenza di Dio»). **Hume non viene mai nominato.**

Il legame con Hume è quindi una **ricostruzione degli storici**, non una dichiarazione degli autori. Stigler ([2013](https://arxiv.org/abs/1310.0173)) ha scoperto che la ristampa separata del saggio curata da Price nel 1764 porta un titolo del tutto diverso: *A Method of Calculating the Exact Probability of All Conclusions founded on Induction* («Un metodo per calcolare la probabilità esatta di tutte le conclusioni fondate sull'induzione»). Price usò poi lo stesso argomento, in un'opera del 1767, contro la tesi di Hume sui miracoli. Stigler conclude che Price *«almost surely»* («quasi certamente»), e Bayes *«not improbably»* («non improbabilmente»), intrapresero il lavoro cercando una risposta a Hume.

Per noi informatici il messaggio è questo: **il Teorema di Bayes nasce come teoria dell'apprendimento dall'esperienza**. Non dice *se* i dati debbano cambiare le nostre convinzioni, ma **di quanto**.

### Laplace e il «principio fondamentale»

Il saggio di Bayes restò quasi ignorato. Nel 1774 il venticinquenne francese **Pierre-Simon Laplace**, senza conoscerlo, pubblicò una memoria intitolata *Mémoire sur la probabilité des causes par les évènements* («Memoria sulla probabilità delle cause a partire dagli eventi», consultabile su [Gallica](https://gallica.bnf.fr/ark:/12148/bpt6k77596b)) e arrivò alla stessa idea, in forma più generale e più chiara.

Quarant'anni dopo, nel *Saggio filosofico sulle probabilità* (1814), Laplace la enuncia come «sesto principio». Ecco il passo, dalla traduzione inglese del 1902 (liberamente leggibile su [Project Gutenberg](https://www.gutenberg.org/files/58881/58881-h/58881-h.htm)), seguito da una nostra traduzione in italiano:

> *«The probability of the existence of any one of these causes is then a fraction whose numerator is the probability of the event resulting from this cause and whose denominator is the sum of the similar probabilities relative to all the causes; if these various causes, considered a priori, are unequally probable, it is necessary, in place of the probability of the event resulting from each cause, to employ the product of this probability by the possibility of the cause itself. This is the fundamental principle of this branch of the analysis of chances which consists in passing from events to causes.»*

> «La probabilità dell'esistenza di una qualunque di queste cause è allora una frazione il cui numeratore è la probabilità dell'evento derivante da questa causa e il cui denominatore è la somma delle probabilità simili relative a tutte le cause; se queste diverse cause, considerate *a priori*, sono disugualmente probabili, bisogna usare, al posto della probabilità dell'evento derivante da ciascuna causa, il prodotto di questa probabilità per la possibilità della causa stessa. Questo è il principio fondamentale di quel ramo dell'analisi delle probabilità che consiste nel **passare dagli eventi alle cause**.»

Rileggi il passo dopo aver studiato l'Atto IV: è, parola per parola, il Teorema di Bayes. Laplace riconosce il suo predecessore con un giudizio misurato: Bayes vi era arrivato *«in a refined and very ingenious manner, although a little perplexing»* («in modo raffinato e molto ingegnoso, anche se un po' oscuro»). Nella stessa opera Laplace riprende il sole di Price: considerando 5000 anni di storia documentata, cioè 1.826.213 giorni, conclude che si può scommettere **1.826.214 contro 1** che il Sole sorgerà domani.

La formula porta dunque il nome di chi la lasciò nel cassetto, non di chi la trasformò in uno strumento di lavoro. Gli storici chiamano questo fenomeno, con un po' di ironia, *legge di Stigler dell'eponimia*: nessuna scoperta scientifica porta il nome del suo vero scopritore.

### Il dramma moderno: medici, analisti di sicurezza e il «tasso di base»

La confusione dell'inverso non è un errore da principianti.

**Harvard, 1978.** Tre ricercatori, Casscells, Schoenberger e Graboys, posero a 60 persone (20 studenti di medicina all'ultimo anno, 20 medici specializzandi e 20 medici strutturati) questa domanda:

> *«If a test to detect a disease whose prevalence is 1/1000 has a false positive rate of 5%, what is the chance that a person found to have a positive result actually has the disease, assuming you know nothing about the person's symptoms or signs?»*
>
> «Se un test per rilevare una malattia che colpisce 1 persona su 1000 ha un tasso di falsi positivi del 5%, qual è la probabilità che una persona risultata positiva abbia davvero la malattia, supponendo che tu non sappia nulla dei suoi sintomi?»

La risposta più frequente, data da 27 persone su 60, fu **95%**. Solo 11 su 60 risposero correttamente: **circa 2%** ([NEJM 299, 1978](https://doi.org/10.1056/NEJM197811022991808)). Alla fine della settimana saprai rifare il conto in una riga.

**Intrusion detection, 2000.** Lo studioso di sicurezza Stefan Axelsson ha portato lo stesso ragionamento nel mondo degli IDS ([ACM TISSEC 3(3), 2000](https://doi.org/10.1145/357830.357849)). Quando le intrusioni sono rare rispetto al volume enorme di eventi che un IDS esamina, conclude che *«the false alarm rate is the limiting factor for the performance of an intrusion detection system»* («il tasso di falsi allarmi è il fattore che limita le prestazioni di un sistema di rilevamento delle intrusioni»). In altre parole, non conta tanto quanto l'IDS sia bravo a riconoscere gli attacchi, quanto *quanto raramente sbagli sul traffico innocuo*.

Il nome tecnico dell'errore di fondo è **fallacia del tasso di base** (*base-rate fallacy*). Il **tasso di base** è semplicemente la frequenza con cui la causa si presenta nella popolazione, *prima* di qualunque test: la prevalenza della malattia, la percentuale di connessioni malevole. L'errore consiste nell'ignorarlo.

!!! question "Le domande che ci guideranno"
    1. Perché sapere che $P(\text{allarme} \mid \text{attacco}) = 0.99$ ci dice così poco su $P(\text{attacco} \mid \text{allarme})$?
    2. Da dove viene il «denominatore» di cui parla Laplace, e perché per calcolarlo dobbiamo considerare **tutte** le cause possibili?
    3. Che cosa guadagna un sistema quando la conclusione di oggi diventa il punto di partenza per l'evidenza di domani?
    4. Se il punto di partenza (il *prior*) era il tormento di Bayes, possiamo farne a meno? Che cosa succede se lo ignoriamo?

---

## Atto II: Vedere il ragionamento — gli alberi di probabilità

Prima di scrivere qualunque formula nuova, costruiamo uno strumento visivo che rende quasi automatici i conti di questa settimana: l'**albero di probabilità**. L'albero non aggiunge matematica nuova: è la regola del prodotto della Settimana 1 disegnata su un foglio.

### Le tre regole di costruzione

Un albero di probabilità si disegna partendo da un unico punto iniziale, la **radice**, e ramificandosi verso destra. Ogni punto dell'albero si chiama **nodo**; ogni segmento che collega due nodi si chiama **ramo**; i nodi alla fine dell'albero, da cui non parte più nulla, si chiamano **foglie**. Le regole sono tre.

1. **Nei nodi si scrivono eventi.** La radice è l'evento certo $\Omega$ («succede qualcosa»). Ogni altro nodo rappresenta la *storia* di tutto ciò che è accaduto lungo il percorso dalla radice fino a lui: per esempio il nodo raggiunto passando per $A$ e poi per $B$ rappresenta $A \cap B$.
2. **I figli di ogni nodo devono dividere il padre in casi che si escludono a vicenda e che, insieme, coprono tutte le possibilità.** (I *figli* di un nodo sono i nodi raggiunti dai rami che partono da lui; il nodo di partenza è il loro *padre*.) Il caso più comune è quello a due figli: $B$ e $B^c$, «succede $B$» e «non succede $B$». Qualunque cosa accada, accade esattamente una delle due. Una divisione di questo tipo si chiama **partizione**, e la studieremo con precisione nell'Atto IV.
3. **Sui rami si scrivono probabilità condizionate.** Il ramo che va dal padre $N$ al figlio $F$ porta il numero $P(F \mid N)$: la probabilità di finire in $F$ *sapendo che* siamo già arrivati in $N$.

Da queste regole discende l'unica regola di calcolo che ti serve:

!!! note "Regola del cammino"
    **La probabilità di un nodo è il prodotto dei numeri scritti sui rami lungo il cammino che lo collega alla radice.**

Perché funziona? Perché ogni passo lungo il cammino è un'applicazione della regola del prodotto: $P(A \cap B) = P(A) \cdot P(B \mid A)$. Il primo ramo porta $P(A)$, il secondo porta $P(B \mid A)$, e moltiplicandoli otteniamo la probabilità del nodo $A \cap B$. Con tre livelli si aggiunge un fattore, e così via: è la fattorizzazione a catena della Settimana 1.

**Convenzione grafica.** Negli alberi di questa pagina il numero **tra parentesi tonde** accanto a un ramo è la *probabilità condizionata* del ramo; il numero **tra parentesi quadre** accanto a un nodo è la *probabilità del nodo* (cioè la probabilità congiunta di tutta la storia fino a lì). Il complementare si scrive $A^c$ nel testo e `Aᶜ` nei disegni.

### Un primo albero, e due controlli da fare sempre

```
                                   ┌─ B  (0.7) ─▶ A ∩ B    [0.28]
            ┌─ A  (0.4) [0.4] ─────┤
            │                      └─ Bᶜ (0.3) ─▶ A ∩ Bᶜ   [0.12]
  Ω [1.0] ──┤
            │                      ┌─ B  (0.3) ─▶ Aᶜ ∩ B   [0.18]
            └─ Aᶜ (0.6) [0.6] ─────┤
                                   └─ Bᶜ (0.7) ─▶ Aᶜ ∩ Bᶜ  [0.42]
```

Leggiamolo lentamente. Dalla radice partono due rami: con probabilità $0.4$ si verifica $A$, con probabilità $0.6$ no. Se si è verificato $A$, allora $B$ si verifica con probabilità $0.7$: questo numero è $P(B \mid A)$. Se invece non si è verificato $A$, $B$ si verifica con probabilità $0.3$: è $P(B \mid A^c)$. Le foglie si ottengono moltiplicando: per esempio $P(A \cap B) = 0.4 \cdot 0.7 = 0.28$.

**Una sottigliezza sul primo livello.** Sul primo ramo è scritto $0.4 = P(A)$, che sembra una probabilità «normale», non condizionata. In realtà anche lei è condizionata: condizionata all'evento certo $\Omega$. Infatti

$$
P(A \mid \Omega) = \frac{P(A \cap \Omega)}{P(\Omega)} = \frac{P(A)}{1} = P(A).
$$

Quindi la regola «sui rami ci sono probabilità condizionate» vale per **tutti** i rami, senza eccezioni: al primo livello il condizionamento è all'evento certo, e per questo non si vede.

!!! tip "I due controlli da fare su ogni albero"
    1. **Le probabilità dei rami che escono da uno stesso nodo sommano a 1.** Qui: $0.4 + 0.6 = 1$, $0.7 + 0.3 = 1$, $0.3 + 0.7 = 1$. Se un nodo non passa questo controllo, l'albero è costruito male: hai dimenticato un caso, oppure hai messo due casi che si sovrappongono.
    2. **Le probabilità delle foglie sommano a 1.** Qui: $0.28 + 0.12 + 0.18 + 0.42 = 1$. Se questo controllo fallisce, c'è un errore nei conti.

    Più in generale, **tutti i nodi di uno stesso livello sommano a 1**, perché insieme descrivono tutti i modi in cui la storia può essere andata fino a quel punto.

### Albero 1: il test medico

Una malattia colpisce l'1% della popolazione. Esiste un test con queste caratteristiche:

* **sensibilità** del 95%: se una persona è malata, il test risulta positivo nel 95% dei casi. La sensibilità misura quanto il test è bravo a *trovare* i malati;
* **specificità** del 90%: se una persona è sana, il test risulta negativo nel 90% dei casi. La specificità misura quanto il test è bravo a *non accusare* i sani.

Chiamiamo $H$ = «la persona è malata» ed $E$ = «il test è positivo». Traduciamo i dati in simboli, un pezzo alla volta:

* prevalenza: $P(H) = 0.01$, quindi $P(H^c) = 0.99$;
* sensibilità: $P(E \mid H) = 0.95$, quindi $P(E^c \mid H) = 0.05$ (i malati che il test non trova: **falsi negativi**);
* specificità: $P(E^c \mid H^c) = 0.90$, quindi $P(E \mid H^c) = 0.10$ (i sani che il test accusa per errore: **falsi positivi**).

```
                                    ┌─ E  (0.95) ─▶ H ∩ E    [0.0095]
            ┌─ H  (0.01) ───────────┤
            │                       └─ Eᶜ (0.05) ─▶ H ∩ Eᶜ   [0.0005]
  Ω [1.0] ──┤
            │                       ┌─ E  (0.10) ─▶ Hᶜ ∩ E   [0.0990]
            └─ Hᶜ (0.99) ───────────┤
                                    └─ Eᶜ (0.90) ─▶ Hᶜ ∩ Eᶜ  [0.8910]
```

Ora facciamo la domanda del paziente: *il mio test è positivo; con che probabilità sono malato?* Guardiamo solo le foglie in cui il test è positivo ($E$): sono la prima e la terza.

* Tutti i modi in cui il test può risultare positivo hanno probabilità complessiva $0.0095 + 0.0990 = 0.1085$.
* Di questa quantità, la parte che viene da persone davvero malate è $0.0095$.

Quindi, usando solo la definizione di probabilità condizionata:

$$
P(H \mid E) = \frac{P(H \cap E)}{P(E)} = \frac{0.0095}{0.1085} \approx 0.088.
$$

**Meno del 9%.** Con un test «buono al 95%», un positivo corrisponde a un malato vero meno di una volta su dieci. Nota che ci siamo arrivati senza nessuna formula nuova: solo l'albero e la definizione di condizionata. Tutto il resto della settimana consiste nel capire *perché* succede e nel dare un nome ai pezzi di questo conto.

### Albero 2: tre lanci di moneta

Lanciamo tre volte una moneta equa. Per distinguere i lanci numeriamo gli eventi: $T_i$ = «testa all'$i$-esimo lancio» e $C_i = T_i^c$ = «croce all'$i$-esimo lancio».


```
                                              ┌─ T₃ (½) ─▶ T₁∩T₂∩T₃  [0.125]
                        ┌─ T₂ (½) [0.25] ─────┤
                        │                     └─ C₃ (½) ─▶ T₁∩T₂∩C₃  [0.125]
      ┌─ T₁ (½) [0.5] ──┤
      │                 │                     ┌─ T₃ (½) ─▶ T₁∩C₂∩T₃  [0.125]
      │                 └─ C₂ (½) [0.25] ─────┤
      │                                       └─ C₃ (½) ─▶ T₁∩C₂∩C₃  [0.125]
  Ω ──┤
      │                                       ┌─ T₃ (½) ─▶ C₁∩T₂∩T₃  [0.125]
      │                 ┌─ T₂ (½) [0.25] ─────┤
      │                 │                     └─ C₃ (½) ─▶ C₁∩T₂∩C₃  [0.125]
      └─ C₁ (½) [0.5] ──┤
                        │                     ┌─ T₃ (½) ─▶ C₁∩C₂∩T₃  [0.125]
                        └─ C₂ (½) [0.25] ─────┤
                                              └─ C₃ (½) ─▶ C₁∩C₂∩C₃  [0.125]
```

Qui ogni ramo porta $\tfrac12$, a qualunque livello e in qualunque sottoalbero. Il motivo è che i lanci sono **indipendenti**: sapere com'è andato il primo lancio non cambia le probabilità del secondo, cioè $P(T_2 \mid T_1) = P(T_2) = \tfrac12$.

Questo ci insegna una cosa importante: **l'albero non presuppone l'indipendenza**. Quando gli eventi sono indipendenti, lo si *vede* (i numeri sui rami si ripetono uguali); quando non lo sono, lo si vede altrettanto bene, come nell'esempio che segue.

### Albero 3: controllo qualità a tre livelli

Un prodotto passa tre controlli in sequenza: dei **materiali** ($M$ = «controllo superato»), del **design** ($D$) e un **test finale** ($T$).

* I materiali passano il controllo con probabilità $P(M) = 0.9$.
* Il design passa con probabilità $0.8$ se i materiali erano buoni, $P(D \mid M) = 0.8$, ma solo con probabilità $0.4$ se non lo erano, $P(D \mid M^c) = 0.4$.
* Il test finale è superato con probabilità $0.95$ se entrambi i controlli precedenti sono stati superati, $0.60$ se ne è fallito uno solo, $0.30$ se sono falliti entrambi.

```
                                                ┌─ T  (0.95) ─▶ M∩D∩T     [0.684]
                       ┌─ D  (0.8) [0.72] ──────┤
                       │                        └─ Tᶜ (0.05) ─▶ M∩D∩Tᶜ    [0.036]
      ┌─ M  (0.9) ─────┤
      │                │                        ┌─ T  (0.60) ─▶ M∩Dᶜ∩T    [0.108]
      │                └─ Dᶜ (0.2) [0.18] ──────┤
      │                                         └─ Tᶜ (0.40) ─▶ M∩Dᶜ∩Tᶜ   [0.072]
  Ω ──┤
      │                                         ┌─ T  (0.60) ─▶ Mᶜ∩D∩T    [0.024]
      │                ┌─ D  (0.4) [0.04] ──────┤
      │                │                        └─ Tᶜ (0.40) ─▶ Mᶜ∩D∩Tᶜ   [0.016]
      └─ Mᶜ (0.1) ─────┤
                       │                        ┌─ T  (0.30) ─▶ Mᶜ∩Dᶜ∩T   [0.018]
                       └─ Dᶜ (0.6) [0.06] ──────┤
                                                └─ Tᶜ (0.70) ─▶ Mᶜ∩Dᶜ∩Tᶜ  [0.042]
```

Qui i numeri sui rami **cambiano** da un sottoalbero all'altro: il design *dipende* dai materiali e il test finale *dipende* da entrambi. Facciamo i due controlli: al secondo livello $0.72 + 0.18 + 0.04 + 0.06 = 1$; le otto foglie sommano anch'esse a 1 (provaci).

Per esempio, la probabilità che tutto vada bene è il prodotto dei rami del cammino più in alto: $P(M \cap D \cap T) = 0.9 \cdot 0.8 \cdot 0.95 = 0.684$.

Nell'Atto V faremo a questo albero la domanda inversa, quella che interessa davvero un ingegnere della qualità: *il prodotto ha fallito il test finale; dove si è rotto?*

---

## Atto III: Il cuore visivo di Bayes — ribaltare l'albero

### Ordine causale e ordine della domanda

Guarda di nuovo l'albero del test medico. È costruito nell'ordine **causale**: prima la malattia (la causa), poi il test (l'effetto). È anche l'ordine in cui conosciamo i dati: il produttore del test ci dice come si comporta il test sui malati e sui sani.

La domanda del paziente, però, segue l'ordine opposto, quello della **conoscenza**: prima vedo il risultato del test, poi mi chiedo della malattia.

**Il Teorema di Bayes consiste nel ridisegnare lo stesso albero con l'ordine dei livelli scambiato.**

Facciamolo sull'esempio del Prologo. Ricordiamo i dati:

* $H$ = «attacco», con $P(H) = 0.01$;
* $E$ = «allarme», con $P(E \mid H) = 0.99$ e $P(E \mid H^c) = 0.01$.

```
  ORDINE CAUSALE (dati del produttore)           ORDINE DELLA DOMANDA (quello dell'analista)

              ┌─ E  (0.99) ─▶ H∩E   [0.0099]                  ┌─ H  (0.5000) ─▶ E∩H   [0.0099]
  ┌─ H (0.01)─┤                                 ┌─ E (0.0198)─┤
  │           └─ Eᶜ (0.01) ─▶ H∩Eᶜ  [0.0001]    │             └─ Hᶜ (0.5000) ─▶ E∩Hᶜ  [0.0099]
Ω─┤                                           Ω─┤
  │           ┌─ E  (0.01) ─▶ Hᶜ∩E  [0.0099]    │             ┌─ H  (0.0001) ─▶ Eᶜ∩H  [0.0001]
  └─ Hᶜ(0.99)─┤                                 └─ Eᶜ(0.9802)─┤
              └─ Eᶜ (0.99) ─▶ Hᶜ∩Eᶜ [0.9801]                  └─ Hᶜ (0.9999) ─▶ Eᶜ∩Hᶜ [0.9801]
```

(Nell'albero di destra, $P(H \mid E^c) = 0.0001/0.9802 \approx 0.0001$, arrotondato.)

Osserva con attenzione tre cose.

1. **Le foglie sono le stesse.** $H \cap E$ e $E \cap H$ sono lo stesso insieme: «c'è un attacco *e* scatta l'allarme» non dipende dall'ordine in cui lo raccontiamo. Cambiano solo i rami, cioè il modo in cui arriviamo alle foglie.
2. **Il primo livello del nuovo albero si ottiene *sommando* foglie del vecchio.** Quante sono in tutto le situazioni con allarme? $P(E) = 0.0099 + 0.0099 = 0.0198$. (Questa operazione ha un nome: *probabilità totale*.)
3. **Il secondo livello del nuovo albero si ottiene *dividendo* una foglia per quella somma.** $P(H \mid E) = 0.0099 / 0.0198 = 0.5$. (Questa operazione ha un altro nome: *Teorema di Bayes*.)

!!! success "La risposta alla Domanda Guida"
    La probabilità che l'allarme corrisponda davvero a un attacco è **il 50%**: risposta (c). Metà degli allarmi sono falsi, con un rilevatore che sbaglia solo l'1% delle volte.

**Perché proprio metà?** Guarda le due foglie che contengono l'allarme: hanno **la stessa massa**, $0.0099$ ciascuna, ma per ragioni opposte.

* La foglia degli **allarmi veri** ($H \cap E$) è piccola perché **gli attacchi sono rari**: sono solo l'1% delle connessioni.
* La foglia degli **allarmi falsi** ($H^c \cap E$) è piccola perché **l'IDS sbaglia di rado**: solo nell'1% dei casi. Però quell'1% si applica al traffico legittimo, che è un insieme **99 volte più grande** degli attacchi.

I due effetti si compensano esattamente. Se gli attacchi fossero ancora più rari, la foglia dei falsi allarmi diventerebbe più grande di quella dei veri, e un allarme sarebbe più spesso falso che vero.

### Lo stesso albero in numeri interi: le frequenze naturali

Le probabilità con tanti zeri dopo la virgola sono difficili da immaginare. Gli psicologi Gigerenzer e Hoffrage ([1995](https://doi.org/10.1037/0033-295X.102.4.684)) hanno mostrato che lo stesso problema, presentato con **conteggi su una popolazione immaginaria** invece che con percentuali, viene risolto correttamente molto più spesso, anche da persone senza alcuna formazione statistica. Chiamarono questo formato **frequenze naturali**. Il motivo è semplice: con i conteggi, il denominatore della formula è già scritto sotto i nostri occhi.

Immaginiamo **10.000 connessioni**.

* L'1% è un attacco: **100 attacchi** e **9.900 connessioni legittime**.
* Dei 100 attacchi, l'IDS ne segnala il 99%: **99 allarmi veri** (e 1 attacco sfugge).
* Delle 9.900 connessioni legittime, l'IDS ne segnala per errore l'1%: **99 falsi allarmi** (e 9.801 sono giustamente ignorate).

| | Allarme ($E$) | Nessun allarme ($E^c$) | Totale |
|:---|---:|---:|---:|
| **Attacco ($H$)** | 99 *(veri positivi)* | 1 *(falso negativo)* | 100 |
| **Traffico legittimo ($H^c$)** | 99 *(falsi positivi)* | 9.801 *(veri negativi)* | 9.900 |
| **Totale** | **198** | 9.802 | 10.000 |

Quanti allarmi in tutto? **198**. Quanti di questi sono attacchi veri? **99**. Quindi

$$
P(H \mid E) = \frac{99}{198} = 0.5.
$$

**La regola di lettura è: si guarda soltanto la colonna di ciò che si è osservato.** Abbiamo visto un allarme, quindi ci interessa solo la colonna «Allarme». Il totale in fondo alla colonna (198) è la *probabilità totale*; la cella in alto divisa per quel totale è *Bayes*.

Tre collegamenti da tenere a mente:

* **La tabella è l'albero.** Le quattro celle centrali sono le quattro foglie moltiplicate per 10.000. I totali di **riga** (100 e 9.900) sono il primo livello dell'albero causale; i totali di **colonna** (198 e 9.802) sono il primo livello dell'albero ribaltato.
* **La tabella è la matrice di confusione del machine learning.** Chi ha già visto un classificatore riconoscerà le sigle: TP (*true positives*, veri positivi) = 99, FN (*false negatives*, falsi negativi) = 1, FP (*false positives*, falsi positivi) = 99, TN (*true negatives*, veri negativi) = 9.801. Ci torneremo nel Takeaway.
* **Se gli attacchi sono più rari, il disastro è peggiore.** Con un attacco ogni 10.000 connessioni, su 1.000.000 di connessioni ci sono 100 attacchi, che producono 99 allarmi veri, e 999.900 connessioni legittime, che producono 9.999 falsi allarmi. Allora $P(H \mid E) = 99/(99 + 9.999) = 99/10.098 \approx 0.0098$: **meno di un allarme su cento è vero**, con lo stesso identico IDS.

!!! tip "Prova a immaginarlo"
    Disegna (o immagina) una griglia di $100 \times 100 = 10.000$ quadratini. Colora di rosso 100 quadratini: sono gli attacchi. Cerchiane 99 tra i rossi: sono quelli che l'IDS rileva. Poi cerchia 99 quadratini tra i 9.900 grigi: sono i falsi allarmi. Ora conta: tra tutti i quadratini cerchiati, quanti sono rossi? Esattamente la metà. Questa immagine vale più di qualunque formula, ed è bene averla in testa quando arriveranno le formule.

### Esplora tu stesso: quanto conta la rarità?

Il grafico seguente mostra la probabilità che un allarme sia vero, $P(H \mid E)$, in funzione della **prevalenza** $P(H)$, cioè della frazione di connessioni che sono attacchi. L'asse orizzontale è in **scala logaritmica**: il valore $-4$ indica una prevalenza di $10^{-4} = 0.0001$ (un attacco su diecimila), $-2$ indica $10^{-2} = 0.01$ (uno su cento), $0$ indica $10^0 = 1$ (tutte le connessioni sono attacchi). Usiamo questa scala perché la zona interessante, quella degli eventi rari, altrimenti sarebbe schiacciata in un angolino del grafico.

I valori iniziali dei cursori sono quelli del nostro IDS. Prova a spostare la sensibilità verso 1: cambia poco. Prova ad alzare la specificità (cioè ad abbassare i falsi allarmi): la curva si sposta molto di più. È la conclusione di Axelsson, vista con i tuoi occhi.

<div class="psi-widget" id="s02-widget-prevalenza"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  function posterior(prev, sens, spec) {
    var num = sens * prev;
    var den = num + (1 - spec) * (1 - prev);
    return den > 0 ? num / den : 0;
  }
  PSIWidget.mount('s02-widget-prevalenza', {
    type: 'line',
    xLabel: 'log10 della prevalenza P(H)   (−4 = 0.0001,  −2 = 0.01,  0 = 1)',
    yLabel: 'P(H | E): probabilità che l’allarme sia vero',
    xDomain: [-4, 0],
    xSamples: 201,
    yDomain: [0, 1.05],
    liveLabel: 'rilevatore regolato con i cursori',
    fn: function (x, p) { return posterior(Math.pow(10, x), p.sens, p.spec); },
    params: [
      { key: 'sens', label: 'Sensibilità P(E | H)', min: 0.5, max: 1, step: 0.001, value: 0.99 },
      { key: 'spec', label: 'Specificità P(Eᶜ | Hᶜ)', min: 0.9, max: 1, step: 0.0001, value: 0.99 },
      { key: 'logprev', label: 'Prevalenza di esempio (log10)', min: -4, max: 0, step: 0.1, value: -2 }
    ],
    reference: { label: 'IDS del Prologo (99% / 99%)', params: { sens: 0.99, spec: 0.99 } },
    stats: function (p) {
      var prev = Math.pow(10, p.logprev);
      var pE = p.sens * prev + (1 - p.spec) * (1 - prev);
      return [
        { label: 'Prevalenza di esempio P(H)', value: prev.toPrecision(2) },
        { label: 'P(E), frazione di connessioni con allarme', value: pE.toPrecision(3) },
        { label: 'P(H | E), allarmi veri', value: (100 * posterior(prev, p.sens, p.spec)).toFixed(2) + '%' }
      ];
    },
    caption: 'Verso sinistra (attacchi sempre più rari) la curva crolla: anche un rilevatore eccellente produce soprattutto falsi allarmi. La leva più efficace è la specificità, cioè abbassare i falsi positivi.'
  });
});
</script>

---

## Atto IV: La matematica, passo per passo

Abbiamo visto il Teorema di Bayes all'opera su un albero e su una tabella. Ora lo scriviamo in modo preciso e lo dimostriamo usando **solo** gli assiomi di Kolmogorov e la definizione di probabilità condizionata. L'obiettivo non è imparare formule a memoria, ma vedere che ogni passaggio è una conseguenza inevitabile di cose che già sappiamo.

Le dimostrazioni più tecniche sono in riquadri che puoi aprire e chiudere: leggile almeno una volta, ma se ti blocchi puoi proseguire e tornarci dopo.

### 1. Partizioni: dividere $\Omega$ in casi

Nel costruire gli alberi abbiamo usato l'idea di «dividere tutte le possibilità in casi che non si sovrappongono». Diamole un nome preciso.

!!! note "Definizione (Partizione)"
    Una famiglia finita di eventi $\{H_1, \dots, H_n\}$ è una **partizione** di $\Omega$ se:

    1. **si escludono a vicenda**: $H_i \cap H_j = \emptyset$ per ogni $i \neq j$ (due casi diversi non possono verificarsi insieme);
    2. **coprono tutto**: $H_1 \cup \dots \cup H_n = \Omega$ (qualunque cosa accada, accade almeno uno dei casi);
    3. **ognuno ha probabilità positiva**: $P(H_i) > 0$ per ogni $i$.

    Messe insieme, le prime due condizioni dicono: **si verifica sempre esattamente uno dei casi $H_i$**.

La terza condizione serve a poter condizionare su ciascun $H_i$: la definizione $P(A \mid H_i) = P(A \cap H_i)/P(H_i)$ richiede di dividere per $P(H_i)$, che quindi non può essere zero. (Non basta chiedere che $H_i$ sia «non vuoto»: nei modelli continui, che vedremo più avanti nel corso, un evento può contenere degli esiti e avere comunque probabilità zero.)

*Esempi.*

* $\{B, B^c\}$ è una partizione per qualunque evento $B$ con $0 < P(B) < 1$: o succede $B$, o non succede.
* $\{\text{attacco}, \text{traffico legittimo}\}$ è una partizione delle connessioni.
* I nodi di uno stesso livello di un albero di probabilità formano una partizione.

*Un controesempio che tornerà utile.* In un programma con due moduli, siano $A$ = «errore nel modulo I» e $B$ = «errore nel modulo II». La famiglia $\{A, B, A \cap B\}$ **non** è una partizione: $A$ e $A \cap B$ si sovrappongono (un errore in entrambi i moduli sta in tutti e due), e nessuno dei tre eventi contiene il caso «nessun errore». La partizione corretta è $\{\text{solo I},\ \text{solo II},\ \text{entrambi},\ \text{nessuno}\}$. Controllo pratico: **le probabilità dei casi di una partizione sommano sempre a 1**.

Il fatto chiave che useremo è intuitivo: se divido $\Omega$ in casi, divido automaticamente in casi anche ogni evento $A$.

!!! note "Lemma (Decomposizione di un evento su una partizione)"
    Se $\{H_1, \dots, H_n\}$ è una partizione di $\Omega$, allora per ogni evento $A$ i pezzi $A \cap H_1, \dots, A \cap H_n$ si escludono a vicenda e insieme ricostruiscono $A$:

    $$
    A = (A \cap H_1) \cup (A \cap H_2) \cup \dots \cup (A \cap H_n).
    $$

In parole: ogni volta che $A$ si verifica, si verifica insieme a esattamente uno dei casi $H_i$. Sull'albero del test medico, l'evento «test positivo» si spezza in «positivo *e* malato» e «positivo *e* sano».

??? approfondimento "Dimostrazione del lemma"
    *I pezzi si escludono a vicenda.* Per $i \neq j$:

    $$
    (A \cap H_i) \cap (A \cap H_j) = A \cap (H_i \cap H_j) = A \cap \emptyset = \emptyset.
    $$

    *I pezzi ricostruiscono $A$.* Poiché $A \subseteq \Omega$, si ha $A = A \cap \Omega$. Sostituendo $\Omega$ con l'unione degli $H_i$ e usando la proprietà distributiva dell'intersezione rispetto all'unione (la stessa che vale per «e» e «o» in logica):

    $$
    A = A \cap \Omega = A \cap \Big(\bigcup_{i=1}^n H_i\Big) = \bigcup_{i=1}^n (A \cap H_i). \qquad \blacksquare
    $$

### 2. Condizionare su $B$ produce una nuova probabilità a tutti gli effetti

Nella Settimana 1 abbiamo descritto il condizionamento come uno *zoom*: sappiamo che $B$ è accaduto, quindi $B$ diventa il nostro nuovo universo. Possiamo rendere precisa questa idea.

Ricordiamo prima una distinzione della [Settimana 1, §5](../settimana_01/index.md#5-gli-assiomi-di-kolmogorov-1933). Una **misura di probabilità** è una *funzione* $P$ che a ogni evento $A$ associa un numero $P(A)$ e rispetta i tre assiomi di Kolmogorov: non-negatività, normalizzazione ($P(\Omega) = 1$) e $\sigma$-additività. Lo **spazio di probabilità** è invece la terna $(\Omega, \mathcal{F}, P)$: gli esiti possibili, gli eventi e la misura che assegna loro una probabilità. Il teorema qui sotto lascia fermi $\Omega$ e $\mathcal{F}$ e cambia solo la misura: al posto di $P$ mettiamo $P(\cdot \mid B)$, dove il puntino indica il posto in cui va l'evento $A$.

!!! note "Teorema ($P(\cdot \mid B)$ è una misura di probabilità)"
    Sia $P(B) > 0$. La funzione che a ogni evento $A$ associa il numero $P(A \mid B)$ soddisfa tutti e tre gli assiomi di Kolmogorov:

    1. $P(A \mid B) \ge 0$ per ogni $A$;
    2. $P(\Omega \mid B) = 1$;
    3. se $A_1, A_2, \dots$ si escludono a vicenda, $P(A_1 \cup A_2 \cup \dots \mid B) = P(A_1 \mid B) + P(A_2 \mid B) + \dots$

??? approfondimento "Dimostrazione"
    1. $P(A \cap B) \ge 0$ per il primo assioma e $P(B) > 0$, quindi il loro rapporto è $\ge 0$.
    2. $P(\Omega \mid B) = P(\Omega \cap B)/P(B) = P(B)/P(B) = 1$.
    3. Supponiamo che $A_1, A_2, \dots$ si escludano a vicenda. Vogliamo calcolare $P\big(\bigcup_i A_i \mid B\big)$, cioè la probabilità condizionata dell'evento «si verifica almeno uno degli $A_i$». Procediamo un passo alla volta.

        *Passo 1: applichiamo la definizione di probabilità condizionata.* La definizione dice $P(E \mid B) = P(E \cap B)/P(B)$ per qualunque evento $E$. Qui l'evento $E$ è l'unione $\bigcup_i A_i$, quindi:

        $$
        P\Big(\bigcup_i A_i \,\Big|\, B\Big) = \frac{P\Big(\big(\bigcup_i A_i\big) \cap B\Big)}{P(B)}.
        $$

        *Passo 2: riscriviamo il numeratore con la proprietà distributiva.* «Almeno uno degli $A_i$, *e* $B$» è lo stesso che «almeno uno tra ($A_1$ e $B$), ($A_2$ e $B$), …»:

        $$
        \Big(\bigcup_i A_i\Big) \cap B = \bigcup_i (A_i \cap B).
        $$

        Sostituendo nel numeratore:

        $$
        P\Big(\bigcup_i A_i \,\Big|\, B\Big) = \frac{P\big(\bigcup_i (A_i \cap B)\big)}{P(B)}.
        $$

        *Passo 3: i pezzi $A_i \cap B$ si escludono a vicenda.* Ogni pezzo $A_i \cap B$ è contenuto in $A_i$; poiché gli $A_i$ non hanno esiti in comune, non possono averne nemmeno i pezzi. Possiamo quindi usare il terzo assioma (per la $P$ originale) sul numeratore: la probabilità dell'unione è la somma delle probabilità:

        $$
        P\Big(\bigcup_i (A_i \cap B)\Big) = \sum_i P(A_i \cap B).
        $$

        Quindi:

        $$
        P\Big(\bigcup_i A_i \,\Big|\, B\Big) = \frac{\sum_i P(A_i \cap B)}{P(B)}.
        $$

        *Passo 4: dividiamo termine per termine.* Dividere una somma per $P(B)$ equivale a dividere ciascun addendo per $P(B)$:

        $$
        \frac{\sum_i P(A_i \cap B)}{P(B)} = \sum_i \frac{P(A_i \cap B)}{P(B)}.
        $$

        *Passo 5: riconosciamo la definizione.* Ciascun addendo $\dfrac{P(A_i \cap B)}{P(B)}$ è, per definizione, $P(A_i \mid B)$. Mettendo insieme i passi:

        $$
        P\Big(\bigcup_i A_i \,\Big|\, B\Big) = \sum_i P(A_i \mid B). \qquad \blacksquare
        $$

        *Esempio con due eventi.* Con solo $A_1$ e $A_2$ incompatibili, la catena è:

        $$
        P(A_1 \cup A_2 \mid B)
        = \frac{P\big((A_1 \cup A_2) \cap B\big)}{P(B)}
        = \frac{P\big((A_1 \cap B) \cup (A_2 \cap B)\big)}{P(B)}
        = \frac{P(A_1 \cap B) + P(A_2 \cap B)}{P(B)}
        = P(A_1 \mid B) + P(A_2 \mid B).
        $$

**Perché è importante?** Perché ogni teorema che abbiamo dimostrato usando soltanto gli assiomi vale **automaticamente** anche per le probabilità condizionate. Per esempio vale la regola del complementare «dentro» $B$:

$$
P(A \mid B) + P(A^c \mid B) = 1.
$$

È per questo che, sull'albero, **i rami che escono da uno stesso nodo sommano a 1**: sono le probabilità dei casi di una partizione, calcolate tutte con la stessa probabilità condizionata, quella del nodo padre.

!!! caution "Il falso gemello"
    Attenzione a non confondere la regola precedente con questa, che **in generale è falsa**:

    $$
    P(A \mid B) + P(A \mid B^c) \neq 1 \quad \text{(in generale)}.
    $$

    Le due probabilità a sinistra sono calcolate in due «universi» diversi: la prima dentro $B$, la seconda dentro $B^c$. Non c'è alcun motivo per cui debbano sommare a 1. Nel test medico: $P(E \mid H) + P(E \mid H^c) = 0.95 + 0.10 = 1.05$.

    Regola pratica: sommano a 1 le probabilità che hanno **la stessa condizione a destra** della barra e **eventi complementari a sinistra**.

### 3. La regola del cammino, detta con precisione

Sull'albero abbiamo usato una regola pratica: la probabilità di un nodo è il prodotto dei rami lungo il cammino dalla radice. Enunciamola con precisione.

!!! note "Proposizione (Regola del cammino)"
    Se il cammino dalla radice a un nodo $v$ passa per i nodi $\Omega = N_0, N_1, N_2, \dots, N_m = v$, allora

    $$
    P(N_m) = P(N_1 \mid N_0) \cdot P(N_2 \mid N_1) \cdots P(N_m \mid N_{m-1}).
    $$

    Non compare un fattore $P(N_0)$ perché $N_0 = \Omega$ e $P(\Omega) = 1$; per lo stesso motivo il primo ramo $P(N_1 \mid N_0)$ coincide con $P(N_1)$.

    Inoltre, in un albero in cui tutte le foglie stanno allo stesso livello, **i nodi di ciascun livello formano una partizione di $\Omega$**, e quindi le loro probabilità sommano a 1.

In un albero «sequenziale», dove al livello $t$ si decide se accade un evento $A_t$ oppure il suo complementare, questa è esattamente la regola del prodotto a catena della Settimana 1:

$$
P(A_1 \cap A_2 \cap A_3) = P(A_1) \cdot P(A_2 \mid A_1) \cdot P(A_3 \mid A_1 \cap A_2).
$$

??? approfondimento "Dimostrazione (per induzione sul numero di rami)"
    *Idea dell'induzione.* Si dimostra la tesi per il cammino più corto possibile (caso base), poi si mostra che, se vale per un cammino di $m$ rami, vale anche aggiungendo un ramo ($m+1$). Allora vale per tutti i cammini, come in una fila di tessere del domino: se cade la prima, e ogni tessera che cade fa cadere la successiva, cadono tutte.

    *Caso base, $m = 0$.* Il nodo è la radice, $P(\Omega) = 1$: il prodotto di zero fattori vale 1 per convenzione.

    *Passo.* Supponiamo la tesi vera per un nodo $N_m$ e sia $N_{m+1}$ un suo figlio. Poiché $N_{m+1}$ è contenuto in $N_m$ (è una parte della sua partizione), $N_{m+1} = N_{m+1} \cap N_m$. Per la regola del prodotto:

    $$
    P(N_{m+1}) = P(N_{m+1} \cap N_m) = P(N_m) \cdot P(N_{m+1} \mid N_m).
    $$

    Sostituendo a $P(N_m)$ il prodotto dei rami fino a $N_m$ (ipotesi induttiva) si ottiene il prodotto dei rami fino a $N_{m+1}$. $\blacksquare$

    *I livelli sono partizioni.* Anche qui per induzione: il livello 0 è $\{\Omega\}$. Se i nodi del livello $d$ partizionano $\Omega$, i loro figli la partizionano anch'essi: due figli dello stesso padre si escludono per costruzione, due figli di padri diversi stanno dentro padri che si escludono; e unendo i figli di ogni padre si riottiene il padre, quindi unendo tutto si riottiene $\Omega$. La somma a 1 segue dal terzo assioma. $\blacksquare$

### 4. Il Teorema della probabilità totale

Siamo pronti per il primo dei due teoremi della settimana. Risponde alla domanda: *con che probabilità si verifica l'effetto $A$, se non so quale causa è all'opera?*

!!! note "Teorema della probabilità totale"
    Sia $\{H_1, \dots, H_n\}$ una partizione di $\Omega$. Per ogni evento $A$:

    $$
    P(A) = P(A \mid H_1)\,P(H_1) + P(A \mid H_2)\,P(H_2) + \dots + P(A \mid H_n)\,P(H_n) = \sum_{i=1}^{n} P(A \mid H_i)\,P(H_i).
    $$

    Nel caso più frequente, con due soli casi $\{B, B^c\}$:

    $$
    P(A) = P(A \mid B)\,P(B) + P(A \mid B^c)\,P(B^c).
    $$

**Dimostrazione.** Bastano tre passi, ciascuno già noto.

1. Per il lemma di decomposizione, $A$ si spezza nei pezzi $A \cap H_1, \dots, A \cap H_n$, che si escludono a vicenda.
2. Per il terzo assioma (additività), la probabilità di $A$ è la somma delle probabilità dei pezzi: $P(A) = \sum_i P(A \cap H_i)$.
3. Per la regola del prodotto, ogni pezzo vale $P(A \cap H_i) = P(A \mid H_i)\,P(H_i)$. Sostituendo si ottiene la tesi. $\blacksquare$

Tre modi di leggere lo stesso teorema:

* **Sull'albero:** $P(A)$ è la **somma delle foglie in cui compare $A$**. Nel test medico, $P(E) = 0.0095 + 0.0990 = 0.1085$. Nell'IDS, $P(E) = 0.0099 + 0.0099 = 0.0198$.
* **Come media pesata:** $P(A)$ è una media dei valori $P(A \mid H_i)$, ciascuno pesato con la probabilità $P(H_i)$ del suo caso. I pesi sono positivi e sommano a 1, quindi **il risultato sta sempre tra il più piccolo e il più grande dei $P(A \mid H_i)$**. È un ottimo controllo di plausibilità: nell'IDS, $P(E)$ deve stare tra $0.01$ e $0.99$, e infatti vale $0.0198$, molto vicino a $0.01$ perché il caso «traffico legittimo» pesa il 99%.
* **Come strategia di calcolo:** conviene «dividere in casi» ogni volta che il comportamento del sistema **in ciascun caso** è più facile da conoscere del comportamento complessivo. È la situazione tipica dell'ingegnere: sa come si comporta il rilevatore sugli attacchi e sul traffico legittimo, ma non sa direttamente con che frequenza scattano gli allarmi.

### 5. Il Teorema di Bayes

Ed eccoci al teorema che dà il nome alla settimana. Risponde alla domanda inversa: *si è verificato l'effetto; con che probabilità la causa era $H_j$?*

**Forma a due eventi.** Parte da un'osservazione banale ma decisiva: l'intersezione non dipende dall'ordine, $A \cap B = B \cap A$. Scriviamo la regola del prodotto nei due ordini possibili:

$$
P(B)\,P(A \mid B) \;=\; P(A \cap B) \;=\; P(B \cap A) \;=\; P(A)\,P(B \mid A).
$$

Il primo e l'ultimo membro sono uguali. Dividendo entrambi per $P(A)$ (che supponiamo positiva):

!!! note "Teorema di Bayes (forma a due eventi)"
    Se $P(A) > 0$ e $P(B) > 0$:

    $$
    P(B \mid A) = \frac{P(A \mid B)\,P(B)}{P(A)}.
    $$

Guarda che cosa ci dice questa formula sulla **confusione dell'inverso**: $P(B \mid A)$ e $P(A \mid B)$ **differiscono per il fattore $P(B)/P(A)$**. Se $B$ è molto più raro di $A$, allora $P(B \mid A)$ è piccola anche quando $P(A \mid B)$ è grande. Nell'IDS, $B$ = attacco ha probabilità $0.01$ e $A$ = allarme ha probabilità $0.0198$, quindi il fattore è circa $0.5$: ecco da dove viene il nostro 50%.

**Forma con partizione.** Quasi sempre non conosciamo $P(A)$ direttamente, ma possiamo calcolarla con la probabilità totale. Sostituendola nel denominatore otteniamo la forma che si usa davvero.

!!! note "Teorema di Bayes (forma con partizione)"
    Sia $\{H_1, \dots, H_n\}$ una partizione di $\Omega$ ed $E$ un evento con $P(E) > 0$. Per ogni $j$:

    $$
    P(H_j \mid E) = \frac{P(E \mid H_j)\,P(H_j)}{\displaystyle\sum_{i=1}^{n} P(E \mid H_i)\,P(H_i)}.
    $$

    Con due sole ipotesi, $H$ e $H^c$:

    $$
    P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E \mid H)\,P(H) + P(E \mid H^c)\,P(H^c)}.
    $$

Rileggi ora la citazione di Laplace: il **numeratore** è «la probabilità dell'evento data la causa, moltiplicata per la probabilità della causa»; il **denominatore** è «la somma delle stesse quantità su tutte le cause». È esattamente questa formula.

E rileggila anche sull'albero: il numeratore è **una foglia** (quella della causa che ci interessa, nel ramo dell'evidenza osservata); il denominatore è **la somma di tutte le foglie compatibili con l'evidenza**. Bayes è «una foglia diviso la somma delle foglie che contengono ciò che ho visto».

Verifichiamo sull'IDS:

$$
P(H \mid E) = \frac{0.99 \cdot 0.01}{0.99 \cdot 0.01 + 0.01 \cdot 0.99} = \frac{0.0099}{0.0198} = 0.5.
$$

### 6. Il vocabolario dell'inferenza

Ogni pezzo della formula di Bayes ha un nome. Questi nomi li userai per tutto il resto del corso (e in qualunque corso di machine learning), quindi vale la pena impararli bene. Ricorda: $H$ è l'**ipotesi** (la causa nascosta), $E$ è l'**evidenza** (l'effetto osservato).

| Simbolo | Nome | Che cosa significa | Nell'esempio dell'IDS |
|:---|:---|:---|:---|
| $P(H)$ | **prior** (probabilità *a priori*) | quanto crediamo all'ipotesi **prima** di osservare l'evidenza | $0.01$: frazione di connessioni malevole |
| $P(E \mid H)$ | **verosimiglianza** (*likelihood*) | quanto l'ipotesi, se fosse vera, renderebbe probabile ciò che abbiamo osservato | $0.99$: se è un attacco, l'allarme scatta quasi sempre |
| $P(E)$ | **evidenza** (probabilità marginale) | quanto era probabile l'osservazione, considerando **tutte** le ipotesi | $0.0198$: frazione di connessioni con allarme |
| $P(H \mid E)$ | **posterior** (probabilità *a posteriori*) | quanto crediamo all'ipotesi **dopo** aver osservato l'evidenza | $0.5$: la risposta alla Domanda Guida |

Con questi nomi, il Teorema di Bayes si legge in italiano così:

$$
\text{posterior} = \frac{\text{verosimiglianza} \times \text{prior}}{\text{evidenza}}.
$$

!!! tip "Una scorciatoia per fare i conti: posterior $\propto$ verosimiglianza $\times$ prior"
    Il simbolo $\propto$ si legge «è proporzionale a». Una volta fissata l'evidenza osservata $E$, il denominatore $P(E)$ è **lo stesso per tutte le ipotesi**. Quindi i posterior sono proporzionali ai prodotti verosimiglianza $\times$ prior, e il denominatore serve solo a «normalizzare», cioè a far sommare i posterior a 1. In pratica:

    1. per ogni ipotesi calcola **verosimiglianza $\times$ prior** (sull'albero: le foglie compatibili con $E$);
    2. **somma** tutti questi prodotti (la probabilità totale, $P(E)$);
    3. **dividi** ciascun prodotto per la somma (il ribaltamento dell'albero).

    Questi tre passi sono tutto ciò che fa lo Script 1 del laboratorio.

!!! caution "La verosimiglianza non è una misura di probabilità delle ipotesi"
    Fissata l'evidenza $E$, i numeri $P(E \mid H_1), P(E \mid H_2), \dots$ **non sommano a 1**, e non devono farlo: ciascuno è calcolato in un «universo» diverso (dentro $H_1$, dentro $H_2$…). Nell'esempio dei moduli software che vedremo tra poco, le verosimiglianze sono $0.5$, $0.8$, $0.9$ e $0$, con somma $2.2$. Sono invece i **posterior** $P(H_1 \mid E), P(H_2 \mid E), \dots$ a sommare a 1, perché sono tutti calcolati nello stesso universo, quello in cui $E$ si è verificato.

    

**Due casi limite istruttivi.**

* **Prior zero, posterior zero.** Se $P(H_j) = 0$, il numeratore è zero e quindi $P(H_j \mid E) = 0$, *qualunque* cosa si osservi. Un'ipotesi a cui si è dato probabilità zero in partenza non può più essere «riscoperta» da nessun dato. Per questo, in pratica, non si assegna mai probabilità esattamente zero a un'ipotesi che si vuole poter scoprire.
* **Verosimiglianza zero, ipotesi eliminata.** Se $P(E \mid H_j) = 0$ (l'ipotesi $H_j$ rende *impossibile* ciò che abbiamo visto), allora osservare $E$ elimina del tutto $H_j$. Esempio: se il programma è andato in crash, l'ipotesi «nessun errore nel codice» (che non causa mai crash) esce di scena.

!!! question "E se ignorassimo il prior?"
    Nel problema dell'IDS, rispondere «99%» sembra un modo di non usare il prior. In realtà, se sensibilità e specificità valgono entrambe $0.99$, si ottiene un posterior del 99% **solo** ponendo $P(H) = 0.5$, cioè supponendo che metà delle connessioni siano attacchi. **Ignorare il prior non significa non averne uno: significa usarne uno sbagliato**, di solito quello «50 e 50». Questo è il vero significato della fallacia del tasso di base, ed è la risposta alla quarta domanda guida.

**Quanto deve essere buono un IDS?** Supponiamo che gli attacchi siano uno su diecimila, $P(H) = 10^{-4}$, e che il rilevatore abbia sensibilità $0.99$. Quanti falsi allarmi $f = P(E \mid H^c)$ possiamo permetterci, se vogliamo che un allarme sia vero almeno nel 90% dei casi? Imponiamo $P(H \mid E) \ge 0.9$:

$$
\frac{0.99 \cdot 10^{-4}}{0.99 \cdot 10^{-4} + f \cdot 0.9999} \ge 0.9
\quad\Longleftrightarrow\quad
0.99 \cdot 10^{-4} \ge 9 \cdot f \cdot 0.9999
\quad\Longleftrightarrow\quad
f \le \frac{0.99 \cdot 10^{-4}}{9 \cdot 0.9999} \approx 0.000011.
$$

Circa un errore ogni centomila connessioni legittime. Ecco, in numeri, la conclusione di Axelsson: **conta il tasso di falsi allarmi, non la sensibilità**.

!!! info "Più avanti nel corso: la forma a odds"
    Il Teorema di Bayes ha anche una forma ancora più compatta, che usa le **quote** degli scommettitori (*odds*, «3 contro 1») e il **rapporto di verosimiglianza** $P(E \mid H) / P(E \mid H^c)$. In quella forma ogni nuova evidenza **moltiplica** le quote per un fattore fisso, e in scala logaritmica le evidenze **si sommano**. La vedremo nella Settimana 12, quando servirà per il classificatore Naive Bayes.

### 7. Il posterior di oggi è il prior di domani

Torniamo alle tre di notte. Dopo il primo allarme, la probabilità di attacco è salita dall'1% al 50%. Ora scatta un **secondo** allarme, da un altro rilevatore installato sul server (non sulla rete). Come aggiorniamo?

L'idea naturale è: **il posterior di prima diventa il nuovo prior**, e si applica di nuovo Bayes con i dati del secondo rilevatore. Supponiamo che il secondo rilevatore abbia sensibilità $0.95$ e tasso di falsi positivi $0.05$:

$$
P(H \mid E_1 \cap E_2) = \frac{0.95 \cdot 0.5}{0.95 \cdot 0.5 + 0.05 \cdot 0.5} = 0.95.
$$

Due allarmi, e siamo passati dall'1% al 95%.

Guardiamo bene che cosa abbiamo messo nella formula. Il prior $0.5$ è **aggiornato**: è $P(H \mid E_1)$, il posterior dopo il primo allarme. Usare il posterior come nuovo prior è sempre lecito. Le verosimiglianze $0.95$ e $0.05$, invece, **non** sono aggiornate: sono i dati del produttore, $P(E_2 \mid H)$ e $P(E_2 \mid H^c)$, che descrivono il secondo rilevatore da solo, senza sapere nulla del primo.

È lecito riusare le verosimiglianze del produttore del secondo rilevatore (cioè sensibilità $0.95$ e tasso di falsi positivi $0.05$) anche dopo aver visto il primo allarme? Dipende da **dove nascono gli errori** dei due rilevatori. Immaginiamo una notte **senza** attacchi in cui il primo rilevatore ha dato un falso allarme. Il secondo ha qualche motivo per sbagliare anche lui?

* **Rilevatori che guardano dati diversi.** Il primo analizza il traffico di rete, il secondo i file del server. Qualcosa di strano nel traffico ha ingannato il primo, ma il secondo quel traffico non lo vede nemmeno. La probabilità che sbagli resta quella dichiarata dal produttore, $0.05$. Lo stesso vale nelle notti con un attacco. In questo caso le verosimiglianze del produttore vanno bene, e il conto che dà il 95% è corretto.
* **Rilevatori che guardano gli stessi dati.** Entrambi leggono lo stesso log di rete. Ogni notte alle tre parte un backup legittimo che invia molti dati all'esterno: somiglia a un furto di dati e inganna **tutti e due**. Quindi, se il primo ha già dato un falso allarme, è molto probabile che anche il secondo stia sbagliando sulla stessa connessione, molto più del $5\%$ dichiarato dal produttore. Usare quel $5\%$ dà un posterior troppo alto.

Conta **che cosa guardano** i due rilevatori, non quanto sono precisi. Il primo rilevatore sbaglia sull'$1\%$ delle connessioni legittime, il secondo sul $5\%$. Queste percentuali dicono **quanto spesso** sbaglia ciascuno, ma non **su quali connessioni**. Due rilevatori che leggono lo stesso log possono avere percentuali di errore diverse e sbagliare comunque sulle stesse connessioni. Al contrario, due copie dello stesso software, una che analizza il traffico di rete e una che analizza il server, hanno le stesse percentuali di errore ma guardano dati diversi: ciò che inganna una, l'altra non lo vede nemmeno, e quindi non sbagliano insieme.

Quando gli errori dei due rilevatori non hanno cause in comune, si dice che i due allarmi sono **condizionatamente indipendenti** dato lo stato del sistema: indipendenti *una volta che sappiamo* se c'è un attacco oppure no. In formula, $P(E_2 \mid H \cap E_1) = P(E_2 \mid H)$, e lo stesso con $H^c$ al posto di $H$. La definizione precisa la vedremo nella Settimana 12, dove è l'ipotesi su cui si regge il classificatore Naive Bayes.

!!! esempio "Il caso estremo: un rilevatore che copia il primo"
    Supponiamo che il «secondo rilevatore» sia una semplice copia del primo (sensibilità $0.99$, falsi positivi $0.01$): suona esattamente quando suona il primo.

    *Conto ingenuo*, con i dati del produttore:

    $$
    \frac{0.99 \cdot 0.5}{0.99 \cdot 0.5 + 0.01 \cdot 0.5} = 0.99.
    $$

    *Conto corretto.* Se il primo allarme è già scattato, la copia scatta di sicuro, con o senza attacco: $P(E_2 \mid H \cap E_1) = P(E_2 \mid H^c \cap E_1) = 1$. Quindi

    $$
    \frac{1 \cdot 0.5}{1 \cdot 0.5 + 1 \cdot 0.5} = 0.5.
    $$

    Il posterior non si muove, ed è giusto così: la copia non porta nessuna informazione nuova. Il conto ingenuo arriva al 99% perché **conta due volte la stessa evidenza**.

!!! warning "Nota per l'ingegnere"
    Prima di combinare due allarmi, chiediti da quali dati partono. Se i due rilevatori leggono **lo stesso flusso di log** o usano **le stesse regole**, non sono condizionatamente indipendenti: usare le verosimiglianze del produttore significa contare **due volte la stessa evidenza**, e il posterior che ne esce è troppo sicuro di sé.

Il grafico seguente mostra come cresce il posterior dopo $k$ allarmi consecutivi, **supponendo** che siano condizionatamente indipendenti e tutti prodotti da rilevatori con la stessa sensibilità e lo stesso tasso di falsi positivi.

<div class="psi-widget" id="s02-widget-sequenziale"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  function dopoKAllarmi(k, p) {
    var prior = Math.pow(10, p.logprior);
    var odds = prior / (1 - prior) * Math.pow(p.sens / p.fpr, k);
    return odds / (1 + odds);
  }
  PSIWidget.mount('s02-widget-sequenziale', {
    type: 'bar',
    xLabel: 'numero k di allarmi indipendenti osservati',
    yLabel: 'P(attacco | k allarmi)',
    xDomain: [0, 6],
    yDomain: [0, 1.05],
    liveLabel: 'posterior dopo k allarmi',
    fn: function (k, p) { return dopoKAllarmi(k, p); },
    params: [
      { key: 'logprior', label: 'Prior iniziale P(H) (log10: −2 = 0.01)', min: -6, max: -0.5, step: 0.1, value: -2 },
      { key: 'sens', label: 'Sensibilità di ogni rilevatore P(E | H)', min: 0.5, max: 1, step: 0.01, value: 0.99 },
      { key: 'fpr', label: 'Falsi positivi di ogni rilevatore P(E | Hᶜ)', min: 0.001, max: 0.2, step: 0.001, value: 0.01 }
    ],
    reference: { label: 'IDS del Prologo, prior 1%', params: { logprior: -2, sens: 0.99, fpr: 0.01 } },
    stats: function (p) {
      return [
        { label: 'Prior P(H)', value: Math.pow(10, p.logprior).toPrecision(2) },
        { label: 'Dopo 1 allarme', value: (100 * dopoKAllarmi(1, p)).toFixed(2) + '%' },
        { label: 'Dopo 2 allarmi', value: (100 * dopoKAllarmi(2, p)).toFixed(2) + '%' },
        { label: 'Dopo 3 allarmi', value: (100 * dopoKAllarmi(3, p)).toFixed(2) + '%' }
      ];
    },
    caption: 'Ogni allarme usa come prior il posterior dell’allarme precedente. Vale SOLO se gli allarmi sono condizionatamente indipendenti dato lo stato del sistema: due rilevatori che leggono gli stessi log non lo sono.'
  });
});
</script>

---

## Atto V: Esempi svolti

Ora applichiamo quanto visto a una serie di problemi. Per ciascuno seguiamo sempre gli stessi passi:

1. **dare un nome agli eventi** (qual è l'ipotesi nascosta? qual è l'evidenza osservata?);
2. **tradurre i dati in simboli**, stando attenti a che cosa sta a destra e a sinistra della barra;
3. **controllare che le ipotesi formino una partizione** (i prior sommano a 1?);
4. **calcolare verosimiglianza × prior** per ogni ipotesi, **sommare**, **dividere**.

!!! esempio-svolto "Esempio 1 — Il test medico, fino in fondo"
    *Dati:* prevalenza $P(H) = 0.01$, sensibilità $P(E \mid H) = 0.95$, specificità $P(E^c \mid H^c) = 0.90$, quindi falsi positivi $P(E \mid H^c) = 0.10$.

    *Test positivo:*

    $$
    P(H \mid E) = \frac{0.95 \cdot 0.01}{0.95 \cdot 0.01 + 0.10 \cdot 0.99} = \frac{0.0095}{0.1085} \approx 0.088.
    $$

    *Test negativo:* ora l'evidenza è $E^c$. Le foglie compatibili sono $H \cap E^c$ (probabilità $0.01 \cdot 0.05 = 0.0005$) e $H^c \cap E^c$ (probabilità $0.99 \cdot 0.90 = 0.8910$). Quindi

    $$
    P(H \mid E^c) = \frac{0.0005}{0.0005 + 0.8910} = \frac{0.0005}{0.8915} \approx 0.00056.
    $$

    *Lettura:* dopo un positivo la probabilità di malattia sale dall'1% a circa il 9%; dopo un negativo scende dall'1% a circa lo 0,06%. **Questo test è molto più utile per escludere la malattia che per confermarla.** Un positivo non è una diagnosi: è un motivo per fare un secondo esame, indipendente dal primo (ricordi l'aggiornamento sequenziale?).

!!! esempio-svolto "Esempio 2 — Il quiz di Harvard (1978)"
    *Dati:* prevalenza $1/1000$, falsi positivi $5\%$. La domanda non dice nulla sulla sensibilità; di solito si suppone che il test riconosca **sempre** i malati, $P(E \mid H) = 1$.

    $$
    P(H \mid E) = \frac{1 \cdot 0.001}{1 \cdot 0.001 + 0.05 \cdot 0.999} = \frac{0.001}{0.05095} \approx 0.0196 \approx 2\%.
    $$

    *In frequenze naturali:* su 1000 persone, 1 è malata e risulta positiva; delle 999 sane, circa il 5%, cioè circa 50, risulta positiva per errore. Dei circa 51 positivi, solo 1 è malato: circa il 2%. La risposta più comune tra i medici, 95%, confondeva $1 - P(E \mid H^c)$ con $P(H \mid E)$.

!!! esempio-svolto "Esempio 3 — Il virus (Baron, Esempi 2.32 e 2.34)"
    Un test per un'infezione virale (anche un virus su una rete informatica) è affidabile al 95% sugli infetti e al 99% sui sani. Sia $V$ = «infetto» ed $S$ = «il test segnala l'infezione».

    *Traduzione attenta:* «affidabile al 95% sugli infetti» significa $P(S \mid V) = 0.95$. «Affidabile al 99% sui sani» significa che il test **conferma che il sano è sano** nel 99% dei casi: $P(S^c \mid V^c) = 0.99$. Quindi il test segnala per errore un sano con probabilità $P(S \mid V^c) = 1 - 0.99 = 0.01$.

    (È facile sbagliare proprio qui e scrivere $P(S \mid V^c) = 0.99$: significherebbe che il 99% dei sani risulta positivo! Chiediti sempre: *questo numero, di quale evento è la probabilità, e sapendo che cosa?*)

    *Con prevalenza 4%:* $P(V) = 0.04$.

    $$
    P(V \mid S) = \frac{0.95 \cdot 0.04}{0.95 \cdot 0.04 + 0.01 \cdot 0.96} = \frac{0.038}{0.038 + 0.0096} = \frac{0.038}{0.0476} \approx 0.798.
    $$

    *Confronto:* con lo stesso test, se la prevalenza fosse l'1% il posterior sarebbe circa $0.49$. Passando dall'1% al 4% di prevalenza, il posterior sale da circa il 49% a circa l'80%. Il test non è cambiato: è cambiato il **prior**.

!!! esempio-svolto "Esempio 4 — Diagnostica del codice (Baron, Esempio 2.35)"
    Un programma ha due moduli. Il modulo I contiene un errore con probabilità $0.2$; il modulo II con probabilità $0.4$, indipendentemente dal primo. Un errore **solo** nel modulo I fa andare in crash il programma con probabilità $0.5$; un errore **solo** nel modulo II con probabilità $0.8$; errori in **entrambi** con probabilità $0.9$. Il programma è andato in crash ($C$). Con che probabilità ci sono errori in entrambi i moduli?

    *Passo 1 — La partizione giusta.* Siano $A$ = «errore nel modulo I» e $B$ = «errore nel modulo II». Le verosimiglianze sono date per «solo I», «solo II», «entrambi», quindi le ipotesi devono essere questi casi, più quello che manca:

    $$
    \{\,A \cap B^c \ (\text{solo I}),\ \ A^c \cap B \ (\text{solo II}),\ \ A \cap B \ (\text{entrambi}),\ \ A^c \cap B^c \ (\text{nessuno})\,\}.
    $$

    Sono quattro casi che si escludono a vicenda e coprono tutto. (Ricorda il controesempio dell'Atto IV: $\{A, B, A \cap B\}$ **non** va bene.)

    *Passo 2 — I prior.* Per l'indipendenza, $P(A \cap B) = 0.2 \cdot 0.4 = 0.08$. Poiché $A$ si divide in «solo I» ed «entrambi», $P(\text{solo I}) = 0.2 - 0.08 = 0.12$. Allo stesso modo $P(\text{solo II}) = 0.4 - 0.08 = 0.32$. Per differenza, $P(\text{nessuno}) = 1 - 0.12 - 0.32 - 0.08 = 0.48$ (controllo: coincide con $0.8 \cdot 0.6$, come deve per l'indipendenza).

    *Passo 3 — Verosimiglianza × prior, somma, divisione.*

    | Ipotesi | Prior | Verosimiglianza $P(C \mid \cdot)$ | Prodotto | Posterior $P(\cdot \mid C)$ |
    |:---|---:|---:|---:|---:|
    | solo I | 0.12 | 0.5 | 0.060 | 0.155 |
    | solo II | 0.32 | 0.8 | 0.256 | **0.660** |
    | entrambi | 0.08 | 0.9 | 0.072 | 0.186 |
    | nessuno | 0.48 | 0 | 0 | 0 |
    | **Totale** | 1 | *(2.2: non somma a 1!)* | $P(C) = 0.388$ | 1 |

    $$
    P(A \cap B \mid C) = \frac{0.9 \cdot 0.08}{0.5 \cdot 0.12 + 0.8 \cdot 0.32 + 0.9 \cdot 0.08 + 0 \cdot 0.48} = \frac{0.072}{0.388} \approx 0.186.
    $$

    *La lettura più utile per chi fa debugging:* il colpevole più probabile è **il modulo II da solo (66%)**, non la combinazione dei due, anche se la combinazione è quella che causa il crash più spesso (verosimiglianza $0.9$). Il motivo è il prior: «solo II» è quattro volte più frequente di «entrambi». Se puoi ispezionare un solo modulo, comincia dal II.

!!! esempio-svolto "Esempio 5 — Controllo qualità: dove si è rotto?"
    Riprendiamo l'Albero 3 (materiali, design, test finale). Il prodotto **ha fallito il test finale** ($T^c$). In quale fase è nato il problema?

    *Probabilità totale.* Le foglie con $T^c$ sono quattro: $0.036$, $0.072$, $0.016$, $0.042$. Quindi $P(T^c) = 0.036 + 0.072 + 0.016 + 0.042 = 0.166$.

    *Bayes.* Le ipotesi sono i quattro nodi del secondo livello (che formano una partizione, come ogni livello di un albero). Ciascun posterior è la foglia corrispondente divisa per $0.166$:

    | Ipotesi | Foglia con $T^c$ | Posterior $P(\cdot \mid T^c)$ |
    |:---|---:|---:|
    | materiali ok, design ok | 0.036 | 0.217 |
    | materiali ok, design fallito | 0.072 | **0.434** |
    | materiali falliti, design ok | 0.016 | 0.096 |
    | materiali falliti, design fallito | 0.042 | 0.253 |

    *Lettura:* la causa più probabile di un fallimento finale è **un difetto di design con materiali buoni (43%)**. E più di un fallimento su cinque (21,7%) avviene su prodotti che avevano superato **entrambi** i controlli intermedi: è il prezzo dei falsi negativi dei controlli a monte.

---

## Laboratorio computazionale

Tutti gli script usano soltanto la libreria standard di Python e girano direttamente nel browser: premi **▶ Esegui** su ciascuno. Ogni script contiene delle istruzioni `assert`: sono controlli automatici che si fermano con un errore se un risultato non è quello atteso. Se lo script arriva in fondo senza errori, tutti i controlli sono passati. Sentiti libero di cambiare i numeri e vedere che cosa succede.

Gli script con simulazioni **Monte Carlo** usano un *seme* fisso (`random.seed(...)`): è il punto di partenza del generatore di numeri casuali, e fissarlo garantisce che ogni esecuzione produca gli stessi numeri. Prova a cambiarlo: i risultati oscilleranno leggermente, ma resteranno vicini al valore esatto.

### Script 1 — Un calcolatore ad albero per qualunque partizione {: #lab-albero }

La funzione `albero` fa in tre righe esattamente i tre passi di Bayes: calcola le foglie (regola del cammino), le somma (probabilità totale) e divide (ribaltamento). La applichiamo al test medico, ai moduli software e al controllo qualità letto all'indietro.

<div class="psi-exec" markdown="1">
```python
# Script 1 — Calcolatore ad albero: partizione {H_1,...,H_n}, evidenza E
def albero(prior, verosimiglianza):
    """prior: {H_i: P(H_i)}; verosimiglianza: {H_i: P(E | H_i)}.
    Restituisce foglie P(H_i ∩ E), P(E) (probabilità totale) e posterior P(H_i | E)."""
    assert abs(sum(prior.values()) - 1) < 1e-12, "le H_i devono formare una partizione"
    foglie = {h: prior[h] * verosimiglianza[h] for h in prior}          # regola del cammino
    p_E = sum(foglie.values())                                          # probabilità totale
    posterior = {h: foglie[h] / p_E for h in prior}                     # Bayes
    return foglie, p_E, posterior

# (a) Test medico: prevalenza 1%, sensibilità 0.95, specificità 0.90
foglie, p_pos, post = albero({"H": 0.01, "H^c": 0.99}, {"H": 0.95, "H^c": 0.10})
print(f"Test medico: P(E) = {p_pos:.4f}, P(H|E) = {post['H']:.4f}")
assert abs(p_pos - 0.1085) < 1e-12 and round(post["H"], 3) == 0.088

# (b) Partizione con n = 4 ipotesi: moduli software (Baron 2.35), E = crash
prior = {"solo I": 0.12, "solo II": 0.32, "entrambi": 0.08, "nessuno": 0.48}
lik   = {"solo I": 0.5,  "solo II": 0.8,  "entrambi": 0.9,  "nessuno": 0.0}
_, p_C, post = albero(prior, lik)
print(f"Moduli: P(C) = {p_C:.3f}")
for h, v in post.items():
    print(f"  P({h} | C) = {v:.4f}")
assert abs(p_C - 0.388) < 1e-12 and round(post["entrambi"], 4) == 0.1856
assert abs(sum(post.values()) - 1) < 1e-12        # i posterior sommano a 1

# (c) Controllo qualità a tre livelli, letto all'indietro
p_T = {(True, True): 0.95, (True, False): 0.60, (False, True): 0.60, (False, False): 0.30}
foglie3 = {}
for m, pm in [(True, 0.9), (False, 0.1)]:
    pd = 0.8 if m else 0.4
    for d, pdd in [(True, pd), (False, 1 - pd)]:
        for t, pt in [(True, p_T[(m, d)]), (False, 1 - p_T[(m, d)])]:
            foglie3[(m, d, t)] = pm * pdd * pt                        # prodotto lungo il cammino
assert abs(sum(foglie3.values()) - 1) < 1e-12
p_Tc = sum(v for (m, d, t), v in foglie3.items() if not t)
dove = {(m, d): foglie3[(m, d, False)] / p_Tc for (m, d) in p_T}
print(f"Qualità: P(T) = {1 - p_Tc:.3f}, P(T^c) = {p_Tc:.3f}")
for (m, d), v in dove.items():
    print(f"  P({'M' if m else 'M^c'}∩{'D' if d else 'D^c'} | T^c) = {v:.4f}")
assert abs(p_Tc - 0.166) < 1e-12 and round(dove[(True, False)], 4) == 0.4337
print("Script 1: tutti gli assert superati.")
```
</div>

### Script 2 — Quanto conta la prevalenza {: #lab-prevalenza }

La funzione `posteriore_bayes` riceve prevalenza, sensibilità e specificità e restituisce $P(H \mid E)$. Attenzione alla riga `falsi_positivi = 1 - specificita`: è la traduzione corretta di «specificità» che abbiamo discusso nell'Esempio 3. Lo script ricalcola i tre esempi e poi stampa, come tabella, quello che il primo grafico interattivo mostra come curva.

<div class="psi-exec" markdown="1">
```python
# Script 2 — posteriore_bayes e variazione della prevalenza
def posteriore_bayes(prevalenza, sensibilita, specificita):
    """P(H | E) dati P(H), sensibilità P(E | H) e specificità P(E^c | H^c)."""
    falsi_positivi = 1 - specificita
    numeratore = sensibilita * prevalenza
    return numeratore / (numeratore + falsi_positivi * (1 - prevalenza))

casi = [("Test medico (1%, 0.95, 0.90)", 0.01, 0.95, 0.90, 0.088, 3),
        ("IDS del Prologo (1%, 99%, 99%)", 0.01, 0.99, 0.99, 0.5, 6),
        ("Baron 2.34 (4%, 0.95, 0.99)", 0.04, 0.95, 0.99, 0.7983, 4)]
for nome, prev, sens, spec, atteso, cifre in casi:
    p = posteriore_bayes(prev, sens, spec)
    print(f"{nome:34s} P(H|E) = {p:.4f}")
    assert round(p, cifre) == atteso

print("IDS con sensibilità = specificità = 0.99, al variare della prevalenza:")
for prev in [0.5, 0.1, 0.01, 0.001, 0.0001]:
    print(f"  prevalenza {prev:<7} -> P(attacco|allarme) = {posteriore_bayes(prev, 0.99, 0.99):.4f}")
assert posteriore_bayes(0.0001, 0.99, 0.99) < 0.01          # meno di un allarme su cento
print("Script 2: tutti gli assert superati.")
```
</div>

### Script 3 — Simulare 200.000 connessioni {: #lab-montecarlo }

Finora abbiamo ottenuto il 50% con un ragionamento puramente matematico, partendo dagli assiomi. Ora lo verifichiamo **contando**: simuliamo tante connessioni, ciascuna con l'1% di probabilità di essere un attacco, facciamo reagire un IDS virtuale e contiamo quanti allarmi corrispondono ad attacchi veri. È il ponte tra le due letture della probabilità viste nella Settimana 1: quella come *grado di fiducia* (Bayes) e quella come *frequenza a lungo andare* (la simulazione).

Con circa 4.000 allarmi, la frequenza osservata oscilla attorno a 0.5 di circa $\pm 0.008$; il controllo finale accetta scarti fino a $0.04$.

<div class="psi-exec" markdown="1">
```python
# Script 3 — Monte Carlo IDS: la frequenza converge al posterior di Bayes
import random
random.seed(2627)
N, prev, sens, fpr = 200_000, 0.01, 0.99, 0.01
allarmi = veri = 0
for _ in range(N):
    attacco = random.random() < prev
    allarme = random.random() < (sens if attacco else fpr)
    if allarme:
        allarmi += 1
        veri += attacco
freq = veri / allarmi
bayes = sens * prev / (sens * prev + fpr * (1 - prev))
print(f"Connessioni simulate: {N}")
print(f"Allarmi: {allarmi}, di cui veri: {veri}")
print(f"Frequenza empirica P(attacco|allarme) = {freq:.4f}  (Bayes: {bayes:.4f})")
assert abs(bayes - 0.5) < 1e-12
assert abs(freq - bayes) < 0.04          # deviazione standard attesa ≈ 0.008
print("Script 3: tutti gli assert superati.")
```
</div>

### Script 4 — Il secondo allarme {: #lab-sequenziale }

Verifichiamo che, con due rilevatori condizionatamente indipendenti, aggiornare in sequenza e aggiornare in blocco danno lo stesso risultato: $0.95$. Nella parte Monte Carlo, il secondo allarme viene generato in modo indipendente dal primo **una volta noto** se c'è un attacco: è così che si costruisce l'indipendenza condizionata in una simulazione.

*Da provare:* modifica la simulazione in modo che `e2 = e1` (il secondo rilevatore copia il primo). Il posterior stimato torna a circa $0.5$ e l'ultimo `assert` fallisce, giustamente: il secondo allarme non porta nessuna informazione nuova, e la formula che dava $0.95$ non vale più.

<div class="psi-exec" markdown="1">
```python
# Script 4 — Aggiornamento sequenziale vs in blocco (rilevatori condizionatamente indipendenti)
import random
def aggiorna(prior, p_E_H, p_E_Hc):
    return p_E_H * prior / (p_E_H * prior + p_E_Hc * (1 - prior))

prior = 0.01
d1 = (0.99, 0.01)     # (sensibilità, tasso di falsi positivi) del rilevatore di rete
d2 = (0.95, 0.05)     # rilevatore sul server, condizionatamente indipendente dato H
post1 = aggiorna(prior, *d1)
post12 = aggiorna(post1, *d2)                                   # il posterior diventa prior
blocco = aggiorna(prior, d1[0] * d2[0], d1[1] * d2[1])          # E1 ∩ E2 in un colpo solo
print(f"Dopo E1: {post1:.4f} | dopo E1 poi E2: {post12:.4f} | in blocco: {blocco:.4f}")
assert round(post1, 6) == 0.5 and abs(post12 - blocco) < 1e-12
assert round(blocco, 6) == 0.95

# Verifica Monte Carlo: si generano E1 ed E2 indipendenti *dato* H
random.seed(7)
n12 = h12 = 0
for _ in range(400_000):
    h = random.random() < prior
    e1 = random.random() < (d1[0] if h else d1[1])
    e2 = random.random() < (d2[0] if h else d2[1])
    if e1 and e2:
        n12 += 1; h12 += h
print(f"Monte Carlo P(H|E1∩E2) = {h12/n12:.4f} su {n12} doppi allarmi")
assert abs(h12 / n12 - blocco) < 0.02
print("Script 4: tutti gli assert superati.")
```
</div>

### Script 5 — Simulare i moduli software {: #lab-moduli }

Qui simuliamo l'Esempio 4 **senza** costruire la partizione: estraiamo a caso gli errori nei due moduli, poi il crash, e contiamo. Nota come la partizione in quattro casi compaia da sola nel codice, sotto forma di `if` / `elif`: non è un artificio matematico, è la descrizione dei casi che il programma deve distinguere.

<div class="psi-exec" markdown="1">
```python
# Script 5 — Monte Carlo dei moduli software (Baron, Esempio 2.35)
import random
random.seed(235)
N = 400_000
crash = entrambi = 0
for _ in range(N):
    a = random.random() < 0.2          # errore nel modulo I
    b = random.random() < 0.4          # errore nel modulo II (indipendente)
    p_c = 0.9 if (a and b) else 0.5 if a else 0.8 if b else 0.0
    if random.random() < p_c:
        crash += 1
        entrambi += (a and b)
esatto = 0.9 * 0.08 / (0.5 * 0.12 + 0.8 * 0.32 + 0.9 * 0.08)
print(f"P(C) empirica = {crash/N:.4f} (esatta 0.388)")
print(f"P(A∩B|C) empirica = {entrambi/crash:.4f} (esatta {esatto:.4f})")
assert round(esatto, 4) == 0.1856
assert abs(crash / N - 0.388) < 0.005 and abs(entrambi / crash - esatto) < 0.01
print("Script 5: tutti gli assert superati.")
```
</div>

### Script 6 — Il tavolo di Bayes {: #lab-tavolo }

Torniamo al tavolo quadrato dell'Atto I. Lo dividiamo in 10 strisce parallele e ci chiediamo in quale striscia si trovi la linea della palla W. All'inizio non sappiamo nulla, quindi diamo a tutte le strisce la stessa probabilità (è il postulato che tormentava Bayes!).

Se la linea di W sta alla frazione $x$ della larghezza del tavolo, ogni lancio di O cade «di qua» (evento M) con probabilità $x$. Dopo $p$ eventi M e $q$ eventi «non M», la verosimiglianza della striscia $j$ è $x_j^{\,p}\,(1 - x_j)^{q}$, e il posterior si ottiene con i soliti tre passi: moltiplica per il prior, somma, dividi. È il Teorema di Bayes con una partizione di 10 ipotesi.

Guarda come l'istogramma, piatto all'inizio, si concentra lancio dopo lancio attorno alla posizione vera. In fondo, con strisce sottilissime, lo script ritrova due risultati storici:

1. **Il «3 contro 1» di Price.** Dopo una sola osservazione favorevole, la probabilità che $x$ superi $\tfrac12$ vale $\tfrac34$, cioè una scommessa di 3 contro 1. Price lo calcola nell'appendice del saggio, ed è il numero del suo esempio del sole.
2. **La regola di successione di Laplace.** La media a posteriori vale $(p+1)/(n+2)$, dove $n = p + q$ è il numero totale di lanci. È la regola con cui Laplace ottiene le sue 1.826.214 contro 1.

<div class="psi-exec" markdown="1">
```python
# Script 6 — Il tavolo di Bayes discretizzato
import random
def posterior_tavolo(p, q, strisce):
    """Posterior sulla striscia di W dopo p eventi M e q eventi M^c (prior uniforme)."""
    centri = [(j + 0.5) / strisce for j in range(strisce)]
    pesi = [x**p * (1 - x)**q for x in centri]       # prior uniforme × verosimiglianza
    Z = sum(pesi)                                    # normalizzazione (probabilità totale)
    return centri, [w / Z for w in pesi]

random.seed(1763)
w = random.random()                                  # posizione (nascosta) della palla W
lanci = [random.random() < w for _ in range(20)]     # evento M: O cade dalla parte "di qua"
print(f"Posizione nascosta di W: {w:.3f}")
for k in (0, 1, 5, 20):
    p = sum(lanci[:k]); q = k - p
    centri, post = posterior_tavolo(p, q, 10)
    assert abs(sum(post) - 1) < 1e-12
    barre = " ".join(f"{v:.2f}" for v in post)
    print(f"k={k:2d} (p={p:2d}, q={q:2d}): {barre}")

# Con strisce sottilissime si ritrovano i risultati di Price e Laplace
centri, post = posterior_tavolo(1, 0, 10_000)
p_oltre_meta = sum(v for x, v in zip(centri, post) if x > 0.5)
print(f"Dopo un'alba: P(x > 1/2) = {p_oltre_meta:.4f}  -> {p_oltre_meta/(1-p_oltre_meta):.2f} contro 1")
assert abs(p_oltre_meta - 0.75) < 1e-3
centri, post = posterior_tavolo(7, 3, 10_000)
media = sum(x * v for x, v in zip(centri, post))
print(f"p=7, q=3: media a posteriori = {media:.4f}  (regola di successione (p+1)/(n+2) = {8/12:.4f})")
assert abs(media - 8 / 12) < 1e-4
n = 1_826_213                                         # giorni in 5000 anni (Laplace)
print(f"Sole di Laplace: (n+1) contro 1 = {n + 1} contro 1")
print("Script 6: tutti gli assert superati.")
```
</div>

---

## Il Takeaway per l'Ingegnere del Software

### 1. Perché gli allarmi di sicurezza sono quasi sempre falsi

Rifacciamo a mente un conto con numeri tondi. Un sistema di monitoraggio della sicurezza (un **SIEM**, *Security Information and Event Management*: il software che raccoglie e analizza i log di un'intera azienda) esamina **1.000.000 di eventi al giorno**.

* Se il suo tasso di falsi positivi è dell'1%, produce circa **10.000 falsi allarmi al giorno**, *qualunque sia la sua sensibilità*.
* Se gli eventi davvero malevoli sono 100 al giorno (prevalenza $10^{-4}$), anche un rilevatore **perfetto** sugli attacchi produce al massimo 100 allarmi veri: **meno dell'1% del totale**.
* Per portare la frazione di allarmi veri al 90% serve un tasso di falsi positivi dell'ordine di $10^{-5}$ (lo abbiamo calcolato nell'Atto IV).

Il nome operativo del fenomeno è **alert fatigue**, «stanchezza da allarmi»: gli analisti, sommersi da allarmi quasi sempre falsi, imparano a ignorarli, e l'allarme vero finisce in una coda che nessuno legge più. La probabilità spiega perché il problema **non** si risolve comprando un rilevatore più sensibile. Le leve che funzionano sono tre, e ognuna corrisponde a un pezzo della formula di Bayes:

1. **abbassare i falsi positivi $P(E \mid H^c)$**: regole più specifiche, liste di eccezioni note (*allow-list*), soppressione dei falsi positivi già riconosciuti;
2. **alzare il prior prima di valutare l'allarme**: considerare il contesto (un server critico, un utente amministratore, un orario anomalo). Tecnicamente significa condizionare su informazioni aggiuntive e ragionare con $P(\cdot \mid \text{contesto})$, un universo in cui gli attacchi sono meno rari;
3. **incrociare rilevatori condizionatamente indipendenti**: due allarmi indipendenti dato lo stato del sistema si possono usare uno dopo l'altro, e ognuno alza il posterior. Ma due rilevatori che leggono gli stessi log **non** lo sono.

### 2. Il dizionario del machine learning

La tabella delle frequenze naturali è la **matrice di confusione** che si usa per valutare qualunque classificatore. Ogni metrica del machine learning è una delle probabilità di questa settimana, con un altro nome:

| Metrica ML | Formula sui conteggi | Probabilità | Nome in questa settimana |
|:---|:---|:---|:---|
| **Recall** (sensibilità, TPR) | TP / (TP + FN) | $P(E \mid H)$ | verosimiglianza (sotto $H$) |
| **Specificità** (TNR) | TN / (TN + FP) | $P(E^c \mid H^c)$ | complemento della verosimiglianza sotto $H^c$ |
| **False positive rate** (FPR) | FP / (FP + TN) | $P(E \mid H^c) = 1 -$ specificità | verosimiglianza (sotto $H^c$) |
| **Prevalenza** | (TP + FN) / N | $P(H)$ | prior |
| **Tasso di positivi predetti** (*positive prediction rate*, tasso di allarme) | (TP + FP) / N | $P(E)$ | **evidenza** |
| **Precision** (PPV, *positive predictive value*, valore predittivo positivo) | TP / (TP + FP) | $P(H \mid E)$ | **posterior** |
| **NPV** (*negative predictive value*, valore predittivo negativo) | TN / (TN + FN) | $P(H^c \mid E^c)$ | posterior del test negativo |
| **Accuracy** | (TP + TN) / N | $P(E \mid H)P(H) + P(E^c \mid H^c)P(H^c)$ | probabilità totale |

(TP, FN, FP, TN sono i quattro conteggi della matrice di confusione: veri positivi, falsi negativi, falsi positivi, veri negativi; N è il totale.)

Due conseguenze importanti:

* **La precision è il Teorema di Bayes**:

    $$
    \text{precision} = \frac{\text{recall} \cdot \text{prevalenza}}{\text{recall} \cdot \text{prevalenza} + \text{FPR} \cdot (1 - \text{prevalenza})}.
    $$

    Dipende dalla prevalenza, mentre recall e FPR no. Per questo un modello con precision del 50% in laboratorio, dove metà dei dati di test sono attacchi, può avere una precision disastrosa in produzione, dove gli attacchi sono l'1%. (È un buon esercizio: calcola quanto diventa.) 
* **«Accurato al 99%» da solo non significa nulla.** L'accuracy è una media pesata di sensibilità e specificità, con pesi prevalenza e $1 -$ prevalenza (è la probabilità totale). Con prevalenza 1%, un rilevatore che **non segnala mai nulla** ha accuracy del 99%, recall pari a 0 e precision indefinita. 

### 3. Il debugging è probabilità inversa

Fare debugging significa ragionare **dall'effetto** (il sintomo: un crash, un test rosso) **alla causa** (il difetto nel codice). È la struttura dell'Esempio 4.

* **Il colpevole più probabile non è quello che causa più spesso il sintomo.** Nell'esempio dei moduli, la verosimiglianza più alta è quella di «entrambi i moduli» (0.9), ma il posterior più alto è quello di «solo modulo II» (0.66), perché il suo prior è quattro volte più grande.
* **Il prior viene dal contesto.** Un rilascio di dieci minuti fa, un componente appena modificato, una libreria appena aggiornata: sono informazioni che alzano la probabilità a priori di certe cause ancora prima di leggere il messaggio d'errore.
* **In che ordine ispezionare.** Se ispezionare un modulo costa lo stesso per tutti e rivela con certezza se il difetto c'è, conviene ispezionare le ipotesi **in ordine di posterior decrescente**: così si minimizza il numero medio di ispezioni.
* **Le pipeline di test sono alberi.** Il controllo qualità dell'Esempio 5 è lo schema di ogni pipeline di integrazione continua (CI/CD): la build fallisce all'ultimo stadio e la domanda è in quale stadio precedente sia nato il problema. L'albero dà la risposta e mostra il costo dei controlli intermedi che lasciano passare difetti.

### 4. Bayes nell'era dell'intelligenza artificiale

* **Il cervello bayesiano.** Nelle neuroscienze computazionali è stata proposta l'ipotesi che il cervello rappresenti le informazioni sensoriali in forma probabilistica e le combini con le aspettative precedenti in un modo vicino a quello ottimo di Bayes ([Knill & Pouget, 2004](https://doi.org/10.1016/j.tins.2004.10.007)). È un'**ipotesi di ricerca** influente, sostenuta da esperimenti su percezione e movimento, non un fatto acquisito.
* **Il denominatore che non si riesce a calcolare.** Il denominatore di Bayes, $P(E) = \sum_i P(E \mid H_i)\,P(H_i)$, è una somma su **tutte** le ipotesi. Con due ipotesi è banale. Ma quando le «ipotesi» sono tutte le possibili configurazioni di milioni di variabili nascoste in un modello di deep learning, quella somma diventa impossibile da calcolare esattamente.
* **Approssimare invece di calcolare.** I *Variational Autoencoder* ([Kingma & Welling, 2013](https://arxiv.org/abs/1312.6114)) affrontano proprio questo problema: invece di calcolare il posterior esatto, lo approssimano con una famiglia di distribuzioni più semplici, ottimizzando un limite inferiore (tecnica detta *inferenza variazionale*). Anche i modelli di diffusione che generano immagini ([Ho, Jain & Abbeel, 2020](https://arxiv.org/abs/2006.11239)) vengono addestrati su un limite variazionale di questo tipo.


Nella Settimana 12 chiuderemo il cerchio con il classificatore **Naive Bayes**: il Teorema di Bayes con partizione, più l'ipotesi di indipendenza condizionata, riscritto nella forma a odds.

---

## Errori da evitare

1. **Confondere l'inverso.** Leggere $P(E \mid H)$ come se fosse $P(H \mid E)$. Rimedio: leggi sempre ad alta voce, «probabilità di *allarme* sapendo che c'è un *attacco*» contro «probabilità di *attacco* sapendo che c'è un *allarme*». Le due differiscono per il fattore $P(H)/P(E)$.
2. **Fidarsi di «accurato al 99%».** Senza sensibilità, specificità e prevalenza separate, quella frase non definisce nessun numero utile.
3. **Sommare le condizionate sbagliate.** $P(A \mid B) + P(A^c \mid B) = 1$ è vero; $P(A \mid B) + P(A \mid B^c) = 1$ in generale è falso (controesempio: $0.95 + 0.10 = 1.05$).
4. **Usare ipotesi che non formano una partizione.** Per esempio $\{A, B, A \cap B\}$ per i due moduli: conta due volte gli errori in entrambi e dimentica «nessun errore». Controllo: i prior devono sommare a 1.
5. **Trattare la verosimiglianza come una distribuzione.** Non stupirti se $\sum_j P(E \mid H_j) \neq 1$, e non «normalizzarla»: sono i posterior a sommare a 1.
6. **Contare due volte la stessa evidenza.** Riusare le verosimiglianze del produttore per due rilevatori che leggono gli stessi log: non sono condizionatamente indipendenti, e il posterior che ne esce è troppo sicuro di sé.
7. **Pensare di poter ignorare il prior.** Ignorarlo significa usare implicitamente il prior «50 e 50», che di solito è il più sbagliato di tutti.

---

## Riepilogo

* Il condizionamento si può percorrere **in avanti** (dalla causa all'effetto, $P(E \mid H)$) o **all'indietro** (dall'effetto alla causa, $P(H \mid E)$). I due numeri possono essere lontanissimi: scambiarli è la **confusione dell'inverso**.
* Un **albero di probabilità** ha eventi nei nodi, probabilità condizionate sui rami, e figli che formano una **partizione** del padre. La probabilità di un nodo è il **prodotto dei rami** lungo il cammino.
* **Probabilità totale:** $P(E) = \sum_i P(E \mid H_i)\,P(H_i)$, cioè la somma delle foglie compatibili con $E$.
* **Teorema di Bayes:** $P(H_j \mid E) = P(E \mid H_j)\,P(H_j) \,/\, P(E)$, cioè una foglia divisa per la somma delle foglie compatibili con $E$. È il **ribaltamento dell'albero**.
* **Vocabolario:** prior $P(H)$, verosimiglianza $P(E \mid H)$, evidenza $P(E)$, posterior $P(H \mid E)$. Posterior $\propto$ verosimiglianza $\times$ prior.
* **Aggiornamento sequenziale:** il posterior di oggi è **sempre** il prior di domani; riusare le verosimiglianze originali (e moltiplicarle) è lecito solo con evidenze **condizionatamente indipendenti**, cioè indipendenti una volta noto lo stato del sistema.
* **Quando l'ipotesi è rara, il prior domina anche un test eccellente.** Un IDS al 99% su attacchi che sono l'1% del traffico produce allarmi veri solo nel 50% dei casi; se gli attacchi sono uno su diecimila, meno di un allarme su cento è vero. Conta il tasso di falsi allarmi.

---

## Riferimenti e Fonti Primarie (Open Access Online)

**Fonti storiche**

* **Thomas Bayes & Richard Price (1763)** — *An Essay towards solving a Problem in the Doctrine of Chances*, Philosophical Transactions of the Royal Society 53, 370–418. [DOI 10.1098/rstl.1763.0053](https://doi.org/10.1098/rstl.1763.0053); scansione libera su [Internet Archive](https://archive.org/details/philtrans09948070).
* **Pierre-Simon Laplace (1774)** — *Mémoire sur la probabilité des causes par les évènements*; ristampato nelle *Œuvres complètes*, t. 8, su [Gallica](https://gallica.bnf.fr/ark:/12148/bpt6k77596b).
* **Pierre-Simon Laplace (1814)** — *Essai philosophique sur les probabilités* (trad. ingl. Truscott & Emory, 1902). [Project Gutenberg](https://www.gutenberg.org/files/58881/58881-h/58881-h.htm); [Internet Archive](https://archive.org/details/philosophicaless00lapliala).
* **David Hume (1748)** — *An Enquiry concerning Human Understanding*. [Project Gutenberg](https://www.gutenberg.org/ebooks/9662).

**Storia della statistica**

* **Stephen M. Stigler (1986)** — *Laplace's 1774 Memoir on Inverse Probability*, Statistical Science 1(3), 359–363 (con traduzione inglese della memoria). [DOI 10.1214/ss/1177013620](https://doi.org/10.1214/ss/1177013620).
* **Stephen M. Stigler (2013)** — *The True Title of Bayes's Essay*, Statistical Science 28(3), 283–288. [arXiv:1310.0173](https://arxiv.org/abs/1310.0173).
* **David R. Bellhouse (2004)** — *The Reverend Thomas Bayes, FRS: A Biography to Celebrate the Tercentenary of His Birth*, Statistical Science 19(1), 3–43. [DOI 10.1214/088342304000000189](https://doi.org/10.1214/088342304000000189).

**Psicologia del ragionamento e sicurezza informatica**

* **Ward Casscells, Arno Schoenberger & Thomas B. Graboys (1978)** — *Interpretation by Physicians of Clinical Laboratory Results*, New England Journal of Medicine 299, 999–1001. [DOI 10.1056/NEJM197811022991808](https://doi.org/10.1056/NEJM197811022991808); resoconto del testo della domanda in [PMC4955674](https://pmc.ncbi.nlm.nih.gov/articles/PMC4955674/).
* **Gerd Gigerenzer & Ulrich Hoffrage (1995)** — *How to Improve Bayesian Reasoning Without Instruction: Frequency Formats*, Psychological Review 102(4), 684–704. [DOI 10.1037/0033-295X.102.4.684](https://doi.org/10.1037/0033-295X.102.4.684).
* **Stefan Axelsson (2000)** — *The Base-Rate Fallacy and the Difficulty of Intrusion Detection*, ACM Transactions on Information and System Security 3(3), 186–205. [DOI 10.1145/357830.357849](https://doi.org/10.1145/357830.357849).

**Manuale di riferimento degli esempi**

* **Michael Baron (2014)** — *Probability and Statistics for Computer Scientists*, 2ª ed., CRC Press, §2.4 (Esempi 2.32–2.35). [Scheda ACM Digital Library](https://dl.acm.org/doi/book/10.5555/2536837).
* **Notebook Colab del corso** — [2.4 Probabilità condizionata](https://colab.research.google.com/github/QwertyJacob/colab_handouts_PSI/blob/main/2.4_probcond.ipynb) e [2.4 BONUS Alberi di probabilità](https://colab.research.google.com/github/QwertyJacob/colab_handouts_PSI/blob/main/2.4BONUS_alberi_prob.ipynb) (repository [colab_handouts_PSI](https://github.com/QwertyJacob/colab_handouts_PSI)).

**Intelligenza artificiale e machine learning**

* **David C. Knill & Alexandre Pouget (2004)** — *The Bayesian brain: the role of uncertainty in neural coding and computation*, Trends in Neurosciences 27(12), 712–719. [DOI 10.1016/j.tins.2004.10.007](https://doi.org/10.1016/j.tins.2004.10.007).
* **Diederik P. Kingma & Max Welling (2013)** — *Auto-Encoding Variational Bayes*. [arXiv:1312.6114](https://arxiv.org/abs/1312.6114).
* **Jonathan Ho, Ajay Jain & Pieter Abbeel (2020)** — *Denoising Diffusion Probabilistic Models*. [arXiv:2006.11239](https://arxiv.org/abs/2006.11239).
* **Yarin Gal & Zoubin Ghahramani (2016)** — *Dropout as a Bayesian Approximation: Representing Model Uncertainty in Deep Learning*, ICML 2016. [arXiv:1506.02142](https://arxiv.org/abs/1506.02142).

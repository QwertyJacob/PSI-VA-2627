[:material-presentation: Apri Slide della Lezione](slides/index.html){ .md-button .md-button--primary target="_blank" }

# Settimana 3 — L'estate del 1654: contare i futuri possibili
*Come due lettere tra Parigi e Tolosa hanno insegnato a pesare ciò che non è ancora accaduto, e perché lo stesso conteggio spiega le collisioni nelle tabelle hash.*

---

## Prima di cominciare: che cosa ci serve dalle Settimane 1 e 2 {: #prima-di-cominciare }

Questa settimana si **conta** molto, ma gli strumenti che servono sono pochi e già noti. Se uno di questi ti sembra incerto, rileggi la sezione indicata.

* **Spazio campionario equiprobabile.** Se $\Omega$ ha un numero finito di esiti tutti ugualmente plausibili, la probabilità di un evento $A$ si riduce a un conteggio: $P(A) = |A| / |\Omega|$, dove $|A|$ è il numero di esiti dentro $A$ ([Settimana 1, §7](../settimana_01/index.md#7-larrivo-dellinformazione-il-condizionamento-come-zoom-nello-spazio-campionario)). Dimenticare l'ipotesi «tutti ugualmente plausibili» è l'errore più comune: ci torneremo.
* **Complementare.** $P(A^c) = 1 - P(A)$ ([Settimana 1, §6B](../settimana_01/index.md#b-la-regola-del-complementare)). Spesso è più facile contare ciò che *non* vogliamo.
* **Regola del prodotto.** $P(A \cap B) = P(A)\,P(B \mid A)$ ([Settimana 1, §8](../settimana_01/index.md#8-la-regola-del-prodotto-e-la-scomposizione-sequenziale)). Per esempio, due assi di fila da un mazzo di 52 carte, senza rimettere la prima: $\frac{4}{52}\cdot\frac{3}{51} = \frac{1}{221}$.
* **Indipendenza.** Se $A$ e $B$ sono indipendenti, $P(A \cap B) = P(A)\,P(B)$ ([Settimana 1, §9](../settimana_01/index.md#9-indipendenza-stocastica-e-il-trabocchetto-fondamentale)).
* **Alberi di probabilità.** Ogni cammino dalla radice a una foglia è un possibile futuro; la sua probabilità è il prodotto dei numeri sui rami ([Settimana 2, Atto II](../settimana_02/index.md#atto-ii-vedere-il-ragionamento-gli-alberi-di-probabilita)). Useremo la stessa convenzione grafica.

---

## Prima una trappola: due monete {: #due-monete }

Prima di qualsiasi storia, un esperimento di trenta secondi. **Lanci una moneta onesta due volte. Qual è la probabilità di ottenere almeno una testa?** Fermati e scrivi la tua risposta prima di leggere oltre.

Ecco un ragionamento che sembra impeccabile. Si lancia la prima volta: se esce testa ($T$) si è già vinto, e il secondo lancio non serve. Se esce croce ($C$), si lancia la seconda volta, e può uscire testa o croce. Gli esiti da distinguere sono tre:

$$
T, \qquad CT, \qquad CC,
$$

e due su tre contengono una testa. Risposta: $\tfrac23$.

È il ragionamento che **Jean Le Rond d'Alembert**, uno dei maggiori matematici del suo tempo, pubblicò nell'ottobre del 1754 nella voce *Croix ou pile* dell'*Encyclopédie* (vol. IV, pp. 512–513). Nel testo riconosce che la risposta che si trova «in tutti gli autori» è quella delle quattro combinazioni, cioè «3 contro 1», ma la mette in dubbio: «il secondo lancio non conta per nulla», quindi le combinazioni vere sarebbero tre e le probabilità «2 contro 1». Estende anche il ragionamento a tre lanci (testa; croce, testa; croce, croce, testa; croce, croce, croce), e ne ricava «3 contro 1» al posto del «7 contro 1» standard, convinto che la cosa meriti «l'attenzione dei calcolatori». La risposta giusta è $\tfrac34$ per due lanci (e $\tfrac78$ per tre), e se hai risposto $\tfrac23$ hai fatto il suo stesso ragionamento.

**Dov'è l'errore?** I tre esiti non hanno la stessa probabilità. Il caso «$T$» vale $\tfrac12$ da solo, mentre $CT$ e $CC$ valgono $\tfrac14$ ciascuno. Dire «due su tre» equivale a trattarli come se valessero tutti $\tfrac13$. Il ragionamento si ripara in un modo solo: **si lanciano comunque entrambe le monete**, anche quando il secondo lancio, nella realtà, non servirebbe. Le sequenze diventano quattro,

$$
TT, \quad TC, \quad CT, \quad CC,
$$

tutte con probabilità $\tfrac14$, e tre di esse contengono almeno una testa: $\tfrac34$. Il caso «$T$» di prima era in realtà due sequenze fuse insieme, $TT$ e $TC$.

Tieni a mente questa trappola, perché è il filo di tutta la settimana.

!!! note "Una cautela storica"
    L'episodio è citato in moltissimi manuali come esempio tipico dell'errore sull'equiprobabilità. Non fu però una svista: d'Alembert conosceva la risposta standard e la contestò di proposito, nello stesso articolo in cui solleva anche il paradosso di San Pietroburgo. Il suo modello assegna probabilità uguali a casi *osservabili* (il gioco finisce con la prima testa), e questo è il punto in cui diverge dalla pratica corrente. Fu criticato più volte, per esempio da Laplace nell'*Essai philosophique*. Qui ci interessa l'errore in sé, che è istruttivo comunque.

---

## Atto I: Il dramma storico — l'estate del 1654 {: #dramma }

### Un problema che aspettava da 160 anni {: #problema-antico }

Nella [Settimana 1](../settimana_01/index.md#il-problema-della-partita-interrotta-1654) hai già incontrato il *problème des partis*: due giocatori hanno puntato la stessa somma su un gioco a punti, la partita viene interrotta con il punteggio di 2 a 1, e bisogna dividere la posta. Là ci siamo fermati al risultato (3/4 contro 1/4). Questa settimana lo riapriamo, perché dietro quel risultato c'è tutto ciò che serve per contare.

Il problema è molto più vecchio del 1654. Nel 1494 Luca Pacioli, nella sua *Summa de arithmetica*, propone questo caso: due squadre giocano a palla fino a **60 punti** (ogni goal vale 10), la posta totale è di **10 ducati**, e il gioco si interrompe sul **50 a 20**. La sua regola è dividere **in proporzione ai punti già fatti**: $50 : 20 = 5 : 2$, cioè $\tfrac57$ della posta (circa 7,14 ducati) a una squadra e $\tfrac27$ (circa 2,86) all'altra. Lo presenta con sicurezza: gli altri pareri che ha incontrato, scrive, gli sembrano «incoerenti».

Una regola così semplice ha però un difetto evidente, che nel 1556 Niccolò Tartaglia mise in luce con un caso estremo. Se una squadra ha 10 punti e l'altra zero, la regola assegna **tutta** la posta a chi ha i 10 punti, anche se mancano ancora 50 punti alla vittoria: per lui una conclusione del genere non aveva senso. Il difetto è di principio: la regola di Pacioli guarda a **ciò che è già successo** e ignora quanto manca per finire. Tartaglia stesso, d'altra parte, concludeva che il problema si risolve più per via di giudizio che di calcolo, e proponeva una regola alternativa basata sul vantaggio rispetto alla lunghezza del gioco.

### Il cavaliere e le sue due domande {: #de-mere }

In un secolo e mezzo nessuno trovò una risposta accettata. Poi, nel 1654, **Antoine Gombaud (1607–1684)**, noto come il *Cavaliere de Méré*, gentiluomo parigino e giocatore d'azzardo, pone a **Blaise Pascal (1623–1662)** due questioni che nascono dal tavolo da gioco: la divisione della posta in una partita interrotta (*parti des parties*, «divisione dei punti») e un problema sui dadi (*parti des dés*).

Pascal ne discute per lettera con **Pierre de Fermat (1601–1665)**, giurista e matematico a Tolosa. La prima lettera di Pascal è andata perduta; sopravvivono le altre, l'ultima datata 27 ottobre 1654, ristampate nelle *Œuvres de Fermat* (II, pp. 288–314, 1894). In quella del 29 luglio, Pascal scrive a Fermat di aver letto la sua soluzione e aggiunge, a proposito di de Méré: *«M. de Méré never could find the true value for the points nor a method to arrive to it»* («de Méré non riuscì mai a trovare il vero valore per i punti, né un metodo per arrivarci»). Nella stessa lettera compare una frase che racconta l'emozione dell'accordo: *«I see well that truth is the same in Toulouse as in Paris»* («vedo bene che la verità è la stessa a Tolosa e a Parigi»). Le citazioni sono dalla traduzione inglese delle lettere, la traduzione italiana è nostra.

In quella lettera Pascal racconta il «grande scandalo» di de Méré, che pensava di aver trovato una contraddizione nell'aritmetica. Due scommesse, entrambe del tipo «almeno uno»:

* **Scommessa A.** Si lancia **un dado quattro volte** e si punta che esca **almeno un sei**. De Méré la giocava da anni e *sapeva* che conviene: a lungo andare chi punta così vince. Con tre lanci invece non conviene: quattro è il minimo. Pascal la scrive così: le probabilità sono «**671 contro 625**». Significa che, tra tutte le possibili sequenze di quattro lanci (sono 1296), 671 contengono almeno un sei e 625 no; nell'Atto IV vedremo da dove nascono questi numeri.
* **Scommessa B.** Si lanciano **due dadi ventiquattro volte** e si punta che esca **almeno un doppio sei**. De Méré ragionava per proporzione. Con un dado le facce sono 6 e bastano 4 lanci. Con due dadi le combinazioni possibili sono 36, cioè **6 volte tante**, e quindi dovrebbero servire **6 volte tanti lanci**: $4 \cdot 6 = 24$. In altre parole, $24$ sta a $36$ come $4$ sta a $6$. Ma giocando, de Méré vedeva che questa scommessa **non** conveniva.

Per lui era un paradosso: la stessa proporzione, due risultati opposti. «L'aritmetica si contraddice», concludeva. Pascal risponde che la ragione si vede facilmente «dai principi di cui Fermat dispone». Lo vedremo anche noi, più avanti in questa settimana, con lo stesso trucco che useremo per i compleanni.

### Quello che nasce da quelle lettere {: #eredita }

Pascal e Fermat risolvono il problema dei punti con due metodi diversi, e la differenza tra i due sarà la prossima sezione: quello di Fermat consiste nel **contare tutti i futuri possibili**, quello di Pascal nel **dedurre ogni caso dal caso successivo**. Il metodo di Fermat diventa difficile da applicare quando i casi crescono, ed è proprio lì che nasce la *combinatoria* come strumento di calcolo: Pascal stesso scrive di aver trovato un'abbreviazione perché «la fatica delle combinazioni è eccessiva».

Pochi anni dopo, nel 1657, **Christiaan Huygens** pubblica *De ratiociniis in ludo aleae*, il primo trattato a stampa sul tema: lo incontreremo nella Settimana 4. Nel 1713, otto anni dopo la morte del suo autore, esce l'*Ars Conjectandi* di **Jacob Bernoulli** ([scansione su Internet Archive](https://archive.org/details/jacobibernoulli00bern)), che ordina permutazioni e combinazioni in una teoria sistematica e le presenta come l'arte di *congetturare*, cioè di ragionare quando non si può essere certi.

!!! question "Le domande che ci guideranno"
    1. Perché dividere la posta in proporzione ai punti fatti è sbagliato, e che cosa bisogna pesare al suo posto?
    2. Come si fa a **contare** i futuri possibili senza elencarli uno a uno quando diventano migliaia?
    3. Dove sta l'errore di de Méré, e perché «ventiquattro su trentasei» non è «quattro su sei»?
    4. Se contare i futuri è così potente, che cosa ci dice sui sistemi che *noi* costruiamo, come le tabelle hash?

---

## Atto II: Pesare i futuri possibili — i due metodi del 1654 {: #futuri }

### L'albero delle manche {: #albero }

Riprendiamo il caso della Settimana 1. Si gioca a **3 punti**, ciascuno ha puntato 32 pistole (la «pistola» era una moneta d'oro dell'epoca; posta totale: 64). Il giocatore $A$ ha 2 punti, $B$ ne ha 1: ad $A$ manca **un** punto, a $B$ ne mancano **due**. Prima di disegnare l'albero fissiamo con precisione che cosa stiamo assumendo, come nelle lettere. Sono **due** ipotesi, e una sola non basta.

1. **Uguale bravura.** In ogni manche $A$ vince con probabilità $\tfrac12$ e $B$ con probabilità $\tfrac12$.
2. **Indipendenza delle manche.** L'esito di una manche non cambia le probabilità delle manche successive. Se $A$ ha appena vinto, la manche dopo è ancora $\tfrac12$ a $\tfrac12$: niente «serie fortunata», niente stanchezza, niente rivincita.

Sono ipotesi del modello, non fatti: in un gioco reale potrebbero essere false. Pascal e Fermat le ammettono, e noi con loro.

In ogni caso, la seconda ipotesi è ciò che ci permette di scrivere $\tfrac12$ su **ogni** ramo dell'albero, anche dopo che qualcosa è già successo, e di moltiplicare lungo i cammini: è la regola del prodotto della Settimana 1, con $P(B \mid A) = P(B)$. Ha anche una conseguenza che useremo più avanti: **per calcolare le probabilità di vittoria conta solo quanti punti mancano a ciascuno, non l’ordine dei punti già giocati.** Per esempio, le sequenze $AAB$ e $ABA$ indicano due ordini diversi in cui $A$ ha vinto due manche e $B$ una: in entrambi i casi ad $A$ manca un punto e a $B$ ne mancano due per vincere la partita. Poiché le manche sono indipendenti, i risultati precedenti non cambiano le probabilità delle prossime manche: $A$ ha quindi la stessa probabilità di vincere la partita nei due casi, e così $B$.


Si gioca una manche alla volta e ci si ferma appena uno dei due raggiunge il traguardo. Se $A$ vince la prossima manche, la partita è finita; se la vince $B$, se ne gioca un'altra, e a quel punto basta che $A$ vinca per chiudere, altrimenti vince $B$:

```
                          ┌─ A (1/2) ─▶ A       A vince      [1/2]
  Ω ──────────────────────┤
                          │               ┌─ A (1/2) ─▶ B A   A vince   [1/4]
                          └─ B (1/2) ─────┤
                                          └─ B (1/2) ─▶ B B   B vince   [1/4]
```

È l'albero della Settimana 2, con la stessa convenzione: le parentesi tonde sono le probabilità dei rami, le quadre quelle delle foglie, che si ottengono moltiplicando lungo il cammino. Ogni foglia è un **futuro possibile**, e $A$ vince in due di essi: $P(A \text{ vince}) = \tfrac12 + \tfrac14 = \tfrac34$, $P(B \text{ vince}) = \tfrac14$. Attenzione: $\tfrac12$ è la probabilità che $A$ vinca la *prossima* manche, ma $A$ può vincere la partita anche perdendo la prossima, e all' $\tfrac12$ va aggiunto il $\tfrac14$ del futuro $BA$. La posta si divide allo stesso modo: **48 pistole ad $A$ e 16 a $B$**.

Il principio, da fissare, è questo: **la posta si divide secondo le probabilità di vittoria, e queste si ottengono sommando i futuri possibili, non guardando il passato**. Il passato conta solo perché decide *quanto manca* a ciascuno.

Con pochi punti mancanti l'albero si disegna a mano. Ma proviamo un caso più grande, cambiando le regole del gioco: si gioca a **5 punti**, e la partita viene interrotta sul **2 a 0** per $A$. Ad $A$ mancano allora $5 - 2 = 3$ manche, a $B$ ne mancano $5 - 0 = 5$. Ammettiamo ancora che a ogni manche ciascuno vinca con probabilità $\tfrac12$.

Il 2–0 è già stato giocato e non si cambia: l'albero descrive solo le manche **che restano da giocare**. Quante possono essere?

* **Al minimo 3 manche.** È il caso in cui $A$ vince di fila le 3 manche che gli mancano ($AAA$). Meno di 3 non si può: ad $A$ ne servono 3, e a $B$ ne servirebbero 5.
* **Al massimo 7 manche.** Finché la partita non è decisa, tra le manche giocate dopo l'interruzione $A$ ne ha vinte al più 2 (con 3 avrebbe già raggiunto il traguardo) e $B$ al più 4 (con 5 avrebbe già finito). Dopo 6 manche si può quindi essere ancora indecisi, per esempio con $A$ a 2 vittorie e $B$ a 4. Ma la settima manche decide per forza: o $A$ arriva a 3 o $B$ arriva a 5. In generale, se a un certo punto della partita ad $A$ mancano $a$ manche per vincere e a $B$ ne mancano $b$, da quel punto in poi si giocano al più $a + b - 1$ manche. Qui $a + b - 1 = 3 + 5 - 1 = 7$.

Le foglie dell'albero sono tutte le sequenze di manche che si fermano **nel momento in cui uno dei due raggiunge il traguardo**, e sono **56**: 35 con $A$ vincente e 21 con $B$ vincente. Vediamo da dove vengono questi numeri, contando le foglie una lunghezza alla volta. Scriviamo ogni sequenza dopo l'interruzione come una parola: $ABAA$ significa che la prima manche dopo l'interruzione la vince $A$, la seconda $B$, la terza e la quarta $A$.

**Le foglie in cui vince $A$.** Dopo l'interruzione, ad $A$ servono 3 vittorie. Se $A$ vince la partita alla manche numero $d$, devono valere due cose:

1. l'**ultima** manche è sua: se avesse già raggiunto 3 vittorie prima, la partita sarebbe finita prima;
2. nelle manche **precedenti** ha vinto esattamente 2 volte, e tutte le altre manche le ha vinte $B$.

Contiamo ora le sequenze, una lunghezza alla volta.

* **$d = 3$.** Le manche precedenti sono 2 e $A$ le vince entrambe: l'unica sequenza è $AAA$. **1 sequenza.**
* **$d = 4$.** Le manche precedenti sono 3: due le vince $A$ e una $B$. Resta solo da decidere *in quale delle tre* ha vinto $B$, e le possibilità sono $BAA$, $ABA$, $AAB$. Aggiungendo in fondo la vittoria finale di $A$ si ottengono $BAAA$, $ABAA$, $AABA$. **3 sequenze.**
* **$d = 5$.** Le manche precedenti sono 4: due di $A$ e due di $B$. Scriviamo tutti i modi di disporle: $AABB$, $ABAB$, $ABBA$, $BAAB$, $BABA$, $BBAA$. Sono 6, e a ciascuna si aggiunge in fondo la $A$ finale. **6 sequenze.**
* **$d = 6$ e $d = 7$.** Il ragionamento è identico: si dispongono 2 vittorie di $A$ tra le 5 manche precedenti (per $d=6$), o tra le 6 (per $d=7$), e $B$ vince le altre. Elencarle diventa lungo, e per questo il conteggio è già un problema di combinatoria. Il risultato è **10** e **15** sequenze. (In nessun caso $B$ arriva a 5 vittorie prima di $A$: ne ha al massimo 4.)

Sommando: $1 + 3 + 6 + 10 + 15 = \mathbf{35}$ foglie con $A$ vincente.

**Le foglie in cui vince $B$.** Il ragionamento è lo stesso, a parti invertite. A $B$ servono 5 vittorie, quindi può vincere solo alla manche $d = 5$, $6$ o $7$. L'ultima manche è sua, e nelle precedenti ha vinto esattamente 4 volte; le altre le ha vinte $A$, che quindi ha al massimo 2 vittorie e non ha ancora finito.

* **$d = 5$.** Le manche precedenti sono 4 e le vince tutte $B$: l'unica sequenza è $BBBBB$. **1 sequenza.**
* **$d = 6$.** Tra le 5 manche precedenti ne vince 4 $B$ e una $A$: basta scegliere *quale* delle 5 è di $A$. **5 sequenze.**
* **$d = 7$.** Tra le 6 manche precedenti ne vincono 4 $B$ e 2 $A$: sono **15** sequenze, lo stesso numero del caso $d=7$ di prima.

Sommando: $1 + 5 + 15 = \mathbf{21}$ foglie con $B$ vincente, e in tutto $35 + 21 = 56$ foglie. (Contare questi «posti» in modo sistematico, senza elencare, è proprio il tema dell'Atto III.)

Si noti che ogni foglia a profondità $d$ (cioè dopo $d$ manche giocate dall'interruzione) ha probabilità $(\tfrac12)^d$, perché è il prodotto di $d$ rami da $\tfrac12$. Le foglie con $A$ vincente sono così distribuite:

| manche giocate dall'interruzione ($d$) | foglie con $A$ vincente | probabilità di ciascuna | contributo |
|:--:|:--:|:--:|:--:|
| 3 | 1 | $\tfrac1{8}$ | $\tfrac{16}{128}$ |
| 4 | 3 | $\tfrac1{16}$ | $\tfrac{24}{128}$ |
| 5 | 6 | $\tfrac1{32}$ | $\tfrac{24}{128}$ |
| 6 | 10 | $\tfrac1{64}$ | $\tfrac{20}{128}$ |
| 7 | 15 | $\tfrac1{128}$ | $\tfrac{15}{128}$ |

Sommando: $P(A \text{ vince}) = \tfrac{16+24+24+20+15}{128} = \tfrac{99}{128}$. Funziona, ma per costruire la tabella abbiamo dovuto sapere **quanti** cammini finiscono in ciascuna riga (1, 3, 6, 10, 15), e questo è già un problema di conteggio. Nel 1654 Pascal e Fermat propongono due modi per aggirarlo.

### Pascal: dedurre ogni caso dal successivo {: #pascal }

Pascal, nella lettera del 29 luglio 1654, usa un metodo che chiama più «breve». Lo seguiamo un passo alla volta.

**Passo 1: un nome per «quanto manca».** Per l'indipendenza delle manche, il futuro della partita dipende solo da quanti punti mancano ad $A$ e a $B$. Diamo allora un nome alla probabilità che $A$ vinca: $V(a, b)$, quando ad $A$ mancano $a$ punti e a $B$ ne mancano $b$. Non è un numero ma una **tabella**: a ogni coppia $(a, b)$ corrisponde il suo valore. Di questi valori ne conosci già due, uno per ciascuno dei due giochi visti sopra. Nel gioco a 3 punti interrotto sul 2–1 ad $A$ manca 1 punto e a $B$ ne mancano 2, e l'albero piccolo ci ha dato $V(1, 2) = \tfrac34$. Nel gioco a 5 punti interrotto sul 2–0 ad $A$ mancano 3 punti e a $B$ ne mancano 5, e le 56 foglie ci hanno dato $V(3, 5) = \tfrac{99}{128}$. Lo stesso simbolo $V$ vale per entrambi i giochi, perché conta solo quanto manca a ciascuno, non il punteggio a cui si gioca.

**Passo 2: i casi che non richiedono calcoli.** Se $a = 0$, ad $A$ non manca più nulla e ha già vinto: $V(0, b) = 1$. Se $b = 0$ ha già vinto $B$, quindi $A$ ha perso: $V(a, 0) = 0$.

**Passo 3: giochiamo una sola manche, sul caso piccolo.** Riprendi l'albero del 2–1, cioè $(a, b) = (1, 2)$. La prossima manche ha due esiti:

* vince $A$, con probabilità $\tfrac12$: ora mancano $(0, 2)$, la partita è finita e $A$ ha vinto;
* vince $B$, con probabilità $\tfrac12$: ora mancano $(1, 1)$. Guarda la parte di albero che parte da qui, il ramo $B$ con le sue due foglie: è **l'albero di una partita nuova**, in cui a ciascuno manca un punto, cioè proprio lo stato $(1, 1)$.

**Passo 4: perché il ramo $B$ vale $V(1, 1)$.** Dopo che $B$ ha vinto la manche, la probabilità che $A$ vinca la partita è quella di una partita che comincia da $(1, 1)$, perché per l'indipendenza il passato non conta: quel valore è $V(1, 1)$. La probabilità che la partita passi dal ramo $B$ e finisca con la vittoria di $A$ è allora la probabilità di arrivare al ramo ($\tfrac12$) per la probabilità di vincere da lì ($V(1, 1)$): è la regola del prodotto, $P(\text{ramo}) \cdot P(A \text{ vince} \mid \text{ramo})$. Sommando i due rami:

$$
V(1, 2) = \tfrac12\, V(0, 2) + \tfrac12\, V(1, 1).
$$

**Passo 5: lo stesso ragionamento vale per ogni $(a, b)$.** Se $a \ge 1$ e $b \ge 1$, giocando **una** manche si va in $(a-1, b)$ se vince $A$, oppure in $(a, b-1)$ se vince $B$, ciascuno con probabilità $\tfrac12$. Quindi

$$
V(a, b) = \tfrac12\, V(a-1,\, b) + \tfrac12\, V(a,\, b-1).
$$

In parole: la probabilità di vincere da uno stato è la media delle probabilità di vincere dai due stati che si possono raggiungere con una manche. La formula riduce ogni stato a due stati più piccoli, finché si arriva ai casi del Passo 2, che sono noti. Ripercorriamo i tre casi della lettera, tutti nel gioco a 3 punti con posta totale di 64 pistole. Per dividere la posta in modo giusto, ciascuno deve ricevere una parte proporzionale alla sua probabilità di vincere:

* **Sul 2–1** ($a=1, b=2$): $V(1,2) = \tfrac12 V(0,2) + \tfrac12 V(1,1) = \tfrac12 \cdot 1 + \tfrac12 \cdot \tfrac12 = \tfrac34$, perché $V(1,1) = \tfrac12\cdot 1 + \tfrac12\cdot 0 = \tfrac12$. Con questa proporzione, volendo ripartire la posta in modo giusto, su 64 pistole ne spettano **48** ad $A$.
* **Sul 2–0** ($a=1, b=3$): $V(1,3) = \tfrac12 + \tfrac12\, V(1,2) = \tfrac12 + \tfrac12\cdot\tfrac34 = \tfrac78$, cioè **56** pistole ad $A$.
* **Sull'1–0** ($a=2, b=3$): $V(2,3) = \tfrac12\, V(1,3) + \tfrac12\, V(2,2) = \tfrac12\cdot\tfrac78 + \tfrac12\cdot\tfrac12 = \tfrac{11}{16}$, cioè **44** pistole ad $A$ e 20 a $B$.

Sono esattamente i numeri 48, 56 e 44 che Pascal scrive a Fermat nella lettera. Continuando a riempire la tabella dal basso si arriva anche al caso $a=3$, $b=5$ (il gioco a 5 punti interrotto sul 2–0 di prima):

| | $b=1$ | $b=2$ | $b=3$ | $b=4$ | $b=5$ |
|:--:|:--:|:--:|:--:|:--:|:--:|
| $a=1$ | $\tfrac12$ | $\tfrac34$ | $\tfrac78$ | $\tfrac{15}{16}$ | $\tfrac{31}{32}$ |
| $a=2$ | $\tfrac14$ | $\tfrac12$ | $\tfrac{11}{16}$ | $\tfrac{13}{16}$ | $\tfrac{57}{64}$ |
| $a=3$ | $\tfrac18$ | $\tfrac5{16}$ | $\tfrac12$ | $\tfrac{21}{32}$ | $\tfrac{99}{128}$ |

L'ultima casella è il $\tfrac{99}{128}$ trovato prima sommando le foglie con $A$ vincente. Con la tecnica di Pascal lo si ottiene con **15 calcoli**, uno per casella, invece di sommare decine di cammini. Il motivo è che nell'albero lo stesso stato compare più volte (dopo $AB$ e dopo $BA$ ci si trova nello stesso stato), e Pascal lo calcola una volta sola. In Informatica lo riconosci: è **programmazione dinamica**, e infatti il calcolo di $V(a,b)$ si scrive come una funzione ricorsiva con memoria (lo vedi nello Script 1).

### Fermat: contare tutti i futuri {: #fermat }

Il metodo di Fermat, che conosciamo dalla lettera di Pascal (la sua lettera originale è andata perduta), parte da una difficoltà dell'albero reale: **non sappiamo quante manche si giocheranno**. A volte la partita finisce subito, a volte dopo molte manche, e le foglie hanno probabilità diverse tra loro. L'idea di Fermat è **non aspettare** che la partita finisca davvero: si immagina di giocare *comunque* un numero fisso di manche, anche quelle che nella realtà non si giocherebbero.

**Quante manche bastano?** Se ad $A$ mancano $a$ punti e a $B$ ne mancano $b$, dopo $n = a + b - 1$ manche la partita è certamente decisa. Vediamolo prima su un caso piccolo: il gioco a **3 punti**, interrotto sul **2–1** per $A$ (ad $A$ manca 1 punto, a $B$ ne mancano 2, quindi $a=1$ e $b=2$). Qui $n = 1 + 2 - 1 = 2$. Infatti in 2 manche non è possibile che $A$ ne vinca *meno* di 1 e insieme $B$ ne vinca *meno* di 2: se $A$ non ne vince nessuna le vince tutte e due $B$, e $B$ arriva a 2. In generale, in $n = a + b - 1$ manche **o** $A$ ne vince almeno $a$, **oppure** $B$ ne vince almeno $b$, mai tutte e due.

**Il caso piccolo: gioco a 3 punti, sul 2–1** ($a=1$, $b=2$, $n=2$). Giochiamo sempre 2 manche:

```
                          ┌─ A (1/2) ─▶ A A   A vince      [1/4]
          ┌─ A (1/2) ─────┤
          │               └─ B (1/2) ─▶ A B   A vince      [1/4]
  Ω ──────┤
          │               ┌─ A (1/2) ─▶ B A   A vince      [1/4]
          └─ B (1/2) ─────┤
                          └─ B (1/2) ─▶ B B   B vince      [1/4]
```

Leggiamo l'albero. I futuri sono quattro, $AA$, $AB$, $BA$, $BB$, e hanno tutti la stessa probabilità $\tfrac14$. In tre di essi, $AA$, $AB$ e $BA$, $A$ vince almeno 1 manche e quindi vince la partita; solo in $BB$ vince $B$. Dunque $P(A \text{ vince}) = \tfrac34$, lo stesso risultato dell'albero reale.

Confrontiamo con l'albero reale, che aveva tre foglie: $A$ con probabilità $\tfrac12$, $BA$ con $\tfrac14$ e $BB$ con $\tfrac14$. Le foglie $BA$ e $BB$ ci sono anche qui, identiche. Cambia solo la foglia $A$, che qui diventa due futuri, $AA$ e $AB$, ciascuno di probabilità $\tfrac14$, e $\tfrac14 + \tfrac14 = \tfrac12$ è proprio la probabilità della foglia $A$ di prima. Perché si spezza in due? Nella realtà, dopo che $A$ ha vinto la prima manche, la partita è finita e la seconda manche **non si gioca**. Con Fermat la giochiamo comunque, solo per immaginazione: è una manche **fittizia**, perché non influisce sul risultato. Qualunque ne sia l'esito ($A$ oppure $B$), $A$ aveva già raggiunto il traguardo, e due esiti di probabilità $\tfrac12$ e $\tfrac12$ sommano a 1: la probabilità della foglia originale non cambia. Per questo aggiungere manche fittizie non modifica la probabilità che $A$ vinca, e permette di far arrivare tutti i futuri alla stessa lunghezza.

**Perché basta contare.** Tutti i futuri hanno la stessa lunghezza $n$, e per l'indipendenza delle manche ognuno ha la stessa probabilità $(\tfrac12)^n$: è il prodotto di $n$ rami da $\tfrac12$. Quindi la probabilità che $A$ vinca è semplicemente

$$
P(A \text{ vince}) = \frac{\text{futuri in cui } A \text{ vince almeno } a \text{ manche}}{2^n},
$$

e il problema diventa un conteggio: sul 2–1 sono $3/2^2 = \tfrac34$. Nell'albero reale, invece, le foglie avevano probabilità diverse ($\tfrac12$, $\tfrac14$, $\tfrac14$) e bisognava pesarle una per una.

**Un secondo caso: gioco a 3 punti, sull'1–0** ($a=2$, $b=3$, $n=4$). Si gioca ancora a 3 punti, ma ora il punteggio è 1–0 per $A$: ad $A$ mancano 2 punti e a $B$ ne mancano 3. Giochiamo sempre $n = 2 + 3 - 1 = 4$ manche, quindi i futuri sono $2^4 = 16$, tutti con probabilità $\tfrac1{16}$. $A$ vince quando ne vince **almeno 2**. Con soli 16 futuri possiamo scriverli tutti, come parole di 4 lettere (la $i$-esima lettera dice chi vince la $i$-esima manche) e raggrupparli per **quante manche vince $A$**, che chiamiamo $k$:

| $k$ (vittorie di $A$) | futuri | quanti |
|:--:|:--|:--:|
| 0 | $BBBB$ | 1 |
| 1 | $ABBB$, $BABB$, $BBAB$, $BBBA$ | 4 |
| 2 | $AABB$, $ABAB$, $ABBA$, $BAAB$, $BABA$, $BBAA$ | 6 |
| 3 | $AAAB$, $AABA$, $ABAA$, $BAAA$ | 4 |
| 4 | $AAAA$ | 1 |

Controllo: $1 + 4 + 6 + 4 + 1 = 16$, e cioè ci sono tutti. Nelle righe con $k = 2, 3, 4$ $A$ vince, quindi i futuri favorevoli sono $6 + 4 + 1 = 11$ e

$$
P(A \text{ vince}) = \frac{11}{16},
$$

lo stesso valore trovato con Pascal.

**Il caso grande: gioco a 5 punti, sul 2–0** ($a=3$, $b=5$, $n=7$). È la partita di prima, quella con 56 foglie e la tabella di Pascal. Con Fermat si giocano sempre $n = 3 + 5 - 1 = 7$ manche, anche quelle che nella realtà non servirebbero: i futuri sono $2^7 = 128$, tutti con probabilità $\tfrac1{128}$, e $A$ vince quando ne vince **almeno 3**. Qui elencarli tutti sarebbe troppo lungo, ma il raggruppamento per $k$ è lo stesso della tabella di prima: i futuri con esattamente $k$ vittorie di $A$ sono 1, 7, 21, 35, 35, 21, 7, 1 per $k = 0, \dots, 7$ (come si contano senza elencarli lo capiremo nell'Atto III), quindi

$$
P(A \text{ vince}) = \frac{35 + 35 + 21 + 7 + 1}{128} = \frac{99}{128},
$$

lo stesso risultato di prima, senza costruire la tabella per righe e senza sapere nulla dei cammini che finiscono in anticipo.

### Quando conviene Fermat, quando Pascal {: #confronto }

I due metodi calcolano lo stesso numero. Per **calcolare** con un programma, la ricorsione di Pascal è più economica: servono $a \cdot b$ stati, mentre elencare i futuri di Fermat significa passare in rassegna $2^n$ sequenze, che con $n=4$ sono 16, con 10 sono 1024, con 30 oltre un miliardo. È il limite che Pascal nota subito nella lettera del 29 luglio: *«the labor of combinations is excessive»* («la fatica delle combinazioni è eccessiva»).

Ma il valore del metodo di Fermat non sta nell'elencare: **non serve elencare i futuri, serve sapere quanti sono** quelli in cui $A$ vince, e questo si scrive in una sola formula con i numeri $1, 7, 21, 35, \dots$. Fermat è il metodo che ci porta ai coefficienti binomiali, Pascal è il metodo che ci dà l'algoritmo. Sono lo stesso conto, e imparare a contare senza elencare è l'argomento dell'Atto III.

### Esplora tu stesso: i futuri del problema dei punti {: #widget-futuri }

Scegli quanti punti mancano ad $A$ e a $B$. Il widget elenca i futuri («$A$» e «$B$» indicano chi vince ciascuna manche fittizia), colorando di blu quelli in cui vince $A$ e di arancione quelli in cui vince $B$. Prova $a=1, b=2$ (il caso di prima), poi $a=3, b=3$: quanti futuri sono? E come cambia la divisione della posta?

<style>
.s03-box { border: 1px solid var(--md-default-fg-color--lighter, #bbb); border-radius: 8px; padding: 12px 16px; margin: 1em 0; }
.s03-box label { display: inline-block; margin-right: 18px; }
.s03-chips { display: flex; flex-wrap: wrap; gap: 4px; margin: 10px 0; }
.s03-chip { font-family: monospace; font-size: 12px; padding: 2px 6px; border-radius: 4px; color: #fff; }
.s03-chip.a { background: #4051b5; }
.s03-chip.b { background: #e07a1f; }
.s03-out { font-size: 0.95em; line-height: 1.5; }
</style>
<div class="s03-box" id="s03-futuri">
  <label>Mancano ad A: <select id="s03-fa"><option>1</option><option>2</option><option selected>3</option><option>4</option></select> punti</label>
  <label>Mancano a B: <select id="s03-fb"><option>1</option><option>2</option><option selected>3</option><option>4</option></select> punti</label>
  <div class="s03-chips" id="s03-fchips"></div>
  <div class="s03-out" id="s03-fout"></div>
</div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  var sa = document.getElementById('s03-fa'), sb = document.getElementById('s03-fb');
  var chips = document.getElementById('s03-fchips'), out = document.getElementById('s03-fout');
  function render() {
    var a = +sa.value, b = +sb.value, n = a + b - 1, tot = Math.pow(2, n), win = 0, html = '';
    for (var m = 0; m < tot; m++) {
      var s = '', ka = 0;
      for (var i = n - 1; i >= 0; i--) { var bit = (m >> i) & 1; s += bit ? 'A' : 'B'; ka += bit; }
      var aw = ka >= a; if (aw) win++;
      html += '<span class="s03-chip ' + (aw ? 'a' : 'b') + '">' + s + '</span>';
    }
    chips.innerHTML = html;
    out.innerHTML = 'Si giocano comunque <b>' + n + '</b> manche fittizie: <b>' + tot + '</b> futuri equiprobabili. ' +
      'A vince in <b>' + win + '</b>, B in <b>' + (tot - win) + '</b>. ' +
      'P(A vince) = ' + win + '/' + tot + ' = <b>' + (win / tot).toFixed(4) + '</b>. ' +
      'Su una posta di 64 pistole: A ne riceve <b>' + (64 * win / tot).toFixed(2) + '</b>, B <b>' + (64 * (tot - win) / tot).toFixed(2) + '</b>.';
  }
  sa.addEventListener('change', render); sb.addEventListener('change', render); render();
});
</script>

### Script 1 — Pascal, Fermat e il Monte Carlo a confronto {: #lab-partis }

Tre modi di calcolare la stessa probabilità: la ricorsione di Pascal (`pascal`), l'enumerazione dei futuri di Fermat (`fermat`) e la simulazione di molte partite (`montecarlo`). Devono dare lo stesso risultato, e i tre casi della lettera del 29 luglio. L'ultima riga mostra che il metodo non dipende dal fatto che i giocatori siano ugualmente bravi: basta cambiare $p$.

<div class="psi-exec" markdown="1">
```python
# Script 1 — Il problème des partis: Pascal (ricorsione), Fermat (enumerazione), Monte Carlo
from functools import lru_cache
from itertools import product
import random

@lru_cache(maxsize=None)   # memoizzazione: ogni (a, b, p) viene calcolato una sola volta
def pascal(a, b, p=0.5):
    """P(A vince) quando ad A mancano a punti, a B ne mancano b; A vince ogni manche con prob. p."""
    if a == 0: return 1.0   # A non ha più punti da fare: ha già vinto
    if b == 0: return 0.0   # B ha già vinto
    return p * pascal(a - 1, b, p) + (1 - p) * pascal(a, b - 1, p)   # un'altra manche: due futuri

def fermat(a, b, p=0.5):
    """Si giocano comunque a+b-1 manche (bastano a decidere): si sommano i futuri in cui A ne vince >= a."""
    n = a + b - 1            # numero massimo di manche che servono a decidere
    tot = 0.0
    for futuro in product("AB", repeat=n):   # tutte le 2^n sequenze di vincitori, es. ("A","B","A")
        k = futuro.count("A")                # manche vinte da A in questo futuro
        if k >= a:                           # A raggiunge i punti che gli mancano: A vince
            tot += p**k * (1 - p)**(n - k)   # probabilità di questa precisa sequenza
    return tot

def montecarlo(a, b, p=0.5, prove=100_000, seme=1):
    rng = random.Random(seme)   # generatore con seme fisso: risultato riproducibile
    vinte = 0
    for _ in range(prove):      # simula `prove` partite complete
        x, y = a, b             # punti mancanti ad A e a B
        while x > 0 and y > 0:  # si gioca finché nessuno ha vinto
            if rng.random() < p: x -= 1   # A vince la manche
            else: y -= 1                  # B vince la manche
        vinte += (x == 0)       # A ha vinto la partita (True conta come 1)
    return vinte / prove        # frequenza relativa = stima della probabilità

POSTA = 64
print("Gioco a 3 punti, posta 64 pistole")
for nome, (a, b) in {"2–1": (1, 2), "2–0": (1, 3), "1–0": (2, 3)}.items():
    P = pascal(a, b)   # valore esatto, usato come riferimento
    print(f"  sul {nome}: Pascal {P:.4f} | Fermat {fermat(a, b):.4f} | Monte Carlo {montecarlo(a, b):.4f}"
          f"  →  A: {POSTA * P:.2f}, B: {POSTA * (1 - P):.2f}")
    # controllo: Pascal = Fermat (esatto) e Monte Carlo vicino (tolleranza 0.01)
    assert abs(P - fermat(a, b)) < 1e-12 and abs(P - montecarlo(a, b)) < 0.01

# I numeri della lettera di Pascal del 29 luglio 1654
assert POSTA * pascal(1, 2) == 48 and POSTA * pascal(1, 3) == 56 and POSTA * pascal(2, 3) == 44

# E se le manche non sono ugualmente probabili? Basta cambiare p (qui A vince una manche su 3)
print("Con p = 1/3 per A, sul 2–1:", round(pascal(1, 2, 1/3), 4), "(Fermat:", round(fermat(1, 2, 1/3), 4), ")")
assert abs(pascal(1, 2, 1/3) - fermat(1, 2, 1/3)) < 1e-12
print("Script 1: tutti gli assert superati.")
```
</div>

Atteso: 0.7500, 0.8750, 0.6875 con tutti e tre i metodi (il Monte Carlo a meno di qualche millesimo), e 0.5556 per il caso $p = 1/3$.

---

## Atto III: Contare senza elencare — la combinatoria minima {: #combinatoria }

Fermat elencava i futuri, e funzionava finché erano 4 o 16. Ma $2^{30}$ futuri non si elencano: bisogna imparare a **contarli**. Ora costruiamo qualche formula del calcolo  combinatorio con tre idee, ciascuna conseguenza della precedente. 

### Prima idea: il principio della moltiplicazione {: #moltiplicazione }

Se una scelta si può fare in $n_1$ modi e, **qualunque sia** stata, la scelta successiva si può fare in $n_2$ modi, le due scelte insieme si possono fare in $n_1 \cdot n_2$ modi.

Lo si vede con l'albero della Settimana 2, senza le probabilità. Ogni **foglia** è un percorso completo dalla radice, cioè una coppia di scelte. Dalla radice partono $n_1$ rami; da *ciascuno* dei nodi raggiunti ne partono altri $n_2$. Le foglie sono quindi $n_1$ gruppi da $n_2$ foglie ciascuno: in tutto $n_1 \cdot n_2$.

<figure markdown="0">
<svg viewBox="0 0 560 275" role="img" aria-label="Albero con 2 rami al primo livello e 3 rami da ciascun nodo del secondo: 6 foglie" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px">
<g fill="currentColor"><text x="150" y="14" text-anchor="middle" font-weight="bold">1ª scelta: n₁ = 2 rami</text><text x="380" y="14" text-anchor="middle" font-weight="bold">2ª scelta: n₂ = 3 rami per ogni nodo</text></g>
<g stroke="currentColor" stroke-width="1.5" fill="none" opacity=".7">
<line x1="30" y1="125" x2="150" y2="50"/><line x1="30" y1="125" x2="150" y2="170"/>
<line x1="150" y1="50" x2="340" y2="45"/>
<line x1="150" y1="50" x2="340" y2="75"/>
<line x1="150" y1="50" x2="340" y2="105"/>
<line x1="150" y1="170" x2="340" y2="165"/>
<line x1="150" y1="170" x2="340" y2="195"/>
<line x1="150" y1="170" x2="340" y2="225"/>
</g>
<circle cx="30" cy="125" r="5" fill="currentColor"/>
<circle cx="150" cy="50" r="13" fill="#4051b5"/><circle cx="150" cy="170" r="13" fill="#e07a1f"/>
<g fill="#fff" text-anchor="middle"><text x="150" y="55">A</text><text x="150" y="175">B</text></g>
<rect x="340" y="34" width="34" height="22" rx="4" fill="#4051b5"/><text x="357" y="50" text-anchor="middle" fill="#fff">A1</text>
<rect x="340" y="64" width="34" height="22" rx="4" fill="#4051b5"/><text x="357" y="80" text-anchor="middle" fill="#fff">A2</text>
<rect x="340" y="94" width="34" height="22" rx="4" fill="#4051b5"/><text x="357" y="110" text-anchor="middle" fill="#fff">A3</text>
<rect x="340" y="154" width="34" height="22" rx="4" fill="#e07a1f"/><text x="357" y="170" text-anchor="middle" fill="#fff">B1</text>
<rect x="340" y="184" width="34" height="22" rx="4" fill="#e07a1f"/><text x="357" y="200" text-anchor="middle" fill="#fff">B2</text>
<rect x="340" y="214" width="34" height="22" rx="4" fill="#e07a1f"/><text x="357" y="230" text-anchor="middle" fill="#fff">B3</text>
<g fill="currentColor"><text x="390" y="70">← 3 foglie</text><text x="390" y="190">← 3 foglie</text></g>
<text x="280" y="268" text-anchor="middle" fill="currentColor" font-weight="bold">foglie totali = 2 · 3 = 6   (ogni foglia è un percorso completo: una coppia di scelte)</text>
</svg>
<figcaption>Due scelte: 2 modi per la prima (A o B), poi 3 modi per la seconda, qualunque sia stata la prima. Il numero di foglie è il prodotto del numero di rami di ciascun livello.</figcaption>
</figure>

Con più scelte si prosegue allo stesso modo: il numero di foglie è il prodotto dei rami di ogni livello, $n_1 \cdot n_2 \cdots n_k$. Se tutti i livelli hanno $b$ rami, diventa $b^k$.

Per esempio, una password di 8 caratteri scelti tra 62 simboli (26 minuscole, 26 maiuscole, 10 cifre) si può scrivere in $62^8 \approx 2{,}2 \cdot 10^{14}$ modi. In generale, **sequenze di lunghezza $k$ su $n$ simboli, con ripetizione, sono $n^k$**: tre manche con due esiti ciascuna danno $2^3 = 8$ futuri, quindici bit danno $2^{15}$ stringhe.

> Nota bene: il numero di rami può **cambiare da un livello al successivo** ($n_1 \ne n_2$), ma al **livello successivo deve essere lo stesso per ogni nodo**, cioè non deve dipendere da quale ramo è stato preso prima. Se dipendesse dal percorso (per esempio 3 rami dopo A ma solo 2 dopo B), il prodotto non vale più: bisogna contare le foglie di ogni sottoalbero e **sommarle** ($3 + 2 = 5$, non $2 \cdot 3$).



### Seconda idea: le disposizioni e il fattoriale {: #disposizioni }

Nella prima idea ogni livello dell'albero offriva sempre gli stessi $n$ simboli: una password può ripetere un carattere. Ma a volte la ripetizione è vietata: se assegniamo 3 server diversi a 3 compiti, un server già usato non può essere scelto di nuovo. Vediamo che cosa cambia nell'albero, con un esempio minuscolo: scegliamo 2 lettere **diverse** tra $\{A, B, C\}$, una dopo l'altra.

- Al primo livello i rami sono 3: $A$, $B$ o $C$.
- Al secondo livello, da ciascun nodo, i rami sono 2: la lettera appena scelta non si può ripetere, restano le altre due.

Attenzione a un dettaglio che riguarda la nota di prima. Le lettere offerte *dipendono* dal ramo scelto (dopo $A$ restano $B, C$; dopo $B$ restano $A, C$), ma il loro **numero** no: è sempre 2. La nota chiedeva proprio questo, quindi il prodotto vale ancora: $3 \cdot 2 = 6$ foglie, cioè

$$
AB,\; AC,\; BA,\; BC,\; CA,\; CB.
$$

Guarda questa lista: $AB$ e $BA$ usano le stesse due lettere, ma sono **due foglie diverse**, perché sono due percorsi diversi nell'albero (prima $A$ poi $B$, oppure prima $B$ poi $A$). Quando diciamo che «l'ordine conta» intendiamo esattamente questo: **due sequenze che contengono gli stessi oggetti in ordine diverso sono contate come due risultati distinti**. È una conseguenza naturale di come abbiamo costruito l'albero (una foglia = un percorso), non una regola in più. Lo scopo di questa idea è contare *tutte* le sequenze, ordine compreso; nella prossima vedremo come si fa se invece vogliamo che $AB$ e $BA$ valgano come un unico risultato.

Generalizziamo: scegliamo $k$ oggetti **tutti diversi** tra $n$, formando una sequenza. Il primo si sceglie in $n$ modi, il secondo in $n-1$ (uno è già preso), il terzo in $n-2$, e così via fino al $k$-esimo, che si sceglie in $n-k+1$ modi. Per la moltiplicazione:

$$
D(n, k) = n\,(n-1)\,(n-2)\cdots(n-k+1) = \frac{n!}{(n-k)!}.
$$

Qui $n! = n(n-1)\cdots 2 \cdot 1$ è il **fattoriale** ($0! = 1$ per convenzione). Il caso $k = n$ dà $n!$: i modi di **ordinare** $n$ oggetti distinti.

??? approfondimento "Che cosa c'entra il fattoriale con gli algoritmi di ordinamento?"

    Con **3 oggetti distinti**, per esempio $A$, $B$ e $C$, puoi creare **6 ordini diversi**:

    $$
    ABC,\; ACB,\; BAC,\; BCA,\; CAB,\; CBA.
    $$

    Sono $3! = 3 \cdot 2 \cdot 1 = 6$: scegli il primo oggetto in 3 modi, il secondo in 2 e l'ultimo in 1.

    Ora pensa a un algoritmo che ordina numeri distinti facendo domande come **«$A$ è minore di $B$?»**. Ogni domanda ha due possibili risposte: sì oppure no. L'algoritmo deve scoprire quale dei 6 ordini è quello crescente.

    - Con 1 domanda puoi distinguere al massimo 2 possibilità.
    - Con 2 domande puoi distinguere al massimo 4 possibilità.
    - Con 3 domande puoi distinguere al massimo 8 possibilità.

    Per riconoscere quale dei 6 ordini è quello corretto, quindi, **nel caso peggiore servono almeno 3 confronti**: due non bastano. È ancora un albero di scelte: ogni confronto ha al massimo due rami, e ogni ordine possibile deve arrivare a una foglia diversa.

    Con $n$ oggetti distinti, gli ordini possibili sono $n!$. Se fai al massimo $q$ confronti, puoi distinguere al massimo $2^q$ possibilità. Devi quindi avere:

    $$
    2^q \ge n!
    \qquad\Longrightarrow\qquad
    q \ge \log_2(n!).
    $$

    Per $n$ grande, $\log_2(n!)$ cresce come $n\log_2 n$: da qui il riferimento a circa $n\log n$ confronti. Questo limite vale **nel caso peggiore per gli algoritmi che ordinano tramite confronti**. Lo approfondirai nel corso di Algoritmi.

Una situazione che ci servirà tra poco: $k$ chiavi vanno in una tabella con $m$ slot, **ognuna in uno slot diverso**. La prima ha $m$ scelte, la seconda $m-1$, la terza $m-2$... Il numero di modi è proprio $D(m, k) = m(m-1)\cdots(m-k+1)$.

### Terza idea: le combinazioni {: #combinazioni }

Spesso però $AB$ e $BA$ devono valere come un solo risultato: scegliamo 3 server su 10 per un rilascio sperimentale, e non ci interessa *in che ordine* li abbiamo nominati, conta solo *quali* sono. Partiamo da ciò che sappiamo contare, le sequenze, dove l'ordine distingue: $D(10, 3) = 720$. Ma ogni gruppo di 3 server compare in $3! = 6$ ordini diversi, e li abbiamo contati tutti e sei. Per contare i **gruppi** dobbiamo dividere per 6. In generale, un sottoinsieme di $k$ elementi compare $k!$ volte tra le sequenze, quindi:

!!! note "Coefficiente binomiale"

    $$
    \binom{n}{k} = \frac{D(n,k)}{k!} = \frac{n!}{k!\,(n-k)!}
    $$
    
    è il numero di modi di **scegliere un sottoinsieme di $k$ elementi** da un insieme di $n$, **ignorando l'ordine**. Si legge «$n$ su $k$».

Con i server: $\binom{10}{3} = \frac{720}{6} = 120$. Due proprietà si vedono subito dalla definizione: $\binom{n}{k} = \binom{n}{n-k}$ (scegliere chi *entra* o chi *resta fuori* è lo stesso), e il caso $k = 2$, $\binom{n}{2} = \frac{n(n-1)}{2}$, è il **numero di coppie** in un gruppo di $n$ persone. Quest'ultima ci tornerà utilissima nell'Atto IV.

### Il triangolo di Pascal e i futuri di Fermat {: #triangolo }

Finora abbiamo calcolato $\binom{n}{k}$ con i fattoriali, che diventano enormi in fretta. Esiste un modo più economico: costruire ogni coefficiente a partire da quelli più piccoli, usando solo somme. Per scoprire come, partiamo da un esempio che si può elencare a mano.

Abbiamo 4 server, $\{A, B, C, D\}$, e ne scegliamo 2. Sappiamo già che i gruppi sono $\binom{4}{2} = \frac{4 \cdot 3}{2} = 6$. Eccoli:

$$
AB,\; AC,\; AD,\; BC,\; BD,\; CD.
$$

Ora fissiamo l'attenzione su un server in particolare, $A$, e dividiamo i gruppi in due famiglie, a seconda che $A$ ci sia o no:

- **con $A$**: $AB,\; AC,\; AD$. Sono 3. Una volta messo $A$ nel gruppo, ne manca ancora 1 da scegliere tra gli altri 3 server ($B, C, D$): $\binom{3}{1} = 3$.
- **senza $A$**: $BC,\; BD,\; CD$. Sono 3. Qui $A$ è escluso, quindi i 2 posti si riempiono scegliendo tra gli stessi 3 server: $\binom{3}{2} = 3$.

Ogni gruppo sta in una famiglia e in una sola, perché $A$ o c'è o non c'è. Quindi $\binom{4}{2} = \binom{3}{1} + \binom{3}{2} = 3 + 3 = 6$.

Il ragionamento non dipende dai numeri. Prendiamo un insieme di $n$ elementi, ne fissiamo uno, $x$, e contiamo i sottoinsiemi di $k$ elementi in due famiglie:

- quelli che **contengono** $x$: ne restano da scegliere $k-1$ tra gli altri $n-1$, quindi sono $\binom{n-1}{k-1}$;
- quelli che **non** contengono $x$: tutti i $k$ elementi vanno scelti tra gli altri $n-1$, quindi sono $\binom{n-1}{k}$.

Sommando le due famiglie si ottengono tutti i sottoinsiemi:

$$
\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}.
$$

Nell'esempio era $n=4$, $k=2$, $x=A$. La formula dice che un coefficiente della riga $n$ si ottiene sommando due coefficienti della riga $n-1$, la riga precedente. Mettiamo i valori in fila, riga per riga, e la regola diventa visibile.

Scrivendo i valori riga per riga, con $\binom{n}{0} = \binom{n}{n} = 1$ ai bordi, si ottiene il **triangolo di Pascal**. In ogni casella sono scritti il coefficiente binomiale (nella forma C(n,k), cioè «$n$ su $k$») e il suo valore. La regola dice che ogni valore è la somma dei due che stanno sopra di lui, a sinistra e a destra. Nella figura è evidenziato il caso dell'esempio dei server: $\binom{4}{2} = \binom{3}{1} + \binom{3}{2} = 3 + 3 = 6$.

<figure markdown="0">
<svg viewBox="0 0 560 380" role="img" aria-label="Triangolo di Pascal fino alla riga 4, con C(n,k) e valore in ogni casella; C(4,2)=6 è la somma di C(3,1)=3 e C(3,2)=3" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif">
<text x="10" y="45" fill="currentColor" font-size="13">n=0</text><text x="10" y="119" fill="currentColor" font-size="13">n=1</text><text x="10" y="193" fill="currentColor" font-size="13">n=2</text><text x="10" y="267" fill="currentColor" font-size="13">n=3</text><text x="10" y="341" fill="currentColor" font-size="13">n=4</text>
<defs><marker id="pa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#e07a1f"/></marker></defs><g stroke="#e07a1f" stroke-width="2" fill="none" marker-end="url(#pa)"><line x1="240.0" y1="288" x2="266.0" y2="309"/><line x1="320.0" y1="288" x2="294.0" y2="309"/></g>
<rect x="236" y="16" width="88" height="48" rx="6" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle"><text x="280" y="35" font-size="12">C(0,0)</text><text x="280" y="56" font-weight="bold" font-size="16">1</text></g>
<rect x="186" y="90" width="88" height="48" rx="6" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle"><text x="230" y="109" font-size="12">C(1,0)</text><text x="230" y="130" font-weight="bold" font-size="16">1</text></g>
<rect x="286" y="90" width="88" height="48" rx="6" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle"><text x="330" y="109" font-size="12">C(1,1)</text><text x="330" y="130" font-weight="bold" font-size="16">1</text></g>
<rect x="136" y="164" width="88" height="48" rx="6" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle"><text x="180" y="183" font-size="12">C(2,0)</text><text x="180" y="204" font-weight="bold" font-size="16">1</text></g>
<rect x="236" y="164" width="88" height="48" rx="6" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle"><text x="280" y="183" font-size="12">C(2,1)</text><text x="280" y="204" font-weight="bold" font-size="16">2</text></g>
<rect x="336" y="164" width="88" height="48" rx="6" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle"><text x="380" y="183" font-size="12">C(2,2)</text><text x="380" y="204" font-weight="bold" font-size="16">1</text></g>
<rect x="86" y="238" width="88" height="48" rx="6" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle"><text x="130" y="257" font-size="12">C(3,0)</text><text x="130" y="278" font-weight="bold" font-size="16">1</text></g>
<rect x="186" y="238" width="88" height="48" rx="6" fill="#4051b5"/><g fill="#fff" text-anchor="middle"><text x="230" y="257" font-size="12">C(3,1)</text><text x="230" y="278" font-weight="bold" font-size="16">3</text></g>
<rect x="286" y="238" width="88" height="48" rx="6" fill="#4051b5"/><g fill="#fff" text-anchor="middle"><text x="330" y="257" font-size="12">C(3,2)</text><text x="330" y="278" font-weight="bold" font-size="16">3</text></g>
<rect x="386" y="238" width="88" height="48" rx="6" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle"><text x="430" y="257" font-size="12">C(3,3)</text><text x="430" y="278" font-weight="bold" font-size="16">1</text></g>
<rect x="36" y="312" width="88" height="48" rx="6" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle"><text x="80" y="331" font-size="12">C(4,0)</text><text x="80" y="352" font-weight="bold" font-size="16">1</text></g>
<rect x="136" y="312" width="88" height="48" rx="6" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle"><text x="180" y="331" font-size="12">C(4,1)</text><text x="180" y="352" font-weight="bold" font-size="16">4</text></g>
<rect x="236" y="312" width="88" height="48" rx="6" fill="#e07a1f"/><g fill="#fff" text-anchor="middle"><text x="280" y="331" font-size="12">C(4,2)</text><text x="280" y="352" font-weight="bold" font-size="16">6</text></g>
<rect x="336" y="312" width="88" height="48" rx="6" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle"><text x="380" y="331" font-size="12">C(4,3)</text><text x="380" y="352" font-weight="bold" font-size="16">4</text></g>
<rect x="436" y="312" width="88" height="48" rx="6" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle"><text x="480" y="331" font-size="12">C(4,4)</text><text x="480" y="352" font-weight="bold" font-size="16">1</text></g>
<text x="340.0" y="334" fill="currentColor" font-size="13">← 3 + 3 = 6</text>
</svg>
<figcaption>Il triangolo di Pascal fino a n = 4. Ogni casella contiene il coefficiente binomiale C(n,k) («n su k») e il suo valore. Le due caselle blu, sopra a sinistra e a destra, si sommano nella casella arancione sotto di loro. Ai bordi c'è sempre 1.</figcaption>
</figure>

Continuando con la stessa regola si ottengono le righe successive: $1, 5, 10, 10, 5, 1$ per $n=5$, e così via.

Pascal vi dedicò un trattato scritto in quegli anni, pubblicato dopo la sua morte; il triangolo era però già noto in altre tradizioni matematiche, e il nome è una convenzione. Ciò che conta per noi è che questi numeri li abbiamo già incontrati.

**Ricordiamo il Problema dei punti.** Due giocatori, $A$ e $B$, giocano una partita a manche; la partita si interrompe e bisogna dividere la posta in proporzione alle probabilità di vittoria. Con il metodo di Fermat si fanno giocare comunque $n = a + b - 1$ manche, dove $a$ e $b$ sono i punti che mancano ad $A$ e a $B$. Ognuno dei $2^n$ futuri possibili, scritto come parola di $n$ lettere $A$ e $B$, ha la stessa probabilità $\tfrac1{2^n}$, e $A$ vince la partita quando in quel futuro vince **almeno $a$ manche**.

Nel secondo caso dell'Atto II, il gioco a 3 punti sull'1–0, era $a = 2$, $b = 3$, $n = 4$. Avevamo raggruppato i 16 futuri per numero $k$ di manche vinte da $A$ e li avevamo contati a mano: 1, 4, 6, 4, 1 per $k = 0, 1, 2, 3, 4$. Sono i numeri della riga $n=4$ del triangolo, e non per caso. Un futuro in cui $A$ vince esattamente $k$ manche si può descrivere dicendo **quali** sono le $k$ manche vinte da $A$, tra le $n$ in programma, e le altre le vince $B$. Per esempio $BABA$ è il futuro in cui $A$ vince la 2ª e la 4ª manche. Scegliere un futuro con $k$ vittorie di $A$ equivale quindi a scegliere un sottoinsieme di $k$ posizioni tra $n$, e di sottoinsiemi così ce ne sono $\binom{n}{k}$. Con $n=4$ e $k=2$ si ottiene $\binom42 = 6$, esattamente le 6 parole della riga $k=2$ della tabella.

Questo ci permette di scrivere la probabilità di Fermat senza più elencare i futuri. Si sommano i $\binom{n}{k}$ per tutti i $k$ che fanno vincere $A$, cioè da $k=a$ fino a $k=n$, e si divide per il numero totale di futuri:

$$
P(A \text{ vince}) = \frac{1}{2^n} \sum_{k=a}^{n} \binom{n}{k}.
$$

Controllo sul caso di prima ($a=2$, $n=4$): $\frac{1}{16}\left(\binom42 + \binom43 + \binom44\right) = \frac{6+4+1}{16} = \frac{11}{16}$. Sul gioco a 5 punti ($a=3$, $n=7$) lo stesso calcolo dà $\frac{35+35+21+7+1}{128} = \frac{99}{128}$, senza scrivere i 128 futuri: ecco il conteggio che nell'Atto II avevamo rimandato a questo punto.

Si noti che, sommando tutti i numeri di una riga, si ottengono *tutti* i futuri possibili: $\sum_k \binom{n}{k} = 2^n$. Si noti anche che $2^n$ coincide con il numero di sottoinsiemi di un insieme di $n$ elementi (cioè la cardinalità dell'*insieme delle parti*).

**Perché i sottoinsiemi sono $2^n$.** Per contare tutti i sottoinsiemi di un insieme di $n$ elementi, vediamo in quanti modi se ne può *costruire* uno. Prendiamo gli elementi uno alla volta. Il primo può essere incluso o escluso dal sottoinsieme: due possibilità. Anche il secondo può essere incluso o escluso, e questa scelta non dipende dalla precedente, quindi le possibilità si **raddoppiano**. Lo stesso vale per il terzo, il quarto, fino all'$n$-esimo. Le scelte possibili sono quindi

$$
\overbrace{2 \cdot 2 \cdot 2 \cdots 2}^{n \text{ volte}} = 2^n.
$$

Con $n=3$ si ha $2 \cdot 2 \cdot 2 = 8$, e infatti i sottoinsiemi di $\{a,b,c\}$ sono otto: $\varnothing$, $\{a\}$, $\{b\}$, $\{c\}$, $\{a,b\}$, $\{a,c\}$, $\{b,c\}$, $\{a,b,c\}$. Aggiungere un solo elemento raddoppia il numero di sottoinsiemi: gli 8 di prima restano tali, e se ne aggiungono altri 8 uguali con il nuovo elemento dentro.

Lo stesso conteggio, fatto raggruppando i sottoinsiemi per numero $k$ di elementi (ce ne sono $\binom{n}{k}$ per ogni $k$), dà $\sum_k \binom{n}{k}$. Poiché i due modi di contare riguardano gli stessi oggetti, i risultati coincidono: è la formula $\sum_k \binom{n}{k} = 2^n$ scritta sopra.

### La probabilità classica, e il suo limite nascosto {: #classica }

Ora possiamo enunciare con precisione l'idea di Laplace della Settimana 1: se $\Omega$ è finito e **tutti i suoi esiti sono equiprobabili**,

$$
P(A) = \frac{|A|}{|\Omega|} = \frac{\text{casi favorevoli}}{\text{casi possibili}}.
$$

Tutto il lavoro sta nel contare numeratore e denominatore con gli strumenti di sopra. Per esempio, la probabilità di ottenere esattamente 5 teste in 10 lanci di una moneta onesta è $\binom{10}{5} / 2^{10} = 252/1024 \approx 0{,}246$.

L'ipotesi «equiprobabili» però non è un dettaglio, e sbagliare **che cosa** contare è l'errore classico, e ci siamo già cascati all'inizio della settimana con le due monete di d'Alembert: contare tre esiti ($T$, $CT$, $CC$) invece delle quattro sequenze ordinate, tutte di probabilità $\tfrac14$. Anche se si ragiona in termini di «numero di teste», gli esiti possibili sono tre ($0$, $1$, $2$) ma **non** sono equiprobabili: «una testa» raccoglie due sequenze, $TC$ e $CT$. Lo stesso succede con la somma di due dadi: le 11 somme possibili ($2, \dots, 12$) non sono equiprobabili, mentre le 36 coppie ordinate sì. La regola pratica: **per usare «casi favorevoli su casi possibili» bisogna contare oggetti che si presentino davvero con la stessa probabilità**, e per questo conviene quasi sempre distinguere gli esiti (due monete *distinguibili*, due dadi *distinguibili*).

Questa regola avrà un volto concreto tra due sezioni: una funzione hash ben progettata è, per definizione, un meccanismo che rende equiprobabili gli slot in cui finiscono le chiavi.

### Esplora tu stesso: quanti futuri hanno k vittorie? {: #widget-binomiale }

Il grafico mostra, per $n$ lanci di una moneta onesta, la frazione $\binom{n}{k}/2^n$ dei futuri con esattamente $k$ teste. Aumenta $n$: i valori centrali dominano sempre di più.

<div class="psi-widget" id="s03-widget-binomiale"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  function comb(n, k) {
    if (k < 0 || k > n) return 0;
    var r = 1;
    for (var i = 1; i <= k; i++) { r = r * (n - k + i) / i; }
    return r;
  }
  PSIWidget.mount('s03-widget-binomiale', {
    type: 'bar',
    xLabel: 'Numero k di teste',
    yLabel: 'C(n,k) / 2^n: frazione dei futuri',
    xDomain: [0, 40],
    yDomain: [0, 1.05],
    liveLabel: 'frazione di futuri con k teste',
    fn: function (x, p) { var n = Math.round(p.n); return x <= n ? comb(n, x) / Math.pow(2, n) : 0; },
    params: [
      { key: 'n', label: 'Lanci (n)', min: 1, max: 40, step: 1, value: 10 }
    ],
    stats: function (p) {
      var n = Math.round(p.n), best = Math.floor(n / 2);
      return [
        { label: 'Futuri totali 2^n', value: Math.pow(2, n).toLocaleString('it-IT') },
        { label: 'Più frequente: k = ' + best, value: (100 * comb(n, best) / Math.pow(2, n)).toFixed(1) + '%' }
      ];
    },
    caption: 'Con n = 4 si legge la riga 1, 4, 6, 4, 1 del triangolo di Pascal, divisa per 16.'
  });
});
</script>

### Script 2 — Le formule contro l'enumerazione {: #lab-combinatoria }

Prima di fidarci delle formule le confrontiamo con l'enumerazione esplicita su casi piccoli, costruiamo il triangolo di Pascal con la regola della somma ($\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$), e verifichiamo con una simulazione la probabilità classica dei 5 teste su 10 lanci.

<div class="psi-exec" markdown="1">
```python
# Script 2 — Contare senza elencare: formule, enumerazione e triangolo di Pascal
from math import comb, factorial, perm, log2
from itertools import permutations, combinations, product
import random

# (a) Le formule contro l'enumerazione esplicita (n = 5 chiavi, k = 3 slot)
n, k = 5, 3
assert len(list(product(range(n), repeat=k))) == n**k                       # moltiplicazione: n·n·n
assert len(list(permutations(range(n), k))) == factorial(n) // factorial(n - k) == perm(n, k)   # disposizioni
assert len(list(combinations(range(n), k))) == factorial(n) // (factorial(k) * factorial(n - k)) == comb(n, k)   # combinazioni
assert len(list(permutations(range(n), k))) == len(list(combinations(range(n), k))) * factorial(k)   # ogni sottoinsieme conta k! volte
print(f"n={n}, k={k}: sequenze con ripetizione {n**k}, disposizioni {perm(n, k)}, combinazioni {comb(n, k)}")

# (b) Il triangolo di Pascal con la regola C(n,k) = C(n-1,k-1) + C(n-1,k)
riga_precedente = [1]                           # la riga 0 contiene solo un 1
righe = [riga_precedente]                       # qui conserviamo tutte le righe
for _ in range(10):                             # costruiamo le righe da 1 a 10
    riga_nuova = [1]                            # ogni riga comincia con 1
    for j in range(1, len(riga_precedente)):    # ogni valore interno è la somma dei due valori sopra di lui
        riga_nuova.append(riga_precedente[j - 1] + riga_precedente[j])
    riga_nuova.append(1)                        # e finisce con 1
    righe.append(riga_nuova)
    riga_precedente = riga_nuova                # la riga appena costruita diventa la precedente del prossimo giro

for riga in righe[:7]:              # stampiamo le righe da 0 a 6
    testo = ""
    for valore in riga:
        testo = testo + f"{valore:3d} "
    print(testo.center(40))

# Controlli: ogni casella è C(n,k) = n! / (k! (n-k)!), e ogni riga somma a 2^n
for n in range(11):
    for k in range(n + 1):
        assert righe[n][k] == factorial(n) // (factorial(k) * factorial(n - k))
    assert sum(righe[n]) == 2**n    # i sottoinsiemi di un n-insieme sono 2^n

# (c) Probabilità classica: k teste in n lanci = C(n,k) / 2^n. Esatta contro simulazione
n, k = 10, 5
esatta = comb(n, k) / 2**n
rng = random.Random(7)
prove = 100_000
freq = sum(sum(rng.random() < 0.5 for _ in range(n)) == k for _ in range(prove)) / prove
print(f"P({k} teste su {n}): esatta {esatta:.4f}, simulata {freq:.4f}")
assert abs(esatta - freq) < 0.006

# (d) Gli ordinamenti di n elementi sono n!: servono almeno log2(n!) confronti per distinguerli
print("log2(100!) =", round(log2(factorial(100)), 1), "confronti almeno, per ordinare 100 elementi")
print("Script 2: tutti gli assert superati.")
```
</div>

Atteso: $125$ sequenze, $60$ disposizioni e $10$ combinazioni; il triangolo di Pascal stampato fino alla riga 6 (1, 6, 15, 20, 15, 6, 1); $0.2461$ esatto e circa $0.246$ simulato; $\log_2(100!) \approx 524{,}8$.

??? note "Come si legge la riga `len(list(product(range(n), repeat=k)))`, un pezzo alla volta"
    La riga sembra fitta, ma sono quattro idee semplici, una dentro l'altra. Leggiamola **da dentro verso fuori**, con $n = 5$ e $k = 3$.

    **1. `range(n)`: le scelte possibili per un posto.**
    `range(5)` produce i numeri $0, 1, 2, 3, 4$. Pensali come le 5 chiavi (o i 5 slot) tra cui scegliere.

    **2. `product(range(n), repeat=k)`: tutte le sequenze di lunghezza $k$.**
    `repeat=3` significa «ripeti questa scelta per 3 posti». È come scrivere `product(range(5), range(5), range(5))`: per il primo posto si pesca da $0..4$, per il secondo di nuovo da $0..4$, per il terzo ancora da $0..4$, **ogni volta liberamente**, anche ripetendo lo stesso valore. I risultati sono terne ordinate:

    ```
    (0, 0, 0)
    (0, 0, 1)
    (0, 0, 2)
    ...
    (4, 4, 3)
    (4, 4, 4)
    ```

    Si procede come un contachilometri: l'ultimo posto cambia più in fretta, poi scatta quello prima, e così via.

    **3. `list(...)`: metti tutte le terne in una lista.**
    `product` non le costruisce subito tutte: le produce una alla volta, quando qualcuno le chiede. `list(...)` le chiede **tutte** e le raccoglie in una lista.

    **4. `len(...)`: quante sono.**
    `len` conta gli elementi della lista. Il risultato è $125$.

    **Perché 125?** Per la regola della moltiplicazione: 5 scelte per il primo posto, 5 per il secondo, 5 per il terzo, quindi $5 \cdot 5 \cdot 5 = 5^3 = 125$. L'`assert` controlla che **contare a mano** con la formula `n**k` e **elencare davvero** tutte le terne diano lo stesso numero.

    Per riprodurre l'idea in piccolo, con $n = 2$ e $k = 2$:
    `list(product(range(2), repeat=2))` dà `[(0, 0), (0, 1), (1, 0), (1, 1)]`, cioè le $2^2 = 4$ sequenze ordinate di due monete, le stesse quattro di d'Alembert.

---

## Atto IV: Compleanni e coincidenze — il trucco del complementare {: #compleanni }

### La risposta a de Méré {: #de-mere-risposta }

Torniamo allo «scandalo» dell'Atto I e chiediamoci: qual è la probabilità di ottenere **almeno un** sei lanciando un dado quattro volte?

**Quante sono le sequenze possibili?** Un lancio ha 6 esiti. Con due lanci, per ciascuno dei 6 esiti del primo ce ne sono 6 del secondo: sono $6 \cdot 6 = 36$ coppie, come nella tabella della Settimana 1. Ogni lancio in più **moltiplica per 6** il numero di sequenze (è lo stesso ragionamento dell'albero della Settimana 2: ogni foglia si ramifica in 6). Con quattro lanci:

$$
6 \cdot 6 \cdot 6 \cdot 6 = 1296 \text{ sequenze, tutte equiprobabili.}
$$

(Si scrive in breve $6^4$: «6 moltiplicato per sé stesso 4 volte».)

**Quante hanno almeno un sei?** Contarle direttamente è lungo: un sei, due sei, tre, quattro, e per ognuno *in quali lanci*. Conviene contare il caso opposto, **nessun sei**, e usare il complementare ([Settimana 1, §6B](../settimana_01/index.md#b-la-regola-del-complementare)). Se non deve uscire il 6, a ogni lancio restano 5 esiti (1, 2, 3, 4, 5), quindi

$$
5 \cdot 5 \cdot 5 \cdot 5 = 625 \text{ sequenze senza sei.}
$$

Le altre hanno almeno un sei: $1296 - 625 = 671$. Sono i «671 contro 625» di Pascal: **671 sequenze vincenti contro 625 perdenti**. La probabilità è

$$
P(\text{almeno un sei in 4 lanci}) = \frac{671}{1296} = 1 - \left(\tfrac56\right)^4 \approx 0{,}518.
$$

**Con due dadi.** Un lancio ha 36 coppie, e il doppio sei è **una sola** di esse: la coppia $(6,6)$. Le altre 35 *non* sono un doppio sei, comprese quelle con un solo 6 come $(6,1)$ o $(2,6)$. In 24 lanci le sequenze possibili sono $36^{24}$ (36 moltiplicato per sé stesso 24 volte) e quelle senza alcun doppio sei sono $35^{24}$. I numeri sono enormi, ma conta il rapporto:

$$
P(\text{almeno un doppio sei in 24 lanci}) = 1 - \frac{35^{24}}{36^{24}} = 1 - \left(\tfrac{35}{36}\right)^{24} \approx 0{,}491.
$$

Quindi non c'è alcuna contraddizione: la prima scommessa è favorevole (51,8%), la seconda no (49,1%).

**Dov'era l'errore di de Méré.** Ragionava per proporzione: 4 lanci su 6 facce, 24 lanci su 36 coppie, stesso rapporto $\tfrac23$. Equivale a «sommare» le probabilità: $4 \cdot \tfrac16 = \tfrac23$ e $24 \cdot \tfrac1{36} = \tfrac23$. Ma sommare funziona solo per eventi **disgiunti** ([Settimana 1, §6C](../settimana_01/index.md#c-la-conseguenza-regina-la-regola-dellunione-e-il-dramma-della-sovrapposizione)), mentre «sei al primo lancio» e «sei al secondo» possono verificarsi insieme, e quelle sequenze verrebbero contate più volte.

**Quanti lanci servono davvero?** La scommessa conviene quando le sequenze senza successo sono **meno della metà** del totale.

| lanci $n$ | un dado: $2\cdot 5^n$ contro $6^n$ | conviene? | due dadi: $2\cdot 35^n$ contro $36^n$ | conviene? |
|---|---|---|---|---|
| 3 | $250 > 216$ | no ($42{,}1\%$) | | |
| 4 | $1250 < 1296$ | **sì** ($51{,}8\%$) | | |
| 24 | | | $2 \cdot 35^{24} > 36^{24}$ | no ($49{,}1\%$) |
| 25 | | | $2 \cdot 35^{25} < 36^{25}$ | **sì** ($50{,}6\%$) |

Con un dado il minimo è 4 lanci, e de Méré lo sapeva per esperienza. Con due dadi la proporzione dà $4 \cdot 6 = 24$, ma il numero giusto è **25**: un lancio in più, ed è proprio quel lancio che lui non vedeva.

!!! tip "Il trucco del complementare"
    Quando la domanda è «**almeno uno**…», calcola la probabilità di «**nessuno**…» (di solito un prodotto) e sottrai da 1. Lo useremo di nuovo adesso, e ancora per le tabelle hash.

### Script 3 — De Méré, esatto e simulato {: #lab-de-mere }

<div class="psi-exec" markdown="1">
```python
# Script 3 — Il «paradosso» di de Méré: esatto (complementare) e simulato
import numpy as np

def almeno_un_successo(p, tentativi):
    """P(almeno un successo in `tentativi` prove indipendenti): 1 - P(nessun successo)."""
    return 1 - (1 - p) ** tentativi

un_sei    = almeno_un_successo(1 / 6, 4)        # un dado, 4 lanci
doppio_sei = almeno_un_successo(1 / 36, 24)     # due dadi, 24 lanci
print(f"Almeno un 6 in 4 lanci:           {un_sei:.4f}  (= 671/1296 = {671/1296:.4f})")
print(f"Almeno un doppio 6 in 24 lanci:   {doppio_sei:.4f}")
assert abs(un_sei - 671 / 1296) < 1e-12 and un_sei > 0.5 > doppio_sei

# Il ragionamento «per proporzione» somma le probabilità: n·p. Ma P(almeno uno) < n·p
print(f"n·p vale {4/6:.4f} e {24/36:.4f}: stesso numero, ma le probabilità vere sono diverse")

# Quanti lanci di due dadi servono per superare 1/2?
n = 1
while almeno_un_successo(1 / 36, n) <= 0.5:
    n += 1
print(f"Con 24 lanci: {doppio_sei:.4f}; servono {n} lanci per arrivare a {almeno_un_successo(1/36, n):.4f}")
assert n == 25

# Verifica Monte Carlo: simuliamo T giocate complete e contiamo la frazione "vincente"
rng = np.random.default_rng(2024)   # seed fisso: risultati riproducibili
T = 100_000                         # numero di giocate simulate
# Gioco 1: ogni riga è una giocata da 4 lanci di un dado (valori 1..6)
d1 = rng.integers(1, 7, size=(T, 4), dtype=np.int8)
# any(axis=1): la giocata vince se ALMENO un lancio è 6; mean() = frequenza relativa
mc1 = (d1 == 6).any(axis=1).mean()
# Gioco 2: T giocate x 24 lanci x 2 dadi (ultimo asse = i due dadi del lancio)
d2 = rng.integers(1, 7, size=(T, 24, 2), dtype=np.int8)
# d2[g, l, k] = esito del dado k (0 o 1) nel lancio l della giocata g
# Passo 1: il primo dado è 6? Matrice di True/False di forma (T, 24)
primo_e_sei = (d2[:, :, 0] == 6)
# Passo 2: il secondo dado è 6? Stessa forma (T, 24)
secondo_e_sei = (d2[:, :, 1] == 6)
# Passo 3: "doppio 6" = entrambi 6 nello stesso lancio (& agisce elemento per elemento)
doppio_sei_lancio = primo_e_sei & secondo_e_sei      # forma (T, 24)
# Passo 4: la giocata vince se ALMENO un lancio dei 24 è doppio 6.
# any(axis=1) collassa l'asse dei lanci: da (T, 24) a (T,), un True/False per giocata
giocata_vinta = doppio_sei_lancio.any(axis=1)
# Passo 5: la media di valori booleani è la frazione di True (True=1, False=0),
# cioè la frequenza relativa delle giocate vinte: la stima Monte Carlo
mc2 = giocata_vinta.mean()
print(f"Monte Carlo ({T} giocate): un 6 in 4 lanci {mc1:.4f}, doppio 6 in 24 lanci {mc2:.4f}")
# Le frequenze simulate devono avvicinarsi alle probabilità esatte (tolleranza 0.01)
assert abs(mc1 - un_sei) < 0.01 and abs(mc2 - doppio_sei) < 0.01
print("Script 3: tutti gli assert superati.")
```
</div>

### Il paradosso dei compleanni {: #paradosso }

Ecco una domanda che sembra innocua. **Quante persone devono essere presenti in una stanza perché la probabilità che almeno due compiano gli anni lo stesso giorno superi il 50%?** Chiunque risponde con un numero grande (183? 100?). La risposta è **23**.

Modelliamo il problema con ipotesi esplicite: $n$ persone, 365 giorni possibili (ignoriamo il 29 febbraio), ogni persona nata in un giorno scelto uniformemente e indipendentemente dalle altre (anche questa è un'assunzione semplificatrice). Lo spazio campionario è l'insieme delle sequenze di $n$ giorni, e **per la moltiplicazione** ha $365^n$ elementi tutti equiprobabili. Applichiamo il trucco del complementare: invece di contare i casi con *almeno una* coincidenza, contiamo quelli con **tutti i compleanni diversi**, che sono più facili da descrivere.

**Un esempio con $n = 3$ persone.** Assegniamo i compleanni uno alla volta:

- la prima persona può avere qualunque giorno: $365$ scelte;
- la seconda deve evitare il giorno della prima: $364$ scelte;
- la terza deve evitare i due giorni già occupati: $363$ scelte.

Per la regola della moltiplicazione le sequenze con tutti i giorni diversi sono $365 \cdot 364 \cdot 363$, su un totale di $365^3$ sequenze possibili. Quindi

$$
P(\text{nessuna coincidenza}) = \frac{365 \cdot 364 \cdot 363}{365^3}.
$$

**Con $n$ persone** il ragionamento è identico: al numeratore ci sono $n$ fattori che scendono di uno alla volta, a partire da $365$ (sono le disposizioni semplici dell'Atto III); al denominatore c'è $365^n$:

$$
P(\text{nessuna coincidenza}) = \frac{365 \cdot 364 \cdots (365-n+1)}{365^n}.
$$

**Una forma più comoda.** Il denominatore $365^n$ è $365$ moltiplicato per sé stesso $n$ volte: possiamo assegnare un $365$ a ciascun fattore del numeratore.

$$
\frac{365}{365} \cdot \frac{364}{365} \cdot \frac{363}{365} \cdots \frac{365-n+1}{365}
$$

Ogni frazione si riscrive come $\frac{365 - i}{365} = 1 - \frac{i}{365}$, dove $i$ vale $0, 1, 2, \dots, n-1$. Il simbolo $\prod$ è solo la scrittura compatta di «moltiplica tutti questi fattori», come $\sum$ lo è per la somma:

$$
P(\text{nessuna coincidenza}) = \prod_{i=0}^{n-1}\left(1 - \frac{i}{365}\right).
$$

Per $n = 3$ i fattori sono $1 \cdot \left(1 - \tfrac{1}{365}\right) \cdot \left(1 - \tfrac{2}{365}\right) = \tfrac{365}{365}\cdot\tfrac{364}{365}\cdot\tfrac{363}{365}$, cioè la stessa espressione di prima.

Questo prodotto si legge anche con la regola del prodotto: la seconda persona evita il compleanno della prima con probabilità $\tfrac{364}{365}$, la terza evita i due già presi con probabilità $\tfrac{363}{365}$, e così via. La probabilità di **almeno una coincidenza** è $1 - \prod_{i=0}^{n-1}(1 - i/365)$:

| $n$ | 10 | 20 | **23** | 30 | 40 | 50 | 57 | 70 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| $P(\text{coincidenza})$ | 11,7% | 41,1% | **50,7%** | 70,6% | 89,1% | 97,0% | 99,0% | 99,92% |

### Perché è così sorprendente? {: #perche-sorprendente }

La nostra intuizione confronta **la mia data** con quelle degli altri: 22 persone hanno circa il 6% di probabilità di condividere *il mio* compleanno ($1 - (364/365)^{22} \approx 5{,}9\%$). Ma il paradosso chiede se **qualunque coppia** coincide, e le coppie sono molte di più delle persone: in una stanza di $n$ persone ci sono $\binom{n}{2} = \frac{n(n-1)}{2}$ coppie, cioè **253** per $n = 23$. Ognuna di queste coppie ha una probabilità $\tfrac1{365}$ di coincidere, e ogni coppia è un'occasione in più per trovare una coincidenza. Il numero di coppie cresce come $n^2$, non come $n$: è questo che l'intuizione sottovaluta.

### L'approssimazione esponenziale e la regola della radice {: #approssimazione }

La formula esatta è un prodotto di $n$ fattori: per $n = 23$ sono 23 moltiplicazioni, e non si vede a colpo d'occhio come il risultato dipenda da $n$. Vogliamo una formula corta, anche a costo di essere un po' approssimata. Lavoriamo con $N$ al posto di 365, così il ragionamento vale per qualunque numero di «giorni».

**Passo 1: un fatto sull'esponenziale.** Per ogni $x$ vale

$$
1 - x \;\le\; e^{-x},
$$

e le due quantità sono molto vicine quando $x$ è piccolo. Un controllo con qualche numero:

| $x$ | 0,01 | 0,1 | 0,5 |
|:---:|:---:|:---:|:---:|
| $1 - x$ | 0,99 | 0,9 | 0,5 |
| $e^{-x}$ | 0,9900 | 0,9048 | 0,6065 |

Per $x = 0{,}01$ la differenza si vede alla quarta cifra decimale; per $x = 0{,}5$ no. Geometricamente, $y = 1 - x$ è la retta tangente alla curva $y = e^{-x}$ nel punto $x = 0$, e la curva sta sempre sopra la sua tangente.

**Passo 2: applichiamolo a ogni fattore.** I fattori del prodotto hanno la forma $1 - x$ con $x = \frac{i}{N}$, che è piccolo finché $i$ è piccolo rispetto a $N$. Sostituiamo ciascun fattore con il suo $e^{-i/N}$, che è un po' più grande (e anche positivo, quindi moltiplicare le disuguaglianze è lecito):

$$
\prod_{i=0}^{n-1}\left(1 - \frac{i}{N}\right) \;\le\; \prod_{i=0}^{n-1} e^{-i/N}.
$$

**Passo 3: trasformiamo il prodotto in una somma.** L'esponenziale ha la proprietà $e^{a} \cdot e^{b} = e^{a+b}$: moltiplicare esponenziali equivale a sommare gli esponenti. Quindi

$$
\prod_{i=0}^{n-1} e^{-i/N} = e^{-\frac{0}{N}} \cdot e^{-\frac{1}{N}} \cdots e^{-\frac{n-1}{N}} = e^{-\frac{1}{N}\,(0 + 1 + 2 + \cdots + (n-1))}.
$$

**Passo 4: sommiamo gli interi.** La somma $0 + 1 + \cdots + (n-1)$ si calcola come faceva Gauss: si scrive due volte, una in avanti e una all'indietro, e si sommano le colonne.

$$
\begin{array}{ccccccc}
0 & + & 1 & + & \cdots & + & (n-1)\\
(n-1) & + & (n-2) & + & \cdots & + & 0
\end{array}
$$

Ogni colonna somma $n-1$, e le colonne sono $n$. Il doppio della somma è quindi $n(n-1)$, e la somma vale $\frac{n(n-1)}{2}$. In conclusione

$$
\prod_{i=0}^{n-1}\left(1 - \frac{i}{N}\right) \;\le\; e^{-\frac{n(n-1)}{2N}}.
$$

**Passo 5: passiamo alla probabilità di coincidenza.** Il prodotto è la probabilità di *nessuna* coincidenza, e la probabilità cercata è $1$ meno questa. Sottraendo da $1$ la disuguaglianza si **capovolge**:

$$
P(\text{almeno una coincidenza}) \;\ge\; 1 - e^{-\frac{n(n-1)}{2N}} \;\approx\; 1 - e^{-\frac{n^2}{2N}}.
$$

L'ultimo passaggio sostituisce $n(n-1)$ con $n^2$, che è ragionevole quando $n$ è grande. Siccome la stima è un minimo, è una stima **per difetto**: la probabilità vera è almeno questa. È accurata finché $n$ è molto più piccolo di $N$ (perché serve che gli $x = i/N$ siano piccoli).

**Controllo con $N = 365$ e $n = 23$.** Qui $n(n-1) = 23 \cdot 22 = 506$, quindi l'esponente è $\frac{506}{2 \cdot 365} = \frac{506}{730} \approx 0{,}69$. La stima vale $1 - e^{-0{,}69} \approx 0{,}500$, contro il valore vero $0{,}507$: sbaglia di meno di un punto percentuale.

**La regola della radice.** Chiediamoci a che $n$ la stima raggiunge $\tfrac12$:

$$
1 - e^{-\frac{n^2}{2N}} = \tfrac12 \iff e^{-\frac{n^2}{2N}} = \tfrac12 \iff \frac{n^2}{2N} = \ln 2 \iff n = \sqrt{2 \ln 2 \cdot N} \approx 1{,}18\,\sqrt{N}.
$$

(Passiamo da $e^{-y} = \tfrac12$ a $y = \ln 2$ prendendo il logaritmo naturale di entrambi i lati.) Per $N = 365$ otteniamo $1{,}18 \cdot 19{,}1 \approx 22{,}5$, cioè $23$.

La conseguenza è generale: **con $N$ possibilità equiprobabili, bastano circa $\sqrt{N}$ estrazioni perché una ripetizione diventi probabile**, non $N$. Per 365 giorni è 23, per un milione di «giorni» sono circa 1180.

### Esplora tu stesso: una sola curva per tutti gli N {: #widget-compleanni }

Finora abbiamo ragionato su $N = 365$. Ma la regola della radice dice che il risultato vale per *qualsiasi* $N$: cambia solo la scala. Il seguente grafico lo fa vedere.

- **Asse orizzontale:** invece del numero di persone $n$, usiamo $x = n/\sqrt{N}$, cioè contiamo le persone **in unità di $\sqrt{N}$**. Per $N = 365$ si ha $\sqrt{N} \approx 19$, quindi $n = 23$ persone corrispondono a $x \approx 1{,}2$; con $N = 1\,000\,000$ si ha $\sqrt{N} = 1000$, e $x = 1{,}2$ corrisponde a $n = 1200$ persone.
- **Asse verticale:** la probabilità *esatta* (calcolata con il prodotto del Passo 1, senza approssimazioni) che ci sia almeno una coincidenza.
- **Cursore:** sceglie $N$, da $10$ a $10$ milioni (scala logaritmica: ogni passo moltiplica $N$ per un fattore costante).

**Cosa osservare.** Sposta il cursore da un $N$ piccolo a uno enorme: la curva **resta quasi identica**. Significa che, se misuriamo le persone in unità di $\sqrt{N}$, la probabilità dipende solo da $x$ e non dal valore di $N$.

Questo è previsto dalla formula approssimata. Se nella stima $1 - e^{-n^2/(2N)}$ scriviamo $n = x\sqrt{N}$, otteniamo $n^2 = x^2 N$, e il $N$ al numeratore si semplifica con quello al denominatore:

$$
1 - e^{-\frac{x^2 N}{2N}} = 1 - e^{-x^2/2}.
$$

Il $N$ è sparito: ecco perché una sola curva (la linea tratteggiata) va bene per tutti. Infine, la curva passa per $\tfrac12$ quando $x \approx 1{,}18$, cioè $n \approx 1{,}18\sqrt{N}$: è la regola della radice trovata sopra.

<div class="psi-widget" id="s03-widget-compleanni"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  function pExact(n, N) {
    var q = 1;
    for (var i = 0; i < n; i++) { q *= (N - i) / N; if (q === 0) break; }
    return 1 - q;
  }
  function n50(N) {
    var q = 1, n = 0;
    while (1 - q < 0.5) { q *= (N - n) / N; n++; }
    return n;
  }
  PSIWidget.mount('s03-widget-compleanni', {
    type: 'line',
    xLabel: 'x = n / √N   (n = persone, o chiavi inserite)',
    yLabel: 'P(almeno una coincidenza)',
    xDomain: [0, 3],
    xSamples: 121,
    yDomain: [0, 1.05],
    liveLabel: 'probabilità esatta per questo N',
    fn: function (x, p) {
      var N = Math.round(Math.pow(10, p.logN));
      return pExact(Math.round(x * Math.sqrt(N)), N);
    },
    params: [
      { key: 'logN', label: 'Numero di possibilità N (log10; 2,56 ≈ 365 giorni)', min: 1, max: 7, step: 0.0001, value: 2.5623 }
    ],
    reference: { label: 'limite 1 − e^(−x²/2)', params: { logN: 7 } },
    stats: function (p) {
      var N = Math.round(Math.pow(10, p.logN)), k = n50(N);
      return [
        { label: 'N', value: N.toLocaleString('it-IT') },
        { label: 'Prime n con P ≥ 50%', value: k.toLocaleString('it-IT') },
        { label: 'Regola 1,18·√N', value: (1.1774 * Math.sqrt(N)).toFixed(1) }
      ];
    },
    caption: 'La linea tratteggiata è la curva per N = 10 milioni, praticamente il limite. Con N = 365 la curva esatta è appena sotto.'
  });
});
</script>

### Script 4 — Compleanni: esatto, approssimato, simulato {: #lab-compleanni }

<div class="psi-exec" markdown="1">
```python
# Script 4 — Compleanni: formula esatta, approssimazione esponenziale e simulazione
from math import exp, sqrt
import random

def p_coincidenza(n, N=365):
    """Esatta: 1 - prod_{i=0}^{n-1} (1 - i/N)  (definizione classica + complementare)."""
    p_distinti = 1.0
    for i in range(n):
        p_distinti *= (N - i) / N
    return 1 - p_distinti

def approssimata(n, N=365):
    """1 - exp(-n(n-1)/2N): da 1 - x <= e^{-x}."""
    return 1 - exp(-n * (n - 1) / (2 * N))

def simula(n, N=365, prove=20_000, seme=3):
    """Stima la probabilità di coincidenza ripetendo l'esperimento `prove` volte."""
    rng = random.Random(seme)           # generatore casuale con seme fisso: risultati riproducibili
    con_coincidenza = 0                 # in quante prove almeno due persone hanno lo stesso giorno

    for _ in range(prove):
        # Una prova: assegniamo a ognuna delle n persone un giorno a caso tra 0 e N-1.
        giorni = [rng.randrange(N) for _ in range(n)]

        # Se tutti i giorni sono diversi, l'insieme (set) li tiene tutti: ha n elementi.
        # Se ce n'è qualcuno ripetuto, l'insieme ne ha meno di n.
        if len(set(giorni)) < n:
            con_coincidenza += 1

    return con_coincidenza / prove      # frequenza relativa = stima della probabilità

print(" n   esatta  approx.  simulata")
for n in (10, 20, 23, 30, 40, 50, 57, 70):
    e, a, s = p_coincidenza(n), approssimata(n), simula(n)
    print(f"{n:3d}  {e:.4f}  {a:.4f}   {s:.4f}")
    assert a <= e + 1e-12                      # 1 - x <= e^{-x}: l'approssimazione è per difetto
    assert abs(e - s) < 0.015

assert round(p_coincidenza(23), 4) == 0.5073 and round(p_coincidenza(22), 4) == 0.4757

# La soglia del 50%: il più piccolo n con probabilità >= 1/2, contro la regola sqrt(2 ln2 · N)
def soglia(N):
    n = 1
    while p_coincidenza(n, N) < 0.5:
        n += 1
    return n
for N in (365, 10_000, 1_000_000):
    print(f"N = {N:>9,}:  n_50% = {soglia(N):>5}   regola 1.1774·√N = {1.1774 * sqrt(N):8.1f}")
assert soglia(365) == 23 and abs(soglia(1_000_000) - 1.1774 * 1000) < 2

# «Qualcuno è nato il MIO compleanno»: tutt'altra probabilità
print(f"Con 22 altre persone, P(qualcuno condivide il mio compleanno) = {1 - (364/365)**22:.4f}")
print("Script 4: tutti gli assert superati.")
```
</div>

Atteso: la tabella con $0.5073$ per $n = 23$; soglie $23$, $119$, $1178$ per $N = 365$, $10^4$, $10^6$; e $0.0586$ nell'ultima riga.

---

## Atto V: Tabelle hash e Birthday Attack {: #hash }

### Una tabella hash è un tavolo da compleanni {: #tabella-hash }

Una **tabella hash** è un array di $m$ posizioni (*slot*). Per inserire una chiave si applica una **funzione hash** $h$ che la trasforma in un numero tra $0$ e $m-1$: la chiave va nello slot $h(\text{chiave})$. Se due chiavi diverse finiscono nello stesso slot si ha una **collisione**, e la struttura dati deve prevedere come gestirla (liste concatenate, indirizzamento aperto…).

<figure markdown="0">
<svg viewBox="0 0 560 250" role="img" aria-label="Quattro chiavi (ada, bob, eva, leo) passano per la funzione hash h e vanno negli slot 2, 0, 2, 4 di un array di 5 slot; ada ed eva finiscono nello stesso slot 2: collisione" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px">
<defs><marker id="hk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>
<g fill="currentColor" font-weight="bold" text-anchor="middle"><text x="50" y="16">chiavi</text><text x="215" y="16">funzione hash</text><text x="455" y="16">array di m = 5 slot</text></g>
<g stroke="currentColor" stroke-width="1.5" fill="none" opacity=".7" marker-end="url(#hk)">
<line x1="90" y1="65" x2="170" y2="110"/><line x1="90" y1="105" x2="170" y2="122"/><line x1="90" y1="145" x2="170" y2="134"/><line x1="90" y1="185" x2="170" y2="146"/>
</g>
<rect x="172" y="95" width="86" height="64" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="215" y="132" text-anchor="middle" fill="currentColor" font-style="italic" font-size="16">h(chiave)</text>
<g stroke-width="1.5" fill="none" marker-end="url(#hk)">
<line x1="260" y1="110" x2="392" y2="127" stroke="#4051b5"/>
<line x1="260" y1="118" x2="392" y2="47" stroke="#e07a1f"/>
<line x1="260" y1="134" x2="392" y2="127" stroke="#2e9e5b"/>
<line x1="260" y1="142" x2="392" y2="207" stroke="#8a4fbf"/>
</g>
<g fill="#fff" text-anchor="middle">
<rect x="14" y="50" width="72" height="30" rx="5" fill="#4051b5"/><text x="50" y="70">ada</text>
<rect x="14" y="90" width="72" height="30" rx="5" fill="#e07a1f"/><text x="50" y="110">bob</text>
<rect x="14" y="130" width="72" height="30" rx="5" fill="#2e9e5b"/><text x="50" y="150">eva</text>
<rect x="14" y="170" width="72" height="30" rx="5" fill="#8a4fbf"/><text x="50" y="190">leo</text>
</g>
<g stroke="currentColor" stroke-width="1.5" fill="none" opacity=".8">
<rect x="396" y="30" width="120" height="34"/><rect x="396" y="70" width="120" height="34"/><rect x="396" y="150" width="120" height="34"/><rect x="396" y="190" width="120" height="34"/>
</g>
<rect x="396" y="110" width="120" height="34" fill="none" stroke="#e03a3a" stroke-width="2.5"/>
<g fill="currentColor" text-anchor="end" opacity=".8"><text x="534" y="52" text-anchor="start">0</text><text x="534" y="92" text-anchor="start">1</text><text x="534" y="132" text-anchor="start">2</text><text x="534" y="172" text-anchor="start">3</text><text x="534" y="212" text-anchor="start">4</text></g>
<g text-anchor="middle" font-weight="bold"><text x="456" y="52" fill="#e07a1f">bob</text><text x="438" y="132" fill="#4051b5">ada</text><text x="474" y="132" fill="#2e9e5b">eva</text><text x="456" y="212" fill="#8a4fbf">leo</text></g>
<text x="456" y="240" text-anchor="middle" fill="#e03a3a" font-weight="bold">h(ada) = h(eva) = 2: collisione</text>
</svg>
<figcaption>La funzione hash h trasforma ogni chiave in un indice tra 0 e m−1. Qui h(bob) = 0 e h(leo) = 4, mentre «ada» ed «eva» finiscono nello stesso slot.</figcaption>
</figure>

Una funzione hash ben progettata «mescola» le chiavi come se ogni chiave scegliesse il proprio slot **a caso, uniformemente e indipendentemente dalle altre**: nei testi di algoritmi è l'ipotesi di *simple uniform hashing* (per esempio nel cap. 11 di Cormen et al., *Introduction to Algorithms*). È un modello, non un fatto: una funzione hash reale approssima questo comportamento, e quando non lo fa le collisioni peggiorano. Ma sotto questa ipotesi il problema è **identico** al paradosso dei compleanni: gli slot sono i giorni, le chiavi sono le persone, $N = m$.

Quindi, per $n$ chiavi in $m$ slot:

$$
P(\text{almeno una collisione}) = 1 - \prod_{i=0}^{n-1}\left(1 - \frac{i}{m}\right) \;\ge\; 1 - e^{-\frac{n(n-1)}{2m}},
$$

e la collisione diventa **probabile** (oltre il 50%) quando $n \approx 1{,}18\sqrt{m}$. Con una tabella da **un milione di slot**, bastano circa **1180 chiavi**, cioè lo 0,12% della capienza, perché due chiavi condividano uno slot. Con 1000 chiavi la probabilità di avere almeno una collisione è già vicina al 40%. Moralde della favola: una tabella quasi vuota *non* è una tabella senza collisioni.

In ogni caso, questo fatto è una buona notizia travestita da cattiva: le collisioni non sono un difetto da eliminare, ma una certezza da gestire. Chi si aspetta che «con una buona funzione hash non succeda mai» sbaglia il modello; chi le prevede dimensiona le liste e il fattore di carico di conseguenza.

??? approfondimento "Perché è una buona notizia: collisioni frequenti, ma innocue"

    Il paradosso dei compleanni ci dice che una collisione compare quasi subito. Ma a noi non interessa la collisione in sé: interessa se la tabella **continua a fare il suo lavoro bene**, cioè se cercare e inserire una chiave resta veloce. Qui «veloce» e «lenta» hanno un significato preciso, che si misura contando i **confronti tra chiavi**:

    - Se la chiave cercata sta da sola nel suo slot, basta calcolare $h$ e fare un confronto. Sono pochi passi, sempre gli stessi, qualunque sia il numero $n$ di chiavi memorizzate.
    - Se nello slot ci sono altre $k$ chiavi finite lì per collisione, bisogna scorrerle e confrontarle una per una: circa $k$ passi.
    - Nel caso peggiore, tutte le $n$ chiavi finiscono nello stesso slot. La ricerca diventa una scansione di tutti gli elementi, come in una semplice lista: $O(n)$. Questa è una tabella davvero «lenta».

    Quindi *«c'è almeno una collisione»* e *«la tabella è lenta»* sono affermazioni molto diverse. La prima riguarda l'**esistenza** delle collisioni, e il paradosso dei compleanni risponde: quasi subito sì. La seconda riguarda la **lunghezza** delle liste che si formano, perché è quella a determinare quanti confronti servono. Una collisione isolata, che aggiunge un confronto a una ricerca ogni tanto, è innocua; sono le liste lunghe a rovinare le prestazioni. Per capire quanto lunghe diventano, serve una grandezza che misuri quanto è piena la tabella.

    Si definisce **fattore di carico** il rapporto

    $$
    \alpha = \frac{n}{m},
    $$

    cioè il numero medio di chiavi per slot. Con la risoluzione per **liste concatenate** (ogni slot contiene una lista delle chiavi che vi sono finite), sotto l'ipotesi di *simple uniform hashing* la lunghezza attesa di una lista è esattamente $\alpha$. Cercare una chiave costa quindi, in media, un calcolo di $h$ più la scansione di una lista di lunghezza media $\alpha$: un costo atteso $\Theta(1 + \alpha)$ (Cormen et al., cap. 11). **Non dipende da $n$**, ma solo dal rapporto tra $n$ ed $m$.

    Rimettiamo insieme i numeri dell'esempio:

    - $m = 10^6$ e $n = 1000$ chiavi: $\alpha = 0{,}001$. La collisione c'è con probabilità ~40%, ma il numero atteso di coppie in collisione è $\binom{n}{2}/m \approx 0{,}5$: **una mezza collisione in tutta la tabella**, e una ricerca tocca quasi sempre liste vuote o di un solo elemento.
    - $n = m$, cioè la tabella *piena* ($\alpha = 1$): la frazione di slot che resta vuota è circa $1/e \approx 37\%$ e ci sono slot con più chiavi, ma la lista più lunga è di poche unità (cresce come $\ln n / \ln\ln n$, per un milione di chiavi dell'ordine di 8–10). Una ricerca costa in media circa una o due letture.

    In altre parole: le collisioni **sono molte, ma corte**. Il loro costo si paga solo come piccola costante, ed è per questo che una tabella hash resta $O(1)$ in media anche se «in teoria» continua a collidere.

    **E se non si usano le liste?** Con l'**indirizzamento aperto** (le chiavi stanno nell'array stesso e, in caso di collisione, si prova lo slot successivo secondo una regola fissata) il discorso è lo stesso ma più severo: serve $\alpha < 1$ e il costo atteso di una ricerca senza successo cresce come $\frac{1}{1-\alpha}$ (sotto l'ipotesi di *uniform hashing*). A $\alpha = 0{,}5$ sono circa 2 tentativi, a $\alpha = 0{,}9$ circa 10: la tabella degrada rapidamente quando si riempie.

    **Cosa fanno le librerie, in pratica?** Tengono $\alpha$ sotto una soglia e, quando la superano, **ridimensionano** (*rehashing*): allocano una tabella più grande, di solito il doppio, e reinseriscono tutte le chiavi. Il costo del rehash è ammortizzato sulle inserzioni, quindi l'inserimento resta $O(1)$ ammortizzato. Alcuni esempi:

    - `HashMap` di Java: liste concatenate (trasformate in alberi bilanciati se una lista diventa troppo lunga) e ridimensionamento a $\alpha = 0{,}75$ per default;
    - `dict` di CPython: indirizzamento aperto e ridimensionamento intorno a $\alpha = 2/3$.

    Le soglie sono scelte di implementazione: non vanno memorizzate, ma controllate nella documentazione della versione che si usa.

    **La morale operativa.** Il progettista di una tabella hash non chiede alla funzione hash di *evitare* le collisioni (impossibile: il paradosso dei compleanni dice che sono quasi immediate) ma di *distribuire* le chiavi in modo che nessuno slot si carichi troppo, e poi governa $\alpha$ con il ridimensionamento. Il rischio vero compare quando la distribuzione **non** è uniforme, per esempio perché qualcuno **sceglie le chiavi apposta** per farle cadere nello stesso slot: in quel caso le liste diventano lunghe e le operazioni degenerano verso $O(n)$ (è la base degli attacchi di *hash flooding* contro i server web, che è il motivo per cui molti linguaggi usano funzioni hash con seme casuale). Nella sezione successiva vediamo l'altra faccia della medaglia: quando a cercare le collisioni è un attaccante e non il caso, lo stesso calcolo dei compleanni diventa un'arma.

### Esplora tu stesso: riempi la tabella {: #widget-hash }

Scegli il numero di slot $m$ e inserisci chiavi casuali, una alla volta o dieci alla volta. Gli slot vuoti sono grigi, quelli occupati da una chiave sono blu, quelli con una collisione sono arancioni. Dopo quante chiavi compare la prima collisione? Ripeti l'esperimento più volte: confronta con $\sqrt{m}$.

<style>
.s03-grid { display: grid; grid-template-columns: repeat(auto-fill, 18px); gap: 2px; margin: 10px 0; }
.s03-cell { width: 18px; height: 18px; border-radius: 3px; background: rgba(128, 128, 128, 0.25); font-size: 10px; line-height: 18px; text-align: center; color: #fff; }
.s03-cell.c1 { background: #4051b5; }
.s03-cell.c2 { background: #e07a1f; }
.s03-box button { margin-right: 8px; padding: 2px 10px; cursor: pointer; }
</style>
<div class="s03-box" id="s03-hash">
  <label>Slot m: <input type="range" id="s03-hm" min="16" max="400" step="1" value="100"> <b id="s03-hmv">100</b></label>
  <div>
    <button id="s03-h1" type="button">+1 chiave</button>
    <button id="s03-h10" type="button">+10 chiavi</button>
    <button id="s03-hr" type="button">Azzera</button>
  </div>
  <div class="s03-grid" id="s03-hgrid"></div>
  <div class="s03-out" id="s03-hout"></div>
</div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  var sl = document.getElementById('s03-hm'), mv = document.getElementById('s03-hmv');
  var grid = document.getElementById('s03-hgrid'), out = document.getElementById('s03-hout');
  var counts = [], n = 0, first = null;
  function reset() { var m = +sl.value; counts = new Array(m).fill(0); n = 0; first = null; mv.textContent = m; render(); }
  function add(k) {
    for (var j = 0; j < k; j++) {
      var s = Math.floor(Math.random() * counts.length);
      if (counts[s] > 0 && first === null) first = n + 1;
      counts[s]++; n++;
    }
    render();
  }
  function render() {
    var m = counts.length, occ = 0, html = '';
    counts.forEach(function (c) {
      if (c > 0) occ++;
      html += '<div class="s03-cell ' + (c === 0 ? '' : c === 1 ? 'c1' : 'c2') + '">' + (c > 1 ? c : '') + '</div>';
    });
    grid.innerHTML = html;
    var q = 1; for (var i = 0; i < n; i++) { q *= (m - i) / m; }
    out.innerHTML = 'Chiavi inserite: <b>' + n + '</b> · slot occupati: <b>' + occ + '</b> · chiavi finite in uno slot già occupato: <b>' + (n - occ) + '</b><br>' +
      'Prima collisione: <b>' + (first === null ? 'non ancora' : 'alla chiave n. ' + first) + '</b> · ' +
      'regola 1,18·√m ≈ <b>' + (1.1774 * Math.sqrt(m)).toFixed(1) + '</b><br>' +
      'P(almeno una collisione con ' + n + ' chiavi) = <b>' + (100 * (1 - Math.max(q, 0))).toFixed(1) + '%</b>';
  }
  sl.addEventListener('input', reset);
  document.getElementById('s03-h1').addEventListener('click', function () { add(1); });
  document.getElementById('s03-h10').addEventListener('click', function () { add(10); });
  document.getElementById('s03-hr').addEventListener('click', reset);
  reset();
});
</script>

### Il Birthday Attack {: #birthday-attack }

Una funzione hash crittografica (SHA-256, per esempio) trasforma qualunque messaggio in un valore di $b$ bit, quindi $N = 2^b$ possibili «giorni». Una proprietà richiesta è la **resistenza alle collisioni**: deve essere difficile trovare **due** messaggi diversi con lo stesso hash. L'attaccante non ha bisogno di colpire un valore prefissato (che costerebbe in media circa $2^b$ tentativi): gli basta trovare una qualunque coppia che coincide, e per la regola della radice servono circa $1{,}18 \cdot 2^{b/2}$ messaggi. Questo è il **birthday attack**.

| Bit dell'hash $b$ | 32 | 64 | 128 | 160 | 256 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| Messaggi per il 50% di collisione ($\approx 1{,}18 \cdot 2^{b/2}$) | $7{,}7\cdot 10^{4}$ | $5{,}1\cdot 10^{9}$ | $2{,}2\cdot 10^{19}$ | $1{,}4\cdot 10^{24}$ | $4{,}0\cdot 10^{38}$ |

Si legge subito che un hash di 32 bit si rompe con una manciata di decine di migliaia di messaggi, e che 64 bit sono alla portata di un calcolo serio. Ma la tabella nasconde una conseguenza più importante: **la sicurezza contro le collisioni è la metà dei bit dell'hash**. Vediamo perché, in tre passaggi.

1. **Due attacchi diversi.** Se l'attaccante deve trovare un messaggio con *uno specifico* hash (o con lo stesso hash di un messaggio dato), è come cercare chi compie gli anni *proprio oggi*: servono circa $2^b$ tentativi. Se invece gli basta trovare *una qualunque coppia* di messaggi con lo stesso hash, è il paradosso dei compleanni: bastano circa $\sqrt{2^b} = 2^{b/2}$ messaggi. La resistenza alle collisioni riguarda il secondo caso, quindi il costo dell'attacco è $2^{b/2}$ e non $2^b$.
2. **Misurare la sicurezza in bit.** Si dice che un sistema ha «sicurezza a $k$ bit» quando rompere richiede circa $2^k$ operazioni. Un attacco da $2^{b/2}$ operazioni dà quindi $k = b/2$.
3. **Il risultato.** SHA-256 produce $b = 256$ bit, ma contro le collisioni offre «solo» $k = 128$ bit di sicurezza: servono circa $2^{128}$ messaggi (la colonna 256 della tabella, $4{,}0 \cdot 10^{38}$). Sono comunque un numero fuori portata per qualunque computer.

Per questo i progettisti ragionano al contrario: se si vuole una sicurezza a 128 bit contro le collisioni, l'hash deve avere **il doppio dei bit**, cioè 256.

Una precisazione di realtà: il birthday attack è il limite generale che vale per **qualunque** funzione hash, ma le funzioni difettose cedono molto prima. Per MD5 le prime collisioni pratiche sono state ottenute con attacchi crittanalitici nel 2004 ([Wang e Yu, *How to Break MD5 and Other Hash Functions*, Eurocrypt 2005](https://doi.org/10.1007/11426639_2)), e per SHA-1 nel 2017 il progetto [*SHAttered*](https://security.googleblog.com/2017/02/announcing-first-sha1-collision.html) ha prodotto due PDF diversi con lo stesso hash, con circa nove miliardi di miliardi di calcoli SHA-1 (circa $2^{63}$, contro i circa $2^{80}$ del birthday attack puro).

### Script 5 — Il birthday attack su un hash troncato {: #lab-hash }

Non possiamo rompere SHA-256, ma possiamo verificare la regola della radice su una versione in miniatura: **troncare** l'hash ai suoi primi $b$ bit, con $b$ piccolo (12, 16, 20, 24). Così lo spazio dei valori è $N = 2^b$ e le collisioni arrivano abbastanza presto da poterle osservare.

L'esperimento è lo stesso della tabella hash: si generano messaggi casuali, si calcola l'hash troncato di ciascuno, e ci si ferma alla prima volta che un valore si ripete. Il numero di messaggi hashati fino a quel momento è il risultato di **una prova**.

Una sola prova dipende troppo dalla fortuna (a volte la collisione arriva dopo pochi messaggi, a volte dopo molti di più), quindi lo script ripete la prova molte volte per ogni $b$ e controlla due cose:

1. **La mediana** dei risultati deve essere vicina a $1{,}18 \cdot 2^{b/2}$: è la regola della radice, cioè il numero di messaggi dopo cui la probabilità di collisione è il 50%. Perciò circa **metà delle prove** deve finire *prima* di questa soglia e metà *dopo*.
2. **Ogni 2 bit in più, i messaggi necessari raddoppiano** (non quadruplicano): lo si vede dalla colonna della mediana, perché cresce come $\sqrt{N}$ e non come $N$.

<div class="psi-exec" markdown="1">
```python
# Script 5 — Birthday attack: prima collisione di un SHA-256 troncato
import hashlib
import random
from statistics import median


def prima_collisione(b, rng):
    """Hasha messaggi casuali, tenendo solo i primi b bit dell'hash,
    finché due messaggi hanno lo stesso valore. Restituisce quanti ne
    sono serviti."""
    visti = set()   # hash troncati già incontrati (controllo veloce)
    n = 0           # quanti messaggi abbiamo hashato finora
    while True:
        # messaggio casuale di 8 byte (64 bit): quasi sempre nuovo
        # ("big" = big-endian: byte più significativo per primo)
        msg = rng.getrandbits(64).to_bytes(8, "big")
        # SHA-256 dà 256 bit: ">> (256 - b)" tiene solo i primi b
        # (lo shift a destra scarta gli ultimi 256 - b bit)
        digest = hashlib.sha256(msg).digest()
        h = int.from_bytes(digest, "big") >> (256 - b)
        n += 1
        if h in visti:  # stesso hash di un messaggio precedente
            return n
        visti.add(h)


rng = random.Random(2026)   # seme fisso: risultati sempre uguali
print("bit   prove   mediana   1,18·2^(b/2)   prove con n <= soglia")
# per ogni b, quante prove ripetere (più b è grande, più ogni prova
# costa, quindi meno prove)
for b, prove in ((12, 400), (16, 300), (20, 100), (24, 30)):
    # numero di messaggi dopo cui la collisione ha il 50% di probabilità
    soglia = 1.18 * 2 ** (b / 2)
    # ripetiamo l'esperimento: un risultato per ogni prova
    risultati = [prima_collisione(b, rng) for _ in range(prove)]
    sotto = sum(n <= soglia for n in risultati)
    percento = 100 * sotto / prove
    print(f"{b:3d}  {prove:>6}  {median(risultati):>8.0f}  "
          f"{soglia:>13.0f}  {percento:>20.0f}%")
    # la mediana misurata deve stare entro il 30% della soglia teorica
    assert 0.7 * soglia < median(risultati) < 1.3 * soglia
    # e circa metà delle prove deve finire entro la soglia
    assert 30 <= percento <= 70
print("Script 5: tutti gli assert superati.")
```
</div>

Atteso: la mediana vicina alla soglia $1{,}18 \cdot 2^{b/2}$ per ogni $b$ (per esempio circa 300 per $b = 16$ e circa 4800 per $b = 24$), con circa il 50% delle prove sotto la soglia. Passando da $b = 16$ a $b = 24$ ci sono 8 bit in più, cioè 4 raddoppi: la mediana cresce di circa $2^4 = 16$ volte.

---

## Il Takeaway per l'Ingegnere del Software {: #takeaway }

1. **Le collisioni sono attese, non eccezionali.** Una tabella hash con $m$ slot ha una collisione già dopo circa $\sqrt{m}$ inserimenti. Per questo ogni implementazione seria ha una strategia di risoluzione, e i costi si ragionano in termini di *fattore di carico* $n/m$, non di «evitare le collisioni».
2. **Con la sicurezza, i bit contano a metà.** Un hash o un identificatore di $b$ bit regge fino a circa $2^{b/2}$ elementi, non $2^b$. Un ID di 32 bit scelto a caso è pericoloso già con centomila elementi.
3. **Quando la domanda è «almeno uno», calcola «nessuno».** Il trucco del complementare vale per ogni sistema con molti componenti ciascuno con una piccola probabilità di fallire, in modo indipendente: la probabilità che *almeno uno* fallisca non è la somma delle probabilità dei singoli componenti, perché i casi in cui ne falliscono più d'uno verrebbero contati più volte (la somma è solo un limite superiore). Si può invece sommare le probabilità di «esattamente 1», «esattamente 2», … fallimenti, che sono eventi disgiunti, ma è più comodo calcolare $1 - \prod_i (1 - p_i)$. La probabilità cresce più in fretta di quanto si pensi. È l'errore di de Méré, trasportato in produzione.
4. **Il numero di coppie cresce come $n^2$.** In un sistema con $n$ componenti che possono interferire a due a due, le interazioni possibili sono $\binom{n}{2}$. È questa la ragione per cui i sistemi grandi producono incidenti «improbabili» con regolarità.

---

## Errori da evitare {: #errori }

1. **Confondere «qualcuno coincide con me» con «due qualunque coincidono».** La prima probabilità, con 22 altre persone, è circa 5,9%; la seconda, con 23 persone, è 50,7%. Le coppie sono $\binom{n}{2}$, non $n$.
2. **Sommare le probabilità di «almeno uno».** Vale solo per eventi disgiunti. Il ragionamento di de Méré dà $\tfrac23$ in due casi che valgono 51,8% e 49,1%.
3. **Dimenticare il $k!$.** Le disposizioni contano l'ordine, le combinazioni no: $D(n,k) = \binom{n}{k}\,k!$. Se l'ordine non conta e usi $n!/(n-k)!$ conti ogni gruppo $k!$ volte.
4. **Applicare «casi favorevoli su casi possibili» a esiti che non sono equiprobabili.** Tre esiti «0, 1, 2 teste» non sono equiprobabili; le quattro sequenze ordinate sì. Lo stesso vale per le funzioni hash: l'ipotesi di uniformità va giustificata.
5. **Usare l'approssimazione $1 - e^{-n^2/2N}$ quando $n$ non è piccolo rispetto a $N$.** Vale per $n \ll N$; l'ultima forma $n^2$ al posto di $n(n-1)$ ignora un termine che conta per $n$ piccolo.
6. **Pensare che «quasi vuota» voglia dire «senza collisioni».** Una tabella da un milione di slot ha il 40% di probabilità di collisione con 1000 chiavi.

---

## Riepilogo {: #riepilogo }

* Il **problema dei punti** (Pacioli 1494, Pascal e Fermat 1654) si risolve pesando i **futuri possibili**: Fermat li conta, Pascal li deduce uno dall'altro con la ricorsione $V(a,b) = \tfrac12 V(a-1,b) + \tfrac12 V(a,b-1)$.
* Il **conteggio** minimo: moltiplicazione ($n^k$), disposizioni ($n!/(n-k)!$), combinazioni ($\binom{n}{k}$, ordine ignorato), con il triangolo di Pascal $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$ e $\sum_k \binom{n}{k} = 2^n$.
* La **probabilità classica** è $|A|/|\Omega|$ solo se gli esiti contati sono equiprobabili.
* Il **trucco del complementare**: $P(\text{almeno uno}) = 1 - P(\text{nessuno})$. Risolve de Méré e i compleanni: $P = 1 - \prod_{i=0}^{n-1}(1 - i/N) \ge 1 - e^{-n(n-1)/2N}$.
* **Regola della radice**: con $N$ possibilità equiprobabili, la ripetizione è probabile dopo circa $1{,}18\sqrt{N}$ estrazioni. Tabelle hash: collisioni attese; hash crittografici: la sicurezza contro le collisioni è $b/2$ bit.

---

## Riferimenti e Fonti Primarie (Open Access Online) {: #riferimenti }

**Fonti storiche**

* **Blaise Pascal e Pierre de Fermat (1654)** — *Corrispondenza sul problema dei punti*, lettere dal 29 luglio al 27 ottobre 1654, ristampate nelle *Œuvres de Fermat*, II, pp. 288–314 (Tannery e Henry, Parigi 1894). Traduzione inglese: [pasfer.pdf](https://probabilityandfinance.com/pulskamp/Pascal/Sources/pasfer.pdf) (sito di Richard J. Pulskamp).
* **Luca Pacioli (1494)** — *Summa de arithmetica, geometria, proportioni et proportionalità*, ff. 197r–198v. Scansione: [Internet Archive](https://archive.org/details/summadearithmeti00paci). Passi di Pacioli e Tartaglia (traduzione inglese): Cantillo, [*The Problem of Points*](https://mpra.ub.uni-muenchen.de/50831/1/MPRA_paper_50831.pdf).
* **Niccolò Tartaglia (1556)** — *General trattato di numeri et misure*, parte I, libro XVI, sezione 206 (passo citato in Cantillo, sopra).
* **Christiaan Huygens (1657)** — *De ratiociniis in ludo aleae*. [Internet Archive](https://archive.org/details/DeRatiociniisInLudoAleae).
* **Jacob Bernoulli (1713)** — *Ars conjectandi*, Basilea. [Internet Archive](https://archive.org/details/jacobibernoulli00bern).
* **Il triangolo aritmetico** — storia del triangolo di Pascal e dei suoi predecessori in India, Persia e Cina: [Wikipedia, *Pascal's triangle*](https://en.wikipedia.org/wiki/Pascal%27s_triangle).
* **Jean Le Rond d'Alembert (1754)** — voce «Croix ou pile», *Encyclopédie*, vol. IV, pp. 512–513 (ottobre 1754); [traduzione inglese di R. J. Pulskamp](https://www.probabilityandfinance.com/pulskamp/Dalembert/croix_ou_pile.pdf) (la nostra traduzione italiana delle citazioni è da questa), e il commento di [Publimath](https://publimath.fr/CR017).
* **Pierre-Simon Laplace** — *Essai philosophique sur les probabilités*, sezione «Principes généraux du calcul des probabilités», secondo principio: [testo su Wikisource](https://fr.wikisource.org/wiki/Essai_philosophique_sur_les_probabilit%C3%A9s/Texte_entier).

**Storia della probabilità**

* **Prakash Gorroochurn** — *Thirteen Correct Solutions to the «Problem of Points» and Their Histories*. [PDF dell'autore](http://www.columbia.edu/~pg2113/index_files/Gorroochurn-Thirteen%20correct%20solutions%20to%20the%20%E2%80%9CProblem%20of%20Points%E2%80%9D%20and%20their%20histories.pdf).

**Tabelle hash e sicurezza**

* **Cormen, Leiserson, Rivest, Stein** — *Introduction to Algorithms*, 3ª ed.: §5.4.1 («The birthday paradox») e cap. 11 («Hash Tables»).
* **Xiaoyun Wang e Hongbo Yu (2005)** — *How to Break MD5 and Other Hash Functions*, Eurocrypt 2005, LNCS 3494, pp. 19–35.
* **Marc Stevens et al. (2017)** — *The first collision for full SHA-1* (progetto SHAttered): [shattered.io](https://shattered.io).
* **IETF** — *RFC 9562: Universally Unique IDentifiers (UUIDs)*: [rfc-editor.org](https://www.rfc-editor.org/rfc/rfc9562.html).
* **Wikipedia, *Birthday problem*** — media del numero di estrazioni e approssimazioni: <https://en.wikipedia.org/wiki/Birthday_problem>.

**Manuale di riferimento e notebook del corso**

* **Michael Baron (2014)** — *Probability and Statistics for Computer Scientists*, 2ª ed., CRC Press, §2.3 (combinatoria). [Scheda ACM Digital Library](https://dl.acm.org/doi/book/10.5555/2536837).
* **Notebook Colab del corso** (repository [colab_handouts_PSI](https://github.com/QwertyJacob/colab_handouts_PSI)): [2.1 Disposizioni e combinazioni](https://colab.research.google.com/github/QwertyJacob/colab_handouts_PSI/blob/main/2.1_disposizioni_combinazioni.ipynb) e [Compleanni](https://colab.research.google.com/github/QwertyJacob/colab_handouts_PSI/blob/main/compleanni.ipynb).

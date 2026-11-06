---
description: Le otto domande del primo round dell'esame orale sulla Settimana 3, ciascuna con le idee che una risposta corretta deve contenere.
---

[:material-book-open-variant: Apri la dispensa della Settimana 3](../../settimana_03/index.md){ .md-button }

# Settimana 3 — Domande d'esame del primo round

Questa pagina raccoglie le otto domande del primo round dell'esame orale che riguardano la [Settimana 3](../../settimana_03/index.md). Sono domande sui fondamenti: definizioni, distinzioni, ragionamenti da ricostruire e qualche piccolo calcolo. All'esame hai 30 secondi per leggere la domanda con calma, e poi un minuto e mezzo per rispondere a voce. Gli argomenti sono quelli indicati nel [perimetro d'esame](../../settimana_03/index.md#esame) all'inizio della dispensa.

!!! info "Che cosa significa «risposta attesa»"
    Sotto ogni domanda trovi la risposta attesa. «Attesa» non significa che devi rispondere esattamente con quelle parole, né nello stesso ordine. Significa che una risposta corretta contiene quelle idee principali, perché sono loro a sostenerla. Puoi usare parole tue, un esempio diverso o un altro ordine: conta che le idee ci siano e che siano giuste.

Per studiare conviene provare prima a rispondere da soli, a voce e senza guardare, come si farebbe all'esame. Solo dopo si apre la risposta attesa e si controlla quali idee mancavano. Per questo le risposte sono chiuse: si aprono con un clic sul titolo.

La sezione [Domande d'esame](../index.md) raccoglie anche le domande delle altre settimane e spiega come è fatto il secondo round.

Ogni domanda ha un codice. Per esempio, S3-R1-07 indica la settimana 3, il primo round e la domanda numero 7.

## Le domande

### S3-R1-01 · Principio di moltiplicazione {: #s3-r1-01 }

Enuncia il principio di moltiplicazione. Con un alfabeto di 26 lettere, quante password di 4 lettere minuscole si possono formare? Basta scrivere il conto, senza svolgerlo.

??? success "Risposta attesa"
    Se una prima scelta si può fare in $n_1$ modi e, per ciascuno di questi modi, una seconda scelta si può fare in $n_2$ modi, le scelte complessive sono $n_1\cdot n_2$; lo stesso vale con più scelte. Per la password ci sono 26 scelte per ciascuna delle 4 posizioni: le password sono 26 · 26 · 26 · 26 = 26⁴, circa 457.000.

### S3-R1-02 · Il fattoriale {: #s3-r1-02 }

Che cosa conta $n!$? Perché si pone $0!=1$?

??? success "Risposta attesa"
    $n!$ conta i modi di mettere in fila $n$ oggetti distinti: ci sono $n$ scelte per il primo posto, $n-1$ per il secondo, e così via fino a 1. Si pone $0!=1$ perché c'è un solo modo di mettere in fila zero oggetti, cioè non fare nulla. Con questa scelta le formule restano valide anche nei casi estremi, per esempio $\binom{n}{n}=1$.

### S3-R1-03 · Ordine e ripetizione {: #s3-r1-03 }

Per ciascuno dei tre casi scrivi il conto, senza svolgerlo, e spiega perché è quello giusto. (a) Quanti sono i PIN di 4 cifre (usando le cifre da 0 a 9)? (b) Dieci pacchetti partono verso la stessa destinazione: quante sono le possibili classifiche dei primi tre arrivati? (c) In quanti modi si possono scegliere, tra 10 server, i 3 da spegnere?

??? success "Risposta attesa"
    (a) L'ordine conta, perché 1234 e 4321 sono PIN diversi, e le cifre si possono ripetere: sono sequenze con ripetizione, 10⁴. (b) La classifica distingue il primo, il secondo e il terzo arrivato, quindi l'ordine conta; un pacchetto non può occupare due posti, quindi non ci sono ripetizioni. Sono disposizioni: 10 · 9 · 8. (c) Conta solo quali server si spengono, non l'ordine in cui si scelgono, e un server non si sceglie due volte: sono combinazioni, $\binom{10}{3}$. Se c'è tempo, i valori sono 10.000, 720 e 120.

### S3-R1-04 · Quando vale «favorevoli su possibili» {: #s3-r1-04 }

Quando si può calcolare una probabilità come «casi favorevoli su casi possibili»?

??? success "Risposta attesa"
    Solo quando gli esiti sono in numero finito e hanno tutti la stessa probabilità. Se non sono equiprobabili, il rapporto dà un risultato sbagliato. Esempio: lanciando due dadi le somme possibili sono 11, da 2 a 12, ma la probabilità della somma 7 non è 1/11: è 6/36, perché la somma 7 si ottiene in 6 modi su 36.

### S3-R1-05 · «Almeno uno» con il complementare {: #s3-r1-05 }

Come imposti la probabilità di ottenere almeno un 6 in 4 lanci di un dado? Basta scrivere il conto. Perché conviene passare dal complementare?

??? success "Risposta attesa"
    Il contrario di «almeno un 6» è «nessun 6». I lanci sono indipendenti, quindi la probabilità di nessun 6 è (5/6)⁴, e la probabilità cercata è 1 − (5/6)⁴, circa 0,52. Conviene passare dal complementare perché «nessun 6» è un caso solo, facile da calcolare, mentre «almeno un 6» si spezza in molti casi: un 6, due 6, e così via.

### S3-R1-06 · Contare le coppie {: #s3-r1-06 }

Perché in un gruppo di $n$ oggetti le coppie sono $n(n-1)/2$? Quante coppie si possono formare con 10 server?

??? success "Risposta attesa"
    Una coppia è un gruppo di 2 oggetti in cui l'ordine non conta, quindi le coppie sono le combinazioni $\binom{n}{2}$. Si contano prima le coppie ordinate: il primo oggetto si sceglie in $n$ modi e il secondo, diverso dal primo, in $n-1$ modi, per un totale di $n(n-1)$. In questo conteggio ogni coppia compare due volte, per esempio come $AB$ e come $BA$, quindi si divide per $2!=2$: $\binom{n}{2}=n(n-1)/2$. Con 10 server le coppie sono 10 · 9/2 = 45.

### S3-R1-07 · Dividere la posta {: #s3-r1-07 }

Nel problema dei punti, due giocatori ugualmente bravi interrompono la partita prima della fine e devono dividere la posta. Perché è sbagliato dividerla in proporzione ai punti già fatti? Con quale criterio va divisa?

??? success "Risposta attesa"
    La divisione in proporzione ai punti già fatti guarda soltanto al passato e ignora quanto manca a ciascuno per vincere. Il caso estremo proposto da Tartaglia lo mostra: in una partita che si vince a 60 punti, sul 10 a 0 questa regola darebbe tutta la posta a chi ha 10 punti, anche se gli mancano ancora 50 punti per vincere. La posta va divisa in proporzione alle probabilità che ciascun giocatore ha di vincere se la partita continuasse. I punti già fatti contano solo in quanto decidono quanti punti mancano a ciascuno.

### S3-R1-08 · Le ipotesi dei compleanni {: #s3-r1-08 }

Il calcolo dei compleanni assume 365 giorni equiprobabili e compleanni indipendenti. Fai un esempio in cui l'indipendenza non vale. Nel tuo esempio, la probabilità di una coincidenza sale o scende?

??? success "Risposta attesa"
    L’indipendenza dice che conoscere il compleanno di una persona non cambia le probabilità del compleanno di un’altra. Non vale, per esempio, quando il gruppo si forma guardando le date di nascita di chi è già stato scelto. Se si cercano di proposito persone nate nello stesso giorno di qualcuno già presente, la probabilità di una coincidenza sale; se invece si evitano le date già occupate, come in un calendario con un festeggiato per ogni giorno, la coincidenza diventa impossibile e la probabilità scende a zero.

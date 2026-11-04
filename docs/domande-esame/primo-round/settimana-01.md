---
description: Le venti domande del primo round dell'esame orale sulla Settimana 1, ciascuna con le idee che una risposta corretta deve contenere.
---

[:material-book-open-variant: Apri la dispensa della Settimana 1](../../settimana_01/index.md){ .md-button }

# Settimana 1 — Domande d'esame del primo round

Questa pagina raccoglie le venti domande del primo round dell'esame orale che riguardano la [Settimana 1](../../settimana_01/index.md). Sono domande sui fondamenti: definizioni, distinzioni, ragionamenti da ricostruire e qualche piccolo calcolo. All'esame si risponde a voce, in circa un minuto. Gli argomenti sono quelli indicati nel [perimetro d'esame](../../settimana_01/index.md#esame) all'inizio della dispensa.

!!! info "Che cosa significa «risposta attesa»"
    Sotto ogni domanda trovi la risposta attesa. «Attesa» non significa che devi rispondere esattamente con quelle parole, né nello stesso ordine. Significa che una risposta corretta contiene quelle idee principali, perché sono loro a sostenerla. Puoi usare parole tue, un esempio diverso o un altro ordine: conta che le idee ci siano e che siano giuste.

Per studiare conviene provare prima a rispondere da soli, a voce e senza guardare, come si farebbe all'esame. Solo dopo si apre la risposta attesa e si controlla quali idee mancavano. Per questo le risposte sono chiuse: si aprono con un clic sul titolo.

La sezione [Domande d'esame](../index.md) raccoglie anche le domande delle altre settimane e spiega come è fatto il secondo round.

Ogni domanda ha un codice. Per esempio, S1-R1-07 indica la settimana 1, il primo round e la domanda numero 7.

## Le domande

### S1-R1-01 · Esperimento, esito, evento {: #s1-r1-01 }

Che cosa sono un esperimento aleatorio, un esito, lo spazio campionario e un evento? Fai un esempio con due lanci di una moneta.

??? success "Risposta attesa"
    Un esperimento aleatorio è una procedura il cui risultato non si può prevedere con certezza, come lanciare due volte una moneta. Un esito è un singolo risultato completo dell'esperimento, per esempio «testa al primo lancio, croce al secondo» ($TC$). Lo spazio campionario $\Omega$ è l'insieme di tutti gli esiti possibili: qui $\{TT, TC, CT, CC\}$. Un evento è un sottoinsieme di $\Omega$: per esempio «esce almeno una testa» corrisponde a $\{TT, TC, CT\}$. Si dice che l'evento accade se l'esito osservato è uno dei suoi elementi.

### S1-R1-02 · Gli assiomi di Kolmogorov {: #s1-r1-02 }

Enuncia gli assiomi di Kolmogorov. Che cosa stabiliscono, e che cosa invece non stabiliscono?

??? success "Risposta attesa"
    Gli assiomi sono tre. Primo: la probabilità di ogni evento è maggiore o uguale a zero. Secondo: la probabilità dell'evento certo $\Omega$ è 1. Terzo, l'additività: se due eventi non possono accadere insieme, la probabilità che accada l'uno o l'altro è la somma delle loro probabilità; la regola vale anche per una successione di eventi a due a due incompatibili. Gli assiomi stabiliscono come si fanno i conti con le probabilità, come una grammatica. Non dicono che cosa significhi il numero né come assegnarlo in un caso concreto: questo dipende dall'interpretazione che scegliamo.

### S1-R1-03 · Il complementare {: #s1-r1-03 }

Un server è giù, in un dato giorno, con probabilità 0,02. Qual è la probabilità che sia su? Quale regola usi, e perché vale?

??? success "Risposta attesa"
    La probabilità che sia su è 1 − 0,02 = 0,98. Si usa la regola del complementare, $P(A^c)=1-P(A)$. Vale perché «il server è giù» e «il server è su» non possono accadere insieme e, insieme, coprono tutti i casi possibili: le loro due probabilità devono quindi sommare a 1.

### S1-R1-04 · Unione di due eventi {: #s1-r1-04 }

In un corso il 60% degli studenti usa Python, il 30% usa R e il 20% usa entrambi i linguaggi. Che percentuale di studenti usa almeno uno dei due? Perché la risposta non è 90%?

??? success "Risposta attesa"
    La percentuale è 60% + 30% − 20% = 70%. Si usa la regola $P(A\cup B)=P(A)+P(B)-P(A\cap B)$. La somma 60% + 30% non va bene perché gli studenti che usano entrambi i linguaggi compaiono sia nel 60% sia nel 30%: sono contati due volte, e bisogna toglierli una volta.

### S1-R1-05 · Operazioni tra eventi {: #s1-r1-05 }

Lanci un dado. Chiamiamo $A$ l'evento «esce un numero pari» e $B$ l'evento «esce un numero maggiore di 3». Elenca gli esiti di $A\cup B$, di $A\cap B$ e di $A^c$, e calcolane le probabilità.

??? success "Risposta attesa"
    $A=\{2,4,6\}$ e $B=\{4,5,6\}$. L'unione $A\cup B$, cioè «$A$ oppure $B$», è $\{2,4,5,6\}$ e ha probabilità 4/6. L'intersezione $A\cap B$, cioè «$A$ e $B$», è $\{4,6\}$ e ha probabilità 2/6. Il complementare $A^c$, cioè «non $A$», è $\{1,3,5\}$ e ha probabilità 1/2. Le facce del dado sono equiprobabili, quindi basta contare gli esiti e dividere per 6.

### S1-R1-06 · Probabilità condizionata {: #s1-r1-06 }

Definisci la probabilità condizionata $P(A\mid B)$. Che cosa significa condizionare a $B$, e perché serve $P(B)>0$?

??? success "Risposta attesa"
    $P(A\mid B)=P(A\cap B)/P(B)$. Condizionare a $B$ significa ragionare sapendo che $B$ è accaduto: gli esiti fuori da $B$ non sono più possibili, e l'universo si restringe a $B$ (è lo «zoom» della dispensa). Di $A$ conta solo la parte che sta dentro $B$, cioè $A\cap B$. Si divide per $P(B)$ perché il nuovo universo abbia probabilità totale 1. Se $P(B)$ fosse zero, la divisione non avrebbe senso.

### S1-R1-07 · Regola del prodotto {: #s1-r1-07 }

Ricava la regola del prodotto dalla definizione di probabilità condizionata, e usala in un esempio.

??? success "Risposta attesa"
    Moltiplicando per $P(B)$ entrambi i membri di $P(A\mid B)=P(A\cap B)/P(B)$ si ottiene $P(A\cap B)=P(B)\,P(A\mid B)$; scambiando i ruoli, anche $P(A\cap B)=P(A)\,P(B\mid A)$. Esempio: su 10 chiavette 3 sono difettose, e se ne prendono 2 senza rimettere la prima. La probabilità che la prima sia difettosa è 3/10. Sapendo che lo è, la seconda è difettosa con probabilità 2/9. La probabilità che siano difettose entrambe è 3/10 · 2/9 = 1/15.

### S1-R1-08 · Indipendenza e incompatibilità {: #s1-r1-08 }

Che differenza c'è tra eventi indipendenti ed eventi incompatibili? Due eventi incompatibili possono essere indipendenti?

??? success "Risposta attesa"
    Due eventi sono indipendenti se $P(A\cap B)=P(A)P(B)$: sapere che uno è accaduto non cambia la probabilità dell'altro. Due eventi sono incompatibili se non possono accadere insieme, cioè $A\cap B=\emptyset$. Se due eventi incompatibili hanno entrambi probabilità positiva, non sono indipendenti: $P(A\cap B)=0$, mentre $P(A)P(B)$ è positivo. Anzi, sapere che $B$ è accaduto rende $A$ impossibile: l'informazione su $B$ cambia completamente la probabilità di $A$.

### S1-R1-09 · Classica, frequentista, soggettiva {: #s1-r1-09 }

Spiega in breve le interpretazioni classica, frequentista e soggettiva della probabilità, con un esempio per ciascuna.

??? success "Risposta attesa"
    Nell'interpretazione classica la probabilità è il rapporto tra casi favorevoli e casi possibili, e si può usare solo quando gli esiti sono equiprobabili: per un dado onesto, la probabilità di un 6 è 1/6. Nell'interpretazione frequentista la probabilità è il valore a cui si avvicina la frequenza relativa quando si ripete molte volte la prova nelle stesse condizioni: la probabilità di perdere un pacchetto si legge su milioni di invii. Nell'interpretazione soggettiva la probabilità è il grado di fiducia coerente di una persona, la quota a cui accetterebbe una scommessa: per esempio la fiducia che un progetto venga consegnato entro la scadenza.

### S1-R1-10 · Serie e parallelo {: #s1-r1-10 }

Un sistema è formato da due componenti, e ciascuno funziona con probabilità 0,9. Qual è la probabilità che il sistema funzioni se i componenti sono collegati in serie? E se sono collegati in parallelo? Quale ipotesi stai usando?

??? success "Risposta attesa"
    Chiamiamo $F_1$ e $F_2$ gli eventi «il primo componente funziona» e «il secondo componente funziona». In serie il sistema funziona solo se funzionano entrambi i componenti, cioè se accade $F_1\cap F_2$: la probabilità è 0,9 · 0,9 = 0,81. In parallelo il sistema funziona se funziona almeno uno dei due, e conviene passare dal complementare: il sistema si ferma solo se si guastano entrambi, con probabilità 0,1 · 0,1 = 0,01, quindi funziona con probabilità 1 − 0,01 = 0,99. In tutti e due i casi l'ipotesi è che i componenti si guastino in modo indipendente: solo così la probabilità dell'intersezione è il prodotto delle probabilità.

### S1-R1-11 · Evento certo ed evento impossibile {: #s1-r1-11 }

Che cosa sono l'evento certo e l'evento impossibile? Quanto vale la loro probabilità? Fai un esempio con il lancio di un dado.

??? success "Risposta attesa"
    L'evento certo è l'intero spazio campionario $\Omega$: accade sempre, perché qualunque esito dell'esperimento è un elemento di $\Omega$. La sua probabilità è 1, come stabilisce il secondo assioma. L'evento impossibile è l'insieme vuoto $\emptyset$: non contiene nessun esito, quindi non accade mai, e la sua probabilità è 0. Con un dado, «esce un numero tra 1 e 6» è l'evento certo, mentre «esce 7» è l'evento impossibile.

### S1-R1-12 · Lo spazio campionario di un test {: #s1-r1-12 }

Un test automatico viene eseguito una volta e può dare tre risultati: superato, fallito oppure saltato. Scrivi lo spazio campionario e l'evento «il test non è fallito». Se il test è superato con probabilità 0,85 e saltato con probabilità 0,05, qual è la probabilità che non sia fallito?

??? success "Risposta attesa"
    Lo spazio campionario è $\Omega=\{\text{superato}, \text{fallito}, \text{saltato}\}$: ogni esecuzione produce uno e uno solo di questi risultati. L'evento «il test non è fallito» è $\{\text{superato}, \text{saltato}\}$, ed è il complementare dell'evento «il test è fallito». «Superato» e «saltato» non possono accadere insieme, quindi per l'additività la probabilità che il test non sia fallito è 0,85 + 0,05 = 0,90. Di conseguenza il test fallisce con probabilità 1 − 0,90 = 0,10.

### S1-R1-13 · Almeno una testa {: #s1-r1-13 }

Lanci tre volte una moneta onesta. Qual è la probabilità di ottenere almeno una testa? Perché conviene passare dal complementare?

??? success "Risposta attesa"
    Lo spazio campionario contiene $2^3=8$ sequenze equiprobabili, da $TTT$ a $CCC$. Il complementare di «almeno una testa» è «nessuna testa», cioè la sola sequenza $CCC$, che ha probabilità 1/8. La probabilità di ottenere almeno una testa è quindi 1 − 1/8 = 7/8. Conviene passare dal complementare perché «almeno una testa» comprende molti casi (una, due o tre teste), mentre il suo contrario è un caso solo.

### S1-R1-14 · Una somma che supera 1 {: #s1-r1-14 }

Un disservizio di rete capita il lunedì con probabilità 0,7 e il martedì con probabilità 0,5. Un collega calcola la probabilità di avere un disservizio lunedì oppure martedì come 0,7 + 0,5. Che cosa non va? I due eventi possono essere incompatibili?

??? success "Risposta attesa"
    La somma vale 1,2, e nessuna probabilità può superare 1. Sommare le due probabilità è corretto solo per eventi incompatibili, cioè che non possono accadere insieme. Un disservizio il lunedì e uno il martedì invece possono capitare nella stessa settimana: sommando, i casi in cui capitano entrambi vengono contati due volte. Anzi, i due eventi non possono essere incompatibili, proprio perché la somma delle loro probabilità supera 1. Il valore giusto si ottiene con la regola $P(L\cup M)=P(L)+P(M)-P(L\cap M)$.

### S1-R1-15 · Sapendo che è pari {: #s1-r1-15 }

Lanci un dado onesto, e un amico che ha visto il risultato ti dice soltanto che è uscito un numero pari. Qual è ora la probabilità che sia uscito 6? E che sia uscito un numero maggiore di 3?

??? success "Risposta attesa"
    Sapere che il numero è pari restringe gli esiti possibili a $\{2,4,6\}$, che restano equiprobabili: è lo «zoom» della dispensa. La probabilità che sia uscito 6 diventa 1/3, mentre prima dell'informazione era 1/6. Tra i tre esiti pari, quelli maggiori di 3 sono 4 e 6, quindi la probabilità che sia uscito un numero maggiore di 3 è 2/3, mentre senza informazioni era 1/2.

### S1-R1-16 · Indipendenti o no? {: #s1-r1-16 }

Nel 50% dei giorni viene rilasciato un aggiornamento, nel 20% dei giorni c'è un picco di traffico, e nel 10% dei giorni accadono entrambe le cose. I due eventi sono indipendenti? Come lo controlli?

??? success "Risposta attesa"
    Chiamiamo $U$ l'evento «c'è un aggiornamento» e $T$ l'evento «c'è un picco di traffico». Due eventi sono indipendenti se $P(U\cap T)=P(U)\,P(T)$. Qui $P(U)\,P(T)=0{,}5\cdot 0{,}2=0{,}1$, che coincide con $P(U\cap T)=0{,}1$: i due eventi sono indipendenti. Lo si vede anche con la probabilità condizionata: $P(T\mid U)=0{,}1/0{,}5=0{,}2$, uguale a $P(T)$, quindi sapere che c'è stato un aggiornamento non cambia la probabilità di un picco.

### S1-R1-17 · Una moneta e un dado {: #s1-r1-17 }

Lanci una moneta e un dado. Qual è la probabilità di ottenere testa e 6? Quale ipotesi usi? Verifica il risultato contando gli esiti.

??? success "Risposta attesa"
    La moneta e il dado non si influenzano: gli eventi «esce testa» e «esce 6» sono indipendenti, e la probabilità che accadano entrambi è il prodotto 1/2 · 1/6 = 1/12. Per verificarlo si contano gli esiti: le coppie (faccia della moneta, faccia del dado) sono 2 · 6 = 12, tutte equiprobabili, e soltanto una è (testa, 6). La probabilità è quindi 1/12.

### S1-R1-18 · Con e senza reimmissione {: #s1-r1-18 }

Un'urna contiene 3 palline rosse e 2 blu, e ne estrai due, una dopo l'altra. Qual è la probabilità che siano entrambe rosse se rimetti nell'urna la prima pallina prima di estrarre la seconda? E se non la rimetti?

??? success "Risposta attesa"
    Con la reimmissione l'urna torna ogni volta com'era, e le due estrazioni sono indipendenti: la probabilità è 3/5 · 3/5 = 9/25 = 0,36. Senza reimmissione si usa la regola del prodotto. La prima pallina è rossa con probabilità 3/5; sapendo che lo è, nell'urna restano 2 rosse su 4 palline, e la seconda è rossa con probabilità 2/4. La probabilità è quindi 3/5 · 2/4 = 3/10 = 0,30.

### S1-R1-19 · Frequenza e probabilità {: #s1-r1-19 }

Lanci un dado 60 volte e il 6 esce 14 volte. Qual è la frequenza relativa del 6? È la probabilità di ottenere 6? Che cosa ti aspetti se continui a lanciare?

??? success "Risposta attesa"
    La frequenza relativa è il numero di volte in cui l'evento è accaduto diviso per il numero di prove: 14/60 ≈ 0,23. Non è la probabilità: è un risultato osservato, che cambierebbe se si ripetessero i 60 lanci. Se il dado è onesto, la probabilità di un 6 è 1/6 ≈ 0,17, cioè circa 10 volte su 60, e uno scarto come questo su soli 60 lanci non è sorprendente. Secondo l'interpretazione frequentista la probabilità è il valore a cui la frequenza relativa si avvicina quando il numero di lanci cresce: continuando a lanciare, ci si aspetta che la frequenza del 6 si avvicini a 1/6.

### S1-R1-20 · Una stima incoerente {: #s1-r1-20 }

Un collega dice: «La probabilità che il rilascio di domani vada bene è 0,8, e la probabilità che vada male è 0,3». Che cosa non va in queste due stime?

??? success "Risposta attesa"
    «Va bene» e «va male» sono eventi complementari: non possono accadere insieme e uno dei due accade di sicuro. Per la regola del complementare le loro probabilità devono sommare a 1, mentre qui la somma è 1,1. Anche le probabilità soggettive, cioè i gradi di fiducia personali, devono rispettare gli assiomi: il collega è libero di dare 0,8 a «va bene», ma allora deve dare 0,2 a «va male».

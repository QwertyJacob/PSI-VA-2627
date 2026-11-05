---
description: Le otto domande del primo round dell'esame orale sulla Settimana 1, ciascuna con le idee che una risposta corretta deve contenere.
---

[:material-book-open-variant: Apri la dispensa della Settimana 1](../../settimana_01/index.md){ .md-button }

# Settimana 1 — Domande d'esame del primo round

Questa pagina raccoglie le otto domande del primo round dell'esame orale che riguardano la [Settimana 1](../../settimana_01/index.md). Sono domande sui fondamenti: definizioni, distinzioni, ragionamenti da ricostruire e qualche piccolo calcolo. All'esame hai 30 secondi per leggere la domanda con calma, e poi un minuto e mezzo per rispondere a voce. Gli argomenti sono quelli indicati nel [perimetro d'esame](../../settimana_01/index.md#esame) all'inizio della dispensa.

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

### S1-R1-02 · Il complementare {: #s1-r1-02 }

Un server è giù, in un dato giorno, con probabilità 0,02. Qual è la probabilità che sia su? Quale regola usi, e perché vale?

??? success "Risposta attesa"
    La probabilità che sia su è 1 − 0,02 = 0,98. Si usa la regola del complementare, $P(A^c)=1-P(A)$. Vale perché «il server è giù» e «il server è su» non possono accadere insieme e, insieme, coprono tutti i casi possibili: le loro due probabilità devono quindi sommare a 1.

### S1-R1-03 · Unione di due eventi {: #s1-r1-03 }

In un corso il 60% degli studenti usa Python, il 30% usa R e il 20% usa entrambi i linguaggi. Che percentuale di studenti usa almeno uno dei due? Perché la risposta non è 90%?

??? success "Risposta attesa"
    La percentuale è 60% + 30% − 20% = 70%. Si usa la regola $P(A\cup B)=P(A)+P(B)-P(A\cap B)$. La somma 60% + 30% non va bene perché gli studenti che usano entrambi i linguaggi compaiono sia nel 60% sia nel 30%: sono contati due volte, e bisogna toglierli una volta.

### S1-R1-04 · Evento certo ed evento impossibile {: #s1-r1-04 }

Che cosa sono l'evento certo e l'evento impossibile? Quanto vale la loro probabilità? Fai un esempio con il lancio di un dado.

??? success "Risposta attesa"
    L'evento certo è l'intero spazio campionario $\Omega$: accade sempre, perché qualunque esito dell'esperimento è un elemento di $\Omega$. La sua probabilità è 1, come stabilisce il secondo assioma. L'evento impossibile è l'insieme vuoto $\emptyset$: non contiene nessun esito, quindi non accade mai, e la sua probabilità è 0. Con un dado, «esce un numero tra 1 e 6» è l'evento certo, mentre «esce 7» è l'evento impossibile.

### S1-R1-05 · Almeno una testa {: #s1-r1-05 }

Lanci tre volte una moneta onesta. Qual è la probabilità di ottenere almeno una testa? Perché conviene passare dal complementare?

??? success "Risposta attesa"
    Lo spazio campionario contiene $2^3=8$ sequenze equiprobabili, da $TTT$ a $CCC$. Il complementare di «almeno una testa» è «nessuna testa», cioè la sola sequenza $CCC$, che ha probabilità 1/8. La probabilità di ottenere almeno una testa è quindi 1 − 1/8 = 7/8. Conviene passare dal complementare perché «almeno una testa» comprende molti casi (una, due o tre teste), mentre il suo contrario è un caso solo.

### S1-R1-06 · Sapendo che è pari {: #s1-r1-06 }

Lanci un dado onesto, e un amico che ha visto il risultato ti dice soltanto che è uscito un numero pari. Qual è ora la probabilità che sia uscito 6? E che sia uscito un numero maggiore di 3?

??? success "Risposta attesa"
    Sapere che il numero è pari restringe gli esiti possibili a $\{2,4,6\}$, che restano equiprobabili: è lo «zoom» della dispensa. La probabilità che sia uscito 6 diventa 1/3, mentre prima dell'informazione era 1/6. Tra i tre esiti pari, quelli maggiori di 3 sono 4 e 6, quindi la probabilità che sia uscito un numero maggiore di 3 è 2/3, mentre senza informazioni era 1/2.

### S1-R1-07 · Una moneta e un dado {: #s1-r1-07 }

Lanci una moneta e un dado. Qual è la probabilità di ottenere testa e 6? Quale ipotesi usi? Verifica il risultato contando gli esiti.

??? success "Risposta attesa"
    La moneta e il dado non si influenzano: gli eventi «esce testa» e «esce 6» sono indipendenti, e la probabilità che accadano entrambi è il prodotto 1/2 · 1/6 = 1/12. Per verificarlo si contano gli esiti: le coppie (faccia della moneta, faccia del dado) sono 2 · 6 = 12, tutte equiprobabili, e soltanto una è (testa, 6). La probabilità è quindi 1/12.

### S1-R1-08 · Una stima incoerente {: #s1-r1-08 }

Un collega dice: «La probabilità che il rilascio di domani vada bene è 0,8, e la probabilità che vada male è 0,3». Che cosa non va in queste due stime?

??? success "Risposta attesa"
    «Va bene» e «va male» sono eventi complementari: non possono accadere insieme e uno dei due accade di sicuro. Per la regola del complementare le loro probabilità devono sommare a 1, mentre qui la somma è 1,1. Anche le probabilità soggettive, cioè i gradi di fiducia personali, devono rispettare gli assiomi: il collega è libero di dare 0,8 a «va bene», ma allora deve dare 0,2 a «va male».

---
description: Le otto domande del primo round dell'esame orale sulla Settimana 4, ciascuna con le idee che una risposta corretta deve contenere.
---

[:material-book-open-variant: Apri la dispensa della Settimana 4](../../settimana_04/index.md){ .md-button }

# Settimana 4 — Domande d'esame del primo round

Questa pagina raccoglie le otto domande del primo round dell'esame orale che riguardano la [Settimana 4](../../settimana_04/index.md). Sono domande sui fondamenti: definizioni, distinzioni, ragionamenti da ricostruire e qualche piccolo calcolo. All'esame hai 30 secondi per leggere la domanda con calma, e poi un minuto e mezzo per rispondere a voce. Gli argomenti sono quelli indicati nel [perimetro d'esame](../../settimana_04/index.md#esame) all'inizio della dispensa.

!!! info "Che cosa significa «risposta attesa»"
    Sotto ogni domanda trovi la risposta attesa. «Attesa» non significa che devi rispondere esattamente con quelle parole, né nello stesso ordine. Significa che una risposta corretta contiene quelle idee principali, perché sono loro a sostenerla. Puoi usare parole tue, un esempio diverso o un altro ordine: conta che le idee ci siano e che siano giuste.

Per studiare conviene provare prima a rispondere da soli, a voce e senza guardare, come si farebbe all'esame. Solo dopo si apre la risposta attesa e si controlla quali idee mancavano. Per questo le risposte sono chiuse: si aprono con un clic sul titolo.

La sezione [Domande d'esame](../index.md) raccoglie anche le domande delle altre settimane e spiega come è fatto il secondo round.

Ogni domanda ha un codice. Per esempio, S4-R1-07 indica la settimana 4, il primo round e la domanda numero 7.

## Le domande

### S4-R1-01 · Variabile aleatoria {: #s4-r1-01 }

Che cos'è una variabile aleatoria? Fai un esempio.

??? success "Risposta attesa"
    È una funzione che associa un numero a ogni esito dell'esperimento: una regola che dice quale quantità vogliamo leggere dall'esito. Esempio: lanciando tre monete, $X$ è il numero di teste; per l'esito $TCT$ vale $X=2$.

### S4-R1-02 · La funzione di massa {: #s4-r1-02 }

Che cos'è la funzione di massa (PMF) di una variabile aleatoria discreta? Costruiscila per il numero di teste in due lanci di una moneta.

??? success "Risposta attesa"
    La PMF associa a ogni valore possibile $x$ la probabilità $p(x)=P(X=x)$. Con due lanci: $p(0)=1/4$ (solo $CC$), $p(1)=1/2$ ($TC$ e $CT$), $p(2)=1/4$ (solo $TT$). Bisogna distinguere il valore $x$, cioè il numero di teste, dalla sua probabilità $p(x)$.

### S4-R1-03 · Il valore atteso {: #s4-r1-03 }

Definisci il valore atteso. Perché per un dado vale 3,5, un numero che non esce mai?

??? success "Risposta attesa"
    Il valore atteso di $X$ è la somma pesata dei valori che $X$ può assumere, dove i pesi sono le probabilità: $\mathbb{E}[X]=\sum_x x\,p(x)$. Si può vedere anche come il baricentro, o centro di massa, della PMF: se su ogni valore $x$ si appoggia una massa pari a $p(x)$, il valore atteso è il punto in cui tutto sta in equilibrio. Per un dado ogni faccia ha peso 1/6, quindi $\mathbb{E}[X]=(1+2+3+4+5+6)\cdot\frac16=3{,}5$. Una somma pesata di numeri interi non deve essere un numero intero, così come il baricentro non deve cadere proprio su una delle masse: per questo il valore atteso può essere un valore che $X$ non assume mai. Non è il risultato che ci aspettiamo in un singolo lancio, ma la media che si osserva su molti lanci.

### S4-R1-04 · Media semplice e media pesata {: #s4-r1-04 }

Un gioco paga 0 € con probabilità 0,9 e 100 € con probabilità 0,1. Un amico dice che la vincita media è 50 €. Correggilo.

??? success "Risposta attesa"
    50 € è la media semplice dei due valori, e non tiene conto delle probabilità. Il valore atteso pesa ogni valore con la sua probabilità: 0 · 0,9 + 100 · 0,1 = 10 €.

### S4-R1-05 · L'indicatrice {: #s4-r1-05 }

Definisci l'indicatrice di un evento e ricava che $\mathbb{E}[I_A]=P(A)$.

??? success "Risposta attesa"
    L'indicatrice $I_A$ vale 1 quando l'evento $A$ accade e 0 quando non accade. Il suo valore atteso è $1\cdot P(A)+0\cdot P(A^c)=P(A)$: la media di un'indicatrice è la probabilità dell'evento che segnala.

### S4-R1-06 · La media $np$ {: #s4-r1-06 }

Ricava la media della distribuzione binomiale senza usare la PMF.

??? success "Risposta attesa"
    Si scrive $X=I_1+I_2+\dots+I_n$, dove $I_i$ è l'indicatrice del successo alla prova $i$. Ogni indicatrice ha media $p$. Per la linearità, $\mathbb{E}[X]=p+p+\dots+p=np$.

### S4-R1-07 · Un costo fisso e un costo al minuto {: #s4-r1-07 }

Un job costa 2 € fissi più 0,5 € per ogni minuto di calcolo, e la durata media è di 10 minuti. Qual è il costo medio? Quale proprietà usi?

??? success "Risposta attesa"
    Chiamiamo $X$ la durata in minuti: il costo è $C=0{,}5X+2$. Per la linearità del valore atteso, $\mathbb{E}[0{,}5X+2]=0{,}5\,\mathbb{E}[X]+2=0{,}5\cdot10+2=7$ €. Non serve conoscere la distribuzione della durata, ma soltanto la sua media, perché il costo è una funzione lineare della durata: la costante si aggiunge alla media, e il fattore 0,5 moltiplica la media.

### S4-R1-08 · La somma di due dadi {: #s4-r1-08 }

Qual è la media della somma di due dadi? Perché per calcolarla non serve costruire la PMF della somma?

??? success "Risposta attesa"
    La media è 3,5 + 3,5 = 7. Per la linearità del valore atteso, la media di una somma è la somma delle medie, e la media di un dado è 3,5. La PMF della somma invece ha 11 valori, da 2 a 12, con probabilità diverse che bisognerebbe prima contare: la linearità permette di evitare quel lavoro. Si scompone un conto difficile in pezzi semplici, e per farlo non serve nemmeno che i due dadi siano indipendenti.

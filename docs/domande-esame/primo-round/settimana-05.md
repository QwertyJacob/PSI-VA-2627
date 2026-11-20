---
description: Le otto domande del primo round dell'esame orale sulla Settimana 5, ciascuna con le idee che una risposta corretta deve contenere.
---

[:material-book-open-variant: Apri la dispensa della Settimana 5](../../settimana_05/index.md){ .md-button }

# Settimana 5 — Domande d'esame del primo round

Questa pagina raccoglie le otto domande del primo round dell'esame orale che riguardano la [Settimana 5](../../settimana_05/index.md). Sono domande sui fondamenti: definizioni, distinzioni, ragionamenti da ricostruire e qualche piccolo calcolo. All'esame hai 30 secondi per leggere la domanda con calma, e poi un minuto e mezzo per rispondere a voce. Gli argomenti sono quelli indicati nel [perimetro d'esame](../../settimana_05/index.md#esame) all'inizio della dispensa.

!!! info "Che cosa significa «risposta attesa»"
    Sotto ogni domanda trovi la risposta attesa. «Attesa» non significa che devi rispondere esattamente con quelle parole, né nello stesso ordine. Significa che una risposta corretta contiene quelle idee principali, perché sono loro a sostenerla. Puoi usare parole tue, un esempio diverso o un altro ordine: conta che le idee ci siano e che siano giuste.

Per studiare conviene provare prima a rispondere da soli, a voce e senza guardare, come si farebbe all'esame. Solo dopo si apre la risposta attesa e si controlla quali idee mancavano. Per questo le risposte sono chiuse: si aprono con un clic sul titolo.

La sezione [Domande d'esame](../index.md) raccoglie anche le domande delle altre settimane e spiega come è fatto il secondo round.

Ogni domanda ha un codice. Per esempio, S5-R1-07 indica la settimana 5, il primo round e la domanda numero 7.

## Le domande

### S5-R1-01 · Che cosa misura la varianza {: #s5-r1-01 }

Definisci la varianza e spiega che cosa misura. Perché si usa anche la deviazione standard?

??? success "Risposta attesa"
    La varianza è $\operatorname{Var}(X)=\mathbb{E}[(X-\mu)^2]$: la media dei quadrati delle distanze dei valori dalla media $\mu$. Misura quanto i valori si allontanano dalla media, cioè quanto sono dispersi. La deviazione standard $\sigma$ è la radice quadrata della varianza, e si usa perché ha la stessa unità di misura di $X$: se $X$ è in euro, $\sigma$ è in euro, mentre la varianza è in euro al quadrato.

### S5-R1-02 · Calcolare una varianza {: #s5-r1-02 }

$X$ vale 0 oppure 20, con probabilità 1/2 ciascuno. Calcola la media, la varianza e la deviazione standard.

??? success "Risposta attesa"
    La media è $\mu=10$. Entrambi i valori distano 10 dalla media, quindi i quadrati delle distanze valgono 100. La varianza è (100 + 100)/2 = 100, e la deviazione standard è $\sqrt{100}=10$.

### S5-R1-03 · Le ipotesi della distribuzione geometrica {: #s5-r1-03 }

Quali ipotesi definiscono la distribuzione geometrica? Che cosa conta la variabile $X$, e quali valori può assumere?

??? success "Risposta attesa"
    Si ripetono prove che hanno due esiti, successo o fallimento; il successo ha la stessa probabilità $p$ in ogni prova; le prove sono indipendenti. $X$ conta le prove necessarie per ottenere il primo successo, compresa la prova riuscita: i suoi valori sono 1, 2, 3, e così via. La differenza con la distribuzione binomiale sta in che cosa racconta la variabile: una variabile aleatoria binomiale conta i successi in un numero fissato di prove, mentre una variabile aleatoria geometrica conta le prove necessarie fino al primo successo.

### S5-R1-04 · La PMF e la coda {: #s5-r1-04 }

Ricava la PMF della distribuzione geometrica e la probabilità $P(X>k)$.

??? success "Risposta attesa"
    $X=k$ significa che le prime $k-1$ prove falliscono e la $k$-esima riesce. Per l'indipendenza, $P(X=k)=(1-p)^{k-1}p$. $X>k$ significa invece che le prime $k$ prove falliscono tutte, quindi $P(X>k)=(1-p)^k$.

### S5-R1-05 · Cinque tentativi in media {: #s5-r1-05 }

Un tentativo di connessione riesce con probabilità 0,2, indipendentemente dagli altri, quindi in media servono 5 tentativi. Un collega conclude: «Allora entro 5 tentativi mi connetto quasi sempre». Ha ragione? Scrivi il conto che ti serve, senza svolgerlo.

??? success "Risposta attesa"
    No. La media dice quanti tentativi servono in media, se l'attesa si ripete molte volte; non è un limite che si supera raramente. Servono più di 5 tentativi quando i primi 5 falliscono tutti, e per l'indipendenza questo accade con probabilità $0{,}8^5$, circa 0,33: una volta su tre bisogna aspettare più della media. Molte attese sono brevi, ma alcune sono molto lunghe, ed è anche per queste che la media arriva a 5.

### S5-R1-06 · Il numero ritardatario {: #s5-r1-06 }

Il numero 53 non esce sulla ruota di Venezia da 180 estrazioni. Adesso è più probabile che esca?

??? success "Risposta attesa"
    No. Le estrazioni sono indipendenti, quindi la probabilità che il 53 esca alla prossima estrazione è la stessa di sempre: è l'assenza di memoria. È vero che, partendo da oggi, sarebbe molto improbabile che il 53 mancasse per altre 180 estrazioni; ma le 180 assenze passate sono già avvenute e non cambiano le probabilità delle estrazioni future.

### S5-R1-07 · Il server e la chat di gruppo {: #s5-r1-07 }

Per quale di questi due conteggi la distribuzione di Poisson è un buon modello: le richieste che utenti diversi inviano a un server in un secondo, oppure i messaggi che arrivano in un minuto in una chat di gruppo, dove ogni messaggio ne provoca subito altri? Perché?

??? success "Risposta attesa"
    Per le richieste al server. La distribuzione di Poisson descrive eventi che arrivano singolarmente, indipendenti l'uno dall'altro, con un tasso stabile. Le richieste di utenti diversi, in un periodo di traffico normale, si avvicinano a queste ipotesi, perché ogni utente decide per conto suo. Nella chat, invece, un messaggio ne provoca altri: gli arrivi non sono indipendenti e vengono a raffiche, così ci sono minuti quasi vuoti e minuti affollati. Il conteggio dei messaggi è più disperso di quanto preveda la distribuzione di Poisson.

### S5-R1-08 · Il parametro dell'intervallo {: #s5-r1-08 }

Arrivano in media 120 richieste al minuto. Quale valore di $\lambda$ usi per il numero di richieste in un secondo? E in 5 secondi?

??? success "Risposta attesa"
    In un secondo arrivano in media 120/60 = 2 richieste, quindi $\lambda=2$. In 5 secondi ne arrivano in media 10, quindi $\lambda=10$. Il parametro è sempre il numero medio di eventi nell'intervallo di cui parla la domanda. Per esempio, la probabilità di nessuna richiesta in un secondo è $e^{-2}\approx 0{,}135$.

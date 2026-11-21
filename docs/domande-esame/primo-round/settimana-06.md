---
description: Le otto domande del primo round dell'esame orale sulla Settimana 6, ciascuna con le idee che una risposta corretta deve contenere.
---

[:material-book-open-variant: Apri la dispensa della Settimana 6](../../settimana_06/index.md){ .md-button }

# Settimana 6 — Domande d'esame del primo round

Questa pagina raccoglie le otto domande del primo round dell'esame orale che riguardano la [Settimana 6](../../settimana_06/index.md). Sono domande sui fondamenti: definizioni, distinzioni, ragionamenti da ricostruire e qualche piccolo calcolo. All'esame hai 30 secondi per leggere la domanda con calma, e poi un minuto e mezzo per rispondere a voce. Gli argomenti sono quelli indicati nel [perimetro d'esame](../../settimana_06/index.md#esame) all'inizio della dispensa.

!!! info "Che cosa significa «risposta attesa»"
    Sotto ogni domanda trovi la risposta attesa. «Attesa» non significa che devi rispondere esattamente con quelle parole, né nello stesso ordine. Significa che una risposta corretta contiene quelle idee principali, perché sono loro a sostenerla. Puoi usare parole tue, un esempio diverso o un altro ordine: conta che le idee ci siano e che siano giuste.

Per studiare conviene provare prima a rispondere da soli, a voce e senza guardare, come si farebbe all'esame. Solo dopo si apre la risposta attesa e si controlla quali idee mancavano. Per questo le risposte sono chiuse: si aprono con un clic sul titolo.

La sezione [Domande d'esame](../index.md) raccoglie anche le domande delle altre settimane e spiega come è fatto il secondo round.

Ogni domanda ha un codice. Per esempio, S6-R1-07 indica la settimana 6, il primo round e la domanda numero 7.

## Le domande

### S6-R1-01 · Variabili discrete e variabili continue {: #s6-r1-01 }

Che differenza c'è tra una variabile aleatoria discreta e una variabile aleatoria continua? Come si calcola, nei due casi, la probabilità che la variabile cada tra due valori?

??? success "Risposta attesa"
    Una variabile discreta assume valori separati, che si possono elencare, come il numero di richieste che arrivano a un server in un minuto: 0, 1, 2, e così via. Una variabile continua è il modello che usiamo per grandezze che possono variare di quantità piccole quanto si vuole, come il tempo di risposta del server: i suoi valori possibili riempiono un intervallo. Nel caso discreto la distribuzione si descrive con la PMF, che assegna un peso a ogni valore, e la probabilità di cadere tra due valori è la somma dei pesi dei valori compresi tra i due. Nel caso continuo la distribuzione si descrive con una densità, e la probabilità di cadere tra due valori è l'area sotto la densità tra quei due valori. Passando dal discreto al continuo, la somma dei pesi diventa un'area.

### S6-R1-02 · La densità {: #s6-r1-02 }

Che cos'è una densità di probabilità? Può avere valori maggiori di 1?

??? success "Risposta attesa"
    La densità $f$ è la derivata della probabilità, più precisamente della probabilità accumulata fino a $x$, cioè della funzione di ripartizione $F(x)=P(X\le x)$. In ogni punto dice quanto rapidamente sta cambiando la probabilità nell'intorno di quel punto: dove la densità è alta la probabilità cresce in fretta, e un intervallo stretto ne contiene molta. Il valore $f(x)$ non è quindi una probabilità, ma la velocità con cui la probabilità cresce, e può superare 1. Per esempio, nella distribuzione uniforme sull'intervallo da 0 a 0,5 la probabilità accumulata sale da 0 a 1 in un tratto lungo 0,5, quindi cresce con velocità 2: la densità vale 2. Poiché la probabilità accumulata non scende mai e in tutto sale da 0 a 1, la densità non è mai negativa e l'area totale sotto la sua curva vale 1.

### S6-R1-03 · La funzione di ripartizione {: #s6-r1-03 }

Definisci la funzione di ripartizione, e mostra come la usi per calcolare la probabilità che $X$ stia sotto una soglia, sopra una soglia o tra due soglie.

??? success "Risposta attesa"
    La funzione di ripartizione è $F(x)=P(X\le x)$: l'area sotto la densità a sinistra di $x$. Cresce da 0 a 1. Sotto la soglia $a$: $P(X\le a)=F(a)$. Sopra la soglia $a$: $P(X>a)=1-F(a)$. Tra due soglie: $P(a<X\le b)=F(b)-F(a)$.

### S6-R1-04 · Nessuna zona privilegiata {: #s6-r1-04 }

$X$ ha distribuzione uniforme sull'intervallo $[a,b]$. Da che cosa dipende la probabilità che $X$ cada in un intervallo contenuto in $[a,b]$? Perché non esiste una distribuzione uniforme su tutta la retta reale?

??? success "Risposta attesa"
    Dipende soltanto dalla lunghezza dell'intervallo, e non da dove si trova. Distribuzione uniforme vuol dire che nessuna zona di $[a,b]$ è privilegiata: la densità ha la stessa altezza in tutti i punti tra $a$ e $b$ e vale zero fuori, quindi il suo grafico è un rettangolo. La probabilità di un intervallo contenuto in $[a,b]$ è l'area di un rettangolo più piccolo, con la stessa altezza: è la lunghezza dell'intervallo divisa per la lunghezza totale $b-a$. Due intervalli della stessa lunghezza hanno quindi la stessa probabilità, in qualunque punto di $[a,b]$ si trovino. Su tutta la retta, invece, il rettangolo avrebbe una base infinita: con un'altezza positiva l'area sarebbe infinita, con altezza zero sarebbe zero, e in nessun caso varrebbe 1. Per questo non si può scegliere «uniformemente a caso» un numero reale qualsiasi.

### S6-R1-05 · Dall'attesa al conteggio {: #s6-r1-05 }

Gli eventi arrivano secondo il modello di Poisson, con tasso $\lambda$. Chiamiamo $T$ il tempo di arrivo del primo evento. Ricava $P(T>t)$.

??? success "Risposta attesa"
    Chiamiamo $X_t$ il numero di eventi nell'intervallo da 0 a $t$. Il primo evento arriva dopo il tempo $t$ se e solo se in quell'intervallo non arriva nessun evento: $\{T>t\}$ e $\{X_t=0\}$ sono lo stesso evento, quindi $P(T>t)=P(X_t=0)$. Con un tasso di $\lambda$ eventi per unità di tempo, nell'intervallo arrivano in media $\lambda t$ eventi, e $X_t$ ha distribuzione di Poisson con parametro $\lambda t$: $P(X_t=k)=e^{-\lambda t}\frac{(\lambda t)^k}{k!}$. Per $k=0$ si ha $(\lambda t)^0=1$ e $0!=1$, quindi resta $P(X_t=0)=e^{-\lambda t}$. Dunque $P(T>t)=e^{-\lambda t}$.

### S6-R1-06 · L'attesa media non è una scadenza {: #s6-r1-06 }

Le richieste a un server arrivano secondo il modello di Poisson, in media 2 al minuto. Quanto tempo passa in media tra una richiesta e la successiva? Un collega conclude: «Allora la prossima richiesta arriva quasi sempre entro questa attesa media». Ha ragione? Scrivi il conto che ti serve, senza svolgerlo.

??? success "Risposta attesa"
    Il tasso è $\lambda=2$ richieste al minuto, e l'attesa media è il suo reciproco, $1/\lambda$: mezzo minuto, cioè 30 secondi. Se arrivano due richieste al minuto, in media ne arriva una ogni 30 secondi. Il collega però sbaglia. La prossima richiesta arriva dopo 30 secondi se in quei 30 secondi non arriva nessuna richiesta. Il numero di richieste in mezzo minuto ha distribuzione di Poisson con parametro $\lambda t=2\cdot\frac12=1$, quindi la probabilità di zero richieste è $e^{-1}$, circa 0,37: più di una volta su tre si aspetta più della media. Il risultato non dipende dal tasso, perché la probabilità di superare l'attesa media è sempre $e^{-\lambda\cdot\frac1\lambda}=e^{-1}$. La media non è una scadenza: molte attese sono brevi, ma alcune sono lunghe, e anche queste entrano nella media.

### S6-R1-07 · La campana e i suoi parametri {: #s6-r1-07 }

Nel grafico della densità di una distribuzione normale, che cosa caratterizzano della campana $\mu$ e $\sigma$, e come si riconoscono? Che cosa dice la regola 68–95–99,7?

??? success "Risposta attesa"
    $\mu$ è la posizione del vertice della campana: il punto in cui la densità è più alta e l'asse di simmetria della curva. Per la simmetria è anche la media. Cambiare $\mu$ sposta la campana a destra o a sinistra, senza deformarla. $\sigma$, la deviazione standard, caratterizza la larghezza della campana. Si riconosce nei punti $\mu-\sigma$ e $\mu+\sigma$, dove la curva smette di curvarsi verso il basso e comincia a curvarsi verso l'alto: $\sigma$ è la distanza di questi due punti di flesso dal centro. Se $\sigma$ cresce la campana si allarga e, perché l'area resti 1, si abbassa. La regola dice che circa il 68% dei valori cade entro una deviazione standard dalla media, circa il 95% entro due e circa il 99,7% entro tre. Sul grafico sono le aree sotto la campana tra $\mu-\sigma$ e $\mu+\sigma$, tra $\mu-2\sigma$ e $\mu+2\sigma$, e tra $\mu-3\sigma$ e $\mu+3\sigma$.

### S6-R1-08 · Standardizzare {: #s6-r1-08 }

Che cos'è la standardizzazione, e perché basta una sola tabella per tutte le distribuzioni normali? Esempio: $X$ è normale con $\mu=100$ e $\sigma=15$; calcola $P(X\le 130)$.

??? success "Risposta attesa"
    Standardizzare significa costruire, a partire da $X$, una nuova variabile aleatoria, $Z=(X-\mu)/\sigma$, che ha un significato preciso: racconta di quante deviazioni standard $X$ si allontana dalla sua media, sopra la media se $Z$ è positiva e sotto se è negativa. Per esempio, $Z=2$ vuol dire che $X$ è caduta due deviazioni standard sopra la media. Misurare le distanze dalla media in deviazioni standard è dunque l'effetto della standardizzazione, che consiste nel costruire la nuova variabile. Se $X$ ha distribuzione normale, anche $Z$ ce l'ha, con media 0 e deviazione standard 1: è la normale standard, la stessa qualunque siano $\mu$ e $\sigma$. Per questo basta una sola tabella: l'evento $X\le x$ è lo stesso evento di $Z\le(x-\mu)/\sigma$, quindi $P(X\le x)=\Phi\big((x-\mu)/\sigma\big)$. Nell'esempio $Z=(X-100)/15$, e 130 dista 30 dalla media, cioè 2 deviazioni standard: $P(X\le 130)=P(Z\le 2)=\Phi(2)\approx 0{,}977$.

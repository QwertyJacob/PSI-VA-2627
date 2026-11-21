---
description: Le otto domande del primo round dell'esame orale sulla Settimana 7, ciascuna con le idee che una risposta corretta deve contenere.
---

[:material-book-open-variant: Apri la dispensa della Settimana 7](../../settimana_07/index.md){ .md-button }

# Settimana 7 — Domande d'esame del primo round

Questa pagina raccoglie le otto domande del primo round dell'esame orale che riguardano la [Settimana 7](../../settimana_07/index.md). Sono domande sui fondamenti: definizioni, distinzioni, ragionamenti da ricostruire e qualche piccolo calcolo. All'esame hai 30 secondi per leggere la domanda con calma, e poi un minuto e mezzo per rispondere a voce. Gli argomenti sono quelli indicati nel [perimetro d'esame](../../settimana_07/index.md#esame) all'inizio della dispensa.

!!! info "Che cosa significa «risposta attesa»"
    Sotto ogni domanda trovi la risposta attesa. «Attesa» non significa che devi rispondere esattamente con quelle parole, né nello stesso ordine. Significa che una risposta corretta contiene quelle idee principali, perché sono loro a sostenerla. Puoi usare parole tue, un esempio diverso o un altro ordine: conta che le idee ci siano e che siano giuste.

Per studiare conviene provare prima a rispondere da soli, a voce e senza guardare, come si farebbe all'esame. Solo dopo si apre la risposta attesa e si controlla quali idee mancavano. Per questo le risposte sono chiuse: si aprono con un clic sul titolo.

La sezione [Domande d'esame](../index.md) raccoglie anche le domande delle altre settimane e spiega come è fatto il secondo round.

Ogni domanda ha un codice. Per esempio, S7-R1-07 indica la settimana 7, il primo round e la domanda numero 7.

## Le domande

### S7-R1-01 · La distribuzione congiunta {: #s7-r1-01 }

Che cos'è la distribuzione congiunta di due variabili aleatorie discrete $X$ e $Y$? Che cosa significa la virgola in $P(X=4,\;Y=3)$? Fai l'esempio di due dadi.

??? success "Risposta attesa"
    La distribuzione congiunta assegna una probabilità a ogni coppia di valori: la PMF congiunta è $p_{X,Y}(x,y)=P(X=x,\;Y=y)$, e si scrive come una tabella con una casella per ogni coppia. La virgola si legge «e»: $P(X=4,\;Y=3)$ è la probabilità dell'intersezione dei due eventi $\{X=4\}$ e $\{Y=3\}$. Con due dadi equilibrati lanciati indipendentemente, $X$ è il risultato del primo e $Y$ quello del secondo. Le coppie di risultati sono 36, tutte equiprobabili, e ogni casella vale 1/36: in particolare $P(X=4,\;Y=3)=1/36$. La tabella contiene l'informazione completa sulle due variabili, perché qualunque domanda su $X$ e $Y$ insieme si risolve con le sue caselle.

### S7-R1-02 · Controllare una tabella congiunta {: #s7-r1-02 }

Quali controlli fai per sapere se una tabella di numeri è una distribuzione congiunta di probabilità? Perché le caselle devono sommare a 1?

??? success "Risposta attesa"
    I controlli sono due: tutte le caselle devono essere maggiori o uguali a zero, e la loro somma deve valere 1. La somma deve valere 1 perché le caselle sono eventi a due a due incompatibili, dato che una coppia di valori esclude tutte le altre, ed esaustivi, perché qualunque esito cade in qualche casella. Le caselle formano quindi una partizione dello spazio campionario, e per l'additività la somma delle loro probabilità è la probabilità dell'evento certo, cioè 1. In pratica si sommano le caselle riga per riga, o colonna per colonna, e poi si sommano i risultati.

### S7-R1-03 · Le distribuzioni marginali {: #s7-r1-03 }

Che cosa sono le distribuzioni marginali, e come si ricavano dalla tabella congiunta? Quale teorema stai usando?

??? success "Risposta attesa"
    La distribuzione marginale di $X$ è la distribuzione di $X$ presa da sola, senza guardare $Y$, e lo stesso vale per $Y$. Si ricava sommando la tabella: $p_X(x)=\sum_y p_{X,Y}(x,y)$, cioè si fissa il valore $x$ e si somma su tutti i valori dell'altra variabile; per $Y$ si fa il contrario. Si chiamano marginali perché si scrivono nei margini della tabella. È il teorema della probabilità totale: gli eventi $\{Y=y\}$ formano una partizione, perché $Y$ assume uno e un solo valore, e $P(X=x)$ è la somma delle probabilità delle intersezioni $\{X=x\}\cap\{Y=y\}$. Per non scambiare i due margini conviene chiedersi quale variabile resta fissa mentre si somma: è quella di cui si sta calcolando la marginale.

### S7-R1-04 · Variabili aleatorie indipendenti {: #s7-r1-04 }

Quando due variabili aleatorie discrete $X$ e $Y$ sono indipendenti? Che cosa vuol dire, in termini di probabilità condizionata?

??? success "Risposta attesa"
    $X$ e $Y$ sono indipendenti se $p_{X,Y}(x,y)=p_X(x)\,p_Y(y)$ per tutti i valori $x$ e $y$: ogni casella della tabella congiunta è il prodotto dei due margini che le stanno di fronte. Equivale a dire che ogni evento $\{X=x\}$ è indipendente da ogni evento $\{Y=y\}$. In termini di condizionate, $P(X=x\mid Y=y)=P(X=x,\;Y=y)/P(Y=y)=P(X=x)$: sapere quanto vale $Y$ non cambia la distribuzione di $X$. Nella tabella, ogni riga divisa per il suo totale ha lo stesso profilo della marginale di $X$. Esempio: i risultati di due dadi lanciati separatamente, per cui ogni casella vale 1/36 = 1/6 · 1/6.

### S7-R1-05 · Una casella vuota {: #s7-r1-05 }

In una tabella congiunta una casella vale zero, ma i due margini che le stanno di fronte sono positivi. Che cosa concludi sull'indipendenza? Fai un esempio.

??? success "Risposta attesa"
    Le variabili sono dipendenti. Se fossero indipendenti, la casella sarebbe il prodotto dei due margini, che è positivo, mentre vale zero. Una casella vuota con entrambi i margini pieni è il controesempio più rapido. Esempio: lanciamo due dadi, e chiamiamo $X$ il risultato del primo e $S$ la somma dei due. La casella $X=1$, $S=12$ vale zero, perché con un 1 sul primo dado la somma non può arrivare a 12, mentre i margini sono $P(X=1)=1/6$ e $P(S=12)=1/36$, con prodotto 1/216. Anche l'intuizione lo conferma: sapere che $X=1$ rende impossibile $S=12$, quindi cambia la sua probabilità.

### S7-R1-06 · La formula di calcolo {: #s7-r1-06 }

Scrivi la formula di calcolo della covarianza. $X$ e $Y$ valgono 0 o 1, con $P(X=1)=0{,}4$, $P(Y=1)=0{,}5$ e $P(X=1,\;Y=1)=0{,}3$: quanto vale la covarianza?

??? success "Risposta attesa"
    $\operatorname{Cov}(X,Y)=\mathbb{E}[XY]-\mu_X\,\mu_Y$: la media del prodotto meno il prodotto delle medie. Per una variabile che vale 0 o 1 la media è la probabilità di valere 1, quindi $\mu_X=0{,}4$ e $\mu_Y=0{,}5$. Il prodotto $XY$ vale 1 solo quando entrambe le variabili valgono 1, quindi $\mathbb{E}[XY]=P(X=1,\;Y=1)=0{,}3$. La covarianza è 0,3 − 0,4 · 0,5 = 0,3 − 0,2 = 0,1.

### S7-R1-07 · Il coefficiente di correlazione {: #s7-r1-07 }

Definisci il coefficiente di correlazione. Tra quali valori sta, e che cosa significano i valori estremi? Calcolalo con $\sigma_X=2$, $\sigma_Y=5$ e $\operatorname{Cov}(X,Y)=-6$.

??? success "Risposta attesa"
    $\rho(X,Y)=\operatorname{Cov}(X,Y)/(\sigma_X\,\sigma_Y)$: la covarianza divisa per il prodotto delle due deviazioni standard. Le unità di misura si cancellano, e $\rho$ è un numero puro, che sta sempre tra −1 e 1. Vale 1 quando, e solo quando, $Y=aX+b$ con $a>0$: i punti stanno tutti su una retta che sale. Vale −1 quando $Y=aX+b$ con $a<0$: i punti stanno su una retta che scende. Vicino a zero, i punti non tendono a disporsi lungo una retta. Nell'esempio $\rho=-6/(2\cdot5)=-0{,}6$: un legame lineare moderato e negativo, cioè a valori di $X$ sopra la media tendono a corrispondere valori di $Y$ sotto la media.

### S7-R1-08 · Indipendenti, quindi incorrelate {: #s7-r1-08 }

Perché due variabili indipendenti hanno covarianza zero?

??? success "Risposta attesa"
    Per variabili indipendenti la media del prodotto è il prodotto delle medie: $\mathbb{E}[XY]=\mu_X\,\mu_Y$. La formula di calcolo della covarianza è proprio la differenza tra queste due quantità, $\operatorname{Cov}(X,Y)=\mathbb{E}[XY]-\mu_X\mu_Y$, che quindi vale zero; con la covarianza è zero anche la correlazione. Per esempio, con due dadi lanciati indipendentemente $\mathbb{E}[XY]=12{,}25=3{,}5\cdot3{,}5$, e la covarianza è zero. Il ragionamento va in un verso solo: dall'indipendenza segue la covarianza nulla, ma una covarianza nulla non garantisce l'indipendenza.

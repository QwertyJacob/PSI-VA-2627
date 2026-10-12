# Settimana 4 — Huygens e il prezzo equo: il valore atteso e la linearità

<style>
@media screen {
  .md-typeset .md-typeset__scrollwrap { overflow-x: auto; max-width: 100%; }
  .md-typeset div.arithmatex { overflow-x: auto; max-width: 100%; }
  .md-typeset mjx-assistive-mml { max-width: 100%; }
}
</style>

*Quanto vale qualcosa che non conosciamo ancora? Dai giochi interrotti al numero medio di collisioni in un programma.*

[:material-presentation: Apri Slide della Lezione](slides/index.html){ .md-button .md-button--primary target="_blank" }

## Prima di cominciare: dalle coppie ai numeri {: #prima-di-cominciare }

La settimana scorsa abbiamo imparato a contare finali possibili. Questa settimana cambiamo domanda: non soltanto **«con quale probabilità succede?»**, ma anche **«quanto vale, in media, ciò che succede?»**.

Ci servono tre strumenti già incontrati: sommare le probabilità di eventi disgiunti, moltiplicare le probabilità di prove indipendenti e contare le scelte senza ordine con il coefficiente binomiale. Se vuoi riprenderli, trovi il percorso nella [Settimana 3](../settimana_03/index.md).

Ripartiamo da una domanda rimasta aperta. **Quante coppie si possono formare tra 23 persone?** Una coppia contiene due persone distinte e non ha un ordine: Ada con Bruno è la stessa coppia di Bruno con Ada. Le scelte ordinate sono $23\cdot22$; ogni coppia è stata contata due volte. Perciò:

$$
\binom{23}{2}=\frac{23\cdot22}{2}=253.
$$

Ora immagina di dover inserire **23 chiavi distinte** in una tabella hash. Tra queste chiavi esistono $\binom{23}{2}=253$ coppie possibili. Una funzione hash assegna a ogni chiave un indice di casella: per ciascuna coppia possiamo quindi verificare se le due chiavi ricevono lo stesso indice, producendo una **collisione**, già descritta nella [Settimana 3, sezione sulle tabelle hash](../settimana_03/index.md#hash).

Per ora fermiamoci al conteggio. Sapere quante coppie esistono non dice quante finiranno nella stessa casella. Dobbiamo distinguere una quantità deterministica, **il numero di coppie possibili**, da una quantità incerta, **il numero di coppie che collidono**. È proprio per parlare della seconda che costruiremo gli strumenti di questa settimana.

!!! info "Come leggere questa dispensa"
    Gli Atti I–V formano il percorso principale: variabili aleatorie, valore atteso, indicatrici, linearità e Binomiale. Seguono tre letture: varianza, giochi equi e campionamento senza reinserimento. I giochi equi e l'Ipergeometrica sono approfondimenti fuori dal nucleo d'esame orale. La varianza qui introduce il linguaggio della dispersione; le sue applicazioni saranno riprese nelle prossime settimane.

## Atto I — Vendere una possibilità: la domanda di Huygens {: #huygens }

Nella partita interrotta della settimana scorsa, un giocatore non possiede ancora la posta: possiede una possibilità di vincerla. Se volesse cedere il proprio posto a un'altra persona, quale prezzo dovrebbe chiedere?

Chiamiamo **valore equo** di questa possibilità il prezzo che coincide con il pagamento medio previsto dal modello. Se qualcuno acquista la possibilità a quel prezzo, il suo guadagno netto medio — pagamento ricevuto meno prezzo pagato — è zero. «Equo» ha quindi un significato matematico: non garantisce che in una singola partita chi compra riceva proprio quella somma.

**Christiaan Huygens**, nel *De ratiociniis in ludo aleae*, pubblicato in latino nel **1657**, tratta proprio il valore di una possibilità di guadagno. L'introduzione considera anche la vendita del posto di un giocatore. La Proposizione I afferma che, se un gioco assegna con uguale probabilità uno di due premi, il valore equo del gioco è la media dei due premi. Se i premi sono $a$ e $b$, tale valore è

$$
\frac{a+b}{2}.
$$

Per esempio, una possibilità equiprobabile di ricevere 10 euro oppure 30 euro ha valore equo 20 euro. La Proposizione III passa a casi nei quali i risultati hanno probabilità diverse. La [traduzione inglese del 1714, disponibile a Dartmouth](https://math.dartmouth.edu/~doyle/docs/huygens/huygens/), permette di leggere questi passaggi. Qui li esprimeremo con il linguaggio moderno delle variabili aleatorie: non è la notazione usata da Huygens.

Partiamo da un gioco inventato per questa dispensa. Una moneta onesta decide il pagamento: **0 euro** se esce croce, **10 euro** se esce testa. Non paghiamo ancora un biglietto; stiamo considerando soltanto quanto si riceve alla fine.

Quanto vale questa possibilità? I due pagamenti hanno lo stesso peso. La media pesata è:

$$
0\cdot\frac12+10\cdot\frac12=0+5=5\text{ euro}.
$$

I 5 euro non sono un terzo premio nascosto. Quando giochi ricevi 0 oppure 10. Quel numero descrive il **valore medio del pagamento nel modello**, e sarà il prezzo che rende nullo il guadagno netto medio di chi acquista il biglietto.

Questo non obbliga ogni persona a pagare 5 euro. Chi teme di perdere denaro può preferire una somma certa; chi non può permettersi una perdita può rifiutare il gioco. Il prezzo equo di cui parliamo è un criterio matematico sul guadagno medio, non una prescrizione sulle preferenze personali.

**La domanda guida è questa:** possiamo dare un significato preciso a quel 5 e usarlo anche quando i risultati non sono soldi, ma confronti, errori o collisioni?

## Atto II — Dagli esiti ai numeri {: #variabili }

### 1. Una variabile aleatoria è una regola di lettura {: #definizione-variabile }

Lanciamo una moneta due volte. Scriviamo $T$ per testa e $C$ per croce. L'esito completo può essere $TT$, $TC$, $CT$ oppure $CC$. Questi quattro esiti formano lo **spazio campionario**, indicato con $\Omega$.

Se il nostro interesse è il numero di teste, associamo un numero a ogni esito:

| Esito completo | $TT$ | $TC$ | $CT$ | $CC$ |
|---|---|---|---|---|
| Numero di teste | 2 | 1 | 1 | 0 |

Chiamiamo **$X$** questa regola. La lettera maiuscola indica la variabile; una lettera minuscola come $x$ indicherà un valore che essa può assumere. Se l'esito è $TC$, scriviamo $X(TC)=1$.

Una **variabile aleatoria** è una funzione che associa un numero reale a ciascun esito dell'esperimento:

$$
X:\Omega\longrightarrow\mathbb{R}.
$$

Il simbolo $\mathbb{R}$ indica l'insieme dei numeri reali. Qui lavoriamo con variabili **discrete**: i loro valori possibili si possono elencare in una lista finita o numerabile. I nostri esempi principali hanno liste finite. In uno spazio campionario finito, ogni regola numerica come quella della tabella definisce una variabile aleatoria.

L'aleatorietà non sta nella regola: la regola è fissata. Sta nell'esito che non conosciamo prima dell'esperimento. Dopo aver visto $TC$, il numero di teste non è più incerto.

<figure markdown="0">
<svg viewBox="0 0 560 225" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="La variabile X associa TT a 2, TC e CT a 1, CC a 0. Due esiti diversi confluiscono nello stesso valore 1.">
<defs><marker id="s04-mappa-freccia" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="currentColor"/></marker></defs>
<g fill="currentColor" text-anchor="middle"><text x="115" y="22" font-weight="bold">Esiti</text><text x="420" y="22" font-weight="bold">Valori di X</text><text x="115" y="60">TT</text><text x="115" y="103">TC</text><text x="115" y="146">CT</text><text x="115" y="189">CC</text></g>
<g stroke="currentColor" fill="none" marker-end="url(#s04-mappa-freccia)"><path d="M150 56L387 56"/><path d="M150 99L387 121"/><path d="M150 142L387 125"/><path d="M150 185L387 185"/></g>
<g fill="#4051b5"><circle cx="420" cy="56" r="20"/><circle cx="420" cy="123" r="20"/><circle cx="420" cy="185" r="20"/></g>
<g fill="#fff" text-anchor="middle" font-weight="bold"><text x="420" y="61">2</text><text x="420" y="128">1</text><text x="420" y="190">0</text></g>
<text x="280" y="221" text-anchor="middle" fill="currentColor">Contare le teste raggruppa TC e CT.</text>
</svg>
<figcaption>La variabile conserva il numero di teste e dimentica l'ordine dei lanci.</figcaption>
</figure>

### 2. Il valore non è la sua probabilità {: #eventi-valori }

Quanto vale $P(X=1)$? L'espressione $X=1$ identifica un **evento**: tutti gli esiti ai quali la regola assegna il numero 1. Nel nostro caso sono $TC$ e $CT$.

Se i lanci sono indipendenti e la moneta è onesta, ciascuna sequenza ha probabilità $1/4$. Gli esiti $TC$ e $CT$ sono disgiunti, quindi sommiamo:

$$
P(X=1)=P(\{TC,CT\})=\frac14+\frac14=\frac12.
$$

Il numero **1** conta teste. Il numero **$1/2$** misura una probabilità. Tenerli distinti è essenziale: un costo può valere 200 euro, ma nessuna probabilità può valere 200.

### 3. La funzione di massa: una tabella dei pesi {: #pmf }

Raccogliamo i valori possibili di $X$ e le loro probabilità:

| Valore $x$ | 0 | 1 | 2 |
|---|---|---|---|
| Probabilità $P(X=x)$ | $1/4$ | $1/2$ | $1/4$ |

Questa tabella è la **distribuzione di probabilità** di $X$. La funzione che associa a ogni valore $x$ la sua probabilità si chiama **funzione di massa di probabilità**, abbreviata **PMF** dall'inglese *probability mass function*. La indichiamo con $p_X$:

$$
p_X(x)=P(X=x),\qquad p_X(x)\ge0,\qquad \sum_x p_X(x)=1.
$$

Il pedice $X$ ricorda di quale variabile stiamo parlando. Il simbolo $\sum_x$ significa: somma su tutti i valori possibili di $X$. Le probabilità sono non negative e la loro somma è 1 perché, a esperimento concluso, $X$ assume uno e uno solo di quei valori. Fuori dalla lista, $p_X(x)=0$.

La tabella permette anche di rispondere a domande che coinvolgono più valori. **Almeno una testa** significa $X=1$ oppure $X=2$:

$$
P(X\ge1)=p_X(1)+p_X(2)=\frac12+\frac14=\frac34.
$$

In generale, se $D$ è un insieme di valori che ci interessano:

$$
P(X\in D)=\sum_{x\in D}p_X(x).
$$

Perché possiamo sommare queste probabilità? Una variabile aleatoria è una funzione: può assegnare lo stesso numero a esiti diversi, ma assegna **un solo numero a ciascun esito**. Perciò, se $x\ne y$, gli eventi $\{X=x\}$ e $\{X=y\}$ sono **incompatibili**: nessun esito può appartenere a entrambi. Gli eventi corrispondenti ai singoli valori di $X$ sono quindi a due a due disgiunti.

Dire $X\in D$ significa che **$X$ assume uno dei valori contenuti in $D$**. Per esempio, se $D=\{1,2\}$, l'evento $\{X\in D\}$ significa «$X=1$ oppure $X=2$»: si verifica quando si verifica uno di questi due eventi. Poiché sono incompatibili, la sua probabilità è $P(X=1)+P(X=2)$. Lo stesso ragionamento vale per un insieme $D$ qualsiasi: sommiamo le probabilità dei singoli valori contenuti in $D$.

Non stiamo introducendo una nuova regola della probabilità: stiamo riscrivendo l'additività per eventi disgiunti nel linguaggio dei numeri.

**Fermiamoci un momento.** L'esperimento produce un esito. La variabile legge quell'esito e produce un numero. La PMF dice quanto peso probabilistico riceve ciascun numero. Sono tre oggetti diversi, e ciascuno svolge un compito preciso.

## Atto III — Il valore atteso: pesare i risultati {: #valore-atteso }

### 4. Perché la media semplice non basta {: #media-pesata }

Consideriamo un pagamento $X$ che vale 0 euro con probabilità $3/4$ e 8 euro con probabilità $1/4$. Fare $(0+8)/2=4$ tratterebbe i due pagamenti come equiprobabili. Non lo sono: lo zero ha un peso tre volte maggiore.

Per capire da dove vengono i pesi, immaginiamo di giocare 100 partite indipendenti, tutte con queste stesse probabilità, e di annotare la successione dei pagamenti: $0, 8, 0, 0, 0, 8,\ldots$. Supponiamo che, in questa successione, abbiamo osservato 73 pagamenti da 0 euro e 27 da 8 euro. La **media osservata** si ottiene sommando i 100 pagamenti e dividendo per 100:

$$
\frac{73\cdot0+27\cdot8}{100}=2{,}16\text{ euro}.
$$

Riscriviamo lo stesso conto mettendo in evidenza le frequenze relative dei due pagamenti:

$$
0\cdot\frac{73}{100}+8\cdot\frac{27}{100}=2{,}16\text{ euro}.
$$

Ecco come compaiono i pesi: nella media osservata, ogni pagamento è moltiplicato per **la frazione di partite in cui è comparso**. Qui i pesi sono $0{,}73$ e $0{,}27$, vicini alle probabilità $0{,}75$ e $0{,}25$ del modello. I conteggi 73 e 27 sono un esempio possibile, non un risultato garantito: un'altra successione di 100 partite potrebbe dare conteggi diversi.

Le frequenze osservate ci aiutano a capire il ruolo delle probabilità nel modello: un pagamento più frequente contribuisce di più alla media. Per calcolare la media prevista dal modello, sostituiamo alle frequenze osservate $73/100$ e $27/100$ le probabilità $3/4$ e $1/4$:

$$
0\cdot\frac34+8\cdot\frac14=2\text{ euro}.
$$

Questo è il passaggio dalla **media osservata**, che usa le frequenze di una successione di esiti, al **valore atteso**, che usa le probabilità del modello.

Definiamo ora il **valore atteso**, chiamato anche **media** o **speranza matematica**, di una variabile discreta:

$$
\boxed{\mathbb{E}[X]=\sum_x x\,p_X(x).}
$$

La lettera $\mathbb{E}$ indica il valore atteso. Per ogni valore $x$, moltiplichiamo **il valore** per **la sua probabilità**, poi sommiamo tutti i contributi. Se $X$ misura euro, $\mathbb{E}[X]$ misura euro; se conta confronti, la media è espressa in confronti.

Se i valori possibili sono in numero finito, il conto è sempre ben definito. Se sono infiniti, assumiamo, per usare il valore atteso come un numero finito e applicare la linearità, che valga la seguente **ipotesi di valore atteso assoluto finito**:

$$
\mathbb{E}[|X|]=\sum_x |x|\,p_X(x)<\infty.
$$

Qui prendiamo il valore assoluto di ogni risultato **prima** di moltiplicarlo per la sua probabilità e sommare: $\mathbb{E}[|X|]$ non è $|\mathbb{E}[X]|$. La condizione garantisce che la serie che definisce $\mathbb{E}[X]$ converga assolutamente, evitando cancellazioni ambigue tra contributi positivi e negativi. Per una variabile con un numero finito di valori, questa ipotesi è automaticamente soddisfatta.

Riprendiamo il numero di teste nei due lanci:

$$
\mathbb{E}[X]=0\cdot\frac14+1\cdot\frac12+2\cdot\frac14
=0+\frac12+\frac12=1.
$$

I due modi di fare il conto hanno la stessa struttura: pagamenti e teste sono numeri ai quali assegniamo pesi probabilistici.

**Un'altra lettura degli stessi lanci.** Nell'[esercizio 1](#esercizio-1), $Y$ conta i cambi tra il primo e il secondo risultato. $TT$ e $CC$ danno zero cambi, $TC$ e $CT$ un cambio: quindi $P(Y=0)=P(Y=1)=1/2$ e

$$
\mathbb{E}[Y]=0\cdot\frac12+1\cdot\frac12=\frac12.
$$

Non significa che un singolo esperimento produca mezzo cambio: in due lanci osserviamo zero oppure un cambio. Gli stessi esiti possono dunque dare medie diverse quando cambia la variabile che li legge.


### 5. Il baricentro può cadere tra i risultati {: #baricentro }

Lanci un dado onesto e chiami $X$ il numero sulla faccia superiore. Tutti i valori da 1 a 6 pesano $1/6$:

$$
\mathbb{E}[X]=\frac{1+2+3+4+5+6}{6}=\frac{21}{6}=3{,}5.
$$

Il dado non mostra mai 3,5. La media è il **baricentro probabilistico** dei suoi valori, non il prossimo risultato e nemmeno necessariamente il risultato più probabile.

Pensiamo a una barra con due masse: una di peso $3/4$ nel punto 0 e una di peso $1/4$ nel punto 8. Il punto di equilibrio è 2, più vicino alla massa grande. Il calcolo è quello del pagamento precedente.

<figure markdown="0">
<svg viewBox="0 0 560 170" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Una massa di probabilità tre quarti a zero e una massa un quarto a otto si bilanciano nel punto due.">
<path d="M70 95H490" stroke="currentColor" stroke-width="3"/>
<circle cx="70" cy="57" r="30" fill="#4051b5"/><circle cx="490" cy="73" r="17" fill="#e07a1f"/>
<g fill="#fff" text-anchor="middle" font-weight="bold"><text x="70" y="62">3/4</text><text x="490" y="78">1/4</text></g>
<path d="M175 98L157 124H193Z" fill="#2e9e5b"/>
<g fill="currentColor" text-anchor="middle"><text x="70" y="117">0</text><text x="490" y="117">8</text><text x="175" y="147">E[X] = 2</text><text x="280" y="20">Il peso maggiore avvicina il punto di equilibrio.</text></g>
</svg>
<figcaption>Il baricentro è 2, anche se il pagamento sarà soltanto 0 oppure 8.</figcaption>
</figure>

#### Esplora: spostare il peso, lasciare fermi i premi {: #widget-prezzo }

Nel widget $p$ è la probabilità di ricevere 8 euro. La probabilità di ricevere zero è $1-p$. Prima di spostare il cursore, prevedi dove andrà la media. Con $p=0{,}25$ deve valere 2; con $p=0{,}75$ deve valere 6.

<div class="psi-widget" id="s04-prezzo"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  PSIWidget.mount('s04-prezzo', {
    type: 'bar', xLabel: 'Pagamento x (euro)', yLabel: 'P(X = x)',
    xDomain: [0, 8], liveLabel: 'pagamenti possibili',
    fn: function (x, p) { return x === 0 ? 1 - p.p : (x === 8 ? p.p : 0); },
    params: [{key: 'p', label: 'p (probabilità del premio)',
      min: 0, max: 1, step: 0.05, value: 0.25}],
    stats: function (p) { return [{label: 'E[X] (euro)',
      value: (8 * p.p).toFixed(2)}]; },
    caption: 'Le barre sono probabilità. La media è il numero mostrato sotto: non è una terza barra.'
  });
});
</script>

### 6. Laboratorio: calcolare il valore atteso passo per passo {: #lab-pmf }

Portiamo in Python il conto che abbiamo appena fatto a mano. Consideriamo ancora il gioco che paga **0 euro con probabilità $3/4$** e **8 euro con probabilità $1/4$**. Vogliamo ottenere:

$$
\mathbb{E}[X]=0\cdot\frac34+8\cdot\frac14=2\text{ euro}.
$$

Il programma deve conoscere due cose: **quali valori sono possibili** e **con quale probabilità si presenta ciascuno**. Vediamo come scrivere questi dati e come usarli nel calcolo.

#### Passo 1 — Scrivere la tabella delle probabilità in Python

La tabella del gioco è questa:

| Pagamento (euro) | Probabilità |
|---|---|
| 0 | $3/4$ |
| 8 | $1/4$ |

Nel codice rappresentiamo ogni riga con una coppia nella forma `(valore, probabilita)`. Per esempio, `(8, Fraction(1, 4))` significa «il pagamento è 8 euro con probabilità $1/4$». Le parentesi quadre raccolgono le due coppie in una **lista**, che chiamiamo `pagamenti`.

`Fraction(1, 4)` rappresenta esattamente la frazione $1/4$. Per usare `Fraction`, dobbiamo prima importarla dal modulo Python `fractions`. In questo modo anche i controlli sulle probabilità usano frazioni esatte, senza errori di arrotondamento.

Questa lista rappresenta la **distribuzione di probabilità** del pagamento: è la stessa informazione della tabella, scritta in una forma che Python può leggere.

#### Passo 2 — Leggere una coppia alla volta e sommare i contributi

Definiamo una funzione chiamata `media`, così potremo ripetere lo stesso procedimento con distribuzioni diverse. Il suo parametro `distribuzione` riceve la lista su cui lavorare: quando scriviamo `media(pagamenti)`, la funzione usa le coppie contenute in `pagamenti`.

Il ciclo `for valore, probabilita in distribuzione` legge una coppia a ogni passaggio e assegna i suoi due elementi ai nomi `valore` e `probabilita`. Nel nostro gioco:

| Passaggio | `valore` | `probabilita` | Prodotto | Somma dei prodotti fin qui |
|---|---|---|---|---|
| Primo | 0 | $3/4$ | $0\cdot3/4=0$ | 0 |
| Secondo | 8 | $1/4$ | $8\cdot1/4=2$ | 2 |

La funzione tiene aggiornate due somme: `totale_probabilita`, per verificare che i pesi sommino a 1, e `valore_atteso`, per sommare i prodotti. Prima del ciclo entrambe valgono zero.

#### Passo 3 — Eseguire il codice completo

<div class="psi-exec" markdown="1">
```python
from fractions import Fraction

# Ogni coppia contiene (pagamento in euro, probabilità).
pagamenti = [(0, Fraction(3, 4)), (8, Fraction(1, 4))]


def media(distribuzione):
    # Partiamo da zero: non abbiamo ancora letto nessuna coppia.
    totale_probabilita = Fraction(0, 1)
    valore_atteso = Fraction(0, 1)

    for valore, probabilita in distribuzione:
        # assert ferma l'esecuzione se la condizione è falsa.
        assert probabilita >= 0, "Una probabilità non può essere negativa"

        # Aggiungiamo la probabilità corrente a quelle già lette.
        totale_probabilita = totale_probabilita + probabilita

        # Il contributo alla media è il valore moltiplicato per il suo peso.
        contributo = valore * probabilita
        valore_atteso = valore_atteso + contributo

    # Finito il ciclo, controlliamo di avere tutta la probabilità.
    assert totale_probabilita == 1, "Le probabilità devono sommare a 1"

    # Restituiamo a chi ha chiamato la funzione la media calcolata.
    return valore_atteso


# La funzione riceve la lista pagamenti; print mostra il risultato.
print("Pagamento medio:", media(pagamenti), "euro")

# Usiamo la stessa funzione per il numero di teste in due lanci indipendenti
# di una moneta onesta: cambiano i dati, ma il procedimento resta uguale.
teste = [(0, Fraction(1, 4)),
         (1, Fraction(1, 2)),
         (2, Fraction(1, 4))]
print("Numero medio di teste:", media(teste))
```
</div>

Il programma mostra:

```text
Pagamento medio: 2 euro
Numero medio di teste: 1
```

Per il secondo esempio, il conto eseguito dalla funzione è $0\cdot1/4+1\cdot1/2+2\cdot1/4=1$. Non abbiamo dovuto scrivere una nuova funzione: abbiamo passato a `media` una nuova lista di valori e probabilità.

**Che cosa significa il risultato?** Il valore atteso del pagamento è 2 euro, ma in una singola partita si ricevono soltanto 0 oppure 8 euro. Il programma calcola la media prevista dalle probabilità del modello. Per una simulazione, invece, dovremmo generare esiti casuali e fare la media dei pagamenti osservati: lo faremo più avanti.

#### Passo 4 — Modificare i dati e prevedere il risultato

Prima di eseguire ogni modifica, prova a rifare il conto a mano. Lavora sempre a partire dai dati originali di `pagamenti`.

1. **Cambia soltanto il premio da 8 a 12 euro.** La media diventa $0\cdot3/4+12\cdot1/4=3$ euro: cambiano i valori, mentre le probabilità restano uguali.
2. **Mantieni il premio di 8 euro e cambia entrambe le probabilità in $1/2$.** La media diventa $0\cdot1/2+8\cdot1/2=4$ euro: cambiano i pesi assegnati ai valori.
3. **Assegna probabilità $3/4$ a entrambi i pagamenti.** La somma è $3/2$, quindi il programma si ferma con un messaggio di errore. Quei dati non rappresentano una distribuzione di probabilità valida perché non sommano 1. 

Il procedimento da ricordare è: **per ogni valore, calcola valore × probabilità; poi somma tutti i contributi**. La distribuzione descrive i valori possibili e i loro pesi; il valore atteso riassume queste informazioni in un solo numero.

## Atto IV — La linearità: scomporre un conto difficile {: #linearita }

### 7. Sommare le medie, anche quando i risultati dipendono {: #linearita-dipendenza }

Supponiamo che un programma esegua due operazioni consecutive. La prima richiede un numero di confronti che dipende dall'input: indichiamo questo costo con $X$. Anche la seconda ha un costo variabile, che indichiamo con $Y$. Una volta fissato l'input e conclusa l'esecuzione, possiamo contare i confronti delle due operazioni e sommarli. Il costo totale è dunque la variabile $X+Y$.

Fin qui abbiamo descritto il costo di una singola esecuzione. Ora vogliamo conoscere il **costo medio** nel modello probabilistico degli input. Un procedimento possibile sarebbe costruire la distribuzione di $X+Y$ e applicare la definizione di valore atteso. Ma la distribuzione del totale può essere difficile da trovare, soprattutto se le due operazioni lavorano sugli stessi dati e i loro costi dipendono l'uno dall'altro.

La proprietà che studiamo in questa sezione permette di procedere in un altro modo: calcolare separatamente le due medie e poi sommarle. Prima di enunciarla, vediamo perché la dipendenza non è un ostacolo.

Prima vediamo un esempio minuscolo. Lanciamo una sola moneta onesta e associamo a questo esperimento due variabili aleatorie diverse, $X$ e $Y$. Se esce testa, assegniamo $X=1$ e $Y=0$; se esce croce, assegniamo $X=0$ e $Y=1$.

| Esito | Probabilità | $X$ | $Y$ | $X+Y$ |
|---|---|---|---|---|
| Testa | $1/2$ | 1 | 0 | 1 |
| Croce | $1/2$ | 0 | 1 | 1 |

Leggiamo la tabella prima per righe, poi per colonne. In ciascuna riga il totale è 1: qualunque sia l'esito della moneta, una delle due variabili vale 1 e l'altra vale 0. Perciò $X+Y$ è una variabile costante e il suo valore atteso è 1.

Consideriamo ora le variabili separatamente. $X$ vale 1 con probabilità $1/2$ e 0 con probabilità $1/2$, quindi la sua media è $1/2$. Lo stesso vale per $Y$. Otteniamo dunque lo stesso risultato attraverso due percorsi: la media del totale è 1, e la somma delle due medie è $1/2+1/2=1$.

Le due variabili sono **dipendenti**: sapere che $X=1$ ci dice con certezza che $Y=0$. Eppure il conto funziona.

**Non serve che $X+Y=1$, né che la somma sia costante.** Abbiamo scelto così il primo esempio soltanto per rendere immediato il conto. Cambiamo i valori assegnati agli esiti della stessa moneta onesta:

| Esito | Probabilità | $X$ | $Y$ | $X+Y$ |
|---|---|---|---|---|
| Testa | $1/2$ | 2 | 4 | 6 |
| Croce | $1/2$ | 0 | 2 | 2 |

Ora il totale cambia con l'esito: vale 6 oppure 2. Calcolando direttamente la sua media otteniamo:

$$
\mathbb{E}[X+Y]=6\cdot\frac12+2\cdot\frac12=4.
$$

Calcolando invece le medie separatamente:

$$
\mathbb{E}[X]=2\cdot\frac12+0\cdot\frac12=1,
\qquad
\mathbb{E}[Y]=4\cdot\frac12+2\cdot\frac12=3.
$$

La loro somma è ancora $1+3=4$. Anche qui le variabili sono dipendenti: conoscere $X$ determina $Y$. **A sommare a 1 devono essere le probabilità degli esiti, non i valori di $X$ e $Y$.**

Questa proprietà si chiama **linearità del valore atteso**. Se $a$, $b$ e $c$ sono numeri fissati, e $\mathbb{E}[|X|]<\infty$ e $\mathbb{E}[|Y|]<\infty$ (ipotesi automaticamente soddisfatte quando ciascuna variabile ha un numero finito di valori):

$$
\boxed{\mathbb{E}[aX+bY+c]
=a\mathbb{E}[X]+b\mathbb{E}[Y]+c.}
$$

Non occorre che $X$ e $Y$ siano indipendenti. Ponendo $a=b=1$ e $c=0$ ritroviamo $\mathbb{E}[X+Y]=\mathbb{E}[X]+\mathbb{E}[Y]$. La stessa regola si applica a qualunque **somma finita** di variabili.

L'esempio suggerisce la proprietà, ma non la dimostra per tutte le variabili. Per capire perché vale in generale, torniamo agli esiti completi dell'esperimento. Svolgiamo la dimostrazione su uno spazio campionario finito, così tutte le somme contengono un numero finito di termini.

Indichiamo un esito con la lettera greca $\omega$, letta «omega». La scrittura $X(\omega)$ è il valore assegnato da $X$ a quell'esito; $P(\{\omega\})$ è la probabilità che si verifichi proprio quell'esito.

Possiamo calcolare il valore atteso moltiplicando il valore di $X$ per la probabilità di ciascun esito e sommando. È lo stesso conto che abbiamo fatto con la PMF, soltanto organizzato diversamente. Nella PMF raccogliamo prima tutti gli esiti che danno lo stesso valore; qui li teniamo separati. Per esempio, nei due lanci di moneta, il contributo del valore 1 può essere scritto come $1\cdot P(X=1)$ oppure come $1\cdot P(\{TC\})+1\cdot P(\{CT\})$. Il risultato non cambia.

Scriviamo dunque:

$$
\mathbb{E}[X+Y]
=\sum_{\omega\in\Omega}
\bigl(X(\omega)+Y(\omega)\bigr)P(\{\omega\}).
$$

Per ciascun esito, il valore della somma è la somma dei due valori. Distribuiamo il peso sui due addendi:

$$
=\sum_{\omega\in\Omega}
\left[X(\omega)P(\{\omega\})+Y(\omega)P(\{\omega\})\right].
$$

Ora separiamo una somma finita in due somme:

$$
=\sum_{\omega\in\Omega}X(\omega)P(\{\omega\})
+\sum_{\omega\in\Omega}Y(\omega)P(\{\omega\})
=\mathbb{E}[X]+\mathbb{E}[Y].
$$

Fermiamoci sul passaggio decisivo. Abbiamo usato la proprietà distributiva e separato una somma in due somme. In ciascun esito, $X$ e $Y$ possono essere legati anche molto strettamente: questo non cambia l'uguaglianza $X(\omega)+Y(\omega)$ né il peso assegnato a quell'esito.

La formula con i coefficienti si giustifica allo stesso modo. Moltiplicare tutti i valori di $X$ per una costante $a$ moltiplica per $a$ anche la loro media. Aggiungere una costante $c$ a ogni risultato sposta la media di $c$: nella somma pesata il suo contributo è $c\sum_{\omega}P(\{\omega\})=c$. Per questo i coefficienti e il termine costante compaiono nella formula esattamente come nell'espressione iniziale.

Per le variabili discrete con un numero infinito di valori, la proprietà resta valida sotto l'[ipotesi introdotta nella sezione 4](#media-pesata), richiesta **per ciascuna variabile**: $\mathbb{E}[|X|]<\infty$ e $\mathbb{E}[|Y|]<\infty$. La convergenza assoluta giustifica anche in questo caso la separazione della somma in due somme. Per una somma finita di più variabili, la stessa ipotesi va verificata per ogni addendo. Qui useremo la linearità soprattutto per somme finite di conteggi limitati, per i quali la condizione è automaticamente soddisfatta.

Un'applicazione immediata: se $X$ è un pagamento e $c$ il costo fisso del biglietto, il guadagno netto è $X-c$, con media $\mathbb{E}[X]-c$. Torneremo su questa distinzione nella lettura sui giochi equi.

### 8. Le indicatrici: trasformare una domanda in un bit {: #indicatrici }

La linearità diventa particolarmente utile quando vogliamo contare quante volte si verifica una certa proprietà. Per preparare questo metodo, partiamo da una sola domanda: **una richiesta al servizio è fallita oppure no?**

Possiamo registrare la risposta con un numero: 1 se la richiesta è fallita, 0 se è riuscita. L'esperimento resta l'esecuzione della richiesta, con tutti i suoi possibili esiti. La nuova variabile conserva soltanto l'informazione che ci interessa: se si è verificato il fallimento. Si chiama *indicatrice* proprio perché indica la presenza o l'assenza di un evento.

Per un evento $A$, chiamiamo **variabile indicatrice** la variabile $I_A$ definita da:

$$
I_A(\omega)=
\begin{cases}
1,&\text{se }\omega\in A,\\
0,&\text{se }\omega\notin A.
\end{cases}
$$

Il pedice $A$ identifica l'evento che stiamo contando. Puoi leggere $I_A$ come «il bit che segnala se è successo $A$».

Se $p=P(A)$, la sua PMF ha soltanto due valori:

$$
P(I_A=1)=p,\qquad P(I_A=0)=1-p.
$$

Una variabile con questa distribuzione si dice **Bernoulli di parametro $p$**. Scriviamo $I_A\sim\operatorname{Bernoulli}(p)$: il simbolo $\sim$ significa «ha distribuzione». Il nome «successo» per il valore 1 è una convenzione matematica: se stai contando guasti, un «successo» è un guasto registrato.

Calcoliamo la media usando direttamente la definizione:

$$
\mathbb{E}[I_A]
=0\cdot(1-p)+1\cdot p
=p
=P(A).
$$

Il contributo del valore 0 è nullo, mentre moltiplicare per 1 lascia invariata la probabilità. La media di un'indicatrice coincide quindi con la probabilità dell'evento che essa segnala.

Per esempio, se una richiesta fallisce con probabilità $0{,}02$, la media della sua indicatrice è $0{,}02$. In una singola esecuzione registriamo sempre 0 oppure 1: il numero $0{,}02$ descrive la media nel modello, non una frazione di fallimento osservata in quella richiesta.

Ora immaginiamo più richieste e associamo un'indicatrice a ciascuna. Sommando le indicatrici otteniamo il numero totale di richieste fallite, perché ogni fallimento aggiunge 1 e ogni richiesta riuscita aggiunge 0. Applicando la linearità, la media di questo conteggio diventa la somma delle probabilità dei singoli fallimenti. È questo il metodo che useremo nella prossima sezione: **costruire il conteggio come somma di indicatrici e poi calcolarne la media**.

### 9. Una collisione alla volta {: #collisioni }

Torniamo alla domanda sulle tabelle hash posta all'inizio della dispensa. Vogliamo conoscere il numero medio di **coppie di chiavi che ricevono lo stesso indice**. Prima di fare qualsiasi calcolo probabilistico, dobbiamo costruire una variabile che conti proprio queste coppie.

Cominciamo con tre chiavi distinte, chiamate $a$, $b$ e $c$. Le coppie possibili sono $(a,b)$, $(a,c)$ e $(b,c)$. A ciascuna coppia associamo una domanda: le due chiavi finiscono nella stessa casella? Registriamo la risposta con un'indicatrice, che vale 1 se gli indici coincidono e 0 altrimenti. Non stiamo contando le chiavi né le caselle occupate: ogni indicatrice riguarda una coppia precisa.

Chiamiamo questi bit $I_{ab}$, $I_{ac}$ e $I_{bc}$. Il numero $C$ di **coppie in collisione** è:

$$
C=I_{ab}+I_{ac}+I_{bc}.
$$

Per contare le coppie in collisione, sommiamo i tre bit: ogni coppia aggiunge 1 se le sue chiavi finiscono nella stessa casella, e 0 altrimenti. Se tutte le chiavi hanno indici diversi, il totale è 0. Se $a$ e $b$ condividono l'indice e $c$ no, è 1. Se tutte e tre finiscono nella stessa casella, è 3: ci sono tre coppie, anche se la casella occupata è una sola.

**Specifichiamo il modello.** La tabella ha $m$ caselle, con $m$ intero positivo. Per le chiavi considerate, gli indici sono indipendenti e ciascuno è uniforme tra le $m$ caselle. La probabilità che una coppia condivida l'indice è $1/m$: fissato l'indice della prima chiave, soltanto una delle $m$ possibilità per la seconda coincide con esso.

Verifichiamo con calma la probabilità $1/m$. Supponiamo, per esempio, che la prima chiave abbia ricevuto l'indice 7. Poiché l'indice della seconda è indipendente dal primo e uniforme sulle $m$ caselle, la probabilità che sia anch'esso 7 è $1/m$. Lo stesso ragionamento vale per qualunque indice della prima chiave. La probabilità di coincidenza è dunque $1/m$ anche prima di conoscere quell'indice.

Queste sono ipotesi del modello, e vanno distinte dal funzionamento di una specifica funzione hash. Una funzione deterministica applicata a chiavi fissate produce indici fissati. Per parlare di probabilità occorre individuare una sorgente di casualità: per esempio, si può scegliere casualmente la funzione da una famiglia di funzioni. Affermare che gli indici siano indipendenti e uniformi è un'ulteriore ipotesi, che una famiglia concreta deve soddisfare o giustificare. Il calcolo qui riguarda il modello ideale appena dichiarato.

Per le tre chiavi, linearità e media delle indicatrici danno:

$$
\mathbb{E}[C]
=\mathbb{E}[I_{ab}]+\mathbb{E}[I_{ac}]+\mathbb{E}[I_{bc}]
=\frac1m+\frac1m+\frac1m=\frac3m.
$$

Con $n$ chiavi distinte ci sono $\binom n2$ coppie. Se chiamiamo $I_{ij}$ l'indicatrice della collisione tra la chiave $i$ e la chiave $j$, la scrittura $i<j$ ci permette di contare ogni coppia una volta sola:

$$
C=\sum_{1\le i<j\le n}I_{ij}.
$$

La scrittura con la sommatoria ripete esattamente il procedimento delle tre chiavi, anche quando le coppie sono molte. Il vincolo $i<j$ esclude sia le coppie di una chiave con sé stessa sia il doppio conteggio: includiamo $(i,j)$ ma non aggiungiamo anche $(j,i)$.

Per calcolare la media procediamo in tre passaggi. Prima applichiamo la linearità alla somma delle indicatrici. Poi usiamo il fatto che la media di ogni indicatrice è la probabilità della relativa collisione, cioè $1/m$. Infine osserviamo che stiamo sommando lo stesso numero $1/m$ una volta per ciascuna delle $\binom n2$ coppie:

$$
\mathbb{E}[C]
=\sum_{1\le i<j\le n}\mathbb{E}[I_{ij}]
=\sum_{1\le i<j\le n}\frac1m
=\boxed{\frac{\binom n2}{m}}.
$$

Il conto richiede soltanto le probabilità delle singole coppie. L'indipendenza di tutti gli indici è un'ipotesi sufficiente per ottenerle; la formula della media continua a valere se ogni coppia collide con probabilità $1/m$, anche senza indipendenza dell'intero insieme di indici.

### 10. Una media non è la probabilità di «almeno una» {: #media-e-probabilita }

Per 23 persone con compleanni indipendenti e uniformi su 365 giorni, lo stesso conto dà:

$$
\mathbb{E}[C]=\frac{253}{365}\approx0{,}693.
$$

Che cosa significa? **Circa 0,693 coppie con lo stesso compleanno in media**, nel modello. Non significa una probabilità di collisione del 69,3%. La probabilità di almeno una coppia coincidente, calcolata nella [Settimana 3, Atto IV](../settimana_03/index.md#compleanni), è circa 50,7%.

Per capire la differenza, immaginiamo di ripetere l'esperimento su molti gruppi di 23 persone e di annotare due numeri per ogni gruppo. Il primo è $C$, il numero di coppie con lo stesso compleanno. Il secondo è l'indicatrice $J$ dell'evento «c'è almeno una coppia con lo stesso compleanno»: vale 0 se non ci sono coincidenze e 1 se ce n'è almeno una.

In un gruppo senza coincidenze, entrambi i numeri valgono 0. In un gruppo con una sola coppia coincidente, entrambi valgono 1. Ma se tre persone hanno lo stesso compleanno, formano tre coppie: il conteggio $C$ vale almeno 3, mentre $J$ vale ancora soltanto 1. Il primo numero registra **quante coppie** ci sono; il secondo registra soltanto **se ce ne sono**.

Le loro medie rispondono quindi a domande diverse. $\mathbb{E}[C]$ è il numero medio di coppie, mentre $\mathbb{E}[J]=P(C\ge1)$ è la probabilità che il gruppo presenti almeno una coincidenza. Non possiamo sostituire una quantità con l'altra. Poiché per ogni esito $J\le C$, abbiamo anche $P(C\ge1)\le\mathbb{E}[C]$: la media delle coppie fornisce un limite superiore alla probabilità, ma in generale non la determina.

Un caso piccolo mostra anche il limite del metodo. Con tre chiavi in due caselle, $\mathbb{E}[C]=3/2=1{,}5$. Nessuna probabilità può valere 1,5. Inoltre, non si può avere esattamente due coppie in collisione: se $a$ coincide con $b$ e $a$ coincide con $c$, allora coincide anche la terza coppia. Il conteggio $C$ può valere soltanto 1 oppure 3. **Le indicatrici delle coppie non sono mutuamente indipendenti**, anche nel modello con indici indipendenti. La linearità ci risparmia proprio questo problema.

### 11. Laboratorio: contare coppie e contare esperimenti {: #lab-hash }

Nel laboratorio mettiamo a confronto le due quantità della sezione precedente. Una singola prova consiste nell'assegnare un indice a ciascuna delle $n$ chiavi. Ripetiamo poi questa assegnazione molte volte, mantenendo lo stesso modello.

I parametri hanno ruoli distinti: `n` è il numero di chiavi in ogni assegnazione, `m` il numero di caselle e `prove` il numero di assegnazioni che simuliamo. Con `n = 23`, `m = 365` e `prove = 10000`, generiamo diecimila esperimenti, ciascuno con 23 chiavi e 365 caselle.

Nel ciclo, `indici` contiene gli indici di una singola assegnazione. Per calcolare `coppie`, confrontiamo ogni indice con quelli che lo seguono: il vincolo `j > i` conta ciascuna coppia una sola volta. In Python un confronto vero contribuisce 1 a `sum`, mentre un confronto falso contribuisce 0. Il codice esegue quindi proprio la somma delle indicatrici scritta nella sezione 9.

I due accumulatori raccolgono informazioni diverse. `totale_coppie` somma tutti i conteggi osservati; `con_collisione` aumenta di 1 soltanto nelle prove in cui `coppie > 0`. Alla fine dividiamo entrambi per `prove`: otteniamo, rispettivamente, la media osservata delle coppie e la frequenza relativa delle assegnazioni con almeno una collisione.

<div class="psi-exec" markdown="1">
```python
from math import comb, prod
from random import Random

generatore = Random(42)
n, m, prove = 23, 365, 10000
assert n >= 1 and m >= 1 and prove >= 1
totale_coppie = 0
con_collisione = 0

for _ in range(prove):
    # Ogni chiave riceve un indice uniforme, indipendente dagli altri.
    indici = [generatore.randrange(m) for _ in range(n)]
    coppie = sum(indici[i] == indici[j]
                 for i in range(n) for j in range(i + 1, n))
    totale_coppie += coppie
    con_collisione += coppie > 0

# Se n > m, almeno una coppia deve condividere una casella.
p_almeno_una = 1.0 if n > m else 1 - prod(
    (m - i) / m for i in range(n)
)
print(f"Media teorica delle coppie: {comb(n, 2) / m:.4f}")
print(f"Media simulata delle coppie: {totale_coppie / prove:.4f}")
print(f"Probabilità teorica di almeno una: {p_almeno_una:.4f}")
print(f"Frazione simulata con collisione: {con_collisione / prove:.4f}")
```
</div>

Il prodotto usato per la probabilità di nessuna collisione viene dal conto già svolto nella Settimana 3: la prima chiave può occupare qualunque casella; per la seconda ne restano $m-1$ libere, poi $m-2$, e così via. Sottraiamo da 1 per ottenere «almeno una».

Con i parametri iniziali le due misure sono vicine, rispettivamente, a 0,693 e 0,507. Non devono coincidere esattamente con la teoria: la simulazione produce un campione finito. Il seme 42 rende riproducibile l'esperimento. **Una simulazione illustra il risultato; la dimostrazione della media è il conto con le indicatrici.**

Prova `n = 3` e `m = 2`: la frazione con collisione sarà esattamente 1, mentre la media delle coppie sarà vicina a 1,5. Poi aumenta soltanto `prove`: stai cambiando quante volte osservi il modello, non il modello delle singole assegnazioni.

**Il metodo da portare con te:** identifica che cosa conti, scrivilo come somma di bit, calcola la probabilità che ogni bit valga 1, somma. Prima di cercare la distribuzione completa, chiediti se la media basta a rispondere alla tua domanda.

## Atto V — La Binomiale nasce da una somma di bit {: #binomiale }

### 12. Quando un conteggio è binomiale {: #modello-binomiale }

Finora abbiamo usato le indicatrici per calcolare una media senza trovare la distribuzione completa del conteggio. Ora studiamo un caso in cui possiamo ottenere anche quella distribuzione: il conteggio binomiale.

Consideriamo un servizio che esegue quattro operazioni. Nel modello, ciascuna fallisce con probabilità $p=0{,}2$, e gli esiti delle quattro operazioni sono indipendenti. Chiamiamo $X$ il numero totale di fallimenti. Per costruirlo, definiamo $I_i$ come l'indicatrice del fallimento dell'operazione numero $i$, con $i$ da 1 a 4. Se, per esempio, falliscono soltanto la prima e la terza operazione, le indicatrici valgono $1,0,1,0$ e il loro totale è 2.

Per ogni esecuzione:

$$
X=I_1+I_2+I_3+I_4.
$$

La variabile $X$ può valere 0, 1, 2, 3 o 4. Generalizziamo: se abbiamo **$n$ prove**, ciascuna con due esiti, **la stessa probabilità $p$** del valore 1 e **indipendenza tra tutte le prove**, allora il numero totale di successi ha distribuzione **Binomiale di parametri $n$ e $p$**:

$$
X=\sum_{i=1}^{n}I_i,\qquad X\sim\operatorname{Binomiale}(n,p).
$$

La notazione $\sum_{i=1}^n I_i$ è una forma compatta per $I_1+I_2+\cdots+I_n$. Il numero $n$ è un intero positivo; $p$ è compreso tra 0 e 1. Per $n=1$, la Binomiale coincide con una Bernoulli.

Le ipotesi svolgono compiti precisi. Il numero fissato $n$ stabilisce quante prove osserviamo. In ciascuna prova distinguiamo l'evento che vogliamo contare dal suo complemento: possiamo chiamarli successo e insuccesso, anche quando il «successo» è un guasto. La probabilità $p$ deve essere la stessa in tutte le prove. Infine, l'indipendenza deve riguardare l'intera famiglia di prove: conoscere gli esiti delle altre non deve modificare la probabilità di successo di una prova.

Prima di chiamare binomiale un conteggio, dobbiamo verificare queste condizioni nel modello. Se un guasto comune può far fallire tutte le operazioni insieme, l'indipendenza viene meno. Se alcune operazioni hanno probabilità di fallimento diverse, viene meno l'ipotesi di un unico parametro $p$. In entrambi i casi la somma delle indicatrici conta ancora correttamente i fallimenti, ma non possiamo attribuirle automaticamente la distribuzione Binomiale.

### 13. La PMF: contare posizioni, pesare sequenze {: #pmf-binomiale }

Nel caso delle quattro operazioni, vogliamo esattamente due fallimenti. Scriviamo 1 per un fallimento e 0 per un'operazione riuscita. Una sequenza possibile è $1100$.

Per indipendenza, la sua probabilità è:

$$
p\cdot p\cdot(1-p)\cdot(1-p)=p^2(1-p)^2.
$$

Il conto appena fatto riguarda una **sequenza precisa**: falliscono la prima e la seconda operazione, mentre riescono la terza e la quarta. La domanda «esattamente due fallimenti» ammette invece tutte le possibili posizioni dei due fallimenti. Le sequenze sono:

$$
1100,\quad1010,\quad1001,\quad0110,\quad0101,\quad0011.
$$

Sono sei perché dobbiamo scegliere due posizioni tra quattro, senza attribuire un ordine alle posizioni scelte: il numero di scelte è $\binom42$. Ogni sequenza contiene due fallimenti e due operazioni riuscite, quindi, grazie alla probabilità comune $p$ e all'indipendenza, ciascuna ha probabilità $p^2(1-p)^2$.

Inoltre le sequenze sono esiti distinti e incompatibili: una stessa esecuzione non può produrne due diverse. Per trovare la probabilità di esattamente due fallimenti possiamo dunque sommare le sei probabilità uguali:

$$
P(X=2)=6p^2(1-p)^2.
$$

Con $p=0{,}2$ il conto è $6\cdot0{,}04\cdot0{,}64=0{,}1536$.

Per $n$ prove e $k$ successi, dove $k$ è uno degli interi da 0 a $n$, lo stesso ragionamento dà:

$$
\boxed{P(X=k)=\binom nk p^k(1-p)^{n-k}.}
$$

Leggiamo la formula come il risultato di due operazioni. Prima scegliamo **dove** si trovano i $k$ successi: ci sono $\binom nk$ scelte. Poi calcoliamo la probabilità di una di quelle sequenze: moltiplichiamo $k$ fattori uguali a $p$ e $n-k$ fattori uguali a $1-p$. Tutte le sequenze così ottenute hanno la stessa probabilità, e sommando i loro contributi otteniamo la formula.

L'ordine dei risultati rimane importante per descrivere una sequenza, ma la variabile $X$ conserva soltanto il numero di successi. È lo stesso passaggio incontrato con il numero di teste nei due lanci: esiti diversi possono dare lo stesso valore del conteggio.

Per $0<p<1$ la formula si applica direttamente a tutti gli interi $k$ da 0 a $n$; fuori da questo intervallo la probabilità è zero. I casi estremi si comprendono dal modello: se $p=0$, nessuna prova ha successo e $X=0$ con certezza; se $p=1$, tutte hanno successo e $X=n$ con certezza.

### 14. La media: nessuna somma della PMF {: #media-binomiale }

Ora che conosciamo la PMF, potremmo calcolare la media applicando la definizione:

$$
\mathbb{E}[X]=\sum_{k=0}^{n}k\binom nk p^k(1-p)^{n-k}.
$$

Questa espressione è corretta, ma richiede di semplificare una somma con coefficienti binomiali. Per comprendere da dove viene la media, possiamo usare la struttura del conteggio che abbiamo già costruito. $X$ è la somma di $n$ indicatrici, e ciascuna segnala un successo di probabilità $p$.

L'idea è dunque tornare dalle probabilità del totale ai suoi contributi elementari. Applichiamo prima la linearità e poi la formula della media di un'indicatrice:

La usiamo una riga alla volta:

$$
\mathbb{E}[X]
=\mathbb{E}\!\left[\sum_{i=1}^n I_i\right]
=\sum_{i=1}^n\mathbb{E}[I_i].
$$

Il primo passaggio sostituisce a $X$ il suo conteggio per bit; il secondo usa la linearità. Ciascun bit ha media $p$, quindi:

$$
\sum_{i=1}^n\mathbb{E}[I_i]
=\sum_{i=1}^n p
=\boxed{np}.
$$

Nell'esempio delle quattro operazioni, il numero medio di fallimenti è $4\cdot0{,}2=0{,}8$. Il valore 0,8 non è un numero di fallimenti che osserveremo in una singola esecuzione: è il centro pesato del conteggio.

**Dove è servita l'indipendenza?** Per dire che la distribuzione è Binomiale e ricavarne la PMF. **Non** per sommare le medie. Se tutte le operazioni fallissero insieme con probabilità 0,2, ciascun bit avrebbe ancora media 0,2 e il totale avrebbe ancora media 0,8. Ma il totale potrebbe valere soltanto 0 o 4, non avrebbe la PMF appena calcolata.

#### Esplora: stessa media, distribuzioni diverse {: #widget-binomiale }

Il grafico seguente rappresenta il modello con prove indipendenti. Parti da $n=4$, $p=0{,}2$, poi prova $n=8$, $p=0{,}1$: il prodotto $np$ resta 0,8, ma i pesi dei valori cambiano. Le barre oltre $n$ sono zero; sono mostrate per tenere fisso l'asse durante l'esplorazione.

<div class="psi-widget" id="s04-binomiale"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  function massa(k, p) {
    var n = Math.round(p.n);
    if (k > n) return 0;
    if (p.p === 0) return k === 0 ? 1 : 0;
    if (p.p === 1) return k === n ? 1 : 0;
    var coefficiente = 1;
    for (var j = 1; j <= k; j++) coefficiente *= (n - j + 1) / j;
    return coefficiente * Math.pow(p.p, k) * Math.pow(1 - p.p, n - k);
  }
  PSIWidget.mount('s04-binomiale', {
    type: 'bar', xLabel: 'Numero di successi k', yLabel: 'P(X = k)',
    xDomain: [0, 20], liveLabel: 'Binomiale corrente', fn: massa,
    params: [
      {key: 'n', label: 'n (numero di prove)', min: 1, max: 20,
       step: 1, value: 4},
      {key: 'p', label: 'p (probabilità per prova)', min: 0, max: 1,
       step: 0.05, value: 0.2}
    ],
    stats: function (p) { return [{label: 'E[X] = np',
      value: (Math.round(p.n) * p.p).toFixed(2)}]; },
    caption: 'Prima prevedi la media, poi muovi il cursore. Ogni barra pesa un valore intero del conteggio.'
  });
});
</script>

### 15. Laboratorio: indipendenza e dipendenza a confronto {: #lab-binomiale }

Nel laboratorio confrontiamo due servizi con quattro operazioni ciascuno. Per ogni singola operazione la probabilità di fallimento è $0{,}2$ in entrambi i servizi. Ciò che cambia è il modo in cui i fallimenti si presentano insieme.

Nel primo modello ogni operazione ha un esito indipendente dagli altri. Il totale può assumere tutti i valori da 0 a 4 e segue la distribuzione Binomiale. Nel secondo modello un unico evento comune, di probabilità $0{,}2$, fa fallire tutte e quattro le operazioni; quando quell'evento non si verifica, riescono tutte. Il totale può quindi valere soltanto 0 oppure 4, con probabilità rispettivamente $0{,}8$ e $0{,}2$.

Prima di eseguire il codice, possiamo prevedere la media del secondo modello: $0\cdot0{,}8+4\cdot0{,}2=0{,}8$. È la stessa media $np$ del primo. Il grafico ci permetterà di vedere le differenze che questo singolo numero non mostra.

Nel codice, `rng.random((prove, n))` genera una tabella: ogni riga rappresenta un'esecuzione e ogni colonna un'operazione. Il confronto con `p` produce le indicatrici dei fallimenti; `.sum(axis=1)` le somma lungo ogni riga. Nel modello dipendente generiamo invece una sola indicatrice per esecuzione e la moltiplichiamo per `n`: otteniamo 0 oppure 4. Infine `pmf` contiene le probabilità binomiali teoriche, mentre `np.bincount` conta le frequenze dei totali osservati nel modello comune.

<div class="psi-exec" markdown="1">
```python
from math import comb

import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(42)
n, p, prove = 4, 0.2, 20000
# Nel primo modello ogni prova riceve una decisione distinta.
indipendenti = (rng.random((prove, n)) < p).sum(axis=1)
# Nel secondo un solo bit comune accende tutti i fallimenti.
dipendenti = n * (rng.random(prove) < p)
k = np.arange(n + 1)
pmf = np.array([comb(n, int(j)) * p**j * (1 - p)**(n - j)
                for j in k])
assert np.isclose(pmf.sum(), 1)
assert np.isclose(np.dot(k, pmf), n * p)

print(f"Media teorica di entrambi: {n * p:.3f}")
print(f"Media simulata, indipendenti: {indipendenti.mean():.3f}")
print(f"Media simulata, dipendenti: {dipendenti.mean():.3f}")
plt.bar(k - 0.2, pmf, width=0.4, label="Binomiale teorica")
plt.bar(k + 0.2, np.bincount(dipendenti, minlength=n + 1) / prove,
        width=0.4, label="Guasto comune simulato")
plt.xticks(k)
plt.xlabel("Numero di fallimenti")
plt.ylabel("Probabilità / frequenza relativa")
plt.legend()
plt.tight_layout()
plt.show()
```
</div>

Le due medie simulate sono vicine a 0,8. Nel grafico, però, il modello dipendente concentra tutti i risultati agli estremi. Una media uguale non rende uguali due sistemi. Per distinguere la loro dispersione, ci servirà un'altra misura, che introduciamo nella prossima lettura.

**Chiudiamo il percorso principale.** La Binomiale è un conteggio con ipotesi precise. La sua PMF usa combinatoria e indipendenza. La sua media usa indicatrici e linearità. Separare queste due derivazioni permette di capire sia ciò che il modello assume sia ciò che il risultato richiede davvero.

## Lettura A — Stessa media, dispersione diversa: la varianza {: #varianza }

### 16. Perché gli scarti vanno elevati al quadrato {: #definizione-varianza }

Il laboratorio precedente ci ha mostrato due conteggi con la stessa media e distribuzioni diverse. Questo ci porta a una nuova domanda: una volta individuato il centro della distribuzione, come possiamo descrivere quanto i risultati si allontanano da quel centro?

Per cominciare, consideriamo due pagamenti più semplici. Il primo assegna sempre 5 euro. Il secondo assegna 0 oppure 10 euro, ciascuno con probabilità $1/2$. Il primo ha media 5 perché è costante; il secondo ha media $0\cdot1/2+10\cdot1/2=5$. La media è dunque la stessa, ma l'incertezza del pagamento è molto diversa. Nel primo caso riceviamo esattamente la media in ogni partita; nel secondo ci troviamo sempre a 5 euro di distanza dalla media.

Cerchiamo una misura che conservi questa differenza. La chiamiamo **misura di dispersione**, perché deve descrivere quanto i valori sono dispersi attorno alla loro media.

Indichiamo la media di $X$ con la lettera greca $\mu$, letta «mu»: $\mu=\mathbb{E}[X]$. Per ogni valore possibile $x$, la differenza $x-\mu$ è il suo **scarto dalla media**. Uno scarto negativo corrisponde a un valore sotto la media; uno positivo a un valore sopra la media.

Nel pagamento incerto gli scarti sono $0-5=-5$ e $10-5=5$. Se ne facciamo la media pesata, otteniamo $(-5)\cdot1/2+5\cdot1/2=0$. Questa cancellazione non è particolare dell'esempio: per linearità, $\mathbb{E}[X-\mu]=\mathbb{E}[X]-\mu=0$. La media degli scarti con segno non può quindi distinguere una variabile costante da una che oscilla.

Per evitare la cancellazione, possiamo elevare gli scarti al quadrato. In questo modo sia $-5$ sia $5$ danno 25, mentre uno scarto nullo rimane nullo. Inoltre uno scarto grande pesa più di uno piccolo: raddoppiare la distanza dalla media quadruplica il suo quadrato. La varianza nasce facendo la media di questi scarti al quadrato.

La **varianza** è:

$$
\boxed{\operatorname{Var}(X)=\mathbb{E}[(X-\mu)^2]
=\sum_x (x-\mu)^2p_X(x).}
$$

Per il pagamento certo, tutti gli scarti sono zero e la varianza è zero. Per il pagamento incerto:

$$
\operatorname{Var}(X)=(-5)^2\cdot\frac12+5^2\cdot\frac12
=\frac{25}{2}+\frac{25}{2}=25.
$$

Per leggere la definizione, possiamo seguire tre operazioni: sottrarre la media a ciascun valore, elevare lo scarto al quadrato e infine fare la media usando le probabilità della distribuzione. Per questo la varianza è sempre non negativa. Negli esempi finiti è zero esattamente quando tutti i valori di probabilità positiva coincidono con la media.

Dobbiamo anche prestare attenzione alle unità di misura. Se $X$ è espresso in euro, gli scarti sono in euro e i loro quadrati sono in **euro al quadrato**. La varianza 25 non è quindi un pagamento di 25 euro. Se vogliamo una misura nelle stesse unità di $X$, prendiamo la radice quadrata della varianza: si chiama **deviazione standard**. In questo esempio vale $\sqrt{25}=5$ euro, coerentemente con la distanza dei due pagamenti dalla media.

Qui tutte le variabili hanno un numero finito di valori e la varianza è finita. Per variabili con infiniti valori occorre un controllo ulteriore: una media finita non garantisce una varianza finita. La formula equivalente che ricaveremo tra poco si usa senza ambiguità quando $\mathbb{E}[X^2]<\infty$.

### 17. Un modo equivalente di fare il conto {: #formula-varianza }

La definizione con gli scarti spiega il significato della varianza. Per fare i conti, però, è spesso comodo disporre di una formula che usi la media di $X$ e la media di $X^2$. Ricaviamola senza saltare i passaggi.

La quantità $\mu$ è un numero fissato dal modello, non una nuova variabile aleatoria. Possiamo quindi trattarla come una costante quando espandiamo il quadrato:

$$
(X-\mu)^2=X^2-2\mu X+\mu^2.
$$

Applichiamo il valore atteso ai tre termini e usiamo la linearità:

$$
\operatorname{Var}(X)=\mathbb{E}[X^2]-2\mu\mathbb{E}[X]+\mu^2.
$$

Poiché $\mathbb{E}[X]=\mu$, il secondo termine è $-2\mu^2$. Sommandolo all'ultimo resta $-\mu^2$:

$$
\boxed{\operatorname{Var}(X)=\mathbb{E}[X^2]-\mu^2.}
$$

La formula contiene due operazioni diverse, che è utile tenere separate. In $\mathbb{E}[X^2]$ eleviamo prima al quadrato i valori possibili, poi ne facciamo la media. In $(\mathbb{E}[X])^2$ calcoliamo prima la media e poi eleviamo al quadrato quel singolo numero. In generale i risultati non coincidono: la loro differenza è proprio la varianza.

Per calcolare $\mathbb{E}[X^2]$ non serve ricostruire da zero la distribuzione del quadrato. Usiamo gli stessi pesi della PMF di $X$, applicandoli ai valori elevati al quadrato:

$$
\mathbb{E}[X^2]=\sum_x x^2p_X(x).
$$

Nel pagamento che vale 0 oppure 10, otteniamo $\mathbb{E}[X^2]=0^2\cdot1/2+10^2\cdot1/2=50$. La media è 5, quindi il suo quadrato è 25. La formula dà $50-25=25$, come il calcolo con gli scarti. Le probabilità sono rimaste $1/2$ e $1/2$: a essere elevati al quadrato sono i valori, non i pesi.

Applichiamo ora la formula a una Bernoulli $I$ di parametro $p$. I suoi soli valori sono 0 e 1, e per entrambi il quadrato coincide con il valore iniziale: $0^2=0$ e $1^2=1$. L'identità $I^2=I$ vale quindi per ogni esito. Ne segue che $\mathbb{E}[I^2]=\mathbb{E}[I]=p$.

Sostituendo la media $p$ e la media del quadrato $p$ nella formula della varianza, otteniamo:

$$
\operatorname{Var}(I)=p-p^2=p(1-p).
$$

### 18. La varianza binomiale e l'ipotesi che la rende possibile {: #varianza-binomiale }

Abbiamo trovato la media binomiale sommando le medie delle indicatrici. Per la varianza serve un passaggio in più: la formula della sezione precedente richiede anche $\mathbb{E}[X^2]$. Il quadrato di una somma non contiene soltanto i quadrati degli addendi, ma anche i prodotti tra addendi diversi. È in questi prodotti che entrerà la relazione tra le prove.

Per la Binomiale $X=\sum_{i=1}^n I_i$, espandere il quadrato produce i quadrati dei singoli bit e due copie di ogni prodotto tra bit diversi:

$$
X^2=\sum_{i=1}^n I_i^2+2\sum_{1\le i<j\le n}I_iI_j.
$$

Un esempio con due bit chiarisce il fattore 2: $(I_1+I_2)^2=I_1^2+I_1I_2+I_2I_1+I_2^2$. I due prodotti centrali sono uguali.

Ogni $I_i^2$ ha media $p$. Il prodotto $I_iI_j$ vale 1 soltanto quando entrambe le prove hanno successo. **Qui usiamo l'indipendenza**: la probabilità dei due successi è $p\cdot p=p^2$. La media di quel prodotto, che è un'indicatrice, è quindi $p^2$.

Ogni coppia distinta di indicatrici compare una volta nella somma con $i<j$, e le coppie sono $\binom n2$. Il fattore 2 davanti alla somma tiene conto dei due ordini in cui ogni prodotto compare nell'espansione del quadrato.

Ora possiamo fare la media. I $n$ quadrati delle indicatrici contribuiscono ciascuno $p$; i $\binom n2$ prodotti contribuiscono ciascuno $p^2$, con il fattore 2 appena spiegato. Per linearità:

$$
\mathbb{E}[X^2]=np+2\binom n2p^2=np+n(n-1)p^2.
$$

Sottraiamo il quadrato della media, $(np)^2=n^2p^2$:

$$
\operatorname{Var}(X)
=np+n(n-1)p^2-n^2p^2
=np-np^2
=\boxed{np(1-p)}.
$$

Torniamo ai due modelli del laboratorio. Per le quattro operazioni indipendenti possiamo applicare la formula binomiale: la varianza è $4\cdot0{,}2\cdot0{,}8=0{,}64$.

Nel modello del guasto comune, invece, il conteggio è $X=4I$, dove $I$ è una sola indicatrice di parametro $p=0{,}2$. La media è $4p$. Perciò lo scarto è $X-4p=4(I-p)$ e, elevandolo al quadrato, otteniamo $16(I-p)^2$. Facendone la media troviamo $\operatorname{Var}(X)=16p(1-p)=2{,}56$.

Il secondo modello ha dunque varianza quattro volte maggiore, pur avendo la stessa media. Nel grafico questa differenza corrisponde al fatto che tutti i risultati del guasto comune sono concentrati negli estremi 0 e 4.

La media è uguale, la dispersione no. **Non trasferire alla varianza la regola della linearità della media:** sommare le varianze senza controllare la dipendenza può dare un risultato sbagliato. Studieremo più avanti il comportamento delle somme; per ora basta riconoscere dove la dimostrazione binomiale usa l'indipendenza.

## Lettura B — Pagamento, costo e gioco equo {: #giochi-equi }

All'inizio della settimana abbiamo chiesto quale prezzo assegnare a una possibilità di guadagno. Ora possiamo formulare la risposta distinguendo con precisione ciò che si riceve da ciò che si guadagna.

Riprendiamo il biglietto che paga 0 euro con probabilità $3/4$ e 8 euro con probabilità $1/4$. Il valore atteso del pagamento è 2 euro. Ma per partecipare dobbiamo acquistare il biglietto: il denaro ricevuto alla fine non coincide con il guadagno netto, perché da quell'importo dobbiamo sottrarre il prezzo pagato.

Indichiamo il pagamento con $X$, il prezzo fisso con $c$ e il guadagno netto con $G$. Per ogni esito del gioco vale $G=X-c$. Questa relazione descrive prima di tutto il saldo di una singola partita.

Se il biglietto costa 3 euro e non riceviamo alcun premio, il saldo è $0-3=-3$ euro: abbiamo perso il prezzo del biglietto. Se riceviamo 8 euro, il saldo è $8-3=5$ euro. I guadagni netti possibili sono quindi $-3$ e $5$, con le stesse probabilità dei rispettivi pagamenti. La loro media è:

$$
\mathbb{E}[G]=(-3)\cdot\frac34+5\cdot\frac14
=-\frac94+\frac54=-1\text{ euro}.
$$

La linearità permette di fare lo stesso conto senza riscrivere la PMF:

$$
\mathbb{E}[G]=\mathbb{E}[X]-c=2-3=-1.
$$

Un **gioco equo in valore atteso** ha guadagno netto medio nullo. Per un prezzo fisso $c$, la condizione diventa:

$$
\mathbb{E}[G]=0
\quad\Longleftrightarrow\quad
c=\mathbb{E}[X].
$$

In questo esempio il prezzo equo è 2 euro. Pagandolo, però, perderai 2 euro con probabilità $3/4$ e guadagnerai 6 euro con probabilità $1/4$. L'equità non richiede una probabilità di vincere del 50%: richiede un equilibrio tra importi e pesi.

L'equità in valore atteso riguarda l'equilibrio tra somme e probabilità. Il premio meno frequente può compensare le perdite più frequenti perché ha un importo maggiore. Nell'esempio, al prezzo di 2 euro, i contributi sono $(-2)\cdot3/4=-1{,}5$ e $6\cdot1/4=1{,}5$: la loro somma è zero.

Questo equilibrio non garantisce di recuperare il denaro dopo un numero fissato di partite. Se giochiamo $r$ volte alle stesse condizioni, la linearità dà valore atteso zero per il guadagno totale, ma il saldo concretamente osservato può essere positivo o negativo. La media descrive il modello, mentre il risultato di una sequenza rimane incerto. Per decidere se partecipare possono contare anche la dispersione dei risultati e la capacità di sostenere una perdita: il prezzo equo risponde alla domanda sul guadagno medio.

## Lettura C — Senza reinserimento: la distribuzione Ipergeometrica {: #ipergeometrica }

### 19. Le prove cambiano, ma i bit continuano a contare {: #modello-ipergeometrico }

Un insieme contiene **5 moduli software**, di cui **2 difettosi**. Ne scegliamo 2 distinti a caso per un controllo, **senza reinserimento**: dopo aver scelto il primo, non lo possiamo scegliere di nuovo. Chiamiamo $X$ il numero di moduli difettosi tra quelli scelti.

Per capire quale modello usare, immaginiamo di effettuare le due scelte in successione. All'inizio ci sono 2 difettosi su 5 moduli. Dopo la prima scelta restano quattro moduli, ma la loro composizione dipende da ciò che abbiamo estratto.

Se il primo modulo è difettoso, tra i quattro rimasti c'è soltanto un difettoso: la probabilità che anche il secondo lo sia è $1/4$. Se il primo modulo è sano, rimangono entrambi i difettosi: la probabilità per il secondo è $2/4$. Conoscere la prima estrazione modifica quindi la probabilità della seconda. Le due indicatrici non sono indipendenti, e non possiamo usare il modello binomiale.

La distribuzione adatta a questo campionamento si chiama **Ipergeometrica**. La differenza essenziale è che scegliamo oggetti da una popolazione finita senza rimettere nella popolazione quelli già scelti.

Il modello generale contiene una popolazione di $N$ oggetti, $K$ dei quali hanno la proprietà che contiamo. Scegliamo un campione di $n$ oggetti distinti, con tutti i sottoinsiemi della stessa dimensione equiprobabili. I parametri sono interi, $0\le K\le N$ e $1\le n\le N$. Il numero $X$ di oggetti con quella proprietà segue la **distribuzione Ipergeometrica**.

### 20. La PMF: scegliere dentro due gruppi {: #pmf-ipergeometrica }

Per trovare la PMF, conviene descrivere l'esito come il sottoinsieme dei due moduli scelti. L'ordine di estrazione non cambia quali moduli saranno controllati, quindi contiamo campioni senza ordine. Per ipotesi tutti questi campioni sono equiprobabili: possiamo applicare il rapporto tra casi favorevoli e casi possibili.

I campioni possibili sono $\binom52=10$. Consideriamo prima la domanda «quale probabilità ha il campione di contenere esattamente un difettoso?». Dobbiamo scegliere un modulo tra i 2 difettosi e un modulo tra i 3 sani. Ogni scelta del difettoso si può abbinare a ciascuna scelta del sano, quindi moltiplichiamo i due conteggi: $\binom21\binom31=2\cdot3=6$.

Il campione ottenuto identifica univocamente entrambe le scelte: nessuno dei sei campioni è contato due volte. Dividendo per i dieci campioni possibili troviamo $P(X=1)=6/10$.

Per zero difettosi scegliamo entrambi i moduli tra i tre sani: $\binom32=3$ campioni. Per due difettosi scegliamo entrambi tra i due difettosi: $\binom22=1$ campione.

| Difettosi $x$ | 0 | 1 | 2 |
|---|---|---|---|
| $P(X=x)$ | $3/10$ | $6/10$ | $1/10$ |

La somma è 1: i dieci campioni sono stati ripartiti senza perderne nessuno.

In generale, per trovare $k$ oggetti con la proprietà, scegliamo $k$ oggetti tra i $K$ che la possiedono e $n-k$ tra i $N-K$ che non la possiedono. Dividiamo per il numero di tutti i campioni:

$$
P(X=k)=\frac{\binom Kk\binom{N-K}{n-k}}{\binom Nn}.
$$

Il numeratore conta i campioni con la composizione richiesta: $k$ oggetti del primo gruppo e $n-k$ del secondo. Il denominatore conta tutti i campioni di dimensione $n$. La moltiplicazione al numeratore è una regola di conteggio; non stiamo assumendo che le estrazioni siano indipendenti.

Non tutti gli interi da 0 a $n$ sono necessariamente possibili. Non possiamo scegliere più di $K$ oggetti con la proprietà, né più di $N-K$ senza la proprietà. Le condizioni sono quindi $0\le k\le K$ e $0\le n-k\le N-K$, equivalenti a:

$$
\max(0,n-(N-K))\le k\le\min(n,K).
$$

Per gli interi in questo intervallo vale la formula; fuori dall'intervallo la probabilità è zero. Per esempio, se scegliamo 4 moduli tra 5 e 2 sono difettosi, non possiamo ottenere zero difettosi: i moduli sani sono soltanto 3.

Questa formula è un'applicazione del principio di conteggio della settimana scorsa a due gruppi. L'approfondimento non richiede di memorizzarla per l'orale: l'obiettivo è capire come costruirla a partire dalle scelte che descrivono un campione.

### 21. La media senza la PMF {: #media-ipergeometrica }

Nell'esempio piccolo, la media letta dalla tabella è:

$$
\mathbb{E}[X]=0\cdot\frac3{10}+1\cdot\frac6{10}
+2\cdot\frac1{10}=\frac8{10}=0{,}8.
$$

Il conto con la tabella funziona bene per questo piccolo esempio. Quando la popolazione e il campione sono più grandi, possiamo evitare la somma della PMF e tornare al metodo delle indicatrici. Dobbiamo però chiarire un punto che può sembrare sorprendente: le estrazioni sono dipendenti, ma prima di osservarle ogni posizione ha la stessa probabilità di contenere un difettoso.

Per ragionare sulle posizioni, immaginiamo di estrarre in ordine i moduli, scegliendo ogni volta uniformemente tra quelli rimasti. Questo procedimento è coerente con il modello dei sottoinsiemi equiprobabili: ciascuna sequenza di $n$ oggetti distinti ha probabilità $1/[N(N-1)\cdots(N-n+1)]$, e ogni sottoinsieme di $n$ oggetti può essere estratto in $n!$ ordini diversi. Tutti i sottoinsiemi ricevono quindi lo stesso peso.

Per ciascuna posizione di estrazione, $I_i$ vale 1 se l'oggetto estratto possiede la proprietà. **Prima di osservare qualsiasi estrazione**, ogni oggetto della popolazione ha la stessa possibilità di occupare quella posizione. Poiché $K$ oggetti su $N$ hanno la proprietà, $P(I_i=1)=K/N$ per ogni posizione.

Qui dobbiamo distinguere due domande. La prima è: «qual è la probabilità che il secondo modulo sia difettoso, sapendo che il primo è difettoso?». Abbiamo già trovato $1/4$. La seconda è: «qual è la probabilità che il secondo modulo sia difettoso, prima di sapere qualsiasi cosa sul primo?». Quest'ultima probabilità è $2/5$, come per la prima posizione.

Possiamo verificarlo separando i due casi possibili per la prima estrazione. Il primo modulo è difettoso con probabilità $2/5$, e in quel caso la probabilità di un secondo difettoso è $1/4$. Il primo è sano con probabilità $3/5$, e in quel caso la probabilità per il secondo è $2/4$. I due casi sono incompatibili ed esauriscono le possibilità, quindi:

$$
P(I_2=1)=\frac25\cdot\frac14+\frac35\cdot\frac24
=\frac2{20}+\frac6{20}=\frac25.
$$

Il numero totale è $X=\sum_{i=1}^n I_i$. Per linearità:

$$
\mathbb{E}[X]=\sum_{i=1}^n\mathbb{E}[I_i]
=\sum_{i=1}^n\frac KN
=\boxed{\frac{nK}{N}}.
$$

La formula ha una lettura semplice: il numero medio di oggetti con la proprietà è la dimensione del campione moltiplicata per la frazione di popolazione che possiede quella proprietà. Con $n=2$, $K=2$ e $N=5$, otteniamo $2\cdot2/5=0{,}8$, in accordo con la tabella.

Il risultato ha la stessa forma $np$ della media binomiale, con $p=K/N$. Questo non rende uguali le due distribuzioni. Con reinserimento e scelte indipendenti avremmo un conteggio binomiale; senza reinserimento abbiamo il conteggio ipergeometrico. Le medie coincidono perché le singole indicatrici hanno la stessa media nei due modelli e la linearità vale in entrambi. Le probabilità dei diversi totali, invece, tengono conto del modo in cui le estrazioni sono legate.

## Esercizi: prima prova, poi apri la soluzione {: #esercizi }

### Esercizio 1 — Stessi lanci, una nuova variabile {: #esercizio-1 }

Lanciamo due volte una moneta onesta, in modo indipendente. Abbiamo già studiato $X$, il numero di teste. Ora definiamo $Y$ come il **numero di cambi tra il primo e il secondo lancio**: un cambio avviene quando il secondo risultato è diverso dal primo.

Scrivi gli esiti completi, la tabella di $Y$ e la sua PMF. Quali esiti danno $Y=1$? Perché $TT$ e $CC$ hanno lo stesso valore di $Y$, ma valori diversi di $X$? Dopo aver studiato il valore atteso, calcola anche la media di $Y$.

??? esempio-svolto "Soluzione ragionata"
    Gli esiti sono $TT$, $TC$, $CT$, $CC$, ciascuno con probabilità $1/4$. Nei due lanci c'è una sola transizione: può esserci zero oppure un cambio.

    | Esito | $TT$ | $TC$ | $CT$ | $CC$ |
    |---|---|---|---|---|
    | Numero di teste $X$ | 2 | 1 | 1 | 0 |
    | Numero di cambi $Y$ | 0 | 1 | 1 | 0 |

    Per costruire la PMF, raccogliamo gli esiti che producono lo stesso valore di $Y$. Non c'è alcun cambio in $TT$ e $CC$, quindi questi due esiti formano l'evento $Y=0$. C'è invece un cambio in $TC$ e $CT$, che formano l'evento $Y=1$.

    Ciascun evento contiene due esiti di probabilità $1/4$. Sommando otteniamo $p_Y(0)=1/2$ e $p_Y(1)=1/2$. A questo punto applichiamo la definizione di valore atteso:

    $$
    \mathbb{E}[Y]=0\cdot\frac12+1\cdot\frac12=\frac12.
    $$

    Il valore $1/2$ non è un numero di cambi possibile in un singolo esperimento: è la media pesata dei due valori possibili, 0 e 1.

    $TT$ e $CC$ hanno entrambi zero cambi, ma rispettivamente due e zero teste. Lo spazio campionario è lo stesso: cambia la regola con cui leggiamo gli esiti.

### Esercizio 2 — Il dado e un costo fisso {: #esercizio-2 }

Un dado onesto determina un pagamento $X$ in euro uguale al numero uscito. Calcola $\mathbb{E}[X]$. Puoi ricevere quel pagamento in una partita? Se partecipare costa 4 euro, qual è il guadagno netto medio?

??? esempio-svolto "Soluzione ragionata"
    Il dado è onesto, quindi ciascun pagamento da 1 a 6 euro ha probabilità $1/6$. La media pesata coincide in questo caso con la media aritmetica dei sei valori:

    $$
    \mathbb{E}[X]=\frac{1+2+3+4+5+6}{6}=3{,}5\text{ euro}.
    $$

    Non possiamo ricevere esattamente 3,5 euro in una partita, perché il pagamento è sempre un intero da 1 a 6. Questo non è un problema per il valore atteso: la media può trovarsi tra i risultati possibili.

    Per calcolare il guadagno dobbiamo sottrarre i 4 euro pagati per partecipare. Definiamo quindi $G=X-4$. Per linearità:

    $$
    \mathbb{E}[G]=\mathbb{E}[X]-4=3{,}5-4=-0{,}5\text{ euro}.
    $$

    Il segno negativo indica una perdita media di mezzo euro per partita nel modello. In una partita concreta possiamo però perdere o guadagnare: il saldo dipende dalla faccia uscita.

### Esercizio 3 — Contare senza assumere indipendenza {: #esercizio-3 }

Tre chiavi distinte ricevono indici indipendenti e uniformi tra due caselle. Definisci i tre bit delle coppie e calcola il numero medio di coppie in collisione. Quel numero è una probabilità? Se due bit delle coppie valgono 1, che cosa sai del terzo?

??? esempio-svolto "Soluzione ragionata"
    Chiamiamo le chiavi $a$, $b$ e $c$. Definiamo $I_{ab}$, $I_{ac}$ e $I_{bc}$ come le indicatrici delle collisioni nelle tre coppie. Per ogni assegnazione il numero di coppie in collisione è $C=I_{ab}+I_{ac}+I_{bc}$.

    Per una coppia fissata, l'indice della seconda chiave coincide con quello della prima con probabilità $1/2$: delle due caselle equiprobabili, una sola è quella della prima chiave. Ogni indicatrice ha quindi media $1/2$. Per linearità:

    $$
    \mathbb{E}[C]=\frac12+\frac12+\frac12=\frac32=1{,}5.
    $$

    Si tratta di un numero medio di coppie. Non può essere una probabilità, perché supera 1. Anzi, con tre chiavi e due caselle una collisione è certa: almeno due chiavi devono occupare la stessa casella, quindi $P(C\ge1)=1$.

    Se due indicatrici valgono 1, tutte e tre le chiavi hanno lo stesso indice. Per esempio, se $a$ coincide con $b$ e $a$ coincide con $c$, anche $b$ coincide con $c$. La terza indicatrice vale dunque 1 con certezza. Le tre indicatrici non sono mutuamente indipendenti, nonostante l'indipendenza degli indici delle chiavi. Per calcolare la media della loro somma abbiamo usato la linearità, che non richiede quell'indipendenza.

### Esercizio 4 — Quattro operazioni {: #esercizio-4 }

Quattro operazioni falliscono indipendentemente, ciascuna con probabilità 0,2. Definisci il conteggio $X$ tramite bit. Calcola la sua media e la probabilità di esattamente due fallimenti. Poi considera un guasto comune che, con probabilità 0,2, le fa fallire tutte insieme: che cosa resta uguale e che cosa cambia?

??? esempio-svolto "Soluzione ragionata"
    Definiamo $I_i=1$ se fallisce l'operazione $i$ e $I_i=0$ altrimenti. Il totale è $X=I_1+I_2+I_3+I_4$. Nel primo modello le indicatrici sono indipendenti e hanno tutte parametro $0{,}2$, quindi il conteggio è Binomiale di parametri 4 e $0{,}2$.

    Per la media possiamo sommare le medie delle quattro indicatrici: $\mathbb{E}[X]=4\cdot0{,}2=0{,}8$. Per la probabilità di esattamente due fallimenti dobbiamo invece contare le sequenze: scegliamo le due posizioni dei fallimenti in $\binom42=6$ modi, e ogni sequenza ha probabilità $(0{,}2)^2(0{,}8)^2$. Quindi:

    $$
    P(X=2)=6\cdot0{,}04\cdot0{,}64=0{,}1536.
    $$

    Nel modello del guasto comune ogni indicatrice ha ancora probabilità $0{,}2$ di valere 1, ma le quattro indicatrici sono sempre uguali tra loro. La linearità dà ancora media $0{,}8$. Il totale, però, vale 0 con probabilità $0{,}8$ e 4 con probabilità $0{,}2$: non può valere 2, quindi $P(X=2)=0$.

    Il confronto mostra esattamente che cosa resta uguale e che cosa cambia: le probabilità dei singoli fallimenti e la media del totale restano uguali, mentre la distribuzione del totale cambia.

### Esercizio 5 — Un campione senza reinserimento (lettura) {: #esercizio-5 }

Tra 10 moduli, 3 sono difettosi. Scegli uniformemente un sottoinsieme di 4 moduli. Qual è il numero medio di difettosi? Il conteggio è Binomiale? Come scriveresti la probabilità di trovare esattamente un difettoso?

??? esempio-svolto "Soluzione ragionata"
    Possiamo immaginare di estrarre i quattro moduli in ordine, senza reinserimento. Prima di osservare le estrazioni, ciascuna posizione ha probabilità $3/10$ di contenere un modulo difettoso. Il totale dei difettosi è la somma delle quattro indicatrici, quindi per linearità:

    $$
    \mathbb{E}[X]=4\cdot\frac3{10}=1{,}2.
    $$

    Il conteggio è Ipergeometrico. Non è Binomiale, perché togliere un modulo modifica la composizione di quelli rimasti e lega tra loro gli esiti delle estrazioni.

    Per trovare la probabilità di esattamente un difettoso, lavoriamo direttamente sui sottoinsiemi. Scegliamo 1 modulo tra i 3 difettosi e gli altri 3 tra i 7 sani: i campioni favorevoli sono $\binom31\binom73=3\cdot35=105$. I campioni possibili sono $\binom{10}4=210$, tutti equiprobabili. Pertanto:

    $$
    P(X=1)=\frac{\binom31\binom73}{\binom{10}4}
    =\frac{105}{210}=\frac12.
    $$

    La media 1,2 e la probabilità $1/2$ rispondono a due domande diverse: quanti difettosi troviamo in media e quanto è probabile trovarne esattamente uno.

## Errori da evitare {: #errori }

Molti errori di questo percorso nascono dal passaggio troppo rapido da una quantità a un'altra. Prima di usare una formula, conviene dire a parole che cosa rappresenta la variabile e che cosa stiamo cercando. Stiamo contando oggetti, calcolando una probabilità o misurando una dispersione?

La tabella raccoglie alcune confusioni frequenti. La domanda nella seconda colonna serve a tornare al significato degli oggetti, così possiamo correggere il ragionamento prima di ripetere il calcolo.

| Errore | Domanda da rifare |
|---|---|
| Confondere $x$ con $p_X(x)$ | Stai scrivendo un numero di teste o una probabilità? |
| Fare la media semplice dei valori diversi | Quei valori hanno davvero tutti lo stesso peso? |
| Trattare la media come il risultato della prossima prova | Su quale faccia del dado si trova 3,5? |
| Usare $\mathbb{E}[C]$ come $P(C\ge1)$ | Un esperimento con tre coppie quanto pesa nei due conti? |
| Richiedere indipendenza per la linearità | Che cosa è accaduto nella tabella con $X+Y=1$? |
| Chiamare Binomiale ogni somma di bit | Le prove sono indipendenti e hanno tutte lo stesso $p$? |
| Contare caselle occupate invece di coppie | Tre chiavi nella stessa casella producono quante coppie? |
| Scambiare $\mathbb{E}[X^2]$ con $(\mathbb{E}[X])^2$ | Hai elevato i valori al quadrato prima o dopo la media? |
| Chiamare equo un gioco perché si vince metà delle volte | Hai pesato anche gli importi persi e ricevuti? |

## Riepilogo e takeaway per chi scrive software {: #riepilogo }

Il percorso della settimana parte da una distinzione fondamentale. L'esperimento produce un esito completo; la variabile aleatoria associa a quell'esito un numero che risponde alla nostra domanda. Possiamo contare teste, guasti, confronti o coppie in collisione, ma dobbiamo scegliere esplicitamente quale quantità vogliamo studiare.

La PMF descrive poi come la probabilità si distribuisce tra i valori di quella variabile. Il valore atteso usa queste probabilità come pesi e riassume la distribuzione con una media. Questa media può essere un valore che non osserveremo mai in una singola prova, come 3,5 per il dado o 0,8 per il conteggio dei fallimenti. Il suo significato è quello di centro della distribuzione, non di previsione esatta del prossimo risultato.

La linearità ci offre un modo per calcolare questa media senza conoscere sempre la distribuzione del totale. Se un costo è la somma dei costi di più parti, la sua media è la somma delle medie delle parti. Se invece vogliamo contare quante proprietà si verificano, possiamo assegnare un'indicatrice a ciascuna e sommarle. Poiché la media di ogni indicatrice è una probabilità, il conteggio medio si ottiene sommando le probabilità dei singoli eventi.

La dipendenza tra le parti non impedisce questo procedimento. Richiede però attenzione quando vogliamo dire di più sulla distribuzione del totale. Per chiamare Binomiale una somma di indicatrici servono prove indipendenti con lo stesso parametro $p$; per il campionamento uniforme senza reinserimento abbiamo invece il modello Ipergeometrico. La media può avere una forma simile in modelli diversi, mentre le probabilità dei singoli totali cambiano.

Per l'informatico, la domanda decisiva viene **prima** della formula: che cosa stiamo misurando? Coppie in collisione, caselle occupate e probabilità di un incidente sono quantità diverse. Un'analisi del caso medio ha valore soltanto se dichiara anche il modello degli input o della casualità interna al programma.

Vediamo questa esigenza in un esempio algoritmico. Una ricerca lineare visita gli elementi di una lista dall'inizio e si ferma quando trova la chiave. Supponiamo che la lista contenga $n$ elementi distinti, che la chiave cercata sia presente e che ciascuna posizione sia equiprobabile nel modello.

Se la chiave è nella prima posizione, basta un confronto; se è nella seconda, ne servono due; se è nell'ultima, ne servono $n$. Il costo $X$ assume quindi i valori da 1 a $n$, ciascuno con probabilità $1/n$. Applicando la definizione di valore atteso e la formula della somma degli interi, otteniamo:

$$
\mathbb{E}[X]=\frac{1+2+\cdots+n}{n}
=\frac{n(n+1)}{2n}=\frac{n+1}{2}.
$$

Questo numero dipende dalle ipotesi appena dichiarate. Se la chiave può mancare, una ricerca senza successo visita tutta la lista e dobbiamo includere anche la probabilità di quel caso. Se alcune posizioni sono più probabili di altre, dobbiamo usare i loro pesi invece di $1/n$. Perciò un'affermazione sul costo medio di un algoritmo deve sempre specificare il modello degli input o della casualità interna.

La media non descrive tutto. Un servizio con guasti indipendenti e uno con guasti comuni possono avere la stessa media dei fallimenti e comportamenti molto diversi. La varianza comincia a misurare quella differenza; le prossime settimane aggiungeranno altri strumenti.

!!! tip "Che cosa devi saper rifare"
    Dovresti saper partire da un esperimento semplice, definire la variabile che ti interessa e costruirne la PMF, spiegando quali esiti contribuiscono a ciascun valore. Da quella tabella dovresti saper calcolare il valore atteso e interpretarlo, anche quando non è un risultato possibile.

    Dovresti poi saper definire l'indicatrice di un evento e ricavare $\mathbb{E}[I_A]=P(A)$ dalla definizione di media. Per usare questo strumento su un conteggio, occorre spiegare perché la somma delle indicatrici conta esattamente gli oggetti richiesti, prima di applicare la linearità.

    Infine, per il conteggio binomiale dovresti saper distinguere due ragionamenti: le ipotesi di indipendenza e probabilità comune permettono di ricavare la PMF; la rappresentazione come somma di indicatrici permette di ricavare la media $np$. Chiarire quali ipotesi intervengono in ciascun passaggio è parte della spiegazione matematica.

## Riferimenti e letture {: #riferimenti }

* **Christiaan Huygens**, *De ratiociniis in ludo aleae* (1657), introduzione e Proposizioni I–III: [traduzione inglese del 1714](https://math.dartmouth.edu/~doyle/docs/huygens/huygens/). Fonte primaria del percorso sul valore di una possibilità di guadagno. Gli esempi con euro e software di questa pagina sono esempi didattici moderni.
* **Chris Piech**, *Probability for Computer Scientists*, Stanford, [portale del corso](https://chrispiech.github.io/probabilityForComputerScientists/): riferimento contemporaneo per variabili discrete, aspettazione, linearità e modelli di conteggio. Le derivazioni qui sono sviluppate passo per passo con gli esempi della dispensa.
* **Jerry Cain**, Stanford CS109, [esercitazione del 13 aprile 2021, soluzioni](https://web.stanford.edu/class/archive/cs/cs109/cs109.1216/sections/02_section_soln.pdf): esempi del metodo delle indicatrici e della linearità senza indipendenza.
* **William Feller**, *An Introduction to Probability Theory and Its Applications*, vol. I (prima edizione 1950): riferimento classico del corso per il calcolo dell'aspettazione. [Scheda bibliografica e copie digitali su Open Library](https://openlibrary.org/search?q=William+Feller+An+Introduction+to+Probability+Theory+and+Its+Applications). La linearità è presentata come proprietà matematica, senza attribuirne l'invenzione a Feller.

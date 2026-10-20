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

## Che cosa è richiesto all’esame {: #esame }

- **Definizioni e calcoli:** definire una variabile aleatoria discreta, costruirne la PMF e calcolare e interpretare il valore atteso su esempi semplici. Devi distinguere il valore assunto dalla variabile dalla sua probabilità e spiegare perché il valore atteso può non essere un risultato possibile.
- **Linearità e indicatrici:** usare la linearità del valore atteso anche con variabili dipendenti; definire l’indicatrice di un evento e usare $\mathbb{E}[I_A]=P(A)$; costruire un conteggio come somma di indicatrici prima di calcolarne la media.
- **Distribuzione binomiale:** riconoscere le ipotesi di un numero fissato di prove indipendenti con la stessa probabilità di successo; calcolare probabilità con la PMF e la media $np$. Devi distinguere ciò che richiede l’indipendenza da ciò che segue dalla sola linearità.
- **Applicazioni:** impostare semplici conteggi di coppie in collisione e fallimenti, esplicitando il modello; distinguere un numero medio di eventi dalla probabilità che ne accada almeno uno. Gli esempi illustrano il metodo: non devi memorizzarne i valori numerici.
- **Ragionamenti da ricostruire:** ricavare la media di un’indicatrice dalla definizione di valore atteso; spiegare perché la somma delle indicatrici conta gli oggetti richiesti; ricavare la media della distribuzione binomiale con la linearità e la PMF della distribuzione binomiale pesando una sequenza e contando le posizioni dei successi.

**Facoltativi e non richiesti all’esame:** formalizzazione dei giochi equi (Lettura A); distribuzione Ipergeometrica, sua PMF, derivazione della media ed esercizio 5 (Lettura B); dettagli tecnici sulla scelta casuale delle funzioni hash. Restano richiesti il significato del valore atteso come prezzo di una possibilità, il modello uniforme e indipendente delle collisioni e il metodo delle indicatrici nelle applicazioni indicate sopra.

**Varianza:** la trattazione è all’inizio della [Settimana 5](../settimana_05/index.md#varianza), dove sono precisate le parti richieste all’esame e quelle facoltative.

Per codice, widget e fonti valgono le [indicazioni generali per lo studio](../index.md#esame).

---

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
    Gli Atti I–V formano il percorso principale: variabili aleatorie, valore atteso, indicatrici, linearità e distribuzione binomiale. Seguono due letture facoltative: giochi equi e campionamento senza reinserimento. Le due letture sono facoltative e non richieste all’esame; il perimetro completo è indicato [in apertura](#esame). La varianza viene introdotta all'inizio della [Settimana 5](../settimana_05/index.md#varianza), con indicazioni precise su ciò che è richiesto all'esame.

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


#### La media di una funzione: la regola LOTUS {: #lotus }

Supponiamo di conoscere la distribuzione di $X$, ma di voler calcolare la media di una quantità ottenuta trasformando $X$, per esempio $X^2$. La trasformazione assegna a ogni esito un nuovo numero: $g(X)$ è quindi ancora una variabile aleatoria. Potremmo costruirne la distribuzione e poi applicare la definizione di valore atteso. La seguente regola permette di fare il conto direttamente dalla distribuzione di $X$.

!!! important "Valore atteso di una funzione di una variabile discreta"

    Se $X$ ha funzione di massa $p_X$, allora:

    $$
    \boxed{\mathbb{E}[g(X)]=\sum_x g(x)\,p_X(x).}
    $$

    La somma percorre i valori possibili di $X$: **trasformiamo ciascun valore e manteniamo il suo peso probabilistico**. Per un numero finito di valori il conto è sempre valido, purché $g$ sia definita e finita su quei valori; nel caso infinito, per ottenere una media finita richiediamo $\sum_x |g(x)|p_X(x)<\infty$.

Questa proprietà è nota anche come **LOTUS**, dall'inglese *Law of the Unconscious Statistician* («legge dello statistico inconsapevole»): il nome scherzoso richiama la facilità con cui si usa questa regola senza accorgersi che merita una giustificazione.

**Un esempio.** Se $X$ conta le teste in due lanci di una moneta onesta, i suoi valori sono 0, 1 e 2, con probabilità $1/4$, $1/2$ e $1/4$. Per trovare la media del quadrato applichiamo $g(x)=x^2$:

$$
\mathbb{E}[X^2]
=0^2\cdot\frac14+1^2\cdot\frac12+2^2\cdot\frac14
=0+\frac12+1=\frac32.
$$

Attenzione all'ordine: qui abbiamo **prima elevato al quadrato e poi fatto la media**. Invece $g(\mathbb{E}[X])=(\mathbb{E}[X])^2=1^2=1$. In generale, dunque, $\mathbb{E}[g(X)]$ e $g(\mathbb{E}[X])$ sono quantità diverse.

**Perché funziona?** Chiamiamo $Y=g(X)$. Se più valori di $X$ producono lo stesso valore $y$, le loro probabilità si sommano:

$$
P(Y=y)=\sum_{x:\,g(x)=y}p_X(x).
$$

Nella definizione della media di $Y$ possiamo quindi sostituire questa somma e raccogliere il contributo di ciascun valore $x$:

$$
\mathbb{E}[Y]
=\sum_y y\,P(Y=y)
=\sum_y\sum_{x:\,g(x)=y}g(x)\,p_X(x)
=\sum_x g(x)\,p_X(x).
$$

La regola funziona quindi anche quando $g$ manda valori diversi nello stesso risultato: cambia soltanto il modo di raggruppare gli stessi contributi.

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

La proprietà che studiamo in questa sezione permette di procedere in un altro modo: calcolare separatamente le due medie e poi sommarle. Prima di enunciarla, vediamo perché la dipendenza tra $X$ e $Y$ non è un ostacolo.

Prima vediamo un esempio minuscolo. Lanciamo una sola moneta onesta e associamo a questo esperimento due variabili aleatorie diverse, $X$ e $Y$. Se esce testa, assegniamo $X=1$ e $Y=0$; se esce croce, assegniamo $X=0$ e $Y=1$.

| Esito | Probabilità | $X$ | $Y$ | $X+Y$ |
|---|---|---|---|---|
| Testa | $1/2$ | 1 | 0 | 1 |
| Croce | $1/2$ | 0 | 1 | 1 |

Leggiamo la tabella prima per righe, poi per colonne. In ciascuna riga il totale è 1: qualunque sia l'esito della moneta, una delle due variabili vale 1 e l'altra vale 0. La somma $X+Y$ è ancora una **variabile aleatoria**, anche se in questo esempio assume sempre lo stesso valore. Per capire perché, fermiamoci sul significato di questa affermazione.

Una variabile aleatoria è una funzione che associa un numero a ciascun esito dell'esperimento. Se trasformiamo quel numero mediante una regola deterministica, otteniamo ancora una funzione degli esiti, dunque una nuova variabile aleatoria. Per esempio, $2X$, $X^2$ e $X+1$ sono tutte variabili aleatorie. La regola di calcolo non deve essere casuale: è il valore a cui la applichiamo a provenire dall'esperimento aleatorio. **L'aleatorietà si eredita attraverso la trasformazione**, senza bisogno di introdurre un nuovo esperimento o una nuova fonte di casualità. Nel contesto discreto che stiamo studiando, questo vale per qualunque funzione dei valori della variabile.

Lo stesso ragionamento vale per una funzione di più variabili aleatorie definite sullo stesso esperimento. Indichiamo un esito con la lettera greca $\omega$, letta «omega». La scrittura $X(\omega)$ indica il valore assegnato da $X$ a quell'esito. Nel caso della somma, a ogni esito $\omega$ associamo il numero

$$
(X+Y)(\omega)=X(\omega)+Y(\omega).
$$

Prima leggiamo i valori di $X$ e $Y$ corrispondenti a quell'esito, poi li sommiamo: anche questa è una regola che assegna un numero a ogni esito, quindi definisce una variabile aleatoria.

**Essere una variabile aleatoria non significa necessariamente assumere valori diversi.** Una trasformazione può far coincidere i risultati di tutti gli esiti e produrre una **variabile aleatoria costante**. È proprio ciò che accade qui: $X$ e $Y$ cambiano con l'esito della moneta, ma la loro somma vale sempre 1. La trasformazione conserva la natura di variabile aleatoria, ma può eliminare ogni incertezza sul valore finale. Di conseguenza, anche il valore atteso di $X+Y$ è 1.

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

La loro somma è ancora $1+3=4$. Anche qui le variabili sono dipendenti: conoscere $X$ determina $Y$. **A sommare a 1 devono essere le probabilità degli esiti dell'esperimento, non i valori di $X$ e $Y$.** Qui gli esiti sono testa e croce, con probabilità $1/2+1/2=1$. Anche le probabilità dei distinti valori assunti da ciascuna variabile sommano a 1.

**E se le variabili provengono da due esperimenti diversi?** Possiamo sommarle anche in quel caso, descrivendo i due esperimenti insieme. Lanciamo due monete oneste, indipendentemente. Ora chiamiamo $X$ la variabile che vale 1 se la prima dà testa e 0 altrimenti; chiamiamo $Y$ la variabile che vale 1 se la seconda dà testa e 0 altrimenti. La somma $X+Y$ conta il numero complessivo di teste.

Un esito completo deve indicare che cosa accade **a entrambe le monete**. Scriviamo prima l'esito della prima e poi quello della seconda: $TC$ significa testa alla prima e croce alla seconda. Abbiamo quindi quattro esiti congiunti:

| Esito congiunto | Probabilità | $X$ | $Y$ | $X+Y$ |
|---|---|---|---|---|
| $TT$ | $\frac12\cdot\frac12=\frac14$ | 1 | 1 | 2 |
| $TC$ | $\frac12\cdot\frac12=\frac14$ | 1 | 0 | 1 |
| $CT$ | $\frac12\cdot\frac12=\frac14$ | 0 | 1 | 1 |
| $CC$ | $\frac12\cdot\frac12=\frac14$ | 0 | 0 | 0 |

Perché moltiplichiamo? Ogni riga descrive l'intersezione di due eventi: per esempio, «testa alla prima **e** croce alla seconda». **È l'indipendenza a permettere di moltiplicare le loro probabilità.** Le quattro probabilità congiunte sommano a 1. Con monete truccate (e sempre indipendenti) che danno testa con probabilità rispettivamente $p$ e $q$, avremmo invece, nello stesso ordine, $pq$, $p(1-q)$, $(1-p)q$ e $(1-p)(1-q)$.

Fermiamoci ora sulla colonna del totale: quattro esiti dell'esperimento producono soltanto tre valori distinti della somma. Il valore 1 compare in due righe. Per trovare la sua probabilità dobbiamo **sommare** le probabilità di quei due esiti incompatibili:

$$
P(X+Y=0)=\frac14,\qquad
P(X+Y=1)=\frac14+\frac14=\frac12,\qquad
P(X+Y=2)=\frac14.
$$

Anche le probabilità di questi tre valori sommano a 1. La media del totale è dunque

$$
\mathbb{E}[X+Y]=0\cdot\frac14+1\cdot\frac12+2\cdot\frac14=1.
$$

Separatamente, ciascuna variabile vale 1 con probabilità $1/2$, quindi $\mathbb{E}[X]=\mathbb{E}[Y]=1/2$. La media della somma coincide ancora con la somma delle medie.

Confrontiamo questo risultato con il primo esempio. Lì $X$ e $Y$ erano legate alla stessa moneta e la somma era sempre 1; qui sono legate a due monete indipendenti e la somma può variare. **La media del totale è la stessa, ma la distribuzione è diversa.**

Descrivendo i due esperimenti insieme, entrambe le variabili diventano funzioni di un unico esito congiunto. Possiamo farlo anche per esperimenti dipendenti: in quel caso dobbiamo usare le effettive probabilità congiunte, che in generale non sono il prodotto delle probabilità dei singoli esiti (in questo caso usiamo la [regola del prodotto](../settimana_01/index.md#8-la-regola-del-prodotto-e-la-scomposizione-sequenziale), $P(A\cap B)=P(A)\,P(B\mid A)$). **L'indipendenza serve per calcolare le probabilità mediante quel prodotto; la regola per sommare le medie vale anche senza indipendenza.**

!!! important "Linearità del valore atteso"

    Se $a$, $b$ e $c$ sono numeri fissati, e $\mathbb{E}[|X|]<\infty$ e $\mathbb{E}[|Y|]<\infty$ (ipotesi automaticamente soddisfatte quando ciascuna variabile ha un numero finito di valori):

    $$
    \boxed{\mathbb{E}[aX+bY+c]
    =a\mathbb{E}[X]+b\mathbb{E}[Y]+c.}
    $$

    Non occorre che $X$ e $Y$ siano indipendenti. Ponendo $a=b=1$ e $c=0$ ritroviamo $\mathbb{E}[X+Y]=\mathbb{E}[X]+\mathbb{E}[Y]$. La stessa regola si applica a qualunque **somma finita** di variabili.

Gli esempi suggeriscono la proprietà, ma non la dimostrano per tutte le variabili. Per capire perché vale in generale, torniamo agli esiti completi dell'esperimento. Svolgiamo la dimostrazione su uno spazio campionario finito, così tutte le somme contengono un numero finito di termini.

Usiamo la notazione già introdotta: $X(\omega)$ è il valore assegnato da $X$ all'esito $\omega$. Indichiamo inoltre con $P(\{\omega\})$ la probabilità che si verifichi proprio quell'esito.

Possiamo calcolare il valore atteso moltiplicando il valore di $X$ per la probabilità di ciascun esito e sommando. È lo stesso conto che abbiamo fatto con la PMF, soltanto organizzato diversamente. Nella PMF raccogliamo prima tutti gli esiti che danno lo stesso valore; qui li teniamo separati. Per esempio, nei due lanci di moneta, se $Z=X+Y$ conta le teste, il contributo del valore 1 può essere scritto come $1\cdot P(Z=1)$ oppure come $1\cdot P(\{TC\})+1\cdot P(\{CT\})$. Il risultato non cambia.

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

La linearità diventa particolarmente utile quando vogliamo contare quante volte si verifica una certa proprietà. Immaginiamo, per esempio, un'applicazione che invia richieste a un servizio online per ottenere le previsioni del tempo. Una richiesta può riuscire, restituendo le previsioni, oppure fallire, per esempio perché il servizio non risponde entro il tempo previsto. Prima di contare i fallimenti su più richieste, concentriamoci su una sola: **una determinata richiesta è fallita oppure no?**

Possiamo registrare la risposta con un numero: 1 se la richiesta è fallita, 0 se è riuscita. L'esperimento resta l'esecuzione della richiesta, con tutti i suoi possibili esiti. La nuova variabile conserva soltanto l'informazione che ci interessa: se si è verificato il fallimento. Si chiama *indicatrice* proprio perché indica la presenza o l'assenza di un evento (in questo caso, il fallimento di una richiesta al servizio di previsioni del tempo).

Per un evento $A$, chiamiamo **variabile indicatrice** la variabile $I_A$ definita da:

$$
I_A(\omega)=
\begin{cases}
1,&\text{se }\omega\in A,\\
0,&\text{se }\omega\notin A.
\end{cases}
$$

Il pedice $A$ identifica l'evento che stiamo contando. Puoi leggere $I_A$ come «il bit che segnala se è successo $A$».

Se $p=P(A)$, la PMF della variabile $I_A$ ha soltanto due valori:

$$
P(I_A=1)=p,\qquad P(I_A=0)=1-p.
$$

Una variabile con questa distribuzione si dice **variabile di Bernoulli di parametro $p$**, oppure **variabile distribuita secondo Bernoulli, con parametro $p$**. Si scrive $I_A\sim\operatorname{Bernoulli}(p)$: il simbolo $\sim$ significa «ha distribuzione». Il nome «successo» per il valore 1 è una convenzione matematica: se stai contando guasti, un «successo» è un guasto registrato.

Calcoliamo la media usando direttamente la definizione:

$$
\mathbb{E}[I_A]
=0\cdot(1-p)+1\cdot p
=p
=P(A).
$$

Il contributo del valore 0 è nullo, mentre moltiplicare per 1 lascia invariata la probabilità. *La media di un'indicatrice coincide quindi con la probabilità dell'evento che essa segnala.*

Per esempio, se una richiesta fallisce con probabilità $0{,}02$, la media della sua indicatrice è $0{,}02$. Attenzione: In una singola esecuzione registriamo sempre 0 oppure 1: il numero $0{,}02$ descrive la media nel modello, non una frazione di fallimento osservata in quella richiesta.

Ora immaginiamo più richieste e associamo un'indicatrice a ciascuna. Sommando le indicatrici otteniamo il numero totale di richieste fallite, perché ogni fallimento aggiunge 1 e ogni richiesta riuscita aggiunge 0. Applicando la linearità, la media di questo conteggio diventa la somma delle probabilità dei singoli fallimenti. È questo il metodo che useremo nella prossima sezione: **costruire il conteggio come somma di indicatrici e poi calcolarne la media**.

### 9. Una collisione alla volta {: #collisioni }

Torniamo alla domanda sulle tabelle hash posta all'inizio della dispensa. Vogliamo conoscere il numero medio di **coppie di chiavi che ricevono lo stesso indice**. Prima di fare qualsiasi calcolo probabilistico, dobbiamo costruire una variabile che conti proprio queste coppie.

Cominciamo con tre chiavi distinte, chiamate $a$, $b$ e $c$. Le coppie possibili sono $(a,b)$, $(a,c)$ e $(b,c)$. A ciascuna coppia associamo una domanda: le due chiavi finiscono nella stessa casella? Registriamo la risposta con un'indicatrice, che vale 1 se gli indici coincidono e 0 altrimenti. Non stiamo contando le chiavi né le caselle occupate: ogni indicatrice riguarda una coppia precisa.

Chiamiamo questi bit $I_{ab}$, $I_{ac}$ e $I_{bc}$. Il numero $C$ di **coppie in collisione** è:

$$
C=I_{ab}+I_{ac}+I_{bc}.
$$

Per contare le coppie in collisione, sommiamo i tre bit: ogni coppia aggiunge 1 se le sue chiavi finiscono nella stessa casella, e 0 altrimenti. Se tutte le chiavi hanno indici diversi, il totale è 0. Se $a$ e $b$ condividono l'indice e $c$ no, è 1. Se tutte e tre finiscono nella stessa casella, è 3: ci sono tre coppie, anche se la casella occupata è una sola.

**Specifichiamo il modello.** La tabella ha $m$ caselle, con $m$ intero positivo. Per ogni chiave, la probabilità di finire in una qualunque casella fissata è $1/m$: tutte le caselle hanno la stessa probabilità di essere scelte. Questo è ciò che intendiamo quando diciamo che l'indice è *uniforme* tra le $m$ caselle. Supponiamo inoltre che gli indici delle diverse chiavi siano indipendenti: conoscere la casella in cui è finita una chiave non cambia le probabilità per le altre.

Calcoliamo ora la probabilità che due chiavi finiscano nella stessa casella. Supponiamo di conoscere la casella in cui è finita la prima chiave. Per avere una collisione, la seconda deve finire proprio in quella casella. Per l'indipendenza, conoscere l'indice della prima non cambia le probabilità della seconda: la probabilità che la seconda finisca in quella specifica casella resta $1/m$. Lo stesso ragionamento vale qualunque sia la casella della prima chiave. La probabilità di coincidenza è dunque $1/m$ anche prima di conoscere quell'indice.

??? approfondimento "Facoltativo, fuori dall’esame — Da dove viene la casualità?"

    I dettagli tecnici di questo riquadro non sono richiesti all’esame. Per i calcoli resta richiesto dichiarare il modello uniforme e indipendente.

    Nel calcolo appena fatto abbiamo immaginato che ogni chiave riceva un indice casuale, con le probabilità descritte sopra. È il modello ideale che useremo per proseguire la lezione.

    Una funzione hash concreta, però, può essere deterministica: se le diamo più volte la stessa chiave, restituisce sempre lo stesso indice. Se fissiamo sia la funzione sia le chiavi, quindi, le caselle di destinazione sono già determinate. Dove entra allora la casualità?

    Una possibilità è scegliere a caso la funzione hash da un insieme di funzioni disponibili. Una stessa chiave potrebbe così ricevere indici diversi a seconda della funzione estratta. Dopo la scelta, la funzione resta deterministica: è la scelta iniziale a essere casuale.

    Scegliere a caso una funzione non garantisce, da solo, che gli indici siano uniformi e indipendenti: dipende da quali funzioni sono disponibili e da come ne scegliamo una. Giustificare queste proprietà è un approfondimento sulle funzioni hash; per i calcoli della lezione le assumiamo come ipotesi del modello.

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

Ripercorriamo quali informazioni abbiamo usato. Per ogni coppia, l'indicatrice vale 1 se le due chiavi finiscono nella stessa casella. La sua media è quindi la probabilità di quella collisione, cioè $1/m$. Per ottenere la media del totale abbiamo poi sommato queste medie, una per ciascuna coppia. In questo secondo passaggio usiamo la linearità, che non richiede che le indicatrici siano indipendenti.

L'ipotesi iniziale di indici indipendenti e uniformi ci ha permesso di ricavare la probabilità $1/m$ per ogni coppia. Ma supponiamo di avere un altro modello, nel quale gli indici non siano tutti indipendenti, e di sapere comunque che **ogni coppia collide con probabilità $1/m$**. Anche in quel modello ogni indicatrice avrebbe media $1/m$. Sommando le stesse $\binom n2$ medie, otterremmo ancora $\mathbb{E}[C]=\binom n2/m$. Per questa formula basta dunque conoscere la probabilità di collisione di ciascuna coppia; non serve conoscere come le collisioni delle diverse coppie siano legate tra loro.

### 10. Una media non è la probabilità di «almeno una» {: #media-e-probabilita }

Il conteggio delle coppie ci permette di tornare al problema dei compleanni della settimana scorsa. Consideriamo un gruppo di 23 persone e manteniamo le ipotesi di quel modello: i compleanni sono indipendenti e ciascuno dei 365 giorni ha la stessa probabilità. Ora $C$ indica il numero di coppie di persone con lo stesso compleanno.

Le coppie possibili sono 253. Per ciascuna, la probabilità di coincidenza è $1/365$, proprio come per due chiavi assegnate a 365 caselle. Sommando le medie delle 253 indicatrici otteniamo:

$$
\mathbb{E}[C]=\frac{253}{365}\approx0{,}693.
$$

Fermiamoci a leggere il risultato. Il numero 0,693 risponde alla domanda **«quante coppie con lo stesso compleanno ci sono in media?»**. È un numero medio di coppie, anche se non è intero. In un singolo gruppo, naturalmente, le coppie si contano con numeri interi.

La domanda della settimana scorsa era diversa: **«qual è la probabilità che ci sia almeno una coppia con lo stesso compleanno?»**. Per quella domanda, nella [Settimana 3, Atto IV](../settimana_03/index.md#compleanni), abbiamo trovato circa 50,7%. Il valore 0,693 non va dunque trasformato in una probabilità del 69,3%. Per capire perché i due numeri sono diversi, dobbiamo guardare che cosa registriamo in ciascun gruppo.

Per capire la differenza, immaginiamo di ripetere l'esperimento su molti gruppi di 23 persone e di annotare due numeri per ogni gruppo. Il primo è $C$, il numero di coppie con lo stesso compleanno. Il secondo è l'indicatrice $J$ dell'evento «c'è almeno una coppia con lo stesso compleanno»: vale 0 se non ci sono coincidenze e 1 se ce n'è almeno una.

In un gruppo senza coincidenze, entrambi i numeri valgono 0. In un gruppo con una sola coppia coincidente, entrambi valgono 1. Ma se tre persone hanno lo stesso compleanno, formano tre coppie: il conteggio $C$ vale almeno 3, mentre $J$ vale ancora soltanto 1. Il primo numero registra **quante coppie** ci sono; il secondo registra soltanto **se ce ne sono**.

Quando facciamo la media dei valori di $C$, un gruppo con tre coppie contribuisce con 3 al totale delle coppie osservate. Quando facciamo la media dei valori di $J$, lo stesso gruppo contribuisce con 1, esattamente come un gruppo con una sola coppia. Il secondo conto conserva soltanto la presenza di una coincidenza e dimentica quante coppie l'hanno prodotta.

Le due medie rispondono quindi alle due domande che abbiamo distinto: $\mathbb{E}[C]$ è il numero medio di coppie, mentre $\mathbb{E}[J]=P(C\ge1)$ è la probabilità di almeno una coincidenza. Quest'ultima uguaglianza viene dalla proprietà delle indicatrici: la loro media è la probabilità dell'evento che segnalano.

Possiamo anche mettere in relazione le due quantità. Per ogni gruppo vale $J\le C$: se non ci sono coppie sono entrambi zero; se ce n'è almeno una, $J$ vale 1 e $C$ vale almeno 1. Facendo la media, l'ordine si conserva, quindi $P(C\ge1)\le\mathbb{E}[C]$. La media delle coppie fornisce un **limite superiore** alla probabilità di almeno una coincidenza. In generale, però, conoscere quel limite non basta a trovare la probabilità esatta.

Consideriamo ora tre chiavi $a$, $b$ e $c$ assegnate, indipendentemente e uniformemente, a due caselle, etichettate 0 e 1. Calcoliamo il numero medio di coppie in collisione un passaggio alla volta.

**1. Elenchiamo le coppie da contare.** Sono $(a,b)$, $(a,c)$ e $(b,c)$: in tutto tre. Per ciascuna, l'indicatrice vale 1 se le due chiavi occupano la stessa casella e 0 altrimenti. Il totale è quindi:

$$
C=I_{ab}+I_{ac}+I_{bc}.
$$

**2. Calcoliamo la media di una singola indicatrice.** Guardiamo, per esempio, la coppia $(a,b)$. Nella sezione precedente abbiamo già dimostrato che una coppia collide con probabilità $1/m$: qualunque sia la casella della prima chiave, la seconda deve scegliere proprio quella. Qui le caselle sono due, quindi $m=2$ e:

$$
P(I_{ab}=1)=\frac1m=\frac12.
$$

Con la probabilità restante $1-1/2=1/2$, le due chiavi occupano caselle diverse e l'indicatrice vale 0. Applicando la definizione di valore atteso otteniamo:

$$
\mathbb{E}[I_{ab}]
=0\cdot\frac12+1\cdot\frac12
=\frac12.
$$

Lo stesso conto vale per $(a,c)$ e $(b,c)$: anche le altre due indicatrici hanno media $1/2$.

**3. Sommiamo le tre medie.** Per la linearità del valore atteso:

$$
\begin{aligned}
\mathbb{E}[C]
&=\mathbb{E}[I_{ab}]+\mathbb{E}[I_{ac}]+\mathbb{E}[I_{bc}]\\
&=\frac12+\frac12+\frac12\\
&=\frac32=1{,}5.
\end{aligned}
$$

Qui la distinzione è immediata: 1,5 è un numero medio di coppie, ma nessuna probabilità può superare 1.

Guardiamo i conteggi possibili. Almeno due delle tre chiavi devono condividere una casella, perché le caselle sono soltanto due. Se la terza chiave occupa l'altra casella, abbiamo una coppia in collisione. Se tutte e tre occupano la stessa casella, abbiamo tre coppie. Non possiamo averne esattamente due: se $a$ ha lo stesso indice di $b$ e di $c$, allora anche $b$ e $c$ hanno lo stesso indice. Il conteggio $C$ può quindi valere soltanto 1 oppure 3.

Questo vincolo ci dice anche qualcosa sulle tre indicatrici di collisione appena definite, $I_{ab}$, $I_{ac}$ e $I_{bc}$. Sapere che due valgono 1 determina il valore della terza: **queste tre indicatrici di collisione non sono mutuamente indipendenti**, anche se gli indici delle chiavi lo sono. L'affermazione riguarda le collisioni di questo esempio: il fatto di associare indicatrici a coppie non implica, in generale, che siano dipendenti. In ogni caso, per calcolare la media non abbiamo avuto bisogno di studiare tutte queste relazioni: è bastato applicare la linearità.

### 11. Laboratorio: contare coppie e contare esperimenti {: #lab-hash }

Nel laboratorio osserviamo concretamente la differenza tra contare le coppie e registrare la presenza di una collisione. Una **singola prova** consiste nell'assegnare un indice a ciascuna delle $n$ chiavi e nel controllare le coincidenze. Ripetendo questa assegnazione molte volte, otteniamo una successione di conteggi da confrontare con i risultati teorici.

Prima di leggere il codice, teniamo separate tre fasi: generare gli indici di una prova, contare le coppie in quella prova e raccogliere i risultati di tutte le prove.

I parametri hanno ruoli distinti: `n` è il numero di chiavi in ogni assegnazione, `m` il numero di caselle e `prove` il numero di assegnazioni che simuliamo. Con `n = 23`, `m = 365` e `prove = 10000`, generiamo diecimila esperimenti, ciascuno con 23 chiavi e 365 caselle.

**Generare una prova.** La lista `indici` contiene una casella per ciascuna chiave. L'istruzione `generatore.randrange(m)` sceglie un intero tra 0 e `m - 1`: sono le etichette delle nostre `m` caselle. Ripetiamo la scelta `n` volte per costruire un'assegnazione completa. A ogni giro del ciclo esterno generiamo una nuova lista: stiamo iniziando una nuova prova.

**Contare le coppie.** Per ciascuna posizione `i`, il codice confronta il suo indice con quelli delle posizioni successive. Il ciclo su `j` parte da `i + 1`: così non confrontiamo una chiave con sé stessa e non contiamo di nuovo una coppia già visitata. Il confronto `indici[i] == indici[j]` risponde alla domanda «questa coppia collide?». In Python un confronto vero contribuisce 1 a `sum`, mentre uno falso contribuisce 0. La variabile `coppie` è quindi la somma delle indicatrici della sezione 9.

**Raccogliere i risultati.** I due accumulatori partono da zero, ma vengono aggiornati in modo diverso. `totale_coppie` riceve l'intero conteggio della prova appena conclusa. `con_collisione` riceve invece il risultato del confronto `coppie > 0`: aggiunge 1 se è presente almeno una coppia, 0 altrimenti. Una prova con tre coppie fa dunque aumentare il primo totale di 3 e il secondo di 1.

Alla fine dividiamo entrambi i totali per `prove`. Dal primo otteniamo la **media osservata delle coppie**; dal secondo la **frequenza relativa delle prove con almeno una collisione**. Sono le versioni osservate delle due quantità teoriche che vogliamo confrontare.

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

Dopo il ciclo, il programma calcola anche i due valori teorici. Per la media delle coppie usa `comb(n, 2) / m`, cioè la formula ricavata con le indicatrici. Per la probabilità di almeno una collisione riprende invece il conto della Settimana 3, passando dall'evento contrario: nessuna collisione.

Per evitare coincidenze, la prima chiave può occupare qualunque casella. La seconda deve scegliere una delle $m-1$ caselle rimaste libere; la terza, se le prime due sono diverse, una delle $m-2$ rimaste libere, e così via. La funzione `prod` moltiplica le frazioni corrispondenti. Il risultato è la probabilità di nessuna collisione, che sottraiamo da 1. Il codice tratta separatamente il caso `n > m`: con più chiavi che caselle, almeno una coincidenza è certa.

Leggiamo le quattro righe stampate a coppie. Le prime due confrontano media teorica e media simulata del numero di coppie: con i parametri iniziali sono vicine a 0,693. Le ultime due confrontano probabilità teorica e frequenza simulata di almeno una collisione: sono vicine a 0,507.

I valori simulati non devono coincidere esattamente con quelli teorici, perché abbiamo osservato soltanto un numero finito di prove. `Random(42)` fissa il seme del generatore: ripetendo il codice con gli stessi parametri otteniamo la stessa successione di estrazioni, e quindi gli stessi risultati. Questo rende il laboratorio riproducibile. **La simulazione illustra il risultato; la dimostrazione della media rimane il conto con le indicatrici.**

Per una prima modifica, imposta `n = 3` e `m = 2`. Prima di eseguire, ripensa ai valori possibili di $C$: 1 oppure 3. Ogni prova avrà almeno una collisione, quindi la frazione con collisione sarà esattamente 1; la media dei conteggi sarà invece vicina a 1,5.

Poi aumenta soltanto `prove`, lasciando fissi `n` e `m`. Stai osservando più volte lo stesso modello: il numero di chiavi e il numero di caselle di ciascuna assegnazione rimangono uguali. Per questo i valori teorici non cambiano.

**Il metodo da portare con te:** identifica che cosa conti, scrivilo come somma di bit, calcola la probabilità che ogni bit valga 1, somma. Prima di cercare la distribuzione completa, chiediti se la media basta a rispondere alla tua domanda.

## Atto V — La distribuzione binomiale nasce da una somma di bit {: #binomiale }

### 12. Quando un conteggio ha distribuzione binomiale {: #modello-binomiale }

Finora le indicatrici ci hanno permesso di trovare il numero medio di collisioni senza conoscere la probabilità di ogni possibile totale. Ora facciamo un passo diverso: cerchiamo un modello nel quale sia possibile descrivere anche **tutta la distribuzione del conteggio**. In particolare, vorremo rispondere a domande come «qual è la probabilità di osservare esattamente due fallimenti?».

La distribuzione binomiale risponde a questa esigenza quando le prove soddisfano alcune ipotesi precise.

!!! note "Un cenno storico"

    Il suo contesto storico è quello delle prove ripetute, come i lanci di una moneta: interessa contare i successi, senza distinguerne l'ordine. Il nome delle *prove di Bernoulli* ricorda **Jacob Bernoulli**, la cui *Ars Conjectandi* uscì postuma nel **1713**. «Binomiale», invece, richiama lo sviluppo della potenza di un binomio: i coefficienti del triangolo di Pascal, già incontrati nella Settimana 3, ricompaiono nelle probabilità di questi conteggi. Questo collegamento è presentato da Feller in *An Introduction to Probability Theory and Its Applications*, vol. I, cap. VI, §§ 1–2, pp. 104–106.

Partiamo da un esempio e individuiamo le ipotesi una alla volta.

Consideriamo un servizio che esegue quattro operazioni. Nel modello, ciascuna fallisce con probabilità $p=0{,}2$, e gli esiti delle quattro operazioni sono indipendenti. Chiamiamo $X$ il numero totale di fallimenti. Per costruirlo, definiamo $I_i$ come l'indicatrice del fallimento dell'operazione numero $i$, con $i$ da 1 a 4. Se, per esempio, falliscono soltanto la prima e la terza operazione, le indicatrici valgono $1,0,1,0$ e il loro totale è 2.

Per ogni esecuzione:

$$
X=I_1+I_2+I_3+I_4.
$$

La somma può valere 0 se nessuna operazione fallisce, 4 se falliscono tutte, oppure uno degli interi intermedi. Per definire il conteggio non abbiamo ancora usato l'indipendenza: la somma delle indicatrici conta i fallimenti qualunque sia il legame tra le operazioni. Le ipotesi sul loro comportamento servono quando vogliamo assegnare una distribuzione a quella somma.

Generalizziamo l'esempio. Osserviamo un numero fissato di **$n$ prove**; per ciascuna registriamo 1 se si verifica l'evento che vogliamo contare e 0 altrimenti. Se la probabilità del valore 1 è **lo stesso numero $p$ in ogni prova**, e se **tutte le prove sono indipendenti**, allora il totale ha distribuzione **binomiale di parametri $n$ e $p$**:

$$
X=\sum_{i=1}^{n}I_i,\qquad X\sim\operatorname{Binomiale}(n,p).
$$

La notazione $\sum_{i=1}^n I_i$ è una forma compatta per $I_1+I_2+\cdots+I_n$. Il numero $n$ è un intero positivo; $p$ è compreso tra 0 e 1. Per $n=1$, la distribuzione binomiale coincide con la distribuzione di Bernoulli.

Rileggiamo le ipotesi alla luce dell'esempio. Il numero $n$ è fissato prima di osservare gli esiti: nel servizio esaminiamo quattro operazioni, indipendentemente da quante ne falliranno. In ciascuna operazione distinguiamo soltanto l'evento «fallisce» dal suo complemento «riesce». Continuiamo a chiamare *successo* l'evento contato dal valore 1, anche se, nel linguaggio del servizio, è un guasto.

Il parametro $p$ deve poi essere comune a tutte le prove: qui ogni operazione fallisce con probabilità $0{,}2$. Infine, l'indipendenza riguarda l'intera famiglia: conoscere gli esiti delle altre operazioni non deve modificare la probabilità di fallimento di quella che stiamo considerando. Avere lo stesso $p$ e avere indipendenza sono due richieste distinte; una non garantisce l'altra.

Prima di attribuire una distribuzione binomiale a un conteggio, dobbiamo verificare queste condizioni nel modello. Se un guasto comune può far fallire tutte le operazioni insieme, l'indipendenza viene meno. Se alcune operazioni hanno probabilità di fallimento diverse, viene meno l'ipotesi di un unico parametro $p$. In entrambi i casi la somma delle indicatrici conta ancora correttamente i fallimenti, ma non possiamo attribuirle automaticamente la distribuzione binomiale.

### 13. La PMF: contare posizioni, pesare sequenze {: #pmf-binomiale }

Torniamo alle quattro operazioni indipendenti e cerchiamo la probabilità di **esattamente due fallimenti**. Per descrivere un'esecuzione completa scriviamo quattro bit, nell'ordine delle operazioni: 1 significa fallimento, 0 significa riuscita.

Consideriamo prima una sola sequenza, $1100$. Significa che falliscono la prima e la seconda operazione e riescono la terza e la quarta. Il suo verificarsi richiede che accadano tutti e quattro questi eventi. Per l'indipendenza moltiplichiamo le loro probabilità: un fattore $p$ per ciascun fallimento e un fattore $1-p$ per ciascuna riuscita. Otteniamo:

$$
p\cdot p\cdot(1-p)\cdot(1-p)=p^2(1-p)^2.
$$

Abbiamo calcolato la probabilità di quella **sequenza precisa**, non ancora la probabilità cercata. Per avere due fallimenti non è necessario che falliscano proprio le prime due operazioni: possono fallire, per esempio, la prima e la terza. Dobbiamo dunque raccogliere tutte le sequenze con due bit uguali a 1:

$$
1100,\quad1010,\quad1001,\quad0110,\quad0101,\quad0011.
$$

Per contarle basta scegliere le due posizioni occupate dagli 1. Una volta scelte quelle, le altre due devono contenere 0, quindi la sequenza è completamente determinata. Le scelte sono $\binom42=6$. Non ordiniamo le posizioni selezionate: scegliere le posizioni 1 e 3 è la stessa scelta che indicare le posizioni 3 e 1.

Guardiamo ora il peso di ciascuna sequenza. Cambiano le posizioni dei fallimenti, ma compaiono sempre due fattori $p$ e due fattori $1-p$. Poiché tutte le prove hanno lo stesso parametro e sono indipendenti, ogni sequenza ha la stessa probabilità $p^2(1-p)^2$.

Inoltre le sequenze sono esiti distinti e incompatibili: una stessa esecuzione non può produrne due diverse. Per trovare la probabilità di esattamente due fallimenti possiamo dunque sommare le sei probabilità uguali:

$$
P(X=2)=6p^2(1-p)^2.
$$

Sostituendo $p=0{,}2$, il peso di ciascuna sequenza è $0{,}04\cdot0{,}64$; moltiplicandolo per le sei sequenze otteniamo $6\cdot0{,}04\cdot0{,}64=0{,}1536$. Questa è la probabilità di due fallimenti, qualunque siano le due operazioni che falliscono.

Per $n$ prove e $k$ successi, dove $k$ è uno degli interi da 0 a $n$, lo stesso ragionamento dà:

$$
\boxed{P(X=k)=\binom nk p^k(1-p)^{n-k}.}
$$

La formula riassume lo stesso ragionamento in tre passaggi. Scegliamo prima **dove** si trovano i $k$ successi: il coefficiente $\binom nk$ conta le scelte di $k$ posizioni tra le $n$ disponibili. Le altre $n-k$ posizioni conterranno gli insuccessi.

Calcoliamo poi il peso di una singola sequenza. L'indipendenza permette di moltiplicare le probabilità; il parametro comune $p$ fa sì che il prodotto sia sempre $p^k(1-p)^{n-k}$, qualunque siano le posizioni scelte.

Infine sommiamo i pesi di tutte le sequenze con $k$ successi. Sono incompatibili e hanno lo stesso peso, quindi sommare equivale a moltiplicare quel peso per il loro numero. È così che i due fattori della formula si incontrano: **numero di sequenze × probabilità di ciascuna sequenza**.

L'ordine dei risultati rimane importante per descrivere una sequenza, ma la variabile $X$ conserva soltanto il numero di successi. È lo stesso passaggio incontrato con il numero di teste nei due lanci: esiti diversi possono dare lo stesso valore del conteggio.

Per $0<p<1$ la formula si applica direttamente a tutti gli interi $k$ da 0 a $n$; fuori da questo intervallo la probabilità è zero. I casi estremi si comprendono dal modello: se $p=0$, nessuna prova ha successo e $X=0$ con certezza; se $p=1$, tutte hanno successo e $X=n$ con certezza.

### 14. La media: nessuna somma della PMF {: #media-binomiale }

Ora che conosciamo la PMF, potremmo calcolare la media applicando la definizione:

$$
\mathbb{E}[X]=\sum_{k=0}^{n}k\binom nk p^k(1-p)^{n-k}.
$$

Questa espressione applica correttamente la definizione: per ciascun totale $k$, moltiplica quel totale per la sua probabilità e poi somma. Tuttavia, per arrivare a un risultato semplice dovremmo lavorare su tutta la somma con i coefficienti binomiali.

Possiamo fare il conto partendo da ciò che $X$ conta. Ogni successo aggiunge 1 attraverso la sua indicatrice, quindi $X$ è la somma di $n$ bit. Per ciascuno conosciamo già la media: è $p$, la probabilità del successo che quel bit segnala.

Scriviamo il passaggio senza saltare dalla somma al risultato. Sostituiamo a $X$ la somma delle sue indicatrici e applichiamo la linearità:

$$
\mathbb{E}[X]
=\mathbb{E}\!\left[\sum_{i=1}^n I_i\right]
=\sum_{i=1}^n\mathbb{E}[I_i].
$$

Siamo passati dalla **media di una somma** alla **somma delle medie**. A questo punto non ci servono più le probabilità dei diversi valori del totale: ci basta la media di ciascun addendo. Poiché ogni indicatrice ha media $p$, nella somma compare $p$ per $n$ volte:

$$
\sum_{i=1}^n\mathbb{E}[I_i]
=\sum_{i=1}^n p
=\boxed{np}.
$$

La formula $np$ ha dunque un significato diretto: somma il contributo medio $p$ delle $n$ prove. Nell'esempio delle quattro operazioni, il numero medio di fallimenti è $4\cdot0{,}2=0{,}8$.

In una singola esecuzione conteremo 0, 1, 2, 3 oppure 4 fallimenti. Il valore 0,8 descrive la media prevista dal modello; non va arrotondato a 1 per renderlo un conteggio possibile. La domanda sul numero medio e la domanda sull'esito di una singola esecuzione rimangono diverse.

Ripercorriamo il ruolo dell'indipendenza. Nella sezione precedente ci ha permesso di moltiplicare le probabilità per trovare il peso di ogni sequenza: serviva quindi a ricavare la PMF della distribuzione binomiale. Qui abbiamo usato soltanto la rappresentazione come somma di indicatrici e la linearità. Nessuno dei due passaggi richiede indipendenza.

Per verificarlo, immaginiamo che le quattro operazioni falliscano sempre insieme, con probabilità 0,2. Ciascuna, considerata da sola, ha ancora probabilità 0,2 di fallire, quindi ogni bit ha ancora media 0,2. La somma ha perciò media 0,8. Il totale può però valere soltanto 0 o 4: la sua distribuzione è diversa da quella binomiale. È proprio questa differenza che osserveremo nel laboratorio.

#### Esplora: stessa media, distribuzioni diverse {: #widget-binomiale }

Nel grafico seguente rimaniamo nel modello con prove indipendenti. Ogni barra corrisponde a un possibile numero di successi; la sua altezza è la probabilità di quel numero. I cursori cambiano il numero di prove $n$ e la probabilità di successo $p$.

Parti da $n=4$, $p=0{,}2$ e osserva la media indicata, 0,8. Poi imposta $n=8$, $p=0{,}1$. Il prodotto $np$ è ancora 0,8: prevediamo dunque la stessa media. Osserva però le altezze delle barre: la probabilità assegnata ai singoli conteggi cambia. Anche tra distribuzioni binomiali, la stessa media può accompagnarsi a distribuzioni diverse.

L'asse orizzontale rimane fisso durante l'esplorazione. Per questo mostra anche valori maggiori di $n$: le loro barre hanno altezza zero, perché non possiamo avere più successi che prove.

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
    xDomain: [0, 20], liveLabel: 'Distribuzione binomiale corrente', fn: massa,
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

Nel primo modello ogni operazione ha un esito indipendente dagli altri. Il totale può assumere tutti i valori da 0 a 4 e segue la distribuzione binomiale. Nel secondo modello un unico evento comune, di probabilità $0{,}2$, fa fallire tutte e quattro le operazioni; quando quell'evento non si verifica, riescono tutte. Il totale può quindi valere soltanto 0 oppure 4, con probabilità rispettivamente $0{,}8$ e $0{,}2$.

Prima di eseguire il codice, possiamo prevedere la media del secondo modello: $0\cdot0{,}8+4\cdot0{,}2=0{,}8$. È la stessa media $np$ del primo. Il grafico ci permetterà di vedere le differenze che questo singolo numero non mostra.

Per seguire il codice, leggiamo separatamente come vengono costruiti i due conteggi e come viene preparato il grafico.

**Nel modello indipendente**, `rng.random((prove, n))` genera numeri uniformi tra 0 e 1, disposti in una tabella. Ogni riga rappresenta un'esecuzione del servizio; le sue quattro colonne corrispondono alle quattro operazioni. Confrontare ciascun numero con `p` produce un valore vero con probabilità $p$: lo usiamo come indicatrice di fallimento. L'istruzione `.sum(axis=1)` somma lungo ogni riga, ottenendo il numero di fallimenti di quell'esecuzione. La variabile `indipendenti` raccoglie quindi un totale per ogni esecuzione simulata.

**Nel modello dipendente**, `rng.random(prove) < p` genera un solo bit per esecuzione. Quel bit decide se si verifica il guasto comune. Moltiplicandolo per `n`, il conteggio diventa 0 quando il guasto non si verifica e 4 quando si verifica. Le quattro operazioni condividono quindi la stessa decisione.

**Per il grafico**, `k` elenca i totali da 0 a 4 e `pmf` contiene le rispettive probabilità binomiali teoriche. `np.bincount` conta invece quante volte è comparso ciascun totale nel modello del guasto comune; dividendo per `prove` otteniamo le frequenze relative. Il grafico affianca dunque una distribuzione teorica e le frequenze osservate nell'altro modello. Gli `assert` controllano che le probabilità binomiali sommino a 1 e che la loro media sia $np$.

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
plt.bar(k - 0.2, pmf, width=0.4, label="Distribuzione binomiale teorica")
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

Dopo l'esecuzione, leggiamo prima le medie stampate: entrambe quelle simulate sono vicine al valore teorico 0,8. Le piccole differenze vengono dal numero finito di esecuzioni osservate.

Passiamo poi al grafico. Nel modello del guasto comune compaiono soltanto i totali 0 e 4: il servizio o funziona interamente oppure fallisce interamente. Nel modello binomiale hanno probabilità positiva anche i conteggi intermedi. Le due medie non mostrano questa differenza, mentre le barre la rendono visibile.

Abbiamo così individuato una domanda che la sola media lascia aperta: **quanto sono dispersi i risultati attorno al loro centro?** La sezione iniziale della [Settimana 5](../settimana_05/index.md#varianza) introduce una misura per cominciare a rispondere.

**Chiudiamo il percorso principale.** La distribuzione binomiale descrive un conteggio con ipotesi precise. La sua PMF usa combinatoria e indipendenza. La sua media usa indicatrici e linearità. Separare queste due derivazioni permette di capire sia ciò che il modello assume sia ciò che il risultato richiede davvero.

<span id="varianza"></span>
<span id="definizione-varianza"></span>
<span id="formula-varianza"></span>
<span id="varianza-binomiale"></span>

La trattazione della **varianza** è all'inizio della [Settimana 5](../settimana_05/index.md#varianza), dove sono distinti i contenuti richiesti all'esame dagli approfondimenti facoltativi.

## Lettura A — Pagamento, costo e gioco equo {: #giochi-equi .psi-facoltativo }

!!! info "Approfondimento facoltativo — fuori dall’esame"
    Questa lettura è facoltativa e non richiesta all’esame. Resta richiesto il significato del valore atteso come prezzo di una possibilità, introdotto nel percorso principale.

Torniamo alla domanda iniziale sul prezzo di una possibilità di guadagno. Abbiamo ora gli strumenti per rispondere, ma dobbiamo precisare quale somma di denaro stiamo studiando. Il pagamento ricevuto alla fine della partita e il guadagno di chi partecipa sono due quantità diverse: il secondo tiene conto anche di quanto è stato speso per giocare.

Riprendiamo il biglietto che paga 0 euro con probabilità $3/4$ e 8 euro con probabilità $1/4$. Il valore atteso del pagamento è 2 euro. Ma per partecipare dobbiamo acquistare il biglietto: il denaro ricevuto alla fine non coincide con il guadagno netto, perché da quell'importo dobbiamo sottrarre il prezzo pagato.

Indichiamo il pagamento con $X$ e il prezzo fisso del biglietto con $c$. Il **guadagno netto**, che chiamiamo $G$, è ciò che rimane dopo aver sottratto il prezzo dal pagamento: per ogni esito del gioco vale $G=X-c$.

Prima di calcolare qualsiasi media, questa uguaglianza descrive il saldo di una singola partita. Il prezzo è sempre lo stesso; il pagamento, e quindi il saldo, dipende dall'esito. Un valore negativo di $G$ indica una perdita, mentre un valore positivo indica un guadagno.

Se il biglietto costa 3 euro e non riceviamo alcun premio, il saldo è $0-3=-3$ euro: abbiamo perso il prezzo del biglietto. Se riceviamo 8 euro, il saldo è $8-3=5$ euro. I guadagni netti possibili sono quindi $-3$ e $5$, con le stesse probabilità dei rispettivi pagamenti. La loro media è:

$$
\mathbb{E}[G]=(-3)\cdot\frac34+5\cdot\frac14
=-\frac94+\frac54=-1\text{ euro}.
$$

Possiamo ritrovare il risultato anche senza costruire la distribuzione del guadagno netto. Abbiamo sottratto lo stesso prezzo a ogni pagamento: per linearità, questo sottrae lo stesso importo anche alla media. Quindi:

$$
\mathbb{E}[G]=\mathbb{E}[X]-c=2-3=-1.
$$

Il risultato $-1$ euro ci dice che, a quel prezzo, il modello prevede una perdita media di un euro per partita. Per rendere nullo il guadagno netto medio dobbiamo scegliere un prezzo diverso.

Si dice **equo in valore atteso** un gioco per cui la media di $G$ è zero. Poiché abbiamo trovato che tale media è il pagamento medio meno il prezzo, la condizione di equità richiede che le due quantità coincidano:

$$
\mathbb{E}[G]=0
\quad\Longleftrightarrow\quad
c=\mathbb{E}[X].
$$

Il pagamento medio è 2 euro, quindi il prezzo equo è 2 euro. Vediamo che cosa accade pagando proprio quel prezzo. Se non riceviamo il premio, il saldo è $-2$ euro, con probabilità $3/4$; se riceviamo 8 euro, il saldo è $6$ euro, con probabilità $1/4$.

Perdiamo dunque più spesso di quanto guadagniamo. Questo è compatibile con l'equità in valore atteso, perché i due saldi hanno importi diversi. Il contributo delle perdite alla media è $(-2)\cdot3/4=-1{,}5$; quello dei guadagni è $6\cdot1/4=1{,}5$. La loro somma è zero: il guadagno meno frequente compensa, nella media, le perdite più frequenti.

Quando controlliamo se un gioco è equo, dobbiamo quindi pesare **sia gli importi sia le probabilità**. Una probabilità di guadagnare del 50% non è la definizione di equità, e in questo esempio non è necessaria per ottenere media nulla.

Questo equilibrio non garantisce di recuperare il denaro dopo un numero fissato di partite. Se giochiamo $r$ volte alle stesse condizioni, la linearità dà valore atteso zero per il guadagno totale, ma il saldo concretamente osservato può essere positivo o negativo. La media descrive il modello, mentre il risultato di una sequenza rimane incerto. Per decidere se partecipare possono contare anche la dispersione dei risultati e la capacità di sostenere una perdita: il prezzo equo risponde alla domanda sul guadagno medio.

## Lettura B — Senza reinserimento: la distribuzione Ipergeometrica {: #ipergeometrica .psi-facoltativo }

!!! info "Approfondimento facoltativo — fuori dall’esame"
    Questa intera lettura, comprese la PMF e la derivazione della media dell’Ipergeometrica, è facoltativa e non richiesta all’esame. Resta richiesto il metodo delle indicatrici nelle applicazioni del percorso principale.

### 16. Le prove cambiano, ma i bit continuano a contare {: #modello-ipergeometrico }

Consideriamo un insieme di **5 moduli software**, dei quali **2 sono difettosi** e 3 sono sani. Vogliamo controllarne 2 e li scegliamo a caso, **senza reinserimento**. Questo significa che, dopo la prima scelta, il modulo selezionato viene tolto dall'insieme: la seconda scelta avverrà tra i quattro rimasti. I due moduli controllati saranno dunque distinti.

Chiamiamo $X$ il numero di difettosi nel campione scelto. Possiamo trovarne zero, uno oppure due. Anche qui stiamo contando quante volte si presenta una proprietà, ma dobbiamo capire se sono soddisfatte le ipotesi della distribuzione binomiale.

Per capire quale modello usare, immaginiamo di effettuare le due scelte in successione. All'inizio ci sono 2 difettosi su 5 moduli. Dopo la prima scelta restano quattro moduli, ma la loro composizione dipende da ciò che abbiamo estratto.

Esaminiamo le due possibilità. Se il primo modulo è difettoso, abbiamo tolto uno dei due difettosi iniziali: tra i quattro moduli rimasti ce n'è soltanto uno difettoso. La probabilità che anche il secondo lo sia è quindi $1/4$.

Se invece il primo modulo è sano, abbiamo tolto un sano e lasciato entrambi i difettosi. Tra i quattro rimasti i difettosi sono ancora due, quindi la probabilità per la seconda estrazione è $2/4$.

La probabilità della seconda estrazione cambia quando conosciamo il risultato della prima. Questo è il punto che impedisce di usare il modello binomiale: le due indicatrici non sono indipendenti. Possiamo ancora sommarle per contare i difettosi, ma dobbiamo descrivere la distribuzione del totale con un altro modello.

La distribuzione adatta a questo campionamento si chiama **Ipergeometrica**. La differenza essenziale è che scegliamo oggetti da una popolazione finita senza rimettere nella popolazione quelli già scelti.

Per passare al modello generale, diamo un nome alle tre quantità che descrivono il campionamento. $N$ è il numero totale di oggetti nella **popolazione**, cioè nell'insieme da cui scegliamo. $K$ è il numero di quelli che possiedono la proprietà da contare. $n$ è la dimensione del **campione**, cioè quanti oggetti distinti selezioniamo. Nell'esempio sono rispettivamente 5, 2 e 2.

Supponiamo che tutti i sottoinsiemi di $n$ oggetti abbiano la stessa probabilità di essere scelti. Il numero $X$ di oggetti con la proprietà presenti nel campione segue allora la **distribuzione Ipergeometrica**. I parametri sono interi e devono rispettare $0\le K\le N$ e $1\le n\le N$: non possiamo avere più oggetti con la proprietà che oggetti totali, né scegliere più oggetti di quanti ne siano disponibili.

### 17. La PMF: scegliere dentro due gruppi {: #pmf-ipergeometrica }

Per trovare la PMF dobbiamo assegnare una probabilità a ciascun numero possibile di difettosi. Descriviamo un esito completo come il sottoinsieme dei due moduli selezionati. Scegliere prima un certo modulo e poi un altro produce lo stesso campione che sceglierli nell'ordine inverso: per il controllo conta quali moduli abbiamo, non quale sia arrivato prima.

Contiamo quindi campioni **senza ordine**. Poiché nel modello sono tutti equiprobabili, per ogni valore del conteggio possiamo dividere il numero dei campioni favorevoli per il numero di tutti i campioni possibili.

I campioni possibili sono $\binom52=10$, perché scegliamo 2 moduli tra 5. Questo sarà il denominatore in tutti i calcoli.

Cominciamo dal valore $X=1$: vogliamo che il campione contenga **esattamente un difettoso**. Per costruirlo dobbiamo fare due scelte, una in ciascun gruppo: prendere un modulo tra i 2 difettosi e uno tra i 3 sani. Ogni difettoso scelto si può abbinare a ciascuno dei tre sani. I campioni favorevoli sono perciò $\binom21\binom31=2\cdot3=6$.

Il campione ottenuto identifica univocamente entrambe le scelte: nessuno dei sei campioni è contato due volte. Dividendo per i dieci campioni possibili troviamo $P(X=1)=6/10$.

Ripetiamo il ragionamento per gli altri due valori. Per avere zero difettosi, entrambi i moduli devono appartenere al gruppo dei tre sani: ci sono $\binom32=3$ campioni favorevoli. Per avere due difettosi, dobbiamo scegliere proprio i due difettosi disponibili: c'è $\binom22=1$ campione favorevole.

Dividendo anche questi conteggi per 10, otteniamo la PMF completa:

| Difettosi $x$ | 0 | 1 | 2 |
|---|---|---|---|
| $P(X=x)$ | $3/10$ | $6/10$ | $1/10$ |

Controlliamo la somma delle probabilità: i numeratori sono 3, 6 e 1 e sommano a 10, quindi le tre probabilità sommano a 1. Abbiamo suddiviso tutti i campioni possibili in tre gruppi incompatibili, secondo il numero di difettosi che contengono.

Nel caso generale vogliamo un campione di dimensione $n$ che contenga esattamente $k$ oggetti con la proprietà. Se $k$ vengono dal gruppo dei $K$ che la possiedono, i rimanenti $n-k$ devono venire dal gruppo dei $N-K$ che non la possiedono.

Contiamo separatamente le scelte nei due gruppi, moltiplichiamo i conteggi per formare il campione completo e dividiamo per il numero di tutti i campioni di dimensione $n$. Otteniamo:

$$
P(X=k)=\frac{\binom Kk\binom{N-K}{n-k}}{\binom Nn}.
$$

Leggiamo ciascun fattore. Il primo coefficiente al numeratore sceglie gli oggetti con la proprietà; il secondo sceglie quelli senza. Ogni scelta nel primo gruppo si può abbinare a ogni scelta nel secondo. Il campione completo identifica entrambe le scelte, perché i due gruppi sono distinti, quindi nessun campione viene contato due volte.

Il coefficiente al denominatore conta invece tutti i sottoinsiemi di dimensione $n$, senza imporre una composizione. La moltiplicazione al numeratore riguarda **numeri di scelte**: è una regola di conteggio. Non stiamo moltiplicando probabilità di estrazioni, né assumendo che siano indipendenti.

Prima di usare la formula, dobbiamo anche stabilire quali valori di $k$ sono realizzabili. Il campione contiene $n$ oggetti, ma i due gruppi possono non essere abbastanza grandi da permettere ogni composizione.

Per la parte con la proprietà occorre $0\le k\le K$: non possiamo sceglierne un numero negativo o superiore a quelli disponibili. Per la parte senza la proprietà occorre $0\le n-k\le N-K$, per la stessa ragione. Inoltre $k$ non può superare $n$. Se gli oggetti senza la proprietà non bastano a riempire il campione, almeno $n-(N-K)$ posti devono essere occupati da oggetti con la proprietà. Riunendo questi vincoli, i valori possibili sono gli interi che soddisfano:

$$
\max(0,n-(N-K))\le k\le\min(n,K).
$$

Per gli interi in questo intervallo vale la formula; fuori dall'intervallo la probabilità è zero. Per esempio, se scegliamo 4 moduli tra 5 e 2 sono difettosi, non possiamo ottenere zero difettosi: i moduli sani sono soltanto 3.

Questa formula è un'applicazione del principio di conteggio della settimana scorsa a due gruppi. Questa formula e la sua derivazione sono facoltative e non richieste all’esame: l’obiettivo della lettura è capire come costruirla a partire dalle scelte che descrivono un campione.

### 18. La media senza la PMF {: #media-ipergeometrica }

Nell'esempio piccolo, la media letta dalla tabella è:

$$
\mathbb{E}[X]=0\cdot\frac3{10}+1\cdot\frac6{10}
+2\cdot\frac1{10}=\frac8{10}=0{,}8.
$$

Il conto è breve perché la tabella ha soltanto tre valori. Se la popolazione e il campione fossero più grandi, potremmo trovare la media senza costruire e sommare tutta la PMF. Torniamo, come per le collisioni e la distribuzione binomiale, alle indicatrici.

Questa volta dobbiamo chiarire con cura quali probabilità assegnare ai singoli bit. Abbiamo appena visto che conoscere il primo modulo cambia le probabilità del secondo. Eppure, **prima di osservare qualsiasi estrazione**, ciascuna posizione ha la stessa probabilità di contenere un difettoso. Le due affermazioni riguardano informazioni diverse, e possono essere vere entrambe.

Per parlare di prima, seconda e successive posizioni, immaginiamo di estrarre i moduli in ordine, scegliendo ogni volta uniformemente tra quelli rimasti. Verifichiamo che questo procedimento descriva lo stesso campionamento usato per la PMF.

Una sequenza precisa di $n$ oggetti distinti ha probabilità $1/[N(N-1)\cdots(N-n+1)]$: per scegliere il primo oggetto il denominatore è $N$, per il secondo è $N-1$, e così via. Questo peso è uguale per tutte le sequenze di oggetti distinti. Ogni sottoinsieme di $n$ oggetti può poi comparire in $n!$ ordini diversi. Sommando lo stesso numero di pesi uguali per ogni sottoinsieme, tutti i sottoinsiemi ricevono la stessa probabilità. Possiamo quindi ragionare sulle posizioni senza cambiare il modello.

Definiamo ora $I_i$: vale 1 se l'oggetto nella posizione di estrazione $i$ possiede la proprietà, e 0 altrimenti. Prima di osservare le estrazioni, nessun oggetto è favorito per occupare una posizione fissata. Ciascuno degli $N$ oggetti ha la stessa probabilità di trovarsi lì.

Di questi oggetti, $K$ possiedono la proprietà. La probabilità che la posizione contenga uno di loro è dunque $P(I_i=1)=K/N$. Il ragionamento vale per ogni posizione, purché ci riferiamo alla probabilità **prima di conoscere gli esiti delle estrazioni**.

Qui dobbiamo distinguere due domande. La prima è: «qual è la probabilità che il secondo modulo sia difettoso, sapendo che il primo è difettoso?». Abbiamo già trovato $1/4$. La seconda è: «qual è la probabilità che il secondo modulo sia difettoso, prima di sapere qualsiasi cosa sul primo?». Quest'ultima probabilità è $2/5$, come per la prima posizione.

Possiamo verificarlo separando i due casi possibili per la prima estrazione. Il primo modulo è difettoso con probabilità $2/5$, e in quel caso la probabilità di un secondo difettoso è $1/4$. Il primo è sano con probabilità $3/5$, e in quel caso la probabilità per il secondo è $2/4$. I due casi sono incompatibili ed esauriscono le possibilità, quindi:

$$
P(I_2=1)=\frac25\cdot\frac14+\frac35\cdot\frac24
=\frac2{20}+\frac6{20}=\frac25.
$$

Il calcolo ritrova $2/5$ per la seconda posizione senza supporre che le estrazioni siano indipendenti. Abbiamo pesato le due probabilità condizionate con le probabilità dei due casi in cui ci possiamo trovare.

Ora sommiamo i bit delle $n$ posizioni: il numero totale di oggetti con la proprietà è $X=\sum_{i=1}^n I_i$. Ogni oggetto contato aggiunge 1 nella propria posizione e gli altri aggiungono 0. Per trovare la media usiamo la linearità, poi sostituiamo a ogni media il valore $K/N$. Stiamo sommando lo stesso contributo per $n$ volte:

$$
\mathbb{E}[X]=\sum_{i=1}^n\mathbb{E}[I_i]
=\sum_{i=1}^n\frac KN
=\boxed{\frac{nK}{N}}.
$$

Leggiamo il risultato attraverso i parametri del problema. La frazione $K/N$ descrive quanto è presente la proprietà nella popolazione. Il numero $n$ dice quanti oggetti scegliamo. Il loro prodotto è il numero medio di oggetti con la proprietà che troviamo nel campione.

Nell'esempio scegliamo $n=2$ moduli da una popolazione in cui $K/N=2/5$ sono difettosi. La media è quindi $2\cdot2/5=0{,}8$, lo stesso valore ottenuto dalla tabella. Abbiamo ritrovato il risultato con un conto che non richiede le probabilità dei singoli totali.

Il risultato ha la stessa forma $np$ della media della distribuzione binomiale, con $p=K/N$. Questo non rende uguali le due distribuzioni. Con reinserimento e scelte indipendenti avremmo un conteggio binomiale; senza reinserimento abbiamo il conteggio ipergeometrico. Le medie coincidono perché le singole indicatrici hanno la stessa media nei due modelli e la linearità vale in entrambi. Le probabilità dei diversi totali, invece, tengono conto del modo in cui le estrazioni sono legate.

## Esercizi: prima prova, poi apri la soluzione {: #esercizi }

Negli esercizi riprendiamo gli stessi passaggi del percorso. Prima di scegliere una formula, descrivi l'esperimento e scrivi a parole che cosa conta o misura la variabile. Poi individua le probabilità che ti servono. Nelle soluzioni puoi confrontare non soltanto il risultato, ma anche il motivo di ciascun passaggio.

### Esercizio 1 — Stessi lanci, una nuova variabile {: #esercizio-1 }

Lanciamo due volte una moneta onesta, in modo indipendente. Abbiamo già studiato $X$, il numero di teste. Ora definiamo $Y$ come il **numero di cambi tra il primo e il secondo lancio**: un cambio avviene quando il secondo risultato è diverso dal primo.

Comincia scrivendo gli esiti completi dei due lanci. Per ciascuno, annota il valore di $Y$: quali esiti producono un cambio? Raccogli poi gli esiti con lo stesso valore per costruire la PMF.

Confronta le due variabili: perché $TT$ e $CC$ hanno lo stesso valore di $Y$, ma valori diversi di $X$? Infine, usando le probabilità della PMF, calcola la media di $Y$.

??? esempio-svolto "Soluzione ragionata"
    Partiamo dagli esiti completi: $TT$, $TC$, $CT$, $CC$. Per l'onestà della moneta e l'indipendenza dei lanci, ciascuno ha probabilità $1/4$.

    Per assegnare il valore di $Y$, confrontiamo il secondo risultato con il primo. Tra due lanci c'è un solo passaggio da un risultato al successivo: se sono uguali non c'è alcun cambio, se sono diversi c'è un cambio. I valori possibili di $Y$ sono dunque 0 e 1.

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

Un dado onesto determina un pagamento $X$ in euro uguale al numero uscito. Calcola $\mathbb{E}[X]$ usando i sei pagamenti possibili e i loro pesi. Il valore medio trovato è un pagamento che puoi ricevere in una singola partita?

Supponi poi che partecipare costi 4 euro. Scrivi il guadagno netto in funzione di $X$ e calcolane la media.

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

Tre chiavi distinte ricevono indici indipendenti e uniformi tra due caselle. Per ciascuna delle tre coppie, definisci un bit che segnali se le due chiavi hanno lo stesso indice. Spiega perché la somma dei tre bit conta le coppie in collisione, poi calcolane la media.

Interpreta il risultato: può essere una probabilità? Infine, supponi di sapere che due bit delle coppie valgono 1. Che cosa puoi concludere sul terzo?

??? esempio-svolto "Soluzione ragionata"
    Chiamiamo le chiavi $a$, $b$ e $c$. Definiamo $I_{ab}$, $I_{ac}$ e $I_{bc}$ come le indicatrici delle collisioni nelle tre coppie. Per ogni assegnazione il numero di coppie in collisione è $C=I_{ab}+I_{ac}+I_{bc}$.

    Ogni addendo riguarda una coppia diversa: aggiunge 1 se quella coppia collide e 0 se non collide. In questo modo contiamo tutte le coppie, una volta ciascuna.

    Per calcolare la media, concentriamoci su una coppia fissata. Qualunque sia la casella della prima chiave, la seconda ne sceglie indipendentemente una tra due equiprobabili. Una sola è quella della prima: la probabilità di coincidenza è $1/2$. Ogni indicatrice ha quindi media $1/2$. Sommando queste tre medie per linearità otteniamo:

    $$
    \mathbb{E}[C]=\frac12+\frac12+\frac12=\frac32=1{,}5.
    $$

    Si tratta di un numero medio di coppie. Non può essere una probabilità, perché supera 1. Anzi, con tre chiavi e due caselle una collisione è certa: almeno due chiavi devono occupare la stessa casella, quindi $P(C\ge1)=1$.

    Se due indicatrici valgono 1, tutte e tre le chiavi hanno lo stesso indice. Per esempio, se $a$ coincide con $b$ e $a$ coincide con $c$, anche $b$ coincide con $c$. La terza indicatrice vale dunque 1 con certezza. Le tre indicatrici non sono mutuamente indipendenti, nonostante l'indipendenza degli indici delle chiavi. Per calcolare la media della loro somma abbiamo usato la linearità, che non richiede quell'indipendenza.

### Esercizio 4 — Quattro operazioni {: #esercizio-4 }

Quattro operazioni falliscono indipendentemente, ciascuna con probabilità 0,2. Definisci un'indicatrice per ogni fallimento e costruisci il conteggio totale $X$. Calcola prima la sua media, poi la probabilità di esattamente due fallimenti: quali informazioni usi nei due calcoli?

Considera ora un secondo modello: con probabilità 0,2 un guasto comune fa fallire tutte le operazioni insieme; altrimenti riescono tutte. Confronta la media e la probabilità di due fallimenti con quelle del primo modello. Spiega che cosa resta uguale e che cosa cambia.

??? esempio-svolto "Soluzione ragionata"
    Definiamo $I_i=1$ se fallisce l'operazione $i$ e $I_i=0$ altrimenti. Il totale è $X=I_1+I_2+I_3+I_4$. Nel primo modello le indicatrici sono indipendenti e hanno tutte parametro $0{,}2$, quindi il conteggio ha distribuzione binomiale di parametri 4 e $0{,}2$.

    Per la **media** usiamo la linearità: ciascuna indicatrice ha media $0{,}2$, quindi $\mathbb{E}[X]=4\cdot0{,}2=0{,}8$. Questo calcolo usa le quattro probabilità singole.

    Per la **probabilità di esattamente due fallimenti** dobbiamo descrivere gli esiti completi che producono quel totale. Scegliamo le due posizioni dei fallimenti in $\binom42=6$ modi. Per una sequenza fissata, l'indipendenza permette di moltiplicare le probabilità: due fattori $0{,}2$ per i fallimenti e due fattori $0{,}8$ per le riuscite. Il peso è $(0{,}2)^2(0{,}8)^2$ per ciascuna delle sei sequenze. Poiché sono incompatibili, sommiamo i loro pesi:

    $$
    P(X=2)=6\cdot0{,}04\cdot0{,}64=0{,}1536.
    $$

    Passiamo al guasto comune. Ciascuna operazione fallisce esattamente quando si verifica quel guasto, quindi ogni indicatrice ha ancora probabilità $0{,}2$ di valere 1. Le quattro medie singole rimangono uguali a prima e, per linearità, anche la loro somma è ancora $0{,}8$.

    Il legame tra i bit è però cambiato: ora sono sempre uguali tra loro. Il totale vale 0 con probabilità $0{,}8$ e 4 con probabilità $0{,}2$. Non ci sono esecuzioni con esattamente due fallimenti, quindi $P(X=2)=0$.

    Il confronto mostra esattamente che cosa resta uguale e che cosa cambia: le probabilità dei singoli fallimenti e la media del totale restano uguali, mentre la distribuzione del totale cambia.

### Esercizio 5 — Un campione senza reinserimento (lettura) {: #esercizio-5 .psi-facoltativo }

!!! info "Approfondimento facoltativo — fuori dall’esame"
    Questo esercizio accompagna la Lettura B ed è facoltativo e non richiesto all’esame.

Tra 10 moduli, 3 sono difettosi. Scegli un sottoinsieme di 4 moduli, dando la stessa probabilità a tutti i sottoinsiemi di quella dimensione. Qual è il numero medio di difettosi nel campione?

Prima di usare la formula di una distribuzione, chiediti se questo conteggio soddisfa le ipotesi della distribuzione binomiale. Poi costruisci la probabilità di trovare esattamente un difettoso: quanti campioni hanno la composizione richiesta e quanti campioni sono possibili in tutto?

??? esempio-svolto "Soluzione ragionata"
    Per la media possiamo immaginare di estrarre i quattro moduli in ordine, senza reinserimento. Associamo un'indicatrice a ciascuna posizione: vale 1 se vi compare un difettoso, 0 altrimenti. Prima di osservare le estrazioni, ciascuna posizione ha probabilità $3/10$ di contenere un difettoso, perché i difettosi sono 3 sui 10 moduli della popolazione.

    Il totale è la somma delle quattro indicatrici. Non ci occorre la loro indipendenza per calcolare la media: per linearità sommiamo i quattro contributi $3/10$:

    $$
    \mathbb{E}[X]=4\cdot\frac3{10}=1{,}2.
    $$

    Il conteggio è Ipergeometrico. Non segue una distribuzione binomiale, perché togliere un modulo modifica la composizione di quelli rimasti e lega tra loro gli esiti delle estrazioni.

    Per la probabilità di esattamente un difettoso, torniamo invece ai sottoinsiemi. Un campione favorevole deve contenere 1 modulo del gruppo dei 3 difettosi e 3 moduli del gruppo dei 7 sani. Possiamo fare la prima scelta in $\binom31=3$ modi e la seconda in $\binom73=35$ modi. Abbinandole otteniamo $3\cdot35=105$ campioni favorevoli.

    Tutti i campioni possibili di 4 moduli sono $\binom{10}4=210$ e sono equiprobabili. Dividiamo quindi i due conteggi:

    $$
    P(X=1)=\frac{\binom31\binom73}{\binom{10}4}
    =\frac{105}{210}=\frac12.
    $$

    La media 1,2 e la probabilità $1/2$ rispondono a due domande diverse: quanti difettosi troviamo in media e quanto è probabile trovarne esattamente uno.

## Errori da evitare {: #errori }

Molti errori di questo percorso nascono quando passiamo da un oggetto matematico a un altro senza accorgercene. Un valore della variabile, la probabilità di quel valore e la media della variabile sono numeri con ruoli diversi. Prima di fare un conto, conviene quindi completare una frase: «la mia variabile misura… e io sto cercando…».

La tabella raccoglie alcune confusioni frequenti e una domanda con cui riconoscerle. Se un risultato non ti convince, prova a rispondere alla domanda prima di rifare le operazioni: spesso il problema è nel significato assegnato ai numeri, più che nell'aritmetica.

| Errore | Domanda da rifare |
|---|---|
| Confondere $x$ con $p_X(x)$ | Stai scrivendo un numero di teste o una probabilità? |
| Fare la media semplice dei valori diversi | Quei valori hanno davvero tutti lo stesso peso? |
| Trattare la media come il risultato della prossima prova | Su quale faccia del dado si trova 3,5? |
| Usare $\mathbb{E}[C]$ come $P(C\ge1)$ | Un esperimento con tre coppie quanto pesa nei due conti? |
| Richiedere indipendenza per la linearità | Che cosa è accaduto nella tabella con $X+Y=1$? |
| Attribuire una distribuzione binomiale a ogni somma di bit | Le prove sono indipendenti e hanno tutte lo stesso $p$? |
| Contare caselle occupate invece di coppie | Tre chiavi nella stessa casella producono quante coppie? |
| Chiamare equo un gioco perché si vince metà delle volte | Hai pesato anche gli importi persi e ricevuti? |

## Riepilogo e takeaway per chi scrive software {: #riepilogo }

!!! info "Per l’esame"
    Questa sintesi comprende anche gli approfondimenti: giochi equi e Ipergeometrica restano facoltativi e non richiesti all’esame. Il perimetro richiesto è quello indicato [in apertura](#esame). La varianza è trattata nella [Settimana 5](../settimana_05/index.md#varianza), con indicazioni specifiche per l’esame.

Il percorso della settimana parte da una distinzione fondamentale. L'esperimento produce un esito completo; la variabile aleatoria associa a quell'esito un numero che risponde alla nostra domanda. Possiamo contare teste, guasti, confronti o coppie in collisione, ma dobbiamo scegliere esplicitamente quale quantità vogliamo studiare.

La PMF descrive poi come la probabilità si distribuisce tra i valori di quella variabile. Il valore atteso usa queste probabilità come pesi e riassume la distribuzione con una media. Questa media può essere un valore che non osserveremo mai in una singola prova, come 3,5 per il dado o 0,8 per il conteggio dei fallimenti. Il suo significato è quello di centro della distribuzione, non di previsione esatta del prossimo risultato.

Il passaggio successivo è la linearità. Quando una quantità è la somma di più contributi, possiamo trovare la sua media sommando le medie dei contributi. Per esempio, se il costo di un programma è la somma dei costi delle sue parti, possiamo studiare una parte alla volta, senza dover prima costruire la distribuzione del costo totale.

Per i conteggi, i contributi più semplici sono le indicatrici. Assegniamo un bit a ciascun evento da contare e verifichiamo che la loro somma conti proprio gli oggetti richiesti. Poi facciamo la media: ogni bit contribuisce con la probabilità del proprio evento. È lo stesso procedimento che abbiamo usato per coppie in collisione, fallimenti e difettosi nel campione.

La dipendenza tra le parti non impedisce questo procedimento. Richiede però attenzione quando vogliamo dire di più sulla distribuzione del totale. Per attribuire una distribuzione binomiale a una somma di indicatrici servono prove indipendenti con lo stesso parametro $p$; per il campionamento uniforme senza reinserimento abbiamo invece il modello Ipergeometrico. La media può avere una forma simile in modelli diversi, mentre le probabilità dei singoli totali cambiano.

Per l'informatico, la domanda decisiva viene **prima** della formula: che cosa stiamo misurando? Coppie in collisione, caselle occupate e probabilità di un incidente sono quantità diverse. Un'analisi del caso medio ha valore soltanto se dichiara anche il modello degli input o della casualità interna al programma.

Vediamo questa esigenza in un esempio algoritmico. Una ricerca lineare visita gli elementi di una lista dall'inizio e si ferma quando trova la chiave. Supponiamo che la lista contenga $n$ elementi distinti, che la chiave cercata sia presente e che ciascuna posizione sia equiprobabile nel modello.

Definiamo $X$ come il numero di confronti eseguiti. Se la chiave è nella prima posizione, basta un confronto; se è nella seconda, ne servono due, perché abbiamo già esaminato il primo elemento. Proseguendo così, se è nell'ultima posizione dobbiamo fare $n$ confronti.

Il costo coincide dunque con la posizione della chiave. Per l'ipotesi di posizioni equiprobabili, $X$ assume ciascun valore da 1 a $n$ con probabilità $1/n$. Facciamo la media pesata dei costi e usiamo la formula della somma degli interi:

$$
\mathbb{E}[X]=\frac{1+2+\cdots+n}{n}
=\frac{n(n+1)}{2n}=\frac{n+1}{2}.
$$

Questo numero dipende dalle ipotesi appena dichiarate. Se la chiave può mancare, una ricerca senza successo visita tutta la lista e dobbiamo includere anche la probabilità di quel caso. Se alcune posizioni sono più probabili di altre, dobbiamo usare i loro pesi invece di $1/n$. Perciò un'affermazione sul costo medio di un algoritmo deve sempre specificare il modello degli input o della casualità interna.

La media non descrive tutto. Un servizio con guasti indipendenti e uno con guasti comuni possono avere la stessa media dei fallimenti e comportamenti molto diversi. Nella [Settimana 5](../settimana_05/index.md#varianza) introdurremo la varianza per misurare quella differenza.

!!! info "Per l’esame"
    I ragionamenti da saper ricostruire sono quelli indicati [in apertura](#esame).
    Dovresti saper partire da un esperimento semplice, definire la variabile che ti interessa e costruirne la PMF, spiegando quali esiti contribuiscono a ciascun valore. Da quella tabella dovresti saper calcolare il valore atteso e interpretarlo, anche quando non è un risultato possibile.

    Dovresti poi saper definire l'indicatrice di un evento e ricavare $\mathbb{E}[I_A]=P(A)$ dalla definizione di media. Per usare questo strumento su un conteggio, occorre spiegare perché la somma delle indicatrici conta esattamente gli oggetti richiesti, prima di applicare la linearità.

    Infine, per il conteggio binomiale dovresti saper distinguere due ragionamenti: le ipotesi di indipendenza e probabilità comune permettono di ricavare la PMF; la rappresentazione come somma di indicatrici permette di ricavare la media $np$. Chiarire quali ipotesi intervengono in ciascun passaggio è parte della spiegazione matematica.

## Riferimenti e letture {: #riferimenti }

* **Christiaan Huygens**, *De ratiociniis in ludo aleae* (1657), introduzione e Proposizioni I–III: [traduzione inglese del 1714](https://math.dartmouth.edu/~doyle/docs/huygens/huygens/). Fonte primaria del percorso sul valore di una possibilità di guadagno. Gli esempi con euro e software di questa pagina sono esempi didattici moderni.
* **Chris Piech**, *Probability for Computer Scientists*, Stanford, [portale del corso](https://chrispiech.github.io/probabilityForComputerScientists/): riferimento contemporaneo per variabili discrete, aspettazione, linearità e modelli di conteggio. Le derivazioni qui sono sviluppate passo per passo con gli esempi della dispensa.
* **Jerry Cain**, Stanford CS109, [esercitazione del 13 aprile 2021, soluzioni](https://web.stanford.edu/class/archive/cs/cs109/cs109.1216/sections/02_section_soln.pdf): esempi del metodo delle indicatrici e della linearità senza indipendenza.
* **William Feller**, *An Introduction to Probability Theory and Its Applications*, vol. I (prima edizione 1950): riferimento classico del corso per il calcolo dell'aspettazione. [Scheda bibliografica e copie digitali su Open Library](https://openlibrary.org/search?q=William+Feller+An+Introduction+to+Probability+Theory+and+Its+Applications). La linearità è presentata come proprietà matematica, senza attribuirne l'invenzione a Feller.

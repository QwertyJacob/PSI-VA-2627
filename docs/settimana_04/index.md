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

Ora immagina 23 chiavi distinte da inserire in una tabella hash. Una funzione hash assegna a ogni chiave un indice di casella. Due chiavi diverse possono ricevere lo stesso indice: questa è una **collisione**, già descritta nella [Settimana 3, sezione sulle tabelle hash](../settimana_03/index.md#hash). Anche qui le coppie da controllare sono 253.

Per ora fermiamoci al conteggio. Sapere quante coppie esistono non dice quante finiranno nella stessa casella. Dobbiamo distinguere una quantità deterministica, **il numero di coppie possibili**, da una quantità incerta, **il numero di coppie che collidono**. È proprio per parlare della seconda che costruiremo gli strumenti di questa settimana.

!!! info "Come leggere questa dispensa"
    Gli Atti I–V formano il percorso principale: variabili aleatorie, valore atteso, indicatrici, linearità e Binomiale. Seguono tre letture: varianza, giochi equi e campionamento senza reinserimento. I giochi equi e l'Ipergeometrica sono approfondimenti fuori dal nucleo d'esame orale. La varianza qui introduce il linguaggio della dispersione; le sue applicazioni saranno riprese nelle prossime settimane.

## Atto I — Vendere una possibilità: la domanda di Huygens {: #huygens }

Nella partita interrotta della settimana scorsa, un giocatore non possiede ancora la posta: possiede una possibilità di vincerla. Se volesse cedere il proprio posto a un'altra persona, quale prezzo dovrebbe chiedere?

**Christiaan Huygens**, nel *De ratiociniis in ludo aleae*, pubblicato in latino nel **1657**, tratta proprio il valore di una possibilità di guadagno. L'introduzione considera anche la vendita del posto di un giocatore. La Proposizione I assegna a due premi equiprobabili la metà della loro somma; la Proposizione III passa a casi con pesi diversi. La [traduzione inglese del 1714, disponibile a Dartmouth](https://math.dartmouth.edu/~doyle/docs/huygens/huygens/), permette di leggere questi passaggi. Qui li esprimeremo con il linguaggio moderno delle variabili aleatorie: non è la notazione usata da Huygens.

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

Non stiamo introducendo una nuova regola della probabilità: stiamo riscrivendo l'additività per eventi disgiunti nel linguaggio dei numeri.

**Fermiamoci un momento.** L'esperimento produce un esito. La variabile legge quell'esito e produce un numero. La PMF dice quanto peso probabilistico riceve ciascun numero. Sono tre oggetti diversi, e ciascuno svolge un compito preciso.

## Atto III — Il valore atteso: pesare i risultati {: #valore-atteso }

### 4. Perché la media semplice non basta {: #media-pesata }

Consideriamo un pagamento $X$ che vale 0 euro con probabilità $3/4$ e 8 euro con probabilità $1/4$. Fare $(0+8)/2=4$ tratterebbe i due pagamenti come equiprobabili. Non lo sono: lo zero ha un peso tre volte maggiore.

Per vedere il conto, immaginiamo una lista ideale di quattro pagamenti con le proporzioni del modello: 0, 0, 0, 8. La sua media è:

$$
\frac{0+0+0+8}{4}=2.
$$

Possiamo raccogliere insieme i tre zeri e riscrivere lo stesso conto:

$$
0\cdot\frac34+8\cdot\frac14=2.
$$

La lista è un aiuto per capire i pesi, **non la previsione di ciò che accadrà in quattro partite**. Quattro partite vere potrebbero dare quattro zeri o due premi. Il modello non promette di rispettare le proporzioni in ogni piccolo gruppo di prove.

Definiamo ora il **valore atteso**, chiamato anche **media** o **aspettazione**, di una variabile discreta:

$$
\boxed{\mathbb{E}[X]=\sum_x x\,p_X(x).}
$$

La lettera $\mathbb{E}$ indica l'operazione di aspettazione. Per ogni valore $x$, moltiplichiamo **il valore** per **la sua probabilità**, poi sommiamo tutti i contributi. Se $X$ misura euro, $\mathbb{E}[X]$ misura euro; se conta confronti, la media è espressa in confronti.

Per una lista finita il conto è sempre ben definito. Per liste infinite occorre controllare la convergenza: tutte le proprietà che useremo per variabili con segno valgono quando $\sum_x |x|p_X(x)<\infty$, cioè quando il valore atteso assoluto è finito. Questa cautela non crea difficoltà negli esempi finiti della settimana.

Riprendiamo il numero di teste nei due lanci:

$$
\mathbb{E}[X]=0\cdot\frac14+1\cdot\frac12+2\cdot\frac14
=0+\frac12+\frac12=1.
$$

I due modi di fare il conto hanno la stessa struttura: pagamenti e teste sono numeri ai quali assegniamo pesi probabilistici.

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

### 6. Laboratorio: un conto esatto prima della simulazione {: #lab-pmf }

Il primo script prende una PMF come lista di coppie: ogni coppia contiene un valore e il suo peso. Usa frazioni esatte per distinguere la matematica del modello dagli arrotondamenti del computer. Non simula partite: calcola direttamente la media.

<div class="psi-exec" markdown="1">
```python
from fractions import Fraction

pagamenti = [(0, Fraction(3, 4)), (8, Fraction(1, 4))]
teste = [(0, Fraction(1, 4)), (1, Fraction(1, 2)),
         (2, Fraction(1, 4))]


def media(pmf):
    # Una PMF deve distribuire tutta la probabilità, senza pesi negativi.
    assert all(peso >= 0 for _, peso in pmf)
    assert sum(peso for _, peso in pmf) == 1
    return sum(valore * peso for valore, peso in pmf)


print("Pagamento medio:", media(pagamenti), "euro")
print("Numero medio di teste:", media(teste))
assert media(pagamenti) == 2
assert media(teste) == 1
```
</div>

Il risultato è 2 euro e 1 testa. Prova a sostituire il premio 8 con 12: la probabilità non cambia, ma cambia la quantità che essa pesa. Poi prova a cambiare i pesi in $1/2$ e $1/2$. Se assegni pesi la cui somma non è 1, il controllo interrompe l'esecuzione: prima di fare una media, dobbiamo avere una distribuzione valida.

**Che cosa abbiamo costruito?** Una PMF racconta tutto il modello discreto della variabile. Il valore atteso ne conserva un solo numero: il centro pesato. È utile proprio perché semplifica; quella semplificazione, però, perde informazioni.

## Atto IV — La linearità: scomporre un conto difficile {: #linearita }

### 7. Sommare le medie, anche quando i risultati dipendono {: #linearita-dipendenza }

Un programma esegue due operazioni. La prima richiede un numero incerto $X$ di confronti; la seconda un numero incerto $Y$. Il numero totale è $X+Y$. Per trovare il costo medio, dobbiamo elencare tutti i valori possibili del totale?

Prima vediamo un esempio minuscolo. Lanciamo una sola moneta onesta. Se esce testa, assegniamo $X=1$ e $Y=0$; se esce croce, assegniamo $X=0$ e $Y=1$.

| Esito | Probabilità | $X$ | $Y$ | $X+Y$ |
|---|---|---|---|---|
| Testa | $1/2$ | 1 | 0 | 1 |
| Croce | $1/2$ | 0 | 1 | 1 |

La somma vale sempre 1, quindi la sua media è 1. D'altra parte, $\mathbb{E}[X]=1/2$ e $\mathbb{E}[Y]=1/2$: anche la somma delle medie vale 1.

Le due variabili sono **dipendenti**: sapere che $X=1$ ci dice con certezza che $Y=0$. Eppure il conto funziona. Questo è il punto da ricordare della **linearità del valore atteso**. Se $a$, $b$ e $c$ sono numeri fissati, e le medie esistono finite:

$$
\boxed{\mathbb{E}[aX+bY+c]
=a\mathbb{E}[X]+b\mathbb{E}[Y]+c.}
$$

Non occorre che $X$ e $Y$ siano indipendenti. Ponendo $a=b=1$ e $c=0$ ritroviamo $\mathbb{E}[X+Y]=\mathbb{E}[X]+\mathbb{E}[Y]$. La stessa regola si applica a qualunque **somma finita** di variabili.

Per capire il perché non servono distribuzioni congiunte. Su uno spazio campionario finito possiamo calcolare la media pesando gli esiti completi. Indichiamo un esito con $\omega$ e la sua probabilità con $P(\{\omega\})$. Sommare $X(\omega)P(\{\omega\})$ su tutti gli esiti equivale alla formula già data: gli esiti che producono lo stesso valore di $X$ si possono raccogliere insieme.

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

Non abbiamo moltiplicato probabilità di eventi diversi: non è entrata alcuna ipotesi di indipendenza. I coefficienti $a$ e $b$ escono dalla somma perché sono costanti; anche $c$ contribuisce soltanto $c$, perché i pesi sommano a 1.

Un'applicazione immediata: se $X$ è un pagamento e $c$ il costo fisso del biglietto, il guadagno netto è $X-c$, con media $\mathbb{E}[X]-c$. Torneremo su questa distinzione nella lettura sui giochi equi.

### 8. Le indicatrici: trasformare una domanda in un bit {: #indicatrici }

Immagina di controllare se una richiesta fallisce. Registri 1 se fallisce e 0 se non fallisce. Non stai inventando un altro esperimento: stai leggendo l'esperimento esistente con una regola numerica.

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

Il contributo del valore 0 scompare; il contributo del valore 1 lascia la probabilità. Questa identità è piccola, ma consente un cambiamento di metodo: **per contare in media, possiamo sommare probabilità**.

### 9. Una collisione alla volta {: #collisioni }

Torniamo alle chiavi della tabella hash. Cominciamo con tre chiavi, chiamate $a$, $b$ e $c$. Le coppie sono $(a,b)$, $(a,c)$ e $(b,c)$. Per ciascuna coppia registriamo 1 se le due chiavi ricevono lo stesso indice, 0 altrimenti.

Chiamiamo questi bit $I_{ab}$, $I_{ac}$ e $I_{bc}$. Il numero $C$ di **coppie in collisione** è:

$$
C=I_{ab}+I_{ac}+I_{bc}.
$$

Non è una formula probabilistica: è un'identità che vale per ogni assegnazione concreta. Se tutte le chiavi hanno indici diversi, il totale è 0. Se $a$ e $b$ condividono l'indice e $c$ no, è 1. Se tutte e tre finiscono nella stessa casella, è 3: ci sono tre coppie, anche se la casella occupata è una sola.

**Specifichiamo il modello.** La tabella ha $m$ caselle, con $m$ intero positivo. Per le chiavi considerate, gli indici sono indipendenti e ciascuno è uniforme tra le $m$ caselle. La probabilità che una coppia condivida l'indice è $1/m$: fissato l'indice della prima chiave, soltanto una delle $m$ possibilità per la seconda coincide con esso.

Queste sono ipotesi del nostro modello di hashing. Una funzione deterministica su chiavi fissate produce indici fissati: per applicare la probabilità occorre spiegare quale parte è casuale, per esempio la scelta della funzione da una famiglia randomizzata. Qui studiamo il modello ideale dichiarato, non tutte le funzioni hash esistenti.

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

Portiamo la media dentro la somma, poi sostituiamo ciascuna media con $1/m$:

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

Perché i conti differiscono? La media di $C$ pesa il numero di coppie. Se una classe contiene tre persone con lo stesso compleanno, quella classe contribuisce 3 alla media delle coppie. Per l'evento «almeno una collisione» contribuisce soltanto 1 al conteggio delle classi in cui l'evento è accaduto.

Un caso piccolo mostra anche il limite del metodo. Con tre chiavi in due caselle, $\mathbb{E}[C]=3/2=1{,}5$. Nessuna probabilità può valere 1,5. Inoltre, non si può avere esattamente due coppie in collisione: se $a$ coincide con $b$ e $a$ coincide con $c$, allora coincide anche la terza coppia. Il conteggio $C$ può valere soltanto 1 oppure 3. **Le indicatrici delle coppie non sono mutuamente indipendenti**, anche nel modello con indici indipendenti. La linearità ci risparmia proprio questo problema.

### 11. Laboratorio: contare coppie e contare esperimenti {: #lab-hash }

Il secondo script genera assegnazioni casuali degli indici. Per ogni assegnazione misura due oggetti diversi: il numero di coppie in collisione e il bit «c'è almeno una collisione». Il parametro `prove` indica quante assegnazioni generiamo; non è il numero di chiavi.

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

Un servizio esegue quattro operazioni. Nel modello, ciascuna fallisce con probabilità $p=0{,}2$, indipendentemente dalle altre. Chiamiamo $X$ il numero di fallimenti e $I_i$ il bit che registra se fallisce l'operazione numero $i$, con $i$ da 1 a 4.

Per ogni esecuzione:

$$
X=I_1+I_2+I_3+I_4.
$$

La variabile $X$ può valere 0, 1, 2, 3 o 4. Generalizziamo: se abbiamo **$n$ prove**, ciascuna con due esiti, **la stessa probabilità $p$** del valore 1 e **indipendenza tra tutte le prove**, allora il numero totale di successi ha distribuzione **Binomiale di parametri $n$ e $p$**:

$$
X=\sum_{i=1}^{n}I_i,\qquad X\sim\operatorname{Binomiale}(n,p).
$$

La notazione $\sum_{i=1}^n I_i$ è una forma compatta per $I_1+I_2+\cdots+I_n$. Il numero $n$ è un intero positivo; $p$ è compreso tra 0 e 1. Per $n=1$, la Binomiale coincide con una Bernoulli.

Questo modello non si applica automaticamente a qualunque lista di fallimenti. Un guasto comune può far fallire tutte le operazioni insieme; probabilità diverse possono dipendere dall'operazione. La somma dei bit continua a contare, ma il nome «Binomiale» richiede tutte le ipotesi dichiarate.

### 13. La PMF: contare posizioni, pesare sequenze {: #pmf-binomiale }

Nel caso delle quattro operazioni, vogliamo esattamente due fallimenti. Scriviamo 1 per un fallimento e 0 per un'operazione riuscita. Una sequenza possibile è $1100$.

Per indipendenza, la sua probabilità è:

$$
p\cdot p\cdot(1-p)\cdot(1-p)=p^2(1-p)^2.
$$

Ma non è l'unica sequenza con due fallimenti. Le posizioni dei due 1 si scelgono in $\binom42=6$ modi. Le sei sequenze sono disgiunte e hanno lo stesso peso, perché tutte contengono due 1 e due 0. Quindi:

$$
P(X=2)=6p^2(1-p)^2.
$$

Con $p=0{,}2$ il conto è $6\cdot0{,}04\cdot0{,}64=0{,}1536$.

Per $n$ prove e $k$ successi, dove $k$ è uno degli interi da 0 a $n$, lo stesso ragionamento dà:

$$
\boxed{P(X=k)=\binom nk p^k(1-p)^{n-k}.}
$$

Il coefficiente binomiale conta **dove** si trovano i successi. Il fattore $p^k$ pesa i $k$ successi; il fattore $(1-p)^{n-k}$ pesa gli altri esiti. Per $p=0$ il totale è sempre 0, per $p=1$ è sempre $n$: questi casi si leggono direttamente dal modello, senza fare conti ambigui con potenze ai bordi.

### 14. La media: nessuna somma della PMF {: #media-binomiale }

Possiamo inserire la PMF nella definizione di media e sommare su tutti i valori di $k$. È una strada possibile. Ma abbiamo già un'altra rappresentazione di $X$, la somma delle indicatrici.

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

Il terzo script confronta due modelli con $n=4$ e $p=0{,}2$. Nel primo le operazioni falliscono indipendentemente. Nel secondo un unico evento comune decide se falliscono tutte e quattro. In entrambi ogni singola operazione fallisce con probabilità 0,2.

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

Confrontiamo due pagamenti. Il primo è sempre 5 euro. Il secondo vale 0 oppure 10 euro, ciascuno con probabilità $1/2$. Entrambi hanno media 5 euro. Ma il primo è certo e il secondo oscilla.

Chiamiamo $\mu$ la media di una variabile $X$: $\mu=\mathbb{E}[X]$. Nel secondo pagamento, gli scarti dalla media sono $0-5=-5$ e $10-5=5$. La loro media è zero: gli scarti negativi cancellano quelli positivi. Per misurare la dispersione, eleviamo ogni scarto al quadrato prima di farne la media.

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

Il risultato è in **euro al quadrato**. La varianza misura quanto i valori si discostano dalla media, con peso maggiore agli scarti grandi. Non è una probabilità e non è un importo da pagare. Se la lista di valori è infinita, questa misura può essere infinita; qui tutti gli esempi sono finiti.

### 17. Un modo equivalente di fare il conto {: #formula-varianza }

Espandiamo il quadrato, usando $\mu$ come costante:

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

Per calcolare $\mathbb{E}[X^2]$ usiamo gli stessi pesi della PMF, ma eleviamo i **valori** al quadrato: $\mathbb{E}[X^2]=\sum_x x^2p_X(x)$. Non dobbiamo elevare al quadrato le probabilità.

Per una Bernoulli $I$ di parametro $p$, $I^2=I$: sia $0^2=0$ sia $1^2=1$. Quindi $\mathbb{E}[I^2]=p$ e:

$$
\operatorname{Var}(I)=p-p^2=p(1-p).
$$

### 18. La varianza binomiale e l'ipotesi che la rende possibile {: #varianza-binomiale }

Per la Binomiale $X=\sum_{i=1}^n I_i$, espandere il quadrato produce i quadrati dei singoli bit e due copie di ogni prodotto tra bit diversi:

$$
X^2=\sum_{i=1}^n I_i^2+2\sum_{1\le i<j\le n}I_iI_j.
$$

Un esempio con due bit chiarisce il fattore 2: $(I_1+I_2)^2=I_1^2+I_1I_2+I_2I_1+I_2^2$. I due prodotti centrali sono uguali.

Ogni $I_i^2$ ha media $p$. Il prodotto $I_iI_j$ vale 1 soltanto quando entrambe le prove hanno successo. **Qui usiamo l'indipendenza**: la probabilità dei due successi è $p\cdot p=p^2$. La media di quel prodotto, che è un'indicatrice, è quindi $p^2$.

Ci sono $\binom n2$ coppie. Per linearità:

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

Nel modello indipendente del laboratorio, la varianza è $4\cdot0{,}2\cdot0{,}8=0{,}64$. Nel modello del guasto comune, il numero di fallimenti è $4I$, dove $I$ è un solo bit. Il quadrato dello scarto diventa $16(I-p)^2$, quindi la varianza è $16p(1-p)=2{,}56$.

La media è uguale, la dispersione no. **Non trasferire alla varianza la regola della linearità della media:** sommare le varianze senza controllare la dipendenza può dare un risultato sbagliato. Studieremo più avanti il comportamento delle somme; per ora basta riconoscere dove la dimostrazione binomiale usa l'indipendenza.

## Lettura B — Pagamento, costo e gioco equo {: #giochi-equi }

Riprendiamo un biglietto che paga 0 euro con probabilità $3/4$ e 8 euro con probabilità $1/4$. Il pagamento medio è 2 euro. Il pagamento non è però il guadagno: per giocare bisogna acquistare il biglietto.

Indichiamo il pagamento con $X$, il prezzo fisso con $c$ e il guadagno netto con $G$. Allora $G=X-c$. Se paghi 3 euro, puoi perdere 3 euro oppure guadagnarne 5:

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

Non garantisce neppure di recuperare il denaro dopo un numero fissato di partite. Un guadagno medio nullo riguarda il modello; i risultati di una sequenza concreta restano incerti. È la stessa distinzione incontrata con il 3,5 del dado.

## Lettura C — Senza reinserimento: la distribuzione Ipergeometrica {: #ipergeometrica }

### 19. Le prove cambiano, ma i bit continuano a contare {: #modello-ipergeometrico }

Un insieme contiene **5 moduli software**, di cui **2 difettosi**. Ne scegliamo 2 distinti a caso per un controllo, **senza reinserimento**: dopo aver scelto il primo, non lo possiamo scegliere di nuovo. Chiamiamo $X$ il numero di moduli difettosi tra quelli scelti.

Non è una Binomiale. La probabilità del secondo difettoso dipende da che cosa è stato scelto per primo. Se il primo è difettoso, ne resta 1 su 4; se è sano, ne restano 2 su 4.

Il modello generale contiene una popolazione di $N$ oggetti, $K$ dei quali hanno la proprietà che contiamo. Scegliamo un campione di $n$ oggetti distinti, con tutti i sottoinsiemi della stessa dimensione equiprobabili. I parametri sono interi, $0\le K\le N$ e $1\le n\le N$. Il numero $X$ di oggetti con quella proprietà segue la **distribuzione Ipergeometrica**.

### 20. La PMF: scegliere dentro due gruppi {: #pmf-ipergeometrica }

Nel caso dei cinque moduli, i campioni possibili sono $\binom52=10$. Per scegliere esattamente un difettoso, scegliamo 1 dei 2 difettosi e 1 dei 3 sani. Ci sono $\binom21\binom31=2\cdot3=6$ campioni favorevoli. Perciò $P(X=1)=6/10$.

Per zero difettosi scegliamo entrambi i moduli tra i tre sani: $\binom32=3$ campioni. Per due difettosi scegliamo entrambi tra i due difettosi: $\binom22=1$ campione.

| Difettosi $x$ | 0 | 1 | 2 |
|---|---|---|---|
| $P(X=x)$ | $3/10$ | $6/10$ | $1/10$ |

La somma è 1: i dieci campioni sono stati ripartiti senza perderne nessuno.

In generale, per trovare $k$ oggetti con la proprietà, scegliamo $k$ oggetti tra i $K$ che la possiedono e $n-k$ tra i $N-K$ che non la possiedono. Dividiamo per il numero di tutti i campioni:

$$
P(X=k)=\frac{\binom Kk\binom{N-K}{n-k}}{\binom Nn}.
$$

La formula vale per gli interi che soddisfano $0\le k\le K$ e $0\le n-k\le N-K$; fuori da questi vincoli la probabilità è zero. **Non è una formula da memorizzare per l'orale:** è il principio di conteggio della settimana scorsa applicato a due gruppi.

### 21. La media senza la PMF {: #media-ipergeometrica }

Nell'esempio piccolo, la media letta dalla tabella è:

$$
\mathbb{E}[X]=0\cdot\frac3{10}+1\cdot\frac6{10}
+2\cdot\frac1{10}=\frac8{10}=0{,}8.
$$

Ritroviamola con i bit. Immaginiamo di estrarre in ordine i moduli, scegliendo ogni volta uniformemente tra quelli rimasti. Ogni campione non ordinato ha lo stesso numero di ordinamenti, quindi otteniamo proprio il modello equiprobabile sui sottoinsiemi.

Per ciascuna posizione di estrazione, $I_i$ vale 1 se l'oggetto estratto possiede la proprietà. **Prima di osservare qualsiasi estrazione**, ogni oggetto della popolazione ha la stessa possibilità di occupare quella posizione. Poiché $K$ oggetti su $N$ hanno la proprietà, $P(I_i=1)=K/N$ per ogni posizione.

Questo non dice che le estrazioni siano indipendenti. Dice che hanno la stessa probabilità non condizionata di successo. Nell'esempio, per la seconda posizione possiamo anche verificarlo con i due casi:

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

Con $n=2$, $K=2$, $N=5$, otteniamo $2\cdot2/5=0{,}8$, come prima. La dipendenza cambia la PMF rispetto alla Binomiale, ma non impedisce di sommare le medie dei bit.

## Esercizi: prima prova, poi apri la soluzione {: #esercizi }

### Esercizio 1 — Due lanci, due modi di leggere {: #esercizio-1 }

Lanciamo due volte una moneta onesta, in modo indipendente. Scrivi gli esiti completi, la tabella della variabile $X$ che conta le teste, la sua PMF e la sua media. Il valore $X=1$ corrisponde a un solo esito?

??? esempio-svolto "Soluzione ragionata"
    Gli esiti sono $TT$, $TC$, $CT$, $CC$, ciascuno con probabilità $1/4$. I valori di $X$ sono rispettivamente 2, 1, 1, 0. L'evento $X=1$ comprende due esiti disgiunti, quindi pesa $1/2$. La PMF è $p_X(0)=1/4$, $p_X(1)=1/2$, $p_X(2)=1/4$ e la media è $0/4+1/2+2/4=1$. Non fare la media dei valori distinti attribuendo loro automaticamente lo stesso peso.

### Esercizio 2 — Il dado e un costo fisso {: #esercizio-2 }

Un dado onesto determina un pagamento $X$ in euro uguale al numero uscito. Calcola $\mathbb{E}[X]$. Puoi ricevere quel pagamento in una partita? Se partecipare costa 4 euro, qual è il guadagno netto medio?

??? esempio-svolto "Soluzione ragionata"
    La media è $(1+2+3+4+5+6)/6=3{,}5$ euro. Non è uno dei pagamenti possibili. Il guadagno netto è $X-4$, perciò la sua media è $3{,}5-4=-0{,}5$ euro. Non confondere il prezzo del biglietto, il pagamento e il guadagno.

### Esercizio 3 — Contare senza assumere indipendenza {: #esercizio-3 }

Tre chiavi distinte ricevono indici indipendenti e uniformi tra due caselle. Definisci i tre bit delle coppie e calcola il numero medio di coppie in collisione. Quel numero è una probabilità? Se due bit delle coppie valgono 1, che cosa sai del terzo?

??? esempio-svolto "Soluzione ragionata"
    Ogni bit ha media $1/2$. La somma ha media $3/2=1{,}5$, che è un numero di coppie, non una probabilità. Se due coppie condividono l'indice, tutte e tre le chiavi hanno lo stesso indice, perciò anche la terza coppia collide. Le tre indicatrici non sono mutuamente indipendenti. La linearità non lo richiede.

### Esercizio 4 — Quattro operazioni {: #esercizio-4 }

Quattro operazioni falliscono indipendentemente, ciascuna con probabilità 0,2. Definisci il conteggio $X$ tramite bit. Calcola la sua media e la probabilità di esattamente due fallimenti. Poi considera un guasto comune che, con probabilità 0,2, le fa fallire tutte insieme: che cosa resta uguale e che cosa cambia?

??? esempio-svolto "Soluzione ragionata"
    Nel primo modello, $X=I_1+I_2+I_3+I_4$ è Binomiale e ha media 0,8. La probabilità cercata è $\binom42(0{,}2)^2(0{,}8)^2=0{,}1536$. Nel modello comune, la media resta 0,8 perché ogni bit ha ancora probabilità 0,2 di valere 1. Il totale vale solo 0 oppure 4, quindi la probabilità di esattamente due fallimenti è zero. La stessa media non basta per decidere che le distribuzioni sono uguali.

### Esercizio 5 — Un campione senza reinserimento (lettura) {: #esercizio-5 }

Tra 10 moduli, 3 sono difettosi. Scegli uniformemente un sottoinsieme di 4 moduli. Qual è il numero medio di difettosi? Il conteggio è Binomiale? Come scriveresti la probabilità di trovare esattamente un difettoso?

??? esempio-svolto "Soluzione ragionata"
    La media è $4\cdot3/10=1{,}2$. Il conteggio è Ipergeometrico: non c'è reinserimento, e le estrazioni dipendono. Per un difettoso scegliamo 1 modulo tra i 3 difettosi e 3 tra i 7 sani; dividiamo per tutti i campioni: $\binom31\binom73/\binom{10}4=105/210=1/2$.

## Errori da evitare {: #errori }

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

Una variabile aleatoria trasforma gli esiti in quantità numeriche. La PMF distribuisce probabilità sui valori. Il valore atteso somma quei valori pesati: descrive il centro del modello, anche quando il centro non è un risultato possibile.

La linearità consente di scomporre un costo totale e sommare le medie delle parti. Per un conteggio, le indicatrici sono particolarmente utili: ogni media diventa una probabilità. Non serve indipendenza per questa operazione; serve invece controllarla quando si afferma che una somma ha distribuzione Binomiale.

Per l'informatico, la domanda decisiva viene **prima** della formula: che cosa stiamo misurando? Coppie in collisione, caselle occupate e probabilità di un incidente sono quantità diverse. Un'analisi del caso medio ha valore soltanto se dichiara anche il modello degli input o della casualità interna al programma.

Come piccolo esempio algoritmico, considera una ricerca lineare in una lista di $n$ elementi distinti. La chiave è presente e, nel modello, ciascuna posizione è equiprobabile. Se conta un confronto per elemento visitato, il costo $X$ vale da 1 a $n$, con peso $1/n$ ciascuno. Dunque $\mathbb{E}[X]=(1+2+\cdots+n)/n=(n+1)/2$, usando la somma degli interi già incontrata nella Settimana 3. Se la chiave può mancare o le posizioni non sono equiprobabili, bisogna cambiare i pesi: «costo medio» senza un modello non è ancora un numero definito.

La media non descrive tutto. Un servizio con guasti indipendenti e uno con guasti comuni possono avere la stessa media dei fallimenti e comportamenti molto diversi. La varianza comincia a misurare quella differenza; le prossime settimane aggiungeranno altri strumenti.

!!! tip "Che cosa devi saper rifare"
    Costruire una PMF elementare e calcolare $\mathbb{E}[X]$. Definire un'indicatrice e spiegare perché $\mathbb{E}[I_A]=P(A)$. Usare la linearità per ricavare $\mathbb{E}[X]=np$ nel conteggio binomiale, indicando separatamente le ipotesi che rendono binomiale la distribuzione.

## Riferimenti e letture {: #riferimenti }

* **Christiaan Huygens**, *De ratiociniis in ludo aleae* (1657), introduzione e Proposizioni I–III: [traduzione inglese del 1714](https://math.dartmouth.edu/~doyle/docs/huygens/huygens/). Fonte primaria del percorso sul valore di una possibilità di guadagno. Gli esempi con euro e software di questa pagina sono esempi didattici moderni.
* **Chris Piech**, *Probability for Computer Scientists*, Stanford, [portale del corso](https://chrispiech.github.io/probabilityForComputerScientists/): riferimento contemporaneo per variabili discrete, aspettazione, linearità e modelli di conteggio. Le derivazioni qui sono sviluppate passo per passo con gli esempi della dispensa.
* **Jerry Cain**, Stanford CS109, [esercitazione del 13 aprile 2021, soluzioni](https://web.stanford.edu/class/archive/cs/cs109/cs109.1216/sections/02_section_soln.pdf): esempi del metodo delle indicatrici e della linearità senza indipendenza.
* **William Feller**, *An Introduction to Probability Theory and Its Applications*, vol. I (prima edizione 1950): riferimento classico del corso per il calcolo dell'aspettazione. [Scheda bibliografica e copie digitali su Open Library](https://openlibrary.org/search?q=William+Feller+An+Introduction+to+Probability+Theory+and+Its+Applications). La linearità è presentata come proprietà matematica, senza attribuirne l'invenzione a Feller.

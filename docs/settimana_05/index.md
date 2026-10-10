# Settimana 5 — Bortkiewicz e i calci di cavallo: Geometrica e Poisson

<style>
@media screen {
  .md-typeset .md-typeset__scrollwrap { overflow-x: auto; max-width: 100%; }
  .md-typeset div.arithmatex { overflow-x: auto; max-width: 100%; }
  .md-typeset mjx-assistive-mml { max-width: 100%; }
}
</style>

*Quanto bisogna aspettare? E quante volte succede una cosa rara? Dai numeri ritardatari del Lotto ai registri dell'esercito prussiano, fino alle richieste che arrivano a un server.*

Le slide di questa settimana saranno aggiunte in seguito.

## Prima di cominciare: che cosa ci portiamo dalla Settimana 4 {: #prima-di-cominciare }

La settimana scorsa abbiamo costruito quattro strumenti. Li riprendiamo uno per uno, perché questa settimana li useremo tutti.

1. Una **variabile aleatoria** $X$ è una regola che legge l'esito di un esperimento e restituisce un numero.
2. La sua **PMF** $p_X(x)=P(X=x)$ assegna un peso a ciascun valore possibile. I pesi sono non negativi e sommano a 1.
3. Il **valore atteso** $\mathbb{E}[X]=\sum_x x\,p_X(x)$ è il baricentro di quei pesi. Può cadere tra i valori possibili, come il 3,5 del dado.
4. La **linearità**: $\mathbb{E}[aX+b]=a\,\mathbb{E}[X]+b$, e la media di una somma è la somma delle medie, anche con variabili dipendenti.

Abbiamo poi incontrato un modello preciso: $n$ prove indipendenti, ciascuna con la stessa probabilità $p$ di «successo». Il numero di successi è una **Binomiale** con media $np$ ([Settimana 4, Atto V](../settimana_04/index.md#media-binomiale)). Nella lettura sulla varianza avevamo anche ricavato $\operatorname{Var}(X)=np(1-p)$ ([Settimana 4, Lettura A](../settimana_04/index.md#varianza-binomiale)).

La Binomiale risponde alla domanda **«quanti successi in $n$ prove?»**. Questa settimana cambiamo la domanda in due modi diversi:

* **Quanto dobbiamo aspettare** prima del primo successo? Il numero di prove non è più fissato: si continua finché il successo arriva.
* **Quanti eventi rari** capitano in un intervallo di tempo, quando le occasioni sono tantissime e ciascuna è quasi impossibile?

Alla prima domanda risponde la distribuzione **Geometrica**, alla seconda la distribuzione di **Poisson**. Entrambe nascono dalla stessa materia prima: prove indipendenti con due esiti.

!!! info "Come leggere questa dispensa"
    Gli Atti I–V formano il percorso principale: la Geometrica e l'assenza di memoria (Atti I–II), i dati di Bortkiewicz e la Poisson (Atti III–IV), le applicazioni ai sistemi (Atto V). Seguono due letture: il filtro di Bloom e la derivazione completa della Poisson come limite della Binomiale. **Il filtro di Bloom è fuori dal nucleo d'esame orale.** La derivazione completa è facoltativa: all'orale basta saper spiegare l'idea dei «pezzetti di tempo».

## Atto I — Il 53 che non usciva {: #ritardatari }

Nel Lotto italiano ogni estrazione, su ciascuna «ruota» (una per città), sceglie **5 numeri distinti tra 1 e 90**. Le estrazioni successive sono indipendenti: le palline vengono rimesse nell'urna e il sorteggio riparte da capo.

Tra il 2003 e il 2005 il numero **53** non uscì sulla ruota di Venezia per **182 estrazioni consecutive**. Più passava il tempo, più cresceva la convinzione che «dovesse» uscire. Molti giocatori aumentarono le puntate a ogni estrazione; i giornali dell'epoca raccontano di persone che si rovinarono inseguendolo, e se ne discusse perfino in Parlamento. Alla fine il 53 uscì, come prima o poi esce ogni numero. Ma era davvero «in ritardo»?

Prima di rispondere, calcoliamo una probabilità semplice. In una singola estrazione, qual è la probabilità che il 53 sia tra i 5 numeri estratti sulla ruota di Venezia?

Pensiamo all'estrazione così: i 90 numeri vengono messi in fila in ordine casuale, e i primi 5 della fila sono quelli estratti. Ogni numero ha la stessa probabilità di occupare una qualsiasi delle 90 posizioni. Il 53 viene estratto se finisce in una delle 5 posizioni iniziali:

$$
P(\text{il 53 esce in un'estrazione})=\frac{5}{90}=\frac{1}{18}.
$$

Quindi, a ogni estrazione, il 53 ha una possibilità su 18 di uscire, e 17 su 18 di mancare.

**La domanda guida della settimana:** se il 53 manca da 100 estrazioni, la probabilità che esca alla prossima è più grande di $1/18$, uguale, o più piccola? E, più in generale: come si descrive un'attesa?

Prima di continuare, scegli una risposta e tienila a mente. La ritroveremo alla fine dell'Atto II.

## Atto II — Aspettare il primo successo: la Geometrica {: #geometrica }

### 1. Il modello: provare finché va bene {: #modello-geometrico }

Lasciamo per un momento il Lotto e partiamo da una situazione più piccola. Lanci una moneta onesta finché esce testa. Chiamiamo $X$ il **numero del lancio in cui esce la prima testa**.

* Se esce subito testa, $X=1$.
* Se esce croce e poi testa, $X=2$.
* Se escono due croci e poi testa, $X=3$.

E così via. Quanto può valere $X$? Qualunque intero positivo: 1, 2, 3, 4, … Non c'è un tetto. Una sequenza di cento croci di fila è estremamente improbabile, ma non impossibile. È la prima volta nel corso che una variabile ha **infiniti valori possibili**: li possiamo comunque elencare uno dopo l'altro, quindi $X$ resta una variabile discreta.

La situazione generale ha tre ingredienti:

1. una successione di **prove**, ciascuna con due esiti: successo o fallimento;
2. **la stessa probabilità $p$** di successo in ogni prova, con $0<p\le1$;
3. **indipendenza tra le prove**: l'esito di una prova non cambia le probabilità delle altre.

Sono le stesse ipotesi della Binomiale. La differenza sta in **che cosa contiamo**. La Binomiale fissa il numero di prove $n$ e conta i successi. Qui il numero di prove non è fissato: ci fermiamo al primo successo e contiamo **quante prove sono servite**. Quel numero ha distribuzione **Geometrica di parametro $p$**:

$$
X\sim\operatorname{Geometrica}(p).
$$

Il simbolo $\sim$, come nella Settimana 4, si legge «ha distribuzione». Nel Lotto, una prova è un'estrazione, il successo è «esce il 53», e $p=1/18$.

!!! warning "Due convenzioni in circolazione"
    In questo corso $X$ conta **tutte le prove, compresa quella riuscita**: i valori partono da 1. Alcuni libri e alcune librerie software contano invece **i soli fallimenti prima del successo**, con valori che partono da 0. Le due variabili differiscono esattamente di 1. Quando leggi una formula altrove, controlla sempre quale convenzione usa.

### 2. La PMF: una fila di fallimenti, poi un successo {: #pmf-geometrica }

Quanto vale $P(X=4)$? Dire che $X=4$ significa dire una cosa precisa sulla storia delle prove: **le prime tre sono fallite e la quarta è riuscita**. Non c'è un altro modo di arrivare a $X=4$.

<figure markdown="0">
<svg viewBox="0 0 560 190" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Quattro prove in fila: le prime tre fallite, ciascuna con probabilità uno meno p, la quarta riuscita con probabilità p. Il prodotto dà P di X uguale a 4.">
<defs><marker id="s05-fila-freccia" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="currentColor"/></marker></defs>
<text x="280" y="20" text-anchor="middle" fill="currentColor" font-weight="bold">X = 4: tre fallimenti, poi il primo successo</text>
<g fill="none" stroke="currentColor" stroke-width="2"><rect x="40" y="40" width="95" height="50" rx="6"/><rect x="155" y="40" width="95" height="50" rx="6"/><rect x="270" y="40" width="95" height="50" rx="6"/></g>
<rect x="385" y="40" width="95" height="50" rx="6" fill="#2e9e5b"/>
<g text-anchor="middle" fill="currentColor"><text x="87" y="62">prova 1</text><text x="87" y="80">fallisce</text><text x="202" y="62">prova 2</text><text x="202" y="80">fallisce</text><text x="317" y="62">prova 3</text><text x="317" y="80">fallisce</text></g>
<g text-anchor="middle" fill="#fff" font-weight="bold"><text x="432" y="62">prova 4</text><text x="432" y="80">riesce</text></g>
<g text-anchor="middle" fill="currentColor"><text x="87" y="115">1 − p</text><text x="202" y="115">1 − p</text><text x="317" y="115">1 − p</text></g>
<text x="432" y="115" text-anchor="middle" fill="#2e9e5b" font-weight="bold">p</text>
<path d="M40 135H500" stroke="currentColor" marker-end="url(#s05-fila-freccia)"/>
<text x="505" y="139" fill="currentColor">tempo</text>
<text x="280" y="175" text-anchor="middle" fill="currentColor">Prove indipendenti: si moltiplica. P(X = 4) = (1 − p)·(1 − p)·(1 − p)·p = (1 − p)³·p</text>
</svg>
<figcaption>Il valore X = 4 corrisponde a una sola storia: tre fallimenti seguiti da un successo.</figcaption>
</figure>

Le prove sono indipendenti, quindi la probabilità di quella storia è il prodotto delle probabilità delle singole prove, come nella regola del prodotto della [Settimana 1](../settimana_01/index.md):

$$
P(X=4)=\underbrace{(1-p)(1-p)(1-p)}_{\text{tre fallimenti}}\cdot\underbrace{p}_{\text{un successo}}=(1-p)^3p.
$$

Con la moneta onesta, $p=1/2$: $P(X=4)=(1/2)^3\cdot1/2=1/16$.

Lo stesso ragionamento funziona per qualunque valore $k$. Dire $X=k$ significa: $k-1$ fallimenti di fila, poi un successo. Quindi, per $k=1,2,3,\dots$

$$
\boxed{P(X=k)=(1-p)^{k-1}\,p.}
$$

L'esponente è $k-1$, non $k$: i fallimenti sono uno in meno delle prove, perché l'ultima prova è quella riuscita. Per $k=1$ l'esponente è zero, $(1-p)^0=1$, e resta $P(X=1)=p$: la probabilità di riuscire subito è proprio la probabilità di successo di una prova.

Facciamo i conti per il Lotto, con $p=1/18$:

$$
P(X=1)=\frac1{18}\approx0{,}056,\qquad
P(X=2)=\frac{17}{18}\cdot\frac1{18}\approx0{,}052,\qquad
P(X=3)=\left(\frac{17}{18}\right)^2\frac1{18}\approx0{,}050.
$$

Ogni valore è un po' meno probabile del precedente: ogni passo aggiunge un fattore $17/18$, che è minore di 1. **Il valore più probabile della Geometrica è sempre 1**, qualunque sia $p$. Questo sorprende molti: anche quando il successo è raro, il primo tentativo è il singolo valore con più peso. Ma i valori sono tanti, e il peso totale si distribuisce su una lunga coda.

### 3. La coda: quanto è probabile aspettare a lungo {: #coda-geometrica }

Spesso non interessa un valore preciso, ma una soglia: **qual è la probabilità di aspettare più di $k$ prove?** In un sistema software potrebbe essere: qual è la probabilità che servano più di 3 tentativi?

Potremmo sommare $P(X=k+1)+P(X=k+2)+\cdots$, ma è una somma infinita. C'è una strada molto più corta. Chiediamoci che cosa significa $X>k$ in termini di storia delle prove: il primo successo arriva **dopo** la prova $k$, cioè **le prime $k$ prove sono tutte fallite**. Ancora una volta, per indipendenza moltiplichiamo:

$$
\boxed{P(X>k)=(1-p)^k.}
$$

Per esempio, con $p=0{,}2$, la probabilità che servano più di 3 tentativi è $0{,}8^3=0{,}512$: più di una volta su due.

Questa formula risponde anche a una domanda che non ci eravamo ancora posti: **il successo arriva prima o poi?** La probabilità di aspettare più di $k$ prove è $(1-p)^k$. Poiché $1-p$ è minore di 1, le sue potenze diventano piccole quanto vogliamo al crescere di $k$: con $p=1/18$, già $(17/18)^{100}\approx0{,}0033$. La probabilità di non vedere mai il successo è zero. Di conseguenza i pesi $P(X=1),P(X=2),\dots$ sommano a 1: abbiamo davvero una PMF.

Il complementare dà la probabilità di avercela fatta entro $k$ prove:

$$
P(X\le k)=1-(1-p)^k.
$$

**Fermiamoci un momento.** La PMF guarda un istante preciso: «il primo successo arriva esattamente alla prova $k$». La coda guarda una soglia: «dopo $k$ prove non è ancora arrivato». Entrambe nascono dallo stesso disegno: una fila di fallimenti, eventualmente chiusa da un successo.

### 4. La media: quante prove servono in media? {: #media-geometrica }

Se ogni estrazione ha una probabilità su 18 di far uscire il 53, l'intuizione suggerisce che servano **in media 18 estrazioni**. Se ogni tentativo riesce con probabilità $0{,}2$, cioè una volta su cinque, servono in media 5 tentativi. La regola intuitiva è: la media è l'inverso della probabilità, $1/p$.

L'intuizione è giusta, ma vogliamo capire **perché**. La definizione chiederebbe di calcolare $\sum_k k\,(1-p)^{k-1}p$, una somma infinita. Seguiamo invece un ragionamento più umano, che usa un'osservazione sulla prima prova.

Chiamiamo $\mu$ il numero medio di prove, $\mu=\mathbb{E}[X]$, e supponiamo che sia un numero finito (lo confermerà il laboratorio; una verifica rigorosa si fa con le serie). Guardiamo che cosa succede alla **prima** prova. Ci sono due casi.

* **Caso 1, con probabilità $p$: la prima prova riesce.** Allora $X=1$ e abbiamo finito.
* **Caso 2, con probabilità $1-p$: la prima prova fallisce.** Abbiamo speso una prova. Le prove successive sono indipendenti dalla prima e hanno la stessa probabilità $p$: la situazione è **identica a quella di partenza**. Da qui in poi, quante prove servono in media? Ancora $\mu$. In totale, in media, $1+\mu$.

Facciamo la media dei due casi, pesandoli con le loro probabilità. È la stessa idea della probabilità totale della [Settimana 2](../settimana_02/index.md), applicata alle medie invece che alle probabilità:

$$
\mu=p\cdot1+(1-p)\cdot(1+\mu).
$$

Ora è solo algebra. Moltiplichiamo il secondo termine:

$$
\mu=p+(1-p)+(1-p)\mu=1+(1-p)\mu.
$$

Abbiamo usato $p+(1-p)=1$. Portiamo a sinistra il termine con $\mu$:

$$
\mu-(1-p)\mu=1
\quad\Longrightarrow\quad
p\,\mu=1,
$$

perché $\mu-(1-p)\mu=\mu\,(1-(1-p))=p\,\mu$. Dividiamo per $p$, che è positivo:

$$
\boxed{\mathbb{E}[X]=\frac1p.}
$$

Il cuore del ragionamento è la frase del caso 2: **dopo un fallimento si ricomincia da capo**. Le prove indipendenti non accumulano «crediti»: la prova numero 2 non sa nulla della prova numero 1.

Due conti di controllo:

* moneta onesta, $p=1/2$: in media 2 lanci per la prima testa;
* Lotto, $p=1/18$: in media 18 estrazioni perché esca il 53.

Attenzione però a che cosa dice questo 18. **Non dice che il 53 uscirà entro 18 estrazioni.** La probabilità di aspettarne più di 18 è $(17/18)^{18}\approx0{,}357$: più di una volta su tre l'attesa supera la media. La media è il baricentro di una distribuzione con una coda lunga: le attese brevi sono frequenti, quelle lunghe rare ma molto pesanti nel conto.

#### Esplora: la forma di un'attesa {: #widget-geometrica }

Nel widget $p$ è la probabilità di successo di ciascuna prova. Parti da $p=0{,}2$: le barre scendono, e la media vale 5. Prova poi a portare $p$ verso il valore del Lotto, circa $0{,}056$ (la curva tratteggiata): le barre si abbassano e la coda si allunga molto oltre il bordo del grafico. Prima di spostare il cursore, prevedi: con $p=0{,}5$ quanto varrà la media?

<div class="psi-widget" id="s05-geometrica"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  PSIWidget.mount('s05-geometrica', {
    type: 'bar', xLabel: 'Prova k del primo successo', yLabel: 'P(X = k)',
    xDomain: [1, 30], liveLabel: 'Geometrica corrente',
    fn: function (k, p) { return Math.pow(1 - p.p, k - 1) * p.p; },
    params: [{key: 'p', label: 'p (probabilità di successo per prova)',
      min: 0.02, max: 0.9, step: 0.01, value: 0.2}],
    reference: {label: 'Lotto: p = 1/18', params: {p: 1 / 18}},
    stats: function (p) { return [
      {label: 'E[X] = 1/p', value: (1 / p.p).toFixed(2)},
      {label: 'P(X > 10) = (1 − p)^10', value: Math.pow(1 - p.p, 10).toFixed(3)}
    ]; },
    caption: 'La barra più alta è sempre la prima. La media 1/p cresce quando p diminuisce, e la coda si allunga.'
  });
});
</script>

### 5. L'assenza di memoria {: #assenza-memoria }

Torniamo alla domanda dell'Atto I. Il 53 manca da 100 estrazioni. Qual è la probabilità che manchi **ancora** per altre 18?

Scriviamo la domanda con i simboli. Sappiamo che $X>100$: le prime 100 estrazioni sono fallite. Vogliamo la probabilità che anche le 18 successive falliscano, cioè $X>118$, **dato** $X>100$. È una probabilità condizionata, che sappiamo calcolare dalla [Settimana 1](../settimana_01/index.md):

$$
P(X>118\mid X>100)=\frac{P(X>118\ \text{e}\ X>100)}{P(X>100)}.
$$

Se $X>118$, allora certamente $X>100$: il primo evento è contenuto nel secondo. L'intersezione è quindi semplicemente $\{X>118\}$. Usiamo la formula della coda al numeratore e al denominatore:

$$
P(X>118\mid X>100)=\frac{P(X>118)}{P(X>100)}
=\frac{(17/18)^{118}}{(17/18)^{100}}
=\left(\frac{17}{18}\right)^{18}.
$$

Nell'ultimo passaggio abbiamo semplificato le potenze: $118-100=18$. Ma $(17/18)^{18}$ è esattamente $P(X>18)$, la probabilità di aspettare più di 18 estrazioni **partendo da zero**. I 100 fallimenti già visti sono scomparsi dal conto.

Lo stesso calcolo vale con numeri qualsiasi. Per interi $s\ge0$ e $t\ge0$:

$$
P(X>s+t\mid X>s)=\frac{(1-p)^{s+t}}{(1-p)^s}=(1-p)^t,
$$

e quindi

$$
\boxed{P(X>s+t\mid X>s)=P(X>t).}
$$

È la **proprietà di assenza di memoria** della Geometrica. A parole: **sapere di aver già aspettato $s$ prove non cambia la distribuzione dell'attesa che resta**. Chi arriva dopo 100 estrazioni a vuoto è nella stessa identica situazione di chi comincia a guardare oggi.

<figure markdown="0">
<svg viewBox="0 0 560 205" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Due righe. Nella prima si osservano tre prove future da subito. Nella seconda cinque prove sono già fallite, e le tre prove future sono identiche. In entrambi i casi la probabilità che tutte e tre falliscano è uno meno p alla terza.">
<text x="20" y="45" fill="currentColor" font-weight="bold">Da subito</text>
<g fill="#4051b5"><rect x="300" y="25" width="60" height="32" rx="5"/><rect x="370" y="25" width="60" height="32" rx="5"/><rect x="440" y="25" width="60" height="32" rx="5"/></g>
<g fill="#fff" text-anchor="middle" font-weight="bold"><text x="330" y="46">?</text><text x="400" y="46">?</text><text x="470" y="46">?</text></g>
<text x="20" y="125" fill="currentColor" font-weight="bold">Dopo 5 fallimenti</text>
<g fill="none" stroke="currentColor" stroke-dasharray="4 3"><rect x="20" y="140" width="46" height="32" rx="5"/><rect x="74" y="140" width="46" height="32" rx="5"/><rect x="128" y="140" width="46" height="32" rx="5"/><rect x="182" y="140" width="46" height="32" rx="5"/><rect x="236" y="140" width="46" height="32" rx="5"/></g>
<g fill="currentColor" text-anchor="middle"><text x="43" y="161">no</text><text x="97" y="161">no</text><text x="151" y="161">no</text><text x="205" y="161">no</text><text x="259" y="161">no</text></g>
<g fill="#4051b5"><rect x="300" y="140" width="60" height="32" rx="5"/><rect x="370" y="140" width="60" height="32" rx="5"/><rect x="440" y="140" width="60" height="32" rx="5"/></g>
<g fill="#fff" text-anchor="middle" font-weight="bold"><text x="330" y="161">?</text><text x="400" y="161">?</text><text x="470" y="161">?</text></g>
<text x="400" y="88" text-anchor="middle" fill="#2e9e5b" font-weight="bold">tutte e tre falliscono: (1 − p)³</text>
<text x="400" y="106" text-anchor="middle" fill="#2e9e5b" font-weight="bold">in entrambe le righe</text>
<text x="151" y="196" text-anchor="middle" fill="currentColor">già visti: non cambiano il futuro</text>
</svg>
<figcaption>Le prove future sono le stesse, con le stesse probabilità, con o senza un passato di fallimenti.</figcaption>
</figure>

### 6. I numeri ritardatari: perché la sensazione inganna {: #fallacia-giocatore }

Ora possiamo rispondere alla domanda guida. **Se il 53 manca da 100 estrazioni, alla prossima esce con probabilità esattamente $1/18$**: la stessa di sempre. L'urna non ricorda le estrazioni precedenti, e le palline non «si accorgono» di essere in ritardo.

La convinzione opposta ha un nome: **fallacia del giocatore**. Da dove nasce? Da una confusione tra due domande diverse.

* **Domanda A, guardando avanti da zero:** «quanto è probabile che il 53 manchi per 118 estrazioni di fila?». Risposta: $(17/18)^{118}$, circa 0,0012. È davvero raro.
* **Domanda B, sapendo che ne ha già mancate 100:** «quanto è probabile che manchi per altre 18?». Risposta: $(17/18)^{18}\approx0{,}357$. Non è affatto raro.

La rarità della domanda A è **già stata spesa**: i 100 fallimenti sono accaduti, non sono più incerti. Il giocatore che punta sul ritardatario usa la probabilità di A per decidere su B.

C'è anche un secondo motivo per cui i grandi ritardi non sono sorprendenti. Ogni ruota ha 90 numeri e le ruote sono diverse: chi guarda «il numero più in ritardo d'Italia» sta scegliendo, tra centinaia di attese in corso, proprio quella più lunga. È lo stesso effetto dei compleanni della [Settimana 3](../settimana_03/index.md#compleanni): tra tante possibilità, qualche coincidenza estrema è attesa.

**Micro-riepilogo.** La Geometrica descrive l'attesa del primo successo in prove indipendenti. La sua media è $1/p$. Non ha memoria: un passato di fallimenti non avvicina il successo e non lo allontana.

### 7. Laboratorio: simulare 50.000 attese {: #lab-geometrica }

Il primo script simula l'attesa del 53 molte volte: ogni «attesa» è una sequenza di estrazioni che si ferma al primo successo. Poi confronta tre cose con la teoria: la media, la coda oltre 18, e l'assenza di memoria. Per l'ultima tiene soltanto le attese **già arrivate oltre la trentesima estrazione** e chiede quante di queste falliscono ancora per 18 estrazioni.

<div class="psi-exec" markdown="1">
```python
from random import Random

generatore = Random(42)
p = 1 / 18          # il 53 è uno dei 5 numeri estratti su 90
prove = 50000       # quante attese complete simuliamo


def attesa(p):
    """Numero dell'estrazione in cui arriva il primo successo."""
    k = 1
    # Ogni estrazione è nuova: la probabilità non dipende dal passato.
    while generatore.random() >= p:
        k += 1
    return k


attese = [attesa(p) for _ in range(prove)]
print(f"Media teorica 1/p: {1 / p:.2f}")
print(f"Media simulata: {sum(attese) / prove:.2f}")

# Coda: più di 18 estrazioni significa 18 fallimenti di fila.
oltre_18 = sum(x > 18 for x in attese) / prove
print(f"P(X > 18) teorica: {(1 - p) ** 18:.4f}")
print(f"P(X > 18) simulata: {oltre_18:.4f}")

# Assenza di memoria: guardiamo solo le attese già oltre 30.
lunghe = [x for x in attese if x > 30]
ancora = sum(x > 30 + 18 for x in lunghe) / len(lunghe)
print(f"Attese già oltre 30: {len(lunghe)}")
print(f"Tra queste, ancora 18 fallimenti: {ancora:.4f}")
```
</div>

Con il seme 42 la media simulata è vicina a 18, e le due frazioni finali sono entrambe vicine a 0,357. Questo è il punto: **tra le attese che hanno già superato 30, la frazione che supera ancora 18 estrazioni è la stessa che troviamo partendo da zero**.

Prova a cambiare `30` con `60`: il gruppo delle attese lunghe diventa più piccolo, quindi la stima è più rumorosa, ma resta vicina allo stesso valore. Poi prova `p = 0.2`: la media scende verso 5.

### 8. Il ponte con il software: tentativi e ritrasmissioni {: #retry }

Un client invia una richiesta a un servizio che a volte non risponde. Il codice ritenta finché la richiesta riesce. Se ogni tentativo riesce con probabilità $p$, indipendentemente dagli altri, il numero di tentativi è una Geometrica.

Con $p=0{,}2$:

* servono **in media** $1/0{,}2=5$ tentativi;
* la probabilità che **non bastino 3 tentativi** è $0{,}8^3=0{,}512$;
* se ogni tentativo occupa 300 millisecondi, il tempo totale è $T=0{,}3\,X$ secondi e, per la linearità della Settimana 4, $\mathbb{E}[T]=0{,}3\cdot5=1{,}5$ secondi.

La formula della coda serve a scegliere un **limite ai tentativi**. Se vogliamo che la richiesta riesca entro $r$ tentativi con probabilità almeno 0,99, cerchiamo il più piccolo $r$ con $0{,}8^r\le0{,}01$. Provando: $0{,}8^{20}\approx0{,}0115$ e $0{,}8^{21}\approx0{,}0092$. Servono 21 tentativi.

Ma attenzione all'ipotesi. **L'assenza di memoria vale solo se i tentativi sono davvero indipendenti.** Se il servizio è giù per un guasto che dura dieci minuti, i tentativi falliscono tutti insieme: un fallimento rende più probabile il fallimento successivo. È uno dei motivi per cui i client ben scritti aspettano un tempo crescente tra un tentativo e l'altro (*exponential backoff*): non insistono su un guasto che ha memoria.

## Atto III — I calci di cavallo dell'esercito prussiano {: #bortkiewicz }

### 9. I registri di Bortkiewicz {: #dati-bortkiewicz }

Nel 1898 lo statistico **Ladislaus von Bortkiewicz** (1868–1931), nato a San Pietroburgo da una famiglia di origine polacca e attivo in Germania, pubblicò a Lipsia un libretto dal titolo curioso: ***Das Gesetz der kleinen Zahlen***, «La legge dei piccoli numeri». Voleva capire se gli eventi **rari** si comportino in modo prevedibile, come fanno i grandi numeri delle statistiche nazionali.

Raccolse diversi esempi: i suicidi di bambini in Prussia, i suicidi femminili in alcuni Stati tedeschi, gli incidenti mortali sul lavoro. Il quarto esempio è quello rimasto nella storia (§ 12 del libro): **i militari dell'esercito prussiano uccisi dal calcio di un cavallo**.

I dati vengono dalle statistiche ufficiali prussiane. Coprono **20 anni, dal 1875 al 1894**, e 14 corpi d'armata. Bortkiewicz notò che quattro di questi (la Guardia e i corpi I, VI e XI) avevano una composizione molto diversa dagli altri: per esempio, molti più squadroni di cavalleria. Li tolse dal conto principale e tenne **10 corpi d'armata** con una composizione comparabile. Questa scelta merita attenzione: un modello vale per unità **omogenee**, e mescolare corpi con venti squadroni e corpi con quaranta avrebbe confuso il quadro.

L'unità di osservazione è il **corpo-anno**: un corpo d'armata osservato per un anno. Con 10 corpi e 20 anni, i corpi-anno sono $10\cdot20=200$. Per ciascuno, Bortkiewicz registrò quanti militari erano morti per un calcio di cavallo. Ecco la tabella riassuntiva:

| Morti nel corpo-anno | 0 | 1 | 2 | 3 | 4 | 5 o più |
|---|---|---|---|---|---|---|
| Numero di corpi-anno | 109 | 65 | 22 | 3 | 1 | 0 |

In 109 corpi-anno su 200 nessuno morì così; in 65 morì una persona; e così via. Il totale dei morti è:

$$
0\cdot109+1\cdot65+2\cdot22+3\cdot3+4\cdot1=0+65+44+9+4=122.
$$

In media, quindi, ci sono stati

$$
\frac{122}{200}=0{,}61\ \text{morti per corpo-anno}.
$$

### 10. Una domanda che si risponde con un solo numero {: #legge-piccoli-numeri }

Ogni morte per un calcio di cavallo è un incidente: imprevedibile, sfortunato, apparentemente senza regole. Eppure la tabella ha una forma regolare. Bortkiewicz si chiese: **conoscendo soltanto la media 0,61, si può prevedere l'intera tabella?**

Pensiamo a come nasce un conteggio di questo tipo. In un corpo d'armata ci sono migliaia di militari, e ogni giorno molti di loro lavorano vicino ai cavalli. Le **occasioni** di incidente sono moltissime. Ma ciascuna occasione ha una probabilità minuscola di finire in tragedia. Il risultato è un piccolo numero di eventi, prodotto da un **grande numero di occasioni**, ciascuna **quasi impossibile**.

È una Binomiale? In spirito sì: tante prove, ciascuna con una piccola probabilità di successo (qui il «successo» è un evento tragico: la parola, come nella Settimana 4, è soltanto una convenzione). Ma c'è un problema pratico serio. **Non sappiamo quante siano le prove $n$, né quanto valga $p$.** Quante occasioni di incidente ci sono in un anno? Diecimila? Un milione? Nessuno lo sa. Sappiamo soltanto il prodotto: in media, $np=0{,}61$.

Ci serve allora una distribuzione che dipenda **solo dalla media**. La costruiremo nell'Atto IV, e poi la confronteremo con la tabella di Bortkiewicz.

Prima di proseguire, prova a fare una previsione. Con una media di 0,61 morti per corpo-anno, **in quanti dei 200 corpi-anno ti aspetteresti zero morti?** Venti? Sessanta? Cento? Centosessanta? Scrivi la tua stima prima di leggere oltre (oppure copri la tabella sopra).

## Atto IV — La distribuzione di Poisson {: #poisson }

### 11. Tagliare l'anno a pezzetti {: #pezzetti }

Ecco l'idea che risolve il problema. Non conosciamo le «occasioni di incidente», ma possiamo **inventarne di nostre**: dividiamo l'anno in $n$ pezzetti di tempo uguali. Per esempio, $n=365$ giorni, oppure $n=8760$ ore.

<figure markdown="0">
<svg viewBox="0 0 560 200" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Un anno diviso in dieci pezzetti uguali. In due pezzetti c'è un evento, segnato in arancione. Ogni pezzetto ha probabilità lambda su n di contenere un evento.">
<text x="280" y="22" text-anchor="middle" fill="currentColor" font-weight="bold">Un corpo-anno diviso in n = 10 pezzetti</text>
<g fill="none" stroke="currentColor" stroke-width="2"><rect x="30" y="45" width="50" height="45"/><rect x="80" y="45" width="50" height="45"/><rect x="130" y="45" width="50" height="45"/><rect x="180" y="45" width="50" height="45"/><rect x="230" y="45" width="50" height="45"/><rect x="280" y="45" width="50" height="45"/><rect x="330" y="45" width="50" height="45"/><rect x="380" y="45" width="50" height="45"/><rect x="430" y="45" width="50" height="45"/><rect x="480" y="45" width="50" height="45"/></g>
<g fill="#e07a1f"><circle cx="155" cy="67" r="10"/><circle cx="405" cy="67" r="10"/></g>
<g fill="currentColor" text-anchor="middle"><text x="55" y="108">1</text><text x="105" y="108">2</text><text x="155" y="108">3</text><text x="205" y="108">4</text><text x="255" y="108">5</text><text x="305" y="108">6</text><text x="355" y="108">7</text><text x="405" y="108">8</text><text x="455" y="108">9</text><text x="505" y="108">10</text></g>
<text x="280" y="138" text-anchor="middle" fill="currentColor">Ogni pezzetto: un evento con probabilità λ/n, oppure niente; pezzetti indipendenti.</text>
<text x="280" y="160" text-anchor="middle" fill="currentColor">Totale degli eventi: Binomiale(n, λ/n), con media n·(λ/n) = λ per ogni n.</text>
<text x="280" y="187" text-anchor="middle" fill="#e07a1f" font-weight="bold">In questo corpo-anno: 2 eventi</text>
</svg>
<figcaption>Più pezzetti significa pezzetti più corti, ciascuno con un evento ancora più raro; la media totale resta la stessa.</figcaption>
</figure>

Chiamiamo **$\lambda$** (la lettera greca lambda) il numero medio di eventi nell'intero intervallo: per Bortkiewicz, $\lambda=0{,}61$. Facciamo tre ipotesi semplificatrici sui pezzetti:

1. in ciascun pezzetto **o succede un evento o non succede niente**: i pezzetti sono così corti che due eventi nello stesso pezzetto sono trascurabili;
2. ogni pezzetto ha la **stessa probabilità** di contenere un evento;
3. pezzetti diversi sono **indipendenti**.

Perché la media totale sia $\lambda$, ogni pezzetto deve avere probabilità $\lambda/n$: con $n$ pezzetti la media è $n\cdot\lambda/n=\lambda$, come nella media Binomiale $np$ della Settimana 4. Il numero totale di eventi è allora una **Binomiale di parametri $n$ e $\lambda/n$**.

Ma quale $n$ scegliere? I giorni, le ore, i minuti? La prima ipotesi diventa più credibile quanto più i pezzetti sono corti. Allora facciamo crescere $n$ senza limite e guardiamo **che cosa succede alle probabilità**.

### 12. Il caso «nessun evento» e il numero $e$ {: #numero-e }

Cominciamo dal caso più semplice: **zero eventi** nell'anno. Significa che **tutti** gli $n$ pezzetti sono vuoti. Ciascuno è vuoto con probabilità $1-\lambda/n$, e i pezzetti sono indipendenti:

$$
P(\text{zero eventi})=\left(1-\frac{\lambda}{n}\right)^n.
$$

Calcoliamolo con $\lambda=0{,}61$ e valori di $n$ sempre più grandi:

| Pezzetti $n$ | 1 | 2 | 10 | 100 | 365 | 1000 |
|---|---|---|---|---|---|---|
| $(1-0{,}61/n)^n$ | 0,3900 | 0,4830 | 0,5329 | 0,5423 | 0,5431 | 0,5432 |

I valori **si stabilizzano**: da 365 pezzetti in poi cambiano solo alla quarta cifra decimale. Non dipendono più dalla scelta di $n$, purché $n$ sia grande. Il valore limite è circa 0,5434.

Questo limite ha un nome preciso. In matematica si dimostra che, per qualunque numero $\lambda$,

$$
\left(1-\frac{\lambda}{n}\right)^n\ \longrightarrow\ e^{-\lambda}\qquad\text{quando } n\to\infty,
$$

dove **$e\approx2{,}71828$** è il numero di Nepero, la base dei logaritmi naturali. La freccia si legge «tende a»: aumentando $n$, il valore a sinistra si avvicina quanto vogliamo a $e^{-\lambda}$. Sulla calcolatrice, $e^{-0{,}61}\approx0{,}5434$: è proprio il numero verso cui andava la tabella.

Il numero $e$ compare spesso proprio per questo motivo: è ciò che resta quando una piccola probabilità viene ripetuta moltissime volte. Lo avevamo già incontrato, senza nominarlo così, nell'approssimazione dei compleanni della [Settimana 3](../settimana_03/index.md#compleanni).

**Il primo risultato:** in un corpo-anno, la probabilità di zero morti è circa $e^{-0{,}61}\approx0{,}543$. Su 200 corpi-anno, il numero atteso di corpi-anno senza morti è

$$
200\cdot0{,}5434\approx108{,}7.
$$

Bortkiewicz ne aveva osservati **109**. Confronta questo numero con la stima che avevi scritto alla fine dell'Atto III.

### 13. La PMF di Poisson {: #pmf-poisson }

Lo stesso ragionamento funziona per un evento, due eventi, e così via. Vediamo il caso di **esattamente un evento**, poi generalizziamo.

Esattamente un evento significa: un pezzetto pieno e gli altri $n-1$ vuoti. Il pezzetto pieno si può scegliere in $n$ modi. Ciascuna di queste configurazioni ha probabilità $\frac{\lambda}{n}\left(1-\frac{\lambda}{n}\right)^{n-1}$. Quindi:

$$
P(\text{un evento})=n\cdot\frac{\lambda}{n}\cdot\left(1-\frac{\lambda}{n}\right)^{n-1}
=\lambda\left(1-\frac{\lambda}{n}\right)^{n-1}.
$$

Nel secondo passaggio la $n$ davanti si semplifica con la $n$ al denominatore. Quando $n$ è grandissimo, togliere un solo fattore al prodotto $(1-\lambda/n)^n$ non cambia il limite (il fattore tolto è quasi 1). Quindi il risultato tende a $\lambda\,e^{-\lambda}$.

Con più eventi il conto è lo stesso, solo più lungo: bisogna scegliere quali pezzetti sono pieni (un coefficiente binomiale, come nella Settimana 3) e passare al limite. Il conto completo, passaggio per passaggio, è nella [Lettura B](#derivazione-limite). Il risultato è la **distribuzione di Poisson di parametro $\lambda$**, con $\lambda>0$:

$$
\boxed{P(X=k)=\frac{\lambda^k\,e^{-\lambda}}{k!},\qquad k=0,1,2,\dots}
$$

Scriviamo $X\sim\operatorname{Poisson}(\lambda)$. Rileggiamo i simboli uno per uno:

* $k$ è il numero di eventi di cui chiediamo la probabilità. Può valere 0, 1, 2, … senza un massimo, come per la Geometrica;
* $\lambda^k$ è $\lambda$ moltiplicato per sé stesso $k$ volte, con $\lambda^0=1$;
* $k!$ (si legge «$k$ fattoriale») è il prodotto $1\cdot2\cdots k$, già incontrato nella Settimana 3, con la convenzione $0!=1$;
* $e^{-\lambda}$ è la probabilità di zero eventi, che ritroviamo come fattore comune in tutte le probabilità.

Controlliamo i primi due casi: con $k=0$ la formula dà $\lambda^0e^{-\lambda}/0!=e^{-\lambda}$, con $k=1$ dà $\lambda\,e^{-\lambda}$. Sono proprio i due risultati appena ottenuti.

**Un modo comodo di fare i conti.** Passando da $k-1$ a $k$, la formula guadagna un fattore $\lambda$ al numeratore e un fattore $k$ al denominatore. Quindi:

$$
P(X=k)=P(X=k-1)\cdot\frac{\lambda}{k}.
$$

Si parte da $P(X=0)=e^{-\lambda}$ e si moltiplica ogni volta per $\lambda/k$. Con $\lambda=0{,}61$:

$$
P(X=0)\approx0{,}5434,\quad
P(X=1)\approx0{,}5434\cdot0{,}61\approx0{,}3314,\quad
P(X=2)\approx0{,}3314\cdot\frac{0{,}61}{2}\approx0{,}1011.
$$

**Le probabilità sommano a 1?** Ogni probabilità contiene il fattore $e^{-\lambda}$. Raccogliendolo:

$$
\sum_{k=0}^{\infty}\frac{\lambda^k e^{-\lambda}}{k!}
=e^{-\lambda}\left(1+\lambda+\frac{\lambda^2}{2!}+\frac{\lambda^3}{3!}+\cdots\right).
$$

La somma tra parentesi è una delle serie più importanti dell'analisi: vale esattamente $e^{\lambda}$. Lo verifichiamo numericamente con $\lambda=0{,}61$: i primi termini sono $1+0{,}61+0{,}186+0{,}0378+0{,}0058+\cdots\approx1{,}8404$, e la calcolatrice dà $e^{0{,}61}\approx1{,}8404$. Quindi il totale è $e^{-\lambda}e^{\lambda}=1$: abbiamo davvero una PMF.

### 14. Il confronto con i dati di Bortkiewicz {: #confronto-dati }

Ora possiamo completare la tabella prevista. Se ogni corpo-anno ha un numero di morti con distribuzione $\operatorname{Poisson}(0{,}61)$, il **numero atteso di corpi-anno** con esattamente $k$ morti è

$$
200\cdot P(X=k).
$$

Perché si moltiplica per 200? Per ogni corpo-anno consideriamo l'indicatrice dell'evento «ha avuto esattamente $k$ morti». La sua media è $P(X=k)$. Il numero di corpi-anno con $k$ morti è la somma di 200 indicatrici, e la linearità della [Settimana 4](../settimana_04/index.md#collisioni) dà $200\cdot P(X=k)$.

Ecco il confronto. La terza riga è quella pubblicata da Bortkiewicz a pagina 25 del suo libro:

| Morti nel corpo-anno $k$ | 0 | 1 | 2 | 3 | 4 | 5 o più |
|---|---|---|---|---|---|---|
| Corpi-anno osservati | 109 | 65 | 22 | 3 | 1 | 0 |
| Corpi-anno attesi, $200\cdot P(X=k)$ | 108,7 | 66,3 | 20,2 | 4,1 | 0,6 | 0,1 |

<figure markdown="0">
<svg viewBox="0 0 560 240" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Grafico a barre affiancate. Per zero morti: 109 osservati e 108,7 attesi. Per un morto: 65 e 66,3. Per due: 22 e 20,2. Per tre: 3 e 4,1. Per quattro: 1 e 0,6. Le coppie di barre quasi coincidono.">
<path d="M50 190H530" stroke="currentColor"/>
<g fill="#4051b5"><rect x="80" y="70" width="30" height="120"/><rect x="175" y="118.5" width="30" height="71.5"/><rect x="270" y="165.8" width="30" height="24.2"/><rect x="365" y="186.7" width="30" height="3.3"/><rect x="460" y="188.9" width="30" height="1.1"/></g>
<g fill="#e07a1f"><rect x="112" y="70.4" width="30" height="119.6"/><rect x="207" y="117.1" width="30" height="72.9"/><rect x="302" y="167.8" width="30" height="22.2"/><rect x="397" y="185.5" width="30" height="4.5"/><rect x="492" y="189.3" width="30" height="0.7"/></g>
<g fill="currentColor" text-anchor="middle"><text x="95" y="64">109</text><text x="127" y="50">108,7</text><text x="190" y="112">65</text><text x="222" y="98">66,3</text><text x="285" y="160">22</text><text x="317" y="146">20,2</text><text x="380" y="180">3</text><text x="412" y="166">4,1</text><text x="475" y="183">1</text><text x="507" y="169">0,6</text></g>
<g fill="currentColor" text-anchor="middle" font-weight="bold"><text x="111" y="208">0</text><text x="206" y="208">1</text><text x="301" y="208">2</text><text x="396" y="208">3</text><text x="491" y="208">4</text></g>
<text x="290" y="230" text-anchor="middle" fill="currentColor">morti nel corpo-anno</text>
<rect x="300" y="18" width="14" height="14" fill="#4051b5"/><text x="320" y="30" fill="currentColor">osservati</text>
<rect x="400" y="18" width="14" height="14" fill="#e07a1f"/><text x="420" y="30" fill="currentColor">attesi (Poisson)</text>
</svg>
<figcaption>Dati di Bortkiewicz (1898) e previsione Poisson con λ = 0,61: ogni coppia di barre quasi coincide.</figcaption>
</figure>

La corrispondenza è impressionante. Con **un solo numero**, la media 0,61, la Poisson ricostruisce l'intera tabella. Bortkiewicz commentò che l'accordo tra teoria ed esperienza «non lascia nulla a desiderare» (traduzione nostra dal tedesco: *«nichts zu wünschen übrig»*).

Non è un accordo perfetto, e non deve esserlo: anche se il modello fosse esatto, 200 corpi-anno sono un campione finito, e le frequenze osservate oscillano intorno a quelle attese. Il laboratorio di questo atto lo mostra.

Ecco la «legge dei piccoli numeri»: **eventi rari, prodotti da moltissime occasioni indipendenti, seguono una legge regolare**. Ogni singolo incidente resta imprevedibile; la distribuzione dei conteggi no. Questo rovescia l'intuizione: il caos dei casi singoli produce l'ordine del totale.

**Micro-riepilogo.** Abbiamo diviso l'intervallo in tanti pezzetti, ciascuno con probabilità $\lambda/n$ di contenere un evento. Facendo crescere $n$, la Binomiale tende alla Poisson, che dipende solo da $\lambda$. Con $\lambda=0{,}61$ la Poisson riproduce la tabella di Bortkiewicz.

### 15. Media e varianza: il segno di riconoscimento {: #media-varianza-poisson }

Il parametro $\lambda$ era stato scelto come numero medio di eventi. La Poisson lo rispetta? Per ogni $n$, la Binomiale di parametri $n$ e $\lambda/n$ ha media $n\cdot\lambda/n=\lambda$. La media resta $\lambda$ a ogni passo, e quindi anche nel limite:

$$
\boxed{\mathbb{E}[X]=\lambda.}
$$

E la dispersione? Nella [Settimana 4, Lettura A](../settimana_04/index.md#varianza) abbiamo definito la **varianza** $\operatorname{Var}(X)=\mathbb{E}[(X-\mu)^2]$, la media dei quadrati degli scarti dalla media $\mu$, e abbiamo ricavato che una Binomiale ha varianza $np(1-p)$. Con $p=\lambda/n$:

$$
n\cdot\frac{\lambda}{n}\cdot\left(1-\frac{\lambda}{n}\right)=\lambda\left(1-\frac{\lambda}{n}\right).
$$

Quando $n$ cresce, la frazione $\lambda/n$ diventa trascurabile e la parentesi tende a 1. La varianza tende a $\lambda$:

$$
\boxed{\operatorname{Var}(X)=\lambda.}
$$

Una dimostrazione diretta, che non passa dal limite, è nella [Lettura B](#media-varianza-diretta).

**Media e varianza coincidono.** È il segno di riconoscimento della Poisson, e ha una conseguenza pratica: **se un conteggio è Poisson, la sua varianza deve essere vicina alla sua media**. Si può controllare sui dati.

Bortkiewicz fece esattamente questo controllo. Nel suo libro confronta la dispersione attesa dalla teoria con quella effettiva dei dati, e trova lo stesso valore, 0,61, per entrambe. Ripetiamo il conto con la tabella. La media è 0,61. La media dei **quadrati** dei conteggi è:

$$
\frac{0^2\cdot109+1^2\cdot65+2^2\cdot22+3^2\cdot3+4^2\cdot1}{200}
=\frac{0+65+88+27+16}{200}=\frac{196}{200}=0{,}98.
$$

Usiamo l'identità della Settimana 4, $\operatorname{Var}=\mathbb{E}[X^2]-\mu^2$:

$$
0{,}98-0{,}61^2=0{,}98-0{,}3721\approx0{,}608.
$$

Varianza dei dati 0,608, media 0,61: il segno di riconoscimento c'è.

Un'ultima osservazione sulla forma. La varianza misura la dispersione in **unità al quadrato**; la sua radice, $\sqrt{\lambda}$, si misura nelle stesse unità dei conteggi. Con $\lambda=100$ eventi in media, le oscillazioni tipiche sono dell'ordine di $\sqrt{100}=10$: dieci eventi su cento. Con $\lambda=1$, oscillazioni dell'ordine di 1 su 1. **Più gli eventi sono numerosi, più le oscillazioni sono piccole rispetto alla media.**

#### Esplora: un solo parametro {: #widget-poisson }

La curva tratteggiata è la Poisson di Bortkiewicz, $\lambda=0{,}61$. Muovi il cursore. Con $\lambda$ piccolo la barra più alta è lo zero: l'evento raro, nella maggior parte degli intervalli, non accade. Aumentando $\lambda$ la massa si sposta a destra e si allarga. Prima di muoverlo, prevedi: per quale valore di $\lambda$ la probabilità di zero eventi scende sotto il 5%?

<div class="psi-widget" id="s05-poisson"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  function massa(k, p) {
    // P(X = 0) = e^(-λ), poi ogni passo moltiplica per λ / j.
    var valore = Math.exp(-p.lam);
    for (var j = 1; j <= k; j++) valore *= p.lam / j;
    return valore;
  }
  PSIWidget.mount('s05-poisson', {
    type: 'bar', xLabel: 'Numero di eventi k', yLabel: 'P(X = k)',
    xDomain: [0, 15], liveLabel: 'Poisson corrente', fn: massa,
    params: [{key: 'lam', label: 'λ (numero medio di eventi)',
      min: 0.1, max: 10, step: 0.01, value: 0.61}],
    reference: {label: 'Bortkiewicz: λ = 0,61', params: {lam: 0.61}},
    stats: function (p) { return [
      {label: 'E[X] = λ', value: p.lam.toFixed(2)},
      {label: 'Var(X) = λ', value: p.lam.toFixed(2)},
      {label: 'P(X = 0) = e^(−λ)', value: Math.exp(-p.lam).toFixed(4)},
      {label: 'corpi-anno attesi con 0 eventi su 200',
       value: (200 * Math.exp(-p.lam)).toFixed(1)}
    ]; },
    caption: 'Un solo cursore governa tutto: posizione, larghezza e probabilità dello zero.'
  });
});
</script>

La risposta alla domanda: $e^{-\lambda}<0{,}05$ quando $\lambda$ supera circa 3. Con tre eventi attesi, un intervallo completamente vuoto capita meno di una volta su venti.

### 16. Laboratorio: rifare il conto di Bortkiewicz {: #lab-bortkiewicz }

Il secondo script parte dalla tabella osservata. Calcola $\lambda$ come numero medio di morti per corpo-anno, costruisce i conteggi attesi e confronta media e varianza dei dati. Infine disegna le due serie di barre.

<div class="psi-exec" markdown="1">
```python
from math import exp, factorial

import matplotlib.pyplot as plt

# Bortkiewicz (1898), § 12: 10 corpi d'armata per 20 anni.
osservati = {0: 109, 1: 65, 2: 22, 3: 3, 4: 1}
corpi_anno = sum(osservati.values())
morti = sum(k * f for k, f in osservati.items())
lam = morti / corpi_anno   # numero medio di morti per corpo-anno
assert corpi_anno == 200 and morti == 122


def poisson(k, lam):
    return exp(-lam) * lam ** k / factorial(k)


print(f"lambda = {morti}/{corpi_anno} = {lam:.2f}")
print(" k  osservati  attesi")
for k, f in osservati.items():
    # Conteggio atteso = numero di corpi-anno x probabilità.
    print(f"{k:2d}  {f:9d}  {corpi_anno * poisson(k, lam):6.1f}")

# Media e varianza dei dati: per una Poisson dovrebbero coincidere.
media = morti / corpi_anno
quadrati = sum(k * k * f for k, f in osservati.items()) / corpi_anno
print(f"Media dei dati: {media:.3f}")
print(f"Varianza dei dati: {quadrati - media ** 2:.3f}")

k = list(osservati)
plt.bar([x - 0.2 for x in k], list(osservati.values()), width=0.4,
        label="Osservati (Bortkiewicz)")
plt.bar([x + 0.2 for x in k],
        [corpi_anno * poisson(x, lam) for x in k], width=0.4,
        label="Attesi con Poisson(0,61)")
plt.xticks(k)
plt.xlabel("Morti in un corpo-anno")
plt.ylabel("Numero di corpi-anno")
plt.legend()
plt.tight_layout()
plt.show()
```
</div>

Lo script stampa la stessa tabella di Bortkiewicz e una varianza di 0,608. Prova a sostituire i dati con quelli di tutti i 14 corpi d'armata, che Bortkiewicz pubblica una pagina prima: `{0: 144, 1: 91, 2: 32, 3: 11, 4: 2}`, su 280 corpi-anno (togli o aggiorna l'`assert`). La media sale a 0,70 e l'accordo resta buono, ma un po' meno stretto: la varianza dei dati supera leggermente la media. Mescolare corpi di composizione diversa aggiunge una dispersione che la Poisson non prevede.

### 17. Il significato di $\lambda$: un tasso {: #tasso }

Nell'esempio di Bortkiewicz $\lambda$ è un numero medio di eventi **per corpo-anno**. In generale, $\lambda$ è sempre legato a un **intervallo**: di tempo (un secondo, un giorno), di spazio (una pagina, un metro quadrato di superficie), o di «quantità» (un megabyte trasmesso).

Se gli eventi arrivano senza preferenze lungo il tempo, raddoppiare l'intervallo raddoppia il numero medio di eventi. Per esempio, se un server riceve in media **3 richieste al secondo**:

* in 1 secondo il numero di richieste è $\operatorname{Poisson}(3)$;
* in 10 secondi è $\operatorname{Poisson}(30)$;
* in mezzo secondo è $\operatorname{Poisson}(1{,}5)$.

Il ragionamento dei pezzetti si applica a qualsiasi intervallo: basta usare come $\lambda$ il numero medio di eventi **in quell'intervallo**. La probabilità che in un secondo non arrivi nessuna richiesta è $e^{-3}\approx0{,}050$; in mezzo secondo sale a $e^{-1{,}5}\approx0{,}223$.

**Errore frequente:** usare il tasso di un intervallo per un intervallo diverso. Se una domanda chiede «in un minuto» e il dato è «al secondo», bisogna prima convertire $\lambda$.

## Atto V — Richieste, guasti e attese: due modelli a confronto {: #informatica }

### 18. Perché le richieste a un server sono (spesso) Poisson {: #richieste }

Un servizio web ha migliaia di utenti. Ciascuno, in un dato secondo, invia una richiesta con una probabilità piccola, e gli utenti agiscono in modo indipendente l'uno dall'altro. È la stessa struttura dei calci di cavallo: **molte occasioni indipendenti, ciascuna rara**. Il numero di richieste in un secondo è quindi, con ottima approssimazione, una Poisson.

Lo stesso schema descrive molti conteggi che un informatico incontra:

* i pacchetti persi in un collegamento in un minuto;
* i guasti dei dischi in un datacenter in un mese;
* le chiamate a un servizio di assistenza in un'ora;
* gli errori di battitura in una pagina, gli errori di trasmissione in un megabyte.

Per dimensionare un sistema servono proprio queste probabilità: quanto è probabile che in un secondo arrivino più di 5 richieste, se la media è 3? Basta sommare la PMF da 0 a 5 e togliere da 1: si ottiene circa 0,084. Un server che regge 5 richieste al secondo va in sovraccarico in circa un secondo su dodici.

### 19. Quando non è Poisson: la varianza fa da spia {: #sovradispersione }

Le ipotesi dei pezzetti sono tre: eventi uno alla volta, stessa probabilità ovunque, indipendenza. Nella realtà possono cadere tutte.

* **Raffiche.** Un post diventa virale e migliaia di utenti arrivano insieme: le richieste non sono più indipendenti.
* **Ritmi.** Di notte arrivano meno richieste che di giorno: la probabilità non è la stessa in ogni pezzetto.
* **Effetti a catena.** Un client che fallisce ritenta, e il nuovo tentativo è un'altra richiesta, provocata dalla prima: le richieste si generano a vicenda.

In tutti questi casi i conteggi oscillano **più** di quanto preveda una Poisson con la stessa media. La varianza dei dati diventa molto più grande della media. Si parla di **sovradispersione**. Il controllo che fece Bortkiewicz, varianza contro media, è quindi un primo test semplice per capire se il modello è credibile.

Questo ha conseguenze concrete. Se dimensioni un server con la Poisson quando il traffico arriva a raffiche, sottostimi i picchi, e il sistema cade proprio quando serve di più.

### 20. Laboratorio: un secondo di traffico, ventimila volte {: #lab-richieste }

Il terzo script simula 10.000 utenti. In ogni secondo ciascuno invia una richiesta con probabilità 0,0003, quindi il numero medio è $\lambda=10000\cdot0{,}0003=3$. Il numero di richieste in un secondo è una Binomiale con $n$ grande e $p$ piccolo. Lo script osserva 20.000 secondi e confronta le frequenze con la Poisson che ha la stessa media dei dati.

<div class="psi-exec" markdown="1">
```python
from math import exp, factorial

import numpy as np

rng = np.random.default_rng(42)
utenti = 10000      # client che possono inviare una richiesta
p = 0.0003          # probabilità che uno di loro la invii in 1 secondo
secondi = 20000     # quanti secondi osserviamo
raffica = False     # prova True: a volte tutti diventano più attivi

lam = utenti * p    # richieste attese al secondo
p_secondo = np.full(secondi, p)
if raffica:
    # Nel 10% dei secondi ogni client è 5 volte più attivo.
    p_secondo[rng.random(secondi) < 0.1] = 5 * p
# Ogni secondo: quanti dei 10000 client inviano (una Binomiale).
richieste = rng.binomial(utenti, p_secondo)

media = richieste.mean()
print(f"lambda = n * p = {lam:.1f}")
print(f"Media osservata: {media:.3f}")
print(f"Varianza osservata: {richieste.var():.3f}")
# Confronto con la Poisson che ha la stessa media dei dati.
print(" k  frequenza  Poisson")
for k in range(9):
    freq = np.mean(richieste == k)
    teoria = exp(-media) * media ** k / factorial(k)
    print(f"{k:2d}  {freq:9.4f}  {teoria:7.4f}")
```
</div>

Con `raffica = False` media e varianza sono entrambe vicine a 3 e le due colonne coincidono quasi cifra per cifra. Ora metti `raffica = True`. In un secondo su dieci tutti gli utenti diventano cinque volte più attivi. La media sale a circa 4,2, ma la varianza esplode oltre 16. Le frequenze non somigliano più alla Poisson con la stessa media: ci sono troppi secondi tranquilli e troppi secondi affollati. **La media da sola non basta a riconoscere il modello; la varianza lo smaschera.**

### 21. Geometrica o Poisson? {: #geometrica-o-poisson }

Le due distribuzioni di questa settimana nascono dallo stesso mondo, prove indipendenti con due esiti, ma rispondono a domande diverse. Per scegliere il modello giusto bisogna chiedersi **che cosa stiamo contando**.

| | Geometrica$(p)$ | Poisson$(\lambda)$ |
|---|---|---|
| Domanda | **Quanto aspetto** il primo successo? | **Quanti eventi** in un intervallo? |
| Che cosa è fissato | la probabilità $p$ di ogni prova | l'intervallo e il numero medio $\lambda$ |
| Che cosa è incerto | il numero della prova riuscita | il numero di eventi |
| Valori | $1,2,3,\dots$ | $0,1,2,\dots$ |
| PMF | $(1-p)^{k-1}p$ | $\lambda^ke^{-\lambda}/k!$ |
| Media | $1/p$ | $\lambda$ |
| Esempio informatico | tentativi fino alla prima risposta | richieste in un secondo |

Un modo per distinguerle: nella Geometrica il valore 0 è impossibile (serve almeno una prova); nella Poisson lo zero è spesso il valore più probabile. E un'osservazione che le collega: **la Geometrica guarda il tempo, la Poisson guarda i conteggi**. Nelle prossime settimane vedremo che anche l'attesa tra due eventi di Poisson ha una distribuzione propria, la versione continua della Geometrica.

**Micro-riepilogo dell'Atto V.** Molte occasioni indipendenti e rare producono conteggi di Poisson: richieste, guasti, pacchetti persi. Il controllo media contro varianza aiuta a capire quando il modello regge. Per i tempi di attesa in prove ripetute, il modello è invece la Geometrica.

## Lettura A — Il filtro di Bloom: rispondere «forse» per risparmiare memoria {: #bloom }

*Lettura di approfondimento, fuori dal nucleo d'esame orale.*

Un browser vuole controllare se un indirizzo web è in una lista di siti pericolosi. La lista contiene milioni di indirizzi. Tenerla tutta in memoria costa molto; interrogare un server per ogni pagina costa tempo. Esiste una via di mezzo: una struttura che occupa poca memoria e risponde in due modi soltanto, **«sicuramente no»** oppure **«forse sì»**. Solo nel secondo caso si fa il controllo costoso.

Questa struttura è il **filtro di Bloom**, proposto da Burton H. Bloom nel 1970. È fatto così:

* un vettore di $m$ bit, tutti inizialmente a 0;
* $k$ funzioni hash diverse, ciascuna delle quali manda un elemento in una posizione tra $0$ e $m-1$.

**Inserire** un elemento significa calcolare le sue $k$ posizioni e mettere a 1 quei bit. **Interrogare** un elemento significa calcolare le sue $k$ posizioni e guardare i bit: se anche uno solo è 0, l'elemento **non è mai stato inserito**; se sono tutti 1, **forse** lo è stato.

<figure markdown="0">
<svg viewBox="0 0 560 225" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Un vettore di 12 bit. gatto mette a uno i bit 2 e 7, cane i bit 4 e 9. topo, mai inserito, cade sui bit 2 e 9, entrambi a uno: il filtro risponde forse, ed è un falso positivo.">
<defs><marker id="s05-bloom-freccia" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="currentColor"/></marker><marker id="s05-bloom-rossa" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#e03a3a"/></marker></defs>
<g fill="currentColor" font-weight="bold" text-anchor="middle"><text x="180" y="22">gatto</text><text x="380" y="22">cane</text></g>
<g stroke="currentColor" fill="none" marker-end="url(#s05-bloom-freccia)"><path d="M172 28L142 82"/><path d="M190 28L338 82"/><path d="M370 28L222 82"/><path d="M388 28L418 82"/></g>
<g stroke="currentColor" fill="none"><rect x="40" y="88" width="40" height="40"/><rect x="80" y="88" width="40" height="40"/><rect x="160" y="88" width="40" height="40"/><rect x="240" y="88" width="40" height="40"/><rect x="280" y="88" width="40" height="40"/><rect x="360" y="88" width="40" height="40"/><rect x="440" y="88" width="40" height="40"/><rect x="480" y="88" width="40" height="40"/></g>
<g fill="#4051b5"><rect x="120" y="88" width="40" height="40"/><rect x="200" y="88" width="40" height="40"/><rect x="320" y="88" width="40" height="40"/><rect x="400" y="88" width="40" height="40"/></g>
<g fill="currentColor" text-anchor="middle"><text x="60" y="113">0</text><text x="100" y="113">0</text><text x="180" y="113">0</text><text x="260" y="113">0</text><text x="300" y="113">0</text><text x="380" y="113">0</text><text x="460" y="113">0</text><text x="500" y="113">0</text></g>
<g fill="#fff" text-anchor="middle" font-weight="bold"><text x="140" y="113">1</text><text x="220" y="113">1</text><text x="340" y="113">1</text><text x="420" y="113">1</text></g>
<g fill="currentColor" text-anchor="middle" font-size="11"><text x="60" y="143">0</text><text x="100" y="143">1</text><text x="140" y="143">2</text><text x="180" y="143">3</text><text x="220" y="143">4</text><text x="260" y="143">5</text><text x="300" y="143">6</text><text x="340" y="143">7</text><text x="380" y="143">8</text><text x="420" y="143">9</text><text x="460" y="143">10</text><text x="500" y="143">11</text></g>
<text x="280" y="205" text-anchor="middle" fill="#e03a3a" font-weight="bold">topo</text>
<g stroke="#e03a3a" fill="none" marker-end="url(#s05-bloom-rossa)"><path d="M266 192L142 152"/><path d="M294 192L418 152"/></g>
<text x="280" y="222" text-anchor="middle" fill="#e03a3a">bit 2 e 9 già a 1: «forse sì», ma topo non è mai stato inserito</text>
</svg>
<figcaption>Due elementi inseriti con due funzioni hash ciascuno; un terzo elemento, mai inserito, trova accesi tutti i suoi bit: falso positivo.</figcaption>
</figure>

Il filtro **non sbaglia mai in un verso**: un elemento inserito ha acceso tutti i suoi bit, e nessuno li spegne. Quindi un «no» è sempre giusto: **non esistono falsi negativi**. Nell'altro verso invece può sbagliare: i bit di un elemento mai inserito possono essere stati accesi da altri elementi. È un **falso positivo**, come «topo» nella figura.

**Quanto spesso sbaglia?** Qui ritroviamo il limite di questa settimana. Supponiamo di aver inserito $n$ elementi, e di trattare le posizioni restituite dalle funzioni hash come indipendenti e uniformi sugli $m$ bit (lo stesso modello ideale delle tabelle hash della Settimana 3). In tutto le funzioni hash hanno colpito $kn$ volte. Un bit fissato è stato mancato ogni volta con probabilità $1-1/m$, quindi resta a 0 con probabilità

$$
\left(1-\frac1m\right)^{kn}\approx e^{-kn/m}.
$$

È lo stesso passaggio al limite della probabilità di «zero eventi»: tante occasioni ($kn$ colpi), ciascuna con una piccola probabilità ($1/m$) di toccare quel bit. Un elemento mai inserito è un falso positivo se tutti i suoi $k$ bit sono a 1. Trattando i $k$ bit come indipendenti (è un'approssimazione, molto buona quando $m$ è grande), la probabilità di falso positivo è circa

$$
\left(1-e^{-kn/m}\right)^k.
$$

Un esempio: $n=100$ elementi, $m=1000$ bit, $k=7$ funzioni hash. Allora $kn/m=0{,}7$, $e^{-0{,}7}\approx0{,}497$, e il tasso di falsi positivi è circa $(0{,}503)^7\approx0{,}008$: meno di un errore su cento interrogazioni, con soli 10 bit per elemento. Memorizzare 100 indirizzi web completi occuperebbe facilmente decine di migliaia di bit.

Filtri di questo tipo si usano nei database distribuiti (per evitare letture su disco inutili), nelle reti di distribuzione dei contenuti e nei browser. Accettano un'incertezza piccola e controllata in cambio di un grande risparmio di memoria.

## Lettura B — La derivazione completa {: #derivazione-limite }

*Lettura facoltativa. All'orale basta l'idea dei pezzetti e il caso di zero eventi.*

### Dalla Binomiale alla Poisson, passaggio per passaggio

Sia $X_n\sim\operatorname{Binomiale}(n,\lambda/n)$, con $n>\lambda$ perché $\lambda/n$ sia una probabilità. Fissiamo un intero $k\ge0$ e prendiamo $n\ge k$. Dalla PMF binomiale della [Settimana 4](../settimana_04/index.md#pmf-binomiale):

$$
P(X_n=k)=\binom nk\left(\frac\lambda n\right)^k\left(1-\frac\lambda n\right)^{n-k}.
$$

**Primo passaggio: aprire il coefficiente binomiale.** Ricordiamo che $\binom nk=\frac{n(n-1)\cdots(n-k+1)}{k!}$: al numeratore ci sono $k$ fattori.

$$
P(X_n=k)=\frac{n(n-1)\cdots(n-k+1)}{k!}\cdot\frac{\lambda^k}{n^k}\cdot\left(1-\frac\lambda n\right)^{n-k}.
$$

**Secondo passaggio: riordinare i fattori in quattro gruppi.** Spezziamo anche la potenza, usando $a^{n-k}=a^n\cdot a^{-k}$:

$$
P(X_n=k)=
\underbrace{\frac{n(n-1)\cdots(n-k+1)}{n^k}}_{\text{(a)}}
\cdot
\underbrace{\frac{\lambda^k}{k!}}_{\text{(b)}}
\cdot
\underbrace{\left(1-\frac\lambda n\right)^{n}}_{\text{(c)}}
\cdot
\underbrace{\left(1-\frac\lambda n\right)^{-k}}_{\text{(d)}}.
$$

**Terzo passaggio: che cosa fa ciascun gruppo quando $n$ cresce**, con $k$ e $\lambda$ fissati.

* **(a)** Abbiamo $k$ fattori al numeratore e $k$ fattori $n$ al denominatore. Accoppiandoli: $\frac nn\cdot\frac{n-1}n\cdots\frac{n-k+1}n$. Ogni frazione tende a 1 (per esempio $\frac{n-1}{n}=1-\frac1n$), e il numero di frazioni, $k$, è fisso. Quindi (a) tende a 1.
* **(b)** Non contiene $n$: resta $\frac{\lambda^k}{k!}$.
* **(c)** È il limite del numero $e$: tende a $e^{-\lambda}$.
* **(d)** La base $1-\lambda/n$ tende a 1, e l'esponente $-k$ è fisso. Quindi (d) tende a $1^{-k}=1$.

**Conclusione.** Moltiplicando i quattro limiti:

$$
P(X_n=k)\ \longrightarrow\ 1\cdot\frac{\lambda^k}{k!}\cdot e^{-\lambda}\cdot1=\frac{\lambda^ke^{-\lambda}}{k!}.
$$

Questo è il senso preciso della frase «la Poisson è il limite della Binomiale quando $n$ è grande, $p$ è piccolo e $np=\lambda$». In pratica si usa come **approssimazione**: per una Binomiale con $n$ grande e $p$ piccolo, i conti con la Poisson di parametro $\lambda=np$ sono molto vicini a quelli esatti e molto più semplici. Con $\lambda=3$ e $n=100$ le differenze sono già sotto 0,005; con $n=10000$ sono alla quarta cifra decimale.

### Media e varianza senza passare dal limite {: #media-varianza-diretta }

**La media.** Partiamo dalla definizione. Il termine con $k=0$ vale zero, quindi la somma parte da $k=1$:

$$
\mathbb{E}[X]=\sum_{k=1}^{\infty}k\cdot\frac{\lambda^ke^{-\lambda}}{k!}.
$$

Semplifichiamo $\frac{k}{k!}=\frac{1}{(k-1)!}$, perché $k!=k\cdot(k-1)!$. Poi raccogliamo un $\lambda$ e il fattore $e^{-\lambda}$:

$$
\mathbb{E}[X]=\lambda e^{-\lambda}\sum_{k=1}^{\infty}\frac{\lambda^{k-1}}{(k-1)!}.
$$

Chiamiamo $j=k-1$: quando $k$ va da 1 all'infinito, $j$ va da 0 all'infinito. La somma diventa $\sum_{j\ge0}\lambda^j/j!=e^\lambda$, la stessa serie usata per verificare che la PMF somma a 1:

$$
\mathbb{E}[X]=\lambda e^{-\lambda}e^{\lambda}=\lambda.
$$

**La varianza.** Il trucco è calcolare prima $\mathbb{E}[X(X-1)]$, che si semplifica allo stesso modo. Ora sono i termini con $k=0$ e $k=1$ a valere zero:

$$
\mathbb{E}[X(X-1)]=\sum_{k=2}^{\infty}k(k-1)\frac{\lambda^ke^{-\lambda}}{k!}
=\lambda^2e^{-\lambda}\sum_{k=2}^{\infty}\frac{\lambda^{k-2}}{(k-2)!}
=\lambda^2e^{-\lambda}e^{\lambda}=\lambda^2.
$$

Abbiamo usato $\frac{k(k-1)}{k!}=\frac1{(k-2)!}$ e raccolto $\lambda^2$. Per linearità, $\mathbb{E}[X(X-1)]=\mathbb{E}[X^2]-\mathbb{E}[X]$, quindi

$$
\mathbb{E}[X^2]=\lambda^2+\lambda.
$$

Infine, con l'identità $\operatorname{Var}(X)=\mathbb{E}[X^2]-\mu^2$:

$$
\operatorname{Var}(X)=\lambda^2+\lambda-\lambda^2=\lambda.
$$

## Esercizi: prima prova, poi apri la soluzione {: #esercizi }

### Esercizio 1 — Tentativi {: #esercizio-1 }

Un client invia una richiesta; ogni tentativo riesce con probabilità 0,2, indipendentemente dagli altri. Sia $X$ il numero del tentativo che riesce. Calcola $P(X=1)$, $P(X=2)$, $P(X=3)$. Qual è la probabilità che non bastino 3 tentativi? Scrivi la formula per «non bastano $k$ tentativi».

??? esempio-svolto "Soluzione ragionata"
    $P(X=1)=0{,}2$; $P(X=2)=0{,}8\cdot0{,}2=0{,}16$; $P(X=3)=0{,}8^2\cdot0{,}2=0{,}128$. «Non bastano 3 tentativi» significa che i primi 3 falliscono: $0{,}8^3=0{,}512$. Si può controllare con il complementare: $1-(0{,}2+0{,}16+0{,}128)=0{,}512$. In generale $P(X>k)=0{,}8^k$. Errore tipico: scrivere $0{,}8^3\cdot0{,}2$, che è la probabilità di riuscire **esattamente** al quarto tentativo.

### Esercizio 2 — Il tempo medio di un retry {: #esercizio-2 }

Con i dati dell'esercizio 1, ogni tentativo occupa 300 millisecondi, timeout compreso. Qual è il numero medio di tentativi? E il tempo medio totale? Come cambiano se ogni tentativo riesce con probabilità 0,5?

??? esempio-svolto "Soluzione ragionata"
    Media dei tentativi: $1/0{,}2=5$. Il tempo è $T=0{,}3\,X$ secondi, quindi per linearità $\mathbb{E}[T]=0{,}3\cdot5=1{,}5$ secondi. Con $p=0{,}5$: in media 2 tentativi e 0,6 secondi. Raddoppiare l'affidabilità del singolo tentativo, da 0,2 a 0,5, riduce il tempo medio a meno della metà.

### Esercizio 3 — Il ritardatario {: #esercizio-3 }

Il 53 esce sulla ruota di Venezia con probabilità $1/18$ a ogni estrazione. (a) Qual è il numero medio di estrazioni per vederlo uscire? (b) Qual è la probabilità che manchi per almeno 18 estrazioni di fila? (c) Il 53 manca da 50 estrazioni: qual è la probabilità che esca alla prossima? E che manchi per altre 18?

??? esempio-svolto "Soluzione ragionata"
    (a) $1/p=18$. (b) Mancare per 18 estrazioni di fila significa $X>18$: $(17/18)^{18}\approx0{,}357$. La media 18 non è una garanzia. (c) Per l'assenza di memoria, esattamente $1/18$; la probabilità di altre 18 assenze resta $(17/18)^{18}\approx0{,}357$. Le 50 assenze già osservate non contano.

### Esercizio 4 — Zero eventi {: #esercizio-4 }

Un server riceve in media 3 richieste al secondo, e il numero di richieste in un secondo è Poisson. Qual è la probabilità che in un secondo non arrivi nessuna richiesta? E in un intero minuto, se le richieste seguono una Poisson con la media corrispondente?

??? esempio-svolto "Soluzione ragionata"
    In un secondo $\lambda=3$: $P(X=0)=e^{-3}\approx0{,}0498$. In un minuto il numero medio è $3\cdot60=180$, quindi $P(X=0)=e^{-180}$, un numero così piccolo da essere praticamente zero (ha 78 zeri dopo la virgola). Errore tipico: usare $\lambda=3$ anche per il minuto.

### Esercizio 5 — Completare la tabella di Bortkiewicz {: #esercizio-5 }

Con $\lambda=0{,}61$ e $P(X=0)\approx0{,}5434$, calcola $P(X=1)$, $P(X=2)$ e $P(X=3)$ usando la regola $P(X=k)=P(X=k-1)\cdot\lambda/k$. Moltiplica per 200 e confronta con i dati: 65, 22, 3.

??? esempio-svolto "Soluzione ragionata"
    $P(X=1)\approx0{,}5434\cdot0{,}61\approx0{,}3314$, attesi $66{,}3$. $P(X=2)\approx0{,}3314\cdot0{,}305\approx0{,}1011$, attesi $20{,}2$. $P(X=3)\approx0{,}1011\cdot0{,}61/3\approx0{,}0206$, attesi $4{,}1$. Gli scarti dai dati (65, 22, 3) sono piccoli e di segno diverso: è quello che ci si aspetta da un campione finito.

### Esercizio 6 — La varianza dei dati {: #esercizio-6 }

Dalla tabella osservata di Bortkiewicz calcola la media dei quadrati dei conteggi e la varianza. È vicina alla media 0,61? Che cosa diresti se avessi trovato una varianza di 2?

??? esempio-svolto "Soluzione ragionata"
    $\mathbb{E}[X^2]=(65+4\cdot22+9\cdot3+16\cdot1)/200=196/200=0{,}98$. Varianza $0{,}98-0{,}61^2\approx0{,}608$: praticamente uguale alla media, come richiede la Poisson. Una varianza di 2, con media 0,61, sarebbe un segnale di sovradispersione: per esempio anni o corpi con rischi molto diversi, o incidenti che coinvolgono più persone insieme. La Poisson non sarebbe un buon modello.

### Esercizio 7 — Quale modello? {: #esercizio-7 }

Per ciascuna situazione decidi se il modello naturale è Geometrico, di Poisson o nessuno dei due, e calcola il numero richiesto.

1. Quanti pacchetti si perdono in un minuto su un collegamento che ne perde in media 0,5 al minuto: probabilità di almeno una perdita.
2. Quante connessioni bisogna tentare finché una riesce, se ciascuna riesce con probabilità 0,9: probabilità che serva più di un tentativo.
3. Quanti refusi ci sono in una pagina di un libro che ne contiene in media 2 per pagina: probabilità di esattamente 2 refusi.
4. Quanti numeri pari ci sono tra i 5 estratti su una ruota del Lotto.

??? esempio-svolto "Soluzione ragionata"
    1. Poisson con $\lambda=0{,}5$: $P(X\ge1)=1-e^{-0{,}5}\approx0{,}393$.
    2. Geometrica con $p=0{,}9$: $P(X>1)=0{,}1$.
    3. Poisson con $\lambda=2$: $P(X=2)=2^2e^{-2}/2!=2e^{-2}\approx0{,}271$.
    4. Nessuno dei due: sono 5 estrazioni senza reinserimento da 90 numeri, di cui 45 pari. È un conteggio Ipergeometrico ([Settimana 4, Lettura C](../settimana_04/index.md#ipergeometrica)), con media $5\cdot45/90=2{,}5$. Non c'è un'attesa e non ci sono eventi rari.

## Errori da evitare {: #errori }

| Errore | Domanda da rifare |
|---|---|
| Scrivere $(1-p)^k p$ per $P(X=k)$ nella Geometrica | Quanti fallimenti ci sono prima del successo numero $k$? |
| Confondere $P(X=k)$ con $P(X>k)$ | Mi chiedono un istante preciso o una soglia? |
| Credere che dopo una lunga attesa il successo sia «dovuto» | Le prove future sanno qualcosa di quelle passate? |
| Leggere la media $1/p$ come un tempo garantito | Con quale probabilità l'attesa supera la media? |
| Usare la Poisson con il $\lambda$ di un altro intervallo | $\lambda$ è riferito al secondo, al minuto o all'anno? |
| Dimenticare che $0!=1$ e $\lambda^0=1$ | Che cosa dà la formula con $k=0$? |
| Usare la Poisson senza controllare l'indipendenza | Gli eventi arrivano uno alla volta o a raffiche? |
| Pensare che la Poisson valga solo «al limite» | Con $n$ grande e $p$ piccolo, quanto è grande la differenza? |
| Scambiare i due modelli | Sto contando prove fino a un successo, o eventi in un intervallo? |

## Riepilogo e takeaway per chi scrive software {: #riepilogo }

La **Geometrica** descrive il numero di prove indipendenti necessarie per il primo successo. La sua PMF è una fila di fallimenti chiusa da un successo, $(1-p)^{k-1}p$; la sua coda è $(1-p)^k$; la sua media è $1/p$. Non ha memoria: un passato di fallimenti non cambia il futuro. Per questo i numeri ritardatari del Lotto non sono «dovuti».

La **Poisson** descrive il numero di eventi rari in un intervallo, quando le occasioni sono moltissime e indipendenti. Nasce come limite della Binomiale con $np=\lambda$ fisso. Ha un solo parametro, il numero medio di eventi $\lambda$, che è anche la sua varianza. Con $\lambda=0{,}61$ ricostruisce la tabella dei calci di cavallo di Bortkiewicz.

Per l'informatico le due distribuzioni sono strumenti quotidiani. La Geometrica serve a progettare i **retry**: quanti tentativi in media, quanti per essere quasi sicuri. La Poisson serve a **dimensionare** server e code: quante richieste in un secondo, quanto è probabile un picco. In entrambi i casi la domanda decisiva riguarda l'**indipendenza**. Un guasto che dura nel tempo dà memoria ai tentativi; un traffico a raffiche rompe l'equilibrio tra media e varianza. Prima di usare una formula, controlla che il sistema rispetti le ipotesi da cui la formula è nata.

!!! tip "Che cosa devi saper rifare"
    Riconoscere quale dei due modelli descrive una situazione. Scrivere e spiegare la PMF Geometrica e la sua coda, calcolare la media $1/p$ e spiegare l'assenza di memoria con un esempio. Spiegare l'idea dei pezzetti e il caso di zero eventi, scrivere la PMF di Poisson, usare $\mathbb{E}[X]=\operatorname{Var}(X)=\lambda$ e riferire $\lambda$ all'intervallo giusto.

## Riferimenti e letture {: #riferimenti }

* **Ladislaus von Bortkiewicz**, *Das Gesetz der kleinen Zahlen*, Lipsia, Teubner, 1898. L'esempio dei calci di cavallo è il «4. Beispiel», § 12, pp. 23–25: tabella per corpo d'armata e per anno (1875–1894), confronto per tutti i 14 corpi e per i 10 corpi comparabili. [Scansione completa su Internet Archive](https://archive.org/details/dasgesetzderklei00bortrich). La citazione nel testo è tradotta dal tedesco.
* **Siméon-Denis Poisson**, *Recherches sur la probabilité des jugements en matière criminelle et en matière civile*, Parigi, Bachelier, 1837: l'opera in cui compare la distribuzione, ottenuta come approssimazione di un conto binomiale per eventi molto rari. [Scansione su Google Books](https://books.google.com/books?id=uovoFE3gt2EC); [estratti e traduzioni di Richard Pulskamp](https://gtfp.cs.rhul.ac.uk/pulskamp/Poisson/poisson.html).
* **Burton H. Bloom**, «Space/time trade-offs in hash coding with allowable errors», *Communications of the ACM*, 13(7), 1970, pp. 422–426: l'articolo originale del filtro di Bloom. [Pagina dell'articolo nella ACM Digital Library](https://dl.acm.org/doi/10.1145/362686.362692).
* **Il 53 di Venezia.** Il ritardo di 182 estrazioni è riportato dalla stampa dell'epoca, per esempio in [*l'Unità*, 12 giugno 2005, p. 10 (archivio storico)](https://archivio.unita.news/assets/main/2005/06/12/page_010.pdf), e ricordato in [*Quotidiano.net*](https://www.quotidiano.net/cronaca/lotto-53-ritardatario-37b1ba08). Del caso si occupò anche un'[interrogazione alla Camera dei deputati del gennaio 2004](https://documenti.camera.it/_dati/leg14/lavori/stenografici/sed577/pdfbt11.pdf), quando il ritardo era di 176 estrazioni.
* **Chris Piech**, *Probability for Computer Scientists*, Stanford, [portale del corso](https://chrispiech.github.io/probabilityForComputerScientists/): riferimento contemporaneo per le distribuzioni Geometrica e di Poisson e per le applicazioni informatiche.

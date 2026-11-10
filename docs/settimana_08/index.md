# Settimana 8 — La scuola di San Pietroburgo: le disuguaglianze di Markov e di Čebyšëv e la legge dei grandi numeri

<style>
@media screen {
  .md-typeset .md-typeset__scrollwrap { overflow-x: auto; max-width: 100%; }
  .md-typeset div.arithmatex { overflow-x: auto; max-width: 100%; }
  .md-typeset mjx-assistive-mml { max-width: 100%; }
}
.s08-box { border: 1px solid var(--md-default-fg-color--lighter, #bbb); border-radius: 8px; padding: 12px 16px; margin: 1em 0; }
.s08-box label { display: inline-block; margin: 4px 18px 4px 0; }
.s08-box input[type=range] { vertical-align: middle; width: 150px; }
.s08-box select { font: inherit; padding: 2px 4px; }
.s08-box button { font: inherit; padding: 3px 12px; border-radius: 6px; border: 1px solid var(--md-default-fg-color--lighter, #bbb); background: transparent; color: inherit; cursor: pointer; }
.s08-svg { width: 100%; max-width: 560px; display: block; margin: 8px auto; font-family: sans-serif; font-size: 13px; }
.s08-out { font-size: 0.95em; line-height: 1.55; }
.s08-out b.s08-lim { color: #e07a1f; }
.s08-out b.s08-vera { color: #4051b5; }
[data-md-color-scheme="slate"] .s08-out b.s08-vera { color: #8c9eff; }
</style>

*Che cosa si può garantire su una grandezza aleatoria quando se ne conoscono soltanto la media e la varianza? E perché la media di molte osservazioni si avvicina al valore atteso, e in quale senso preciso? Dalla domanda di un matematico-ingegnere di San Pietroburgo all’urna di Jacob Bernoulli.*

[:material-presentation: Apri Slide della Lezione](slides/index.html){ .md-button .md-button--primary target="_blank" }

!!! note "Seconda parte in arrivo"
    Per ora è pubblicata la prima parte della settimana, quella della Lezione 1: le disuguaglianze di Markov e di Čebyšëv (Atti I–IV), con gli esercizi 1–5. La seconda parte, con la varianza delle somme, la legge dei grandi numeri e la lettura facoltativa, sarà pubblicata con la Lezione 2.

## Il percorso e ciò che è richiesto all’esame {: #esame }

Finora, quando volevamo calcolare una probabilità, avevamo sempre a disposizione un modello completo. Sapevamo che una variabile era binomiale, di Poisson, esponenziale o normale, e con i suoi parametri potevamo calcolare la probabilità di qualunque evento. Nel lavoro di tutti i giorni succede spesso il contrario. Il cruscotto di monitoraggio di un servizio web ci dice che il tempo medio di risposta è di 120 millisecondi e che la deviazione standard è di 30 millisecondi, ma nessuno ci dice quale forma abbia la distribuzione dei tempi. Eppure il contratto con il cliente chiede una garanzia precisa: «al più l’1% delle richieste può superare il mezzo secondo». La domanda di questa settimana è proprio questa: **che cosa si può garantire sapendo soltanto la media, oppure la media e la varianza?**

Il lavoro è diviso in due parti, che corrispondono alle due lezioni. Nella prima parte ricaviamo due **disuguaglianze** che valgono per qualunque distribuzione. La **disuguaglianza di Markov** usa soltanto la media di una variabile che non può essere negativa, e limita la probabilità che la variabile sia molto grande. La **disuguaglianza di Čebyšëv** usa anche la varianza, e limita la probabilità che la variabile si allontani molto dalla sua media. Nella seconda parte studiamo che cosa succede quando si sommano molte variabili aleatorie indipendenti, o se ne fa la media. Impariamo a calcolare la **varianza di una somma**, scopriamo che la varianza della **media campionaria** si riduce come $1/n$ e, con la disuguaglianza di Čebyšëv, dimostriamo la **legge dei grandi numeri**: la media di molte osservazioni indipendenti si avvicina, con probabilità sempre più alta, al valore atteso. È la ragione matematica per cui le frequenze si stabilizzano, un’idea che ci accompagna dalla prima settimana del corso.

Due storie accompagnano le due lezioni. Nella prima siamo a San Pietroburgo, nella seconda metà dell’Ottocento, dove il matematico Pafnutij Čebyšëv, che costruiva anche macchine e meccanismi, e il suo allievo Andrej Markov cercavano risultati che valessero sempre, senza ipotesi difficili da controllare. Nella seconda torniamo indietro di un secolo e mezzo, a Basilea, dove Jacob Bernoulli lavorò per vent’anni alla prima dimostrazione che le frequenze osservate si avvicinano alle probabilità. Non devi ricordare date e nomi: le storie servono a capire perché le idee della settimana sono nate e quale problema risolvono.

All’esame devi saper enunciare la disuguaglianza di Markov con le sue ipotesi (la variabile non è mai negativa e la soglia è positiva) e saperla usare per limitare la probabilità di un valore grande. Della disuguaglianza di Čebyšëv devi conoscere le due forme, quella con la distanza $a$ e quella con il numero $k$ di deviazioni standard, e la forma complementare, che dà la probabilità minima di restare vicino alla media. Devi saperla applicare a un intervallo simmetrico attorno alla media, e anche a una sola coda, e saper spiegare perché i suoi limiti sono più larghi dei valori della regola 68–95–99,7 della distribuzione normale. Devi sapere che la varianza di una somma di variabili indipendenti è la somma delle varianze, saper mostrare con un esempio che per variabili dipendenti non è così, e saper calcolare media e varianza della somma e della media di $n$ variabili indipendenti e identicamente distribuite. Della legge dei grandi numeri devi conoscere l’enunciato, il significato della convergenza in probabilità e il ragionamento in due righe che la ricava dalla disuguaglianza di Čebyšëv. Devi saperla leggere nel caso delle frequenze, spiegare che cosa la legge non dice (non c’è nessuna compensazione) e usarla per stimare quante osservazioni servono per una certa precisione.

Le dimostrazioni delle due disuguaglianze sono nel testo, perché sono brevi e mostrano da dove vengono i risultati, ma all’esame non è richiesto riprodurle: è richiesto saperle usare. Sono invece **facoltativi e non richiesti all’esame** i riquadri intitolati «Approfondimento facoltativo», tra cui la formula della varianza di una somma di variabili dipendenti, che usa la covarianza della Settimana 7, e la lettura in fondo alla dispensa, che racconta come Markov inventò le catene che portano il suo nome per mostrare che la legge dei grandi numeri può valere anche senza indipendenza. Per codice, widget e fonti valgono le [indicazioni generali per lo studio](../index.md#esame).

## Da dove ripartiamo {: #prima-di-cominciare }

Ripercorriamo in breve ciò che ci serve delle settimane passate.

Il **valore atteso** $\mathbb{E}[X]=\sum_x x\,P(X=x)$ è il baricentro dei valori di una variabile, pesati con le loro probabilità, e lo indichiamo spesso con $\mu$ ([Settimana 4](../settimana_04/index.md#baricentro)). È **lineare**: $\mathbb{E}[aX+b]=a\,\mathbb{E}[X]+b$ e $\mathbb{E}[X+Y]=\mathbb{E}[X]+\mathbb{E}[Y]$, anche quando $X$ e $Y$ dipendono l’una dall’altra ([Settimana 4](../settimana_04/index.md#linearita-dipendenza)). Per un evento $A$, l’**indicatrice** $I_A$ vale 1 se $A$ si verifica e 0 altrimenti, e la sua media è la probabilità dell’evento: $\mathbb{E}[I_A]=P(A)$ ([Settimana 4](../settimana_04/index.md#indicatrici)). Questa piccola identità sarà la chiave della prima dimostrazione della settimana.

La **varianza** $\operatorname{Var}(X)=\mathbb{E}[(X-\mu)^2]$ è la media degli scarti al quadrato dalla media, e la **deviazione standard** $\sigma=\sqrt{\operatorname{Var}(X)}$ misura la stessa dispersione nelle unità della variabile ([Settimana 5](../settimana_05/index.md#varianza)). Se cambiamo scala e spostiamo la variabile, la varianza segue la regola $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$: lo spostamento $b$ non cambia le distanze dalla media, il fattore $a$ le moltiplica per $a$ e i loro quadrati per $a^2$.

Dalla Settimana 6 ci portiamo tre distribuzioni continue con la loro media e la loro deviazione standard. La [distribuzione uniforme](../settimana_06/index.md#uniforme) su un intervallo ha la media nel centro e una deviazione standard pari alla lunghezza dell’intervallo divisa per $\sqrt{12}$. La [distribuzione esponenziale](../settimana_06/index.md#media-esponenziale) di parametro $\lambda$ ha media e deviazione standard uguali, entrambe $1/\lambda$. Della [distribuzione normale](../settimana_06/index.md#standardizzazione) sappiamo calcolare ogni probabilità standardizzando, con la tabella della funzione $\Phi$, e ricordiamo la [regola 68–95–99,7](../settimana_06/index.md#regola-empirica): entro una, due e tre deviazioni standard dalla media cadono circa il 68%, il 95% e il 99,7% dei valori.

Dalla Settimana 7 ci serve la definizione di **variabili indipendenti**: $X$ e $Y$ sono indipendenti se $P(X=x,\;Y=y)=P(X=x)\,P(Y=y)$ per tutte le coppie di valori ([Settimana 7](../settimana_07/index.md#indipendenza)). Per variabili indipendenti la media del prodotto è il prodotto delle medie, $\mathbb{E}[XY]=\mathbb{E}[X]\,\mathbb{E}[Y]$ ([Settimana 7](../settimana_07/index.md#prodotto)).

<!--
Infine due idee che finora abbiamo usato senza dimostrarle. Nella [Settimana 1](../settimana_01/index.md#lab-moneta) abbiamo visto in una simulazione che la frequenza delle teste di una moneta si stabilizza vicino a 1/2, ed è l’intuizione su cui si regge l’interpretazione frequentista della probabilità. Nella [Settimana 5](../settimana_05/index.md#fallacia-giocatore) abbiamo visto che questa stabilizzazione non avviene perché il caso «recupera» i ritardi: i ritardi vengono diluiti, non compensati: la moneta non ricorda gli esiti passati, perché i lanci sono indipendenti, e proprio questo rende possibile la diluizione. Lì avevamo anche incontrato **legge dei grandi numeri**, il nome che Poisson diede al risultato che descrive la stabilizzazione delle frequenze, con la promessa di studiarlo ora. In questa settimana mantieniamo la promessa.
-->

## Atto I — San Pietroburgo e la domanda dell’ingegnere {: #pietroburgo }

**Pafnutij L’vovič Čebyšëv** (1821–1894) insegnò all’Università di San Pietroburgo per gran parte della sua vita, dal 1850. Era un matematico molto particolare. Accanto ai lavori di teoria dei numeri e di analisi, che lo resero famoso in tutta Europa, insegnò per alcuni anni meccanica pratica e progettò decine di meccanismi: sistemi di aste e snodi che trasformano un moto circolare in un moto quasi rettilineo e, con questi, perfino una macchina che cammina, presentata all’Esposizione universale di Parigi del 1878. Da quei meccanismi nacquero alcune delle sue idee matematiche più note, come i polinomi che portano il suo nome, che servono ad approssimare una funzione nel modo migliore possibile. Era, in un certo senso, un matematico con la testa da ingegnere: gli interessava che cosa si può **garantire**, non soltanto che cosa succede di solito.

Attorno a lui si formò quella che oggi si chiama la **scuola di San Pietroburgo**. I suoi allievi più famosi furono **Andrej Andreevič Markov** (1856–1922) e Aleksandr Ljapunov, e il loro stile aveva un tratto comune: teoremi con ipotesi chiare e dimostrazioni complete. Nel calcolo delle probabilità questo era tutt’altro che scontato. Dai tempi di Jacob Bernoulli si sapeva che le frequenze tendono a stabilizzarsi, e Poisson, nel 1837, aveva chiamato questo fenomeno «legge dei grandi numeri»; ma le dimostrazioni esistenti erano lunghe, valevano per casi particolari e lasciavano molti punti in ombra.

<!--
Il passo decisivo fu una disuguaglianza molto semplice. La scoprì per primo, nel 1853, il francese Irénée-Jules Bienaymé; Čebyšëv la ritrovò in modo indipendente e la pubblicò nel 1867, in un articolo intitolato *Des valeurs moyennes*, «Sui valori medi», dove la usò per dimostrare in poche righe una legge dei grandi numeri molto generale. Anni dopo Čebyšëv riconobbe la priorità di Bienaymé, ma la disuguaglianza è rimasta legata al suo nome. Markov, a sua volta, ne diede nella sua tesi del 1884 una dimostrazione nuova, che passa per una disuguaglianza ancora più semplice: quella che oggi porta il nome di Markov e che studieremo per prima.
-->

La domanda da cui partiamo è quella dell’ingegnere. Di una grandezza aleatoria conosciamo soltanto la media, oppure la media e la deviazione standard. Non sappiamo se la sua distribuzione sia normale, esponenziale o di qualche forma che nessuno ha ancora immaginato. Che cosa possiamo **garantire** sulla probabilità che assuma valori lontani dalla media? È la situazione del cruscotto di monitoraggio da cui siamo partiti: abbiamo due numeri, 120 e 30 millisecondi, e un contratto che chiede una garanzia sulle richieste lente.

La risposta di Čebyšëv e di Markov è sorprendente per due motivi. È semplice, tanto che la dimostrazione sta in poche righe. E vale per **qualunque** distribuzione: non serve sapere nulla sulla forma della variabile, oltre alla media e alla varianza. Il prezzo da pagare, come vedremo, è che la garanzia è prudente: per una distribuzione particolare la probabilità vera è spesso molto più piccola del limite. Ma è una garanzia, e nei sistemi informatici una garanzia vale spesso più di una stima precisa che dipende da un’ipotesi non verificata.

Prima di cercarla, però, ripartiamo dal caso che conosciamo: che cosa succede quando la distribuzione è nota.

## Atto II — Quando la distribuzione è nota {: #distribuzione-nota }

Cominciamo da un esercizio dall’aria strana. Una variabile normale $X\sim\mathcal{N}(\mu,\sigma^2)$ ha media e deviazione standard che non ci vengono date: sono lettere. Vogliamo la probabilità che $X$ cada tra $\mu-\sigma$ e $\mu+\sigma$, e la risposta deve essere un numero. Come si può dare un numero, se non conosciamo né $\mu$ né $\sigma$?

Il trucco è la standardizzazione della [Settimana 6](../settimana_06/index.md#standardizzazione). Poniamo $Z=(X-\mu)/\sigma$, che è una variabile normale standard. Sottraiamo $\mu$ e dividiamo per $\sigma$ in tutti e tre i membri della disuguaglianza, cosa lecita perché $\sigma>0$:

$$
P(\mu-\sigma\le X\le\mu+\sigma)=P\!\left(\frac{(\mu-\sigma)-\mu}{\sigma}\le\frac{X-\mu}{\sigma}\le\frac{(\mu+\sigma)-\mu}{\sigma}\right)=P(-1\le Z\le1).
$$

Le lettere $\mu$ e $\sigma$ spariscono, e resta un conto sulla normale standard, di cui conosciamo la funzione di ripartizione $\Phi$: la probabilità di un intervallo è la funzione di ripartizione calcolata nell’estremo destro meno quella calcolata nell’estremo sinistro.

$$
\begin{aligned}
P(-1\le Z\le1)&=\Phi(1)-\Phi(-1)\\
&=\Phi(1)-\big(1-\Phi(1)\big)\\
&=2\,\Phi(1)-1=2\cdot0{,}8413-1=0{,}6826.
\end{aligned}
$$

Nel secondo passaggio abbiamo usato la simmetria della campana, $\Phi(-z)=1-\Phi(z)$; nel terzo abbiamo letto $\Phi(1)=0{,}8413$ nella tabella. È il primo numero della regola 68–95–99,7: qualunque siano $\mu$ e $\sigma$, una variabile normale cade entro una deviazione standard dalla media con probabilità di circa il 68%.

<!-- Versione precedente, con \Phi_{\mu,\sigma} (pedice non introdotto):
Il trucco è la standardizzazione della [Settimana 6](../settimana_06/index.md#standardizzazione). La probabilità richiesta è

$$
P(\mu-\sigma\le X\le\mu+\sigma)=\Phi_{\mu,\sigma}(\mu+\sigma)-\Phi_{\mu,\sigma}(\mu-\sigma),
$$

dove $\Phi_{\mu,\sigma}$ indica la funzione di ripartizione della normale con media $\mu$ e deviazione standard $\sigma$: la probabilità di un intervallo è la funzione di ripartizione calcolata nell’estremo destro meno quella calcolata nell’estremo sinistro. Ora standardizziamo ciascun estremo, cioè sottraiamo la media e dividiamo per la deviazione standard. L’estremo destro diventa $\big((\mu+\sigma)-\mu\big)/\sigma=1$ e l’estremo sinistro diventa $\big((\mu-\sigma)-\mu\big)/\sigma=-1$. Le lettere $\mu$ e $\sigma$ spariscono, e resta un conto sulla normale standard:

$$
\begin{aligned}
P(\mu-\sigma\le X\le\mu+\sigma)&=\Phi(1)-\Phi(-1)\\
&=\Phi(1)-\big(1-\Phi(1)\big)\\
&=2\,\Phi(1)-1=2\cdot0{,}8413-1=0{,}6826.
\end{aligned}
$$

Nel secondo passaggio abbiamo usato la simmetria della campana, $\Phi(-z)=1-\Phi(z)$; nel terzo abbiamo letto $\Phi(1)=0{,}8413$ nella tabella. È il primo numero della regola 68–95–99,7: qualunque siano $\mu$ e $\sigma$, una variabile normale cade entro una deviazione standard dalla media con probabilità di circa il 68%.
-->

Facciamo la stessa domanda per una variabile uniforme. Per non confondere le lettere con quelle che useremo tra poco, chiamiamo $\alpha$ e $\beta$ gli estremi dell’intervallo e scriviamo $X\sim\operatorname{Uni}(\alpha,\beta)$. Sappiamo dalla Settimana 6 che

$$
\mu=\frac{\alpha+\beta}{2},\qquad\sigma=\frac{\beta-\alpha}{\sqrt{12}}.
$$

Poiché $\sqrt{12}\approx3{,}46$, la deviazione standard è circa il 29% della lunghezza dell’intervallo, meno della metà: l’intervallo $[\mu-\sigma,\;\mu+\sigma]$ sta tutto dentro $[\alpha,\beta]$. Per una distribuzione uniforme la probabilità di un intervallo interno è la sua lunghezza divisa per la lunghezza totale, e l’intervallo $[\mu-\sigma,\;\mu+\sigma]$ è lungo $2\sigma$. Quindi

$$
P(\mu-\sigma\le X\le\mu+\sigma)=\frac{2\sigma}{\beta-\alpha}=\frac{2}{\beta-\alpha}\cdot\frac{\beta-\alpha}{\sqrt{12}}=\frac{2}{\sqrt{12}}\approx0{,}577.
$$

Anche qui le lettere spariscono: per qualunque variabile uniforme, la probabilità di cadere entro una deviazione standard dalla media è circa il 58%.

Proviamo infine con una variabile esponenziale di parametro $\lambda$, che conosciamo bene. Media e deviazione standard valgono entrambe $1/\lambda$, quindi l’intervallo va da $\mu-\sigma=0$ a $\mu+\sigma=2/\lambda$. Con la funzione di ripartizione della Settimana 6, $P(X\le t)=1-e^{-\lambda t}$,

$$
P(0\le X\le 2/\lambda)=1-e^{-\lambda\cdot2/\lambda}=1-e^{-2}\approx0{,}865.
$$

<figure markdown="0">
<svg viewBox="0 0 580 250" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Tre densità con la stessa domanda: quanta probabilità cade entro una deviazione standard dalla media. Normale: 68,3 per cento. Uniforme: 57,7 per cento. Esponenziale: 86,5 per cento.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">La stessa domanda, tre risposte: P(μ − σ ≤ X ≤ μ + σ)</text>
<polygon points="71.7,200.0 71.7,113.6 71.7,113.6 72.2,111.9 72.8,110.1 73.4,108.4 73.9,106.7 74.5,105.0 75.1,103.3 75.6,101.6 76.2,99.9 76.8,98.2 77.3,96.5 77.9,94.9 78.5,93.3 79.0,91.6 79.6,90.1 80.2,88.5 80.7,86.9 81.3,85.4 81.9,83.9 82.4,82.4 83.0,81.0 83.6,79.6 84.1,78.2 84.7,76.9 85.3,75.5 85.8,74.3 86.4,73.0 87.0,71.8 87.5,70.7 88.1,69.5 88.7,68.5 89.2,67.4 89.8,66.5 90.4,65.5 90.9,64.6 91.5,63.8 92.1,63.0 92.6,62.3 93.2,61.6 93.8,60.9 94.3,60.3 94.9,59.8 95.5,59.3 96.0,58.9 96.6,58.5 97.2,58.2 97.7,58.0 98.3,57.8 98.9,57.6 99.4,57.5 100.0,57.5 100.6,57.5 101.1,57.6 101.7,57.8 102.3,58.0 102.8,58.2 103.4,58.5 104.0,58.9 104.5,59.3 105.1,59.8 105.7,60.3 106.2,60.9 106.8,61.6 107.4,62.3 107.9,63.0 108.5,63.8 109.1,64.6 109.6,65.5 110.2,66.5 110.8,67.4 111.3,68.5 111.9,69.5 112.5,70.7 113.0,71.8 113.6,73.0 114.2,74.3 114.7,75.5 115.3,76.9 115.9,78.2 116.4,79.6 117.0,81.0 117.6,82.4 118.1,83.9 118.7,85.4 119.3,86.9 119.8,88.5 120.4,90.1 121.0,91.6 121.5,93.3 122.1,94.9 122.7,96.5 123.2,98.2 123.8,99.9 124.4,101.6 124.9,103.3 125.5,105.0 126.1,106.7 126.6,108.4 127.2,110.1 127.8,111.9 128.3,113.6 128.3,113.6 128.3,200.0" fill="#2e9e5b" fill-opacity="0.35" stroke="none"/>
<polyline points="15.0,198.4 15.6,198.3 16.1,198.2 16.7,198.1 17.3,198.0 17.8,197.9 18.4,197.7 19.0,197.6 19.5,197.5 20.1,197.3 20.7,197.2 21.2,197.0 21.8,196.8 22.4,196.7 22.9,196.5 23.5,196.3 24.1,196.1 24.6,195.9 25.2,195.6 25.8,195.4 26.3,195.1 26.9,194.9 27.5,194.6 28.0,194.3 28.6,194.0 29.2,193.7 29.7,193.4 30.3,193.1 30.9,192.7 31.4,192.4 32.0,192.0 32.6,191.6 33.1,191.2 33.7,190.8 34.3,190.3 34.8,189.9 35.4,189.4 36.0,188.9 36.5,188.4 37.1,187.9 37.7,187.3 38.2,186.8 38.8,186.2 39.4,185.6 39.9,184.9 40.5,184.3 41.1,183.6 41.6,182.9 42.2,182.2 42.8,181.5 43.3,180.7 43.9,179.9 44.5,179.1 45.0,178.3 45.6,177.4 46.2,176.6 46.7,175.7 47.3,174.7 47.9,173.8 48.4,172.8 49.0,171.8 49.6,170.8 50.1,169.7 50.7,168.6 51.3,167.5 51.8,166.4 52.4,165.3 53.0,164.1 53.5,162.9 54.1,161.6 54.7,160.4 55.2,159.1 55.8,157.8 56.4,156.5 56.9,155.1 57.5,153.7 58.1,152.3 58.6,150.9 59.2,149.5 59.8,148.0 60.3,146.5 60.9,145.0 61.5,143.5 62.0,141.9 62.6,140.4 63.2,138.8 63.7,137.2 64.3,135.6 64.9,134.0 65.4,132.3 66.0,130.6 66.6,129.0 67.1,127.3 67.7,125.6 68.3,123.9 68.8,122.2 69.4,120.5 70.0,118.8 70.5,117.0 71.1,115.3 71.7,113.6 72.2,111.9 72.8,110.1 73.4,108.4 73.9,106.7 74.5,105.0 75.1,103.3 75.6,101.6 76.2,99.9 76.8,98.2 77.3,96.5 77.9,94.9 78.5,93.3 79.0,91.6 79.6,90.1 80.2,88.5 80.7,86.9 81.3,85.4 81.9,83.9 82.4,82.4 83.0,81.0 83.6,79.6 84.1,78.2 84.7,76.9 85.3,75.5 85.8,74.3 86.4,73.0 87.0,71.8 87.5,70.7 88.1,69.5 88.7,68.5 89.2,67.4 89.8,66.5 90.4,65.5 90.9,64.6 91.5,63.8 92.1,63.0 92.6,62.3 93.2,61.6 93.8,60.9 94.3,60.3 94.9,59.8 95.5,59.3 96.0,58.9 96.6,58.5 97.2,58.2 97.7,58.0 98.3,57.8 98.9,57.6 99.4,57.5 100.0,57.5 100.6,57.5 101.1,57.6 101.7,57.8 102.3,58.0 102.8,58.2 103.4,58.5 104.0,58.9 104.5,59.3 105.1,59.8 105.7,60.3 106.2,60.9 106.8,61.6 107.4,62.3 107.9,63.0 108.5,63.8 109.1,64.6 109.6,65.5 110.2,66.5 110.8,67.4 111.3,68.5 111.9,69.5 112.5,70.7 113.0,71.8 113.6,73.0 114.2,74.3 114.7,75.5 115.3,76.9 115.9,78.2 116.4,79.6 117.0,81.0 117.6,82.4 118.1,83.9 118.7,85.4 119.3,86.9 119.8,88.5 120.4,90.1 121.0,91.6 121.5,93.3 122.1,94.9 122.7,96.5 123.2,98.2 123.8,99.9 124.4,101.6 124.9,103.3 125.5,105.0 126.1,106.7 126.6,108.4 127.2,110.1 127.8,111.9 128.3,113.6 128.9,115.3 129.5,117.0 130.0,118.8 130.6,120.5 131.2,122.2 131.7,123.9 132.3,125.6 132.9,127.3 133.4,129.0 134.0,130.6 134.6,132.3 135.1,134.0 135.7,135.6 136.3,137.2 136.8,138.8 137.4,140.4 138.0,141.9 138.5,143.5 139.1,145.0 139.7,146.5 140.2,148.0 140.8,149.5 141.4,150.9 141.9,152.3 142.5,153.7 143.1,155.1 143.6,156.5 144.2,157.8 144.8,159.1 145.3,160.4 145.9,161.6 146.5,162.9 147.0,164.1 147.6,165.3 148.2,166.4 148.7,167.5 149.3,168.6 149.9,169.7 150.4,170.8 151.0,171.8 151.6,172.8 152.1,173.8 152.7,174.7 153.3,175.7 153.8,176.6 154.4,177.4 155.0,178.3 155.5,179.1 156.1,179.9 156.7,180.7 157.2,181.5 157.8,182.2 158.4,182.9 158.9,183.6 159.5,184.3 160.1,184.9 160.6,185.6 161.2,186.2 161.8,186.8 162.3,187.3 162.9,187.9 163.5,188.4 164.0,188.9 164.6,189.4 165.2,189.9 165.7,190.3 166.3,190.8 166.9,191.2 167.4,191.6 168.0,192.0 168.6,192.4 169.1,192.7 169.7,193.1 170.3,193.4 170.8,193.7 171.4,194.0 172.0,194.3 172.5,194.6 173.1,194.9 173.7,195.1 174.2,195.4 174.8,195.6 175.4,195.9 175.9,196.1 176.5,196.3 177.1,196.5 177.6,196.7 178.2,196.8 178.8,197.0 179.3,197.2 179.9,197.3 180.5,197.5 181.0,197.6 181.6,197.7 182.2,197.9 182.7,198.0 183.3,198.1 183.9,198.2 184.4,198.3 185.0,198.4" fill="none" stroke="#4051b5" stroke-width="2.2"/>
<line x1="15.0" y1="200.0" x2="185.0" y2="200.0" stroke="currentColor" stroke-width="1"/>
<line x1="71.7" y1="200.0" x2="71.7" y2="205.0" stroke="currentColor" stroke-width="1"/>
<text x="71.7" y="218.0" text-anchor="middle" fill="currentColor">μ−σ</text>
<line x1="100.0" y1="200.0" x2="100.0" y2="205.0" stroke="currentColor" stroke-width="1"/>
<text x="100.0" y="218.0" text-anchor="middle" fill="currentColor">μ</text>
<line x1="128.3" y1="200.0" x2="128.3" y2="205.0" stroke="currentColor" stroke-width="1"/>
<text x="128.3" y="218.0" text-anchor="middle" fill="currentColor">μ+σ</text>
<line x1="100.0" y1="45.0" x2="100.0" y2="200.0" stroke="currentColor" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
<text x="100.0" y="36.0" text-anchor="middle" fill="currentColor" font-weight="bold">normale</text>
<text x="100.0" y="240.0" text-anchor="middle" fill="#2e9e5b" font-weight="bold" font-size="15">68,3 %</text>
<polygon points="261.7,200.0 261.7,96.9 261.7,96.9 262.2,96.9 262.8,96.9 263.4,96.9 263.9,96.9 264.5,96.9 265.1,96.9 265.6,96.9 266.2,96.9 266.8,96.9 267.3,96.9 267.9,96.9 268.5,96.9 269.0,96.9 269.6,96.9 270.2,96.9 270.7,96.9 271.3,96.9 271.9,96.9 272.4,96.9 273.0,96.9 273.6,96.9 274.1,96.9 274.7,96.9 275.3,96.9 275.8,96.9 276.4,96.9 277.0,96.9 277.5,96.9 278.1,96.9 278.7,96.9 279.2,96.9 279.8,96.9 280.4,96.9 280.9,96.9 281.5,96.9 282.1,96.9 282.6,96.9 283.2,96.9 283.8,96.9 284.3,96.9 284.9,96.9 285.5,96.9 286.0,96.9 286.6,96.9 287.2,96.9 287.7,96.9 288.3,96.9 288.9,96.9 289.4,96.9 290.0,96.9 290.6,96.9 291.1,96.9 291.7,96.9 292.3,96.9 292.8,96.9 293.4,96.9 294.0,96.9 294.5,96.9 295.1,96.9 295.7,96.9 296.2,96.9 296.8,96.9 297.4,96.9 297.9,96.9 298.5,96.9 299.1,96.9 299.6,96.9 300.2,96.9 300.8,96.9 301.3,96.9 301.9,96.9 302.5,96.9 303.0,96.9 303.6,96.9 304.2,96.9 304.7,96.9 305.3,96.9 305.9,96.9 306.4,96.9 307.0,96.9 307.6,96.9 308.1,96.9 308.7,96.9 309.3,96.9 309.8,96.9 310.4,96.9 311.0,96.9 311.5,96.9 312.1,96.9 312.7,96.9 313.2,96.9 313.8,96.9 314.4,96.9 314.9,96.9 315.5,96.9 316.1,96.9 316.6,96.9 317.2,96.9 317.8,96.9 318.3,96.9 318.3,96.9 318.3,200.0" fill="#2e9e5b" fill-opacity="0.35" stroke="none"/>
<polyline points="205.0,200.0 205.6,200.0 206.1,200.0 206.7,200.0 207.3,200.0 207.8,200.0 208.4,200.0 209.0,200.0 209.5,200.0 210.1,200.0 210.7,200.0 211.2,200.0 211.8,200.0 212.4,200.0 212.9,200.0 213.5,200.0 214.1,200.0 214.6,200.0 215.2,200.0 215.8,200.0 216.3,200.0 216.9,200.0 217.5,200.0 218.0,200.0 218.6,200.0 219.2,200.0 219.7,200.0 220.3,200.0 220.9,200.0 221.4,200.0 222.0,200.0 222.6,200.0 223.1,200.0 223.7,200.0 224.3,200.0 224.8,200.0 225.4,200.0 226.0,200.0 226.5,200.0 227.1,200.0 227.7,200.0 228.2,200.0 228.8,200.0 229.4,200.0 229.9,200.0 230.5,200.0 231.1,200.0 231.6,200.0 232.2,200.0 232.8,200.0 233.3,200.0 233.9,200.0 234.5,200.0 235.0,200.0 235.6,200.0 236.2,200.0 236.7,200.0 237.3,200.0 237.9,200.0 238.4,200.0 239.0,200.0 239.6,200.0 240.1,200.0 240.7,200.0 240.9,200.0 240.9,96.9 241.3,96.9 241.8,96.9 242.4,96.9 243.0,96.9 243.5,96.9 244.1,96.9 244.7,96.9 245.2,96.9 245.8,96.9 246.4,96.9 246.9,96.9 247.5,96.9 248.1,96.9 248.6,96.9 249.2,96.9 249.8,96.9 250.3,96.9 250.9,96.9 251.5,96.9 252.0,96.9 252.6,96.9 253.2,96.9 253.7,96.9 254.3,96.9 254.9,96.9 255.4,96.9 256.0,96.9 256.6,96.9 257.1,96.9 257.7,96.9 258.3,96.9 258.8,96.9 259.4,96.9 260.0,96.9 260.5,96.9 261.1,96.9 261.7,96.9 262.2,96.9 262.8,96.9 263.4,96.9 263.9,96.9 264.5,96.9 265.1,96.9 265.6,96.9 266.2,96.9 266.8,96.9 267.3,96.9 267.9,96.9 268.5,96.9 269.0,96.9 269.6,96.9 270.2,96.9 270.7,96.9 271.3,96.9 271.9,96.9 272.4,96.9 273.0,96.9 273.6,96.9 274.1,96.9 274.7,96.9 275.3,96.9 275.8,96.9 276.4,96.9 277.0,96.9 277.5,96.9 278.1,96.9 278.7,96.9 279.2,96.9 279.8,96.9 280.4,96.9 280.9,96.9 281.5,96.9 282.1,96.9 282.6,96.9 283.2,96.9 283.8,96.9 284.3,96.9 284.9,96.9 285.5,96.9 286.0,96.9 286.6,96.9 287.2,96.9 287.7,96.9 288.3,96.9 288.9,96.9 289.4,96.9 290.0,96.9 290.6,96.9 291.1,96.9 291.7,96.9 292.3,96.9 292.8,96.9 293.4,96.9 294.0,96.9 294.5,96.9 295.1,96.9 295.7,96.9 296.2,96.9 296.8,96.9 297.4,96.9 297.9,96.9 298.5,96.9 299.1,96.9 299.6,96.9 300.2,96.9 300.8,96.9 301.3,96.9 301.9,96.9 302.5,96.9 303.0,96.9 303.6,96.9 304.2,96.9 304.7,96.9 305.3,96.9 305.9,96.9 306.4,96.9 307.0,96.9 307.6,96.9 308.1,96.9 308.7,96.9 309.3,96.9 309.8,96.9 310.4,96.9 311.0,96.9 311.5,96.9 312.1,96.9 312.7,96.9 313.2,96.9 313.8,96.9 314.4,96.9 314.9,96.9 315.5,96.9 316.1,96.9 316.6,96.9 317.2,96.9 317.8,96.9 318.3,96.9 318.9,96.9 319.5,96.9 320.0,96.9 320.6,96.9 321.2,96.9 321.7,96.9 322.3,96.9 322.9,96.9 323.4,96.9 324.0,96.9 324.6,96.9 325.1,96.9 325.7,96.9 326.3,96.9 326.8,96.9 327.4,96.9 328.0,96.9 328.5,96.9 329.1,96.9 329.7,96.9 330.2,96.9 330.8,96.9 331.4,96.9 331.9,96.9 332.5,96.9 333.1,96.9 333.6,96.9 334.2,96.9 334.8,96.9 335.3,96.9 335.9,96.9 336.5,96.9 337.0,96.9 337.6,96.9 338.2,96.9 338.7,96.9 339.1,96.9 339.1,200.0 339.3,200.0 339.9,200.0 340.4,200.0 341.0,200.0 341.6,200.0 342.1,200.0 342.7,200.0 343.3,200.0 343.8,200.0 344.4,200.0 345.0,200.0 345.5,200.0 346.1,200.0 346.7,200.0 347.2,200.0 347.8,200.0 348.4,200.0 348.9,200.0 349.5,200.0 350.1,200.0 350.6,200.0 351.2,200.0 351.8,200.0 352.3,200.0 352.9,200.0 353.5,200.0 354.0,200.0 354.6,200.0 355.2,200.0 355.7,200.0 356.3,200.0 356.9,200.0 357.4,200.0 358.0,200.0 358.6,200.0 359.1,200.0 359.7,200.0 360.3,200.0 360.8,200.0 361.4,200.0 362.0,200.0 362.5,200.0 363.1,200.0 363.7,200.0 364.2,200.0 364.8,200.0 365.4,200.0 365.9,200.0 366.5,200.0 367.1,200.0 367.6,200.0 368.2,200.0 368.8,200.0 369.3,200.0 369.9,200.0 370.5,200.0 371.0,200.0 371.6,200.0 372.2,200.0 372.7,200.0 373.3,200.0 373.9,200.0 374.4,200.0 375.0,200.0" fill="none" stroke="#4051b5" stroke-width="2.2"/>
<line x1="205.0" y1="200.0" x2="375.0" y2="200.0" stroke="currentColor" stroke-width="1"/>
<line x1="261.7" y1="200.0" x2="261.7" y2="205.0" stroke="currentColor" stroke-width="1"/>
<text x="261.7" y="218.0" text-anchor="middle" fill="currentColor">μ−σ</text>
<line x1="290.0" y1="200.0" x2="290.0" y2="205.0" stroke="currentColor" stroke-width="1"/>
<text x="290.0" y="218.0" text-anchor="middle" fill="currentColor">μ</text>
<line x1="318.3" y1="200.0" x2="318.3" y2="205.0" stroke="currentColor" stroke-width="1"/>
<text x="318.3" y="218.0" text-anchor="middle" fill="currentColor">μ+σ</text>
<line x1="290.0" y1="45.0" x2="290.0" y2="200.0" stroke="currentColor" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
<text x="290.0" y="36.0" text-anchor="middle" fill="currentColor" font-weight="bold">uniforme</text>
<text x="290.0" y="240.0" text-anchor="middle" fill="#2e9e5b" font-weight="bold" font-size="15">57,7 %</text>
<polygon points="407.6,200.0 407.6,57.1 407.6,57.1 408.0,59.1 408.6,61.6 409.2,64.1 409.7,66.5 410.3,68.9 410.9,71.3 411.4,73.6 412.0,75.8 412.6,78.0 413.1,80.2 413.7,82.3 414.3,84.4 414.8,86.5 415.4,88.5 416.0,90.5 416.5,92.5 417.1,94.4 417.7,96.3 418.2,98.1 418.8,99.9 419.4,101.7 419.9,103.5 420.5,105.2 421.1,106.9 421.6,108.5 422.2,110.2 422.8,111.8 423.3,113.4 423.9,114.9 424.5,116.4 425.0,117.9 425.6,119.4 426.2,120.8 426.7,122.2 427.3,123.6 427.9,125.0 428.4,126.3 429.0,127.6 429.6,128.9 430.1,130.2 430.7,131.4 431.3,132.7 431.8,133.9 432.4,135.0 433.0,136.2 433.5,137.3 434.1,138.5 434.7,139.5 435.2,140.6 435.8,141.7 436.4,142.7 436.9,143.7 437.5,144.8 438.1,145.7 438.6,146.7 439.2,147.7 439.8,148.6 440.3,149.5 440.9,150.4 441.5,151.3 442.0,152.2 442.6,153.0 443.2,153.9 443.7,154.7 444.3,155.5 444.9,156.3 445.4,157.1 446.0,157.8 446.6,158.6 447.1,159.3 447.7,160.0 448.3,160.8 448.8,161.5 449.4,162.1 450.0,162.8 450.5,163.5 451.1,164.1 451.7,164.8 452.2,165.4 452.8,166.0 453.4,166.6 453.9,167.2 454.5,167.8 455.1,168.4 455.6,168.9 456.2,169.5 456.8,170.0 457.3,170.6 457.9,171.1 458.5,171.6 459.0,172.1 459.6,172.6 460.2,173.1 460.7,173.6 461.3,174.1 461.9,174.5 462.4,175.0 463.0,175.4 463.6,175.9 464.1,176.3 464.7,176.7 465.3,177.1 465.8,177.5 466.4,177.9 467.0,178.3 467.5,178.7 468.1,179.1 468.7,179.5 469.2,179.8 469.8,180.2 470.4,180.6 470.6,180.7 470.6,200.0" fill="#2e9e5b" fill-opacity="0.35" stroke="none"/>
<polyline points="395.0,200.0 395.6,200.0 396.1,200.0 396.7,200.0 397.3,200.0 397.8,200.0 398.4,200.0 399.0,200.0 399.5,200.0 400.1,200.0 400.7,200.0 401.2,200.0 401.8,200.0 402.4,200.0 402.9,200.0 403.5,200.0 404.1,200.0 404.6,200.0 405.2,200.0 405.8,200.0 406.3,200.0 406.9,200.0 407.5,200.0 407.6,200.0 407.6,57.1 408.0,59.1 408.6,61.6 409.2,64.1 409.7,66.5 410.3,68.9 410.9,71.3 411.4,73.6 412.0,75.8 412.6,78.0 413.1,80.2 413.7,82.3 414.3,84.4 414.8,86.5 415.4,88.5 416.0,90.5 416.5,92.5 417.1,94.4 417.7,96.3 418.2,98.1 418.8,99.9 419.4,101.7 419.9,103.5 420.5,105.2 421.1,106.9 421.6,108.5 422.2,110.2 422.8,111.8 423.3,113.4 423.9,114.9 424.5,116.4 425.0,117.9 425.6,119.4 426.2,120.8 426.7,122.2 427.3,123.6 427.9,125.0 428.4,126.3 429.0,127.6 429.6,128.9 430.1,130.2 430.7,131.4 431.3,132.7 431.8,133.9 432.4,135.0 433.0,136.2 433.5,137.3 434.1,138.5 434.7,139.5 435.2,140.6 435.8,141.7 436.4,142.7 436.9,143.7 437.5,144.8 438.1,145.7 438.6,146.7 439.2,147.7 439.8,148.6 440.3,149.5 440.9,150.4 441.5,151.3 442.0,152.2 442.6,153.0 443.2,153.9 443.7,154.7 444.3,155.5 444.9,156.3 445.4,157.1 446.0,157.8 446.6,158.6 447.1,159.3 447.7,160.0 448.3,160.8 448.8,161.5 449.4,162.1 450.0,162.8 450.5,163.5 451.1,164.1 451.7,164.8 452.2,165.4 452.8,166.0 453.4,166.6 453.9,167.2 454.5,167.8 455.1,168.4 455.6,168.9 456.2,169.5 456.8,170.0 457.3,170.6 457.9,171.1 458.5,171.6 459.0,172.1 459.6,172.6 460.2,173.1 460.7,173.6 461.3,174.1 461.9,174.5 462.4,175.0 463.0,175.4 463.6,175.9 464.1,176.3 464.7,176.7 465.3,177.1 465.8,177.5 466.4,177.9 467.0,178.3 467.5,178.7 468.1,179.1 468.7,179.5 469.2,179.8 469.8,180.2 470.4,180.6 470.9,180.9 471.5,181.2 472.1,181.6 472.6,181.9 473.2,182.2 473.8,182.5 474.3,182.9 474.9,183.2 475.5,183.5 476.0,183.8 476.6,184.0 477.2,184.3 477.7,184.6 478.3,184.9 478.9,185.2 479.4,185.4 480.0,185.7 480.6,185.9 481.1,186.2 481.7,186.4 482.3,186.7 482.8,186.9 483.4,187.1 484.0,187.4 484.5,187.6 485.1,187.8 485.7,188.0 486.2,188.3 486.8,188.5 487.4,188.7 487.9,188.9 488.5,189.1 489.1,189.3 489.6,189.5 490.2,189.6 490.8,189.8 491.3,190.0 491.9,190.2 492.5,190.4 493.0,190.5 493.6,190.7 494.2,190.9 494.7,191.0 495.3,191.2 495.9,191.3 496.4,191.5 497.0,191.7 497.6,191.8 498.1,191.9 498.7,192.1 499.3,192.2 499.8,192.4 500.4,192.5 501.0,192.6 501.5,192.8 502.1,192.9 502.7,193.0 503.2,193.2 503.8,193.3 504.4,193.4 504.9,193.5 505.5,193.6 506.1,193.7 506.6,193.9 507.2,194.0 507.8,194.1 508.3,194.2 508.9,194.3 509.5,194.4 510.0,194.5 510.6,194.6 511.2,194.7 511.7,194.8 512.3,194.9 512.9,195.0 513.4,195.0 514.0,195.1 514.6,195.2 515.1,195.3 515.7,195.4 516.3,195.5 516.8,195.6 517.4,195.6 518.0,195.7 518.5,195.8 519.1,195.9 519.7,195.9 520.2,196.0 520.8,196.1 521.4,196.2 521.9,196.2 522.5,196.3 523.1,196.4 523.6,196.4 524.2,196.5 524.8,196.5 525.3,196.6 525.9,196.7 526.5,196.7 527.0,196.8 527.6,196.8 528.2,196.9 528.7,197.0 529.3,197.0 529.9,197.1 530.4,197.1 531.0,197.2 531.6,197.2 532.1,197.3 532.7,197.3 533.3,197.4 533.8,197.4 534.4,197.5 535.0,197.5 535.5,197.5 536.1,197.6 536.7,197.6 537.2,197.7 537.8,197.7 538.4,197.8 538.9,197.8 539.5,197.8 540.1,197.9 540.6,197.9 541.2,197.9 541.8,198.0 542.3,198.0 542.9,198.1 543.5,198.1 544.0,198.1 544.6,198.2 545.2,198.2 545.7,198.2 546.3,198.3 546.9,198.3 547.4,198.3 548.0,198.3 548.6,198.4 549.1,198.4 549.7,198.4 550.3,198.5 550.8,198.5 551.4,198.5 552.0,198.5 552.5,198.6 553.1,198.6 553.7,198.6 554.2,198.6 554.8,198.7 555.4,198.7 555.9,198.7 556.5,198.7 557.1,198.8 557.6,198.8 558.2,198.8 558.8,198.8 559.3,198.8 559.9,198.9 560.5,198.9 561.0,198.9 561.6,198.9 562.2,198.9 562.7,199.0 563.3,199.0 563.9,199.0 564.4,199.0 565.0,199.0" fill="none" stroke="#4051b5" stroke-width="2.2"/>
<line x1="395.0" y1="200.0" x2="565.0" y2="200.0" stroke="currentColor" stroke-width="1"/>
<line x1="407.6" y1="200.0" x2="407.6" y2="205.0" stroke="currentColor" stroke-width="1"/>
<text x="407.6" y="218.0" text-anchor="middle" fill="currentColor">μ−σ</text>
<line x1="439.1" y1="200.0" x2="439.1" y2="205.0" stroke="currentColor" stroke-width="1"/>
<text x="439.1" y="218.0" text-anchor="middle" fill="currentColor">μ</text>
<line x1="470.6" y1="200.0" x2="470.6" y2="205.0" stroke="currentColor" stroke-width="1"/>
<text x="470.6" y="218.0" text-anchor="middle" fill="currentColor">μ+σ</text>
<line x1="439.1" y1="45.0" x2="439.1" y2="200.0" stroke="currentColor" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
<text x="480.0" y="36.0" text-anchor="middle" fill="currentColor" font-weight="bold">esponenziale</text>
<text x="480.0" y="240.0" text-anchor="middle" fill="#2e9e5b" font-weight="bold" font-size="15">86,5 %</text>
</svg>
<figcaption>Tre distribuzioni con la stessa media μ e la stessa deviazione standard σ. L'area verde è la probabilità di cadere entro una deviazione standard dalla media: 68,3% per la normale, 57,7% per l'uniforme, 86,5% per l'esponenziale. La domanda è la stessa, la risposta dipende dalla forma della distribuzione.</figcaption>
</figure>

Mettiamo insieme i tre risultati. La domanda era sempre la stessa: con quale probabilità la variabile cade entro una deviazione standard dalla media? Le risposte sono tre: circa il 68% per la normale, il 58% per l’uniforme, l’87% per l’esponenziale. In ciascun caso la risposta non dipende dai valori di $\mu$ e di $\sigma$, ma dipende dalla **forma** della distribuzione. Ed ecco il problema: se la forma non la conosciamo, se di una variabile sappiamo soltanto che ha media $\mu$ e varianza $\sigma^2$, non c’è nessun conto da fare.

L’idea della scuola di San Pietroburgo è di cambiare domanda. Invece del valore esatto, che senza la forma non possiamo avere, cerchiamo un **limite**: un numero che la probabilità non può superare, o sotto il quale non può scendere, qualunque sia la distribuzione. Partiamo dal caso in cui sappiamo ancora meno: soltanto la media.

!!! example "Sosta di verifica"
    Rifai i conti con due deviazioni standard invece di una: quanto vale $P(\mu-2\sigma\le X\le\mu+2\sigma)$ per una variabile normale e per una variabile uniforme?

    ??? esempio-svolto "Risposta"
        Per la normale, standardizzando, gli estremi diventano $-2$ e $2$, e la probabilità è $2\,\Phi(2)-1=2\cdot0{,}9772-1=0{,}9544$: è il 95% della regola. Per l’uniforme bisogna fare attenzione: $2\sigma=2(\beta-\alpha)/\sqrt{12}\approx0{,}58\,(\beta-\alpha)$, più della metà della lunghezza dell’intervallo. Quindi $[\mu-2\sigma,\;\mu+2\sigma]$ contiene tutto $[\alpha,\beta]$, e la probabilità è 1: una variabile uniforme non si allontana mai dalla media di due deviazioni standard.

## Atto III — La disuguaglianza di Markov {: #markov }

Il problema è questo. Di una variabile aleatoria $X$ non sappiamo quasi nulla, e vogliamo un limite massimo per la probabilità che $X$ sia maggiore o uguale a un numero positivo $a$. Sappiamo soltanto che $X$ non è mai negativa e che ha media $\mathbb{E}[X]$. Che cosa possiamo dire di $P(X\ge a)$?

Cominciamo da un esempio con numeri piccoli. In un gruppo di dieci persone il reddito medio è di 1000 euro al mese. Nessuno ha un reddito negativo. Quante persone, al massimo, possono guadagnare almeno 10 000 euro?

Un reddito medio di 1000 euro su dieci persone vuol dire che la somma dei redditi è 10 000 euro. Se una persona guadagna 10 000 euro, ha già da sola tutta la somma, e le altre nove devono guadagnare zero. Se due persone guadagnassero almeno 10 000 euro, la somma sarebbe almeno 20 000 euro, e la media almeno 2000: impossibile. Quindi al più una persona su dieci, cioè al più il 10%, può raggiungere i 10 000 euro. E notiamo il rapporto: 10% è proprio $1000/10\,000$, la media divisa per la soglia.

<figure markdown="0">
<svg viewBox="0 0 580 250" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Due gruppi di dieci persone con reddito medio 1000 euro. Nel primo i redditi sono vari e nessuno arriva a 10000. Nel secondo una persona ha 10000 euro e le altre nove hanno zero: è il caso estremo, e più di una persona sopra 10000 è impossibile.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">Dieci persone, reddito medio 1000 €: quante possono avere almeno 10 000 €?</text>
<line x1="30.0" y1="210.0" x2="280.0" y2="210.0" stroke="currentColor" stroke-width="1"/>
<line x1="30.0" y1="50.0" x2="280.0" y2="50.0" stroke="#e03a3a" stroke-width="1.2" stroke-dasharray="5,4"/>
<line x1="30.0" y1="194.0" x2="280.0" y2="194.0" stroke="#e07a1f" stroke-width="1.2" stroke-dasharray="5,4"/>
<rect x="35.0" y="197.2" width="22" height="12.8" fill="#4051b5"/>
<rect x="59.5" y="186.0" width="22" height="24.0" fill="#4051b5"/>
<rect x="84.0" y="200.4" width="22" height="9.6" fill="#4051b5"/>
<rect x="108.5" y="190.8" width="22" height="19.2" fill="#4051b5"/>
<rect x="133.0" y="195.6" width="22" height="14.4" fill="#4051b5"/>
<rect x="157.5" y="178.0" width="22" height="32.0" fill="#4051b5"/>
<rect x="182.0" y="198.8" width="22" height="11.2" fill="#4051b5"/>
<rect x="206.5" y="192.4" width="22" height="17.6" fill="#4051b5"/>
<rect x="231.0" y="202.0" width="22" height="8.0" fill="#4051b5"/>
<rect x="255.5" y="198.8" width="22" height="11.2" fill="#4051b5"/>
<text x="280.0" y="45.0" text-anchor="end" fill="#e03a3a">10 000 €</text>
<text x="280.0" y="189.0" text-anchor="end" fill="#e07a1f">media 1000 €</text>
<text x="155.0" y="232.0" text-anchor="middle" fill="currentColor">redditi vari: nessuno sopra 10 000</text>
<line x1="315.0" y1="210.0" x2="565.0" y2="210.0" stroke="currentColor" stroke-width="1"/>
<line x1="315.0" y1="50.0" x2="565.0" y2="50.0" stroke="#e03a3a" stroke-width="1.2" stroke-dasharray="5,4"/>
<line x1="315.0" y1="194.0" x2="565.0" y2="194.0" stroke="#e07a1f" stroke-width="1.2" stroke-dasharray="5,4"/>
<rect x="320.0" y="50.0" width="22" height="160.0" fill="#e03a3a"/>
<rect x="344.5" y="210.0" width="22" height="0.0" fill="#4051b5"/>
<rect x="369.0" y="210.0" width="22" height="0.0" fill="#4051b5"/>
<rect x="393.5" y="210.0" width="22" height="0.0" fill="#4051b5"/>
<rect x="418.0" y="210.0" width="22" height="0.0" fill="#4051b5"/>
<rect x="442.5" y="210.0" width="22" height="0.0" fill="#4051b5"/>
<rect x="467.0" y="210.0" width="22" height="0.0" fill="#4051b5"/>
<rect x="491.5" y="210.0" width="22" height="0.0" fill="#4051b5"/>
<rect x="516.0" y="210.0" width="22" height="0.0" fill="#4051b5"/>
<rect x="540.5" y="210.0" width="22" height="0.0" fill="#4051b5"/>
<text x="565.0" y="45.0" text-anchor="end" fill="#e03a3a">10 000 €</text>
<text x="565.0" y="189.0" text-anchor="end" fill="#e07a1f">media 1000 €</text>
<text x="440.0" y="232.0" text-anchor="middle" fill="currentColor">il caso estremo: uno solo, e gli altri a zero</text>
</svg>
<figcaption>Due gruppi di dieci persone con lo stesso reddito medio, 1000 €, cioè 10 000 € in tutto. Per far arrivare una persona a 10 000 € bisogna darle tutto il totale e lasciare le altre nove a zero; due persone sopra 10 000 € sono impossibili. Al più una persona su dieci, cioè il 10%: è la disuguaglianza di Markov.</figcaption>
</figure>

Il ragionamento ha usato due ingredienti. Il primo è la media: è lei che fissa la somma da distribuire. Il secondo è che nessuno ha un reddito negativo: se qualcuno potesse avere un reddito di $-50\,000$ euro, cioè un debito, potrebbe «compensare» molte persone ricche, e la media resterebbe bassa anche con tanti redditi alti. Con questi due ingredienti, l’argomento vale per qualunque variabile.

!!! abstract "Disuguaglianza di Markov"
    Sia $X$ una variabile aleatoria che non assume mai valori negativi, e sia $a>0$ un numero. Allora

    $$
    P(X\ge a)\le\frac{\mathbb{E}[X]}{a}.
    $$

A parole: una variabile non negativa non può essere spesso molto più grande della sua media. Se scegliamo come soglia un multiplo della media, $a=c\,\mathbb{E}[X]$ con $c>0$, la disuguaglianza diventa $P\big(X\ge c\,\mathbb{E}[X]\big)\le 1/c$: la probabilità di superare il doppio della media è al più 1/2, quella di superare dieci volte la media è al più 1/10.

### Perché è vera {: #markov-dimostrazione }

La dimostrazione traduce in formule l’argomento dei redditi, con lo strumento delle indicatrici della Settimana 4. Definiamo l’indicatrice dell’evento che ci interessa:

$$
I=\begin{cases}1&\text{se }X\ge a,\\0&\text{se }X<a.\end{cases}
$$

Il primo passo è osservare che, qualunque cosa succeda, vale

$$
X\ge a\cdot I.
$$

Per vederlo basta distinguere i due casi. Se $X<a$, allora $I=0$ e la disuguaglianza dice $X\ge0$, che è vero perché $X$ non è mai negativa: è qui che serve l’ipotesi. Se invece $X\ge a$, allora $I=1$ e la disuguaglianza dice $X\ge a$, che è proprio il caso in cui ci troviamo. La figura mostra i due casi: la retta blu dei valori di $X$ non scende mai sotto il gradino arancione di $a\cdot I$.

<figure markdown="0">
<svg viewBox="0 0 580 290" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Grafico per la dimostrazione della disuguaglianza di Markov con a uguale a 4. In blu la retta del valore di X; in arancione la variabile a per l'indicatrice, che vale 0 sotto 4 e vale 4 da 4 in su. La linea blu non scende mai sotto quella arancione quando X è positiva o nulla.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">Perché X ≥ a · I, se X non è mai negativa (qui a = 4)</text>
<defs><marker id="s08f3a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<line x1="60.0" y1="250.0" x2="550.0" y2="250.0" stroke="currentColor" stroke-width="1" marker-end="url(#s08f3a)"/>
<line x1="60.0" y1="250.0" x2="60.0" y2="30.0" stroke="currentColor" stroke-width="1" marker-end="url(#s08f3a)"/>
<text x="552.0" y="242.0" text-anchor="end" fill="currentColor">valore che X assume</text>
<text x="68.0" y="36.0" text-anchor="start" fill="currentColor">valore di X e di a · I</text>
<line x1="60.0" y1="250.0" x2="60.0" y2="255.0" stroke="currentColor" stroke-width="1"/>
<text x="60.0" y="268.0" text-anchor="middle" fill="currentColor">0</text>
<line x1="55.0" y1="250.0" x2="60.0" y2="250.0" stroke="currentColor" stroke-width="1"/>
<text x="51.0" y="254.0" text-anchor="end" fill="currentColor">0</text>
<line x1="156.0" y1="250.0" x2="156.0" y2="255.0" stroke="currentColor" stroke-width="1"/>
<text x="156.0" y="268.0" text-anchor="middle" fill="currentColor">2</text>
<line x1="55.0" y1="208.0" x2="60.0" y2="208.0" stroke="currentColor" stroke-width="1"/>
<text x="51.0" y="212.0" text-anchor="end" fill="currentColor">2</text>
<line x1="252.0" y1="250.0" x2="252.0" y2="255.0" stroke="currentColor" stroke-width="1"/>
<text x="252.0" y="268.0" text-anchor="middle" fill="currentColor">4</text>
<line x1="55.0" y1="166.0" x2="60.0" y2="166.0" stroke="currentColor" stroke-width="1"/>
<text x="51.0" y="170.0" text-anchor="end" fill="currentColor">4</text>
<line x1="348.0" y1="250.0" x2="348.0" y2="255.0" stroke="currentColor" stroke-width="1"/>
<text x="348.0" y="268.0" text-anchor="middle" fill="currentColor">6</text>
<line x1="55.0" y1="124.0" x2="60.0" y2="124.0" stroke="currentColor" stroke-width="1"/>
<text x="51.0" y="128.0" text-anchor="end" fill="currentColor">6</text>
<line x1="444.0" y1="250.0" x2="444.0" y2="255.0" stroke="currentColor" stroke-width="1"/>
<text x="444.0" y="268.0" text-anchor="middle" fill="currentColor">8</text>
<line x1="55.0" y1="82.0" x2="60.0" y2="82.0" stroke="currentColor" stroke-width="1"/>
<text x="51.0" y="86.0" text-anchor="end" fill="currentColor">8</text>
<line x1="540.0" y1="250.0" x2="540.0" y2="255.0" stroke="currentColor" stroke-width="1"/>
<text x="540.0" y="268.0" text-anchor="middle" fill="currentColor">10</text>
<line x1="55.0" y1="40.0" x2="60.0" y2="40.0" stroke="currentColor" stroke-width="1"/>
<text x="51.0" y="44.0" text-anchor="end" fill="currentColor">10</text>
<polygon points="60.0,250.0 252.0,166.0 252.0,250.0" fill="#4051b5" fill-opacity="0.12" stroke="none"/>
<polygon points="252.0,166.0 540.0,40.0 540.0,166.0" fill="#4051b5" fill-opacity="0.12" stroke="none"/>
<polyline points="60.0,250.0 540.0,40.0" fill="none" stroke="#4051b5" stroke-width="2.5"/>
<polyline points="60.0,250.0 252.0,250.0" fill="none" stroke="#e07a1f" stroke-width="4"/>
<polyline points="252.0,166.0 540.0,166.0" fill="none" stroke="#e07a1f" stroke-width="4"/>
<circle cx="252.0" cy="166.0" r="5" fill="#e07a1f"/>
<circle cx="252.0" cy="250.0" r="5" fill="#fff" stroke="#e07a1f" stroke-width="2"/>
<text x="472.8" y="57.4" text-anchor="middle" fill="#4051b5" font-weight="bold" font-size="15">X</text>
<text x="405.6" y="186.0" text-anchor="middle" fill="#e07a1f" font-weight="bold">a · I = 4</text>
<text x="156.0" y="240.0" text-anchor="middle" fill="#e07a1f" font-weight="bold">a · I = 0</text>
<text x="175.2" y="113.5" text-anchor="middle" fill="currentColor">sotto a: X ≥ 0 = a · I</text>
<text x="381.6" y="48.4" text-anchor="middle" fill="currentColor">da a in su: X ≥ a = a · I</text>
</svg>
<figcaption>La variabile indicatrice I vale 1 quando X ≥ a e 0 altrimenti; qui a = 4. La variabile a · I (arancione) vale 0 a sinistra di a e vale a da a in poi. Se X non è mai negativa, la retta blu dei valori di X sta sempre sopra la linea arancione: X ≥ a · I in ogni caso. Sull’asse orizzontale c’è il valore che X può assumere; sull’asse verticale c’è il valore delle due variabili che confrontiamo, X e a · I, in corrispondenza di quel valore di X. Le zone azzurre quantificano il divario.</figcaption>
</figure>

Quando $X$ cade strettamente tra 0 e $a$, la retta blu sta sopra il gradino arancione, perché $X$ è positiva mentre $a\cdot I$ vale 0. Quando $X$ supera $a$, succede lo stesso, perché $X$ è più grande di $a$ mentre $a\cdot I$ vale esattamente $a$.

Il secondo passo è passare ai valori attesi. Se una variabile è sempre maggiore o uguale a un’altra, anche la sua media lo è: è la **monotonia del valore atteso**. Si capisce pensando alla media come a una somma pesata: se ogni valore della prima variabile è almeno grande quanto il valore corrispondente della seconda, e i pesi (le probabilità) sono gli stessi e non negativi, la somma pesata della prima è almeno grande quanto quella della seconda. Quindi

$$
\mathbb{E}[X]\ge\mathbb{E}[a\cdot I].
$$

Il terzo passo è calcolare il membro di destra. Per la linearità, la costante $a$ esce dal valore atteso; e la media di un’indicatrice è la probabilità del suo evento:

$$
\mathbb{E}[a\cdot I]=a\,\mathbb{E}[I]=a\,P(X\ge a).
$$

Mettendo insieme i due passi otteniamo $\mathbb{E}[X]\ge a\,P(X\ge a)$. Dividiamo entrambi i membri per $a$, che è positivo e quindi non cambia il verso della disuguaglianza, e arriviamo alla disuguaglianza di Markov:

$$
P(X\ge a)\le\frac{\mathbb{E}[X]}{a}.
$$

Questa disuguaglianza ci fornisce il limite di probabilità più stretto possibile quando conosciamo soltanto la media della variabile aleatoria.  Per ottenere un limite ancora più stretto bisogna quindi sapere qualcosa di più sulla distribuzione della variabile. È la strada che prenderemo tra poco con la varianza.

### Cosa garantisce la disuguaglianza di Markov {: #markov-uso }

Un servizio web risponde in media in 200 millisecondi. Il tempo di risposta $T$ non è mai negativo, quindi possiamo usare la disuguaglianza di Markov senza sapere nient’altro:

$$
P(T\ge1000\text{ ms})\le\frac{200}{1000}=0{,}2,\qquad P(T\ge2000\text{ ms})\le\frac{200}{2000}=0{,}1.
$$

Al più una richiesta su cinque supera il secondo, al più una su dieci supera i due secondi. Sono garanzie vere qualunque sia la distribuzione dei tempi, ma sono molto prudenti. Se il tempo di risposta fosse esponenziale con media 200 millisecondi, le probabilità vere sarebbero $e^{-1000/200}=e^{-5}\approx0{,}0067$ e $e^{-10}\approx0{,}000045$: decine o migliaia di volte più piccole dei limiti. La disuguaglianza di Markov descrive il **caso peggiore** tra tutte le distribuzioni con quella media.

Lo stesso ragionamento si usa per gli algoritmi randomizzati, come il quicksort con il pivot scelto a caso. Se il tempo medio di esecuzione su un certo input è $\bar t$, la disuguaglianza di Markov dice che la probabilità di metterci almeno $10\,\bar t$ è al più 1/10. Su questa idea si basa una strategia molto usata: se un’esecuzione dura troppo, la si interrompe e la si ricomincia con nuove scelte casuali, sapendo che una lunga sfortuna di fila è improbabile.

Ci sono due situazioni in cui la disuguaglianza non serve. La prima è quando la soglia non supera la media: se $a\le\mathbb{E}[X]$, il limite $\mathbb{E}[X]/a$ è maggiore o uguale a 1, e dire che una probabilità è al più 1 non dice nulla. La seconda è quando la variabile può essere negativa. Se $X$ vale $10\,000$ o $-10\,000$ con probabilità 1/2 ciascuno, la media è 0, e la disuguaglianza applicata senza pensarci direbbe $P(X\ge10\,000)\le0$; invece questa probabilità vale 1/2. I valori negativi compensano quelli positivi nella media, e l’argomento dei redditi non funziona più.

!!! example "Sosta di verifica"
    Su un server la dimensione media dei file è di 4 MB. (a) Che cosa si può dire della frazione di file da almeno 40 MB? (b) Un collega sostiene che metà dei file pesa almeno 10 MB. È possibile? (c) E un terzo dei file?

    ??? esempio-svolto "Risposta"
        La dimensione di un file non è mai negativa, quindi vale la disuguaglianza di Markov. (a) $P(X\ge40)\le4/40=0{,}1$: al più un file su dieci. (b) $P(X\ge10)\le4/10=0{,}4$: al più il 40% dei file pesa almeno 10 MB, quindi la metà è impossibile. (c) Un terzo, circa il 33%, è sotto il limite del 40%: la disuguaglianza non lo esclude. Attenzione però: non lo esclude, ma non dice nemmeno che sia vero. Il limite è un tetto, non una previsione.

La disuguaglianza di Markov usa un’informazione sola, la media, e per questo è un po’ grossolana. Se conosciamo anche la varianza, possiamo fare molto meglio, e con uno sforzo minimo: basta applicare Markov alla variabile giusta. È l’idea di Čebyšëv.

## Atto IV — La disuguaglianza di Čebyšëv {: #cebysev }

Ecco la domanda. Di una variabile aleatoria $X$ conosciamo il valore atteso $\mu$ e la varianza $\sigma^2$, e nient’altro. Vogliamo un limite minimo per la probabilità che $X$ cada tra $\mu-k\sigma$ e $\mu+k\sigma$, dove il numero positivo $k$ conta quante deviazioni standard ci allontaniamo dalla media. Rispetto a Markov ci sono due differenze. Ora conosciamo anche la varianza. E non serve più che la variabile sia non negativa: $X$ può assumere qualunque valore reale.

### Markov applicata alla variabile giusta {: #cebysev-dimostrazione }

Conviene ragionare prima sull’evento opposto: la variabile si allontana dalla media di almeno una certa distanza $a>0$, cioè $|X-\mu|\ge a$. La distanza $|X-\mu|$ non è mai negativa, qualunque sia il segno di $X$: è proprio il tipo di variabile a cui si applica Markov. C’è però un problema: di $|X-\mu|$ non conosciamo la media. Conosciamo invece la media del suo quadrato, perché è la definizione di varianza: $\mathbb{E}[(X-\mu)^2]=\sigma^2$. Allora eleviamo al quadrato.

Il primo passo è riscrivere l’evento:

$$
|X-\mu|\ge a\qquad\text{se e solo se}\qquad(X-\mu)^2\ge a^2.
$$

Il "se è solo se" vuol dire che i due eventi sono lo stesso evento, scritto in due modi, e hanno la stessa probabilità.

Il secondo passo è applicare la disuguaglianza di Markov alla variabile $Y=(X-\mu)^2$, che è un quadrato e quindi non è mai negativa, con la soglia $a^2>0$:

$$
P\big((X-\mu)^2\ge a^2\big)\le\frac{\mathbb{E}\big[(X-\mu)^2\big]}{a^2}.
$$

Il terzo passo è riconoscere che il numeratore è la varianza, $\sigma^2$. Rimettendo insieme i pezzi otteniamo la disuguaglianza nella sua prima forma.

!!! abstract "Disuguaglianza di Čebyšëv"
    Sia $X$ una variabile aleatoria con media $\mu$ e varianza $\sigma^2$. Per ogni numero $a>0$,

    $$
    P\big(|X-\mu|\ge a\big)\le\frac{\sigma^2}{a^2}.
    $$

    Scegliendo $a=k\sigma$, cioè misurando la distanza in deviazioni standard, con $k>0$:

    $$
    P\big(|X-\mu|\ge k\sigma\big)\le\frac{1}{k^2},
    \qquad\text{e quindi}\qquad
    P\big(|X-\mu|<k\sigma\big)\ge1-\frac{1}{k^2}.
    $$

La seconda forma si ottiene sostituendo $a=k\sigma$ nella prima: $\sigma^2/(k\sigma)^2=\sigma^2/(k^2\sigma^2)=1/k^2$. La terza è la regola del complementare: l’evento «la distanza dalla media è minore di $k\sigma$» è il contrario dell’evento «la distanza è almeno $k\sigma$», e la sua probabilità è 1 meno quella dell’altro. Si trova spesso scritta con l’intervallo chiuso, $P(\mu-k\sigma\le X\le\mu+k\sigma)\ge1-1/k^2$: vale anche così, perché l’intervallo chiuso contiene quello aperto e quindi ha una probabilità almeno altrettanto grande.

Leggiamo qualche valore. Con $k=2$, al più un quarto della probabilità sta a due o più deviazioni standard dalla media, e almeno il 75% sta entro due deviazioni standard. Con $k=3$, al più $1/9\approx11{,}1\%$ sta fuori e almeno l’88,9% sta dentro. Con $k=1$ la disuguaglianza dice soltanto che la probabilità di stare fuori è al più 1. 

Questa è un’informazione vuota, perché qualunque probabilità è al più 1. Anche la forma con il complementare non aggiunge nulla: dice che la probabilità di stare entro una deviazione standard dalla media è almeno $1-1/1^2=0$. Viene allora da chiedersi di chi sia la colpa. Forse la disuguaglianza è troppo prudente, oppure, conoscendo soltanto la media e la varianza, davvero non si può dire di più. È vera la seconda possibilità: esistono variabili che non hanno nessuna probabilità di cadere a distanza minore di una deviazione standard dalla media.

Ecco l’esempio più semplice. Sia $X$ la variabile che vale $-1$ oppure $+1$, ciascuno con probabilità 1/2. La media è $\mu=(-1)\cdot\tfrac12+(+1)\cdot\tfrac12=0$. Il quadrato di $X$ vale 1 in entrambi i casi, quindi la varianza è $\sigma^2=\mathbb{E}\big[(X-0)^2\big]=\mathbb{E}[X^2]=1$ e la deviazione standard è $\sigma=1$. Ora guardiamo dove cadono i valori. Sia $-1$ sia $+1$ stanno a distanza esattamente 1 dalla media, cioè esattamente a una deviazione standard, e nessun valore è più vicino. Quindi

$$
P\big(|X-\mu|<\sigma\big)=P\big(|X|<1\big)=0
\qquad\text{e}\qquad
P\big(|X-\mu|\ge\sigma\big)=1.
$$

Per questa variabile la probabilità di stare fuori vale proprio 1, cioè tutto quello che la disuguaglianza concede. Il limite con $k=1$ quindi non è debole: è il migliore possibile, perché c’è una variabile che lo raggiunge. L’esempio non dipende dai numeri scelti. Con gli stessi conti si vede che la variabile che vale $\mu-\sigma$ oppure $\mu+\sigma$, con probabilità 1/2 ciascuno, ha media $\mu$ e deviazione standard $\sigma$, per qualunque scelta di $\mu$ e di $\sigma>0$, e non cade mai a distanza minore di $\sigma$ dalla media. Qui conta che la distanza sia minore di $\sigma$ in senso stretto. I due valori $\mu\pm\sigma$ stanno proprio sul bordo dell’intervallo: l’intervallo chiuso $[\mu-\sigma,\,\mu+\sigma]$ li contiene entrambi e ha probabilità 1, mentre quello aperto non ne contiene nessuno.

<figure markdown="0">
<svg viewBox="0 0 580 260" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Una densità asimmetrica con media 3 e deviazione standard radice di 3. In verde la zona tra mu meno 2 sigma e mu più 2 sigma; in rosso le code fuori. Le code pesano 4,4 per cento; la disuguaglianza di Čebyšëv garantisce al più 25 per cento, qualunque sia la forma.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">Le due code fuori da μ ± 2σ: Čebyšëv dice «al più 1/4», per qualunque forma</text>
<polygon points="78.5,200.0 78.5,200.0 79.6,199.8 80.8,199.1 81.9,198.0 83.1,196.6 84.2,194.8 85.4,192.8 86.5,190.4 87.7,187.9 88.8,185.1 90.0,182.2 91.2,179.1 92.3,175.8 93.5,172.5 94.6,169.0 95.8,165.5 96.9,161.9 98.1,158.3 99.2,154.6 100.4,150.9 101.5,147.2 102.7,143.5 103.8,139.8 105.0,136.2 106.2,132.6 107.3,129.0 108.5,125.5 109.6,122.0 110.8,118.6 111.9,115.3 113.1,112.0 114.2,108.8 115.4,105.7 116.5,102.7 117.7,99.7 118.8,96.9 120.0,94.1 121.2,91.5 122.3,88.9 123.5,86.5 124.6,84.1 125.8,81.8 126.9,79.7 128.1,77.6 129.2,75.6 130.4,73.7 131.5,72.0 132.7,70.3 133.8,68.7 135.0,67.2 136.2,65.8 137.3,64.5 138.5,63.3 139.6,62.2 140.8,61.2 141.9,60.3 143.1,59.4 144.2,58.7 145.4,58.0 146.5,57.4 147.7,56.9 148.8,56.4 150.0,56.1 151.2,55.8 152.3,55.6 153.5,55.4 154.6,55.3 155.8,55.3 156.9,55.4 158.1,55.5 159.2,55.7 160.4,55.9 161.5,56.2 162.7,56.6 163.8,57.0 165.0,57.4 166.2,57.9 167.3,58.5 168.5,59.0 169.6,59.7 170.8,60.4 171.9,61.1 173.1,61.8 174.2,62.6 175.4,63.5 176.5,64.3 177.7,65.2 178.8,66.1 180.0,67.1 181.2,68.1 182.3,69.1 183.5,70.1 184.6,71.2 185.8,72.2 186.9,73.3 188.1,74.4 189.2,75.6 190.4,76.7 191.5,77.9 192.7,79.1 193.8,80.3 195.0,81.5 196.2,82.7 197.3,83.9 198.5,85.1 199.6,86.4 200.8,87.6 201.9,88.9 203.1,90.1 204.2,91.4 205.4,92.7 206.5,93.9 207.7,95.2 208.8,96.5 210.0,97.7 211.2,99.0 212.3,100.3 213.5,101.6 214.6,102.8 215.8,104.1 216.9,105.4 218.1,106.6 219.2,107.9 220.4,109.1 221.5,110.4 222.7,111.6 223.8,112.9 225.0,114.1 226.2,115.3 227.3,116.5 228.5,117.7 229.6,118.9 230.8,120.1 231.9,121.3 233.1,122.5 234.2,123.6 235.4,124.8 236.5,125.9 237.7,127.1 238.8,128.2 240.0,129.3 241.2,130.4 242.3,131.5 243.5,132.6 244.6,133.7 245.8,134.7 246.9,135.8 248.1,136.8 249.2,137.9 250.4,138.9 251.5,139.9 252.7,140.9 253.8,141.9 255.0,142.8 256.2,143.8 257.3,144.7 258.5,145.7 259.6,146.6 260.8,147.5 261.9,148.4 263.1,149.3 264.2,150.2 265.4,151.1 266.5,151.9 267.7,152.8 268.8,153.6 270.0,154.4 271.2,155.3 272.3,156.1 273.5,156.8 274.6,157.6 275.8,158.4 276.9,159.1 278.1,159.9 279.2,160.6 280.4,161.3 281.5,162.1 282.7,162.8 283.8,163.5 285.0,164.1 286.2,164.8 287.3,165.5 288.5,166.1 289.6,166.8 290.8,167.4 291.9,168.0 293.1,168.6 294.2,169.2 295.4,169.8 296.5,170.4 297.7,170.9 298.8,171.5 300.0,172.1 301.2,172.6 302.3,173.1 303.5,173.7 304.6,174.2 305.8,174.7 306.9,175.2 308.1,175.7 309.2,176.2 310.4,176.6 311.5,177.1 312.7,177.5 313.8,178.0 315.0,178.4 316.2,178.9 317.3,179.3 318.5,179.7 319.6,180.1 320.8,180.5 321.9,180.9 323.1,181.3 324.2,181.7 325.4,182.1 326.5,182.4 327.1,182.6 327.1,200.0" fill="#2e9e5b" fill-opacity="0.3" stroke="none"/>
<polygon points="327.1,200.0 327.1,182.6 327.7,182.8 328.8,183.1 330.0,183.5 331.2,183.8 332.3,184.2 333.5,184.5 334.6,184.8 335.8,185.1 336.9,185.4 338.1,185.7 339.2,186.0 340.4,186.3 341.5,186.6 342.7,186.9 343.8,187.2 345.0,187.4 346.2,187.7 347.3,188.0 348.5,188.2 349.6,188.5 350.8,188.7 351.9,189.0 353.1,189.2 354.2,189.4 355.4,189.7 356.5,189.9 357.7,190.1 358.8,190.3 360.0,190.5 361.2,190.7 362.3,190.9 363.5,191.1 364.6,191.3 365.8,191.5 366.9,191.7 368.1,191.9 369.2,192.0 370.4,192.2 371.5,192.4 372.7,192.6 373.8,192.7 375.0,192.9 376.2,193.0 377.3,193.2 378.5,193.3 379.6,193.5 380.8,193.6 381.9,193.8 383.1,193.9 384.2,194.0 385.4,194.2 386.5,194.3 387.7,194.4 388.8,194.6 390.0,194.7 391.2,194.8 392.3,194.9 393.5,195.0 394.6,195.1 395.8,195.2 396.9,195.4 398.1,195.5 399.2,195.6 400.4,195.7 401.5,195.8 402.7,195.9 403.8,195.9 405.0,196.0 406.2,196.1 407.3,196.2 408.5,196.3 409.6,196.4 410.8,196.5 411.9,196.6 413.1,196.6 414.2,196.7 415.4,196.8 416.5,196.9 417.7,196.9 418.8,197.0 420.0,197.1 421.2,197.1 422.3,197.2 423.5,197.3 424.6,197.3 425.8,197.4 426.9,197.5 428.1,197.5 429.2,197.6 430.4,197.6 431.5,197.7 432.7,197.7 433.8,197.8 435.0,197.8 436.2,197.9 437.3,197.9 438.5,198.0 439.6,198.0 440.8,198.1 441.9,198.1 443.1,198.2 444.2,198.2 445.4,198.3 446.5,198.3 447.7,198.3 448.8,198.4 450.0,198.4 451.2,198.4 452.3,198.5 453.5,198.5 454.6,198.6 455.8,198.6 456.9,198.6 458.1,198.7 459.2,198.7 460.4,198.7 461.5,198.7 462.7,198.8 463.8,198.8 465.0,198.8 466.2,198.9 467.3,198.9 468.5,198.9 469.6,198.9 470.8,199.0 471.9,199.0 473.1,199.0 474.2,199.0 475.4,199.1 476.5,199.1 477.7,199.1 478.8,199.1 480.0,199.1 481.2,199.2 482.3,199.2 483.5,199.2 484.6,199.2 485.8,199.2 486.9,199.3 488.1,199.3 489.2,199.3 490.4,199.3 491.5,199.3 492.7,199.3 493.8,199.4 495.0,199.4 496.2,199.4 497.3,199.4 498.5,199.4 499.6,199.4 500.8,199.5 501.9,199.5 503.1,199.5 504.2,199.5 505.4,199.5 506.5,199.5 507.7,199.5 508.8,199.5 510.0,199.5 511.2,199.6 512.3,199.6 513.5,199.6 514.6,199.6 515.8,199.6 516.9,199.6 518.1,199.6 519.2,199.6 520.4,199.6 521.5,199.6 522.7,199.7 523.8,199.7 525.0,199.7 526.2,199.7 527.3,199.7 528.5,199.7 529.6,199.7 530.8,199.7 531.9,199.7 533.1,199.7 534.2,199.7 535.4,199.7 536.5,199.7 537.7,199.8 538.8,199.8 540.0,199.8 540.0,200.0" fill="#e03a3a" fill-opacity="0.45" stroke="none"/>
<polyline points="40.0,200.0 78.5,200.0 78.5,200.0 79.6,199.8 80.8,199.1 81.9,198.0 83.1,196.6 84.2,194.8 85.4,192.8 86.5,190.4 87.7,187.9 88.8,185.1 90.0,182.2 91.2,179.1 92.3,175.8 93.5,172.5 94.6,169.0 95.8,165.5 96.9,161.9 98.1,158.3 99.2,154.6 100.4,150.9 101.5,147.2 102.7,143.5 103.8,139.8 105.0,136.2 106.2,132.6 107.3,129.0 108.5,125.5 109.6,122.0 110.8,118.6 111.9,115.3 113.1,112.0 114.2,108.8 115.4,105.7 116.5,102.7 117.7,99.7 118.8,96.9 120.0,94.1 121.2,91.5 122.3,88.9 123.5,86.5 124.6,84.1 125.8,81.8 126.9,79.7 128.1,77.6 129.2,75.6 130.4,73.7 131.5,72.0 132.7,70.3 133.8,68.7 135.0,67.2 136.2,65.8 137.3,64.5 138.5,63.3 139.6,62.2 140.8,61.2 141.9,60.3 143.1,59.4 144.2,58.7 145.4,58.0 146.5,57.4 147.7,56.9 148.8,56.4 150.0,56.1 151.2,55.8 152.3,55.6 153.5,55.4 154.6,55.3 155.8,55.3 156.9,55.4 158.1,55.5 159.2,55.7 160.4,55.9 161.5,56.2 162.7,56.6 163.8,57.0 165.0,57.4 166.2,57.9 167.3,58.5 168.5,59.0 169.6,59.7 170.8,60.4 171.9,61.1 173.1,61.8 174.2,62.6 175.4,63.5 176.5,64.3 177.7,65.2 178.8,66.1 180.0,67.1 181.2,68.1 182.3,69.1 183.5,70.1 184.6,71.2 185.8,72.2 186.9,73.3 188.1,74.4 189.2,75.6 190.4,76.7 191.5,77.9 192.7,79.1 193.8,80.3 195.0,81.5 196.2,82.7 197.3,83.9 198.5,85.1 199.6,86.4 200.8,87.6 201.9,88.9 203.1,90.1 204.2,91.4 205.4,92.7 206.5,93.9 207.7,95.2 208.8,96.5 210.0,97.7 211.2,99.0 212.3,100.3 213.5,101.6 214.6,102.8 215.8,104.1 216.9,105.4 218.1,106.6 219.2,107.9 220.4,109.1 221.5,110.4 222.7,111.6 223.8,112.9 225.0,114.1 226.2,115.3 227.3,116.5 228.5,117.7 229.6,118.9 230.8,120.1 231.9,121.3 233.1,122.5 234.2,123.6 235.4,124.8 236.5,125.9 237.7,127.1 238.8,128.2 240.0,129.3 241.2,130.4 242.3,131.5 243.5,132.6 244.6,133.7 245.8,134.7 246.9,135.8 248.1,136.8 249.2,137.9 250.4,138.9 251.5,139.9 252.7,140.9 253.8,141.9 255.0,142.8 256.2,143.8 257.3,144.7 258.5,145.7 259.6,146.6 260.8,147.5 261.9,148.4 263.1,149.3 264.2,150.2 265.4,151.1 266.5,151.9 267.7,152.8 268.8,153.6 270.0,154.4 271.2,155.3 272.3,156.1 273.5,156.8 274.6,157.6 275.8,158.4 276.9,159.1 278.1,159.9 279.2,160.6 280.4,161.3 281.5,162.1 282.7,162.8 283.8,163.5 285.0,164.1 286.2,164.8 287.3,165.5 288.5,166.1 289.6,166.8 290.8,167.4 291.9,168.0 293.1,168.6 294.2,169.2 295.4,169.8 296.5,170.4 297.7,170.9 298.8,171.5 300.0,172.1 301.2,172.6 302.3,173.1 303.5,173.7 304.6,174.2 305.8,174.7 306.9,175.2 308.1,175.7 309.2,176.2 310.4,176.6 311.5,177.1 312.7,177.5 313.8,178.0 315.0,178.4 316.2,178.9 317.3,179.3 318.5,179.7 319.6,180.1 320.8,180.5 321.9,180.9 323.1,181.3 324.2,181.7 325.4,182.1 326.5,182.4 327.7,182.8 328.8,183.1 330.0,183.5 331.2,183.8 332.3,184.2 333.5,184.5 334.6,184.8 335.8,185.1 336.9,185.4 338.1,185.7 339.2,186.0 340.4,186.3 341.5,186.6 342.7,186.9 343.8,187.2 345.0,187.4 346.2,187.7 347.3,188.0 348.5,188.2 349.6,188.5 350.8,188.7 351.9,189.0 353.1,189.2 354.2,189.4 355.4,189.7 356.5,189.9 357.7,190.1 358.8,190.3 360.0,190.5 361.2,190.7 362.3,190.9 363.5,191.1 364.6,191.3 365.8,191.5 366.9,191.7 368.1,191.9 369.2,192.0 370.4,192.2 371.5,192.4 372.7,192.6 373.8,192.7 375.0,192.9 376.2,193.0 377.3,193.2 378.5,193.3 379.6,193.5 380.8,193.6 381.9,193.8 383.1,193.9 384.2,194.0 385.4,194.2 386.5,194.3 387.7,194.4 388.8,194.6 390.0,194.7 391.2,194.8 392.3,194.9 393.5,195.0 394.6,195.1 395.8,195.2 396.9,195.4 398.1,195.5 399.2,195.6 400.4,195.7 401.5,195.8 402.7,195.9 403.8,195.9 405.0,196.0 406.2,196.1 407.3,196.2 408.5,196.3 409.6,196.4 410.8,196.5 411.9,196.6 413.1,196.6 414.2,196.7 415.4,196.8 416.5,196.9 417.7,196.9 418.8,197.0 420.0,197.1 421.2,197.1 422.3,197.2 423.5,197.3 424.6,197.3 425.8,197.4 426.9,197.5 428.1,197.5 429.2,197.6 430.4,197.6 431.5,197.7 432.7,197.7 433.8,197.8 435.0,197.8 436.2,197.9 437.3,197.9 438.5,198.0 439.6,198.0 440.8,198.1 441.9,198.1 443.1,198.2 444.2,198.2 445.4,198.3 446.5,198.3 447.7,198.3 448.8,198.4 450.0,198.4 451.2,198.4 452.3,198.5 453.5,198.5 454.6,198.6 455.8,198.6 456.9,198.6 458.1,198.7 459.2,198.7 460.4,198.7 461.5,198.7 462.7,198.8 463.8,198.8 465.0,198.8 466.2,198.9 467.3,198.9 468.5,198.9 469.6,198.9 470.8,199.0 471.9,199.0 473.1,199.0 474.2,199.0 475.4,199.1 476.5,199.1 477.7,199.1 478.8,199.1 480.0,199.1 481.2,199.2 482.3,199.2 483.5,199.2 484.6,199.2 485.8,199.2 486.9,199.3 488.1,199.3 489.2,199.3 490.4,199.3 491.5,199.3 492.7,199.3 493.8,199.4 495.0,199.4 496.2,199.4 497.3,199.4 498.5,199.4 499.6,199.4 500.8,199.5 501.9,199.5 503.1,199.5 504.2,199.5 505.4,199.5 506.5,199.5 507.7,199.5 508.8,199.5 510.0,199.5 511.2,199.6 512.3,199.6 513.5,199.6 514.6,199.6 515.8,199.6 516.9,199.6 518.1,199.6 519.2,199.6 520.4,199.6 521.5,199.6 522.7,199.7 523.8,199.7 525.0,199.7 526.2,199.7 527.3,199.7 528.5,199.7 529.6,199.7 530.8,199.7 531.9,199.7 533.1,199.7 534.2,199.7 535.4,199.7 536.5,199.7 537.7,199.8 538.8,199.8 540.0,199.8" fill="none" stroke="#4051b5" stroke-width="2.2"/>
<line x1="40.0" y1="200.0" x2="540.0" y2="200.0" stroke="currentColor" stroke-width="1"/>
<line x1="60.6" y1="200.0" x2="60.6" y2="205.0" stroke="currentColor" stroke-width="1"/>
<text x="60.6" y="219.0" text-anchor="middle" fill="currentColor">μ − 2σ</text>
<line x1="60.6" y1="43.0" x2="60.6" y2="200.0" stroke="currentColor" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
<line x1="193.8" y1="200.0" x2="193.8" y2="205.0" stroke="currentColor" stroke-width="1"/>
<text x="193.8" y="219.0" text-anchor="middle" fill="currentColor">μ</text>
<line x1="193.8" y1="43.0" x2="193.8" y2="200.0" stroke="currentColor" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
<line x1="327.1" y1="200.0" x2="327.1" y2="205.0" stroke="currentColor" stroke-width="1"/>
<text x="327.1" y="219.0" text-anchor="middle" fill="currentColor">μ + 2σ</text>
<line x1="327.1" y1="43.0" x2="327.1" y2="200.0" stroke="currentColor" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
<text x="66.6" y="55.0" text-anchor="start" fill="#e03a3a">coda sinistra</text>
<text x="66.6" y="71.0" text-anchor="start" fill="#e03a3a">(qui vuota)</text>
<text x="362.1" y="163.3" text-anchor="start" fill="#e03a3a">coda destra</text>
<text x="193.8" y="135.9" text-anchor="middle" fill="#2e9e5b" font-weight="bold">entro 2σ</text>
<text x="290.0" y="245.0" text-anchor="middle" fill="currentColor" font-weight="bold">Code vere: 4,4 %   ·   garanzia di Čebyšëv: al più 25 %</text>
</svg>
<figcaption>Una densità asimmetrica, con media μ = 3 e deviazione standard σ = √3 ≈ 1,73. Le due code fuori dall'intervallo μ ± 2σ (in rosso) pesano insieme 4,4%. La disuguaglianza di Čebyšëv garantisce che pesino al più 1/2² = 25%: un limite più largo del valore vero, ma valido senza conoscere la forma della densità. Qui la coda sinistra è vuota, perché μ − 2σ è negativo e la variabile non lo è.</figcaption>
</figure>

### Il prezzo dell’universalità {: #cebysev-confronto }

Confrontiamo la garanzia di Čebyšëv con le probabilità vere delle tre distribuzioni dell’Atto II. La tabella riporta, per alcuni valori di $k$, la probabilità di stare ad almeno $k$ deviazioni standard dalla media.

| $k$ | Čebyšëv: al più | normale | uniforme | esponenziale |
|:---:|:---:|:---:|:---:|:---:|
| 1 | 100% | 31,7% | 42,3% | 13,5% |
| 1,5 | 44,4% | 13,4% | 13,4% | 8,2% |
| 2 | 25% | 4,6% | 0 | 5,0% |
| 3 | 11,1% | 0,27% | 0 | 1,8% |
| 4 | 6,25% | 0,006% | 0 | 0,67% |

In ogni riga la probabilità vera è sotto il limite, come deve essere, e spesso molto sotto. Per la normale la regola 68–95–99,7 dice che fuori da due deviazioni standard cade circa il 4,6% dei valori; Čebyšëv garantisce soltanto che non ne cada più del 25%. Fuori da tre deviazioni standard la normale ne lascia lo 0,27%, Čebyšëv concede fino all’11,1%. È il prezzo dell’universalità: un limite che vale per tutte le distribuzioni deve valere anche per le più sfavorevoli, e quindi è più largo di quello che serve per una distribuzione particolare.

Si potrebbe sperare di trovare un limite migliore, sempre senza conoscere la forma. Non è possibile: per ogni $k\ge1$ esiste una distribuzione che tocca esattamente il limite. È una distribuzione a tre punti, che puoi vedere nel riquadro qui sotto e nel widget.

??? note "Approfondimento facoltativo — La distribuzione che tocca il limite"
    Fissiamo $k\ge1$ e costruiamo una variabile che vale $\mu$ con probabilità $1-1/k^2$, e vale $\mu-k\sigma$ oppure $\mu+k\sigma$ con probabilità $1/(2k^2)$ ciascuno. Le tre probabilità sono non negative e sommano a 1. Per simmetria la media è $\mu$. La varianza è la media degli scarti al quadrato: lo scarto è 0 nel punto centrale e $\pm k\sigma$ nei due punti laterali, quindi

    $$
    \operatorname{Var}(X)=2\cdot\frac{1}{2k^2}\cdot(k\sigma)^2=\frac{1}{k^2}\cdot k^2\sigma^2=\sigma^2.
    $$

    La variabile ha dunque proprio media $\mu$ e varianza $\sigma^2$, e la probabilità di stare ad almeno $k\sigma$ dalla media è la somma dei due punti laterali, $1/(2k^2)+1/(2k^2)=1/k^2$: esattamente il limite di Čebyšëv. La figura mostra il caso $k=2$. Come per Markov, la distribuzione peggiore concentra tutta la probabilità «lontana» esattamente sulla soglia, e tutto il resto esattamente sulla media.

<figure markdown="0">
<svg viewBox="0 0 580 230" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Distribuzione a tre punti con k uguale a 2: valore mu meno 2 sigma con probabilità un ottavo, mu con probabilità tre quarti, mu più 2 sigma con probabilità un ottavo. Le due code pesano un quarto, esattamente il limite di Čebyšëv.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">La distribuzione che tocca il limite (k = 2)</text>
<line x1="60.0" y1="180.0" x2="520.0" y2="180.0" stroke="currentColor" stroke-width="1"/>
<rect x="72.0" y="158.9" width="36" height="21.1" fill="#e03a3a"/>
<text x="90.0" y="199.0" text-anchor="middle" fill="currentColor">μ − 2σ</text>
<text x="90.0" y="151.9" text-anchor="middle" fill="#e03a3a" font-weight="bold">1/8</text>
<rect x="272.0" y="53.4" width="36" height="126.6" fill="#2e9e5b"/>
<text x="290.0" y="199.0" text-anchor="middle" fill="currentColor">μ</text>
<text x="290.0" y="46.4" text-anchor="middle" fill="#2e9e5b" font-weight="bold">3/4</text>
<rect x="472.0" y="158.9" width="36" height="21.1" fill="#e03a3a"/>
<text x="490.0" y="199.0" text-anchor="middle" fill="currentColor">μ + 2σ</text>
<text x="490.0" y="151.9" text-anchor="middle" fill="#e03a3a" font-weight="bold">1/8</text>
<text x="150.0" y="222.0" text-anchor="middle" fill="currentColor" font-weight="bold">varianza: 2 · (1/8) · (2σ)² = σ²</text>
<text x="430.0" y="222.0" text-anchor="middle" fill="currentColor" font-weight="bold">P(|X − μ| ≥ 2σ) = 1/8 + 1/8 = 1/4</text>
</svg>
<figcaption>Una variabile che vale μ con probabilità 3/4 e μ ± 2σ con probabilità 1/8 ciascuno. La sua media è μ e la sua varianza è esattamente σ². La probabilità di stare ad almeno 2σ dalla media è 1/4, proprio il limite di Čebyšëv: il limite non si può migliorare, se si conoscono solo media e varianza.</figcaption>
</figure>

#### Esplora: Čebyšëv contro le distribuzioni vere {: #widget-cebysev }

Il widget disegna, al variare di $k$, il limite di Čebyšëv $1/k^2$ (in arancione) e la probabilità vera di stare ad almeno $k$ deviazioni standard dalla media per la distribuzione che scegli (in blu). Prima di muovere il cursore, prevedi: per quale distribuzione la curva blu sparisce del tutto da un certo $k$ in poi? Poi scegli la distribuzione «a tre punti» e sposta $k$: la distribuzione viene ricostruita per ogni valore di $k$, e il punto blu cade ogni volta sulla curva arancione.

<div class="s08-box" id="s08-ceb">
  <label>Distribuzione: <select id="s08-ceb-d">
    <option value="normale">normale</option>
    <option value="uniforme">uniforme</option>
    <option value="esponenziale">esponenziale</option>
    <option value="tre">a tre punti (costruita per questo k)</option>
  </select></label>
  <label>k = <input type="range" id="s08-ceb-k" min="1" max="5" step="0.05" value="2"> <b id="s08-ceb-kv">2,00</b></label>
  <svg class="s08-svg" id="s08-ceb-svg" viewBox="0 0 560 300" role="img" aria-label="Grafico della probabilità di stare ad almeno k deviazioni standard dalla media, per k da 1 a 5: in arancione il limite di Čebyšëv 1 su k al quadrato, in blu la probabilità vera della distribuzione scelta, con una linea verticale verde sul valore di k scelto."></svg>
  <div class="s08-out" id="s08-ceb-out"></div>
</div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  var sd = document.getElementById('s08-ceb-d'), sk = document.getElementById('s08-ceb-k');
  var svg = document.getElementById('s08-ceb-svg'), out = document.getElementById('s08-ceb-out');
  var NS = 'http://www.w3.org/2000/svg';
  function erf(x) {
    var s = x < 0 ? -1 : 1; x = Math.abs(x);
    var t = 1 / (1 + 0.3275911 * x);
    var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return s * y;
  }
  function Phi(z) { return 0.5 * (1 + erf(z / Math.SQRT2)); }
  function coda(d, k, k0) {
    if (d === 'normale') return 2 * (1 - Phi(k));
    if (d === 'uniforme') return Math.max(0, 1 - k / Math.sqrt(3));
    if (d === 'esponenziale') return Math.exp(-(1 + k));
    return k <= k0 + 1e-9 ? 1 / (k0 * k0) : 0;
  }
  function pc(v) {
    if (v === 0) return '0%';
    var d = v >= 0.1 ? 1 : (v >= 0.001 ? 2 : 4);
    return (v * 100).toFixed(d).replace('.', ',') + '%';
  }
  function el(tag, attrs, txt) {
    var e = document.createElementNS(NS, tag);
    for (var a in attrs) e.setAttribute(a, attrs[a]);
    if (txt != null) e.textContent = txt;
    svg.appendChild(e); return e;
  }
  function render() {
    var d = sd.value, k = +sk.value;
    document.getElementById('s08-ceb-kv').textContent = k.toFixed(2).replace('.', ',');
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var x0 = 55, x1 = 540, y0 = 245, y1 = 20;
    function X(v) { return x0 + (v - 1) / 4 * (x1 - x0); }
    function Y(p) { return y0 - p * (y0 - y1); }
    [0, 0.25, 0.5, 0.75, 1].forEach(function (p) {
      el('line', { x1: x0, y1: Y(p), x2: x1, y2: Y(p), stroke: 'currentColor', 'stroke-opacity': 0.15 });
      el('text', { x: x0 - 8, y: Y(p) + 4, 'text-anchor': 'end', fill: 'currentColor' }, (p * 100) + '%');
    });
    el('line', { x1: x0, y1: y0, x2: x1, y2: y0, stroke: 'currentColor' });
    el('line', { x1: x0, y1: y0, x2: x0, y2: y1, stroke: 'currentColor' });
    [1, 2, 3, 4, 5].forEach(function (v) {
      el('line', { x1: X(v), y1: y0, x2: X(v), y2: y0 + 5, stroke: 'currentColor' });
      el('text', { x: X(v), y: y0 + 19, 'text-anchor': 'middle', fill: 'currentColor' }, String(v));
    });
    el('text', { x: (x0 + x1) / 2, y: y0 + 40, 'text-anchor': 'middle', fill: 'currentColor' }, 'k = distanza dalla media, in deviazioni standard');
    var pb = [], pd = [];
    for (var i = 0; i <= 400; i++) {
      var v = 1 + 4 * i / 400;
      pb.push(X(v).toFixed(1) + ',' + Y(1 / (v * v)).toFixed(1));
      pd.push(X(v).toFixed(1) + ',' + Y(coda(d, v, k)).toFixed(1));
    }
    el('polyline', { points: pb.join(' '), fill: 'none', stroke: '#e07a1f', 'stroke-width': 3 });
    el('polyline', { points: pd.join(' '), fill: 'none', stroke: '#4051b5', 'stroke-width': 2.5 });
    el('line', { x1: X(k), y1: y0, x2: X(k), y2: y1, stroke: '#2e9e5b', 'stroke-dasharray': '5,4', 'stroke-width': 2 });
    var b = 1 / (k * k), c = coda(d, k, k);
    el('circle', { cx: X(k), cy: Y(b), r: 5, fill: '#e07a1f' });
    el('circle', { cx: X(k), cy: Y(c), r: 5, fill: '#4051b5' });
    el('text', { x: x1, y: y1 + 14, 'text-anchor': 'end', fill: '#e07a1f', 'font-weight': 'bold' }, 'limite di Čebyšëv: 1/k²');
    el('text', { x: x1, y: y1 + 32, 'text-anchor': 'end', fill: '#4051b5', 'font-weight': 'bold' }, 'probabilità vera di stare fuori da μ ± kσ');
    var txt = 'Fuori dall’intervallo μ ± kσ con k = ' + k.toFixed(2).replace('.', ',') +
      ': Čebyšëv garantisce <b class="s08-lim">al più ' + pc(b) + '</b> per qualunque distribuzione; ' +
      'per la distribuzione scelta la probabilità vera è <b class="s08-vera">' + pc(c) + '</b>. ' +
      'Dentro l’intervallo cade quindi almeno ' + pc(1 - b) + ' della probabilità.';
    if (d === 'tre') txt += '<br>La distribuzione a tre punti per questo k vale μ con probabilità ' + pc(1 - b) +
      ' e μ ± kσ con probabilità ' + pc(b / 2) + ' ciascuno: tocca esattamente il limite.';
    if (d === 'uniforme' && k >= Math.sqrt(3)) txt += '<br>Oltre k = √3 ≈ 1,73 l’intervallo contiene tutta la distribuzione uniforme: fuori non c’è più niente.';
    out.innerHTML = txt;
  }
  sd.addEventListener('change', render);
  sk.addEventListener('input', render);
  render();
});
</script>

Con la distribuzione normale e $k=2$ il widget mostra la differenza che abbiamo visto nella tabella, 25% contro 4,6%. Con la distribuzione uniforme la curva blu si azzera a $k=\sqrt3\approx1{,}73$, perché oltre quella distanza non ci sono più valori. Con la distribuzione a tre punti, infine, il punto blu sta sempre sulla curva arancione: per ogni $k$ esiste una distribuzione che rende la disuguaglianza un’uguaglianza.

### L’esercizio delle ante {: #ante }

Il primo esercizio su Čebyšëv viene da una fabbrica di mobili. Le ante di legno di un lotto hanno una lunghezza media di 205 cm e una varianza di 8 cm². Un’anta è considerata difettosa se è più corta di 197 cm o più lunga di 213 cm, e il lotto viene rifiutato se contiene più del 15% di ante difettose. Sulla base delle informazioni a disposizione, il lotto sarà rifiutato?

Cominciamo scrivendo i dati: $\mu=205$ cm e $\sigma^2=8$ cm², quindi $\sigma=\sqrt8\approx2{,}83$ cm. Non conosciamo la forma della distribuzione delle lunghezze, quindi l’unico strumento è Čebyšëv.

Il secondo passo è controllare che l’intervallo delle ante buone sia simmetrico rispetto alla media. Lo è: $205-197=8$ e $213-205=8$. Un’anta è difettosa quando la sua lunghezza si allontana dalla media di più di 8 cm, cioè quando $|X-205|>8$. Questo è il motivo per cui conviene controllare la simmetria: la disuguaglianza di Čebyšëv parla di distanze dalla media, e un intervallo simmetrico si traduce in una sola distanza.

Il terzo passo è applicare la disuguaglianza nella forma con la distanza, con $a=8$ cm:

$$
P\big(|X-205|>8\big)\le P\big(|X-205|\ge8\big)\le\frac{\sigma^2}{a^2}=\frac{8}{64}=0{,}125.
$$

La prima disuguaglianza dice soltanto che l’evento «più di 8» è contenuto nell’evento «almeno 8», e quindi ha una probabilità non più grande. Conviene usare la forma con la distanza perché i numeri sono esatti: la forma con $k$ darebbe lo stesso risultato, con $k=8/\sqrt8=\sqrt8\approx2{,}83$ e $1/k^2=1/8$, ma passando per un arrotondamento.

La conclusione: ogni anta è difettosa con probabilità al più del 12,5%, qualunque sia la distribuzione delle lunghezze. Equivalentemente, ogni anta è buona con probabilità almeno dell’87,5%. Poiché 12,5% è sotto la soglia del 15%, in media un lotto contiene meno del 15% di ante difettose, e possiamo aspettarci che i lotti non vengano rifiutati.

C’è un salto nascosto in quest’ultima frase, che conviene mettere in evidenza. Abbiamo calcolato una probabilità per **una** anta, e ne abbiamo tratto una conclusione sulla **percentuale** di ante difettose in un lotto di molte ante. Che la percentuale attesa sia la probabilità del singolo pezzo lo dice la linearità: se $D_i$ è l’indicatrice dell’anta $i$ difettosa, la frazione di difettose in un lotto di $n$ ante è $(D_1+\cdots+D_n)/n$, e la sua media è la media delle $\mathbb{E}[D_i]=P(\text{difettosa})$. Ma che in un lotto concreto la percentuale sia vicina alla sua media, e non per esempio del 20% per sfortuna, è un’altra affermazione: è la legge dei grandi numeri della seconda lezione. Torneremo sulle ante negli esercizi della seconda parte.

Gli intervalli non sono sempre simmetrici. Se ci interessa una sola coda, per esempio la probabilità che un’anta sia più lunga di 213 cm, possiamo comunque usare Čebyšëv: l’evento $X\ge\mu+a$ è contenuto nell’evento $|X-\mu|\ge a$, quindi

$$
P(X\ge\mu+a)\le P\big(|X-\mu|\ge a\big)\le\frac{\sigma^2}{a^2}.
$$

Il limite per una coda sola è lo stesso di quello per le due code insieme: è ancora più prudente, ma è valido. Se invece l’intervallo è asimmetrico, per esempio da 199 a 215 cm, si usa la distanza **più piccola** dalla media, qui 6 cm, perché l’intervallo simmetrico $[199,\;211]$ è contenuto in quello dato: $P(199<X<215)\ge P(|X-205|<6)\ge1-8/36\approx0{,}78$.

!!! example "Sosta di verifica"
    Torniamo al cruscotto dell’inizio: il tempo di risposta di un servizio ha media 120 ms e deviazione standard 30 ms. (a) Con la disuguaglianza di Markov, che cosa si può dire della probabilità che una richiesta superi i 270 ms? (b) E con quella di Čebyšëv? (c) Il contratto chiede che al più l’1% delle richieste superi i 500 ms: possiamo garantirlo?

    ??? esempio-svolto "Risposta"
        (a) Il tempo non è mai negativo, e Markov dà $P(T\ge270)\le120/270\approx0{,}44$. (b) La soglia 270 è a distanza $a=150$ ms dalla media, cioè cinque deviazioni standard. Con la coda sola: $P(T\ge270)\le P(|T-120|\ge150)\le30^2/150^2=900/22\,500=0{,}04$. Usando anche la varianza, il limite scende dal 44% al 4%. (c) La distanza è $a=500-120=380$ ms, e $P(T\ge500)\le900/380^2=900/144\,400\approx0{,}0062$, cioè lo 0,62%: meno dell’1%. Possiamo garantirlo, per qualunque forma della distribuzione dei tempi, purché media e deviazione standard siano davvero quelle.

### Laboratorio: Čebyšëv alla prova {: #lab-cebysev }

Il primo script mette alla prova i due limiti con una simulazione. Genera duecentomila valori da quattro distribuzioni diverse, tutte con media 0 e deviazione standard 1: la normale, l’uniforme, l’esponenziale spostata in modo da avere media 0, e la distribuzione a tre punti costruita per $k=2$. Per ciascuna conta la frazione di valori ad almeno $k$ deviazioni standard dalla media e la confronta con $1/k^2$. In fondo controlla la disuguaglianza di Markov su un tempo di risposta esponenziale con media 200 ms, il caso che abbiamo discusso nell’Atto III.

<div class="psi-exec" markdown="1">
```python
import numpy as np

# Quattro distribuzioni diverse, tutte con media 0 e deviazione
# standard 1: così la distanza k·σ dalla media vale proprio k.
rng = np.random.default_rng(8)
n = 200_000
campioni = {
    "normale": rng.normal(0, 1, n),
    "uniforme": rng.uniform(-np.sqrt(3), np.sqrt(3), n),
    "esponenziale": rng.exponential(1, n) - 1,
    # La distribuzione a tre punti costruita per k = 2: vale -2 e 2
    # con probabilità 1/8 ciascuno e 0 con probabilità 3/4.
    "tre punti": rng.choice([-2.0, 0.0, 2.0], size=n,
                            p=[1 / 8, 3 / 4, 1 / 8]),
}

for nome, x in campioni.items():
    print(f"{nome:12s}  media {x.mean():+.3f}   dev. std {x.std():.3f}")

# Per ogni k confrontiamo la frazione vera dei valori con
# |X - μ| >= k·σ e il limite 1/k² di Čebyšëv.
print("\nFrazione dei valori con |X - μ| >= kσ")
print("   k  Čebyšëv", "".join(f"{nome:>13s}" for nome in campioni))
for k in [1.5, 2, 3]:
    riga = f"{k:4.1f}  {1 / k**2:7.3f}"
    for x in campioni.values():
        riga += f"{np.mean(np.abs(x) >= k):13.3f}"
    print(riga)

# Markov per un tempo di risposta esponenziale con media 200 ms.
t = rng.exponential(200, n)
print("\nTempo di risposta con media 200 ms")
for a in [400, 1000, 2000]:
    print(f"P(T >= {a:4d} ms): simulata {np.mean(t >= a):.4f}"
          f"   Markov <= {200 / a:.3f}")
```
</div>

Nell’output le frazioni simulate della normale, dell’uniforme e dell’esponenziale sono vicine ai valori della tabella, e tutte sotto il limite. La distribuzione a tre punti è l’unica che lo raggiunge: con $k=2$ circa il 25% dei valori sta a distanza 2, come previsto. Con $k=1{,}5$ la stessa distribuzione resta al 25%, sotto il limite del 44,4%, perché è stata costruita per $k=2$; con $k=3$ non ha più valori fuori. Le righe di Markov mostrano quanto il limite sia prudente quando la distribuzione è esponenziale: 0,2 contro circa 0,0065. Prova a cambiare `k = 2` nella costruzione della distribuzione a tre punti, per esempio con valori $\pm3$ e probabilità $1/18$, $8/9$, $1/18$: sarà la riga $k=3$ a toccare il limite.

### Garanzie per i sistemi informatici {: #garanzie-informatica }

Le due disuguaglianze sono strumenti tipici dell’ingegnere del software, perché trasformano due numeri facili da misurare, la media e la varianza, in garanzie che non dipendono da ipotesi sulla forma della distribuzione. Nei sistemi in tempo reale, dove un ritardo oltre una certa soglia è un guasto, si preferisce spesso una garanzia prudente ma certa a una stima precisa che vale soltanto se i tempi sono, per esempio, normali. Nel dimensionamento delle risorse il ragionamento è lo stesso: se il numero di richieste in coda ha media $\mu$ e deviazione standard $\sigma$, un buffer di $\mu+10\sigma$ posti trabocca con probabilità al più $1/10^2=1\%$, qualunque sia la distribuzione delle richieste.

Nell’analisi degli algoritmi randomizzati le due disuguaglianze sono il primo passo per passare dal caso medio a una garanzia: un algoritmo con tempo medio basso, per Markov, raramente ci mette molto di più; se in più la varianza è piccola, per Čebyšëv raramente si allontana dalla media in entrambe le direzioni. E quando servono garanzie ancora più strette, esistono disuguaglianze più potenti, che usano più informazione sulla variabile, ma partono tutte dalla stessa idea: applicare Markov alla funzione giusta della variabile, come Čebyšëv fece con il quadrato della distanza.

Nella seconda lezione useremo la disuguaglianza di Čebyšëv per uno scopo più ambizioso: dimostrare che la media di molte osservazioni si avvicina al valore atteso. Prima però dobbiamo imparare a calcolare la varianza di una somma.

## Atti V–VII — La legge dei grandi numeri {: #bernoulli }

*Seconda parte in arrivo…* Questa parte della dispensa sarà pubblicata con la Lezione 2. Torneremo indietro di un secolo e mezzo, a Basilea, dove Jacob Bernoulli si chiese se, estraendo molte volte un sassolino da un’urna, la frazione di sassolini bianchi osservata si avvicini a quella vera. Impareremo a calcolare la varianza di una somma di variabili indipendenti e quella della media campionaria, e con la disuguaglianza di Čebyšëv dimostreremo la legge dei grandi numeri.

## Lettura A — Markov, Nekrasov e la prima catena {: #catene .psi-facoltativo }

*In arrivo…*

## Esercizi: prima prova, poi apri la soluzione {: #esercizi }

Per ogni esercizio comincia scrivendo, in una frase, che cosa conosci della variabile: soltanto la media, la media e la varianza, oppure tutta la distribuzione. Da questo dipende lo strumento da usare. Poi scrivi l’evento come distanza dalla media, se puoi, e fai il conto. I risultati numerici servono a controllare il procedimento; all’esame conta il ragionamento.

### Esercizio 1 — Entro due deviazioni standard {: #esercizio-1 }

Rifai l’esercizio dell’Atto II con due deviazioni standard. Calcola $P(\mu-2\sigma\le X\le\mu+2\sigma)$ (a) per una variabile normale, (b) per una variabile uniforme, (c) per una variabile esponenziale. (d) Che cosa garantisce la disuguaglianza di Čebyšëv per una variabile qualsiasi?

??? esempio-svolto "Soluzione ragionata"
    (a) Standardizzando, $2\,\Phi(2)-1=2\cdot0{,}9772-1=0{,}9544$. (b) Per l’uniforme $2\sigma\approx0{,}58\,(\beta-\alpha)$ supera la metà della lunghezza dell’intervallo, quindi $[\mu-2\sigma,\;\mu+2\sigma]$ contiene tutto $[\alpha,\beta]$ e la probabilità è 1. (c) Con media e deviazione standard $1/\lambda$, l’intervallo va da $-1/\lambda$, che è sotto zero, a $3/\lambda$: la probabilità è $P(X\le3/\lambda)=1-e^{-3}\approx0{,}950$. (d) Almeno $1-1/2^2=0{,}75$. Le tre distribuzioni stanno tutte sopra il 75%, ciascuna con il suo valore.

### Esercizio 2 — Le ante, con altri numeri {: #esercizio-2 }

Riprendi l’[esercizio delle ante](#ante): media 205 cm, ante difettose se più corte di 197 cm o più lunghe di 213 cm, lotto rifiutato oltre il 15% di difettose. (a) Che cosa si può garantire se la varianza è di 16 cm² invece di 8? (b) Qual è la varianza più grande che permette ancora di garantire, con Čebyšëv, una probabilità di difetto al più del 15%? (c) Con la varianza di 8 cm², che cosa si può dire della probabilità che un’anta sia più lunga di 213 cm?

??? esempio-svolto "Soluzione ragionata"
    (a) $P(|X-205|\ge8)\le16/64=0{,}25$: il limite supera il 15%, e Čebyšëv non permette più di garantire nulla. Attenzione: non vuol dire che il lotto sarà rifiutato, ma soltanto che con queste informazioni non possiamo escluderlo. (b) Serve $\sigma^2/64\le0{,}15$, cioè $\sigma^2\le9{,}6$ cm². (c) È una coda sola, e vale lo stesso limite delle due code: $P(X>213)\le P(|X-205|\ge8)\le0{,}125$. Se la distribuzione fosse simmetrica attorno alla media, le due code avrebbero la stessa probabilità e si potrebbe dire $P(X>213)\le0{,}0625$, ma senza questa informazione no.

### Esercizio 3 — Una variabile non meglio specificata {: #esercizio-3 }

Una variabile aleatoria $X$ ha media $\mu=6$ e deviazione standard $\sigma=\sqrt2$. (a) Trova una stima della probabilità che $X$ assuma valori compresi tra 4,5 e 7,5. (b) Trova un intervallo centrato in 6 che contiene $X$ con probabilità almeno del 90%.

??? esempio-svolto "Soluzione ragionata"
    (a) L’intervallo è simmetrico attorno a 6, con distanza $a=1{,}5$. Con la forma complementare, $P(|X-6|<1{,}5)\ge1-\sigma^2/a^2=1-2/2{,}25=1-0{,}889\approx0{,}111$. La probabilità è almeno dell’11%: una garanzia debole, perché 1,5 è appena $1{,}5/\sqrt2\approx1{,}06$ deviazioni standard. (b) Serve una distanza $a$ con $\sigma^2/a^2\le0{,}1$, cioè $a^2\ge2/0{,}1=20$ e $a\ge\sqrt{20}\approx4{,}47$. L’intervallo $(6-4{,}47;\;6+4{,}47)=(1{,}53;\;10{,}47)$ contiene $X$ con probabilità almeno del 90%.

### Esercizio 4 — Il backup notturno {: #esercizio-4 }

Il backup notturno di un’azienda dura in media 30 minuti, con una deviazione standard di 4 minuti; la distribuzione della durata non è nota. Il backup deve finire entro 50 minuti, prima che ripartano i servizi del mattino. (a) Che cosa dice la disuguaglianza di Markov sulla probabilità di sforare? (b) E quella di Čebyšëv? (c) Che cosa diventa il limite di Čebyšëv se la deviazione standard raddoppia?

??? esempio-svolto "Soluzione ragionata"
    (a) La durata non è mai negativa: $P(T\ge50)\le30/50=0{,}6$, una garanzia molto debole. (b) La soglia è a distanza $a=20$ minuti dalla media, cinque deviazioni standard: $P(T\ge50)\le P(|T-30|\ge20)\le16/400=0{,}04$. Al più quattro notti su cento. (c) Con $\sigma=8$, $64/400=0{,}16$: raddoppiare la deviazione standard quadruplica il limite, perché la varianza è il quadrato della deviazione standard. La varianza misura il rischio di valori lontani dalla media.

### Esercizio 5 — Markov e i valori negativi {: #esercizio-5 }

La temperatura minima di gennaio in una città ha media 2 °C. Un collega ne deduce, con la disuguaglianza di Markov, che la probabilità di una minima di almeno 10 °C è al più $2/10=0{,}2$. (a) Che cosa c’è di sbagliato? (b) Costruisci una variabile con media 2 per cui $P(X\ge10)=1/2$. (c) Se si sa che la minima non scende mai sotto −20 °C, come si può usare correttamente Markov?

??? esempio-svolto "Soluzione ragionata"
    (a) La temperatura in gradi Celsius può essere negativa, e la disuguaglianza di Markov vale soltanto per variabili che non lo sono mai. (b) Per esempio $X=-6$ o $X=10$ con probabilità 1/2 ciascuno: la media è $(-6+10)/2=2$ e $P(X\ge10)=1/2$, più del 20% «garantito» dal collega. (c) La variabile $Y=X+20$ non è mai negativa e ha media 22. L’evento $X\ge10$ è l’evento $Y\ge30$, quindi $P(X\ge10)=P(Y\ge30)\le22/30\approx0{,}73$. È un limite corretto, anche se molto debole: senza la varianza non si può fare di meglio.

## Errori da evitare {: #errori }

Il primo gruppo di errori riguarda le ipotesi delle disuguaglianze. La disuguaglianza di Markov vale soltanto per variabili che non sono mai negative: temperature, differenze, profitti e perdite possono esserlo, e allora bisogna prima spostare la variabile, come nell’esercizio 5, o usare Čebyšëv. La soglia di Markov deve superare la media, altrimenti il limite supera 1 e non dice nulla; allo stesso modo Čebyšëv con $k\le1$ non dice nulla. Čebyšëv invece non richiede che la variabile sia non negativa, ma richiede di conoscere la varianza: con la sola media si può usare soltanto Markov.

Il secondo gruppo riguarda i conti. Nella forma con la distanza il limite è $\sigma^2/a^2$, con la **varianza** al numeratore; nella forma con $k$, il numero $k$ è la distanza divisa per la **deviazione standard**, $k=a/\sigma$, non per la varianza. Con i dati delle ante, $\sigma^2=8$ e $a=8$: chi divide 8 per la varianza trova $k=1$ e conclude che non si può dire nulla, mentre il limite giusto è $8/64=0{,}125$. Prima di applicare Čebyšëv a un intervallo bisogna controllare che sia simmetrico attorno alla media; se non lo è, si usa la distanza più piccola. E il limite di Čebyšëv per una coda sola è lo stesso di quello per due code: non va diviso per due, a meno di sapere che la distribuzione è simmetrica.

Il terzo gruppo riguarda la lettura dei risultati. Un limite non è una previsione: $P(X\ge a)\le0{,}2$ dice che la probabilità non supera il 20%, non che vale il 20%, e per molte distribuzioni è molto più piccola. Viceversa, un limite troppo grande non dimostra che l’evento sia probabile: dice soltanto che con quelle informazioni non si può escludere.

## Riepilogo per lo studio {: #riepilogo }

Quando di una variabile conosciamo soltanto la media, o la media e la varianza, non possiamo calcolare le sue probabilità, che dipendono dalla forma della distribuzione: entro una deviazione standard dalla media cade il 68% di una normale, il 58% di un’uniforme, l’87% di un’esponenziale. Possiamo però limitarle. La **disuguaglianza di Markov** dice che per una variabile mai negativa e una soglia $a>0$ vale $P(X\ge a)\le\mathbb{E}[X]/a$: una variabile non negativa raramente è molto più grande della sua media. Si dimostra osservando che $X\ge a\cdot I$, dove $I$ è l’indicatrice dell’evento $X\ge a$, e prendendo la media. La **disuguaglianza di Čebyšëv** è Markov applicata al quadrato della distanza dalla media: $P(|X-\mu|\ge a)\le\sigma^2/a^2$, cioè $P(|X-\mu|\ge k\sigma)\le1/k^2$ e $P(|X-\mu|<k\sigma)\ge1-1/k^2$. Vale per ogni distribuzione con varianza finita, e per questo è prudente: entro due deviazioni standard garantisce il 75%, dove la normale ne ha il 95%. Non si può migliorare senza altre informazioni, perché una distribuzione a tre punti la raggiunge.

!!! tip "Prova a raccontarlo senza il formulario"
    Spiega a un compagno perché in un gruppo con reddito medio di 1000 euro al più una persona su dieci può guadagnare 10 000 euro, e come lo stesso ragionamento diventa la disuguaglianza di Markov. Poi mostragli come si ottiene Čebyšëv applicando Markov alla variabile giusta, e usalo per decidere se il lotto di ante sarà rifiutato. Se riesci a farlo, le formule di questa prima parte sono diventate strumenti di ragionamento.

## Riferimenti e letture {: #riferimenti }

Le citazioni storiche sono tradotte dal latino; le fonti sono letture facoltative.

- **Michael Baron**, *Probability and Statistics for Computer Scientists*, 2ª ed., CRC Press, 2014, cap. 3, § 3.3.6 (proprietà della varianza, varianza di una somma) e § 3.3.7 (disuguaglianza di Čebyšëv, con l’Esempio 3.12 sugli errori di un software). Da qui viene l’idea dell’esercizio 4, rielaborato. [Scheda dell’editore](https://doi.org/10.1201/b14800).
- **Chris Piech**, *Probability for Computer Scientists*, materiale del corso Stanford CS109: [testo online](https://chrispiech.github.io/probabilityForComputerScientists/en/).
- **Stefania Boffa**, note del corso di probabilità dell’Università dell’Insubria: l’esempio dei cento lanci di un dado e l’enunciato della legge dei grandi numeri.
- **Jacob Bernoulli**, *Ars Conjectandi*, Basilea, Thurneysen, 1713, parte IV, capp. IV–V, pp. 223–239: l’istinto del più stupido (p. 225), l’urna con 3000 sassolini bianchi e 2000 neri (p. 226), i vent’anni (p. 227) e le 25 550 estrazioni (pp. 238–239). [Scansione su Internet Archive](https://archive.org/details/jacobibernoulli00bern).
- **Pafnutij L. Čebyšëv**, «Des valeurs moyennes», *Journal de mathématiques pures et appliquées*, 2ª serie, 12 (1867), pp. 177–184: la disuguaglianza e la legge dei grandi numeri. Biografia su [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Chebyshev/).
- **Irénée-Jules Bienaymé**, biografia su [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Bienayme/): la scoperta della disuguaglianza nel 1853 e il riconoscimento di Čebyšëv.
- **Eugene Seneta**, «A tricentenary history of the Law of Large Numbers», *Bernoulli* 19 (2013), pp. 1088–1121: la storia della legge da Bernoulli a Markov, compresa la disputa con Nekrasov. [Preprint su arXiv](https://arxiv.org/abs/1309.6488).
- **Eugene Seneta**, «Markov and the birth of chain dependence theory», *International Statistical Review* 64 (1996), pp. 255–263: il lavoro di Markov del 1906 e la sua origine.
- **Brian Hayes**, «First links in the Markov chain», *American Scientist* 101 (2013), pp. 92–97: Markov, Nekrasov e le lettere dell’*Onegin*, raccontati per un pubblico ampio.
- Documentazione Python: [`numpy.random.Generator`](https://numpy.org/doc/stable/reference/random/generator.html), con i metodi `integers`, `binomial`, `normal`, `uniform`, `exponential` e `choice` usati nei laboratori.

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

C’è un salto nascosto in quest’ultima frase, che conviene mettere in evidenza. Abbiamo calcolato una probabilità per **una** anta, e ne abbiamo tratto una conclusione sulla **percentuale** di ante difettose in un lotto di molte ante. Che la percentuale attesa sia la probabilità del singolo pezzo lo dice la linearità: se $D_i$ è l’indicatrice dell’anta $i$ difettosa, la frazione di difettose in un lotto di $n$ ante è $(D_1+\cdots+D_n)/n$, e la sua media è la media delle $\mathbb{E}[D_i]=P(\text{difettosa})$. Ma che in un lotto concreto la percentuale sia vicina alla sua media, e non per esempio del 20% per sfortuna, è un’altra affermazione: è la legge dei grandi numeri della seconda lezione. Torneremo sulle ante nell’[esercizio 9](#esercizio-9).

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

## Atto V — L’urna di Jacob Bernoulli {: #bernoulli }

Per la seconda lezione torniamo indietro di un secolo e mezzo rispetto a San Pietroburgo, a Basilea. **Jacob Bernoulli** (1654–1705), professore di matematica all’università della sua città e il primo di una celebre famiglia di matematici, morì lasciando incompiuto un trattato sul calcolo delle probabilità. Il nipote Nicolaus lo pubblicò otto anni dopo, nel 1713, con il titolo *Ars Conjectandi*, «L’arte di congetturare». Nella quarta parte del libro Bernoulli voleva applicare il calcolo, nato per i giochi d’azzardo, alle questioni della vita civile, morale ed economica: la durata della vita, il tempo atmosferico, l’esito di una malattia. In quei casi nessuno può contare i casi possibili come si fa con i dadi. Si possono soltanto osservare molti casi simili e contare quante volte un evento si è verificato.

Bernoulli sapeva che questa idea non era nuova. Scrive che

> «anche il più stupido, per non so quale istinto di natura, da solo e senza alcuna istruzione (cosa davvero mirabile), sa per certo che quante più osservazioni di questo genere si raccolgono, tanto minore è il pericolo di allontanarsi dal bersaglio.»
> — J. Bernoulli, *Ars Conjectandi*, 1713, parte IV, cap. IV, p. 225 (tradotto dal latino)

Ma subito dopo aggiunge che, sebbene tutti lo sappiano per natura, la dimostrazione che lo ricava dai principi del calcolo «non è affatto comune». E pone una domanda più fine. Immaginiamo un’urna, dice, in cui sono nascosti, a nostra insaputa, 3000 sassolini bianchi e 2000 neri. Estraiamo un sassolino alla volta, osserviamo il colore e lo rimettiamo nell’urna prima della prossima estrazione. Aumentando il numero delle estrazioni, la probabilità che la frazione di bianchi osservata stia vicino a quella vera, 3/5, cresce senza limite, fino a superare qualunque grado di certezza? Oppure esiste un grado di certezza che non si riesce mai a superare, per quante osservazioni si facciano? È una domanda che non si risolve con l’istinto. Bernoulli scrive di aver tenuto per sé quel problema per vent’anni prima di decidersi a pubblicarlo (p. 227).

La sua risposta è la prima **legge dei grandi numeri**, che la tradizione chiama «teorema aureo» di Bernoulli: la probabilità che la frazione osservata cada entro un margine fissato attorno alla probabilità vera si avvicina a 1 quanto si vuole, purché le estrazioni siano abbastanza. Bernoulli fece anche il conto per la sua urna. Con 25 550 estrazioni, la frazione di bianchi cade tra 29/50 e 31/50, cioè entro 1/50 da 3/5, con una probabilità più di mille volte maggiore di quella di cadere fuori (pp. 238–239). Bernoulli chiamava **certezza morale** una probabilità così vicina a 1 da poter essere trattata, nella vita pratica, come una certezza.

Notiamo bene che cosa Bernoulli **non** dice. Non dice che, prima o poi, la frazione di bianchi sarà uguale a 3/5, né che lo resterà. Dice che diventa sempre più improbabile trovarla lontana da 3/5. La differenza è sottile, ed è il cuore di questa lezione: la studieremo con cura nell’Atto VII.

La dimostrazione di Bernoulli era lunga e faticosa, perché all’epoca mancavano gli strumenti per trattare la somma di molte variabili aleatorie. Centocinquant’anni dopo, con la disuguaglianza di Čebyšëv, lo stesso risultato si ottiene in due righe. Per arrivarci servono due ingredienti: saper calcolare la varianza di una somma di variabili indipendenti, e saper calcolare la varianza di una media. È il tema del prossimo atto.

## Atto VI — Sommare variabili indipendenti {: #somme }

Sappiamo già come si comporta la media di una somma: $\mathbb{E}[X+Y]=\mathbb{E}[X]+\mathbb{E}[Y]$, sempre, anche per variabili dipendenti. La domanda nuova è che cosa succede alla **varianza**. Partiamo da un esempio con numeri piccoli: due dadi.

### La varianza di una somma {: #varianza-somma }

Sia $X$ il risultato di un dado equilibrato. La sua media è 3,5, e la sua varianza si calcola con la definizione, pesando con 1/6 i sei scarti al quadrato:

$$
\operatorname{Var}(X)=\frac16\Big[(-2{,}5)^2+(-1{,}5)^2+(-0{,}5)^2+0{,}5^2+1{,}5^2+2{,}5^2\Big]=\frac{17{,}5}{6}=\frac{35}{12}\approx2{,}92.
$$

Lanciamo ora un secondo dado, indipendente dal primo, e chiamiamo $Y$ il suo risultato. La somma $X+Y$ ha media $3{,}5+3{,}5=7$, e la sua distribuzione la conosciamo dalla Settimana 7: le 36 coppie sono equiprobabili, il 7 si ottiene in sei modi, il 6 e l’8 in cinque, e così via fino al 2 e al 12, che si ottengono in un modo solo. Calcoliamo la varianza con la definizione. Lo scarto dalla media è $s-7$; i valori 2 e 12 hanno scarto $\pm5$ e probabilità $1/36$ ciascuno, i valori 3 e 11 scarto $\pm4$ e probabilità $2/36$, e così via fino al 7, che ha scarto zero. Quindi

$$
\operatorname{Var}(X+Y)=\frac{2\big(1\cdot25+2\cdot16+3\cdot9+4\cdot4+5\cdot1\big)}{36}=\frac{2\cdot105}{36}=\frac{35}{6}\approx5{,}83.
$$

È esattamente il doppio della varianza di un dado: $35/6=35/12+35/12$. La varianza della somma è la somma delle varianze.

Confrontiamo con un’altra variabile che ha la stessa media 7: il risultato di **un solo** dado contato due volte, cioè $X+X=2X$. Per la regola dei cambi di scala, $\operatorname{Var}(2X)=2^2\operatorname{Var}(X)=4\cdot35/12=35/3\approx11{,}67$, il **doppio** della varianza di $X+Y$. La figura mostra le due distribuzioni.

<figure markdown="0">
<svg viewBox="0 0 580 270" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Tre distribuzioni con media 7. A sinistra la somma di due dadi indipendenti, a forma di triangolo, con varianza 5,83. A destra il doppio di un solo dado, che vale 2, 4, 6, 8, 10 o 12 con probabilità un sesto, con varianza 11,67: il doppio.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">Stessa media 7, dispersione diversa</text>
<line x1="25.0" y1="200.0" x2="275.0" y2="200.0" stroke="currentColor" stroke-width="1"/>
<rect x="28.4" y="179.2" width="16" height="20.8" fill="#4051b5"/>
<rect x="51.1" y="158.3" width="16" height="41.7" fill="#4051b5"/>
<rect x="73.8" y="137.5" width="16" height="62.5" fill="#4051b5"/>
<rect x="96.5" y="116.7" width="16" height="83.3" fill="#4051b5"/>
<rect x="119.3" y="95.8" width="16" height="104.2" fill="#4051b5"/>
<rect x="142.0" y="75.0" width="16" height="125.0" fill="#4051b5"/>
<rect x="164.7" y="95.8" width="16" height="104.2" fill="#4051b5"/>
<rect x="187.5" y="116.7" width="16" height="83.3" fill="#4051b5"/>
<rect x="210.2" y="137.5" width="16" height="62.5" fill="#4051b5"/>
<rect x="232.9" y="158.3" width="16" height="41.7" fill="#4051b5"/>
<rect x="255.6" y="179.2" width="16" height="20.8" fill="#4051b5"/>
<text x="36.4" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">2</text>
<text x="59.1" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">3</text>
<text x="81.8" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">4</text>
<text x="104.5" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">5</text>
<text x="127.3" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">6</text>
<text x="150.0" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">7</text>
<text x="172.7" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">8</text>
<text x="195.5" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">9</text>
<text x="218.2" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">10</text>
<text x="240.9" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">11</text>
<text x="263.6" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">12</text>
<line x1="150.0" y1="50.0" x2="150.0" y2="200.0" stroke="currentColor" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
<text x="150.0" y="36.0" text-anchor="middle" fill="currentColor" font-weight="bold">X + Y: due dadi indipendenti</text>
<text x="150.0" y="240.0" text-anchor="middle" fill="#4051b5" font-weight="bold" font-size="15">varianza 5,83</text>
<line x1="310.0" y1="200.0" x2="560.0" y2="200.0" stroke="currentColor" stroke-width="1"/>
<rect x="313.4" y="75.0" width="16" height="125.0" fill="#e07a1f"/>
<rect x="358.8" y="75.0" width="16" height="125.0" fill="#e07a1f"/>
<rect x="404.3" y="75.0" width="16" height="125.0" fill="#e07a1f"/>
<rect x="449.7" y="75.0" width="16" height="125.0" fill="#e07a1f"/>
<rect x="495.2" y="75.0" width="16" height="125.0" fill="#e07a1f"/>
<rect x="540.6" y="75.0" width="16" height="125.0" fill="#e07a1f"/>
<text x="321.4" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">2</text>
<text x="344.1" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">3</text>
<text x="366.8" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">4</text>
<text x="389.5" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">5</text>
<text x="412.3" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">6</text>
<text x="435.0" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">7</text>
<text x="457.7" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">8</text>
<text x="480.5" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">9</text>
<text x="503.2" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">10</text>
<text x="525.9" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">11</text>
<text x="548.6" y="216.0" text-anchor="middle" fill="currentColor" font-size="11">12</text>
<line x1="435.0" y1="50.0" x2="435.0" y2="200.0" stroke="currentColor" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
<text x="435.0" y="36.0" text-anchor="middle" fill="currentColor" font-weight="bold">X + X = 2X: lo stesso dado due volte</text>
<text x="435.0" y="240.0" text-anchor="middle" fill="#e07a1f" font-weight="bold" font-size="15">varianza 11,67</text>
</svg>
<figcaption>Un dado ha varianza 35/12 ≈ 2,92. A sinistra la somma di due dadi indipendenti: valori da 2 a 12, con il 7 più probabile; la varianza è 2,92 + 2,92 = 5,83. A destra il risultato di un solo dado contato due volte, cioè 2X: valori pari, tutti con probabilità 1/6; la varianza è 2² · 2,92 = 11,67. Con due dadi indipendenti gli scarti in parte si compensano; con lo stesso dado non si compensano mai.</figcaption>
</figure>

La differenza ha una spiegazione intuitiva. Con due dadi indipendenti, quando il primo dà un valore alto il secondo dà spesso un valore normale o basso: gli scarti dei due dadi si compensano in parte, e i valori estremi 2 e 12 richiedono che entrambi i dadi siano estremi nello stesso verso, cosa che succede una volta su 36. Con $2X$, invece, ogni scarto viene raddoppiato senza nessuna compensazione: 2 e 12 escono una volta su sei. L’indipendenza è dunque essenziale.

!!! abstract "Varianza della somma di variabili indipendenti"
    Se $X$ e $Y$ sono indipendenti, allora

    $$
    \operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y).
    $$

    Per variabili dipendenti la formula in generale non vale: per esempio $\operatorname{Var}(X+X)=4\operatorname{Var}(X)$, non $2\operatorname{Var}(X)$.

Una conseguenza sorprende quasi tutti la prima volta. Anche la **differenza** di due variabili indipendenti ha come varianza la **somma** delle varianze. Infatti $X-Y=X+(-1)\cdot Y$, la variabile $-Y$ è indipendente da $X$, e $\operatorname{Var}(-Y)=(-1)^2\operatorname{Var}(Y)=\operatorname{Var}(Y)$. Quindi $\operatorname{Var}(X-Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)$. La differenza dei risultati di due dadi ha media zero, ma varianza $35/6$, come la somma: sottrarre due incertezze indipendenti non le cancella, le accumula.

??? note "Approfondimento facoltativo — La formula generale, con la covarianza"
    Perché per variabili indipendenti le varianze si sommano, e che cosa succede quando non sono indipendenti? Scriviamo $\mu_X$ e $\mu_Y$ per le due medie. La media di $X+Y$ è $\mu_X+\mu_Y$, quindi lo scarto della somma dalla sua media è la somma dei due scarti, $(X-\mu_X)+(Y-\mu_Y)$. Eleviamo al quadrato con la regola $(u+v)^2=u^2+v^2+2uv$ e prendiamo la media, che per la linearità si spezza nei tre termini:

    $$
    \begin{aligned}
    \operatorname{Var}(X+Y)&=\mathbb{E}\Big[\big((X-\mu_X)+(Y-\mu_Y)\big)^2\Big]\\
    &=\mathbb{E}\big[(X-\mu_X)^2\big]+\mathbb{E}\big[(Y-\mu_Y)^2\big]+2\,\mathbb{E}\big[(X-\mu_X)(Y-\mu_Y)\big]\\
    &=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y).
    \end{aligned}
    $$

    Il terzo termine è la [covarianza della Settimana 7](../settimana_07/index.md#covarianza). Se le variabili sono indipendenti la covarianza è zero, perché $\mathbb{E}[XY]=\mu_X\mu_Y$, e resta la somma delle varianze. La stessa conclusione vale anche per variabili soltanto incorrelate. Se la covarianza è positiva, le due variabili tendono a stare dalla stessa parte delle loro medie e gli scarti si sommano invece di compensarsi: la varianza della somma è più grande della somma delle varianze. Il caso estremo è $X+X$: $\operatorname{Cov}(X,X)=\operatorname{Var}(X)$, e la formula dà $\operatorname{Var}(X)+\operatorname{Var}(X)+2\operatorname{Var}(X)=4\operatorname{Var}(X)$, come abbiamo trovato. Per i due moduli della Settimana 7, con $\operatorname{Var}(X)=0{,}25$, $\operatorname{Var}(Y)=1{,}1475$ e $\operatorname{Cov}(X,Y)=0{,}075$, la formula dà $\operatorname{Var}(X+Y)=0{,}25+1{,}1475+0{,}15=1{,}5475$, lo stesso valore che si ottiene dalla distribuzione di $X+Y$.

### Molte variabili indipendenti e identicamente distribuite {: #iid }

La legge dei grandi numeri riguarda molte osservazioni ripetute: molti lanci dello stesso dado, molte estrazioni dalla stessa urna, molte misure dello stesso tempo di risposta. Per descriverle ci servono $n$ variabili aleatorie $X_1,X_2,\dots,X_n$, una per osservazione, con due proprietà.

La prima è l’**indipendenza**, che estende a $n$ variabili la definizione della Settimana 7: per ogni scelta di valori $x_1,\dots,x_n$, la probabilità che le variabili assumano insieme quei valori è il prodotto delle probabilità dei singoli valori,

$$
P(X_1=x_1,\;X_2=x_2,\;\dots,\;X_n=x_n)=P(X_1=x_1)\,P(X_2=x_2)\cdots P(X_n=x_n).
$$

A parole: sapere che cosa è uscito in alcune osservazioni non cambia le probabilità delle altre. La seconda proprietà è che le variabili siano **identicamente distribuite**: hanno tutte la stessa distribuzione, e quindi la stessa media $\mu$ e la stessa varianza $\sigma^2$. Variabili con entrambe le proprietà si dicono **indipendenti e identicamente distribuite**, in breve **i.i.d.** I lanci ripetuti di un dado sono l’esempio tipico. I tempi di risposta di molte richieste a un server sono i.i.d. soltanto come modello, e il modello vale se le condizioni restano le stesse e le richieste non si influenzano: lo ricorderemo quando parleremo di applicazioni.

Per variabili indipendenti la regola della varianza si estende a più di due addendi, un addendo alla volta. La somma $X_1+X_2$ è indipendente da $X_3$, perché dipende soltanto dalle prime due variabili; quindi $\operatorname{Var}(X_1+X_2+X_3)=\operatorname{Var}(X_1+X_2)+\operatorname{Var}(X_3)$, e così via. Per la **somma** delle $n$ variabili i.i.d., che indichiamo con

$$
S_n=X_1+X_2+\cdots+X_n,
$$

otteniamo, dalla linearità del valore atteso e dalla regola della varianza,

$$
\mathbb{E}[S_n]=n\mu,\qquad\operatorname{Var}(S_n)=n\sigma^2,\qquad\sigma_{S_n}=\sigma\sqrt n.
$$

La somma di cento dadi, per esempio, ha media 350, varianza $100\cdot35/12\approx291{,}7$ e deviazione standard circa 17,1. La deviazione standard della somma cresce con $n$, anche se più lentamente di $n$: sommando molte variabili, l’incertezza sul totale **aumenta**. Lo si vede bene in una passeggiata aleatoria, in cui la somma dei passi si allontana sempre di più dal punto di partenza.

### La media campionaria {: #media-campionaria }

Se invece della somma prendiamo la media, le cose cambiano completamente. La **media campionaria** delle $n$ osservazioni è

$$
\bar X_n=\frac{X_1+X_2+\cdots+X_n}{n}=\frac{S_n}{n}.
$$

Attenzione: $\bar X_n$ è una **variabile aleatoria**. Prima di lanciare i dadi non sappiamo quanto varrà la media dei risultati; ogni nuova serie di lanci ne dà un valore diverso. Ha quindi una media e una varianza, che calcoliamo dalla somma. Per la linearità, dividere per $n$ divide la media per $n$:

$$
\mathbb{E}[\bar X_n]=\frac1n\,\mathbb{E}[S_n]=\frac1n\cdot n\mu=\mu.
$$

Per la regola dei cambi di scala con $a=1/n$, la varianza si divide per $n^2$:

$$
\operatorname{Var}(\bar X_n)=\frac1{n^2}\operatorname{Var}(S_n)=\frac1{n^2}\cdot n\sigma^2=\frac{\sigma^2}{n},\qquad\sigma_{\bar X_n}=\frac{\sigma}{\sqrt n}.
$$

!!! abstract "Media e varianza della media campionaria"
    Se $X_1,\dots,X_n$ sono i.i.d. con media $\mu$ e varianza $\sigma^2$, la media campionaria $\bar X_n$ ha

    $$
    \mathbb{E}[\bar X_n]=\mu,\qquad\operatorname{Var}(\bar X_n)=\frac{\sigma^2}{n},\qquad\sigma_{\bar X_n}=\frac{\sigma}{\sqrt n}.
    $$

Quindi la varianza della media tende a zero per grandi valori di $n$. La media di $n$ osservazioni ha sempre lo stesso centro, $\mu$, ma è sempre meno dispersa attorno a quel centro. Per i dadi: la media di un dado ha deviazione standard 1,71; quella di 4 dadi 0,85; quella di 16 dadi 0,43; quella di 100 dadi 0,17.

<figure markdown="0">
<svg viewBox="0 0 580 280" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="La distribuzione della media di n dadi per n uguale a 1, 4 e 16, disegnata come densità sullo stesso asse da 1 a 6. Con un dado è piatta; con 4 dadi è più stretta attorno a 3,5; con 16 dadi è ancora più stretta. Le deviazioni standard sono 1,71, 0,85 e 0,43.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">La media di n dadi: sempre centrata in 3,5, sempre più stretta</text>
<line x1="50.0" y1="220.0" x2="540.0" y2="220.0" stroke="currentColor" stroke-width="1"/>
<line x1="90.8" y1="220.0" x2="90.8" y2="225.0" stroke="currentColor" stroke-width="1"/>
<text x="90.8" y="238.0" text-anchor="middle" fill="currentColor">1</text>
<line x1="172.5" y1="220.0" x2="172.5" y2="225.0" stroke="currentColor" stroke-width="1"/>
<text x="172.5" y="238.0" text-anchor="middle" fill="currentColor">2</text>
<line x1="254.2" y1="220.0" x2="254.2" y2="225.0" stroke="currentColor" stroke-width="1"/>
<text x="254.2" y="238.0" text-anchor="middle" fill="currentColor">3</text>
<line x1="335.8" y1="220.0" x2="335.8" y2="225.0" stroke="currentColor" stroke-width="1"/>
<text x="335.8" y="238.0" text-anchor="middle" fill="currentColor">4</text>
<line x1="417.5" y1="220.0" x2="417.5" y2="225.0" stroke="currentColor" stroke-width="1"/>
<text x="417.5" y="238.0" text-anchor="middle" fill="currentColor">5</text>
<line x1="499.2" y1="220.0" x2="499.2" y2="225.0" stroke="currentColor" stroke-width="1"/>
<text x="499.2" y="238.0" text-anchor="middle" fill="currentColor">6</text>
<line x1="295.0" y1="45.0" x2="295.0" y2="220.0" stroke="currentColor" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
<text x="295.0" y="40.0" text-anchor="middle" fill="currentColor">μ = 3,5</text>
<polyline points="50.0,220.0 50.0,191.7 131.7,191.7 131.7,191.7 213.3,191.7 213.3,191.7 295.0,191.7 295.0,191.7 376.7,191.7 376.7,191.7 458.3,191.7 458.3,191.7 540.0,191.7 540.0,220.0" fill="none" stroke="#8a4fbf" stroke-width="2.2"/>
<text x="86.8" y="183.7" text-anchor="start" fill="#8a4fbf" font-weight="bold">n = 1: σ/√n = 1,71</text>
<polyline points="80.6,220.0 80.6,219.5 101.0,219.5 101.0,217.9 121.5,217.9 121.5,214.8 141.9,214.8 141.9,209.5 162.3,209.5 162.3,201.6 182.7,201.6 182.7,190.6 203.1,190.6 203.1,178.0 223.5,178.0 223.5,165.4 244.0,165.4 244.0,154.4 264.4,154.4 264.4,146.5 284.8,146.5 284.8,143.4 305.2,143.4 305.2,146.5 325.6,146.5 325.6,154.4 346.0,154.4 346.0,165.4 366.5,165.4 366.5,178.0 386.9,178.0 386.9,190.6 407.3,190.6 407.3,201.6 427.7,201.6 427.7,209.5 448.1,209.5 448.1,214.8 468.5,214.8 468.5,217.9 489.0,217.9 489.0,219.5 509.4,219.5 509.4,220.0" fill="none" stroke="#e07a1f" stroke-width="2.2"/>
<text x="397.1" y="137.4" text-anchor="start" fill="#e07a1f" font-weight="bold">n = 4: σ/√n = 0,85</text>
<polyline points="88.3,220.0 88.3,220.0 93.4,220.0 93.4,220.0 98.5,220.0 98.5,220.0 103.6,220.0 103.6,220.0 108.7,220.0 108.7,220.0 113.8,220.0 113.8,220.0 118.9,220.0 118.9,220.0 124.0,220.0 124.0,220.0 129.1,220.0 129.1,220.0 134.2,220.0 134.2,220.0 139.3,220.0 139.3,220.0 144.4,220.0 144.4,220.0 149.5,220.0 149.5,220.0 154.6,220.0 154.6,220.0 159.7,220.0 159.7,219.9 164.8,219.9 164.8,219.9 169.9,219.9 169.9,219.8 175.1,219.8 175.1,219.6 180.2,219.6 180.2,219.3 185.3,219.3 185.3,218.8 190.4,218.8 190.4,218.0 195.5,218.0 195.5,216.9 200.6,216.9 200.6,215.2 205.7,215.2 205.7,212.9 210.8,212.9 210.8,209.8 215.9,209.8 215.9,205.6 221.0,205.6 221.0,200.2 226.1,200.2 226.1,193.5 231.2,193.5 231.2,185.3 236.3,185.3 236.3,175.7 241.4,175.7 241.4,164.6 246.5,164.6 246.5,152.3 251.6,152.3 251.6,139.1 256.7,139.1 256.7,125.4 261.8,125.4 261.8,111.6 266.9,111.6 266.9,98.5 272.0,98.5 272.0,86.7 277.1,86.7 277.1,76.7 282.2,76.7 282.2,69.1 287.3,69.1 287.3,64.3 292.4,64.3 292.4,62.7 297.6,62.7 297.6,64.3 302.7,64.3 302.7,69.1 307.8,69.1 307.8,76.7 312.9,76.7 312.9,86.7 318.0,86.7 318.0,98.5 323.1,98.5 323.1,111.6 328.2,111.6 328.2,125.4 333.3,125.4 333.3,139.1 338.4,139.1 338.4,152.3 343.5,152.3 343.5,164.6 348.6,164.6 348.6,175.7 353.7,175.7 353.7,185.3 358.8,185.3 358.8,193.5 363.9,193.5 363.9,200.2 369.0,200.2 369.0,205.6 374.1,205.6 374.1,209.8 379.2,209.8 379.2,212.9 384.3,212.9 384.3,215.2 389.4,215.2 389.4,216.9 394.5,216.9 394.5,218.0 399.6,218.0 399.6,218.8 404.7,218.8 404.7,219.3 409.8,219.3 409.8,219.6 414.9,219.6 414.9,219.8 420.1,219.8 420.1,219.9 425.2,219.9 425.2,219.9 430.3,219.9 430.3,220.0 435.4,220.0 435.4,220.0 440.5,220.0 440.5,220.0 445.6,220.0 445.6,220.0 450.7,220.0 450.7,220.0 455.8,220.0 455.8,220.0 460.9,220.0 460.9,220.0 466.0,220.0 466.0,220.0 471.1,220.0 471.1,220.0 476.2,220.0 476.2,220.0 481.3,220.0 481.3,220.0 486.4,220.0 486.4,220.0 491.5,220.0 491.5,220.0 496.6,220.0 496.6,220.0 501.7,220.0 501.7,220.0" fill="none" stroke="#4051b5" stroke-width="2.2"/>
<text x="356.2" y="56.7" text-anchor="start" fill="#4051b5" font-weight="bold">n = 16: σ/√n = 0,43</text>
</svg>
<figcaption>La distribuzione della media di n dadi, per n = 1 (viola), n = 4 (arancione) e n = 16 (blu), disegnata in modo che le aree siano confrontabili. Il centro resta sempre 3,5; la deviazione standard scende da 1,71 a 0,85 a 0,43: ogni volta che n si moltiplica per 4, la dispersione si dimezza. La forma a campana che compare per n = 16 la spiegheremo nella Settimana 9.</figcaption>
</figure>

La deviazione standard della media scende come $1/\sqrt n$, non come $1/n$. È la **legge della radice quadrata**, e ha conseguenze pratiche immediate: per dimezzare l’incertezza di una media servono quattro volte più osservazioni, e per ridurla di dieci volte, cioè guadagnare una cifra decimale, ne servono cento volte di più. La precisione si compra, ma a un prezzo che cresce in fretta.

!!! example "Sosta di verifica"
    Un sensore misura la temperatura di una sala server con un errore casuale di deviazione standard 2 °C, e misure diverse hanno errori indipendenti. (a) Qual è la deviazione standard della media di 16 misure? (b) Quante misure servono perché la deviazione standard della media sia 0,1 °C?

    ??? esempio-svolto "Risposta"
        (a) $\sigma/\sqrt n=2/\sqrt{16}=2/4=0{,}5$ °C. (b) Serve $2/\sqrt n=0{,}1$, cioè $\sqrt n=20$ e $n=400$ misure. Per passare da 0,5 a 0,1 °C, cioè per un’incertezza cinque volte più piccola, servono $5^2=25$ volte più misure: da 16 a 400.

### Laboratorio: la varianza delle somme {: #lab-somme }

Il secondo script controlla con mezzo milione di lanci simulati le regole di questo atto. Calcola la varianza di un dado, quella della somma e della differenza di due dadi indipendenti, e quella di un dado contato due volte. Poi calcola la media di $m$ dadi, ripetendo l’esperimento ventimila volte, e mostra che la varianza della media moltiplicata per $m$ resta circa uguale a $35/12$, cioè che la varianza della media scende come $1/m$.

<div class="psi-exec" markdown="1">
```python
import numpy as np

rng = np.random.default_rng(2026)
n = 500_000
x = rng.integers(1, 7, n)   # primo dado
y = rng.integers(1, 7, n)   # secondo dado, indipendente dal primo

var_dado = 35 / 12          # varianza di un dado, calcolata nel testo
print(f"Var(X)      simulata {x.var():6.3f}   teoria {var_dado:6.3f}")
for nome, v, teoria in [("X + Y", x + y, 2 * var_dado),
                        ("X - Y", x - y, 2 * var_dado),
                        ("X + X", x + x, 4 * var_dado)]:
    print(f"Var({nome})  simulata {v.var():6.3f}   teoria {teoria:6.3f}")

# La media di m dadi: la varianza scende come 1/m, quindi la
# varianza moltiplicata per m resta circa uguale a 35/12.
print()
for m in [1, 4, 16, 100]:
    medie = rng.integers(1, 7, size=(20_000, m)).mean(axis=1)
    print(f"m = {m:3d}: media {medie.mean():.3f}   "
          f"Var {medie.var():.4f}   Var·m {medie.var() * m:.3f}   "
          f"dev. std {medie.std():.3f}")
```
</div>

Le prime righe confermano i conti del testo: circa 2,92 per un dado, 5,83 per la somma e anche per la differenza, 11,67 per il dado contato due volte. Nelle righe successive la colonna «Var·m» resta vicina a 2,92 mentre $m$ passa da 1 a 100, e la deviazione standard si dimezza ogni volta che $m$ si moltiplica per quattro. Prova a sostituire `x + x` con `x + y` nella riga del dado contato due volte, oppure a usare `y = x.copy()` al posto del secondo dado: che cosa succede alla varianza della differenza?

Abbiamo ora tutti gli ingredienti per la legge dei grandi numeri: la media campionaria ha la media giusta, $\mu$, e una varianza che va a zero. Manca solo di dire in che senso questo significa che la media «si avvicina» a $\mu$.

## Atto VII — La legge dei grandi numeri {: #lgn }

Un esempio, che riprendiamo dalle note di Stefania Boffa, è questo. Lanciamo cento volte un dado e rappresentiamo il risultato del lancio $i$ con la variabile $X_i$. Le cento variabili $X_1,\dots,X_{100}$ hanno la stessa distribuzione e sono indipendenti, e ciascuna ha valore atteso

$$
\mathbb{E}[X_i]=\frac16\cdot1+\frac16\cdot2+\frac16\cdot3+\frac16\cdot4+\frac16\cdot5+\frac16\cdot6=3{,}5.
$$

Il valore 3,5 è il valor medio **teorico**: è calcolato dalla distribuzione, prima di lanciare il dado. Eseguiamo l’esperimento e calcoliamo la media dei risultati: si osserva che è vicina a 3,5. Ripetendo con 200, 300, 500 lanci, la media sperimentale si avvicina sempre di più alla media teorica. La figura mostra una sequenza di mille lanci simulati.

<figure markdown="0">
<svg viewBox="0 0 580 270" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="La media dei risultati di un dado al crescere del numero di lanci, da 1 a 1000. All'inizio oscilla molto tra 2 e 5, poi si avvicina alla linea della media teorica 3,5. Dopo 1000 lanci vale 3,514.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">La media dei lanci di un dado, lancio dopo lancio</text>
<line x1="55.0" y1="225.0" x2="545.0" y2="225.0" stroke="currentColor" stroke-width="1"/>
<line x1="55.0" y1="225.0" x2="55.0" y2="40.0" stroke="currentColor" stroke-width="1"/>
<line x1="50.0" y1="225.0" x2="55.0" y2="225.0" stroke="currentColor" stroke-width="1"/>
<text x="46.0" y="229.0" text-anchor="end" fill="currentColor">1</text>
<line x1="50.0" y1="188.0" x2="55.0" y2="188.0" stroke="currentColor" stroke-width="1"/>
<text x="46.0" y="192.0" text-anchor="end" fill="currentColor">2</text>
<line x1="50.0" y1="151.0" x2="55.0" y2="151.0" stroke="currentColor" stroke-width="1"/>
<text x="46.0" y="155.0" text-anchor="end" fill="currentColor">3</text>
<line x1="50.0" y1="114.0" x2="55.0" y2="114.0" stroke="currentColor" stroke-width="1"/>
<text x="46.0" y="118.0" text-anchor="end" fill="currentColor">4</text>
<line x1="50.0" y1="77.0" x2="55.0" y2="77.0" stroke="currentColor" stroke-width="1"/>
<text x="46.0" y="81.0" text-anchor="end" fill="currentColor">5</text>
<line x1="50.0" y1="40.0" x2="55.0" y2="40.0" stroke="currentColor" stroke-width="1"/>
<text x="46.0" y="44.0" text-anchor="end" fill="currentColor">6</text>
<line x1="55.0" y1="225.0" x2="55.0" y2="230.0" stroke="currentColor" stroke-width="1"/>
<text x="55.0" y="243.0" text-anchor="middle" fill="currentColor">1</text>
<line x1="152.6" y1="225.0" x2="152.6" y2="230.0" stroke="currentColor" stroke-width="1"/>
<text x="152.6" y="243.0" text-anchor="middle" fill="currentColor">200</text>
<line x1="250.7" y1="225.0" x2="250.7" y2="230.0" stroke="currentColor" stroke-width="1"/>
<text x="250.7" y="243.0" text-anchor="middle" fill="currentColor">400</text>
<line x1="348.8" y1="225.0" x2="348.8" y2="230.0" stroke="currentColor" stroke-width="1"/>
<text x="348.8" y="243.0" text-anchor="middle" fill="currentColor">600</text>
<line x1="446.9" y1="225.0" x2="446.9" y2="230.0" stroke="currentColor" stroke-width="1"/>
<text x="446.9" y="243.0" text-anchor="middle" fill="currentColor">800</text>
<line x1="545.0" y1="225.0" x2="545.0" y2="230.0" stroke="currentColor" stroke-width="1"/>
<text x="545.0" y="243.0" text-anchor="middle" fill="currentColor">1000</text>
<text x="300.0" y="263.0" text-anchor="middle" fill="currentColor">numero di lanci n</text>
<line x1="55.0" y1="132.5" x2="545.0" y2="132.5" stroke="#e07a1f" stroke-width="2" stroke-dasharray="6,4"/>
<text x="545.0" y="124.5" text-anchor="end" fill="#e07a1f" font-weight="bold">media teorica 3,5</text>
<polyline points="55.0,40.0 55.5,58.5 56.0,114.0 56.5,104.8 57.0,91.8 57.5,83.2 57.9,77.0 58.4,77.0 58.9,93.4 59.4,88.1 59.9,93.8 60.4,95.5 60.9,94.1 61.4,103.4 61.9,99.2 62.4,100.1 62.8,98.8 63.3,101.7 63.8,102.3 64.3,99.2 64.8,99.9 65.3,100.5 65.8,104.3 66.3,109.4 66.8,114.0 67.3,114.0 67.8,118.1 68.2,116.6 68.7,117.8 69.2,118.9 69.7,116.4 70.2,114.0 70.7,114.0 71.2,112.9 71.7,111.9 72.2,113.0 72.7,111.0 73.1,109.1 73.6,108.3 74.1,111.2 74.6,110.4 75.1,109.6 75.6,111.4 76.1,110.6 76.6,110.7 77.1,113.2 77.6,115.6 78.1,117.9 78.5,116.3 79.0,115.5 79.5,116.2 80.0,118.3 80.5,116.8 81.0,116.1 81.5,117.4 82.0,119.3 82.5,119.8 83.0,120.4 83.4,119.6 83.9,120.8 84.4,122.5 84.9,121.2 85.4,122.8 85.9,123.8 86.4,122.5 86.9,121.3 87.4,121.7 87.9,120.5 88.4,121.5 88.8,120.9 89.3,119.7 89.8,120.2 90.3,119.6 90.8,121.0 91.3,121.4 91.8,121.8 92.3,120.7 92.8,121.6 93.3,121.5 93.7,122.3 94.2,123.1 94.7,123.5 95.2,122.9 95.7,121.9 96.2,123.1 96.7,123.0 97.2,122.9 97.7,124.1 98.2,123.6 98.7,122.6 99.1,123.8 99.6,124.1 100.1,123.2 100.6,123.8 101.1,124.9 101.6,124.8 102.1,123.9 102.6,124.6 103.1,124.8 103.6,125.1 104.0,126.1 104.5,127.1 105.0,127.7 105.5,128.6 106.0,128.1 106.5,128.7 107.0,127.8 107.5,127.4 108.0,126.6 108.5,127.1 109.0,126.7 109.4,126.9 109.9,126.8 110.4,127.6 110.9,127.2 111.4,127.7 111.9,127.3 112.4,127.5 112.9,128.0 113.4,128.5 113.9,129.3 114.3,128.6 114.8,129.0 115.3,128.9 115.8,128.5 116.3,128.1 116.8,127.7 117.3,127.0 117.8,127.8 118.3,127.9 118.8,128.1 119.3,128.9 119.7,128.5 120.2,129.2 120.7,129.6 121.2,130.1 121.7,129.9 122.2,129.8 122.7,130.0 123.2,130.6 123.7,131.1 124.2,131.7 124.6,131.9 125.1,132.5 125.6,132.9 126.1,133.3 126.6,132.6 127.1,132.5 127.6,132.1 128.1,131.5 128.6,131.4 129.1,131.5 129.6,131.2 130.0,131.3 130.5,130.9 131.0,131.6 131.5,131.2 132.0,130.6 132.5,131.0 133.0,130.4 133.5,130.5 134.0,130.0 134.5,130.6 134.9,130.7 135.4,130.4 135.9,130.0 136.4,130.6 136.9,130.7 137.4,130.4 137.9,130.3 138.4,130.7 138.9,130.8 139.4,130.5 139.9,130.6 140.3,130.9 140.8,130.4 141.3,130.5 141.8,131.0 142.3,131.2 142.8,131.1 143.3,131.6 143.8,131.5 144.3,131.2 144.8,130.9 145.3,130.6 145.7,130.9 146.2,130.4 146.7,130.1 147.2,129.7 147.7,130.2 148.2,130.3 148.7,129.8 149.2,129.9 149.7,130.4 150.2,130.3 150.6,130.6 151.1,131.1 151.6,130.6 152.1,130.2 152.6,130.3 153.1,130.2 153.6,129.9 154.1,129.7 154.6,130.1 155.1,130.1 155.6,129.6 156.0,129.9 156.5,130.2 157.0,129.8 157.5,129.9 158.0,129.4 158.5,129.7 159.0,130.0 159.5,130.3 160.0,130.5 160.5,130.6 160.9,131.1 161.4,131.3 161.9,131.1 162.4,131.5 162.9,131.6 163.4,131.5 163.9,131.8 164.4,132.2 164.9,132.6 165.4,133.0 165.9,133.1 166.3,132.8 166.8,133.2 167.3,132.8 167.8,133.1 168.3,133.1 168.8,132.7 169.3,132.7 169.8,132.4 170.3,132.8 170.8,132.4 171.2,132.2 171.7,132.6 172.2,132.7 172.7,132.9 173.2,132.8 173.7,133.0 174.2,132.8 174.7,132.4 175.2,132.2 175.7,132.6 176.2,132.5 176.6,132.4 177.1,132.5 177.6,132.7 178.1,132.5 178.6,132.3 179.1,132.6 179.6,132.6 180.1,132.4 180.6,132.0 181.1,132.2 181.5,132.6 182.0,132.8 182.5,133.0 183.0,132.9 183.5,132.9 184.0,132.8 184.5,132.8 185.0,133.1 185.5,133.3 186.0,133.6 186.5,133.8 186.9,133.6 187.4,133.3 187.9,133.6 188.4,133.7 188.9,133.3 189.4,133.2 189.9,133.3 190.4,133.5 190.9,133.2 191.4,133.4 191.8,133.6 192.3,133.2 192.8,133.0 193.3,133.0 193.8,133.3 194.3,133.6 194.8,133.9 195.3,133.7 195.8,133.4 196.3,133.6 196.8,133.9 197.2,133.7 197.7,133.4 198.2,133.6 198.7,133.4 199.2,133.4 199.7,133.1 200.2,133.2 200.7,133.0 201.2,133.2 201.7,133.4 202.1,133.3 202.6,133.4 203.1,133.4 203.6,133.1 204.1,133.0 204.6,133.0 205.1,132.8 205.6,132.7 206.1,132.4 206.6,132.4 207.1,132.2 207.5,132.0 208.0,131.8 208.5,131.7 209.0,132.0 209.5,131.8 210.0,131.5 210.5,131.3 211.0,131.2 211.5,131.3 212.0,131.4 212.4,131.4 212.9,131.4 213.4,131.1 213.9,130.8 214.4,130.7 214.9,131.0 215.4,130.8 215.9,130.8 216.4,131.0 216.9,131.2 217.4,131.2 217.8,131.1 218.3,130.8 218.8,130.8 219.3,130.8 219.8,130.9 220.3,131.1 220.8,131.0 221.3,131.2 221.8,130.9 222.3,131.1 222.7,131.0 223.2,130.8 223.7,130.7 224.2,130.5 224.7,130.2 225.2,130.4 225.7,130.4 226.2,130.7 226.7,130.7 227.2,130.5 227.7,130.2 228.1,130.5 228.6,130.7 229.1,130.9 229.6,131.2 230.1,131.3 230.6,131.0 231.1,131.3 231.6,131.5 232.1,131.4 232.6,131.4 233.0,131.6 233.5,131.8 234.0,131.7 234.5,131.6 235.0,131.7 235.5,131.6 236.0,131.7 236.5,132.0 237.0,131.7 237.5,131.6 238.0,131.3 238.4,131.5 238.9,131.2 239.4,131.0 239.9,131.2 240.4,131.2 240.9,131.3 241.4,131.4 241.9,131.3 242.4,131.5 242.9,131.5 243.3,131.5 243.8,131.5 244.3,131.4 244.8,131.2 245.3,131.0 245.8,130.8 246.3,130.8 246.8,130.6 247.3,130.8 247.8,130.6 248.3,130.6 248.7,130.5 249.2,130.6 249.7,130.4 250.2,130.2 250.7,130.0 251.2,130.1 251.7,130.3 252.2,130.1 252.7,130.2 253.2,130.2 253.6,130.0 254.1,129.9 254.6,129.9 255.1,129.7 255.6,129.5 256.1,129.8 256.6,129.9 257.1,129.8 257.6,129.6 258.1,129.8 258.6,129.9 259.0,129.8 259.5,129.6 260.0,129.7 260.5,129.5 261.0,129.7 261.5,129.9 262.0,130.0 262.5,130.0 263.0,129.8 263.5,130.1 263.9,130.1 264.4,130.3 264.9,130.2 265.4,130.2 265.9,130.3 266.4,130.5 266.9,130.3 267.4,130.5 267.9,130.4 268.4,130.2 268.9,130.1 269.3,130.1 269.8,130.1 270.3,130.1 270.8,130.3 271.3,130.5 271.8,130.3 272.3,130.2 272.8,130.0 273.3,130.2 273.8,130.1 274.2,130.0 274.7,130.0 275.2,129.9 275.7,129.7 276.2,129.8 276.7,129.8 277.2,129.7 277.7,129.9 278.2,130.1 278.7,130.2 279.2,130.3 279.6,130.5 280.1,130.3 280.6,130.5 281.1,130.6 281.6,130.4 282.1,130.4 282.6,130.3 283.1,130.5 283.6,130.6 284.1,130.8 284.5,130.9 285.0,131.0 285.5,131.0 286.0,131.1 286.5,131.0 287.0,130.9 287.5,131.0 288.0,131.1 288.5,131.0 289.0,130.9 289.5,131.0 289.9,131.0 290.4,131.2 290.9,131.3 291.4,131.5 291.9,131.3 292.4,131.5 292.9,131.7 293.4,131.6 293.9,131.7 294.4,131.7 294.8,131.6 295.3,131.8 295.8,131.7 296.3,131.7 296.8,131.8 297.3,131.6 297.8,131.5 298.3,131.3 298.8,131.3 299.3,131.4 299.8,131.3 300.2,131.2 300.7,131.0 301.2,131.1 301.7,131.0 302.2,131.0 302.7,130.8 303.2,130.6 303.7,130.6 304.2,130.6 304.7,130.6 305.2,130.7 305.6,130.6 306.1,130.8 306.6,130.8 307.1,130.9 307.6,130.7 308.1,130.8 308.6,130.8 309.1,130.8 309.6,130.8 310.1,130.8 310.5,130.8 311.0,130.9 311.5,130.9 312.0,131.1 312.5,131.2 313.0,131.1 313.5,131.0 314.0,131.1 314.5,130.9 315.0,131.1 315.5,131.1 315.9,131.1 316.4,131.1 316.9,130.9 317.4,131.0 317.9,130.9 318.4,130.8 318.9,131.0 319.4,131.1 319.9,131.0 320.4,131.0 320.8,131.0 321.3,131.2 321.8,131.2 322.3,131.0 322.8,130.9 323.3,130.9 323.8,131.0 324.3,130.8 324.8,130.7 325.3,130.6 325.8,130.5 326.2,130.5 326.7,130.5 327.2,130.7 327.7,130.7 328.2,130.8 328.7,131.0 329.2,131.1 329.7,131.1 330.2,131.1 330.7,131.2 331.1,131.3 331.6,131.3 332.1,131.3 332.6,131.2 333.1,131.3 333.6,131.2 334.1,131.1 334.6,131.0 335.1,130.9 335.6,131.1 336.1,131.2 336.5,131.4 337.0,131.3 337.5,131.4 338.0,131.3 338.5,131.3 339.0,131.2 339.5,131.3 340.0,131.4 340.5,131.3 341.0,131.2 341.4,131.3 341.9,131.4 342.4,131.3 342.9,131.3 343.4,131.2 343.9,131.1 344.4,130.9 344.9,130.9 345.4,131.0 345.9,131.0 346.4,130.9 346.8,130.9 347.3,131.0 347.8,131.0 348.3,131.0 348.8,131.0 349.3,131.1 349.8,131.2 350.3,131.1 350.8,131.0 351.3,130.9 351.7,130.7 352.2,130.8 352.7,130.9 353.2,130.9 353.7,131.0 354.2,131.0 354.7,130.9 355.2,131.0 355.7,131.0 356.2,130.9 356.7,130.9 357.1,130.9 357.6,130.9 358.1,131.0 358.6,130.8 359.1,131.0 359.6,131.0 360.1,130.8 360.6,130.8 361.1,130.6 361.6,130.7 362.0,130.7 362.5,130.7 363.0,130.6 363.5,130.8 364.0,130.8 364.5,130.8 365.0,130.9 365.5,130.9 366.0,130.8 366.5,130.7 367.0,130.8 367.4,130.7 367.9,130.7 368.4,130.8 368.9,130.7 369.4,130.7 369.9,130.9 370.4,131.0 370.9,131.0 371.4,130.9 371.9,131.0 372.3,131.0 372.8,131.1 373.3,131.0 373.8,130.9 374.3,130.8 374.8,130.9 375.3,131.0 375.8,131.2 376.3,131.2 376.8,131.2 377.3,131.3 377.7,131.2 378.2,131.2 378.7,131.2 379.2,131.1 379.7,131.2 380.2,131.2 380.7,131.1 381.2,131.2 381.7,131.3 382.2,131.2 382.6,131.4 383.1,131.3 383.6,131.3 384.1,131.1 384.6,131.0 385.1,131.0 385.6,131.0 386.1,130.9 386.6,130.9 387.1,130.9 387.6,130.8 388.0,131.0 388.5,131.0 389.0,131.1 389.5,131.1 390.0,131.0 390.5,130.9 391.0,130.9 391.5,130.8 392.0,130.9 392.5,130.9 392.9,130.8 393.4,130.9 393.9,130.8 394.4,130.9 394.9,130.7 395.4,130.6 395.9,130.7 396.4,130.7 396.9,130.5 397.4,130.5 397.9,130.5 398.3,130.5 398.8,130.4 399.3,130.3 399.8,130.2 400.3,130.2 400.8,130.2 401.3,130.2 401.8,130.2 402.3,130.2 402.8,130.1 403.2,130.1 403.7,130.0 404.2,130.0 404.7,130.2 405.2,130.3 405.7,130.3 406.2,130.4 406.7,130.2 407.2,130.3 407.7,130.1 408.2,130.0 408.6,130.1 409.1,130.3 409.6,130.4 410.1,130.5 410.6,130.4 411.1,130.3 411.6,130.3 412.1,130.3 412.6,130.3 413.1,130.5 413.5,130.4 414.0,130.5 414.5,130.6 415.0,130.7 415.5,130.8 416.0,130.9 416.5,130.9 417.0,130.9 417.5,130.8 418.0,131.0 418.5,131.1 418.9,131.0 419.4,131.0 419.9,131.0 420.4,131.1 420.9,131.1 421.4,131.1 421.9,131.0 422.4,131.0 422.9,130.9 423.4,130.9 423.8,130.8 424.3,130.9 424.8,130.9 425.3,130.8 425.8,130.9 426.3,130.9 426.8,131.0 427.3,131.0 427.8,131.1 428.3,131.0 428.8,131.0 429.2,131.1 429.7,131.2 430.2,131.3 430.7,131.2 431.2,131.2 431.7,131.3 432.2,131.2 432.7,131.2 433.2,131.2 433.7,131.3 434.1,131.2 434.6,131.2 435.1,131.3 435.6,131.4 436.1,131.4 436.6,131.2 437.1,131.2 437.6,131.1 438.1,131.0 438.6,131.1 439.1,131.1 439.5,131.2 440.0,131.3 440.5,131.2 441.0,131.1 441.5,131.2 442.0,131.1 442.5,131.3 443.0,131.1 443.5,131.2 444.0,131.3 444.4,131.3 444.9,131.4 445.4,131.3 445.9,131.2 446.4,131.2 446.9,131.2 447.4,131.1 447.9,131.0 448.4,131.0 448.9,131.0 449.4,131.1 449.8,131.1 450.3,131.1 450.8,131.2 451.3,131.3 451.8,131.2 452.3,131.1 452.8,131.2 453.3,131.2 453.8,131.2 454.3,131.3 454.7,131.4 455.2,131.4 455.7,131.4 456.2,131.3 456.7,131.2 457.2,131.3 457.7,131.2 458.2,131.1 458.7,131.0 459.2,131.0 459.7,131.1 460.1,131.1 460.6,131.0 461.1,131.1 461.6,131.3 462.1,131.2 462.6,131.2 463.1,131.2 463.6,131.2 464.1,131.1 464.6,131.3 465.1,131.3 465.5,131.4 466.0,131.5 466.5,131.5 467.0,131.5 467.5,131.6 468.0,131.5 468.5,131.5 469.0,131.4 469.5,131.5 470.0,131.5 470.4,131.6 470.9,131.6 471.4,131.5 471.9,131.3 472.4,131.2 472.9,131.1 473.4,131.2 473.9,131.3 474.4,131.2 474.9,131.3 475.4,131.4 475.8,131.5 476.3,131.6 476.8,131.4 477.3,131.4 477.8,131.4 478.3,131.3 478.8,131.2 479.3,131.1 479.8,131.1 480.3,131.1 480.7,131.0 481.2,131.1 481.7,131.2 482.2,131.2 482.7,131.3 483.2,131.3 483.7,131.3 484.2,131.3 484.7,131.3 485.2,131.2 485.7,131.2 486.1,131.3 486.6,131.3 487.1,131.4 487.6,131.3 488.1,131.2 488.6,131.4 489.1,131.4 489.6,131.3 490.1,131.3 490.6,131.2 491.0,131.1 491.5,131.2 492.0,131.2 492.5,131.2 493.0,131.1 493.5,131.1 494.0,131.1 494.5,131.1 495.0,131.1 495.5,131.1 496.0,131.2 496.4,131.2 496.9,131.1 497.4,131.2 497.9,131.1 498.4,131.2 498.9,131.2 499.4,131.2 499.9,131.2 500.4,131.1 500.9,131.2 501.3,131.3 501.8,131.3 502.3,131.2 502.8,131.2 503.3,131.3 503.8,131.3 504.3,131.4 504.8,131.5 505.3,131.6 505.8,131.5 506.3,131.4 506.7,131.5 507.2,131.5 507.7,131.5 508.2,131.5 508.7,131.6 509.2,131.6 509.7,131.6 510.2,131.6 510.7,131.7 511.2,131.6 511.6,131.5 512.1,131.6 512.6,131.7 513.1,131.6 513.6,131.6 514.1,131.7 514.6,131.8 515.1,131.8 515.6,131.8 516.1,131.8 516.6,131.8 517.0,131.7 517.5,131.6 518.0,131.7 518.5,131.6 519.0,131.7 519.5,131.6 520.0,131.7 520.5,131.8 521.0,131.7 521.5,131.7 521.9,131.8 522.4,131.8 522.9,131.8 523.4,131.7 523.9,131.8 524.4,131.8 524.9,131.9 525.4,132.0 525.9,131.9 526.4,131.9 526.9,131.9 527.3,131.8 527.8,131.9 528.3,131.8 528.8,131.8 529.3,131.9 529.8,131.8 530.3,131.8 530.8,131.9 531.3,131.8 531.8,131.7 532.2,131.8 532.7,131.8 533.2,131.9 533.7,131.8 534.2,131.8 534.7,131.9 535.2,131.9 535.7,131.9 536.2,131.9 536.7,131.8 537.2,131.7 537.6,131.7 538.1,131.6 538.6,131.7 539.1,131.7 539.6,131.7 540.1,131.7 540.6,131.7 541.1,131.6 541.6,131.6 542.1,131.7 542.5,131.8 543.0,131.7 543.5,131.7 544.0,131.8 544.5,131.9 545.0,132.0" fill="none" stroke="#4051b5" stroke-width="1.8"/>
<text x="133.0" y="62.2" text-anchor="start" fill="#4051b5">dopo 10 lanci: 4,70</text>
<text x="133.0" y="77.0" text-anchor="start" fill="#4051b5">dopo 100 lanci: 3,70</text>
<text x="133.0" y="91.8" text-anchor="start" fill="#4051b5">dopo 1000 lanci: 3,514</text>
</svg>
<figcaption>Una sequenza di 1000 lanci di un dado simulati al computer (seme 37). La linea blu è la media dei primi n risultati. All'inizio la media salta molto, perché ogni nuovo lancio pesa tanto; poi si assesta vicino alla media teorica 3,5.</figcaption>
</figure>

### Che cosa vuol dire «avvicinarsi» {: #convergenza }

L’affermazione «la media si avvicina a 3,5» va detta con precisione, perché le formulazioni più naturali sono sbagliate. Non vuol dire che da un certo $n$ in poi la media sarà uguale a 3,5: dopo un numero dispari di lanci, per esempio, la media non può nemmeno valere esattamente 3,5. Non vuol dire neppure che da un certo punto in poi la media resterà **sicuramente** entro un margine fissato da 3,5: una sequenza di mille sei è possibile, ha soltanto una probabilità minuscola, $(1/6)^{1000}$, e con quella sequenza la media vale 6. La media campionaria è una variabile aleatoria, e ciò che possiamo dire riguarda le sue probabilità.

Il senso giusto è quello di Bernoulli: fissato un margine, la probabilità che la media cada **fuori** da quel margine diventa sempre più piccola, e tende a zero. È una nozione di convergenza nuova, che riguarda variabili aleatorie e non numeri.

!!! abstract "Convergenza in probabilità"
    Una successione di variabili aleatorie $Z_1,Z_2,\dots$ **converge in probabilità** a un numero $c$ se, per ogni margine $\varepsilon>0$,

    $$
    P\big(|Z_n-c|\ge\varepsilon\big)\longrightarrow0\qquad\text{per }n\to\infty.
    $$

    Si scrive $Z_n\xrightarrow{P}c$.

Il margine $\varepsilon$ («epsilon») può essere piccolo quanto vogliamo, per esempio un centesimo; la definizione chiede che, per quel margine, la probabilità di sbagliare di almeno $\varepsilon$ vada a zero. Più il margine è piccolo, più grande dovrà essere $n$ perché la probabilità diventi trascurabile, ma prima o poi lo diventa.

### Il teorema, in due righe {: #lgn-dimostrazione }

!!! abstract "Legge (debole) dei grandi numeri"
    Siano $X_1,X_2,\dots$ variabili aleatorie i.i.d. con media $\mu$ e varianza finita $\sigma^2$, e sia $\bar X_n=(X_1+\cdots+X_n)/n$. Allora

    $$
    \bar X_n\xrightarrow{P}\mu,\qquad\text{cioè}\qquad P\big(|\bar X_n-\mu|\ge\varepsilon\big)\longrightarrow0\quad\text{per ogni }\varepsilon>0.
    $$

La dimostrazione è quella di Čebyšëv, e mette insieme i due atti precedenti. Applichiamo la disuguaglianza di Čebyšëv, nella forma con la distanza, alla variabile $\bar X_n$. La sua media è $\mu$ e la sua varianza è $\sigma^2/n$, quindi al posto di $\sigma^2$ scriviamo $\sigma^2/n$ e al posto di $a$ scriviamo $\varepsilon$:

$$
P\big(|\bar X_n-\mu|\ge\varepsilon\big)\le\frac{\operatorname{Var}(\bar X_n)}{\varepsilon^2}=\frac{\sigma^2}{n\,\varepsilon^2}.
$$

Il membro di destra ha al numeratore due numeri fissati, $\sigma^2$ ed $\varepsilon^2$, e al denominatore $n$, che cresce: tende a zero. La probabilità a sinistra non è mai negativa e sta sotto una quantità che tende a zero, quindi tende a zero anche lei. È tutto.

L’idea si può dire in una frase: **la media campionaria ha la media giusta e una varianza che va a zero, e una variabile con varianza piccola, per Čebyšëv, sta quasi sempre vicino alla sua media.** È il ragionamento che devi saper ripetere all’esame.

Vediamo i numeri per il dado, con il margine $\varepsilon=0{,}1$. Il limite $\sigma^2/(n\varepsilon^2)=2{,}917/(n\cdot0{,}01)$ vale circa 2,9 per $n=100$, che non dice nulla perché supera 1; vale 0,29 per $n=1000$ e 0,029 per $n=10\,000$. Le probabilità vere sono più piccole: con mille lanci la media cade fuori da $3{,}5\pm0{,}1$ circa sei volte su cento, con diecimila lanci praticamente mai. Come sempre, Čebyšëv è prudente; ma ciò che conta qui è che il limite vada a zero, e questo basta per la legge.

Il nome «debole» distingue questa legge da una versione più forte, che afferma che, con probabilità 1, la successione delle medie di una sequenza di osservazioni converge a $\mu$. La legge forte richiede strumenti che vanno oltre questo corso, e non la useremo.

### Le frequenze: il teorema di Bernoulli {: #frequenze }

Il caso più importante è quello di Bernoulli. Ripetiamo $n$ volte, in modo indipendente, una prova in cui un evento $A$ ha probabilità $p$: un lancio di moneta in cui $A$ è «testa», un’estrazione dall’urna in cui $A$ è «bianco». Sia $X_i$ l’indicatrice di $A$ nella prova $i$: vale 1 se $A$ si verifica e 0 altrimenti. Le $X_i$ sono variabili bernoulliane i.i.d., con media $\mathbb{E}[X_i]=P(A)=p$ e varianza $p(1-p)$. La loro somma conta quante volte $A$ si è verificato, e la loro media è la **frequenza relativa** di $A$:

$$
\bar X_n=\frac{\text{numero di volte in cui si verifica }A}{n}=f_n.
$$

La legge dei grandi numeri dice allora che $f_n\xrightarrow{P}p$: **la frequenza relativa converge in probabilità alla probabilità**. È il teorema di Bernoulli, e il limite di Čebyšëv diventa

$$
P\big(|f_n-p|\ge\varepsilon\big)\le\frac{p(1-p)}{n\,\varepsilon^2}\le\frac{1}{4\,n\,\varepsilon^2}.
$$

L’ultima disuguaglianza è comoda quando $p$ non lo conosciamo, che è proprio il caso in cui vogliamo stimarlo con una frequenza. Vale perché $p(1-p)$ non supera mai 1/4: infatti $p(1-p)=1/4-(p-1/2)^2$, che è massimo, e vale 1/4, quando $p=1/2$.

Questo risultato chiude un cerchio aperto nella Settimana 1. Lì avevamo incontrato l’interpretazione frequentista della probabilità e avevamo visto, nel [laboratorio della moneta](../settimana_01/index.md#lab-moneta), le frequenze stabilizzarsi vicino a 1/2. Ora sappiamo che questa stabilizzazione non è un fatto empirico misterioso, né un assioma: è un **teorema**, che segue dagli assiomi di Kolmogorov quando le prove sono indipendenti e hanno tutte la stessa probabilità. Chi interpreta la probabilità come frequenza trova qui una conferma della coerenza della propria lettura; chi la interpreta in altro modo trova una ragione per cui le frequenze osservate sono buoni indizi delle probabilità. Per questo la legge dei grandi numeri è il ponte tra la teoria della probabilità e la statistica, che dai dati vuole risalire ai parametri: la incontreremo di nuovo nella Settimana 10.

??? note "Approfondimento facoltativo — I numeri di Bernoulli, rifatti con Čebyšëv"
    Rifacciamo il conto dell’urna di Bernoulli con la disuguaglianza di Čebyšëv. La probabilità del bianco è $p=3/5=0{,}6$, quindi $p(1-p)=0{,}24$; il margine è $\varepsilon=1/50=0{,}02$; e la «certezza morale» di Bernoulli chiede che la frazione cada fuori dal margine con probabilità mille volte più piccola di quella di cadere dentro, cioè al più $1/1001$. Imponiamo che il limite di Čebyšëv non superi $1/1001$:

    $$
    \frac{0{,}24}{n\cdot0{,}02^2}\le\frac1{1001}\qquad\Longleftrightarrow\qquad n\ge0{,}24\cdot\frac{1001}{0{,}0004}=600\,600.
    $$

    Čebyšëv garantisce la certezza morale con 600 600 estrazioni. Bernoulli, con un ragionamento più fine e più faticoso, era arrivato a 25 550. Oggi, con il calcolo esatto della distribuzione binomiale, si trova che ne bastano circa 6500. I tre numeri raccontano la stessa storia del confronto con la normale: un limite che vale per ogni distribuzione paga la sua generalità con una grande prudenza. Il [teorema del limite centrale della Settimana 9](../settimana_09/index.md#binomiale-normale) ci darà lo strumento per calcoli molto più precisi, quando $n$ è grande.

### Diluizione, non compensazione {: #diluizione }

Nella [Settimana 5](../settimana_05/index.md#fallacia-giocatore) abbiamo incontrato la fallacia del giocatore: dopo una lunga serie di assenze del 53, molti giocatori del Lotto pensano che il numero «debba» uscire, perché alla lunga le frequenze devono tornare a posto. Ora possiamo vedere con precisione che cosa dice la legge dei grandi numeri, e che cosa non dice.

Lanciamo una moneta equilibrata $n$ volte e guardiamo due quantità diverse: la **differenza** tra il numero di teste e la metà dei lanci, $S_n-n/2$, e la **frazione** di teste, $S_n/n$. Le loro deviazioni standard si ricavano dall’Atto VI con $\sigma^2=1/4$: la differenza ha deviazione standard $\sqrt n/2$, la frazione $1/(2\sqrt n)$.

| lanci $n$ | dev. std della differenza $S_n-n/2$ | dev. std della frazione $S_n/n$ |
|:---:|:---:|:---:|
| 100 | 5 | 0,05 |
| 10 000 | 50 | 0,005 |
| 1 000 000 | 500 | 0,0005 |

La differenza **cresce** con $n$: dopo un milione di lanci, uno scarto di qualche centinaio di teste rispetto alla metà è del tutto normale. La frazione invece si stringe attorno a 1/2. Le due cose non sono in contraddizione: uno scarto di 500 teste diviso per un milione di lanci è lo 0,05%. La figura mostra una sequenza di diecimila lanci: in alto la differenza, che vaga e non torna verso zero; in basso la frazione, che si ferma vicino a 1/2.

<figure markdown="0">
<svg viewBox="0 0 580 300" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Una sequenza di 10000 lanci di moneta. Sopra: la differenza tra il numero di teste e la metà dei lanci, che vaga e si allontana da zero; alla fine vale 71. Sotto: la frazione di teste, che si avvicina a un mezzo; alla fine vale 0,5071.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">Una moneta, 10 000 lanci: la differenza vaga, la frazione si ferma</text>
<line x1="70.0" y1="87.5" x2="545.0" y2="87.5" stroke="#e07a1f" stroke-width="1.5" stroke-dasharray="6,4"/>
<line x1="70.0" y1="40.0" x2="70.0" y2="135.0" stroke="currentColor" stroke-width="1"/>
<text x="62.0" y="139.0" text-anchor="end" fill="currentColor">−80</text>
<text x="62.0" y="91.5" text-anchor="end" fill="currentColor">0</text>
<text x="62.0" y="44.0" text-anchor="end" fill="currentColor">80</text>
<polyline points="70.0,87.2 70.2,86.9 70.5,86.6 70.7,85.7 71.0,84.8 71.2,84.5 71.4,84.2 71.7,84.5 71.9,84.8 72.1,85.1 72.4,85.4 72.6,85.7 72.9,86.6 73.1,85.7 73.3,85.4 73.6,85.1 73.8,84.8 74.0,83.3 74.3,82.5 74.5,82.2 74.8,82.5 75.0,82.2 75.2,82.5 75.5,83.3 75.7,83.0 75.9,82.2 76.2,81.9 76.4,80.4 76.7,80.7 76.9,79.8 77.1,80.1 77.4,81.0 77.6,81.9 77.8,82.2 78.1,83.6 78.3,83.3 78.6,83.6 78.8,85.1 79.0,84.8 79.3,83.9 79.5,83.6 79.7,83.3 80.0,84.2 80.2,85.1 80.5,86.0 80.7,86.3 80.9,86.6 81.2,86.9 81.4,87.8 81.6,88.1 81.9,87.8 82.1,86.3 82.4,85.4 82.6,85.7 82.8,86.6 83.1,87.5 83.3,86.6 83.5,86.9 83.8,88.4 84.0,88.7 84.3,88.4 84.5,88.7 84.7,89.6 85.0,88.7 85.2,89.0 85.4,88.7 85.7,89.0 85.9,89.3 86.2,89.0 86.4,88.1 86.6,88.4 86.9,86.9 87.1,87.8 87.3,88.1 87.6,88.4 87.8,88.7 88.1,88.4 88.3,88.1 88.5,88.4 88.8,87.5 89.0,88.4 89.2,88.7 89.5,88.4 89.7,89.3 90.0,89.0 90.2,89.9 90.4,89.0 90.7,88.7 90.9,88.4 91.1,89.3 91.4,89.6 91.6,89.9 91.9,91.4 92.1,91.7 92.3,91.4 92.6,91.1 92.8,91.4 93.0,91.1 93.3,91.4 93.5,92.2 93.8,92.5 94.0,92.8 94.2,92.5 94.5,91.1 94.7,92.0 94.9,92.8 95.2,93.1 95.4,92.8 95.7,94.3 95.9,94.0 96.1,94.9 96.4,95.8 96.6,96.1 96.8,95.8 97.1,95.5 97.3,94.6 97.6,94.9 97.8,94.0 98.0,93.1 98.3,94.0 98.5,93.1 98.7,92.8 99.0,93.1 99.2,94.0 99.5,94.3 99.7,94.6 99.9,93.7 100.2,92.2 100.4,93.1 100.6,93.4 100.9,94.3 101.1,94.6 101.4,94.3 101.6,94.6 101.8,95.5 102.1,94.6 102.3,94.9 102.5,95.8 102.8,96.1 103.0,97.0 103.3,96.7 103.5,97.0 103.7,97.3 104.0,97.6 104.2,99.1 104.4,99.4 104.7,99.7 104.9,101.2 105.2,101.5 105.4,100.6 105.6,100.3 105.9,101.2 106.1,100.3 106.3,101.2 106.6,101.5 106.8,101.2 107.1,100.3 107.3,100.6 107.5,100.3 107.8,100.6 108.0,100.9 108.2,101.2 108.5,100.9 108.7,101.8 109.0,101.5 109.2,101.2 109.4,100.9 109.7,100.0 109.9,99.7 110.1,99.4 110.4,99.7 110.6,99.4 110.9,98.5 111.1,97.6 111.3,97.3 111.6,97.0 111.8,96.1 112.0,94.6 112.3,93.7 112.5,94.0 112.8,93.1 113.0,92.8 113.2,92.0 113.5,91.7 113.7,90.8 113.9,90.5 114.2,91.4 114.4,91.1 114.7,90.2 114.9,90.5 115.1,89.6 115.4,89.9 115.6,89.0 115.8,88.1 116.1,87.8 116.3,87.5 116.6,87.8 116.8,88.1 117.0,87.8 117.3,86.9 117.5,87.8 117.7,86.9 118.0,86.0 118.2,86.3 118.5,86.0 118.7,85.7 118.9,86.0 119.2,84.5 119.4,84.2 119.6,84.5 119.9,85.4 120.1,85.7 120.4,86.0 120.6,86.9 120.8,86.0 121.1,86.3 121.3,85.4 121.5,84.5 121.8,83.6 122.0,83.9 122.3,84.2 122.5,84.5 122.7,84.8 123.0,84.5 123.2,85.4 123.4,85.7 123.7,85.4 123.9,85.1 124.2,85.4 124.4,85.1 124.6,86.0 124.9,86.3 125.1,85.4 125.3,84.5 125.6,84.8 125.8,85.1 126.1,85.4 126.3,84.5 126.5,85.4 126.8,86.3 127.0,86.6 127.2,86.3 127.5,86.6 127.7,86.3 128.0,85.4 128.2,84.5 128.4,84.8 128.7,83.9 128.9,84.8 129.1,85.7 129.4,86.0 129.6,85.7 129.9,85.4 130.1,86.3 130.3,86.0 130.6,86.3 130.8,86.6 131.0,85.7 131.3,86.0 131.5,86.3 131.8,86.6 132.0,86.3 132.2,86.0 132.5,86.3 132.7,87.2 132.9,87.5 133.2,86.6 133.4,86.3 133.7,86.6 133.9,86.3 134.1,87.2 134.4,87.5 134.6,88.4 134.8,88.7 135.1,87.8 135.3,87.5 135.6,87.2 135.8,87.5 136.0,86.6 136.3,86.3 136.5,85.4 136.7,85.7 137.0,86.6 137.2,86.3 137.5,86.0 137.7,85.7 137.9,86.0 138.2,85.7 138.4,84.8 138.6,85.7 138.9,86.0 139.1,85.7 139.4,85.4 139.6,86.3 139.8,87.2 140.1,86.3 140.3,86.6 140.5,86.3 140.8,86.6 141.0,86.3 141.3,86.6 141.5,87.5 141.7,88.4 142.0,87.5 142.2,87.8 142.4,88.1 142.7,89.0 142.9,88.1 143.2,89.0 143.4,88.1 143.6,87.8 143.9,88.1 144.1,88.4 144.3,88.7 144.6,88.4 144.8,89.3 145.1,90.8 145.3,90.5 145.5,90.8 145.8,91.1 146.0,90.2 146.2,90.5 146.5,89.6 146.7,89.9 147.0,89.0 147.2,89.9 147.4,89.6 147.7,88.7 147.9,87.8 148.1,86.9 148.4,86.0 148.6,86.3 148.9,87.2 149.1,86.9 149.3,87.8 149.6,86.9 149.8,87.8 150.0,88.1 150.3,87.8 150.5,87.5 150.8,86.6 151.0,85.1 151.2,84.8 151.5,83.9 151.7,83.6 151.9,83.3 152.2,84.2 152.4,84.5 152.7,86.0 152.9,85.1 153.1,84.2 153.4,85.7 153.6,85.4 153.8,85.1 154.1,85.4 154.3,84.5 154.6,84.2 154.8,85.1 155.0,84.2 155.3,83.3 155.5,82.5 155.7,82.2 156.0,81.3 156.2,81.0 156.5,80.7 156.7,80.4 156.9,80.7 157.2,80.4 157.4,80.7 157.6,81.0 157.9,80.1 158.1,79.8 158.4,80.1 158.6,80.4 158.8,79.5 159.1,79.2 159.3,78.9 159.5,78.6 159.8,78.9 160.0,79.2 160.3,78.9 160.5,79.8 160.7,79.5 161.0,78.0 161.2,77.7 161.4,77.4 161.7,75.9 161.9,75.6 162.2,75.9 162.4,76.2 162.6,74.7 162.9,75.0 163.1,74.7 163.3,73.8 163.6,74.1 163.8,73.2 164.1,71.8 164.3,71.5 164.5,70.6 164.8,70.3 165.0,70.6 165.2,70.9 165.5,71.2 165.7,70.3 166.0,70.0 166.2,69.7 166.4,70.0 166.7,70.3 166.9,70.6 167.1,69.7 167.4,70.0 167.6,69.7 167.9,68.8 168.1,69.7 168.3,69.4 168.6,69.7 168.8,70.0 169.0,71.5 169.3,71.2 169.5,71.5 169.8,71.8 170.0,72.1 170.2,71.2 170.5,70.9 170.7,70.0 170.9,69.7 171.2,69.4 171.4,67.9 171.7,67.6 171.9,68.5 172.1,68.8 172.4,67.9 172.6,68.2 172.8,69.1 173.1,68.2 173.3,68.5 173.6,67.6 173.8,67.3 174.0,66.4 174.3,66.7 174.5,66.4 174.7,67.9 175.0,68.8 175.2,67.3 175.5,67.0 175.7,67.9 175.9,68.2 176.2,67.9 176.4,67.6 176.6,67.9 176.9,67.0 177.1,67.9 177.4,68.8 177.6,67.9 177.8,67.6 178.1,68.5 178.3,68.8 178.5,69.1 178.8,67.6 179.0,66.7 179.3,67.0 179.5,67.3 179.7,67.6 180.0,66.7 180.2,65.8 180.4,66.1 180.7,67.0 180.9,67.3 181.2,67.6 181.4,67.3 181.6,67.0 181.9,66.7 182.1,67.0 182.3,66.1 182.6,66.4 182.8,66.1 183.1,66.4 183.3,66.7 183.5,67.6 183.8,67.3 184.0,68.2 184.2,67.3 184.5,67.0 184.7,66.7 185.0,67.0 185.2,66.7 185.4,66.4 185.7,66.7 185.9,66.4 186.1,66.7 186.4,67.0 186.6,67.3 186.9,67.0 187.1,67.3 187.3,67.0 187.6,66.7 187.8,67.0 188.0,66.7 188.3,67.0 188.5,67.3 188.8,67.0 189.0,67.9 189.2,68.2 189.5,68.5 189.7,68.2 189.9,69.1 190.2,68.2 190.4,68.5 190.7,69.4 190.9,69.7 191.1,69.4 191.4,69.7 191.6,70.0 191.8,69.1 192.1,69.4 192.3,69.1 192.6,70.0 192.8,69.7 193.0,71.2 193.3,70.9 193.5,70.6 193.7,70.9 194.0,71.2 194.2,69.7 194.5,70.0 194.7,71.5 194.9,71.8 195.2,71.5 195.4,73.0 195.7,73.8 195.9,73.5 196.1,73.2 196.4,73.5 196.6,73.2 196.8,73.5 197.1,72.1 197.3,71.2 197.6,70.9 197.8,71.2 198.0,72.1 198.3,71.8 198.5,72.1 198.7,71.8 199.0,70.3 199.2,70.6 199.5,72.1 199.7,73.0 199.9,73.2 200.2,73.0 200.4,73.2 200.6,73.0 200.9,72.7 201.1,73.5 201.4,73.2 201.6,73.0 201.8,73.2 202.1,73.0 202.3,73.2 202.5,73.0 202.8,72.1 203.0,72.4 203.3,72.7 203.5,71.8 203.7,72.1 204.0,72.4 204.2,72.7 204.4,73.0 204.7,73.8 204.9,73.0 205.2,73.2 205.4,73.5 205.6,73.2 205.9,74.1 206.1,74.4 206.3,73.5 206.6,72.7 206.8,73.0 207.1,72.7 207.3,73.0 207.5,73.2 207.8,73.5 208.0,73.2 208.2,73.5 208.5,72.7 208.7,72.4 209.0,70.9 209.2,70.6 209.4,70.3 209.7,69.4 209.9,68.5 210.1,68.2 210.4,67.3 210.6,68.2 210.9,67.9 211.1,67.0 211.3,66.1 211.6,65.8 211.8,66.1 212.0,65.8 212.3,67.3 212.5,68.2 212.8,67.9 213.0,67.6 213.2,68.5 213.5,68.8 213.7,69.1 213.9,69.4 214.2,70.3 214.4,70.0 214.7,69.7 214.9,70.6 215.1,71.5 215.4,70.6 215.6,69.7 215.8,70.0 216.1,70.3 216.3,70.0 216.6,69.7 216.8,69.4 217.0,69.1 217.3,69.4 217.5,70.3 217.7,70.0 218.0,70.3 218.2,70.0 218.5,69.7 218.7,70.6 218.9,70.3 219.2,71.2 219.4,71.5 219.6,73.0 219.9,73.8 220.1,74.7 220.4,75.0 220.6,75.3 220.8,75.6 221.1,75.9 221.3,76.8 221.5,77.7 221.8,77.4 222.0,77.1 222.3,77.4 222.5,78.9 222.7,78.6 223.0,78.9 223.2,78.6 223.4,79.5 223.7,80.4 223.9,80.7 224.2,81.6 224.4,81.3 224.6,81.0 224.9,81.3 225.1,82.2 225.3,82.5 225.6,82.2 225.8,81.9 226.1,81.6 226.3,81.3 226.5,81.6 226.8,81.9 227.0,81.6 227.2,82.5 227.5,82.8 227.7,83.0 228.0,82.8 228.2,83.0 228.4,82.8 228.7,81.9 228.9,81.0 229.1,81.3 229.4,81.0 229.6,81.9 229.9,83.3 230.1,82.5 230.3,81.6 230.6,80.1 230.8,81.0 231.0,81.3 231.3,82.2 231.5,82.5 231.8,83.3 232.0,83.6 232.2,84.5 232.5,83.6 232.7,84.5 232.9,85.4 233.2,85.1 233.4,84.2 233.7,85.1 233.9,86.0 234.1,85.7 234.4,85.4 234.6,85.7 234.8,85.4 235.1,85.1 235.3,84.8 235.6,85.1 235.8,84.8 236.0,84.5 236.3,83.0 236.5,83.9 236.7,83.0 237.0,82.8 237.2,83.0 237.5,82.2 237.7,83.0 237.9,82.2 238.2,82.5 238.4,81.6 238.6,81.9 238.9,82.2 239.1,81.3 239.4,81.0 239.6,79.5 239.8,79.8 240.1,79.5 240.3,79.2 240.5,78.9 240.8,79.2 241.0,78.9 241.3,79.8 241.5,80.1 241.7,79.2 242.0,79.5 242.2,79.2 242.4,78.9 242.7,78.0 242.9,77.1 243.2,77.4 243.4,76.5 243.6,75.6 243.9,75.9 244.1,75.6 244.3,75.3 244.6,75.6 244.8,74.7 245.1,75.0 245.3,75.3 245.5,76.2 245.8,75.9 246.0,75.0 246.2,75.9 246.5,74.4 246.7,75.3 247.0,75.0 247.2,75.3 247.4,75.0 247.7,75.3 247.9,74.4 248.1,74.7 248.4,73.8 248.6,73.5 248.9,73.8 249.1,74.7 249.3,74.4 249.6,75.3 249.8,75.0 250.0,75.3 250.3,75.6 250.5,76.5 250.8,76.2 251.0,75.9 251.2,76.2 251.5,75.9 251.7,75.6 251.9,76.5 252.2,76.8 252.4,77.7 252.7,78.0 252.9,78.3 253.1,78.0 253.4,78.9 253.6,79.8 253.8,79.5 254.1,80.4 254.3,80.7 254.6,81.0 254.8,81.9 255.0,82.2 255.3,81.9 255.5,81.0 255.7,81.3 256.0,81.6 256.2,81.3 256.5,79.8 256.7,81.3 256.9,82.2 257.2,81.3 257.4,81.6 257.6,81.3 257.9,82.2 258.1,81.3 258.4,80.4 258.6,81.3 258.8,82.2 259.1,81.9 259.3,82.2 259.5,81.9 259.8,82.8 260.0,81.9 260.3,81.6 260.5,80.1 260.7,80.4 261.0,80.1 261.2,80.4 261.4,80.7 261.7,81.0 261.9,81.3 262.2,81.0 262.4,80.7 262.6,80.4 262.9,79.5 263.1,79.8 263.3,80.1 263.6,79.8 263.8,79.5 264.1,79.8 264.3,79.5 264.5,79.2 264.8,78.9 265.0,79.8 265.2,79.5 265.5,80.4 265.7,80.1 266.0,80.4 266.2,80.7 266.4,80.4 266.7,80.1 266.9,79.8 267.1,80.1 267.4,81.0 267.6,80.1 267.9,79.8 268.1,80.1 268.3,79.8 268.6,78.9 268.8,79.2 269.0,78.3 269.3,78.6 269.5,78.3 269.8,78.0 270.0,78.3 270.2,78.0 270.5,78.3 270.7,78.0 270.9,76.5 271.2,77.4 271.4,76.5 271.7,76.8 271.9,77.7 272.1,78.0 272.4,77.7 272.6,76.2 272.8,75.9 273.1,75.6 273.3,75.9 273.6,75.6 273.8,74.7 274.0,74.4 274.3,74.7 274.5,75.6 274.7,75.3 275.0,75.0 275.2,74.7 275.5,75.6 275.7,75.3 275.9,75.6 276.2,77.1 276.4,76.2 276.6,75.3 276.9,76.2 277.1,75.3 277.4,75.6 277.6,75.3 277.8,75.0 278.1,74.7 278.3,73.8 278.5,73.0 278.8,73.2 279.0,73.5 279.3,73.2 279.5,73.5 279.7,73.2 280.0,71.8 280.2,72.1 280.4,71.2 280.7,70.3 280.9,69.4 281.2,70.3 281.4,71.2 281.6,72.1 281.9,71.2 282.1,70.9 282.3,70.6 282.6,70.9 282.8,71.8 283.1,72.1 283.3,73.0 283.5,72.1 283.8,72.4 284.0,72.7 284.2,72.4 284.5,72.1 284.7,71.2 285.0,71.5 285.2,71.8 285.4,71.5 285.7,72.4 285.9,72.7 286.1,73.0 286.4,72.1 286.6,73.0 286.9,71.5 287.1,70.6 287.3,70.3 287.6,70.0 287.8,70.3 288.0,69.4 288.3,69.7 288.5,71.2 288.8,69.7 289.0,71.2 289.2,71.5 289.5,71.8 289.7,70.9 289.9,71.2 290.2,70.9 290.4,70.0 290.7,69.1 290.9,69.4 291.1,69.1 291.4,70.0 291.6,71.5 291.8,70.6 292.1,71.5 292.3,72.4 292.6,73.8 292.8,74.7 293.0,75.0 293.3,75.3 293.5,75.0 293.7,74.7 294.0,75.0 294.2,75.3 294.5,74.4 294.7,74.1 294.9,73.2 295.2,72.4 295.4,72.1 295.6,71.8 295.9,70.9 296.1,70.6 296.4,70.3 296.6,70.6 296.8,70.9 297.1,70.6 297.3,70.9 297.5,71.2 297.8,72.1 298.0,71.2 298.3,70.9 298.5,71.2 298.7,70.9 299.0,71.2 299.2,72.1 299.4,73.0 299.7,73.2 299.9,74.1 300.2,75.0 300.4,74.1 300.6,75.0 300.9,74.7 301.1,74.4 301.3,74.1 301.6,73.8 301.8,74.1 302.1,74.4 302.3,74.1 302.5,73.2 302.8,73.5 303.0,74.4 303.2,74.1 303.5,73.2 303.7,74.7 304.0,75.0 304.2,75.3 304.4,76.8 304.7,76.5 304.9,75.6 305.1,75.3 305.4,74.4 305.6,73.0 305.9,72.1 306.1,71.8 306.3,71.5 306.6,71.8 306.8,72.7 307.0,71.2 307.3,71.5 307.5,71.8 307.8,72.1 308.0,71.8 308.2,70.9 308.5,71.8 308.7,72.1 308.9,71.2 309.2,70.3 309.4,70.6 309.7,70.9 309.9,70.6 310.1,70.9 310.4,71.2 310.6,70.3 310.8,70.0 311.1,69.7 311.3,70.0 311.6,69.7 311.8,68.8 312.0,69.1 312.3,70.0 312.5,70.3 312.7,70.0 313.0,69.1 313.2,69.4 313.5,69.7 313.7,69.4 313.9,69.1 314.2,67.6 314.4,67.3 314.6,67.6 314.9,68.5 315.1,68.8 315.4,69.7 315.6,70.6 315.8,70.3 316.1,70.0 316.3,70.9 316.5,69.4 316.8,69.7 317.0,68.8 317.3,69.7 317.5,70.6 317.7,69.7 318.0,70.0 318.2,69.1 318.4,69.4 318.7,69.7 318.9,70.6 319.2,70.9 319.4,71.8 319.6,71.5 319.9,71.2 320.1,70.3 320.4,70.0 320.6,70.3 320.8,71.2 321.1,70.3 321.3,70.6 321.5,70.3 321.8,71.2 322.0,70.3 322.3,70.6 322.5,70.9 322.7,71.2 323.0,71.5 323.2,71.2 323.4,71.5 323.7,71.2 323.9,72.1 324.2,70.6 324.4,70.9 324.6,70.6 324.9,70.3 325.1,71.2 325.3,71.5 325.6,71.8 325.8,71.5 326.1,71.8 326.3,72.1 326.5,71.8 326.8,72.1 327.0,73.0 327.2,73.2 327.5,74.1 327.7,73.2 328.0,73.0 328.2,72.1 328.4,71.8 328.7,72.7 328.9,73.0 329.1,72.7 329.4,72.4 329.6,72.7 329.9,74.1 330.1,74.4 330.3,74.1 330.6,72.7 330.8,71.8 331.0,70.9 331.3,71.2 331.5,70.9 331.8,70.6 332.0,70.3 332.2,71.2 332.5,70.3 332.7,70.6 332.9,69.7 333.2,69.4 333.4,70.3 333.7,69.4 333.9,70.3 334.1,70.0 334.4,70.9 334.6,71.8 334.8,72.1 335.1,71.8 335.3,71.5 335.6,71.8 335.8,70.3 336.0,70.0 336.3,70.9 336.5,70.6 336.7,71.5 337.0,71.8 337.2,72.1 337.5,71.8 337.7,71.5 337.9,71.2 338.2,71.5 338.4,71.2 338.6,71.5 338.9,70.6 339.1,70.3 339.4,69.4 339.6,69.7 339.8,69.4 340.1,68.5 340.3,67.6 340.5,67.3 340.8,66.4 341.0,66.1 341.3,67.0 341.5,65.5 341.7,65.2 342.0,63.8 342.2,64.6 342.4,64.9 342.7,65.2 342.9,65.5 343.2,65.8 343.4,65.5 343.6,66.4 343.9,66.1 344.1,67.0 344.3,65.5 344.6,65.2 344.8,66.1 345.1,67.0 345.3,66.1 345.5,65.2 345.8,66.7 346.0,65.2 346.2,63.8 346.5,63.5 346.7,64.3 347.0,64.0 347.2,63.8 347.4,64.6 347.7,64.9 347.9,64.6 348.1,65.5 348.4,64.6 348.6,64.9 348.9,66.4 349.1,65.5 349.3,67.0 349.6,67.9 349.8,68.8 350.0,69.1 350.3,70.0 350.5,70.3 350.8,71.2 351.0,70.9 351.2,70.6 351.5,70.9 351.7,70.6 351.9,70.9 352.2,71.8 352.4,72.1 352.7,72.4 352.9,72.7 353.1,71.8 353.4,70.9 353.6,70.6 353.8,69.7 354.1,70.0 354.3,70.9 354.6,69.4 354.8,69.7 355.0,70.6 355.3,70.9 355.5,71.2 355.7,71.5 356.0,73.0 356.2,72.7 356.5,72.4 356.7,71.5 356.9,71.8 357.2,70.9 357.4,70.0 357.6,70.3 357.9,70.0 358.1,69.7 358.4,69.4 358.6,70.3 358.8,69.4 359.1,69.1 359.3,68.2 359.5,67.9 359.8,66.4 360.0,65.5 360.3,65.2 360.5,64.9 360.7,64.0 361.0,64.3 361.2,63.5 361.4,63.8 361.7,64.0 361.9,64.3 362.2,62.9 362.4,62.0 362.6,61.1 362.9,61.4 363.1,60.5 363.3,60.8 363.6,60.5 363.8,61.4 364.1,60.5 364.3,59.6 364.5,60.5 364.8,59.6 365.0,58.7 365.2,59.0 365.5,58.1 365.7,58.4 366.0,58.7 366.2,59.6 366.4,59.9 366.7,60.8 366.9,61.1 367.1,62.0 367.4,62.3 367.6,61.4 367.9,61.7 368.1,61.4 368.3,62.3 368.6,62.0 368.8,62.9 369.0,63.8 369.3,64.0 369.5,64.3 369.8,62.9 370.0,62.6 370.2,62.9 370.5,62.0 370.7,61.7 370.9,62.0 371.2,62.3 371.4,63.2 371.7,63.5 371.9,63.8 372.1,64.0 372.4,65.5 372.6,65.8 372.8,65.5 373.1,64.6 373.3,64.3 373.6,64.6 373.8,64.3 374.0,63.5 374.3,62.6 374.5,62.3 374.7,62.6 375.0,62.9 375.2,63.2 375.5,62.3 375.7,62.6 375.9,61.7 376.2,62.6 376.4,62.3 376.6,62.6 376.9,62.3 377.1,62.6 377.4,62.9 377.6,62.6 377.8,62.3 378.1,62.0 378.3,61.7 378.5,62.6 378.8,62.9 379.0,62.6 379.3,62.3 379.5,62.6 379.7,61.7 380.0,60.8 380.2,61.1 380.4,62.0 380.7,61.7 380.9,62.0 381.2,62.9 381.4,63.8 381.6,64.0 381.9,63.8 382.1,64.0 382.3,64.3 382.6,64.0 382.8,63.8 383.1,64.0 383.3,64.3 383.5,64.6 383.8,64.3 384.0,64.6 384.2,64.9 384.5,64.0 384.7,63.8 385.0,64.0 385.2,63.2 385.4,62.9 385.7,62.6 385.9,62.9 386.1,63.2 386.4,62.9 386.6,62.0 386.9,62.3 387.1,60.8 387.3,61.7 387.6,61.4 387.8,60.5 388.0,60.2 388.3,60.5 388.5,59.6 388.8,59.9 389.0,59.6 389.2,59.9 389.5,60.2 389.7,61.1 389.9,62.0 390.2,61.7 390.4,61.4 390.7,61.1 390.9,60.8 391.1,61.1 391.4,60.2 391.6,60.5 391.8,60.2 392.1,61.1 392.3,60.8 392.6,59.9 392.8,60.8 393.0,59.9 393.3,59.0 393.5,59.3 393.7,59.0 394.0,58.7 394.2,57.2 394.5,56.9 394.7,57.2 394.9,56.3 395.2,57.2 395.4,57.5 395.6,57.8 395.9,58.7 396.1,59.0 396.4,58.7 396.6,59.6 396.8,58.7 397.1,57.8 397.3,57.5 397.5,56.6 397.8,56.9 398.0,56.6 398.3,56.3 398.5,56.6 398.7,57.5 399.0,56.0 399.2,57.5 399.4,57.8 399.7,58.1 399.9,57.8 400.2,58.1 400.4,58.4 400.6,58.1 400.9,57.8 401.1,56.9 401.3,56.6 401.6,56.9 401.8,57.2 402.1,57.5 402.3,56.6 402.5,56.9 402.8,57.2 403.0,56.3 403.2,57.2 403.5,56.9 403.7,56.0 404.0,56.3 404.2,57.2 404.4,57.5 404.7,56.6 404.9,55.7 405.1,54.2 405.4,53.4 405.6,53.7 405.9,53.4 406.1,54.8 406.3,54.0 406.6,53.7 406.8,54.0 407.0,54.8 407.3,55.7 407.5,54.8 407.8,54.5 408.0,53.7 408.2,54.0 408.5,54.8 408.7,54.5 408.9,54.8 409.2,55.1 409.4,56.0 409.7,54.5 409.9,54.2 410.1,52.8 410.4,52.5 410.6,52.2 410.8,52.5 411.1,52.2 411.3,51.3 411.6,51.0 411.8,50.7 412.0,52.2 412.3,51.3 412.5,51.0 412.7,51.3 413.0,51.6 413.2,53.1 413.5,53.4 413.7,53.1 413.9,51.6 414.2,50.1 414.4,49.8 414.6,50.1 414.9,49.8 415.1,50.1 415.4,49.8 415.6,50.1 415.8,51.0 416.1,50.1 416.3,49.2 416.5,49.5 416.8,49.2 417.0,49.5 417.3,48.6 417.5,48.9 417.7,48.6 418.0,48.9 418.2,49.8 418.4,50.1 418.7,50.4 418.9,50.1 419.2,49.8 419.4,48.9 419.6,48.6 419.9,48.3 420.1,48.6 420.3,48.3 420.6,47.4 420.8,46.5 421.1,45.6 421.3,45.9 421.5,46.8 421.8,47.1 422.0,46.2 422.2,45.9 422.5,45.0 422.7,44.8 423.0,44.5 423.2,44.8 423.4,43.3 423.7,43.6 423.9,43.9 424.1,43.6 424.4,43.3 424.6,44.2 424.9,44.5 425.1,44.8 425.3,44.5 425.6,43.6 425.8,44.5 426.0,44.8 426.3,43.9 426.5,44.2 426.8,43.9 427.0,43.6 427.2,42.7 427.5,43.6 427.7,44.5 427.9,44.2 428.2,43.9 428.4,43.0 428.7,42.7 428.9,43.0 429.1,43.3 429.4,44.2 429.6,44.5 429.8,44.2 430.1,45.0 430.3,44.2 430.6,44.5 430.8,44.2 431.0,43.3 431.3,43.6 431.5,43.3 431.7,43.6 432.0,43.3 432.2,42.4 432.5,42.7 432.7,42.4 432.9,43.3 433.2,43.0 433.4,42.7 433.6,43.0 433.9,43.9 434.1,43.6 434.4,43.9 434.6,43.0 434.8,42.1 435.1,41.8 435.3,42.1 435.5,41.2 435.8,42.1 436.0,42.4 436.3,40.9 436.5,40.6 436.7,41.5 437.0,41.2 437.2,42.1 437.4,42.4 437.7,42.1 437.9,41.2 438.2,42.1 438.4,42.4 438.6,41.5 438.9,41.2 439.1,41.5 439.3,41.2 439.6,42.1 439.8,43.0 440.1,43.3 440.3,42.4 440.5,42.1 440.8,42.4 441.0,42.7 441.2,43.6 441.5,42.1 441.7,41.2 442.0,40.9 442.2,40.0 442.4,39.1 442.7,38.8 442.9,39.7 443.1,40.0 443.4,40.3 443.6,40.6 443.9,40.9 444.1,40.6 444.3,40.9 444.6,40.0 444.8,40.3 445.1,40.6 445.3,40.3 445.5,40.6 445.8,40.3 446.0,40.0 446.2,41.5 446.5,42.4 446.7,42.7 447.0,41.8 447.2,42.1 447.4,41.2 447.7,41.5 447.9,40.6 448.1,40.3 448.4,40.0 448.6,40.3 448.9,41.2 449.1,40.9 449.3,40.0 449.6,39.7 449.8,38.8 450.0,39.1 450.3,38.8 450.5,37.9 450.8,38.8 451.0,37.9 451.2,37.6 451.5,37.9 451.7,38.8 451.9,37.9 452.2,37.6 452.4,37.9 452.7,37.6 452.9,37.3 453.1,37.0 453.4,37.3 453.6,37.6 453.8,38.5 454.1,40.0 454.3,40.3 454.6,40.6 454.8,40.3 455.0,40.0 455.3,39.1 455.5,39.4 455.7,39.7 456.0,38.2 456.2,39.1 456.5,38.2 456.7,39.7 456.9,39.4 457.2,39.1 457.4,39.4 457.6,39.7 457.9,39.4 458.1,38.5 458.4,38.8 458.6,38.5 458.8,39.4 459.1,40.3 459.3,41.2 459.5,41.5 459.8,41.8 460.0,42.7 460.3,41.8 460.5,40.9 460.7,41.2 461.0,41.5 461.2,41.2 461.4,41.5 461.7,41.2 461.9,42.1 462.2,41.8 462.4,41.5 462.6,41.2 462.9,40.9 463.1,41.8 463.3,41.5 463.6,42.4 463.8,42.7 464.1,43.0 464.3,42.1 464.5,41.8 464.8,41.5 465.0,41.2 465.2,40.9 465.5,40.0 465.7,39.7 466.0,40.0 466.2,39.1 466.4,40.0 466.7,40.3 466.9,40.0 467.1,40.3 467.4,41.2 467.6,41.5 467.9,41.2 468.1,42.1 468.3,42.4 468.6,42.7 468.8,42.4 469.0,42.7 469.3,42.4 469.5,43.3 469.8,44.2 470.0,43.3 470.2,44.2 470.5,43.9 470.7,44.8 470.9,43.9 471.2,44.2 471.4,43.9 471.7,44.2 471.9,43.9 472.1,43.6 472.4,43.9 472.6,43.6 472.8,43.3 473.1,43.6 473.3,43.9 473.6,43.6 473.8,43.3 474.0,44.2 474.3,43.3 474.5,42.4 474.7,43.3 475.0,43.0 475.2,42.7 475.5,43.6 475.7,43.3 475.9,43.0 476.2,43.9 476.4,44.2 476.6,43.3 476.9,41.8 477.1,40.9 477.4,40.6 477.6,41.5 477.8,40.6 478.1,40.3 478.3,40.0 478.5,40.9 478.8,41.2 479.0,40.9 479.3,40.6 479.5,42.1 479.7,42.4 480.0,42.7 480.2,42.4 480.4,41.5 480.7,41.2 480.9,41.5 481.2,42.4 481.4,41.5 481.6,41.2 481.9,40.3 482.1,40.6 482.3,40.3 482.6,40.6 482.8,40.3 483.1,40.6 483.3,40.3 483.5,41.2 483.8,40.9 484.0,40.6 484.2,40.3 484.5,40.6 484.7,40.9 485.0,40.0 485.2,39.1 485.4,38.8 485.7,39.1 485.9,40.0 486.1,39.7 486.4,40.0 486.6,39.1 486.9,38.2 487.1,37.9 487.3,37.0 487.6,37.3 487.8,37.6 488.0,37.3 488.3,37.6 488.5,38.5 488.8,39.4 489.0,40.3 489.2,40.6 489.5,40.3 489.7,40.6 489.9,39.7 490.2,40.0 490.4,39.7 490.7,40.6 490.9,40.9 491.1,41.2 491.4,40.9 491.6,40.6 491.8,41.5 492.1,41.8 492.3,41.5 492.6,42.4 492.8,43.3 493.0,43.0 493.3,43.3 493.5,43.6 493.7,43.9 494.0,44.2 494.2,44.5 494.5,44.8 494.7,45.6 494.9,45.3 495.2,45.0 495.4,44.2 495.6,43.3 495.9,42.4 496.1,41.5 496.4,41.8 496.6,42.1 496.8,41.8 497.1,41.5 497.3,41.2 497.5,41.5 497.8,40.0 498.0,39.7 498.3,39.4 498.5,39.1 498.7,40.0 499.0,39.7 499.2,39.4 499.4,39.7 499.7,40.0 499.9,40.3 500.2,40.0 500.4,39.7 500.6,39.4 500.9,39.7 501.1,38.2 501.3,37.9 501.6,39.4 501.8,39.1 502.1,40.0 502.3,39.7 502.5,39.4 502.8,39.1 503.0,38.8 503.2,39.1 503.5,39.4 503.7,39.1 504.0,39.4 504.2,39.1 504.4,39.4 504.7,40.3 504.9,39.4 505.1,40.3 505.4,40.0 505.6,39.1 505.9,40.0 506.1,40.3 506.3,40.0 506.6,39.1 506.8,38.8 507.0,39.7 507.3,38.8 507.5,39.7 507.8,40.0 508.0,39.1 508.2,39.4 508.5,39.1 508.7,39.4 508.9,40.3 509.2,41.2 509.4,40.3 509.7,40.6 509.9,40.9 510.1,41.2 510.4,41.5 510.6,42.4 510.8,43.3 511.1,44.2 511.3,43.9 511.6,43.6 511.8,44.5 512.0,45.9 512.3,45.6 512.5,44.8 512.7,44.5 513.0,43.0 513.2,42.7 513.5,43.0 513.7,42.1 513.9,41.8 514.2,40.9 514.4,40.6 514.6,39.7 514.9,40.0 515.1,39.7 515.4,38.8 515.6,39.1 515.8,38.8 516.1,39.1 516.3,38.8 516.5,39.1 516.8,39.4 517.0,39.1 517.3,39.4 517.5,38.5 517.7,38.2 518.0,37.9 518.2,37.0 518.4,36.1 518.7,34.7 518.9,35.5 519.2,35.2 519.4,35.0 519.6,36.4 519.9,35.5 520.1,35.8 520.3,36.1 520.6,37.0 520.8,37.9 521.1,38.2 521.3,38.5 521.5,38.8 521.8,39.7 522.0,38.8 522.2,37.9 522.5,38.8 522.7,38.5 523.0,39.4 523.2,39.1 523.4,37.6 523.7,37.9 523.9,38.8 524.1,40.3 524.4,41.2 524.6,41.5 524.9,41.8 525.1,42.1 525.3,41.8 525.6,40.9 525.8,42.4 526.0,42.7 526.3,42.4 526.5,42.7 526.8,42.4 527.0,41.5 527.2,41.2 527.5,40.3 527.7,40.6 527.9,40.9 528.2,41.2 528.4,42.1 528.7,43.0 528.9,43.3 529.1,42.4 529.4,42.7 529.6,43.0 529.8,43.9 530.1,43.6 530.3,45.0 530.6,44.8 530.8,43.9 531.0,43.6 531.3,43.9 531.5,44.2 531.7,44.5 532.0,44.8 532.2,43.9 532.5,44.8 532.7,45.0 532.9,44.2 533.2,43.9 533.4,44.2 533.6,45.0 533.9,45.9 534.1,46.2 534.4,46.5 534.6,46.8 534.8,45.9 535.1,46.2 535.3,46.5 535.5,46.2 535.8,45.3 536.0,45.6 536.3,45.9 536.5,45.0 536.7,44.8 537.0,44.5 537.2,45.3 537.4,45.6 537.7,46.5 537.9,46.2 538.2,46.5 538.4,47.4 538.6,48.3 538.9,49.2 539.1,49.5 539.3,49.2 539.6,49.5 539.8,49.2 540.1,49.5 540.3,49.8 540.5,50.1 540.8,49.8 541.0,48.9 541.2,48.0 541.5,47.7 541.7,47.4 542.0,47.1 542.2,46.8 542.4,46.5 542.7,46.2 542.9,46.5 543.1,46.2 543.4,45.3 543.6,45.6 543.9,45.3 544.1,45.6 544.3,45.9 544.6,45.0 544.8,45.3" fill="none" stroke="#4051b5" stroke-width="1.4"/>
<text x="76.0" y="44.0" text-anchor="start" fill="#4051b5" font-weight="bold">teste − n/2</text>
<line x1="70.0" y1="215.0" x2="545.0" y2="215.0" stroke="#e07a1f" stroke-width="1.5" stroke-dasharray="6,4"/>
<line x1="70.0" y1="165.0" x2="70.0" y2="265.0" stroke="currentColor" stroke-width="1"/>
<line x1="70.0" y1="265.0" x2="545.0" y2="265.0" stroke="currentColor" stroke-width="1"/>
<text x="62.0" y="269.0" text-anchor="end" fill="currentColor">0,4</text>
<text x="62.0" y="219.0" text-anchor="end" fill="currentColor">0,5</text>
<text x="62.0" y="169.0" text-anchor="end" fill="currentColor">0,6</text>
<polyline points="70.0,165.0 70.0,215.0 70.1,165.0 70.1,215.0 70.2,165.0 70.2,165.0 70.3,179.3 70.3,165.0 70.4,187.2 70.4,165.0 70.5,165.0 70.5,165.0 70.6,165.0 70.6,165.0 70.7,165.0 70.7,165.0 70.8,165.0 70.8,165.0 70.9,165.0 70.9,165.0 71.0,165.0 71.0,165.0 71.0,165.0 71.1,165.0 71.1,165.0 71.2,165.0 71.2,165.0 71.3,165.0 71.3,165.0 71.4,165.0 71.4,165.0 71.5,165.0 71.5,165.0 71.6,165.0 71.6,165.0 71.7,165.0 71.7,165.0 71.8,165.0 71.8,165.0 71.9,165.0 71.9,165.0 71.9,167.4 72.0,174.3 72.0,169.5 72.1,165.0 72.1,171.5 72.2,167.1 72.2,173.3 72.3,169.1 72.3,175.0 72.4,180.7 72.6,188.2 72.9,202.7 73.1,192.3 73.3,190.4 73.6,188.7 73.8,187.2 74.0,174.3 74.3,168.3 74.5,168.1 74.8,172.9 75.0,172.5 75.2,176.7 75.5,184.8 75.7,184.0 75.9,179.3 76.2,178.7 76.4,170.9 76.7,174.2 76.9,170.5 77.1,173.6 77.4,179.7 77.6,185.5 77.8,187.9 78.1,196.0 78.3,195.1 78.6,197.0 78.8,204.2 79.0,203.2 79.3,199.7 79.5,198.8 79.7,198.0 80.0,202.0 80.2,205.7 80.5,209.3 80.7,210.6 80.9,211.8 81.2,212.9 81.4,216.0 81.6,217.0 81.9,216.0 82.1,211.1 82.4,208.3 82.6,209.4 82.8,212.2 83.1,215.0 83.3,212.3 83.5,213.3 83.8,217.6 84.0,218.4 84.3,217.5 84.5,218.3 84.7,220.6 85.0,218.2 85.2,218.9 85.4,218.1 85.7,218.8 85.9,219.5 86.2,218.7 86.4,216.4 86.6,217.1 86.9,213.6 87.1,215.7 87.3,216.4 87.6,217.0 87.8,217.7 88.1,217.0 88.3,216.3 88.5,216.9 88.8,215.0 89.0,216.9 89.2,217.5 89.5,216.8 89.7,218.6 90.0,218.0 90.2,219.7 90.4,217.9 90.7,217.3 90.9,216.7 91.1,218.4 91.4,218.9 91.6,219.4 91.9,222.0 92.1,222.5 92.3,221.9 92.6,221.3 92.8,221.8 93.0,221.2 93.3,221.6 93.5,223.1 93.8,223.5 94.0,223.9 94.2,223.3 94.5,220.8 94.7,222.2 94.9,223.6 95.2,223.9 95.4,223.4 95.7,225.6 95.9,225.1 96.1,226.3 96.4,227.6 96.6,227.9 96.8,227.4 97.1,226.8 97.3,225.4 97.6,225.8 97.8,224.4 98.0,223.0 98.3,224.2 98.5,222.9 98.7,222.4 99.0,222.8 99.2,223.9 99.5,224.3 99.7,224.6 99.9,223.3 100.2,221.3 100.4,222.4 100.6,222.7 100.9,223.8 101.1,224.1 101.4,223.7 101.6,224.0 101.8,225.1 102.1,223.9 102.3,224.2 102.5,225.2 102.8,225.5 103.0,226.5 103.3,226.1 103.5,226.3 103.7,226.6 104.0,226.9 104.2,228.5 104.4,228.8 104.7,229.0 104.9,230.6 105.2,230.9 105.4,229.7 105.6,229.3 105.9,230.2 106.1,229.1 106.3,230.0 106.6,230.2 106.8,229.8 107.1,228.8 107.3,229.0 107.5,228.6 107.8,228.8 108.0,229.0 108.2,229.3 108.5,228.9 108.7,229.7 109.0,229.3 109.2,228.9 109.4,228.5 109.7,227.6 109.9,227.2 110.1,226.8 110.4,227.0 110.6,226.7 110.9,225.7 111.1,224.8 111.3,224.5 111.6,224.1 111.8,223.2 112.0,221.8 112.3,220.9 112.5,221.1 112.8,220.3 113.0,220.0 113.2,219.1 113.5,218.8 113.7,218.0 113.9,217.7 114.2,218.5 114.4,218.2 114.7,217.4 114.9,217.6 115.1,216.8 115.4,217.1 115.6,216.3 115.8,215.5 116.1,215.3 116.3,215.0 116.6,215.3 116.8,215.5 117.0,215.3 117.3,214.5 117.5,215.2 117.7,214.5 118.0,213.8 118.2,214.0 118.5,213.8 118.7,213.5 118.9,213.8 119.2,212.6 119.4,212.4 119.6,212.6 119.9,213.3 120.1,213.6 120.4,213.8 120.6,214.5 120.8,213.8 121.1,214.1 121.3,213.4 121.5,212.7 121.8,212.0 122.0,212.3 122.3,212.5 122.5,212.7 122.7,213.0 123.0,212.8 123.2,213.4 123.4,213.7 123.7,213.5 123.9,213.2 124.2,213.5 124.4,213.3 124.6,213.9 124.9,214.1 125.1,213.5 125.3,212.9 125.6,213.1 125.8,213.3 126.1,213.5 126.3,212.9 126.5,213.5 126.8,214.2 127.0,214.4 127.2,214.2 127.5,214.4 127.7,214.2 128.0,213.6 128.2,213.0 128.4,213.2 128.7,212.6 128.9,213.2 129.1,213.8 129.4,214.0 129.6,213.8 129.9,213.6 130.1,214.2 130.3,214.0 130.6,214.2 130.8,214.4 131.0,213.8 131.3,214.0 131.5,214.2 131.8,214.4 132.0,214.2 132.2,214.0 132.5,214.2 132.7,214.8 132.9,215.0 133.2,214.4 133.4,214.3 133.7,214.4 133.9,214.3 134.1,214.8 134.4,215.0 134.6,215.6 134.8,215.7 135.1,215.2 135.3,215.0 135.6,214.8 135.8,215.0 136.0,214.5 136.3,214.3 136.5,213.8 136.7,213.9 137.0,214.5 137.2,214.3 137.5,214.1 137.7,213.9 137.9,214.1 138.2,214.0 138.4,213.4 138.6,214.0 138.9,214.1 139.1,214.0 139.4,213.8 139.6,214.3 139.8,214.8 140.1,214.3 140.3,214.5 140.5,214.3 140.8,214.5 141.0,214.3 141.3,214.5 141.5,215.0 141.7,215.5 142.0,215.0 142.2,215.2 142.4,215.3 142.7,215.8 142.9,215.3 143.2,215.8 143.4,215.3 143.6,215.2 143.9,215.3 144.1,215.5 144.3,215.6 144.6,215.5 144.8,216.0 145.1,216.7 145.3,216.6 145.5,216.7 145.8,216.9 146.0,216.4 146.2,216.6 146.5,216.1 146.7,216.2 147.0,215.8 147.2,216.2 147.4,216.1 147.7,215.6 147.9,215.2 148.1,214.7 148.4,214.2 148.6,214.4 148.9,214.8 149.1,214.7 149.3,215.1 149.6,214.7 149.8,215.1 150.0,215.3 150.3,215.1 150.5,215.0 150.8,214.6 151.0,213.8 151.2,213.7 151.5,213.3 151.7,213.1 151.9,213.0 152.2,213.4 152.4,213.6 152.7,214.3 152.9,213.9 153.1,213.4 153.4,214.1 153.6,214.0 153.8,213.9 154.1,214.0 154.3,213.6 154.6,213.5 154.8,213.9 155.0,213.5 155.3,213.1 155.5,212.6 155.7,212.5 156.0,212.1 156.2,212.0 156.5,211.8 156.7,211.7 156.9,211.9 157.2,211.7 157.4,211.9 157.6,212.0 157.9,211.6 158.1,211.5 158.4,211.6 158.6,211.8 158.8,211.4 159.1,211.3 159.3,211.1 159.5,211.0 159.8,211.2 160.0,211.3 160.3,211.2 160.5,211.6 160.7,211.5 161.0,210.8 161.2,210.7 161.4,210.6 161.7,210.0 161.9,209.8 162.2,210.0 162.4,210.1 162.6,209.5 162.9,209.6 163.1,209.5 163.3,209.2 163.6,209.3 163.8,208.9 164.1,208.3 164.3,208.2 164.5,207.8 164.8,207.7 165.0,207.9 165.2,208.0 165.5,208.2 165.7,207.8 166.0,207.7 166.2,207.6 166.4,207.7 166.7,207.9 166.9,208.0 167.1,207.7 167.4,207.8 167.6,207.7 167.9,207.4 168.1,207.7 168.3,207.6 168.6,207.8 168.8,207.9 169.0,208.5 169.3,208.4 169.5,208.6 169.8,208.7 170.0,208.8 170.2,208.5 170.5,208.4 170.7,208.0 170.9,207.9 171.2,207.8 171.4,207.3 171.7,207.2 171.9,207.5 172.1,207.7 172.4,207.3 172.6,207.5 172.8,207.8 173.1,207.5 173.3,207.6 173.6,207.3 173.8,207.2 174.0,206.9 174.3,207.0 174.5,206.9 174.7,207.5 175.0,207.9 175.2,207.3 175.5,207.2 175.7,207.6 175.9,207.7 176.2,207.6 176.4,207.5 176.6,207.7 176.9,207.3 177.1,207.7 177.4,208.0 177.6,207.7 177.8,207.6 178.1,208.0 178.3,208.1 178.5,208.2 178.8,207.7 179.0,207.4 179.3,207.5 179.5,207.6 179.7,207.8 180.0,207.4 180.2,207.1 180.4,207.3 180.7,207.6 180.9,207.7 181.2,207.8 181.4,207.8 181.6,207.7 181.9,207.6 182.1,207.7 182.3,207.4 182.6,207.5 182.8,207.4 183.1,207.5 183.3,207.7 183.5,208.0 183.8,207.9 184.0,208.2 184.2,207.9 184.5,207.8 184.7,207.8 185.0,207.9 185.2,207.8 185.4,207.7 185.7,207.8 185.9,207.7 186.1,207.8 186.4,208.0 186.6,208.1 186.9,208.0 187.1,208.1 187.3,208.0 187.6,207.9 187.8,208.0 188.0,208.0 188.3,208.1 188.5,208.2 188.8,208.1 189.0,208.4 189.2,208.5 189.5,208.6 189.7,208.6 189.9,208.9 190.2,208.6 190.4,208.7 190.7,209.0 190.9,209.1 191.1,209.0 191.4,209.1 191.6,209.2 191.8,209.0 192.1,209.1 192.3,209.0 192.6,209.3 192.8,209.2 193.0,209.7 193.3,209.6 193.5,209.5 193.7,209.6 194.0,209.7 194.2,209.3 194.5,209.4 194.7,209.9 194.9,210.0 195.2,209.9 195.4,210.4 195.7,210.7 195.9,210.6 196.1,210.5 196.4,210.6 196.6,210.5 196.8,210.6 197.1,210.1 197.3,209.9 197.6,209.8 197.8,209.9 198.0,210.2 198.3,210.1 198.5,210.2 198.7,210.1 199.0,209.7 199.2,209.8 199.5,210.2 199.7,210.5 199.9,210.6 200.2,210.5 200.4,210.6 200.6,210.5 200.9,210.5 201.1,210.7 201.4,210.7 201.6,210.6 201.8,210.7 202.1,210.6 202.3,210.7 202.5,210.6 202.8,210.4 203.0,210.4 203.3,210.5 203.5,210.3 203.7,210.4 204.0,210.5 204.2,210.6 204.4,210.7 204.7,210.9 204.9,210.7 205.2,210.8 205.4,210.9 205.6,210.8 205.9,211.1 206.1,211.2 206.3,210.9 206.6,210.7 206.8,210.7 207.1,210.7 207.3,210.8 207.5,210.9 207.8,210.9 208.0,210.9 208.2,211.0 208.5,210.7 208.7,210.6 209.0,210.2 209.2,210.1 209.4,210.1 209.7,209.8 209.9,209.6 210.1,209.5 210.4,209.2 210.6,209.5 210.9,209.4 211.1,209.2 211.3,209.0 211.6,208.9 211.8,209.0 212.0,208.9 212.3,209.3 212.5,209.6 212.8,209.5 213.0,209.4 213.2,209.7 213.5,209.8 213.7,209.9 213.9,210.0 214.2,210.2 214.4,210.1 214.7,210.1 214.9,210.3 215.1,210.6 215.4,210.3 215.6,210.1 215.8,210.2 216.1,210.3 216.3,210.2 216.6,210.1 216.8,210.1 217.0,210.0 217.3,210.1 217.5,210.3 217.7,210.3 218.0,210.3 218.2,210.3 218.5,210.2 218.7,210.4 218.9,210.4 219.2,210.6 219.4,210.7 219.6,211.1 219.9,211.4 220.1,211.6 220.4,211.7 220.6,211.8 220.8,211.9 221.1,211.9 221.3,212.2 221.5,212.4 221.8,212.3 222.0,212.3 222.3,212.3 222.5,212.7 222.7,212.7 223.0,212.7 223.2,212.7 223.4,212.9 223.7,213.1 223.9,213.2 224.2,213.5 224.4,213.4 224.6,213.3 224.9,213.4 225.1,213.6 225.3,213.7 225.6,213.6 225.8,213.6 226.1,213.5 226.3,213.4 226.5,213.5 226.8,213.6 227.0,213.5 227.2,213.7 227.5,213.8 227.7,213.9 228.0,213.8 228.2,213.9 228.4,213.8 228.7,213.6 228.9,213.4 229.1,213.4 229.4,213.4 229.6,213.6 229.9,214.0 230.1,213.7 230.3,213.5 230.6,213.2 230.8,213.4 231.0,213.5 231.3,213.7 231.5,213.8 231.8,214.0 232.0,214.0 232.2,214.3 232.5,214.0 232.7,214.3 232.9,214.5 233.2,214.4 233.4,214.2 233.7,214.4 233.9,214.6 234.1,214.6 234.4,214.5 234.6,214.6 234.8,214.5 235.1,214.4 235.3,214.4 235.6,214.4 235.8,214.4 236.0,214.3 236.3,213.9 236.5,214.1 236.7,213.9 237.0,213.9 237.2,213.9 237.5,213.7 237.7,213.9 237.9,213.7 238.2,213.8 238.4,213.6 238.6,213.7 238.9,213.7 239.1,213.5 239.4,213.5 239.6,213.1 239.8,213.2 240.1,213.1 240.3,213.0 240.5,213.0 240.8,213.1 241.0,213.0 241.3,213.2 241.5,213.3 241.7,213.1 242.0,213.1 242.2,213.1 242.4,213.0 242.7,212.8 242.9,212.6 243.2,212.7 243.4,212.5 243.6,212.3 243.9,212.3 244.1,212.3 244.3,212.2 244.6,212.3 244.8,212.1 245.1,212.2 245.3,212.2 245.5,212.4 245.8,212.4 246.0,212.2 246.2,212.4 246.5,212.0 246.7,212.2 247.0,212.2 247.2,212.3 247.4,212.2 247.7,212.3 247.9,212.1 248.1,212.1 248.4,211.9 248.6,211.9 248.9,211.9 249.1,212.1 249.3,212.1 249.6,212.3 249.8,212.2 250.0,212.3 250.3,212.4 250.5,212.6 250.8,212.5 251.0,212.4 251.2,212.5 251.5,212.4 251.7,212.4 251.9,212.6 252.2,212.7 252.4,212.9 252.7,212.9 252.9,213.0 253.1,212.9 253.4,213.1 253.6,213.3 253.8,213.3 254.1,213.5 254.3,213.5 254.6,213.6 254.8,213.8 255.0,213.8 255.3,213.8 255.5,213.6 255.7,213.7 256.0,213.7 256.2,213.7 256.5,213.3 256.7,213.7 256.9,213.9 257.2,213.7 257.4,213.7 257.6,213.7 257.9,213.9 258.1,213.7 258.4,213.5 258.6,213.7 258.8,213.9 259.1,213.8 259.3,213.9 259.5,213.8 259.8,214.0 260.0,213.8 260.3,213.8 260.5,213.4 260.7,213.5 261.0,213.4 261.2,213.5 261.4,213.6 261.7,213.6 261.9,213.7 262.2,213.6 262.4,213.6 262.6,213.5 262.9,213.3 263.1,213.4 263.3,213.5 263.6,213.4 263.8,213.3 264.1,213.4 264.3,213.4 264.5,213.3 264.8,213.2 265.0,213.4 265.2,213.4 265.5,213.5 265.7,213.5 266.0,213.5 266.2,213.6 266.4,213.5 266.7,213.5 266.9,213.4 267.1,213.5 267.4,213.7 267.6,213.5 267.9,213.4 268.1,213.5 268.3,213.4 268.6,213.3 268.8,213.3 269.0,213.2 269.3,213.2 269.5,213.2 269.8,213.1 270.0,213.2 270.2,213.1 270.5,213.2 270.7,213.1 270.9,212.8 271.2,213.0 271.4,212.8 271.7,212.9 271.9,213.1 272.1,213.1 272.4,213.1 272.6,212.8 272.8,212.7 273.1,212.7 273.3,212.7 273.6,212.7 273.8,212.5 274.0,212.4 274.3,212.5 274.5,212.7 274.7,212.6 275.0,212.6 275.2,212.5 275.5,212.7 275.7,212.6 275.9,212.7 276.2,213.0 276.4,212.8 276.6,212.6 276.9,212.8 277.1,212.6 277.4,212.7 277.6,212.7 277.8,212.6 278.1,212.5 278.3,212.4 278.5,212.2 278.8,212.3 279.0,212.3 279.3,212.3 279.5,212.3 279.7,212.3 280.0,212.0 280.2,212.1 280.4,211.9 280.7,211.7 280.9,211.6 281.2,211.7 281.4,211.9 281.6,212.1 281.9,211.9 282.1,211.9 282.3,211.8 282.6,211.9 282.8,212.0 283.1,212.1 283.3,212.3 283.5,212.1 283.8,212.2 284.0,212.2 284.2,212.2 284.5,212.1 284.7,212.0 285.0,212.0 285.2,212.1 285.4,212.0 285.7,212.2 285.9,212.3 286.1,212.3 286.4,212.1 286.6,212.3 286.9,212.0 287.1,211.9 287.3,211.8 287.6,211.8 287.8,211.8 288.0,211.7 288.3,211.7 288.5,212.0 288.8,211.7 289.0,212.0 289.2,212.1 289.5,212.1 289.7,212.0 289.9,212.0 290.2,212.0 290.4,211.8 290.7,211.7 290.9,211.7 291.1,211.7 291.4,211.8 291.6,212.1 291.8,211.9 292.1,212.1 292.3,212.3 292.6,212.5 292.8,212.7 293.0,212.8 293.3,212.8 293.5,212.8 293.7,212.7 294.0,212.8 294.2,212.8 294.5,212.7 294.7,212.6 294.9,212.5 295.2,212.3 295.4,212.3 295.6,212.2 295.9,212.1 296.1,212.0 296.4,212.0 296.6,212.0 296.8,212.1 297.1,212.0 297.3,212.1 297.5,212.1 297.8,212.3 298.0,212.1 298.3,212.1 298.5,212.1 298.7,212.1 299.0,212.1 299.2,212.3 299.4,212.5 299.7,212.5 299.9,212.7 300.2,212.8 300.4,212.7 300.6,212.8 300.9,212.8 301.1,212.7 301.3,212.7 301.6,212.6 301.8,212.7 302.1,212.7 302.3,212.7 302.5,212.5 302.8,212.6 303.0,212.8 303.2,212.7 303.5,212.6 303.7,212.8 304.0,212.9 304.2,212.9 304.4,213.2 304.7,213.1 304.9,213.0 305.1,212.9 305.4,212.8 305.6,212.5 305.9,212.4 306.1,212.3 306.3,212.3 306.6,212.3 306.8,212.5 307.0,212.2 307.3,212.3 307.5,212.4 307.8,212.4 308.0,212.4 308.2,212.2 308.5,212.4 308.7,212.4 308.9,212.3 309.2,212.1 309.4,212.2 309.7,212.2 309.9,212.2 310.1,212.2 310.4,212.3 310.6,212.1 310.8,212.1 311.1,212.0 311.3,212.1 311.6,212.1 311.8,211.9 312.0,212.0 312.3,212.1 312.5,212.2 312.7,212.1 313.0,212.0 313.2,212.0 313.5,212.1 313.7,212.0 313.9,212.0 314.2,211.7 314.4,211.7 314.6,211.7 314.9,211.9 315.1,211.9 315.4,212.1 315.6,212.2 315.8,212.2 316.1,212.2 316.3,212.3 316.5,212.1 316.8,212.1 317.0,212.0 317.3,212.1 317.5,212.3 317.7,212.1 318.0,212.2 318.2,212.0 318.4,212.1 318.7,212.1 318.9,212.3 319.2,212.3 319.4,212.5 319.6,212.4 319.9,212.4 320.1,212.2 320.4,212.2 320.6,212.3 320.8,212.4 321.1,212.3 321.3,212.3 321.5,212.3 321.8,212.4 322.0,212.3 322.3,212.3 322.5,212.4 322.7,212.4 323.0,212.5 323.2,212.4 323.4,212.5 323.7,212.4 323.9,212.6 324.2,212.3 324.4,212.4 324.6,212.3 324.9,212.3 325.1,212.4 325.3,212.5 325.6,212.5 325.8,212.5 326.1,212.5 326.3,212.6 326.5,212.5 326.8,212.6 327.0,212.7 327.2,212.8 327.5,212.9 327.7,212.8 328.0,212.7 328.2,212.6 328.4,212.6 328.7,212.7 328.9,212.8 329.1,212.7 329.4,212.7 329.6,212.7 329.9,212.9 330.1,213.0 330.3,212.9 330.6,212.7 330.8,212.6 331.0,212.5 331.3,212.5 331.5,212.5 331.8,212.4 332.0,212.4 332.2,212.5 332.5,212.4 332.7,212.4 332.9,212.3 333.2,212.2 333.4,212.4 333.7,212.3 333.9,212.4 334.1,212.3 334.4,212.5 334.6,212.6 334.8,212.7 335.1,212.6 335.3,212.6 335.6,212.6 335.8,212.4 336.0,212.4 336.3,212.5 336.5,212.5 336.7,212.6 337.0,212.6 337.2,212.7 337.5,212.6 337.7,212.6 337.9,212.6 338.2,212.6 338.4,212.6 338.6,212.6 338.9,212.5 339.1,212.4 339.4,212.3 339.6,212.4 339.8,212.3 340.1,212.2 340.3,212.1 340.5,212.0 340.8,211.9 341.0,211.8 341.3,212.0 341.5,211.8 341.7,211.7 342.0,211.5 342.2,211.6 342.4,211.7 342.7,211.7 342.9,211.8 343.2,211.8 343.4,211.8 343.6,211.9 343.9,211.9 344.1,212.0 344.3,211.8 344.6,211.8 344.8,211.9 345.1,212.0 345.3,211.9 345.5,211.8 345.8,212.0 346.0,211.8 346.2,211.6 346.5,211.5 346.7,211.7 347.0,211.6 347.2,211.6 347.4,211.7 347.7,211.7 347.9,211.7 348.1,211.8 348.4,211.7 348.6,211.8 348.9,212.0 349.1,211.9 349.3,212.1 349.6,212.2 349.8,212.3 350.0,212.4 350.3,212.5 350.5,212.5 350.8,212.7 351.0,212.6 351.2,212.6 351.5,212.6 351.7,212.6 351.9,212.6 352.2,212.8 352.4,212.8 352.7,212.9 352.9,212.9 353.1,212.8 353.4,212.7 353.6,212.6 353.8,212.5 354.1,212.5 354.3,212.7 354.6,212.5 354.8,212.5 355.0,212.6 355.3,212.7 355.5,212.7 355.7,212.8 356.0,213.0 356.2,212.9 356.5,212.9 356.7,212.8 356.9,212.8 357.2,212.7 357.4,212.6 357.6,212.6 357.9,212.6 358.1,212.5 358.4,212.5 358.6,212.6 358.8,212.5 359.1,212.5 359.3,212.3 359.5,212.3 359.8,212.1 360.0,212.0 360.3,211.9 360.5,211.9 360.7,211.8 361.0,211.8 361.2,211.7 361.4,211.7 361.7,211.8 361.9,211.8 362.2,211.6 362.4,211.5 362.6,211.4 362.9,211.4 363.1,211.3 363.3,211.4 363.6,211.3 363.8,211.4 364.1,211.3 364.3,211.2 364.5,211.3 364.8,211.2 365.0,211.1 365.2,211.1 365.5,211.0 365.7,211.1 366.0,211.1 366.2,211.2 366.4,211.3 366.7,211.4 366.9,211.4 367.1,211.6 367.4,211.6 367.6,211.5 367.9,211.5 368.1,211.5 368.3,211.6 368.6,211.6 368.8,211.7 369.0,211.8 369.3,211.9 369.5,211.9 369.8,211.7 370.0,211.7 370.2,211.7 370.5,211.6 370.7,211.6 370.9,211.6 371.2,211.6 371.4,211.8 371.7,211.8 371.9,211.9 372.1,211.9 372.4,212.1 372.6,212.1 372.8,212.1 373.1,212.0 373.3,211.9 373.6,212.0 373.8,212.0 374.0,211.8 374.3,211.7 374.5,211.7 374.7,211.7 375.0,211.8 375.2,211.8 375.5,211.7 375.7,211.7 375.9,211.6 376.2,211.7 376.4,211.7 376.6,211.7 376.9,211.7 377.1,211.8 377.4,211.8 377.6,211.8 377.8,211.7 378.1,211.7 378.3,211.6 378.5,211.8 378.8,211.8 379.0,211.8 379.3,211.7 379.5,211.8 379.7,211.7 380.0,211.6 380.2,211.6 380.4,211.7 380.7,211.7 380.9,211.7 381.2,211.8 381.4,211.9 381.6,212.0 381.9,212.0 382.1,212.0 382.3,212.0 382.6,212.0 382.8,212.0 383.1,212.0 383.3,212.0 383.5,212.1 383.8,212.0 384.0,212.1 384.2,212.1 384.5,212.0 384.7,212.0 385.0,212.0 385.2,211.9 385.4,211.9 385.7,211.8 385.9,211.9 386.1,211.9 386.4,211.9 386.6,211.8 386.9,211.8 387.1,211.6 387.3,211.7 387.6,211.7 387.8,211.6 388.0,211.6 388.3,211.6 388.5,211.5 388.8,211.5 389.0,211.5 389.2,211.5 389.5,211.6 389.7,211.7 389.9,211.8 390.2,211.8 390.4,211.7 390.7,211.7 390.9,211.7 391.1,211.7 391.4,211.6 391.6,211.6 391.8,211.6 392.1,211.7 392.3,211.7 392.6,211.6 392.8,211.7 393.0,211.6 393.3,211.5 393.5,211.5 393.7,211.5 394.0,211.4 394.2,211.3 394.5,211.2 394.7,211.3 394.9,211.2 395.2,211.3 395.4,211.3 395.6,211.4 395.9,211.5 396.1,211.5 396.4,211.5 396.6,211.6 396.8,211.5 397.1,211.4 397.3,211.3 397.5,211.2 397.8,211.3 398.0,211.2 398.3,211.2 398.5,211.2 398.7,211.4 399.0,211.2 399.2,211.4 399.4,211.4 399.7,211.4 399.9,211.4 400.2,211.4 400.4,211.5 400.6,211.4 400.9,211.4 401.1,211.3 401.3,211.3 401.6,211.3 401.8,211.3 402.1,211.4 402.3,211.3 402.5,211.3 402.8,211.4 403.0,211.3 403.2,211.4 403.5,211.3 403.7,211.2 404.0,211.3 404.2,211.4 404.4,211.4 404.7,211.3 404.9,211.2 405.1,211.0 405.4,210.9 405.6,211.0 405.9,210.9 406.1,211.1 406.3,211.0 406.6,211.0 406.8,211.0 407.0,211.1 407.3,211.2 407.5,211.1 407.8,211.1 408.0,211.0 408.2,211.0 408.5,211.1 408.7,211.1 408.9,211.1 409.2,211.2 409.4,211.3 409.7,211.1 409.9,211.1 410.1,210.9 410.4,210.9 410.6,210.9 410.8,210.9 411.1,210.9 411.3,210.8 411.6,210.7 411.8,210.7 412.0,210.9 412.3,210.8 412.5,210.7 412.7,210.8 413.0,210.8 413.2,211.0 413.5,211.0 413.7,211.0 413.9,210.8 414.2,210.7 414.4,210.6 414.6,210.7 414.9,210.6 415.1,210.7 415.4,210.6 415.6,210.7 415.8,210.8 416.1,210.7 416.3,210.6 416.5,210.6 416.8,210.6 417.0,210.6 417.3,210.5 417.5,210.6 417.7,210.5 418.0,210.6 418.2,210.7 418.4,210.7 418.7,210.7 418.9,210.7 419.2,210.7 419.4,210.6 419.6,210.6 419.9,210.5 420.1,210.6 420.3,210.5 420.6,210.4 420.8,210.3 421.1,210.2 421.3,210.3 421.5,210.4 421.8,210.4 422.0,210.3 422.2,210.3 422.5,210.2 422.7,210.2 423.0,210.1 423.2,210.2 423.4,210.0 423.7,210.0 423.9,210.1 424.1,210.0 424.4,210.0 424.6,210.1 424.9,210.1 425.1,210.2 425.3,210.2 425.6,210.1 425.8,210.2 426.0,210.2 426.3,210.1 426.5,210.1 426.8,210.1 427.0,210.1 427.2,210.0 427.5,210.1 427.7,210.2 427.9,210.2 428.2,210.1 428.4,210.0 428.7,210.0 428.9,210.0 429.1,210.1 429.4,210.2 429.6,210.2 429.8,210.2 430.1,210.3 430.3,210.2 430.6,210.2 430.8,210.2 431.0,210.1 431.3,210.1 431.5,210.1 431.7,210.1 432.0,210.1 432.2,210.0 432.5,210.1 432.7,210.0 432.9,210.1 433.2,210.1 433.4,210.1 433.6,210.1 433.9,210.2 434.1,210.2 434.4,210.2 434.6,210.1 434.8,210.0 435.1,210.0 435.3,210.0 435.5,209.9 435.8,210.0 436.0,210.1 436.3,209.9 436.5,209.9 436.7,210.0 437.0,210.0 437.2,210.1 437.4,210.1 437.7,210.1 437.9,210.0 438.2,210.1 438.4,210.1 438.6,210.0 438.9,210.0 439.1,210.0 439.3,210.0 439.6,210.1 439.8,210.2 440.1,210.2 440.3,210.1 440.5,210.1 440.8,210.1 441.0,210.2 441.2,210.3 441.5,210.1 441.7,210.0 442.0,210.0 442.2,209.9 442.4,209.8 442.7,209.8 442.9,209.9 443.1,209.9 443.4,209.9 443.6,210.0 443.9,210.0 444.1,210.0 444.3,210.0 444.6,209.9 444.8,210.0 445.1,210.0 445.3,210.0 445.5,210.0 445.8,210.0 446.0,209.9 446.2,210.1 446.5,210.2 446.7,210.2 447.0,210.1 447.2,210.2 447.4,210.1 447.7,210.1 447.9,210.0 448.1,210.0 448.4,210.0 448.6,210.0 448.9,210.1 449.1,210.1 449.3,210.0 449.6,210.0 449.8,209.9 450.0,209.9 450.3,209.9 450.5,209.8 450.8,209.9 451.0,209.8 451.2,209.8 451.5,209.8 451.7,209.9 451.9,209.8 452.2,209.8 452.4,209.8 452.7,209.8 452.9,209.8 453.1,209.7 453.4,209.8 453.6,209.8 453.8,209.9 454.1,210.1 454.3,210.1 454.6,210.1 454.8,210.1 455.0,210.1 455.3,210.0 455.5,210.0 455.7,210.0 456.0,209.9 456.2,210.0 456.5,209.9 456.7,210.1 456.9,210.0 457.2,210.0 457.4,210.0 457.6,210.1 457.9,210.0 458.1,210.0 458.4,210.0 458.6,210.0 458.8,210.1 459.1,210.1 459.3,210.2 459.5,210.3 459.8,210.3 460.0,210.4 460.3,210.3 460.5,210.2 460.7,210.3 461.0,210.3 461.2,210.3 461.4,210.3 461.7,210.3 461.9,210.4 462.2,210.3 462.4,210.3 462.6,210.3 462.9,210.3 463.1,210.3 463.3,210.3 463.6,210.4 463.8,210.4 464.1,210.5 464.3,210.4 464.5,210.4 464.8,210.3 465.0,210.3 465.2,210.3 465.5,210.2 465.7,210.2 466.0,210.2 466.2,210.1 466.4,210.2 466.7,210.2 466.9,210.2 467.1,210.2 467.4,210.3 467.6,210.4 467.9,210.3 468.1,210.4 468.3,210.5 468.6,210.5 468.8,210.5 469.0,210.5 469.3,210.5 469.5,210.6 469.8,210.7 470.0,210.6 470.2,210.7 470.5,210.6 470.7,210.7 470.9,210.6 471.2,210.7 471.4,210.7 471.7,210.7 471.9,210.7 472.1,210.6 472.4,210.7 472.6,210.6 472.8,210.6 473.1,210.6 473.3,210.7 473.6,210.6 473.8,210.6 474.0,210.7 474.3,210.6 474.5,210.5 474.7,210.6 475.0,210.6 475.2,210.6 475.5,210.7 475.7,210.6 475.9,210.6 476.2,210.7 476.4,210.7 476.6,210.6 476.9,210.5 477.1,210.4 477.4,210.4 477.6,210.5 477.8,210.4 478.1,210.4 478.3,210.3 478.5,210.4 478.8,210.5 479.0,210.4 479.3,210.4 479.5,210.6 479.7,210.6 480.0,210.6 480.2,210.6 480.4,210.5 480.7,210.5 480.9,210.5 481.2,210.6 481.4,210.5 481.6,210.5 481.9,210.4 482.1,210.4 482.3,210.4 482.6,210.5 482.8,210.4 483.1,210.5 483.3,210.4 483.5,210.5 483.8,210.5 484.0,210.5 484.2,210.4 484.5,210.5 484.7,210.5 485.0,210.4 485.2,210.3 485.4,210.3 485.7,210.3 485.9,210.4 486.1,210.4 486.4,210.4 486.6,210.4 486.9,210.3 487.1,210.2 487.3,210.2 487.6,210.2 487.8,210.2 488.0,210.2 488.3,210.2 488.5,210.3 488.8,210.4 489.0,210.5 489.2,210.5 489.5,210.5 489.7,210.5 489.9,210.4 490.2,210.5 490.4,210.5 490.7,210.5 490.9,210.6 491.1,210.6 491.4,210.6 491.6,210.5 491.8,210.6 492.1,210.7 492.3,210.6 492.6,210.7 492.8,210.8 493.0,210.8 493.3,210.8 493.5,210.9 493.7,210.9 494.0,210.9 494.2,210.9 494.5,211.0 494.7,211.1 494.9,211.0 495.2,211.0 495.4,210.9 495.6,210.8 495.9,210.8 496.1,210.7 496.4,210.7 496.6,210.7 496.8,210.7 497.1,210.7 497.3,210.7 497.5,210.7 497.8,210.6 498.0,210.5 498.3,210.5 498.5,210.5 498.7,210.6 499.0,210.5 499.2,210.5 499.4,210.5 499.7,210.6 499.9,210.6 500.2,210.6 500.4,210.6 500.6,210.5 500.9,210.6 501.1,210.4 501.3,210.4 501.6,210.5 501.8,210.5 502.1,210.6 502.3,210.6 502.5,210.6 502.8,210.5 503.0,210.5 503.2,210.5 503.5,210.6 503.7,210.5 504.0,210.6 504.2,210.5 504.4,210.6 504.7,210.7 504.9,210.6 505.1,210.7 505.4,210.6 505.6,210.6 505.9,210.6 506.1,210.7 506.3,210.6 506.6,210.6 506.8,210.5 507.0,210.6 507.3,210.5 507.5,210.6 507.8,210.7 508.0,210.6 508.2,210.6 508.5,210.6 508.7,210.6 508.9,210.7 509.2,210.8 509.4,210.7 509.7,210.7 509.9,210.8 510.1,210.8 510.4,210.8 510.6,210.9 510.8,211.0 511.1,211.1 511.3,211.0 511.6,211.0 511.8,211.1 512.0,211.2 512.3,211.2 512.5,211.1 512.7,211.1 513.0,211.0 513.2,211.0 513.5,211.0 513.7,210.9 513.9,210.9 514.2,210.8 514.4,210.8 514.6,210.7 514.9,210.7 515.1,210.7 515.4,210.6 515.6,210.7 515.8,210.6 516.1,210.7 516.3,210.6 516.5,210.7 516.8,210.7 517.0,210.7 517.3,210.7 517.5,210.6 517.7,210.6 518.0,210.6 518.2,210.5 518.4,210.4 518.7,210.3 518.9,210.4 519.2,210.3 519.4,210.3 519.6,210.5 519.9,210.4 520.1,210.4 520.3,210.4 520.6,210.5 520.8,210.6 521.1,210.6 521.3,210.7 521.5,210.7 521.8,210.8 522.0,210.7 522.2,210.6 522.5,210.7 522.7,210.7 523.0,210.8 523.2,210.7 523.4,210.6 523.7,210.6 523.9,210.7 524.1,210.8 524.4,210.9 524.6,211.0 524.9,211.0 525.1,211.0 525.3,211.0 525.6,210.9 525.8,211.0 526.0,211.1 526.3,211.0 526.5,211.1 526.8,211.0 527.0,211.0 527.2,210.9 527.5,210.9 527.7,210.9 527.9,210.9 528.2,211.0 528.4,211.0 528.7,211.1 528.9,211.1 529.1,211.1 529.4,211.1 529.6,211.1 529.8,211.2 530.1,211.2 530.3,211.3 530.6,211.3 530.8,211.2 531.0,211.2 531.3,211.2 531.5,211.2 531.7,211.3 532.0,211.3 532.2,211.2 532.5,211.3 532.7,211.3 532.9,211.3 533.2,211.2 533.4,211.3 533.6,211.3 533.9,211.4 534.1,211.4 534.4,211.5 534.6,211.5 534.8,211.4 535.1,211.5 535.3,211.5 535.5,211.5 535.8,211.4 536.0,211.4 536.3,211.4 536.5,211.4 536.7,211.3 537.0,211.3 537.2,211.4 537.4,211.4 537.7,211.5 537.9,211.5 538.2,211.5 538.4,211.6 538.6,211.7 538.9,211.7 539.1,211.8 539.3,211.7 539.6,211.8 539.8,211.7 540.1,211.8 540.3,211.8 540.5,211.8 540.8,211.8 541.0,211.7 541.2,211.6 541.5,211.6 541.7,211.6 542.0,211.6 542.2,211.6 542.4,211.5 542.7,211.5 542.9,211.5 543.1,211.5 543.4,211.4 543.6,211.5 543.9,211.4 544.1,211.5 544.3,211.5 544.6,211.4 544.8,211.4" fill="none" stroke="#4051b5" stroke-width="1.4"/>
<text x="76.0" y="169.0" text-anchor="start" fill="#4051b5" font-weight="bold">frazione di teste</text>
<line x1="70.0" y1="265.0" x2="70.0" y2="270.0" stroke="currentColor" stroke-width="1"/>
<text x="70.0" y="283.0" text-anchor="middle" fill="currentColor">1</text>
<line x1="188.7" y1="265.0" x2="188.7" y2="270.0" stroke="currentColor" stroke-width="1"/>
<text x="188.7" y="283.0" text-anchor="middle" fill="currentColor">2.500</text>
<line x1="307.5" y1="265.0" x2="307.5" y2="270.0" stroke="currentColor" stroke-width="1"/>
<text x="307.5" y="283.0" text-anchor="middle" fill="currentColor">5.000</text>
<line x1="426.2" y1="265.0" x2="426.2" y2="270.0" stroke="currentColor" stroke-width="1"/>
<text x="426.2" y="283.0" text-anchor="middle" fill="currentColor">7.500</text>
<line x1="545.0" y1="265.0" x2="545.0" y2="270.0" stroke="currentColor" stroke-width="1"/>
<text x="545.0" y="283.0" text-anchor="middle" fill="currentColor">10.000</text>
</svg>
<figcaption>Una sequenza di 10 000 lanci di una moneta equilibrata (seme 8). Sopra, la differenza tra il numero di teste e la metà dei lanci: non torna verso zero, anzi si allontana; alla fine vale 71. Sotto, la frazione di teste: si stabilizza vicino a 1/2 e alla fine vale 0,5071. Una differenza di qualche decina di teste, divisa per 10 000 lanci, pesa pochissimo: la legge dei grandi numeri funziona per diluizione, non per compensazione.</figcaption>
</figure>

La legge dei grandi numeri, dunque, non funziona per **compensazione**, ma per **diluizione**. Supponiamo che una moneta equilibrata dia dieci teste di fila. Dopo altri 990 lanci, il numero atteso di teste è $10+495=505$ su 1000, e la frazione attesa è 0,505; dopo 99 990 lanci in più è $10+49\,995=50\,005$ su 100 000, cioè 0,50005. Le dieci teste iniziali non vengono mai «restituite»: la differenza attesa resta 10 per sempre. Semplicemente, divise per un numero di lanci sempre più grande, pesano sempre meno. La moneta non ha memoria, e la prossima testa ha probabilità 1/2 come la prima.

### Quante osservazioni servono? {: #quante-prove }

Il limite di Čebyšëv per la media campionaria si può leggere al contrario: invece di chiedersi quanto è probabile sbagliare con $n$ osservazioni, ci si chiede quante osservazioni servono per sbagliare raramente. Se vogliamo che la media cada entro $\varepsilon$ da $\mu$ con probabilità almeno $1-\delta$, basta che il limite $\sigma^2/(n\varepsilon^2)$ non superi $\delta$, cioè

$$
n\ge\frac{\sigma^2}{\delta\,\varepsilon^2}.
$$

Un problema di questo tipo ricompare nella Settimana 10, e possiamo già risolverlo nella versione prudente. Vogliamo stimare il tempo medio di esecuzione di un programma eseguendolo più volte nelle stesse condizioni. Sappiamo che la varianza del tempo di esecuzione è $\sigma^2=4$ s². Quante esecuzioni servono perché la media dei tempi misurati cada entro mezzo secondo dal tempo medio vero con probabilità almeno del 95%? Qui $\varepsilon=0{,}5$ s e $\delta=0{,}05$, quindi

$$
n\ge\frac{4}{0{,}05\cdot0{,}5^2}=\frac{4}{0{,}0125}=320.
$$

Con 320 esecuzioni la garanzia vale qualunque sia la distribuzione dei tempi. Con il [teorema del limite centrale della Settimana 9](../settimana_09/index.md#quante-esecuzioni) si trova che ne bastano 62: anche qui il prezzo della prudenza è un fattore cinque. Lo stesso calcolo dice quante simulazioni servono per stimare una probabilità con il metodo Monte Carlo. Con il limite $1/(4n\varepsilon^2)$ delle frequenze, per avere un errore al più di un punto percentuale ($\varepsilon=0{,}01$) con probabilità almeno del 95% bastano $n\ge1/(4\cdot0{,}05\cdot0{,}0001)=50\,000$ simulazioni, qualunque sia la probabilità da stimare.

#### Esplora: la media che si stabilizza {: #widget-lgn }

Il widget simula fino a 50 sequenze indipendenti di lanci di una moneta o di un dado e ne disegna le medie progressive, con l’asse orizzontale in scala logaritmica: 1, 10, 100, 1000, 10 000 lanci sono equidistanti. La banda verde è il margine $\mu\pm\varepsilon$. Alla posizione $n$ scelta, le sequenze con la media dentro la banda sono blu, quelle fuori sono rosse; sotto il grafico trovi la frazione di sequenze fuori dalla banda e il limite di Čebyšëv $\sigma^2/(n\varepsilon^2)$. Prima di muovere i cursori, prevedi: se dimezzi $\varepsilon$, di quanto deve crescere $n$ perché il limite resti lo stesso?

<div class="s08-box" id="s08-lgn">
  <label>Esperimento: <select id="s08-lgn-e">
    <option value="moneta">moneta (μ = 0,5)</option>
    <option value="dado">dado (μ = 3,5)</option>
  </select></label>
  <label>sequenze: <input type="range" id="s08-lgn-m" min="1" max="50" step="1" value="20"> <b id="s08-lgn-mv">20</b></label><br>
  <label>n = <input type="range" id="s08-lgn-n" min="1" max="4" step="0.01" value="3"> <b id="s08-lgn-nv">1000</b></label>
  <label>ε = <input type="range" id="s08-lgn-eps" min="0.02" max="0.3" step="0.01" value="0.05"> <b id="s08-lgn-epsv">0,05</b></label>
  <button type="button" id="s08-lgn-b">Nuove sequenze</button>
  <svg class="s08-svg" id="s08-lgn-svg" viewBox="0 0 560 290" role="img" aria-label="Medie progressive di molte sequenze di lanci, con l’asse dei lanci in scala logaritmica da 1 a 10000, una banda verde attorno alla media teorica e una linea verticale sul numero di lanci scelto. Le sequenze sono blu se a quel punto la loro media è nella banda, rosse se è fuori."></svg>
  <div class="s08-out" id="s08-lgn-out"></div>
</div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  var NMAX = 10000, MMAX = 50, seed = 1713, cum = null;
  var se = document.getElementById('s08-lgn-e'), sm = document.getElementById('s08-lgn-m');
  var sn = document.getElementById('s08-lgn-n'), seps = document.getElementById('s08-lgn-eps');
  var btn = document.getElementById('s08-lgn-b'), svg = document.getElementById('s08-lgn-svg');
  var out = document.getElementById('s08-lgn-out'), NS = 'http://www.w3.org/2000/svg';
  function rng(a) {
    return function () {
      a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function simula() {
    var r = rng(seed), dado = se.value === 'dado';
    cum = [];
    for (var j = 0; j < MMAX; j++) {
      var c = new Float64Array(NMAX + 1), s = 0;
      for (var i = 1; i <= NMAX; i++) { s += dado ? 1 + Math.floor(r() * 6) : (r() < 0.5 ? 1 : 0); c[i] = s; }
      cum.push(c);
    }
  }
  function it(x, d) { return x.toFixed(d).replace('.', ','); }
  function el(tag, attrs, txt) {
    var e = document.createElementNS(NS, tag);
    for (var a in attrs) e.setAttribute(a, attrs[a]);
    if (txt != null) e.textContent = txt;
    svg.appendChild(e); return e;
  }
  function render() {
    var dado = se.value === 'dado', mu = dado ? 3.5 : 0.5, v = dado ? 35 / 12 : 0.25;
    var M = +sm.value, n = Math.round(Math.pow(10, +sn.value)), eps = +seps.value;
    document.getElementById('s08-lgn-mv').textContent = M;
    document.getElementById('s08-lgn-nv').textContent = n.toLocaleString('it-IT');
    document.getElementById('s08-lgn-epsv').textContent = it(eps, 2);
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var x0 = 55, x1 = 540, y0 = 240, y1 = 15, lo = dado ? 1 : 0, hi = dado ? 6 : 1;
    function X(k) { return x0 + Math.log(k) / Math.LN10 / 4 * (x1 - x0); }
    function Y(m) { return y0 - (m - lo) / (hi - lo) * (y0 - y1); }
    el('rect', { x: x0, y: Y(Math.min(hi, mu + eps)), width: x1 - x0, height: Y(Math.max(lo, mu - eps)) - Y(Math.min(hi, mu + eps)), fill: '#2e9e5b', 'fill-opacity': 0.18 });
    el('line', { x1: x0, y1: y0, x2: x1, y2: y0, stroke: 'currentColor' });
    el('line', { x1: x0, y1: y0, x2: x0, y2: y1, stroke: 'currentColor' });
    [1, 10, 100, 1000, 10000].forEach(function (k) {
      el('line', { x1: X(k), y1: y0, x2: X(k), y2: y0 + 5, stroke: 'currentColor' });
      el('text', { x: X(k), y: y0 + 19, 'text-anchor': 'middle', fill: 'currentColor' }, k.toLocaleString('it-IT'));
    });
    el('text', { x: (x0 + x1) / 2, y: y0 + 40, 'text-anchor': 'middle', fill: 'currentColor' }, 'numero di lanci (scala logaritmica)');
    (dado ? [1, 2, 3, 4, 5, 6] : [0, 0.25, 0.5, 0.75, 1]).forEach(function (m) {
      el('text', { x: x0 - 8, y: Y(m) + 4, 'text-anchor': 'end', fill: 'currentColor' }, it(m, dado ? 0 : 2));
    });
    el('line', { x1: x0, y1: Y(mu), x2: x1, y2: Y(mu), stroke: '#e07a1f', 'stroke-width': 1.5, 'stroke-dasharray': '6,4' });
    var ks = [];
    for (var t = 0; t <= 320; t++) { var k = Math.round(Math.pow(10, 4 * t / 320)); if (k <= n && ks[ks.length - 1] !== k) ks.push(k); }
    if (ks[ks.length - 1] !== n) ks.push(n);
    var fuori = 0;
    for (var j = 0; j < M; j++) {
      var c = cum[j], mn = c[n] / n, f = Math.abs(mn - mu) >= eps - 1e-12;
      if (f) fuori++;
      var pts = ks.map(function (k) { return X(k).toFixed(1) + ',' + Y(c[k] / k).toFixed(1); });
      el('polyline', { points: pts.join(' '), fill: 'none', stroke: f ? '#e03a3a' : '#4051b5', 'stroke-width': 1.3, 'stroke-opacity': 0.75 });
    }
    el('line', { x1: X(n), y1: y0, x2: X(n), y2: y1, stroke: '#2e9e5b', 'stroke-width': 2, 'stroke-dasharray': '5,4' });
    var lim = v / (n * eps * eps);
    out.innerHTML = 'Dopo n = ' + n.toLocaleString('it-IT') + ' lanci, <b class="s08-vera">' + fuori + ' sequenze su ' + M +
      '</b> (' + it(100 * fuori / M, 0) + '%) hanno la media fuori dalla banda ' + it(mu, 1) + ' ± ' + it(eps, 2) + '. ' +
      'Čebyšëv garantisce che la probabilità di finire fuori sia <b class="s08-lim">al più ' +
      (lim >= 1 ? '1 (nessuna informazione)' : it(100 * lim, 1) + '%') + '</b>, perché σ²/(nε²) = ' +
      it(v, v < 1 ? 2 : 3) + ' / (' + n.toLocaleString('it-IT') + ' · ' + it(eps * eps, 4) + ') = ' + it(lim, lim >= 10 ? 0 : 3) + '.';
  }
  se.addEventListener('change', function () { simula(); render(); });
  [sm, sn, seps].forEach(function (s) { s.addEventListener('input', render); });
  btn.addEventListener('click', function () { seed = Math.floor(Math.random() * 1e9); simula(); render(); this.blur(); });
  simula();
  render();
});
</script>

Con la moneta, $\varepsilon=0{,}05$ e $n=100$, il limite di Čebyšëv è 1, e in effetti molte sequenze stanno ancora fuori dalla banda. Con $n=1000$ il limite scende al 10% e le sequenze rosse diventano rare; con $n=10\,000$ il limite è l’1% e le sequenze sono tutte blu. Se dimezzi $\varepsilon$, il limite si moltiplica per quattro: per riportarlo al valore di prima serve un $n$ quattro volte più grande. È la legge della radice quadrata vista dall’altra parte.

### Laboratorio: monete a milioni {: #lab-lgn }

Il terzo script lancia una moneta un milione di volte e stampa, a cinque tappe, la differenza tra le teste e la metà dei lanci e la frazione di teste. Poi ripete diecimila volte esperimenti da 100, 1000 e 10 000 lanci, conta quante volte la frazione di teste finisce ad almeno 0,02 da 1/2 e confronta il risultato con il limite di Čebyšëv $1/(4n\varepsilon^2)$. Per contare le sequenze usa direttamente il numero di teste, che ha distribuzione binomiale: è più veloce che simulare i lanci uno per uno.

<div class="psi-exec" markdown="1">
```python
import numpy as np

rng = np.random.default_rng(1740)

# Una sola moneta, lanciata un milione di volte (1 = testa).
lanci = rng.integers(0, 2, 1_000_000)
teste = np.cumsum(lanci)
print("        n   teste - n/2   frazione di teste")
for n in [100, 1_000, 10_000, 100_000, 1_000_000]:
    print(f"{n:9d} {teste[n - 1] - n // 2:13d} {teste[n - 1] / n:13.4f}")

# Tante sequenze indipendenti: quante finiscono a distanza
# almeno 0,02 da 1/2? Lavoriamo con i conteggi interi per non
# avere problemi di arrotondamento: |teste - n/2| >= 0,02·n.
prove = 10_000
print("\nSequenze con |frazione - 0,5| >= 0,02")
for n in [100, 1_000, 10_000]:
    k = rng.binomial(n, 0.5, prove)
    fuori = np.mean(np.abs(2 * k - n) >= n // 25)   # 0,02·2n = n/25
    limite = min(1.0, 0.25 / (n * 0.02**2))
    print(f"n = {n:6d}: frazione fuori {fuori:.4f}   "
          f"Čebyšëv <= {limite:.4f}")
```
</div>

Nella prima tabella la differenza tra teste e metà dei lanci cresce, da poche unità fino a circa mille, mentre la frazione si avvicina a 0,5: è la diluizione dell’Atto VII, su una scala più grande. Nella seconda tabella la frazione di sequenze lontane da 1/2 scende da circa il 77% con 100 lanci a circa il 22% con 1000 e a quasi zero con 10 000; il limite di Čebyšëv, 1, 0,625 e 0,0625, è sempre sopra le frequenze vere, come deve essere. Prova a cambiare il margine `0,02` in `0,01`: nel codice corrisponde a sostituire `n // 25` con `n // 50`.

### La legge dei grandi numeri in informatica {: #lgn-informatica }

La legge dei grandi numeri è la ragione per cui funzionano molte tecniche quotidiane dell’informatica. Il **metodo Monte Carlo** stima una probabilità o un valore atteso simulando molte prove indipendenti e facendo la media: la legge garantisce che la stima si avvicina al valore vero, e la legge della radice quadrata dice quanto velocemente, con un errore che scende come $1/\sqrt n$. Lo abbiamo usato in quasi tutti i laboratori del corso.

Nel **benchmarking**, per misurare il tempo di esecuzione di un programma lo si esegue molte volte e si fa la media, e il calcolo del numero di esecuzioni che abbiamo appena visto dice quante ne servono. Qui le ipotesi contano. Le esecuzioni devono essere indipendenti e identicamente distribuite, e spesso non lo sono: le prime esecuzioni trovano la cache vuota e sono più lente, il processore può rallentare scaldandosi, un altro programma può disturbare alcune misure. Per questo i benchmark seri scartano le prime esecuzioni «di riscaldamento» e cercano di mantenere le condizioni costanti.

La stessa legge spiega perché il **carico aggregato** di molti utenti indipendenti è prevedibile anche se ogni utente è imprevedibile: la media di molte richieste indipendenti varia poco, e su questo si basano il dimensionamento dei server e, fuori dall’informatica, le assicurazioni. Infine, la legge ci ricorda i suoi limiti. Se le variabili hanno varianza enorme, come certi tempi di risposta con code molto pesanti, la media converge così lentamente da essere inservibile in pratica; ne parleremo nella [Settimana 9](../settimana_09/index.md#cauchy). E se le osservazioni non sono indipendenti, la legge può valere oppure no: è il tema della lettura facoltativa che segue.

## Lettura A — Markov, Nekrasov e la prima catena {: #catene .psi-facoltativo }

Questa lettura è facoltativa e non è richiesta all’esame. Racconta come una disputa sulla legge dei grandi numeri portò Andrej Markov a inventare le catene che portano il suo nome, uno degli strumenti più usati dell’informatica moderna.

All’inizio del Novecento il matematico moscovita Pavel Nekrasov, che aveva forti interessi filosofici e religiosi, sostenne che l’indipendenza fosse una condizione **necessaria** per la legge dei grandi numeri. Ne traeva conseguenze ambiziose: poiché le statistiche sociali, come il numero di matrimoni o di crimini in un anno, mostrano frequenze stabili, gli atti individuali da cui nascono dovevano essere indipendenti, e quindi, secondo lui, liberi. Markov, che aveva un carattere notoriamente polemico e un’avversione per gli argomenti matematici usati a fini filosofici, si accorse che l’affermazione era semplicemente falsa, e decise di dimostrarlo nel modo più convincente: con un controesempio.

Nel 1906 pubblicò un lavoro in cui considerava una successione di variabili in cui ciascuna dipende dalla precedente: la probabilità che la prova successiva dia un certo esito cambia a seconda dell’esito di quella attuale, ma non dipende da come ci si è arrivati. È quella che oggi chiamiamo **catena di Markov**. Markov dimostrò che, per catene di questo tipo, la frequenza di un esito converge comunque in probabilità a un valore fisso: la legge dei grandi numeri vale anche senza indipendenza, purché la dipendenza tra osservazioni lontane si attenui. La dimostrazione usa ancora la disuguaglianza di Čebyšëv, il suo strumento preferito, con una differenza: nella varianza della somma compaiono anche le covarianze tra le variabili, come nella formula generale dell’Atto VI, e bisogna mostrare che non crescono troppo.

Nel 1913 Markov applicò la sua idea a un testo letterario, il romanzo in versi *Evgenij Onegin* di Puškin. Prese le prime 20 000 lettere, le classificò in vocali e consonanti e contò quante volte una vocale era seguita da un’altra vocale. Le vocali erano circa il 43% delle lettere. Se le lettere fossero indipendenti, una vocale sarebbe seguita da una vocale circa il 43% delle volte, e ci si aspetterebbero circa 3700 coppie di vocali consecutive; Markov ne contò soltanto 1104. Le lettere di un testo dipendono dalle precedenti, e la catena di Markov descriveva quella dipendenza molto meglio del modello indipendente.

Da allora le catene di Markov sono diventate uno strumento ovunque. Descrivono code e protocolli di rete, la navigazione di un utente che passa da una pagina all’altra (l’idea alla base del primo PageRank di Google), la generazione di testo che sceglie la parola successiva in base alle precedenti, e i metodi Monte Carlo per l’inferenza bayesiana, che fanno la media lungo una catena di campioni dipendenti e si reggono proprio sulla legge dei grandi numeri di Markov. Una disputa sulla necessità dell’indipendenza ha prodotto uno dei modelli più fecondi della matematica applicata.

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

### Esercizio 6 — Somme di dadi e di monete {: #esercizio-6 }

Sia $X$ il risultato di un dado equilibrato e $Y$ l’indicatrice di testa nel lancio di una moneta equilibrata, indipendente dal dado. (a) Calcola la media e la varianza di $X+Y$ e di $X-Y$. (b) Confronta la varianza di $3X$ con quella della somma di tre dadi indipendenti $X_1+X_2+X_3$. (c) Perché le due varianze del punto (b) sono diverse, se le due variabili hanno la stessa media?

??? esempio-svolto "Soluzione ragionata"
    (a) $\mathbb{E}[Y]=1/2$ e $\operatorname{Var}(Y)=\frac12\cdot\frac12=\frac14$. Quindi $\mathbb{E}[X+Y]=4$ e $\mathbb{E}[X-Y]=3$, mentre le varianze sono uguali: $35/12+1/4=38/12=19/6\approx3{,}17$, perché per variabili indipendenti la varianza della differenza è la somma delle varianze. (b) $\operatorname{Var}(3X)=9\cdot35/12=26{,}25$; $\operatorname{Var}(X_1+X_2+X_3)=3\cdot35/12=8{,}75$. Entrambe hanno media 10,5. (c) In $3X$ c’è un dado solo, e il suo scarto viene triplicato; nella somma di tre dadi indipendenti gli scarti si compensano in parte. Le variabili $X$, $X$, $X$ non sono indipendenti tra loro, e la regola della somma delle varianze non si applica.

### Esercizio 7 — La media di molte misure {: #esercizio-7 }

Il tempo di risposta di un servizio ha media sconosciuta $\mu$ e deviazione standard 40 ms. Si misurano $n$ richieste indipendenti, eseguite nelle stesse condizioni, e se ne fa la media. (a) Quali sono la media e la deviazione standard della media di 100 richieste? (b) Con Čebyšëv, quanto è probabile, al più, che la media di 100 richieste sbagli di almeno 10 ms? (c) Quante richieste servono perché quella probabilità sia al più del 5%?

??? esempio-svolto "Soluzione ragionata"
    (a) La media campionaria ha media $\mu$ e deviazione standard $40/\sqrt{100}=4$ ms, cioè varianza 16 ms². (b) $P(|\bar X_{100}-\mu|\ge10)\le16/10^2=0{,}16$. (c) Serve $1600/(n\cdot100)\le0{,}05$, cioè $n\ge1600/(100\cdot0{,}05)=320$ richieste.

### Esercizio 8 — Quante simulazioni? {: #esercizio-8 }

Vuoi stimare con una simulazione Monte Carlo la probabilità $p$ che un algoritmo randomizzato fallisca, contando la frazione di fallimenti su $n$ esecuzioni indipendenti. (a) Quante esecuzioni garantiscono, con Čebyšëv, un errore inferiore a 0,01 con probabilità almeno del 95%, senza sapere nulla di $p$? (b) E se sai già che $p$ è circa 0,1? (c) Perché nel secondo caso ne servono meno?

??? esempio-svolto "Soluzione ragionata"
    (a) Con il limite $1/(4n\varepsilon^2)\le0{,}05$ e $\varepsilon=0{,}01$: $n\ge1/(4\cdot0{,}05\cdot0{,}0001)=50\,000$. (b) Con $p(1-p)=0{,}1\cdot0{,}9=0{,}09$: $n\ge0{,}09/(0{,}05\cdot0{,}0001)=18\,000$. (c) La varianza di una variabile bernoulliana, $p(1-p)$, è massima per $p=1/2$; un evento raro ha frequenza meno variabile, e la sua stima, in termini assoluti, richiede meno prove. Attenzione però: per $p$ molto piccolo un errore di 0,01 può essere grande rispetto a $p$ stesso.

### Esercizio 9 — Il lotto di ante, rivisto {: #esercizio-9 }

Nell’[esercizio delle ante](#ante) abbiamo garantito che ogni anta è difettosa con probabilità $p\le0{,}125$. Un lotto contiene 1000 ante, difettose in modo indipendente l’una dall’altra con la stessa probabilità $p$, e viene rifiutato se la frazione di difettose supera il 15%. (a) Nel caso peggiore, $p=0{,}125$, con quale probabilità al più il lotto viene rifiutato, secondo Čebyšëv? (b) E se il lotto contiene 10 000 ante? (c) Perché è giusto ragionare sul caso peggiore $p=0{,}125$?

??? esempio-svolto "Soluzione ragionata"
    (a) La frazione di difettose è la media di 1000 indicatrici con media $p$ e varianza $p(1-p)$. Con $p=0{,}125$, per superare il 15% la frazione deve allontanarsi dalla sua media di almeno $0{,}025$, quindi $P(\text{rifiuto})\le\dfrac{0{,}125\cdot0{,}875}{1000\cdot0{,}025^2}=\dfrac{0{,}109375}{0{,}625}=0{,}175$. (b) Con 10 000 ante il limite si divide per 10: 0,0175. È la legge dei grandi numeri al lavoro: più grande è il lotto, più la frazione di difettose è vicina alla probabilità del singolo pezzo, e meno è probabile un rifiuto per sfortuna. (c) Il limite $p(1-p)/\big(n(0{,}15-p)^2\big)$ cresce con $p$ nell’intervallo da 0 a 0,125: il numeratore cresce e il denominatore si riduce, perché la distanza dalla soglia diminuisce. Il valore massimo è quindi quello con $p=0{,}125$, e vale per ogni $p$ compatibile con quello che sappiamo.

### Esercizio 10 — Dieci teste di fila {: #esercizio-10 }

Una moneta equilibrata ha appena dato dieci teste di fila. Un collega dice: «Per la legge dei grandi numeri, adesso devono uscire più croci, così la frequenza torna a 1/2». (a) Qual è la probabilità di testa al prossimo lancio? (b) Dopo 990 lanci in più, qual è il numero atteso di teste in tutto? E la frazione attesa? (c) Spiega in due frasi perché il collega sbaglia.

??? esempio-svolto "Soluzione ragionata"
    (a) 1/2: i lanci sono indipendenti, e la moneta non ha memoria. (b) Nei 990 lanci nuovi il numero atteso di teste è 495; in tutto $10+495=505$ su 1000, una frazione attesa di 0,505. La differenza attesa tra teste e croci resta 10. (c) La legge dei grandi numeri non dice che le croci «recuperano» le teste in eccesso: dice che la frazione si avvicina a 1/2 perché l’eccesso, che resta, viene diviso per un numero di lanci sempre più grande. Funziona per diluizione, non per compensazione.

## Errori da evitare {: #errori }

Il primo gruppo di errori riguarda le ipotesi delle disuguaglianze. La disuguaglianza di Markov vale soltanto per variabili che non sono mai negative: temperature, differenze, profitti e perdite possono esserlo, e allora bisogna prima spostare la variabile, come nell’esercizio 5, o usare Čebyšëv. La soglia di Markov deve superare la media, altrimenti il limite supera 1 e non dice nulla; allo stesso modo Čebyšëv con $k\le1$ non dice nulla. Čebyšëv invece non richiede che la variabile sia non negativa, ma richiede di conoscere la varianza: con la sola media si può usare soltanto Markov.

Il secondo gruppo riguarda i conti. Nella forma con la distanza il limite è $\sigma^2/a^2$, con la **varianza** al numeratore; nella forma con $k$, il numero $k$ è la distanza divisa per la **deviazione standard**, $k=a/\sigma$, non per la varianza. Con i dati delle ante, $\sigma^2=8$ e $a=8$: chi divide 8 per la varianza trova $k=1$ e conclude che non si può dire nulla, mentre il limite giusto è $8/64=0{,}125$. Prima di applicare Čebyšëv a un intervallo bisogna controllare che sia simmetrico attorno alla media; se non lo è, si usa la distanza più piccola. E il limite di Čebyšëv per una coda sola è lo stesso di quello per due code: non va diviso per due, a meno di sapere che la distribuzione è simmetrica.

Il terzo gruppo riguarda la lettura dei risultati. Un limite non è una previsione: $P(X\ge a)\le0{,}2$ dice che la probabilità non supera il 20%, non che vale il 20%, e per molte distribuzioni è molto più piccola. Viceversa, un limite troppo grande non dimostra che l’evento sia probabile: dice soltanto che con quelle informazioni non si può escludere.

Il quarto gruppo riguarda le somme. La regola $\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)$ vale per variabili indipendenti, non per variabili qualsiasi: $\operatorname{Var}(X+X)$ è $4\operatorname{Var}(X)$. La varianza della differenza di variabili indipendenti è la **somma** delle varianze, non la differenza. Non bisogna confondere $\operatorname{Var}(nX)=n^2\sigma^2$, un dado moltiplicato per $n$, con $\operatorname{Var}(X_1+\cdots+X_n)=n\sigma^2$, la somma di $n$ dadi indipendenti. E la deviazione standard della media campionaria è $\sigma/\sqrt n$, non $\sigma/n$.

L’ultimo gruppo riguarda la legge dei grandi numeri. Non dice che la media sarà uguale a $\mu$ da un certo punto in poi, ma che la probabilità di trovarla lontana da $\mu$ diventa piccola. Non dice che il caso compensa gli scarti: la differenza tra teste e metà dei lanci, anzi, cresce; è la frazione che si stabilizza. E richiede le sue ipotesi: osservazioni indipendenti, o almeno con una dipendenza che si attenua, e identicamente distribuite. La media di misure fatte in condizioni che cambiano, o che si influenzano a vicenda, può non avvicinarsi a nessun valore.

## Riepilogo per lo studio {: #riepilogo }

Quando di una variabile conosciamo soltanto la media, o la media e la varianza, non possiamo calcolare le sue probabilità, che dipendono dalla forma della distribuzione: entro una deviazione standard dalla media cade il 68% di una normale, il 58% di un’uniforme, l’87% di un’esponenziale. Possiamo però limitarle. La **disuguaglianza di Markov** dice che per una variabile mai negativa e una soglia $a>0$ vale $P(X\ge a)\le\mathbb{E}[X]/a$: una variabile non negativa raramente è molto più grande della sua media. Si dimostra osservando che $X\ge a\cdot I$, dove $I$ è l’indicatrice dell’evento $X\ge a$, e prendendo la media. La **disuguaglianza di Čebyšëv** è Markov applicata al quadrato della distanza dalla media: $P(|X-\mu|\ge a)\le\sigma^2/a^2$, cioè $P(|X-\mu|\ge k\sigma)\le1/k^2$ e $P(|X-\mu|<k\sigma)\ge1-1/k^2$. Vale per ogni distribuzione con varianza finita, e per questo è prudente: entro due deviazioni standard garantisce il 75%, dove la normale ne ha il 95%. Non si può migliorare senza altre informazioni, perché una distribuzione a tre punti la raggiunge.

Per variabili **indipendenti** la varianza della somma è la somma delle varianze, e lo stesso vale per la differenza; per variabili dipendenti non è così, come mostra $\operatorname{Var}(2X)=4\operatorname{Var}(X)$. Per $n$ variabili **i.i.d.** con media $\mu$ e varianza $\sigma^2$, la somma ha media $n\mu$ e varianza $n\sigma^2$, mentre la **media campionaria** $\bar X_n$ ha media $\mu$ e varianza $\sigma^2/n$: la sua deviazione standard scende come $\sigma/\sqrt n$, e per dimezzarla servono quattro volte più dati.

La **legge (debole) dei grandi numeri** dice che $\bar X_n$ **converge in probabilità** a $\mu$: per ogni margine $\varepsilon>0$, $P(|\bar X_n-\mu|\ge\varepsilon)\to0$. Si dimostra applicando Čebyšëv alla media campionaria, $P(|\bar X_n-\mu|\ge\varepsilon)\le\sigma^2/(n\varepsilon^2)$, che tende a zero. Per le indicatrici di un evento è il teorema di Bernoulli: la frequenza relativa converge in probabilità alla probabilità, con il limite $1/(4n\varepsilon^2)$. La legge funziona per diluizione e non per compensazione, e letta al contrario dice quante osservazioni servono: $n\ge\sigma^2/(\delta\varepsilon^2)$ per sbagliare di almeno $\varepsilon$ con probabilità al più $\delta$.

!!! tip "Prova a raccontarlo senza il formulario"
    Spiega a un compagno perché in un gruppo con reddito medio di 1000 euro al più una persona su dieci può guadagnare 10 000 euro, e come lo stesso ragionamento diventa la disuguaglianza di Markov. Poi mostragli come si ottiene Čebyšëv applicando Markov alla variabile giusta, e usalo per decidere se il lotto di ante sarà rifiutato. Calcola con lui la varianza della somma di due dadi e quella del doppio di un dado, e spiegagli perché sono diverse. Infine raccontagli in due righe perché la media di molte osservazioni si avvicina al valore atteso, e perché dopo dieci teste di fila la moneta non deve nessuna croce a nessuno. Se riesci a farlo, le formule della settimana sono diventate strumenti di ragionamento.

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

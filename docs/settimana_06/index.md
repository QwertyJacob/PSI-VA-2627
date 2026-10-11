# Settimana 6 — Bertrand, Gauss e l'asteroide Cerere: nascita della Normale

<style>
@media screen {
  .md-typeset .md-typeset__scrollwrap { overflow-x: auto; max-width: 100%; }
  .md-typeset div.arithmatex { overflow-x: auto; max-width: 100%; }
  .md-typeset mjx-assistive-mml { max-width: 100%; }
}
</style>

*Che cosa vuol dire scegliere un numero «a caso» quando i valori possibili sono infiniti e non si possono elencare? Da una corda tracciata in un cerchio all'asteroide perduto dietro il Sole, fino ai tempi di risposta di un server.*

[:material-presentation: Apri Slide della Lezione](slides/index.html){ .md-button .md-button--primary target="_blank" }

## Prima di cominciare: che cosa ci portiamo dalla Settimana 5 {: #prima-di-cominciare }

Fino a oggi tutte le nostre variabili aleatorie avevano valori che si possono **elencare**: le facce di un dado, il numero di successi in $n$ prove, il numero di prove fino al primo successo, il numero di morti in un corpo d'armata. Anche quando i valori erano infiniti, come nella Geometrica, potevamo metterli in fila: 1, 2, 3, …

Dalla Settimana 5 ci portiamo tre strumenti, che oggi useremo subito.

1. La **Poisson**: se gli eventi rari arrivano in media $\lambda$ volte in un intervallo, il numero di eventi in quell'intervallo ha PMF $P(X=k)=e^{-\lambda}\lambda^k/k!$. In particolare la probabilità di **zero eventi** è $e^{-\lambda}$ ([Settimana 5, §12](../settimana_05/index.md#numero-e)).
2. Il **tasso**: $\lambda$ è sempre riferito a un intervallo. Se un server riceve in media 3 richieste al secondo, in $t$ secondi ne riceve in media $3t$ ([Settimana 5, §17](../settimana_05/index.md#tasso)).
3. L'**assenza di memoria** della Geometrica: dopo una lunga serie di fallimenti, il futuro riparte da capo ([Settimana 5, §5](../settimana_05/index.md#assenza-memoria)).

Dalla Settimana 4 riprendiamo il **valore atteso** come baricentro ([Settimana 4, §5](../settimana_04/index.md#baricentro)) e la **varianza** come misura della dispersione ([Settimana 4, Lettura A](../settimana_04/index.md#varianza)).

Questa settimana facciamo un salto. Molte grandezze che interessano a un informatico non si contano, si **misurano**: il tempo che una richiesta impiega a ricevere risposta, il tempo tra due guasti, l'errore di un sensore. Una misura può cadere in un punto qualsiasi di un intervallo, con tutte le cifre decimali che vogliamo. Questi valori **non si possono elencare**. Servono idee nuove.

!!! info "Come leggere questa dispensa"
    Gli Atti I–VI formano il percorso principale: il paradosso di Bertrand (Atto I), la densità di probabilità (Atto II), l'Esponenziale come tempo di attesa (Atto III), la storia di Cerere (Atto IV), la Normale e la standardizzazione (Atto V), le applicazioni ai sistemi (Atto VI). Seguono tre letture: la distribuzione **Uniforme** (Lettura A), il paradosso di Bertrand con i conti completi (Lettura B), Gauss e i minimi quadrati (Lettura C). **Le tre letture sono fuori dal nucleo d'esame orale.** L'integrale compare solo come nome di un'area: in tutta la settimana non serve calcolarne uno.

## Atto I — Una corda tracciata a caso {: #bertrand }

Nel 1889 il matematico francese **Joseph Bertrand** apre il suo trattato *Calcul des probabilités* con una serie di piccoli problemi che sembrano innocui. Uno di questi è diventato famoso.

> «Si traccia a caso una corda in un cerchio. Qual è la probabilità che sia più piccola del lato del triangolo equilatero inscritto?»
> — J. Bertrand, *Calcul des probabilités*, 1889, cap. I, § 5, p. 4 (tradotto dal francese)

Una **corda** è un segmento che unisce due punti della circonferenza. Il **triangolo equilatero inscritto** ha i tre vertici sulla circonferenza e tre lati uguali. Bertrand chiede se la corda è più corta di quel lato; noi, come fa lui nei conti, guardiamo il caso opposto: **qual è la probabilità che la corda sia più lunga del lato?**

Sembra una domanda con una sola risposta. Bertrand ne propone tre, e ciascuna è costruita con un ragionamento pulito.

<figure markdown="0">
<svg viewBox="0 0 580 265" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Tre cerchi con il triangolo equilatero inscritto. Nel primo una corda parte da un vertice fissato e la zona favorevole è un angolo di 60 gradi su 180: probabilità un terzo. Nel secondo la corda è perpendicolare a un raggio e la zona favorevole è la metà del raggio vicina al centro: un mezzo. Nel terzo il punto medio cade nel cerchio di raggio metà: un quarto.">
<text x="290" y="18" text-anchor="middle" fill="currentColor" font-weight="bold">Tre modi di «scegliere una corda a caso»</text>
<circle cx="100" cy="120" r="70" fill="none" stroke="currentColor" stroke-width="2"/>
<polygon points="100,50 39.4,155 160.6,155" fill="none" stroke="currentColor" stroke-dasharray="4 3" opacity="0.6"/>
<text x="100" y="212" text-anchor="middle" fill="currentColor">1. due estremi a caso</text>
<text x="100" y="232" text-anchor="middle" fill="#e07a1f" font-weight="bold">corda lunga: 1/3</text>
<circle cx="290" cy="120" r="70" fill="none" stroke="currentColor" stroke-width="2"/>
<polygon points="290,50 229.4,155 350.6,155" fill="none" stroke="currentColor" stroke-dasharray="4 3" opacity="0.6"/>
<text x="290" y="212" text-anchor="middle" fill="currentColor">2. distanza dal centro a caso</text>
<text x="290" y="232" text-anchor="middle" fill="#e07a1f" font-weight="bold">corda lunga: 1/2</text>
<circle cx="480" cy="120" r="70" fill="none" stroke="currentColor" stroke-width="2"/>
<polygon points="480,50 419.4,155 540.6,155" fill="none" stroke="currentColor" stroke-dasharray="4 3" opacity="0.6"/>
<text x="480" y="212" text-anchor="middle" fill="currentColor">3. punto medio a caso</text>
<text x="480" y="232" text-anchor="middle" fill="#e07a1f" font-weight="bold">corda lunga: 1/4</text>
<path d="M100 50 L39.4 155 A70 70 0 0 0 160.6 155 Z" fill="#4051b5" opacity="0.25"/>
<line x1="100" y1="50" x2="87.8" y2="188.9" stroke="#4051b5" stroke-width="3"/>
<circle cx="100" cy="50" r="4" fill="currentColor"/>
<line x1="290" y1="120" x2="290" y2="190" stroke="currentColor" stroke-width="1.5"/>
<line x1="290" y1="120" x2="290" y2="155" stroke="#4051b5" stroke-width="6" opacity="0.5"/>
<line x1="223.2" y1="141" x2="356.8" y2="141" stroke="#4051b5" stroke-width="3"/>
<circle cx="290" cy="120" r="3" fill="currentColor"/>
<circle cx="480" cy="120" r="35.0" fill="#4051b5" opacity="0.25"/>
<line x1="534.7" y1="163.7" x2="453.3" y2="55.3" stroke="#4051b5" stroke-width="3"/>
<circle cx="494" cy="109.5" r="4" fill="#e07a1f"/>
<text x="290" y="252" text-anchor="middle" fill="currentColor">Stessa domanda, tre risposte: la parola «a caso» non dice quale misura usare.</text>
</svg>
<figcaption>Paradosso di Bertrand (1889): tre procedure ragionevoli per scegliere una corda «a caso» danno tre probabilità diverse che la corda superi il lato del triangolo.</figcaption>
</figure>

1. **Scegliamo a caso i due estremi.** Fissiamo il primo estremo: per la simmetria del cerchio non importa dove. Il triangolo con un vertice in quel punto divide le direzioni possibili della corda in tre angoli uguali, di 60 gradi ciascuno. La corda è più lunga del lato solo se cade nell'angolo centrale. **Probabilità $1/3$.**
2. **Scegliamo a caso la distanza della corda dal centro.** Fissiamo la direzione della corda: di nuovo, per simmetria, non importa quale. La corda è più lunga del lato se il suo punto medio sta nella metà del raggio più vicina al centro. **Probabilità $1/2$.**
3. **Scegliamo a caso il punto medio della corda dentro il cerchio.** La corda è più lunga del lato se il punto medio cade nel cerchio concentrico di raggio metà. Quel cerchio ha un quarto dell'area. **Probabilità $1/4$.**

Tre ragionamenti, tre numeri diversi. Quale è giusto? La risposta di Bertrand è netta:

> «Tra queste tre risposte, qual è la vera? Nessuna delle tre è falsa, nessuna è esatta: la domanda è mal posta.»
> — J. Bertrand, *Calcul des probabilités*, 1889, p. 5 (tradotto dal francese)

Il problema non sta nei conti, che sono corretti tutti e tre. Sta nella parola **«a caso»**. Con un dado, «a caso» ha un significato naturale: sei facce, sei pesi uguali. Con le corde, che sono infinite e non si possono elencare, «a caso» può voler dire cose diverse: estremi uniformi sulla circonferenza, distanza uniforme dal centro, punto medio uniforme nel disco. Ognuna è una **procedura** diversa per produrre corde, e procedure diverse producono corde diverse. Nel Laboratorio della [Lettura B](#bertrand-esteso) le facciamo produrre a Python, e le tre frequenze tornano: circa 0,333, 0,500 e 0,250.

**La domanda guida della settimana:** quando i valori possibili formano un continuo, come si assegnano le probabilità? E che cosa dobbiamo dichiarare, ogni volta, perché la parola «a caso» abbia un significato preciso?

**Micro-riepilogo.** Nel continuo «a caso» non basta. Bisogna dire **come** sono distribuiti i valori. Lo strumento per dirlo è la densità, il tema dell'Atto II.

## Atto II — Dal contare al misurare: la densità {: #densita }

### 1. Un punto esatto ha probabilità zero {: #punto-zero }

Partiamo da una situazione da informatici. Misuriamo il **tempo di risposta** $T$ di un server, in secondi. Il cronometro può dare 0,3 s, ma anche 0,31 s, 0,307 s, 0,30712 s: tra due valori qualsiasi ce ne sono sempre altri. Una variabile che può assumere **qualunque valore di un intervallo** si dice **continua**.

Chiediamoci: quanto vale $P(T=0{,}3)$, la probabilità che il tempo sia **esattamente** 0,3 secondi, con infinite cifre decimali tutte uguali a zero dopo il 3?

Proviamo a ragionare per gradi. Supponiamo, per fissare le idee, che il tempo sia sempre compreso tra 0 e 1 secondo e che nessuna zona dell'intervallo sia privilegiata.

* Se il cronometro mostra **una cifra decimale**, i valori possibili sono 0,0; 0,1; …; 0,9: dieci caselle, e «0,3» ha probabilità circa $1/10$.
* Con **due cifre decimali** le caselle diventano cento, e «0,30» ha probabilità circa $1/100$.
* Con **sei cifre** le caselle sono un milione, e «0,300000» ha probabilità circa un milionesimo.

Ogni cifra in più divide la probabilità per dieci. Il valore **esatto** 0,3 richiede infinite cifre: la sua probabilità è più piccola di qualunque numero positivo. Quindi è zero:

$$
\boxed{P(T=c)=0\quad\text{per ogni valore } c.}
$$

Questo non vuol dire che 0,3 sia impossibile. Vuol dire che, quando i valori sono un continuo, la probabilità non sta nei singoli punti. Sta negli **intervalli**: $P(0{,}29<T<0{,}31)$ è un numero positivo e utile, $P(T=0{,}3)$ no.

Ecco perché la PMF delle settimane scorse, che assegna un peso a ogni valore, qui non funziona: darebbe zero dappertutto. Ci serve un altro modo di descrivere dove sta la probabilità.

### 2. Istogrammi sempre più fini {: #istogrammi }

Immaginiamo di registrare il tempo di attesa di moltissime richieste e di disegnarne l'**istogramma**: dividiamo l'asse del tempo in intervalli della stessa larghezza, le «barre», e per ogni barra contiamo la frazione di richieste che vi cadono.

Se rendiamo le barre più strette, ogni barra contiene meno richieste: la frazione si dimezza quando la larghezza si dimezza. Con barre sempre più strette tutte le frazioni scenderebbero verso zero, come la probabilità di un punto esatto.

C'è un trucco per non perdere il disegno: invece della frazione, usiamo come altezza la **frazione divisa per la larghezza** della barra:

$$
\text{altezza della barra}=\frac{\text{probabilità della barra}}{\text{larghezza della barra}}.
$$

Questa è una «probabilità per unità di tempo», come una densità di popolazione è un numero di abitanti per chilometro quadrato. Dimezzando la larghezza, la probabilità della barra circa si dimezza, e il rapporto resta più o meno lo stesso. Le altezze non crollano: si assestano su un profilo.

<figure markdown="0">
<svg viewBox="0 0 580 260" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Tre istogrammi dello stesso tempo di attesa, con barre larghe 0,4, 0,2 e 0,05 secondi. L altezza di ogni barra è la probabilità della barra divisa per la larghezza. Al restringersi delle barre il profilo si avvicina a una curva arancione decrescente, la densità.">
<line x1="20" y1="190" x2="190" y2="190" stroke="currentColor"/>
<line x1="20" y1="190" x2="20" y2="40" stroke="currentColor"/>
<rect x="20" y="108.1" width="56.7" height="81.9" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="76.7" y="165.3" width="56.7" height="24.7" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="133.3" y="182.6" width="56.7" height="7.4" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<text x="105.0" y="208" text-anchor="middle" fill="currentColor">barre larghe 0,4 s</text>
<text x="20" y="224" text-anchor="start" fill="currentColor" font-size="11">0 s</text>
<text x="190" y="224" text-anchor="end" fill="currentColor" font-size="11">1,2 s</text>
<line x1="210" y1="190" x2="380" y2="190" stroke="currentColor"/>
<line x1="210" y1="190" x2="210" y2="40" stroke="currentColor"/>
<rect x="210" y="84.3" width="28.3" height="105.7" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="238.3" y="132" width="28.3" height="58" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="266.7" y="158.1" width="28.3" height="31.9" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="295" y="172.5" width="28.3" height="17.5" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="323.3" y="180.4" width="28.3" height="9.6" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="351.7" y="184.7" width="28.3" height="5.3" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<text x="295.0" y="208" text-anchor="middle" fill="currentColor">barre larghe 0,2 s</text>
<text x="210" y="224" text-anchor="start" fill="currentColor" font-size="11">0 s</text>
<text x="380" y="224" text-anchor="end" fill="currentColor" font-size="11">1,2 s</text>
<line x1="400" y1="190" x2="570" y2="190" stroke="currentColor"/>
<line x1="400" y1="190" x2="400" y2="40" stroke="currentColor"/>
<rect x="400" y="59.4" width="7.1" height="130.6" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="407.1" y="77.6" width="7.1" height="112.4" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="414.2" y="93.3" width="7.1" height="96.7" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="421.2" y="106.7" width="7.1" height="83.3" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="428.3" y="118.3" width="7.1" height="71.7" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="435.4" y="128.3" width="7.1" height="61.7" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="442.5" y="136.9" width="7.1" height="53.1" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="449.6" y="144.3" width="7.1" height="45.7" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="456.7" y="150.7" width="7.1" height="39.3" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="463.8" y="156.1" width="7.1" height="33.9" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="470.8" y="160.9" width="7.1" height="29.1" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="477.9" y="164.9" width="7.1" height="25.1" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="485" y="168.4" width="7.1" height="21.6" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="492.1" y="171.4" width="7.1" height="18.6" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="499.2" y="174" width="7.1" height="16" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="506.2" y="176.2" width="7.1" height="13.8" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="513.3" y="178.2" width="7.1" height="11.8" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="520.4" y="179.8" width="7.1" height="10.2" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="527.5" y="181.2" width="7.1" height="8.8" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="534.6" y="182.4" width="7.1" height="7.6" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="541.7" y="183.5" width="7.1" height="6.5" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="548.8" y="184.4" width="7.1" height="5.6" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="555.8" y="185.2" width="7.1" height="4.8" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<rect x="562.9" y="185.9" width="7.1" height="4.1" fill="#4051b5" opacity="0.55" stroke="#4051b5" stroke-width="0.5"/>
<polyline points="400,49.4 401.4,53.5 402.8,57.6 404.2,61.5 405.7,65.3 407.1,69 408.5,72.5 409.9,76 411.3,79.4 412.8,82.6 414.2,85.8 415.6,88.9 417,91.9 418.4,94.8 419.8,97.6 421.2,100.3 422.7,103 424.1,105.6 425.5,108.1 426.9,110.5 428.3,112.8 429.8,115.1 431.2,117.3 432.6,119.5 434,121.6 435.4,123.6 436.8,125.5 438.2,127.4 439.7,129.3 441.1,131.1 442.5,132.8 443.9,134.5 445.3,136.2 446.8,137.7 448.2,139.3 449.6,140.8 451,142.2 452.4,143.7 453.8,145 455.2,146.4 456.7,147.6 458.1,148.9 459.5,150.1 460.9,151.3 462.3,152.4 463.8,153.5 465.2,154.6 466.6,155.7 468,156.7 469.4,157.7 470.8,158.6 472.2,159.5 473.7,160.4 475.1,161.3 476.5,162.2 477.9,163 479.3,163.8 480.8,164.6 482.2,165.3 483.6,166 485,166.8 486.4,167.4 487.8,168.1 489.2,168.8 490.7,169.4 492.1,170 493.5,170.6 494.9,171.2 496.3,171.7 497.8,172.3 499.2,172.8 500.6,173.3 502,173.8 503.4,174.3 504.8,174.7 506.2,175.2 507.7,175.6 509.1,176 510.5,176.5 511.9,176.9 513.3,177.2 514.8,177.6 516.2,178 517.6,178.3 519,178.7 520.4,179 521.8,179.3 523.2,179.7 524.7,180 526.1,180.3 527.5,180.5 528.9,180.8 530.3,181.1 531.8,181.4 533.2,181.6 534.6,181.9 536,182.1 537.4,182.3 538.8,182.6 540.2,182.8 541.7,183 543.1,183.2 544.5,183.4 545.9,183.6 547.3,183.8 548.8,184 550.2,184.2 551.6,184.3 553,184.5 554.4,184.7 555.8,184.8 557.2,185 558.7,185.1 560.1,185.3 561.5,185.4 562.9,185.5 564.3,185.7 565.8,185.8 567.2,185.9 568.6,186 570,186.2" fill="none" stroke="#e07a1f" stroke-width="2.5"/>
<text x="485.0" y="208" text-anchor="middle" fill="currentColor">barre larghe 0,05 s</text>
<text x="400" y="224" text-anchor="start" fill="currentColor" font-size="11">0 s</text>
<text x="570" y="224" text-anchor="end" fill="currentColor" font-size="11">1,2 s</text>
<text x="290" y="22" text-anchor="middle" fill="currentColor" font-weight="bold">Altezza della barra = probabilità della barra ÷ larghezza</text>
<text x="290" y="248" text-anchor="middle" fill="#e07a1f">Barre sempre più strette: il profilo diventa una curva, la densità f(t).</text>
</svg>
<figcaption>Lo stesso tempo di attesa descritto con barre sempre più strette. Se l’altezza è «probabilità per unità di tempo», i profili non crollano a zero ma si avvicinano a una curva: la densità.</figcaption>
</figure>

Il profilo a cui gli istogrammi si avvicinano è una curva. La chiamiamo **densità di probabilità** e la indichiamo con $f$.

### 3. La densità: la probabilità è un'area {: #area }

Rovesciamo la formula delle barre. Se l'altezza è «probabilità diviso larghezza», allora:

$$
\text{probabilità della barra}=\text{altezza}\times\text{larghezza}=\text{area della barra}.
$$

**La probabilità è l'area.** Quando le barre diventano infinitamente strette, la somma delle aree delle barre tra due valori $a$ e $b$ diventa l'**area sotto la curva $f$** tra $a$ e $b$. Questa è la definizione che useremo per tutta la settimana.

Una **densità di probabilità** è una funzione $f(x)$ con due proprietà:

1. non è mai negativa: $f(x)\ge0$ per ogni $x$;
2. l'area totale sotto la curva vale 1.

La probabilità che la variabile cada tra $a$ e $b$ è l'area sotto $f$ tra $a$ e $b$. In matematica quest'area si scrive con il simbolo di **integrale**:

$$
\boxed{P(a<X<b)=\int_a^b f(x)\,dx=\text{area sotto } f \text{ tra } a \text{ e } b.}
$$

Leggi il simbolo $\int_a^b f(x)\,dx$ come un nome: «l'area sotto $f$ da $a$ a $b$». La $\int$ è una S allungata, la S di «somma»: ricorda le barre sottili sommate. Il $dx$ ricorda la loro larghezza. Se hai già studiato gli integrali, è esattamente quello che conosci. Se no, non importa: questa settimana le aree le otterremo sempre con formule già pronte, con rettangoli o con il computer.

Due conseguenze, da tenere sempre davanti agli occhi.

* **I bordi non contano.** Poiché un punto ha probabilità zero, $P(a<X<b)=P(a\le X\le b)$. Con le variabili discrete non era così: lì $P(X\le3)$ e $P(X<3)$ differiscono di $P(X=3)$.
* **L'area totale è 1**, perché la variabile deve cadere da qualche parte. È la stessa condizione «i pesi sommano a 1» della PMF.

<figure markdown="0">
<svg viewBox="0 0 580 255" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Curva decrescente della densità esponenziale con lambda uguale a 3, che parte da altezza 3. L area sotto la curva tra 0,1 e 0,5 secondi è colorata in blu e vale circa 0,518: è la probabilità che T cada tra 0,1 e 0,5.">
<polygon points="98.3,200 98.3,88.9 101.4,91.5 104.5,94.1 107.5,96.6 110.6,99 113.7,101.4 116.7,103.8 119.8,106.1 122.9,108.3 125.9,110.5 129,112.6 132.1,114.7 135.1,116.7 138.2,118.7 141.3,120.6 144.3,122.5 147.4,124.3 150.5,126.1 153.5,127.9 156.6,129.6 159.7,131.2 162.7,132.9 165.8,134.5 168.9,136 171.9,137.5 175,139 178.1,140.5 181.1,141.9 184.2,143.3 187.3,144.6 190.3,145.9 193.4,147.2 196.5,148.4 199.5,149.7 202.6,150.9 205.7,152 208.7,153.2 211.8,154.3 214.9,155.4 217.9,156.4 221,157.5 224.1,158.5 227.1,159.4 230.2,160.4 233.3,161.3 236.3,162.3 239.4,163.2 242.5,164 245.5,164.9 248.6,165.7 251.7,166.5 251.7,200" fill="#4051b5" opacity="0.35"/>
<polyline points="60,50 63.8,54.4 67.7,58.7 71.5,62.9 75.3,67 79.2,70.9 83,74.7 86.8,78.4 90.7,82 94.5,85.5 98.3,88.9 102.2,92.2 106,95.3 109.8,98.4 113.7,101.4 117.5,104.4 121.3,107.2 125.2,109.9 129,112.6 132.8,115.2 136.7,117.7 140.5,120.1 144.3,122.5 148.2,124.8 152,127 155.8,129.1 159.7,131.2 163.5,133.3 167.3,135.2 171.2,137.2 175,139 178.8,140.8 182.7,142.6 186.5,144.3 190.3,145.9 194.2,147.5 198,149.1 201.8,150.6 205.7,152 209.5,153.4 213.3,154.8 217.2,156.2 221,157.5 224.8,158.7 228.7,159.9 232.5,161.1 236.3,162.3 240.2,163.4 244,164.5 247.8,165.5 251.7,166.5 255.5,167.5 259.3,168.5 263.2,169.4 267,170.3 270.8,171.2 274.7,172 278.5,172.9 282.3,173.7 286.2,174.5 290,175.2 293.8,175.9 297.7,176.6 301.5,177.3 305.3,178 309.2,178.7 313,179.3 316.8,179.9 320.7,180.5 324.5,181.1 328.3,181.6 332.2,182.2 336,182.7 339.8,183.2 343.7,183.7 347.5,184.2 351.3,184.7 355.2,185.1 359,185.6 362.8,186 366.7,186.4 370.5,186.8 374.3,187.2 378.2,187.6 382,187.9 385.8,188.3 389.7,188.6 393.5,189 397.3,189.3 401.2,189.6 405,189.9 408.8,190.2 412.7,190.5 416.5,190.8 420.3,191.1 424.2,191.3 428,191.6 431.8,191.8 435.7,192.1 439.5,192.3 443.3,192.5 447.2,192.8 451,193 454.8,193.2 458.7,193.4 462.5,193.6 466.3,193.8 470.2,193.9 474,194.1 477.8,194.3 481.7,194.5 485.5,194.6 489.3,194.8 493.2,194.9 497,195.1 500.8,195.2 504.7,195.4 508.5,195.5 512.3,195.6 516.2,195.8 520,195.9" fill="none" stroke="#e07a1f" stroke-width="2.5"/>
<line x1="60" y1="200" x2="520" y2="200" stroke="currentColor"/>
<line x1="60" y1="200" x2="60" y2="30" stroke="currentColor"/>
<line x1="60" y1="200" x2="60" y2="205" stroke="currentColor"/>
<text x="60" y="220" text-anchor="middle" fill="currentColor">0</text>
<line x1="98.3" y1="200" x2="98.3" y2="205" stroke="currentColor"/>
<text x="98.3" y="220" text-anchor="middle" fill="currentColor">0,1</text>
<line x1="251.7" y1="200" x2="251.7" y2="205" stroke="currentColor"/>
<text x="251.7" y="220" text-anchor="middle" fill="currentColor">0,5</text>
<line x1="443.3" y1="200" x2="443.3" y2="205" stroke="currentColor"/>
<text x="443.3" y="220" text-anchor="middle" fill="currentColor">1,0</text>
<text x="52" y="154" text-anchor="end" fill="currentColor">1</text>
<line x1="56" y1="150" x2="60" y2="150" stroke="currentColor"/>
<text x="52" y="104" text-anchor="end" fill="currentColor">2</text>
<line x1="56" y1="100" x2="60" y2="100" stroke="currentColor"/>
<text x="52" y="54" text-anchor="end" fill="currentColor">3</text>
<line x1="56" y1="50" x2="60" y2="50" stroke="currentColor"/>
<text x="520" y="220" text-anchor="end" fill="currentColor">t (secondi)</text>
<text x="66" y="26" fill="currentColor">densità f(t)</text>
<text x="297.7" y="125" fill="#4051b5" font-weight="bold">area ≈ 0,518</text>
<text x="297.7" y="143" fill="currentColor">= P(0,1 &lt; T &lt; 0,5)</text>
<text x="290" y="242" text-anchor="middle" fill="currentColor">L’altezza f(t) non è una probabilità (all’inizio vale 3). La probabilità è l’area.</text>
</svg>
<figcaption>Probabilità come area: la parte colorata sotto la densità tra 0,1 e 0,5 secondi vale circa 0,518. L’altezza della curva supera 1, ma nessuna area supera 1.</figcaption>
</figure>

**Fermiamoci un momento.** Nel discreto la probabilità stava **nei punti**, come pesi appoggiati su un'asta. Nel continuo sta **negli intervalli**, come la massa di un'asta di legno di spessore variabile: un punto non pesa nulla, un tratto pesa tanto quanto è grande l'area sopra di lui.

### 4. Una densità non è una probabilità {: #densita-non-probabilita }

Guarda di nuovo la figura: la curva parte da altezza 3. Una probabilità non può valere 3. Come è possibile?

Perché **$f(x)$ non è una probabilità**: è una probabilità per unità di misura. Diventa una probabilità solo dopo averla moltiplicata per una larghezza. Per un intervallo piccolo di larghezza $\Delta x$ (si legge «delta x»: una piccola variazione di $x$) intorno al punto $x$:

$$
P(x<X<x+\Delta x)\approx f(x)\cdot\Delta x.
$$

Con $f(0)=3$ e $\Delta x=0{,}01$ secondi, la probabilità che l'attesa cada nel primo centesimo di secondo è circa $3\cdot0{,}01=0{,}03$: un numero perfettamente ragionevole.

Un esempio ancora più semplice. Se un tempo è distribuito senza preferenze tra 0 e mezzo secondo, la densità è un rettangolo di base $0{,}5$. Perché l'area sia 1, l'altezza deve essere 2. Una densità alta 2 è normalissima: vuol dire solo che i valori sono concentrati in un intervallo corto.

**Micro-riepilogo.** L'altezza $f(x)$ dice dove la probabilità è **concentrata**, non quanto vale. Le probabilità sono aree; le altezze possono superare 1.

### 5. La funzione di ripartizione {: #cdf }

Spesso la domanda è «qual è la probabilità di stare **sotto** una soglia?». Per esempio: con quale probabilità una richiesta riceve risposta entro 200 millisecondi? Diamo un nome a questa probabilità, in funzione della soglia $x$:

$$
\boxed{F(x)=P(X\le x)=\text{area sotto } f \text{ a sinistra di } x.}
$$

$F$ si chiama **funzione di ripartizione**, o **CDF** (dall'inglese *cumulative distribution function*, funzione di distribuzione cumulata). Parte da 0 a sinistra, cresce man mano che accumula area, arriva a 1 a destra. Non scende mai, perché l'area si può solo aggiungere.

La CDF rende le probabilità sugli intervalli una semplice sottrazione. L'area tra $a$ e $b$ è l'area a sinistra di $b$ meno l'area a sinistra di $a$:

$$
P(a<X\le b)=F(b)-F(a).
$$

E l'area a destra di una soglia è ciò che resta dell'area totale 1:

$$
P(X>x)=1-F(x).
$$

**Micro-riepilogo.** Densità $f$: dove si concentra la probabilità. CDF $F$: quanta probabilità si è accumulata fino a un punto. Probabilità di un intervallo: $F(b)-F(a)$. Nei prossimi due Atti incontreremo due densità famose per le quali $F$ si scrive con una formula o si legge in una tabella. L'**Uniforme**, la densità più semplice, a forma di rettangolo, è nella [Lettura A](#uniforme).

## Atto III — Il tempo tra due eventi: l'Esponenziale {: #esponenziale }

### 6. Dalla Poisson al tempo di attesa {: #coda-esponenziale }

Torniamo al server della Settimana 5, che riceve in media $\lambda=3$ richieste al secondo, con richieste indipendenti l'una dall'altra. La Poisson ci diceva **quante** richieste arrivano in un intervallo. Ora facciamo la domanda complementare: **quanto bisogna aspettare** la prossima richiesta?

Chiamiamo $T$ il tempo, in secondi, da adesso fino al primo arrivo. $T$ è una variabile continua: può valere 0,2 s, 0,213 s, qualunque numero positivo.

Cominciamo da un caso concreto: qual è la probabilità di aspettare **più di mezzo secondo**? Dire «$T>0{,}5$» significa dire che nel primo mezzo secondo **non è arrivata nessuna richiesta**. Sono due modi di descrivere lo stesso evento.

<figure markdown="0">
<svg viewBox="0 0 580 195" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Una linea del tempo da 0 in poi. Tra 0 e t c è una striscia verde senza arrivi; il primo arrivo, un pallino arancione, cade dopo t. Il tratto blu da 0 al primo arrivo è il tempo di attesa T.">
<defs><marker id="s06-tempo-freccia" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="currentColor"/></marker></defs>
<text x="290" y="20" text-anchor="middle" fill="currentColor" font-weight="bold">«Aspetto più di t» = «nessun arrivo in [0, t]»</text>
<rect x="60" y="55" width="250" height="40" fill="#2e9e5b" opacity="0.18"/>
<path d="M40 75H545" stroke="currentColor" stroke-width="2" marker-end="url(#s06-tempo-freccia)"/>
<line x1="60" y1="62" x2="60" y2="88" stroke="currentColor" stroke-width="2"/><text x="60" y="112" text-anchor="middle" fill="currentColor">0</text>
<line x1="310" y1="62" x2="310" y2="88" stroke="#2e9e5b" stroke-width="2" stroke-dasharray="4 3"/><text x="310" y="112" text-anchor="middle" fill="#2e9e5b" font-weight="bold">t</text>
<text x="185" y="50" text-anchor="middle" fill="#2e9e5b">nessun arrivo qui: probabilità e^(−λt)</text>
<circle cx="370" cy="75" r="7" fill="#e07a1f"/>
<circle cx="455" cy="75" r="7" fill="#e07a1f"/>
<circle cx="500" cy="75" r="7" fill="#e07a1f"/>
<text x="370" y="112" text-anchor="middle" fill="#e07a1f">primo arrivo</text>
<path d="M60 135H370" stroke="#4051b5" stroke-width="2"/><line x1="60" y1="128" x2="60" y2="142" stroke="#4051b5" stroke-width="2"/><line x1="370" y1="128" x2="370" y2="142" stroke="#4051b5" stroke-width="2"/>
<text x="215" y="155" text-anchor="middle" fill="#4051b5" font-weight="bold">T = tempo fino al primo arrivo</text>
<text x="290" y="182" text-anchor="middle" fill="currentColor">Qui T &gt; t: la striscia verde è vuota. Gli arrivi in [0, t] sono Poisson con media λt.</text>
</svg>
<figcaption>L’evento «T > t» coincide con «zero arrivi tra 0 e t». La probabilità di zero arrivi la conosciamo già dalla Poisson della Settimana 5.</figcaption>
</figure>

Il numero di richieste in mezzo secondo è una Poisson. La sua media è il tasso per la durata: $3\cdot0{,}5=1{,}5$. La probabilità di zero eventi la conosciamo:

$$
P(T>0{,}5)=P(\text{zero richieste in }0{,}5\text{ s})=e^{-1{,}5}\approx0{,}223.
$$

Lo stesso ragionamento vale per ogni durata $t$. In $t$ secondi arrivano in media $\lambda t$ richieste, e «aspetto più di $t$» significa «zero richieste in $t$ secondi»:

$$
\boxed{P(T>t)=e^{-\lambda t}\qquad\text{per } t\ge0.}
$$

Questa è la **coda** della distribuzione **Esponenziale di parametro $\lambda$**, e scriviamo $T\sim\operatorname{Esponenziale}(\lambda)$. Il parametro è lo stesso della Poisson: il **numero medio di eventi per unità di tempo**.

Qualche valore con $\lambda=3$ al secondo:

| Soglia $t$ | Conto | $P(T>t)$ |
|---|---|---|
| 0,1 s | $e^{-0{,}3}$ | 0,741 |
| 0,5 s | $e^{-1{,}5}$ | 0,223 |
| 1 s | $e^{-3}$ | 0,050 |

Un'attesa di più di un secondo capita una volta su venti: è proprio la probabilità che in un secondo non arrivi nessuna richiesta, l'[esercizio 4 della Settimana 5](../settimana_05/index.md#esercizio-4).

### 7. CDF e densità dell'Esponenziale {: #densita-esponenziale }

Dalla coda otteniamo subito la CDF, perché le due probabilità sommano a 1:

$$
F(t)=P(T\le t)=1-e^{-\lambda t}\qquad\text{per } t\ge0.
$$

Per esempio, la probabilità che la prossima richiesta arrivi entro 0,1 secondi è $1-e^{-0{,}3}\approx0{,}259$. E la probabilità che arrivi tra 0,1 e 0,5 secondi, l'area colorata della figura del §4, è $F(0{,}5)-F(0{,}1)=e^{-0{,}3}-e^{-1{,}5}\approx0{,}741-0{,}223=0{,}518$.

La densità corrispondente è

$$
\boxed{f(t)=\lambda e^{-\lambda t}\qquad\text{per } t\ge0,}
$$

e vale zero per $t<0$, perché un tempo di attesa non è negativo. È la curva della figura del §4: parte da altezza $\lambda$ e scende, dimezzandosi a intervalli regolari. **Le attese brevi sono le più frequenti; quelle lunghe sono rare ma possibili.**

Perché proprio $\lambda e^{-\lambda t}$? Per un intervallo piccolo $\Delta t$ subito dopo $t$, la probabilità che il primo arrivo cada lì è «nessun arrivo fino a $t$» per «un arrivo nel pezzetto $\Delta t$», cioè circa $e^{-\lambda t}\cdot\lambda\Delta t$. Confrontando con la regola del §4, $P\approx f(t)\cdot\Delta t$, l'altezza è $\lambda e^{-\lambda t}$. Chi conosce le derivate può controllare che $f$ è la derivata di $F$: la densità misura quanto velocemente cresce l'area accumulata.

**In pratica, con l'Esponenziale si lavora quasi sempre con la coda $e^{-\lambda t}$ o con la CDF $1-e^{-\lambda t}$.** Nessun integrale da calcolare.

### 8. La media: $1/\lambda$ {: #media-esponenziale }

Se arrivano in media 3 richieste al secondo, quanto si aspetta in media tra una e l'altra? L'intuizione dice un terzo di secondo, circa 333 millisecondi. È giusto:

$$
\boxed{\mathbb{E}[T]=\frac1\lambda.}
$$

Per capire perché, usiamo i **pezzetti** della Settimana 5. Dividiamo ogni secondo in $n$ pezzetti di durata $1/n$; in ciascuno arriva una richiesta con probabilità $p=\lambda/n$, indipendentemente dagli altri. Il numero di pezzetti da aspettare fino al primo arrivo è una **Geometrica** di parametro $p=\lambda/n$, con media $1/p=n/\lambda$ pezzetti ([Settimana 5, §4](../settimana_05/index.md#media-geometrica)). Ogni pezzetto dura $1/n$ secondi, quindi il tempo medio è

$$
\frac{n}{\lambda}\cdot\frac1n=\frac1\lambda\ \text{secondi},
$$

qualunque sia $n$. **L'Esponenziale è la Geometrica vista con una lente d'ingrandimento infinita**: stesse prove indipendenti, ma talmente fitte da formare un tempo continuo.

Come per la Geometrica, la media non è una scadenza. La probabilità di aspettare più della media è $P(T>1/\lambda)=e^{-1}\approx0{,}368$: più di una volta su tre.

#### Esplora: la forma di un'attesa continua {: #widget-esponenziale }

Nel widget $\lambda$ è il numero medio di eventi al secondo. La curva tratteggiata è il server con $\lambda=3$. Prima di muovere il cursore, prevedi: se il traffico raddoppia, che cosa succede all'altezza iniziale della curva e all'attesa media? Ricorda che l'area sotto la curva resta sempre 1.

<div class="psi-widget" id="s06-esponenziale"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  PSIWidget.mount('s06-esponenziale', {
    type: 'line', xLabel: 'Tempo di attesa t (secondi)', yLabel: 'densità f(t)',
    xDomain: [0, 2], xSamples: 201, liveLabel: 'Esponenziale corrente',
    fn: function (t, p) { return p.lam * Math.exp(-p.lam * t); },
    params: [{key: 'lam', label: 'λ (eventi al secondo)',
      min: 0.5, max: 8, step: 0.1, value: 3}],
    reference: {label: 'server: λ = 3', params: {lam: 3}},
    stats: function (p) { return [
      {label: 'E[T] = 1/λ (s)', value: (1 / p.lam).toFixed(3)},
      {label: 'P(T > 0,5) = e^(−0,5λ)', value: Math.exp(-0.5 * p.lam).toFixed(3)},
      {label: 'P(T > E[T]) = e^(−1)', value: Math.exp(-1).toFixed(3)}
    ]; },
    caption: 'Più traffico: la curva parte più in alto e scende più in fretta, l\'attesa media si accorcia. L\'area resta 1.'
  });
});
</script>

La risposta: con $\lambda=6$ la curva parte da altezza 6 e l'attesa media si dimezza, da 0,333 a 0,167 secondi. Nota l'ultima riga: la probabilità di aspettare più della media è sempre $e^{-1}\approx0{,}368$, qualunque sia $\lambda$. Cambiare $\lambda$ cambia solo la **scala** del tempo, non la forma della curva.

### 9. L'assenza di memoria nel continuo {: #memoria-continua }

Il server non riceve richieste da 2 secondi: un silenzio insolito, che capita con probabilità $e^{-6}\approx0{,}0025$. Qual è ora la probabilità che il silenzio duri **almeno un altro mezzo secondo**?

È una probabilità condizionata. Vogliamo $P(T>2{,}5\mid T>2)$. Se $T>2{,}5$, allora certamente $T>2$, quindi l'intersezione dei due eventi è $\{T>2{,}5\}$, proprio come per la Geometrica:

$$
P(T>2{,}5\mid T>2)=\frac{P(T>2{,}5)}{P(T>2)}=\frac{e^{-3\cdot2{,}5}}{e^{-3\cdot2}}=e^{-3\cdot0{,}5}=e^{-1{,}5}\approx0{,}223.
$$

Nel terzo passaggio abbiamo usato la regola delle potenze $e^{a}/e^{b}=e^{a-b}$: $-7{,}5-(-6)=-1{,}5$. Il risultato è **esattamente** $P(T>0{,}5)$, la probabilità di aspettare più di mezzo secondo partendo da zero. I due secondi di silenzio sono spariti dal conto.

Lo stesso calcolo, con $s$ secondi già trascorsi e $t$ secondi in più, dà in generale:

$$
\boxed{P(T>s+t\mid T>s)=\frac{e^{-\lambda(s+t)}}{e^{-\lambda s}}=e^{-\lambda t}=P(T>t).}
$$

È l'**assenza di memoria**: un'attesa già lunga non rende «più vicino» l'arrivo successivo. Il motivo è lo stesso della Geometrica: gli arrivi nei pezzetti di tempo futuri sono indipendenti da quelli passati. L'Esponenziale è l'**unica** distribuzione continua per tempi positivi con questa proprietà, come la Geometrica lo è tra le discrete.

**Micro-riepilogo.** Poisson: quanti eventi in un intervallo. Esponenziale: quanto tempo fino al prossimo evento. Stesso $\lambda$, stesse ipotesi. Coda $e^{-\lambda t}$, media $1/\lambda$, nessuna memoria.

### 10. Laboratorio: tremila secondi di traffico {: #lab-esponenziale }

Il secondo script costruisce il traffico **con i pezzetti**, senza mai usare la formula dell'Esponenziale: in ogni millisecondo arriva una richiesta con probabilità $0{,}003$. Poi misura i tempi tra un arrivo e il successivo e li confronta con $e^{-\lambda t}$. Infine controlla l'assenza di memoria: tra le attese già oltre 0,2 secondi, quante superano 0,5?

<div class="psi-exec" markdown="1">
```python
import numpy as np

rng = np.random.default_rng(2026)

LAMBDA = 3.0       # richieste al secondo, in media
PEZZETTO = 0.001   # un millisecondo
N_PEZZETTI = 3_000_000   # 3000 secondi di traffico simulato

# In ogni millisecondo arriva una richiesta con probabilità
# LAMBDA * PEZZETTO = 0.003, indipendentemente dagli altri.
arrivi = rng.random(N_PEZZETTI) < LAMBDA * PEZZETTO
istanti = np.flatnonzero(arrivi) * PEZZETTO   # in secondi
attese = np.diff(istanti)                     # tempi tra due arrivi

print(f"Richieste simulate: {arrivi.sum()}")
print(f"Attesa media: {attese.mean():.3f} s   (1/lambda = "
      f"{1 / LAMBDA:.3f} s)")

print("  t    P(T > t) simulata   e^(-lambda t)")
for t in [0.1, 0.5, 1.0]:
    print(f"{t:4.1f}   {np.mean(attese > t):17.4f}"
          f"   {np.exp(-LAMBDA * t):13.4f}")

# Assenza di memoria: tra le attese già oltre 0,2 s, quante
# superano 0,2 + 0,3 s? Deve somigliare a P(T > 0,3).
lunghe = attese[attese > 0.2]
condizionata = np.mean(lunghe > 0.5)
print(f"P(T > 0,5 | T > 0,2) = {condizionata:.3f}")
print(f"P(T > 0,3)           = {np.mean(attese > 0.3):.3f}")
```
</div>

Con il seme fissato lo script trova circa 8.900 richieste, un'attesa media di circa 0,335 s contro 0,333 della teoria, e code vicine a 0,741, 0,223 e 0,050. Le due righe finali danno lo stesso numero, circa 0,41: le attese «vecchie» di 0,2 secondi si comportano come attese appena iniziate. Prova a cambiare `LAMBDA` in `6.0`: l'attesa media si dimezza.

### 11. Il ponte con il software: timeout e tempi tra guasti {: #esponenziale-software }

L'Esponenziale compare ogni volta che si aspetta un evento che arriva «senza preavviso» e senza invecchiamento.

* **Tempo tra due richieste** a un servizio con molti client indipendenti: è il complemento naturale della Poisson dell'Atto V della Settimana 5.
* **Timeout.** Se un client aspetta una risposta e gli arrivi seguono l'Esponenziale con $\lambda=3$ al secondo, un timeout di 1 secondo scatta, a vuoto, con probabilità $e^{-3}\approx0{,}05$. Per scendere sotto l'1% serve $e^{-3t}<0{,}01$, cioè $t>\ln(100)/3\approx1{,}54$ secondi. Qui $\ln$ è il logaritmo naturale, l'operazione inversa di $e^x$.
* **Tempo fino al guasto** di un componente che non si usura, come certi circuiti elettronici nella loro vita utile.

L'ultimo esempio contiene anche l'avvertimento. Un disco meccanico **si usura**: dopo cinque anni di lavoro è più probabile che si guasti nel mese successivo rispetto a un disco nuovo. Ha memoria, e l'Esponenziale non è il modello giusto. Prima di usare $e^{-\lambda t}$ chiediti sempre: il sistema invecchia? Gli eventi arrivano a raffiche? Se sì, l'ipotesi di indipendenza dei pezzetti cade.

## Atto IV — L'asteroide perduto {: #cerere }

### 12. Palermo, primo gennaio 1801 {: #piazzi }

La notte del primo gennaio 1801, all'osservatorio di Palermo, l'astronomo **Giuseppe Piazzi** nota un puntino luminoso che non compare nei cataloghi di stelle e che, notte dopo notte, si sposta. È un nuovo corpo celeste, che verrà chiamato **Cerere**: oggi sappiamo che è il più grande oggetto della fascia degli asteroidi.

Piazzi lo segue fino all'11 febbraio. Poi Cerere si avvicina, nel cielo, alla direzione del Sole e il suo bagliore la nasconde. Per riprenderne l'osservazione bisogna sapere dove guardare quando riemergerà, mesi dopo, in una zona di cielo lontana. Ma le osservazioni coprono appena 41 giorni, e ogni misura di posizione contiene un piccolo **errore**: il telescopio, l'orologio, l'aria, l'occhio dell'osservatore.

Il giovane **Carl Friedrich Gauss**, 24 anni, racconta nella prefazione della sua *Theoria motus* (1809) perché quel problema lo appassionò:

> «[…] l'orbita del pianeta Cerere, che in questi quarantuno giorni aveva descritto un arco geocentrico di soli tre gradi, e che dopo un anno doveva essere cercato in una regione del cielo molto lontana da quella in cui era stato visto per l'ultima volta.»
> — C. F. Gauss, *Theoria motus corporum coelestium*, 1809, prefazione, p. xv della traduzione inglese di C. H. Davis (1857), tradotto dall'inglese

Gauss calcola l'orbita nell'ottobre del 1801, usando un metodo nuovo per mettere d'accordo molte osservazioni imprecise. E, scrive, «la prima notte serena in cui il pianeta fu cercato seguendo i numeri ricavati» lo restituì all'osservazione. In una nota indica chi lo cercò e quando: l'astronomo **Franz Xaver von Zach**, il 7 dicembre 1801.

### 13. La curva degli errori {: #curva-errori }

Il cuore del metodo di Gauss è una domanda probabilistica: **con quale probabilità una misura sbaglia di una certa quantità?** Errori piccoli sono frequenti, errori grandi rari, errori in eccesso e in difetto ugualmente probabili. Ma con quale curva, esattamente?

Gauss non la deduce dalla fisica del telescopio. Parte da un'abitudine che tutti gli astronomi già seguivano: quando si misura più volte la stessa grandezza, si prende la **media aritmetica** delle misure. Nella *Theoria motus* lo dice così:

> «È consuetudine considerare come un assioma l'ipotesi che, se una grandezza è stata determinata con più osservazioni dirette, fatte nelle stesse circostanze e con uguale cura, la media aritmetica dei valori osservati fornisca il valore più probabile, se non rigorosamente, almeno con grande approssimazione.»
> — C. F. Gauss, *Theoria motus*, 1809, libro II, sezione III, art. 177 (pp. 258–259 della traduzione di Davis, tradotto dall'inglese)

Poi si chiede: quale curva degli errori rende la media aritmetica **sempre** il valore più probabile? La risposta, con un conto che lasciamo ai libri, è una sola: una curva proporzionale a $e^{-h^2x^2}$, dove $x$ è l'errore e $h$ una costante che Gauss chiama «misura della precisione». È la **campana** che oggi porta il suo nome. Dalla stessa curva Gauss ricava il **metodo dei minimi quadrati** per calcolare le orbite (art. 179; lo ricostruiamo nella [Lettura C](#minimi-quadrati)).

Gauss stesso è onesto sui limiti: nell'articolo successivo (art. 178) osserva che questa funzione non può descrivere **rigorosamente** gli errori reali, che non sono mai infinitamente grandi. È un modello, e funziona straordinariamente bene.

### 14. Prima di Gauss: De Moivre e le monete {: #de-moivre }

La stessa curva era già apparsa, quasi ottant'anni prima, in un contesto completamente diverso. Nel 1733 **Abraham De Moivre**, un matematico francese emigrato a Londra, cercava di approssimare le probabilità binomiali per un numero enorme di lanci di moneta, dove i conti esatti erano impraticabili. Lo considerava

> «il problema più difficile che si possa proporre in materia di probabilità»
> — A. De Moivre, *The Doctrine of Chances*, 3ª ed., 1756, p. 242 (tradotto dall'inglese)

e la soluzione, stampata il 12 novembre 1733 e ripubblicata nel suo libro, contiene un fattore della forma $e^{-x^2/2}$. Gli istogrammi della Binomiale con $n$ grande, che hai visto nel [widget della Settimana 4](../settimana_04/index.md#widget-binomiale), hanno proprio questa forma a campana.

Due strade indipendenti, i **lanci di moneta** di De Moivre e gli **errori di misura** di Gauss, arrivano alla stessa curva. Non è un caso: in entrambe le situazioni il risultato è la **somma di tanti piccoli contributi indipendenti**. Perché la somma produca sempre una campana lo spiegherà il Teorema del Limite Centrale, nella Settimana 9. Oggi impariamo a usarla.

## Atto V — La distribuzione Normale {: #normale }

### 15. La densità a campana {: #densita-normale }

Una variabile $X$ ha **distribuzione Normale** (o **gaussiana**) con parametri $\mu$ e $\sigma$, e scriviamo $X\sim\mathcal{N}(\mu,\sigma^2)$, se la sua densità è

$$
\boxed{f(x)=\frac{1}{\sigma\sqrt{2\pi}}\;e^{-\frac{(x-\mu)^2}{2\sigma^2}}\qquad\text{per ogni } x \text{ reale.}}
$$

La formula sembra intimidatoria. Leggiamola un pezzo alla volta, partendo dal centro.

* **$(x-\mu)$** è la distanza del punto $x$ dal valore $\mu$.
* **Elevata al quadrato**, $(x-\mu)^2$ diventa positiva e uguale per $x$ a destra e a sinistra di $\mu$ alla stessa distanza: la curva è **simmetrica** intorno a $\mu$.
* **Il segno meno nell'esponente** fa sì che più $x$ è lontano da $\mu$, più $e^{-(\dots)}$ è piccolo: la curva ha il massimo in $x=\mu$ e scende ai lati. Scende in fretta: è il quadrato della distanza a stare nell'esponente.
* **Il $2\sigma^2$ al denominatore** stabilisce la scala: misura le distanze in unità di $\sigma$. Con $\sigma$ grande, bisogna allontanarsi molto prima che la curva scenda.
* **La costante davanti**, $1/(\sigma\sqrt{2\pi})$, serve solo a rendere l'area totale uguale a 1. (Che l'area sotto $e^{-x^2/2}$ valga $\sqrt{2\pi}$ è il risultato che Gauss attribuisce a Laplace, art. 177.)

Il fattore $e^{-x^2/2}$ di De Moivre e l'$e^{-h^2x^2}$ di Gauss sono la stessa curva, con il centro in zero e una scala diversa.

### 16. Che cosa misurano $\mu$ e $\sigma$ {: #mu-sigma }

I due parametri hanno un significato geometrico preciso, e coincidono con due quantità che conosciamo.

* **$\mu$ è il centro.** È il punto più alto della campana e, per la simmetria, il baricentro della distribuzione: $\mathbb{E}[X]=\mu$. Cambiare $\mu$ **trasla** la curva a destra o a sinistra, senza deformarla.
* **$\sigma$ è la larghezza.** È la **deviazione standard**, la radice quadrata della varianza: $\sigma=\sqrt{\operatorname{Var}(X)}$, quindi $\operatorname{Var}(X)=\sigma^2$. A differenza della varianza, che si misura in unità al quadrato ([Settimana 4, §16](../settimana_04/index.md#definizione-varianza)), $\sigma$ si misura nelle stesse unità di $X$: millisecondi, metri, euro. Per questo è la misura di dispersione che si usa per leggere un grafico.

C'è anche un segno visibile di $\sigma$: nei punti $\mu-\sigma$ e $\mu+\sigma$ la campana smette di curvarsi verso il basso e comincia a curvarsi verso l'alto (sono i **punti di flesso**). A occhio, $\sigma$ è la distanza dal centro dei due «gomiti» della campana.

Allargare $\sigma$ allarga la campana. Ma l'area deve restare 1: quindi la campana, allargandosi, **si abbassa**. L'altezza del picco è $1/(\sigma\sqrt{2\pi})$: con $\sigma=1$ vale circa 0,399; con $\sigma=20$ vale circa 0,020.

Un esempio che useremo fino alla fine della settimana: il **tempo di risposta** di un servizio, in millisecondi, con $\mu=200$ e $\sigma=20$. Scriviamo $X\sim\mathcal{N}(200,\,20^2)$. Attenzione alla notazione: il secondo numero tra parentesi è la **varianza** $\sigma^2=400$, non $\sigma$. Molti libri e molte librerie usano invece $\sigma$: controlla sempre.

#### Esplora: stringere e allargare la campana {: #widget-normale }

La curva tratteggiata è il servizio con $\mu=200$ ms e $\sigma=20$ ms. Muovi $\mu$: la campana scivola senza cambiare forma. Muovi $\sigma$: si allarga e si abbassa, o si stringe e si alza, ma l'area resta 1. Guarda le righe sotto il grafico. Prima di muovere $\sigma$, prevedi: la probabilità di stare entro una deviazione standard dal centro cambierà?

<div class="psi-widget" id="s06-normale"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  function erf(x) {
    // Approssimazione di Abramowitz e Stegun (7.1.26): errore < 1,5e-7.
    var s = x < 0 ? -1 : 1, a = Math.abs(x), t = 1 / (1 + 0.3275911 * a);
    var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t
      - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
    return s * y;
  }
  function Phi(z) { return 0.5 * (1 + erf(z / Math.SQRT2)); }
  PSIWidget.mount('s06-normale', {
    type: 'line', xLabel: 'Tempo di risposta x (ms)', yLabel: 'densità f(x)',
    xDomain: [100, 300], xSamples: 201, yDomain: [0, 0.045],
    liveLabel: 'Normale corrente',
    fn: function (x, p) {
      var z = (x - p.mu) / p.sigma;
      return Math.exp(-0.5 * z * z) / (p.sigma * Math.sqrt(2 * Math.PI));
    },
    params: [
      {key: 'mu', label: 'μ (centro, ms)', min: 150, max: 250, step: 1, value: 200},
      {key: 'sigma', label: 'σ (deviazione standard, ms)', min: 10, max: 40, step: 1, value: 20}
    ],
    reference: {label: 'servizio: μ = 200, σ = 20', params: {mu: 200, sigma: 20}},
    stats: function (p) { return [
      {label: 'altezza del picco 1/(σ√2π)', value: (1 / (p.sigma * Math.sqrt(2 * Math.PI))).toFixed(4)},
      {label: 'P(μ − σ < X < μ + σ)', value: (Phi(1) - Phi(-1)).toFixed(3)},
      {label: 'P(X ≤ 240 ms)', value: Phi((240 - p.mu) / p.sigma).toFixed(3)}
    ]; },
    caption: 'μ sposta la campana, σ la allarga e la abbassa. L\'area entro una σ dal centro resta sempre circa 0,683.'
  });
});
</script>

La risposta: no. Qualunque siano $\mu$ e $\sigma$, la probabilità di stare entro una deviazione standard dal centro resta 0,683. Cambia invece $P(X\le240)$, perché 240 ms è una soglia fissa in millisecondi: con $\sigma=20$ dista due deviazioni standard dal centro, con $\sigma=40$ una sola. **Conta la distanza misurata in deviazioni standard.** È l'idea del prossimo paragrafo.

### 17. Standardizzare: misurare in deviazioni standard {: #standardizzazione }

La densità Normale non ha un'area che si possa scrivere con una formula elementare: non esiste una «$F(x)$» semplice come $1-e^{-\lambda t}$. Per calcolare le probabilità si usano tabelle o il computer. Ma servirebbe una tabella diversa per ogni coppia $(\mu,\sigma)$: infinite tabelle. Come se ne esce?

L'osservazione del widget suggerisce la strada: per una Normale **conta solo quante deviazioni standard ci separano dal centro**. Allora misuriamo tutto con quel righello. Per un valore $x$ calcoliamo

$$
\boxed{z=\frac{x-\mu}{\sigma}.}
$$

Il numero $z$ si legge: «$x$ sta $z$ deviazioni standard sopra (se $z>0$) o sotto (se $z<0$) la media». Nel nostro servizio:

* 240 ms: $z=(240-200)/20=2$, due deviazioni standard sopra la media;
* 180 ms: $z=(180-200)/20=-1$, una deviazione standard sotto;
* 200 ms: $z=0$, esattamente al centro.

Applichiamo la stessa operazione alla variabile: $Z=(X-\mu)/\sigma$. Che distribuzione ha $Z$?

* Sottrarre $\mu$ **trasla** la campana: il centro va in zero. Per la linearità della [Settimana 4](../settimana_04/index.md#linearita), $\mathbb{E}[X-\mu]=\mu-\mu=0$.
* Dividere per $\sigma$ **cambia l'unità di misura**, come passare dai millisecondi ai secondi: la larghezza diventa $\sigma/\sigma=1$.
* Né la traslazione né il cambio di unità deformano la campana: resta una Normale.

Quindi:

$$
\boxed{X\sim\mathcal{N}(\mu,\sigma^2)\quad\Longrightarrow\quad Z=\frac{X-\mu}{\sigma}\sim\mathcal{N}(0,1).}
$$

$\mathcal{N}(0,1)$, centro 0 e deviazione standard 1, si chiama **Normale standard**. È l'unica campana di cui serve la tabella.

<figure markdown="0">
<svg viewBox="0 0 580 240" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Una campana con due assi orizzontali allineati. Il primo in millisecondi da 140 a 260, con centro 200; il secondo in deviazioni standard da meno 3 a più 3. Il valore 240 millisecondi corrisponde a z uguale a 2. L area a sinistra di quel punto, colorata, vale circa 0,977.">
<text x="290" y="20" text-anchor="middle" fill="currentColor" font-weight="bold">Stessa curva, due righelli: millisecondi e deviazioni standard</text>
<polygon points="50,140 50,139.8 53.8,139.7 57.5,139.7 61.3,139.6 65.1,139.6 68.9,139.5 72.6,139.4 76.4,139.3 80.2,139.1 83.9,139 87.7,138.8 91.5,138.6 95.3,138.3 99,138 102.8,137.7 106.6,137.3 110.3,136.9 114.1,136.5 117.9,135.9 121.7,135.3 125.4,134.7 129.2,133.9 133,133.1 136.7,132.2 140.5,131.2 144.3,130.1 148.1,128.9 151.8,127.5 155.6,126.1 159.4,124.5 163.1,122.8 166.9,121 170.7,119.1 174.5,117 178.2,114.8 182,112.5 185.8,110.1 189.5,107.5 193.3,104.8 197.1,102.1 200.9,99.2 204.6,96.2 208.4,93.2 212.2,90.1 215.9,87 219.7,83.8 223.5,80.7 227.3,77.5 231,74.4 234.8,71.3 238.6,68.3 242.3,65.4 246.1,62.6 249.9,60 253.7,57.5 257.4,55.1 261.2,53 265,51.1 268.7,49.5 272.5,48.1 276.3,46.9 280.1,46 283.8,45.4 287.6,45.1 291.4,45 295.1,45.3 298.9,45.8 302.7,46.6 306.5,47.7 310.2,49.1 314,50.7 317.8,52.5 321.5,54.5 325.3,56.8 329.1,59.3 332.9,61.9 336.6,64.6 340.4,67.5 344.2,70.5 347.9,73.5 351.7,76.6 355.5,79.8 359.3,83 363,86.1 366.8,89.3 370.6,92.4 374.3,95.4 378.1,98.4 381.9,101.3 385.7,104.1 389.4,106.8 393.2,109.4 397,111.9 400.7,114.2 404.5,116.4 408.3,118.5 412.1,120.5 415.8,122.4 419.6,124.1 423.4,125.7 427.1,127.1 427.1,140" fill="#4051b5" opacity="0.3"/>
<polyline points="50,139.8 54.8,139.7 59.6,139.7 64.4,139.6 69.2,139.5 74,139.3 78.8,139.2 83.6,139 88.4,138.7 93.2,138.5 98,138.1 102.8,137.7 107.6,137.2 112.4,136.7 117.2,136 122,135.3 126.8,134.4 131.6,133.4 136.4,132.3 141.2,131 146,129.5 150.8,127.9 155.6,126.1 160.4,124.1 165.2,121.9 170,119.5 174.8,116.8 179.6,114 184.4,111 189.2,107.8 194,104.4 198.8,100.8 203.6,97.1 208.4,93.2 213.2,89.3 218,85.3 222.8,81.2 227.6,77.2 232.4,73.3 237.2,69.4 242,65.7 246.8,62.1 251.6,58.8 256.4,55.8 261.2,53 266,50.7 270.8,48.7 275.6,47.1 280.4,45.9 285.2,45.2 290,45 294.8,45.2 299.6,45.9 304.4,47.1 309.2,48.7 314,50.7 318.8,53 323.6,55.8 328.4,58.8 333.2,62.1 338,65.7 342.8,69.4 347.6,73.3 352.4,77.2 357.2,81.2 362,85.3 366.8,89.3 371.6,93.2 376.4,97.1 381.2,100.8 386,104.4 390.8,107.8 395.6,111 400.4,114 405.2,116.8 410,119.5 414.8,121.9 419.6,124.1 424.4,126.1 429.2,127.9 434,129.5 438.8,131 443.6,132.3 448.4,133.4 453.2,134.4 458,135.3 462.8,136 467.6,136.7 472.4,137.2 477.2,137.7 482,138.1 486.8,138.5 491.6,138.7 496.4,139 501.2,139.2 506,139.3 510.8,139.5 515.6,139.6 520.4,139.7 525.2,139.7 530,139.8" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="50" y1="140" x2="530" y2="140" stroke="currentColor"/>
<line x1="50" y1="180" x2="530" y2="180" stroke="#e07a1f"/>
<line x1="84.3" y1="140" x2="84.3" y2="145" stroke="currentColor"/>
<text x="84.3" y="160" text-anchor="middle" fill="currentColor">140</text>
<line x1="84.3" y1="180" x2="84.3" y2="185" stroke="#e07a1f"/>
<text x="84.3" y="200" text-anchor="middle" fill="#e07a1f">−3</text>
<line x1="152.9" y1="140" x2="152.9" y2="145" stroke="currentColor"/>
<text x="152.9" y="160" text-anchor="middle" fill="currentColor">160</text>
<line x1="152.9" y1="180" x2="152.9" y2="185" stroke="#e07a1f"/>
<text x="152.9" y="200" text-anchor="middle" fill="#e07a1f">−2</text>
<line x1="221.4" y1="140" x2="221.4" y2="145" stroke="currentColor"/>
<text x="221.4" y="160" text-anchor="middle" fill="currentColor">180</text>
<line x1="221.4" y1="180" x2="221.4" y2="185" stroke="#e07a1f"/>
<text x="221.4" y="200" text-anchor="middle" fill="#e07a1f">−1</text>
<line x1="290" y1="140" x2="290" y2="145" stroke="currentColor"/>
<text x="290" y="160" text-anchor="middle" fill="currentColor">200</text>
<line x1="290" y1="180" x2="290" y2="185" stroke="#e07a1f"/>
<text x="290" y="200" text-anchor="middle" fill="#e07a1f">0</text>
<line x1="358.6" y1="140" x2="358.6" y2="145" stroke="currentColor"/>
<text x="358.6" y="160" text-anchor="middle" fill="currentColor">220</text>
<line x1="358.6" y1="180" x2="358.6" y2="185" stroke="#e07a1f"/>
<text x="358.6" y="200" text-anchor="middle" fill="#e07a1f">+1</text>
<line x1="427.1" y1="140" x2="427.1" y2="145" stroke="currentColor"/>
<text x="427.1" y="160" text-anchor="middle" fill="currentColor">240</text>
<line x1="427.1" y1="180" x2="427.1" y2="185" stroke="#e07a1f"/>
<text x="427.1" y="200" text-anchor="middle" fill="#e07a1f">+2</text>
<line x1="495.7" y1="140" x2="495.7" y2="145" stroke="currentColor"/>
<text x="495.7" y="160" text-anchor="middle" fill="currentColor">260</text>
<line x1="495.7" y1="180" x2="495.7" y2="185" stroke="#e07a1f"/>
<text x="495.7" y="200" text-anchor="middle" fill="#e07a1f">+3</text>
<text x="530" y="160" text-anchor="end" fill="currentColor" dx="40">ms</text>
<text x="530" y="200" text-anchor="end" fill="#e07a1f" dx="40">z</text>
<line x1="427.1" y1="82" x2="427.1" y2="185" stroke="#2e9e5b" stroke-width="2" stroke-dasharray="4 3"/>
<text x="433.1" y="78" text-anchor="middle" fill="#2e9e5b" font-weight="bold">240 ms ↔ z = 2</text>
<text x="207.7" y="122" text-anchor="middle" fill="#4051b5" font-weight="bold">area ≈ 0,977</text>
<text x="290" y="228" text-anchor="middle" fill="currentColor">z = (x − μ) / σ = (240 − 200) / 20 = 2</text>
</svg>
<figcaption>Standardizzare significa cambiare righello: 240 ms, con μ = 200 ms e σ = 20 ms, sta a 2 deviazioni standard dal centro. L’area a sinistra è la stessa nei due righelli: Φ(2) ≈ 0,977.</figcaption>
</figure>

### 18. La funzione $\Phi$ e come si calcola {: #phi }

La CDF della Normale standard ha un nome proprio, la lettera greca $\Phi$ («fi» maiuscola):

$$
\Phi(z)=P(Z\le z)=\text{area sotto la campana standard a sinistra di } z.
$$

Ecco i valori che useremo più spesso.

| $z$ | 0 | 0,5 | 1 | 1,5 | 1,645 | 1,96 | 2 | 2,326 | 2,5 | 3 |
|---|---|---|---|---|---|---|---|---|---|---|
| $\Phi(z)$ | 0,5000 | 0,6915 | 0,8413 | 0,9332 | 0,9500 | 0,9750 | 0,9772 | 0,9900 | 0,9938 | 0,9987 |

La tabella contiene solo $z\ge0$. Per i valori negativi si usa la **simmetria** della campana: l'area a sinistra di $-z$ è uguale all'area a destra di $+z$, cioè

$$
\Phi(-z)=1-\Phi(z).
$$

Per esempio, $\Phi(-1)=1-0{,}8413=0{,}1587$.

Con la standardizzazione, ogni probabilità di una Normale diventa una lettura di $\Phi$. Il procedimento ha sempre tre passi: **standardizzare la soglia, leggere $\Phi$, usare complementare o differenza se serve**.

**Esempio 1.** Probabilità che una richiesta riceva risposta entro 240 ms:

$$
P(X\le240)=P\!\left(Z\le\frac{240-200}{20}\right)=\Phi(2)\approx0{,}977.
$$

Il primo passaggio standardizza entrambi i lati della disuguaglianza: se $X\le240$, allora $(X-200)/20\le(240-200)/20$.

**Esempio 2.** Probabilità che la risposta arrivi tra 180 e 230 ms:

$$
P(180<X<230)=\Phi(1{,}5)-\Phi(-1)=0{,}9332-0{,}1587=0{,}7745.
$$

Abbiamo standardizzato le due soglie ($z=1{,}5$ e $z=-1$) e usato $F(b)-F(a)$ del §5.

**Esempio 3.** Probabilità che la risposta superi 260 ms: $z=3$, quindi $P(X>260)=1-\Phi(3)\approx0{,}0013$. Circa una richiesta su 740.

**Con il computer.** In Python, la libreria standard contiene già la Normale:

```python
from statistics import NormalDist

latenza = NormalDist(mu=200, sigma=20)   # attenzione: sigma, non sigma^2
print(latenza.cdf(240))                  # P(X <= 240) = 0.977...
```

Lo stesso conto con la libreria scientifica SciPy è `scipy.stats.norm.cdf(240, loc=200, scale=20)`. In entrambi i casi il secondo parametro è $\sigma$, non la varianza.

**Micro-riepilogo.** Una tabella sola basta per tutte le Normali, perché standardizzare porta ogni campana sulla campana standard. Probabilità di un intervallo: $\Phi(z_b)-\Phi(z_a)$. Valori negativi: $\Phi(-z)=1-\Phi(z)$.

### 19. La regola 68–95–99,7 {: #regola-empirica }

Tre aree della campana standard valgono la pena di essere ricordate, perché danno un'idea immediata di una Normale qualsiasi:

$$
\begin{aligned}
P(\mu-\sigma<X<\mu+\sigma)&=\Phi(1)-\Phi(-1)\approx0{,}683,\\
P(\mu-2\sigma<X<\mu+2\sigma)&=\Phi(2)-\Phi(-2)\approx0{,}954,\\
P(\mu-3\sigma<X<\mu+3\sigma)&=\Phi(3)-\Phi(-3)\approx0{,}997.
\end{aligned}
$$

Ogni riga si ottiene standardizzando: $\mu+k\sigma$ diventa $z=k$, $\mu-k\sigma$ diventa $z=-k$. Per questo la regola vale per **tutte** le Normali.

<figure markdown="0">
<svg viewBox="0 0 580 260" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Campana normale centrata in mu. La fascia tra mu meno sigma e mu più sigma, in blu, contiene il 68 per cento dell area; quella tra mu meno 2 sigma e mu più 2 sigma il 95 per cento; quella tra mu meno 3 sigma e mu più 3 sigma il 99,7 per cento.">
<polygon points="81.7,190 81.7,188.4 86.9,188 92.1,187.5 97.3,187 102.5,186.3 107.7,185.5 112.9,184.5 118.1,183.3 123.3,182 128.5,180.5 133.8,178.7 139,176.6 144.2,174.3 149.4,171.7 154.6,168.7 159.8,165.4 165,161.8 170.2,157.8 175.4,153.5 180.6,148.8 185.8,143.7 191,138.4 196.2,132.7 201.5,126.8 206.7,120.6 211.9,114.3 217.1,107.9 222.3,101.4 227.5,95 232.7,88.6 237.9,82.5 243.1,76.5 248.3,71 253.5,65.9 258.8,61.2 264,57.2 269.2,53.8 274.4,51.1 279.6,49.1 284.8,47.9 290,47.5 295.2,47.9 300.4,49.1 305.6,51.1 310.8,53.8 316,57.2 321.3,61.2 326.5,65.9 331.7,71 336.9,76.5 342.1,82.5 347.3,88.6 352.5,95 357.7,101.4 362.9,107.9 368.1,114.3 373.3,120.6 378.5,126.8 383.7,132.7 389,138.4 394.2,143.7 399.4,148.8 404.6,153.5 409.8,157.8 415,161.8 420.2,165.4 425.4,168.7 430.6,171.7 435.8,174.3 441,176.6 446.2,178.7 451.5,180.5 456.7,182 461.9,183.3 467.1,184.5 472.3,185.5 477.5,186.3 482.7,187 487.9,187.5 493.1,188 498.3,188.4 498.3,190" fill="#8a4fbf" opacity="0.15"/>
<polygon points="151.1,190 151.1,170.7 154.6,168.7 158.1,166.6 161.5,164.3 165,161.8 168.5,159.2 171.9,156.4 175.4,153.5 178.9,150.4 182.4,147.1 185.8,143.7 189.3,140.2 192.8,136.5 196.2,132.7 199.7,128.8 203.2,124.8 206.7,120.6 210.1,116.5 213.6,112.2 217.1,107.9 220.6,103.6 224,99.3 227.5,95 231,90.7 234.4,86.5 237.9,82.5 241.4,78.5 244.9,74.7 248.3,71 251.8,67.5 255.3,64.3 258.8,61.2 262.2,58.5 265.7,56 269.2,53.8 272.6,51.9 276.1,50.3 279.6,49.1 283.1,48.2 286.5,47.7 290,47.5 293.5,47.7 296.9,48.2 300.4,49.1 303.9,50.3 307.4,51.9 310.8,53.8 314.3,56 317.8,58.5 321.3,61.2 324.7,64.3 328.2,67.5 331.7,71 335.1,74.7 338.6,78.5 342.1,82.5 345.6,86.5 349,90.7 352.5,95 356,99.3 359.4,103.6 362.9,107.9 366.4,112.2 369.9,116.5 373.3,120.6 376.8,124.8 380.3,128.8 383.8,132.7 387.2,136.5 390.7,140.2 394.2,143.7 397.6,147.1 401.1,150.4 404.6,153.5 408.1,156.4 411.5,159.2 415,161.8 418.5,164.3 421.9,166.6 425.4,168.7 428.9,170.7 428.9,190" fill="#e07a1f" opacity="0.25"/>
<polygon points="220.6,190 220.6,103.6 222.3,101.4 224,99.3 225.8,97.1 227.5,95 229.2,92.8 231,90.7 232.7,88.6 234.4,86.5 236.2,84.5 237.9,82.5 239.7,80.4 241.4,78.5 243.1,76.5 244.9,74.7 246.6,72.8 248.3,71 250.1,69.2 251.8,67.5 253.5,65.9 255.3,64.3 257,62.7 258.8,61.2 260.5,59.8 262.2,58.5 264,57.2 265.7,56 267.4,54.9 269.2,53.8 270.9,52.8 272.6,51.9 274.4,51.1 276.1,50.3 277.8,49.7 279.6,49.1 281.3,48.6 283.1,48.2 284.8,47.9 286.5,47.7 288.3,47.6 290,47.5 291.7,47.6 293.5,47.7 295.2,47.9 296.9,48.2 298.7,48.6 300.4,49.1 302.2,49.7 303.9,50.3 305.6,51.1 307.4,51.9 309.1,52.8 310.8,53.8 312.6,54.9 314.3,56 316,57.2 317.8,58.5 319.5,59.8 321.2,61.2 323,62.7 324.7,64.3 326.5,65.9 328.2,67.5 329.9,69.2 331.7,71 333.4,72.8 335.1,74.7 336.9,76.5 338.6,78.5 340.3,80.4 342.1,82.5 343.8,84.5 345.6,86.5 347.3,88.6 349,90.7 350.8,92.8 352.5,95 354.2,97.1 356,99.3 357.7,101.4 359.4,103.6 359.4,190" fill="#4051b5" opacity="0.45"/>
<polyline points="40,189.8 44.2,189.7 48.3,189.7 52.5,189.6 56.7,189.5 60.8,189.4 65,189.3 69.2,189.1 73.3,188.9 77.5,188.7 81.7,188.4 85.8,188.1 90,187.7 94.2,187.3 98.3,186.8 102.5,186.3 106.7,185.6 110.8,184.9 115,184 119.2,183.1 123.3,182 127.5,180.8 131.7,179.4 135.8,177.9 140,176.2 144.2,174.3 148.3,172.2 152.5,169.9 156.7,167.4 160.8,164.7 165,161.8 169.2,158.6 173.3,155.3 177.5,151.6 181.7,147.8 185.8,143.7 190,139.5 194.2,135 198.3,130.4 202.5,125.6 206.7,120.6 210.8,115.6 215,110.5 219.2,105.3 223.3,100.1 227.5,95 231.7,89.9 235.8,84.9 240,80.1 244.2,75.4 248.3,71 252.5,66.9 256.7,63 260.8,59.5 265,56.5 269.2,53.8 273.3,51.6 277.5,49.8 281.7,48.5 285.8,47.8 290,47.5 294.2,47.8 298.3,48.5 302.5,49.8 306.7,51.6 310.8,53.8 315,56.5 319.2,59.5 323.3,63 327.5,66.9 331.7,71 335.8,75.4 340,80.1 344.2,84.9 348.3,89.9 352.5,95 356.7,100.1 360.8,105.3 365,110.5 369.2,115.6 373.3,120.6 377.5,125.6 381.7,130.4 385.8,135 390,139.5 394.2,143.7 398.3,147.8 402.5,151.6 406.7,155.3 410.8,158.6 415,161.8 419.2,164.7 423.3,167.4 427.5,169.9 431.7,172.2 435.8,174.3 440,176.2 444.2,177.9 448.3,179.4 452.5,180.8 456.7,182 460.8,183.1 465,184 469.2,184.9 473.3,185.6 477.5,186.3 481.7,186.8 485.8,187.3 490,187.7 494.2,188.1 498.3,188.4 502.5,188.7 506.7,188.9 510.8,189.1 515,189.3 519.2,189.4 523.3,189.5 527.5,189.6 531.7,189.7 535.8,189.7 540,189.8" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="40" y1="190" x2="540" y2="190" stroke="currentColor"/>
<line x1="81.7" y1="190" x2="81.7" y2="195" stroke="currentColor"/>
<text x="81.7" y="210" text-anchor="middle" fill="currentColor" font-size="12">μ − 3σ</text>
<line x1="151.1" y1="190" x2="151.1" y2="195" stroke="currentColor"/>
<text x="151.1" y="210" text-anchor="middle" fill="currentColor" font-size="12">μ − 2σ</text>
<line x1="220.6" y1="190" x2="220.6" y2="195" stroke="currentColor"/>
<text x="220.6" y="210" text-anchor="middle" fill="currentColor" font-size="12">μ − σ</text>
<line x1="290" y1="190" x2="290" y2="195" stroke="currentColor"/>
<text x="290" y="210" text-anchor="middle" fill="currentColor" font-size="12">μ</text>
<line x1="359.4" y1="190" x2="359.4" y2="195" stroke="currentColor"/>
<text x="359.4" y="210" text-anchor="middle" fill="currentColor" font-size="12">μ + σ</text>
<line x1="428.9" y1="190" x2="428.9" y2="195" stroke="currentColor"/>
<text x="428.9" y="210" text-anchor="middle" fill="currentColor" font-size="12">μ + 2σ</text>
<line x1="498.3" y1="190" x2="498.3" y2="195" stroke="currentColor"/>
<text x="498.3" y="210" text-anchor="middle" fill="currentColor" font-size="12">μ + 3σ</text>
<text x="290" y="118.6" text-anchor="middle" fill="#fff" font-weight="bold">68%</text>
<line x1="151.1" y1="218" x2="428.9" y2="218" stroke="#e07a1f" stroke-width="2"/>
<text x="436.9" y="222" fill="#e07a1f" font-weight="bold">95%</text>
<line x1="81.7" y1="240" x2="498.3" y2="240" stroke="#8a4fbf" stroke-width="2"/>
<text x="506.3" y="244" fill="#8a4fbf" font-weight="bold">99,7%</text>
<text x="290" y="22" text-anchor="middle" fill="currentColor" font-weight="bold">Quanta area sta a 1, 2, 3 deviazioni standard dal centro</text>
</svg>
<figcaption>La regola 68–95–99,7: vale per ogni Normale, qualunque siano μ e σ, perché dipende solo da quante deviazioni standard ci si allontana dal centro.</figcaption>
</figure>

Per il nostro servizio: circa due richieste su tre rispondono tra 180 e 220 ms; il 95% tra 160 e 240 ms; quasi tutte, il 99,7%, tra 140 e 260 ms.

La regola funziona anche al contrario, come strumento di sorveglianza. Un valore oltre $3\sigma$ dalla media, in una Normale, capita 3 volte su mille. Se lo vediamo spesso, o se vediamo valori a $5\sigma$ (probabilità circa 3 su 10 milioni), le spiegazioni sono due: un evento rarissimo, oppure **il modello è sbagliato**. Nella pratica, la seconda è molto più frequente. Ci torniamo nell'Atto VI.

### 20. Il problema inverso: da una probabilità a una soglia {: #quantili }

Finora siamo partiti da una soglia e abbiamo cercato una probabilità. Spesso la domanda è rovesciata: **quale soglia viene superata solo una volta su cento?** È la domanda di chi deve impostare un allarme o promettere un tempo di risposta.

Si percorrono gli stessi tre passi all'indietro.

1. Nella tabella cerchiamo il $z$ con $\Phi(z)=0{,}99$: è $z\approx2{,}326$.
2. Torniamo in millisecondi invertendo la standardizzazione: da $z=(x-\mu)/\sigma$ si ricava $x=\mu+z\sigma$.
3. $x=200+2{,}326\cdot20\approx246{,}5$ ms.

Il 99% delle richieste risponde entro 246,5 ms. Questo valore si chiama **quantile al 99%** (o 99° percentile); nel mondo dei sistemi si dice spesso **p99**. In Python: `NormalDist(200, 20).inv_cdf(0.99)`.

Con lo stesso procedimento il quantile al 95% è $200+1{,}645\cdot20\approx232{,}9$ ms.

### 21. Laboratorio: la campana nasce dagli errori {: #lab-normale }

Il terzo script ripete in piccolo l'idea di Gauss e di De Moivre. Ogni misura è disturbata da **50 piccoli errori indipendenti**, ciascuno distribuito uniformemente tra $-0{,}1$ e $+0{,}1$: nessuno di loro ha la forma di una campana. L'errore totale è la loro somma. Lo script disegna l'istogramma di 20.000 errori totali, ci sovrappone la Normale con la stessa media e la stessa $\sigma$, controlla la regola 68–95–99,7 e infine rifà con `NormalDist` i conti del §18 e del §20.

<div class="psi-exec" markdown="1">
```python
from statistics import NormalDist

import matplotlib.pyplot as plt
import numpy as np

rng = np.random.default_rng(1801)   # l'anno di Cerere

# Ogni misura = valore vero + 50 piccoli errori indipendenti,
# ciascuno uniforme tra -0,1 e +0,1 (vibrazioni, lettura, aria...).
N_MISURE, N_ERRORI = 20_000, 50
errori = rng.uniform(-0.1, 0.1, size=(N_MISURE, N_ERRORI))
scarto = errori.sum(axis=1)          # errore totale di ogni misura

mu, sigma = scarto.mean(), scarto.std()
print(f"media degli errori: {mu:+.4f}   sigma: {sigma:.4f}")
for k in [1, 2, 3]:
    dentro = np.mean(np.abs(scarto - mu) < k * sigma)
    print(f"entro {k} sigma: {dentro:.3f}")

# La campana con la stessa media e la stessa sigma.
x = np.linspace(-1.6, 1.6, 400)
campana = [NormalDist(mu, sigma).pdf(v) for v in x]
plt.hist(scarto, bins=60, density=True, alpha=0.6,
         label="Errori simulati")
plt.plot(x, campana, label="Normale con stessa media e sigma")
plt.xlabel("Errore totale di una misura")
plt.ylabel("Densità")
plt.legend()
plt.tight_layout()
plt.show()

# Calcoli con la Normale: latenza media 200 ms, sigma 20 ms.
latenza = NormalDist(mu=200, sigma=20)
print(f"P(X <= 240 ms)       = {latenza.cdf(240):.4f}")
print(f"P(180 < X < 230 ms)  = "
      f"{latenza.cdf(230) - latenza.cdf(180):.4f}")
print(f"soglia superata 1 volta su 100: {latenza.inv_cdf(0.99):.1f} ms")
```
</div>

Lo script trova una $\sigma$ di circa 0,408 e frazioni entro 1, 2 e 3 deviazioni standard di circa 0,684, 0,954 e 0,997: la regola della campana, anche se nessun singolo errore era a campana. Poi stampa 0,9772, 0,7745 e 246,5 ms. Prova a sostituire `N_ERRORI = 50` con `N_ERRORI = 2`: l'istogramma diventa un triangolo, e la Normale lo descrive male. Servono **tanti** piccoli contributi. Il perché lo vedremo nella Settimana 9.

## Atto VI — Latenze, soglie e quando la campana mente {: #informatica }

### 22. Dove la Normale funziona {: #normale-software }

La Normale è il modello naturale per una grandezza che nasce dalla **somma di molti piccoli contributi indipendenti**, nessuno dei quali domina gli altri:

* l'**errore di misura** di un sensore, di un orologio di sistema, di un benchmark ripetuto;
* il **tempo totale** di un'elaborazione composta da molti passi brevi e simili;
* in statistica, la **media** di molte osservazioni: sarà il tema delle Settimane 8–10.

In questi casi la regola 68–95–99,7 dà un linguaggio comune. Un benchmark ripetuto con media 120 ms e $\sigma=3$ ms che un giorno dà 135 ms è a $5\sigma$: vale la pena cercare la causa, non archiviarlo come «sfortuna».

### 23. Quando la campana sottostima gli estremi {: #code-pesanti }

I tempi di risposta reali dei servizi web, invece, raramente sono Normali. Non sono mai negativi, sono asimmetrici, e hanno **code pesanti**: ogni tanto una richiesta impiega dieci volte la media, per una pausa del garbage collector, un disco lento, una ritrasmissione. Una Normale con la stessa media e la stessa $\sigma$ direbbe che quei valori sono praticamente impossibili.

Ecco perché chi gestisce sistemi in produzione guarda direttamente i **percentili osservati** (p50, p95, p99) invece di calcolarli con $\mu+z\sigma$. Il calcolo con la Normale è un'ottima prima stima quando le ipotesi reggono; quando i dati hanno code pesanti, è un errore sistematico, sempre nella direzione pericolosa: promette tempi migliori di quelli veri.

Come per la Poisson con la sovradispersione ([Settimana 5, §19](../settimana_05/index.md#sovradispersione)), il modello va **controllato sui dati**: un istogramma, o il conteggio dei valori oltre $3\sigma$, dice subito se la campana è credibile.

**Micro-riepilogo.** Somma di tanti piccoli effetti indipendenti: campana, regola 68–95–99,7, calcoli con $\Phi$. Code pesanti e asimmetria: la campana sottostima gli estremi, e si guardano i percentili dei dati.

## Lettura A — La distribuzione Uniforme {: #uniforme }

La densità più semplice di tutte è un rettangolo. Un autobus passa ogni 10 minuti esatti e tu arrivi alla fermata in un momento qualsiasi, senza conoscere l'orario. Il tuo tempo di attesa $X$, in minuti, può essere qualunque numero tra 0 e 10, e nessuna zona dell'intervallo è privilegiata.

Una variabile con questa proprietà ha **distribuzione Uniforme** sull'intervallo $[a,b]$, e scriviamo $X\sim\operatorname{Uniforme}(a,b)$. La densità è costante tra $a$ e $b$ e zero fuori. Quanto deve valere la costante? L'area del rettangolo, base per altezza, deve essere 1, quindi l'altezza è $1/(b-a)$:

$$
f(x)=\frac{1}{b-a}\quad\text{per } a\le x\le b,\qquad f(x)=0\ \text{altrove}.
$$

Per l'autobus, $a=0$, $b=10$, $f(x)=1/10$.

<figure markdown="0">
<svg viewBox="0 0 580 212" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Un rettangolo arancione tra 0 e 10 minuti, alto un decimo. La parte tra 7 e 10, colorata in blu, ha area 0,3.">
<rect x="368" y="60" width="132" height="90" fill="#4051b5" opacity="0.4"/>
<rect x="60" y="60" width="440" height="90" fill="none" stroke="#e07a1f" stroke-width="2.5"/>
<line x1="40" y1="150" x2="520" y2="150" stroke="currentColor"/>
<text x="60" y="170" text-anchor="middle" fill="currentColor">0</text>
<text x="280" y="170" text-anchor="middle" fill="currentColor">5</text>
<text x="368" y="170" text-anchor="middle" fill="currentColor">7</text>
<text x="500" y="170" text-anchor="middle" fill="currentColor">10</text>
<text x="520" y="170" text-anchor="end" fill="currentColor" dy="16">minuti</text>
<text x="52" y="64" text-anchor="end" fill="#e07a1f">1/10</text>
<text x="434" y="105.0" text-anchor="middle" fill="currentColor" font-weight="bold">area 0,3</text>
<text x="290" y="24" text-anchor="middle" fill="currentColor" font-weight="bold">Uniforme su [0, 10]: altezza 1/10, area totale 1</text>
<text x="290" y="200" text-anchor="middle" fill="currentColor">P(attesa &gt; 7 minuti) = base × altezza = 3 × 1/10 = 0,3</text>
</svg>
<figcaption>Densità uniforme: tutte le altezze uguali. Le probabilità sono lunghezze relative: l’intervallo da 7 a 10 è lungo 3 su 10.</figcaption>
</figure>

Le probabilità sono aree di rettangoli, quindi **lunghezze relative**. Per un intervallo $[c,d]$ dentro $[a,b]$:

$$
P(c<X<d)=(d-c)\cdot\frac1{b-a}=\frac{d-c}{b-a}.
$$

La probabilità di aspettare più di 7 minuti è $(10-7)/10=0{,}3$. La CDF cresce in linea retta da 0 a 1: $F(x)=(x-a)/(b-a)$ per $a\le x\le b$.

Il **valore atteso** è il centro dell'intervallo, per la simmetria del rettangolo: il baricentro di una lastra rettangolare omogenea sta a metà.

$$
\mathbb{E}[X]=\frac{a+b}{2}.
$$

Per l'autobus, in media si aspettano 5 minuti.

L'Uniforme è anche ciò che produce `random.random()` in Python: un numero (approssimativamente) uniforme tra 0 e 1. Tutte le simulazioni di questa settimana partono da lì.

**Un piccolo Bertrand.** Prima della corda, Bertrand propone un esempio ancora più semplice (p. 4). Scegliamo «a caso» un numero tra 0 e 100: la probabilità che superi 50 sembra $1/2$. Ma scegliere il numero equivale a scegliere il suo quadrato, tra 0 e 10.000; e il numero supera 50 esattamente quando il quadrato supera 2.500. Se è il **quadrato** a essere uniforme, la probabilità è $7.500/10.000=3/4$. «I due problemi sono identici», scrive Bertrand. «Da dove viene la differenza delle risposte? Gli enunciati mancano di precisione.» Dire «uniforme» richiede di dire **su quale grandezza**.

## Lettura B — Il paradosso di Bertrand, con i conti {: #bertrand-esteso }

Prendiamo un cerchio di raggio 1. Il triangolo equilatero inscritto ha lato $\sqrt3\approx1{,}732$, e la sua distanza dal centro (il raggio del cerchio inscritto nel triangolo) è $1/2$.

Un fatto geometrico unisce i tre metodi. Una corda a distanza $d$ dal centro ha lunghezza $2\sqrt{1-d^2}$: metà corda, distanza $d$ e raggio formano un triangolo rettangolo, e Pitagora dà $(\text{metà corda})^2=1-d^2$. La corda è più lunga del lato quando $2\sqrt{1-d^2}>\sqrt3$, cioè $1-d^2>3/4$, cioè $d<1/2$.

**Metodo 1, estremi a caso.** Fissato il primo estremo $A$, il secondo cade in un punto uniforme della circonferenza. Il triangolo con un vertice in $A$ ha gli altri due vertici che, insieme ad $A$, dividono la circonferenza in tre archi uguali. La corda supera il lato solo se il secondo estremo cade nell'arco opposto ad $A$: probabilità $1/3$.

**Metodo 2, distanza a caso.** Fissata la direzione, la distanza $d$ è uniforme tra 0 e 1. Serve $d<1/2$: per l'Uniforme della Lettura A, probabilità $(1/2-0)/(1-0)=1/2$.

**Metodo 3, punto medio a caso.** Il punto medio è uniforme nel disco, cioè la probabilità di una regione è proporzionale alla sua area. Serve $d<1/2$: il punto medio deve cadere nel disco di raggio $1/2$, che ha area $\pi/4$ contro $\pi$. Probabilità $1/4$.

Il primo script genera 50.000 corde con ciascun metodo e conta quelle più lunghe di $\sqrt3$.

<div class="psi-exec" markdown="1">
```python
import random
from math import cos, pi, sin, sqrt

random.seed(1889)            # l'anno del libro di Bertrand
N = 50_000                   # corde per ciascun metodo
LATO = sqrt(3)               # lato del triangolo inscritto (raggio 1)


def corda_estremi():
    """Metodo 1: due punti scelti a caso sulla circonferenza."""
    a = random.uniform(0, 2 * pi)
    b = random.uniform(0, 2 * pi)
    # Distanza tra due punti del cerchio di raggio 1.
    return sqrt((cos(a) - cos(b)) ** 2 + (sin(a) - sin(b)) ** 2)


def corda_raggio():
    """Metodo 2: distanza del punto medio dal centro, uniforme su [0, 1]."""
    d = random.uniform(0, 1)
    return 2 * sqrt(1 - d * d)  # Pitagora: metà corda = sqrt(1 - d^2)


def corda_punto_medio():
    """Metodo 3: punto medio uniforme dentro il disco."""
    while True:
        # Punto uniforme nel quadrato; teniamo solo quelli nel disco.
        x, y = random.uniform(-1, 1), random.uniform(-1, 1)
        if x * x + y * y <= 1:
            return 2 * sqrt(1 - (x * x + y * y))


for nome, metodo, teoria in [("estremi a caso", corda_estremi, 1 / 3),
                             ("raggio a caso", corda_raggio, 1 / 2),
                             ("punto medio a caso", corda_punto_medio,
                              1 / 4)]:
    lunghe = sum(metodo() > LATO for _ in range(N))
    print(f"{nome:20s} frequenza {lunghe / N:.3f}"
          f"   teoria {teoria:.3f}")
```
</div>

Le tre frequenze sono vicine a 0,333, 0,500 e 0,250. Nessuno dei tre generatori «sbaglia»: producono tre distribuzioni diverse di corde. In un programma la domanda di Bertrand si traduce così: **quale procedura di campionamento stai usando?** Chi genera punti «a caso» in un cerchio scegliendo raggio e angolo uniformi, per esempio, li addensa vicino al centro senza volerlo: lo stesso errore del metodo 2 confrontato con il metodo 3.

## Lettura C — Gauss e i minimi quadrati {: #minimi-quadrati }

Supponiamo di misurare quattro volte la stessa distanza e di ottenere 10, 12, 11 e 13 (in qualche unità). Quale numero $c$ riassume meglio le misure?

Un criterio naturale: scegliere $c$ in modo che gli scarti $x_i-c$ siano complessivamente piccoli. Gauss propone di rendere minima la **somma dei quadrati degli scarti**:

$$
S(c)=\sum_{i=1}^{n}(x_i-c)^2.
$$

Qui $x_1,\dots,x_n$ sono le misure e $n$ il loro numero; il simbolo $\sum_{i=1}^n$ indica la somma su tutte le misure. Mostriamo, senza derivate, che il minimo si ha quando $c$ è la **media aritmetica** $\bar x=(x_1+\dots+x_n)/n$.

Scriviamo ogni scarto passando per la media: $x_i-c=(x_i-\bar x)+(\bar x-c)$. Eleviamo al quadrato:

$$
(x_i-c)^2=(x_i-\bar x)^2+2(x_i-\bar x)(\bar x-c)+(\bar x-c)^2.
$$

Sommiamo su tutte le misure. Il termine centrale contiene $\sum_i(x_i-\bar x)$, la somma degli scarti dalla media, che vale zero: gli scarti positivi e negativi dalla media si compensano esattamente, perché $\sum_i x_i=n\bar x$. Restano:

$$
S(c)=\sum_{i=1}^{n}(x_i-\bar x)^2+n(\bar x-c)^2.
$$

Il primo pezzo non dipende da $c$. Il secondo è un quadrato moltiplicato per $n$, quindi non è mai negativo, e vale zero solo per $c=\bar x$. Quindi $S(c)$ è minima per $c=\bar x$.

Con le nostre misure, $\bar x=(10+12+11+13)/4=11{,}5$. È il collegamento che Gauss sfrutta nell'art. 179 della *Theoria motus*: se gli errori seguono la sua curva, il valore più probabile è quello che minimizza la somma dei quadrati degli scarti, e per una sola grandezza misurata più volte è proprio la media. Gauss scrive di usare questo principio dal 1795, e riconosce nel testo che a pubblicarlo per primo era stato **Adrien-Marie Legendre**, nelle sue *Nouvelles méthodes pour la détermination des orbites des comètes* (art. 186). Per un'orbita le incognite sono più di una e i conti più lunghi, ma il principio è identico: è lo stesso che oggi addestra una regressione lineare minimizzando l'errore quadratico medio.

## Esercizi: prima prova, poi apri la soluzione {: #esercizi }

### Esercizio 1 — Aree a gradini {: #esercizio-1 }

Il tempo di risposta $T$ di un servizio, in secondi, ha densità $f(t)=0{,}75$ tra 0 e 1, $f(t)=0{,}25$ tra 1 e 2, e zero altrove. (a) Controlla che sia una densità. (b) Calcola $P(T\le1)$, $P(0{,}5<T<1{,}5)$, $P(T=1)$. (c) $f(0{,}2)=0{,}75$: è la probabilità che il tempo sia 0,2 secondi? (d) Disegna la CDF.

??? esempio-svolto "Soluzione ragionata"
    (a) Non è mai negativa, e l'area è $0{,}75\cdot1+0{,}25\cdot1=1$. (b) $P(T\le1)=0{,}75\cdot1=0{,}75$. Per $P(0{,}5<T<1{,}5)$ l'intervallo scavalca il gradino: $0{,}75\cdot0{,}5+0{,}25\cdot0{,}5=0{,}375+0{,}125=0{,}5$. $P(T=1)=0$: un punto non ha area. (c) No: $P(T=0{,}2)=0$. Il valore 0,75 è una probabilità per secondo: un intervallo di 0,01 s intorno a 0,2 ha probabilità circa $0{,}75\cdot0{,}01=0{,}0075$. (d) La CDF sale in linea retta da 0 a 0,75 tra $t=0$ e $t=1$, poi più lentamente fino a 1 in $t=2$, e resta a 1.

### Esercizio 2 — Il server in silenzio {: #esercizio-2 }

Le richieste arrivano a un server in media 3 al secondo, e il tempo $T$ fino alla prossima richiesta è $\operatorname{Esponenziale}(3)$. (a) Calcola $P(T>2)$. (b) Il server è in silenzio da 2 secondi: qual è la probabilità che il silenzio duri almeno un altro mezzo secondo? (c) Confronta con $P(T>0{,}5)$. (d) Un collega dice: «dopo 2 secondi di silenzio una richiesta è ormai imminente». Che cosa gli rispondi?

??? esempio-svolto "Soluzione ragionata"
    (a) $e^{-6}\approx0{,}0025$. (b) $P(T>2{,}5\mid T>2)=e^{-7{,}5}/e^{-6}=e^{-1{,}5}\approx0{,}223$. (c) È lo stesso numero: $P(T>0{,}5)=e^{-1{,}5}$. (d) Se gli arrivi sono indipendenti, il silenzio passato non accorcia l'attesa futura: la probabilità di un altro mezzo secondo di silenzio resta 0,223, come all'inizio. Se invece il silenzio è insolito, la domanda giusta è un'altra: il modello vale ancora? Forse il server è irraggiungibile.

### Esercizio 3 — Quante deviazioni standard? {: #esercizio-3 }

Il servizio A ha tempo di risposta Normale con media 200 ms e $\sigma=20$ ms; il servizio B con media 50 ms e $\sigma=5$ ms. (a) Per il servizio A calcola $z$ per 240, 180 e 200 ms. (b) Una richiesta impiega 250 ms su A, un'altra 65 ms su B. In millisecondi, la prima supera la media di 50, la seconda di 15. Quale delle due è più anomala? (c) Con la tabella, calcola $P(X>250)$ per A e $P(Y>65)$ per B.

??? esempio-svolto "Soluzione ragionata"
    (a) $2$, $-1$, $0$. (b) Su A: $z=(250-200)/20=2{,}5$. Su B: $z=(65-50)/5=3$. È più anomala la seconda, anche se lo scarto in millisecondi è più piccolo: conta lo scarto misurato in deviazioni standard. (c) $1-\Phi(2{,}5)=1-0{,}9938=0{,}0062$; $1-\Phi(3)=1-0{,}9987=0{,}0013$.

### Esercizio 4 — La regola 68–95–99,7 {: #esercizio-4 }

Usando solo la tabella del §18 e la simmetria $\Phi(-z)=1-\Phi(z)$: (a) calcola $P(-1<Z<1)$, $P(-2<Z<2)$, $P(-3<Z<3)$; (b) per il servizio A dell'esercizio 3, con quale probabilità una risposta arriva tra 160 e 240 ms? (c) Su 10.000 richieste, quante ti aspetti oltre 260 ms?

??? esempio-svolto "Soluzione ragionata"
    (a) $P(-1<Z<1)=\Phi(1)-\Phi(-1)=\Phi(1)-(1-\Phi(1))=2\Phi(1)-1=2\cdot0{,}8413-1=0{,}6826$. Allo stesso modo $2\cdot0{,}9772-1=0{,}9544$ e $2\cdot0{,}9987-1=0{,}9974$ (con più cifre: 0,6827, 0,9545, 0,9973). (b) 160 e 240 sono $\mu\mp2\sigma$: circa 0,954. (c) 260 ms è $\mu+3\sigma$: $P=1-\Phi(3)\approx0{,}00135$; per linearità del valore atteso ([Settimana 4](../settimana_04/index.md#indicatrici)) ci si aspettano $10.000\cdot0{,}00135\approx13{,}5$ richieste.

### Esercizio 5 — La stampante {: #esercizio-5 }

A una stampante condivisa arrivano in media 3 lavori all'ora, in modo indipendente. (a) Qual è il tempo medio tra due lavori? (b) Qual è la probabilità che il prossimo lavoro arrivi entro 5 minuti? (c) Qual è la probabilità che in un'ora non arrivi nessun lavoro? Risolvi in due modi: con l'Esponenziale e con la Poisson.

??? esempio-svolto "Soluzione ragionata"
    (a) $1/\lambda=1/3$ di ora, cioè 20 minuti. (b) Bisogna usare la stessa unità: 5 minuti sono $1/12$ di ora, quindi $P(T\le1/12)=1-e^{-3/12}=1-e^{-0{,}25}\approx0{,}221$. Errore tipico: scrivere $1-e^{-3\cdot5}$, mescolando ore e minuti. (c) Con l'Esponenziale: $P(T>1)=e^{-3}\approx0{,}050$. Con la Poisson: in un'ora il numero di lavori è $\operatorname{Poisson}(3)$ e $P(X=0)=e^{-3}$. Stesso numero, perché è lo stesso evento.

### Esercizio 6 — Una soglia di allarme {: #esercizio-6 }

Il servizio A ha tempo di risposta Normale con media 200 ms e $\sigma=20$ ms. (a) Quale soglia viene superata solo dall'1% delle richieste? (b) E dallo 0,1%? (Usa $\Phi(3{,}09)\approx0{,}999$.) (c) Perché in produzione, invece di questo conto, si preferisce misurare il p99 sui dati?

??? esempio-svolto "Soluzione ragionata"
    (a) $\Phi(z)=0{,}99$ per $z\approx2{,}326$: soglia $200+2{,}326\cdot20\approx246{,}5$ ms. (b) $200+3{,}09\cdot20\approx261{,}8$ ms. (c) I tempi reali hanno spesso code pesanti: la Normale sottostima la frequenza dei valori estremi, e quindi anche il p99. Il conto è una stima che vale solo se le ipotesi reggono.

### Esercizio 7 — L'autobus e il quadrato {: #esercizio-7 }

(Sulla Lettura A.) (a) Un autobus passa ogni 12 minuti e arrivi in un momento qualsiasi. Probabilità di aspettare meno di 3 minuti? Attesa media? (b) Un numero $X$ è uniforme tra 0 e 1. Qual è la probabilità che $X>1/2$? Se invece è $Y=X^2$ a essere uniforme tra 0 e 1, qual è la probabilità che $X>1/2$?

??? esempio-svolto "Soluzione ragionata"
    (a) $3/12=0{,}25$; media $12/2=6$ minuti. (b) Con $X$ uniforme: $1/2$. Con $Y=X^2$ uniforme: $X>1/2$ equivale a $Y>1/4$, che ha probabilità $3/4$. È l'esempio del numero e del quadrato di Bertrand in piccolo: «uniforme» va detto su una grandezza precisa.

## Errori da evitare {: #errori }

| Errore | Domanda da rifare |
|---|---|
| Leggere $f(x)$ come una probabilità | Ho moltiplicato per una larghezza? Posso avere una probabilità maggiore di 1? |
| Calcolare $P(X=c)$ per una variabile continua e trovare un numero positivo | Qual è l'area di un segmento verticale? |
| Dire «scelgo a caso» senza dire come | Con quale procedura, su quale grandezza è uniforme? |
| Usare un $\lambda$ al secondo con un tempo in minuti | Tasso e tempo sono nella stessa unità? |
| Confondere $P(T>t)=e^{-\lambda t}$ con $P(T\le t)$ | La domanda chiede «più di» o «entro»? |
| Credere che dopo una lunga attesa l'evento sia «imminente» | Gli arrivi futuri dipendono da quelli passati? |
| Scrivere $\mathcal{N}(200,20)$ intendendo $\sigma=20$ e poi usare 20 come varianza | Il secondo numero è $\sigma$ o $\sigma^2$? |
| Standardizzare con $(x-\mu)/\sigma^2$ | Sto misurando in deviazioni standard o in varianze? |
| Usare $\Phi$ per un valore negativo senza la simmetria | $\Phi(-z)=1-\Phi(z)$? |
| Applicare la Normale a dati asimmetrici con code pesanti | Ho guardato l'istogramma? Quanti valori stanno oltre $3\sigma$? |

## Riepilogo e takeaway per chi scrive software {: #riepilogo }

Nel continuo un singolo valore ha probabilità zero. La probabilità sta negli **intervalli**, ed è l'**area** sotto una **densità** $f$, che non è negativa e ha area totale 1. La CDF $F(x)=P(X\le x)$ accumula l'area, e $P(a<X\le b)=F(b)-F(a)$. Il paradosso di Bertrand ricorda che «a caso» ha senso solo dopo aver scelto la densità.

L'**Esponenziale** è il tempo di attesa del prossimo evento in un flusso di Poisson: $P(T>t)=e^{-\lambda t}$, media $1/\lambda$, nessuna memoria. È la Geometrica con prove infinitamente fitte.

La **Normale** $\mathcal{N}(\mu,\sigma^2)$ è la campana degli errori di Gauss e delle monete di De Moivre: centro $\mu$, larghezza $\sigma$. Standardizzando, $z=(x-\mu)/\sigma$, ogni Normale diventa la Normale standard, e le probabilità si leggono in $\Phi$. Entro 1, 2, 3 deviazioni standard cadono il 68%, il 95% e il 99,7% dei valori.

Per chi scrive software: l'Esponenziale serve a ragionare su timeout e tempi tra eventi; la Normale su errori di misura, benchmark e soglie di allarme. Entrambe sono modelli con ipotesi precise. Se il sistema invecchia o lavora a raffiche, l'Esponenziale sbaglia; se i dati hanno code pesanti, la Normale promette estremi più rari di quelli veri. Il codice che campiona «a caso» deve dire da quale distribuzione: è la lezione di Bertrand.

!!! tip "Che cosa devi saper rifare"
    Spiegare perché $P(X=c)=0$ e perché la probabilità è un'area; calcolare aree con densità semplici e usare la CDF. Ricavare $P(T>t)=e^{-\lambda t}$ dalla Poisson, usare la media $1/\lambda$ e spiegare l'assenza di memoria con un esempio. Descrivere il ruolo di $\mu$ e $\sigma$ nella Normale, standardizzare, calcolare probabilità con la tabella di $\Phi$, usare la regola 68–95–99,7 e risolvere il problema inverso.

## Riferimenti e letture {: #riferimenti }

* **Joseph Bertrand**, *Calcul des probabilités*, Parigi, Gauthier-Villars, 1889, cap. I, §§ 4–5, pp. 4–5 (il numero e il suo quadrato; la corda). [Scansione su Internet Archive](https://archive.org/details/calculdesprobab00bertgoog). Le citazioni nel testo sono tradotte dal francese. Alcuni storici datano la prima tiratura al 1888.
* **Carl Friedrich Gauss**, *Theoria motus corporum coelestium in sectionibus conicis solem ambientium*, Amburgo, 1809. Traduzione inglese di Charles Henry Davis, *Theory of the Motion of the Heavenly Bodies Moving about the Sun in Conic Sections*, Boston, Little, Brown and Co., 1857: prefazione (Cerere, pp. xiv–xv), libro II, sezione III, artt. 175–186 (curva degli errori e minimi quadrati). [Scansione su Internet Archive](https://archive.org/details/theoryofmotionof00gaus); [la prefazione su MacTutor](https://mathshistory.st-andrews.ac.uk/Extras/Gauss_preface/). Le citazioni sono tradotte dall'inglese di Davis.
* **Abraham De Moivre**, *The Doctrine of Chances*, 3ª edizione, Londra, A. Millar, 1756, pp. 242–254: «A Method of approximating the Sum of the Terms of the Binomial $(a+b)^n$ expanded into a Series», datato 12 novembre 1733. [Scansione su Internet Archive](https://archive.org/details/doctrineofchance00moiv).
* **Michael Baron**, *Probability and Statistics for Computer Scientists*, 2ª ed., CRC Press, 2014, § 4.2: l'Esponenziale ricavata dalla Poisson con l'evento «zero arrivi», come nel nostro §6.
* **Chris Piech**, *Probability for Computer Scientists*, Stanford, [portale del corso](https://chrispiech.github.io/probabilityForComputerScientists/): capitoli su variabili continue, Esponenziale e Normale, con esempi informatici.
* Documentazione Python: [`statistics.NormalDist`](https://docs.python.org/3/library/statistics.html#statistics.NormalDist).

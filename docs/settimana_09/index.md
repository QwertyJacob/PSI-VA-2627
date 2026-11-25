# Settimana 9 — De Moivre, Laplace e la campana delle somme: il teorema del limite centrale

<style>
@media screen {
  .md-typeset .md-typeset__scrollwrap { overflow-x: auto; max-width: 100%; }
  .md-typeset div.arithmatex { overflow-x: auto; max-width: 100%; }
  .md-typeset mjx-assistive-mml { max-width: 100%; }
}
.s09-box { border: 1px solid var(--md-default-fg-color--lighter, #bbb); border-radius: 8px; padding: 12px 16px; margin: 1em 0; }
.s09-box label { display: inline-block; margin: 4px 18px 4px 0; }
.s09-box input[type=range] { vertical-align: middle; width: 150px; }
.s09-box select { font: inherit; padding: 2px 4px; }
.s09-box button { font: inherit; padding: 3px 12px; border-radius: 6px; border: 1px solid var(--md-default-fg-color--lighter, #bbb); background: transparent; color: inherit; cursor: pointer; }
.s09-svg { width: 100%; max-width: 560px; display: block; margin: 8px auto; font-family: sans-serif; font-size: 13px; }
.s09-out { font-size: 0.95em; line-height: 1.55; }
.s09-out b.s09-sim { color: #4051b5; }
.s09-out b.s09-norm { color: #e07a1f; }
[data-md-color-scheme="slate"] .s09-out b.s09-sim { color: #8c9eff; }
</style>

*Perché, sommando molte piccole quantità aleatorie indipendenti, compare sempre la stessa campana, qualunque sia la forma delle quantità di partenza? Come si usa questa campana per calcolare la probabilità di una somma o di una media, e fino a che punto ci si può fidare di lei? Dalle monete di Abraham De Moivre, nei caffè di Londra, agli errori di misura di Pierre-Simon Laplace.*

[:material-presentation: Apri Slide della Lezione](slides/index.html){ .md-button .md-button--primary target="_blank" }

!!! note "Seconda parte in arrivo"
    Per ora è pubblicata la prima parte della settimana, quella della Lezione 1: De Moivre e le monete, la forma della somma e il teorema del limite centrale (Atti I–III), con gli esercizi 1–5. La seconda parte, con Laplace, gli usi del teorema e i suoi limiti, sarà pubblicata con la Lezione 2.

## Il percorso e ciò che è richiesto all’esame {: #esame }

Nella Settimana 8 abbiamo studiato la media di $n$ osservazioni indipendenti. Sappiamo dove si trova, perché la sua media è il valore atteso $\mu$ delle osservazioni; sappiamo quanto è dispersa, perché la sua deviazione standard è $\sigma/\sqrt n$; e sappiamo, grazie alla legge dei grandi numeri, che al crescere di $n$ si avvicina a $\mu$. Con la disuguaglianza di Čebyšëv abbiamo anche limitato la probabilità di trovarla lontana da $\mu$, ma i limiti erano molto prudenti: per stimare il tempo medio di un programma ci sono servite 320 esecuzioni, e abbiamo anticipato che ne bastano 62. Ci mancava un’informazione: la **forma** della distribuzione della media. Questa settimana scopriamo che, quando $n$ è grande, quella forma è quasi sempre la stessa: la campana della distribuzione normale della Settimana 6. È il **teorema del limite centrale**, uno dei risultati più importanti di tutta la probabilità. Grazie a lui possiamo **calcolare**, in modo approssimato, e non soltanto limitare, le probabilità che riguardano somme e medie.

Il lavoro è diviso in due parti, che corrispondono alle due lezioni. Nella prima parte guardiamo che cosa succede alla distribuzione di una somma quando il numero degli addendi cresce: sommando variabili uniformi, dadi o tempi di attesa, la forma degli addendi si perde e compare una campana. Poi impariamo a **standardizzare** la somma, enunciamo il teorema in modo preciso e lo usiamo per calcolare probabilità con la tabella della funzione $\Phi$, con due esempi: quaranta lampadine che devono durare un anno e un gioco con dieci dadi. Nella seconda parte vediamo le conseguenze del teorema: la distribuzione binomiale è una somma, e quindi è quasi normale; il numero di osservazioni che serve per una certa precisione si calcola molto meglio che con Čebyšëv. Infine rispondiamo alla domanda più importante della settimana: **che cosa il teorema garantisce, e che cosa non garantisce**. Servono l’indipendenza e una varianza finita; il teorema non dice quanto deve essere grande $n$; e riguarda le somme e le medie, non i singoli dati.

Due storie accompagnano le due lezioni. Nella prima siamo a Londra all’inizio del Settecento, dove un esule francese, Abraham De Moivre, si guadagnava da vivere dando lezioni di matematica nei caffè e nel 1733 trovò la campana studiando i lanci di una moneta. Nella seconda siamo a Parigi nel 1810, dove Pierre-Simon Laplace capì che la stessa campana nasce dalla somma di errori di qualunque forma, e dove, quarant’anni dopo, Augustin-Louis Cauchy mostrò una distribuzione per cui fare la media non serve a nulla. Non devi ricordare date e nomi: le storie servono a capire perché le idee della settimana sono nate e quale problema risolvono.

All’esame devi saper enunciare il teorema del limite centrale per la somma e per la media campionaria di variabili indipendenti e identicamente distribuite con varianza finita, nelle sue tre forme: la somma è approssimativamente $\mathcal N(n\mu,\,n\sigma^2)$, la media campionaria è approssimativamente $\mathcal N(\mu,\,\sigma^2/n)$, e la funzione di ripartizione della somma standardizzata tende a $\Phi$. Devi saper spiegare che cosa vuol dire quest’ultima frase (la convergenza in distribuzione) e in che cosa è diversa dalla convergenza in probabilità della Settimana 8. Devi saper usare il teorema per calcolare in modo approssimato la probabilità di un evento che riguarda una somma o una media, anche quando la somma è una variabile binomiale, e per calcolare quante osservazioni servono per una certa precisione, confrontando il risultato con quello di Čebyšëv. Soprattutto devi saper rispondere, con parole tue, alla domanda «che cosa garantisce e che cosa non garantisce il teorema del limite centrale?»: le ipotesi di indipendenza e di varianza finita con un controesempio per ciascuna, il fatto che il teorema non fissa un valore di $n$, il fatto che l’approssimazione è peggiore nelle code, e il fatto che riguarda somme e medie e non i singoli dati.

La **correzione di continuità**, che compare nel gioco dei dieci dadi, è spiegata nel testo ma non è richiesta all’esame: all’esame puoi sempre usare la normale senza correzione. È inoltre **facoltativa e non richiesta all’esame** la lettura in fondo alla dispensa, che spiega perché il limite di una somma, se esiste, debba essere proprio una campana. Le formule esatte che usiamo per controllare il teorema (la distribuzione esatta della somma di uniformi, la distribuzione gamma delle lampadine) non sono richieste: servono soltanto a misurare quanto è buona l’approssimazione. L’intervallo di confidenza, cioè il modo di usare il teorema per dire qualcosa su una media che non conosciamo a partire dai dati, non si studia qui: è il tema della Settimana 10. Per codice, widget e fonti valgono le [indicazioni generali per lo studio](../index.md#esame).

## Da dove ripartiamo {: #prima-di-cominciare }

Questa settimana usa soprattutto la Settimana 8 e la Settimana 6. Ripercorriamole in breve.

Dalla Settimana 8 ci serve il linguaggio delle variabili **indipendenti e identicamente distribuite**, in breve **i.i.d.**: $n$ variabili $X_1,\dots,X_n$ che non si influenzano a vicenda e hanno tutte la stessa distribuzione, con media $\mu$ e varianza $\sigma^2$ ([Settimana 8](../settimana_08/index.md#iid)). Per la loro somma $S_n=X_1+\cdots+X_n$ abbiamo trovato $\mathbb{E}[S_n]=n\mu$ e $\operatorname{Var}(S_n)=n\sigma^2$, perché per variabili indipendenti le varianze si sommano; per la **media campionaria** $\bar X_n=S_n/n$ abbiamo trovato $\mathbb{E}[\bar X_n]=\mu$ e $\operatorname{Var}(\bar X_n)=\sigma^2/n$, con deviazione standard $\sigma/\sqrt n$ ([Settimana 8](../settimana_08/index.md#media-campionaria)). Ricordiamo anche il controesempio: un dado contato due volte, $X+X=2X$, ha varianza $4\operatorname{Var}(X)$ e non $2\operatorname{Var}(X)$, perché le due copie non sono indipendenti ([Settimana 8](../settimana_08/index.md#varianza-somma)). La **legge dei grandi numeri** dice che $\bar X_n$ converge in probabilità a $\mu$, e si dimostra con Čebyšëv: $P(|\bar X_n-\mu|\ge\varepsilon)\le\sigma^2/(n\varepsilon^2)$ ([Settimana 8](../settimana_08/index.md#lgn-dimostrazione)).

Dalla Settimana 6 ci serve la **distribuzione normale** $\mathcal N(\mu,\sigma^2)$, con la media al primo posto e la **varianza** al secondo ([Settimana 6](../settimana_06/index.md#densita-normale)). Per calcolarne le probabilità si **standardizza**: si sottrae la media e si divide per la deviazione standard, $z=(x-\mu)/\sigma$, e si legge $\Phi(z)$ nella tabella della normale standard, ricordando che $\Phi(-z)=1-\Phi(z)$ ([Settimana 6](../settimana_06/index.md#standardizzazione)). Ricordiamo la regola 68–95–99,7 ([Settimana 6](../settimana_06/index.md#regola-empirica)) e il problema inverso, in cui si cerca nella tabella il valore $z$ che corrisponde a una probabilità data ([Settimana 6](../settimana_06/index.md#quantili)). Dalla stessa settimana ci servono due distribuzioni continue: la [distribuzione uniforme](../settimana_06/index.md#uniforme) tra 0 e 1, che ha media $1/2$ e varianza $1/12$, e la [distribuzione esponenziale](../settimana_06/index.md#media-esponenziale), che ha media e deviazione standard uguali.

Dalla Settimana 4 ci serve un’idea sola: una variabile con **distribuzione binomiale** conta i successi in $n$ prove indipendenti, ed è quindi la somma di $n$ indicatrici, cioè di $n$ variabili bernoulliane ([Settimana 4](../settimana_04/index.md#binomiale)). Ciascuna indicatrice ha media $p$ e varianza $p(1-p)$ ([Settimana 8](../settimana_08/index.md#frequenze)).

Infine, tre promesse. Nella [Settimana 6](../settimana_06/index.md#lab-normale) abbiamo visto in un laboratorio che la somma di cinquanta piccoli errori uniformi ha la forma di una campana, anche se nessun errore da solo ce l’ha. Nella [Settimana 7](../settimana_07/index.md#galton) la tavola di Galton ha fatto comparire la stessa campana con i pallini che rimbalzano a destra o a sinistra. Nella [Settimana 8](../settimana_08/index.md#media-campionaria) la distribuzione della media di sedici dadi aveva di nuovo quella forma. Ogni volta abbiamo rimandato la spiegazione a questa settimana. È arrivato il momento di darla.

## Atto I — Il problema più difficile: Abraham De Moivre e le monete {: #de-moivre }

**Abraham De Moivre** (1667–1754) nacque a Vitry-le-François, in Champagne, in una famiglia protestante. Erano gli anni in cui la Francia di Luigi XIV revocava la tolleranza verso i protestanti, e il giovane De Moivre fu imprigionato per motivi di religione. Nel 1688, appena liberato, lasciò la Francia per l’Inghilterra, e a Londra passò il resto della sua lunga vita. Era stimato dai più grandi matematici del tempo: si racconta che Isaac Newton, quando qualcuno gli chiedeva spiegazioni sui suoi *Principia*, rispondesse «Andate dal signor De Moivre: queste cose le sa meglio di me». Eppure De Moivre non ottenne mai un posto all’università. Visse dando lezioni private di matematica, andando a casa degli allievi o incontrandoli nei caffè di Londra, e uno dei locali in cui passava le sue giornate era probabilmente lo Slaughter’s Coffee House. Morì povero. Il suo libro sul calcolo delle probabilità, *The Doctrine of Chances*, cioè «La dottrina dei casi», ebbe tre edizioni, nel 1718, nel 1738 e nel 1756; l’ultima uscì due anni dopo la sua morte.

Nelle ultime pagine del libro De Moivre affronta una domanda che riprende quella di Jacob Bernoulli, che abbiamo incontrato nella [Settimana 8](../settimana_08/index.md#bernoulli). Bernoulli aveva dimostrato che, ripetendo molte volte una prova, diventa sempre più improbabile trovare la frazione dei successi lontana dalla probabilità del successo. Per la sua urna aveva anche fatto il conto: con 25 550 estrazioni, la frazione di bianchi cade fuori dal margine di 1/50 attorno a 3/5 con una probabilità più di mille volte minore di quella di cadere dentro. Il suo risultato, però, era una garanzia, ottenuta con un ragionamento lungo e faticoso: diceva che uno scarto di una certa grandezza era meno probabile di una soglia, ma non **quanto** fosse probabile davvero. Ed era una garanzia molto prudente: nell’[Atto V](#laplace) vedremo che per la stessa urna bastano circa 6500 estrazioni. De Moivre pone il dubbio in modo concreto. Prendiamo un evento che può accadere o non accadere con la stessa facilità, come testa nel lancio di una moneta equilibrata. Dopo tremila prove, è possibile che l’evento sia accaduto duemila volte e mancato mille? Se lo è, quanto è improbabile uno scarto così grande dalla parità? Attenzione a che cosa chiede: non la probabilità di avere esattamente duemila teste, ma quella di allontanarsi dalla metà almeno così tanto, cioè di avere duemila teste o più, oppure mille o meno. Rispondere con un numero, scrive, renderebbe la mente meglio disposta verso le conclusioni tratte dagli esperimenti. E aggiunge:

> «Mi prenderò la libertà di dire che questo è il problema più difficile che si possa proporre in materia di probabilità, e per questo l’ho riservato per ultimo.»
> — A. De Moivre, *The Doctrine of Chances*, 3ª ed., 1756, p. 242 (tradotto dall’inglese)

Perché è così difficile? Il numero di teste in tremila lanci ha distribuzione binomiale, e la probabilità di ciascun valore si scrive con un coefficiente binomiale: per esempio la probabilità di esattamente $k$ teste è $\binom{3000}{k}/2^{3000}$. Già un solo termine è faticoso, perché è il rapporto tra due numeri di oltre ottocento cifre. La domanda di De Moivre, però, ne richiede molti: per la probabilità di avere duemila teste o più bisogna sommare i termini con $k = 2000, 2001, \dots, 3000$, che sono più di mille, e altrettanti servono per mille teste o meno. Lo stesso succede ogni volta che ci si chiede quanto è probabile che il numero di teste cada tra due valori. Per un calcolatore di oggi è un lavoro da niente; per un uomo con carta e penna, nel Settecento, era impossibile.

De Moivre trovò una scorciatoia. La stampò il 12 novembre 1733 in un opuscolo in latino, che fece circolare tra gli amici, e la tradusse in inglese nelle edizioni successive del libro. Invece di sommare i termini uno per uno, scoprì che, quando il numero dei lanci è grande, i termini vicino al centro seguono una curva regolare, che si può sommare con un’area. In notazione moderna è la curva con il fattore $e^{-x^2/2}$ della distribuzione normale; nella costante davanti compare $\sqrt{2\pi}$, che l’amico James Stirling lo aiutò a trovare, e che secondo De Moivre «ha diffuso una singolare eleganza sulla soluzione» (p. 244).

Con la sua curva De Moivre calcolò alcuni numeri che conviene guardare da vicino. Supponiamo, scrive (p. 246), di lanciare la moneta 3600 volte. La metà dei lanci è 1800, e la radice quadrata di 3600 è 60, la cui metà è 30. Allora la probabilità che il numero di teste stia tra 1770 e 1830, cioè entro 30 da 1800, è 0,682688. La probabilità di stare entro 60, cioè tra 1740 e 1860, è 0,95428, e quella di stare entro 90, cioè tra 1710 e 1890, è 0,99874 (p. 248). Questi tre numeri li conosciamo: sono, con piccole differenze dovute ai conti a mano, il 68%, il 95% e il 99,7% della regola della [Settimana 6](../settimana_06/index.md#regola-empirica). Non è una coincidenza. Il numero di teste in $n$ lanci ha varianza $n\cdot\frac12\cdot\frac12=n/4$, perché è una somma di $n$ indicatrici indipendenti con varianza $\frac12\cdot\frac12$ ciascuna, e quindi ha deviazione standard $\frac12\sqrt n$. La distanza «$\frac12\sqrt n$» di De Moivre è proprio una deviazione standard, e i suoi tre intervalli sono una, due e tre deviazioni standard attorno alla media.

<figure markdown="0">
<svg viewBox="0 0 580 270" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Il numero di teste in 3600 lanci di una moneta equilibrata: barre sottili che formano una campana centrata in 1800. Le barre tra 1770 e 1830 sono verdi e contengono il 69 per cento della probabilità; la curva di De Moivre, sovrapposta, dà il 68,3 per cento.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">Teste in 3600 lanci: la campana di De Moivre</text>
<rect x="38.74" y="214.4" width="2.02" height="0.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="41.26" y="214.3" width="2.02" height="0.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="43.79" y="214.3" width="2.02" height="0.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="46.31" y="214.2" width="2.02" height="0.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="48.84" y="214.1" width="2.02" height="0.9" fill="#4051b5" fill-opacity="0.45"/>
<rect x="51.36" y="214.0" width="2.02" height="1.0" fill="#4051b5" fill-opacity="0.45"/>
<rect x="53.89" y="213.9" width="2.02" height="1.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="56.41" y="213.7" width="2.02" height="1.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="58.94" y="213.6" width="2.02" height="1.4" fill="#4051b5" fill-opacity="0.45"/>
<rect x="61.46" y="213.5" width="2.02" height="1.5" fill="#4051b5" fill-opacity="0.45"/>
<rect x="63.99" y="213.3" width="2.02" height="1.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="66.51" y="213.1" width="2.02" height="1.9" fill="#4051b5" fill-opacity="0.45"/>
<rect x="69.04" y="212.9" width="2.02" height="2.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="71.56" y="212.7" width="2.02" height="2.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="74.09" y="212.5" width="2.02" height="2.5" fill="#4051b5" fill-opacity="0.45"/>
<rect x="76.61" y="212.2" width="2.02" height="2.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="79.14" y="212.0" width="2.02" height="3.0" fill="#4051b5" fill-opacity="0.45"/>
<rect x="81.66" y="211.7" width="2.02" height="3.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="84.19" y="211.4" width="2.02" height="3.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="86.71" y="211.0" width="2.02" height="4.0" fill="#4051b5" fill-opacity="0.45"/>
<rect x="89.24" y="210.6" width="2.02" height="4.4" fill="#4051b5" fill-opacity="0.45"/>
<rect x="91.76" y="210.2" width="2.02" height="4.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="94.29" y="209.8" width="2.02" height="5.2" fill="#4051b5" fill-opacity="0.45"/>
<rect x="96.81" y="209.3" width="2.02" height="5.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="99.34" y="208.8" width="2.02" height="6.2" fill="#4051b5" fill-opacity="0.45"/>
<rect x="101.86" y="208.3" width="2.02" height="6.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="104.39" y="207.7" width="2.02" height="7.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="106.91" y="207.1" width="2.02" height="7.9" fill="#4051b5" fill-opacity="0.45"/>
<rect x="109.44" y="206.4" width="2.02" height="8.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="111.96" y="205.7" width="2.02" height="9.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="114.49" y="205.0" width="2.02" height="10.0" fill="#4051b5" fill-opacity="0.45"/>
<rect x="117.01" y="204.2" width="2.02" height="10.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="119.54" y="203.3" width="2.02" height="11.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="122.06" y="202.4" width="2.02" height="12.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="124.59" y="201.4" width="2.02" height="13.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="127.11" y="200.4" width="2.02" height="14.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="129.64" y="199.3" width="2.02" height="15.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="132.16" y="198.2" width="2.02" height="16.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="134.69" y="196.9" width="2.02" height="18.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="137.21" y="195.7" width="2.02" height="19.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="139.74" y="194.3" width="2.02" height="20.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="142.26" y="192.9" width="2.02" height="22.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="144.79" y="191.4" width="2.02" height="23.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="147.31" y="189.9" width="2.02" height="25.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="149.84" y="188.2" width="2.02" height="26.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="152.36" y="186.5" width="2.02" height="28.5" fill="#4051b5" fill-opacity="0.45"/>
<rect x="154.89" y="184.8" width="2.02" height="30.2" fill="#4051b5" fill-opacity="0.45"/>
<rect x="157.41" y="182.9" width="2.02" height="32.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="159.94" y="181.0" width="2.02" height="34.0" fill="#4051b5" fill-opacity="0.45"/>
<rect x="162.46" y="179.0" width="2.02" height="36.0" fill="#4051b5" fill-opacity="0.45"/>
<rect x="164.99" y="176.9" width="2.02" height="38.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="167.51" y="174.7" width="2.02" height="40.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="170.04" y="172.5" width="2.02" height="42.5" fill="#4051b5" fill-opacity="0.45"/>
<rect x="172.56" y="170.2" width="2.02" height="44.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="175.09" y="167.8" width="2.02" height="47.2" fill="#4051b5" fill-opacity="0.45"/>
<rect x="177.61" y="165.4" width="2.02" height="49.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="180.14" y="162.9" width="2.02" height="52.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="182.66" y="160.3" width="2.02" height="54.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="185.19" y="157.7" width="2.02" height="57.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="187.71" y="154.9" width="2.02" height="60.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="190.24" y="152.2" width="2.02" height="62.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="192.76" y="149.4" width="2.02" height="65.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="195.29" y="146.5" width="2.02" height="68.5" fill="#4051b5" fill-opacity="0.45"/>
<rect x="197.81" y="143.6" width="2.02" height="71.4" fill="#4051b5" fill-opacity="0.45"/>
<rect x="200.34" y="140.6" width="2.02" height="74.4" fill="#4051b5" fill-opacity="0.45"/>
<rect x="202.86" y="137.6" width="2.02" height="77.4" fill="#4051b5" fill-opacity="0.45"/>
<rect x="205.39" y="134.6" width="2.02" height="80.4" fill="#4051b5" fill-opacity="0.45"/>
<rect x="207.91" y="131.6" width="2.02" height="83.4" fill="#4051b5" fill-opacity="0.45"/>
<rect x="210.44" y="128.5" width="2.02" height="86.5" fill="#4051b5" fill-opacity="0.45"/>
<rect x="212.96" y="125.4" width="2.02" height="89.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="215.49" y="122.3" width="2.02" height="92.7" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="218.01" y="119.2" width="2.02" height="95.8" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="220.54" y="116.2" width="2.02" height="98.8" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="223.06" y="113.1" width="2.02" height="101.9" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="225.59" y="110.0" width="2.02" height="105.0" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="228.11" y="107.0" width="2.02" height="108.0" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="230.64" y="104.1" width="2.02" height="110.9" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="233.16" y="101.1" width="2.02" height="113.9" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="235.69" y="98.2" width="2.02" height="116.8" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="238.21" y="95.4" width="2.02" height="119.6" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="240.74" y="92.7" width="2.02" height="122.3" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="243.26" y="90.0" width="2.02" height="125.0" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="245.79" y="87.4" width="2.02" height="127.6" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="248.31" y="84.9" width="2.02" height="130.1" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="250.84" y="82.5" width="2.02" height="132.5" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="253.36" y="80.2" width="2.02" height="134.8" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="255.89" y="78.0" width="2.02" height="137.0" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="258.41" y="75.9" width="2.02" height="139.1" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="260.94" y="74.0" width="2.02" height="141.0" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="263.46" y="72.2" width="2.02" height="142.8" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="265.99" y="70.5" width="2.02" height="144.5" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="268.51" y="68.9" width="2.02" height="146.1" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="271.04" y="67.6" width="2.02" height="147.4" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="273.56" y="66.3" width="2.02" height="148.7" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="276.09" y="65.2" width="2.02" height="149.8" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="278.61" y="64.3" width="2.02" height="150.7" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="281.14" y="63.6" width="2.02" height="151.4" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="283.66" y="63.0" width="2.02" height="152.0" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="286.19" y="62.6" width="2.02" height="152.4" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="288.71" y="62.3" width="2.02" height="152.7" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="291.24" y="62.2" width="2.02" height="152.8" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="293.76" y="62.3" width="2.02" height="152.7" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="296.29" y="62.6" width="2.02" height="152.4" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="298.81" y="63.0" width="2.02" height="152.0" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="301.34" y="63.6" width="2.02" height="151.4" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="303.86" y="64.3" width="2.02" height="150.7" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="306.39" y="65.2" width="2.02" height="149.8" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="308.91" y="66.3" width="2.02" height="148.7" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="311.44" y="67.6" width="2.02" height="147.4" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="313.96" y="68.9" width="2.02" height="146.1" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="316.49" y="70.5" width="2.02" height="144.5" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="319.01" y="72.2" width="2.02" height="142.8" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="321.54" y="74.0" width="2.02" height="141.0" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="324.06" y="75.9" width="2.02" height="139.1" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="326.59" y="78.0" width="2.02" height="137.0" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="329.11" y="80.2" width="2.02" height="134.8" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="331.64" y="82.5" width="2.02" height="132.5" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="334.16" y="84.9" width="2.02" height="130.1" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="336.69" y="87.4" width="2.02" height="127.6" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="339.21" y="90.0" width="2.02" height="125.0" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="341.74" y="92.7" width="2.02" height="122.3" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="344.26" y="95.4" width="2.02" height="119.6" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="346.79" y="98.2" width="2.02" height="116.8" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="349.31" y="101.1" width="2.02" height="113.9" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="351.84" y="104.1" width="2.02" height="110.9" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="354.36" y="107.0" width="2.02" height="108.0" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="356.89" y="110.0" width="2.02" height="105.0" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="359.41" y="113.1" width="2.02" height="101.9" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="361.94" y="116.2" width="2.02" height="98.8" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="364.46" y="119.2" width="2.02" height="95.8" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="366.99" y="122.3" width="2.02" height="92.7" fill="#2e9e5b" fill-opacity="0.85"/>
<rect x="369.51" y="125.4" width="2.02" height="89.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="372.04" y="128.5" width="2.02" height="86.5" fill="#4051b5" fill-opacity="0.45"/>
<rect x="374.56" y="131.6" width="2.02" height="83.4" fill="#4051b5" fill-opacity="0.45"/>
<rect x="377.09" y="134.6" width="2.02" height="80.4" fill="#4051b5" fill-opacity="0.45"/>
<rect x="379.61" y="137.6" width="2.02" height="77.4" fill="#4051b5" fill-opacity="0.45"/>
<rect x="382.14" y="140.6" width="2.02" height="74.4" fill="#4051b5" fill-opacity="0.45"/>
<rect x="384.66" y="143.6" width="2.02" height="71.4" fill="#4051b5" fill-opacity="0.45"/>
<rect x="387.19" y="146.5" width="2.02" height="68.5" fill="#4051b5" fill-opacity="0.45"/>
<rect x="389.71" y="149.4" width="2.02" height="65.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="392.24" y="152.2" width="2.02" height="62.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="394.76" y="154.9" width="2.02" height="60.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="397.29" y="157.7" width="2.02" height="57.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="399.81" y="160.3" width="2.02" height="54.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="402.34" y="162.9" width="2.02" height="52.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="404.86" y="165.4" width="2.02" height="49.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="407.39" y="167.8" width="2.02" height="47.2" fill="#4051b5" fill-opacity="0.45"/>
<rect x="409.91" y="170.2" width="2.02" height="44.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="412.44" y="172.5" width="2.02" height="42.5" fill="#4051b5" fill-opacity="0.45"/>
<rect x="414.96" y="174.7" width="2.02" height="40.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="417.49" y="176.9" width="2.02" height="38.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="420.01" y="179.0" width="2.02" height="36.0" fill="#4051b5" fill-opacity="0.45"/>
<rect x="422.54" y="181.0" width="2.02" height="34.0" fill="#4051b5" fill-opacity="0.45"/>
<rect x="425.06" y="182.9" width="2.02" height="32.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="427.59" y="184.8" width="2.02" height="30.2" fill="#4051b5" fill-opacity="0.45"/>
<rect x="430.11" y="186.5" width="2.02" height="28.5" fill="#4051b5" fill-opacity="0.45"/>
<rect x="432.64" y="188.2" width="2.02" height="26.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="435.16" y="189.9" width="2.02" height="25.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="437.69" y="191.4" width="2.02" height="23.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="440.21" y="192.9" width="2.02" height="22.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="442.74" y="194.3" width="2.02" height="20.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="445.26" y="195.7" width="2.02" height="19.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="447.79" y="196.9" width="2.02" height="18.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="450.31" y="198.2" width="2.02" height="16.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="452.84" y="199.3" width="2.02" height="15.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="455.36" y="200.4" width="2.02" height="14.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="457.89" y="201.4" width="2.02" height="13.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="460.41" y="202.4" width="2.02" height="12.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="462.94" y="203.3" width="2.02" height="11.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="465.46" y="204.2" width="2.02" height="10.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="467.99" y="205.0" width="2.02" height="10.0" fill="#4051b5" fill-opacity="0.45"/>
<rect x="470.51" y="205.7" width="2.02" height="9.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="473.04" y="206.4" width="2.02" height="8.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="475.56" y="207.1" width="2.02" height="7.9" fill="#4051b5" fill-opacity="0.45"/>
<rect x="478.09" y="207.7" width="2.02" height="7.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="480.61" y="208.3" width="2.02" height="6.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="483.14" y="208.8" width="2.02" height="6.2" fill="#4051b5" fill-opacity="0.45"/>
<rect x="485.66" y="209.3" width="2.02" height="5.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="488.19" y="209.8" width="2.02" height="5.2" fill="#4051b5" fill-opacity="0.45"/>
<rect x="490.71" y="210.2" width="2.02" height="4.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="493.24" y="210.6" width="2.02" height="4.4" fill="#4051b5" fill-opacity="0.45"/>
<rect x="495.76" y="211.0" width="2.02" height="4.0" fill="#4051b5" fill-opacity="0.45"/>
<rect x="498.29" y="211.4" width="2.02" height="3.6" fill="#4051b5" fill-opacity="0.45"/>
<rect x="500.81" y="211.7" width="2.02" height="3.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="503.34" y="212.0" width="2.02" height="3.0" fill="#4051b5" fill-opacity="0.45"/>
<rect x="505.86" y="212.2" width="2.02" height="2.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="508.39" y="212.5" width="2.02" height="2.5" fill="#4051b5" fill-opacity="0.45"/>
<rect x="510.91" y="212.7" width="2.02" height="2.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="513.44" y="212.9" width="2.02" height="2.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="515.96" y="213.1" width="2.02" height="1.9" fill="#4051b5" fill-opacity="0.45"/>
<rect x="518.49" y="213.3" width="2.02" height="1.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="521.01" y="213.5" width="2.02" height="1.5" fill="#4051b5" fill-opacity="0.45"/>
<rect x="523.54" y="213.6" width="2.02" height="1.4" fill="#4051b5" fill-opacity="0.45"/>
<rect x="526.06" y="213.7" width="2.02" height="1.3" fill="#4051b5" fill-opacity="0.45"/>
<rect x="528.59" y="213.9" width="2.02" height="1.1" fill="#4051b5" fill-opacity="0.45"/>
<rect x="531.11" y="214.0" width="2.02" height="1.0" fill="#4051b5" fill-opacity="0.45"/>
<rect x="533.64" y="214.1" width="2.02" height="0.9" fill="#4051b5" fill-opacity="0.45"/>
<rect x="536.16" y="214.2" width="2.02" height="0.8" fill="#4051b5" fill-opacity="0.45"/>
<rect x="538.69" y="214.3" width="2.02" height="0.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="541.21" y="214.3" width="2.02" height="0.7" fill="#4051b5" fill-opacity="0.45"/>
<rect x="543.74" y="214.4" width="2.02" height="0.6" fill="#4051b5" fill-opacity="0.45"/>
<polyline points="40.0,214.4 41.7,214.4 43.4,214.3 45.1,214.3 46.8,214.2 48.4,214.1 50.1,214.1 51.8,214.0 53.5,213.9 55.2,213.9 56.9,213.8 58.6,213.7 60.3,213.6 62.0,213.5 63.6,213.4 65.3,213.3 67.0,213.2 68.7,213.1 70.4,212.9 72.1,212.8 73.8,212.6 75.5,212.5 77.2,212.3 78.8,212.1 80.5,212.0 82.2,211.8 83.9,211.6 85.6,211.3 87.3,211.1 89.0,210.9 90.7,210.6 92.4,210.3 94.0,210.1 95.7,209.8 97.4,209.5 99.1,209.1 100.8,208.8 102.5,208.4 104.2,208.0 105.9,207.7 107.6,207.2 109.2,206.8 110.9,206.4 112.6,205.9 114.3,205.4 116.0,204.9 117.7,204.3 119.4,203.8 121.1,203.2 122.8,202.6 124.4,202.0 126.1,201.3 127.8,200.6 129.5,199.9 131.2,199.2 132.9,198.4 134.6,197.6 136.3,196.8 138.0,195.9 139.6,195.1 141.3,194.1 143.0,193.2 144.7,192.2 146.4,191.2 148.1,190.2 149.8,189.1 151.5,188.0 153.2,186.9 154.8,185.7 156.5,184.5 158.2,183.2 159.9,182.0 161.6,180.7 163.3,179.3 165.0,178.0 166.7,176.5 168.4,175.1 170.1,173.6 171.7,172.1 173.4,170.6 175.1,169.0 176.8,167.4 178.5,165.8 180.2,164.1 181.9,162.4 183.6,160.7 185.3,158.9 186.9,157.1 188.6,155.3 190.3,153.5 192.0,151.6 193.7,149.7 195.4,147.8 197.1,145.9 198.8,143.9 200.5,142.0 202.1,140.0 203.8,138.0 205.5,136.0 207.2,133.9 208.9,131.9 210.6,129.9 212.3,127.8 214.0,125.7 215.7,123.7 217.3,121.6 219.0,119.5 220.7,117.5 222.4,115.4 224.1,113.4 225.8,111.3 227.5,109.3 229.2,107.3 230.9,105.3 232.5,103.3 234.2,101.3 235.9,99.4 237.6,97.5 239.3,95.6 241.0,93.8 242.7,91.9 244.4,90.1 246.1,88.4 247.7,86.7 249.4,85.0 251.1,83.4 252.8,81.8 254.5,80.3 256.2,78.8 257.9,77.4 259.6,76.0 261.3,74.7 262.9,73.4 264.6,72.2 266.3,71.1 268.0,70.0 269.7,69.0 271.4,68.0 273.1,67.2 274.8,66.3 276.5,65.6 278.1,64.9 279.8,64.3 281.5,63.8 283.2,63.4 284.9,63.0 286.6,62.7 288.3,62.4 290.0,62.3 291.7,62.2 293.3,62.2 295.0,62.3 296.7,62.4 298.4,62.7 300.1,63.0 301.8,63.4 303.5,63.8 305.2,64.3 306.9,64.9 308.5,65.6 310.2,66.3 311.9,67.2 313.6,68.0 315.3,69.0 317.0,70.0 318.7,71.1 320.4,72.2 322.1,73.4 323.7,74.7 325.4,76.0 327.1,77.4 328.8,78.8 330.5,80.3 332.2,81.8 333.9,83.4 335.6,85.0 337.3,86.7 338.9,88.4 340.6,90.1 342.3,91.9 344.0,93.8 345.7,95.6 347.4,97.5 349.1,99.4 350.8,101.3 352.5,103.3 354.1,105.3 355.8,107.3 357.5,109.3 359.2,111.3 360.9,113.4 362.6,115.4 364.3,117.5 366.0,119.5 367.7,121.6 369.3,123.7 371.0,125.7 372.7,127.8 374.4,129.9 376.1,131.9 377.8,133.9 379.5,136.0 381.2,138.0 382.9,140.0 384.5,142.0 386.2,143.9 387.9,145.9 389.6,147.8 391.3,149.7 393.0,151.6 394.7,153.5 396.4,155.3 398.1,157.1 399.7,158.9 401.4,160.7 403.1,162.4 404.8,164.1 406.5,165.8 408.2,167.4 409.9,169.0 411.6,170.6 413.3,172.1 414.9,173.6 416.6,175.1 418.3,176.5 420.0,178.0 421.7,179.3 423.4,180.7 425.1,182.0 426.8,183.2 428.5,184.5 430.2,185.7 431.8,186.9 433.5,188.0 435.2,189.1 436.9,190.2 438.6,191.2 440.3,192.2 442.0,193.2 443.7,194.1 445.4,195.1 447.0,195.9 448.7,196.8 450.4,197.6 452.1,198.4 453.8,199.2 455.5,199.9 457.2,200.6 458.9,201.3 460.6,202.0 462.2,202.6 463.9,203.2 465.6,203.8 467.3,204.3 469.0,204.9 470.7,205.4 472.4,205.9 474.1,206.4 475.8,206.8 477.4,207.2 479.1,207.7 480.8,208.0 482.5,208.4 484.2,208.8 485.9,209.1 487.6,209.5 489.3,209.8 491.0,210.1 492.6,210.3 494.3,210.6 496.0,210.9 497.7,211.1 499.4,211.3 501.1,211.6 502.8,211.8 504.5,212.0 506.2,212.1 507.8,212.3 509.5,212.5 511.2,212.6 512.9,212.8 514.6,212.9 516.3,213.1 518.0,213.2 519.7,213.3 521.4,213.4 523.0,213.5 524.7,213.6 526.4,213.7 528.1,213.8 529.8,213.9 531.5,213.9 533.2,214.0 534.9,214.1 536.6,214.1 538.2,214.2 539.9,214.3 541.6,214.3 543.3,214.4 545.0,214.4" fill="none" stroke="#e07a1f" stroke-width="2.2"/>
<line x1="40.0" y1="215.0" x2="545.0" y2="215.0" stroke="currentColor" stroke-width="1"/>
<line x1="65.2" y1="215.0" x2="65.2" y2="220.0" stroke="currentColor" stroke-width="1"/>
<text x="65.2" y="233.0" text-anchor="middle" fill="currentColor">1710</text>
<line x1="141.0" y1="215.0" x2="141.0" y2="220.0" stroke="currentColor" stroke-width="1"/>
<text x="141.0" y="233.0" text-anchor="middle" fill="currentColor">1740</text>
<line x1="216.8" y1="215.0" x2="216.8" y2="220.0" stroke="currentColor" stroke-width="1"/>
<text x="216.8" y="233.0" text-anchor="middle" fill="currentColor">1770</text>
<line x1="292.5" y1="215.0" x2="292.5" y2="220.0" stroke="currentColor" stroke-width="1"/>
<text x="292.5" y="233.0" text-anchor="middle" fill="currentColor">1800</text>
<line x1="368.2" y1="215.0" x2="368.2" y2="220.0" stroke="currentColor" stroke-width="1"/>
<text x="368.2" y="233.0" text-anchor="middle" fill="currentColor">1830</text>
<line x1="444.0" y1="215.0" x2="444.0" y2="220.0" stroke="currentColor" stroke-width="1"/>
<text x="444.0" y="233.0" text-anchor="middle" fill="currentColor">1860</text>
<line x1="519.8" y1="215.0" x2="519.8" y2="220.0" stroke="currentColor" stroke-width="1"/>
<text x="519.8" y="233.0" text-anchor="middle" fill="currentColor">1890</text>
<text x="290.0" y="253.0" text-anchor="middle" fill="currentColor">numero di teste</text>
<text x="292.5" y="42.0" text-anchor="middle" fill="#2e9e5b" font-weight="bold">1800 ± 30: 69,1% (esatto)</text>
<text x="474.3" y="95.0" text-anchor="middle" fill="#e07a1f" font-weight="bold">curva di</text>
<text x="474.3" y="111.0" text-anchor="middle" fill="#e07a1f" font-weight="bold">De Moivre: 68,3%</text>
</svg>
<figcaption>La distribuzione binomiale del numero di teste in 3600 lanci di una moneta equilibrata: una barra sottile per ogni valore. La deviazione standard è ½√3600 = 30. Le barre verdi, tra 1770 e 1830, contengono il 69,1% della probabilità (conto esatto, con i due estremi); l’area sotto la curva di De Moivre, in arancione, tra gli stessi estremi è il 68,3%. A questa scala le barre e la curva quasi coincidono.</figcaption>
</figure>

Il cuore della scoperta è la **radice quadrata**. Per capire che cosa vuol dire, chiamiamo **scarto** la distanza tra il numero di teste e la metà dei lanci. Con 3600 lanci la metà è 1800: se escono 1830 teste, oppure 1770, lo scarto è di 30 teste, una volta in su e una volta in giù. Abbiamo appena visto quanto è grande, di solito, questo scarto: circa due volte su tre non supera 30, che è una deviazione standard, e quasi mai supera 90, che sono tre deviazioni standard. Ora chiediamoci che cosa succede se lanciamo la moneta cento volte di più, cioè 360 000 volte. Verrebbe da pensare che anche lo scarto diventi cento volte più grande, ma non è così. La deviazione standard è $\frac12\sqrt n$, e quindi cresce come la radice quadrata del numero dei lanci: con 360 000 lanci la metà è 180 000, e la deviazione standard è $\frac12\sqrt{360\,000}=\frac12\cdot600=300$. I lanci sono diventati cento volte di più, ma lo scarto che dobbiamo aspettarci è diventato soltanto dieci volte più grande: prima era di qualche decina di teste, ora è di qualche centinaio. De Moivre lo dice così:

> «Questa radice quadrata sarà per così dire il modulo con cui dobbiamo regolare la nostra stima.»
> — A. De Moivre, *The Doctrine of Chances*, 3ª ed., 1756, p. 248 (tradotto dall’inglese)

È la stessa radice che nella [Settimana 8](../settimana_08/index.md#diluizione) ci ha mostrato due facce: la differenza tra teste e metà dei lanci cresce come $\sqrt n$, mentre la frazione di teste si stringe come $1/\sqrt n$. Ora possiamo anche rispondere alla domanda di De Moivre. Con tremila lanci la deviazione standard del numero di teste è $\frac12\sqrt{3000}\approx27{,}4$, e duemila teste stanno 500 sopra la metà, cioè più di diciotto deviazioni standard sopra la media. Uno scarto così grande è tanto improbabile da potersi considerare impossibile: la probabilità di avere duemila teste o più, oppure mille o meno, è circa $10^{-75}$.

De Moivre aggiunge un’osservazione che ci servirà alla fine della settimana: per usare la sua regola

> «non si deve credere che sia necessario che il numero $n$ sia immensamente grande: anche se non arriva alla 900ª potenza, anzi nemmeno alla 100ª, la regola qui data sarà abbastanza accurata, come ho confermato con delle prove.»
> — A. De Moivre, *The Doctrine of Chances*, 3ª ed., 1756, p. 247 (tradotto dall’inglese)

Per una moneta equilibrata, insomma, già cento lanci bastano. Terremo a mente la cautela di quel «per una moneta equilibrata».

La curva che De Moivre trovò nel 1733 per i lanci di una moneta è la stessa che Gauss avrebbe trovato nel 1809 per gli errori di misura, come abbiamo visto nella [Settimana 6](../settimana_06/index.md#cerere). Il motivo, lo avevamo intuito allora, è che in entrambe le situazioni il risultato è una **somma di molti piccoli contributi indipendenti**: il numero di teste è la somma di tanti lanci, ciascuno dei quali aggiunge 1 o 0; l’errore di una misura è la somma di tanti piccoli disturbi. Questa settimana trasformiamo l’intuizione in un teorema: qualunque somma di molti contributi indipendenti, qualunque sia la loro forma, ha approssimativamente la distribuzione della campana.

!!! example "Sosta di verifica"
    Lanci una moneta equilibrata 10 000 volte. Ragionando come De Moivre, tra quali valori cade il numero di teste con probabilità di circa il 68%? E con probabilità di circa il 95%? Che cosa vuol dire per la frazione di teste?

    ??? esempio-svolto "Risposta"
        La media è 5000 e la deviazione standard è $\frac12\sqrt{10\,000}=\frac12\cdot100=50$. Entro una deviazione standard, cioè tra 4950 e 5050, il numero di teste cade con probabilità di circa il 68%; entro due, tra 4900 e 5100, con probabilità di circa il 95%. Dividendo per 10 000, la frazione di teste sta tra 0,495 e 0,505 con probabilità di circa il 68%, e tra 0,49 e 0,51 con probabilità di circa il 95%. Il conto esatto con la distribuzione binomiale, includendo i due estremi, dà 68,75% per il primo intervallo: la differenza dal 68,3% della curva viene dal fatto che i valori interi agli estremi pesano un po’, come vedremo con i dieci dadi.

## Atto II — Non solo la legge dei grandi numeri: la forma della somma {: #forma }

Riprendiamo la media campionaria della Settimana 8. Sommando $n$ variabili i.i.d. con media $\mu$ e varianza $\sigma^2$ e dividendo per $n$ otteniamo la variabile aleatoria $\bar X_n$, con valore atteso $\mu$ e varianza $\sigma^2/n$. Fin qui è la Settimana 8. Ma non c’è solo questo, e la novità sta in una riga: per valori grandi di $n$, la variabile $\bar X_n$ è distribuita come una gaussiana. Prima di enunciarlo in modo preciso, vediamolo succedere.

### Tre lenti sulla stessa somma {: #tre-lenti }

Partiamo da un esempio semplicissimo. Una pedina si muove su una retta: a ogni passo lancia una moneta e si sposta di un’unità a destra se esce testa, di un’unità a sinistra se esce croce. Il passo $i$ è quindi una variabile $X_i$ che vale $+1$ o $-1$ con probabilità $1/2$ ciascuno. La sua media è $\mu=\frac12\cdot(+1)+\frac12\cdot(-1)=0$, e la sua varianza è la media del quadrato, perché la media è zero: $\sigma^2=\frac12\cdot1+\frac12\cdot1=1$. Dopo $n$ passi la pedina si trova nella posizione $S_n=X_1+\cdots+X_n$. È la **passeggiata aleatoria**, ed è anche il percorso di un pallino nella tavola di Galton, che a ogni chiodo scarta a destra o a sinistra.

Guardiamo la stessa somma con tre lenti diverse. La prima lente è la somma stessa, $S_n$. Ha media 0 e varianza $n\sigma^2=n$, quindi deviazione standard $\sqrt n$: le passeggiate si allontanano dall’origine sempre di più, e dopo mille passi una distanza di trenta o quaranta unità è del tutto normale. La seconda lente è la media, $S_n/n$. Ha varianza $n/n^2=1/n$, che va a zero: è la legge dei grandi numeri, e tutte le passeggiate, viste così, si schiacciano sullo zero. La terza lente è a metà strada: dividiamo per $\sqrt n$ invece che per $n$. Per la regola dei cambi di scala della Settimana 5, $\operatorname{Var}(aX)=a^2\operatorname{Var}(X)$, con $a=1/\sqrt n$:

$$
\operatorname{Var}\!\left(\frac{S_n}{\sqrt n}\right)=\frac{1}{(\sqrt n)^2}\operatorname{Var}(S_n)=\frac{n\sigma^2}{n}=\sigma^2.
$$

La varianza è sempre $\sigma^2$, qualunque sia $n$: con questa lente le passeggiate non si allargano e non si stringono. La figura mostra otto passeggiate guardate attraverso queste tre lenti.

<figure markdown="0">
<svg viewBox="0 0 580 250" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Tre grafici delle stesse otto passeggiate aleatorie di mille passi da più o meno uno. A sinistra la somma si allarga come la radice di n. Al centro la media si stringe verso zero. A destra la somma divisa per la radice di n resta sempre larga allo stesso modo, tra meno due e due.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">Le stesse 8 passeggiate, guardate con tre lenti</text>
<text x="107.0" y="40.0" text-anchor="middle" fill="currentColor" font-weight="bold">la somma Sₙ</text>
<line x1="22.0" y1="125.0" x2="192.0" y2="125.0" stroke="currentColor" stroke-width="1" opacity="0.5"/>
<line x1="22.0" y1="45.0" x2="22.0" y2="205.0" stroke="currentColor" stroke-width="1"/>
<polyline points="22.2,126.0 22.3,127.0 22.5,128.0 22.7,129.0 22.9,130.0 23.0,131.0 23.2,132.0 23.4,131.0 23.5,132.0 23.9,132.0 24.0,133.0 24.4,133.0 24.6,134.0 24.9,134.0 25.4,135.0 25.9,132.0 26.6,132.0 26.9,130.0 27.4,129.0 28.3,134.0 29.3,136.0 30.7,140.0 31.7,140.0 32.0,140.0 33.7,134.0 34.1,134.0 35.8,132.0 36.5,130.0 38.1,128.0 38.8,126.0 40.9,120.0 41.2,122.0 43.6,122.0 44.1,121.0 46.0,124.0 47.8,119.0 48.4,122.0 50.7,124.0 52.3,125.0 53.1,128.0 55.5,132.0 57.4,137.0 57.9,134.0 60.2,136.0 62.6,134.0 63.3,132.0 65.0,132.0 67.4,132.0 69.8,136.0 70.4,134.0 72.2,134.0 74.5,134.0 76.9,136.0 78.6,132.0 79.3,134.0 81.7,134.0 84.0,132.0 86.4,134.0 88.3,141.0 88.8,140.0 91.2,140.0 93.6,140.0 96.0,142.0 98.3,136.0 99.5,137.0 100.7,138.0 103.1,140.0 105.5,134.0 107.8,132.0 110.2,132.0 112.6,134.0 112.8,133.0 115.0,132.0 117.4,130.0 119.7,132.0 122.1,126.0 124.5,124.0 126.9,124.0 128.1,125.0 129.3,128.0 131.7,124.0 134.0,128.0 136.4,126.0 138.8,128.0 141.2,126.0 143.6,128.0 145.9,126.0 146.3,128.0 148.3,130.0 150.7,124.0 153.1,122.0 155.5,118.0 157.8,124.0 160.2,120.0 162.6,122.0 165.0,122.0 167.3,120.0 169.7,118.0 172.1,118.0 174.5,120.0 176.9,120.0 179.2,122.0 181.6,120.0 184.0,120.0 186.4,120.0 188.8,130.0 191.2,130.0 192.0,129.0" fill="none" stroke="#4051b5" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="22.2,124.0 22.3,125.0 22.5,126.0 22.7,125.0 22.9,124.0 23.0,123.0 23.2,122.0 23.4,123.0 23.5,122.0 23.9,122.0 24.0,121.0 24.4,123.0 24.6,122.0 24.9,120.0 25.4,117.0 25.9,116.0 26.6,116.0 26.9,114.0 27.4,111.0 28.3,114.0 29.3,116.0 30.7,114.0 31.7,116.0 32.0,116.0 33.7,120.0 34.1,120.0 35.8,118.0 36.5,120.0 38.1,120.0 38.8,122.0 40.9,126.0 41.2,128.0 43.6,128.0 44.1,131.0 46.0,132.0 47.8,127.0 48.4,126.0 50.7,118.0 52.3,119.0 53.1,120.0 55.5,126.0 57.4,121.0 57.9,120.0 60.2,122.0 62.6,118.0 63.3,122.0 65.0,116.0 67.4,110.0 69.8,108.0 70.4,106.0 72.2,112.0 74.5,112.0 76.9,112.0 78.6,112.0 79.3,112.0 81.7,116.0 84.0,118.0 86.4,118.0 88.3,119.0 88.8,122.0 91.2,126.0 93.6,122.0 96.0,124.0 98.3,124.0 99.5,123.0 100.7,122.0 103.1,124.0 105.5,120.0 107.8,118.0 110.2,118.0 112.6,116.0 112.8,117.0 115.0,120.0 117.4,116.0 119.7,120.0 122.1,122.0 124.5,120.0 126.9,120.0 128.1,117.0 129.3,120.0 131.7,116.0 134.0,120.0 136.4,118.0 138.8,118.0 141.2,114.0 143.6,118.0 145.9,112.0 146.3,112.0 148.3,106.0 150.7,104.0 153.1,100.0 155.5,110.0 157.8,112.0 160.2,110.0 162.6,108.0 165.0,102.0 167.3,96.0 169.7,92.0 172.1,96.0 174.5,100.0 176.9,98.0 179.2,98.0 181.6,96.0 184.0,100.0 186.4,100.0 188.8,98.0 191.2,98.0 192.0,99.0" fill="none" stroke="#e07a1f" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="22.2,126.0 22.3,125.0 22.5,124.0 22.7,125.0 22.9,126.0 23.0,127.0 23.2,126.0 23.4,125.0 23.5,126.0 23.9,128.0 24.0,129.0 24.4,129.0 24.6,130.0 24.9,132.0 25.4,131.0 25.9,132.0 26.6,132.0 26.9,134.0 27.4,135.0 28.3,132.0 29.3,136.0 30.7,142.0 31.7,140.0 32.0,138.0 33.7,138.0 34.1,140.0 35.8,142.0 36.5,140.0 38.1,140.0 38.8,140.0 40.9,138.0 41.2,138.0 43.6,134.0 44.1,133.0 46.0,128.0 47.8,133.0 48.4,136.0 50.7,140.0 52.3,135.0 53.1,134.0 55.5,134.0 57.4,135.0 57.9,136.0 60.2,142.0 62.6,138.0 63.3,140.0 65.0,136.0 67.4,132.0 69.8,132.0 70.4,130.0 72.2,132.0 74.5,136.0 76.9,138.0 78.6,138.0 79.3,138.0 81.7,142.0 84.0,138.0 86.4,136.0 88.3,135.0 88.8,138.0 91.2,138.0 93.6,132.0 96.0,132.0 98.3,134.0 99.5,133.0 100.7,132.0 103.1,136.0 105.5,140.0 107.8,140.0 110.2,138.0 112.6,146.0 112.8,147.0 115.0,148.0 117.4,146.0 119.7,142.0 122.1,140.0 124.5,140.0 126.9,140.0 128.1,139.0 129.3,144.0 131.7,144.0 134.0,142.0 136.4,140.0 138.8,138.0 141.2,142.0 143.6,136.0 145.9,128.0 146.3,128.0 148.3,130.0 150.7,128.0 153.1,126.0 155.5,124.0 157.8,124.0 160.2,118.0 162.6,122.0 165.0,120.0 167.3,116.0 169.7,116.0 172.1,118.0 174.5,120.0 176.9,122.0 179.2,122.0 181.6,126.0 184.0,126.0 186.4,128.0 188.8,132.0 191.2,138.0 192.0,139.0" fill="none" stroke="#2e9e5b" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="22.2,124.0 22.3,125.0 22.5,126.0 22.7,125.0 22.9,124.0 23.0,125.0 23.2,126.0 23.4,127.0 23.5,126.0 23.9,128.0 24.0,127.0 24.4,127.0 24.6,126.0 24.9,124.0 25.4,125.0 25.9,126.0 26.6,126.0 26.9,126.0 27.4,129.0 28.3,124.0 29.3,118.0 30.7,118.0 31.7,122.0 32.0,122.0 33.7,118.0 34.1,120.0 35.8,116.0 36.5,116.0 38.1,116.0 38.8,118.0 40.9,112.0 41.2,112.0 43.6,104.0 44.1,103.0 46.0,104.0 47.8,107.0 48.4,108.0 50.7,110.0 52.3,109.0 53.1,112.0 55.5,120.0 57.4,117.0 57.9,116.0 60.2,116.0 62.6,120.0 63.3,122.0 65.0,118.0 67.4,118.0 69.8,124.0 70.4,126.0 72.2,128.0 74.5,130.0 76.9,128.0 78.6,134.0 79.3,134.0 81.7,132.0 84.0,132.0 86.4,126.0 88.3,127.0 88.8,126.0 91.2,124.0 93.6,126.0 96.0,134.0 98.3,138.0 99.5,137.0 100.7,138.0 103.1,136.0 105.5,134.0 107.8,136.0 110.2,142.0 112.6,150.0 112.8,149.0 115.0,142.0 117.4,144.0 119.7,152.0 122.1,154.0 124.5,154.0 126.9,148.0 128.1,149.0 129.3,154.0 131.7,150.0 134.0,148.0 136.4,146.0 138.8,146.0 141.2,150.0 143.6,148.0 145.9,146.0 146.3,146.0 148.3,150.0 150.7,144.0 153.1,144.0 155.5,150.0 157.8,152.0 160.2,152.0 162.6,152.0 165.0,150.0 167.3,150.0 169.7,148.0 172.1,144.0 174.5,142.0 176.9,142.0 179.2,144.0 181.6,144.0 184.0,138.0 186.4,142.0 188.8,146.0 191.2,156.0 192.0,153.0" fill="none" stroke="#8a4fbf" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="22.2,126.0 22.3,127.0 22.5,128.0 22.7,127.0 22.9,128.0 23.0,129.0 23.2,128.0 23.4,129.0 23.5,128.0 23.9,130.0 24.0,129.0 24.4,131.0 24.6,130.0 24.9,132.0 25.4,131.0 25.9,132.0 26.6,130.0 26.9,128.0 27.4,127.0 28.3,132.0 29.3,132.0 30.7,132.0 31.7,130.0 32.0,132.0 33.7,130.0 34.1,130.0 35.8,132.0 36.5,128.0 38.1,126.0 38.8,128.0 40.9,128.0 41.2,128.0 43.6,126.0 44.1,127.0 46.0,128.0 47.8,127.0 48.4,126.0 50.7,128.0 52.3,129.0 53.1,128.0 55.5,128.0 57.4,133.0 57.9,134.0 60.2,138.0 62.6,132.0 63.3,132.0 65.0,136.0 67.4,138.0 69.8,138.0 70.4,138.0 72.2,138.0 74.5,140.0 76.9,148.0 78.6,146.0 79.3,146.0 81.7,142.0 84.0,148.0 86.4,150.0 88.3,153.0 88.8,154.0 91.2,150.0 93.6,148.0 96.0,146.0 98.3,146.0 99.5,145.0 100.7,150.0 103.1,152.0 105.5,148.0 107.8,156.0 110.2,160.0 112.6,162.0 112.8,161.0 115.0,164.0 117.4,166.0 119.7,164.0 122.1,166.0 124.5,170.0 126.9,174.0 128.1,173.0 129.3,174.0 131.7,178.0 134.0,174.0 136.4,170.0 138.8,168.0 141.2,166.0 143.6,166.0 145.9,164.0 146.3,166.0 148.3,160.0 150.7,162.0 153.1,162.0 155.5,164.0 157.8,166.0 160.2,164.0 162.6,158.0 165.0,160.0 167.3,162.0 169.7,160.0 172.1,162.0 174.5,162.0 176.9,160.0 179.2,166.0 181.6,158.0 184.0,160.0 186.4,158.0 188.8,162.0 191.2,158.0 192.0,159.0" fill="none" stroke="#e03a3a" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="22.2,124.0 22.3,123.0 22.5,122.0 22.7,121.0 22.9,120.0 23.0,121.0 23.2,120.0 23.4,119.0 23.5,118.0 23.9,116.0 24.0,117.0 24.4,117.0 24.6,116.0 24.9,116.0 25.4,117.0 25.9,114.0 26.6,114.0 26.9,114.0 27.4,115.0 28.3,116.0 29.3,114.0 30.7,112.0 31.7,114.0 32.0,116.0 33.7,118.0 34.1,118.0 35.8,120.0 36.5,118.0 38.1,122.0 38.8,120.0 40.9,118.0 41.2,120.0 43.6,122.0 44.1,121.0 46.0,128.0 47.8,125.0 48.4,126.0 50.7,132.0 52.3,133.0 53.1,130.0 55.5,128.0 57.4,125.0 57.9,126.0 60.2,130.0 62.6,132.0 63.3,130.0 65.0,126.0 67.4,132.0 69.8,132.0 70.4,132.0 72.2,134.0 74.5,138.0 76.9,138.0 78.6,142.0 79.3,140.0 81.7,136.0 84.0,134.0 86.4,136.0 88.3,137.0 88.8,134.0 91.2,136.0 93.6,138.0 96.0,140.0 98.3,138.0 99.5,139.0 100.7,142.0 103.1,142.0 105.5,140.0 107.8,140.0 110.2,136.0 112.6,132.0 112.8,133.0 115.0,132.0 117.4,138.0 119.7,142.0 122.1,136.0 124.5,138.0 126.9,136.0 128.1,139.0 129.3,140.0 131.7,136.0 134.0,136.0 136.4,128.0 138.8,130.0 141.2,124.0 143.6,122.0 145.9,124.0 146.3,126.0 148.3,128.0 150.7,128.0 153.1,130.0 155.5,130.0 157.8,126.0 160.2,128.0 162.6,122.0 165.0,122.0 167.3,124.0 169.7,124.0 172.1,122.0 174.5,114.0 176.9,110.0 179.2,108.0 181.6,108.0 184.0,102.0 186.4,104.0 188.8,104.0 191.2,100.0 192.0,105.0" fill="none" stroke="#4051b5" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="22.2,126.0 22.3,127.0 22.5,128.0 22.7,129.0 22.9,130.0 23.0,129.0 23.2,128.0 23.4,127.0 23.5,126.0 23.9,126.0 24.0,125.0 24.4,123.0 24.6,122.0 24.9,122.0 25.4,125.0 25.9,126.0 26.6,122.0 26.9,122.0 27.4,123.0 28.3,124.0 29.3,124.0 30.7,124.0 31.7,126.0 32.0,126.0 33.7,128.0 34.1,130.0 35.8,136.0 36.5,138.0 38.1,138.0 38.8,136.0 40.9,136.0 41.2,136.0 43.6,142.0 44.1,139.0 46.0,142.0 47.8,141.0 48.4,142.0 50.7,140.0 52.3,135.0 53.1,134.0 55.5,138.0 57.4,137.0 57.9,136.0 60.2,138.0 62.6,138.0 63.3,136.0 65.0,138.0 67.4,138.0 69.8,134.0 70.4,132.0 72.2,126.0 74.5,122.0 76.9,126.0 78.6,122.0 79.3,124.0 81.7,130.0 84.0,130.0 86.4,130.0 88.3,131.0 88.8,130.0 91.2,134.0 93.6,136.0 96.0,140.0 98.3,136.0 99.5,133.0 100.7,128.0 103.1,132.0 105.5,134.0 107.8,134.0 110.2,128.0 112.6,130.0 112.8,129.0 115.0,128.0 117.4,122.0 119.7,124.0 122.1,120.0 124.5,120.0 126.9,118.0 128.1,117.0 129.3,116.0 131.7,116.0 134.0,114.0 136.4,116.0 138.8,112.0 141.2,116.0 143.6,114.0 145.9,108.0 146.3,110.0 148.3,114.0 150.7,114.0 153.1,114.0 155.5,114.0 157.8,112.0 160.2,110.0 162.6,110.0 165.0,114.0 167.3,116.0 169.7,114.0 172.1,108.0 174.5,104.0 176.9,100.0 179.2,102.0 181.6,100.0 184.0,104.0 186.4,106.0 188.8,108.0 191.2,106.0 192.0,109.0" fill="none" stroke="#e07a1f" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="22.2,126.0 22.3,127.0 22.5,126.0 22.7,125.0 22.9,126.0 23.0,125.0 23.2,126.0 23.4,125.0 23.5,126.0 23.9,126.0 24.0,127.0 24.4,127.0 24.6,126.0 24.9,128.0 25.4,127.0 25.9,124.0 26.6,124.0 26.9,122.0 27.4,121.0 28.3,118.0 29.3,116.0 30.7,114.0 31.7,116.0 32.0,114.0 33.7,112.0 34.1,112.0 35.8,108.0 36.5,106.0 38.1,104.0 38.8,108.0 40.9,110.0 41.2,110.0 43.6,114.0 44.1,113.0 46.0,118.0 47.8,119.0 48.4,116.0 50.7,110.0 52.3,113.0 53.1,112.0 55.5,110.0 57.4,107.0 57.9,106.0 60.2,106.0 62.6,110.0 63.3,112.0 65.0,110.0 67.4,102.0 69.8,98.0 70.4,96.0 72.2,100.0 74.5,96.0 76.9,96.0 78.6,94.0 79.3,94.0 81.7,92.0 84.0,90.0 86.4,90.0 88.3,91.0 88.8,92.0 91.2,94.0 93.6,96.0 96.0,98.0 98.3,98.0 99.5,101.0 100.7,106.0 103.1,102.0 105.5,98.0 107.8,94.0 110.2,92.0 112.6,90.0 112.8,91.0 115.0,94.0 117.4,94.0 119.7,96.0 122.1,92.0 124.5,90.0 126.9,94.0 128.1,87.0 129.3,90.0 131.7,86.0 134.0,84.0 136.4,84.0 138.8,86.0 141.2,88.0 143.6,86.0 145.9,82.0 146.3,80.0 148.3,78.0 150.7,76.0 153.1,78.0 155.5,76.0 157.8,72.0 160.2,74.0 162.6,74.0 165.0,70.0 167.3,66.0 169.7,66.0 172.1,66.0 174.5,68.0 176.9,68.0 179.2,72.0 181.6,70.0 184.0,72.0 186.4,70.0 188.8,74.0 191.2,78.0 192.0,81.0" fill="none" stroke="#2e9e5b" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="22.9,120.5 24.6,117.3 26.2,115.0 27.9,113.2 29.6,111.6 31.4,110.2 33.0,108.9 34.8,107.7 36.5,106.6 38.1,105.5 39.8,104.5 41.5,103.6 43.2,102.6 45.0,101.8 46.6,100.9 48.4,100.1 50.0,99.3 51.8,98.5 53.5,97.8 55.1,97.1 56.9,96.4 58.5,95.7 60.2,95.0 61.9,94.3 63.6,93.7 65.3,93.1 67.1,92.4 68.8,91.8 70.4,91.2 72.2,90.6 73.8,90.1 75.5,89.5 77.2,88.9 79.0,88.4 80.7,87.9 82.3,87.3 84.0,86.8 85.8,86.3 87.5,85.8 89.2,85.3 90.9,84.8 92.5,84.3 94.2,83.8 96.0,83.3 97.7,82.8 99.4,82.3 101.0,81.9 102.8,81.4 104.5,81.0 106.2,80.5 107.8,80.1 109.5,79.6 111.2,79.2 113.0,78.7 114.7,78.3 116.4,77.9 118.0,77.5 119.7,77.0 121.4,76.6 123.1,76.2 124.8,75.8 126.5,75.4 128.2,75.0 129.9,74.6 131.7,74.2 133.4,73.8 135.1,73.4 136.8,73.0 138.4,72.7 140.1,72.3 141.8,71.9 143.6,71.5 145.2,71.1 146.9,70.8 148.7,70.4 150.3,70.0 152.1,69.7 153.8,69.3 155.5,69.0 157.2,68.6 158.8,68.3 160.5,67.9 162.2,67.6 163.9,67.2 165.7,66.9 167.3,66.5 169.1,66.2 170.8,65.8 172.4,65.5 174.2,65.2 175.8,64.8 177.6,64.5 179.2,64.2 181.0,63.8 182.7,63.5 184.3,63.2 186.0,62.9 187.8,62.6 189.4,62.2 191.2,61.9" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5,4"/>
<polyline points="22.9,129.5 24.6,132.7 26.2,135.0 27.9,136.8 29.6,138.4 31.4,139.8 33.0,141.1 34.8,142.3 36.5,143.4 38.1,144.5 39.8,145.5 41.5,146.4 43.2,147.4 45.0,148.2 46.6,149.1 48.4,149.9 50.0,150.7 51.8,151.5 53.5,152.2 55.1,152.9 56.9,153.6 58.5,154.3 60.2,155.0 61.9,155.7 63.6,156.3 65.3,156.9 67.1,157.6 68.8,158.2 70.4,158.8 72.2,159.4 73.8,159.9 75.5,160.5 77.2,161.1 79.0,161.6 80.7,162.1 82.3,162.7 84.0,163.2 85.8,163.7 87.5,164.2 89.2,164.7 90.9,165.2 92.5,165.7 94.2,166.2 96.0,166.7 97.7,167.2 99.4,167.7 101.0,168.1 102.8,168.6 104.5,169.0 106.2,169.5 107.8,169.9 109.5,170.4 111.2,170.8 113.0,171.3 114.7,171.7 116.4,172.1 118.0,172.5 119.7,173.0 121.4,173.4 123.1,173.8 124.8,174.2 126.5,174.6 128.2,175.0 129.9,175.4 131.7,175.8 133.4,176.2 135.1,176.6 136.8,177.0 138.4,177.3 140.1,177.7 141.8,178.1 143.6,178.5 145.2,178.9 146.9,179.2 148.7,179.6 150.3,180.0 152.1,180.3 153.8,180.7 155.5,181.0 157.2,181.4 158.8,181.7 160.5,182.1 162.2,182.4 163.9,182.8 165.7,183.1 167.3,183.5 169.1,183.8 170.8,184.2 172.4,184.5 174.2,184.8 175.8,185.2 177.6,185.5 179.2,185.8 181.0,186.2 182.7,186.5 184.3,186.8 186.0,187.1 187.8,187.4 189.4,187.8 191.2,188.1" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5,4"/>
<text x="190.0" y="201.0" text-anchor="end" fill="currentColor">±2√n</text>
<text x="107.0" y="223.0" text-anchor="middle" fill="currentColor">n = 1 … 1000</text>
<text x="295.0" y="40.0" text-anchor="middle" fill="currentColor" font-weight="bold">la media Sₙ / n</text>
<line x1="210.0" y1="125.0" x2="380.0" y2="125.0" stroke="currentColor" stroke-width="1" opacity="0.5"/>
<line x1="210.0" y1="45.0" x2="210.0" y2="205.0" stroke="currentColor" stroke-width="1"/>
<polyline points="210.2,205.0 210.3,205.0 210.5,205.0 210.7,205.0 210.8,205.0 211.0,205.0 211.2,205.0 211.4,185.0 211.5,187.2 211.9,175.9 212.0,178.3 212.4,170.7 212.6,173.0 212.9,167.4 213.4,165.0 213.9,149.3 214.6,145.7 214.9,138.8 215.4,135.0 216.3,144.5 217.3,145.5 218.7,148.5 219.7,146.1 220.0,145.3 221.7,135.4 222.1,135.1 223.8,131.9 224.4,129.7 226.2,127.5 226.8,125.8 228.9,121.4 229.2,122.9 231.6,123.1 232.1,122.5 234.0,124.4 235.8,121.8 236.3,123.5 238.7,124.5 240.3,125.0 241.1,126.3 243.5,127.8 245.4,129.6 245.9,128.4 248.2,128.9 250.6,128.0 251.3,127.3 253.0,127.2 255.4,127.1 257.8,128.1 258.4,127.5 260.1,127.4 262.5,127.3 264.9,127.7 266.6,126.7 267.3,127.1 269.7,127.1 272.1,126.5 274.4,126.9 276.3,128.3 276.8,128.1 279.2,127.9 281.6,127.9 283.9,128.1 286.3,127.0 287.5,127.1 288.7,127.2 291.1,127.5 293.5,126.5 295.9,126.1 298.2,126.1 300.6,126.4 300.8,126.2 303.0,126.0 305.4,125.7 307.8,126.0 310.1,125.1 312.5,124.9 314.9,124.9 316.1,125.0 317.3,125.4 319.6,124.9 322.0,125.4 324.4,125.1 326.8,125.3 329.2,125.1 331.6,125.3 333.9,125.1 334.3,125.3 336.3,125.5 338.7,124.9 341.1,124.7 343.5,124.3 345.8,124.9 348.2,124.5 350.6,124.7 353.0,124.7 355.4,124.5 357.7,124.4 360.1,124.4 362.5,124.6 364.9,124.6 367.2,124.7 369.6,124.6 372.0,124.6 374.4,124.6 376.8,125.4 379.1,125.4 380.0,125.3" fill="none" stroke="#4051b5" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="210.2,45.0 210.3,125.0 210.5,151.7 210.7,125.0 210.8,109.0 211.0,98.3 211.2,90.7 211.4,105.0 211.5,98.3 211.9,103.2 212.0,98.3 212.4,113.6 212.6,109.0 212.9,101.5 213.4,93.0 213.9,93.7 214.6,98.3 214.9,94.7 215.4,90.0 216.3,101.2 217.3,108.3 218.7,107.7 219.7,112.4 220.0,112.8 221.7,119.2 222.1,119.4 223.8,118.1 224.4,120.3 226.2,120.8 226.8,122.6 228.9,125.7 229.2,127.1 231.6,126.9 232.1,128.7 234.0,129.0 235.8,126.1 236.3,125.5 238.7,121.7 240.3,122.3 241.1,122.8 243.5,125.4 245.4,123.5 245.9,123.1 248.2,123.9 250.6,122.7 251.3,124.0 253.0,122.2 255.4,120.5 257.8,120.2 258.4,119.7 260.1,121.5 262.5,121.6 264.9,121.8 266.6,121.9 267.3,121.9 269.7,122.9 272.1,123.5 274.4,123.5 276.3,123.8 276.8,124.4 279.2,125.2 281.6,124.4 283.9,124.8 286.3,124.8 287.5,124.6 288.7,124.5 291.1,124.8 293.5,124.2 295.9,123.9 298.2,123.9 300.6,123.6 300.8,123.8 303.0,124.3 305.4,123.7 307.8,124.3 310.1,124.6 312.5,124.3 314.9,124.4 316.1,124.0 317.3,124.4 319.6,123.9 322.0,124.4 324.4,124.2 326.8,124.2 329.2,123.7 331.6,124.2 333.9,123.6 334.3,123.6 336.3,123.0 338.7,122.8 341.1,122.4 343.5,123.5 345.8,123.7 348.2,123.5 350.6,123.4 353.0,122.8 355.4,122.3 357.7,122.0 360.1,122.4 362.5,122.8 364.9,122.6 367.2,122.7 369.6,122.5 372.0,122.9 374.4,122.9 376.8,122.8 379.1,122.8 380.0,122.9" fill="none" stroke="#e07a1f" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="210.2,205.0 210.3,125.0 210.5,98.3 210.7,125.0 210.8,141.0 211.0,151.7 211.2,136.4 211.4,125.0 211.5,133.9 211.9,146.8 212.0,151.7 212.4,147.9 212.6,151.7 212.9,157.9 213.4,149.0 213.9,149.3 214.6,145.7 214.9,149.8 215.4,150.0 216.3,140.1 217.3,145.5 218.7,151.7 219.7,146.1 220.0,142.6 221.7,140.1 222.1,141.9 223.8,141.8 224.4,139.1 226.2,137.6 226.8,137.1 228.9,134.4 229.2,134.2 231.6,130.7 232.1,129.9 234.0,126.7 235.8,129.2 236.3,130.7 238.7,132.1 240.3,129.5 241.1,128.9 243.5,128.7 245.4,128.8 245.9,129.2 248.2,131.0 250.6,129.4 251.3,129.9 253.0,128.5 255.4,127.1 257.8,127.0 258.4,126.4 260.1,126.9 262.5,127.8 264.9,128.2 266.6,128.1 267.3,128.1 269.7,128.9 272.1,127.8 274.4,127.3 276.3,127.1 276.8,127.6 279.2,127.6 281.6,126.3 283.9,126.3 286.3,126.6 287.5,126.4 288.7,126.2 291.1,126.8 293.5,127.4 295.9,127.4 298.2,127.0 300.6,128.2 300.8,128.3 303.0,128.4 305.4,128.0 307.8,127.4 310.1,127.0 312.5,127.0 314.9,126.9 316.1,126.8 317.3,127.4 319.6,127.4 322.0,127.1 324.4,126.8 326.8,126.5 329.2,126.9 331.6,126.2 333.9,125.3 334.3,125.3 336.3,125.5 338.7,125.3 341.1,125.1 343.5,124.9 345.8,124.9 348.2,124.3 350.6,124.7 353.0,124.5 355.4,124.2 357.7,124.2 360.1,124.4 362.5,124.6 364.9,124.7 367.2,124.7 369.6,125.1 372.0,125.1 374.4,125.2 376.8,125.6 379.1,126.0 380.0,126.1" fill="none" stroke="#2e9e5b" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="210.2,45.0 210.3,125.0 210.5,151.7 210.7,125.0 210.8,109.0 211.0,125.0 211.2,136.4 211.4,145.0 211.5,133.9 211.9,146.8 212.0,138.3 212.4,136.4 212.6,130.3 212.9,120.3 213.4,125.0 213.9,128.5 214.6,128.0 214.9,127.8 215.4,135.0 216.3,122.8 217.3,112.0 218.7,114.0 219.7,120.8 220.0,120.9 221.7,116.9 222.1,119.4 223.8,116.1 224.4,116.5 226.2,117.4 226.8,119.3 228.9,115.6 229.2,115.8 231.6,111.8 232.1,111.5 234.0,113.1 235.8,115.5 236.3,116.2 238.7,117.9 240.3,117.8 241.1,119.3 243.5,123.0 245.4,121.9 245.9,121.6 248.2,121.8 250.6,123.3 251.3,124.0 253.0,122.8 255.4,122.9 257.8,124.7 258.4,125.3 260.1,125.8 262.5,126.3 264.9,125.7 266.6,127.2 267.3,127.1 269.7,126.6 272.1,126.5 274.4,125.2 276.3,125.4 276.8,125.2 279.2,124.8 281.6,125.2 283.9,126.7 286.3,127.3 287.5,127.1 288.7,127.2 291.1,126.8 293.5,126.5 295.9,126.7 298.2,127.6 300.6,128.8 300.8,128.6 303.0,127.5 305.4,127.7 307.8,128.8 310.1,128.9 312.5,128.8 314.9,128.0 316.1,128.1 317.3,128.7 319.6,128.1 322.0,127.8 324.4,127.5 326.8,127.4 329.2,127.9 331.6,127.6 333.9,127.3 334.3,127.3 336.3,127.7 338.7,127.0 341.1,127.0 343.5,127.5 345.8,127.7 348.2,127.7 350.6,127.6 353.0,127.4 355.4,127.3 357.7,127.1 360.1,126.7 362.5,126.5 364.9,126.5 367.2,126.6 369.6,126.6 372.0,126.1 374.4,126.4 376.8,126.7 379.1,127.5 380.0,127.2" fill="none" stroke="#8a4fbf" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="210.2,205.0 210.3,205.0 210.5,205.0 210.7,165.0 210.8,173.0 211.0,178.3 211.2,159.3 211.4,165.0 211.5,151.7 211.9,161.4 212.0,151.7 212.4,159.3 212.6,151.7 212.9,157.9 213.4,149.0 213.9,149.3 214.6,139.8 214.9,133.3 215.4,130.0 216.3,140.1 217.3,138.0 218.7,136.0 219.7,132.0 220.0,134.5 221.7,130.8 222.1,130.6 223.8,131.9 224.4,127.8 226.2,125.8 226.8,127.4 228.9,127.2 229.2,127.1 231.6,125.6 232.1,126.2 234.0,126.7 235.8,126.1 236.3,125.5 238.7,126.4 240.3,126.8 241.1,126.3 243.5,126.2 245.4,128.1 245.9,128.4 248.2,129.6 250.6,127.3 251.3,127.3 253.0,128.5 255.4,128.9 257.8,128.7 258.4,128.6 260.1,128.5 262.5,128.9 264.9,130.7 266.6,130.0 267.3,130.0 269.7,128.9 272.1,130.0 274.4,130.3 276.3,130.7 276.8,130.9 279.2,129.9 281.6,129.4 283.9,128.9 286.3,128.7 287.5,128.5 288.7,129.3 291.1,129.5 293.5,128.7 295.9,129.9 298.2,130.4 300.6,130.6 300.8,130.4 303.0,130.7 305.4,130.8 307.8,130.4 310.1,130.6 312.5,131.0 314.9,131.4 316.1,131.2 317.3,131.2 319.6,131.6 322.0,130.9 324.4,130.3 326.8,130.0 329.2,129.7 331.6,129.6 333.9,129.3 334.3,129.5 336.3,128.8 338.7,128.9 341.1,128.8 343.5,129.0 345.8,129.1 348.2,128.8 350.6,128.2 353.0,128.3 355.4,128.5 357.7,128.2 360.1,128.4 362.5,128.3 364.9,128.1 367.2,128.5 369.6,127.8 372.0,127.9 374.4,127.7 376.8,128.0 379.1,127.7 380.0,127.7" fill="none" stroke="#e03a3a" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="210.2,45.0 210.3,45.0 210.5,45.0 210.7,45.0 210.8,45.0 211.0,71.7 211.2,67.9 211.4,65.0 211.5,62.8 211.9,59.5 212.0,71.7 212.4,79.3 212.6,77.0 212.9,82.6 213.4,93.0 213.9,86.7 214.6,92.4 214.9,94.7 215.4,100.0 216.3,105.5 217.3,104.5 218.7,104.6 219.7,109.6 220.0,112.8 221.7,116.9 222.1,117.1 223.8,120.1 224.4,118.4 226.2,122.5 226.8,121.0 228.9,120.0 229.2,121.5 231.6,123.1 232.1,122.5 234.0,126.7 235.8,125.0 236.3,125.5 238.7,128.3 240.3,128.6 241.1,127.2 243.5,126.2 245.4,125.0 245.9,125.4 248.2,126.8 250.6,127.3 251.3,126.6 253.0,125.3 255.4,127.1 257.8,127.0 258.4,127.0 260.1,127.4 262.5,128.4 264.9,128.2 266.6,129.1 267.3,128.6 269.7,127.5 272.1,127.0 274.4,127.3 276.3,127.5 276.8,126.8 279.2,127.2 281.6,127.5 283.9,127.8 286.3,127.3 287.5,127.5 288.7,127.9 291.1,127.9 293.5,127.4 295.9,127.4 298.2,126.7 300.6,126.1 300.8,126.2 303.0,126.0 305.4,126.9 307.8,127.4 310.1,126.5 312.5,126.7 314.9,126.4 316.1,126.8 317.3,126.9 319.6,126.4 322.0,126.3 324.4,125.4 326.8,125.6 329.2,124.9 331.6,124.7 333.9,124.9 334.3,125.1 336.3,125.3 338.7,125.3 341.1,125.5 343.5,125.5 345.8,125.1 348.2,125.3 350.6,124.7 353.0,124.7 355.4,124.9 357.7,124.9 360.1,124.7 362.5,124.0 364.9,123.7 367.2,123.5 369.6,123.6 372.0,123.1 374.4,123.3 376.8,123.3 379.1,123.0 380.0,123.4" fill="none" stroke="#4051b5" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="210.2,205.0 210.3,205.0 210.5,205.0 210.7,205.0 210.8,205.0 211.0,178.3 211.2,159.3 211.4,145.0 211.5,133.9 211.9,132.3 212.0,125.0 212.4,113.6 212.6,109.0 212.9,110.9 213.4,125.0 213.9,128.5 214.6,116.1 214.9,116.7 215.4,120.0 216.3,122.8 217.3,123.1 218.7,123.4 219.7,126.4 220.0,126.4 221.7,128.5 222.1,130.6 223.8,135.9 224.4,137.2 226.2,135.9 226.8,133.9 228.9,132.9 229.2,132.8 231.6,135.7 232.1,133.6 234.0,134.6 235.8,133.4 236.3,133.8 238.7,132.1 240.3,129.5 241.1,128.9 243.5,130.3 245.4,129.6 245.9,129.2 248.2,129.6 250.6,129.4 251.3,128.6 253.0,129.1 255.4,128.9 257.8,127.6 258.4,127.0 260.1,125.3 262.5,124.2 264.9,125.2 266.6,124.3 267.3,124.8 269.7,126.1 272.1,126.1 274.4,126.1 276.3,126.2 276.8,126.0 279.2,126.8 281.6,127.1 283.9,127.8 286.3,127.0 287.5,126.4 288.7,125.5 291.1,126.2 293.5,126.5 295.9,126.4 298.2,125.5 300.6,125.8 300.8,125.6 303.0,125.4 305.4,124.6 307.8,124.9 310.1,124.3 312.5,124.3 314.9,124.1 316.1,124.0 317.3,123.9 319.6,123.9 322.0,123.7 324.4,123.9 326.8,123.5 329.2,124.0 331.6,123.8 333.9,123.1 334.3,123.4 336.3,123.8 338.7,123.8 341.1,123.9 343.5,123.9 345.8,123.7 348.2,123.5 350.6,123.5 353.0,124.0 355.4,124.2 357.7,124.0 360.1,123.5 362.5,123.1 364.9,122.8 367.2,123.0 369.6,122.9 372.0,123.2 374.4,123.4 376.8,123.6 379.1,123.5 380.0,123.7" fill="none" stroke="#e07a1f" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="210.2,205.0 210.3,205.0 210.5,151.7 210.7,125.0 210.8,141.0 211.0,125.0 211.2,136.4 211.4,125.0 211.5,133.9 211.9,132.3 212.0,138.3 212.4,136.4 212.6,130.3 212.9,139.1 213.4,133.0 213.9,121.5 214.6,122.0 214.9,116.7 215.4,115.0 216.3,109.9 217.3,108.3 218.7,107.7 219.7,112.4 220.0,110.1 221.7,109.9 222.1,110.4 223.8,108.2 224.4,107.1 226.2,107.3 226.8,111.3 228.9,114.2 229.2,114.4 231.6,118.1 232.1,117.6 234.0,121.0 235.8,121.8 236.3,120.4 238.7,117.9 240.3,119.6 241.1,119.3 243.5,118.9 245.4,118.1 245.9,117.8 248.2,118.2 250.6,120.0 251.3,120.7 253.0,120.3 255.4,118.1 257.8,117.3 258.4,116.9 260.1,118.2 262.5,117.5 264.9,117.8 266.6,117.6 267.3,117.6 269.7,117.5 272.1,117.3 274.4,117.6 276.3,118.0 276.8,118.3 279.2,118.9 281.6,119.5 283.9,120.0 286.3,120.2 287.5,120.8 288.7,121.7 291.1,121.1 293.5,120.6 295.9,120.1 298.2,119.9 300.6,119.7 300.8,119.9 303.0,120.5 305.4,120.6 307.8,121.0 310.1,120.5 312.5,120.4 314.9,121.0 316.1,120.1 317.3,120.6 319.6,120.2 322.0,120.0 324.4,120.1 326.8,120.5 329.2,120.8 331.6,120.6 333.9,120.3 334.3,120.1 336.3,119.9 338.7,119.8 341.1,120.1 343.5,120.0 345.8,119.7 348.2,120.0 350.6,120.1 353.0,119.8 355.4,119.5 357.7,119.6 360.1,119.7 362.5,119.9 364.9,120.0 367.2,120.4 369.6,120.3 372.0,120.6 374.4,120.4 376.8,120.8 379.1,121.2 380.0,121.5" fill="none" stroke="#2e9e5b" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="210.8,53.4 212.6,83.7 214.2,93.0 215.9,98.0 217.7,101.1 219.3,103.4 221.1,105.2 222.8,106.5 224.4,107.6 226.2,108.6 227.8,109.4 229.6,110.1 231.2,110.7 232.9,111.2 234.7,111.7 236.3,112.1 238.1,112.5 239.8,112.9 241.4,113.2 243.2,113.5 244.8,113.8 246.6,114.1 248.2,114.3 249.9,114.6 251.7,114.8 253.3,115.0 255.1,115.2 256.8,115.4 258.4,115.5 260.1,115.7 261.9,115.8 263.6,116.0 265.2,116.1 266.9,116.3 268.6,116.4 270.4,116.5 272.1,116.6 273.8,116.7 275.4,116.8 277.1,116.9 278.9,117.0 280.6,117.1 282.2,117.2 283.9,117.3 285.6,117.4 287.4,117.5 289.1,117.6 290.8,117.7 292.4,117.7 294.1,117.8 295.9,117.9 297.6,117.9 299.2,118.0 300.9,118.1 302.6,118.1 304.4,118.2 306.1,118.3 307.8,118.3 309.4,118.4 311.1,118.4 312.9,118.5 314.6,118.5 316.2,118.6 317.9,118.7 319.6,118.7 321.4,118.7 323.1,118.8 324.8,118.8 326.4,118.9 328.1,118.9 329.9,119.0 331.6,119.0 333.2,119.1 334.9,119.1 336.6,119.1 338.4,119.2 340.1,119.2 341.8,119.3 343.5,119.3 345.1,119.3 346.9,119.4 348.5,119.4 350.2,119.4 351.9,119.5 353.6,119.5 355.4,119.5 357.1,119.6 358.8,119.6 360.4,119.6 362.1,119.7 363.9,119.7 365.6,119.7 367.2,119.7 369.0,119.8 370.6,119.8 372.4,119.8 374.0,119.8 375.8,119.9 377.4,119.9 379.1,119.9" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5,4"/>
<polyline points="210.8,196.6 212.6,166.3 214.2,157.0 215.9,152.0 217.7,148.9 219.3,146.6 221.1,144.8 222.8,143.5 224.4,142.4 226.2,141.4 227.8,140.6 229.6,139.9 231.2,139.3 232.9,138.8 234.7,138.3 236.3,137.9 238.1,137.5 239.8,137.1 241.4,136.8 243.2,136.5 244.8,136.2 246.6,135.9 248.2,135.7 249.9,135.4 251.7,135.2 253.3,135.0 255.1,134.8 256.8,134.6 258.4,134.5 260.1,134.3 261.9,134.2 263.6,134.0 265.2,133.9 266.9,133.7 268.6,133.6 270.4,133.5 272.1,133.4 273.8,133.3 275.4,133.2 277.1,133.1 278.9,133.0 280.6,132.9 282.2,132.8 283.9,132.7 285.6,132.6 287.4,132.5 289.1,132.4 290.8,132.3 292.4,132.3 294.1,132.2 295.9,132.1 297.6,132.1 299.2,132.0 300.9,131.9 302.6,131.9 304.4,131.8 306.1,131.7 307.8,131.7 309.4,131.6 311.1,131.6 312.9,131.5 314.6,131.5 316.2,131.4 317.9,131.3 319.6,131.3 321.4,131.3 323.1,131.2 324.8,131.2 326.4,131.1 328.1,131.1 329.9,131.0 331.6,131.0 333.2,130.9 334.9,130.9 336.6,130.9 338.4,130.8 340.1,130.8 341.8,130.7 343.5,130.7 345.1,130.7 346.9,130.6 348.5,130.6 350.2,130.6 351.9,130.5 353.6,130.5 355.4,130.5 357.1,130.4 358.8,130.4 360.4,130.4 362.1,130.3 363.9,130.3 365.6,130.3 367.2,130.3 369.0,130.2 370.6,130.2 372.4,130.2 374.0,130.2 375.8,130.1 377.4,130.1 379.1,130.1" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5,4"/>
<text x="378.0" y="201.0" text-anchor="end" fill="currentColor">±2/√n</text>
<text x="295.0" y="223.0" text-anchor="middle" fill="currentColor">n = 1 … 1000</text>
<text x="483.0" y="40.0" text-anchor="middle" fill="currentColor" font-weight="bold">Sₙ / √n</text>
<line x1="398.0" y1="125.0" x2="568.0" y2="125.0" stroke="currentColor" stroke-width="1" opacity="0.5"/>
<line x1="398.0" y1="45.0" x2="398.0" y2="205.0" stroke="currentColor" stroke-width="1"/>
<polyline points="398.2,147.9 398.3,157.3 398.5,164.6 398.7,170.7 398.9,176.1 399.0,181.0 399.2,185.5 399.4,173.5 399.5,178.3 399.9,173.2 400.0,177.8 400.4,173.9 400.6,178.1 400.9,174.9 401.4,176.1 401.9,158.4 402.6,155.8 402.9,146.2 403.4,141.2 404.3,158.8 405.3,163.3 406.7,173.0 407.7,170.4 408.0,169.6 409.7,149.8 410.1,149.4 411.8,142.8 412.4,137.4 414.1,132.0 414.8,127.3 416.9,114.2 417.2,118.5 419.6,118.9 420.1,117.0 422.0,123.1 423.8,113.9 424.4,119.5 426.7,123.2 428.3,125.0 429.1,130.1 431.5,136.4 433.4,144.0 433.9,139.2 436.2,141.8 438.6,138.3 439.3,135.3 441.0,135.1 443.4,134.8 445.8,140.0 446.4,137.2 448.1,137.0 450.5,136.7 452.9,139.0 454.6,133.8 455.3,136.2 457.7,136.0 460.1,133.4 462.4,135.6 464.3,143.5 464.8,142.3 467.2,142.0 469.6,141.7 471.9,143.6 474.3,136.9 475.5,137.8 476.7,138.8 479.1,140.7 481.5,134.3 483.9,132.1 486.2,132.0 488.6,133.9 488.8,132.9 491.0,131.8 493.4,129.8 495.8,131.7 498.1,125.9 500.5,124.1 502.9,124.1 504.1,125.0 505.3,127.7 507.6,124.1 510.0,127.7 512.4,125.9 514.8,127.6 517.2,125.9 519.5,127.6 521.9,125.8 522.3,127.5 524.3,129.2 526.7,124.2 529.1,122.5 531.5,119.3 533.8,124.2 536.2,121.0 538.6,122.6 541.0,122.6 543.4,121.1 545.7,119.6 548.1,119.6 550.5,121.2 552.9,121.2 555.2,122.7 557.6,121.3 560.0,121.3 562.4,121.3 564.8,128.6 567.1,128.6 568.0,127.9" fill="none" stroke="#4051b5" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="398.2,102.1 398.3,125.0 398.5,138.2 398.7,125.0 398.9,114.8 399.0,106.3 399.2,99.1 399.4,108.8 399.5,102.1 399.9,104.3 400.0,98.6 400.4,112.8 400.6,107.3 400.9,97.3 401.4,84.1 401.9,82.1 402.6,85.4 402.9,78.3 403.4,68.4 404.3,83.7 405.3,93.6 406.7,89.8 407.7,97.8 408.0,98.2 409.7,111.2 410.1,111.4 411.8,107.2 412.4,112.6 414.1,113.3 414.8,118.1 416.9,127.2 417.2,131.5 419.6,131.1 420.1,137.0 422.0,138.5 423.8,128.7 424.4,126.8 426.7,112.7 428.3,114.7 429.1,116.6 431.5,126.6 433.4,118.7 433.9,117.1 436.2,120.4 438.6,114.7 439.3,120.6 441.0,112.1 443.4,104.0 445.8,101.8 446.4,99.3 448.1,107.7 450.5,108.1 452.9,108.5 454.6,108.7 455.3,108.8 457.7,114.0 460.1,116.6 462.4,116.8 464.3,118.1 464.8,121.5 467.2,126.1 469.6,121.7 471.9,123.9 474.3,123.9 475.5,122.9 476.7,121.8 479.1,124.0 481.5,119.8 483.9,117.9 486.2,118.0 488.6,116.1 488.8,117.1 491.0,120.1 493.4,116.3 495.8,120.2 498.1,122.2 500.5,120.3 502.9,120.4 504.1,117.7 505.3,120.5 507.6,116.9 510.0,120.5 512.4,118.8 514.8,118.9 517.2,115.5 519.5,119.0 521.9,114.0 522.3,114.0 524.3,109.1 526.7,107.6 529.1,104.4 531.5,112.8 533.8,114.5 536.2,113.0 538.6,111.5 541.0,106.9 543.4,102.3 545.7,99.4 548.1,102.7 550.5,105.9 552.9,104.6 555.2,104.7 557.6,103.4 560.0,106.5 562.4,106.6 564.8,105.3 567.1,105.4 568.0,106.2" fill="none" stroke="#e07a1f" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="398.2,147.9 398.3,125.0 398.5,111.8 398.7,125.0 398.9,135.2 399.0,143.7 399.2,133.6 399.4,125.0 399.5,132.6 399.9,145.7 400.0,151.4 400.4,149.4 400.6,154.5 400.9,163.8 401.4,155.7 401.9,158.4 402.6,155.8 402.9,163.2 403.4,165.4 404.3,151.3 405.3,163.3 406.7,179.4 407.7,170.4 408.0,163.7 409.7,160.8 410.1,165.7 411.8,168.2 412.4,162.2 414.1,160.2 414.8,159.5 416.9,153.2 417.2,153.0 419.6,143.3 420.1,141.0 422.0,130.8 423.8,139.8 424.4,145.2 426.7,151.4 428.3,142.1 429.1,140.2 431.5,139.7 433.4,140.8 433.9,142.3 436.2,150.9 438.6,144.2 439.3,147.0 441.0,140.8 443.4,134.8 445.8,134.5 446.4,131.8 448.1,134.3 450.5,139.3 452.9,141.5 454.6,141.3 455.3,141.2 457.7,145.7 460.1,140.6 462.4,137.9 464.3,136.6 464.8,140.0 467.2,139.7 469.6,132.8 471.9,132.7 474.3,134.7 475.5,133.6 476.7,132.4 479.1,136.5 481.5,140.5 483.9,140.3 486.2,138.0 488.6,145.8 488.8,146.8 491.0,147.5 493.4,145.3 495.8,141.2 498.1,139.1 500.5,139.0 502.9,138.8 504.1,137.8 505.3,142.3 507.6,142.1 510.0,140.1 512.4,138.2 514.8,136.3 517.2,139.7 519.5,134.4 521.9,127.5 522.3,127.5 524.3,129.2 526.7,127.5 529.1,125.8 531.5,124.2 533.8,124.2 536.2,119.4 538.6,122.6 541.0,121.1 543.4,118.0 545.7,118.0 548.1,119.6 550.5,121.2 552.9,122.7 555.2,122.7 557.6,125.7 560.0,125.7 562.4,127.2 564.8,130.1 567.1,134.4 568.0,135.1" fill="none" stroke="#2e9e5b" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="398.2,102.1 398.3,125.0 398.5,138.2 398.7,125.0 398.9,114.8 399.0,125.0 399.2,133.6 399.4,141.2 399.5,132.6 399.9,145.7 400.0,138.2 400.4,137.2 400.6,130.9 400.9,119.5 401.4,125.0 401.9,129.8 402.6,129.4 402.9,129.2 403.4,141.2 404.3,121.2 405.3,100.6 406.7,102.6 407.7,115.9 408.0,116.1 409.7,105.7 410.1,111.4 411.8,102.1 412.4,102.7 414.1,103.9 414.8,108.9 416.9,96.8 417.2,97.0 419.6,82.4 420.1,80.9 422.0,84.6 423.8,91.6 424.4,93.8 426.7,98.6 428.3,97.6 429.1,103.0 431.5,116.9 433.4,112.3 433.9,110.8 436.2,111.3 438.6,117.6 439.3,120.6 441.0,114.9 443.4,115.2 445.8,123.6 446.4,126.4 448.1,129.0 450.5,131.5 452.9,128.8 454.6,136.3 455.3,136.2 457.7,133.5 460.1,133.4 462.4,126.2 464.3,127.3 464.8,126.2 467.2,123.9 469.6,126.1 471.9,134.9 474.3,139.0 475.5,137.8 476.7,138.8 479.1,136.5 481.5,134.3 483.9,136.2 486.2,142.1 488.6,149.8 488.8,148.7 491.0,141.6 493.4,143.3 495.8,150.7 498.1,152.3 500.5,152.0 502.9,146.2 504.1,147.0 505.3,151.4 507.6,147.5 510.0,145.5 512.4,143.5 514.8,143.3 517.2,146.6 519.5,144.7 521.9,142.8 522.3,142.8 524.3,146.0 526.7,140.8 529.1,140.6 531.5,145.4 533.8,146.8 536.2,146.6 538.6,146.5 541.0,144.7 543.4,144.5 545.7,142.8 548.1,139.6 550.5,138.0 552.9,137.9 555.2,139.3 557.6,139.2 560.0,134.6 562.4,137.5 564.8,140.3 567.1,147.5 568.0,145.2" fill="none" stroke="#8a4fbf" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="398.2,147.9 398.3,157.3 398.5,164.6 398.7,147.9 398.9,155.7 399.0,162.3 399.2,150.9 399.4,157.3 399.5,147.9 399.9,159.5 400.0,151.4 400.4,161.7 400.6,154.5 400.9,163.8 401.4,155.7 401.9,158.4 402.6,147.0 402.9,137.7 403.4,133.1 404.3,151.3 405.3,149.4 406.7,147.4 407.7,140.1 408.0,145.8 409.7,138.8 410.1,138.6 411.8,142.8 412.4,132.4 414.1,127.3 414.8,131.9 416.9,131.5 417.2,131.5 419.6,127.0 420.1,129.0 422.0,130.8 423.8,128.7 424.4,126.8 426.7,130.3 428.3,131.9 429.1,130.1 431.5,129.9 433.4,137.7 433.9,139.2 436.2,144.8 438.6,135.3 439.3,135.3 441.0,140.8 443.4,143.2 445.8,142.7 446.4,142.6 448.1,142.3 450.5,144.5 452.9,154.3 454.6,151.3 455.3,151.1 457.7,145.7 460.1,152.5 462.4,154.4 464.3,157.4 464.8,158.4 467.2,153.3 469.6,150.6 471.9,148.0 474.3,147.7 475.5,146.4 476.7,151.6 479.1,153.3 481.5,148.7 483.9,156.5 486.2,160.1 488.6,161.6 488.8,160.6 491.0,163.1 493.4,164.6 495.8,162.2 498.1,163.6 500.5,166.9 502.9,170.1 504.1,168.9 505.3,169.6 507.6,172.7 510.0,168.6 512.4,164.6 514.8,162.5 517.2,160.4 519.5,160.0 521.9,158.0 522.3,159.7 524.3,154.3 526.7,155.7 529.1,155.5 531.5,156.8 533.8,158.2 536.2,156.3 538.6,151.2 541.0,152.6 543.4,153.9 545.7,152.1 548.1,153.5 550.5,153.2 552.9,151.5 555.2,155.8 557.6,149.6 560.0,150.9 562.4,149.3 564.8,152.0 567.1,148.9 568.0,149.6" fill="none" stroke="#e03a3a" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="398.2,102.1 398.3,92.7 398.5,85.4 398.7,79.3 398.9,73.9 399.0,87.7 399.2,81.8 399.4,76.5 399.5,71.7 399.9,63.0 400.0,72.2 400.4,76.1 400.6,71.9 400.9,75.1 401.4,84.1 401.9,72.6 402.6,76.6 402.9,78.3 403.4,84.6 404.3,91.2 405.3,86.7 406.7,83.4 407.7,91.7 408.0,98.2 409.7,105.7 410.1,106.0 411.8,112.3 412.4,107.6 414.1,118.0 414.8,113.5 416.9,109.8 417.2,114.2 419.6,118.9 420.1,117.0 422.0,130.8 423.8,125.0 424.4,126.8 426.7,137.3 428.3,138.7 429.1,133.4 431.5,129.9 433.4,125.0 433.9,126.6 436.2,132.6 438.6,135.3 439.3,132.3 441.0,126.4 443.4,134.8 445.8,134.5 446.4,134.5 448.1,137.0 450.5,141.9 452.9,141.5 454.6,146.3 455.3,143.7 457.7,138.4 460.1,135.8 462.4,137.9 464.3,138.9 464.8,135.4 467.2,137.5 469.6,139.5 471.9,141.4 474.3,139.0 475.5,140.0 476.7,143.1 479.1,142.8 481.5,140.5 483.9,140.3 486.2,136.0 488.6,131.9 488.8,132.9 491.0,131.8 493.4,137.5 495.8,141.2 498.1,135.4 500.5,137.1 502.9,135.1 504.1,137.8 505.3,138.6 507.6,134.9 510.0,134.8 512.4,127.6 514.8,129.4 517.2,124.1 519.5,122.4 521.9,124.2 522.3,125.8 524.3,127.5 526.7,127.5 529.1,129.1 531.5,129.1 533.8,125.8 536.2,127.4 538.6,122.6 541.0,122.6 543.4,124.2 545.7,124.2 548.1,122.7 550.5,116.6 552.9,113.6 555.2,112.2 557.6,112.3 560.0,108.0 562.4,109.6 564.8,109.7 567.1,106.9 568.0,110.5" fill="none" stroke="#4051b5" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="398.2,147.9 398.3,157.3 398.5,164.6 398.7,170.7 398.9,176.1 399.0,162.3 399.2,150.9 399.4,141.2 399.5,132.6 399.9,131.9 400.0,125.0 400.4,112.8 400.6,107.3 400.9,108.4 401.4,125.0 401.9,129.8 402.6,111.8 402.9,112.3 403.4,116.9 404.3,121.2 405.3,121.5 406.7,121.8 407.7,128.0 408.0,128.0 409.7,133.3 410.1,138.6 411.8,152.9 412.4,157.2 414.1,155.5 414.8,150.3 416.9,148.9 417.2,148.7 419.6,159.5 420.1,153.1 422.0,157.7 423.8,154.7 424.4,156.2 426.7,151.4 428.3,142.1 429.1,140.2 431.5,146.2 433.4,144.0 433.9,142.3 436.2,144.8 438.6,144.2 439.3,141.1 441.0,143.7 443.4,143.2 445.8,137.3 446.4,134.5 448.1,126.3 450.5,121.1 452.9,126.3 454.6,121.2 455.3,123.8 457.7,131.1 460.1,131.0 462.4,130.9 464.3,131.9 464.8,130.8 467.2,135.2 469.6,137.3 471.9,141.4 474.3,136.9 475.5,133.6 476.7,128.2 479.1,132.3 481.5,134.3 483.9,134.2 486.2,128.0 488.6,130.0 488.8,129.0 491.0,127.9 493.4,122.1 495.8,124.0 498.1,120.3 500.5,120.3 502.9,118.6 504.1,117.7 505.3,116.8 507.6,116.9 510.0,115.2 512.4,117.1 514.8,113.7 517.2,117.2 519.5,115.6 521.9,110.6 522.3,112.3 524.3,115.8 526.7,115.9 529.1,115.9 531.5,116.0 533.8,114.5 536.2,113.0 538.6,113.1 541.0,116.3 543.4,118.0 545.7,116.5 548.1,111.9 550.5,109.0 552.9,106.1 555.2,107.7 557.6,106.4 560.0,109.5 562.4,111.0 564.8,112.6 567.1,111.2 568.0,113.4" fill="none" stroke="#e07a1f" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="398.2,147.9 398.3,157.3 398.5,138.2 398.7,125.0 398.9,135.2 399.0,125.0 399.2,133.6 399.4,125.0 399.5,132.6 399.9,131.9 400.0,138.2 400.4,137.2 400.6,130.9 400.9,141.6 401.4,135.2 401.9,120.2 402.6,120.6 402.9,112.3 403.4,108.8 404.3,98.7 405.3,93.6 406.7,89.8 407.7,97.8 408.0,92.3 409.7,89.2 410.1,89.7 411.8,81.8 412.4,77.9 414.1,75.8 414.8,85.9 416.9,92.5 417.2,92.7 419.6,102.7 420.1,100.9 422.0,111.5 423.8,113.9 424.4,108.5 426.7,98.6 428.3,104.4 429.1,103.0 431.5,100.6 433.4,96.5 433.9,95.1 436.2,96.0 438.6,102.8 439.3,105.9 441.0,103.4 443.4,92.8 445.8,88.2 446.4,85.7 448.1,91.7 450.5,87.3 452.9,88.1 454.6,86.2 455.3,86.4 457.7,84.7 460.1,83.1 462.4,83.9 464.3,85.6 464.8,87.0 467.2,89.9 469.6,92.7 471.9,95.4 474.3,95.9 475.5,99.3 476.7,104.8 479.1,100.9 481.5,97.1 483.9,93.5 486.2,91.9 488.6,90.3 488.8,91.4 491.0,94.7 493.4,95.1 495.8,97.4 498.1,93.9 500.5,92.4 502.9,96.5 504.1,90.2 505.3,93.2 507.6,89.9 510.0,88.5 512.4,88.9 514.8,91.0 517.2,93.1 519.5,91.7 521.9,88.6 522.3,87.0 524.3,85.6 526.7,84.3 529.1,86.3 531.5,85.0 533.8,82.1 536.2,84.1 538.6,84.5 541.0,81.7 543.4,78.9 545.7,79.3 548.1,79.6 550.5,81.5 552.9,81.8 555.2,85.2 557.6,84.0 560.0,85.8 562.4,84.6 564.8,87.8 567.1,90.9 568.0,93.2" fill="none" stroke="#2e9e5b" stroke-width="1.1" stroke-opacity="0.8"/>
<polyline points="398.9,79.3 400.6,79.3 402.2,79.3 403.9,79.3 405.6,79.3 407.4,79.3 409.1,79.3 410.8,79.3 412.4,79.3 414.1,79.3 415.9,79.3 417.6,79.3 419.2,79.3 420.9,79.3 422.6,79.3 424.4,79.3 426.1,79.3 427.8,79.3 429.4,79.3 431.1,79.3 432.9,79.3 434.6,79.3 436.2,79.3 437.9,79.3 439.6,79.3 441.4,79.3 443.1,79.3 444.8,79.3 446.4,79.3 448.1,79.3 449.9,79.3 451.6,79.3 453.2,79.3 454.9,79.3 456.6,79.3 458.4,79.3 460.1,79.3 461.8,79.3 463.4,79.3 465.1,79.3 466.9,79.3 468.6,79.3 470.2,79.3 471.9,79.3 473.6,79.3 475.4,79.3 477.1,79.3 478.8,79.3 480.4,79.3 482.1,79.3 483.9,79.3 485.6,79.3 487.2,79.3 488.9,79.3 490.6,79.3 492.4,79.3 494.1,79.3 495.8,79.3 497.4,79.3 499.1,79.3 500.9,79.3 502.6,79.3 504.2,79.3 505.9,79.3 507.6,79.3 509.4,79.3 511.1,79.3 512.8,79.3 514.5,79.3 516.1,79.3 517.9,79.3 519.5,79.3 521.2,79.3 523.0,79.3 524.6,79.3 526.4,79.3 528.0,79.3 529.8,79.3 531.5,79.3 533.1,79.3 534.9,79.3 536.5,79.3 538.2,79.3 540.0,79.3 541.6,79.3 543.4,79.3 545.0,79.3 546.8,79.3 548.5,79.3 550.1,79.3 551.9,79.3 553.5,79.3 555.2,79.3 557.0,79.3 558.6,79.3 560.4,79.3 562.0,79.3 563.8,79.3 565.5,79.3 567.1,79.3" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5,4"/>
<polyline points="398.9,170.7 400.6,170.7 402.2,170.7 403.9,170.7 405.6,170.7 407.4,170.7 409.1,170.7 410.8,170.7 412.4,170.7 414.1,170.7 415.9,170.7 417.6,170.7 419.2,170.7 420.9,170.7 422.6,170.7 424.4,170.7 426.1,170.7 427.8,170.7 429.4,170.7 431.1,170.7 432.9,170.7 434.6,170.7 436.2,170.7 437.9,170.7 439.6,170.7 441.4,170.7 443.1,170.7 444.8,170.7 446.4,170.7 448.1,170.7 449.9,170.7 451.6,170.7 453.2,170.7 454.9,170.7 456.6,170.7 458.4,170.7 460.1,170.7 461.8,170.7 463.4,170.7 465.1,170.7 466.9,170.7 468.6,170.7 470.2,170.7 471.9,170.7 473.6,170.7 475.4,170.7 477.1,170.7 478.8,170.7 480.4,170.7 482.1,170.7 483.9,170.7 485.6,170.7 487.2,170.7 488.9,170.7 490.6,170.7 492.4,170.7 494.1,170.7 495.8,170.7 497.4,170.7 499.1,170.7 500.9,170.7 502.6,170.7 504.2,170.7 505.9,170.7 507.6,170.7 509.4,170.7 511.1,170.7 512.8,170.7 514.5,170.7 516.1,170.7 517.9,170.7 519.5,170.7 521.2,170.7 523.0,170.7 524.6,170.7 526.4,170.7 528.0,170.7 529.8,170.7 531.5,170.7 533.1,170.7 534.9,170.7 536.5,170.7 538.2,170.7 540.0,170.7 541.6,170.7 543.4,170.7 545.0,170.7 546.8,170.7 548.5,170.7 550.1,170.7 551.9,170.7 553.5,170.7 555.2,170.7 557.0,170.7 558.6,170.7 560.4,170.7 562.0,170.7 563.8,170.7 565.5,170.7 567.1,170.7" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5,4"/>
<text x="566.0" y="201.0" text-anchor="end" fill="currentColor">±2</text>
<text x="483.0" y="223.0" text-anchor="middle" fill="currentColor">n = 1 … 1000</text>
<text x="107.0" y="238.0" text-anchor="middle" fill="#e03a3a" font-weight="bold">si allarga</text>
<text x="295.0" y="238.0" text-anchor="middle" fill="#e03a3a" font-weight="bold">si stringe</text>
<text x="483.0" y="238.0" text-anchor="middle" fill="#2e9e5b" font-weight="bold">resta uguale</text>
</svg>
<figcaption>Otto passeggiate aleatorie di mille passi da +1 o −1, viste con tre lenti. A sinistra la somma Sₙ: le linee tratteggiate a ±2√n si allargano, e le passeggiate con loro. Al centro la media Sₙ/n: le linee a ±2/√n si stringono verso lo zero, ed è la legge dei grandi numeri. A destra Sₙ/√n: le linee restano a ±2 e le passeggiate continuano a oscillare con la stessa ampiezza.</figcaption>
</figure>

La terza lente è quella giusta per guardare la **forma**. Con la prima tutto si allarga e con la seconda tutto si schiaccia in un punto, e in entrambi i casi non si vede nulla di stabile. Con la terza la dispersione resta la stessa, e ha senso chiedersi: al crescere di $n$, che forma prende la distribuzione di $S_n/\sqrt n$? Il teorema del limite centrale risponde: la forma della normale.

### La somma dimentica la forma degli addendi {: #forma-somma }

Vediamo che cosa succede con un esempio preso dal corso di Piech a Stanford. Sommiamo $n$ variabili $X_i$ uniformi tra 0 e 1, indipendenti. Ciascuna ha media $\mu=1/2$ e varianza $\sigma^2=1/12$, quindi la somma $S_n$ ha media $n/2$ e varianza $n/12$. Con $n=1$ la densità è un rettangolo. Con $n=2$ è un triangolo, tra 0 e 2, con la punta in 1, come la distribuzione della somma di due dadi che conosciamo dalla Settimana 7: i valori centrali si possono ottenere in molti modi, quelli estremi in pochi. Con $n=5$ gli spigoli si sono già arrotondati, e la densità somiglia molto a una campana. Con $n=10$ la densità vera e la normale con la stessa media e la stessa varianza, $\mathcal N(n/2,\;n/12)$, a occhio non si distinguono più.

<figure markdown="0">
<svg viewBox="0 0 580 440" style="width:100%;max-width:560px;display:block;margin:auto;font-family:sans-serif;font-size:13px" role="img" aria-label="Quattro grafici: la densità della somma di n uniformi tra 0 e 1 per n uguale a 1, 2, 5 e 10, in blu, con sovrapposta la normale con la stessa media e la stessa varianza, in arancione tratteggiato. Con n uguale a 1 è un rettangolo, con 2 un triangolo, con 5 e 10 le due curve quasi coincidono. L'area colorata è la probabilità che la somma sia minore di n terzi.">
<text x="290.0" y="18.0" text-anchor="middle" fill="currentColor" font-weight="bold">La somma di n uniformi tra 0 e 1, e la normale</text>
<polygon points="30.0,190.0 30.0,190.0 31.1,190.0 32.2,190.0 33.4,190.0 34.5,190.0 35.6,190.0 36.7,190.0 37.8,190.0 38.9,190.0 40.1,190.0 41.2,190.0 42.3,190.0 43.4,190.0 44.5,190.0 45.7,190.0 46.8,190.0 47.9,190.0 49.0,190.0 50.1,190.0 51.3,190.0 52.4,190.0 53.5,190.0 54.6,190.0 55.7,190.0 56.8,190.0 58.0,190.0 59.1,190.0 60.2,190.0 61.3,190.0 62.4,190.0 63.6,190.0 64.7,190.0 65.8,190.0 66.9,190.0 68.0,190.0 69.2,190.0 70.3,190.0 71.4,106.0 72.5,106.0 73.6,106.0 74.7,106.0 75.9,106.0 77.0,106.0 78.1,106.0 79.2,106.0 80.3,106.0 81.5,106.0 82.6,106.0 83.7,106.0 84.8,106.0 85.9,106.0 87.1,106.0 88.2,106.0 89.3,106.0 90.4,106.0 91.5,106.0 92.6,106.0 93.8,106.0 94.9,106.0 96.0,106.0 97.1,106.0 98.2,106.0 99.4,106.0 100.5,106.0 101.6,106.0 102.7,106.0 103.8,106.0 105.0,106.0 106.1,106.0 107.2,106.0 108.3,106.0 109.4,106.0 110.5,106.0 111.7,106.0 112.8,106.0 113.9,106.0 115.0,106.0 116.1,106.0 117.3,106.0 118.4,106.0 119.5,106.0 120.6,106.0 121.7,106.0 122.9,106.0 124.0,106.0 125.1,106.0 125.3,106.0 125.3,190.0" fill="#2e9e5b" fill-opacity="0.35" stroke="none"/>
<polyline points="30.0,190.0 31.1,190.0 32.2,190.0 33.4,190.0 34.5,190.0 35.6,190.0 36.7,190.0 37.8,190.0 38.9,190.0 40.1,190.0 41.2,190.0 42.3,190.0 43.4,190.0 44.5,190.0 45.7,190.0 46.8,190.0 47.9,190.0 49.0,190.0 50.1,190.0 51.3,190.0 52.4,190.0 53.5,190.0 54.6,190.0 55.7,190.0 56.8,190.0 58.0,190.0 59.1,190.0 60.2,190.0 61.3,190.0 62.4,190.0 63.6,190.0 64.7,190.0 65.8,190.0 66.9,190.0 68.0,190.0 69.2,190.0 70.3,190.0 71.4,106.0 72.5,106.0 73.6,106.0 74.7,106.0 75.9,106.0 77.0,106.0 78.1,106.0 79.2,106.0 80.3,106.0 81.5,106.0 82.6,106.0 83.7,106.0 84.8,106.0 85.9,106.0 87.1,106.0 88.2,106.0 89.3,106.0 90.4,106.0 91.5,106.0 92.6,106.0 93.8,106.0 94.9,106.0 96.0,106.0 97.1,106.0 98.2,106.0 99.4,106.0 100.5,106.0 101.6,106.0 102.7,106.0 103.8,106.0 105.0,106.0 106.1,106.0 107.2,106.0 108.3,106.0 109.4,106.0 110.5,106.0 111.7,106.0 112.8,106.0 113.9,106.0 115.0,106.0 116.1,106.0 117.3,106.0 118.4,106.0 119.5,106.0 120.6,106.0 121.7,106.0 122.9,106.0 124.0,106.0 125.1,106.0 126.2,106.0 127.3,106.0 128.4,106.0 129.6,106.0 130.7,106.0 131.8,106.0 132.9,106.0 134.0,106.0 135.2,106.0 136.3,106.0 137.4,106.0 138.5,106.0 139.6,106.0 140.8,106.0 141.9,106.0 143.0,106.0 144.1,106.0 145.2,106.0 146.3,106.0 147.5,106.0 148.6,106.0 149.7,106.0 150.8,106.0 151.9,106.0 153.1,106.0 154.2,106.0 155.3,106.0 156.4,106.0 157.5,106.0 158.7,106.0 159.8,106.0 160.9,106.0 162.0,106.0 163.1,106.0 164.2,106.0 165.4,106.0 166.5,106.0 167.6,106.0 168.7,106.0 169.8,106.0 171.0,106.0 172.1,106.0 173.2,106.0 174.3,106.0 175.4,106.0 176.6,106.0 177.7,106.0 178.8,106.0 179.9,106.0 181.0,106.0 182.1,106.0 183.3,106.0 184.4,106.0 185.5,106.0 186.6,106.0 187.7,106.0 188.9,106.0 190.0,106.0 191.1,106.0 192.2,106.0 193.3,106.0 194.5,106.0 195.6,106.0 196.7,106.0 197.8,106.0 198.9,106.0 200.0,106.0 201.2,106.0 202.3,106.0 203.4,106.0 204.5,106.0 205.6,106.0 206.8,106.0 207.9,106.0 209.0,106.0 210.1,106.0 211.2,106.0 212.4,106.0 213.5,106.0 214.6,106.0 215.7,106.0 216.8,106.0 217.9,106.0 219.1,106.0 220.2,106.0 221.3,106.0 222.4,106.0 223.5,106.0 224.7,106.0 225.8,106.0 226.9,106.0 228.0,106.0 229.1,106.0 230.3,106.0 231.4,106.0 232.5,106.0 233.6,106.0 234.7,190.0 235.8,190.0 237.0,190.0 238.1,190.0 239.2,190.0 240.3,190.0 241.4,190.0 242.6,190.0 243.7,190.0 244.8,190.0 245.9,190.0 247.0,190.0 248.2,190.0 249.3,190.0 250.4,190.0 251.5,190.0 252.6,190.0 253.7,190.0 254.9,190.0 256.0,190.0 257.1,190.0 258.2,190.0 259.3,190.0 260.5,190.0 261.6,190.0 262.7,190.0 263.8,190.0 264.9,190.0 266.1,190.0 267.2,190.0 268.3,190.0 269.4,190.0 270.5,190.0 271.6,190.0 272.8,190.0 273.9,190.0 275.0,190.0" fill="none" stroke="#4051b5" stroke-width="2.2"/>
<polyline points="30.0,186.0 31.1,185.8 32.2,185.5 33.4,185.2 34.5,184.9 35.6,184.6 36.7,184.3 37.8,184.0 38.9,183.6 40.1,183.2 41.2,182.8 42.3,182.4 43.4,182.0 44.5,181.6 45.7,181.1 46.8,180.6 47.9,180.1 49.0,179.6 50.1,179.0 51.3,178.4 52.4,177.8 53.5,177.2 54.6,176.5 55.7,175.9 56.8,175.2 58.0,174.4 59.1,173.7 60.2,172.9 61.3,172.1 62.4,171.3 63.6,170.4 64.7,169.5 65.8,168.6 66.9,167.6 68.0,166.7 69.2,165.7 70.3,164.6 71.4,163.6 72.5,162.5 73.6,161.3 74.7,160.2 75.9,159.0 77.0,157.8 78.1,156.6 79.2,155.3 80.3,154.0 81.5,152.7 82.6,151.3 83.7,150.0 84.8,148.6 85.9,147.1 87.1,145.7 88.2,144.2 89.3,142.7 90.4,141.2 91.5,139.7 92.6,138.1 93.8,136.6 94.9,135.0 96.0,133.4 97.1,131.8 98.2,130.1 99.4,128.5 100.5,126.8 101.6,125.2 102.7,123.5 103.8,121.9 105.0,120.2 106.1,118.5 107.2,116.8 108.3,115.2 109.4,113.5 110.5,111.9 111.7,110.2 112.8,108.6 113.9,107.0 115.0,105.4 116.1,103.8 117.3,102.2 118.4,100.7 119.5,99.1 120.6,97.6 121.7,96.2 122.9,94.7 124.0,93.3 125.1,92.0 126.2,90.6 127.3,89.3 128.4,88.1 129.6,86.9 130.7,85.7 131.8,84.6 132.9,83.5 134.0,82.5 135.2,81.5 136.3,80.6 137.4,79.7 138.5,78.9 139.6,78.2 140.8,77.5 141.9,76.8 143.0,76.3 144.1,75.7 145.2,75.3 146.3,74.9 147.5,74.6 148.6,74.3 149.7,74.1 150.8,74.0 151.9,73.9 153.1,73.9 154.2,74.0 155.3,74.1 156.4,74.3 157.5,74.6 158.7,74.9 159.8,75.3 160.9,75.7 162.0,76.3 163.1,76.8 164.2,77.5 165.4,78.2 166.5,78.9 167.6,79.7 168.7,80.6 169.8,81.5 171.0,82.5 172.1,83.5 173.2,84.6 174.3,85.7 175.4,86.9 176.6,88.1 177.7,89.3 178.8,90.6 179.9,92.0 181.0,93.3 182.1,94.7 183.3,96.2 184.4,97.6 185.5,99.1 186.6,100.7 187.7,102.2 188.9,103.8 190.0,105.4 191.1,107.0 192.2,108.6 193.3,110.2 194.5,111.9 195.6,113.5 196.7,115.2 197.8,116.8 198.9,118.5 200.0,120.2 201.2,121.9 202.3,123.5 203.4,125.2 204.5,126.8 205.6,128.5 206.8,130.1 207.9,131.8 209.0,133.4 210.1,135.0 211.2,136.6 212.4,138.1 213.5,139.7 214.6,141.2 215.7,142.7 216.8,144.2 217.9,145.7 219.1,147.1 220.2,148.6 221.3,150.0 222.4,151.3 223.5,152.7 224.7,154.0 225.8,155.3 226.9,156.6 228.0,157.8 229.1,159.0 230.3,160.2 231.4,161.3 232.5,162.5 233.6,163.6 234.7,164.6 235.8,165.7 237.0,166.7 238.1,167.6 239.2,168.6 240.3,169.5 241.4,170.4 242.6,171.3 243.7,172.1 244.8,172.9 245.9,173.7 247.0,174.4 248.2,175.2 249.3,175.9 250.4,176.5 251.5,177.2 252.6,177.8 253.7,178.4 254.9,179.0 256.0,179.6 257.1,180.1 258.2,180.6 259.3,181.1 260.5,181.6 261.6,182.0 262.7,182.4 263.8,182.8 264.9,183.2 266.1,183.6 267.2,184.0 268.3,184.3 269.4,184.6 270.5,184.9 271.6,185.2 272.8,185.5 273.9,185.8 275.0,186.0" fill="none" stroke="#e07a1f" stroke-width="2" stroke-dasharray="6,4"/>
<line x1="30.0" y1="190.0" x2="275.0" y2="190.0" stroke="currentColor" stroke-width="1"/>
<line x1="70.8" y1="190.0" x2="70.8" y2="194.0" stroke="currentColor" stroke-width="1"/>
<text x="70.8" y="206.0" text-anchor="middle" fill="currentColor">0</text>
<line x1="234.2" y1="190.0" x2="234.2" y2="194.0" stroke="currentColor" stroke-width="1"/>
<text x="234.2" y="206.0" text-anchor="middle" fill="currentColor">1</text>
<text x="34.0" y="54.0" text-anchor="start" fill="currentColor" font-weight="bold">n = 1</text>
<text x="275.0" y="54.0" text-anchor="end" fill="#2e9e5b">P(S₁ &lt; 1/3) = 1/3</text>
<polygon points="305.0,190.0 305.0,190.0 306.1,190.0 307.2,190.0 308.4,190.0 309.5,190.0 310.6,190.0 311.7,190.0 312.8,190.0 313.9,190.0 315.1,190.0 316.2,190.0 317.3,190.0 318.4,190.0 319.5,190.0 320.7,190.0 321.8,190.0 322.9,190.0 324.0,190.0 325.1,190.0 326.3,190.0 327.4,190.0 328.5,190.0 329.6,190.0 330.7,190.0 331.8,190.0 333.0,190.0 334.1,190.0 335.2,190.0 336.3,190.0 337.4,190.0 338.6,190.0 339.7,190.0 340.8,190.0 341.9,190.0 343.0,190.0 344.2,190.0 345.3,190.0 346.4,190.0 347.5,190.0 348.6,190.0 349.7,190.0 350.9,190.0 352.0,190.0 353.1,189.0 354.2,187.3 355.3,185.5 356.5,183.8 357.6,182.1 358.7,180.3 359.8,178.6 360.9,176.8 362.1,175.1 363.2,173.3 364.3,171.6 365.4,169.8 366.5,168.1 367.6,166.4 368.8,164.6 369.9,162.9 371.0,161.1 372.1,159.4 373.2,157.6 374.4,155.9 375.5,154.2 376.6,152.4 377.7,150.7 378.8,148.9 380.0,147.2 381.1,145.4 382.2,143.7 383.3,141.9 384.4,140.2 385.5,138.5 386.7,136.7 387.8,135.0 388.9,133.2 390.0,131.5 391.1,129.7 392.3,128.0 393.4,126.2 394.5,124.5 395.6,122.8 396.7,121.0 397.9,119.3 399.0,117.5 400.1,115.8 401.2,114.0 402.3,112.3 402.5,112.0 402.5,190.0" fill="#2e9e5b" fill-opacity="0.35" stroke="none"/>
<polyline points="305.0,190.0 306.1,190.0 307.2,190.0 308.4,190.0 309.5,190.0 310.6,190.0 311.7,190.0 312.8,190.0 313.9,190.0 315.1,190.0 316.2,190.0 317.3,190.0 318.4,190.0 319.5,190.0 320.7,190.0 321.8,190.0 322.9,190.0 324.0,190.0 325.1,190.0 326.3,190.0 327.4,190.0 328.5,190.0 329.6,190.0 330.7,190.0 331.8,190.0 333.0,190.0 334.1,190.0 335.2,190.0 336.3,190.0 337.4,190.0 338.6,190.0 339.7,190.0 340.8,190.0 341.9,190.0 343.0,190.0 344.2,190.0 345.3,190.0 346.4,190.0 347.5,190.0 348.6,190.0 349.7,190.0 350.9,190.0 352.0,190.0 353.1,189.0 354.2,187.3 355.3,185.5 356.5,183.8 357.6,182.1 358.7,180.3 359.8,178.6 360.9,176.8 362.1,175.1 363.2,173.3 364.3,171.6 365.4,169.8 366.5,168.1 367.6,166.4 368.8,164.6 369.9,162.9 371.0,161.1 372.1,159.4 373.2,157.6 374.4,155.9 375.5,154.2 376.6,152.4 377.7,150.7 378.8,148.9 380.0,147.2 381.1,145.4 382.2,143.7 383.3,141.9 384.4,140.2 385.5,138.5 386.7,136.7 387.8,135.0 388.9,133.2 390.0,131.5 391.1,129.7 392.3,128.0 393.4,126.2 394.5,124.5 395.6,122.8 396.7,121.0 397.9,119.3 399.0,117.5 400.1,115.8 401.2,114.0 402.3,112.3 403.4,110.6 404.6,108.8 405.7,107.1 406.8,105.3 407.9,103.6 409.0,101.8 410.2,100.1 411.3,98.3 412.4,96.6 413.5,94.9 414.6,93.1 415.8,91.4 416.9,89.6 418.0,87.9 419.1,86.1 420.2,84.4 421.3,82.6 422.5,80.9 423.6,79.2 424.7,77.4 425.8,75.7 426.9,73.9 428.1,73.9 429.2,75.7 430.3,77.4 431.4,79.2 432.5,80.9 433.7,82.6 434.8,84.4 435.9,86.1 437.0,87.9 438.1,89.6 439.2,91.4 440.4,93.1 441.5,94.9 442.6,96.6 443.7,98.3 444.8,100.1 446.0,101.8 447.1,103.6 448.2,105.3 449.3,107.1 450.4,108.8 451.6,110.6 452.7,112.3 453.8,114.0 454.9,115.8 456.0,117.5 457.1,119.3 458.3,121.0 459.4,122.8 460.5,124.5 461.6,126.2 462.7,128.0 463.9,129.7 465.0,131.5 466.1,133.2 467.2,135.0 468.3,136.7 469.5,138.5 470.6,140.2 471.7,141.9 472.8,143.7 473.9,145.4 475.0,147.2 476.2,148.9 477.3,150.7 478.4,152.4 479.5,154.2 480.6,155.9 481.8,157.6 482.9,159.4 484.0,161.1 485.1,162.9 486.2,164.6 487.4,166.4 488.5,168.1 489.6,169.8 490.7,171.6 491.8,173.3 492.9,175.1 494.1,176.8 495.2,178.6 496.3,180.3 497.4,182.1 498.5,183.8 499.7,185.5 500.8,187.3 501.9,189.0 503.0,190.0 504.1,190.0 505.3,190.0 506.4,190.0 507.5,190.0 508.6,190.0 509.7,190.0 510.8,190.0 512.0,190.0 513.1,190.0 514.2,190.0 515.3,190.0 516.4,190.0 517.6,190.0 518.7,190.0 519.8,190.0 520.9,190.0 522.0,190.0 523.2,190.0 524.3,190.0 525.4,190.0 526.5,190.0 527.6,190.0 528.7,190.0 529.9,190.0 531.0,190.0 532.1,190.0 533.2,190.0 534.3,190.0 535.5,190.0 536.6,190.0 537.7,190.0 538.8,190.0 539.9,190.0 541.1,190.0 542.2,190.0 543.3,190.0 544.4,190.0 545.5,190.0 546.6,190.0 547.8,190.0 548.9,190.0 550.0,190.0" fill="none" stroke="#4051b5" stroke-width="2.2"/>
<polyline points="305.0,190.0 306.1,190.0 307.2,189.9 308.4,189.9 309.5,189.9 310.6,189.9 311.7,189.9 312.8,189.9 313.9,189.9 315.1,189.9 316.2,189.8 317.3,189.8 318.4,189.8 319.5,189.8 320.7,189.7 321.8,189.7 322.9,189.7 324.0,189.6 325.1,189.6 326.3,189.5 327.4,189.5 328.5,189.4 329.6,189.3 330.7,189.2 331.8,189.1 333.0,189.0 334.1,188.9 335.2,188.8 336.3,188.6 337.4,188.5 338.6,188.3 339.7,188.1 340.8,187.9 341.9,187.7 343.0,187.5 344.2,187.2 345.3,186.9 346.4,186.6 347.5,186.2 348.6,185.9 349.7,185.4 350.9,185.0 352.0,184.5 353.1,184.0 354.2,183.5 355.3,182.9 356.5,182.2 357.6,181.6 358.7,180.8 359.8,180.1 360.9,179.2 362.1,178.4 363.2,177.4 364.3,176.4 365.4,175.4 366.5,174.2 367.6,173.1 368.8,171.8 369.9,170.5 371.0,169.2 372.1,167.7 373.2,166.2 374.4,164.6 375.5,163.0 376.6,161.3 377.7,159.5 378.8,157.7 380.0,155.8 381.1,153.8 382.2,151.7 383.3,149.6 384.4,147.5 385.5,145.3 386.7,143.0 387.8,140.7 388.9,138.4 390.0,136.0 391.1,133.5 392.3,131.1 393.4,128.6 394.5,126.1 395.6,123.5 396.7,121.0 397.9,118.5 399.0,115.9 400.1,113.4 401.2,110.9 402.3,108.5 403.4,106.1 404.6,103.7 405.7,101.3 406.8,99.1 407.9,96.8 409.0,94.7 410.2,92.6 411.3,90.7 412.4,88.8 413.5,87.0 414.6,85.4 415.8,83.8 416.9,82.4 418.0,81.1 419.1,79.9 420.2,78.9 421.3,78.0 422.5,77.3 423.6,76.7 424.7,76.2 425.8,75.9 426.9,75.7 428.1,75.7 429.2,75.9 430.3,76.2 431.4,76.7 432.5,77.3 433.7,78.0 434.8,78.9 435.9,79.9 437.0,81.1 438.1,82.4 439.2,83.8 440.4,85.4 441.5,87.0 442.6,88.8 443.7,90.7 444.8,92.6 446.0,94.7 447.1,96.8 448.2,99.1 449.3,101.3 450.4,103.7 451.6,106.1 452.7,108.5 453.8,110.9 454.9,113.4 456.0,115.9 457.1,118.5 458.3,121.0 459.4,123.5 460.5,126.1 461.6,128.6 462.7,131.1 463.9,133.5 465.0,136.0 466.1,138.4 467.2,140.7 468.3,143.0 469.5,145.3 470.6,147.5 471.7,149.6 472.8,151.7 473.9,153.8 475.0,155.8 476.2,157.7 477.3,159.5 478.4,161.3 479.5,163.0 480.6,164.6 481.8,166.2 482.9,167.7 484.0,169.2 485.1,170.5 486.2,171.8 487.4,173.1 488.5,174.2 489.6,175.4 490.7,176.4 491.8,177.4 492.9,178.4 494.1,179.2 495.2,180.1 496.3,180.8 497.4,181.6 498.5,182.2 499.7,182.9 500.8,183.5 501.9,184.0 503.0,184.5 504.1,185.0 505.3,185.4 506.4,185.9 507.5,186.2 508.6,186.6 509.7,186.9 510.8,187.2 512.0,187.5 513.1,187.7 514.2,187.9 515.3,188.1 516.4,188.3 517.6,188.5 518.7,188.6 519.8,188.8 520.9,188.9 522.0,189.0 523.2,189.1 524.3,189.2 525.4,189.3 526.5,189.4 527.6,189.5 528.7,189.5 529.9,189.6 531.0,189.6 532.1,189.7 533.2,189.7 534.3,189.7 535.5,189.8 536.6,189.8 537.7,189.8 538.8,189.8 539.9,189.9 541.1,189.9 542.2,189.9 543.3,189.9 544.4,189.9 545.5,189.9 546.6,189.9 547.8,189.9 548.9,190.0 550.0,190.0" fill="none" stroke="#e07a1f" stroke-width="2" stroke-dasharray="6,4"/>
<line x1="305.0" y1="190.0" x2="550.0" y2="190.0" stroke="currentColor" stroke-width="1"/>
<line x1="352.5" y1="190.0" x2="352.5" y2="194.0" stroke="currentColor" stroke-width="1"/>
<text x="352.5" y="206.0" text-anchor="middle" fill="currentColor">0</text>
<line x1="427.5" y1="190.0" x2="427.5" y2="194.0" stroke="currentColor" stroke-width="1"/>
<text x="427.5" y="206.0" text-anchor="middle" fill="currentColor">1</text>
<line x1="502.5" y1="190.0" x2="502.5" y2="194.0" stroke="currentColor" stroke-width="1"/>
<text x="502.5" y="206.0" text-anchor="middle" fill="currentColor">2</text>
<text x="309.0" y="54.0" text-anchor="start" fill="currentColor" font-weight="bold">n = 2</text>
<text x="550.0" y="54.0" text-anchor="end" fill="#4051b5" font-weight="bold">esatta 0,2222</text>
<text x="550.0" y="70.0" text-anchor="end" fill="#e07a1f" font-weight="bold">normale 0,2071</text>
<polygon points="30.0,385.0 30.0,385.0 31.1,385.0 32.2,385.0 33.4,385.0 34.5,385.0 35.6,385.0 36.7,385.0 37.8,385.0 38.9,385.0 40.1,385.0 41.2,385.0 42.3,385.0 43.4,385.0 44.5,385.0 45.7,385.0 46.8,385.0 47.9,384.9 49.0,384.9 50.1,384.9 51.3,384.9 52.4,384.8 53.5,384.8 54.6,384.7 55.7,384.6 56.8,384.6 58.0,384.5 59.1,384.4 60.2,384.3 61.3,384.1 62.4,384.0 63.6,383.8 64.7,383.6 65.8,383.4 66.9,383.2 68.0,382.9 69.2,382.6 70.3,382.3 71.4,381.9 72.5,381.6 73.6,381.1 74.7,380.7 75.9,380.2 77.0,379.7 78.1,379.1 79.2,378.5 80.3,377.8 81.5,377.1 82.6,376.3 83.7,375.5 84.8,374.6 85.9,373.7 87.1,372.7 88.2,371.6 89.3,370.5 90.4,369.3 91.5,368.0 92.6,366.7 93.8,365.3 94.9,363.9 96.0,362.4 97.1,360.8 98.2,359.1 99.4,357.4 100.5,355.7 101.6,353.8 102.7,352.0 103.8,350.0 105.0,348.0 106.1,346.0 107.2,343.9 108.3,341.7 109.4,339.5 110.5,337.3 111.7,335.0 112.8,332.7 113.0,332.3 113.0,385.0" fill="#2e9e5b" fill-opacity="0.35" stroke="none"/>
<polyline points="30.0,385.0 31.1,385.0 32.2,385.0 33.4,385.0 34.5,385.0 35.6,385.0 36.7,385.0 37.8,385.0 38.9,385.0 40.1,385.0 41.2,385.0 42.3,385.0 43.4,385.0 44.5,385.0 45.7,385.0 46.8,385.0 47.9,384.9 49.0,384.9 50.1,384.9 51.3,384.9 52.4,384.8 53.5,384.8 54.6,384.7 55.7,384.6 56.8,384.6 58.0,384.5 59.1,384.4 60.2,384.3 61.3,384.1 62.4,384.0 63.6,383.8 64.7,383.6 65.8,383.4 66.9,383.2 68.0,382.9 69.2,382.6 70.3,382.3 71.4,381.9 72.5,381.6 73.6,381.1 74.7,380.7 75.9,380.2 77.0,379.7 78.1,379.1 79.2,378.5 80.3,377.8 81.5,377.1 82.6,376.3 83.7,375.5 84.8,374.6 85.9,373.7 87.1,372.7 88.2,371.6 89.3,370.5 90.4,369.3 91.5,368.0 92.6,366.7 93.8,365.3 94.9,363.9 96.0,362.4 97.1,360.8 98.2,359.1 99.4,357.4 100.5,355.7 101.6,353.8 102.7,352.0 103.8,350.0 105.0,348.0 106.1,346.0 107.2,343.9 108.3,341.7 109.4,339.5 110.5,337.3 111.7,335.0 112.8,332.7 113.9,330.4 115.0,328.0 116.1,325.6 117.3,323.2 118.4,320.8 119.5,318.4 120.6,316.0 121.7,313.6 122.9,311.2 124.0,308.8 125.1,306.4 126.2,304.1 127.3,301.8 128.4,299.6 129.6,297.4 130.7,295.2 131.8,293.1 132.9,291.1 134.0,289.2 135.2,287.3 136.3,285.6 137.4,283.9 138.5,282.3 139.6,280.9 140.8,279.5 141.9,278.3 143.0,277.1 144.1,276.1 145.2,275.2 146.3,274.5 147.5,273.8 148.6,273.3 149.7,272.9 150.8,272.6 151.9,272.5 153.1,272.5 154.2,272.6 155.3,272.9 156.4,273.3 157.5,273.8 158.7,274.5 159.8,275.2 160.9,276.1 162.0,277.1 163.1,278.3 164.2,279.5 165.4,280.9 166.5,282.3 167.6,283.9 168.7,285.6 169.8,287.3 171.0,289.2 172.1,291.1 173.2,293.1 174.3,295.2 175.4,297.4 176.6,299.6 177.7,301.8 178.8,304.1 179.9,306.4 181.0,308.8 182.1,311.2 183.3,313.6 184.4,316.0 185.5,318.4 186.6,320.8 187.7,323.2 188.9,325.6 190.0,328.0 191.1,330.4 192.2,332.7 193.3,335.0 194.5,337.3 195.6,339.5 196.7,341.7 197.8,343.9 198.9,346.0 200.0,348.0 201.2,350.0 202.3,352.0 203.4,353.8 204.5,355.7 205.6,357.4 206.8,359.1 207.9,360.8 209.0,362.4 210.1,363.9 211.2,365.3 212.4,366.7 213.5,368.0 214.6,369.3 215.7,370.5 216.8,371.6 217.9,372.7 219.1,373.7 220.2,374.6 221.3,375.5 222.4,376.3 223.5,377.1 224.7,377.8 225.8,378.5 226.9,379.1 228.0,379.7 229.1,380.2 230.3,380.7 231.4,381.1 232.5,381.6 233.6,381.9 234.7,382.3 235.8,382.6 237.0,382.9 238.1,383.2 239.2,383.4 240.3,383.6 241.4,383.8 242.6,384.0 243.7,384.1 244.8,384.3 245.9,384.4 247.0,384.5 248.2,384.6 249.3,384.6 250.4,384.7 251.5,384.8 252.6,384.8 253.7,384.9 254.9,384.9 256.0,384.9 257.1,384.9 258.2,385.0 259.3,385.0 260.5,385.0 261.6,385.0 262.7,385.0 263.8,385.0 264.9,385.0 266.1,385.0 267.2,385.0 268.3,385.0 269.4,385.0 270.5,385.0 271.6,385.0 272.8,385.0 273.9,385.0 275.0,385.0" fill="none" stroke="#4051b5" stroke-width="2.2"/>
<polyline points="30.0,385.0 31.1,385.0 32.2,384.9 33.4,384.9 34.5,384.9 35.6,384.9 36.7,384.9 37.8,384.9 38.9,384.9 40.1,384.9 41.2,384.8 42.3,384.8 43.4,384.8 44.5,384.8 45.7,384.7 46.8,384.7 47.9,384.7 49.0,384.6 50.1,384.6 51.3,384.5 52.4,384.4 53.5,384.4 54.6,384.3 55.7,384.2 56.8,384.1 58.0,384.0 59.1,383.9 60.2,383.8 61.3,383.6 62.4,383.5 63.6,383.3 64.7,383.1 65.8,382.9 66.9,382.7 68.0,382.4 69.2,382.1 70.3,381.8 71.4,381.5 72.5,381.2 73.6,380.8 74.7,380.4 75.9,379.9 77.0,379.4 78.1,378.9 79.2,378.4 80.3,377.8 81.5,377.1 82.6,376.4 83.7,375.7 84.8,374.9 85.9,374.1 87.1,373.2 88.2,372.2 89.3,371.2 90.4,370.1 91.5,369.0 92.6,367.8 93.8,366.5 94.9,365.2 96.0,363.8 97.1,362.4 98.2,360.8 99.4,359.2 100.5,357.6 101.6,355.8 102.7,354.0 103.8,352.2 105.0,350.2 106.1,348.2 107.2,346.1 108.3,344.0 109.4,341.8 110.5,339.6 111.7,337.3 112.8,334.9 113.9,332.5 115.0,330.1 116.1,327.6 117.3,325.1 118.4,322.6 119.5,320.0 120.6,317.5 121.7,314.9 122.9,312.3 124.0,309.8 125.1,307.2 126.2,304.7 127.3,302.2 128.4,299.7 129.6,297.3 130.7,294.9 131.8,292.6 132.9,290.4 134.0,288.2 135.2,286.1 136.3,284.1 137.4,282.2 138.5,280.4 139.6,278.7 140.8,277.1 141.9,275.7 143.0,274.4 144.1,273.2 145.2,272.1 146.3,271.2 147.5,270.5 148.6,269.9 149.7,269.4 150.8,269.1 151.9,268.9 153.1,268.9 154.2,269.1 155.3,269.4 156.4,269.9 157.5,270.5 158.7,271.2 159.8,272.1 160.9,273.2 162.0,274.4 163.1,275.7 164.2,277.1 165.4,278.7 166.5,280.4 167.6,282.2 168.7,284.1 169.8,286.1 171.0,288.2 172.1,290.4 173.2,292.6 174.3,294.9 175.4,297.3 176.6,299.7 177.7,302.2 178.8,304.7 179.9,307.2 181.0,309.8 182.1,312.3 183.3,314.9 184.4,317.5 185.5,320.0 186.6,322.6 187.7,325.1 188.9,327.6 190.0,330.1 191.1,332.5 192.2,334.9 193.3,337.3 194.5,339.6 195.6,341.8 196.7,344.0 197.8,346.1 198.9,348.2 200.0,350.2 201.2,352.2 202.3,354.0 203.4,355.8 204.5,357.6 205.6,359.2 206.8,360.8 207.9,362.4 209.0,363.8 210.1,365.2 211.2,366.5 212.4,367.8 213.5,369.0 214.6,370.1 215.7,371.2 216.8,372.2 217.9,373.2 219.1,374.1 220.2,374.9 221.3,375.7 222.4,376.4 223.5,377.1 224.7,377.8 225.8,378.4 226.9,378.9 228.0,379.4 229.1,379.9 230.3,380.4 231.4,380.8 232.5,381.2 233.6,381.5 234.7,381.8 235.8,382.1 237.0,382.4 238.1,382.7 239.2,382.9 240.3,383.1 241.4,383.3 242.6,383.5 243.7,383.6 244.8,383.8 245.9,383.9 247.0,384.0 248.2,384.1 249.3,384.2 250.4,384.3 251.5,384.4 252.6,384.4 253.7,384.5 254.9,384.6 256.0,384.6 257.1,384.7 258.2,384.7 259.3,384.7 260.5,384.8 261.6,384.8 262.7,384.8 263.8,384.8 264.9,384.9 266.1,384.9 267.2,384.9 268.3,384.9 269.4,384.9 270.5,384.9 271.6,384.9 272.8,384.9 273.9,385.0 275.0,385.0" fill="none" stroke="#e07a1f" stroke-width="2" stroke-dasharray="6,4"/>
<line x1="30.0" y1="385.0" x2="275.0" y2="385.0" stroke="currentColor" stroke-width="1"/>
<line x1="81.3" y1="385.0" x2="81.3" y2="389.0" stroke="currentColor" stroke-width="1"/>
<text x="81.3" y="401.0" text-anchor="middle" fill="currentColor">1</text>
<line x1="152.5" y1="385.0" x2="152.5" y2="389.0" stroke="currentColor" stroke-width="1"/>
<text x="152.5" y="401.0" text-anchor="middle" fill="currentColor">2,5</text>
<line x1="223.7" y1="385.0" x2="223.7" y2="389.0" stroke="currentColor" stroke-width="1"/>
<text x="223.7" y="401.0" text-anchor="middle" fill="currentColor">4</text>
<text x="34.0" y="249.0" text-anchor="start" fill="currentColor" font-weight="bold">n = 5</text>
<text x="275.0" y="249.0" text-anchor="end" fill="#4051b5" font-weight="bold">esatta 0,1017</text>
<text x="275.0" y="265.0" text-anchor="end" fill="#e07a1f" font-weight="bold">normale 0,0984</text>
<polygon points="305.0,385.0 305.0,385.0 306.1,385.0 307.2,385.0 308.4,385.0 309.5,385.0 310.6,385.0 311.7,385.0 312.8,385.0 313.9,384.9 315.1,384.9 316.2,384.9 317.3,384.9 318.4,384.9 319.5,384.9 320.7,384.8 321.8,384.8 322.9,384.8 324.0,384.7 325.1,384.7 326.3,384.7 327.4,384.6 328.5,384.5 329.6,384.5 330.7,384.4 331.8,384.3 333.0,384.2 334.1,384.1 335.2,384.0 336.3,383.8 337.4,383.7 338.6,383.5 339.7,383.3 340.8,383.1 341.9,382.9 343.0,382.6 344.2,382.4 345.3,382.1 346.4,381.7 347.5,381.4 348.6,381.0 349.7,380.5 350.9,380.1 352.0,379.6 353.1,379.0 354.2,378.4 355.3,377.8 356.5,377.1 357.6,376.4 358.7,375.6 359.8,374.8 360.9,373.9 362.1,372.9 363.2,371.9 364.3,370.9 365.4,369.7 366.5,368.6 367.6,367.3 368.8,366.0 369.9,364.6 371.0,363.2 371.6,362.4 371.6,385.0" fill="#2e9e5b" fill-opacity="0.35" stroke="none"/>
<polyline points="305.0,385.0 306.1,385.0 307.2,385.0 308.4,385.0 309.5,385.0 310.6,385.0 311.7,385.0 312.8,385.0 313.9,384.9 315.1,384.9 316.2,384.9 317.3,384.9 318.4,384.9 319.5,384.9 320.7,384.8 321.8,384.8 322.9,384.8 324.0,384.7 325.1,384.7 326.3,384.7 327.4,384.6 328.5,384.5 329.6,384.5 330.7,384.4 331.8,384.3 333.0,384.2 334.1,384.1 335.2,384.0 336.3,383.8 337.4,383.7 338.6,383.5 339.7,383.3 340.8,383.1 341.9,382.9 343.0,382.6 344.2,382.4 345.3,382.1 346.4,381.7 347.5,381.4 348.6,381.0 349.7,380.5 350.9,380.1 352.0,379.6 353.1,379.0 354.2,378.4 355.3,377.8 356.5,377.1 357.6,376.4 358.7,375.6 359.8,374.8 360.9,373.9 362.1,372.9 363.2,371.9 364.3,370.9 365.4,369.7 366.5,368.6 367.6,367.3 368.8,366.0 369.9,364.6 371.0,363.2 372.1,361.6 373.2,360.1 374.4,358.4 375.5,356.7 376.6,354.9 377.7,353.1 378.8,351.2 380.0,349.2 381.1,347.1 382.2,345.1 383.3,342.9 384.4,340.7 385.5,338.5 386.7,336.2 387.8,333.8 388.9,331.5 390.0,329.1 391.1,326.6 392.3,324.2 393.4,321.7 394.5,319.2 395.6,316.7 396.7,314.2 397.9,311.7 399.0,309.2 400.1,306.8 401.2,304.4 402.3,302.0 403.4,299.6 404.6,297.3 405.7,295.1 406.8,292.9 407.9,290.7 409.0,288.7 410.2,286.7 411.3,284.8 412.4,283.1 413.5,281.4 414.6,279.8 415.8,278.3 416.9,277.0 418.0,275.7 419.1,274.6 420.2,273.7 421.3,272.8 422.5,272.1 423.6,271.5 424.7,271.1 425.8,270.8 426.9,270.7 428.1,270.7 429.2,270.8 430.3,271.1 431.4,271.5 432.5,272.1 433.7,272.8 434.8,273.7 435.9,274.6 437.0,275.7 438.1,277.0 439.2,278.3 440.4,279.8 441.5,281.4 442.6,283.1 443.7,284.8 444.8,286.7 446.0,288.7 447.1,290.7 448.2,292.9 449.3,295.1 450.4,297.3 451.6,299.6 452.7,302.0 453.8,304.4 454.9,306.8 456.0,309.2 457.1,311.7 458.3,314.2 459.4,316.7 460.5,319.2 461.6,321.7 462.7,324.2 463.9,326.6 465.0,329.1 466.1,331.5 467.2,333.8 468.3,336.2 469.5,338.5 470.6,340.7 471.7,342.9 472.8,345.1 473.9,347.1 475.0,349.2 476.2,351.2 477.3,353.1 478.4,354.9 479.5,356.7 480.6,358.4 481.8,360.1 482.9,361.6 484.0,363.2 485.1,364.6 486.2,366.0 487.4,367.3 488.5,368.6 489.6,369.7 490.7,370.9 491.8,371.9 492.9,372.9 494.1,373.9 495.2,374.8 496.3,375.6 497.4,376.4 498.5,377.1 499.7,377.8 500.8,378.4 501.9,379.0 503.0,379.6 504.1,380.1 505.3,380.5 506.4,381.0 507.5,381.4 508.6,381.7 509.7,382.1 510.8,382.4 512.0,382.6 513.1,382.9 514.2,383.1 515.3,383.3 516.4,383.5 517.6,383.7 518.7,383.8 519.8,384.0 520.9,384.1 522.0,384.2 523.2,384.3 524.3,384.4 525.4,384.5 526.5,384.5 527.6,384.6 528.7,384.7 529.9,384.7 531.0,384.7 532.1,384.8 533.2,384.8 534.3,384.8 535.5,384.9 536.6,384.9 537.7,384.9 538.8,384.9 539.9,384.9 541.1,384.9 542.2,385.0 543.3,385.0 544.4,385.0 545.5,385.0 546.6,385.0 547.8,385.0 548.9,385.0 550.0,385.0" fill="none" stroke="#4051b5" stroke-width="2.2"/>
<polyline points="305.0,385.0 306.1,385.0 307.2,384.9 308.4,384.9 309.5,384.9 310.6,384.9 311.7,384.9 312.8,384.9 313.9,384.9 315.1,384.9 316.2,384.8 317.3,384.8 318.4,384.8 319.5,384.8 320.7,384.7 321.8,384.7 322.9,384.7 324.0,384.6 325.1,384.6 326.3,384.5 327.4,384.4 328.5,384.4 329.6,384.3 330.7,384.2 331.8,384.1 333.0,384.0 334.1,383.9 335.2,383.8 336.3,383.6 337.4,383.5 338.6,383.3 339.7,383.1 340.8,382.9 341.9,382.7 343.0,382.4 344.2,382.1 345.3,381.8 346.4,381.5 347.5,381.2 348.6,380.8 349.7,380.4 350.9,379.9 352.0,379.4 353.1,378.9 354.2,378.4 355.3,377.8 356.5,377.1 357.6,376.4 358.7,375.7 359.8,374.9 360.9,374.1 362.1,373.2 363.2,372.2 364.3,371.2 365.4,370.1 366.5,369.0 367.6,367.8 368.8,366.5 369.9,365.2 371.0,363.8 372.1,362.4 373.2,360.8 374.4,359.2 375.5,357.6 376.6,355.8 377.7,354.0 378.8,352.2 380.0,350.2 381.1,348.2 382.2,346.1 383.3,344.0 384.4,341.8 385.5,339.6 386.7,337.3 387.8,334.9 388.9,332.5 390.0,330.1 391.1,327.6 392.3,325.1 393.4,322.6 394.5,320.0 395.6,317.5 396.7,314.9 397.9,312.3 399.0,309.8 400.1,307.2 401.2,304.7 402.3,302.2 403.4,299.7 404.6,297.3 405.7,294.9 406.8,292.6 407.9,290.4 409.0,288.2 410.2,286.1 411.3,284.1 412.4,282.2 413.5,280.4 414.6,278.7 415.8,277.1 416.9,275.7 418.0,274.4 419.1,273.2 420.2,272.1 421.3,271.2 422.5,270.5 423.6,269.9 424.7,269.4 425.8,269.1 426.9,268.9 428.1,268.9 429.2,269.1 430.3,269.4 431.4,269.9 432.5,270.5 433.7,271.2 434.8,272.1 435.9,273.2 437.0,274.4 438.1,275.7 439.2,277.1 440.4,278.7 441.5,280.4 442.6,282.2 443.7,284.1 444.8,286.1 446.0,288.2 447.1,290.4 448.2,292.6 449.3,294.9 450.4,297.3 451.6,299.7 452.7,302.2 453.8,304.7 454.9,307.2 456.0,309.8 457.1,312.3 458.3,314.9 459.4,317.5 460.5,320.0 461.6,322.6 462.7,325.1 463.9,327.6 465.0,330.1 466.1,332.5 467.2,334.9 468.3,337.3 469.5,339.6 470.6,341.8 471.7,344.0 472.8,346.1 473.9,348.2 475.0,350.2 476.2,352.2 477.3,354.0 478.4,355.8 479.5,357.6 480.6,359.2 481.8,360.8 482.9,362.4 484.0,363.8 485.1,365.2 486.2,366.5 487.4,367.8 488.5,369.0 489.6,370.1 490.7,371.2 491.8,372.2 492.9,373.2 494.1,374.1 495.2,374.9 496.3,375.7 497.4,376.4 498.5,377.1 499.7,377.8 500.8,378.4 501.9,378.9 503.0,379.4 504.1,379.9 505.3,380.4 506.4,380.8 507.5,381.2 508.6,381.5 509.7,381.8 510.8,382.1 512.0,382.4 513.1,382.7 514.2,382.9 515.3,383.1 516.4,383.3 517.6,383.5 518.7,383.6 519.8,383.8 520.9,383.9 522.0,384.0 523.2,384.1 524.3,384.2 525.4,384.3 526.5,384.4 527.6,384.4 528.7,384.5 529.9,384.6 531.0,384.6 532.1,384.7 533.2,384.7 534.3,384.7 535.5,384.8 536.6,384.8 537.7,384.8 538.8,384.8 539.9,384.9 541.1,384.9 542.2,384.9 543.3,384.9 544.4,384.9 545.5,384.9 546.6,384.9 547.8,384.9 548.9,385.0 550.0,385.0" fill="none" stroke="#e07a1f" stroke-width="2" stroke-dasharray="6,4"/>
<line x1="305.0" y1="385.0" x2="550.0" y2="385.0" stroke="currentColor" stroke-width="1"/>
<line x1="360.4" y1="385.0" x2="360.4" y2="389.0" stroke="currentColor" stroke-width="1"/>
<text x="360.4" y="401.0" text-anchor="middle" fill="currentColor">3</text>
<line x1="427.5" y1="385.0" x2="427.5" y2="389.0" stroke="currentColor" stroke-width="1"/>
<text x="427.5" y="401.0" text-anchor="middle" fill="currentColor">5</text>
<line x1="494.6" y1="385.0" x2="494.6" y2="389.0" stroke="currentColor" stroke-width="1"/>
<text x="494.6" y="401.0" text-anchor="middle" fill="currentColor">7</text>
<text x="309.0" y="249.0" text-anchor="start" fill="currentColor" font-weight="bold">n = 10</text>
<text x="550.0" y="249.0" text-anchor="end" fill="#4051b5" font-weight="bold">esatta 0,0337</text>
<text x="550.0" y="265.0" text-anchor="end" fill="#e07a1f" font-weight="bold">normale 0,0339</text>
<text x="290.0" y="432.0" text-anchor="middle" fill="#2e9e5b">in verde: P(Sₙ &lt; n/3)</text>
</svg>
<figcaption>La densità della somma Sₙ di n variabili uniformi tra 0 e 1 (blu) e la normale con la stessa media n/2 e la stessa varianza n/12 (arancione tratteggiato), per n = 1, 2, 5 e 10. L’area verde è P(Sₙ &lt; n/3). Il valore esatto di questa probabilità, confrontato con quello della normale, è 0,2222 contro 0,2071 per n = 2, 0,1017 contro 0,0984 per n = 5, 0,0337 contro 0,0339 per n = 10.</figcaption>
</figure>

Per misurare quanto la normale si avvicini, calcoliamo una probabilità in due modi: la probabilità che la somma stia sotto un terzo del suo valore massimo, $P(S_n<n/3)$, che è anche la probabilità che la media $\bar X_n$ stia sotto $1/3$. Con $n=2$ il valore esatto si ottiene con la geometria della Settimana 6: sotto il triangolo, la parte a sinistra di $2/3$ è un triangolo più piccolo, con base $2/3$ e altezza $2/3$, e la sua area è $\frac12\cdot\frac23\cdot\frac23=\frac29\approx0{,}2222$. Il valore della normale si ottiene standardizzando: la somma ha media 1 e deviazione standard $\sqrt{2/12}\approx0{,}408$, quindi

$$
P(S_2<2/3)\approx\Phi\!\left(\frac{2/3-1}{0{,}408}\right)=\Phi(-0{,}82)\approx0{,}207.
$$

Con due soli addendi la normale sbaglia di un punto e mezzo percentuale. Con cinque addendi i due valori sono 0,1017 e 0,0984; con dieci sono 0,0337 e 0,0339, e la differenza è nella quarta cifra decimale. I conti esatti per $n=5$ e $n=10$ richiedono una formula che non ci serve; il primo laboratorio (qui sotto) li fa al posto nostro.

Lo stesso succede partendo da forme molto diverse. Nella Settimana 8 abbiamo disegnato la distribuzione della media di 1, 4 e 16 dadi, e con sedici dadi era già una campana. C’è anche un esempio più estremo, preso dal [simulatore della Rice University](https://onlinestatbook.com/stat_sim/sampling_dist/): una popolazione con due gobbe, molto lontana da una campana, da cui si estraggono campioni di 15 valori; la distribuzione della somma, e quella della media, dei 15 valori è di nuovo una campana stretta e simmetrica. Le gobbe sono sparite.

Questa è l’idea centrale della settimana: **la somma dimentica la forma degli addendi**. Della distribuzione di partenza, che sia piatta, a gobbe, a gradini o asimmetrica, nella somma di molti addendi indipendenti restano soltanto due numeri: la media $\mu$, che decide il centro $n\mu$, e la varianza $\sigma^2$, che decide la larghezza $\sigma\sqrt n$. Tutto il resto si perde, e al suo posto compare sempre la stessa forma. Le formule per la media e la varianza della somma le conoscevamo già dalla Settimana 8, e valgono esattamente per ogni $n$. La novità è la forma, che vale soltanto in modo approssimato, ma vale per tutte le distribuzioni con varianza finita.

#### Esplora: la campana delle somme {: #widget-somme }

Il widget simula 20 000 volte la somma di $n$ variabili indipendenti con la distribuzione che scegli, ne disegna l’istogramma in blu e ci sovrappone in arancione la normale con media $n\mu$ e varianza $n\sigma^2$. Sotto il grafico trovi la frazione di somme che superano $n\mu+2\sigma\sqrt n$ e quella delle somme che stanno sotto $n\mu-2\sigma\sqrt n$: per una normale sarebbero entrambe il 2,28%. Le distribuzioni di partenza sono cinque: l’uniforme tra 0 e 1, il dado, l’esponenziale con media 1, una distribuzione «a due gobbe» (con probabilità 0,6 un valore uniforme tra 0 e 2, altrimenti un valore uniforme tra 8 e 10) e la variabile bernoulliana con $p=0{,}1$. Prima di muovere il cursore, prevedi: quale delle cinque avrà bisogno del numero più grande di addendi per somigliare alla campana?

<div class="s09-box" id="s09-somme">
  <label>Addendi: <select id="s09-somme-d">
    <option value="unif">uniforme tra 0 e 1</option>
    <option value="dado">dado</option>
    <option value="esp">esponenziale (media 1)</option>
    <option value="gobbe">due gobbe</option>
    <option value="bern">bernoulliana (p = 0,1)</option>
  </select></label>
  <label>n = <input type="range" id="s09-somme-n" min="1" max="50" step="1" value="1"> <b id="s09-somme-nv">1</b></label>
  <button type="button" id="s09-somme-b">Nuovo campione</button>
  <svg class="s09-svg" id="s09-somme-svg" viewBox="0 0 560 290" role="img" aria-label="Istogramma blu di 20 000 somme simulate di n variabili con la distribuzione scelta, con sovrapposta in arancione la densità normale con la stessa media e la stessa varianza. Due linee rosse tratteggiate segnano la media più e meno due deviazioni standard."></svg>
  <div class="s09-out" id="s09-somme-out"></div>
</div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  var M = 20000, seed = 1733, NS = 'http://www.w3.org/2000/svg', somme = null;
  var sd = document.getElementById('s09-somme-d'), sn = document.getElementById('s09-somme-n');
  var btn = document.getElementById('s09-somme-b'), svg = document.getElementById('s09-somme-svg');
  var out = document.getElementById('s09-somme-out');
  var D = {
    unif: { mu: 0.5, v: 1 / 12, disc: false, a: 0, b: 1, g: function (r) { return r(); } },
    dado: { mu: 3.5, v: 35 / 12, disc: true, a: 1, b: 6, g: function (r) { return 1 + Math.floor(r() * 6); } },
    esp: { mu: 1, v: 1, disc: false, a: 0, b: Infinity, g: function (r) { return -Math.log(1 - r()); } },
    gobbe: { mu: 4.2, v: 0.6 * 4 / 3 + 0.4 * (1 / 3 + 81) - 4.2 * 4.2, disc: false, a: 0, b: 10,
             g: function (r) { return r() < 0.6 ? 2 * r() : 8 + 2 * r(); } },
    bern: { mu: 0.1, v: 0.09, disc: true, a: 0, b: 1, g: function (r) { return r() < 0.1 ? 1 : 0; } }
  };
  function rng(a) {
    return function () {
      a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function it(x, d) { return x.toFixed(d).replace('.', ','); }
  function el(tag, attrs, txt) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (txt != null) e.textContent = txt;
    svg.appendChild(e); return e;
  }
  function simula() {
    var d = D[sd.value], n = +sn.value, r = rng(seed + n * 7919);
    somme = new Float64Array(M);
    for (var j = 0; j < M; j++) { var s = 0; for (var i = 0; i < n; i++) s += d.g(r); somme[j] = s; }
  }
  function render() {
    var d = D[sd.value], n = +sn.value;
    document.getElementById('s09-somme-nv').textContent = n;
    var m = n * d.mu, s = Math.sqrt(n * d.v);
    var lo = Math.max(n * d.a, m - 4 * s), hi = Math.min(n * d.b, m + 4 * s);
    if (d.disc) { lo = Math.floor(lo) - 0.5; hi = Math.ceil(hi) + 0.5; }
    var blo = lo, bhi = hi, pad = 0.04 * (hi - lo); lo -= pad; hi += pad;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var x0 = 40, x1 = 545, y0 = 235, y1 = 20;
    function X(v) { return x0 + (v - lo) / (hi - lo) * (x1 - x0); }
    var bins = [], w, k;
    if (d.disc) {
      w = 1; var kmin = Math.ceil(lo), kmax = Math.floor(hi);
      for (k = kmin; k <= kmax; k++) bins.push({ c: k, n: 0 });
      for (var j = 0; j < M; j++) { k = Math.round(somme[j]) - kmin; if (k >= 0 && k < bins.length) bins[k].n++; }
    } else {
      var B = 40; w = (bhi - blo) / B;
      for (k = 0; k < B; k++) bins.push({ c: blo + (k + 0.5) * w, n: 0 });
      for (var q = 0; q < M; q++) { k = Math.floor((somme[q] - blo) / w); if (k >= 0 && k < B) bins[k].n++; }
    }
    var peak = 1 / (s * Math.sqrt(2 * Math.PI)), ymax = peak;
    bins.forEach(function (b) { b.h = b.n / (M * w); if (b.h > ymax) ymax = b.h; });
    ymax *= 1.1;
    function Y(v) { return y0 - Math.min(v, ymax) / ymax * (y0 - y1); }
    var bw = (X(lo + w) - X(lo)) * 0.88;
    bins.forEach(function (b) {
      if (b.h > 0) el('rect', { x: X(b.c) - bw / 2, y: Y(b.h), width: bw, height: y0 - Y(b.h), fill: '#4051b5', 'fill-opacity': 0.55 });
    });
    var pts = [];
    for (var t = 0; t <= 200; t++) {
      var xv = lo + (hi - lo) * t / 200, z = (xv - m) / s;
      pts.push(X(xv).toFixed(1) + ',' + Y(peak * Math.exp(-z * z / 2)).toFixed(1));
    }
    el('polyline', { points: pts.join(' '), fill: 'none', stroke: '#e07a1f', 'stroke-width': 2.4 });
    el('line', { x1: x0, y1: y0, x2: x1, y2: y0, stroke: 'currentColor' });
    [-2, 2].forEach(function (c) {
      var xc = m + c * s;
      if (xc > lo && xc < hi) el('line', { x1: X(xc), y1: y0, x2: X(xc), y2: y1 + 10, stroke: '#e03a3a', 'stroke-width': 1.5, 'stroke-dasharray': '5,4' });
    });
    var dec = s * 2 < 3 ? 1 : 0;
    [-3, -2, -1, 0, 1, 2, 3].forEach(function (c) {
      var xc = m + c * s;
      if (xc < lo || xc > hi) return;
      el('line', { x1: X(xc), y1: y0, x2: X(xc), y2: y0 + 5, stroke: 'currentColor' });
      el('text', { x: X(xc), y: y0 + 19, 'text-anchor': 'middle', fill: 'currentColor' }, it(xc, dec));
    });
    el('text', { x: (x0 + x1) / 2, y: y0 + 42, 'text-anchor': 'middle', fill: 'currentColor' },
      'somma di ' + n + (n === 1 ? ' addendo' : ' addendi') + ' (tacche a nμ + k·σ√n, k = −3 … 3)');
    var sopra = 0, sotto = 0;
    for (var p = 0; p < M; p++) { if (somme[p] > m + 2 * s + 1e-9) sopra++; if (somme[p] < m - 2 * s - 1e-9) sotto++; }
    out.innerHTML = 'Media della somma nμ = ' + it(m, 2) + ', deviazione standard σ√n = ' + it(s, 2) + '. ' +
      'Nella simulazione supera nμ + 2σ√n il <b class="s09-sim">' + it(100 * sopra / M, 2) + '%</b> delle somme, ' +
      'e sta sotto nμ − 2σ√n il <b class="s09-sim">' + it(100 * sotto / M, 2) + '%</b>; ' +
      'per la normale sarebbero <b class="s09-norm">2,28%</b> e <b class="s09-norm">2,28%</b>.';
  }
  sd.addEventListener('change', function () { simula(); render(); });
  sn.addEventListener('input', function () { simula(); render(); });
  btn.addEventListener('click', function () { seed = Math.floor(Math.random() * 1e9); simula(); render(); this.blur(); });
  simula();
  render();
});
</script>

Con l’uniforme bastano cinque addendi perché le due frazioni siano vicine al 2,28%. Con il dado ne bastano pochi di più, e con le due gobbe una decina: le gobbe spariscono in fretta, perché la distribuzione, per quanto strana, è simmetrica. Con l’esponenziale e con la variabile bernoulliana con $p=0{,}1$ succede qualcosa di diverso: anche con $n=30$ la coda di destra resta più pesante di quella di sinistra, e l’istogramma è visibilmente storto. Queste due distribuzioni sono **asimmetriche**, e la somma ci mette di più a dimenticare la loro forma. Ci torneremo nell’Atto VI, quando ci chiederemo quanto grande deve essere $n$.

Possiamo ora scrivere l’enunciato nella forma che si usa in pratica.

!!! abstract "Teorema del limite centrale (forma pratica)"
    Siano $X_1,\dots,X_n$ variabili aleatorie i.i.d. con media $\mu$ e varianza $\sigma^2$ finita. Allora, per $n$ grande,

    $$
    S_n=X_1+\cdots+X_n\;\approx\;\mathcal N\big(n\mu,\;n\sigma^2\big),\qquad\qquad \bar X_n=\frac{S_n}{n}\;\approx\;\mathcal N\!\left(\mu,\;\frac{\sigma^2}{n}\right).
    $$

    Il simbolo $\approx$ si legge «ha approssimativamente la distribuzione».

Le due affermazioni sono la stessa, scritta per la somma e per la media: dividere una variabile normale per un numero dà ancora una variabile normale, con la media divisa per $n$ e la varianza divisa per $n^2$. Attenzione alla notazione: alcuni testi scrivono la normale con la deviazione standard al secondo posto, $\mathcal N\big(\mu,\sqrt{\sigma^2/n}\big)$; noi, come nella Settimana 6, scriviamo la varianza. C’è anche un caso in cui il simbolo $\approx$ diventa un’uguaglianza: se le $X_i$ sono già normali, la loro somma è esattamente normale per ogni $n$, anche piccolo. Lo useremo in un esercizio, senza dimostrarlo.

!!! example "Sosta di verifica"
    Lanci 100 dadi equilibrati e indipendenti. Un dado ha media 3,5 e varianza $35/12\approx2{,}92$. Tra quali valori cade la somma dei cento risultati con probabilità di circa il 95%? E la loro media?

    ??? esempio-svolto "Risposta"
        La somma $S_{100}$ ha media $100\cdot3{,}5=350$ e varianza $100\cdot35/12\approx291{,}7$, quindi deviazione standard $\sqrt{291{,}7}\approx17{,}1$. Per il teorema è approssimativamente normale, e con la regola 68–95–99,7 il 95% dei valori sta entro due deviazioni standard: tra $350-34=316$ e $350+34=384$ circa. Dividendo per 100 otteniamo la media $\bar X_{100}=S_{100}/100$. Ha media $3{,}5$ e varianza $\frac{35/12}{100}\approx0{,}0292$, quindi deviazione standard $\sqrt{0{,}0292}\approx0{,}171$, cioè $17{,}1/100$. Anche la media è approssimativamente normale, e il 95% dei suoi valori sta entro due deviazioni standard, $2\cdot0{,}171\approx0{,}34$: tra $3{,}5-0{,}34=3{,}16$ e $3{,}5+0{,}34=3{,}84$ circa. È l’intervallo della somma diviso per 100, come deve essere, perché la media è la somma divisa per 100. La disuguaglianza di Čebyšëv, invece, usa soltanto la media e la varianza. Con $k=2$ dà $P\big(|S_{100}-350|<2\cdot17{,}1\big)\ge1-\frac{1}{2^2}=1-\frac14=0{,}75$: entro due deviazioni standard avremmo potuto garantire soltanto il 75%, contro il 95% circa che il teorema ci permette di calcolare.

## Atto III — Il teorema del limite centrale {: #teorema }

La forma pratica dice che la somma «diventa normale», ma la somma non si ferma mai: la sua media $n\mu$ e la sua varianza $n\sigma^2$ cambiano con $n$, e per $n$ che va all’infinito non tendono a nulla. Per dire con precisione che cosa converge, ripetiamo quello che abbiamo fatto con la terza lente: scegliamo una scala in cui la somma resta ferma.

### La somma standardizzata {: #standardizzata }

Nella Settimana 6 abbiamo imparato a standardizzare una variabile: si sottrae la sua media e si divide per la sua deviazione standard. Facciamolo con la somma $S_n$, che ha media $n\mu$ e deviazione standard $\sqrt{n\sigma^2}=\sigma\sqrt n$. La **somma standardizzata** è

$$
S_n^*=\frac{S_n-n\mu}{\sigma\sqrt n}.
$$

Per ogni $n$, $S_n^*$ ha media 0 e varianza 1. Infatti, per la linearità del valore atteso, $\mathbb{E}[S_n^*]=\big(\mathbb{E}[S_n]-n\mu\big)/(\sigma\sqrt n)=(n\mu-n\mu)/(\sigma\sqrt n)=0$: sottrarre la media sposta il centro in zero. E per la regola dei cambi di scala, $\operatorname{Var}(S_n^*)=\operatorname{Var}(S_n)/(\sigma\sqrt n)^2=n\sigma^2/(n\sigma^2)=1$: dividere per la deviazione standard porta la dispersione a 1. È la terza lente della passeggiata aleatoria, con in più lo spostamento del centro: $S_n^*$ non si allarga, non si stringe e non si sposta, e possiamo chiederci verso quale forma va.

La stessa variabile si può scrivere partendo dalla media campionaria. Dividendo numeratore e denominatore per $n$, si ottiene

$$
S_n^*=\frac{S_n/n-\mu}{\sigma\sqrt n/n}=\frac{\bar X_n-\mu}{\sigma/\sqrt n},
$$

perché $\sqrt n/n=1/\sqrt n$. È la media campionaria standardizzata: si sottrae la sua media $\mu$ e si divide per la sua deviazione standard $\sigma/\sqrt n$. Standardizzare la somma e standardizzare la media danno lo stesso numero.

### L’enunciato {: #enunciato }

!!! abstract "Teorema del limite centrale"
    Siano $X_1,X_2,\dots$ variabili aleatorie indipendenti e identicamente distribuite, con media $\mu$ e varianza $\sigma^2$ finita e positiva, e sia $S_n^*=\dfrac{S_n-n\mu}{\sigma\sqrt n}$ la somma standardizzata delle prime $n$. Allora, per ogni numero reale $t$,

    $$
    \lim_{n\to\infty}P\big(S_n^*\le t\big)=\Phi(t).
    $$

Leggiamo l’enunciato pezzo per pezzo. Le ipotesi sono tre: le variabili sono **indipendenti**, hanno tutte la **stessa distribuzione**, e la loro varianza è un numero **finito** (e diverso da zero, altrimenti le variabili sarebbero costanti e non ci sarebbe nulla da studiare). Sulla forma della distribuzione non si chiede nulla: può essere discreta o continua, simmetrica o storta, con una gobba o con due. La conclusione riguarda la **funzione di ripartizione** della Settimana 6, cioè la funzione $t\mapsto P(S_n^*\le t)$: per ogni soglia $t$, la probabilità che la somma standardizzata stia sotto $t$ si avvicina sempre di più alla probabilità che stia sotto $t$ una normale standard. Quando la funzione di ripartizione di una successione di variabili tende a quella di un’altra variabile si parla di **convergenza in distribuzione**: il teorema dice che $S_n^*$ converge in distribuzione a una normale standard.

Conviene confrontare questa convergenza con quella della [Settimana 8](../settimana_08/index.md#convergenza). La legge dei grandi numeri dice che $\bar X_n$ **converge in probabilità** a $\mu$: la media campionaria si schiaccia su un numero, e la probabilità di trovarla lontana da quel numero va a zero. Il teorema del limite centrale guarda la stessa media con una lente più potente. Ingrandisce la distanza $\bar X_n-\mu$ di un fattore $\sqrt n/\sigma$, proprio quanto basta perché non vada a zero, e scopre che le oscillazioni ingrandite hanno sempre la stessa forma, quella della campana. Le due leggi non sono in contrasto: la prima dice **dove** va la media, la seconda dice **come** oscilla attorno a quel punto, e su quale scala, mentre ci va.

Il teorema è un risultato **al limite**: dice che cosa succede quando $n$ tende all’infinito. In pratica lo si usa per un $n$ fissato e grande, e allora diventa un’approssimazione:

$$
P(S_n\le s)\approx\Phi\!\left(\frac{s-n\mu}{\sigma\sqrt n}\right),\qquad\qquad P(\bar X_n\le x)\approx\Phi\!\left(\frac{x-\mu}{\sigma/\sqrt n}\right).
$$

Il segno $\approx$ è importante: per un $n$ fissato il teorema non dice quanto sia buona l’approssimazione. Ce ne occuperemo nell’Atto VI.

!!! example "Sosta di verifica"
    Il tempo di elaborazione di un pacchetto di dati ha media 2 ms e deviazione standard 1 ms. Un router elabora 100 pacchetti indipendenti. (a) Quanto valgono media e deviazione standard del tempo totale $S_{100}$? (b) A che valore della somma standardizzata corrisponde un tempo totale di 215 ms?

    ??? esempio-svolto "Risposta"
        (a) $\mathbb{E}[S_{100}]=100\cdot2=200$ ms e $\sigma\sqrt n=1\cdot\sqrt{100}=10$ ms. (b) $S_{100}^*=(215-200)/10=1{,}5$: un tempo totale di 215 ms sta una deviazione standard e mezza sopra la media. Per il teorema, la probabilità che il tempo totale superi 215 ms è circa $1-\Phi(1{,}5)=1-0{,}9332=0{,}067$.

### Che cosa ci permette di fare {: #ricetta }

Il motivo per cui il teorema è così utile sta in una frase: consente, usando la tavola della funzione di ripartizione della normale standard, di trovare la probabilità di eventi che si rappresentano come somma $X_1+\cdots+X_n$ di variabili uguali e indipendenti, **a prescindere da quale sia la distribuzione** di $X_1,\dots,X_n$. Non serve conoscere la distribuzione della somma, che di solito è difficilissima da calcolare: bastano la media e la varianza di un singolo addendo.

Il procedimento è sempre lo stesso, e conviene raccontarlo una volta per tutte. Prima si riconosce che l’evento riguarda una somma, o una media, di variabili i.i.d., e si scrive l’evento in termini di $S_n$ o di $\bar X_n$. Poi si calcolano la media e la deviazione standard della somma, $n\mu$ e $\sigma\sqrt n$, oppure quelle della media, $\mu$ e $\sigma/\sqrt n$. Poi si standardizza la soglia, sottraendo la media e dividendo per la deviazione standard. Infine si legge la probabilità nella tabella di $\Phi$, usando $\Phi(-z)=1-\Phi(z)$ quando serve, esattamente come nella Settimana 6. Vediamolo all’opera con un esercizio.

### Le lampadine {: #lampadine }

Una lampadina ha un tempo di vita esponenziale con media $\mu=10$ giorni. Quando smette di funzionare viene subito sostituita da una nuova. Qual è la probabilità che 40 lampadine siano sufficienti per un anno?

Chiamiamo $X_1,\dots,X_{40}$ le durate delle quaranta lampadine. La somma $S_{40}=X_1+\cdots+X_{40}$ è il tempo totale coperto dalle lampadine usate in serie, una dopo l’altra, e l’evento «40 lampadine sono sufficienti per un anno» si scrive $S_{40}\ge365$. Le durate hanno tutte la stessa distribuzione, esponenziale con media 10, e sono indipendenti, perché una lampadina si guasta indipendentemente dalle altre. La distribuzione esponenziale ha la deviazione standard uguale alla media ([Settimana 6](../settimana_06/index.md#media-esponenziale)), quindi $\sigma=10$ e $\sigma^2=100$. La somma ha media e varianza

$$
\mathbb{E}[S_{40}]=40\cdot10=400,\qquad\operatorname{Var}(S_{40})=40\cdot100=4000,\qquad\sigma\sqrt{40}=\sqrt{4000}\approx63{,}2.
$$

Per il teorema, $S_{40}\approx\mathcal N(400,\;4000)$. Ora standardizziamo la soglia di 365 giorni:

$$
P(S_{40}\ge365)=1-P(S_{40}<365)\approx1-\Phi\!\left(\frac{365-400}{63{,}2}\right)=1-\Phi(-0{,}55).
$$

Il valore $-0{,}55$ è negativo, e la tabella contiene soltanto i valori positivi: per la simmetria della campana, $\Phi(-0{,}55)=1-\Phi(0{,}55)$, e quindi

$$
P(S_{40}\ge365)\approx1-\big(1-\Phi(0{,}55)\big)=\Phi(0{,}55)=0{,}71.
$$

Con quaranta lampadine si arriva alla fine dell’anno circa sette volte su dieci. La media del tempo totale, 400 giorni, supera l’anno, ma la deviazione standard di 63 giorni è grande, e uno scarto di 35 giorni sotto la media è tutt’altro che raro.

Quanto è buona questa approssimazione? In questo caso la distribuzione esatta della somma si conosce: la somma di esponenziali indipendenti ha una distribuzione che si chiama distribuzione gamma, che non studiamo, e con quella si trova 0,6975. La normale sbaglia di poco più di un punto percentuale. Il secondo laboratorio ottiene lo stesso numero con una simulazione. Di solito si giustifica l’uso del teorema osservando che «40 è maggiore di 30»: è una regola pratica molto diffusa, e nell’Atto VI vedremo che cosa vale davvero.

!!! example "Sosta di verifica"
    Vuoi copiare 400 foto su una chiavetta con 1000 MB liberi. Le dimensioni delle foto sono indipendenti, con media 2,4 MB e deviazione standard 1 MB. Con quale probabilità circa ci stanno tutte?

    ??? esempio-svolto "Risposta"
        La dimensione totale $S_{400}$ ha media $400\cdot2{,}4=960$ MB e deviazione standard $1\cdot\sqrt{400}=20$ MB. Per il teorema, $P(S_{400}\le1000)\approx\Phi\big((1000-960)/20\big)=\Phi(2)=0{,}977$. Le foto ci stanno circa 98 volte su cento. Nota che non abbiamo mai avuto bisogno di sapere quale forma abbia la distribuzione della dimensione di una foto.

### I dieci dadi {: #dieci-dadi }

Chiudiamo con un gioco. Lanciamo un dado 10 volte e sommiamo i risultati; chiamiamo $X$ la somma. Il docente vi dà 20 euro se $X\le25$ oppure $X\ge45$, e una mentina se accettate di giocare. Con quale probabilità vincete i 20 euro?

La somma $X$ ha media $10\cdot3{,}5=35$ e varianza $10\cdot35/12\approx29{,}17$, quindi deviazione standard $\sqrt{29{,}17}\approx5{,}40$. Le due soglie, 25 e 45, stanno alla stessa distanza dalla media, 10, cioè a $10/5{,}40\approx1{,}85$ deviazioni standard. Per il teorema $X\approx\mathcal N(35,\;29{,}17)$, e per la simmetria le due code hanno la stessa probabilità:

$$
P(X\le25\ \text{oppure}\ X\ge45)\approx2\big(1-\Phi(1{,}85)\big)=2\,(1-0{,}9678)=0{,}064.
$$

Il valore esatto, che il primo laboratorio calcola sommando tutti i casi, è 0,078. Questa volta la normale sbaglia di più che con le lampadine, eppure dieci dadi sono una somma ben fatta, simmetrica come le gobbe del widget. Da dove viene la differenza?

Viene dal fatto che $X$ è un numero intero, mentre la normale è continua. La normale distribuisce la probabilità con continuità lungo tutta la retta, mentre $X$ la concentra sui valori interi: per esempio $P(X=25)\approx0{,}014$, ma per una variabile continua la probabilità di un singolo punto è zero. Calcolando $P(X\le25)$ con la normale fino a 25 si prende soltanto «metà» della barra del valore 25, quella a sinistra. Per una variabile intera, infatti, l’evento $X\le25$ è lo stesso evento di $X<26$, e qualunque soglia tra 25 e 26 andrebbe bene; per la normale invece le soglie danno probabilità diverse. La scelta più equilibrata è quella a metà strada, 25,5, e allo stesso modo 44,5 per l’altra coda. Questo spostamento di mezza unità si chiama **correzione di continuità**: quando si approssima con la normale una variabile che assume valori interi, ogni valore intero $k$ è rappresentato dall’intervallo da $k-0{,}5$ a $k+0{,}5$. Con la correzione il conto diventa:

$$
P(X\le25\ \text{oppure}\ X\ge45)=1-P(25{,}5<X<44{,}5)\approx2\left(1-\Phi\!\left(\frac{9{,}5}{5{,}40}\right)\right)=2\,\big(1-\Phi(1{,}76)\big)=2\,(1-0{,}9608)=0{,}0784,
$$

molto vicino al valore esatto 0,0780. Ricordiamo che la correzione di continuità non è richiesta all’esame: è un affinamento utile quando i valori interi sono pochi e pesano molto, come qui. Quando la deviazione standard è grande rispetto a un’unità, come nei 3600 lanci di De Moivre, la differenza tra le due versioni diventa piccola.

Tornando al gioco: si vincono i 20 euro circa otto volte su cento. In media il docente regala $20\cdot0{,}078\approx1{,}56$ euro a partita, più la mentina: per gli studenti il gioco conviene, per il docente no.

### Laboratorio: la campana delle somme {: #lab-somme }

Il primo script rifà i conti di questo atto. Calcola in modo esatto la probabilità $P(S_n<n/3)$ per la somma di $n$ uniformi, con una formula che non studiamo, e la confronta con quella della normale; poi costruisce la distribuzione esatta della somma di dieci dadi, aggiungendo un dado alla volta come nella Settimana 7 si costruiva la somma di due, e calcola la probabilità di vincere al gioco nei tre modi: esatta, con la normale senza correzione e con la correzione. Infine disegna l’istogramma di 50 000 somme simulate di $n$ uniformi per $n=1,2,5,10$, con la campana sovrapposta.

<div class="psi-exec" markdown="1">
```python
from math import comb, factorial, sqrt
from statistics import NormalDist

import matplotlib.pyplot as plt
import numpy as np

Z = NormalDist()   # normale standard: Z.cdf(z) è la funzione Phi(z)


def cdf_uniformi(x, n):
    """P(S_n <= x) esatta per la somma di n uniformi tra 0 e 1."""
    tot = sum((-1) ** k * comb(n, k) * (x - k) ** n
              for k in range(int(x) + 1))
    return tot / factorial(n)


# P(S_n < n/3): valore esatto e normale con media n/2, varianza n/12.
print("  n   esatta   normale")
for n in [2, 5, 10]:
    esatta = cdf_uniformi(n / 3, n)
    normale = Z.cdf((n / 3 - n / 2) / sqrt(n / 12))
    print(f"{n:3d}   {esatta:.4f}   {normale:.4f}")

# Dieci dadi: la distribuzione esatta della somma si costruisce
# aggiungendo un dado alla volta (np.convolve somma su tutti i modi).
dado = np.ones(6) / 6
somma = np.array([1.0])
for _ in range(10):
    somma = np.convolve(somma, dado)
valori = np.arange(10, 61)               # la somma va da 10 a 60
vince = (valori <= 25) | (valori >= 45)
mu, sigma = 35, sqrt(10 * 35 / 12)
senza = 2 * (1 - Z.cdf(10 / sigma))      # soglie 25 e 45
con = 2 * (1 - Z.cdf(9.5 / sigma))       # soglie 25,5 e 44,5
print(f"\nDieci dadi: esatta {somma[vince].sum():.4f}   "
      f"normale {senza:.4f}   con la correzione {con:.4f}")

# Istogrammi della somma di n uniformi, con la campana sovrapposta.
rng = np.random.default_rng(1733)
fig, assi = plt.subplots(1, 4, figsize=(12, 3))
for asse, n in zip(assi, [1, 2, 5, 10]):
    s = rng.random((50_000, n)).sum(axis=1)
    campana = NormalDist(n / 2, sqrt(n / 12))
    x = np.linspace(s.min(), s.max(), 200)
    asse.hist(s, bins=50, density=True, alpha=0.6)
    asse.plot(x, [campana.pdf(v) for v in x])
    asse.set_title(f"n = {n}")
plt.tight_layout()
plt.show()
```
</div>

Lo script stampa le tre coppie di numeri della somma di uniformi, 0,2222 e 0,2071, 0,1017 e 0,0984, 0,0337 e 0,0339, e per i dieci dadi 0,0780 esatta, 0,0641 con la normale e 0,0786 con la correzione; nel testo abbiamo trovato 0,0784 perché abbiamo arrotondato $z$ a 1,76. Negli istogrammi il rettangolo diventa un triangolo e poi una campana. Prova a sostituire `rng.random` con `rng.exponential` e la campana con `NormalDist(n, sqrt(n))`, che ha la media e la varianza giuste per la somma di $n$ esponenziali con media 1: con $n=10$ l’istogramma è ancora visibilmente storto.

Abbiamo così il teorema e il modo di usarlo. Nella seconda lezione vediamo come Laplace lo rese generale, che cosa permette di fare con le distribuzioni che già conosciamo, e soprattutto quali sono i suoi limiti.

## Atti IV–VI — Laplace, gli usi del teorema e i suoi limiti {: #laplace }

*Seconda parte in arrivo…* Questa parte della dispensa sarà pubblicata con la Lezione 2. Andremo a Parigi nel 1810, dove Pierre-Simon Laplace capì che la stessa campana nasce dalla somma di errori di qualunque forma. Poi useremo il teorema in due modi nuovi: per approssimare la distribuzione binomiale, che è una somma di indicatrici, e per calcolare quante osservazioni servono per una certa precisione, confrontando il risultato con quello della disuguaglianza di Čebyšëv. Infine vedremo che cosa il teorema garantisce e che cosa no: servono l’indipendenza e una varianza finita, il teorema non dice quanto deve essere grande $n$, e riguarda le somme e le medie, non i singoli dati.

## Lettura A — Perché proprio la campana? {: #punto-fisso .psi-facoltativo }

*In arrivo…*

## Esercizi: prima prova, poi apri la soluzione {: #esercizi }

Gli esercizi 1–5 riguardano la prima lezione; quelli della seconda lezione saranno pubblicati con la Lezione 2. Per i conti con la normale usa la tabella di $\Phi$ della Settimana 6.

### Esercizio 1 — Le lampadine, con altri numeri {: #esercizio-1 }

Riprendi l’[esempio delle lampadine](#lampadine): durata esponenziale con media 10 giorni, sostituzione immediata. (a) Con quale probabilità circa 45 lampadine bastano per un anno? (b) E 50? (c) E 30?

??? esempio-svolto "Soluzione ragionata"
    La deviazione standard di una durata è 10, quindi la somma di $n$ durate ha media $10n$ e deviazione standard $10\sqrt n$. (a) Media 450, deviazione standard $10\sqrt{45}\approx67{,}1$; $z=(365-450)/67{,}1\approx-1{,}27$, e $P(S_{45}\ge365)\approx1-\Phi(-1{,}27)=\Phi(1{,}27)\approx0{,}898$. (b) Media 500, deviazione standard $\approx70{,}7$; $z\approx-1{,}91$ e la probabilità è circa $\Phi(1{,}91)=0{,}972$. (c) Media 300, sotto l’anno; deviazione standard $\approx54{,}8$; $z=(365-300)/54{,}8\approx1{,}19$ e $P(S_{30}\ge365)\approx1-\Phi(1{,}19)=0{,}117$. Con la distribuzione esatta i tre valori sono 0,904, 0,981 e 0,121: la normale sbaglia di meno di un punto percentuale.

### Esercizio 2 — Lo spazio su disco {: #esercizio-2 }

Un disco ha 1100 MB liberi, e devi salvarci 250 file di log indipendenti, con dimensione media 4 MB e deviazione standard 2 MB. (a) Con quale probabilità circa ci stanno? (b) E se i file sono 270?

??? esempio-svolto "Soluzione ragionata"
    (a) La dimensione totale ha media $250\cdot4=1000$ MB e deviazione standard $2\sqrt{250}\approx31{,}6$ MB. Per il teorema, $P(S_{250}\le1100)\approx\Phi\big(100/31{,}6\big)=\Phi(3{,}16)\approx0{,}9992$: è quasi certo. (b) Media 1080 MB, deviazione standard $2\sqrt{270}\approx32{,}9$ MB, $z=20/32{,}9\approx0{,}61$ e la probabilità è circa $\Phi(0{,}61)=0{,}729$. Venti file in più fanno scendere la probabilità dal 99,9% al 73%: lo spazio libero era «largo» rispetto alla deviazione standard, non rispetto alla media.

### Esercizio 3 — L’ascensore {: #esercizio-3 }

Un ascensore porta al massimo 900 kg. Salgono 11 persone, con pesi indipendenti e distribuzione normale con media 75 kg e deviazione standard 12 kg. (a) Qual è la probabilità di superare il limite? (b) Che cosa cambia se le persone sono 12? (c) In questo esercizio serve il teorema del limite centrale?

??? esempio-svolto "Soluzione ragionata"
    (a) Il peso totale ha media $11\cdot75=825$ kg e varianza $11\cdot144=1584$, quindi deviazione standard $\sqrt{1584}\approx39{,}8$ kg. $P(S_{11}>900)=1-\Phi\big(75/39{,}8\big)=1-\Phi(1{,}88)\approx0{,}030$. (b) Con 12 persone la media è proprio 900 kg, e la probabilità di superare il limite è $1/2$: una persona in più fa passare il rischio dal 3% al 50%. (c) No: la somma di variabili normali indipendenti è esattamente normale per ogni $n$, e il calcolo è esatto. Il teorema serve quando gli addendi non sono normali; qui basterebbe comunque, ma non è necessario.

### Esercizio 4 — Un aggiornamento difettoso {: #esercizio-4 }

Un aggiornamento viene installato su 400 server. Su ciascun server, in modo indipendente dagli altri, l’installazione fallisce con probabilità 0,1. (a) Con l’approssimazione normale, qual è la probabilità che falliscano più di 50 installazioni? (b) E al più 30?

??? esempio-svolto "Soluzione ragionata"
    Il numero $X$ di fallimenti ha distribuzione binomiale con $n=400$ e $p=0{,}1$: media $np=40$, varianza $np(1-p)=36$, deviazione standard 6. (a) $P(X>50)\approx1-\Phi\big((50-40)/6\big)=1-\Phi(1{,}67)\approx0{,}048$. (b) Per simmetria della normale, $P(X\le30)\approx\Phi(-1{,}67)\approx0{,}048$. I valori esatti sono 0,044 e 0,052: la distribuzione binomiale con $p=0{,}1$ è un po’ storta, e le due code non sono uguali come per la normale. Con la correzione di continuità, facoltativa, il punto (a) diventa $1-\Phi(10{,}5/6)=1-\Phi(1{,}75)\approx0{,}040$.

### Esercizio 5 — Un dado sospetto {: #esercizio-5 }

Un dado viene lanciato 6000 volte, e il sei esce 1100 volte. (a) Se il dado fosse equilibrato, quanti sei ti aspetteresti, e con quale deviazione standard? (b) Quanto è probabile, con l’approssimazione normale, ottenere almeno 1100 sei con un dado equilibrato? (c) Che cosa ne concludi?

??? esempio-svolto "Soluzione ragionata"
    (a) Il numero di sei è binomiale con $n=6000$ e $p=1/6$: media 1000, varianza $6000\cdot\frac16\cdot\frac56\approx833{,}3$, deviazione standard $\approx28{,}9$. (b) 1100 sta $100/28{,}9\approx3{,}46$ deviazioni standard sopra la media, e $P(X\ge1100)\approx1-\Phi(3{,}46)\approx0{,}0003$, circa tre volte su diecimila. (c) Con un dado equilibrato un risultato così sarebbe molto raro: è più ragionevole sospettare che il dado non sia equilibrato. È la domanda di De Moivre, «quanto è improbabile uno scarto così grande?», applicata a un dado.

## Errori da evitare {: #errori }

Il primo errore, il più diffuso, è credere che il teorema renda normali i **dati**. Non è così: rende approssimativamente normali la somma e la media di molti dati indipendenti, mentre ogni singolo dato conserva la sua distribuzione, uniforme, esponenziale o di qualunque altra forma.

Il secondo gruppo di errori riguarda i conti. La deviazione standard della somma di $n$ variabili i.i.d. è $\sigma\sqrt n$, non $n\sigma$, e quella della media è $\sigma/\sqrt n$, non $\sigma/n$. Quando si standardizza si divide per la deviazione standard, non per la varianza: con le lampadine si divide per $\sqrt{4000}\approx63{,}2$, non per 4000. Bisogna fare attenzione alla notazione: in questa dispensa $\mathcal N(\mu,\sigma^2)$ ha la varianza al secondo posto, mentre alcuni testi e la funzione `NormalDist` di Python vogliono la deviazione standard. Infine, la formula $n\sigma^2$ per la varianza della somma vale per addendi indipendenti: sommare $n$ volte la stessa variabile con se stessa dà varianza $n^2\sigma^2$, come abbiamo ricordato con il dado contato due volte.

L’ultimo gruppo riguarda la lettura dei risultati. Un risultato ottenuto con il teorema è un’approssimazione, e va scritto con $\approx$. Il teorema del limite centrale e la legge dei grandi numeri dicono cose diverse: la seconda dice che la media si avvicina a $\mu$, il primo dice come oscilla attorno a $\mu$ mentre si avvicina, con oscillazioni normali di ampiezza $\sigma/\sqrt n$. La correzione di continuità, se la usi, va nel verso giusto: per $P(X\le25)$ con $X$ intero si usa 25,5, per $P(X\ge45)$ si usa 44,5, così che i valori estremi siano inclusi nell’evento.

## Riepilogo per lo studio {: #riepilogo }

Sommando $n$ variabili aleatorie indipendenti e identicamente distribuite, con media $\mu$ e varianza $\sigma^2$ finita, si ottiene una somma $S_n$ con media $n\mu$ e varianza $n\sigma^2$, e una media campionaria $\bar X_n$ con media $\mu$ e varianza $\sigma^2/n$: queste formule valgono esattamente per ogni $n$. Il **teorema del limite centrale** aggiunge la forma: per $n$ grande, $S_n\approx\mathcal N(n\mu,\,n\sigma^2)$ e $\bar X_n\approx\mathcal N(\mu,\,\sigma^2/n)$, qualunque sia la distribuzione degli addendi. In forma precisa, la **somma standardizzata** $S_n^*=(S_n-n\mu)/(\sigma\sqrt n)$, che è anche la media standardizzata $(\bar X_n-\mu)/(\sigma/\sqrt n)$, ha funzione di ripartizione che tende a $\Phi$: $\lim_n P(S_n^*\le t)=\Phi(t)$ per ogni $t$. È una **convergenza in distribuzione**, diversa dalla convergenza in probabilità della legge dei grandi numeri: la media si schiaccia su $\mu$, ma le sue oscillazioni, ingrandite di $\sqrt n/\sigma$, hanno sempre la forma della campana. La somma dimentica la forma degli addendi e ne ricorda soltanto la media e la varianza.

La storia comincia con De Moivre, che nel 1733 trovò la campana studiando i lanci di una moneta: gli scarti dalla metà crescono come la radice quadrata del numero dei lanci, e cadono entro una e due deviazioni standard con probabilità di circa il 68% e il 95%.

Per usare il teorema si scrive l’evento in termini di una somma o di una media, se ne calcolano media e deviazione standard, si standardizza e si legge la tabella di $\Phi$. Così si calcola la probabilità che 40 lampadine durino un anno (circa 0,71), che una somma di dieci dadi sia estrema (circa 0,064, oppure 0,078 con la correzione di continuità, facoltativa), che una variabile binomiale, che è una somma di indicatrici, superi una soglia, con $X\approx\mathcal N(np,\,np(1-p))$.

!!! tip "Prova a raccontarlo senza il formulario"
    Spiega a un compagno perché il numero di teste in 3600 lanci sta tra 1770 e 1830 circa due volte su tre, e che cosa c’entra la radice quadrata di 3600. Poi mostragli, con le tre lenti della passeggiata aleatoria, perché per vedere la campana bisogna dividere la somma per $\sqrt n$ e non per $n$. Infine calcola con lui la probabilità che quaranta lampadine durino un anno. Se ci riesci, la prima parte della settimana è tua.

## Riferimenti e letture {: #riferimenti }

La dispensa adatta alcuni testi presenti nella bibliografia. Le citazioni storiche sono tradotte dall’inglese; le fonti sono letture facoltative.

- **Chris Piech**, *Probability for Computer Scientists*, materiale del corso Stanford CS109, capitoli sulle somme di variabili aleatorie e sul teorema del limite centrale: [testo online](https://chrispiech.github.io/probabilityForComputerScientists/en/). Da qui vengono la somma di uniformi e il gioco dei dieci dadi.
- **Michael Baron**, *Probability and Statistics for Computer Scientists*, 2ª ed., CRC Press, 2014, cap. 4, § 4.3 (teorema del limite centrale, approssimazione normale della distribuzione binomiale e correzione di continuità). Gli esercizi 2, 3 e 4 rielaborano, con numeri e contesti nuovi, tre esempi di questo capitolo. [Scheda dell’editore](https://doi.org/10.1201/b14800).
- **Stefania Boffa**, note del corso di probabilità dell’Università dell’Insubria: l’enunciato del teorema e l’esercizio delle lampadine.
- **Online Statistics Education**, Rice University, [simulatore della distribuzione campionaria](https://onlinestatbook.com/stat_sim/sampling_dist/), da cui viene l’esempio della popolazione con due gobbe.
- **Abraham De Moivre**, *The Doctrine of Chances*, 3ª ed., Londra, A. Millar, 1756, pp. 242–249: «il problema più difficile» (p. 242), il metodo del 12 novembre 1733 (pp. 243–245), i 3600 lanci e 0,682688 (p. 246), «nemmeno alla 100ª» (p. 247), 0,95428 e il «modulo» (p. 248). [Scansione su Internet Archive](https://archive.org/details/doctrineofchance00moiv). Biografia su [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/De_Moivre/).
- **Pierre-Simon Laplace**, «Mémoire sur les approximations des formules qui sont fonctions de très grands nombres, et sur leur application aux probabilités», *Mémoires de la classe des sciences mathématiques et physiques de l’Institut de France*, année 1809 (pubblicato nel 1810), con un supplemento nello stesso volume; [testo della memoria](https://gtfp.cs.rhul.ac.uk/pulskamp/Laplace/approximations%20of%20formulas%201809.pdf) nella raccolta di fonti di Richard J. Pulskamp. Biografia su [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Laplace/).
- **Francis Galton**, *Natural Inheritance*, Londra, Macmillan, 1889, cap. V, p. 66 («Order in Apparent Chaos»). [Testo su galton.org](https://galton.org/books/natural-inheritance/).
- **George Pólya**, «Über den zentralen Grenzwertsatz der Wahrscheinlichkeitsrechnung und das Momentenproblem», *Mathematische Zeitschrift* 8 (1920), pp. 171–181: il nome del teorema.
- **Jeffrey Dean e Luiz André Barroso**, «The Tail at Scale», *Communications of the ACM* 56 (2013), n. 2, pp. 74–80: le code dei tempi di risposta nei sistemi che interrogano molti server in parallelo. [Articolo](https://doi.org/10.1145/2408776.2408794).
- Documentazione Python: [`statistics.NormalDist`](https://docs.python.org/3/library/statistics.html#statistics.NormalDist), usata nei laboratori per $\Phi$ e per la sua inversa.

# PSI — Probabilità e Statistica

Dispense del corso di Probabilità e Statistica, Corso di Laurea in Informatica, Università degli Studi dell'Insubria (Varese).

Questo sito raccoglie in forma leggibile e stampabile il materiale didattico del corso, con l'aggiunta di **widget interattivi** (per esplorare come cambiano le curve di densità/probabilità al variare dei parametri) e di **blocchi di codice eseguibili** direttamente nel browser, per sperimentare mentre si legge.

Il materiale integra il patrimonio concettuale ed epistemologico dei grandi classici storici (Laplace, Bayes, Bernoulli, Gauss, Fisher, Jaynes) con i riferimenti contemporanei per l'informatica:

- D. Forsyth, *Probability for Computer Science*, Springer Nature, 2018
- C. Piech, *Probability for Computer Science* (CS109 Course Reader), Stanford, 2024
- M. Baron, *Probability and Statistics for Computer Scientists*, CRC Press, 2014

## Come usare questo sito

- **Naviga** i capitoli dal menu in alto: il percorso è articolato in 4 moduli tematici distribuiti su **12 settimane** (24 lezioni d'aula complessive), dai fondamenti epistemologici fino all'inferenza statistica e al Machine Learning.
- **Approfondimenti** (contrassegnati come tali) espandono un argomento con dettagli facoltativi; **esempi svolti** applicano la teoria a problemi concreti.
- **Widget interattivi**: dove vedi dei cursori sotto un grafico, trascinali per vedere come cambia la curva — è lo stesso identico grafico del testo, ma con i parametri nelle tue mani.
- **Codice eseguibile**: i blocchi di codice con il pulsante "▶ Esegui" girano Python vero nel tuo browser (nessuna installazione richiesta). Puoi modificare il codice prima di eseguirlo.
- **Stampa**: ogni pagina è pensata per essere stampata singolarmente (Ctrl/Cmd+P o pulsante "Scarica il PDF") — i controlli interattivi vengono nascosti automaticamente e sostituiti da un'istantanea statica dell'ultimo grafico esplorato. In fondo al menu trovi anche un'opzione per stampare l'intero corso in un unico documento.

## Il percorso in breve

Il percorso adotta una prospettiva storica ed epistemologica (*Erlebnis*, la dimensione dell'esperienza vissuta e del dramma conoscitivo), affiancando al rigore matematico lo sviluppo di un'unica grande unità concettuale per settimana, con lezioni dedicate all'intuizione, all'interazione con i widget e al laboratorio computazionale in Python.

### Modulo I — La genesi della certezza sfocata (Settimane 1–3)

| Settimana | Argomenti e dramma conoscitivo |
|---|---|
| **[0. Che senso ha essere qui?](0-senso.md)** & **[1. Che cos'è la probabilità?](settimana_01/index.md)** *(Settimana 1)* | **Giustificazione formativa e fondamenti:** l'attenzione come disciplina intellettuale (Weil, Lamport); il paradosso della moneta e del supercomputer; il contenitore vuoto di Kolmogorov; polo epistemico vs polo ontico, l'Optional Stopping di Alice e Bob e i criteri di Wesley Salmon. |
| **Settimana 2** *(in arrivo)* | **La sintassi di Kolmogorov e il Teorema di Bayes:** spazio campionario, assiomi, indipendenza stocastica, alberi di probabilità e il dramma dei falsi positivi nei sistemi software e negli IDS. |
| **Settimana 3** *(in arrivo)* | **Pascal, Fermat e le tabelle hash:** la corrispondenza del 1654 e il problema delle parti; combinatoria minima essenziale, paradosso dei compleanni e Birthday Attack in crittografia. |

### Modulo II — Quantificare il mondo discreto e continuo (Settimane 4–6)

| Settimana | Argomenti e dramma conoscitivo |
|---|---|
| **Settimana 4** *(in arrivo)* | **Huygens e il prezzo equo:** variabili aleatorie, valore atteso come baricentro razionale, la magia della linearità di Feller e applicazione alla complessità algoritmica. |
| **Settimana 5** *(in arrivo)* | **Bortkiewicz, Poisson e i filtri di Bloom:** la distribuzione Geometrica (assenza di memoria), Poisson e gli eventi rari nei registri militari prussiani; strutture dati probabilistiche nei sistemi distribuiti. |
| **Settimana 6** *(in arrivo)* | **Bertrand, Gauss e l'asteroide Cerere:** la crisi del continuo (paradosso di Bertrand), densità (PDF) vs CDF, la distribuzione esponenziale, la campana di Gauss e la scoperta di Cerere. |

### Modulo III — La macchina del mondo e i teoremi limite (Settimane 7–9)

| Settimana | Argomenti e dramma conoscitivo |
|---|---|
| **Settimana 7** *(in arrivo)* | **Il Quincunx di Galton e la correlazione:** distribuzioni congiunte e marginali, covarianza, correlazione di Pearson e il monito *"correlazione non implica causazione"*. |
| **Settimana 8** *(in arrivo)* | **La scuola russa e il Teorema del Limite Centrale:** disuguaglianze universali di Markov e Čebyšëv, Legge Debole dei Grandi Numeri e la convergenza universale del CLT. |
| **Settimana 9** *(in arrivo)* | **Dalla birreria Guinness a Stanford:** il ribaltamento verso l'inferenza statistica, campionamento, Gosset (Student) e la rivoluzione computazionale del Bootstrap di Efron. |

### Modulo IV — Dispute epistemologiche e Intelligenza Artificiale (Settimane 10–12)

| Settimana | Argomenti e dramma conoscitivo |
|---|---|
| **Settimana 10** *(in arrivo)* | **Ronald Fisher e la massima verosimiglianza (MLE):** la nascita del Machine Learning moderno; log-likelihood, derivazione analitica e il legame con la Binary Cross-Entropy e l'MSE. |
| **Settimana 11** *(in arrivo)* | **La guerra santa della statistica:** Fisher contro Neyman-Pearson; il vero significato del $p$-value contro le regole di decisione meccanica ($\alpha, \beta$); A/B testing industriale nel software. |
| **Settimana 12** *(in arrivo)* | **La riconciliazione di Jaynes e il silicio:** la probabilità come estensione della logica (E.T. Jaynes); il classificatore Naive Bayes con Laplace smoothing; laboratorio pratico e chiusura del cerchio. |

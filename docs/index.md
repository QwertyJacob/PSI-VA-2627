# PSI — Probabilità e Statistica

Dispense del corso di Probabilità e Statistica, Corso di Laurea in Informatica, Università degli Studi dell'Insubria (Varese).

Questo sito raccoglie in forma leggibile e stampabile il materiale didattico del corso, con l'aggiunta di **widget interattivi**  e di **blocchi di codice eseguibili** direttamente nel browser, per sperimentare mentre si legge.

Il materiale contiene adattamenti di testi classici e di testi contemporanei, in particolare:

- D. Forsyth, *Probability for Computer Science*, Springer Nature, 2018
- C. Piech, *Probability for Computer Science* (CS109 Course Reader), Stanford, 2024
- M. Baron, *Probability and Statistics for Computer Scientists*, CRC Press, 2014

## Come usare questo sito

- **Naviga** i capitoli dal menu in alto: il percorso è articolato in 4 moduli tematici distribuiti su **12 settimane** (24 lezioni d'aula complessive).
- **Approfondimenti** (contrassegnati come tali) espandono un argomento con dettagli facoltativi; **esempi svolti** applicano la teoria a problemi concreti.
- **Widget interattivi**: dove vedi dei cursori sotto un grafico, trascinali per vedere come cambia la curva — è lo stesso identico grafico del testo, ma con i parametri nelle tue mani.
- **Codice eseguibile**: i blocchi di codice con il pulsante "▶ Esegui" girano Python nel tuo browser (nessuna installazione richiesta). Puoi modificare il codice prima di eseguirlo.
- **Stampa**: ogni pagina è pensata per essere stampata singolarmente (Ctrl/Cmd+P o pulsante "Scarica il PDF") — i controlli interattivi vengono nascosti automaticamente e sostituiti da un'istantanea statica dell'ultimo grafico esplorato. In fondo al menu trovi anche un'opzione per stampare l'intero corso (quando ci sarà) in un unico documento.

## Il percorso in breve

Il percorso è articolato in 4 moduli tematici distribuiti su **12 settimane**, con lezioni dedicate ai fondamenti teorici, all'interazione con i widget e al laboratorio computazionale.

### Modulo I — Fondamenti e probabilità discreta (Settimane 1–3)

| Settimana | Argomenti |
|---|---|
| **[0. Che senso ha essere qui?](0-senso.md)** & **[1. Che cos'è la probabilità?](settimana_01/index.md)** *(Settimana 1)* | **Fondamenti, Sintassi di Kolmogorov e Resilienza:** il senso dello studio e il dibattito epistemologico; spazio campionario, diagrammi di Venn, leggi di De Morgan, assiomi di Kolmogorov e la conseguenza regina dell'unione; condizionamento come "zoom", regola del prodotto, indipendenza stocastica e affidabilità dei sistemi (ridondanza parallela vs catena in serie). |
| **[2. Dall'effetto alla causa: alberi e Teorema di Bayes](settimana_02/index.md)** *(Settimana 2)* | **Alberi di Probabilità e Teorema di Bayes:** alberi di probabilità, partizioni dello spazio campionario e legge della probabilità totale; Teorema di Bayes (prior, verosimiglianza, posterior) e il dramma del falso positivo nei sistemi software, nei test diagnostici e negli Intrusion Detection Systems (IDS). |
| **Settimana 3** *(in arrivo)* | **Calcolo combinatorio e collisioni:** permutazioni, disposizioni, combinazioni; il problema delle parti, paradosso dei compleanni e analisi delle collisioni nelle tabelle hash. |

### Modulo II — Variabili aleatorie discrete e continue (Settimane 4–6)

| Settimana | Argomenti |
|---|---|
| **Settimana 4** *(in arrivo)* | **Variabili aleatorie discrete e valore atteso:** variabili aleatorie discrete, funzione di massa di probabilità (PMF), valore atteso e linearità del valore atteso, distribuzione di Bernoulli e Binomiale, varianza; analisi del caso medio negli algoritmi. |
| **Settimana 5** *(in arrivo)* | **Distribuzioni discrete notevoli:** distribuzione Geometrica (tempo di attesa e assenza di memoria), distribuzione di Poisson (eventi rari e limite della binomiale); applicazioni ai sistemi distribuiti. |
| **Settimana 6** *(in arrivo)* | **Variabili aleatorie continue e distribuzione Normale:** densità di probabilità (PDF) e funzione di ripartizione (CDF), distribuzione uniforme ed esponenziale, distribuzione Normale (Gaussiana) e standardizzazione. |

### Modulo III — Distribuzioni congiunte, teoremi limite e campionamento (Settimane 7–10)

| Settimana | Argomenti |
|---|---|
| **Settimana 7** *(in arrivo)* | **Distribuzioni congiunte e correlazione:** variabili aleatorie congiunte e distribuzioni marginali, covarianza, coefficiente di correlazione (e perché correlazione non implica causazione). |
| **Settimana 8** *(in arrivo)* | **Disuguaglianze e Legge dei Grandi Numeri:** somma di variabili aleatorie indipendenti, disuguaglianze di Markov e Čebyšëv, convergenza in probabilità e Legge Debole dei Grandi Numeri. |
| **Settimana 9** *(in arrivo)* | **Il Teorema del Limite Centrale:** enunciato, cosa garantisce e cosa no, comportamento asintotico della media campionaria. |
| **Settimana 10** *(in arrivo)* | **Campionamento e introduzione all'inferenza:** campionamento statistico, stimatori puntuali e loro proprietà, errore standard, intervalli di confidenza e Bootstrap computazionale. |

### Modulo IV — Inferenza e Machine Learning (Settimane 11–12)

| Settimana | Argomenti |
|---|---|
| **Settimana 11** *(in arrivo)* | **Massima Verosimiglianza (MLE):** funzione di verosimiglianza e log-verosimiglianza, stima di massima verosimiglianza; legame con le funzioni di perdita nel Machine Learning. Ripasso generale. |
| **Settimana 12** *(in arrivo)* | **Inferenza bayesiana e Machine Learning:** il classificatore Naive Bayes con Laplace smoothing, cenni all'inferenza variazionale e sintesi finale del corso. |

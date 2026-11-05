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
- **Notebook Colab di anni passati**: per ogni settimana trovi anche dei notebook Colab scritti per le edizioni precedenti del corso, con altri esempi ed esercizi svolti. Possono aiutarti a studiare, ma non sostituiscono le dispense di quest'anno: li trovi, con le istruzioni per usarli, nella pagina [Notebook degli anni passati](notebook.md).
- **Stampa**: ogni pagina è pensata per essere stampata singolarmente (Ctrl/Cmd+P o pulsante "Scarica il PDF") — i controlli interattivi vengono nascosti automaticamente e sostituiti da un'istantanea statica dell'ultimo grafico esplorato. In fondo al menu trovi anche un'opzione per stampare l'intero corso (quando ci sarà) in un unico documento.

## Come studiare per l’esame {: #esame }

Gli argomenti indicati nelle dispense come **richiesti all’esame** vanno compresi e applicati anche quando sono affidati allo studio individuale. «Da leggere a casa» non significa «facoltativo»: per ogni parte trovi indicato che cosa devi saper spiegare o calcolare. Gli approfondimenti indicati come **facoltativi e non richiesti all’esame** restano disponibili per chi vuole esplorare il tema.

Il formulario fornito dal docente accompagna il calcolo: occorre saper scegliere la formula, spiegare i simboli e controllarne le ipotesi. Le dimostrazioni e i ragionamenti da ricostruire all’orale sono segnalati esplicitamente nelle singole dispense.

Script e widget servono a esplorare e verificare i concetti. **Non è richiesta la riproduzione del codice Python**; restano richiesti i ragionamenti probabilistici indicati nel percorso d’esame. Le fonti bibliografiche e i documenti storici sono letture facoltative: non occorre memorizzare date, citazioni o dettagli biografici.

Per ogni settimana, consulta le indicazioni in apertura delle dispense.

La sezione [Domande d'esame](domande-esame/index.md) raccoglie tutte le domande del primo round dell'orale, settimana per settimana e ciascuna con la sua risposta attesa. Più avanti vi arriveranno anche alcune domande tipo del secondo round.

## Il percorso in breve

Il percorso è articolato in 4 moduli tematici distribuiti su **12 settimane**, con lezioni dedicate ai fondamenti teorici, all'interazione con i widget e al laboratorio computazionale.

### Modulo I — Fondamenti e probabilità discreta (Settimane 1–3)

| Settimana | Argomenti |
|---|---|
| **[0. Che senso ha essere qui?](0-senso.md)** & **[1. Che cos'è la probabilità?](settimana_01/index.md)** *(Settimana 1)* | **Fondamenti, Sintassi di Kolmogorov e Resilienza:** il senso dello studio e il dibattito epistemologico; spazio campionario, diagrammi di Venn, leggi di De Morgan, assiomi di Kolmogorov e la conseguenza regina dell'unione; condizionamento come "zoom", regola del prodotto, indipendenza stocastica e affidabilità dei sistemi (ridondanza parallela vs catena in serie). |
| **[2. Dall'effetto alla causa: alberi e Teorema di Bayes](settimana_02/index.md)** *(Settimana 2)* | **Alberi di Probabilità e Teorema di Bayes:** alberi di probabilità, partizioni dello spazio campionario e legge della probabilità totale; Teorema di Bayes (probabilità a priori, verosimiglianza, probabilità a posteriori) e il dramma del falso positivo nei sistemi software, nei test diagnostici e negli Intrusion Detection Systems (IDS). |
| **[3. L'estate del 1654: Pascal, Fermat e le tabelle hash](settimana_03/index.md)** *(Settimana 3)* | **Calcolo combinatorio e collisioni:** permutazioni, disposizioni, combinazioni; il problema delle parti, paradosso dei compleanni e analisi delle collisioni nelle tabelle hash. |

### Modulo II — Variabili aleatorie discrete e continue (Settimane 4–6)

| Settimana | Argomenti |
|---|---|
| **[4. Huygens e il prezzo equo](settimana_04/index.md)** *(Settimana 4)* | **Variabili aleatorie discrete e valore atteso:** variabili aleatorie discrete, funzione di massa di probabilità (PMF), valore atteso e linearità del valore atteso, distribuzione di Bernoulli e distribuzione binomiale; analisi del caso medio negli algoritmi. |
| **[5. Bortkiewicz e i calci di cavallo](settimana_05/index.md)** *(bozza completa)* | **Varianza e distribuzioni discrete notevoli:** significato, definizione e calcolo della varianza; distribuzione Geometrica (tempo di attesa e assenza di memoria), distribuzione di Poisson (eventi rari e limite della distribuzione binomiale); applicazioni ai sistemi distribuiti. |
| **[6. Bertrand, Gauss e l'asteroide Cerere](settimana_06/index.md)** *(bozza completa)* | **Variabili aleatorie continue e distribuzione normale:** densità di probabilità (PDF) e funzione di ripartizione (CDF), distribuzione uniforme, distribuzione esponenziale e assenza di memoria, distribuzione normale (gaussiana), standardizzazione, tabella Z e regola 68–95–99,7. |

### Modulo III — Distribuzioni congiunte, teoremi limite e campionamento (Settimane 7–10)

| Settimana | Argomenti |
|---|---|
| **[7. Galton e le altezze di genitori e figli](settimana_07/index.md)** *(bozza completa)* | **Distribuzioni congiunte e correlazione:** distribuzione congiunta di due variabili discrete e distribuzioni marginali, variabili aleatorie indipendenti, covarianza e coefficiente di correlazione; incorrelazione e indipendenza, correlazione e causazione. |
| **[8. La scuola di San Pietroburgo](settimana_08/index.md)** *(bozza completa)* | **Disuguaglianze e legge dei grandi numeri:** disuguaglianze di Markov e di Čebyšëv come garanzie valide per ogni distribuzione; varianza della somma di variabili indipendenti, media campionaria e legge della radice quadrata; convergenza in probabilità e legge (debole) dei grandi numeri, frequenze e teorema di Bernoulli; garanzie nei sistemi informatici e metodo Monte Carlo. |
| **Settimana 9** *(in arrivo)* | **Il Teorema del Limite Centrale:** enunciato, cosa garantisce e cosa no, comportamento asintotico della media campionaria. |
| **Settimana 10** *(in arrivo)* | **Campionamento e introduzione all'inferenza:** campionamento statistico, stimatori puntuali e loro proprietà, errore standard, intervalli di confidenza e Bootstrap computazionale. |

### Modulo IV — Inferenza e Machine Learning (Settimane 11–12)

| Settimana | Argomenti |
|---|---|
| **Settimana 11** *(in arrivo)* | **Massima Verosimiglianza (MLE):** funzione di verosimiglianza e log-verosimiglianza, stima di massima verosimiglianza; legame con le funzioni di perdita nel Machine Learning. Ripasso generale. |
| **Settimana 12** *(in arrivo)* | **Inferenza bayesiana e Machine Learning:** il classificatore Naive Bayes con Laplace smoothing, cenni all'inferenza variazionale e sintesi finale del corso. |

### Approfondimento facoltativo

Per chi è interessato, [La probabilità al lavoro](probabilita-al-lavoro/index.md) raccoglie cinque casi documentati — esperimenti A/B, classificazione dei testi, DNA, ricerca in mare e affidabilità — e mostra quali modelli delle Settimane 2–6 entrano in gioco. Non contiene argomenti nuovi e non è richiesta all'esame.

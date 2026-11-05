---
description: Le otto domande del primo round dell'esame orale sulla Settimana 2, ciascuna con le idee che una risposta corretta deve contenere.
---

[:material-book-open-variant: Apri la dispensa della Settimana 2](../../settimana_02/index.md){ .md-button }

# Settimana 2 — Domande d'esame del primo round

Questa pagina raccoglie le otto domande del primo round dell'esame orale che riguardano la [Settimana 2](../../settimana_02/index.md). Sono domande sui fondamenti: definizioni, distinzioni, ragionamenti da ricostruire e qualche piccolo calcolo. All'esame hai 30 secondi per leggere la domanda con calma, e poi un minuto e mezzo per rispondere a voce. Gli argomenti sono quelli indicati nel [perimetro d'esame](../../settimana_02/index.md#esame) all'inizio della dispensa.

!!! info "Che cosa significa «risposta attesa»"
    Sotto ogni domanda trovi la risposta attesa. «Attesa» non significa che devi rispondere esattamente con quelle parole, né nello stesso ordine. Significa che una risposta corretta contiene quelle idee principali, perché sono loro a sostenerla. Puoi usare parole tue, un esempio diverso o un altro ordine: conta che le idee ci siano e che siano giuste.

Per studiare conviene provare prima a rispondere da soli, a voce e senza guardare, come si farebbe all'esame. Solo dopo si apre la risposta attesa e si controlla quali idee mancavano. Per questo le risposte sono chiuse: si aprono con un clic sul titolo.

La sezione [Domande d'esame](../index.md) raccoglie anche le domande delle altre settimane e spiega come è fatto il secondo round.

Ogni domanda ha un codice. Per esempio, S2-R1-07 indica la settimana 2, il primo round e la domanda numero 7.

## Le domande

### S2-R1-01 · Partizione {: #s2-r1-01 }

Che cos'è una partizione dello spazio campionario? Fai un esempio informatico.

??? success "Risposta attesa"
    È una famiglia di eventi $H_1,\dots,H_k$ con tre proprietà. Primo, gli eventi sono a due a due incompatibili: $H_i\cap H_j=\emptyset$ per $i\neq j$, cioè due eventi diversi della famiglia non possono accadere insieme. Secondo, sono esaustivi: $H_1\cup\dots\cup H_k=\Omega$, cioè almeno uno di essi accade sempre. Le prime due proprietà, insieme, dicono che accade sempre uno e un solo $H_i$. Terzo, ogni $H_i$ ha probabilità positiva. Questa condizione serve perché nella probabilità totale e nel teorema di Bayes si usa $P(E\mid H_i)=P(E\cap H_i)/P(H_i)$, e non si può dividere per zero. Esempio: un bug può trovarsi nel frontend, nel backend o nel database, e in uno solo di questi tre.

### S2-R1-02 · Le regole dell'albero {: #s2-r1-02 }

Quali regole segue un albero di probabilità? Quali controlli fai sempre?

??? success "Risposta attesa"
    I rami che escono da un nodo formano una partizione di quel nodo. Su ogni ramo si scrive la probabilità condizionata al cammino che porta a quel nodo. La probabilità di una foglia è il prodotto delle probabilità lungo il cammino, e la probabilità di un evento è la somma delle sue foglie. Si controlla che i rami di ogni nodo sommino a 1, e che sommino a 1 anche tutte le foglie.

### S2-R1-03 · Bayes dalla regola del prodotto {: #s2-r1-03 }

Ricava il teorema di Bayes.

??? success "Risposta attesa"
    Con la regola del prodotto, la probabilità di $H\cap E$ si scrive in due modi: $P(H)\,P(E\mid H)$ oppure $P(E)\,P(H\mid E)$. Uguagliandoli e dividendo per $P(E)$ si ottiene $P(H\mid E)=P(E\mid H)\,P(H)/P(E)$. Il denominatore $P(E)$ si calcola con la probabilità totale.

### S2-R1-04 · Il vocabolario dell'inferenza {: #s2-r1-04 }

Che cosa sono la probabilità a priori, la verosimiglianza, l'evidenza e la probabilità a posteriori? Usa l'esempio di un allarme di sicurezza.

??? success "Risposta attesa"
    Chiamiamo $H$ l'ipotesi «è in corso un'intrusione» ed $E$ l'evidenza «suona l'allarme». La probabilità a priori $P(H)$ è la probabilità dell'intrusione prima di sapere dell'allarme. La verosimiglianza $P(E\mid H)$ dice quanto è probabile che l'allarme suoni se l'intrusione c'è davvero. L'evidenza $P(E)$ è la probabilità complessiva che l'allarme suoni, con o senza intrusione. La probabilità a posteriori $P(H\mid E)$ è la probabilità dell'intrusione dopo aver sentito l'allarme.

### S2-R1-05 · $P(E\mid H)$ e $P(H\mid E)$ {: #s2-r1-05 }

Spiega con un esempio la differenza tra $P(E\mid H)$ e $P(H\mid E)$.

??? success "Risposta attesa"
    Un esempio è un antivirus che controlla dei file. Chiamiamo $H$ l'ipotesi «il file è malevolo» ed $E$ l'evidenza «l'antivirus segnala il file». $P(E\mid H)$ è la probabilità che un file malevolo venga segnalato, e si calcola considerando solo i file malevoli. $P(H\mid E)$ è la probabilità che un file segnalato sia malevolo, e si calcola considerando solo i file segnalati. Le due probabilità sono quindi percentuali calcolate su gruppi diversi: i due numeri possono essere molto diversi, e scambiarli è un errore frequente.

### S2-R1-06 · Tre lanci con l'albero {: #s2-r1-06 }

Con un albero, calcola la probabilità di ottenere esattamente due teste in tre lanci di una moneta equa.

??? success "Risposta attesa"
    L'albero ha 8 foglie, e ognuna ha probabilità 1/2 · 1/2 · 1/2 = 1/8. Le foglie con esattamente due teste sono tre: $TTC$, $TCT$ e $CTT$. La probabilità è 3/8.

### S2-R1-07 · Probabilità a priori zero {: #s2-r1-07 }

Un'ipotesi ha probabilità a priori zero. Quanto vale la sua probabilità a posteriori, qualunque evidenza si osservi? Che cosa ne segue per la scelta delle probabilità a priori?

??? success "Risposta attesa"
    Vale zero. Nel teorema di Bayes il numeratore è il prodotto di verosimiglianza e probabilità a priori: se la probabilità a priori è zero, anche il numeratore è zero, qualunque sia la verosimiglianza. Un'ipotesi a cui si è dato probabilità zero in partenza non può più essere riscoperta da nessun dato. Per questo, in pratica, non si assegna mai probabilità esattamente zero a un'ipotesi che si vuole poter scoprire.

### S2-R1-08 · L'albero e l'indipendenza {: #s2-r1-08 }

Un albero di probabilità presuppone che gli eventi siano indipendenti? Guardando i numeri sui rami, come si vede se due eventi sono indipendenti?

??? success "Risposta attesa"
    No. Sui rami si scrivono probabilità condizionate, che possono cambiare da un ramo all'altro. Se gli eventi sono indipendenti, sui rami di secondo livello si ripetono gli stessi numeri in ogni sottoalbero: nell'albero dei lanci di una moneta ogni ramo porta 1/2, perché sapere com'è andato il primo lancio non cambia le probabilità del secondo. Se gli eventi dipendono l'uno dall'altro, i numeri sui rami cambiano da un sottoalbero all'altro. Per esempio, un controllo di design può essere superato con probabilità 0,8 se i materiali erano buoni e con probabilità 0,4 se non lo erano.

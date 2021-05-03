# Money tracking app

## Introduzione

Questa piattaforma fa parte del progetto del corso "Front End Developer 2021: tutto quello che non sai", pubblicato
all'interno della pagina https://www.frontendpills.it/corso-front-end-developer-2021.

L'obiettivo è quello di creare un portafoglio virtuale con il quale l'utente può registrare entrate e uscite.

## Requisiti

- NodeJS: >= v.14.15
- NPM: >= v.6.14

## Come avviare il progetto

Per avviare il progetto si necessiterà per prima cosa scaricare il codice.

Dopo verrà eseguito il seguente comando per installare le dipendenze:``` npm install ```.

Una volta che le dipendenze sono state correttamente installate, si dovrà avviare il server in locale con il comando: ``` npm start-server ```.

Completata anche questa operazione, si potrà avviare la piattaforma secondo tre modalità:
- Sviluppo: ``` npm run dev ```
- Produzione con debug: ``` npm run prod:debug ```
- Produzione: ``` npm run prod ```

Le prime due permettono di avviare anche un server lato cliente che caricherà il bundle del Front End. Nel secondo caso però il codice viene minificato e offuscato.

Per quanto riguarda il bundle di produzione invece, verrà semplicemente creato il pacchetto finale.

## Testing

Si possono eseguire due tipi di test: unitari e e2e. Entrambi attraverso Jest.

I comandi disponibili sono:
- Test unitari: ``` npm run test:unit ```
- Test e2e: ``` npm run test:e2e ```
- Entrambi: ``` npm run test ```

## Screenshot della piattaforma

Homepage:
![Homepage](screenshots/home.png)

Popup:
![Modal add operation](screenshots/popup.png)

No operations:
![No operations table](screenshots/home-no-operations.png)

## Troubleshooting

In caso di dubbi o problemi contattare la piattaforma https://www.frontendpills.it.
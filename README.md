# Brukerveiledning

## Installasjon og Oppsett

For å kjøre prosjektet må du først laste det ned fra [GitHub](https://github.com/Flowerafro/PLB-contractFlow) eller direkte fra innleveringen. Åpne deretter prosjektet i et utviklingsmiljø. Vi anbefaler VSCode, da dette er det miljøet vi har gjort mesteparten av testingen i.

Sørg for at du har installert PNPM package manageren, som brukes til å kjøre alle nødvendige kommandoer. Kjør følgende kommandoer i rekkefølge:

### 1. Installer avhengigheter
```bash
pnpm install
```
Installerer alle avhengighetene basert på `package.json` filen i rotmappen.

### 2. Sett opp lokal database
```bash
pnpm run local:migrate
```
Setter opp den lokale D1 databasen. Du vil bli bedt om å "continue" i terminalen siden databasen blir utilgjengelig under migrering. Svar ja (trykk "y").

> **Merk**: Ved deployment bruker prosjektet en D1 database hostet i Cloudflare.

### 3. Fyll databasen med testdata
```bash
pnpm run local:seed
```
Fyller D1 databasen med dummy-data som kan utforskes i applikasjonen.

### 4. Bygg prosjektet
```bash
pnpm run build
```
Bygger den lokale instansen av prosjektet.

### 5. Kjør applikasjonen
```bash
pnpm run local:dev
```
Starter applikasjonen lokalt. Du vil få en adresse i terminalen som kan kopieres direkte inn i et nettleservindu for å åpne applikasjonen.

## Innlogging

Når applikasjonen kjører, kommer du til en login-side. Bruk følgende credentials:

- **Brukernavn**: `admin`
- **Passord**: `admin`

> **Merk**: Disse credentials vil bli byttet ved faktisk deployment for PLB.

## Navigasjon

Etter innlogging kommer du til `/Home`-routen, hvor du ser en tabellvisning av data hentet fra D1 databasen. Nederst på siden kan du bla gjennom sider i tabellvisningen og endre hvor mange forsendinger som vises per side (standard: 10).

Øverst på siden finner du et søkefelt for å søke i dataene. Øverst til høyre er det en hamburger-meny for navigasjon mellom ulike funksjoner og sider:

### Dashboard
Navigerer tilbake til startsiden. Her vises alle forsendingene som er lagt inn i databasen. Klikk på en forsendelse for å se detaljvisning.

- Detaljvisningen har påbegynt funksjonalitet for å endre data direkte i tabellen (ikke ferdigstilt)
- Søkefelt er deaktivert i detaljvisningen

### Søkefunksjon
- Søk etter forsendelser i Dashboard
- Søk etter klienter/kunder i Clients

### Add Contract
Opprett nye kontrakter i databasen. Kontrakter kan kobles direkte til eksisterende kunder. Når feltene er fylt ut, får du automatisk bekreftelse.

Lagrede kontrakter vises i Dashboard. De kan se tomme ut, men dette er bevisst: PLB ba om at kun dataene fra "Add Contract"-siden skulle legges inn først. Øvrige kontraktdata kan legges til senere i Dashboard etterhvert som PLB får tilgang til dem.

### Tables
En mer sortert tabell over forsendinger, filtrert basert på kunder. Denne er ment å være mer ekstensiv.

### Archive
En fillagringsløsning hvor du kan laste opp Word, PDF eller Excel-filer. Filene lagres i R2-databasen for senere nedlasting. I det lokale utviklingsmiljøet er denne tabellen tom til å begynne med.

**Test filopplasting:**
1. I prosjektets vedleggsmappe ligger filen `ShippingDoc`
2. Dra denne til drop-sonen på siden
3. Refresh siden
4. Filen skal nå vises i tabellen over opplastede filer

### Clients
Viser alle klienter/kunder som ligger i D1 databasen.

- Klikk på en rad for detaljvisning av kunde
- Klikk på "+ New Client" for å åpne et skjema som genererer ny klient
- Data sendes til D1 databasen
- Trykk Enter for å lagre
- Du blir tatt til detaljvisning av den nye klienten
- Gå tilbake til Clients-siden for å se den nye klienten i tabellen

### Log Out
Logger deg ut og tar deg tilbake til Login-siden. Access-cookien som brukes for tilgangskontroll slettes, slik at man ikke kan gå direkte forbi login-siden uten å oppgi godkjente credentials.
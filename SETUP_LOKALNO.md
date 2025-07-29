# Pokretanje Virtuelne Ture kroz Niš - Lokalno na VS Code

## Potrebni preduslovi

1. **Node.js** (verzija 18 ili novija)
   - Preuzmite sa: https://nodejs.org/
   - Proverite: `node --version`

2. **PostgreSQL baza podataka**
   - Opcija 1: Lokalna instalacija PostgreSQL
   - Opcija 2: Neon.tech besplatni nalog
   - Opcija 3: Supabase besplatni nalog

## Korak 1: Instaliranje paketa

```bash
npm install
```

## Korak 2: Podešavanje baze podataka

### Opcija A: Neon.tech (preporučeno)
1. Idite na https://neon.tech/
2. Napravite besplatan nalog
3. Kreirajte novu bazu podataka
4. Kopirajte DATABASE_URL

### Opcija B: Lokalna PostgreSQL
1. Instalirajte PostgreSQL na vašem računaru
2. Kreirajte novu bazu podataka: `createdb virtuelni_nis`
3. DATABASE_URL će biti: `postgresql://username:password@localhost:5432/virtuelni_nis`

## Korak 3: Kreiranje .env fajla

Kreirajte `.env` fajl u root direktorijumu:

```env
DATABASE_URL="postgresql://your_username:your_password@your_host/your_database"
NODE_ENV=development
```

## Korak 4: Kreiranje tabela u bazi

```bash
npm run db:push
```

## Korak 5: Pokretanje aplikacije

### Za development (preporučeno):
```bash
dev.bat          # Windows
npm run dev      # Mac/Linux
```

### Za production:
```bash
npm run build    # Prvo napravite build
start.bat        # Windows production
npm start        # Mac/Linux production
```

Aplikacija će biti dostupna na: http://localhost:5000

### Brži setup za Windows korisnike:
Pokrenite `setup.bat` - automatski će instalirati pakete i kreirati .env fajl!

## Česti problemi i rešenja

### "DATABASE_URL must be set" greška:
1. Proverite da .env fajl postoji u root direktorijumu
2. Proverite da DATABASE_URL nije prazan u .env fajlu
3. Za development koristite `dev.bat` umesto `npm start`

## Struktura projekta

```
├── client/          # React frontend
├── server/          # Express.js backend  
├── shared/          # Deljeni tipovi
├── components.json  # shadcn/ui konfiguracija
└── package.json     # Dependencije
```

## Česti problemi

### Problem: "Cannot find module"
**Rešenje:** Pokrenite `npm install` ponovo

### Problem: Database connection error ili WebSocket greške
**Rešenje:** 
1. Proverite DATABASE_URL u .env fajlu
2. Za lokalne PostgreSQL baze koristite format: `postgresql://username:password@localhost:5432/database_name`
3. Za Neon.tech koristite puni connection string iz dashboard-a

### Problem: Port already in use
**Rešenje:** Promenite port u server/index.ts ili zaustavite drugi proces

### Problem: WebSocket ECONNREFUSED greške
**Rešenje:** 
1. Proverite da li imate ispravku DATABASE_URL format za lokalnu bazu
2. Ako koristite Neon.tech, probajte sa drugim connection string-om
3. Za lokalne baze, napravite bazu prvo: `createdb virtuelni_nis`

## Dodatne komande

- `npm run build` - Pravi production build
- `npm start` - Pokreće production verziju
- `npm run db:push` - Ažurira bazu podataka

## Git Sinhronizacija (preporučeno)

Umesto download/upload procesa, koristite Git za brže ažuriranje:

- `pull.bat` - Preuzima najnovije izmene sa Replit-a
- `sync.bat` - Šalje vaše izmene nazad
- Pročitajte `GIT_SYNC.md` za detaljne instrukcije

## Testiranje

Otvorite http://localhost:5000 u browseru i trebalo bi da vidite:
- Listu biznisa iz Niša
- Pretraživanje po nazivu
- Filtriranje po kategorijama
- 360° panorame kada kliknete na biznis
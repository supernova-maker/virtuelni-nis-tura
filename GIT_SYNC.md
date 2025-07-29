# Git Sinhronizacija - Lakši način ažuriranja fajlova

## Postavka (jednom)

### 1. Kreirajte GitHub repository
1. Idite na https://github.com/
2. Kliknite "New repository"
3. Nazovite ga npr. "virtuelni-nis-tura"
4. Postavite na "Public" ili "Private"
5. Kliknite "Create repository"

### 2. Povezivanje sa vašim lokalnim projektom
Otvorite terminal u VS Code u root direktorijumu projekta:

```bash
git init
git add .
git commit -m "Initial commit - Virtuelna tura kroz Niš"
git branch -M main
git remote add origin https://github.com/VASE_KORISNICKO_IME/virtuelni-nis-tura.git
git push -u origin main
```

## Dnevno korišćenje

### Kada hoćete da preuzmete najnovije izmene sa Replit-a:

**Na Replit (ovde gde radim):**
```bash
git add .
git commit -m "Dodane nove funkcionalnosti"
git push origin main
```

**U vašem VS Code:**
```bash
git pull origin main
```

### Kada hoćete da podelite vaše lokalne izmene:

**U vašem VS Code:**
```bash
git add .
git commit -m "Vaša poruka o izmenama"
git push origin main
```

**Na Replit:**
```bash
git pull origin main
```

## Prednosti Git pristupa:

✅ **Brže** - samo `git pull` umesto download/upload
✅ **Sigurnije** - čuva istoriju svih izmena
✅ **Pametnije** - spaja izmene automatski
✅ **Profesionalnije** - standardan način rada u razvoju
✅ **Backup** - vaš kod je sigurno sačuvan na GitHub-u

## Alternativa - GitHub Desktop (lakše za početnike)

1. Preuzmite GitHub Desktop: https://desktop.github.com/
2. Klonirajte repository kroz GUI
3. Koristite "Fetch origin" dugme za preuzimanje izmena
4. Koristite "Commit" i "Push" dugmićce za slanje izmena

## Prvi put setup sa GitHub Desktop:
1. Kreirajte repo na GitHub-u
2. U GitHub Desktop: File → Clone repository
3. Izaberite vaš repo i lokaciju na disk-u
4. Kopirajte fajlove u tu folder
5. Commit → Push

Ovaj način je **10x brži** od download/upload procesa!
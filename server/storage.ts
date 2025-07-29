import { businesses, panoramas, type Business, type Panorama, type InsertBusiness, type InsertPanorama } from '@shared/schema';
import { db } from './db';
import { eq } from 'drizzle-orm';

export interface IStorage {
  init(): Promise<void>;
  getAllBusinesses(): Promise<Business[]>;
  getBusinessById(id: string): Promise<Business | undefined>;
  createBusiness(business: InsertBusiness): Promise<Business>;
  getAllPanoramas(): Promise<Panorama[]>;
  getPanoramaById(id: string): Promise<Panorama | undefined>;
  createPanorama(panorama: InsertPanorama): Promise<Panorama>;
}

export class DatabaseStorage implements IStorage {
  async init(): Promise<void> {
    // Seed sample data if tables are empty
    const existingBusinesses = await db.select().from(businesses).limit(1);
    
    if (existingBusinesses.length === 0) {
      await this.seedData();
    }
  }

  async getAllBusinesses(): Promise<Business[]> {
    return await db.select().from(businesses).orderBy(businesses.createdAt);
  }

  async getBusinessById(id: string): Promise<Business | undefined> {
    const [business] = await db.select().from(businesses).where(eq(businesses.id, id));
    return business || undefined;
  }

  async createBusiness(insertBusiness: InsertBusiness): Promise<Business> {
    const [business] = await db
      .insert(businesses)
      .values(insertBusiness)
      .returning();
    return business;
  }

  async getAllPanoramas(): Promise<Panorama[]> {
    return await db.select().from(panoramas).orderBy(panoramas.createdAt);
  }

  async getPanoramaById(id: string): Promise<Panorama | undefined> {
    const [panorama] = await db.select().from(panoramas).where(eq(panoramas.id, id));
    return panorama || undefined;
  }

  async createPanorama(insertPanorama: InsertPanorama): Promise<Panorama> {
    const [panorama] = await db
      .insert(panoramas)
      .values(insertPanorama)
      .returning();
    return panorama;
  }

  private async seedData() {
    // Sample businesses in Niš
    const sampleBusinesses: InsertBusiness[] = [
      {
        naziv: "Kafana Stara Srbija",
        opis: "Tradicionalna srpska kafana sa autentičnom atmosferom i domaćom kuhinjom",
        adresa: "Obrenovićeva 25, Niš",
        telefon: "018/250-123",
        website: "https://kafana-stara-srbija.rs",
        email: "info@kafana-stara-srbija.rs",
        kategorija: "Restoran",
        ocena: 4.5,
        latituda: 43.3209,
        longituda: 21.8958,
        panoramaUrl: "https://i.imgur.com/panorama1.jpg",
        slike: ["https://i.imgur.com/kafana1.jpg", "https://i.imgur.com/kafana2.jpg"],
        radnoVreme: {
          ponedeljak: "10:00-24:00",
          utorak: "10:00-24:00", 
          sreda: "10:00-24:00",
          četvrtak: "10:00-24:00",
          petak: "10:00-01:00",
          subota: "10:00-01:00",
          nedelja: "12:00-24:00"
        },
        socialMediaLinks: {
          facebook: "https://facebook.com/kafana-stara-srbija",
          instagram: "https://instagram.com/kafana_stara_srbija"
        },
        onlineNarudzbina: "https://delivery.kafana-stara-srbija.rs"
      },
      {
        naziv: "Boutique Vila",
        opis: "Ekskluzivna modna butik sa najnovijim trendovima u modi",
        adresa: "Vožda Karađorđa 12, Niš",
        telefon: "018/345-678",
        website: "https://boutique-vila.com",
        email: "shop@boutique-vila.com",
        kategorija: "Moda",
        ocena: 4.2,
        latituda: 43.3243,
        longituda: 21.8967,
        panoramaUrl: "https://i.imgur.com/panorama2.jpg",
        slike: ["https://i.imgur.com/boutique1.jpg"],
        radnoVreme: {
          ponedeljak: "09:00-20:00",
          utorak: "09:00-20:00",
          sreda: "09:00-20:00", 
          četvrtak: "09:00-20:00",
          petak: "09:00-21:00",
          subota: "09:00-21:00",
          nedelja: "Zatvoreno"
        },
        socialMediaLinks: {
          facebook: "https://facebook.com/boutique-vila",
          instagram: "https://instagram.com/boutique_vila"
        }
      },
      {
        naziv: "Niška Pivnica",
        opis: "Tradicionalna pivnica sa širokim izborom domaćih i uvoznih piva",
        adresa: "Kralja Milana 45, Niš", 
        telefon: "018/567-890",
        website: "https://niska-pivnica.rs",
        email: "info@niska-pivnica.rs",
        kategorija: "Bar",
        ocena: 4.7,
        latituda: 43.3189,
        longituda: 21.8976,
        panoramaUrl: "https://i.imgur.com/panorama3.jpg",
        slike: ["https://i.imgur.com/pivnica1.jpg", "https://i.imgur.com/pivnica2.jpg"],
        radnoVreme: {
          ponedeljak: "16:00-01:00",
          utorak: "16:00-01:00",
          sreda: "16:00-01:00",
          četvrtak: "16:00-02:00", 
          petak: "16:00-03:00",
          subota: "14:00-03:00",
          nedelja: "14:00-24:00"
        },
        socialMediaLinks: {
          facebook: "https://facebook.com/niska-pivnica",
          instagram: "https://instagram.com/niska_pivnica"
        }
      },
      {
        naziv: "Tech Store Niš",
        opis: "Najnovija tehnologija, računari, telefoni i elektronska oprema",
        adresa: "Dimitrija Tucovića 15, Niš",
        telefon: "018/789-012",
        website: "https://techstore-nis.com",
        email: "prodaja@techstore-nis.com", 
        kategorija: "Tehnologija",
        ocena: 4.1,
        latituda: 43.3167,
        longituda: 21.8943,
        panoramaUrl: "https://i.imgur.com/panorama4.jpg",
        slike: ["https://i.imgur.com/tech1.jpg"],
        radnoVreme: {
          ponedeljak: "08:00-20:00",
          utorak: "08:00-20:00",
          sreda: "08:00-20:00",
          četvrtak: "08:00-20:00",
          petak: "08:00-20:00", 
          subota: "09:00-18:00",
          nedelja: "10:00-16:00"
        },
        socialMediaLinks: {
          facebook: "https://facebook.com/techstore-nis"
        },
        onlineNarudzbina: "https://shop.techstore-nis.com"
      },
      {
        naziv: "Wellness Centar Relax",
        opis: "Spa, masaže, kozmetički tretmani i wellness usluge",
        adresa: "Sinđelićeva 33, Niš",
        telefon: "018/345-567",
        website: "https://wellness-relax.rs",
        email: "rezervacije@wellness-relax.rs",
        kategorija: "Zdravlje i lepota",
        ocena: 4.8,
        latituda: 43.3234,
        longituda: 21.8912,
        panoramaUrl: "https://i.imgur.com/panorama5.jpg",
        slike: ["https://i.imgur.com/spa1.jpg", "https://i.imgur.com/spa2.jpg"],
        radnoVreme: {
          ponedeljak: "09:00-21:00",
          utorak: "09:00-21:00",
          sreda: "09:00-21:00",
          četvrtak: "09:00-21:00",
          petak: "09:00-22:00",
          subota: "10:00-22:00", 
          nedelja: "10:00-20:00"
        },
        socialMediaLinks: {
          facebook: "https://facebook.com/wellness-relax",
          instagram: "https://instagram.com/wellness_relax"
        }
      },
      {
        naziv: "Knjižara Akademska",
        opis: "Najveći izbor knjiga, udžbenika i školskog pribora u Nišu",
        adresa: "Vojvode Mišića 8, Niš",
        telefon: "018/456-789",
        website: "https://knjizara-akademska.rs",
        email: "info@knjizara-akademska.rs",
        kategorija: "Književnost",
        ocena: 4.3,
        latituda: 43.3201,
        longituda: 21.8934,
        panoramaUrl: "https://i.imgur.com/panorama6.jpg",
        slike: ["https://i.imgur.com/knjizara1.jpg"],
        radnoVreme: {
          ponedeljak: "08:00-20:00",
          utorak: "08:00-20:00",
          sreda: "08:00-20:00",
          četvrtak: "08:00-20:00",
          petak: "08:00-20:00",
          subota: "09:00-18:00",
          nedelja: "10:00-16:00"
        },
        socialMediaLinks: {
          facebook: "https://facebook.com/knjizara-akademska"
        },
        onlineNarudzbina: "https://shop.knjizara-akademska.rs"
      }
    ];

    // Insert sample businesses
    for (const business of sampleBusinesses) {
      await db.insert(businesses).values(business);
    }

    // Sample panoramas
    const samplePanoramas: InsertPanorama[] = [
      {
        naziv: "Trg Kralja Milana",
        opis: "Centralni gradski trg sa fontanom i istorijskim zgradama",
        url: "https://i.imgur.com/trg-panorama.jpg",
        tip: "landmark",
        lokacija: "Centar Niša",
        latituda: 43.3209,
        longituda: 21.8958,
        hotspots: [
          {
            pozicija: { x: 0.2, y: 0.1, z: -0.8 },
            tekst: "Narodno pozorište",
            tip: "info"
          }
        ],
        javno: 1,
        brojPogleda: 0,
        tagovi: ["centar", "trg", "istorija"]
      }
    ];

    // Insert sample panoramas
    for (const panorama of samplePanoramas) {
      await db.insert(panoramas).values(panorama);
    }
  }
}

export const storage = new DatabaseStorage();
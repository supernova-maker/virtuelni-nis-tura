import { businesses, panoramas, type Business, type InsertBusiness, type Panorama, type InsertPanorama } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // Business methods
  getBusinesses(): Promise<Business[]>;
  getBusinessesByCategory(category: string): Promise<Business[]>;
  getBusiness(id: string): Promise<Business | undefined>;
  createBusiness(business: InsertBusiness): Promise<Business>;
  searchBusinesses(query: string): Promise<Business[]>;
  
  // Panorama methods
  getPanoramas(): Promise<Panorama[]>;
  getPanorama(id: string): Promise<Panorama | undefined>;
  createPanorama(panorama: InsertPanorama): Promise<Panorama>;
}

export class MemStorage implements IStorage {
  private businesses: Map<string, Business>;
  private panoramas: Map<string, Panorama>;

  constructor() {
    this.businesses = new Map();
    this.panoramas = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample businesses for Niš
    const sampleBusinesses: InsertBusiness[] = [
      {
        name: 'Restoran "Stara Srbija"',
        category: "Ugostiteljstvo",
        description: "Autentična srpska kuhinja u srcu Niša. Specijalizovani smo za roštilj i tradicionalna jela pripremljena po starim receptima.",
        address: "Obrenovićeva 25",
        phone: "018/123-456",
        hours: "09:00 - 23:00",
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        panoramaUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=960",
        latitude: 43.3209,
        longitude: 21.8958,
      },
      {
        name: 'Cafe "Central"',
        category: "Ugostiteljstvo",
        description: "Moderni kafe u centru grada sa širokim izborom kafe i domaćih kolača. WiFi i ugodan ambijent za rad.",
        address: "Knez Mihailova 12",
        phone: "018/789-012",
        hours: "07:00 - 22:00",
        rating: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        panoramaUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=960",
        latitude: 43.3215,
        longitude: 21.8965,
      },
      {
        name: "Narodno pozorište",
        category: "Kultura",
        description: "Jedno od najstarijih pozorišta u Srbiji. Repertoar uključuje drame, komedije i mjuzikle tokom cele godine.",
        address: "Sinđelićeva 9",
        phone: "018/345-678",
        hours: "Predstave: 19:30",
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        panoramaUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=960",
        latitude: 43.3200,
        longitude: 21.8945,
      },
      {
        name: 'TC "Kalča"',
        category: "Prodavnice",
        description: "Veliki trgovinski centar sa preko 100 prodavnica, restoranima i bioskopom. Parking dostupan.",
        address: "Bulevar Nemanjića 18",
        phone: "018/567-890",
        hours: "10:00 - 22:00",
        rating: 4.3,
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        panoramaUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=960",
        latitude: 43.3180,
        longitude: 21.9000,
      },
      {
        name: 'Beauty salon "Lana"',
        category: "Usluge",
        description: "Moderni frizerski salon sa kompletnim uslugama: šišanje, farbanje, tretmani kose i kozmetičke usluge.",
        address: "Vozda Karađorđa 45",
        phone: "018/234-567",
        hours: "08:00 - 20:00",
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        panoramaUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=960",
        latitude: 43.3230,
        longitude: 21.8920,
      },
      {
        name: 'Poliklinika "Medicus"',
        category: "Zdravstvo",
        description: "Savremena poliklinika sa širokim spektrom specijalizacija. Laboratorijske analize i dijagnostika.",
        address: "Dr Zoran Đinđić 78",
        phone: "018/456-789",
        hours: "07:00 - 19:00",
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        panoramaUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=960",
        latitude: 43.3190,
        longitude: 21.8980,
      },
    ];

    // Add businesses to storage
    sampleBusinesses.forEach((business) => {
      const id = randomUUID();
      const fullBusiness: Business = { ...business, id };
      this.businesses.set(id, fullBusiness);
    });

    // Initialize sample panoramas
    const samplePanoramas: InsertPanorama[] = [
      {
        title: "Tvrđava Niš",
        description: "360° pogled na istorijsku tvrđavu u centru Niša",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=960",
        latitude: 43.3209,
        longitude: 21.8958,
        hotspots: ["restoran-1", "kafe-1"],
      },
      {
        title: "Kazandžijsko sokače",
        description: "Virtuelna šetnja kroz staro zanatsko naselje",
        imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=960",
        latitude: 43.3215,
        longitude: 21.8965,
        hotspots: ["pozoriste-1"],
      },
    ];

    samplePanoramas.forEach((panorama) => {
      const id = randomUUID();
      const fullPanorama: Panorama = { ...panorama, id };
      this.panoramas.set(id, fullPanorama);
    });
  }

  async getBusinesses(): Promise<Business[]> {
    return Array.from(this.businesses.values());
  }

  async getBusinessesByCategory(category: string): Promise<Business[]> {
    if (category === "Svi biznisi") {
      return this.getBusinesses();
    }
    return Array.from(this.businesses.values()).filter(
      (business) => business.category === category
    );
  }

  async getBusiness(id: string): Promise<Business | undefined> {
    return this.businesses.get(id);
  }

  async createBusiness(insertBusiness: InsertBusiness): Promise<Business> {
    const id = randomUUID();
    const business: Business = { ...insertBusiness, id };
    this.businesses.set(id, business);
    return business;
  }

  async searchBusinesses(query: string): Promise<Business[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.businesses.values()).filter(
      (business) =>
        business.name.toLowerCase().includes(lowercaseQuery) ||
        business.description.toLowerCase().includes(lowercaseQuery) ||
        business.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getPanoramas(): Promise<Panorama[]> {
    return Array.from(this.panoramas.values());
  }

  async getPanorama(id: string): Promise<Panorama | undefined> {
    return this.panoramas.get(id);
  }

  async createPanorama(insertPanorama: InsertPanorama): Promise<Panorama> {
    const id = randomUUID();
    const panorama: Panorama = { ...insertPanorama, id };
    this.panoramas.set(id, panorama);
    return panorama;
  }
}

// DatabaseStorage implementacija
export class DatabaseStorage implements IStorage {
  async getBusinesses(): Promise<Business[]> {
    return db.select().from(businesses);
  }

  async getBusinessesByCategory(category: string): Promise<Business[]> {
    if (category === "Svi biznisi") {
      return this.getBusinesses();
    }
    return db.select().from(businesses).where(eq(businesses.category, category));
  }

  async getBusiness(id: string): Promise<Business | undefined> {
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

  async searchBusinesses(query: string): Promise<Business[]> {
    // PostgreSQL full-text search
    return db.select().from(businesses).where(
      sql`${businesses.name} ILIKE ${`%${query}%`} OR ${businesses.description} ILIKE ${`%${query}%`} OR ${businesses.category} ILIKE ${`%${query}%`}`
    );
  }

  async getPanoramas(): Promise<Panorama[]> {
    return db.select().from(panoramas);
  }

  async getPanorama(id: string): Promise<Panorama | undefined> {
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
}

export const storage = new DatabaseStorage();

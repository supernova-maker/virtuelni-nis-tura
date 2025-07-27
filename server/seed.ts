import { db } from "./db";
import { businesses, panoramas } from "@shared/schema";

export async function seedDatabase() {
  // Dodaj početne biznise
  const sampleBusinesses = [
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
      websiteUrl: "https://stara-srbija.rs",
      emailAddress: "info@stara-srbija.rs",
      socialMedia: JSON.stringify({
        instagram: "https://instagram.com/stara_srbija_nis",
        facebook: "https://facebook.com/stara.srbija.nis"
      }),
      menuUrl: "https://stara-srbija.rs/meni.pdf",
      onlineOrderingUrl: "https://glovo.com/stara-srbija"
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
      websiteUrl: "https://central-cafe.rs",
      emailAddress: "info@central-cafe.rs",
      socialMedia: JSON.stringify({
        instagram: "https://instagram.com/central_cafe_nis"
      })
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
      websiteUrl: "https://narodnopozoriste-nis.rs",
      emailAddress: "info@narodnopozoriste-nis.rs"
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
      websiteUrl: "https://medicus.rs",
      emailAddress: "info@medicus.rs"
    }
  ];

  // Dodaj početne panorame
  const samplePanoramas = [
    {
      title: "Tvrđava Niš",
      description: "360° pogled na istorijsku tvrđavu u centru Niša",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=960",
      latitude: 43.3209,
      longitude: 21.8958,
      hotspots: ["restoran-1", "kafe-1"],
      viewCount: 1250,
      isPublic: "true",
      tags: ["istorija", "kultura", "tvrđava", "niš"]
    },
    {
      title: "Kazandžijsko sokače",
      description: "Virtuelna šetnja kroz staro zanatsko naselje",
      imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=960",
      latitude: 43.3215,
      longitude: 21.8965,
      hotspots: ["pozoriste-1"],
      viewCount: 890,
      isPublic: "true",
      tags: ["zanati", "kultura", "sokače", "niš"]
    }
  ];

  try {
    // Proveri da li već ima podataka
    const existingBusinesses = await db.select().from(businesses).limit(1);
    if (existingBusinesses.length === 0) {
      console.log("Dodajem početne biznise...");
      await db.insert(businesses).values(sampleBusinesses);
    }

    const existingPanoramas = await db.select().from(panoramas).limit(1);
    if (existingPanoramas.length === 0) {
      console.log("Dodajem početne panorame...");
      await db.insert(panoramas).values(samplePanoramas);
    }

    console.log("Baza podataka je uspešno inicijalizovana!");
  } catch (error) {
    console.error("Greška pri dodavanju početnih podataka:", error);
  }
}
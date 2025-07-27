import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all businesses
  app.get("/api/businesses", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let businesses;
      if (search && typeof search === "string") {
        businesses = await storage.searchBusinesses(search);
      } else if (category && typeof category === "string") {
        businesses = await storage.getBusinessesByCategory(category);
      } else {
        businesses = await storage.getBusinesses();
      }
      
      res.json(businesses);
    } catch (error) {
      res.status(500).json({ message: "Greška pri dohvatanju biznisa" });
    }
  });

  // Get business by ID
  app.get("/api/businesses/:id", async (req, res) => {
    try {
      const business = await storage.getBusiness(req.params.id);
      if (!business) {
        return res.status(404).json({ message: "Biznis nije pronađen" });
      }
      res.json(business);
    } catch (error) {
      res.status(500).json({ message: "Greška pri dohvatanju biznisa" });
    }
  });

  // Get all panoramas
  app.get("/api/panoramas", async (req, res) => {
    try {
      const panoramas = await storage.getPanoramas();
      res.json(panoramas);
    } catch (error) {
      res.status(500).json({ message: "Greška pri dohvatanju panorama" });
    }
  });

  // Get panorama by ID
  app.get("/api/panoramas/:id", async (req, res) => {
    try {
      const panorama = await storage.getPanorama(req.params.id);
      if (!panorama) {
        return res.status(404).json({ message: "Panorama nije pronađena" });
      }
      res.json(panorama);
    } catch (error) {
      res.status(500).json({ message: "Greška pri dohvatanju panorame" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

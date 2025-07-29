import express from 'express';
import { storage } from './storage';
import { insertBusinessSchema, insertPanoramaSchema } from '@shared/schema';

export const router = express.Router();

// Business routes
router.get('/businesses', async (req, res) => {
  try {
    const businesses = await storage.getAllBusinesses();
    res.json(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ message: 'Greška pri učitavanju biznisa' });
  }
});

router.get('/businesses/:id', async (req, res) => {
  try {
    const business = await storage.getBusinessById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Biznis nije pronađen' });
    }
    res.json(business);
  } catch (error) {
    console.error('Error fetching business:', error);
    res.status(500).json({ message: 'Greška pri učitavanju biznisa' });
  }
});

router.post('/businesses', async (req, res) => {
  try {
    const validatedData = insertBusinessSchema.parse(req.body);
    const business = await storage.createBusiness(validatedData);
    res.status(201).json(business);
  } catch (error) {
    console.error('Error creating business:', error);
    res.status(400).json({ message: 'Neispravni podaci za biznis' });
  }
});

// Panorama routes
router.get('/panoramas', async (req, res) => {
  try {
    const panoramas = await storage.getAllPanoramas();
    res.json(panoramas);
  } catch (error) {
    console.error('Error fetching panoramas:', error);
    res.status(500).json({ message: 'Greška pri učitavanju panorama' });
  }
});

router.get('/panoramas/:id', async (req, res) => {
  try {
    const panorama = await storage.getPanoramaById(req.params.id);
    if (!panorama) {
      return res.status(404).json({ message: 'Panorama nije pronađena' });
    }
    res.json(panorama);
  } catch (error) {
    console.error('Error fetching panorama:', error);
    res.status(500).json({ message: 'Greška pri učitavanju panorame' });
  }
});

router.post('/panoramas', async (req, res) => {
  try {
    const validatedData = insertPanoramaSchema.parse(req.body);
    const panorama = await storage.createPanorama(validatedData);
    res.status(201).json(panorama);
  } catch (error) {
    console.error('Error creating panorama:', error);
    res.status(400).json({ message: 'Neispravni podaci za panoramu' });
  }
});
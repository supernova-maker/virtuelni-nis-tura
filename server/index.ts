import 'dotenv/config';
import express from 'express';
import { setupVite, serveStatic, log } from './vite';
import { router } from './routes';
import { storage } from './storage';

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());

// API routes
app.use('/api', router);

// Initialize storage
storage.init().then(() => {
  log('Baza podataka je uspešno inicijalizovana!');
}).catch(console.error);

// Server setup
if (process.env.NODE_ENV !== 'production') {
  const server = app.listen(PORT, '0.0.0.0', () => {
    log(`serving on port ${PORT}`);
  });
  
  setupVite(app, server);
} else {
  serveStatic(app);
  
  app.listen(PORT, '0.0.0.0', () => {
    log(`Server running on port ${PORT}`);
  });
}
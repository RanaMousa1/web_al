import express from 'express';
import cors from 'cors';
import carsRouter from './routes/cars.js';
import testDrivesRouter from './routes/testDrives.js';
import contactsRouter from './routes/contacts.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/cars', carsRouter);
app.use('/api/test-drives', testDrivesRouter);
app.use('/api/contacts', contactsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   - GET  http://localhost:${PORT}/api/cars`);
  console.log(`   - GET  http://localhost:${PORT}/api/cars/:id`);
  console.log(`   - POST http://localhost:${PORT}/api/test-drives`);
  console.log(`   - POST http://localhost:${PORT}/api/contacts`);
});

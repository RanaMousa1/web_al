import express from 'express';
import Car from '../models/Car.js';

const router = express.Router();

// GET /api/cars - Get all cars
router.get('/', (req, res) => {
  try {
    const cars = Car.getAll();
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

// GET /api/cars/:id - Get single car
router.get('/:id', (req, res) => {
  try {
    const car = Car.getById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ error: 'Failed to fetch car' });
  }
});

// POST /api/cars - Create new car (optional - for admin)
router.post('/', (req, res) => {
  try {
    const car = Car.create(req.body);
    res.status(201).json(car);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Failed to create car' });
  }
});

export default router;

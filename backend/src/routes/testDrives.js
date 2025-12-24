import express from 'express';
import TestDrive from '../models/TestDrive.js';

const router = express.Router();

// POST /api/test-drives - Book a test drive
router.post('/', (req, res) => {
  try {
    const { carId, name, email, phone, date } = req.body;

    // Validate required fields
    if (!carId || !name || !email || !phone || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const booking = TestDrive.create({ carId, name, email, phone, date });
    res.status(201).json({
      message: 'Test drive booked successfully!',
      booking
    });
  } catch (error) {
    console.error('Error booking test drive:', error);
    res.status(500).json({ error: 'Failed to book test drive' });
  }
});

// GET /api/test-drives - Get all bookings (optional - for admin)
router.get('/', (req, res) => {
  try {
    const bookings = TestDrive.getAll();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

export default router;

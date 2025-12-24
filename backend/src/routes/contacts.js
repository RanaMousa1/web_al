import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST /api/contacts - Submit contact form
router.post('/', (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = Contact.create({ name, email, message });
    res.status(201).json({
      message: 'Message sent successfully!',
      contact
    });
  } catch (error) {
    console.error('Error submitting contact:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// GET /api/contacts - Get all messages (optional - for admin)
router.get('/', (req, res) => {
  try {
    const messages = Contact.getAll();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;

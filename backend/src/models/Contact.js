import db from '../config/database.js';

class Contact {
  // Create contact message
  static create(contactData) {
    const { name, email, message } = contactData;

    const insert = db.prepare(`
      INSERT INTO contacts (name, email, message)
      VALUES (?, ?, ?)
    `);

    const result = insert.run(name, email, message);

    return {
      id: result.lastInsertRowid,
      name,
      email,
      message
    };
  }

  // Get all contact messages
  static getAll() {
    return db.prepare(`
      SELECT * FROM contacts ORDER BY created_at DESC
    `).all();
  }
}

export default Contact;

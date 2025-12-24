import db from '../config/database.js';

class TestDrive {
  // Create test drive booking
  static create(bookingData) {
    const { carId, name, email, phone, date } = bookingData;

    const insert = db.prepare(`
      INSERT INTO test_drives (car_id, name, email, phone, date)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = insert.run(carId, name, email, phone, date);

    return {
      id: result.lastInsertRowid,
      carId,
      name,
      email,
      phone,
      date
    };
  }

  // Get all test drive bookings
  static getAll() {
    return db.prepare(`
      SELECT td.*, c.name as car_name
      FROM test_drives td
      JOIN cars c ON td.car_id = c.id
      ORDER BY td.created_at DESC
    `).all();
  }
}

export default TestDrive;

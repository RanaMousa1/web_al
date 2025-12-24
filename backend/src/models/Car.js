import db from '../config/database.js';

class Car {
  // Get all cars with their images
  static getAll() {
    const cars = db.prepare(`
      SELECT * FROM cars ORDER BY created_at DESC
    `).all();

    // Get images for each car
    const getImages = db.prepare(`
      SELECT image_url FROM car_images
      WHERE car_id = ?
      ORDER BY display_order
    `);

    return cars.map(car => ({
      ...car,
      images: getImages.all(car.id).map(img => img.image_url)
    }));
  }

  // Get single car by ID
  static getById(id) {
    const car = db.prepare('SELECT * FROM cars WHERE id = ?').get(id);

    if (!car) return null;

    const images = db.prepare(`
      SELECT image_url FROM car_images
      WHERE car_id = ?
      ORDER BY display_order
    `).all(id);

    return {
      ...car,
      images: images.map(img => img.image_url)
    };
  }

  // Create new car
  static create(carData) {
    const { name, price, year, mileage, fuel, transmission, rating, reviews, images } = carData;

    const insertCar = db.prepare(`
      INSERT INTO cars (name, price, year, mileage, fuel, transmission, rating, reviews)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertCar.run(name, price, year, mileage, fuel, transmission, rating || 0, reviews || 0);
    const carId = result.lastInsertRowid;

    // Insert images
    if (images && images.length > 0) {
      const insertImage = db.prepare(`
        INSERT INTO car_images (car_id, image_url, display_order)
        VALUES (?, ?, ?)
      `);

      images.forEach((imageUrl, index) => {
        insertImage.run(carId, imageUrl, index);
      });
    }

    return this.getById(carId);
  }
}

export default Car;

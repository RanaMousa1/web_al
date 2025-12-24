import db from './database.js';

// Create tables
const createTables = () => {
  // Cars table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      year INTEGER NOT NULL,
      mileage TEXT NOT NULL,
      fuel TEXT NOT NULL,
      transmission TEXT NOT NULL,
      rating REAL DEFAULT 0,
      reviews INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Car images table (one car can have multiple images)
  db.exec(`
    CREATE TABLE IF NOT EXISTS car_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      car_id INTEGER NOT NULL,
      image_url TEXT NOT NULL,
      display_order INTEGER DEFAULT 0,
      FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
    )
  `);

  // Test drive bookings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS test_drives (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      car_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      date TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
    )
  `);

  // Contact messages table
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('✅ Database tables created successfully!');
};

// Insert sample car data
const insertSampleData = () => {
  const cars = [
    {
      name: 'Mercedes-Benz S-Class',
      price: 89999,
      year: 2023,
      mileage: '5,000 mi',
      fuel: 'Gasoline',
      transmission: 'Automatic',
      rating: 4.8,
      reviews: 124,
      images: [
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1617531653520-bd788419a0a2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop'
      ]
    },
    {
      name: 'BMW X5',
      price: 67500,
      year: 2023,
      mileage: '8,200 mi',
      fuel: 'Hybrid',
      transmission: 'Automatic',
      rating: 4.6,
      reviews: 89,
      images: [
        'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop'
      ]
    },
    {
      name: 'Audi A8',
      price: 79900,
      year: 2023,
      mileage: '3,500 mi',
      fuel: 'Gasoline',
      transmission: 'Automatic',
      rating: 4.7,
      reviews: 156,
      images: [
        'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?w=800&h=600&fit=crop'
      ]
    },
    {
      name: 'Tesla Model S',
      price: 94990,
      year: 2024,
      mileage: '1,200 mi',
      fuel: 'Electric',
      transmission: 'Automatic',
      rating: 4.9,
      reviews: 203,
      images: [
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=600&fit=crop'
      ]
    },
    {
      name: 'Porsche Cayenne',
      price: 82400,
      year: 2023,
      mileage: '6,800 mi',
      fuel: 'Gasoline',
      transmission: 'Automatic',
      rating: 4.7,
      reviews: 178,
      images: [
        'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=600&fit=crop'
      ]
    },
    {
      name: 'Range Rover Sport',
      price: 91500,
      year: 2023,
      mileage: '4,300 mi',
      fuel: 'Hybrid',
      transmission: 'Automatic',
      rating: 4.8,
      reviews: 145,
      images: [
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=600&fit=crop'
      ]
    }
  ];

  // Check if cars already exist
  const count = db.prepare('SELECT COUNT(*) as count FROM cars').get();
  if (count.count > 0) {
    console.log('⚠️  Sample data already exists. Skipping...');
    return;
  }

  const insertCar = db.prepare(`
    INSERT INTO cars (name, price, year, mileage, fuel, transmission, rating, reviews)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertImage = db.prepare(`
    INSERT INTO car_images (car_id, image_url, display_order)
    VALUES (?, ?, ?)
  `);

  cars.forEach((car) => {
    const result = insertCar.run(
      car.name,
      car.price,
      car.year,
      car.mileage,
      car.fuel,
      car.transmission,
      car.rating,
      car.reviews
    );

    car.images.forEach((imageUrl, index) => {
      insertImage.run(result.lastInsertRowid, imageUrl, index);
    });
  });

  console.log(`✅ Inserted ${cars.length} sample cars with images!`);
};

// Run initialization
try {
  createTables();
  insertSampleData();
  console.log('✅ Database initialization complete!');
} catch (error) {
  console.error('❌ Database initialization failed:', error);
  process.exit(1);
}

# Car Website - Full Stack Application

A luxury car selling website with React frontend and Node.js + SQLite backend.

## Project Structure

```
web_al/
├── final/          # React Frontend (Vite)
└── backend/        # Node.js + Express + SQLite Backend
```

## Tech Stack

### Frontend
- React 19.2.0
- Vite
- Tailwind CSS
- Lucide React (icons)
- React DatePicker

### Backend
- Node.js
- Express.js
- SQLite (better-sqlite3)
- CORS enabled

## Database Schema

The SQLite database includes the following tables:

- **cars** - Vehicle inventory
- **car_images** - Multiple images per car
- **test_drives** - Test drive bookings
- **contacts** - Contact form submissions

## Setup Instructions

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Initialize Database

This will create the database and add sample car data:

```bash
npm run init-db
```

You should see:
```
✅ Database tables created successfully!
✅ Inserted 6 sample cars with images!
✅ Database initialization complete!
```

### Step 3: Start Backend Server

```bash
npm start
```

The backend will run on **http://localhost:3000**

You should see:
```
🚀 Server running on http://localhost:3000
📡 API endpoints:
   - GET  http://localhost:3000/api/cars
   - GET  http://localhost:3000/api/cars/:id
   - POST http://localhost:3000/api/test-drives
   - POST http://localhost:3000/api/contacts
```

### Step 4: Install Frontend Dependencies

Open a new terminal:

```bash
cd final
npm install
```

### Step 5: Start Frontend Development Server

```bash
npm run dev
```

The frontend will run on **http://localhost:5173**

## API Endpoints

### Cars

- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get single car by ID
- `POST /api/cars` - Create new car (admin)

### Test Drives

- `POST /api/test-drives` - Book a test drive
  ```json
  {
    "carId": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "date": "Mon Dec 24 2024 10:00"
  }
  ```

- `GET /api/test-drives` - Get all test drive bookings (admin)

### Contacts

- `POST /api/contacts` - Submit contact form
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I'm interested in your cars"
  }
  ```

- `GET /api/contacts` - Get all contact messages (admin)

### Health Check

- `GET /api/health` - Check if backend is running

## Features

### Frontend Features
- Car inventory listing
- Car detail view with image zoom
- Test drive booking with validation
  - No weekend bookings
  - Office hours only (9 AM - 5 PM)
  - Phone number validation
- Contact form
- Responsive design
- Login page (skip or authenticate)

### Backend Features
- RESTful API
- SQLite database (no server required)
- Relational data structure
- CORS enabled for frontend communication

## Development Scripts

### Backend (`backend/`)
- `npm start` - Start the server
- `npm run dev` - Start with auto-reload (Node --watch)
- `npm run init-db` - Initialize/reset database

### Frontend (`final/`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Database Location

The SQLite database file is created at:
```
backend/database.db
```

This file contains all your cars, bookings, and contact messages.

## Testing the Connection

1. Make sure backend is running on port 3000
2. Make sure frontend is running on port 5173
3. Open http://localhost:5173 in your browser
4. Click "Skip" on the login page
5. You should see cars loaded from the database
6. Try booking a test drive to test the connection

## Troubleshooting

### Backend won't start
- Make sure port 3000 is not in use
- Run `npm run init-db` to create the database

### Frontend can't connect to backend
- Check that backend is running on http://localhost:3000
- Check browser console for CORS errors
- Make sure `final/src/config/api.js` points to the correct backend URL

### No cars showing on frontend
- Check that backend is running
- Open http://localhost:3000/api/cars in browser to verify API works
- Check browser console for errors

## Production Deployment

### Backend
1. Set `PORT` environment variable
2. Database file will be created automatically
3. Run `npm run init-db` once to create tables
4. Run `npm start`

### Frontend
1. Update `final/src/config/api.js` with your production backend URL
2. Run `npm run build`
3. Deploy the `dist/` folder to your hosting service

## Adding New Cars

You can add cars via the API:

```bash
curl -X POST http://localhost:3000/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lamborghini Aventador",
    "price": 500000,
    "year": 2024,
    "mileage": "500 mi",
    "fuel": "Gasoline",
    "transmission": "Automatic",
    "rating": 5.0,
    "reviews": 50,
    "images": [
      "https://images.unsplash.com/photo-1...",
      "https://images.unsplash.com/photo-2..."
    ]
  }'
```

## License

MIT

## Support

For issues or questions, please open an issue on the repository.

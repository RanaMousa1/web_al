import React, { useState, useEffect } from 'react';
import ChatWidget from './components/ChatWidget';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import CarCard from './components/CarCard';
import InventoryPage from './components/InventoryPage';
import ProductView from './components/ProductView';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Login from './components/Login';
import ContactPage from './components/ContactPage';
import API_URL from './config/api';

const CarSellingWebsite = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(null);
  const [mainImage, setMainImage] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${API_URL}/cars`);
        const data = await response.json();
        setCars(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchCars();
    }
  }, [isLoggedIn]);

  const handleMouseMove = (e) => {
    if (!isZooming) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setCurrentPage('product');
    setMainImage(0);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleSkipLogin = () => {
    setIsLoggedIn(true);
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} onSkip={handleSkipLogin} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header setCurrentPage={setCurrentPage} />

      {currentPage === 'home' && (
        <>
          <Hero setCurrentPage={setCurrentPage} />
          <Features />

          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-8">Featured Vehicles</h2>
              {loading ? (
                <div className="text-center py-8">Loading cars...</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cars.slice(0, 3).map(car => <CarCard key={car.id} car={car} onSelect={handleSelectCar} />)}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {currentPage === 'inventory' && <InventoryPage cars={cars} onSelect={handleSelectCar} />}

      {currentPage === 'product' && (
        <ProductView
          selectedCar={selectedCar}
          setCurrentPage={setCurrentPage}
          mainImage={mainImage}
          setMainImage={setMainImage}
          isZooming={isZooming}
          setIsZooming={setIsZooming}
          handleMouseMove={handleMouseMove}
          zoomPosition={zoomPosition}
        />
      )}

      {currentPage === 'about' && (
        <div className="py-16 bg-white min-h-screen">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8">About Us</h1>
            <p className="text-lg text-gray-600 mb-4">LuxuryCars has been serving customers for over 20 years, providing premium vehicles and exceptional service.</p>
          </div>
        </div>
      )}

      {currentPage === 'finance' && (
        <div className="py-16 bg-white min-h-screen">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8">Financing Options</h1>
            <p className="text-lg text-gray-600 mb-4">We offer competitive financing rates and flexible payment plans to fit your budget.</p>
          </div>
        </div>
      )}

      {currentPage === 'contact' && (
        <ContactPage />
      )}

      {currentPage === 'profile' && <Profile setCurrentPage={setCurrentPage} />}

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default CarSellingWebsite;
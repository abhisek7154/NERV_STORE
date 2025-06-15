import React, { createContext, useContext, useState } from 'react';

// Create Booking Context
const BookingContext = createContext();

// Custom hook to use booking context
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

// Booking Provider Component
export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const addBooking = (bookingDetails) => {
    const newBooking = {
      id: Date.now().toString(),
      hotelName: bookingDetails.hotelName,
      hotelAddress: bookingDetails.hotelAddress,
      checkIn: bookingDetails.checkIn,
      checkOut: bookingDetails.checkOut,
      room: bookingDetails.room,
      adults: bookingDetails.adults,
      children: bookingDetails.children,
      nights: bookingDetails.nights,
      total: bookingDetails.total,
      bookingDate: new Date().toISOString(),
      status: 'Confirmed',
    };
    
    setBookings(prevBookings => [...prevBookings, newBooking]);
    return newBooking;
  };

  const removeBooking = (bookingId) => {
    setBookings(prevBookings => 
      prevBookings.filter(booking => booking.id !== bookingId)
    );
  };

  const clearAllBookings = () => {
    setBookings([]);
  };

  const value = {
    bookings,
    addBooking,
    removeBooking,
    clearAllBookings,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
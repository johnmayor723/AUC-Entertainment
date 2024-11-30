const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/api/bookingController');
const { isAuthenticated } = require('../../middleware/authMiddleware');

// Create a new booking
router.post('/', isAuthenticated, bookingController.createBooking);

// Get all bookings for a user
router.get('/user', isAuthenticated, bookingController.getUserBookings);

// Cancel a booking
router.delete('/:id', isAuthenticated, bookingController.cancelBooking);

module.exports = router;

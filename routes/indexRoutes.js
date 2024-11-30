const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Homepage
router.get('/', indexController.renderHomepage);

// Apartments page
router.get('/apartments', indexController.renderApartments);

// Apartment detail page
router.get('/apartments/:id', indexController.renderApartmentDetail);

// Booking page
router.get('/bookings/:id', isAuthenticated, indexController.renderBookingPage);

// Login page
router.get('/login', indexController.renderLoginPage);

// Sign-up page
router.get('/signup', indexController.renderSignupPage);

// User profile page
router.get('/profile', isAuthenticated, indexController.renderUserProfile);

module.exports = router;

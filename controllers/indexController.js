const Apartment = require('../models/Apartment');
const User = require('../models/User');

// Render homepage
exports.renderHomepage = async (req, res) => {
  try {
    res.render('homepage', { title: 'Beyond Home - Luxury Apartments' });
  } catch (err) {
    res.status(500).send('Error rendering homepage');
  }
};

// Render apartments page
exports.renderApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find({ isBooked: false });
    res.render('apartments', { title: 'Apartments', apartments });
  } catch (err) {
    res.status(500).send('Error rendering apartments page');
  }
};

// Render apartment detail page
exports.renderApartmentDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const apartment = await Apartment.findById(id);
    if (!apartment) {
      return res.status(404).send('Apartment not found');
    }
    res.render('apartmentDetail', { title: apartment.name, apartment });
  } catch (err) {
    res.status(500).send('Error rendering apartment detail page');
  }
};

// Render booking page
exports.renderBookingPage = async (req, res) => {
  try {
    const { id } = req.params;
    const apartment = await Apartment.findById(id);
    if (!apartment) {
      return res.status(404).send('Apartment not found');
    }
    res.render('booking', { title: 'Book Apartment', apartment });
  } catch (err) {
    res.status(500).send('Error rendering booking page');
  }
};

// Render login page
exports.renderLoginPage = async (req, res) => {
  try {
    res.render('login', { title: 'Login' });
  } catch (err) {
    res.status(500).send('Error rendering login page');
  }
};

// Render signup page
exports.renderSignupPage = async (req, res) => {
  try {
    res.render('signup', { title: 'Sign Up' });
  } catch (err) {
    res.status(500).send('Error rendering signup page');
  }
};

// Render user profile page
exports.renderUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('currentBooking.apartment', 'name')
      .populate('bookingHistory.apartment', 'name');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('profile', { title: 'Your Profile', user });
  } catch (err) {
    res.status(500).send('Error rendering profile page');
  }
};

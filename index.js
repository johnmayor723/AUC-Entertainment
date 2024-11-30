const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Import routes
const indexRoutes = require('./routes/index');
const apiApartmentRoutes = require('./routes/api/apartmentRoutes');
const apiAuthRoutes = require('./routes/api/authRoutes');
const apiBookingRoutes = require('./routes/api/bookingRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

// Set up views directory and ejs view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
// Index Routes for rendering views (e.g., Homepage, Apartments page, etc.)
app.use('/', indexRoutes);

// API Routes for mobile apps or other external consumers
app.use('/api/apartments', apiApartmentRoutes);
app.use('/api/auth', apiAuthRoutes);
app.use('/api/bookings', apiBookingRoutes);

// Set up a 404 route
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

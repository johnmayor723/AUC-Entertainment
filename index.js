require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const DB_URL = "mongodb+srv://admin:majoje1582@cluster0.cqudxbr.mongodb.net/?retryWrites=true&w=majority"

// Connect to MongoDB
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});


// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
//Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routers
const indexRouter = require('./routes/index');
const managementRouter = require('./routes/management');

// Use Routers
app.use('/', indexRouter);
app.use('/management', managementRouter);

// Start server
const PORT = 6000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

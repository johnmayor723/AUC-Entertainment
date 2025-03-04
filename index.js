require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
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
/*Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// Setting app middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: DB_URL }),
  cookie: { secure: false }
}));
app.use(flash());

// Middleware to pass session data and flash message to views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Initialize cart in session
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = {
            items: [],
            totalQty: 0,
            totalAmount: 0
        };
    }
    next();
});

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});


// Routers
const indexRouter = require('./routes/index');
const managementRouter = require('./routes/management');
const PaymentRouter = require('./routes/PaymentRoute');
const CartRouter = require('./routes/Cart');

// Use Routers
app.use('/', indexRouter);
app.use('/management', managementRouter);
app.use('/payment', PaymentRouter);
app.use('/cart', CartRouter);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

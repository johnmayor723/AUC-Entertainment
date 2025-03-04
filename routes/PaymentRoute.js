const express = require("express");
const router = express.Router();
const axios = require('axios');
//const Stripe = require('stripe');
const Order = require("../models/Order")
const nodemailer = require('nodemailer');
const {generateOrderEmailHTML} = require('../helpers')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fooddeck3@gmail.com',
        pass: 'xyca sbvx hifi amzs'  // Replace with actual password
    }
});

const STRIPE_SECRET = "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"


// Payment page route
router.post('/', (req, res, next) => {
    const amount = req.body.amount
    console.log('amount to be paid:', amount)
  if (!req.session.cart) {
    return res.render('cart', {cart, title: "Shopping Cart" });
  }
  
  res.render('checkout', { 
    amount,
    title: "Payment Page" 
  });
});




router.post('/charge',  function(req, res, next) {
  console.log("Payment route reached")
  if (!req.session.cart) {
      return res.redirect('/products');
  }
  var amount = req.session.cart.totalAmount;
  console.log("amount to be paid:", amount, req.session.cart)
  var stripe = require("stripe")(STRIPE_SECRET );
  //console.log("cart details:", cart)
  const exchangeRate = 0.92; // Example rate (fetch real-time rates for accuracy)
const amountInCents = Math.round(amount * exchangeRate * 100);

  stripe.charges.create({
      amount: amountInCents,
      currency: "EUR",
      source: req.body.token, // obtained with Stripe.js
      description: "Test Charge"
  }, function(err, charge) {
      if (err) {
          console.log("error occured:", err)
          req.flash('error', err.message);
          return res.redirect('/cart');
      }
      var order = new Order({
         // user: req.user
          cart: cart,
          email,
          address: req.body.address,
          name: req.body.name,
          paymentId: charge.id
      });
      const userEmailOptions = {
    from: ' "AUC ENTERTAINMENT" <fooddeck3@gmail.com>', // Display name with email in brackets
    to: email,
    subject: 'Order Confirmation - FoodDeck',
    html: generateOrderEmailHTML(cart, orderPayload)
};
      const orderPayload = {
        name,
        address,
        mobile,
        email,
        
        amount,    
    
};

    transporter.sendMail(userEmailOptions)

  }); 
});





  


module.exports = router;


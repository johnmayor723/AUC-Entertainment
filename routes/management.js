const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const Music = require('../models/Music');
const Product = require('../models/Shop');
const Post = require('../models/Post');

// Hardcoded credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Admin@p^sw@rd2024';

// Login Page
router.get('/login', (req, res) => {
  res.render('management/login');
});

// Handle Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.render('management/admin'); // Render the admin dashboard directly
  } else {
    res.send('Invalid credentials. Access denied.');
  }
});

// Admin Dashboard
router.get('/admin', (req, res) => {
  res.redirect('/management/login'); // Protect the admin route by redirection
});

//// Video Routes ////

// Fetch All Videos
router.get('/video', async (req, res) => {
  const videos = await Video.find();
  res.render('management/video', { videos });
});

// Create Video
router.post('/video', async (req, res) => {
  const { title, author, fileUrl, year } = req.body;
  await Video.create({ title, author, fileUrl, year });
  res.redirect('/management/video');
});

// Update Video
router.put('/video/:id', async (req, res) => {
  const { title, author, fileUrl, year } = req.body;
  await Video.findByIdAndUpdate(req.params.id, { title, author, fileUrl, year });
  res.redirect('/management/video');
});

// Delete Video
router.delete('/video/:id', async (req, res) => {
  await Video.findByIdAndDelete(req.params.id);
  res.redirect('/video');
});

//// Music Routes ////

// Fetch All Music
router.get('/music', async (req, res) => {
  const music = await Music.find();
  res.render('management/music', { music });
});

// Create Music
router.post('/music', async (req, res) => {
  const { category, title, fileUrl, imageUrl, author, year } = req.body;
  await Music.create({ category, title, fileUrl, author, year });
  res.redirect('/management/music');
});

// Update Music
router.put('/music/:id', async (req, res) => {
  const { category, title, fileUrl, imageUrl, author, year } = req.body;
  await Music.findByIdAndUpdate(req.params.id, { category, title, fileUrl, author, year });
  res.redirect('/management/music');
});

// Delete Music
router.delete('/music/:id', async (req, res) => {
  await Music.findByIdAndDelete(req.params.id);
  res.redirect('/management/music');
});

//// Shop (Store) Routes ////

// Fetch All Products
router.get('/shop', async (req, res) => {
  const products = await Product.find();
  res.render('management/shop', { products });
});

// Create Product
router.post('/shop', async (req, res) => {
  const { imageUrl, title, price, description } = req.body;
  await Product.create({ imageUrl, title, price, description });
  res.redirect('/management/shop');
});

// Update Product
router.put('/shop/:id', async (req, res) => {
  const { imageUrl, title, price, description } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { imageUrl, title, price, description });
  res.redirect('/management/shop');
});

// Delete Product
router.delete('shop/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/management/shop');
});

//// Post Routes ////

// Fetch All Posts
router.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.render('management/posts', { posts });
});

// Create Post
router.post('/posts', async (req, res) => {
  const { imageUrl, title, description } = req.body;
  await Post.create({ imageUrl, title, description });
  res.redirect('/management/posts');
});

// Update Post
router.put('/posts/:id', async (req, res) => {
  const { imageUrl, title, description } = req.body;
  await Post.findByIdAndUpdate(req.params.id, { imageUrl, title, description });
  res.redirect('/management/posts');
});

// Delete Post
router.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/management/posts');
});

module.exports = router;

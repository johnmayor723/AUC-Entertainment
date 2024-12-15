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
  const { title, author, fileUrl,imageUrl, year } = req.body;
  await Video.create({ title, author,imageUrl fileUrl, year });
  res.redirect('/management/video');
});

// Route to display a single music's details
app.get('/video/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!music) {
      return res.status(404).send('Music not found');
    }
    res.render('show-video', { video });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the music.');
  }
});


// Update Video
router.put('/video/:id', async (req, res) => {
  const { title, author, fileUrl,imageUrl, year } = req.body;
  await Video.findByIdAndUpdate(req.params.id, { title, author, fileUrl, year });
  res.redirect('/management/video');
});

// Delete Video
router.delete('/video/:id', async (req, res) => {
  await Video.findByIdAndDelete(req.params.id);
  res.redirect('/video');
});

// Route to display a single video's details
router.get('/video/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).send('Video not found');
    }
    res.render('video-show', { video });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the video.');
  }
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

// Route to display a single music's details
router.get('/music/:id', async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    if (!music) {
      return res.status(404).send('Music not found');
    }
    res.render('show-music', { music });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the music.');
  }
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

// Route to display a single product's details
router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('show-product', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the product.');
  }
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

// Route to display a single post's details
router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('show-post', { post });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the post.');
  }
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

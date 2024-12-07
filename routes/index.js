const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const Music = require('../models/Music');
const Product = require('../models/Shop');
const Post = require('../models/Post');

// Index Route - Homepage
router.get('/', async (req, res) => {
  try {
    // Fetch latest 6 videos, music, posts, and all products for the store
    const videos = await Video.find().sort({ createdAt: -1 }).limit(6);
    const music = await Music.find().sort({ createdAt: -1 }).limit(6);
    const posts = await Post.find().sort({ createdAt: -1 }).limit(6);
    const products = await Product.find();

    // Render homepage with all the fetched data
    res.render('index', { videos, music, posts, products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading homepage');
  }
});

// Videos Route
router.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.render('videos', { videos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading videos');
  }
});

// Music Route
router.get('/music', async (req, res) => {
  try {
    const music = await Music.find();
    res.render('music', { music });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading music');
  }
});

// Shop Route
router.get('/shop', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('shop', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading shop');
  }
});

// Posts Route (Blog)
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.render('posts', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading posts');
  }
});

module.exports = router;

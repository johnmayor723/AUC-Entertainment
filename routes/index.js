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

// Route to render the Contact page
router.get('/contact', (req, res) => {
  res.render('contact'); // Renders the 'contact.ejs' file from the views folder
});

// Route to render the About page
router.get('/about', (req, res) => {
  res.render('about'); // Renders the 'about.ejs' file from the views folder
});

// Route to render the Album page
router.get('/album', (req, res) => {
  res.render('album'); // Renders the 'album.ejs' file from the views folder
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

// Route for Afrobeat category
router.get('/categories/afrobeat', async (req, res) => {
  try {
    const music = await Music.find({ category: 'Afrobeat' }); // Filter Music model by category
    res.render('category', { music, category: 'Afrobeat' }); // Pass data and category name to view
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Route for Asakaa category
router.get('/categories/asakaa', async (req, res) => {
  try {
    const music = await Music.find({ category: 'Asakaa' });
    res.render('category', { music, category: 'Asakaa' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Route for Dancehall category
router.get('/categories/dancehall', async (req, res) => {
  try {
    const music = await Music.find({ category: 'Dancehall' });
    res.render('category', { music, category: 'Dancehall' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Route for Drill Music category
router.get('/categories/drill', async (req, res) => {
  try {
    const music = await Music.find({ category: 'Drill Music' });
    res.render('category', { music, category: 'Drill Music' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Route for Gospel category
router.get('/categories/gospel', async (req, res) => {
  try {
    const music = await Music.find({ category: 'Gospel' });
    res.render('category', { music, category: 'Gospel' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Route for Hip Hop category
router.get('/categories/hiphop', async (req, res) => {
  try {
    const music = await Music.find({ category: 'Hip Hop' });
    res.render('category', { music, category: 'Hip Hop' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Route for Hiplife category
router.get('/categories/hiplife', async (req, res) => {
  try {
    const music = await Music.find({ category: 'Hiplife' });
    res.render('category', { music, category: 'Hiplife' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Shop Route
router.get('/shop', async (req, res) => {
  try {
    const products = await Product.find();
    const products1 = [];
    const products2 = [];
    const products3 = [];

    // Helper function to get random items without duplication
    const getRandomItems = (source, exclude, count) => {
      const result = [];
      const availableItems = source.filter(item => !exclude.includes(item));
      while (result.length < count && availableItems.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableItems.length);
        const randomItem = availableItems.splice(randomIndex, 1)[0];
        result.push(randomItem);
      }
      return result;
    };

    // Populate products1
    products1.push(...getRandomItems(products, [], 3));

    // Populate products2
    products2.push(...getRandomItems(products, products1, 3));

    // Populate products3
    products3.push(...getRandomItems(products, [...products1, ...products2], 3));

    res.render('shop', { products1, products2, products3 });
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

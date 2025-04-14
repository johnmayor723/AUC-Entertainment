const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const Music = require('../models/Music');
const Product = require('../models/Shop');
const Post = require('../models/Post');
const Entertainment = require('../models/Entertainment');


// Hardcoded credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Admin@p^sw@rd2024';

// dashboard route

router.get('/', (req, res) => {
  res.render('management/admin');
});

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

// Get all Entertainment
router.get('/entertainment', async (req, res) => {
  try {
    const entertainments = await Entertainment.find();
    res.render('management/entertainment', { entertainments });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching entertainment content.');
  }
});



// POST create a new entertainment
router.post('/entertainment', async (req, res) => {
  try {
    const { title, author, fileUrl, imageUrl, year, category } = req.body;
    await Entertainment.create({ title, author, fileUrl, imageUrl, year, category });
    res.redirect('/management/entertainment');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating entertainment');
  }
});

// Route to display a single entertainment's details
router.get('/entertainment/:id', async (req, res) => {
  try {
    const entertainment = await Entertainment.findById(req.params.id);
    if (!entertainment) {
      return res.status(404).send('Entertainment not found');
    }
    res.render('management/show-entertainment', { entertainment });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the entertainment.');
  }
});

// Update Entertainment
router.put('/entertainment/:id', async (req, res) => {
  const { title, author, fileUrl, imageUrl, year, category } = req.body;
  await Entertainment.findByIdAndUpdate(req.params.id, { title, author, fileUrl, imageUrl, year, category });
     
  res.redirect('/management/entertainment');
});

// Delete Entertainment
router.delete('/entertainment/:id', async (req, res) => {
  await Entertainment.findByIdAndDelete(req.params.id);
  res.redirect('/management/entertainment');
});

// Route to display a single entertainment's details
router.get('/entertainment/:id', async (req, res) => {
  try {
    const entertainment = await Entertainment.findById(req.params.id);
    if (!entertainment) {
      return res.status(404).send('Entertainment not found');
    }
    res.render('management/show-entertainment', { entertainment });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the entertainment.');
  }
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
  await Video.create({ title, author,imageUrl, fileUrl, year });
  res.redirect('/management/video');
});

// Route to display a single music's details
router.get('/video/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).send('video not found');
    }
    res.render('management/show-video', { video });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the music.');
  }
});


// Update Video
router.put('/video/:id', async (req, res) => {
  const { title, author, fileUrl,imageUrl, year } = req.body;
  await Video.findByIdAndUpdate(req.params.id, { title, author, imageUrl, fileUrl, year });
     
  res.redirect('/management/video');
});

// Delete Video
router.delete('/video/:id', async (req, res) => {
  await Video.findByIdAndDelete(req.params.id);
  res.redirect('management/video');
});

// Route to display a single video's details
router.get('/video/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).send('Video not found');
    }
    res.render('management/show-video', { video });
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
router.post('/music', (req, res) => {
  const { category, title, fileUrl, imageUrl, author, year } = req.body;

  Music.create({ category, title, imageUrl, fileUrl, author, year })
    .then((music) => {
      console.log('New Music Created:', music);
      res.redirect('/management/music');
    })
    .catch((err) => {
      console.error('Error creating music:', err);
      res.status(500).send('An error occurred');
    });
});
// Route to display a single music's details
router.get('/music/:id', async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    if (!music) {
      return res.status(404).send('Music not found');
    }
    res.render('management/show-music', { music });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the music.');
  }
});

// Update Music
router.put('/music/:id', (req, res) => {
  const { category, title, fileUrl, imageUrl, author, year } = req.body;

  Music.findByIdAndUpdate(req.params.id, { category, title, imageUrl, fileUrl, author, year })
    .then((updatedMusic) => {
      console.log('Music Updated:', updatedMusic);
      res.redirect('/management/music');
    })
    .catch((err) => {
      console.error('Error updating music:', err);
      res.status(500).send('An error occurred');
    });
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
  try {
    const { images, title, price, description } = req.body;

    // Ensure images is an array and limit to 4
    const imageArray = Array.isArray(images) ? images.slice(0, 4) : [images];

    await Product.create({ images: imageArray, title, price, description })
  .then((createdProduct) => {
    console.log('Product created successfully:', createdProduct);
  })
  .catch((error) => {
    console.error('Error creating product:', error);
  });
    res.redirect('/management/shop');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to display a single product's details
router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('management/show-shop', { product });
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
router.delete('/shop/:id', async (req, res) => {
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
  const { imageUrl, title, content, date } = req.body;
  await Post.create({ imageUrl, title, content, date });
  res.redirect('/management/posts');
});

// Route to display a single post's details
router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('management/show-post', { post });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the post.');
  }
});


// Update Post
router.put('/posts/:id', async (req, res) => {
  const { imageUrl, title, content, date } = req.body;
  await Post.findByIdAndUpdate(req.params.id, { imageUrl, title, date, content });
  res.redirect('/management/posts');
});

// Delete Post
router.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/management/posts');
});



module.exports = router;

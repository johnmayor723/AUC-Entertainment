const express = require('express');
const router = express.Router();
const apartmentController = require('../../controllers/api/apartmentController');

// Create a new apartment
router.post('/', apartmentController.createApartment);

// Get all apartments
router.get('/', apartmentController.getAllApartments);

// Get a single apartment by ID
router.get('/:id', apartmentController.getApartmentById);

// Update apartment details
router.put('/:id', apartmentController.updateApartment);

// Delete an apartment
router.delete('/:id', apartmentController.deleteApartment);

module.exports = router;

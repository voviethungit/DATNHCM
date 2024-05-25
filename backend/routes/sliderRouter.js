const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/sliderController');

router.post('/createSlider', sliderController.createSlider);
router.get('/getAllSliders', sliderController.getAllSliders);
router.get('/getSliderById/:id', sliderController.getSliderById);
router.delete('/deleteSlider/:id', sliderController.deleteSlider);

module.exports = router;

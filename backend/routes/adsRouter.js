const express = require('express');
const router = express.Router();
const adsController = require('../controllers/adsController');

router.get('/getAllAds', adsController.getAllAds);

router.get('/getAdById/:id', adsController.getAdById);


router.post('/createAd', adsController.createAd);

router.patch('/updateAd/:id', adsController.updateAd);

router.delete('/deleteAd/:id', adsController.deleteAd);

module.exports = router;

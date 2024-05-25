const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController');

router.post('/createSubscriber', subscriberController.createSubscriber);
router.get('/getAllSubscribers', subscriberController.getAllSubscribers);
router.delete('/deleteSubscriber/:email', subscriberController.deleteSubscriber);

module.exports = router;

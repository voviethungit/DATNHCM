const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/createContactMessage', contactController.createContactMessage);
router.get('/getAllContactMessages', contactController.getAllContactMessages);
router.get('/getContactMessageById/:id', contactController.getContactMessageById);
router.delete('/deleteContactMessage/:id', contactController.deleteContactMessage);

module.exports = router;

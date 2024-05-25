const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.post('/createInvoice', invoiceController.createInvoice);
router.get('/getAllInvoices', invoiceController.getAllInvoices);
router.get('/getInvoiceById/:id', invoiceController.getInvoiceById);
router.delete('/deleteInvoice/:id', invoiceController.deleteInvoice);

module.exports = router;

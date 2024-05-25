const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');

router.post('/createCoupon', couponController.createCoupon);
router.get('/getAllCoupons', couponController.getAllCoupons);
router.get('/getCouponById/:id', couponController.getCouponById);
router.delete('/deleteCoupon/:id', couponController.deleteCoupon);

module.exports = router;

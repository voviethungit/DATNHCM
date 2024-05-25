const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Đăng ký
router.post('/register', userController.register);

// Đăng nhập
router.post('/login', userController.login);

// Quên mật khẩu
router.post('/forgot-password', userController.forgotPassword);

// Xác nhận OTP quên mật khẩu
router.post('/verify-otp', userController.verifyOtp);

// Đặt lại mật khẩu mới
router.post('/reset-password', userController.resetPassword);

module.exports = router;

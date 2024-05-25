const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Tạo JWT token
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    "secretKey",
    { expiresIn: "1h" }
  );
};

const sendEmail = (email, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "voviethung.tk@gmail.com",
      pass: "capa wnzi xpnh ejwz",
    },
  });

  const mailOptions = {
    from: "voviethung.tk@gmail.com",
    to: email,
    subject: subject,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Đăng ký
exports.register = async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, phone, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = createToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Quên mật khẩu
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = generateOtp();
    const otpExpires = Date.now() + 3600000; 
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const otpSentTime = new Date().toLocaleString();
    const otpExpiryTime = new Date(otpExpires).toLocaleString();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center;">
          <img src="https://i.ibb.co/HGWjzqv/taoanhdep-logo-pornhub.jpg" alt="Logo HungDev" style="width: 100px; height: auto;">
        </div>
        <h3 style="color: #333;">Mã Xác Thực Quên Mật Khẩu</h3>
        <p>Chào <strong>${user.fullName}</strong>,</p>
        <p>Mã xác thực của bạn là: <strong style="font-size: 22px; color: #007bff;">${otp}</strong></p>
        <p>Mã xác thực này được gửi vào: <strong>${otpSentTime}</strong></p>
        <p>Mã xác thực này sẽ hết hạn vào: <strong>${otpExpiryTime}</strong></p>
        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        <p>Trân trọng,<br>Đội ngũ hỗ trợ của chúng tôi</p>
        <div style="text-align: center; margin-top: 20px;">
          <a href="http://localhost:3000" style="text-decoration: none; color: #007bff;">Trang chủ</a> | 
          <a href="http://localhost:3000/support" style="text-decoration: none; color: #007bff;">Hỗ trợ</a>
        </div>
      </div>
    `;

    sendEmail(email, "OTP Xác Thực Quên Mật Khẩu", htmlContent);
    res.status(200).json({
      message: "OTP sent to your email",
      otpSentTime: otpSentTime,
      otpExpiryTime: otpExpiryTime,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xác nhận OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    user.otpVerified = true;
    user.otp = "";
    user.otpExpires = null;
    await user.save();
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.otpVerified) {
      return res
        .status(400)
        .json({ message: "OTP not verified or user not found" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.otpVerified = false;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

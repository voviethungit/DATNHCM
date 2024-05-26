require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/userRouter');
const adsRouter = require('./routes/adsRouter');
const blogRouter = require('./routes/blogRouter');
const categoryblogRouter = require('./routes/categoryblogRouter');
const categoryproductRouter = require('./routes/categoryproductRouter');
const contactRouter = require('./routes/contactRouter');
const couponRouter = require('./routes/couponRouter');
const invoiceRouter = require('./routes/invoiceRouter');
// const productreviewRouter = require('/routes/productreviewRouter');
const productRouter = require('./routes/productRouter');
const sliderRouter = require('./routes/sliderRouter');
const subscriberRouter = require('./routes/subscriberRouter');
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pv6rkef.mongodb.net/DATNHCM?retryWrites=true&w=majority`
    );
    console.log("Kết Nối Database Thành Công !");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());


// API AUTH
app.use('/users', userRoutes);
app.use('/ads', adsRouter);
app.use('/blog', blogRouter);
app.use('/cateblog', categoryblogRouter);
app.use('/cateproduct', categoryproductRouter);
app.use('/contact', contactRouter);
app.use('/coupon', couponRouter);
app.use('/invoice', invoiceRouter);
// app.use('/productreview', productreviewRouter);
app.use('/product', productRouter);
app.use('/slider', sliderRouter);
app.use('/subscriber', subscriberRouter);
app.listen(process.env.PORT, () => {
  console.log(
    `Server dang chay tai PORT : http://localhost:${process.env.PORT}/`
  );
  console.log("Version 1");
});

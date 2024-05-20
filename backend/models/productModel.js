const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require('slugify');

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number,
    required: true
  },
  mainImage: {
    type: String,
    required: true
  },
  detailedImages: {
    type: [String], 
  },
  attributes: {
    type: Map, 
    of: String
  },
  quantity: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
    minlength: 100
  },
  content: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  }
});

ProductSchema.pre('save', function(next) {
  if (this.isModified('name') || this.isNew) {
    this.slug = slugify(this.name, { 
      lower: true, 
      strict: true, 
      remove: /[*+~.()'"!:@]/g 
    });
  }
  next();
});

module.exports = mongoose.model("Product", ProductSchema);

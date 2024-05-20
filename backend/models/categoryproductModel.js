const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require('slugify');
const CategorysProductSchema = new Schema({
  nameCategory: {
    type: String,
    required: true,
    unique: true,
  },
  imageCategory: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'deleted'],
    default: "active"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
    required: true
  }
});
CategorysProductSchema.pre('save', function(next) {
    if (this.isModified('nameCategory') || this.isNew) {
      this.slug = slugify(this.nameCategory, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g  });
    }
    next();
  });
module.exports = mongoose.model("CategoryProduct", CategorysProductSchema);

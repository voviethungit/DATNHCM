const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require('slugify');

const CategoryBlogSchema = new Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

CategoryBlogSchema.pre('save', function(next) {
  if (this.isModified('name') || this.isNew) {
    this.slug = slugify(this.name, { 
      lower: true, 
      strict: true, 
      remove: /[*+~.()'"!:@]/g 
    });
  }
  next();
});

module.exports = mongoose.model("CategoryBlog", CategoryBlogSchema);

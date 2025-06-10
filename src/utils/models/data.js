const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productId:String,
  title: String,
  description: String,
  price: Number,
  image: String,
});

const SubCategorySchema = new mongoose.Schema({
  category_name: String,
  products: [ProductSchema],
});

const MainCategorySchema = new mongoose.Schema({
  category_name: String,
  imageurl:String,
  products:[SubCategorySchema],
});


const MainCategoryModel =mongoose.models.categories || mongoose.model('categories', MainCategorySchema);

export default MainCategoryModel
const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
  .connect(
    "mongodb+srv://bartigue:mMWJwLPGPn3Dp38r@cluster1.hvwob4u.mongodb.net/products?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("We are connected to the database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();

  res.json(result);
};

const getProduct = async (req, res, next) => {
  const products = await Product.find().exec();

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProduct = getProduct;

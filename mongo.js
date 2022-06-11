const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://bartigue:mMWJwLPGPn3Dp38r@cluster1.hvwob4u.mongodb.net/products?retryWrites=true&w=majority";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "Could not store data" });
  }
  setTimeout(() => {
    client.close();
  }, 1500);
  res.json(newProduct);
};

const getProduct = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;

  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    return res.json({ message: "Could not retrieve products" });
  }
  setTimeout(() => {
    client.close();
  }, 1500);
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProduct = getProduct;

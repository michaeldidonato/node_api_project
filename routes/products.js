const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const getProductById = require("../middlewares/products");

//GET
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//GET Single product
router.get("/:id", getProductById, async (req, res) => {
  res.json(res.product);
});

//Create
router.post("/", async (req, res) => {
  const { name } = req.body;

  const product = new Product({
    name,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400);
  }
});

//Update
router.put("/:id", getProductById, async (req, res) => {
  const { name } = req.body;

  if (name) {
    res.product.name = name;
  }

  try {
    const updateProduct = await res.product.save();
    res.json(updateProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete
router.delete("/:id", getProductById, async (req, res) => {
  try {
    await res.product.deleteOne({ _id: req.params.id });
    res.json({ message: "deleted product" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "lowloom-products",
    });

    const product = await Product.create({
      name,
      price,
      image: uploadResult.secure_url,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

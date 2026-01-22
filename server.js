import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ MIDDLEWARE (ORDER MATTERS)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

console.log(
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY ? "KEY OK" : "KEY MISSING"
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/orders", orderRoutes);

// ✅ ROUTES
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

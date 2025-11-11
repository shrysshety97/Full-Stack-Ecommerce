import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// __dirname fix for ES modules (important for Render path resolution)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads folder publicly
app.use("/images", express.static(path.join(__dirname, "/uploads")));

import cors from "cors";

app.use(
  cors({
    origin: [
      "https://ecommerce-admin-ljeo.onrender.com",  // your admin frontend
      "https://ecommerce-frontend-lgjw.onrender.com" // if you have user site
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


// API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("✅ API is Working & Images are Served at /images/");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});

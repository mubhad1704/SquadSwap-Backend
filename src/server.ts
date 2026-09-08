import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import playerRoutes from "./routes/playerRoutes.js";

dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/players", playerRoutes);

// Test route
app.get("/", (_req, res) => {
  res.json({
    message: "SquadSwap API is running",
  });
});

// Start server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
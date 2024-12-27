require("dotenv").config(); // Load .env variables
const express = require("express");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env or fallback to 3000

// Middleware
app.use(express.json());

// Routes
app.use("/api/items", itemRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

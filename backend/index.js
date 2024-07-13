const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const env = require("dotenv").config();
// Middleware
app.use(bodyParser.json());
app.use(env);
// Routes
const authRoutes = require("./routes/auth");
const sellerRoutes = require("./routes/seller");
const buyerRoutes = require("./routes/buyer");

app.use("/auth", authRoutes);
app.use("/seller", sellerRoutes);
app.use("/buyer", buyerRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDatabase = require("./config/db");
const memberRoutes = require("./routes/memberRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(cors());
app.use(express.json());

dotenv.config();

const port = process.env.PORT || "5000";

connectDatabase();

app.use("/api/", memberRoutes);
app.use("/api/", productRoutes);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
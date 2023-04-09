const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const countyRoutes = require("./routes/countyRoute");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/authRoute");

const app = express();

app.use(errorHandler);
connectDb();

app.use(express.json());
app.use("/api/counties", countyRoutes);
app.use("/api/auth", authRoutes)

app.all("/", (req, res) => {
  res.send(
    "Welcome to counties API\n\n Routes:(/api/counties),\n(/api/counties/code)\ne.g /api/counties/001 - Mombasa"
  );
  console.log("Welcome to counties' API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

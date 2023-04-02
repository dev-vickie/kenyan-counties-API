const mongoose = require("mongoose");
const dotenv = require('dotenv')

const connectDb = async () => {
  try {
    const connect = await mongoose.connect((process.env.CONNECTION_STRING));
    console.log(
      "Database connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log("Cound not connect to db:", err);
    process.exit(1);
  }
};

module.exports = connectDb;
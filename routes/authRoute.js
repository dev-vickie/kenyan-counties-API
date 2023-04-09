const express = require("express");
const route = express.Router();
const {
  register,
  login,
  logout,
  getCurrentUser,
} = require("../controllers/authController");
const validateToken = require("../middleware/validateAuthToken");

route.post("/register", register);

route.post("/login", login);

route.post("/logout", logout);

route.get("/current",validateToken, getCurrentUser);

module.exports = route;
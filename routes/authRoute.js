const express = require("express");
const route = express.Router();
const {
  register,
  login,
  logout,
  getCurrentUser,
} = require("../controllers/authController");

route.post("/register", register);

route.post("/login", login);

route.post("/logout", logout);

route.get("/current", getCurrentUser);

module.exports = route;

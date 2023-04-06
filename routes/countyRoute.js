const express = require("express");
const {
  getCounties,
  getCountyByCode,
  addCounty,
  addGovernor,
} = require("../controllers/countyController");
const Counties = require("../models/countyModel");

const route = express.Router();

route.get("/", getCounties);

route.get("/:code", getCountyByCode);

route.post("/add", addCounty);

route.put("/:code/governor", addGovernor);

module.exports = route;

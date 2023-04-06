const express = require("express");
const {
  getCounties,
  getCountyByCode,
  addCounty,
  addGovernor,
  getGovernor,
} = require("../controllers/countyController");
const Counties = require("../models/countyModel");

const route = express.Router();

route.get("/", getCounties);

route.get("/:code", getCountyByCode);

route.post("/add", addCounty);

route.put("/:code/governor", addGovernor);

route.get("/:code/governor", getGovernor);


module.exports = route;

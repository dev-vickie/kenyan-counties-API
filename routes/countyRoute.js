const express = require("express");
const {getCounties,getCountyByCode} = require("../controllers/countyController");
const Counties = require("../models/countyModel");

const route = express.Router();

route.get("/",getCounties );

route.get("/:code", getCountyByCode);

route.post("/add", async (req, res, next) => {
  try {
    const { name, code, flagUrl } = req.body;
    if (!name || !code || !flagUrl) {
      res.status(400).send("All fields are required");
    }
    const county = await Counties.create({
      name,
      code,
      flagUrl,
    });
    res.send(county);
  } catch (err) {
    next(err);
  }
});

module.exports = route;

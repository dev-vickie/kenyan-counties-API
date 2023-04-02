const e = require("express");
const express = require("express");
const Counties = require("../models/countyModel");

const route = express.Router();

route.get("/", async (req, res, next) => {
  try {
    const counties = await Counties.find();
    res.status(200).json(counties);
  } catch (error) {
    next(error);
  }
});

route.get("/:code",async (req, res, next) => {
  try {
    const code = req.params.code;
    const county =await Counties.findOne({code});
    if (!county) {
      res.status(400).send("County not found");
    }
    res.status(200).json(county);
  } catch (err) {
    next(err);
  }
});

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

const { count } = require("../models/countyModel");
const Counties = require("../models/countyModel");

//@desc Get all counties sorted by their county codes
//@route GET /api/counties
//@access public
const getCounties = async (req, res, next) => {
  try {
    const counties = await Counties.find().sort({ code: 1 });
    res.status(200).json(counties);
  } catch (error) {
    next(error);
  }
};

//@desc Get one county by its code
//@route GET /api/counties/:code
//@access public
const getCountyByCode = async (req, res, next) => {
  try {
    const code = req.params.code;
    const county = await Counties.findOne({ code });
    if (!county) {
      res.status(400).send("County with that code does not exist");
    } else {
      res.status(200).json(county);
    }
  } catch (err) {
    next(err);
  }
};

//@desc Add a county
//@route POST /api/counties/
//@access public
const addCounty = async (req, res, next) => {
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
};

//@desc Add a county governor per code
//@route PUT /api/counties/:code/governor
//@access public
const addGovernor = async (req, res, next) => {
  try {
    const code = req.params.code;
    const { governor } = req.body;
    if (!code) {
      res.status(400).send("County code must be provided");
    } else {
      const searchCounty = await Counties.findOne({ code: code });
      if (!searchCounty) {
        res.status(400).send("County with that code does not exist");
      } else {
        searchCounty.governor = governor;
        await searchCounty.save();
        res.status(200).send(`${code} governor added successfully`);
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getCounties, getCountyByCode, addCounty, addGovernor };

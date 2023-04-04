const Counties = require("../models/countyModel");

//@desc Get all counties
//@route GET /api/counties
//@access public
const getCounties = async (req, res, next) => {
  try {
    const counties = await Counties.find();
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
}

module.exports = { getCounties, getCountyByCode ,addCounty };

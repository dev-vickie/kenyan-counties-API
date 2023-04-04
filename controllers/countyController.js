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
}

module.exports = getCounties;
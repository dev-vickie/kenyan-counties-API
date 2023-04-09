const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc register a user
//@route POST /api/auth/register
//@access public
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("HashedPassword :", hashedPassword);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log("User created:", user);
    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    next(err);
  }
};

//@desc login a user
//@route POST /api/auth/login
//@access public
const login = async (req, res) => {
  try{const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  const userExists = await User.findOne({ email });
  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: userExists.name,
          email: userExists.email,
          id: userExists._id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1m" },
    );
    return res.status(200).json({ accessToken : accessToken});
  } else {
    return res.status(400).json({ message: "Incorrect email or password" });
  }
}catch (err) {
    next(err);
}
};

//@desc log out user
//@route POST /api/auth/logout
//@access public
const logout = async (req, res) => {
  res.status(200).json({ message: "logging out user" });
};

//@desc get current user
//@route GET /api/auth/current
//@access private
const getCurrentUser = async (req, res) => {
  res.status(200).json({ message: "getting current user" });
};

module.exports = { register, login, logout, getCurrentUser };

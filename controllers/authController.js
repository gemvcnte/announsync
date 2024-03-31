const { Admin } = require("../models/adminSchema");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const adminLogin = expressAsyncHandler(async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    if (!emailAddress || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ emailAddress });

    if (!existingAdmin) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const comparePassword = await bcrypt.compare(
      existingAdmin.password,
      password,
    );

    if (!comparePassword) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_KEY);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

module.exports = {
  adminLogin,
};

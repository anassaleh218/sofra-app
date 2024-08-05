const { User } = require("../models/UserModelDB");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userValidator = require("../middleware/UserValidatorMW");

// Regestration
// user can't add value to isAdmin while registeration, make it manually for first admin then use admin route

router.post("/", userValidator, async (req, res) => {
  try {

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) return res.status(400).send("User already exists");

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ errors: [{ message: "Passwords do not match" }] });
    }

    // Hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPswd = await bcrypt.hash(req.body.password, salt);

    // Create new user without isAdmin field
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPswd,
      address: req.body.address,
      mobile: req.body.mobile

    });


    // Generate token
    const token = jwt.sign(
      { userid: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "72h" }
    );

    // Send response with token
    res.header("x-auth-token", token);
    const data = {
      token: token,
      userName: user.name
    };
    return res.status(200).send(data);

  } catch (err) {
    console.error('Error:', err.message);

    // Improved error handling
    let errorMessage = "Data of user not added";
    if (err.name === 'SequelizeValidationError') {
      errorMessage = err.errors.map(e => e.message).join(', ');
    } else if (err.name === 'SequelizeUniqueConstraintError') {
      errorMessage = 'User with this email already exists';
    }
  }
})

module.exports = router;
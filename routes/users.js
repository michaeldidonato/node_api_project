const express = require("express");
const router = express.Router();
const User = require("../models/users");
const getUserById = require("../middlewares/users");
const validator = require("email-validator");

// GET
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET Single user
router.get("/:id", getUserById, async (req, res) => {
  res.json(res.user);
});

// Create
router.post("/", async (req, res) => {
  const { name, lastName, email } = req.body;

  const isValidEmail = validator.validate(email);
  let user;

  if (isValidEmail) {
    user = new User({
      name,
      lastName,
      email,
    });
  } else {
    return res.status(400).json({ message: "email format not valid" });
  }

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400);
  }
});

//Update
router.patch("/:id", getUserById, async (req, res) => {
  const { name, lastName, email } = req.body;

  if (name) {
    res.user.name = name;
  }

  if (lastName) {
    res.user.lastName = lastName;
  }

  const isValidEmail = validator.validate(email);

  if (isValidEmail) {
    res.user.email = email;
  } else {
    return res.status(400).json({ message: "email format not valid" });
  }

  try {
    const updateUser = await res.user.save();
    res.json(updateUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete
router.delete("/:id", getUserById, async (req, res) => {
  try {
    await res.user.deleteOne({ _id: req.params.id });
    res.json({ message: "deleted user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

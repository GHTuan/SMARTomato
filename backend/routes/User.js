const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

router.get("/user/", requireLogin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: "User not found" });
  }
});

router.post("/user/", requireLogin, (req, res) => {
  const { name, email, address, phoneno, password } = req.body;
  User.findOne({ _id: req.user._id })
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ error: "Incorrect current password" });
      }
      user.name = name;
      user.email = email;
      user.address = address;
      user.phoneno = phoneno;
      user
        .save()
        .then((updatedUser) => {
          res.json({
            name: updatedUser.name,
            email: updatedUser.email,
            address: updatedUser.address,
            phoneno: updatedUser.phoneno,
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Failed to update user information" });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.post("/user/updatePassword/", requireLogin, async (req, res) => {
  const { curPassword, newPassword } = req.body;
  console.log(curPassword, newPassword);
  await User.findOne({ _id: req.user._id })
    .then(async (user) => {
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isPasswordMatch = await bcrypt.compare(curPassword, user.password);
      if (curPassword && !isPasswordMatch) {
        return res.status(400).json({ error: "Incorrect current password" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Update the password
      console.log("hehe", hashedPassword);
      user.password = hashedPassword;
      user
        .save()
        .then((updatedUser) => {
          res.status(200).json({ message: "User info update successfully" });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Failed to update user information" });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;

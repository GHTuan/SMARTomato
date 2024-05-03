const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

router.get(
  "/user/:id",
  // requireLogin,
  (req, res) => {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        res.json({ user });
      })
      .catch((err) => {
        return res.status(404).json({ error: "User not found" });
      });
  }
);

router.post(
  "/user/:id",
  //  requireLogin,
  (req, res) => {
    const { name, email, address, phoneno, password } = req.body;
    console.log(req.body);
    User.findOne({ _id: req.params.id })
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
            res
              .status(500)
              .json({ error: "Failed to update user information" });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  }
);

router.post("/user/updatePassword/:id", requireLogin, (req, res) => {
  const { curPassword, newPassword } = req.body;
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (curPassword && curPassword !== user.password) {
        return res.status(400).json({ error: "Incorrect current password" });
      }
      user.password = newPassword;
      user
        .save()
        .then((updatedUser) => {
          res.json(updatedUser);
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

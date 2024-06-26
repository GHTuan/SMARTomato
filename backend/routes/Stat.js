const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Factor = mongoose.model("Factor");
const User = mongoose.model("User");
const Notification = mongoose.model("Notification");
const Stat = mongoose.model("Stat");

router.get("/stat", requireLogin, async (req, res) => {
  try {
    // Get all factors for the user
    const factors = await Factor.find({ userID: req.user._id });
    // Array to store stats for each factor
    const statArrays = {};

    // Get stats for each factor
    for (const factor of factors) {
      const stats = await Stat.find({ factorID: factor._id });
      statArrays[factor.name] = stats.map((stat) => stat.value);
    }

    // Return stats as an object with arrays for each factor
    return res.status(200).json(statArrays);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/systemmode", requireLogin, async (req, res) => {
  try {
    // Find all factors
    const factors = await Factor.find({ userID: req.user._id });

    // Create an object to store mode of each factor
    const factorModes = {};
    factors.forEach((factor) => {
      factorModes[factor.name] = factor.curmode;
    });

    // Return object containing mode of each factor
    return res.status(200).json(factorModes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/systemmode", requireLogin, (req, res) => {
  Factor.updateMany({ userID: req.user._id }, { curmode: "Auto" })
    .then(() => {
      return res
        .status(200)
        .json({ message: "All factors switched to Auto mode" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;

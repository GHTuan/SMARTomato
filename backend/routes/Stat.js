const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Factor = mongoose.model("Factor");
const User = mongoose.model("User");
const Notification = mongoose.model("Notification");
const Stat = mongoose.model("Stat");

router.get("/stat", requireLogin, (req, res) => {
  //TODO
  // Get all the stat, by there factor return them
  // factor by Userid
  // for each factor get there stat by Factorid
  // save the stat in a array (there will be 4 array)
  // return all the array of stat  res.json({soil:array,  })
});

router.get("/systemmode", requireLogin, async (req, res) => {
  try {
    const factors = await Factor.find({}, "curmode");

    // Check if all factors are in "Auto" mode
    const allAuto = factors.every((factor) => factor.curmode === "Auto");

    // Return mode based on allAuto
    const mode = allAuto ? "Auto" : "Manual";
    return res.status(200).json({ mode });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/systemmode",
  //  requireLogin,
  (req, res) => {
    console.log("keke");
    //TODO
    //Auto => all factor => auto
    Factor.updateMany({}, { curmode: "Auto" })
      .then(() => {
        return res
          .status(200)
          .json({ message: "All factors switched to Auto mode" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      });
  }
);

module.exports = router;

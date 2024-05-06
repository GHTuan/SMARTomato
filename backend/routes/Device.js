const express = require("express");
const router = express.Router();
const itemRouter = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const humidFactor = require("../middleware/humidFactor");
const tempFactor = require("../middleware/tempFactor");
const soilFactor = require("../middleware/soilFactor");
const lightFactor = require("../middleware/lightFactor");
const Factor = mongoose.model("Factor");

const { refreshDevice, toggleDevice } = require("../internal/dataFlow");

router.get("/hello", (req, res) => {
  return res.json({ message: "Hello" });
});
// Getting factor for each middle route
router.use("/humid", humidFactor, itemRouter);
router.use("/temp", tempFactor, itemRouter);
router.use("/soil", soilFactor, itemRouter);
router.use("/light", lightFactor, itemRouter);

itemRouter.get("/mode", (req, res) => {
  return res.json({
    mode: req.factor.curmode,
    devicestt: req.factor.devicestt,
  });
});

itemRouter.post("/mode", (req, res) => {
  console.log("lele");
  const { mode, devicestt } = req.body;
  console.log(mode, devicestt);
  ///
  if (mode == "Auto") {
    if (req.factor.curmode == "Auto") {
      //same auto settings
      return res.status(200).json({ message: "The same settings" });
    } else {
      //change from manual to auto
      Factor.findByIdAndUpdate("6637bffc41c64d2ecaa27573", {
        curmode: mode,
        devicestt: devicestt,
      }).then(() => {
        return res.status(200).json({ message: "Change manual to auto" });
      });
    }
  }
  if (mode == "Manual") {
    if (req.factor.curmode == "Manual") {
      //same manual settings
      //check devicestt
      if (req.factor.devicestt == devicestt) {
        return res.status(200).json({ message: "The same settings" });
      } else {
        // console.log(req.factor.devicestt)
        // console.log(devicestt)
        Factor.findByIdAndUpdate("6637bffc41c64d2ecaa27573", {
          curmode: mode,
          devicestt: devicestt,
        }).then(() => {
          toggleDevice("6637bffc41c64d2ecaa27573", devicestt, "User");
          return res
            .status(200)
            .json({ message: "Change manual to manual with " + devicestt });
        });
      }
    } else {
      //change from auto to manual with devicestt
      Factor.findByIdAndUpdate("6637bffc41c64d2ecaa27573", {
        curmode: mode,
        devicestt: devicestt,
      }).then(() => {
        toggleDevice("6637bffc41c64d2ecaa27573", devicestt, "User");
        return res
          .status(200)
          .json({ message: "Change manual to manual with " + devicestt });
      });
    }
  }
  //More log needed for switching modes
});

itemRouter.get("/current", (req, res) => {
  //TODO
  // get the current value
});

itemRouter.post("/refresh", async (req, res) => {
  const data = await refreshDevice("6637bffc41c64d2ecaa27573");

  if (!data) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
  res.json({ data: data });
});

itemRouter.get("/threshold", (req, res) => {
  //TODO
  return res.json({
    lowerbound: req.factor.lowbound,
    upperbound: req.factor.upbound,
  });
});

itemRouter.post("/threshold", (req, res) => {
  //TODO
  //Set the factoy threshold
});

module.exports = router;

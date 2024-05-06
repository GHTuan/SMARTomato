const mongoose = require("mongoose");
const Factor = mongoose.model("Factor");

module.exports = (req, res, next) => {
  Factor.findOne({ UserID: "6634a796238b4a0966a87f08", name: "Humidity" }).then(
    (result) => {
      if (!result) {
        //No value found create a new one
        const newFactor = new Factor({
          userID: "6634a796238b4a0966a87f08",
          name: "Humidity",
          lowbound: 0,
          upbound: 100,
        });
        newFactor.save();
        // console.log("Create new factor")
        req.factor = newFactor;
        next();
      } else {
        // Setthe new factor to futher process
        req.factor = result;
        next();
      }
    }
  );
};

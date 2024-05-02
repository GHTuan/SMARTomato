const mongoose = require('mongoose')
const Factor = mongoose.model("Factor")
const {refreshDevice} = require('./dataFlow.js')

setInterval(() => {
  Factor.find()
  .then((result) => {
    result.forEach((item) => {
      // console.log(item._id)

      // Don't touch this function please
      // Remenmber to turn this off when not testing 
      
      //! refreshDevice(item._id)
    })
  })

  }, 10000);
  

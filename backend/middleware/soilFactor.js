const mongoose = require('mongoose')
const Factor = mongoose.model("Factor")

module.exports = (req,res,next)=>{
    Factor.findOne({ UserID:req.user._id, name:"Moisture"})
    .then(result=>{
        if (!result){
            //No value found create a new one
            const newFactor = new Factor({
                userID:req.user._id,
                name:"Moisture",
                lowbound:0,
                upbound:100,
            })
            newFactor.save()
            // console.log("Create new factor")
            req.factor = newFactor
            next()
        } else {
            // Setthe new factor to futher process
            req.factor = result
            next()
        }
    })
}
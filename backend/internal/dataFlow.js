const mongoose = require('mongoose')
const Factor = mongoose.model("Factor")
const Stat = mongoose.model("Stat")
const ActivityLog = mongoose.model("ActivityLog")

const {fetchData, controlDevice} = require('./../models/Adafruit')
const { PureComponent } = require('react')

async function toggleDevice(deviceName,value,by) {
    const result = await Factor.findById(factorID)
    if(result){
        var feedName = ""
        if (result.name == "Temperature"){ 
            feedName = "fan"
        }
        if (result.name == "Humidity"){ 
            feedName = "awning";
        }
        if (result.name == "Light"){ 
            feedName = "light";
        }
        if (result.name == "Moisture"){ 
            feedName = "pump";
        }
        controlDevice(feedName,value)
        //Logging activity
        var content = "";
        if (value == true){
            content = by + "has just turn on garden's " + feedName
        }
        else{
            content = by + "has just turn off garden's " + feedName
        }
        const newActivityLog = new ActivityLog({
            userID:result.userID,
            content:content,
        })
        newActivityLog.save()
        return newActivityLog
    }
}

// Gọi fetchData với các feedName cần lấy dữ liệu
async function refreshDevice(factorID){
    const result = await Factor.findById(factorID)
   
    var data = 0;
    if (result.name == "Temperature"){ 
        data = await fetchData("temperature-sensor");
    }
    if (result.name == "Humidity"){ 
        data = await fetchData("humidity-sensor")
    }
    if (result.name == "Light"){ 
        data = await fetchData("light-sensor");
    }
    if (result.name == "Moisture"){ 
        data = await fetchData("soil-moisture-sensor");
    }
    console.log("FetchData function completed :" + data);
    if (!data){
        console.log("Fetch failed: " + data);
        return
    }
    // Update for this factor
    if (result) {
        // Create stat 
        console.log("Create new stat")
        const newStat = new Stat({
            factorID: factorID,
            value: data,
            unit: "All"
        })
        newStat.save();
        // Check auto
        if (result.curmode == "Auto"){
            //Auto logic goes here
            if (result.devicestt == false && (data >= result.upbound || data <= result.lowbound))
                toggleDevice(factorID,true,"automatic mode");
            else if (result.devicestt == true && (data < result.upbound && data > result.lowbound)){
                toggleDevice(factorID,false,"automatic mode");
            }
        }
        else 
        {
            if (data >= result.upbound || data <= result.lowbound){
                // Out of bound but no auto, send notification
                 
                //TODO
            }
        }
        return data
    }
    else
    {
        console.log("Ugh this not supposed to be happen")
    }
    
}

function createNewNotification(userID,title,content,device){
    // TODO
    // Yen lam nha

}

module.exports = {refreshDevice, toggleDevice}



// 30s
// moi <= pump  else -> 
// moi => notify 

// 
// temp <= notify
// temp >= fan  else -> 

//
// light <= led  else -> 
// light >= awning  else -> 

//
// humid <= notify
// humid => notify
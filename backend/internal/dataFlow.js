const mongoose = require('mongoose')
const Factor = mongoose.model("Factor")
const Stat = mongoose.model("Stat")
const ActivityLog = mongoose.model("ActivityLog")
const User = mongoose.model("User")
const Notification = mongoose.model("Notification")
const Device = mongoose.model("Device")

const {fetchData, controlDevice} = require('./../models/Adafruit')
const { PureComponent } = require('react')

async function toggleDevice(userID,feedName,value,by) {
    
    if (feedName != "fan" && feedName != "awning" && feedName != "pump" && feedName != "light"){
        console.log("Wrong device")
        return false;
    }

    var device = await Device.findOne({id: userID, name: feedName})
    if (!device){
        //Create new device
        const newDevice = await new Device({
            userID:userID,
            name:feedName,
            state:value,
        })
        newDevice.save()
        device = newDevice
    } else {
        // If is already state
        // if (device.state == value)
        //     return false
    }
    await Device.findOneAndUpdate({userID: userID, name: feedName}, {state:value})
    controlDevice(feedName,value)
    //Logging activity
    var content = "";
    if (value == true){
        content = by + " has just turn on garden's " + feedName
    }
    else{
        content = by + " has just turn off garden's " + feedName
    }
    console.log(content)
    const newActivityLog = new ActivityLog({
        userID:userID,
        content:content,
    })
    newActivityLog.save()
    return true;
   
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
    console.log("FetchData "+ result.name +" function completed: " + data);
    if (!data){
        console.log("Fetch failed: " + data);
        return
    }
    // Update for this factor
    if (result) {
        // Create stat 
        // console.log("Create new stat")

        // const newStat = new Stat({
        //     factorID: factorID,
        //     value: data,
        //     unit: "Unit"
        // })
        // newStat.save();

        // Check auto
        if (result.curmode == "Auto"){
            //Auto logic goes here
            if (result.name == "Moisture"){
                //upper bound
                if (data >= result.upbound){
                    createNewNotification(result.userID, "High Moisture", "High Moist", result.name)
                }
                //lower bound
                if (data <= result.lowbound){
                    toggleDevice(result.userID,"pump",1,"automatic mode");
                } else {
                    toggleDevice(result.userID,"pump",0,"automatic mode");
                }
            }
            if (result.name == "Temperature"){
                //upper bound
                if (data >= result.upbound)
                    toggleDevice(result.userID,"fan",1,"automatic mode");
                else {
                    toggleDevice(result.userID,"fan",0,"automatic mode");
                }
                //lower bound
                if (data <= result.lowbound){
                    createNewNotification(result.userID, "Low Temperature", "Low Temperature", result.name)
                }
            }
            if (result.name == "Light"){
                console.log("Light: "+data)
                //upper bound
                if (data >= result.upbound){
                    toggleDevice(result.userID,"awning",1,"automatic mode");
                } else {
                    toggleDevice(result.userID,"awning",0,"automatic mode");
                }
                //lower bound
                if (data <= result.lowbound){
                    toggleDevice(result.userID,"light",1,"automatic mode");
                } else {
                    toggleDevice(result.userID,"light",0,"automatic mode");
                }
            }

            if (result.name == "Humidity"){
                //upper bound
                if (data >= result.upbound){
                    createNewNotification(result.userID,"Humidity threshold exceeded","Humidity threshold exceeded",result.name)
                }
                //lower bound
                if (data <= result.upbound){
                    createNewNotification(result.userID,"Humidity threshold exceeded","Humidity threshold exceeded",result.name)
                }
            }
        
        }
        else 
        {
            if (data >= result.upbound || data <= result.lowbound){
                // Out of bound but no auto, send notification
                createNewNotification(result.userID,"Device threshold exceeded","Device threshold exceeded",result.name)
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
    

}

module.exports = {refreshDevice, toggleDevice}



// Moisture
// moi <= pump  else -> 
// moi => notify 

// Temperature
// temp <= notify
// temp >= fan  else -> 

// Light
// light <= led  else -> 
// light >= awning  else -> 

// Humidity
// humid <= notify
// humid => notify
import React, { useEffect, useMemo } from 'react';
import {View, Text, SafeAreaView, ImageBackground} from 'react-native';
import DisplayCard from './Components/DisplayCard';
import AutomaticCard from './Components/AutomaticCard';
import ManualCard from './Components/ManualCard';
import { TempSetting, SoilSetting, HumiditySetting, LightSetting}  from './DeviceSetting'
import { useState } from 'react';
import { YStack ,ScrollView, Image } from 'tamagui';
import { ArrowLeft } from '@tamagui/lucide-icons';
import AsyncStorage from '@react-native-community/async-storage';

const DeviceScreen = (props) => {
  const [deviceSetting,setDeviceSetting] = useState(SoilSetting)
  const [manualFill,setManualFill] = useState(false)
  const [automaticFill,setAutomaticFill] = useState(false)
  useMemo(() => {
  if (props.device == "Temperature") {
      setDeviceSetting(TempSetting)
    } else if (props.device == "SoilMoisture") {
      setDeviceSetting(SoilSetting)
    } else if (props.device == "Humidity") {
      setDeviceSetting(HumiditySetting)
    } else if (props.device == "Light") {
      setDeviceSetting(LightSetting)
    }
  },[props.device])
  
  function updateFill(mode,state){
    console.log(mode + ", " + state) 

    if (mode == "Manual"){
      setAutomaticFill(false)
      if (state == true){
        setManualFill(true)
      } else {
        setManualFill(false)
      }
  } else {
      setAutomaticFill(true)
      setManualFill(false)
  }
  console.log("Manual Fill: " + manualFill + ", automatic fill: " + automaticFill)
  }

  useEffect(() => {    
    async function fetchData(){    
      const token = await AsyncStorage.getItem('token');
      const api = deviceSetting.api + "/mode"; 
      fetch(api,{
          method: 'PUT',
          headers: {
              //Header Defination
              "Content-Type":"application/json",
              "Authorization":"Bearer "+ JSON.parse(token)
          },
          body: JSON.stringify({
              reqdevice: deviceSetting.device
          })
      })
      .then((response) => response.json())
      .then((response) => {
          updateFill(response.mode,response.state)
      })
    }
    fetchData();
}
    ,[props.device]);

    const updateState = async (mode,state) => {
      console.log(mode)
      console.log(state)
      updateFill(mode,state)
      const token = await AsyncStorage.getItem('token');
      const api = deviceSetting.api + "/mode"
      await fetch(api,{
          method: 'POST',
          headers: {
              //Header Defination
              "Content-Type":"application/json",
              "Authorization":"Bearer "+ JSON.parse(token)
          },
          body: JSON.stringify({
              reqdevice: deviceSetting.device,
              mode: mode,
              state: state
          })
      })
      .then((response) => response.json())
      .then((response) =>{
          console.log(response)
      })
    }
  return (
    <ScrollView>
      <ImageBackground source={require('./image/bg.png')}
        style={{height: 180, width: '100%', position: 'absolute' }}>
      </ImageBackground>
      <YStack style = {{flex:1,color:'white',alignItems:'center' ,justifyContent:'space-between',flexDirection:'row', margin: 20, marginBottom:10}}>
        <ArrowLeft color={'white'} size={'$2'}></ArrowLeft>
        <Text style = {{fontWeight:'bold',fontSize:18}}
        onPress={()=> {props.goBack}}
        >
        {deviceSetting.title} Settings
        </Text>
        <Image source={require('./image/BK-logo.png')}
        style={{height: 40, width: 40}}
        />
      </YStack>
      <YStack style = {{flex:1 , justifyContent: 'center', alignItems:'center', flexDirection: 'column', margin:20, backgroundColor:'transparent'}}>
      <DisplayCard 
        setting = {deviceSetting}
        >
      </DisplayCard>
      
      <ManualCard 
        setting = {deviceSetting}
        fill = {manualFill}
        update = {updateState}
        >
      </ManualCard>

      <AutomaticCard 
        setting = {deviceSetting}
        fill = {automaticFill}
        update = {updateState}
        >
      </AutomaticCard>
      

      </YStack>
    </ScrollView>
  );
};

export default DeviceScreen;
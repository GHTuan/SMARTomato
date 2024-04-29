import React, { useEffect, useMemo } from 'react';
import {View, Text, SafeAreaView, ImageBackground} from 'react-native';
import DisplayCard from './Components/DisplayCard';
import AutomaticCard from './Components/AutomaticCard';
import ManualCard from './Components/ManualCard';
import { TempSetting, SoilSetting, HumiditySetting, LightSetting}  from './DeviceSetting'
import { useState } from 'react';
import { YStack ,ScrollView, Image } from 'tamagui';
import { ArrowLeft } from '@tamagui/lucide-icons';

const DeviceScreen = (props) => {
  const [deviceSetting,setDeviceSetting] = useState(SoilSetting)
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
        bottomRange = {deviceSetting.bottomRange}
        topRange = {deviceSetting.topRange}
        unitOfMeasure = {deviceSetting.unitOfMeasure}
        title = {deviceSetting.title}
        text = {deviceSetting.text}
        api = {deviceSetting.api}
        >
      </DisplayCard>
      
      <ManualCard 
        bottomRange = {deviceSetting.bottomRange}
        topRange = {deviceSetting.topRange}
        unitOfMeasure = {deviceSetting.unitOfMeasure}
        title = {deviceSetting.title}
        text = {deviceSetting.text}
        api = {deviceSetting.api}
        >
      </ManualCard>

      <AutomaticCard 
        bottomRange = {deviceSetting.bottomRange}
        topRange = {deviceSetting.topRange}
        unitOfMeasure = {deviceSetting.unitOfMeasure}
        title = {deviceSetting.title}
        text = {deviceSetting.text}
        api = {deviceSetting.api}
        >
      </AutomaticCard>
      

      </YStack>
    </ScrollView>
  );
};

export default DeviceScreen;
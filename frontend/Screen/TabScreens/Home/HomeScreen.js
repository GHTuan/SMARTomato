// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useCallback, useState} from 'react';
import {ImageBackground} from 'react-native';
import {H3, H4, Main, ScrollView, Switch, Text, XStack, YStack} from 'tamagui';
import EvironmentFactorsSection from './Section/EvironmentFactorsSection';
import DeviceControlSection from './Section/DeviceControlSection';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = () => {
  const [systemMode, setSystemMode] = useState('Auto');
  const [deviceControl, setDeviceControl] = useState([
    {
      name: 'Humidity',
      deviceName: 'Garden fan',
      deviceStt: true,
    },
    {
      name: 'Light',
      deviceName: 'Garden light',
      deviceStt: true,
    },
    {
      name: 'Moisture',
      deviceName: 'Water pump',
      deviceStt: true,
    },
    {
      name: 'Temperature',
      deviceName: 'Garden roof',
      deviceStt: true,
    },
  ]);

  const [factors, setFactors] = useState([
    {
      name: 'Humidity',
      unit: '%',
      data: [12, 5, 9, 30, 20, 51, 20, 1, 4, 2, 70],
      currentMode: 'Auto',
    },
    {
      name: 'Light',
      unit: 'Lux',
      data: [12, 5, 9, 30, 20, 51, 20, 1, 4, 2, 70],
      currentMode: 'Auto',
    },
    {
      name: 'Moisture',
      unit: '%',
      data: [12, 5, 9, 30, 20, 51, 20, 1, 4, 2, 70],
      currentMode: 'Auto',
    },
    {
      name: 'Temperature',
      unit: '°C',
      data: [12, 5, 9, 30, 20, 51, 20, 1, 4, 2, 70],
      currentMode: 'Auto',
    },
  ]);

  useFocusEffect(
    useCallback(() => {
      const fetchFactorStatData = async () => {
        try {
          const responseStat = await fetch('http://localhost:4000/stat', {
            method: 'GET',
          });
          if (!responseStat.ok) {
            throw new Error('Failed to fetch factor stat');
          }
          const statData = await responseStat.json();
          const responseCurMode = await fetch(
            'http://localhost:4000/systemmode',
            {
              method: 'GET',
            },
          );
          if (!responseCurMode.ok) {
            throw new Error('Failed to fetch factor system mode');
          }
          const curModeData = await responseCurMode.json();
          const updatedFactors = factors.map(factor => ({
            ...factor,
            data: statData[factor.name] || [],
            currentMode: curModeData[factor.name].curMode,
          }));
          setFactors(updatedFactors);
        } catch (err) {
          console.error(err);
        }
      };
      fetchFactorStatData();
    }, [systemMode]),
  );

  useFocusEffect(
    useCallback(() => {
      const fetchSystemMode = async () => {
        try {
          const responseCurMode = await fetch(
            'http://localhost:4000/systemmode',
            {
              method: 'GET',
            },
          );
          if (!responseCurMode.ok) {
            throw new Error('Failed to fetch factor system mode');
          }
          const curModeData = await responseCurMode.json();
          const updatedFactors = factors.map(factor => ({
            ...factor,
            // data: statData[factor.name] || [],
            currentMode: curModeData[factor.name].curMode,
          }));
          setFactors(updatedFactors);
          if (
            Object.values(curModeData).every(
              factor => factor.curMode === 'Auto',
            )
          ) {
            setSystemMode('Auto');
          } else {
            setSystemMode('Manual');
          }
          setDeviceControl(
            deviceControl.map(device => ({
              ...device,
              deviceStt: curModeData[device.name].deviceStt,
            })),
          );
        } catch (err) {
          console.error(err);
        }
      };
      fetchSystemMode();
    }, []),
  );

  const toggleSwitch = async () => {
    // console.log('old', systemMode);
    const newMode = systemMode === 'Auto' ? 'Manual' : 'Auto';
    // console.log('new', newMode);
    setSystemMode(newMode);
    if (newMode === 'Auto') {
      try {
        const response = await fetch('http://localhost:4000/systemmode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${yourToken}`, // Add your token here
          },
          body: JSON.stringify({mode: newMode}),
        });
        if (!response.ok) {
          throw new Error('Failed to update system mode');
        }
        console.log('System mode updated successfully');
      } catch (error) {
        console.error('Error updating system mode:', error);
        setSystemMode(prev => (prev === 'Auto' ? 'Manual' : 'Auto'));
      }
    }
  };

  return (
    <ScrollView backgroundColor="#F5F6FA">
      <ImageBackground
        source={require('./image/main-bg.png')}
        style={{height: 300}}>
        <YStack
          flex={1}
          justifyContent="space-between"
          height={100}
          paddingHorizontal={25}
          paddingVertical={20}>
          <XStack justifyContent="space-between">
            <YStack>
              <H3 color={'white'}>Good morning, Mr. Duy</H3>
              <Text color={'white'}>your smart tomato garden awaits</Text>
            </YStack>
            <ImageBackground
              source={require('./image/BK-logo.png')}
              style={{width: 40, height: 40}}
            />
          </XStack>
          <YStack>
            <H4 color={'white'}>System mode</H4>
            <XStack
              paddingVertical={25}
              alignSelf="center"
              justifyContent="space-evenly"
              width={'100%'}
              alignItems="center">
              <Text color={'white'}>Manual</Text>
              <Switch
                // id={id}
                size={'$10'}
                onCheckedChange={toggleSwitch}
                checked={systemMode === 'Auto'}
                // trackColor= {false: red, true: color}
                // defaultChecked={true}
              >
                <Switch.Thumb animation="quicker" backgroundColor={'green'} />
              </Switch>
              <Text color={'white'}>Auto</Text>
            </XStack>
            <Text color={'white'}>Last modified:</Text>
          </YStack>
        </YStack>
      </ImageBackground>
      <Main paddingHorizontal={25} paddingVertical={10}>
        <EvironmentFactorsSection factors={factors} />
        <DeviceControlSection
          deviceControl={deviceControl}
          factors={factors}
          setDeviceControl={setDeviceControl}
        />
      </Main>
    </ScrollView>
  );
};

export default HomeScreen;

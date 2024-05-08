// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useCallback, useState} from 'react';
import {ImageBackground} from 'react-native';
import {H3, H4, Main, ScrollView, Switch, Text, XStack, YStack} from 'tamagui';
import EvironmentFactorsSection from './Section/EvironmentFactorsSection';
import DeviceControlSection from './Section/DeviceControlSection';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = () => {
  const [systemMode, setSystemMode] = useState('Auto');
  const [deviceControl, setDeviceControl] = useState([
    {
      name: 'fan',
      // deviceName: 'Garden fan',
      state: true,
    },
    {
      name: 'light',
      // deviceName: 'Garden light',
      state: true,
    },
    {
      name: 'awning',
      // deviceName: 'Water pump',
      state: true,
    },
    {
      name: 'pump',
      // deviceName: 'Garden roof',
      state: true,
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  const [factors, setFactors] = useState([
    {
      name: 'Humidity',
      unit: '%',
      data: [],
      currentMode: 'Auto',
    },
    {
      name: 'Light',
      unit: 'Lux',
      data: [],
      currentMode: 'Auto',
    },
    {
      name: 'Moisture',
      unit: '%',
      data: [],
      currentMode: 'Auto',
    },
    {
      name: 'Temperature',
      unit: '°C',
      data: [],
      currentMode: 'Auto',
    },
  ]);

  useFocusEffect(
    useCallback(() => {
      const fetchFactorStatData = async () => {
        setIsLoading(true);
        const token = await AsyncStorage.getItem('token');
        try {
          const responseStat = await fetch('http://localhost:4000/stat', {
            method: 'GET',
            headers: {Authorization: `Bearer ${JSON.parse(token)}`},
          });
          if (!responseStat.ok) {
            throw new Error('Failed to fetch factor stat');
          }
          const statData = await responseStat.json();
          const responseCurMode = await fetch(
            'http://localhost:4000/systemmode',
            {
              method: 'GET',
              headers: {Authorization: `Bearer ${JSON.parse(token)}`},
            },
          );
          if (!responseCurMode.ok) {
            throw new Error('Failed to fetch factor system mode');
          }
          const curModeData = await responseCurMode.json();
          const updatedFactors = factors.map(factor => ({
            ...factor,
            data: statData[factor.name] || [],
            currentMode: curModeData[factor.name],
          }));
          setFactors(updatedFactors);
          setIsLoading(false);
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
        const token = await AsyncStorage.getItem('token');
        try {
          const responseCurMode = await fetch(
            'http://localhost:4000/systemmode',
            {
              method: 'GET',
              headers: {
                Authorization: 'Bearer ' + JSON.parse(token),
              },
            },
          );
          if (!responseCurMode.ok) {
            throw new Error('Failed to fetch factor system mode');
          }
          const curModeData = await responseCurMode.json();
          const updatedFactors = factors.map(factor => ({
            ...factor,
            // data: statData[factor.name] || [],
            currentMode: curModeData[factor.name],
          }));
          setFactors(updatedFactors);
          if (Object.values(curModeData).every(factor => factor === 'Auto')) {
            setSystemMode('Auto');
          } else {
            setSystemMode('Manual');
          }
          // setDeviceControl(
          //   deviceControl.map(device => ({
          //     ...device,
          //     deviceStt: curModeData[device.name].deviceStt,
          //   })),
          // );
        } catch (err) {
          console.error(err);
        }
      };
      fetchSystemMode();
    }, []),
  );

  const toggleSwitch = async () => {
    const token = await AsyncStorage.getItem('token');

    const newMode = systemMode === 'Auto' ? 'Manual' : 'Auto';
    setSystemMode(newMode);
    if (newMode === 'Auto') {
      try {
        const response = await fetch('http://localhost:4000/systemmode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(token),
          },
          body: JSON.stringify({mode: newMode}),
        });
        if (!response.ok) {
          throw new Error('Failed to update system mode');
        }
      } catch (error) {
        console.error('Error updating system mode:', error);
        setSystemMode(prev => (prev === 'Auto' ? 'Maanual' : 'Auto'));
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
                size={'$10'}
                onCheckedChange={toggleSwitch}
                checked={systemMode === 'Auto'}>
                <Switch.Thumb animation="quicker" backgroundColor={'green'} />
              </Switch>
              <Text color={'white'}>Auto</Text>
            </XStack>
            <Text color={'white'}>Last modified:</Text>
          </YStack>
        </YStack>
      </ImageBackground>
      <Main paddingHorizontal={25} paddingVertical={10}>
        <EvironmentFactorsSection factors={factors} isLoading={isLoading} />
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

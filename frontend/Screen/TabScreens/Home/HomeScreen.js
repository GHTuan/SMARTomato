// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import {
  CloudSun,
  Droplet,
  Droplets,
  Fan,
  Lightbulb,
  Sun,
  ThermometerSun,
} from '@tamagui/lucide-icons';
import React, {useEffect, useState} from 'react';
import {ImageBackground} from 'react-native';
import {
  H3,
  H4,
  Main,
  ScrollView,
  Switch,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui';
import {tw} from '../../../tailwind';
import Card from './Components/Card';
import DeviceControlCard from './Components/DeviceControlCard';
import {LineGraph} from './Components/LineGraph';
import EvironmentFactorsSection from './EvironmentFactorsSection';

const HomeScreen = () => {
  const [systemMode, setSystemMode] = useState('Auto');

  useEffect(() => {
    const fetchFactorModes = async () => {
      try {
        const response = await fetch('http://localhost:4000/systemmode', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch factor modes');
        }
        const data = await response.json();
      } catch (error) {
        console.error(error);
      }
    };
    fetchFactorModes();
  }, []);

  const toggleSwitch = async () => {
    console.log(systemMode);
    const newMode = systemMode === 'Auto' ? 'Manual' : 'Auto';
    setSystemMode(newMode);
    if (systemMode === 'Auto') {
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
                checked={systemMode === 'Manual'}
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
        <EvironmentFactorsSection systemMode={systemMode} />
        <YStack paddingVertical={10}>
          <H4>Device controls</H4>
          <XStack flexWrap="wrap" justifyContent="space-between" paddingTop={5}>
            <DeviceControlCard
              name={'Garden fan'}
              icon={<Fan color={'white'} size={22} />}
            />
            <DeviceControlCard
              name={'Garden light'}
              icon={<Lightbulb color={'white'} size={22} />}
            />
            <DeviceControlCard
              name={'Water pump'}
              icon={<Droplets color={'white'} size={22} />}
            />
            <DeviceControlCard
              name={'Garden roof'}
              icon={<CloudSun color={'white'} size={22} />}
            />
          </XStack>
        </YStack>
      </Main>
    </ScrollView>
  );
};

export default HomeScreen;

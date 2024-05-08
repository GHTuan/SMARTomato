import {CloudSun, Droplets, Fan, Lightbulb} from '@tamagui/lucide-icons';
import React, {useCallback} from 'react';
import {H4, XStack, YStack} from 'tamagui';
import DeviceControlCard from '../Components/DeviceControlCard';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

function DeviceControlSection({deviceControl, setDeviceControl}) {
  useFocusEffect(
    useCallback(() => {
      const getDeviceControl = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
          const response = await fetch('http://localhost:4000/mode', {
            method: 'GET',
            headers: {Authorization: `Bearer ${JSON.parse(token)}`},
          });
          if (!response.ok)
            throw new error('Fail fetching device control status');
          const data = await response.json();
          const updatedDeviceControl = deviceControl.map(device => ({
            ...device,
            state: data[device.name],
          }));
          setDeviceControl(updatedDeviceControl);
        } catch (err) {
          console.error(err);
        }
      };
      getDeviceControl();
    }, []),
  );
  const getIcon = name => {
    switch (name) {
      case 'fan':
        return <Fan size={22} color={'white'} />;
      case 'light':
        return <Lightbulb size={22} color={'white'} />;
      case 'pump':
        return <Droplets size={22} color={'white'} />;
      case 'awning':
        return <CloudSun size={22} color={'white'} />;
      default:
        return null;
    }
  };
  return (
    <YStack paddingVertical={10}>
      <H4>Device controls</H4>
      <XStack flexWrap="wrap" justifyContent="space-between" paddingTop={5}>
        {deviceControl
          // .map(device => ({
          //   ...device,
          //   curMode: factors.find(factor => factor.name === device.name)
          //     .currentMode,
          // }))
          .map(device => (
            <DeviceControlCard
              name={device.name}
              icon={getIcon(device.name)}
              // curMode={device.curMode}
              value={device.state}
              setDeviceControl={setDeviceControl}
            />
          ))}
      </XStack>
    </YStack>
  );
}

export default DeviceControlSection;

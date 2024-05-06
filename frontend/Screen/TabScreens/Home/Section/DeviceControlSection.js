import {CloudSun, Droplets, Fan, Lightbulb} from '@tamagui/lucide-icons';
import React from 'react';
import {H4, XStack, YStack} from 'tamagui';
import DeviceControlCard from '../Components/DeviceControlCard';

function DeviceControlSection({deviceControl, setDeviceControl, factors}) {
  const getIcon = name => {
    switch (name) {
      case 'Humidity':
        return <Fan size={22} color={'white'} />;
      case 'Light':
        return <Lightbulb size={22} color={'white'} />;
      case 'Moisture':
        return <Droplets size={22} color={'white'} />;
      case 'Temperature':
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
          .map(device => ({
            ...device,
            curMode: factors.find(factor => factor.name === device.name)
              .currentMode,
          }))
          .map(device => (
            <DeviceControlCard
              name={device.deviceName}
              icon={getIcon(device.name)}
              curMode={device.curMode}
              setDeviceControl={setDeviceControl}
            />
          ))}
      </XStack>
    </YStack>
  );
}

export default DeviceControlSection;

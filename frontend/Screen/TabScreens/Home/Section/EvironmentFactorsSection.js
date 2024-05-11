import {Droplet, Droplets, Sun, ThermometerSun} from '@tamagui/lucide-icons';
import React from 'react';
import {H3, XStack, YStack} from 'tamagui';
import {tw} from '../../../../tailwind';
import Card from '../Components/Card';
import {LineGraph} from '../Components/LineGraph';

function EvironmentFactorsSection({factors, isLoading}) {
  const getIcon = name => {
    switch (name) {
      case 'Humidity':
        return <Droplets size={20} />;
      case 'Light':
        return <Sun size={20} />;
      case 'Soil moisture':
        return <Droplet size={20} />;
      case 'Temperature':
        return <ThermometerSun size={20} />;
      default:
        return null;
    }
  };
  const getColor = name => {
    switch (name) {
      case 'Humidity':
        return 'blue';
      case 'Light':
        return 'orange';
      case 'Moisture':
        return 'green';
      case 'Temperature':
        return 'red';
      default:
        return null;
    }
  };

  return (
    <YStack>
      <H3>Environment factors</H3>
      <XStack
        paddingTop={10}
        flexWrap="wrap"
        rowGap={15}
        justifyContent="space-between">
        {factors.map(factor => (
          <Card
            // marginVertical={10}
            isLoading={isLoading}
            name={factor.name}
            currentValue={`${factor.data.slice(-1)} ${factor.unit}`}
            currentMode={factor.currentMode}
            icon={getIcon(factor.name)}>
            <LineGraph data={factor.data} style={[tw`mb-4`]} color="red" />
          </Card>
        ))}
      </XStack>
    </YStack>
  );
}

export default EvironmentFactorsSection;

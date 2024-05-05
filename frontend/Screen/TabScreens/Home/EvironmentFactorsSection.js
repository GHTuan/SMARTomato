import React, {useState} from 'react';
import {H3, XStack, YStack} from 'tamagui';
import Card from './Components/Card';
import {LineGraph} from './Components/LineGraph';
import {Droplet, Droplets, Sun, ThermometerSun} from '@tamagui/lucide-icons';
import {tw} from '../../../tailwind';

function EvironmentFactorsSection() {
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
  const [factors, setFactors] = useState([
    {
      name: 'Humidity',
      currentValue: '70%',
      data: [12, 5, 9, 30, 20, 51, 20, 1, 4, 2, 70],
      currentMode: 'Auto',
    },
    {
      name: 'Light',
      currentValue: '600 Lux',
      data: [12, 5, 9, 30, 20, 51, 20, 1, 4, 2, 70],
      currentMode: 'Auto',
    },
    {
      name: 'Soil moisture',
      currentValue: '55%',
      data: [12, 5, 9, 30, 20, 51, 20, 1, 4, 2, 70],
      currentMode: 'Auto',
    },
    {
      name: 'Temperature',
      currentValue: '30°C',
      data: [12, 5, 9, 30, 20, 51, 20, 1, 4, 2, 70],
      currentMode: 'Auto',
      icon: <Droplets size={20} />,
    },
  ]);

  return (
    <YStack>
      <H3>Environment factors</H3>
      <XStack
        paddingTop={10}
        // flex={2}
        // alignContent="stretch"
        flexWrap="wrap"
        rowGap={15}
        justifyContent="space-between">
        {factors.map(factor => (
          <Card
            // marginVertical={10}
            name={factor.name}
            currentValue={factor.currentValue}
            currentMode={factor.currentMode}
            icon={getIcon(factor.name)}>
            <LineGraph
              data={factor.data}
              style={[tw`mb-4`]}
              color="rose"
              label="views"
              stat="120k"
            />
          </Card>
        ))}
      </XStack>
    </YStack>
  );
}

export default EvironmentFactorsSection;

import React, {useCallback, useEffect, useState} from 'react';
import {H3, XStack, YStack} from 'tamagui';
import Card from './Components/Card';
import {LineGraph} from './Components/LineGraph';
import {Droplet, Droplets, Sun, ThermometerSun} from '@tamagui/lucide-icons';
import {tw} from '../../../tailwind';
import {useFocusEffect} from '@react-navigation/native';

function EvironmentFactorsSection({systemMode}) {
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
        console.log('hehe');
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
            currentMode: curModeData[factor.name],
          }));
          setFactors(updatedFactors);
        } catch (err) {
          console.error(err);
        }
      };
      fetchFactorStatData();
    }, [systemMode]),
  );

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
            currentValue={`${factor.data.slice(-1)} ${factor.unit}`}
            currentMode={factor.currentMode}
            icon={getIcon(factor.name)}>
            <LineGraph data={factor.data} style={[tw`mb-4`]} color="rose" />
          </Card>
        ))}
      </XStack>
    </YStack>
  );
}

export default EvironmentFactorsSection;

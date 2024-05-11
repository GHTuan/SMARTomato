// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Text, View, XStack } from 'tamagui';
import { ScrollView } from 'react-native-gesture-handler';
import { style } from 'twrnc';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { LineGraph } from './components/LineGraph';
import { tw } from '../../../tailwind';
import Select from './components/SelectButton';

const StatisticsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(
    {
      'Humidity': [],
      'Light': [],
      'Moisture': [],
      'Temperature': [],
    },
  );
  const [chosenFactor, setChosenFactor] = useState('Humidity');
  const [chosenStat, setChosenStat] = useState([]);
  const [actLog, setActLog] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchStatsData = async () => {
        setIsLoading(true);
        const token = await AsyncStorage.getItem('token');
        try {
          const responseStat = await fetch('http://localhost:4000/stat', {
            method: 'GET',
            headers: { Authorization: `Bearer ${JSON.parse(token)}` },
          });
          if (!responseStat.ok) {
            throw new Error('Failed to fetch factor stat');
          }
          const statData = await responseStat.json();


          const responseActLog = await fetch(
            'http://localhost:4000/log',
            {
              method: 'GET',
              headers: {
                Authorization: 'Bearer ' + JSON.parse(token),
              },
            },
          );
          if (!responseActLog.ok) {
            throw new Error('Failed to fetch activity log');
          }
          const actLogData = await responseActLog.json();
          setActLog(actLogData);


          setStats(statData);
          setChosenStat(statData[chosenFactor]);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
        }
      };
      fetchStatsData();
    }, []),
  );

  useEffect(() => {
    setChosenStat(stats[chosenFactor])
  }, [chosenFactor])

  return (
    <View height={'100%'} >
      <ImageBackground source={require('./Image/bg.png')}
        style={{ height: 300, width: '100%', position: 'absolute' }}>
      </ImageBackground>

      <View style={{ marginVertical: 20 }} />
      <Text alignSelf='center' fontWeight={'bold'} fontSize={25} color={'white'}>Statistics</Text>

      <View style={{ ...styles.partition, paddingVertical: 20 }}>
        <XStack justifyContent='space-between'>
          <Text style={styles.headerText}>Insights</Text>
          <View width={120} marginHorizontal={20} ><Select val={chosenFactor} setVal={setChosenFactor} /></View>
        </XStack>
        <View style={style.square}>
          <View style={{ ...styles.body, paddingHorizontal: 20 }} >
            <LineGraph data={chosenStat} style={[tw`mb-4`]} color="rose" />
          </View>

        </View>
      </View>


      <View style={styles.partition}>
        <Text style={styles.headerText}>Activity Log</Text>

        <ScrollView style={styles.body}>
          {actLog.map((log) =>
          (<View style={styles.item}>
            <View width={'60%'} >
              <Text color={'black'}>{log.content}</Text>
            </View>
            <View>
              <Text color={'gray'} fontSize={11}>{log.dtime}</Text>
            </View>
          </View>)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  partition: {
    // position: 'relative',
    marginHorizontal: 15,
    marginTop: 35,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  headerText: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  body: {
    maxHeight: 250,
  },



  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E6EB',
  },
  contentCol: {
    color: 'gray',
    flex: 3,
  },
  dtimeCol: {
    color: 'gray',
    flex: 1,
  },
});

export default StatisticsScreen;
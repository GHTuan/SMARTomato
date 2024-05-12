// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {Text, View} from 'tamagui';
import {ScrollView} from 'react-native-gesture-handler';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchNotifications = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
          const response = await fetch('http://localhost:4000/notification', {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + JSON.parse(token),
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch notifications');
          }
          const notificationsData = await response.json();
          setNotifications(notificationsData);
        } catch (err) {
          console.error(err);
        }
      };
      fetchNotifications();
    }, []),
  );

  const markAsReadHandle = async () => {
    console.log('hehehe');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:4000/notification', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      });
      if (!response.ok) {
        throw new Error('Failed to set notifications');
      }
      setNotifications(
        notifications.map(notification => ({...notification, new: false})),
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <View>
      <ImageBackground
        source={require('./Image/bg.png')}
        style={{
          height: 300,
          width: '100%',
          position: 'absolute',
        }}></ImageBackground>

      <View
        style={{
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 80,
          marginBottom: 50,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
          Notifications
        </Text>
      </View>

      <View style={{marginHorizontal: 40, marginBottom: 10}}>
        <Text
          style={{textAlign: 'right', color: 'black', fontSize: 15}}
          onPress={markAsReadHandle}>
          Mark all as read
        </Text>
      </View>

      <ScrollView style={styles.body}>
        {notifications.map((notification, i) => (
          <View style={styles.item} key={i}>
            <View style={styles.iconCol}></View>
            <View style={styles.contentCol}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  color={notification.new ? 'black' : 'gray'}
                  fontSize={17}
                  fontWeight={'bold'}>
                  {notification.title}
                </Text>
                <Text
                  fontSize={12}
                  color={notification.new ? 'green' : 'gray'}
                  marginTop={10}>
                  {notification.dtime}
                </Text>
              </View>
              <Text color={notification.new ? 'black' : 'gray'} fontSize={13}>
                {notification.content}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    height: 600,
    borderRadius: 25,
    backgroundColor: 'white',
    paddingRight: 15,
    marginHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    // paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  // newitem: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingVertical: 10,
  //   paddingHorizontal: 15,
  //   borderBottomWidth: 1,
  //   borderBottomColor: 'gray',
  // },
  iconCol: {
    flex: 1,
    maxWidth: 30,
  },
  contentCol: {
    flex: 3,
    flexDirection: 'column',
  },
  titleCol: {
    flex: 3,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  dtimeCol: {
    flex: 1,
    color: 'gray',
    fontSize: 12,
  },
});

export default NotificationsScreen;

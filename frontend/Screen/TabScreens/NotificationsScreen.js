// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import { formatDistanceToNow } from 'date-fns';


const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
  ]);
  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token)
      const response = await fetch('http://localhost:4000/notification', {
        method: 'GET',
        headers: {
          'Authorization': "Bearer "+ JSON.parse(token), //
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const notifications = await response.json();
      console.log(notifications)
      setNotifications(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  const handleClearAllNotifications = () => {
    setNotifications([])
  };
  const handleClearNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>{item.title}</Text>
        <TouchableOpacity onPress={() => handleClearNotification(item._id)}>
          <Icon name="delete"/>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={[styles.notificationContent, {color: '#97A0B0'}]}>{item.content}</Text>
        <Text style={{color: '#97A0B0'}}>{formatDistanceToNow(new Date(item.dtime))}</Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[{flex: 1}, styles.container]}>
        <LinearGradient colors={['#43FE01', '#00B2FE']}
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }}
        style={[{height: '25%'}, styles.gradient]}>
          <View style={styles.gradientIcon}>
            <Icon style={{color: 'white', fontSize: 18}} name="menu"/>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Notifications</Text>
            <Icon style={{color: 'white', fontSize: 18}} name="settings"/>
          </View>
        </LinearGradient>
        <View style={styles.overlay}>
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item._id.toString()}
        />
          {notifications.length > 0 && (
          <TouchableOpacity style={styles.clearAllButton} onPress={handleClearAllNotifications}>
            <Text style={{color: 'black'}}>Clear All</Text>
          </TouchableOpacity>
        )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  gradientIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40
  },
  overlay: {
    flex: 1,
    backgroundColor: 'white',
    height: '50%',
    width: '90%',
    marginTop: 90,
    borderRadius: 20,
  },
  notificationItem: {
    width: '90%',
    marginTop: 10,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  notificationContent: {
    flex: 1,
    flexWrap: 'wrap',
    width: '80%'
  },
  clearAllButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
});
export default NotificationsScreen;
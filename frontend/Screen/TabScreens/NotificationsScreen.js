// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Notification 1' },
    { id: 2, message: 'Notification 2' },
    { id: 3, message: 'Notification 3' },
  ]);
  // const fetchNotifications = () => {
  // };
  // useEffect(() => {
  //   fetchNotifications();
  // }, []);
  const handleClearAllNotifications = () => {
    setNotifications([])
  };
  const handleClearNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={{fontWeight: '700'}}>{item.message}</Text>
      <TouchableOpacity onPress={() => handleClearNotification(item.id)}>
      <Icon name="twitter"/>
      </TouchableOpacity>
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
            <Icon name="twitter"/>
            <Icon name="twitter"/>
          </View>
        </LinearGradient>
        <View style={styles.overlay}>
          <FlatList
            data={notifications}
            renderItem={renderNotificationItem}
            keyExtractor={item => item.id.toString()}
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
    width: '70%',
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
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    justifyContent: 'space-between',
  },
  clearAllButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
});
export default NotificationsScreen;
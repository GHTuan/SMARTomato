// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';


const SettingsScreen = (navigation) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[{flex: 1}, styles.container]}>
        <LinearGradient colors={['#43FE01', '#00B2FE']}
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }}
        style={[{height: '100%'}, styles.gradient]}>
        </LinearGradient>
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.naviStyle}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('LightScreen')}>
            <Text>Light setting</Text>
            <Icon name="twitter"/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.naviStyle2}
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate('HumidityScreen')}>
            <Text>Humidity setting</Text>
            <Icon name="twitter"/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.naviStyle2}
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate('MoistureScreen')}>
            <Text>Soil Moisture setting</Text>
            <Icon name="twitter"/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.naviStyle2}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('TemperatureScreen')}>
            <Text>Temperature setting</Text>
            <Icon name="twitter"/>
          </TouchableOpacity>
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
  overlay: {
    flex: 1,
    width: '90%',
    marginTop: 20,
  },
  naviStyle:{
    backgroundColor: 'white',
    height: 70,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20
  },
  naviStyle2:{
    backgroundColor: 'white',
    height: 70,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  }
});
export default SettingsScreen;
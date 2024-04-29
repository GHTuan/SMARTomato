// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  createTabNavigator,
} from '@react-navigation/bottom-tabs';

// Import Screens
import HomeScreen from './TabScreens/Home/HomeScreen';
import SettingsScreen from './TabScreens/SettingsScreen';
import UserSettingsScreen from './TabScreens/UserSettingsScreen';
import StatisticsScreen from './TabScreens/StatisticsScreen';
import NotificationsScreen from './TabScreens/NotificationsScreen';
import DeviceScreen from './TabScreens/Device/DeviceScreen';

import CustomSidebarMenu from './Components/CustomSidebarMenu';
// import NavigationTabHeader from './Components/NavigationTabHeader';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};
const SettingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const UserSettingsScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="UserSettingsScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="UserSettingsScreen"
        component={UserSettingsScreen}
        options={{
          title: 'UserSettings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const StatisticsScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="StatisticsScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="StatisticsScreen"
        component={StatisticsScreen}
        options={{
          title: 'Statistics', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const NotificationsScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="NotificationsScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          title: 'Notifications', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DeviceScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="DeviceScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="DeviceScreen"
        
        options={({ route ,navigation }) => ({
          title: 'My Screen',
        })}
      >
         {(props) => <DeviceScreen device={"SoilMoisture"} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const TabNavigationRoutes = props => {
  return (
    <Tab.Navigator
      tabContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{headerShown: false}}
      tabContent={CustomSidebarMenu}>
      <Tab.Screen
        name="Statistics"
        options={{tabLabel: 'StatisticsScreen'}}
        component={StatisticsScreenStack}
      />
      <Tab.Screen
        name="Notification"
        options={{tabLabel: 'Notification Screen'}}
        component={NotificationsScreenStack}
      />
      <Tab.Screen
        name="Home"
        options={{tabLabel: 'Home Screen'}}
        component={HomeScreenStack}
      />
      <Tab.Screen
        name="Setting"
        options={{tabLabel: 'Setting Screen'}}
        component={SettingScreenStack}
      />
      <Tab.Screen
        name="User"
        options={{tabLabel: 'UserScreen'}}
        component={UserSettingsScreenStack}
      />
      <Tab.Screen
        name="Devive Dummy"
        options={{tabLabel: 'Devive'}}
        component={DeviceScreenStack}
      />
    </Tab.Navigator>
  );
};

export default TabNavigationRoutes;

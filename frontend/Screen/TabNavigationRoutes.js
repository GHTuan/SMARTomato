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
import UserSettingsScreen from './TabScreens/UserSetting/UserSettingsScreen';
import StatisticsScreen from './TabScreens/StatisticScreen/StatisticsScreen';
import NotificationsScreen from './TabScreens/NotiScreen/NotificationsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceScreen from './TabScreens/Device/DeviceScreen';

import CustomSidebarMenu from './Components/CustomSidebarMenu';
import ChangeUserInfo from './TabScreens/UserSetting/ChangeUserInfoScreen';
import ChangePassword from './TabScreens/UserSetting/ChangePasswordScreen';
import {Dimensions, View} from 'react-native';
// import NavigationTabHeader from './Components/NavigationTabHeader';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const SettingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerShown: false,
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
        headerShown: false,
      }}>
      <Stack.Screen
        name="UserSettingsScreen"
        component={UserSettingsScreen}
        options={{
          title: 'UserSettings', //Set Header Title
        }}
      />
      <Stack.Screen
        name="ChangeUserInfoScreen"
        component={ChangeUserInfo}
        options={{title: 'ChangeUserInfo'}}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePassword}
        options={{title: 'ChangePassword'}}
      />
    </Stack.Navigator>
  );
};

const StatisticsScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="StatisticsScreen"
      screenOptions={{
        headerShown: false,
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
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        // options={{
        //   title: 'Notifications', //Set Header Title
        // }}
      />
    </Stack.Navigator>
  );
};

// const DeviceScreenStack = ({navigation}) => {
//   return (
//     <Stack.Navigator
//       initialRouteName="DeviceScreen"
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#307ecc', //Set Header color
//         },
//         headerTintColor: '#fff', //Set Header text color
//         headerTitleStyle: {
//           fontWeight: 'bold', //Set Header text style
//         },
//       }}>
//       <Stack.Screen
//         name="DeviceScreen"

//         options={({ route ,navigation }) => ({
//           title: 'My Screen',
//         })}
//       >
//          {(props) => <DeviceScreen device={"SoilMoisture"} />}
//       </Stack.Screen>
//     </Stack.Navigator>
//   );
// };
const {width, height} = Dimensions.get('window');

const TabNavigationRoutes = props => {
  return (
    // <View
    //   style={{
    //     width,
    //     height,
    //   }}>
    <Tab.Navigator
      tabContentOptions={{
        // tabBarHideOnKeyboard: true,
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'User') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Statistics') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      })}
      // tabContent={CustomSidebarMenu}
    >
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
        name="Settings"
        options={{tabLabel: 'Settings Screen'}}
        component={SettingScreenStack}
      />
      <Tab.Screen
        name="User"
        options={{tabLabel: 'UserScreen'}}
        component={UserSettingsScreenStack}
      />
      {/* <Tab.Screen
        name="Devive Dummy"
        options={{tabLabel: 'Devive'}}
        component={DeviceScreenStack}
      /> */}
    </Tab.Navigator>
    // </View>
  );
};

export default TabNavigationRoutes;

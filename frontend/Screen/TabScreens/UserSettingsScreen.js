// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {SafeAreaView, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text, YStack} from 'tamagui';

const UserSettingsScreen = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View backgroundColor={'green'} height={100} width={'100%'}></View>
      <YStack>
        <Text>Account</Text>
        <View>
          <Text>Change password</Text>
          <Text>Change email</Text>
          <Text>Change username</Text>
        </View>
        <Text>Notification</Text>
        <View>
          <Text>Turn on Notification</Text>
        </View>
        <Text>About</Text>
        <View></View>
      </YStack>
      <Button
        onPress={() => {
          Alert.alert(
            'Logout',
            'Are you sure? You want to logout?',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  return null;
                },
              },
              {
                text: 'Confirm',
                onPress: () => {
                  AsyncStorage.clear();
                  props.navigation.replace('Auth');
                },
              },
            ],
            {cancelable: false},
          );
        }}
        title="Logout"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </SafeAreaView>
  );
};
export default UserSettingsScreen;

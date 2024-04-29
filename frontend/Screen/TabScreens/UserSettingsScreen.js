// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {SafeAreaView, Alert, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text, YStack, Separator, H1, H3, Button, H5} from 'tamagui';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserSettingsScreen = props => {
  return (
    <SafeAreaView>
      <View
        backgroundColor={'green'}
        height={150}
        width={'100%'}
        paddingVertical={30}>
        <YStack
          alignItems="center"
          // backgroundColor={'white'}
          top={10}
          // height={200}
          marginBottom={30}>
          <View height={200}>
            <Ionicons
              size={200}
              name={'person-circle-outline'}
              color={'white'}
            />
          </View>
          <H5 color={'black'}>UserName</H5>
        </YStack>
        <YStack paddingHorizontal={25}>
          <YStack marginBottom={15}>
            <H3>Account</H3>
            <View
              backgroundColor={'white'}
              padding={15}
              borderRadius={20}
              marginTop={5}>
              <Text fontSize={15}>Change password</Text>
              <Separator backgroundColor={'red'} />
              <Text fontSize={15}>Change email</Text>
              <Separator backgroundColor={'red'} />
              <Text fontSize={15}>Change username</Text>
            </View>
          </YStack>
          <YStack marginBottom={15}>
            <H3>Notification</H3>
            <View
              backgroundColor={'white'}
              padding={15}
              borderRadius={20}
              marginTop={5}>
              <Text fontSize={15}>Turn on Notification</Text>
            </View>
          </YStack>
          <YStack marginBottom={15}>
            <H3>About</H3>
            <View
              backgroundColor={'white'}
              padding={15}
              borderRadius={20}
              marginTop={5}>
              <Text fontSize={15}>Something...</Text>
            </View>
          </YStack>
        </YStack>
        <View alignItems="center" paddingTop={10}>
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
            backgroundColor="green"
            width={200}>
            <Text color={'white'}>Log out</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default UserSettingsScreen;

// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ImageBackground} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button, H3, H5, Separator, Text, View, YStack} from 'tamagui';

const UserSettingsScreen = props => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phoneno: '',
  });
  useFocusEffect(
    useCallback(() => {
      const fetchUserInfo = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
          const response = await fetch(`http://localhost:4000/user`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${JSON.parse(token)}`},
          });
          if (!response.ok) throw new Error('Failed to fetch UserInfo');
          const data = await response.json();
          setUserInfo({
            name: data.name,
            email: data.email,
            password: '',
            address: data.address,
            phoneno: data.phoneno,
          });
          // setUserId(_id);
          // });
        } catch (err) {
          console.error(err);
        }
      };
      fetchUserInfo();
    }, []),
  );

  return (
    <View
      // backgroundColor={'green'}
      height={150}
      width={'100%'}
      paddingVertical={30}>
      <ImageBackground
        source={require('./Image/bg.png')}
        style={{
          height: 300,
          width: '100%',
          position: 'absolute',
        }}></ImageBackground>
      <YStack
        alignItems="center"
        // backgroundColor={'white'}
        top={10}
        // height={200}
        marginBottom={30}>
        <View height={200}>
          <Ionicons size={200} name={'person-circle-outline'} color={'white'} />
        </View>
        <H5 color={'black'}>{userInfo.name}</H5>
      </YStack>
      <YStack paddingHorizontal={25}>
        <YStack marginBottom={15}>
          <H3>Account</H3>
          <View
            backgroundColor={'white'}
            paddingHorizontal={15}
            borderRadius={20}
            marginTop={5}>
            <Text
              fontSize={15}
              paddingVertical={10}
              onPress={() => {
                props.navigation.navigate('ChangeUserInfoScreen', {
                  userInfo: userInfo,
                  setUserInfo: setUserInfo,
                });
              }}>
              Change user info
            </Text>
            <Separator backgroundColor={'red'} />
            <Text
              fontSize={15}
              paddingVertical={10}
              onPress={() => {
                props.navigation.navigate('ChangePasswordScreen');
              }}>
              Change password
            </Text>
          </View>
        </YStack>
        {/* <YStack marginBottom={15}>
            <H3>Notification</H3>
            <View
              backgroundColor={'white'}
              padding={15}
              borderRadius={20}
              marginTop={5}>
              <Text fontSize={15}>Turn on Notification</Text>
            </View>
          </YStack> */}
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
          backgroundColor="#35C354"
          width={200}>
          <Text color={'white'}>Log out</Text>
        </Button>
      </View>
    </View>
  );
};
export default UserSettingsScreen;

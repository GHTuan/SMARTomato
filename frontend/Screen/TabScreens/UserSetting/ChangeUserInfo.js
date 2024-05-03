import AsyncStorage from '@react-native-community/async-storage';
import {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Input, View, Label, YStack, Button, Text, H3} from 'tamagui';

export default function ChangeUserInfo() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phoneno: '',
  });

  const [userId, setUserId] = useState('');
  const handleChangeUserInfo = () => {
    console.log(userInfo);
    if (!userInfo.password) {
      Alert.alert('Error', 'Please enter your current password');
      return;
    }
    fetch(`http://localhost:4000/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json', // Add Content-Type header
      },
      method: 'POST',
      body: JSON.stringify(userInfo),
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert(responseJson.error);
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  useEffect(() => {
    console.log('keke');
    const fetchUserId = async () => {
      await AsyncStorage.getItem('userinfo', (err, _id) => {
        fetch(`http://localhost:4000/user/${_id}`, {method: 'GET'})
          .then(response => response.json())
          .then(data => {
            console.log(typeof data);
            setUserInfo({
              name: data.user.name,
              email: data.user.email,
              password: '',
              address: data.user.address,
              phoneno: data.user.phoneno,
            });
          });
        setUserId(_id);
      });
    };
    fetchUserId();
  }, []);

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <View
          // justifyContent="space-between"
          // height={'100%'}
          paddingHorizontal={20}
          paddingVertical={40}>
          <View>
            <H3 color={'black'} alignSelf="center" marginBottom={30}>
              Update user info
            </H3>
            {Object.keys(userInfo)
              .filter(key => key !== 'password')
              .map(key => (
                <YStack key={key}>
                  <Label>{key}</Label>
                  <Input
                    // placeholder="Enter new password"
                    value={userInfo[key]}
                    onChangeText={text =>
                      setUserInfo(prev => ({...prev, [key]: text}))
                    }
                  />
                </YStack>
              ))}
            <YStack>
              <Label>Password</Label>
              <Input
                placeholder="Enter your password to confirm"
                value={userInfo.password}
                onChangeText={text =>
                  setUserInfo(prev => ({...prev, password: text}))
                }
                secureTextEntry
              />
            </YStack>
          </View>
          <Button
            backgroundColor={'green'}
            marginTop={30}
            onPress={handleChangeUserInfo}>
            <Text color={'white'}>Done</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

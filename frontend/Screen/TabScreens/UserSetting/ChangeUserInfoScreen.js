import AsyncStorage from '@react-native-community/async-storage';
import {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Input, View, Label, YStack, Button, Text, H3} from 'tamagui';

function ChangeUserInfo(props) {
  const {userInfo, setUserInfo} = props.route.params;
  const [newUserInfo, setNewUserInfo] = useState(userInfo);

  const handleChangeUserInfo = async () => {
    if (!newUserInfo.password) {
      Alert.alert('Error', 'Please enter your current password');
      return;
    }
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:4000/user`, {
        headers: {
          'Content-Type': 'application/json', // Add Content-Type header
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        method: 'POST',
        body: JSON.stringify(newUserInfo),
      });
      const data = response.json();
      Alert.alert('Success', 'User info update successfully', [
        {
          text: 'Ok',
          onPress: () => props.navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert(error);
    }
  };
  const handleInputChange = (key, value) => {
    setNewUserInfo({...newUserInfo, [key]: value});
  };
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
            {Object.keys(newUserInfo)
              .filter(key => key !== 'password')
              .map(key => (
                <YStack key={key}>
                  <Label size={15}>{key}</Label>
                  <Input
                    // placeholder="Enter new password"
                    value={newUserInfo[key]}
                    onChangeText={text => handleInputChange(key, text)}
                  />
                </YStack>
              ))}
            <YStack>
              <Label size={15}>Password</Label>
              <Input
                placeholder="Enter your password to confirm"
                value={newUserInfo.password}
                onChangeText={text => handleInputChange('password', text)}
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
export default ChangeUserInfo;

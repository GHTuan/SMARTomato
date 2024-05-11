import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Button, H3, Input, Label, Text, View, YStack} from 'tamagui';

function ChangePassword() {
  const [input, setInput] = useState({
    curPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChangePassword = async () => {
    if (!input.curPassword) {
      Alert.alert('Error', 'Please enter your current password');
      return;
    }
    if (!input.newPassword) {
      Alert.alert('Error', 'Please enter your new password');
      return;
    }
    if (input.newPassword !== input.confirmNewPassword) {
      Alert.alert(
        'Error',
        'Confirm new password and new password must be the same',
      );
      return;
    }
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        `http://localhost:4000/user/updatePassword/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Add Content-Type header
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
          body: JSON.stringify({
            curPassword: input.curPassword,
            newPassword: input.newPassword,
          }),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to update password');
      }
      Alert.alert('Success', 'Password updated successfully', [
        {
          text: 'Ok',
          onPress: () => props.navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update password');
    }
  };

  return (
    <View paddingHorizontal={20} paddingVertical={40}>
      <H3 color={'black'} alignSelf="center" marginBottom={30}>
        Update password
      </H3>
      {Object.keys(input).map(key => (
        <YStack key={key}>
          <Label size={15}>
            {
              ((key = key.replace(/[A-Z]/g, ' $&')),
              key[0].toUpperCase() + key.slice(1))
            }
          </Label>
          <Input
            placeholder={
              ((key = key.replace(/[A-Z]/g, ' $&')),
              key[0].toUpperCase() + key.slice(1))
            }
            value={input[key]}
            onChangeText={text => setInput(prev => ({...prev, [key]: text}))}
            secureTextEntry
          />
        </YStack>
      ))}
      <Button
        backgroundColor={'green'}
        marginTop={30}
        onPress={handleChangePassword}>
        <Text color={'white'}>Done</Text>
      </Button>
    </View>
  );
}

export default ChangePassword;

import React, {useState} from 'react';
import {Button, Input, Label, Text, View, YStack} from 'tamagui';

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

    try {
      const response = await AsyncStorage.getItem('userinfo', (err, _id) =>
        fetch(`http://localhost:4000/user/updatePassword/${_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Add Content-Type header
          },
          body: JSON.stringify({
            curPassword: input.curPassword,
            newPassword: input.newPassword,
          }),
        }),
      );
      if (!response.ok) {
        throw new Error('Failed to update password');
      }
      Alert.alert('Success', 'Password updated successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update password');
    }
  };

  return (
    <View>
      {Object.keys(input).map(key => (
        <YStack>
          <Label>{key}</Label>
          <Input
            placeholder="Current password"
            value={input[key]}
            onChangeText={text => setInput(prev => ({...prev, [key]: text}))}
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

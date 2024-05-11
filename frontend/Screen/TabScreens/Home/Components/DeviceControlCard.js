import AsyncStorage from '@react-native-community/async-storage';
import {Circle, Switch, Text, XStack} from 'tamagui';
import { useNavigation } from '@react-navigation/native';

function DeviceControlCard({name, icon, value, setDeviceControl}) {
  const navigation = useNavigation()
  const handleDeviceControl = async value => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:4000/mode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({reqdevice: name, state: value}),
      });
      if (!response.ok) {
        throw new Error(`Failed to set ${name} devicestt to ${value}`);
      }
      setDeviceControl(prev => {
        return prev.map(device =>
          device.name === name ? {...device, state: value} : device,
        );
      });
    } catch (error) {
      console.error('Error updating system mode:', error);
    }
  };
  function navigateToDevice(name){
    if (name == "fan"){
      navigation.navigate('DeviceScreen',{
        device: "Temperature",
      });
    } else if (name == "awning"){
      navigation.navigate('DeviceScreen',{
        device: "Humidity",
      });
    } else if (name == "light"){
      navigation.navigate('DeviceScreen',{
        device: "Light",
      });
    } else if (name == "pump"){
      navigation.navigate('DeviceScreen',{
        device: "SoilMoisture",
      });
    }  

  }
  return (
    <XStack
      height={50}
      width={'48%'}
      backgroundColor={'white'}
      justifyContent="space-between"
      alignItems="center"
      marginVertical={6}
      borderRadius={13}
      padding={7}>
      <Circle size={33} backgroundColor={'green'} onPress={(e) => { navigateToDevice(name)} }>
        {icon}
      </Circle>
      <Text fontSize={11}>{name}</Text>
      <Switch checked={value} size={'$3'} onCheckedChange={handleDeviceControl}>
        <Switch.Thumb animation="quicker" backgroundColor={'green'} />
      </Switch>
    </XStack>
  );
}

export default DeviceControlCard;

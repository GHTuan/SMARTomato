import {Circle, Switch, Text, XStack} from 'tamagui';

function DeviceControlCard({name, curMode, icon, setDeviceControl}) {
  const getRoute = name => {
    switch (name) {
      case 'Humidity':
        return 'humid';
      case 'Light':
        return 'light';
      case 'Moisture':
        return 'soil';
      case 'Temperature':
        return 'temp';
      default:
        return null;
    }
  };
  const handleDeviceControl = async value => {
    if (systemMode === 'Auto') {
      try {
        const response = await fetch(
          `http://localhost:4000/${getRoute(name)}/mode`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${yourToken}`, // Add your token here
            },
            body: JSON.stringify({mode: curMode, devicestt: value}),
          },
        );
        if (!response.ok) {
          throw new Error('Failed to update system mode');
        }
        console.log('System mode updated successfully');
      } catch (error) {
        console.error('Error updating system mode:', error);
        setDeviceControl(prev => (prev === 'Auto' ? 'Manual' : 'Auto'));
      }
    }
  };
  return (
    <XStack
      height={50}
      width={175}
      backgroundColor={'white'}
      justifyContent="space-between"
      alignItems="center"
      marginVertical={6}
      borderRadius={13}
      padding={7}>
      <Circle size={33} backgroundColor={'green'}>
        {icon}
      </Circle>
      <Text fontSize={11}>{name}</Text>
      <Switch
        defaultChecked={true}
        size={'$3'}
        onCheckedChange={handleDeviceControl}>
        <Switch.Thumb animation="quicker" backgroundColor={'green'} />
      </Switch>
    </XStack>
  );
}

export default DeviceControlCard;

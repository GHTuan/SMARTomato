import {Circle, Switch, Text, XStack} from 'tamagui';

function DeviceControlCard({name, curMode, icon, setDeviceControl}) {
  const getRoute = name => {
    switch (name) {
      case 'Garden fan':
        return 'humid';
      case 'Garden light':
        return 'light';
      case 'Water pump':
        return 'soil';
      case 'Garden roof':
        return 'temp';
      default:
        return null;
    }
  };
  const handleDeviceControl = async value => {
    console.log(name);
    console.log(`http://localhost:4000/${getRoute(name)}/mode`);
    try {
      const response = await fetch(
        `http://localhost:4000/${getRoute(name)}/mode`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({mode: curMode, devicestt: value}),
        },
      );
      if (!response.ok) {
        throw new Error(`Failed to set ${name} devicestt to ${value}`);
      }
      console.log(`${name} devicestt set successfully to ${value}`);
    } catch (error) {
      console.error('Error updating system mode:', error);
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

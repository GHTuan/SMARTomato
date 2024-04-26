import {Button, Card, Circle, Switch, Text, XStack, YStack} from 'tamagui';

function DeviceControlCard({name, icon}) {
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
      <Switch defaultChecked={true} size={'$3'}>
        <Switch.Thumb animation="quicker" backgroundColor={'green'} />
      </Switch>
    </XStack>
  );
}

export default DeviceControlCard;

import React, {Children} from 'react';
import {View} from 'react-native';
import {Image, XStack, YStack, Text, Button} from 'tamagui';

function Card({name, currentValue, children, icon, currentMode}) {
  return (
    <YStack
      width={175}
      height={175}
      justifyContent="space-between"
      borderRadius={15}
      padding={10}
      backgroundColor={'white'}>
      <XStack justifyContent="space-between">
        <Text>{currentValue}</Text>
        <Button color={'green'} fontSize={10} unstyled={true}>
          Remeasure
        </Button>
      </XStack>
      <View>{children}</View>
      <XStack justifyContent="space-between" alignItems="center">
        <YStack>
          <Text>{name}</Text>
          <Text color={'$black025'} fontSize={11}>
            {currentMode}
          </Text>
        </YStack>
        {icon}
      </XStack>
    </YStack>
  );
}

export default Card;

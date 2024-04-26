import React, {Children} from 'react';
import {View} from 'react-native';
import {Image, XStack, YStack, Text} from 'tamagui';

function Card({name, currentValue, children, icon}) {
  return (
    <YStack
      // borderColor={'black'}
      // borderWidth={1}
      width={175}
      height={175}
      justifyContent="space-between"
      borderRadius={15}
      padding={10}
      backgroundColor={'white'}>
      <XStack justifyContent="space-between">
        <Text>{currentValue}</Text>
        <Text color={'green'} fontSize={10}>
          Remeasure
        </Text>
      </XStack>
      <View>{children}</View>
      <XStack justifyContent="space-between" alignItems="center">
        <YStack>
          <Text>{name}</Text>
          <Text color={'$black025'} fontSize={11}>
            Automatic
          </Text>
        </YStack>
        {icon}
      </XStack>
    </YStack>
  );
}

export default Card;

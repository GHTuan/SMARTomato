import React, {Children} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Image, XStack, YStack, Text, Button} from 'tamagui';

function Card({name, currentValue, children, icon, currentMode, isLoading}) {
  return (
    <YStack
      width={'48%'}
      height={175}
      justifyContent="center"
      alignContent="center"
      borderRadius={15}
      padding={10}
      backgroundColor={'white'}>
      {isLoading ? (
        <ActivityIndicator color={'#35C354'} />
      ) : (
        <View justifyContent="space-between">
          <XStack justifyContent="space-between">
            <Text>{currentValue}</Text>
            <Button color={'#35C354'} fontSize={10} unstyled={true}>
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
        </View>
      )}
    </YStack>
  );
}

export default Card;

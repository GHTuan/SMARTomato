// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {SafeAreaView, ImageBackground} from 'react-native';
import Card from './Components/Card';
import {
  Button,
  H1,
  H2,
  H3,
  H4,
  Main,
  YStack,
  Text,
  XStack,
  H5,
  ScrollView,
  Switch,
  View,
} from 'tamagui';
import {
  Droplets,
  Sun,
  ThermometerSun,
  Droplet,
  Fan,
  Lightbulb,
  CloudSun,
} from '@tamagui/lucide-icons';
import DeviceControlCard from './Components/DeviceControlCard';
import {LineGraph} from './Components/LineGraph';
import {tw} from '../../../tailwind';

const HomeScreen = () => {
  return (
    <ScrollView backgroundColor="#F5F6FA">
      <ImageBackground
        source={require('./image/main-bg.png')}
        style={{height: 250}}>
        <YStack
          flex={1}
          justifyContent="space-between"
          height={100}
          paddingHorizontal={25}
          paddingVertical={20}>
          <XStack justifyContent="space-between">
            <YStack>
              <H3 color={'white'}>Good morning, Mr. Duy</H3>
              <Text color={'white'}>your smart tomato garden awaits</Text>
            </YStack>
            <ImageBackground
              source={require('./image/BK-logo.png')}
              style={{width: 40, height: 40}}
            />
          </XStack>
          <YStack className="flex-col">
            <H4 color={'white'}>System mode</H4>
            <View alignItems="center">
              <Switch
                // id={id}
                size={'$10'}
                defaultChecked={true}>
                <Switch.Thumb animation="quicker" backgroundColor={'green'} />
              </Switch>
            </View>
            <Text color={'white'}>Last modified:</Text>
          </YStack>
        </YStack>
      </ImageBackground>
      <Main paddingHorizontal={25} paddingVertical={10}>
        <YStack>
          <H3>Environment factors</H3>
          <YStack gap={12} paddingTop={10}>
            <XStack justifyContent="space-between">
              <Card
                name={'Humidity'}
                currentValue={'70%'}
                icon={<Droplets size={20} />}>
                <LineGraph
                  data={[12, 5, 9, 30, 20, 51, 20, 1, 4, 2, 70]}
                  style={[tw`mb-4`]}
                  color="rose"
                  label="views"
                  stat="120k"
                />
              </Card>
              <Card
                name={'Light sensitivity'}
                currentValue={'600 Lux'}
                icon={<Sun size={20} />}>
                <LineGraph
                  data={[12, 5, 9, 30, 20, 51, 20, 1, 4, 2, 70]}
                  style={[tw`mb-4`]}
                  color="rose"
                  label="views"
                  stat="120k"
                />
              </Card>
            </XStack>
            <XStack justifyContent="space-between">
              <Card
                name={'Soil moisture'}
                currentValue={'55%'}
                icon={<Droplet size={20} />}>
                <LineGraph
                  data={[12, 5, 9, 30, 20, 51, 20, 1, 4, 2, 70]}
                  style={[tw`mb-4`]}
                  color="rose"
                  label="views"
                  stat="120k"
                />
              </Card>
              <Card
                name={'Temperature'}
                currentValue={'30°C'}
                icon={<ThermometerSun size={20} />}>
                <LineGraph
                  data={[12, 5, 9, 30, 20, 51, 20, 1, 4, 2, 70]}
                  style={[tw`mb-4`]}
                  color="rose"
                  label="views"
                  stat="120k"
                />
              </Card>
            </XStack>
          </YStack>
        </YStack>
        <YStack paddingVertical={10}>
          <H4>Device controls</H4>
          <XStack flexWrap="wrap" justifyContent="space-between" paddingTop={5}>
            <DeviceControlCard
              name={'Garden fan'}
              icon={<Fan color={'white'} size={22} />}
            />
            <DeviceControlCard
              name={'Garden light'}
              icon={<Lightbulb color={'white'} size={22} />}
            />
            <DeviceControlCard
              name={'Water pump'}
              icon={<Droplets color={'white'} size={22} />}
            />
            <DeviceControlCard
              name={'Garden roof'}
              icon={<CloudSun color={'white'} size={22} />}
            />
          </XStack>
        </YStack>
      </Main>
    </ScrollView>
  );
};

export default HomeScreen;

import { X,Settings2 } from '@tamagui/lucide-icons'
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Paragraph,
  Sheet,
  TooltipSimple,
  Unspaced,
  XStack,
} from 'tamagui'
import { useEffect, useState } from 'react';
import { toGammaSpace } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import AsyncStorage from '@react-native-community/async-storage';



const Setting = (props) => {
  const [lowerBound,setLowerBound] = useState()
  const [upperBound,setUpperBound] = useState()
  useEffect(() => {
    async function fetchData(){
      const token = await AsyncStorage.getItem('token');
      // console.log(token)

      const api = props.setting.api + "/threshold"; 
      fetch(api,{
          method: 'GET',
          headers: {
              //Header Defination
              "Content-Type":"application/json",
              "Authorization":"Bearer "+ JSON.parse(token)
          }
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setLowerBound(''+response.lowerbound)
        setUpperBound(''+response.upperbound)
        })
    }
    fetchData()
  },[props])
async function updateThreshold(){
  const token = await AsyncStorage.getItem('token');
  // console.log(token)

  const api = props.setting.api + "/threshold"; 
  fetch(api,{
      method: 'POST',
      headers: {
          //Header Defination
          "Content-Type":"application/json",
          "Authorization":"Bearer "+ JSON.parse(token)
      },
      body: JSON.stringify({
        lowerbound:lowerBound,
        upperbound:upperBound,
      }),
  })
  .then((response) => response.json())
  .then((response) => {
    console.log(response)
    // console.log(lowerBound)
    // console.log(upperBound)
    })
}


  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Settings2 style={{margin:10}}></Settings2>
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Edit {props.setting.title} Threshold</Dialog.Title>
          <Dialog.Description>
            Make changes to the automatic threshold. Click save when you're done.
          </Dialog.Description>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end">
              Lower Bound
            </Label>
            <Input flex={1} 
            onChangeText= {(e)=>setLowerBound(e)}
            value={lowerBound} 
            />
          </Fieldset>
          <Fieldset gap="$4" horizontal>
          <Label width={160} justifyContent="flex-end">
              Upper Bound
            </Label>
            <Input flex={1}
            value={upperBound} 
            onChangeText={(e)=> {setUpperBound(e)}}
             />
          </Fieldset>

          <XStack alignSelf="flex-end" gap="$4">

            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close"
              onPress = {() => {
                // console.log(lowerBound)
                // console.log(upperBound)
                // ughhh something when wrong here
                updateThreshold()
              }}
              >
                Save changes
              </Button>
            </Dialog.Close>
          </XStack>
          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export default Setting;
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
import { useState } from 'react';
import { toGammaSpace } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';



function Setting({title}) {
  const [lowerBound,setLowerBound] = useState(0)
  const [upperBound,setUpperBound] = useState(100)
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
          <Dialog.Title>Edit {title} Threshold</Dialog.Title>
          <Dialog.Description>
            Make changes to the automatic threshold. Click save when you're done.
          </Dialog.Description>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end">
              Lower Bound
            </Label>
            <Input flex={1} 
            defaultValue= {lowerBound} 
            onChange={ (e)=>{setLowerBound(e.value)}}
            />
          </Fieldset>
          <Fieldset gap="$4" horizontal>
          <Label width={160} justifyContent="flex-end">
              Upper Bound
            </Label>
            <Input flex={1}
            defaultValue={upperBound}
            onChange={(e)=> {setUpperBound(e.value)}}
             />
          
          </Fieldset>

          <XStack alignSelf="flex-end" gap="$4">

            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close"
              onPress = {() => {
                console.log(lowerBound)
                console.log(upperBound)
                // ughhh something when wrong here
                //fetch
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
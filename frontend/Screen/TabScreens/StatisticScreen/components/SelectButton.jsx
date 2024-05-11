import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { useMemo, useState } from "react";
import { Adapt, Label, Select, Sheet, Text, XStack, YStack } from 'tamagui'


const SelectButton = ({ val, setVal }) => {
  return (
    <Select value={val} onValueChange={setVal} >
      <Select.Trigger iconAfter={ChevronDown} f={1} borderRadius={20} justifyContent="center">
        <Select.Value placeholder={'something'} fontSize={13} >
          {val}
        </Select.Value>
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
          <Sheet.Frame>
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          ai="center"
          jc="center"
          pos="relative"
          w="100%"
          h="$3"
        >
          <YStack zi={10}>
            <ChevronUp size={20} />
          </YStack>
        </Select.ScrollUpButton>

        <Select.Viewport outlineStyle="none">
          <Select.Group space="$0">
            <Select.Label bc="$backgroundStrong">
              <Text fontSize={16} fontWeight="bold">Select a factor</Text>
            </Select.Label>
            {items.map((option, i) => {
              return (
                <Select.Item
                  index={i}
                  key={option}
                  value={option}
                  outlineStyle="none"
                  bc="$backgroundStrong"
                >
                  <Select.ItemText>
                    {items[i]}
                  </Select.ItemText>
                  <Select.ItemIndicator ml="auto">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              )
            })}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          ai="center"
          jc="center"
          pos="relative"
          w="100%"
          h="$3"
        >
          <YStack zi={10}>
            <ChevronDown size={20} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  )
}


const items = [
  'Humidity',
  'Light',
  'Moisture',
  'Temperature',
]
export default SelectButton;
import { useEffect,useState } from "react";
import { Text,Circle,Switch,Button, YStack ,XStack,Dialog} from "tamagui";
import { View } from "react-native";
import Setting from "./Setting";
import { Cpu } from "@tamagui/lucide-icons";
import AsyncStorage from '@react-native-community/async-storage';

const AutomaticCard = (props) => {
    
    async function changeState(){
        if (props.fill){
            await props.update("Manual",false);
        } else {
            await props.update("Auto",false);
        }
    }    

    return (
        <View style={{ flex:1, alignItems:'center', justifyContent:'center',backgroundColor:'white', width:'100%',height:80,marginBottom:20, borderRadius:10,padding:10}}>
            <XStack
            height={50}
            width='100%'
            backgroundColor={'white'}
            justifyContent="space-between"
            alignItems="center"
            marginVertical={6}
            borderRadius={13}
            padding={7}>
            <XStack style={{flex:1, alignItems:'center'}} >
                <Cpu size={35}></Cpu>
                <YStack style={{flex:1, marginLeft:10}}>
                    <Text fontWeight={"bold"}>  Automatic Mode</Text>
                <Text color={'$black025'} fontSize={11} marginLeft={6} marginTop={5}>
                    ON/OFF
                </Text>
                </YStack>
            </XStack>
                    
                    <Setting setting = {props.setting} />

                    <Switch checked={props.fill} size={'$3'} onCheckedChange = {() => changeState()}>
                        <Switch.Thumb animation="quicker" backgroundColor={'green'} />
                    </Switch>
                
            </XStack>
        </View>
    )
}

export default AutomaticCard;
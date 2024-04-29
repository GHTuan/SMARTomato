import { useEffect,useState } from "react";
import { Text,Circle,Switch,Button, YStack ,XStack,Dialog} from "tamagui";
import { View } from "react-native";
import Setting from "./Setting";
import { Cpu } from "@tamagui/lucide-icons";

const AutomaticCard = (props) => {
    useEffect(() =>
        //fetch(api)
        console.log(props.api)
    
    ,[]);
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
                    
                    <Setting title={props.title} />

                    <Switch defaultChecked={true} size={'$3'}>
                        <Switch.Thumb animation="quicker" backgroundColor={'green'} />
                    </Switch>
                
            </XStack>
        </View>
    )
}

export default AutomaticCard;
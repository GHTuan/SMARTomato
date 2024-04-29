import { useEffect,useState } from "react";
import { Text,Circle,Switch, YStack ,XStack} from "tamagui";
import { View } from "react-native";
import { Hand } from "@tamagui/lucide-icons";

const ManualCard = (props) => {
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
                
                <Hand size={35}/>
                <YStack style={{flex:1, marginLeft:10}}>
                    <Text fontWeight={"bold"}>  Manual Mode</Text>
                <Text color={'$black025'} fontSize={11} marginLeft={6} marginTop={5}>
                    ON/OFF
                </Text>
                </YStack>
            </XStack>
            <Switch defaultChecked={true} size={'$3'}>
                <Switch.Thumb animation="quicker" backgroundColor={'green'} />
            </Switch>
            </XStack>
        </View>
    )
}

export default ManualCard;
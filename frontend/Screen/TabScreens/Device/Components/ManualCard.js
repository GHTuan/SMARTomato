import { useEffect,useState } from "react";
import { Text,Circle,Switch, YStack ,XStack} from "tamagui";
import { View } from "react-native";
import { Hand } from "@tamagui/lucide-icons";
import AsyncStorage from '@react-native-community/async-storage';

const ManualCard = (props) => {
    const [state,setState] = useState();
    const [status,setStatus] = useState();
    useEffect( () => {    
        async function fetchData(){    
            const token = await AsyncStorage.getItem('token');
            const api = props.setting.api + "/mode"; 
            fetch(api,{
                method: 'PUT',
                headers: {
                    //Header Defination
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ JSON.parse(token)
                },
                body: JSON.stringify({
                    reqdevice: props.setting.device
                })
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                if (response.mode == "Manual" && response.state == "true"){
                    setState(true)
                } else {
                    setState(false)
                }
            })
        }
        fetchData();
    }
        ,[]);
    
    async function cState(){
        if (state == true){
            setState(false)
        } else {
            setState(true)
        }
    }
    async function changeState(){
        await cState();
        const token = await AsyncStorage.getItem('token');
        const api = props.setting.api + "/mode"
        if (state){
            setStatus(true)
        } else {
            setStatus(false)
        }
        await fetch(api,{
            method: 'POST',
            headers: {
                //Header Defination
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ JSON.parse(token)
            },
            body: JSON.stringify({
                reqdevice: props.setting.device,
                mode: "Manual",
                state: status
            })
        })
        .then((response) => response.json())
        .then((response) =>{
            console.log(response)
        })
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
                
                <Hand size={35}/>
                <YStack style={{flex:1, marginLeft:10}}>
                    <Text fontWeight={"bold"}>  Manual Mode</Text>
                <Text color={'$black025'} fontSize={11} marginLeft={6} marginTop={5}>
                    ON/OFF
                </Text>
                </YStack>
            </XStack>
            <Switch checked={state} size={'$3'} onCheckedChange={() => changeState()}>
                <Switch.Thumb animation="quicker" backgroundColor={'green'} />
            </Switch>
            </XStack>
        </View>
    )
}

export default ManualCard;
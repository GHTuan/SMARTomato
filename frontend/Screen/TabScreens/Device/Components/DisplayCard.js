import { useEffect,useState,useCallback } from "react";
import { Text,Paragraph,Progress, YStack ,XStack,Button} from "tamagui";
import { View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Circle } from "react-native-svg";
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const DisplayCard = (props) => {
    const [data, setData] = useState(10)
    const [token,setToken] = useState()
    useFocusEffect(
        useCallback(() => {

        async function fetchData(){
            const token = await AsyncStorage.getItem('token');
            const api = props.setting.api + "/current"; 
            // console.log(api)
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
                // console.log(response)
                setData(parseFloat(response.value))
            })
        }
        fetchData()
    }, [props]),
    );
    async function refreshData(){
        const token = await AsyncStorage.getItem('token');
        // console.log(token)
        const api = props.setting.api + "/refresh"; 
        fetch(api,{
            method: 'POST',
            headers: {
                //Header Defination
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ JSON.parse(token)
            }
        })
        .then((response) => response.json())
        .then((response) => {
            setData(parseFloat(response.value))
        })
    }

    return (

        <View style={{ backgroundColor:'white', width:'100%',height:200,marginBottom:20, borderRadius:15,padding:10}}>
            
                <XStack justifyContent="space-between" >
                    <XStack>
                        <Text>             </Text>
                    </XStack>
                    <Paragraph height={30} fontWeight={'bold'} position="">
                        {props.setting.title}
                    </Paragraph>
                    <Button size="$1" style={{margin: "200px", float:"right"}} onPress={(e) => refreshData()}>
                      Refresh
                    </Button>
                </XStack >
           
            <YStack flex={1} alignItems="center">
                <AnimatedCircularProgress
                size={200}
                lineCap={'round'}
                width={6}
                fill={data}
                arcSweepAngle={180}
                rotation={-90}
                tintColor="#00e0ff"
                backgroundColor="#EDEDEC"
                tintColorSecondary="green"
                padding={10}
                renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="8" fill="lightblue" />}
                >
                {
                    (fill) => (
                        <>
                        <Text height={40}>
                            {data}  {props.setting.unitOfMeasure}
                        </Text>
                        <Text>
                            Current {props.setting.title} Level
                        </Text>
                        </>
                    )
                }
                </AnimatedCircularProgress>
                
            </YStack>
        </View>
    )
}

export default DisplayCard;
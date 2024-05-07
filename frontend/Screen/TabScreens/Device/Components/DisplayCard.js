import { useEffect,useState } from "react";
import { Text,Paragraph,Progress, YStack ,XStack} from "tamagui";
import { View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Circle } from "react-native-svg";
import AsyncStorage from '@react-native-community/async-storage';

const DisplayCard = (props) => {
    const [data, setData] = useState(10)
    const [token,setToken] = useState()
    useEffect(() =>{
        // fetch(api)
        // console.log(props.api) 
        async function fetchData(){
            const token = await AsyncStorage.getItem('token');
            // console.log(token)
            const api = props.setting.api + "/current"; 
            console.log(api)
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
    },[]);
    return (

        <View style={{ backgroundColor:'white', width:'100%',height:200,marginBottom:20, borderRadius:15,padding:10}}>
            <YStack style = {{flex:1,alignItems:"center"}}>
                <Paragraph height={30} fontWeight={'bold'}>
                    {props.title}
                </Paragraph>
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
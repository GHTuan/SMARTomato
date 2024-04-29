import { useEffect,useState } from "react";
import { Text,Paragraph,Progress, YStack ,XStack} from "tamagui";
import { View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Circle } from "react-native-svg";

const DisplayCard = (props) => {
    const [data, setData] = useState(10)
    useEffect(() =>{
        //fetch(api)
        // console.log(props.api) 
        
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
                            {data}  {props.unitOfMeasure}
                        </Text>
                        <Text>
                            Current {props.title} Level
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
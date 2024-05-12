import { StyleProp, View, ViewStyle, useColorScheme, Text } from 'react-native';
import { tw } from '../../../../tailwind';
import { useState } from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import React from 'react';
import * as d3 from 'd3';

export type LineGraphProps = {
  data: number[];
  color: string;
  label: string;
  stat: string;
  style?: StyleProp<ViewStyle>;
};

const GRAPH_ASPECT_RATIO = 9 / 16;

function* yLabel(props: LineGraphProps) {
  const maxValue = Math.max(...props.data);
  for (let i = maxValue; i >= 0; i -= maxValue / 3) {

    yield parseInt(i.toString());
  }
}

export function LineGraph(props: LineGraphProps) {
  const [width, setWidth] = useState(0);

  const height = width * GRAPH_ASPECT_RATIO;
  const graphHeight = (height * 2) / 3;

  const min = Math.min(...props.data);
  const max = Math.max(...props.data);

  const yScale = d3.scaleLinear().domain([min, max]).range([graphHeight, 0]);


  const xScale = d3
    .scaleLinear()
    .domain([0, props.data.length - 1])
    .range([0, width]);

  const lineFn = d3
    .line<number>()
    .x((d, ix) => xScale(ix))
    .y((d, ix) => yScale(d));

  const areaFn = d3
    .area<number>()
    .x((d, ix) => xScale(ix))
    .y0(height)
    .y1((d, ix) => yScale(d));

  const svgLine = lineFn(props.data);
  const svgArea = areaFn(props.data);

  const darkHexColor = tw.color(props.color + '-600');
  const lightHexColor = tw.color(props.color + '-400');
  const nearlyWhiteHexColor = tw.color(props.color + '-100');

  return (
    <View
      style={[tw`rounded-sm`, props.style,
      {
        justifyContent: 'space-between',
        flexDirection: 'row',
      }
      ]}
      onLayout={ev => {
        setWidth(ev.nativeEvent.layout.width);
      }}>
      <View style={{
        flex: 1, height: graphHeight,
      }}>
        {Array.from(yLabel(props)).map((value) => (<Text
          style={[
            tw``,
            {
              bottom: value / max * graphHeight - 10,
              position: 'absolute', left: 0
            },

          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
          key={value}

        >
          {value}
        </Text>
        ))}
      </View>
      <Svg width={width * 0.95} height={graphHeight} style={{ flex: 4 }}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset={'0%'} stopColor={lightHexColor} stopOpacity={1} />
            <Stop
              offset={'100%'}
              stopColor={nearlyWhiteHexColor}
              stopOpacity={0}
            />
          </LinearGradient>
        </Defs>

        <Path d={`M0 ${graphHeight} L${width} ${graphHeight}`} stroke="gray" strokeWidth={2} />
        <Path d={`M0 0 L0 ${graphHeight}`} stroke="gray" strokeWidth={2} />
        <Path d={svgLine} stroke={darkHexColor} fill={'none'} strokeWidth={2} />
        <Path d={svgArea} stroke={'none'} fill={'url(#gradient)'} />
      </Svg>
    </View>
  );
}

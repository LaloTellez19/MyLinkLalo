import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../../constants/Colors';
import Text from '../Text';

const outerColors = [
  '#a589bb',
  '#ba87bc',
  '#c273a2',
  '#d4858a',
  '#76abd0',
  '#90cc97',
  '#e5dc70',
  '#efbd80',
];

const middleColors = [
  '#b59fc9',
  '#c295c6',
  '#e298c7',
  '#ea8284',
  '#86c9e6',
  '#b9d790',
  '#f0ea84',
  '#f3c993',
];

const innerColors = [
  '#c6b1dd',
  '#d2abd8',
  '#f4bde3',
  '#f9a5a9',
  '#ace0df',
  '#ade484',
  '#fff799',
  '#fcd9b4',
];

function CuponColorSelector(props) {
  const {rotation} = props;
  const [color, setColor] = React.useState('Touch a color');

  const circlesInfo = [
    {
      radius: 150,
      colors: outerColors,
      outer: true,
      elevation: 5,
    },
    {
      radius: 110,
      colors: middleColors,
      outer: false,
      elevation: 10,
    },
    {
      radius: 70,
      colors: innerColors,
      outer: false,
      elevation: 15,
    },
  ];

  /* STYLES */
  const styles = StyleSheet.create({
    colorSelector: {
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{translateY: 0}, {rotate: `${rotation}deg`}, {translateY: 0}],
    },
    colorSelected: {
      textAlign: 'center',
      marginTop: 30,
    },
  });

  return (
    <View>
      <View style={styles.colorSelector}>
        {circlesInfo.map((item, index) => {
          return (
            <CircleContainer
              key={index}
              radius={item.radius}
              setColor={setColor}
              colors={item.colors}
              outer={item.outer}
              elevation={item.elevation}
            />
          );
        })}
      </View>
      <Text style={styles.colorSelected}>{color}</Text>
    </View>
  );
}

const CircleContainer = ({radius, setColor, colors, outer, elevation}) => {
  /* STYLES */
  const circleStyles = StyleSheet.create({
    circleContainer: {
      position: !outer ? 'absolute' : 'relative',
      alignSelf: 'center',
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      borderWidth: 0.5,
      borderColor: Colors.gray,
      overflow: 'hidden',
      elevation: elevation,
    },
  });

  const positions = [
    {top: 0, left: 0, transform: [{rotate: '90deg'}]},
    {bottom: 0, left: 0},
    {top: 0, right: 0},
    {bottom: 0, right: 0, transform: [{rotate: '90deg'}]},
  ];

  return (
    <View style={circleStyles.circleContainer}>
      {positions.map((item, index) => {
        return (
          <BiColorContainer
            key={index}
            position={item}
            size={radius}
            setColor={setColor}
            colors={colors.slice(index * 2, index * 2 + 2)}
          />
        );
      })}
    </View>
  );
};

const BiColorContainer = ({position, setColor, size, colors}) => {
  const diagonal = size * Math.sqrt(2);
  const space = (diagonal - size) / Math.sqrt(2);

  /* STYLES */
  const biColorStyles = StyleSheet.create({
    biColorContainer: {
      alignSelf: 'center',
      width: size,
      height: size,
      overflow: 'hidden',
      position: 'absolute',
      backgroundColor: 'white',
    },
    topColor: {
      width: diagonal,
      height: diagonal,
      backgroundColor: colors[0],
      position: 'absolute',
      bottom: space,
      right: space,
      transform: [{rotate: '45deg'}],
    },
    bottomColor: {
      width: diagonal,
      height: diagonal,
      backgroundColor: colors[1],
      position: 'absolute',
      top: space,
      left: space,
      transform: [{rotate: '-45deg'}],
    },
  });
	
  return (
    <View style={[biColorStyles.biColorContainer, position]}>
      <TouchableOpacity
        style={biColorStyles.topColor}
        onPress={() => setColor(colors[0])}
      />
      <TouchableOpacity
        style={biColorStyles.bottomColor}
        onPress={() => setColor(colors[1])}
      />
    </View>
  );
};

export default CuponColorSelector;

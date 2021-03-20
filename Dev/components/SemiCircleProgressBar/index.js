import React from 'react';
import {View, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';

function SemiCircleProgressBar(props) {
  const {percentage, barWidth} = props;
  const realPercentage = Math.min(Math.max(percentage, 0), 100);
  const rotation = (180 * realPercentage) / 100 || 0;
  const radius = props.radius || 120;
  const progresBarWidth = barWidth || 12;
  const innerradius = radius - progresBarWidth;
  const progressBarColor = props.progressBarColor || Colors.business;

  /* STYLES */
  const styles = StyleSheet.create({
    mainContainer: {
      alignItems: 'center',
    },
    backgroundCircle: {
      width: radius * 2,
      height: radius,
      backgroundColor: Colors.grayLight,
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      alignItems: 'center',
      overflow: 'hidden',
      marginBottom: 5,
      // borderTopWidth: 3,
      // borderRightWidth: 3,
      // borderLeftWidth: 3,
      // borderColor: Colors.grayLight,
    },
    progressBarCircleContainer: {
      position: 'absolute',
      top: radius,
    },
    progressBarCircle: {
      width: radius * 2,
      height: radius,
      backgroundColor: progressBarColor,
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
      transform: [
        {translateY: -radius / 2},
        {rotate: `${rotation}deg`},
        {translateY: radius / 2},
      ],
    },
    contentInnerCircle: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      top: progresBarWidth,
      width: innerradius * 2,
      height: innerradius * 2,
      backgroundColor: 'white',
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      elevation: 5,
      overflow: 'hidden',
      borderTopWidth: 0.5,
      borderRightWidth: 0.5,
      borderLeftWidth: 0.5,
      borderColor: Colors.gray,
    },
    /* ROUNDED CORNERS STYLES */
    leftCorner: {
      position: 'absolute',
      top: innerradius + 6,
      left: 0,
      width: progresBarWidth + 0.75,
      height: progresBarWidth,
      borderBottomLeftRadius: innerradius,
      borderBottomRightRadius: innerradius,
      backgroundColor: realPercentage > 0 ? progressBarColor : Colors.grayLight,
      elevation: -1,
      borderRightWidth: 1,
      borderBottomWidth: 0.5,
      borderColor: Colors.gray,
    },
    rightCorner: {
      position: 'absolute',
      top: innerradius + 6,
      right: 0,
      width: progresBarWidth + 0.75,
      height: progresBarWidth,
      borderBottomLeftRadius: innerradius,
      borderBottomRightRadius: innerradius,
      backgroundColor:
        realPercentage < 100 ? Colors.grayLight : progressBarColor,
      elevation: -1,
      borderLeftWidth: 1,
      borderBottomWidth: 0.5,
      borderColor: Colors.gray,
    },
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.backgroundCircle}>
        <View style={styles.progressBarCircleContainer}>
          <View style={styles.progressBarCircle} />
        </View>
        <View style={styles.contentInnerCircle}>{props.children}</View>
      </View>
      {/* LEFT CORNER */}
      <View style={styles.leftCorner} />

      {/* RIGHT CORNER */}
      <View style={styles.rightCorner} />
    </View>
  );
}

export default SemiCircleProgressBar;

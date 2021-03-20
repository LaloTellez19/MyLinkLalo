import React from 'react';
import {View, StyleSheet} from 'react-native';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

const width = Layout.window.width;
const widthUnits = width / 10;
const radius = widthUnits * 2;

const styles = StyleSheet.create({
  mainContainer: {},
  topContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  topBlockContainer: {
    overflow: 'hidden',
    paddingBottom: 3,
  },
  topBlock: {
    width: widthUnits * 4,
    height: 30,
    backgroundColor: 'white',
    elevation: 10,
  },
  topNoElevation: {
    width: widthUnits * 2,
    height: 30,
    backgroundColor: 'transparent',
    elevation: 0.1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: radius * 2,
    height: radius,
    borderTopRightRadius: radius,
    borderTopLeftRadius: radius,
    backgroundColor: Colors.grayLight,
    elevation: 0,
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -50,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderLeftWidth: 3,
    borderColor: Colors.platinum,
  },
  bottomBlock: {
    width: '100%',
    // height: 200,
    backgroundColor: Colors.grayLight,
  },
});

function ComplimentsContainer({dark, children}) {
  const topBlockDark = dark
    ? {backgroundColor: Colors.jet}
    : {backgroundColor: 'white'};

  const bottomBlock = dark
    ? {backgroundColor: 'black'}
    : {backgroundColor: Colors.grayLight};

  const circleColor = dark
    ? {
        backgroundColor: 'black',
        borderColor: '#292929',
      }
    : {
        backgroundColor: Colors.grayLight,
        borderColor: Colors.platinum,
      };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <View style={styles.topBlockContainer}>
          <View style={[styles.topBlock, topBlockDark]} />
        </View>
        <View style={styles.topNoElevation}>
          <View style={[styles.circle, circleColor]} />
        </View>
        <View style={styles.topBlockContainer}>
          <View style={[styles.topBlock, topBlockDark]} />
        </View>
      </View>
      <View style={[styles.bottomBlock, bottomBlock]}>{children}</View>
    </View>
  );
};

export default ComplimentsContainer;

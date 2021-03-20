import React from 'react';
import {View, StyleSheet} from 'react-native';

import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import Text from '../../../components/Text';

const width = Layout.window.width;
const widthUnits = width / 10;
const radius = widthUnits * 2;
const outterRdius = radius + 10;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.grayLight,
  },
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
    height: 65,
    backgroundColor: 'white',
    elevation: 10,
  },
  topNoElevation: {
    width: widthUnits * 2,
    height: 65,
    backgroundColor: 'white',
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
    height: 100,
    backgroundColor: Colors.grayLight,
    borderBottomWidth: 0.5,
  },
});

function CircleShadow(props) {
  return (
    <View>
      <ComplimentsContainer>
        <Text>{'holi'}</Text>
      </ComplimentsContainer>
    </View>
  );
}

const ComplimentsContainer = ({children}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <View style={styles.topBlockContainer}>
          <View style={styles.topBlock} />
        </View>
        <View style={styles.topNoElevation}>
          <View style={styles.circle} />
        </View>
        <View style={styles.topBlockContainer}>
          <View style={styles.topBlock} />
        </View>
      </View>
      <View style={styles.bottomBlock}>{children}</View>
    </View>
  );
};

export default CircleShadow;

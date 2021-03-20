import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Text from '../../components/Text';
import Icon from '../../components/Icon';
import MoneyAmountSelector from '../../components/MoneyAmountSelector';
import CuponColorSelector from '../../components/CuponColorSelector';
import Colors from '../../constants/Colors';
import ColorFragment from './ColorFragment';

/* STYLES */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
    overflow: 'hidden',
  },
  containerText: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  nextIcon: {
    position: 'absolute',
    bottom: 5,
    right: 20,
    transform: [{scaleY: -1}],
  },
  prevIcon: {
    position: 'absolute',
    top: 5,
    right: 20,
  },
});

const testIllust = require('../../assets/illust/1.png');

function MoneyAmount(props) {
  const getSelectorValue = value => {
    console.log('dollars: ', value);
  };

  const [rotation, setRotation] = React.useState(0);

  const userSize = 60;
  const borderWidth = 2;
  const userBorderRadius = 10;
  const countryImagePosition = userBorderRadius === 360 ? 1 : 1.1;

  const userStyles = StyleSheet.create({
    /* USERIMAGE STYLES */
    userContainer: {
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 30,
    },
    userImageContainer: {
      borderWidth: 0.5,
      color: Colors.gray,
      borderRadius: userBorderRadius,
      elevation: 5,
    },
    userImage: {
      width: userSize,
      height: userSize,
      borderWidth: borderWidth,
      borderColor: 'white',
      borderRadius: userBorderRadius,
    },
    countryContainer: {
      width: userSize / 2.3,
      height: userSize / 2.3,
      borderWidth: 0.5,
      color: Colors.gray,
      borderRadius: 360,
      marginTop: -userSize * countryImagePosition,
      marginLeft: userSize * 0.9,
      elevation: -1,
    },
    countryImageContainer: {
      width: userSize / 2.5,
      height: userSize / 2.5,
      borderRadius: 360,
      borderWidth: borderWidth,
      borderColor: 'white',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      marginTop: -userSize / 2.4,
      marginLeft: userSize * 0.9,
      elevation: 6,
    },
    countryImage: {
      width: userSize / 2,
      height: userSize / 2,
      borderRadius: 360,
    },
  });

  return (
    <ScrollView>
      <View>
        <Text style={styles.containerText}>{'Money Amount Selector'}</Text>
        <MoneyAmountSelector getSelectorValue={getSelectorValue} />
      </View>

      {/* <View style={styles.container}>
        <Image style={{width: 100, height: 100}} source={testIllust} />
      </View> */}

      {/* <View style={userStyles.userContainer}>
        <View style={userStyles.userImageContainer}>
          <Image
            style={userStyles.userImage}
            source={{uri: 'https://randomuser.me/api/portraits/women/55.jpg'}}
          />
        </View>
        <View style={userStyles.countryContainer} />
        <View style={userStyles.countryImageContainer}>
          <Image
            style={userStyles.countryImage}
            source={{uri: 'https://www.countryflags.io/fr/flat/64.png'}}
          />
        </View>
      </View> */}

      {/* <View style={styles.container}>
        <CuponColorSelector rotation={rotation} />
        <View style={styles.rotateIcon}>
          <Icon
            name="historial"
            onPress={() => setRotation(rotation + 45.01)}
          />
        </View>
      </View> */}

      <View style={styles.container}>
        <ColorFragment rotation={rotation} />
        <View style={styles.nextIcon}>
          <Icon
            name="historial"
            onPress={() => setRotation(rotation + 45.01)}
          />
        </View>
        <View style={styles.prevIcon}>
          <Icon
            name="historial"
            onPress={() => setRotation(rotation - 45.01)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default MoneyAmount;

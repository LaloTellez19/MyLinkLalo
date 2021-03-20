import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../../constants/Colors';
import Text from '../../components/Text';
import SemiCircleProgressBar from '../../components/SemiCircleProgressBar';

/* STYLES */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    overflow: 'hidden',
  },
  containerText: {
    marginTop: 15,
    marginBottom: 15,
  },
  amountSelector: {
    marginTop: -67,
    paddingBottom: 10,
    elevation: 1,
  },
  /* MINUS PLUS STYLES */
  minusContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 43,
    elevation: 0.1,
    padding: 5,
  },
  plusContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 43,
    elevation: 0.1,
    padding: 5,
  },
  minusPlusLine: {
    width: 40,
    height: 2,
    backgroundColor: Colors.business,
  },
  minusPlusText: {
    fontSize: 16,
    color: Colors.business,
  },
  /* WHITE DIVIDERS STYLES */
  whiteDividersContainer: {
    position: 'absolute',
    bottom: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteDivider: {
    width: 280,
    height: 3,
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
  },
});

function MoneyAmountSelector(props) {
  const {radius, getSelectorValue} = props;
  const outerRadius = radius || 130;
  const innerRadius = outerRadius - 15 || 90;
  const marginTop = outerRadius - 7.5;

  const whiteLines = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [dollars, setDollars] = React.useState(0);

  /* HANDLE DOLLARS CHANGE */
  const handleDollarsChange = increase => {
    const step = 1;
    const newDolllars = increase ? dollars + step : dollars - step;
    const dollarsUpdated = Math.min(Math.max(newDolllars, 0), 50);
    setDollars(dollarsUpdated);
    getSelectorValue(dollarsUpdated);
  };

  /* selectorStyles */
  const selectorStyles = StyleSheet.create({
    /* WHEEL selectorStyles */
    outerWheel: {
      width: outerRadius,
      height: outerRadius,
      borderRadius: outerRadius,
      backgroundColor: Colors.personal,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      transform: [
        {translateY: 0},
        {rotate: `${(dollars / 5) * 18 || 0}deg`},
        {translateY: 0},
      ],
      elevation: 2,
      borderWidth: 1,
      borderColor: Colors.gray,
    },
    innerWheel: {
      width: innerRadius,
      height: innerRadius,
      borderRadius: innerRadius,
      backgroundColor: Colors.grayLight,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -marginTop,
      elevation: 3,
      borderWidth: 1,
      borderColor: Colors.gray,
    },
    wheelText: {
      fontSize: 24,
      color: Colors.personal,
    },
    triangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 50,
      borderRightWidth: 50,
      borderBottomWidth: 100,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: Colors.personal,
      transform: [{rotate: '-90deg'}],
      marginRight: outerRadius * 0.7,
    },
  });

  return (
    <View style={styles.container}>
      {/* PROGRESS BAR */}
      <SemiCircleProgressBar
        percentage={dollars * 2}
        radius={outerRadius - 10}
        barWidth={16}
        progressBarColor={Colors.pet}
      />

      {/* ROTATING SELECTOR */}
      <View style={styles.amountSelector}>
        <View>
          <View style={selectorStyles.outerWheel}>
            <View style={selectorStyles.triangle} />
          </View>
          <View style={selectorStyles.innerWheel}>
            <Text style={selectorStyles.wheelText}>{`$${dollars || 0}`}</Text>
          </View>
        </View>
      </View>

      {/* MINUS SIGN */}
      <TouchableOpacity
        style={styles.minusContainer}
        onPress={() => handleDollarsChange(false)}>
        <View style={styles.minusPlusLine} />
        <Text style={styles.minusPlusText}>{'-'}</Text>
      </TouchableOpacity>

      {/* PLUS SIGN */}
      <TouchableOpacity
        style={styles.plusContainer}
        onPress={() => handleDollarsChange(true)}>
        <View style={styles.minusPlusLine} />
        <Text style={styles.minusPlusText}>{'+'}</Text>
      </TouchableOpacity>

      {/* WHITE DIVIDERS */}
      <View style={styles.whiteDividersContainer}>
        {whiteLines.map((item, index) => {
          return (
            <View
              style={[
                styles.whiteDivider,
                {
                  transform: [{rotate: `${item * 18}deg`}],
                },
              ]}
              key={index}
            />
          );
        })}
      </View>
    </View>
  );
}

export default MoneyAmountSelector;

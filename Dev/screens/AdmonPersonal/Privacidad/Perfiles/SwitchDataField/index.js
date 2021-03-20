import React from 'react';
import {View, Switch, StyleSheet} from 'react-native';

import Text from '../../../../../components/Text';
import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  switchDataField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
    width: width,
  },
  textField: {
    width: width / 2,
    marginLeft: 30,
  },
  mainTextField: {
    width: '75%',
    display: 'flex',
    marginTop: 4,
    marginBottom: 4,
    fontSize: 13,
    color: Colors.defaultTextColor,
    borderBottomWidth: 1,
    borderColor: Colors.gray,
  },
  subTextField: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  switch: {
    width: 120,
    alignItems: 'center',
  },
  switchText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
});

const labels = ['activado', 'desactivado'];

function SwitchDataField(props) {
  const {data, type, active, index} = props.data;

  const switchValue = active;

  const checkValue = () => {
    props.checkSwitchValue(!switchValue, index);
  };

  return (
    <View style={styles.switchDataField}>
      <View style={styles.textField}>
        <Text style={styles.mainTextField}>{data}</Text>
        <Text style={styles.subTextField}>{type}</Text>
      </View>
      <View style={styles.switch}>
        <Switch
          trackColor={{true: Colors.personal, false: Colors.gray}}
          thumbColor={'white'}
          onValueChange={() => checkValue()}
          value={switchValue}
        />
        <Text style={styles.switchText}>
          {switchValue ? labels[0] : labels[1]}
        </Text>
      </View>
    </View>
  );
}

export default SwitchDataField;

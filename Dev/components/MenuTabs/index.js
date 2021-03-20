import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from '../Text';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  menu: {
    alignItems: 'center',
    paddingTop: 20,
    // borderBottomWidth: 0.5,
    // borderColor: Colors.gray,
    backgroundColor: 'transparent',
  },
  menuItem: {
    width: width / 3,
    borderBottomWidth: 2,
    borderColor: 'white',
    paddingBottom: 0.5,
  },
  menuText: {
    textAlign: 'center',
  },
});

function MenuTabs(props) {
  const {
    opciones,
    seleccion,
    seleccionar,
    personal,
    fontSize,
    textColor,
  } = props;
  const color = personal
    ? Colors.personal
    : textColor
    ? textColor
    : Colors.business;
  const fontsize = fontSize || 18;

  const getBorderColor = active => {
    if (active && personal && !textColor) {
      return Colors.personal;
    } else if (active && !personal && !textColor) {
      return Colors.business;
    } else if (active && !personal && textColor) {
      return Colors.platinum;
    } else {
      return 'transparent';
    }
  };

  return (
    <View style={styles.menu}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {opciones.map((item, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.menuItem,
                {borderColor: getBorderColor(seleccion === index)},
                {width: width / opciones.length},
              ]}
              onPress={() => seleccionar(index)}
              key={index}>
              <Text
                style={[styles.menuText, {fontSize: fontsize, color: color}]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default MenuTabs;

import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import Text from '../../components/Text';
import Icon from '../../components/Icon';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  /* ESTILOS MENU */
  menu: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  indicador: {
    width: 5,
    height: 5,
    borderRadius: 100,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  menuItem: {
    width: width / 5,
  },
  menuIcon: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'white',
  },
  menuTextContainer: {
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
  },
  menuText: {
    fontSize: 10,
    color: Colors.defaultTextColor,
  },
});

function MenuPerfiles(props) {
  const {menuItems, seleccionMenu, seleccionarOpcion, indicador} = props;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.menu}>
      {menuItems.map((item, index) => {
        return (
          <View style={styles.menuItem} key={index}>
            {indicador && (
              <View
                style={[
                  styles.indicador,
                  item.indicador
                    ? {backgroundColor: Colors.pet}
                    : 'transparent',
                ]}
              />
            )}
            <View
              style={[
                styles.menuIcon,
                seleccionMenu.text === item.text
                  ? {borderColor: Colors.personal}
                  : null,
              ]}>
              <Icon
                name={item.name}
                size={50}
                factor={0.8}
                Borderless
                forceColor
                color={
                  seleccionMenu.text === item.text
                    ? Colors.personal
                    : Colors.gray
                }
                onPress={() => seleccionarOpcion(item)}
              />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>{item.text}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

export default MenuPerfiles;

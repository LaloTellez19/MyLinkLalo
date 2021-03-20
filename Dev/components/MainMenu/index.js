import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

import Text from '../Text';
import Icon from '../Icon';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  menu: {
    height: 83,
    paddingTop: 10,
    marginTop: 0,
    paddingBottom: 10,
    elevation: 5,
    backgroundColor: 'white',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuItems: {
    width: width,
  },
  menuText: {
    paddingTop: 4,
    textAlign: 'center',
    fontSize: 11,
    color: Colors.defaultTextColor,
  },
});

function MainMenu(props) {
  const {
    menuItems,
    totalItems,
    activeColor,
    activeBackground,
    seleccion,
    size,
    onPress,
    inIndex,
    element,
    dontScrollTo,
  } = props;

  const menuScroll = React.useRef(null);

  const menuItemsStyles = {
    width: width / totalItems,
    alignItems: 'center',
  };

  const colorActive = activeColor || 'white';
  const backgroundActive = activeBackground || Colors.personal;

  const scrollToOption = index => {
    const iconSize = width / totalItems;
    if (menuScroll) {
      setTimeout(() => {
        menuScroll.current.scrollTo({
          x: -width / 2 + (index + 1) * iconSize - iconSize / 2,
          animated: true,
        });
      }, 0);
    }
  };

  return (
    <ScrollView
      ref={menuScroll}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.menu}>
      {menuItems.map((item, index) => {
        return (
          <View key={index} style={styles.menuItem}>
            <View style={menuItemsStyles}>
              <Icon
                name={item.name}
                size={size || 50}
                forceColor
                color={seleccion === index ? colorActive : Colors.gray}
                background={seleccion === index ? backgroundActive : null}
                onPress={() => {
                  onPress(index);
                  if (!dontScrollTo) {
                    scrollToOption(index);
                  }
                }}
              />
            </View>
            <Text
              style={[
                styles.menuText,
                seleccion === index ? {color: backgroundActive} : null,
              ]}>
              {item.text}
            </Text>
            {index === inIndex && <View>{element}</View>}
          </View>
        );
      })}
    </ScrollView>
  );
}

export default MainMenu;

import React from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';

import Colors from '../../constants/Colors';
import Text from '../Text';
import Icon from '../Icon';

/* STYLES */
const styles = StyleSheet.create({
  /* ESTILOS MENU */
  menu: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  menuOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 130,
    height: 32,
    paddingRight: 5,
    paddingLeft: 5,
  },
  menuOptionContainerWithIcon: {
    paddingRight: 10,
    paddingLeft: 0,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 130,
  },
  menuOptionNoIcon: {
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  onlyOptionRadius: {
    borderRadius: 5,
  },
  firstItemRadius: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  lastItemRadius: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});

function MenuContextual(props) {
  const {
    opciones,
    icons,
    position,
    right,
    index,
    itemHeight,
    lastIndex,
    contentOffsetY,
    initialValue,
    underlayColor,
  } = props;

  // console.log('index: ', index);
  /* GET POSITION FOR CONTEXTUAL MENU */
  const getPosition = () => {
    const value = (index + 1) * itemHeight;
    const adjusment = index === lastIndex ? itemHeight : initialValue;
    const finalPosition = value - Math.ceil(contentOffsetY) - adjusment;
    // console.log('finalPosition: ', finalPosition);
    return finalPosition;
  };

  let menuPosition = {
    position: 'absolute',
    right: right ? right : 5,
    top: position || getPosition() || 0,
  };

  const [optionSelected, setOptionSelected] = React.useState({});

  /* HANDLE OPTION SELECTION (UNDERLAY CHANGES) */
  const handleItemSelection = item => {
    setOptionSelected(item);
  };

  return (
    <View style={[styles.menu, menuPosition]}>
      {opciones.map((item, index) => {
        return (
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={underlayColor || Colors.grayLight}
            onShowUnderlay={() => handleItemSelection({...item, index})}
            onHideUnderlay={() => handleItemSelection({})}
            style={[
              styles.menuOptionContainer,
              icons ? styles.menuOptionContainerWithIcon : null,
              opciones.length === 1
                ? styles.onlyOptionRadius
                : index === 0
                ? styles.firstItemRadius
                : index === opciones.length - 1
                ? styles.lastItemRadius
                : null,
            ]}
            onPress={() => (item.onPress ? item.onPress() : null)}
            key={index}>
            <View
              style={[
                styles.menuOption,
                !icons ? styles.menuOptionNoIcon : null,
              ]}>
              {item.name && (
                <Icon
                  name={item.name}
                  Borderless
                  forceColor
                  color={
                    index === optionSelected.index && underlayColor
                      ? 'white'
                      : Colors.gray
                  }
                />
              )}
              <Text
                style={[
                  styles.menuText,
                  index === optionSelected.index && underlayColor
                    ? {color: 'white'}
                    : null,
                ]}>
                {item.text}
              </Text>
            </View>
          </TouchableHighlight>
        );
      })}
    </View>
  );
}

export default MenuContextual;

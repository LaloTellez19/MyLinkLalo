import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import Colors from '../../constants/Colors';
import Icon from '../Icon';
import Text from '../Text';

/* CATEGORIES DATA */
import Categories from '../../constants/Categories';

/* STYLES */
const styles = StyleSheet.create({
  /* CATEGORIES MENU STYLES */
  categoriesMenu: {
    height: 80,
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 5,
    backgroundColor: 'white',
  },
  categoriesMenuItem: {
    alignItems: 'center',
    width: 80,
  },
  categoriesMenuItemText: {
    fontSize: 10,
    color: Colors.defaultTextColor,
    marginTop: 5,
  },
});

function CategoriesMenu(props) {
  const {categorySelected, handleCategorySelection} = props;
  const allCategories = Categories.ES_MX;
  const categoriesKeys = Object.keys(allCategories);
  const categoriesMenu = categoriesKeys.map(key => {
    return {...allCategories[key], key};
  });
	
  React.useEffect(() => {
    const defaultCategory = categoriesMenu[0];
    !categorySelected ? handleCategorySelection(defaultCategory) : null;
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesMenu}>
      {categoriesMenu.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.categoriesMenuItem}
            onPress={() => {
              handleCategorySelection(item);
            }}>
            <Icon
              name={item.icon}
              factor={0.8}
              forceColor
              color={Colors.gray}
              background={
                item.key === categorySelected.key
                  ? Colors.grayLight
                  : 'transparent'
              }
            />
            <Text style={styles.categoriesMenuItemText}>{item.category}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default CategoriesMenu;

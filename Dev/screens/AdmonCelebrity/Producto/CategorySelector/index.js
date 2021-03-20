import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    // backgroundColor: Colors.grayLight,
  },
  /* CATEGORIES LIST SECTION */
  categoriesListSection: {
    height: height / 2.85,
    alignItems: 'center',
    paddingTop: 25,
  },
  /* ADD CATEGORY STYLES */
  addCategoryContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  addCategory: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  addCategoryText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  /* CATEGORIES HORIZONTAL LIST STYLES */
  horizontalList: {
    maxHeight: 90,
    marginTop: 40,
  },
  horizontalListItem: {
    alignItems: 'center',
    width: width / 3.5,
  },
  horizontalImageContainer: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    overflow: 'hidden',
  },
  horizontalImageContainerSelected: {
    borderWidth: 3,
    borderColor: Colors.business,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  horizontalListImage: {
    width: 65,
    height: 65,
  },
  horizontalListItemText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  horizontalListItemTextSelected: {
    fontSize: 14,
    color: Colors.business,
  },
  /* CATEGORIES VERTICAL LIST STYLES */
  verticalList: {
    width: width,
    marginTop: 5,
    marginBottom: 5,
  },
  verticalListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 5,
  },
  verticalImageContainer: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 10,
    overflow: 'hidden',
  },
  verticalImageContainerSelected: {
    borderWidth: 2,
    borderColor: Colors.business,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  verticalListImage: {
    width: 50,
    height: 50,
  },
  verticalListItemText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginLeft: 15,
  },
  verticalListItemTextSelected: {
    fontSize: 14,
    color: Colors.business,
    marginLeft: 15,
  },
  /* BUTTONS STYLES */
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginBottom: 10,
  },
  button: {
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.grayLight,
  },
});

function CategorySelector(props) {
  const {goToProp, handlePropChange, categories, addCategory} = props;
  const [categorySelected, setCategorySelected] = React.useState({});

  /* HANDLE SELECT CATEGORY */
  const handleSelectCategory = categoria => {
    const value = categoria !== categorySelected ? categoria : '';
    setCategorySelected(value);
    handlePropChange('category', value);
  };

  return (
    <View style={styles.mainContainer}>
      {/* CATEGORIES LIST SECTION */}
      <View style={styles.categoriesListSection}>
        {/* ADD NEW CATEGORY */}
        <View style={styles.addCategoryContainer}>
          <View style={styles.addCategory}>
            <Icon
              name="plus"
              size={40}
              factor={0.8}
              forceColor
              color={'white'}
              background={Colors.business}
              onPress={() => addCategory()}
            />
            <Text style={styles.addCategoryText}>{'Agregar'}</Text>
          </View>
        </View>

        {/* CATEGORIES LIST */}
        <HorizontalList
          categories={categories}
          handleSelectCategory={handleSelectCategory}
          categorySelected={categorySelected}
        />
      </View>

      {/* BUTTONS */}
      <View style={styles.buttonsContainer}>
        {/* GO TO PREV STEP BUTTON */}
        <TouchableOpacity style={styles.button} onPress={() => goToProp(-1)}>
          <Text style={[styles.buttonText, {color: Colors.gray}]}>
            {'Anterior'}
          </Text>
        </TouchableOpacity>

        {/* GO TO NEXT STEP BUTTON */}
        <TouchableOpacity
          style={[styles.button, {backgroundColor: Colors.business}]}
          onPress={() => goToProp(1)}>
          <Text style={styles.buttonText}> {'Siguiente'} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const HorizontalList = ({
  categories,
  handleSelectCategory,
  categorySelected,
}) => {
  return (
    <ScrollView
      horizontal
      style={styles.horizontalList}
      showsHorizontalScrollIndicator={false}>
      {categories.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.horizontalListItem}
            activeOpacity={0.8}
            onPress={() => handleSelectCategory(item.category)}>
            <View
              style={
                item.category === categorySelected
                  ? styles.horizontalImageContainerSelected
                  : styles.horizontalImageContainer
              }>
              <Image
                style={styles.horizontalListImage}
                source={{uri: item.img}}
              />
            </View>
            <Text
              style={
                item.category === categorySelected
                  ? styles.horizontalListItemTextSelected
                  : styles.horizontalListItemText
              }>
              {item.category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const VerticalList = ({categories, handleSelectCategory, categorySelected}) => {
  return (
    <ScrollView style={styles.verticalList} nestedScrollEnabled={true}>
      {categories.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.verticalListItem}
            onPress={() => handleSelectCategory(item.category)}>
            <View
              style={
                item.category === categorySelected
                  ? styles.verticalImageContainerSelected
                  : styles.verticalImageContainer
              }>
              <Image
                style={styles.verticalListImage}
                source={{uri: item.img}}
              />
            </View>
            <Text
              style={
                item.category === categorySelected
                  ? styles.verticalListItemTextSelected
                  : styles.verticalListItemText
              }>
              {item.category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default CategorySelector;

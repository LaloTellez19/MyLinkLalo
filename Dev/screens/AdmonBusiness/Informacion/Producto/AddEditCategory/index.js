import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';
import EditTextField from '../../../../../components/EditTextField';

import ImageSelector from '../ImageSelector';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  addCategoryContainer: {
    // position: 'absolute',
    // top: -73,
    // elevation: 0,
    backgroundColor: 'white',
    width: width,
    height: '100%',
  },
  /* CATEGORY INFO STYLES */
  category: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  categoryName: {
    marginTop: 5,
    fontSize: 18,
    color: Colors.defaultTextColor,
  },
  imageStyles: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: Colors.business,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryDescription: {
    marginTop: 2,
    marginRight: 25,
    marginLeft: 25,
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  /* MAIN-MENU STYLES */
  mainMenuContainer: {
    marginTop: 0,
    elevation: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 5,
  },
  mainMenu: {},
  mainMenuItem: {
    alignItems: 'center',
    width: width / 3,
  },
  mainMenuText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginTop: -5,
    marginBottom: 5,
  },
});

function AddEditCategory(props) {
  const {menu, handleAddOrEditCategory, categorySelected} = props;
  const categoryBase = {
    img: '',
    category: '',
    description: '',
    products: {},
    productsKeys: [],
  };

  let [index, setIndex] = React.useState(0);
  const [categoryProp, setCategoryProp] = React.useState(menu[index].id);
  const [category, setCategory] = React.useState(
    categorySelected ? {...categorySelected} : categoryBase,
  );

  /* CAMBIAR ANTERIOR / SIGUIENTE OPCION */
  const goToProp = value => {
    setIndex(index + value);
    setCategoryProp(menu[index + value].id);
  };

  /* CAMBIAR PROPIEDAD PRODUCTO */
  const handlePropChange = (prop, value) => {
    category[prop] = value;
    setCategory({...category});
  };

  /* GUARDAR */
  const saveCategory = () => {
    handleAddOrEditCategory(category, categorySelected ? true : false);
    goBack();
  };

  /* GO BACK */
  const goBack = () => {
    Navigation.pop(props.componentId, {
      component: {
        name: 'my-link.AddEditCategory',
      },
    });
  };

  return (
    <View style={styles.addCategoryContainer}>
      {/* HEADER */}
      <Header goBack={() => goBack()} />

      {/* CATEGORY INFO */}
      <View style={styles.category}>
        {/* CATEGORY IMAGE */}
        {category.img === '' && !categorySelected && (
          <View style={styles.imageStyles}>
            <Icon
              name="plus"
              size={20}
              factor={0.7}
              Borderless
              forceColor
              color={Colors.gray}
              background={Colors.grayLight}
            />
          </View>
        )}
        {category.img !== '' && (
          <View>
            <Image style={styles.imageStyles} source={{uri: category.img}} />
          </View>
        )}
        {category.img === '' && categorySelected && (
          <View>
            <Image
              style={styles.imageStyles}
              source={{uri: categorySelected.img}}
            />
          </View>
        )}

        {/* CATEGORY NAME */}
        <Text style={styles.categoryName}>
          {category.category === ''
            ? 'Nombre de la categoría'
            : category.category}
        </Text>

        {/* CATEGORY DESCRIPTION */}
        <Text style={styles.categoryDescription} numberOfLines={1}>
          {category.description === ''
            ? 'Descripción de la categoría'
            : category.description}
        </Text>
        <Text style={styles.categoryDescription} numberOfLines={1}>
          {''}
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
        {/* MAIN-MENU */}
        <View style={styles.mainMenuContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.mainMenu}>
            {menu.map((item, index) => {
              return (
                <View key={index} style={styles.mainMenuItem}>
                  <Icon
                    name={item.name}
                    size={50}
                    factor={0.8}
                    Borderless
                    forceColor
                    color={
                      categoryProp === item.id ? Colors.business : Colors.gray
                    }
                  />
                  <Text style={styles.mainMenuText}>{item.text}</Text>

                  {/* COMPLETED STEP - ADDING */}
                  {!categorySelected && (
                    <Icon
                      name="seen_arrow"
                      size={25}
                      forceColor
                      color={'white'}
                      background={
                        category[item.id] !== '' ? Colors.pet : 'white'
                      }
                    />
                  )}
                  {/* COMPLETED STEP - EDITING */}
                  {categorySelected && (
                    <Icon
                      name="seen_arrow"
                      size={25}
                      forceColor
                      color={'white'}
                      background={
                        category[item.id] !== categorySelected[item.id] &&
                        category[item.id] !== ''
                          ? Colors.pet
                          : 'white'
                      }
                    />
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* EDITABLE OPTIONS */}

        {/* SELECT IMG */}
        {categoryProp === menu[0].id && (
          <ImageSelector
            goToProp={goToProp}
            handlePropChange={handlePropChange}
            editing={categorySelected ? true : false}
          />
        )}

        {/* WRITE NAME */}
        {categoryProp === menu[1].id && (
          <EditTextField
            handlePropChange={handlePropChange}
            property={menu[1].id}
            label={menu[1].text}
            goToProp={goToProp}
            value={category.category}
          />
        )}

        {/* WRITE DESCRIPTION */}
        {categoryProp === menu[2].id && (
          <EditTextField
            handlePropChange={handlePropChange}
            property={menu[2].id}
            label={menu[2].text}
            goToProp={goToProp}
            save={saveCategory}
            value={category.description}
          />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

export default AddEditCategory;

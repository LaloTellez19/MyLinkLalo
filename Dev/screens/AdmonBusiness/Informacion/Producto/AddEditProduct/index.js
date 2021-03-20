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
import CategorySelector from '../CategorySelector';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  addproductContainer: {
    // position: 'absolute',
    // top: -73,
    // elevation: 0,
    backgroundColor: 'white',
    width: width,
    height: '100%',
  },
  /* PRODUCT INFO STYLES */
  product: {
    alignItems: 'center',
  },
  productName: {
    marginTop: 5,
    fontSize: 18,
    color: Colors.defaultTextColor,
  },
  noImageSelected: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: Colors.business,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productDescription: {
    marginTop: 2,
    marginRight: 25,
    marginLeft: 25,
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  /* MAIN-MENU STYLES */
  mainMenuContainer: {
    marginTop: 5,
    elevation: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 5,
  },
  mainMenu: {},
  mainMenuItem: {
    alignItems: 'center',
    width: width / 5,
  },
  mainMenuText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginTop: -5,
    marginBottom: 5,
  },
});

function AddEditProduct(props) {
  const {
    menu,
    productSelected,
    handleAddOrEditProduct,
    categories,
    addCategory,
    active,
  } = props;

  const productBase = {
    img: '',
    category: '',
    name: '',
    description: '',
    price: '',
    hasPromotion: false,
  };

  let [index, setIndex] = React.useState(active);
  const [productProp, setProductProp] = React.useState(menu[index].id);
  const [product, setProduct] = React.useState(
    productSelected ? {...productSelected} : productBase,
  );

  /* CAMBIAR ANTERIOR / SIGUIENTE OPCION */
  const goToProp = value => {
    setIndex(index + value);
    setProductProp(menu[index + value].id);
  };

  /* CAMBIAR PROPIEDAD PRODUCTO */
  const handlePropChange = (prop, value) => {
    product[prop] = value;
    setProduct({...product});
  };

  /* GUARDAR */
  const saveproduct = () => {
    handleAddOrEditProduct(product, productSelected ? true : false);
    goBack();
  };

  /* GO BACK */
  const goBack = () => {
    Navigation.pop(props.componentId, {
      component: {
        name: 'my-link.AddEditProduct',
      },
    });
  };

  return (
    <View style={styles.addproductContainer}>
      {/* HEADER */}
      <Header goBack={() => goBack()} />

      {/* PRODUCT INFO */}
      <View style={styles.product}>
        {/* PRODUCT IMAGE */}
        {product.img === '' && (
          <View style={styles.noImageSelected}>
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
        {/* {productSelected.img === '' && (
          <View style={styles.noImageSelected}>
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
        )} */}
        {product.img !== '' && (
          <View>
            <Image style={styles.noImageSelected} source={{uri: product.img}} />
          </View>
        )}
        {/* {product.img === '' && (
          <View>
            <Image
              style={styles.noImageSelected}
              source={{uri: product.img}}
            />
          </View>
        )} */}

        {/* PRODUCT NAME */}
        <Text style={styles.productName}>
          {product.name === '' ? 'Nombre del producto' : product.name}
        </Text>

        {/* PRODUCT DESCRIPTION */}
        <Text style={styles.productDescription} numberOfLines={1}>
          {product.description === ''
            ? 'Descripción del producto'
            : product.description}
        </Text>

        {/* PRODUCT PRICE */}
        <Text style={styles.productDescription} numberOfLines={1}>
          {`$ ${product.price}`}
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
                      productProp === item.id ? Colors.business : Colors.gray
                    }
                  />
                  <Text style={styles.mainMenuText}>{item.text}</Text>

                  {/* COMPLETED STEP - ADDING */}
                  {!productSelected && (
                    <Icon
                      name="seen_arrow"
                      size={25}
                      forceColor
                      color={'white'}
                      background={
                        product[item.id] !== '' ? Colors.pet : 'white'
                      }
                    />
                  )}

                  {/* COMPLETED STEP - EDITING */}
                  {productSelected && (
                    <Icon
                      name="seen_arrow"
                      size={25}
                      forceColor
                      color={'white'}
                      background={
                        product[item.id] !== productSelected[item.id] &&
                        product[item.id] !== ''
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
        {productProp === menu[0].id && (
          <ImageSelector
            goToProp={goToProp}
            handlePropChange={handlePropChange}
            editing={productSelected ? true : false}
          />
        )}

        {/* SELECT CATEGORY */}
        {productProp === menu[1].id && (
          <CategorySelector
            goToProp={goToProp}
            handlePropChange={handlePropChange}
            categories={categories}
            addCategory={addCategory}
          />
        )}

        {/* WRITE NAME */}
        {productProp === menu[2].id && (
          <EditTextField
            handlePropChange={handlePropChange}
            property={menu[2].id}
            label={menu[2].text}
            goToProp={goToProp}
            value={product.name}
          />
        )}

        {/* WRITE DESCRIPTION */}
        {productProp === menu[3].id && (
          <EditTextField
            handlePropChange={handlePropChange}
            property={menu[3].id}
            label={menu[3].text}
            goToProp={goToProp}
            value={product.description}
          />
        )}

        {/* WRITE PRICE */}
        {productProp === menu[4].id && (
          <EditTextField
            handlePropChange={handlePropChange}
            property={menu[4].id}
            label={menu[4].text}
            goToProp={goToProp}
            save={saveproduct}
            value={product.price}
          />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

export default AddEditProduct;

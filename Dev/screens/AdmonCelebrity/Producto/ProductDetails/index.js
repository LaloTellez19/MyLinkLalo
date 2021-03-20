import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import MenuContextual from '../../../../components/MenuContextual';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    position: 'absolute',
    alignItems: 'center',
    elevation: 10,
    backgroundColor: 'white',
    width: width,
    height: height * 0.85,
  },
  mainShowOverlay: {
    width: width,
    height: height - 63,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  /* PRODUCT DETAILS STYLES */
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    marginTop: 10,
  },
  productCategory: {
    fontSize: 20,
    color: Colors.defaultTextColor,
    marginTop: 20,
    marginBottom: 20,
  },
  productOptions: {
    position: 'absolute',
    right: 0,
  },
  productImageContainer: {
    width: 170,
    height: 170,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 170,
    height: 170,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productDetails: {
    alignItems: 'center',
  },
  productName: {
    fontSize: 20,
    color: Colors.defaultTextColor,
    marginTop: 20,
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    margin: 20,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 20,
    color: Colors.defaultTextColor,
    marginTop: 20,
    marginBottom: 20,
  },
  /* PROMOTION LABEL STYLES */
  promotionLabel: {
    position: 'absolute',
    bottom: 130,
    right: -45,
    width: 90,
    height: 90,
    backgroundColor: Colors.business,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 1,
    transform: [{rotate: '45deg'}],
  },
  promotionIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    elevation: 1,
  },
});

/* DEFAULT IMG */
const defaultImage = 'https://i.picsum.photos/id/179/200/200.jpg';

function ProductDetails(props) {
  const {
    data,
    contextMenu,
    product,
    handlePromotions,
    goBack,
    editProduct,
    handleDeleteItem,
    showOverlay,
  } = props;
  const [showOptions, setShowOptions] = React.useState(false);

  /* CONTEXT MENU OPTIONS */
  const options = showOverlay
    ? false
    : [
        {
          text: contextMenu[0],
          onPress: () => {
            editProduct();
            setShowOptions(false);
          },
        },
        {
          text: contextMenu[1],
          onPress: () => {
            handleDeleteItem(product, true);
            setShowOptions(false);
          },
        },
        // {
        //   text: product.hasPromotion ? contextMenu[4] : contextMenu[2],
        //   onPress: () => handlePromotions(product.hasPromotion),
        // },
        {
          text: contextMenu[3],
          onPress: () => {
            goBack();
            setShowOptions(false);
          },
        },
      ];

  const vip = data ? data.vip === 1 : false;
  const vipDark = data ? data.vip === 2 : false;

  const backgroundColor = vipDark
    ? {backgroundColor: 'black'}
    : {backgroundColor: 'white'};

  const backgroundColor_2 = vipDark
    ? {backgroundColor: Colors.jet}
    : {backgroundColor: 'white'};

  const textColor = vipDark
    ? {color: Colors.grayLight}
    : {color: Colors.defaultTextColor};

  const textColor_2 = vipDark
    ? {color: Colors.silverMetallic}
    : {color: Colors.defaultTextColor};

  const textColor_3 = vipDark
    ? {color: 'white'}
    : {color: Colors.defaultTextColor};

  return (
    <TouchableOpacity
      style={[
        !showOverlay ? styles.mainContainer : styles.mainShowOverlay,
        backgroundColor,
      ]}
      onPress={() => setShowOptions(false)}
      activeOpacity={1}>
      <View style={styles.productHeader}>
        <Text style={[styles.productCategory, textColor]}>
          {product.category}
        </Text>
        {!showOverlay && (
          <View style={styles.productOptions}>
            <Icon
              name="options"
              Borderless
              factor={0.7}
              forceColor
              color={Colors.gray}
              onPress={() => setShowOptions(true)}
            />
          </View>
        )}
      </View>

      <View style={styles.productImageContainer}>
        <Image
          style={styles.productImage}
          source={{uri: product.img ? product.img : defaultImage}}
        />

        {/* PROMOTION LABEL */}
        {product.hasPromotion && <View style={styles.promotionLabel} />}

        {/* PROMOTION ICON */}
        {product.hasPromotion && (
          <View style={styles.promotionIcon}>
            <Icon
              name="brand"
              size={24}
              factor={0.8}
              Borderless
              forceColor
              color={Colors.business}
              background={'white'}
            />
          </View>
        )}
      </View>

      <View style={styles.productDetails}>
        <Text style={[styles.productName, textColor_2]}>{product.name}</Text>
        <Text style={[styles.productDescription, textColor_3]}>
          {product.description}
        </Text>
        <Text style={[styles.productPrice, textColor]}>{`$${
          product.price
        }`}</Text>
      </View>

      {showOptions && !showOverlay && (
        <MenuContextual opciones={options} position={35} />
      )}
    </TouchableOpacity>
  );
}

export default ProductDetails;

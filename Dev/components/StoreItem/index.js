import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from '../../components/Text';
import Icon from '../../components/Icon';

const height = Layout.window.height;

/* STYLE */
const styles = StyleSheet.create({
  storeItemContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 350,
  },
  iconContainer: {
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  storeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 260,
    elevation: 3,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  storeItemImg: {
    width: 130,
    height: 135,
    borderRadius: 10,
  },
  storeItemInfo: {
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeItemDescription: {
    width: 125,
    maxHeight: 40,
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 1,
    marginBottom: 5,
  },
  storeItemBuy: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  storeItemPrice: {
    width: '50%',
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginRight: 5,
  },
  storeItemSelector: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalQuantity: {
    width: 70,
    marginRight: 5,
  },
  expiration: {
    fontSize: 14,
    color: Colors.business,
    marginTop: 5,
  },
  storeItemExpiration: {
    fontSize: 12,
    color: Colors.business,
    marginBottom: 5,
  },
});

function StoreItem(props) {
  const {item, addToCart, removeFromCart, seeDetails, cartView} = props;

  return (
    <TouchableOpacity
      style={styles.storeItemContainer}
      onPress={() => seeDetails(item)}
      activeOpacity={0.8}>
      {/* ICON */}
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={45} factor={0.8} Colorless />
      </View>

      {/* ITEM INFO */}
      <View style={styles.storeItem}>
        <Image style={styles.storeItemImg} source={{uri: item.img}} />
        <View style={styles.storeItemInfo}>
          <Text style={styles.storeItemDescription}>{item.description}</Text>
          <View style={styles.storeItemBuy}>
            {/* {cartView && (
              <View style={styles.totalQuantity}>
                <Text style={styles.storeItemPrice}>{`${
                  item.quantity
                } x`}</Text>
                <Text style={styles.storeItemPrice}>
                  {`$${item.price * item.quantity}`}
                </Text>
              </View>
            )}
            {!cartView && (
              <Text style={styles.storeItemPrice}>{`$${item.price}`}</Text>
            )} */}
            <Text style={styles.storeItemPrice}>{`$${item.price}`}</Text>
            <Icon
              name={removeFromCart ? 'times' : 'shopping_cart'}
              size={40}
              factor={0.8}
              forceColor
              color={Colors.gray}
              onPress={() =>
                removeFromCart ? removeFromCart(item) : addToCart(item)
              }
            />
          </View>
          {/* EXPIRATION */}
          {item.expiration && !cartView && (
            <View>
              <Text style={styles.expiration}>{'Vence el: '}</Text>
              <Text style={styles.storeItemExpiration}>{`${
                item.expiration.day
              }-${item.expiration.month}-${item.expiration.year}`}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default StoreItem;

import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import Text from '../../../components/Text';
import StoreItem from '../../../components/StoreItem';
import {ImageHeader} from '../StoreComponents';

const width = Layout.window.width;
const height = Layout.window.height - 63 - 83;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: '100%',
  },
  /* ITEMS COUNT STYLES */
  itemsCount: {
    marginTop: 15,
    marginBottom: 15,
  },
  itemsCountText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  /* ITEMS LIST STYLES */
  itemsList: {
    width: '100%',
    height: height,
    backgroundColor: 'white',
  },
  list: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  listHeader: {
    flex: 1,
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginTop: 10,
    marginBottom: 10,
  },
  /* LIST FOOTER STYLES */
  footer: {
    height: 150,
    marginTop: 20,
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  totalValueContainer: {
    width: 130,
    height: 30,
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderRadius: 10,
    elevation: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  continue: {
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 100,
    marginRight: 100,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    backgroundColor: Colors.personal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    fontSize: 16,
    color: 'white',
  },
});

/* IMG */
const headerImg = require('../../../assets/images/store/cart.png');

function Cart(props) {
  const {
    cartItems,
    continueBuying,
    removeFromCart,
    setNewItemAdded,
    seeDetails,
  } = props;

  const [cartTotal, setCartTotal] = React.useState(0);
  const [continueShopping, setContinueShopping] = React.useState(false);
  const [scrollEnabled, setScrollEnabled] = React.useState(true);

  /* COMPONENTDIDMOUNT */
  React.useEffect(() => {
    console.log(getTotal(cartItems));
    // setCartTotal(getTotal(cartItems));
  }, []);

  /* UPDATE TOTAL COST OF ITEMS */
  React.useEffect(() => {
    setCartTotal(getTotal(cartItems));
  }, [cartItems]);

  /* GET TOTAL COST OF ITEMS */
  const getTotal = data => {
    let totalCount = 0;
    data.map(item => (totalCount += item.price * item.quantity));

    return totalCount;
  };

  const onScroll = offsetY => {
    const viewHeight = cartItems.length * 155 + 170 + 50;
    const offsetValue = viewHeight < height ? 220 : 120;
    if (offsetY >= offsetValue) {
      if (scrollEnabled) {
        setScrollEnabled(false);
      }
    } else {
      setScrollEnabled(true);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        nestedScrollEnabled={true}
        scrollEnabled={scrollEnabled}
        onScroll={event => {
          const offsetY = event.nativeEvent.contentOffset.y;
          console.log('offsetY: ', offsetY);
          onScroll(offsetY);
        }}>
        {/* ILUSTRATION HEADER*/}
        <ImageHeader uri={false} img={headerImg} />

        {/* ITEMS LIST */}
        <View style={styles.itemsList}>
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={!scrollEnabled}
            onTouchStart={() => setNewItemAdded(false)}
            onScroll={() => setNewItemAdded(false)}
            data={cartItems}
            ListHeaderComponent={
              <View style={styles.listHeader}>
                <View style={styles.itemsCount}>
                  <Text style={styles.itemsCountText}>{`${
                    cartItems.length
                  } Productos`}</Text>
                </View>
              </View>
            }
            renderItem={({item}) => (
              <View style={styles.item}>
                <StoreItem
                  item={item}
                  removeFromCart={removeFromCart}
                  seeDetails={seeDetails}
                  cartView
                />
              </View>
            )}
            ListFooterComponent={
              <Footer
                cartTotal={cartTotal}
                continueBuying={continueBuying}
                cartItems={cartItems.length}
              />
            }
            keyExtractor={(item, index) => index.toString()}
            stickyHeaderIndices={[0]}
            style={styles.list}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Footer = ({cartTotal, continueBuying, cartItems}) => {
  return (
    <View style={styles.footer}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>{'Total'}</Text>
        <View style={styles.totalValueContainer}>
          <Text style={styles.totalText}>{`$${cartTotal}`}</Text>
        </View>
      </View>
      {cartItems !== 0 && (
        <TouchableOpacity
          style={styles.continue}
          onPress={() => continueBuying()}>
          <Text style={styles.continueText}>{'Continuar'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Cart;

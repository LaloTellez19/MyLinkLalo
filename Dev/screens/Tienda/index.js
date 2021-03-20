import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from '../../components/Text';
import Header from '../../components/Header';
import MainMenu from '../../components/MainMenu';
import Loading from '../../components/Loading';
import ErrorOrNoData from '../../components/ErrorOrNoData';

import StoreItem from '../../components/StoreItem';

import {ItemSelector, ProductDetails, PurchaseDetails} from './StoreComponents';

import Categories from './Categories';
import Cart from './Cart';
import StoreWallet from './StoreWallet';
import Purchases from './Purchases';
import Help from './Help';

/* DATA */
import {
  promotionsResponse,
  suggestionsResponse,
  userPurchasesResponse,
} from './data';

const width = Layout.window.width;
const promotionsWidth = width / 1.2;
const suggestionsWidth = width;

/* STYLE */
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  /* HOME VIEW STYLES */
  homeView: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  promotions: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  promotionsScroll: {
    width: promotionsWidth,
  },
  promotionItem: {
    width: promotionsWidth,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  promotionImgContainer: {
    width: promotionsWidth,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
  },
  promotionImg: {
    width: promotionsWidth,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  promotionText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    backgroundColor: 'white',
  },
  promotionPrice: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  /* SUGGESTIONS STYLES */
  suggestionsMessageContainer: {
    marginTop: 20,
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: Colors.gray,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionsMessage: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  suggestionsContainer: {
    paddingTop: 30,
    paddingBottom: 0,
    alignItems: 'center',
  },
  suggestions: {
    width: suggestionsWidth,
    height: 160,
    marginBottom: 20,
  },
  suggestionsItem: {
    width: suggestionsWidth,
    height: 160,
    alignSelf: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 0.5,
    borderColor: 'transparent',
  },
  suggestionSelector: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  /* CART ITEMS INDICATOR STYLES */
  cartItemsIndicatorContainer: {
    width: 34,
    height: 27,
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderRadius: 100,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 30,
    left: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  cartItemsIndicator: {
    width: 32,
    height: 25,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 100,
    backgroundColor: Colors.business,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemsIndicatorText: {
    fontSize: 14,
    color: 'white',
  },
  /* ITEM ADDED NOTIFICATION STYLES */
  itemAddedNotification: {
    width: width,
    height: 70,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.gray,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5,
  },
  itemAddedNotificationText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
});

function Store(props) {
  const {personal} = props;
  const activeColor = personal ? Colors.personal : Colors.business;
  const menu = [
    {
      name: 'home',
      text: 'Sugerencias',
    },
    {
      name: 'unknown',
      text: 'Categorías',
    },
    {
      name: 'unknown',
      text: 'Billetera',
    },
    {
      name: 'shopping_cart',
      text: 'Mi carrito',
    },
    {
      name: 'unknown',
      text: 'Compras',
    },
    {
      name: 'help',
      text: 'Ayuda',
    },
  ];

  const [optionSelected, setOptionSelected] = React.useState(0);
  const [allPromotions, setAllPromotions] = React.useState([]);
  const [allSuggestions, setAllSuggestions] = React.useState([]);
  const [viewedPromotion, setViewedPromotion] = React.useState({});
  const [viewedSuggestion, setViewedSuggestion] = React.useState({});

  const [cartItems, setCartItems] = React.useState([]);
  const [newItemAdded, setNewItemAdded] = React.useState(false);
  const [viewedProduct, setViewedProduct] = React.useState({});
  const [seeProductDetails, setSeeProductDetails] = React.useState(false);
  const [seePurchaseDetails, setSeePurchaseDetails] = React.useState(false);
  const [purchases, setPurchases] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [errorPurchases, setErrorPurchases] = React.useState(null);

  const promotionsScroll = React.useRef(null);
  const suggestionsScroll = React.useRef(null);

  const getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    try {
      const promotions = promotionsResponse.data.items;
      const suggestions = suggestionsResponse.data.items;
      const allPurchases = userPurchasesResponse.data.items;

      setAllPromotions(promotions);
      setViewedPromotion({...promotions[0], index: 0});

      setAllSuggestions(suggestions);
      setViewedSuggestion({...suggestions[0], index: 0});

      setPurchases(allPurchases);
      setLoading(false);
    } catch (err) {
      setError(errorGettingData);
      setLoading(false);
    }
  };

  /* COMPONENTDIDMOUNT */
  React.useEffect(() => {
    getData();
  }, []);

  /* GO BACK */
  const goBack = () => {
    Navigation.pop(props.componentId, {
      component: {
        name: 'my-link.Store',
      },
    });
  };

  /* SELECT OPTION IN THE MENU */
  const selectOption = option => {
    setOptionSelected(option);
    setNewItemAdded(false);
    setSeeProductDetails(false);
    setSeePurchaseDetails(false);
  };

  /* GET SEARCH VALUE */
  const getSearchValue = value => {
    console.log(value);
  };

  /* GET DATE */
  const getDate = moths => {
    const date = new Date();
    const purchaseDate = {
      day: date.getDay(),
      month: date.getMonth() + 1 + moths,
      year: date.getFullYear(),
    };

    return purchaseDate;
  };

  /* ADD ITEM TO CART */
  const addToCart = (item, quantity = 1) => {
    console.log(`Add item ${item.id} to cart!`);
    const items = cartItems;
    const itemAlreadyInCart = items.find(prod => item.id === prod.id);

    if (itemAlreadyInCart !== undefined) {
      itemAlreadyInCart.quantity += quantity;
    } else {
      items.push({
        ...item,
        quantity: quantity,
        purchaseDate: getDate(0),
        expiration: getDate(item.monthsOfDuration),
        paymentMethod: {type: 'credit card', card: 'Master Card', number: 4575},
      });
    }
    setCartItems([...items]);
    setNewItemAdded(true);
    setSeeProductDetails(false);
  };

  /* REMOVE ITEM FROM CART */
  const removeFromCart = prod => {
    console.log(`Remove item ${prod.id} from cart!`);
    const cartUpdated = cartItems.filter(item => item.id !== prod.id);
    setCartItems([...cartUpdated]);
  };

  /* HANDLE PRODUCT DETAILS VIEW */
  const handleProductDetailsView = item => {
    setSeeProductDetails(true);
    setViewedProduct(item);
  };

  /* HANDLE PURCHASE DETAILS VIEW */
  const handlePurchaseDetailsView = item => {
    setSeePurchaseDetails(true);
    setViewedProduct(item);
  };

  /* CONTINUE BUYING */
  const continueBuying = () => {
    setPurchases([...purchases, ...cartItems]);
    setCartItems([]);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* HEADER - SEARCHBAR */}
      <Header goBack={() => goBack()} getSearchValue={getSearchValue} />

      {/* MAIN-MENU */}
      <View style={styles.menu}>
        <MainMenu
          menuItems={menu}
          size={45}
          totalItems={4.5}
          seleccion={optionSelected}
          onPress={selectOption}
          activeBackground={Colors.personal}
          inIndex={3}
          element={
            cartItems.length === 0 ? (
              <View />
            ) : (
              <CartIndicator cartItems={cartItems} />
            )
          }
        />
      </View>

      {loading && <Loading />}

      {error && <ErrorOrNoData title={error.title} message={error.message} />}

      {optionSelected === 0 && !loading && !error && (
        <ScrollView
          style={styles.homeView}
          onTouchStart={() => {
            setNewItemAdded(false);
          }}>
          {/* SHOW PROMOTIONS */}
          <View style={styles.promotions}>
            <ScrollView
              ref={promotionsScroll}
              style={styles.promotionsScroll}
              pagingEnabled={true}
              horizontal
              showsHorizontalScrollIndicator={false}
              onScroll={event => {
                if (event.nativeEvent.contentOffset.x % promotionsWidth === 0) {
                  const promIndex =
                    event.nativeEvent.contentOffset.x / promotionsWidth;
                  setViewedPromotion({
                    ...allPromotions[promIndex],
                    index: promIndex,
                  });
                }
              }}>
              {allPromotions.map((item, index) => {
                return (
                  <View key={index} style={styles.promotionItem}>
                    <TouchableOpacity
                      style={styles.promotionImgContainer}
                      activeOpacity={0.7}
                      onPress={() => handleProductDetailsView(item)}>
                      <Image
                        style={styles.promotionImg}
                        source={{uri: item.img}}
                      />
                    </TouchableOpacity>
                    <Text style={styles.promotionText}>{item.description}</Text>
                  </View>
                );
              })}
            </ScrollView>

            {/* PROMOTIONS SELECTORS */}
            <ItemSelector
              data={allPromotions}
              itemSelected={viewedPromotion}
              setItem={item => {
                setViewedPromotion(item);
                if (promotionsScroll) {
                  promotionsScroll.current.scrollTo({
                    x: promotionsWidth * item.index,
                    y: 0,
                    animated: false,
                  });
                }
              }}
              activeColor={activeColor}
            />
          </View>

          {/* SUGGESTIONS MESSAGE */}
          <View style={styles.suggestionsMessageContainer}>
            <Text style={styles.suggestionsMessage} Regular>
              {'Sugerencias para ti'}
            </Text>
          </View>

          {/* SUGGESTIONS */}
          <View style={styles.suggestionsContainer}>
            <ScrollView
              ref={suggestionsScroll}
              style={styles.suggestions}
              pagingEnabled={true}
              horizontal
              showsHorizontalScrollIndicator={false}
              onScroll={event => {
                if (
                  event.nativeEvent.contentOffset.x % suggestionsWidth ===
                  0
                ) {
                  const suggestionIndex =
                    event.nativeEvent.contentOffset.x / suggestionsWidth;
                  setViewedSuggestion({
                    ...allSuggestions[suggestionIndex],
                    index: suggestionIndex,
                  });
                }
              }}>
              {allSuggestions.map((item, index) => {
                return (
                  <View key={index} style={styles.suggestionsItem}>
                    <StoreItem
                      item={item}
                      addToCart={addToCart}
                      seeDetails={handleProductDetailsView}
                    />
                  </View>
                );
              })}
            </ScrollView>

            {/* SUGGESTIONS SELECTORS */}
            <View style={styles.suggestionSelector}>
              <ItemSelector
                data={allSuggestions}
                itemSelected={viewedSuggestion}
                setItem={item => {
                  setViewedSuggestion(item);
                  if (suggestionsScroll) {
                    suggestionsScroll.current.scrollTo({
                      x: suggestionsWidth * item.index,
                      y: 0,
                      animated: false,
                    });
                  }
                }}
                activeColor={activeColor}
              />
            </View>
          </View>
        </ScrollView>
      )}

      {/* CONTENT */}
      <View style={{flex: 1}}>
        {/* CATEGORIES */}
        {optionSelected === 1 && (
          <Categories
            addToCart={addToCart}
            setNewItemAdded={setNewItemAdded}
            seeDetails={handleProductDetailsView}
          />
        )}

        {/* STORE WALLET */}
        {optionSelected === 2 && (
          <StoreWallet componentId={props.componentId} />
        )}

        {/* MY CART */}
        {optionSelected === 3 && (
          <Cart
            cartItems={cartItems}
            continueBuying={continueBuying}
            removeFromCart={removeFromCart}
            setNewItemAdded={setNewItemAdded}
            seeDetails={handleProductDetailsView}
          />
        )}

        {/* PURCHASES */}
        {optionSelected === 4 && (
          <Purchases
            purchases={purchases}
            addToCart={addToCart}
            setNewItemAdded={setNewItemAdded}
            seeDetails={handlePurchaseDetailsView}
            errorPurchases={errorPurchases}
          />
        )}

        {/* STORE WALLET */}
        {optionSelected === 5 && <Help />}
      </View>

      {/* ITEM ADDED NOTIFICATION */}
      {newItemAdded && (
        <View style={styles.itemAddedNotification}>
          <Text style={styles.itemAddedNotificationText}>
            {'Producto agregado a tu carrito'}
          </Text>
        </View>
      )}

      {/* SEE PRODUCT DETAILS */}
      {seeProductDetails && (
        <ProductDetails
          item={viewedProduct}
          setSeeProductDetails={setSeeProductDetails}
          addToCart={addToCart}
        />
      )}

      {/* SEE PURCHASE DETAILS */}
      {seePurchaseDetails && (
        <PurchaseDetails
          item={viewedProduct}
          setSeeProductDetails={setSeePurchaseDetails}
          addToCart={addToCart}
        />
      )}
    </SafeAreaView>
  );
}

const CartIndicator = ({cartItems}) => {
  return (
    <View style={[styles.cartItemsIndicatorContainer]}>
      <View style={styles.cartItemsIndicator}>
        <Text style={styles.cartItemsIndicatorText}>
          {cartItems.length < 10 ? cartItems.length : `+${9}`}
        </Text>
      </View>
    </View>
  );
};

export default Store;

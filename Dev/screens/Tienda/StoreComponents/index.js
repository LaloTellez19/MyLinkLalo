import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/Text';
import Icon from '../../../components/Icon';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  /* SELECTOR STYLES */
  promotionsSelectors: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 45,
    backgroundColor: 'transparent',
    alignItems: 'center',
    elevation: 6,
  },
  promotionSelector: {
    width: 15,
    height: 15,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    elevation: 2,
    borderColor: 'white',
    borderRadius: 100,
    backgroundColor: Colors.pet,
  },
  /* PROMOTION DETAILS STYLES */
  promotionDetails: {
    width: 300,
    height: 380,
    backgroundColor: 'white',
    position: 'absolute',
    alignItems: 'center',
    top: 15,
    right: 30,
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderRadius: 10,
    elevation: 5,
  },
  promotionDetailsHeader: {
    marginBottom: 50,
  },
  closePromotionDetails: {
    position: 'absolute',
    top: 5,
    left: 110,
  },
  promotionImg: {
    width: 230,
    height: 160,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  promotionDescriptionPrice: {
    marginTop: 10,
    marginBottom: 10,
  },
  promotionPriceAddToCart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  promotionDetailsSelector: {
    marginTop: 80,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promotionText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  promotionPrice: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  /* PRODUCT DETAILS STYLES */
  productDetailsContainer: {
    alignItems: 'center',
  },
  productDetails: {
    width: width,
    height: height - 63 - 83,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    borderColor: Colors.gray,
    borderWidth: 0.5,
    elevation: 5,
  },
  productDetailsHeader: {
    marginBottom: 39,
  },
  closeProductDetails: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  productImg: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productDetailsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  productDetailsText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 20,
  },
  productBenefits: {
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
  },
  productBenefitsTitle: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  productBenefitsInfo: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
  },
  productBenefitsSummary: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  productBenefitsList: {
    marginTop: 10,
  },
  productBenefitsItem: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginBottom: 10,
    marginLeft: 5,
  },
  productOptions: {
    width: 325,
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
    alignItems: 'center',
  },
  productOptionsButtons: {
    width: 180,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  buyProducts: {
    backgroundColor: Colors.gray,
  },
  buyProductsText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  addToCart: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.business,
  },
  addToCartText: {
    fontSize: 14,
    color: 'white',
  },
  /* PAYMENT TYPE STYLES */
  paymentType: {
    width: 325,
    marginTop: 10,
  },
  paymentTypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  paymentTypeHeaderText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 20,
  },
  setTotalItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    marginTop: 10,
  },
  setTotalItemsContainer: {
    alignItems: 'center',
  },
  itemsQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    width: 90,
    height: 60,
  },
  itemsTotal: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    width: 100,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setTotalItemsNumber: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  setTotalItemsLabel: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginTop: 5,
  },
  /* IMAGE HEADER STYLES */
  imageHeaderContainer: {
    height: 120,
    width: width,
  },
  imageHeader: {
    height: 120,
    width: width,
    resizeMode: 'cover',
  },
  /* PURCHASE DETAILS STYLES */
  purchaseDetails: {
    marginBottom: 20,
  },
  purchaseDetailsHeader: {
    marginBottom: 10,
  },
  purchaseDetailsTitle: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    marginTop: 10,
    textAlign: 'center',
  },
  purchaseDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 325,
    height: 50,
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: Colors.grayLight,
  },
  purchaseDetailsText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 20,
    width: 190,
    paddingRight: 5,
    paddingLeft: 5,
    textAlign: 'center',
  },
  purchaseDetailContainer: {
    marginBottom: 10,
    paddingTop: 15,
    paddingLeft: 30,
  },
  purchaseDetailText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginBottom: 10,
  },
});

const ImageHeader = ({uri, img}) => {
  return (
    <View style={styles.imageHeaderContainer}>
      <Image style={styles.imageHeader} source={img ? img : {uri: uri}} />
    </View>
  );
};

const ItemSelector = ({data, itemSelected, setItem, activeColor}) => {
  return (
    <View style={styles.promotionsSelectors}>
      {data.map((item, index) => (
        <TouchableOpacity
          style={[
            styles.promotionSelector,
            index !== itemSelected.index
              ? {backgroundColor: Colors.gray}
              : {backgroundColor: activeColor},
          ]}
          key={index}
          onPress={() =>
            setItem({
              ...data[index],
              index: index,
            })
          }
        />
      ))}
    </View>
  );
};

const PromotionDetails = ({
  item,
  setSeePromotion,
  data,
  setItem,
  activeColor,
  addToCart,
}) => {
  return (
    <View style={styles.promotionDetails}>
      <View style={styles.promotionDetailsHeader}>
        <View style={styles.closePromotionDetails}>
          <Icon
            name="times"
            size={30}
            factor={0.8}
            forceColor
            color={Colors.gray}
            onPress={() => setSeePromotion(false)}
          />
        </View>
      </View>
      <Image style={styles.promotionImg} source={{uri: item.img}} />

      <View style={styles.promotionDescriptionPrice}>
        <Text style={styles.promotionText} Regular>
          {item.description}
        </Text>
        <View style={styles.promotionPriceAddToCart}>
          <Text style={styles.promotionPrice} Regular>
            {`$${item.price}`}
          </Text>
          <Icon
            name="payments"
            size={40}
            factor={0.8}
            forceColor
            color={Colors.gray}
            onPress={() => addToCart(item)}
          />
        </View>
      </View>

      {/* PROMOTIONS SELECTORS */}
      <View style={styles.promotionDetailsSelector}>
        <ItemSelector
          data={data}
          itemSelected={item}
          setItem={setItem}
          activeColor={activeColor}
        />
      </View>
    </View>
  );
};

function ProductDetails({item, setSeeProductDetails, addToCart}) {
  const [quantity, setQuantity] = React.useState(item.quantity || 1);
  const [total, setTotal] = React.useState(
    item.price * item.quantity || item.price,
  );

  return (
    <View style={styles.productDetails}>
      {/* PRODUCT DETAILS HEADER */}
      <View style={styles.productDetailsHeader}>
        <View style={styles.closeProductDetails}>
          <Icon
            name="times"
            size={30}
            factor={0.8}
            forceColor
            color={Colors.gray}
            background={Colors.grayLight}
            onPress={() => setSeeProductDetails(false)}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.productDetailsContainer}>
        {/* PRODUCT DETAILS IMAGE */}
        <Image style={styles.productImg} source={{uri: item.img}} />

        {/* PRODUCT DETAILS ICON / TITLE */}
        <View style={styles.productDetailsInfo}>
          <Icon name={item.icon} />
          <Text style={styles.productDetailsText}>{item.description}</Text>
        </View>

        {/* PRODUCT DETAILS BENEFITS */}
        <View style={styles.productBenefits}>
          <Text style={styles.productBenefitsTitle}>{'Beneficios'}</Text>
          <View style={styles.productBenefitsInfo}>
            <Text style={styles.productBenefitsSummary}>
              {item.benefitsSummary}
            </Text>
            <View style={styles.productBenefitsList}>
              {item.benefits.map((benefit, index) => {
                return (
                  <Text key={index} style={styles.productBenefitsItem}>
                    {`\u2022 ${benefit}`}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>

        {/* PAYMENT TYPE */}
        {/* {item.paymentType === 'monthly' && (
          <MonthlyPayment
            item={item}
            total={total}
            setTotal={setTotal}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        )}
        {item.paymentType === 'single' && <SinglePayment item={item} />} */}

        {/* OPTIONS */}
        <View style={styles.productOptions}>
          {/* BUY ITEMS */}
          <TouchableOpacity
            style={[styles.productOptionsButtons, styles.buyProducts]}>
            <Text
              style={styles.buyProductsText}>{`Comprar por $${total}`}</Text>
          </TouchableOpacity>
          {/* ADD TO CART */}
          <TouchableOpacity
            style={[styles.productOptionsButtons, styles.addToCart]}
            onPress={() => addToCart(item, quantity)}>
            <Icon
              name="payments"
              Borderless
              factor={0.8}
              forceColor
              color={'white'}
            />
            <Text style={styles.addToCartText}>{'Agregar al carrito'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function MonthlyPayment({item, total, setTotal, quantity, setQuantity}) {
  /* GET TOTAL */
  const getTotal = value => {
    const prevQuantity = quantity;
    const quantityUpdated = prevQuantity + value > 0 ? prevQuantity + value : 0;

    setQuantity(quantityUpdated);
    setTotal(quantityUpdated * item.price);
  };

  return (
    <View style={styles.paymentType}>
      <View style={styles.paymentTypeHeader}>
        <Icon name="calendar" factor={0.8} forceColor color={Colors.gray} />
        <Text style={styles.paymentTypeHeaderText}>{'Pago mensual'}</Text>
      </View>

      {/* SET TOTAL ITEMS TO BUY */}
      <View style={styles.setTotalItems}>
        {/* SELECT ITEMS QUANTITY */}
        <View style={styles.setTotalItemsContainer}>
          <View style={styles.itemsQuantity}>
            <Text style={styles.setTotalItemsNumber}>{quantity}</Text>
            <View>
              <Icon
                name="arrow_up"
                Borderless
                size={35}
                factor={0.8}
                forceColor
                color={Colors.gray}
                onPress={() => getTotal(1)}
              />
              <Icon
                name="arrow_down"
                Borderless
                size={35}
                factor={0.8}
                forceColor
                color={Colors.gray}
                onPress={() => getTotal(-1)}
              />
            </View>
          </View>
          <Text style={styles.setTotalItemsLabel}>{'Número de meses'}</Text>
        </View>

        {/* SET ITEMS TOTAL */}
        <View style={styles.setTotalItemsContainer}>
          <View style={styles.itemsTotal}>
            <Text style={styles.setTotalItemsNumber}>{`$${total}`}</Text>
          </View>
          <Text style={styles.setTotalItemsLabel}>{'Cantidad a pagar'}</Text>
        </View>
      </View>
    </View>
  );
}

function SinglePayment({item}) {
  return (
    <View style={styles.paymentType}>
      <View style={styles.paymentTypeHeader}>
        <Icon name="dollar" factor={0.8} forceColor color={Colors.gray} />
        <Text style={styles.paymentTypeHeaderText}>{'Pago único'}</Text>
      </View>
    </View>
  );
}

function PurchaseDetails({item, setSeeProductDetails, addToCart}) {
  return (
    <View style={styles.productDetails}>
      {/* PURCHASE DETAILS HEADER */}
      <View style={styles.purchaseDetailsHeader}>
        <Text style={styles.purchaseDetailsTitle}>
          {'Detalles de la compra'}
        </Text>
        <View style={styles.closeProductDetails}>
          <Icon
            name="times"
            size={30}
            factor={0.8}
            forceColor
            color={Colors.gray}
            background={Colors.grayLight}
            onPress={() => setSeeProductDetails(false)}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.productDetailsContainer}>
        {/* PRODUCT DETAILS IMAGE */}
        <Image style={styles.productImg} source={{uri: item.img}} />

        {/* PURCHASE DETAILS  */}
        <View style={styles.purchaseDetails}>
          {/* PRODUCT DETAILS ICON / TITLE */}
          <PurchaseDetail
            fullWidth
            icon={item.icon}
            title={item.description}
            VisibleComponent={
              <View style={styles.purchaseDetailContainer}>
                <Text style={styles.purchaseDetailText}>{`Comprado el: ${
                  item.purchaseDate.day
                }-${item.purchaseDate.month}-${item.purchaseDate.year}`}</Text>
                <Text style={styles.purchaseDetailText}>{`Vence el: ${
                  item.expiration.day
                }-${item.expiration.month}-${item.expiration.year}`}</Text>
              </View>
            }
          />
          {/* PURCHASE SUMMARY */}
          <PurchaseDetail
            fullWidth
            icon={'card'}
            title={'Resumen de tu compra'}
            VisibleComponent={
              <View style={styles.purchaseDetailContainer}>
                <Text style={styles.purchaseDetailText}>{`Total pagado: $${
                  item.price
                }`}</Text>
              </View>
            }
          />
          {/* PAYMENT DETAILS */}
          <PurchaseDetail
            fullWidth
            icon={'payments'}
            title={'Método de pago'}
            VisibleComponent={
              <View style={styles.purchaseDetailContainer}>
                <Text style={styles.purchaseDetailText}>
                  {`Forma de pago: ${item.paymentMethod.type}`}
                </Text>
                {item.paymentMethod.type === 'credit card' && (
                  <View>
                    <Text style={styles.purchaseDetailText}>
                      {item.paymentMethod.card}
                    </Text>
                    <Text style={styles.purchaseDetailText}>{`Terminada en: ${
                      item.paymentMethod.number
                    }`}</Text>
                  </View>
                )}
              </View>
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const PurchaseDetail = ({
  icon,
  title,
  VisibleComponent,
  background,
  fullWidth,
}) => {
  const [detailDisplayed, setDetailDisplayed] = React.useState(false);
  const detailWidth = {
    backgroundColor: background || Colors.grayLight,
    width: fullWidth ? width : 325,
  };

  const detailText = {
    width: 210,
    marginRight: 10,
  };

  return (
    <View>
      <View style={[styles.purchaseDetail, detailWidth]}>
        <Icon name={icon} forceColor color={Colors.grayBolder} />
        <Text
          style={[styles.purchaseDetailsText, fullWidth ? detailText : null]}>
          {title}
        </Text>
        <Icon
          name={detailDisplayed ? 'arrow_up' : 'arrow_down'}
          factor={0.8}
          Borderless
          forceColor
          color={Colors.gray}
          onPress={() => setDetailDisplayed(!detailDisplayed)}
        />
      </View>
      {detailDisplayed && <View>{VisibleComponent}</View>}
    </View>
  );
};

export {
  ItemSelector,
  PromotionDetails,
  ProductDetails,
  ImageHeader,
  PurchaseDetails,
  PurchaseDetail,
};

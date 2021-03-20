import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  /* BLOCK NAME STYLES */
  blockName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  blockNameText: {
    width: width / 1.3,
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 10,
    marginRight: 10,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.personal,
  },
  /* PRODUCTS STYLES */
  products: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  product: {
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  productImagemageContainer: {
    elevation: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  productImage: {
    width: width / 4,
    height: width / 4,
  },
  productName: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 5,
  },
});

class ProductsBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  /* HANDLE SEE ALL */
  handleSeeAll = () => {
    Navigation.showOverlay({
      component: {
        name: 'my-link.Products',
        passProps: {
          linkname: '',
          showOverlay: true,
          data: this.props.data,
        },
      },
    });
  };

  /* HNADLE SEE PRODUCT */
  handleSeeProducts = item => {
    console.log(`SEE PRODUCT ${item.index}`);
  };

  render() {
    const {data} = this.props;
    const allProducts = data.products;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

    const backgroundColor = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    const textColor_2 = vipDark
      ? {color: Colors.golden}
      : vip
      ? {color: 'black'}
      : {color: Colors.personal};

    const textColor_3 = vipDark
      ? {color: Colors.platinum}
      : {color: Colors.defaultTextColor};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* BLOCK NAME */}
        <View style={styles.blockName}>
          <Text style={[styles.blockNameText, textColor]}>{'Productos'}</Text>
          <TouchableOpacity onPress={() => this.handleSeeAll()}>
            <Text style={[styles.seeAll, textColor_2]}>{'Ver todo'}</Text>
          </TouchableOpacity>
        </View>

        {/* PRODUCTS */}
        <View style={styles.products}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={allProducts.slice(0, 3)}
            renderItem={({item, index}) => (
              <Product
                item={{...item, index}}
                handleSeeProducts={this.handleSeeAll}
                textColor={textColor_3}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const Product = ({item, handleSeeProducts, textColor}) => {
  return (
    <TouchableOpacity
      style={styles.product}
      onPress={() => handleSeeProducts()}
      activeOpacity={0.7}>
      <View style={styles.productImagemageContainer}>
        <Image style={styles.productImage} source={{uri: item.img}} />
      </View>
      <Text style={[styles.productName, textColor]}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default ProductsBlock;

import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import firebase from '../../../../components/firebase';
import Text from '../../../../components/Text';
import Loading from '../../../../components/Loading';
import Icon from '../../../../components/Icon';
import Header from '../../../../components/Header';
import MenuContextual from '../../../../components/MenuContextual';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

import ProductDetailsView from '../../../AdmonBusiness/Informacion/Producto/ProductDetails';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
	
  goBack = () => {
    Navigation.dismissOverlay(this.props.componentId);
  };

  render() {
    const {product, showOverlay, data} = this.props;
    const vipDark = data.vip === 2;

    return (
      <View>
        <Header
          goBack={() => this.goBack()}
          color={vipDark ? 'dark' : 'white'}
        />
        <ProductDetailsView
          product={product}
          showOverlay={showOverlay}
          data={data}
        />
      </View>
    );
  }
};

export default ProductDetails;

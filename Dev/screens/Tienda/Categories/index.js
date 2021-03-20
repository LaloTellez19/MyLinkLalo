import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import Text from '../../../components/Text';
import MenuTabs from '../../../components/MenuTabs';
import StoreItem from '../../../components/StoreItem';
import Loading from '../../../components/Loading';
import ErrorOrNoData from '../../../components/ErrorOrNoData';

import {ImageHeader} from '../StoreComponents';

/* DATA */
import {productsResponse} from '../data';

const width = Layout.window.width;
const height = Layout.window.height - 63 - 83;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: '100%',
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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
});

/* IMGS */
const businessH = require('../../../assets/images/store/business.png');
const personalH = require('../../../assets/images/store/personal.png');
const vipH = require('../../../assets/images/store/vip.png');

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: 0,
      allProducts: [],
      items: [],
      loading: true,
      error: null,
      scrollEnabled: true,
    };

    this.selectOption = this.selectOption.bind(this);
    this.headerImg = [personalH, businessH, vipH];
    this.menu = ['Impresión', 'Personal', 'Business', 'VIP'];
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    try {
      const products = productsResponse.data;
      this.setState({
        allProducts: products,
        items: products.personal,
        loading: false,
      });
    } catch (err) {
      this.setState({
        error: errorGettingData,
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.getData();
  }

  /* SELECT OPTION IN THE MENU */
  selectOption = option => {
    this.setState({optionSelected: option});
    this.props.setNewItemAdded(false);
    const allProducts = this.state.allProducts;
    let newItems = [];
    switch (option) {
      // case 0:
      //   console.log('case 0', option);
      //   setItems(allProducts.printing);
      //   break;
      case 0:
        console.log('case 1', option);
        newItems = allProducts.personal;
        break;
      case 1:
        console.log('case 2', option);
        newItems = allProducts.business;
        break;
      case 2:
        console.log('case 3', option);
        newItems = allProducts.vip;
        break;
    }
    this.setState({items: newItems});
  };

  onScroll = offsetY => {
    if (offsetY >= 120) {
      if (this.state.scrollEnabled) {
        this.setState({
          scrollEnabled: false,
        });
      }
    } else {
      this.setState({
        scrollEnabled: true,
      });
    }
  };

  render() {
    const {
      optionSelected,
      allProducts,
      items,
      loading,
      error,
      scrollEnabled,
    } = this.state;
    const {addToCart, setNewItemAdded, seeDetails} = this.props;

    return (
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView
          nestedScrollEnabled={true}
          scrollEnabled={scrollEnabled}
          onScroll={event => {
            const offsetY = event.nativeEvent.contentOffset.y;
            console.log('offsetY: ', offsetY);
            this.onScroll(offsetY);
          }}>
          {/* HEADER */}
          <ImageHeader uri={false} img={this.headerImg[optionSelected]} />

          {loading && <Loading />}

          {error && (
            <ErrorOrNoData title={error.title} message={error.message} />
          )}

          {/* CONTENT */}
          {!loading && !error && (
            <View style={styles.itemsList}>
              <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={!scrollEnabled}
                onTouchStart={() => setNewItemAdded(false)}
                onScroll={() => setNewItemAdded(false)}
                data={items}
                ListHeaderComponent={
                  <View style={styles.listHeader}>
                    <MenuTabs
                      opciones={this.menu.slice(1, 4)}
                      seleccion={optionSelected}
                      seleccionar={this.selectOption}
                      personal
                      fontSize={14}
                    />
                  </View>
                }
                renderItem={({item}) => (
                  <View style={styles.item}>
                    <StoreItem
                      item={item}
                      addToCart={addToCart}
                      seeDetails={seeDetails}
                    />
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                stickyHeaderIndices={[0]}
                style={styles.list}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Categories;

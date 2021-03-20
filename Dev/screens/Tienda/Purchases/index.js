import React from 'react';
import {View, StyleSheet, FlatList, SafeAreaView, ScrollView} from 'react-native';

import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import ErrorOrNoData from '../../../components/ErrorOrNoData';

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
  /* PURCHASEs STYLES */
  purchases: {
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
  purchase: {
    paddingTop: 15,
    paddingBottom: 10,
    marginBottom: 5,
  },
  purchaseImage: {
    width: 85,
    height: 85,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
  },
  purchaseInfo: {},
  purchaseCategory: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  purchaseDescription: {
    fontSize: 18,
    color: Colors.defaultTextColor,
  },
  purchasePrice: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 2,
    marginBottom: 2,
  },
  purchaseExpiration: {
    fontSize: 12,
    color: Colors.business,
  },
});

/* IMG */
const headerImg = require('../../../assets/images/store/cart.png');

class Purchases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
    };
  }

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
    const {scrollEnabled} = this.state;
    const {
      addToCart,
      seeDetails,
      purchases,
      setNewItemAdded,
      errorPurchases,
    } = this.props;

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
          {/* ILUSTRATION HEADER*/}
          <ImageHeader uri={false} img={headerImg} />

          {errorPurchases && (
            <ErrorOrNoData
              title={errorPurchases.title}
              message={errorPurchases.message}
            />
          )}

          {!errorPurchases && (
            <View style={styles.purchases}>
              <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={!scrollEnabled}
                onTouchStart={() => setNewItemAdded(false)}
                onScroll={() => setNewItemAdded(false)}
                data={purchases}
                renderItem={({item}) => (
                  <View style={styles.purchase}>
                    <StoreItem
                      item={item}
                      addToCart={addToCart}
                      seeDetails={seeDetails}
                    />
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };
}

export default Purchases;

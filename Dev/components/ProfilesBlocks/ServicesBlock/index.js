import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';
import Icon from '../../Icon';

const width = Layout.window.width;

import ServicesCategories from '../../../screens/AdmonBusiness/ServicesCategories';

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
  /* SERVICES LIST */
  servicesList: {
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
  },
  service: {
    width: width / 3,
    alignItems: 'center',
  },
  serviceText: {
    width: '75%',
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
});

class ServicesBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.allServices = ServicesCategories.ES_MX;
  }

  handleSeeAll = () => {
    console.log('Button pressed!!!');
    Navigation.showOverlay({
      component: {
        name: 'my-link.Services',
        passProps: {
          showOverlay: true,
          data: this.props.data,
        },
      },
    });
  };

  render() {
    // const {activePromotion, offValue} = this.state;
    const {data} = this.props;
    const services = data.services;
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
      ? {color: Colors.grayLight}
      : {color: Colors.defaultTextColor};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* BLOCK NAME */}
        <View style={styles.blockName}>
          <Text style={[styles.blockNameText, textColor]}>{'Servicios'}</Text>
          <TouchableOpacity onPress={() => this.handleSeeAll()}>
            <Text style={[styles.seeAll, textColor_2]}>{'Ver todo'}</Text>
          </TouchableOpacity>
        </View>

        {/* SERVICES LIST */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={services.slice(0, 3)}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.service}
              onPress={() => this.handleSeeAll()}>
              <Icon
                name={this.allServices[item].icon}
                size={45}
                factor={1}
                Borderless
                forceColor
                color={vipDark ? 'white' : Colors.gray}
              />
              <Text style={[styles.serviceText, textColor_3]}>
                {this.allServices[item].service}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.servicesList}
        />
      </View>
    );
  }
}

export default ServicesBlock;

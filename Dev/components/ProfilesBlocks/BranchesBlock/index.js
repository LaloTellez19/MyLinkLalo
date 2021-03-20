import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';
import Icon from '../../Icon';
import UserImage from '../../UserImage';
import ProfilePicture from '../../ProfilePicture';

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
  /* BRANCHES LIST STYLES */
  branchesList: {
    marginTop: 5,
    marginBottom: 5,
  },
  branch: {
    width: width / 3,
    paddingTop: 10,
    paddingBottom: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  isMatriz: {
    width: width / 6,
    height: 20,
    backgroundColor: Colors.gray,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -10,
    elevation: 5,
  },
  isMatrizText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  promotions: {
    width: width / 3,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  promotionsText: {
    width: '50%',
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginRight: -15,
    marginLeft: -5,
  },
  branchName: {
    width: '85%',
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 15,
  },
  location: {
    width: '85%',
    marginTop: 5,
  },
  locationText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
});

class BranchesBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSeeAll = branchCity => {
    Navigation.showOverlay({
      component: {
        name: 'my-link.Branches',
        passProps: {
          data: this.props.data,
          branchCity: branchCity,
        },
      },
    });
  };

  render() {
    const {data} = this.props;
    const branches = data.branches;
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
      ? {color: 'white'}
      : {color: Colors.defaultTextColor};

    const textColor_4 = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* BLOCK NAME */}
        <View style={styles.blockName}>
          <Text style={[styles.blockNameText, textColor]}>{'Sucursales'}</Text>
          <TouchableOpacity onPress={() => this.handleSeeAll()}>
            <Text style={[styles.seeAll, textColor_2]}>{'Ver todo'}</Text>
          </TouchableOpacity>
        </View>

        {/* BRANCHES LIST */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={branches.slice(0, 3)}
          renderItem={({item}) => (
            <Branch
              item={item}
              textColors={[textColor_3, textColor_4]}
              handleSeeAll={this.handleSeeAll}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.branchesList}
        />
      </View>
    );
  }
}

const Branch = ({item, textColors, handleSeeAll}) => {
  return (
    <TouchableOpacity
      style={styles.branch}
      onPress={() => {
        handleSeeAll(item.domicilio.ciudad);
      }}>
      <View>
        <ProfilePicture
          linkname={item.linkname}
          size={80}
          Business={item.tipo !== 0}
        />
        {item.isMatriz && (
          <View style={styles.isMatriz}>
            <Text style={styles.isMatrizText}>{'Matriz'}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.branchName, textColors[1]]}>{item.nombre}</Text>
      <View style={styles.location}>
        <Text style={[styles.locationText, textColors[1]]}>{`${
          item.domicilio.calle
        }, ${item.domicilio.colonia}`}</Text>
      </View>
      <View style={styles.promotions}>
        <Text style={[styles.promotionsText, textColors[0]]}>
          {item.promotions || 100}
        </Text>
        <Icon name="brand" Borderless forceColor color={textColors[0].color} />
      </View>
    </TouchableOpacity>
  );
};

export default BranchesBlock;

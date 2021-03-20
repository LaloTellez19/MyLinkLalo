import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';
import Icon from '../../Icon';
import UserImage from '../../UserImage';

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
  /* COMMON CARDS STYLES */
  commonCards: {
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    width: width / 3,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  cardName: {
    width: '90%',
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  cardLinkname: {
    width: '90%',
    fontSize: 12,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 5,
  },
});

class CommonCardsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSeeAll = () => {
    console.log('Button pressed!!!');
    Navigation.showOverlay({
      component: {
        name: 'my-link.CommonCards',
        passProps: {
          owner: {
            linkname: 'eduardodorantes1196MX',
            nombre: ['Eduardo'],
            apellido: ['Dorantes'],
          },
          user: {
            linkname: 'ricardovarela0000MX',
            nombre: ['Ricardo'],
            apellido: ['Varela'],
          },
          cards: [
            {
              id: '0',
              nombre: ['El Hostal', ''],
              linkname: 'a',
            },
            {
              id: '1',
              nombre: ['AroTech', ''],
              linkname: 'b',
            },
            {
              id: '2',
              nombre: ['Les Comptables', ''],
              linkname: 'c',
            },
            {
              id: '3',
              nombre: ['Fresh Farm', ''],
              linkname: 'd',
            },
            {
              id: '4',
              nombre: ['Human', ''],
              linkname: 'e',
            },
            {
              id: '5',
              nombre: ['Uva', ''],
              linkname: 'f',
            },
            {
              id: '6',
              nombre: ['Rosa', ''],
              linkname: 'g',
            },
            {
              id: '7',
              nombre: ['Luz', ''],
              linkname: 'h',
            },
            {
              id: '8',
              nombre: ['Agua', ''],
              linkname: 'i',
            },
            {
              id: '9',
              nombre: ['Well', ''],
              linkname: 'j',
            },
          ],
          vip: this.props.data.vip === 1,
          vipDark: this.props.data.vip === 2,
        },
      },
    });
  };

  render() {
    const {data} = this.props;
    const commonCards = data.commonCards;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

    /* DARK MODE STYLES */
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
          <Text style={[styles.blockNameText, textColor]}>
            {'Tarjetas en común'}
          </Text>
          <TouchableOpacity onPress={() => this.handleSeeAll()}>
            <Text style={[styles.seeAll, textColor_2]}>{'Ver todo'}</Text>
          </TouchableOpacity>
        </View>

        {/* COMMON CARDS */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={commonCards}
          renderItem={({item}) => (
            <Card item={item} textColors={[textColor_3, textColor_4]} />
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.commonCards}
        />
      </View>
    );
  }
}

const Card = ({item, textColors}) => {
  return (
    <View style={styles.card}>
      <UserImage link={item.link} userSize={80} borderRadius={10} />
      <Text style={[styles.cardName, textColors[0]]}>{item.nombre}</Text>
      <Text style={[styles.cardLinkname, textColors[1]]}>{item.link}</Text>
    </View>
  );
};

export default CommonCardsBlock;

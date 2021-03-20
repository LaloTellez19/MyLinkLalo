import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Header from '../../../../components/Header';
import ProfilePicture from '../../../../components/ProfilePicture';

const width = Layout.window.width;
const cardWidth = width / 2;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: '100%',
    backgroundColor: 'white',
  },
  topHeader: {
    elevation: 5,
    backgroundColor: 'white',
  },
  users: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  userContainer: {
    width: 130,
    alignItems: 'center',
    marginTop: 5,
  },
  userName: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 5,
  },
  commonIcon: {
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  commonTitle: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  cardsList: {
    width: width,
    flex: 1,
    marginTop: 10,
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  card: {
    width: cardWidth - 10,
    height: 100,
    margin: 5,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  cardLinkname: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  cardName: {
    fontSize: 14,
    color: Colors.gray,
  },
});

const allCards = [
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
];

class CommonCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
    this.getName = this.getName.bind(this);
  }

  getData = () => {
    this.setState({cards: allCards});
  };

  componentDidMount() {
    this.getData();
  }

  goBack = () => {
    Navigation.dismissOverlay(this.props.componentId);
  };

  getName = (names, lastNames) => {
    const name = names.concat(lastNames);
    const finalName = name.filter(item => item !== '');
    return finalName.join(' ');
  };

  render() {
    const {cards} = this.state;
    const {owner, user, vip, vipDark} = this.props;

    const backgroundColor = vipDark
      ? {backgroundColor: 'black'}
      : {backgroundColor: 'white'};

    const backgroundColor_2 = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.grayLight}
      : {color: Colors.defaultTextColor};

    const textColor_2 = vipDark
      ? {color: Colors.silverMetallic}
      : {color: Colors.defaultTextColor};

    const textColor_3 = vipDark
      ? {color: 'white'}
      : {color: Colors.defaultTextColor};

    const buttonBackground = vipDark
      ? {borderColor: Colors.grayLight, backgroundColor: Colors.eerieBlack}
      : {borderColor: Colors.gray, backgroundColor: Colors.personal};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        <View style={[styles.topHeader, backgroundColor]}>
          {/* HEADER */}
          <Header goBack={this.goBack} color={vipDark ? 'black' : 'white'} />

          {/* USERS */}
          <View style={styles.users}>
            <View style={styles.userContainer}>
              <ProfilePicture linkname={owner.linkname} size={90} />
              <Text style={[styles.userName, textColor]}>
                {this.getName(owner.nombre, owner.apellido)}
              </Text>
            </View>

            <View style={styles.commonIcon}>
              <Icon name="card" factor={1.5} Borderless />
            </View>

            <View style={styles.userContainer}>
              <ProfilePicture linkname={user.linkname} size={90} />
              <Text style={[styles.userName, textColor]}>
                {this.getName(user.nombre, user.apellido)}
              </Text>
            </View>
          </View>

          <Text style={[styles.commonTitle, textColor_2]}>{`Tarjetas que ${
            owner.nombre[0]
          } tiene en común contigo`}</Text>
        </View>

        {/* CARDS */}
        <FlatList
          numColumns={2}
          data={cards}
          renderItem={({item, index}) => (
            <Card
              item={{...item, index}}
              getName={this.getName}
              textColors={[textColor_2, textColor_3]}
            />
          )}
          keyExtractor={(item, index) => item.id}
          style={[styles.cardsList, backgroundColor_2]}
        />
      </View>
    );
  }
}

const Card = ({item, getName, textColors}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card} />
      <Text style={[styles.cardLinkname, textColors[0]]}>{item.linkname}</Text>
      <Text style={[styles.cardName, textColors[1]]}>
        {getName(item.nombre, [])}
      </Text>
    </View>
  );
};

export default CommonCards;

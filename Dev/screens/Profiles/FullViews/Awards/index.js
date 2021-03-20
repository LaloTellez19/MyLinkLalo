import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Layout from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Header from '../../../../components/Header';
import ProfilePicture from '../../../../components/ProfilePicture';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: '100%',
    backgroundColor: 'white',
  },
  /* TOP CONTAINER STYLES */
  topContainerStyles: {
    height: 240,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  topContainer: {
    width: width,
    height: 25,
    alignItems: 'center',
  },
  topContainerTitle: {
    fontSize: 20,
    color: Colors.defaultTextColor,
  },
  /* GIVE COMPLIMENT STYLES */
  userInfo: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  businessName: {
    fontSize: 20,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  /* AWARDS LIST STYLES */
  awardsList: {
    height: height - 240,
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  award: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
  },
  awardImageContainer: {
    width: width / 4,
    height: width / 4,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  awardImage: {
    width: width / 4,
    height: width / 4,
    borderRadius: 10,
  },
  awardText: {
    width: width / 4,
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 2,
    marginBottom: 5,
    textAlign: 'center',
  },
});

const response = [
  {
    img:
      'https://i.picsum.photos/id/63/200/300.jpg?hmac=Zhw62KKdLbsw5yRcx9gVDEQq4kzPwjZUrJAJUIryu6k',
    title: 'Botón Diamante',
  },
  {
    img:
      'https://i.picsum.photos/id/570/200/300.jpg?hmac=fMlqjNmBSgN75P_tCU-PVSGzRYQxU23Xqd593HxZSZQ',
    title: 'Influencer Favorito 2016',
  },
  {
    img:
      'https://i.picsum.photos/id/786/200/300.jpg?hmac=ukrca61AOMxrxsEnCf7j49AnyoIwIsyIikReiUhm6zQ',
    title: '1 millón de suscriptores',
  },
  {
    img:
      'https://i.picsum.photos/id/63/200/300.jpg?hmac=Zhw62KKdLbsw5yRcx9gVDEQq4kzPwjZUrJAJUIryu6k',
    title: 'Botón Diamante',
  },
  {
    img:
      'https://i.picsum.photos/id/570/200/300.jpg?hmac=fMlqjNmBSgN75P_tCU-PVSGzRYQxU23Xqd593HxZSZQ',
    title: 'Influencer Favorito 2016',
  },
  {
    img:
      'https://i.picsum.photos/id/786/200/300.jpg?hmac=ukrca61AOMxrxsEnCf7j49AnyoIwIsyIikReiUhm6zQ',
    title: '1 millón de suscriptores',
  },
  {
    img:
      'https://i.picsum.photos/id/63/200/300.jpg?hmac=Zhw62KKdLbsw5yRcx9gVDEQq4kzPwjZUrJAJUIryu6k',
    title: 'Botón Diamante',
  },
  {
    img:
      'https://i.picsum.photos/id/570/200/300.jpg?hmac=fMlqjNmBSgN75P_tCU-PVSGzRYQxU23Xqd593HxZSZQ',
    title: 'Influencer Favorito 2016',
  },
  {
    img:
      'https://i.picsum.photos/id/786/200/300.jpg?hmac=ukrca61AOMxrxsEnCf7j49AnyoIwIsyIikReiUhm6zQ',
    title: '1 millón de suscriptores',
  },
  {
    img:
      'https://i.picsum.photos/id/63/200/300.jpg?hmac=Zhw62KKdLbsw5yRcx9gVDEQq4kzPwjZUrJAJUIryu6k',
    title: 'Botón Diamante',
  },
  {
    img:
      'https://i.picsum.photos/id/570/200/300.jpg?hmac=fMlqjNmBSgN75P_tCU-PVSGzRYQxU23Xqd593HxZSZQ',
    title: 'Influencer Favorito 2016',
  },
  {
    img:
      'https://i.picsum.photos/id/786/200/300.jpg?hmac=ukrca61AOMxrxsEnCf7j49AnyoIwIsyIikReiUhm6zQ',
    title: '1 millón de suscriptores',
  },
  {
    img:
      'https://i.picsum.photos/id/63/200/300.jpg?hmac=Zhw62KKdLbsw5yRcx9gVDEQq4kzPwjZUrJAJUIryu6k',
    title: 'Botón Diamante',
  },
  {
    img:
      'https://i.picsum.photos/id/570/200/300.jpg?hmac=fMlqjNmBSgN75P_tCU-PVSGzRYQxU23Xqd593HxZSZQ',
    title: 'Influencer Favorito 2016',
  },
  {
    img:
      'https://i.picsum.photos/id/786/200/300.jpg?hmac=ukrca61AOMxrxsEnCf7j49AnyoIwIsyIikReiUhm6zQ',
    title: '1 millón de suscriptores',
  },
];

class Awards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      awards: [],
    };
  }
	
  getData = () => {
    this.setState({awards: response});
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
    const {awards} = this.state;
    const {data} = this.props;
    const vip = data ? data.vip === 1 : false;
    const vipDark = data ? data.vip === 2 : false;

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

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        <View style={[styles.topContainerStyles, backgroundColor]}>
          <Header
            goBack={() => this.goBack()}
            color={vipDark ? 'black' : 'white'}
          />
          {/* TOP CONTAINER */}
          <View style={styles.topContainer}>
            <Text style={[styles.topContainerTitle, textColor]}>
              {`${data.tipo !== 1 ? 'Mis' : 'Nuestros'} galardones`}
            </Text>
          </View>

          {/* USER INFO */}
          <View style={styles.userInfo}>
            <ProfilePicture
              linkname={data.linkname}
              size={100}
              Business={data.tipo !== 0}
            />
            <Text style={[styles.businessName, textColor_2]}>
              {this.getName(data.nombre, data.apellido)}
            </Text>
          </View>
        </View>

        {/* AWARDS LIST */}
        <View style={[styles.awardsList, backgroundColor_2]}>
          <FlatList
            data={awards}
            numColumns={3}
            renderItem={({item, index}) => (
              <Award item={{...item, index}} textColor={textColor_3} />
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
          />
        </View>
      </View>
    );
  }
}

const Award = ({item, handleSeeAward, textColor}) => {
  return (
    <TouchableOpacity
      style={styles.award}
      onPress={() => {
        handleSeeAward ? handleSeeAward(item) : null;
      }}
      activeOpacity={0.7}>
      <View style={styles.awardImageContainer}>
        <Image style={styles.awardImage} source={{uri: item.img}} />
      </View>
      <Text style={[styles.awardText, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default Awards;

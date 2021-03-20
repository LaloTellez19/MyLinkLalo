import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Layout from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Header from '../../../../components/Header';
import ProfilePicture from '../../../../components/ProfilePicture';
import Cumplidos from '../../../AdmonPersonal/Cumplidos';

import {distincionesInfo} from '../../../AdmonPersonal/Cumplidos';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: height,
    backgroundColor: 'white',
  },
  /* TOP CONTAINER STYLES */
  topContainerStyles: {
    elevation: 10,
    backgroundColor: 'black',
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
  /* COMPLIMENTS STYLES */
  compliments: {
    alignItems: 'center',
    height: height - 63 - 25,
  },
  /* GIVE COMPLIMENT STYLES */
  giveCompliment: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  businessName: {
    fontSize: 20,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  yourCompliment: {
    alignItems: 'center',
    marginTop: 10,
  },
  yourComplimentTitle: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    marginBottom: 5,
  },
  yourComplimentImg: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  yourComplimentName: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    marginTop: 10,
    marginBottom: 10,
  },
  /* COMPLIMENT STYLES */
  complimentsList: {
    alignSelf: 'center',
    marginTop: 10,
  },
  compliment: {
    width: 80,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  complimentImg: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
  },
  complimentName: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 10,
  },
  complimentSelected: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: -12,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 360,
    elevation: 2,
  },
  voteButton: {
    width: width / 2,
    height: 35,
    backgroundColor: Colors.personal,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  voteButtonText: {
    fontSize: 14,
    color: 'white',
  },
});

class SelectCompliment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: Object.keys(distincionesInfo),
      complimentSelected: {},
    };

    this.menu = ['Vista Cumplidos', 'Vista Contactos'];
  }

  goBack = () => {
    Navigation.dismissOverlay(this.props.componentId);
  };

  getName = (names, lastNames) => {
    const name = names.concat(lastNames);
    const finalName = name.filter(item => item !== '');
    return finalName.join(' ');
  };

  selectCompliment = compliment => {
    this.setState({complimentSelected: compliment});
    // if (compliment.distincion !== this.state.complimentSelected.distincion) {
    //   this.setState({complimentSelected: compliment});
    // } else {
    //   this.setState({complimentSelected: {}});
    // }
  };

  complimentConfirmation = () => {
    console.log('CONFIRMATION');
    this.goBack();
  };

  render() {
    const {listData, complimentSelected} = this.state;
    const {data} = this.props;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

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
        <View style={[styles.topContainerStyles, backgroundColor]}>
          {/* HEADER */}
          <Header
            goBack={() => this.goBack()}
            color={vipDark ? 'black' : 'white'}
          />

          {/* TOP CONTAINER */}
          <View style={styles.topContainer}>
            <Text style={[styles.topContainerTitle, textColor]}>
              {'Mis Cumplidos'}
            </Text>
          </View>

          <View style={styles.giveCompliment}>
            <ProfilePicture
              linkname={data.linkname}
              size={100}
              Business={true}
            />
            <Text style={[styles.businessName, textColor_2]}>
              {this.getName(data.nombre, data.apellido)}
            </Text>

            {complimentSelected.distincion && (
              <View>
                <View style={styles.yourCompliment}>
                  <Text style={[styles.yourComplimentTitle, textColor_3]}>
                    {'Tu calificación'}
                  </Text>
                  <Image
                    style={styles.yourComplimentImg}
                    source={complimentSelected.ilustracion}
                  />
                  <Text style={[styles.yourComplimentName, textColor]}>
                    {complimentSelected.distincion}
                  </Text>
                </View>

                {/* VOTE */}
                <TouchableOpacity
                  style={[styles.voteButton, buttonBackground]}
                  onPress={() => this.complimentConfirmation()}>
                  <Text style={styles.voteButtonText}>{'Votar'}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <FlatList
          numColumns={4}
          data={listData}
          renderItem={({item, index}) => (
            <Compliment
              item={distincionesInfo[item]}
              complimentSelected={complimentSelected}
              selectCompliment={this.selectCompliment}
              textColor={textColor_3}
            />
          )}
          keyExtractor={(item, index) => item}
          style={[styles.complimentsList, backgroundColor_2]}
        />
      </View>
    );
  }
}

const Compliment = ({
  item,
  complimentSelected,
  selectCompliment,
  textColor,
}) => {
  return (
    <TouchableOpacity
      style={styles.compliment}
      onPress={() => selectCompliment(item)}>
      <Image style={styles.complimentImg} source={item.ilustracion} />
      <Text style={[styles.complimentName, textColor]}>{item.distincion}</Text>

      <View style={styles.complimentSelected}>
        {complimentSelected.distincion === item.distincion && (
          <Icon
            name="check_mark"
            size={18}
            factor={0.9}
            background={Colors.pet}
            forceColor
            color={'white'}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SelectCompliment;

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
    marginTop: 15,
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
    position: 'absolute',
    bottom: 0,
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

class ProfileCompliments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: Object.keys(distincionesInfo),
      complimentSelected: {},
    };
  }

  goBack = () => {
    Navigation.dismissOverlay(this.props.componentId);
  };

  pickCompliment = () => {
    console.log('selectCompliment');
    Navigation.showOverlay({
      component: {
        name: 'my-link.SelectCompliment',
        passProps: {
          data: this.props.data,
        },
      },
    });
  };

  render() {
    const {data} = this.props;
    const vipDark = data.vip === 2;

    const backgroundColor = vipDark
      ? {backgroundColor: 'black'}
      : {backgroundColor: 'white'};

    const backgroundColor_2 = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const buttonBackground = vipDark
      ? {borderColor: Colors.grayLight, backgroundColor: Colors.eerieBlack}
      : {borderColor: Colors.gray, backgroundColor: Colors.personal};

    const textColor = vipDark
      ? {color: Colors.grayLight}
      : {color: Colors.defaultTextColor};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* HEADER */}
        <Header
          goBack={() => this.goBack()}
          color={vipDark ? 'black' : 'white'}
        />

        {/* TOP CONTAINER */}
        <View style={[styles.topContainer, backgroundColor]}>
          <Text style={[styles.topContainerTitle, textColor]}>
            {'Mis Cumplidos'}
          </Text>
        </View>

        {/* COMPLIMENTS */}
        <View style={[styles.compliments, backgroundColor]}>
          <Cumplidos heightFactor={25} vipDark={vipDark} />
          {/* VOTE BUTTON */}
          <TouchableOpacity
            style={[styles.voteButton, buttonBackground]}
            onPress={() => this.pickCompliment()}>
            <Text style={styles.voteButtonText}>{'Votar'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ProfileCompliments;

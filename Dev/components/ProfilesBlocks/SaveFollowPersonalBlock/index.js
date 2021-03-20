import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Icon from '../../Icon';
import Text from '../../Text';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    marginTop: -5,
    elevation: 2,
  },
  /* TOP CONTAINER STYLES */
  topContainer: {
    backgroundColor: Colors.grayLight,
    marginTop: 0,
    height: 145,
    overflow: 'hidden',
  },
  topContainerCircle: {
    width: 140,
    height: 140,
    borderRadius: 140,
    alignSelf: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -70,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  topButtons: {
    alignItems: 'center',
    marginTop: 30,
  },
  saveSeeButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    width: width / 2.5,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.gray,
    marginRight: 10,
  },
  /* BOTTOM CONTAINER STYLES */
  bottomContainer: {
    height: 80,
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  myLinkButton: {
    width: 120,
    height: 120,
    borderRadius: 120,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    top: -60,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    elevation: 7,
  },
  myLinkButtonIcons: {
    alignItems: 'center',
  },
  myLinkButtonText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
});

class SaveFollowPersonalBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
    };
  }

  componentDidMount() {}

  /* HANDLE CHANGE FOLLOWING STATE */
  handleChangeFollowingState = () => {
    let currentState = this.state.data;
    currentState.following = !currentState.following;
    this.setState({
      data: currentState,
    });
  };

  handleCheckIn = () => {
    console.log('CHECK IN');
  };

  openSharedData = () => {
    Navigation.showOverlay({
      component: {
        name: 'my-link.SharedData',
        passProps: {
          linkname: '',
          data: this.props.data,
          linked: true,
          sharing: false,
          viewer: {
            tipo: 0,
          },
        },
      },
    });
  };

  render() {
    const {data} = this.state;
    const vip = this.props.data.vip === 1;
    const vipDark = this.props.data.vip === 2;

    /* DARK MODE STYLES */
    const topBackground = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: Colors.grayLight};

    const bottomBackground = vipDark
      ? {backgroundColor: 'black'}
      : {backgroundColor: 'white'};

    const circleContainer = vipDark
      ? {backgroundColor: 'black', borderColor: 'black'}
      : {backgroundColor: 'white', borderColor: Colors.gray};

    const buttonBackground = vipDark
      ? {borderColor: Colors.grayLight, backgroundColor: Colors.eerieBlack}
      : {borderColor: Colors.gray, backgroundColor: 'transparent'};

    const buttonText = vipDark
      ? {color: Colors.grayLight}
      : {color: Colors.defaultTextColor};

    const followingText =
      !vipDark && data.following
        ? {color: 'black'}
        : !vipDark && !data.following
        ? {color: Colors.defaultTextColor}
        : vipDark
        ? {color: Colors.grayLight}
        : {color: Colors.defaultTextColor};

    /* VIP STYLES */
    const myLinkButtonVIP = vip
      ? {backgroundColor: 'black'}
      : {backgroundColor: 'white'};

    const myLinkButtonTextVIP = vip
      ? {color: 'white'}
      : {color: Colors.defaultTextColor};

    return (
      <View style={styles.mainContainer}>
        {/* TOP CONTAINER */}
        <View style={[styles.topContainer, topBackground]}>
          <View style={[styles.topContainerCircle, circleContainer]} />

          {/* TOP BUTTONS */}
          <View style={styles.topButtons}>
            <View style={styles.saveSeeButtons}>
              {/* SAVE */}
              <TouchableOpacity style={[styles.button, buttonBackground]}>
                <Icon
                  name="wallet_save"
                  factor={0.7}
                  Borderless
                  forceColor
                  color={Colors.gray}
                />
                <Text style={[styles.buttonText, buttonText]}>{'Guardar'}</Text>
              </TouchableOpacity>

              {/* SEE CARD */}
              <TouchableOpacity
                style={[styles.button, buttonBackground]}
                onPress={() => this.handleChangeFollowingState()}>
                <Icon
                  name="people_check_mark"
                  factor={0.7}
                  Borderless
                  forceColor
                  color={data.following && !vipDark ? 'black' : Colors.gray}
                />
                <Text style={[styles.buttonText, followingText]}>
                  {data.following ? 'Siguiendo' : 'Seguir'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* BOTTOM CONTAINER */}
        <View style={[styles.bottomContainer, bottomBackground]}>
          {/* MY LINK BUTTON */}
          <TouchableOpacity
            style={[styles.myLinkButton, myLinkButtonVIP]}
            onPress={() => this.openSharedData()}>
            <View style={styles.myLinkButtonIcons}>
              <Icon name="my_link" factor={0.9} Borderless Colorless />
              <Icon name="my_link_logo" factor={2.3} Borderless Colorless />
              <Text style={[styles.myLinkButtonText, myLinkButtonTextVIP]}>
                {'ver'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SaveFollowPersonalBlock;

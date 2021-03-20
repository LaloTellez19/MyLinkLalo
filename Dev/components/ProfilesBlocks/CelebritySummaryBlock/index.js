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
    marginTop: 0,
  },
  /* TOP CONTAINER STYLES */
  topContainer: {
    backgroundColor: Colors.grayLight,
    marginTop: 5,
    height: 180,
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
  topHeader: {
    marginBottom: 15,
    alignItems: 'center',
  },
  topButtons: {
		alignItems: 'center',
		marginTop: 40,
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
  recommendButton: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  /* BOTTOM CONTAINER STYLES */
  bottomContainer: {
    height: 80,
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  myLinkButtonContainer: {
    width: 120,
    height: 120,
    borderRadius: 360,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray,
    position: 'absolute',
    top: -70,
    elevation: 7,
  },
  myLinkButton: {
    width: 116,
    height: 116,
    borderRadius: 360,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 8,
  },
  myLinkButtonIcons: {
    alignItems: 'center',
  },
  myLinkButtonText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  /* SUMMARY ITEMS STYLES */
  summaryItemsContainer: {
    width: width,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  summaryItem: {
    width: width / 3,
    height: 90,
    alignItems: 'center',
  },
  summaryItemTop: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginBottom: 5,
  },
  summaryItemBottom: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginTop: 5,
  },
  summaryTotalBottom: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.defaultTextColor,
    marginTop: 5,
  },
  summaryRawData: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 42,
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  /* BOTTOM OPTIONS STYLES */
  bottomOptions: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  /* CHECK IN STYLES */
  checkIn: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    alignItems: 'center',
  },
  checkInText: {
    fontSize: 14,
    color: Colors.personal,
  },
  /* CONTACT STYLES */
  contactContainer: {
    width: width,
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5,
    backgroundColor: 'white',
  },
  contactTitle: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginBottom: 15,
  },
  contactButton: {
    width: width / 2.5,
    height: 30,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.business,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    marginBottom: 30,
  },
  contactButtonText: {
    width: width / 3.6,
    fontSize: 14,
    color: 'white',
  },
});

class CelebritySummaryBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      summaryItems: [],
    };
  }

  componentDidMount() {
    this.getSummaryItems();
  }

  getSummaryItems = () => {
    const data = this.state.data;
    this.setState({
      summaryItems: [
        {
          topText: 'Recomendaciones',
          icon: 'recommendation',
          color: null,
          bottomText: `${data.recommendations} Totales`,
          total: `${data.recommendations}`,
          label: 'Totales',
          Colorless: true,
        },
        {
          topText: '',
          icon: data.following ? 'tag_check_solid' : 'tag_check',
          color: Colors.gray,
          bottomText: data.following ? 'Siguiendo' : 'Seguir',
          total: '',
          label: data.following ? 'Siguiendo' : 'Seguir',
          onPress: () => this.handleChangeFollowingState(),
          Colorless: false,
          factor: 1,
        },
        {
          topText: 'Recomendado',
          icon: 'tip',
          color: Colors.business,
          bottomText: `${data.myRecommendations} Veces`,
          total: `${data.myRecommendations}`,
          label: 'Veces',
        },
      ],
    });
  };

  /* HANDLE CHANGE FOLLOWING STATE */
  handleChangeFollowingState = () => {
    let currentState = this.state.data;
    currentState.following = !currentState.following;
    this.setState(
      {
        data: currentState,
      },
      () => this.getSummaryItems(),
    );
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
    const {summaryItems} = this.state;
    const {data} = this.props;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

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

    /* VIP STYLES */
    const myLinkButtonContainerVIP =
      vip || vipDark
        ? {backgroundColor: Colors.golden}
        : {backgroundColor: Colors.gray};

    const myLinkButtonVIP =
      vip || vipDark ? {backgroundColor: 'black'} : {backgroundColor: 'white'};

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
              <TouchableOpacity style={[styles.button, buttonBackground]}>
                <Icon
                  name="wallet"
                  factor={0.7}
                  Borderless
                  forceColor
                  color={Colors.gray}
                />
                <Text style={[styles.buttonText, buttonText]}>
                  {'Siguiendo'}
                </Text>
              </TouchableOpacity>
            </View>

            
          </View>
        </View>

        {/* BOTTOM CONTAINER */}
        <View style={[styles.bottomContainer, bottomBackground]}>
          <View
            style={[styles.myLinkButtonContainer, myLinkButtonContainerVIP]}>
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

        
      </View>
    );
  }
}





export default CelebritySummaryBlock;

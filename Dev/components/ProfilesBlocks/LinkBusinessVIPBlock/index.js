import React from 'react';
import {View, StyleSheet, TouchableOpacity, Animated} from 'react-native';

import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import Text from '../../Text';
import Icon from '../../Icon';

import CardsBlock from '../CardsBlock';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    elevation: 2,
    backgroundColor: Colors.grayLight,
    marginTop: 0,
    marginBottom: 5,
  },
  /* BLOCK NAME STYLES */
  blockName: {
    width: width,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  blockNameText: {
    width: width,
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  /* APPLY TO VIP */
  applyToVIPContainer: {
    width: width,
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  applyToVIPInfo: {
    width: width,
    height: 80,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  applyToVIPInfoIcon: {
    width: width / 3.5,
    marginRight: 0,
    marginLeft: 5,
  },
  applyToVIPInfoText: {
    width: width / 1.7,
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginLeft: 0,
    marginRight: 5,
  },
  mailWebIconsContainer: {
    width: width / 1.7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginLeft: 0,
    marginRight: 5,
  },
  mailWebIconsItem: {
    alignItems: 'center',
  },
  mailWebIconsText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginTop: 5,
  },
  applyToVIPButton: {
    width: width / 2.5,
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 0,
  },
  applyToVIPButtonText: {
    fontSize: 14,
    color: 'white',
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

class LinkBusinessVIPBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seeContact: false,
    };
    this.contactView = new Animated.Value(0);
  }

  handleApplyToVIP = () => {
    console.log('handleApplyToVIP');
  };

  handleContact = seeContactState => {
    this.setState({
      seeContact: seeContactState,
    });
    Animated.timing(this.contactView, {
      toValue: seeContactState ? 300 : 0,
      isInteraction: false,
      useNativeDriver: false,
    }).start();
  };

  constactOptionSelected = option => {
    console.log('constactOptionSelected: ', option);
  };

  render() {
    const {seeContact} = this.state;
    const {data, linkRequestColor} = this.props;
    const agent = data.agent;
    const type = data.tipo;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

    const backgroundColor = vipDark
      ? {backgroundColor: Colors.jet}
      : linkRequestColor
      ? {backgroundColor: linkRequestColor}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    const textColor_2 = vipDark
      ? {color: Colors.battleshipGray}
      : {color: Colors.defaultTextColor};

    const textColor_3 = vipDark
      ? {color: Colors.platinum}
      : {color: Colors.defaultTextColor};

    const applyToVIPButton = vipDark
      ? {borderColor: Colors.grayLight}
      : {borderColor: Colors.gray};

    const buttonBackground = vipDark
      ? {borderColor: Colors.grayLight, backgroundColor: Colors.eerieBlack}
      : {borderColor: Colors.gray, backgroundColor: Colors.business};

    const buttonText = vipDark ? {color: Colors.grayLight} : {color: 'white'};

    return (
      <View style={styles.mainContainer}>
        {/* BLOCK NAME */}
        {type === 5 && (
          <View style={[styles.blockName, backgroundColor]}>
            <Text style={[styles.blockNameText, textColor]}>
              {'Link Business'}
            </Text>
          </View>
        )}

        {/* APPLY TO VIP */}
        {type === 5 && (
          <View style={[styles.applyToVIPContainer, backgroundColor]}>
            <View style={styles.applyToVIPInfo}>
              <View style={styles.applyToVIPInfoIcon}>
                <Icon
                  name="vip_business"
                  size={90}
                  factor={1}
                  Borderless
                  Colorless
                />
              </View>
              {/* <Text style={[styles.applyToVIPInfoText, textColor]}>
              {
                'Este es un link VIP, solamente otro link VIP puede enviar solicitud.'
              }
            </Text> */}
              <View style={styles.mailWebIconsContainer}>
                <View style={styles.mailWebIconsItem}>
                  <Icon
                    name="at"
                    size={45}
                    factor={0.8}
                    forceColor
                    color={vipDark ? Colors.platinum : Colors.gray}
                    background={vipDark ? 'black' : null}
                    onPress={() => this.constactOptionSelected(0)}
                  />
                  <Text style={[styles.mailWebIconsText, textColor_2]}>
                    {'Correo'}
                  </Text>
                </View>
                <View style={styles.mailWebIconsItem}>
                  <Icon
                    name="internet"
                    size={45}
                    factor={0.8}
                    forceColor
                    color={vipDark ? Colors.platinum : Colors.gray}
                    background={vipDark ? 'black' : null}
                    onPress={() => this.constactOptionSelected(1)}
                  />
                  <Text style={[styles.mailWebIconsText, textColor_2]}>
                    {'Web'}
                  </Text>
                </View>
              </View>
            </View>

            {/* APPLY TO VIP BUTTON */}
            {/* <TouchableOpacity
            style={[styles.applyToVIPButton, applyToVIPButton]}
            onPress={() => this.handleApplyToVIP()}>
            <Text style={[styles.applyToVIPButtonText]}>
              {'Aplicar para VIP'}
            </Text>
          </TouchableOpacity> */}
          </View>
        )}

        {/* CONTACT */}
        <View style={[styles.contactContainer, backgroundColor]}>
          <Text style={[styles.contactTitle, textColor_3]}>
            {'O contacta a su representante'}
          </Text>

          {/* CONTACT BUTTON */}
          <TouchableOpacity
            style={[styles.contactButton, buttonBackground]}
            onPress={() => this.handleContact(true)}>
            <Icon
              name="ribbon"
              factor={0.75}
              Borderless
              forceColor
              color={'white'}
            />
            <Text style={[styles.contactButtonText, buttonText]}>
              {'Representante'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* SEE CONTACT */}
        <Animated.View style={{height: this.contactView}}>
          <CardsBlock
            agent={agent}
            handleContact={() => this.handleContact(false)}
            vipDark={vipDark}
            linkRequestColor={linkRequestColor}
          />
        </Animated.View>
      </View>
    );
  }
}

export default LinkBusinessVIPBlock;

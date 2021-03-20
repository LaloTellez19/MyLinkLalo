import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';
import Icon from '../../Icon';

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
  /* OPINION BUTTON */
  opinionButton: {
    width: width / 1.5,
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
  },
  opinionButtonText: {
    width: width / 2,
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginLeft: 5,
  },
});

class SuggestionsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = () => {
    Navigation.showOverlay({
      component: {
        name: 'my-link.Complaint',
        passProps: {
          user: {
            linkname: 'ricardovarela0000MX',
            nombre: ['Ricardo'],
            apellido: ['Varela'],
            tipo: 0,
          },
          vip: this.props.data.vip,
        },
      },
    });
  };

  render() {
    const {data} = this.props;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

    const backgroundColor = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    const buttonBackground = vipDark
      ? {borderColor: Colors.grayLight, backgroundColor: Colors.eerieBlack}
      : {borderColor: Colors.gray, backgroundColor: 'transparent'};

    const buttonText = vipDark
      ? {color: Colors.grayLight}
      : {color: Colors.defaultTextColor};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* BLOCK NAME */}
        <View style={styles.blockName}>
          <Text style={[styles.blockNameText, textColor]}>{'Sugerencias'}</Text>
        </View>

        {/* OPINION */}
        <TouchableOpacity
          style={[styles.opinionButton, buttonBackground]}
          onPress={this.onPress}>
          <Text style={[styles.opinionButtonText, buttonText]}>
            {'Compartenos tu opinión'}
          </Text>
          <Icon
            name="mail"
            size={31}
            factor={0.7}
            forceColor
            color={'white'}
            background={vip || vipDark ? 'black' : Colors.business}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default SuggestionsBlock;

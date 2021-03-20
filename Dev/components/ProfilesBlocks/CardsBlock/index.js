import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import Text from '../../Text';
import Icon from '../../Icon';
import UserImage from '../../UserImage';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    elevation: 0,
    backgroundColor: 'white',
    marginTop: 0,
    marginBottom: 0,
  },
  /* USER CONTAINER STYLES */
  userContainer: {
    width: width,
    marginBottom: 10,
    alignItems: 'center',
  },
  blackContainer: {
    width: width,
    height: 70,
    backgroundColor: 'black',
    marginTop: 65,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'transparent',
  },
  userImage: {
    width: width / 2,
    marginBottom: 90,
  },
  optionsContainer: {
    width: width / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  option: {
    alignItems: 'center',
  },
  optionText: {
    fontSize: 12,
    color: 'white',
    marginTop: 5,
  },
  /* USER DETAILS STYLES */
  userDetailsContainer: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  userIcon: {
    width: width / 4,
    alignItems: 'center',
    marginBottom: 15,
  },
  userDetails: {
    width: width / 2,
    alignItems: 'center',
  },
  emptyBox: {
    width: width / 4,
  },
  userName: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  userLink: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 5,
    marginBottom: 5,
  },
  userLinkname: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  /* ARROW ICON STYLES */
  arrowIcon: {
    marginTop: 25,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

function CardsBlock(props) {
  const {agent, handleContact, vipDark, linkRequestColor} = props;

  const backgroundColor = vipDark
    ? {backgroundColor: Colors.jet}
    : linkRequestColor
    ? {backgroundColor: linkRequestColor}
    : {backgroundColor: 'white'};

  const textColor = vipDark
    ? {color: 'white'}
    : {color: Colors.defaultTextColor};
  
  const textColor_2 = vipDark
    ? {color: Colors.silverChalice}
    : {color: Colors.defaultTextColor};

  const textColor_3 = vipDark
    ? {color: Colors.spanishGray}
    : {color: Colors.defaultTextColor};

  const blackContainerBorder = vipDark
    ? {borderColor: Colors.golden}
    : {borderColor: 'transparent'};

  const handleSeeCard = () => {
    console.log('handleSeeCard');
  };

  const handleSaveCard = () => {
    console.log('handleSaveCard');
  };

  return (
    <View style={[styles.mainContainer, backgroundColor]}>
      <View style={styles.userContainer}>
        {/* BLACK CONTAINER / USER IMAGE / OPTIONS */}
        <View style={[styles.blackContainer, blackContainerBorder]}>
          <View style={styles.userImage}>
            <UserImage link={'defaultUser'} userSize={90} />
          </View>
          <View style={styles.optionsContainer}>
            <View style={styles.option}>
              <Icon
                name="wallet"
                size={35}
                factor={0.7}
                forceColor
                color={'white'}
                onPress={() => handleSeeCard()}
              />
              <Text style={styles.optionText}>{'Tarjeta'}</Text>
            </View>
            <View style={styles.option}>
              <Icon
                name="wallet_save"
                size={35}
                factor={0.7}
                forceColor
                color={'white'}
                onPress={() => handleSaveCard()}
              />
              <Text style={styles.optionText}>{'Guardar'}</Text>
            </View>
          </View>
        </View>

        {/* USER DETAILS */}
        <View style={styles.userDetailsContainer}>
          <View style={styles.userIcon}>
            <Icon
              name="ribbon"
              factor={1}
              Borderless
              background={Colors.business}
            />
          </View>
          <View style={styles.userDetails}>
            <Text style={[styles.userName, textColor]}>{`${agent.nombre} ${
              agent.apellido_paterno
            }`}</Text>
            <Text style={[styles.userLink, textColor_2]}>{`@${agent.link}`}</Text>
            
          </View>
          <View style={styles.emptyBox} />
        </View>
      </View>

      {/* HIDE CONTACT */}
      <TouchableOpacity
        style={styles.arrowIcon}
        onPress={() => handleContact()}>
        <Icon
          name="arrow_up"
          factor={0.8}
          Borderless
          forceColor
          color={vipDark ? Colors.silverMetallic : Colors.gray}
        />
      </TouchableOpacity>
    </View>
  );
}

export default CardsBlock;

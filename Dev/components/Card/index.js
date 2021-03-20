import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import Colors from '../../constants/Colors';
import IconPack from '../../constants/IconPack';
import Text from '../Text';
import Icon from '../Icon';
import ProfilePicture from '../ProfilePicture';
import UserImage from '../UserImage';

/* STYLES */
const styles = StyleSheet.create({
  /* CARD CONTAINER STYLES */
  card: {
    alignItems: 'center',
    alignSelf: 'center',
    width: 230,
    height: 200,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  /* CARD HEADER STYLES */
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cardIcon: {
    width: 60,
    marginTop: 10,
  },
  mylinkLogo: {
    alignItems: 'center',
  },
  mylinkLogo_img: {
    width: 90,
    height: 35,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  emptyBox: {
    width: 60,
  },
  /* USER INFO STYLES */
  userName: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  userLink: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.gray,
  },
});

function Card(props) {
  const {personal, user, width, height} = props;
  const activeColor = personal ? Colors.personal : Colors.business;

  const cardStyles = StyleSheet.create({
    card: {
      width: width || 230,
      height: height || 200,
    },
    cardIcon: {
      width: width / 4 || 60,
      height: width / 5 || 60,
      alignItems: width ? 'center' : null,
    },
    mylinkLogo_img: {
      width: width / 2 || 90,
    },
    emptyBox: {
      width: width / 4 || 60,
    },
    userImageContainer: {
      marginTop: height ? -5 : -30,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const getName = (names, lastNames) => {
    const name = names.concat(lastNames);
    const finalName = name.filter(item => item !== '');
    return finalName.join(' ');
  };

  return (
    <View style={[styles.card, cardStyles.card]}>
      {/* CARD HEADER */}
      <View style={styles.cardHeader}>
        <View style={[styles.cardIcon, cardStyles.cardIcon]}>
          <Icon
            name={personal ? 'personal_card' : 'business_card'}
            size={width / 5 || 35}
            factor={width ? 0.9 : 0.8}
            Borderless
            background={activeColor}
            forceColor
            color={'white'}
          />
        </View>
        <View style={styles.mylinkLogo}>
          <Image
            style={[styles.mylinkLogo_img, cardStyles.mylinkLogo_img]}
            source={IconPack.my_link_logo}
          />
        </View>
        <View style={[styles.emptyBox, cardStyles.emptyBox]} />
      </View>

      {/* USER IMAGE */}
      <View>
        <View style={cardStyles.userImageContainer}>
          <ProfilePicture
            linkname={user.linkname}
            size={height / 3 || 80}
            Business={!personal}
          />
        </View>

        {/* USER NAME */}
        <Text style={[styles.userName, {width: width}]} numberOfLines={2}>
          {user.apellido ? getName(user.nombre, user.apellido) : user.nombre}
        </Text>

        {/* USER LINK */}
        <Text style={styles.userLink}>{user.link}</Text>
      </View>
    </View>
  );
}

export default Card;

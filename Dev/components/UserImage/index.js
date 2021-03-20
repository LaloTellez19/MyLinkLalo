import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {users} from '../../testData/dataAdmon';
import Colors from '../../constants/Colors';

function UserImage(props) {
  const {link, userImage, countryImage, borderRadius} = props;

  const user = users[`${link}`];
  const userSize = props.userSize || 50;
  const borderWidth = 2;
  const userBorderRadius = borderRadius || 360;
  const countryImagePosition = userBorderRadius === 360 ? 1 : 1.1;

  /* STYLES */
  const userStyles = StyleSheet.create({
    /* USERIMAGE STYLES */
    userContainer: {
      alignItems: 'center',
      alignSelf: 'center',
      height: userSize,
    },
    userImageContainer: {
      borderWidth: 0.5,
      borderColor: Colors.gray,
      borderRadius: userBorderRadius,
      elevation: 5,
      backgroundColor: 'white',
    },
    userImage: {
      width: userSize,
      height: userSize,
      borderWidth: borderWidth,
      borderColor: 'white',
      borderRadius: userBorderRadius,
    },
    countryContainer: {
      width: userSize / 2.3,
      height: userSize / 2.3,
      borderWidth: 0.5,
      borderColor: Colors.gray,
      borderRadius: 360,
      marginTop: -userSize * countryImagePosition,
      marginLeft: userSize * 0.9,
      elevation: -1,
    },
    countryImageContainer: {
      width: userSize / 2.5,
      height: userSize / 2.5,
      borderRadius: 360,
      borderWidth: borderWidth,
      borderColor: 'white',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      marginTop: -userSize / 2.4,
      marginLeft: userSize * 0.9,
      elevation: 6,
    },
    countryImage: {
      width: userSize / 1.5,
      height: userSize / 1.5,
      borderRadius: 360,
    },
  });

  return (
    <View style={userStyles.userContainer}>
      <View style={userStyles.userImageContainer}>
        <Image
          style={userStyles.userImage}
          source={{uri: link ? user.foto : userImage}}
        />
      </View>
      <View style={userStyles.countryContainer} />
      <View style={userStyles.countryImageContainer}>
        <Image
          style={userStyles.countryImage}
          source={{
            uri: link
              ? `https://www.countryflags.io/${user.pais}/flat/64.png`
              : countryImage,
          }}
        />
      </View>
    </View>
  );
}

export default UserImage;

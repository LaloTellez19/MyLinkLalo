import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import Text from '../../../../../components/Text';
import ProfilePicture from '../../../../../components/ProfilePicture';
import UserImage from '../../../../../components/UserImage';

const width = Layout.window.width;
const height = Layout.window.height - 63;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: height,
    backgroundColor: 'white',
    marginTop: -73,
    alignSelf: 'center',
  },
  /* SENT BY - USER STYLES*/
  sentByContainer: {
    overflow: 'hidden',
    paddingBottom: 5,
  },
  sentBy: {
    height: 250,
    elevation: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentByUser: {
    marginBottom: 10,
    alignItems: 'center',
  },
  sentByUserText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 10,
  },
  sentByText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    paddingLeft: 25,
    paddingRight: 25,
    textAlign: 'justify',
    marginTop: 10,
  },
  /* CONFIRMATION BUTTON STYLES */
  confirmationContainer: {
    marginTop: 25,
  },
  confirmationButton: {
    width: 190,
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.business,
    borderRadius: 10,
    elevation: 1,
    marginTop: 25,
  },
  confirmationButtonText: {
    fontSize: 14,
    color: 'white',
  },
});

function Notification(props) {
  const {user} = props;

  return (
    <View style={styles.mainContainer}>
      {/* SENT BY - USER */}
      <View style={styles.sentByContainer}>
        {/* USER INFO */}
        <View style={styles.sentBy}>
          <View style={styles.sentByUser}>
            <ProfilePicture linkname={user.linkname} size={100} Business />
            <Text style={styles.sentByUserText}>{user.nombre}</Text>
          </View>
          <Text style={styles.sentByText}>
            {
              'Thank You, Bar && Grill te invita a confirmar que eres una de sus sucursales.'
            }
          </Text>
        </View>
      </View>

      {/* CONFIRMATION */}
      <View style={styles.confirmationContainer}>
        {/* USER INFO */}
        <View style={styles.sentByUser}>
          <UserImage
            link={'defaultUser'}
            userSize={75}
            countrySize={30}
            left={60}
            borderRadius={10}
          />
          <Text style={styles.sentByUserText}>{user.nombre}</Text>
        </View>
        <TouchableOpacity style={styles.confirmationButton} activeOpacity={0.5}>
          <Text style={styles.confirmationButtonText}>{'Confirmar'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Notification;

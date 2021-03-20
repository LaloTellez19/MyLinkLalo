import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import Text from '../Text';
import ProfilePicture from '../ProfilePicture';
import UserImage from '../UserImage';

const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  invitationContainer: {
    position: 'absolute',
    elevation: 10,
    backgroundColor: 'white',
    height: height,
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
  invitationText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    paddingLeft: 25,
    paddingRight: 25,
    textAlign: 'center',
    marginTop: 10,
  },
  /* SENT TO USER STYLES */
  setToContainer: {
    marginTop: 25,
  },
  sentToUser: {
    marginBottom: 10,
    alignItems: 'center',
  },
  sentToUserText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 10,
  },
  /* BUTTONS CONTAINER STYLES */
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 25,
    paddingBottom: 25,
  },
  /* CONFIRMATION BUTTON STYLES */
  confirmationButton: {
    width: 150,
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.business,
    borderRadius: 10,
    elevation: 1,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  confirmationButtonText: {
    fontSize: 14,
    color: 'white',
  },
  /* CANCEL INVITATION BUTTON STYLES */
  cancelButton: {
    width: 150,
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.grayLight,
    borderRadius: 10,
    elevation: 1,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  cancelButtonText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
});

function Invitation(props) {
  const {
    fromUser,
    fromBusiness,
    toUser,
    toPersonal,
    invitationText,
    buttonText,
    buttonAction,
    cancelInvitation,
  } = props;

  return (
    <View style={styles.invitationContainer}>
      {/* SENT BY - USER */}
      <View style={styles.sentByContainer}>
        {/* USER INFO */}
        <View style={styles.sentBy}>
          <View style={styles.sentByUser}>
            <ProfilePicture
              linkname={fromUser.linkname}
              size={100}
              Business={fromBusiness}
            />
            <Text style={styles.sentByUserText}>{fromUser.nombre}</Text>
          </View>
          <Text style={styles.invitationText}>{invitationText}</Text>
        </View>
      </View>

      {/* SENT TO USER */}
      <View style={styles.setToContainer}>
        {/* USER INFO */}
        <View style={styles.sentToUser}>
          <UserImage
            link={toUser.link}
            userSize={75}
            borderRadius={toPersonal ? 360 : 10}
          />
          <Text style={styles.sentToUserText}>{`${
            toUser.nombre
          } ${toUser.apellido_paterno || ''}`}</Text>
          <Text style={styles.sentToUserText}>{toUser.job || ''}</Text>
        </View>
      </View>

      {/* ACTIONS */}
      <View style={styles.buttonsContainer}>
        {/* CANCEL INVITATION*/}
        <TouchableOpacity
          style={styles.cancelButton}
          activeOpacity={0.5}
          onPress={() => (cancelInvitation ? cancelInvitation() : null)}>
          <Text style={styles.cancelButtonText}>{'Cancelar'}</Text>
        </TouchableOpacity>

        {/* CONFIRM */}
        <TouchableOpacity
          style={styles.confirmationButton}
          activeOpacity={0.5}
          onPress={() => (buttonAction ? buttonAction() : null)}>
          <Text style={styles.confirmationButtonText}>
            {buttonText || 'Confirmar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Invitation;

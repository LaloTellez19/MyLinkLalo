import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Text from '../Text';
import Icon from '../Icon';
import Colors from '../../constants/Colors';

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 20,
  },
  confirmacionContainer: {
    width: 330,
    height: 230,
    marginTop: 5,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  confirmacionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 15,
  },
  confirmacionTitulo: {
    fontSize: 20,
    color: Colors.defaultTextColor,
    marginRight: 40,
    width: 200,
  },
  mensajeConfirmacion: {
    width: 250,
    fontSize: 16,
    color: Colors.defaultTextColor,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  deleteButton: {
    height: 40,
    backgroundColor: Colors.business,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 60,
    marginLeft: 60,
    borderRadius: 10,
  },
  deleteButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

function DeleteConfirmation(props) {
  const {confirmation, cancelar, children, personal, text} = props;
  const defaultText =
    'Vas a eliminar este elemento, confirma esta acción o puedes cancelarla.';

  const buttonColor = personal
    ? {backgroundColor: Colors.personal}
    : {backgroundColor: Colors.business};

  return (
    <View style={styles.mainContainer}>
      <View style={styles.confirmacionContainer}>
        <View style={styles.confirmacionHeader}>
          <Text style={styles.confirmacionTitulo}>{'Confirmación'}</Text>
          <Icon
            name="times"
            size={25}
            factor={0.9}
            Borderless
            forceColor
            color={Colors.grayBold}
            background={Colors.grayLight}
            onPress={() => cancelar()}
          />
        </View>

        <View style={styles.colaboradorInfo}>
          {children}
          {!children && (
            <Text style={styles.mensajeConfirmacion}>
              {text ? text : defaultText}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.deleteButton, buttonColor]}
          onPress={() => confirmation()}>
          <Text style={styles.deleteButtonText}>{'Eliminar'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DeleteConfirmation;

import React from 'react';
import {View, StyleSheet, Switch, TouchableOpacity, ScrollView} from 'react-native';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: height,
  },
  topContainer: {
    width: width,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.grayLight,
  },
  topContainerText: {
    width: '65%',
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'justify',
    paddingRight: 35,
    paddingLeft: 35,
  },
  topContainerSwitch: {
    width: '35%',
    alignItems: 'center',
  },
  bottomContainer: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainerText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'justify',
    marginRight: 45,
    marginLeft: 45,
  },
  /* OPTIONS MENU STYLES */
  optionsMenu: {
    height: 80,
    elevation: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  optionsItem: {
    width: width / 4,
    alignItems: 'center',
    marginTop: 5,
  },
  optionsItemText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 5,
  },
  /* OPTION SELECTED STYLES */
  optionSelected: {
    width: width,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  optionSelectedText: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    marginLeft: 20,
  },
  optionDescription: {
    width: width,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionDescriptionText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'justify',
    paddingRight: 35,
    paddingLeft: 35,
  },
  /* SAVE BUTTON STYLES */
  saveButton: {
    width: width / 2,
    height: 40,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    backgroundColor: Colors.business,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gotoStoreButton: {
    width: width / 2,
    height: 40,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    color: 'white',
  },
  gotoStoreText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
});

function Settings(props) {
  const [notificationsActive, setNotificationsActive] = React.useState(false);
  const [optionSelected, setOptionSelected] = React.useState(0);
  const checkInOptions = [
    {
      icon: '',
      text: 'Automático',
      description:
        'Tus clientes harán check-in después de estar 10 minutos en tu negocio.',
    },
    {
      icon: '',
      text: 'En línea',
      description: 'Requiere autorización por parte del negocio.',
    },
    {
      icon: '',
      text: 'Presencial',
      description:
        'Cuando tus clientes escanean tú tarjetón o código que les proporciones.',
    },
    {
      icon: 'qr_code',
      text: 'Escanear tarjeta',
      description:
        'Cuando tus clientes escanean tú tarjetón o código que les proporciones.',
    },
  ];

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.topContainerText}>
          {'Notificarme los check-in de los clientes'}
        </Text>
        <View style={styles.topContainerSwitch}>
          <Switch
            value={notificationsActive}
            onValueChange={() => setNotificationsActive(!notificationsActive)}
            thumbColor={notificationsActive ? Colors.business : Colors.gray}
            trackColor={Colors.platinum}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomContainerText}>
          {'Selecciona solo una forma para que tus clientes hagan check-in'}
        </Text>
      </View>

      {/* OPTIONS MENU */}
      <View style={styles.optionsMenu}>
        {checkInOptions.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.optionsItem}
              onPress={() => setOptionSelected(index)}>
              <Icon
                name={item.icon}
                size={50}
                factor={0.8}
                background={
                  optionSelected === index ? Colors.business : 'white'
                }
                forceColor
                color={optionSelected === index ? 'white' : Colors.gray}
              />
              <Text style={styles.optionsItemText}>{item.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* OPTION DESCRIPTION */}
      <View>
        <View style={styles.optionSelected}>
          <Icon name={checkInOptions[optionSelected].icon} size={60} factor={0.8} />
          <Text style={styles.optionSelectedText}>
            {checkInOptions[optionSelected].text}
          </Text>
        </View>
        <View style={styles.optionDescription}>
          <Text style={styles.optionDescriptionText}>
            {checkInOptions[optionSelected].description}
          </Text>
        </View>

        {/* SAVE BUTTON */}
        {optionSelected === 0 && (
          <TouchableOpacity style={styles.gotoStoreButton}>
            <Text style={styles.gotoStoreText}>{'Ir a la tienda'}</Text>
          </TouchableOpacity>
        )}
        {optionSelected !== 0 && (
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>{'Guardar'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

export default Settings;

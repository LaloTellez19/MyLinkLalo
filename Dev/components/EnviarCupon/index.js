import React from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';

import Icon from '../../components/Icon';
import Text from '../../components/Text';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  menuCuponItem: {
    width: 70,
    alignItems: 'center',
  },
  menuCuponText: {
    fontSize: 14,
    color: 'white',
    marginTop: -5,
    paddingBottom: 5,
  },
});

const opcionesEnvio = [
  {
    name: 'at',
    text: 'Correo',
  },
  {
    name: 'message_send',
    text: 'Mensaje',
  },
  {
    name: 'phone',
    text: 'Llamar',
  },
];

function EnviarCupon(props) {
  const {
    index,
    itemHeight,
    lastIndex,
    initialValue,
    contentOffsetY,
    setMenuCupon,
  } = props;

  const getPosition = () => {
    const value = (index + 1) * itemHeight;
    const adjusment = index === lastIndex ? itemHeight : initialValue;
    const finalPosition = value - Math.ceil(contentOffsetY) - adjusment;
    console.log('finalPosition: ', finalPosition);
    return finalPosition;
  };

  const menuCupon = {
    position: 'absolute',
    top: getPosition() || 0,
    right: 10,
    width: 210,
    flexDirection: 'row',
    elevation: 1,
    backgroundColor: Colors.gray,
  };

  /* ENVIAR CUPON */
  const enviarCupon = tipoEnvio => {
    switch (tipoEnvio) {
      case 'Correo':
        enviarPorCorreo();
        setMenuCupon(false);
        break;
      case 'Mensaje':
        enviarPorMensaje();
        setMenuCupon(false);
        break;
      case 'Llamar':
        enviarPorLlamada();
        setMenuCupon(false);
        break;
    }
  };

  /* ENVIAR CUPON POR CORREO */
  const enviarPorCorreo = () => {
    console.log('Enviar por Correo');
  };

  const enviarPorMensaje = () => {
    console.log('Enviar por Mensaje');
  };

  const enviarPorLlamada = () => {
    console.log('Enviar por Llamar');
  };

  return (
    <View style={menuCupon}>
      {opcionesEnvio.map((item, index) => {
        return (
          <TouchableHighlight
            underlayColor={Colors.business}
            onPress={() => enviarCupon(item.text)}
            key={index}>
            <View style={styles.menuCuponItem}>
              <Icon
                name={item.name}
                size={40}
                Borderless
                forceColor
                color={'white'}
              />
              <Text style={styles.menuCuponText}>{item.text}</Text>
            </View>
          </TouchableHighlight>
        );
      })}
    </View>
  );
}

export default EnviarCupon;

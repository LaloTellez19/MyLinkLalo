import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import Colors from '../../../../../constants/Colors';
import Text from '../../../../../components/Text';
import UsersArray from '../../../../../components/UsersArray';

/* STYLES */
const styles = StyleSheet.create({
  /* ESTILOS MENU DE DISTINCIONES */
  distincionesHeader: {
    alignItems: 'center',
    backgroundColor: Colors.grayLight,
    height: 150,
    marginTop: 0,
  },
  /* ESTILOS RESUMEN MIS DISTINCIONES */
  misDistinciones: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  misDistincionesItem: {
    alignItems: 'center',
    marginTop: -8,
    paddingLeft: 15,
    paddingRight: 15,
  },
  misDistincionesText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.defaultTextColor,
    paddingBottom: 5,
    width: 50,
    height: 25,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Colors.gray,
    paddingTop: 4,
    marginBottom: 5,
  },
  misDistincionesIlustracion: {
    width: 80,
    height: 80,
  },
  misDistincionesNombre: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 3,
  },
  miTopDistincioUsers: {
    alignItems: 'center',
    marginRight: -57,
    marginLeft: 50,
    paddingRight: 45,
    paddingLeft: 45,
    marginTop: 50,
  },
});

function Summary(props) {
  const {distincionesInfo, datosVistaDistincion} = props;
  const defaultImage = 'https://i.picsum.photos/id/179/200/200.jpg';

  return (
    <View style={styles.distincionesHeader}>
      <View style={styles.misDistinciones}>
        <View style={styles.misDistincionesItem}>
          <Text style={styles.misDistincionesText}>
            {datosVistaDistincion[0].total}
          </Text>
          <Image
            style={styles.misDistincionesIlustracion}
            source={
              distincionesInfo[datosVistaDistincion[0].key].ilustracion || {
                uri: defaultImage,
              }
            }
          />
          <Text style={styles.misDistincionesNombre}>
            {distincionesInfo[datosVistaDistincion[0].key].distincion}
          </Text>
        </View>

        <View style={styles.miTopDistincioUsers}>
          <UsersArray users={datosVistaDistincion[0].users.slice(0, 3)} />
        </View>

        <View style={styles.misDistincionesItem}>
          <Text style={styles.misDistincionesText}>
            {datosVistaDistincion[1].total}
          </Text>
          <Image
            style={styles.misDistincionesIlustracion}
            source={
              distincionesInfo[datosVistaDistincion[1].key].ilustracion || {
                uri: defaultImage,
              }
            }
          />
          <Text style={styles.misDistincionesNombre}>
            {distincionesInfo[datosVistaDistincion[1].key].distincion}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Summary;

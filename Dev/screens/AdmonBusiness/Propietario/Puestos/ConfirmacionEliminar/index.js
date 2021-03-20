import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';
import Colors from '../../../../../constants/Colors';
import UserImage from '../../../../../components/UserImage';

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  confirmacionContainer: {
    width: 330,
    height: 435,
    marginTop: 5,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
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
  colaboradorInfo: {
    marginTop: 30,
    alignItems: 'center',
  },
  colaboradorNombre: {
    fontSize: 18,
    color: Colors.grayBold,
    textAlign: 'center',
    marginTop: 15,
  },
  colaboradorPuesto: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 10,
  },
  mensajeConfirmacion: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    margin: 45,
    marginTop: 10,
    marginBottom: 40,
  },
  botorEliminar: {
    height: 40,
    backgroundColor: Colors.business,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 60,
    marginLeft: 60,
    borderRadius: 10,
  },
  botorEliminarText: {
    fontSize: 16,
    color: 'white',
  },
});

function ConfirmacionEliminar(props) {
  const {colaborador, confirmarEliminacionColaborador, cancelar, rols} = props;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.confirmacionContainer}>
        <View style={styles.confirmacionHeader}>
          <Text style={styles.confirmacionTitulo}>
            {`Eliminar ${rols ? 'de roles' : 'colaborador'}`}
          </Text>
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
          <UserImage
            link={colaborador.link || 'defaultUser'}
            userSize={100}
            countrySize={35}
            left={75}
          />
          <Text style={styles.colaboradorNombre}>{`${colaborador.nombre} ${
            colaborador.apellido_paterno
          }`}</Text>
          <Text style={styles.colaboradorPuesto}>{colaborador.puesto}</Text>
          <Text style={styles.mensajeConfirmacion}>
            {`Vas a eliminar a ${colaborador.nombre} ${
              colaborador.apellido_paterno
            } de tu lista de ${rols ? 'roles' : 'colaboradores'}.`}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botorEliminar}
          onPress={() => confirmarEliminacionColaborador()}>
          <Text style={styles.botorEliminarText}>{'Eliminar'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ConfirmacionEliminar;

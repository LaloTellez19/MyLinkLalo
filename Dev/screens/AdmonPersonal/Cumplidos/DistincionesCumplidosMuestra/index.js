import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Text from '../../../../components/Text';
import Colors from '../../../../constants/Colors';

/* STYLES */
const styles = StyleSheet.create({
  /* ESTILOS MENU DE DISTINCIONES */
  distincionesHeader: {
    alignItems: 'center',
    backgroundColor: Colors.grayLight,
    height: 150,
    marginTop: 35,
  },
  distincionesMenu: {
    marginTop: 15,
  },
  distincionesItem: {
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  distincionIlustracion: {
    width: 70,
    height: 70,
  },
  distincionText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginTop: 3,
  },
  /* ESTILOS DEL CONTENIDO PRINCIPAL */
  contenido: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  descripcionNombre: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.defaultTextColor,
    paddingTop: 20,
  },
  descripcionDistincion: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.defaultTextColor,
    paddingTop: 25,
  },
  verDistinciones: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 90,
    backgroundColor: Colors.business,
  },
  verDistincionesText: {
    fontSize: 14,
    color: 'white',
  },
});

function DistincionesCumplidosMuestra(props) {
  const {keys, distincionesInfo, verMiContenido} = props;
  const [distincion, setDistincion] = React.useState(distincionesInfo[keys[0]]);

  const seleccionarDistincion = item => {
    setDistincion(item);
  };

  return (
    <View>
      <View>
        {/* MENU DE CUMPLIDOS */}
        <View style={styles.distincionesHeader}>
          <MenuDistinciones
            keys={keys}
            distincionesMenu={distincionesInfo}
            distincion={distincion}
            seleccionarDistincion={seleccionarDistincion}
          />
        </View>

        <View style={styles.contenido}>
          {/* DESCRIPCION CUMPLIDOS */}
          <View>
            <Text style={styles.descripcionNombre}>
              {distincion.distincion}
            </Text>
            <Text style={styles.descripcionDistincion}>
              {distincion.descripcion}
            </Text>
          </View>

          {/* BOTON VER MIS CUMPLIDOS */}
          <TouchableOpacity
            style={[styles.verDistinciones, {backgroundColor: Colors.personal}]}
            onPress={() => verMiContenido()}>
            <Text style={styles.verDistincionesText}>
              {'Ver mis cumplidos'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const MenuDistinciones = ({
  keys,
  distincionesMenu,
  distincion,
  seleccionarDistincion,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.distincionesMenu}>
      {keys.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.distincionesItem}
            onPress={() => seleccionarDistincion(distincionesMenu[item])}
            key={index}>
            <Image
              style={[
                styles.distincionIlustracion,
                distincion.distincion === distincionesMenu[item].distincion
                  ? {width: 100, height: 100}
                  : {marginTop: 15},
              ]}
              source={distincionesMenu[item].ilustracion}
            />
            <Text style={styles.distincionText}>
              {distincionesMenu[item].distincion}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default DistincionesCumplidosMuestra;

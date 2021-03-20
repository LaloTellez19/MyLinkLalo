import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';
import ErrorOrNoData from '../../../../../components/ErrorOrNoData';

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER */
  mainContainer: {
    width: '100%',
    flex: 1,
  },
  /* HEADER STYLES */
  encabezadoMisServicios: {
    height: 80,
    marginTop: 0,
    elevation: 5,
    backgroundColor: 'white',
  },
  /* ESTILOS LISTA DE SERVICIOS */
  listHeader: {
    flex: 1,
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  listHeaderText: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  listaDeServicios: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  listaDeServiciosItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  servicioSeleccionado: {
    marginLeft: 15,
    marginRight: 20,
  },
  listaDeServiciosText: {
    marginLeft: 20,
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  /* ESTILOS BOTON GUARDAR */
  botonGuardar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray,
    padding: 5,
    borderRadius: 10,
    marginLeft: 80,
    marginRight: 80,
    marginTop: 10,
    marginBottom: 15,
  },
  botonGuardarText: {
    fontSize: 14,
    color: Colors.grayLight,
  },
  /* ESTILOS CABECERA CON MIS SERVICIOS */
  misServiciosItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 8,
    paddingLeft: 5,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    backgroundColor: Colors.grayLight,
  },
  misServiciosText: {
    width: 85,
    marginLeft: 10,
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  misServiciosSeleccionado: {
    position: 'absolute',
    bottom: -8,
    right: 1,
    marginLeft: 5,
    marginRight: 5,
  },
});

function SeleccionarServicios(props) {
  const {
    misServicios,
    serviciosTodos,
    actualizarMisServicios,
    updateListInViewOffset,
  } = props;

  const [serviciosActivos, setServiciosActivos] = React.useState([
    ...misServicios,
  ]);
  const [listaServicios, setListaServicios] = React.useState();

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  /* COMPONENTDIDMOUNT */
  React.useEffect(() => {
    obtenerListaDeServicios();
  }, []);

  const obtenerListaDeServicios = () => {
    const errorGertingServices = {
      title: 'Services data not found',
      message: 'Try to reload',
    };

    let response = [];

    try {
      const keys = Object.keys(serviciosTodos);
      response = keys.map(item => {
        return {...serviciosTodos[item], key: item};
      });

      setListaServicios(response);
      setLoading(false);
    } catch (err) {
      setError(errorGertingServices);
      setLoading(false);
    }
  };

  /* ACTIVAR SERVICIO */
  const activarServicio = key => {
    if (serviciosActivos.includes(key)) {
      const index = serviciosActivos.indexOf(key);
      serviciosActivos.splice(index, 1);
    } else {
      serviciosActivos.push(key);
    }
    setServiciosActivos([...serviciosActivos]);
  };

  /* GO BACK */
  const goBack = () => {
    Navigation.pop(props.componentId, {
      component: {
        name: 'my-link.AddEditServices',
      },
    });
  };

  return (
    <View style={styles.mainContainer}>
      {/* HEADER */}
      <Header goBack={() => goBack()} />

      {loading && (
        <View>
          <Text style={{textAlign: 'center'}}>{'Loading...'}</Text>
        </View>
      )}

      {error && <ErrorOrNoData title={error.title} message={error.message} />}

      {!loading && !error && (
        <View style={{flex: 1}}>
          {/* ENCABEZADO CON MIS SERVICIOS */}
          <View style={styles.encabezadoMisServicios}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={listaServicios}
              renderItem={({item, index}) => (
                <View>
                  {serviciosActivos.includes(item.key) && (
                    <MiServicio
                      serviciosActivos={serviciosActivos}
                      item={item}
                      activarServicio={activarServicio}
                    />
                  )}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={styles.listaDeServicios}>
            <FlatList
              nestedScrollEnabled={true}
              data={listaServicios}
              ListHeaderComponent={
                <View style={styles.listHeader}>
                  <Text style={styles.listHeaderText}>
                    {'Selecciona tus servicios'}
                  </Text>
                </View>
              }
              renderItem={({item, index}) => (
                <Servicio
                  serviciosActivos={serviciosActivos}
                  item={item}
                  activarServicio={activarServicio}
                />
              )}
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.botonGuardar}
                  onPress={() => {
                    actualizarMisServicios(serviciosActivos);
                    goBack();
                  }}>
                  <Text style={styles.botonGuardarText}>{'Guardar'}</Text>
                </TouchableOpacity>
              }
              keyExtractor={(item, index) => index.toString()}
              stickyHeaderIndices={[0]}
              onMomentumScrollEnd={event => {
                const offsetY = event.nativeEvent.contentOffset.y;
                updateListInViewOffset(offsetY);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const Servicio = ({serviciosActivos, item, activarServicio}) => {
  return (
    <View style={styles.listaDeServiciosItem}>
      <View style={styles.servicioSeleccionado}>
        <Icon
          name="seen_arrow"
          size={25}
          factor={0.8}
          forceColor
          color={'white'}
          background={
            serviciosActivos.includes(item.key) ? Colors.pet : 'transparent'
          }
          onPress={() => activarServicio(item.key)}
        />
      </View>
      <Icon name={item.name} />
      <Text style={styles.listaDeServiciosText}>{item.service}</Text>
    </View>
  );
};

const MiServicio = ({serviciosActivos, item, activarServicio}) => {
  return (
    <View style={styles.misServiciosItem}>
      <Icon name={item.name} />
      <Text style={styles.misServiciosText}>{item.service}</Text>
      <View style={styles.misServiciosSeleccionado}>
        <Icon
          name="times"
          size={25}
          factor={0.8}
          forceColor
          color={Colors.gray}
          background={'white'}
          onPress={() => activarServicio(item.key)}
        />
      </View>
    </View>
  );
};

export default SeleccionarServicios;

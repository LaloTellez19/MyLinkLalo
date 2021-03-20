import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Header from '../../../../components/Header';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

import SeleccionarServicios from './SeleccionarServicios';

/* DATA */
import {misServiciosResponse} from '../../../../testData/dataAdmon';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  botonAgregar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.business,
    marginTop: 25,
    marginLeft: 65,
    marginRight: 65,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
  },
  botonAgregarText: {
    fontSize: 16,
    color: 'white',
  },
  /* ESTILOS MIS SERVICIOS */
  misServiciosEncabezado: {
    flex: 1,
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  misServiciosEncabezadoText: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    marginTop: 15,
    textAlign: 'center',
  },
  /* LISTA DE MIS SERVICIOS */
  listaMisServicios: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  listaMisServiciosItem: {
    alignItems: 'center',
    marginBottom: 15,
    width: width / 3,
  },
  listaMisServiciosText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    width: 80,
  },
  /* BOTON EDITAR SERVICIOS */
  botonEditarServicios: {
    height: 80,
    alignItems: 'center',
    paddingTop: 0,
  },
  botonEditarServiciosText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
});

/* ILUSTRACION NO HAY SERVICIOS */
// const ilustracion = require('../../../../ilustraciones/top.png');

/* Categorias de servicios */
import ServicesCategories from '../../ServicesCategories';

class Logic {
  constructor() {
    this.data = null;
    this.loading = true;
    this.error = null;
  }

  checkData(data) {
    if (!data.message) {
      this.data = data;
      this.loading = false;
      this.error = false;
    } else {
      this.loading = false;
      this.error = data;
    }
  }

  getData(item, year = false) {
    const dataPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.loading = true;
        let response = [];

        try {
          response = misServiciosResponse.data.servicios;
        } catch (error) {
          response = this.data;
        }

        if (response) {
          resolve(response);
          this.checkData(response);
        } else {
          const error = {
            title: 'Data not found',
            message: 'Try to reload',
          };
          reject(error);
          this.checkData(error);
        }
      }, 300);
    });

    return dataPromise;
  }

  getServicesList(data) {
    const dataPromise = new Promise((resolve, reject) => {
      this.loading = true;
      let response = [];

      try {
        const keys = Object.keys(data);
        response = keys.map(item => {
          return {...data[item], key: item};
        });
      } catch (error) {
        response = this.data;
      }

      if (response) {
        resolve(response);
        this.checkData(response);
      } else {
        const error = {
          title: 'Services data not found',
          message: 'Try to reload',
        };
        reject(error);
        this.checkData(error);
      }
    });

    return dataPromise;
  }

  updateServicesList(data) {
    const dataPromise = new Promise((resolve, reject) => {
      this.loading = true;
      let response = [];

      try {
        response = data;
      } catch (error) {
        response = this.data;
      }

      if (response) {
        resolve(response);
        this.checkData(response);
      } else {
        const error = {
          title: 'There was a problem processing the data',
          message: 'Try to reload',
        };
        reject(error);
        this.checkData(error);
      }
    });

    return dataPromise;
  }
}

function Servicios(props) {
  const {updateListInViewOffset, showOverlay} = props;
  const serviciosTodos = ServicesCategories.ES_MX;
  const ComponentLogic = new Logic();

  const [misServicios, setMisServicios] = React.useState([1]);
  const [verListaDeServicios, setVerListaDeServicios] = React.useState(false);

  const [loading, setLoading] = React.useState(ComponentLogic.loading);
  const [error, setError] = React.useState(ComponentLogic.error);

  /* COMPONENTDIDMOUNT */
  React.useEffect(() => {
    setLoading(ComponentLogic.loading);
    setError(ComponentLogic.error);

    ComponentLogic.getData()
      .then(items => {
        setMisServicios(items);
        setLoading(ComponentLogic.loading);
      })
      .catch(() => {
        setLoading(ComponentLogic.loading);
        setError(ComponentLogic.error);
      });
  }, []);

  /* ACTUALIZAR LISTA DE MIS SERVICIOS */
  const actualizarMisServicios = serviciosActualizados => {
    setLoading(ComponentLogic.loading);
    setError(ComponentLogic.error);

    ComponentLogic.updateServicesList(serviciosActualizados)
      .then(items => {
        setMisServicios(items);
        setLoading(ComponentLogic.loading);
        setVerListaDeServicios(false);
      })
      .catch(() => {
        setLoading(ComponentLogic.loading);
        setError(ComponentLogic.error);
      });
  };
  
  const goBack = () => {
    Navigation.dismissOverlay(props.componentId);
  };

  return (
    <View style={[styles.mainContainer, {marginTop: showOverlay ? 0 : 5}]}>
      {showOverlay && <Header goBack={() => goBack()} />}

      {loading && (
        <View>
          <Text style={{textAlign: 'center'}}>{'Loading...'}</Text>
        </View>
      )}

      {error && <ErrorOrNoData title={error.title} message={error.message} />}

      {/* CONTENT */}
      {!loading && !error && !verListaDeServicios && (
        <View style={{flex: 1}}>
          {misServicios.length === 0 && (
            <ErrorOrNoData
              ilustration={false}
              title={'Aún no tienes servicios'}
              message={
                '¡Selecciona el ícono "Agregar" y agrega tus servicios!'
              }>
              <View style={styles.botonEditarServicios}>
                <Icon
                  name="pencil"
                  size={45}
                  factor={0.8}
                  forceColor
                  color={Colors.gray}
                  onPress={() => setVerListaDeServicios(true)}
                />
                <Text style={styles.botonEditarServiciosText}>{'Agregar'}</Text>
              </View>
            </ErrorOrNoData>
          )}

          {misServicios.length > 0 && (
            <View style={styles.listaMisServicios}>
              <FlatList
                nestedScrollEnabled={true}
                numColumns={3}
                data={misServicios}
                ListHeaderComponent={
                  <View style={styles.misServiciosEncabezado}>
                    <Text style={styles.misServiciosEncabezadoText}>
                      {'Listado de Servicios'}
                    </Text>
                  </View>
                }
                renderItem={({item}) => (
                  <View style={styles.listaMisServiciosItem}>
                    <Icon name={serviciosTodos[item].icon} />
                    <Text style={styles.listaMisServiciosText}>
                      {serviciosTodos[item].service}
                    </Text>
                  </View>
                )}
                ListFooterComponent={
                  <View>
                    {!showOverlay && (
                      <View style={styles.botonEditarServicios}>
                        {/* BOTON EDITAR SERVICIOS */}
                        <Icon
                          name="pencil"
                          size={45}
                          factor={0.8}
                          forceColor
                          color={Colors.gray}
                          onPress={() => setVerListaDeServicios(true)}
                        />
                        <Text style={styles.botonEditarServiciosText}>
                          {'Editar'}
                        </Text>
                      </View>
                    )}
                  </View>
                }
                keyExtractor={(item, index) => index.toString()}
                stickyHeaderIndices={[0]}
                onMomentumScrollEnd={event => {
                  const offsetY = event.nativeEvent.contentOffset.y;
                  if (updateListInViewOffset) {
                    updateListInViewOffset(offsetY);
                  }
                }}
              />
            </View>
          )}
        </View>
      )}

      {verListaDeServicios && (
        <SeleccionarServicios
          ComponentLogic={ComponentLogic}
          misServicios={misServicios}
          serviciosTodos={serviciosTodos}
          actualizarMisServicios={actualizarMisServicios}
          updateListInViewOffset={updateListInViewOffset}
        />
      )}
    </View>
  );
}

export default Servicios;

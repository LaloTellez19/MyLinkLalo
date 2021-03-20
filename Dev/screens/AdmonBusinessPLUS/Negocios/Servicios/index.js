import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Loading from '../../../../components/Loading';
import Header from '../../../../components/Header';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

/* DATA */
import {misServiciosResponse} from '../../../../testData/dataAdmon';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
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
    // borderBottomWidth: 0.5,
    // borderColor: Colors.gray,
  },
  misServiciosEncabezadoText: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    marginTop: 0,
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
    marginTop: 10,
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
  addServicesButton: {
    width: width / 2,
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.business,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  addServicesButtonText: {
    width: (width / 2) * 0.5,
    fontSize: 16,
    color: 'white',
  },
});

/* ILUSTRACION NO HAY SERVICIOS */
// const ilustracion = require('../../../../ilustraciones/top.png');

/* Categorias de servicios */
import ServicesCategories from '../../ServicesCategories';

class Servicios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      misServicios: [1],
      verListaDeServicios: false,
      loading: true,
      error: null,
    };

    this.serviciosTodos = ServicesCategories.ES_MX;

    this.actualizarMisServicios = this.actualizarMisServicios.bind(this);
    this.setVerListaDeServicios = this.setVerListaDeServicios.bind(this);
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    const response = misServiciosResponse.data.servicios;

    if (response) {
      this.setState({
        misServicios: response,
        loading: false,
      });
    } else {
      this.setState({
        error: errorGettingData,
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.getData();
  }

  /* ACTUALIZAR LISTA DE MIS SERVICIOS */
  actualizarMisServicios = serviciosActualizados => {
    const errorUpdating = {
      title: 'There was a problem processing the data',
      message: 'Try to reload',
    };

    try {
      this.setState({
        misServicios: serviciosActualizados,
        verListaDeServicios: false,
      });
    } catch (err) {
      this.setState({
        error: errorUpdating,
      });
    }
  };
  
  setVerListaDeServicios = value => {
    this.setState({verListaDeServicios: value});
  };

  /* GO TO ADD EDIT SERVICES */
  goToAddEditServices = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'my-link.AddEditServices',
        passProps: {
          misServicios: this.state.misServicios,
          serviciosTodos: this.serviciosTodos,
          actualizarMisServicios: this.actualizarMisServicios,
          updateListInViewOffset: this.props.updateListInViewOffset,
          componentId: this.props.componentId,
        },
      },
    });
  };

  goBack = () => {
    Navigation.dismissOverlay(this.props.componentId);
  };

  render() {
    const {loading, error, verListaDeServicios, misServicios} = this.state;
    const {updateListInViewOffset, showOverlay, data} = this.props;

    const vip = data ? data.vip === 1 : false;
    const vipDark = data ? data.vip === 2 : false;

    const backgroundColor = vipDark
      ? {backgroundColor: 'black'}
      : {backgroundColor: 'white'};

    const backgroundColor_2 = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.grayLight}
      : {color: Colors.defaultTextColor};

    const textColor_2 = vipDark
      ? {color: Colors.silverMetallic}
      : {color: Colors.defaultTextColor};

    const textColor_3 = vipDark
      ? {color: 'white'}
      : {color: Colors.defaultTextColor};

    return (
      <View style={styles.mainContainer}>
        {showOverlay && (
          <Header
            goBack={() => this.goBack()}
            color={vipDark ? 'black' : 'white'}
          />
        )}

        {loading && <Loading />}

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
                {!showOverlay && (
                  <AddServicesButton
                    goToAddEditServices={this.goToAddEditServices}
                  />
                )}
              </ErrorOrNoData>
            )}

            {misServicios.length > 0 && (
              <View style={[styles.listaMisServicios, backgroundColor_2]}>
                <FlatList
                  nestedScrollEnabled={true}
                  numColumns={3}
                  data={misServicios}
                  ListHeaderComponent={
                    <View
                      style={[styles.misServiciosEncabezado, backgroundColor]}>
                      <Text
                        style={[styles.misServiciosEncabezadoText, textColor]}>
                        {'Listado de Servicios'}
                      </Text>
                    </View>
                  }
                  renderItem={({item}) => (
                    <View style={styles.listaMisServiciosItem}>
                      <Icon name={this.serviciosTodos[item].icon} />
                      <Text style={[styles.listaMisServiciosText, textColor_2]}>
                        {this.serviciosTodos[item].service}
                      </Text>
                    </View>
                  )}
                  ListFooterComponent={
                    <View>
                      {!showOverlay && (
                        <AddServicesButton
                          goToAddEditServices={this.goToAddEditServices}
                        />
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

        {/* {verListaDeServicios && (
          <SeleccionarServicios
            misServicios={misServicios}
            serviciosTodos={this.serviciosTodos}
            actualizarMisServicios={this.actualizarMisServicios}
            updateListInViewOffset={updateListInViewOffset}
          />
        )} */}
      </View>
    );
  }
}

const AddServicesButton = ({goToAddEditServices}) => {
  return (
    <TouchableOpacity
      style={styles.addServicesButton}
      onPress={() => goToAddEditServices()}>
      {/* BOTON EDITAR SERVICIOS */}
      <Icon
        name="plus"
        size={40}
        factor={0.7}
        forceColor
        color={'white'}
        Borderless
      />
      <Text style={styles.addServicesButtonText}>{'Agregar'}</Text>
    </TouchableOpacity>
  );
};

export default Servicios;

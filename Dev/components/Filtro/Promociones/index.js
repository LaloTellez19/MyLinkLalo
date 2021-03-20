import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Icon from '../../../components/Icon';
import Text from '../../../components/Text';
import CalendarioPicker from '../../../components/CalendarioPicker';
import Loading from '../../../components/Loading';
import ErrorOrNoData from '../../../components/ErrorOrNoData';

/* DATA */
import {promocionesResponse} from '../../../testData/dataAdmon';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: width,
    backgroundColor: 'white',
  },
  /* CALENDAR STYLES */
  calendar: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  listaPromociones: {
    width: width,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10,
  },
  listaPromocionesItem: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: Colors.gray,
    borderWidth: 0.5,
  },
  listaPromocionesImagen: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 5,
  },
  listaPromocionesContent: {
    width: 200,
    marginLeft: 15,
    color: Colors.defaultTextColor,
  },
  listaPromocionesTitle: {
    fontSize: 18,
    color: Colors.defaultTextColor,
  },
  listaPromocionesMessage: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  listaPromocionesPeriod: {
    marginTop: 5,
    fontSize: 16,
    color: Colors.business,
  },
  listaPromocionesIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

class Promociones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaPromociones: [],
      itemSelected: {},
      loading: true,
      error: null,
    };

    this.menuMonths = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    this.seleccionarPromociones = this.seleccionarPromociones.bind(this);
    this.handleItemSelection = this.handleItemSelection.bind(this);
  }

  getData = date => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try with another date or try to reload',
    };

    const response = promocionesResponse.data.promociones[date.toLowerCase()];

    if (response) {
      this.setState({
        listaPromociones: response,
        loading: false,
        error: null,
      });
    } else {
      this.setState({
        error: errorGettingData,
        loading: false,
      });
    }
  };

  /* SELECCIONAR LISTA DE PROMOCIONS AÑO / MES */
  seleccionarPromociones = date => {
    const month = this.menuMonths[date.getMonth()];
    this.getData(month);
  };

  /* HANDLE ITEM SELECTION */
  handleItemSelection = item => {
    this.setState({itemSelected: item});
  };

  render() {
    const {listaPromociones, loading, error} = this.state;
    const {updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        {/* PICKER MES / AÑO */}
        <View style={styles.calendar}>
          <CalendarioPicker
            obtnerItemCalendario={this.seleccionarPromociones}
            newPicker
          />
        </View>

        {loading && <Loading />}

        {error && <ErrorOrNoData title={error.title} message={error.message} />}

        {/* LISTA DE PROMOCIONES */}
        {!loading && !error && (
          <View style={styles.listaPromociones}>
            <FlatList
              nestedScrollEnabled={true}
              data={listaPromociones}
              renderItem={({item, index}) => (
                <Promocion
                  item={{...item, index}}
                  handleItemSelection={this.handleItemSelection}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
              onMomentumScrollEnd={event => {
                const offsetY = event.nativeEvent.contentOffset.y;
                updateListInViewOffset(offsetY);
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const Promocion = ({item, handleItemSelection}) => {
  return (
    <TouchableOpacity
      style={styles.listaPromocionesItem}
      onPress={() => handleItemSelection(item)}
      activeOpacity={0.5}>
      {/* IMAGEN PROMOCION */}
      <Image style={styles.listaPromocionesImagen} source={{uri: item.image}} />
      {/* CONTENIDO PROMOCION */}
      <View style={styles.listaPromocionesContent}>
        <Text style={styles.listaPromocionesTitle}>{item.title}</Text>
        <Text style={styles.listaPromocionesMessage} numberOfLines={1}>
          {item.message}
        </Text>
        <Text style={styles.listaPromocionesPeriod}>{item.period}</Text>
      </View>
      <View style={styles.listaPromocionesIcon}>
        <Icon
          name="brand"
          size={35}
          background={Colors.business}
          forceColor
          color={'white'}
        />
      </View>
    </TouchableOpacity>
  );
};
export default Promociones;

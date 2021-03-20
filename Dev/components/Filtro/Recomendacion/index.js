import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/Text';
import CalendarioPicker from '../../../components/CalendarioPicker';
import UserImage from '../../../components/UserImage';
import LugarHoraFecha from '../../../components/LugarHoraFecha';
import Loading from '../../../components/Loading';
import ErrorOrNoData from '../../../components/ErrorOrNoData';

/* DATA */
import {recomendacionesData} from '../../../testData/dataAdmon';

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
  listaRecomendaciones: {
    width: width,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10,
  },
  listaRecomendacionesItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  userImageContainer: {
    marginLeft: 5,
  },
  listaRecomendacionesInfo: {
    marginLeft: 25,
    marginTop: 5,
  },
  listaRecomendacionesUserName: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  listaRecomendacionesRecomiendoContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  listaRecomendacionesRecomiendo: {
    fontSize: 15,
    color: Colors.grayBold,
  },
  listaRecomendacionesMsg: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
});

class Recomendacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaRecomendaciones: [],
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

    this.seleccionarRecomendaciones = this.seleccionarRecomendaciones.bind(this);
    this.handleItemSelection = this.handleItemSelection.bind(this);
  }

  getData = date => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try with another date or try to reload',
    };

    const response =
      recomendacionesData.data.recomendaciones[date.toLowerCase()];

    if (response.length) {
      this.setState({
        listaRecomendaciones: response,
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

  seleccionarRecomendaciones = date => {
    const month = this.menuMonths[date.getMonth()];
    this.getData(month);
  };

  /* HANDLE ITEM SELECTION */
  handleItemSelection = item => {
    this.setState({
      itemSelected: item,
    });
  };

  render() {
    const {loading, error, listaRecomendaciones} = this.state;
    const {updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        {/* PICKER MES / AÑO */}
        <View style={styles.calendar}>
          <CalendarioPicker
            obtnerItemCalendario={this.seleccionarRecomendaciones}
            newPicker
          />
        </View>

        {loading && <Loading />}

        {error && <ErrorOrNoData title={error.title} message={error.message} />}

        {/* LISTA DE RECOMENDACIONES */}
        {!loading && !error && (
          <View style={styles.listaRecomendaciones}>
            <FlatList
              nestedScrollEnabled={true}
              data={listaRecomendaciones}
              renderItem={({item, index}) => (
                <RecomendacionItem
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

const RecomendacionItem = ({item, handleItemSelection}) => {
  return (
    <TouchableOpacity
      style={styles.listaRecomendacionesItem}
      onPress={() => handleItemSelection(item)}
      activeOpacity={0.5}>
      {/* USER IMAGE */}
      <View style={styles.userImageContainer}>
        <UserImage link={item.link} />
      </View>

      {/* RECOMENDATION INFO */}
      <View style={styles.listaRecomendacionesInfo}>
        {/* USER NAME */}
        <Text style={styles.listaRecomendacionesUserName}>{`${
          item.nombre
        } ${item.apellido_paterno || ''}`}</Text>

        {/* RECOMENDATION MESSAGE */}
        <View style={styles.listaRecomendacionesRecomiendoContainer}>
          <Text style={styles.listaRecomendacionesRecomiendo}>
            {'Les recomiendo'}
          </Text>
          <Text style={styles.listaRecomendacionesMsg}>{item.message}</Text>
        </View>

        {/* RECOMENDATION DETAILS */}
        <LugarHoraFecha item={item} />
      </View>
    </TouchableOpacity>
  );
};

export default Recomendacion;

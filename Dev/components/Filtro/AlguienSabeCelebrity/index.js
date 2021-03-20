import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/Text';
import Icon from '../../../components/Icon';
import UserImage from '../../../components/UserImage';
import LugarHoraFecha from '../../../components/LugarHoraFecha';
import ErrorOrNoData from '../../../components/ErrorOrNoData';

/* DATA */
import {alguienSabeResponse} from '../../../testData/dataAdmon';

const width = Layout.window.width;


/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    marginTop: 0,
  },
  /* ESTILOS MENSAJE HEADER */
  encabezado: {
    marginTop: 15,
    paddingRight: 50,
    paddingLeft: 50,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 5,
    borderColor: Colors.gray,
  },
  encabezadoMyBusiness: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  iconMedio: {
    position: 'absolute',
    elevation: 2,
    top: -3,
    right: 20,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 100,
  },
  encabezadoTipo: {
    fontSize: 18,
    color: Colors.defaultTextColor,
  },

  encabezadoMensaje: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  /* ESTILOS LISTA DE MENSAJES */
  listaMensajes: {
    width: width,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  listaMensajesItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5,
    borderColor: Colors.gray,
    borderBottomWidth: 0.5,
    width: width,
  },
  listaMensajesUserImage: {
    marginLeft: 5,
  },
  listaMensajesContent: {
    width: width / 1.8,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 20,
    color: Colors.defaultTextColor,
  },
  listaMensajesTitle: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  listaMensajesMessage: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  verMensaje: {
    fontSize: 12,
    color: Colors.personal,
  },
});

class AlguienSabeCelebrity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alguienSabeData: false,
      itemSelected: {},
      loading: true,
      error: null,
    };

    this.handleItemSelection = this.handleItemSelection.bind(this);
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    const response = alguienSabeResponse.data;

    if (response) {
      this.setState({
        alguienSabeData: response,
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

  /* HANDLE ITEM SELECTION */
  handleItemSelection = item => {
    this.setState({
      itemSelected: item,
    });
    console.log('item: ', item);
  };

  render() {
    const {alguienSabeData, itemSelected, loading, error} = this.state;
    const {updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        {loading && (
          <View>
            <Text style={{textAlign: 'center'}}>{'Loading...'}</Text>
          </View>
        )}

        {error && <ErrorOrNoData title={error.title} message={error.message} />}

        {!loading && !error && (
          <View style={styles.listaMensajes}>
            <FlatList
              nestedScrollEnabled={true}
              data={alguienSabeResponse.data.preguntas}
              ListHeaderComponent={
                <View style={styles.encabezado}>
                  <View style={styles.encabezadoMyBusiness}>
                    <Icon
                      name= 'personal_favorite'
                      factor={0.9} 
                      forceColor color={'white'} 
                      background={Colors.gray}                      
                    />
                    <View style={{marginLeft: 15}}>
                      <Text style={styles.encabezadoTipo}>
                        {"Comediante"}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.encabezadoMensaje}>
                    {
                      'Las preguntas hechas por usuarios que buscan información sobre ti.'
                    }
                  </Text>
                </View>
              }
              renderItem={({item, index}) => (
                <Mensaje
                  item={{...item, index}}
                  handleItemSelection={this.handleItemSelection}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
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

const Mensaje = ({item, handleItemSelection}) => {
  return (
    <View style={styles.listaMensajesItem}>
      {/* IMAGEN USUARIO */}
      <View style={styles.listaMensajesUserImage}>
        <UserImage link={item.link} userSize={55} />
      </View>

      {/* CONTENIDO MENSAJE */}
      <View style={styles.listaMensajesContent}>
        <Text style={styles.listaMensajesTitle}>{`${item.nombre} ${
          item.apellido_paterno
        }`}</Text>
        <Text style={styles.listaMensajesMessage} numberOfLines={1}>
          {item.message}
        </Text>

        {/* DATOS FECHA, HORA, LUGAR */}
        <LugarHoraFecha location={item.location} date={item.date} />
      </View>

      {/* MOSTRAR MAS / MENOS */}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          handleItemSelection(item);
        }}>
        <Text style={styles.verMensaje}>{'...más'}</Text>
      </TouchableOpacity>
    </View>
  );
};



export default AlguienSabeCelebrity;
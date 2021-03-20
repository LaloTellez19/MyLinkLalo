import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Text from '../../../../components/Text';
import UserImage from '../../../../components/UserImage';
import UsersArray from '../../../../components/UsersArray';
import MenuTabs from '../../../../components/MenuTabs';
import Loading from '../../../../components/Loading';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

import Summary from './Summary';

/* DATA */
import {distincionesResponse} from '../../../../testData/dataAdmon';

const width = Layout.window.width;
const height = Layout.window.height - 63 - 73;
const distincionesItemHeight = 70;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: '100%',
  },
  /* LIST STYLES */
  listContainer: {
    width: '100%',
    height: height,
    backgroundColor: 'white',
  },
  listHeader: {
    flex: 1,
    width: '100%',
    height: 40,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    backgroundColor: 'white',
  },
  list: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  listaMisDistincionesItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: distincionesItemHeight,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  distincionesItemImagen: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  distincionesItemImagenText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  distincionesItemTextContainer: {
    width: width / 1.5,
    marginLeft: 15,
  },
  distincionesItemText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  usersArray: {
    height: '100%',
    marginTop: 25,
  },
  /* ESTILOS ARREGLO DE DISTINCIONES*/
  arregloDistinciones: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 20,
  },
  arregloImageContainer: {
    position: 'absolute',
    height: 40,
    width: 40,
    elevation: 1,
    borderRadius: 100,
  },
  arregloImage: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 100,
  },
});

const path = '../../../../assets/illust/compliments/';
const defaultImage = 'https://i.picsum.photos/id/179/200/200.jpg';

/* ILUSTRACIONES */
const distincionesInfo = {
  rapido: {
    ilustracion: require(`${path}rapido.png`),
    distincion: 'Rapido',
    descripcion: 'Distinción Rapido',
  },
  buen_precio: {
    ilustracion: require(`${path}buen_precio.png`),
    distincion: 'Buen Precio',
    descripcion: 'Distinción Buen Precio',
  },
  limpio: {
    ilustracion: require(`${path}limpio.png`),
    distincion: 'Limpio',
    descripcion: 'Distinción Limpio',
  },
  saludable: {
    ilustracion: require(`${path}saludable.png`),
    distincion: 'Saludable',
    descripcion: 'Distinción Saludable',
  },
  honesto: {
    ilustracion: require(`${path}honesto.png`),
    distincion: 'Honesto',
    descripcion: 'Distinción Honesto',
  },
  puntual: {
    ilustracion: require(`${path}puntual.png`),
    distincion: 'Puntual',
    descripcion: 'Distinción Puntual',
  },
  amable: {
    ilustracion: require(`${path}amable.png`),
    distincion: 'Amable',
    descripcion: 'Distinción Amable',
  },
  legendario: {
    ilustracion: require(`${path}legendario.png`),
    distincion: 'Legendario',
    descripcion: 'Distinción Legendario',
  },
};

const comparar = (a, b) => {
  if (a.total > b.total) {
    return -1;
  } else if (a.total < b.total) {
    return 1;
  } else {
    return 0;
  }
};

class Distinciones extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seleccionVista: 1,
      datosVistaContacto: [],
      datosVistaDistincion: [],
      loading: true,
      errorContactView: null,
      errorComplimentsView: null,
      scrollEnabled: true,
    };

    this.list = React.createRef(null);

    this.menu = ['Vista distinción', 'Vista contacto'];
    this.setSeleccionVista = this.setSeleccionVista.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    const response = distincionesResponse.data.distinciones;

    if (response) {
      this.setState({
        datosVistaContacto: response,
        loading: false,
      });
      this.getComplimentsData(distincionesInfo, response);
    } else {
      this.setState({
        errorContactView: errorGettingData,
        loading: false,
      });
    }
  };

  getComplimentsData = (complimentsDetails, data) => {
    const keys = Object.keys(complimentsDetails);
    const countForComplimentView = {
      rapido: {
        total: 0,
        users: [],
      },
      buen_precio: {
        total: 0,
        users: [],
      },
      limpio: {
        total: 0,
        users: [],
      },
      saludable: {
        total: 0,
        users: [],
      },
      honesto: {
        total: 0,
        users: [],
      },
      puntual: {
        total: 0,
        users: [],
      },
      amable: {
        total: 0,
        users: [],
      },
      legendario: {
        total: 0,
        users: [],
      },
    };

    try {
      data.map((item, index) => {
        item.compliments.map(dist => {
          countForComplimentView[dist].users.push(data[index]);
          countForComplimentView[dist].total =
            countForComplimentView[dist].users.length;
        });
      });

      const countResult = keys.map(key => {
        return {key, ...countForComplimentView[key]};
      });
      this.setState({datosVistaDistincion: countResult.sort(comparar)});
    } catch (error) {
      const err = {
        title: 'There was a problem processing the data',
        message: 'Try to reload',
      };
      this.setState({errorComplimentsView: err});
    }
  };

  componentDidMount() {
    this.getData();
  }

  setSeleccionVista = selection => {
    this.setState({
      seleccionVista: selection,
    });
  };

  onScroll = offsetY => {
    const needsScroll =
      this.list.current.props.data.length * distincionesItemHeight > height;

    if (offsetY >= 150 && needsScroll) {
      if (this.state.scrollEnabled) {
        this.setState({
          scrollEnabled: false,
        });
      }
    } else {
      this.setState({
        scrollEnabled: true,
      });
    }
  };

  render() {
    const {
      loading,
      errorContactView,
      errorComplimentsView,
      seleccionVista,
      datosVistaDistincion,
      datosVistaContacto,
      scrollEnabled,
    } = this.state;
    const {updateListInViewOffset} = this.props;

    return (
      <SafeAreaView style={styles.mainContainer}>
        {loading && <Loading />}

        {errorContactView && (
          <ErrorOrNoData
            title={errorContactView.title}
            message={errorContactView.message}
          />
        )}

        {errorComplimentsView && seleccionVista === 0 && (
          <ErrorOrNoData
            title={errorComplimentsView.title}
            message={errorComplimentsView.message}
          />
        )}

        {!loading && !errorContactView && (
          <ScrollView
            nestedScrollEnabled={true}
            scrollEnabled={scrollEnabled}
            onScroll={event => {
              const offsetY = event.nativeEvent.contentOffset.y;
              console.log('offsetY: ', offsetY);
              this.onScroll(offsetY);
            }}
            onMomentumScrollEnd={event => {
              const offsetY = event.nativeEvent.contentOffset.y;
              updateListInViewOffset(offsetY);
            }}>
            {datosVistaDistincion.length > 0 && (
              <Summary
                distincionesInfo={distincionesInfo}
                datosVistaDistincion={datosVistaDistincion}
              />
            )}
            <View style={styles.listContainer}>
              <FlatList
                ref={this.list}
                nestedScrollEnabled={true}
                scrollEnabled={!scrollEnabled}
                data={
                  seleccionVista === 0
                    ? datosVistaDistincion
                    : datosVistaContacto
                }
                ListHeaderComponent={
                  <View style={styles.listHeader}>
                    <MenuTabs
                      opciones={this.menu}
                      seleccion={seleccionVista}
                      seleccionar={this.setSeleccionVista}
                      fontSize={14}
                    />
                  </View>
                }
                renderItem={({item}) => (
                  <View>
                    {seleccionVista === 0 ? (
                      <ItemVistaCumplido item={item} />
                    ) : (
                      <ItemVistaContacto item={item} />
                    )}
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}
                stickyHeaderIndices={[0]}
              />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}

const ItemVistaCumplido = ({item}) => {
  if (item.total !== 0) {
    return (
      <View style={styles.listaMisDistincionesItem}>
        {/* IMAGEN */}
        <View style={styles.distincionesItemImagen}>
          <Image
            style={{width: 45, height: 45}}
            source={
              distincionesInfo[item.key].ilustracion || {
                uri: defaultImage,
              }
            }
          />
          <Text style={styles.distincionesItemImagenText}>
            {distincionesInfo[item.key].distincion}
          </Text>
        </View>
        {/* TEXTO */}
        <View style={styles.distincionesItemTextContainer}>
          <Text
            style={[
              styles.distincionesItemText,
              {fontSize: 20, marginLeft: width / 5},
            ]}>
            {item.total}
          </Text>
        </View>
        {/* ARREGLO DE IMAGENES */}
        <View style={styles.usersArray}>
          <UsersArray users={item.users.slice(0, 3)} />
        </View>
      </View>
    );
  }
};

const ItemVistaContacto = ({item}) => {
  return (
    <View style={styles.listaMisDistincionesItem}>
      {/* IMAGEN */}
      <View style={styles.distincionesItemImagen}>
        <UserImage link={item.link} />
      </View>
      {/* TEXTO */}
      <View style={styles.distincionesItemTextContainer}>
        <Text style={styles.distincionesItemText}>{`${item.nombre} ${
          item.apellido_paterno
        }`}</Text>
      </View>
      {/* ARREGLO DE IMAGENES */}
      <View>
        <DistincionesArray
          distincionesMenu={distincionesInfo}
          distinciones={item.compliments.slice(0, 3)}
        />
      </View>
    </View>
  );
};

const DistincionesArray = ({distincionesMenu, distinciones}) => {
  const positions = [55, 35, 15];
  return (
    <View style={styles.arregloDistinciones}>
      {distinciones.map((item, index) => {
        return (
          <View
            style={[styles.arregloImageContainer, {right: positions[index]}]}
            key={index}>
            <Image
              style={styles.arregloImage}
              source={
                distincionesMenu[distinciones[index]].ilustracion || {
                  uri: defaultImage,
                }
              }
            />
          </View>
        );
      })}
    </View>
  );
};

export default Distinciones;

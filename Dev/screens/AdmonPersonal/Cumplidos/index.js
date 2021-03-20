import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';

import ViewPager from '@react-native-community/viewpager';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/Text';
import Icon from '../../../components/Icon';
import UserImage from '../../../components/UserImage';
import UsersArray from '../../../components/UsersArray';
import MenuTabs from '../../../components/MenuTabs';
import Loading from '../../../components/Loading';
import ErrorOrNoData from '../../../components/ErrorOrNoData';

import CumplidosResumen from './CumplidosResumen';

/* DATA */
import {cumplidosResponse} from '../../../testData/dataAdmon';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: '100%',
  },
  viewPager: {
    width: width,
  },
  /* LIST STYLES */
  listContainer: {
    width: '100%',
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
    height: 70,
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
  /* MODAL DETAILS STYLES */
  details: {
    width: width / 1.2,
    height: height / 1.3,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 130,
    overflow: 'hidden',
  },
  detailsHeader: {
    width: '100%',
    height: '23%',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  complimentSelected: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  complimentSelectedImg: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  complimentSelectedText: {
    width: 150,
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 5,
    textAlign: 'center',
  },
  detailsHeaderIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  fullList: {
    width: '100%',
    height: '77%',
  },
  detailsElement: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  detailsElementText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginLeft: 10,
  },
  /* NO COMPLIMENTS STYLES */
  noCompliments: {
    width: '65%',
    alignSelf: 'center',
    marginTop: 60,
  },
  noComplimentsText: {
    fontSize: 20,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
});

const path = '../../../assets/illust/compliments/';
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

class Cumplidos extends React.Component {
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
      itemSelected: {},
      modalVisible: false,
    };

    this.menu = ['Vista cumplido', 'Vista contacto'];
    this.viewPager = React.createRef(null);

    this.setSeleccionVista = this.setSeleccionVista.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.getName = this.getName.bind(this);
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    const response = cumplidosResponse.data.cumplidos;

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
    console.log('heightFactor:', this.props.heightFactor);
  }

  setSeleccionVista = selection => {
    this.setState({
      seleccionVista: selection,
      itemSelected: {},
      modalVisible: false,
    });
    this.viewPager.current.setPage(selection);
  };

  showDetails = (show, item) => {
    this.setState({
      itemSelected: item,
      modalVisible: show,
    });
  };

  getName = (names, lastNames) => {
    const tenmpName = [names];
    const tempLastname = [lastNames];
    const name = tenmpName.concat(tempLastname);
    const finalName = name.filter(item => item !== '');
    return finalName.join(' ');
  };

  onScroll = offsetY => {
    if (offsetY >= 218) {
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
      modalVisible,
      itemSelected,
    } = this.state;
    const {updateListInViewOffset, heightFactor, vipDark} = this.props;

    const factor = heightFactor ? heightFactor : 68;
    const listHeight = height - 63 - factor;

    const viewPagerFactor = heightFactor ? heightFactor : 73;
    const viewPagerHeight = height - 63 - viewPagerFactor;

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
              this.onScroll(offsetY);
            }}
            onMomentumScrollEnd={event => {
              const offsetY = event.nativeEvent.contentOffset.y;
              if (updateListInViewOffset) {
                updateListInViewOffset(offsetY);
              }
            }}>
            <CumplidosResumen
              datosVistaDistincion={datosVistaDistincion}
              distincionesInfo={distincionesInfo}
              vipDark={vipDark}
            />

            <ViewPager
              ref={this.viewPager}
              style={[styles.viewPager, {height: viewPagerHeight}]}
              initialPage={0}
              onPageSelected={PageSelectedEvent => {
                this.setState({
                  seleccionVista: PageSelectedEvent.nativeEvent.position,
                  itemSelected: {},
                  modalVisible: false,
                });
              }}>
              <View key="1">
                <ItemsList
                  data={datosVistaDistincion}
                  listHeight={listHeight}
                  scrollEnabled={scrollEnabled}
                  seleccionVista={seleccionVista}
                  vipDark={vipDark}
                  colors={[backgroundColor, backgroundColor_2, textColor_3]}
                  showDetails={this.showDetails}
                  getName={this.getName}
                  menu={this.menu}
                  setSeleccionVista={this.setSeleccionVista}
                  complimentsView={true}
                />
              </View>
              <View key="2">
                <ItemsList
                  data={datosVistaContacto}
                  listHeight={listHeight}
                  scrollEnabled={scrollEnabled}
                  seleccionVista={seleccionVista}
                  vipDark={vipDark}
                  colors={[backgroundColor, backgroundColor_2, textColor_3]}
                  showDetails={this.showDetails}
                  getName={this.getName}
                  menu={this.menu}
                  setSeleccionVista={this.setSeleccionVista}
                  complimentsView={false}
                />
              </View>
            </ViewPager>

            {/* DETAILS MODAL */}
            <Details
              modalVisible={modalVisible}
              itemSelected={itemSelected}
              showDetails={this.showDetails}
              getName={this.getName}
              backgroundColors={[backgroundColor, backgroundColor_2]}
              textColors={[textColor, textColor_3]}
              vipDark={vipDark}
            />
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}

const ItemsList = ({
  data,
  listHeight,
  scrollEnabled,
  seleccionVista,
  vipDark,
  colors,
  showDetails,
  getName,
  menu,
  setSeleccionVista,
  complimentsView,
}) => {
  const renderItem = item => {
    if (complimentsView) {
      return (
        <ItemVistaCumplido
          item={item}
          showDetails={showDetails}
          textColor={colors[2]}
        />
      );
    } else {
      return (
        <ItemVistaContacto
          item={item}
          showDetails={showDetails}
          getName={getName}
          textColor={colors[2]}
        />
      );
    }
  };

  return (
    <View style={[styles.listContainer, {height: listHeight}]}>
      {data.length > 0 && (
        <FlatList
          nestedScrollEnabled={true}
          scrollEnabled={!scrollEnabled}
          data={data}
          ListHeaderComponent={
            <View style={[styles.listHeader, colors[1]]}>
              <MenuTabs
                opciones={menu}
                seleccion={seleccionVista}
                seleccionar={setSeleccionVista}
                fontSize={14}
                personal={!vipDark}
                textColor={vipDark ? Colors.silverMetallic : false}
              />
            </View>
          }
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          style={[styles.list, colors[0]]}
          stickyHeaderIndices={[0]}
        />
      )}
      {data.length === 0 && (
        <View style={styles.noCompliments}>
          <Text style={styles.noComplimentsText}>
            {
              'Ánimo, pronto llegarán tus cumplidos y así podrás saber porqué te prefieren.'
            }
          </Text>
        </View>
      )}
    </View>
  );
};

const ItemVistaCumplido = ({item, showDetails, textColor}) => {
  try {
    return (
      <TouchableOpacity
        style={styles.listaMisDistincionesItem}
        onPress={() => showDetails(true, item)}>
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
          <Text style={[styles.distincionesItemImagenText, textColor]}>
            {distincionesInfo[item.key].distincion}
          </Text>
        </View>
        {/* TEXTO */}
        <View style={styles.distincionesItemTextContainer}>
          <Text
            style={[
              styles.distincionesItemText,
              {fontSize: 20, marginLeft: width / 5},
              textColor,
            ]}>
            {item.total}
          </Text>
        </View>
        {/* ARREGLO DE IMAGENES */}
        <View style={styles.usersArray}>
          <UsersArray users={item.users.slice(0, 3)} />
        </View>
      </TouchableOpacity>
    );
  } catch (error) {
    return <View />;
  }
};

const ItemVistaContacto = ({item, showDetails, getName, textColor}) => {
  return (
    <View style={styles.listaMisDistincionesItem}>
      {/* IMAGEN */}
      <View style={styles.distincionesItemImagen}>
        <UserImage link={item.link} />
      </View>
      {/* TEXTO */}
      <View style={styles.distincionesItemTextContainer}>
        <Text style={[styles.distincionesItemText, textColor]}>
          {getName(item.nombre, item.apellido_paterno)}
        </Text>
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

const Details = ({
  modalVisible,
  itemSelected,
  showDetails,
  getName,
  backgroundColors,
  textColors,
  vipDark,
}) => {
  const renderItem = (element, users) => {
    if (users) {
      return (
        <View style={styles.detailsElement}>
          <UserImage link={element.link} userSize={45} />
          <Text style={[styles.detailsElementText, textColors[1]]}>
            {getName(element.nombre, element.apellido_paterno)}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.detailsElement}>
          <Image
            style={{width: 45, height: 45}}
            source={
              distincionesInfo[element].ilustracion || {
                uri: defaultImage,
              }
            }
          />
          <Text style={styles.detailsElementText}>
            {distincionesInfo[element].distincion}
          </Text>
        </View>
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        showDetails(false, {});
      }}>
      <View
        style={[
          styles.details,
          {borderColor: vipDark ? 'white' : Colors.gray},
        ]}>
        {/* HEADER */}
        <View style={[styles.detailsHeader, backgroundColors[0]]}>
          <View style={styles.complimentSelected}>
            {itemSelected.key && (
              <Image
                style={styles.complimentSelectedImg}
                source={
                  distincionesInfo[itemSelected.key].ilustracion || {
                    uri: defaultImage,
                  }
                }
              />
            )}
            {itemSelected.link && (
              <UserImage link={itemSelected.link} userSize={60} />
            )}
            <Text style={[styles.complimentSelectedText, textColors[0]]}>
              {itemSelected.key
                ? distincionesInfo[itemSelected.key].distincion
                : getName(itemSelected.nombre, itemSelected.apellido_paterno)}
            </Text>
          </View>
          <View style={styles.detailsHeaderIcon}>
            <Icon
              name="times"
              size={30}
              forceColor
              color={vipDark ? 'white' : Colors.gray}
              onPress={() => showDetails(false, {})}
            />
          </View>
        </View>

        {/* LIST */}
        <View style={[styles.fullList, backgroundColors[1]]}>
          <FlatList
            data={
              itemSelected.users ? itemSelected.users : itemSelected.compliments
            }
            renderItem={({item, index}) =>
              renderItem(item, itemSelected.users ? true : false)
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </Modal>
  );
};

export {distincionesInfo};

export default Cumplidos;

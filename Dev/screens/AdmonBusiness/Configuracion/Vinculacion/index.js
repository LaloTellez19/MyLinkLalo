import React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Header from '../../../../components/Header';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import ProfilePicture from '../../../../components/ProfilePicture';
import MainMenu from '../../../../components/MainMenu';
import UserImage from '../../../../components/UserImage';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';
import Search from '../../../../components/Search';
import ListWithContextMenu from '../../../../components/ListWithContextMenu';

import LinkNewBusiness from './LinkNewBusiness';
import Notification from './Notification';

const width = Layout.window.width;
const height = Layout.window.height;
const itemHeight = 60;

/* DATA */
import {cardsLinkingResponse} from '../../../../testData/dataAdmon';

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    // position: 'absolute',
    // alignSelf: 'center',
    // top: -73,
    // elevation: 0,
    width: width,
    height: '100%',
    backgroundColor: 'white',
  },
  /* ESTILOS INFO USUARIO */
  userInfoContainer: {
    height: 180,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: 'white',
  },
  userName: {
    marginTop: 18,
    paddingBottom: 5,
    fontSize: 18,
    color: Colors.defaultTextColor,
  },
  userLink: {
    marginTop: 0,
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  camaraIcon: {
    position: 'absolute',
    top: 80,
    opacity: 0.5,
    elevation: 10,
  },
  /* ESTILOS VISTA SIN CONTENIDO */
  sinContenido: {
    height: height - 80,
    backgroundColor: Colors.grayLight,
  },
  sinContenidoIlustracionConteiner: {
    height: height - 310,
    backgroundColor: 'white',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  sinContenidoIlustracion: {
    width: 280,
    height: 280,
    resizeMode: 'cover',
    marginTop: 5,
  },
  sinContenidoText: {
    position: 'absolute',
    bottom: 5,
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
  botonAgregar: {
    width: 150,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 30,
    backgroundColor: Colors.business,
  },
  botonAgregarInList: {
    marginTop: 10,
    marginBottom: 10,
  },
  botonAgregarText: {
    fontSize: 14,
    color: 'white',
  },
  /* SEE NOTIFICATION STYLES, this is just for test */
  seeNotification: {
    position: 'absolute',
    top: 200,
    left: 5,
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: Colors.pet,
    elevation: 5,
  },
  /* LIST STYLES */
  list: {
    width: width,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
  },
  listItem: {
    width: width,
    height: itemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  itemText: {
    width: width / 1.2,
    marginLeft: 15,
  },
  myContactsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: width,
    height: itemHeight,
    marginTop: 5,
    // paddingTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  contactNameContainer: {
    width: 210,
  },
  contactName: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  search: {
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    paddingBottom: 10,
  },
});

const path = '../../../../assets/illust/';

const ilustraciones = [
  require(`${path}1.png`),
  require(`${path}2.png`),
  require(`${path}11.png`),
];

const listData = cardsLinkingResponse.data.contacts.slice(0, 4);

const listData2 = cardsLinkingResponse.data.contacts.slice(4, 8);

class Vinculacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seleccionViculacion: 0,
      linkToBusinessView: false,
      seeNotification: false,
      matrices: [],
      sucursales: [],
      plazas: [],
      lengths: [],
      loading: true,
      error: null,
      itemSelected: {},
      optionSelected: false,
      lastIndex: listData.length - 1,
    };

    this.menu = [
      {
        index: 0,
        name: 'business_main_store',
        text: 'Matriz',
        buttonText: 'Afiliar a una matriz',
      },
      {
        index: 1,
        name: 'business_branch',
        text: 'Sucursal',
        buttonText: 'Agregar sucursal',
      },
      {
        index: 2,
        name: 'market',
        text: 'Plaza',
        buttonText: 'Unirse a plaza',
      },
    ];

    this.contextMenu = ['Editar', 'Eliminar'];

    this.allMenuOptions = [
      {
        text: this.contextMenu[0],
        onPress: () => {
          console.log(this.contextMenu[0], this.state.itemSelected.index);
          this.setOptionSelected(true);
        },
      },
      {
        text: this.contextMenu[1],
        onPress: () => {
          console.log(this.contextMenu[1], this.state.itemSelected.index);
          this.setOptionSelected(true);
        },
      },
    ];

    this.setSeleccionViculacion = this.setSeleccionViculacion.bind(this);
    this.setLinkToBusinessView = this.setLinkToBusinessView.bind(this);
    this.setSeeNotification = this.setSeeNotification.bind(this);
    this.returnListItem = this.returnListItem.bind(this);
    this.setItemSelected = this.setItemSelected.bind(this);
    this.setOptionSelected = this.setOptionSelected.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getListData = this.getListData.bind(this);
  }

  fetchData = () => {
    const response = {
      matrices: listData,
      sucursales: listData2,
      plazas: [],
    };

    this.setState(
      {
        matrices: response.matrices,
        sucursales: response.sucursales,
        plazas: response.plazas,
      },
      () =>
        this.setState({
          lengths: [
            this.state.matrices.length,
            this.state.sucursales.length,
            this.state.plazas.length,
          ],
        }),
    );
  };

  componentDidMount() {
    this.fetchData();
  }

  setSeleccionViculacion = selection => {
    this.setState({
      seleccionViculacion: selection,
    });
  };

  setLinkToBusinessView = value => {
    this.setState({
      linkToBusinessView: value,
    });
  };

  setSeeNotification = value => {
    this.setState({
      seeNotification: value,
    });
  };

  setItemSelected = item => {
    this.setState({
      itemSelected: item,
    });
  };

  setOptionSelected = option => {
    this.setState({
      optionSelected: option,
    });
  };

  getListData = () => {
    switch (this.state.seleccionViculacion) {
      case 0:
        return this.state.matrices;
      case 1:
        return this.state.sucursales;
      case 2:
        return this.state.plazas;
    }
  };

  handleSearch = () => {};

  returnListItem = (item, setShowContextMenu) => (
    <ListItem
      item={item}
      setShowContextMenu={setShowContextMenu}
      setItemSelected={this.setItemSelected}
      setOptionSelected={this.setOptionSelected}
    />
  );

  getName = (names, lastNames) => {
    const name = names.concat(lastNames);
    const finalName = name.filter(item => item !== '');
    return finalName.join(' ');
  };

  /* GO TO ADD EDIT CATEGORY */
  goToLinkNewBusiness = (add = true) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'my-link.LinkNewBusiness',
        passProps: {
          setLinkToBusinessView: this.setLinkToBusinessView,
          updateListInViewOffset: this.props.updateListInViewOffset,
          componentId: this.props.componentId,
        },
      },
    });
  };

  /* GO BACK */
  goBack = () => {
    Navigation.pop(this.props.componentId, {
      component: {
        name: 'my-link.BusinessLinking',
      },
    });
  };

  render() {
    const {
      linkToBusinessView,
      seeNotification,
      seleccionViculacion,
      matrices,
      sucursales,
      plazas,
      lengths,
      lastIndex,
      itemSelected,
      optionSelected,
    } = this.state;
    const {user, updateListInViewOffset} = this.props;

    if (!linkToBusinessView && !seeNotification) {
      return (
        <View style={styles.mainContainer}>
          {/* HEADER */}
          <Header goBack={() => this.goBack()} />

          <View style={styles.userInfoContainer}>
            <ProfilePicture linkname={user.linkname} size={110} Business />
            <Text style={styles.userName}>
              {this.getName(user.nombre, user.apellido)}
            </Text>
            {/* <Text style={styles.userLink}>{user.linkname}</Text> */}
          </View>

          <View>
            <MainMenu
              menuItems={this.menu}
              size={45}
              totalItems={3}
              seleccion={seleccionViculacion}
              onPress={this.setSeleccionViculacion}
              activeBackground={Colors.business}
            />
          </View>

          {/* SEE NOTIFICATION - JUST FOR TEST, DELETE LATER */}
          <TouchableOpacity
            style={styles.seeNotification}
            onPress={() => this.setSeeNotification(true)}
          />

          {/* CONTENT */}
          {lengths[seleccionViculacion] === 0 && (
            <ErrorOrNoData
              ilustration={ilustraciones[seleccionViculacion]}
              title={`Agrega tarjetas Business para tener ${
                this.menu[seleccionViculacion].text
              }.`}
              textToBottom
              factor={1}>
              <TouchableOpacity
                style={styles.botonAgregar}
                onPress={() => this.setLinkToBusinessView(true)}>
                <Text style={styles.botonAgregarText}>
                  {this.menu[seleccionViculacion].buttonText}
                </Text>
              </TouchableOpacity>
            </ErrorOrNoData>
          )}

          {lengths[seleccionViculacion] > 0 && (
            <View style={{height: height - 63 - 83 - 180}}>
              <View style={styles.search}>
                <Search obtenerValorBusqueda={this.handleSearch} />
              </View>
              <ListWithContextMenu
                data={this.getListData()}
                listStyle={styles.list}
                ListItem={(item, setShowContextMenu) =>
                  this.returnListItem(item, setShowContextMenu)
                }
                lastIndex={lastIndex}
                allMenuOptions={this.allMenuOptions}
                itemSelected={itemSelected}
                itemHeight={
                  itemSelected.index === lastIndex
                    ? itemHeight * 0.98
                    : itemHeight
                }
                initialValue={itemHeight / 1.5}
                optionSelected={optionSelected}
                underlayColor={Colors.business}
                ListFooterComponent={
                  <TouchableOpacity
                    style={[styles.botonAgregar, styles.botonAgregarInList]}
                    onPress={() => this.goToLinkNewBusiness()}>
                    <Text style={styles.botonAgregarText}>
                      {this.menu[seleccionViculacion].buttonText}
                    </Text>
                  </TouchableOpacity>
                }
              />
            </View>
          )}
        </View>
      );
    }

    if (seeNotification) {
      return <Notification user={user} />;
    }
  }
}

const ListItem = ({
  item,
  setShowContextMenu,
  setItemSelected,
  setOptionSelected,
}) => {
  return (
    <View style={styles.myContactsItem}>
      <UserImage link={item.link} borderRadius={10} />
      <View style={styles.contactNameContainer}>
        <Text style={styles.contactName}>{item.nombre}</Text>
      </View>
      <Icon
        name="options"
        factor={0.7}
        Borderless
        forceColor
        color={Colors.gray}
        onPress={() => {
          setShowContextMenu();
          setItemSelected(item);
          setOptionSelected(false);
        }}
      />
    </View>
  );
};

export default Vinculacion;

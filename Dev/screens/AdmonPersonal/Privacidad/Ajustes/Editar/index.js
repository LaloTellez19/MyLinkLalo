import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';
import UserImage from '../../../../../components/UserImage';
import Search from '../../../../../components/Search';
import MenuContextual from '../../../../../components/MenuContextual';
import ErrorOrNoData from '../../../../../components/ErrorOrNoData';

const width = Layout.window.width;
const height = Layout.window.height - 63 - 73;
const itemHeight = 80;

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    width: width,
    height: '100%',
  },
  /* ESTILOS EDITAR */
  vistaEditarDato: {},
  topShadow: {
    elevation: 7,
    backgroundColor: 'white',
    paddingBottom: 1,
    marginBottom: 4,
  },
  datoSeleccionado: {
    alignItems: 'center',
    height: 150,
    backgroundColor: Colors.grayLight,
    marginTop: -1,
  },
  datoSeleccionadoTipo: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  datoSeleccionadoDatoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
    marginTop: 5,
  },
  datoSeleccionadoDato: {
    maxHeight: 50,
    fontSize: 18,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    marginRight: 0,
    flex: 1,
    flexWrap: 'wrap',
    paddingTop: 2,
    paddingBottom: 2,
  },
  /* ESTILOS DE LA LISTA DE USUARIOS CON LOS QUE ESTA COMPARTIDO EL DATO */
  listaEditarDato: {
    width: '100%',
    height: height,
    backgroundColor: 'white',
  },
  listHeader: {
    flex: 1,
    width: '100%',
    height: 60,
    // borderBottomWidth: 0.5,
    // borderColor: Colors.gray,
    backgroundColor: 'white',
  },
  list: {
    width: width,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  listaEditarDatoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    height: itemHeight,
    marginLeft: 30,
    marginRight: 30,
  },
  listaEditarDatoText: {
    marginLeft: 20,
    width: width / 2.1,
  },
  listaEditarDatousername: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  listaEditarDatouserlink: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  /* USER SELECTED ICON STYLES */
  userSelectedIcon: {
    position: 'absolute',
    left: -8,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 360,
    backgroundColor: 'transparent',
  },
});

function Editar(props) {
  const menu = [
    'Seleccionar todos',
    'Ver contacto',
    'Eliminar',
    'Deseleccionar todos',
    'Eliminar todos',
  ];

  const {
    dato,
    seleccionMenu,
    setEditarDato,
    updateUsersList,
    changeData,
    errorMyData,
    updateListInViewOffset,
  } = props;

  const [allUsers, setAllUsers] = React.useState(dato.users);
  const [lastIndex, setLastIndex] = React.useState(0);
  const [users, setUsers] = React.useState(dato.users);
  const [menuUsuario, setMenuUsuario] = React.useState(false);
  const [contentOffsetY, setContentOffsetY] = React.useState(0);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = React.useState({});
  const [allSelected, setAllSelected] = React.useState(false);
  const [scrollEnabled, setScrollEnabled] = React.useState(true);

  const optionsContextualMenu = [
    {
      text: menu[0],
      onPress: () => handleSelectAllUsers(true),
    },
    {
      text: menu[1],
      onPress: () => seeProfile(),
    },
    {
      text: menu[2],
      onPress: () => removeFromList(),
    },
  ];

  const allUsersContextMenu = [
    {
      text: menu[3],
      onPress: () => handleSelectAllUsers(false),
    },
    {
      text: menu[4],
      onPress: () => removeFromList(true),
    },
  ];

  /* COMPONENTDIDMOUNT */
  React.useEffect(() => {
    console.log('DATO: ', dato);
    setLastIndex(dato.users.length - 1);
    setAllUsers(dato.users);
    setUsers(dato.users);
  }, [dato]);

  /* OBTENER EL VALOR DE LA BUSQUEDA */
  const obtenerValorBusqueda = value => {
    /* Realizar busqueda */
    if (value !== '') {
      const resultadoBusqueda = allUsers.filter(
        item =>
          item.nombre.toLowerCase().includes(value.toLowerCase()) ||
          item.apellido_paterno.toLowerCase().includes(value.toLowerCase()),
      );
      setUsers(resultadoBusqueda);
      setLastIndex(resultadoBusqueda.length - 1);
    } else {
      setUsers(allUsers);
      setLastIndex(allUsers.length - 1);
    }
  };

  /* CONTROLAR EL MENU DE OPCIONES DEL USUARIO */
  const desplegarMenuOpciones = item => {
    setMenuUsuario(true);
    setUsuarioSeleccionado(item);
  };

  /* ELIMINAR USUARIO / DEJAR DE COMPARTIR DATO */
  const removeFromList = (all = false) => {
    if (!all) {
      /* REMOVE ONE USER FROM LIST */
      const usersUpdated = allUsers.filter(
        item => item.link !== usuarioSeleccionado.link,
      );
      setAllUsers(usersUpdated);
      setUsers(usersUpdated);
      updateUsersList(usersUpdated);
      setLastIndex(usersUpdated.length - 1);
    } else {
      setUsers([]);
      updateUsersList([]);
    }
    setMenuUsuario(false);
    setAllSelected(false);
  };

  /* CHANGE SELECTED DATA */
  const changeSelectedData = next => {
    let index = dato.index;
    !next ? (index -= 1) : (index += 1);
    changeData(index);
  };

  /* SEE PROFILE */
  const seeProfile = () => {
    console.log(`Go to ${usuarioSeleccionado.link} profile.`);
    setMenuUsuario(false);
  };

  /* SELECT ALL USERS */
  const handleSelectAllUsers = value => {
    console.log(value);
    setAllSelected(value);
    setMenuUsuario(false);
  };

  const onScroll = offsetY => {
    const offsetValue = users.length < 7 ? 155 : 150;
    if (offsetY >= offsetValue) {
      if (scrollEnabled) {
        setScrollEnabled(false);
      }
    } else {
      setScrollEnabled(true);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {errorMyData && (
        <ErrorOrNoData
          title={errorMyData.title}
          message={errorMyData.message}
        />
      )}

      {/* LISTA USERS */}
      {!errorMyData && (
        <ScrollView
          nestedScrollEnabled={true}
          scrollEnabled={scrollEnabled}
          onScroll={event => {
            const offsetY = event.nativeEvent.contentOffset.y;
            console.log(offsetY);
            onScroll(offsetY);
          }}
          onMomentumScrollEnd={event => {
            const offsetY = event.nativeEvent.contentOffset.y;
            updateListInViewOffset(offsetY);
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              setMenuUsuario(false);
            }}>
            <View style={styles.datoSeleccionado}>
              <Text style={styles.datoSeleccionadoTipo}>{dato.type}</Text>
              <Icon
                name={seleccionMenu.name}
                size={50}
                Borderless
                background={Colors.personal}
                onPress={() => setEditarDato(false)}
                forceColor
                color={'white'}
              />
              <View style={styles.datoSeleccionadoDatoContainer}>
                <Icon
                  name="arrow_left"
                  size={45}
                  factor={0.7}
                  Borderless
                  forceColor
                  color={Colors.gray}
                  onPress={() => changeSelectedData(false)}
                />
                <Text style={styles.datoSeleccionadoDato} numberOfLines={2}>
                  {dato.data}
                </Text>
                <Icon
                  name="arrow_right"
                  size={45}
                  factor={0.7}
                  Borderless
                  forceColor
                  color={Colors.gray}
                  onPress={() => changeSelectedData(true)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.listaEditarDato}>
            <FlatList
              onTouchStart={() => setMenuUsuario(false)}
              onScroll={event => {
                setContentOffsetY(event.nativeEvent.contentOffset.y);
              }}
              nestedScrollEnabled={true}
              scrollEnabled={!scrollEnabled}
              data={users}
              ListHeaderComponent={
                <View style={styles.listHeader}>
                  {/* Barra de busqueda */}
                  <Search obtenerValorBusqueda={obtenerValorBusqueda} />
                  {users.length === 0 && (
                    <ErrorOrNoData
                      title={'Nothing Found'}
                      message={'Try with another search or try to reload'}
                    />
                  )}
                </View>
              }
              renderItem={({item, index}) => (
                <User
                  item={{...item, index: index}}
                  setMenuUsuario={setMenuUsuario}
                  desplegarMenuOpciones={desplegarMenuOpciones}
                  allSelected={allSelected}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              style={styles.list}
              stickyHeaderIndices={[0]}
            />

            {/* USER CONTEXT MENU*/}
            {menuUsuario && (
              <MenuContextual
                opciones={optionsContextualMenu}
                index={usuarioSeleccionado.index}
                itemHeight={
                  usuarioSeleccionado.index === lastIndex ? 85 : itemHeight
                }
                lastIndex={lastIndex}
                contentOffsetY={contentOffsetY}
                initialValue={itemHeight - 55}
                underlayColor={Colors.personal}
              />
            )}

            {/* ALL USERS CONTEXT MENU*/}
            {allSelected && (
              <MenuContextual
                opciones={allUsersContextMenu}
                position={60}
                underlayColor={Colors.personal}
              />
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const User = ({item, setMenuUsuario, desplegarMenuOpciones, allSelected}) => {
  return (
    <TouchableWithoutFeedback onPress={() => setMenuUsuario(false)}>
      <View style={styles.listaEditarDatoItem}>
        <UserImage link={item.link} userSize={55} />
        <View style={styles.listaEditarDatoText}>
          <Text style={styles.listaEditarDatousername}>{`${item.nombre} ${
            item.apellido_paterno
          }`}</Text>
          <Text style={styles.listaEditarDatouserlink}>{`@${item.link}`}</Text>
        </View>

        <View
          style={[styles.button, {backgroundColor: 'white', elevation: 0}]}
        />

        {/* Trigger menu opciones */}
        <TouchableOpacity
          onPress={() => {
            desplegarMenuOpciones(item);
          }}>
          <Icon
            name="options"
            factor={0.7}
            Borderless
            forceColor
            color={Colors.gray}
          />
        </TouchableOpacity>

        {/* USER SELECTED ICON */}
        <View
          style={[
            styles.userSelectedIcon,
            allSelected ? {elevation: 6} : {elevation: 0},
          ]}>
          <Icon
            name="check_mark"
            size={20}
            factor={0.8}
            Borderless
            forceColor
            color={'white'}
            background={allSelected ? Colors.pet : 'white'}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Editar;

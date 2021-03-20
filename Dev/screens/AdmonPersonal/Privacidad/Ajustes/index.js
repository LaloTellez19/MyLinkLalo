import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import UsersArray from '../../../../components/UsersArray';
import MenuPerfiles from '../../../../components/MenuPerfiles';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

import Editar from './Editar';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  /* ESTILOS MENU */
  menu: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: 'white',
    elevation: 4,
  },
  menuItem: {
    width: width / 5,
  },
  menuIcon: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'white',
  },
  menuTextContainer: {
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
  },
  menuText: {
    fontSize: 10,
    color: Colors.defaultTextColor,
  },
  /* ESTILOS SELECCION DEL MENU */
  opcionSeleccionada: {
    paddingTop: 5,
    paddingBottom: 8,
    alignItems: 'center',
    backgroundColor: Colors.grayLight,
  },
  opcionSelecText: {
    marginTop: 3,
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  opcionSelecIcon: {
    position: 'relative',
  },
  /* ESTILOS DEL COUNTER */
  counter: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderRadius: 100,
    textAlign: 'center',
    paddingTop: 2,
    backgroundColor: Colors.pet,
    color: Colors.grayLight,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 1,
    left: 190,
    top: 1,
  },
  /* ESTILOS LISTA DE DATOS */
  listaDatos: {
    width: width,
    flex: 1,
    backgroundColor: 'white',
    marginTop: 5,
  },
  listHeader: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listaDatosItem: {
    width: width,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listaDatosIcon: {
    marginLeft: 10,
  },
  listaDatosText: {
    width: width / 2,
    marginLeft: 15,
  },
  listaDatosUsers: {
    position: 'absolute',
    top: 10,
    right: 0,
  },
  dato: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    paddingBottom: 5,
  },
  tipo: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
  },
});

function Ajustes(props) {
  const menu = [
    {
      id: 'documentos',
      name: 'card',
      text: 'Documentos',
    },
    {
      id: 'correo',
      name: 'email',
      text: 'Correo',
    },
    {
      id: 'mensajes',
      name: 'message_send',
      text: 'Mensajes',
    },
    {
      id: 'telefono',
      name: 'phone',
      text: 'Teléfono',
    },
    {
      id: 'direccion',
      name: 'location',
      text: 'Dirección',
    },
    {
      id: 'pasaporte',
      name: 'travel',
      text: 'Pasaporte',
    },
    {
      id: 'videollamadas',
      name: 'videocall',
      text: 'Videollamadas',
    },
  ];

  const {user, myData, setMyData, updateListInViewOffset} = props;

  const [allData, setAllData] = React.useState({...myData});
  const [seleccionMenu, setSeleccionMenu] = React.useState(menu[0]);
  const [datos, setDatos] = React.useState(allData[seleccionMenu.id]);
  // const [counter, setCounter] = React.useState(0);
  const [editarDato, setEditarDato] = React.useState(false);
  const [dato, setDato] = React.useState({});
  const [error, setError] = React.useState(null);

  /* CONTROLAR LA SELECCION DE OPCION EN EL MENU */
  const seleccionarOpcion = item => {
    setSeleccionMenu(item);
    setDatos(allData[item.id]);
  };

  /* EDITAR DATO */
  const editar = item => {
    setEditarDato(true);
    setDato(item);
  };

  /* CHANGE SELECTED DATA */
  const changeData = index => {
    const lastIndex = datos.length - 1;
    const currentIndex = Math.min(Math.max(index, 0), lastIndex);
    setDato({...datos[currentIndex], index: currentIndex});
  };

  /* HANDLE STOP SHARING WITH USER */
  const handleStopSharingWithUser = (id, dataItem, users) => {
    const errorSharingStatus = {
      title: 'There was a problem processing your data',
      message: 'Try to reload',
    };

    try {
      let dataSection = allData[id];
      dataSection[dataItem.index].users = users;
      setMyData('errorMyData', {...allData});
      setAllData({...allData});
      setError(null);
    } catch (err) {
      setError(errorSharingStatus);
    }
  };

  if (!error && !editarDato) {
    return (
      <View style={styles.listaDatos}>
        <FlatList
          nestedScrollEnabled={true}
          data={datos}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              {/* OPCION SELECCIONADA DE MENU */}
              {/* <View style={styles.opcionSeleccionada}>
                <Text style={styles.counter}>{counter}</Text>
                <View style={styles.opcionSelecIcon}>
                  <Icon
                    name={seleccionMenu.name}
                    size={55}
                    Borderless
                    background={Colors.personal}
                    forceColor
                    color={'white'}
                  />
                </View>
                <Text style={styles.opcionSelecText}>{seleccionMenu.text}</Text>
              </View> */}

              {/* MENU */}
              <View style={{marginBottom: 5}}>
                <MenuPerfiles
                  menuItems={menu}
                  seleccionMenu={seleccionMenu}
                  seleccionarOpcion={seleccionarOpcion}
                />
              </View>
            </View>
          }
          renderItem={({item, index}) => (
            <Dato item={{...item, index: index}} editar={editar} />
          )}
          keyExtractor={(item, index) => index.toString()}
          stickyHeaderIndices={[0]}
          onMomentumScrollEnd={event => {
            const offsetY = event.nativeEvent.contentOffset.y;
            updateListInViewOffset(offsetY);
          }}
        />
      </View>
    );
  }

  if (editarDato) {
    return (
      <Editar
        dato={dato}
        length={datos.length}
        seleccionMenu={seleccionMenu}
        setEditarDato={setEditarDato}
        updateUsersList={users =>
          handleStopSharingWithUser(seleccionMenu.id, dato, users)
        }
        changeData={changeData}
        errorMyData={error}
        updateListInViewOffset={updateListInViewOffset}
      />
    );
  }

  if (error) {
    return <ErrorOrNoData title={error.title} message={error.message} />;
  }
}

const Dato = ({item, editar}) => {
  return (
    <View style={styles.listaDatosItem}>
      <View style={styles.listaDatosIcon}>
        <Icon
          name="pencil"
          size={45}
          factor={0.8}
          forceColor
          color={Colors.gray}
          onPress={() => editar(item)}
        />
      </View>
      <View style={styles.listaDatosText}>
        <Text style={styles.dato}>{item.data}</Text>
        <Text style={styles.tipo}>{item.type}</Text>
      </View>
      <View style={styles.listaDatosUsers}>
        <UsersArray users={item.users.slice(0, 3)} />
      </View>
    </View>
  );
};

export default Ajustes;

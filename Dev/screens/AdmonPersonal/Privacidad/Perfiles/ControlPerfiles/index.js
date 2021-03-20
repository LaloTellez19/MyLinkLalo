import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Icon from '../../../../../components/Icon';
import Text from '../../../../../components/Text';
import Colors from '../../../../../constants/Colors';

import MenuPerfiles from '../../../../../components/MenuPerfiles';
import ProfileSelector from '../../../../../components/ProfileSelector';

import SwitchDataField from '../SwitchDataField';

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    backgroundColor: 'white',
  },
  /* ESTILOS USERINFO */
  userimage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginLeft: 40,
    marginRight: 40,
    paddingTop: 15,
    backgroundColor: 'white',
  },
  username: {
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 5,
    fontSize: 18,
    color: Colors.defaultTextColor,
  },
  /* ESTILOS SELECCION DEL MENU */
  opcionSeleccionada: {
    minHeight: 100,
    paddingTop: 15,
    paddingBottom: 8,
    alignItems: 'center',
    backgroundColor: Colors.grayLight,
    borderColor: Colors.gray,
    borderBottomWidth: 3,
  },
  opcionSelecText: {
    marginTop: 5,
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  opcionSelecIcon: {
    position: 'relative',
  },
  /* ESTILOS INFO PERFIL */
  infoPerfilLista: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  /* ESTILOS DEL COUNTER */
  counter: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: Colors.pet,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 1,
    left: 190,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    textAlign: 'center',
    color: Colors.grayLight,
  },
});

function ControlPerfiles(props) {
  const initialMenu = [
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

  const {
    user,
    perfil,
    perfiles,
    changeDataStatus,
    updateListInViewOffset,
  } = props;

  const [menu, setMenu] = React.useState(initialMenu);
  const [infoPerfiles, setInfoPerfiles] = React.useState([]);
  const [seleccionMenu, setSeleccionMenu] = React.useState(menu[0]);
  const [counter, setCounter] = React.useState(0);
  const [currentProfile, setCcurrentProfile] = React.useState(perfil);
  const [dataSelected, setDataSelected] = React.useState({});

  /* HANDLE PROFILE CHANGE */
  React.useEffect(() => {
    const index = currentProfile.index;
    const response = perfiles[index].info;

    /* UPDATE INFO DISPLAYED */
    setInfoPerfiles(response);

    /* UPDATE COUNTER */
    setCounter(obtenerValorCounter(response[seleccionMenu.id]));

    /* UPDATE GREEN INDICATOR */
    menu.map(item => {
      const activeSwitches = obtenerValorCounter(response[item.id]);
      item.indicador = activeSwitches !== 0;
    });
    setMenu(menu);
  }, [currentProfile]);

  /* CONTROLAR LA SELECCION DE OPCION EN EL MENU */
  const seleccionarOpcion = item => {
    setSeleccionMenu(item);
    setCounter(obtenerValorCounter(infoPerfiles[item.id]));
  };

  /* CONTROLAR ESTADO DE LOS SWITCH DE LA INFO DEL PERFIL
     Y EL ESTADO DEL INDICADOR VERDE CUANDO COUNTER > 0 */
  const checkSwitchValue = (value, id) => {
    const infoPerfilesCopy = infoPerfiles;

    /* ACTUALIZAR ESTADO DEL SWITCH */
    infoPerfilesCopy[seleccionMenu.id][id].active = value;

    const valorCounter = obtenerValorCounter(
      infoPerfilesCopy[seleccionMenu.id],
    );
    setCounter(valorCounter);

    /* ACTUALIZAR EL ESTADO DEL INDICADOR VERDE COUNTER > 0 */
    seleccionMenu.indicador = valorCounter !== 0;

    /* ACTUALIZAR INFORMACION DE PERFIL / ESTADO DE LOS SWITCHDATAFIELD */
    setInfoPerfiles(infoPerfilesCopy);

    /* UPDATE PROFILE */
    changeDataStatus(currentProfile, infoPerfilesCopy);
  };

  /* CONTROLAR ESTADO DEL COUNTER */
  const obtenerValorCounter = infoLista => {
    let actives = 0;

    if (infoLista) {
      infoLista.map(dataField => {
        dataField.active ? (actives += 1) : null;
      });
      return actives;
    } else {
      return 0;
    }
  };

  const changeDataSelected = (prevIndex, changeValue) => {
    const diff = prevIndex + changeValue;
    const currentData = infoPerfiles[seleccionMenu.id];
    const totalData = currentData.length - 1;
    const updatedIndex = Math.min(Math.max(diff, 0), totalData);
    const newDataSelected = {...currentData[updatedIndex], index: updatedIndex};
    setDataSelected(newDataSelected);
    updateProfileDataSettingsProp(newDataSelected);
  };

  const goToProfileDataSettings = data => {
    Navigation.push(props.componentId, {
      component: {
        name: 'my-link.ProfileDataSettings',
        id: 'DATA_SETTINGS_ID',
        passProps: {
          dataSelected: data,
          seleccionMenu: seleccionMenu,
          changeDataSelected: changeDataSelected,
          updateUserList: updateUserList,
        },
      },
    });
  };

  const updateProfileDataSettingsProp = data => {
    Navigation.updateProps('DATA_SETTINGS_ID', {
      dataSelected: data,
      seleccionMenu: seleccionMenu,
      changeDataSelected: changeDataSelected,
      updateUserList: updateUserList,
    });
  };

  const updateUserList = usersList => {
    const currentData = infoPerfiles[seleccionMenu.id];
    currentData[dataSelected.index].users = usersList;
    infoPerfiles[seleccionMenu.id] = currentData;
    setInfoPerfiles(infoPerfiles);
  };

  return (
    <View style={styles.mainContainer}>
      {/* CONTENIDO INFO PERFIL */}
      <View style={styles.infoPerfilLista}>
        <FlatList
          data={infoPerfiles[seleccionMenu.id]}
          nestedScrollEnabled={true}
          ListHeaderComponent={
            <View>
              {/* PROFILE SELECTOR */}
              <ProfileSelector
                profiles={perfiles}
                profile={perfil}
                handleProfileChange={setCcurrentProfile}
              />

              {/* MENU */}
              <MenuPerfiles
                menuItems={menu}
                seleccionMenu={seleccionMenu}
                seleccionarOpcion={seleccionarOpcion}
                indicador
              />

              {/* OPCION SELECCIONADA DE MENU */}
              <View style={styles.opcionSeleccionada}>
                <View style={styles.counter}>
                  <Text style={styles.counterText}>{counter}</Text>
                </View>
                <View style={styles.opcionSelecIcon}>
                  <Icon
                    name={seleccionMenu.name}
                    size={55}
                    Borderless
                    forceColor
                    color={'white'}
                    background={Colors.personal}
                  />
                </View>
                <Text style={styles.opcionSelecText}>{seleccionMenu.text}</Text>
              </View>
            </View>
          }
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                console.log('selected index: ', index);
                setDataSelected({...item, index});
                goToProfileDataSettings({...item, index});
              }}>
              <SwitchDataField
                data={{...item, index}}
                checkSwitchValue={checkSwitchValue}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          onMomentumScrollEnd={event => {
            const offsetY = event.nativeEvent.contentOffset.y;
            updateListInViewOffset(offsetY);
          }}
        />
      </View>
    </View>
  );
}

export default ControlPerfiles;

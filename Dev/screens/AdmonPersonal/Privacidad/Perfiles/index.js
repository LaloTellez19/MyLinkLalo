import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';

import MenuContextual from '../../../../components/MenuContextual';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

import ControlPerfiles from './ControlPerfiles';

const width = Layout.window.width;
const itemHeight = 80;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  /* ESTILOS HEADER */
  header: {
    width: 270,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginLeft: 40,
    marginRight: 30,
    backgroundColor: 'white',
  },
  headerText: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 25,
    color: Colors.defaultTextColor,
  },
  info: {
    width: width,
    height: 100,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  infoText: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  /* ESTILOS LISTA DE PERFILES*/
  listContainer: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: itemHeight,
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  itemTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 1.3,
    marginRight: 15,
  },
  itemOptions: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  itemText: {
    paddingLeft: 25,
    fontSize: 18,
    color: Colors.defaultTextColor,
  },
});

function Perfiles(props) {
  const menuContext = ['Cambiar nombre', 'Eliminar perfil'];
  const {
    user,
    profilesInfo,
    setProfilesInfo,
    updateListInViewOffset,
    componentId,
  } = props;

  const lastIndex = profilesInfo ? profilesInfo.length - 1 : 0;
  const [profiles, setProfiles] = React.useState([...profilesInfo]);
  const [verControlPerfiles, setVerControlPerfiles] = React.useState();
  const [seleccionPerfiles, setSeleccionPerfiles] = React.useState({});
  const [desplegarMenu, setDesplegarMenu] = React.useState(false);
  const [contentOffsetY, setContentOffsetY] = React.useState(0);
  const [error, setError] = React.useState(null);

  const opcionesMenu = [
    {
      name: 'trash',
      text: menuContext[1],
      onPress: () => eliminarPerfil(),
    },
  ];

  /* ELIMINAR PERFIL */
  const eliminarPerfil = () => {
    console.log(menuContext[1], seleccionPerfiles.name);
    setDesplegarMenu(false);
  };

  /* AGREGAR NUEVO PERFIL */
  const agregarPerfil = () => {
    console.log('Agregar Perfil');
  };

  /* HANDLE DATA STATUS CHANGE IN PROFILE */
  const handleDataStatusChangeInProfile = (profile, updatedInfo) => {
    const errorChange = {
      title: 'There was a problem processing your data',
      message: 'Try to reload',
    };

    try {
      profiles[profile].info = updatedInfo;
      setProfilesInfo('profilesInfo', [...profiles]);
      setProfiles([...profiles]);
      setError(null);
    } catch (err) {
      setError(errorChange);
    }
  };

  /* CHANGE DATA STATUS ACTIVATED / DISABLED */
  const changeDataStatus = (profile, info) => {
    handleDataStatusChangeInProfile(profile.index, info);
    setSeleccionPerfiles(profile);
  };

  return (
    <View style={styles.mainContainer}>
      {!verControlPerfiles && error && (
        <ErrorOrNoData title={error.title} message={error.message} />
      )}

      {/* LIST */}
      {!error && (
        <View style={styles.listContainer}>
          <FlatList
            nestedScrollEnabled={true}
            onTouchStart={() => setDesplegarMenu(false)}
            onScroll={event => {
              setContentOffsetY(event.nativeEvent.contentOffset.y);
            }}
            data={profiles}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <TouchableWithoutFeedback onPress={() => setDesplegarMenu(false)}>
                <View style={styles.info}>
                  {/* MENSAJE DE PERFIL*/}
                  <Text style={styles.infoText}>
                    {'Edita el perfil para compartir tu link de manera rápida'}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            }
            renderItem={({item, index}) => (
              <View style={styles.item}>
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => {
                    setSeleccionPerfiles({...item, index: index});
                    setVerControlPerfiles(true);
                  }}>
                  <View style={styles.itemTouch}>
                    <Icon
                      name={item.icon}
                      size={50}
                      forceColor
                      color={Colors.gray}
                    />
                    <Text style={styles.itemText}>{item.name}</Text>
                  </View>
                </TouchableOpacity>

                {/* CONTEXT MENU TRIGGER */}
                <TouchableOpacity
                  style={styles.itemOptions}
                  onPress={() => {
                    setSeleccionPerfiles({...item, index: index});
                    setDesplegarMenu(true);
                  }}>
                  <Icon
                    name={'options'}
                    size={40}
                    factor={0.9}
                    Borderless
                    forceColor
                    color={Colors.gray}
                  />
                </TouchableOpacity>
              </View>
            )}
            ListFooterComponent={
              <View style={styles.item}>
                <Icon
                  name="plus"
                  size={50}
                  forceColor
                  color={Colors.gray}
                  onPress={() => agregarPerfil()}
                />
                <Text style={styles.itemText}>{'Agregar perfil'}</Text>
              </View>
            }
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={event => {
              const offsetY = event.nativeEvent.contentOffset.y;
              updateListInViewOffset(offsetY);
            }}
          />

          {/* MENU CONTEXTUAL */}
          {desplegarMenu && (
            <MenuContextual
              opciones={opcionesMenu}
              index={seleccionPerfiles.index}
              itemHeight={
                seleccionPerfiles.index === lastIndex
                  ? itemHeight + 40
                  : itemHeight
              }
              lastIndex={lastIndex}
              contentOffsetY={contentOffsetY}
              initialValue={itemHeight - 120}
              icons
              underlayColor={Colors.personal}
            />
          )}
        </View>
      )}

      {verControlPerfiles && (
        <ControlPerfiles
          user={user}
          perfiles={profiles}
          perfil={seleccionPerfiles}
          changeDataStatus={changeDataStatus}
          updateListInViewOffset={updateListInViewOffset}
          componentId={componentId}
        />
      )}
    </View>
  );
}

export default Perfiles;

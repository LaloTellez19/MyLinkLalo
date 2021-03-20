import React from 'react';
import {View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import Layout from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import {TaggedFriendOption} from '../../../../components/TaggedFriend';

const width = Layout.window.width;

/* STYLE */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  /* ESTILOS LISTA DE PUBLICACIONES */
  listaPublicaciones: {
    flex: 1,
    backgroundColor: 'white',
  },
  /* ESTILOS LISTA DE SELECCION DE FILTRO */
  listaSeleccionFiltro: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  listaSeleccionFiltroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    padding: 11,
  },
  listaSeleccionFiltroText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginLeft: 20,
  },
});

function ListaOpcionesFiltro(props) {
  const {
    setMenuCategoria,
    setFiltroSeleccionado,
    opcionesEtiquetados,
    opcionesUbicaciones,
    taggedFriendsOn,
    updateListInViewOffset,
  } = props;

  const renderItem = ({item, index}) => {
    if (taggedFriendsOn) {
      return (
        <TaggedFriendOption
          item={item}
          setFiltroSeleccionado={setFiltroSeleccionado}
        />
      );
    } else {
      return (
        <OpcionUbicacion
          item={item}
          setFiltroSeleccionado={setFiltroSeleccionado}
        />
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        nestedScrollEnabled={true}
        onTouchStart={() => setMenuCategoria(false)}
        onMomentumScrollEnd={event => {
          const offsetY = event.nativeEvent.contentOffset.y;
          updateListInViewOffset(offsetY);
        }}
        data={taggedFriendsOn ? opcionesEtiquetados : opcionesUbicaciones}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const OpcionUbicacion = ({item, setFiltroSeleccionado}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.listaSeleccionFiltroItem}
      onPress={() => setFiltroSeleccionado(item)}>
      <Icon name="location" forceColor color={Colors.gray} />
      <Text style={styles.listaSeleccionFiltroText}>{item}</Text>
    </TouchableOpacity>
  );
};

export default ListaOpcionesFiltro;

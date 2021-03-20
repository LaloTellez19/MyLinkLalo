import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import Layout from '../../../../constants/Layout';
import MenuContextual from '../../../MenuContextual';
import DeleteConfirmation from '../../../DeleteConfirmation';
import Post from '../Post';

const width = Layout.window.width;
const itemHeight = 90;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});

function ListaPublicaciones(props) {
  const {
    personal,
    listaPublicaciones,
    setMenuCategoria,
    menuCategoriaActivo,
    taggedFriendsOn,
    handlePublicationOptions,
    updateListInViewOffset,
    onEndReached,
    onRefresh,
    refreshing,
  } = props;

  const lastIndex = listaPublicaciones ? listaPublicaciones.length - 1 : 0;
  const menu = ['Eliminar publicación', 'Ocultar del perfil'];
  const [menuPublicacion, setMenuPublicacion] = React.useState(false);
  const [publicacion, setPublicacion] = React.useState({});
  const [contentOffsetY, setContentOffsetY] = React.useState(0);
  const [showDeleteConf, setShowDeleteConf] = React.useState(false);

  const opciones = [
    {
      text: menu[0],
      onPress: () => {
        setShowDeleteConf(true);
        setMenuPublicacion(false);
      },
    },
    {
      text: menu[1],
      onPress: () => {
        handlePublicationOptions(publicacion);
        setMenuPublicacion(false);
      },
    },
  ];

  /* HANDLE PUBLICATION ACTIONS */
  const handlePublicationsActions = deleteItem => {
    if (deleteItem) {
      handlePublicationOptions(publicacion, true);
    } else {
      handlePublicationOptions(publicacion);
    }
    setShowDeleteConf(false);
  };

  /* HANDLE ITEM SELECTION */
  const handleItemSelection = item => {
    setMenuPublicacion(false);
    setMenuCategoria !== undefined ? setMenuCategoria(false) : null;
    setPublicacion(item);
  };

  /* HANDLE CONTEXT MENU DISPLAY */
  const handleContextMenuDisplay = item => {
    setMenuPublicacion(true);
    setMenuCategoria !== undefined ? setMenuCategoria(false) : null;
    setPublicacion(item);
  };

  const renderItem = ({item, index}) => (
    <Post
      item={{...item, index}}
      handleItemSelection={handleItemSelection}
      handleContextMenuDisplay={handleContextMenuDisplay}
      taggedFriendsOn={taggedFriendsOn}
    />
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        scrollEnabled={true}
        initialNumToRender={10}
        nestedScrollEnabled={true}
        onTouchStart={() => setMenuPublicacion(false)}
        onMomentumScrollEnd={event => {
          const offsetY = event.nativeEvent.contentOffset.y;
          updateListInViewOffset(offsetY);
        }}
        onScroll={event => {
          setMenuCategoria !== undefined ? setMenuCategoria(false) : null;
          const offsetY = event.nativeEvent.contentOffset.y;
          setContentOffsetY(offsetY);
        }}
        data={listaPublicaciones}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />

      {/* MENU OPCIONES */}
      {menuPublicacion && !menuCategoriaActivo && (
        <MenuContextual
          opciones={opciones}
          index={publicacion.index}
          itemHeight={taggedFriendsOn ? 160 : itemHeight + 5}
          lastIndex={lastIndex}
          contentOffsetY={contentOffsetY}
          initialValue={taggedFriendsOn ? 114 : itemHeight}
        />
      )}

      {/* DELETE CONFIRMATION */}
      {showDeleteConf && (
        <DeleteConfirmation
          personal={personal}
          confirmation={() => handlePublicationsActions(true)}
          cancelar={() => setShowDeleteConf(false)}
        />
      )}
    </View>
  );
}

export default ListaPublicaciones;

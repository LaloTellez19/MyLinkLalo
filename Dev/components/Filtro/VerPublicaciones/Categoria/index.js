import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Colors from '../../../../constants/Colors';
import Text from '../../../Text';
import Icon from '../../../Icon';
import MenuContextual from '../../../MenuContextual';
import ListaOpcionesFiltro from '../ListaOpcionesFiltro';
import ListaPublicaciones from '../ListaPublicaciones';
import ErrorOrNoData from '../../../ErrorOrNoData';

/* DATA */
import {opcionesFiltrosPublicaciones} from '../../../../testData/dataAdmon';

/* STYLE */
const styles = StyleSheet.create({
  /* ESTILOS SELECTOR */
  selector: {
    height: 45,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  selectorCategoria: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  selectorText: {
    width: 150,
    fontSize: 16,
    marginRight: 30,
    marginLeft: -20,
    marginTop: 0,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  filtroText: {
    width: 150,
    fontSize: 14,
    marginRight: 30,
    marginLeft: -20,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
});

function Categoria(props) {
  const {
    personal,
    publicationsList,
    filteredList,
    filterByCategory,
    handlePublicationOptions,
    updateListInViewOffset,
    onEndReached,
    setCategory,
    onRefresh,
    refreshing,
  } = props;
  const menu = ['Todo', 'Amigos etiquetados', 'Ubicación'];

  const categorias = [
    {
      text: menu[0],
      onPress: () => {
        handleCategoryChange(menu[0]);
      },
    },
    {
      text: menu[1],
      onPress: () => {
        handleCategoryChange(menu[1]);
      },
    },
    {
      text: menu[2],
      onPress: () => {
        handleCategoryChange(menu[2]);
      },
    },
  ];
  const [categoriaSeleccionada, setCategoriaSeleccionada] = React.useState(
    menu[0],
  );

  const [menuCategoria, setMenuCategoria] = React.useState(false);
  const [menuOpciones, setMenuOpciones] = React.useState(false);
  const [opcionesEtiquetados, setOpcionesEtiquetados] = React.useState();
  const [opcionesUbicaciones, setOpcionesUbicaciones] = React.useState();
  const [filtroSeleccionado, setFiltroSeleccionado] = React.useState('');
  const [errorFiltering, setErrorFiltering] = React.useState(null);

  /* COMPONENTDIDMOUNT */
  React.useEffect(() => {
    const response = opcionesFiltrosPublicaciones.data;
    setOpcionesEtiquetados(response.etiquetados);
    setOpcionesUbicaciones(response.ubicaciones);
  }, []);

  React.useEffect(() => {
    if (categoriaSeleccionada !== menu[0] && filteredList.length === 0) {
      setErrorFiltering(true);
    } else {
      setErrorFiltering(false);
    }
  }, [filteredList]);

  /* HANDLE CATEGORY CHANGE */
  const handleCategoryChange = categoria => {
    setErrorFiltering(false);
    setFiltroSeleccionado('');
    setCategoriaSeleccionada(categoria);
    setMenuCategoria(!menuCategoria);

    if (categoria !== menu[0]) {
      setMenuOpciones(true);
    } else {
      setMenuOpciones(false);
      setFiltroSeleccionado('');
    }
    setCategory(menu.findIndex(item => item === categoria));
  };

  /* HANDLE FILTER DATA */
  const handleFilterData = filter => {
    setMenuCategoria(false);
    setFiltroSeleccionado(filter);
    const filterType = categoriaSeleccionada === menu[1] ? 1 : 2;
    filterByCategory(filterType, filter);
    setMenuOpciones(false);
  };

  return (
    <View style={{flex: 1}}>
      {/* HEADER / FILTER SELECTOR */}
      <View style={[styles.selector, styles.selectorCategoria]}>
        <TouchableWithoutFeedback
          onPress={() => {
            setMenuOpciones(false);
            setMenuCategoria(false);
          }}>
          <View>
            <Text style={styles.selectorText}>{categoriaSeleccionada}</Text>
            {filtroSeleccionado !== '' && (
              <Text style={styles.filtroText}>{filtroSeleccionado}</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={() => {
            setMenuCategoria(!menuCategoria);
            categoriaSeleccionada !== menu[0] ? setMenuOpciones(true) : null;
          }}>
          <Icon
            name={menuCategoria ? 'arrow_up' : 'arrow_down'}
            factor={0.8}
            Borderless
            forceColor
            color={Colors.gray}
          />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      {errorFiltering && (
        <View style={{height: '100%'}}>
          <ErrorOrNoData
            title={`${
              categoriaSeleccionada === menu[1]
                ? 'Este contacto no aparece en ningúna publicacion.'
                : 'Esta ubicación no aparece en ningúna publicacion.'
            }`}
            message={`${
              categoriaSeleccionada === menu[1]
                ? 'Intenta con otro contacto.'
                : 'Intenta con otra ubicación.'
            }`}
          />
        </View>
      )}

      {publicationsList.length === 0 &&
        !menuOpciones &&
        categoriaSeleccionada === menu[0] && (
          <View style={{height: '100%'}}>
            <ErrorOrNoData title={'No tienes publicaciones aún.'} />
          </View>
        )}

      {/* LISTA DE PUBLICACIONES */}
      {!menuOpciones && (
        <ListaPublicaciones
          personal={personal}
          listaPublicaciones={
            categoriaSeleccionada === menu[0] ? publicationsList : filteredList
          }
          setMenuCategoria={setMenuCategoria}
          menuCategoriaActivo={menuCategoria}
          taggedFriendsOn={categoriaSeleccionada === menu[1]}
          handlePublicationOptions={handlePublicationOptions}
          updateListInViewOffset={updateListInViewOffset}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      )}

      {/* LISTA DE OPCIONES DE FILTRO EN ETIQUETADOS Y UBICACION */}
      {menuOpciones && (
        <ListaOpcionesFiltro
          setMenuCategoria={setMenuCategoria}
          setFiltroSeleccionado={handleFilterData}
          opcionesEtiquetados={opcionesEtiquetados}
          opcionesUbicaciones={opcionesUbicaciones}
          taggedFriendsOn={categoriaSeleccionada === menu[1]}
          updateListInViewOffset={updateListInViewOffset}
        />
      )}

      {/* MENU CATEGORIAS */}
      {menuCategoria && <MenuContextual opciones={categorias} position={35} />}
    </View>
  );
}

export default Categoria;

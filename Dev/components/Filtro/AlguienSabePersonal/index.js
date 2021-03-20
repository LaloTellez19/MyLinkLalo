import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import ViewPager from '@react-native-community/viewpager';

import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import Text from '../../../components/Text';
import Icon from '../../../components/Icon';
import MenuTabs from '../../../components/MenuTabs';
import LugarHoraFecha from '../../../components/LugarHoraFecha';
import CategoriesMenu from '../../../components/CategoriesMenu';
import ErrorOrNoData from '../../../components/ErrorOrNoData';

/* DATA */
import {alguienSabePersonal} from '../../../testData/dataAdmon';

/* CATEGORIES DATA */
import Categories from '../../../constants/Categories';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  viewPager: {
    width: width,
    height: height - 63 - 73 - 44 - 5,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuTabsContainer: {
    height: 44,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  todasConteiner: {
    height: 80.5,
    paddingRight: 35,
    paddingLeft: 35,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todasTitulo: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  categoriesMenu: {
    // borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  /* ESTILOS MENU CATEGORIAS */
  categorias: {
    height: 110,
    marginTop: -25,
  },
  /* ESTILOS LISTA DE MENSAJES */
  messagesListContainer: {
    width: '100%',
    height: '100%',
  },
  messagesList: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  listaMensajesItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  mensajeContenido: {
    width: 225,
    marginLeft: 20,
  },
  mensajeText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginBottom: 5,
  },
  mas: {
    paddingLeft: 12,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
  },
  masText: {
    fontSize: 12,
    color: Colors.personal,
  },
});

class AlguienSabe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seleccion: 0,
      categorySelected: false,
      listaMensajes: [],
      itemSelected: {},
      loading: true,
      error: null,
    };

    this.viewPager = React.createRef(null);
    this.menu = ['Todas', 'Categoría'];
    this.allCategories = Categories.ES_MX;
    this.setSeleccion = this.setSeleccion.bind(this);
    this.handleItemSelection = this.handleItemSelection.bind(this);
    this.handleCategorySelection = this.handleCategorySelection.bind(this);
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    const response = alguienSabePersonal.data.preguntas;

    if (response) {
      this.setState({
        listaMensajes: response,
        loading: false,
      });
    } else {
      this.setState({
        error: errorGettingData,
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.getData();
  }

  /* HANDLE ITEM SELECTION */
  handleItemSelection = item => {
    this.setState({itemSelected: item});
    console.log('mensaje seleccionado: ', item);
  };

  /* HANDLE CATEGORY SELECTION */
  handleCategorySelection = item => {
    this.setState({categorySelected: item});
    console.log(item);
  };

  setSeleccion = selection => {
    this.setState({seleccion: selection});
  };

  render() {
    const {
      loading,
      error,
      seleccion,
      categorySelected,
      listaMensajes,
    } = this.state;
    const {updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.menuTabsContainer}>
          <MenuTabs
            opciones={this.menu}
            seleccion={seleccion}
            seleccionar={page => {
              this.setSeleccion(page);
              this.viewPager.current.setPage(page);
            }}
            personal
          />
        </View>

        {loading && (
          <View>
            <Text style={{textAlign: 'center'}}>{'Loading...'}</Text>
          </View>
        )}

        {error && <ErrorOrNoData title={error.title} message={error.message} />}

        {/* LISTA DE MENSAJES */}
        {!loading && !error && (
          <ViewPager
            ref={this.viewPager}
            style={styles.viewPager}
            initialPage={0}
            onPageSelected={PageSelectedEvent => {
              this.setSeleccion(PageSelectedEvent.nativeEvent.position);
            }}>
            <View style={styles.messagesListContainer} key="1">
              <FlatList
                style={styles.messagesList}
                nestedScrollEnabled={true}
                data={listaMensajes}
                ListHeaderComponent={
                  <View style={styles.todasConteiner}>
                    <Text style={styles.todasTitulo}>
                      {'Buscando información de la mejor opción para ti.'}
                    </Text>
                  </View>
                }
                renderItem={({item, index}) => (
                  <MessagesItem
                    item={{
                      ...item,
                      index,
                      iconName: this.allCategories[item.category].icon,
                    }}
                    handleItemSelection={this.handleItemSelection}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                onMomentumScrollEnd={event => {
                  const offsetY = event.nativeEvent.contentOffset.y;
                  updateListInViewOffset(offsetY);
                }}
              />
            </View>

            <View style={styles.messagesListContainer} key="2">
              <FlatList
                style={styles.messagesList}
                nestedScrollEnabled={true}
                data={listaMensajes}
                ListHeaderComponent={
                  <View style={styles.categoriesMenu}>
                    <CategoriesMenu
                      categorySelected={categorySelected}
                      handleCategorySelection={this.handleCategorySelection}
                    />
                  </View>
                }
                renderItem={({item, index}) => (
                  <View>
                    {item.category === categorySelected.key && (
                      <MessagesItem
                        item={{
                          ...item,
                          index,
                          iconName: this.allCategories[item.category].icon,
                        }}
                        handleItemSelection={this.handleItemSelection}
                      />
                    )}
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                onMomentumScrollEnd={event => {
                  const offsetY = event.nativeEvent.contentOffset.y;
                  updateListInViewOffset(offsetY);
                }}
              />
            </View>
          </ViewPager>
        )}
      </View>
    );
  }
}

const MessagesItem = ({item, handleItemSelection}) => {
  return (
    <View style={styles.listaMensajesItem}>
      {/* CATEGORY ICON */}
      <Icon
        name={item.iconName || 'unknown'}
        size={50}
        forceColor
        color={Colors.gray}
      />

      {/* MESSAGE */}
      <View style={styles.mensajeContenido}>
        <Text style={styles.mensajeText} numberOfLines={1}>
          {item.message}
        </Text>
        <LugarHoraFecha location={item.location} date={item.date} />
      </View>

      {/* GO TO PUBLICATION */}
      <TouchableOpacity
        style={styles.mas}
        onPress={() => handleItemSelection(item)}>
        <Text style={styles.masText}>{'más'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AlguienSabe;

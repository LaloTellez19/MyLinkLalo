import React from 'react';
import {View, StyleSheet, Image, FlatList, ScrollView} from 'react-native';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';

import Text from '../../../../components/Text';
import {Rankin, RankinTop} from '../../../../components/BusinessInfoHeader';
import UserImage from '../../../../components/UserImage';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';
import Icon from '../../../../components/Icon';
import CategoriesMenu from '../../../../components/CategoriesMenu';

/* DATA */
import {businessRankinResponse} from '../../../../testData/dataAdmon';

/* CATEGORIES DATA */
import Categories from '../../../../constants/Categories';

const width = Layout.window.width;
const height = Layout.window.height;
const rankingItemHeight = 80;

/* STYLES */
const styles = StyleSheet.create({
  viewPager: {
    width: width,
    height: height - 63 - 73 - 44 - 5,
  },
  mainContainer: {
    width: '100%',
    flex: 1,
  },
  /* ESTILOS MENU */
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingTop: 30,
    paddingBottom: 29,
    backgroundColor: 'white',
    elevation: 7,
  },
  menuItem: {
    marginRight: 10,
    marginLeft: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  
  CategoriaTexto: {
    textAlign:'center',
    fontSize: 30,
  },
  
  /* ESTILOS BUSINESS RANKIN (LISTA) */
  businessRankinContainer: {
    width: '100%',
    height: height - 63 - 73,
  },
  businessRankin: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  rankinItem: {
    height: rankingItemHeight,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: Colors.gray,
    // paddingTop: 10,
    // paddingBottom: 10,
  },
  itemNameContainer: {
    width: 120,
  },
  itemName: {
    fontSize: 18,
    color: Colors.defaultTextColor,
  },
  itemNickname: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 5,
  },
  itemRecomendacionesContainer: {
    alignItems: 'center',
    width: 30,
  },
  itemRecomendaciones: {
    fontSize: 14,
    color: Colors.personal,
  },
  itemRankinContainer: {
    alignItems: 'center',
  },
  categoryContainer:{
    width:'100%',
    height:200,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    flexDirection:'column',
  }
});

/* ILUSTRACIONES */
const ilustration = require('../../../../assets/illust/13.png');

class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessRankin: [],
      rankinList: [],
      loading: true,
      error: null,
      seleccion: 0,
      categoriaSeleccionada: false,
      categorySelected: false,
      listaMensajes: [],
      itemSelected: {},
    };
    this.viewPager = React.createRef(null);
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


    const response = businessRankinResponse.data;

    if (response) {
      this.setState({
        businessRankin: response,
        rankinList: response.top,  
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
    this.setState({
       categorySelected: item, 
       categoriaSeleccionada: item.key
    });
    console.log('Category: '+this.state.categoriaSeleccionada);
  };

  setSeleccion = selection => {
    this.setState({seleccion: selection});
  };

  render() {
    const {businessRankin, rankinList, loading, error, seleccion,categorySelected,listaMensajes} = this.state;
    const {user, updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          {loading && (
            <View>
              <Text style={{textAlign: 'center'}}>{'Loading...'}</Text>
            </View>
          )}

          {error && <ErrorOrNoData title={error.title} message={error.message} />}

          {!loading && !error && (
            <View style={styles.messagesListContainer}>
              <FlatList
                style={styles.messagesList}
                nestedScrollEnabled={true}
                ListHeaderComponent={
                  <View style={styles.categoriesMenu}>
                    <CategoriesMenu
                      categorySelected={categorySelected}
                      handleCategorySelection={this.handleCategorySelection}
                    />
                  </View>
                }
                renderItem={({item, index}) => (
                  <View style={containerCategoria}>
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
              />
            </View>
          )}

          <View>
            {categorySelected.key === "SHOPPING" &&(
              <View>
                <View style={styles.categoryContainer}>
                  <Icon
                    name={'store'}
                    size={75}
                    forceColor
                    color='white'
                    background={Colors.business}
                  />
                  <Text style={styles.CategoriaTexto}>Compras</Text>
                </View> 

                {/* LISTA DE RANKIN */}
                {!loading && !error && rankinList.length > 0 && (
                  <View style={styles.businessRankinContainer}>
                    <FlatList
                      data={rankinList}
                      renderItem={({item, index}) => (
                        <RankinItem item={{...item, index}} />
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      onMomentumScrollEnd={event => {
                        const offsetY = event.nativeEvent.contentOffset.y;
                        updateListInViewOffset(offsetY);
                      }}
                      style={styles.businessRankin}
                    />
                  </View>
                )}
              </View>
            )}
            {categorySelected.key === "EDUCATION" &&(
              <View>
                <View style={styles.categoryContainer}>
                  <Icon
                    name={'school'}
                    size={75}
                    forceColor
                    color='white'
                    background={Colors.business}
                  />
                  <Text style={styles.CategoriaTexto}>Educacion</Text>
                </View>

                {/* LISTA DE RANKIN */}
                {!loading && !error && rankinList.length > 0 && (
                  <View style={styles.businessRankinContainer}>
                    <FlatList
                      data={rankinList}
                      renderItem={({item, index}) => (
                        <RankinItem item={{...item, index}} />
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      onMomentumScrollEnd={event => {
                        const offsetY = event.nativeEvent.contentOffset.y;
                        updateListInViewOffset(offsetY);
                      }}
                      style={styles.businessRankin}
                    />
                  </View>
                )}
              </View>
            )}
            {categorySelected.key === "COFFEE_AND_TEA" &&(
              <View>
                <View style={styles.categoryContainer}>
                  <Icon
                    name={'coffee'}
                    size={75}
                    forceColor
                    color='white'
                    background={Colors.business}
                  />
                  <Text style={styles.CategoriaTexto}>Café y Té</Text>
                </View>

                {/* LISTA DE RANKIN */}
                {!loading && !error && rankinList.length > 0 && (
                  <View style={styles.businessRankinContainer}>
                    <FlatList
                      data={rankinList}
                      renderItem={({item, index}) => (
                        <RankinItem item={{...item, index}} />
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      onMomentumScrollEnd={event => {
                        const offsetY = event.nativeEvent.contentOffset.y;
                        updateListInViewOffset(offsetY);
                      }}
                      style={styles.businessRankin}
                    />
                  </View>
                )}
              </View>
            )}
            {categorySelected.key === "RESTAURANTS" &&(
              <View>
                <View style={styles.categoryContainer}>
                  <Icon
                    name={'food'}
                    size={75}
                    forceColor
                    color='white'
                    background={Colors.business}
                  />
                  <Text style={styles.CategoriaTexto}>Restaurantes</Text>
                </View>

                {/* LISTA DE RANKIN */}
                {!loading && !error && rankinList.length > 0 && (
                  <View style={styles.businessRankinContainer}>
                    <FlatList
                      data={rankinList}
                      renderItem={({item, index}) => (
                        <RankinItem item={{...item, index}} />
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      onMomentumScrollEnd={event => {
                        const offsetY = event.nativeEvent.contentOffset.y;
                        updateListInViewOffset(offsetY);
                      }}
                      style={styles.businessRankin}
                    />
                  </View>
                )}
              </View>
            )}
            {categorySelected.key === "BARS" &&(
              <View>
                <View style={styles.categoryContainer}>
                  <Icon
                    name={'bar'}
                    size={75}
                    forceColor
                    color='white'
                    background={Colors.business}
                  />
                  <Text style={styles.CategoriaTexto}>Bares</Text>
                </View> 

                {/* LISTA DE RANKIN */}
                {!loading && !error && rankinList.length > 0 && (
                  <View style={styles.businessRankinContainer}>
                    <FlatList
                      data={rankinList}
                      renderItem={({item, index}) => (
                        <RankinItem item={{...item, index}} />
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      onMomentumScrollEnd={event => {
                        const offsetY = event.nativeEvent.contentOffset.y;
                        updateListInViewOffset(offsetY);
                      }}
                      style={styles.businessRankin}
                    />
                  </View>
                )}
              </View>
            )}
            {categorySelected.key === "STORES" &&(
              <View>
                <View style={styles.categoryContainer}>
                  <Icon
                    name={'store'}
                    size={75}
                    forceColor
                    color='white'
                    background={Colors.business}
                  />
                  <Text style={styles.CategoriaTexto}>Tiendas</Text>
                </View>

                {/* LISTA DE RANKIN */}
                {!loading && !error && rankinList.length > 0 && (
                  <View style={styles.businessRankinContainer}>
                    <FlatList
                      data={rankinList}
                      renderItem={({item, index}) => (
                        <RankinItem item={{...item, index}} />
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      onMomentumScrollEnd={event => {
                        const offsetY = event.nativeEvent.contentOffset.y;
                        updateListInViewOffset(offsetY);
                      }}
                      style={styles.businessRankin}
                    />
                  </View>
                )}
              </View>
            )}
            {categorySelected.key === "PARTIES" &&(
              <View>
                <View style={styles.categoryContainer}>
                  <Icon
                    name={'balloon'}
                    size={75}
                    forceColor
                    color='white'
                    background={Colors.business}
                  />
                  <Text style={styles.CategoriaTexto}>Fiestas</Text>
                </View>

                {/* LISTA DE RANKIN */}
                {!loading && !error && rankinList.length > 0 && (
                  <View style={styles.businessRankinContainer}>
                    <FlatList
                      data={rankinList}
                      renderItem={({item, index}) => (
                        <RankinItem item={{...item, index}} />
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      onMomentumScrollEnd={event => {
                        const offsetY = event.nativeEvent.contentOffset.y;
                        updateListInViewOffset(offsetY);
                      }}
                      style={styles.businessRankin}
                    />
                  </View>
                )} 
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}



const RankinItem = ({item}) => {
  return (
    <View style={styles.rankinItem}>
      {/* IMAGEN DEL BUSINESS EN EL RANKIN */}
      <UserImage link={item.link} borderRadius={10} />

      {/* NOMBRE Y LINK DEL BUSINESS EN EL RANKIN */}
      <View style={styles.itemNameContainer}>
        <Text style={styles.itemName}>{item.nombre}</Text>
        <Text style={styles.itemNickname}>{`@${item.link}`}</Text>
      </View>

      {/* NUMERO DE RECOMENDACIONES DEL BUSINESS EN EL RANKIN */}
      <View style={styles.itemRecomendacionesContainer}>
        <Text style={styles.itemRecomendaciones}>{`${
          item.recomendaciones
        }`}</Text>
      </View>

      {/* RANKIN  DEL BUSINESS */}
      <View
        style={[
          styles.itemRankinContainer,
          item.rankin <= 5 ? {marginTop: 10} : null,
        ]}>
        {item.rankin <= 5 && <RankinTop rankin={item.rankin} borderless top />}
        {item.rankin > 5 && <Rankin rankin={item.rankin} borderless />}
      </View>
    </View>
  );
};

export default Top;

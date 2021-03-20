import React from 'react';
import {View, StyleSheet, Image, FlatList, ScrollView} from 'react-native';

import Colors from '../../../../../../../constants/Colors';
import Layout from '../../../../../../../constants/Layout';
import Text from '../../../../../../../components/Text';
import BusinessInfoHeader from '../../../../../../../components/BusinessInfoHeader';
import {Rankin, RankinTop} from '../../../../../../../components/BusinessInfoHeader';
import UserImage from '../../../../../../../components/UserImage';
import ErrorOrNoData from '../../../../../../../components/ErrorOrNoData';
import Icon from '../../../../../../../components/Icon';
import MenuTabs from '../../../../../../../components/MenuTabs';
import LugarHoraFecha from '../../../../../../../components/LugarHoraFecha';
import CategoriesMenu from '../../../../../../../components/CategoriesMenu';

/* DATA */
import {businessRankinResponse} from '../../../../../../../testData/dataAdmon';

/* CATEGORIES DATA */
import Categories from '../../../../../../../constants/Categories';

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
  containerCategoria: {
    justifyContent: 'center',
    height: '20%',
    alignItems: 'center',
    fontSize: 20,
  },
  CategoriaTexto: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
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
});


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
       categoriaSeleccionada: item.key});
    
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
        <View style={{width: '100%', height: '5%', backgroundColor: 'red', flexDirection: 'row'}}>
            <View style={{width: '20%', backgroundColor: 'white', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                    name='top'
                    size={40}
                    factor={1}
                    forceColor
                    Borderless
                    color= {Colors.defaultTextColor}
                />
            </View>
            <View style={{width: '80%', backgroundColor: 'white', alignContent: 'center', justifyContent: 'center'}}>
                <Text style={{color: Colors.defaultTextColor, fontSize:20}}>
                    Top Plaza Antea
                </Text>
            </View>
            

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

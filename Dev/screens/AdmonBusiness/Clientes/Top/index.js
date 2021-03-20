import React from 'react';
import {View, StyleSheet, Image, FlatList} from 'react-native';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Text from '../../../../components/Text';
import BusinessInfoHeader from '../../../../components/BusinessInfoHeader';
import {Rankin, RankinTop} from '../../../../components/BusinessInfoHeader';
import UserImage from '../../../../components/UserImage';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

import {businessRankinResponse} from '../../../../testData/dataAdmon';

const width = Layout.window.width;
const height = Layout.window.height;
const rankingItemHeight = 80;

/* STYLES */
const styles = StyleSheet.create({
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
  menuItemText: {
    fontSize: 20,
    color: Colors.gray,
  },
  /* ESTILOS NO TOP */
  container: {
    height: height,
    alignItems: 'center',
    backgroundColor: Colors.grayLight,
  },
  ilustracionContainer: {
    width: 300,
    height: 400,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  ilustracion: {
    width: 200,
    height: 200,
    marginBottom: 15,
    marginTop: 40,
  },
  noTienesText: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  comparteTarjetaText: {
    textAlign: 'center',
    fontSize: 10,
    color: Colors.defaultTextColor,
    paddingRight: 10,
    paddingLeft: 10,
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
    };
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    try {
      const response = businessRankinResponse.data;
      this.setState({
        businessRankin: response,
        rankinList: response.top,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: errorGettingData,
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const {businessRankin, rankinList, loading, error} = this.state;
    const {user, updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        {loading && (
          <View>
            <Text style={{textAlign: 'center'}}>{'Loading...'}</Text>
          </View>
        )}

        {error && <ErrorOrNoData title={error.title} message={error.message} />}

        {/* SIN LISTA DE RANKIN */}
        {!loading && !error && rankinList.length === 0 && (
          <ErrorOrNoData
            ilustration={ilustration}
            title={'Aún no estas en un Top'}
            message={'Comparte tu tarjeta a clientes para registrarlos'}
          />
        )}

        {/* LISTA DE RANKIN */}
        {!loading && !error && rankinList.length > 0 && (
          <View style={styles.businessRankinContainer}>
            <FlatList
              nestedScrollEnabled={true}
              ListHeaderComponent={
                <BusinessInfoHeader user={user} top info={businessRankin} />
              }
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

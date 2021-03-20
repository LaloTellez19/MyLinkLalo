import React from 'react';
import {View, FlatList, StyleSheet, Switch} from 'react-native';

import ViewPager from '@react-native-community/viewpager';

import Text from '../../../../components/Text';
import Layout from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';
import Search from '../../../../components/Search';
import UserImage from '../../../../components/UserImage';
import CalendarioPicker from '../../../../components/CalendarioPicker';
import LugarHoraFecha from '../../../../components/LugarHoraFecha';
import MenuTabs from '../../../../components/MenuTabs';
import Loading from '../../../../components/Loading';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

import Settings from './Settings';

/* DATA */
import {mesCheckInResponse} from '../../../../testData/dataAdmon';

const width = Layout.window.width;
const height = Layout.window.height;
const itemHeight = 70;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    flex: 1,
    backgroundColor: 'white',
  },
  viewSelector: {
    height: 42,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  viewPager: {
    width: width,
    height: height - 63 - 73 - 42,
  },
  /* CALENDAR PICKER STYLES */
  calendarPickerContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 25,
    marginRight: 25,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* CHECK IN LIST STYLES */
  checkInList: {
    width: '100%',
    height: height - 63 - 73 - 42 - 116,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
  },
  list: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  /* CHECK IN ITEM STYLES */
  checkInItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray,
    height: itemHeight,
  },
  userInfoContainer: {
    width: width / 2,
    paddingLeft: 25,
  },
  userName: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  checkin: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
  },
  menuCheckInItemTrigger: {
    marginRight: 5,
  },
});

class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: [],
      checkInList: [],
      loading: true,
      error: null,
      currentView: 0,
    };

    this.menuMonths = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    this.viewPager = React.createRef(null);
    this.menu = ['Clientes', 'Configuraciones'];

    this.handleGetCheckInData = this.handleGetCheckInData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  getData = date => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    const response = mesCheckInResponse.data.check_in[date.toLowerCase()];

    if (response) {
      this.setState({
        checkInList: response,
        allItems: response,
        loading: false,
        error: null,
      });
    } else {
      this.setState({
        error: errorGettingData,
        loading: false,
      });
    }
  };

  /* HANDLE GET CHECK IN DATA */
  handleGetCheckInData = date => {
    const month = this.menuMonths[date.getMonth()];
    this.getData(month);
  };

  /* HANDLE SEARCH */
  handleSearch = value => {
    /* Realizar busqueda */
    if (value !== '') {
      const resultadoBusqueda = this.state.checkInList.filter(
        item =>
          item.user.nombre.toLowerCase().includes(value.toLowerCase()) ||
          item.user.apellido_paterno
            .toLowerCase()
            .includes(value.toLowerCase()),
      );
      this.setState({checkInList: resultadoBusqueda});
    } else {
      this.setState({checkInList: this.state.allItems});
    }
  };

  setCurrentView = view => {
    this.setState({currentView: view});
  };

  render() {
    const {loading, error, checkInList, currentView} = this.state;
    const {updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.viewSelector}>
          <MenuTabs
            opciones={this.menu}
            seleccion={currentView}
            seleccionar={page => {
              this.setCurrentView(page);
              this.viewPager.current.setPage(page);
              if (page === 1) {
                updateListInViewOffset(1);
              }
            }}
            fontSize={16}
          />
        </View>

        <ViewPager
          ref={this.viewPager}
          style={styles.viewPager}
          initialPage={0}
          onPageSelected={PageSelectedEvent => {
            this.setCurrentView(PageSelectedEvent.nativeEvent.position);
            if (PageSelectedEvent.nativeEvent.position === 1) {
              updateListInViewOffset(1);
            }
          }}>
          <View
            key="1"
            style={{
              backgroundColor:
                checkInList.length === 0 ? Colors.grayLight : 'white',
            }}>
            {/* CALENDAR PICKER*/}
            <View style={styles.calendarPickerContainer}>
              <CalendarioPicker
                obtnerItemCalendario={this.handleGetCheckInData}
                newPicker
                rightArrow={-55}
              />
            </View>

            {loading && <Loading />}

            {error && (
              <ErrorOrNoData title={error.title} message={error.message} />
            )}

            {/* CHECK IN SECTION */}
            {!loading && !error && (
              <View style={{flex: 1}}>
                <Search obtenerValorBusqueda={this.handleSearch} />

                {checkInList.length === 0 && (
                  <ErrorOrNoData
                    title={'Nothing Found'}
                    message={'Try with another search or try to reload'}
                  />
                )}

                {/* CHECK IN LIST */}
                <View style={styles.checkInList}>
                  <FlatList
                    nestedScrollEnabled={true}
                    data={checkInList}
                    renderItem={({item, index}) => (
                      <ItemCheckIn item={{...item, index}} index={index} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    onMomentumScrollEnd={event => {
                      const offsetY = event.nativeEvent.contentOffset.y;
                      updateListInViewOffset(offsetY);
                    }}
                    style={styles.list}
                  />
                </View>
              </View>
            )}
          </View>
          <View key="2">
            <Settings />
          </View>
        </ViewPager>
      </View>
    );
  }
}

const ItemCheckIn = ({item}) => {
  return (
    <View style={styles.checkInItem}>
      {/* IMAGEN DEL USUARIO */}
      <UserImage link={item.user.link} />

      {/* INFO DEL USUARIO */}
      <View style={styles.userInfoContainer}>
        {/* NOMBRE */}
        <Text style={styles.userName}>{`${item.user.nombre} ${item.user
          .apellido_paterno || ''}`}</Text>

        {/* DATOS CHECK IN */}
        <View style={styles.checkin}>
          <LugarHoraFecha location={item.location} date={item.date} />
        </View>
      </View>
    </View>
  );
};

export default CheckIn;

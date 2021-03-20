import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import Icon from '../../../../../components/Icon';
import Text from '../../../../../components/Text';
import UserImage from '../../../../../components/UserImage';
import Search from '../../../../../components/Search';
import MenuTabs from '../../../../../components/MenuTabs';
import MenuContextual from '../../../../../components/MenuContextual';
import ErrorOrNoData from '../../../../../components/ErrorOrNoData';

const noClientsIlustration = require('../../../../../assets/illust/6.png');

const width = Layout.window.width;
const height = Layout.window.height;
const itemHeight = 70;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1,
  },
  /* CLIENTS LIST STYLES */
  listHeader: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  clientsList: {
    width: '100%',
    height: height - 63 - 73 - 50,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  list: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  clienteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: itemHeight,
  },
  userImageContainer: {
    marginTop: -10,
    marginRight: 10,
    marginLeft: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    width: width / 1.25,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray,
    paddingLeft: 5,
  },
  userTextContainer: {
    width: width / 2.5,
    marginLeft: 5,
  },
  nombre: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginBottom: 10,
  },
  link: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    paddingBottom: 5,
  },
  enviarCupon: {
    height: 30,
    width: 87,
    backgroundColor: Colors.business,
    borderRadius: 10,
    marginRight: -5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enviarCuponText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  menuClienteTrigger: {
    marginRight: 10,
    marginTop: -10,
  },
});

function Premium(props) {
  const {
    clients,
    error,
    contextMenu,
    tabsOptions,
    handlePremiumState,
    handleShowHideState,
    updateListInViewOffset,
  } = props;

  const allData = clients;
  const [listData, setListData] = React.useState(clients);

  const lastIndex = clients.length - 1;

  const [currentView, setCurrentView] = React.useState(0);
  const [clientSelected, setClientSelected] = React.useState({});
  const [showContextMenu, setShowContextMenu] = React.useState(false);
  const [contentOffsetY, setContentOffsetY] = React.useState(0);

  const allMenuOptions = [
    {
      text: contextMenu[1],
      onPress: () => {
        handlePremiumState(clientSelected);
        setShowContextMenu(false);
      },
    },
    {
      text: clientSelected.hidden ? contextMenu[3] : contextMenu[2],
      onPress: () => {
        handleShowHideState(clientSelected);
        setShowContextMenu(false);
      },
    },
  ];

  /* HANDLE VIEW SELECTION */
  const handleViewSelection = selection => {
    setCurrentView(selection);
    setShowContextMenu(false);
  };

  /* GET CURRENT DATA */
  const getCurrentData = () => {
    let data = [];
    switch (currentView) {
      case 0:
        data = listData.filter(item => item.premium);
        break;
      case 1:
        data = listData.filter(item => !item.hidden && item.premium);
        break;
      case 2:
        data = listData.filter(item => item.hidden && item.premium);
        break;
    }
    return data;
  };

  /* HANDLE SEARCH */
  const handleSearch = value => {
    if (value !== '') {
      const searchResults = allData.filter(
        item =>
          item.nombre.toLowerCase().includes(value.toLowerCase()) ||
          item.apellido_paterno.toLowerCase().includes(value.toLowerCase()),
      );
      setListData(searchResults);
    } else {
      setListData(allData);
    }
  };

  /* HANDLE CONTEXT MENU */
  const handleContextMenu = (item, state) => {
    setClientSelected(item);
    setShowContextMenu(state);
  };

  /* HANDLE SEND CUPON */
  const handleSendCupon = item => {
    setClientSelected(item);
    console.log(`Send cupon to: ${item.link}`);
  };

  return (
    <View style={styles.mainContainer}>
      {error && (
        <ErrorOrNoData
          ilustration={noClientsIlustration}
          title={error.title}
          message={error.message}
        />
      )}

      {/* CONTENT */}
      {!error && (
        <View style={styles.clientsList}>
          <FlatList
            onScroll={event => {
              setContentOffsetY(event.nativeEvent.contentOffset.y);
            }}
            onTouchStart={() => {
              setShowContextMenu(false);
            }}
            nestedScrollEnabled={true}
            data={getCurrentData()}
            ListHeaderComponent={
              <View style={styles.listHeader}>
                <Search obtenerValorBusqueda={handleSearch} />

                <MenuTabs
                  opciones={tabsOptions}
                  seleccion={currentView}
                  seleccionar={handleViewSelection}
                  fontSize={14}
                />
              </View>
            }
            renderItem={({item, index}) => (
              <ClientsItem
                item={{...item, index}}
                premiumView={true}
                handleContextMenu={handleContextMenu}
                handleSendCupon={handleSendCupon}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            stickyHeaderIndices={[0]}
            onMomentumScrollEnd={event => {
              const offsetY = event.nativeEvent.contentOffset.y;
              updateListInViewOffset(offsetY);
            }}
            style={styles.list}
          />

          {/* CONTEXTUAL MENU */}
          {showContextMenu && (
            <MenuContextual
              opciones={allMenuOptions}
              index={clientSelected.index}
              itemHeight={clientSelected.index === lastIndex ? 95 : itemHeight}
              lastIndex={lastIndex}
              contentOffsetY={contentOffsetY}
              initialValue={-30}
            />
          )}
        </View>
      )}
    </View>
  );
}

const ClientsItem = ({
  item,
  premiumView,
  handleContextMenu,
  handleSendCupon,
}) => {
  return (
    <View style={styles.clienteItem}>
      <View style={styles.userImageContainer}>
        <UserImage link={item.link} />
      </View>

      <View style={styles.userInfoContainer}>
        <View style={styles.userTextContainer}>
          <Text style={styles.nombre}>{`${item.nombre} ${
            item.apellido_paterno
          }`}</Text>
          <Text style={styles.link}>{item.link}</Text>
        </View>

        {/* SEND CUPON */}
        <TouchableOpacity
          style={[
            styles.enviarCupon,
            !premiumView
              ? {backgroundColor: 'transparent'}
              : {backgroundColor: Colors.business},
          ]}
          onPress={() => (premiumView ? handleSendCupon(item) : null)}>
          <Text
            style={[
              styles.enviarCuponText,
              !premiumView ? {color: 'transparent'} : null,
            ]}>
            {'Enviar cupón'}
          </Text>
        </TouchableOpacity>

        {/* CONTEXT MENU TRIGGER */}
        <TouchableOpacity
          style={styles.menuClienteTrigger}
          onPress={event => {
            handleContextMenu(item, true);
          }}>
          <Icon
            name="options"
            size={50}
            Borderless
            forceColor
            color={Colors.gray}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Premium;

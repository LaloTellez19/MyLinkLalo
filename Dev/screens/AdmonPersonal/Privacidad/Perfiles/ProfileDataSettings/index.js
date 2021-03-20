import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Layout from '../../../../../constants/Layout';
import Colors from '../../../../../constants/Colors';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';
import Search from '../../../../../components/Search';
import UserImage from '../../../../../components/UserImage';
import MenuContextual from '../../../../../components/MenuContextual';

const width = Layout.window.width;
const height = Layout.window.height;
const itemHeight = 65;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: height,
    backgroundColor: 'white',
  },
  topContainer: {
    elevation: 5,
    backgroundColor: 'white',
  },
  /* USERS LIST STYLES */
  usersListContainer: {
    width: width,
    height: height - 63,
    backgroundColor: 'white',
  },
  usersList: {
    width: width,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  usersListHeader: {
    width: '100%',
    height: 180,
    flex: 1,
    backgroundColor: 'white',
  },
  usersListHeaderGray: {
    height: '65%',
    alignItems: 'center',
    backgroundColor: Colors.grayLight,
  },
  seleccionMenu: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  dataSelected: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataSelectedText: {
    height: 25,
    fontSize: 14,
    color: Colors.defaultTextColor,
    width: width / 1.5,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    padding: 3,
    textAlign: 'center',
  },
  user: {
    width: width / 1.2,
    height: itemHeight,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  userText: {
    width: '55%',
    marginLeft: 10,
    marginRight: 10,
  },
  userName: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  userLink: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  userOptions: {},
});

function ProfileDataSettings(props) {
  const menu = ['Ver contacto', 'Eliminar'];
  const {
    dataSelected,
    seleccionMenu,
    changeDataSelected,
    updateUserList,
  } = props;
  const [users, setUsers] = React.useState([...dataSelected.users]);
  const [userSelected, setUserSelected] = React.useState({});
  const [showContextMenu, setShowContextMenu] = React.useState(false);
  const [contentOffsetY, setContentOffsetY] = React.useState(0);
  const [dataToSearch, setDataToSearch] = React.useState([
    ...dataSelected.users,
  ]);

  const optionsContextualMenu = [
    {
      text: menu[0],
      onPress: () => seeContact(),
    },
    {
      text: menu[1],
      onPress: () => deleteUser(),
    },
  ];

  React.useEffect(() => {
    setUsers([...dataSelected.users]);
    setDataToSearch([...dataSelected.users]);
  }, [dataSelected]);

  const goBack = () => {
    Navigation.pop(props.componentId, {
      component: {
        name: 'my-link.ProfileDataSettings',
      },
    });
  };

  const handleContextMenu = user => {
    setShowContextMenu(true);
    setUserSelected(user);
  };

  const seeContact = () => {
    setShowContextMenu(false);
  };

  const deleteUser = () => {
    users.splice(userSelected.index, 1);
    setUsers([...users]);
    setShowContextMenu(false);
    updateUserList([...users]);
  };

  const handleSearch = rawFilter => {
    const filter = rawFilter.trim();
    if (filter !== '') {
      const searchResults = dataToSearch.filter(
        item =>
          item.nombre.toLowerCase().includes(filter.toLowerCase()) ||
          item.apellido_paterno.toLowerCase().includes(filter.toLowerCase()),
      );

      setUsers(searchResults);
    } else {
      setUsers(dataToSearch);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Header goBack={() => goBack()} />
      </View>

      {/* USERS LIST */}
      <View style={styles.usersListContainer}>
        <FlatList
          data={users}
          ListHeaderComponent={
            <View style={styles.usersListHeader}>
              <View style={styles.usersListHeaderGray}>
                <Text style={styles.seleccionMenu}>{seleccionMenu.text}</Text>
                <Icon
                  name={seleccionMenu.name}
                  size={50}
                  factor={0.7}
                  background={Colors.personal}
                  forceColor
                  color={'white'}
                />
                <View style={styles.dataSelected}>
                  <Icon
                    name="arrow_left"
                    factor={0.8}
                    Borderless
                    onPress={() => changeDataSelected(dataSelected.index, -1)}
                  />
                  <Text style={styles.dataSelectedText}>
                    {dataSelected.data}
                  </Text>
                  <Icon
                    name="arrow_right"
                    factor={0.8}
                    Borderless
                    onPress={() => changeDataSelected(dataSelected.index, 1)}
                  />
                </View>
              </View>
              <Search obtenerValorBusqueda={handleSearch} />
            </View>
          }
          renderItem={({item, index}) => (
            <User
              item={{...item, index}}
              handleContextMenu={handleContextMenu}
            />
          )}
          keyExtractor={(item, index) => item.link}
          stickyHeaderIndices={[0]}
          style={styles.usersList}
          onScroll={event => {
            setContentOffsetY(event.nativeEvent.contentOffset.y);
          }}
          onTouchStart={() => setShowContextMenu(false)}
        />
        {/* USER CONTEXT MENU */}
        {showContextMenu && (
          <MenuContextual
            opciones={optionsContextualMenu}
            index={userSelected.index}
            itemHeight={
              userSelected.index === users.length - 1 ? 98 : itemHeight
            }
            lastIndex={users.length - 1}
            contentOffsetY={contentOffsetY}
            initialValue={itemHeight - 180}
            underlayColor={Colors.personal}
          />
        )}
      </View>
    </View>
  );
}

const User = ({item, handleContextMenu}) => {
  return (
    <View style={styles.user}>
      <UserImage link={item.link} size={55} />
      <View style={styles.userText}>
        <Text style={styles.userName}>{`${item.nombre} ${
          item.apellido_paterno
        }`}</Text>
        <Text style={styles.userLink}>{`@${item.link}`}</Text>
      </View>
      <TouchableOpacity
        style={styles.userOptions}
        onPress={() => handleContextMenu(item)}>
        <Icon name="options" Borderless />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileDataSettings;

import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import ViewPager from '@react-native-community/viewpager';

import Text from '../../../../components/Text';
import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';

import Search from '../../../../components/Search';
import UserImage from '../../../../components/UserImage';
import MenuTabs from '../../../../components/MenuTabs';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

/* DATA */
import {infoSeguidoresResponse} from '../../../../testData/dataAdmon';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewContainer: {
    flex: 1,
  },
  viewPager: {
    width: width,
    height: height - 63 - 73 - 40,
  },
  menuTabs: {
    height: 40,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  searchContainer: {},
  /* ESTILOS SELECCIONA SEGUIDORES / SEGUIDOS */
  seleccionar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 5,
    paddingTop: 15,
    paddingBottom: 10,
    marginTop: -10,
  },
  opcionSeleccionar: {
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  opcionText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  /* ESTILOS LISTA SEGUIDORES / SEGUIDOS */
  listContainer: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  listaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    paddingTop: 10,
    marginLeft: 15,
    paddingBottom: 10,
  },
  listaText: {
    marginLeft: 20,
    width: width / 2.3,
  },
  username: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  userlink: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  boton: {
    width: 75,
    height: 22,
    borderRadius: 8,
    marginRight: 5,
    elevation: 2,
  },
  botonSeguir: {
    backgroundColor: 'white',
  },
  botonSiguiendo: {
    backgroundColor: Colors.gray,
  },
  botonDejarDeSeguir: {
    backgroundColor: Colors.gray,
    width: 95,
    marginLeft: -15,
  },
  botonText: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.defaultTextColor,
    paddingTop: 3,
  },
  nothingFound: {
    width: '100%',
    height: '100%',
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
  },
});

class Followers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 0,
      followers: [],
      following: [],
      loading: true,
      error: null,
      nothingFoundinFollowers: null,
      nothingFoundinFollowing: null,
    };

    this.followers = [];
    this.following = [];
    this.menu = ['Seguidores', 'Siguiendo'];
    this.viewPager = React.createRef(null);

    this.changeCurrentView = this.changeCurrentView.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFollowingStatusChange = this.handleFollowingStatusChange.bind(
      this,
    );
  }

  getData = () => {
    const response = infoSeguidoresResponse.data;
    this.setState({
      followers: response.followers,
      following: response.following,
      loading: false,
    });

    this.followers = response.followers;
    this.following = response.following;
  };

  componentDidMount() {
    this.getData();
  }

  /* HANDLE SEARCH */
  handleSearch = rawFilter => {
    const {currentView} = this.state;
    const filter = rawFilter.trim();

    if (filter !== '') {
      const searchIn = currentView === 0 ? this.followers : this.following;

      const searchResults = searchIn.filter(
        item =>
          item.nombre.toLowerCase().includes(filter.toLowerCase()) ||
          item.apellido_paterno.toLowerCase().includes(filter.toLowerCase()),
      );

      const errorFiltering = {
        title: 'Nothing Found',
        message: 'Try with another search or try to reload',
      };

      if (searchResults.length > 0) {
        if (currentView === 0) {
          this.setState({followers: searchResults});
        } else {
          this.setState({following: searchResults});
        }
      } else {
        if (currentView === 0) {
          this.setState({nothingFoundinFollowers: errorFiltering});
        } else {
          this.setState({nothingFoundinFollowing: errorFiltering});
        }
      }
    } else {
      if (currentView === 0) {
        this.setState({
          followers: this.followers,
          nothingFoundinFollowers: null,
        });
      } else {
        this.setState({
          following: this.following,
          nothingFoundinFollowing: null,
        });
      }
    }
  };

  /* HANDLE FOLLOWING STATUS CHANGE */
  handleFollowingStatusChange = index => {
    const {followers, following, currentView} = this.state;

    if (currentView === 0) {
      const isFollowing = !followers[index].following;
      followers[index].following = isFollowing;

      if (isFollowing) {
        this.setState({
          followers: [...followers],
          following: [...following, followers[index]],
        });
      } else {
        const foundIndex = following.findIndex(
          item => item.link === followers[index].link,
        );

        following.splice(foundIndex, 1);

        this.setState({
          followers: [...followers],
          following: [...following],
        });
      }

      this.followers = followers;
      this.following = following;
    } else {
      const isFollowing = !following[index].following;
      following[index].following = isFollowing;

      const foundIndex = followers.findIndex(
        item => item.link === following[index].link,
      );

      if (foundIndex >= 0) {
        followers[foundIndex].following = isFollowing;
      }

      following.splice(index, 1);
      this.setState({
        following: [...following],
        followers: [...followers],
      });

      this.following = following;
      this.followers = followers;
    }
  };

  changeCurrentView = page => {
    this.setState(
      {
        currentView: page,
      },
      () => {
        this.viewPager.current.setPage(page);
      },
    );
  };

  render() {
    const {
      currentView,
      followers,
      following,
      loading,
      error,
      nothingFoundinFollowers,
      nothingFoundinFollowing,
    } = this.state;
    const {updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        {/* SELECCIONAR SEGUIDORES / SEGUIDOS */}
        <View style={styles.menuTabs}>
          {/* MENU */}
          <MenuTabs
            opciones={this.menu}
            seleccion={currentView}
            seleccionar={this.changeCurrentView}
            personal
            fontSize={14}
          />
        </View>

        {error && <ErrorOrNoData title={error.title} message={error.message} />}

        {/* LISTA SEGUIDORES / SEGUIDOS */}
        {!loading && !error && (
          <ViewPager
            ref={this.viewPager}
            style={styles.viewPager}
            initialPage={0}
            onPageSelected={PageSelectedEvent => {
              this.setState({
                currentView: PageSelectedEvent.nativeEvent.position,
              });
            }}>
            <View key="1" style={styles.viewContainer}>
              <FollowList
                nothingFound={nothingFoundinFollowers}
                handleSearch={this.handleSearch}
                data={followers}
                following={false}
                handleFollowingStatusChange={this.handleFollowingStatusChange}
                updateListInViewOffset={updateListInViewOffset}
              />
            </View>
            <View key="2" style={styles.viewContainer}>
              <FollowList
                nothingFound={nothingFoundinFollowing}
                handleSearch={this.handleSearch}
                data={following}
                following={true}
                handleFollowingStatusChange={this.handleFollowingStatusChange}
                updateListInViewOffset={updateListInViewOffset}
              />
            </View>
          </ViewPager>
        )}
      </View>
    );
  }
}

const FollowList = ({
  nothingFound,
  handleSearch,
  data,
  following,
  handleFollowingStatusChange,
  updateListInViewOffset,
}) => {
  const renderItem = (item, index) => {
    return (
      <FollowItem
        item={item}
        index={index}
        following={following}
        handleFollowingStatusChange={handleFollowingStatusChange}
      />
    );
  };

  return (
    <View style={styles.listContainer}>
      {/* BUSQUEDA */}
      <View style={styles.searchContainer}>
        <Search obtenerValorBusqueda={filter => handleSearch(filter)} />
      </View>

      {nothingFound && (
        <View style={styles.nothingFound}>
          <ErrorOrNoData
            title={nothingFound.title}
            message={nothingFound.message}
          />
        </View>
      )}

      {!nothingFound && (
        <FlatList
          nestedScrollEnabled={true}
          data={data}
          renderItem={({item, index}) => renderItem(item, index)}
          keyExtractor={(item, index) => `${item.link}${index}`}
          onMomentumScrollEnd={event => {
            const offsetY = event.nativeEvent.contentOffset.y;
            updateListInViewOffset(offsetY);
          }}
        />
      )}
    </View>
  );
};

const FollowItem = ({item, index, following, handleFollowingStatusChange}) => {
  return (
    <View style={styles.listaItem}>
      <UserImage
        link={item.link}
        userSize={55}
        borderRadius={item.business ? 10 : 100}
      />
      <View style={styles.listaText}>
        <Text style={styles.username}>{`${item.nombre} ${
          item.apellido_paterno
        }`}</Text>
        <Text style={styles.userlink}>{`@${item.link}`}</Text>
      </View>

      {/* BOTON SEGUIR / SIGUIENDO */}
      {!following && (
        <TouchableOpacity
          style={[
            styles.boton,
            item.following ? styles.botonSiguiendo : styles.botonSeguir,
          ]}
          onPress={() => handleFollowingStatusChange(index)}>
          <Text
            style={[
              styles.botonText,
              item.following ? {color: 'white'} : null,
            ]}>
            {item.following ? 'Siguiendo' : 'Seguir'}
          </Text>
        </TouchableOpacity>
      )}

      {/* BOTON DEJAR DE SEGUIR */}
      {following && (
        <TouchableOpacity
          style={[styles.boton, styles.botonDejarDeSeguir]}
          onPress={() => handleFollowingStatusChange(index)}>
          <Text style={[styles.botonText, {color: 'white'}]}>
            {'Dejar de seguir'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Followers;

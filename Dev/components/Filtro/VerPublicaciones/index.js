import React from 'react';
import {View, StyleSheet} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import Layout from '../../../constants/Layout';
import firebase from '../../firebase';
import MenuTabs from '../../MenuTabs';
import Loading from '../../Loading';
import ErrorOrNoData from '../../ErrorOrNoData';
import Mes from './Mes';
import Categoria from './Categoria';
import {userHelper} from '../../../helpers/API';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuTabs: {
    height: 42,
  },
  viewContainer: {
    flex: 1,
  },
  viewPager: {
    width: width,
    height: height - 63 - 73 - 47,
  },
});

class VerPublicaciones extends React.Component {
  constructor(props) {
    super(props);
    this.menu = ['Fecha', 'Categoría'];
    this.state = {
      menuSelection: 0,
      loading: true,
      publicationsList: [],
      filteredList: [],
      listByDate: [],
      error: null,
      filterType: '',
      filter: '',
      lastItem: undefined,
      lastFilteredItem: undefined,
      category: 0,
      refreshing: false,
    };

    this.viewPager = React.createRef(null);
    this.fieldsKeys = {
      seconds: 'seconds',
    };

    this.setMenuSelection = this.setMenuSelection.bind(this);
    this.getFilteredData = this.getFilteredData.bind(this);
    this.filterByDate = this.filterByDate.bind(this);
    this.handlePublicationOptions = this.handlePublicationOptions.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  getPosts = () => {
    userHelper
      .getUserPosts({
        linkname: this.props.linkname,
        lastItem: this.state.lastItem,
      })
      .then(response => {
        this.setState({
          publicationsList: response.data.posts,
          loading: false,
          lastItem: response.data.lastItem,
          refreshing: false,
        });
      })
      .catch(err => {
        this.setState({
          error: err,
          loading: false,
          refreshing: false,
        });
      });
  };

  componentDidMount() {
    this.getPosts();
  }

  setMenuSelection = selection => {
    this.setState({
      menuSelection: selection,
    });
  };

  filterByDate = (data, date, lastItem) => {
    const year = date.getFullYear();
    const dateIndex = date.getMonth();
    let bottomLimit = '';
    let topLimit = '';

    if (date.getDate() === undefined) {
      /* MONTH SEARCH */
      bottomLimit = new Date(year, dateIndex);
      topLimit = new Date(year, dateIndex + 1);
    } else {
      /* DAY SEARCH */
      bottomLimit = new Date(year, dateIndex, date.getDate());
      topLimit = new Date(year, dateIndex, date.getDate() + 1);
    }

    const filteredData = data.filter(
      item =>
        parseInt(`${item.date.seconds}000`, 10) >= bottomLimit &&
        parseInt(`${item.date.seconds}000`, 10) <= topLimit,
    );

    const filter = this.state.filter;
    const changeLastItem = filter === date || filter === undefined;
    this.setState({
      lastFilteredItem: changeLastItem ? lastItem : undefined,
    });

    return filteredData;
  };

  filterByFriend = (data, friend) => {
    const filteredData = data;
    return filteredData;
  };

  filterByLocation = (data, location, lastItem) => {
    const filteredData = data.filter(item => {
      if (item.location.set || item.location.set === null) {
        const itemLocation = item.location.location.split(',')[1].slice(1);
        if (itemLocation === location) {
          return item;
        }
      }
    });

    const filter = this.state.filter;
    const changeLastItem = filter === location || filter === undefined;
    this.setState({
      lastFilteredItem: changeLastItem ? lastItem : undefined,
    });

    return filteredData;
  };

  getFilteredData = (filterType, filter) => {
    this.setState({filteredList: []});
    userHelper
      .getUserPosts({
        linkname: this.props.linkname,
        lastItem: this.state.lastFilteredItem,
      })
      .then(response => {
        let filteredData = [];
        switch (filterType) {
          case 0:
            filteredData = this.filterByDate(
              response.data.posts,
              filter,
              response.data.lastItem,
            );
            break;
          case 1:
            filteredData = this.filterByFriend(
              response.data.posts,
              filter,
              response.data.lastItem,
            );
            break;
          case 2:
            filteredData = this.filterByLocation(
              response.data.posts,
              filter,
              response.data.lastItem,
            );
            break;
        }

        this.setState({
          filteredList: filteredData,
          filterType: filterType,
          filter: filter,
          loading: false,
          refreshing: false,
        });
      })
      .catch(err => {
        this.setState({
          error: err,
          loading: false,
          refreshing: false,
        });
      });
  };

  handlePublicationOptions = (item, deleteItem = false) => {
    if (deleteItem) {
      userHelper
        .deleteUserPosts({ref: item.id})
        .then(response => {
          const localPublications = this.state.publicationsList;
          localPublications.splice(item.index, 1);
          this.setState({
            publicationsList: localPublications,
          });
          console.log(`Document successfully deleted! ${response}`);
        })
        .catch(err => {
          console.log(`Error removing document! ${err}`);
        });
    } else {
      console.log('hideItem');
    }
  };

  getMorePosts = () => {
    userHelper
      .getUserPosts({
        linkname: this.props.linkname,
        lastItem: this.state.lastItem,
      })
      .then(response => {
        const allPosts = [
          ...this.state.publicationsList,
          ...response.data.posts,
        ];
        const uniquePosts = Array.from(new Set(allPosts.map(a => a.id))).map(
          id => {
            return allPosts.find(a => a.id === id);
          },
        );
        this.setState({
          publicationsList: uniquePosts,
          loading: false,
          lastItem: response.data.lastItem,
        });
      })
      .catch(err => {
        console.log('errore: ', err);
        this.setState({
          error: err,
          loading: false,
        });
        console.log(err);
      });
  };

  onEndReached = () => {
    const {menuSelection, category} = this.state;
    if (menuSelection === 1) {
      if (category === 0) {
        this.getMorePosts();
      }
    }
  };

  onRefresh = () => {
    const {menuSelection, category, filterType, filter} = this.state;
    if (menuSelection === 1 && category === 0) {
      this.setState(
        {
          refreshing: true,
          publicationsList: [],
          lastItem: undefined,
        },
        () => {
          this.getPosts();
        },
      );
    } else {
      this.setState(
        {
          refreshing: true,
          filteredList: [],
          lastFilteredItem: undefined,
        },
        () => {
          this.getFilteredData(filterType, filter);
        },
      );
    }
  };

  setCategory = category => {
    this.setState({category: category});
  };

  render() {
    const {
      menuSelection,
      loading,
      error,
      publicationsList,
      filteredList,
      refreshing,
    } = this.state;
    const {personal, updateListInViewOffset} = this.props;
    const menu = this.menu;

    return (
      <View style={styles.mainContainer}>
        {/* MenuTabs */}
        <View style={styles.menuTabs}>
          <MenuTabs
            opciones={menu}
            seleccion={menuSelection}
            seleccionar={page => {
              this.setMenuSelection(page);
              this.viewPager.current.setPage(page);
            }}
            personal={personal}
          />
        </View>

        {/* {loading && <Loading />} */}

        {error && <ErrorOrNoData title={error.title} message={error.message} />}

        {!loading && !error && (
          <ViewPager
            ref={this.viewPager}
            style={styles.viewPager}
            initialPage={0}
            onPageSelected={PageSelectedEvent => {
              this.setMenuSelection(PageSelectedEvent.nativeEvent.position);
            }}>
            <View key="1" style={styles.viewContainer}>
              <Mes
                personal={personal}
                listByDate={filteredList}
                filterByDate={this.getFilteredData}
                handlePublicationOptions={this.handlePublicationOptions}
                updateListInViewOffset={updateListInViewOffset}
                onEndReached={this.onEndReached}
                onRefresh={this.onRefresh}
                refreshing={refreshing}
              />
            </View>
            <View key="2" style={styles.viewContainer}>
              <Categoria
                personal={personal}
                publicationsList={publicationsList}
                filteredList={filteredList}
                filterByCategory={this.getFilteredData}
                handlePublicationOptions={this.handlePublicationOptions}
                updateListInViewOffset={updateListInViewOffset}
                onEndReached={this.onEndReached}
                setCategory={this.setCategory}
                onRefresh={this.onRefresh}
                refreshing={refreshing}
              />
            </View>
          </ViewPager>
        )}
      </View>
    );
  }
}

export default VerPublicaciones;

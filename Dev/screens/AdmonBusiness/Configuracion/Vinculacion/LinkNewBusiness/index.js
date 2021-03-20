import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Layout from '../../../../../constants/Layout';
import Colors from '../../../../../constants/Colors';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';
import Search from '../../../../../components/Search';
import Card from '../../../../../components/Card';
import UserImage from '../../../../../components/UserImage';
import Loading from '../../../../../components/Loading';
import ErrorOrNoData from '../../../../../components/ErrorOrNoData';

/* DATA */
import {cardsLinkingResponse} from '../../../../../testData/dataAdmon';

const width = Layout.window.width;
const height = Layout.window.height - 63;
const itemHeight = 65;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: '100%',
    backgroundColor: 'white',
    // marginTop: -73,
    // alignSelf: 'center',
  },
  /* MY CARDS LIST STYLES */
  myCardsContainer: {
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 5,
    height: 235,
    elevation: 5,
    backgroundColor: 'white',
  },
  myCards: {
    width: width,
    elevation: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myCardsTitle: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginTop: 10,
  },
  myCardsItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
    height: 235,
  },
  /* SEARCH BAR STYLES */
  searchBar: {
    paddingBottom: 0,
    backgroundColor: Colors.grayLight,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    elevation: 1,
  },
  businessListTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    height: 52,
  },
  businessListTitle: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  myContactsList: {
    width: '100%',
    height: height,
  },
  list: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  listHeader: {
    flex: 1,
    width: '100%',
    height: 102,
    backgroundColor: 'white',
  },
  myContactsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: width,
    height: itemHeight,
    marginTop: 5,
    // paddingTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  contactNameContainer: {
    width: 210,
  },
  contactName: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  /* ICON SELECT STYLE */
  iconSelect: {
    marginTop: -10,
    borderRadius: 360,
    backgroundColor: 'white',
    elevation: 1,
  },
  /* CONFIRMATION BUTTON STYLES*/
  confirmationButton: {
    position: 'absolute',
    top: 60,
    width: 150,
    height: 30,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.business,
    borderRadius: 10,
    elevation: 1,
  },
  confirmationButtonText: {
    fontSize: 14,
    color: 'white',
  },
});

class LinkNewBusiness extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myCards: [],
      myContacts: [],
      allContacts: [],
      itemSelected: {},
      showConfirmationButton: false,
      loading: true,
      error: null,
      scrollEnabled: true,
      offsetY: 0,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleItemSelection = this.handleItemSelection.bind(this);
    this.linkConfirmation = this.linkConfirmation.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    const response = cardsLinkingResponse.data;

    if (response) {
      this.setState({
        myCards: response.myCards,
        myContacts: response.contacts,
        allContacts: response.contacts,
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

  /* HANDLE SEARCH */
  handleSearch = searchValue => {
    console.log(searchValue);
    const allContacts = this.state.allContacts;
    let searchResults = [];
    if (searchValue !== '') {
      const contactsFound = allContacts.filter(item =>
        item.nombre.toLowerCase().includes(searchValue.toLowerCase()),
      );
      searchResults = contactsFound;
    } else {
      searchResults = allContacts;
    }

    this.setState({
      myContacts: searchResults,
    });
  };

  /* HANDLE ITEM SELECTION */
  handleItemSelection = item => {
    const itemSelected = this.state.itemSelected;
    let selection = false;

    if (itemSelected.link !== item.link) {
      selection = item;
    }

    this.setState({
      itemSelected: selection,
      showConfirmationButton: selection ? true : false,
    });
  };

  /* LINK CONFIRMATION */
  linkConfirmation = () => {
    const itemSelected = this.state.itemSelected;
    this.props.setLinkToBusinessView(false);

    const errorConfirmation = {
      title: 'There was a problem linking with the business',
      message: 'Try to reload',
    };

    try {
      console.log(`Linking process started with ${itemSelected.nombre}`);
    } catch (error) {
      this.setState({
        error: errorConfirmation,
      });
    }
    this.goBack();
  };

  onScroll = offsetY => {
    this.setState({offsetY: offsetY});
    if (offsetY >= 235) {
      if (this.state.scrollEnabled) {
        this.setState({
          scrollEnabled: false,
        });
      }
    } else {
      this.setState({
        scrollEnabled: true,
      });
    }
  };

  /* GO BACK */
  goBack = () => {
    Navigation.pop(this.props.componentId, {
      component: {
        name: 'my-link.LinkNewBusiness',
      },
    });
  };

  render() {
    const {
      loading,
      error,
      myCards,
      itemSelected,
      myContacts,
      showConfirmationButton,
      scrollEnabled,
    } = this.state;

    return (
      <SafeAreaView style={styles.mainContainer}>
        {/* HEADER */}
        <Header goBack={() => this.goBack()} />

        {loading && <Loading />}

        {error && <ErrorOrNoData title={error.title} message={error.message} />}

        {!loading && !error && (
          <ScrollView
            nestedScrollEnabled={true}
            scrollEnabled={scrollEnabled}
            onScroll={event => {
              const offsetY = event.nativeEvent.contentOffset.y;
              console.log('offsetY: ', offsetY);
              this.onScroll(offsetY);
            }}>
            {/* MI CARDS LIST */}
            <View style={styles.myCardsContainer}>
              <View style={styles.myCards}>
                <Text style={styles.myCardsTitle}>
                  {'Mis tarjetas business'}
                </Text>

                {/* MY CARDS LIST */}
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={myCards}
                  renderItem={({item, index}) => (
                    <View style={styles.myCardsItem}>
                      <Card user={item} width={145} height={145} />
                      <IconSelect
                        item={item}
                        itemSelected={itemSelected}
                        handleItemSelection={this.handleItemSelection}
                      />
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>

            {myContacts.length === 0 && (
              <View>
                <View style={styles.listHeader}>
                  {/* SEARCH */}
                  <View style={styles.searchBar}>
                    <Search obtenerValorBusqueda={this.handleSearch} small />
                  </View>
                  <View style={styles.businessListTitleContainer}>
                    {!showConfirmationButton && (
                      <Text style={styles.businessListTitle}>
                        {'Selecciona el negocio para vincularte'}
                      </Text>
                    )}
                  </View>
                </View>
                <ErrorOrNoData
                  title={'Nothing Found'}
                  message={'Try with another search or try to reload'}
                />
              </View>
            )}

            {/* SELECT BUSINESS TO LINK */}
            {myContacts.length > 0 && (
              <View style={styles.myContactsList}>
                <FlatList
                  nestedScrollEnabled={true}
                  scrollEnabled={!scrollEnabled}
                  data={myContacts}
                  ListHeaderComponent={
                    <View style={styles.listHeader}>
                      {/* SEARCH */}
                      <View style={styles.searchBar}>
                        <Search
                          obtenerValorBusqueda={this.handleSearch}
                          small
                        />
                      </View>
                      <View style={styles.businessListTitleContainer}>
                        {!showConfirmationButton && (
                          <Text style={styles.businessListTitle}>
                            {'Selecciona el negocio para vincularte'}
                          </Text>
                        )}
                      </View>

                      {/* CONFIRMATION BUTTON */}
                      {showConfirmationButton && (
                        <TouchableOpacity
                          style={styles.confirmationButton}
                          activeOpacity={0.5}
                          onPress={this.linkConfirmation}>
                          <Text style={styles.confirmationButtonText}>
                            {'Confirmar'}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  }
                  renderItem={({item, index}) => (
                    <View style={styles.myContactsItem}>
                      <IconSelect
                        item={item}
                        itemSelected={itemSelected}
                        handleItemSelection={this.handleItemSelection}
                      />
                      <UserImage link={item.link} borderRadius={10} />
                      <View style={styles.contactNameContainer}>
                        <Text style={styles.contactName}>{item.nombre}</Text>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  style={styles.list}
                  stickyHeaderIndices={[0]}
                />
              </View>
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}

const IconSelect = ({item, itemSelected, handleItemSelection}) => {
  const selected = item.link === itemSelected.link;

  const borderSelected = {
    borderWidth: 1,
    borderColor: 'white',
  };

  const borderNoSelected = {
    borderWidth: 1,
    borderColor: Colors.gray,
  };

  return (
    <TouchableOpacity
      style={[styles.iconSelect, selected ? borderSelected : borderNoSelected]}
      onPress={() => {
        handleItemSelection(item);
      }}>
      <Icon
        name="check_mark"
        size={22}
        factor={0.8}
        Borderless
        forceColor
        color={'white'}
        background={selected ? Colors.pet : 'white'}
      />
    </TouchableOpacity>
  );
};

export default LinkNewBusiness;

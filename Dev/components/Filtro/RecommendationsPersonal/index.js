import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import ViewPager from '@react-native-community/viewpager';

import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import Text from '../../Text';
import MenuTabs from '../../MenuTabs';
import UserImage from '../../UserImage';
import LugarFechaHora from '../../LugarHoraFecha';
import CategoriesMenu from '../../CategoriesMenu';
import ErrorOrNoData from '../../ErrorOrNoData';

/* DATA */
import {recommendationsPersonalResponse} from '../../../testData/dataAdmon';

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
  categoriesMenu: {
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1.5,
  },
  /* RECOMMENDATION STYLES */
  listContainer: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
  },
  recommendation: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  recommendationContent: {
    width: 210,
    marginLeft: 10,
  },
  recommendationUserName: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginTop: 5,
  },
  recommendationMessage: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 5,
  },
  goToRecommendation: {
    padding: 5,
    marginTop: -5,
  },
  goToRecommendationText: {
    fontSize: 14,
    color: Colors.personal,
  },
});

class RecommendationsPersonal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 0,
      myRecommendations: [],
      categorySelected: false,
      loading: true,
      error: null,
    };

    this.viewPager = React.createRef(null);
    this.menu = ['Todas', 'Categoría'];
    this.setCurrentView = this.setCurrentView.bind(this);
    this.handleCategorySelection = this.handleCategorySelection.bind(this);
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    const response = recommendationsPersonalResponse.data.recommendations;

    if (response) {
      this.setState({
        myRecommendations: response,
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

  /* HANDLE GO TO RECOMMENDATIONS */
  goToRecommendation = item => {
    console.log(`Go to recommendation: ${item.recommended.link}`);
  };

  /* HANDLE CATEGORY SELECTION */
  handleCategorySelection = item => {
    this.setState({categorySelected: item});
    console.log(item);
  };

  setCurrentView = view => {
    this.setState({currentView: view});
  };

  render() {
    const {
      currentView,
      loading,
      error,
      categorySelected,
      myRecommendations,
    } = this.state;
    const {updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        {/* VIEW SELECTOR - TABS MENU */}
        <View style={{height: 44}}>
          <MenuTabs
            opciones={this.menu}
            seleccion={currentView}
            seleccionar={page => {
              this.setCurrentView(page);
              this.viewPager.current.setPage(page);
            }}
            personal
          />
        </View>

        {/* {currentView === 1 && !error && (
          <View style={styles.categoriesMenu}>
            <CategoriesMenu
              categorySelected={categorySelected}
              handleCategorySelection={this.handleCategorySelection}
            />
          </View>
        )} */}

        {loading && (
          <View>
            <Text style={{textAlign: 'center'}}>{'Loading...'}</Text>
          </View>
        )}

        {error && <ErrorOrNoData title={error.title} message={error.message} />}

        {/* RECOMMENDATIONS LIST */}
        {!loading && !error && (
          <ViewPager
            ref={this.viewPager}
            style={styles.viewPager}
            initialPage={0}
            onPageSelected={PageSelectedEvent => {
              console.log('viewPager', Object.keys(this.viewPager.current));
              this.setCurrentView(PageSelectedEvent.nativeEvent.position);
            }}>
            <View style={styles.listContainer} key="1">
              <FlatList
                nestedScrollEnabled={true}
                data={myRecommendations}
                renderItem={({item, index}) => (
                  <Recommendation
                    item={{...item, index}}
                    gotToRecommendation={this.goToRecommendation}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                onMomentumScrollEnd={event => {
                  const offsetY = event.nativeEvent.contentOffset.y;
                  updateListInViewOffset(offsetY);
                }}
              />
            </View>
            <View style={styles.listContainer} key="2">
              <FlatList
                nestedScrollEnabled={true}
                data={myRecommendations}
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
                      <Recommendation
                        item={{...item, index}}
                        gotToRecommendation={this.goToRecommendation}
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
};

const Recommendation = ({item, gotToRecommendation}) => {
  return (
    <View style={styles.recommendation}>
      {/* USER IMAGE */}
      <UserImage link={item.recommended.link} borderRadius={10} />

      {/* RECOMMENDATION CONTENT */}
      <View style={styles.recommendationContent}>
        <Text style={styles.recommendationUserName}>{`${
          item.recommended.nombre
        }`}</Text>
        <Text style={styles.recommendationMessage} numberOfLines={1}>
          {item.message}
        </Text>
        <LugarFechaHora location={item.location} date={item.date} />
      </View>

      {/* GO TO RECOMMENDATION */}
      <TouchableOpacity
        style={styles.goToRecommendation}
        onPress={() => gotToRecommendation(item)}>
        <Text style={styles.goToRecommendationText}>{'más'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecommendationsPersonal;

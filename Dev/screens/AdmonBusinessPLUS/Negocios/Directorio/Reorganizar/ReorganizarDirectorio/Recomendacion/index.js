import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Text from '../../../../../../../components/Text';
import Icon from '../../../../../../../components/Icon';
import Colors from '../../../../../../../constants/Colors';
import Layout from '../../../../../../../constants/Layout';
import UserImage from '../../../../../../../components/UserImage';
import MenuTabs from '../../../../../../../components/MenuTabs';
import LugarHoraFecha from '../../../../../../../components/LugarHoraFecha';
import {Rankin, RankinTop} from '../../../../../../../components/BusinessInfoHeader';
import Loading from '../../../../../../../components/Loading';
import ErrorOrNoData from '../../../../../../../components/ErrorOrNoData';
import InfoHeader from './InfoHeader';



/* DATA */
import {recomendacionesResponse} from '../../../../../../../testData/dataAdmon';

const width = Layout.window.width;
const height = Layout.window.height - 63 - 73;
const itemHeight = 145;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: 1000,
    backgroundColor: 'white',
  },
  /* RECOMMENDATIONS LIST STYLES */
  recommendationsList: {
    width: '100%',
    height: 950,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  listHeader: {
    flex: 1,
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  list: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: Colors.grayLight,
  },
  viewSelectorIcon: {
    position: 'absolute',
    bottom: 0,
    right: 23,
  },
  /* RECOMMENDATION STYLES */
  recommendation: {
    width: width,
    height: itemHeight,
    alignItems: 'center',
    backgroundColor: Colors.grayLight,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    marginBottom: 5,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width,
    height: 40,
    marginTop: 5,
    marginBottom: 5,
  },
  recommendationTipIcon: {
    width: 350,
  },
  recommendationUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  userNameMessage: {
    width: width / 1.8,
    marginLeft: 15,
  },
  userName: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  message: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  recommendationOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: -5,
  },
  recommendationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 80,
  },
  seeRecomendation: {
    width: 75,
    padding: 5,
    marginLeft: 5,
  },
  seeRecomendationText: {
    fontSize: 12,
    color: Colors.personal,
    textAlign: 'center',
  },
  containerTitle: {

  }
});

class Recomendacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendationsdDetails: {},
      myRecommendations: [],
      currentView: 0,
      recommendationSelected: {},
      loading: true,
      error: null,
      scrollEnabled: true,
    };

    this.list = React.createRef(null);
    this.menu = ['Ver todas', 'Más Recientes'];

    this.setCurrentView = this.setCurrentView.bind(this);
    this.getCurrentData = this.getCurrentData.bind(this);
    this.handleThanksRecommendation = this.handleThanksRecommendation.bind(
      this,
    );
    this.handleRecommendationSelection = this.handleRecommendationSelection.bind(
      this,
    );
    this.handleFavStateChange = this.handleFavStateChange.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    const response = recomendacionesResponse.data;

    if (response) {
      this.setState({
        recommendationsdDetails: response.details,
        myRecommendations: response.recommendations,
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

  setCurrentView = selection => {
    this.setState({currentView: selection});
  };

  /* GET CURRENT DATA */
  getCurrentData = () => {
    const {currentView, myRecommendations} = this.state;

    let data = [];
    if (currentView === 0) {
      data = myRecommendations;
    } else {
      data = myRecommendations.filter(item => item.fav);
    }

    return data;
  };

  /* HANDLE THANKS ACTION */
  handleThanksRecommendation = () => {
    console.log('handleThanksRecommendation');
  };

  /* HANDLE RECOMMENDATION SELECTION */
  handleRecommendationSelection = item => {
    this.setState({recommendationSelected: item});
    console.log(`go to recommendation from: ${item.from.link}`);
  };

  /* HANDLE FAV STATE CHANGE */
  handleFavStateChange = recommendation => {
    const {myRecommendations} = this.state;
    const index = myRecommendations.findIndex(
      item => item.id === recommendation.id,
    );

    const errorChangingState = {
      title: 'There was a problem processing the data',
      message: 'Try to reload',
    };

    try {
      myRecommendations[index].fav = !recommendation.fav;
      this.setState({myRecommendations: [...myRecommendations]});
    } catch (error) {
      this.setState({error: errorChangingState});
    }
  };

  onScroll = offsetY => {
    const needsScroll =
      this.list.current.props.data.length * itemHeight > height;

    if (offsetY >= 420 && needsScroll) {
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

  render() {
    const {
      loading,
      error,
      myRecommendations,
      recommendationsdDetails,
      currentView,
      scrollEnabled,
    } = this.state;
    const {user, updateListInViewOffset} = this.props;

    return (
      <SafeAreaView style={styles.mainContainer}>
        {loading && <Loading />}

        {error && <ErrorOrNoData title={error.title} message={error.message} />}

        {/* NO RECOMMENDATIONS CONTENT */}
        {myRecommendations.length === 0 && <View />}

        {/* RECOMMENDATIONS CONTENT */}
        {!loading && !error && (
          <ScrollView
            nestedScrollEnabled={true}
            scrollEnabled={scrollEnabled}
            onScroll={event => {
              const offsetY = event.nativeEvent.contentOffset.y;
              console.log('offsetY: ', offsetY);
              this.onScroll(offsetY);
            }}
            >
            <View style={{width: '100%', height: '5%', backgroundColor: 'red', flexDirection: 'row'}}>
            <View style={{width: '20%', backgroundColor: 'white', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                    name='tip'
                    size={40}
                    factor={1}
                    forceColor
                    Borderless
                    color= {Colors.defaultTextColor}
                />
            </View>
            <View style={{width: '80%', backgroundColor: 'white', alignContent: 'center', justifyContent: 'center'}}>
                <Text style={{color: Colors.defaultTextColor, fontSize:20}}>
                    Recomendaciones
                </Text>
            </View>
            

            </View>
            {/* HEADER */}
            
            {/* MY BUSINESS INFO */}
            {recommendationsdDetails && (
              <InfoHeader user={user} info={recommendationsdDetails} />
            )}


            

            {myRecommendations.length === 0 && (
              <ErrorOrNoData
                title={'Nothing Found'}
                message={'You have no recommendations yet'}
              />
            )}

            {myRecommendations.length > 0 && (
              <View style={styles.recommendationsList}>
                <FlatList
                  ref={this.list}
                  nestedScrollEnabled={true}
                  scrollEnabled={!scrollEnabled}
                  data={this.getCurrentData()}
                  ListHeaderComponent={
                    <View style={styles.listHeader}>
                      <MenuTabs
                        opciones={this.menu}
                        seleccion={currentView}
                        seleccionar={this.setCurrentView}
                        fontSize={14}
                      />

                      
                    </View>
                  }
                  renderItem={({item, index}) => (
                    <Recommendation
                      item={{...item, index}}
                      handleThanksRecommendation={
                        this.handleThanksRecommendation
                      }
                      handleRecommendationSelection={
                        this.handleRecommendationSelection
                      }
                      handleFavStateChange={this.handleFavStateChange}
                    />
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

const Recommendation = ({
  item,
  handleThanksRecommendation,
  handleRecommendationSelection,
  handleFavStateChange,
}) => {
  return (
    <View style={styles.recommendation}>
      {/* RECOMMENDATION HEADER */}
      <View style={styles.recommendationHeader}>
        {/* TIP ICON */}
        <View style={styles.recommendationTipIcon}>
          <Icon
            name="tip"
            size={30}
            factor={1}
            Borderless
            forceColor
            color={Colors.gray}
          />
        </View>

        
      </View>

      {/* USER */}
      <View style={styles.recommendationUser}>
        {/* USER IMAGE */}
        <UserImage link={item.from.link} userSize={55} />

        {/* USER NAME / MESSAGE */}
        <View style={styles.userNameMessage}>
          <Text style={styles.userName}>{`${item.from.nombre} ${
            item.from.apellido_paterno
          }     ${item.from.link}`}</Text>
          <Text style={styles.message}>{'Te recomiendo con...'}</Text>
        </View>

        
      </View>

      {/* RECOMMENDATION DETAILS */}
      <View style={styles.recommendationDetails}>
        <LugarHoraFecha location={item.location} date={item.date} />

        {/* GO TO PUBLICATION */}
        <TouchableOpacity
          style={styles.seeRecomendation}
          onPress={() => handleRecommendationSelection(item)}>
          <Text style={styles.seeRecomendationText}>{'Ver más'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Recomendacion;

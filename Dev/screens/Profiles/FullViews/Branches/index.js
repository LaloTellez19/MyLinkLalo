import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Layout from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Header from '../../../../components/Header';
import ProfilePicture from '../../../../components/ProfilePicture';

const width = Layout.window.width;
const height = Layout.window.height;
const branchHeight = 140;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: '100%',
    backgroundColor: 'white',
  },
  /* TOP CONTAINER STYLES */
  topContainerStyles: {
    height: 240,
    elevation: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  topContainer: {
    width: width,
    height: 25,
    alignItems: 'center',
  },
  topContainerTitle: {
    fontSize: 20,
    color: Colors.defaultTextColor,
  },
  /* GIVE COMPLIMENT STYLES */
  userInfo: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  businessName: {
    fontSize: 20,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  /* BRANCHES LIST */
  branches: {
    width: '100%',
    height: height,
    backgroundColor: 'white',
  },
  branchesList: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  listHeader: {
    height: 50,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    backgroundColor: 'white',
  },
  locationSelector: {
    width: width,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  locationSelectorText: {
    width: '60%',
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 15,
  },
  branch: {
    height: branchHeight,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    paddingTop: 5,
  },
  branchPicture: {
    width: '25%',
    alignItems: 'center',
  },
  branchInfo: {
    width: '60%',
    marginLeft: 5,
    paddingRight: 5,
  },
  branchName: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 10,
    marginBottom: 2,
  },
  branchLocation: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  branchDistance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchDistanceText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  isBranchOpen: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
  },
  promotions: {
    height: 60,
  },
  isOpen: {
    height: 60,
    alignItems: 'center',
    marginTop: 0,
  },
  isOpenText: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    fontSize: 10,
    color: Colors.defaultTextColor,
  },
  saveBranchCard: {
    width: '15%',
  },
  isMatriz: {
    width: width / 6,
    height: 20,
    backgroundColor: Colors.gray,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -10,
    elevation: 5,
  },
  isMatrizText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  /* LOCATIONS LIST STYLES */
  locationsListContainer: {
    width: width,
    position: 'absolute',
    top: 50,
    elevation: 2,
    backgroundColor: 'white',
  },
  locationsList: {
    width: '100%',
    height: height,
  },
  location: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  locationText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
});

class Branches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationSelector: false,
      locationSelected: '',
      allLocations: [],
      filteredBranches: [],
      scrollEnabled: true,
    };

    this.setLocationSelected = this.setLocationSelected.bind(this);
  }

  getLocations = branches => {
    const branchCity = this.props.branchCity;
    const allLocations = [];

    branches.map((branch, index) => {
      if (!allLocations.includes(branch.domicilio.ciudad)) {
        allLocations.push(branch.domicilio.ciudad);
      }
    });

    this.setState({
      allLocations: allLocations,
      locationSelected: branchCity ? branchCity : allLocations[0],
    });
    this.filterBranches(branches, branchCity ? branchCity : allLocations[0]);
  };

  filterBranches = (branches, filter) => {
    const filteredBranches = branches.filter(
      branch => branch.domicilio.ciudad === filter,
    );

    this.setState({filteredBranches: filteredBranches});
  };

  componentDidMount() {
    this.getLocations(this.props.data.branches);
  }

  goBack = () => {
    Navigation.dismissOverlay(this.props.componentId);
  };

  getName = (names, lastNames) => {
    const name = names.concat(lastNames);
    const finalName = name.filter(item => item !== '');
    return finalName.join(' ');
  };

  getLocation = data => {
    return `${data.calle} ${data.colonia} ${data.estado} ${data.ciudad} ${
      data.codigo_postal
    }`;
  };

  setLocationSelector = () => {
    this.setState({locationSelector: !this.state.locationSelector});
  };

  setLocationSelected = selection => {
    this.setState({locationSelected: selection, locationSelector: false});
    this.filterBranches(this.props.data.branches, selection);
  };

  onScroll = offsetY => {
    const needsScroll =
      this.state.filteredBranches.length * branchHeight > height;
    if (offsetY >= 240 && needsScroll) {
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

  checkIfOpen = () => {
    return false;
  };

  checkDistance = () => {
    return 7.2;
  };

  render() {
    const {
      locationSelector,
      allLocations,
      locationSelected,
      filteredBranches,
      scrollEnabled,
    } = this.state;

    const {data} = this.props;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

    const backgroundColor = vipDark
      ? {backgroundColor: 'black'}
      : {backgroundColor: 'white'};

    const backgroundColor_2 = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.grayLight}
      : {color: Colors.defaultTextColor};

    const textColor_2 = vipDark
      ? {color: Colors.silverMetallic}
      : {color: Colors.defaultTextColor};

    const textColor_3 = vipDark
      ? {color: 'white'}
      : {color: Colors.defaultTextColor};

    return (
      <SafeAreaView style={[styles.mainContainer, backgroundColor]}>
        <ScrollView
          nestedScrollEnabled={true}
          scrollEnabled={scrollEnabled}
          onScroll={event => {
            const offsetY = event.nativeEvent.contentOffset.y;
            this.onScroll(offsetY);
          }}>
          <View style={[styles.topContainerStyles, backgroundColor]}>
            <Header
              goBack={() => this.goBack()}
              color={vipDark ? 'black' : 'white'}
            />
            {/* TOP CONTAINER */}
            <View style={styles.topContainer}>
              <Text style={[styles.topContainerTitle, textColor]}>
                {'Sucursales'}
              </Text>
            </View>

            {/* USER INFO */}
            <View style={styles.userInfo}>
              <ProfilePicture
                linkname={data.linkname}
                size={100}
                Business={true}
              />
              <Text style={[styles.businessName, textColor_2]}>
                {this.getName(data.nombre, data.apellido)}
              </Text>
            </View>
          </View>

          <View style={styles.branches}>
            <FlatList
              nestedScrollEnabled={true}
              data={filteredBranches}
              scrollEnabled={!scrollEnabled}
              ListHeaderComponent={
                <View style={[styles.listHeader, backgroundColor_2]}>
                  <TouchableOpacity
                    style={styles.locationSelector}
                    onPress={() => this.setLocationSelector()}>
                    <Text style={[styles.locationSelectorText, textColor_3]}>
                      {locationSelected}
                    </Text>
                    <Icon
                      name={locationSelector ? 'arrow_up' : 'arrow_down'}
                      factor={0.8}
                      Borderless
                    />
                  </TouchableOpacity>
                </View>
              }
              renderItem={({item, index}) => (
                <Branch
                  item={{...item, index}}
                  getName={this.getName}
                  getLocation={this.getLocation}
                  textColors={[textColor, textColor_2, textColor_3]}
                  vipDark={vipDark}
                  checkIfOpen={this.checkIfOpen}
                  checkDistance={this.checkDistance}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              style={[styles.branchesList, backgroundColor]}
              stickyHeaderIndices={[0]}
            />

            {/* LOCATION OPTIONS */}
            {locationSelector && (
              <View style={styles.locationsListContainer}>
                <FlatList
                  data={allLocations}
                  renderItem={({item, index}) => {
                    if (item !== locationSelected) {
                      return (
                        <LocationOption
                          item={item}
                          setLocationSelected={this.setLocationSelected}
                          textColor={textColor_3}
                        />
                      );
                    }
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  style={[styles.locationsList, backgroundColor_2]}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const Branch = ({
  item,
  getName,
  getLocation,
  textColors,
  vipDark,
  checkIfOpen,
  checkDistance,
}) => {
  const isOpen = checkIfOpen(item);
  return (
    <View style={styles.branch}>
      {/* BRANCH PICTURE */}
      <View style={styles.branchPicture}>
        <ProfilePicture
          linkname={item.linkname}
          size={70}
          Business={item.tipo !== 0}
        />
        {item.isMatriz && (
          <View style={styles.isMatriz}>
            <Text style={styles.isMatrizText}>{'Matriz'}</Text>
          </View>
        )}
      </View>

      {/* BRANCH INFO */}
      <View style={styles.branchInfo}>
        <Text style={[styles.branchName, textColors[0]]}>
          {getName([item.nombre], [item.apellido_paterno])}
        </Text>
        <Text style={[styles.branchLocation, textColors[1]]}>
          {getLocation(item.domicilio)}
        </Text>
        <View style={styles.branchDistance}>
          <Icon
            name="location"
            Borderless
            forceColor
            color={vipDark ? 'white' : Colors.gray}
          />
          <Text style={[styles.branchDistanceText, textColors[2]]}>
            {`${checkDistance(item)} km.`}
          </Text>
        </View>
        <View style={styles.isBranchOpen}>
          {item.promotions !== 0 && (
            <View style={styles.promotions}>
              <Icon
                name="brand"
                Borderless
                forceColor
                color={vipDark ? 'white' : Colors.gray}
              />
              <Text>{''}</Text>
            </View>
          )}
          <View style={styles.isOpen}>
            <Icon
              name="clock"
              Borderless
              forceColor
              color={vipDark ? 'white' : isOpen ? Colors.business : Colors.gray}
            />
            <Text
              style={[
                styles.isOpenText,
                {
                  color: vipDark
                    ? 'white'
                    : isOpen
                    ? Colors.business
                    : Colors.defaultTextColor,
                },
              ]}>
              {isOpen ? 'Abierto' : 'Cerrado'}
            </Text>
          </View>
        </View>
      </View>

      {/* RIGHT ICON */}
      <View style={styles.saveBranchCard}>
        <Icon
          name="wallet_save"
          forceColor
          color={'white'}
          background={vipDark ? Colors.jet : Colors.business}
        />
      </View>
    </View>
  );
};

const LocationOption = ({item, setLocationSelected, textColor}) => {
  return (
    <TouchableOpacity
      style={styles.location}
      onPress={() => setLocationSelected(item)}>
      <Text style={[styles.locationText, textColor]}>{item}</Text>
    </TouchableOpacity>
  );
};

export default Branches;

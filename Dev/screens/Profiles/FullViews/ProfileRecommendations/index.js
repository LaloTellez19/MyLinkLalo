import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Layout from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Header from '../../../../components/Header';
import ProfilePicture from '../../../../components/ProfilePicture';
import {Rankin, RankinTop} from '../../../../components/BusinessInfoHeader';

const width = Layout.window.width;
const height = Layout.window.height - 85;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: '100%',
    backgroundColor: 'white',
  },
  /* TOP CONTAINER STYLES */
  topContainer: {
    elevation: 5,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  topContainerTitle: {
    fontSize: 20,
    color: Colors.defaultTextColor,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    marginTop: 10,
    marginBottom: 5,
  },
  profileLink: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginBottom: 10,
  },
  /* MENU STYLES */
  menu: {
    width: width * 0.9,
    height: 70,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  menuItem: {
    width: (width * 0.9) / 3,
    alignItems: 'center',
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  menuItemText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  /* RECOMMENDATIONS LIST */
  listContainer: {
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
    height: 45,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
  },
  /* LIST VIEW ITEMS STYLES */
  listItem: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    paddingTop: 10,
    paddingBottom: 10,
  },
  listItemData: {
    width: '50%',
    marginLeft: 5,
    marginRight: 5,
    // borderWidth: 0.5,
  },
  listItemName: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 5,
  },
  listItemCL: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  listItemLocation: {
    width: '65%',
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  listItemOptions: {
    marginTop: 5,
    marginLeft: 5,
  },
  /* SQUARES VIEW ITEMS STYLES */
  squareItem: {
    width: width / 2 - 10,
    height: 250,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: 'white',
    margin: 5,
  },
  profilePicture: {
    marginTop: 5,
  },
  clockIcon: {
    width: 30,
    height: 30,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 360,
    position: 'absolute',
    bottom: 3,
    right: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  squareItemName: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    marginTop: 5,
    marginBottom: 5,
  },
  squareItemLocation: {
    width: width / 2 - 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  squareItemLocationText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  squareItemRankSave: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  squareItemRank: {
    marginLeft: 5,
    marginRight: 5,
  },
  squareItemSave: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  /* LIST VIEW OPTIONS STYLES */
  listViewOptions: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const recommdata = [
  {
    linkname: '',
    nombre: ['Pujol'],
    domicilio: {
      calle: 'Local 274',
      colonia: 'El Sol',
      estado: 'Hidalgo',
      ciudad: 'Pachuca',
      codigo_postal: '75845',
    },
    ranking: 1,
    recommended: false,
  },
  {
    linkname: '',
    nombre: ['Central'],
    domicilio: {
      calle: 'Local 274',
      colonia: 'El Sol',
      estado: 'Hidalgo',
      ciudad: 'Pachuca',
      codigo_postal: '75845',
    },
    ranking: 2,
    recommended: true,
  },
  {
    linkname: '',
    nombre: ['Hot Restaurant'],
    domicilio: {
      calle: 'Local 274',
      colonia: 'El Sol',
      estado: 'Hidalgo',
      ciudad: 'Pachuca',
      codigo_postal: '75845',
    },
    ranking: 3,
    recommended: true,
  },
  {
    linkname: '',
    nombre: ['Maido'],
    domicilio: {
      calle: 'Local 274',
      colonia: 'El Sol',
      estado: 'Hidalgo',
      ciudad: 'Pachuca',
      codigo_postal: '75845',
    },
    ranking: 4,
    recommended: false,
  },
  {
    linkname: '',
    nombre: ['Eleven Madison'],
    domicilio: {
      calle: 'Local 274',
      colonia: 'El Sol',
      estado: 'Hidalgo',
      ciudad: 'Pachuca',
      codigo_postal: '75845',
    },
    ranking: 5,
    recommended: false,
  },
  {
    linkname: '',
    nombre: ['Pujol'],
    domicilio: {
      calle: 'Local 274',
      colonia: 'El Sol',
      estado: 'Hidalgo',
      ciudad: 'Pachuca',
      codigo_postal: '75845',
    },
    ranking: 6,
    recommended: true,
  },
  {
    linkname: '',
    nombre: ['Central'],
    domicilio: {
      calle: 'Local 274',
      colonia: 'El Sol',
      estado: 'Hidalgo',
      ciudad: 'Pachuca',
      codigo_postal: '75845',
    },
    ranking: 7,
    recommended: true,
  },
  {
    linkname: '',
    nombre: ['Hot Restaurant'],
    domicilio: {
      calle: 'Local 274',
      colonia: 'El Sol',
      estado: 'Hidalgo',
      ciudad: 'Pachuca',
      codigo_postal: '75845',
    },
    ranking: 8,
    recommended: false,
  },
  {
    linkname: '',
    nombre: ['Maido'],
    domicilio: {
      calle: 'Local 274',
      colonia: 'El Sol',
      estado: 'Hidalgo',
      ciudad: 'Pachuca',
      codigo_postal: '75845',
    },
    ranking: 9,
    recommended: false,
  },
  {
    linkname: '',
    nombre: ['Eleven Madison'],
    domicilio: {
      calle: 'Local 274',
      colonia: 'El Sol',
      estado: 'Hidalgo',
      ciudad: 'Pachuca',
      codigo_postal: '75845',
    },
    ranking: 10,
    recommended: true,
  },
];

class ProfileRecommendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: 0,
      viewOption: 0,
      scrollEnabled: true,
      recommendations: [],
    };

    this.menu = [
      {
        icon: 'business',
        text: 'Todos',
      },
      {
        icon: 'unknown',
        text: 'Te ha recomendado',
      },
    ];

    this.listViewOptions = [
      {
        icon: 'list',
      },
      {
        icon: 'squares',
      },
    ];

    this.getName = this.getName.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.checkIfOpen = this.checkIfOpen.bind(this);
  }

  getData = () => {
    this.setState({recommendations: recommdata});
  };

  componentDidMount() {
    console.log('VIPVIP: ', this.props.data.vip);
    this.getData();
  }

  goBack = () => {
    Navigation.dismissOverlay(this.props.componentId);
  };

  getName = (names, lastNames) => {
    const name = names.concat(lastNames);
    const finalName = name.filter(item => item !== '');
    return finalName.join(' ');
  };

  setOptionSelected = option => {
    this.setState({optionSelected: option});
  };

  setViewOption = option => {
    this.setState({viewOption: option});
  };

  getLocation = data => {
    return `${data.calle} ${data.colonia} ${data.estado} ${data.ciudad} ${
      data.codigo_postal
    }`;
  };

  checkIfOpen = data => {};

  onScroll = offsetY => {
    if (offsetY >= 240) {
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
      optionSelected,
      viewOption,
      scrollEnabled,
      recommendations,
    } = this.state;
    const {data} = this.props;
    const vipDark = data.vip === 2;

    const menuBottomBorder = vipDark ? Colors.silverChalice : Colors.personal;
    const viewOptionActive = vipDark ? Colors.gray : Colors.dimGray;
    const viewOptionInactive = vipDark ? Colors.dimGray : Colors.gray;

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
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView
          nestedScrollEnabled={true}
          scrollEnabled={scrollEnabled}
          onScroll={event => {
            const offsetY = event.nativeEvent.contentOffset.y;
            this.onScroll(offsetY);
          }}>
          {/* TOP CONTAINER */}
          <View style={[styles.topContainer, backgroundColor]}>
            <Header goBack={this.goBack} color={vipDark ? 'black' : 'white'} />
            <Text style={[styles.topContainerTitle, textColor]}>
              {'Más recomendaciones de'}
            </Text>
            <ProfilePicture
              linkname={data.linkname}
              size={100}
              Business={data.tipo !== 0}
            />
            <Text style={[styles.profileName, textColor_2]}>
              {this.getName(data.nombre, data.apellido)}
            </Text>
            <Text style={[styles.profileLink, textColor_3]}>{`@${
              data.link
            }`}</Text>

            {/* MENU */}
            <View style={styles.menu}>
              {this.menu.map((item, index) => (
                <TouchableOpacity
                  style={[
                    styles.menuItem,
                    {
                      borderColor:
                        index === optionSelected
                          ? menuBottomBorder
                          : 'transparent',
                    },
                  ]}
                  key={index}
                  onPress={() => this.setOptionSelected(index)}>
                  <Icon
                    name={item.icon}
                    factor={0.8}
                    Borderless
                    color={vipDark ? 'white' : Colors.gray}
                  />
                  <Text style={[styles.menuItemText, textColor]}>
                    {item.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* RECOMMENDATIONS LIST */}
          {/* LIST */}
          {viewOption === 0 && (
            <View style={[styles.listContainer, backgroundColor]}>
              <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={!scrollEnabled}
                data={recommendations}
                ListHeaderComponent={
                  <View style={[styles.listHeader, backgroundColor_2]}>
                    <View style={styles.listViewOptions}>
                      {this.listViewOptions.map((item, index) => (
                        <Icon
                          name={item.icon}
                          key={index}
                          size={50}
                          factor={0.7}
                          Borderless
                          forceColor
                          color={
                            viewOption === index
                              ? viewOptionActive
                              : viewOptionInactive
                          }
                          onPress={() => this.setViewOption(index)}
                        />
                      ))}
                    </View>
                  </View>
                }
                renderItem={({item, index}) => (
                  <ListItem
                    item={{...item, index}}
                    getName={this.getName}
                    checkIfOpen={this.checkIfOpen}
                    getLocation={this.getLocation}
                    textColors={[textColor, textColor_2, textColor_3]}
                    vipDark={vipDark}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                style={[styles.list, backgroundColor]}
                stickyHeaderIndices={[0]}
              />
            </View>
          )}
          {/* SQUARES */}
          {viewOption === 1 && (
            <View style={styles.listContainer}>
              <FlatList
                nestedScrollEnabled={true}
                numColumns={2}
                scrollEnabled={!scrollEnabled}
                data={recommendations}
                ListHeaderComponent={
                  <View style={[styles.listHeader, backgroundColor_2]}>
                    <View style={styles.listViewOptions}>
                      {this.listViewOptions.map((item, index) => (
                        <Icon
                          name={item.icon}
                          key={index}
                          size={50}
                          factor={0.7}
                          Borderless
                          forceColor
                          color={
                            viewOption === index
                              ? viewOptionActive
                              : viewOptionInactive
                          }
                          onPress={() => this.setViewOption(index)}
                        />
                      ))}
                    </View>
                  </View>
                }
                renderItem={({item, index}) => (
                  <SquareItem
                    item={{...item, index}}
                    getName={this.getName}
                    checkIfOpen={this.checkIfOpen}
                    getLocation={this.getLocation}
                    textColors={[textColor, textColor_2, textColor_3]}
                    vipDark={vipDark}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                style={[styles.list, backgroundColor]}
                stickyHeaderIndices={[0]}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const ListItem = ({item, getName, getLocation, textColors, vipDark}) => {
  return (
    <View style={styles.listItem}>
      <ProfilePicture linkname={item.linkname} size={50} Business={true} />
      <View style={styles.listItemData}>
        <Text style={[styles.listItemName, textColors[0]]}>
          {getName(item.nombre, [])}
        </Text>
        <View style={styles.listItemCL}>
          <Icon
            name="clock"
            Borderless
            size={30}
            factor={0.8}
            color={vipDark ? 'white' : Colors.gray}
          />
          <Icon
            name="location"
            Borderless
            size={30}
            factor={0.8}
            color={vipDark ? 'white' : Colors.gray}
          />
          <Text
            style={[styles.listItemLocation, textColors[1]]}
            numberOfLines={2}>
            {getLocation(item.domicilio)}
          </Text>
        </View>
      </View>
      <View>
        {item.ranking <= 5 && (
          <RankinTop
            rankin={item.ranking}
            borderless
            size={45}
            textColor={'white'}
          />
        )}
        {item.ranking > 5 && (
          <Rankin
            rankin={item.ranking}
            borderless
            size={45}
            textColor={'white'}
          />
        )}
      </View>
      <View style={styles.listItemOptions}>
        <Icon
          name={'wallet_save'}
          size={40}
          factor={0.8}
          background={vipDark ? Colors.jet : Colors.business}
          forceColor
          color={vipDark ? Colors.gray : 'white'}
        />
      </View>
    </View>
  );
};

const SquareItem = ({item, getName, getLocation, vipDark, textColors}) => {
  const getBackgroundColor = () => {
    if (item.recommended && vipDark) {
      return 'black';
    } else if (item.recommended && !vipDark) {
      return Colors.grayLight;
    } else if (!item.recommended && vipDark) {
      return Colors.jet;
    } else {
      return 'white';
    }
  };

  return (
    <View style={[styles.squareItem, {backgroundColor: getBackgroundColor()}]}>
      <View style={styles.profilePicture}>
        <ProfilePicture linkname={item.linkname} size={110} Business={true} />
        <View style={styles.clockIcon}>
          <Icon name="clock" Borderless size={30} factor={0.8} />
        </View>
      </View>
      <Text style={[styles.squareItemName, textColors[0]]}>
        {getName(item.nombre, [])}
      </Text>
      <View style={styles.squareItemLocation}>
        <Icon name="location" Borderless size={30} factor={0.8} />
        <Text style={[styles.squareItemLocationText, textColors[0]]}>
          {getLocation(item.domicilio)}
        </Text>
      </View>
      <View style={styles.squareItemRankSave}>
        <View style={styles.squareItemRank}>
          {item.ranking <= 5 && (
            <RankinTop
              rankin={item.ranking}
              borderless
              size={45}
              textColor={vipDark ? 'white' : null}
            />
          )}
          {item.ranking > 5 && (
            <Rankin
              rankin={item.ranking}
              borderless
              size={45}
              textColor={vipDark ? 'white' : null}
            />
          )}
        </View>
        <View style={styles.squareItemSave}>
          <Icon
            name={'wallet_save'}
            size={40}
            factor={0.8}
            background={
              vipDark && item.recommended
                ? Colors.jet
                : vipDark && !item.recommended
                ? 'black'
                : Colors.business
            }
            forceColor
            color={vipDark ? Colors.gray : 'white'}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileRecommendations;

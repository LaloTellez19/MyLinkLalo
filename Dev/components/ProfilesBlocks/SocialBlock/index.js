import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Switch,
  Animated,
} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Icon from '../../Icon';
import Text from '../../Text';
import ProfilePicture from '../../ProfilePicture';
import {IconsArray} from '../../Filtro/AlguienSabe';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    width: width,
    // overflow: 'hidden',
  },
  /* USER INFO STYLES */
  userContainer: {
    alignItems: 'center',
    // elevation: 5,
    paddingTop: 10,
    marginBottom: 0,
    backgroundColor: 'white',
  },
  nameContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  userName: {
    width: 160,
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginRight: 15,
    marginLeft: 15,
  },
  noUserName: {
    width: 160,
  },
  topRightIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
  },
  /* SOCIAL INFO STYLES */
  socialInfo: {
    marginTop: 0,
    marginBottom: 20,
    alignItems: 'center',
  },
  rol: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  userLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userLink: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 10,
  },
  userLinkname: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  /* FOLLOWING INFO  STYLES */
  followingInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followContainer: {
    alignItems: 'center',
    marginRight: 25,
    marginLeft: 25,
  },
  followText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.grayBold,
  },
  followLabel: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  /* SOCIAL SUMMARY STYLES */
  socialSummaryContainer: {
    width: width,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    overflow: 'hidden',
  },
  socialSummaryHeader: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },
  iconsArray: {
    marginLeft: 5,
    marginRight: -10,
  },
  socialSummaryHeaderText: {
    width: width / 1.85,
    marginLeft: 30,
  },
  businesssocialSummaryHeaderText: {
    width: width / 2.3,
    marginLeft: 30,
  },
  personalSummaryHeaderText: {
    width: width / 1.5,
    marginRight: 23,
  },
  darkModeSwitch: {
    alignItems: 'center',
    marginBottom: 5,
  },
  switch: {
    alignItems: 'center',
  },
  categoryOrRol: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  subCategory: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  socialDescriptionContainer: {
    width: width / 1.15,
    marginTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1.5,
    borderColor: Colors.gray,
  },
  socialDescription: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 0,
    marginBottom: 5,
    marginLeft: 5,
    paddingBottom: 5,
  },
  showMore: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  showMoreText: {
    fontSize: 12,
    color: Colors.personal,
  },
  /* SOCIAL LINKS STYLES */
  socialList: {
    width: width,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  socialItem: {
    marginRight: 5,
    marginLeft: 5,
  },
});

class SocialBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      isFavorite: this.props.data.isFavorite,
    };
    this.socialMenu = [
      {
        icon: 'my_link_social',
      },
      {
        icon: 'hashtag_social',
      },
      {
        icon: 'facebook_social',
      },
      {
        icon: 'twitter_social',
      },
      {
        icon: 'instagram_social',
      },
      {
        icon: 'linkedin_social',
      },
      {
        icon: 'youtube_social',
      },
      {
        icon: 'pinterest_social',
      },
    ];

    this.descriptionView = new Animated.Value(30);
  }

  /* HANDLE GO TO SOCIAL LINK */
  handleGoTOSocialLink = link => {
    console.log('link: ', link);
  };

  /* GET DISPLAYED FOLLOWERS */
  getDisplayedFollowers = value => {
    let displayedValue = 0;

    if (value >= 1000 && value < 1000000) {
      displayedValue = `${value / 1000}K`;
    } else if (value >= 1000000) {
      displayedValue = `${value / 1000000}M`;
    } else {
      displayedValue = value;
    }

    return displayedValue;
  };

  getTopIcon = () => {
    const {tipo, vip} = this.props.data;
    let iconName = '';

    switch (tipo) {
      case undefined:
        iconName = vip ? 'vip_personal' : 'personal';
        break;
      case 0:
        iconName = vip ? 'vip_personal' : 'personal';
        break;
      case 1:
        iconName = vip ? 'vip_business' : 'business';
        break;
      case 5:
        iconName = vip ? 'vip_business' : 'business';
        break;
      default:
        iconName = 'ribbon';
        break;
    }

    return iconName;
  };

  getIconColor = () => {
    const {tipo, vip} = this.props.data;
    let color = '';

    switch (tipo) {
      case undefined:
        color = vip ? 'transparent' : Colors.personal;
        break;
      case 0:
        color = vip ? 'transparent' : Colors.personal;
        break;
      case 1:
        color = vip ? 'transparent' : Colors.business;
        break;
      case 5:
        color = vip ? 'transparent' : Colors.business;
        break;
      default:
        color = 'transparent';
        break;
    }

    return color;
  };

  getName = (names, lastNames) => {
    const name = names.concat(lastNames);
    const finalName = name.filter(item => item !== '');
    return finalName.join(' ');
  };

  checkIfSwitchEnabled = () => {
    const {data, setDarkMode} = this.props;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;
    //vip || vipDark
    if (true) {
      return (
        <View style={styles.darkModeSwitch}>
          <Icon
            name={vipDark ? 'star' : 'ribbon'}
            size={20}
            factor={1}
            Borderless
            forceColor
            color={vipDark ? 'white' : 'black'}
          />
          <Switch
            style={styles.switch}
            trackColor={{
              true: Colors.golden,
              false: Colors.golden,
            }}
            thumbColor={data.vip === 2 ? 'white' : 'black'}
            onValueChange={() => {
              setDarkMode(data.vip === 2 ? false : true);
            }}
            value={data.vip === 2}
          />
        </View>
      );
    } else {
      return <View style={styles.darkModeSwitch} />;
    }
  };

  seeMore = show => {
    this.setState({show: show});
    Animated.timing(this.descriptionView, {
      toValue: show ? 150 : 30,
      isInteraction: false,
      useNativeDriver: false,
    }).start();
  };

  setFavorite = favorite => {
    this.setState({isFavorite: favorite});
  };

  render() {
    const {show, isFavorite} = this.state;
    const {data} = this.props;
    const type = data.tipo;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

    /* VIP STYLES */
    const socialDescriptionContainerVIP =
      vip && type === 1 ? {borderColor: 'black'} : {borderColor: Colors.gray};

    /* DARK MODE STYLES */
    const backgroundColor = vipDark
      ? {backgroundColor: 'black'}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.grayLight}
      : {color: Colors.defaultTextColor};

    const textColor_2 = vipDark
      ? {color: Colors.lighterGray}
      : {color: Colors.defaultTextColor};

    const textColor_3 = vipDark
      ? {color: Colors.spanishGray}
      : {color: Colors.defaultTextColor};

    const textColor_4 = vipDark
      ? {color: Colors.platinum}
      : {color: Colors.defaultTextColor};

    const socialIconColor = vipDark ? Colors.davysGray : Colors.grayLight;

    return (
      <View style={styles.mainContainer}>
        {/* USER */}
        <View style={[styles.userContainer, backgroundColor]}>
          <ProfilePicture
            linkname={data.linkname}
            size={135}
            Business={type === 0 || type === undefined ? false : true}
          />
          <View style={styles.nameContainer}>
            <Icon
              name={this.getTopIcon()}
              size={50}
              factor={vip ? 1.1 : vipDark ? 1.1 : 0.8}
              forceColor
              color={'white'}
              Colorless={vip ? true : vipDark ? true : false}
              background={this.getIconColor()}
              Borderless
            />
            {data.nombre !== undefined && (
              <Text style={[styles.userName, textColor]} numberOfLines={2}>
                {this.getName(data.nombre, data.apellido)}
              </Text>
            )}
            {data.nombre === undefined && <View style={styles.noUserName} />}
            <View style={styles.topRightIcon}>
              <Icon
                name="my_link_social"
                size={30}
                factor={0.7}
                forceColor
                color={vipDark ? 'black' : 'white'}
                background={vipDark ? 'white' : 'black'}
              />
              <Icon
                name="star_color"
                Borderless
                forceColor
                color={
                  isFavorite
                    ? Colors.golden
                    : vipDark
                    ? Colors.grayLight
                    : Colors.gray
                }
                onPress={() => this.setFavorite(!isFavorite)}
              />
            </View>
          </View>

          {/* SOCIAL INFO */}
          <View style={styles.socialInfo}>
            {type !== 0 && (
              <Text style={[styles.rol, textColor_2]}>{data.rol}</Text>
            )}
            <View
              style={[
                styles.userLinkContainer,
                {marginTop: type === 0 ? -15 : 0},
              ]}>
              <Text style={[styles.userLink, textColor_2]}>{`@${
                data.link
              }`}</Text>
            </View>
            <Text style={[styles.userLinkname, textColor_2]}>
              {`Linkname: ${data.linkname}`}
            </Text>
          </View>

          {/* FOLLOWING INFO */}
          <View style={styles.followingInfoContainer}>
            {/* FOLLOWERS */}
            <View style={styles.followContainer}>
              <Text style={[styles.followText, textColor_4]}>
                {this.getDisplayedFollowers(data.followers) || 0}
              </Text>
              <Text style={[styles.followLabel, textColor_3]}>
                {'Seguidores'}
              </Text>
            </View>

            {/* FOLLOWING */}
            <View style={styles.followContainer}>
              <Text style={[styles.followText, textColor_4]}>
                {this.getDisplayedFollowers(data.following) || 0}
              </Text>
              <Text style={[styles.followLabel, textColor_3]}>
                {'Siguiendo'}
              </Text>
            </View>
          </View>

          {/* SOCIAL SUMMARY */}
          <View style={styles.socialSummaryContainer}>
            <View style={styles.socialSummaryHeader}>
              {type === 5 && (
                <Icon
                  name={'personal_favorite'}
                  forceColor
                  color={'white'}
                  background={vipDark ? Colors.davysGray : Colors.gray}
                />
              )}
              {type === 1 && (
                <View style={styles.iconsArray}>
                  <IconsArray
                    name={data.category}
                    color={vip ? 'black' : null}
                  />
                </View>
              )}
              <View
                style={
                  type === 1
                    ? styles.businesssocialSummaryHeaderText
                    : type === 0
                    ? styles.personalSummaryHeaderText
                    : styles.socialSummaryHeaderText
                }>
                {type !== 5 && (
                  <Text style={[styles.categoryOrRol, textColor]}>
                    {type === 0 ? data.rol : data.category}
                  </Text>
                )}
                {data.subCategory && (
                  <Text style={[styles.subCategory, textColor_2]}>
                    {data.subCategory}
                  </Text>
                )}
              </View>

              {/* DARK MODE SWITCH */}
              {this.checkIfSwitchEnabled()}
            </View>

            <View
              style={[
                styles.socialDescriptionContainer,
                socialDescriptionContainerVIP,
              ]}>
              {/* DESCRIPTION */}
              <Animated.View style={{height: this.descriptionView}}>
                <Text style={[styles.socialDescription, textColor]}>
                  {data.descripcion}
                </Text>
              </Animated.View>

              <TouchableOpacity
                style={styles.showMore}
                onPress={() => this.seeMore(!show)}>
                <Text
                  style={[
                    styles.showMoreText,
                    {color: vipDark ? Colors.grayLight : Colors.personal},
                  ]}>
                  {show ? 'Ver menos' : 'Ver más'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* SOCIAL LINKS */}
            <SocialLinks
              data={this.socialMenu}
              socialIconColor={socialIconColor}
              type={type}
              vip={vip}
              vipDark={vipDark}
            />
          </View>
        </View>
      </View>
    );
  }
}

function SocialLinks({data, type, vip, vipDark}) {
  const getIconName = (item, index) => {
    if (vipDark) {
      return item.icon;
    } else if (index === 0) {
      return 'my_link_social_color';
    } else {
      return item.icon;
    }
  };

  const getBackgroundColor = () => {
    let color = '';
    if (vip && type === 1) {
      color = 'black';
    } else if (vip && type === 0) {
      color = 'black';
    } else if (vipDark) {
      color = Colors.davysGray;
    } else {
      color = Colors.grayLight;
    }

    return color;
  };

  return (
    <View style={styles.socialList}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => (
          <View style={styles.socialItem}>
            <Icon
              name={getIconName(item, index)}
              size={30}
              factor={index === 0 ? 1 : 0.8}
              forceColor
              color={vip ? 'white' : Colors.gray}
              Colorless={!vipDark && index === 0}
              Borderless
              background={getBackgroundColor()}
              // onPress={() => this.handleGoTOSocialLink(index)}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export {SocialLinks};

export default SocialBlock;

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';
import Icon from '../../Icon';
import {SocialLinks} from '../SocialBlock';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  /* MENU CONTAINER STYLES */
  mainContainer: {
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 5,
    borderTopWidth: 0.3,
    borderColor: Colors.grayBold,
  },
  /* MENU STYLES */
  menu: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  menuItem: {
    width: width / 3.5,
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 11,
    color: Colors.grayBold,
    textAlign: 'center',
    marginTop: -2,
  },
  /* SOCIAL LINKS */
  socialMenu: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  socialMenuItem: {
    marginLeft: 6,
    marginRight: 6,
  },
});

class SocialFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuSelection: {index: 0},
    };

    this.menu = [
      {
        icon: 'chat_bubbles',
        text: 'Publicaciones',
      },
      {
        icon: 'squares',
        text: 'Galería',
      },
      {
        icon: 'tip',
        text: 'Recomendaciones',
      },
    ];

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
    ]
  }

  componentDidMount() {}

  /* HANDLE MENU SELECTION */
  handleMenuSelection = item => {
    console.log(item.index);
    this.setState({
      menuSelection: item,
    });
  };

  /* HANDLE SOCIAL SELECTION */
  handleSocialSelection = item => {
    console.log(item.index);
  };

  render() {
    const {menuSelection} = this.state;
    const {data} = this.props;
    const type = data.tipo;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

    const backgroundColor = vipDark
      ? {backgroundColor: Colors.eerieBlack, borderColor: Colors.grayBold}
      : {backgroundColor: 'white', borderColor: 'transparent'};

    const textColor = vipDark
      ? {color: Colors.gray}
      : {color: Colors.defaultTextColor};

    const socialIconColor = vipDark ? Colors.davysGray : Colors.grayLight;

    const activeMenuItem = vipDark ? 'white' : Colors.business;

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* MENU */}
        <View style={styles.menu}>
          {this.menu.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => this.handleMenuSelection({...item, index})}>
              <Icon
                name={item.icon}
                factor={0.9}
                Borderless
                forceColor
                color={
                  menuSelection.index === index
                    ? activeMenuItem
                    : Colors.dimGray
                }
              />
              <Text
                style={[
                  styles.menuItemText,
                  menuSelection.index === index
                    ? {color: activeMenuItem}
                    : {color: Colors.dimGray},
                ]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* SOCIAL */}
        {menuSelection.index === 0 && (
          <View style={{marginTop: -20, marginBottom: 20}}>
            <SocialLinks
              data={this.socialMenu}
              socialIconColor={socialIconColor}
              type={type}
              vip={vip}
              vipDark={vipDark}
            />
          </View>
        )}
      </View>
    );
  }
}

export default SocialFeed;

import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../../../../../../constants/Colors';
import Layout from '../../../../../../constants/Layout';
import Text from '../../../../../../components/Text';
import Icon from '../../../../../../components/Icon';

const width = Layout.window.width;
const itemWidth = width / 1.1;

/* STYLES */
const styles = StyleSheet.create({
  /* SOCIAL LIST STYLES */
  socialList: {
    width: width,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  socialItem: {
    width: itemWidth,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  socialIcon: {
    width: itemWidth / 4,
    alignItems: 'center',
  },
  socialText: {
    width: itemWidth / 2,
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginLeft: 10,
  },
  emptyBox: {
    width: itemWidth / 4,
    alignItems: 'center',
  },
});

function Social(props) {
  const {index: elementIndex, data, handleSaveChanges} = props;

  /* HANDLE CONNECT TO FACEBOOK */
  const handleConnect = (index, state) => {
    console.log(`Conectar ${index} ${state}`);
  };

  /* SOCIAL DATA */
  const socialData = [
    {
      icon: 'facebook_social_color',
      name: 'Facebook',
      connected: data.facebook,
    },
    {
      icon: 'twitter_social_color',
      name: 'Twitter',
      connected: data.twitter,
    },
    {
      icon: 'instagram_social_color',
      name: 'Instagram',
      connected: data.instagram,
    },
    {
      icon: 'linkedin_social_color',
      name: 'LinkedIn',
      connected: data.linkedin,
    },
    {
      icon: 'youtube_social_color',
      name: 'YouTube',
      connected: data.youtube,
    },
    {
      icon: 'pinterest_social_color',
      name: 'Pinterest',
      connected: data.pinterest,
    },
    {
      icon: 'tiktok_social_color',
      name: 'TikTok',
      connected: data.tiktok,
    },
    {
      icon: 'website_social',
      name: 'Página Web',
      connected: data.web,
    },
    {
      icon: Platform.OS === 'ios' ? 'appstore_social' : 'android_social',
      name: 'Aplicación',
      connected: data.app,
    },
  ];

  return (
    <View>
      {/* SOCIAL LIST */}
      <View style={styles.socialList}>
        {socialData.map((item, index) => (
          <TouchableOpacity
            style={styles.socialItem}
            key={index}
            onPress={() => handleConnect(index, item.connected)}>
            <View style={styles.socialIcon}>
              <Icon
                name={item.icon}
                size={30}
                factor={1}
                Colorless
                Borderless
              />
            </View>
            <Text style={styles.socialText}>{`${
              item.connected ? 'Desconectar' : 'Conectar'
            } ${item.name}`}</Text>
            <View style={styles.emptyBox} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default Social;

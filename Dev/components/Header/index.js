import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import Icon from '../Icon';
import Colors from '../../constants/Colors';
import IconPack from '../../constants/IconPack';
import Layout from '../../constants/Layout';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  general: {
    width: '100%',
    height: 63,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  arrow_left: {
    width: width / 3,
  },
  logo: {
    width: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  logo_img: {
    width: width / 3,
    justifyContent: 'center',
    height: 30,
  },
  empty_box: {
    width: width / 3,
  },
});

function Header(props) {
  const {color, elevation} = props;

  const goBack = () => {
    props.goBack();
  };

  return (
    <View style={[styles.general, {backgroundColor: color ? color : 'white'}]}>
      <View style={styles.arrow_left}>
        <Icon
          size={60}
          Borderless
          name="arrow_left"
          forceColor
          color={Colors.gray}
          onPress={() => goBack()}
        />
      </View>
      <View style={styles.logo}>
        <Image style={styles.logo_img} source={IconPack.my_link_logo} />
      </View>
      <View style={styles.empty_box} />
    </View>
  );
}

export default Header;

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import Text from '../../Text';
import Icon from '../../Icon';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: 60,
    elevation: 2,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
  },
  followContainer: {
    width: width / 2.5,
    height: 30,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    marginTop: 15,
  },
  followText: {
    width: width / 4.3,
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginLeft: -5,
    marginRight: 10,
  },
});

function FollowBlock(props) {
  const {following, vip} = props.data;
  const [followState, setFollowState] = React.useState(following);
  const vipDark = vip === 2;

  const backgroundColor = vipDark
    ? {backgroundColor: Colors.jet}
    : {backgroundColor: 'white'};

  const followButton = vipDark
    ? {borderColor: Colors.grayLight, backgroundColor: Colors.eerieBlack}
    : {borderColor: Colors.gray, backgroundColor: 'transparent'};

  const textColor = vipDark
    ? {color: Colors.grayLight}
    : {color: Colors.defaultTextColor};

  return (
    <View style={[styles.mainContainer, backgroundColor]}>
      <TouchableOpacity
        style={[styles.followContainer, followButton]}
        onPress={() => setFollowState(!followState)}>
        <Icon
          name="people_check_mark"
          Borderless
          forceColor
          color={vipDark ? 'white' : Colors.gray}
        />
        <Text style={[styles.followText, textColor]}>
          {followState ? 'Siguiendo' : 'Seguir'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default FollowBlock;

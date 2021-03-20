import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../../constants/Colors';
import UserImage from '../UserImage';
import Text from '../Text';

/* DATA */
import {users} from '../../testData/dataAdmon';

/* STYLES */
const styles = StyleSheet.create({
  /* AMIGOS taggedS STYLES */
  tagged: {
    width: 140,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 5,
    paddingTop: 5,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderBottomRightRadius: 0,
    backgroundColor: 'white',
  },
  taggedVip: {
    backgroundColor: 'black',
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  taggedBusiness: {
    backgroundColor: Colors.business,
  },
  taggedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  taggedText: {
    width: 60,
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginLeft: 10,
    textAlign: 'center',
  },
  /* TAGGED FRIEND OPTION STYLES */
  taggedFriendOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    padding: 11,
  },
  taggedFriendOptionText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginLeft: 20,
  },
});

function TaggedFriend(props) {
  const {item} = props;

  /* SEARCH USER */
  const user = users[`${item}`];

  return (
    <View
      style={[
        styles.tagged,
        user.vip
          ? styles.taggedVip
          : user.business
          ? styles.taggedBusiness
          : null,
      ]}>
      <View style={styles.taggedItem}>
        <UserImage
          link={item}
          userSize={45}
          countrySize={25}
          left={35}
          borderRadius={user.business ? 10 : 100}
        />
        <Text
          style={[
            styles.taggedText,
            user.vip || user.business ? {color: 'white'} : null,
          ]}>{`${user.nombre} ${user.apellido_paterno || ''}`}</Text>
      </View>
    </View>
  );
}

const TaggedFriendOption = ({item, setFiltroSeleccionado}) => {
  /* SEARCH USER */
  const user = users[`${item}`];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.taggedFriendOption}
      onPress={() => setFiltroSeleccionado(user.link)}>
      <UserImage link={user.link} borderRadius={user.business ? 10 : 100} />
      <Text style={styles.taggedFriendOptionText}>{`${
        user.nombre
      } ${user.apellido_paterno || ''}`}</Text>
    </TouchableOpacity>
  );
};

export {TaggedFriendOption};

export default TaggedFriend;

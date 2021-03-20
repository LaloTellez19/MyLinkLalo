import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

/* STYLES */
const styles = StyleSheet.create({
  usersList: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  userImageContainer: {
    position: 'absolute',
    height: 40,
    width: 40,
    elevation: 1,
    borderRadius: 100,
  },
  userImage: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 100,
  },
});

function UsersArray(props) {
  const users = props.users;
  const posiciones = [55, 35, 15];

  return (
    <View style={styles.usersList}>
      {users.map((item, index) => {
        return (
          <View
            style={[styles.userImageContainer, {right: posiciones[index]}]}
            key={index}>
            <Image style={styles.userImage} source={{uri: item.foto}} />
          </View>
        );
      })}
    </View>
  );
}

export default UsersArray;

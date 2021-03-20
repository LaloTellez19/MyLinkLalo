import React from 'react';
import {View, StyleSheet} from 'react-native';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import Text from '../Text';
import Icon from '../Icon';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  /* ESTILOS SELECCION DE PERFIL */
  profileSelector: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.grayLight,
  },
  profileName: {
    width: 140,
    height: 35,
    borderRadius: 13,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.personal,
  },
  profileSelectorText: {
    fontSize: 19,
    color: Colors.grayLight,
  },
});

function ProfileSelector(props) {
  const {profiles, profile, handleProfileChange} = props;
  const lastIndex = profiles.length - 1;
  const [profileSelected, setProfileSelected] = React.useState({});

  React.useEffect(() => {
    setProfileSelected(profile || {...profiles[0], index: 0});
  }, [profiles]);

  /* HANDLE PROFILE CHANGE */
  const changeProfile = next => {
    let index = profileSelected.index;
    !next ? (index -= 1) : (index += 1);

    const newIndex = Math.min(Math.max(index, 0), lastIndex);
    const item = {...profiles[newIndex], index: newIndex};
    setProfileSelected(item);
    handleProfileChange(item);
  };

  return (
    <View style={styles.profileSelector}>
      <Icon
        name="arrow_left"
        size={60}
        Borderless
        forceColor
        color={Colors.gray}
        onPress={() => changeProfile(false)}
      />
      <View style={styles.profileName}>
        <Text style={styles.profileSelectorText}>{profileSelected.name}</Text>
      </View>
      <Icon
        name="arrow_right"
        size={60}
        Borderless
        forceColor
        color={Colors.gray}
        onPress={() => changeProfile(true)}
      />
    </View>
  );
}

export default ProfileSelector;

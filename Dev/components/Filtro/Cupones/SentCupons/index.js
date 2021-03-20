import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Text from '../../../Text';
import Icon from '../../../Icon';
import Search from '../../../Search';
import UserImage from '../../../UserImage';
import LugarHoraFecha from '../../../LugarHoraFecha';
import ErrorOrNoData from '../../../ErrorOrNoData';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  /* CUPOUNS LIST STYLES */
  cupounsList: {
    alignItems: 'center',
    width: width,
    height: height * 0.65,
    marginTop: 20,
    paddingBottom: 25,
  },
  /* CUPOUN STYLES */
  cupoun: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    paddingTop: 10,
    paddingBottom: 5,
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
  },
  cupounInfo: {
    width: width / 1.8,
    marginLeft: 15,
    marginRight: -10,
    marginBottom: 5,
  },
  cupounUserName: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  /* CUPOUNS DETAILS STYLES */
  cupounDetails: {
    position: 'absolute',
    top: 25,
    right: 15,
    width: 330,
    height: 200,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
  },
  cupounDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cupounDetailsHeaderText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    width: 250,
    marginTop: 5,
    marginLeft: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 7,
  },
});

function SentCupons(props) {
  const {cupounsList, personal} = props;

  const [cupounSelected, setCupounSelected] = React.useState(false);
  const [seeCupoun, setSeeCupoun] = React.useState(false);

  return (
    <View>
      {cupounsList.length === 0 && (
        <ErrorOrNoData
          title={'Nothing Found'}
          message={'Try with another search or try to reload'}
        />
      )}

      <View style={styles.cupounsList}>
        <FlatList
          nestedScrollEnabled={true}
          data={cupounsList}
          renderItem={({item, index}) => (
            <CupounItem
              item={{...item, index}}
              personal={personal}
              onPress={() => {
                setSeeCupoun(true);
                setCupounSelected(item);
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* VER CUPON */}
      {seeCupoun && (
        <CupounDetailsView
          item={cupounSelected}
          onPress={() => () => setSeeCupoun(false)}
        />
      )}
    </View>
  );
}

const CupounItem = ({item, personal, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.cupoun}
      onPress={onPress}
      activeOpacity={0.8}>
      {/* CUPOUN USER */}
      <UserImage link={item.link} userSize={55} />

      {/* CUPOUN INFO */}
      <View style={styles.cupounInfo}>
        <Text style={styles.cupounUserName}>{`Cupón enviado a:  ${
          item.nombre
        } ${item.apellido_paterno}`}</Text>
        <LugarHoraFecha item={item} />
      </View>

      {/* CUPOUN ICON */}
      <Icon
        name="cupon"
        background={personal ? Colors.personal : Colors.business}
      />
    </TouchableOpacity>
  );
};

const CupounDetailsView = ({item, onPress}) => {
  return (
    <View style={styles.cupounDetails}>
      <View style={styles.cupounDetailsHeader}>
        <Text style={styles.cupounDetailsHeaderText}>{`Cupón enviado a:  ${
          item.nombre
        } ${item.apellido_paterno}`}</Text>
        <View style={styles.closeIcon}>
          <Icon
            name="times"
            size={25}
            factor={0.8}
            background={Colors.gray}
            onPress={onPress()}
          />
        </View>
      </View>
    </View>
  );
};

export default SentCupons;

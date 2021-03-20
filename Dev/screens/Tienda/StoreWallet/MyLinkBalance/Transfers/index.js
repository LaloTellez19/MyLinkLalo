import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';
import UserImage from '../../../../../components/UserImage';

/* DATA */
import {transfersResponse} from '../../../data';

const width = Layout.window.width;
const height = Layout.window.height - 40;

/* STYLES */
const styles = StyleSheet.create({
  /* OPTIONS STYLES */
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    height: 80,
    marginTop: 5,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    paddingLeft: 20,
  },
  cardText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    paddingLeft: 20,
  },
  /* HEADER STYLES */
  header: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  myBonusesTitle: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myBonusesTitleText: {
    fontSize: 20,
    color: Colors.defaultTextColor,
  },
  /* TRANSFERS LIST STYLES */
  transfersList: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  transfersItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 80,
  },
  transfersTextContainer: {
    width: 120,
    marginLeft: 10,
  },
  transferUserName: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  transfersItemText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
});

function Transfers(props) {
  const [myTransfers, setMyTransfers] = React.useState([]);

  /* COMPONENTDISMOUNT */
  React.useEffect(() => {
    setMyTransfers(transfersResponse.data.transfers);
  }, []);

  /* SEND BONUS */
  const sendBonus = () => {
    console.log('SEND BONUS');
  };

  /* REQUEST BONUS */
  const requestBonus = () => {
    console.log('REQUEST BONUS');
  };

  const options = [
    {
      icon: 'cat_finance',
      text: 'Enviar bono',
      onPress: () => sendBonus(),
    },
    {
      icon: 'cat_finance',
      text: 'Solicitar bono',
      onPress: () => requestBonus(),
    },
  ];

  return (
    <View style={{flex: 1}}>
      {/* MY TRANSFERS */}
      <View style={styles.transfersList}>
        {/* TRANSFERS LIST */}
        <FlatList
          nestedScrollEnabled={true}
          data={myTransfers}
          ListHeaderComponent={
            <View style={styles.header}>
              {/* OPTIONS */}
              <TransferOptions options={options} />
              <View style={styles.myBonusesTitle}>
                <Text style={styles.myBonusesTitleText}>{'Mis Bonos'}</Text>
              </View>
            </View>
          }
          renderItem={({item, index}) => (
            <TransfersItem item={{...item, index}} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const TransferOptions = ({options}) => {
  return (
    <View>
      {options.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.card}
            key={index}
            onPress={item.onPress}>
            <Icon
              name={item.icon}
              factor={0.8}
              forceColor
              color={Colors.gray}
            />
            <Text style={styles.cardText}>{item.text}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TransfersItem = ({item}) => {
  return (
    <View style={styles.transfersItem}>
      <UserImage link={item.user.link} />
      <View style={styles.transfersTextContainer}>
        <Text style={styles.transferUserName}>{`${item.user.nombre} ${
          item.user.apellido_paterno
        }`}</Text>
        <Text style={styles.transfersItemText}>{`${
          item.sent ? 'Enviaste' : 'Recibiste'
        } un bono`}</Text>
      </View>
      <Icon
        factor={0.8}
        name="cat_finance"
        forceColor
        color={item.sent ? Colors.gray : Colors.pet}
        Borderless
      />
      <Icon
        factor={0.8}
        name="arrow_right"
        forceColor
        color={Colors.gray}
        Borderless
      />
    </View>
  );
};

export default Transfers;

import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';
import MoneyAmountSelector from '../../../../../components/MoneyAmountSelector';

import {Navigation} from 'react-native-navigation';

import {CardsList, BalanceButton, AddCardButton} from '../index';
import {InputField} from '../AddCard';

const width = Layout.window.width;
const height = Layout.window.height - 195;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    elevation: 1,
    backgroundColor: 'white',
  },
  /* HEADER STYLES */
  header: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  title: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  /* BALANCE SELECTOR STYLES */
  amountSelector: {
    marginTop: -15,
    marginBottom: 15,
  },
  numberHash: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    marginRight: 20,
  },
  /* MESSAGE STYLES */
  message: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.grayLight,
    paddingTop: 10,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    paddingRight: 15,
    paddingLeft: 15,
    textAlign: 'justify',
  },
  /* CARDS LIST */
  cardsList: {
    marginTop: 25,
    marginBottom: 0,
  },
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 300,
    marginTop: 5,
  },
  addCardText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    width: 200,
    textAlign: 'right',
  },
  /* NOTIFICATION STYLES */
  notification: {
    width: width,
    height: 75,
    backgroundColor: 'white',
    position: 'absolute',
    top: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
  },
  notificationText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
});

function AddMyLinkBalance(props) {
  const {cards, setAddCard, setAddMyLinkBalance, updateBalance} = props;
  const [newBalance, setNewBalance] = React.useState({
    amount: 0,
    card: false,
  });
  const [indexSelectedCard, setIndexSelectedCard] = React.useState(false);
  const [notification, setNotification] = React.useState(false);

  /* SELECT CARD */
  const handleCardSelection = (card, index) => {
    setIndexSelectedCard(index);
    newBalance.card = card;
    setNewBalance({...newBalance});
  };

  /* AMOUNT CHANGES */
  const handleAmountChanges = value => {
    newBalance.amount = value;
    setNewBalance({...newBalance});
  };

  /* ADD TO MY LINK BALANCE */
  const addBalance = () => {
    console.log(newBalance);
    setAddMyLinkBalance(false);
    updateBalance(parseFloat(newBalance.amount));
  };

  /* GO BACK */
  const goBack = () => {
    Navigation.pop(props.componentId, {
      component: {
        name: 'my-link.AddMyLinkBalance',
      },
    });
  };

  return (
    <View style={styles.mainContainer}>
      {/* HEADER */}
      <Header goBack={() => goBack()} />

      <View style={styles.header}>
        <Text style={styles.title}>{'Agregar Saldo My - Link'}</Text>
      </View>

      <CardsList
        data={cards}
        touchable
        onPress={handleCardSelection}
        indexSelectedCard={indexSelectedCard}
        onTouchStart={() => setNotification(false)}
        header={
          <View>
            {/* AMOUNT SELECTOR */}
            <View style={styles.amountSelector}>
              <MoneyAmountSelector getSelectorValue={handleAmountChanges} />
            </View>

            {/* MESSAGE */}
            <View style={styles.message}>
              <Text style={styles.messageText}>
                {
                  'Solo puedes agregar una cantidad entre $1 y $50 dólares en una sola transacción de saldo My-Link, con un máximo de 2 transacciones de $25 dólares para un total de $50 dólares de recarga cada 24 horas.'
                }
              </Text>
            </View>
          </View>
        }>
        <View>
          {/* ADD CARD */}
          <AddCardButton
            onPress={() => {
              setAddCard();
            }}
          />
          {/* ADD BUTTON */}
          <BalanceButton
            text={'Agregar saldo'}
            onPress={() => {
              const infoCompleted =
                newBalance.card !== false && newBalance.amount !== 0;

              if (infoCompleted) {
                addBalance();
                goBack();
              } else {
                setNotification(true);
              }
            }}
          />
        </View>
      </CardsList>

      {/* NOTIFICATION */}
      {notification && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>
            {newBalance.amount === 0
              ? 'Por favor indica una cantidad para tu saldo'
              : 'Por favor seleccióna una tarjeta'}
          </Text>
        </View>
      )}
    </View>
  );
}

export default AddMyLinkBalance;

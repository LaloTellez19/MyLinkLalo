import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Header from '../../../../components/Header';
import Text from '../../../../components/Text';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

import AddCard from '../MyLinkBalance/AddCard';
import {CardsList, AddCardButton} from '../MyLinkBalance';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  /* NO CARDS STYLES */
  noCards: {
    alignItems: 'center',
  },
  noCardsImage: {
    height: 250,
    width: width,
  },
  noCardsTextContainer: {
    marginTop: 10,
    // borderBottomWidth: 0.5,
    // borderColor: Colors.gray,
  },
  noCardsTitle: {
    fontSize: 20,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginBottom: 10,
  },
  noCardsText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'justify',
    marginBottom: 15,
    paddingRight: 30,
    paddingLeft: 30,
  },
  /* ADD CARDS STYLES */
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: 300,
    marginTop: 25,
  },
  cardText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  /* MY CARDS LIST STYLES */
  myCards: {
    alignItems: 'center',
  },
  myCardsImage: {
    height: 250,
    width: width,
  },
  myCardsTextContainer: {
    marginTop: 15,
  },
  myCardsTitle: {
    fontSize: 20,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginBottom: 10,
  },
  addToCardsList: {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 5,
    borderTopWidth: 0.5,
    color: Colors.gray,
  },
});

/* IMG */
const noCardsImg = require('../../../../assets/images/store/cards.png');
const cardsImg = require('../../../../assets/images/store/card.png');

function MyCards(props) {
  const {saveNewCard, myCards, errorCards} = props;
  const [addCard, setAddCard] = React.useState(false);

  /* HANDLE NEW CARD ADDED */
  const handleNewCardAdded = cardInfo => {
    saveNewCard(cardInfo);
    setAddCard(false);
  };

  /* GO BACK */
  const goBack = () => {
    Navigation.pop(props.componentId, {
      component: {
        name: 'my-link.MyCards',
      },
    });
  };

  const goToAddCard = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'my-link.AddCard',
        passProps: {
          handleNewCardAdded: handleNewCardAdded,
          fullHeight: true,
        },
      },
    });
  };

  return (
    <View style={{flex: 1}}>
      {/* HEADER */}
      <Header goBack={() => goBack()} />

      {errorCards && (
        <ErrorOrNoData title={errorCards.title} message={errorCards.message} />
      )}

      {/* NO CARDS */}
      {myCards.length === 0 && !addCard && !errorCards && (
        <View>
          <View style={styles.noCards}>
            <Image style={styles.noCardsImage} source={noCardsImg} />
            <View style={styles.noCardsTextContainer}>
              <Text style={styles.noCardsTitle}>{'Aún no hay nada aquí'}</Text>
              <Text style={styles.noCardsText}>
                {'Usa tus tarjetas en My-Link y las guardaremos por ti.'}
              </Text>
            </View>
          </View>
          {/* ADD CARD */}
          <View style={styles.addToCardsList}>
            <AddCardButton setAddCard={() => goToAddCard()} />
          </View>
        </View>
      )}

      {/* MY CARDS */}
      {myCards.length !== 0 && !addCard && !errorCards && (
        <CardsList
          data={myCards}
          header={
            <View style={styles.myCards}>
              <Image style={styles.myCardsImage} source={cardsImg} />
              <View style={styles.myCardsTextContainer}>
                <Text style={styles.myCardsTitle}>{'Mis tarjetas'}</Text>
              </View>
            </View>
          }>
          <View style={styles.addToCardsList}>
            {/* ADD CARD */}
            <AddCardButton
              onPress={() => {
                goToAddCard();
              }}
            />
          </View>
        </CardsList>
      )}

      {/* ADD CARD VIEW */}
      {/* {addCard && (
        <AddCard handleNewCardAdded={handleNewCardAdded} fullHeight />
      )} */}
    </View>
  );
}

export default MyCards;

import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Header from '../../../../components/Header';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import MenuTabs from '../../../../components/MenuTabs';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

import {ImageHeader} from '../../StoreComponents';
import AddCard from './AddCard';
import AddMyLinkBalance from './AddMyLinkBalance';
import Transfers from './Transfers';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: 'white',
  },
  menuTabsContainer: {
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  /* BALANCE TITLES STYLES */
  balanceTitle: {
    height: 45,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  balanceTitleText: {
    fontSize: 20,
    color: Colors.defaultTextColor,
  },
  /* ADD CARDS STYLES */
  addCard: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    alignItems: 'center',
  },
  addCardTitle: {
    fontSize: 18,
    color: Colors.grayBold,
    textAlign: 'center',
  },
  addCardMessage: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
  },
  /* AVAILABLE STYLES */
  availableContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  availableTitle: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginBottom: 20,
  },
  availableTotalContainer: {
    minWidth: 200,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  availableTotal: {
    fontSize: 20,
    color: Colors.grayBold,
    paddingTop: 5,
    paddingBottom: 5,
  },
  /* BUTTONS STYLES */
  buttonsContainer: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.personal,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
    marginRight: 60,
    marginLeft: 60,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    padding: 10,
  },
  /* CARDS LIST */
  cardsList: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '85%',
    paddingTop: 5,
    paddingBottom: 5,
  },
  cardTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 200,
  },
  cardText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginRight: 5,
  },
  cardType: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    width: 50,
    textAlign: 'center',
  },
  cardNumber: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  cardSelected: {
    backgroundColor: Colors.grayLight,
    borderRadius: 10,
  },
  /* ADD CARD STYLES */
  addCardButton: {
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  addCardButtonText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    width: 200,
    textAlign: 'right',
  },
});

/* IMG */
const headerImg = require('../../../../assets/images/store/coins.png');

const menu = ['Mi saldo', 'Transferencias'];

function MyLinkBalance(props) {
  const {balance, saveNewCard, cards, errorCards} = props;
  const [optionSelected, setOptionSelected] = React.useState(0);
  const [addCard, setAddCard] = React.useState(false);
  const [addMyLinkBalance, setAddMyLinkBalance] = React.useState(false);

  React.useEffect(() => {
    console.log('CARDS CHANGED: ', cards.length);
    updateAddMyLinkBalanceView();
  }, [cards]);

  /* HANDLE NEW CARD ADDED */
  const handleNewCardAdded = cardInfo => {
    saveNewCard(cardInfo);
    setAddCard(false);
  };

  /* UPDATE BALANCE */
  const updateBalance = value => {
    console.log('value: ', value);
    props.updateBalance(value);
  };

  /* GO BACK */
  const goBack = () => {
    Navigation.pop(props.componentId, {
      component: {
        name: 'my-link.MyLinkBalance',
      },
    });
  };

  const goToAddCard = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'my-link.AddCard',
        passProps: {
          handleNewCardAdded: handleNewCardAdded,
          fullHeight: false,
        },
      },
    });
  };

  const goToAddMyLinkBalance = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'my-link.AddMyLinkBalance',
        id: 'ADDMYLINKBALANCE_ID',
        passProps: {
          cards: cards,
          setAddCard: goToAddCard,
          setAddMyLinkBalance: setAddMyLinkBalance,
          updateBalance: value => updateBalance(value),
        },
      },
    });
  };

  const updateAddMyLinkBalanceView = () => {
    Navigation.updateProps('ADDMYLINKBALANCE_ID', {
      cards: cards,
      setAddCard: goToAddCard,
      setAddMyLinkBalance: setAddMyLinkBalance,
      updateBalance: value => updateBalance(value),
    });
  };

  return (
    <View style={styles.mainContainer}>
      {/* HEADER */}
      <Header goBack={() => goBack()} />

      {/* IMAGE HEADER */}
      <ImageHeader uri={false} img={headerImg} />

      {errorCards && (
        <ErrorOrNoData title={errorCards.title} message={errorCards.message} />
      )}

      {!errorCards && (
        <View style={{flex: 1}}>
          {/* MENU */}
          <View style={styles.menuTabsContainer}>
            <MenuTabs
              opciones={menu}
              seleccion={optionSelected}
              seleccionar={setOptionSelected}
              personal
              fontSize={14}
            />
          </View>

          {/* MY LINK TRANSFERS */}
          {optionSelected === 1 && <Transfers />}

          {/* MY LINK BALANCE */}
          {optionSelected === 0 && (
            <View style={{flex: 1}}>
              {/* BALANCE TITLE */}
              <View style={styles.balanceTitle}>
                <Text style={styles.balanceTitleText}>{'Saldo My-Link'}</Text>
              </View>

              {cards.length === 0 && (
                <View>
                  <Text style={styles.addCardTitle}>
                    {'Asociar tarjeta de débito o de crédito'}
                  </Text>
                  <Text style={styles.addCardMessage}>
                    {
                      'Mantenga la información de sus tarjetas protegida al realizar compras en línea'
                    }
                  </Text>
                </View>
              )}

              {cards.length !== 0 && (
                <CardsList
                  data={cards}
                  children={
                    <View>
                      <AddCardButton
                        onPress={() => {
                          goToAddCard();
                          setAddMyLinkBalance(false);
                        }}
                      />
                      {/* AVAILABLE */}
                      <View style={styles.availableContainer}>
                        <Text style={styles.availableTitle}>
                          {'Disponible'}
                        </Text>
                        <View style={styles.availableTotalContainer}>
                          <Text style={styles.availableTotal}>{`$ ${
                            balance.total
                          } ${balance.currency}`}</Text>
                        </View>
                      </View>
                      {/* BUTTONS CONTAINER */}
                      <View style={styles.buttonsContainer}>
                        {/* ADD MY LINK BALANCE */}
                        <BalanceButton
                          text={'Agregar saldo'}
                          onPress={() => goToAddMyLinkBalance()}
                        />
                      </View>
                    </View>
                  }
                />
              )}
            </View>
          )}
        </View>
      )}

      {/* ADD MY LINK BALANCE VIEW */}
      {/* {addMyLinkBalance && (
        <AddMyLinkBalance
          cards={cards}
          setAddCard={() => goToAddCard()}
          setAddMyLinkBalance={setAddMyLinkBalance}
          updateBalance={updateBalance}
        />
      )} */}

      {/* ADD CARD VIEW */}
      {/* {addCard && <AddCard handleNewCardAdded={handleNewCardAdded} />} */}
    </View>
  );
}

const BalanceButton = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const CardsList = ({
  data,
  header,
  children,
  touchable,
  onPress,
  indexSelectedCard,
  onTouchStart,
}) => {
  const CardItem = touchable ? TouchableOpacity : View;

  return (
    <View style={styles.cardsList}>
      <FlatList
        nestedScrollEnabled={true}
        data={data}
        onTouchStart={onTouchStart}
        renderItem={({item, index}) => (
          <CardItem
            style={[
              styles.card,
              indexSelectedCard === index ? styles.cardSelected : null,
            ]}
            key={index}
            onPress={() => {
              touchable ? onPress(item, index) : null;
            }}>
            <Icon name="payments" factor={0.8} forceColor color={Colors.gray} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>{'Tarjeta'}</Text>
              <Text style={styles.cardType}>{item.type}</Text>
              <Text style={styles.cardNumber}>
                {`************${item.number.slice(12, 16)}`}
              </Text>
            </View>
          </CardItem>
        )}
        ListHeaderComponent={<View>{header}</View>}
        ListFooterComponent={<View>{children}</View>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const AddCardButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.addCardButton} onPress={onPress}>
      <Icon
        name="credit_card_add"
        factor={0.8}
        forceColor
        color={Colors.gray}
      />
      <Text style={styles.addCardButtonText}>
        {'Asociar tarjeta de crédito o débito'}
      </Text>
    </TouchableOpacity>
  );
};

export {CardsList, BalanceButton, AddCardButton};

export default MyLinkBalance;

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {ImageHeader} from '../StoreComponents';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../constants/Colors';
import Icon from '../../../components/Icon';
import Text from '../../../components/Text';
import Loading from '../../../components/Loading';
import ErrorOrNoData from '../../../components/ErrorOrNoData';

import {myBalanceResponse, myCardsResponse} from '../data';

/* STYLES */
const styles = StyleSheet.create({
  options: {
    marginTop: 13,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginBottom: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  optionText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 20,
    width: 120,
    marginRight: 15,
  },
  myLinkBalance: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    marginRight: 5,
  },
  myLinkBalanceText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    padding: 5,
  },
});

/* IMG */
const headerImg = require('../../../assets/images/store/storeWallet.png');

class StoreWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: false,
      myLinkBalance: {},
      cards: [],
      loading: true,
      error: null,
    };

    this.setOptionSelected = this.setOptionSelected.bind(this);
    this.saveNewCard = this.saveNewCard.bind(this);
    this.updateBalance = this.updateBalance.bind(this);
    this.goToMyCards = this.goToMyCards.bind(this);
    this.goToMyLinkBalance = this.goToMyLinkBalance.bind(this);
    this.updateMyLinkBalanceView = this.updateMyLinkBalanceView.bind(this);
    this.updateMyCardsView = this.updateMyCardsView.bind(this);
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    try {
      const balanceInfo = myBalanceResponse.data.balance;
      const cardsInfo = myCardsResponse.data.cards;
      this.setState({
        myLinkBalance: balanceInfo,
        cards: cardsInfo,
        loading: false,
      });
    } catch (err) {
      this.setState({
        error: errorGettingData,
        errorCards: errorGettingData,
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.getData();
  }

  saveNewCard = item => {
    const data = this.state.cards;

    const errorSaving = {
      title: 'There was a problem processing the data',
      message: 'Try to reload',
    };

    let card = item;
    card.number = item.number.split(' ').join('');

    try {
      this.setState(
        {
          cards: [...data, card],
        },
        () => {
          this.updateMyCardsView();
          this.updateMyLinkBalanceView();
        },
      );
    } catch (err) {
      this.setState({error: errorSaving});
    }
  };

  updateBalance = value => {
    const errorUpdating = {
      title: 'There was a problem processing the data',
      message: 'Try to reload',
    };

    const data = this.state.myLinkBalance;

    try {
      data.total = data.total + value;
      console.log('VALUE_FINAL: ', data.total, value);
      this.setState(
        {
          myLinkBalance: data,
        },
        () => {
          this.updateMyLinkBalanceView();
        },
      );
    } catch (error) {
      this.setState({error: errorUpdating});
    }
  };

  setOptionSelected = option => {
    this.setState({optionSelected: option});
  };

  updateMyLinkBalanceView = () => {
    Navigation.updateProps('MYLINKBALANCE_ID', {
      balance: this.state.myLinkBalance,
      saveNewCard: this.saveNewCard,
      updateBalance: this.updateBalance,
      cards: this.state.cards,
      errorCards: this.state.error,
    });
  };

  updateMyCardsView = () => {
    Navigation.updateProps('MYCARDS_ID', {
      myCards: this.state.cards,
      saveNewCard: this.saveNewCard,
      errorCards: this.state.error,
    });
  };

  goToMyCards = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'my-link.MyCards',
        id: 'MYCARDS_ID',
        passProps: {
          myCards: this.state.cards,
          saveNewCard: this.saveNewCard,
          errorCards: this.state.error,
        },
      },
    });
  };

  goToMyLinkBalance = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'my-link.MyLinkBalance',
        id: 'MYLINKBALANCE_ID',
        passProps: {
          balance: this.state.myLinkBalance,
          saveNewCard: this.saveNewCard,
          updateBalance: this.updateBalance,
          cards: this.state.cards,
          errorCards: this.state.error,
        },
      },
    });
  };

  render() {
    const {optionSelected, myLinkBalance, cards, loading, error} = this.state;

    return (
      <View style={{flex: 1}}>
        {/* OPTIONS */}
        {!optionSelected && (
          <View>
            <ImageHeader uri={false} img={headerImg} />

            {loading && <Loading />}

            {error && (
              <ErrorOrNoData title={error.title} message={error.message} />
            )}

            {!loading && !error && (
              <View style={styles.options}>
                <TouchableOpacity
                  style={styles.option}
                  activeOpacity={0.5}
                  onPress={() => this.goToMyCards()}>
                  <Icon />
                  <Text style={styles.optionText}>{'Mis tarjetas'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.option}
                  activeOpacity={0.5}
                  onPress={() => this.goToMyLinkBalance()}>
                  <Icon />
                  <Text style={styles.optionText}>{'Saldo My-Link'}</Text>
                  <View style={styles.myLinkBalance}>
                    <Text style={styles.myLinkBalanceText}>{`$${
                      myLinkBalance.total
                    } ${myLinkBalance.currency}`}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

export default StoreWallet;

import React from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import MenuTabs from '../../../../components/MenuTabs';

import NonPremium from './NonPremium';
import Premium from './Premium';

/* DATA */
import {clientesResponse} from '../../../../testData/dataAdmon';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  /* VIEW SELECTOR STYLES */
  viewSelector: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  premiumIcon: {
    position: 'absolute',
    bottom: -5,
    right: width / 3,
  },
});

class Clients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 0,
      clients: [],
      loading: true,
      error: null,
    };

    this.menu = ['Clientes', 'Premium'];
    this.contextMenu = [
      'Hacer Premium',
      'Quitar de lista Premium',
      'Ocultar',
      'Hacer visible',
    ];
    this.tabsOptions = ['Todos', 'Visibles', 'Ocultos'];

    this.getViewData = this.getViewData.bind(this);
    this.handlePremiumState = this.handlePremiumState.bind(this);
    this.handleShowHideState = this.handleShowHideState.bind(this);
    this.setCurrentView = this.setCurrentView.bind(this);
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    const response = clientesResponse.data.clients;

    if (response) {
      this.setState({
        clients: response,
        loading: false,
      });
    } else {
      this.setState({
        error: errorGettingData,
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.getData();
  }

  /* GET VIEW DATA */
  getViewData = premiumView => {
    const clients = this.state.clients;

    let viewData = [];
    if (premiumView) {
      viewData = clients.filter(item => item.premium);
    } else {
      viewData = clients.filter(item => !item.premium);
    }

    return viewData;
  };

  /* HANDLE PREMIUM STATE */
  handlePremiumState = client => {
    const clients = this.state.clients;
    const index = clients.findIndex(item => item.id === client.id);

    const errorPremiumState = {
      title: 'There was a problem processing the data',
      message: 'Try to reload',
    };

    try {
      clients[index].premium = !client.premium;
      this.setState({clients: [...clients]});
    } catch (error) {
      this.setState({error: errorPremiumState});
    }
  };

  /* HANDLE SHOW / HIDE STATE */
  handleShowHideState = client => {
    const clients = this.state.clients;
    const index = clients.findIndex(item => item.id === client.id);

    const errorShowHideState = {
      title: 'There was a problem processing the data',
      message: 'Try to reload',
    };

    try {
      clients[index].hidden = !client.hidden;
      this.setState({clients: [...clients]});
    } catch (error) {
      this.setState({error: errorShowHideState});
    }
  };

  setCurrentView = view => {
    this.setState({currentView: view});
  };

  render() {
    const {loading, error, currentView} = this.state;
    const {updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        {loading && (
          <View>
            <Text style={{textAlign: 'center'}}>{'Loading...'}</Text>
          </View>
        )}
        {/* CONTENT */}
        {!loading && (
          <View style={{flex: 1}}>
            {/* VIEW SELECTOR */}
            <View style={styles.viewSelector}>
              <MenuTabs
                opciones={this.menu}
                seleccion={currentView}
                seleccionar={this.setCurrentView}
                fontSize={20}
              />
              <View style={styles.premiumIcon}>
                <Icon name="star" Borderless forceColor color={Colors.pet} />
              </View>
            </View>

            {/* NON PREMIUM */}
            {currentView === 0 && (
              <NonPremium
                clients={this.getViewData(false)}
                contextMenu={this.contextMenu}
                tabsOptions={this.tabsOptions}
                error={error}
                handlePremiumState={this.handlePremiumState}
                handleShowHideState={this.handleShowHideState}
                updateListInViewOffset={updateListInViewOffset}
              />
            )}

            {/* PREMIUM */}
            {currentView === 1 && (
              <Premium
                clients={this.getViewData(true)}
                contextMenu={this.contextMenu}
                tabsOptions={this.tabsOptions}
                error={error}
                handlePremiumState={this.handlePremiumState}
                handleShowHideState={this.handleShowHideState}
                updateListInViewOffset={updateListInViewOffset}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

export default Clients;

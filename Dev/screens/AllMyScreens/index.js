import React from 'react';
import {View, StyleSheet, TouchableOpacity, Switch} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../constants/Colors';
import firebase from '../../components/firebase';
import MainMenu from '../../components/MainMenu';

import Personal from '../AdmonPersonal/Home';
import Business from '../AdmonBusiness/Home';
import Celebrity from '../AdmonCelebrity/Home';
import BusinessPLUS from '../AdmonBusinessPLUS/Home';

import Store from '../Tienda';
import CuponColors from '../Pruebas/moneyAmount';
import CelebrityProfile from '../Profiles/Celebrity';
import BusinessProfile from '../Profiles/Business';
import PersonalProfile from '../Profiles/Personal';


import ScrollImages from '../Pruebas/ScrollImages';
import Admin from '../Pruebas/Admin';
import DateTime from '../Pruebas/DateTime';
import MyPager from '../Pruebas/MyPager';

/* STYLES */
const styles = StyleSheet.create({
  return: {
    width: 20,
    height: 20,
    borderRadius: 360,
    backgroundColor: Colors.pet,
    position: 'absolute',
    top: 10,
    right: 10,
    elevation: 5,
  },
});

const menu = [
  {
    name: 'personal',
    text: 'Personal',
  },
  {
    name: 'business',
    text: 'Business',
  },
  {
    name: 'payments',
    text: 'Store',
  },
  {
    name: 'gear_tool',
    text: 'Colors',
  },
  {
    name: 'ribbon',
    text: 'CelebrityP',
  },
  {
    name: 'star',
    text: 'BusinessP',
  },
  {
    name: 'card_personal',
    text: 'PersonalP',
  },
  {
    name: 'gallery',
    text: 'ScrollImg',
  },
  {
    name: 'home',
    text: 'MyPager',
  },
  {
    name: 'celebrity',
    text: 'CelebrityAdmin',
  },
  {
    name: 'BusinessPlus',
    text: 'BusinessAdmin'
  },
  {
    name: 'personal',
    text: 'Mis Cupones',
  },
  {
    name: 'personal',
    text: 'PersonalVIP'
  }
];

const email = 'eduardo.dorantes.07@gmail.com';
const password = 'Edu071196';

class AllMyViews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      linkname: '',
      optionSelected: '',
    };

    this.setOptionSelected = this.setOptionSelected.bind(this);
  }

  componentDidMount() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('User signed in!');
        this.setState({
          uid: firebase.auth().currentUser.uid,
        });
      })
      .catch(error => console.log(error));
  }

  componentWillUnmount() {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(error => console.log(error));
  }

  setOptionSelected = option => {
    console.log('option: ', option);
    switch (option) {
      case 0:
        this.goToView(
          'my-link.PersonalAdmin',
          {
            uid: this.state.uid,
            componentId: this.props.componentId,
          },
          false,
        );
        break;
      case 1:
        this.goToView(
          'my-link.BusinessAdmin',
          {
            uid: this.state.uid,
            data: {linkname: 'eduardodorantes1196MX', ref: this.state.uid},
            componentId: this.props.componentId,
          },
          false,
        );
        break;
      case 2:
        this.goToView(
          'my-link.Store',
          {
            componentId: this.props.componentId,
          },
          false,
        );
        break;
      case 4:
        this.goToView('my-link.CelebrityProfile', {}, true);
        break;
      case 5:
        this.goToView('my-link.BusinessProfile', {}, true);
        break;
      case 6:
        this.goToView('my-link.PersonalProfile', {uid: this.state.uid}, true);
        break;
      
      case 9:
        this.goToView('my-link.CelebrityAdmin', {
          uid: this.state.uid,
          data: {linkname: 'eduardodorantes1196MX', ref: this.state.uid},
          componentId: this.props.componentId
        }, false);
          break;
        case 10:
          this.goToView('my-link.BusinessPLUSAdmin', {
            uid: this.state.uid,
            data: {linkname: 'eduardodorantes1196MX', ref: this.state.uid},
            componentId: this.props.componentId
          }, false);
        break;
        case 11:
          this.goToView('my-link.MisCupones', {
            uid: this.state.uid,
            data: {linkname: 'eduardodorantes1196MX', ref: this.state.uid},
            componentId: this.props.componentId
          }, false);
        break;
        case 12:
          this.goToView('my-link.PersonalVIP', {}, true);
          
        break;
      default:
        this.setState({optionSelected: option});
        break;
    }
  };

  goToView = (view, viewProps, showOverlay) => {
    if (showOverlay) {
      Navigation.showOverlay({
        component: {
          name: view,
          passProps: {...viewProps},
        },
      });
    } else {
      Navigation.push(this.props.componentId, {
        component: {
          name: view,
          passProps: {...viewProps},
        },
      });
    }
  };

  render() {
    const {uid, optionSelected} = this.state;
    const {componentId} = this.props;

    return (
      <View>
        {/* MENU */}
        {optionSelected === '' && (
          <MainMenu
            menuItems={menu}
            size={45}
            totalItems={4.5}
            seleccion={optionSelected}
            onPress={this.setOptionSelected}
            activeBackground={Colors.personal}
            dontScrollTo
          />
        )}

        {/* COLORS */}
        {optionSelected === 3 && <CuponColors />}

        {/* ADMIN */}
        {optionSelected === 7 && <ScrollImages uid={uid} />}

        {/* ADMIN */}
        {optionSelected === 8 && <MyPager uid={uid} />}

        {/* RETURN BUTTON */}
        <TouchableOpacity
          style={[
            styles.return,
            {backgroundColor: uid ? Colors.business : Colors.gray},
          ]}
          onPress={() => this.setOptionSelected('')}
        />
      </View>
    );
  }
}

export default AllMyViews;

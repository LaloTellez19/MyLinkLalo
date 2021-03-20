import React from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import Header from '../../components/Header';

import HelpService from './HelpService';
import SafetyAndPrevention from './SafetyAndPrevention';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  topContainer: {
    elevation: 10,
    backgroundColor: 'white',
  },
  /* MENU STYLES */
  menu: {
    height: 85,
    paddingBottom: 10,
  },
  menuItem: {
    width: width / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    width: width / 4,
    fontSize: 12,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 5,
  },
});

const faq = [
  {
    question: '¿Cómo administro mi correo My-Link?',
    answer:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  },
  {
    question: '¿Cómo administro mi correo My-Link?',
    answer:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  },
  {
    question: '¿Cómo administro mi correo My-Link?',
    answer: 'a1',
  },
  {
    question: '¿Cómo administro mi correo My-Link?',
    answer: 'a1',
  },
  {
    question: '¿Cómo administro mi correo My-Link?',
    answer: 'a1',
  },
  {
    question: '¿Cómo administro mi correo My-Link?',
    answer: 'a1',
  },
  {
    question: '¿Cómo administro mi correo My-Link?',
    answer: 'a1',
  },
  {
    question: '¿Cómo administro mi correo My-Link?',
    answer: 'a1',
  },
  {
    question: '¿Cómo administro mi correo My-Link?',
    answer: 'a1',
  },
  {
    question: '¿Cómo administro mi correo My-Link?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  },
];

const allSafetyData = [
  {
    title: 'Privacidad',
    options: [
      'Sed ut perspiciatis unde omnis',
      'Sed ut perspiciatis unde omnis',
      'Sed ut perspiciatis unde omnis',
    ],
  },
  {
    title: 'SPAM y cuentas falsas',
    options: [
      'Sed ut perspiciatis unde omnis',
      'Sed ut perspiciatis unde omnis',
      'Sed ut perspiciatis unde omnis',
    ],
  },
  {
    title: 'Contenido sensible',
    options: [
      'Sed ut perspiciatis unde omnis',
      'Sed ut perspiciatis unde omnis',
      'Sed ut perspiciatis unde omnis',
    ],
  },
  {
    title: 'Abuso',
    options: [
      'Sed ut perspiciatis unde omnis',
      'Sed ut perspiciatis unde omnis',
      'Sed ut perspiciatis unde omnis',
    ],
  },
];

class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: 0,
      allFAQ: [],
      safetyData: [],
    };
    this.menu = [
      {
        icon: 'unknown',
        text: 'Servicio de ayuda',
      },
      {
        icon: 'unknown',
        text: 'Reportar problema',
      },
      {
        icon: 'lock',
        text: 'Seguridad y prevención',
      },
      {
        icon: 'gear_tool',
        text: 'Administrar cuentas',
      },
    ];

    this.activeColor = this.props.personal ? Colors.personal : Colors.business;
  }

  getData = () => {
    this.setState({
      allFAQ: faq,
      safetyData: allSafetyData,
    });
  };

  componentDidMount() {
    this.getData();
  }

  selectOption = index => {
    this.setState({optionSelected: index});
  };

  /* GO BACK */
  goBack = () => {
    Navigation.pop(this.props.componentId, {
      component: {
        name: 'my-link.Help',
      },
    });
  };

  render() {
    const {optionSelected, allFAQ, safetyData} = this.state;

    return (
      <View style={styles.mainContainer}>
        {/* TOP COMPONENT */}
        <View style={styles.topContainer}>
          {/* HEADER */}
          <Header goBack={() => this.goBack()} />

          {/* MENU */}
          <ScrollView style={styles.menu} horizontal>
            {this.menu.map((item, index) => {
              return (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => this.selectOption(index)}>
                  <Icon
                    name={item.icon}
                    background={
                      index === optionSelected ? this.activeColor : 'white'
                    }
                    forceColor
                    color={index === optionSelected ? 'white' : Colors.gray}
                  />
                  <Text
                    style={[
                      styles.menuText,
                      {
                        color:
                          index === optionSelected
                            ? this.activeColor
                            : Colors.defaultTextColor,
                      },
                    ]}>
                    {item.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* CONTENT */}
        <View>
          {optionSelected === 0 && <HelpService allFAQ={allFAQ} />}
          {optionSelected === 2 && (
            <SafetyAndPrevention allFAQ={allFAQ} data={safetyData} />
          )}
        </View>
      </View>
    );
  }
}

export default Help;

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';
import Icon from '../../Icon';

import LinkBusinessVIPBlock from '../LinkBusinessVIPBlock';

const width = Layout.window.width;
const itemWidth = width / 4;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 0,
    backgroundColor: Colors.grayLight,
    elevation: 2,
    marginBottom: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
  },
  lockIcon: {
    alignItems: 'center',
    width: itemWidth,
    marginLeft: 10,
  },
  requestContainer: {
    alignItems: 'center',
    width: itemWidth * 3,
  },
  title: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    marginTop: 10,
    textAlign: 'center',
  },
  message: {
    width: itemWidth * 2.5,
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginTop: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  requestButton: {
    width: itemWidth * 1.8,
    height: 30,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'black',
    borderWidth: 0.5,
    borderColor: Colors.grayLight,
    borderRadius: 10,
    marginBottom: 15,
  },
  requestButtonText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 0,
  },
  agentBlock: {
    elevation: 15,
    backgroundColor: Colors.grayLight,
    marginTop: 5,
    marginBottom: 5,
  },
});

class PersonalVIPlLinkRequestBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  requestVIP = () => {
    console.log('requestVIP');
  };

  render() {
    const {data} = this.props;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.content}>
          <View style={styles.lockIcon}>
            <Icon
              name="vip_personal"
              size={90}
              factor={0.9}
              Borderless
              Colorless
            />
          </View>
          <View style={styles.requestContainer}>
            <Text style={styles.title}>{'Link Personal'}</Text>
            <Text style={styles.message}>
              {'Este es un Link VIP, solo otro VIP puede enviar solicitud.'}
            </Text>
            <TouchableOpacity
              style={styles.requestButton}
              onPress={() => this.requestVIP()}>
              {/* <Icon
                name="people_add"
                size={40}
                factor={0.7}
                Borderless
                forceColor
                color={'white'}
              /> */}
              <Text style={styles.requestButtonText}>{'Hacerme VIP'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* VIP LINK BUSINESS BLOCK */}
        <View style={styles.agentBlock}>
          <LinkBusinessVIPBlock linkname={''} data={data} />
        </View>
      </View>
    );
  }
}

export default PersonalVIPlLinkRequestBlock;

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';
import Icon from '../../Icon';

const width = Layout.window.width;
const itemWidth = width / 4;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 0,
    backgroundColor: Colors.grayLight,
    elevation: 2,
    marginBottom: 5,
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
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.personal,
    borderWidth: 0.5,
    borderColor: Colors.grayLight,
    borderRadius: 10,
    marginBottom: 15,
  },
  requestButtonText: {
    fontSize: 14,
    color: 'white',
    marginLeft: -15,
  },
  followBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    borderTopWidth: 2,
    borderColor: Colors.lighterGray,
    marginTop: 5,
    marginBottom: 5,
  },
});

class PersonalLinkRequestBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  requestLink = () => {
    console.log('Request link');
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.content}>
          <View style={styles.lockIcon}>
            <Icon name="lock" size={80} factor={0.9} />
          </View>
          <View style={styles.requestContainer}>
            <Text style={styles.title}>{'Link Personal'}</Text>
            <Text style={styles.message}>
              {'Esta persona aún no comparte su Link Personal contigo.'}
            </Text>
            <TouchableOpacity
              style={styles.requestButton}
              onPress={() => this.requestLink()}>
              <Icon
                name="people_add"
                size={40}
                factor={0.7}
                Borderless
                forceColor
                color={'white'}
              />
              <Text style={styles.requestButtonText}>{'Solicitar Link'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FOLLOW BLOCK */}
        <View style={styles.followBlock}>
          <View style={styles.lockIcon}>
            <Icon name="people_check_mark" size={60} factor={0.9} />
          </View>
          <View style={styles.requestContainer}>
            <Text style={styles.title}>{'Social'}</Text>
            <Text style={styles.message}>
              {'Para ver las publicaciones de esta persona debes seguirla.'}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default PersonalLinkRequestBlock;

import React from 'react';
import {View, StyleSheet} from 'react-native';

import Layout from '../../constants/Layout';
import Text from '../Text';

const width = Layout.window.width;

const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: '100%',
    alignItems: 'center',
  },
});

function Loading(props) {
  return (
    <View style={styles.mainContainer}>
      <Text>{'Loading...'}</Text>
    </View>
  );
}

export default Loading;

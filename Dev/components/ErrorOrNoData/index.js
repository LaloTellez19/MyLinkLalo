import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import Text from '../Text';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  grayContainer: {
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayLight,
  },
  whiteContainer: {
    width: 300,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textContainer: {
    marginRight: 20,
    marginLeft: 20,
    paddingBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  message: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginTop: 5,
  },
});

function ErrorOrNoData(props) {
  const {
    ilustration,
    imageSource,
    title,
    message,
    children,
    textToBottom,
    factor,
  } = props;
  const defaultImage = 'https://i.picsum.photos/id/179/200/200.jpg';

  const stickText = {
    position: 'absolute',
    bottom: 5,
  };

  const image = {
    width: factor ? 200 * factor : 235,
    height: factor ? 200 * factor : 235,
    resizeMode: 'contain',
    marginBottom: 25,
    marginTop: 15,
    borderRadius: 5,
  };

  return (
    <View style={styles.grayContainer}>
      <View style={styles.whiteContainer}>
        {/* IMAGE */}
        <Image
          style={image}
          source={
            ilustration
              ? ilustration
              : imageSource
              ? {uri: imageSource}
              : {uri: defaultImage}
          }
        />

        {/* TEXT CONTAINER */}
        <View style={[styles.textContainer, textToBottom ? stickText : null]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message} numberOfLines={3}>
            {message}
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
}

export default ErrorOrNoData;

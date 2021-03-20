import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import Text from '../../../components/Text';
import CameraRollPicker from '../../../components/CameraRollPicker';

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 14,
  },
  imageSection: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 10,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    paddingBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cameraRollPickerContainer: {
    borderWidth: 0.5,
    borderColor: 'black',
    elevation: -1,
    backgroundColor: 'white',
  },
});

function ImageSelector(props) {
  const defaultImg = 'https://i.picsum.photos/id/179/200/200.jpg';
  const [image, setImage] = React.useState(defaultImg);

  const imageSelected = selected => {
    console.log('selected: ', selected);
    setImage(selected[0]);
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{'ImageSelector'}</Text>
      </View>
      <View style={styles.imageSection}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: image}} />
        </View>
      </View>
      <View style={styles.cameraRollPickerContainer}>
        <CameraRollPicker onReady={imageSelected} cameraEnabled />
      </View>
    </View>
  );
}

export default ImageSelector;

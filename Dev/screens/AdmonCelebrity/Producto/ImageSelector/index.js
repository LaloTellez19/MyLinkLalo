import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Text from '../../../../components/Text';
import CameraRollPicker from '../../../../components/CameraRollPicker';

const width = Layout.window.width;
const imgHeight = width / 4;

/* STYLES */
const styles = StyleSheet.create({
  /* BUTTON STYLES */
  button: {
    position: 'absolute',
    top: imgHeight * 2 + imgHeight * 0.6,
    width: 150,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.grayLight,
  },
  cameraRollPicker: {
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
    elevation: -1,
    backgroundColor: 'white',
  },
});

function ImageSelector(props) {
  const {handlePropChange, goToProp, goBack, editing} = props;
  const [imageSelected, setImageSelected] = React.useState('');

  /* HANDLE IMAGE SELECTION */
  const handleImageSelection = selected => {
    const image = selected[0];
    const value = image !== imageSelected && image !== undefined ? image : '';
    handlePropChange('img', value);
    setImageSelected(value);
  };

  return (
    <View>
      <View style={styles.cameraRollPicker}>
        <CameraRollPicker onChange={handleImageSelection} cameraEnabled />
      </View>

      {/* NEXT BUTTON */}
      {imageSelected !== '' && (
        <TouchableOpacity
          style={[styles.button, {backgroundColor: Colors.business}]}
          onPress={() => goToProp(1)}>
          <Text style={styles.buttonText}>{'Siguiente'}</Text>
        </TouchableOpacity>
      )}

      {imageSelected === '' && editing && (
        <TouchableOpacity
          style={[styles.button, {backgroundColor: Colors.business}]}
          onPress={() => goToProp(1)}>
          <Text style={styles.buttonText}>{'Siguiente'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default ImageSelector;

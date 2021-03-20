import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';
import CameraRollPicker from '../../CameraRollPicker';

const width = Layout.window.width;
const imgHeight = width / 4;

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    backgroundColor: 'white',
  },
  /* SAVE BUTTON STYLES */
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

function EditPicture(props) {
  const {changeUserImage, saveChanges, personal} = props;
  const activeColor = personal ? Colors.personal : Colors.business;

  const [imageSelected, setImageSelected] = React.useState('');
  const [imageSaved, setImageSaved] = React.useState(false);

  /* SELECT IMAGE */
  const selectImage = response => {
    const selected = response[0];
    const image =
      selected !== imageSelected && selected !== undefined ? selected : '';

    setImageSelected(image);
    changeUserImage(image);
    setImageSaved(false);
  };

  /* SAVE PICTURE */
  const savePicture = () => {
    saveChanges('foto', imageSelected);
    setImageSaved(true);
    setImageSelected('');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cameraRollPicker}>
        <CameraRollPicker onChange={selectImage} cameraEnabled />
      </View>

      {/* SAVE BUTTON */}
      {imageSelected !== '' && !imageSaved && (
        <TouchableOpacity
          style={[styles.button, {backgroundColor: activeColor}]}
          onPress={() => savePicture()}>
          <Text style={styles.buttonText}>{'Guardar'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default EditPicture;

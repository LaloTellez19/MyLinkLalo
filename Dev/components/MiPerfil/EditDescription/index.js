import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

import Text from '../../../components/Text';
import Colors from '../../../constants/Colors';

/* STYLES */
const styles = StyleSheet.create({
  /* DESCRIPTION EDITION STYLES*/
  editionContainer: {
    height: 250,
    alignItems: 'center',
    paddingTop: 35,
  },
  fieldContainer: {
    width: 300,
    marginTop: 60,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'HelveticaNeueLt',
    textAlign: 'center',
    height: 50,
    paddingBottom: 0,
    color: Colors.defaultTextColor,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: Colors.gray,
  },
  labelText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    color: Colors.defaultTextColor,
  },
  /* SAVE BUTTON STYLES */
  button: {
    width: 180,
    height: 40,
    marginTop: 17,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.personal,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.grayLight,
  },
});

function EditDescription(props) {
  const {handleChanges, saveChanges, personal, userDescription} = props;
  const activeColor = personal ? Colors.personal : Colors.business;

  const [description, setDescription] = React.useState(userDescription);

  /* CHANGE DESCRIPTION */
  const onDescriptionChange = text => {
    setDescription(text);
    handleChanges(text, 'descripcion');
  };

  /* SAVE DESCRIPTION */
  const saveDescription = () => {
    saveChanges('descripcion', description);
    setDescription(userDescription);
  };

  return (
    <View style={{flex: 1}}>
      {/* DESCRIPTION EDITION */}
      <View style={styles.editionContainer}>
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onDescriptionChange(text)}
            value={description}
            multiline
            maxLength={250}
          />
          <Text style={styles.labelText}>
            {personal
              ? 'Escribe aquí tu descripción'
              : 'Escribe aquí tu eslogan'}
          </Text>
        </View>
      </View>

      {/* SAVE BUTTON */}
      <TouchableOpacity
        style={[styles.button, {backgroundColor: activeColor}]}
        onPress={() => saveDescription()}>
        <Text style={styles.buttonText}> {'Guardar'} </Text>
      </TouchableOpacity>
    </View>
  );
}

export default EditDescription;

import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
} from 'react-native';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import Text from '../Text';

const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: 'white',
  },
  /* MAIN CONTAINER STYLES */
  container: {
    height: height / 2.85,
    // backgroundColor: Colors.grayLight,
    alignItems: 'center',
    paddingTop: 35,
  },
  /* INPUT FIELD STYLES */
  fieldContainer: {
    width: 300,
    marginTop: 55,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'HelveticaNeueLt',
    textAlign: 'center',
    height: 50,
    color: Colors.defaultTextColor,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    paddingBottom: 0,
  },
  labelText: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.defaultTextColor,
  },
  /* BUTTONS STYLES */
  buttonsGoToProp: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginBottom: 10,
  },
  button: {
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.grayLight,
  },
});

function EditTextField(props) {
  const {
    handlePropChange,
    property,
    label,
    goToProp,
    save,
    value,
    placeholder,
    personal,
  } = props;
  const [input, setInput] = React.useState(value);

  /* SELECCIONAR input */
  const onTextChange = text => {
    setInput(text);
    handlePropChange(property, text);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          {/* INPUT */}
          <View style={styles.fieldContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => onTextChange(text)}
              value={input}
              placeholder={placeholder ? placeholder : ''}
            />
            <Text style={styles.labelText}>{`Escribe aquí el ${label}`}</Text>
          </View>
        </View>

        {/* buttons */}
        <View style={styles.buttonsGoToProp}>
          {/* BOTÓN-OMITIR */}
          <TouchableOpacity style={styles.button} onPress={() => goToProp(-1)}>
            <Text style={[styles.buttonText, {color: Colors.gray}]}>
              {'Anterior'}
            </Text>
          </TouchableOpacity>

          {/* BOTÓN-SIGUIENTE / save */}
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: personal ? Colors.personal : Colors.business},
            ]}
            onPress={() => {
              save ? save() : goToProp(1);
            }}>
            <Text style={styles.buttonText}>
              {save ? 'Guardar' : 'Siguiente'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default EditTextField;

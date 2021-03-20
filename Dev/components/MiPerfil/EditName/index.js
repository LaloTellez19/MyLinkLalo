import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

import Text from '../../../components/Text';
import Colors from '../../../constants/Colors';

/* STYLES */
const styles = StyleSheet.create({
  /* NAME EDITION STYLES*/
  editionContainer: {
    height: 250,
    alignItems: 'center',
    paddingTop: 10,
  },
  fieldContainer: {
    width: 300,
    marginTop: 0,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'HelveticaNeueLt',
    textAlign: 'center',
    height: 35,
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

function EditName(props) {
  const {handleChanges, saveChanges, personal, name, lastName} = props;
  const activeColor = personal ? Colors.personal : Colors.business;

  const baseFields = {
    nombre: name,
    apellido: lastName,
  };

  const [fields, setFields] = React.useState(baseFields);

  /* CHANGE FIELD */
  const onFieldChange = (text, field, index) => {
    fields[field][index] = text;
    setFields({...fields});
    handleChanges(text, field, index);
  };

  /* SAVE NAME */
  const saveName = () => {
    saveChanges(true, fields.nombre, fields.apellido);
    setFields(baseFields);
  };

  const nameFields = [
    {
      field: 'nombre',
      index: 0,
      label: 'Escribe aquí tu nombre',
    },
    {
      field: 'nombre',
      index: 1,
      label: '¿Tienes un segundo nombre?',
    },
    {
      field: 'apellido',
      index: 0,
      label: 'Primer apellido',
    },
    {
      field: 'apellido',
      index: 1,
      label: 'Segundo apellido',
    },
  ];

  if (personal) {
    return (
      <View style={{flex: 1}}>
        {/* NAME EDITION */}
        <View style={styles.editionContainer}>
          {nameFields.map((item, index) => (
            <InputField
              key={index}
              fields={fields}
              field={item.field}
              index={item.index}
              onFieldChange={onFieldChange}
              label={item.label}
            />
          ))}
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity
          style={[styles.button, {backgroundColor: activeColor}]}
          onPress={() => saveName()}>
          <Text style={styles.buttonText}> {'Guardar'} </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        {/* NAME EDITION */}
        <View style={[styles.editionContainer, {paddingTop: 35}]}>
          <View style={{marginTop: 60}}>
            <InputField
              fields={fields}
              field={'nombre'}
              index={0}
              onFieldChange={onFieldChange}
              label={'Escribe aquí el nombre'}
            />
          </View>
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity
          style={[styles.button, {backgroundColor: activeColor}]}
          onPress={() => saveName()}>
          <Text style={styles.buttonText}> {'Guardar'} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const InputField = ({fields, field, index, onFieldChange, label}) => {
  return (
    <View style={styles.fieldContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={text => onFieldChange(text, field, index)}
        value={fields[field][index]}
      />
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

export default EditName;

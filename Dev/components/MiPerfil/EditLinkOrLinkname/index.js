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
    height: 35,
    paddingBottom: 0,
    color: Colors.defaultTextColor,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: Colors.gray,
  },
  linkname: {
    fontSize: 16,
    textAlign: 'center',
    height: 35,
    paddingTop: 12,
    color: Colors.gray,
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

function EditLinkOrLinkname(props) {
  const {handleChanges, saveChanges, personal, link, linkname} = props;
  const activeColor = personal ? Colors.personal : Colors.business;

  const [linkField, setLinkField] = React.useState(link);

  /* CHANGE FIELD */
  const onFieldChange = text => {
    setLinkField(text);
    handleChanges(text, 'link');
  };

  /* SAVE NAME */
  const saveLink = () => {
    saveChanges('link', linkField);
    setLinkField(link);
  };

  if (link) {
    return (
      <View style={{flex: 1}}>
        {/* NAME EDITION */}
        <View style={styles.editionContainer}>
          <InputField
            field={linkField}
            onFieldChange={onFieldChange}
            label={'Link'}
          />
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity
          style={[styles.button, {backgroundColor: activeColor}]}
          onPress={() => saveLink()}>
          <Text style={styles.buttonText}> {'Guardar'} </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        {/* NAME EDITION */}
        <View style={styles.editionContainer}>
          <InputField field={linkname} label={'Linkname'} notEditable={true} />
        </View>
      </View>
    );
  }
}

const InputField = ({notEditable, field, onFieldChange, label}) => {
  return (
    <View style={styles.fieldContainer}>
      {!notEditable && (
        <TextInput
          style={styles.textInput}
          onChangeText={text => onFieldChange(text)}
          value={field}
        />
      )}
      {notEditable && <Text style={styles.linkname}>{field}</Text>}
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

export default EditLinkOrLinkname;

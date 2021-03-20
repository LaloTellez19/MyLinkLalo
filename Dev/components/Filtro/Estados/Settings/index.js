import React from 'react';
import {View, StyleSheet, Switch} from 'react-native';

import Colors from '../../../../constants/Colors';
import Text from '../../../Text';

/* STYLES */
const styles = StyleSheet.create({
  settings: {
    height: '100%',
    paddingTop: 35,
    backgroundColor: 'white',
  },
  settingsTitle: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    marginBottom: 20,
    marginTop: 15,
    paddingBottom: 5,
    paddingLeft: 30,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    paddingTop: 20,
    paddingRight: 10,
  },
  settingsOptionText: {
    width: 150,
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  settingsOptionSwitch: {
    marginLeft: 100,
  },
  /* ESTILOS MENSAJE */
  mensajeContainer: {
    marginTop: 40,
    marginRight: 30,
    marginLeft: 30,
  },
  mensaje: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'justify',
  },
});

function Settings(props) {
  const {saveInCloud, setSaveInCloud, personal} = props;
  const activeColor = personal ? Colors.personal : Colors.business;

  return (
    <View style={styles.settings}>
      {/* TITLE */}
      <Text style={styles.settingsTitle}>{'Guardado'}</Text>

      {/* SAVING OPTIONS */}
      <View>
        {/* SAVE IN GALLERY */}
        {/* <View style={styles.settingsOption}>
          <Text style={styles.settingsOptionText}>{'Guardar en galeria'}</Text>
          <View style={styles.settingsOptionSwitch}>
            <Switch
              trackColor={{
                true: Colors.grayLight,
                false: Colors.grayLight,
              }}
              thumbColor={saveInCloud ? activeColor : Colors.gray}
              onValueChange={() => setSaveInCloud(!saveInCloud)}
              value={saveInCloud}
            />
          </View>
        </View> */}

        {/* SAVE IN THE CLOUD */}
        <View style={styles.settingsOption}>
          <Text style={styles.settingsOptionText}>{'Guardar en nube'}</Text>
          <View style={styles.settingsOptionSwitch}>
            <Switch
              trackColor={{
                true: Colors.grayLight,
                false: Colors.grayLight,
              }}
              thumbColor={saveInCloud ? activeColor : Colors.gray}
              onValueChange={() => setSaveInCloud(!saveInCloud)}
              value={saveInCloud}
            />
          </View>
        </View>
      </View>

      {/* Mensaje */}
      <View style={styles.mensajeContainer}>
        <Text style={styles.mensaje}>
          {
            'Almacena automáticamente las fotos y los videos en tu nube para no tener que guardarlos en tu dispositivo. Solo tu podrás verlos una vez que desaparezcan de tu historia.'
          }
        </Text>
      </View>
    </View>
  );
}

export default Settings;

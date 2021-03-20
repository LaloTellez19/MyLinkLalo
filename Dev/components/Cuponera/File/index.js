import React, {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Colors from '../../../constants/Colors';
import Icon from '../../Icon';

// Import Document Picker
import DocumentPicker from 'react-native-document-picker';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 10,  
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  cointainerDoc:{
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
},
textDoc:{
    fontSize: 18,
    color: Colors.gray,
    flexDirection: 'row',
    backgroundColor: 'white',
}, 
containerFile: {
    backgroundColor: 'white',
    width: '100%',
    height: 100,
    flexDirection: 'row',

},
  textStyle: {
    flexDirection: 'row',
    fontSize: 18,
    color: Colors.eerieBlack,
  },
  textStyle1: {
      flexDirection: 'row',
      fontSize: 14,
      color: Colors.defaultTextColor,
  },
});

const App = () => {
  const [multipleFile, setMultipleFile] = useState([]);

  const selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      //Setting the state to show multiple file attributes
      setMultipleFile(results);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Ningún archivo seleccionado');
      } else {
        //For Unknown Error
        alert('Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>    
        <ScrollView>
            <View style={styles.cointainerDoc}>
            <Icon
                name='file'
                size={35}
                factor={0.9}
                Borderless
                color={Colors.gray}
            />
                <Text style={styles.textDoc}>{'       Documentos                                            '}</Text>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={selectMultipleFile}>
                    {/*Multiple files selection button*/}
                    <Icon
                        name='box_out'
                        size={40}
                        factor={0.9}
                        Borderless
                        color={Colors.gray}
                    />
                </TouchableOpacity>
            </View>
            
          {/*Showing the data of selected Multiple files*/}
          {multipleFile.map((item, key) => (
            <View style={styles.containerFile}key={key}>
              <Icon
                name='file'
                size={35}
                factor={0.7}
                Borderless
                forceColor
                color={Colors.personal}
              />
              <Text style={styles.textStyle}>
                {item.name ? item.name : ''}
                {'\n'}
                <Text style={styles.textStyle1}>
                {item.size ? item.size : ''} Kb                        PDF
                {/*{item.type ? item.type : ''}*/}
                </Text>
              </Text>
            </View>
          ))}
        </ScrollView>
    </SafeAreaView>
  );
};

export default App;


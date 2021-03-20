import React, {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

import Text from '../../../components/Text';
import Icon from '../../Icon';

// Import Document Picker
import DocumentPicker from 'react-native-document-picker';

const width = Layout.window.width;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height:100,
    flexDirection:'row',
  },
  buttonSubcontainer:{
    width:'50%',
    height:100,
    alignItems:'center',
    justifyContent:'center',
  },
  button:{
    width:'80%',
    height:'40%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    borderWidth:0.5,
  },
  cointainerMap:{
    width:width,
    height:300,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 10,
    borderBottomColor: Colors.gray,
  },
  imageTitle:{
    width:150,
    height:150,
    borderRadius:100,
    backgroundColor: Colors.lighterGray,
  },
  containerFile: {
    backgroundColor: 'white',
    width: '100%',
    height: 150,
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

  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
  buttonAddFile: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.business,
    width: '50%',
    padding: 8,
},
buttonText: {
    color: 'white',
    fontSize: 16,
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
    <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
      <ScrollView>
        
        <View style={styles.cointainerMap}>
          <Text style={{fontSize:25, color: Colors.defaultTextColor}}>
            {'Mapa de Business Plus'}
          </Text>
          <Image 
            style={styles.imageTitle}/>
        </View>

        <View style={styles.containerFile}>
          {multipleFile.map((item, key) =>(
            <TouchableOpacity>
              <Icon
                name='file'
                size={35}
                factor={0.7}
                Borderless
                forceColor
                color={Colors.personal}
              />
              <Text style={styles.textStyle}>
                {item.name ? item.name :        ''}
                {'\n'}
                <Text style={styles.textStyle1}>
                  {item.size ? item.size : ''} Kb                        PDF
                </Text>
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonSubcontainer}>
              <TouchableOpacity 
                style={[styles.button, {backgroundColor: Colors.business}]}
                >
                <Text
                  style={{
                    fontSize:18,
                    color:'white'
                  }}>
                  {'Eliminar'}
                </Text>
              </TouchableOpacity>
          </View>
          <View style={styles.buttonSubcontainer}>
            <TouchableOpacity 
              style={[styles.button,{backgroundColor: Colors.business}]}
              onPress={selectMultipleFile}>
              <Text
                style={{
                  fontSize:16,
                  color:'white'
                }}>
                {'Subir nuevo archivo'}
              </Text>
            </TouchableOpacity>
              
          </View>
        </View>
        

      {/**<View style={styles.container}>
     
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonAddFile}>
          <Text style={styles.buttonText}>
            Eliminar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonAddFile}
          onPress={selectMultipleFile}>
          
          <Text style={styles.buttonText}>
            Subir nuevo archivo
          </Text>
        </TouchableOpacity>
      </View>**/}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;




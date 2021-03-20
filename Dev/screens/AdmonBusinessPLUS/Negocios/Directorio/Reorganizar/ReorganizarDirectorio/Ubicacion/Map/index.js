import React from 'react';
import {View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity, Alert} from 'react-native';

import Colors from '../../../../../../../../constants/Colors';
import Layout from '../../../../../../../../constants/Layout';
import Text from '../../../../../../../../components/Text';

import ErrorOrNoData from '../../../../../../../../components/ErrorOrNoData';
import Icon from '../../../../../../../../components/Icon';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
    mainContainer:{
        width: '100%',
        height: 500,
        marginTop: -25,
    },
    buttonContainer: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
        justifyContent:'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.silver
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: Colors.gray,
        width: '35%',
        padding: 5,
        borderWidth: 1,
      },
      buttonText: {
        color: Colors.defaultGrayBold,
        fontSize: 15,
      },
});


function Map (props){
    const{
        edit,
        save
  } = props;
 
    

    return (
      <View style={styles.mainContainer}>
          <ScrollView>
          <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>
                          {'Guardar'}
                        </Text>
                </TouchableOpacity>
            </View>
            <View style={{height: 40, flexDirection: 'row', backgroundColor: 'red'}}>
                <View style={{width: '20%', backgroundColor: 'white', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon
                        name='plaza'
                        size={40}
                        factor={1}
                        forceColor
                        Borderless
                        color= {Colors.defaultTextColor}
                    />
                </View>
                <View style={{width: '80%', backgroundColor: 'white', alignContent: 'center', justifyContent: 'center'}}>
                    <Text style={{color: Colors.defaultTextColor, fontSize:20}}>
                        Mapa de Interior
                    </Text>
                    
                </View>
                
             </View>
             <View style={{backgroundColor: Colors.lighterGray, height: 200}}>
            </View>
            <View style ={{height: 200}}>
                <TouchableOpacity style={{padding: 8}}
                onPress={edit}>
                        <Text style={{fontSize: 15, color: Colors.linkColor}}>
                          {'Editar ubicación en mapa'}
                        </Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}
                onPress={save}>
                        <Text style={styles.buttonText}>
                          {'Guardar'}
                        </Text>
                </TouchableOpacity>
            </View>

            </View>          
       </ScrollView>   
      </View>
      
    );
  
}

export default Map;

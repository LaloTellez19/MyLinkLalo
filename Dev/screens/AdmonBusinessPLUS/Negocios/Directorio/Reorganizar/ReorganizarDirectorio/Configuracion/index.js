import React from 'react';
import {View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native';

import Colors from '../../../../../../../constants/Colors';
import Layout from '../../../../../../../constants/Layout';
import Text from '../../../../../../../components/Text';

import ErrorOrNoData from '../../../../../../../components/ErrorOrNoData';
import Icon from '../../../../../../../components/Icon';

/* DATA */
import {estadosResponse} from '../../../../../../../testData/dataAdmon';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
    mainContainer:{
        width: '100%',
        height:35,
    },
    nombresdelestilo:{
        width: '100%', 
        height: 100,
        flexDirection: 'row',
        borderTopWidth:1,
        borderTopColor: Colors.silver,
        borderBottomWidth: 1,
        borderBottomColor: Colors.silver,
    }
});


function Configuracion (props) {
  const{
      layOff,
      inDelete
} = props;

    return (
      <View style={{height:200}}>
          <TouchableOpacity style={styles.nombresdelestilo}
          onPress={layOff}>
                <Icon
                    name='business_lay_off'
                    size={40}
                    factor={1}
                    forceColor
                    Borderless
                    color= {Colors.defaultTextColor}
                />
              <Text style={{color: Colors.defaultTextColor, fontSize: 20}}>Suspender Negocio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nombresdelestilo}
          onPress={inDelete}>
                <Icon
                    name='trash'
                    size={40}
                    factor={1}
                    forceColor
                    Borderless
                    color= {Colors.defaultTextColor}
                />
              
              <Text style={{color: Colors.defaultTextColor, fontSize: 20}}>Eliminar negocio de Plaza</Text>
          </TouchableOpacity>       
      </View>
      
    );
}

export default Configuracion;

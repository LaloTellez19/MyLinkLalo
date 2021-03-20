import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import Icon from '../..//Icon';
import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import Camera from '../../CameraRollPicker';
import File from '../File';
const width = Layout.window.width;

const styles = StyleSheet.create({
    mainContainer:{
        width: width,
        height:70,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        elevation:5,
    },
    subContainer:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    buttonsContainer:{
        width:width/3.5,
        alignItems:'center',
        justifyContent:'center'
    },
    menuText: {
        fontSize: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3,
        textAlign:'center',
        color: Colors.defaultTextColor,
      },

});

class SubirArchivo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeButton:'1',
            imagenSelect: [ ]
        };
        this.selectImage = this.selectImage.bind(this);
    }

    onPress= (selection) =>{
        this.setState({
            activeButton:selection,
        }, ()=>{
            console.log('Button: '+selection);
        });
    };
    selectImage = response => {
        const selected = response[0];
        this.setState({
               imagenSelect: selected,
      });
        console.log('Imagen Seleccionada');
    };
    render(){
        const{activeButton} = this.state;
        const{
            user,
            administrador,
            updateListInViewOffset
        }= this.props;
        return(
            <View style={{flex:1}}>
                <View style={styles.mainContainer}>
                   <View style={styles.subContainer}>
                       <View style={styles.buttonsContainer}>
                        <TouchableOpacity 
                            onPress={this.onPress.bind(this,'1')}>
                            
                            <Icon
                                name='file'
                                size={40}
                                factor={0.7}
                                forceColor
                                color={activeButton === '1' ? 'white' : Colors.defaultTextColor}
                                background={activeButton  ==='1' ? Colors.business : 'white'}/>
                                <Text style={styles.menuText}>{'Documento'}</Text>
                                
                        </TouchableOpacity>
                       </View>
                       <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                onPress={this.onPress.bind(this,'2')}>
                                <Icon
                                    name='gallery'
                                    size={40}
                                    factor={0.7}
                                    forceColor
                                    color={activeButton === '2' ? 'white' : Colors.defaultTextColor}
                                    background={activeButton  ==='2' ? Colors.business : 'white'}/>
                                    <Text style={styles.menuText}>{'Galeria'}</Text>
                            </TouchableOpacity>
                       </View>   
                   </View>
                </View>


                <View style={{flex:1}}>
                    {activeButton === '1' &&(
                        <File/>        
                    )}
                    
                    {activeButton === '2' &&(
                        <Camera onChange={this.selectImage.bind(this)} cameraEnabled/>
                    )}
                </View>
              
            </View>
        );
    }
}
export default SubirArchivo;
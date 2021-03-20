import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import Icon from '../../../../components/Icon';
import Layout from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';

import TarjetaPersonal from '../../../../components/Tarjeta/TarjetaPersonal';
import RealidadAumentada from '../../../../components/Tarjeta/RealidadAumentada';

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

class Tarjeta extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeButton:'1',
        };
    }

    onPress= (selection) =>{
        this.setState({
            activeButton:selection,
        }, ()=>{
            console.log('Button: '+selection);
        });
    }
    goToStore = () => {
        Navigation.push(this.props.componentId, {
          component: {
            name: 'my-link.Store',
            componentId:this.props.componentId
          },
        });
    };
  

    buttonStore = () =>{
        this.onPress('3');
        this.goToStore();
    }
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
                                name='business_card'
                                size={40}
                                factor={0.7}
                                forceColor
                                color={activeButton === '1' ? 'white' : Colors.defaultTextColor}
                                background={activeButton  ==='1' ? Colors.business : 'white'}/>
                                <Text style={styles.menuText}>{'Tarjeta'}</Text>
                        </TouchableOpacity>
                       </View>
                       <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                onPress={this.onPress.bind(this,'2')}>
                                <Icon
                                    name='ar'
                                    size={40}
                                    factor={0.7}
                                    forceColor
                                    color={activeButton === '2' ? 'white' : Colors.defaultTextColor}
                                    background={activeButton  ==='2' ? Colors.business : 'white'}/>
                                    <Text style={styles.menuText}>{'R.A.'}</Text>
                            </TouchableOpacity>
                       </View>

                       <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                onPress={this.buttonStore.bind(this)}>
                                <Icon
                                    name='shopping_cart'
                                    size={40}
                                    factor={0.7}
                                    forceColor
                                    color={activeButton === '3' ? 'white' : Colors.defaultTextColor}
                                    background={activeButton  ==='3' ? Colors.business : 'white'}/>
                                    <Text style={styles.menuText}>{'Tienda'}</Text>
                            </TouchableOpacity>
                       </View>    
                   </View>
                   
                </View>
                <View style={{flex:1}}>
                    {activeButton == '1' &&(
                        <TarjetaPersonal
                            user={user}
                            administrador={administrador}
                            updateListInViewOffset={updateListInViewOffset}
                            />
                    )}
                    {activeButton === '2' &&(
                        <RealidadAumentada/>
                    )}

                </View>
            </View>
        );
    }
}
export default Tarjeta;
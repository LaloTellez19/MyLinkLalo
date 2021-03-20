import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import Text from '../../../../components/Text';
import Layout from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';

import Siguiente from './Siguiente';



const width = Layout.window.width;

const styles = StyleSheet.create({
    SafeAreaView:{
        flex:1,
        width: width,
    },
    textContainer:{
        width:'100%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
    },
    buttonContainer:{
        width:'50%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    }
});

const allPromotions = {
    
}

class TopPromociones extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            activeColor:2,
            data:{}
        };
        this.promotions= [
            {
                linkname:'tybg2345',
                img:'https://i.picsum.photos/id/188/200/300.jpg?hmac=zXtOB5OFoSyQezQ-b1qLr4dwQ3z1vpR-O6XAY7Dw79w',
            },
            {
                linkname:'pujolPolanco',
                img:'https://i.picsum.photos/id/188/200/300.jpg?hmac=zXtOB5OFoSyQezQ-b1qLr4dwQ3z1vpR-O6XAY7Dw79w',
            },
            {
                linkname:'moca7567',
                img:'https://i.picsum.photos/id/188/200/300.jpg?hmac=zXtOB5OFoSyQezQ-b1qLr4dwQ3z1vpR-O6XAY7Dw79w',
            },
            {
                linkname:'',
                img:'https://i.picsum.photos/id/188/200/300.jpg?hmac=zXtOB5OFoSyQezQ-b1qLr4dwQ3z1vpR-O6XAY7Dw79w',
            },
            {
                linkname:'',
                img:'https://i.picsum.photos/id/188/200/300.jpg?hmac=zXtOB5OFoSyQezQ-b1qLr4dwQ3z1vpR-O6XAY7Dw79w',
            },
            
        ];

        this.changeButtonColor = this.changeButtonColor.bind(this);
    }


    changeButtonColor = (setColor)=>{
        this.setState({
            activeColor: setColor,
        });
        console.log(this.state.activeColor);
    }

    
    render(){
        const{  
            activeColor,
            data,
        } = this.state;
        return(
            <View style={styles.SafeAreaView}>

                <View style={[styles.textContainer,{top:10}]}>
                    <Text>{'Elige que promociones seran las principales en\naparecer en tu perfil Business Plus.'}</Text>
                </View>

                <View style={[styles.textContainer,{top:20, flexDirection:'row'}]}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            onPress={this.changeButtonColor.bind(this,'1')}>
                            <Text 
                                style={{fontSize:18, color: activeColor == 1 ? Colors.personal : Colors.defaultTextColor}}>
                                    {'Reorganizar'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={this.changeButtonColor.bind(this,'2')}>
                            <Text 
                                style={{fontSize:18, color: activeColor == 2 ? Colors.personal : Colors.defaultTextColor}}>
                                    {'Siguiente'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{top:20, }}>
                    {activeColor == 2 &&(
                        <Siguiente 
                            data={this.promotions}/>
                    )}
                </View>

            </View>
        );
    }
}


export default TopPromociones;
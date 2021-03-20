import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import CategoriesMenu from '../../../../components/CategoriesMenu';
import Text from '../../../../components/Text';

import Layout from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';

import Siguiente from './Siguiente';
import Reorganizar from './Reorganizar';

const width = Layout.window.width;
//const directoryInfo = directoryInformation.data;

const styles = StyleSheet.create({
    categoriesMenuContainer:{
        width:'100%',
    },
    textContainer:{
        width:'100%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        flexDirection:'row',
        marginTop:10,
    },
    textStyle:{
        fontSize:18,
        textAlign:'center',
    },
    buttonContainer:{
        width:'50%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    }
});

class Directorio extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            categorySelected: false,
            activeButton:2,
            list: this.props.list,
            data:this.props.data,
        };
        this.activeButton = this.activeButton.bind(this);
    }



    activeButton = (activeColor) =>{
        this.setState({
            activeButton : activeColor,
        });
    }

    render(){
        const{
            categorySelected,
            activeButton,
        }= this.state;
        return(
            <View style={{flex:1, width:width, backgroundColor:Colors.grayLight}}>
                <ScrollView>
                    <View style={styles.categoriesMenuContainer}>
                        <CategoriesMenu
                            categorySelected={categorySelected}
                            handleCategorySelection={this.props.handleCategorySelection}/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text>
                            {'Elige que negocios vas a recomendar para\nque aparezca en tu perfil Business Plus.'}
                        </Text>
                    </View>

                    <View style={styles.textContainer}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={this.activeButton.bind(this,1)}>
                                <Text
                                    style={[
                                        styles.textStyle,
                                        {color: activeButton === 1 
                                            ? Colors.personal 
                                            : 'black'
                                        }
                                    ]}>
                                    {'Reorganizar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={this.activeButton.bind(this,2)}>
                                <Text 
                                    style={[
                                        styles.textStyle,
                                        {color: activeButton === 2 
                                            ? Colors.personal 
                                            : 'black'
                                        }
                                    ]}>
                                    {'Siguiente'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {activeButton == 1 &&(
                        <Reorganizar
                            list={this.props.list}
                            directorioSeleccionado={this.props.directorioSeleccionado}
                            handleCategorySelection={this.props.handleCategorySelection}/>
                    )}
                    {activeButton == 2 &&(
                        <Siguiente
                            list={this.props.list}/>
                    )}
                </ScrollView>
            </View>
        );
    }
}

export default Directorio;











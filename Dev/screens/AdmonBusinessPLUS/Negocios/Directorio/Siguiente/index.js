import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    FlatList,
} from 'react-native';

import Text from '../../../../../components/Text';
import UserImage from '../../../../../components/UserImage';
import Icon from '../../../../../components/Icon';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';


const styles = StyleSheet.create({
    titlesContainer:{
        width:'100%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderWidth:0.5,
        borderColor:Colors.defaultTextColor,
        flexDirection:'row',
    },
    titlesSubcontainer:{
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },

    /**DIRECTORY LIST STYLES */
    mainContainer:{
        width:'100%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        marginTop:5,
        flexDirection:'row',
    },
    profileContainer:{
        width:'50%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    userImageContainer:{
        width:'40%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
    },
    userInfoContainer:{
        width:'60%',
        height:100,
        justifyContent:'center',
        alignItems:'center',
    },
    iconContainer:{
        width:'20%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
    },
    scheduleContainer:{
        width:'30%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonContainer:{
        width:'100%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
    },
    textButton:{
        fontSize:18,
        color: Colors.personal,
    },
    addItem:{
        width:'100%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    }
});

class Siguiente extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            showAll: false,
            list: this.props.data,
        };
        this.contactView = new Animated.Value(200);
        this.handleShowAll = this.handleShowAll.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    handleShowAll = show =>{
        this.setState({showAll:show});
        Animated.timing(this.contactView,{
            toValue: show ? 1000 : 200,
            duration: show ? 1000 : 600,
            isInteraction: false,
            useNativeDriver: false,
        }).start();
    }

    addItem = () =>{
        console.log('Agregar Item');
    }
    render(){
        const{
            showAll
        }= this.state;
        return(
            <View style={{flex:1}}>
                <View style={styles.titlesContainer}>
                    <View style={[
                        styles.titlesSubcontainer,
                        {width:'50%'}
                    ]}>
                        <Text>{'Negocio'}</Text>
                    </View>
                    <View style={[styles.titlesSubcontainer,{width:'20%'}]}>
                        <Text style={{color: Colors.business}}>{'Abierto'}</Text>
                    </View>
                    <View style={[styles.titlesSubcontainer,{width:'30%'}]}>
                        <Text>{'Horario'}</Text>
                    </View>
                </View>
                
                <Animated.View style={{height:this.contactView}}>
                    <ScrollView>
                        <FlatList
                            keyExtractor={(item) => item.id}
                            data={this.props.list}
                            renderItem={({item, index}) => (
                                <DirectoryList
                                    item={item}
                                    index={index}
                                    contactView={this.contactView}    
                                />
                            )}
                        />
                    </ScrollView>
                </Animated.View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress ={()=>{this.handleShowAll(!showAll)}}>
                        <Text style={styles.textButton}>
                            {showAll &&(
                                'Ver Menos'
                            )}
                            {!showAll &&(
                                'Ver Todos'
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.addItem}>
                    <TouchableOpacity
                        onPress={this.addItem}>
                        <Icon
                            Borderless
                            factor={1}
                            size={50}
                        />
                            <Text style={{fontSize:18}}>
                                {'Agregar'}
                            </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const DirectoryList = ({item, index,}) =>{
    return(
        <View style={styles.mainContainer}>
            <View style={styles.profileContainer}>
                <View style={styles.userImageContainer}>
                    <UserImage
                        borderRadius={10}/>
                </View>
                <View style={styles.userInfoContainer}>
                    <Text style={{fontSize:15}}>
                        {item.name}
                    </Text>
                    <Text>
                        {'@'+item.link}
                    </Text>
                </View>
            </View>

            <View style={styles.iconContainer}>
                <Icon
                    name='clock'
                    Borderless
                    factor={1}/>
            </View>

            <View style={styles.scheduleContainer}>
                <Text style={{fontSize:10}}>{'Abre de Lunes a Viernes\nde 9:00 a 19:00 y Sabados de...'}</Text>
            </View>
        </View>
    );
}

export default Siguiente;
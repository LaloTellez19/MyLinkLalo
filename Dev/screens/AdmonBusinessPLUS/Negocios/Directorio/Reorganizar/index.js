import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';
import UserImage from '../../../../../components/UserImage';

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        borderWidth:0.5,
        backgroundColor:'white',
    },
    optionsContainer:{
        width:'20%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
    },
    userImageContainer:{
        width:'20%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
    },
    infoContainer:{
        width:'60%',
        height:100,
        justifyContent:'center',
    }
});


function Reorganizar (props){
    const{
        list,
        directorioSeleccionado,
    }= props;
    return(
        <View style={{flex:1}}>
            <FlatList
                keyExtractor={(item) => item.id}
                data={list}
                renderItem={({item, index})=>(
                    <DirectoryList
                        item={item}
                        onPress={()=>{directorioSeleccionado(index)}}/>
                )}/>
        </View>
    );
}

const DirectoryList = ({item, onPress}) =>{
    return(
        <View style={styles.mainContainer}>
            <View style={styles.optionsContainer}>
                <Icon
                    name='options'
                    Borderless
                    factor={1}
                    onPress={onPress}/>
            </View>

            <View style={styles.userImageContainer}>
                <UserImage
                    userImage={item.foto}
                    borderRadius={10}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={{fontSize:18}}>
                    {item.name}
                </Text>
                <Text style={{fontSize:15}}>
                    {'@'+item.link}
                </Text>
            </View>
        </View>
    );
}

export default Reorganizar;
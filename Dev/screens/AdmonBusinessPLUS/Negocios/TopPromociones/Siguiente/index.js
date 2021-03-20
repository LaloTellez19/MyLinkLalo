import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
    ScrollView,
} from 'react-native';
import TopPromociones from '..';


import UserImage from '../../../../../components/UserImage';
import ProfilePicture from '../../../../../components/ProfilePicture';
import Colors from '../../../../../constants/Colors';


const styles = StyleSheet.create({
    ScrollView:{
        width:'100%',
    },
    mainContainer:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        top:10,
    },
    mainPromo:{
        width:'95%',
        height:200,
        borderRadius:20,
        borderWidth:1,
        borderColor: Colors.defaultTextColor,
        backgroundColor:'white',
        flexDirection:'row',
    },
    subPromo:{
        width:'95%',
        height:100,
        borderRadius:20,
        borderWidth:1,
        borderColor: Colors.defaultTextColor,
        backgroundColor:'white',
        flexDirection:'row',
    },
    profileContainer :{
        width:'30%',
        alignItems:'center',
        justifyContent:'center',
    },
    imageContainer:{
        width:'70%',
        alignItems:'center',
        justifyContent:'center',
    },
    image:{
        width:'100%',
        height:'100%',
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
    },  
});

function Siguiente(props){
    const{
        data,
        personal
    } = props;
    return(
        <View style={{height:'100%'}}>
            <ScrollView style={{flex:1}}>
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.mainPromo}>
                    <View style={styles.profileContainer}>
                        <UserImage
                        link={data.linkname}
                        userSize={70}
                        borderRadius={10}/>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{uri:data.img}}/>
                    </View>
                </TouchableOpacity>
            
            </View>
                <FlatList
                    renderItem={TopPromotions}
                    keyExtractor={(item) => item.id}
                    data={data}
                    personal={personal}
                    />
            </ScrollView>
        </View>
    );
}

const TopPromotions =({item, linkname}) => {
   
    return(
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.subPromo}>
                <View style={styles.profileContainer}>
                    <UserImage
                       link={item.linkname}
                       userSize={70}
                       borderRadius={10}/>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{uri:item.img}}/>
                </View>
            </TouchableOpacity>
            
        </View>
    );
}

export default Siguiente;
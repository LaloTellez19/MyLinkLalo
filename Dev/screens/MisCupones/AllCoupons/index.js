import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    FlatList,
} from 'react-native';

import Ticket from '../../../components/Ticket';

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        backgroundColor:'white'
    },
    container:{
        width:'100%',
        flexDirection:'row',
    },
    cuponContainer:{
        width:'50%',
        flexDirection:'column',
    },
    cuponSubcontainer:{
        width:'100%',
        height:150,
        alignItems:'center',
        justifyContent:'center',
    },
});


function allCoupons(props){
    const{
        data,
    } = props;
    return(
        <View style={styles.mainContainer}>
            <ScrollView>
                <Cupon
                    data={data}/>
            </ScrollView>
        </View>
    );
}

const Cupon = ({
    data,
}) => {
    const column1Data = data.filter((item, i) => i%2 === 0);
    const column2Data = data.filter((item, i) => i%2 === 1);
    return(
        <View style={styles.container}>
           <View style={styles.cuponContainer}>
                <FlatList
                    data={column1Data}
                    renderItem={({item})=>(
                        <TouchableOpacity style={styles.cuponSubcontainer}>
                            <Ticket
                                size={180}
                                title={item.title}
                                comment={item.comment}
                                ReadOnly
                                color={item.color}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>

            <View style={styles.cuponContainer}>
                <FlatList
                    data={column2Data}
                    renderItem={({item})=>(
                        <TouchableOpacity style={styles.cuponSubcontainer}>
                            <Ticket
                                size={180}
                                title={item.title}
                                comment={item.comment}
                                ReadOnly
                                color={item.color}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View> 
        </View>
        
    );
}



export default allCoupons;
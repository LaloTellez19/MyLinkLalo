import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    FlatList,
} from 'react-native';

import Location from './Location';
import Map from './Map'

function Ubicacion (props){
    const{
        data,
        user,
        handleSaveChanges,
        edit, 
        save,
    } = props;
    
    return(
        <View>
            <Location
                data={data}
                user={user}
                handleSaveChanges={handleSaveChanges}
            />
            <Map
            edit={edit}
            save={save}
            />
        </View>
        
    );
}

export default Ubicacion;
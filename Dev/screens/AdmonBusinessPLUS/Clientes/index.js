import React from 'react';
import {View, Text} from 'react-native';

import Clients from './Clients';
import Recommendations from './Recommendations';
import Top from './Top';
import CheckIn from './CheckIn';
import Distinciones from './Distinciones';

function Clientes(props){
    const {seleccion, user, updateListInViewOffset} = props;

    return(
        <View style={{flex:1}}>

            {/*Clientes*/}
            {seleccion === 0 && (
                <Clients 
                    updateListInViewOffset={updateListInViewOffset} />
            )}

            {/* RECOMENDACION */}
            {seleccion === 1 && (
                <Recommendations
                    user={user}
                    updateListInViewOffset={updateListInViewOffset}
                />
            )}

            {/* TOP */}
            {seleccion === 2 && (
                <Top 
                    user={user}
                    updateListInViewOffset={updateListInViewOffset}
                />
            )}

            {/* CHECK IN */}
            {seleccion === 3 && (
                <CheckIn 
                    updateListInViewOffset={updateListInViewOffset}
                />
            )}

            {/* DISTINCIONES */}
            {seleccion === 4 && (
                <Distinciones 
                    updateListInViewOffset={updateListInViewOffset} 
                />
            )}
        </View>
    );
}
export default Clientes;
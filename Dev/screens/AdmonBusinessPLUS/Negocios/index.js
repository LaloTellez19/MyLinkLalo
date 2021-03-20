import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import TopPromociones from './TopPromociones';
import Servicios from './Servicios';
import Colors from '../../../constants/Colors';
import Galeria from './Galeria1';
import Recomendacion from './Recomendacion';
import Top from './Top';
import Cuponera from './Cuponera';
import Mapa from './Mapa';
import Directorio from './Directorio';

function Negocios(props){
    const {
        setSeleccionTop,
        seleccion,
        updateListInViewOffset,
        componentId,
        user,
        data,
        datos,
        directorioSeleccionado,
        handleCategorySelection,
        list,
    } = props;

    return(
        <View style={{flex:1}}>
            {/*TOP PROMOCIONES*/}
            {seleccion === 0 &&(
                <Directorio
                    directorioSeleccionado={directorioSeleccionado}
                    handleCategorySelection={handleCategorySelection}
                    list={list}
                />
            )}
            {seleccion === 1 && (
                <TopPromociones
                    updateListInViewOffset={updateListInViewOffset} />
            )}

            {/*TOP*/}
            {seleccion === 2 && (
                <Top
                    user={user}
                    updateListInViewOffset={updateListInViewOffset} />
            )}

            {/*RECOMENDACION*/}
            {seleccion === 3 && (
                <Recomendacion
                    user={user}
                    updateListInViewOffset={updateListInViewOffset} />
            )}

            {/*GALERIA */}
            {seleccion === 4 && (
                <Galeria
                    user={user}
                    updateListInViewOffset={updateListInViewOffset}
                />
            )}
            
            {/*Servicios */}
            {seleccion === 5 && (
                <Servicios
                    user={user}
                    updateListInViewOffset={updateListInViewOffset}
                />
            )}

            {/*Cuponera */}
            {seleccion === 6 && (
                <Cuponera
                    user={user}
                    updateListInViewOffset={updateListInViewOffset}
                />
            )}
            {/*Mapa */}
            {seleccion === 7 && (
                <Mapa
                    user={user}
                    updateListInViewOffset={updateListInViewOffset}
                />
            )}


            
        </View>
    );
}
export default Negocios;
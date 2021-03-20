import React from 'react';
import {View} from 'react-native';

import VerPublicaciones from '../../../components/Filtro/VerPublicaciones';
// import Galeria from './Filtro/Galeria';
import Estados from '../../../components/Filtro/Estados';
import Noticias from '../../../components/Filtro/Noticias';
import Promociones from '../../../components/Filtro/Promociones';
import Recomendacion from '../../../components/Filtro/Recomendacion';
import AlguienSabe from '../../../components/Filtro/AlguienSabeCelebrity';
import Eventos from '../../../components/Filtro/Eventos';
import Cupones from '../../../components/Filtro/Cupones';

function Publicaciones(props) {
  const {seleccion, linkname, updateListInViewOffset, uid} = props;

  return (
    <View style={{flex: 1}}>
      {/* VER PUBLICACIONES */}
      {seleccion === 0 && (
        <VerPublicaciones
          linkname={linkname}
          uid={uid}
          updateListInViewOffset={updateListInViewOffset}
        />
      )}

      {/* ESTADOS */}
      {seleccion === 1 && (
        <Estados updateListInViewOffset={updateListInViewOffset} />
      )}

      {/* NOTICIAS */}
      {seleccion === 2 && (
        <Noticias updateListInViewOffset={updateListInViewOffset} />
      )}
      {/* RECOMENDACION */}
      {seleccion === 3 && (
        <Recomendacion updateListInViewOffset={updateListInViewOffset} />
      )}

      {/* ALGUIEN SABE */}
      {seleccion === 4 && (
        <AlguienSabe updateListInViewOffset={updateListInViewOffset} />
      )}

    </View>
  );
}

export default Publicaciones;

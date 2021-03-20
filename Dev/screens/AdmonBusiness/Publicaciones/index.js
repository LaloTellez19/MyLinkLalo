import React from 'react';
import {View} from 'react-native';

import VerPublicaciones from '../../../components/Filtro/VerPublicaciones';
// import Galeria from './Filtro/Galeria';
import Estados from '../../../components/Filtro/Estados';
import Noticias from '../../../components/Filtro/Noticias';
import Promociones from '../../../components/Filtro/Promociones';
import Recomendacion from '../../../components/Filtro/Recomendacion';
import AlguienSabe from '../../../components/Filtro/AlguienSabe';
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

      {/* PROMOCIONES */}
      {seleccion === 3 && (
        <Promociones updateListInViewOffset={updateListInViewOffset} />
      )}

      {/* RECOMENDACION */}
      {seleccion === 4 && (
        <Recomendacion updateListInViewOffset={updateListInViewOffset} />
      )}

      {/* ALGUIEN SABE */}
      {seleccion === 5 && (
        <AlguienSabe updateListInViewOffset={updateListInViewOffset} />
      )}

      {/* EVENTOS */}
      {seleccion === 6 && (
        <Eventos updateListInViewOffset={updateListInViewOffset} />
      )}
    </View>
  );
}

export default Publicaciones;

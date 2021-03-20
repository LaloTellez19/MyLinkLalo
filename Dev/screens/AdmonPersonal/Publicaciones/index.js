import React from 'react';
import {View} from 'react-native';

import VerPublicaciones from '../../../components/Filtro/VerPublicaciones';
import Estados from '../../../components/Filtro/Estados';
import RecommendationsPersonal from '../../../components/Filtro/RecommendationsPersonal';
import AlguienSabe from '../../../components/Filtro/AlguienSabePersonal';
import Eventos from '../../../components/Filtro/Eventos';
import Cupones from '../../../components/Filtro/Cupones';

function Publicaciones(props) {
  const {seleccion, linkname, updateListInViewOffset, uid} = props;

  return (
    <View style={{flex: 1, marginTop: 5}}>
      {/* VER PUBLICACIONES */}
      {seleccion === 0 && (
        <VerPublicaciones
          personal
          linkname={linkname}
          uid={uid}
          updateListInViewOffset={updateListInViewOffset}
        />
      )}

      {/* ESTADOS */}
      {seleccion === 1 && (
        <Estados personal updateListInViewOffset={updateListInViewOffset} />
      )}

      {/* RECOMMENDATIONS */}
      {seleccion === 2 && (
        <RecommendationsPersonal
          updateListInViewOffset={updateListInViewOffset}
        />
      )}

      {/* ALGUIEN SABE */}
      {seleccion === 3 && (
        <AlguienSabe updateListInViewOffset={updateListInViewOffset} />
      )}

      {/* EVENTOS */}
      {seleccion === 4 && (
        <Eventos personal updateListInViewOffset={updateListInViewOffset} />
      )}

      {/* CUPONES */}
      {/* {seleccion === 5 && <Cupones personal />} */}
    </View>
  );
}

export default Publicaciones;

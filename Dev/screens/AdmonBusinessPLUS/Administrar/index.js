import React from 'react';
import {View} from 'react-native';

import Tarjeta from './Tarjeta';
import Informacion from './Informacion';
import MiPerfil from '../../../components/MiPerfil';

function Administrar(props) {
  const {
    user,
    seleccion,
    administrador,
    actualizarUserInfo,
    updateListInViewOffset,
    uid,
    componentId
  } = props;

  return (
    <View style={{flex: 1}}>
      {/* PROFILE */}
      {seleccion === 0 && (
        <View></View>
      )}

      {/* RA */}
      {seleccion === 1 && 
        <Informacion 
          user={user}
          uid={uid}
          updateListInViewOffset={updateListInViewOffset}
          componentId={componentId}
        />}

      {/* MI PERFIL */}
      {seleccion === 2 && (
        <Tarjeta
          user={user}
          uid={uid}
          updateListInViewOffset={updateListInViewOffset}
          componentId={componentId}
        />
      )}
    </View>
  );
}

export default Administrar;

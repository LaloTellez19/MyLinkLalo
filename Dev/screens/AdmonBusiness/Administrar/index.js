import React from 'react';
import {View} from 'react-native';

import Tarjeta from '../../../components/Tarjeta/TarjetaPersonal';
import RealidadAumentada from '../../../components/Tarjeta/RealidadAumentada';
import MiPerfil from '../../../components/MiPerfil';

function Administrar(props) {
  const {
    user,
    seleccion,
    administrador,
    actualizarUserInfo,
    updateListInViewOffset,
  } = props;

  return (
    <View style={{flex: 1}}>
      {/* TARJETA */}
      {seleccion === 0 && (
        <Tarjeta
          user={user}
          administrador={administrador}
          updateListInViewOffset={updateListInViewOffset}
        />
      )}

      {/* RA */}
      {seleccion === 1 && <RealidadAumentada />}

      {/* MI PERFIL */}
      {seleccion === 2 && (
        <MiPerfil
          user={user}
          administrador={administrador}
          actualizarUserInfo={actualizarUserInfo}
        />
      )}
    </View>
  );
}

export default Administrar;

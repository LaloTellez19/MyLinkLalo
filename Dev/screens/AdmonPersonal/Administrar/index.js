import React from 'react';
import {View} from 'react-native';
import {Navigation} from 'react-native-navigation';

import Tarjeta from '../../../components/Tarjeta/TarjetaPersonal';
import RealidadAumentada from '../../../components/Tarjeta/RealidadAumentada';
// import ImpresionTarjetas from '../../../components/Tarjeta/ImpresionTarjetas';
import MiPerfil from '../../../components/MiPerfil';

class Administrar extends React.Component {
  render() {
    const {user, seleccion, updateListInViewOffset} = this.props;

    if (seleccion === 0) {
      return (
        <Tarjeta
          user={user}
          personal
          updateListInViewOffset={updateListInViewOffset}
        />
      );
    } else if (seleccion === 1) {
      return <RealidadAumentada personal />;
    }
  }
}

export default Administrar;

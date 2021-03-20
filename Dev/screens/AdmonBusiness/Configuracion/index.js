import React from 'react';
import {View} from 'react-native';

import Viculacion from './Vinculacion';
import Help from './Help';

function Configuracion(props) {
  const {seleccion, user, updateListInViewOffset, componentId} = props;

  return <View>{seleccion === 0 && <Help />}</View>;
}

export default Configuracion;

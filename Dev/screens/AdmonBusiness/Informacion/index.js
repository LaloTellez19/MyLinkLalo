import React from 'react';
import {View} from 'react-native';

import BusinessData from './BusinessData';
import AwardsAdmin from '../../../components/AwardsAdmin';
import Producto from './Producto';
import Servicios from './Servicios';

function Informacion(props) {
  const {user, uid, seleccion, updateListInViewOffset, componentId} = props;

  return (
    <View style={{flex: 1}}>
      {/* DATOS */}
      {seleccion === 0 && (
        <BusinessData
          user={user}
          uid={uid}
          updateListInViewOffset={updateListInViewOffset}
        />
      )}

      {seleccion === 1 && (
        <AwardsAdmin
          linkname={''}
          updateListInViewOffset={updateListInViewOffset}
          componentId={componentId}
        />
      )}

      {/* PRODUCTOS */}
      {seleccion === 2 && (
        <Producto
          updateListInViewOffset={updateListInViewOffset}
          linkname={user.linkname}
          componentId={componentId}
        />
      )}

      {/* SERVICIOS */}
      {seleccion === 3 && (
        <Servicios
          updateListInViewOffset={updateListInViewOffset}
          componentId={componentId}
        />
      )}
    </View>
  );
}

export default Informacion;

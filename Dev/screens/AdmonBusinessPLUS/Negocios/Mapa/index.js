import React from 'react';
import {View} from 'react-native';

import Map from '../../../../components/Mapa/AddNewFile';


function Mapa(props) {
  const {user, uid, updateListInViewOffset, componentId} = props;

  return (
    <View style={{flex: 1}}>
      {/* DATOS */}
        <Map
         updateListInViewOffset={updateListInViewOffset}
        />
    </View>
  );
}

export default Mapa;
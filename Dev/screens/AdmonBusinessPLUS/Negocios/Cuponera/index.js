import React from 'react';
import {View} from 'react-native';

import Cuponer from '../../../../components/Cuponera';


function Cuponera(props) {
  const {user, uid, updateListInViewOffset, componentId} = props;

  return (
    <View style={{flex: 1}}>
      {/* DATOS */}
        <Cuponer
          updateListInViewOffset={updateListInViewOffset}
        />
    </View>
  );
}

export default Cuponera;
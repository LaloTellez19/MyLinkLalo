import React from 'react';
import {View} from 'react-native';

import BusinessData from './BusinessData';


function Informacion(props) {
  const {user, uid, updateListInViewOffset, componentId} = props;

  return (
    <View style={{flex: 1}}>
      {/* DATOS */}
        <BusinessData
          user={user}
          uid={uid}
          updateListInViewOffset={updateListInViewOffset}
        />
    </View>
  );
}

export default Informacion;

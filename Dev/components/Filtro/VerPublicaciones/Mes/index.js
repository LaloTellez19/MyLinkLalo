import React from 'react';
import {View, StyleSheet} from 'react-native';

import Colors from '../../../../constants/Colors';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';
import CalendarioPicker from '../../../../components/CalendarioPicker';
import ListaPublicaciones from '../ListaPublicaciones';

/* STYLES */
const styles = StyleSheet.create({
  /* ESTILOS SELECTOR */
  selector: {
    height: 45,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
  },
});

function Mes(props) {
  const {
    personal,
    listByDate,
    filterByDate,
    handlePublicationOptions,
    updateListInViewOffset,
    onEndReached,
    onRefresh,
    refreshing,
  } = props;

  // console.log(listByDate[0]);

  return (
    <View style={{flex: listByDate.length === 0 ? 0 : 1}}>
      {/* PICKER MES / CATEGORIA */}
      <View style={styles.selector}>
        <CalendarioPicker
          obtnerItemCalendario={item => filterByDate(0, item)}
          newPicker
        />
      </View>

      {/* LISTA DE PUBLICACIONES */}

      {listByDate.length === 0 && (
        <View style={{height: '100%'}}>
          <ErrorOrNoData
            title={'Nothing Found'}
            message={'Try with another search criteria'}
          />
        </View>
      )}

      {/* PUBLICATIONS LIST */}
      <ListaPublicaciones
        personal={personal}
        listaPublicaciones={listByDate}
        handlePublicationOptions={handlePublicationOptions}
        updateListInViewOffset={updateListInViewOffset}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}

export default Mes;

import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import Layout from '../../../../constants/Layout';
import Text from '../../../Text';
import Search from '../../../Search';
import ErrorOrNoData from '../../../ErrorOrNoData';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  /* ESTILOS LISTA DE CUPONES */
  cupounsList: {
    alignItems: 'center',
    width: width,
    height: height * 0.65,
    marginTop: 20,
    paddingBottom: 25,
  },
  cupoun: {
    alignItems: 'center',
    width: 160,
    height: 90,
    margin: 5,
    borderWidth: 0.5,
  },
});

function MyCupons(props) {
  const {cupounsList} = props;
  console.log('MyCupons', cupounsList);
  
  return (
    <View>
      <View style={styles.cupounsList}>
        {/* MY CUPOUNS */}
        <FlatList
          nestedScrollEnabled={true}
          numColumns={2}
          data={cupounsList}
          renderItem={({item}) => (
            <View style={styles.cupoun}>
              <Text>{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

export default MyCupons;

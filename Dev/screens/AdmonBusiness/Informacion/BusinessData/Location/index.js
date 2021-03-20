import React from 'react';
import {View, StyleSheet, TextInput, FlatList} from 'react-native';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    marginTop: 15,
  },
  /* DATA CONTAINER STYLES */
  locationIcon: {
    position: 'absolute',
    left: 20,
  },
  dataContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  dataField: {
    width: 230,
    marginLeft: 25,
    marginRight: 20,
  },
  data: {
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    fontSize: 16,
    color: Colors.grayBold,
    paddingBottom: 2,
    paddingLeft: 7,
  },
  label: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    paddingTop: 2,
    paddingLeft: 2,
  },
  editDataField: {
    width: 230,
    marginTop: -10,
    marginLeft: 25,
    marginRight: 20,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    fontSize: 16,
    fontFamily: 'HelveticaNeueLt',
    color: Colors.grayBold,
    paddingBottom: 2,
    paddingLeft: 7,
  },
  editIcon: {
    marginTop: -15,
  },
  /* MAP CONTAINER STYLES */
  mapContainer: {
    width: 270,
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  map: {
    width: 150,
    height: 150,
    borderRadius: 150,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  addIcon: {
    position: 'absolute',
    top: 10,
    right: 45,
  },
  mapText: {
    position: 'absolute',
    bottom: 2,
    right: 25,
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
});

function Location(props) {
  const {index: mainIndex, data, handleSaveChanges} = props;
  const labels = [
    'calle y número',
    'colonia',
    'estado',
    'ciudad',
    'código postal',
  ];
  
  const fieldsKeys = ['calle', 'colonia', 'estado', 'ciudad', 'codigo_postal'];

  const [allData, setAllData] = React.useState([]);
  const [fieldSelected, setFieldSelected] = React.useState(null);
	
  React.useEffect(() => {
    const keys = Object.keys(data);
    const orderedData = keys.map((item, index) => {
      return {data: data[item], label: labels[index], key: item, index: index};
    });
    setAllData(orderedData);
  }, []);

  /* HANDLE FIELD SELECTION */
  const handleFieldSelection = (save = false, item) => {
    if (save) {
      handleSaveChanges(mainIndex, item.data, item.key, {
        [`domicilio.${fieldsKeys[item.index]}`]: item.data,
      });
      setFieldSelected(null);
    } else {
      setFieldSelected(item.index);
    }
  };

  /* HANLDE DATA CHANGES */
  const handleDataChanges = value => {
    allData[fieldSelected].data = value;
    setAllData([...allData]);
  };

  /* HANDLE EDIT MAP */
  const handleEditMap = () => {
    console.log('EDIT MAP');
  };

  return (
    <View style={styles.mainContainer}>
      {/* LOCATION ICON */}
      <View style={styles.locationIcon}>
        <Icon name="location" Borderless forceColor color={Colors.gray} />
      </View>

      {/* FIELDS */}
      <View>
        {allData.map((item, index) => (
          <DataContainer
            key={index}
            item={item}
            fieldSelected={fieldSelected}
            handleFieldSelection={handleFieldSelection}
            handleDataChanges={handleDataChanges}
          />
        ))}
      </View>

      {/* MAP CONTAINER */}
      <View style={styles.mapContainer}>
        <View style={styles.map} />
        <View style={styles.addIcon}>
          <Icon
            name="plus"
            forceColor
            color={'white'}
            background={Colors.gray}
            onPress={() => handleEditMap()}
          />
        </View>
        <Text style={[styles.mapText, styles.label]}>{'Mapa'}</Text>
      </View>
    </View>
  );
}

const DataContainer = ({
  item,
  fieldSelected,
  handleFieldSelection,
  handleDataChanges,
}) => {
  return (
    <View style={styles.dataContainer}>
      {fieldSelected !== item.index && (
        <View style={styles.dataField}>
          <Text style={styles.data}>{item.data}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      )}

      {fieldSelected === item.index && (
        <TextInput
          autoFocus={true}
          allowFontScaling={false}
          style={styles.editDataField}
          value={item.data}
          onChangeText={text => handleDataChanges(text)}
        />
      )}

      {/* EDIT ICON */}
      <View style={styles.editIcon}>
        <Icon
          name={fieldSelected !== item.index ? 'pencil' : 'check_mark'}
          Borderless
          forceColor
          color={Colors.gray}
          onPress={() => {
            handleFieldSelection(fieldSelected === item.index, item);
          }}
        />
      </View>
    </View>
  );
};

export default Location;

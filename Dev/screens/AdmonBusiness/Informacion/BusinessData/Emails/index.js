import React from 'react';
import {View, StyleSheet, FlatList, TextInput} from 'react-native';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  /* PHONES LIST */
  phonesList: {},
  /* DATA ELEMENT STYLES */
  dataElement: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  dataElementTextContainer: {
    width: 200,
    marginRight: 20,
    marginLeft: 25,
    alignItems: 'flex-start',
  },
  dataElementType: {
    fontSize: 14,
    color: Colors.grayBoald,
    textAlign: 'center',
  },
  dataElementData: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  dataElementDataEditable: {
    fontSize: 16,
    fontFamily: 'HelveticaNeueLt',
    color: Colors.defaultTextColor,
    textAlign: 'center',
    padding: 0,
  },
});

function Emails(props) {
  const {data, index: elementIndex, handleSaveChanges} = props;

  const [allData, setAllData] = React.useState([...data]);
  const [fieldSelected, setFieldSelected] = React.useState({});
	
  /* HANDLE ITEM SELECTION */
  const handleItemSelection = (save = false, item, itemIndex) => {
    if (save) {
      handleSaveChanges(elementIndex, item, itemIndex);
      setFieldSelected({});
    } else {
      setFieldSelected({...item, index: itemIndex});
    }
  };

  /* HANLDE DATA CHANGES */
  const handleDataChanges = value => {
    allData[fieldSelected.index].data = value;
    setAllData([...allData]);
  };

  return (
    <View style={styles.phonesList}>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <View style={styles.dataElement}>
            <Icon
              name={item.icon}
              Borderless
              forceColor
              color={item.icon !== 'my_link' ? Colors.gray : null}
            />

            {/* DATA FIELD */}
            <View style={styles.dataElementTextContainer}>
              <Text style={styles.dataElementType}>{item.type}</Text>
              {fieldSelected.index !== index && (
                <Text style={styles.dataElementData}>{item.data}</Text>
              )}
              {fieldSelected.index === index && (
                <TextInput
                  autoFocus={true}
                  style={styles.dataElementDataEditable}
                  value={item.data}
                  onChangeText={text => handleDataChanges(text)}
                />
              )}
            </View>

            {/* EDIT / CONFIRM CHANGES */}
            <Icon
              name={fieldSelected.index === index ? 'check_mark' : 'pencil'}
              Borderless
              forceColor
              color={Colors.gray}
              onPress={() =>
                handleItemSelection(fieldSelected.index === index, item, index)
              }
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default Emails;

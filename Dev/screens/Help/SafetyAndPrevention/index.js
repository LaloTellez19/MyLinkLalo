import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/Text';
import Icon from '../../../components/Icon';

const width = Layout.window.width;
const height = Layout.window.height - 63 - 85;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: height,
  },
  list: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  listHeader: {
    flex: 1,
    width: '100%',
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listHeaderText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  /* LIST ITEM STYLES */
  itemContainer: {
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    paddingBottom: 10,
  },
  item: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  itemText: {
    width: width / 1.5,
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginLeft: 5,
  },
  options: {
    width: width,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: Colors.grayLight,
  },
  optionsText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'justify',
    marginBottom: 10,
  },
});

function SafetyAndPrevention(props) {
  const {data} = props;

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={data}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>
              {'Seguridad y Prevención'}
            </Text>
          </View>
        }
        renderItem={({item, index}) => <Item item={item} />}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
}

const Item = ({item}) => {
  const [show, setShow] = React.useState(false);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.title}</Text>
        <Icon
          name={show ? 'arrow_up' : 'arrow_down'}
          size={50}
          factor={0.8}
          forceColor
          color={Colors.gray}
          Borderless
          onPress={() => setShow(!show)}
        />
      </View>

      {/* ANSWER */}
      {show && (
        <View style={styles.options}>
          {item.options.map((option, index) => {
            return (
              <Text key={index} style={styles.optionsText}>
                {`\u2022 ${option}`}
              </Text>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default SafetyAndPrevention;

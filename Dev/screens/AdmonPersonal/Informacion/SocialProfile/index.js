import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import MenuContextual from '../../../../components/MenuContextual';

const width = Layout.window.width;
const height = Layout.window.height;
const itemHeight = 65;

/* STYLES */
const styles = StyleSheet.create({
  /* CURRENT PAGE STYLES */
  page: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingLeft: 15,
    marginTop: 15,
  },
  pageText: {
    fontSize: 20,
    paddingLeft: 20,
    color: Colors.gray,
  },
  /* LIST STYLES */
  list: {
    width: width,
    height: height,
    marginTop: 8,
    paddingLeft: 0,
  },
  item: {
    width: width,
    height: itemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  underlinedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray,
  },
  textContainer: {
    width: width  / 2,
  },
  type: {
    fontSize: 16,
    paddingLeft: 5,
    color: Colors.defaultTextColor,
  },
  data: {
    fontSize: 12,
    paddingLeft: 5,
    color: Colors.defaultTextColor,
  },
});

function SocialProfile(props) {
  const menuContext = ['Editar', 'Eliminar'];
  const {data} = props;
  const lastIndex = data.length - 1;
  const [itemSelected, setItemSelected] = React.useState({});
  const [contextMenu, setContextMenu] = React.useState(false);
  const [contentOffsetY, setContentOffsetY] = React.useState(0);

  const contextMenuOptions = [
    {
      text: menuContext[0],
      onPress: () => setContextMenu(false),
    },
    {
      text: menuContext[1],
      onPress: () => setContextMenu(false),
    },
  ];

  /* HANDLE ITEM SELECTION */
  const handleItemSelection = item => {
    setItemSelected(item);
    setContextMenu(true);
  };

  return (
    <View>
      {/* LIST */}
      <View style={styles.list}>
        <FlatList
          nestedScrollEnabled={true}
          onScroll={event => {
            setContentOffsetY(event.nativeEvent.contentOffset.y);
          }}
          onTouchStart={() => setContextMenu(false)}
          data={data}
          renderItem={({item, index}) => (
            <View style={styles.item}>
              <Icon
                name={item.name}
                size={60}
                Borderless
                forceColor
                color={Colors.gray}
              />

              <View style={styles.underlinedContainer}>
                {/* TYPE / DATA */}
                <View style={styles.textContainer}>
                  <Text style={styles.type}>{item.type}</Text>
                  <Text style={styles.data}>{item.data || ''}</Text>
                </View>

                {/* OPTIONS */}
                <TouchableOpacity
                  onPress={event => {
                    handleItemSelection({...item, index});
                  }}>
                  <Icon
                    name="options"
                    factor={0.7}
                    Borderless
                    forceColor
                    color={Colors.gray}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* CONTEXT MENU */}
        {contextMenu && (
          <MenuContextual
            opciones={contextMenuOptions}
            index={itemSelected.index}
            itemHeight={itemHeight}
            lastIndex={lastIndex}
            contentOffsetY={contentOffsetY}
            initialValue={30}
          />
        )}
      </View>
    </View>
  );
}

export default SocialProfile;

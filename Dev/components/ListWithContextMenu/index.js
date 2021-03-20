import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import MenuContextual from '../MenuContextual';

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});

function ListWithContextMenu(props) {
  const {
    data,
    ListItem,
    ListHeaderComponent,
    ListFooterComponent,
    lastIndex,
    optionSelected,
    allMenuOptions,
    itemSelected,
    itemHeight,
    initialValue,
    underlayColor,
    updateListInViewOffset,
    idExtractor,
    icons,
    right,
  } = props;

  const [showContextMenu, setShowContextMenu] = React.useState(false);
  const [contentOffsetY, setContentOffsetY] = React.useState(0);

  return (
    <View style={styles.listContainer}>
      <FlatList
        nestedScrollEnabled={true}
        onScroll={event => {
          setContentOffsetY(event.nativeEvent.contentOffset.y);
        }}
        onTouchStart={() => {
          setShowContextMenu(false);
        }}
        data={data}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({item, index}) =>
          ListItem({...item, index}, () => setShowContextMenu(true))
        }
        ListFooterComponent={ListFooterComponent}
        keyExtractor={(item, index) =>
          idExtractor ? item.id : index.toString()
        }
        onMomentumScrollEnd={event => {
          if (updateListInViewOffset) {
            const offsetY = event.nativeEvent.contentOffset.y;
            updateListInViewOffset ? updateListInViewOffset(offsetY) : null;
          }
        }}
      />

      {/* CONTEXTUAL MENU */}
      {showContextMenu && !optionSelected && (
        <MenuContextual
          opciones={allMenuOptions}
          index={itemSelected.index}
          itemHeight={itemHeight}
          lastIndex={lastIndex}
          contentOffsetY={contentOffsetY}
          initialValue={initialValue}
          underlayColor={underlayColor}
          icons={icons}
          right={right}
        />
      )}
    </View>
  );
}

export default ListWithContextMenu;

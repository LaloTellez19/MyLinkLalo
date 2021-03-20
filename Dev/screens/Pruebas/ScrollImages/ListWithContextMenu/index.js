import React from 'react';
import {View, FlatList} from 'react-native';

import Text from '../../../../components/Text';
import MenuContextual from '../../../../components/MenuContextual';

function ListWithContextMenu(props) {
  const {
    data,
    listStyle,
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
  } = props;

  const [showContextMenu, setShowContextMenu] = React.useState(false);
  const [contentOffsetY, setContentOffsetY] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const refreshingList = () => {
    setTimeout(() => {
      setRefreshing(true);
    }, 200);
    setRefreshing(false);
  };

  return (
    <View style={listStyle}>
      <FlatList
        scrollEnabled={true}
        initialNumToRender={10}
        nestedScrollEnabled={true}
        onScroll={event => {
          setContentOffsetY(event.nativeEvent.contentOffset.y);
        }}
        onTouchStart={() => {
          setShowContextMenu(false);
        }}
        onEndReached={() => console.log('onEndReached')}
        data={data}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({item, index}) =>
          ListItem({...item, index}, () => setShowContextMenu(true))
        }
        ListFooterComponent={ListFooterComponent}
        keyExtractor={(item, index) => index.toString()}
        // onRefresh={refreshingList}
        // refreshing={refreshing}
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
        />
      )}
    </View>
  );
}

export default ListWithContextMenu;

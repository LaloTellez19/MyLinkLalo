import React from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';

import Layout from '../../../constants/Layout';

import {galleryResponse} from '../../../testData/dataAdmon';

const width = Layout.window.width;
const listWidth = width;
const activeWidth = width / 2;
const nonActiveWidth = width / 3;

/* STYLES */
const styles = StyleSheet.create({
  list: {
    width: listWidth,
    marginTop: 50,
    borderWidth: 0.5,
    alignSelf: 'center',
  },
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: width,
		alignSelf: 'center',
		alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'blue',
  },
  imgContainer: {
    width: nonActiveWidth,
    height: nonActiveWidth,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 10,
  },
  img: {
    width: nonActiveWidth,
    height: nonActiveWidth,
    borderRadius: 10,
  },
});

function PromosScroll(props) {
  const data = galleryResponse.data.gallery;
  const [active, setActive] = React.useState(0);

  return (
    <FlatList
      horizontal
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({item, index}) => (
        <Promo item={item} index={index} active={active} />
      )}
      keyExtractor={(item, index) => index.toString()}
      style={styles.list}
      contentContainerStyle={styles.contentContainerStyle}
      onScroll={event => {
        const offsetX = event.nativeEvent.contentOffset.x;
        if (offsetX % listWidth === 0) {
          const index = offsetX / listWidth;
          console.log('active: ', index);
          setActive(index);
        }
      }}
    />
  );
}

const Promo = ({item, index, active}) => {
	const isActive = index === active;
	const itemWidth = isActive ? {width: activeWidth} : {width: nonActiveWidth};
  const margin = width - (activeWidth + 80);

  const activeMargin = {
    marginLeft: isActive ? 40 + margin / 2 : 20,
  };

  const activeItem = {
    width: isActive ? activeWidth : nonActiveWidth,
		height: isActive ? activeWidth : nonActiveWidth,
  };

  return (
    <View style={[styles.item]}>
      <View style={[styles.imgContainer, activeItem]}>
        <Image style={[styles.img, activeItem]} source={{uri: item.uri}} />
        {isActive && (
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              height: 15,
              width: 15,
              backgroundColor: 'blue',
              borderRadius: 360,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default PromosScroll;

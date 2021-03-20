import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height - 63 - 73;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: '100%',
    borderWidth: 4,
    borderColor: 'red',
  },
  header: {
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
  },
  listContainer: {
    width: '100%',
    height: height,
    borderWidth: 4,
    borderColor: 'green',
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
    height: 40,
    borderBottomWidth: 0.5,
    backgroundColor: 'white',
  },
  listItem: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
  },
});

const listData = [
  {
    text: '1',
  },
  {
    text: '2',
  },
  {
    text: '3',
  },
  {
    text: '4',
  },
  {
    text: '5',
  },
  {
    text: '6',
  },
  {
    text: '7',
  },
  {
    text: '8',
  },
  {
    text: '9',
  },
  {
    text: '10',
  },
  {
    text: '1',
  },
  {
    text: '2',
  },
  {
    text: '3',
  },
  {
    text: '4',
  },
  {
    text: '5',
  },
  {
    text: '6',
  },
  {
    text: '7',
  },
  {
    text: '8',
  },
  {
    text: '9',
  },
  {
    text: '10',
  },
  {
    text: '1',
  },
  {
    text: '2',
  },
  {
    text: '3',
  },
  {
    text: '4',
  },
  {
    text: '5',
  },
  {
    text: '6',
  },
  {
    text: '7',
  },
  {
    text: '8',
  },
  {
    text: '9',
  },
  {
    text: '10',
  },
];

class ScrollImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
    };
  }

  onScroll = offsetY => {
    if (offsetY >= 220) {
      if (this.state.scrollEnabled) {
        this.setState({
          scrollEnabled: false,
        });
      }
    } else {
      this.setState({
        scrollEnabled: true,
      });
    }
  };

  render() {
    const {scrollEnabled} = this.state;
    console.log(!scrollEnabled);
    return (
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView
          nestedScrollEnabled={true}
          scrollEnabled={scrollEnabled}
          onScroll={event => {
            const offsetY = event.nativeEvent.contentOffset.y;
            console.log('offsetY: ', offsetY);
            this.onScroll(offsetY);
          }}>
          <View style={styles.header}>
            <Text>{'Holis'}</Text>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              nestedScrollEnabled={true}
              scrollEnabled={!scrollEnabled}
              data={listData}
              ListHeaderComponent={
                <View style={styles.listHeader}>
                  <Text>{'List Header'}</Text>
                </View>
              }
              renderItem={({item}) => (
                <View style={styles.listItem}>
                  <Text>{item.text}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              style={styles.list}
              stickyHeaderIndices={[0]}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ScrollImages;

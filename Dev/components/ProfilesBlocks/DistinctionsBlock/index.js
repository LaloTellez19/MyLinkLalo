import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  /* BLOCK NAME STYLES */
  blockName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  blockNameText: {
    width: width / 1.3,
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 10,
    marginRight: 10,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.personal,
  },
  /* DISTINCTIONS LIST STYLES */
  distinctionsList: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  distinction: {
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
  },
  distinctionImageContainer: {
    width: width / 4,
    height: width / 4,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  distinctionImage: {
    width: width / 4,
    height: width / 4,
    borderRadius: 10,
  },
  distinctionText: {
    width: width / 4,
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
});

class DistinctionsBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  /* HANDLE SEE ALL */
  handleSeeAll = () => {
    Navigation.showOverlay({
      component: {
        name: 'my-link.Awards',
        passProps: {
          data: this.props.data,
        },
      },
    });
  };

  render() {
    const {data} = this.props;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

    const backgroundColor = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    const textColor_2 = vipDark
      ? {color: Colors.golden}
      : vip
      ? {color: 'black'}
      : {color: Colors.personal};

    const textColor_3 = vipDark
      ? {color: Colors.spanishGray}
      : {color: Colors.defaultTextColor};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* BLOCK NAME */}
        <View style={styles.blockName}>
          <Text style={[styles.blockNameText, textColor]}>{'Distinciones'}</Text>
          <TouchableOpacity onPress={() => this.handleSeeAll()}>
            <Text style={[styles.seeAll, textColor_2]}>{'Ver todo'}</Text>
          </TouchableOpacity>
        </View>

        {/* DISTINCTIONS LIST */}
        <View style={styles.distinctionsList}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data.awards.slice(0, 3)}
            renderItem={({item, index}) => (
              <Award
                item={{...item, index}}
                handleSeeDistinction={this.handleSeeAll}
                textColor={textColor_3}
              />
            )}
            keyExtractor={(index, item) => item.toString()}
          />
        </View>
      </View>
    );
  }
}

const Award = ({item, handleSeeDistinction, textColor}) => {
  return (
    <TouchableOpacity
      style={styles.distinction}
      onPress={() => handleSeeDistinction(item)}
      activeOpacity={0.7}>
      <View style={styles.distinctionImageContainer}>
        <Image style={styles.distinctionImage} source={{uri: item.img}} />
      </View>
      <Text style={[styles.distinctionText, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default DistinctionsBlock;

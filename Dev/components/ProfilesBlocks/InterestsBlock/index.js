import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';
import Icon from '../../Icon';

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
    // fontWeight: 'bold',
    color: Colors.defaultTextColor,
    marginLeft: 10,
    marginRight: 10,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.personal,
  },
  /* INTERESTS STYLES */
  interests: {
    width: width,
    marginTop: 18,
    marginBottom: 19,
    marginLeft: 10,
    marginRight: 10,
  },
  interest: {
    maxWidth: (width - 20) / 3.4,
    minWidth: (width - 20) / 6.7,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 12,
    marginTop: 2.5,
    marginBottom: 2.5,
    marginRight: 4,
    marginLeft: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  interestText: {
    fontSize: 14,
    color: Colors.dimGray,
    textAlign: 'center',
  },
});

class InterestsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSeeAll = () => {
    console.log('handleSeeAll!!!');
  };

  interestSelected = item => {
    console.log('interestSelected!!!', item);
  };

  render() {
    const {data} = this.props;
    const interests = data.intereses;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

    /* DARK MODE STYLES */
    const backgroundColor = vipDark
    ? {backgroundColor: Colors.jet}
    : {backgroundColor: 'white'};

    const interestBackground = vipDark
      ? {backgroundColor: 'black'}
      : {backgroundColor: 'white'};

    const interestText = vipDark ? {color: 'white'} : {color: Colors.dimGray};

    const textColor = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    const textColor_2 = vipDark
      ? {color: Colors.golden}
      : vip
      ? {color: 'black'}
      : {color: Colors.personal};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* BLOCK NAME */}
        <View style={styles.blockName}>
          <Text style={[styles.blockNameText, textColor]}>{'Intereses'}</Text>
          <TouchableOpacity onPress={() => this.handleSeeAll()}>
            <Text style={[styles.seeAll, textColor_2]}>{'Ver todo'}</Text>
          </TouchableOpacity>
        </View>

        {/* INTERESTS */}
        <FlatList
          numColumns={4}
          data={interests}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[styles.interest, interestBackground]}
              key={index}
              onPress={() => this.interestSelected(item)}>
              <Text
                style={[styles.interestText, interestText]}
                numberOfLines={1}>{`#${item}`}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.interests}
        />
      </View>
    );
  }
}

export default InterestsBlock;

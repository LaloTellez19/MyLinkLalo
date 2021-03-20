import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';
import Icon from '../../Icon';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
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
  /* STORIES STYLES */
  stories: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  storie: {
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  storieImageContainer: {
    width: width / 5,
    height: width / 5,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storieImage: {
    width: width / 5.5,
    height: width / 5.5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  storieText: {
    width: width / 4.5,
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginTop: 15,
  },
  storieCounter: {
    width: width / 13,
    height: width / 13,
    borderRadius: 360,
    position: 'absolute',
    bottom: 20,
    elevation: 5,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storieCounterText: {
    fontSize: 12,
    color: Colors.grayBold,
  },
});

class StoriesBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  /* HANDLE SEE STORIE */
  handleSeeStorie = item => {
    console.log(`SEE STORIE ${item.index}`);
  };

  render() {
    const {data} = this.props;
    const allStories = data.stories;
    const type = data.tipo;
    const vipDark = data.vip === 2;

    const backgroundColor = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* BLOCK NAME */}
        <View style={styles.blockName}>
          <Text style={[styles.blockNameText, textColor]}>
            {'Historias Destacadas'}
          </Text>
        </View>

        {/* STORIES */}
        <View style={styles.stories}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={allStories}
            renderItem={({item, index}) => (
              <Storie
                item={{...item, index}}
                handleSeeStorie={this.handleSeeStorie}
                backgroundColor={backgroundColor}
                textColor={textColor}
                type={type}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const Storie = ({item, handleSeeStorie, backgroundColor, textColor, type}) => {
  const borderRadius = type === 0 ? {borderRadius: 360} : {borderRadius: 10};

  return (
    <TouchableOpacity
      style={styles.storie}
      activeOpacity={0.6}
      onPress={() => handleSeeStorie(item)}>
      <View
        style={[styles.storieImageContainer, backgroundColor, borderRadius]}>
        <Image
          style={[styles.storieImage, borderRadius]}
          source={{uri: item.img}}
        />
      </View>
      <Text style={[styles.storieText, textColor]} numberOfLines={1}>
        {item.title}
      </Text>

      <View style={styles.storieCounter}>
        <Text style={styles.storieCounterText}>
          {item.counter < 100 ? item.counter : '99+'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default StoriesBlock;

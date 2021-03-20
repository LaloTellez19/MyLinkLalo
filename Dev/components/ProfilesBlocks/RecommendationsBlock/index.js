import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';
import Icon from '../../Icon';
import UserImage from '../../UserImage';

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
  /* CARDS CONTAINER STYLES */
  cardsContainer: {
    width: width,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  card: {
    width: width / 3,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  cardName: {
    width: width / 3,
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 10,
  },
  cardLink: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
});

class RecommendationsBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  /* HANDLE SEE ALL */
  handleSeeAll = () => {
    Navigation.showOverlay({
      component: {
        name: 'my-link.ProfileRecommendations',
        passProps: {
          data: this.props.data,
        },
      },
    });
  };

  /* HANDLE SEE RECOMMENDATION */
  handleSeeRecommendation = item => {
    console.log(`SEE RECOMMENDATION ${item}`);
  };

  render() {
    const {data} = this.props;
    const name = data.nombre;
    const vip = data.vip === 1;
    const businessVIP = data.tipo === 1 && vip;
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
      ? {color: Colors.grayLight}
      : {color: Colors.defaultTextColor};

    const textColor_4 = vipDark
      ? {color: Colors.spanishGray}
      : {color: Colors.defaultTextColor};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* BLOCK NAME */}
        <View style={styles.blockName}>
          <Text style={[styles.blockNameText, textColor]}>{`${
            name !== undefined ? name[0] : name
          } te recomienda`}</Text>
          <TouchableOpacity onPress={() => this.handleSeeAll()}>
            <Text style={[styles.seeAll, textColor_2]}>{'Ver todo'}</Text>
          </TouchableOpacity>
        </View>

        {/* CARDS CONTAINER */}
        <View style={styles.cardsContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data.cards.slice(0, 3)}
            renderItem={({item, index}) => (
              <Recommendation
                item={{...item, index}}
                handleSeeRecommendation={this.handleSeeAll}
                vipDark={vipDark}
                businessVIP={businessVIP}
                textColors={[textColor_3, textColor_4]}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

function Recommendation({
  item,
  handleSeeRecommendation,
  vipDark,
  businessVIP,
  textColors,
}) {
  const getBackgroundColor = () => {
    let color = '';

    if (vipDark) {
      color = Colors.eerieBlack;
      console.log(0);
    } else if (businessVIP) {
      color = Colors.business;
      console.log(1);
    } else {
      color = Colors.gray;
      console.log(2);
    }

    return color;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSeeRecommendation(item.index)}
      activeOpacity={0.7}>
      <UserImage link={item.link} userSize={80} borderRadius={10} />
      <Text style={[styles.cardName, textColors[0]]} numberOfLines={1}>
        {item.nombre}
      </Text>
      <Text style={[styles.cardLink, textColors[1]]}>{item.link}</Text>
      <Icon
        name={item.category || 'food'}
        forceColor
        color={vipDark ? Colors.platinum : 'white'}
        background={
          businessVIP && item.vip === 1 ? 'black' : getBackgroundColor()
        }
      />
    </TouchableOpacity>
  );
};

export default RecommendationsBlock;

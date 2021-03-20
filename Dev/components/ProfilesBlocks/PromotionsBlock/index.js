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
import UserImage from '../../UserImage';

const width = Layout.window.width;
const promotionsSize = 210;
const promotionSize = 165;

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
  /* PROMOTIONS COUNTER STYLES */
  promotionsCounter: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
  },
  promotionsCounterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.defaultTextColor,
    marginLeft: 5,
  },
  /* PROMOTIONS LIST STYLES */
  promotions: {
    width: width,
    height: promotionsSize,
    marginTop: 0,
    marginBottom: 5,
  },
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  promotion: {
    width: promotionSize,
    height: promotionSize,
    backgroundColor: 'white',
    elevation: 5,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  promotionTextContainer: {
    height: promotionSize / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promotionTitle: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  promotionImg: {
    width: promotionSize - 5,
    height: promotionSize / 2,
    alignSelf: 'center',
  },
  promotionValid: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  userImage: {
    position: 'absolute',
    right: -45,
    top: 65,
  },
  /* OPTIONS STYLES */
  options: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  option: {
    width: width / 4,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 5,
    marginBottom: 20,
  },
});

class PromotionsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePromotion: 0,
      offValue: width / 1.7,
    };

    this.promotionOptions = this.promotionOptions.bind(this);
  }

  setActivePromotion = active => {
    this.setState({
      activePromotion: active,
    });
  };

  promotionOptions = (save = false) => {
    if (save) {
      console.log('Save!!!');
    } else {
      console.log('Share!!!');
    }
  };

  render() {
    const {activePromotion, offValue} = this.state;
    const {data} = this.props;
    const allPromotions = data.promotions;
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
      ? {color: Colors.battleshipGray}
      : {color: Colors.defaultTextColor};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* BLOCK NAME */}
        <View style={styles.blockName}>
          <Text style={[styles.blockNameText, textColor]}>{'Promociones'}</Text>
          <TouchableOpacity onPress={() => this.handleSeeAll()}>
            <Text style={[styles.seeAll, textColor_2]}>{'Ver todo'}</Text>
          </TouchableOpacity>
        </View>

        {/* PROMOTIONS COUNTER */}
        <View style={styles.promotionsCounter}>
          <Icon
            name="brand"
            forceColor
            color={vip ? 'white' : Colors.gray}
            background={vip ? Colors.business : 'white'}
          />
          <Text style={styles.promotionsCounterText}>
            {`${allPromotions.length} promociones`}
          </Text>
        </View>

        {/* PROMOTIONS COUNTER */}
        <View style={styles.promotions}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={allPromotions}
            renderItem={({item, index}) => (
              <Promotion
                item={item}
                active={index === activePromotion}
                linkname={this.props.linkname}
                firstIndex={index === 0}
                lastIndex={index === allPromotions.length - 1}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.contentContainerStyle}
            onScroll={event => {
              const offsetX = event.nativeEvent.contentOffset.x;
              const index = offsetX / offValue;
              console.log('diff: ', offsetX / offValue);
              if (index >= activePromotion + 0.9) {
                console.log('index + : ', offsetX / offValue);
                this.setActivePromotion(activePromotion + 1);
              } else if (index <= activePromotion - 0.95) {
                console.log('index - : ', offsetX / offValue);
                this.setActivePromotion(activePromotion - 1);
              }
            }}
          />
        </View>

        {/* OPTIONS */}
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => this.promotionOptions(true)}>
            <Icon
              name="box_in"
              factor={1}
              Borderless
              forceColor
              color={vipDark ? Colors.platinum : Colors.gray}
            />
            <Text style={[styles.optionText, textColor_3]}>{'Guardar'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => this.promotionOptions()}>
            <Icon
              name="link_share"
              factor={1}
              Borderless
              forceColor
              color={vipDark ? Colors.platinum : Colors.gray}
            />
            <Text style={[styles.optionText, textColor_3]}>{'Compartir'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const Promotion = ({item, active, linkname, firstIndex, lastIndex}) => {
  const activeSize = promotionSize + 35;
  const margin = width / 2 - 100;
  const activeStyles = StyleSheet.create({
    size: {
      width: active ? activeSize : promotionSize,
      height: active ? activeSize : promotionSize,
      // marginTop: !active ? 23.5 : 5,
      marginRight: lastIndex ? margin : 25,
      marginLeft: firstIndex ? margin : 25,
    },
    textContainer: {
      height: active ? activeSize / 4 : promotionSize / 4,
    },
    promotionImg: {
      width: active ? activeSize - 5 : promotionSize - 5,
      height: active ? activeSize / 2 : promotionSize / 2,
    },
    fontSize: {
      fontSize: active ? 16 : 14,
    },
  });

  return (
    <View style={[styles.promotion, activeStyles.size]}>
      <View style={[styles.promotionTextContainer, activeStyles.textContainer]}>
        <Text style={[styles.promotionTitle, activeStyles.fontSize]}>
          {item.title}
        </Text>
      </View>
      <Image
        style={[styles.promotionImg, activeStyles.promotionImg]}
        source={{uri: item.img}}
      />
      <View style={styles.promotionTextContainer}>
        <Text style={[styles.promotionValid, activeStyles.fontSize]}>
          {item.valid}
        </Text>
      </View>
      {active && (
        <View style={styles.userImage}>
          <UserImage link={linkname} userSize={70} borderRadius={10} />
        </View>
      )}
    </View>
  );
};

export default PromotionsBlock;

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';
import Icon from '../../Icon';
import ComplimentsContainer from '../../ComplimentsContainer';

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
    marginBottom: 0,
  },
  blockNameText: {
    width: width / 1.3,
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 10,
    marginRight: 10,
  },
  /* COMPLIMENTS STYLES */
  complimentsContainer: {
    marginBottom: 2,
  },
  complimentsCircle: {
    width: width / 2.5,
    height: width / 2.5 / 2,
    borderTopRightRadius: width / 2.5,
    borderTopLeftRadius: width / 2.5,
    backgroundColor: Colors.grayLight,
    position: 'absolute',
    alignSelf: 'center',
  },
  compliments: {
    alignSelf: 'center',
    alignItems: 'center',
    width: width,
    height: 150,
    backgroundColor: Colors.grayLight,
    marginTop: 0,
  },
  compliment: {
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  topCompliment: {
    alignItems: 'center',
    marginTop: -7,
    marginLeft: 20,
    marginRight: 20,
  },
  complimentTotal: {
    fontSize: 14,
    color: Colors.grayBold,
    marginTop: 5,
    marginBottom: 5,
    elevation: 1,
  },
  complimentImageContainer: {
    width: width / 4.5,
    height: width / 4.5,
    borderRadius: 360,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  complimentImage: {
    width: width / 4.5,
    height: width / 4.5,
    borderRadius: 360,
  },
  topImageContainer: {
    width: width / 3.8,
    height: width / 3.8,
    borderRadius: 360,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    backgroundColor: Colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  topImage: {
    width: width / 3.8,
    height: width / 3.8,
    borderRadius: 360,
  },
  complimentName: {
    width: width / 5,
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginTop: 2,
    textAlign: 'center',
  },
});

/* ILUSTRATIONS */
const ilustrations = {
  trendy:
    'https://i.picsum.photos/id/856/200/300.jpg?hmac=aENqXLQRhaJimtL7dToYysOgNeVwtibR-Gj5IUAS4I4',
  influencer:
    'https://i.picsum.photos/id/984/200/300.jpg?hmac=mLBN3lSvSl08Vh8Kw96TLY7v239gr1idtxVXvYFDkSc',
  sexier:
    'https://i.picsum.photos/id/1002/200/300.jpg?hmac=QAnT71VGihaxEf_iyet9i7yb3JvYTzeojsx-djd3Aos',
};

class IdentityBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [1, 0, 2],
    };
  }

  handleSeeAll = () => {
    Navigation.showOverlay({
      component: {
        name: 'my-link.profileCompliments',
        passProps: {
          data: this.props.data,
        },
      },
    });
  };

  /* GET TOTAL DISPLAYED */
  getTotalDisplayed = value => {
    let displayedValue = 0;

    if (value >= 1000 && value < 1000000) {
      displayedValue = `${value / 1000}K`;
    } else if (value >= 1000000) {
      displayedValue = `${value / 1000000}M`;
    } else {
      displayedValue = value;
    }

    return displayedValue;
  };

  render() {
    const {order} = this.state;
    const {data} = this.props;
    const type = data.tipo;
    const allCompliments = data.compliments;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

    /* DARK MODE STYLES */
    const backgroundColor = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const complimentsBackgroundColor = vipDark
      ? {backgroundColor: 'black'}
      : {backgroundColor: Colors.grayLight};

    const textColor = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    const textColor_2 = vipDark
      ? {color: Colors.golden}
      : vip
      ? {color: 'black'}
      : {color: Colors.personal};

    const textColor_3 = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* BLOCK NAME */}
        <View style={styles.blockName}>
          <Text style={[styles.blockNameText, textColor]}>
            {'Mi identidad'}
          </Text>
          <TouchableOpacity onPress={() => this.handleSeeAll()}>
            <Text style={[styles.seeAll, textColor_2]}>{'Ver todo'}</Text>
          </TouchableOpacity>
        </View>

        {/* COMPLIMENTS */}
        <View style={styles.complimentsContainer}>
          <ComplimentsContainer dark={vipDark}>
            <View style={[styles.compliments, complimentsBackgroundColor]}>
              <ScrollView horizontal>
                {order.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.handleSeeAll()}>
                    <Compliment
                      key={index}
                      compliment={allCompliments[item]}
                      top={index === 1}
                      getTotalDisplayed={this.getTotalDisplayed}
                      textColor={textColor_3}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </ComplimentsContainer>
        </View>
      </View>
    );
  }
}

const Compliment = ({compliment, top, getTotalDisplayed, textColor}) => {
  return (
    <View style={top ? styles.topCompliment : styles.compliment}>
      <Text style={[styles.complimentTotal, textColor]}>
        {getTotalDisplayed(compliment.total)}
      </Text>
      <View
        style={
          top ? styles.topImageContainer : styles.complimentImageContainer
        }>
        <Image
          style={top ? styles.topImage : styles.complimentImage}
          source={{uri: ilustrations[compliment.id]}}
        />
      </View>
      <Text style={[styles.complimentName, textColor]}>
        {compliment.compliment}
      </Text>
    </View>
  );
};

export default IdentityBlock;

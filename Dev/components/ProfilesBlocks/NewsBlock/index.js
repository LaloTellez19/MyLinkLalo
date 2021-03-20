import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

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
  seeAll: {
    fontSize: 14,
    color: Colors.personal,
  },
  /* NEWS STYLES */
  newsContainer: {
    width: width,
    marginTop: 10,
    marginBottom: 15,
    // borderTopWidth: 0.5,
    // borderBottomWidth: 0.5,
    // borderColor: Colors.gray,
  },
  newsImageContainer: {
    width: width,
    height: 220,
  },
  newsImage: {
    width: width,
    height: 220,
  },
  newsTextContainer: {
    width: width,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: Colors.davysGray,
    opacity: 0.6,
  },
  newsTitle: {
    fontSize: 16,
    color: Colors.grayBold,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,
  },
  newsContent: {
    fontSize: 12,
    color: Colors.grayBold,
    marginRight: 15,
    marginLeft: 15,
    textAlign: 'justify',
  },
  newsDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: -5,
  },
  newsDateText: {
    fontSize: 12,
    color: Colors.grayBold,
  },
  /* NEWS SELECTOR / INDICATOR STYLES */
  newsSelectorContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  newsSelector: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 360,
    elevation: 2,
    backgroundColor: Colors.gray,
    marginLeft: 5,
    marginRight: 5,
  },
  /* BOTTOM NEWS STYLES */
  bottomnNewsContainer: {
    width: width,
    height: 210,
    marginTop: 10,
    marginBottom: 20,
  },
  bottomNewsItem: {
    width: width,
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomNewsImageContainer: {
    width: 95,
    height: 95,
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bottomNewsImage: {
    width: 95,
    height: 95,
    resizeMode: 'cover',
  },
  bottomNewsTextContainer: {
    marginLeft: 10,
  },
  bottomNewsTitle: {
    fontSize: 16,
    color: Colors.grayBold,
    marginTop: 10,
    marginBottom: 2,
  },
  bottomNewsContent: {
    width: width / 1.55,
    fontSize: 12,
    color: Colors.grayBold,
    textAlign: 'justify',
  },
  bottomNewsDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
  },
  bottomNewsDateText: {
    fontSize: 12,
    color: Colors.gray,
  },
});

class NewsBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentNews: 0,
    };

    this.newsScroll = React.createRef(null);
  }

  componentDidMount() {}

  /* HANDLE SEE ALL */
  handleSeeAll = () => {
    Navigation.showOverlay({
      component: {
        name: 'my-link.NewsProfile',
        passProps: {
          data: this.props.data,
        },
      },
    });
  };

  /* HANDLE SEE NEWS */
  handleSeeNews = item => {
    console.log(`SEE NEWS ${item.index}`);
  };

  /* SET CURRENT NEWS */
  setCurrentNews = index => {
    this.setState({
      currentNews: index,
    });
  };

  /* SELECT NEWS DISPLAYED */
  selectNewsDisplayed = index => {
    this.setCurrentNews(index);
    if (this.newsScroll) {
      this.newsScroll.current.scrollTo({
        x: width * index,
        y: 0,
        animated: false,
      });
    }
  };

  render() {
    const {currentNews} = this.state;
    const {data} = this.props;
    const allNews = data.news;
    const vipDark = data.vip === 2;

    const backgroundColor = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    const textColor_2 = vipDark
      ? {color: Colors.golden}
      : {color: Colors.personal};

    const textColor_3 = vipDark ? {color: 'white'} : {color: 'white'};

    const textColor_4 = vipDark ? {color: Colors.platinum} : {color: Colors.grayBold};

    const textColor_5 = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    const newsSelectorActiveColor = vipDark ? Colors.golden : Colors.business;

    const newSelectorColor = vipDark
      ? {backgroundColor: 'black'}
      : {backgroundColor: Colors.grayLight};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* BLOCK NAME */}
        <View style={styles.blockName}>
          <Text style={[styles.blockNameText, textColor]}>{'Noticias'}</Text>
          <TouchableOpacity onPress={() => this.handleSeeAll()}>
            <Text style={[styles.seeAll, textColor_2]}>{'Ver todo'}</Text>
          </TouchableOpacity>
        </View>

        {/* NEWS */}
        <ScrollView
          ref={this.newsScroll}
          style={styles.newsContainer}
          pagingEnabled={true}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={event => {
            if (event.nativeEvent.contentOffset.x % width === 0) {
              const currentIndex = event.nativeEvent.contentOffset.x / width;
              this.setCurrentNews(currentIndex);
            }
          }}>
          {allNews.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.newsItem}
                key={index}
                onPress={() => this.handleSeeNews({...item, index})}
                activeOpacity={0.7}>
                <View style={styles.newsImageContainer}>
                  <Image style={styles.newsImage} source={{uri: item.img}} />
                </View>
                <View style={styles.newsTextContainer}>
                  <Text
                    PublicationTitle
                    style={[styles.newsTitle, textColor_3]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.newsContent, textColor_3]}
                    numberOfLines={2}>
                    {item.content}
                  </Text>

                  <View style={styles.newsDate}>
                    <Icon
                      name="calendar"
                      factor={0.6}
                      Borderless
                      forceColor
                      color={'white'}
                    />
                    <Text style={[styles.newsDateText, textColor_3]}>{`${
                      item.date.day
                    } ${item.date.month}`}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* NEWS SELECTOR / INDICATOR */}
        <View style={styles.newsSelectorContainer}>
          {allNews.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.newsSelector,
                newSelectorColor,
                index === currentNews
                  ? {backgroundColor: newsSelectorActiveColor}
                  : null,
              ]}
              onPress={() => this.selectNewsDisplayed(index)}
            />
          ))}
        </View>

        {/* BOTTOM NEWS */}
        {/* <ScrollView
          style={styles.bottomnNewsContainer}
          nestedScrollEnabled={true}>
          {allNews.map((item, index) => {
            return (
              <View key={index}>
                {index !== currentNews && (
                  <TouchableOpacity
                    style={styles.bottomNewsItem}
                    activeOpacity={0.7}
                    onPress={() => this.selectNewsDisplayed(index)}>
                    <View style={styles.bottomNewsImageContainer}>
                      <Image
                        style={styles.bottomNewsImage}
                        source={{uri: item.img}}
                      />
                    </View>
                    <View style={styles.bottomNewsTextContainer}>
                      <Text
                        PublicationTitle
                        style={[styles.bottomNewsTitle, textColor_4]}>
                        {item.title}
                      </Text>
                      <Text
                        style={[styles.bottomNewsContent, textColor_5]}
                        numberOfLines={3}>
                        {item.content}
                      </Text>

                      <View style={styles.bottomNewsDate}>
                        <Icon
                          name="calendar"
                          factor={0.6}
                          Borderless
                          forceColor
                          color={vipDark ? Colors.silverChalice : Colors.gray}
                        />
                        <Text
                          style={[styles.bottomNewsDateText, textColor_5]}>{`${
                          item.date.day
                        } ${item.date.month}`}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </ScrollView> */}
      </View>
    );
  }
}

export default NewsBlock;

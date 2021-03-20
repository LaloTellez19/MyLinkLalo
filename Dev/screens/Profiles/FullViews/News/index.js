import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Layout from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Header from '../../../../components/Header';
import ProfilePicture from '../../../../components/ProfilePicture';

const width = Layout.window.width;
const height = Layout.window.height;
const newsHeight = 120;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: '100%',
    backgroundColor: 'white',
  },
  /* TOP CONTAINER STYLES */
  topContainerStyles: {
    height: 240,
    elevation: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  topContainer: {
    width: width,
    height: 25,
    alignItems: 'center',
  },
  topContainerTitle: {
    fontSize: 20,
    color: Colors.defaultTextColor,
  },
  /* USER INFO STYLES */
  userInfo: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  businessName: {
    fontSize: 20,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  /* BRANCHES LIST */
  news: {
    width: '100%',
    height: height,
    backgroundColor: 'white',
  },
  newsList: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  listHeader: {
    height: 50,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    backgroundColor: 'white',
  },
  pickDate: {
    width: width,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  pickDateText: {
    width: '60%',
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 15,
  },
  /* BOTTOM NEWS STYLES */
  bottomNewsItem: {
    width: width,
    height: newsHeight,
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

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickDate: false,
      date: 'WELL',
      filteredNews: this.props.data.news,
      scrollEnabled: true,
    };
  }

  filterNews = (branches, filter) => {};

  componentDidMount() {
    // this.filterNews();
  }

  goBack = () => {
    Navigation.dismissOverlay(this.props.componentId);
  };

  getName = (names, lastNames) => {
    const name = names.concat(lastNames);
    const finalName = name.filter(item => item !== '');
    return finalName.join(' ');
  };

  getLocation = data => {
    return `${data.calle} ${data.colonia} ${data.estado} ${data.ciudad} ${
      data.codigo_postal
    }`;
  };

  setPickDate = () => {
    this.setState({pickDate: !this.state.pickDate});
  };

  onScroll = offsetY => {
    const needsScroll = this.state.filteredNews.length * newsHeight > height;
    if (offsetY >= 240 && needsScroll) {
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
    const {pickDate, date, filteredNews, scrollEnabled} = this.state;

    const {data} = this.props;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

    const backgroundColor = vipDark
      ? {backgroundColor: 'black'}
      : {backgroundColor: 'white'};

    const backgroundColor_2 = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.grayLight}
      : {color: Colors.defaultTextColor};

    const textColor_2 = vipDark
      ? {color: Colors.silverMetallic}
      : {color: Colors.defaultTextColor};

    const textColor_3 = vipDark
      ? {color: 'white'}
      : {color: Colors.defaultTextColor};

    return (
      <SafeAreaView style={[styles.mainContainer, backgroundColor]}>
        <ScrollView
          nestedScrollEnabled={true}
          scrollEnabled={scrollEnabled}
          onScroll={event => {
            const offsetY = event.nativeEvent.contentOffset.y;
            this.onScroll(offsetY);
          }}>
          <View style={[styles.topContainerStyles, backgroundColor]}>
            <Header
              goBack={() => this.goBack()}
              color={vipDark ? 'black' : 'white'}
            />
            {/* TOP CONTAINER */}
            <View style={styles.topContainer}>
              <Text style={[styles.topContainerTitle, textColor]}>
                {'Noticias'}
              </Text>
            </View>

            {/* USER INFO */}
            <View style={styles.userInfo}>
              <ProfilePicture
                linkname={data.linkname}
                size={100}
                Business={true}
              />
              <Text style={[styles.businessName, textColor_2]}>
                {this.getName(data.nombre, data.apellido)}
              </Text>
            </View>
          </View>

          <View style={styles.news}>
            <FlatList
              nestedScrollEnabled={true}
              data={filteredNews}
              scrollEnabled={!scrollEnabled}
              ListHeaderComponent={
                <View style={[styles.listHeader, backgroundColor_2]}>
                  <TouchableOpacity
                    style={styles.pickDate}
                    onPress={() => this.setPickDate()}>
                    <Text style={[styles.pickDateText, textColor_3]}>
                      {date}
                    </Text>
                    <Icon
                      name={pickDate ? 'arrow_up' : 'arrow_down'}
                      factor={0.8}
                      Borderless
                    />
                  </TouchableOpacity>
                </View>
              }
              renderItem={({item, index}) => (
                <NewsItem
                  item={{...item, index}}
                  textColors={[textColor, textColor_2, textColor_3]}
                  vipDark={vipDark}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              style={[styles.newsList, backgroundColor]}
              stickyHeaderIndices={[0]}
            />

            {/* DATE PICKER */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const NewsItem = ({item, textColors, vipDark}) => {
  return (
    <View style={styles.bottomNewsItem}>
      <View style={styles.bottomNewsImageContainer}>
        <Image style={styles.bottomNewsImage} source={{uri: item.img}} />
      </View>
      <View style={styles.bottomNewsTextContainer}>
        <Text PublicationTitle style={[styles.bottomNewsTitle, textColors[0]]}>
          {item.title}
        </Text>
        <Text
          style={[styles.bottomNewsContent, textColors[1]]}
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
          <Text style={[styles.bottomNewsDateText, textColors[1]]}>{`${
            item.date.day
          } ${item.date.month}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default News;

import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import Icon from '../../../components/Icon';
import Text from '../../../components/Text';

import {PurchaseDetail, ImageHeader} from '../StoreComponents';

/* DATA */
import {faqsResponse} from '../data';

const width = Layout.window.width;
const height = Layout.window.height - 63 - 83;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: '100%',
  },
  sectionTitle: {
    flex: 1,
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  sectionTitleText: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  /* FAQS STYLES */
  faqList: {
    width: '100%',
    height: height,
    backgroundColor: 'white',
  },
  list: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  answer: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 45,
  },
  answerText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  /* CONTACT STYLES */
  contact: {
    alignItems: 'center',
    marginBottom: 10,
  },
  contactUs: {
    marginTop: 15,
    marginBottom: 15,
  },
});

function Help(props) {
  const [faqs, setfaqs] = React.useState([]);
  const [scrollEnabled, setScrollEnabled] = React.useState(false);

  /* COMPONENTDIDMOUNT */
  React.useEffect(() => {
    setfaqs(faqsResponse.data.faqs);
  }, []);

  const onScroll = offsetY => {
    if (offsetY >= 120) {
      if (scrollEnabled) {
        setScrollEnabled(false);
      }
    } else {
      setScrollEnabled(true);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        nestedScrollEnabled={true}
        scrollEnabled={scrollEnabled}
        onScroll={event => {
          const offsetY = event.nativeEvent.contentOffset.y;
          onScroll(offsetY);
        }}>
        {/* ILUSTRATION HEADER*/}
        <ImageHeader uri={'https://i.picsum.photos/id/152/500/200.jpg'} />

        {/* FAQ LIST */}
        <View style={styles.faqList}>
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={!scrollEnabled}
            data={faqs}
            ListHeaderComponent={
              <View style={styles.sectionTitle}>
                <Text style={styles.sectionTitleText}>{'FAQ'}</Text>
              </View>
            }
            renderItem={({item}) => (
              <PurchaseDetail
                icon={'ak_question'}
                title={item.question}
                background={'white'}
                fullWidth
                VisibleComponent={
                  <View style={styles.answer}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                  </View>
                }
              />
            )}
            ListFooterComponent={
              <View style={styles.contact}>
                <Text style={[styles.sectionTitleText, styles.contactUs]}>
                  {'Contactanos'}
                </Text>
                <Icon
                  name="my_link"
                  size={50}
                  factor={0.8}
                  onPress={() => console.log('Contact My-Link')}
                />
              </View>
            }
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
            stickyHeaderIndices={[0]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Help;

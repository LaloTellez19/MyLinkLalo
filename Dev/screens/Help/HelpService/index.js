import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/Text';
import Icon from '../../../components/Icon';

const width = Layout.window.width;
const height = Layout.window.height - 63 - 85;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: height,
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
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listHeaderText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  faqContainer: {
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    paddingBottom: 10,
  },
  faqItem: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  faqItemText: {
    width: width / 1.5,
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginRight: 15,
  },
  answer: {
    width: width / 1.2,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  answerText: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'justify',
  },
});

function HelpService(props) {
  const {allFAQ} = props;

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={allFAQ}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>{'Servicio de Ayuda'}</Text>
          </View>
        }
        renderItem={({item, index}) => <FAQItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
}

const FAQItem = ({item}) => {
  const [showAnswer, setShowAnswer] = React.useState(false);

  return (
    <TouchableOpacity
      style={styles.faqContainer}
      onPress={() => setShowAnswer(!showAnswer)}>
      <View style={styles.faqItem}>
        <Icon name="help" size={50} factor={1} Borderless />
        <Text style={styles.faqItemText}>{item.question}</Text>
      </View>

      {/* ANSWER */}
      {showAnswer && (
        <View style={styles.answer}>
          <Text style={styles.answerText}>{item.answer}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default HelpService;

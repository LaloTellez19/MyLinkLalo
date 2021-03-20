import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SectionList,
  Animated,
} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';
import Icon from '../../Icon';
import {EdOrWorkItem} from '../../../screens/AdmonPersonal/Profesional';

import {userHelper} from '../../../helpers/API';

const width = Layout.window.width;
const itemHeight = 50;

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  /* BLOCK NAME STYLES */
  documentsViews: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
    paddingTop: 10,
    borderTopWidth: 4,
    borderColor: Colors.platinum,
  },
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
  /* SEE MORE BUTTON STYLES */
  opinionButton: {
    width: width / 3,
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
  },
  opinionButtonText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
});

class ProfessionalBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      educationInfo: [],
      workInfo: [],
      loading: true,
      show: false,
      error: null,
      totalItems: 0,
    };

    this.professionalView = new Animated.Value(itemHeight + 35);
  }

  /* FETCH DATA */
  fetchData = uid => {
    userHelper
      .getProfessionalData({uid: uid})
      .then(response => {
        this.setState({
          educationInfo: response.data.educationInfo,
          workInfo: response.data.workInfo,
          totalItems:
            response.data.educationInfo.length + response.data.workInfo.length,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({
          educationInfo: null,
          workInfo: null,
          error: err,
          loading: false,
        });
      });
  };

  componentDidMount() {
    this.fetchData(this.props.data.uid);
  }

  seeMore = show => {
    this.setState({show: show});
    const sectionHeight = (this.state.totalItems + 1) * (itemHeight + 35);
    console.log('sectionHeight: ', sectionHeight, this.state.totalItems);
    Animated.timing(this.professionalView, {
      toValue: show ? sectionHeight : itemHeight + 35,
      isInteraction: false,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const {workInfo, educationInfo, show, loading} = this.state;
    const {data} = this.props;
    const type = data.tipo;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

    const backgroundColor = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    const buttonBackground = vipDark
      ? {borderColor: Colors.grayLight, backgroundColor: Colors.eerieBlack}
      : {borderColor: Colors.gray, backgroundColor: 'transparent'};

    const buttonText = vipDark
      ? {color: Colors.grayLight}
      : {color: Colors.defaultTextColor};

    const darkDocumentsViews = vipDark
      ? {borderColor: 'black'}
      : {borderColor: Colors.platinum};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* BLOCK NAME */}
        <View style={styles.blockName}>
          <Text style={[styles.blockNameText, textColor]}>
            {'Link Profesional'}
          </Text>
        </View>

        {/* {!loading && (
          <View>
            <EdOrWorkItem item={workInfo[0]} work noMenu />
          </View>
        )} */}
        <Animated.View style={{height: this.professionalView}}>
          <SectionList
            sections={[
              {
                title: '',
                data: workInfo,
              },
              {
                title: 'Educación',
                data: educationInfo,
              },
            ]}
            renderItem={({item, index}) => (
              <EdOrWorkItem item={item} work noMenu vipDark={vipDark} />
            )}
            renderSectionHeader={({section}) => (
              <View>
                {section.title !== '' && (
                  <View style={[styles.documentsViews, darkDocumentsViews]}>
                    <Text style={[styles.blockNameText, textColor]}>
                      {section.title}
                    </Text>
                  </View>
                )}
              </View>
            )}
            keyExtractor={(item, index) => index}
          />
        </Animated.View>

        {/* SEE MORE */}
        <TouchableOpacity
          style={[styles.opinionButton, buttonBackground]}
          onPress={() => this.seeMore(!show)}>
          <Text style={[styles.opinionButtonText, buttonText]}>
            {show ? 'Ver menos' : 'Ver más'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ProfessionalBlock;

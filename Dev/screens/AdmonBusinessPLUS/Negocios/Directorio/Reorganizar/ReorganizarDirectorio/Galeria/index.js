import React from 'react';
import {View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native';

import Colors from '../../../../../../../constants/Colors';
import Layout from '../../../../../../../constants/Layout';
import Text from '../../../../../../../components/Text';

import ErrorOrNoData from '../../../../../../../components/ErrorOrNoData';
import Icon from '../../../../../../../components/Icon';

/* DATA */
import {estadosResponse} from '../../../../../../../testData/dataAdmon';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
    mainContainer:{
        width: '100%',
        height:35,
    },
  containerTitle: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
  },
  containerImage: {
      width: '100%',
      height: '90%',

  },
  galeriaImgContainer: {
    margin: 2.5,
    marginTop: 2,
    marginBottom: 2,
  },
  galeriaImg: {
    width: 85,
    height: 85,
    resizeMode: 'cover',
  },
});


class Galeria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      galeria: [],
      seleccionMenuTabs: 0,
      itemSelected: {},
      saveInCloud: false,
      loading: true,
      error: null,
      
    };
    this.setSeleccionMenuTabs = this.setSeleccionMenuTabs.bind(this);
    this.handleItemSelection = this.handleItemSelection.bind(this);
    this.setSaveInCloud = this.setSaveInCloud.bind(this);

  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    //DATOS 
    const response = estadosResponse.data.estados;

    if (response) {
      this.setState({
        galeria: response,
        loading: false,
      });
      this.getFeaturedPosts(response);
    } else {
      this.setState({
        error: errorGettingData,
        loading: false,

      });
    }
  };

  getFeaturedPosts = data => {
    const errorFeaturedPosts = {
      title: 'Data not found',
      message: 'Try another search',
    };

    try {
      const response = data.filter(item => item.featured);
      this.setState({destacados: response});
    } catch (error) {
      this.setState({error: errorFeaturedPosts});
    }
  };

  componentDidMount() {
    this.getData();
  }

  /* HANDLE ITEM SELECTION */
  handleItemSelection = item => {
    this.setState({itemSelected: item});
  };

  setSeleccionMenuTabs = page => {
    this.setState({seleccionMenuTabs: page});
  };

  setSaveInCloud = saveIn => {
    this.setState({saveInCloud: saveIn});
  };

  
  render() {
    const {
      seleccionMenuTabs,
      loading,
      error,
      galeria,
      videos,
      saveInCloud,
    } = this.state;
    const {user, updateListInViewOffset} = this.props;


    return (
      <View style={styles.mainContainer}>
          <View style={styles.containerTitle}>
            <View style={{width: '20%', backgroundColor: 'white', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                    name='squares'
                    size={40}
                    factor={1}
                    forceColor
                    Borderless
                    color= {Colors.defaultTextColor}
                />
            </View>
            <View style={{width: '80%', backgroundColor: 'white', alignContent: 'center', justifyContent: 'center'}}>
                <Text style={{color: Colors.defaultTextColor, fontSize:23}}>
                    Galería
                </Text>
            </View>
          </View>
          <View style={styles.containerImage}>
          <FlatList
                  nestedScrollEnabled={true}
                  numColumns={4}
                  showsVerticalScrollIndicator={false}
                  data={galeria}
                  renderItem={({item, index}) => (
                    <TouchableOpacity style={styles.galeriaImgContainer}>
                      <Image style={styles.galeriaImg} source={{uri: item.uri}} />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(_, index) => index.toString()}
                  onMomentumScrollEnd={event => {
                    const offsetY = event.nativeEvent.contentOffset.y;
                    updateListInViewOffset(offsetY);
                  }}
                />
              
          </View>
      </View>
      
    );
  }
}

export default Galeria;

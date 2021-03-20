import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import ViewPager from '@react-native-community/viewpager';

import Layout from '../../../../constants/Layout';
import Text from '../../../../components/Text';
import MenuTabs from '../../../../components/MenuTabs';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

/* DATA */
import {estadosResponse} from '../../../../testData/dataAdmon';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  viewPager: {
    width: width,
    height: height - 63 - 73 - 63,
  },
  topContainer: {
    backgroundColor: 'white',
    height: 63,
  },
  mainContainer: {
    width: '100%',
    overflow: 'hidden',
    flex: 1,
    backgroundColor: 'white',
  },
  /* ESTILOS BOTTOM SHADOW */
  bottomShadow: {
    height: 15,
    marginBottom: 5,
    elevation: 5,
    backgroundColor: 'white',
  },
  /* ESTILOS GALERIA */
  galleryContainer: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
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

class Galeria1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      galeria: [],
      videos: [],
      seleccionMenuTabs: 0,
      itemSelected: {},
      saveInCloud: false,
      loading: true,
      error: null,
    };

    this.viewPager = React.createRef(null);
    this.menu = ['Fotos', 'Videos'];

    this.setSeleccionMenuTabs = this.setSeleccionMenuTabs.bind(this);
    this.handleItemSelection = this.handleItemSelection.bind(this);
    this.setSaveInCloud = this.setSaveInCloud.bind(this);
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

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
    const {personal, updateListInViewOffset} = this.props;

    return (
      <View style={{flex: 1}}>
        {/* MenuTabs */}
        <View style={styles.topContainer}>
          <MenuTabs
            opciones={this.menu}
            seleccion={seleccionMenuTabs}
            seleccionar={page => {
              this.setSeleccionMenuTabs(page);
              this.viewPager.current.setPage(page);
            }}
            personal={personal}
          />
          <View style={styles.bottomShadow} />
        </View>

        {loading && seleccionMenuTabs !== 2 && (
          <View>
            <Text style={{textAlign: 'center'}}>{'Loading...'}</Text>
          </View>
        )}

        {error && seleccionMenuTabs !== 2 && (
          <ErrorOrNoData title={error.title} message={error.message} />
        )}

        {/* ESTADOS */}
        {!loading && (
          <ViewPager
            ref={this.viewPager}
            style={styles.viewPager}
            initialPage={0}
            onPageSelected={PageSelectedEvent => {
              console.log('viewPager', Object.keys(this.viewPager.current));
              this.setSeleccionMenuTabs(PageSelectedEvent.nativeEvent.position);
            }}>
            <View style={styles.mainContainer} key="1">
              {/* GALERIA */}
              <View style={styles.galleryContainer}>
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
            <View style={styles.mainContainer} key="2">
              {/* GALERIA */}
              <View style={styles.galleryContainer}>
                <FlatList
                  nestedScrollEnabled={true}
                  numColumns={4}
                  showsVerticalScrollIndicator={false}
                  data={videos}
                  renderItem={({item, index}) => (
                    <ItemEstado
                      item={{...item, index}}
                      handleItemSelection={this.handleItemSelection}
                    />
                  )}
                  keyExtractor={(_, index) => index.toString()}
                  onMomentumScrollEnd={event => {
                    const offsetY = event.nativeEvent.contentOffset.y;
                    updateListInViewOffset(offsetY);
                  }}
                />
              </View>
            </View>
          </ViewPager>
        )}
      </View>
    );
  }
}

const ItemEstado = ({item, handleItemSelection}) => {
  return (
    <TouchableOpacity
      style={styles.galeriaImgContainer}
      onPress={() => {
        handleItemSelection(item);
      }}
      activeOpacity={0.5}>
      <Image style={styles.galeriaImg} source={{uri: item.media_source}} />
    </TouchableOpacity>
  );
};

export default Galeria1;

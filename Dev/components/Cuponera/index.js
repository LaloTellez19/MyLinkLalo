import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

import ViewPager from '@react-native-community/viewpager';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

import Text from '../Text';
import ErrorOrNoData from '../ErrorOrNoData';
import Icon from '../Icon';

import Subir from './SubirArchivo';
import AddInfo from './AddInfo';

/* DATA */
import {estadosResponse} from '../../testData/dataAdmon';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  viewPager: {
    width: width,
    flex:1,
    height:850,
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

  /**TITLE STYLES */
  cointainerCuponera:{
    width: width,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'white',
  },
  subContainerCuponera:{
    width:'100%',
    height:125,
    alignItems:'center',
    justifyContent:'center',
  },
  imageCuponera:{
    width:120,
    height:120,
    borderRadius:100,
    backgroundColor:Colors.grayLight,
  },

  /**BUTTON STYLES */
  buttonContainer:{
    width:'100%',
    height:100,
    backgroundColor:'white',
    flexDirection:'row',
    marginTop:10,
  },
  buttonSubcontainer:{
    width:'50%',
    height:100,
    alignItems:'center',
    justifyContent:'center',
  },
  button:{
    width:'80%',
    height:'40%',
    borderWidth:0.5,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
  },
  titleText: {
    fontSize: 25,
    color: Colors.defaultTextColor,
  },
  buttonsContainer:{
    width:width/3.5,
    alignItems:'center',
    justifyContent:'center'
  },
  /* ESTILOS BOTTOM SHADOW */
  bottomShadow: {
    height: 15,
    marginBottom: 5,
    elevation: 5,
    backgroundColor: 'white',
  },
});

class Cuponera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seleccionMenuTabs: 0,
      itemSelected: {},
      saveInCloud: false,
      loading: true,
      error: null,
      seleccion: 1,
    };

    this.viewPager = React.createRef(null);
    this.menu = ['Agregar Informacion', 'Subir Archivos'];

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
  onPress= (selection) =>{
    this.setState({
        activeButton:selection,
    }, ()=>{
        console.log('Button: '+selection);
    });
}
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
    this.setState({seleccion: item});
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
      activeButton,
      seleccion,
    } = this.state;
    const {user,updateListInViewOffset,uid,componentId} = this.props;

    return (
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.cointainerCuponera}>
            <View style={styles.subContainerCuponera}>
              <Text style={styles.titleText}>
                {'Cuponera'}
              </Text>
            </View>
            
            <View style={styles.subContainerCuponera}>
              <Image style={styles.imageCuponera}/>
            </View> 
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.buttonSubcontainer}>
              <TouchableOpacity 
                style={[styles.button,
                {backgroundColor: seleccion === 1
                  ? Colors.business
                  : 'white'
                }]}
                onPress={this.handleItemSelection.bind(this,1)}>
                <Text 
                  style={{color: seleccion ===1 
                    ? 'white'
                    : Colors.defaultTextColor
                  }}>
                  {'Agregar Información'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonSubcontainer}>
              <TouchableOpacity 
                style={[styles.button,
                  {backgroundColor: seleccion === 2
                    ? Colors.business
                    : 'white'
                  }]}
                onPress={this.handleItemSelection.bind(this,2)}>
                  <Text
                    style={{color: seleccion === 2 
                      ? 'white'
                      : Colors.defaultTextColor
                    }}>
                    {'Subir archivo'}
                  </Text>
              </TouchableOpacity>
            </View>
          </View>

          {seleccion === 1 &&(
            <View>
              <AddInfo/>
            </View>
          )}

          {seleccion === 2 &&(
            <View>
              <Subir/>
            </View>
          )}
        </ScrollView>
        
      </View>
    );
  }
}



export default Cuponera;

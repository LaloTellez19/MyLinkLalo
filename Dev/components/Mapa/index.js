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
import Text from '../Text';
import MenuTabs from '../MenuTabs';
import ErrorOrNoData from '../ErrorOrNoData';
import Colors from '../../constants/Colors';
import Icon from '../Icon';
import Files from './AddNewFile';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({

  mainContainer: {
    width: '100%',
    overflow: 'hidden',
    flex: 1,
    backgroundColor: 'white',
  },
  cointainerMap:{
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
},
containerText: {
    fontSize: 25,
    color: Colors.defaultTextColor,
    height: '20%',
},
buttonContainer: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent:'center',
  },
buttonAddFile: {
    width: '55%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.business,

},
buttonText: {
    color: 'white',
    fontSize: 14,
},
});

class Mapa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
    };

  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };
  };

  render() {
    const {
      loading,
      error,
    } = this.state;
    const {user,updateListInViewOffset,uid,componentId} = this.props;

    return (
      <View style={{flex: 1}}>
        <View style={styles.cointainerMap}>
            <Text style={styles.containerText}>
                 {'Mapa de Business Plus'}
            </Text>
            <Icon
                name={'plaza'}
                size={150}
                forceColor
                color={Colors.business}
                backgroundColor={Colors.business}
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.buttonAddFile]}>
                <Text style={styles.buttonText}>
                    {'Subir Archivo'}
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}



export default Mapa;

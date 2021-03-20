import React from 'react';
import {View} from 'react-native';

import Text from '../../../components/Text';

import Perfiles from './Perfiles';
import Seguidores from './Seguidores';
import Ajustes from './Ajustes';
import Visibilidad from './Visibilidad';

/* DATA */
import {
  perfilesResponse,
  infoSeguidoresResponse,
  datosAjustesResponse,
} from '../../../testData/dataAdmon';

class Privacidad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilesInfo: [],
      allMyFollowingInfo: [],
      myFollowingInfo: [],
      myData: [],
      publicAccount: false,
      loading: true,
      error: null,
    };

    this.setError = this.setError.bind(this);
    this.setData = this.setData.bind(this);
  }

  getData = () => {
    this.setState({
      profilesInfo: perfilesResponse.data.perfiles,
      allMyFollowingInfo: infoSeguidoresResponse.data.usuarios,
      myFollowingInfo: infoSeguidoresResponse.data.usuarios,
      myData: datosAjustesResponse.data.datos,
      publicAccount: true,
      loading: false,
    });
  };

  componentDidMount() {
    this.getData();
  }

  setError = (field, error) => {
    // console.log('setError:', field);
    this.setState({
      [this.state[field]]: error,
    });
  };

  setData = (field, data) => {
    // console.log('setData:', this.state[field], data);
    this.setState({
      [this.state[field]]: data,
    });
  };

  render() {
    const {
      loading,
      profilesInfo,
      allMyFollowingInfo,
      myFollowingInfo,
      myData,
      publicAccount,
    } = this.state;
    const {user, seleccion, updateListInViewOffset, componentId} = this.props;

    return (
      <View style={{flex: 1}}>
        {loading && (
          <View>
            <Text style={{textAlign: 'center'}}>{'Loading...'}</Text>
          </View>
        )}

        {/* PERFILES */}
        {seleccion === 0 && !loading && (
          <Perfiles
            user={user}
            profilesInfo={profilesInfo}
            setProfilesInfo={this.setData}
            updateListInViewOffset={updateListInViewOffset}
            componentId={componentId}
          />
        )}

        {/* SEGUIDORES */}
        {seleccion === 1 && !loading && (
          <Seguidores updateListInViewOffset={updateListInViewOffset} />
        )}

        {/* AJUSTES */}
        {/* {seleccion === 2 && !loading && (
          <Ajustes
            user={user}
            myData={myData}
            setMyData={this.setData}
            updateListInViewOffset={updateListInViewOffset}
          />
        )} */}

        {/* VISIBILIDAD */}
        {seleccion === 2 && (
          <Visibilidad
            publicAccount={publicAccount}
            setPublicAccount={this.setData}
            updateListInViewOffset={updateListInViewOffset}
          />
        )}
      </View>
    );
  }
}

export default Privacidad;

import React from 'react';
import {View} from 'react-native';

import PersonalData from './PersonalData';
import Documents from './Documents';
import AwardsAdmin from '../../../components/AwardsAdmin';

/* DATA */
import {personalInformationResponse} from '../../../testData/dataAdmon';

class Information extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myData: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.getData()
      .then(response => {
        this.setState({
          myData: response.myData,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false,
        });
      });
  }

  getData = () => {
    const dataPromise = new Promise((resolve, reject) => {
      let response = [];

      try {
        response = personalInformationResponse.data;
      } catch (error) {
        response = null;
      }

      if (response) {
        resolve(response);
      } else {
        const error = {
          title: 'Data not found',
          message: 'Try to reload',
        };
        reject(error);
      }
    });

    return dataPromise;
  };

  render() {
    const {
      seleccion: selection,
      user,
      uid,
      updateListInViewOffset,
      componentId,
    } = this.props;

    return (
      <View style={{flex: 1}}>
        {selection === 0 && (
          <PersonalData
            user={user}
            uid={uid}
            updateListInViewOffset={updateListInViewOffset}
          />
        )}

        {selection === 1 && (
          <AwardsAdmin
            linkname={''}
            updateListInViewOffset={updateListInViewOffset}
            componentId={componentId}
            personal
          />
        )}

        {selection === 2 && <Documents />}
      </View>
    );
  }
}

export default Information;

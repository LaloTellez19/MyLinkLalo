import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import firebase from '../../../../../components/firebase';
import Icon from '../../../../../components/Icon';
import Text from '../../../../../components/Text';
import ErrorOrNoData from '../../../../../components/ErrorOrNoData';

import Loading from '../../../../../components/Loading';

import Phones from '../../../../AdmonPersonal/Informacion/PersonalData/Phones';
import Emails from '../../../../AdmonPersonal/Informacion/PersonalData/Emails';
import Location from '../../../../AdmonPersonal/Informacion/PersonalData/Location';
import CountryAndDate from '../../../../AdmonPersonal/Informacion/PersonalData/CountryAndDate';
import Social from '../../../../AdmonPersonal/Informacion/PersonalData/Social';
import {userHelper} from '../../../../../helpers/API';

/* DATA */
import {personalDataResponse} from '../../../../../testData/dataAdmon';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1,
  },
  /* DATA LIST STYLES */
  dataList: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 5,
  },
  /* DATA ELEMENT STYLES */
  dataElement: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.grayLight,
    marginTop: 7,
    marginBottom: 7,
    paddingTop: 5,
    paddingBottom: 5,
    elevation: 5,
  },
  dataElementText: {
    width: 200,
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
});

class BusinessData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      phoneData: [],
      dataElements: [],
      loading: false,
      error: null,
    };

    this.setDataElements = this.setDataElements.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
  }

  componentDidMount() {
    this.getUserDataSubCollection(this.props.uid);
    this.getData()
      .then(response => {
        this.setState({
          data: response,
          loading: false,
        });
        this.setDataElements();
      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false,
        });
      });
  }

  /* GET DATA */
  getData = () => {
    const dataPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        let response = [];

        try {
          response = personalDataResponse.data;
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
      }, 30);
    });

    return dataPromise;
  };

  /* GET PHONE DATA */
  getUserDataSubCollection = uid => {
    firebase
      .firestore()
      .collection('usuarios')
      .doc(uid)
      .collection('data')
      .get()
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  /* SET DATAELEMENTS */
  setDataElements = (user = this.props.user) => {
    const dateArray = user.fecha_nacimiento.split('-');
    const dataElements = [
      {
        icon: 'phone',
        field: 'Teléfono',
        children: Phones,
        data: 'phoneData',
      },
      {
        icon: 'at',
        field: 'Correo',
        children: Emails,
        data: 'emailData',
      },
      {
        icon: 'location',
        field: 'Dirección y País',
        children: Location,
        data: 'locationData',
        source: {
          pais: user.pais,
          domicilio: {...user.domicilio},
        },
      },
      {
        icon: 'cake',
        field: 'Cumpleaños',
        children: CountryAndDate,
        data: 'countryDateData',
        source: {
          country: user.pais,
          date: {
            day: dateArray[2],
            month: dateArray[1],
            year: dateArray[0],
          },
        },
      },
      {
        icon: 'personal',
        field: 'Perfil Social',
        children: Social,
        data: 'socialData',
        prevDisplay: true,
      },
    ];
    this.setState({
      dataElements: dataElements,
    });
  };

  /* HANDLE SAVE CHANGES */
  handleSaveChanges = (index, updatedData, indexOrProp, dataToServer) => {
    if (dataToServer) {
      userHelper
        .updateUserInfo({ref: this.props.uid, updatedData: dataToServer})
        .then(() => {
          /* UPDATE LOCAL DATA */
          const newData = this.state.data;
          const field = this.state.dataElements[index].data;
          const dataField = newData[field];
          dataField[indexOrProp] = updatedData;

          /* UPDATE ELEMENTS TO RENDER WHEN SOURCE KEY IS IN OBJECT*/
          const newDataElments = this.state.dataElements;
          if (newDataElments[index].source) {
            newDataElments[index].source[indexOrProp] = updatedData;
          }
          this.setState({
            data: newData,
            dataElements: newDataElments,
          });
          console.log('Success, data updated!!');
        })
        .catch(error => this.setState({error: error}));
    } else {
      /* JUST LOCAL EDITION / TEMP, NO SERVER DATA */
      /* UPDATE LOCAL DATA */
      const newData = this.state.data;
      const field = this.state.dataElements[index].data;
      const dataField = newData[field];
      dataField[indexOrProp] = updatedData;

      /* UPDATE ELEMENTS TO RENDER */
      const newDataElments = this.state.dataElements;
      if (newDataElments[index].source) {
        newDataElments[index].source[indexOrProp] = updatedData;
      }
      this.setState({
        data: newData,
        dataElements: newDataElments,
      });
      console.log('Success, data updated!!, JUST LOCAL DATA');
    }
  };

  render() {
    const {data, dataElements, loading, error} = this.state;
    const {updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        {loading && <Loading />}

        {error && <ErrorOrNoData title={error.title} message={error.message} />}

        {!loading && !error && (
          <FlatList
            style={styles.dataList}
            nestedScrollEnabled={true}
            data={dataElements}
            renderItem={({item, index}) => (
              <DataElement
                icon={item.icon}
                field={item.field}
                prevDisplay={item.prevDisplay}>
                <item.children
                  data={item.source ? item.source : data[item.data]}
                  index={index}
                  handleSaveChanges={this.handleSaveChanges}
                />
              </DataElement>
            )}
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={event => {
              const offsetY = event.nativeEvent.contentOffset.y;
              updateListInViewOffset(offsetY);
            }}
          />
        )}
      </View>
    );
  }
}

const DataElement = ({icon, field, children, prevDisplay}) => {
  const [showContent, setShowContent] = React.useState(prevDisplay);

  return (
    <View>
      <View style={styles.dataElement}>
        <Icon
          name={icon}
          factor={0.8}
          Borderless
          forceColor
          color={Colors.gray}
        />
        <Text style={styles.dataElementText}>{field}</Text>
        <Icon
          name={showContent ? 'arrow_up' : 'arrow_down'}
          factor={0.8}
          Borderless
          forceColor
          color={Colors.gray}
          onPress={() => setShowContent(!showContent)}
        />
      </View>

      {/* CONTENT */}
      {showContent && <View>{children}</View>}
    </View>
  );
};

export default BusinessData;

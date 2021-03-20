import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';

const width = Layout.window.width;
const height = Layout.window.height;
const itemHeight = 65;

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    marginTop: 20,
  },
  /* DATA CONTAINER STYLES */
  dataContainer: {
    width: width,
    height: itemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataFieldIcon: {
    width: '15%',
    alignItems: 'center',
    marginTop: -20,
  },
  dataFieldContainer: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  dataElementTextContainer: {
    width: '70%',
    marginRight: 20,
    marginLeft: 25,
    alignItems: 'flex-start',
  },
  dataField: {
    width: 230,
    marginLeft: 25,
    marginRight: 20,
  },
  data: {
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    fontSize: 16,
    color: Colors.grayBold,
    paddingBottom: 2,
    paddingLeft: 7,
  },
  label: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    paddingTop: 2,
    paddingLeft: 2,
  },
  editDataField: {
    width: '100%',
    fontSize: 16,
    fontFamily: 'HelveticaNeueLt',
    color: Colors.defaultTextColor,
    padding: 0,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  editIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  /* MAP CONTAINER STYLES */
  mapContainer: {
    width: 270,
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  map: {
    width: 150,
    height: 150,
    borderRadius: 150,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  addIcon: {
    position: 'absolute',
    top: 10,
    right: 45,
  },
  mapText: {
    position: 'absolute',
    bottom: 2,
    right: 25,
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  /* CONTRY SECTION STYLES */
  countryImageContainer: {
    width: 35,
    height: 35,
    borderRadius: 360,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  countryImage: {
    width: 55,
    height: 55,
    borderRadius: 40,
    alignSelf: 'center',
  },
  countriesList: {
    width: 280,
    height: height / 3,
    alignSelf: 'center',
    position: 'absolute',
    top: 55,
    elevation: 3,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 5,
  },
  countriesItem: {
    width: width / 2,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    marginTop: 5,
  },
  countryName: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 10,
  },
  countryIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
});

const countriesOptions = {
  MX: {
    id: 'MX',
    name: 'México',
  },
  AR: {
    id: 'AR',
    name: 'Argentina',
  },
  CR: {
    id: 'CR',
    name: 'Costa Rica',
  },
  PE: {
    id: 'PE',
    name: 'Perú',
  },
  FR: {
    id: 'FR',
    name: 'Francia',
  },
  IT: {
    id: 'IT',
    name: 'Italia',
  },
  BR: {
    id: 'BR',
    name: 'Brasil',
  },
  BE: {
    id: 'BE',
    name: 'Belgica',
  },
};

function Location(props) {
  const {index: mainIndex, data, handleSaveChanges} = props;
  const labels = [
    'calle y número',
    'colonia',
    'estado',
    'ciudad',
    'código postal',
  ];
  const fieldsKeys = ['calle', 'colonia', 'estado', 'ciudad', 'codigo_postal'];

  const [location, setLocation] = React.useState([]);
  const [fieldSelected, setFieldSelected] = React.useState(null);
  const [selectedCountry, setSelectedCountry] = React.useState(data.pais);
  const [countryPicker, setCountryPicker] = React.useState(false);

  React.useEffect(() => {
    const orderedData = fieldsKeys.map((item, index) => {
      console.log('incoming data: ', item, index);
      return {
        data: data.domicilio[item],
        label: labels[index],
        key: item,
        index: index,
      };
    });
    setLocation(orderedData);
  }, []);

  /* HANDLE FIELD SELECTION */
  const handleFieldSelection = (save = false, item) => {
    if (save) {
      console.log('SAVE ITEM: ', item);
      handleSaveChanges(mainIndex, item.data, item.key, {
        [`domicilio.${fieldsKeys[item.index]}`]: item.data,
      });
      setFieldSelected(null);
    } else {
      setFieldSelected(item.index);
    }
  };

  /* HANLDE DATA CHANGES */
  const handleDataChanges = value => {
    location[fieldSelected].data = value;
    setLocation([...location]);
  };

  /* HANDLE EDIT MAP */
  const handleEditMap = () => {
    console.log('EDIT MAP');
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setFieldSelected(null);
        setCountryPicker(false);
      }}>
      <View style={styles.mainContainer}>
        <CountryContainer
          country={selectedCountry}
          countries={countriesOptions}
          setCountryPicker={() => setCountryPicker(!countryPicker)}
        />

        {/* FIELDS */}
        <View>
          {location.map((item, index) => (
            <DataContainer
              key={index}
              item={item}
              fieldSelected={fieldSelected}
              handleFieldSelection={handleFieldSelection}
              handleDataChanges={handleDataChanges}
            />
          ))}
        </View>

        {/* MAP CONTAINER */}
        <View style={styles.mapContainer}>
          <View style={styles.map} />
          <View style={styles.addIcon}>
            <Icon
              name="plus"
              forceColor
              color={'white'}
              background={Colors.gray}
              onPress={() => handleEditMap()}
            />
          </View>
          <Text style={[styles.mapText, styles.label]}>{'Mapa'}</Text>
        </View>

        {countryPicker && (
          <CountriesList
            keys={Object.keys(countriesOptions)}
            countries={countriesOptions}
            selectedCountry={selectedCountry}
            setSelectedCountry={item => {
              setSelectedCountry(item);
              setCountryPicker(false);
              handleSaveChanges(mainIndex, item, 'country', {
                pais: item,
              });
            }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const DataContainer = ({
  item,
  fieldSelected,
  handleFieldSelection,
  handleDataChanges,
}) => {
  return (
    <View style={styles.dataContainer}>
      <View style={styles.dataFieldIcon}>
        {item.index === 0 && (
          <Icon name="location" Borderless forceColor color={Colors.gray} />
        )}
      </View>

      <View style={styles.dataFieldContainer}>
        <View style={styles.dataElementTextContainer}>
          <TextInput
            allowFontScaling={false}
            style={styles.editDataField}
            value={item.data}
            onChangeText={text => handleDataChanges(text)}
            onFocus={() =>
              handleFieldSelection(fieldSelected === item.index, item)
            }
          />
          <Text style={styles.label}>{item.label}</Text>
        </View>

        {/* EDIT ICON */}
        {fieldSelected === item.index && (
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => {
              handleFieldSelection(fieldSelected === item.index, item);
            }}>
            <Icon
              name={'check_mark'}
              size={25}
              factor={0.8}
              background={Colors.grayLight}
              forceColor
              color={Colors.grayBold}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const CountryContainer = ({country, countries, setCountryPicker}) => {
  return (
    <TouchableOpacity
      style={styles.dataContainer}
      onPress={() => setCountryPicker()}>
      <View style={styles.dataFieldIcon}>
        <Icon name="flag" Borderless forceColor color={Colors.gray} />
      </View>

      <View style={styles.dataFieldContainer}>
        <View style={styles.dataElementTextContainer}>
          <Text style={styles.editDataField}>{countries[country].name}</Text>
          <Text style={styles.label}>{'país'}</Text>
        </View>

        <View style={styles.countryIcon}>
          <View style={styles.countryImageContainer}>
            <Image
              style={styles.countryImage}
              source={{
                uri: `https://www.countryflags.io/${country.toLowerCase()}/flat/64.png`,
              }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CountriesList = ({
  keys,
  countries,
  selectedCountry,
  setSelectedCountry,
}) => {
  return (
    <ScrollView style={styles.countriesList} nestedScrollEnabled={true}>
      {keys.map((item, index) => (
        <View key={index}>
          {selectedCountry !== item && (
            <TouchableOpacity
              style={styles.countriesItem}
              onPress={() => {
                setSelectedCountry(item);
              }}>
              <View style={styles.countryImageContainer}>
                <Image
                  style={styles.countryImage}
                  source={{
                    uri: `https://www.countryflags.io/${item.toLowerCase()}/flat/64.png`,
                  }}
                />
              </View>
              <Text style={styles.countryName}>{countries[item].name}</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default Location;

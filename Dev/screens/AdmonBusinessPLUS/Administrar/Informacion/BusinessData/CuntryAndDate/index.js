import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Colors from '../../../../../../constants/Colors';
import Text from '../../../../../../components/Text';
import Icon from '../../../../../../components/Icon';

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  /* DATA FIELDS STYLES */
  dataContainer: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  data: {
    width: 280,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    paddingLeft: 5,
  },
  dataText: {
    width: 195,
    fontSize: 16,
    color: Colors.grayBold,
    marginLeft: 10,
  },
  dateText: {
    width: 230,
    fontSize: 16,
    color: Colors.grayBold,
    marginLeft: 5,
  },
  label: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    paddingLeft: 2,
  },
  /* COUNTRY IMAGE STYLES */
  countryImageContainer: {
    width: 30,
    height: 30,
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  countryImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
    alignSelf: 'center',
  },
  /* COUNTRIES LIST STYLES */
  countriesList: {
    width: 280,
    height: 105,
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
    width: 280,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
});

const countries = [
  {
    id: 'mx',
    name: 'México',
  },
  {
    id: 'ar',
    name: 'Argentina',
  },
  {
    id: 'cr',
    name: 'Costa Rica',
  },
  {
    id: 'pe',
    name: 'Perú',
  },
  {
    id: 'fr',
    name: 'Francia',
  },
  {
    id: 'it',
    name: 'Italia',
  },
  {
    id: 'br',
    name: 'Brasil',
  },
  {
    id: 'be',
    name: 'Belgica',
  },
];

function CountryAndDate(props) {
  const {index, data, handleSaveChanges} = props;
  const labels = ['país', 'fecha de fundación'];
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const initialCountry = countries.find(
    item => item.id === data.country.toLowerCase(),
  );

  const initialDate = {
    day: data.date.day,
    month: data.date.month,
    year: data.date.year,
  };

  const [selectedCountry, setSelectedCountry] = React.useState(initialCountry);
  const [selectedDate, setSelectedDate] = React.useState(initialDate);
  const [showCountriesList, setShowCountriesList] = React.useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  /* HANDLE SELECT DATE */
  const handleSelectDate = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setSelectedDate({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
    const formatedDate = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`;
    //1996-11-07
    handleSaveChanges(index, date, 'date', {
      fecha_nacimiento: formatedDate,
    });
    hideDatePicker();
  };

  return (
    <View style={styles.mainContainer}>
      {/* COUNTRY */}
      <View style={styles.dataContainer}>
        <TouchableOpacity
          style={styles.data}
          onPress={() => setShowCountriesList(!showCountriesList)}>
          <View style={styles.countryImageContainer}>
            <Image
              style={styles.countryImage}
              source={{
                uri: `https://www.countryflags.io/${
                  selectedCountry.id
                }/flat/64.png`,
              }}
            />
          </View>

          <Text style={styles.dataText}>{selectedCountry.name}</Text>

          <Icon
            name={showCountriesList ? 'arrow_up' : 'arrow_down'}
            factor={0.7}
            Borderless
            forceColor
            color={Colors.gray}
          />
        </TouchableOpacity>
        <Text style={styles.label}>{labels[0]}</Text>
      </View>

      {/* DATE */}
      <View style={styles.dataContainer}>
        <View style={styles.data}>
          <View style={styles.countryImageContainer}>
            <Icon
              name="cake"
              size={30}
              factor={0.9}
              Borderless
              forceColor
              color={Colors.gray}
            />
          </View>
          <Text style={styles.dataText}>{`${data.date.day} ${
            months[data.date.month - 1]
          } ${data.date.year}`}</Text>
          <Icon
            name="arrow_right"
            factor={0.7}
            Borderless
            forceColor
            color={Colors.gray}
            onPress={() => handleSelectDate()}
          />
        </View>
        <Text style={styles.label}>{labels[1]}</Text>
      </View>

      {/* COUNTRIES LIST */}
      {showCountriesList && (
        <CuntriesList
          selectedCountry={selectedCountry}
          setSelectedCountry={item => {
            setSelectedCountry(item);
            setShowCountriesList(false);
            handleSaveChanges(index, item.id, 'country');
          }}
        />
      )}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const CuntriesList = ({selectedCountry, setSelectedCountry}) => {
  return (
    <ScrollView style={styles.countriesList} nestedScrollEnabled={true}>
      {countries.map((item, index) => (
        <View key={index}>
          {selectedCountry.id !== item.id && (
            <TouchableOpacity
              style={styles.countriesItem}
              onPress={() => setSelectedCountry(item)}>
              <View style={styles.countryImageContainer}>
                <Image
                  style={styles.countryImage}
                  source={{
                    uri: `https://www.countryflags.io/${item.id}/flat/64.png`,
                  }}
                />
              </View>
              <Text style={styles.dataText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default CountryAndDate;

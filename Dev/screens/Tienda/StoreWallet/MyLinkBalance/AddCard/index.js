import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import Header from '../../../../../components/Header';
import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';

import {BalanceButton} from '../index';

const width = Layout.window.width;
const height = Layout.window.height - 240;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    elevation: 1,
    backgroundColor: 'white',
  },
  /* MAIN STYLES */
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    marginLeft: 15,
    marginRight: 15,
  },
  textInput: {
    width: 235,
    fontSize: 18,
    color: Colors.defaultTextColor,
  },
  label: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 5,
    paddingLeft: 25,
  },
  /* HEADER STYLES */
  header: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  /* ENTER CARD NUMBER STYLE */
  numberHash: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    marginRight: 20,
  },
  cardTypeIconContainer: {
    marginRight: 10,
  },
  cardTypesList: {
    position: 'absolute',
    top: 55,
    right: 29,
    borderColor: Colors.gray,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'white',
  },
  cardTypesItem: {
    paddingTop: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
  /* CARD EXPIRATION DATE / CVC STYLES */
  cardExpirationDateCVC: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 15,
    marginBottom: 10,
    paddingTop: 10,
  },
  smallInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallTextInput: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    paddingBottom: 2,
    paddingRight: 10,
    paddingLeft: 10,
  },
  smallLabel: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 5,
    textAlign: 'center',
  },
  cardInfoSeparator: {
    fontSize: 25,
    color: Colors.defaultTextColor,
    marginBottom: 15,
  },
  cardInfoIcon: {
    marginTop: 10,
  },
  /* COUNTRY STYLES */
  countrySelectorContainer: {
    marginTop: 15,
  },
  countryImageContainer: {
    height: 40,
    width: 40,
    borderRadius: 100,
    elevation: 5,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 15,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  countryImage: {
    height: 65,
    width: 40,
    resizeMode: 'cover',
  },
  countrySelectorTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countriesList: {
    height: 300,
    width: 340,
    position: 'absolute',
    top: 340,
    right: 10,
    elevation: 5,
    backgroundColor: 'white',
    padding: 5,
    borderColor: Colors.gray,
    borderRadius: 5,
  },
  countryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  countryName: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  /* NOTIFICATION STYLES */
  notification: {
    width: width,
    height: 75,
    backgroundColor: 'white',
    position: 'absolute',
    top: height + 310,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderRadius: 10,
    elevation: 5,
  },
  notificationText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
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

const cardTypes = [
  {
    type: 'VISA',
    icon: 'visa',
  },
  {
    type: 'MASC',
    icon: 'master_card',
  },
  {
    type: 'AEXP',
    icon: 'american_express',
  },
];

function AddCard(props) {
  const {handleNewCardAdded} = props;
  const inputFields = [
    {
      prop: 'month',
      placeholder: '00',
      label: 'MM',
      maxLength: 2,
    },
    {
      prop: 'year',
      placeholder: '00',
      label: 'AA',
      maxLength: 2,
    },
    {
      prop: 'cvc',
      placeholder: '000',
      label: 'CVC',
      maxLength: 3,
    },
    {
      prop: 'line1',
      placeholder: 'Linea 1',
      label: 'Linea 1 de la dirección',
    },
    {
      prop: 'line2',
      placeholder: 'Linea 2',
      label: 'Linea 2 de la dirección',
    },
    {
      prop: 'zip',
      placeholder: '58295',
      label: 'Código postal',
      maxLength: 5,
    },
    {
      prop: 'city',
      placeholder: 'Pachuca',
      label: 'Ciudad',
    },
    {
      prop: 'state',
      placeholder: 'Hidalgo',
      label: 'Estado / Provincia',
    },
  ];

  const [selectedCountry, setSelectedCountry] = React.useState(countries[0]);
  const [displayCountryPicker, setDisplayCountryPicker] = React.useState(false);
  const [cardInfo, setCardInfo] = React.useState({
    number: '',
    type: 'VISA',
    month: '',
    year: '',
    cvc: '',
    owner: '',
    country: selectedCountry.name,
    line1: '',
    line2: '',
    zip: '',
    city: '',
    state: '',
  });
  const [currentCardType, setCurrentCardType] = React.useState(cardTypes[0]);
  const [displayCardTypePicker, setDisplayCardTypePicker] = React.useState(
    false,
  );
  const [notification, setNotification] = React.useState(false);

  /* HANDLE CARD INFO CHANGE */
  const handleCardInfoChange = (prop, value) => {
    let checkedValue = value;
    const spaces = [4, 9, 14];
    const length = checkedValue.length;

    if (prop === 'number') {
      spaces.includes(length) ? (checkedValue += ' ') : null;
    }

    cardInfo[prop] = checkedValue;
    setCardInfo({...cardInfo});
  };

  /* HANDLE COUNTRY CHANGE */
  const handleCountryChange = item => {
    setSelectedCountry(item);
    handleCardInfoChange('country', item.name);
    setDisplayCountryPicker(false);
  };

  /* GO BACK */
  const goBack = () => {
    Navigation.pop(props.componentId, {
      component: {
        name: 'my-link.AddCard',
      },
    });
  };

  return (
    <View style={styles.mainContainer}>
      {/* HEADER */}
      <Header goBack={() => goBack()} />

      <View style={styles.header}>
        <Text style={styles.title}>
          {'Asociar tarjeta de crédito o débito'}
        </Text>
      </View>

      <ScrollView
        style={{flex: 1}}
        nestedScrollEnabled={true}
        scrollEnabled={!displayCountryPicker}
        onTouchStart={() => setNotification(false)}>
        {/* ENTER CARD NUMBER */}
        <InputField
          info={cardInfo}
          prop={'number'}
          placeholder={'Número de tarjeta'}
          label={'Número de tarjeta'}
          handleCardInfoChange={handleCardInfoChange}
          maxLength={19}
          LeftComponent={<Text style={styles.numberHash}>{'#'}</Text>}
          RightComponent={
            <View style={styles.cardTypeIconContainer}>
              <Icon
                name={currentCardType.icon}
                Borderless
                factor={1.3}
                forceColor
                color={Colors.gray}
                onPress={() => setDisplayCardTypePicker(!displayCardTypePicker)}
              />
            </View>
          }
          keyboardType={'numeric'}
        />

        {/* ENTER CARD EXPIRATION DATE / CVC */}
        <View style={styles.cardExpirationDateCVC}>
          {inputFields.slice(0, 3).map((item, index) => {
            return (
              <View key={index}>
                <InputField
                  info={cardInfo}
                  prop={item.prop}
                  placeholder={item.placeholder}
                  label={item.label}
                  handleCardInfoChange={handleCardInfoChange}
                  keyboardType={'numeric'}
                  small
                  maxLength={item.maxLength}
                />
              </View>
            );
          })}

          <View style={styles.cardInfoIcon}>
            {/* ICON */}
            <Icon
              name="payments"
              factor={1.3}
              Borderless
              forceColor
              color={Colors.gray}
            />
          </View>
        </View>

        {/* OWNER NAME */}
        <InputField
          info={cardInfo}
          prop={'owner'}
          placeholder={'Ricardo Varela'}
          label={'Nombre del titular'}
          handleCardInfoChange={handleCardInfoChange}
        />

        {/* COUNTRY */}
        <View style={styles.countrySelectorContainer}>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setDisplayCountryPicker(!displayCountryPicker)}
            activeOpacity={0.5}>
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

            <Text style={styles.textInput}>{cardInfo.country}</Text>
            <View style={{marginLeft: -32}}>
              <Icon
                name={displayCountryPicker ? 'arrow_up' : 'arrow_down'}
                factor={0.8}
                Borderless
                forceColor
                color={Colors.gray}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.label}>{'País'}</Text>
        </View>

        {/* OTHER FIELDS */}
        {inputFields.slice(3, 8).map((item, index) => {
          return (
            <View key={index}>
              <InputField
                info={cardInfo}
                prop={item.prop}
                placeholder={item.placeholder}
                label={item.label}
                handleCardInfoChange={handleCardInfoChange}
                editable={!displayCountryPicker}
                maxLength={item.maxLength}
              />
            </View>
          );
        })}

        {/* ADD CARD */}
        <BalanceButton
          text={'Asociar tarjeta'}
          onPress={() => {
            const infoEntered = cardInfo.number === '';
            if (!infoEntered) {
              handleNewCardAdded(cardInfo);
              goBack();
            } else {
              setNotification(true);
            }
          }}
        />

        {/* COUNTRY PICKER */}
        {displayCountryPicker && (
          <CountriesList
            data={countries}
            handleCountryChange={handleCountryChange}
            selectedCountry={selectedCountry}
          />
        )}

        {/* CARD TYPE PICKER */}
        {displayCardTypePicker && (
          <View style={styles.cardTypesList}>
            {cardTypes.map((item, index) => {
              if (item.type !== currentCardType.type) {
                return (
                  <TouchableOpacity
                    style={styles.cardTypesItem}
                    key={index}
                    onPress={() => {
                      setCurrentCardType(item);
                      handleCardInfoChange('type', item.type);
                      setDisplayCardTypePicker(false);
                    }}>
                    <Icon
                      name={item.icon}
                      Borderless
                      factor={1.3}
                      forceColor
                      color={Colors.gray}
                    />
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        )}

        {/* NOTIFICATION */}
        {notification && (
          <View style={styles.notification}>
            <Text style={styles.notificationText}>
              {'Por favor escribe el número de la tarjeta'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const InputField = ({
  info,
  prop,
  placeholder,
  label,
  handleCardInfoChange,
  LeftComponent,
  RightComponent,
  keyboardType,
  small,
  editable,
  maxLength,
}) => {
  return (
    <View>
      <View style={small ? styles.smallInputContainer : styles.inputContainer}>
        {LeftComponent && <View>{LeftComponent}</View>}
        <TextInput
          style={small ? styles.smallTextInput : styles.textInput}
          keyboardType={keyboardType ? keyboardType : 'default'}
          placeholder={placeholder ? placeholder : ''}
          value={info[prop]}
          onChangeText={text => handleCardInfoChange(prop, text)}
          editable={editable}
          maxLength={maxLength || 150}
        />
        {RightComponent && <View>{RightComponent}</View>}
      </View>
      <Text style={small ? styles.smallLabel : styles.label}>{label}</Text>
    </View>
  );
};

const CountriesList = ({data, handleCountryChange, selectedCountry}) => {
  return (
    <ScrollView style={styles.countriesList} nestedScrollEnabled={true}>
      {data.map((item, index) => {
        if (item.id !== selectedCountry.id) {
          return (
            <TouchableOpacity
              style={styles.countryOption}
              key={index}
              onPress={() => handleCountryChange(item)}>
              <View style={styles.countryImageContainer}>
                <Image
                  style={styles.countryImage}
                  source={{
                    uri: `https://www.countryflags.io/${item.id}/flat/64.png`,
                  }}
                />
              </View>
              <Text style={styles.countryName}>{item.name}</Text>
            </TouchableOpacity>
          );
        }
      })}
    </ScrollView>
  );
};

export {InputField};

export default AddCard;

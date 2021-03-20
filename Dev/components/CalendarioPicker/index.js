import React from 'react';
import {View, Picker, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Colors from '../../constants/Colors';
import Icon from '../../components/Icon';
import Text from '../../components/Text';

/* STYLES */
const styles = StyleSheet.create({
  /* ESTILOS CALENDARIO / PICKER */
  calendarioContainer: {
    height: 40,
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  picker: {
    color: Colors.defaultTextColor,
    marginTop: -7,
  },
  pickerArrow: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: -1,
    right: -10,
  },
  pickerValue: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
});

function CalendarioPicker(props) {
  const {vista, obtnerItemCalendario, rightArrow, newPicker} = props;
  const menu = ['Mes', 'Año'];
  const menuMonths = [
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
  const menuYears = ['2016', '2017', '2018', '2019', '2020'];

  const pickerItems = vista
    ? vista === menu[1]
      ? menuYears
      : menuMonths
    : menuMonths;

  const rightMargin = rightArrow ? {right: rightArrow} : {right: 5};
  const fecha = new Date();
  const mes = fecha.getMonth();
  const [pickerValue, setPickerValue] = React.useState(undefined);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  /* CAMBIO DE VISTA AÑO / MES */
  React.useEffect(() => {
    let itemActual = '';
    if (newPicker) {
      itemActual = new Date();
    } else {
      itemActual =
        vista === menu[1]
          ? pickerItems[pickerItems.length - 1]
          : pickerItems[mes];
    }
    seleccionarItem(itemActual);
  }, [vista]);

  const seleccionarItem = item => {
    setPickerValue(item);
    obtnerItemCalendario(item);
  };

  const showDatePicker = () => {
    if (isDatePickerVisible) {
      setDatePickerVisibility(false);
    } else {
      setDatePickerVisibility(true);
    }
  };

  const handleConfirm = date => {
    setPickerValue(date);
    obtnerItemCalendario(date);
    showDatePicker();
  };

  const getDateToDisplay = date => {
    let dateToDisplay = '';
    if (date.getDate() === undefined) {
      dateToDisplay = `${
        menuMonths[date.getMonth()]
      } del ${date.getFullYear()}`;
    } else {
      dateToDisplay = `${date.getDate()} de ${
        menuMonths[date.getMonth()]
      } del ${date.getFullYear()}`;
    }

    return dateToDisplay;
  };

  if (!newPicker) {
    return (
      <View style={styles.calendarioContainer}>
        <Picker
          selectedValue={pickerValue}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => seleccionarItem(itemValue)}>
          {pickerItems.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
        <View style={styles.pickerArrow}>
          <Icon
            name="arrow_down"
            factor={0.8}
            Borderless
            forceColor
            color={Colors.gray}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <TouchableOpacity
          style={styles.calendarioContainer}
          onPress={showDatePicker}>
          {pickerValue !== undefined && (
            <Text style={styles.pickerValue}>
              {getDateToDisplay(pickerValue)}
            </Text>
          )}
          <View
            style={[
              styles.pickerArrow,
              {right: rightArrow ? rightArrow : -10},
            ]}>
            <Icon
              name="arrow_down"
              factor={0.8}
              Borderless
              forceColor
              color={Colors.gray}
            />
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={showDatePicker}
        />
      </View>
    );
  }
}

export default CalendarioPicker;

import React from 'react';
import {View, StyleSheet} from 'react-native';

import Text from '../Text';
import Icon from '../Icon';
import Colors from '../../constants/Colors';

/* STYLES */
const styles = StyleSheet.create({
  mensajeDatos: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: -12,
  },
  mensajeDatosItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mensajeDatosItemText: {
    fontSize: 11,
    color: Colors.defaultTextColor,
    marginLeft: -7,
  },
  mensajeDatosDate: {
    marginLeft: 10,
  },
});

function LugarHoraFecha({item, location, date, locationString, timeStamp}) {
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

  const getLocation = () => {
    let locationDisplayed = '';

    if (item) {
      locationDisplayed = item.location;
    } else if (location) {
      locationDisplayed = location.city;
    } else if (locationString) {
      const arrLocation = locationString.split(',');
      locationDisplayed = arrLocation[1];
    } else {
      locationDisplayed = '';
    }

    return locationDisplayed;
  };

  const getTime = () => {
    let time = '';

    if (item) {
      time = item.time;
    } else if (date) {
      time = `${date.time} ${date.timePeriod}`;
    } else if (timeStamp) {
      const newDate = new Date(timeStamp);
      time = `${newDate.getHours()} : ${newDate.getMinutes()} ${
        newDate.getHours() < 12 ? 'am' : 'pm'
      }`;
    } else {
      time = 'Time';
    }

    return time;
  };

  const getDate = () => {
    let dateDisplayed = '';

    if (item) {
      dateDisplayed = item.location;
    } else if (date) {
      dateDisplayed = `${date.day} ${months[date.month - 1].slice(0, 3)} ${
        date.year
      }`;
    } else if (timeStamp) {
      const newDate = new Date(timeStamp);
      dateDisplayed = `${newDate.getDate()} ${months[newDate.getMonth()].slice(
        0,
        3,
      )} ${newDate.getFullYear()}`;
    } else {
      dateDisplayed = 'Date';
    }

    return dateDisplayed;
  };

  return (
    <View>
      {/* DATOS FECHA, HORA, LUGAR */}
      <View style={styles.mensajeDatos}>
        <View style={styles.mensajeDatosItem}>
          {getLocation() !== '' && (
            <Icon
              name="location"
              size={35}
              Borderless
              forceColor
              color={Colors.gray}
            />
          )}
          <Text style={[styles.mensajeDatosItemText, {maxWidth: 50}]}>
            {getLocation()}
          </Text>
        </View>

        <View style={styles.mensajeDatosItem}>
          <Icon
            name="clock_timer"
            size={35}
            Borderless
            forceColor
            color={Colors.gray}
          />
          <Text style={styles.mensajeDatosItemText}>{getTime()}</Text>
        </View>

        <View style={styles.mensajeDatosItem}>
          <Text style={[styles.mensajeDatosItemText, styles.mensajeDatosDate]}>
            {getDate()}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default LugarHoraFecha;

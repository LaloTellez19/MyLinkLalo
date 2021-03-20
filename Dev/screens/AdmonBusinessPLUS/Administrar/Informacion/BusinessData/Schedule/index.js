import React from 'react';
import {View, StyleSheet, Switch} from 'react-native';

import Colors from '../../../../../../constants/Colors';
import Layout from '../../../../../../constants/Layout';
import Text from '../../../../../../components/Text';
import Icon from '../../../../../../components/Icon';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    alignItems: 'center',
  },
  /* DAY SELECTOR STYLES */
  daySelector: {
    width: width,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray,
    marginTop: -5,
    marginBottom: 10,
  },
  dayName: {
    fontSize: 18,
    color: 'white',
    width: 150,
    textAlign: 'center',
  },
  /* DAY SWITCH SELECTOR */
  daySwitch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  daySwitchText: {
    marginRight: 30,
  },
  /* SERVICE HOURS EDITION */
  editionContainer: {
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  editionContainerTitle: {
    width: width,
    marginBottom: 5,
    marginLeft: 70,
    fontSize: 14,
		color: Colors.defaultTextColor,
  },
  editionRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 5,
  },
  editionCell: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
  },
  editionCellData: {
    width: 40,
    height: 50,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  editionCellDataText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  editionCellArrows: {
    alignItems: 'center',
  },
  editionCellDots: {
    fontSize: 20,
    color: Colors.defaultTextColor,
  },
  editionCellHrs: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
});

const daysOptions = {
  EN_US: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  ES_MX: [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ],
};

function Schedule(props) {
  const {index, data, handleSaveChanges} = props;
  const days = daysOptions.ES_MX;

  const [allData, setAllData] = React.useState([...data]);
  const [daySelected, setDaySelected] = React.useState(0);

  const editorCellsOpening = [
    {
      section: 'opening',
      prop: 'hour',
    },
    {
      section: 'opening',
      prop: 'minutes',
    },
    {
      section: 'opening',
      prop: 'pm',
    },
  ];

  const editorCellsClosing = [
    {
      section: 'closing',
      prop: 'hour',
    },
    {
      section: 'closing',
      prop: 'minutes',
    },
    {
      section: 'closing',
      prop: 'pm',
    },
  ];

  /* HANDLE CHANGE DAY */
  const handleChangeDay = (next = false) => {
    let index = daySelected;
    !next ? (index -= 1) : (index += 1);

    const newIndex = Math.min(Math.max(index, 0), 6);
    setDaySelected(newIndex);
  };

  /* HANDLE DATA CHANGE */
  const handleDataChange = (prop, value, subprop = false) => {
    const currentDay = allData[daySelected];
    if (subprop) {
      if (subprop === 'pm') {
        currentDay[prop][subprop] = value;
      } else {
        const maxValue = subprop === 'hour' ? 24 : 59;
        currentDay[prop][subprop] = Math.min(Math.max(value, 0), maxValue);
      }
    } else {
      currentDay[prop] = value;
    }
    setAllData([...allData]);
    handleSaveChanges(index, currentDay, daySelected);
  };

  return (
    <View style={styles.mainContainer}>
      {/* DAY SELECTOR */}
      <View style={styles.daySelector}>
        <Icon
          name="arrow_left"
          factor={0.8}
          Borderless
          forceColor
          color={'white'}
          onPress={() => handleChangeDay()}
        />
        <Text style={styles.dayName}>{days[daySelected]}</Text>
        <Icon
          name="arrow_right"
          factor={0.8}
          Borderless
          forceColor
          color={'white'}
          onPress={() => handleChangeDay(true)}
        />
      </View>

      {/* DAY SWITCH */}
      <View style={styles.daySwitch}>
        <Text style={styles.daySwitchText}>{'Este día abre tu negocio'}</Text>
        <Switch
          trackColor={{
            true: Colors.grayLight,
            false: Colors.grayLight,
          }}
          thumbColor={
            allData[daySelected].opens ? Colors.business : Colors.gray
          }
          onValueChange={() =>
            handleDataChange('opens', !allData[daySelected].opens)
          }
          value={allData[daySelected].opens}
        />
      </View>

      {/* SERVICE HOURS EDITION OPENING */}
      <View style={styles.editionContainer}>
        {/* TITLE */}
        <Text style={styles.editionContainerTitle}>{'Inicia'}</Text>

        {/* SELECTORS */}
        <View style={styles.editionRowContainer}>
          {editorCellsOpening.map((item, index) => (
            <EditionCell
              key={index}
              allData={allData}
              daySelected={daySelected}
              section={item.section}
              prop={item.prop}
              handleDataChange={handleDataChange}
            />
          ))}
        </View>
      </View>

      {/* SERVICE HOURS EDITION OPENING */}
      <View style={styles.editionContainer}>
        {/* TITLE */}
        <Text style={styles.editionContainerTitle}>{'Termina'}</Text>

        {/* SELECTORS */}
        <View style={styles.editionRowContainer}>
          {editorCellsClosing.map((item, index) => (
            <EditionCell
              key={index}
              allData={allData}
              daySelected={daySelected}
              section={item.section}
              prop={item.prop}
              handleDataChange={handleDataChange}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const EditionCell = ({
  allData,
  daySelected,
  section,
  prop,
  handleDataChange,
}) => {
  const field = allData[daySelected][section];
  const value = prop === 'pm' ? (field[prop] ? 'pm.' : 'am.') : field[prop];

  return (
    <View style={styles.editionCell}>
      {/* DATA CELL */}
      <View style={styles.editionCellData}>
        <Text style={styles.editionCellDataText}>{value}</Text>
      </View>

      {/* DATA CELL ARROWS */}
      <View style={styles.editionCellArrows}>
        <Icon
          name="arrow_up"
          factor={0.7}
          Borderless
          forceColor
          color={Colors.gray}
          onPress={() =>
            handleDataChange(
              section,
              prop === 'pm' ? !field[prop] : field[prop] + 1,
              prop,
            )
          }
        />
        <Icon
          name="arrow_down"
          factor={0.7}
          Borderless
          forceColor
          color={Colors.gray}
          onPress={() =>
            handleDataChange(
              section,
              prop === 'pm' ? !field[prop] : field[prop] - 1,
              prop,
            )
          }
        />
      </View>

      {/* RIGHT ELEMENT HOUR PROP */}
      {prop === 'hour' && (
        <View>
          <Text style={styles.editionCellDots}>{':'}</Text>
        </View>
      )}

      {/* RIGHT ELEMENT MINUTES PROP */}
      {prop === 'minutes' && (
        <View>
          <Text style={styles.editionCellHrs}>{'hrs.'}</Text>
        </View>
      )}
    </View>
  );
};

export default Schedule;

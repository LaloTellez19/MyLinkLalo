import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../../../constants/Colors';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import CalendarioPicker from '../../../../components/CalendarioPicker';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

/* DATA */
import {eventsCategories} from '../../../../testData/dataAdmon';

/* STYLES */
const styles = StyleSheet.create({
  /* CALENDAR CONTAINER STYLES */
  calendarContainer: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
  },
  /* ESTILOS DE LISTA DE EVENTOS */
  eventsListContainer: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  eventsList: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  listaEventosItem: {
    flexDirection: 'row',
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 0.5,
    borderColor: Colors.defaultTextColor,
    borderRadius: 10,
  },
  eventoImgdayContainer: {
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 5,
  },
  eventDayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 100,
    marginBottom: 10,
    marginTop: 2,
    backgroundColor: 'white',
    elevation: 1,
  },
  eventDay: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  eventoImg: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },
  eventoTextContainer: {
    width: 200,
    marginLeft: 15,
  },
  eventotitle: {
    fontSize: 18,
    color: Colors.grayBold,
    marginBottom: 5,
  },
  eventomessage: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginBottom: 1,
    textAlign: 'justify',
  },
  eventoDato: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -8,
    marginBottom: -10,
  },
  eventoDatoText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  eventocategory: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

function Eventos(props) {
  const {
    eventsByDate,
    errorEventsByDate,
    getDataByDate,
    personal,
    updateListInViewOffset,
  } = props;
  const allEventsCategories = eventsCategories.ES_MX;
  const iconColor = personal ? Colors.personal : Colors.business;

  const [itemSelected, setItemSelected] = React.useState({});
  console.log('errorEventsByDate: ', errorEventsByDate);

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

  React.useEffect(() => {
    const date = new Date();
    const month = menuMonths[date.getMonth()];
    getDataByDate(month);
  }, []);

  /* HANDLE GET DATA */
  const handleGetData = date => {
    const month = menuMonths[date.getMonth()];
    getDataByDate(month);
  };

  /* HANDLE ITEM SELECTION */
  const handleItemSelection = item => {
    setItemSelected(item);
    console.log('item: ', item);
  };

  return (
    <View style={{flex: 1}}>
      {/* PICKER MES / AÑO */}
      <View style={styles.calendarContainer}>
        <CalendarioPicker obtnerItemCalendario={handleGetData} newPicker />
      </View>

      {errorEventsByDate && (
        <ErrorOrNoData
          title={errorEventsByDate.title}
          message={errorEventsByDate.message}
        />
      )}

      {/* LISTA DE EVENTOS */}
      {!errorEventsByDate && (
        <View style={styles.eventsListContainer}>
          <FlatList
            nestedScrollEnabled={true}
            data={eventsByDate}
            renderItem={({item, index}) => (
              <Evento
                item={{...item, index}}
                handleItemSelection={handleItemSelection}
                allEventsCategories={allEventsCategories}
                iconColor={iconColor}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={event => {
              const offsetY = event.nativeEvent.contentOffset.y;
              updateListInViewOffset(offsetY);
            }}
          />
        </View>
      )}
    </View>
  );
}

const Evento = ({
  item,
  handleItemSelection,
  allEventsCategories,
  iconColor,
}) => {
  return (
    <TouchableOpacity
      style={styles.listaEventosItem}
      onPress={() => handleItemSelection(item)}>
      <View style={styles.eventoImgdayContainer}>
        {/* EVENT DAY */}
        <View style={styles.eventDayContainer}>
          <Text style={styles.eventDay}>{item.day}</Text>
        </View>

        {/* EVENT IMG */}
        <Image style={styles.eventoImg} source={{uri: item.img}} />
      </View>

      {/* EVENT CONTENT */}
      <View style={styles.eventoTextContainer}>
        {/* EVENT TITLE */}
        <Text style={styles.eventotitle}>{item.title}</Text>

        {/* EVENT MESSAGE */}
        <Text style={styles.eventomessage} numberOfLines={3}>
          {item.message}
        </Text>

        {/* EVENT DETAILS */}
        <View style={styles.eventoDato}>
          <Icon
            name="location"
            size={30}
            Borderless
            forceColor
            color={Colors.gray}
          />
          <Text style={styles.eventoDatoText}>{item.location.city}</Text>
        </View>
        <View style={styles.eventoDato}>
          <Icon
            name="clock_timer"
            size={30}
            Borderless
            forceColor
            color={Colors.gray}
          />
          <Text style={styles.eventoDatoText}>{item.date.time}</Text>
        </View>
      </View>

      {/* EVENT CATEGORY */}
      <View style={styles.eventocategory}>
        <Icon
          name={allEventsCategories[item.category]}
          size={40}
          background={iconColor}
          forceColor
          color={'white'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Eventos;

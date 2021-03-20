import React from 'react';
import {View, StyleSheet} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import Layout from '../../../constants/Layout';
import MenuTabs from '../../../components/MenuTabs';
import Loading from '../../../components/Loading';

import AllEvents from './AllEvents';
import ByDate from './ByDate';

/* DATA */
import {
  eventosMesResponse,
  allEventsResponse,
} from '../../../testData/dataAdmon';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuTabs: {
    height: 42,
  },
  viewPager: {
    width: width,
    height: height - 63 - 73 - 42,
  },
  viewContainer: {
    flex: 1,
  },
});

class Eventos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seleccionMenuTabs: 0,
      allEvents: [],
      eventsByDate: [],
      errorAllEvents: null,
      errorEventsByDate: null,
      loading: true,
    };

    this.menu = ['Todas', 'Recientes'];
    this.viewPager = React.createRef(null);

    this.setSeleccionMenuTabs = this.setSeleccionMenuTabs.bind(this);
    this.getDataByDate = this.getDataByDate.bind(this);
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try another date, or try to reload',
    };

    const response = allEventsResponse.data.events;

    if (response) {
      this.setState({
        allEvents: response,
        loading: false,
      });
    } else {
      this.setState({
        errorAllEvents: errorGettingData,
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.getData();
  }

  getDataByDate = month => {
    const errorByDate = {
      title: 'Data not found',
      message: 'Try another date, or try to reload',
    };

    const response = eventosMesResponse.data.events[month.toLowerCase()];
    if (response) {
      this.setState({
        eventsByDate: response,
        loading: false,
        errorEventsByDate: null,
      });
    } else {
      this.setState({
        errorEventsByDate: errorByDate,
        loading: false,
      });
    }
  };

  setSeleccionMenuTabs = selection => {
    this.setState({seleccionMenuTabs: selection});
  };

  render() {
    const {
      seleccionMenuTabs,
      allEvents,
      eventsByDate,
      errorAllEvents,
      errorEventsByDate,
      loading,
    } = this.state;
    const {personal, updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        {/* MenuTabs */}
        <View style={styles.menuTabs}>
          <MenuTabs
            opciones={this.menu}
            seleccion={seleccionMenuTabs}
            seleccionar={page => {
              this.setSeleccionMenuTabs(page);
              this.viewPager.current.setPage(page);
            }}
            personal={personal}
          />
        </View>

        {loading && <Loading />}

        {/* LISTA DE EVENTOS */}
        <ViewPager
          ref={this.viewPager}
          style={styles.viewPager}
          initialPage={0}
          onPageSelected={PageSelectedEvent => {
            this.setSeleccionMenuTabs(PageSelectedEvent.nativeEvent.position);
          }}>
          <View key="1" style={styles.viewContainer}>
            <AllEvents
              allEvents={allEvents}
              errorAllEvents={errorAllEvents}
              personal={personal}
              updateListInViewOffset={updateListInViewOffset}
            />
          </View>
          <View key="2" style={styles.viewContainer}>
            <ByDate
              eventsByDate={eventsByDate}
              errorEventsByDate={errorEventsByDate}
              getDataByDate={this.getDataByDate}
              personal={personal}
              updateListInViewOffset={updateListInViewOffset}
            />
          </View>
        </ViewPager>
      </View>
    );
  }
}

export default Eventos;

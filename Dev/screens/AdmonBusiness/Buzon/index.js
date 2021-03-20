import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Text from '../../../components/Text';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import UserImage from '../../../components/UserImage';
import CalendarioPicker from '../../../components/CalendarioPicker';
import Loading from '../../../components/Loading';
import ErrorOrNoData from '../../../components/ErrorOrNoData';

import ResponderMensaje from './ResponderMensaje';

/* DATA */
import {buzonMesResponse} from '../../../testData/dataAdmon';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    flex: 1,
    backgroundColor: 'white',
  },
  /* CALENDAR STYLES */
  calendar: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  /* ESTILOS LISTA DE MENSAJES  */
  messagesList: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  mensajeContainer: {
    alignItems: 'center',
    width: width,
    marginTop: 10,
    marginBottom: 10,
  },
  mensajeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: width * 0.9,
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  mensaje: {
    width: width * 0.6,
    marginLeft: 10,
  },
  mensajeUser: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginBottom: 5,
  },
  mensajeText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginBottom: 5,
  },
  mensajeTime: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
});

const ilustration = require('../../../assets/illust/4.png');

class Buzon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messagesList: [],
      answerMessage: false,
      selectedMessage: {},
      loading: true,
      error: null,
    };

    this.menuMonths = [
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

    this.getMessagesList = this.getMessagesList.bind(this);
    this.handleMessageSelection = this.handleMessageSelection.bind(this);
    this.handleSaveMessageReply = this.handleSaveMessageReply.bind(this);
    this.showAnswerView = this.showAnswerView.bind(this);
  }

  getData = date => {
    const errorGettingData = {
      title: 'There where no message during this date',
      message: 'Try with another date or try to reload',
    };

    const response = buzonMesResponse.data.messages[date.toLowerCase()];

    if (response) {
      this.setState({
        messagesList: response,
        loading: false,
        error: null,
      });
    } else {
      this.setState({
        error: errorGettingData,
        loading: false,
      });
    }
  };

  /* SELECCIONAR LISTA DE MENSAJES AÑO / MES */
  getMessagesList = date => {
    const month = this.menuMonths[date.getMonth()];
    this.getData(month);
  };

  /* HANDLDE MESSAGE SELECTION */
  handleMessageSelection = item => {
    this.setState(
      {
        answerMessage: true,
        selectedMessage: item,
      },
      () => this.goToMailBoxMessage(),
    );
  };

  /* HANDLE SAVE MESSAGE REPLY */
  handleSaveMessageReply = reply => {
    const errorReplying = {
      title: 'There was a problem processing your data',
      message: 'Try to reload',
    };
    const {selectedMessage, messagesList} = this.state;

    try {
      messagesList[selectedMessage.index].answered = true;
      messagesList[selectedMessage.index].messageReply = reply;
      this.setState({messagesList: [...messagesList]});
    } catch (err) {
      this.setState({error: errorReplying});
    }
  };

  showAnswerView = value => {
    this.setState({
      answerMessage: value,
    });
  };

  goToMailBoxMessage = () => {
    console.log('this.props.componentId: ', this.props.componentId);
    Navigation.push(this.props.componentId, {
      component: {
        name: 'my-link.MailBoxMessage',
        passProps: {
          user: this.props.user,
          mensajeSeleccionado: this.state.selectedMessage,
          answerMessage: this.showAnswerView,
          handleSaveMessageReply: this.handleSaveMessageReply,
        },
      },
    });
  };

  render() {
    const {
      loading,
      error,
      messagesList,
      answerMessage,
      selectedMessage,
    } = this.state;
    const {user, updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        {/* CALENDARIO PICKER */}
        <View style={styles.calendar}>
          <CalendarioPicker
            obtnerItemCalendario={this.getMessagesList}
            newPicker
          />
        </View>

        {loading && <Loading />}

        {error && (
          <ErrorOrNoData
            ilustration={ilustration}
            title={error.title}
            message={error.message}
          />
        )}

        {/* LIST */}
        {!loading && !error && (
          <View style={styles.messagesList}>
            <FlatList
              nestedScrollEnabled={true}
              data={messagesList}
              renderItem={({item, index}) => (
                <Mensaje
                  item={{...item, index}}
                  handleMessageSelection={this.handleMessageSelection}
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

        {/* RESPONDER MENSAJE SELECCIONADO */}
        {/* {answerMessage && (
          <ResponderMensaje
            user={user}
            mensajeSeleccionado={selectedMessage}
            answerMessage={this.showAnswerView}
            handleSaveMessageReply={this.handleSaveMessageReply}
          />
        )} */}
      </View>
    );
  }
}

const Mensaje = ({item, handleMessageSelection}) => {
  return (
    <View style={styles.mensajeContainer}>
      <TouchableOpacity
        style={[
          styles.mensajeItem,
          !item.answered
            ? {backgroundColor: Colors.grayLight}
            : {backgroundColor: 'transparent'},
        ]}
        onPress={() => handleMessageSelection(item)}>
        {/* IMAGEN DE USUARIO */}
        <View>
          <UserImage link={item.user.link} />
        </View>
        {/* MENSAJE INFO*/}
        <View style={styles.mensaje}>
          <Text style={styles.mensajeUser}>{`${item.user.nombre} ${
            item.user.apellido_paterno
          }`}</Text>
          <Text style={styles.mensajeText} numberOfLines={1}>
            {item.message}
          </Text>
          <Text style={styles.mensajeTime}>{`${item.date.time} ${
            item.date.timePeriod
          }`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Buzon;

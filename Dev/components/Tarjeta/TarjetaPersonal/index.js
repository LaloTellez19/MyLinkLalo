import React from 'react';
import {
  View,
  Switch,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Icon from '../../../components/Icon';
import Text from '../../../components/Text';
import Card from '../../../components/Card';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES*/
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 0,
  },
  /* ESTILOS TARJETA PERSONAL */
  cardContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: Colors.grayLight,
    alignItems: 'center',
  },
  /* ESTILOS CONTROL MENSAJES AUTOMATICOS */
  controlMensajes: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 8,
    paddingLeft: 5,
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
  },
  textActivarMensajes: {
    width: width / 2,
    textAlign: 'center',
    fontSize: 14,
    marginLeft: -30,
    color: Colors.defaultTextColor,
  },
  switch: {
    width: width / 4,
    alignItems: 'center',
  },
  switchText: {
    textAlign: 'center',
    fontSize: 10,
    color: Colors.defaultTextColor,
  },
  recomendacion: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 5,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  recomendacionText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.defaultTextColor,
    paddingLeft: 60,
    paddingRight: 60,
  },
  /* ESTILOS LISTA DE MENSAJES AUTOMATICOS */
  mensajesContainer: {
    height: 130,
    paddingBottom: 5,
  },
  listaMensajes: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  mensaje: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 20,
    marginLeft: 20,
    width: 320,
    height: 65,
    backgroundColor: Colors.grayLight,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  mensajeText: {
    width: 235,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'justify',
    color: Colors.defaultTextColor,
    fontSize: 14,
  },
  mensajeTextEdit: {
    width: 230,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'HelveticaNeueLt',
    textAlign: 'justify',
    color: Colors.defaultTextColor,
    fontSize: 14,
  },
  editarMensaje: {
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editarMensajeText: {
    color: Colors.defaultTextColor,
  },
  agregarMensaje: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
    paddingBottom: 3,
    paddingTop: 3,
    marginLeft: 100,
    marginRight: 100,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  agregarMensajeText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
});

class TarjetaPersonal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activarMensajes: false,
      editarMensaje: false,
      mensaje: '',
      activeColor: this.props.personal ? Colors.personal : Colors.business,
      loading: true,
      error: null,
    };

    this.saveMessage = this.saveMessage.bind(this);
    this.setEditarMensajes = this.setEditarMensajes.bind(this);
    this.setActivarMensajes = this.setActivarMensajes.bind(this);
    this.setMensaje = this.setMensaje.bind(this);
  }

  getMessage = () => {
    const errorGettingData = {
      title: 'Your message wasn´t found',
      message: 'Try to reload',
    };

    const response = {
      text:
        'Hola Andrea gracias por aceptar nuestra tarjeta, nos pondremos en comunicación.',
    };

    if (response) {
      this.setState({
        mensaje: response.text,
        loading: false,
      });
    } else {
      this.setState({
        error: errorGettingData,
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.getMessage();
  }

  /* GUARDAR CAMBIOS */
  saveMessage = message => {
    const errorProcessingData = {
      title: 'There was a problem processing the data',
      message: 'Try to reload',
    };

    try {
      const response = {
        text: message,
      };

      this.setState({
        mensaje: response.text,
        editarMensaje: false,
      });
    } catch (error) {
      this.setState({
        error: errorProcessingData,
      });
    }
  };

  setEditarMensajes = edit => {
    this.setState({editarMensaje: edit});
  };

  setActivarMensajes = active => {
    this.setState({activarMensajes: active});
  };

  setMensaje = text => {
    this.setState({mensaje: text});
  };

  render() {
    const {
      activarMensajes,
      activeColor,
      loading,
      error,
      editarMensaje,
      mensaje,
    } = this.state;
    const {user, personal, updateListInViewOffset} = this.props;

    return (
      <ScrollView
        style={styles.mainContainer}
        nestedScrollEnabled={true}
        onMomentumScrollEnd={event => {
          const offsetY = event.nativeEvent.contentOffset.y;
          updateListInViewOffset(offsetY);
        }}>
        {/* USER CARD */}
        <View style={styles.cardContainer}>
          <Card user={user} personal={personal} />
        </View>

        {/* CONTROL MENSAJES AUTOMATICOS */}
        <View
          style={[
            styles.controlMensajes,
            activarMensajes ? {marginTop: 0} : null,
          ]}>
          <View style={{width: width / 3, paddingLeft: 15}}>
            <Icon name="chat_bubble" size={40} forceColor color={Colors.gray} />
          </View>
          <Text style={styles.textActivarMensajes}>{'Mensaje automático'}</Text>
          <View style={styles.switch}>
            <Switch
              trackColor={{
                true: activeColor,
                false: Colors.gray,
              }}
              thumbColor={'white'}
              onValueChange={() => this.setActivarMensajes(!activarMensajes)}
              value={activarMensajes}
            />
            <Text style={styles.switchText}>
              {activarMensajes ? 'Activado' : 'Desactivado'}
            </Text>
          </View>
        </View>

        {/* LISTA DE MENSAJES AUTOMATICOS */}
        <View style={[styles.mensajesContainer, {flex: 1}]}>
          <View style={styles.recomendacion}>
            <Text style={styles.recomendacionText}>
              {
                'Activa tu mensaje para que las personas puedan verlo cuando compartas tu tarjeta.'
              }
            </Text>
          </View>

          {loading && (
            <View>
              <Text style={{textAlign: 'center'}}>{'Loading...'}</Text>
            </View>
          )}

          {error && (
            <View>
              <Text style={{textAlign: 'center'}}>{`${error.title}. ${
                error.message
              }`}</Text>
            </View>
          )}

          {activarMensajes && !loading && !error && (
            <View style={styles.listaMensajes}>
              <View style={styles.mensaje}>
                {!editarMensaje && (
                  <Text style={styles.mensajeText}>{mensaje}</Text>
                )}
                {editarMensaje && (
                  <TextInput
                    style={styles.mensajeTextEdit}
                    value={mensaje}
                    onChangeText={text => this.setMensaje(text)}
                    multiline
                  />
                )}
                <TouchableOpacity
                  style={styles.editarMensaje}
                  onPress={() =>
                    !editarMensaje
                      ? this.setEditarMensajes(true)
                      : this.saveMessage(mensaje)
                  }>
                  <Text style={styles.editarMensajeText}>
                    {!editarMensaje ? 'Editar' : 'Guardar'}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* //<TouchableOpacity
                //     style={styles.agregarMensaje}
                //     onPress={() => agregarMensaje()}>
                //     <Text style={styles.agregarMensajeText}>{'Agregar'}</Text>
                //   </TouchableOpacity> */}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default TarjetaPersonal;

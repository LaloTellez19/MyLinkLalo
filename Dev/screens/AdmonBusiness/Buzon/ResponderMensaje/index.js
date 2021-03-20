import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Layout from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Header from '../../../../components/Header';
import ProfilePicture from '../../../../components/ProfilePicture';
import UserImage from '../../../../components/UserImage';
import LugarHoraFecha from '../../../../components/LugarHoraFecha';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  /* ESTILOS MENSAJE */
  mainContainer: {
    position: 'absolute',
    elevation: 5,
    backgroundColor: 'white',
    width: width,
    height: '100%',
    flex: 1,
    overflow: 'hidden',
  },
  responderMensaje: {
    marginTop: 0,
  },
  mensajeContainer: {
    width: width / 1.05,
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 3,
    backgroundColor: 'white',
  },
  mensajeUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 1.5,
    marginTop: 10,
    marginLeft: -60,
  },
  mensajeUser: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 20,
  },
  mensajeTextContainer: {
    width: width / 1.5,
    alignSelf: 'center',
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 5,
  },
  mensajeText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
  },
  mensajeIcon: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
  chatIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  /* ESTILOS RESPONDER MENSAJE */
  mensajeTextResponder: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 230,
  },
  respuestaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 0,
  },
  businessImagenContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    elevation: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  respuestaInput: {
    width: 230,
    maxHeight: 100,
    borderRadius: 10,
    backgroundColor: Colors.grayLight,
    fontSize: 14,
    fontFamily: 'HelveticaNeueLt',
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  botonEnviarRespuesta: {
    width: 50,
  },
  /* BACK TO MESSAGES LIST STYLES */
  volverAMensajes: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 180,
    height: 40,
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: Colors.business,
  },
  volverAMensajesText: {
    color: 'white',
    fontSize: 14,
  },
  /* MESSAGE EMPTY RESPONSE STYLES */
  messageEmptyResponse: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 1.5,
    height: 50,
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 10,
  },
  messageEmptyResponseText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  /* MESSAGE REPLY STYLES */
  messageReplyContainer: {
    flexDirection: 'row',
    width: 330,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    elevation: 3,
    backgroundColor: 'white',
  },
  messageReply: {
    width: 210,
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
});

function ResponderMensaje(props) {
  const {
    user,
    mensajeSeleccionado,
    answerMessage,
    handleSaveMessageReply,
  } = props;
  const [respuesta, setRespuesta] = React.useState('');
  const [emptyResponse, setEmptyResponse] = React.useState(false);

  /* ENVIAR RESPUESTA A COMENTARIO */
  const enviarRespuesta = () => {
    const currentMessage = respuesta.trim();
    if (currentMessage !== '') {
      handleSaveMessageReply(currentMessage);
      answerMessage(false);
      goBack();
    } else {
      setEmptyResponse(true);
    }
  };

  const goBack = () => {
    Navigation.pop(props.componentId, {
      component: {
        name: 'my-link.MailBoxMessage',
      },
    });
  };

  return (
    <ScrollView style={styles.responderMensaje}>
      <Header goBack={() => goBack()} />
      {/* VISTA DEL MENSAJE */}
      <View style={styles.mensajeContainer}>
        {/* USUARIO */}
        <View style={styles.mensajeUsuario}>
          {/* IMAGEN USUARIO */}
          <UserImage link={mensajeSeleccionado.user.link} />

          {/* NOMBRE USUARIO */}
          <Text style={styles.mensajeUser}>{`${
            mensajeSeleccionado.user.nombre
          } ${mensajeSeleccionado.user.apellido_paterno}`}</Text>
        </View>

        {/* MENSAJE */}
        <View style={styles.mensajeTextContainer}>
          <Text style={styles.mensajeText}>{mensajeSeleccionado.message}</Text>
        </View>

        {/* DATOS DEL MENSAJE */}
        <LugarHoraFecha
          location={mensajeSeleccionado.location}
          date={mensajeSeleccionado.date}
        />

        {/* INBOX ICON */}
        <View style={styles.mensajeIcon}>
          <Icon name="mailbox" size={30} factor={1} Borderless />
        </View>

        {/* CHAT ICON */}
        {mensajeSeleccionado.chat && !mensajeSeleccionado.answered && (
          <View style={styles.chatIcon}>
            <Icon
              name="chat_bubbles"
              size={30}
              factor={0.8}
              forceColor
              color={'white'}
              background={Colors.business}
            />
          </View>
        )}
      </View>

      {/* RESPONDER MENSAJE */}
      {!mensajeSeleccionado.answered && (
        <View style={styles.respuestaContainer}>
          {/* IMAGEN DE MI BUSINESS */}
          <View style={styles.businessImagenContainer}>
            <ProfilePicture linkname={user.linkname} size={50} Business />
          </View>

          {/* INPUT PARA ESCRIBIR RESPUESTA */}
          <TextInput
            style={styles.respuestaInput}
            value={respuesta}
            placeholder={'Agrega un comentario'}
            onFocus={() => setEmptyResponse(false)}
            onChangeText={text => {
              setRespuesta(text);
              setEmptyResponse(false);
            }}
            multiline
            numberOfLines={4}
          />

          {/* BOTON PARA ENVIAR RESPUESTA */}
          <View style={styles.botonEnviarRespuesta}>
            <Icon
              name="message_send"
              size={45}
              factor={0.9}
              forceColor
              color={Colors.gray}
              // background={Colors.business}
              Borderless
              onPress={() => enviarRespuesta()}
            />
          </View>
        </View>
      )}

      {/* RESPUESTA A MENSAJE */}
      {mensajeSeleccionado.answered && (
        <View style={styles.messageReplyContainer}>
          {/* MY BUSINESS */}
          <View style={styles.businessImagenContainer}>
            <ProfilePicture linkname={user.linkname} size={50} Business />
          </View>
          <Text style={styles.messageReply}>
            {mensajeSeleccionado.messageReply}
          </Text>
        </View>
      )}

      {/* BOTON PARA VOLVER A VER MIS MENSAJES */}
      {/* <TouchableOpacity
          style={styles.volverAMensajes}
          onPress={() => answerMessage(false)}>
          <Text style={styles.volverAMensajesText}>
            {'Volver a mis mensajes'}
          </Text>
        </TouchableOpacity> */}

      {/* MESSAGE EMPTY RESPONSE */}
      {emptyResponse && (
        <View style={styles.messageEmptyResponse}>
          <Text style={styles.messageEmptyResponseText}>
            {'No haz escrito una respuesta aún'}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

export default ResponderMensaje;

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Header from '../../../../components/Header';
import ProfilePicture from '../../../../components/ProfilePicture';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: height,
    backgroundColor: 'white',
  },
  /* MESSAGE CONTAINER STYLES */
  menssageContainer: {
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
  userInfo: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNameLinkname: {
    width: '75%',
    marginLeft: 20,
  },
  userName: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  userLinkname: {
    fontSize: 14,
    color: Colors.gray,
  },
  messageInputContainer: {
    width: '80%',
    maxHeight: 100,
    marginTop: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  messageInput: {
    fontSize: 14,
    fontFamily: 'HelveticaNeueLt',
    color: Colors.gray,
    marginLeft: -20,
    textAlignVertical: 'top',
  },
  /* USER OPTIONS */
  userOptions: {
    backgroundColor: 'white',
    paddingTop: 10,
  },
  enableChatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 5,
  },
  enableChatMessage: {
    width: '60%',
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  enableChatSwitch: {
    width: '20%',
    alignItems: 'center',
  },
  enableChatSwitchText: {
    fontSize: 10,
    color: Colors.defaultTextColor,
  },
  /* SEND BUTTON */
  sendButton: {
    width: width / 2,
    height: 35,
    backgroundColor: Colors.personal,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  sendButtonText: {
    fontSize: 14,
    color: 'white',
  },
  inboxIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  /* MESSAGE EMPTY NOTIFICATION STYLES */
  isMessageEmpty: {
    width: width,
    height: 40,
    backgroundColor: 'white',
    elevation: 2,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  isMessageEmptyText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
});

class Complaint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      chatActive: false,
      isMessageEmpty: false,
    };

    this.backHandler = false;
    this.mainScroll = React.createRef(null);

    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.goBack();
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  goBack = () => {
    Navigation.dismissOverlay(this.props.componentId);
  };

  getName = (names, lastNames) => {
    const name = names.concat(lastNames);
    const finalName = name.filter(item => item !== '');
    return finalName.join(' ');
  };

  setMessage = text => {
    this.setState({message: text});
  };

  setChatActive = () => {
    this.setState({chatActive: !this.state.chatActive});
  };

  checkIfMessageIsEmty = isEmpty => {
    this.setState({isMessageEmpty: isEmpty});
  };

  sendMessage = () => {
    this.checkIfMessageIsEmty(false);
    this.goBack();
  };

  render() {
    const {message, chatActive, isMessageEmpty} = this.state;
    const {user, vip} = this.props;
    const vipDark = vip === 2;

    const thumbColorActive = vipDark ? Colors.silverChalice : Colors.personal;

    const backgroundColor = vipDark
      ? {backgroundColor: 'black'}
      : {backgroundColor: 'white'};

    const backgroundColor_2 = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.grayLight}
      : {color: Colors.defaultTextColor};

    const textColor_2 = vipDark
      ? {color: Colors.silverMetallic}
      : {color: Colors.defaultTextColor};

    const textColor_3 = vipDark
      ? {color: 'white'}
      : {color: Colors.defaultTextColor};

    const buttonBackground = vipDark
      ? {borderColor: Colors.grayLight, backgroundColor: Colors.eerieBlack}
      : {borderColor: Colors.gray, backgroundColor: Colors.personal};

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          if (isMessageEmpty) {
            this.checkIfMessageIsEmty(false);
          }
        }}>
        <ScrollView
          style={[styles.mainContainer, backgroundColor]}
          ref={this.mainScroll}>
          <Header
            goBack={() => this.goBack()}
            color={vipDark ? 'black' : 'white'}
          />

          {/* MESSAGE CONTAINER */}
          <View style={[styles.menssageContainer, backgroundColor_2]}>
            {/* USER INFO */}
            <View style={styles.userInfo}>
              <ProfilePicture
                linkname={user.linkname}
                Business={user.tipo !== 0}
              />
              <View style={styles.userNameLinkname}>
                <Text style={[styles.userName, textColor]}>
                  {this.getName(user.nombre, user.apellido)}
                </Text>
                <Text style={[styles.userLinkname, textColor_2]}>
                  {user.linkname}
                </Text>
              </View>
            </View>
            {/* TEXT INPUT */}
            <View style={styles.messageInputContainer}>
              <TextInput
                style={[styles.messageInput, textColor_3]}
                value={message}
                multiline={true}
                numberOfLines={4}
                onChangeText={text => this.setMessage(text)}
                placeholder={'Agrega un comentario'}
                placeholderTextColor={
                  vipDark ? 'white' : Colors.defaultTextColor
                }
                onFocus={() => {
                  if (isMessageEmpty) {
                    this.checkIfMessageIsEmty(false);
                  }
                }}
                // onContentSizeChange={event => {
                //   const ySize = event.nativeEvent.contentSize.height;
                //   if (this.mainScroll) {
                //     this.mainScroll.current.scrollTo({
                //       x: 0,
                //       y: ySize,
                //       animated: true,
                //     });
                //   }
                // }}
              />
            </View>
            <View style={styles.inboxIcon}>
              <Icon
                name="mailbox"
                factor={0.8}
                Borderless
                color={vipDark ? 'white' : Colors.gray}
              />
            </View>
          </View>

          {/* USER OPTIONS */}
          <View style={[styles.userOptions, backgroundColor]}>
            <View style={styles.enableChatContainer}>
              <Icon
                name="message_send"
                factor={0.8}
                Borderless
                color={vipDark ? 'white' : Colors.gray}
              />
              <Text style={[styles.enableChatMessage, textColor_3]}>
                {'Recibir respuesta via chat'}
              </Text>
              <View style={styles.enableChatSwitch}>
                <Switch
                  trackColor={{
                    true: Colors.grayLight,
                    false: Colors.grayLight,
                  }}
                  thumbColor={chatActive ? thumbColorActive : Colors.gray}
                  onValueChange={() => this.setChatActive()}
                  value={chatActive}
                />

                <Text style={[styles.enableChatSwitchText, textColor_3]}>
                  {chatActive ? 'Activado' : 'Desactivado'}
                </Text>
              </View>
            </View>

            {/* SEND BUTTON */}
            <TouchableOpacity
              style={[styles.sendButton, buttonBackground]}
              onPress={() => {
                const currentMessage = message.trim();
                if (currentMessage !== '' && currentMessage !== ' ') {
                  this.sendMessage();
                } else {
                  this.checkIfMessageIsEmty(true);
                }
              }}>
              <Text style={styles.sendButtonText}>{'Enviar'}</Text>
            </TouchableOpacity>
          </View>

          {/* EMPTY MESSAGE NOTIFICATION */}
          {isMessageEmpty && (
            <View style={[styles.isMessageEmpty, backgroundColor_2]}>
              <Text style={[styles.isMessageEmptyText, textColor_3]}>
                {'Escribe un mensaje'}
              </Text>
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

export default Complaint;

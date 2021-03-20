import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Switch,
  ScrollView,
  Modal,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Layout from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Header from '../../../../components/Header';
import ProfilePicture from '../../../../components/ProfilePicture';

const width = Layout.window.width;
const height = Layout.window.height;
const dataItemHeight = 65;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: '100%',
    backgroundColor: Colors.grayLight,
  },
  /* TOP CONTAINER STYLES */
  topContainerStyles: {
    height: 260,
    elevation: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 20,
  },
  topContainer: {
    width: width,
    height: 25,
    alignItems: 'center',
  },
  topContainerTitle: {
    fontSize: 20,
    color: Colors.defaultTextColor,
  },
  /* USER INFO STYLES */
  userInfo: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  businessName: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  businessLinkname: {
    fontSize: 16,
    color: Colors.personal,
  },
  /* NOT LINKED STYLES */
  notLinkedContainer: {
    marginTop: 70,
    alignSelf: 'center',
    alignItems: 'center',
  },
  notLinkedText: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginBottom: 70,
    paddingLeft: 15,
    paddingRight: 15,
  },
  /* BUTTON STYLES */
  button: {
    width: width / 2,
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.personal,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
  },
  /* DATA LIST */
  scrollList: {
    height: height,
    backgroundColor: 'white',
  },
  dataList: {
    elevation: 5,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  /* DATA ITEM */
  dataItem: {
    width: width,
    height: dataItemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataItemLeft: {
    width: '15%',
    height: dataItemHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataItemRight: {
    width: '85%',
    height: dataItemHeight,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  dataItemDataContainer: {
    width: '50%',
    alignItems: 'flex-start',
    marginRight: 15,
  },
  dataItemType: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginLeft: 10,
  },
  dataItemData: {
    fontSize: 12,
    color: Colors.gray,
    marginLeft: 10,
  },
  dataRequested: {
    width: 70,
    height: 20,
    backgroundColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: -13,
  },
  dataRequestedText: {
    fontSize: 12,
    color: 'white',
  },
  dataItemSwitch: {
    width: '30%',
    alignItems: 'center',
  },
  dataItemSwitchText: {
    fontSize: 11,
    color: Colors.defaultTextColor,
  },
  /* CONTACT OPTIONS STYLES */
  contactOptions: {
    width: width,
    height: 100,
    flexDirection: 'row',
    alignItems: 'baseline',
    elevation: 5,
    backgroundColor: 'white',
    marginTop: 0,
  },
  contactOption: {
    width: width / 4,
    alignItems: 'center',
    marginTop: 10,
  },
  contactOptionText: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 5,
  },
  /* MODAL STYLES */
  modalContainer: {
    width: width,
    height: height,
    opacity: 0.95,
    backgroundColor: Colors.grayBold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: width / 1.2,
    height: height / 1.3,
    opacity: 1,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalTop: {
    width: '100%',
    height: '30%',
    elevation: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTopText: {
    fontSize: 20,
    color: Colors.defaultTextColor,
    marginTop: 5,
  },
  modalCenter: {
    width: '100%',
    height: '50%',
    backgroundColor: Colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCenterText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginRight: 15,
    marginLeft: 15,
  },
  modalBottom: {
    width: '100%',
    height: '20%',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  /* DOCUMENTS DATA STYLE */
  documentsData: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  documentsDataHeader: {
    height: dataItemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 40,
  },
  documentsDataHeaderText: {
    width: '70%',
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginRight: 15,
  },
});

const myLinkedData = {
  a1: {
    id: 'a1',
    requested: true,
    shared: false,
  },
  b2: {
    id: 'b2',
    requested: false,
    shared: true,
  },
  c3: {
    id: 'c3',
    requested: false,
    shared: false,
  },
  ae1: {
    id: 'ae1',
    requested: false,
    shared: true,
  },
  be2: {
    id: 'be2',
    requested: false,
    shared: false,
  },
  ce3: {
    id: 'ce3',
    requested: true,
    shared: false,
  },
  aa1: {
    id: 'aa1',
    requested: false,
    shared: true,
  },
  ipCall: {
    requested: true,
    shared: false,
  },
  videoCall: {
    requested: false,
    shared: true,
  },
  realTimeLocation: {
    requested: false,
    shared: true,
  },
  socialProfile: {
    requested: true,
    shared: false,
  },
  ad1: {
    requested: false,
    shared: true,
  },
  bd2: {
    requested: true,
    shared: false,
  },
  cd3: {
    requested: false,
    shared: true,
  },
  dd4: {
    requested: true,
    shared: false,
  },
  ed5: {
    requested: false,
    shared: true,
  },
};

const phoneData = [
  {
    id: 'a1',
    type: 0,
    number: 789563,
    verified: false,
  },
  {
    id: 'b2',
    type: 1,
    number: 771548965,
    verified: false,
  },
  {
    id: 'c3',
    type: 2,
    number: 7719865875,
    verified: false,
  },
];

const emailData = [
  {
    id: 'ae1',
    type: 0,
    email: 'ghj@hotmail.com',
    verified: false,
  },
  {
    id: 'be2',
    type: 1,
    email: 'ghj_75@outlook.com',
    verified: false,
  },
  {
    id: 'ce3',
    type: 1,
    email: 'gh_j@gmail.com',
    verified: false,
  },
];

const locationData = [
  {
    id: 'aa1',
    calle: 'Boulevard Bonfil',
    ciudad: 'Tizayuca',
    codigo_postal: '58963',
    colonia: 'El Palmar',
    estado: 'Hidalgo',
  },
];

const documentsData = [
  {
    id: 'ad1',
    icon: 'tab_internet',
    type: 'Pasaporte',
  },
  {
    id: 'bd2',
    icon: 'tab_personal',
    type: 'Identificación personal',
  },
  {
    id: 'cd3',
    icon: 'tab_car',
    type: 'Licencia de conducir',
  },
  {
    id: 'dd4',
    icon: 'tab_school',
    type: 'Cédula profesional',
  },
  {
    id: 'ed5',
    icon: 'tab_work',
    type: 'Currículum',
  },
];

class SharedData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedPhone: [],
      sharedEmail: [],
      sharedLocations: [],
      sharedOtherData: [],
      sharedDocuments: [],
      lastIndex: 0,
      optionSelected: false,
      modalVisible: false,
      displayDocuments: false,
    };

    this.contactOptions = [
      {
        icon: 'card_delete',
        text: 'Eliminar tarjeta',
        message:
          'Al elimiinar esta tarjeta automáticamente desaparece de tu wallet, se elimina su información de tu cuenta y ya no podrás ver sus publicaciones ni compartir datos.',
        onPress: this.deleteCard,
      },
      {
        icon: 'chain_broken',
        text: 'Dejar de compartir Link',
        message:
          'Ya no podrá ver tus datos pero si te podrá seguir y ver tus publicaciones que tengas configuradas como públicas.',
        onPress: this.stopSharingLink,
      },
      {
        icon: 'personal_disabled',
        text: 'Bloquear',
        message:
          'Al bloquear a este usuario ya no podrán compartir publicaciones, datos o conversaciones y tampoco podrá solicitarte tu Link.',
        onPress: this.blockUser,
      },
      {
        icon: 'hand_open',
        text: 'Denunciar',
        message:
          'Si sabes o tienes sospechas de: spam, contenido inapropiado, cuenta falsa, robo mi identidad, acoso o viloación de la privacidad, sospecha de delito o violencia.',
        onPress: this.reportUser,
      },
    ];
  }

  getData = () => {
    const linkedData = myLinkedData;
    const linkedDataKeys = Object.keys(linkedData);

    const myPhoneData = phoneData.map((item, index) => {
      return {
        ...item,
        requested: linkedData[item.id].requested,
        shared: linkedData[item.id].shared,
      };
    });

    const myEmailData = emailData.map((item, index) => {
      return {
        ...item,
        requested: linkedData[item.id].requested,
        shared: linkedData[item.id].shared,
      };
    });

    const myLocationData = locationData.map((item, index) => {
      return {
        ...item,
        requested: linkedData[item.id].requested,
        shared: linkedData[item.id].shared,
      };
    });

    const myOtherData = [
      {
        icon: 'phone',
        type: 'Llamada IP',
        data: '',
        requested: linkedData['ipCall'].requested,
        shared: linkedData['ipCall'].shared,
      },
      {
        icon: 'videocall',
        type: 'Video llamada',
        data: '',
        requested: linkedData['videoCall'].requested,
        shared: linkedData['videoCall'].shared,
      },
      {
        icon: 'location_rt_solid',
        type: 'Ubicación en tiempo real',
        data: '',
        requested: linkedData['realTimeLocation'].requested,
        shared: linkedData['realTimeLocation'].shared,
      },
      {
        icon: 'personal',
        type: 'Perfil social',
        data: '',
        requested: linkedData['socialProfile'].requested,
        shared: linkedData['socialProfile'].shared,
      },
    ];

    const myDocumentsData = documentsData.map((item, index) => {
      return {
        ...item,
        requested: linkedData[item.id].requested,
        shared: linkedData[item.id].shared,
      };
    });

    this.setState({
      sharedPhone: myPhoneData,
      sharedEmail: myEmailData,
      sharedLocations: myLocationData,
      sharedOtherData: myOtherData,
      sharedDocuments: myDocumentsData,
    });
  };

  componentDidMount() {
    this.getData();
  }

  goBack = () => {
    Navigation.dismissOverlay(this.props.componentId);
  };

  getName = (names, lastNames) => {
    const name = names.concat(lastNames);
    const finalName = name.filter(item => item !== '');
    return finalName.join(' ');
  };

  contactOptionSelected = (show, option) => {
    this.setState({optionSelected: option, modalVisible: show});
  };
	
  getIcon = index => {
    const icons = ['phone', 'attach', 'message_send', 'my_link', 'at'];

    return icons[index];
  };

  deleteCard = () => {
    console.log('deleteCard');
    this.contactOptionSelected(false, false);
  };

  stopSharingLink = () => {
    console.log('stopSharingLink');
    this.contactOptionSelected(false, false);
  };

  blockUser = () => {
    console.log('blockUser');
    this.contactOptionSelected(false, false);
  };

  reportUser = () => {
    console.log('reportUser');
    this.contactOptionSelected(false, false);
  };

  setDisplayDocuments = () => {
    this.setState({displayDocuments: !this.state.displayDocuments});
  };

  render() {
    const {
      sharedPhone,
      sharedEmail,
      sharedLocations,
      modalVisible,
      optionSelected,
      sharedOtherData,
      sharedDocuments,
      displayDocuments,
    } = this.state;

    const {data, linked, sharing, viewer} = this.props;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

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

    const thumbColors = vipDark
      ? {active: Colors.eerieBlack, inactive: Colors.gray}
      : {
          active: viewer.tipo === 0 ? Colors.personal : Colors.business,
          inactive: Colors.gray,
        };

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* NOT LINKED */}
        {!linked && (
          <View>
            <TopSection
              data={data}
              vipDark={vipDark}
              backgroundColor={backgroundColor}
              textColors={[textColor, textColor_2]}
              goBack={this.goBack}
              getName={this.getName}
              linked={linked}
              personalViewer={viewer.tipo === 0}
            />
            <View style={styles.notLinkedContainer}>
              <Text style={styles.notLinkedText}>
                {'Actualmente no compartes información con esta persona.'}
              </Text>
              {!sharing && (
                <Button text={'Compartir Link'} icon={'link_share'} />
              )}
            </View>
          </View>
        )}

        {/* LINKED */}
        {linked && (
          <ScrollView style={[styles.scrollList, backgroundColor]}>
            <View style={[styles.dataList, backgroundColor_2]}>
              <TopSection
                data={data}
                vipDark={vipDark}
                backgroundColor={backgroundColor}
                textColors={[textColor, textColor_2]}
                goBack={this.goBack}
                getName={this.getName}
                linked={linked}
                personalViewer={viewer.tipo === 0}
              />

              {/* PHONE DATA */}
              {sharedPhone.map((item, index) => (
                <DataItem
                  key={index}
                  item={{
                    icon: this.getIcon(item.type),
                    type: 'Teléfono',
                    data: item.number,
                    requested: item.requested,
                    shared: item.shared,
                  }}
                  vipDark={vipDark}
                  textColors={[textColor, textColor_2, textColor_3]}
                  thumbColors={thumbColors}
                />
              ))}

              {/* EMAIL DATA */}
              {sharedEmail.map((item, index) => (
                <DataItem
                  key={index}
                  item={{
                    icon: this.getIcon(item.type + 3),
                    type: 'Correo',
                    data: item.email,
                    requested: item.requested,
                    shared: item.shared,
                  }}
                  vipDark={vipDark}
                  textColors={[textColor, textColor_2, textColor_3]}
                  thumbColors={thumbColors}
                />
              ))}

              {/* LOCATION DATA */}
              {sharedLocations.map((item, index) => (
                <DataItem
                  key={index}
                  item={{
                    icon: 'location',
                    type: 'Dirección',
                    data: `${item.calle}, ${item.colonia}, ${item.ciudad}, ${
                      item.estado
                    }, ${item.codigo_postal}`,
                    requested: item.requested,
                    shared: item.shared,
                  }}
                  vipDark={vipDark}
                  textColors={[textColor, textColor_2, textColor_3]}
                  thumbColors={thumbColors}
                />
              ))}

              {/* OTHER DATA */}
              {sharedOtherData.map((item, index) => (
                <DataItem
                  key={index}
                  item={item}
                  vipDark={vipDark}
                  textColors={[textColor, textColor_2, textColor_3]}
                  thumbColors={thumbColors}
                />
              ))}

              {/* DOCUMENTS DATA */}
              <View style={styles.documentsData}>
                <View style={styles.documentsDataHeader}>
                  <Text style={[styles.documentsDataHeaderText, textColor_3]}>
                    {'Documentos Personales'}
                  </Text>
                  <Icon
                    name={displayDocuments ? 'arrow_up' : 'arrow_down'}
                    size={40}
                    factor={0.8}
                    Borderless
                    onPress={() => this.setDisplayDocuments()}
                  />
                </View>
                {displayDocuments && (
                  <View>
                    {sharedDocuments.map((item, index) => (
                      <DataItem
                        key={index}
                        item={item}
                        lastItem={index === sharedDocuments.length - 1}
                        vipDark={vipDark}
                        textColors={[textColor, textColor_2, textColor_3]}
                        thumbColors={thumbColors}
                      />
                    ))}
                  </View>
                )}
              </View>
            </View>

            {/* CONTACT OPTIONS */}
            <View style={[styles.contactOptions, backgroundColor_2]}>
              {this.contactOptions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.contactOption}
                  onPress={() => this.contactOptionSelected(true, index)}>
                  <Icon
                    name={item.icon}
                    size={50}
                    factor={0.8}
                    background={vipDark ? Colors.eerieBlack : 'transparent'}
                    forceColor
                    color={vipDark ? 'white' : Colors.gray}
                  />
                  <Text style={styles.contactOptionText}>{item.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {/* CONTACT OPTION MODAL */}
        <ContactOptionModalView
          modalVisible={modalVisible}
          close={this.contactOptionSelected}
          contactOption={this.contactOptions[optionSelected]}
          backgroundColors={[backgroundColor, backgroundColor_2]}
          textColors={[textColor, textColor_2, textColor_3]}
          vipDark={vipDark}
        />
      </View>
    );
  }
}

const TopSection = ({
  data,
  vipDark,
  backgroundColor,
  textColors,
  goBack,
  getName,
  linked,
  personalViewer,
}) => {
  const linknameColor = vipDark
    ? {color: Colors.platinum}
    : personalViewer
    ? {color: Colors.personal}
    : {color: Colors.business};

  return (
    <View style={[styles.topContainerStyles, backgroundColor]}>
      <Header goBack={() => goBack()} color={vipDark ? 'black' : 'white'} />
      {/* TOP CONTAINER */}
      <View style={styles.topContainer}>
        <Text style={[styles.topContainerTitle, textColors[0]]}>
          {'Datos que compartes con'}
        </Text>
      </View>

      {/* USER INFO */}
      <View style={styles.userInfo}>
        <ProfilePicture
          linkname={data.linkname}
          size={100}
          Business={data.tipo !== 0}
        />
        <Text style={[styles.businessName, textColors[1]]}>
          {getName(data.nombre, data.apellido)}
        </Text>
        {linked && (
          <Text style={styles.businessLinkname}>{`@${data.linkname}`}</Text>
        )}
      </View>
    </View>
  );
};

const Button = ({text, icon, onPress, vipDark}) => {
  const buttonBackground = vipDark
    ? {borderColor: Colors.grayLight, backgroundColor: Colors.jet}
    : {borderColor: Colors.gray, backgroundColor: Colors.personal};

  const buttonText = vipDark
    ? {color: Colors.silverMetallic}
    : {color: 'white'};

  return (
    <TouchableOpacity
      style={[styles.button, buttonBackground]}
      onPress={onPress}>
      {icon && <Icon name={icon} Borderless forceColor color={'white'} />}
      <Text style={[styles.buttonText, buttonText]}>{text}</Text>
    </TouchableOpacity>
  );
};

const DataItem = ({item, lastItem, vipDark, textColors, thumbColors}) => {
  const [shared, setShared] = React.useState(item.shared);

  return (
    <View style={styles.dataItem}>
      <View style={styles.dataItemLeft}>
        <Icon
          name={item.icon}
          factor={0.7}
          Borderless
          Colorless={item.icon === 'my_link'}
          background={vipDark ? Colors.eerieBlack : 'transparent'}
          forceColor
          color={vipDark ? 'white' : Colors.gray}
        />
      </View>
      <View
        style={[
          styles.dataItemRight,
          {borderColor: lastItem ? 'transparent' : Colors.gray},
        ]}>
        <View style={styles.dataItemDataContainer}>
          <Text style={[styles.dataItemType, textColors[0]]}>{item.type}</Text>
          <Text style={[styles.dataItemData, textColors[1]]}>{item.data}</Text>
        </View>

        <View
          style={[
            styles.dataRequested,
            {backgroundColor: item.requested ? Colors.gray : 'transparent'},
          ]}>
          {item.requested && (
            <Text style={styles.dataRequestedText}>{'solicitado'}</Text>
          )}
        </View>

        <View style={styles.dataItemSwitch}>
          <Switch
            trackColor={{
              true: Colors.grayLight,
              false: Colors.grayLight,
            }}
            thumbColor={shared ? thumbColors.active : thumbColors.inactive}
            onValueChange={() => setShared(!shared)}
            value={shared}
          />
          <Text style={styles.dataItemSwitchText}>
            {shared ? 'Compartiendo' : 'Compartir'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ContactOptionModalView = ({
  modalVisible,
  close,
  contactOption,
  backgroundColors,
  textColors,
  vipDark,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        close(false, false);
      }}>
      {contactOption && (
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => close(false, false)}>
          <View style={[styles.modal, backgroundColors[1]]}>
            <View style={[styles.modalTop, backgroundColors[0]]}>
              <Icon
                name={contactOption.icon}
                size={80}
                factor={0.8}
                background={vipDark ? Colors.eerieBlack : 'transparent'}
                forceColor
                color={vipDark ? 'white' : Colors.gray}
              />
              <Text style={[styles.modalTopText, textColors[0]]}>
                {contactOption.text}
              </Text>
            </View>
            <View style={[styles.modalCenter, backgroundColors[1]]}>
              <Text style={[styles.modalCenterText, textColors[1]]}>
                {contactOption.message}
              </Text>
            </View>
            <View style={[styles.modalBottom, backgroundColors[0]]}>
              <Button
                text={contactOption.text}
                onPress={() => {
                  contactOption.onPress();
                }}
                vipDark={vipDark}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </Modal>
  );
};

export default SharedData;

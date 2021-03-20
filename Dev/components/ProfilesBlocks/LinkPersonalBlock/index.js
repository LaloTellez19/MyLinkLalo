import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
  SectionList,
  Image,
} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';
import Icon from '../../Icon';

const width = Layout.window.width;
const contactItemHeight = 55;
const itemWidth = width / 4;

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  /* BLOCK NAME STYLES */
  blockName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  arrowUp: {
    position: 'absolute',
    right: 10,
  },
  blockNameText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 10,
  },
  /* MENU STYLES */
  menu: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 10,
  },
  menuItem: {
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginTop: 2,
  },
  /* SHOW ALL STYLES */
  showAll: {
    width: width / 2.4,
    height: 30,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
  },
  showAllIcon: {
    marginLeft: 10,
  },
  showAllText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginLeft: 5,
  },
  /* COUNTER STYLES */
  counter: {
    width: width / 11,
    height: width / 16,
    position: 'absolute',
    top: 1,
    right: -10,
    backgroundColor: Colors.business,
    borderWidth: 2.5,
    borderColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 12,
    color: 'white',
  },
  /* BUSINESS SECTION STYLES */
  businessSection: {
    marginTop: 10,
    marginBottom: 5,
  },
  businessField: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  businessFieldText: {
    width: '58%',
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  isOpen: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.business,
  },
  distance: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.gray,
  },
  /* SHOW ALL DATA STYLES */
  contactInfo: {
    width: width,
    // flex: 1,
  },
  documentsInfo: {
    width: width,
  },
  contactItem: {
    height: contactItemHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentItem: {
    height: contactItemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  contactData1: {
    maxWidth: width / 1.8,
    fontSize: 16,
    color: Colors.personal,
  },
  contactData2: {
    maxWidth: width / 1.6,
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  documentData: {
    maxWidth: width / 1.8,
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  mapMaincontainer: {
    width: 55,
    height: 55,
    borderRadius: 360,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
  },
  mapContainer: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: 50,
    height: 50,
    borderRadius: 360,
  },
  documentsViews: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
    paddingTop: 10,
    borderTopWidth: 4,
    borderColor: Colors.platinum,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
  },
  lockIcon: {
    alignItems: 'center',
    width: itemWidth,
    marginLeft: 10,
  },
  requestContainer: {
    alignItems: 'center',
    width: itemWidth * 3,
  },
  title: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    marginTop: 10,
    textAlign: 'center',
  },
  message: {
    width: itemWidth * 2.5,
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginTop: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  requestButton: {
    width: itemWidth * 1.8,
    height: 30,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'black',
    borderWidth: 0.5,
    borderColor: Colors.grayLight,
    borderRadius: 10,
    marginBottom: 15,
  },
  requestButtonText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 0,
  },
});

const defaultMapImg =
  'https://i.picsum.photos/id/573/200/200.jpg?hmac=_P1Ut7_f-iqW1IMep_N04u4qKZydb6hosT2QKXiMNVo';

class LinkPersonalBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: [
        {
          icon: 'phone',
          text: 'Llamar',
        },
        {
          icon: 'message_send',
          text: 'Mensajes',
          counter: 25,
        },
        {
          icon: 'at',
          text: 'Correo',
          counter: 10,
        },
        {
          icon: 'videocall',
          text: 'Video',
        },
        {
          icon:  'sms' ,
          text: 'SMS',
        },
      ],
      showAll: false,
    };

    this.contactView = new Animated.Value(0);

    this.handleShowAll = this.handleShowAll.bind(this);
    this.itemSelected = this.itemSelected.bind(this);
  }

  componentDidMount() {}

  /* HANDLE MENU SELECTION */
  handleMenuSelection = selection => {
    const menu = this.state.menu;

    switch (selection) {
      case 0:
        console.log(menu[selection].text);
        break;
      case 1:
        console.log(menu[selection].text);
        break;
      case 2:
        console.log(menu[selection].text);
        break;
      case 3:
        console.log(menu[selection].text);
        break;
      case 4:
        console.log(menu[selection].text);
        break;
    }
  };

  /* HANDLE SHOW ALL */
  handleShowAll = show => {
    const {data} = this.props;
    const allData = [...data.phoneData, ...data.emailData, data.domicilio];
    const documents = data.documents;
    const sectionHeight =
      (allData.length + documents.length + 1) * contactItemHeight;
    this.setState({showAll: show});
    Animated.timing(this.contactView, {
      toValue: show ? sectionHeight : 0,
      duration: show ? 1000 : 600,
      isInteraction: false,
      useNativeDriver: false,
    }).start();
  };

  checkIfOpen = (textColor_3, textColor_4) => {
    const {scheduleData} = this.props.data;
    let isOpen = true;
    const today = new Date();
    const todayHour = [today.getHours(), today.getMinutes()];
    const scheduleDayOpens = scheduleData[today.getDay()].opening;
    const scheduleDayClose = scheduleData[today.getDay()].closing;
    const scheduleDayHour = [
      parseInt(scheduleDayClose.hour, 10),
      parseInt(scheduleDayClose.minutes, 10),
    ];

    if (scheduleDayHour[0] < todayHour[0]) {
      isOpen = false;
    } else if (scheduleDayHour[0] === todayHour[0]) {
      if (scheduleDayHour[1] < todayHour[1]) {
        isOpen = false;
      }
    }

    return (
      <Text style={[styles.businessFieldText, textColor_3]}>
        <Text style={[styles.isOpen, textColor_4]}>{`${
          isOpen ? 'Abierto' : 'Cerrado'
        }, `}</Text>
        {isOpen
          ? `cierra en ${this.getRemainingOpenTime(
              scheduleDayHour,
              todayHour,
            )} hrs`
          : `abre a las ${scheduleDayOpens.hour}:${
              scheduleDayOpens.minutes
            } hrs`}
      </Text>
    );
  };

  getRemainingOpenTime = (close, current) => {
    const minutes = 60 - current[1] + close[1];
    const hours = close[0] - current[0] - 1;
    return `${minutes < 60 ? hours : hours + 1}:${
      minutes < 60 ? minutes : minutes - 60
    }`;
  };

  checkDistanceAndTime = textColor => {
    return (
      <Text style={[styles.businessFieldText, textColor]}>
        <Text style={styles.distance}>{`A ${1.5}km, `}</Text>
        {`llegas en ${15} min.`}
      </Text>
    );
  };

  displaySchedule = () => {
    console.log('displaySchedule');
  };

  displayMap = () => {
    console.log('displayMap');
  };

  itemSelected = item => {
    console.log('itemSelected: ', item);
  };

  render() {
    const {menu, showAll} = this.state;
    const {data} = this.props;
    const allData = [...data.phoneData, ...data.emailData, data.domicilio];
    const documents = data.documents;
    const type = data.tipo;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

    const backgroundColor = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    const textColor_2 = vipDark
      ? {color: Colors.battleshipGray}
      : {color: Colors.defaultTextColor};

    const textColor_3 = vipDark
      ? {color: Colors.grayLight}
      : {color: Colors.defaultTextColor};

    const textColor_4 = vipDark
      ? {color: Colors.mayGreen}
      : {color: Colors.defaultTextColor};

    const buttonBackground = vipDark
      ? {borderColor: Colors.grayLight, backgroundColor: Colors.eerieBlack}
      : {borderColor: Colors.gray, backgroundColor: 'transparent'};

    const buttonText = vipDark
      ? {color: Colors.grayLight}
      : {color: Colors.defaultTextColor};

    const darkDocumentsViews = vipDark
      ? {borderColor: 'black'}
      : {borderColor: Colors.platinum};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* BLOCK NAME */}
        <View style={styles.blockName}>
          <Text style={[styles.blockNameText, textColor]}>
            {'Link Personal'}
          </Text>
          {/* {showAll && (
            <View style={styles.arrowUp}>
              <Icon
                name="arrow_up"
                factor={0.9}
                Borderless
                forceColor
                color={vipDark ? Colors.grayLight : Colors.gray}
                onPress={() => this.handleShowAll(false)}
              />
            </View>
          )} */}
        </View>

        {/* MENU */}
        <View style={styles.menu}>
          {menu.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => this.handleMenuSelection(index)}>
              <Icon
                name={item.icon}
                size={45}
                factor={0.7}
                forceColor
                color={
                  vip || vipDark
                    ? Colors.platinum
                    : type === 0
                    ? Colors.platinum
                    : Colors.gray
                }
                background={
                  vip || vipDark
                    ? 'black'
                    : type === 0
                    ? Colors.personal
                    : 'white'
                }
              />

              <Text style={[styles.menuItemText, textColor_2]}>
                {item.text}
              </Text>

              {/* COUNTER */}
              {item.counter && (
                <View
                  style={[
                    styles.counter,
                    {
                      backgroundColor:
                        type === 0 || vipDark ? Colors.silver : Colors.business,
                    },
                    {borderColor: vipDark ? Colors.dimGray : 'white'},
                  ]}>
                  <Text style={styles.counterText}>
                    {item.counter <= 99 ? item.counter : '+99'}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {type === 1 && (
          <View style={styles.businessSection}>
            <View style={styles.businessField}>
              <Icon
                name="clock"
                size={35}
                Borderless
                forceColor
                color={vipDark ? 'white' : Colors.gray}
              />
              {this.checkIfOpen(textColor_3, textColor_4)}
              <Icon
                name="arrow_right"
                Borderless
                onPress={this.displaySchedule}
              />
            </View>
            <View style={styles.businessField}>
              <Icon
                name="location"
                size={35}
                Borderless
                forceColor
                color={vipDark ? 'white' : Colors.gray}
              />
              {this.checkDistanceAndTime(textColor_3)}
              <Icon name="arrow_right" Borderless onPress={this.displayMap} />
            </View>
          </View>
        )}

        {/* SEE CONTACT */}
        <Animated.View style={{height: this.contactView}}>
          <ContactInfo
            data={allData}
            documents={documents}
            itemSelected={this.itemSelected}
            darkDocumentsViews={darkDocumentsViews}
            textColor={textColor}
          />
        </Animated.View>

        {/* SHOW ALL */}
        <TouchableOpacity
          style={[styles.showAll, buttonBackground]}
          onPress={() => this.handleShowAll(!showAll)}>
          <View style={styles.showAllIcon}>
            <Icon
              name={showAll ? 'arrow_up' : 'arrow_down'}
              factor={0.9}
              Borderless
              forceColor
              color={vipDark ? Colors.grayLight : Colors.gray}
            />
          </View>
          <Text style={[styles.showAllText, buttonText]}>
            {showAll ? 'mostrar menos' : 'mostrar más'}
          </Text>
        </TouchableOpacity>

          <View style={styles.content}>
            <View style={styles.lockIcon}>
              <Icon
                name="vip_personal"
                size={90}
                factor={0.9}
                Borderless
                Colorless
              />
            </View>
            <View style={styles.requestContainer}>
              <Text style={styles.title}>{'Link Personal'}</Text>
              <Text style={styles.message}>
                {'Este es un Link VIP, solo otro VIP puede enviar solicitud.'}
              </Text>
              <TouchableOpacity
                style={styles.requestButton}
                onPress={() => this.requestVIP()}>
                {/* <Icon
                  name="people_add"
                  size={40}
                  factor={0.7}
                  Borderless
                  forceColor
                  color={'white'}
                /> */}
                <Text style={styles.requestButtonText}>{'Hacerme VIP'}</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    );
  }
}

const ContactInfo = ({
  data,
  documents,
  itemSelected,
  darkDocumentsViews,
  textColor,
}) => {
  return (
    <View>
      <SectionList
        sections={[
          {
            title: '',
            data: data,
          },
          {
            title: 'Documentos Personales',
            data: documents,
          },
        ]}
        renderItem={({item, index}) => (
          <ContactItem item={{...item, index}} itemSelected={itemSelected} />
        )}
        renderSectionHeader={({section}) => (
          <View>
            {section.title !== '' && (
              <View style={[styles.documentsViews, darkDocumentsViews]}>
                <Text style={[styles.blockNameText, textColor]}>
                  {section.title}
                </Text>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

function ContactItem({item, itemSelected}) {
  const getLocation = (keys, info) => {
    const location = keys.map(key => info[key]);
    return location.join(', ');
  };

  if (item.icon) {
    return (
      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => itemSelected(item)}>
        <Icon name={item.icon} Borderless Colorless={item.icon === 'my_link'} />
        <Text style={styles.contactData1}>{item.data}</Text>
      </TouchableOpacity>
    );
  } else if (item.name) {
    return (
      <TouchableOpacity
        style={styles.documentItem}
        onPress={() => itemSelected(item)}>
        <Icon name={item.name} factor={0.9} Borderless />
        <Text style={styles.documentData}>{item.type}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.contactItem}>
        <Icon name="location" Borderless />
        <Text style={styles.contactData2} numberOfLines={2}>{`${getLocation(
          Object.keys(item),
          item,
        )}`}</Text>
        <View style={styles.mapMaincontainer}>
          <View style={styles.mapContainer}>
            <Image style={styles.map} source={{uri: defaultMapImg}} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default LinkPersonalBlock;

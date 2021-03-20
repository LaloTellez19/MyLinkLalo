import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import Header from '../../../components/Header';
import firebase from '../../../components/firebase';
import Text from '../../../components/Text';
import Icon from '../../../components/Icon';
import ProfilePicture from '../../../components/ProfilePicture';

import ListWithContextMenu from '../ScrollImages/ListWithContextMenu';

const width = Layout.window.width;
const height = Layout.window.height;
const itemHeight = 60;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    height: 63,
    backgroundColor: 'black',
  },
  title2: {
    width: '100%',
    height: 63,
    backgroundColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  /* LIST STYLES */
  list: {
    width: width,
    alignSelf: 'center',
    flexGrow: 1,
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
  },
  listItem: {
    width: width,
    height: itemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  itemText: {
    width: width / 1.2,
    marginLeft: 15,
  },
  /* USER STYLES */
  userInfoContainer: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  userName: {
    marginTop: 18,
    paddingBottom: 5,
    fontSize: 18,
    color: Colors.defaultTextColor,
  },
  camaraIcon: {
    position: 'absolute',
    top: 80,
    opacity: 0.5,
    elevation: 10,
  },
});

const listData = [
  {
    text: '1',
  },
  {
    text: '2',
  },
  {
    text: '3',
  },
  {
    text: '4',
  },
  {
    text: '5',
  },
  {
    text: '6',
  },
  {
    text: '7',
  },
  {
    text: '8',
  },
  {
    text: '9',
  },
  {
    text: '10',
  },
  {
    text: '1',
  },
  {
    text: '2',
  },
  {
    text: '3',
  },
  {
    text: '4',
  },
  {
    text: '5',
  },
  {
    text: '6',
  },
  {
    text: '7',
  },
  {
    text: '8',
  },
  {
    text: '9',
  },
  {
    text: '10',
  },
];

function ScrollImages(props) {
  const {personal} = props;
  const contextMenu = ['Editar', 'Eliminar'];
  const [itemSelected, setItemSelected] = React.useState({});
  const [optionSelected, setOptionSelected] = React.useState(false);
  const lastIndex = listData.length - 1;

  const [user, setUser] = React.useState({});
  const [panelMargin, setPanelMargin] = React.useState(0);
  const scrollHeight = React.useRef(new Animated.Value(0)).current;
  const initialHeight = 126 + 150 + 15 + 10;
  console.log('scrollHeight: ', scrollHeight);

  const allMenuOptions = [
    {
      text: contextMenu[0],
      onPress: () => {
        console.log(contextMenu[0], itemSelected.index);
        setOptionSelected(true);
      },
    },
    {
      text: contextMenu[1],
      onPress: () => {
        console.log(contextMenu[1], itemSelected.index);
        setOptionSelected(true);
      },
    },
  ];

  const touchablePart = {
    width: '100%',
    height: initialHeight,
    marginTop: scrollHeight,
    alignSelf: 'center',
    elevation: -1,
  };

  React.useEffect(() => {
    getUserData(props.uid);
  }, []);

  const returnListItem = (item, setShowContextMenu) => (
    <ListItem
      item={item}
      setShowContextMenu={setShowContextMenu}
      setItemSelected={setItemSelected}
      setOptionSelected={setOptionSelected}
    />
  );

  const updateHeight = () => {
    const valueHide = 63 + 150 + 15 + 10;
    let newValue = panelMargin;
    console.log('updateHeight: ', scrollHeight === 0);
    if (panelMargin === 0) {
      newValue = panelMargin - valueHide;
      console.log('up: ', newValue);
    } else {
      newValue = panelMargin + valueHide;
      console.log('down: ', newValue);
    }
    setPanelMargin(newValue);
    Animated.timing(scrollHeight, {
      toValue: newValue,
      useNativeDriver: false,
    }).start();
  };

  const getUserData = uid => {
    firebase
      .firestore()
      .collection('usuarios')
      .doc(uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          // console.log(documentSnapshot.data());
          setUser(documentSnapshot.data());
        }
      })
      .catch(error => {});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* HEADER */}
      <Header />

      {/* USER / MENU / SUBMENU */}
      <Animated.View style={touchablePart}>
        <TouchableOpacity onPress={() => updateHeight()} activeOpacity={0.8}>
          <View style={styles.userInfoContainer}>
            <ProfilePicture
              linkname={user.linkname}
              size={110}
              Business={!personal}
            />
            <Text style={styles.userName}>{`${user.nombre} ${
              user.apellido_paterno
            }`}</Text>
            <View style={styles.camaraIcon}>
              <Icon
                name="camera"
                size={45}
                Borderless
                background={'black'}
                onPress={() => console.log('abrir camera')}
              />
            </View>
          </View>
          <View style={styles.title} />
          <View style={styles.title2}>
            <Icon name="card" onPress={() => console.log('icon presed')} />
            <Icon name="star" onPress={() => console.log('icon presed')} />
            <Icon name="card" onPress={() => console.log('icon presed')} />
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* CONTENT CONTAINER*/}
      <View style={{flex: 1}}>
        {/* OPTION SELECTED */}
        <View>
          <Text style={{height: 20, backgroundColor: 'white'}}>
            {'Menu TABS'}
          </Text>
          <ListWithContextMenu
            data={listData}
            listStyle={styles.list}
            ListItem={(item, setShowContextMenu) =>
              returnListItem(item, setShowContextMenu)
            }
            lastIndex={lastIndex}
            allMenuOptions={allMenuOptions}
            itemSelected={itemSelected}
            itemHeight={
              itemSelected.index === lastIndex ? itemHeight * 0.98 : itemHeight
            }
            initialValue={itemHeight / 1.5}
            optionSelected={optionSelected}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const ListItem = ({
  item,
  setShowContextMenu,
  setItemSelected,
  setOptionSelected,
}) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>{item.text}</Text>
      <Icon
        name="options"
        factor={0.7}
        Borderless
        forceColor
        color={Colors.gray}
        onPress={() => {
          setShowContextMenu();
          setItemSelected(item);
          setOptionSelected(false);
        }}
      />
    </View>
  );
};

export default ScrollImages;

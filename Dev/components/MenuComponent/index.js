import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import Text from '../Text';
import Icon from '../Icon';
import Header from '../Header';
import ProfilePicture from '../ProfilePicture';

const width = Layout.window.width;

const styles = StyleSheet.create({
  SafeAreaView : {
    width:'100%',
    height:'100%',
    alignItems:'center',
  },
  topContainer : {
    elevation : 5,
    backgroundColor: 'white',
  },
  /**USER STYLES */
  userInfoContainer : {
    width: '100%',
    height:150,
    alignItems:'center',
    marginTop:15,
    marginBottom:10,
  },
  userName:{
    marginTop: 20,
    paddingBottom : 5,
    fontSize: 18,
    color: Colors.defaultTextColor,
  },
  camaraIcon: {
    position: 'absolute',
    top: 80,
    opacity: 0.5,
    elevation: 10,
  },

  /**MENU STYLES */
  menu: {
    width:'100%',
    height:80,
    flexDirection:'row',
    justifyContent:'center',
    borderColor: Colors.defaultTextColor,
  },
  menuItem: {
    alignItems: 'center',
    width: width /4 ,
    justifyContent:'center',
    borderWidth:0.1,
    borderColor:'white',   
    
  },
  menuText: {
    fontSize: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    color: Colors.defaultTextColor,
  },
  /**SUBMENU STYLES */
  submenuContainer :{
    overflow:'hidden',
    paddingBottom:5,
  },
  submenu: {
    width:'100%',
    height:70,
    alignItems:'center',
    paddingTop:10,
    paddingBottom:5,
    backgroundColor:Colors.defaultGrayLight
  },
  submenuItem: {
    alignItems: 'center',
    width: width / 3.5,
  },
});

function Home(props){
  const {
    user,
    personal,
    menu,
    submenu,
    seleccionMenu,
    seleccionSubMenu,
    setSeleccionMenu,
    setSeleccionSubMenu,
    goBack,
    submenuNav,
    listInView,
    children,
    celebrity,
  } = props;

  const activeColor = personal ? Colors.business : Colors.business;
  const keys = Object.keys(submenu);

  const [panelMargin, setPanelMargin] = React.useState(0);
  const scrollHeight = React.useRef(new Animated.Value(0)).current;
  const initialHeight = 150 + 150 + 15 + 10;

  const touchablePart = {
    width: '100%',
    height: initialHeight,
    marginTop: scrollHeight,
    alignSelf: 'center',
    elevation: -1,
    backgroundColor: 'white',
  };

  React.useEffect(() => {
    setSeleccionSubMenu(0);
    setSeleccionMenu(0);
  }, []);

  React.useEffect(() => {
    const valueHide = 150 + 15 + 10;
    let newValue = panelMargin;
    let duration = 500;
    if (listInView === 0) {
      newValue = -valueHide;
    } else if (listInView > 0 && panelMargin === -175) {
      newValue = -(valueHide + 63);
      duration = 375;
    } else if (listInView > 0 && listInView && panelMargin === 0) {
      newValue = -(valueHide + 63);
    }
    updateHeight(newValue, duration);
  }, [listInView]);

  const panelTouched = () => {
    const valueHide = 75 + 150 + 15 + 10;
    let newValue = panelMargin;
    if (panelMargin === 0) {
      newValue = -valueHide;
    } else {
      newValue = 0;
    }
    updateHeight(newValue);
  };

  const updateHeight = (value, duration = 500) => {
    setPanelMargin(value);
    Animated.timing(scrollHeight, {
      toValue: value,
      duration: duration,
      isInteraction: false,
      useNativeDriver: false,
    }).start();
  };

  const getName = (names, lastNames) => {
    const name = names.concat(lastNames);
    const finalName = name.filter(item => item !== '');
    return finalName.join(' ');
  };

  return(
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.topContainer}>
        {/**Header */}
        <Header goBack={()=> goBack()}/>

        {/**USER/ MENU / SUBMENU */}
        <Animated.View style={touchablePart}>
          <TouchableOpacity onPress={() => panelTouched()} activeOpacity={1}>
            <View style={styles.userInfoContainer}>

              <ProfilePicture
                linkname={user.linkname}
                size={100}
                Business={!personal}
              />

              {user.nombre !== undefined && (
                <Text style={styles.userName}>
                  {getName(user.nombre, user.apellido)}
                </Text>
              )}
              {user.nombre === undefined && (
                <Text style={styles.userName}>{''}</Text>
              )}

              <View style={styles.camaraIcon}>
                <Icon
                  name="camera"
                  size={45}
                  Borderless
                  background={'black'}
                  onPress={() => console.log}
                />
              </View>
            </View>

            <Menu
              menuItems={menu}
              seleccionMenu={seleccionMenu}
              setSeleccionMenu={setSeleccionMenu}
              setSeleccionSubMenu={setSeleccionSubMenu}
              activeColor={activeColor}
            />

            <View style={styles.submenuContainer}>
              <Submenu
                seleccionMenu={seleccionMenu}
                submenuItems={submenu[keys[seleccionMenu]] || submenu[keys[0]]}
                seleccionSubMenu={seleccionSubMenu}
                seleccionarEnSubmenu={setSeleccionSubMenu}
                submenuNav={submenuNav}
                activeColor={activeColor}
                personal={personal}
              />
            </View>      
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* CONTENT CONTAINER*/}
      <View style={{flex: 1}}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const Menu =({
  menuItems,
  seleccionMenu,
  setSeleccionMenu,
  setSeleccionSubMenu,
  activeColor,
})=>{
  return(
  <View style={styles.menu}>
    {menuItems.map((item, index) =>{
      return(
        <View 
          style={[
            styles.menuItem,
            {elevation:index === seleccionMenu ? 2 : 0}
          ]}>
          <Icon
            name={item.name}
            size={45}
            factor={0.8}
            forceColor
            color={index === seleccionMenu ? 'white': Colors.defaultTextColor}
            background={index === seleccionMenu ? activeColor : 'white'}
            onPress={() => {
              setSeleccionMenu(index);
              index !== seleccionMenu ? setSeleccionSubMenu(0) : null;
            }}/>

          <Text
            style={[
              styles.menuText
            ]}>
            {item.text}
          </Text>
        </View>
      );
    })}   
  </View>
  );
}

const Submenu  = ({
  personal,
  seleccionMenu,
  seleccionSubMenu,
  submenuItems,
  activeColor,
  seleccionarEnSubmenu,
  submenuNav,
}) => {
  const menuScroll = React.useRef(null);

  const scrollToOption = index => {
    const iconSize = width / 3.5;
    if (menuScroll) {
      setTimeout(() => {
        menuScroll.current.scrollTo({
          x: -width / 2 + (index + 1) * iconSize - iconSize / 2,
          animated: true,
        });
      }, 0);
    }
  };

  return (
    <View style={styles.submenu}>
      <ScrollView
        ref={menuScroll}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {submenuItems.map((item, index) => {
          return (
            <View style={styles.submenuItem} key={index}>
              <Icon
                name={item.name}
                size={40}
                factor={0.7}
                Borderless
                forceColor
                color={personal 
                  ? Colors.defaultGray
                  : seleccionSubMenu === index ? activeColor : Colors.defaultTextColor}
                background={personal 
                  ? seleccionSubMenu === index ? Colors.business : 'white'
                  : 'white'}
                onPress={() => {
                  scrollToOption(index);
                  if (seleccionMenu === 1 && index === 0) {
                    if(personal){
                      submenuNav(1);
                    }
                  } else if (seleccionMenu === 2 && index === 0) {
                    if (!personal) {
                      submenuNav(1);
                    } else {
                      seleccionarEnSubmenu(index);
                    }
                  } else {
                    seleccionarEnSubmenu(index);
                  }
                }}
              />
              <Text style={styles.menuText}>{item.text}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Home;

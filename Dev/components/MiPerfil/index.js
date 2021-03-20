import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Header from '../../components/Header';
import Text from '../../components/Text';
import MainMenu from '../../components/MainMenu';
import ProfilePicture from '../../components/ProfilePicture';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

const width = Layout.window.width;
const height = Layout.window.height;

import EditPicture from './EditPicture';
import EditName from './EditName';
import EditDescription from './EditDescription';
import EditLinkOrLinkname from './EditLinkOrLinkname';

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    // position: 'absolute',
    // alignSelf: 'center',
    // top: -73,
    // elevation: 0,
    backgroundColor: 'white',
    width: width,
    height: height,
    overflow: 'hidden',
  },
  /* USER STYLES */
  user: {
    height: 200,
    paddingTop: 15,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  username: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  userlink: {
    marginTop: 5,
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  userdescription: {
    marginTop: 5,
    marginRight: 25,
    marginLeft: 25,
    fontSize: 12,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  /* MENU STYLES */
  mainMenuContainer: {
    marginTop: 0,
  },
  /* SAVE NOTIFICATION STYLES */
  saveNotification: {
    width: width,
    height: 50,
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 2,
  },
  saveNotificationText: {
    fontSize: 16,
    color: 'white',
  },
});

function MiPerfil(props) {
  const menu = [
    'Foto de perfil',
    'Nombre',
    'Descripción',
    'Eslogan',
    'Link',
    'Linkname',
  ];
  const {actualizarUserInfo, personal} = props;
  const defaultUserImg = 'https://i.picsum.photos/id/660/200/200.jpg';
  const [user, setUser] = React.useState({...props.user});
  const [userImage, setUserImage] = React.useState(defaultUserImg);
  const [source, setSource] = React.useState(false);
  const [seleccionMiPerfil, setSeleccionMiPerfil] = React.useState(0);
  const [saveNotification, setSaveNotification] = React.useState(false);

  const keys = {
    descripcion: 'descripcion',
    link: 'link',
  };

  const menuPersonal = [
    {
      name: 'business_photo',
      text: menu[0],
    },
    {
      name: 'name',
      text: menu[1],
    },
    {
      name: 'unknown',
      text: menu[4],
    },
    {
      name: 'unknown',
      text: menu[5],
    },
    {
      name: 'abc',
      text: menu[2],
    },
  ];

  const menuBusiness = [
    {
      name: 'business_photo',
      text: menu[0],
    },
    {
      name: 'name',
      text: menu[1],
    },
    {
      name: 'unknown',
      text: menu[4],
    },
    {
      name: 'unknown',
      text: menu[5],
    },
    {
      name: 'abc',
      text: menu[3],
    },
  ];

  /* GO BACK */
  const goBack = () => {
    Navigation.pop(props.componentId, {
      component: {
        name: 'my-link.EditMyProfile',
      },
    });
  };

  /* SELECCIONAR OPCION DEL MENU */
  const seleccionarOpcion = seleccion => {
    setSeleccionMiPerfil(seleccion);
  };

  /* CAMBIAR PROPIEDAD PERFIL */
  const cambiarPropiedadPerfil = (text, field, index) => {
    const editName = index === 0 || index === 1;

    if (editName) {
      user[field][index] = text;
      setUser({...user});
    } else {
      user[field] = text;
      setUser({...user});
    }
  };

  const changeUserImage = uri => {
    if (uri === '') {
      setSource(false);
    } else {
      setSource(true);
      setUserImage(uri);
    }
  };

  /* GUARDAR CAMBIOS PERFIL */
  const guardar = (prop, value, value2) => {
    if (typeof prop === 'boolean') {
      actualizarUserInfo({nombre: value});
      actualizarUserInfo({apellido: value2});
    } else {
      actualizarUserInfo({[keys[prop]]: value});
    }
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 1000);
  };

  const getName = (names, lastNames) => {
    const name = names.concat(lastNames);
    const finalName = name.filter(item => item !== '');
    return finalName.join(' ');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      style={styles.mainContainer}>

      {/* HOME */}
      <Header goBack={() => goBack()} />

      {/* USER */}
      <View style={styles.user}>
        <ProfilePicture
          linkname={user.linkname}
          size={110}
          source={source ? {uri: userImage} : null}
          Business={!personal}
        />
        <Text style={styles.username}>
          {getName(user.nombre, user.apellido)}
        </Text>
        <Text style={styles.userlink}>{user.link}</Text>
        <Text style={styles.userdescription} numberOfLines={2}>
          {user.descripcion}
        </Text>
      </View>

      {/* MAIN-MENU */}
      <View style={styles.mainMenuContainer}>
        <MainMenu
          menuItems={personal ? menuPersonal : menuBusiness}
          size={45}
          totalItems={5}
          seleccion={seleccionMiPerfil}
          onPress={seleccionarOpcion}
          activeBackground={personal ? Colors.personal : Colors.business}
        />
      </View>

      {/* OPTIONS */}
      <View style={{flex: seleccionMiPerfil === 0 ? 0 : 1}}>
        {/* FOTO */}
        {seleccionMiPerfil === 0 && (
          <EditPicture
            changeUserImage={changeUserImage}
            saveChanges={guardar}
            personal={personal}
          />
        )}
        {/* NOMBRE */}
        {seleccionMiPerfil === 1 && (
          <EditName
            handleChanges={cambiarPropiedadPerfil}
            saveChanges={guardar}
            personal={personal}
            name={user.nombre.length === 1 ? [...user.nombre, ''] : user.nombre}
            lastName={user.apellido}
          />
        )}
        {/* LINK */}
        {seleccionMiPerfil === 2 && (
          <EditLinkOrLinkname
            handleChanges={cambiarPropiedadPerfil}
            saveChanges={guardar}
            personal={personal}
            link={user.link}
          />
        )}
        {/* LINKNAME */}
        {seleccionMiPerfil === 3 && (
          <EditLinkOrLinkname
            handleChanges={cambiarPropiedadPerfil}
            saveChanges={guardar}
            personal={personal}
            linkname={user.linkname}
          />
        )}
        {/* DESCRIPCION / ESLOGAN */}
        {seleccionMiPerfil === 4 && (
          <EditDescription
            handleChanges={cambiarPropiedadPerfil}
            saveChanges={guardar}
            personal={personal}
            userDescription={user.descripcion}
          />
        )}

        {saveNotification && (
          <View
            style={[
              styles.saveNotification,
              {backgroundColor: personal ? Colors.personal : Colors.business},
            ]}>
            <Text style={styles.saveNotificationText}>
              {'Cambios guardados'}
            </Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

export default MiPerfil;

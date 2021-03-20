import React from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import Header from '../../components/Header';
import UserImage from '../../components/UserImage';

import Publicaciones from '../../screens/AdmonBusiness/Publicaciones';
import Administrar from '../../screens/AdmonBusiness/Administrar';
import Informacion from '../../screens/AdmonBusiness/Informacion';
import Clientes from '../../screens/AdmonBusiness/Clientes';
import Propietario from '../../screens/AdmonBusiness/Propietario';
import Buzon from '../../screens/AdmonBusiness/Buzon';
import Configuracion from '../../screens/AdmonBusiness/Configuracion';

/* DATA */
import {businessUserResponse} from '../AdmonBusiness/Data';

const width = Layout.window.width;
const height = Layout.window.height - 63;

/* STYLES */
const styles = StyleSheet.create({
  /* ESTILOS INFO USUARIO */
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 15,
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
  /* ESTILOS MENU */
  menuItem: {
    alignItems: 'center',
    width: width / 3.5,
  },
  menuText: {
    fontSize: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    color: Colors.defaultTextColor,
    borderTopWidth: 1,
    borderColor: 'white',
  },
  /* ESTILOS SUBMENU */
  submenuContainer: {
    overflow: 'hidden',
    paddingBottom: 5,
  },
  submenu: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    elevation: 5,
    backgroundColor: 'white',
  },
  submenuItem: {
    alignItems: 'center',
    width: width / 3.5,
  },
  listHeader: {
    width: width,
  },
  listFooter: {
    width: width,
  },
});

/* MENU */
const menu = [
  {
    id: 'publicaciones',
    name: 'unknown',
    text: 'Publicaciones',
  },
  {
    id: 'administrar',
    name: 'card',
    text: 'Administrar',
  },
  {
    id: 'informacion',
    name: 'file',
    text: 'Información',
  },
  {
    id: 'clientes',
    name: 'flag',
    text: 'Clientes',
  },
  {
    id: 'propietario',
    name: 'unknown',
    text: 'Propietario',
  },
  {
    id: 'buzon',
    name: 'unknown',
    text: 'Buzón',
  },
  {
    id: 'configuracion',
    name: 'gear_tool',
    text: 'Configuración',
  },
];

/* SUBMENU */
const submenu = {
  publicaciones: [
    {
      id: 'publicaciones',
      name: 'chat_bubbles',
      text: 'Publicaciones',
    },
    {
      id: 'estados',
      name: 'statuses',
      text: 'Estados',
    },
    {
      id: 'noticias',
      name: 'unknown',
      text: 'Noticias',
    },
    {
      id: 'promociones',
      name: 'cat_brand',
      text: 'Promociones',
    },
    {
      id: 'recomendaciones',
      name: 'tip',
      text: 'Recomendaciones',
    },
    {
      id: 'alguiensabe',
      name: 'anyone_knows',
      text: 'Alguien sabe?',
    },
    {
      id: 'eventos',
      name: 'calendar',
      text: 'Eventos',
    },
    {
      id: 'cupones',
      name: 'cupon',
      text: 'Cupones',
    },
    {
      id: 'crear',
      name: 'plus',
      text: 'Crear',
    },
    {
      name: 'note',
      text: 'Borradores',
    },
    {
      name: 'timer',
      text: 'Programadas',
    },
  ],
  administrar: [
    {
      id: 'tarjeta',
      name: 'personal_card',
      text: 'Tarjeta',
    },
    {
      id: 'ra',
      name: 'ar',
      text: 'R.A',
    },
    {
      id: 'tienda',
      name: 'unknown',
      text: 'Tienda',
    },
    {
      id: 'miperfil',
      name: 'personal',
      text: 'Mi Perfil',
    },
  ],
  informacion: [
    {
      id: 'datos',
      name: 'personal_card',
      text: 'Datos',
    },
    {
      id: 'productos',
      name: 'personal_card',
      text: 'Productos',
    },
    {
      id: 'servicios',
      name: 'personal_card',
      text: 'Servicios',
    },
  ],
  clientes: [
    {
      id: 'clientes',
      name: 'flag',
      text: 'Clientes',
    },
    {
      id: 'recomendaciones',
      name: 'tip',
      text: 'Recomendaciones',
    },
    {
      id: 'top',
      name: 'top',
      text: 'Top',
    },
    {
      id: 'checkin',
      name: 'check_in',
      text: 'Check-In',
    },
    {
      id: 'distinciones',
      name: 'unknown',
      text: 'Distinciones',
    },
  ],
  propietario: [
    {
      id: 'roles',
      name: 'unknown',
      text: 'Roles',
    },
    {
      id: 'puestos',
      name: 'unknown',
      text: 'Puestos',
    },
  ],
  buzon: [
    {
      id: 'todo',
      name: 'unknown',
      text: 'Todo',
    },
    {
      id: 'masrecientes',
      name: 'unknown',
      text: 'Más Recientes',
    },
  ],
  configuracion: [
    {
      id: 'vinculacion',
      name: 'business',
      text: 'Vinculación',
    },
    // {
    //   id: 'suspender',
    //   name: 'personal',
    //   text: 'Suspender',
    // },
    // {
    //   id: 'eliminar',
    //   name: 'trash',
    //   text: 'Eliminar',
    // },
    {
      id: 'ayuda',
      name: 'ak_question',
      text: 'Ayuda',
    },
  ],
};

function Flat() {
  const [user, setUser] = React.useState({});
  const [seleccionMenu, setSeleccionMenu] = React.useState(menu[0]);
  const [seleccionSubMenu, setSeleccionSubMenu] = React.useState({});

  /* COMPONENTDIDMOUNT */
  React.useEffect(() => {
    setUser(businessUserResponse.data);
  }, []);

  React.useEffect(() => {
    const sub = submenu[seleccionMenu.id];
    setSeleccionSubMenu(sub[0]);
  }, [seleccionMenu]);

  /* ACTUALIZAR  USERINFO */
  const actualizarUserInfo = (prop, value) => {
    user[prop] = value;
    setUser({...user});
  };

  /* CONTROLAR EL BOTON DE REGRESO */
  const goBack = () => {};

  return (
    <View>
      {/* HEADER */}
      <Header goBack={goBack} />

      <View style={{height: height}}>
        <FlatList
          // horizontal
          nestedScrollEnabled={true}
          data={menu}
          initialNumToRender={10}
          ListHeaderComponent={<User user={user} />}
          ListHeaderComponentStyle={styles.listHeader}
          // renderItem={({item}) => (
          //   <MenuItem
          //     item={item}
          //     seleccionMenu={seleccionMenu}
          //     activeColor={Colors.business}
          //     seleccionarEnMenu={setSeleccionMenu}
          //   />
          // )}
          ListFooterComponent={
            <View>
              {/* MENU */}
              <Menu
                menuItems={menu}
                seleccionMenu={seleccionMenu}
                activeColor={Colors.business}
                seleccionarEnMenu={setSeleccionMenu}
              />

              <View style={{height: height}}>
                {/* SUBMENU */}
                <View style={styles.submenuContainer}>
                  <Submenu
                    submenuItems={submenu[seleccionMenu.id]}
                    seleccionSubMenu={seleccionSubMenu}
                    seleccionarEnSubmenu={setSeleccionSubMenu}
                  />
                </View>

                {/* CONTENIDO */}
                <View>
                  {/* PUBLICACIONES */}
                  {seleccionMenu.text === 'Publicaciones' && (
                    <Publicaciones seleccion={seleccionSubMenu.id} />
                  )}

                  {/* ADMINISTRAR */}
                  {seleccionMenu.text === 'Administrar' && (
                    <Administrar
                      seleccion={seleccionSubMenu.id}
                      user={user}
                      actualizarUserInfo={actualizarUserInfo}
                      administrador={'business'}
                    />
                  )}

                  {/* INFORMACION */}
                  {seleccionMenu.text === 'Información' && (
                    <Informacion seleccion={seleccionSubMenu.id} />
                  )}

                  {/* CLIENTES */}
                  {seleccionMenu.text === 'Clientes' && (
                    <Clientes seleccion={seleccionSubMenu.id} />
                  )}

                  {/* PROPIETARIO */}
                  {seleccionMenu.text === 'Propietario' && (
                    <Propietario seleccion={seleccionSubMenu.id} />
                  )}

                  {/* BUZON */}
                  {seleccionMenu.text === 'Buzón' && (
                    <Buzon user={user} seleccion={seleccionSubMenu.id} />
                  )}

                  {/* CONFIGURACION */}
                  {seleccionMenu.text === 'Configuración' && (
                    <Configuracion
                      user={user}
                      seleccion={seleccionSubMenu.id}
                    />
                  )}
                </View>
              </View>
            </View>
          }
          ListFooterComponentStyle={styles.listFooter}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const MenuItem = ({item, seleccionMenu, activeColor, seleccionarEnMenu}) => {
  return (
    <View style={styles.menuItem}>
      <Icon
        name={item.name}
        size={45}
        factor={0.8}
        Borderless
        forceColor
        color={item.text === seleccionMenu.text ? activeColor : Colors.gray}
        onPress={() => seleccionarEnMenu(item)}
      />
      <Text
        style={[
          styles.menuText,
          seleccionMenu.text === item.text
            ? {
                color: activeColor,
                borderColor: activeColor,
              }
            : null,
        ]}>
        {item.text}
      </Text>
    </View>
  );
};

const Menu = ({menuItems, seleccionMenu, activeColor, seleccionarEnMenu}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={true}>
      {menuItems.map((item, index) => {
        return (
          <View style={styles.menuItem} key={index}>
            <Icon
              name={item.name}
              size={45}
              factor={0.8}
              Borderless
              forceColor
              color={
                item.text === seleccionMenu.text ? activeColor : Colors.gray
              }
              onPress={() => seleccionarEnMenu(item)}
            />
            <Text
              style={[
                styles.menuText,
                seleccionMenu.text === item.text
                  ? {
                      color: activeColor,
                      borderColor: activeColor,
                    }
                  : null,
              ]}>
              {item.text}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const Submenu = ({seleccionSubMenu, submenuItems, seleccionarEnSubmenu}) => {
  return (
    <View style={styles.submenu}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}>
        {submenuItems.map((item, index) => {
          return (
            <View style={styles.submenuItem} key={index}>
              <Icon
                name={item.name}
                size={40}
                factor={0.7}
                forceColor
                color={seleccionSubMenu.id === item.id ? 'white' : Colors.gray}
                background={
                  seleccionSubMenu.id === item.id ? Colors.business : null
                }
                onPress={() => seleccionarEnSubmenu(item)}
              />
              <Text style={styles.menuText}>{item.text}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const User = ({user}) => {
  return (
    <View style={styles.userInfoContainer}>
      <UserImage
        userImage={user.foto}
        userSize={110}
        countryImage={`https://www.countryflags.io/${user.pais}/flat/64.png`}
        countrySize={40}
        borderRadius={10}
        left={85}
      />
      <Text style={styles.userName}>{`${user.nombre} ${
        user.apellido_paterno
      }`}</Text>
      {/* <Text style={styles.userLink}>{user.link}</Text> */}
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
  );
};

export default Flat;

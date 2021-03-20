import React from 'react';
import {View, LogBox} from 'react-native';
import {Navigation} from 'react-native-navigation';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);

import firebase from '../../../components/firebase';
import Text from '../../../components/Text';
import Loading from '../../../components/Loading';
import ErrorOrNoData from '../../../components/ErrorOrNoData';
import HomeMenu from '../../../components/HomeMenu';

import Publicaciones from '../Publicaciones';
import Administrar from '../Administrar';
import Informacion from '../Informacion';
import Clientes from '../Clientes';
import Propietario from '../Propietario';
import Buzon from '../Buzon';
import Configuracion from '../Configuracion';

import {userHelper} from '../../../helpers/API';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      userSubcollections: [],
      loading: true,
      error: null,
      seleccionMenu: 0,
      seleccionSubMenu: 0,
      listInView: false,
    };
    this.menu = [
      {
        id: 'publicaciones',
        name: 'publication',
        text: 'Publicaciones',
      },
      {
        id: 'administrar',
        name: 'business_card_details',
        text: 'Administrar',
      },
      {
        id: 'informacion',
        name: 'files',
        text: 'Información',
      },
      {
        id: 'clientes',
        name: 'personal_flag',
        text: 'Clientes',
      },
      {
        id: 'propietario',
        name: 'business_owner',
        text: 'Propietario',
      },
      {
        id: 'buzon',
        name: 'mailbox',
        text: 'Buzón',
      },
      {
        id: 'configuracion',
        name: 'gear_tool',
        text: 'Configuración',
      },
    ];
    this.submenu = {
      publicaciones: [
        {
          name: 'chat_bubbles',
          text: 'Publicaciones',
        },
        {
          name: 'statuses',
          text: 'Estados',
        },
        {
          name: 'newspaper',
          text: 'Noticias',
        },
        {
          name: 'brand',
          text: 'Promociones',
        },
        {
          name: 'tip',
          text: 'Recomendaciones',
        },
        {
          name: 'anyone_knows',
          text: 'Alguien sabe?',
        },
        {
          name: 'calendar',
          text: 'Eventos',
        },
        {
          name: 'draft_solid',
          text: 'Borradores',
        },
        {
          name: 'timer',
          text: 'Programadas',
        },
      ],
      administrar: [
        {
          name: 'business_card',
          text: 'Tarjeta',
        },
        {
          name: 'ar',
          text: 'R.A',
        },
        {
          name: 'business_profile',
          text: 'Mi Perfil',
        },
      ],
      informacion: [
        {
          id: 'datos',
          name: 'card',
          text: 'Datos',
        },
        {
          name: 'people',
          text: 'Mis galardones',
        },
        {
          id: 'productos',
          name: 'business_stock',
          text: 'Productos',
        },
        {
          id: 'servicios',
          name: 'business_services',
          text: 'Servicios',
        },
      ],
      clientes: [
        {
          id: 'clientes',
          name: 'personal_flag',
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
          name: 'check_in_mark',
          text: 'Check-In',
        },
        {
          id: 'distinciones',
          name: 'compliment_business',
          text: 'Distinciones',
        },
      ],
      propietario: [
        {
          id: 'roles',
          name: 'business_hierarchy',
          text: 'Roles',
        },
        {
          id: 'puestos',
          name: 'chair',
          text: 'Puestos',
        },
      ],
      buzon: [
        {
          id: 'misMensajes',
          name: 'mailbox',
          text: 'Mis mensajes',
        },
      ],
      configuracion: [
        {
          id: 'ayuda',
          name: 'help',
          text: 'Ayuda',
        },
        {
          id: 'vinculacion',
          name: 'business',
          text: 'Vinculación',
        },
      ],
    };

    this.setSeleccionMenu = this.setSeleccionMenu.bind(this);
    this.setSeleccionSubMenu = this.setSeleccionSubMenu.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.goToMyProfile = this.goToMyProfile.bind(this);
    this.submenuNav = this.submenuNav.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  getUserData = uid => {
    userHelper
      .getUserDataFromUID({uid: uid})
      .then(response => {
        this.setState({
          user: response.data,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false,
        });
      });
  };

  componentDidMount() {
    this.getUserData(this.props.data.ref);
  }

  setSeleccionMenu = selection => {
    this.setState({
      seleccionMenu: selection,
    });
  };

  setSeleccionSubMenu = selection => {
    this.setState({
      seleccionSubMenu: selection,
    });
  };

  /* UPDATE  USERINFO */
  updateUserInfo = updatedData => {
    userHelper
      .updateUserInfo({
        ref: this.props.data.ref,
        updatedData: updatedData,
      })
      .then(() => this.getUserData(this.props.data.ref))
      .catch(error => console.log('Error updating document: ', error));
  };

  updateListInViewOffset = newValue => {
    this.setState({listInView: newValue});
  };

  submenuNav = selection => {
    console.log('selection: ', selection);
    if (selection === 1) {
      this.goToMyProfile();
    } else if (selection === 6) {
      this.goToConf();
    }
  };

  goToMyProfile = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'my-link.EditMyProfile',
        passProps: {
          user: this.state.user,
          actualizarUserInfo: this.updateUserInfo,
          personal: false,
        },
      },
    });
  };

  goToConf = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'my-link.BusinessLinking',
        passProps: {
          user: this.state.user,
          updateListInViewOffset: this.updateListInViewOffset,
          componentId: this.props.componentId,
        },
      },
    });
  };

  goBack = () => {
    Navigation.pop(this.props.componentId, {
      component: {
        name: 'my-link.BusinessAdmin',
      },
    });
  };

  render() {
    const {
      user,
      loading,
      error,
      seleccionMenu,
      seleccionSubMenu,
      listInView,
    } = this.state;

    return (
      <View style={{height: '100%'}}>
        {loading && <Loading />}

        {error && <ErrorOrNoData title={error.title} message={error.message} />}

        {!loading && !error && (
          <HomeMenu
            user={user}
            menu={this.menu}
            submenu={this.submenu}
            seleccionMenu={seleccionMenu}
            setSeleccionMenu={this.setSeleccionMenu}
            seleccionSubMenu={seleccionSubMenu}
            setSeleccionSubMenu={this.setSeleccionSubMenu}
            submenuNav={this.submenuNav}
            goBack={this.goBack}
            listInView={listInView}>
            {/* CONTENIDO */}
            <View>
              {/* PUBLICACIONES */}
              {seleccionMenu === 0 && (
                <Publicaciones
                  seleccion={seleccionSubMenu}
                  linkname={user.linkname}
                  uid={this.props.data.ref}
                  updateListInViewOffset={this.updateListInViewOffset}
                />
              )}

              {/* ADMINISTRAR */}
              {seleccionMenu === 1 && seleccionSubMenu !== 2 && (
                <Administrar
                  seleccion={seleccionSubMenu}
                  user={user}
                  actualizarUserInfo={this.updateUserInfo}
                  administrador={'business'}
                  updateListInViewOffset={this.updateListInViewOffset}
                />
              )}

              {/* INFORMACION */}
              {seleccionMenu === 2 && (
                <Informacion
                  user={user}
                  uid={this.props.data.ref}
                  seleccion={seleccionSubMenu}
                  updateListInViewOffset={this.updateListInViewOffset}
                  componentId={this.props.componentId}
                />
              )}

              {/* CLIENTES */}
              {seleccionMenu === 3 && (
                <Clientes
                  user={user}
                  seleccion={seleccionSubMenu}
                  updateListInViewOffset={this.updateListInViewOffset}
                />
              )}

              {/* PROPIETARIO */}
              {seleccionMenu === 4 && (
                <Propietario
                  user={user}
                  seleccion={seleccionSubMenu}
                  updateListInViewOffset={this.updateListInViewOffset}
                />
              )}

              {/* BUZON */}
              {seleccionMenu === 5 && (
                <Buzon
                  user={user}
                  updateListInViewOffset={this.updateListInViewOffset}
                  componentId={this.props.componentId}
                />
              )}

              {/* CONFIGURACION */}
              {seleccionMenu === 6 && (
                <Configuracion
                  user={user}
                  seleccion={seleccionSubMenu}
                  updateListInViewOffset={this.updateListInViewOffset}
                  componentId={this.props.componentId}
                />
              )}
            </View>
          </HomeMenu>
        )}
      </View>
    );
  }
}

export default Home;

import React from 'react';
import {View, LogBox} from 'react-native';

import {Navigation} from 'react-native-navigation';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews',
]);

import HomeMenu from '../../../components/HomeMenu';
import Loading from '../../../components/Loading';
import ErrorOrNoData from '../../../components/ErrorOrNoData';

import Publicaciones from '../Publicaciones';
import Administrar from '../Administrar';
import Informacion from '../Informacion';
import Privacidad from '../Privacidad';
import Profesional from '../Profesional';
import Cumplidos from '../Cumplidos';

import {userHelper} from '../../../helpers/API';

// const {getUserDataFromUID} = userHelper;

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
        name: 'personal_card_details',
        text: 'Administrar',
      },
      {
        id: 'informacion',
        name: 'files',
        text: 'Información',
      },
      {
        id: 'privacidad',
        name: 'lock',
        text: 'Privacidad',
      },
      {
        id: 'profesional',
        name: 'certificate',
        text: 'Profesional',
      },
      {
        id: 'cumplidos',
        name: 'compliment_personal',
        text: 'Cumplidos',
      },
      {
        name: 'help',
        text: 'Ayuda',
      },
    ];
    this.submenu = {
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
        // {
        //   id: 'cupones',
        //   name: 'cupon',
        //   text: 'Cupones',
        // },
        {
          id: 'borradores',
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
          id: 'miperfil',
          name: 'personal_profile',
          text: 'Mi Perfil',
        },
        // {
        //   id: 'tienda',
        //   name: 'unknown',
        //   text: 'Tienda',
        // },
      ],
      informacion: [
        {
          id: 'misdatos',
          name: 'user_data',
          text: 'Mis datos',
        },
        {
          name: 'people',
          text: 'Mis galardones',
        },
        {
          id: 'documentos',
          name: 'folders',
          text: 'Documentos',
        },
      ],
      privacidad: [
        {
          id: 'perfiles',
          name: 'schedule',
          text: 'Perfiles',
        },
        {
          id: 'seguidores',
          name: 'followers',
          text: 'Seguidores',
        },
        {
          id: 'ajustes',
          name: 'gear_tool',
          text: 'Ajustes',
        },
      ],
      profesional: [
        {
          id: 'educacion',
          name: 'school',
          text: 'Educación',
        },
        {
          id: 'trabajo',
          name: 'business',
          text: 'Trabajo',
        },
      ],
      cumplidos: [
        {
          id: 'vercumplidos',
          name: 'compliment_personal',
          text: 'Ver cumplidos',
        },
      ],
      configuracion: [
        {
          id: 'ayuda',
          name: 'ak_question',
          text: 'Ayuda',
        },
      ],
    };

    this.setSeleccionMenu = this.setSeleccionMenu.bind(this);
    this.setSeleccionSubMenu = this.setSeleccionSubMenu.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.updateListInViewOffset = this.updateListInViewOffset.bind(this);
    this.goToMyProfile = this.goToMyProfile.bind(this);
    this.goToHelp = this.goToHelp.bind(this);
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
    this.getUserData(this.props.uid);
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
        ref: this.props.uid,
        updatedData: updatedData,
      })
      .then(() => this.getUserData(this.props.uid))
      .catch(error => console.log('Error updating document: ', error));
  };

  updateListInViewOffset = newValue => {
    this.setState({listInView: newValue});
  };

  submenuNav = selection => {
    console.log('selection: ', selection);
    if (selection === 1) {
      this.goToMyProfile();
    }
  };

  goToMyProfile = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'my-link.EditMyProfile',
        passProps: {
          user: this.state.user,
          actualizarUserInfo: this.updateUserInfo,
          personal: true,
        },
      },
    });
  };

  goToHelp = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'my-link.Help',
        passProps: {
          user: this.state.user,
          personal: true,
        },
      },
    });
  };

  goBack = () => {
    Navigation.pop(this.props.componentId, {
      component: {
        name: 'my-link.PersonalAdmin',
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
    const {componentId} = this.props;

    return (
      <View style={{height: '100%', backgroundColor: 'white'}}>
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
            goToHelp={this.goToHelp}
            goBack={this.goBack}
            personal
            listInView={listInView}>
            {/* CONTENIDO */}
            <View>
              {/* PUBLICACIONES */}
              {seleccionMenu === 0 && (
                <Publicaciones
                  seleccion={seleccionSubMenu}
                  linkname={user.linkname}
                  uid={this.props.uid}
                  updateListInViewOffset={this.updateListInViewOffset}
                />
              )}

              {/* ADMINISTRAR */}
              {seleccionMenu === 1 && seleccionSubMenu !== 2 && (
                <Administrar
                  seleccion={seleccionSubMenu}
                  user={user}
                  actualizarUserInfo={this.updateUserInfo}
                  updateListInViewOffset={this.updateListInViewOffset}
                  componentId={componentId}
                />
              )}

              {/* INFORMACION */}
              {seleccionMenu === 2 && (
                <Informacion
                  seleccion={seleccionSubMenu}
                  user={user}
                  uid={this.props.uid}
                  updateListInViewOffset={this.updateListInViewOffset}
                  componentId={componentId}
                />
              )}

              {/* PRIVACIDAD */}
              {seleccionMenu === 3 && (
                <Privacidad
                  user={user}
                  seleccion={seleccionSubMenu}
                  updateListInViewOffset={this.updateListInViewOffset}
                  componentId={componentId}
                />
              )}

              {/* PROFESIONAL */}
              {seleccionMenu === 4 && (
                <Profesional
                  seleccion={seleccionSubMenu}
                  uid={this.props.uid}
                  updateListInViewOffset={this.updateListInViewOffset}
                />
              )}

              {/* CUMPLIDOS */}
              {seleccionMenu === 5 && (
                <Cumplidos
                  seleccion={seleccionSubMenu}
                  updateListInViewOffset={this.updateListInViewOffset}
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

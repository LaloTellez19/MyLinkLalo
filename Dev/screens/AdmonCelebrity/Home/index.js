import React from 'react';
import {
    View,
    LogBox,
    StyleSheet,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);

/**COMPONENTS */
import MenuComponent from '../../../components/MenuComponent';
import Loading from '../../../components/Loading';
import ErrorOrNoData from '../../../components/ErrorOrNoData';

/**VIEWS */
import Publicaciones from '../Publicaciones';
import Administrar from '../Administrar';
import Configuracion from '../Configuracion';
import Producto from '../Producto';


/**API */
import {userHelper} from '../../../helpers/API';

const styles = StyleSheet.create({
    SafeAreaView :{
        width:'100%',
        height:'100%',
        backgroundColor:'red',
    },
});
class Home extends React.Component{  
    constructor(props) {
        super(props);
        this.state = {
            user:{},
            userSubcollections: [],
            loading :true,
            error:null,
            seleccionMenu : 0,
            seleccionSubMenu : 0,
            listInView: false,
        };
        this.menu=[
            {
              id:'publicaciones',
              name:'publication',
              text:'Publicaciones',
            },
            {
              id:'administrar',
              name:'business_card_details',
              text:'Administrar',
            },
            {
              id:'producto',
              name:'business_stock',
              text:'Producto',
            },
            {
              id:'configuracion',
              name:'gear_tool',
              text:'Configuración',
            },
            
        ];
    
        this.submenu = {
            publicaciones :[
                {
                    name:'chat_bubbles',
                    text:'Publicaciones'
                },
                {
                    name:'statuses',
                    text:'Estados'
                },
                {
                    name:'newspaper',
                    text:'Noticias',
                },
                {
                    name:'tip',
                    text:'Recomendaciones',
                },
                {
                    name:'anyone_knows',
                    text:'Alguien Sabe?',
                },
            ],
            administrar : [
                {
                    name:'business_profile',
                    text:'Perfil',
                },
                {
                    name:'files',
                    text:'Información',
                },
                {
                    name:'business_card',
                    text:'Tarjeta',
                },
            ],
            producto: [
                {
                  id: 'ayuda',
                  name: 'ak_question',
                  text: 'Producto',
                },
              ],
            configuracion: [
                {
                    name: 'help',
                    text: 'Ayuda',
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

    goBack = () => {
        Navigation.dismissOverlay(this.props.componentId);
    };

    setSeleccionMenu = selection => {
        this.setState({
          seleccionMenu: selection,
        },
            ()=>{
                console.log('Menu Numero: '+this.state.seleccionMenu);
            }
        );
    };

    setSeleccionSubMenu = selection => {
        this.setState({
          seleccionSubMenu: selection,
        },
            ()=>{
                console.log('Menu Numero: '+this.state.seleccionMenu);
            }
        );
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

    goToMyProfile = () =>{
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
    }

    goToConf = () => {
        console.log('Configurar Perfil');
    }
    render(){
        const {
           user,
           loading,
           error,
           seleccionMenu,
           seleccionSubMenu,
           listInView,
        } = this.state;
        return(
            <View style={{height:'100%'}}>
                {loading && <Loading />}

                {error && <ErrorOrNoData title={error.title} message={error.message} />}

                {!loading && !error && (
                <MenuComponent
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
                
                    {/**ALL CONTENT */}

                    <View>
                        {/**Publicaciones */}
                        {seleccionMenu === 0 &&(
                            <Publicaciones
                                seleccion={seleccionSubMenu}
                                linkname={user.linkname}
                                uid={this.props.data.ref}
                                updateListInViewOffset={this.updateListInViewOffset}
                            />
                        )}
                        {/**Administrar */}
                        {seleccionMenu === 1 &&(
                            <Administrar
                            seleccion={seleccionSubMenu}
                            user={user}
                            uid={this.props.uid}
                            updateListInViewOffset={this.updateListInViewOffset}
                          />
                        )}
                        {/* PRODUCTOS */}
                        {seleccionMenu === 2 && (
                            <Producto
                            seleccion={seleccionSubMenu}
                            updateListInViewOffset={this.updateListInViewOffset}
                            linkname={user.linkname}
                            />
                        )}
                        {/* CONFIGURACION */}
                        

                    </View>
                </MenuComponent>
                )}
            </View>
        );
    
    }
}

export default Home;
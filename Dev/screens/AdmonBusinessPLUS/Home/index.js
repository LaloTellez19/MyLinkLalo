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
import Clientes from '../Clientes';
import Publicaciones from '../Publicaciones';
import Administrar from '../Administrar';
import Negocios from '../Negocios';

/**API */
import {userHelper} from '../../../helpers/API';

/**DATA */
import {
    promocionesResponse,
    directoryInformation
} from '../../../testData/dataAdmon';

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
            selectionTop:0,
            listInView: false,
            listaPromociones: [],
            listaDirectorio: [],
            loading: true,
            error: null,
            categorySelected : false,
            list: '',
        };
        this.menu=[
            {
              id:'clientes',
              name:'personal_flag',
              text:'Clientes',
            },
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
              id:'negocios',
              name:'market',
              text:'Negocios',
            },
        ];
    
        this.submenu = {
            clientes: [
                {
                    name:'personal_flag',
                    text:'Clientes',
                },
                {
                    name:'tip',
                    text:'Recomendación' 
                },
                {
                    name:'top',
                    text:'Top',
                },
                {
                    name:'check_in_mark',
                    text:'Check-In',
                },
                {
                    name:'compliment_business',
                    text:'Distinciones',
                },
                {
                    name:'thinking_bubble',
                    text:'¿Recuerdas?',
                }
            ],
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
                    name:'brand',
                    text:'Promociones',
                },
                {
                    name:'tip',
                    text:'Recomendaciones',
                },
                {
                    name:'anyone_knows',
                    text:'Alguien Sabe?',
                },
                {
                    name:'draft_solid',
                    text:'Borradores',
                },
                {
                    name:'timer',
                    text:'Programadas',
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
            negocios : [
                {
                    name:'schedule',
                    text:'Directorio',
                },
                {
                    name:'brand_options',
                    text:'Top Promociones',
                },
                {
                    name:'top',
                    text:'Top',
                },
                {
                    name:'tip',
                    text:'Recomendaciones',
                },
                {
                    name:'squares',
                    text:'Galeria',
                },
                {
                    name:'business_services',
                    text:'Servicios',
                },
                {
                    name:'cupon',
                    text:'Cuponera',
                },
                {
                    name:'plaza',
                    text:'Mapa',
                },
            ]
        };

        this.setSeleccionMenu = this.setSeleccionMenu.bind(this);
        this.setSeleccionSubMenu = this.setSeleccionSubMenu.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.goToMyProfile = this.goToMyProfile.bind(this);
        this.submenuNav = this.submenuNav.bind(this);
        this.goBack = this.goBack.bind(this); 
        this.itemSeleccionado = this.itemSeleccionado.bind(this);
        this.getData = this.getData.bind(this);
        this.handleCategorySelection = this.handleCategorySelection.bind(this);
        this.directorioSeleccionado = this.directorioSeleccionado.bind(this);
    }

    

    getData = () =>{
        const errorGettingData = {
            title: 'Data not found',
            message: 'Try with another date or try to reload',
        };

        const response = promocionesResponse.data.promociones.junio;
    
        const responseDirectory = directoryInformation.data;

        if(response && responseDirectory){
            this.setState({
                listaPromociones: response,
                listaDirectorio: responseDirectory,
                loading: false,
                error: null,
            });
        }else{
            this.setState({
                error: errorGettingData,
                loading: false,
            });
        }
    };

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
        this.getData();
    }

    goBack = () => {
        Navigation.pop(this.props.componentId, {
          component: {
            name: 'my-link.BusinessPlusAdmin',
          },
        });
    };

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

    handleCategorySelection = item => {
        this.setState({
            categorySelected: item,
            list: this.state.listaDirectorio[item.key],
        },
        ()=>{
            console.log('Item key: '+item.key);
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

    itemSeleccionado = (seleccion) =>{
        this.setState({
            selectionTop: seleccion,
            list: this.state.listaPromociones[seleccion.key],
        },
        ()=>{
            Navigation.push(this.props.componentId,{
                component: {
                    name:'my-link.ReorganizarPromociones',
                    passProps:{
                        selectionTop: this.state.selectionTop,
                        data: this.state.listaPromociones,
                    }
                }
            })
        });
    }

    directorioSeleccionado = (seleccion) =>{
        this.setState({
            selectionTop: seleccion,
        },
        ()=>{
            console.log('SelectionTop: '+this.state.selectionTop);
            console.log('List: '+this.state.list);
            Navigation.push(this.props.componentId,{
                component: {
                    name:'my-link.ReorganizarDirectorio',
                    passProps:{
                        selectionTop: this.state.selectionTop,
                        data: this.state.list,
                        user:this.state.user,
                    }
                }
            });
        });
    }

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
           listaPromociones,
           listaDirectorio,
           list,
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
                        {/*Clientes*/}
                        {seleccionMenu === 0 &&(
                            <Clientes
                                user={user}
                                seleccion={seleccionSubMenu}
                                updateListInViewOffset={this.updateListInViewOffset}
                            />
                        )}
                        {seleccionMenu === 1 &&(
                            <Publicaciones
                                seleccion={seleccionSubMenu}
                                linkname={user.linkname}
                                uid={this.props.data.ref}
                                updateListInViewOffset={this.updateListInViewOffset}
                            />
                        )}
                        {seleccionMenu === 2 &&(
                            <Administrar
                                seleccion={seleccionSubMenu}
                                user={user}
                                uid={this.props.data.ref}
                                actualizarUserInfo={this.updateUserInfo}
                                administrador={'business'}
                                updateListInViewOffset={this.updateListInViewOffset}
                                componentId={this.props.componentId}
                          />
                        )}
                        {seleccionMenu === 3 &&(
                            <Negocios
                                seleccion={seleccionSubMenu}
                                user={user}
                                data={listaPromociones}
                                updateListInViewOffset={this.updateListInViewOffset}
                                componentId={this.props.componentId}
                                setSeleccionTop={this.itemSeleccionado}
                                handleCategorySelection={this.handleCategorySelection}
                                directorioSeleccionado={this.directorioSeleccionado}
                                list={list}
                            />
                        )}
                    </View>
                </MenuComponent>
                )}
            </View>
        );
    }
}

export default Home;
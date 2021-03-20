import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import DatePicker from '@react-native-community/datetimepicker';

import Header from '../../components/Header';
import Icon from '../../components/Icon';
import Text from '../../components/Text';
import MenuContextual from '../../components/MenuContextual';
import Search from '../../components/Search';
import CalendarioPicker from '../../components/CalendarioPicker';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

import AllCoupons from './AllCoupons';
import {ticketsResponse} from '../../testData/dataAdmon';

const width = Layout.window.width;

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:'white',
    },
    headerContainer:{
        width:'100%',
        flexDirection:'row',
    },
    buttonContainer:{
        width:'15%',
        alignItems:'center',
        justifyContent:'center',
    },
    menuContainer:{
        width:'100%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        borderBottomWidth:0.5,
    },
    submenuContainer:{
        width:width/3,
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    containerDate: {
        width: '100%',
        height: 50, 
        justifyContent: 'center', 
        alignContent: 'center', 
        alignItems: 'center',
    },
    containerSelectMenu: {
        width: '30%', 
        height: 50, 
        alignItems: 'center',
    }
});

class MisCupones extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            seleccionMenu:0,
            showContextMenu:false,
            setShowContextMenu :false,
            showCalendar:false,
            date: new Date(),
            showDate:false,
            showSearchBar:true,
            showMenu:true,
            showSeleccionMenu:false,
            showButtonOptions:true,
            subMenuSelected : '',
            itemSelection: [],
            ticketSent:[],
            ticketReceived: [],
            myTickets: [],
            error:null,
        }

        this.menu =[
            {
                name:'ticket_sent',
                text:'Enviados'
            },
            {
                name:'ticket_received',
                text:'Recibidos'
            },
            {
                name:'tickets',
                text:'Mi Cuponera'
            }
        ];

        this.couponsSent =[
            {
                title:'Hola mundo Eli',
                comment:'Prueba 1',
                color:'red',
            },
            {
                title:'Hola mundo',
                comment:'Prueba 2',
                color:'orange',
            },
            {
                title:'Hola mundo',
                comment:'Prueba 3',
                color:'yellow',
            },
            {
                title:'Hola mundo',
                comment:'Prueba 4',
                color:'green',
            },
            {
                title:'Hola mundo',
                comment:'Prueba 5',
                color:'blue',
            },
            {
                title:'Hola mundo',
                comment:'Prueba 6',
                color:'purple',
            },
            {
                title:'Hola mundo',
                comment:'Prueba 7',
                color:'red',
            },
            {
                title:'Hola mundo',
                comment:'Prueba 8',
                color:'orange',
            },
            {
                title:'Hola mundo',
                comment:'Prueba 9',
                color:'yellow',
            },
            {
                title:'Hola mundo',
                comment:'Prueba 10',
                color:'green',
            },
            {
                title:'Hola mundo',
                comment:'Prueba 11',
                color:'blue',
            },
        ];

        this.contextMenu =[
            {
                text:'Crear Nuevo',
            },
            {
                text:'Fecha',
                onPress: () => {
                  this.dateOptions(true);  
                }
            },
            {
                text:'Seleccionar',
                onPress: this.seleccionChange.bind(this),
            },
        ];

        this.contextMenu01 = [
            {
                text:'Fecha',
                onPress: () => {
                    this.dateOptions(true);  
                }
            },
            {
                text:'Seleccionar',
                onPress: this.seleccionChange.bind(this),
                
            },
        ];

        this.menuMonths = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ];

        this.setSeleccionMenu = this.setSeleccionMenu.bind(this);
        this.goBack = this.goBack.bind(this);
        this.timeChange = this.timeChange.bind(this);
        this.dateOptions = this.dateOptions.bind(this);
        this.seleccionChange =  this.seleccionChange.bind(this);
        this.inDelete = this.inDelete.bind(this);
        this.deselect = this.deselect.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    setSeleccionMenu = (selection) =>{
        this.setState({
            seleccionMenu: selection,
            showDate:false,
            showSearchBar:true,
        },()=>{
            console.log('Seleccion Menu: '+this.state.seleccionMenu);
        });
    };

    handleContextMenu = (state) =>{
        this.setState({
            showContextMenu :state,
        });
    };

    dateOptions = (status) =>{
        this.setState({
            showCalendar:status,
        });
    }

    timeChange =(event, selectedDate) =>{
        this.setState({
            date:selectedDate,
            showCalendar: false,
            showContextMenu: false,
            showDate:true,
            showSearchBar:false,
        });
    };

    seleccionChange = () =>{
        this.setState({
            showMenu:false,
            showSeleccionMenu:true,
            showButtonOptions:false,
            showContextMenu:false,
            showSearchBar:false,
            showDate:false,
        });
    };

    inDelete = () =>{
        this.setState({
            subMenuSelected:1
        });
    };

    deselect = () =>{
        this.setState({
            subMenuSelected:2,
        });
    };

    onEdit = () =>{
        this.setState({
            subMenuSelected:0,
        });
    };

    goBack = () => {
        Navigation.pop(this.props.componentId, {
            component: {
                name: 'my-link.MisCupones',
            },
        });
    };

    selectedItemFirstList = (index) =>{
        this.setState({
            itemSelection: [...this.state.itemSelection, index
        ]},()=>{
            console.log('Index: '+this.state.itemSelection)
        });
    };
    /*]getDataSearch = () => {
        const response = ticketsResponse.data;
        this.setState({
          ticketSent: response.ticketsSent,
          ticketReceived: response.ticketReceived,
          myTickets: response.myTickets,
          loading: false,
        });
    
        this.ticketSent = response.ticketsSent;
        this.ticketReceived = response.ticketReceived;
        this.myTickets = response.myTickets;
    };
    
    componentDidMountSearch() {
        this.getDataSearch();
    } */

    getData = () =>{
        const errorGettingData = {
            title:'Data not found',
            message: 'Try to reload',
        };

        const responseTicketSent = ticketsResponse.data.ticketsSent;
        const responseTicketReceived = ticketsResponse.data.ticketReceived;
        const responseMyTickets = ticketsResponse.data.myTickets;

        if(responseTicketSent){
            this.setState({
                ticketSent: responseTicketSent,  
            });
        } else{
            this.setState({
                error:errorGettingData,
            });
        }

        if(responseTicketReceived){
            this.setState({
                ticketReceived: responseTicketReceived,  
            });
        } else{
            this.setState({
                error:errorGettingData,
            });
        }

        if(responseMyTickets){
            this.setState({
                myTickets: responseMyTickets,  
            });
        } else{
            this.setState({
                error:errorGettingData,
            });
        }  
    };
    
    componentDidMount (){
        this.getData();
    }

    /* HANDLE SEARCH */
    handleSearch = rawFilter => {
        const filter = rawFilter.trim();
    
        if (filter !== '') {    
            const searchIn = this.ticketSent;
          const searchResults = searchIn.filter(
            item =>
              item.title.toLowerCase().includes(filter.toLowerCase())
          );
    
          const errorFiltering = {
            title: 'Nothing Found',
            message: 'Try with another search or try to reload',
          };

          if (searchResults.length > 0) {
              this.setState({ticketSent: searchResults}); 
          } else {
              this.setState({
                nothingFoundinFollowers: null,
              });
          }
        }
    };
    
    
    render(){
        const{
            showContextMenu,
            ticketSent,
            ticketReceived,
            myTickets,
            handleSearch,
        }= this.state;
        return(
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <View style={{width:'85%'}}>
                        <Header
                            goBack={this.goBack}/>
                    </View>
                    {this.state.showButtonOptions &&(
                        <TouchableOpacity 
                            style={styles.buttonContainer}
                            onPress={this.handleContextMenu.bind(this, true)}>
                            <Icon
                                name='options'
                                Borderless
                                factor={1}
                            />
                        </TouchableOpacity>
                    )}
                    
                </View>

                {/**MENU*/}
                {this.state.showMenu &&(
                    <View onTouchStart={this.handleContextMenu.bind(this, false)}>
                        <Menu
                            menu={this.menu}
                            setSeleccionMenu={this.setSeleccionMenu.bind(this)}
                            seleccionMenu={this.state.seleccionMenu}
                        />
                    </View>
                )}
                
                {this.state.showSeleccionMenu &&(
                    <View>
                        <SeleccionMenu
                            subMenuSelected={this.state.subMenuSelected}
                            inDelete={this.inDelete}
                            deselect={this.deselect}
                            onEdit={this.onEdit}
                            seleccionMenu={this.state.seleccionMenu}
                        />
                    </View>
                )}

                
                {/**SEARCH BAR*/}
                {this.state.showSearchBar && (
                    <View>
                        <Buscar/> 
                    </View>
                )}
                
                {/**DATE AREA*/}
                {this.state.showDate && (
                    <View style={styles.containerDate}>
                        <Text style={{fontSize: 14, color: Colors.defaultTextColor}}>
                            {this.state.date.toDateString(this)}
                        </Text>
                    </View>
                )}

                {/**COUPONS AREA */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/**CUPONES ENVIADOS*/}
                    {this.state.seleccionMenu === 0 && (      
                        <AllCoupons
                            data={ticketSent}
                            contextMenu={this.contextMenu}
                            selectedItem={this.selectedItemFirstList}
                        />  
                    )}

                    {/**CUPONES RECIBIDOS*/}
                    {this.state.seleccionMenu === 1 && (
                        <AllCoupons
                            data={ticketReceived}
                            contextMenu={this.contextMenu}
                            selectedItem={this.selectedItemFirstList}
                        />
                    )}

                    {/**MIS CUPONES*/}
                    {this.state.seleccionMenu === 2 && (
                        <AllCoupons
                            data={myTickets}
                            contextMenu={this.contextMenu}
                            selectedItem={this.selectedItemFirstList}
                        />
                    )}

                </ScrollView>
                
                {/**CALENDARIO*/}
                {this.state.showCalendar &&(
                    <DatePicker
                        testID="dateTimePicker"
                        value={this.state.date}
                        mode={'date'}
                        display="calendar"
                        minimumDate={new Date()}
                        maximumDate={new Date(2050,0,1)}
                        onChange={this.timeChange}
                    /> 
                )}

                {/**MENU CONTEXTUAL*/}     
                {showContextMenu &&(
                    <MenuContextual
                        opciones={this.state.seleccionMenu === 2 
                            ? this.contextMenu
                            : this.contextMenu01
                        }  
                    />
                )}  
            </View>
        );
    }
}

const Menu = ({
    menu,
    setSeleccionMenu,
    seleccionMenu,
}) =>{
    return(
        <View style={styles.menuContainer}>
            {menu.map((item, index) =>{
                return(
                    <View style={styles.submenuContainer}>
                        <Icon
                            name={item.name}
                            Borderless
                            factor={1}
                            forceColor
                            color={seleccionMenu === index
                                ? 'white'
                                : Colors.defaultTextColor
                            }
                            background={seleccionMenu === index
                                ? Colors.personal
                                : 'white'
                            }
                            onPress={()=>{setSeleccionMenu(index)}}
                            />
                        <Text style={{color:Colors.defaultTextColor}}>
                            {item.text}
                        </Text>
                    </View>
                );
            })}  
        </View>
    );
}

const SeleccionMenu = ({
    inDelete,
    deselect,
    subMenuSelected,
    onEdit,
    seleccionMenu,
}) =>{
    return(
        <View style={styles.menuContainer}>
            {seleccionMenu === 2 &&(
                <View style={styles.containerSelectMenu}>
                    <Icon
                        name='pencil'
                        size={30}
                        Borderless
                        factor={1}
                        onPress={onEdit}
                        background={subMenuSelected=== 0
                            ? Colors.personal
                            : 'white'
                        } 
                        forceColor
                        color={subMenuSelected === 0
                            ? 'white'
                            : Colors.defaultGray
                        }
                    />
                    <Text style={{fontSize: 12, color: Colors.defaultTextColor}}>
                        {'Editar'}
                    </Text>
             </View>
            )}
           
            <View style={styles.containerSelectMenu}>
                <Icon
                    name='trash'
                    size={30}
                    Borderless
                    factor={1}
                    onPress={inDelete}
                    background={subMenuSelected=== 1
                        ? Colors.personal
                        : 'white'
                    } 
                    forceColor
                    color={subMenuSelected === 1
                        ? 'white'
                        : Colors.defaultGray
                    }
                />
                <Text style={{fontSize: 12, color: Colors.defaultTextColor}}>
                   {'Eliminar'}
                </Text>
            </View>

            <View style={styles.containerSelectMenu}>
                <Icon
                    name= 'remove'
                    size={30}
                    Borderless
                    factor={1}
                    onPress={deselect}
                    background={subMenuSelected === 2
                        ? Colors.personal
                        : 'white'
                    } 
                    forceColor
                    color={subMenuSelected === 2
                        ? 'white'
                        : Colors.defaultGray
                    } 
                />
                <Text style={{fontSize: 12, color: Colors.defaultTextColor}}>
                    {'Deseleccionar'}
                </Text>
            </View>
        </View>
    );
}




export default MisCupones;
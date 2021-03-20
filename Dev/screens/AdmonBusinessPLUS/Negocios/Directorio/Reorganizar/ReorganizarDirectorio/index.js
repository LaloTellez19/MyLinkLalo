import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    FlatList,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import Text from '../../../../../../components/Text';
import Header from '../../../../../../components/Header';
import UserImage from '../../../../../../components/UserImage';
import Icon from '../../../../../../components/Icon';

import Categories from '../../../../../../constants/Categories';
import Colors from '../../../../../../constants/Colors';
import Layout from '../../../../../../constants/Layout';

import Galeria from './Galeria';
import Recomendaciones from './Recomendacion';
import Top from './Top';
import Promociones from './Promociones';
import Ubicacion from './Ubicacion';
import Configuracion from './Configuracion';

import {personalDataResponse} from '../../../../../../testData/dataAdmon';

import {userHelper} from '../../../../../../helpers/API';

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        flex:1,
        backgroundColor:'white'
    },
    subContainer:{
        width:'100%',
        height:500,
        alignItems:'center',
        justifyContent:'center',
    },
    profileContainer:{
        width:'100%',
        height:150,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:0.5,
        flexDirection:'row',
    },

    scheduleSubcontainer:{
        width:'100%',
        height: 50,
        flexDirection:'row',
    },
    infoContainer:{
        width:'100%',
        height:100,
        justifyContent:'center',
    },
    menuOptions:{
        width:'100%',
        height:100,
        elevation:5,
        borderBottomWidth:0.5,
        flexDirection:'row',
    },
    userContainer:{
        width:'40%',
        height:'100%',
        justifyContent:'center',
    },
    iconContainer:{
        width:'20%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    
    scheduleIconContainer:{
        width:'10%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
    },
    scheduleInfoContainer:{
        width:'60%',
        height:50,
        justifyContent:'center',
    },
    /**MENU */
    menuContainer:{
        width:'100%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
    },
    menu:{
        height: 100,
        paddingTop: 10,
        paddingBottom: 10,
        elevation: 5,
        backgroundColor: 'white',
    },
    categoriesMenuItem: {
        alignItems: 'center',
        width: 80,
    },
    categoriesMenuItemText: {
        fontSize: 9,
        color: Colors.defaultTextColor,
        marginTop: 5,
    },
});

const categories = Categories.ES_MX;
const width = Layout.window.width;
const datos = personalDataResponse.data;

class ReorganizarDirectorio extends React.Component{
    constructor(props){
        super(props);
        this.state={
            categorySelected: false,
            showAll: false,
            data: this.props.data,
            selectionTop: this.props.selectionTop,
            listInView: false,
            uid:this.props.uid,
            user:this.props.user,
            linkname: 'tybg2345',
            datos: datos,
            dataElements: [],
        };

        this.menu = [
            {
                id:'promociones',
                name:'brand',
                text:'Promociones'
            },
            {
                id:'galeria',
                name:'squares',
                text:'Galeria'
            },
            {
                id:'top',
                name:'top',
                text:'Top'
            },
            {
                id:'recomendaciones',
                name:'tip',
                text:'Recomendaciones'
            },
            {
                id:'ubicacion',
                name:'location',
                text:'Ubicacion'
            },
            {
                id:'configuracion',
                name:'gear_tool',
                text:'Configuracion'
            },
        ]

      
        this.promotions= [
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/188/200/300.jpg?hmac=zXtOB5OFoSyQezQ-b1qLr4dwQ3z1vpR-O6XAY7Dw79w',
                    valid: 'Todo el mes de Enero',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/833/200/300.jpg?hmac=b_oHYH2fuGTTRs2679QZsX0IQq4rTJaywPYnYnOGPtE',
                    valid: 'Todo el mes de Febrero',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/191/200/300.jpg?hmac=CHbfFOcICYpJ4GXstpLztK5ds_l5NYOdgHORuCEIY_g',
                    valid: 'Todo el mes de Marzo',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/605/200/300.jpg?hmac=XxO9Fq91nFhrH3zq-9AlrpU84EnKslY5CeTA_6dBlRg',
                    valid: 'Todo el mes de Abril',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/447/200/300.jpg?hmac=WubV-ZWbMgXijt9RLYedmkiaSer2IFiVD7xek928gC8',
                    valid: 'Todo el mes de Mayo',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/188/200/300.jpg?hmac=zXtOB5OFoSyQezQ-b1qLr4dwQ3z1vpR-O6XAY7Dw79w',
                    valid: 'Todo el mes de Enero',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/833/200/300.jpg?hmac=b_oHYH2fuGTTRs2679QZsX0IQq4rTJaywPYnYnOGPtE',
                    valid: 'Todo el mes de Febrero',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/191/200/300.jpg?hmac=CHbfFOcICYpJ4GXstpLztK5ds_l5NYOdgHORuCEIY_g',
                    valid: 'Todo el mes de Marzo',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/605/200/300.jpg?hmac=XxO9Fq91nFhrH3zq-9AlrpU84EnKslY5CeTA_6dBlRg',
                    valid: 'Todo el mes de Abril',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/447/200/300.jpg?hmac=WubV-ZWbMgXijt9RLYedmkiaSer2IFiVD7xek928gC8',
                    valid: 'Todo el mes de Mayo',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/188/200/300.jpg?hmac=zXtOB5OFoSyQezQ-b1qLr4dwQ3z1vpR-O6XAY7Dw79w',
                    valid: 'Todo el mes de Enero',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/833/200/300.jpg?hmac=b_oHYH2fuGTTRs2679QZsX0IQq4rTJaywPYnYnOGPtE',
                    valid: 'Todo el mes de Febrero',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/191/200/300.jpg?hmac=CHbfFOcICYpJ4GXstpLztK5ds_l5NYOdgHORuCEIY_g',
                    valid: 'Todo el mes de Marzo',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/605/200/300.jpg?hmac=XxO9Fq91nFhrH3zq-9AlrpU84EnKslY5CeTA_6dBlRg',
                    valid: 'Todo el mes de Abril',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/447/200/300.jpg?hmac=WubV-ZWbMgXijt9RLYedmkiaSer2IFiVD7xek928gC8',
                    valid: 'Todo el mes de Mayo',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/188/200/300.jpg?hmac=zXtOB5OFoSyQezQ-b1qLr4dwQ3z1vpR-O6XAY7Dw79w',
                    valid: 'Todo el mes de Enero',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/833/200/300.jpg?hmac=b_oHYH2fuGTTRs2679QZsX0IQq4rTJaywPYnYnOGPtE',
                    valid: 'Todo el mes de Febrero',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/191/200/300.jpg?hmac=CHbfFOcICYpJ4GXstpLztK5ds_l5NYOdgHORuCEIY_g',
                    valid: 'Todo el mes de Marzo',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/605/200/300.jpg?hmac=XxO9Fq91nFhrH3zq-9AlrpU84EnKslY5CeTA_6dBlRg',
                    valid: 'Todo el mes de Abril',
                },
                {
                    title: 'Festeja tu Cumpleaños',
                    img:
                    'https://i.picsum.photos/id/447/200/300.jpg?hmac=WubV-ZWbMgXijt9RLYedmkiaSer2IFiVD7xek928gC8',
                    valid: 'Todo el mes de Mayo',
                },
        ],
        

        this.contactView = new Animated.Value(50);
        this.goBack = this.goBack.bind(this);
        this.handleCategorySelection = this.handleCategorySelection.bind(this);
        this.handleShowAll = this.handleShowAll.bind(this);
        this.handleSaveChanges = this.handleSaveChanges.bind(this);
    }

    goBack = () => {
        Navigation.pop(this.props.componentId, {
          component: {
            name: 'my-link.ReorganizarDirectorio',
          },
        });
    };

    handleShowAll = show =>{
        this.setState({showAll:show});
        Animated.timing(this.contactView,{
            toValue: show ? 200 : 50,
            duration: show ? 1000 : 600,
            isInteraction: false,
            useNativeDriver: false,
        }).start();
    }


    handleCategorySelection = item => {
        this.setState({
            categorySelected: item
        },
        ()=>{
            console.log('Categoria: '+this.state.categorySelected.text);
        }); 
    };
    updateListInViewOffset = newValue => {
        this.setState({listInView: newValue});
    };



    handleSaveChanges = (index, updatedData, indexOrProp, dataToServer) => {
        if (dataToServer) {
          userHelper
            .updateUserInfo({ref: this.props.uid, updatedData: dataToServer})
            .then(() => {
              /* UPDATE LOCAL DATA */
              const newData = this.state.datos;
              const field = this.state.dataElements[index].data;
              const dataField = newData[field];
              dataField[indexOrProp] = updatedData;
    
              /* UPDATE ELEMENTS TO RENDER WHEN SOURCE KEY IS IN OBJECT*/
              const newDataElments = this.state.dataElements;
              if (newDataElments[index].source) {
                newDataElments[index].source[indexOrProp] = updatedData;
              }
              this.setState({
                data: newData,
                dataElements: newDataElments,
              });
              console.log('Success, data updated!!');
            })
            .catch(error => this.setState({error: error}));
        } else {
          /* JUST LOCAL EDITION / TEMP, NO SERVER DATA */
          /* UPDATE LOCAL DATA */
          const newData = this.state.data;
          const field = this.state.dataElements[index].data;
          const dataField = newData[field];
          dataField[indexOrProp] = updatedData;
    
          /* UPDATE ELEMENTS TO RENDER */
          const newDataElments = this.state.dataElements;
          if (newDataElments[index].source) {
            newDataElments[index].source[indexOrProp] = updatedData;
          }
          this.setState({
            datos: newData,
            dataElements: newDataElments,
          });
          console.log('Success, data updated!!, JUST LOCAL DATA');
        }
      };
      layOff= () => {
        console.log('Establecimiento suspendido');
       }
       
       inDelete = () =>{
       console.log('Establecimiento eliminado');
       }

       edit = () => {
        console.log('Edit Map');
       }
       
       save = () =>{
       console.log('Cambios guardados');
       }

    render(){
        const {
            showAll,
            data,
            selectionTop,
            user,
        } = this.state;
        
        
        return(
            <View style={styles.mainContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                <Header goBack={this.goBack}/>
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={this.props.data}
                        renderItem={({item, index}) => (       
                            <MainComponent
                                item={item}
                                index={index}
                                itemToRender={this.state.selectionTop}
                                menu={this.menu}
                                onPress={()=>{this.handleShowAll(!showAll)}}
                                handleCategorySelection={this.handleCategorySelection}
                                contactView={this.contactView}
                                setActivePromotion={this.setActivePromotion}
                            />       
                        )}
                    /> 

                <View>

                    {this.state.categorySelected.text === 'Promociones' &&(
                        <View>
                            <Promociones
                                data={this.promotions}
                                linkname={this.state.linkname}
                            />
                        </View>
                    )}
                    {this.state.categorySelected.text === 'Galeria' &&(
                       <View>
                           <Galeria/>
                       </View>
                    )}
                    {this.state.categorySelected.text === 'Top' &&(
                       <View>
                           <Top/>
                       </View>
                    )}
                    {this.state.categorySelected.text === 'Recomendaciones' &&(
                        <View>
                            <Recomendaciones/>
                        </View>
                    )}
                    {this.state.categorySelected.text === 'Ubicacion' &&(
                            <Ubicacion
                                data={datos}
                                user={user}
                                handleSaveChanges={this.handleSaveChanges}
                                edit={this.edit}
                                save={this.save}
                            />
                    )}
                    {this.state.categorySelected.text === 'Configuracion' &&(
                        <Configuracion
                        layOff={this.layOff}
                        inDelete={this.inDelete}
                     />
                    )}
                    
                </View>
                </ScrollView>
            </View>
        );
    }
}

const MainComponent = ({
    item, 
    index, 
    onPress, 
    itemToRender, 
    menu,
    handleCategorySelection,
    contactView
}) => {
    return(
        <View>
            {index=== itemToRender && (
                <View style={styles.subContainer}>
                    <View style={styles.profileContainer}>

                        <View style={styles.userContainer}>
                            <UserImage
                                borderRadius={10}
                                userSize={100}/>
                        </View>

                        <View style={styles.userContainer}>

                            <Text style={{fontSize:20}}>
                                {item.name}
                            </Text>

                            <Text style={{fontSize:15}}>
                                {'@'+item.link}
                            </Text>

                        </View>

                        <View style={styles.iconContainer}>
                            <Icon
                                name='brand'
                                factor={0.7}
                                Borderless
                                size={60}
                                forceColor
                                color='white'
                                background={Colors.business}/>
                        </View>
                    </View>

                    <Animated.View style={{height:contactView, width:'100%'}}>
                        <View style={styles.scheduleSubcontainer}>
                            <View style={styles.scheduleIconContainer}>
                                <Icon
                                    name='clock'
                                    Borderless/>
                            </View>

                            <View style={styles.scheduleInfoContainer}>
                                <Text style={{fontSize:20}}>
                                    {'Cerrado '}
                                    <Text style={{fontWeight:'bold'}}>
                                        {'abre en 4:50 hrs'}
                                    </Text>
                                </Text>
                            </View>

                            <View style={styles.scheduleIconContainer}>
                                <Icon
                                    name='arrow_down'
                                    Borderless
                                    onPress={onPress}/>
                            </View>
                        </View>

                        <View>

                        </View>
                        
                    </Animated.View>

                    <View style={styles.infoContainer}>
                        <Text style={{fontSize:20}}>
                            {item.description}
                        </Text>

                        <Text>
                            {item.information}
                        </Text>
                    </View>

                    <View style={styles.menuContainer}>
                        <Menu
                            menu={menu}
                            handleCategorySelection={handleCategorySelection}
                        />
                    </View>
                
            
                </View>
            )}
        </View>

    );
}

function  Menu (props){
    const{
       menu,
       handleCategorySelection,
    } = props;

    return(
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.menu}>
            {menu.map((item, index) =>{
                return(
                    <TouchableOpacity
                        key={index}
                        style={styles.categoriesMenuItem}
                        onPress={() => {
                            handleCategorySelection(item);
                        }}>
                         
                        <Icon
                            name={item.name}
                            factor={0.8}
                            forceColor
                            color={Colors.gray} 
                        />

                        <Text style={styles.categoriesMenuItemText}>
                           {item.text}
                        </Text>

                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}
export default ReorganizarDirectorio;
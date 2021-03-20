import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';

import Icon from '../..//Icon';

import CalendarioPicker from '../../../components/CalendarioPicker';
import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import DatePicker from '@react-native-community/datetimepicker';
const width = Layout.window.width;

const styles = StyleSheet.create({
    mainContainer:{
        width: width,
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent:'center',
    },
    subContainer:{
        width:'100%',
        backgroundColor:Colors.lighterGray,
        alignItems:'center',
        justifyContent:'center',
    },
    containerCup:{
        width: '100%',
        height:100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
    },
    TextTitle:{
        fontSize: 25,
        color: Colors.defaultTextColor,       
    },
    containerInfo:{
        width:'100%',
        height: 200,
        flexDirection:'column',
    },
    containerSubInfoText:{
        width:'90%',
        height:'30%',
        justifyContent:'center',
    },
    containerSubInfo:{
        width:'100%',
        height:'50%',
        alignItems:'center',
        justifyContent:'center',
    },
    containerinfoText:{
        width:'90%',
        height:'10%',
        justifyContent:'center',
    },
    textInfo:{
        fontSize: 18,
        color: Colors.defaultTextColor,
    },
    ingresText:{
        width:'90%',
        height:'80%',
        borderRadius:20,
        backgroundColor: 'white',
        fontSize:20,
    },
    ingresCost:{
        borderRadius:20,
        backgroundColor: 'white', 
        width: '50%',
        height:'30%',
        fontSize:30,
    },
    containerCost:{
        alignItems: 'center',
        justifyContent:'center',
        height: 200,
    },
    containerDate:{
        height: '100%',
    },
    textContainer:{
        width:'100%',
        height:100,
        alignItems:'center',
    },
    calendarContainer:{
        width:'100%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
    },
    titleCalendarContainer:{
        width:'90%',
        height:'30%',
    },
    calendarsubContainer:{
        width:'100%',
        height:'70%',
        backgroundColor:'white',
    },
    buttonSave: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: Colors.business,
        width: '25%',
        padding: 5,
    },
});

class Calend extends React.Component {
    constructor(props){
        super(props);
        this.onChangeText = this.onChangeText.bind(this);    
    }
    onChangeText = (text) => {
        if (this.props.onChangeText) {
          this.props.onChangeText(text);
        }
      };
    render() {
      return (
        <View style={{width: '100%', height: '70%', flexDirection: 'row'}}>
            <View style={{width: '80%', backgroundColor: 'white', alignContent: 'center', justifyContent: 'center'}}>
                <TextInput style={{fontSize:20, color: Colors.defaultTextColor}}
                    value={this.props.value}
                    onChangeText={this.onChangeText}
                    editable={false}/>
            </View>
            <View style={{width: '20%', backgroundColor: 'white', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                    name='arrow_down'
                    size={20}
                    factor={1}
                    forceColor
                    Borderless
                    color= {Colors.defaultTextColor}
                    onPress={this.props.onPress}/>
            </View>
            
        </View>
      );
    }
}
class AddInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            startTime: new Date().toDateString,
            endTime: new Date().toDateString,
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(),
        };
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
        this.startTimeChange = this.startTimeChange.bind(this);
        this.endTimeChange = this.endTimeChange.bind(this);
    }

    startTimeChange = (event, selectedDate) => {
        this.setState({
          startTime: selectedDate,
          datepicker_enabled: false,
        }, ()=>{
            console.log('Fecha Inicio: '+this.state.startTime);
        });
    };
    endTimeChange = (event, selectedDate) => {
        this.setState({
          endTime: selectedDate,
          datepicker_enabled1: false,
        }, ()=>{
            console.log('Fecha Termino: '+this.state.endTime);
        });
    };
    datePickerChange = (event, selectedDate) => {
        this.setState({
          datepicker_enabled: false,
          datepicker_enabled1: false,
        });
      };

    render(){
        const {startTime, endTime} = this.state;
        return(
            <View style={{flex:1, backgroundColor:Colors.grayLight}}>
                <ScrollView>
                <View style={styles.containerCup}>
                    <Text style={styles.TextTitle}>
                        {'Cuponera'}
                    </Text>
                </View>

                <View style={styles.containerInfo}>
                    <View style={styles.containerSubInfoText}>
                        <Text style={styles.textInfo}>
                            {'Opciones para obtener'}
                        </Text>
                    </View>
                    <View style={styles.containerSubInfo}>
                        <TextInput style={styles.ingresText}/>
                    </View> 
                    <View style={styles.containerinfoText}>
                        <Text style={styles.textInfo}>
                            {'¿Dónde podran obtener la cuponera los clientes?'}
                        </Text>
                    </View>
                </View>

                <View style={styles.containerCost}>
                    <TextInput
                        style={styles.ingresCost}
                        defaultValue= {'$'}
                        keyboardType={'numeric'}
                    />
                    <Text style={styles.textInfo}>¿Cuál será su costo?</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={{fontSize:20, color: Colors.defaultTextColor}}>
                        {'Fecha valida para la cuponera'}
                    </Text>
                </View>

                <View style={styles.calendarContainer}>
                    <View style={styles.titleCalendarContainer}>
                        <Text style={{fontSize:18, color: Colors.defaultTextColor}}>
                            {'Inicia'}
                        </Text>
                    </View>

                    <View style={styles.calendarsubContainer}>
                        <Calend 
                        value={this.state.startTime.toLocaleDateString()}
                        onPress={()=>{this.setState({datepicker_enabled:true})}}
                        onChangeText={(text) => {
                            this.setState({startTime: text});
                        }}
                        />
                        {this.state.datepicker_enabled &&(
                        <DatePicker
                            testID="dateTimePicker"
                            value={this.state.startTime}
                            mode={'date'}
                            display="calendar"
                            minimumDate={new Date()}
                            maximumDate={new Date(2050,0,1)}
                            onChange={this.startTimeChange}
                            
                        />
                        )}          
                    </View>
                </View>

                <View style={styles.calendarContainer}>
                    <View style={styles.titleCalendarContainer}>
                        <Text style={{fontSize:18, color: Colors.defaultTextColor}}>
                            {'Termina'}
                        </Text>
                    </View>

                    <View style={styles.calendarsubContainer}>
                    <Calend 
                        value={this.state.endTime.toLocaleDateString()}
                        onPress={()=>{this.setState({datepicker_enabled1:true})}}
                        onChangeText={(text) => {
                            this.setState({endTime: text});
                        }}
                        />
                        {this.state.datepicker_enabled1 &&(
                        <DatePicker
                            testID="dateTimePicker"
                            value={this.state.endTime}
                            mode={'date'}
                            display="calendar"
                            minimumDate={new Date()}
                            maximumDate={new Date(2050,0,1)}
                            onChange={this.endTimeChange.bind(this)}
                            
                        />
                        )}          
                       
                        
                    </View>
                </View>
                <View style={{width:'100%', height: '80%', alignItems: 'center'}}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonSave}>
                        <Text style={{fontSize: 15, color: 'white'}}>
                        Guardar
                        </Text>
                    </TouchableOpacity>
                </View>
                             
                

            </ScrollView>
                        {/**<View style={styles.subContainer}>
                            <View style={styles.containerInfo}>
                                
                            </View>
                                <Text style={styles.textInfo}>¿Dónde podrán obtener la cuponera los clientes?</Text>
                            <View style={styles.containerCost}>
                                <TextInput
                                    style={styles.ingresCost}
                                    defaultValue= {'$'}
                                    keyboardType={'numeric'}
                                />
                                <Text style={styles.textInfo}>¿Cuál será su costo?</Text>
                            </View> 
                            <View style={styles.containerDate}>      
                                <Text style={styles.textInfo}>
                                    Fecha valida para cuponera
                                </Text>
                                <Text style={{fontSize: 15}}>Inicia</Text>
                                <Text style={{fontSize: 15}}>Termina</Text>
                            </View>
                        
                            
        </View>**/}
        
            </View>
        );
    }
}
export default AddInfo;
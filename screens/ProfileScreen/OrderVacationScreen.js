import React, { Component } from 'react'
import {
    Text,
    View,
    Animated,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Platform, 
    Button
} from 'react-native'
import { Dimensions } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CircularPhoto from '../../components/CircularPhoto';
import IconSearch from '../../components/IconSearch';
import CalendarPicker from 'react-native-calendar-picker';
import Styles from '../../constants/Styles'
import VacationsView from '../../components/VacationsView';
import { Hoshi } from 'react-native-textinput-effects';



class OrderVacationScreen extends Component {

    static navigationOptions = {
        title: 'Novo Pedido',
        headerTitleStyle: {
            width: 200
        },
        headerRight: (
            <View style={{width: 120,paddingRight: 10}}>
                <Button 
                    onPress={() => alert('This is a button!')}
                    title="Guardar "
                    color="#007FB7"
                />
            </View>
            
          ),
    };

    constructor(props) {
        super(props)
        this.state={
            hg: 0,
            disp: 'none',
            selectedStartDate: null,
            selectedEndDate: null,
            clicked: false
        }
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date, type) {
        if (type === 'END_DATE') {
          this.setState({
            selectedEndDate: date,
          });
        } else {
          this.setState({
            selectedStartDate: date,
            selectedEndDate: null,
          });
        }
      }


    render() {
        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(); // Today
        const maxDate = null;
        const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';
        const iconsize = 32;
        const gap = Platform.OS === 'ios' ? (iconsize) : 10;

        return (
            /* SafeAreaView avoids the iPhone X's notch  */
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                {/* <View style={{flex: 0.5, paddingRight: 10, backgroundColor:'#e6e6e6'}}>
                    
                    <View style={{flex:1, justifyContent: 'center', flexDirection:'row'}}>
                        <View style={{flex:2.5, justifyContent: 'center'}}>
                        
                        </View>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Button title="Guardar" color="#007FB7"/>  
                        </View>
                         
                        
                    </View>  
                </View> */}
                <View style={{flex: 4, backgroundColor:'#e6e6e6', paddingTop: 10}}>
                        <CalendarPicker
                            weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
                            months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
                            previousTitle="   <   "
                            nextTitle=    "   >   "
                            startFromMonday={false}
                            allowRangeSelection={true}
                            minDate={minDate}
                            maxDate={maxDate}
                            todayBackgroundColor="gray"
                            selectedDayColor="#007FB7"
                            selectedDayTextColor="#FFFFFF"
                            onDateChange={this.onDateChange}
                        />  
                </View>

                <View style={{flex:2.5}}>
                    <ScrollView scrollEnabled={true} alwaysBounceVertical={true} overScrollMode='always' style={{paddingLeft:10, paddingRight: 10}}>
                        <View style={{marginTop:40}} />

                        <View style={{ backgroundColor: '#F9F7F6' , paddingVertical: 16}}>
                  
                            <Hoshi label={'Data de Inicio'} borderColor={'rgb(123, 173, 232)'} maskColor={'#F9F7F6'} />
                            <Hoshi label={'Data de Inicio'} borderColor={'rgb(123, 173, 232)'} maskColor={'#F9F7F6'} />
                        </View>
                         
                    </ScrollView>
                </View>
                

                
            </SafeAreaView>
        )
    }
}

export default OrderVacationScreen
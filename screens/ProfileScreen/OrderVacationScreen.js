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
    Button,
    Modal,
    TouchableHighlight,
    Alert,
    TextInput,
    KeyboardAvoidingView
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
            clicked: false,
            startDate : '',
            endDate: '',
            modalVisible: false,
            modalBackground: 'none'
        }
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date, type) {
        if (type === 'END_DATE') {
          this.setState({
            selectedEndDate: date,
            endDate: date.toString()
          });
        } else {
          this.setState({
            selectedStartDate: date,
            selectedEndDate: null,
            startDate: date.toString()
          });
        }
      }

      setModalVisible(visible) {
        this.setState({modalVisible: visible});
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
                            weekdays={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']}
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
                        <View style={{height: 10, backgroundColor: 'white'}}></View>
                        <View style={{ backgroundColor: 'white'}}>
                            <Hoshi editable={false}  label={'Data de Inicio'} value={this.state.startDate} borderColor={'rgb(123, 173, 232)'}/>
                            <Hoshi  editable={false}   label={'Data de Fim'} value={this.state.endDate} borderColor={'rgb(123, 173, 232)'}/>      
                            
                        </View>
                         
                    </ScrollView>
                </View>
                <View style={[Styles.shadowArrow,{
                    backgroundColor: '#007FB7',
                    position: 'absolute',
                    width: 60,
                    height: 60,
                    borderRadius: 60/2,
                    right: 10,
                    bottom: 10,
                    alignItems:'center',
                    justifyContent: 'center',
                    elevation: 5}]}>
                    <TouchableOpacity style={{flex: 1}} onPress={() => {this.setModalVisible(true); this.setState({modalBackground: 'flex'})}}>
   
                        <View style={{ flex: 1, alignSelf:'center', justifyContent: 'center'}}>
                            <IconSearch name='note' biblio='SimpleLineIcons' size={24} color="white"></IconSearch>
                        </View>
                            
                    </TouchableOpacity>

                    
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}>
                    <View style={{display:this.state.modalBackground ,flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}></View>
                    <View style={{borderRadius: 5, borderWidth: 3, borderColor: '#007FB7', top:'15%',left:'5%', backgroundColor:'white', position: "absolute" ,height: '40%', width:'90%'}}>
                        <View style={{flex: 1}}>
                            <View style={{flex: 1, backgroundColor: '#007FB7', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 25, color: 'white'}}>Nota de Férias</Text>
                            </View>
                            <View style={{flex: 4, backgroundColor: 'white'}}>
                            <TextInput
                                placeholder="Insira o comentário que deseja anexar ao seu pedido de férias."
                                style={{flex:1, backgroundColor:'white', margin: 5, padding: 5, borderRadius: 5, borderColor: 'lightgray', borderWidth: 2}}
                                multiline={true}
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}/>
                            </View>
                            <View style={{flex: 0.5, backgroundColor: 'white', flexDirection:'row'}}>
                                <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                    <TouchableOpacity onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                        this.setState({modalBackground: 'none'})}}>
                                        <Text style={{color: "#007FB7", fontWeight: 'bold'}}>VOLTAR</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex: 1,  justifyContent: 'center', alignItems:'center'}}>
                                    <TouchableOpacity onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                        this.setState({modalBackground: 'none'})}}>
                                        <Text style={{color: "#007FB7", fontWeight: 'bold'}}>GUARDAR</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    </Modal>
                </View>    
                
                
            </SafeAreaView>
        )
    }
}

export default OrderVacationScreen
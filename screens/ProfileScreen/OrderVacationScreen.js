import React, { Component } from 'react'
import {
    Dimensions,
    View,
    SafeAreaView,
    ScrollView,
    Platform, 
    Button,
    Alert
} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import CalendarPicker from 'react-native-calendar-picker'
import { Hoshi } from 'react-native-textinput-effects'
import ProfileService from './ProfileService';



class OrderVacationScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Novo Pedido',
            headerTitleStyle: {
                width: 200
            },
            headerRight: (
                <View style={{width: 120,paddingRight: 10}}>
                    <Button 
                        onPress={navigation.getParam('saveHandler')}
                        title="Guardar "
                        color="#007FB7"
                    />
                </View>
                
            )
        }
    };

    constructor(props) {
        super(props)
        this.state={
            disp: 'none',
            selectedStartDate: null,
            selectedStartDateFormated: null,
            selectedEndDate: null,
            selectedEndDateFormated: null,
            modalVisible: false,
            modalBackground: 'none',
            plan: this.props.navigation.getParam('plan'),
            profile: this.props.navigation.getParam('profile')
        }
        this.onDateChange = this.onDateChange.bind(this);
    }

    getHeight = () => {
        if(Platform.OS === 'ios'){ //André
            return hp('40%')
        }else{
            if(Dimensions.get('window').height > 700){ //Rafa
                return hp('48.5%')
            }else{ //João
                return hp('50%')
            }
        } 
    }

    componentDidMount(){
        this.props.navigation.setParams({saveHandler: this.saveButtonHandler})
    }

    saveButtonHandler = () => {

        if(this.state.selectedEndDate == null){
            Alert.alert('Atenção', 'Selecione uma data de Início e uma data de Fim',
            [
                {text: 'OK', onPress: () => {}}
            ],
            {cancelable: false}
            )
        }else{
            Alert.alert('Atenção', 'Deseja confirmar o seu pedido de férias?',
            [
                {text: 'Cancelar', onPress: () => {console.log("Cancelar")}},
                {text: 'OK', onPress: () => {new ProfileService().postVacationRequest(this.state.plan, this.state.selectedStartDateFormated, this.state.selectedEndDateFormated, this.state.profile.id, function(data){
                    console.log(data)
                })}}
            ],
            {cancelable: false}
            )
        }
        
    }

    onDateChange(date, type) {
        const formatedDate = new Date(date);

        if (type === 'END_DATE') {
          this.setState({
            selectedEndDate: formatedDate.toLocaleDateString(),
            selectedEndDateFormated: formatedDate
          });
        } else {
          this.setState({
            selectedStartDate: formatedDate.toLocaleDateString(),
            selectedStartDateFormated: formatedDate,
            selectedEndDate: null,
            selectedEndDateFormated: null
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
                
                <View style={{width: '100%', height: this.getHeight(), backgroundColor:'#e6e6e6', paddingTop: 10}}>
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
                            <Hoshi editable={false} label={'Data de Inicio'} value={startDate} borderColor={'rgb(123, 173, 232)'}/>
                            <Hoshi editable={false} label={'Data de Fim'} value={endDate} borderColor={'rgb(123, 173, 232)'}/>      
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default OrderVacationScreen
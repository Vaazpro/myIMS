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
import ProfileService from './ProfileService'
import * as PT from "../../constants/labels/pt_labels"



class OrderVacationScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        
        return {
            title: PT.ORDER_VACATIONS_HEADER_TITLE,
            headerTitleStyle: {
                width: 200
            },
            headerRight: (
                <View style={{width: 120,paddingRight: 10}}>
                    <Button 
                        onPress={() => navigation.state.params.saveHandler()}
                        title = {PT.ORDER_VACATIONS_BUTTON_SAVE}
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
            
            if(Dimensions.get('window').height > 700){ //André
                return hp('40%')
            }else{ // Iphone 6
                return hp('49%')
            }
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
            Alert.alert(PT.ORDER_VACATIONS_ALERT_ERROR_TITLE, PT.ORDER_VACATIONS_ALERT_ERROR_MESSAGE,
            [
                {text: 'OK', onPress: () => {}}
            ],
            {cancelable: false}
            )
        }else{
            let self = this
            Alert.alert(PT.ORDER_VACATIONS_ALERT_CONFIRMATION_TITLE, PT.ORDER_VACATIONS_ALERT_CONFIRMATION_MESSAGE,
            [
                {text: PT.ORDER_VACATIONS_ALERT_CONFIRMATION_NO, onPress: () => {console.log("Cancelar")}},
                {text: PT.ORDER_VACATIONS_ALERT_CONFIRMATION_YES, onPress: () => {
                    new ProfileService().postVacationRequest(
                        self.state.plan, 
                        self.state.selectedStartDateFormated,
                        self.state.selectedEndDateFormated, 
                        self.state.profile.id,
                        function(data){
                            console.log(data)
                        }
                    );
                    this.props.navigation.navigate("vacations")
                    }
                }
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
                        weekdays={ PT.WEEKDAYS }
                        months={ PT.MONTHS }
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
                            <Hoshi editable={false} label={PT.ORDER_VACATIONS_BEGGINING_DATE_PLACEHOLDER} value={startDate} borderColor={'rgb(123, 173, 232)'}/>
                            <Hoshi editable={false} label={PT.ORDER_VACATIONS_ENDING_DATE_PLACEHOLDER} value={endDate} borderColor={'rgb(123, 173, 232)'}/>      
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default OrderVacationScreen
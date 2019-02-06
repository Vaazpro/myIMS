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
import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles'

/** PROPS
 * navigation.getParam('plan')
 * navigation.getParam('profile')
 * goBack()
 */

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
                        color={Colors.SPARKLE_IT_MAINCOLOR}
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
        if(Platform.OS === 'ios'){
            
            if(Dimensions.get('window').height > 700){ // Large iOS
                return hp('40%')
            }else{ // Small iOS
                return hp('49%')
            }
        }else{
            if(Dimensions.get('window').height > 700){ // Large Android
                return hp('48.5%')
            }else{ // Small Android
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
                {text: PT.ORDER_VACATIONS_ALERT_CONFIRMATION_NO, onPress: () => {}},
                {text: PT.ORDER_VACATIONS_ALERT_CONFIRMATION_YES, onPress: () => {
                    console.log(self.state)
                    new ProfileService().postVacationRequest(
                        self.state.plan, 
                        self.state.selectedStartDateFormated,
                        self.state.selectedEndDateFormated, 
                        self.state.profile.id,
                        function(){
                            self.props.navigation.state.params.refreshPage()
                            //self.props.navigation.state.params.onMonthChange()
                            self.props.navigation.goBack()
                        }
                    );
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
        this.setState({modalVisible: visible})
      }


    render() {
        const { selectedStartDate, selectedEndDate } = this.state
        const minDate = new Date() // Today
        const maxDate = null
        const startDate  =  selectedStartDate ? selectedStartDate.toString() : ''
        const endDate = selectedEndDate ? selectedEndDate.toString() : ''

        return (
            /* SafeAreaView avoids the iPhone X's notch  */
            <SafeAreaView style={[Styles.flex1, {backgroundColor: Colors.SPARKLE_IT_WHITE}]}>
                
                <View style={[{height: this.getHeight()}, Styles.orderVacationsViewCalendarContainer]}>
                    <CalendarPicker
                        weekdays={ PT.WEEKDAYS }
                        months={ PT.MONTHS }
                        previousTitle="   <   "
                        nextTitle=    "   >   "
                        startFromMonday={false}
                        allowRangeSelection={true}
                        minDate={minDate}
                        maxDate={maxDate}
                        todayBackgroundColor={Colors.SPARKLE_IT_DARKGRAY}
                        selectedDayColor={Colors.SPARKLE_IT_MAINCOLOR}
                        selectedDayTextColor={Colors.SPARKLE_IT_WHITE}
                        onDateChange={this.onDateChange}
                    />  
                </View>

                <View style={{flex:2.5}}>
                    <ScrollView scrollEnabled={true} alwaysBounceVertical={true} overScrollMode='always' style={Styles.orderVacationsViewDatesContainer}>
                        <View style={[Styles.h10, {backgroundColor: Colors.SPARKLE_IT_WHITE}]}></View>
                        <View style={{ backgroundColor: Colors.WHI}}>
                            <Hoshi editable={false} label={PT.ORDER_VACATIONS_BEGGINING_DATE_PLACEHOLDER} value={startDate} borderColor={Colors.SPARKLE_IT_MAINCOLOR}/>
                            <Hoshi editable={false} label={PT.ORDER_VACATIONS_ENDING_DATE_PLACEHOLDER} value={endDate} borderColor={Colors.SPARKLE_IT_MAINCOLOR}/>      
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default OrderVacationScreen
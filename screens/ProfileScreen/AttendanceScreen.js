import React, { Component } from 'react'
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Animated,
    Platform,
    LayoutAnimation,
    ScrollView
} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import IconSearch from '../../components/IconSearch'
import { Calendar } from 'react-native-calendars'
import Styles from '../../constants/Styles'
import Colors from '../../constants/Colors'
import AttendanceView from '../../components/AttendanceView'
import ProfileService from './ProfileService'
import * as PT from "../../constants/labels/pt_labels"
import {LocaleConfig} from 'react-native-calendars'


class AttendanceScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state={
            hg: 0,
            disp: 'none',
            selectedStartDate: null,
            selectedEndDate: null,
            clicked: false,
            profile: this.props.navigation.getParam('profile'),
            attendance: [],
            absence: [],
            selectedMonth: {
                "month": new Date().getMonth() + 1,
                "year": new Date().getFullYear()
            },
            markedDates: {},
            currentList: [],
            tudo: "normal",
            faltas: "bold"
        }
        //this.onDateChange = this.onDateChange.bind(this);
        this.rotation = new Animated.Value(0);
        
        let self = this
        new ProfileService().getAttendanceByEmployeeId(this.state.profile, this.state.profile.admissionDate, function(attendance){
            self.setState({
                attendance: attendance
            })
            
            self.onMarkedDatesUpdate()
            self.showUnjustifiedList()
        })
    }

    colapse = () => {
        this.setState({
            clicked: false,
            hg: 0,
            disp: 'none'
        }) 
    }

    expand = () => {
        if(Platform.OS === 'ios'){ //André
            if(Dimensions.get('window').height > 700){ //André
                this.setState({
                    clicked: true,
                    hg: hp('43%'),
                    disp: 'flex'
                })
            }else{
                this.setState({ // Iphone 6
                    clicked: true,
                    hg: hp('53%'),
                    disp: 'flex'
                })
            }
        }else{
            if(Dimensions.get('window').height > 700){ //Rafa
                this.setState({
                    clicked: true,
                    hg: hp('49%'),
                    disp: 'flex'
                })
            }else{
                this.setState({ //João
                    clicked: true,
                    hg: hp('55%'),
                    disp: 'flex'
                })
            } 
        }
    }
    onPressBtn = () =>{
        console.log("WxH: " + Dimensions.get('window').width + "x" + Dimensions.get('window').height)
    }

    onMonthUpdate = (monthYear) => {
        var monthList = [];
        const logoImg = "http://ims-demoipvc.sparkleit.pt/"+ this.state.profile.attachmentId +".png?format=png&width=100%";
        (this.state.attendance).forEach((attendance, index) => {
            let date = new Date(attendance.date)
            if((date.getMonth()+1)==monthYear.month && date.getFullYear()==monthYear.year){
                let day = (attendance.date).slice(8,10)
                let month = (attendance.date).slice(5,7)
                let year = (attendance.date).slice(2,4)
                switch(attendance.state){
                    case 'UNJUSTIFIED':
                        monthList.push(<AttendanceView key={index} time={null} borderColor={Colors.COLOR_UNJUSTIFIED} day={day} monthYear={month + "/" + year} photo={logoImg} state={PT.ATTENDANCE_STATE_UNJUSTIFIED}></AttendanceView>)
                    break;

                    case 'JUSTIFIED': monthList.push(<AttendanceView key={index} time={null} borderColor={Colors.COLOR_JUSTIFIED} day={day} monthYear={month + "/" + year} photo={logoImg} state={PT.ATTENDANCE_STATE_JUSTIFIED}></AttendanceView>)
                    break;

                    case 'PENDING': monthList.push(<AttendanceView key={index} time={null} borderColor={Colors.COLOR_PENDING} day={day} monthYear={month + "/" + year} photo={logoImg} state={PT.ATTENDANCE_STATE_PENDING}></AttendanceView>)
                    break;

                    case 'ATTENDANCE':
                    console.log(attendance)
                    let time = attendance.attendances[0].date.split("T")
                    time = time[1].substring(0, 5)
                    console.log(time)
                    monthList.push(<AttendanceView key={index} time={time} borderColor={Colors.COLOR_ATTENDANCE} day={day} monthYear={month + "/" + year} photo={logoImg} state={PT.ATTENDANCE_STATE_ATTENDANCE}></AttendanceView>)
                    break;

                    case 'VACATION': monthList.push(<AttendanceView key={index} time={null} borderColor={Colors.COLOR_VACATION} day={day} monthYear={month + "/" + year} photo={logoImg} state={PT.ATTENDANCE_STATE_VACATION}></AttendanceView>)
                    break;

                    case 'HOLIDAY': monthList.push(<AttendanceView key={index} time={null} borderColor={Colors.COLOR_HOLIDAY} day={day} monthYear={month + "/" + year} photo={logoImg} state={PT.ATTENDANCE_STATE_HOLYDAY}></AttendanceView>)
                    break;
                }
            }
        });

        this.setState({
            currentList: monthList,
            selectedMonth: monthYear
        })
        
    }

    onMarkedDatesUpdate = () => {
        let days = {}
        this.state.attendance.forEach(attendance => {

            let date = new Date(attendance.date).toISOString("en-US").slice(0,10)
            switch(attendance.state){
                case 'UNJUSTIFIED': days[date] = {selected: true, selectedColor: Colors.COLOR_UNJUSTIFIED}
                break;

                case 'JUSTIFIED': days[date] = {marked: true, dotColor: Colors.COLOR_JUSTIFIED}
                break;

                case 'PENDING': days[date] = {marked: true, dotColor: Colors.COLOR_PENDING}
                break;

                case 'ATTENDANCE': days[date] = {marked: true, dotColor: Colors.COLOR_ATTENDANCE}
                break;

                case 'VACATION': days[date] = {marked: true, dotColor: Colors.COLOR_VACATION}
                break;

                case 'HOLIDAY': days[date] = {marked: true, dotColor: Colors.COLOR_HOLIDAY}
                break;
            }
            
        })

        this.setState({
            markedDates: days
        })
    }

    showUnjustifiedList = () => {
        var unjustifiedList = []
        const logoImg = "http://ims-demoipvc.sparkleit.pt/"+ this.state.profile.attachmentId +".png?format=png&width=100%"
        this.state.attendance.forEach((attendance, index) => {
            let day = (attendance.date).slice(8,10)
            let month = (attendance.date).slice(5,7)
            let year = (attendance.date).slice(2,4)

            if(attendance.state == 'UNJUSTIFIED'){
                unjustifiedList.push(<AttendanceView key={index} borderColor={Colors.COLOR_UNJUSTIFIED} day={day} monthYear={month + "/" + year} photo={logoImg} state={PT.ATTENDANCE_STATE_UNJUSTIFIED}></AttendanceView>)
            }
        })

            this.setState({
                currentList: unjustifiedList
            })
    }

    

    render() {
        const iconsize = 32;
        var gap = 0
         if(Platform.OS === 'ios'){
             if(Dimensions.get('window').height > 700){
                 gap = (iconsize/1.3)
             }else{
                 gap = 12 // Iphone 6
             }
         }else{
            gap = 6
         }
        /* Realizar a Animação da arrow */
        const rotate = this.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg','180deg'],
        });

        const tweak = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;

        LocaleConfig.locales['PT'] = {
            monthNames: PT.MONTHS,
            dayNamesShort: PT.WEEKDAYS
          };
          
        LocaleConfig.defaultLocale = 'PT';

        //console.log(this.state.attendance[0])

        var top = 0;

        if(Platform.OS === 'ios'){
            if(Dimensions.get('window').height > 700){
                top = Dimensions.get('window').height*0.20
            }else{
                top = Dimensions.get('window').height*0.18
            }
        }else{
            top = Dimensions.get('window').height*0.18
        }

        return (
            /* SafeAreaView avoids the iPhone X's notch  */
            <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e6e6' }}>
                <View style={{height: StatusBar.currentHeight}}></View>
                <View style={{height: Dimensions.get('window').height*0.15, paddingRight: 10, backgroundColor:'#e6e6e6'}}>
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <TouchableOpacity style={{justifyContent: 'center', alignSelf:'baseline', height:'100%', paddingLeft:5}} onPress={() => {
                            /*console.warn(Dimensions.get('window').width + 'x' + Dimensions.get('window').height)*/
                            this.props.navigation.goBack()}}>
                            <IconSearch name='cross' biblio='' color='black' size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, flexDirection: "row"}}>
                        <View style={{flex:1, justifyContent: 'center', alignItems:'flex-start', paddingLeft: 10}}>
                            <Text style={{fontSize:20}}>{PT.ATTENDANCE_HEADER_TITLE}</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: "row"}}>
                            <TouchableOpacity onPress={() => {this.onMonthUpdate(this.state.selectedMonth); this.setState({tudo: "bold", faltas: "normal"})}} style={{display: this.props.displayBtn}}>
                                <Text style={{fontWeight: this.state.tudo}}>{PT.ATTENDANCE_HEADER_BUTTON_ALL}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.showUnjustifiedList(); this.setState({tudo: "normal", faltas: "bold"})}} style={{marginLeft: 10, display: this.props.displayBtn}}>
                                <Text style={{fontWeight: this.state.faltas}}>{PT.ATTENDANCE_HEADER_BUTTON_ABSENCES}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ScrollView style={{flex: 1, backgroundColor: 'white', paddingLeft: 10, paddingRight: 10}}>
                    <View style={{height: this.state.hg + 25}}></View>
                    {/* <AttendanceView borderColor='red'></AttendanceView>
                    <AttendanceView borderColor='green'></AttendanceView>
                    <AttendanceView borderColor='orange'></AttendanceView> */}
                    {this.state.currentList}
                </ScrollView>
                    
                <View style={{
                    //top: Platform.OS === 'ios' ? Dimensions.get('window').height*0.20 : Dimensions.get('window').height*0.18,
                    top: top,
                    flex:1,
                    display: this.state.disp, 
                    backgroundColor:'#e6e6e6',
                    position: 'absolute',
                    width:'100%',
                    height: this.state.hg}}>
                    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
                        <View style={{display: this.state.disp}}>
                            <Calendar
                                // Collection of dates that have to be colored in a special way. Default = {}
                                style={{position:'relative'}}
                                markedDates={
                                    /*{   
                                        '2018-11-11': {marked: true, dotColor: 'rgb(245, 166, 35)'},
                                        '2018-11-12': {marked: true, dotColor: 'rgb(245, 166, 35)'},
                                        '2018-11-20': {selected: true, selectedColor: 'red'},
                                        '2018-12-31': {selected: true, selectedColor: 'red'},
                                        '2018-11-13': {marked: true, dotColor: 'rgb(1, 231, 13)'},
                                        '2018-11-14': {marked: true, dotColor: 'rgb(1, 231, 13)'},
                                        '2018-11-15': {marked: true, dotColor: 'rgb(1, 231, 13)'},
                                        '2018-11-16': {marked: true, dotColor: 'rgb(1, 231, 13)'},
                                        '2018-11-17': {marked: true, dotColor: 'rgb(1, 231, 13)'},
                                        '2018-11-18': {marked: true, dotColor: 'rgb(1, 231, 13)'},
                                        '2018-11-19': {marked: true, dotColor: 'rgb(1, 231, 13)'},
                                    }*/
                                    this.state.markedDates
                                    
                                    }
                                // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                                //markingType={'multi-dot'}
                                
                                // Initially visible month. Default = Date()
                                //current={'2012-03-01'}
                                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                                //minDate={'2012-05-10'}
                                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                                //maxDate={'2012-05-30'}
                                // Handler which gets executed on day press. Default = undefined
                                //onDayPress={(day) => {}}
                                // Handler which gets executed on day long press. Default = undefined
                                //onDayLongPress={(day) => {}}
                                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                                //monthFormat={'yyyy MM'}
                                // Handler which gets executed when visible month changes in calendar. Default = undefined
                                onMonthChange={(monthYear) => {this.onMonthUpdate(monthYear)}}
                                // Hide month navigation arrows. Default = false
                                hideArrows={false}
                                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                                //renderArrow={(direction) => (<Arrow />)}
                                // Do not show days of other months in month page. Default = false
                                hideExtraDays={true}
                                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                                // day from another month that is visible in calendar page. Default = false
                                disableMonthChange={false}
                                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                                //firstDay={1}
                                // Hide day names. Default = false
                                hideDayNames={false}
                                // Show week numbers to the left. Default = false
                                showWeekNumbers={false}
                                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                                onPressArrowLeft={substractMonth => substractMonth()}
                                // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                                onPressArrowRight={addMonth => addMonth()}
                                theme={{calendarBackground: '#e6e6e6', textDayFontSize: 12,}}
                                />
                            </View>
                        </SafeAreaView>
                    </View>

                <View style={[Styles.shadowArrow,{
                            flex: 1,
                            position: 'absolute',
                            width: iconsize,
                            height: iconsize,
                            borderRadius: iconsize/2,
                            left: Dimensions.get('window').width / 2 - (iconsize/2),
                            top: this.state.hg + (Dimensions.get('window').height * 0.15) + gap,
                            alignItems:'center',
                            justifyContent: 'center',
                            backgroundColor: '#e6e6e6',
                            paddingTop: 3, elevation: 5}]
                            }>
                    <Animated.View style={{transform:[{rotate}], flex: 1, alignItems:'center', justifyContent: 'center', alignSelf:'stretch'}}>
                        <TouchableOpacity style={{flex: 1}} onPress={() => {
                            if(!this.state.clicked){
                                LayoutAnimation.spring()
                                Animated.spring(this.rotation, {
                                    toValue: 1,
                                    tension: 150,
                                    friction: 5,
                                    useNativeDriver: true,
                                }).start()
                                this.expand()
                            }else{
                                LayoutAnimation.spring()
                                Animated.spring(this.rotation, {
                                    toValue: 0,
                                    tension: 150,
                                    friction: 5,
                                    useNativeDriver: true,
                                }).start()
                                this.colapse()
                                }
                            }}>
                            <IconSearch name="ios-arrow-down" biblio="Ionicons" size={iconsize} color="#007FB7"/>
                        </TouchableOpacity>
                    </Animated.View>
                </View>    
            </SafeAreaView>
        )
    }
}

export default AttendanceScreen
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
    LayoutAnimation
} from 'react-native'
import { Dimensions } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import CircularPhoto from '../../components/CircularPhoto'
import IconSearch from '../../components/IconSearch'
import { Calendar} from 'react-native-calendars'
import Styles from '../../constants/Styles'
import VacationsView from '../../components/VacationsView'
import ProfileService from './ProfileService'
import * as PT from "../../constants/labels/pt_labels"
import {LocaleConfig} from 'react-native-calendars'
import Colors from '../../constants/Colors'
import * as CONST from "../../constants/labels/constants"

class VacationScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    /** PROPS
    * navigation.getParam('profile')
    * navigation.goBack()
    * onPressBtn
    * displayBtn
    * navigation.navigate('orderVacations')
    */

    constructor(props) {
        super(props)

        this.state={
            hg: 0,
            disp: 'none',
            selectedStartDate: null,
            selectedEndDate: null,
            clicked: false,
            teams:[] ,
            profile: this.props.navigation.getParam('profile'),
            plan: {},
            vacations: {},
            markedDates: {},
            currentList: [],
            mounted: true
        }
        this.onDateChange = this.onDateChange.bind(this);
        this.rotation = new Animated.Value(0);

        let self = this;
        new ProfileService().getVacationsPlan(this.state.profile.id, function(plan){
            self.setState({
                plan: plan
            })
            
            let selfB = self
            new ProfileService().getVacations(self.state.profile.id, plan[0].dateStart, plan[0].dateEnd, plan[0].id, function(vacations){
                selfB.setState({
                    vacations: vacations
                })
                selfB.buildVacationCalendar()
                selfB.onMonthUpdate(new Date().getMonth() + 1, new Date().getFullYear())
            })
        })
    }

    componentDidMount(){
        this.setState({
            mounted: !this.state.mounted
        })
        this.expand()
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

    colapse = () => {
        this.setState({
            clicked: false,
            hg: 0,
            disp: 'none'
        }) 
    }

    expand = () => {
        if(Platform.OS === 'ios'){ 
            if(Dimensions.get('window').height > 700){ // Large iOS
                this.setState({
                    clicked: true,
                    hg: hp('45%'),
                    disp: 'flex'
                })
            }else{
                this.setState({ // Small iOS
                    clicked: true,
                    hg: hp('54%'),
                    disp: 'flex'
                })
            }
        }else{
            if(Dimensions.get('window').height > 700){ // Large Android
                this.setState({
                    clicked: true,
                    hg: hp('51%'),
                    disp: 'flex'
                })
            }else{
                this.setState({ // Small Android
                    clicked: true,
                    hg: hp('57%'),
                    disp: 'flex'
                })
            } 
        }
    }

    refreshPage = () => {
        let self = this

        new ProfileService().getVacations(this.state.profile.id, this.state.plan[0].dateStart, this.state.plan[0].dateEnd, this.state.plan[0].id, function(vacations){
            self.setState({
                vacations: vacations
            })
            self.buildVacationCalendar()
            self.onMonthUpdate(new Date().getMonth() + 1, new Date().getFullYear())
        })
    }

    buildVacationCalendar = () => {
        let days = {}
        if(this.state.vacations.vacations != undefined){
            this.state.vacations.vacations.forEach(vacation => {
                if(vacation.state !== 'REFUSED'){
                    let color = ""
                    let dateStart = new Date(vacation.dateFrom).toISOString("en-US").slice(0,10)
                    let dateEnd = new Date(vacation.dateTo).toISOString("en-US").slice(0,10)
                    var tomorrowDate = new Date(vacation.dateFrom)
                    
                    switch(vacation.state){
                        case 'PENDING':
                            color = Colors.VACATIONS_PENDING
                            break
                        case 'APPROVED':
                            color = Colors.VACATIONS_APPROVED
                            break
                        case 'TAKEN':
                            color = Colors.VACATIONS_TAKEN
                            break
                        case 'FIXED':
                            color = Colors.VACATIONS_FIXED
                            break
                    }
    
                    if(new Date(vacation.dateFrom).getTime() === new Date(vacation.dateTo).getTime()){
                        days[dateStart] = {color: color, textColor: Colors.SPARKLE_IT_WHITE, startingDay: true, endingDay: true}
                    }else{
                        days[dateStart] = {color: color, textColor: Colors.SPARKLE_IT_WHITE, startingDay: true}
                        days[dateEnd] = {color: color, textColor: Colors.SPARKLE_IT_WHITE, endingDay: true}
                        
                        tomorrowDate.setDate((tomorrowDate).getDate() + 1)
                        
                        while(tomorrowDate.getTime() < new Date(vacation.dateTo).getTime()){
                            days[tomorrowDate.toISOString("en-US").slice(0,10)] = {color: color, textColor: Colors.SPARKLE_IT_WHITE}
                            tomorrowDate.setDate((tomorrowDate).getDate() + 1)
                        }
    
                    }
                }
            })
            this.setState({
                markedDates: days
            })
        }
    }
    
    getVacationDays = (vacation) => {
        var dateFrom = new Date(vacation.dateFrom);
        var dateTo = new Date(vacation.dateTo);
        var indexDate = dateFrom
        var count = 0
        var holidaysAndFixedVac = []
        var fixedVacationIndexDate = null

        if(this.state.vacations.holidays != undefined){
            this.state.vacations.holidays.forEach(holiday => {
                if(!holidaysAndFixedVac.includes(holiday)){
                    holidaysAndFixedVac.push(holiday)
                }
            })
        }

        if(this.state.vacations.vacations != undefined){
            this.state.vacations.vacations.forEach(vact => {
                if(vact.state == "FIXED"){
                    fixedVacationIndexDate = new Date(vact.dateFrom)
                    fixedVacationToDate = new Date(vact.dateTo);
                    while(fixedVacationIndexDate.getTime() <= fixedVacationToDate.getTime()){
                        holidaysAndFixedVac.push(fixedVacationIndexDate.toDateString())
                        fixedVacationIndexDate.setDate(fixedVacationIndexDate.getDate() + 1)
                    }
                }
            })
        }

        while(indexDate.getTime() <= dateTo.getTime()){
            if(indexDate.getDay() != 0 && indexDate.getDay() != 6){
                var exists = false;
                holidaysAndFixedVac.forEach(element => {
                    var holiday = new Date(element)
                    if(holiday.toDateString() == indexDate.toDateString()){
                        exists = true
                    }
                })
                if(!exists){
                    count ++
                }
            }
            indexDate.setDate(indexDate.getDate() + 1)
        }
        return (count) 
    }


    onMonthUpdate = (month, year) => {
        var monthList = [];

        if(this.state.vacations.vacations != undefined){
            (this.state.vacations.vacations).forEach((vacation, index) => {

                let numberOfDays = this.getVacationDays(vacation)
    
                let dateFrom = new Date(vacation.dateFrom)
                let dateTo = new Date(vacation.dateTo)
                
                if(((dateFrom.getMonth()+1) == month && dateFrom.getFullYear() == year) || ((dateTo.getMonth()+1) == month && dateTo.getFullYear() == year)){
                    let startingDay = (vacation.dateFrom).slice(8,10)
                    let startingMonth = (vacation.dateFrom).slice(5,7)
                    let endingDay = (vacation.dateTo).slice(8,10)
                    let endingMonth = (vacation.dateTo).slice(5,7)
                    let months= PT.MONTHS
                    let dayText = startingDay + ' - ' + endingDay
                    let monthText = months[startingMonth - 1]
                    
                    if(numberOfDays == 1){
                        durationText = numberOfDays + PT.ORDER_VACATIONS_DAY_AUXILIARY_TEXT + numberOfDays * 8 + PT.ORDER_VACATIONS_HOURS_AUXILIARY_TEXT
                    }else{
                        durationText = numberOfDays + PT.ORDER_VACATIONS_DAYS_AUXILIARY_TEXT + numberOfDays * 8 + PT.ORDER_VACATIONS_HOURS_AUXILIARY_TEXT
                    }
                    
                    if(startingMonth !== endingMonth){
                        monthText = months[startingMonth - 1].slice(0,3) + '/' + months[endingMonth - 1].slice(0,3)
                    }
    
                    if(startingDay === endingDay){
                        dayText = startingDay
                    }
    
                    switch(vacation.state){
                        case 'APPROVED': monthList.push(<VacationsView key={index} borderColor={Colors.VACATIONS_APPROVED} monthText={monthText} startEndDays={dayText} durationText={durationText} state={PT.VACATIONS_STATE_APPROVED}></VacationsView>)
                        break;
    
                        case 'TAKEN': monthList.push(<VacationsView key={index} borderColor={Colors.VACATIONS_TAKEN} monthText={monthText} startEndDays={dayText} durationText={durationText} state={PT.VACATIONS_STATE_TAKEN}></VacationsView>)
                        break;
    
                        case 'PENDING': monthList.push(<VacationsView key={index} borderColor={Colors.VACATIONS_PENDING} monthText={monthText} startEndDays={dayText} durationText={durationText} state={PT.VACATIONS_STATE_PENDING}></VacationsView>)
                        break;
                    }
                }
            });

            this.setState({
                currentList: monthList
            })
        }
    }



    render() {
        const logoImg = CONST.URL_BEGIN + this.state.profile.attachmentId + CONST.URL_END
        const iconsize = 32
        var gap = 10
        if(Platform.OS === 'ios'){
            if(Dimensions.get('window').height > 700){
                gap = iconsize
            }
        }
        /* Realizar a Animação da arrow */
        const rotate = this.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg','180deg'],
        });

        LocaleConfig.locales['PT'] = {
            monthNames: PT.MONTHS,
            dayNamesShort: PT.WEEKDAYS
          };
          
        LocaleConfig.defaultLocale = 'PT';

        return (

            /* SafeAreaView avoids the iPhone X's notch  */
            <SafeAreaView style={[Styles.flex1, {backgroundColor: Colors.SPARKLE_IT_WHITE}]}>
                <View style={{height: StatusBar.currentHeight}}></View>
                <View style={[{height: Dimensions.get('window').height*0.15}, Styles.vacationsScreenMainHeaderContainer]}>
                    <View style={[Styles.flex1, Styles.justifyCenter]}>
                        <TouchableOpacity style={[Styles.justifyCenter, Styles.CrossButtonHolder]} onPress={() => {
                            this.props.navigation.goBack()}}>
                            <IconSearch name={CONST.ICON_NAME_CROSS} biblio={CONST.LIBRARY_0} color={Colors.SPARKLE_IT_BLACK} size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.flex1horizontal}>
                        <View style={Styles.vacationsScreenHeaderTitleBar}>
                            <Text style={Styles.font20}>{PT.VACATIONS_HEADER_TITLE}</Text>
                        </View>
                        <View style={Styles.vacationsScreenPhotoContainer}>
                            <TouchableOpacity onPress={this.props.onPressBtn} style={{display: this.props.displayBtn}}>
                                <CircularPhoto size={25} image={logoImg}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Animated.View style={{height: this.state.hg, backgroundColor: Colors.SPARKLE_IT_HEADERGRAY}}>
                    <View style={[{display: this.state.disp}, Styles.mbot10]} >
                    <Calendar
                        markedDates={this.state.markedDates}
                        markingType={'period'}
                        onMonthChange={(monthYear) => {this.onMonthUpdate(monthYear.month, monthYear.year)}}
                        hideArrows={false}
                        hideExtraDays={true}
                        disableMonthChange={false}
                        hideDayNames={false}
                        showWeekNumbers={false}
                        onPressArrowLeft={substractMonth => substractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        theme={{calendarBackground: Colors.SPARKLE_IT_HEADERGRAY, textDayFontSize: 12}}

                        // Collection of dates that have to be colored in a special way. Default = {}
                        // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                        // Initially visible month. Default = Date()
                        //current={'2012-03-01'}
                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        //minDate={'2012-05-10'}
                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        //maxDate={'2012-05-30'}
                        // Handler which gets executed on day press. Default = undefined
                        //onDayPress={(day) => {console.log('selected day', day)}}
                        // Handler which gets executed on day long press. Default = undefined
                        //onDayLongPress={(day) => {console.log('selected day', day)}}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        //monthFormat={'yyyy MM'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        // Hide month navigation arrows. Default = false
                        // Replace default arrows with custom ones (direction can be 'left' or 'right')
                        //renderArrow={(direction) => (<Arrow />)}
                        // Do not show days of other months in month page. Default = false
                        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                        // day from another month that is visible in calendar page. Default = false
                        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                        //firstDay={1}
                        // Hide day names. Default = false
                        // Show week numbers to the left. Default = false
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                        />
                    </View>
                </Animated.View>

                <View style={{flex:1}}>
                    <ScrollView scrollEnabled={true} alwaysBounceVertical={true} overScrollMode='always' style={Styles.vacationsSreenComponentContainer}>
                        <View style={Styles.mtop40} />
                        {this.state.currentList}
                    </ScrollView>
                </View>
                <View style={[Styles.shadowArrow, Styles.vacationsScreenAddButton]}>
                    <TouchableOpacity style={Styles.flex1} onPress={() => {this.props.navigation.navigate('orderVacations', {plan: this.state.plan, profile: this.state.profile, refreshPage: this.refreshPage})}}>
                        <View style={Styles.vacationsScreenAddButtonIconHolder}>
                            <IconSearch name={CONST.ICON_NAME_PLUS} biblio={CONST.LIBRARY_3} size={32} color={Colors.SPARKLE_IT_WHITE}></IconSearch>
                        </View>
                    </TouchableOpacity>
                </View>    

                <View style={[Styles.shadowArrow, Styles.vacationsScreenAnimatedArrow,{
                            paddingTop: this.state.clicked ? 0 : 3,
                            width: iconsize,
                            height: iconsize,
                            borderRadius: iconsize/2,
                            left: Dimensions.get('window').width / 2 - (iconsize/2),
                            top: this.state.hg + (Dimensions.get('window').height * 0.15) + gap}]
                }>
                    <Animated.View style={[{transform: [{rotate}]}, Styles.vacationsScreemAniatedArrow]}>
                        <TouchableOpacity style={Styles.flex1} onPress={() => {
                            if(this.state.clicked){
                                LayoutAnimation.spring()
                                Animated.spring(this.rotation, {
                                    toValue: 1,
                                    tension: 150,
                                    friction: 5,
                                    useNativeDriver: true,
                                }).start()
                                this.colapse()
                            }else{
                                LayoutAnimation.spring()
                                Animated.spring(this.rotation, {
                                    toValue: 0,
                                    tension: 150,
                                    friction: 5,
                                    useNativeDriver: true,
                                }).start()
                                this.expand()
                                }
                            }}>
                            <IconSearch name={CONST.ICON_NAME_ARROWUP} biblio={CONST.LIBRARY_2} size={iconsize} color={Colors.SPARKLE_IT_MAINCOLOR}/>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </SafeAreaView>
        )
    }
}

export default VacationScreen
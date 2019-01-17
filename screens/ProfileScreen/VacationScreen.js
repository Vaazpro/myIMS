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
import {LocaleConfig} from 'react-native-calendars';



class VacationScreen extends Component {

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
        if(Platform.OS === 'ios'){ //André
            this.setState({
                clicked: true,
                hg: hp('45%'),
                disp: 'flex'
            })
        }else{
            if(Dimensions.get('window').height > 700){ //Rafa
                this.setState({
                    clicked: true,
                    hg: hp('51%'),
                    disp: 'flex'
                })
            }else{
                this.setState({ //João
                    clicked: true,
                    hg: hp('57%'),
                    disp: 'flex'
                })
            } 
        }
    }

    buildVacationCalendar = () => {
        let days = {}
        this.state.vacations.vacations.forEach(vacation => {
            if(vacation.state !== 'REFUSED'){
                let color = ""
                let dateStart = new Date(vacation.dateFrom).toISOString("en-US").slice(0,10)
                let dateEnd = new Date(vacation.dateTo).toISOString("en-US").slice(0,10)
                let tomorrowDate = new Date()
                tomorrowDate.setDate(new Date(vacation.dateFrom).getDate() + 1)
                
                switch(vacation.state){
                    case 'PENDING':
                        color = 'rgb(245, 166, 35)'
                        break
                    case 'APPROVED':
                        color = '#96C269'
                        break
                    case 'TAKEN':
                        color = '#628DC0'
                        break
                }

                if(new Date(vacation.dateFrom).getTime() === new Date(vacation.dateTo).getTime()){
                    days[dateStart] = {color: color, textColor: 'white', startingDay: true, endingDay: true}
                }else{
                    days[dateStart] = {color: color, textColor: 'white', startingDay: true}
                    days[dateEnd] = {color: color, textColor: 'white', endingDay: true}

                    
                    while(tomorrowDate.getTime() < new Date(vacation.dateTo).getTime()){
                        days[tomorrowDate.toISOString("en-US").slice(0,10)] = {color: color, textColor: 'white'}
                        tomorrowDate.setDate((tomorrowDate).getDate() + 1)
                    }

                }
            }
        })
        this.setState({
            markedDates: days
        })
    }

    getVacationDays = (vacation) => {
        var dateFrom = new Date(vacation.dateFrom);
        var dateTo = new Date(vacation.dateTo);
        var indexDate = dateFrom
        var count = 0

        while(indexDate.getTime() <= dateTo.getTime()){
            if(indexDate.getDay() != 0 && indexDate.getDay() != 6){
                if(this.state.vacations.holidays != undefined){
                    var exists = false;
                    (this.state.vacations.holidays).forEach(element => {
                        var holiday = new Date(element)
                        if(holiday.toDateString() == indexDate.toDateString()){
                            exists = true
                        }
                    });
                    if(!exists){
                        count ++
                    }
                }else{
                    count ++
                }
                //count ++ //REMOVER ESTA LINHA QUANDO A API DER OS HOLIDAYS CERTOS
            }
            indexDate.setDate(indexDate.getDate() + 1)
        }
        return (count)
    }


    onMonthUpdate = (month, year) => {
        var monthList = [];
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
                    case 'APPROVED': monthList.push(<VacationsView key={index} borderColor='#96C269' monthText={monthText} startEndDays={dayText} durationText={durationText} state={PT.VACATIONS_STATE_APPROVED}></VacationsView>)
                    break;

                    case 'TAKEN': monthList.push(<VacationsView key={index} borderColor='#628DC0' monthText={monthText} startEndDays={dayText} durationText={durationText} state={PT.VACATIONS_STATE_TAKEN}></VacationsView>)
                    break;

                    case 'PENDING': monthList.push(<VacationsView key={index} borderColor='rgb(245, 166, 35)' monthText={monthText} startEndDays={dayText} durationText={durationText} state={PT.VACATIONS_STATE_PENDING}></VacationsView>)
                    break;
                }
            }
        });

        

        this.setState({
            currentList: monthList
        })
        
    }



    render() {
        /* console.log(this.state.vacations) */
        const logoImg = "http://ims-demoipvc.sparkleit.pt/"+ this.state.profile.attachmentId +".png?format=png&width=100%"
        const iconsize = 32;
        const gap = Platform.OS === 'ios' ? (iconsize) : 10;
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
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{height: StatusBar.currentHeight}}></View>
                <View style={{height: Dimensions.get('window').height*0.15, paddingRight: 10, backgroundColor:'#e6e6e6'}}>
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <TouchableOpacity style={{justifyContent: 'center', alignSelf:'baseline', height:'100%', paddingLeft:5}} onPress={() => {
                            //console.warn(Dimensions.get('window').width + 'x' + Dimensions.get('window').height)
                            this.props.navigation.goBack()}}>
                            <IconSearch name='cross' biblio='' color='black' size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, flexDirection: "row"}}>
                        <View style={{flex:1, justifyContent: 'center', paddingLeft: 10}}>
                            <Text style={{fontSize:20}}>{PT.VACATIONS_HEADER_TITLE}</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'flex-end', justifyContent: 'center'}}>
                            <TouchableOpacity onPress={this.props.onPressBtn} style={{display: this.props.displayBtn}}>
                                <CircularPhoto size={25} image={logoImg}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Animated.View style={{height: this.state.hg, backgroundColor:'#e6e6e6'}}>
                    <View style={{display: this.state.disp, marginBottom:10}} >
                    <Calendar

                        // Collection of dates that have to be colored in a special way. Default = {}
                        markedDates={this.state.markedDates}
                        // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                        markingType={'period'}
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
                        onMonthChange={(monthYear) => {this.onMonthUpdate(monthYear.month, monthYear.year)}}
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
                </Animated.View>

                <View style={{flex:1}}>
                    <ScrollView scrollEnabled={true} alwaysBounceVertical={true} overScrollMode='always' style={{paddingLeft:10, paddingRight: 10}}>
                        <View style={{marginTop:40}} />
                        {this.state.currentList}
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
                    <TouchableOpacity style={{flex: 1}} onPress={() => {this.props.navigation.navigate('orderVacations', {plan: this.state.plan, profile: this.state.profile})}}>
                        

                            
                                <View style={{ flex: 1, alignSelf:'center', justifyContent: 'center' }}>
                                    <IconSearch name='plus' biblio='Entypo' size={32} color="white"></IconSearch>
                                </View>
                            
                    </TouchableOpacity>
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

export default VacationScreen
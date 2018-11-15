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
    LayoutAnimation
} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IconSearch from '../../components/IconSearch'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import Styles from '../../constants/Styles'


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
            clicked: false
        }
        //this.onDateChange = this.onDateChange.bind(this);
        this.rotation = new Animated.Value(0);
    }

    colapse = () => {
        this.setState({
            clicked: false,
            hg: 0,
            disp: 'none'
        }) 
    }

    expand = () => {
        if(Platform.OS==='ios'){
            this.setState({
                clicked: true,
                hg: hp('40%'),
                disp: 'flex'
            })
        }else{
            this.setState({
                clicked: true,
                hg: hp('48%'),
                disp: 'flex'
            })
        } 
       
    }

    render() {
        const iconsize = 32;
        const gap = Platform.OS === 'ios' ? (iconsize) : 10;
        /* Realizar a Animação da arrow */
        const rotate = this.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg','180deg'],
        });

        const tweak = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;

        return (
            /* SafeAreaView avoids the iPhone X's notch  */
            <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e6e6' }}>
                <View style={{height: StatusBar.currentHeight}}></View>
                <View style={{height: Dimensions.get('window').height*0.15, paddingRight: 10, backgroundColor:'#e6e6e6'}}>
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <TouchableOpacity style={{justifyContent: 'center', alignSelf:'baseline', height:'100%', paddingLeft:5}} onPress={() => {
                            console.warn(Dimensions.get('window').width + 'x' + Dimensions.get('window').height)
                            this.props.navigation.goBack()}}>
                            <IconSearch name='cross' biblio='' color='black' size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, flexDirection: "row"}}>
                        <View style={{flex:1, justifyContent: 'center', alignItems:'flex-start', paddingLeft: 10}}>
                            <Text style={{fontSize:20}}>Férias</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: "row"}}>
                            <TouchableOpacity onPress={this.props.onPressBtn} style={{display: this.props.displayBtn}}>
                                <Text>Tudo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.onPressBtn} style={{marginLeft: 10, display: this.props.displayBtn}}>
                                <Text>Faltas</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Animated.View style={{height: this.state.hg, backgroundColor:'#e6e6e6'}}>
                    
                </Animated.View>

                <View style={{
                    flex:1,
                    display: this.state.disp, 
                    backgroundColor:'rgba(0,0,0,0.5)', 
                    position: 'absolute', 
                    width:'100%',
                    height: '80%',}}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
                    <Calendar
                        // Collection of dates that have to be colored in a special way. Default = {}
                        style={{position:'relative', top: Dimensions.get('window').height*0.15 + tweak}}
                        markedDates={
                            {   
                                '2018-11-22': {startingDay: true, color: '#007FB7', textColor: 'white'},
                                '2018-11-23': {color: '#007FB7', textColor: 'white'},
                                '2018-11-24': {color: '#007FB7', textColor: 'white'},
                                '2018-11-25': {selected: true, endingDay: true, color: '#007FB7', textColor: 'white'},
                                '2018-11-04': {disabled: true, startingDay: true, color: 'red', endingDay: true}
                            }}
                        // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                        markingType={'period'}
                        
                        // Initially visible month. Default = Date()
                        //current={'2012-03-01'}
                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        //minDate={'2012-05-10'}
                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        //maxDate={'2012-05-30'}
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => {console.log('selected day', day)}}
                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={(day) => {console.log('selected day', day)}}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        //monthFormat={'yyyy MM'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={(month) => {console.log('month changed', month)}}
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
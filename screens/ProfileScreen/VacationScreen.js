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
import CircularPhoto from '../../components/CircularPhoto';
import IconSearch from '../../components/IconSearch';
import CalendarPicker from 'react-native-calendar-picker';
import Styles from '../../constants/Styles'
import VacationsView from '../../components/VacationsView';

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
            clicked: false
        }
        this.onDateChange = this.onDateChange.bind(this);
        this.rotation = new Animated.Value(0)
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
        if(Dimensions.get('window').height < 700){
            this.setState({
                clicked: true,
                hg: (Dimensions.get('window').height*0.50),
                disp: 'flex'
            })
        }else{
            this.setState({
                clicked: true,
                hg: (Dimensions.get('window').height*0.40),
                disp: 'flex'
            })
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
        /* Realizar a Animação da arrow */
        const rotate = this.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg','180deg'],
        })

        return (
            /* SafeAreaView avoids the iPhone X's notch  */
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{height: StatusBar.currentHeight}}></View>
                <View style={{height: Dimensions.get('window').height*0.15, paddingRight: 10, backgroundColor:'#e6e6e6'}}>
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <TouchableOpacity style={{justifyContent: 'center', alignSelf:'baseline', height:'100%', paddingLeft:5}} onPress={() => {this.props.navigation.goBack()}}>
                            <IconSearch name='cross' biblio='' color='black' size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, flexDirection: "row"}}>
                        <View style={{flex:1, justifyContent: 'center', paddingLeft: 10}}>
                            <Text style={{fontSize:20}}>Férias</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'flex-end', justifyContent: 'center'}}>
                            <TouchableOpacity onPress={this.props.onPressBtn} style={{display: this.props.displayBtn}}>
                                <CircularPhoto size={25} image= 'data:image/jpeg;base64,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'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Animated.View style={{height: this.state.hg, backgroundColor:'#e6e6e6'}}>
                    <View style={{backgroundColor:'#e6e6e6', display: this.state.disp}}>
                        <CalendarPicker
                            weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
                            months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
                            previousTitle="   <   "
                            nextTitle="   >   "
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
                    
                </Animated.View>
                <View style={{flex:1}}>
                    <ScrollView scrollEnabled={true} alwaysBounceVertical={true} overScrollMode='always' style={{paddingLeft:10, paddingRight: 10}}>
                        <View style={{marginTop:40}} />
                        <VacationsView />
                        <VacationsView />
                        <VacationsView />
                        <VacationsView />
                        <VacationsView />
                    </ScrollView>
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
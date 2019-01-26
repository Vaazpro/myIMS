import React, { Component } from 'react'
import {
    TouchableOpacity,
    View,
    LayoutAnimation,
    Platform,
    Animated,
    Text
} from 'react-native'
import Styles from '../../constants/Styles'
import { Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import IconSearch from '../../components/IconSearch'
import TextIcon from '../../components/TextIcon'
import CircularPhoto from '../../components/CircularPhoto'
import * as CONST from "../../constants/labels/constants"
import * as PT from "../../constants/labels/pt_labels"
import Colors from '../../constants/Colors'
import ProfileService from './ProfileService'

class SlideScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    /** PROPS
     * prof -> profile do User
     * acc ->account do User
     * onP -> método onPress()
     */

    constructor(props) {
        super(props)
        h1 = (Dimensions.get('window').height / 4) 
        this.state={
            clicked: false,
            h: h1,
            displaystatus: 'none',
            expanded: 'none',
            profile:{},
            account: {companies:[{name:''}]},
            function: ''
        }
        this.rotation = new Animated.Value(0)
    }

    render() {
        const profile = this.props.prof
        const account = this.props.acc
        let self = this
        new ProfileService().getEmployeeFunction(this.props.prof.id, function(data){
            self.setState({
                function: data[0].name
            })
        }, 
        function(err){console.log()})

        h1 = (Dimensions.get('window').height / 4) 
        h2 = (Dimensions.get('window').height / 1.7)
        iconsize = 32
        var gap = 10
        if(Platform.OS === 'ios'){
            if(Dimensions.get('window').height > 700){ // Large iOS
                gap = iconsize
            }
        }
         
        const rotate = this.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg','180deg'],
        })

        //Calcular o número de dias desde a sua admissão
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var initialDate = new Date(profile.admissionDate);
        var endDate = new Date();

        var diffDays = Math.round(Math.abs((endDate.getTime() - initialDate.getTime())/(oneDay)));

        const months = PT.MONTHS

        const birthDate = new Date(profile.birthDate)

        const birthDay = birthDate.getDay() + PT.DATE_CONNECTOR + months[birthDate.getMonth()]
        const logoImg = CONST.URL_BEGIN + profile.attachmentId + CONST.URL_END
        const company = account.companies[0].name
        return (
            <View style={Styles.slideScreenMainContainer}>
                <View style={[Styles.slideScreenExpandableView, {marginTop: getStatusBarHeight(), height: this.state.h, width: Dimensions.get('window').width}]}>
                    <View style={[Styles.slideScreenHeadeContainer, {width: Dimensions.get('window').width}]}>
                        <View style={Styles.slideScreenHeaderInnerView}>
                            <View style={Styles.slideScreenPhotoContainer}>
                                <View style={[Styles.shadow, Styles.slideScreenPhoto]}>
                                    <CircularPhoto image={logoImg} size={100}/>
                                </View>
                            </View>                            
                            <View style={Styles.slideScreenInfoContainer}>
                                <View style={Styles.slideScreenInfoData}>
                                    <Text style={Styles.font24}>{profile.name}</Text>
                                    <Text style={Styles.font18}>{this.state.function}{/* {PT.USER_ROLE_DEVELOPER} */}</Text>
                                    <Text style={Styles.font14}>{diffDays}{PT.WORKING_DAYS_CONNECTOR}{company}</Text>
                                </View>    
                                <TouchableOpacity style={Styles.flex1} onPress={this.props.onP}>
                                    <View style={Styles.flex1}>
                                        <IconSearch style={Styles.selfRight} name={CONST.ICON_NAME_UNLOCK} biblio={CONST.LIBRARY_4} size={iconsize} color={Colors.SPARKLE_IT_DARKGRAY}/>
                                    </View>
                                </TouchableOpacity>
                            </View>           
                        </View>
                    </View>
                    <View style={{paddingHorizontal:20 ,flex: 2, width: Dimensions.get('window').width,display: this.state.expanded}}>
                        <View style={{height: 10, borderBottomColor: Colors.SPARKLE_IT_GRAY, borderBottomWidth: 1 }}></View>
                        <TextIcon name={profile.email} icon={CONST.ICON_NAME_MAIL} biblio={CONST.LIBRARY_3}></TextIcon>
                        <TextIcon name={profile.email} icon={CONST.ICON_NAME_SKYPE} biblio={CONST.LIBRARY_4}></TextIcon>
                        <TextIcon name={profile.phone} icon={CONST.ICON_NAME_PHONE} biblio={CONST.LIBRARY_4}></TextIcon>
                        <TextIcon name={(profile.sosContact ? profile.sosContact : profile.phone)} icon={CONST.ICON_NAME_MEDIC} biblio=''></TextIcon>
                        <TextIcon name={birthDay} icon={CONST.ICON_NAME_CAKE} biblio={CONST.LIBRARY_4}></TextIcon>
                        <View style={{flex: 1}}></View>
                    </View>
                </View>
                <View style={[Styles.slideScreenExpandedBackView, {height:(Dimensions.get('window').height - this.state.h), display: this.state.displaystatus}]}>
                </View>
                <View style={[Styles.shadowArrow, Styles.slideScreenAnimatedArrow, {
                    width: iconsize,
                    height: iconsize,
                    borderRadius: iconsize/2,
                    left: Dimensions.get('window').width / 2 - (iconsize/2),
                    top: this.state.h + gap,
                    }]
                    }>
                    <Animated.View style={[Styles.slideScreenAnimatedView, {transform:[{rotate}]}]}>
                        <TouchableOpacity style={Styles.flex1} onPress={() => {
                            if(!this.state.clicked){
                                LayoutAnimation.spring()
                                Animated.spring(this.rotation, {
                                    toValue: 1,
                                    tension: 150,
                                    friction: 5,
                                    useNativeDriver: true,
                                }).start()
                                this.setState({
                                    h: h2,
                                    clicked: true,
                                    displaystatus: 'flex',
                                    expanded: 'flex'
                                })
                            }else{
                                LayoutAnimation.spring()
                                Animated.spring(this.rotation, {
                                    toValue: 0,
                                    tension: 150,
                                    friction: 5,
                                    useNativeDriver: true,
                                }).start()
                                this.setState({
                                    h: h1,
                                    clicked: false,
                                    displaystatus: 'none',
                                    expanded: 'none'
                                    
                                })
                            }}}>
                            <IconSearch name={CONST.ICON_NAME_ARROWDOWN} biblio={CONST.LIBRARY_2} size={iconsize} color={Colors.SPARKLE_IT_MAINCOLOR}/>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        )
    }
}

export default SlideScreen

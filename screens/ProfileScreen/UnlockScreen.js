import React, { Component } from 'react'
import {
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    SafeAreaView
} from 'react-native'
import styles from '../../constants/Styles'
import ElevatedView from 'react-native-elevated-view'
import HeaderView from '../../components/HeaderView'
import Search from '../../components/IconSearch'
import * as PT from "../../constants/labels/pt_labels"
import * as CNST from "../../constants/labels/constants"
import ProfileService from "./ProfileService"
import * as CONST from "../../constants/labels/constants"
import Styles from '../../constants/Styles'
import Colors from '../../constants/Colors';


/** PROPS
 * navigation.getParam('profile')
 * navigation.goBack()
 */

class UnlockScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state={
            icon : CONST.ICON_NAME_LOCK_CLOSED,
            clock: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
            profile: this.props.navigation.getParam('profile')
        }

        let day = new Date();
        day.setHours(0,0,0,0);
    }
   
    playMusicAndUpdateAttendance = async () => {
        const soundObject = new Expo.Audio.Sound();
        
        try {
            await soundObject.loadAsync(require('../../assets/sounds/unlock.wav'));
            await soundObject.playAsync();
        } catch (error) {
            console.log(error)
        }

        let self = this

        navigator.geolocation.getCurrentPosition(function(pos){
            console.log("=========")
            console.log(pos.coords.latitude)
            console.log(pos.coords.longitude)
            
            if(pos.coords.latitude >= CNST.COMPANY_COORDS_MIN_LAT  && pos.coords.latitude <= CNST.COMPANY_COORDS_MAX_LAT){
                if(pos.coords.longitude <= CNST.COMPANY_COORDS_MIN_LNG && pos.coords.longitude  >= CNST.COMPANY_COORDS_MAX_LNG){
                    //SERVIÇO PARA MARCAR PRESENÇA
                    new ProfileService().updateAttendanceByProfileId(self.state.profile.id, function(data){
                        console.log(data)
                        alert(PT.COMPANY_ATTENDANCE_SUCCESS)
                    }, function(error){
                        console.log(error)
                    })
                }else{
                    alert(PT.COMPANY_ATTENDANCE_FAILURE)
                    console.log("FAILED LONG")
                }
            }else{
                alert(PT.COMPANY_ATTENDANCE_FAILURE)
                console.log("FAILED LAT")
            }
        })
        
    }

    

    render() {

        setTimeout(() => {
            this.setState({
                clock: (new Date().getHours()<10?'0'+new Date().getHours():new Date().getHours()) + ":" + (new Date().getMinutes()<10?'0'+new Date().getMinutes():new Date().getMinutes()) + ":" + (new Date().getSeconds()<10?'0'+new Date().getSeconds():new Date().getSeconds())
            })
        }, 500);
        const {navigation} = this.props
        const account = navigation.getParam('account')
        const logoImg = CONST.URL_BEGIN + this.state.profile.attachmentId + CONST.URL_END
        
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
            <SafeAreaView style={styles.container}>
                <View style={{height: StatusBar.currentHeight}}></View>
                <View style={Styles.flex2}>
                    <HeaderView txtTitle={PT.UNLOCK_HEADER_TITLE} textBtn="" display="flex" displayBtn="flex" nameIcon={CONST.ICON_NAME_CROSS} biblio={CONST.LIBRARY_0} onPressIcon={() => this.props.navigation.goBack()} onPressBtn={() => console.log()} />
                </View>
                <View style={Styles.unlockScreenTopContainer}>
                    <Image source={{uri : logoImg}} style={Styles.unlockScreenPhoto} />
                    <Text style={Styles.font24}>{this.state.profile.name}</Text>
                    <Text style={Styles.font18}>{PT.USER_ROLE_DEVELOPER}</Text>
                    <Text style={Styles.font14}>{account.companies[0].name}</Text>                                        
                </View>
                <View style={Styles.unlockScreenMiddleContainer}>
                    <Text style={Styles.font24}>{this.state.clock}</Text>
                    <Text style={Styles.font18}>{new Date().toLocaleDateString()}</Text>                                                
                </View>
                <View style={Styles.unlockScreenBottomContainer}>
                <TouchableOpacity style={Styles.unlockScreenLoginButtonContainer} onPress={() => {this.setState({icon: CONST.ICON_NAME_LOCK_OPEN}); this.playMusicAndUpdateAttendance() }}>
                    <ElevatedView elevation={5} style={Styles.unlockScreenLoginButton}> 
                        <View style={Styles.unlockScreenIconHoler}>
                            <Search name={this.state.icon} biblio={CONST.LIBRARY_4} size={100} color={Colors.SPARKLE_IT_MAINCOLOR}></Search>
                        </View>
                    </ElevatedView>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

export default UnlockScreen
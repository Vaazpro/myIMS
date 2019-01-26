import React, { Component } from 'react'
import {
    View,
    StatusBar,
    NativeModules,
    SafeAreaView
} from 'react-native'
import InitialOptions from './InitialOptions'
import SlideScreen from './SlideScreen'
import ProfileService from './ProfileService'
import Styles from '../../constants/Styles'

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)


class ProfileScreen extends Component{
    static navigationOptions = {
        header: null,
    };

    /** PROPS
     * navigation.navigate('unlock')
     * navigation.navigate('teams')
     * navigation.navigate('vacations')
     * navigation.navigate('attendances')
     */

    constructor(props) {
        super(props)
        
        this.state={
            profile:{},
            account: {companies:[{name:''}]},
            teams: [],
            controler: false
        }

        let self = this
        new ProfileService().getProfile(function(profile){
            self.setState({
                profile: profile
            })
         })
         new ProfileService().getAccount(function(account){
             self.setState({
                 account: account
             })
         })
    }

    unlockPressedHandler = () => {
        this.props.navigation.navigate('unlock', {profile: this.state.profile, account: this.state.account });
      };
    TeamsPressedHandler = () => {
        this.props.navigation.navigate('teams', {profile: this.state.profile, account: this.state.account });
    };
    VacationsPressedHandler = () => {
        this.props.navigation.navigate('vacations', {profile: this.state.profile, account: this.state.account });
    }

    AttendancesPressedHandler = () => {
        this.props.navigation.navigate('attendances', {profile: this.state.profile, account: this.state.account });
    }

    render() {
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
                <SafeAreaView style={Styles.container}>
                    {/* StatusBar.currentHeight avoids the StatusBar to overlap our screen */}
                    <View style={{height: StatusBar.currentHeight}}></View>
                    
                    <View style={Styles.flex1}>

                    </View>

                    <View style={[Styles.flex2, { elevation:0}]}>
                        <InitialOptions prof={this.state.profile} teamsP= {this.TeamsPressedHandler} vacationsP={this.VacationsPressedHandler} attendancesP={this.AttendancesPressedHandler}/>
                    </View>

                    <View style={{flex: 1}}>
                    
                    </View>
                    <SlideScreen onP={this.unlockPressedHandler} acc={this.state.account} prof={this.state.profile}/>
                    
                </SafeAreaView>
        )
    }
}

export default ProfileScreen

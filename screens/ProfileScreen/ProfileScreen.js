import React, { Component } from 'react'
import {
    View,
    StatusBar,
    NativeModules,
    SafeAreaView
} from 'react-native'
import InitialOptions from './InitialOptions'
import SlideScreen from './SlideScreen'
import styles from '../../constants/Styles'
import ProfileService from './ProfileService'

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)


class ProfileScreen extends Component{
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        
        this.state={
            profile:{},
            account: {companies:[{name:''}]},
            teams: []
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
        this.props.navigation.navigate('vacations');
    }

    AttendancesPressedHandler = () => {
        this.props.navigation.navigate('attendances');
    }
    

    render() {
        this.self = this
        new ProfileService().getTeamsByEmployeeId(this.state.profile.id,function(teams){
            ola.setState({
                teams: teams
            }) 
         })
         console.log("==========================")
         console.log(this.state.teams)
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
                <SafeAreaView style={styles.container}>
                    {/* StatusBar.currentHeight avoids the StatusBar to overlap our screen */}
                    <View style={{height: StatusBar.currentHeight}}></View>
                    
                    <View style={{flex: 1}}>

                    </View>

                    <View style={{flex: 2, elevation:0}}>
                        <InitialOptions teamsNum={this.state.teams.length} teamsP= {this.TeamsPressedHandler} vacationsP={this.VacationsPressedHandler} attendancesP={this.AttendancesPressedHandler}/>
                    </View>

                    <View style={{flex: 1}}>
                    
                    </View>
                    <SlideScreen onP={this.unlockPressedHandler} acc={this.state.account} prof={this.state.profile}/>
                    
                </SafeAreaView>
        )
    }
}

export default ProfileScreen

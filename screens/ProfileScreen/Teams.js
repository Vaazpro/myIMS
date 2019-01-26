import React, { Component } from 'react'
import {
    ScrollView,
    StatusBar,
    SafeAreaView,
    View,
    Platform
} from 'react-native'
import styles from '../../constants/Styles'
import TeamView from '../../components/TeamView'
import ProfileService from './ProfileService'
import * as PT from "../../constants/labels/pt_labels"
import * as CONST from "../../constants/labels/constants"
import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles';

class Teams extends Component {

    static navigationOptions = {
        title: PT.TEAMS_HEADER_TITLE,
        headerTitleStyle: {
            flex:1
        }
    };
    
    /** PROPS
     * navigation.getParam('profile')
     */

    constructor(props) {
        super(props)
        this.state={
            teams:[] ,
            profile: this.props.navigation.getParam('profile')
        }
       
        let self = this
        new ProfileService().getTeamsByEmployeeId(this.state.profile.id,function(teams){
            self.setState({
                teams: teams
            })
         })
        
    }

    render() {
        const gap = Platform.OS === 'ios' ? 20 : 0;
        var teamsList = []
        this.state.teams.forEach((team, index) => {
            teamsList.push(
                <TeamView key={index} iconName={CONST.ICON_NAME_TRAIN} iconBiblio={CONST.LIBRARY_5} iconSize={20} iconColor={Colors.SPARKLE_IT_BLACK} txt= {team.name} employees={team.employees} icon={team.icon}>
                </TeamView>
            )
        })
        
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
            <SafeAreaView style={styles.container}>
                <View style={{height: StatusBar.currentHeight}}></View>
                <ScrollView style={Styles.teamsComponentContainer}>
                    <View style={{height:gap}}></View>
                    {teamsList}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default Teams
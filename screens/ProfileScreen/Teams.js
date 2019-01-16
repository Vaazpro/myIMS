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

class Teams extends Component {

    static navigationOptions = {
        title: PT.TEAMS_HEADER_TITLE,
        headerTitleStyle: {
            flex:1
        }
    };
    
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
                <TeamView key={index} iconName= 'train' iconBiblio='MaterialIcons' iconSize={20} iconColor='black' txt= {team.name} employees={team.employees} icon={team.icon}>
                </TeamView>
            )
        })
        
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
                <SafeAreaView style={styles.container}>
                    <View style={{height: StatusBar.currentHeight}}></View>
                    
                    <ScrollView style={{flex: 1, paddingLeft:10, paddingRight:10}}>
                        <View style={{height:gap}}></View>

                        {teamsList}
                    </ScrollView>
                </SafeAreaView>
        )
    }
}

export default Teams
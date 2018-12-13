import React, { Component } from 'react'
import {
    View
} from 'react-native'
import styles from '../../constants/Styles'
import ButtonInitialOptions from './ButtonInitialOptions'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import ProfileService from './ProfileService'


class InitialOptions extends Component {
    static navigationOptions = {
        header: null,
    };


    constructor (props){
        super(props)
        this.state={
            teams : [],
            gotInfo : false
        }
        
    }

        


    render() {
        
        if(!this.state.gotInfo){
            let self = this
            new ProfileService().getTeamsByEmployeeId(this.props.prof.id, function(teams){
                self.setState({
                    teams: teams,
                    gotInfo : true
                }) 
            })
        }
        
        return (
            <View style={{flex:1, alignItems:'center', marginTop: getStatusBarHeight()}}>
                <View style={ styles.row }>
                    <ButtonInitialOptions nextPage={this.props.attendancesP} name='Presenças' name2='0 faltas' biblio=''  icon='beach-access'/>
                    <ButtonInitialOptions nextPage={this.props.vacationsP} name='Férias' name2='Aprovado' biblio='MaterialIcons' icon='flag'/>
                    {/* <Card nextPage={this.props.teamsP} name='Presenças' name2='0 Faltas' link={require('../../assets/images/presencas.jpg') }></Card>
                    <Card name='Férias' name2='Aprovado' link={require('../../assets/images/vacations.jpeg')}></Card> */}
                </View>
                <View style={ styles.row }>
                    <ButtonInitialOptions nextPage={this.props.teamsP} name='Equipas' name2={this.state.teams.length + ' Equipas'} biblio='MaterialIcons' icon='people'/>
                    <ButtonInitialOptions name='Recibos' name2='29-10-2018' biblio='' icon='euro-symbol'/>
                    {/* <Card name='Reuniões' name2='Sem Reuniões' link={require('../../assets/images/business.png')}></Card> */}
                    {/* <Card name='Recibos' name2='29-10-2018' link={require('../../assets/images/recibos.jpg')}></Card> */}
                </View> 
            </View>
        )
    }
}


export default InitialOptions


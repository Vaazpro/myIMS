import React, { Component } from 'react'
import {
    View
} from 'react-native'
import styles from '../../constants/Styles'
import ButtonInitialOptions from './ButtonInitialOptions'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import ProfileService from './ProfileService'
import * as PT from "../../constants/labels/pt_labels"


class InitialOptions extends Component {
    static navigationOptions = {
        header: null,
    };


    constructor (props){
        super(props)
        this.state={
            attendance: [],
            unjustifiedAttendances: 0,
            teams : [],
            gotInfo : false,
            plan: {},
            vacations: {},
            approvedDays: 0
        }
        
    }

    unjustifiedAttendances(attendances){
        var count=0;

        attendances.forEach(attendance => {
            if(attendance.state == "UNJUSTIFIED"){
                count++;
            }
        });

        this.setState({
            unjustifiedAttendances: count
        })
    }

    countApprovedDays(){
        let daysCount = 0
        if(this.state.vacations.vacations != undefined){
            for (let index = 0; index < (this.state.vacations.vacations).length; index++) {
                const element = (this.state.vacations.vacations)[index];
                if(element.state == "APPROVED" || element.state == "FIXED"){
                    daysCount += this.getVacationDays(element)
                }
            }
        }
        this.setState({
            approvedDays: daysCount
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

    render() {
        //console.log(this.props.prof)
        if(!this.state.gotInfo){
            let self = this
            new ProfileService().getTeamsByEmployeeId(this.props.prof.id, function(teams){
                self.setState({
                    teams: teams,
                    gotInfo : true
                }) 
            })
            new ProfileService().getAttendanceByEmployeeId(this.props.prof, this.props.prof.admissionDate, function(attendance){
                self.setState({
                    attendance: attendance
                })
                self.unjustifiedAttendances(attendance)
            })
            new ProfileService().getVacationsPlan(this.props.prof.id, function(plan){
                self.setState({
                    plan: plan
                })
                let selfB = self
                new ProfileService().getVacations(self.props.prof.id, plan[0].dateStart, plan[0].dateEnd, plan[0].id, function(vacations){
                    selfB.setState({
                        vacations: vacations
                    })
                    selfB.countApprovedDays()
                })
            })
        }
        
        
        
        
        return (
            <View style={{flex:1, alignItems:'center', marginTop: getStatusBarHeight()}}>
                <View style={ styles.row }>
                    <ButtonInitialOptions nextPage={this.props.attendancesP} name={PT.TITLE_ATTENDANCE_BUTTON} name2={this.state.unjustifiedAttendances + PT.SUBTITLE_ATTENDANCE_BUTTON} biblio=''  icon='beach-access' disabled={false}/>
                    <ButtonInitialOptions nextPage={this.props.vacationsP} name={PT.TITLE_VACATIONS_BUTTON} name2={this.state.approvedDays + PT.SUBTITLE_VACATIONS_BUTTON} biblio='MaterialIcons' icon='flag' disabled={false}/>
                    {/* <Card nextPage={this.props.teamsP} name='Presenças' name2='0 Faltas' link={require('../../assets/images/presencas.jpg') }></Card>
                    <Card name='Férias' name2='Aprovado' link={require('../../assets/images/vacations.jpeg')}></Card> */}
                </View>
                <View style={ styles.row }>
                    <ButtonInitialOptions nextPage={this.props.teamsP} name={PT.TITLE_TEAMS_BUTTON} name2={this.state.teams.length + PT.SUBTITLE_TEAMS_BUTTON} biblio='MaterialIcons' icon='people' disabled={false}/>
                    <ButtonInitialOptions name={PT.TITLE_INVOICE_BUTTON} name2={PT.SUBTITLE_INVOICE_BUTTON} biblio='' icon='euro-symbol' disabled={true}/>
                    {/* <Card name='Reuniões' name2='Sem Reuniões' link={require('../../assets/images/business.png')}></Card> */}
                    {/* <Card name='Recibos' name2='29-10-2018' link={require('../../assets/images/recibos.jpg')}></Card> */}
                </View> 
            </View>
        )
    }
}


export default InitialOptions


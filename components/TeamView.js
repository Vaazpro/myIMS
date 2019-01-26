import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import Styles from '../constants/Styles'
import IconSearch from '../components/IconSearch'
import CircularPhoto from './CircularPhoto'
import * as CONST from '../constants/labels/constants'
import Colors from '../constants/Colors';

class 
TeamView extends Component {

    constructor(props) {
        super(props)
        this.state={
            employees: this.props.employees,
            icon:this.props.icon,
            employeesList : [],
            image: ""
        }
    }

    /** PROPS
     * txt
     * employees
     * icon
     */
    
    changeIcon(){
        var newIcon = this.state.icon
        newIcon = newIcon.split('-')
        return newIcon[1]
    }

    componentWillMount(){
        var employeesList = []
        var image = ""
        let offset = -10
        if(this.state.employees.length<=5){
            this.state.employees.forEach((employee, index) => {
                employeesList.push(
                    <View key={index} style={Styles.teamViewPhotoHolder}>
                        <CircularPhoto image= {CONST.URL_BEGIN + employee.attachmentId + CONST.URL_END} size={25}/>
                    </View>
                )
            }) 
        }else{
            for(var i=0; i<5;i++){
                employeesList.push(
                    <View  key={i} style={[Styles.teamViewPhotoHolder, {marginRight: offset}]}>
                        <CircularPhoto image= {CONST.URL_BEGIN + this.state.employees[i].attachmentId + CONST.URL_END} size={25}/>
                    </View>
                )
            }
            var others = this.state.employees.length -5
            employeesList.push(
                <View  key={"others"} style={Styles.teamViewOtherUsersContainer}>
                    <Text> +{others} </Text>
                    <IconSearch name={CONST.ICON_NAME_USERS} biblio={CONST.LIBRARY_1} color={Colors.SPARKLE_IT_BLACK} size={13} />
                </View>
            );
        }
        if(this.state.icon.substring(0,1)==='#'){
            image = (<View style= {Styles.teamViewImageContainer}>
                <View style= {[Styles.teamViewTeamColor, {backgroundColor:this.state.icon}]}></View>
            </View>)
        }else{
            image = (<View style= {Styles.teamViewImageContainer}>
                <IconSearch name={this.changeIcon()} biblio={CONST.LIBRARY_0}color={Colors.SPARKLE_IT_BLACK} size={25} />
            </View>)
        }
        this.setState({
            employeesList: employeesList,
            image: image
        })
    }

    render() {
        return (
            <View style={[Styles.shadow, Styles.teamViewMainContainer]}>
                {this.state.image}
                <View style= {Styles.teamViewTeamMembersContainer}>
                    <View style= {Styles.alignBottom}>
                        <Text style={Styles.font18}>{this.props.txt}</Text>  
                    </View>
                    <View style= {Styles.flex1horizontal}>
                        {this.state.employeesList}
                    </View>
                </View>    
                <View style= {[Styles.flex2, Styles.HorizontalCenterRow]}>
                    {/* In Case SparkleIT wants to EDIT Teams */}
                </View>                                 
            </View>
        )
    }
}

export default TeamView
import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import Styles from '../constants/Styles'
import CircularPhoto from './CircularPhoto'
import IconSearch from "./IconSearch"
import * as CONST from '../constants/labels/constants'
import Colors from '../constants/Colors'

class 
TaskView extends Component {

    constructor(props) {
        super(props)
        this.state={
            task: this.props.task,
            userList: []
        }
    }

    /** PROPS:
    * txt
    * time
    * color
    * taskHandler
    */

    componentWillMount(){
        var usersList = []
        this.state.task.users.forEach((user, index) => {
            usersList.push(
                <View key={index} style={Styles.taskViewPhotoContainer}>
                    <CircularPhoto image= {CONST.URL_BEGIN + user.attachmentId + CONST.URL_END} size={20}/>
                </View>
            )
        }) 
        if(this.state.task.number > 2){
            var others = this.state.task.number - 2
            usersList.push(
                <View  key={this.state.task.number} style={Styles.taskViewOtherUserContainer}>
                    <Text> +{others} </Text>
                    <IconSearch name={CONST.ICON_NAME_USERS} biblio={CONST.LIBRARY_1} color={Colors.SPARKLE_IT_BLACK} size={13} />
                </View>
            );
        }
        this.setState({
            userList: usersList
        })
    }
    
    render() {
        return (
            <View style={[Styles.shadow, Styles.taskViewMainContainer, {borderLeftColor: this.props.color}]}>
                <TouchableOpacity style={Styles.flex1} onPress={this.props.taskHandler}>
                <View style= {Styles.alignBottom}>
                    <Text style={Styles.font16}>{this.props.txt}</Text>  
                </View>
                <View style= {[Styles.flex1, Styles.VerticalCenterRow]}>
                    {this.state.userList}
                    <View style={Styles.taskViewTextHolder}>
                        <Text style={[Styles.font14, {color: Colors.SPARKLE_IT_DARKGRAY}]}>{this.props.time}</Text>  
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default TaskView
import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import Styles from '../constants/Styles'
import CircularPhoto from './CircularPhoto'
import * as PT from "../constants/labels/pt_labels"

class 
AttendanceView extends Component {
    
    constructor(props) {
        super(props)
        this.state={}
    }

    /** PROPS
    * borderColor
    * day
    * monthYear
    * time
    * photo
    * state
    */
   
    render() {
        return (
            <View style={[Styles.shadow, Styles.attendanceScreenMainView]}>
                <View style= {[Styles.attendaceBorderColor, {borderLeftColor: this.props.borderColor}]}>
                    <View style={Styles.alignBottom}>
                        <Text style={Styles.font20}>{this.props.day}</Text>
                    </View>
                    <View style={Styles.alignTop}>
                        <Text style={Styles.font10}>{this.props.monthYear}</Text>
                    </View>
                </View>
                <View style={Styles.attendanceSeparator}>
                </View>
                <View style= {Styles.attendanceStateView}>
                    <View style={[Styles.flex1, Styles.rowAlignRight]}>
                        <View style={Styles.flex1}>
                            <Text style={Styles.font20}>{this.props.time == null ? PT.ATTENDANCE_VIEW_INFO_TEXT : this.props.time}</Text>    
                        </View>
                        <View style={Styles.attendacePhotoView}>
                            <CircularPhoto image= {this.props.photo} size={20}/>
                        </View>
                    </View>
                    <View style={Styles.alignTop}>
                        <Text style={Styles.attendanceStateSubtitle}>{this.props.state}</Text>
                    </View>
                </View>   
            </View>
        )
    }
}
export default AttendanceView
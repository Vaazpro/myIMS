import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import Styles from '../constants/Styles'

class 
VacationsView extends Component {

    constructor(props) {
        super(props)
        this.state={}
    }

    /* PROPS 
    * startEndDays
    * borderColor
    * monthText
    * durationText
    * state
    */

    render() {
        return (
            <View style={[Styles.shadow, Styles.vacationsViewMainContainer]}>
                <View style= {[Styles.flex2, Styles.vacationsViewInnerLeftContainer, {borderLeftColor: this.props.borderColor}]}>
                    <View style={Styles.alignBottom}>
                        <Text style={Styles.font16}>{this.props.startEndDays}</Text>
                    </View>
                    <View style={[Styles.flex1, Styles.justifyCenter]}>
                        <Text style={Styles.font10}>{this.props.monthText}</Text>
                    </View>
                </View>
                <View style={Styles.vacationsViewSeparator}></View>
                <View style= {Styles.vacationsViewInnerRightContainer}>
                    <View style={[Styles.flex1, Styles.rowAlignRight]}>
                        <View style={Styles.flex1}>
                            <Text style={Styles.font16}>{this.props.durationText}</Text>    
                        </View>
                        <View style={[Styles.flex1, Styles.vacationsViewPhotoHolder]}>
                            {/* Insert Photo Here */}
                        </View>
                    </View>
                    <View style={[Styles.flex1, Styles.justifyCenter]}>
                        <Text style={Styles.font10}>{this.props.state}</Text>
                    </View>
                </View>   
            </View>
        )
    }
}

export default VacationsView
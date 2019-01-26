import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import Styles from '../constants/Styles'
import IconSearch from './IconSearch'
import Colors from '../constants/Colors'
import * as CONST from '../constants/labels/constants'

class 
TaksFilterView extends Component {

    constructor(props) {
        super(props)
        this.state={
            clicked: this.props.clicked
        }
    }

    /** PROPS
    * clcked
    * txt
    * checkArray()
    */

    render() {
        return (
            <View style={Styles.tasksFilterViewMainContainer}>
                <View style={[this.state.clicked ? Styles.shadow : Styles.noStyle, Styles.tasksFilterViewSecondaryContainer, {elevation: this.state.clicked ? 5 : 0}]}>
                    <TouchableOpacity activeOpacity={0.8} style={Styles.tasksFilterViewClickableOption} onPress={()=>{this.props.checkArray(); this.setState({clicked: !this.state.clicked})}}>
                        <Text style={Styles.tasksFilterViewOptionText}>{this.props.txt}</Text>  
                    </TouchableOpacity>
                </View>
                <View style={[Styles.tasksFilterViewHighlightContainer, {opacity: this.state.clicked ? 1 : 0}]}>
                    <IconSearch name={CONST.ICON_NAME_CHECK} biblio={CONST.LIBRARY_1} color={Colors.SPARKLE_IT_WHITE} size={17}></IconSearch>
                </View>
            </View>
        )
    }
}

export default TaksFilterView
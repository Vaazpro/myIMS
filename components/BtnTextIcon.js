import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import IconSearch from '../components/IconSearch'
import Styles from '../constants/Styles'
import Colors from '../constants/Colors'
import * as CONST from '../constants/labels/constants'

class BtnTextIcon extends Component {

    constructor(props) {
        super(props)
        this.state={}
    }

    /** PROPS
    * onPressBtn
    * activeOpacity
    * name
    * exists
    * icon
    * biblio
    */

    render() {
        return (
            <TouchableOpacity activeOpacity={this.props.activeOpacity} onPress={this.props.onPressBtn}>
                <View style={Styles.btnTextIconContainer}>
                    <View style={Styles.btnTextIconFilterName}>
                        <Text style={{color: Colors.SPARKLE_IT_DARKGRAY}}>{this.props.name}</Text>    
                        <View style={[Styles.btnTextIconImageHolder, {opacity: this.props.exists}]}>
                            <IconSearch name={CONST.ICON_NAME_CHECK} biblio={CONST.LIBRARY_1} color={Colors.SPARKLE_IT_MAINCOLOR} size={17}></IconSearch>
                        </View>
                    </View>
                    <View  style={Styles.alignBottom}>
                        <IconSearch name={this.props.icon} biblio={this.props.biblio} size={16} color={Colors.SPARKLE_IT_BLACK}></IconSearch>     
                    </View>                                       
                </View>
            </TouchableOpacity>
        )
    }
}

export default BtnTextIcon
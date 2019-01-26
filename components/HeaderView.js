import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import styles from '../constants/Styles'
import IconSearch from '../components/IconSearch'
import Colors from '../constants/Colors'
import Styles from '../constants/Styles'

class HeaderView extends Component {

    constructor(props) {
        super(props)
        this.state={}
    }

    /** PROPS
    * txtTitle
    * textBtn
    * displayIcon
    * displayBtn
    * nameIcon
    * colorIcon
    * biblioIcon
    * onPressBtn
    * onPressIcon
    */

    render() {
        return (
            <View style={[styles.container, {borderBottomWidth:1, borderBottomColor: Colors.SPARKLE_IT_GRAY}]}>
                <View style={Styles.headerContainer}>
                    <TouchableOpacity style={Styles.verticalCenter} onPress={this.props.onPressIcon}>
                        <IconSearch name={this.props.nameIcon} biblio={this.props.biblioIcon} color={this.props.colorIcon} size={25} style={{display: this.props.displayIcon}} />
                    </TouchableOpacity>
                </View>
                <View style={Styles.flex1horizontal}>
                    <View style={Styles.headerTitleContainer}>
                        <Text style={Styles.font20}>{this.props.txtTitle}</Text>
                    </View>
                    <View style={Styles.headerSecondaryContainer}>
                        <TouchableOpacity onPress={this.props.onPressBtn} style={{display: this.props.displayBtn}}>
                            <Text style={Styles.font16}>{this.props.txtBtn}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default HeaderView
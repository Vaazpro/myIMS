import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'

import styles from '../../constants/Styles'
import IconSearch from '../../components/IconSearch'
import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles'

class ButtonInitialOptions extends Component {

    constructor(props) {
        super(props)
        this.state={
            image: '',
            maintext: '',
            secondarytext: '',
            disabled: this.props.disabled
        }
    }

    /** PROPS
     * disabled
     * nextPage
     * icon
     * biblio
     * name
     * name2
     */

    render() {
       const iconColor  = (!this.state.disabled) ? Colors.SPARKLE_IT_MAINCOLOR : Colors.SPARKLE_IT_MAINCOLOR_DISABLE
       const textColor  = (!this.state.disabled) ? Colors.SPARKLE_IT_BLACK : Colors.SPARKLE_IT_BLACK_DISABLE
       const active = (!this.state.disabled) ? 0.2 : 1
        return (
            
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.props.nextPage} activeOpacity={active}>
                    <View style={styles.row}>
                        <View style={Styles.buttonInitianOptionIconContainer}>
                            <IconSearch name={this.props.icon} biblio={this.props.biblio} size={32} color={iconColor}></IconSearch>
                        </View>
                        <View style={Styles.buttonInitianOptionDataContainer}>
                            <View style={Styles.flex3}></View>
                            <View style={Styles.buttonInitianOptionsTittle}>
                                <Text style={[Styles.font20, {color: textColor}]}>{this.props.name}</Text>
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={[Styles.buttonInitianOptionsSubtittle, {color: textColor}]}>{this.props.name2}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View> 
        )
    }
}

export default ButtonInitialOptions
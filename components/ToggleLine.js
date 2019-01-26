import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Switch } from 'react-native-switch'
import Colors from '../constants/Colors'
import Styles from '../constants/Styles'

class ToggleLine extends Component {

    constructor(props) {
        super(props)
        this.state={
            isToggled: false,
            notificationText: this.props.texto
        }
    }

    /** PROPS
    * texto
    */

    changeToggle = () => {
        //Promise.resolve let us wait for a callback to execute the next instruction in the sequence
        //this avoids having the wrong value printed when updating the state value of, in this case, isToggled
        Promise.resolve(this.setState({isToggled: !this.state.isToggled}))
        .then(this.toggleHandler)
    }

    toggleHandler = () => {
        console.warn(this.state.notificationText + ' - ' + this.state.isToggled)
    }

    render() {
        return (
            <View style={Styles.toggleLineMainContainer}>
                <View style={Styles.toggleLineTitleContainer}>
                    <Text style={[Styles.font16, {color: Colors.SPARKLE_IT_BLACK}]}>{ this.props.texto }</Text>        
                </View>
                <View style={Styles.toggleLineSwitchContainer}>  
                    <Switch
                        value={this.state.isToggled}
                        onValueChange={this.changeToggle}
                        circleSize={25}
                        circleBorderWidth={1}
                        backgroundActive={Colors.SPARKLE_IT_MAINCOLOR}
                        backgroundInactive={Colors.SPARKLE_IT_GRAY}
                        circleActiveColor={Colors.SPARKLE_IT_WHITE}
                        circleInActiveColor={Colors.SPARKLE_IT_WHITE}
                    />
                </View>    
            </View> 
        )
    }
}

export default ToggleLine
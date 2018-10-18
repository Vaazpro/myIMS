import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import styles from '../../constants/Styles'
import ButtonInitialOptions from './ButtonInitialOptions'



class InitialOptions extends Component {

    constructor(props) {
        super(props)
        this.state={}
    }

    render() {
        return (
            <View style={{flex:1, alignItems:'center'}}>
                <View style={ styles.row }>
                    <ButtonInitialOptions/>
                    <ButtonInitialOptions/>
                </View>
                <View style={ styles.row }>
                    <ButtonInitialOptions/>
                    <ButtonInitialOptions/>
                </View> 
            </View>
        )
    }
}


export default InitialOptions


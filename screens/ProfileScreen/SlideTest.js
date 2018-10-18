import React, { Component } from 'react'
import {
    View,
    StatusBar,
    SafeAreaView
} from 'react-native'
import InitialOptions from './InitialOptions'
import styles from '../../constants/Styles'

class SlideTest extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state={}
    }

    render() {
        return (
            <View style={ styles.container }>
                <View style={{flex: 1, backgroundColor:'red'}}>

                </View>

                <View style={{flex: 3, opacity: 1}}>
                    
                </View>
            </View>
        )
    }
}

export default SlideTest

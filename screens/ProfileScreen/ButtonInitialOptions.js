import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'

import styles from '../../constants/Styles'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'


class ButtonInitialOptions extends Component {

    constructor(props) {
        super(props)
        this.state={
            image: '',
            maintext: '',
            secondarytext: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.handlerButtonOnClick}>
                    <View style={styles.row}>
                        <View style={{ flex: 1, alignItems:'center', justifyContent: 'center' }}>
                            <MaterialIcons name="beach-access" size={32} color="#00659D" /> 
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <View style={{ flex: 3 }}>
                                    
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{fontSize: 20}}>lol1</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <Text style={{ paddingTop:5 }}>lol2</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ButtonInitialOptions
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
                <TouchableOpacity style={styles.button} onPress={() => {{console.warn('fgre')}}}>
                    <View style={styles.row}>
                        <View style={{ flex: 1, alignItems:'center', justifyContent: 'center' }}>
                            <MaterialIcons name={this.props.icon} size={32} color="#00659D" />
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <View style={{ flex: 3 }}>
                                    
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{fontSize: 20}}>{this.props.name}</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <Text style={{ paddingTop:5 }}>{this.props.name2}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View> 
            
        )
    }
}

export default ButtonInitialOptions
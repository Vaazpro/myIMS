import React, { Component } from 'react'
import {
    Text,
    View,
    StatusBar,
    SafeAreaView
} from 'react-native'
import InitialOptions from './InitialOptions'
import styles from '../../constants/Styles'

class ProfileScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state={}
    }

    render() {
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
           <SafeAreaView style={styles.container}> 
                <View style={styles.container}>
                    {/* StatusBar.currentHeight avoids the StatusBar to overlap our screen */}
                    <View style={{height: StatusBar.currentHeight}}></View>
                    
                    <View style={{flex: 1}}>

                    </View>

                    <View style={{flex: 2}}>
                        <InitialOptions/>
                    </View>

                    <View style={{flex: 1}}>

                    </View>
                </View>
            </SafeAreaView> 
        )
    }
}

export default ProfileScreen

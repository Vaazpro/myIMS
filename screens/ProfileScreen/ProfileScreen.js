import React, { Component } from 'react'
import {
    Text,
    View,
    StatusBar,
    SafeAreaView,
} from 'react-native'
import InitialOptions from './InitialOptions'
import SlideTest from './SlideTest'
import styles from '../../constants/Styles'
import { Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';


class ProfileScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state={
            pos: '',
            h: (Dimensions.get('window').height / 4) - getStatusBarHeight()

        }
    }

    render() {
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
           <View style={styles.container}> 
                <View style={styles.container}>
                    {/* StatusBar.currentHeight avoids the StatusBar to overlap our screen */}
                    <View style={{height: StatusBar.currentHeight}}></View>
                    
                    
                    <View style={{flex: 1}}>

                    </View>

                    </View>
                    <View style={{flex: 2}}>
                        <InitialOptions/>
                    </View>

                    <View style={{flex: 1}}>

                    </View>

                    <View style={{justifyContent:'center',
                            alignItems:'center',
                            alignSelf:'center',
                            position:'absolute',
                            marginTop: getStatusBarHeight(),
                            backgroundColor:'blue',
                            height: this.state.h,
                            width: Dimensions.get('window').width }}>
                </View>
            </View> 
        )
    }
}

export default ProfileScreen

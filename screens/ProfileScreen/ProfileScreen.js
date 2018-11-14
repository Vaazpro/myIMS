import React, { Component } from 'react'
import {
    View,
    StatusBar,
    NativeModules,
    SafeAreaView
} from 'react-native'
import InitialOptions from './InitialOptions'
import SlideScreen from './SlideScreen'
import styles from '../../constants/Styles'

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)


class ProfileScreen extends Component{
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        
        this.state={}
        
        
    }

    unlockPressedHandler = () => {
        this.props.navigation.navigate('unlock');
      };
    TeamsPressedHandler = () => {
        this.props.navigation.navigate('teams');
    };
    VacationsPressedHandler = () => {
        this.props.navigation.navigate('vacations');
    }
    

    render() {
       
        
        
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
                <SafeAreaView style={styles.container}>
                    {/* StatusBar.currentHeight avoids the StatusBar to overlap our screen */}
                    <View style={{height: StatusBar.currentHeight}}></View>
                    
                    <View style={{flex: 1}}>

                    </View>

                    <View style={{flex: 2, elevation:0}}>
                        <InitialOptions teamsP= {this.TeamsPressedHandler} vacationsP={this.VacationsPressedHandler}/>
                    </View>

                    <View style={{flex: 1}}>
                    
                    </View>
                    <SlideScreen onP={this.unlockPressedHandler}/>
                    
                </SafeAreaView>
        )
    }
}

export default ProfileScreen

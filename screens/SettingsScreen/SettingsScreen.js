import React, { Component } from 'react'
import {
    View,
    StatusBar,
    SafeAreaView,
    Button
} from 'react-native'
import HeaderView from '../../components/HeaderView'
import BtnTextIcon from '../../components/BtnTextIcon'
import IntroScreen from '../SplashScreen/IntroScreen'
import * as PT from "../../constants/labels/pt_labels"
import SecurityService from "../SplashScreen/SecurityService"



class SettingsScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state={
            clicked: false
        }
    }

    notificationsOptionHandler = () => {
        this.props.navigation.navigate('notifications')
    };

    xpto = () => {
        console.warn("CENAS")
    }

    logoutHandler = () => {
        this.setState({
            clicked: true
        })
    }

    goToIntroScreen = () => {
        var introScreen = new IntroScreen();
        
        introScreen.reRender()
    }

    render() {
        return (
            <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
                <View style={{height: StatusBar.currentHeight}}></View>
                <View style={{flex:2}}>
                    <HeaderView txtTitle={PT.SETTINGS_HEADER_TITLE} txtBtn="" displayIcon="none" displayBtn="none" nameIcon="" biblioIcon="" onPressIcon={this.xpto} onPressBtn={this.xpto} />
                </View>
                <View style={{flex:10, margin: 10}}>
                     {/* <BtnTextIcon name={PT.SETTINGS_OPTIONS_NOTIFICATIONS}  exists={0} icon='bell' biblio='' onPressBtn={this.notificationsOptionHandler}/>
                    <BtnTextIcon name={PT.SETTINGS_OPTIONS_CHANGE_EMAIL}  exists={0} icon='envelope' biblio='' />
                    <BtnTextIcon name={PT.SETTINGS_OPTIONS_CHANGE_PASSWORD}  exists={0} icon='key' biblio='' /> */}
                    <BtnTextIcon name={PT.SETTINGS_OPTIONS_LOGOUT} exists={0} icon='sign-out' biblio='' onPressBtn={()=>{
                        new SecurityService().logout()
                        this.props.navigation.navigate('Auth')
                    }}/>
                </View>

            </SafeAreaView>
        )
    }
}

export default SettingsScreen
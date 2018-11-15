import React, { Component } from 'react'
import {
    View,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    Platform
} from 'react-native'
import HeaderView from '../../components/HeaderView'
import BtnTextIcon from '../../components/BtnTextIcon'
import SplashScreen from '../SplashScreen/SplashScreen'
import App from '../../App'
import Styles from '../../constants/Styles'
import { NavigationActions } from 'react-navigation'


class SettingsScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state={
            logedIn: true
        }
    }

    notificationsOptionHandler = () => {
        this.props.navigation.navigate('notifications')
    };

    xpto = () => {
        console.warn("CENAS")
    }

    render() {
        if(this.state.logedIn){
            return (
                <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
                    <View style={{height: StatusBar.currentHeight}}></View>
                    <View style={{flex:2}}>
                        <HeaderView txtTitle="Configurações" txtBtn="" displayIcon="none" displayBtn="none" nameIcon="" biblioIcon="" onPressIcon={this.xpto} onPressBtn={this.xpto} />
                    </View>
                    <View style={{flex:10, margin: 10}}>
                        <BtnTextIcon name='Notificações' icon='bell' biblio='' onPressBtn={this.notificationsOptionHandler}/>
                        <BtnTextIcon name='E-mail' icon='envelope' biblio='' />
                        <BtnTextIcon name='Password' icon='key' biblio='' />
                        <BtnTextIcon name='Terminar sessão' icon='sign-out' biblio='' onPressBtn={()=>{this.setState({logedIn:false})}}/>
                    </View>
                </SafeAreaView>
            )
        } else {
            return (
                  <SplashScreen/>
                
              )
        }
        
    }
}

export default SettingsScreen
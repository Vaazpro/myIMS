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
import { NavigationActions, StackActions } from 'react-navigation';



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
                    <HeaderView txtTitle="Configurações" txtBtn="" displayIcon="none" displayBtn="none" nameIcon="" biblioIcon="" onPressIcon={this.xpto} onPressBtn={this.xpto} />
                </View>
                <View style={{flex:10, margin: 10}}>
                    <BtnTextIcon name='Notificações' icon='bell' biblio='' onPressBtn={this.notificationsOptionHandler}/>
                    <BtnTextIcon name='E-mail' icon='envelope' biblio='' />
                    <BtnTextIcon name='Password' icon='key' biblio='' />
                    <BtnTextIcon name='Terminar sessão' icon='sign-out' biblio='' onPressBtn={()=>{
                        this.props.navigation.navigate('intro')
                    }}/>
                </View>

            </SafeAreaView>
        )
    }
}

export default SettingsScreen
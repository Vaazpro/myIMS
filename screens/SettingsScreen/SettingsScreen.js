import React, { Component } from 'react'
import {
    View,
    StatusBar,
    SafeAreaView
} from 'react-native'
import HeaderView from '../../components/HeaderView'
import BtnTextIcon from '../../components/BtnTextIcon';


class SettingsScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state={}
    }

    notificationsOptionHandler = () => {
        this.props.navigation.navigate('notifications')
    };

    xpto = () => {
        console.warn("CENAS")
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
                    <BtnTextIcon name='Terminar sessão' icon='sign-out' biblio='' />
                </View>
            </SafeAreaView>
        )
    }
}

export default SettingsScreen
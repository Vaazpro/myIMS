import React, { Component } from 'react'
import {
    Text,
    View,
    SafeAreaView,
    StatusBar
} from 'react-native'
import HeaderView from '../../components/HeaderView';
import ToggleLine from '../../components/ToggleLine';

class NotificationsScreen extends Component {

    static navigationOptions = {
        title: 'Notificações',
        headerTitleStyle: {
            flex:1
        }
    };

    constructor(props) {
        super(props)
        this.state={}
    }

    render() {
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{height: StatusBar.currentHeight}}></View>
                {/* <View style={{flex: 2}}>
                    <HeaderView txtTitle="Configurações" txtBtn="" displayIcon="none" displayBtn="none" nameIcon="" biblioIcon="" onPressIcon={this.xpto} onPressBtn={this.xpto} />
                </View> */}
                 <View style={{flex: 1, margin: 10}}>
                    <ToggleLine texto='Criação de Tarefas'></ToggleLine>
                    <ToggleLine texto='Atualização de Tarefas'></ToggleLine>
                    <ToggleLine texto='Férias'></ToggleLine>
                    <ToggleLine texto='Faltas'></ToggleLine>
                    <ToggleLine texto='Aniversários'></ToggleLine>
                </View>
            </SafeAreaView>
        )
    }
}

export default NotificationsScreen
import React, { Component } from 'react'
import {
    View,
    SafeAreaView,
    StatusBar
} from 'react-native'
import ToggleLine from '../../components/ToggleLine'
import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles'

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
            <SafeAreaView style={[Styles.flex1, {backgroundColor: Colors.SPARKLE_IT_WHITE}]}>
                <View style={{height: StatusBar.currentHeight}}></View>
                 <View style={[Styles.flex1, Styles.m10]}>
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
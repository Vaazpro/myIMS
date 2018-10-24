import React, { Component } from 'react'
import {
    Text,
    View,
    StatusBar,
    SafeAreaView
} from 'react-native'
import styles from '../../constants/Styles'
import HeaderView from '../../components/HeaderView'


class SettingsScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state={}
    }

    render() {

        function xpto(){
            console.log("CJASDPOJASPDOJ")
        }

        return (
            <SafeAreaView style={{flex:1}}>
                <View style={{height: StatusBar.currentHeight}}></View>
                    <View style={{flex:2}}>
                        <HeaderView txtTitle="Configurações" txtBtn="" displayIcon="none" displayBtn="none" nameIcon="" biblioIcon="" onPressBtn={this.xpto} />
                    </View>
                <View style={{flex:8}}></View>
            </SafeAreaView>
        )
    }
}

export default SettingsScreen
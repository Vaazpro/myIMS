import React, { Component } from 'react'
import {
    Text,
    View,
    SafeAreaView,
    StatusBar
} from 'react-native'
import HeaderView from '../../components/HeaderView'

class FiltersScreen extends Component {

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
            <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e6e6' }}>
                <View style={{height: StatusBar.currentHeight}}></View>
                <View style={{flex:2}}>
                    <HeaderView txtTitle="Filtros" txtBtn="Limpar" displayIcon="flex" displayBtn="flex" nameIcon="cross" biblioIcon="" onPressIcon={() =>{this.props.navigation.goBack()}} onPressBtn={() =>{}} />
                </View>
                <View style={{flex:10}}></View>
            </SafeAreaView>
        )
    }
}

export default FiltersScreen
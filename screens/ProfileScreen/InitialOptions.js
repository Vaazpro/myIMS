import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import styles from '../../constants/Styles'
import Card from '../ProfileScreen/Card'
import ButtonInitialOptions from './ButtonInitialOptions'
import { getStatusBarHeight } from 'react-native-status-bar-height'



class InitialOptions extends Component {

    constructor(props) {
        super(props)
        this.state={}
    }

    render() {
        return (
            <View style={{flex:1, alignItems:'center', marginTop: getStatusBarHeight()}}>
                <View style={ styles.row }>
                    {/* <ButtonInitialOptions name='Presenças' name2='0 faltas' biblio=''  icon='beach-access'/>
                    <ButtonInitialOptions name='Férias' name2='Aprovado' biblio='MaterialIcons' icon='flag'/> */}
                    <Card name='Presenças' name2='0 Faltas' link={require('../../assets/images/presencas.jpg')}></Card>
                    <Card name='Férias' name2='Aprovado' link={require('../../assets/images/vacations.jpeg')}></Card>
                </View>
                <View style={ styles.row }>
                    {/* <ButtonInitialOptions name='Reuniões' name2='Sem Reuniões' biblio='MaterialIcons' icon='people'/>
                    <ButtonInitialOptions name='Recibos' name2='29-10-2018' biblio='' icon='euro-symbol'/> */}
                    <Card name='Reuniões' name2='Sem Reuniões' link={require('../../assets/images/business.png')}></Card>
                    <Card name='Recibos' name2='29-10-2018' link={require('../../assets/images/recibos.jpg')}></Card>
                </View> 
            </View>
        )
    }
}


export default InitialOptions


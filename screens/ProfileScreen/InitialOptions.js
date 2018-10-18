import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import styles from '../../constants/Styles'
import ButtonInitialOptions from './ButtonInitialOptions'



class InitialOptions extends Component {

    constructor(props) {
        super(props)
        this.state={}
    }

    render() {
        return (
            <View style={{flex:1, alignItems:'center'}}>
                <View style={ styles.row }>
                    <ButtonInitialOptions name='Presenças' name2='0 faltas'  icon='beach-access'/>
                    <ButtonInitialOptions name='Férias' name2='Aprovado' icon='flag'/>
                </View>
                <View style={ styles.row }>
                    <ButtonInitialOptions name='Reuniões' name2='Sem Reuniões' icon='people'/>
                    <ButtonInitialOptions name='Recibos' name2='29-10-2018' icon='euro-symbol'/>
                </View> 
            </View>
        )
    }
}


export default InitialOptions


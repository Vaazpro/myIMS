import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import styles from '../constants/Styles'
import IconSearch from '../components/IconSearch'

class HeaderView extends Component {

    constructor(props) {
        super(props)
        this.state={}
    }

    /*
    props:

    textTitle
    textBtn
    displayIcon
    displayBtn
    nameIcon
    biblioIcon
    onPressBtn
    onPressIcon

    */

    render() {
        return (
            <View style={[styles.container, {borderBottomWidth:1, borderBottomColor: '#C2C3C9'}]}>
                <View style={{flex:1, justifyContent: 'center', padding:3}}>
                    <TouchableOpacity style={{justifyContent:'center'}} onPress={this.props.onPressIcon}>
                        <IconSearch name={this.props.nameIcon} biblio={this.props.biblioIcon} color={this.props.colorIcon} size={25} style={{display: this.props.displayIcon}} />
                    </TouchableOpacity>
                </View>
                <View style={{flex:1, flexDirection: "row"}}>
                    <View style={{flex:1, justifyContent: 'center', paddingLeft: 10}}>
                        <Text style={{fontSize:20}}>{this.props.txtTitle}</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center', alignItems:'flex-end', paddingRight:10, }}>
                        <TouchableOpacity onPress={this.props.onPressBtn} style={{display: this.props.displayBtn}}>
                            <Text style={{fontSize:16}}>{this.props.txtBtn}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default HeaderView
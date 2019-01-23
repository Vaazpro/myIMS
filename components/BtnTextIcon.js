import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import IconSearch from '../components/IconSearch'

class BtnTextIcon extends Component {

    constructor(props) {
        super(props)
        this.state={}
    }

    /*
    props:

    onPressBtn
    name
    icon
    biblio
    */

    render() {
        return (
            <TouchableOpacity activeOpacity={this.props.activeOpacity} onPress={this.props.onPressBtn}>
                <View style={{paddingBottom: 5, height: 50, borderBottomColor: 'rgba(216,217,221,0.5)', borderBottomWidth: 1, alignItems: 'flex-end', flexDirection: 'row'}}>
                    <View style={{flex: 9,alignItems: 'flex-start'}}>
                        <Text style={{color: '#9A999E'}}>{this.props.name}</Text>        
                    </View>
                    <View  style={{flex: 1,alignItems: 'flex-end'}}>
                        <IconSearch name={this.props.icon} biblio={this.props.biblio} size={16} color="black"></IconSearch>     
                    </View>                                       
                </View>
            </TouchableOpacity>
        )
    }
}

export default BtnTextIcon
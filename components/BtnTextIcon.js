import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import IconSearch from '../components/IconSearch'
import Styles from '../constants/Styles';

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
    exists
    */

    render() {
        return (
            <TouchableOpacity activeOpacity={this.props.activeOpacity} onPress={this.props.onPressBtn}>
                <View style={{paddingBottom: 5, height: 50, borderBottomColor: 'rgba(216,217,221,0.5)', borderBottomWidth: 1, alignItems: 'flex-end', flexDirection: 'row'}}>
                    <View style={{flex: 9,alignItems: 'flex-start', flexDirection:'row'}}>
                        <Text style={{color: '#9A999E'}}>{this.props.name}</Text>    
                        <View style={{marginLeft:5, width:20, height: 20, opacity: this.props.exists, justifyContent: 'center', alignItems:'center'}}>
                            <IconSearch name="check" biblio="Feather" color="#007FB7" size={17}></IconSearch>
                        </View>
                        {/* <View style={{marginLeft:10, width:20, height: 20, opacity: this.props.exists, justifyContent: 'center', alignItems:'center', borderRadius: 5, borderWidth:1, borderColor: '#007fb7'}}>
                            <IconSearch name="check" biblio="Feather" color="#007FB7" size={17}></IconSearch>
                        </View> */}
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
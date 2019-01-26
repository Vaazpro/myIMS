import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import IconSearch from '../components/IconSearch'
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

class 
TextIcon extends Component {

    constructor(props) {
        super(props)
        this.state={}
    }

    /** PROPS
     * name
     * biblio
     * icon
     */

    render() {
        return (
            
                <View style={[Styles.flex1, Styles.textIcon_MainContainer]}>
                    <View style={Styles.textIcon_TitleContainer}>
                        <Text style={{color: Colors.SPARKLE_IT_DARKGRAY}}>{this.props.name}</Text>        
                    </View>
                    <View  style={Styles.textIcon_IconContainer}>
                        <IconSearch name={this.props.icon} biblio={this.props.biblio} size={16} color={Colors.SPARKLE_IT_DARKGRAY}></IconSearch>     
                    </View>
                                                         
                </View>
            
        )
    }
}

export default TextIcon
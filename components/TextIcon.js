import React, { Component } from 'react'
import {
    Text,
    View,
    Image
} from 'react-native'
import styles from '../constants/Styles'
import IconSearch from '../components/IconSearch'

class 
TextIcon extends Component {

    constructor(props) {
        super(props)
        this.state={}
    }

    

    render() {
        return (
            
                <View style={{paddingBottom: 5,height: 50,borderBottomColor: 'rgba(216,217,221,0.5)', borderBottomWidth: 1, alignItems: 'flex-end', flexDirection: 'row'}}>
                    <View style={{flex: 9,alignItems: 'flex-start'}}>
                        <Text style={{color: '#9A999E'}}>{this.props.name}</Text>        
                    </View>
                    <View  style={{flex: 1,alignItems: 'flex-end'}}>
                        <IconSearch name={this.props.icon} biblio={this.props.biblio} size={16} color="grey"></IconSearch>     
                    </View>
                                                         
                </View>
            
        )
    }
}

export default TextIcon
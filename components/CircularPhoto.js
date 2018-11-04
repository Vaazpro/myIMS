import React, { Component } from 'react'
import {
    Text,
    View,
    Image
} from 'react-native'
import styles from '../constants/Styles'
import IconSearch from '../components/IconSearch'

/*
    props:

    image
    size
*/

class 
CircularPhoto extends Component {

    constructor(props) {
        super(props)
        this.state={}
    }

    

    render() {
        return (
            
                <View style={{}}>
                    <Image source={{uri : this.props.image}} 
                            style={{ width: this.props.size,
                                    height: this.props.size, 
                                    borderRadius: this.props.size/2}} />                        
                </View>
            
        )
    }
}

export default CircularPhoto
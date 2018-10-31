import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import Styles from '../constants/Styles'
import IconSearch from '../components/IconSearch'
import CircularPhoto from './CircularPhoto';

class 
TeamView extends Component {

    constructor(props) {
        super(props)
        this.state={}
    }

    /*
        props:

        txt
        time
        color
        photo2

    */

    

    render() {
        return (
            <View style={[Styles.shadow, {backgroundColor: '#F2F2F2',width: 120, borderRadius: 5, elevation: 1,margin: 10,padding: 5, borderLeftColor: this.props.color, borderLeftWidth: 2}]}>
                <View style= {{flex: 2, justifyContent: 'center'}}>
                    <Text style={{fontSize:15}}>{this.props.txt}</Text>  
                </View>
                <View style= {{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row', }}>
                    <View style={{flex:1, justifyContent: 'flex-start'}}>
                        <CircularPhoto image={this.props.photo2} size={20}/>
                    </View>
                    <Text style={{fontSize:14, color: 'grey'}}>{this.props.time}</Text>  
                </View>
            </View>
        )
    }
}

export default TeamView
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
            <View style={[Styles.shadow, {backgroundColor: '#F2F2F2',width: 120, borderRadius: 5, elevation: 1,marginLeft: 15, marginTop:10, marginBottom:15, paddingLeft:5, paddingRight: 5, borderLeftColor: this.props.color, borderLeftWidth: 2}]}>
                <View style= {{flex: 1, justifyContent: 'flex-end'}}>
                    <Text style={{fontSize:15}}>{this.props.txt}</Text>  
                </View>
                <View style= {{flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <CircularPhoto image={this.props.photo2} size={20}/>
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                        <Text style={{fontSize:14, color: 'grey'}}>{this.props.time}</Text>  
                    </View>
                </View>
            </View>
        )
    }
}

export default TeamView
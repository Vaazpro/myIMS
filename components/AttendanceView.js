import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import Styles from '../constants/Styles'
import CircularPhoto from './CircularPhoto';

class 
AttendanceView extends Component {

    constructor(props) {
        super(props)
        this.state={}
    }

    

    render() {
        return (
            <View style={[Styles.shadow, {height: 60, flexDirection: 'row', borderRadius: 5, elevation: 1,marginBottom: 20,backgroundColor: '#F2F2F2'}]}>
                <View style= {{flex: 2, paddingLeft: 10, borderTopLeftRadius: 5 , flexDirection: 'column', borderBottomLeftRadius:5, borderLeftColor: this.props.borderColor, borderLeftWidth: 2,justifyContent:'center'}}>
                    <View style={{justifyContent:'flex-end', flex:1}}>
                        <Text style={{fontSize: 20}}>{this.props.day}</Text>
                    </View>
                    <View style={{justifyContent:'flex-start', flex:1}}>
                        <Text style={{fontSize: 10}}>{this.props.monthYear}</Text>
                    </View>
                   
                </View>
                <View style={{borderLeftColor: 'rgb(216,217,221)', borderLeftWidth:2, marginTop: 10, marginBottom: 10}}>
                </View>
                <View style= {{flex: 8, flexDirection: 'column', justifyContent: 'center',paddingLeft:10}}>
                    <View style={{flex:1, flexDirection: 'row', alignItems:'flex-end'}}>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 20}}>1 dia (8h)</Text>    
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-end', alignItems:'flex-end', paddingRight:10}}>
                            <CircularPhoto image= {this.props.photo} 
                            size={20}/>
                        </View>
                    </View>
                    <View style={{flex:1, justifyContent: 'flex-start'}}>
                        <Text style={{fontSize: 10, color: 'grey'}}>{this.props.state}</Text>
                    </View>
                </View>   
                
            </View>
        )
    }
}

export default AttendanceView
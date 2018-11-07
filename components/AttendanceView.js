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
            <View style={[Styles.shadow, {height: 60, flexDirection: 'row', borderRadius: 5, elevation: 1,marginBottom: 20,backgroundColor: '#F2F2F2', borderColor: 'red', borderWidth: 2}]}>
                <View style= {{flex: 2, paddingLeft: 10, borderRadius: 5 , flexDirection: 'column', justifyContent:'center'}}>
                    <View style={{justifyContent:'flex-end', flex:1}}>
                        <Text style={{fontSize: 20}}>05</Text>
                    </View>
                    <View style={{justifyContent:'flex-start', flex:1}}>
                        <Text style={{fontSize: 10}}>11/18</Text>
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
                            <CircularPhoto image= 'data:image/jpeg;base64,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' 
                            size={20}/>
                        </View>
                    </View>
                    <View style={{flex:1, justifyContent: 'flex-start'}}>
                        <Text style={{fontSize: 10, color: 'grey'}}>Injustificado</Text>
                    </View>
                </View>   
                
            </View>
        )
    }
}

export default AttendanceView
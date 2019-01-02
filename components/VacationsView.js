import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import Styles from '../constants/Styles'

class 
VacationsView extends Component {

    constructor(props) {
        super(props)
        this.state={}
    }

    /* PROPS 
    * startEndDays
    * borderColor
    * monthText
    * durationText
    * state
    */

    

    render() {
        return (
            <View style={[Styles.shadow, {height: 60, flexDirection: 'row', borderRadius: 5, elevation: 1,marginBottom: 20,backgroundColor: '#F2F2F2'}]}>
                <View style= {{flex: 2, paddingLeft: 10, borderTopLeftRadius: 5 , flexDirection: 'column', borderBottomLeftRadius:5, borderLeftColor: this.props.borderColor, borderLeftWidth: 2,justifyContent:'center'}}>
                    <View style={{justifyContent:'flex-end', flex:1}}>
                        <Text style={{fontSize: 15}}>{this.props.startEndDays}</Text>
                    </View>
                    <View style={{justifyContent:'center', flex:1}}>
                        <Text style={{fontSize: 10}}>{this.props.monthText}</Text>
                    </View>
                   
                </View>
                <View style={{borderLeftColor: 'rgb(216, 217, 221)', borderLeftWidth:2, marginTop: 10, marginBottom: 10}}>
                </View>
                <View style= {{flex: 8, flexDirection: 'column', justifyContent: 'center',paddingLeft:10}}>
                    <View style={{flex:1, flexDirection: 'row', alignItems:'flex-end'}}>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 15}}>{this.props.durationText}</Text>    
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-end', alignItems:'flex-end', paddingRight:10}}>
                            {/* Insert Photo Here */}
                        </View>
                    </View>
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <Text style={{fontSize: 10}}>{this.props.state}</Text>
                    </View>
                </View>   
                
            </View>
        )
    }
}

export default VacationsView
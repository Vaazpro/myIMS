import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
import { Switch } from 'react-native-switch';

class ToggleLine extends Component {

    constructor(props) {
        super(props)
        this.state={
            isToggled: false
        }
        
    }

    changeToggle = () => {
        this.setState({isToggled: !this.state.isToggled})
    }

    render() {
        return (
            /* <View style={{height:50 ,borderBottomColor: 'rgba(216,217,221,0.5)', borderBottomWidth: 1, flexDirection: 'row', marginLeft: 10, marginRight: 10, backgroundColor: 'white'}}>
                <View style={{flex: 16, justifyContent: 'flex-end', paddingBottom: 8}}>
                    <Text style={{color: 'black', fontSize: 16}}>{ this.props.texto }</Text>        
                </View>
                <View style={{flex: 4, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <ToggleSwitch
                        isOn={this.state.isToggled}
                        onColor='#007FB7'
                        offColor='#F2F2F2'
                        size='medium'
                        onToggle={this.changeToggle}
                    />;
                </View>    
            </View> */

            /* <View style={{height:50 ,borderBottomColor: 'rgba(216,217,221,0.5)', borderBottomWidth: 1, flexDirection: 'row', marginLeft: 10, marginRight: 10, backgroundColor: 'white'}}>
                <View style={{flex: 16, justifyContent: 'flex-end', paddingBottom: 8}}>
                    <Text style={{color: 'black', fontSize: 16}}>{ this.props.texto }</Text>        
                </View>
                <View style={{flex: 4, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Switch value={this.state.isToggled} onValueChange={this.changeToggle} tintColor='red' ></Switch>
                </View>    
            </View> */

            <View style={{height:50 ,borderBottomColor: 'rgba(216,217,221,0.5)', borderBottomWidth: 1, flexDirection: 'row', marginLeft: 10, marginRight: 10, backgroundColor: 'white'}}>
                <View style={{flex: 16, justifyContent: 'flex-end', paddingBottom: 8}}>
                    <Text style={{color: 'black', fontSize: 16}}>{ this.props.texto }</Text>        
                </View>
                <View style={{flex: 4, justifyContent: 'center', alignItems: 'flex-end'}}>  
                <Switch
                    value={this.state.isToggled}
                    onValueChange={this.changeToggle}
                    circleSize={25}
                    circleBorderWidth={1}
                    backgroundActive={'#007FB7'}
                    backgroundInactive={'rgb(194, 195, 201)'}
                    circleActiveColor={'white'}
                    circleInActiveColor={'white'}/>
                </View>    
            </View> 

        )
    }
}

export default ToggleLine
import React, { Component } from 'react'
import {
    Text,
    View,
    StatusBar,
    SafeAreaView
} from 'react-native'

class TasksScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state={}
    }

    render() {
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
           <SafeAreaView style={{ flex: 1, backgroundColor: "#e6e6e6" }}> 
                <View>
                    {/* StatusBar.currentHeight avoids the StatusBar to overlap our screen */}
                    <View style={{height: StatusBar.currentHeight}}></View>
                    <Text>This is a Tasks Screen!!!!!!</Text>
                </View>
            </SafeAreaView>
        )
    }
}

export default TasksScreen
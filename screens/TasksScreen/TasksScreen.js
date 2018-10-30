import React, { Component } from 'react'
import {
    Text,
    View,
    StatusBar,
    SafeAreaView, 
    TouchableOpacity
} from 'react-native'
import IconSearch from '../../components/IconSearch';
import HeaderView from '../../components/HeaderView';

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
                <View style={{height: StatusBar.currentHeight}}></View>
                <View style={{flex:2, flexDirection: 'row'}}>
                    <View style={{flex:9}}>
                        <HeaderView txtTitle="Tarefas" txtBtn="" displayIcon="none" displayBtn="none" nameIcon="" biblioIcon="" onPressIcon={() =>{}} onPressBtn={() =>{}} />
                    </View>
                    <View style={{flex:1, justifyContent:'flex-end', paddingBottom:18, backgroundColor: 'white'}}>
                        <TouchableOpacity>
                            <IconSearch style={{ alignSelf: 'flex-end'}} name="sliders" biblio='' size={22} color="black"/>
                        </TouchableOpacity>    
                    </View>
                </View>
                <View style={{flex:10}}>
                    <View style={{flex:1, backgroundColor: 'red', paddingLeft: 10, paddingBottom: 4, paddingTop: 4}}>
                        <Text>ABERTO</Text>
                    </View>
                    <View style={{flex:4, backgroundColor: 'yellow'}}></View>
                    <View style={{flex:1, backgroundColor: 'red', paddingLeft: 10, paddingBottom: 4, paddingTop: 4}}>
                        <Text>PLANEADO</Text>
                    </View>
                    <View style={{flex:4, backgroundColor: 'yellow'}}></View>
                    <View style={{flex:1, backgroundColor: 'red', paddingLeft: 10, paddingBottom: 4, paddingTop: 4}}>
                        <Text>PROGRESSO</Text>
                    </View>
                    <View style={{flex:4, backgroundColor: 'yellow'}}></View>
                    <View style={{flex:1, backgroundColor: 'red', paddingLeft: 10, paddingBottom: 4, paddingTop: 4}}>
                        <Text>TESTE</Text>
                    </View>
                    <View style={{flex:4, backgroundColor: 'yellow'}}></View>
                    <View style={{flex:1, backgroundColor: 'red', paddingLeft: 10, paddingBottom: 4, paddingTop: 4}}>
                        <Text>FEITO</Text>
                    </View>
                    <View style={{flex:4, backgroundColor: 'yellow'}}></View>
                </View>
            </SafeAreaView>
        )
    }
}

export default TasksScreen
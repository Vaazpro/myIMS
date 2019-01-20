import React, { Component } from 'react'
import {
    ScrollView,
    View,
    SafeAreaView,
    StatusBar,
    Text
} from 'react-native'
import HeaderView from '../../components/HeaderView'
import BtnTextIcon from '../../components/BtnTextIcon'
import TasksFilterView from '../../components/TasksFilterView'
import * as PT from "../../constants/labels/pt_labels"

class FiltersScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state={

            profile: this.props.navigation.getParam('profile'),

            array: [
                {id: 0, display: 'none', colapsed: true},
                {id: 1, display: 'none', colapsed: true},
                {id: 2, display: 'none', colapsed: true},
                {id: 3, display: 'none', colapsed: true},
                {id: 4, display: 'none', colapsed: true},
                {id: 5, display: 'none', colapsed: true},
                {id: 6, display: 'none', colapsed: true}
            ]
        }
    }

    optionsHandler(id){
        let array = [...this.state.array];
        array.forEach(element => {
            if(element.id === id){
                if(element.colapsed){
                    array[id].display = 'flex'
                    array[id].colapsed = false
                }else{
                    array[id].display = 'none'
                    array[id].colapsed = true
                }
            }else{
                array[element.id].display = 'none'
                array[element.id].colapsed = true
            }
        })
        this.setState({array});
    }

    changeBorder(){
        return {borderWidth:5,borderColor: 'red'}
    }

    render() {
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{height: StatusBar.currentHeight}}></View>
                <View style={{flex:2}}>
                    <HeaderView txtTitle={PT.FILTER_HEADER_TITLE} txtBtn={PT.FILTER_HEADER_BUTTON_CLEAR} displayIcon="flex" displayBtn="flex" nameIcon="cross" biblioIcon="" onPressIcon={() =>{this.props.navigation.goBack()}} onPressBtn={() =>{}} />
                </View>
                <View style={{flex:10, margin: 10}}>
                    <ScrollView>
                        <BtnTextIcon name={PT.FILTER_OPTIONS_PROJECT} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(0)} />
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, backgroundColor: 'yellow', display: this.state.array[0].display}}>
                            <TasksFilterView  txt='Olá senhor joão Cortez tudo bem????????'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <View style={{width:10}}></View>


                        </ScrollView>
                        
                        <BtnTextIcon name={PT.FILTER_OPTIONS_TEAM} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(1)} />
                        <View style={{height: 200, backgroundColor: 'lime', display: this.state.array[1].display, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>[THIS IS A VIEW]</Text>
                        </View>
                        
                        <BtnTextIcon name={PT.FILTER_OPTIONS_DATE} />
                        
                        <BtnTextIcon name={PT.FILTER_OPTIONS_TYPE} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(2)}/>
                        <View style={{height: 200, backgroundColor: 'green', display: this.state.array[2].display, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>[THIS IS A VIEW]</Text>
                        </View>
                        
                        <BtnTextIcon name={PT.FILTER_OPTIONS_STATE} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(3)}/>
                        <View style={{height: 200, backgroundColor: 'red', display: this.state.array[3].display, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>[THIS IS A VIEW]</Text>
                        </View>
                        
                        <BtnTextIcon name={PT.FILTER_OPTIONS_RESOURCES} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(4)}/>
                        <View style={{height: 200, backgroundColor: 'orange', display: this.state.array[4].display, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>[THIS IS A VIEW]</Text>
                        </View>
                        
                        <BtnTextIcon name={PT.FILTER_OPTIONS_TECHNICIAN_TYPE} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(5)}/>
                        <View style={{height: 200, backgroundColor: 'gray', display: this.state.array[5].display, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>[THIS IS A VIEW]</Text>
                        </View>
                        
                        <BtnTextIcon name={PT.FILTER_OPTIONS_TEAM} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(6)}/>
                        <View style={{height: 200, backgroundColor: 'lightblue', display: this.state.array[6].display, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>[THIS IS A VIEW]</Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default FiltersScreen
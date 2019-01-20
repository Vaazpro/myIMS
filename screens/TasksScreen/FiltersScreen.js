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
import ResourcesFilterView from '../../components/ResourcesFilterView'
import * as PT from "../../constants/labels/pt_labels"
import FilterService from "./FilterService"

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
            ],

            allProjects: [],
            allReleases: [],
            allTaskStates: [],
            allEmployees: [],
            allTeams: [],

            //arrays dos elementos apresentados
            allProjectsView: [],
            allReleasesView: [],
            allTaskStatesView: [],
            allEmployeesView: [],
            allTeamsView: [],

            //arrays dos elementos selecionados
            projectsSelected: [],
            releasesSelected: [],
            taskStatesSelected: [],
            employeesSelected: [],
            teamsSelected: [],

        }

        let self = this

        //get all projects
        new FilterService().getAllProjects(function(projects){
            self.setState({
                allProjects: projects
            })
        })

        //get all releases
        new FilterService().getAllReleases(function(releases){
            //console.log(releases)
            self.setState({
                allReleases: releases
            })
        })

        //get all tasks states
        new FilterService().getAllTaskStates(function(states){
            self.setState({
                allTaskStates: states
            })
        })

        //get all employees
        new FilterService().getAllEmployees(function(employees){
            console.log(employees)
            self.setState({
                allEmployees: employees
            })
            self.showAllEmployes(employees)
        })

        //get all teams
        new FilterService().getAllTeams(function(teams){
            self.setState({
                allTeams: teams
            })
        })

    }

    showAllEmployes = (employees) => {
        let allEmployeesView = [];
        employees.forEach((employee, ind) => {
            allEmployeesView.push(<ResourcesFilterView id={employee.attachmentId} txt={employee.name} key={ind}> </ResourcesFilterView>)
        })

        this.setState({
            allEmployeesView: allEmployeesView
        })
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
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, display: this.state.array[0].display}}>
                            <TasksFilterView  txt='Olá senhor joão Cortez tudo bem????????'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <View style={{width:10}}></View>


                        </ScrollView>
                        
                        <BtnTextIcon name={PT.FILTER_OPTIONS_DELIEVERY} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(1)} />
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, display: this.state.array[1].display}}>
                            <TasksFilterView  txt='Olá senhor joão Cortez tudo bem????????'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <View style={{width:10}}></View>
                        </ScrollView>
                        
                        <BtnTextIcon name={PT.FILTER_OPTIONS_DATE} />
                        
                        <BtnTextIcon name={PT.FILTER_OPTIONS_TYPE} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(2)}/>
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, backgroundColor: 'green', display: this.state.array[2].display}}>
                            <TasksFilterView  txt='Olá senhor joão Cortez tudo bem????????'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <View style={{width:10}}></View>
                        </ScrollView>
                        
                        <BtnTextIcon name={PT.FILTER_OPTIONS_STATE} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(3)}/>
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, backgroundColor: 'green', display: this.state.array[3].display}}>
                            <TasksFilterView  txt='Olá senhor joão Cortez tudo bem????????'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <View style={{width:10}}></View>
                        </ScrollView>
                        
                        <BtnTextIcon name={PT.FILTER_OPTIONS_RESOURCES} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(4)}/>
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 150, display: this.state.array[4].display}}>
                            {/* <ResourcesFilterView txt='Guilherme Fonseca'> </ResourcesFilterView>
                            <ResourcesFilterView txt='Guilherme Fonseca'> </ResourcesFilterView>
                            <ResourcesFilterView txt='Emanuel Francisco Sá Fernandes'> </ResourcesFilterView>
                            <ResourcesFilterView txt='myText'> </ResourcesFilterView>
                            <ResourcesFilterView txt='myText'> </ResourcesFilterView> */}
                            {this.state.allEmployeesView}
                        </ScrollView>
                        
                        <BtnTextIcon name={PT.FILTER_OPTIONS_TECHNICIAN_TYPE} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(5)}/>
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, backgroundColor: 'green', display: this.state.array[5].display}}>
                            <TasksFilterView  txt='Olá senhor joão Cortez tudo bem????????'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <TasksFilterView txt='myText'> </TasksFilterView>
                            <View style={{width:10}}></View>
                        </ScrollView>
                        
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
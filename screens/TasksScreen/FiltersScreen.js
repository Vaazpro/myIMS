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
import DatePicker from 'react-native-datepicker'

class FiltersScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        var date = new Date().toJSON()
        date = date.split("T")
        date = date[0]
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
            allTechTypes: ['MANAGER', 'TECHNICIAN', 'TESTER'],
            allTypes: ['PROJECT', 'RELEASE', 'USERSTORIE', 'BUG', 'TASK'],

            //arrays dos elementos apresentados
            allProjectsView: [],
            allReleasesView: [],
            allTaskStatesView: [],
            allEmployeesView: [],
            allTeamsView: [],
            allTechTypesView: [],
            allTypesView: [],

            //arrays dos elementos selecionados
            projectsSelected: [],
            releasesSelected: [],
            taskStatesSelected: [],
            employeesSelected: [],
            teamsSelected: [],

            //filters
            filters: this.props.navigation.getParam('filters'),

            dateStart: "",
            dateEnd: ""
        }
        
        let self = this

        console.log(this.state.filters)

        //get all projects
        new FilterService().getAllProjects(function(projects){
            self.setState({
                allProjects: projects
            })
            self.showAllProjects(projects);
        })

        //get all releases
        new FilterService().getAllReleases(function(releases){
            //console.log(releases)
            self.setState({
                allReleases: releases
            })

            self.showAllReleases(releases)
        })

        //get all tasks states
        new FilterService().getAllTaskStates(function(states){
            self.setState({
                allTaskStates: states
            })
            self.showAllTaskStates(states)
        })

        //get all employees
        new FilterService().getAllEmployees(function(employees){
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
            self.showAllTeams(teams)
        })
    }
    
    //TO DROP LATER
    componentWillMount(){
        if(this.state.filters == undefined){
            this.setState({
                filters: {
                     projetos: [],
                     entregas: [],
                     datas: [],
                     tipos: [],
                     estados: [],
                     recursos: [],
                     tectipos: [],
                     equipas:[],
                }
            })
        }
    }

    componentDidMount(){
        
        //Componentes que nao recorrem a serviços API, são estaticos
        this.showAllTechTypes(this.state.allTechTypes)
        this.showAllTypes(this.state.allTypes)
        
    }

    showAllDates = (dateStart, dateEnd) => {

        let filters = this.state.filters

        filters.datas[0] = dateStart
        filters.datas[1] = dateEnd

        this.setState({
            filters: filters
        })
    }

    arrayFunction = (id, array, key) => {
        let filters = {}
        if(this.state.filters != undefined){
            filters = this.state.filters
        }else{
            filters = {
                projetos: [],
                entregas: [],
                datas: [],
                tipos: [],
                estados: [],
                recursos: [],
                tectipos: [],
                equipas:[],
            }
        }

        if(array.includes(id)){
            //pop ao project
            array.forEach((element,index)=>{
                if(element == id){
                    array.pop(index)
                }
            })
            filters[key] = array
            //setState ao filters
            this.setState({
                filters: filters
            })
        }else{
            //push
            array.push(id)
            //setState ao filters
            filters[key] = array
            //setState ao filters
            this.setState({
                filters: filters
            })
        }
    }

    //Inserir VIEWS

    showAllEmployes = (employees) => {
        let allEmployeesView = [];
        if(this.state.filters == undefined){
            employees.forEach((employee, ind) => {
                allEmployeesView.push(<ResourcesFilterView checkArray={()=>{this.arrayFunction(employee.id, recursos, "recursos")}} clicked={false} id={employee.attachmentId} txt={employee.name} key={ind}> </ResourcesFilterView>)
            })
        }else{
            let recursos = this.state.filters.recursos
            employees.forEach((employee, ind) => {
                if(recursos.includes(employee.id)){
                    allEmployeesView.push(<ResourcesFilterView checkArray={()=>{this.arrayFunction(employee.id, recursos, "recursos")}} clicked={true} id={employee.attachmentId} txt={employee.name} key={ind}> </ResourcesFilterView>)
                }else{
                    allEmployeesView.push(<ResourcesFilterView checkArray={()=>{this.arrayFunction(employee.id, recursos, "recursos")}} clicked={false} id={employee.attachmentId} txt={employee.name} key={ind}> </ResourcesFilterView>)
                }
            })
        }
        
        this.setState({
            allEmployeesView: allEmployeesView
        })
    }

    showAllProjects = (projects) => {
        let allProjectsView = [];
        if(this.state.filters == undefined){
            projects.forEach((project, ind) => {
                allProjectsView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(project.id, projetos, "projetos")}} clicked={false} key={ind}  txt={project.name}> </TasksFilterView>)
            })
        }else{
            let projetos = this.state.filters.projetos
            projects.forEach((project, ind) => {
                if(projetos.includes(project.id)){
                    allProjectsView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(project.id, projetos, "projetos")}} clicked={true} key={ind}  txt={project.name}> </TasksFilterView>)
                }else{
                    allProjectsView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(project.id, projetos, "projetos")}} clicked={false} key={ind}  txt={project.name}> </TasksFilterView>)
                }
            })
        }
        
        this.setState({
            allProjectsView: allProjectsView
        })
    }

    showAllReleases = (releases) => {
        let allReleasesView = []
        if(this.state.filters == undefined){
            releases.forEach((release, ind) => {
                allReleasesView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(release.id, entregas, "entregas")}} clicked={false} key={ind}  txt={release.name}> </TasksFilterView>)
            })
        }else{
            let entregas = this.state.filters.entregas
            releases.forEach((release, ind) => {
                if(entregas.includes(release.id)){
                    allReleasesView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(release.id, entregas, "entregas")}} clicked={true} key={ind}  txt={release.name}> </TasksFilterView>)
                }else{
                    allReleasesView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(release.id, entregas, "entregas")}} clicked={false} key={ind}  txt={release.name}> </TasksFilterView>)
                }
            })
        }

        this.setState({
            allReleasesView: allReleasesView
        })
    }

    
    
    showAllTaskStates = (taskStates) => {
        let allTaskStatesView = []
        if(this.state.filters == undefined){
            taskStates.forEach((state, ind) => {
                allTaskStatesView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(state.id, estados, "estados")}} clicked={false} key={ind}  txt={state.id}> </TasksFilterView>)
            })
        }else{
            let estados = this.state.filters.estados
            taskStates.forEach((state, ind) => {
                if(estados.includes(state.id)){
                    allTaskStatesView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(state.id, estados, "estados")}} clicked={true} key={ind}  txt={state.id}> </TasksFilterView>)
                }else{
                    allTaskStatesView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(state.id, estados, "estados")}} clicked={false} key={ind}  txt={state.id}> </TasksFilterView>)
                }
            })
        }
        
        this.setState({
            allTaskStatesView: allTaskStatesView
        })
    }

    showAllTeams = (teams) => {
        let allTeamsView = []
        if(this.state.filters == undefined){
            teams.forEach((team, ind) => {
                allTeamsView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(team.id, equipas, "equipas")}} clicked={false} key={ind}  txt={team.name}> </TasksFilterView>)
            })
        }else{
            let equipas = this.state.filters.equipas
            teams.forEach((team, ind) => {
                if(equipas.includes(team.id)){
                    allTeamsView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(team.id, equipas, "equipas")}} clicked={true} key={ind}  txt={team.name}> </TasksFilterView>)
                }else{
                    allTeamsView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(team.id, equipas, "equipas")}} clicked={false} key={ind}  txt={team.name}> </TasksFilterView>)
                }
            })
        }

        this.setState({
            allTeamsView: allTeamsView
        })
    }

    showAllTechTypes = (techTypes) => {
        let allTechTypesView = []
        if(this.state.filters == undefined){
            techTypes.forEach((tech, ind)=>{
                allTechTypesView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(tech, tectipos, "tectipos")}} clicked={false} key={ind}  txt={tech}> </TasksFilterView>)
            })
        }else{
            let tectipos = this.state.filters.tectipos
            techTypes.forEach((tech, ind)=>{
                if(tectipos.includes(tech)){
                    allTechTypesView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(tech, tectipos, "tectipos")}} clicked={true} key={ind}  txt={tech}> </TasksFilterView>)
                }else{
                    allTechTypesView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(tech, tectipos, "tectipos")}} clicked={false} key={ind}  txt={tech}> </TasksFilterView>)
                }  
            })
        }
        this.setState({
            allTechTypesView: allTechTypesView
        })
    }

    showAllTypes = (types) => {
        let allTypesView = []
        if(this.state.filters == undefined ){
            types.forEach((type, ind) => {
                allTypesView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(type, tipos, "tipos")}} clicked={false} key={ind}  txt={type}> </TasksFilterView>)
            })
        }else{
            let tipos = this.state.filters.tipos
            types.forEach((type, ind) => {
                if(tipos.includes(type)){
                    allTypesView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(type, tipos, "tipos")}} clicked={true} key={ind}  txt={type}> </TasksFilterView>)
                }else{
                    allTypesView.push(<TasksFilterView checkArray={()=>{this.arrayFunction(type, tipos, "tipos")}} clicked={false} key={ind}  txt={type}> </TasksFilterView>)
                }
            })
        }
        this.setState({
            allTypesView: allTypesView
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

    refreshPage = (filters) => {
        
        const { navigation } = this.props
        navigation.state.params.refPage(filters)
        navigation.goBack()
        /* console.log("XXXXXXXXXXXXXXXXX")
        console.log(filters) */
    }

    async clear() {
        await this.setState({
            filters: undefined,
            allProjects: [],
            allReleases: [],
            allTaskStates: [],
            allEmployees: [],
            allTeams: [],
            allTechTypes: ['MANAGER', 'TECHNICIAN', 'TESTER'],
            allTypes: ['PROJECT', 'RELEASE', 'USERSTORIE', 'BUG', 'TASK'],

            //arrays dos elementos apresentados
            allProjectsView: [],
            allReleasesView: [],
            allTaskStatesView: [],
            allEmployeesView: [],
            allTeamsView: [],
            allTechTypesView: [],
            allTypesView: [],

            //arrays dos elementos selecionados
            projectsSelected: [],
            releasesSelected: [],
            taskStatesSelected: [],
            employeesSelected: [],
            teamsSelected: [],

            dateStart: "",
            dateEnd: ""
        })
        this.refreshPage(this.state.filters)
    }

    render() {
        
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{height: StatusBar.currentHeight}}></View>
                <View style={{flex:2}}>
                    <HeaderView txtTitle={PT.FILTER_HEADER_TITLE} txtBtn={PT.FILTER_HEADER_BUTTON_CLEAR} displayIcon="flex" displayBtn="flex" nameIcon="cross" biblioIcon="" onPressIcon={() => {this.refreshPage(this.state.filters)}} onPressBtn={() =>{this.clear()}} />
                </View>
                <View style={{flex:10, margin: 10}}>
                    <ScrollView>
                        <BtnTextIcon activeOpacity={0.2} name={PT.FILTER_OPTIONS_PROJECT} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(0)} />
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, display: this.state.array[0].display}}>
                            {this.state.allProjectsView}
                            <View style={{width:10}}></View>


                        </ScrollView>
                        
                        <BtnTextIcon activeOpacity={0.2} name={PT.FILTER_OPTIONS_DELIEVERY} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(1)} />
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, display: this.state.array[1].display}}>
                            {this.state.allReleasesView}
                            <View style={{width:10}}></View>
                        </ScrollView>
                        
                        <BtnTextIcon activeOpacity={1} name={PT.FILTER_OPTIONS_DATE} />
                        <View style={{height:5}}></View>
                        <View style={{height: 50, flexDirection: 'row'}}>
                            <View style={{flex:1, alignItems:'flex-start'}}>
                                <DatePicker
                                    style={{width:'90%', height: 50}}
                                    date={this.state.dateStart}
                                    mode="date"
                                    placeholder="select start date"
                                    format="YYYY-MM-DD"
                                    //minDate=""
                                    maxDate={this.state.dateEnd}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                    },
                                    btnTextConfirm: {
                                        color: '#007FB7'
                                    }
                                    // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => {
                                        this.setState({dateStart: date})
                                        this.showAllDates(date, this.state.dateEnd)
                                    }}
                                />
                            </View>
                            
                            <View style={{flex:1, alignItems:'flex-end'}}>
                                <DatePicker
                                    style={{width:'90%', height: 50}}
                                    date={this.state.dateEnd}
                                    mode="date"
                                    placeholder="select end date"
                                    format="YYYY-MM-DD"
                                    minDate={this.state.dateStart}
                                    //maxDate="2025-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                    },
                                    btnTextConfirm: {
                                        color: '#007FB7'
                                    }
                                    // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => {
                                        this.setState({dateEnd: date})
                                        this.showAllDates(this.state.dateStart, date)
                                    }}
                                />
                            </View>
                        </View>

                        <BtnTextIcon activeOpacity={0.2} name={PT.FILTER_OPTIONS_TYPE} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(2)}/>
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, display: this.state.array[2].display}}>
                            {this.state.allTypesView}
                            <View style={{width:10}}></View>
                        </ScrollView>
                        
                        <BtnTextIcon activeOpacity={0.2} name={PT.FILTER_OPTIONS_STATE} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(3)}/>
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, display: this.state.array[3].display}}>
                            {this.state.allTaskStatesView}
                            <View style={{width:10}}></View>
                        </ScrollView>
                        
                        <BtnTextIcon activeOpacity={0.2} name={PT.FILTER_OPTIONS_RESOURCES} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(4)}/>
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 150, display: this.state.array[4].display}}>
                            {this.state.allEmployeesView}
                            <View style={{width:10}}></View>
                        </ScrollView>
                        
                        <BtnTextIcon activeOpacity={0.2} name={PT.FILTER_OPTIONS_TECHNICIAN_TYPE} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(5)}/>
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, display: this.state.array[5].display}}>
                            {this.state.allTechTypesView}
                            <View style={{width:10}}></View>
                        </ScrollView>
                        
                        <BtnTextIcon activeOpacity={0.2} name={PT.FILTER_OPTIONS_TEAM} icon='arrow-down' biblio='' onPressBtn={() => this.optionsHandler(6)}/>
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, display: this.state.array[6].display}}>
                            {this.state.allTeamsView}
                            <View style={{width:10}}></View>
                        </ScrollView>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default FiltersScreen
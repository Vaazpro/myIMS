import React, { Component } from 'react'
import {
    ScrollView,
    View,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
    Platform,
    Dimensions
} from 'react-native'
import HeaderView from '../../components/HeaderView'
import BtnTextIcon from '../../components/BtnTextIcon'
import TasksFilterView from '../../components/TasksFilterView'
import ResourcesFilterView from '../../components/ResourcesFilterView'
import * as PT from "../../constants/labels/pt_labels"
import FilterService from "./FilterService"
import DatePicker from 'react-native-datepicker'
import * as CONST from "../../constants/labels/constants"
import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles'


/** PROPS
 * navigation.getParam('profile')
 * navigation.getParam('filters')
 */

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
            dateEnd: "",

            //ActivityIndicator
            zIndex: 30,
            animating: true,
            countServices: 0,
            backgroundColor: Colors.LOADING_BACKGROUND,

            //iconChecked
            existsProject: 0,
            existsReleases: 0,
            existsTypes: 0,
            existsStates: 0,
            existsResources: 0,
            existsTecType: 0,
            existsTeams: 0
        }
    }
    
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
        }else {
            if(this.state.filters.datas[0]!= ''){
                this.setState({
                    dateStart: this.state.filters.datas[0]
                })
            }
            if(this.state.filters.datas[1]!= ''){
                this.setState({
                    dateEnd: this.state.filters.datas[1]
                })
            }
            this.setIconFiltersTab('projetos')
            this.setIconFiltersTab('entregas')
            this.setIconFiltersTab('tipos')
            this.setIconFiltersTab('estados')
            this.setIconFiltersTab('projetos')
            this.setIconFiltersTab('recursos')
            this.setIconFiltersTab('tectipos')
            this.setIconFiltersTab('equipas')
        }
    }

    componentDidMount(){
        let self = this

        //get all projects
        new FilterService().getAllProjects(function(projects){
            self.setState({
                allProjects: projects,
                countServices: self.state.countServices +1
            },self.verifyAllServices())

            self.showAllProjects(projects);
        })

        //get all releases
        new FilterService().getAllReleases(function(releases){
            self.setState({
                allReleases: releases,
                countServices: self.state.countServices +1
            },self.verifyAllServices())

            self.showAllReleases(releases)
        })

        //get all tasks states
        new FilterService().getAllTaskStates(function(states){
            self.setState({
                allTaskStates: states,
                countServices: self.state.countServices +1
            },self.verifyAllServices())
            self.showAllTaskStates(states)
        })

        //get all employees
        new FilterService().getAllEmployees(function(employees){
            self.setState({
                allEmployees: employees,
                countServices: self.state.countServices +1
            },self.verifyAllServices())
            self.showAllEmployes(employees)
        })

        //get all teams
        new FilterService().getAllTeams(function(teams){
            self.setState({
                allTeams: teams,
                countServices: self.state.countServices +1
            },self.verifyAllServices())
            self.showAllTeams(teams)
        })
        //Componentes que nao recorrem a serviços API, são estaticos
        this.showAllTechTypes(this.state.allTechTypes)
        this.showAllTypes(this.state.allTypes)
    }

    verifyAllServices(){
        if(this.state.countServices == 4){
            this.setState({
                countServices: 5,
                zIndex:-300,
                animating: false, 
                backgroundColor: 'transparent'
            })
        }
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
            //remover ao array
            array.forEach((element,index)=>{
                if(element == id){
                    array.splice(index, 1);
                }
            })
            filters[key] = array
            //setState ao filters
            this.setState({
                filters: filters
            })
            this.setIconFiltersTab(key)
        }else{
            //adicionar ao array
            array.push(id)
            filters[key] = array
            //setState ao filters
            this.setState({
                filters: filters
            })
            this.setIconFiltersTab(key)
        }
    }

    setIconFiltersTab = (filter) => {
        switch(filter){
            case 'projetos':
                if(this.state.filters.projetos.length >0){
                    this.setState({
                        existsProject: 1
                    })
                }else {
                    this.setState({
                        existsProject: 0
                    })
                }
            break
            case 'entregas':
                if(this.state.filters.entregas.length >0){
                    this.setState({
                        existsReleases: 1
                    })
                }else {
                    this.setState({
                        existsReleases: 0
                    })
                }
            break    
            case 'tipos':
                if(this.state.filters.tipos.length >0){
                    this.setState({
                        existsTypes: 1
                    })
                }else {
                    this.setState({
                        existsTypes: 0
                    })
                }
            break
            case 'estados':
                if(this.state.filters.estados.length >0){
                    this.setState({
                        existsStates: 1
                    })
                }else {
                    this.setState({
                        existsStates: 0
                    })
                }
            break 
            case 'recursos':
                if(this.state.filters.recursos.length >0){
                    this.setState({
                        existsResources: 1
                    })
                }else {
                    this.setState({
                        existsResources: 0
                    })
                }
            break    
            case 'tectipos':
                if(this.state.filters.tectipos.length >0){
                    this.setState({
                        existsTecType: 1
                    })
                }else {
                    this.setState({
                        existsTecType: 0
                    })
                }
            break
            case 'equipas':
                if(this.state.filters.equipas.length >0){
                    this.setState({
                        existsTeams: 1
                    })
                }else {
                    this.setState({
                        existsTeams: 0
                    })
                }
            break     
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

    refreshPage = (filters) => {
        const { navigation } = this.props
        navigation.state.params.refPage(filters)
        navigation.goBack()
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

            //reinicializar os arrays dos elementos apresentados if any
            allProjectsView: [],
            allReleasesView: [],
            allTaskStatesView: [],
            allEmployeesView: [],
            allTeamsView: [],
            allTechTypesView: [],
            allTypesView: [],

            //reinicializar os arrays dos elementos selecionados if any
            projectsSelected: [],
            releasesSelected: [],
            taskStatesSelected: [],
            employeesSelected: [],
            teamsSelected: [],
            
            //reinicializar as datas selecionadas if any
            dateStart: "",
            dateEnd: ""
        })
        this.refreshPage(this.state.filters)
    }

    render() {
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
            <SafeAreaView style={[Styles.flex1, {backgroundColor: Colors.SPARKLE_IT_WHITE}]}>
                <View style={{height: StatusBar.currentHeight}}></View>
                <View style={[{backgroundColor:this.state.backgroundColor, zIndex: this.state.zIndex, height:Dimensions.get('window').height}, Styles.filtersScreenLoadingBackgrond]}>
                    <ActivityIndicator animating= {this.state.animating} size={Platform.OS === 'ios'? 'small':60 } color={Colors.SPARKLE_IT_MAINCOLOR}></ActivityIndicator>
                </View>
                <View style={Styles.flex2}>
                    <HeaderView txtTitle={PT.FILTER_HEADER_TITLE} txtBtn={PT.FILTER_HEADER_BUTTON_CLEAR} displayIcon="flex" displayBtn="flex" nameIcon={CONST.ICON_NAME_CROSS} biblioIcon={CONST.LIBRARY_0} onPressIcon={() => {this.refreshPage(this.state.filters)}} onPressBtn={() =>{this.clear()}} />
                </View>
                <View style={{flex:10, margin: 10}}>
                    <ScrollView>
                        <BtnTextIcon exists={this.state.existsProject} activeOpacity={0.2} name={PT.FILTER_OPTIONS_PROJECT} icon={CONST.ICON_NAME_ARROWDOWN_FILTERS} biblio={CONST.LIBRARY_0} onPressBtn={() => this.optionsHandler(0)} />
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, display: this.state.array[0].display}}>
                            {this.state.allProjectsView}
                            <View style={{width:10}}></View>
                        </ScrollView>
                        
                        <BtnTextIcon exists={this.state.existsReleases} activeOpacity={0.2} name={PT.FILTER_OPTIONS_DELIEVERY} icon={CONST.ICON_NAME_ARROWDOWN_FILTERS}  biblio={CONST.LIBRARY_0} onPressBtn={() => this.optionsHandler(1)} />
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, display: this.state.array[1].display}}>
                            {this.state.allReleasesView}
                            <View style={{width:10}}></View>
                        </ScrollView>
                        
                        <BtnTextIcon exists={0} activeOpacity={1} name={PT.FILTER_OPTIONS_DATE} />
                        <View style={{height:5}}></View>
                        <View style={Styles.filtersScreenDatePickersMainContainer}>
                            <View style={Styles.filtersScreenDatePickersInnerLeftContainer}>
                                <DatePicker
                                    locale={'PT'}
                                    style={Styles.filtersScreenCalendar}
                                    date={this.state.dateStart}
                                    mode="date"
                                    placeholder = {PT.FILTER_CALENDAR_PLACEHOLDER_START}
                                    format="YYYY-MM-DD"
                                    //minDate=""
                                    maxDate= {this.state.dateEnd == "" ? undefined : this.state.dateEnd}
                                    confirmBtnText = {PT.FILTER_CALENDAR_ALERT_CONFIRMATION_YES}
                                    cancelBtnText = {PT.FILTER_CALENDAR_ALERT_CONFIRMATION_NO}
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
                                        color: Colors.SPARKLE_IT_MAINCOLOR
                                    }
                                    // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => {
                                        this.setState({dateStart: date})
                                        this.showAllDates(date, this.state.dateEnd)
                                    }}
                                />
                            </View>
                            
                            <View style={Styles.filtersScreenDatePickersInnerRightContainer}>
                                <DatePicker
                                    locale={'PT'}
                                    style={Styles.filtersScreenCalendar}
                                    date={this.state.dateEnd}
                                    mode="date"
                                    placeholder = {PT.FILTER_CALENDAR_PLACEHOLDER_END}
                                    format="YYYY-MM-DD"
                                    minDate={this.state.dateStart == "" ? undefined : this.state.dateStart}
                                    //maxDate="2025-06-01"
                                    confirmBtnText = {PT.FILTER_CALENDAR_ALERT_CONFIRMATION_YES}
                                    cancelBtnText = {PT.FILTER_CALENDAR_ALERT_CONFIRMATION_NO}
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
                                        color: Colors.SPARKLE_IT_MAINCOLOR
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

                        <BtnTextIcon exists={this.state.existsTypes} activeOpacity={0.2} name={PT.FILTER_OPTIONS_TYPE} icon={CONST.ICON_NAME_ARROWDOWN_FILTERS}  biblio={CONST.LIBRARY_0} onPressBtn={() => this.optionsHandler(2)}/>
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, display: this.state.array[2].display}}>
                            {this.state.allTypesView}
                            <View style={{width:10}}></View>
                        </ScrollView>
                        
                        <BtnTextIcon exists={this.state.existsStates} activeOpacity={0.2} name={PT.FILTER_OPTIONS_STATE} icon={CONST.ICON_NAME_ARROWDOWN_FILTERS}  biblio={CONST.LIBRARY_0} onPressBtn={() => this.optionsHandler(3)}/>
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, display: this.state.array[3].display}}>
                            {this.state.allTaskStatesView}
                            <View style={{width:10}}></View>
                        </ScrollView>
                        
                        <BtnTextIcon exists={this.state.existsResources} activeOpacity={0.2} name={PT.FILTER_OPTIONS_RESOURCES} icon={CONST.ICON_NAME_ARROWDOWN_FILTERS}  biblio={CONST.LIBRARY_0} onPressBtn={() => this.optionsHandler(4)}/>
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 150, display: this.state.array[4].display}}>
                            {this.state.allEmployeesView}
                            <View style={{width:10}}></View>
                        </ScrollView>
                        
                        <BtnTextIcon exists={this.state.existsTecType} activeOpacity={0.2} name={PT.FILTER_OPTIONS_TECHNICIAN_TYPE} icon={CONST.ICON_NAME_ARROWDOWN_FILTERS}  biblio={CONST.LIBRARY_0} onPressBtn={() => this.optionsHandler(5)}/>
                        <ScrollView alwaysBounceHorizontal={true} horizontal={true} style={{height: 100, display: this.state.array[5].display}}>
                            {this.state.allTechTypesView}
                            <View style={{width:10}}></View>
                        </ScrollView>
                        
                        <BtnTextIcon exists={this.state.existsTeams} activeOpacity={0.2} name={PT.FILTER_OPTIONS_TEAM} icon={CONST.ICON_NAME_ARROWDOWN_FILTERS}  biblio={CONST.LIBRARY_0} onPressBtn={() => this.optionsHandler(6)}/>
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
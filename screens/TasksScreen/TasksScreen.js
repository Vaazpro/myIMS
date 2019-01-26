import React, { Component } from 'react'
import {
    Text,
    View,
    StatusBar,
    SafeAreaView, 
    TouchableOpacity,
    Button,
    ScrollView,
    Modal,
    Picker,
    Platform
} from 'react-native'
import IconSearch from '../../components/IconSearch'
import HeaderView from '../../components/HeaderView'
import TaskView from '../../components/TaskView'
import TaskService from './TaskService'
import ProfileService from '../ProfileScreen/ProfileService'
import * as PT from "../../constants/labels/pt_labels"
import * as CONST from "../../constants/labels/constants"
import Colors from '../../constants/Colors'
import Styles from '../../constants/Styles'

/** PROPS
 * navigation.state
 * navigation.navigate('profile')
 * navigation.navigate('filters')
 */

class TasksScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state={
            profile:{},
            account: {
                companies:[
                    {
                        name:''
                    }
                ]
            },
            modalVisible: false,
            tasks: [],
            selectedTask: {},
            selectedState: '',
            //arrays dos estados das tarefas
            open: [],
            planned: [],
            in_progress: [],
            in_testing: [],
            done: [],
            filters: undefined,
            
            //Icon Color
            color: Colors.SPARKLE_IT_BLACK
        }

        let self = this
        new ProfileService().getProfile(function(profile){
            self.setState({
                profile: profile
            })
         })
         new ProfileService().getAccount(function(account){
             self.setState({
                 account: account
             })
         })
    }

    componentDidMount(){
        this.showTasks(this.state.filters)
    }

    showTasks = (filters) => {
        if(filters == undefined){
            this.getAllMyTasks()
            this.setState({
                color: Colors.SPARKLE_IT_BLACK
            })
        }else{
            this.getFilteredMyTasks()
            if(filters.projetos.length>0 || filters.entregas.length>0 || filters.datas.length>0 || filters.tipos.length>0 ||
                filters.estados.length>0 || filters.recursos.length>0 || filters.tectipos.length>0 || filters.equipas.length>0  ){
                this.setState({
                    color: Colors.SPARKLE_IT_MAINCOLOR
                })
            }else{
                this.setState({
                    color: Colors.SPARKLE_IT_BLACK
                })
            }
        }
    }
    
    //Função que vai buscar todas as tarefas existentes do Utilizador
    getAllMyTasks = () => {
        let self = this
        new TaskService().getMyTasks(function(response){
            self.setState({
                tasks: response
            })
            self.fillAllTasksStates()
        }, function(error){
            console.log(error)
        })
    }

    //Função que vai buscar as tarefas filtradas do Utilizador
    getFilteredMyTasks = () => {
        let self = this
        new TaskService().getMyFilteredTasks((this.state.filters),function(response){
            self.setState({
                tasks: response
            }, self.fillAllTasksStates)
        }, function(error){
            console.log(error)
        })
    }

    fillAllTasksStates = () => {
        let open = []
        let planned= []
        let in_progress= []
        let in_testing= []
        let done= [] 
        this.state.tasks.forEach(state => {
            
            if(state.tasks.length > 0){
                switch(state.id){
                    case 'OPEN': state.tasks.forEach(task => {
                        open.push(<TaskView taskHandler={()=>{this.showModalStateTasks(task, state.id)}} key={task.id} txt={task.name} time={task.hours + 'h'} task={task} color={Colors.SPARKLE_IT_MAINCOLOR}></TaskView>)
                    })
                    break;
                    case 'PLANNED': state.tasks.forEach(task => {
                        planned.push(<TaskView taskHandler={()=>{this.showModalStateTasks(task, state.id)}} key={task.id} txt={task.name} time={task.hours + 'h'} task={task} color={Colors.SPARKLE_IT_MAINCOLOR}></TaskView>)
                    })
                    break;
                    case 'IN_PROGRESS': state.tasks.forEach(task => {
                        in_progress.push(<TaskView taskHandler={()=>{this.showModalStateTasks(task, state.id)}} key={task.id} txt={task.name} time={task.hours + 'h'} task={task} color={Colors.SPARKLE_IT_MAINCOLOR}></TaskView>)
                    })
                    break;
                    case 'IN_TESTING': state.tasks.forEach(task => {
                        in_testing.push(<TaskView taskHandler={()=>{this.showModalStateTasks(task, state.id)}} key={task.id} txt={task.name} time={task.hours + 'h'} task={task} color={Colors.SPARKLE_IT_MAINCOLOR}></TaskView>)
                    })
                    break;
                    case 'DONE': 
                    state.tasks.forEach(task => {
                        done.push(<TaskView taskHandler={()=>{this.showModalStateTasks(task, state.id)}} key={task.id} txt={task.name} time={task.hours + 'h'} task={task} color={Colors.SPARKLE_IT_MAINCOLOR}></TaskView>)
                    })
                    break;
                }
            }
            
        })

        this.setState({
            open: open,
            planned: planned,
            in_progress: in_progress,
            in_testing: in_testing,
            done: done
        })
    }

    /* método que vai estar incluido em cada tarefa */
    /* No clique de uma tarefa, o modal fica visivel, guardamos a tarefa selecionada numa variavel de state e guardamos o "estado da tarefa" anterior numa variavel state */
    showModalStateTasks = (task, state) => {
        this.setState({
            modalVisible:true,
            selectedTask: task,
            selectedState: state
        })
    }

    /* Metodo que atualiza o estado da tarefa, quando se clica em confirmar a alteraçáo do estado no Modal */
    /* Quando a alteraçao ocorre, chama-se a função getMyTasks para atualizar as listas que imprimem para o ecrã */
    updateTaskState = (task, state, filterbool) =>{
        var newState = state;
        let self = this
        new TaskService().updateTask(task, newState, function(data){
            if(!filterbool){
                self.getAllMyTasks()
            }else{
                self.getFilteredMyTasks()
            }
        }, function(error){
            console.log(error)
        })
    }

    handleRefPage = async (filters) =>{
        await this.setState({
            filters: filters
        })
        this.showTasks(this.state.filters)
    }

    render() {
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
           <SafeAreaView style={[Styles.flex1, {backgroundColor: Colors.SPARKLE_IT_HEADERGRAY}]}> 
                <View style={{height: StatusBar.currentHeight}}></View>
                <View style={Styles.tasksScreenHeaderMainContainer}>
                    <View style={Styles.tasksScreenHeaderViewContainer}>
                        <HeaderView txtTitle={PT.TASKS_HEADER_TITLE} txtBtn="" displayIcon="none" displayBtn="none" nameIcon="" biblioIcon={CONST.LIBRARY_0}onPressIcon={() =>{}} onPressBtn={() =>{}} />
                    </View>
                    <View style={Styles.tasksScreenIconBorder}>
                        <View style={[Styles.flex1, {backgroundColor: Colors.SPARKLE_IT_WHITE}]}></View>
                        <View style={Styles.tasksScreenIconHolder}>
                            <TouchableOpacity onPress={() =>{this.props.navigation.navigate('filters', {profile: this.state.profile, filters: this.state.filters, refPage: this.handleRefPage  })}} style={{justifyContent:'center'}}>
                                <IconSearch name={CONST.ICON_NAME_SLIDERS} biblio={CONST.LIBRARY_0} size={22} color={this.state.color}/>
                            </TouchableOpacity>    
                        </View>
                    </View>
                </View>
                <View style={{flex:10}}>
                    <View style={Styles.tasksScreenStateContainer}>
                        <Text>{PT.TASKS_STATE_OPEN}</Text>
                    </View>
                    <View style={{flex:4, backgroundColor: Colors.SPARKLE_IT_WHITE}}>
                        <ScrollView horizontal={true} alwaysBounceHorizontal={true}>
                         {this.state.open}
                         </ScrollView>
                    </View>
                    <View style={Styles.tasksScreenStateContainer}>
                        <Text>{PT.TASKS_STATE_PLANNED}</Text>
                    </View>
                    <View style={{flex:4, backgroundColor: Colors.SPARKLE_IT_WHITE}}>
                    <ScrollView horizontal={true} alwaysBounceHorizontal={true}>
                        {this.state.planned}
                        </ScrollView>
                    </View>
                    <View style={Styles.tasksScreenStateContainer}>
                        <Text>{PT.TASKS_STATE_IN_PROGRESS}</Text>
                    </View>
                    <View style={{flex:4, backgroundColor: Colors.SPARKLE_IT_WHITE}}>
                    <ScrollView horizontal={true} alwaysBounceHorizontal={true}>
                        {this.state.in_progress}
                        </ScrollView>
                    </View>
                    <View style={Styles.tasksScreenStateContainer}>
                        <Text>{PT.TASKS_STATE_IN_TESTING}</Text>
                    </View>
                    <View style={{flex:4, backgroundColor: Colors.SPARKLE_IT_WHITE}}>
                    <ScrollView horizontal={true} alwaysBounceHorizontal={true}>
                         {this.state.in_testing}
                         </ScrollView>
                    </View>
                    <View style={Styles.tasksScreenStateContainer}>
                        <Text>{PT.TASKS_STATE_DONE}</Text>
                    </View>
                    <View style={{flex:4, backgroundColor: Colors.SPARKLE_IT_WHITE}}>
                    <ScrollView horizontal={true} alwaysBounceHorizontal={true}>
                         {this.state.done}
                         </ScrollView>
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={[Styles.shadow, Styles.tasksScreenModalMainContainer]}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={[{color: Colors.SPARKLE_IT_MAINCOLOR}, Styles.font20]}>{PT.MODAL_TITTLE}</Text>
                        </View>
                        <View style={{ flex:5, justifyContent: Platform.OS === 'ios' ? 'flex-start' : 'center', alignItems:'center'}}>
                            <Picker
                                selectedValue={this.state.selectedState}
                                style={Styles.tasksScreenPicker}
                                onValueChange={(itemValue, itemIndex) => this.setState({selectedState: itemValue})} mode="dropdown">
                                <Picker.Item label={PT.MODAL_TASK_STATE_OPEN} value="OPEN" />
                                <Picker.Item label={PT.MODAL_TASK_STATE_PLANNED} value="PLANNED" />
                                <Picker.Item label={PT.MODAL_TASK_STATE_IN_PROGRESS} value="IN_PROGRESS" />
                                <Picker.Item label={PT.MODAL_TASK_STATE_IN_TESTING} value="IN_TESTING" />
                                <Picker.Item label={PT.MODAL_TASK_STATE_DONE} value="DONE" />
                            </Picker>
                        </View>
                        <View style={Styles.tasksScreenPickerButtonsContainer}>
                            <View style={Styles.tasksScreenCancelButton}>
                                <Button title={PT.MODAL_CANCEL} onPress={() => {this.setState({modalVisible: false})}} color={Colors.SPARKLE_IT_MAINCOLOR}></Button>
                            </View>
                            <View style={Styles.tasksScreenAcceptButton}>
                                <Button title={PT.MODAL_CONFIRM} onPress={() => {
                                    this.setState({modalVisible: false})
                                    this.updateTaskState(this.state.selectedTask, this.state.selectedState, this.state.filters == undefined ? false: true)
                                }} color={Colors.SPARKLE_IT_MAINCOLOR}></Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        )
    }
}

export default TasksScreen
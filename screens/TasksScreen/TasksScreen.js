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
            done: []
        }
        this.getMyTasks()

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

    getMyTasks = () => {
        let self = this
        new TaskService().getMyTasks(function(response){
            //log in com sucesso
            //self.props.navigation.navigate('profile')
            console.log("=======SUCCESS========")
            console.log(response)
            self.setState({
                tasks: response
            })
            self.fillAllTasksStates()
        }, function(error){
            //erro ao fazer login
            console.log("=======ERROR========")
            console.log(error)
        })
    }

    fillAllTasksStates = () => {
        let open = []
        let planned= []
        let in_progress= []
        let in_testing= []
        let done= [] 

        console.log("==============================")
            console.log(this.state.tasks
                
                
                )
            console.log("///////////////////////////////")

        this.state.tasks.forEach(state => {
            
            if(state.tasks.length > 0){
                switch(state.id){
                    case 'OPEN': state.tasks.forEach(task => {
                        open.push(<TaskView taskHandler={()=>{this.showModalStateTasks(task, state.id)}} key={task.id} txt={task.name} time={task.hours + 'h'} users={task.users} color='blue'></TaskView>)
                    })
                    break;
                    case 'PLANNED': state.tasks.forEach(task => {
                        planned.push(<TaskView taskHandler={()=>{this.showModalStateTasks(task, state.id)}} key={task.id} txt={task.name} time={task.hours + 'h'} users={task.users} color='blue'></TaskView>)
                    })
                    break;
                    case 'IN_PROGRESS': state.tasks.forEach(task => {
                        in_progress.push(<TaskView taskHandler={()=>{this.showModalStateTasks(task, state.id)}} key={task.id} txt={task.name} time={task.hours + 'h'} users={task.users} color='blue'></TaskView>)
                    })
                    break;
                    case 'IN_TESTING': state.tasks.forEach(task => {
                        in_testing.push(<TaskView taskHandler={()=>{this.showModalStateTasks(task, state.id)}} key={task.id} txt={task.name} time={task.hours + 'h'} users={task.users} color='blue'></TaskView>)
                    })
                    break;
                    case 'DONE': 
                    state.tasks.forEach(task => {
                        done.push(<TaskView taskHandler={()=>{this.showModalStateTasks(task, state.id)}} key={task.id} txt={task.name} time={task.hours + 'h'} users={task.users} color='blue'></TaskView>)
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

    updateTaskState = (task, state) =>{
        var newState = state;
        //console.log(task)
        let self = this
        new TaskService().updateTask(task, newState, function(data){
            console.log(data)
            self.getMyTasks()
        }, function(error){
            console.log(error)
        })
    }

    render() {
        //console.log(this.state.tasks);
        /* console.log(this.state.account);
        console.log(this.state.profile); */
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
           <SafeAreaView style={{ flex: 1, backgroundColor: "#e6e6e6" }}> 
                <View style={{height: StatusBar.currentHeight}}></View>
                <View style={{flex:2, flexDirection: 'row'}}>
                    <View style={{flex:9, justifyContent:'center'}}>
                        <HeaderView txtTitle={PT.TASKS_HEADER_TITLE} txtBtn="" displayIcon="none" displayBtn="none" nameIcon="" biblioIcon="" onPressIcon={() =>{}} onPressBtn={() =>{}} />
                    </View>
                    <View style={{flex:1, flexDirection:'column', borderBottomWidth:1, borderBottomColor: '#C2C3C9'}}>
                        <View style={{flex:1, backgroundColor: 'white'}}></View>
                        <View style={{flex:1, justifyContent:'center', backgroundColor: 'white'}}>
                            <TouchableOpacity onPress={() =>{this.props.navigation.navigate('filters', {profile: this.state.profile})}} style={{justifyContent:'center'}}>
                                <IconSearch name="sliders" biblio='' size={22} color="black"/>
                            </TouchableOpacity>    
                        </View>
                    </View>
                </View>
                <View style={{flex:10}}>
                    <View style={{flex:1, backgroundColor: '#F2F2F2', paddingLeft: 10, paddingBottom: 4, paddingTop: 4}}>
                        <Text>{PT.TASKS_STATE_OPEN}</Text>
                    </View>
                    <View style={{flex:4, backgroundColor: 'white'}}>
                        <ScrollView horizontal={true} alwaysBounceHorizontal={true}>
                            {/* <TaskView  txt='Nome da tarefa' time='0.30h' color='blue' photo2='https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg'></TaskView>
                            <TaskView  txt='Nome da tarefa' time='0.30h' color='blue' photo2='https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg'></TaskView>
                            <TaskView  txt='Nome da tarefa' time='0.30h' color='blue' photo2='https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg'></TaskView>
                            <TaskView  txt='Nome da tarefa' time='0.30h' color='blue' photo2='https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg'></TaskView>
                            <TaskView  txt='Nome da tarefa' time='0.30h' color='blue' photo2='https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg'></TaskView>
                         */}
                         {this.state.open}
                         </ScrollView>
                    </View>
                    <View style={{flex:1, backgroundColor: '#F2F2F2', paddingLeft: 10, paddingBottom: 4, paddingTop: 4}}>
                        <Text>{PT.TASKS_STATE_PLANNED}</Text>
                    </View>
                    <View style={{flex:4, backgroundColor: 'white'}}>
                    <ScrollView horizontal={true} alwaysBounceHorizontal={true}>
                           {/*  <TaskView  txt='Nome da tarefa' time='0.30h' color='blue' photo2='https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg'></TaskView>
                            <TaskView  txt='Nome da tarefa' time='0.30h' color='blue' photo2='https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg'></TaskView>
                            <TaskView  txt='Nome da tarefa' time='0.30h' color='blue' photo2='https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg'></TaskView>
                            <TaskView  txt='Nome da tarefa' time='0.30h' color='blue' photo2='https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg'></TaskView>
                        */} 
                        {this.state.planned}
                        </ScrollView>
                    </View>
                    <View style={{flex:1, backgroundColor: '#F2F2F2', paddingLeft: 10, paddingBottom: 4, paddingTop: 4}}>
                        <Text>{PT.TASKS_STATE_IN_PROGRESS}</Text>
                    </View>
                    <View style={{flex:4, backgroundColor: 'white'}}>
                    <ScrollView horizontal={true} alwaysBounceHorizontal={true}>
                           {/*  <TaskView  txt='Nome da tarefa' time='0.30h' color='blue' photo2='https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg'></TaskView> */}
                        {this.state.in_progress}
                        </ScrollView>
                    </View>
                    <View style={{flex:1, backgroundColor: '#F2F2F2', paddingLeft: 10, paddingBottom: 4, paddingTop: 4}}>
                        <Text>{PT.TASKS_STATE_IN_TESTING}</Text>
                    </View>
                    <View style={{flex:4, backgroundColor: 'white'}}>
                    <ScrollView horizontal={true} alwaysBounceHorizontal={true}>
                           {/*  <TaskView  txt='Nome da tarefa' time='0.30h' color='blue' photo2='https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg'></TaskView>
                            <TaskView  txt='Nome da tarefa' time='0.30h' color='blue' photo2='https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg'></TaskView>
                         */}
                         {this.state.in_testing}
                         </ScrollView>
                    </View>
                    <View style={{flex:1, backgroundColor: '#F2F2F2', paddingLeft: 10, paddingBottom: 4, paddingTop: 4}}>
                        <Text>{PT.TASKS_STATE_DONE}</Text>
                    </View>
                    <View style={{flex:4, backgroundColor: 'white'}}>
                    <ScrollView horizontal={true} alwaysBounceHorizontal={true}>
                    
                           {/*  <TaskView  txt='Nome da tarefa' time='0.30h' color='blue' photo2='https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg'></TaskView>
                            <TaskView  txt='Nome da tarefa' time='0.30h' color='blue' photo2='https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg'></TaskView>
                            <TaskView  txt='Nome da tarefa' time='0.30h' color='blue' photo2='https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg'></TaskView>
                         */}
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
                    <View style={{position:'absolute', marginLeft:'10%', marginRight:'10%', marginTop:'40%', width:'80%', height:'40%', backgroundColor:'#F2F2F2', borderWidth:2, borderColor:"#007FB7", borderRadius: 10, elevation: 10}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color:"#007FB7", fontSize:20}}>Selecione o novo estado</Text>
                        </View>
                        <View style={{ flex:5, justifyContent: Platform.OS === 'ios' ? 'flex-start' : 'center', alignItems:'center'}}>
                            <Picker
                                selectedValue={this.state.selectedState}
                                style={{ height: 50, width: 200 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({selectedState: itemValue})} mode="dropdown">
                                <Picker.Item label="ABERTO" value="OPEN" />
                                <Picker.Item label="PLANEADO" value="PLANNED" />
                                <Picker.Item label="PROGRESSO" value="IN_PROGRESS" />
                                <Picker.Item label="TESTE" value="IN_TESTING" />
                                <Picker.Item label="FEITO" value="DONE" />
                            </Picker>
                        </View>
                        <View style={{flex:1, flexDirection:"row", position: 'absolute', bottom: 10, borderBottomLeftRadius: 10, borderBottomRightRadius:10}}>
                            <View style={{flex:1, justifyContent:'center', alignItems:'flex-start', marginLeft: '10%'}}>
                                <Button title="Cancelar" onPress={() => {this.setState({modalVisible: false})}} color="#007FB7"></Button>
                            </View>
                            <View style={{flex:1, justifyContent:'center', alignItems:'flex-end', marginRight: '10%'}}>
                                <Button title="  Alterar  " onPress={() => {
                                    this.setState({modalVisible: false})
                                    this.updateTaskState(this.state.selectedTask, this.state.selectedState)
                                }} color="#007FB7"></Button>
                            </View>

                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        )
    }
}

export default TasksScreen
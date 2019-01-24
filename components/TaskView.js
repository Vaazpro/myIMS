import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import Styles from '../constants/Styles'
import CircularPhoto from './CircularPhoto'
import IconSearch from "./IconSearch"

class 
TaskView extends Component {

    constructor(props) {
        super(props)
        this.state={
            task: this.props.task,
            userList: []
        }
    }

    /*
        props:

        txt
        time
        color
        photo2

    */

    componentWillMount(){
        //console.log(this.state.users)
        var usersList = []

        this.state.task.users.forEach((user, index) => {
            usersList.push(
                <View key={index} style={{backgroundColor: 'white', width: 22, height: 22 , borderRadius: 12, alignItems:'center', justifyContent: 'center'}}>
                    <CircularPhoto image= {'http://ims-demoipvc.sparkleit.pt/'+ user.attachmentId+'.png?format=png&width=100%'} size={20}/>
                </View>
            )
        }) 
        if(this.state.task.number > 2){
            var others = this.state.task.number - 2
            usersList.push(
                <View  key={this.state.task.number} style={{flexDirection: "row", marginTop: 6}}>
                    <Text> +{others} </Text>
                    <IconSearch name='users' biblio='Feather' color='black' size={13} />
                </View>
            );
        }
        this.setState({
            userList: usersList
        })
        
    }
    

    render() {
        return (
            
            <View style={[Styles.shadow, {backgroundColor: '#F2F2F2',width: 120, borderRadius: 5, elevation: 1,marginLeft: 15, marginTop:10, marginBottom:15, paddingLeft:5, paddingRight: 5, borderLeftColor: this.props.color, borderLeftWidth: 2}]}>
                <TouchableOpacity style={{flex: 1}} onPress={this.props.taskHandler}>
                <View style= {{flex: 1, justifyContent: 'flex-end'}}>
                    <Text style={{fontSize:15}}>{this.props.txt}</Text>  
                </View>
                <View style= {{flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                    {this.state.userList}
                    <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                        <Text style={{fontSize:14, color: 'grey'}}>{this.props.time}</Text>  
                    </View>
                </View>
                </TouchableOpacity>
            </View>
            
        )
    }
}

export default TaskView
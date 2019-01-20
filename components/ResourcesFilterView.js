import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import Styles from '../constants/Styles'
import CircularPhoto from './CircularPhoto';
import IconSearch from './IconSearch';

class 
TaskFilterView extends Component {

    constructor(props) {
        super(props)
        this.state={
            clicked: false
        }
    }

    /*
        props:

        txt

    */

    

    render() {
       /*  var usersList = []
        if(this.state.users.length<=6){
            this.state.users.forEach((user, index) => {
                usersList.push(
                    <View key={index} style={{backgroundColor: 'white', width: 27, height: 27 , borderRadius: 13.5, alignItems:'center', justifyContent: 'center'}}>
                        <CircularPhoto image= {'http://ims-demoipvc.sparkleit.pt/'+ user.attachmentId+'.png?format=png&width=100%'} size={25}/>
                    </View>
                )
            }) 
        }else{
            for(var i=0; i<6;i++){
                usersList.push(
                    <View style={{backgroundColor: 'white', width: 27, height: 27 , borderRadius: 13.5, alignItems:'center', justifyContent: 'center'}}>
                        <CircularPhoto image= {'http://ims-demoipvc.sparkleit.pt/'+ this.state.users[i].attachmentId+'.png?format=png&width=100%'} size={25}/>
                    </View>
                )
            }
            var others = this.state.users.length -6
            usersList.push(
                <Text> +{others} </Text>,
                <IconSearch name='users' biblio='Feather' color='black' size={13} />
            );
        } */
        /* , borderWidth: 2, borderColor: !this.state.clicked ? 'black': 'red' */

        return (
            <View style={{width: 140,height:130 ,marginLeft: 15, marginTop:10, marginBottom:15, paddingLeft:5, paddingRight: 5}}>
                <TouchableOpacity style={{flex: 1, position:"relative"}} onPress={() => {this.setState({clicked: !this.state.clicked})}}> 
                    <View style={{flex:3, justifyContent: 'center', alignItems: 'center', position: "relative"}}>
                        <View style={[Styles.shadow, {width:94, height:94, backgroundColor: 'white',borderWidth:1, borderColor:'rgba(216,217,221,0.5)', borderRadius: 47, justifyContent:"center", alignItems: "center", elevation: 5}]}>
                            <CircularPhoto image={'http://ims-demoipvc.sparkleit.pt/'+ this.props.id +'.png?format=png&width=100%'} size={94}/>
                        </View>
                    </View>
                    <View style={{position:"absolute", width: 26, height: 26, alignItems: "center", justifyContent: "center", borderRadius: 13, backgroundColor: "#007FB7", top: "5%", right: "10%", elevation: 10, opacity: this.state.clicked ? 1 : 0}}>
                        <IconSearch name="check" biblio="Feather" color="white" size={20}></IconSearch>
                    </View>
                    <View style= {{flex: 1, justifyContent: 'flex-end', alignItems:'center'}}>
                        <Text style={{fontSize:14}}>{this.props.txt}</Text>  
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default TaskFilterView
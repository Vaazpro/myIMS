import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import Styles from '../constants/Styles'
import CircularPhoto from './CircularPhoto';

class 
TaksFilterView extends Component {

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

        return (
            <View style={[Styles.shadow, {backgroundColor: '#F2F2F2',width: 140,height:80, borderRadius: 5, elevation: 1,marginLeft: 15, marginTop:10, marginBottom:15, paddingLeft:5, paddingRight: 5, borderWidth: 2, borderColor: !this.state.clicked ? 'black': 'red'}]}>
                <TouchableOpacity style={{flex: 1}} onPress={() => {this.setState({clicked: !this.state.clicked})}}>
                <View style= {{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                    <Text style={{fontSize:20}}>{this.props.txt}</Text>  
                </View>
                {/* <View style= {{flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                     <View style={{flex:1, justifyContent: 'center'}}>
                        <CircularPhoto image={this.props.users} size={20}/>
                    </View> 
                    {usersList}
                    <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}> 
                    </View>
                </View> */}
                </TouchableOpacity>
            </View>
            
        )
    }
}

export default TaksFilterView
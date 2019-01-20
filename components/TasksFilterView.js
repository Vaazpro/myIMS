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
        /* , borderWidth: 2, borderColor: !this.state.clicked ? 'black': 'red' */

        return (
            <View>

                <View style={{zIndex:22,borderRadius: 10, width:20, height:20, position:"absolute", backgroundColor: '#007FB7', top:-10, right:-50, alignItems:"center", justifyContent: "center", borderWidth:1, borderColor:'white'}}>
                    <IconSearch name="check" biblio="Feather" color="white" size={17}></IconSearch>
                </View>    
                <TouchableOpacity style={{flex: 1,position: "absolute", zIndex: 1}} onPress={() => {this.setState({clicked: !this.state.clicked})}}>
                
                    <View style={[this.state.clicked ? Styles.shadow : '', {backgroundColor: '#F2F2F2', borderRadius: 5, elevation: 1,marginLeft: 15, marginTop:10, marginBottom:15, paddingLeft:5, paddingRight: 5,borderWidth: 1, borderColor: !this.state.clicked ? 'lightgray': '#F2F2F2',width: 140,height:80}]}>
                        <View style= {{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                            <Text style={{fontSize:18}}>{this.props.txt}</Text>  
                        </View>
                    </View> 
                </TouchableOpacity>
            
            </View>
            
        )
    }
}

export default TaksFilterView
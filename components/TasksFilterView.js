import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Platform
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
            <View style={{width: 150, height: 100, backgroundColor: "transparent", marginEnd: 2, marginStart: 2, padding: 5, position:"relative"}}>
                <View style={[this.state.clicked ? Styles.shadow : "", {flex: 1, width: "100%", borderRadius: 5, elevation: this.state.clicked ? 5 : 0}]}>
                    <TouchableOpacity activeOpacity={0.8} style={{flex:1, width: "100%", backgroundColor: "#F2F2F2", borderWidth:1, borderColor: "lightgray", borderRadius: 5, alignItems: "center", justifyContent: "center", padding: 10}} onPress={()=>{this.setState({clicked: !this.state.clicked})}}>
                        <Text style={{fontSize: Platform.OS === 'ios' ? 16 : 18, textAlign: "center"}}>{this.props.txt}</Text>  
                    </TouchableOpacity>
                </View>
                <View style={{elevation: 10, position:"absolute", width:20, height: 20, backgroundColor: "#007FB7", right: 0, top: 0, borderRadius: 10, opacity: this.state.clicked ? 1 : 0, justifyContent: 'center', alignItems:'center', borderWidth:1, borderColor:'white'}}>
                    <IconSearch name="check" biblio="Feather" color="white" size={17}></IconSearch>
                </View>
            </View>
        )
    }
}

export default TaksFilterView
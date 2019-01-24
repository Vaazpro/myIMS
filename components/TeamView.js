import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import Styles from '../constants/Styles'
import IconSearch from '../components/IconSearch'
import CircularPhoto from './CircularPhoto';

class 
TeamView extends Component {

    constructor(props) {
        super(props)
        this.state={
            employees: this.props.employees,
            icon:this.props.icon,
            employeesList : [],
            image: ""
        }

    }
    
    changeIcon(){
        var newIcon = this.state.icon
        newIcon = newIcon.split('-')
        return newIcon[1]
        
    }

    componentWillMount(){
        var employeesList = []
        var image = ""
        let offset = -10
        if(this.state.employees.length<=5){
            this.state.employees.forEach((employee, index) => {
                employeesList.push(
                    <View key={index} style={{backgroundColor: 'white', width: 27, height: 27 , borderRadius: 13.5, alignItems:'center', justifyContent: 'center'}}>
                        <CircularPhoto image= {'http://ims-demoipvc.sparkleit.pt/'+ employee.attachmentId+'.png?format=png&width=100%'} size={25}/>
                    </View>
                )
            }) 
        }else{
            for(var i=0; i<5;i++){
                employeesList.push(
                    <View  key={i} style={{backgroundColor: 'white', width: 27, height: 27 , borderRadius: 13.5, alignItems:'center', justifyContent: 'center', marginRight: offset}}>
                        <CircularPhoto image= {'http://ims-demoipvc.sparkleit.pt/'+ this.state.employees[i].attachmentId+'.png?format=png&width=100%'} size={25}/>
                    </View>
                )
            }
            var others = this.state.employees.length -5
            employeesList.push(
                <View  key={"others"} style={{flexDirection: "row", marginTop: 6, marginLeft: 10}}>
                    <Text> +{others} </Text>
                    <IconSearch name='users' biblio='Feather' color='black' size={13} />
                </View>
            );
        }
        if(this.state.icon.substring(0,1)==='#'){
            image = (<View style= {{flex: 2, borderTopLeftRadius: 5 , borderBottomLeftRadius:5, justifyContent:'center', alignItems: 'center', marginBottom: 10, marginTop: 10, borderRightColor: 'rgb(216,217,221)', borderRightWidth:2}}>
                <View style= {{justifyContent:'center', alignItems: 'center',width:20, height: 20,borderRadius: 10, borderColor: 'black', borderWidth: 1 , backgroundColor:this.state.icon}}></View>
            </View>)
        }else{
            image = (<View style= {{flex: 2, borderTopLeftRadius: 5 , borderBottomLeftRadius:5, justifyContent:'center', alignItems: 'center', marginBottom: 10, marginTop: 10, borderRightColor: 'rgb(216,217,221)', borderRightWidth:2}}>
                {/* <CircularPhoto image= {'http://ims-demoipvc.sparkleit.pt/'+ this.changeIcon()+'.png?format=png&width=100%'} size={25}/> */}
                <IconSearch name={this.changeIcon()} biblio='' color='black' size={25} />
            </View>)
        }

        this.setState({
            employeesList: employeesList,
            image: image
        })
    }

    

    render() {
        return (
            <View style={[Styles.shadow, {height: 70, flexDirection: 'row', borderRadius: 5, elevation: 1,marginBottom: 20,backgroundColor: '#F2F2F2'}]}>
                {this.state.image}
                <View style= {{flex: 6, flexDirection: 'column', marginLeft:20, justifyContent: 'center'}}>
                    <View style= {{flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={{fontSize:18}}>{this.props.txt}</Text>  
                    </View>
                    <View style= {{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        {this.state.employeesList}
                    </View>
                </View>    
                <View style= {{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                </View>                                 
            </View>
        )
    }
}

export default TeamView
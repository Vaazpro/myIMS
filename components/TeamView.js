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
        this.state={}
    }

    

    render() {
        return (
            <View style={[Styles.shadow, {height: 70, flexDirection: 'row', borderRadius: 5, elevation: 1,marginBottom: 20,backgroundColor: '#F2F2F2'}]}>
                <View style= {{flex: 2, borderTopLeftRadius: 5 , borderBottomLeftRadius:5, justifyContent:'center', alignItems: 'center', marginBottom: 10, marginTop: 10, borderRightColor: 'rgb(216,217,221)', borderRightWidth:2}}>
                    <IconSearch name={this.props.iconName} biblio={this.props.iconBiblio} size={this.props.iconSize} color={this.props.iconColor} ></IconSearch>
                </View>
                <View style= {{flex: 6, flexDirection: 'column', marginLeft:20, justifyContent: 'center'}}>
                    <View style= {{flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={{fontSize:18}}>{this.props.txt}</Text>  
                    </View>
                    <View style= {{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{backgroundColor: 'white', width: 27, height: 27 , borderRadius: 13.5, alignItems:'center', justifyContent: 'center'}}>
                            <CircularPhoto image= {this.props.photo1} size={25}/>
                        </View>
                        <View style={{position: 'absolute', marginLeft: 20 ,backgroundColor: 'white', width: 27, height: 27 , borderRadius: 13.5, alignItems:'center', justifyContent: 'center'}}>
                            <CircularPhoto image= {this.props.photo2} size={25}/>
                        </View>
                        <View style={{position: 'absolute', marginLeft: 40,backgroundColor: 'white', width: 27, height: 27 , borderRadius: 13.5, alignItems:'center', justifyContent: 'center'}}>
                            <CircularPhoto image= {this.props.photo3} size={25}/>
                        </View>
                        <View style={{position: 'absolute', marginLeft: 60,backgroundColor: 'white', width: 27, height: 27 , borderRadius: 13.5, alignItems:'center', justifyContent: 'center'}}>
                            <View style={{paddingTop: 10 ,backgroundColor: 'rgb(216,217,221)', width: 25, height: 25 , borderRadius: 12.5, alignItems:'center', justifyContent: 'center'}}>
                                
                            <IconSearch name='dots-horizontal' biblio='MaterialCommunityIcons' size={20} color="#000000"></IconSearch>
                                

                            </View>  
                        </View>
                        
                    </View>
                </View>    
                <View style= {{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    {/* <TouchableOpacity>
                        <IconSearch name='close' biblio='FontAwesome' color='black' size={25} />
                    </TouchableOpacity> */}
                </View>                                 
            </View>
        )
    }
}

export default TeamView
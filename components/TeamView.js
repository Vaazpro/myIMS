import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
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
            
                <View style={[Styles.shadow, {height: 100, flexDirection: 'row', borderRadius: 5, elevation: 1,marginBottom: 20}]}>
                    <View style= {{flex: 0.5, backgroundColor: this.props.color, borderTopLeftRadius: 5 , borderBottomLeftRadius:5}}></View>
                    <View style= {{flex: 8, flexDirection: 'column', marginLeft:20, justifyContent: 'center'}}>
                        <View style= {{flex: 1, justifyContent: 'flex-end'}}>
                            <Text style={{fontSize:24}}>{this.props.txt}</Text>  
                        </View>
                        <View style= {{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <CircularPhoto image= {this.props.photo1} size={30}/>
                            <CircularPhoto image={this.props.photo2} size={30}/>
                            <CircularPhoto image={this.props.photo3} size={30}/>
                            <CircularPhoto image={this.props.photo4} size={30}/>
                            <Text style={{fontSize:14, marginLeft: 10}}> + 3 colaboradores</Text> 
                        </View>
                    </View>    
                    <View style= {{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity>
                            <IconSearch name='close' biblio='FontAwesome' color='black' size={25} />
                        </TouchableOpacity>
                    </View>                                 
                </View>
            
        )
    }
}

export default TeamView
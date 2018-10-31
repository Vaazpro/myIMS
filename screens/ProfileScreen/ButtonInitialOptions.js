import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Button
} from 'react-native'

import styles from '../../constants/Styles'
import * as array from '@expo/vector-icons'
import IconSearch from '../../components/IconSearch'


/*

*https://expo.github.io/vector-icons/

*This constant brings a feature that helps to dynamically create an icon using the 'vector-icons' library
*This library contains 'sub-libraries' which coexist as components
*We use the global prop named 'biblio' so we can check in the vector-icons' library if the component we want to use exists.
*If it exists we will search directly into that component the icon we wanted in the first place
*After that we create the element.

*/
/* const Tag = (props) => {
    let icon = null
    let found = false
    let keyFound = null

    Object.keys(array).map((key, index) => {
        const item = array[key]
        if(key == props.biblio){
            found = true
            keyFound = key
            console.log(keyFound)
            return
        }
    })

    if(found){
        const item = array[keyFound]
        Object.keys(item.glyphMap).map((k, i) => {
            if(k == props.name){
                icon = React.createElement(item, props, '')
                return
            }
        })
    }else{
        Object.keys(array).map((key, index) => {  
            const item = array[key]
            if(item.glyphMap != undefined){
                Object.keys(item.glyphMap).map((k, i) => {
                    if(k == props.name){
                        icon = React.createElement(item, props, '')
                        return
                    }
                })
            }
        })
    }

    //console.log(icon)
    return icon
} */

class ButtonInitialOptions extends Component {

    constructor(props) {
        super(props)
        this.state={
            image: '',
            maintext: '',
            secondarytext: ''
        }
        /* console.log(this.state);
        console.log(this.props);
         */
    }

    render() {
       
        return (
            
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.props.nextPage}>
                    <View style={styles.row}>
                        <View style={{ flex: 1, alignItems:'center', justifyContent: 'center' }}>
                            <IconSearch name={this.props.icon} biblio={this.props.biblio} size={32} color="#007FB7"></IconSearch>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <View style={{ flex: 3 }}>
                                    
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{fontSize: 20}}>{this.props.name}</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <Text style={{ paddingTop:5 }}>{this.props.name2}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View> 
            
        )
    }
}

export default ButtonInitialOptions
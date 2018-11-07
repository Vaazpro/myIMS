import React, { Component } from 'react'
import {
    View
} from 'react-native'

import * as array from '@expo/vector-icons'

/*

*https://expo.github.io/vector-icons/

*This constant brings a feature that helps to dynamically create an icon using the 'vector-icons' library
*This library contains 'sub-libraries' which coexist as components
*We use the global prop named 'biblio' so we can check in the vector-icons' library if the component we want to use exists.
*If it exists we will search directly into that component the icon we wanted in the first place
*After that we create the element.

*/


/* props:
    name
    biblio
    color
    size
*/ 
const Tag = (props) => {
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
}

class IconSearch extends Component {

    constructor(props) {
        super(props)
        this.state={}
    }

    render() {
        return (
            <View>
                <Tag name={this.props.name} biblio={this.props.biblio} size={this.props.size} color={this.props.color}></Tag>
            </View>
        )
    }
}

export default IconSearch
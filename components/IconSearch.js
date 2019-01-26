import React, { Component } from 'react'
import {
    View
} from 'react-native'

import * as array from '@expo/vector-icons'

/** PROPS
* name
* biblio
* color
* size
*/ 

const Tag = (props) => {
    let icon = null
    let found = false
    let keyFound = null

    Object.keys(array).map((key, index) => {
        if(key == props.biblio){
            found = true
            keyFound = key
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
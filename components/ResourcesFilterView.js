import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import Styles from '../constants/Styles'
import CircularPhoto from './CircularPhoto'
import IconSearch from './IconSearch'
import Colors from '../constants/Colors'
import * as CONST from '../constants/labels/constants'

class 
ResourcesFilterView extends Component {

    constructor(props) {
        super(props)
        this.state={
            clicked: this.props.clicked
        }
    }

    /** PROPS
    * checkArray()
    * id
    * txt
    * clicked
    */

    render() {
        return (
            <View style={Styles.resourcerFilterViewMainContainer}>
                <TouchableOpacity style={Styles.flex1relative} onPress={() => {this.props.checkArray(); this.setState({clicked: !this.state.clicked})}}> 
                    <View style={Styles.resourcerFilterViewPhotoContainer}>
                        <View style={[Styles.shadow, Styles.resourcerFilterViewPhotoHolder]}>
                            <CircularPhoto image={CONST.URL_BEGIN + this.props.id + CONST.URL_END} size={94}/>
                        </View>
                    </View>
                    <View style={[Styles.resourceFilterViewIconHolder, {opacity: this.state.clicked ? 1 : 0}]}>
                        <IconSearch name={CONST.ICON_NAME_CHECK} biblio={CONST.LIBRARY_1} color={Colors.SPARKLE_IT_WHITE} size={20}></IconSearch>
                    </View>
                    <View style= {Styles.resourceFilterViewTextHolder}>
                        <Text style={Styles.font14}>{this.props.txt}</Text>  
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ResourcesFilterView
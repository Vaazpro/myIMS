import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native'

import styles from '../../constants/Styles'

class ButtonInitialOptions extends Component {

    constructor(props) {
        super(props)
        this.state={
            image: '',
            maintext: '',
            secondarytext: ''
        }
    }

    //JUST TESTING STUFF
    makeButtonInitialOption( image, maintext, secondarytext ){
        this.setState({
            image: image,
            maintext: maintext,
            secondarytext: secondarytext
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <View style={styles.row}>
                        <View style={{ flex: 1, alignItems:'center', justifyContent: 'center' }}>
                            <Image source={require('../../assets/images/myIMSicons/keyIcon.png')} style = {{width:20, height:20}} />
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <View style={{ flex: 3 }}>
                                    
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{fontSize: 20}}>lol1</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <Text style={{ paddingTop:5 }}>lol2</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ButtonInitialOptions
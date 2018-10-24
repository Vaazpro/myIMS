import React, { Component } from 'react'
import {
    TouchableOpacity,
    View,
    StatusBar,
    NativeModules,
    LayoutAnimation,
    Platform,
    Animated,
    Text,
    Image
} from 'react-native'
import InitialOptions from './InitialOptions'
import SlideTest from './SlideTest'
import styles from '../../constants/Styles'
import { Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import ElevatedView from 'react-native-elevated-view'




const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)


class ProfileScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)

        this.state={}


    }

    render() {




        return (
            <ElevatedView style={{ flex: 1, margin: 10, borderRadius: 5}} elevation={5}>
                <TouchableOpacity style={{ flex:1 }} onPress={ () => { console.warn('Clicked!')}} >
                    <View style={{ flex:11, backgroundColor: 'white', borderColor: 'grey', borderRadius: 5 }}>
                        {/* <Image style={{ flex: 1 }} source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png%27%7D%7D%3E</Image> */}
                        <Image style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 5 }} source={this.props.link}></Image>
                    </View>
                    <View style={{ flex:9, backgroundColor: 'white', borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'center', padding: 5 }}>
                            <Text style={{ fontSize: 18 }}>{this.props.name}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', padding: 5 }}>
                        <Text style={{ fontSize: 12 }}>{this.props.name2}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </ElevatedView> 
        )
    }
}

export default ProfileScreen
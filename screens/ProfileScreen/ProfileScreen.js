import React, { Component } from 'react'
import {
    TouchableOpacity,
    View,
    StatusBar,
    NativeModules,
    LayoutAnimation,
    Platform,
    Animated
} from 'react-native'
import InitialOptions from './InitialOptions'
import SlideTest from './SlideTest'
import styles from '../../constants/Styles'
import { Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)


class ProfileScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        const h1 = (Dimensions.get('window').height / 4)
        this.state={
            clicked: false,
            h: h1,
            displaystatus: 'none',
            opacity: 1
        }
        this.rotation = new Animated.Value(0)
    }

    render() {
        /* Dinamizar as dimensões da View dos dados pessoais, dependendo da plataforma */
        h1 = (Dimensions.get('window').height / 4) 
        h2 = (Dimensions.get('window').height / 1.7)
        iconsize = 32
        const gap = Platform.OS === 'ios' ? (iconsize) : 10

        /* Realizar a Animação da arrow */
        const { style, rotation } = this.props
        const rotate = this.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg','180deg'],
          })
        
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
           <View style={styles.container}> 
                <View style={styles.container}>
                    {/* StatusBar.currentHeight avoids the StatusBar to overlap our screen */}
                    <View style={{height: StatusBar.currentHeight}}></View>
                    
                    <View style={{flex: 1}}>

                    </View>

                    <View style={{flex: 2}}>
                        <InitialOptions/>
                    </View>

                    <View style={{flex: 1}}>

                    </View>

                    <View style={{ flex: 1, position: 'absolute' }}>
                        <View style={{justifyContent:'center',
                                alignItems:'center',
                                alignSelf:'center',
                                marginTop: getStatusBarHeight(),
                                height: this.state.h,
                                width: Dimensions.get('window').width,
                                backgroundColor: '#F2F2F2'}}>
                                
                                {/* <Button title={'Click Me!'} onPress={() => {
                                    if(!this.state.clicked){
                                        this.setState({
                                            h: h2,
                                            clicked: true,
                                            displaystatus: 'flex'
                                        })
                                    }else{
                                        this.setState({
                                            h: h1,
                                            clicked: false,
                                            displaystatus: 'none'
                                            
                                        })
                                    }
                            }}></Button> */}
                        </View>
                        <View style={{
                            height:(Dimensions.get('window').height - this.state.h),
                            backgroundColor: 'black',
                            opacity: 0.4,
                            display: this.state.displaystatus}}>

                        </View>
                        <View style={{
                            flex: 1,
                            position: 'absolute',
                            width: iconsize,
                            height: iconsize,
                            borderRadius: iconsize/2,
                            left: Dimensions.get('window').width / 2 - (iconsize/2),
                            top: this.state.h + gap,
                            alignItems:'center',
                            justifyContent: 'center',
                            backgroundColor: '#F2F2F2',
                            paddingTop: 3,
                            elevation: 5,
                            shadowRadius: 3,
                            shadowColor: 'black',
                            shadowOffset:{
                                height: 1,
                                width: 1
                            },
                            shadowOpacity: 0.2}}>

                            
                            <Animated.View style={{transform:[{rotate}], flex: 1, alignItems:'center', justifyContent: 'center'}}>
                                <TouchableOpacity style={{flex: 1}} onPress={() => {
                                    if(!this.state.clicked){
                                        LayoutAnimation.spring()
                                        Animated.spring(this.rotation, {
                                            toValue: 1,
                                            tension: 150,
                                            friction: 5,
                                            useNativeDriver: true,
                                        }).start()
                                        this.setState({
                                            h: h2,
                                            clicked: true,
                                            displaystatus: 'flex'
                                        })
                                    }else{
                                        LayoutAnimation.spring()
                                        Animated.spring(this.rotation, {
                                            toValue: 0,
                                            tension: 150,
                                            friction: 5,
                                            useNativeDriver: true,
                                        }).start()
                                        this.setState({
                                            h: h1,
                                            clicked: false,
                                            displaystatus: 'none'
                                            
                                        })
                                    }
                            }}>
                                    <Ionicons name="ios-arrow-down" size={iconsize} color="#007FB7"/>
                                </TouchableOpacity>
                                
                                
                            </Animated.View>

                        </View>
                    </View>

                    
                    
                </View>
            </View> 
        )
    }
}

export default ProfileScreen

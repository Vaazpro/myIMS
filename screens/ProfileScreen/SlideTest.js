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
import styles from '../../constants/Styles'
import { Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import ElevatedView from 'react-native-elevated-view'
import {createStackNavigator} from 'react-navigation';

class SlideTest extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        h1 = (Dimensions.get('window').height / 4) 
        this.state={
            clicked: false,
            h: h1,
            displaystatus: 'none',
            expanded: 'none'
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
            <View style={{ flex: 1, position: 'absolute' }}>
                        <View style={{justifyContent:'center',
                                alignItems:'center',
                                alignSelf:'center',
                                marginTop: getStatusBarHeight(),
                                height: this.state.h,
                                width: Dimensions.get('window').width,
                                backgroundColor: '#F2F2F2'}}>
                                
                                
                                    <View style={{flex: 1, width: Dimensions.get('window').width , position: 'relative'  }}>
                                        <View style={{flex: 1, margin: 20, flexDirection: 'row'}}>
                                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                                                <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png%27%7D%7D'}} 
                                                        style={{ width: 100,
                                                                height: 100, 
                                                                borderRadius: 100/2}} />
                                            </View>                            
                                            <View style={{flex: 2,flexDirection: 'row'}}>
                                                <View style={{flex: 8,justifyContent: 'center'}}>
                                                    <Text style={{fontSize: 24}}>Ana Rita Viana</Text>
                                                    <Text style={{fontSize: 18}}>SparkleIT</Text>
                                                    <Text style={{fontSize: 14}}>25 anos</Text>
                                                    
                                                </View>    
                                                <View style={{flex: 1}}>
                                                    <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('unlock')}>
                                                        <FontAwesome style={{ alignSelf: 'flex-end'}} name="unlock-alt" size={iconsize} color="grey"/>
                                                    </TouchableOpacity>
                                                                    
                                                </View>
                                            </View>           
                                        </View>
                                         
                                    </View>
                                    <View style={{paddingHorizontal:20 ,flex: 2, width: Dimensions.get('window').width,display: this.state.expanded}}>
                                        <View style={{paddingBottom: 5,flex: 1,borderBottomColor: 'rgba(216,217,221,0.5)', borderBottomWidth: 1,borderTopColor: 'rgba(216,217,221,0.5)',borderTopWidth: 1,alignItems: 'flex-end', flexDirection: 'row'}}>
                                            <View style={{flex: 9,alignItems: 'flex-start'}}>
                                                <Text style={{color: '#9A999E'}}>Olá</Text>        
                                            </View>
                                            <View  style={{flex: 1,alignItems: 'flex-end'}}>
                                                <FontAwesome  name="unlock-alt" size={16} color="grey"/>       
                                            </View>
                                                         
                                        </View>
                                        <View style={{paddingBottom: 5,flex: 1,borderBottomColor: 'rgba(216,217,221,0.5)', borderBottomWidth: 1 ,alignItems: 'flex-end', flexDirection: 'row'}}>
                                            <View style={{flex: 9,alignItems: 'flex-start'}}>
                                                <Text style={{color: '#9A999E'}}>Olá</Text>        
                                            </View>
                                            <View  style={{flex: 1,alignItems: 'flex-end'}}>
                                                <FontAwesome  name="unlock-alt" size={16} color="grey"/>       
                                            </View>
                                                         
                                        </View>
                                        <View style={{paddingBottom: 5,flex: 1,borderBottomColor: 'rgba(216,217,221,0.5)', borderBottomWidth: 1 ,alignItems: 'flex-end', flexDirection: 'row'}}>
                                            <View style={{flex: 9,alignItems: 'flex-start'}}>
                                                <Text style={{color: '#9A999E'}}>Olá</Text>        
                                            </View>
                                            <View  style={{flex: 1,alignItems: 'flex-end'}}>
                                                <FontAwesome  name="unlock-alt" size={16} color="grey"/>       
                                            </View>
                                                         
                                        </View>
                                        <View style={{paddingBottom: 5,flex: 1,borderBottomColor: 'rgba(216,217,221,0.5)', borderBottomWidth: 1 ,alignItems: 'flex-end', flexDirection: 'row'}}>
                                            <View style={{flex: 9,alignItems: 'flex-start', }}>
                                                <Text style={{color: '#9A999E'}}>Olá</Text>        
                                            </View>
                                            <View  style={{flex: 1,alignItems: 'flex-end'}}>
                                                <FontAwesome  name="unlock-alt" size={16} color="grey"/>       
                                            </View>
                                                         
                                        </View>
                                        <View style={{paddingBottom: 5,flex: 1,borderBottomColor: 'rgba(216,217,221,0.5)', borderBottomWidth: 1 ,alignItems: 'flex-end', flexDirection: 'row'}}>
                                            <View style={{flex: 9,alignItems: 'flex-start'}}>
                                                <Text style={{color: '#9A999E'}}>Olá</Text>        
                                            </View>
                                            <View  style={{flex: 1,alignItems: 'flex-end'}}>
                                                <FontAwesome  name="unlock-alt" size={16} color="grey"/>       
                                            </View>
                                                         
                                        </View>  
                                        <View style={{flex: 1,borderBottomColor: 'rgba(216,217,221,0.5)', borderBottomWidth: 1 }}>
                                           
                                                         
                                        </View>      
                                    </View>
                                
                        </View>
                        <View style={{
                            height:(Dimensions.get('window').height - this.state.h),
                            backgroundColor: 'black',
                            opacity: 0.4,
                            display: this.state.displaystatus}}>

                        </View>
                        <ElevatedView style={{
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
                            paddingTop: 3}}  elevation={5}>

                            
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
                                            displaystatus: 'flex',
                                            expanded: 'flex'
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
                                            displaystatus: 'none',
                                            expanded: 'none'
                                            
                                        })
                                    }
                            }}>
                                    <Ionicons name="ios-arrow-down" size={iconsize} color="#007FB7"/>
                                </TouchableOpacity>
                                
                                
                            </Animated.View>

                        </ElevatedView>

                    </View>
        )
    }
}

export default SlideTest

import React, { Component } from 'react'
import {
    Text,
    View,
    Animated,
    Easing,
    TextInput,
    TouchableOpacity
} from 'react-native'
import AppNavigator from '../../navigation/AppNavigator';

class SplashScreen extends Component {


    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false
        }

        this.animatedValue = new Animated.Value(0)
        this.opacityLogo = new Animated.Value(0)
        this.opacityValueUser = new Animated.Value(0)
        this.opacityValuePass = new Animated.Value(0)
        this.opacityValueLogin = new Animated.Value(0)
        this.scaleValueXuser = new Animated.Value(0)
        this.scaleValueYuser = new Animated.Value(0)
        this.scaleValueXpass = new Animated.Value(0)
        this.scaleValueYpass = new Animated.Value(0)
        this.scaleValueXlogin = new Animated.Value(0)
        this.scaleValueYlogin = new Animated.Value(0)
        this.textSizeValue = new Animated.Value(0)
    }

    componentDidMount(){
        this.animate()
    }

    animate = () => {
      // Conjunto Total de Animações:
      Animated.sequence([
        // Animação do FADE + ZOOM do texto "myIMS":
        Animated.parallel([
            Animated.timing(
                this.opacityLogo,{
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.ease
                }
            ),
            Animated.timing(
                this.textSizeValue,{
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.ease
                }
            )
        ]),
        // Animação do MOVE UP do texto "myIMS":
        Animated.parallel([
          Animated.timing(
              this.animatedValue,{
                  toValue: 1,
                  duration: 1500,
                  easing: Easing.ease
              }
          ),
          // Sequencia de Animações dos elementos do Painel de Login:
          Animated.sequence([
            // Animações de ZOOM(X, Y) + FADE do input de Username
            Animated.parallel([
              Animated.timing(
                this.scaleValueXuser,{
                    toValue: 1,
                    duration: 500,
                    easing: Easing.ease
                }
              ),
              Animated.timing(
                this.scaleValueYuser,{
                    toValue: 1,
                    duration: 500,
                    easing: Easing.ease
                }
              ),
              Animated.timing(
                this.opacityValueUser,{
                    toValue: 1,
                    duration: 500,
                    easing: Easing.ease
                }
              ),
            ]),
            // Animações de ZOOM(X, Y) + FADE do input de Password
            Animated.parallel([
              Animated.timing(
                this.scaleValueXpass,{
                    toValue: 1,
                    duration: 500,
                    easing: Easing.ease
                }
              ),
              Animated.timing(
                this.scaleValueYpass,{
                    toValue: 1,
                    duration: 500,
                    easing: Easing.ease
                }
              ),
              Animated.timing(
                this.opacityValuePass,{
                    toValue: 1,
                    duration: 500,
                    easing: Easing.ease
                }
              ),
            ]),
            // Animações de ZOOM(X, Y) + FADE do botão de Login
            Animated.parallel([
              Animated.timing(
                this.scaleValueXlogin,{
                    toValue: 1,
                    duration: 500,
                    easing: Easing.ease
                }
              ),
              Animated.timing(
                this.scaleValueYlogin,{
                    toValue: 1,
                    duration: 500,
                    easing: Easing.ease
                }
              ),
              Animated.timing(
                this.opacityValueLogin,{
                    toValue: 1,
                    duration: 500,
                    easing: Easing.ease
                }
              )
            ])
          ])
        ])
      ]).start()
    }

    render() {
        const posX = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '30%']
        })

        const opacityLogo = this.opacityLogo.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })

        const opacityValueUser = this.opacityValueUser.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        })
        const opacityValuePass = this.opacityValuePass.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        })

        const opacityValueLogin = this.opacityValueLogin.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        })

        const scaleValueXuser = this.scaleValueXuser.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 300]
        })

        const scaleValueYuser = this.scaleValueYuser.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50]
        })

        const scaleValueXpass = this.scaleValueXpass.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 300]
        })

        const scaleValueYpass = this.scaleValueYpass.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50]
        })

        const scaleValueXlogin = this.scaleValueXlogin.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 300]
        })

        const scaleValueYlogin = this.scaleValueYlogin.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50]
        })


        const textSizeValue = this.textSizeValue.interpolate({
            inputRange: [0, 1],
            outputRange: [15, 40]
        })

        if(this.state.loggedIn){
            return <AppNavigator/>
        }else{
            return (
                <View style={{flex:1, backgroundColor: 'rgb(73, 144, 226)', justifyContent:'center', alignItems:'center'}}>
                    <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                        <Animated.View style={{ justifyContent:'center', opacity: opacityLogo}}>
                            <View style={{flexDirection: 'row'}}>
                                <Animated.Text style={{color: 'white', fontSize: textSizeValue, marginBottom: posX}}>my</Animated.Text>
                                <Animated.Text style={{color: 'white', fontSize: textSizeValue, fontWeight: 'bold', marginBottom: posX}}>IMS</Animated.Text>
                            </View>
                        </Animated.View>
                    </View>
                    <View style={{flex:1, marginBottom: 40, backgroundColor: 'rgb(73, 144, 226)', justifyContent: 'flex-start', alignItems:'center'}}>
                        
                        <Animated.View style={{ borderRadius: 3, width:scaleValueXuser ,height: scaleValueYuser, opacity: opacityValueUser, backgroundColor: 'rgb(123, 173, 232)', margin:5, justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput placeholder='username' placeholderTextColor='white' underlineColorAndroid='transparent' style={{color:'white', width: '100%', textAlign: 'center'}}></TextInput>
                        </Animated.View>

                        <Animated.View style={{ borderRadius: 3, width:scaleValueXpass, height: scaleValueYpass, opacity: opacityValuePass, backgroundColor: 'rgb(123, 173, 232)', margin:5, justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput underlineColorAndroid='transparent' placeholder='password' secureTextEntry={true} placeholderTextColor='white' style={{color:'white', width: '100%', textAlign: 'center'}}></TextInput>
                        </Animated.View>

                        <Animated.View style={{ borderRadius: 3, width:scaleValueXlogin, height: scaleValueYlogin, opacity: opacityValueLogin, margin:5, backgroundColor: 'white' }}>
                        <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={() => {this.setState({loggedIn:true})}}>
                            <Text style={{color: 'rgb(123, 173, 232)', fontSize: 15, fontWeight: 'bold'}}>LOGIN</Text>
                        </TouchableOpacity>
                        </Animated.View>
                        
                    </View>
                </View>
            )
        }
            
    }
}

export default SplashScreen
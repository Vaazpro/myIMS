import React, { Component } from 'react'
import {
    Text,
    View,
    StatusBar,
    Button
} from 'react-native'
import InitialOptions from './InitialOptions'
import SlideTest from './SlideTest'
import styles from '../../constants/Styles'
import { Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';


class ProfileScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        const h1 = (Dimensions.get('window').height / 4) - getStatusBarHeight()
        this.state={
            clicked: false,
            h: h1,
            displaystatus: 'none'
        }
    }

    

    

    render() {
        h1 = (Dimensions.get('window').height / 4) - getStatusBarHeight()
        h2 = (Dimensions.get('window').height / 1.7)
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
                                backgroundColor:'blue',
                                height: this.state.h,
                                width: Dimensions.get('window').width }}>
                                
                                <Button title={'Click Me!'} onPress={() => {
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
                                }}></Button>
                        </View>
                        <View style={{
                            height:(Dimensions.get('window').height - this.state.h),
                            backgroundColor: 'black',
                            opacity: 0.2,
                            display: this.state.displaystatus}}>

                        </View>
                    </View>

                    
                    
                </View>
            </View> 
        )
    }
}

export default ProfileScreen

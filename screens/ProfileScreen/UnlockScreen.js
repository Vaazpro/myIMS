import React, { Component } from 'react'
import {
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    SafeAreaView
} from 'react-native'
import styles from '../../constants/Styles'
import ElevatedView from 'react-native-elevated-view'
import HeaderView from '../../components/HeaderView'
import IconSearch from '../../components/IconSearch'

class UnlockScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state={
            icon: 'lock'
        }
    }
   
    playMusic = async () => {
        const soundObject = new Expo.Audio.Sound();
        try {
          await soundObject.loadAsync(require('../../assets/sounds/unlock.wav'));
          await soundObject.playAsync();
          // Your sound is playing!
        } catch (error) {
          // An error occurred!
        }
    }

    render() {
        return (
            /* SafeAreaView avoids the iPhone X's notch  */
                <SafeAreaView style={styles.container}>
                    {/* StatusBar.currentHeight avoids the StatusBar to overlap our screen */}
                    <View style={{height: StatusBar.currentHeight}}></View>
                    
                    {/* <View style={{flex: 2, backgroundColor:'black', flexDirection: 'row'}}>
                        <View style={{flex: 1, backgroundColor:'red'}}>

                        </View>
                        <View style={{flex: 1, backgroundColor:'blue'}}>

                        </View>
                    </View> */}
                    <View style={{flex:2}}>
                        <HeaderView txtTitle="Abrir" textBtn="" displayIcon="flex" displayBtn="none" nameIcon="cross" biblioIcon="" onPressIcon={() => this.props.navigation.goBack()} onPressBtn={() => console.log()} />
                    </View>
                    <View style={{flex: 3, justifyContent:'flex-end', alignItems: 'center'}}>
                        <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png%27%7D%7D'}} 
                                                        style={{ width: 50,
                                                                height: 50, 
                                                                borderRadius: 50/2}} />
                        <Text style={{fontSize: 24}}>Ana Rita Viana</Text>
                        <Text style={{fontSize: 18}}>SparkleIT</Text>
                        <Text style={{fontSize: 14}}>25 anos</Text>                                        
                    </View>
                    <View style={{flex: 2, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Text style={{fontSize: 24}}>17:52</Text>
                        <Text style={{fontSize: 18}}>24/10/18</Text>                                                
                    </View>
                    <View style={{flex: 5,justifyContent: 'center', alignItems:'center'}}>
                    <TouchableOpacity style={{padding:4,borderRadius:75}} onPress={() => {this.setState({icon: 'unlock-alt'}); this.playMusic() }}>
                        <ElevatedView elevation={5} 
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: 150/2,
                                alignItems:'center',
                                justifyContent: 'center',
                                backgroundColor: '#F2F2F2',
                                borderWidth:2, 
                                borderColor: '#007FB7'
                                }}> 

                            
                                <View style={{ flex: 1, alignSelf:'center', justifyContent: 'center' }}>
                                    <IconSearch name={this.state.icon} biblio='FontAwesome' size={100} color="#007FB7"></IconSearch>
                                </View>
                            </ElevatedView>
                    </TouchableOpacity>
                    </View>
                </SafeAreaView>
        )
    }
}

export default UnlockScreen
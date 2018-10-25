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
        this.state={}
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
                    <HeaderView textTitle="Abrir" textBtn="" displayIcon="flex" displayBtn="none" nameIcon="cross" biblioIcon="" onPressIcon={() => this.props.navigation.goBack()} onPressBtn={() => console.log()} />
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
                    <ElevatedView elevation={5} style={{
                            width: 200,
                            height: 200,
                            borderRadius: 200/2,
                            alignItems:'center',
                            justifyContent: 'center',
                            backgroundColor: '#F2F2F2',
                            padding: 30
                            }}>

                            <TouchableOpacity  onPress={() => {}}>
                                <View style={{ flex: 1, alignItems:'center', justifyContent: 'center'}}>
                                    <IconSearch name='unlock-alt' biblio='FontAwesome' size={100} color="#007FB7"></IconSearch>
                                </View>
                            </TouchableOpacity>

                        </ElevatedView>
                    </View>
                </SafeAreaView>
        )
    }
}

export default UnlockScreen
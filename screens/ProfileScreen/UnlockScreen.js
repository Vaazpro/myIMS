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
import Search from '../../components/IconSearch'
import * as PT from "../../constants/labels/pt_labels"


class UnlockScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state={
            icon : 'lock',
            clock: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
            profile: this.props.navigation.getParam('profile')
        }

        let self = this
        let day = new Date();
        day.setHours(0,0,0,0);
        /* day = day.toISOString(); */
        console.log("======= DATE =======")
        console.log(day.toISOString())
        
    }

    coordsDistance = (lat1, lon1, lat2, lon2) => {
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 + 
                c(lat1 * p) * c(lat2 * p) * 
                (1 - c((lon2 - lon1) * p))/2;
      
        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
      }

    
   
    playMusicAndUpdateAttendance = async () => {
        const soundObject = new Expo.Audio.Sound();
        try {
          await soundObject.loadAsync(require('../../assets/sounds/unlock.wav'));
          await soundObject.playAsync();
          // Your sound is playing!
        } catch (error) {
          // An error occurred!
        }
        //SERVIÇO PARA MARCAR PRESENÇA
       /*  new ProfileService().updateAttendanceByProfileId(this.state.profile.id, function(data){
            console.log(data)
        }) */

        navigator.geolocation.getCurrentPosition(function(pos){
            console.log("=========")
            console.log(pos.coords.latitude)
            console.log(pos.coords.longitude)
            
            //console.log(coordsDistance(pos.coords.latitude, pos.coords.longitude, 41.69422, -8.84872))
            if(PT.COMPANY_COORDS_LAT - 0.0003 < pos.coords.latitude && pos.coords.latitude < PT.COMPANY_COORDS_LAT + 0.0003){
                if(pos.coords.longitude > PT.COMPANY_COORDS_LNG - 0.0001 && pos.coords.longitude  < PT.COMPANY_COORDS_LNG + 0.0001){
                    alert("CHECKED")
                    console.log("CHECKED")
                }else{
                    alert("FAILED LONG")
                    console.log("FAILED LONG")
                }
            }else{
                alert("FAILED LAT")
                console.log("FAILED LAT")
            }
        })
        
    }

    

    render() {

        

        setTimeout(() => {
            this.setState({
                clock: (new Date().getHours()<10?'0'+new Date().getHours():new Date().getHours()) + ":" + (new Date().getMinutes()<10?'0'+new Date().getMinutes():new Date().getMinutes()) + ":" + (new Date().getSeconds()<10?'0'+new Date().getSeconds():new Date().getSeconds())
            })
        }, 500);
        const {navigation} = this.props
        const account = navigation.getParam('account')
        const logoImg = "http://ims-demoipvc.sparkleit.pt/"+ this.state.profile.attachmentId +".png?format=png&width=100%"
        
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
                        <HeaderView txtTitle={PT.UNLOCK_HEADER_TITLE} textBtn="" display="flex" displayBtn="none" name="cross" biblio="" onPress={() => this.props.navigation.goBack()} onPressBtn={() => console.log()} />
                    </View>
                    <View style={{flex: 3, justifyContent:'flex-end', alignItems: 'center'}}>
                        <Image source={{uri : logoImg}} 
                                                        style={{ width: 50,
                                                                height: 50, 
                                                                borderRadius: 50/2}} />
                        <Text style={{fontSize: 24}}>{this.state.profile.name}</Text>
                        <Text style={{fontSize: 18}}>Developer</Text>
                        <Text style={{fontSize: 14}}>{account.companies[0].name}</Text>                                        
                    </View>
                    <View style={{flex: 2, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Text style={{fontSize: 24}}>{this.state.clock}</Text>
                        <Text style={{fontSize: 18}}>{new Date().toLocaleDateString()}</Text>                                                
                    </View>
                    <View style={{flex: 5,justifyContent: 'center', alignItems:'center'}}>
                    <TouchableOpacity style={{padding:4,borderRadius:75}} onPress={() => {this.setState({icon: 'unlock-alt'}); this.playMusicAndUpdateAttendance() }}>
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
                                    <Search name={this.state.icon} biblio='FontAwesome' size={100} color="#007FB7"></Search>
                                </View>
                            </ElevatedView>
                    </TouchableOpacity>
                    </View>
                </SafeAreaView>
        )
    }
}

export default UnlockScreen
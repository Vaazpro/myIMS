import React, { Component } from 'react'
import {
    TouchableOpacity,
    View,
    LayoutAnimation,
    Platform,
    Animated,
    Text
} from 'react-native'
import Styles from '../../constants/Styles'
import { Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import IconSearch from '../../components/IconSearch'
import TextIcon from '../../components/TextIcon'
import CircularPhoto from '../../components/CircularPhoto';
/* import ProfileService from './ProfileService' */


class SlideScreen extends Component {
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
            expanded: 'none',
            profile:{},
            account: {companies:[{name:''}]}
        }
        this.rotation = new Animated.Value(0)

        /* let self = this
        new ProfileService().getProfile(function(profile){
           self.setState({
               profile: profile
           }) 
        })
        new ProfileService().getAccount(function(account){
            self.setState({
                account: account
            })
        })    */
    }

    render() {
        const profile = this.props.prof;
        const account = this.props.acc;
        console.log(profile)
        /* setTimeout(() => {
            console.log(this.state.account);
          }, 5000);
         */
        //setTimeout(() => {console.log("ryegfrt")}, 5000)
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

        //Calcular o número de dias desde a sua admissão

        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var initialDate = new Date(profile.admissionDate);
        var endDate = new Date();

        var diffDays = Math.round(Math.abs((endDate.getTime() - initialDate.getTime())/(oneDay)));

        const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

        const birthDate = new Date(profile.birthDate)

        const birthDay = birthDate.getDay() + " de " + months[birthDate.getMonth()]
        const logoImg = "http://ims-demoipvc.sparkleit.pt/"+ profile.attachmentId +".png?format=png&width=100%"
        const company = account.companies[0].name
        
        return (
            <View style={{ flex: 1, position: 'absolute'}}>
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
                                <View style={{height: 104, width: 104, borderRadius: 52, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                                <CircularPhoto image={logoImg} size={100}/>
                                </View>
                                
                            </View>                            
                            <View style={{flex: 2,flexDirection: 'row'}}>
                                <View style={{flex: 8,justifyContent: 'center'}}>
                                    <Text style={{fontSize: 24}}>{profile.name}</Text>
                                    <Text style={{fontSize: 18}}>Developer</Text>
                                    <Text style={{fontSize: 14}}>{diffDays}º dia na {company}</Text>
                                </View>    
                                <TouchableOpacity style={{flex: 1}} onPress={this.props.onP}>
                                    <View style={{flex: 1}}>
                                        <IconSearch style={{ alignSelf: 'flex-end'}} name="unlock-alt" biblio='FontAwesome' size={iconsize} color="grey"/>
                                    </View>
                                </TouchableOpacity>
                            </View>           
                        </View>
                    </View>
                    <View style={{paddingHorizontal:20 ,flex: 2, width: Dimensions.get('window').width,display: this.state.expanded}}>
                        <View style={{height: 10, borderBottomColor: 'rgba(216,217,221,0.5)', borderBottomWidth: 1 }}></View>
                        <TextIcon name={profile.email} icon='mail' biblio='Entypo'></TextIcon>
                        <TextIcon name={profile.email} icon='skype' biblio='FontAwesome'></TextIcon>
                        <TextIcon name={profile.phone} icon='phone' biblio='FontAwesome'></TextIcon>
                        <TextIcon name={(profile.sosContact ? profile.sosContact : profile.phone)} icon='medical-bag' biblio=''></TextIcon>
                        <TextIcon name={birthDay} icon='birthday-cake' biblio='FontAwesome'></TextIcon>
                        <View style={{flex: 1}}></View>
                    </View>
                </View>
                <View style={{
                    height:(Dimensions.get('window').height - this.state.h),
                    backgroundColor: 'black',
                    opacity: 0.4,
                    display: this.state.displaystatus}}>
                </View>
                <View style={[Styles.shadowArrow,{
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
                    paddingTop: 3, elevation: 5}]
                    }>
                    <Animated.View style={{transform:[{rotate}], flex: 1, alignItems:'center', justifyContent: 'center', alignSelf:'stretch'}}>
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
                            }}}>
                            <IconSearch name="ios-arrow-down" biblio="Ionicons" size={iconsize} color="#007FB7"/>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        )
    }
}

export default SlideScreen

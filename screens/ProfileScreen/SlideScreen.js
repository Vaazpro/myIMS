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
                                <CircularPhoto image='https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fpeopledotcom.files.wordpress.com%2F2016%2F09%2Fhonest-beuaty_jessica-alba_headshot.jpg%3Fw%3D2000&w=700&c=sc&poi=face&q=85' size={100}/>
                                </View>
                                
                            </View>                            
                            <View style={{flex: 2,flexDirection: 'row'}}>
                                <View style={{flex: 8,justifyContent: 'center'}}>
                                    <Text style={{fontSize: 24}}>Ana Rita Viana</Text>
                                    <Text style={{fontSize: 18}}>SparkleIT</Text>
                                    <Text style={{fontSize: 14}}>25 anos</Text>
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
                        <TextIcon name='rafamorais@gmail.com' icon='mail' biblio='Entypo'></TextIcon>
                        <TextIcon name='rafamorais@gmail.com' icon='skype' biblio='FontAwesome'></TextIcon>
                        <TextIcon name='999 999 999' icon='phone' biblio='FontAwesome'></TextIcon>
                        <TextIcon name='432 432 423' icon='phone' biblio='FontAwesome'></TextIcon>
                        <TextIcon name='7 de Dezembro' icon='birthday-cake' biblio='FontAwesome'></TextIcon>
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

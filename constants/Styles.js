
import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white'
    },
    row:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    red:{
        backgroundColor: 'red'
    },
    blue:{
        backgroundColor: 'blue'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        alignSelf:'stretch',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#F2F2F2'
    },
    shadow:{
        shadowColor: '#000',
        shadowOffset: {
            height: 0,
            width: 3
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65
    },
    shadowArrow:{
        shadowColor: '#000',
        shadowOffset: {
            height: 1,
            width: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 5
    }
})
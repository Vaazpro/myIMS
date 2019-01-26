
import {StyleSheet} from 'react-native'
import { Platform } from 'react-native'
import * as CONST from "../constants/labels/constants"
import Colors from './Colors';

export default StyleSheet.create({

    //GENERIC STYLES
    noStyle:{

    },
    container:{
        flex: 1,
        backgroundColor: Colors.SPARKLE_IT_WHITE
    },
    flex1:{
        flex: 1
    },
    flex2:{
        flex: 2
    },
    flex1horizontal:{
        flex:1,
        flexDirection: "row"
    },
    VerticalCenterRow:{
        justifyContent: 'center',
        flexDirection: 'row'
    },
    HorizontalCenterRow:{
        alignItems: "center",
        flexDirection: "row"
    },
    justifyCenter:{
        justifyContent:'center'
    },
    flex1relative:{
        flex: 1,
        position:"relative"
    },
    row:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    rowAlignRight:{
        flexDirection: 'row',
        alignItems:'flex-end'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        alignSelf:'stretch',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: Colors.SPARKLE_IT_LIGHTGRAY
    },
    shadow:{
        shadowColor: Colors.CALLENDAR_ARROW,
        shadowOffset: {
            height: 0,
            width: 3
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65
    },
    shadowArrow:{
        shadowColor: Colors.CALLENDAR_ARROW,
        shadowOffset: {
            height: 1,
            width: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 5
    },
    alignBottom:{
        justifyContent:'flex-end',
        flex:1
    },
    alignTop:{
        justifyContent:'flex-start',
        flex:1
    },
    font10:{
        fontSize: 10
    },
    font14:{
        fontSize: 14
    },
    font16:{
        fontSize: 16
    },
    font18:{
        fontSize: 18
    },
    font20:{
        fontSize: 20
    },
    verticalCenter:{
        justifyContent:'center'
    },

    //ATTENDANCE VIEW
    attendanceScreenMainView:{
        height: 60,
        flexDirection: 'row',
        borderRadius: 5,
        elevation: 1,
        marginBottom: 20,
        backgroundColor: Colors.SPARKLE_IT_LIGHTGRAY
    },
    attendaceBorderColor:{
        flex: 2,
        paddingLeft: 10,
        borderTopLeftRadius: 5,
        flexDirection: 'column',
        borderBottomLeftRadius:5,
        borderLeftWidth: 2,
        justifyContent:'center'
    },
    attendanceSeparator:{
        borderLeftColor: Colors.SPARKLE_IT_GRAY,
        borderLeftWidth:2,
        marginTop: 10,
        marginBottom: 10
    },
    attendanceStateSubtitle:{
        fontSize: 10,
        color: Colors.SPARKLE_IT_DARKGRAY
    },
    attendanceStateView:{
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft:10
    },
    attendacePhotoView:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems:'flex-end',
        paddingRight:10
    },
    
    //
    btnTextIconContainer:{
        paddingBottom: 5,
        height: 50,
        borderBottomColor: Colors.SPARKLE_IT_LIGHTGRAY,
        borderBottomWidth: 1,
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    btnTextIconFilterName:{
        flex: 9,
        alignItems: 'flex-start',
        flexDirection:'row'
    },
    btnTextIconImageHolder:{
        marginLeft:5,
        width:20,
        height: 20,
        justifyContent: 'center',
        alignItems:'center'
    },

    //HEADER VIEW
    headerContainer:{
        flex:1,
        justifyContent: 'center',
        padding:3
    },
    headerTitleContainer:{
        flex:1,
        justifyContent: 'center',
        paddingLeft: 10
    },
    headerSecondaryContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'flex-end',
        paddingRight:10
    },

    //RSOURCES FILTER VIEW
    resourcerFilterViewMainContainer:{
        width: 140,
        height:130,
        marginLeft: 15,
        marginTop:10,
        marginBottom:15,
        paddingLeft:5,
        paddingRight: 5
    },
    resourcerFilterViewPhotoContainer:{
        flex:3,
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative"
    },
    resourcerFilterViewPhotoHolder:{
        width:94,
        height:94,
        backgroundColor: Colors.SPARKLE_IT_WHITE,
        borderWidth:1,
        borderColor: Colors.SPARKLE_IT_GRAY,
        borderRadius: 47,
        justifyContent:"center",
        alignItems: "center",
        elevation: 5
    },
    resourceFilterViewIconHolder:{
        position:"absolute",
        width: 26,
        height: 26,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 13,
        backgroundColor: Colors.SPARKLE_IT_MAINCOLOR,
        top: "5%",
        right: "10%",
        elevation: 10,
    },
    resourceFilterViewTextHolder:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems:'center'
    },

    //TASKS FILTER VIEW
    tasksFilterViewMainContainer:{
        width: 150,
        height: 100,
        backgroundColor: Colors.SPARKLE_IT_TRANSPARENT,
        marginEnd: 2,
        marginStart: 2,
        padding: 5,
        position:"relative"
    },
    tasksFilterViewSecondaryContainer:{
        flex: 1,
        width: "100%",
        borderRadius: 5
    },
    tasksFilterViewClickableOption:{
        flex:1,
        width: "100%",
        backgroundColor: Colors.SPARKLE_IT_LIGHTGRAY,
        borderWidth:1,
        borderColor: Colors.SPARKLE_IT_GRAY,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    tasksFilterViewOptionText:{
        fontSize: Platform.OS === 'ios' ? 16 : 18,
        textAlign: "center"
    },
    tasksFilterViewHighlightContainer:{
        elevation: 10,
        position:"absolute",
        width:20,
        height: 20,
        backgroundColor: Colors.SPARKLE_IT_MAINCOLOR,
        right: 0,
        top: 0,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems:'center',
        borderWidth:1,
        borderColor: Colors.SPARKLE_IT_WHITE
    },

    //TASK VIEW
    taskViewPhotoContainer:{
        backgroundColor: Colors.SPARKLE_IT_WHITE,
        width: 22,
        height: 22 ,
        borderRadius: 12,
        alignItems:'center',
        justifyContent: 'center'
    },
    taskViewOtherUserContainer:{
        flexDirection: "row",
        marginTop: 6
    },
    taskViewMainContainer:{
        backgroundColor: Colors.SPARKLE_IT_LIGHTGRAY,
        width: 120,
        borderRadius: 5,
        elevation: 1,
        marginLeft: 15,
        marginTop:10,
        marginBottom:15,
        paddingLeft:5,
        paddingRight: 5,
        borderLeftWidth: 2
    },
    taskViewTextHolder:{
        flex:1,
        justifyContent:'center',
        alignItems:'flex-end'
    },

    //TEAM VIEW
    teamViewPhotoHolder:{
        backgroundColor: Colors.SPARKLE_IT_WHITE,
        width: 27,
        height: 27,
        borderRadius: 13.5,
        alignItems:'center',
        justifyContent: 'center'
    },
    teamViewOtherUsersContainer:{
        flexDirection: "row",
        marginTop: 6,
        marginLeft: 10
    },
    teamViewImageContainer:{
        flex: 2,
        borderTopLeftRadius: 5 ,
        borderBottomLeftRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        borderRightColor: Colors.SPARKLE_IT_GRAY,
        borderRightWidth: 2
    },
    teamViewTeamColor:{
        justifyContent:'center',
        alignItems: 'center',
        width:20,
        height: 20,
        borderRadius: 10,
        borderColor: Colors.SPARKLE_IT_BLACK,
        borderWidth: 1
    },
    teamViewTeamMembersContainer:{
        flex: 6,
        flexDirection: 'column',
        marginLeft:20,
        justifyContent: 'center'
    },
    teamViewMainContainer:{
        height: 70,
        flexDirection: 'row',
        borderRadius: 5,
        elevation: 1,
        marginBottom: 20,
        backgroundColor: Colors.SPARKLE_IT_LIGHTGRAY
    },

    //TEXT ICON
    textIcon_MainContainer:{
        paddingBottom: 5,
        borderBottomColor: Colors.SPARKLE_IT_GRAY,
        borderBottomWidth: 1,
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    textIcon_TitleContainer:{
        flex: 9,
        alignItems: 'flex-start'
    },
    textIcon_IconContainer:{
        flex: 1,
        alignItems: 'flex-end'
    },

    //TOGGLE LINE
    toggleLineMainContainer:{
        height:50,
        borderBottomColor: Colors.SPARKLE_IT_GRAY,
        borderBottomWidth: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: Colors.SPARKLE_IT_WHITE
    },
    toggleLineTitleContainer:{
        flex: 16,
        justifyContent: 'flex-end',
        paddingBottom: 8
    },
    toggleLineSwitchContainer:{
        flex: 4,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    //VACATIONS VIEW
    vacationsViewMainContainer:{
        height: 60,
        flexDirection: 'row',
        borderRadius: 5,
        elevation: 1,
        marginBottom: 20,
        backgroundColor: Colors.SPARKLE_IT_LIGHTGRAY
    },
    vacationsViewInnerLeftContainer:{
        paddingLeft: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        flexDirection: 'column',
        borderLeftWidth: 2,
        justifyContent:'center'
    },
    vacationsViewSeparator:{
        borderLeftColor: Colors.SPARKLE_IT_GRAY,
        borderLeftWidth:2,
        marginTop: 10,
        marginBottom: 10
    },
    vacationsViewInnerRightContainer:{
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft:10
    },
    vacationsViewPhotoHolder:{
        justifyContent: 'flex-end',
        alignItems:'flex-end',
        paddingRight:10
    }
})
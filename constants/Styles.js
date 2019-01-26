
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
    flex3:{
        flex: 3
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
    font24:{
        fontSize: 24
    },
    mbot10:{
        marginBottom:10
    },
    mleft10:{
        marginLeft: 10
    },
    mtop40:{
        marginTop:40
    },
    m10:{
        margin: 10
    },
    h10:{
        height: 10,
    },
    verticalCenter:{
        justifyContent:'center'
    },
    selfRight:{
        alignSelf: 'flex-end'
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
    },

    //ATTENDANCE SCRREN
    attendanceScreenHeaderMainContainer:{
        paddingRight: 10,
        backgroundColor: Colors.SPARKLE_IT_HEADERGRAY 
    },
    CrossButtonHolder:{
        alignSelf:'baseline',
        height:'100%',
        paddingLeft:5
    },
    attendanceScreenHeaderTitleHolder:{
        flex:1,
        justifyContent: 'center',
        alignItems:'flex-start',
        paddingLeft: 10
    },
    attendanceScreenButtonsContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: "row"
    },
    attendanceScreenComponentsContainer:{
        flex: 1,
        backgroundColor: Colors.SPARKLE_IT_WHITE,
        paddingLeft: 10,
        paddingRight: 10
    },
    attendanceScreenCalendarContainer:{
        flex:1,
        backgroundColor: Colors.SPARKLE_IT_HEADERGRAY,
        position: 'absolute',
        width:'100%',
    },
    expandableView:{
        position: 'absolute',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: Colors.SPARKLE_IT_HEADERGRAY,
        paddingTop: 3,
        elevation: 5
    },
    attendanceScreenAnimatedArrow:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        alignSelf:'stretch'
    },

    //VACATIONS SCREEN
    vacationsScreenMainHeaderContainer:{
        paddingRight: 10,
        backgroundColor: Colors.SPARKLE_IT_HEADERGRAY
    },
    vacationsScreenHeaderTitleBar:{
        flex:1,
        justifyContent: 'center',
        paddingLeft: 10
    },
    vacationsScreenPhotoContainer:{
        flex:1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    vacationsSreenComponentContainer:{
        paddingLeft:10,
        paddingRight: 10,
        backgroundColor: Colors.SPARKLE_IT_WHITE
    },
    vacationsScreenAddButton:{
        backgroundColor: Colors.SPARKLE_IT_MAINCOLOR,
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60/2,
        right: 10,
        bottom: 10,
        alignItems:'center',
        justifyContent: 'center',
        elevation: 5
    },
    vacationsScreenAddButtonIconHolder:{
        flex: 1, 
        alignSelf:'center', 
        justifyContent: 'center'
    },
    vacationsScreenAnimatedArrow:{
        flex: 1,
        position: 'absolute',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: Colors.SPARKLE_IT_HEADERGRAY,
        elevation: 5
    },
    vacationsScreemAniatedArrow:{
        flex: 1,
        alignItems:'center',
        alignSelf:'stretch'
    },

    //SLIDE SCREEN
    slideScreenMainContainer:{
        flex: 1,
        position: 'absolute'
    },
    slideScreenExpandableView:{
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor: Colors.SPARKLE_IT_LIGHTGRAY,
    },
    slideScreenHeadeContainer:{
        flex: 1,
        position: 'relative'
    },
    slideScreenHeaderInnerView:{
        flex: 1,
        margin: 20,
        flexDirection: 'row'
    },
    slideScreenPhotoContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    slideScreenPhoto:{
        height: 104,
        width: 104,
        borderRadius: 52,
        backgroundColor: Colors.SPARKLE_IT_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    slideScreenInfoContainer:{
        flex: 2,
        flexDirection: 'row'
    },
    slideScreenInfoData:{
        flex: 8,
        justifyContent: 'center'
    },
    slideScreenExpandedBackView:{
        backgroundColor: Colors.SPARKLE_IT_BLACK,
        opacity: 0.4
    },
    slideScreenAnimatedArrow:{
        flex: 1,
        position: 'absolute',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: Colors.SPARKLE_IT_LIGHTGRAY,
        paddingTop: 3,
        elevation: 5
    },
    slideScreenAnimatedView:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        alignSelf:'stretch'
    },

    //BUTTON INITIAL OPTIONS
    buttonInitianOptionIconContainer:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'center'
    },
    buttonInitianOptionDataContainer:{
        flex: 2,
        justifyContent: 'center'
    },
    buttonInitianOptionsTittle:{
        flex: 1,
        justifyContent: 'center'
    },
    buttonInitianOptionsSubtittle:{
        paddingTop:5
    },

    //ORDER VACATIONS VIEW
    orderVacationsViewCalendarContainer:{
        width: '100%',
        backgroundColor: Colors.SPARKLE_IT_HEADERGRAY,
        paddingTop: 10
    },
    orderVacationsViewDatesContainer:{
        paddingLeft:10,
        paddingRight: 10
    },

    //TEAMS
    teamsComponentContainer:{
        flex: 1,
        paddingLeft:10,
        paddingRight:10
    },

    //UNLOCK SCREEN
    unlockScreenTopContainer:{
        flex: 3,
        justifyContent:'flex-end',
        alignItems: 'center'
    },
    unlockScreenMiddleContainer:{
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    unlockScreenBottomContainer:{
        flex: 5,
        justifyContent: 'center',
        alignItems:'center'
    },
    unlockScreenPhoto:{
        width: 50,
        height: 50, 
        borderRadius: 50/2
    },
    unlockScreenLoginButtonContainer:{
        padding:4,
        borderRadius:75
    },
    unlockScreenLoginButton:{
        width: 150,
        height: 150,
        borderRadius: 150/2,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: Colors.SPARKLE_IT_LIGHTGRAY,
        borderWidth:2, 
        borderColor: Colors.SPARKLE_IT_MAINCOLOR
    },
    unlockScreenIconHolder:{
        flex: 1,
        alignSelf:'center',
        justifyContent: 'center'
    },

    //FILTERS SCREEN
    filtersScreenLoadingBackgrond:{
        position: 'absolute',
        alignItems: "center",
        justifyContent:'center',
        width:'100%'
    },
    filtersScreenDatePickersMainContainer:{
        height: 50,
        flexDirection: 'row'
    },
    filtersScreenDatePickersInnerLeftContainer:{
        flex:1,
        alignItems:'flex-start'
    },
    filtersScreenCalendar:{
        width:'90%', height: 50
    },
    filtersScreenDatePickersInnerRightContainer:{
        flex:1,
        alignItems:'flex-end'
    },

    //TASKS SCREEN
    tasksScreenHeaderMainContainer:{
        flex:2,
        flexDirection: 'row'
    },
    tasksScreenHeaderViewContainer:{
        flex:9,
        justifyContent:'center'
    },
    tasksScreenIconHolder:{
        flex:1,
        justifyContent:'center',
        backgroundColor: Colors.SPARKLE_IT_WHITE
    },
    tasksScreenIconBorder:{
        flex:1,
        flexDirection:'column',
        borderBottomWidth:1,
        borderBottomColor: Colors.SPARKLE_IT_GRAY
    },
    tasksScreenStateContainer:{
        flex:1,
        backgroundColor: Colors.SPARKLE_IT_LIGHTGRAY,
        paddingLeft: 10,
        paddingBottom: 4,
        paddingTop: 4
    },
    tasksScreenModalMainContainer:{
        position:'absolute',
        marginLeft:'10%',
        marginRight:'10%',
        marginTop:'40%',
        width:'80%',
        height:'40%',
        backgroundColor: Colors.SPARKLE_IT_LIGHTGRAY,
        borderWidth:2,
        borderColor: Colors.SPARKLE_IT_MAINCOLOR,
        borderRadius: 10,
        elevation: 10
    },
    tasksScreenPicker:{
        height: 50,
        width: 200
    },
    tasksScreenPickerButtonsContainer:{
        flex:1,
        flexDirection:"row",
        position: 'absolute',
        bottom: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius:10
    },
    tasksScreenCancelButton:{
        flex:1,
        justifyContent:'center',
        alignItems:'flex-start',
        marginLeft: '10%'
    },
    tasksScreenAcceptButton:{
        flex:1,
        justifyContent:'center',
        alignItems:'flex-end',
        marginRight: '10%'
    }

})
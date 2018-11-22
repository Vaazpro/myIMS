import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import TaskScreen from '../screens/TasksScreen/TasksScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import UnlockScreen from '../screens/ProfileScreen/UnlockScreen';
import NotificationsScreen from '../screens/SettingsScreen/NotificationScreen';
import Teams from '../screens/ProfileScreen/Teams';
import VacationScreen from '../screens/ProfileScreen/VacationScreen';
import FiltersScreen from '../screens/TasksScreen/FiltersScreen';
import OrderVacationScreen from '../screens/ProfileScreen/OrderVacationScreen';
import AttendanceScreen from '../screens/ProfileScreen/AttendanceScreen';
import IntroScreen from '../screens/SplashScreen/IntroScreen';
import Temp from '../screens/SplashScreen/Temp';

const ProfileStack = createStackNavigator({
  intro: IntroScreen,
  profile: ProfileScreen,
  unlock: UnlockScreen,
  teams: Teams,
  vacations: VacationScreen,
  orderVacations: OrderVacationScreen,
  attendances: AttendanceScreen
});


ProfileStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if(navigation.state.index == 0){
    tabBarVisible = false
  }
  return {
    /* swipeEnabled:false,
    animationEnabled:false, */
    tabBarVisible,
    tabBarLabel: 'PERFIL',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    )
  }
}

cenas = () => {
  console.log("Estou no cenas do MainTabNavigator.")
}

const TasksStack = createStackNavigator({
  tasks: TaskScreen,
  filters: FiltersScreen
});

TasksStack.navigationOptions = {
  tabBarLabel: 'TAREFAS',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  settings: SettingsScreen,
  notifications: NotificationsScreen
});

SettingsStack.navigationOptions = {
  
  tabBarLabel: 'CONFIGURAÇÕES',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  ProfileStack,
  TasksStack,
  SettingsStack,
});

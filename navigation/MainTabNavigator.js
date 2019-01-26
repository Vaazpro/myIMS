import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import TabBarIcon from '../components/TabBarIcon'
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import TaskScreen from '../screens/TasksScreen/TasksScreen'
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen'
import UnlockScreen from '../screens/ProfileScreen/UnlockScreen'
import NotificationsScreen from '../screens/SettingsScreen/NotificationScreen'
import Teams from '../screens/ProfileScreen/Teams'
import VacationScreen from '../screens/ProfileScreen/VacationScreen'
import FiltersScreen from '../screens/TasksScreen/FiltersScreen'
import OrderVacationScreen from '../screens/ProfileScreen/OrderVacationScreen'
import AttendanceScreen from '../screens/ProfileScreen/AttendanceScreen'
import * as PT from "../constants/labels/pt_labels"

const ProfileStack = createStackNavigator({
  profile: ProfileScreen,
  unlock: UnlockScreen,
  teams: Teams,
  vacations: VacationScreen,
  orderVacations: OrderVacationScreen,
  attendances: AttendanceScreen
});

ProfileStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: PT.PROFILE_BUTTON,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={ Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person'}/>
    )
  }
}

const TasksStack = createStackNavigator({
  tasks: TaskScreen,
  filters: FiltersScreen
});

TasksStack.navigationOptions = {
  tabBarLabel: PT.TASKS_BUTTON,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-list'} />
  ),
};

const SettingsStack = createStackNavigator({
  settings: SettingsScreen,
  notifications: NotificationsScreen
});

SettingsStack.navigationOptions = {
  
  tabBarLabel: PT.SETTINGS_BUTTON,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-settings${focused ? '' : '-outline'}` : 'md-settings'}
    />
  ),
};

export default createBottomTabNavigator({
  ProfileStack,
  TasksStack,
  SettingsStack,
});

import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
/* import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen'; */
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import TaskScreen from '../screens/TasksScreen/TasksScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import UnlockScreen from '../screens/ProfileScreen/UnlockScreen';

const ProfileStack = createStackNavigator({
  profile: ProfileScreen,
  unlock: UnlockScreen,
});

ProfileStack.navigationOptions = {
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
  ),
};

const TasksStack = createStackNavigator({
  tasks: TaskScreen,
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

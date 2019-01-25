import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import IntroScreen from '../screens/SplashScreen/IntroScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth: IntroScreen,
  Main: MainTabNavigator,
},
{
  initialRouteName: 'Auth',
});
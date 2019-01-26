import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors'

/** PROPS
 * name
 * focused
 */

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons name={this.props.name} size={26} style={{ marginBottom: -3 }} color={this.props.focused ? Colors.SPARKLE_IT_MAINCOLOR : Colors.SPARKLE_IT_GRAY}/>
    );
  }
}
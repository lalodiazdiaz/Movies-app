import React from 'react';

import Home from '../screens/Home';
import Details from '../screens/Details';
import {createStackNavigator} from '@react-navigation/stack';
import Video from '../screens/VideoScreen';
import NavBar from './NavBar';
import Search from '../screens/Search';

const Stack = createStackNavigator();
class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator headerMode={'screen'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={true} />
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={false} />
            ),
          }}
        />
        <Stack.Screen
          name="Video"
          component={Video}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={false} />
            ),
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={false} />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;

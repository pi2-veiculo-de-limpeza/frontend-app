import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import InitialScreen from './src/screens/InitialScreen';

const App = createStackNavigator({
  InitialScreen: {
    screen: InitialScreen
  }
},
)

export default App
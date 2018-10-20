import React from 'react';
import { createStackNavigator } from 'react-navigation';
import InitialScreen from './screens/InitialScreen';
import Register from './screens/Register';
import MainScreen from './screens/MainScreen';

export const SignedOutRoutes = createStackNavigator({
  InitialScreen: {
    screen: InitialScreen
  },

  Register: {
    screen: Register
  },
}
);

export const SignedInRoutes = createStackNavigator({
  MainScreen: {
    screen: MainScreen
  },
});

export const RootNavigator = (signedIn = false) => {
  return createStackNavigator({
    SignedIn: { screen: SignedInRoutes },
    SignedOut: { screen: SignedOutRoutes }
  },
  {
    headerMode: "none",
    mode: "modal",
    initialRouteName: signedIn ? "SignedIn" : "SignedOut",
    navigationOptions: {
      gesturesEnabled: false
    }
  });
};
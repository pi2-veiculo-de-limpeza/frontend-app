import React from 'react';
import { createStackNavigator } from 'react-navigation';
import InitialScreen from './screens/InitialScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import MainScreen from './screens/MainScreen';
import Logout from './screens/Logout'
import UpdateUserInfo from './screens/UpdateUserInfo'

// Routes for a not signed in user must be placed here.
export const SignedOutRoutes = createStackNavigator({
  InitialScreen: {
    screen: InitialScreen
  },

  Login: {
    screen: Login
  },

  Register: {
    screen: Register
  },
}
);

// Routes for a signed in user must be placed here.
export const SignedInRoutes = createStackNavigator({
  MainScreen: {
    screen: MainScreen
  },

  Logout: {
    screen: Logout
  },

  UpdateUserInfo: {
    screen: UpdateUserInfo
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
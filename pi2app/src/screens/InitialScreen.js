import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity } from 'react-native';
import styles from '../styles/GeneralStyles';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';
import RemoteHandle from './Remote'

class InitialScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  render() {
    return (
      <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}>
        <View style={styles.initialScreen}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.initialScreenTitle}>Robô Limpador de Terrenos Arenosos</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.7}
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              activeOpacity={0.7}
              onPress={() => this.props.navigation.navigate('Register')}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <RemoteHandle submit={(vehicle, ws) => {
          this.props.navigation.navigate("Joystick", {vehicle: vehicle, websocket: ws})
         } }> </RemoteHandle>
      </ImageBackground>

    );
  }
}

export default InitialScreen;

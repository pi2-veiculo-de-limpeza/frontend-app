import React from 'react';
import { StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity } from 'react-native';

const initialBackgroundImage = require('pi2app/images/sand.jpg');

const styles = StyleSheet.create({
  initialBackgroundImage: {
    flex: 1,
    width: null,
  },

  initialScreen: {
    flex: 1,
    backgroundColor: 'transparent',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
  },

  loginButton: {
    width: 320,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9500',
    borderRadius: 10,
    marginBottom: 60,
  },

  buttonText: {
    fontSize: 20,
    color: 'white',
  },

  registerButton: {
    width: 320,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9500',
    borderRadius: 10,
  },

  titleText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 140,
  },
});

class InitialScreen extends React.Component {
    static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ImageBackground style={styles.initialBackgroundImage} source={initialBackgroundImage}>
        <View style={styles.initialScreen}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.titleText}>Robô</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.7}
              onPress={() => Actions.loginScreen()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              activeOpacity={0.7}
              onPress={() => Actions.registerScreen()}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

    );
  }
}

export default InitialScreen;

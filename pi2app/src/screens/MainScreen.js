import React from 'react';
import { 
  Text,
  View,
  ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { onSignOut, getUserToken } from "../AuthMethods";
import styles from '../styles/GeneralStyles';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';

class MainScreen extends React.Component {
  state = {
    token: '',
  }

  componentWillMount(){
    getUserToken()
    .then(res => this.setState({ token: res }))
    .catch(err => alert("Erro"));
  }

  // Navigation header
  static navigationOptions = {
    title: 'Página Inicial',
    headerStyle: {
      backgroundColor: '#53A9F6',
      elevation: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      alignSelf:'center',
      fontWeight: 'bold',
      fontSize: 35,
    },
  };

  render() {
    console.log(this.state.token)
    return (
      <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}>
      <View>
          <Text>
              Página Inicial!
          </Text>

           <Text>
              {this.state.token}
          </Text>

          <Button
            backgroundColor="#000000"
            title="Sair"
            onPress={() => onSignOut().then(() => this.props.navigation.navigate("InitialScreen"))}
      />
      </View>
      </ImageBackground>

    );
  }
}

export default MainScreen;

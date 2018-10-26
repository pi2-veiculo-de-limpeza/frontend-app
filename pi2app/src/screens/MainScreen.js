import React from 'react';
import { 
  Text,
  View,
  ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { getUserToken, getUserId } from "../AuthMethods";
import styles from '../styles/GeneralStyles';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';

class MainScreen extends React.Component {
  state = {
    userToken: '',
    userId: ''
  }

  componentWillMount(){
    getUserToken().then(res => this.setState({ userToken: res }))
    getUserId().then(res => this.setState({ userId: res }))
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
    console.log('Token: ' + this.state.userToken)
    console.log('Id: ' + this.state.userId)
    return (
      <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}>
      <View>
          <Text>
              Página Inicial!
          </Text>

           <Text>
              {this.state.userToken}
          </Text>

          <Button
            backgroundColor="#000000"
            title="Logout"
            onPress={() => this.props.navigation.navigate("Logout")}
          />

          <Button
            backgroundColor="#000000"
            title="Editar conta"
            onPress={() => this.props.navigation.navigate("UpdateUserInfo", {
              userToken: this.state.userToken,
              userId: this.state.userId})}
          />
      </View>
      </ImageBackground>

    );
  }
}

export default MainScreen;

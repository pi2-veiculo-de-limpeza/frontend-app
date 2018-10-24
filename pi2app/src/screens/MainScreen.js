import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { onSignOut, getUserToken } from "../AuthMethods";

class MainScreen extends React.Component {
  state = {
    token: '',
  }

  componentWillMount(){
    getUserToken()
    .then(res => this.setState({ token: res }))
    .catch(err => alert("Erro"));
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    console.log(this.state.token)
    return (
      <View>
          <Text>
              Página Inicial!
          </Text>

           <Text>
              {this.state.token}
          </Text>

          <Button
            backgroundColor="#03A9F4"
            title="Sair"
            onPress={() => onSignOut().then(() => this.props.navigation.navigate("InitialScreen"))}
      />
      </View>

    );
  }
}

export default MainScreen;

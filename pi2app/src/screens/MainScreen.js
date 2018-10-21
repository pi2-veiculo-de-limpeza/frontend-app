import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { onSignOut } from "../AuthMethods";

class MainScreen extends React.Component {
    static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View>
          <Text>
              Página Inicial!
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

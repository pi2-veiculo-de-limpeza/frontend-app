import React from 'react';
import { Text, View } from 'react-native';

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
      </View>

    );
  }
}

export default MainScreen;

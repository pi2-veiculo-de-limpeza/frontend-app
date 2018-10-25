import React from 'react';
import { 
  Text,
  View,
  ImageBackground,
  StyleSheet,
  ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { onSignOut, getUserToken } from "../AuthMethods";
import styles from '../styles/GeneralStyles';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';


class VehicleCard extends React.Component {
  render() {
    return (
      <Card
        title={this.props.title}
        image={require('../images/sand.jpg')}>
        <Text style={{marginBottom: 10}}>
          The idea with React Native Elements is more about component structure than actual design.
        </Text>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW NOW' />
      </Card>
    );
  }
}


class MainScreen extends React.Component {
  state = {
    token: '',
    vehicles: [
      {
        title: 'Title'
      },
      {
        title: 'Other'
      },
    ]
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
    return (
      <ScrollView contentContainerStyle={styles_alternative.contentContainer}>
        <View>
          {this.state.vehicles.map((vehicle, index) => {
            return (
              <VehicleCard
                  title={vehicle.title}
                  key={index}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

export default MainScreen;

const styles_alternative = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});

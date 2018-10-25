import React from 'react';
import { 
  Text,
  View,
  ScrollView } from 'react-native';
import styles from '../styles/GeneralStyles';

class VehicleRegister extends React.Component {
  state = {
    token: '',
    vehicle: {}
  }

  // Navigation header
  static navigationOptions = {
    title: 'New Vehicle',
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
      <ScrollView contentContainerStyle={styles.vehicleScrollView}>
        <View>
            <Text>
                Vehicle Register
            </Text>
        </View>
      </ScrollView>
    );
  }
}

export default VehicleRegister;

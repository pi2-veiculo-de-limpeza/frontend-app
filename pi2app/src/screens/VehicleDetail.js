import React from 'react';
import { 
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  RefreshControl } from 'react-native';
import { Card, ListItem, Button, Icon, Badge } from 'react-native-elements';
import { onSignOut, getUserToken } from "../AuthMethods";
import styles from '../styles/GeneralStyles';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';

class VehicleDetail extends React.Component {
  state = {
    token: '',
    vehicle: {}
  }

  // Navigation header
  static navigationOptions = {
    title: 'Vehicle Detail',
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
                Vehicle Detail
            </Text>
        </View>
      </ScrollView>
    );
  }
}

export default VehicleDetail;

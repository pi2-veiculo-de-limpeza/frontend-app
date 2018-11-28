import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  ScrollView ,
  TouchableHighlight,
} from 'react-native';
import { Card } from 'react-native-elements';
import styles from '../styles/GeneralStyles';
import DefaultButton from "../components/DefaultButton";
import VehicleCard from '../components/VehicleCard';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';

class VehicleDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      missions: [],
    }
  }

  newMission(){
    // TODO: iniciar mapeamento do terreno
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.vehicle.name,
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
    }
  };

  render() {
    const {params} = this.props.navigation.state

    return(
      <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}>
        <ScrollView contentContainerStyle={styles.vehicleScrollView}>
          <VehicleCard
            key={1}
            vehicle={params.vehicle}
          />
          <DefaultButton
            type={"blue"}
            text={"Editar Robô"}
            padding={15}
            onPress={ () => this.props.navigation.navigate("VehicleEdit", {vehicle: params.vehicle}) } 
          />

          <View style={styles.simpleTextView}>
            <Text style={styles.simpleText}>
              Missões
            </Text>
          </View>

          <DefaultButton
            type={"green"}
            text={"Nova missão"}
            padding={15}
            onPress={() => this.newMission()}
          />

        </ScrollView>
      </ImageBackground>
      )
    }
  }

export default VehicleDetail;
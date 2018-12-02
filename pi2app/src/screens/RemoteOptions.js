import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
  Alert,
  ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { INITIAL_BACKGROUND_IMG } from '../constants/GeneralConstants';
import styles from '../styles/GeneralStyles';
import DefaultButton from "../components/DefaultButton";

class RemoteOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInStandby: true,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Opções',
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

  renderButton(){
    let button

    if(!this.state.isInStandby){
      button = 
      <View>
      <View style={buttonStyles.spaceButtons}>
        <DefaultButton
          type={"yellow"}
          text={"Standby"}
          padding={15}
          onPress={() => this.setState({ isInStandby: true })}
          />
      </View>
      <View style={buttonStyles.spaceButtons}>
        <DefaultButton
        type={"blue"}
        text={"Controle"}
        padding={15}
        onPress={() => console.log('')}
        />
      </View>
      <View style={buttonStyles.spaceButtons}>
        <DefaultButton
        type={"blue"}
        text={"Sensores"}
        padding={15}
        onPress={() => console.log('')}
        />
      </View>
      </View>
    } else {
      button = 
      <View style={buttonStyles.spaceButtons}>
        <DefaultButton
        type={"green"}
        text={"Iniciar"}
        padding={15}
        onPress={() => this.setState({ isInStandby: false })}
        />
      </View>
    }

    return button
  }

  render(){
    var button = this.renderButton()

    return(
      <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}>
        <View style={buttonStyles.optionsButtonsView}>
          {button}
        </View>
      </ImageBackground>
    )
  }
}

const buttonStyles = StyleSheet.create({
  optionsButtonsView: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 50,
  },

  spaceButtons: {
    padding: 50
  }
})

export default RemoteOptions;
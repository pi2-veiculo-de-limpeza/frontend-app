import React from "react";
import { ScrollView, 
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView } from "react-native";
import { 
  Card, 
  Button, 
  FormLabel, 
  FormInput,
  FormValidationMessage } from "react-native-elements";
import { onSignIn, isSignedIn } from "../AuthMethods";

const initialBackgroundImage = require('pi2app/images/sand.jpg');

const styles = StyleSheet.create({
  initialBackgroundImage: {
    flex: 1,
    width: null,
  }
});

class Register extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordAgain: ''
    };
  }

  componentDidMount(){
    const signed = isSignedIn();
  }

  static navigationOptions = {
    title: 'Cadastro',
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

  render(){
    return(
      <ImageBackground style={styles.initialBackgroundImage} source={initialBackgroundImage}>
        <KeyboardAvoidingView style={{ flex: 1, paddingVertical: 50}} behavior='padding'>
          <ScrollView>
          <Card>
            <FormLabel>Nome</FormLabel>
            <FormInput 
              placeholder="Digite seu nome"
              onChangeText={(text) => this.setState({name: text})} 
            />

            <FormLabel>E-mail</FormLabel>
            <FormInput 
              placeholder="Digite seu e-mail"
              onChangeText={(text) => this.setState({email: text})}
            />

            <FormLabel>Senha</FormLabel>
            <FormInput 
              secureTextEntry 
              placeholder="Digite sua senha"
              onChangeText={(text) => this.setState({password: text})}
            />

            <FormLabel>Confirmação da Senha</FormLabel>
            <FormInput 
              secureTextEntry
              placeholder="Confirme sua senha"
              onChangeText={(text) => this.setState({passwordAgain: text})} 
            />

            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="#03A9F4"
              title="Entrar"
              onPress={() => {
                onSignIn().then(() => this.props.navigation.navigate("MainScreen"));
              }}
            />
          </Card>
          </ScrollView>
        </KeyboardAvoidingView>
        
      </ImageBackground>
    )
  }
}

export default Register;
import React from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../Temporary";

export default ({ navigation }) => (
  <View style={{ paddingVertical: 20 }}>
    <Card>
      <FormLabel>E-mail</FormLabel>
      <FormInput placeholder="Digite seu e-mail" />
      <FormLabel>Senha</FormLabel>
      <FormInput secureTextEntry placeholder="Digite sua senha" />

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="Entrar"
        onPress={() => {
          onSignIn().then(() => navigation.navigate("MainScreen"));
        }}
      />
    </Card>
  </View>
);
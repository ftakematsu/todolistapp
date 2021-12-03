import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TodoInputText from "./TodoInputText.js";

function Login({ navigation }) {

  return (
    <Button
      title="Fazer login"
      onPress={() =>
        navigation.navigate('Profile', { user: 'user@mail.com' })
      }
    />
  );

}

const styles = StyleSheet.create({
  h1: {
    fontSize: 30,
    textAlign: "center",
    paddingTop: 8,
    paddingBottom: 15
  }
});


export default Login;
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TodoInputText from "./TodoInputText.js";

function Header({title, addTodo}) {

  const handleSave = (text) => {
    if (text.lenght!==0) {
      addTodo(text);
    }
  }

  return (
    <View>
      <Text style={styles.h1}>{title}</Text>

      <TodoInputText 
        placeholder="O que você quer fazer?"
        onSave={handleSave}
      />
      
    </View>
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


export default Header;
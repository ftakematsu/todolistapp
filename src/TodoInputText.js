import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

function TodoInputText({placeholder, onSave}) {

  const [text, setText] = React.useState("");

  const handleSubmit = () => {
    //alert("Adicionando: " + text);
    onSave(text);
    setText("");
  }

  return (
    <View style={styles.card}>
      <TextInput 
        style={styles.newtodo}
        type="text"
        placeholder={placeholder}
        value={text}
        onChangeText={ (text) => setText(text) }
        onSubmitEditing={ handleSubmit }
      />
    </View>
  );

}


const styles = StyleSheet.create({
  card: {
    borderColor: '#d0dde2',
    borderWidth: 0.5,
    borderRadius: 12
  },
  newtodo: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 23,
    width: '100%',
    fontSize: 18,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 12,
    height: 45,
  },
});


export default TodoInputText;
import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

function Search({title, searchTodo}) {
    
    const [text, setText] = React.useState("");

    const handleSearch = () => {
        searchTodo(text);
        setText("");
    }

    const setTextHandle = (text) => {
        setText(text);
        searchTodo(text);
    }

    return (
        <View>
          
          <Text style={styles.h1}>{title}</Text>

          <TextInput 
            style={styles.newtodo}
            type="text"
            placeholder="Palavra-chave"
            value={text}
            onChangeText={ (text) => setTextHandle(text) }
            onSubmitEditing={ handleSearch }
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
    },
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

  
export default Search;
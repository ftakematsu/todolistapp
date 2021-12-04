import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TodoInputText from "./TodoInputText.js";
import DatePicker from 'react-native-date-picker';


function Header({title, addTodo}) {
  const [date, setDate] = React.useState(new Date());

  const handleSave = (text) => {
    if (text.lenght!==0) {
      addTodo(text, date);
    }
  }

  return (
    <View>
      <Text style={styles.h1}>{title}</Text>

      <TodoInputText 
        placeholder="O que você quer fazer?"
        onSave={handleSave}
      />

      <DatePicker date={date} onDateChange={setDate} />
      
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
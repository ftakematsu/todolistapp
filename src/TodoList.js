import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Todo from "./Todo.js";

function TodoList({myTodoList, checkTodo}) {

  const [selectedId, setSelectedId] = React.useState(null);
 

  // Esta função está operando sobre um item individual da minha lista
  const renderItem = ({ item }) => (
    <Todo 
      item={ item } 
      checkTodo= { checkTodo }
      setSelectedId = { setSelectedId }
    />
  );

  return (
    <FlatList
      data={myTodoList}
      extraData={selectedId}
      renderItem={renderItem}
      keyExtractor={item => item._id}
    />
  );

}

const styles = StyleSheet.create({
  itemNonChecked: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemChecked: {
    backgroundColor: '#2ECC71',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default TodoList;
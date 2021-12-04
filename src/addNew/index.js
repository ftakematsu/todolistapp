import React, { Component } from 'react';
import { Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import Header from '../Header.js';
import TodoList from '../TodoList.js';
import * as Progress from 'react-native-progress';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AddNew extends Component {
  /*const [myTodoList, setMyTodoList] = React.useState(null);
  const [totalItens, setTotalItens] = React.useState(0);
  const [textAtual, setTextAtual] = React.useState("");
  const [userId, setUserId] = React.useState("");*/

  constructor() {
      super();
      this.getData();
  }
  
  state = {
      myTodoList: null,
      totalItens: 0,
      textAtual: "",
      userId: "",
      date: new Date()
  };

  buscarTodos = async () => {
    let user_id = this.state.userId;
    const response = await api.get('/todo/' + user_id);
    //alert(response.data);
    this.setState({ myTodoList: response.data });  
  }

  inserirTodo = async (text, dueTo=new Date()) => {
    //alert(text);
    let myId = this.state.userId;
    const response = await api.post('/todo', {
        user_id: myId,
        name: text,
        status: 0,
        due_to: dueTo
    }).then((response) => {
        this.buscarTodos();
    }, (error) => {
        alert(error);
    });
  }

  addMyTodo = (text, dueTo=new Date()) => {
    this.inserirTodo(text, dueTo);
  }
  
  /**
   * item: um objeto individual da lista
   */
   checkTodo = (item) => {
    let copyList = this.state.myTodoList;
    let index = copyList.indexOf(item); // Retorna o índice de um elemento
    copyList[index].checked = true; // Atualiza o atributo como true
    // copyList[index].title = "Finished";
    setMyTodoList(copyList); // Atualiza a lista
    //alert(myTodoList[index].title + " " + myTodoList[index].id + " " + myTodoList[index].checked);
  }

  getData = async () => {
    try {
      let id = await AsyncStorage.getItem('user_id');
      if (id !== null) {
        this.setState({ userId: id });  
        this.buscarTodos();
      }
      else {
        setUserId("[Usuário indefinido]");
      }
    } catch(e) {
      // error reading value
    }
  }

  returnPage = async () => {
    let keys = ['user_id'];
    AsyncStorage.multiRemove(keys, (err) => {
        this.props.navigation.navigate('SignIn');
    });
  }
  
  render() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>{this.state.userId}</Text>
            <Button onPress={this.returnPage} title="Sair" />
            <Header 
                title="Minha lista de tarefas"
                addTodo={this.addMyTodo}
            />
            
            {
                (this.state.myTodoList!=null) &&
                <TodoList 
                    myTodoList = {this.state.myTodoList}
                    checkTodo = {this.checkTodo}
                />       
            }

            {
                (this.state.myTodoList==null) && 
                <Progress.Bar style={styles.centerObject} indeterminate={true} />
            }

        </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centerObject: {
    alignContent: 'center',
    margin: 20
  }
});

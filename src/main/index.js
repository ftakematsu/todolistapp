import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Button, SafeAreaView } from 'react-native';
import Header from '../Header.js';
import Search from '../Search';
import TodoList from '../TodoList.js';
import { useEffect } from 'react';
import * as Progress from 'react-native-progress';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

export default class Main extends Component {
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
      userId: ""
  };

  buscarTodos = async () => {
    let user_id = this.state.userId;
    const response = await api.get('/todo/' + user_id);
    //alert(response.data);
    this.setState({ myTodoList: response.data });  
  }

  inserirTodo = async (text) => {
    
  }

  buscarTodo = async (text) => {
    let user_id = this.state.userId;
    
    const response = await api.get('/todo/' + user_id + "?name=" + text);

    this.setState({ myTodoList: response.data });
  }

  addMyTodo = (text) => {
    this.buscarTodo(text);
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

  goToAddPage = () => {
    this.props.navigation.navigate('AddNew');
  }
  
  render() {
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
              <Text>{this.state.userId}</Text>
              <Button style={{minWidth: "50%", justifyContent: 'flex-end'}} onPress={this.goToAddPage} title="Adicionar" />
              <Button style={{minWidth: "50%", justifyContent: 'flex-end'}} onPress={this.returnPage} title="Sair" />
            </View>

            <Search 
                title="Sua lista de tarefas"
                searchTodo={this.addMyTodo}
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
  },
  header: {
    flexDirection: 'row'
  }
});

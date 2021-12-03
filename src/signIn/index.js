import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from 'react-native';

import { StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class SignIn extends Component {
    static navigationOptions = {
        header: () => [],
    };
    
    static propTypes = {
        navigation: PropTypes.shape({
          navigate: PropTypes.func,
          dispatch: PropTypes.func,
        }).isRequired,
    };


    state = {
        userId: 'admin',
        error: '',
    };

    handleUserIdChange = (userId) => {
        this.setState({ userId });
    };

    generateId = async() => {
        const response = await api.get('/genId');
        this.setState({ userId: response.data.id });
    }

    handleSignInPress = async () => {
        if (this.state.userId.length === 0) {
            alert('Preencha o ID do usuário continuar!');
        } else {
            
            await AsyncStorage.multiSet([
                ["user_id", this.state.userId]
            ]);

            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'Main' }),
                ],
            });
            this.props.navigation.dispatch(resetAction);
        }
    };
    
    render() {
        return (
          <View style={styles.container}>
            <TextInput style={styles.input}
              placeholder="Id do usuário"
              value={this.state.userId}
              onChangeText={this.handleUserIdChange}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button style={styles.button} onPress={this.handleSignInPress} title="Entrar" />
              <Button style={styles.button} onPress={this.generateId} title="Gerar ID segura" />
            </View>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5F5F5'
    },
    logo: {
      height: '30%',
      marginBottom: 40
    },
    input: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 5,
      backgroundColor: '#FFF',
      alignSelf: 'stretch',
      marginBottom: 15,
      marginHorizontal: 20,
      fontSize: 16
    },
    button: {
      padding: 20,
      borderRadius: 5,
      backgroundColor: '#FC6663',
      alignSelf: 'stretch',
      margin: 15,
      marginHorizontal: 20
    },
    error: {
      textAlign: 'center',
      color: '#ce2029',
      fontSize: 16,
      marginBottom: 15,
      marginHorizontal: 20
    },
    createAccout: {
      padding: 10,
      marginTop: 20
    },
    createAccoutText: {
      color: '#999',
      fontSize: 16,
      textAlign: 'center'
    }
  });
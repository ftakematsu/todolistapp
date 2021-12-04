import React, {useRef} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { CheckBox } from 'react-native-elements';
import api from './services/api';

function Todo({item, checkTodo, setSelectedId}) {

  const [isVisible, setIsVisible] = React.useState(true);
  const [isChecked, setIsChecked] = React.useState(item.status);

  const alterarStatusItemApi = async () => {
    setIsChecked(!isChecked);
    const response = await api.put('/todo/' + item._id, {
      user_id: item.user_id,
      name: item.name,
      status: (item.status==0) ? 1 : 0,
      due_to: item.due_to
    });

  }

  const removerItemApi = async () => {
    //alert(item._id);
    setIsVisible(!isVisible);
    const response = await api.delete('/todo/' + item._id);
  }

  const handleCheck = () => {
    alterarStatusItemApi();
  }

  const handleVisible = () => {
    removerItemApi();
  }

  const selectItem = () => {
    //alert("Você concluiu a tarefa " + item.id + ": " + item.title);
    setSelectedId(item.id);
    checkTodo(item);
  }

  const swipeRef = useRef();

  const closeSwipable = () => {
    swipeRef?.current?.close();
  }

  const rightAction = () => {
    return (
      <View style={styles.rightSwipe}>
        <Text style={{ color: "#fff" }}>Remover</Text>
      </View>
    );
  }

  const leftAction = () => {
    if (isChecked) {
      return (
        <View style={styles.leftSwipeIncomplete}>
          <Text style={{ color: '#fff' }}>Desmarcar</Text>
        </View>
      );
    }
    else {
      return (
        <View style={styles.leftSwipeComplete}>
          <Text style={{ color: "#fff" }}>Marcar</Text>
        </View>
      );
    }
  }

  const handleLongPress = () => {
    alert(item._id);
  }

  const formatData = (data) => {
    if (data=="") return "";
    var dataform  = new Date(data);
    return (dataform.toLocaleDateString("pt-BR"));
  }

  // Se estiver visível, retornar vazio
  if (isVisible === false) {
    return (
      <View></View>
    );
  }
  /* Aqui define a aparência de cada item = item.name */
  return ( 
    <Swipeable
      ref={swipeRef}
      onSwipeableOpen={closeSwipable}
      onSwipeableRightOpen={handleVisible}
      onSwipeableLeftOpen={handleCheck}
      renderLeftActions={leftAction}
      renderRightActions={rightAction}
      overshootFriction={1}
      friction={1}
      containerStyle={{overflow: 'hidden'}}
    >
        <View style={styles.item} >
        <Text style={isChecked ? styles.complete : styles.incomplete}>{item.name}</Text>

        <Text>{formatData(item.due_to)}</Text>
          
          <TouchableOpacity onLongPress={handleLongPress}>
            <Text>Visualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleVisible}>
            <Text>Remove</Text>
          </TouchableOpacity>
        </View>
    </Swipeable>
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
  complete: {
    textDecorationLine: 'line-through',
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap'
  },
  incomplete: {
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap'
  },
  toggle: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingLeft: 25,
    paddingVertical: 10,
    borderColor: '#d0dde2',
    borderWidth: 0.5,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  rightSwipe: {
    flex: 1,
    backgroundColor: '#af5b5e',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
    marginBottom: 5,
  },
  leftSwipeComplete: {
    flex: 1,
    backgroundColor: '#3293b3',
    borderRadius: 12,
    justifyContent: 'center',
    paddingLeft: 15,
    marginBottom: 5,
  },
  leftSwipeIncomplete: {
    flex: 1,
    backgroundColor: '#20b286',
    borderRadius: 12,
    justifyContent: 'center',
    paddingLeft: 15,
    marginBottom: 5,
  },
});

export default Todo;

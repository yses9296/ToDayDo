import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text,  TextInput, ScrollView, Dimensions  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons'; 
import { theme } from '../colors.js';

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const STORAGE_KEY ='@toDos'

const ToDoView = () => {
    const [task, setTask] = useState('');
    const onChangeText = (e) => setTask(e);

    const [todos, setTodos] = useState({});

    useEffect(() => {
        loadToDos();
    },[])

    const saveTodos = async (_todo) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(_todo))
        }
        catch(e){
            alert(e)
        }
    }
    const loadToDos = async () => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            return data !== null ? setTodos(JSON.parse(data)) : null;
        }
        catch(e){
            alert(e)
        }
    }
    const addTaskHandler = async () => {
        if(task === "") {
            return
        }
        const newTodos = {...todos, [Date.now()]: {text: task} }
        setTodos(newTodos);    
        await saveTodos(newTodos);
        //reset
        setTask('');
    }
    return (
        <View>
            <TextInput 
            style={styles.taskInput}
            onChangeText={text => onChangeText(text)}
            onSubmitEditing={addTaskHandler}
            value={task}
            placeholder= 'add a new task'
            returnKeyType='done'
            />
            <ScrollView>
            {Object.keys(todos).reverse().map( key => (
                <View key={key} style={styles.task}>
                    <Text style={styles.taskText}>{todos[key].text}</Text>
                </View>
            ))}
            </ScrollView>
        </View> 
    )
}

const styles = StyleSheet.create({
    taskInput: {
      backgroundColor: theme.white,
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginVertical: 20,
      fontSize: 18,
    },
  
    task: {
      backgroundColor: theme.toDoBg,
      marginBottom: 10,
      paddingVertical: 20,
      paddingHorizontal: 40,
      borderRadius: 5
    },
    taskText: {
      color: theme.white,
      fontSize: 18,
      fontWeight: '500'
    },

});

export default ToDoView
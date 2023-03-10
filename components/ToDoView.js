import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Dimensions, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../colors.js';
import ToDoItem from './ToDoItem.js';

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const STORAGE_KEY ='@toDos'

const ToDoView = memo(() => {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState({});

    useEffect(() => {
        loadToDos();
    },[todos, saveTodos]);

    const onChangeText = (e) => setTask(e);
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
        const newTodos = {...todos, [Date.now()]: {text: task, completed: false} }
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
            {Object.keys(todos).reverse().map( (key) => (
                <ToDoItem key={key} _key={key} __todos={todos} _saveTodos={saveTodos} _loadToDos={loadToDos}/>
            ))}
            </ScrollView>
        </View> 
    )
})

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
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems:'center',
    },
    taskText: {
        flex: 5,
        color: theme.white,
        fontSize: 18,
        fontWeight: '500'
    },

    checkBox: {
        flex: 1,
        marginRight: 20
    },

    deleteBtn: {
        marginLeft: 15
    },
});

export default ToDoView
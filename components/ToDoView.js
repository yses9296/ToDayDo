import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Dimensions, Alert  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons'; 
import { theme } from '../colors.js';

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const STORAGE_KEY ='@toDos'

const ToDoView = () => {
    const [task, setTask] = useState('');
    const onChangeText = (e) => setTask(e);

    const [todos, setTodos] = useState({});
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        loadToDos();
    },[toggle, todos])


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
    const removeTaskHandler = (id) => {
        Alert.alert(
            "Delete To Do", 
            "Are you sure?", 
            [
                {text: "Cancel"}, 
                {text: "Delete", style: "destructive", onPress: () => {
                    const newTodos = {...todos}
                    delete newTodos[id]
            
                    setTodos(newTodos);    
                    saveTodos(newTodos);
                }}
            ]
        )
    }
    const toggleCheck = (id) => {
        const newTodos = {...todos}

        newTodos[id].completed ? newTodos[id].completed=false : newTodos[id].completed=true

        setToggle( prev => !prev )
        setTodos(newTodos);    
        saveTodos(newTodos);

    }
    const updateTaskHandler = async(id) => {

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
 
                    { !todos[key].completed
                    ? (
                        <>
                            <Fontisto name="checkbox-passive" size={20} color={theme.white} style={styles.checkBox} onPress={() => toggleCheck(key) }/> 
                            <Text style={{...styles.taskText, color: 'white'}}>{todos[key].text}</Text>
                        </>
                    )
                    : (
                        <>
                            <Fontisto name="checkbox-active" size={20} color={theme.grey} style={styles.checkBox} onPress={() => toggleCheck(key) }/>
                            <Text style={{...styles.taskText, color: '#3A3D40'}}>{todos[key].text}</Text>
                        </>
                    )}
                    

                    <TouchableOpacity onPress={ () => removeTaskHandler(key) }>
                        <Fontisto name="trash" size={20} color={theme.grey} />
                    </TouchableOpacity>
                    
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
    }

});

export default ToDoView
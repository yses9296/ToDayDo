import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, } from 'react-native';
import { FontAwesome , Fontisto } from '@expo/vector-icons'; 
import { theme } from '../colors.js';

const ToDoItem = ({ _key, __todos, _saveTodos, _loadToDos}) => {
    const [_todos, setTodos] = useState({...__todos});
    const [isEditing , setIsEditing] = useState(false);
    const [newTask, setNewTask] = useState(_todos[_key].text);

    useEffect(() => {
        _loadToDos();
    },[_todos, isEditing]);

    const onChangeText = (e) => setNewTask(e);
    const removeTaskHandler = (id) => {
        Alert.alert(
            "Delete To Do", 
            "Are you sure?", 
            [
                {text: "Cancel"}, 
                {text: "Delete", style: "destructive", onPress: () => {
                    const newTodos = {..._todos}
                    delete newTodos[id]
                
                    _saveTodos(newTodos);
                }}
            ]
        )
    }
    const toggleCheck = (id) => {
        const newTodos = {..._todos}
        newTodos[id].completed ? newTodos[id].completed=false : newTodos[id].completed=true  
        _saveTodos(newTodos);
    }
    const toggleEdit = () => {
        setIsEditing( prev => !prev );
    }
    const updateTaskHandler = (id) => {
        if(newTask === ''){
            return
        }
        const newTodos = {..._todos}
        newTodos[id].text = newTask   
        _saveTodos(newTodos);

        //reset
        setNewTask('');
        setIsEditing(false)
    }


    return (
        <>
            { isEditing 
            ? (
            <View key={_key} style={styles.task}>
            
            <TextInput 
                style={styles.editInput}
                value={newTask}
                onChangeText={text => onChangeText(text)}
                onSubmitEditing={() => {updateTaskHandler(_key)}}
            />                
            
            </View>
            ) : 
            (
                <View key={_key} style={styles.task}>
            
                    { !_todos[_key].completed
                    ? (
                        <>
                            <Fontisto name="checkbox-passive" size={20} color={theme.white} style={styles.checkBox} onPress={() => toggleCheck(_key) }/> 
                            <Text style={{...styles.taskText, color: 'white'}}>{_todos[_key].text}</Text>
                        </>
                    )
                    : (
                        <>
                            <Fontisto name="checkbox-active" size={20} color={theme.grey} style={styles.checkBox} onPress={() => toggleCheck(_key) }/>
                            <Text style={{...styles.taskText, color: '#3A3D40'}}>{_todos[_key].text}</Text>
                        </>
                    )}

                    <TouchableOpacity onPress={ () => toggleEdit(_key) }>
                        <FontAwesome name="pencil" size={20} color={theme.grey} />   
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteBtn} onPress={ () => removeTaskHandler(_key) }>
                        <Fontisto name="trash" size={20} color={theme.grey} />
                    </TouchableOpacity>                 
                
                </View>
            )
    }
        </>
        
    )
}
const styles = StyleSheet.create({
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

    editInput: {
        flex: 1,
        backgroundColor: theme.white,
        padding: 5,
        borderRadius: 5
    },
});


export default ToDoItem
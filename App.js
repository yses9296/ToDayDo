import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, Pressable, SafeAreaView, TextInput } from 'react-native';
// import { Calendar } from "react-native-calendars";
import CalendarView from './components/CalendarView';

import { Fontisto } from '@expo/vector-icons'; 
import { theme } from './colors.js';

export default function App() {
  const [activeTodo, setActiveTodo] = useState(true);
  const clickTodo = () => setActiveTodo(true);
  const clickCalendar = () => setActiveTodo(false);

  const [task, setTask] = useState('');
  const onChangeText = (e) => setTask(e);
  const addTaskHandler = () => {}

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Pressable onPress={clickTodo}>
          <Text style={{...styles.headerText, color: activeTodo ? theme.white : theme.grey}}>
            <Fontisto name="nav-icon-list-a" size={24} color="white" />
          </Text>
        </Pressable>
        <Pressable onPress={clickCalendar}>
          <Text style={{...styles.headerText, color: !activeTodo ? theme.white : theme.grey}}>
            <Fontisto name="calendar" size={24} color="white" />
          </Text>
        </Pressable>
      </View>
  
      {activeTodo ? (
        <View>
          <TextInput 
            style={styles.taskInput}
            onChangeText={text => onChangeText(text)}
            value={task}
            multiline
            placeholder= 'New Task'
          />
          <Button 
            onPress={addTaskHandler}
            title="Add"
          />
        </View>
      ) : ( <CalendarView/> )}
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 100,
    marginBottom: 20
  },
  headerText: {
    color: theme.grey,
    fontSize: 40,
    fontWeight: '500'
  },

  taskInput: {
    backgroundColor: theme.white,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    fontSize: 18
  },

});

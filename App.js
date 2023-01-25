import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToDoView from './components/ToDoView';
import CalendarView from './components/CalendarView';
import { Fontisto } from '@expo/vector-icons'; 
import { theme } from './colors.js';

const VIEW_KEY = '@views'

export default function App() {
  const [activeTodo, setActiveTodo] = useState(true);

  useEffect(()=>{
    loadView()
  },[])
  const clickTodo = () => {
    setActiveTodo(true);
    saveView(true);
  }
  const clickCalendar = () =>{
    setActiveTodo(false);
    saveView(false);
  }

  const saveView = async (activeTodo) => {
      try {
          await AsyncStorage.setItem(VIEW_KEY, JSON.stringify(activeTodo))
      }
      catch(e){
          alert(e)
      }
  }
  const loadView = async () => {
      try {
          const data = await AsyncStorage.getItem(VIEW_KEY);
          return data !== null ? setActiveTodo(JSON.parse(data)) : null;
      }
      catch(e){
          alert(e)
      }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Pressable onPress={clickTodo}>
            <Fontisto name="nav-icon-list-a" size={24} color={activeTodo ? theme.white : theme.grey} />
        </Pressable>
        <Text style={styles.title}>{activeTodo ? "ToDo" : "Calendar" }</Text>
        <Pressable onPress={clickCalendar}>
            <Fontisto name="calendar" size={24} color={!activeTodo ? theme.white : theme.grey} />
        </Pressable>
      </View>
  
      {activeTodo ? <ToDoView/> : <CalendarView/>}

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
    marginTop: 80,
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: theme.white
  },

});

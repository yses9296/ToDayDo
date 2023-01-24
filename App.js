import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable } from 'react-native';
import ToDoView from './components/ToDoView';
import CalendarView from './components/CalendarView';

import { Fontisto } from '@expo/vector-icons'; 
import { theme } from './colors.js';

export default function App() {
  const [activeTodo, setActiveTodo] = useState(true);
  const clickTodo = () => setActiveTodo(true);
  const clickCalendar = () => setActiveTodo(false);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Pressable onPress={clickTodo}>
            <Fontisto name="nav-icon-list-a" size={24} color={activeTodo ? theme.white : theme.grey} />
        </Pressable>
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
    marginTop: 100,
    marginBottom: 20
  },
  headerText: {
    color: theme.grey,
    fontSize: 40,
    fontWeight: '500'
  },

});

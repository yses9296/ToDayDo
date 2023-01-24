import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Pressable, TextInput, ScrollView, Dimensions  } from 'react-native';
import CalendarView from './components/CalendarView';

import { Fontisto } from '@expo/vector-icons'; 
import { theme } from './colors.js';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [activeTodo, setActiveTodo] = useState(true);
  const clickTodo = () => setActiveTodo(true);
  const clickCalendar = () => setActiveTodo(false);

  const [task, setTask] = useState('');
  const onChangeText = (e) => setTask(e);

  const [todoList, setTodoList] = useState({});

  const addTaskHandler = () => {
    if(task === "") {
      return
    }
    const newTodoList = {...todoList, [Date.now()]: {text: task} }
    setTodoList(newTodoList)    
    //reset
    setTask('');
  }

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
  
      {activeTodo ? (
        <View>
          <TextInput 
            style={styles.taskInput}
            onChangeText={text => onChangeText(text)}
            onSubmitEditing={addTaskHandler}
            value={task}
            placeholder= 'add a new task'
            returnKeyType='done'
          />
          {/* <View style={{alignItems: 'center'}}>
            <Pressable onPress={addTaskHandler} style={styles.addBtn}>
              <Text style={styles.addText}>Add</Text>
            </Pressable>
          </View> */}

          <ScrollView>
            {Object.keys(todoList).map( key => 
              (<View style={styles.task}>
                <Text style={styles.taskText}>{todoList[key].text}</Text>
              </View>)
            )}
          </ScrollView>
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
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 20,
    fontSize: 18,
  },

  // addBtn: {
  //   width: SCREEN_WIDTH/2,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: 4,
  //   elevation: 3,
  //   backgroundColor: theme.grey,
  //   marginBottom: 30
  // },
  // addText: {
  //   color: '#fff',
  //   textAlign: 'center',
  //   paddingVertical: 10,
  // },

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

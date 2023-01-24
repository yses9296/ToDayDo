import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import uuid from 'react-native-uuid';
import { theme } from '../colors';

const CalendarView = () => {
  const [event, setEvent] = useState('');
  const generateId = 1;
  const posts = [
    {
      id: 1,
      title: "First Title.",
      contents: "First Content.",
      date: "2023-01-26",
    }
  ];

  const markedDates = posts.reduce((acc, c) => {
    const formattedDate = format(new Date(c.date), 'yyyy-MM-dd');
    acc[formattedDate] = {marked: true};
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState( format(new Date(), "yyyy-MM-dd") );
  
  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    }
  }

  const onChangeText = (e) => setEvent(e);
  const addEventHandler = () => {
    alert(selectedDate)
  }

  return (
    <View>
        <Calendar 
          style={styles.calendar} 
          markedDates={markedSelectedDates}
          theme={{
            selectedDayBackgroundColor: 'red',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#183641',
            arrowColor: 'blue',
          }}
          onDayPress={day => setSelectedDate(day.dateString)}
        />

        <View>
          <Text style={styles.date}>{selectedDate}</Text>
          <TextInput 
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            placeholder='New Event'
            value={event}
          />
          <Button 
            style={styles.addBtn}
            onPress={addEventHandler}
            title="Add"
          />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    calendar: {
      padding: 20,
      marginVertical: 20,
      borderRadius: 10
    },
    date: {
      color: theme.white,
      textAlign: 'center',
      fontSize: 24
    },
    input: {
      backgroundColor: theme.white,
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginVertical: 20,
      fontSize: 18
    },
    addBtn: {

    },
});

export default CalendarView
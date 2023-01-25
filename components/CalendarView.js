import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import { theme } from '../colors';
import EventItem from './EventItem';

const STORAGE_KEY ='@events'

const CalendarView = () => {
  const [event, setEvent] = useState('');
  const [events, setEvents] = useState([]);
  const today =  format(new Date(), 'yyyy-MM-dd');
  const [selectedDate, setSelectedDate] = useState( format(new Date(), "yyyy-MM-dd") );
  

  const markedDates = () => {
    if(events.length){
      events.reduce((acc, c) => {
        const formattedDate = format(new Date(c.date), 'yyyy-MM-dd');
        acc[formattedDate] = {marked: true};
        return acc;
      }, {});
    }
    return {today: {selected: true}}
  }

  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    }
  }

  const onChangeText = (e) => setEvent(e);

  useEffect(()=>{
    loadEvents();
  },[events])

  const loadEvents = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        return data !== null ? setEvents(JSON.parse(data)) : null;
    }
    catch(e){
        alert(e)
    }
}
  const saveEvents = async (_event) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(_event))
    }
    catch(e){
        alert(e)
    }
  }
  const addEventHandler = async () => {
    if(event !== "" && event !== null && selectedDate != null) {
      const newEvents = [...events, {id: [Date.now()], title: event, date: selectedDate} ]
      setEvents(newEvents);    
      await saveEvents(newEvents);
  
      //reset
      setEvent('');
    }
    else{
      return
    }
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
            onSubmitEditing={addEventHandler}
            returnKeyType='done'
          />
          <Button 
            style={styles.addBtn}
            onPress={addEventHandler}
            title="Add"
          />
        </View>

        <ScrollView>
          {events.filter(event => event.date == selectedDate).map( (v,i) => {
              return (
                <EventItem key={i} _events={events} eventItem={v} _saveEvents={saveEvents}/>
              )
          })}
        </ScrollView>
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
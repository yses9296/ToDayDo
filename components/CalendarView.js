import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from "react-native-calendars";

const CalendarView = () => {
  return (
    <View>
        <Calendar style={styles.calendar} />
    </View>
  )
}
const styles = StyleSheet.create({
    calendar: {
      padding: 20,
      marginVertical: 20,
      borderRadius: 10
    }
});

export default CalendarView
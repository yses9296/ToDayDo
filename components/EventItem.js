import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { FontAwesome , Fontisto } from '@expo/vector-icons'; 
import { theme } from '../colors';

const EventItem = ({ _events, eventItem, _saveEvents }) => {
    const [events, setEvents] = useState([..._events])
    const [newEvent, setNewEvent] = useState(eventItem.title);
    const [isEditing, setIsEditing] = useState(false)

    const onChangeText = (e) => setNewEvent(e);
    const removeEventHandler = (_id) => {
        Alert.alert(
            "Delete the event", 
            "Are you sure?", 
            [
                {text: "Cancel"}, 
                {text: "Delete", style: "destructive", onPress: () => {
                    const newEvents = [..._events]
                    const targetEvent = (targetId) => targetId.id === _id;
                    
                    newEvents.splice(newEvents.findIndex(targetEvent), 1);         
                    _saveEvents(newEvents);
                }}
            ]
        )
    }
    const toggleEdit = () => {
        setIsEditing( prev => !prev );
    }
    const updateEventHandler = (_id) => {
        if(newEvent === ''){
            return
        }
        const newEvents = [..._events]
        const targetEvent = (targetId) => targetId.id === _id;
        const targetIdx = newEvents.findIndex(targetEvent);
        
        newEvents[targetIdx].title = newEvent

        newEvents.splice(targetIdx, 1, newEvents[targetIdx]);         
        _saveEvents(newEvents);

        //reset
        setNewEvent('');
        setIsEditing(false)
    }

    return (
        <>
            { isEditing ? (
                <SafeAreaView> 
                <View style={styles.isEdit}>
                    <TextInput 
                        style={styles.editInput}
                        value={newEvent}
                        onChangeText={text => onChangeText(text)}
                        onSubmitEditing={() => {updateEventHandler(eventItem.id)}}
                    />   
                </View>
                </SafeAreaView >
            ) : (
                <View style={styles.event}>
                    <Text style={styles.eventItem}>{eventItem.title}</Text>
                    <TouchableOpacity onPress={ () => toggleEdit(eventItem.id) }>
                        <FontAwesome name="pencil" size={16} color={theme.white} />   
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteBtn} onPress={ () => removeEventHandler(eventItem.id) }>
                        <Fontisto name="trash" size={16} color={theme.white} />
                    </TouchableOpacity> 
                </View>
            ) }
        </>

    )
}


const styles = StyleSheet.create({
    event: {
        backgroundColor: theme.grey,
        padding: 20,
        paddingVertical: 16,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row',
        alignItems:'center',
    },
    eventItem: {
        flex: 1,
        fontSize: 18,
        color: theme.white
    },
    deleteBtn: {
        marginLeft: 20
    },

    isEdit:{

    },
    editInput: {
        flex: 1,
        backgroundColor: theme.white,
        padding: 5,
        borderRadius: 5
    },
});

export default EventItem
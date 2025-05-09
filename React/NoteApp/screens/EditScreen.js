import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export default function EditScreen({ route, navigation }) {
  const editingNote = route.params?.note;
  const [title, setTitle] = useState(editingNote?.title || '');
  const [body, setBody] = useState(editingNote?.body || '');

  useEffect(() => {
    navigation.setOptions({ title: editingNote ? 'Edit Note' : 'New Note' });
  }, []);

  async function saveNote() {
    const newNote = {
      id: editingNote?.id || uuid.v4(),
      title,
      body,
    };

    const existing = await AsyncStorage.getItem('NOTES');
    let notes = existing ? JSON.parse(existing) : [];

    if (editingNote) {
      notes = notes.map((n) => (n.id === editingNote.id ? newNote : n));
    } else {
      notes.push(newNote);
    }

    await AsyncStorage.setItem('NOTES', JSON.stringify(notes));
    navigation.navigate('Home');
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ fontSize: 20, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline
        style={{ height: 200, textAlignVertical: 'top' }}
      />
      <Button title="Save" onPress={saveNote} />
    </View>
  );
}
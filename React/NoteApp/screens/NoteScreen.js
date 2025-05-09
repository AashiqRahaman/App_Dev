import React from 'react';
import { View, Text, Button } from 'react-native';

export default function NoteScreen({ route, navigation }) {
  const { note } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{note.title}</Text>
      <Text style={{ marginVertical: 20 }}>{note.body}</Text>
      <Button
        title="Edit"
        onPress={() => navigation.navigate('Edit', { note })}
      />
    </View>
  );
}

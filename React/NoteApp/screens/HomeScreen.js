import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadNotes);
    return unsubscribe;
  }, [navigation]);

  async function loadNotes() {
    const data = await AsyncStorage.getItem('NOTES');
    if (data) setNotes(JSON.parse(data));
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Note', { note: item })}
            style={{
              padding: 20,
              marginBottom: 10,
              backgroundColor: '#eee',
              borderRadius: 10,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text numberOfLines={1}>{item.body}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="New Note" onPress={() => navigation.navigate('Edit')} />
    </View>
  );
}

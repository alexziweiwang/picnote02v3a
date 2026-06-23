import { useFocusEffect } from "expo-router";

import { useState } from "react";

import * as SQLite from 'expo-sqlite';
import { useCallback } from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { FlatList, Image, Text, View } from 'react-native';

/**
 * Shows the list of notes
 */
export default function HomeScreen() {
  const db = SQLite.openDatabaseSync('picnotes.db'); // table: notelist

  const [myNoteList, setMyNoteList] = useState<Note[]>();


  useFocusEffect(
    useCallback(() => {
      fetchNotesFromDatabase();
    }, [])
  );

  type Note = {
    id: number;
    image_uri: string;
    title: string;
    note: string;
    creation_date: number;
  };

  function fetchNotesFromDatabase() {
    const res = db.getAllSync<Note>(`
      SELECT id, image_uri, title, note, creation_date
      FROM notelist
      ORDER BY creation_date DESC;
    `);

    setMyNoteList(res);

    
  }



  return (
    <ThemedView
      style={{ 
        flex: 1, 
        backgroundColor: 'green',
        paddingTop: 70, 
        paddingLeft: 20, 
        paddingRight: 20, 
        paddingBottom: 20
      }}

    >
      <ThemedView style={style.titleContainer}>
          <ThemedText
            type="title"
            style={{
              fontFamily: Fonts.rounded,
          }}>
            My Notes</ThemedText>

          <ThemedView>

            <FlatList
              data={myNoteList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    "borderRadius": 2,
                    "borderColor": "white",
                    "height": 200,
                    "backgroundColor": "pink",
                    "margin": 5

                  }}
                >
                  <Image source={{ uri: item.image_uri }} />
                  <Text>image-uri: [{item.image_uri}]</Text>
                  <Text>{item.title}</Text>
                  <Text>{item.note}</Text>
                  <Text>{item.creation_date}</Text>
                </View>
              )}
            />



          </ThemedView>
          

      </ThemedView>

    </ThemedView>
  );
}
const style = StyleSheet.create({

  titleContainer: {
      alignItems: 'center',
      gap: 8,
      flex: 1,
  },

});
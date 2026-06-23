import { useFocusEffect } from "expo-router";
import { useRouter } from 'expo-router';

import { useState } from "react";

import * as SQLite from 'expo-sqlite';
import { useCallback } from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { Button, FlatList, Image, Text, View } from 'react-native';

/**
 * Shows the list of notes
 */
export default function HomeScreen() {
  const router = useRouter();

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

  function enterNoteDetail(item: Note) {
    //TODO with the item's info, into 

    router.push({
      pathname: '../notedetail',
      params: {
        image_uri: item.image_uri, 
        title: item.title, 
        note: item.note, 
        creation_date: item.creation_date
       }
    });
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
                    "margin": 5,
                    "padding": 5,
                    "flexDirection": "row",
                                        "overflow": "scroll"


                  }}
                >
                  <Image 
                    source={{ uri: item.image_uri }} 
                    style={{ 
                      width: 100, 
                      height: 200 }}
                    resizeMode='contain'
                  />

                  <View>
                    <Text>Title: {item.title}</Text>
                    <Text>Note: {item.note}</Text>
                    <Text>Date: {new Date(item.creation_date).toLocaleString()}</Text>

                    <Button title='detail' onPress={()=>{enterNoteDetail(item)}}></Button>
                  </View>

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
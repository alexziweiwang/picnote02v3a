import { useFocusEffect, useRouter } from "expo-router";

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

  const [myNoteList, setMyNoteList] = useState<Note[]>([]);

  const [sortOption, setSortOption] = useState<string>("date_latest");

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

    db.execSync(`
            CREATE TABLE IF NOT EXISTS notelist (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image_uri TEXT NOT NULL,
                title TEXT,
                note TEXT,
                creation_date INTEGER
    );
    `);

    let res = db.getAllSync<Note>(`
      SELECT id, image_uri, title, note, creation_date
      FROM notelist;
    `);

    res.sort((a, b) => b.creation_date - a.creation_date);
    setMyNoteList(res);
  }

  function filterChange(propertyRequired: string) {
    let tempList = myNoteList;

    if (tempList === undefined) {
      return;
    }

    if (propertyRequired === 'date_earliest') {
      tempList.sort((a, b) => a.creation_date - b.creation_date);
    } else if (propertyRequired === 'date_latest') {
      tempList.sort((a, b) => b.creation_date - a.creation_date);
    }

    setMyNoteList(tempList);
  }

  function changeSortingOption() {
    if (sortOption === 'date_earliest') {
      filterChange('date_latest');
      setSortOption('date_latest');
      console.log("become late first");
    }
    if (sortOption === 'date_latest') {
      filterChange('date_earliest');
      setSortOption('date_earliest');
      console.log("become early first");
    }

  }

  function enterNoteDetail(item: Note) {

    router.push({
      pathname: '../notedetail',
      params: {
        item_id: item.id,
        image_uri: item.image_uri, 
        title: item.title, 
        note: item.note, 
        creation_date: item.creation_date
       }
    });
  }

 function devReset(db: any) {
  db.runSync("DROP TABLE IF EXISTS notes");
}

  return (
    <ThemedView
      style={{ 
        flex: 1, 
        paddingTop: 60, 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingBottom: 20
      }}

    >

      {myNoteList?.length > 0 && 
      <ThemedView style={style.titleContainer}>
          <ThemedText
            type="title"
            style={{
              fontFamily: Fonts.rounded,
          }}>
            My Notes</ThemedText>


          <View
            style={{marginLeft: 290}}
          >  
            <Button title='Sort' onPress={changeSortingOption}></Button>
          </View>


          <ThemedView
            style={{
              margin: 10,
              flex: 1
            }}
          >

            <FlatList
              data={myNoteList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (

                <View
                  style={{
                    borderRadius: 10,
                    borderColor: 'white',
                    height: 210,
                    backgroundColor: "#859299",
                    margin: 5,
                    padding: 5,
                    flexDirection: 'row',
                    
                  }}
                >
                  <Image 
                    source={{ uri: item.image_uri }} 
                    style={{ 
                      width: 100, 
                      height: 200 }}
                    resizeMode='contain'
                  />

                  <View
                    style={{  
                      width: 200,
                      margin: 3,
                      overflow: 'scroll',
                    }}
                  >
                    <Text>Title: {item.title}</Text>
                    <Text>Note: {item.note?.length > 0 ? item.note : "(Empty Note)"}</Text>
                    <Text>Date: {new Date(item.creation_date).toLocaleString()}</Text>

                    <View
                      style={{
                        marginTop: 110,
                        marginLeft: 120
                      }}
                    >
                      <Button title='detail' onPress={()=>{enterNoteDetail(item)}}></Button>

                    </View>
                  </View>

                </View>
              )}
            />



          </ThemedView>
          

      </ThemedView>}



      {myNoteList?.length === 0
      && <View
        style={{
          backgroundColor: '#5F6B72',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 100,
          marginTop: 200,
          borderRadius: 30,
        }}
      >
        <Text
          style={{fontSize: 30}}
        >(No notes)</Text>
      </View>}


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
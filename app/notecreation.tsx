

import * as FileSystem from "expo-file-system/legacy";
import * as SQLite from 'expo-sqlite';

import { useRouter } from 'expo-router';
import { useState } from "react";
import { StyleSheet } from "react-native";

import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Button, Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';


/*
Provides note-creation feature
*/
export default function NoteCreationScreen() {
    const router = useRouter();

    const db = SQLite.openDatabaseSync('picnotes.db');

    const { uri } = useLocalSearchParams<{ uri: string }>();
    const imageUri = Array.isArray(uri) ? uri[0] : uri; 

    const [titleInput, setTitleInput] = useState<string>("");
    const [noteInput, setNoteInput] = useState<string>("");


    async function finalizeNote() {

        const dateInfo = Date.now();

        const picName = `${titleInput}_${dateInfo}.jpg`;

        const dir =
            (FileSystem as any).documentDirectory ??
            (FileSystem as any).cacheDirectory;

        const permanentUri = `${dir}${picName}`;

                                                        console.log("perm uri = [", permanentUri ,"]");

        await FileSystem.makeDirectoryAsync(dir, {
            intermediates: true,
        });

        await FileSystem.copyAsync({
            from: imageUri,
            to: permanentUri,
        });

        const info = await FileSystem.getInfoAsync(permanentUri);

        let titleContent = titleInput;
        if (titleInput.length === 0) {
            titleContent = new Date(dateInfo).toLocaleString().replaceAll(" ", "_");
        }

        saveToDatabase(titleContent, noteInput, permanentUri, dateInfo);

        router.push( '/(tabs)');

    }

    function saveToDatabase(title: string, note: string, picLink: string, dateInfo: Number) {


        db.execSync(`
            CREATE TABLE IF NOT EXISTS notelist (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image_uri TEXT NOT NULL,
                title TEXT,
                note TEXT,
                creation_date INTEGER
        );
        `);

        db.runSync(
        `INSERT INTO notelist
        (image_uri, title, note, creation_date)
        VALUES (?, ?, ?, ?)`,
        [
            picLink,
            title,
            note,
            dateInfo,
        ]
        );



    }

    return (
        <>

        <TouchableWithoutFeedback 
            onPress={Keyboard.dismiss}>  


            <View 
                style={{
                    backgroundColor: 'grey',
                    padding: 20
                }}
            >

                        <>
            <Text>
                Title
            </Text>

            <TextInput
                style={[styles.inputFrameDefault, styles.inputFrameSgl]}
                onChangeText={setTitleInput}
                value={titleInput}
            />

            <Text>
                Note
            </Text>

            <TextInput
                style={[styles.inputFrameDefault, styles.inputFrameMul]}
                onChangeText={setNoteInput}
                value={noteInput}
                multiline
            />

            <Button 
                title='save'
                onPress={finalizeNote}   
            ></Button>

        </>



        {imageUri &&
        <View
            style={{alignItems: 'center'}}
        > 
         <Image
            source={imageUri} 
            contentFit="contain"
            style={{ 
                height: 480,
                width: 270,
            }}
        />
        </View>
        }




        </View>
        

        </TouchableWithoutFeedback>
    
        </>
    )

}

const styles = StyleSheet.create({
    inputFrameDefault: {
        borderWidth: 2,
        borderColor: 'white',
        margin: 5
    },
    
    inputFrameSgl: {
        height: 30,

    },

    inputFrameMul: {
        height: 60,
    },

});
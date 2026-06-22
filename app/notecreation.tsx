
import { useState } from "react";
import { StyleSheet } from "react-native";

import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Button, Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

export default function NoteCreationScreen() {

    const { uri } = useLocalSearchParams<{ uri: string }>();
    const imageUri = Array.isArray(uri) ? uri[0] : uri; 

    const [titleInput, setTitleInput] = useState<string>();
    const [noteInput, setNoteInput] = useState<string>();


    function saveNote() {

        //TODO

        //imageUri
        //titleInput
        //noteInput
    }

    return (
        <>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>  


        <View 
            style={{
                backgroundColor: 'white'
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
            onPress={saveNote}   
        ></Button>
        </>



        {imageUri && 
         <Image
            source={imageUri} 
            contentFit="contain"
            style={{ 
                height: 480,
                width: 270,
            }}
        />}




        </View>
        

        </TouchableWithoutFeedback>
    
        </>
    )

}

const styles = StyleSheet.create({
    inputFrameDefault: {
        borderWidth: 2,
        borderColor: 'pink',
    },
    
    inputFrameSgl: {
        height: 30,

    },

    inputFrameMul: {
        height: 110,
    },

});
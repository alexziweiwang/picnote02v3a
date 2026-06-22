
import { useState } from "react";
import { StyleSheet } from "react-native";

import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Button, Text, TextInput, View } from 'react-native';

export default function NoteCreationScreen() {

    const { uri } = useLocalSearchParams<{ uri: string }>();
    const imageUri = Array.isArray(uri) ? uri[0] : uri; 

    const [titleInput, setTitleInput] = useState<string>();
    const [noteInput, setNoteInput] = useState<string>();

    return (
        <>
        <View 
            style={{
                backgroundColor: 'white'
            }}
        >
         {imageUri && 
         <Image
            source={uri} 
            contentFit="contain"
            style={{ 
                height: 480,
                width: 270,
            }}
        />}

        <Text>
            ...
        </Text>

        <TextInput
            style={styles.inputFrame}
            onChangeText={setTitleInput}
            value={titleInput}
        />

        <TextInput
            style={styles.inputFrame}
            onChangeText={setNoteInput}
            value={noteInput}
        />

        <Button 
            title='save'
            onPress={()=>{
                //TODO
            }}   
        ></Button>
        
        </View>
    
        </>
    )

}

const styles = StyleSheet.create({
    inputFrame: {
        height: 30,
        borderWidth: 2,
        borderColor: 'pink',
    },

});
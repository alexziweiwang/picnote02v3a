import { useLocalSearchParams } from "expo-router";
import { Button, Image, Text, View } from 'react-native';


export default function NoteDetail() {

    const { image_uri, title, note, creation_date } = useLocalSearchParams<{ 
        image_uri: string, 
        title: string, 
        note: string, 
        creation_date: string 
    }>();

    function deleteNote() {

    }

    return (
        <>
        
            <View
                style={{ 
                    flex: 1, 
                    backgroundColor: 'green',
                    paddingTop: 70, 
                    paddingLeft: 20, 
                    paddingRight: 20, 
                    paddingBottom: 20,
                    alignItems: 'center'
                }}
                        
            >
                 <Image 
                    source={{ uri: image_uri }} 
                    style={{ 
                      width: 270, 
                      height: 480 }}
                    resizeMode='contain'
                  />

                  <View>
                    <Text>Title: {title}</Text>
                    <Text>Note: {note}</Text>
                    <Text>Date: {new Date(Number(creation_date)).toLocaleString()}</Text>

                    <Button title='delete' onPress={()=>{deleteNote()}}></Button>
                  </View>



            </View>
        
        </>
    )




}
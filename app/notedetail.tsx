import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Text, View } from 'react-native';


export default function NoteDetail() {
    const router = useRouter();

    const { item_id, image_uri, title, note, creation_date } = useLocalSearchParams<{ 
        item_id: string
        image_uri: string, 
        title: string, 
        note: string, 
        creation_date: string 
    }>();

    return (
        <>
        
            <View
                style={{ 
                    flex: 1, 
                    backgroundColor: '#5F6B72',
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

                  <View
                    style={{
                        margin: 10                   
                    }}
                  >
                    <Text>Title: {title}</Text>
                    <Text>Note: {note}</Text>
                    <Text>Date: {new Date(Number(creation_date)).toLocaleString()}</Text>
                        
                    <View
                        style={{
                            marginLeft: 220,
                            marginTop: 70
                        }}
                    >
                    </View>
                    
                  </View>



            </View>
        
        </>
    )




}
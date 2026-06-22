
import { useState } from 'react';
import styles from '../styles.css';


import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';


import { Button, Text, View } from 'react-native';


export default function TabTwoScreen() {


  const [camFacing, setCamFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [openCam, setOpenCam] = useState<boolean>(false);

  if (!permission) { //loading
    return <View />;
  }

  if (!permission.granted) { //not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Permission needed to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setCamFacing(current => (current === 'back' ? 'front' : 'back'));
  }


  return (

      <ThemedView
        style={{ flex: 1, backgroundColor: 'grey', paddingTop: 100, paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}
        >
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
 
          }}>
          Add Note
        </ThemedText>

          {openCam && 
            <CameraView 
              facing={camFacing} 
              style={{ 
                flex: 1, 
                backgroundColor: 'red' 
              }}/>
          }
          {!openCam && 
            <View 
              style={{ 
                flex: 1, 
                backgroundColor: 'orange' 
              }}
            >
                <Button 
                  onPress={()=>{setOpenCam(true)}} 
                  title='Take a Picture'
                ></Button>

            </View>
          }
          
          <View>
            <Button onPress={toggleCameraFacing} title='Flip Camera'>
 
            </Button>
            {openCam && <Button title='Close Camera' onPress={()=>{setOpenCam(false)}}></Button>}
          </View>

      </ThemedView>
   
  );
}

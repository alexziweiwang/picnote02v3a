
import { useState } from 'react';
import styles from '../styles.css';


import { ThemedView } from '@/components/themed-view';

import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';

import { useIsFocused } from "@react-navigation/native";

import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function TabTwoScreen() {


  const [permission, requestPermission] = useCameraPermissions();
  const isFocused = useIsFocused();

  const [openCam, setOpenCam] = useState<boolean>(false);
  const [camFacing, setCamFacing] = useState<CameraType>('back');
  

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
        style={{ 
          flex: 1, 
          
          backgroundColor: 'pink',  //for testing only

        }}
      >

          {isFocused ? (
            
            <>
              <CameraView 
                facing={camFacing} 
                style={StyleSheet.absoluteFill}
                />

              <View 
                style={
                  [styles.overlay, 
                  {paddingTop: 100, 
                  paddingLeft: 20, 
                  paddingRight: 20, 
                  paddingBottom: 20}
                ]}
              >

                
              <TouchableOpacity 
                 
              >
                <Button 
                  title='p'
                  // onPress={}   TODO
                ></Button>

              </TouchableOpacity>
              </View>


            </>
          ) : null}









      </ThemedView>
   
  );
}

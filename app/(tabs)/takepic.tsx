
import { useRef, useState } from "react";
import styles from '../styles.css';

import { ThemedView } from '@/components/themed-view';

import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';

import { useIsFocused } from "@react-navigation/native";

import { Image } from "expo-image";
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CreateNoteScreen() {

  const [permission, requestPermission] = useCameraPermissions();
  const isFocused = useIsFocused();

  const [openCam, setOpenCam] = useState<boolean>(false);

  const cameraRef = useRef<CameraView>(null);
  const [uri, seturi] = useState<string>("");

  const [camFacing, setCamFacing] = useState<CameraType>('back');

  const [noteCreationPhase, setNoteCreationPhase] = useState<Number>(1);
  

  if (!permission) { //loading
    return <View/>;
  }

  if (!permission.granted) { //not granted yet
    return (
      <View 
        style={[styles.container, 
          { paddingTop: 100, 
            paddingLeft: 20, 
            paddingRight: 20, 
            paddingBottom: 20
          }
        ]}
      >
        <Text style={styles.message}>Permission needed to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission"/>
      </View>
    );
  }

  function toggleCameraFacing() {
    setCamFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takeOnePicture = async () => {
                                                                  console.log("pressed pic-taking");

    const photo = await cameraRef.current?.takePictureAsync();
    if (photo?.uri) {
      seturi(photo.uri);

                                                                  console.log("uri = ", photo.uri);
      if (uri !== "") {
        setNoteCreationPhase(2);
                                                                  console.log("\tnow with a valid pic: [", photo.uri, "]");

      }
      
    } else {
                                                                  console.log("\tnot a valid uri");
    }
   
  };



  function Step1PhotoTaking() {
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
                ref={cameraRef}
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

                
              <TouchableOpacity>
                <Button 
                  title='p'
                  onPress={takeOnePicture}
                ></Button>

              </TouchableOpacity>
              </View>


            </>
          ) : null}

      </ThemedView>
    );
  }

  function Step2PhotoViewing() {
    return (
      <ThemedView>

        <Image
          source={{ uri }}
          contentFit="contain"
          style={{ height: 300, width: 300, aspectRatio: 1, backgroundColor: 'purple' }}
        />
        <Button 
          onPress={() => {
            seturi("")
            setNoteCreationPhase(1);
          }

          } 
          title="Retake"
        />
 
      </ThemedView>
    );
  }


  return (
    <>
      {(uri === "")
      &&
      <Step1PhotoTaking/>}

      {(uri !== "")
      && 
      <Step2PhotoViewing
      />}

    </>
  );
}

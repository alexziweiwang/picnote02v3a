
import { useRef, useState } from "react";

import { ThemedView } from '@/components/themed-view';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';

import { useIsFocused } from "@react-navigation/native";
import { useRouter } from 'expo-router';


import { Image } from "expo-image";
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/*
  A tab that starts the camera to take a photo, view, and retake
*/
export default function PictureTakingScreen() {
  const router = useRouter();

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
          styles.thickFrame
        ]}
      >
        <Text>Permission needed to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission"/>
      </View>
    );
  }

  function toggleCameraFacing() {
    setCamFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takeOnePicture = async () => {

    const photo = await cameraRef.current?.takePictureAsync();
    if (photo?.uri) {
      seturi(photo.uri);

      if (uri !== "") {
        setNoteCreationPhase(2);

      }
      
    } else {
    }
   
  };



  function Step1PhotoTaking() {
    return (
      <ThemedView
        style={{ 
          flex: 1, 
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
                  {paddingTop: 200, 
                  paddingLeft: 20, 
                  paddingRight: 20, 
                  paddingBottom: 20}
                ]}
              >

                
              <TouchableOpacity
                style={{paddingTop: 410}}
              >
          
                <MaterialIcons 
                  color='light' 
                  size={50} 
                  name='camera'
                  onPress={takeOnePicture}  
                />
              </TouchableOpacity>
              </View>


            </>
          ) : null}

      </ThemedView>
    );
  }

  function Step2PhotoViewing() {
    return (
      <ThemedView
        style={{
          paddingTop: 50,
          alignItems: 'center'
        }}
      >

        <View
          style={{marginRight: 260}}
        >
        <Button 
            onPress={() => {
              seturi("")
              setNoteCreationPhase(1);
            }

            } 
            title="Retake"
        />
        </View>

        <Image
          source={{ uri }}
          style={{ 
            height: 640,
            width: 360,
          }}
        />


       <View
        style={{marginLeft: 260, marginBottom: 20}}
       >
        <Button
          onPress={()=>{
            router.push({
              pathname: '../notecreation',
              params: {uri: uri }
            });
          }}
          title="Next"
        ></Button>
       </View>

        
 
      </ThemedView>
    );
  }



  return (
    <>
      {uri === ""
      &&
      <Step1PhotoTaking/>}

      {uri !== ""
      && 
      <Step2PhotoViewing
      />}

    </>
  );
}

const styles = StyleSheet.create({

thickFrame: {
    paddingTop: 100, 
    paddingLeft: 20, 
    paddingRight: 20, 
    paddingBottom: 20
},

container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
},

overlay: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
},


});

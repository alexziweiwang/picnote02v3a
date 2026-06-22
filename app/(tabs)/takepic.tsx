
import { useState } from 'react';
import styles from '../styles.css';


import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';

import { Button, Text, TouchableOpacity, View } from 'react-native';


export default function TabTwoScreen() {


  const [camFacing, setCamFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

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
    <ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Add Note
        </ThemedText>

          <CameraView facing={camFacing} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>

      </ThemedView>
   

    </ThemedView>
  );
}

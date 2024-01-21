import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from './Button';

export default function ChallengeUpload({setPhotoData}) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const camera = useRef<Camera | null>(null);
  
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Button title="" styles={{button: styles.circular}} onPress={() => {
                camera?.current?.takePictureAsync({base64: true}).then((data) => {
                    setPhotoData(data);
                    console.log(data);
                    camera.current?.pausePreview();
                })
            }}/>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },

  circular: {
    borderRadius: 50,
    minWidth: 60,
    height: 60,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "transparent",
    borderWidth: 4, // Add border width
    borderColor: "#ffffff", // Add border color
    padding: 2, 
 },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingBottom: 15,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

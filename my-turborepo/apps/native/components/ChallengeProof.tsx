import { useRef, useState } from 'react';
import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from './Button';


export default function ChallengeProof({}) {
 

  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} >
            
          </TouchableOpacity>
        </View>
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

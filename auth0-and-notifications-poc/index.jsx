import * as React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import firebase from '@react-native-firebase/app';
import { FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID } from "@env";

if (!firebase.apps.length) {
  firebase.initializeApp({
    projectId: "fir-603b8",
    apiKey: FIREBASE_API_KEY,
    appId: FIREBASE_APP_ID,
    databaseURL: "",
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
  });
}

import App from "./App";
import { name as appName } from "./app.json";

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

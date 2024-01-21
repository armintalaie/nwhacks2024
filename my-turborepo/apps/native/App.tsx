// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoalAction from './components/GoalAction';
import ChallengeTab from './components/Challenge';
import Auth from './components/Auth';
import { AuthProvider } from './context/AuthProvider';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider >
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Challenge">
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Native" component={GoalAction} />
        <Stack.Screen name="Challenge" component={ChallengeTab} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

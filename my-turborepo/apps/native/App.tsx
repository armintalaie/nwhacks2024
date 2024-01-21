// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoalAction from './components/GoalAction';

import Challenge from './components/Challenge';
import Auth from './components/Auth';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={{
          headerShown: false  
        }}>
        <Stack.Screen name="Auth" component={Auth}/>
        <Stack.Screen name="GoalAction" component={GoalAction} />
        <Stack.Screen name="Challenge" component={Challenge} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppIndex from './src/views/appIndex';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: 'transparent',
        },
      }}>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Index" component={AppIndex} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

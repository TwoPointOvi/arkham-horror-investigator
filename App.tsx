import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import InvestigatorDetails from './components/InvestigatorDetails';
import Main from './components/MainComponent';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Investigators">
                <Stack.Screen name="Investigators" component={Main}></Stack.Screen>
                <Stack.Screen name="InvestigatorDetails" component={InvestigatorDetails}></Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
  );
}
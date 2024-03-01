import React from 'react';
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import contactScreen from "./page_1";
import addContact from "./page_2";
import editContact from "./page_3";
import { AddContactProvider } from './page_4';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AddContactProvider>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="contactScreen" component={contactScreen} />
          <Stack.Screen name="addContact" component={addContact} /> 
          <Stack.Screen name="editContact" component={editContact} />
        </Stack.Navigator>
      </NavigationContainer>
    </AddContactProvider>
  );
}

export default App;

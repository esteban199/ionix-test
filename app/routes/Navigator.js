import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "../containers/home/Home";
import {
  HOME_ROUTE,
} from "./routes"

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={false}
        initialRouteName={HOME_ROUTE}
      >
        <Stack.Screen name={HOME_ROUTE} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
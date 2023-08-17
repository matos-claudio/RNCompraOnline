import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../screens/welcome';
import Browser from '../screens/browser';
import Login from '../screens/login';

// Type com as telas do App
type RootStackParamList = {
  Welcome: undefined;
  Browser: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator();

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Browser" component={Browser} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;

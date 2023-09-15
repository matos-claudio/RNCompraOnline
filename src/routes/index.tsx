import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Welcome from '../screens/welcome';
import Browser from '../screens/browser';
import Login from '../screens/login';
import Home from '../screens/home';
import OrderList from '../screens/order-list';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

// Type com as telas do App
type RootStackParamList = {
  Welcome: undefined;
  Browser: undefined;
  Login: undefined;
  Home: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="HomeScreen"
      component={Home}
      options={{
        headerTitle: '',
        headerTintColor: '#000',
        headerTransparent: true,
      }}
    />
  </HomeStack.Navigator>
);

const OrderStack = createNativeStackNavigator();
const OrderStackScreen = () => (
  <OrderStack.Navigator>
    <OrderStack.Screen
      name="OrderListScreen"
      component={OrderList}
      options={{
        headerShown: false,
      }}
    />
  </OrderStack.Navigator>
);

const SettingsStack = createNativeStackNavigator();
const SettingsScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name="OrderListScreen"
      component={OrderList}
      options={{
        headerShown: false,
      }}
    />
  </SettingsStack.Navigator>
);

const Tab = createBottomTabNavigator();

const TabBarIcon = props => {
  const {focused, name, color, size} = props;

  let iconName;

  if (name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (name === 'Compras') {
    iconName = focused ? 'list' : 'list-outline';
  } else if (name === 'Ajustes') {
    iconName = focused ? 'settings' : 'settings-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const Routes = () => {
  useEffect(() => {
    async function getUserToken() {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      // chama de API para atualizar o token no DB
      console.log(`>>>> ${token}`);
    }
    getUserToken();
  }, []);

  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        title: remoteMessage!.notification!.title,
        message: remoteMessage!.notification?.body,
      });
    });
  }, []);

  const Stack = createNativeStackNavigator();

  const HomeTabs = () => (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: props => <TabBarIcon {...props} name={route.name} />,
        tabBarActiveTintColor: '#62C567',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Compras" component={OrderStackScreen} />
      <Tab.Screen name="Ajustes" component={SettingsScreen} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      {/* <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: props => <TabBarIcon {...props} name={route.name} />,
          tabBarActiveTintColor: '#62C567',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Compras" component={OrderStackScreen} />
        <Tab.Screen name="Ajustes" component={SettingsScreen} />
      </Tab.Navigator> */}
    </NavigationContainer>
  );
};

export default Routes;

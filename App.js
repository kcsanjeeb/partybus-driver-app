import React from 'react';

import Screen1 from './src/screens/drawer/screen1';
import Screen2 from './src/screens/drawer/screen2';


import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import MapScreen from './screens/MapScreen';
import ScannerScreen from './screens/ScannerScreen';
import DecodeScreen from './screens/DecodeScreen';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  DrawerActions
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { createStackNavigator } from '@react-navigation/stack';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appearance, useColorScheme, AppearanceProvider } from 'react-native-appearance';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();;

App = () => {

  const colorScheme = useColorScheme();

  const MyTheme = {
    dark: false,
    colors: {
      primary: 'white',
      background: 'white',
      card: '#65509f',
      text: 'white',
      border: 'green',
    },
  }

  createAuth = () =>
  <Stack.Navigator  options={{gestureEnabled: false,swipeEnabled: false}} >
    <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: "Welcome to Party Bus",
          gestureEnabled: false,
          swipeEnabled: false
        }}
      />
  </Stack.Navigator>

  createHomeStack = () =>
    
    <Stack.Navigator    >
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{
          title: "Welcome to Party Bus",
          gestureEnabled: false,
          swipeEnabled: false
        }}
      />

      <Stack.Screen name="Auth" children={this.createAuth}  options={{headerShown: false,  gestureEnabled: false,swipeEnabled: false}}  />

      <Stack.Screen
        name="HomeScreen"
        children={this.createDrawer}
        options={({ navigation }) => ({
          title: "Dashboard",
          gestureEnabled: false,
          headerLeft: () =>
            <Icon
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={[{ color: 'white', marginLeft: 8 }]}
              size={24}
              name={'menu'}
            />
        })
        }
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Gps Settings"
        }}
      />
      <Stack.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{
          title: "Ticket Scanner"
        }}
      />
       <Stack.Screen
        name="DecodeScreen"
        component={DecodeScreen}
        options={{
          title: "Ticket Checker"
        }}
      />

      
    </Stack.Navigator>

  createDrawer = () =>
    <Drawer.Navigator>
      <Drawer.Screen name="Party Routes" component={HomeScreen} />
      <Drawer.Screen name="Contacts" component={Screen1} />
      <Drawer.Screen name="Favorites" component={Screen2} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>

  return (
    <AppearanceProvider>
       <NavigationContainer theme={colorScheme == 'dark' ? DarkTheme : MyTheme}>
        {this.createHomeStack()}
      </NavigationContainer>
   
     
    </AppearanceProvider>
  );
}

export default App;
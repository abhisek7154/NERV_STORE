import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignupScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import BookingScreen from './screens/BookingScreen';
import BookingListScreen from './screens/BookingListScreen';
import { BookingProvider } from './context/BookingContext';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
    };
    checkToken();
  }, []);

  if (isLoggedIn === null) {
    return null; // Optionally show a splash screen here
  }

  return (
    <BookingProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen name="Booking" component={BookingScreen} />
          <Stack.Screen name="BookingList" component={BookingListScreen}/>
          <Stack.Screen name="Profile" component={ProfileScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </BookingProvider>
  );
};

export default App;

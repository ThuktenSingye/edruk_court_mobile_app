import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import Toast from 'react-native-toast-message'; // ✅ Add this
import MainStack from './app/components/common/MainStack';

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStack />
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

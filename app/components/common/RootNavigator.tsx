import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import NotificationScreen from '../../screens/Notification/NotificationScreen';
import {RootStackParamList} from '../../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
}

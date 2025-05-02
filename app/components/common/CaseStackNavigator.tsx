import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CaseScreen from '../../screens/Case/CaseScreen';
import DefendentInfoScreen from '../../screens/Case/DefendentInfoScreen';
import FileCaseScreen from '../../screens/Home/FileCaseScreen';
import CaseProceedingScreen from '../../screens/Case/CaseProceedingScreen';
import {CaseStackParamList} from '../../types/navigation';

const Stack = createNativeStackNavigator<CaseStackParamList>();

export default function CaseStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CaseMain" component={CaseScreen} />
      <Stack.Screen name="DefendentInfo" component={DefendentInfoScreen} />
      <Stack.Screen name="FileCase" component={FileCaseScreen} />
      <Stack.Screen name="CaseProceeding" component={CaseProceedingScreen} />
    </Stack.Navigator>
  );
}

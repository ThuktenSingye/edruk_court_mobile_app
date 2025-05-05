// import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import TabNavigator from './TabNavigator';
// import NotificationScreen from '../../screens/Notification/NotificationScreen';
// import {MainStackParamList} from '../../types/navigation';
// import CaseProceedingDetailScreen from '../../screens/Case/CaseProceedingDetailScreen';
// import FileCaseScreen from '../../screens/Home/FileCaseScreen';

// const Stack = createNativeStackNavigator<MainStackParamList>();

// export default function MainStack() {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="Tabs" component={TabNavigator} />
//       <Stack.Screen name="Notification" component={NotificationScreen} />
//       <Stack.Screen
//         name="CaseProceedingDetail"
//         component={CaseProceedingDetailScreen}
//       />
//       <Stack.Screen name="FileCase" component={FileCaseScreen} />{' '}
//       {/* ✅ This will preserve bottom tabs */}
//     </Stack.Navigator>
//   );
// }

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import NotificationScreen from '../../screens/Notification/NotificationScreen';
import CaseProceedingDetailScreen from '../../screens/Case/CaseProceedingDetailScreen';
import FileCaseScreen from '../../screens/Home/FileCaseScreen';
import {MainStackParamList} from '../../types/navigation';
import LoginScreen from '../../screens/Auth/LoginScreen';
import useUserStore from '../../store/useUserStore';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
  const user = useUserStore(state => state.user);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <>
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen
            name="CaseProceedingDetail"
            component={CaseProceedingDetailScreen}
          />
          <Stack.Screen name="FileCase" component={FileCaseScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

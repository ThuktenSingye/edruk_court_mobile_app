// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import HomeScreen from '../../screens/Home/HomeScreen';
// import CaseScreen from '../../screens/Case/CaseScreen';
// import ScheduleScreen from '../../screens/Schedule/ScheduleScreen';
// import ProfileScreen from '../../screens/Profile/ProfileScreen';
// import NotificationScreen from '../../screens/Notification/NotificationScreen';
// import CaseStackNavigator from './CaseStackNavigator';
// import BottomTabBar from './BottomTabBar';

// export type TabParamList = {
//   Home: undefined;
//   Case: undefined;
//   Schedule: undefined;
//   Profile: undefined;
//   Notification: undefined;
//   DefendentInfo: undefined;
// };

// const Tab = createBottomTabNavigator<TabParamList>();

// export default function TabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={{headerShown: false}}
//       tabBar={props => <BottomTabBar {...props} />}>
//       {/* Main Tabs */}
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Case" component={CaseStackNavigator} />
//       <Tab.Screen name="Schedule" component={ScheduleScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />

//       {/* Hidden Screens (navigable but not shown in bottom bar) */}
//       <Tab.Screen
//         name="Notification"
//         component={NotificationScreen}
//         options={{tabBarButton: () => null}}
//       />
//     </Tab.Navigator>
//   );
// }

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import HomeScreen from '../../screens/Home/HomeScreen';
import ScheduleScreen from '../../screens/Schedule/ScheduleScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import NotificationScreen from '../../screens/Notification/NotificationScreen';
import CaseStackNavigator from './CaseStackNavigator';
import BottomTabBar from './BottomTabBar';
import {CaseStackParamList} from '../../types/navigation';
import {useTranslation} from 'react-i18next';
// ✅ Define TabParamList with nested CaseStackParamList
export type TabParamList = {
  Home: undefined;
  Case: NavigatorScreenParams<CaseStackParamList>; // 👈 nested stack
  Schedule: undefined;
  Profile: undefined;
  Notification: undefined; // hidden tab
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <BottomTabBar {...props} />}>
      {/* Main visible tabs */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarLabel: t('home')}}
      />
      <Tab.Screen
        name="Case"
        component={CaseStackNavigator}
        options={{tabBarLabel: t('case')}}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{tabBarLabel: t('schedule')}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{tabBarLabel: t('profile')}}
      />

      {/* Hidden but navigable screen */}
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{tabBarButton: () => null}}
      />
    </Tab.Navigator>
  );
}

import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {COLORS} from '../../constant/designTokens';

// Custom SVG icons
import HomeIcon from '../../assets/icons/BottomTabBar/HomeIcon';
import CaseIcon from '../../assets/icons/BottomTabBar/CaseIcon';
import ScheduleIcon from '../../assets/icons/BottomTabBar/ScheduleIcon';
import ProfileIcon from '../../assets/icons/BottomTabBar/ProfileIcon';

export default function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const renderIcon = (routeName: string, color: string) => {
    switch (routeName) {
      case 'Home':
        return <HomeIcon color={color} />;
      case 'Case':
        return <CaseIcon color={color} />;
      case 'Schedule':
        return <ScheduleIcon color={color} />;
      case 'Profile':
        return <ProfileIcon color={color} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {state.routes
        .filter(route => route.name !== 'Notification') // Hide notification tab from bottom UI
        .map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;
          const color = isFocused ? '#FFFFFF' : '#CCCCCC';

          const rawLabel = options.tabBarLabel ?? options.title ?? route.name;
          const label = typeof rawLabel === 'string' ? rawLabel : route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              onPress={onPress}
              style={styles.tab}>
              <View style={styles.tabInner}>
                {renderIcon(route.name, color)}
                <Text style={[styles.label, {color}]}>{label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  tabInner: {
    alignItems: 'center',
    gap: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
});

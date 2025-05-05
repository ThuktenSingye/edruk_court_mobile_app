import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import MainStack from './app/components/common/MainStack';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from './app/constant/designTokens';

enableScreens();

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <View style={styles.appContainer}>
          <NavigationContainer>
            <MainStack />
            <Toast />
          </NavigationContainer>
        </View>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: COLORS.background,
    fontSize: SIZES.medium,
    flex: 1,
  },
});

export default App;

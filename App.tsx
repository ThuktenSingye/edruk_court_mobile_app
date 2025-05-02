import React from 'react';
<<<<<<< HEAD
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import Toast from 'react-native-toast-message'; // ✅ Add this
import MainStack from './app/components/common/MainStack';
=======
import {StyleSheet, Text} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
>>>>>>> 02cb88b4c0dd7057cda393807277e79c9ae29354

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
<<<<<<< HEAD
      <NavigationContainer>
        <MainStack />
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
=======
      <SafeAreaView>
        <Text style={styles.test}>Edruk Court</Text>
        <Text style={styles.test}>Edruk Court</Text>
        <Text style={styles.test}>Edruk Court</Text>
        <Text style={styles.test}>Edruk Court</Text>
        <Text style={styles.test}>Edruk Court</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  test: {
    margin: 100,
  },
});

export default App;
>>>>>>> 02cb88b4c0dd7057cda393807277e79c9ae29354

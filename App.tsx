/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
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
